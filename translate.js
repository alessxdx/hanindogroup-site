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

   Deliberately NOT translated: company and brand names (PT. Hanindo Citra,
   Flowtech Engineering, Gralessando (S) Pte. Ltd., Custom, Gilbarco
   Veeder-Root and the rest of the principals), the street address,
   which is needed in its postal form, and the phone and email.

   Wording for the shared items — the footer blurb, the copyright line,
   the nav labels — follows the company sites so the whole group reads
   the same in Indonesian.
   ===================================================================== */
(function () {
  var DICT = {
    /* ---- directions ---- */
    "Get directions": "Petunjuk arah",
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
    "PT. Hanindo Automation Solutions": "PT. Hanindo Automation Solutions",
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
    "Oil & gas, fire protection, automotive, printer & POS — specialist companies based in Jakarta, Singapore and Shanghai, working across Southeast Asia.": "Minyak & gas, proteksi kebakaran, otomotif, printer & POS — perusahaan spesialis yang berbasis di Jakarta, Singapura, dan Shanghai, dengan cakupan kerja di seluruh Asia Tenggara.",
    "About the group": "Tentang grup",
    "Our companies": "Perusahaan kami",

    /* ---- home: slide 2, one stop solution ---- */
    "Hanindo Group — Your Solution Provider": "Hanindo Group — Mitra Solusi Anda",
    "Technology Solutions": "Solusi Teknologi",
    "Across Industries": "Lintas Industri",
    "One group delivering trusted technology and engineering solutions — from fuel stations and industrial facilities to automotive workshops, with CUSTOM printing wherever tickets, receipts and boarding passes are issued.": "Satu grup yang menghadirkan solusi teknologi dan rekayasa tepercaya — dari SPBU dan fasilitas industri hingga bengkel otomotif, dengan pencetakan CUSTOM di mana pun tiket, struk, dan boarding pass diterbitkan.",
    "Your technology one stop solution for": "Solusi teknologi satu atap Anda untuk",
    "Oil & Gas industry": "Industri minyak & gas",
    "F&B and entertainment": "Makanan & minuman dan hiburan",
    "Retail and industrial automation": "Otomasi ritel dan industri",
    "Telemetry": "Telemetri",
    "Automotive industry": "Industri otomotif",
    "Telecommunication": "Telekomunikasi",
    "Hospitality": "Perhotelan",
    "Energy": "Energi",
    /* the two Custom sectors the hero names. The full eleven Custom serves
       are listed on printer-pos/products-services.html — the panel has room
       for ten rows before it runs past the bottom of the hero. */
    "Aviation & ticketing": "Penerbangan & tiket",
    "Self-service kiosks": "Kios layanan mandiri",

    /* ---- home: slide 3, professional advice ---- */
    "Our team is ready": "Tim kami siap",
    "for your project.": "untuk proyek Anda.",
    "Talk to our team": "Hubungi tim kami",

    /* ---- home: verticals ---- */
    "Our Verticals": "Lini Usaha Kami",
    "Each vertical runs its own site, with its own products, projects and contact team. Choose the one you need.": "Setiap lini usaha memiliki situsnya sendiri, dengan produk, proyek, dan tim kontaknya sendiri. Pilih yang Anda butuhkan.",
    "Petroleum equipment & station construction": "Peralatan perminyakan & konstruksi SPBU",
    "Autoshop equipment — diagnostics, lifts, tyre & lube": "Peralatan bengkel — diagnostik, lift, ban & pelumasan",
    "End-to-end fire-protection systems, pumps & hydrants": "Sistem proteksi kebakaran menyeluruh, pompa & hidran",
    "Printing, scanning & point-of-sale hardware and software": "Perangkat keras dan lunak pencetakan, pemindaian & point-of-sale",
    "Visit site": "Kunjungi situs",

    /* ---- partners strip + partners page ---- */
    "Partners & Principals": "Mitra & Prinsipal",
    "Hanindo has long-standing partnerships that enable us to provide genuine parts, factory-trained service, warranty support, and reliable after-sales care.": "Hanindo memiliki kemitraan jangka panjang yang memungkinkan kami menyediakan suku cadang asli, layanan oleh teknisi terlatih pabrik, dukungan garansi, serta layanan purnajual yang andal.",
    "Our partners and principals": "Mitra dan prinsipal kami",
    "Brands we supply and service.": "Merek yang kami pasok dan layani.",
    "Enquiries": "Pertanyaan",
    "Looking for a particular brand?": "Mencari merek tertentu?",
    "Tell us which equipment you need and we will put you in touch with the division that handles it — whether that is fuel dispensing, workshop equipment, automation or fire protection.": "Beri tahu kami peralatan yang Anda butuhkan dan kami akan menghubungkan Anda dengan divisi yang menanganinya — baik dispenser BBM, peralatan bengkel, otomasi, maupun proteksi kebakaran.",
    "Contact us": "Hubungi kami",

    /* ---- home: closing contact band ---- */
    "Email our team": "Email tim kami",
    "Contact page": "Halaman kontak",
    "Head Office": "Kantor Pusat",
    "Phone": "Telepon",
    "Email": "Email",
    "Tel:": "Tel:",

    /* ---- footer ---- */
    "Your technology one stop solution, serving the oil & gas, automation, automotive and fire protection industries in Indonesia since 1987.": "Solusi teknologi satu atap Anda, melayani industri minyak & gas, otomasi, otomotif, dan proteksi kebakaran di Indonesia sejak 1987.",
    "© 2026 Hanindo Group. All Rights Reserved.": "© 2026 Hanindo Group. Hak Cipta Dilindungi.",
    /* The privacy link beside the copyright, on every page of this site. */
    "Privacy": "Privasi",

    /* ---- about: hero + growth timeline ---- */
    "About": "Tentang",
    "Us": "Kami",
    "Our journey": "Perjalanan kami",
    "Hanindo Group Growth": "Pertumbuhan Hanindo Group",
    "Where it began": "Awal mula",
    "Petroleum equipment at PT. Sugiron Citra.": "Peralatan perminyakan di PT. Sugiron Citra.",
    "Hanindo Group established": "Hanindo Group didirikan",
    "Citra, Automotive, Automation Solutions and Flowtech formed within months.": "Citra, Automotive, Automation Solutions, dan Flowtech dibentuk dalam hitungan bulan.",
    "CUSTOM partnership": "Kemitraan CUSTOM",
    "Partnered to expand CUSTOM products to the China market.": "Kemitraan untuk memperluas produk CUSTOM ke pasar Tiongkok.",
    "China expansion": "Ekspansi Tiongkok",
    "Hanindo (Shanghai) International Co., Ltd. office opens, Shenzhen follows in 2009.": "Kantor Hanindo (Shanghai) International Co., Ltd. dibuka, Shenzhen menyusul pada 2009.",
    "South East Asia expansion": "Ekspansi Asia Tenggara",
    "PT. Hanindo Automation Solutions adds CUSTOM Hanindo Indonesia.": "PT. Hanindo Automation Solutions menghadirkan CUSTOM Hanindo Indonesia.",
    "Singapore office": "Kantor Singapura",
    "Gralessando (S) Pte. Ltd. opens, covering CUSTOM Hanindo South East Asia.": "Gralessando (S) Pte. Ltd. dibuka, mencakup CUSTOM Hanindo Asia Tenggara.",
    "Regional partnerships": "Kemitraan regional",
    "CUSTOM Hanindo partnerships established in Vietnam, Thailand and the Philippines.": "Kemitraan CUSTOM Hanindo dijalin di Vietnam, Thailand, dan Filipina.",
    "Manila office": "Kantor Manila",
    "A CUSTOM Hanindo office follows the Philippines partnership.": "Kantor CUSTOM Hanindo menyusul setelah kemitraan Filipina.",
    "Fire Fighting Department": "Divisi Pemadam Kebakaran",
    "PT. Hanindo Citra adds fire protection.": "PT. Hanindo Citra menambah proteksi kebakaran.",

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
    "To be the trusted technology and engineering partner that industries across Indonesia and Southeast Asia rely on for long-term growth.": "Menjadi mitra teknologi dan rekayasa tepercaya yang diandalkan industri di Indonesia dan Asia Tenggara untuk pertumbuhan jangka panjang.",
    "02 / Mission": "02 / Misi",
    "Mission": "Misi",
    "Deliver reliable technology and engineering solutions through leading global partnerships and our own product brands.": "Menghadirkan solusi teknologi dan rekayasa yang andal melalui kemitraan global terkemuka dan merek produk kami sendiri.",
    "Support customers throughout the full lifecycle of every system — from specification and installation to training, spare parts and after-sales service.": "Mendampingi pelanggan sepanjang siklus hidup setiap sistem — dari penentuan spesifikasi dan pemasangan hingga pelatihan, suku cadang, dan layanan purnajual.",
    "Continuously improve our capabilities while operating responsibly toward our customers, employees and the environment.": "Terus meningkatkan kapabilitas kami sembari beroperasi secara bertanggung jawab terhadap pelanggan, karyawan, dan lingkungan.",

    /* ---- products & services ---- */
    "Products &": "Produk &",
    "Services": "Layanan",
    "Equipment, systems and service from across the group — petroleum, fire protection, automotive, and printing and point of sale.": "Peralatan, sistem, dan layanan dari seluruh grup — perminyakan, proteksi kebakaran, otomotif, serta pencetakan dan point of sale.",
    "What we supply": "Yang kami sediakan",
    "Everything the group supplies.": "Semua yang disediakan grup.",
    "A sample of the range below. Click through to any of the companies to see its full catalogue.": "Berikut sebagian dari rangkaian produk kami. Klik salah satu perusahaan untuk melihat katalog lengkapnya.",
    "Lifts and handling, tyre service, diagnostics, welding and lubrication for the service bay.": "Lift dan penanganan, layanan ban, diagnostik, pengelasan, dan pelumasan untuk service bay.",
    "Printers, point-of-sale terminals, scanners and self-service kiosks, with the software that runs them.": "Printer, terminal point-of-sale, pemindai, dan kios layanan mandiri, beserta perangkat lunak yang menjalankannya.",
    "Email the group": "Email grup",

    /* ---- career ---- */
    "Hirings": "Lowongan",
    "Join us to work with recognised international principals, learn the technical side of a real industry, and grow with a group that promotes from within.": "Bergabunglah dengan kami untuk bekerja dengan prinsipal internasional ternama, mendalami sisi teknis industri yang nyata, serta berkembang bersama grup yang mengutamakan promosi dari dalam.",
    "Open positions": "Lowongan terbuka",
    "Current openings.": "Lowongan saat ini.",
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

    /* ---- contact ---- */
    "Let's get you to": "Mari hubungkan Anda",
    "the right team.": "dengan tim yang tepat.",
    "Hanindo Group brings together several specialist companies. Choose the business your enquiry is about and we will take you straight to their contact page.": "Hanindo Group menghimpun beberapa perusahaan spesialis. Pilih bidang usaha yang Anda tanyakan dan kami akan mengarahkan Anda langsung ke halaman kontaknya.",
    "Who can we connect you with?": "Dengan siapa kami dapat menghubungkan Anda?",
    "Contact by business.": "Kontak menurut bidang usaha.",
    "Each of our companies runs its own enquiries. Pick the one that fits and you will land on the team that can help.": "Setiap perusahaan kami menangani pertanyaannya sendiri. Pilih yang sesuai dan Anda akan langsung terhubung dengan tim yang dapat membantu.",

    /* ---- 404 ---- */
    "Page Not Found": "Halaman Tidak Ditemukan",
    "We could not find": "Kami tidak dapat menemukan",
    "that page.": "halaman tersebut.",
    "The link may be out of date, or the page may have moved when we rebuilt this site. Here is the quickest way to what you were looking for.": "Tautannya mungkin sudah tidak berlaku, atau halamannya berpindah saat kami membangun ulang situs ini. Berikut cara tercepat menuju yang Anda cari.",
    "Where would you like to go?": "Ke mana Anda ingin menuju?",
    "Our companies.": "Perusahaan kami.",
    "Each of our companies has its own pages. Pick the one your enquiry is about, or use the search box at the top of the page.": "Setiap perusahaan kami memiliki halamannya sendiri. Pilih yang sesuai dengan pertanyaan Anda, atau gunakan kotak pencarian di bagian atas halaman.",
    "Still cannot find it?": "Masih belum menemukannya?",
    "Ask the head office.": "Tanyakan ke kantor pusat.",
    "Tell us what you were looking for and we will point you to the right page — or the right team.": "Beri tahu kami apa yang Anda cari dan kami akan mengarahkan Anda ke halaman yang tepat — atau ke tim yang tepat.",
    "All contacts": "Semua kontak",

    /* ---- privacy page ----
       Added with the page on 2026-08-17. "Privacy" itself is up with the
       footer, since the link sits on every page of every site and so is in
       all eight dictionaries; the prose below is only ever on this page, so
       it lives only here.

       The last section's paragraph wraps an email address in a link, which
       splits it into two text nodes -- hence the two half-sentence entries.
       The address itself is not translated. */
    "What this website does with information about the people who visit it. It is short because the site does very little.": "Apa yang dilakukan situs ini terhadap informasi mengenai orang-orang yang mengunjunginya. Halaman ini singkat karena situs ini memang melakukan sangat sedikit.",
    "This site is a catalogue of what the Hanindo Group companies supply. It has no accounts, no enquiry forms and no shopping basket, so there is very little for us to collect, and we have chosen not to collect what we could.": "Situs ini adalah katalog dari apa yang dipasok perusahaan-perusahaan Hanindo Group. Tidak ada akun, tidak ada formulir permintaan, dan tidak ada keranjang belanja, sehingga sangat sedikit yang dapat kami kumpulkan — dan yang sebenarnya bisa kami kumpulkan pun kami pilih untuk tidak kumpulkan.",

    "We do not track you": "Kami tidak melacak Anda",
    "This site sets no cookies. It runs no analytics, no advertising tags and no social media pixels, so no third party is told which of our pages you looked at.": "Situs ini tidak menyetel cookie. Tidak ada analitik, tidak ada tag iklan, dan tidak ada piksel media sosial, sehingga tidak ada pihak ketiga yang diberi tahu halaman mana yang Anda lihat.",
    "Everything the site needs comes from our own server, including the typeface. Loading a page contacts no other company.": "Semua yang dibutuhkan situs ini berasal dari server kami sendiri, termasuk hurufnya. Membuka sebuah halaman tidak menghubungi perusahaan lain mana pun.",

    "One preference is kept on your device": "Satu preferensi disimpan di perangkat Anda",
    "If you switch the language between English, Bahasa Indonesia or 中文, your choice is saved in your browser so the site opens that way next time. It stays on your device, is never sent to us, and holds nothing but the language you picked. Clearing your browser data removes it.": "Jika Anda mengganti bahasa antara English, Bahasa Indonesia, atau 中文, pilihan Anda disimpan di peramban agar situs terbuka dengan bahasa itu di lain waktu. Data tersebut tetap di perangkat Anda, tidak pernah dikirim kepada kami, dan tidak memuat apa pun selain bahasa yang Anda pilih. Menghapus data peramban akan menghapusnya.",

    "Our server keeps ordinary access logs": "Server kami menyimpan catatan akses biasa",
    "Like any website, ours records the requests it serves: the address of the page, the date and time, your IP address and which browser made the request. These logs exist so the site can be kept running and secure.": "Seperti situs web mana pun, situs kami mencatat permintaan yang dilayaninya: alamat halaman, tanggal dan waktu, alamat IP Anda, serta peramban yang mengajukan permintaan. Catatan ini ada agar situs dapat terus berjalan dan tetap aman.",
    "We do not use them to build a profile of you, we do not combine them with anything else, and we do not sell or share them. They are not linked to your name unless you have written to us separately.": "Kami tidak menggunakannya untuk menyusun profil Anda, tidak menggabungkannya dengan data lain, serta tidak menjual atau membagikannya. Catatan itu tidak dikaitkan dengan nama Anda kecuali Anda memang telah menghubungi kami secara terpisah.",

    "If you write to us": "Jika Anda menghubungi kami",
    "Our contact pages list email addresses and telephone numbers rather than a form. If you contact us, we hold what you send — your name, your company, your message and whatever else you choose to tell us — and use it only to answer you and to carry out any work that follows.": "Halaman kontak kami mencantumkan alamat email dan nomor telepon, bukan formulir. Jika Anda menghubungi kami, kami menyimpan apa yang Anda kirim — nama, perusahaan, pesan Anda, dan hal lain yang Anda pilih untuk sampaikan — dan menggunakannya hanya untuk menjawab Anda serta menjalankan pekerjaan yang menyusul.",
    "We keep enquiries as business correspondence. We do not add you to a mailing list you did not ask for.": "Kami menyimpan permintaan sebagai korespondensi bisnis. Kami tidak memasukkan Anda ke daftar milis yang tidak Anda minta.",

    "Links that lead off this site": "Tautan yang menuju ke luar situs ini",
    "Some pages link to the websites of the manufacturers we represent, and our contact pages link to Google Maps for directions. Those sites are run by other companies under their own privacy terms, and you only reach them by choosing to click.": "Beberapa halaman menautkan ke situs web produsen yang kami wakili, dan halaman kontak kami menautkan ke Google Maps untuk petunjuk arah. Situs-situs tersebut dikelola perusahaan lain dengan ketentuan privasi mereka sendiri, dan Anda hanya membukanya jika memilih untuk mengekliknya.",

    "Asking us about your information": "Menanyakan informasi Anda kepada kami",
    "If you have written to us and want to know what we hold, or want it corrected or deleted, email": "Jika Anda pernah menghubungi kami dan ingin mengetahui data apa yang kami simpan, atau ingin data itu diperbaiki atau dihapus, kirim email ke",
    "or write to the head office address in the footer of this page, and we will deal with it.": "atau kirim surat ke alamat kantor pusat di bagian bawah halaman ini, dan kami akan menanganinya.",

    "Last updated 17 August 2026. If this changes we will update this page and the date above.": "Terakhir diperbarui 17 Agustus 2026. Jika ada perubahan, kami akan memperbarui halaman ini beserta tanggal di atas.",

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
