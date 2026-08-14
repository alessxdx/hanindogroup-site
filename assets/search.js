/* =====================================================================
   Hanindo Group — on-site search
   ---------------------------------------------------------------------
   Everything the search page needs: it downloads assets/search-index.json
   (built by tools/build-search-index.pl), ranks the 49 pages against the
   query in the browser, and renders the results. No server, no search
   service, no network call to anyone else.

   This replaced a header form that opened Google scoped to the site.
   That could never work here: every page carries
   <meta name="robots" content="noindex">, so Google is told not to keep
   the site at all and the results page always came back empty.

   The header form on the other 50 pages does not load this file — it is
   a one-line handler that navigates here with ?q=. Only this page pays
   for the index download.
   ===================================================================== */
(function () {
  'use strict';

  /* Language. The toggle in the header is owned by translate.js, which
     remembers the choice under this key. translate.js swaps text that is
     in the page when it loads; results are drawn after that, so the
     strings below have to carry their own Indonesian. */
  var LANG_KEY = 'hg_lang';

  var STR = {
    en: {
      counted:  function (n, q) { return n + (n === 1 ? ' result for ' : ' results for ') + '“' + q + '”'; },
      none:     function (q) { return 'No results for “' + q + '”'; },
      hint:     'Try fewer words, or a product or company name.',
      fixed:    function (from, to) { return 'Showing results for “' + to + '” instead of “' + from + '”'; },
      empty:    'Type something above to search the site.',
      loading:  'Searching…',
      failed:   'The search index could not be loaded. Please reload the page.',
      ph:       'Product, service or company'
    },
    id: {
      counted:  function (n, q) { return n + ' hasil untuk ' + '“' + q + '”'; },
      none:     function (q) { return 'Tidak ada hasil untuk “' + q + '”'; },
      hint:     'Coba kata yang lebih sedikit, atau nama produk atau perusahaan.',
      fixed:    function (from, to) { return 'Menampilkan hasil untuk “' + to + '”, bukan “' + from + '”'; },
      empty:    'Ketik sesuatu di atas untuk mencari di situs ini.',
      loading:  'Mencari…',
      failed:   'Indeks pencarian gagal dimuat. Silakan muat ulang halaman.',
      ph:       'Produk, layanan atau perusahaan'
    }
  };

  function lang() {
    var l = 'en';
    try { l = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) {}
    return STR[l] ? l : 'en';
  }

  /* Which part of the group a result belongs to. Shown above the title so
     a hit is placeable at a glance — six companies share a lot of
     vocabulary, and "Products & Services" alone says nothing about whose.
     Company names are not translated, matching translate.js. */
  var SECTION = {
    '':                     'Hanindo Group',
    'about':                'Hanindo Group',
    'products-services':    'Hanindo Group',
    'partners':             'Hanindo Group',
    'career':               'Hanindo Group',
    'contact':              'Hanindo Group',
    'citra':                'PT. Hanindo Citra',
    'fire-fighting':        'PT. Hanindo Citra — Fire Fighting',
    'flowtech-engineering': 'PT. Flowtech Engineering',
    'automotive':           'PT. Hanindo Automotive',
    'automation':           'PT. Hanindo Automation Solutions',
    /* No PT. on the last two: neither is an Indonesian company. PT is the
       Indonesian form for a limited company, and these carry their own --
       Gralessando is Singaporean and says Pte Ltd, and Hanindo Shanghai is
       registered in China as Hanindo (Shanghai) International Co., Ltd.
       'Hanindo Group' above is the group rather than a registered entity,
       so it takes no prefix either. */
    'printer-pos':          'Gralessando (S) Pte. Ltd.',
    'shanghai':             'Hanindo Shanghai'
  };

  function sectionOf(url) {
    var seg = url.split('/')[0];
    if (seg.indexOf('.html') > -1) seg = '';
    return SECTION[seg] || 'Hanindo Group';
  }

  /* ------------------------------------------------------------------
     Aliases

     Expansion happens at query time, never at index time, so adding a
     synonym here needs no rebuild of search-index.json.

     This is the part fuzzy matching cannot do. "fcc" and "forecourt" are
     nowhere near each other by edit distance; only a written-down mapping
     connects them. Each entry was checked against the real index — every
     one of them lands on the page it names.

     A term matches its literal form OR its expansion, never the
     expansion alone: "pos" is genuinely printed on the Gralessando pages,
     so replacing it would lose real hits rather than add them.
     ------------------------------------------------------------------ */
  var ALIASES = {
    /* trade abbreviations */
    'fcc': 'forecourt controller',
    'fc': 'forecourt controller',
    'atg': 'automatic tank gauging',
    'stp': 'submersible turbine pump',
    'gvr': 'gilbarco veeder root',
    'vr': 'veeder root',
    'pos': 'point of sale',
    'epos': 'point of sale',
    'ffs': 'fire fighting system',

    /* spelling and dialect. The site is written in British English
       throughout — "tire" appears on none of the 49 pages, so without
       this a visitor searching "tire service" gets nothing at all. */
    'tire': 'tyre',
    'tires': 'tyre',
    'tyres': 'tyre',
    'lube': 'lubrication',
    'gauge': 'gauging',
    'gauges': 'gauging',
    'petrol': 'fuel',
    'gasoline': 'fuel',

    /* Indonesian. Mapping the term back to English and searching the
       English index keeps page-level precision. Indexing the translate.js
       dictionaries instead would not: they are per-section, so every
       Citra page would match every Indonesian query. */
    'pompa': 'pump',
    'bensin': 'fuel',
    'kebakaran': 'fire fighting',
    'pemadam': 'fire fighting',
    'hidran': 'hydrant',
    'bengkel': 'workshop',
    'otomotif': 'automotive',
    'ban': 'tyre',
    'las': 'welding',
    'selang': 'hose',
    'pencetak': 'printer',
    'proyek': 'projects',
    'tentang': 'about',
    'kontak': 'contact'
  };

  /* Aliases whose literal form must NOT also be searched, because the
     Indonesian word is a prefix of unrelated English words in this
     content: "ban" hits bank, banking and Banten across 11 pages, "las"
     hits "lasting". For these the alias replaces the term. */
  var ALIAS_REPLACES = { 'ban': 1, 'las': 1 };

  /* Literals matched as a whole word rather than as a substring. Scoring
     is substring-based everywhere else, which is what makes "dispens"
     find dispensers — but for a three-letter abbreviation it is a
     liability: "pos" occurs inside position, positive, post, postal,
     posting and purpose, which put Lifts & Handling above Gralessando.
     Dropping the literal is not an option either, since POS is written
     as a word on 20 pages and 11 of them never spell out "point of
     sale". Any future two- or three-letter alias probably belongs here. */
  var LITERAL_WHOLE_WORD = { 'pos': 1 };

  /* ------------------------------------------------------------------
     Typo tolerance

     Aliases handle "fcc"; they cannot handle "forcourt". Those are
     different problems — no mapping can be written for every possible
     misspelling, and no edit distance can connect an abbreviation to the
     words behind it. This is the second half.

     The correction is made against a vocabulary built from the index, so
     a typo is only ever rewritten to a word that genuinely appears on
     the site. The rewritten word then goes through the same alternatives
     machinery as an alias, which means scoring, snippets and
     highlighting all work without knowing fuzzy exists.
     ------------------------------------------------------------------ */

  /* Distance budget by length. Short words are left alone deliberately:
     at three letters almost everything is within one edit of everything
     else, so "atg" would start matching "atm" and the abbreviations
     above would become unreliable. */
  function maxDist(term) {
    if (term.length < 4) return 0;
    if (term.length < 7) return 1;
    return 2;
  }

  /* Levenshtein, abandoned as soon as every path exceeds the budget.
     Without the early exit this is 5,000 full matrices per query. */
  function editWithin(a, b, max) {
    var la = a.length, lb = b.length, i, j;
    if (Math.abs(la - lb) > max) return -1;

    var prev = [], cur = [];
    for (j = 0; j <= lb; j++) prev[j] = j;

    for (i = 1; i <= la; i++) {
      cur[0] = i;
      var best = cur[0];
      for (j = 1; j <= lb; j++) {
        var cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        var v = prev[j] + 1;
        if (cur[j - 1] + 1 < v) v = cur[j - 1] + 1;
        if (prev[j - 1] + cost < v) v = prev[j - 1] + cost;
        cur[j] = v;
        if (v < best) best = v;
      }
      if (best > max) return -1;
      for (j = 0; j <= lb; j++) prev[j] = cur[j];
    }
    return prev[lb] <= max ? prev[lb] : -1;
  }

  var WORD_RE = /[a-z0-9À-ɏ]+/g;

  /* Every distinct word on the site, built once per search. */
  function buildVocab(index) {
    var seen = {}, out = [], i, m;
    for (i = 0; i < index.length; i++) {
      var hay = (index[i].t + ' ' + (index[i].d || '') + ' ' + index[i].x).toLowerCase();
      WORD_RE.lastIndex = 0;
      while ((m = WORD_RE.exec(hay))) {
        var w = m[0];
        if (w.length > 2 && !seen[w]) { seen[w] = 1; out.push(w); }
      }
    }
    return out;
  }

  /* A term that already appears somewhere is never second-guessed —
     correcting a word that works is how fuzzy search earns its bad name. */
  function inVocab(term, vocab) {
    for (var i = 0; i < vocab.length; i++) {
      if (vocab[i].indexOf(term) > -1) return true;
    }
    return false;
  }

  var MAX_FUZZY = 4;

  function fuzzyFor(term, vocab) {
    var max = maxDist(term);
    if (!max) return [];

    var found = [];
    for (var i = 0; i < vocab.length; i++) {
      var w = vocab[i];
      var d = editWithin(term, w, max);
      if (d < 0) continue;
      /* A typo rarely changes the first letter, and requiring it removes
         most of the nonsense a two-edit budget otherwise lets in. Single
         edits are trusted without it, so "dispensor" and "orecourt" both
         still correct. */
      if (d > 1 && w.charAt(0) !== term.charAt(0)) continue;
      found.push({ w: w, d: d });
    }

    found.sort(function (a, b) {
      return a.d - b.d || Math.abs(a.w.length - term.length) - Math.abs(b.w.length - term.length);
    });
    return found.slice(0, MAX_FUZZY).map(function (f) { return f.w; });
  }

  /* Each query term becomes a list of alternatives, each alternative a
     list of words that must all be present. Passing the vocabulary in
     turns on typo correction for terms that match nothing as typed. */
  function expand(ts, vocab) {
    var groups = [], corrected = [], i;
    for (i = 0; i < ts.length; i++) {
      var t = ts[i], alts = [];
      if (!ALIAS_REPLACES[t]) alts.push([t]);
      if (ALIASES[t]) alts.push(ALIASES[t].split(' '));
      if (!alts.length) alts.push([t]);

      if (vocab && !ALIASES[t] && !inVocab(t, vocab)) {
        var fuzzy = fuzzyFor(t, vocab);
        for (var j = 0; j < fuzzy.length; j++) alts.push([fuzzy[j]]);
        if (fuzzy.length) corrected.push({ from: t, to: fuzzy[0] });
      }

      groups.push(alts);
    }
    groups.corrected = corrected;
    return groups;
  }

  /* Every word that could have caused a match, for highlighting. Someone
     who searched "kebakaran" should see why "fire fighting" came back. */
  function hlTerms(groups) {
    var seen = {}, out = [], i, j, k;
    for (i = 0; i < groups.length; i++)
      for (j = 0; j < groups[i].length; j++)
        for (k = 0; k < groups[i][j].length; k++) {
          var w = groups[i][j][k];
          if (!seen[w]) { seen[w] = 1; out.push(w); }
        }
    return out;
  }

  /* ------------------------------------------------------------------
     Scoring

     A page must contain every term to be a hit, which is what people
     expect from two or three words. If nothing contains all of them the
     search is run again accepting any one term, so a near miss still
     returns something rather than an empty page.

     Weights: a term in the title says far more about a page than the
     same term buried in a paragraph, and the body count is capped so a
     long product page cannot out-rank a page that is actually about the
     subject simply by being long.
     ------------------------------------------------------------------ */
  var W_TITLE = 10, W_DESC = 4, W_BODY = 1, BODY_CAP = 8;
  var W_TITLE_WORD = 6, W_PHRASE_TITLE = 30, W_PHRASE_DESC = 12, W_PHRASE_BODY = 6;

  function terms(q) {
    return q.toLowerCase().split(/[^a-z0-9À-ɏ]+/).filter(function (t) {
      return t.length > 0;
    });
  }

  function count(hay, needle) {
    var n = 0, i = hay.indexOf(needle);
    while (i > -1) { n++; i = hay.indexOf(needle, i + needle.length); }
    return n;
  }

  function wholeWord(hay, needle) {
    return new RegExp('(^|[^a-z0-9])' + needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9]|$)')
      .test(hay);
  }

  /* One word against one page. -1 means absent, which is different from
     0 and has to stay distinguishable. */
  function countWord(hay, needle) {
    var re = new RegExp('(^|[^a-z0-9])' + needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                        + '([^a-z0-9]|$)', 'g');
    var n = 0;
    while (re.exec(hay)) n++;
    return n;
  }

  function wordScore(t, d, x, term) {
    var c = LITERAL_WHOLE_WORD[term] ? countWord : count;
    var inT = c(t, term), inD = c(d, term), inX = c(x, term);
    if (!inT && !inD && !inX) return -1;
    var s = inT * W_TITLE + inD * W_DESC + Math.min(inX, BODY_CAP) * W_BODY;
    if (inT && wholeWord(t, term)) s += W_TITLE_WORD;
    return s;
  }

  function score(rec, groups, phrase) {
    var t = rec.t.toLowerCase(), d = (rec.d || '').toLowerCase(), x = rec.x.toLowerCase();
    var total = 0, matchedAll = true;

    for (var i = 0; i < groups.length; i++) {
      var alts = groups[i], best = -1;

      for (var j = 0; j < alts.length; j++) {
        var words = alts[j], sum = 0, ok = true;
        for (var k = 0; k < words.length; k++) {
          var ws = wordScore(t, d, x, words[k]);
          /* A multi-word alias counts only if all of its words are
             present, so "gvr" needs gilbarco AND veeder AND root. */
          if (ws < 0) { ok = false; break; }
          sum += ws;
        }
        /* Averaged, not summed: otherwise a three-word expansion would
           automatically outweigh a one-word literal match. */
        if (ok) best = Math.max(best, sum / words.length);
      }

      if (best < 0) { matchedAll = false; continue; }
      total += best;
    }

    if (groups.length > 1 && phrase) {
      if (t.indexOf(phrase) > -1) total += W_PHRASE_TITLE;
      else if (d.indexOf(phrase) > -1) total += W_PHRASE_DESC;
      else if (x.indexOf(phrase) > -1) total += W_PHRASE_BODY;
    }

    return { score: total, all: matchedAll };
  }

  function run(index, q) {
    var ts = terms(q);
    if (!ts.length) return { hits: [], words: [], corrected: [] };

    /* Aliases first, without the vocabulary: an alias is a deliberate
       mapping and must never be overridden by a chance edit-distance
       neighbour. Only what the map does not know gets typo-corrected. */
    var groups = expand(ts, buildVocab(index));
    var phrase = q.toLowerCase().trim();

    var strict = [], loose = [];
    for (var i = 0; i < index.length; i++) {
      var s = score(index[i], groups, phrase);
      if (!s.score) continue;
      (s.all ? strict : loose).push({ rec: index[i], score: s.score });
    }

    var hits = strict.length ? strict : loose;
    hits.sort(function (a, b) {
      return b.score - a.score || a.rec.t.localeCompare(b.rec.t);
    });
    return { hits: hits, words: hlTerms(groups), corrected: groups.corrected || [] };
  }

  /* ------------------------------------------------------------------
     Rendering
     ------------------------------------------------------------------ */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* A window of body text around the first term that appears in it, so
     the reader can see the word in its sentence rather than reading the
     opening line of every page. Cut back to whitespace at both ends so
     the snippet never starts or ends mid-word. */
  var SNIP = 190;

  function snippet(rec, ts) {
    var x = rec.x, lower = x.toLowerCase(), at = -1;
    for (var i = 0; i < ts.length && at < 0; i++) at = lower.indexOf(ts[i]);
    if (at < 0) return x.slice(0, SNIP) + (x.length > SNIP ? '…' : '');

    var start = Math.max(0, at - Math.floor(SNIP / 3));
    var end = Math.min(x.length, start + SNIP);
    if (start > 0) { var sp = x.indexOf(' ', start); if (sp > -1 && sp < start + 30) start = sp + 1; }
    if (end < x.length) { var ep = x.lastIndexOf(' ', end); if (ep > start) end = ep; }

    return (start > 0 ? '…' : '') + x.slice(start, end) + (end < x.length ? '…' : '');
  }

  function highlight(text, ts) {
    var out = esc(text);
    for (var i = 0; i < ts.length; i++) {
      var safe = ts[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      out = out.replace(new RegExp('(' + safe + ')', 'gi'), '<mark>$1</mark>');
    }
    return out;
  }

  /* Results live at the site root; this page is one level down, so every
     link needs the same one step up. The home page's URL is the empty
     string, which would be an empty href, so it becomes "../". */
  function href(u) { return '../' + u; }

  function render(box, hits, q, ts, corrected) {
    var s = STR[lang()];

    if (!q) { box.innerHTML = '<p class="smsg">' + esc(s.empty) + '</p>'; return; }

    if (!hits.length) {
      box.innerHTML = '<p class="smsg"><strong>' + esc(s.none(q)) + '</strong></p>'
                    + '<p class="smsg sub">' + esc(s.hint) + '</p>';
      return;
    }

    /* Say so when a word was corrected. A silent rewrite leaves someone
       who really did mean the odd spelling with no way to tell why the
       results look wrong. */
    var html = '';
    if (corrected && corrected.length) {
      for (var c = 0; c < corrected.length; c++) {
        html += '<p class="sfixed">' + esc(s.fixed(corrected[c].from, corrected[c].to)) + '</p>';
      }
    }

    html += '<p class="scount">' + esc(s.counted(hits.length, q)) + '</p><ol class="sresults">';
    for (var i = 0; i < hits.length; i++) {
      var r = hits[i].rec;
      html += '<li class="sresult">'
            +   '<a href="' + esc(href(r.u)) + '">'
            +     '<span class="ssection">' + esc(sectionOf(r.u)) + '</span>'
            +     '<h3>' + highlight(r.t, ts) + '</h3>'
            +   '</a>'
            +   '<p class="ssnip">' + highlight(snippet(r, ts), ts) + '</p>'
            + '</li>';
    }
    box.innerHTML = html + '</ol>';
  }

  /* ------------------------------------------------------------------
     Page wiring
     ------------------------------------------------------------------ */
  function query() {
    var m = /[?&]q=([^&]*)/.exec(window.location.search);
    if (!m) return '';
    try { return decodeURIComponent(m[1].replace(/\+/g, ' ')).trim(); }
    catch (e) { return ''; }
  }

  function start() {
    var box = document.getElementById('sresults');
    var field = document.getElementById('sq');
    if (!box) return;

    var q = query();
    if (field) field.value = q;
    if (q) document.title = q + ' — ' + document.title;

    /* ts is replaced once the index is in, with the words that actually
       matched — alias expansions and typo corrections included — so the
       snippet window lands on them and the highlight explains the hit. */
    var hits = [], ts = terms(q), corrected = [], ready = false;

    /* Everything on this page that depends on the language and is not
       plain text sitting in the markup, so translate.js cannot reach it:
       the big field's placeholder (translate.js special-cases only the
       small header one) and the results, which are drawn long after
       translate.js has walked the page. */
    function applyLang() {
      if (field) field.setAttribute('placeholder', STR[lang()].ph);
      if (ready) render(box, hits, q, ts, corrected);
    }

    /* translate.js is loaded before this file, so its click handler is
       registered first and has already written the new choice to
       localStorage by the time ours reads it back. */
    var btns = document.querySelectorAll('.langtoggle [data-lang]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', applyLang);
    }
    applyLang();

    if (!q) { ready = true; render(box, [], '', [], []); return; }
    box.innerHTML = '<p class="smsg">' + esc(STR[lang()].loading) + '</p>';

    var req = new XMLHttpRequest();
    req.open('GET', '../assets/search-index.json?v=1', true);
    req.onreadystatechange = function () {
      if (req.readyState !== 4) return;

      var index;
      /* file:// reports status 0 on success, which is how this behaves
         when the site is opened straight off disk rather than served. */
      if ((req.status >= 200 && req.status < 300) || req.status === 0) {
        try { index = JSON.parse(req.responseText); } catch (e) { index = null; }
      }
      if (!index) {
        box.innerHTML = '<p class="smsg">' + esc(STR[lang()].failed) + '</p>';
        return;
      }

      var res = run(index, q);
      hits = res.hits;
      ts = res.words;
      corrected = res.corrected;
      ready = true;
      render(box, hits, q, ts, corrected);
    };
    req.send();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
