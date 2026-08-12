/* ================= MOBILE NAVIGATION =================
   The phone menu. On a desktop the tab bar and its hover drop-downs are
   pure CSS and this file does nothing at all; everything below only takes
   effect under the 860px breakpoint, which is where site.css hides the
   tab row and shows the burger.

   What it replaces: a one-line inline script, repeated on all fifty-five
   pages, that toggled an .open class on the tab list. That gave a panel
   which dropped out of the header with every sub-menu already unfolded —
   thirty-odd rows on the group pages, so the reader met the whole site
   map at once and had to scroll the menu to reach Contact Us.

   Three things happen here instead.

     1. The list becomes a drawer that comes in from the right edge, over
        a dimmed page. A phone menu that arrives from the side reads as a
        panel you have opened and can push back; one that unrolls out of
        the header reads as the page having changed shape.

     2. Every entry with a sub-menu keeps its own link and gains a chevron
        beside it. Tapping the name still goes to the section page.
        Tapping the chevron opens the list underneath it. So the drawer
        opens at six or seven rows rather than thirty, and the reader
        chooses what to unfold.

     3. The rows arrive in sequence behind the panel rather than with it,
        top to bottom, which is the order they are read in.

   The markup is untouched. The drawer's own furniture — its heading bar,
   the close button, the chevrons, the dimming layer, and the search box
   the desktop bar has and the phone had lost — is all built here, so the
   pages carry no menu-specific HTML and none of them has to be edited
   again to change how the menu behaves.
   ==================================================================== */
