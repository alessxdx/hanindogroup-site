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
      empty:    'Type something above to search the site.',
      loading:  'Searching…',
      failed:   'The search index could not be loaded. Please reload the page.',
      ph:       'Product, service or company'
    },
    id: {
      counted:  function (n, q) { return n + ' hasil untuk ' + '“' + q + '”'; },
      none:     function (q) { return 'Tidak ada hasil untuk “' + q + '”'; },
      hint:     'Coba kata yang lebih sedikit, atau nama produk atau perusahaan.',
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
    'citra':                'Hanindo Citra',
    'fire-fighting':        'Hanindo Citra — Fire Fighting',
    'flowtech-engineering': 'Flowtech Engineering',
    'automotive':           'Hanindo Automotive',
    'automation':           'Hanindo Automation Solutions',
    'printer-pos':          'Gralessando Pte Ltd',
    'shanghai':             'Hanindo Shanghai'
  };

  function sectionOf(url) {
    var seg = url.split('/')[0];
    if (seg.indexOf('.html') > -1) seg = '';
    return SECTION[seg] || 'Hanindo Group';
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

  function score(rec, ts, phrase) {
    var t = rec.t.toLowerCase(), d = (rec.d || '').toLowerCase(), x = rec.x.toLowerCase();
    var total = 0, matchedAll = true;

    for (var i = 0; i < ts.length; i++) {
      var term = ts[i];
      var inT = count(t, term), inD = count(d, term), inX = count(x, term);
      if (!inT && !inD && !inX) { matchedAll = false; continue; }
      total += inT * W_TITLE + inD * W_DESC + Math.min(inX, BODY_CAP) * W_BODY;
      if (inT && wholeWord(t, term)) total += W_TITLE_WORD;
    }

    if (ts.length > 1 && phrase) {
      if (t.indexOf(phrase) > -1) total += W_PHRASE_TITLE;
      else if (d.indexOf(phrase) > -1) total += W_PHRASE_DESC;
      else if (x.indexOf(phrase) > -1) total += W_PHRASE_BODY;
    }

    return { score: total, all: matchedAll };
  }

  function run(index, q) {
    var ts = terms(q);
    if (!ts.length) return [];
    var phrase = q.toLowerCase().trim();

    var strict = [], loose = [];
    for (var i = 0; i < index.length; i++) {
      var s = score(index[i], ts, phrase);
      if (!s.score) continue;
      (s.all ? strict : loose).push({ rec: index[i], score: s.score });
    }

    var hits = strict.length ? strict : loose;
    hits.sort(function (a, b) {
      return b.score - a.score || a.rec.t.localeCompare(b.rec.t);
    });
    return hits;
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

  function render(box, hits, q, ts) {
    var s = STR[lang()];

    if (!q) { box.innerHTML = '<p class="smsg">' + esc(s.empty) + '</p>'; return; }

    if (!hits.length) {
      box.innerHTML = '<p class="smsg"><strong>' + esc(s.none(q)) + '</strong></p>'
                    + '<p class="smsg sub">' + esc(s.hint) + '</p>';
      return;
    }

    var html = '<p class="scount">' + esc(s.counted(hits.length, q)) + '</p><ol class="sresults">';
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

    var hits = [], ts = terms(q), ready = false;

    /* Everything on this page that depends on the language and is not
       plain text sitting in the markup, so translate.js cannot reach it:
       the big field's placeholder (translate.js special-cases only the
       small header one) and the results, which are drawn long after
       translate.js has walked the page. */
    function applyLang() {
      if (field) field.setAttribute('placeholder', STR[lang()].ph);
      if (ready) render(box, hits, q, ts);
    }

    /* translate.js is loaded before this file, so its click handler is
       registered first and has already written the new choice to
       localStorage by the time ours reads it back. */
    var btns = document.querySelectorAll('.langtoggle [data-lang]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', applyLang);
    }
    applyLang();

    if (!q) { ready = true; render(box, [], '', []); return; }
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

      hits = run(index, q);
      ready = true;
      render(box, hits, q, ts);
    };
    req.send();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
