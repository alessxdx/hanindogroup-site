/* =====================================================================
   PT. Hanindo Citra — EN / ID language toggle  (plain JS, no dependencies)
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
    /* ---- directions ---- */
    "Get directions": "Petunjuk arah",
    /* ---- navigation / header ---- */
    "Back to": "Kembali ke",
    "Home": "Beranda",
    "About Us": "Tentang Kami",
    "Products & Services": "Produk & Layanan",
    "Projects": "Proyek",
    "Contact Us": "Hubungi Kami",

    /* ---- home hero ----
       Both home heroes are the company name now — index.html and the
       three carousel slides on hanindo-citra-website.html — so no
       heading key is needed here. PT. Hanindo Citra is a company name and
       stays as it is; the eyebrows, body copy and buttons below are the
       parts that still translate. */
    "We design, supply, install and maintain complete fire-fighting systems — reliable on day one, and every day after.": "Kami merancang, memasok, memasang, dan memelihara sistem pemadam kebakaran yang lengkap — andal sejak hari pertama, dan setiap hari sesudahnya.",
    "Our products & services": "Produk & layanan kami",
    "About PT. Hanindo Citra": "Tentang PT. Hanindo Citra",
    "The fire fighting department of the Hanindo Group — delivering advanced, end-to-end fire-protection systems that safeguard lives and property across Indonesia.": "Departemen pemadam kebakaran Hanindo Group — menghadirkan sistem proteksi kebakaran mutakhir dan menyeluruh yang melindungi jiwa dan properti di seluruh Indonesia.",
    "About us": "Tentang kami",
    "Proven track record": "Rekam jejak terbukti",
    "Complex fire-safety installations delivered throughout Indonesia — from petroleum storage terminals to government rail infrastructure.": "Instalasi keselamatan kebakaran yang kompleks di seluruh Indonesia — dari terminal penyimpanan minyak hingga infrastruktur perkeretaapian pemerintah.",
    "Talk to us": "Hubungi kami",
    "Scroll": "Gulir",

    /* ---- home hero + intro split (new layout) ---- */
    "PT. Hanindo Citra designs, supplies, installs and maintains complete fire-fighting systems — reliable on day one, and every day after.": "PT. Hanindo Citra merancang, memasok, memasang, dan memelihara sistem pemadam kebakaran yang lengkap — andal sejak hari pertama, dan setiap hari sesudahnya.",
    "Fire safety, under one roof.": "Keselamatan kebakaran, dalam satu atap.",
    "Hanindo Group's fire protection division provides engineered fire protection solutions designed to safeguard lives, assets and critical infrastructure across Indonesia.": "Divisi proteksi kebakaran Hanindo Group menghadirkan solusi proteksi kebakaran terekayasa yang dirancang untuk melindungi jiwa, aset, dan infrastruktur penting di seluruh Indonesia.",
    "Complete project lifecycle support — from design and supply to installation, testing, commissioning and long-term maintenance": "Dukungan penuh sepanjang siklus proyek — dari perancangan dan pemasokan hingga pemasangan, pengujian, commissioning, dan pemeliharaan jangka panjang",
    "Six core fire protection systems covering hydrant, sprinkler, gas suppression, foam, deluge and fire alarm solutions": "Enam sistem proteksi kebakaran utama meliputi hidran, sprinkler, pemadam gas, busa, deluge, dan solusi alarm kebakaran",
    "Trusted across oil & gas, government facilities and industrial sectors throughout Indonesia": "Dipercaya di sektor migas, fasilitas pemerintah, dan sektor industri di seluruh Indonesia",

    /* ---- home statement + stats ---- */
    "PT. Hanindo Citra is the fire protection division of Hanindo Group—transforming": "PT. Hanindo Citra adalah divisi proteksi kebakaran Hanindo Group—mengubah",
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
    "Partner with PT. Hanindo Citra": "Bermitra dengan PT. Hanindo Citra",
    "Safety is not a service —": "Keselamatan bukan sekadar layanan —",
    "it is our standard.": "itu adalah standar kami.",
    "Tell us about your project and our team will design the right fire-protection solution — from design and supply through installation and long-term maintenance.": "Ceritakan proyek Anda dan tim kami akan merancang solusi proteksi kebakaran yang tepat — dari desain dan pengadaan hingga pemasangan dan pemeliharaan jangka panjang.",
    "Tell us about your site and requirements — a new installation, an upgrade, or ongoing maintenance and testing — and our engineers will design the right fire-protection solution for your project. From the first risk assessment through supply, installation, commissioning and long-term support, you'll have one dependable partner backed by the Hanindo Group.": "Ceritakan lokasi dan kebutuhan Anda — instalasi baru, peningkatan, atau pemeliharaan dan pengujian rutin — dan para insinyur kami akan merancang solusi proteksi kebakaran yang tepat untuk proyek Anda. Mulai dari penilaian risiko awal hingga pengadaan, pemasangan, commissioning, dan dukungan jangka panjang, Anda memiliki satu mitra tepercaya yang didukung oleh Hanindo Group.",
    "Free consultation & on-site survey": "Konsultasi gratis & survei lokasi",
    "Designs compliant with NFPA, SNI & ISO standards": "Desain sesuai standar NFPA, SNI & ISO",
    "Fast, professional response from our team": "Respons cepat dan profesional dari tim kami",
    "Email our team": "Email tim kami",
    /* Sits beside "Email our team" in the closing band on four pages. It had
       no entry, so the toggle translated one button and left the other in
       English. Same wording the Citra dictionary uses. */
    "Contact page": "Halaman kontak",
    "Head Office": "Kantor Pusat",
    "Telephone (Head Office)": "Telepon (Kantor Pusat)",
    "Fire Fighting Dept Office": "Kantor Departemen Pemadam Kebakaran",
    "Phone": "Telepon",
    /* The contact checklist labels its hours "Office hours" and prints the
       days after a colon, in its own text node. Both entries are the
       Citra dictionary's word for word: this department is part of that
       company, and the two pages should read the same in Indonesian.
       "Business Hours" and its 08:00 line, just below, are the labels the
       page carried before that checklist was rewritten. No page uses them
       now; they are left in place in case the one-page variant, which
       still runs its own contact block, goes back to them. */
    "Office hours": "Jam operasional",
    ": Monday to Friday, 08.00 – 17.00 WIB": ": Senin – Jumat, 08.00 – 17.00 WIB",
    "Business Hours": "Jam Operasional",
    "Monday – Friday, 08:00 – 17:00 WIB": "Senin – Jumat, 08.00 – 17.00 WIB",

    /* ---- contact page hero ----
       "Contact" and "Us" are separate keys because the hero splits them
       across the colour change, the same as About Us. "Let's talk about"
       is the multi-page contact.html hero, which keeps that wording. */
    "Contact": "Hubungi",
    "Let's talk about": "Mari bicarakan",
    "your project.": "proyek Anda.",
    "Planning, upgrading, or maintaining a fire system? Our team is ready to help.": "Merencanakan, meningkatkan, atau merawat sistem proteksi kebakaran? Tim kami siap membantu.",
    /* The long original stays for hanindo-citra-website.html, which still
       carries it and shares this dictionary. Delete with that page. */
    "Planning a new installation, upgrading an existing system, or need maintenance and testing? Our engineers are ready to help you protect what matters — reach us using the details below.": "Merencanakan instalasi baru, meningkatkan sistem yang ada, atau membutuhkan pemeliharaan dan pengujian? Para insinyur kami siap membantu Anda melindungi hal yang penting — hubungi kami melalui detail di bawah ini.",

    /* ---- contact page: other companies band ---- */
    "Elsewhere in the group": "Di lingkungan grup",
    "How to reach us.": "Cara menghubungi kami.",
    "Looking for another company?": "Mencari perusahaan lain?",
    /* The closing call-to-action, repeated on four pages. The heading splits
       across a <br/>, so each line is its own text node and needs its own
       entry — same as the "About"/"Us" pair below. */
    "Talk to PT. Hanindo Citra": "Hubungi PT. Hanindo Citra",
    "Protecting a new site,": "Melindungi lokasi baru,",
    "or upgrading an existing one?": "atau meningkatkan yang sudah ada?",
    "What we supply": "Yang kami sediakan",
    "Why clients trust PT. Hanindo Citra": "Mengapa klien mempercayai PT. Hanindo Citra",
    "All four companies share the Fatmawati head office. If your enquiry sits with one of the others, go straight to them.": "Keempat perusahaan berbagi kantor pusat Fatmawati. Jika pertanyaan Anda terkait salah satu perusahaan lainnya, silakan hubungi langsung.",

    /* ---- footer ---- */
    "Explore": "Jelajahi",
    /* The footer column heading, on every page of this site. Wording follows
       the group and company footers so the whole site reads the same. */
    "Our Companies": "Perusahaan Kami",
    "Fire Fighting Department": "Departemen Pemadam Kebakaran",
    "A specialist division of the Hanindo Group, delivering end-to-end fire protection — from design and engineering through supply, installation, testing and long-term maintenance.": "Divisi spesialis dari Hanindo Group, menghadirkan proteksi kebakaran menyeluruh — dari desain dan rekayasa hingga pengadaan, pemasangan, pengujian, dan pemeliharaan jangka panjang.",
    /* The group tagline in the footer, on all six pages of this site. It is
       listed in the seven other dictionaries and was missing from this one
       alone, so the footer stayed half English here while every other company
       site turned over. Wording copied from those, not retranslated. */
    "Hanindo Group has served businesses across Indonesia since 1987, providing technology, equipment and engineering solutions across specialised industries. Our companies cover oil & gas, automation, automotive, fire protection, printing and POS, combining international brands with local expertise and technical support.": "Hanindo Group telah melayani berbagai bisnis di seluruh Indonesia sejak 1987, menyediakan solusi teknologi, peralatan, dan rekayasa di berbagai industri khusus. Perusahaan kami mencakup minyak & gas, otomasi, otomotif, proteksi kebakaran, percetakan, dan POS, memadukan merek internasional dengan keahlian lokal dan dukungan teknis.",
    "© 2026 Hanindo Group. All Rights Reserved.": "© 2026 Hanindo Group. Hak Cipta Dilindungi.",

    /* ---- about page ----
       "About" and "Us" are separate keys because the hero splits them
       across a <span> for the two-tone treatment, the same as the
       Automation and Shanghai About pages. */
    "About": "Tentang",
    "Us": "Kami",
    "Specialising in advanced fire-fighting systems — end-to-end solutions designed to protect lives and property.": "Berspesialisasi dalam sistem pemadam kebakaran mutakhir — solusi menyeluruh yang dirancang untuk melindungi jiwa dan properti.",
    "Company overview": "Sekilas Perusahaan",
    "Excellence and safety,": "Keunggulan dan keselamatan,",
    "by design": "sejak dari desain",
    "PT. Hanindo Citra delivers engineered fire protection systems that safeguard people, protect assets, and keep businesses operating with confidence.": "PT. Hanindo Citra menghadirkan sistem proteksi kebakaran hasil rekayasa yang melindungi jiwa, menjaga aset, dan menjaga kelangsungan operasional bisnis dengan penuh percaya diri.",
    "From design and engineering to installation, testing, commissioning, and maintenance, we provide end-to-end solutions tailored to commercial, industrial, and critical infrastructure projects.": "Dari desain dan rekayasa hingga pemasangan, pengujian, commissioning, dan pemeliharaan, kami menyediakan solusi menyeluruh yang disesuaikan untuk proyek komersial, industri, dan infrastruktur vital.",
    "Built on technical expertise and a commitment to quality, every system is designed to meet rigorous standards and perform reliably long after handover.": "Dibangun atas keahlian teknis dan komitmen terhadap kualitas, setiap sistem dirancang untuk memenuhi standar yang ketat dan bekerja andal jauh setelah serah terima.",
    "Fire pump & piping installation": "Instalasi pompa & perpipaan kebakaran",
    "Site delivery, West Sumatera": "Pengerjaan lokasi, Sumatera Barat",
    "Our direction": "Arah Kami",
    "Vision & Mission": "Visi & Misi",
    "Vision": "Visi",
    "To be the fire protection partner our clients trust — delivering reliable systems, professional expertise and lasting peace of mind.": "Menjadi mitra proteksi kebakaran yang dipercaya klien — menghadirkan sistem yang andal, keahlian profesional, dan ketenangan yang berkelanjutan.",
    "Mission": "Misi",
    "Provide end-to-end fire protection solutions with quality, efficiency and technical excellence.": "Menyediakan solusi proteksi kebakaran menyeluruh dengan kualitas, efisiensi, dan keunggulan teknis.",
    "Invest continuously in innovation and in our people.": "Terus berinvestasi dalam inovasi dan sumber daya manusia.",
    "Leverage advanced technology and proven systems to enhance efficiency, quality and safety.": "Memanfaatkan teknologi mutakhir dan sistem teruji untuk meningkatkan efisiensi, kualitas, dan keselamatan.",
    "Credentials": "Kredensial",
    "Certifications & Licenses": "Sertifikasi & Lisensi",
    "Certified to international management-system standards for the engineering, procurement, construction and supply of mechanical, electrical, instrumentation and related civil works.": "Tersertifikasi standar sistem manajemen internasional untuk rekayasa, pengadaan, konstruksi, dan penyediaan pekerjaan mekanikal, elektrikal, instrumentasi, serta pekerjaan sipil terkait.",
    "Quality Management": "Manajemen Mutu",
    "Environmental Management": "Manajemen Lingkungan",
    "Occupational Health & Safety": "Keselamatan & Kesehatan Kerja",
    "Issued by URS · Accredited by UKAS & IAF · Valid to November 2027 — click any certificate to view the full document.": "Diterbitkan oleh URS · Terakreditasi UKAS & IAF · Berlaku hingga November 2027 — klik sertifikat untuk melihat dokumen lengkap.",
    "International Membership": "Keanggotaan Internasional",
    "Membership with the NFPA. We design, engineer and commission fire safety systems at any scale — meeting the highest international codes and regulatory standards.": "Keanggotaan NFPA. Kami merancang, merekayasa, dan mengomisioning sistem keselamatan kebakaran pada skala apa pun — memenuhi kode dan standar regulasi internasional tertinggi.",
    "Coming soon": "Segera hadir",
    "National Certification": "Sertifikasi Nasional",
    "Fire Protection Junior Technical Assessor": "Pengkaji Muda Teknis Proteksi Kebakaran",
    "Personnel certified as technical assessor in fire protection competency under the Indonesian National Work Competency Standards (SKKNI).": "Personel bersertifikat sebagai pengkaji teknis kompetensi proteksi kebakaran berdasarkan Standar Kompetensi Kerja Nasional Indonesia (SKKNI).",
    "View certificate": "Lihat sertifikat",
    "Why choose us": "Mengapa Memilih Kami",
    "Why clients trust us": "Mengapa klien mempercayai kami",
    "See our projects": "Lihat proyek kami",
    "Our products": "Produk kami",
    "Talk to us": "Hubungi kami",
    "Proven Experience": "Pengalaman Teruji",
    "Supporting critical projects across government, oil & gas and industrial sectors, including Pertamina and the Ministry of Transportation.": "Mendukung proyek-proyek penting di sektor pemerintah, migas, dan industri, termasuk Pertamina dan Kementerian Perhubungan.",
    "Global Standards": "Standar Global",
    "Internationally recognised products designed to comply with NFPA, SNI and ISO standards.": "Produk yang diakui secara internasional dan dirancang untuk memenuhi standar NFPA, SNI, dan ISO.",
    "Lifecycle Support": "Dukungan Sepanjang Siklus",
    "From consultation and site surveys to after-sales maintenance, we provide continuous support throughout the system lifecycle.": "Dari konsultasi dan survei lokasi hingga perawatan purnajual, kami memberikan dukungan berkelanjutan sepanjang siklus hidup sistem.",
    /* Trusted / Best Quality / Excellent Service are no longer on About —
       these three headings survive only on hanindo-citra-website.html, which
       shares this dictionary. Delete them when that page goes. Its three
       paragraphs are worded differently and carry their own entries. */
    "Trusted": "Terpercaya",
    "Best Quality": "Kualitas Terbaik",
    "Excellent Service": "Pelayanan Prima",

    /* ---- products & services page ---- */
    "Products &": "Produk &",
    "Services": "Layanan",
    "Complete fire protection and building services — operational on day one, and every day after.": "Layanan proteksi kebakaran dan bangunan yang lengkap — beroperasi sejak hari pertama, dan setiap hari sesudahnya.",
    "What we do": "Yang kami lakukan",
    "Comprehensive services": "Layanan menyeluruh",
    /* The lede under that heading, on both pages. It had no entry at all and
       stayed English through the whole toggle -- the longest untranslated run
       of copy left on this site, sitting directly under a heading that did
       translate. Found while taking an em dash out of it: it read "...in fire
       safety — leveraging the strength and global network..." until
       2026-08-17, the same trailing-clause dash as a dozen others, and it
       survived that sweep because the search looked for connectives and this
       one leads with a gerund.
       MEP stays MEP, and Plumbing keeps its English spelling: both are the
       forms used on Indonesian tender documents. */
    "PT. Hanindo Citra is a complete solutions partner for fire protection and building services. We deliver end-to-end MEP (Mechanical, Electrical & Plumbing) installations alongside our specialist core in fire safety, drawing on the strength and global network of the Hanindo Group to bring international best practices to every project.": "PT. Hanindo Citra adalah mitra solusi lengkap untuk proteksi kebakaran dan layanan bangunan. Kami mengerjakan instalasi MEP (Mekanikal, Elektrikal & Plumbing) secara menyeluruh bersama inti keahlian kami di bidang keselamatan kebakaran, dengan memanfaatkan kekuatan dan jaringan global Hanindo Group untuk menghadirkan praktik terbaik internasional di setiap proyek.",
    "General Contractor": "Kontraktor Umum",
    "Project delivery and site management.": "Pelaksanaan proyek dan manajemen lokasi.",
    "General Supplier": "Pemasok Umum",
    "Sourcing and supply of quality components.": "Pengadaan dan penyediaan komponen berkualitas.",
    "Fire Fighting Systems": "Sistem Pemadam Kebakaran",
    /* Was "Our specialist core — detection and suppression." until 2026-08-17.
       The preface came off with the card layout: singling out one of six
       services as the core read oddly in a numbered list where all six sit
       level, and the page says it plainly enough elsewhere. */
    "Detection and suppression.": "Deteksi dan pemadaman.",
    "Mechanical Services": "Layanan Mekanikal",
    /* Two wordings on purpose, one per page: the one-page variant says
       "Mechanical engineering", products-services.html just "Engineering".
       The shorter one had no entry at all and sat in English through the
       whole toggle until this was noticed. */
    "Mechanical engineering for buildings and industry.": "Rekayasa mekanikal untuk bangunan dan industri.",
    "Engineering for buildings and industry.": "Rekayasa untuk bangunan dan industri.",
    "Electrical Services": "Layanan Elektrikal",
    "Power, control and protection systems.": "Sistem daya, kontrol, dan proteksi.",
    "Maintenance Services": "Layanan Pemeliharaan",
    "Ongoing service contracts and support.": "Kontrak layanan dan dukungan berkelanjutan.",
    "Fire fighting system solutions": "Solusi sistem pemadam kebakaran",
    "A complete, reliable fire-system ecosystem": "Ekosistem sistem kebakaran yang lengkap dan andal",
    "Fire Hydrant Systems": "Sistem Hidran Kebakaran",
    "Indoor & Outdoor": "Dalam & Luar Ruangan",
    "Sprinkler Systems": "Sistem Sprinkler",
    "Wet, Dry & Pre-action": "Wet, Dry & Pre-action",
    "Gas Suppression": "Pemadam Gas",
    "Gas materials (Clean agent, Inert gas, CO₂) for sensitive areas": "Material gas (clean agent, gas inert, CO₂) untuk area sensitif",
    "Foam Suppression": "Pemadam Busa",
    "High-, Medium-, & Low-Expansion": "Ekspansi Tinggi, Sedang, & Rendah",
    "Fire Detection & Alarm": "Deteksi & Alarm Kebakaran",
    "Addressable, Conventional, & Semi-Addressable": "Addressable, Konvensional, & Semi-Addressable",
    "Deluge Systems": "Sistem Deluge",
    "Integrated high-hazard & Process area protection": "Proteksi terpadu area berisiko tinggi & proses",
    "How we deliver": "Cara kami bekerja",
    "Our delivery lifecycle": "Siklus pengerjaan kami",
    /* Two wordings per stage, and both are needed. hanindo-citra-website.html
       runs the long form; products-services.html was tightened to fit the
       narrower timeline on that page and only the long keys were listed, so
       four of its five stages sat in English. Found by audit on 2026-08-17,
       not by anyone noticing. If a stage is reworded again, check BOTH pages
       before assuming one entry covers it. */
    "Design & Engineering": "Desain & Rekayasa",
    "Tailored designs based on risk assessment and regulatory requirements.": "Desain yang disesuaikan berdasarkan penilaian risiko dan persyaratan regulasi.",
    "Tailored designs from risk assessment and regulations.": "Desain yang disesuaikan berdasarkan penilaian risiko dan regulasi.",
    "Procure & Supply": "Pengadaan & Pasokan",
    "Sourcing high-quality components from reputable global manufacturers.": "Pengadaan komponen berkualitas tinggi dari produsen global ternama.",
    "Quality components from reputable global manufacturers.": "Komponen berkualitas dari produsen global ternama.",
    "Install & Integrate": "Pemasangan & Integrasi",
    "Professional installation of detection, alarm, hydrant and suppression systems.": "Pemasangan profesional sistem deteksi, alarm, hidran, dan pemadam.",
    "Professional installation of detection, alarm and suppression.": "Pemasangan profesional sistem deteksi, alarm, dan pemadam.",
    "Test & Commission": "Pengujian & Commissioning",
    "Thorough validation to ensure optimal performance and reliability.": "Validasi menyeluruh untuk memastikan kinerja dan keandalan optimal.",
    "Maintain & Support": "Pemeliharaan & Dukungan",
    "Ongoing maintenance programs to guarantee system integrity.": "Program pemeliharaan berkelanjutan untuk menjamin integritas sistem.",
    "Ongoing maintenance to guarantee system integrity.": "Pemeliharaan berkelanjutan untuk menjamin integritas sistem.",
    "Industries served": "Industri yang dilayani",
    "Oil & Gas": "Minyak & Gas",
    "Petrochemical": "Petrokimia",
    "Manufacturing": "Manufaktur",
    "Banking & Finance": "Perbankan & Keuangan",
    "Government": "Pemerintahan",
    "Transportation & Rail": "Transportasi & Perkeretaapian",
    "Commercial Buildings": "Gedung Komersial",
    "F&B Production": "Produksi Makanan & Minuman",

    /* ---- projects page ----
       Indonesian puts the adjective after the noun, so the two halves of
       the heading swap sense: "Featured" carries Proyek and the coloured
       half carries Unggulan. The coloured half is tagged
       data-t="Projects (hero)" because a bare "Projects" is also the nav
       and breadcrumb label, which has to stay Proyek on its own. */
    "Featured": "Proyek",
    "Projects (hero)": "Unggulan",
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
    "Featured projects": "Proyek unggulan",
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
    "Complete site fire-protection delivery for the Directorate General of Railways.": "Pengerjaan proteksi kebakaran lokasi secara lengkap untuk Direktorat Jenderal Perkeretaapian.",
    "Power": "Kelistrikan",
    "PT. Hanindo Citra designed and built a complete hydrant system for PLN UID Lampung. The project covered the supply, installation, testing, and commissioning of the fire protection system, ensuring compliance with project specifications and applicable fire-safety standards.": "PT. Hanindo Citra merancang dan membangun sistem hidran lengkap untuk PLN UID Lampung. Proyek ini mencakup pengadaan, pemasangan, pengujian, dan komisioning sistem proteksi kebakaran, dengan memastikan kesesuaian terhadap spesifikasi proyek dan standar keselamatan kebakaran yang berlaku.",

    /* ---- project detail modals ---- */
    "Project Overview": "Ikhtisar Proyek",
    "Project Gallery": "Galeri Proyek",
    "Show all photos": "Tampilkan semua foto",
    "Show fewer photos": "Tampilkan lebih sedikit foto",
    "Project Details": "Detail Proyek",
    "Client": "Klien",
    "Project Duration": "Durasi Proyek",
    "Completed": "Selesai",
    "Key Equipment": "Peralatan Utama",
    "Component": "Komponen",
    "Brand": "Merek",
    "View details": "Lihat detail",

    /* ---- found by audit, 2026-08-17 ----
       Everything below was visible copy with no entry, so it stayed English
       while the heading above it translated. It was not found by reading the
       pages -- it was found by walking every text node on all six and
       checking each against this file. Worth repeating after any batch of
       copy edits; the gaps are invisible unless you flip the toggle. */

    /* about page: the second half of the SKKNI credential line, which sits in
       its own node after the certificate name and so needs its own entry. */
    "— personnel certified as technical assessor in fire protection competency under the Indonesian National Work Competency Standards (SKKNI).": "— personel bersertifikat sebagai asesor teknis kompetensi proteksi kebakaran berdasarkan Standar Kompetensi Kerja Nasional Indonesia (SKKNI).",

    /* products & services, and the one-page variant */
    "Our service portfolio is built around a single goal — a system that remains operational on day one and every day after.": "Portofolio layanan kami dibangun di sekitar satu tujuan — sistem yang tetap beroperasi sejak hari pertama dan setiap hari sesudahnya.",

    /* contact page: the line under "How to reach us." The other company
       dictionaries carry the same sentence shaped to their own business. */
    "For fire-protection design, supply, installation, testing or maintenance, our Jakarta team is the first point of contact.": "Untuk desain, pengadaan, pemasangan, pengujian, atau pemeliharaan proteksi kebakaran, tim Jakarta kami adalah titik kontak pertama.",

    /* projects page: the two case write-ups. Client and facility names stay as
       they are; Ministry of Transportation follows the About page's
       "Kementerian Perhubungan". */
    "PT. Hanindo Citra designed and built a complete hydrant system for PT. GLB Indonesia. The project covered the supply, installation, testing, and commissioning of the fire protection system, ensuring compliance with project specifications and applicable fire-safety standards.": "PT. Hanindo Citra merancang dan membangun sistem hidran lengkap untuk PT. GLB Indonesia. Proyek ini mencakup pengadaan, pemasangan, pengujian, dan commissioning sistem proteksi kebakaran, serta memastikan kesesuaian dengan spesifikasi proyek dan standar keselamatan kebakaran yang berlaku.",
    "PT. Hanindo Citra delivered a complete hydrant system for the Ministry of Transportation facility in Padang. The project covered the supply, installation, testing, and commissioning of the fire protection system, ensuring compliance with project specifications and applicable fire-safety standards.": "PT. Hanindo Citra menghadirkan sistem hidran lengkap untuk fasilitas Kementerian Perhubungan di Padang. Proyek ini mencakup pengadaan, pemasangan, pengujian, dan commissioning sistem proteksi kebakaran, serta memastikan kesesuaian dengan spesifikasi proyek dan standar keselamatan kebakaran yang berlaku.",

    /* one-page variant: vision, the four mission points, and the three
       credential panels. Nine paragraphs, the largest single block of
       untranslated copy that was left on the site. */
    "To be the fire-protection partner our clients trust without question — delivering reliable systems, professional service, and lasting peace of mind.": "Menjadi mitra proteksi kebakaran yang dipercaya klien tanpa keraguan — menghadirkan sistem yang andal, layanan profesional, dan ketenangan yang bertahan lama.",
    "Deliver efficient, optimal and targeted services while upholding professional standards and work commitment.": "Memberikan layanan yang efisien, optimal, dan tepat sasaran dengan tetap menjunjung standar profesional dan komitmen kerja.",
    "Continuously invest in innovation and the development of our people to raise capability.": "Terus berinvestasi dalam inovasi dan pengembangan sumber daya manusia untuk meningkatkan kapabilitas.",
    "Implement management systems and technologies that improve efficiency, quality, and occupational health & safety.": "Menerapkan sistem manajemen dan teknologi yang meningkatkan efisiensi, kualitas, serta keselamatan dan kesehatan kerja.",
    "Trusted by leading organisations across government, oil & gas, and industry — including the Ministry of Transportation, PT Pertamina (Persero), AKR Fuel Storage, LPG Petroleum Storage, PT. GLB Indonesia, and the OP-1 Operational Building.": "Dipercaya oleh organisasi terkemuka di sektor pemerintah, minyak & gas, dan industri — termasuk Kementerian Perhubungan, PT Pertamina (Persero), AKR Fuel Storage, LPG Petroleum Storage, PT. GLB Indonesia, dan Gedung Operasional OP-1.",
    "We deliver internationally branded fire-protection products engineered to the highest NFPA, SNI, and ISO standards — reliable on day one, and every day after.": "Kami menghadirkan produk proteksi kebakaran bermerek internasional yang direkayasa sesuai standar NFPA, SNI, dan ISO tertinggi — andal sejak hari pertama, dan setiap hari sesudahnya.",
    "Fast response, free consultation, on-site surveys, and committed after-sales support — fully dedicated to our clients' satisfaction.": "Respons cepat, konsultasi gratis, survei lokasi, dan dukungan purnajual yang berkomitmen — sepenuhnya demi kepuasan klien kami.",
    "Membership of the National Fire Protection Association (NFPA) — the global authority behind the world's leading fire-safety standards.": "Keanggotaan National Fire Protection Association (NFPA) — otoritas global di balik standar keselamatan kebakaran terkemuka di dunia.",
    "Personnel certified in fire-safety competency (Ahli K3 Penanggulangan Kebakaran) under the Ministry of Manpower of the Republic of Indonesia.": "Personel bersertifikat kompetensi keselamatan kebakaran (Ahli K3 Penanggulangan Kebakaran) di bawah Kementerian Ketenagakerjaan Republik Indonesia."
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
      /* data-t lets an element name its own dictionary entry. Needed when
         the same English word wants two different Indonesian ones on the
         same page — see "Projects (hero)". Everything else matches on the
         visible text, which is still the normal way to add a phrase. */
      var p = n.parentNode, forced = p && p.getAttribute && p.getAttribute('data-t');
      if (forced) key = forced;
      if (key && Object.prototype.hasOwnProperty.call(DICT, key)) {
        store.push({ node: n, en: raw, id: raw.replace(raw.trim(), DICT[key]) });
      }
    }
  }

  function setLang(lang) {
    if (!store) collect();
    each(store, function (o) { o.node.nodeValue = (lang === 'id') ? o.id : o.en; });
    var s = document.querySelector('.searchbox input[name="q"]');
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