(function(){
  var burger = document.getElementById('burger');
  var tabs   = document.getElementById('tabs');
  if(!burger || !tabs) return;

  var root = document.documentElement;
  /* Must stay equal to the breakpoint in site.css and fire-fighting.css:
     the drawer's furniture is built only below it, and unbuilt above. */
  var phone = window.matchMedia('(max-width:860px)');

  /* ---------- the drawer's own furniture ----------
     Built once, on first use, and left in place afterwards — the CSS
     hides all of it above the breakpoint, so a reader who rotates a
     tablet does not pay for it twice. */
  var scrim, built = false;

  function build(){
    if(built) return; built = true;

    /* The dimming layer belongs to the page, not to the list, so it goes
       on the body: inside .tabs it could only ever cover the drawer. */
    scrim = document.createElement('div');
    scrim.className = 'navscrim';
    scrim.addEventListener('click', function(){ open(false); });
    document.body.appendChild(scrim);

    /* Heading bar. It is an <li> and not a <div> because .tabs is a <ul>
       and only list items belong in one. It sticks to the top of the
       drawer so the way out stays on screen once the reader has scrolled
       down a long menu. */
    var head = document.createElement('li');
    head.className = 'navhead';
    head.innerHTML =
      '<button type="button" class="navclose" aria-label="Close menu">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
    head.querySelector('.navclose').addEventListener('click', function(){ open(false); });

    /* On a company mini-site the heading is the way back to the group,
       not the word "Menu".
       The desktop bar carries that link in .top-right, which is hidden
       from 860px down, so on a phone the only route back was the grey
       breadcrumb in the hero — which reads as where you are rather than
       as somewhere you can go. Borrowing the link puts it at the top of
       the panel, where someone who has lost their way looks first, and
       costs no row of its own: the label it replaces did nothing.
       Cloned rather than written out, so it appears only where there is
       one to clone. The group's own pages ARE the group and carry no
       such link; they keep the plain label.
       The two lines are already on it — see twoLine() below, which runs
       against the topbar copy on load — so this only has to clone. */
    var back = document.querySelector('.top-right .grouplink');
    head.insertBefore(
      back ? back.cloneNode(true) : label('Menu'),
      head.firstChild);
    tabs.insertBefore(head, tabs.firstChild);

    /* The search box, borrowed from the desktop bar. .top-right is hidden
       from 860px down, so on a phone the site had no search at all — the
       field was there on every page and simply unreachable. Cloning it
       keeps the one copy of the markup in the pages and carries its
       hsearch() submit handler across with it. */
    var box = document.querySelector('.top-right .searchbox');
    if(box){
      var li = document.createElement('li');
      li.className = 'navsearch';
      li.appendChild(box.cloneNode(true));
      head.insertAdjacentElement('afterend', li);
    }

    /* ---------- chevrons ----------
       One per entry that owns a sub-menu, sitting beside the link rather
       than replacing it: the parent rows lead somewhere real (the
       Products & Services page, the group's companies section) and a
       phone reader should still be able to get there. */
    var n = 0;
    each(tabs.children, function(li){
      var drop = child(li, 'drop');
      if(!drop) return;
      var link = child(li, null, 'A');
      if(!link) return;

      var id = drop.id || (drop.id = 'navdrop' + (++n));
      var tog = document.createElement('button');
      tog.type = 'button';
      tog.className = 'dtog';
      tog.setAttribute('aria-expanded', 'false');
      tog.setAttribute('aria-controls', id);
      /* The label names what the chevron opens, so a screen reader hears
         "Our Companies, link" then "Show Our Companies menu, button"
         rather than two unlabelled controls in a row. */
      tog.setAttribute('aria-label', 'Show ' + link.textContent.trim() + ' menu');
      tog.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
      tog.addEventListener('click', function(){
        fold(li, drop, tog, !li.classList.contains('dopen'));
      });
      link.insertAdjacentElement('afterend', tog);

      /* The section the reader is already in opens itself. .on marks the
         current page inside a drop-down, .active the current section in
         the tab bar; either one means this list is the one they want. */
      if(li.classList.contains('active') || drop.querySelector('.on')){
        fold(li, drop, tog, true, true);
      }
    });

    /* The --i counter that used to live here is gone with the entrance
       stagger it fed. See the note in site.css: the effect broke the menu
       on a phone twice and has been removed rather than fixed a third
       time. Nothing reads --i now, so nothing writes it. */
  }

  /* ---------- open and shut ----------
     A sub-menu has no fixed height, and 'auto' is not a value CSS can
     animate from or to, so the height is measured and written each time.
     Once open it is released back to none: the language toggle rewrites
     these rows in Bahasa, and a pinned pixel height would clip the longer
     wording. */
  function fold(li, drop, tog, on, now){
    li.classList.toggle('dopen', on);
    tog.setAttribute('aria-expanded', on ? 'true' : 'false');
    if(now){ drop.style.maxHeight = 'none'; return; }
    if(on){
      drop.style.maxHeight = drop.scrollHeight + 'px';
      after(drop, function(){ if(li.classList.contains('dopen')) drop.style.maxHeight = 'none'; });
    }else{
      /* From a measured height, not from none — a transition needs a
         number to start at, and the browser will not compute one from a
         keyword mid-frame. The reflow between the two writes is what
         makes the first of them stick. */
      drop.style.maxHeight = drop.scrollHeight + 'px';
      void drop.offsetHeight;
      drop.style.maxHeight = '0px';
    }
  }

  function open(on){
    if(on) build();
    /* The drawer's search field starts empty every time it is opened, for
       the same reason the pages clear the desktop one on pageshow: coming
       back to a page should not find the last query still sitting there.
       That handler only reaches the first field on the page, which is the
       one in .top-right — this copy is its own. */
    if(on){ var q = tabs.querySelector('.navsearch input[name="q"]'); if(q) q.value = ''; }
    tabs.classList.toggle('open', on);
    if(scrim) scrim.classList.toggle('on', on);
    /* The lock goes on <html>. body carries overflow-x:clip for reasons
       set out in site.css, and overflow:hidden there would undo it. */
    root.classList.toggle('nav-open', on);
    burger.setAttribute('aria-expanded', on ? 'true' : 'false');
  }

  /* The way back to the group reads as two lines at every width now, not
     just in the drawer. Done to the topbar copy on load rather than in
     the markup because the same anchor is written into forty-seven pages
     and none of them should have to change for a wording decision — and
     because the drawer clones this element, so doing it here means the
     phone and the desktop cannot drift apart.
     Runs regardless of width: the desktop link is the one it edits, and
     the drawer takes its copy from the result. */
  var topback = document.querySelector('.top-right .grouplink');
  if(topback) twoLine(topback);

  burger.addEventListener('click', function(){ open(!tabs.classList.contains('open')); });

  /* Any destination shuts the drawer behind it. Same-page anchors would
     otherwise scroll the page under a panel still covering it. */
  tabs.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a') : null;
    if(a && tabs.contains(a)) open(false);
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && tabs.classList.contains('open')) open(false);
  });

  /* Back above the breakpoint the drawer is a horizontal tab bar again
     and the sub-menus are hover drop-downs. Both would be held shut by
     the inline heights written above, so they are cleared. */
  function width(){
    if(phone.matches) return;
    open(false);
    each(tabs.children, function(li){
      var drop = child(li, 'drop');
      if(drop){ drop.style.maxHeight = ''; li.classList.remove('dopen'); }
    });
  }
  if(phone.addEventListener) phone.addEventListener('change', width);
  else if(phone.addListener) phone.addListener(width);

  /* ---------- small helpers ---------- */
  function each(list, fn){ Array.prototype.forEach.call(list, fn); }
  /* The desktop link reads "Hanindo Group" beside a chevron, which in the
     tab bar is enough — it sits in a row of controls that plainly act on
     the page. Lifted into the drawer it became the panel's heading, and
     a heading is not something anyone taps. So the copy says what it
     does: a small "Back to" over the name it goes back to.
     Two text nodes rather than one string, because translate.js matches
     whole trimmed text nodes — "Back to" is a key each company's
     dictionary can carry, and the company name is left alone, which is
     the rule those dictionaries already follow for names. */
  function twoLine(a){
    var name = a.querySelector('span');
    if(!name || a.querySelector('.glback')) return a;
    var stack = document.createElement('span');
    stack.className = 'glstack';
    var kicker = document.createElement('span');
    kicker.className = 'glback';
    kicker.textContent = 'Back to';
    a.replaceChild(stack, name);
    stack.appendChild(kicker);
    stack.appendChild(name);
    return a;
  }
  function label(text){
    var s = document.createElement('span');
    s.className = 'navttl';
    s.textContent = text;
    return s;
  }
  function child(el, cls, tag){
    for(var n = el.firstElementChild; n; n = n.nextElementSibling){
      if(cls && n.classList.contains(cls)) return n;
      if(tag && n.tagName === tag) return n;
    }
    return null;
  }
  /* Runs after the height transition, or straight away where transitions
     are off — under prefers-reduced-motion site.css disables them all and
     no transitionend would ever arrive. */
  function after(el, fn){
    var ms = parseFloat(getComputedStyle(el).transitionDuration) || 0;
    if(!ms){ fn(); return; }
    var done = function(e){ if(e.target !== el) return; el.removeEventListener('transitionend', done); fn(); };
    el.addEventListener('transitionend', done);
  }
})();
