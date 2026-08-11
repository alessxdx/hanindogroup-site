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
    /* ---- directions ---- */
    "Get directions": "Petunjuk arah",
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
    "Flow Meters": "Flow Meter",
    "Submersible Turbine Pumps": "Pompa Turbin Submersible",
    /* Held in English deliberately, and listed rather than omitted so the
       next person can see it was a decision and not an oversight. ATG is
       what the Indonesian fuel trade calls it; the siblings above are
       translated because they have ordinary Indonesian equivalents. */
    "Automatic Tank Gauging": "Automatic Tank Gauging",

    /* ---- home ---- */
    "PT. Hanindo Citra provides sales and after-sales service of petroleum equipment and product supply, from the forecourt to the bulk terminal — and builds the fuel stations that run it.": "PT. Hanindo Citra menyediakan penjualan dan layanan purnajual peralatan perminyakan serta pasokan produk, dari forecourt hingga terminal curah — dan membangun SPBU yang menjalankannya.",
    "Everything fuel moves through.": "Semua yang dilalui bahan bakar.",
    "PT. Hanindo Citra supplies, installs, and services the equipment fuel is dispensed, measured and monitored with — dispensers, submersible turbine pumps, automatic tank gauging systems, flow meters, forecourt controllers, and fuel management systems. The same systems run retail forecourts, fuel depots, marine terminals, aviation fuelling and industrial sites. The company also builds fuel stations from consultation and design through construction to the day the site opens.": "PT. Hanindo Citra memasok, memasang, dan merawat peralatan yang digunakan untuk menyalurkan, mengukur, dan memantau bahan bakar — dispenser, pompa turbin submersible, sistem automatic tank gauging, flow meter, forecourt controller, dan sistem manajemen bahan bakar. Sistem yang sama menjalankan forecourt ritel, depot bahan bakar, terminal laut, pengisian bahan bakar penerbangan, dan lokasi industri. Perusahaan ini juga membangun SPBU, dari konsultasi dan perancangan hingga pembangunan, sampai hari lokasi mulai beroperasi.",
    "Sole distributor in Indonesia for Gilbarco Veeder-Root (since 1987), Total Control Systems, and ITL.": "Distributor tunggal di Indonesia untuk Gilbarco Veeder-Root (sejak 1987), Total Control Systems, dan ITL.",
    "Provides end-to-end construction for the retail petroleum industry, from consultation and design through construction until the fuel station is operational.": "Menyediakan konstruksi menyeluruh untuk industri ritel perminyakan, dari konsultasi dan perancangan hingga pembangunan sampai SPBU beroperasi.",
    "Supplies and installs signboards and lighting for fuel stations, with after-sales service for all equipment installed.": "Memasok dan memasang papan nama serta penerangan SPBU, dengan layanan purnajual untuk semua peralatan yang dipasang.",
    "What we supply": "Yang kami sediakan",
    "Partners & Principals": "Mitra & Prinsipal",

    /* ---- customer wall bands ---- */
    "Customer base": "Basis pelanggan",
    /* EPC stays EPC in the Indonesian — it is what the trade says, and
       spelling it out would leave a label nobody searches for. Same
       reasoning as Automatic Tank Gauging above. */
    "Oil & Gas (Downstream / Retail)": "Minyak & Gas (Hilir / Ritel)",
    "Oil & Gas (Upstream / Exploration & Production)": "Minyak & Gas (Hulu / Eksplorasi & Produksi)",
    "Automotive & Mobility": "Otomotif & Mobilitas",
    "Energy & Utilities": "Energi & Utilitas",
    "Engineering, Procurement & Construction (EPC)": "Rekayasa, Pengadaan & Konstruksi (EPC)",
    "Mining & Mineral Extraction": "Pertambangan & Ekstraksi Mineral",
    "Agroindustry & Plantations": "Agroindustri & Perkebunan",
    "Logistics, Ports & Transportation": "Logistik, Pelabuhan & Transportasi",

    /* ---- home: fire fighting cross-link and contact ---- */
    "Also part of PT. Hanindo Citra": "Juga bagian dari PT. Hanindo Citra",
    "PT. Hanindo Citra also designs, supplies, installs and maintains complete fire-fighting systems across Indonesia — hydrant, sprinkler, gas and foam suppression, detection and alarm.": "PT. Hanindo Citra juga merancang, memasok, memasang, dan merawat sistem pemadam kebakaran lengkap di seluruh Indonesia — hydrant, sprinkler, pemadam gas dan foam, serta deteksi dan alarm.",
    "Visit Fire Fighting": "Kunjungi Pemadam Kebakaran",
    "Talk to PT. Hanindo Citra": "Hubungi PT. Hanindo Citra",
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
    "PT. Hanindo Citra continues the work started by PT Sugiron Citra, whose petroleum equipment division began operating in 1987 and became the foundation of the Hanindo Group. It has represented Gilbarco Veeder-Root since that first year—four decades of partnership, serving the same industry with the same principal.": "PT. Hanindo Citra melanjutkan pekerjaan yang dimulai PT Sugiron Citra, yang divisi peralatan perminyakannya mulai beroperasi pada tahun 1987 dan menjadi fondasi Hanindo Group. Perusahaan ini telah mewakili Gilbarco Veeder-Root sejak tahun pertama itu—empat dekade kemitraan, melayani industri yang sama dengan prinsipal yang sama.",
    /* Both "and also this" lines in the overview carry an inline link, so
       each reaches the walker as text nodes either side of the anchor and
       needs an entry per fragment. The link text is a company name and a
       department name — neither is translated. */
    "Since 2012 it has also carried the group's oil and gas automation work, which transferred here from": "Sejak 2012 perusahaan ini juga menangani pekerjaan otomasi minyak dan gas grup, yang dialihkan ke sini dari",
    "— the automation and the equipment it runs are now specified by the same company.": "— otomasi dan peralatan yang dijalankannya kini ditangani oleh perusahaan yang sama.",
    "PT. Hanindo Citra also delivers the group's fire protection work through its": "PT. Hanindo Citra juga menjalankan pekerjaan proteksi kebakaran grup melalui",
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
    "To be Indonesia's trusted partner for petroleum equipment, delivering reliable solutions and dependable service throughout every stage of a fuel station's lifecycle.": "Menjadi mitra terpercaya Indonesia untuk peralatan perminyakan, menghadirkan solusi yang andal dan layanan yang dapat diandalkan di setiap tahap siklus hidup sebuah SPBU.",
    "02 / Mission": "02 / Misi",
    "Mission": "Misi",
    "Deliver efficient, optimal and targeted services while upholding professional standards and work commitment.": "Memberikan layanan yang efisien, optimal, dan tepat sasaran dengan menjunjung standar profesional serta komitmen kerja.",
    "Continuously invest in innovation and the development of our people to raise capability.": "Terus berinvestasi dalam inovasi dan pengembangan sumber daya manusia untuk meningkatkan kapabilitas.",
    "Implement management systems and technologies that improve efficiency, quality, and occupational health & safety.": "Menerapkan sistem manajemen dan teknologi yang meningkatkan efisiensi, mutu, serta keselamatan dan kesehatan kerja.",
    "Why choose us": "Mengapa memilih kami",
    "Why clients trust us": "Mengapa klien mempercayai kami",
    "Three things you can count on, from the first site survey through to long-term service.": "Tiga hal yang dapat Anda andalkan, dari survei lokasi pertama hingga layanan jangka panjang.",
    /* "Since 1987" is a date, not a phrase — it reads the same in both
       languages, so it has no entry here and is left alone by the toggle. */
    "The original petroleum equipment business that became today's Hanindo Group, serving Indonesia's fuel retail industry for over four decades.": "Bisnis peralatan perminyakan yang menjadi cikal bakal Hanindo Group hari ini, melayani industri ritel bahan bakar Indonesia selama lebih dari empat dekade.",
    "Global Brands": "Merek Global",
    "Equipment from trusted international manufacturers, selected for the reliability and performance demanded by modern fuel stations.": "Peralatan dari produsen internasional tepercaya, dipilih untuk keandalan dan performa yang dituntut SPBU modern.",
    "End-to-End Service": "Layanan Menyeluruh",
    "Consultation, installation, maintenance, and technical support from a single experienced team.": "Konsultasi, pemasangan, perawatan, dan dukungan teknis dari satu tim yang berpengalaman.",
    "Credentials": "Kredensial",
    "Certifications & Licenses": "Sertifikasi & Lisensi",
    "Quality Management": "Manajemen Mutu",
    "Environmental Management": "Manajemen Lingkungan",
    "Occupational Health & Safety": "Keselamatan & Kesehatan Kerja",
    "Issued by URS · Accredited by UKAS & IAF · Valid to November 2027 — click any certificate to view the full document.": "Diterbitkan oleh URS · Terakreditasi UKAS & IAF · Berlaku hingga November 2027 — klik sertifikat untuk melihat dokumen lengkap.",
    "View ↗": "Lihat ↗",

    /* ---- products & services ---- */
    "Our product range": "Rangkaian produk kami",
    "Dispensing, measurement, monitoring and the systems that tie them together.": "Dispensing, pengukuran, pemantauan, dan sistem yang menyatukan semuanya.",
    "A complete forecourt, and the bulk storage beyond it: dispensing, measurement, monitoring and the management systems that tie them together.": "Forecourt yang lengkap, dan penyimpanan curah di luarnya: dispensing, pengukuran, pemantauan, dan sistem manajemen yang menyatukan semuanya.",
    "Retail fuel dispensers from Gilbarco Veeder-Root, for forecourts of every size.": "Dispenser BBM ritel dari Gilbarco Veeder-Root, untuk forecourt segala ukuran.",
    "View models & nozzle variants": "Lihat model & varian nozzle",
    "ITL Enabler controllers, linking the dispensers and tank gauges to the point of sale through one open API.": "Controller ITL Enabler, menghubungkan dispenser dan tank gauge ke point of sale melalui satu API terbuka.",
    "View controllers & modules": "Lihat controller & modul",
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
    "Projects we have delivered.": "Proyek yang telah kami kerjakan.",
    "Retail petroleum construction and bulk fuel installations, from greenfield stations to depot and terminal systems.": "Konstruksi ritel perminyakan dan instalasi bahan bakar curah, dari SPBU greenfield hingga sistem depot dan terminal.",
    "Content needed": "Perlu konten",
    "Add PT. Hanindo Citra project references here": "Tambahkan referensi proyek PT. Hanindo Citra di sini",
    "This page is built and linked, but no project references have been supplied for PT. Hanindo Citra yet. Add each project as a card — client, location, scope and a photo — following the pattern used on the Fire Fighting projects page.": "Halaman ini sudah dibuat dan tertaut, tetapi belum ada referensi proyek yang disediakan untuk PT. Hanindo Citra. Tambahkan setiap proyek sebagai kartu — klien, lokasi, lingkup pekerjaan, dan foto — mengikuti pola yang dipakai pada halaman proyek Pemadam Kebakaran.",
    "See the pattern": "Lihat polanya",

    /* ---- contact ---- */
    "Let's talk about": "Mari bicarakan",
    "your project.": "proyek Anda.",
    "Tell us what you are running or building, and we will put the right person on it.": "Beri tahu kami apa yang sedang Anda jalankan atau bangun, dan kami akan menugaskan orang yang tepat.",
    "How to reach us.": "Cara menghubungi kami.",
    "For equipment enquiries, spare parts, service calls or a new station project, our Jakarta team is the first point of contact.": "Untuk pertanyaan peralatan, suku cadang, panggilan servis, atau proyek SPBU baru, tim Jakarta kami adalah titik kontak pertama.",
    "Telephone": "Telepon",
    "Office hours": "Jam operasional",
    "— Monday to Friday, 08.00 – 17.00 WIB": "— Senin – Jumat, 08.00 – 17.00 WIB",

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
    "Built for truck stops and commercial lanes, where pumping time is the constraint rather than forecourt space. Ultra-high-flow masters and satellites roughly halve the time it takes to fill and pay, reaching a combined flow rate of up to 63 gpm when a master and satellite are used together — so more fuel moves during the busy hours and drivers get back on the road faster.": "Dibuat untuk truck stop dan jalur komersial, di mana kendalanya adalah waktu pengisian, bukan luas forecourt. Master dan satelit berdebit sangat tinggi memangkas waktu mengisi dan membayar hingga sekitar setengahnya, mencapai laju aliran gabungan hingga 63 gpm bila master dan satelit dipakai bersama — sehingga lebih banyak bahan bakar tersalurkan pada jam sibuk dan pengemudi lebih cepat kembali ke jalan.",
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

    /* ---- catalogue: flow meters ---- */
    "Total Control Systems meters, with the TCS 3000 register.": "Meter Total Control Systems, dengan register TCS 3000.",
    "Total Control Systems positive displacement flow meters — a reciprocating piston design for accuracy at low and widely varying flow, a rotary design for volume at the least pressure drop. Both are read by the TCS 3000 electronic register.": "Flow meter positive displacement Total Control Systems — desain piston bolak-balik untuk akurasi pada aliran rendah dan yang sangat bervariasi, desain rotary untuk volume dengan penurunan tekanan paling kecil. Keduanya dibaca oleh register elektronik TCS 3000.",
    "Two positive displacement designs, chosen by the job rather than by preference: the piston meter for accuracy at low and widely varying flow, the rotary meter for volume with the least pressure drop.": "Dua desain positive displacement, dipilih berdasarkan pekerjaannya dan bukan selera: meter piston untuk akurasi pada aliran rendah dan yang sangat bervariasi, meter rotary untuk volume dengan penurunan tekanan paling kecil.",
    "Reciprocating Piston Flow Meter": "Flow Meter Piston Bolak-balik",
    "Three pistons reciprocate in their own measuring chambers, much as they would in a car engine, driving a sliding valve through one smooth mechanical motion. That motion does not care what the liquid is doing — which is why the 682 holds its accuracy through changing viscosities and temperatures and through product carrying suspensions and solids.": "Tiga piston bergerak bolak-balik di ruang ukurnya masing-masing, mirip seperti pada mesin mobil, menggerakkan katup geser melalui satu gerakan mekanis yang halus. Gerakan itu tidak terpengaruh oleh perilaku cairannya — itulah sebabnya 682 tetap akurat meski viskositas dan suhu berubah, serta saat produk membawa suspensi dan padatan.",
    "Flow range": "Rentang aliran",
    "Turndown ratio": "Rasio turndown",
    "Linear accuracy": "Akurasi linier",
    "To ±0.1%": "Hingga ±0,1%",
    "Repeatability": "Keterulangan",
    "To 0.01%": "Hingga 0,01%",
    "Temperature range": "Rentang suhu",
    "Viscosity range": "Rentang viskositas",
    "Connections": "Sambungan",
    "Warranty": "Garansi",
    "10 years (5 on LPG)": "10 tahun (5 tahun untuk LPG)",
    "Body material": "Material bodi",
    "Aluminium": "Aluminium",
    "Ductile iron": "Besi ulet",
    "Stainless steel": "Baja tahan karat",
    "Meter types": "Tipe meter",
    "Optional connections": "Sambungan opsional",
    "Slip weld": "Slip weld",
    "ANSI flanges": "Flensa ANSI",
    "Rotary Flow Meter": "Flow Meter Rotary",
    "Three rotors turn in unison inside the measuring chamber, kept in step by a timing gear on each shaft. No two metal surfaces touch, so there is nothing to wear and the meter does not drift out of calibration the way a contacting design eventually does. Compact, light, cheap in pressure to put in a line — and bi-directional, so one meter can serve a loading arm that both delivers and receives.": "Tiga rotor berputar serempak di dalam ruang ukur, dijaga tetap seirama oleh timing gear pada setiap porosnya. Tidak ada dua permukaan logam yang bersentuhan, sehingga tidak ada yang aus dan meter tidak menyimpang dari kalibrasinya seperti yang akhirnya terjadi pada desain bersentuhan. Ringkas, ringan, murah dari sisi penurunan tekanan saat dipasang pada jalur — dan dua arah, sehingga satu meter dapat melayani loading arm yang sekaligus mengeluarkan dan menerima.",
    "Flow": "Aliran",
    "Direction": "Arah",
    "Bi-directional": "Dua arah",
    "To ±0.15%": "Hingga ±0,15%",
    "To 0.02%": "Hingga 0,02%",
    "Repeatability figure is for a 700SP with mechanical registration on a 1 cPs test fluid under constant operating conditions. Meets a wide range of weights and measures approvals — contact us for a specific market.": "Angka keterulangan berlaku untuk 700SP dengan registrasi mekanis pada fluida uji 1 cPs dalam kondisi operasi konstan. Memenuhi berbagai persetujuan metrologi legal — hubungi kami untuk pasar tertentu.",
    "Electronic Registration": "Registrasi Elektronik",
    "A meter counts volume. The register turns that count into a printed ticket, a temperature-corrected quantity, a preset shut-off and a record the office can see — and it is where most of the decisions about a metering system actually get made.": "Meter menghitung volume. Register mengubah hitungan itu menjadi tiket tercetak, kuantitas terkoreksi suhu, penghentian preset, dan catatan yang dapat dilihat kantor — dan di situlah sebagian besar keputusan tentang sistem metering sebenarnya diambil.",
    "Electronic Meter Register & Flow Computer": "Register Meter Elektronik & Flow Computer",
    "Set up as a plain “pump and print” register it does one job and does it on the first day. Everything past that is configuration rather than hardware — temperature volume compensation, presets, pump and throttle control, air elimination, additive injection, tank gauging — all set in the field, all off the same unit.": "Disetel sebagai register “pump and print” sederhana, alat ini melakukan satu tugas dan langsung bekerja pada hari pertama. Selebihnya adalah soal konfigurasi, bukan perangkat keras — kompensasi volume terhadap suhu, preset, kontrol pompa dan throttle, eliminasi udara, injeksi aditif, tank gauging — semuanya diatur di lapangan, semuanya dari unit yang sama.",
    "Simple pump & print, or fully configured": "Sederhana pump & print, atau terkonfigurasi penuh",
    "Single or multiple products through one meter": "Satu atau beberapa produk melalui satu meter",
    "Temperature volume compensation": "Kompensasi volume terhadap suhu",
    "Preset by price or by quantity": "Preset berdasarkan harga atau kuantitas",
    "Electronic pump, PTO and throttle control": "Kontrol elektronik pompa, PTO, dan throttle",
    "Electronic vapour or air elimination": "Eliminasi uap atau udara secara elektronik",
    "Density and water measurement": "Pengukuran densitas dan kadar air",
    "Calibration, shift and inventory reports": "Laporan kalibrasi, shift, dan inventori",
    "16 GB non-volatile": "16 GB non-volatile",
    "Printing": "Pencetakan",
    "Slip, roll and wireless": "Slip, roll, dan nirkabel",
    "Maximum frequency": "Frekuensi maksimum",
    "Temperature rating": "Rating suhu",
    "Enclosure ports": "Port enclosure",
    "Calibration seal": "Segel kalibrasi",
    "Hall effect switch": "Sakelar hall effect",
    "Hazardous rating": "Rating area berbahaya",
    "Optional": "Opsional",
    "Internal Wi-Fi or cellular": "Wi-Fi internal atau seluler",
    "Bluetooth": "Bluetooth",
    "Radio": "Radio",
    "Additive injection": "Injeksi aditif",
    "Corrected differential pressure": "Tekanan diferensial terkoreksi",
    "JIG-compliant water integration": "Integrasi pengukuran air sesuai JIG",
    "GPS tracking": "Pelacakan GPS",
    "Pictured beside the TCS 3000ex — the same register in an explosion-proof enclosure, rated Class 1 Division 1 and ATEX/IECEx Zone 1, for sites that need it.": "Ditampilkan di samping TCS 3000ex — register yang sama dalam enclosure tahan ledakan, bersertifikat Class 1 Division 1 dan ATEX/IECEx Zone 1, untuk lokasi yang membutuhkannya.",
    "Metering a product,": "Mengukur sebuah produk,",
    "or a custody transfer?": "atau custody transfer?",
    "Tell us the liquid, the flow rate and whether the measurement has to stand up as a legal quantity, and our team will size the meter, specify the register and commission the system.": "Beri tahu kami jenis cairan, laju alirannya, dan apakah pengukuran harus sah secara hukum, dan tim kami akan menentukan ukuran meter, menetapkan register, serta mengomisioning sistemnya.",

    /* ---- catalogue: tank gauging ---- */
    "Veeder-Root consoles and probes, filling station to bulk terminal.": "Konsol dan probe Veeder-Root, dari SPBU hingga terminal curah.",
    "Veeder-Root consoles and magnetostrictive probes for continuous wet-stock monitoring — tank levels, delivery reconciliation, water detection and certified leak testing.": "Konsol dan probe magnetostrictive Veeder-Root untuk pemantauan wet stock berkelanjutan — level tangki, rekonsiliasi pengiriman, deteksi air, dan pengujian kebocoran bersertifikat.",
    "Consoles": "Konsol",
    "The console is sized by how many tanks and sensors the site has to carry, and by whether it needs continuous leak testing. All three run a colour touchscreen, calculate temperature-compensated volumes, and can be reached remotely from a browser.": "Ukuran konsol ditentukan oleh berapa banyak tangki dan sensor yang harus ditangani lokasi, serta apakah diperlukan pengujian kebocoran berkelanjutan. Ketiganya menggunakan layar sentuh berwarna, menghitung volume terkompensasi suhu, dan dapat diakses dari jarak jauh melalui peramban.",
    "Tank Gauging Console": "Konsol Tank Gauging",
    "— TLS-450 PLUS · connected, secure, compliant": "— TLS-450 PLUS · terhubung, aman, patuh",
    "— TLS4 & TLS4B · 6 to 12 tanks": "— TLS4 & TLS4B · 6 hingga 12 tangki",
    "The flagship console, for mid to large sites and for anywhere the tank count is likely to grow. Standard configuration carries up to 64 inputs and expands to 256, so a site adds tanks and sensors rather than replacing the console. An 8″ colour WVGA touchscreen fronts it, and against the previous generation of tank gauge it brings five times the processing speed, eight times the memory and twice the data storage. Static tank testing is standard; continuous statistical leak detection and pressurised line leak detection are ordered as options. Inventory, alarms and diagnostics can be reached from a phone, a tablet or a browser, so a site is checked — and often resolved — without anyone driving to it.": "Konsol unggulan, untuk lokasi menengah hingga besar dan untuk mana pun yang jumlah tangkinya berpotensi bertambah. Konfigurasi standar menampung hingga 64 input dan dapat diperluas ke 256, sehingga sebuah lokasi cukup menambah tangki dan sensor tanpa mengganti konsolnya. Bagian depannya berupa layar sentuh WVGA berwarna 8″, dan dibanding tank gauge generasi sebelumnya alat ini menghadirkan kecepatan pemrosesan lima kali lipat, memori delapan kali lipat, serta penyimpanan data dua kali lipat. Pengujian tangki statis merupakan fitur standar; deteksi kebocoran statistik berkelanjutan dan deteksi kebocoran jalur bertekanan dipesan sebagai opsi. Inventori, alarm, dan diagnostik dapat diakses dari ponsel, tablet, atau peramban, sehingga sebuah lokasi dapat diperiksa — dan sering kali diselesaikan — tanpa siapa pun harus datang ke sana.",
    "Workflow Wizard configuration": "Konfigurasi Workflow Wizard",
    "TLS-XB expansion boxes": "Kotak ekspansi TLS-XB",
    "Inputs, standard": "Input, standar",
    "Inputs, expanded": "Input, diperluas",
    "Lines leak tested": "Jalur yang diuji kebocorannya",
    "Up to 15": "Hingga 15",
    "8″ colour WVGA touchscreen": "Layar sentuh WVGA berwarna 8″",
    "Stored data": "Data tersimpan",
    "Three years": "Tiga tahun",
    "Network": "Jaringan",
    "Switched Ethernet, SSL": "Switched Ethernet, SSL",
    "Remote access": "Akses jarak jauh",
    "PLUS VIEW app": "Aplikasi PLUS VIEW",
    "Remote View app": "Aplikasi Remote View",
    "Web-enabled": "Berbasis web",
    "Two variants of one compact, self-contained console, for the smaller service station and for commercial and industrial sites monitoring six to twelve tanks. They differ in capacity and nothing else that matters day to day: TLS4 takes up to 12 inputs in standard configuration, TLS4B up to 6. Both reconcile meter transaction sales against AccuChart 3.0 tank calibration, so site variance is visible rather than inferred, and both flag unexplained inventory movements during quiet periods.": "Dua varian dari satu konsol ringkas dan mandiri, untuk SPBU berukuran lebih kecil serta lokasi komersial dan industri yang memantau enam hingga dua belas tangki. Keduanya berbeda dalam kapasitas dan tidak pada hal lain yang berarti dalam keseharian: TLS4 menampung hingga 12 input dalam konfigurasi standar, TLS4B hingga 6. Keduanya merekonsiliasi penjualan transaksi meter terhadap kalibrasi tangki AccuChart 3.0, sehingga selisih di lokasi terlihat dan bukan sekadar diperkirakan, dan keduanya menandai pergerakan inventori yang tidak dapat dijelaskan pada periode sepi.",
    "Customised home screen and favourites": "Layar utama dan favorit yang dapat disesuaikan",
    "Business inventory reconciliation": "Rekonsiliasi inventori bisnis",
    "Timed sudden loss detection": "Deteksi kehilangan mendadak berbasis waktu",
    "Built-in help for troubleshooting": "Bantuan bawaan untuk penelusuran masalah",
    "TLS4 inputs": "Input TLS4",
    "TLS4B inputs": "Input TLS4B",
    "Calibration": "Kalibrasi",
    "From 14 days": "Mulai 14 hari",
    "Reporting": "Pelaporan",
    "Daily, monthly, rolling": "Harian, bulanan, berjalan",
    "Probes": "Probe",
    "Magnetostrictive probes read product height, temperature and water continuously, with no moving parts to service. Which one a tank takes depends on how tall it is and whether it sits below ground or above it.": "Probe magnetostrictive membaca tinggi produk, suhu, dan kadar air secara berkelanjutan, tanpa bagian bergerak yang perlu diservis. Pilihan untuk sebuah tangki bergantung pada ketinggiannya dan apakah tangki berada di bawah atau di atas tanah.",
    "Magnetostrictive Probe": "Probe Magnetostrictive",
    "Stainless steel tubing with a high-grade polymer canister, reading product height, temperature and water continuously with nothing that wears. Water is the reading that earns its keep: catching it in the tank is what stops it reaching the submersible pump. Petrol, diesel, LPG and biofuels all report into the same system, and a probe is ordered for inventory control alone or with leak detection, with or without water detection.": "Pipa baja tahan karat dengan tabung polimer bermutu tinggi, membaca tinggi produk, suhu, dan kadar air secara berkelanjutan tanpa komponen yang aus. Pembacaan kadar air adalah yang paling berharga: menangkapnya di tangki itulah yang mencegahnya sampai ke pompa submersible. Bensin, solar, LPG, dan bahan bakar nabati semuanya dilaporkan ke sistem yang sama, dan probe dapat dipesan untuk kontrol inventori saja atau sekaligus dengan deteksi kebocoran, dengan atau tanpa deteksi air.",
    "Two variants cover the tank types.": "Dua varian mencakup tipe-tipe tangki.",
    "is the standard in-tank probe for forecourt tanks, underground or above.": "adalah probe dalam tangki standar untuk tangki forecourt, di bawah maupun di atas tanah.",
    "is the flexible version for tall aboveground tanks — fuel depots, marine terminals, aviation fuelling — measuring to 16.6 m on the TLS-450 family and putting bulk storage on the same console as the forecourt, rather than on a system of its own.": "adalah versi fleksibel untuk tangki tinggi di atas tanah — depot bahan bakar, terminal maritim, pengisian bahan bakar penerbangan — mengukur hingga 16,6 m pada keluarga TLS-450 dan menempatkan penyimpanan curah pada konsol yang sama dengan forecourt, alih-alih pada sistem tersendiri.",
    "Multipoint temperature measurement": "Pengukuran suhu multipoint",
    "Water detection before dispensing": "Deteksi air sebelum dispensing",
    "No routine maintenance": "Tanpa pemeliharaan rutin",
    "US EPA leak rate": "Laju kebocoran US EPA",
    "ICIM leak rate": "Laju kebocoran ICIM",
    "Linearity (Mag-XL)": "Linieritas (Mag-XL)",
    "Float kits": "Kit pelampung",
    "Minimum tank entry": "Lubang masuk tangki minimum",
    "Tank diameter": "Diameter tangki",
    "Inventory-only": "Hanya inventori",
    "Not sure which console": "Belum yakin konsol mana",
    "your site needs?": "yang dibutuhkan lokasi Anda?",
    "Tell us the tank count, the tank heights and whether you need continuous leak testing, and our team will scope the console, probes and sensors to match — and install and commission them.": "Beri tahu kami jumlah tangki, ketinggian tangki, dan apakah Anda memerlukan pengujian kebocoran berkelanjutan, dan tim kami akan menentukan konsol, probe, serta sensor yang sesuai — lalu memasang dan mengomisioningnya.",

    /* ---- catalogue: forecourt controllers ---- */
    /* Straplines mix model codes with descriptive words. The codes stay,
       the words around them translate. Straplines that are codes end to
       end — "— Series I · Series II", "— NP-3 · Ultra-Hi Flow",
       "— Standard · IQ · ISOTROL 1-8", "— Mag Plus · Mag-XL" — are not
       listed at all, because there is nothing in them to translate. */
    "— Enabler Express · PCI Express card · up to 32 dispensers": "— Enabler Express · kartu PCI Express · hingga 32 dispenser",
    "— Enabler Ethernet · appliance · up to 12 dispensers": "— Enabler Ethernet · perangkat mandiri · hingga 12 dispenser",
    "— Enabler Embedded · self-contained · up to 24 dispensers": "— Enabler Embedded · mandiri · hingga 24 dispenser",
    "— FDM & PDM · passive, active, advanced": "— FDM & PDM · pasif, aktif, lanjutan",
    "(UDC/IFSF, international, South Africa, China)": "(UDC/IFSF, internasional, Afrika Selatan, Tiongkok)",
    "ITL Enabler controllers in three formats, sharing one open API.": "Controller ITL Enabler dalam tiga format, berbagi satu API terbuka.",
    "ITL Enabler controllers link the dispensers, tank gauges and price signs to the point of sale through one open API. Three formats, with distribution modules that speak more than twenty pump protocols between them.": "Controller ITL Enabler menghubungkan dispenser, tank gauge, dan papan harga ke point of sale melalui satu API terbuka. Tiga format, dengan modul distribusi yang secara keseluruhan menguasai lebih dari dua puluh protokol pompa.",
    "Which format a site takes depends on whether there is a PC on the forecourt to host it, and on how many dispensers it has to carry. All three ship with the Version 4 software licence, the web interface and the same client API.": "Format mana yang dipakai sebuah lokasi bergantung pada ada tidaknya PC di forecourt untuk menampungnya, dan pada berapa banyak dispenser yang harus ditangani. Ketiganya disertai lisensi perangkat lunak Version 4, antarmuka web, dan API klien yang sama.",
    "Forecourt Controller": "Forecourt Controller",
    "A PCI Express card that puts the forecourt controller inside the site's own PC and fans out to four external distribution modules, which the dispensers, tank gauges and price signs wire into. Four serial ports, optically isolated, in two versions — with or without the LON interface for IFSF. Indicator LEDs on the card's bracket show communication status with the forecourt at a glance from the back of the host PC.": "Kartu PCI Express yang menempatkan forecourt controller di dalam PC milik lokasi itu sendiri dan bercabang ke empat modul distribusi eksternal, tempat dispenser, tank gauge, dan papan harga dikabelkan. Empat port serial, terisolasi secara optik, dalam dua versi — dengan atau tanpa antarmuka LON untuk IFSF. LED indikator pada braket kartu menunjukkan status komunikasi dengan forecourt secara sekilas dari bagian belakang PC induk.",
    "Four optically isolated serial ports": "Empat port serial terisolasi optik",
    "External FDM distribution": "Distribusi FDM eksternal",
    "Status LEDs on the bracket": "LED status pada braket",
    "Version 4 software as standard": "Perangkat lunak Version 4 sebagai standar",
    "Versions": "Versi",
    "Enabler Express LON — adds LON for IFSF": "Enabler Express LON — menambahkan LON untuk IFSF",
    "Bus": "Bus",
    "Operating system": "Sistem operasi",
    "Windows 7 and above": "Windows 7 ke atas",
    "32 dispensers via 4 FDMs": "32 dispenser melalui 4 FDM",
    "Serial ports": "Port serial",
    "Additional port": "Port tambahan",
    "Operating temperature": "Suhu operasi",
    "Full-height card — it does not fit low-profile or half-height Express slots. Operating environment otherwise follows the host PC.": "Kartu full-height — tidak muat pada slot Express low-profile atau half-height. Selebihnya, lingkungan operasinya mengikuti PC induk.",
    "The same controller as an appliance on the network rather than a card in a PC. Surface-mount, cable-less construction throughout, connecting to the pumps through plug-in distribution modules of up to three. Each module can be a different protocol, so a small site with two brands of dispenser is still one box.": "Controller yang sama, berupa perangkat mandiri di jaringan alih-alih kartu di dalam PC. Konstruksi surface-mount tanpa kabel secara menyeluruh, terhubung ke pompa melalui modul distribusi plug-in hingga tiga buah. Setiap modul dapat memakai protokol berbeda, sehingga lokasi kecil dengan dua merek dispenser tetap cukup satu unit.",
    "No host PC required": "Tanpa perlu PC induk",
    "Mixed protocols in one unit": "Protokol campuran dalam satu unit",
    "Web-based configuration and support": "Konfigurasi dan dukungan berbasis web",
    "Up to 12 dispensers": "Hingga 12 dispenser",
    "Distribution modules": "Modul distribusi",
    "Up to 3 PDMs, 4 channels each": "Hingga 3 PDM, masing-masing 4 kanal",
    "Interface": "Antarmuka",
    "Enabler API over TCP/IP": "Enabler API melalui TCP/IP",
    "A self-contained controller with the database, web server and client licences on board — 1 GB of solid-state memory, embedded SQL, a web server licence and Windows CE, with an external 12 V 5 A supply. Two capacities: the standard unit carries three distribution modules, the Expanded unit six, and a double-expanded version is available for larger sites.": "Controller mandiri dengan basis data, server web, dan lisensi klien sudah di dalamnya — memori solid-state 1 GB, SQL tertanam, lisensi server web, dan Windows CE, dengan catu daya eksternal 12 V 5 A. Dua kapasitas: unit standar membawa tiga modul distribusi, unit Expanded enam, dan versi double-expanded tersedia untuk lokasi yang lebih besar.",
    "Server and client licences included": "Lisensi server dan klien termasuk",
    "Embedded SQL database on board": "Basis data SQL tertanam di dalamnya",
    "Built-in web server": "Server web bawaan",
    "Solid state — no moving parts": "Solid state — tanpa bagian bergerak",
    "Standard — modules": "Standar — modul",
    "3 PDMs / 12 dispensers": "3 PDM / 12 dispenser",
    "Standard — weight": "Standar — berat",
    "Expanded — modules": "Expanded — modul",
    "6 PDMs / 24 dispensers": "6 PDM / 24 dispenser",
    "Expanded — weight": "Expanded — berat",
    "Memory": "Memori",
    "1 GB solid state": "1 GB solid state",
    "External 12 V 5 A": "Eksternal 12 V 5 A",
    "Variants": "Varian",
    "Standard": "Standar",
    "Expanded": "Expanded",
    "Double Expanded on request": "Double Expanded atas permintaan",
    "The controller does not wire to the pumps directly. Distribution modules sit between them, and the module is what determines which protocol a channel speaks — so a site with mixed dispenser brands is handled by ordering different modules, not different controllers.": "Controller tidak dikabelkan langsung ke pompa. Modul distribusi berada di antaranya, dan modul itulah yang menentukan protokol yang dipakai sebuah kanal — sehingga lokasi dengan merek dispenser campuran ditangani dengan memesan modul yang berbeda, bukan controller yang berbeda.",
    "Distribution Modules": "Modul Distribusi",
    "Enabler Express uses external Forecourt Distribution Modules (FDMs), each carrying up to eight fuelling positions with overload protection. Enabler Ethernet and Embedded use plug-in Pump Distribution Modules (PDMs) of four channels each. Modules come in three classes according to what the pump protocol demands.": "Enabler Express menggunakan Forecourt Distribution Module (FDM) eksternal, masing-masing menangani hingga delapan posisi pengisian dengan proteksi beban lebih. Enabler Ethernet dan Embedded menggunakan Pump Distribution Module (PDM) plug-in dengan empat kanal per modul. Modul tersedia dalam tiga kelas sesuai tuntutan protokol pompanya.",
    "Passive — no power supply required": "Pasif — tidak memerlukan catu daya",
    "Active": "Aktif",
    "Advanced": "Lanjutan",
    "Active and advanced modules need an external regulated DC supply, the voltage depending on type; the NZ Protocol module takes an AC supply. Passive modules need none. Tell us the pump brands on site and we will identify the modules.": "Modul aktif dan lanjutan memerlukan catu daya DC teregulasi eksternal, dengan tegangan sesuai tipenya; modul NZ Protocol memakai catu daya AC. Modul pasif tidak memerlukannya. Beri tahu kami merek pompa di lokasi Anda dan kami akan menentukan modulnya.",

    /* ---- catalogue: forecourt controllers, Version 4 software ---- */
    "Enabler Version 4 software": "Perangkat lunak Enabler Version 4",
    "One API, one web interface.": "Satu API, satu antarmuka web.",
    "Every Enabler ships with the same Version 4 software, so a client application written once deploys against Express, Ethernet or Embedded without change. Integration is a matter of two to three developer-weeks against the API rather than a ground-up build.": "Setiap Enabler disertai perangkat lunak Version 4 yang sama, sehingga aplikasi klien yang ditulis sekali dapat dijalankan pada Express, Ethernet, maupun Embedded tanpa perubahan. Integrasinya memakan waktu sekitar dua hingga tiga minggu kerja pengembang terhadap API, bukan pembangunan dari nol.",
    "API and SDK": "API dan SDK",
    ".NET native, Java native and COM APIs, with iOS and Android through Xamarin. The pump control interface is pre-built for ActiveX and .NET, so no forecourt GUI has to be written.": "API .NET native, Java native, dan COM, dengan iOS serta Android melalui Xamarin. Antarmuka kontrol pompa sudah tersedia untuk ActiveX dan .NET, sehingga tidak perlu menulis GUI forecourt sendiri.",
    "Multi-client": "Multi-klien",
    "Client-server architecture lets more than one application — multiple POS terminals, back office, head office — share the same forecourt. XML schemas are published for custom clients.": "Arsitektur klien-server memungkinkan lebih dari satu aplikasi — beberapa terminal POS, back office, kantor pusat — berbagi forecourt yang sama. Skema XML dipublikasikan untuk klien khusus.",
    "Web-based setup": "Penyiapan berbasis web",
    "Configuration, diagnosis and maintenance from any browser or tablet, with no separate tool to install. One configuration file can be pushed to any number of sites.": "Konfigurasi, diagnosis, dan pemeliharaan dari peramban atau tablet mana pun, tanpa perlu memasang alat terpisah. Satu berkas konfigurasi dapat dikirim ke sejumlah lokasi sekaligus.",
    "Remote site monitor": "Pemantau lokasi jarak jauh",
    "Live forecourt activity on every filling position, from anywhere, with recent events and deliveries per pump — so a reported fault is reviewed before anyone drives out.": "Aktivitas forecourt secara langsung pada setiap posisi pengisian, dari mana saja, lengkap dengan kejadian terbaru dan pengiriman per pompa — sehingga gangguan yang dilaporkan dapat ditinjau sebelum ada yang berangkat ke lokasi.",
    "Integrated reporting": "Pelaporan terintegrasi",
    "Built-in reports on fuel transactions and pump or system events, filtered down to specifics, accessible locally or remotely as soon as the activity happens.": "Laporan bawaan mengenai transaksi bahan bakar serta kejadian pompa atau sistem, dapat disaring hingga rinci, dan diakses secara lokal maupun jarak jauh segera setelah aktivitas terjadi.",
    "Open SQL database": "Basis data SQL terbuka",
    "All data lands in a documented ANSI SQL schema in real time, readable with standard tools — an open, published data model rather than a closed one.": "Seluruh data masuk ke skema ANSI SQL yang terdokumentasi secara waktu nyata, dapat dibaca dengan perkakas standar — model data yang terbuka dan dipublikasikan, bukan yang tertutup.",
    "Site applications": "Aplikasi lokasi",
    "Site Operations for day-to-day changes and delivery data, Configuration for setup, and Wetstock Maintenance for tanker deliveries, tank dips, tote reconciliation and gauge reporting.": "Site Operations untuk perubahan harian dan data pengiriman, Configuration untuk penyiapan, serta Wetstock Maintenance untuk pengiriman tangki, pengukuran manual tangki, rekonsiliasi tote, dan pelaporan gauge.",
    "Languages and regions": "Bahasa dan wilayah",
    "Fully Unicode aware, with built-in English, Spanish and Simplified Chinese, partial Indonesian, French, Italian, Portuguese, Thai, Russian and Slovenian, and regional currency and number formats.": "Sepenuhnya mendukung Unicode, dengan bahasa Inggris, Spanyol, dan Tionghoa Sederhana bawaan, sebagian bahasa Indonesia, Prancis, Italia, Portugis, Thai, Rusia, dan Slovenia, serta format mata uang dan angka sesuai wilayah.",

    /* ---- catalogue: forecourt controllers, interfaces ---- */
    "Interfaces": "Antarmuka",
    "One unit, most of the forecourt.": "Satu unit, hampir seluruh forecourt.",
    "Twenty-five years of forecourt interfacing sits behind the protocol library. One Enabler talks to mixed brands of dispenser on the same site, plus tank gauges, price signs and tagging systems.": "Dua puluh lima tahun pengalaman antarmuka forecourt berada di balik pustaka protokol ini. Satu Enabler dapat berkomunikasi dengan berbagai merek dispenser di lokasi yang sama, ditambah tank gauge, papan harga, dan sistem tagging.",
    "(dispenser, price sign, tank gauge)": "(dispenser, papan harga, tank gauge)",
    "(domestic/export)": "(domestik/ekspor)",
    "(formerly LG)": "(sebelumnya LG)",
    "(attendant tagging)": "(tagging petugas)",
    "(vehicle tagging)": "(tagging kendaraan)",
    "Tank gauges: Fafnir": "Tank gauge: Fafnir",
    ", IFSF and Veeder-Root compatible units including EBW, Franklin Fuelling Incon TLG, Omtec and OPW, plus Veeder-Root EMR3 and GVR EMR3 bulk meters. Ask us to confirm a specific model before ordering.": ", unit yang kompatibel dengan IFSF dan Veeder-Root termasuk EBW, Franklin Fuelling Incon TLG, Omtec, dan OPW, ditambah meter curah Veeder-Root EMR3 dan GVR EMR3. Hubungi kami untuk memastikan model tertentu sebelum memesan.",
    "Certification and support": "Sertifikasi dan dukungan",
    "RoHS compliant": "Memenuhi RoHS",
    "Designed and made in New Zealand": "Dirancang dan dibuat di Selandia Baru",
    "Annual software maintenance available": "Tersedia pemeliharaan perangkat lunak tahunan",
    "Automating a site,": "Mengotomasi sebuah lokasi,",
    "or replacing a controller?": "atau mengganti controller?",
    "Tell us the dispenser brands, the pump count and the POS you are integrating with, and our team will scope the controller, the distribution modules and the integration work to match.": "Beri tahu kami merek dispenser, jumlah pompa, dan POS yang akan diintegrasikan, dan tim kami akan menentukan controller, modul distribusi, serta pekerjaan integrasi yang sesuai.",

    /* ---- footer ---- */
    "Your technology one stop solution — serving the oil & gas, automation, automotive and fire protection industries in Indonesia since 1987.": "Solusi teknologi satu atap Anda — melayani industri minyak & gas, otomasi, otomotif, dan proteksi kebakaran di Indonesia sejak 1987.",
    "Our Companies": "Perusahaan Kami",
    "PT. Hanindo Automation Solutions": "PT. Hanindo Automation Solutions",
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
