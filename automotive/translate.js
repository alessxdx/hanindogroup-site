/* =====================================================================
   Hanindo Automotive — EN / Bahasa Indonesia toggle
   ---------------------------------------------------------------------
   Same mechanism as the other company sites: on load it walks the
   visible text and, where a phrase matches an entry below, swaps
   English <-> Bahasa Indonesia. The choice is remembered
   (localStorage) across the pages of this site only.

   Eleven pages: the five main ones and the six catalogue pages
   (airtec, lifts, raasm, service, tyre-service, welding).

   To EDIT a translation: find the English on the left, change the
   Indonesian on the right. To ADD one: copy a line and fill in both
   sides. The English side must match the page EXACTLY, including
   punctuation — the match is on the whole trimmed text node, not a
   substring.

   DELIBERATELY LEFT IN ENGLISH
   1. Names — the company, the principals (Airtec, HPA-Faip, RAASM,
      Brain Bee), our own brands (WELDANN, ATOM, HAKIRO), and every
      customer on the wall.
   2. Model codes — 89MXA, DL-3.5YD, GC-4.0PRO and the rest.
   3. Measurements and units — 3.5 T, 110–1000 mm, 220–240 VAC,
      ±0.5% FS. Numbers and SI units read the same either way.
   4. The street address, the phone number and the mailbox.
   5. Workshop vocabulary that Indonesian mechanics say in English.
      The Indonesian reviewer confirmed this for spooring, balancing,
      toe, camber and caster; the same applies to the rest of the
      alignment and tyre-machine set — setback, thrust angle, king pin
      angle, bead breaker, chuck, self-centring, unbalance, run-out.
      Translating those would read as less professional, not more.
      That list is the one worth a second opinion, rather than the
      three hundred strings around it.
   ===================================================================== */
