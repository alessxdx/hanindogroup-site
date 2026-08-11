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
    /* the two headings inside the Our Companies menu — same wording as
       the group dictionary, which groups by trade and by market. */
    /* the tab, the footer link, the breadcrumb and the page's own heading
       all read "Services" now, so one entry covers the lot. The
       "Products & Services" and "Products & services" entries that used
       to sit here went with the old label. */
    "Services": "Layanan",
    "Projects": "Proyek",
    "Contact Us": "Hubungi Kami",
    "Contact us": "Hubungi kami",

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
    "Permitting, site preparation and safety": "Perizinan, persiapan lokasi, dan keselamatan",
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
    "Since 2006, we have delivered new construction and renovation projects for major energy companies in Indonesia, including Pertamina, Petronas, Shell, Total and Chevron.": "Sejak 2006, kami telah menyelesaikan proyek pembangunan baru dan renovasi untuk perusahaan energi besar di Indonesia, termasuk Pertamina, Petronas, Shell, Total, dan Chevron.",
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
    "Telephone": "Telepon",
    "Facsimile": "Faksimile",
    "Website": "Situs web",

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

    /* ---- products & services page: sectors ----
       The home page and About Us both carried this grid once; it is that
       page's alone now. */
    "Sectors": "Sektor",
    "Sectors we build for.": "Sektor yang kami bangun.",
    "Fuel stations": "SPBU",
    "Turnkey construction and renovation — the founding business, built on years of running stations ourselves.": "Konstruksi dan renovasi turnkey — bisnis awal perusahaan, dibangun dari pengalaman bertahun-tahun mengelola SPBU sendiri.",
    "Oil & gas industry": "Industri minyak & gas",
    "Construction work for the wider oil and gas industry, backed by the group's petroleum equipment experience.": "Pekerjaan konstruksi untuk industri minyak dan gas yang lebih luas, didukung pengalaman grup di bidang peralatan perminyakan.",

    /* ---- company page: customer marquee ----
       Only the head translates. The registered names under the logos are
       names in either language, and they only show at all if a logo file
       goes missing. */
    "Customer base": "Basis pelanggan",
    /* the heading and lede below are the Projects page's wall, which still
       runs the older wording. The home page wall took the two lines above
       it in August 2026. */
    "Who we built for.": "Untuk siapa kami membangun.",
    "Between 2006 and 2015 Flowtech built and renovated fuel stations for the national oil company and for the international brands operating in Indonesia.": "Antara 2006 dan 2015 Flowtech membangun dan merenovasi SPBU untuk perusahaan minyak nasional serta merek-merek internasional yang beroperasi di Indonesia.",

    /* ---- projects page ----
       The project names ("SPBU Total Oil Indonesia"), the street
       addresses and the years are left as they are: SPBU is already the
       Indonesian word, and the rest are proper nouns and figures. */
    "Project references": "Referensi proyek",
    "Stations built,": "SPBU yang dibangun,",
    "across Java and Sumatra.": "di Jawa dan Sumatra.",
    "Fuel station projects delivered for Pertamina, Total Oil Indonesia, Shell, Petronas and Chevron, from permit through to a station in operation.": "Proyek SPBU yang diselesaikan untuk Pertamina, Total Oil Indonesia, Shell, Petronas, dan Chevron, dari perizinan hingga SPBU beroperasi.",
    "Nine stations,": "Sembilan SPBU,",
    "2008 to 2013.": "2008 hingga 2013.",
    "Each project delivered to SPBU specification, with the year and the contracting client as recorded in the company profile.": "Setiap proyek diselesaikan sesuai spesifikasi SPBU, dengan tahun dan klien pemberi kontrak sebagaimana tercatat dalam profil perusahaan.",
    "Further references": "Referensi lainnya",
    "Also delivered.": "Juga diselesaikan.",
    "Stations named in the company profile beyond the reference table above.": "SPBU yang disebutkan dalam profil perusahaan di luar tabel referensi di atas.",
    "Contracting entities, as named in the company profile: PT. Pertamina (Persero) and PT. Pertamina Retail, PT. Petronas Niaga Indonesia, PT. Kridapetra Graha for Shell, PT. Total Oil Indonesia, and PT. Chevron Indonesia.": "Badan hukum pemberi kontrak, sebagaimana disebutkan dalam profil perusahaan: PT. Pertamina (Persero) dan PT. Pertamina Retail, PT. Petronas Niaga Indonesia, PT. Kridapetra Graha untuk Shell, PT. Total Oil Indonesia, dan PT. Chevron Indonesia.",
    "Shell petrol station, S. Parman": "SPBU Shell, S. Parman",
    "Petronas service station, Fatmawati": "SPBU Petronas, Fatmawati",
    "Chevron service station, Duri Camp": "SPBU Chevron, Duri Camp",
    "Total gas station, Kemang Raya": "SPBU Total, Kemang Raya",

    /* ---- products & services page: hero ----
       The heading is the one word "Services", covered by the navigation
       entry at the top of this dictionary -- the tab, the footer link,
       the breadcrumb and the heading are all the same word now. */
    "Fuel station construction handled end to end — design, permits, materials and labour, installation and operator training, under one contract.": "Konstruksi SPBU ditangani menyeluruh — desain, perizinan, material dan tenaga kerja, pemasangan, dan pelatihan operator, dalam satu kontrak.",
    "Every aspect required in the construction of a fuel station is handled by us, so clients deal with one team from permit to handover.": "Setiap aspek yang dibutuhkan dalam pembangunan SPBU kami tangani sendiri, sehingga klien berurusan dengan satu tim dari perizinan hingga serah terima.",

    /* ---- scope of work page: the four contractor stages ----
       These are the timeline now, a heading and one line each, so the
       bold lead-in and the long sentence each stage used to carry are
       gone. Every stage title is its own <h4> and its sentence its own
       <p>, which is one text node each. */
    "As contractor": "Sebagai kontraktor",
    "How a project runs.": "Bagaimana proyek berjalan.",
    "In general, the scope of work and responsibility taken on as contractor runs in four stages.": "Secara umum, lingkup pekerjaan dan tanggung jawab yang diemban sebagai kontraktor berjalan dalam empat tahap.",
    "Review of Basic Design": "Peninjauan Desain Dasar",
    "The owner's plans re-designed and checked against conditions in the field.": "Gambar rencana pemilik dirancang ulang dan diperiksa terhadap kondisi di lapangan.",
    "Detail Design": "Desain Detail",
    "The whole design re-made and, once approved, the reference for the work.": "Keseluruhan desain disusun ulang dan, setelah disetujui, menjadi acuan pekerjaan.",
    "Work Preparation": "Persiapan Pekerjaan",
    "Soil investigation, safety work permit, survey and shop drawings.": "Penyelidikan tanah, izin kerja keselamatan, survei, dan shop drawing.",
    "Construction Work": "Pekerjaan Konstruksi",
    "Tanks, fuel piping, buildings and canopy, built out and handed over.": "Tangki, perpipaan bahan bakar, bangunan, dan kanopi, dibangun hingga diserahterimakan.",
    "Industries served": "Industri yang dilayani",
    "Fuel Stations": "SPBU",
    "Oil & Gas": "Minyak & Gas",

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

    /* ---- contact page ----
       The "— value" halves of the checklist stay in English: each is an
       address, a number or a mailbox. Only the bold labels translate,
       and "Office hours" carries its value because the days are words. */
    "Let's talk about": "Mari bicarakan",
    "your project.": "proyek Anda.",
    "Tell us about the site and we will put the right person on it.": "Ceritakan lokasi Anda dan kami akan menugaskan orang yang tepat.",
    "How to reach us.": "Cara menghubungi kami.",
    "For fuel station construction, oil and gas construction work, or a question about a project we have delivered, our Jakarta office is the first point of contact.": "Untuk konstruksi SPBU, pekerjaan konstruksi minyak dan gas, atau pertanyaan mengenai proyek yang telah kami selesaikan, kantor Jakarta kami adalah titik kontak pertama.",
    "Head office": "Kantor pusat",
    "Office hours": "Jam kerja",
    "— Monday to Friday, 08.00 – 17.00 WIB": "— Senin sampai Jumat, 08.00 – 17.00 WIB",
    "Flowtech Engineering shares the head office at Jl. Fatmawati No. 55 with the rest of Hanindo Group. For petroleum equipment, automation, automotive workshop equipment or fire protection, the group contact page will point you to the right company.": "Flowtech Engineering berbagi kantor pusat di Jl. Fatmawati No. 55 dengan perusahaan lain dalam Hanindo Group. Untuk peralatan perminyakan, otomasi, peralatan bengkel otomotif, atau proteksi kebakaran, halaman kontak grup akan mengarahkan Anda ke perusahaan yang tepat.",
    "Group contact": "Kontak grup",

    /* ---- contact block ---- */
    "Talk to Flowtech Engineering": "Hubungi Flowtech Engineering",
    "Have a construction": "Punya rencana proyek",
    "project in mind?": "konstruksi?",
    "Tell us about the site and our team will scope the permits, materials, labour and installation work needed to bring it into operation.": "Ceritakan lokasi Anda dan tim kami akan menentukan lingkup perizinan, material, tenaga kerja, dan pekerjaan pemasangan yang dibutuhkan untuk mengoperasikannya.",
    "Email our team": "Email tim kami",
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
