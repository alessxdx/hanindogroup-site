/* =====================================================================
   PT. Flowtech Engineering — EN / Bahasa Indonesia toggle
   ---------------------------------------------------------------------
   Same mechanism as the other company sites: on load it walks the
   visible text and, where a phrase matches an entry below, swaps
   English <-> Bahasa Indonesia. The choice is remembered
   (localStorage) across the pages of this site only.

   Two pages: the home page and Products & Services.

   To EDIT a translation: find the English on the left, change the
   Indonesian on the right. To ADD one: copy a line and fill in both
   sides. The English side must match the page EXACTLY, including
   punctuation — the match is on the whole trimmed text node, not a
   substring.

   Shared wording — the navigation, the footer, the contact block — is
   carried over verbatim from the group and Hanindo Automotive
   dictionaries rather than translated afresh, so the same English
   reads the same way in Indonesian on every site.

   DELIBERATELY LEFT IN ENGLISH
   1. Names — the company, every other company in the group, and the
      Gralessando and Custom entities.
   2. The street address, the phone number and the mailbox.
   3. SPBU is used for "fuel station" throughout: it is what the
      stations are called in Indonesia, and "stasiun bahan bakar" would
      read as a translation rather than as the thing itself.
   4. Industry shorthand that Indonesian site engineers say in English —
      turnkey, service bay, M&E.
   ===================================================================== */
