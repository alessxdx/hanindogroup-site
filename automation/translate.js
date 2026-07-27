/* =====================================================================
   PT. Hanindo Automation Solutions — EN / Bahasa Indonesia toggle
   ---------------------------------------------------------------------
   Same mechanism as fire-fighting/translate.js: on load it walks the
   visible text and, where a phrase matches an entry below, swaps
   English <-> Bahasa Indonesia. The choice is remembered
   (localStorage) across pages of this site only.

   To EDIT a translation: find the English on the left, change the
   Indonesian on the right. To ADD one: copy a line and fill in both
   sides. The English side must match the page EXACTLY, including
   punctuation — the match is on the whole trimmed text node, not a
   substring.

   Deliberately NOT translated: company and product names (Hanindo,
   Custom, Gralessando, the customer logos), and the street address,
   which is needed in its postal form.

   Wording for the shared items follows fire-fighting/translate.js so
   the two Indonesian sites read the same.
   ===================================================================== */
(function () {
  var DICT = {
    /* ---- navigation / header ---- */
    "Home": "Beranda",
    "About Us": "Tentang Kami",
    "Products & Services": "Produk & Layanan",
    "Contact Us": "Hubungi Kami",
    "Your Solution Provider": "Mitra Solusi Anda",
    "Other markets": "Pasar lainnya",

    /* ---- home hero + intro ---- */
    "PT. Hanindo Automation Solutions supplies the printing, scanning and point-of-sale hardware and software behind retail and hospitality automation.": "PT. Hanindo Automation Solutions menyediakan perangkat keras dan perangkat lunak pencetakan, pemindaian, dan point-of-sale yang menjadi tulang punggung otomasi ritel dan perhotelan.",
    "Printing, scanning, and point of sale.": "Pencetakan, pemindaian, dan point of sale.",
    "PT. Hanindo Automation Solutions carries the Custom range in Indonesia — the same printing, scanning and point-of-sale hardware and software the group supplies across South East Asia and China, delivered and supported from the Jakarta head office.": "PT. Hanindo Automation Solutions membawa rangkaian produk Custom di Indonesia — perangkat keras dan perangkat lunak pencetakan, pemindaian, dan point-of-sale yang sama dengan yang dipasok grup di Asia Tenggara dan Tiongkok, dikirim dan didukung dari kantor pusat Jakarta.",
    "Professional printing": "Pencetakan profesional",
    "POS, fiscal, ticket, label and mobile printers.": "Printer POS, fiskal, tiket, label, dan mobile.",
    "Point of sale & data capture": "Point of sale & penangkapan data",
    "Terminals, touch systems, cash registers, scanners and payment terminals.": "Terminal, sistem layar sentuh, mesin kasir, pemindai, dan terminal pembayaran.",
    "Scanning": "Pemindaian",
    "Document scanners and multifunction print-and-scan systems.": "Pemindai dokumen dan sistem cetak-pindai multifungsi.",

    /* ---- product strip ---- */
    "What we supply": "Yang kami sediakan",
    "Professional Printing Solutions": "Solusi Pencetakan Profesional",
    "DC / POS Solutions": "Solusi DC / POS",
    "Scanning Solutions": "Solusi Pemindaian",
    "Self-Service Solutions": "Solusi Layanan Mandiri",

    /* ---- customers ---- */
    "Customer base": "Basis pelanggan",

    /* ---- contact block ---- */
    "Talk to PT. Hanindo Automation Solutions": "Hubungi PT. Hanindo Automation Solutions",
    "Rolling out POS,": "Menggelar POS,",
    "or replacing a printer fleet?": "atau mengganti armada printer?",
    "Tell us the sites and volumes you handle and our team will match the right printing, scanning and POS package.": "Beri tahu kami lokasi dan volume yang Anda tangani, dan tim kami akan menyiapkan paket pencetakan, pemindaian, dan POS yang tepat.",
    "Email our team": "Email tim kami",
    "Contact page": "Halaman kontak",
    "Office": "Kantor",
    "Phone": "Telepon",
    "Email": "Email",
    "Jakarta Office": "Kantor Jakarta",
    "Tel:": "Tel:",

    /* ---- market note ---- */
    "This contact handles": "Kontak ini menangani",
    "Indonesia": "Indonesia",
    "China": "Tiongkok",
    ". For": ". Untuk",
    ", see": ", lihat",
    ". For Singapore, Malaysia, Vietnam, the Philippines or Thailand, see": ". Untuk Singapura, Malaysia, Vietnam, Filipina, atau Thailand, lihat",

    /* ---- footer ---- */
    "Our Companies": "Perusahaan Kami",
    "Your technology one stop solution — serving the oil & gas, automation, automotive and fire protection industries in Indonesia since 1987.": "Solusi teknologi satu atap Anda — melayani industri minyak & gas, otomasi, otomotif, dan proteksi kebakaran di Indonesia sejak 1987.",
    "© 2026 Hanindo Group. All Rights Reserved.": "© 2026 Hanindo Group. Hak Cipta Dilindungi.",

    /* ---- misc ---- */
    "Photo needed": "Perlu foto"
  };

  var LANG_KEY = 'ha_lang', ALT = 'id', HTML_LANG = 'id';
  var store = null;

  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  function translatable(node) {
    var p = node.parentNode;
    if (!p) return false;
    var nm = p.nodeName;
    if (nm === 'SCRIPT' || nm === 'STYLE' || nm === 'NOSCRIPT') return false;
    if (p.closest && (p.closest('svg') || p.closest('.langtoggle'))) return false;
    return true;
  }

  function collect() {
    store = [];
    if (!document.body || !document.createTreeWalker) return;
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = w.nextNode())) {
      if (!translatable(n)) continue;
      var raw = n.nodeValue, key = raw.trim();
      if (key && Object.prototype.hasOwnProperty.call(DICT, key)) {
        store.push({ node: n, en: raw, alt: raw.replace(key, DICT[key]) });
      }
    }
  }

  function setLang(lang) {
    if (!store) collect();
    each(store, function (o) { o.node.nodeValue = (lang === ALT) ? o.alt : o.en; });
    var s = document.querySelector('.searchbox input[name="q"]');
    if (s) s.setAttribute('placeholder', lang === ALT ? 'Cari' : 'Search');
    each(document.querySelectorAll('.langtoggle [data-lang]'), function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.documentElement.setAttribute('lang', lang === ALT ? HTML_LANG : 'en');
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  function init() {
    collect();
    each(document.querySelectorAll('.langtoggle [data-lang]'), function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
    });
    var saved = 'en';
    try { saved = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) {}
    setLang(saved);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
