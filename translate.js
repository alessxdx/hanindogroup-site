/* =====================================================================
   Hanindo Group (group-level pages) — EN / Bahasa Indonesia toggle
   ---------------------------------------------------------------------
   Same mechanism as automation/translate.js: on load it walks the
   visible text and, where a phrase matches an entry below, swaps
   English <-> Bahasa Indonesia. The choice is remembered
   (localStorage) across the group pages.

   This file serves the seven group pages — the home page and about/,
   products-services/, partners/, career/, contact/ and search/. The
   company mini-sites each carry their own dictionary; nothing here is
   shared with them, so a phrase used on both has to be listed in both.

   The search page has a second half to its wording: the result count,
   the no-results line and the big field's placeholder are drawn by
   assets/search.js after this file has already walked the page, so
   their Indonesian lives in search.js, not here. Changing the search
   page's wording usually means editing both files.

   To EDIT a translation: find the English on the left, change the
   Indonesian on the right. To ADD one: copy a line and fill in both
   sides. The English side must match the page EXACTLY, including
   punctuation — the match is on the whole trimmed text node, not a
   substring.

   Deliberately NOT translated: company and brand names (Hanindo Citra,
   Flowtech Engineering, Gralessando Pte Ltd, Custom, Gilbarco
   Veeder-Root and the rest of the principals), the street address,
   which is needed in its postal form, and the phone and email.

   Wording for the shared items — the footer blurb, the copyright line,
   the nav labels — follows the company sites so the whole group reads
   the same in Indonesian.
   ===================================================================== */
