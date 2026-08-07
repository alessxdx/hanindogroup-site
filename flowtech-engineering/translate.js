/* =====================================================================
   PT. Flowtech Engineering — EN / Bahasa Indonesia toggle
   ---------------------------------------------------------------------
   Same mechanism as the other company sites: on load it walks the
   visible text and, where a phrase matches an entry below, swaps
   English <-> Bahasa Indonesia. The choice is remembered
   (localStorage) across the pages of this site only.

   Two pages: the company page and Scope of Work.

   To EDIT a translation: find the English on the left, change the
   Indonesian on the right. To ADD one: copy a line and fill in both
   sides. The English side must match the page EXACTLY, including
   punctuation — the match is on the whole trimmed text node, not a
   substring. Note that <b> and <span> split a sentence into several
   text nodes, so the numbered stages on Scope of Work and the labels
   in the company-detail list each need two entries: the bold lead-in
   and the sentence that follows it.

   Shared wording — the navigation, the footer, the contact block — is
   carried over verbatim from the group and Hanindo Automotive
   dictionaries rather than translated afresh, so the same English
   reads the same way in Indonesian on every site.

   DELIBERATELY LEFT IN ENGLISH
   1. Names — the company, its director, every other company in the
      group, and the oil companies on the client list. "PT. Kridapetra
      Graha" is a registered name in either language.
   2. The street address, the phone and fax numbers, the mailbox and
      the website.
   3. SPBU is used for "fuel station" throughout: it is what the
      stations are called in Indonesia, and "stasiun bahan bakar" would
      read as a translation rather than as the thing itself.
   4. Industry shorthand that Indonesian site engineers say in English —
      turnkey, dispenser, shop drawing, M&E.
   ===================================================================== */