(function () {
  var DICT = {
    /* ---- directions ---- */
    "Get directions": "Petunjuk arah",
    /* ---- navigation / header ---- */
    "Home": "Beranda",
    "About Us": "Tentang Kami",
    "Products & Services": "Produk & Layanan",
    "Projects": "Proyek",
    "Contact Us": "Hubungi Kami",
    "Your Solution Provider": "Mitra Solusi Anda",
    "Training Service": "Layanan Pelatihan",
    "Tyre Service": "Layanan Ban",
    "Lifts & Handling": "Lift & Penanganan",
    "Service Equipment": "Peralatan Servis",
    "Welding": "Pengelasan",

    /* ---- home ---- */
    "Automotive": "Otomotif",
    "PT. Hanindo Automotive equips the modern service bay — diagnostics, lifting and handling, tyre service and lubrication.": "PT. Hanindo Automotive melengkapi service bay modern — diagnostik, pengangkatan dan penanganan, layanan ban, dan pelumasan.",
    "The workshop, fully equipped.": "Bengkel, lengkap sepenuhnya.",
    "Hanindo Automotive equips and supports professional workshops with complete service bay solutions — from tyre changers, wheel balancers and 3D wheel alignment systems to vehicle lifts, diagnostics, fluid handling, lubrication systems and welding equipment. Every solution is backed by our engineering expertise, installation support and after-sales service.": "Hanindo Automotive melengkapi dan mendukung bengkel profesional dengan solusi service bay yang lengkap — mulai dari tyre changer, wheel balancer, dan sistem spooring 3D hingga lift kendaraan, alat diagnostik, penanganan fluida, sistem pelumasan, dan peralatan las. Setiap solusi didukung keahlian teknis, dukungan pemasangan, dan layanan purnajual kami.",
    "Sole distributor in Indonesia for Airtec, HPA-Faip and RAASM": "Distributor tunggal di Indonesia untuk Airtec, HPA-Faip, dan RAASM",
    "Own brands WELDANN and ATOM, supported by dedicated spare parts and warranty service": "Merek sendiri WELDANN dan ATOM, didukung suku cadang khusus dan layanan garansi",
    "Installation, commissioning and operator training by our own technicians": "Pemasangan, komisioning, dan pelatihan operator oleh teknisi kami sendiri",
    "RAASM fluid handling solutions supplied beyond workshops to lubricant distributors, industrial plants and mining operations": "Solusi penanganan fluida RAASM yang dipasok melampaui bengkel ke distributor pelumas, pabrik industri, dan operasi pertambangan",
    "What we supply": "Yang kami sediakan",
    "Wheel Alignment": "Spooring Roda",
    "Tyre Changer": "Tyre Changer",
    "Wheel Balancer": "Wheel Balancer",
    "Tyre Inflator": "Pengisi Angin Ban",
    "Car Lift": "Car Lift",
    "Lubrication": "Pelumasan",
    "Our Brands": "Merek Kami",
    "Sole distributor in Indonesia for Airtec, HPA-Faip and RAASM. WELDANN and ATOM are our own.": "Distributor tunggal di Indonesia untuk Airtec, HPA-Faip, dan RAASM. WELDANN dan ATOM adalah merek kami sendiri.",
    "Customer base": "Basis pelanggan",
    /* The sector labels on the customer wall. These are headings, not
       company names, so they translate — the logos and the .nm fallback
       names beside them stay in their own form. */
    "Vehicle manufacturers": "Produsen kendaraan",
    "Tyre, lubricant & service": "Ban, pelumas & servis",
    "Fleet, distribution & heavy equipment": "Armada, distribusi & alat berat",
    "Energy & industry": "Energi & industri",
    "Talk to Hanindo Automotive": "Hubungi Hanindo Automotive",
    "Fitting out a workshop,": "Melengkapi bengkel,",
    "or replacing a bay?": "atau mengganti isi satu bay?",
    "Tell us the bays you run and our team will specify the lifts, diagnostics and tyre equipment to match.": "Beri tahu kami bay yang Anda operasikan dan tim kami akan menentukan lift, alat diagnostik, dan peralatan ban yang sesuai.",
    "Email our team": "Email tim kami",
    "Contact page": "Halaman kontak",
    "Head Office": "Kantor Pusat",
    "Head office": "Kantor pusat",
    "Phone": "Telepon",
    "Email": "Email",
    "Tel:": "Tel:",
    "Photo needed": "Perlu foto",
    "Photo to follow": "Foto menyusul",

    /* ---- footer ---- */
    "Your technology one stop solution — serving the oil & gas, automation, automotive and fire protection industries in Indonesia since 1987.": "Solusi teknologi satu atap Anda — melayani industri minyak & gas, otomasi, otomotif, dan proteksi kebakaran di Indonesia sejak 1987.",
    "Our Companies": "Perusahaan Kami",
    "© 2026 Hanindo Group. All Rights Reserved.": "© 2026 Hanindo Group. Hak Cipta Dilindungi.",

    /* ---- about ---- */
    "About": "Tentang",
    "Us": "Kami",
    "Supplying, installing and servicing autoshop equipment, and building our own brands.": "Memasok, memasang, dan merawat peralatan bengkel, serta membangun merek kami sendiri.",
    "Company overview": "Profil perusahaan",
    /* The overview h2 is split by a <br/>, so it matches as two nodes. */
    "The Group’s Workshop": "Lini grup untuk peralatan bengkel",
    "& Industrial Equipment Arm": "& industri",
    "Singapore": "Singapura",
    "Italy": "Italia",
    "PT. Hanindo Automotive was established within the Hanindo Group in 2002, providing workshop and industrial equipment solutions designed to improve efficiency, productivity and ease of use.": "PT. Hanindo Automotive didirikan di dalam Hanindo Group pada tahun 2002, menyediakan solusi peralatan bengkel dan industri yang dirancang untuk meningkatkan efisiensi, produktivitas, dan kemudahan penggunaan.",
    "Beyond supplying equipment, we support the full lifecycle of every solution — from specification and installation to commissioning, operator training, spare parts and after-sales service. As the sole distributor in Indonesia for Airtec, HPA-Faip and RAASM, alongside our own brands WELDANN and ATOM, we equip workshops and industrial facilities with reliable solutions from a single partner.": "Lebih dari sekadar memasok peralatan, kami mendukung seluruh siklus hidup setiap solusi — dari penentuan spesifikasi dan pemasangan hingga komisioning, pelatihan operator, suku cadang, dan layanan purnajual. Sebagai distributor tunggal di Indonesia untuk Airtec, HPA-Faip, dan RAASM, bersama merek kami sendiri WELDANN dan ATOM, kami melengkapi bengkel dan fasilitas industri dengan solusi andal dari satu mitra.",
    "The principals we distribute": "Prinsipal yang kami distribusikan",
    "Sole distributor for Indonesia.": "Distributor tunggal untuk Indonesia.",
    "Digital tyre inflators — workshop, forecourt and plant": "Pengisi angin ban digital — bengkel, SPBU, dan pabrik",
    "Aligners, balancers & tyre changers": "Alat spooring, balancing & tyre changer",
    "Oil & lubrication equipment — workshop and industrial": "Peralatan oli & pelumasan — bengkel dan industri",
    "Our own brands": "Merek kami sendiri",
    "WELDANN and ATOM.": "WELDANN dan ATOM.",
    "Alongside the international manufacturers we represent, Hanindo Automotive develops and supplies equipment under our own brands — WELDANN and ATOM. We manage the specifications, spare parts, warranty and after-sales support to ensure reliable long-term performance.": "Selain produsen internasional yang kami wakili, Hanindo Automotive mengembangkan dan memasok peralatan di bawah merek kami sendiri — WELDANN dan ATOM. Kami mengelola spesifikasi, suku cadang, garansi, dan dukungan purnajualnya untuk memastikan kinerja yang andal dalam jangka panjang.",
    "Professional workshop equipment designed for demanding service environments, covering tyre service, lifts, fluid exchange, brake and diagnostic solutions. Supported by warranty, training and after-sales service across Southeast Asia.": "Peralatan bengkel profesional yang dirancang untuk lingkungan kerja berat, mencakup layanan ban, lift, penggantian fluida, serta solusi rem dan diagnostik. Didukung garansi, pelatihan, dan layanan purnajual di seluruh Asia Tenggara.",
    "A range of vehicle lifts including mid-rise, in-ground, on-ground scissor and two-post lifts from 3.5 to 4 tonnes. Built with quality components and safety features for reliable workshop operations.": "Rangkaian lift kendaraan meliputi scissor lift mid-rise, tanam, dan permukaan, serta lift dua tiang dari 3,5 hingga 4 ton. Dibuat dengan komponen berkualitas dan fitur keselamatan untuk operasional bengkel yang andal.",
    "Our direction": "Arah kami",
    "Vision & Mission": "Visi & Misi",
    "01 / Vision": "01 / Visi",
    "Vision": "Visi",
    "To be Indonesia’s trusted partner in building efficient, reliable and future-ready automotive service facilities.": "Menjadi mitra tepercaya Indonesia dalam membangun fasilitas layanan otomotif yang efisien, andal, dan siap menghadapi masa depan.",
    "02 / Mission": "02 / Misi",
    "Mission": "Misi",
    "Deliver reliable workshop equipment solutions from leading global brands and our own product lines.": "Menghadirkan solusi peralatan bengkel yang andal dari merek global terkemuka dan lini produk kami sendiri.",
    "Provide complete support from equipment selection and installation to training, spare parts and after-sales service.": "Memberikan dukungan menyeluruh mulai dari pemilihan dan pemasangan peralatan hingga pelatihan, suku cadang, dan layanan purnajual.",
    "Continuously improve our products and services to meet international standards of quality and safety.": "Terus menyempurnakan produk dan layanan kami untuk memenuhi standar mutu dan keselamatan internasional.",
    "Why choose us": "Mengapa memilih kami",
    "Why clients trust us": "Mengapa klien mempercayai kami",
    "Three things you can count on, from specifying the first bay through to long-term service.": "Tiga hal yang dapat Anda andalkan, dari penentuan bay pertama hingga layanan jangka panjang.",
    "Trusted Partner": "Mitra Tepercaya",
    "One of the Hanindo Group companies and the sole distributor in Indonesia for Airtec, HPA-Faip and RAASM.": "Salah satu perusahaan Hanindo Group sekaligus distributor tunggal di Indonesia untuk Airtec, HPA-Faip, dan RAASM.",
    "Quality You Can Rely On": "Kualitas yang Dapat Diandalkan",
    "Access to internationally recognised equipment brands alongside our own WELDANN and ATOM product lines.": "Akses ke merek peralatan yang diakui secara internasional bersama lini produk WELDANN dan ATOM milik kami sendiri.",
    "Complete Support": "Dukungan Menyeluruh",
    "From equipment selection and installation to operator training, spare parts and after-sales service — supported by our own team.": "Dari pemilihan dan pemasangan peralatan hingga pelatihan operator, suku cadang, dan layanan purnajual — didukung oleh tim kami sendiri.",

    /* ---- products & services ---- */
    "Products &": "Produk &",
    "Services": "Layanan",
    /* The kicker over the range, lower-cased, so it is a different node from
       the "Products &" / "Services" pair the hero splits. */
    "Products & services": "Produk & layanan",
    "Our product range": "Rangkaian produk kami",
    /* The Fluid Handling tile and its drop-down entry. "Lubrication & Fluid
       Handling" below is the longer form used on the range card. */
    "Fluid Handling": "Penanganan Fluida",
    "Tyre service and inflation, lifting and handling, service equipment, lubrication and welding — six ranges across the catalogue.": "Layanan ban dan pengisian angin, pengangkatan dan penanganan, peralatan servis, pelumasan, dan pengelasan — enam rangkaian dalam katalog.",
    "What we offer": "Yang kami tawarkan",
    "Professional equipment, from the service bay to the plant floor": "Peralatan profesional, dari service bay hingga lantai pabrik",
    "Equipment from leading international manufacturers, chosen to improve productivity, safety and service quality. Most of it fits out a workshop. The inflation and lubrication ranges reach further — the same equipment runs on forecourts, in depots and plants, and across mine sites.": "Peralatan dari produsen internasional terkemuka, dipilih untuk meningkatkan produktivitas, keselamatan, dan mutu layanan. Sebagian besar untuk melengkapi bengkel. Rangkaian pengisian angin dan pelumasan menjangkau lebih jauh — peralatan yang sama dipakai di SPBU, depo, pabrik, dan area tambang.",
    "Tyre changers, wheel balancers and 3D wheel alignment.": "Tyre changer, wheel balancer, dan spooring roda 3D.",
    "View products": "Lihat produk",
    /* Products & Services page: the catalogue was restyled and its heading,
       kicker and per-card link text all changed. Each card names what it
       leads to now, where every card used to say "View products". */
    "Products & services": "Produk & Layanan",
    "Our product range": "Rangkaian produk kami",
    "View tyre service equipment": "Lihat peralatan layanan ban",
    "View inflators": "Lihat pengisi angin",
    "View lifts & handling": "Lihat lift & penanganan",
    "View service equipment": "Lihat peralatan servis",
    "View fluid handling": "Lihat penanganan fluida",
    "View welding machines": "Lihat mesin las",
    /* Airtec range heading: was "Eight inflators." */
    "Digital tyre inflators.": "Pengisi angin ban digital.",
    "Tyre Inflation": "Pengisian Angin Ban",
    "Digital inflators — machine-mounted, high flow, high pressure and temperature compensating.": "Pengisi angin digital — terpasang pada mesin, aliran tinggi, tekanan tinggi, dan berkompensasi suhu.",
    "Scissor, two-post and four-post lifts, 3.5 to 4 tonnes.": "Scissor lift, lift dua tiang, dan lift empat tiang, 3,5 hingga 4 ton.",
    "Fluid exchange, brake lathe, A/C recycling and diagnostics.": "Penggantian fluida, bubut rem, daur ulang A/C, dan diagnostik.",
    "Lubrication & Fluid Handling": "Pelumasan & Penanganan Fluida",
    "Reels, pumps, dispensing, waste oil and centralised lubrication.": "Reel, pompa, dispensing, oli bekas, dan pelumasan terpusat.",
    "MMA and MIG/MMA inverters, 200 A to 700 A.": "Inverter MMA dan MIG/MMA, 200 A hingga 700 A.",

    /* ---- products & services: the services block ---- */
    "Support beyond the equipment": "Dukungan lebih dari sekadar alat",
    "Supplying the machine is the start. These services are quoted separately, so you take only what you need — and the training is open to anyone, not only to customers who buy equipment from us.": "Pengadaan mesin hanyalah awal. Layanan berikut ditawarkan terpisah, sehingga Anda hanya mengambil yang Anda butuhkan — dan pelatihannya terbuka untuk siapa saja, tidak hanya bagi pelanggan yang membeli peralatan dari kami.",
    "Technical Training": "Pelatihan Teknis",
    "Spooring and balancing courses.": "Pelatihan spooring dan balancing.",
    "Installation & Commissioning": "Pemasangan & Commissioning",
    "Delivery, installation and commissioning by our own team, with handover once the equipment is running.": "Pengiriman, pemasangan, dan commissioning oleh tim kami sendiri, dengan serah terima setelah alat berjalan.",
    "Maintenance & Spare Parts": "Pemeliharaan & Suku Cadang",
    "Service visits and genuine spare parts, backed by after-sales support from the team that installed the machine.": "Kunjungan servis dan suku cadang asli, didukung layanan purnajual dari tim yang memasang mesin tersebut.",
    "The training programme covers theory and practice, and is open to everyone:": "Program Pelatihan Meliputi Teori dan Praktek, Terbuka untuk Umum:",
    "Technical training": "Pelatihan Teknik",
    "Counter staff training": "Pelatihan Staf Konter",
    "Spooring & Balancing": "Spooring & Balancing",
    "30 hours · 12 theory, 18 practical · 10–15 per class": "30 jam · 12 teori, 18 praktik · 10–15 peserta per kelas",
    "24 hours · 12 theory, 12 practical · 15–20 per class": "24 jam · 12 teori, 12 praktik · 15–20 peserta per kelas",
    "Suspension and steering, the wheel angles that govern the direction a car travels — toe, camber, caster — and wheel balance. Practice covers setting the angles, reading alignment data and optimising balance.": "Suspensi dan kemudi, sudut-sudut roda yang menentukan arah jalannya mobil — toe, camber, caster — serta keseimbangan roda. Praktik mencakup penyetelan sudut, pembacaan data spooring, dan optimalisasi balancing.",
    "The same fundamentals, angled at the customer conversation: why a vehicle needs alignment and balancing, how to diagnose the complaint behind the booking, and how to talk a customer through the alignment printout.": "Dasar yang sama, difokuskan pada percakapan dengan pelanggan: mengapa kendaraan memerlukan spooring dan balancing, cara mengenali keluhan di balik permintaan servis, dan cara menjelaskan hasil cetak spooring kepada pelanggan.",
    "Courses run on site — a meeting room for the theory, a service bay for the practice — with materials supplied. Taught by a trainer with 33 years in spooring and balancing instruction, an automotive engineering graduate and BNSP Master Assessor. Every participant receives a Hanindo Automotive certificate of training; national competency certification through LSP Global Otomotif is available on request.": "Pelatihan diselenggarakan di lokasi — ruang rapat untuk teori, service bay untuk praktik — dengan materi disediakan. Diajar oleh instruktur dengan 33 tahun pengalaman mengajar spooring dan balancing, lulusan teknik otomotif dan Master Assessor BNSP. Setiap peserta menerima sertifikat pelatihan Hanindo Automotive; sertifikasi kompetensi nasional melalui LSP Global Otomotif tersedia atas permintaan.",
    "Ask for a quote": "Minta penawaran",
    "Request a quotation": "Minta penawaran",

    /* ---- projects ----
       The hero and the section head were about workshops only. The page now
       also carries a service station, an LNG plant, a lube truck and a mine
       supply base, so both were widened rather than left describing a third
       of the page. */
    "Work we have": "Pekerjaan yang telah",
    "delivered.": "kami kerjakan.",
    "Supplied, installed and commissioned across Indonesia.": "Dipasok, dipasang, dan dioperasikan di seluruh Indonesia.",
    "Selected work": "Pekerjaan terpilih",
    "Equipment we have installed.": "Peralatan yang telah kami pasang.",
    "Dealer workshops, tyre shops, service stations, plants and mine sites.": "Bengkel dealer, toko ban, SPBU, pabrik, dan area tambang.",
    /* The project decks. Each project adds a sector, a title and a scope
       line, so a new project needs three new entries here — the deck is
       plain text on the page and stays English otherwise. The count badge
       needs one entry per photo count actually in use, and "1 photo" is
       singular in both languages. */
    "1 photo": "1 foto",
    "2 photos": "2 foto",
    "3 photos": "3 foto",
    "4 photos": "4 foto",
    "5 photos": "5 foto",
    "6 photos": "6 foto",
    /* No sector entries here any more. The blue line on each deck is the
       CUSTOMER now, not the sector — Toyota, Sefas, Nissan and so on — and
       company names are deliberately left untranslated, as at the top of
       this file. The sector still appears in the scope line below it, and
       those lines are translated. */
    /* titles */
    "ATOM two-post lifts": "Lift dua tiang ATOM",
    "ATOM midrise scissor lifts": "Lift gunting midrise ATOM",
    "HPA-Faip tyre changer and balancer": "Alat ganti ban dan balancer HPA-Faip",
    /* "Tyre service" is the umbrella for a job with more than one of aligner,
       balancer and changer. It is the site's own category name — the Products
       & Services card of that name reads "Tyre changers, wheel balancers and
       3D wheel alignment" — so it is a term the site already defines rather
       than one invented for these cards. Spelling all three machines out ran
       past the two-line clamp on the deck. */
    "WELDANN tyre service and ATOM lifts": "Servis ban WELDANN dan lift ATOM",
    "WELDANN tyre service and RAASM suction": "Servis ban WELDANN dan suction RAASM",
    "RAASM lubrication systems": "Sistem pelumasan RAASM",
    "HPA-Faip wheel aligner and ATOM lifts": "Spooring roda HPA-Faip dan lift ATOM",
    /* "Spooring dan balancing" rather than a literal translation: that is the
       phrase Indonesian workshops put on their own signage, so it is what a
       reader is looking for. The deck was "HPA-Faip wheel alignment" until a
       fourth photo showed the B 45 balancer on the same job. */
    "HPA-Faip wheel aligner and balancer": "Spooring roda dan balancer HPA-Faip",
    "RAASM lube truck": "Truk pelumas RAASM",
    "HPA-Faip tyre service": "Servis ban HPA-Faip",
    /* Model number stays as it is printed on the machine — M 928 Royal is a
       name, not words, the same rule the principals get at the top of this
       file. Only "tyre changer" is translated. */
    "HPA-Faip tyre changer": "Alat ganti ban HPA-Faip",
    "RAASM oil drainers": "Penampung oli bekas RAASM",
    "BrainBee gas and smoke analysers": "Penganalisis gas dan asap BrainBee",
    "RAASM service module": "Modul servis RAASM",
    "AIRTEC tyre inflator": "Pengisi angin ban AIRTEC",
    /* Scope lines. NOT on the page at the moment: the deck sets the customer
       and the title over the photograph and has no room for a sentence under
       it. Kept because they are written and translated, and an unmatched
       entry costs nothing — DICT is only ever read, never walked against the
       page. Put the <p> back in the deck and these light up again. */
    "A full line of ATOM two-post lifts supplied and installed across the service bays of a Toyota dealer workshop.": "Satu lini penuh lift dua tiang ATOM yang dipasok dan dipasang di seluruh service bay bengkel dealer Toyota.",
    "An HPA-Faip M 54 Bravo Line tyre changer and a B 225 Evo wheel balancer installed in a B-Quik outlet.": "Alat ganti ban HPA-Faip M 54 Bravo Line dan balancer roda B 225 Evo yang dipasang di gerai B-Quik.",
    "A WELDANN 3D aligner, wheel balancer and tyre changer, with ATOM two-post lifts across the maintenance and EV bays of a new Chery dealer workshop.": "Spooring 3D, balancer roda, dan alat ganti ban WELDANN, dengan lift dua tiang ATOM di seluruh bay perawatan dan EV bengkel dealer Chery yang baru.",
    "A WELDANN 3D wheel aligner and S 2228 balancer with a RAASM suction pantograph, supplied and commissioned at a Mobeng outlet.": "Spooring roda 3D dan balancer S 2228 WELDANN dengan pantograph suction RAASM, dipasok dan dioperasikan di gerai Mobeng.",
    "ATOM 3500kg midrise scissor lifts installed across the service bays of a Jantra Kaki Kaki outlet.": "Lift gunting midrise ATOM 3500kg yang dipasang di seluruh service bay gerai Jantra Kaki Kaki.",
    "RAASM reels, meters and dispensing points built into a bulk lubrication bay for Sefas.": "Reel, meteran, dan titik dispensing RAASM yang dibangun dalam area pelumasan curah untuk Sefas.",
    "An HPA-Faip C880 wheel alignment system and scissor lifts for a Nissan dealer workshop.": "Sistem spooring roda HPA-Faip C880 dan scissor lift untuk bengkel dealer Nissan.",
    "HPA-Faip C880 wheel alignment, a B 45 wheel balancer and lifting equipment for a Daihatsu dealer workshop.": "Spooring roda HPA-Faip C880, balancer roda B 45, dan peralatan pengangkat untuk bengkel dealer Daihatsu.",
    "A lube truck built and fitted out with RAASM tanks, reels and dispensing for Primacon.": "Truk pelumas yang dibangun dan dilengkapi tangki, reel, serta dispensing RAASM untuk Primacon.",
    "An HPA-Faip C800 alignment system and tyre-changing equipment for a Dunlop tyre shop.": "Sistem spooring HPA-Faip C800 dan peralatan ganti ban untuk toko ban Dunlop.",
    "An HPA-Faip M 928 Royal tyre changer supplied and installed at the Pro Motor Mercedes-Benz dealer workshop in Jakarta.": "Alat ganti ban HPA-Faip M 928 Royal yang dipasok dan dipasang di bengkel dealer Mercedes-Benz Pro Motor di Jakarta.",
    "RAASM mobile oil drainers and dispensing units for a Toyota service outlet.": "Penampung oli bekas mobile dan unit dispensing RAASM untuk outlet servis Toyota.",
    "BrainBee gas and smoke analysers supplied, commissioned and handed over at the LNG plant in Bontang.": "Penganalisis gas dan asap BrainBee yang dipasok, dioperasikan, dan diserahterimakan di kilang LNG Bontang.",
    "A RAASM lubrication service module built onto a pickup for Intraco in Balikpapan.": "Modul servis pelumasan RAASM yang dibangun di atas pikap untuk Intraco di Balikpapan.",
    "An AIRTEC 89 BEP digital tyre inflator installed on the forecourt of a Total service station.": "Pengisi angin ban digital AIRTEC 89 BEP yang dipasang di area SPBU Total.",
    "Content needed": "Perlu konten",
    "Add Hanindo Automotive project references here": "Tambahkan referensi proyek Hanindo Automotive di sini",
    "This page is built and linked, but no project references have been supplied for Hanindo Automotive yet. Add each project as a card — client, location, scope and a photo — following the pattern used on the Fire Fighting projects page.": "Halaman ini sudah dibuat dan ditautkan, tetapi belum ada referensi proyek yang disediakan untuk Hanindo Automotive. Tambahkan setiap proyek sebagai kartu — klien, lokasi, lingkup pekerjaan, dan foto — mengikuti pola yang digunakan pada halaman proyek Fire Fighting.",
    "See the pattern": "Lihat polanya",

    /* ---- contact ---- */
    "Let's talk about": "Mari bicarakan",
    "your project.": "proyek Anda.",
    "Tell us what you are running or building, and we will put the right person on it.": "Beri tahu kami apa yang sedang Anda jalankan atau bangun, dan kami akan menugaskan orang yang tepat.",
    "How to reach us.": "Cara menghubungi kami.",
    "For workshop equipment, installation, calibration or spare parts, our Jakarta team is the first point of contact.": "Untuk peralatan bengkel, pemasangan, kalibrasi, atau suku cadang, tim Jakarta kami adalah kontak pertama Anda.",
    "Call center": "Call center",
    "Office hours": "Jam operasional",
    "— Monday to Friday, 08.00 – 17.00 WIB": "— Senin – Jumat, 08.00 – 17.00 WIB",

    /* ---- catalogue pages: shared furniture ---- */
    "The range": "Rangkaian produk",
    "All models": "Semua model",
    "Workshop": "Bengkel",
    "Mining": "Pertambangan",
    "Forecourt": "SPBU",
    "No models in that setting.": "Tidak ada model untuk penggunaan tersebut.",
    "Sectors": "Sektor",
    "All partners & principals": "Semua mitra & prinsipal",
    "Also supplied as the": "Juga dipasok sebagai",
    "Supplied with": "Disertakan dengan",

    /* ---- airtec ---- */
    "Eight inflators.": "Delapan pengisi angin.",
    "Every one reads to the same accuracy. They differ by where they mount, how much air they move, how high they go and who works them.": "Semuanya membaca dengan akurasi yang sama. Perbedaannya pada tempat pemasangan, besar aliran udara, tekanan maksimum, dan siapa yang mengoperasikannya.",
    "Compact Inflator": "Pengisi Angin Kompak",
    "General Purpose Inflator": "Pengisi Angin Serbaguna",
    "Heavy Duty Inflator": "Pengisi Angin Heavy Duty",
    "High Flow Inflator": "Pengisi Angin Aliran Tinggi",
    "High Pressure Inflator": "Pengisi Angin Tekanan Tinggi",
    "Temperature Compensating Inflator": "Pengisi Angin Berkompensasi Suhu",
    "Freestanding Inflator, Round": "Pengisi Angin Berdiri, Bulat",
    "Freestanding Inflator, Square": "Pengisi Angin Berdiri, Persegi",
    "Anywhere a tyre holds air.": "Di mana pun ban menahan angin.",
    "The workshop range is one part of what Airtec build. The same inflation technology runs on forecourts, in hangars and across mine sites, and Hanindo Automotive can supply beyond the service bay.": "Rangkaian untuk bengkel hanyalah sebagian dari yang dibuat Airtec. Teknologi pengisian angin yang sama dipakai di SPBU, hanggar, dan area tambang, dan Hanindo Automotive dapat memasok di luar service bay.",
    "Workshops, tyre shops and service centres": "Bengkel, toko ban, dan pusat layanan",
    "Petroleum Retail": "Ritel Perminyakan",
    "Forecourt inflators for customer use": "Pengisi angin SPBU untuk digunakan pelanggan",
    "Aviation": "Penerbangan",
    "High-pressure aircraft tyre inflation": "Pengisian angin ban pesawat bertekanan tinggi",
    "Mining & Construction": "Pertambangan & Konstruksi",
    "OTR tyres and high-flow plant work": "Ban OTR dan pekerjaan pabrik beraliran tinggi",
    "Transport": "Transportasi",
    "Depot inflation and axle load indicators": "Pengisian angin depo dan indikator beban gandar",
    "OEM & Vending": "OEM & Vending",
    "Inflation kits, vending units and nitrogen analysers": "Kit pengisian angin, unit vending, dan penganalisis nitrogen",
    "How many bays,": "Berapa bay,",
    "and how big are the tyres?": "dan sebesar apa bannya?",
    "Tell us where the inflator has to sit and what it has to fill — a changer in one bay, a row of them, a forecourt or a mine workshop — and we will specify the model, supply it and install it.": "Beri tahu kami di mana pengisi angin akan dipasang dan apa yang harus diisi — satu tyre changer di satu bay, sederet bay, SPBU, atau bengkel tambang — dan kami akan menentukan modelnya, memasoknya, dan memasangnya.",

    /* ---- lifts, service, welding, raasm, tyre-service: headings ---- */
    "Scissor, two-post and four-post lifts from 3.5 to 4 tonnes.": "Scissor lift, lift dua tiang, dan lift empat tiang dari 3,5 hingga 4 ton.",
    "Mid-Rise Scissor Car Lift": "Scissor Car Lift Mid-Rise",
    "In-Ground Mini Scissor Lift": "Mini Scissor Lift Tanam",
    "On-Ground Mini Scissor Lift": "Mini Scissor Lift Permukaan",
    "Ultra-Thin Main/Sub Scissor Car Lift": "Scissor Car Lift Utama/Sub Ultra-Tipis",
    "2-Post Car Lift": "Car Lift 2 Tiang",
    "4-Post Car Lift": "Car Lift 4 Tiang",
    "Automatic Tyre Changer": "Tyre Changer Otomatis",
    "Semi-Automatic Tyre Changer": "Tyre Changer Semi-Otomatis",
    "Semi-Automatic Car Tyre Changer": "Tyre Changer Mobil Semi-Otomatis",
    "Digital Wheel Balancer": "Wheel Balancer Digital",
    "Digital Wheel Balancer (Truck)": "Wheel Balancer Digital (Truk)",
    "Semi-Automatic Car Wheel Balancer": "Wheel Balancer Mobil Semi-Otomatis",
    "TV Monitor Wheel Balancer": "Wheel Balancer dengan Monitor TV",
    "Automatic Transmission Oil Exchanger": "Alat Ganti Oli Transmisi Otomatis",
    "Brake Lathe Bench Machine": "Mesin Bubut Rem Duduk",
    "A/C Recycling Service Station": "Stasiun Servis Daur Ulang A/C",
    "Catalytic Converter Cleaning Machine": "Mesin Pembersih Catalytic Converter",
    "Radiator Cooling System Machine": "Mesin Sistem Pendingin Radiator",
    "Oil Flushing Machine": "Mesin Flushing Oli",
    "Nitrogen Generator": "Generator Nitrogen",
    "Shaking Machine": "Mesin Pengocok",
    "Diagnostic Scan Tool": "Alat Pindai Diagnostik",
    "MMA Welding Machine": "Mesin Las MMA",
    "MIG / MMA Welding Machine": "Mesin Las MIG / MMA",
    "Automatic Tilt-Back Car Tyre Changer": "Tyre Changer Mobil Tilt-Back Otomatis",
    "3D Wheel Alignment System": "Sistem Spooring Roda 3D",
    "HHO Carbon Cleaning Machine — Automotive": "Mesin Pembersih Karbon HHO — Mobil",
    "HHO Carbon Cleaning Machine — Motorcycle": "Mesin Pembersih Karbon HHO — Motor",
    /* The RAASM catalogue's own sub-headings. "Hose & Cable Reels" below is
       the range card; these are the sections inside the catalogue page, where
       reels, pumps and equipment are listed apart. */
    "Hose Reels": "Reel Selang",
    "Cable Reels": "Reel Kabel",
    "Diaphragm Pumps": "Pompa Diafragma",
    "Pneumatic Pumps": "Pompa Pneumatik",
    "Oil Equipment": "Peralatan Oli",
    "Grease Equipment": "Peralatan Gemuk",
    "Diesel Fuel Equipment": "Peralatan Bahan Bakar Diesel",
    "Service Columns & Trolleys": "Kolom Servis & Troli",
    "Fluid Control — FCS": "Kontrol Fluida — FCS",
    "Fluid Level — FLS": "Level Fluida — FLS",
    "Hose & Cable Reels": "Reel Selang & Kabel",
    "Oil & Grease Dispensing": "Dispensing Oli & Gemuk",
    "Waste Oil Handling": "Penanganan Oli Bekas",
    "Fluid Level & Control": "Level & Kontrol Fluida",
    "Centralised Lubrication": "Pelumasan Terpusat",
    "Lube Trucks & Transport": "Truk Pelumas & Transportasi",
    "Moving a fluid,": "Memindahkan fluida,",
    "What RAASM builds.": "Yang dibuat RAASM.",
    "Eleven industries, one catalogue.": "Sebelas industri, satu katalog.",
    "Manufacturing": "Manufaktur",
    "Chemical Industry": "Industri Kimia",
    "Building & Road Construction": "Konstruksi Bangunan & Jalan",
    "Shipping & Offshore": "Pelayaran & Lepas Pantai",
    "Railway": "Perkeretaapian",
    "Agriculture": "Pertanian",
    "Aeronautics": "Aeronautika",

    /* ---- specification labels ----
       These repeat across every model, so a short list covers a great
       many rows. Values are left alone: numbers and SI units read the
       same in both languages. */
    "Pressure range": "Rentang tekanan",
    "Accuracy": "Akurasi",
    "Enclosure": "Casing",
    "Dimensions": "Dimensi",
    "Hose kit": "Set selang",
    "Hose": "Selang",
    "Hose clamp": "Klem selang",
    "Power supply": "Catu daya",
    "Units": "Satuan",
    "Flow rate": "Laju aliran",
    "Valve": "Katup",
    "Switches": "Sakelar",
    "Compensation": "Kompensasi",
    "Multi-tyre": "Multi-ban",
    "Column": "Kolom",
    "Column height": "Tinggi kolom",
    "Vandal resistant": "Tahan vandalisme",
    "Capacity": "Kapasitas",
    "Rated capacity": "Kapasitas terukur",
    "Lifting capacity": "Kapasitas angkat",
    "Lifting height": "Tinggi angkat",
    "Lifting time": "Waktu naik",
    "Decline time": "Waktu turun",
    "Table length": "Panjang meja",
    "Table width": "Lebar meja",
    "Total width": "Lebar total",
    "Total height": "Tinggi total",
    "Overall width": "Lebar keseluruhan",
    "Original height": "Tinggi awal",
    "Max lifting height": "Tinggi angkat maks.",
    "Min lifting height": "Tinggi angkat min.",
    "Min height": "Tinggi min.",
    "Secondary lifting height": "Tinggi angkat sekunder",
    "Main scissor capacity": "Kapasitas scissor utama",
    "Main lifting height": "Tinggi angkat utama",
    "Main table length": "Panjang meja utama",
    "Main table width": "Lebar meja utama",
    "Sub scissor capacity": "Kapasitas scissor sub",
    "Sub lifting height": "Tinggi angkat sub",
    "Sub table length": "Panjang meja sub",
    "Sub table width": "Lebar meja sub",
    "Pass width": "Lebar lintasan",
    "Single lane width": "Lebar jalur tunggal",
    "Lane spacing": "Jarak antar jalur",
    "Width between columns": "Lebar antar kolom",
    "Working height": "Tinggi kerja",
    "Air pressure": "Tekanan udara",
    "Working pressure": "Tekanan kerja",
    "Working air pressure": "Tekanan udara kerja",
    "Working gas pressure": "Tekanan gas kerja",
    "Operating pressure": "Tekanan operasi",
    "Max pressure": "Tekanan maks.",
    "Input air": "Udara masuk",
    "Pneumatic air supply": "Suplai udara pneumatik",
    "Weight": "Berat",
    "Net weight": "Berat bersih",
    "Gross weight": "Berat kotor",
    "Machine weight (net)": "Berat mesin (bersih)",
    "Machine weight (gross)": "Berat mesin (kotor)",
    "Machine dimensions": "Dimensi mesin",
    "Package": "Paket",
    "Packaging size": "Ukuran kemasan",
    "Voltage": "Tegangan",
    "Input voltage": "Tegangan input",
    "AC input voltage": "Tegangan input AC",
    "Supply voltage": "Tegangan suplai",
    "No-load voltage": "Tegangan tanpa beban",
    "Input frequency": "Frekuensi input",
    "Input power cable": "Kabel daya input",
    "Power": "Daya",
    "Motor power": "Daya motor",
    "Maximum power": "Daya maksimum",
    "Power consumption": "Konsumsi daya",
    "Power absorption": "Serapan daya",
    "Rated input power": "Daya input terukur",
    "Real current": "Arus nyata",
    "Current display range": "Rentang tampilan arus",
    "Rated duty cycle": "Siklus kerja terukur",
    "Insulation class": "Kelas isolasi",
    "Insulation level": "Tingkat isolasi",
    "Protection class": "Kelas proteksi",
    "Protection grade": "Tingkat proteksi",
    "Efficiency": "Efisiensi",
    "Cooling mode": "Mode pendinginan",
    "Air cooling": "Pendinginan udara",
    "Noise level": "Tingkat kebisingan",
    "Noise level running": "Tingkat kebisingan saat beroperasi",
    "Working temperature": "Suhu kerja",
    "Ambient temperature": "Suhu lingkungan",
    "Working humidity": "Kelembapan kerja",
    "Display": "Tampilan",
    "Display precision": "Presisi tampilan",
    "Dual display": "Tampilan ganda",
    "Camera resolution": "Resolusi kamera",
    "Measuring time": "Waktu pengukuran",
    "Spinning speed": "Kecepatan putar",
    "Drive speed": "Kecepatan penggerak",
    "Chuck rotation speed": "Kecepatan putar chuck",
    "Shaft diameter": "Diameter poros",
    "Rim diameter": "Diameter pelek",
    "Rim diameter (measurable)": "Diameter pelek (terukur)",
    "Rim diameter (setting range)": "Diameter pelek (rentang setelan)",
    "Rim width range": "Rentang lebar pelek",
    "Max tyre diameter": "Diameter ban maks.",
    "Max tyre width": "Lebar ban maks.",
    "Max tyre weight": "Berat ban maks.",
    "Max wheel diameter": "Diameter roda maks.",
    "Max wheel width": "Lebar roda maks.",
    "Max wheel weight": "Berat roda maks.",
    "Bead-breaker opening": "Bukaan bead breaker",
    "Bead-breaking power": "Daya bead breaker",
    "Inner clamping size": "Ukuran cekam dalam",
    "Outer clamping size": "Ukuran cekam luar",
    "Inside clamp": "Cekam dalam",
    "Outside clamp": "Cekam luar",
    "Max self-centring torque": "Torsi self-centring maks.",
    "Balancing accuracy": "Akurasi balancing",
    "Unbalance accuracy": "Akurasi unbalance",
    "Max unbalance calculated": "Unbalance maks. terhitung",
    "Turning accuracy": "Akurasi putar",
    "Individual toe": "Toe individual",
    "Total toe": "Toe total",
    "Steering angle difference": "Selisih sudut kemudi",
    "Max steering": "Sudut kemudi maks.",
    "Track width": "Lebar jejak",
    "Wheelbase": "Jarak sumbu roda",
    "Flange to machine distance": "Jarak flange ke mesin",
    "Brake runout": "Run-out rem",
    "Type": "Tipe",
    "Configuration": "Konfigurasi",
    "Tank": "Tangki",
    "Storage tank capacity": "Kapasitas tangki penyimpanan",
    "New/used fluid tank": "Tangki fluida baru/bekas",
    "Fluid draining hose": "Selang pembuangan fluida",
    "Fluid outlet hose": "Selang keluar fluida",
    "Fluid return hose": "Selang balik fluida",
    "Quick joint size": "Ukuran quick joint",
    "Oil bottle": "Botol oli",
    "Mask and brush": "Masker dan sikat",
    "Refrigerant": "Refrigeran",
    "Vacuum pump": "Pompa vakum",
    "Ultimate vacuum": "Vakum akhir",
    "Filter precision": "Presisi filter",
    "Water consumption": "Konsumsi air",
    "Nitrogen purity": "Kemurnian nitrogen",
    "Nitrogen process speed": "Kecepatan proses nitrogen",
    "Rated gas production": "Produksi gas terukur",
    "Compressor": "Kompresor",
    "Diaphragm": "Diafragma",
    "Belt": "Sabuk",
    "Spring": "Pegas",
    "Pneumatic": "Pneumatik",
    "Manual": "Manual",
    "Motorised": "Bermotor",
    "Trolley-mounted": "Terpasang pada troli",
    "Swing-arm": "Lengan ayun",
    "Printer": "Printer",
    "Gas loadcell": "Load cell gas",
    "Rotary slip rings": "Slip ring rotari",
    "Pressure gauge": "Alat ukur tekanan",
    "Electrode diameter": "Diameter elektroda",
    "MMA electrode": "Elektroda MMA",
    "MIG solid wire diameter": "Diameter kawat solid MIG",
    "MIG flux wire diameter": "Diameter kawat flux MIG",
    "Spot welding": "Las titik",
    "Cleaning": "Pembersihan",
    "Service columns": "Kolom servis",
    "Ram hoists": "Ram hoist",
    "Metered guns": "Gun terukur",
    "Ratio pumps": "Pompa rasio",
    "Pumps": "Pompa",
    "Drainers": "Alat pembuangan",
    "Suction units": "Unit pengisap",
    "Trolleys": "Troli",
    "Single line": "Jalur tunggal",
    "Dual line": "Jalur ganda",
    "Progressive": "Progresif",
    "Round profile": "Profil bulat",
    "Square profile": "Profil persegi",
    "Low range option": "Opsi rentang rendah",
    "Yes": "Ya",

    /* ---- catalogue page leads ----
       The one-line summary under each catalogue hero. Shorter than the
       full intros further down, and easy to miss because they sit in a
       .lead rather than a paragraph. */
    "Digital inflators for the workshop, forecourt, depot and mine.": "Pengisi angin digital untuk bengkel, SPBU, depo, dan tambang.",
    "Hose reels, pumps, dispensing and centralised lubrication.": "Reel selang, pompa, dispensing, dan pelumasan terpusat.",
    "MMA and MIG/MMA inverter welding machines, 200 A to 700 A.": "Mesin las inverter MMA dan MIG/MMA, 200 A hingga 700 A.",

    /* ---- catalogue prose: airtec ---- */
    "Digital tyre inflation, built in Singapore. Wall-mounted, machine-mounted and high-flow inflators for the service bay, the forecourt, the hangar and the mine.": "Pengisian angin ban digital, dibuat di Singapura. Pengisi angin dinding, terpasang mesin, dan aliran tinggi untuk service bay, SPBU, hanggar, dan tambang.",
    "Airtec Corporation builds digital tyre inflation equipment in Singapore, to ISO 9001:2015 certified by SGS. An automatic inflator takes a target pressure and holds a tyre to it — no gauge, no operator standing over it. The range runs from a compact unit that mounts on the tyre changer itself to weather-sealed wall models, high-flow and high-pressure units for fleet and mine work, and vandal-resistant pedestals for a forecourt.": "Airtec Corporation membuat peralatan pengisian angin ban digital di Singapura, dengan sertifikasi ISO 9001:2015 dari SGS. Pengisi angin otomatis menerima tekanan target dan menjaga ban tetap pada tekanan itu — tanpa alat ukur, tanpa operator yang harus menunggui. Rangkaiannya mulai dari unit ringkas yang dipasang langsung pada tyre changer hingga model dinding tersegel cuaca, unit aliran tinggi dan tekanan tinggi untuk armada dan tambang, serta unit berdiri tahan vandalisme untuk SPBU.",
    "Small enough to mount on the tyre changer itself, so the inflator sits where the wheel already is. Passenger cars, vans and light commercials.": "Cukup kecil untuk dipasang langsung pada tyre changer, sehingga pengisi angin berada tepat di tempat roda sudah berada. Mobil penumpang, van, dan kendaraan niaga ringan.",
    "The workshop default. Wall or surface mounted and sealed against weather, so it works in an open bay, and rated for anything pneumatic from a trolley wheel to a truck tyre.": "Pilihan standar bengkel. Dipasang di dinding atau permukaan dan tersegel terhadap cuaca, sehingga dapat bekerja di bay terbuka, serta sanggup menangani segala kebutuhan pneumatik dari roda troli hingga ban truk.",
    "Diecast aluminium for bays that take knocks. The XDD carries two displays, set pressure and actual, so an operator can watch a tyre come up rather than wait for the beep.": "Aluminium cetak untuk bay yang sering terbentur. XDD memiliki dua tampilan, tekanan setelan dan tekanan aktual, sehingga operator dapat memantau ban terisi alih-alih menunggu bunyi bip.",
    "Built for volume. A half-inch valve moves over 4,000 litres a minute, and a four-way manifold lets one unit fill several tyres at once — fleet workshops and mine sites, where the job is a set of six rather than a single wheel.": "Dirancang untuk volume besar. Katup setengah inci mengalirkan lebih dari 4.000 liter per menit, dan manifold empat arah memungkinkan satu unit mengisi beberapa ban sekaligus — bengkel armada dan area tambang, di mana pekerjaannya satu set enam roda, bukan satu roda.",
    "Takes the ceiling to 12.5 bar for truck, heavy vehicle and mining tyres, and moves the same volume as the high flow unit. Works with standard or large-bore valves and core extraction tools.": "Menaikkan batas hingga 12,5 bar untuk ban truk, kendaraan berat, dan tambang, dengan volume aliran yang sama seperti unit aliran tinggi. Bekerja dengan katup standar maupun large bore serta alat pelepas core.",
    "For OTR and mining tyres. It reads the air temperature inside the tyre as well as the pressure, then corrects the fill against a defined ambient using a programmed temperature/pressure table — so a tyre set hot in the pit is still right once it cools.": "Untuk ban OTR dan tambang. Unit ini membaca suhu udara di dalam ban selain tekanannya, lalu mengoreksi pengisian terhadap suhu lingkungan yang ditentukan menggunakan tabel suhu/tekanan terprogram — sehingga ban yang diisi dalam keadaan panas di area tambang tetap tepat setelah dingin.",
    "A pedestal for the forecourt, where the customer works the unit rather than a technician. Round column, and a vandal-resistant faceplate because it stands unattended.": "Unit berdiri untuk SPBU, di mana pelanggan yang mengoperasikannya, bukan teknisi. Kolom bulat, dengan faceplate tahan vandalisme karena berdiri tanpa penjagaan.",
    "The same forecourt duty on a square column, which suits a site whose canopy and pump islands are already squared off.": "Fungsi SPBU yang sama pada kolom persegi, cocok untuk lokasi yang kanopi dan pulau pompanya sudah bergaris persegi.",

    /* ---- catalogue prose: raasm ---- */
    "Fluid handling and lubrication equipment from Vicenza, Italy — hose reels, pumps, dispensing and centralised lubrication systems. Wherever a fluid has to be stored, moved, measured or dispensed, in a workshop or on a plant floor.": "Peralatan penanganan fluida dan pelumasan dari Vicenza, Italia — reel selang, pompa, dispensing, dan sistem pelumasan terpusat. Di mana pun fluida harus disimpan, dipindahkan, diukur, atau dikeluarkan, di bengkel maupun di lantai pabrik.",
    "RAASM builds fluid handling equipment in Vicenza, Italy — hose and cable reels, pneumatic and diaphragm pumps, oil and grease dispensing, waste oil handling, diesel equipment and centralised lubrication. Its FLS and FCS systems carry that further, monitoring what is left in every drum and tank and recording who drew what from it. Single units, or a whole lubrication system specified together.": "RAASM membuat peralatan penanganan fluida di Vicenza, Italia — reel selang dan reel kabel, pompa pneumatik dan diafragma, dispensing oli dan gemuk, penanganan oli bekas, peralatan solar, dan pelumasan terpusat. Sistem FLS dan FCS-nya melangkah lebih jauh, memantau sisa isi setiap drum dan tangki serta mencatat siapa yang mengambil apa dari sana. Dijual sebagai unit tunggal, atau dirancang bersama sebagai satu sistem pelumasan utuh.",
    "Six families, sold as single units or specified together as a system.": "Enam rangkaian, dijual sebagai unit tunggal atau dirancang bersama sebagai satu sistem.",
    "Spring, manual and motorised reels for oil, grease, air, water, diesel and AdBlue, plus cable reels for the same bays.": "Reel pegas, manual, dan bermotor untuk oli, gemuk, udara, air, solar, dan AdBlue, ditambah reel kabel untuk bay yang sama.",
    "Pneumatic ratio pumps and air-operated diaphragm pumps, sized by the fluid and the distance it has to travel.": "Pompa rasio pneumatik dan pompa diafragma bertenaga udara, dipilih menurut jenis fluida dan jarak yang harus ditempuh.",
    "Metered guns, dispensers and service columns for oil, grease, antifreeze and screenwash, plus brake bleeders and tyre inflators.": "Gun terukur, dispenser, dan kolom servis untuk oli, gemuk, antifreeze, dan air wiper, ditambah alat buang angin rem dan pengisi angin ban.",
    "Gravity drainers, suction units and combined drainer-suction trolleys for taking used oil out cleanly and storing it safely.": "Alat pembuangan gravitasi, unit pengisap, dan troli gabungan pembuangan-pengisapan untuk mengeluarkan oli bekas secara bersih dan menyimpannya dengan aman.",
    "Single-line, dual-line and progressive systems that lubricate a machine or a whole line on schedule, without stopping it.": "Sistem jalur tunggal, jalur ganda, dan progresif yang melumasi satu mesin atau seluruh lini sesuai jadwal, tanpa menghentikannya.",
    "FLS level monitoring and FCS fluid control — knowing what is in every drum and tank, and who drew what from it.": "Pemantauan level FLS dan kontrol fluida FCS — mengetahui isi setiap drum dan tangki, serta siapa yang mengambil apa dari sana.",
    "RAASM equipment is specified across eleven sectors. The workshop is the one most people know, but the pumps and reels on a service bay are the same ones feeding a production line or a mine fleet — and Hanindo Automotive supplies both.": "Peralatan RAASM digunakan di sebelas sektor. Bengkel adalah yang paling dikenal banyak orang, tetapi pompa dan reel di sebuah service bay sama dengan yang memasok lini produksi atau armada tambang — dan Hanindo Automotive memasok keduanya.",
    "Service bays, fast-fit chains and dealer workshops": "Service bay, jaringan fast-fit, dan bengkel dealer",
    "Production lines and machine lubrication": "Lini produksi dan pelumasan mesin",
    "Fleet workshops and heavy equipment servicing": "Bengkel armada dan servis alat berat",
    "Transfer and dosing of aggressive fluids": "Transfer dan dosis fluida agresif",
    "Mobile lubrication units and depot fleets": "Unit pelumasan bergerak dan armada depo",
    "Engine rooms, deck equipment and yards": "Ruang mesin, peralatan dek, dan galangan",
    "Rolling stock depots and maintenance sheds": "Depo sarana perkeretaapian dan gudang pemeliharaan",
    "Hangar servicing and ground support": "Servis hanggar dan dukungan darat",
    "Machinery servicing and on-farm fuel handling": "Servis mesin dan penanganan bahan bakar di lahan pertanian",
    "Plant maintenance on and off site": "Pemeliharaan pabrik di dalam maupun luar lokasi",
    "Pressure washing and detergent distribution": "Pencucian bertekanan dan distribusi deterjen",
    "wherever you are moving it.": "ke mana pun Anda memindahkannya.",
    "Tell us the fluid, the distance and the duty — a single reel over a service bay, or a lubrication system across a plant — and our engineers will specify the RAASM equipment for it, supply it and commission it.": "Beri tahu kami jenis fluidanya, jaraknya, dan bebannya — satu reel di atas service bay, atau sistem pelumasan untuk seluruh pabrik — dan insinyur kami akan menentukan peralatan RAASM yang sesuai, memasoknya, dan mengoperasikannya.",

    /* ---- catalogue prose: service equipment ---- */
    "Fluid exchange, brake, air-conditioning, carbon cleaning and diagnostics.": "Penggantian fluida, rem, penyejuk udara, pembersihan karbon, dan diagnostik.",
    "OE-level full system diagnostics — read and clear DTCs, read/compare/save data stream, version information, special functions and advanced coding": "Diagnostik sistem penuh setara OE — membaca dan menghapus DTC, membaca/membandingkan/menyimpan data stream, informasi versi, fungsi khusus, dan coding lanjutan",
    "Supports DOIP diagnosis and CAN FD protocols with wide vehicle coverage": "Mendukung diagnosis DOIP dan protokol CAN FD dengan cakupan kendaraan yang luas",
    "Plug and play; supports THINKCAR modules over USB or Bluetooth": "Plug and play; mendukung modul THINKCAR melalui USB atau Bluetooth",
    "Supplied brand — not a Hanindo house brand.": "Merek yang dipasok — bukan merek milik Hanindo.",

    /* ---- catalogue prose: tyre service ---- */
    "Eighteen models from HPA-Faip, WELDANN and Hakiro. Specifications are taken from the Hanindo Automotive catalogue — contact us for pricing, lead time and installation.": "Delapan belas model dari HPA-Faip, WELDANN, dan Hakiro. Spesifikasi diambil dari katalog Hanindo Automotive — hubungi kami untuk harga, waktu pengiriman, dan pemasangan.",
    "8 models. Specifications are taken from the Hanindo Automotive catalogue — contact us for pricing, lead time and installation.": "8 model. Spesifikasi diambil dari katalog Hanindo Automotive — hubungi kami untuk harga, waktu pengiriman, dan pemasangan.",
    "Six models, digital and TV-monitor, car through truck.": "Enam model, digital dan monitor TV, dari mobil hingga truk.",
    "Mechanically identical to the B60 — the B55 reads out on a high-brightness digital LED display panel.": "Secara mekanis identik dengan B60 — B55 menampilkan hasil pada panel LED digital dengan kecerahan tinggi.",
    "Mechanically identical to the B55 — the B60 uses a high-resolution LCD monitor, giving the software a richer, more detailed graphical layout.": "Secara mekanis identik dengan B55 — B60 menggunakan monitor LCD resolusi tinggi, memberi perangkat lunaknya tampilan grafis yang lebih kaya dan rinci.",
    "Mechanically identical to the B325 — the B225 reads out on a double digital LED display panel with a manual keyboard.": "Secara mekanis identik dengan B325 — B225 menampilkan hasil pada panel LED digital ganda dengan papan ketik manual.",
    "Mechanically identical to the B225 — the B325 upgrades to a 19″ widescreen LCD colour monitor, showing high-resolution graphic interfaces.": "Secara mekanis identik dengan B225 — B325 ditingkatkan dengan monitor warna LCD layar lebar 19″, menampilkan antarmuka grafis resolusi tinggi.",
    "Four models — one semi-automatic swing-arm, three automatic tilting-post, 21\" through 24\".": "Empat model — satu semi-otomatis lengan ayun, tiga otomatis tilting-post, 21″ hingga 24″.",
    "The arm swings aside by hand rather than tilting back, so the machine can stand against a wall — the smallest footprint in the range. The mounting head is reset by hand for each wheel. Optional": "Lengannya diayun ke samping dengan tangan alih-alih dimiringkan ke belakang, sehingga mesin dapat ditempatkan menempel dinding — jejak ruang terkecil dalam rangkaian ini. Kepala pemasangan disetel ulang secara manual untuk setiap roda. Opsional",
    "The heavy-duty model: a reinforced chassis that resists flex on stiff sidewalls, so it suits high-volume tyre centres, low-profile and run-flat work. Shown fitted with the optional": "Model heavy-duty: sasis diperkuat yang tahan lentur pada dinding ban kaku, sehingga cocok untuk pusat ban bervolume tinggi serta pekerjaan ban profil rendah dan run-flat. Ditampilkan dengan tambahan opsional",
    "bead-pressing helper arm. Also available as the": "lengan bantu penekan bead. Tersedia juga sebagai",
    ", a lever-less version that lifts the bead over the rim without a tyre iron.": ", versi tanpa tuas yang mengangkat bead melewati pelek tanpa linggis ban.",
    "The general workshop model. The post tilts back on a pedal and returns the tool head to the same setting, so a matched set of wheels runs without readjusting. Needs clear space behind for the tilt.": "Model bengkel umum. Tiangnya dimiringkan ke belakang dengan pedal dan mengembalikan kepala alat ke setelan yang sama, sehingga satu set roda seragam dapat dikerjakan tanpa penyetelan ulang. Membutuhkan ruang kosong di belakang untuk kemiringannya.",
    "The M422 with 24″ rim capacity — the same tilting post and pedal-set tool head, sized for larger alloy wheels and light SUVs.": "M422 dengan kapasitas pelek 24″ — tiang miring dan kepala alat berpedal yang sama, dirancang untuk pelek aloi lebih besar dan SUV ringan.",
    "Bead-breaking power (at 10 bar)": "Daya bead breaker (pada 10 bar)",
    ", the two-speed version — the weight above is for that model.": ", versi dua kecepatan — berat di atas adalah untuk model tersebut.",
    "Two-camera 3D alignment, standard and i-Next.": "Spooring 3D dua kamera, standar dan i-Next.",
    "Five models — tyre changers, wheel balancers and 3D alignment.": "Lima model — tyre changer, wheel balancer, dan spooring 3D.",
    "Automatic Car Wheel Balancer with LCD Display": "Wheel Balancer Mobil Otomatis dengan Layar LCD",
    "One model — a semi-automatic swing-arm tyre changer.": "Satu model — tyre changer semi-otomatis lengan ayun.",
    "The arm swings aside by hand rather than tilting back, so the machine can stand against a wall — the same layout as the HPA-Faip M31.": "Lengannya diayun ke samping dengan tangan alih-alih dimiringkan ke belakang, sehingga mesin dapat ditempatkan menempel dinding — tata letak yang sama seperti HPA-Faip M31.",

    /* ---- catalogue prose: welding ---- */
    "MMA and MIG/MMA inverter welding machines for workshop and industrial use.": "Mesin las inverter MMA dan MIG/MMA untuk penggunaan bengkel dan industri.",
    "Shares its cabinet with the MMA-700F — the two look alike; the difference is in the rating.": "Menggunakan kabinet yang sama dengan MMA-700F — keduanya tampak serupa; perbedaannya pada ratingnya.",
    "Shares its cabinet with the MMA-400F — the two look alike; the difference is in the rating.": "Menggunakan kabinet yang sama dengan MMA-400F — keduanya tampak serupa; perbedaannya pada ratingnya.",
    "MIG/MMA big current, for industrial duty": "MIG/MMA arus besar, untuk penggunaan industri",
    "Auto-set function, 3 in 1": "Fungsi auto-set, 3 in 1",
    "IGBT – Module, 15 kg wire spool": "Modul IGBT, spool kawat 15 kg",

    /* ---- spec values that are words rather than numbers ----
       Most values are left alone, being figures and SI units. These few
       read as English sentences, so they translate. */
    "Diecast aluminium, wall or surface mount (IP66)": "Aluminium cetak, pemasangan dinding atau permukaan (IP66)",
    "Diecast aluminium wall mount (IP66)": "Aluminium cetak, pemasangan dinding (IP66)",
    "Dual display — set and actual pressure": "Tampilan ganda — tekanan setelan dan aktual",
    "High flow ½″, standard or large bore": "Aliran tinggi ½″, standar atau large bore",
    "Wet and dry tyre, against defined ambient": "Ban basah dan kering, terhadap suhu lingkungan yang ditentukan",
    "single speed — 0.75 kW": "kecepatan tunggal — 0,75 kW",
    "Machine weight (M422 2V FS)": "Berat mesin (M422 2V FS)",
    "Machine weight (M424 2V FS)": "Berat mesin (M424 2V FS)",
    "±2 mm  (range 1219–2439 mm)": "±2 mm  (rentang 1219–2439 mm)",
    "±2 mm  (range 2006–4572 mm)": "±2 mm  (rentang 2006–4572 mm)",

    /* ---- model configuration lines ----
       The code and the rim size stay; the layout and the phase count are
       words, so they turn over. */
    "— M31 · swing-arm · 21″ · 1ph": "— M31 · lengan ayun · 21″ · 1 fasa",
    "— M54 · tilting-post, heavy-duty · 24″ · 1 or 3ph": "— M54 · tilting-post, heavy-duty · 24″ · 1 atau 3 fasa",
    "— M422 · tilting-post · 22″ · 3ph": "— M422 · tilting-post · 22″ · 3 fasa",
    "— M424 · tilting-post · 24″ · 3ph": "— M424 · tilting-post · 24″ · 3 fasa",
    "— JA-C01 · swing-arm · 20″": "— JA-C01 · lengan ayun · 20″",
    "— C880 STD · 2 camera": "— C880 STD · 2 kamera",
    "— C880 i-Next · 2 camera": "— C880 i-Next · 2 kamera",
    "High impact polycarbonate (IP40)": "Polikarbonat berdaya tahan benturan tinggi (IP40)",
    "High impact polycarbonate (IP66)": "Polikarbonat berdaya tahan benturan tinggi (IP66)",
    "Stainless steel (piezo optional)": "Baja tahan karat (piezo opsional)",
    "Double digital LED panel": "Panel LED digital ganda",
    "High-brightness LED panel": "Panel LED kecerahan tinggi",
    "High-resolution LCD monitor": "Monitor LCD resolusi tinggi",
    "Quantity per 20′ container": "Jumlah per kontainer 20′",
    "Steering difference at 20°": "Selisih sudut kemudi pada 20°",
    "Weight — camera arm": "Berat — lengan kamera",
    "Weight — PC holder": "Berat — dudukan PC",
    "Weight — pole": "Berat — tiang",
    "Single phase 220 V": "Satu fasa 220 V",
    "Weight (G.W/N.W)": "Berat (kotor/bersih)"
  };

  var LANG_KEY = 'ha_auto_lang', ALT = 'id', HTML_LANG = 'id';
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
