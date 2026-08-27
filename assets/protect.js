/* ================= IMAGE RIGHT-CLICK DETERRENT =================
   Takes the context menu, the drag handle and the long-press callout
   away from every image and inline logo on the site, so a visitor
   cannot casually right-click a photo and Save image as.

   READ THIS BEFORE RELYING ON IT.

   This is a deterrent, not protection. Every image on this site is a
   public file at a public URL: photos/citra/hero/hero-citra.webp is
   served to anyone who asks for it, and nothing here changes that.
   Anyone who wants an image can still

     - open the URL directly, from the page source or the network tab;
     - use the browser's developer tools, which this cannot reach;
     - turn JavaScript off, which turns this file off with it;
     - take it out of the browser cache on disk;
     - screenshot the page.

   What it stops is the accidental and the casual: the visitor who
   right-clicks out of habit, and the one who drags a picture onto the
   desktop. That is a real share of the copying that happens, which is
   why the file exists -- but a determined taker is not slowed down by
   it at all. If the images genuinely need defending, the measures that
   work are a visible watermark, publishing screen-resolution copies
   rather than the originals, and hotlink rules on the server. Those
   change what a taker gets; this only changes how they ask.

   WHAT IT COSTS. The context menu on an image is a real browser
   feature, and legitimate visitors lose it: Open image in new tab,
   Copy image address, and -- where a logo is wrapped in a link, as the
   header brand marks are -- Open link in new tab. The menu is left
   alone everywhere else on the page, so text can still be selected,
   copied and searched, and links outside images keep their menu. That
   is the narrowest form of this that still answers the ask.

   Scoped to <img> and inline <svg>. Background images set in CSS have
   no context menu of their own to take away -- the menu that opens over
   them belongs to the page, and blocking that would cost every link on
   it.
   ============================================================== */
(function () {
  'use strict';

  /* True for an image, an inline SVG, or anything sitting inside one --
     a <use>, a <path>, a <title> in an SVG all report themselves as the
     target, not the <svg> around them. closest() walks up to find it.
     Guarded for text nodes and the document itself, which have no
     closest(). */
  function isArtwork(node) {
    if (!node || typeof node.closest !== 'function') return false;
    return !!node.closest('img, svg, picture');
  }

  document.addEventListener('contextmenu', function (e) {
    if (isArtwork(e.target)) e.preventDefault();
  });

  /* Dragging a picture out of the page and onto the desktop saves it
     with no menu involved, so the drag has to go too. Listed separately
     from the CSS rule in site.css: -webkit-user-drag is not a standard
     property and Firefox has never supported it, so the CSS covers
     Chrome and Safari and this covers the rest. */
  document.addEventListener('dragstart', function (e) {
    if (isArtwork(e.target)) e.preventDefault();
  });
})();
