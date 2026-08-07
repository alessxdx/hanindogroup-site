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
    "POS, fiscal, ticket, label and mobile printers.": "Printer POS, fiskal, tiket, label, dan mobile.",
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
    "Gralessando (S) Pte Ltd opened in Singapore in 2014, the third step in one expansion. CUSTOM Hanindo proved itself in China from 2007, reached Indonesia in 2012, and two years after that was given a company of its own in Singapore — set up as the hub for CUSTOM Hanindo across the whole of South East Asia.": "Gralessando (S) Pte Ltd dibuka di Singapura pada tahun 2014, langkah ketiga dari satu rangkaian ekspansi. CUSTOM Hanindo membuktikan diri di Tiongkok sejak 2007, masuk ke Indonesia pada 2012, dan dua tahun setelahnya memperoleh perusahaan sendiri di Singapura — dibentuk sebagai pusat CUSTOM Hanindo untuk seluruh Asia Tenggara.",
    "Being the hub is what sets this company apart from the group’s other two Custom companies, which each serve one country. Gralessando serves a region. The region was opened through partners appointed from 2016 onwards. Today Thailand is served through its partner and the Philippines from a CUSTOM Hanindo office of our own, opened in Manila in 2023; the rest of the region — Singapore, Malaysia, Vietnam, Brunei, Cambodia, Laos and Myanmar — is served by the Singapore office directly.": "Peran sebagai pusat inilah yang membedakan perusahaan ini dari dua perusahaan Custom lain di grup, yang masing-masing melayani satu negara. Gralessando melayani satu kawasan. Kawasan ini dibuka melalui para mitra yang ditunjuk sejak 2016. Kini Thailand dilayani melalui mitranya dan Filipina dari kantor CUSTOM Hanindo milik kami sendiri yang dibuka di Manila pada 2023; sisa kawasan — Singapura, Malaysia, Vietnam, Brunei, Kamboja, Laos, dan Myanmar — dilayani langsung oleh kantor Singapura.",
    "The Singapore office": "Kantor Singapura",
    "One of the companies of the Hanindo Group, serving operators across South East Asia.": "Salah satu perusahaan Hanindo Group, melayani operator di seluruh Asia Tenggara.",
    "Gralessando Pte Ltd is incorporated in Singapore and is represented as Custom (South East Asia). The Indonesian market is served by PT. Hanindo Automation Solutions, the group's Jakarta company.": "Gralessando Pte Ltd berbadan hukum di Singapura dan diwakili sebagai Custom (Asia Tenggara). Pasar Indonesia dilayani oleh PT. Hanindo Automation Solutions, perusahaan grup yang berbasis di Jakarta.",

    /* ---- about: timeline ---- */
    "Our journey": "Perjalanan kami",
    "CUSTOM HANINDO Growth": "Pertumbuhan CUSTOM HANINDO",
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
    "To be the automation partner South East Asia’s retail, transport and service operators rely on.": "Menjadi mitra otomasi yang diandalkan oleh operator ritel, transportasi, dan jasa di Asia Tenggara.",
    "02 / Mission": "02 / Misi",
    "Mission": "Misi",
    "Supply Custom’s printing, scanning and point-of-sale hardware with the software that runs it.": "Menyediakan perangkat keras pencetakan, pemindaian, dan point-of-sale Custom beserta perangkat lunaknya.",
    "Integrate, install and support every system locally.": "Mengintegrasikan, memasang, dan mendukung setiap sistem secara lokal.",
    "Keep pace with Custom’s range so customers run current technology.": "Mengikuti perkembangan rangkaian produk Custom agar pelanggan menggunakan teknologi terkini.",
    "Why choose us": "Mengapa memilih kami",
    "Why clients trust us": "Mengapa klien mempercayai kami",
    "Three things you can count on, from first specification through to long-term support.": "Tiga hal yang dapat Anda andalkan, dari spesifikasi awal hingga dukungan jangka panjang.",
    "Trusted": "Terpercaya",
    "Best Quality": "Kualitas Terbaik",
    "Custom hardware and software, built for unattended, high-volume use.": "Perangkat keras dan lunak Custom, dirancang untuk penggunaan mandiri bervolume tinggi.",
    "Excellent Service": "Pelayanan Prima",
    "Supply, integration and after-sales support.": "Pengadaan, integrasi, dan dukungan purnajual.",

    /* ---- products & services ---- */
    "Products &": "Produk &",
    "Services": "Layanan",
    "Printing, scanning and point of sale — supplied, integrated and supported.": "Pencetakan, pemindaian, dan point of sale — dipasok, diintegrasikan, dan didukung.",
    "Our product range": "Rangkaian produk kami",
    "Four families of Custom hardware and the software that runs them, supplied, integrated and supported across South East Asia. Each links through to the full Custom catalogue.": "Empat rangkaian perangkat keras Custom beserta perangkat lunaknya, dipasok, diintegrasikan, dan didukung di seluruh Asia Tenggara. Masing-masing terhubung ke katalog Custom lengkap.",
    "POS, fiscal, ticket, label, kiosk and mobile printers.": "Printer POS, fiskal, tiket, label, kios, dan mobile.",
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
    "— Monday to Friday, 08.00 – 17.00 SGT": "— Senin sampai Jumat, 08.00 – 17.00 SGT",
    "Gralessando covers South East Asia — the Philippines from our own Manila office, Thailand through our partner, and the rest of the region direct from the Singapore office. Write to the address for your market, or call the person named:": "Gralessando mencakup Asia Tenggara — Filipina dari kantor kami sendiri di Manila, Thailand melalui mitra kami, dan sisa kawasan langsung dari kantor Singapura. Kirim email ke alamat untuk pasar Anda, atau hubungi orang yang tercantum:",
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