(function () {
  var DICT = {
    /* ---- navigation / header ---- */
    "Home": "Beranda",
    "About Us": "Tentang Kami",
    "Our Companies": "Perusahaan Kami",
    /* the two headings inside the Our Companies menu. They group by what
       the companies do and by the market they serve, not by country —
       three of the six are Indonesian. */
    "By industry": "Menurut industri",
    "Printer & POS, by market": "Printer & POS, menurut pasar",
    "Fire Fighting Department": "Departemen Pemadam Kebakaran",
    "Hanindo Automation Solutions": "Hanindo Automation Solutions",
    "(Indonesia)": "(Indonesia)",
    "(Singapore)": "(Singapura)",
    "(China)": "(Tiongkok)",
    "Products & Services": "Produk & Layanan",
    "Partners": "Mitra",
    "Career": "Karier",
    "Contact Us": "Hubungi Kami",
    "Your Solution Provider": "Mitra Solusi Anda",
    /* search page. "Search" is both the breadcrumb and the label on the
       big button; the small header field's placeholder is handled in
       setLang() below, and the rest of the page in assets/search.js. */
    "Search": "Cari",
    "Search the site.": "Cari di situs ini.",
    "Fire Fighting Department": "Departemen Pemadam Kebakaran",
    /* the Products & Services drop-down, by industry */
    "Oil & Gas": "Minyak & Gas",
    "Oil, Gas & Fire Protection": "Minyak, Gas & Proteksi Kebakaran",
    "Automotive": "Otomotif",
    "Fuelling equipment & energy": "Peralatan pengisian bahan bakar & energi",
    "Printing & POS": "Pencetakan & POS",
    "Fire Fighting": "Pemadam Kebakaran",

    /* ---- home: slide 1, welcome ---- */
    "Welcome": "Selamat datang",
    "Welcome to the": "Selamat datang di",
    "Six specialist companies working under one roof at Jl. Fatmawati No. 55, Jakarta — covering equipment, automation, construction and service across the industries we serve.": "Enam perusahaan spesialis yang bekerja dalam satu atap di Jl. Fatmawati No. 55, Jakarta — mencakup peralatan, otomasi, konstruksi, dan layanan di berbagai industri yang kami layani.",
    "About the group": "Tentang grup",
    "Our companies": "Perusahaan kami",

    /* ---- home: slide 2, one stop solution ---- */
    "Hanindo Group — Your Solution Provider": "Hanindo Group — Mitra Solusi Anda",
    "Your technology": "Solusi teknologi",
    "one stop solution.": "satu atap Anda.",
    "Petroleum equipment, retail and industrial automation, automotive workshop equipment, printing & POS and fire protection — delivered by one group, from Jakarta since 1987.": "Peralatan perminyakan, otomasi ritel dan industri, peralatan bengkel otomotif, pencetakan & POS, serta proteksi kebakaran — dihadirkan oleh satu grup, dari Jakarta sejak 1987.",
    "Your technology one stop solution for": "Solusi teknologi satu atap Anda untuk",
    "Oil & Gas industry": "Industri minyak & gas",
    "F&B and entertainment": "Makanan & minuman dan hiburan",
    "Retail and industrial automation": "Otomasi ritel dan industri",
    "Telemetry": "Telemetri",
    "Automotive industry": "Industri otomotif",
    "Telecommunication": "Telekomunikasi",
    "Hospitality": "Perhotelan",
    "Energy": "Energi",

    /* ---- home: slide 3, professional advice ---- */
    "Looking for professional advice?": "Mencari saran profesional?",
    "Our team is ready": "Tim kami siap",
    "for your project.": "untuk proyek Anda.",
    "The best partners for your business are those who know the paths to follow, to achieve the highest levels of success.": "Mitra terbaik bagi bisnis Anda adalah mereka yang mengetahui jalan yang harus ditempuh untuk mencapai tingkat keberhasilan tertinggi.",
    "Our expert team will find the right solution for the development of your project and business, being the ideal partner for the biggest challenges.": "Tim ahli kami akan menemukan solusi yang tepat bagi pengembangan proyek dan bisnis Anda, menjadi mitra ideal untuk tantangan terbesar sekalipun.",
    "Talk to our team": "Hubungi tim kami",
    "Email us": "Email kami",

    /* ---- home: verticals ---- */
    "Our Verticals": "Lini Usaha Kami",
    "Each vertical runs its own site — with its own products, projects and contact team. Choose the one you need.": "Setiap lini usaha memiliki situsnya sendiri — dengan produk, proyek, dan tim kontaknya sendiri. Pilih yang Anda butuhkan.",
    "Petroleum equipment & station construction": "Peralatan perminyakan & konstruksi SPBU",
    "Autoshop equipment — diagnostics, lifts, tyre & lube": "Peralatan bengkel — diagnostik, lift, ban & pelumasan",
    "End-to-end fire-protection systems, pumps & hydrants": "Sistem proteksi kebakaran menyeluruh, pompa & hidran",
    "Printing, scanning & point-of-sale hardware and software": "Perangkat keras dan lunak pencetakan, pemindaian & point-of-sale",
    "Visit site": "Kunjungi situs",

    /* ---- partners strip + partners page ---- */
    "Partners & Principals": "Mitra & Prinsipal",
    "Hanindo has partnered with leading global manufacturers for many industries. These long-standing partnerships enable us to provide genuine parts, factory-trained service, warranty support, and reliable after-sales care.": "Hanindo bermitra dengan produsen global terkemuka untuk berbagai industri. Kemitraan jangka panjang ini memungkinkan kami menyediakan suku cadang asli, layanan oleh teknisi terlatih pabrik, dukungan garansi, serta layanan purnajual yang andal.",
    "Our partners and principals": "Mitra dan prinsipal kami",
    "Brands we supply and service.": "Merek yang kami pasok dan layani.",
    "Enquiries": "Pertanyaan",
    "Looking for a particular brand?": "Mencari merek tertentu?",
    "Tell us which equipment you need and we will put you in touch with the division that handles it — whether that is fuel dispensing, workshop equipment, automation or fire protection.": "Beri tahu kami peralatan yang Anda butuhkan dan kami akan menghubungkan Anda dengan divisi yang menanganinya — baik dispenser BBM, peralatan bengkel, otomasi, maupun proteksi kebakaran.",
    "Contact us": "Hubungi kami",

    /* ---- home: closing contact band ---- */
    "Work with Hanindo Group": "Bekerja sama dengan Hanindo Group",
    "Start business with us.": "Mulai bisnis bersama kami.",
    "Tell us what you are building or operating, and we will point you to the division — and the people — who can deliver it.": "Beri tahu kami apa yang sedang Anda bangun atau operasikan, dan kami akan mengarahkan Anda ke divisi — dan orang — yang dapat mewujudkannya.",
    "Email our team": "Email tim kami",
    "Contact page": "Halaman kontak",
    "Head Office": "Kantor Pusat",
    "Phone": "Telepon",
    "Email": "Email",
    "Tel:": "Tel:",

    /* ---- footer ---- */
    "Your technology one stop solution — serving the oil & gas, automation, automotive and fire protection industries in Indonesia since 1987.": "Solusi teknologi satu atap Anda — melayani industri minyak & gas, otomasi, otomotif, dan proteksi kebakaran di Indonesia sejak 1987.",
    "© 2026 Hanindo Group. All Rights Reserved.": "© 2026 Hanindo Group. Hak Cipta Dilindungi.",

    /* ---- about: hero + growth timeline ---- */
    "About": "Tentang",
    "Us": "Kami",
    "Serving many industries in Indonesia from Jakarta since 1987.": "Melayani berbagai industri di Indonesia dari Jakarta sejak 1987.",
    "Our journey": "Perjalanan kami",
    "HANINDO GROUP Growth": "Pertumbuhan HANINDO GROUP",
    "Where it began": "Awal mula",
    "Petroleum equipment at PT. Sugiron Citra.": "Peralatan perminyakan di PT. Sugiron Citra.",
    "Hanindo Group established": "Hanindo Group didirikan",
    "Citra, Automotive, Automation Solutions and Flowtech formed within months.": "Citra, Automotive, Automation Solutions, dan Flowtech dibentuk dalam hitungan bulan.",
    "CUSTOM partnership": "Kemitraan CUSTOM",
    "Partnered to expand CUSTOM products to the China market.": "Kemitraan untuk memperluas produk CUSTOM ke pasar Tiongkok.",
    "China expansion": "Ekspansi Tiongkok",
    "Hanindo Shanghai office opens, Shenzhen follows in 2009.": "Kantor Hanindo Shanghai dibuka, Shenzhen menyusul pada 2009.",
    "South East Asia expansion": "Ekspansi Asia Tenggara",
    "Hanindo Automation Solutions adds CUSTOM Hanindo Indonesia.": "Hanindo Automation Solutions menghadirkan CUSTOM Hanindo Indonesia.",
    "Singapore office": "Kantor Singapura",
    "Gralessando Pte Ltd opens, covering CUSTOM Hanindo South East Asia.": "Gralessando Pte Ltd dibuka, mencakup CUSTOM Hanindo Asia Tenggara.",
    "Regional partnerships": "Kemitraan regional",
    "CUSTOM Hanindo partnerships established in Vietnam, Thailand and the Philippines.": "Kemitraan CUSTOM Hanindo dijalin di Vietnam, Thailand, dan Filipina.",
    "Manila office": "Kantor Manila",
    "A CUSTOM Hanindo office follows the Philippines partnership.": "Kantor CUSTOM Hanindo menyusul setelah kemitraan Filipina.",
    "Fire Fighting Department": "Divisi Pemadam Kebakaran",
    "Hanindo Citra adds fire protection.": "Hanindo Citra menambah proteksi kebakaran.",

    /* ---- about + contact: the company cards ---- */
    "The group": "Grup",
    "Specialists under one roof.": "Para spesialis dalam satu atap.",
    "Click through to any of the companies below to find out more about what they do.": "Klik salah satu perusahaan di bawah ini untuk mengetahui lebih lanjut tentang apa yang mereka kerjakan.",
    "Petroleum equipment, station construction and fire protection.": "Peralatan perminyakan, konstruksi SPBU, dan proteksi kebakaran.",
    "Workshop and garage equipment for the service bay.": "Peralatan bengkel dan garasi untuk service bay.",
    "Printing, scanning and point-of-sale systems — the Custom range, carried by three companies in their own markets.": "Sistem pencetakan, pemindaian, dan point-of-sale — rangkaian Custom, dibawakan oleh tiga perusahaan di pasarnya masing-masing.",
    /* the market under each of the three Printer & POS companies */
    "Indonesia": "Indonesia",
    "Singapore": "Singapura",
    "China": "Tiongkok",

    /* ---- about: vision & mission ---- */
    "Our direction": "Arah kami",
    "Vision & Mission": "Visi & Misi",
    "01 / Vision": "01 / Visi",
    "Vision": "Visi",
    "To be a company that provides a “tomorrow” solution to achieve customer needs, valuing customer satisfaction as the key to success.": "Menjadi perusahaan yang menghadirkan solusi “masa depan” untuk memenuhi kebutuhan pelanggan, dengan menjunjung kepuasan pelanggan sebagai kunci keberhasilan.",
    "02 / Mission": "02 / Misi",
    "Mission": "Misi",
    "Supply the latest technology and innovation to our customers.": "Menyediakan teknologi dan inovasi terkini bagi pelanggan kami.",
    "Deliver products recognised for improving efficiency, effectiveness and productivity.": "Menghadirkan produk yang diakui mampu meningkatkan efisiensi, efektivitas, dan produktivitas.",
    "Respect the environment they operate in.": "Menghormati lingkungan tempat produk tersebut digunakan.",
    "Start business": "Mulai bisnis",
    "with us.": "bersama kami.",
    "Tell us what you are building or operating, and we will point you to the company — and the people — who can deliver it.": "Beri tahu kami apa yang sedang Anda bangun atau operasikan, dan kami akan mengarahkan Anda ke perusahaan — dan orang — yang dapat mewujudkannya.",

    /* ---- products & services ---- */
    "Products &": "Produk &",
    "Services": "Layanan",
    "Equipment, systems and service from across the group — petroleum, fire protection, automotive, and printing and point of sale.": "Peralatan, sistem, dan layanan dari seluruh grup — perminyakan, proteksi kebakaran, otomotif, serta pencetakan dan point of sale.",
    "What we supply": "Yang kami sediakan",
    "Everything the group supplies.": "Semua yang disediakan grup.",
    "A sample of the range below. Click through to any of the companies to see its full catalogue.": "Berikut sebagian dari rangkaian produk kami. Klik salah satu perusahaan untuk melihat katalog lengkapnya.",
    "Dispensing pumps, automatic tank gauging, flow meters, fire protection systems, and station construction.": "Pompa dispenser, pengukuran tangki otomatis, flow meter, sistem proteksi kebakaran, dan konstruksi SPBU.",
    "Lifts and handling, tyre service, diagnostics, welding and lubrication for the service bay.": "Lift dan penanganan, layanan ban, diagnostik, pengelasan, dan pelumasan untuk service bay.",
    "Printers, point-of-sale terminals, scanners and self-service kiosks, with the software that runs them.": "Printer, terminal point-of-sale, pemindai, dan kios layanan mandiri, beserta perangkat lunak yang menjalankannya.",
    "Not sure what you need?": "Belum yakin apa yang Anda butuhkan?",
    "Tell us about the job.": "Ceritakan pekerjaan Anda.",
    "Describe the site, the equipment or the volumes you are working with and we will point you to the company that handles it.": "Jelaskan lokasi, peralatan, atau volume yang Anda tangani, dan kami akan mengarahkan Anda ke perusahaan yang menanganinya.",
    "Email the group": "Email grup",

    /* ---- career ---- */
    "Build your career": "Bangun karier Anda",
    "with Hanindo Group.": "bersama Hanindo Group.",
    "Since 1987 we have supplied and serviced the equipment that keeps fuel stations, workshops and retailers working across Indonesia. Join us and you work with recognised international principals, learn the technical side of a real industry, and grow with a group that promotes from within.": "Sejak 1987 kami memasok dan merawat peralatan yang menjaga SPBU, bengkel, dan peritel tetap beroperasi di seluruh Indonesia. Bergabunglah dan Anda akan bekerja dengan prinsipal internasional ternama, mendalami sisi teknis industri yang nyata, serta berkembang bersama grup yang mengutamakan promosi dari dalam.",
    "Open positions": "Lowongan terbuka",
    "Current openings.": "Lowongan saat ini.",
    "Here is what we are hiring for right now. Read the role, then apply by email using the button on the posting.": "Berikut posisi yang sedang kami cari. Baca deskripsinya, lalu lamar melalui email menggunakan tombol pada lowongan tersebut.",
    "Sales — Automotive Equipment": "Sales — Peralatan Otomotif",
    "Jakarta · Full-time": "Jakarta · Penuh waktu",
    "Sell automotive equipment to workshops and dealers, open new accounts through active canvassing, and hit the sales targets that keep the territory growing.": "Menjual peralatan otomotif ke bengkel dan dealer, membuka pelanggan baru melalui canvassing aktif, serta mencapai target penjualan yang menjaga pertumbuhan wilayah.",
    "What you'll do": "Yang akan Anda kerjakan",
    "Promote and sell automotive equipment products": "Mempromosikan dan menjual produk peralatan otomotif",
    "Canvass to widen the customer network": "Melakukan canvassing untuk memperluas jaringan pelanggan",
    "Meet the sales targets that have been set": "Mencapai target penjualan yang telah ditetapkan",
    "Coordinate with other departments on delivery and payment": "Berkoordinasi dengan departemen lain terkait pengiriman dan pembayaran",
    "Maintain strong relationships with customers": "Menjaga hubungan baik dengan pelanggan",
    "What we're looking for": "Yang kami cari",
    "Minimum Diploma (D3)": "Minimal Diploma (D3)",
    "Computer literate": "Menguasai komputer",
    "Age 23–35": "Usia 23–35 tahun",
    "Own vehicle and a SIM C licence (SIM A a plus)": "Memiliki kendaraan sendiri dan SIM C (SIM A menjadi nilai tambah)",
    "Good communication and teamwork skills": "Kemampuan komunikasi dan kerja sama tim yang baik",
    "Apply for this role": "Lamar posisi ini",
    "Opens your email — attach your CV (PDF) and send.": "Membuka aplikasi email Anda — lampirkan CV (PDF) lalu kirim.",
    "If you are shortlisted, our team will contact you to arrange the next step.": "Jika Anda masuk tahap seleksi, tim kami akan menghubungi Anda untuk mengatur langkah berikutnya.",
    "Don't see the right role?": "Belum menemukan posisi yang cocok?",
    "Send us your CV anyway.": "Tetap kirimkan CV Anda.",
    "We are always glad to hear from strong candidates. Tell us where you would fit and attach your CV — we will keep it on file for openings across the group.": "Kami selalu senang menerima kandidat yang kuat. Beri tahu kami posisi yang Anda rasa sesuai dan lampirkan CV Anda — akan kami simpan untuk lowongan di seluruh grup.",
    "Send an open application": "Kirim lamaran terbuka",
    "Applications": "Lamaran",

    /* ---- contact ---- */
    "Let's get you to": "Mari hubungkan Anda",
    "the right team.": "dengan tim yang tepat.",
    "Hanindo Group brings together several specialist companies. Choose the business your enquiry is about and we will take you straight to their contact page.": "Hanindo Group menghimpun beberapa perusahaan spesialis. Pilih bidang usaha yang Anda tanyakan dan kami akan mengarahkan Anda langsung ke halaman kontaknya.",
    "Who can we connect you with?": "Dengan siapa kami dapat menghubungkan Anda?",
    "Contact by business.": "Kontak menurut bidang usaha.",
    "Each of our companies runs its own enquiries. Pick the one that fits and you will land on the team that can help.": "Setiap perusahaan kami menangani pertanyaannya sendiri. Pilih yang sesuai dan Anda akan langsung terhubung dengan tim yang dapat membantu.",
    "Not sure who to ask?": "Belum yakin harus bertanya ke siapa?",
    "Reach the head office.": "Hubungi kantor pusat.",
    "For general enquiries — or anything about Flowtech Engineering or Hanindo Automation Solutions — contact the group head office in Jakarta and we will point you to the right team.": "Untuk pertanyaan umum — atau apa pun mengenai Flowtech Engineering atau Hanindo Automation Solutions — hubungi kantor pusat grup di Jakarta dan kami akan mengarahkan Anda ke tim yang tepat.",

    /* ---- misc ---- */
    "Photo needed": "Perlu foto"
  };

  var LANG_KEY = 'hg_lang', ALT = 'id', HTML_LANG = 'id';
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
