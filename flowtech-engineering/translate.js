/* =====================================================================
   PT. Flowtech Engineering — EN / Bahasa Indonesia toggle
   ---------------------------------------------------------------------
   Same mechanism as the other company sites: on load it walks the
   visible text and, where a phrase matches an entry below, swaps
   English <-> Bahasa Indonesia. The choice is remembered
   (localStorage) across the pages of this site only.

   Five pages: Home, About Us, Products & Services, Projects and
   Contact Us.

   To EDIT a translation: find the English on the left, change the
   Indonesian on the right. To ADD one: copy a line and fill in both
   sides. The English side must match the page EXACTLY, including
   punctuation — the match is on the whole trimmed text node, not a
   substring. Note that <b> and <span> split a sentence into several
   text nodes, so the numbered stages on Scope of Work and the labels
   in the company-detail list each need two entries: the bold lead-in
   and the sentence that follows it.

   Where a split like that does NOT translate in the English order, the
   dictionary cannot do the job — Indonesian reverses "Featured
   Projects" into "Proyek Unggulan". Those halves carry their own
   Indonesian in a data-bahasa attribute instead of appearing below; see
   collectScoped() at the foot of this file.

   Shared wording — the navigation and the footer — is carried over
   verbatim from the group and PT. Hanindo Automotive dictionaries
   rather than translated afresh, so the same English reads the same way
   in Indonesian on every site. The contact band was shared the same way
   until it came off the four inner pages.

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
    /* the Our Businesses menu, built by assets/nav.js */
    "Our Businesses": "Bidang Usaha Kami",
    "Fire Fighting": "Pemadam Kebakaran",
    "Automotive": "Otomotif",
    "Fire Fighting Department": "Departemen Pemadam Kebakaran",
    "A division of PT. Hanindo Citra": "Divisi dari PT. Hanindo Citra",
    "Indonesia": "Indonesia",
    "Singapore": "Singapura",
    "China": "Tiongkok",
    "You are here": "Anda di sini",
    /* ---- directions ---- */
    "Get directions": "Petunjuk arah",
    /* ---- navigation / header ---- */
    "Your Solution Provider": "Mitra Solusi Anda",
    "Back to": "Kembali ke",
    "Home": "Beranda",
    "About Us": "Tentang Kami",
    /* the two headings inside the Our Companies menu — same wording as
       the group dictionary, which groups by trade and by market. */
    /* the tab, the footer link, the breadcrumb and the page's own heading
       all read "Services" now, so one entry covers the lot. The
       "Products & Services" and "Products & services" entries that used
       to sit here went with the old label. */
    "Services": "Layanan",
    "Projects": "Proyek",
    /* "Contact Us" is the tab, the footer link and the breadcrumb. The
       "Contact page" entry that sat under it was the contact band's
       second button and went with the band. */
    "Contact Us": "Hubungi Kami",

    /* ---- company page: hero and about ---- */
    /* the home hero is the company name now, so it needs no entry — a
       registered name reads the same in either language. The two halves
       it used to carry, "Fuel stations," and "built end to end.", have
       gone with it. */
    "PT. Flowtech Engineering has handled every aspect required in the construction of a fuel station since 2002 — permits, materials, labour, mechanical and electrical installation and operator training.": "PT. Flowtech Engineering telah menangani setiap aspek yang dibutuhkan dalam pembangunan SPBU sejak 2002 — perizinan, material, tenaga kerja, pemasangan mekanikal dan elektrikal, serta pelatihan operator.",
    "Fuel Station & Oil & Gas Construction": "Konstruksi SPBU & Fasilitas Minyak & Gas",
    "PT. Flowtech Engineering provides end-to-end construction solutions for fuel stations and oil & gas facilities — from engineering and permitting to construction, installation and operational preparation.": "PT. Flowtech Engineering menghadirkan solusi konstruksi menyeluruh untuk SPBU dan fasilitas minyak & gas — mulai dari rekayasa dan perizinan hingga konstruksi, pemasangan, dan persiapan operasional.",
    "Our capabilities": "Kemampuan kami",
    "Fuel station construction and renovation": "Konstruksi dan renovasi SPBU",
    "Engineering, civil, mechanical and electrical works": "Pekerjaan rekayasa, sipil, mekanikal, dan elektrikal",
    "Equipment installation and commissioning": "Pemasangan dan commissioning peralatan",
    "Operator training": "Pelatihan operator",

    /* ---- company page: what we deliver ----
       The four cards under the capability list. "Commissioning" stays as
       it is: it is the word used on site in either language, like shop
       drawing and turnkey above. */
    "What we deliver": "Yang kami kerjakan",
    "Engineering & Design": "Rekayasa & Desain",
    "Design review, detailed engineering, site surveys and shop drawings.": "Peninjauan desain, rekayasa detail, survei lokasi, dan shop drawing.",
    "Construction": "Konstruksi",
    "Fuel station construction, renovation and site preparation.": "Konstruksi SPBU, renovasi, dan persiapan lokasi.",
    "Mechanical & Electrical": "Mekanikal & Elektrikal",
    "Mechanical, electrical and equipment installation.": "Pemasangan mekanikal, elektrikal, dan peralatan.",
    "Commissioning & Training": "Commissioning & Pelatihan",
    "Testing, commissioning, handover and operational safety training.": "Pengujian, commissioning, serah terima, dan pelatihan keselamatan operasional.",


    /* ---- about page ----
       The hero is "About Us" over two text nodes, the .fx span splitting
       it, so each half needs its own entry. The sentence that used to run
       under it was taken out at the business's request. */
    "About": "Tentang",
    "Us": "Kami",
    "Company overview": "Profil perusahaan",
    "Built on Fuel Station Experience": "Dibangun dari pengalaman SPBU",
    "PT. Flowtech Engineering was established in 2002 as part of the Hanindo Group. Drawing on the Group's experience in the fuel station business, Flowtech was established to provide construction and engineering solutions for the industry.": "PT. Flowtech Engineering didirikan pada 2002 sebagai bagian dari Hanindo Group. Berbekal pengalaman Grup dalam bisnis SPBU, Flowtech didirikan untuk menghadirkan solusi konstruksi dan rekayasa bagi industri tersebut.",
    "We have delivered new construction and renovation projects for major energy companies in Indonesia, including Pertamina, Petronas, Shell, Total and Chevron.": "Kami telah menyelesaikan proyek pembangunan baru dan renovasi untuk perusahaan energi besar di Indonesia, termasuk Pertamina, Petronas, Shell, Total, dan Chevron.",
    "Today, Flowtech provides construction solutions for fuel stations and the wider oil & gas industry, covering engineering, construction, mechanical and electrical installation, commissioning and operational preparation.": "Kini, Flowtech menghadirkan solusi konstruksi untuk SPBU dan industri minyak & gas yang lebih luas, mencakup rekayasa, konstruksi, pemasangan mekanikal dan elektrikal, commissioning, serta persiapan operasional.",

    /* ---- about page: vision & mission ----
       The numbered mission items are a <span class="n"> and a <p>, so the
       digit is its own text node and needs no entry -- only the sentence
       beside it does. */
    "Our direction": "Arah kami",
    "Vision & Mission": "Visi & Misi",
    "01 / Vision": "01 / Visi",
    "Vision": "Visi",
    "To be a trusted construction partner for fuel station and oil & gas projects in Indonesia.": "Menjadi mitra konstruksi tepercaya untuk proyek SPBU serta minyak & gas di Indonesia.",
    "02 / Mission": "02 / Misi",
    "Mission": "Misi",
    "Deliver reliable construction solutions from engineering and preparation through to completion.": "Menghadirkan solusi konstruksi yang andal, mulai dari rekayasa dan persiapan hingga penyelesaian.",
    "Execute projects with strong technical, safety and quality standards.": "Melaksanakan proyek dengan standar teknis, keselamatan, dan mutu yang kuat.",
    "Support customers with practical expertise throughout the project lifecycle.": "Mendampingi pelanggan dengan keahlian praktis di sepanjang siklus proyek.",

    /* ---- about page: why clients trust us ---- */
    "Why choose us": "Mengapa memilih kami",
    "Why clients trust us": "Mengapa klien memercayai kami",
    "Industry Experience": "Pengalaman industri",
    "Years of experience delivering fuel station and oil & gas construction projects across Indonesia.": "Pengalaman bertahun-tahun menyelesaikan proyek konstruksi SPBU serta minyak & gas di seluruh Indonesia.",
    "Complete Capability": "Kemampuan menyeluruh",
    "From engineering and permitting to construction, installation, commissioning and training.": "Mulai dari rekayasa dan perizinan hingga konstruksi, pemasangan, commissioning, dan pelatihan.",
    "Reliable Execution": "Pelaksanaan yang andal",
    "A practical, safety-focused approach backed by the wider expertise of the Hanindo Group.": "Pendekatan praktis yang mengutamakan keselamatan, didukung keahlian Hanindo Group yang lebih luas.",

    /* ---- contact page: the bold labels in the checklist ---- */
    /* Facsimile and Website came off the checklist with their entries.
       The fax number is on no page now; the website is the site itself. */
    "Telephone": "Telepon",

    /* ---- products & services page: scope of work ----
       These were shared with the home page until its scope cards were
       dropped, so they are now the Products & Services page's alone. */
    "What we do": "Yang kami lakukan",
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

    /* The Sectors grid stood on three pages -- the home, About Us and
       Products & Services -- and was taken off all three. Its six entries
       went with the last one. The two industries it named are the pills
       under the timeline now, which have their own entries above. */

    /* ---- company page: customer marquee ----
       Only the head translates. The registered names under the logos are
       names in either language, and they only show at all if a logo file
       goes missing. The Projects page carried the same six logos under a
       heading of its own until that wall came off; its four entries went
       with it. */
    "Customer base": "Basis pelanggan",

    /* ---- projects page ----
       The project names ("SPBU Total Oil Indonesia"), the street
       addresses and the years are left as they are: SPBU is already the
       Indonesian word, and the rest are proper nouns and figures. */
    /* The section head follows the Fire Fighting projects page, which
       also repeats its hero here -- "Track record" over "Featured
       projects". Sentence case, and one text node, so it stays an
       ordinary entry; the walker matches the whole node, case included. */
    "Track record": "Rekam jejak",
    "Featured projects": "Proyek unggulan",
    /* The hero's title-case "Featured Projects" is NOT here. It went back
       to the .fx split when the second word was asked for in sky blue,
       and its two halves carry their own Indonesian on the h1 and the
       span -- see collectScoped() below. Adding it back here would do
       nothing: the walker never sees that heading as one node. */
    "Fuel station projects delivered for Pertamina, Total Oil Indonesia, Shell, Petronas and Chevron, from permit through to a station in operation.": "Proyek SPBU yang diselesaikan untuk Pertamina, Total Oil Indonesia, Shell, Petronas, dan Chevron, dari perizinan hingga SPBU beroperasi.",
    "Further references": "Referensi lainnya",
    "Also delivered.": "Juga diselesaikan.",
    "Stations named in the company profile beyond the reference table above.": "SPBU yang disebutkan dalam profil perusahaan di luar tabel referensi di atas.",
    "Shell petrol station, S. Parman": "SPBU Shell, S. Parman",
    "Petronas service station, Fatmawati": "SPBU Petronas, Fatmawati",
    "Chevron service station, Duri Camp": "SPBU Chevron, Duri Camp",
    "Total gas station, Kemang Raya": "SPBU Total, Kemang Raya",

    /* ---- products & services page: hero ----
       The heading is the one word "Services", covered by the navigation
       entry at the top of this dictionary -- the tab, the footer link,
       the breadcrumb and the heading are all the same word now. */
    "Fuel station construction handled end to end — design, permits, materials and labour, installation and operator training, under one contract.": "Konstruksi SPBU ditangani menyeluruh — desain, perizinan, material dan tenaga kerja, pemasangan, dan pelatihan operator, dalam satu kontrak.",
    "We take the station from permit to handover, so there is one contract and one team for the whole build.": "Kami menangani SPBU dari perizinan hingga serah terima, sehingga hanya ada satu kontrak dan satu tim untuk keseluruhan pembangunan.",

    /* ---- scope of work page: the four contractor stages ----
       These are the timeline now, a heading and one line each, so the
       bold lead-in and the long sentence each stage used to carry are
       gone. Every stage title is its own <h4> and its sentence its own
       <p>, which is one text node each. */
    "As contractor": "Sebagai kontraktor",
    "How a project runs.": "Bagaimana proyek berjalan.",
    "As contractor, the scope runs in four stages.": "Sebagai kontraktor, lingkup pekerjaan berjalan dalam empat tahap.",
    "Review of Basic Design": "Peninjauan Desain Dasar",
    "The owner's plans re-designed and checked against conditions in the field.": "Gambar rencana pemilik dirancang ulang dan diperiksa terhadap kondisi di lapangan.",
    "Detail Design": "Desain Detail",
    "The whole design re-made and, once approved, the reference for the work.": "Keseluruhan desain disusun ulang dan, setelah disetujui, menjadi acuan pekerjaan.",
    "Work Preparation": "Persiapan Pekerjaan",
    "Soil investigation, work permit to safety, survey and measurement, and shop drawings.": "Penyelidikan tanah, izin kerja untuk keselamatan, survei dan pengukuran, serta shop drawing.",
    "Construction Work": "Pekerjaan Konstruksi",
    "Buried and double-wall tanks, fuel piping, the station building and the canopy.": "Tangki pendam dan tangki dinding ganda, perpipaan bahan bakar, bangunan SPBU, dan kanopi.",
    /* "On site" construction gallery captions, under the timeline. */
    "On site": "Di lokasi",
    "Buried tanks": "Tangki pendam",
    "Double-wall tanks": "Tangki dinding ganda",
    "Building foundation": "Fondasi bangunan",
    "Canopy structure": "Struktur kanopi",
    "Industries served": "Industri yang dilayani",
    "Fuel Stations": "SPBU",
    "Oil & Gas": "Minyak & Gas",

    /* Stage 3 and Stage 4 each had a band of their own with a grid of
       cells under it. Both came off to keep the page short, and what the
       cells named is in the two timeline lines above -- so the sixteen
       entries those bands needed are gone. The one thing not carried
       over is the sentence under each construction cell; if any of them
       goes back on the page, its entry has to come back with it. */

    /* ---- sister company ---- */
    "Better together": "Lebih baik bersama",
    "PT. Hanindo Citra — Oil & Gas": "PT. Hanindo Citra — Minyak & Gas",
    "On fuel station projects, Flowtech works hand in hand with its Hanindo Group sister company, PT. Hanindo Citra. We handle the construction; they supply the dispensers, tank gauging, flow meters and fuel management systems, and keep the site serviced once it's running.": "Dalam proyek SPBU, Flowtech bekerja bersama perusahaan saudaranya di Hanindo Group, PT. Hanindo Citra. Flowtech menangani konstruksi, sementara Hanindo Citra memasok dispenser, tank gauging, flow meter, dan sistem manajemen bahan bakar, serta menyediakan layanan setelah pembelian begitu SPBU beroperasi.",
    "Visit Oil & Gas": "Kunjungi Minyak & Gas",

    /* ---- contact page ----
       The ": value" halves of the checklist stay in English: each is an
       address, a number or a mailbox. Only the bold labels translate,
       and "Office hours" carries its value because the days are words. */
    "Let's talk about": "Mari bicarakan",
    "your project.": "proyek Anda.",
    "Tell us about the site and we will put the right person on it.": "Ceritakan lokasi Anda dan kami akan menugaskan orang yang tepat.",
    "How to reach us.": "Cara menghubungi kami.",
    "For fuel station construction, oil and gas construction work, or a question about a project we have delivered, our Jakarta office is the first point of contact.": "Untuk kebutuhan konstruksi SPBU, pekerjaan konstruksi minyak dan gas, hingga pertanyaan mengenai proyek yang telah kami selesaikan, kantor Jakarta kami siap membantu sebagai kontak utama Anda.",
    "Head office": "Kantor pusat",
    "Office hours": "Jam kerja",
    ": Monday to Friday, 08.00 – 17.00 WIB": ": Senin sampai Jumat, 08.00 – 17.00 WIB",

    /* ---- footer contact column, and the contact page's buttons ----
       The contact band these mostly belonged to came off the four inner
       pages, and six of its entries went with it: the eyebrow, both
       halves of the heading, the sub line, "Contact page" and "Phone",
       none of which is on any page now.
       The four below only looked orphaned. "Email our team" is still the
       contact page's button, "Head Office" and "Email" are the footer's
       address column on all five pages, and "Get directions" is up under
       directions and is on the contact page. */
    "Email our team": "Email tim kami",
    "Head Office": "Kantor Pusat",
    /* the footer's fourth column. The company names under it are names in
       either language, so only the heading has an entry. Same wording as
       the Citra dictionary, which runs the same column. */
    "Our Companies": "Perusahaan Kami",
    "Email": "Email",

    /* ---- footer ---- */
    "Hanindo Group has served businesses across Indonesia since 1987, providing technology, equipment and engineering solutions across specialised industries. Our companies cover oil & gas, automation, automotive, fire protection, printing and POS, combining international brands with local expertise and technical support.": "Hanindo Group telah melayani berbagai bisnis di seluruh Indonesia sejak 1987, menyediakan solusi teknologi, peralatan, dan teknik di berbagai industri khusus. Perusahaan kami mencakup minyak & gas, otomasi, otomotif, proteksi kebakaran, percetakan, dan POS, memadukan merek internasional dengan keahlian lokal dan dukungan teknis.",
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

  /* Element-scoped translations, read off a data-bahasa attribute rather
     than the dictionary above.
     One heading needs this. The Projects hero is "Featured Projects" with
     the second word in sky blue, which means an .fx span, which means two
     text nodes -- and Indonesian puts the noun first, "Proyek Unggulan",
     so the second English word has to become the FIRST Indonesian one.
     DICT is keyed on the text alone, and "Projects" is also the nav tab,
     the breadcrumb and a footer link on that same page, all of which must
     stay "Proyek". One key cannot be both. So each half of the heading
     carries its own Indonesian on itself.
     Nodes claimed here are skipped by the walker below, so a word inside
     a data-bahasa element never picks up a DICT entry by accident. Only
     the element's own leading text is taken, not its descendants' -- that
     is what lets the h1 and the span inside it each hold one word.
     Do not name this attribute anything ending in "alt":
     tools/build-search-index.pl scrapes image alt text with /\balt="..."/
     and would index the Indonesian as English page copy. */
  function collectScoped(scoped) {
    each(document.querySelectorAll('[data-bahasa]'), function (el) {
      var n = el.firstChild;
      if (!n || n.nodeType !== 3 || !translatable(n)) return;
      var raw = n.nodeValue, key = raw.trim();
      if (!key) return;
      scoped.push(n);
      store.push({ node: n, en: raw, alt: raw.replace(key, el.getAttribute('data-bahasa')) });
    });
  }

  function collect() {
    store = [];
    if (!document.body || !document.createTreeWalker) return;
    var scoped = [];
    collectScoped(scoped);
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = w.nextNode())) {
      if (!translatable(n) || scoped.indexOf(n) !== -1) continue;
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
