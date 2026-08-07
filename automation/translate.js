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
    /* The sector labels on the customer wall. These are headings, not
       company names, so they translate — the logos and the .nm fallback
       names beside them stay in their own form. */
    "Airports & airlines": "Bandara & maskapai",
    "Transport": "Transportasi",
    "Technology & services": "Teknologi & layanan",

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
    ". For the rest of South East Asia, see": ". Untuk kawasan Asia Tenggara lainnya, lihat",

    /* ---- footer ---- */
    "Our Companies": "Perusahaan Kami",
    "Your technology one stop solution — serving the oil & gas, automation, automotive and fire protection industries in Indonesia since 1987.": "Solusi teknologi satu atap Anda — melayani industri minyak & gas, otomasi, otomotif, dan proteksi kebakaran di Indonesia sejak 1987.",
    "© 2026 Hanindo Group. All Rights Reserved.": "© 2026 Hanindo Group. Hak Cipta Dilindungi.",

    /* ---- about: hero + overview + journey ---- */
    "About": "Tentang",
    "Us": "Kami",
    "One of the four companies the Hanindo Group was founded with, and the arm that brings CUSTOM’s printing, scanning and self-service systems to Indonesia.": "Salah satu dari empat perusahaan pendiri Hanindo Group, dan lini yang menghadirkan sistem pencetakan, pemindaian, dan layanan mandiri CUSTOM ke Indonesia.",

    "Company overview": "Profil perusahaan",
    "Founded for oil & gas,": "Didirikan untuk minyak & gas,",
    "rebuilt around CUSTOM": "dibangun ulang di sekitar CUSTOM",
    "PT. Hanindo Automation Solutions is one of the four companies the Hanindo Group was founded with in 2002, alongside Citra, Automotive and Flowtech, all formed within months of each other. Its brief was the name: automation for the oil and gas industry, whatever the industry needed automated, while Citra supplied the forecourt equipment and Flowtech built the stations.": "PT. Hanindo Automation Solutions adalah satu dari empat perusahaan pendiri Hanindo Group pada tahun 2002, bersama Citra, Automotive, dan Flowtech, yang seluruhnya dibentuk dalam rentang beberapa bulan. Mandatnya sesuai namanya: otomasi untuk industri minyak dan gas, apa pun yang perlu diotomasi di industri itu, sementara Citra memasok peralatan forecourt dan Flowtech membangun SPBU-nya.",
    "The business it is known for today came later, and it came from China. The partnership the group formed with CUSTOM in 2005 had made its case there by the end of the decade, and in 2012 Automation Solutions brought the line home as CUSTOM Hanindo Indonesia — the second market in the world to take it on.": "Bisnis yang dikenal hari ini datang belakangan, dan datang dari Tiongkok. Kemitraan yang dijalin grup dengan CUSTOM pada tahun 2005 telah membuktikan dirinya di sana menjelang akhir dekade itu, dan pada tahun 2012 Automation Solutions membawa lini itu pulang sebagai CUSTOM Hanindo Indonesia — pasar kedua di dunia yang menjalankannya.",
    /* The third paragraph carries an inline link to Hanindo Citra, so it
       reaches the walker as two text nodes either side of the anchor and
       needs an entry for each. Same split as the Fire Fighting Department
       sentence on the Hanindo Citra About page. The link text is a company
       name and stays in English, so it needs no entry at all. */
    "That same year the company changed shape around it. The oil and gas automation work passed to": "Pada tahun yang sama perusahaan ini berubah bentuk mengikutinya. Pekerjaan otomasi minyak dan gas beralih ke",
    ", where it sits with the petroleum equipment it always served, and CUSTOM has been the whole of this company’s business ever since: printing, scanning and point-of-sale hardware, supplied, integrated and supported here in Indonesia. The name is from the first decade; the work is from the second.": ", tempatnya menyatu dengan peralatan perminyakan yang selama ini dilayaninya, dan sejak itu CUSTOM menjadi keseluruhan bisnis perusahaan ini: perangkat keras pencetakan, pemindaian, dan point-of-sale, dipasok, diintegrasikan, dan didukung di Indonesia. Namanya berasal dari dekade pertama; pekerjaannya dari dekade kedua.",
    "Point-of-sale in the field": "Point-of-sale di lapangan",

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

    /* ---- about: direction ---- */
    "Our direction": "Arah kami",
    "Vision & Mission": "Visi & Misi",
    "01 / Vision": "01 / Visi",
    "Vision": "Visi",
    "To be the automation partner Indonesia’s retail, transport and service operators rely on.": "Menjadi mitra otomasi yang diandalkan oleh operator ritel, transportasi, dan jasa di Indonesia.",
    "02 / Mission": "02 / Misi",
    "Mission": "Misi",
    "Supply Custom’s printing, scanning and point-of-sale hardware with the software that runs it.": "Menyediakan perangkat keras pencetakan, pemindaian, dan point-of-sale Custom beserta perangkat lunaknya.",
    "Integrate, install and support every system locally.": "Mengintegrasikan, memasang, dan mendukung setiap sistem secara lokal.",
    "Keep pace with Custom’s range so customers run current technology.": "Mengikuti perkembangan rangkaian produk Custom agar pelanggan menggunakan teknologi terkini.",

    /* ---- about: why choose us ---- */
    "Why choose us": "Mengapa memilih kami",
    "Why clients trust us": "Mengapa klien mempercayai kami",
    "Three things you can count on, from first specification through to long-term support.": "Tiga hal yang dapat Anda andalkan, dari spesifikasi awal hingga dukungan jangka panjang.",
    "Trusted": "Terpercaya",
    "One of the companies of the Hanindo Group, serving operators across Indonesia.": "Salah satu perusahaan Hanindo Group, melayani operator di seluruh Indonesia.",
    "Best Quality": "Kualitas Terbaik",
    "Custom hardware and software, built for unattended, high-volume use.": "Perangkat keras dan lunak Custom, dirancang untuk penggunaan mandiri bervolume tinggi.",
    "Excellent Service": "Pelayanan Prima",
    "Supply, integration and after-sales support.": "Pengadaan, integrasi, dan dukungan purnajual.",

    /* ---- products & services ---- */
    "Products &": "Produk &",
    "Services": "Layanan",
    "Printing, scanning and point of sale — supplied, integrated and supported.": "Pencetakan, pemindaian, dan point of sale — dipasok, diintegrasikan, dan didukung.",
    "What we offer": "Yang kami tawarkan",
    "Automation hardware, counter to kiosk": "Perangkat keras otomasi, dari meja kasir hingga kios",
    "Four families of Custom hardware and the software that runs them, supplied, integrated and supported across South East Asia. Each links through to the full Custom catalogue.": "Empat rangkaian perangkat keras Custom beserta perangkat lunaknya, dipasok, diintegrasikan, dan didukung di seluruh Asia Tenggara. Masing-masing terhubung ke katalog Custom lengkap.",
    "POS, fiscal, ticket, label, kiosk and mobile printers.": "Printer POS, fiskal, tiket, label, kios, dan mobile.",
    "View products": "Lihat produk",
    "POS terminals, touch systems, cash registers and monitors.": "Terminal POS, sistem layar sentuh, mesin kasir, dan monitor.",
    "Document scanners, barcode readers and imaging systems.": "Pemindai dokumen, pembaca barcode, dan sistem pencitraan.",
    "Kiosks and countertop units for unattended service.": "Kios dan unit meja untuk layanan mandiri.",

    /* ---- industries ---- */
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

    /* ---- contact page ---- */
    "Let's talk about": "Mari bicarakan",
    "your project.": "proyek Anda.",
    "Tell us what you are running or building, and we will put the right person on it.": "Beri tahu kami apa yang sedang Anda jalankan atau bangun, dan kami akan menugaskan orang yang tepat.",
    "How to reach us.": "Cara menghubungi kami.",
    "For printer and POS supply, integration, consumables or service, reach the Jakarta office of PT. Hanindo Automation Solutions.": "Untuk pengadaan printer dan POS, integrasi, consumable, atau layanan, hubungi kantor Jakarta PT. Hanindo Automation Solutions.",
    "Telephone": "Telepon",
    "Office hours": "Jam operasional",
    /* The details list puts the value in the same text node as the dash
       that introduces it, so the dash has to be part of the key. */
    "— Monday to Friday, 08.00 – 17.00 WIB": "— Senin – Jumat, 08.00 – 17.00 WIB",
    "Person in charge": "Penanggung jawab",
    "For": "Untuk",
    "the rest of South East Asia": "kawasan Asia Tenggara lainnya",
    ", the same Custom range is supplied by": ", rangkaian Custom yang sama dipasok oleh",

    /* ---- projects page ----
       Still a placeholder page: it carries the "Content needed" panel
       rather than real references. When the project cards arrive, the
       panel copy below can go and the card text takes its place. */
    "Projects": "Proyek",
    "Rollouts,": "Penggelaran,",
    "site by site.": "lokasi demi lokasi.",
    "POS and printing deployments across retail, hospitality and entertainment.": "Penerapan POS dan pencetakan di sektor ritel, perhotelan, dan hiburan.",
    "Selected work": "Pekerjaan terpilih",
    "Deployments we have delivered.": "Penerapan yang telah kami kerjakan.",
    "Retail chains, hospitality groups and entertainment venues.": "Jaringan ritel, grup perhotelan, dan tempat hiburan.",
    "Content needed": "Perlu konten",
    "Add PT. Hanindo Automation Solutions project references here": "Tambahkan referensi proyek PT. Hanindo Automation Solutions di sini",
    "This page is built and linked, but no project references have been supplied for PT. Hanindo Automation Solutions yet. Add each project as a card — client, location, scope and a photo — following the pattern used on the Fire Fighting projects page.": "Halaman ini sudah dibuat dan ditautkan, tetapi belum ada referensi proyek yang disediakan untuk PT. Hanindo Automation Solutions. Tambahkan setiap proyek sebagai kartu — klien, lokasi, lingkup pekerjaan, dan foto — mengikuti pola yang digunakan pada halaman proyek Fire Fighting.",
    "See the pattern": "Lihat polanya",

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