(function () {
  var DICT = {
    /* ---- navigation / header ---- */
    "Your Solution Provider": "Mitra Solusi Anda",
    "Home": "Beranda",
    "About Us": "Tentang Kami",
    "Our Companies": "Perusahaan Kami",
    /* the two headings inside the Our Companies menu — same wording as
       the group dictionary, which groups by trade and by market. */
    "By industry": "Menurut industri",
    "Printer & POS, by market": "Printer & POS, menurut pasar",
    "Hanindo Automation Solutions": "Hanindo Automation Solutions",
    "(Indonesia)": "(Indonesia)",
    "(Singapore)": "(Singapura)",
    "(China)": "(Tiongkok)",
    "Products & Services": "Produk & Layanan",
    "Oil & Gas": "Minyak & Gas",
    "Automotive": "Otomotif",
    "Fire Fighting": "Pemadam Kebakaran",
    "Fire Fighting Department": "Departemen Pemadam Kebakaran",
    "Printer & POS": "Printer & POS",
    "Partners": "Mitra",
    "Career": "Karier",
    "Contact Us": "Hubungi Kami",

    /* ---- company page: hero and about ---- */
    "Fuel stations,": "SPBU,",
    "built end to end.": "dibangun menyeluruh.",
    "PT. Flowtech Engineering has handled every aspect required in the construction of a fuel station since 2002 — permits, materials, labour, mechanical and electrical installation and operator training — and builds for the oil & gas industry as well.": "PT. Flowtech Engineering telah menangani setiap aspek yang dibutuhkan dalam pembangunan SPBU sejak 2002 — perizinan, material, tenaga kerja, pemasangan mekanikal dan elektrikal, serta pelatihan operator — dan juga membangun untuk industri minyak & gas.",
    "About us": "Tentang kami",
    "From running stations": "Dari mengelola SPBU",
    "to building them.": "hingga membangunnya.",
    "Experience gained in managing the fuel station business gave us the knowledge and resources to start our own fuel station construction business. PT. Flowtech Engineering provides a complete solution for anyone deciding to open a fuel station of their own.": "Pengalaman dalam mengelola bisnis SPBU memberi kami pengetahuan dan sumber daya untuk memulai bisnis konstruksi SPBU sendiri. PT. Flowtech Engineering menghadirkan solusi lengkap bagi siapa pun yang memutuskan untuk membuka SPBU sendiri.",
    "Every aspect required in the construction of a fuel station is handled by us — from permit request procedures, raw materials and labour force, through mechanical and electrical installation, to the training of station employees on operational and safety procedures.": "Setiap aspek yang dibutuhkan dalam pembangunan SPBU kami tangani sendiri — mulai dari prosedur permohonan izin, material dan tenaga kerja, pemasangan mekanikal dan elektrikal, hingga pelatihan karyawan SPBU mengenai prosedur operasional dan keselamatan.",
    "As part of Hanindo Group, Flowtech Engineering went on to take construction work for the oil and gas industry as well. It is the strength of the companies within the group that lets Flowtech deliver a complete solution on the construction side.": "Sebagai bagian dari Hanindo Group, Flowtech Engineering kemudian juga menangani pekerjaan konstruksi untuk industri minyak dan gas. Kekuatan perusahaan-perusahaan di dalam grup inilah yang memungkinkan Flowtech menghadirkan solusi menyeluruh di sisi konstruksi.",
    "Permit procedures managed on the client's behalf": "Prosedur perizinan diurus atas nama klien",
    "Materials and labour supplied and coordinated on site": "Material dan tenaga kerja disediakan serta dikoordinasikan di lokasi",
    "Mechanical and electrical installation": "Pemasangan mekanikal dan elektrikal",
    "Training of employees on operational and safety protocols": "Pelatihan karyawan mengenai prosedur operasional dan protokol keselamatan",

    /* ---- company page: company detail ----
       Labels sit inside <b>, values in the text node after the <br/>,
       so each row that needs translating takes two entries. The
       address, the numbers and the website are left as they are. */
    "Detail of the company": "Detail perusahaan",
    "Company detail.": "Detail perusahaan.",
    "Registered name": "Nama terdaftar",
    "Date of establishment": "Tanggal pendirian",
    "27 August 2002": "27 Agustus 2002",
    "Type of company": "Bentuk perusahaan",
    "Private limited": "Perseroan terbatas",
    "Director": "Direktur",
    "Company address": "Alamat perusahaan",
    "Telephone": "Telepon",
    "Facsimile": "Faksimile",
    "Website": "Situs web",

    /* ---- both pages: scope of work ---- */
    "What we do": "Yang kami lakukan",
    "Scope of work": "Lingkup pekerjaan",
    "Everything a station needs,": "Semua yang dibutuhkan SPBU,",
    "under one contract.": "dalam satu kontrak.",
    "Permits & Approvals": "Perizinan & Persetujuan",
    "We take on the permit request procedures required before construction can begin, keeping the project schedule intact.": "Kami menangani prosedur permohonan izin yang diperlukan sebelum konstruksi dapat dimulai, sehingga jadwal proyek tetap terjaga.",
    "Materials & Labour": "Material & Tenaga Kerja",
    "Supply of raw materials and the site labour force to put them in place, managed as a single package.": "Pengadaan material dasar beserta tenaga kerja di lokasi untuk memasangnya, dikelola sebagai satu paket.",
    "Mechanical & Electrical Installation": "Pemasangan Mekanikal & Elektrikal",
    "Mechanical and electrical installation across the site, carried out by our own installation teams.": "Pemasangan mekanikal dan elektrikal di seluruh lokasi, dikerjakan oleh tim pemasangan kami sendiri.",
    "Operator & Safety Training": "Pelatihan Operator & Keselamatan",
    "Short training for station employees on fuel station operational and safety procedures before the site opens.": "Pelatihan singkat bagi karyawan SPBU mengenai prosedur operasional dan keselamatan SPBU sebelum lokasi mulai beroperasi.",
    "Full scope of work": "Lingkup pekerjaan lengkap",

    /* ---- both pages: sectors ---- */
    "Sectors": "Sektor",
    "Sectors we build for.": "Sektor yang kami bangun.",
    "Fuel stations": "SPBU",
    "Turnkey construction and renovation — the founding business, built on years of running stations ourselves.": "Konstruksi dan renovasi turnkey — bisnis awal perusahaan, dibangun dari pengalaman bertahun-tahun mengelola SPBU sendiri.",
    "Oil & gas industry": "Industri minyak & gas",
    "Construction work for the wider oil and gas industry, backed by the group's petroleum equipment experience.": "Pekerjaan konstruksi untuk industri minyak dan gas yang lebih luas, didukung pengalaman grup di bidang peralatan perminyakan.",
    "Clients & project references": "Klien & referensi proyek",

    /* ---- company page: clients ----
       Only the descriptions translate. The registered names above them
       are names in either language. */
    "Our client list": "Daftar klien kami",
    "Who we built for.": "Untuk siapa kami membangun.",
    "Between 2006 and 2015 Flowtech built and renovated fuel stations for the national oil company and for the international brands operating in Indonesia.": "Antara 2006 dan 2015 Flowtech membangun dan merenovasi SPBU untuk perusahaan minyak nasional serta merek-merek internasional yang beroperasi di Indonesia.",
    "Indonesian state oil and gas company": "Perusahaan minyak dan gas milik negara Indonesia",
    "Pertamina's retail station network": "Jaringan SPBU ritel Pertamina",

    /* ---- company page: project references ---- */
    "Project references": "Referensi proyek",
    "Stations we delivered.": "SPBU yang kami selesaikan.",
    "Nine fuel station projects between 2008 and 2013, across Jakarta, Bekasi, Bandung and Duri. Among them:": "Sembilan proyek SPBU antara 2008 dan 2013, di Jakarta, Bekasi, Bandung, dan Duri. Di antaranya:",
    "Shell petrol station, S. Parman": "SPBU Shell, S. Parman",
    "Petronas service station, Fatmawati": "SPBU Petronas, Fatmawati",
    "Chevron service station, Duri Camp": "SPBU Chevron, Duri Camp",
    "Pertamina petrol station, Pondok Indah": "SPBU Pertamina, Pondok Indah",
    "Total gas station, Kemang Raya": "SPBU Total, Kemang Raya",

    /* ---- scope of work page: hero ---- */
    "Scope of Work": "Lingkup Pekerjaan",
    "Scope of": "Lingkup",
    "work.": "pekerjaan.",
    "Fuel station construction handled end to end — design, permits, materials and labour, installation and operator training, under one contract.": "Konstruksi SPBU ditangani menyeluruh — desain, perizinan, material dan tenaga kerja, pemasangan, dan pelatihan operator, dalam satu kontrak.",
    "Every aspect required in the construction of a fuel station is handled by us, so clients deal with one team from permit to handover.": "Setiap aspek yang dibutuhkan dalam pembangunan SPBU kami tangani sendiri, sehingga klien berurusan dengan satu tim dari perizinan hingga serah terima.",

    /* ---- scope of work page: the four contractor stages ----
       Bold lead-in first, then the sentence that follows it. */
    "As contractor": "Sebagai kontraktor",
    "How a project runs.": "Bagaimana proyek berjalan.",
    "In general, the scope of work and responsibility taken on as contractor runs in four stages.": "Secara umum, lingkup pekerjaan dan tanggung jawab yang diemban sebagai kontraktor berjalan dalam empat tahap.",
    "Review of basic design.": "Peninjauan desain dasar.",
    "Studying the re-design of all plans submitted to the owner and comparing them against the conditions in the field.": "Mempelajari kembali rancangan seluruh gambar rencana yang diserahkan kepada pemilik dan membandingkannya dengan kondisi di lapangan.",
    "Detail design.": "Desain detail.",
    "Planning and re-making the whole of the design so that activities and actual work can be planned for execution. The detailed design, once approved by the owner, becomes the basic reference for planning the work in the field.": "Merencanakan dan menyusun ulang keseluruhan desain agar kegiatan dan pekerjaan yang sebenarnya dapat direncanakan untuk dilaksanakan. Desain detail yang telah disetujui pemilik menjadi acuan dasar perencanaan pekerjaan di lapangan.",
    "Work preparation.": "Persiapan pekerjaan.",
    "Soil investigation, preparation of the work permit for safety, survey and measurement, and preparation of shop drawings.": "Penyelidikan tanah, penyiapan izin kerja untuk keselamatan, survei dan pengukuran, serta penyiapan shop drawing.",
    "Construction work.": "Pekerjaan konstruksi.",
    "Tanks, fuel piping, buildings and canopy — the site built out and handed over.": "Tangki, perpipaan bahan bakar, bangunan, dan kanopi — lokasi dibangun hingga diserahterimakan.",

    /* ---- scope of work page: stage 3 ---- */
    "Stage 3": "Tahap 3",
    "Soil investigation": "Penyelidikan tanah",
    "Work permit to safety": "Izin kerja untuk keselamatan",
    "Survey & measurement": "Survei & pengukuran",
    "Shop drawings": "Shop drawing",

    /* ---- scope of work page: stage 4 ---- */
    "Stage 4": "Tahap 4",
    "Buried tank construction": "Konstruksi tangki pendam",
    "Excavation, tank chamber and the setting of the underground storage tanks.": "Penggalian, ruang tangki, dan penempatan tangki penyimpanan bawah tanah.",
    "Double-wall tank installation": "Pemasangan tangki dinding ganda",
    "Installation of double-wall tanks where the specification calls for secondary containment.": "Pemasangan tangki dinding ganda apabila spesifikasi mensyaratkan penahan sekunder.",
    "Fuel piping": "Perpipaan bahan bakar",
    "Product and vapour lines run from the tanks to the dispensers.": "Jalur produk dan uap yang membentang dari tangki ke dispenser.",
    "Construction of building": "Pembangunan gedung",
    "The station building — sales area, office and back-of-house.": "Bangunan SPBU — area penjualan, kantor, dan area belakang.",
    "Canopy": "Kanopi",
    "Steelwork, roofing and lighting over the forecourt islands.": "Pekerjaan baja, atap, dan penerangan di atas pulau pengisian.",

    /* ---- sister company ---- */
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

    /* ---- footer ---- */
    "Your technology one stop solution — serving the oil & gas, automation, automotive and fire protection industries in Indonesia since 1987.": "Solusi teknologi satu atap Anda — melayani industri minyak & gas, otomasi, otomotif, dan proteksi kebakaran di Indonesia sejak 1987.",
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
