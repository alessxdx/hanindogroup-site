/* =====================================================================
   Gralessando Pte Ltd — EN / Bahasa Indonesia toggle
   ---------------------------------------------------------------------
   Same mechanism as the other company sites: on load it walks the
   visible text and, where a phrase matches an entry below, swaps
   English <-> Bahasa Indonesia. The choice is remembered
   (localStorage) across the pages of this site only.

   Five pages: home, About Us, Products & Services, Projects, Contact.

   A note on the language. This company is Singapore-incorporated and
   sells across South East Asia rather than into Indonesia — the
   Indonesian market is served by PT. Hanindo Automation Solutions.
   The toggle is here for
   consistency with the rest of the group's sites, and because the
   Jakarta head office reads these pages too.

   To EDIT a translation: find the English on the left, change the
   Indonesian on the right. To ADD one: copy a line and fill in both
   sides. The English side must match the page EXACTLY, including
   punctuation — the match is on the whole trimmed text node, not a
   substring.

   Shared wording — the navigation, the footer, the vision and mission,
   the Custom product families — is carried over verbatim from the
   group and Hanindo Automation dictionaries rather than translated
   afresh, so the same English reads the same way in Indonesian on
   every site.

   DELIBERATELY LEFT IN ENGLISH
   1. Names — the company, every other company in the group, and every
      customer on the wall. Airlines, airports and banks keep the name
      they trade under.
   2. The people named on the contact page, and every address, phone
      number and mailbox.
   3. Point of sale, POS, kiosk and self-service: the trade uses these
      in English in Indonesian copy as well.
   ===================================================================== */
