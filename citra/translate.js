/* =====================================================================
   PT. Hanindo Citra — EN / Bahasa Indonesia toggle
   ---------------------------------------------------------------------
   Same mechanism as the other company sites: on load it walks the
   visible text and, where a phrase matches an entry below, swaps
   English <-> Bahasa Indonesia. The choice is remembered
   (localStorage) across the pages of this site only.

   Ten pages: the five main ones and the five catalogue pages
   (dispensers, forecourt-controllers, flow-meters, tank-gauging,
   submersible-pumps).

   To EDIT a translation: find the English on the left, change the
   Indonesian on the right. To ADD one: copy a line and fill in both
   sides. The English side must match the page EXACTLY, including
   punctuation — the match is on the whole trimmed text node, not a
   substring.

   Shared wording — the navigation, the footer, the certifications
   block, the contact block — is carried over verbatim from the group,
   Automotive and Fire Fighting dictionaries rather than translated
   afresh, so the same English reads the same way in Indonesian on
   every site. The Fire Fighting dictionary is the closest relative:
   its department is part of this same legal entity.

   DELIBERATELY LEFT IN ENGLISH
   1. Names — the company, the principals (Gilbarco Veeder-Root, Red
      Jacket, Total Control Systems, ITL, Orpak, Gasboy, Invenco, OTI,
      DOMS, ANGI), and every customer on the wall.
   2. Model codes — Encore 700 S, TLS-450PLUS, LS-300 and the rest.
   3. Measurements and units — L/min, bar, VAC, mm, °C. Numbers and SI
      units read the same either way.
   4. Forecourt vocabulary that Indonesian fuel-retail engineers say in
      English: forecourt, dispenser, nozzle, tank gauging, submersible,
      flow meter, custody transfer, wet stock, POS, API, EPC. Rendering
      these into Indonesian would read as less professional, not more —
      the same judgement the Automotive dictionary records for workshop
      vocabulary. SPBU is used for "fuel station" and "gas station",
      because that is what the stations are called here.
   5. The street address, the phone number and the mailbox.
   ===================================================================== */
