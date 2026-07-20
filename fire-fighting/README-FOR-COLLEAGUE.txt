HANINDO CITRA — FIRE FIGHTING SITE
=====================================================

WHAT THIS IS
------------
A STATIC website. Plain HTML/CSS/JS — no PHP, no database, no build
step. Runs on the existing Qwords hosting ALONGSIDE the Joomla site.

FILES
-----
!! IMPORTANT — THIS CHANGED. The pages no longer work as a folder on
!! their own. They now load their stylesheets from a SHARED /assets/
!! folder that sits NEXT TO fire-fighting/, not inside it. Upload
!! fire-fighting/ by itself and every page loads with NO STYLING AT
!! ALL. You must upload all three items listed below.

  public_html/
    fire-fighting/
      index.html                  <- Home
      about.html                  <- About Us
      products-services.html      <- Products & Services
      projects.html               <- Projects
      contact.html                <- Contact Us
      hanindo-citra-website.html  <- OPTIONAL: whole site in one page
                                     (tabs switch pages instantly)
      translate.js                <- English / Bahasa Indonesia toggle
                                     (MUST be uploaded with the .html)
      photos/                     <- this section's pictures
      README-FOR-COLLEAGUE.txt

    assets/                       <- REQUIRED. Shared stylesheets.
      site.css                       Both files are needed; the pages
      fire-fighting.css              reference them as ../assets/...

    photos/
      logo-lockup.png             <- REQUIRED. The header logo.
                                     Referenced as ../photos/

LANGUAGE TOGGLE (EN / ID):
The button at the top-right of every page switches the whole site
between English and Bahasa Indonesia. All translations live in ONE
file, translate.js. To fix or add wording, open translate.js and edit
the "English text": "Indonesian text" lines (instructions are at the
top of that file). Keep translate.js next to the .html files.

IMPORTANT: pages load pictures from the photos/ folder using relative
paths. The photos folder MUST be uploaded/kept next to the .html files.

HOW TO PUBLISH
--------------
1. cPanel File Manager (or FTP) -> public_html/
2. Upload the fire-fighting folder:
      public_html/fire-fighting/   (html files + translate.js + photos/)
3. Upload the shared assets folder:
      public_html/assets/          (site.css + fire-fighting.css)
4. Upload the group logo:
      public_html/photos/logo-lockup.png
5. Test:  https://hanindogroup.com/fire-fighting/
   Then press Ctrl+F5. If the page looks like plain unstyled text on a
   white background, step 3 was missed or went to the wrong folder.
6. In Joomla admin, point the existing "Fire Fighting" menu item
   (under Product) at:  /fire-fighting/   (type: External URL)

NOTE ON CACHING: the .html files link the stylesheets with a version
number, e.g. site.css?v=202607201553. When you change a .css file,
also bump that number in the .html files, otherwise returning
visitors keep seeing the old styling from their browser cache.


=====================================================
CHANGING / ADDING PICTURES YOURSELF  (no coding)
=====================================================
Every picture is just a file in photos/. To change one:
replace the file, KEEP THE EXACT FILENAME, then refresh the
page (Ctrl+F5). JPG format recommended.

CURRENT PICTURES:
  prod-hydrant.jpg       Product card: Fire Hydrant Systems
                         (white background photos look best)
  mot-op1-building.jpg   Home hero slide 3 + Featured project +
                         About page + Projects page
  mot-hydrant-pump.jpg   Home hero slide 1 + About page +
                         Ministry of Transportation project card
  proj-glb.jpg           Project card: PT. GLB Indonesia
  proj-lpg.jpg           Project card: LPG Petroleum Storage
  proj-akr.jpg           Project card: AKR Fuel Storage

AUTOMATIC PRODUCT-PHOTO SLOTS (files that do not exist yet):
Drop a photo with one of these names into photos/ and it will
AUTOMATICALLY replace the drawing on the matching product card:
  prod-sprinkler.jpg     Sprinkler Systems
  prod-gas.jpg           Gas Suppression
  prod-foam.jpg          Foam Suppression
  prod-alarm.jpg         Fire Detection & Alarm
  prod-deluge.jpg        Deluge Systems
(White/light background product shots look best, like the hydrant.)

CUSTOMER LOGO SLOTS (Home page "Team experience includes work with" bar):
Drop a logo file with one of these names into photos/ and it will
AUTOMATICALLY replace the text on the matching customer card:
  cust-mot.png           Ministry of Transportation
  cust-glb.jpg           PT. GLB Indonesia
  cust-akr.png           AKR Fuel Storage
  cust-pertamina.png     PT Pertamina (Persero)
(The cards are WHITE, so normal colour logos on a white or
transparent background look best. To REPLACE a logo, keep the
exact same filename AND extension as above — e.g. cust-akr.png
must stay a .png; cust-pertamina.jpg must stay a .jpg. Until a
file is added, the card just shows the customer's name as text.)

CERTIFICATE PICTURES (About Us -> Certifications & Licenses):
The three ISO certificate cards show these image files:
  cert-iso-9001.jpg      ISO 9001:2015  (Quality Management)
  cert-iso-14001.jpg     ISO 14001:2015 (Environmental)
  cert-iso-45001.jpg     ISO 45001:2018 (Occupational H&S)
To update a certificate, replace the file keeping the same name
(a JPG/PNG picture, not a PDF). Clicking a card opens the full
image in a new tab. The original PDFs are also kept in photos/.

TIPS
----
- Landscape photos suit the hero and project cards; the product
  cards suit photos with the item centered on a light background.
- Any size works (the layout crops/fits automatically), but at
  least ~1000px wide looks sharpest.
- To edit wording: open the .html in a text editor and change the
  text. For look/design changes, ask Aless.