(function () {
  var DICT = {
    /* ---- directions ---- */
    "Get directions": "Petunjuk arah",
    /* ---- navigation / header ---- */
    "Your Solution Provider": "Mitra Solusi Anda",
    "Home": "Beranda",
    "About Us": "Tentang Kami",
    "Our Companies": "Perusahaan Kami",
    "Products & Services": "Produk & Layanan",
    "Products & services": "Produk & layanan",
    "Professional Printing Solutions": "Solusi Pencetakan Profesional",
    "DC / POS Solutions": "Solusi DC / POS",
    "Scanning Solutions": "Solusi Pemindaian",
    "Self-Service Solutions": "Solusi Layanan Mandiri",
    "Projects": "Proyek",
    "Contact Us": "Hubungi Kami",
    "Other markets": "Pasar lainnya",

    /* ---- home ---- */
    "Gralessando Pte Ltd supplies the printing, scanning and point-of-sale hardware and software behind retail and hospitality automation.": "Gralessando Pte Ltd memasok perangkat keras dan perangkat lunak pencetakan, pemindaian, dan point-of-sale yang menjadi tulang punggung otomasi ritel dan perhotelan.",
    "Printing, scanning, and point of sale.": "Pencetakan, pemindaian, dan point of sale.",
    "Professional printing": "Pencetakan profesional",
    "POS, receipt, fiscal, ticket, label and mobile printers.": "Printer POS, struk, fiskal, tiket, label, dan mobile.",
    "Point of sale & data capture": "Point of sale & penangkapan data",
    "Terminals, touch systems, cash registers, scanners and payment terminals.": "Terminal, sistem layar sentuh, mesin kasir, pemindai, dan terminal pembayaran.",
    "Scanning": "Pemindaian",
    "Document scanners and multifunction print-and-scan systems.": "Pemindai dokumen dan sistem cetak-pindai multifungsi.",
    "What we supply": "Yang kami sediakan",
    "Photo needed": "Perlu foto",

    /* ---- customer wall bands ---- */
    "Customer base": "Basis pelanggan",
    "Airports & aviation": "Bandara & penerbangan",
    "Transport, retail & public services": "Transportasi, ritel & layanan publik",
    "Industry & technology": "Industri & teknologi",

    /* ---- home contact block ---- */
    "Rolling out POS,": "Menggelar POS,",
    "or replacing a printer fleet?": "atau mengganti armada printer?",
    "Tell us the sites and volumes you handle and our team will match the right printing, scanning and POS package.": "Beri tahu kami lokasi dan volume yang Anda tangani, dan tim kami akan menyiapkan paket pencetakan, pemindaian, dan POS yang tepat.",
    "Talk to Gralessando Pte Ltd": "Hubungi Gralessando Pte Ltd",
    "Email our team": "Email tim kami",
    "Contact page": "Halaman kontak",
    "Office": "Kantor",
    "Phone": "Telepon",
    "Email": "Email",
    "This contact handles": "Kontak ini menangani",
    "South East Asia (excluding the Philippines, Thailand and Indonesia)": "Asia Tenggara (kecuali Filipina, Thailand, dan Indonesia)",
    ". For the Philippines or Thailand, see the": ". Untuk Filipina atau Thailand, lihat",
    "contact page": "halaman kontak",
    ". Indonesia is served by": ". Indonesia dilayani oleh",
    ", and China by": ", dan Tiongkok oleh",
    "Singapore Office": "Kantor Singapura",

    /* ---- about ---- */
    "About": "Tentang",
    "Us": "Kami",
    "Company overview": "Profil perusahaan",
    "The group’s hub": "Pusat grup ini",
    "for South East Asia": "untuk Asia Tenggara",
    /* The first paragraph carries two inline links, so it reaches the walker
       as three text nodes. The link text itself is China and Indonesia, both
       of which already have entries further down for the contact page — so
       the anchors translate without anything new here. */
    "Gralessando (S) Pte Ltd was established in Singapore in 2014 as the third stage of CUSTOM Hanindo’s regional expansion. After establishing its presence in": "Gralessando (S) Pte Ltd didirikan di Singapura pada tahun 2014 sebagai tahap ketiga ekspansi regional CUSTOM Hanindo. Setelah membangun kehadirannya di",
    "in 2007 and expanding into": "pada tahun 2007 dan berkembang ke",
    "in 2012, Singapore was selected as the hub for CUSTOM Hanindo’s operations across Southeast Asia.": "pada tahun 2012, Singapura dipilih sebagai pusat operasi CUSTOM Hanindo di seluruh Asia Tenggara.",
    "Since 2016, Gralessando has expanded through appointed partners across the region. Today, Singapore, Malaysia, Vietnam, Brunei, Cambodia, Laos and Myanmar are supported directly by the Singapore office, Thailand is supported through its local partner, and the Philippines is served through a CUSTOM Hanindo office established in Manila in 2023.": "Sejak 2016, Gralessando berkembang melalui mitra-mitra yang ditunjuk di seluruh kawasan. Kini Singapura, Malaysia, Vietnam, Brunei, Kamboja, Laos, dan Myanmar didukung langsung oleh kantor Singapura, Thailand didukung melalui mitra lokalnya, dan Filipina dilayani melalui kantor CUSTOM Hanindo yang didirikan di Manila pada tahun 2023.",
    "The Singapore office": "Kantor Singapura",
    "Part of the Hanindo Group, supporting retail, transport and service operators across Southeast Asia.": "Bagian dari Hanindo Group, mendukung operator ritel, transportasi, dan jasa di seluruh Asia Tenggara.",
    "Gralessando Pte Ltd is incorporated in Singapore and is represented as CUSTOM (South East Asia). The Indonesian market is served by PT. Hanindo Automation Solutions, while the China market is served by Hanindo Shanghai.": "Gralessando Pte Ltd berbadan hukum di Singapura dan diwakili sebagai CUSTOM (Asia Tenggara). Pasar Indonesia dilayani oleh PT. Hanindo Automation Solutions, sedangkan pasar Tiongkok dilayani oleh Hanindo Shanghai.",

    /* ---- about: timeline ---- */
    "Our journey": "Perjalanan kami",
    "CUSTOM Hanindo Growth": "Pertumbuhan CUSTOM Hanindo",
    "CUSTOM partnership": "Kemitraan CUSTOM",
    "Partnered to expand CUSTOM products to the China market.": "Kemitraan untuk memperluas produk CUSTOM ke pasar Tiongkok.",
    "Shanghai office": "Kantor Shanghai",
    "The group’s first office in China.": "Kantor pertama grup ini di Tiongkok.",
    "Shenzhen office": "Kantor Shenzhen",
    "A second China office as the market grows.": "Kantor kedua di Tiongkok seiring pertumbuhan pasar.",
    "South East Asia expansion": "Ekspansi Asia Tenggara",
    "Hanindo Automation Solutions adds CUSTOM Hanindo Indonesia.": "Hanindo Automation Solutions menghadirkan CUSTOM Hanindo Indonesia.",
    "Singapore office": "Kantor Singapura",
    "Gralessando Pte Ltd opens, covering CUSTOM Hanindo South East Asia.": "Gralessando Pte Ltd dibuka, mencakup CUSTOM Hanindo Asia Tenggara.",
    "Regional partnerships": "Kemitraan regional",
    "CUSTOM Hanindo partnerships established in Vietnam, Thailand and the Philippines.": "Kemitraan CUSTOM Hanindo dijalin di Vietnam, Thailand, dan Filipina.",
    "Manila office": "Kantor Manila",
    "A CUSTOM Hanindo office follows the Philippines partnership.": "Kantor CUSTOM Hanindo menyusul setelah kemitraan Filipina.",

    /* ---- about: direction and credentials ---- */
    "Our direction": "Arah kami",
    "Vision & Mission": "Visi & Misi",
    "01 / Vision": "01 / Visi",
    "Vision": "Visi",
    "To be Southeast Asia’s trusted technology partner for retail, transport and service industries.": "Menjadi mitra teknologi tepercaya Asia Tenggara untuk industri ritel, transportasi, dan jasa.",
    "02 / Mission": "02 / Misi",
    "Mission": "Misi",
    "Deliver CUSTOM printing, scanning and point-of-sale solutions tailored to customer needs.": "Menghadirkan solusi pencetakan, pemindaian, dan point-of-sale CUSTOM yang disesuaikan dengan kebutuhan pelanggan.",
    "Integrate, install and support systems through our Singapore office and appointed partners.": "Mengintegrasikan, memasang, dan mendukung sistem melalui kantor Singapura dan mitra yang kami tunjuk.",
    "Help businesses adopt reliable technology solutions that improve daily operations.": "Membantu bisnis mengadopsi solusi teknologi andal yang meningkatkan operasional sehari-hari.",
    "Why choose us": "Mengapa memilih kami",
    "Why clients trust us": "Mengapa klien mempercayai kami",
    "Three things you can count on, from first specification through to long-term support.": "Tiga hal yang dapat Anda andalkan, dari spesifikasi awal hingga dukungan jangka panjang.",
    "Industry Experience": "Pengalaman Industri",
    "Technology Expertise": "Keahlian Teknologi",
    "Official CUSTOM solutions with the capability to integrate hardware into business operations.": "Solusi CUSTOM resmi dengan kemampuan mengintegrasikan perangkat keras ke dalam operasional bisnis.",
    "Regional Support": "Dukungan Regional",
    "Installation, technical assistance and after-sales service from our Singapore office and appointed partners.": "Pemasangan, bantuan teknis, dan layanan purnajual dari kantor Singapura dan mitra yang kami tunjuk.",

    /* ---- products & services ---- */
    "Products &": "Produk &",
    "Services": "Layanan",
    "Printing, scanning and point of sale — supplied, integrated and supported.": "Pencetakan, pemindaian, dan point of sale — dipasok, diintegrasikan, dan didukung.",
    "Our product range": "Rangkaian produk kami",
    "Four families of Custom hardware and the software that runs them, supplied, integrated and supported across South East Asia. Each links through to the full Custom catalogue.": "Empat rangkaian perangkat keras Custom beserta perangkat lunaknya, dipasok, diintegrasikan, dan didukung di seluruh Asia Tenggara. Masing-masing terhubung ke katalog Custom lengkap.",
    "POS, receipt, fiscal, ticket, label, kiosk and mobile printers.": "Printer POS, struk, fiskal, tiket, label, kios, dan mobile.",
    "View products": "Lihat produk",
    "POS terminals, touch systems, cash registers and monitors.": "Terminal POS, sistem layar sentuh, mesin kasir, dan monitor.",
    "Document scanners, barcode readers and imaging systems.": "Pemindai dokumen, pembaca barcode, dan sistem pencitraan.",
    "Kiosks and countertop units for unattended service.": "Kios dan unit meja untuk layanan mandiri.",
    "Industries served": "Industri yang dilayani",
    "Retail": "Ritel",
    "Self-Payment & Info Kiosk": "Kios Pembayaran Mandiri & Informasi",
    "Public Transport": "Transportasi Umum",
    "Aviation": "Penerbangan",
    "Healthcare": "Kesehatan",
    "Parking": "Perparkiran",
    "Logistics & Postal": "Logistik & Pos",
    "Entertainment": "Hiburan",
    "Lotteries & Betting": "Lotere & Taruhan",
    "Manufacturing": "Manufaktur",
    "Banking & Finance": "Perbankan & Keuangan",

    /* ---- projects ---- */
    "Rollouts,": "Penggelaran,",
    "site by site.": "lokasi demi lokasi.",
    "POS and printing deployments across retail, hospitality and entertainment.": "Penerapan POS dan pencetakan di sektor ritel, perhotelan, dan hiburan.",
    "Selected work": "Pekerjaan terpilih",
    "Deployments we have delivered.": "Penerapan yang telah kami kerjakan.",
    "Retail chains, hospitality groups and entertainment venues.": "Jaringan ritel, grup perhotelan, dan tempat hiburan.",
    "Content needed": "Perlu konten",
    "Add Gralessando Pte Ltd project references here": "Tambahkan referensi proyek Gralessando Pte Ltd di sini",
    "This page is built and linked, but no project references have been supplied for Gralessando Pte Ltd yet. Add each project as a card — client, location, scope and a photo — following the pattern used on the Fire Fighting projects page.": "Halaman ini sudah dibuat dan tertaut, tetapi belum ada referensi proyek yang disediakan untuk Gralessando Pte Ltd. Tambahkan setiap proyek sebagai kartu — klien, lokasi, lingkup pekerjaan, dan foto — mengikuti pola yang dipakai pada halaman proyek Pemadam Kebakaran.",
    "See the pattern": "Lihat polanya",

    /* ---- contact ---- */
    "Let's talk about": "Mari bicarakan",
    "your project.": "proyek Anda.",
    "Tell us what you are running or building, and we will put the right person on it.": "Beri tahu kami apa yang sedang Anda jalankan atau bangun, dan kami akan menugaskan orang yang tepat.",
    "How to reach us.": "Cara menghubungi kami.",
    "For printer and POS supply, integration, consumables or service, reach the Singapore office of Gralessando Pte Ltd.": "Untuk pengadaan, integrasi, bahan habis pakai, atau servis printer dan POS, hubungi kantor Singapura Gralessando Pte Ltd.",
    "Telephone": "Telepon",
    "Office hours": "Jam operasional",
    "— Monday to Friday, 09.00 – 17.30 SGT": "— Senin sampai Jumat, 09.00 – 17.30 SGT",
    /* The first market card reuses the region name from the mktnote block above. */
    "Philippines": "Filipina",
    "Thailand": "Thailand",
    "For": "Untuk",
    "Indonesia": "Indonesia",
    ", the same Custom range is supplied by": ", rangkaian Custom yang sama dipasok oleh",
    ". For": ". Untuk",
    "China": "Tiongkok",
    ", see": ", lihat",

    /* ---- footer ---- */
    "Your technology one stop solution — serving the oil & gas, automation, automotive and fire protection industries in Indonesia since 1987.": "Solusi teknologi satu atap Anda — melayani industri minyak & gas, otomasi, otomotif, dan proteksi kebakaran di Indonesia sejak 1987.",
    "Hanindo Automation Solutions": "Hanindo Automation Solutions",
    "Tel:": "Tel:",
    "© 2026 Hanindo Group. All Rights Reserved.": "© 2026 Hanindo Group. Hak Cipta Dilindungi."
  };

  var LANG_KEY = 'ha_gralessando_lang', ALT = 'id', HTML_LANG = 'id';
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