(function () {
  var DICT = {
    /* ---- navigation / header ---- */
    "Your Solution Provider": "Mitra Solusi Anda",
    "Home": "Beranda",
    "About Us": "Tentang Kami",
    "Products & Services": "Produk & Layanan",
    "Products & services": "Produk & layanan",
    "Fire Fighting": "Pemadam Kebakaran",
    "Fire Fighting Department": "Departemen Pemadam Kebakaran",
    "Contact Us": "Hubungi Kami",
    "Projects": "Proyek",
    "Pumps & Dispensers": "Pompa & Dispenser",
    "Forecourt Controllers": "Forecourt Controller",
    "Fuel Management Systems": "Sistem Manajemen Bahan Bakar",
    "Flow Meters": "Flow Meter",
    "Submersible Turbine Pumps": "Pompa Turbin Submersible",

    /* ---- home ---- */
    "PT. Hanindo Citra provides sales and after-sales service of petroleum equipment and product supply — and builds the fuel stations that run it.": "PT. Hanindo Citra menyediakan penjualan dan layanan purnajual peralatan perminyakan serta pasokan produk — dan membangun SPBU yang menjalankannya.",
    "Everything the forecourt runs on.": "Semua yang menggerakkan forecourt.",
    "Hanindo Citra supplies, installs and services the equipment a fuel station is built around — dispensers, submersible turbine pumps, automatic tank gauging, flow meters, forecourt controllers and fuel management — and builds the stations themselves, from consultation and drawings through to the day the site opens.": "Hanindo Citra memasok, memasang, dan merawat peralatan yang menjadi inti sebuah SPBU — dispenser, pompa turbin submersible, automatic tank gauging, flow meter, forecourt controller, dan manajemen bahan bakar — serta membangun SPBU-nya sendiri, dari konsultasi dan gambar hingga hari lokasi mulai beroperasi.",
    "Sole distributor in Indonesia for Gilbarco Veeder-Root, carried since 1987, and for Total Control Systems and ITL": "Distributor tunggal di Indonesia untuk Gilbarco Veeder-Root, diageni sejak 1987, serta untuk Total Control Systems dan ITL",
    "Construction for the retail petroleum industry — consultation and drawing through building, until the gas station operates": "Konstruksi untuk industri ritel perminyakan — dari konsultasi dan gambar hingga pembangunan, sampai SPBU beroperasi",
    "Sign boards and lighting for gas stations, and after-sales service for everything we install": "Papan nama dan penerangan SPBU, serta layanan purnajual untuk semua yang kami pasang",
    "What we supply": "Yang kami sediakan",
    "Scope of work": "Lingkup pekerjaan",
    "Equipment, automation and EPC —": "Peralatan, otomasi, dan EPC —",
    "for retail and industrial.": "untuk ritel dan industri.",
    "Equipment": "Peralatan",
    "Petroleum and industrial equipment for retail sites and commercial operations, supplied from our principal brands.": "Peralatan perminyakan dan industri untuk lokasi ritel maupun operasi komersial, dipasok dari merek prinsipal kami.",
    "Automation solutions": "Solusi otomasi",
    "Forecourt, station and industrial automation that brings sites under accurate, remote control.": "Otomasi forecourt, SPBU, dan industri yang membawa lokasi ke dalam kendali jarak jauh yang akurat.",
    "Engineering, procurement and construction for retail and industrial petroleum projects.": "Rekayasa, pengadaan, dan konstruksi untuk proyek perminyakan ritel maupun industri.",
    "Industrial plants": "Pabrik industri",
    "Design, construction, assembly and maintenance of industrial plants.": "Perancangan, konstruksi, perakitan, dan pemeliharaan pabrik industri.",
    "Partners & Principals": "Mitra & Prinsipal",
    "Three of these we hold exclusively for Indonesia: Gilbarco Veeder-Root, Total Control Systems and ITL.": "Tiga di antaranya kami pegang secara eksklusif untuk Indonesia: Gilbarco Veeder-Root, Total Control Systems, dan ITL.",

    /* ---- customer wall bands ---- */
    "Customer base": "Basis pelanggan",
    "Retail": "Ritel",
    "Automotive manufacture": "Manufaktur otomotif",
    "Production & plant": "Produksi & pabrik",
    "Mining": "Pertambangan",
    "Engineering & contracting": "Rekayasa & kontraktor",
    "Forestry & agribusiness": "Kehutanan & agribisnis",
    "Transport & ports": "Transportasi & pelabuhan",

    /* ---- home: fire fighting cross-link and contact ---- */
    "Also part of PT. Hanindo Citra": "Juga bagian dari PT. Hanindo Citra",
    "Hanindo Citra also designs, supplies, installs and maintains complete fire-fighting systems across Indonesia — hydrant, sprinkler, gas and foam suppression, detection and alarm.": "Hanindo Citra juga merancang, memasok, memasang, dan merawat sistem pemadam kebakaran lengkap di seluruh Indonesia — hydrant, sprinkler, pemadam gas dan foam, serta deteksi dan alarm.",
    "Visit Fire Fighting": "Kunjungi Pemadam Kebakaran",
    "Talk to Hanindo Citra": "Hubungi Hanindo Citra",
    "Planning a station,": "Merencanakan SPBU,",
    "or upgrading a forecourt?": "atau meningkatkan forecourt?",
    "Tell us what you are building and our team will scope the right equipment, automation and construction package.": "Beri tahu kami apa yang sedang Anda bangun dan tim kami akan menyusun paket peralatan, otomasi, dan konstruksi yang tepat.",
    "Email our team": "Email tim kami",
    "Contact page": "Halaman kontak",
    "Head Office": "Kantor Pusat",
    "Head office": "Kantor pusat",
    "Phone": "Telepon",
    "Email": "Email",
    "Photo needed": "Perlu foto",
    "Photo to follow": "Foto menyusul",

    /* ---- about ---- */
    "About": "Tentang",
    "Us": "Kami",
    "Company overview": "Profil perusahaan",
    "Four decades in": "Empat dekade di",
    "petroleum equipment": "peralatan perminyakan",
    "Hanindo Citra continues the work started by PT. Sugiron Citra, whose petroleum equipment division began operating in 1987 and became the embryo of the Hanindo Group. Every company under the flag today grew outward from that one division, and Citra remains the group's petroleum arm. It has carried Gilbarco Veeder-Root from that first year — four decades on the same forecourts, with the same principal.": "Hanindo Citra melanjutkan pekerjaan yang dimulai PT. Sugiron Citra, yang divisi peralatan perminyakannya mulai beroperasi pada tahun 1987 dan menjadi cikal bakal Hanindo Group. Setiap perusahaan di bawah bendera ini tumbuh dari satu divisi tersebut, dan Citra tetap menjadi lengan perminyakan grup. Perusahaan ini telah mengageni Gilbarco Veeder-Root sejak tahun pertama itu — empat dekade di forecourt yang sama, dengan prinsipal yang sama.",
    "The same legal entity delivers the group's fire-protection work through its": "Badan hukum yang sama menjalankan pekerjaan proteksi kebakaran grup melalui",
    ", and holds the ISO certifications set out below. What Citra supplies and builds is on the": ", dan memegang sertifikasi ISO yang tercantum di bawah. Apa yang dipasok dan dibangun Citra ada di halaman",
    "products and services": "produk dan layanan",
    "page.": ".",
    "Retail forecourt equipment": "Peralatan forecourt ritel",
    "The principals we distribute": "Prinsipal yang kami distribusikan",
    "Sole distributor for Indonesia.": "Distributor tunggal untuk Indonesia.",
    "Fuel dispensers, tank gauging & submersible pumps": "Dispenser BBM, tank gauging & pompa submersible",
    "Positive displacement flow meters & registers": "Flow meter positive displacement & register",
    "Forecourt controllers & distribution modules": "Forecourt controller & modul distribusi",
    "United States": "Amerika Serikat",
    "New Zealand": "Selandia Baru",
    "Our direction": "Arah kami",
    "Vision & Mission": "Visi & Misi",
    "01 / Vision": "01 / Visi",
    "Vision": "Visi",
    "To remain the petroleum equipment partner Indonesian fuel retailers turn to first — for the equipment itself, and for the service that keeps it running long after commissioning.": "Tetap menjadi mitra peralatan perminyakan yang pertama dituju peritel bahan bakar Indonesia — baik untuk peralatannya sendiri maupun untuk layanan yang menjaganya tetap berjalan lama setelah commissioning.",
    "02 / Mission": "02 / Misi",
    "Mission": "Misi",
    "Deliver efficient, optimal and targeted services while upholding professional standards and work commitment.": "Memberikan layanan yang efisien, optimal, dan tepat sasaran dengan menjunjung standar profesional serta komitmen kerja.",
    "Continuously invest in innovation and the development of our people to raise capability.": "Terus berinvestasi dalam inovasi dan pengembangan sumber daya manusia untuk meningkatkan kapabilitas.",
    "Implement management systems and technologies that improve efficiency, quality, and occupational health & safety.": "Menerapkan sistem manajemen dan teknologi yang meningkatkan efisiensi, mutu, serta keselamatan dan kesehatan kerja.",
    "Why choose us": "Mengapa memilih kami",
    "Why clients trust us": "Mengapa klien mempercayai kami",
    "Three things you can count on, from the first site survey through to long-term service.": "Tiga hal yang dapat Anda andalkan, dari survei lokasi pertama hingga layanan jangka panjang.",
    "Established": "Berpengalaman",
    "Operating in petroleum equipment since 1987 — the company the Hanindo Group grew out of, with the client relationships to match.": "Berkiprah di peralatan perminyakan sejak 1987 — perusahaan asal mula Hanindo Group, dengan hubungan klien yang sepadan.",
    "Best Quality": "Kualitas Terbaik",
    "Internationally branded equipment supplied from our principal partners, engineered to the standards the retail fuel industry is held to.": "Peralatan bermerek internasional yang dipasok dari mitra prinsipal kami, direkayasa sesuai standar yang berlaku di industri ritel bahan bakar.",
    "Excellent Service": "Pelayanan Prima",
    "Fast response, free consultation, on-site surveys, and committed after-sales support — fully dedicated to our clients' satisfaction.": "Respons cepat, konsultasi gratis, survei di lokasi, dan dukungan purnajual yang berkomitmen — sepenuhnya demi kepuasan klien kami.",
    "Credentials": "Kredensial",
    "Certifications & Licenses": "Sertifikasi & Lisensi",
    "Certified to international management-system standards for the engineering, procurement, construction and supply of mechanical, electrical, instrumentation and related civil works.": "Tersertifikasi standar sistem manajemen internasional untuk rekayasa, pengadaan, konstruksi, dan penyediaan pekerjaan mekanikal, elektrikal, instrumentasi, serta pekerjaan sipil terkait.",
    "Quality Management": "Manajemen Mutu",
    "Environmental Management": "Manajemen Lingkungan",
    "Occupational Health & Safety": "Keselamatan & Kesehatan Kerja",
    "Issued by URS · Accredited by UKAS & IAF · Valid to November 2027 — click any certificate to view the full document.": "Diterbitkan oleh URS · Terakreditasi UKAS & IAF · Berlaku hingga November 2027 — klik sertifikat untuk melihat dokumen lengkap.",
    "View ↗": "Lihat ↗",

    /* ---- products & services ---- */
    "Our product range": "Rangkaian produk kami",
    "Dispensing, measurement, monitoring and the systems that tie them together.": "Dispensing, pengukuran, pemantauan, dan sistem yang menyatukan semuanya.",
    "A complete forecourt: dispensing, measurement, monitoring and the management systems that tie them together.": "Forecourt yang lengkap: dispensing, pengukuran, pemantauan, dan sistem manajemen yang menyatukan semuanya.",
    "Retail fuel dispensers from Gilbarco Veeder-Root, for forecourts of every size.": "Dispenser BBM ritel dari Gilbarco Veeder-Root, untuk forecourt segala ukuran.",
    "View models & nozzle variants": "Lihat model & varian nozzle",
    "ITL Enabler controllers, linking the dispensers and tank gauges to the point of sale through one open API.": "Controller ITL Enabler, menghubungkan dispenser dan tank gauge ke point of sale melalui satu API terbuka.",
    "View controllers & modules": "Lihat controller & modul",
    "The AdvanZ family — point of sale, back office, head office, accounts and loyalty.": "Keluarga AdvanZ — point of sale, back office, kantor pusat, akuntansi, dan loyalty.",
    "Ask us about AdvanZ": "Tanyakan AdvanZ kepada kami",
    "Piston and rotary positive displacement metering for accurate custody transfer.": "Pengukuran positive displacement tipe piston dan rotary untuk custody transfer yang akurat.",
    "View meters & registers": "Lihat meter & register",
    "Veeder-Root consoles and magnetostrictive probes, for continuous wet-stock monitoring and environmental compliance.": "Konsol Veeder-Root dan probe magnetostrictive, untuk pemantauan wet stock berkelanjutan dan kepatuhan lingkungan.",
    "View consoles & probes": "Lihat konsol & probe",
    "Red Jacket submersible pumps, with electronic monitoring and line leak detection.": "Pompa submersible Red Jacket, dengan pemantauan elektronik dan deteksi kebocoran jalur.",
    "View pumps & controls": "Lihat pompa & kontrol",

    /* ---- projects ---- */
    "Stations built,": "SPBU yang dibangun,",
    "across Indonesia.": "di seluruh Indonesia.",
    "From consultation and drawing through construction, until the station operates.": "Dari konsultasi dan gambar hingga konstruksi, sampai SPBU beroperasi.",
    "Selected work": "Pekerjaan terpilih",
    "Stations and forecourts we have delivered.": "SPBU dan forecourt yang telah kami kerjakan.",
    "Retail petroleum construction projects, from greenfield stations to forecourt upgrades.": "Proyek konstruksi ritel perminyakan, dari SPBU greenfield hingga peningkatan forecourt.",
    "Content needed": "Perlu konten",
    "Add Hanindo Citra project references here": "Tambahkan referensi proyek Hanindo Citra di sini",
    "This page is built and linked, but no project references have been supplied for Hanindo Citra yet. Add each project as a card — client, location, scope and a photo — following the pattern used on the Fire Fighting projects page.": "Halaman ini sudah dibuat dan tertaut, tetapi belum ada referensi proyek yang disediakan untuk Hanindo Citra. Tambahkan setiap proyek sebagai kartu — klien, lokasi, lingkup pekerjaan, dan foto — mengikuti pola yang dipakai pada halaman proyek Pemadam Kebakaran.",
    "See the pattern": "Lihat polanya",

    /* ---- contact ---- */
    "Let's talk about": "Mari bicarakan",
    "your project.": "proyek Anda.",
    "Tell us what you are running or building, and we will put the right person on it.": "Beri tahu kami apa yang sedang Anda jalankan atau bangun, dan kami akan menugaskan orang yang tepat.",
    "How to reach us.": "Cara menghubungi kami.",
    "For equipment enquiries, spare parts, service calls or a new station project, our Jakarta team is the first point of contact.": "Untuk pertanyaan peralatan, suku cadang, panggilan servis, atau proyek SPBU baru, tim Jakarta kami adalah titik kontak pertama.",
    "Call center": "Call center",
    "Office hours": "Jam operasional",
    "— Monday to Friday, 08.00 – 17.00 WIB": "— Senin – Jumat, 08.00 – 17.00 WIB",
    "Email Hanindo Citra": "Email Hanindo Citra",

    /* ---- shared spec-table labels (catalogue pages) ---- */
    "Capacity": "Kapasitas",
    "Weight": "Berat",
    "Power": "Daya",
    "Operating pressure": "Tekanan operasi",
    "Supply voltage": "Tegangan suplai",
    "Display": "Tampilan",
    "Pumps": "Pompa",
    "Models": "Model",
    "Model": "Model",
    "Controls": "Kontrol",
    "Supply": "Suplai",
    "Back to Products & Services": "Kembali ke Produk & Layanan",

    /* ---- catalogue: category navigation ---- */
    "Dispensers": "Dispenser",
    "Controllers": "Controller",
    "Tank Gauging": "Tank Gauging",
    "Submersible Pumps": "Pompa Submersible",

    /* ---- catalogue: dispensers ---- */
    "Gilbarco Veeder-Root dispensers, from island pumps to truck lanes.": "Dispenser Gilbarco Veeder-Root, dari pompa island hingga jalur truk.",
    "Retail fuel dispensers from Gilbarco Veeder-Root, in three families covering everything from a single-grade island pump to ultra-high-flow truck lanes. Each is ordered in the nozzle count the site needs.": "Dispenser BBM ritel dari Gilbarco Veeder-Root, dalam tiga keluarga yang mencakup semuanya, dari pompa island satu grade hingga jalur truk berdebit sangat tinggi. Masing-masing dipesan dengan jumlah nozzle sesuai kebutuhan lokasi.",
    "Dispenser families": "Keluarga dispenser",
    "Three families cover the whole range — Latitude for sites being specified today, Frontier for dependable volume, Encore for commercial and truck lanes.": "Tiga keluarga mencakup seluruh rangkaian — Latitude untuk lokasi yang dispesifikasikan saat ini, Frontier untuk volume yang andal, Encore untuk jalur komersial dan truk.",
    "Gilbarco’s current-generation dispenser, built to be specified once and grown into. A large multimedia screen and bold EasyView display sit above Opti-Flow hydraulics for better suction lift and higher average flow rates, and the lighted canopy signals bay availability from the road. LS-100 suits low-throughput sites, LS-200 medium to high, and LS-300 sites carrying up to four grades.": "Dispenser generasi terkini Gilbarco, dirancang untuk dispesifikasikan sekali dan dikembangkan seiring waktu. Layar multimedia besar dan tampilan EasyView yang tegas berada di atas hidrolik Opti-Flow untuk daya isap dan laju aliran rata-rata yang lebih baik, sementara kanopi bercahaya menandakan ketersediaan bay dari jalan. LS-100 cocok untuk lokasi berthroughput rendah, LS-200 untuk menengah hingga tinggi, dan LS-300 untuk lokasi yang menyediakan hingga empat grade.",
    "EasyView display": "Tampilan EasyView",
    "Opti-Flow hydraulics": "Hidrolik Opti-Flow",
    "PowerSafe electronics": "Elektronik PowerSafe",
    "Lighted canopy": "Kanopi bercahaya",
    "Vapour recovery": "Vapour recovery",
    "Nozzle configurations": "Konfigurasi nozzle",
    "2 nozzle": "2 nozzle",
    "4 nozzle": "4 nozzle",
    "6 nozzle": "6 nozzle",
    "8 nozzle": "8 nozzle",
    "The workhorse of the range, in single and dual configurations. Big, bold displays and a high-accuracy meter, with the Series II high-hose island models built for high-throughput sites that need dependable performance above all else.": "Tulang punggung rangkaian ini, tersedia dalam konfigurasi single dan dual. Tampilan besar dan tegas serta meter berakurasi tinggi, dengan model island high-hose Series II yang dibuat untuk lokasi berthroughput tinggi yang mengutamakan keandalan di atas segalanya.",
    "Single and dual configurations": "Konfigurasi single dan dual",
    "High-accuracy meter": "Meter berakurasi tinggi",
    "High-hose island models": "Model island high-hose",
    "Built for truck stops and commercial lanes, where pumping time is the constraint rather than forecourt space. Ultra-high-flow masters and satellites roughly halve the time it takes to fill and pay, reaching a combined flow rate of up to 63 gpm when a master and satellite are used together — so more fuel moves during the busy hours and drivers get back on the road faster.": "Dibuat untuk truck stop dan jalur komersial, di mana kendalanya adalah waktu pengisian, bukan luas forecourt. Master dan satelit berdebit sangat tinggi memangkas waktu mengisi dan membayar hingga sekitar setengahnya, mencapai laju aliran gabungan hingga 63 gpm bila master dan satelit dipakai bersama — sehingga lebih banyak bahan bakar tersalurkan pada jam sibuk dan pengemudi lebih cepat kembali ke jalan.",
    "Master and satellite pairing": "Pasangan master dan satelit",
    "Up to 63 gpm combined": "Hingga 63 gpm gabungan",
    "Built for truck stop duty": "Dibuat untuk tugas truck stop",
    "NP-3 high flow": "NP-3 high flow",
    "Not sure which": "Belum yakin",
    "configuration you need?": "konfigurasi mana yang Anda perlukan?",
    "Tell us the throughput, the grades and the island layout and our team will scope the right dispenser, nozzle count and installation package.": "Beri tahu kami throughput, grade bahan bakar, dan tata letak island, dan tim kami akan menentukan dispenser, jumlah nozzle, serta paket pemasangan yang tepat.",

    /* ---- catalogue: submersible pumps ---- */
    "Red Jacket pumps, with the control boxes that run them.": "Pompa Red Jacket, beserta control box yang menjalankannya.",
    "Red Jacket submersible turbine pumps move product from the tank to every dispenser on the site, in four motor sizes for installations 3½ to 19 feet deep. Supplied with the control boxes that protect, stage and monitor them.": "Pompa turbin submersible Red Jacket mengalirkan produk dari tangki ke setiap dispenser di lokasi, tersedia dalam empat ukuran motor untuk pemasangan sedalam 3½ hingga 19 kaki. Dipasok bersama control box yang melindungi, mengatur tahapan, dan memantaunya.",
    "One body in four motor sizes, fitting installations from 3½ to 19 feet deep and rated for Class 1 Group D hazardous locations.": "Satu bodi dalam empat ukuran motor, sesuai untuk pemasangan sedalam 3½ hingga 19 kaki dan bersertifikat untuk lokasi berbahaya Class 1 Group D.",
    "Submersible Turbine Pump": "Pompa Turbin Submersible",
    "The foundation model, built for high-throughput sites. The current motor moves up to 5% more fuel on 8% less power and runs around 125 degrees cooler than competing units. The packer manifold puts the contractor’s box inside the housing, isolated from the fuel path: pulling the extractable bolts disconnects the electrical yoke and drains fuel back to the tank, so a service call is safe and clean without extra steps.": "Model dasar, dibuat untuk lokasi berthroughput tinggi. Motor terkini mengalirkan bahan bakar hingga 5% lebih banyak dengan daya 8% lebih rendah dan bekerja sekitar 125 derajat lebih dingin dibanding unit pesaing. Packer manifold menempatkan contractor’s box di dalam housing, terisolasi dari jalur bahan bakar: menarik baut yang dapat dilepas akan memutus yoke listrik dan mengalirkan bahan bakar kembali ke tangki, sehingga panggilan servis menjadi aman dan bersih tanpa langkah tambahan.",
    "Isolated contractor’s box": "Contractor’s box terisolasi",
    "Automatic disconnect and fuel drain": "Pemutusan otomatis dan pengurasan bahan bakar",
    "Floating suction adapter available": "Tersedia floating suction adapter",
    "Motor range": "Rentang motor",
    "Installation depth": "Kedalaman pemasangan",
    "Flow gain": "Kenaikan aliran",
    "Power saving": "Penghematan daya",
    "Running temperature": "Suhu kerja",
    "~125°F cooler": "~125°F lebih dingin",
    "Diesel and petrol": "Solar dan bensin",
    "Ethanol / methanol": "Etanol / metanol",
    "To 20%": "Hingga 20%",
    "Motor sizes": "Ukuran motor",
    "X3 1½ HP high pressure": "X3 1½ HP tekanan tinggi",
    "The control box sits between the dispenser and the pump. Which one a site needs depends on whether the pump simply has to run, or has to be protected, staged and monitored.": "Control box berada di antara dispenser dan pompa. Pilihan yang dibutuhkan sebuah lokasi bergantung pada apakah pompa cukup dijalankan saja, atau harus dilindungi, diatur tahapannya, dan dipantau.",
    "Pump Control Boxes": "Control Box Pompa",
    "The Standard box is the plain interface: it runs the pump, lights an indicator when fuelling starts, and doubles as the lock-out/tag-out point for maintenance. The IQ box adds protection and staging — it guards the motor, monitors site demand and brings further pumps in as it rises, and talks to the ISOTROL 1-8 box and the Veeder-Root TLS-450 PLUS. Where a line cannot be allowed to stop, two 2 HP pumps are manifolded to double the flow and cover each other, which a single 4 HP pump cannot do.": "Box Standard adalah antarmuka sederhana: menjalankan pompa, menyalakan indikator saat pengisian dimulai, dan sekaligus menjadi titik lock-out/tag-out untuk pemeliharaan. Box IQ menambahkan perlindungan dan pengaturan tahapan — melindungi motor, memantau permintaan di lokasi dan mengaktifkan pompa berikutnya saat permintaan naik, serta berkomunikasi dengan box ISOTROL 1-8 dan Veeder-Root TLS-450 PLUS. Bila sebuah jalur tidak boleh berhenti, dua pompa 2 HP dimanifold untuk menggandakan aliran dan saling menggantikan — sesuatu yang tidak dapat dilakukan satu pompa 4 HP.",
    "Lock-out / tag-out at the box": "Lock-out / tag-out di box",
    "Motor protection and backup": "Perlindungan motor dan cadangan",
    "Demand-based pump staging": "Pengaturan tahapan pompa berbasis permintaan",
    "Talks to TLS-450 PLUS": "Berkomunikasi dengan TLS-450 PLUS",
    "Line manifold and virtual siphon": "Manifold jalur dan virtual siphon",
    "Boxes": "Box",
    "Up to +5%": "Hingga +5%",
    "Not sure which pump": "Belum yakin pompa mana",
    "Tell us the fuel, the tank depth and the number of dispensers on the line, and our team will size the pump and control box to match — and install and commission them.": "Beri tahu kami jenis bahan bakar, kedalaman tangki, dan jumlah dispenser pada jalur tersebut, dan tim kami akan menentukan ukuran pompa serta control box yang sesuai — lalu memasang dan mengomisioningnya.",

    /* ---- footer ---- */
    "Your technology one stop solution — serving the oil & gas, automation, automotive and fire protection industries in Indonesia since 1987.": "Solusi teknologi satu atap Anda — melayani industri minyak & gas, otomasi, otomotif, dan proteksi kebakaran di Indonesia sejak 1987.",
    "Our Companies": "Perusahaan Kami",
    "Hanindo Automation Solutions": "Hanindo Automation Solutions",
    "Tel:": "Tel:",
    "© 2026 Hanindo Group. All Rights Reserved.": "© 2026 Hanindo Group. Hak Cipta Dilindungi."
  };

  var LANG_KEY = 'ha_citra_lang', ALT = 'id', HTML_LANG = 'id';
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
