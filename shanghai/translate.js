/* =====================================================================
   Hanindo (Shanghai) International Co., Ltd.
   EN / 简体中文 language toggle  (plain JS, no deps)
   ---------------------------------------------------------------------
   Same mechanism as fire-fighting/translate.js: on load it walks the
   visible text and, where a phrase matches an entry below, swaps
   English <-> Simplified Chinese. The choice is remembered
   (localStorage) across pages of this site only.

   To EDIT a translation: find the English on the left, change the
   Chinese on the right. To ADD one: copy a line and fill in both sides.
   The English side must match the page EXACTLY, including punctuation —
   the match is on the whole trimmed text node, not a substring.

   Deliberately NOT translated: company and product names (Hanindo,
   Custom, Gralessando, the customer logos), and the street addresses,
   which are needed in their postal form.
   ===================================================================== */
(function () {
  var DICT = {
    /* the Our Businesses menu, built by assets/nav.js */
    "Our Businesses": "集团业务",
    "Printer & POS": "打印与 POS",
    "Oil & Gas": "石油与天然气",
    "Fire Fighting": "消防",
    "Automotive": "汽车",
    "Fire Fighting Department": "消防部",
    "A division of PT. Hanindo Citra": "PT. Hanindo Citra 旗下部门",
    "Singapore": "新加坡",
    "China": "中国",
    "You are here": "当前位置",
    /* ---- directions ----
       This read "Petunjuk arah" until 2026-08-17 -- Indonesian, carried
       over with the entry when this dictionary was seeded from one of the
       Indonesian sites. It was live on the contact page: switching to
       中文 turned the link under the office address into Indonesian. */
    "Get directions": "查看路线",
    /* ---- navigation / header ---- */
    "Back to": "返回",
    "Home": "首页",
    "About Us": "关于我们",
    "Products & Services": "产品与服务",
    "Contact Us": "联系我们",
    "Your Solution Provider": "您的解决方案伙伴/供应商",
    "Other markets": "其他市场",

    /* ---- home hero + intro ---- */
    "Hanindo (Shanghai) International Co., Ltd. supplies the printing, scanning and point-of-sale hardware and software behind retail and hospitality automation.": "汉琳德上海为零售与酒店自动化提供打印、扫描及销售点软硬件。",
    "Printing, scanning, and point of sale.": "打印、扫描、POS及自动化解决方案",
    "Established in Shanghai in 2007, Hanindo (Shanghai) International Co., Ltd. is the Hanindo Group’s presence in China, operating as Hanindo CUSTOM China. The company represents CUSTOM’s printing, scanning and automation solutions, supporting the same business that the Group delivers across Southeast Asia.": "汉琳德（上海）系统集成有限公司 2007 年成立于上海，为 Hanindo 集团的中国业务实体，对外以 Hanindo CUSTOM China 开展经营。公司代理 CUSTOM 品牌的打印、扫描及自动化解决方案，业务模式与该集团在东南亚地区开展的业务保持一致。",
    "Within China the company works from two locations: Shanghai & Shenzhen.": "公司在国内设有两处办公地点：上海、深圳",
    "Professional printing": "专业打印设备",
    "POS, receipt, fiscal, ticket, label and mobile printers.": "POS打印机、小票打印机、税控打印机、票据打印机、标签打印机及移动打印机",
    "Point of sale & data capture": "POS及扫码设备",
    "Terminals, touch systems, cash registers, scanners and payment terminals.": "终端设备、触控系统、收银机、扫描器及支付终端",
    "Scanning": "扫描设备",
    "Document scanners and multifunction print-and-scan systems.": "文档扫描仪以及打印扫描一体化多功能设备",

    /* ---- product strip ---- */
    "What we supply": "我们的供应范围",
    "Professional Printing Solutions": "专业打印解决方案",
    "DC / POS Solutions": "DC / POS 解决方案",
    "Scanning Solutions": "扫描解决方案",
    "Self-Service Solutions": "自助服务解决方案",

    /* ---- products & services page ----
       The heading over the catalogue. It had no entry until 2026-08-17, so
       it stayed English while the rest of the page turned over -- and it
       was the largest type on it. */
    "Our product range": "我们的产品系列",

    /* ---- customers ---- */
    "Customer base": "客户群",
    /* The sector labels on the customer wall. These are headings, not
       company names, so they translate — the logos and the .nm fallback
       names beside them stay in their own form. */
    "Airports & aviation": "机场与航空",
    "Transport, retail & public services": "交通、零售与公共服务",
    "Industry & technology": "工业与科技",

    /* ---- contact page, and the footer's office columns ----
       The contact band these mostly belonged to came off the home, About
       and Products & Services pages, and twelve of its entries went with
       it: the eyebrow, both halves of the heading, the sub line, "Contact
       page", the three phone and representative-office labels, and the
       four pieces its market note was split into by the <b>s and <a>s.
       What is left is still in use and was checked one at a time.
       "Email our team" is the contact page's button; "Shanghai Office",
       "Shenzhen Office" and the city names are the footer's address
       columns on all four pages -- Shanghai's is blank now, see the
       note below; "Indonesia" and ", see" are the contact page's own
       market note, which is worded differently from the one
       that came off. */
    "Email our team": "发送邮件给我们",
    "Shanghai Office": "上海办公室",
    "Shenzhen Office": "深圳办公室",
    /* The footer's Shanghai column, which in Chinese is one line rather
       than three. The whole postal address rides on the first span; the
       street span and the city span are deliberately blank, because a
       Chinese address runs city-district-street-building-room in one
       unbroken string and there is nothing left to put on them. A blank
       .cl collapses to zero height and its margin collapses with its
       neighbours, so the address sits tighter against the phone line in
       Chinese than the three-line English stack does -- 8px against 92px.
       Shenzhen below is laid out the same way. */
    "Room 3211, Tower B, The Place": "上海市长宁区遵义路100号虹桥南丰城B楼3211室",
    "Zunyi Rd 100, Changning district": "",
    "Shanghai, China": "",
    /* Shenzhen, handled the same way as Shanghai above: the whole postal
       address on the first span, the street span and the city span blank.
       Both offices now read as Chinese addresses in 中文. */
    "Room 808 Haosheng Plaza": "深圳市南山区4096号濠盛商务中心808室",
    "No. 4096 Dongbin Rd, Nanshan District": "",
    "Shenzhen, China": "",
    "Tel:": "电话：",
    /* The fax label in the footer's two office columns. It used to be two
       entries, one per whole line, because the number sat in the same text
       node -- so a changed number meant a changed key. The number now has
       its own <span class="nb"> to stop it breaking mid-line, which splits
       the node and leaves just the label to translate, the same shape as
       "Tel:" above. The trailing space in "Fax: " survives the swap, so
       both lines now read 电话： and 传真： with one space before the
       number; the fax line used to have none.
       The contact page carries its own two fax lines, further down. They
       were left in English while &nbsp; sat either side of the middot,
       which would have put invisible characters in the key; the markup
       uses ordinary spaces now, so they are keyed on the whole tail after
       the telephone number. That does mean a changed number means a
       changed key -- unavoidable on the Shenzhen line, where Chinese adds
       a 电话： label that the English does not have, so there is no label
       node to translate on its own. */
    "Fax:": "传真：",
    "Indonesia": "印度尼西亚",
    ", see": "，请联系",

    /* ---- footer ---- */
    "Our Companies": "集团公司",
    "Hanindo Group has served businesses across Indonesia since 1987, providing technology, equipment and engineering solutions across specialised industries. Our companies cover oil & gas, automation, automotive, fire protection, printing and POS, combining international brands with local expertise and technical support.": "Hanindo 集团自 1987 年起为印度尼西亚各地企业提供服务，面向多个专业行业提供技术、设备及工程解决方案。集团旗下各业务板块覆盖石油天然气、自动化、汽车、消防、打印及 POS 领域，融合国际品牌资源与本地专业经验、技术支持",
    "© 2026 Hanindo Group. All Rights Reserved.": "© 2026 Hanindo Group. 版权所有。",

    /* ---- about: hero + overview + journey ---- */
    "About": "关于",
    "Us": "我们",
    "Where the CUSTOM partnership started. Hanindo (Shanghai) International Co., Ltd. has supplied CUSTOM’s printing, scanning and self-service systems in China since 2007, from Shanghai and Shenzhen.": "CUSTOM 合作的起点。自 2007 年起，汉琳德上海立足上海与深圳，在中国供应 CUSTOM 的打印、扫描与自助服务系统。",

    /* The closing sentence of the second paragraph is split by two inline
       links, so it is stored here as the three fragments between them. */
    "Company overview": "公司概况",
    "Where the CUSTOM": "CUSTOM 合作",
    "partnership started": "的起点",
    "Hanindo (Shanghai) International Co., Ltd. is the first of the Group’s three CUSTOM companies and the foundation for its regional CUSTOM business. Following the Group’s partnership with CUSTOM in 2005, the Shanghai office was established in 2007 as Hanindo’s first operation outside Indonesia, with Shenzhen following in 2009 to support the company’s growth in China.": "汉琳德（上海）系统集成有限公司是集团旗下三家 CUSTOM 相关企业中成立最早的主体，也是集团亚太区域 CUSTOM 业务的基石。集团于 2005 年与 CUSTOM 达成合作，2007 年设立上海公司，这是 Hanindo 集团在印度尼西亚以外的首个经营机构；2009 年增设深圳办公室，支持公司在中国市场的业务拓展。",
    "Establishing a registered company in China, rather than operating through an agent, was a deliberate choice to maintain direct control over customer support, spare parts and technical service. This approach remains central to Hanindo’s commitment to providing reliable long-term support for every system delivered.": "选择在中国注册成立实体公司，而非依托代理商开展业务，是一项审慎决策，目的在于对客户服务、备件供应及技术服务实现直接管控。该模式始终是 Hanindo 服务承诺的核心，保障每一套交付的系统均可获得稳定可靠的长期技术支持。",
    "Our Shanghai office": "我们的上海办公室",

    "Our journey": "我们的历程",
    "CUSTOM Hanindo Growth": "CUSTOM 与 Hanindo 的发展",
    "CUSTOM partnership": "CUSTOM 合作",
    "Partnered to expand CUSTOM products to the China market.": "达成合作，将 CUSTOM 产品拓展至中国市场。",
    "Shanghai office": "上海办公室",
    "The group’s first office in China.": "集团在中国的首个办公室。",
    "Shenzhen office": "深圳办公室",
    "A second China office as the market grows.": "随着市场增长，在中国设立第二个办公室。",
    "South East Asia expansion": "东南亚拓展",
    "PT. Hanindo Automation Solutions adds CUSTOM Hanindo Indonesia.": "PT. Hanindo Automation Solutions 引入 CUSTOM Hanindo 印尼业务。",
    "Singapore office": "新加坡办公室",
    "Gralessando (S) Pte. Ltd. opens, covering CUSTOM Hanindo South East Asia.": "Gralessando (S) Pte. Ltd. 成立，覆盖 CUSTOM Hanindo 东南亚市场。",
    "Regional partnerships": "区域合作",
    "CUSTOM Hanindo partnerships established in Vietnam, Thailand and the Philippines.": "在越南、泰国与菲律宾建立 CUSTOM Hanindo 合作关系。",
    "Manila office": "马尼拉办公室",
    "A CUSTOM Hanindo office follows the Philippines partnership.": "继菲律宾合作之后设立 CUSTOM Hanindo 办公室。",

    /* ---- about: where we are ---- */
    "Where we are": "我们的所在",
    "Our Offices": "我们的办公室",
    "Shanghai": "上海",
    "Shenzhen": "深圳",
    "The registered office and the company’s base since 2007.": "注册办公地址，自 2007 年起为公司总部。",
    "The representative office of the Shanghai company, keeping customers in southern China close to the same team.": "上海公司的代表处，为华南地区客户提供同一团队就近服务",
    "Room 3211, Tower B, The Place, Zunyi Rd 100, Changning district, Shanghai": "上海市长宁区遵义路100号虹桥南丰城B楼3211室",
    "Tel +86 21 6237 0600": "电话 +86 21 6237 0600",
    "Room 808 Haosheng Plaza, No. 4096 Dongbin Rd, Nanshan District, Shenzhen": "深圳市南山区4096号濠盛商务中心808室",
    "Tel +86 755 8665 2653": "电话 +86 755 8665 2653",

    /* ---- about: direction ---- */
    "Our direction": "我们的方向",
    "Vision & Mission": "愿景与使命",
    "01 / Vision": "01 / 愿景",
    "Vision": "愿景",
    "To be China’s trusted technology partner for retail, transport and service industries.": "成为中国零售、交通及服务行业值得信赖的技术合作伙伴。",
    "02 / Mission": "02 / 使命",
    "Mission": "使命",
    "Deliver CUSTOM printing, scanning and point-of-sale solutions tailored to customer needs.": "提供贴合客户需求的 CUSTOM 打印、扫描及 POS 相关解决方案。",
    "Integrate, install and support systems through our local technical team.": "依托本地技术团队完成系统的集成、安装与技术支持。",
    "Help businesses adopt reliable technology solutions that improve daily operations.": "助力企业选用可靠的技术方案，改善日常运营。",

    /* ---- about: why choose us ---- */
    "Why choose us": "为何选择我们",
    "Why clients trust us": "客户为何信赖我们",
    "Industry Experience": "行业经验",
    "Part of the Hanindo Group, supporting retail, transport and service operators across China since 2007.": "隶属于 Hanindo 集团，自 2007 年起，为全国零售、交通及服务行业运营商提供业务支持。",
    "Technology Expertise": "技术实力",
    "Official CUSTOM solutions with the capability to integrate hardware into business operations.": "CUSTOM 官方授权解决方案，具备将硬件集成至业务运营体系的实施能力。",
    "Local Support": "本地服务支持",
    "Installation, technical assistance and after-sales service from our own team in Shanghai and Shenzhen.": "由上海、深圳两地自有团队提供安装、技术协助及售后服务。",

    /* ---- products & services ---- */
    "Products &": "产品与",
    "Services": "服务",
    "Printing, scanning and point of sale — supplied, integrated and supported across China.": "打印、扫描及 POS 相关产品——在中国境内提供销售、系统集成与技术支持服务",
    "What we offer": "我们提供的产品",
    "Automation hardware, counter to kiosk": "自动化硬件，从柜台到自助终端",
    "Four families of Custom hardware and the software that runs them, supplied, integrated and supported across China. Each links through to the full Custom catalogue.": "四大系列 Custom 硬件及其配套软件，在中国全境供应、集成并提供支持。每一项均可链接至完整的 Custom 产品目录。",
    "POS, receipt, fiscal, ticket, label, kiosk and mobile printers.": "POS、小票、税控、票据、标签、自助终端及移动打印机。",
    "View products": "查看产品",
    "POS terminals, touch systems, cash registers and monitors.": "POS 终端、触控系统、收银机与显示器。",
    "Document scanners, barcode readers and imaging systems.": "文档扫描仪、条码阅读器与成像系统。",
    "Kiosks and countertop units for unattended service.": "用于无人值守服务的自助终端与台面机型。",

    /* ---- industries ---- */
    "Industries served": "服务的行业",
    "Retail": "零售",
    "Self-Payment & Info Kiosk": "自助支付与信息终端",
    "Public Transport": "公共交通",
    "Aviation": "航空",
    "Healthcare": "医疗健康",
    "Parking": "停车",
    "Logistics & Postal": "物流与邮政",
    "Entertainment": "娱乐",
    "Lotteries & Betting": "彩票与博彩",
    "Manufacturing": "制造业",
    "Banking & Finance": "银行与金融",

    /* ---- contact page ---- */
    "Let's talk about": "让我们聊聊",
    "your project.": "您的项目。",
    "Tell us what you are running or building, and we will put the right person on it.": "告诉我们您正在运营或建设的项目，我们会安排合适的同事对接。",
    "How to reach us.": "如何联系我们",
    "For printing, scanning and point-of-sale supply, integration, consumables or service in China, reach the Shanghai office.": "在中国，如需打印、扫描与POS设备的供应、系统集成、耗材或技术服务，请联系上海办公室。",
    "Office": "办公地址",
    "Telephone": "电话",
    "Office hours": "办公时间",
    /* Chinese wants the fullwidth colon, and on this page the colon leads the
       value node rather than sitting inside the <b>, so it is translated as
       part of the value.

       Spacing follows what comes after the colon: a space before Latin text,
       none before Chinese. So the address and phone keep a space and the hours
       line does not. setLang swaps by raw.replace(key, value), which preserves
       whitespace already in the node, so the phone's space arrives on its own
       from the markup and must not be repeated here.

       The address and the phone stay in English -- both are needed in the form
       a caller or courier would use -- so those two entries change nothing but
       the punctuation. The bare ":" is the phone line, where the number sits in
       a tel: link and leaves the colon alone in its own text node. It is the
       only lone-colon node on this site, so the key cannot collide; check that
       again before reusing this trick on another page. */
    ":": "：",
    ": Room 3211, Tower B, The Place, Zunyi Rd 100, Changning district, Shanghai, China": "：上海市长宁区遵义路100号虹桥南丰城B楼3211室",
    "· Fax +86 21 6237 0598": "· 传真： +86 21 6237 0598",
    "+86 755 8665 2653 · Fax +86 755 8659 9823": "电话： +86 755 8665 2653 · 传真： +86 755 8659 9823",
    ": Monday to Friday, 09.00 – 18.00 CST": "：周一至周五，09:00 – 18:00（北京时间）",
    "Representative office": "代表处",
    "For": "如需",
    "South East Asia": "东南亚",
    ", the same Custom range is supplied by": "，同样的 Custom 产品系列由",

    /* ---- misc ---- */
    "Photo needed": "缺少照片"
  };

  var LANG_KEY = 'hs_lang', ALT = 'zh', HTML_LANG = 'zh-Hans';
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
    if (s) s.setAttribute('placeholder', lang === ALT ? '搜索' : 'Search');
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