(function () {
  var DICT = {
    /* ---- navigation / header ---- */
    "Your Solution Provider": "Mitra Solusi Anda",
    "Home": "Beranda",
    "About Us": "Tentang Kami",
    "Our Companies": "Perusahaan Kami",
    "Products & Services": "Produk & Layanan",
    "Products & services": "Produk & layanan",
    "Oil & Gas": "Minyak & Gas",
    "Automotive": "Otomotif",
    "Fire Fighting": "Pemadam Kebakaran",
    "Fire Fighting Department": "Departemen Pemadam Kebakaran",
    "Partners": "Mitra",
    "Career": "Karier",
    "Contact Us": "Hubungi Kami",

    /* ---- home: hero and intro ---- */
    "Fuel stations,": "SPBU,",
    "built end to end.": "dibangun menyeluruh.",
    "PT. Flowtech Engineering handles every aspect required in the construction of a fuel station — and now builds for the oil & gas and automotive garage sectors as well.": "PT. Flowtech Engineering menangani setiap aspek yang dibutuhkan dalam pembangunan SPBU — dan kini juga membangun untuk sektor minyak & gas serta bengkel otomotif.",
    "From running stations": "Dari mengelola SPBU",
    "to building them.": "hingga membangunnya.",
    "Experience gained in managing the fuel station business gave us the knowledge and resources to start our own fuel station construction business. Every aspect required in the construction of a fuel station is handled by us — so clients deal with one team from permit to handover.": "Pengalaman dalam mengelola bisnis SPBU memberi kami pengetahuan dan sumber daya untuk memulai bisnis konstruksi SPBU sendiri. Setiap aspek yang dibutuhkan dalam pembangunan SPBU kami tangani sendiri — sehingga klien berurusan dengan satu tim, dari perizinan hingga serah terima.",
    "Permit procedures managed on the client's behalf": "Prosedur perizinan diurus atas nama klien",
    "Materials and labour supplied and coordinated on site": "Material dan tenaga kerja disediakan serta dikoordinasikan di lokasi",
    "Mechanical and electrical installation": "Pemasangan mekanikal dan elektrikal",
    "Training of employees on operational and safety protocols": "Pelatihan karyawan mengenai prosedur operasional dan protokol keselamatan",

    /* ---- home: scope of work ---- */
    "What we do": "Yang kami lakukan",
    "Scope of work": "Lingkup pekerjaan",
    "Everything a station needs,": "Semua yang dibutuhkan SPBU,",
    "under one contract.": "dalam satu kontrak.",
    "Permits & Approvals": "Perizinan & Persetujuan",
    "We take on the permit procedures required before construction can begin, keeping the project schedule intact.": "Kami mengurus prosedur perizinan yang diperlukan sebelum konstruksi dapat dimulai, sehingga jadwal proyek tetap terjaga.",
    "Materials & Labour": "Material & Tenaga Kerja",
    "Supply of construction materials and the site labour to put them in place, managed as a single package.": "Pengadaan material konstruksi beserta tenaga kerja di lokasi untuk memasangnya, dikelola sebagai satu paket.",
    "Mechanical & Electrical Installation": "Pemasangan Mekanikal & Elektrikal",
    "Mechanical and electrical installation across the site, carried out by our own installation teams.": "Pemasangan mekanikal dan elektrikal di seluruh lokasi, dikerjakan oleh tim pemasangan kami sendiri.",
    "Operator & Safety Training": "Pelatihan Operator & Keselamatan",
    "Training of station employees on operational procedures and safety protocols before the site opens.": "Pelatihan karyawan SPBU mengenai prosedur operasional dan protokol keselamatan sebelum lokasi mulai beroperasi.",

    /* ---- home: sectors ---- */
    "Sectors": "Sektor",
    "Sectors we build for.": "Sektor yang kami bangun.",
    "Flowtech has broadened beyond fuel stations, drawing on the resources of its parent Hanindo Group to deliver complete construction solutions.": "Flowtech telah berkembang melampaui SPBU, memanfaatkan sumber daya induknya, Hanindo Group, untuk menghadirkan solusi konstruksi yang menyeluruh.",
    "Fuel Stations": "SPBU",
    "Turnkey fuel station construction — the division's founding business, built on years of running stations ourselves.": "Konstruksi SPBU turnkey — bisnis awal divisi ini, dibangun dari pengalaman bertahun-tahun mengelola SPBU sendiri.",
    "Permits": "Perizinan",
    "Civil works": "Pekerjaan sipil",
    "M&E installation": "Pemasangan M&E",
    "Operator training": "Pelatihan operator",
    "Construction work for the wider oil and gas industry, backed by the group's petroleum equipment experience.": "Pekerjaan konstruksi untuk industri minyak dan gas yang lebih luas, didukung pengalaman grup di bidang peralatan perminyakan.",
    "Industry projects": "Proyek industri",
    "Group resources": "Sumber daya grup",
    "Automotive Garages": "Bengkel Otomotif",
    "Construction of automotive garages and workshop facilities, delivered with the same single-contract approach.": "Pembangunan bengkel otomotif dan fasilitas workshop, dikerjakan dengan pendekatan satu kontrak yang sama.",
    "Workshops": "Bengkel",
    "Service bays": "Service bay",

    /* ---- home: sister company ---- */
    "Part of the same group": "Bagian dari grup yang sama",
    "Oil & Gas — PT. Hanindo Citra": "Minyak & Gas — PT. Hanindo Citra",
    "Flowtech builds the stations that PT. Hanindo Citra equips. Hanindo Citra supplies the dispensers, tank gauging, flow meters and fuel management systems, and provides after-sales service once the site is running.": "Flowtech membangun SPBU yang dilengkapi oleh PT. Hanindo Citra. Hanindo Citra memasok dispenser, tank gauging, flow meter, dan sistem manajemen bahan bakar, serta memberikan layanan purnajual setelah lokasi beroperasi.",
    "Visit Oil & Gas": "Kunjungi Minyak & Gas",
    "Their products": "Produk mereka",

    /* ---- contact block ---- */
    "Talk to Flowtech Engineering": "Hubungi Flowtech Engineering",
    "Have a construction": "Punya rencana proyek",
    "project in mind?": "konstruksi?",
    "Tell us about the site and our team will scope the permits, materials, labour and installation work needed to bring it into operation.": "Ceritakan lokasi Anda dan tim kami akan menentukan lingkup perizinan, material, tenaga kerja, dan pekerjaan pemasangan yang dibutuhkan untuk mengoperasikannya.",
    "Email our team": "Email tim kami",
    "Contact page": "Halaman kontak",
    "Head Office": "Kantor Pusat",
    "Phone": "Telepon",
    "Email": "Email",
    "Photo needed": "Perlu foto",

    /* ---- products & services page ---- */
    "Products &": "Produk &",
    "Services": "Layanan",
    "Fuel station construction handled end to end — permits, materials and labour, installation and operator training, under one contract.": "Konstruksi SPBU ditangani menyeluruh — perizinan, material dan tenaga kerja, pemasangan, dan pelatihan operator, dalam satu kontrak.",
    "Every aspect required in the construction of a fuel station is handled by us, so clients deal with one team from permit to handover.": "Setiap aspek yang dibutuhkan dalam pembangunan SPBU kami tangani sendiri, sehingga klien berurusan dengan satu tim dari perizinan hingga serah terima.",

    /* ---- footer ---- */
    "Your technology one stop solution — serving the oil & gas, automation, automotive and fire protection industries in Indonesia since 1987.": "Solusi teknologi satu atap Anda — melayani industri minyak & gas, otomasi, otomotif, dan proteksi kebakaran di Indonesia sejak 1987.",
    "Hanindo Automation Solutions": "Hanindo Automation Solutions",
    "Tel:": "Tel:",
    "© 2026 Hanindo Group. All Rights Reserved.": "© 2026 Hanindo Group. Hak Cipta Dilindungi."
  };

  var LANG_KEY = 'ha_flowtech_lang', ALT = 'id', HTML_LANG = 'id';
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
