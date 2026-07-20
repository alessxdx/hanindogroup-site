/* =====================================================================
   Hanindo Citra — EN / ID language toggle  (plain JS, no dependencies)
   ---------------------------------------------------------------------
   How it works: on load it scans the visible text and, when a phrase
   matches an entry in DICT below, swaps English <-> Bahasa Indonesia.
   The choice is remembered (localStorage) across pages.

   To EDIT a translation: find the English text on the left and change
   the Indonesian text on the right. To ADD one: copy a line and fill in
   both sides. Keep the English side EXACTLY as it appears on the page.
   ===================================================================== */
(function () {
  var DICT = {
    /* ---- navigation / header ---- */
    "Home": "Beranda",
    "About Us": "Tentang Kami",
    "Products & Services": "Produk & Layanan",
    "Projects": "Proyek",
    "Contact Us": "Hubungi Kami",
    "Call Center :": "Pusat Panggilan :",

    /* ---- home hero ---- */
    "Fire protection,": "Proteksi kebakaran,",
    "engineered end to end.": "direkayasa menyeluruh.",
    "We design, supply, install and maintain complete fire-fighting systems — reliable on day one, and every day after.": "Kami merancang, memasok, memasang, dan memelihara sistem pemadam kebakaran yang lengkap — andal sejak hari pertama, dan setiap hari sesudahnya.",
    "Our products & services": "Produk & layanan kami",
    "About Hanindo Citra": "Tentang Hanindo Citra",
    "A cornerstone of the": "Pilar utama",
    "The fire fighting department of the Hanindo Group — delivering advanced, end-to-end fire-protection systems that safeguard lives and property across Indonesia.": "Departemen pemadam kebakaran Hanindo Group — menghadirkan sistem proteksi kebakaran mutakhir dan menyeluruh yang melindungi jiwa dan properti di seluruh Indonesia.",
    "About us": "Tentang kami",
    "Proven track record": "Rekam jejak terbukti",
    "Trusted across oil & gas,": "Dipercaya di sektor migas,",
    "government & industry.": "pemerintah & industri.",
    "Complex fire-safety installations delivered throughout Indonesia — from petroleum storage terminals to government rail infrastructure.": "Instalasi keselamatan kebakaran yang kompleks di seluruh Indonesia — dari terminal penyimpanan minyak hingga infrastruktur perkeretaapian pemerintah.",
    "View projects": "Lihat proyek",
    "Scroll": "Gulir",

    /* ---- home statement + stats ---- */
    "Hanindo Citra is the fire protection division of Hanindo Group—transforming": "Hanindo Citra adalah divisi proteksi kebakaran Hanindo Group—mengubah",
    "meticulous engineering": "rekayasa yang cermat",
    "into fire protection systems that safeguard people, protect assets, and perform reliably long after handover.": "menjadi sistem proteksi kebakaran yang melindungi jiwa, menjaga aset, dan bekerja andal jauh setelah serah terima.",
    "Fire-system technologies installed": "Teknologi sistem kebakaran terpasang",
    "Industries served across Indonesia": "Industri yang dilayani di Indonesia",
    "Delivery stages, design to maintenance": "Tahap pengerjaan, desain hingga pemeliharaan",
    "End‑to‑end": "Menyeluruh",
    "One partner, backed by the Hanindo Group": "Satu mitra, didukung oleh Hanindo Group",

    /* ---- customers ---- */
    "Team experience includes work with": "Pengalaman tim mencakup pekerjaan dengan",

    /* ---- contact (short + full) ---- */
    "Partner with Hanindo Citra": "Bermitra dengan Hanindo Citra",
    "Safety is not a service —": "Keselamatan bukan sekadar layanan —",
    "it is our standard.": "itu adalah standar kami.",
    "Tell us about your project and our team will design the right fire-protection solution — from design and supply through installation and long-term maintenance.": "Ceritakan proyek Anda dan tim kami akan merancang solusi proteksi kebakaran yang tepat — dari desain dan pengadaan hingga pemasangan dan pemeliharaan jangka panjang.",
    "Tell us about your site and requirements — a new installation, an upgrade, or ongoing maintenance and testing — and our engineers will design the right fire-protection solution for your project. From the first risk assessment through supply, installation, commissioning and long-term support, you'll have one dependable partner backed by the Hanindo Group.": "Ceritakan lokasi dan kebutuhan Anda — instalasi baru, peningkatan, atau pemeliharaan dan pengujian rutin — dan para insinyur kami akan merancang solusi proteksi kebakaran yang tepat untuk proyek Anda. Mulai dari penilaian risiko awal hingga pengadaan, pemasangan, commissioning, dan dukungan jangka panjang, Anda memiliki satu mitra tepercaya yang didukung oleh Hanindo Group.",
    "Free consultation & on-site survey": "Konsultasi gratis & survei lokasi",
    "Designs compliant with NFPA, SNI & ISO standards": "Desain sesuai standar NFPA, SNI & ISO",
    "Fast, professional response from our team": "Respons cepat dan profesional dari tim kami",
    "Email our team": "Email tim kami",
    "Head Office": "Kantor Pusat",
    "Phone": "Telepon",
    "Business Hours": "Jam Operasional",
    "Monday – Friday, 08:00 – 17:00 WIB": "Senin – Jumat, 08.00 – 17.00 WIB",

    /* ---- contact page hero ---- */
    "Let's talk about": "Mari bicarakan",
    "your project.": "proyek Anda.",
    "Planning a new installation, upgrading an existing system, or need maintenance and testing? Our engineers are ready to help you protect what matters — reach us using the details below.": "Merencanakan instalasi baru, meningkatkan sistem yang ada, atau membutuhkan pemeliharaan dan pengujian? Para insinyur kami siap membantu Anda melindungi hal yang penting — hubungi kami melalui detail di bawah ini.",

    /* ---- footer ---- */
    "Explore": "Jelajahi",
    "Fire Fighting Department": "Departemen Pemadam Kebakaran",
    "A specialist division of the Hanindo Group, delivering end-to-end fire protection — from design and engineering through supply, installation, testing and long-term maintenance.": "Divisi spesialis dari Hanindo Group, menghadirkan proteksi kebakaran menyeluruh — dari desain dan rekayasa hingga pengadaan, pemasangan, pengujian, dan pemeliharaan jangka panjang.",
    "© 2026 Hanindo Group. All Rights Reserved.": "© 2026 Hanindo Group. Hak Cipta Dilindungi.",

    /* ---- about page ---- */
    "Specialising in advanced fire-fighting systems — end-to-end solutions designed to protect lives and property.": "Berspesialisasi dalam sistem pemadam kebakaran mutakhir — solusi menyeluruh yang dirancang untuk melindungi jiwa dan properti.",
    "Company overview": "Sekilas Perusahaan",
    "Excellence and safety,": "Keunggulan dan keselamatan,",
    "by design": "sejak dari desain",
    "Hanindo Citra delivers engineered fire protection systems that safeguard people, protect assets, and keep businesses operating with confidence.": "Hanindo Citra menghadirkan sistem proteksi kebakaran hasil rekayasa yang melindungi jiwa, menjaga aset, dan menjaga kelangsungan operasional bisnis dengan penuh percaya diri.",
    "From design and engineering to installation, testing, commissioning, and maintenance, we provide end-to-end solutions tailored to commercial, industrial, and critical infrastructure projects.": "Dari desain dan rekayasa hingga pemasangan, pengujian, commissioning, dan pemeliharaan, kami menyediakan solusi menyeluruh yang disesuaikan untuk proyek komersial, industri, dan infrastruktur vital.",
    "Built on technical expertise and a commitment to quality, every system is designed to meet rigorous standards and perform reliably long after handover.": "Dibangun atas keahlian teknis dan komitmen terhadap kualitas, setiap sistem dirancang untuk memenuhi standar yang ketat dan bekerja andal jauh setelah serah terima.",
    "Fire pump & piping installation": "Instalasi pompa & perpipaan kebakaran",
    "Site delivery, West Sumatera": "Pengerjaan lokasi, Sumatera Barat",
    "Our direction": "Arah Kami",
    "Vision & Mission": "Visi & Misi",
    "Vision": "Visi",
    "To be the fire-protection partner our clients trust without question — delivering reliable systems, professional service, and lasting peace of mind.": "Menjadi mitra proteksi kebakaran yang dipercaya klien tanpa ragu — menghadirkan sistem yang andal, layanan profesional, dan ketenangan yang berkelanjutan.",
    "Mission": "Misi",
    "Deliver efficient, optimal and targeted services while upholding professional standards and work commitment.": "Memberikan layanan yang efisien, optimal, dan tepat sasaran sambil menjunjung standar profesional dan komitmen kerja.",
    "Continuously invest in innovation and the development of our people to raise capability.": "Terus berinvestasi dalam inovasi dan pengembangan sumber daya manusia untuk meningkatkan kapabilitas.",
    "Implement management systems and technologies that improve efficiency, quality, and occupational health & safety.": "Menerapkan sistem manajemen dan teknologi yang meningkatkan efisiensi, kualitas, serta keselamatan dan kesehatan kerja.",
    "Credentials": "Kredensial",
    "Certifications & Licenses": "Sertifikasi & Lisensi",
    "Certified to international management-system standards for the engineering, procurement, construction and supply of mechanical, electrical, instrumentation and related civil works.": "Tersertifikasi standar sistem manajemen internasional untuk rekayasa, pengadaan, konstruksi, dan penyediaan pekerjaan mekanikal, elektrikal, instrumentasi, serta pekerjaan sipil terkait.",
    "Quality Management": "Manajemen Mutu",
    "Environmental Management": "Manajemen Lingkungan",
    "Occupational Health & Safety": "Keselamatan & Kesehatan Kerja",
    "Issued by URS · Accredited by UKAS & IAF · Valid to November 2027 — click any certificate to view the full document.": "Diterbitkan oleh URS · Terakreditasi UKAS & IAF · Berlaku hingga November 2027 — klik sertifikat untuk melihat dokumen lengkap.",
    "International Membership": "Keanggotaan Internasional",
    "Membership of the National Fire Protection Association (NFPA) — the global authority behind the world's leading fire-safety standards.": "Keanggotaan National Fire Protection Association (NFPA) — otoritas global di balik standar keselamatan kebakaran terkemuka dunia.",
    "Coming soon": "Segera hadir",
    "National Certification": "Sertifikasi Nasional",
    "Personnel certified in fire-safety competency (Ahli K3 Penanggulangan Kebakaran) under the Ministry of Manpower of the Republic of Indonesia.": "Personel bersertifikat kompetensi keselamatan kebakaran (Ahli K3 Penanggulangan Kebakaran) di bawah Kementerian Ketenagakerjaan Republik Indonesia.",
    "Why choose us": "Mengapa Memilih Kami",
    "Why clients trust Hanindo Citra": "Mengapa klien mempercayai Hanindo Citra",
    "Trusted": "Terpercaya",
    "Trusted by leading organisations across government, oil & gas, and industry — including the Ministry of Transportation, PT Pertamina (Persero), AKR Fuel Storage, LPG Petroleum Storage, PT. GLB Indonesia, and the OP-1 Operational Building.": "Dipercaya oleh organisasi terkemuka di sektor pemerintah, migas, dan industri — termasuk Kementerian Perhubungan, PT Pertamina (Persero), AKR Fuel Storage, LPG Petroleum Storage, PT. GLB Indonesia, dan OP-1 Operational Building.",
    "Best Quality": "Kualitas Terbaik",
    "We deliver internationally branded fire-protection products engineered to the highest NFPA, SNI, and ISO standards — reliable on day one, and every day after.": "Kami menghadirkan produk proteksi kebakaran bermerek internasional yang direkayasa sesuai standar NFPA, SNI, dan ISO tertinggi — andal sejak hari pertama, dan setiap hari sesudahnya.",
    "Excellent Service": "Pelayanan Prima",
    "Fast response, free consultation, on-site surveys, and committed after-sales support — fully dedicated to our clients' satisfaction.": "Respons cepat, konsultasi gratis, survei lokasi, serta dukungan purnajual yang berkomitmen — sepenuhnya berdedikasi untuk kepuasan klien kami.",

    /* ---- products & services page ---- */
    "Every discipline,": "Setiap disiplin,",
    "one partner.": "satu mitra.",
    "Complete fire protection and building services — operational on day one, and every day after.": "Layanan proteksi kebakaran dan bangunan yang lengkap — beroperasi sejak hari pertama, dan setiap hari sesudahnya.",
    "What we do": "Yang kami lakukan",
    "Comprehensive services": "Layanan menyeluruh",
    "General Contractor": "Kontraktor Umum",
    "Project delivery and site management.": "Pelaksanaan proyek dan manajemen lokasi.",
    "General Supplier": "Pemasok Umum",
    "Sourcing and supply of quality components.": "Pengadaan dan penyediaan komponen berkualitas.",
    "Fire Fighting Systems": "Sistem Pemadam Kebakaran",
    "Our specialist core — detection and suppression.": "Inti keahlian kami — deteksi dan pemadaman.",
    "Mechanical Services": "Layanan Mekanikal",
    "Mechanical engineering for buildings and industry.": "Rekayasa mekanikal untuk bangunan dan industri.",
    "Electrical Services": "Layanan Elektrikal",
    "Power, control and protection systems.": "Sistem daya, kontrol, dan proteksi.",
    "Maintenance Services": "Layanan Pemeliharaan",
    "Ongoing service contracts and support.": "Kontrak layanan dan dukungan berkelanjutan.",
    "Fire fighting system solutions": "Solusi sistem pemadam kebakaran",
    "A complete, reliable fire-system ecosystem": "Ekosistem sistem kebakaran yang lengkap dan andal",
    "Fire Hydrant Systems": "Sistem Hidran Kebakaran",
    "Pumps, piping & landing valves": "Pompa, perpipaan & landing valve",
    "Sprinkler Systems": "Sistem Sprinkler",
    "Wet, dry & pre-action": "Wet, dry & pre-action",
    "Gas Suppression": "Pemadam Gas",
    "Clean agent for sensitive areas": "Clean agent untuk area sensitif",
    "Foam Suppression": "Pemadam Busa",
    "High-, medium- & low-expansion": "Ekspansi tinggi, sedang & rendah",
    "Fire Detection & Alarm": "Deteksi & Alarm Kebakaran",
    "Addressable & conventional": "Addressable & konvensional",
    "Deluge Systems": "Sistem Deluge",
    "High-hazard tank & process areas": "Area tangki & proses berisiko tinggi",
    "How we deliver": "Cara kami bekerja",
    "Our delivery lifecycle": "Siklus pengerjaan kami",
    "Design & Engineering": "Desain & Rekayasa",
    "Tailored designs based on risk assessment and regulatory requirements.": "Desain yang disesuaikan berdasarkan penilaian risiko dan persyaratan regulasi.",
    "Procure & Supply": "Pengadaan & Pasokan",
    "Sourcing high-quality components from reputable global manufacturers.": "Pengadaan komponen berkualitas tinggi dari produsen global ternama.",
    "Install & Integrate": "Pemasangan & Integrasi",
    "Professional installation of detection, alarm, hydrant and suppression systems.": "Pemasangan profesional sistem deteksi, alarm, hidran, dan pemadam.",
    "Test & Commission": "Pengujian & Commissioning",
    "Thorough validation to ensure optimal performance and reliability.": "Validasi menyeluruh untuk memastikan kinerja dan keandalan optimal.",
    "Maintain & Support": "Pemeliharaan & Dukungan",
    "Ongoing maintenance programs to guarantee system integrity.": "Program pemeliharaan berkelanjutan untuk menjamin integritas sistem.",
    "Industries served": "Industri yang dilayani",
    "Oil & Gas": "Minyak & Gas",
    "Petrochemical": "Petrokimia",
    "Manufacturing": "Manufaktur",
    "Banking & Finance": "Perbankan & Keuangan",
    "Government": "Pemerintahan",
    "Transportation & Rail": "Transportasi & Perkeretaapian",
    "Commercial Buildings": "Gedung Komersial",
    "F&B Production": "Produksi Makanan & Minuman",

    /* ---- projects page ---- */
    "Proven in the field,": "Terbukti di lapangan,",
    "across Indonesia.": "di seluruh Indonesia.",
    "Complex fire-safety installations delivered across oil & gas, government, banking and industrial sectors.": "Instalasi keselamatan kebakaran yang kompleks di sektor migas, pemerintah, perbankan, dan industri.",
    "Projects completed": "Proyek selesai",
    "Service divisions": "Divisi layanan",
    "Companies served": "Perusahaan dilayani",
    "Years of experience": "Tahun pengalaman",
    "Featured Project · Government · Rail Infrastructure": "Proyek Unggulan · Pemerintah · Infrastruktur Perkeretaapian",
    "Directorate General of Railways — West Sumatera, OP-1 Package": "Direktorat Jenderal Perkeretaapian — Sumatera Barat, Paket OP-1",
    "Re-design, supply & installation of the hydrant system at the Operational Building (OP-1 Package).": "Perancangan ulang, pengadaan & pemasangan sistem hidran di Gedung Operasional (Paket OP-1).",
    "More projects": "Proyek lainnya",
    "Track record": "Rekam jejak",
    "Selected projects": "Proyek terpilih",
    "West Sumatera — OP-1 Package": "Sumatera Barat — Paket OP-1",
    "Re-design, supply & installation of hydrant system at the Operational Building.": "Perancangan ulang, pengadaan & pemasangan sistem hidran di Gedung Operasional.",
    "Industrial": "Industri",
    "Indonesia": "Indonesia",
    "Design & build of hydrant system.": "Desain & pembangunan sistem hidran.",
    "Lombok, Indonesia": "Lombok, Indonesia",
    "Alarm, hydrant, sprinkler & deluge systems.": "Sistem alarm, hidran, sprinkler & deluge.",
    "Pontianak, Sei Nipah": "Pontianak, Sei Nipah",
    "Supply & installation of foam system.": "Pengadaan & pemasangan sistem busa.",
    "Rail Infrastructure": "Infrastruktur Perkeretaapian",
    "West Sumatera": "Sumatera Barat",
    "Complete site fire-protection delivery for the Directorate General of Railways.": "Pengerjaan proteksi kebakaran lokasi secara lengkap untuk Direktorat Jenderal Perkeretaapian."
  };

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
        store.push({ node: n, en: raw, id: raw.replace(key, DICT[key]) });
      }
    }
  }

  function setLang(lang) {
    if (!store) collect();
    each(store, function (o) { o.node.nodeValue = (lang === 'id') ? o.id : o.en; });
    var s = document.querySelector('input[name="searchword"]');
    if (s) s.setAttribute('placeholder', lang === 'id' ? 'Cari' : 'Search');
    each(document.querySelectorAll('.langtoggle [data-lang]'), function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem('hc_lang', lang); } catch (e) {}
  }

  function init() {
    collect();
    each(document.querySelectorAll('.langtoggle [data-lang]'), function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
    });
    var saved = 'en';
    try { saved = localStorage.getItem('hc_lang') || 'en'; } catch (e) {}
    setLang(saved);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
