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
    /* ---- directions ---- */
    "Get directions": "Petunjuk arah",
    /* ---- navigation / header ---- */
    "Back to": "Kembali ke",
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
    "POS, receipt, fiscal, ticket, label and mobile printers.": "Printer POS, struk, fiskal, tiket, label, dan mobile.",
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

    /* ---- contact page, and the footer's address column ----
       The contact band these mostly belonged to came off the home, About
       and Products & Services pages, and ten of its entries went with it:
       the eyebrow, both halves of the heading, the sub line, "Contact
       page", "Phone", and the four pieces the <b> and the two <a>s split
       its market note into.
       What is left was checked one at a time and is still in use.
       "Email our team" is the contact page's button; "Office", "Email",
       "Jakarta Office" and "Tel:" are the details list and the footer's
       address column; and "China" and ", see" belong to the contact
       page's own market note, which is worded differently from the one
       that came off. */
    "Email our team": "Email tim kami",
    "Office": "Kantor",
    "Email": "Email",
    "Jakarta Office": "Kantor Jakarta",
    "Tel:": "Tel:",
    "China": "Tiongkok",
    ", see": ", lihat",

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
    /* Both paragraphs carry an inline link, so each reaches the walker as
       two text nodes either side of the anchor and needs an entry per side.
       Neither link text is translated: "PT. Hanindo Citra" and "CUSTOM S.p.A."
       are company names. */
    "PT. Hanindo Automation Solutions was one of the four companies established when the Hanindo Group was founded in 2002. Originally focused on automation solutions for the oil and gas industry, the company later evolved through its partnership with": "PT. Hanindo Automation Solutions adalah salah satu dari empat perusahaan yang didirikan saat Hanindo Group berdiri pada tahun 2002. Awalnya berfokus pada solusi otomasi untuk industri minyak dan gas, perusahaan ini kemudian berkembang melalui kemitraannya dengan",
    ", introducing the CUSTOM product line to Indonesia in 2012 as CUSTOM Hanindo Indonesia.": ", memperkenalkan lini produk CUSTOM ke Indonesia pada tahun 2012 sebagai CUSTOM Hanindo Indonesia.",
    "Today, PT. Hanindo Automation Solutions focuses on CUSTOM printing, scanning and point-of-sale solutions, supported by local system integration and technical expertise. The oil and gas automation business was transferred to": "Saat ini, PT. Hanindo Automation Solutions berfokus pada solusi pencetakan, pemindaian, dan point-of-sale CUSTOM, didukung integrasi sistem dan keahlian teknis lokal. Bisnis otomasi minyak dan gas dialihkan ke",
    ", where it continues alongside its petroleum equipment operations.": ", tempatnya berlanjut bersama operasi peralatan perminyakan perusahaan tersebut.",
    "Our Indonesia Office": "Kantor Kami di Indonesia",

    "Our journey": "Perjalanan kami",
    "CUSTOM Hanindo Growth": "Pertumbuhan CUSTOM Hanindo",
    "CUSTOM partnership": "Kemitraan CUSTOM",
    "Partnered to expand CUSTOM products to the China market.": "Kemitraan untuk memperluas produk CUSTOM ke pasar Tiongkok.",
    "Shanghai office": "Kantor Shanghai",
    "The group’s first office in China.": "Kantor pertama grup ini di Tiongkok.",
    "Shenzhen office": "Kantor Shenzhen",
    "A second China office as the market grows.": "Kantor kedua di Tiongkok seiring pertumbuhan pasar.",
    "South East Asia expansion": "Ekspansi Asia Tenggara",
    "PT. Hanindo Automation Solutions adds CUSTOM Hanindo Indonesia.": "PT. Hanindo Automation Solutions menghadirkan CUSTOM Hanindo Indonesia.",
    "Singapore office": "Kantor Singapura",
    "Gralessando (S) Pte. Ltd. opens, covering CUSTOM Hanindo South East Asia.": "Gralessando (S) Pte. Ltd. dibuka, mencakup CUSTOM Hanindo Asia Tenggara.",
    "Regional partnerships": "Kemitraan regional",
    "CUSTOM Hanindo partnerships established in Vietnam, Thailand and the Philippines.": "Kemitraan CUSTOM Hanindo dijalin di Vietnam, Thailand, dan Filipina.",
    "Manila office": "Kantor Manila",
    "A CUSTOM Hanindo office follows the Philippines partnership.": "Kantor CUSTOM Hanindo menyusul setelah kemitraan Filipina.",

    /* ---- about: direction ---- */
    "Our direction": "Arah kami",
    "Vision & Mission": "Visi & Misi",
    "01 / Vision": "01 / Visi",
    "Vision": "Visi",
    "To be Indonesia’s trusted technology partner for retail, transport and service industries.": "Menjadi mitra teknologi tepercaya Indonesia untuk industri ritel, transportasi, dan jasa.",
    "02 / Mission": "02 / Misi",
    "Mission": "Misi",
    "Deliver CUSTOM printing, scanning and point-of-sale solutions tailored to customer needs.": "Menghadirkan solusi pencetakan, pemindaian, dan point-of-sale CUSTOM yang disesuaikan dengan kebutuhan pelanggan.",
    "Integrate, install and support systems through our local technical team.": "Mengintegrasikan, memasang, dan mendukung sistem melalui tim teknis lokal kami.",
    "Help businesses adopt reliable technology solutions that improve daily operations.": "Membantu bisnis mengadopsi solusi teknologi andal yang meningkatkan operasional sehari-hari.",

    /* ---- about: why choose us ---- */
    "Why choose us": "Mengapa memilih kami",
    "Why clients trust us": "Mengapa klien mempercayai kami",
    "Three things you can count on, from first specification through to long-term support.": "Tiga hal yang dapat Anda andalkan, dari spesifikasi awal hingga dukungan jangka panjang.",
    "Industry Experience": "Pengalaman Industri",
    "Part of the Hanindo Group, supporting retail, transport and service operators across Indonesia.": "Bagian dari Hanindo Group, mendukung operator ritel, transportasi, dan jasa di seluruh Indonesia.",
    "Technology Expertise": "Keahlian Teknologi",
    "Official CUSTOM solutions with the capability to integrate hardware into business operations.": "Solusi CUSTOM resmi dengan kemampuan mengintegrasikan perangkat keras ke dalam operasional bisnis.",
    "Local Support": "Dukungan Lokal",
    "Installation, technical assistance and after-sales service from our own team.": "Pemasangan, bantuan teknis, dan layanan purnajual dari tim kami sendiri.",

    /* ---- products & services ---- */
    "Products &": "Produk &",
    "Services": "Layanan",
    "Printing, scanning and point of sale — supplied, integrated and supported.": "Pencetakan, pemindaian, dan point of sale — dipasok, diintegrasikan, dan didukung.",
    "What we offer": "Yang kami tawarkan",
    "Automation hardware, counter to kiosk": "Perangkat keras otomasi, dari meja kasir hingga kios",
    "Four families of Custom hardware and the software that runs them, supplied, integrated and supported across South East Asia. Each links through to the full Custom catalogue.": "Empat rangkaian perangkat keras Custom beserta perangkat lunaknya, dipasok, diintegrasikan, dan didukung di seluruh Asia Tenggara. Masing-masing terhubung ke katalog Custom lengkap.",
    "POS, receipt, fiscal, ticket, label, kiosk and mobile printers.": "Printer POS, struk, fiskal, tiket, label, kios, dan mobile.",
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
