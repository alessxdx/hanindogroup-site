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
    "Your Solution Provider": "您的解决方案伙伴",
    "Other markets": "其他市场",

    /* ---- home hero + intro ---- */
    "Hanindo (Shanghai) International Co., Ltd. supplies the printing, scanning and point-of-sale hardware and software behind retail and hospitality automation.": "汉琳德上海为零售与酒店自动化提供打印、扫描及销售点软硬件。",
    "Printing, scanning, and point of sale.": "打印、扫描与销售点。",
    "Established in Shanghai in 2007, Hanindo (Shanghai) International Co., Ltd. is the Hanindo Group’s presence in China, operating as Hanindo CUSTOM China. The company represents CUSTOM’s printing, scanning and automation solutions, supporting the same business that the Group delivers across Southeast Asia.": "汉琳德（上海）系统集成有限公司于 2007 年在上海成立，是 Hanindo Group 在中国的业务主体，以 Hanindo CUSTOM China 的名义经营。公司代理 CUSTOM 的打印、扫描与自动化解决方案，与集团在东南亚开展的业务一脉相承。",
    "Within China the company works from two locations: Shanghai & Shenzhen.": "公司在中国设有两处办公地点：上海与深圳。",
    "Professional printing": "专业打印",
    "POS, receipt, fiscal, ticket, label and mobile printers.": "POS、小票、税控、票据、标签及移动打印机。",
    "Point of sale & data capture": "销售点与数据采集",
    "Terminals, touch systems, cash registers, scanners and payment terminals.": "终端、触控系统、收银机、扫描器及支付终端。",
    "Scanning": "扫描",
    "Document scanners and multifunction print-and-scan systems.": "文档扫描仪及多功能打印扫描系统。",

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
       "Shenzhen Office" and the two city names are the footer's address
       columns on all four pages; "Indonesia" and ", see" are the contact
       page's own market note, which is worded differently from the one
       that came off. */
    "Email our team": "发送邮件给我们",
    "Shanghai Office": "上海办公室",
    "Shenzhen Office": "深圳办公室",
    "Shanghai, China": "中国上海",
    "Shenzhen, China": "中国深圳",
    "Tel:": "电话：",
    /* The fax lines beside "Tel:" in the footer's two office columns. The
       number is part of the node, so the whole line is the key -- these
       are the only two fax numbers the company has, and if either changes
       the entry has to change with it.
       The contact page's own two fax lines are deliberately NOT here:
       there the number and the fax sit in one node with the telephone,
       separated by non-breaking spaces, so the key would carry invisible
       characters and would stop matching the moment anyone re-typed the
       line. Left in English rather than made fragile. */
    "Fax: +86 21 6237 0598": "传真：+86 21 6237 0598",
    "Fax: +86 755 8659 9823": "传真：+86 755 8659 9823",
    "Indonesia": "印度尼西亚",
    ", see": "，请联系",

    /* ---- footer ---- */
    "Our Companies": "集团公司",
    "Hanindo Group has served businesses across Indonesia since 1987, providing technology, equipment and engineering solutions across specialised industries. Our companies cover oil & gas, automation, automotive, fire protection, printing and POS, combining international brands with local expertise and technical support.": "自 1987 年以来，Hanindo Group 持续为印度尼西亚各地的企业提供服务，在多个专业领域提供技术、设备和工程解决方案。我们的公司涵盖石油天然气、自动化、汽车、消防、印刷和 POS 等领域，将国际品牌与本地专业知识和技术支持相结合。",
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
    "Hanindo (Shanghai) International Co., Ltd. is the first of the Group’s three CUSTOM companies and the foundation for its regional CUSTOM business. Following the Group’s partnership with CUSTOM in 2005, the Shanghai office was established in 2007 as Hanindo’s first operation outside Indonesia, with Shenzhen following in 2009 to support the company’s growth in China.": "汉琳德（上海）系统集成有限公司是集团三家 CUSTOM 公司中成立最早的一家，也是集团区域 CUSTOM 业务的基石。继集团于 2005 年与 CUSTOM 建立合作之后，上海办公室于 2007 年成立，成为汉琳德在印度尼西亚以外的首个经营机构；深圳办公室于 2009 年设立，以支持公司在中国的发展。",
    "Establishing a registered company in China, rather than operating through an agent, was a deliberate choice to maintain direct control over customer support, spare parts and technical service. This approach remains central to Hanindo’s commitment to providing reliable long-term support for every system delivered.": "在中国注册成立实体公司，而非通过代理商开展业务，是为了对客户支持、备件与技术服务保持直接掌控而作出的审慎选择。这一做法始终是汉琳德的核心，让每一套交付的系统都能获得可靠的长期支持。",
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
    "The representative office of the Shanghai company, keeping customers in southern China close to the same team.": "上海公司的代表处，让华南地区的客户由同一团队就近服务。",
    "Tel +86 21 6237 0600": "电话 +86 21 6237 0600",
    "Tel +86 755 8665 2653": "电话 +86 755 8665 2653",

    /* ---- about: direction ---- */
    "Our direction": "我们的方向",
    "Vision & Mission": "愿景与使命",
    "01 / Vision": "01 / 愿景",
    "Vision": "愿景",
    "To be China’s trusted technology partner for retail, transport and service industries.": "成为中国零售、交通与服务行业值得信赖的技术合作伙伴。",
    "02 / Mission": "02 / 使命",
    "Mission": "使命",
    "Deliver CUSTOM printing, scanning and point-of-sale solutions tailored to customer needs.": "提供贴合客户需求的 CUSTOM 打印、扫描与销售点解决方案。",
    "Integrate, install and support systems through our local technical team.": "由本地技术团队完成系统的集成、安装与支持。",
    "Help businesses adopt reliable technology solutions that improve daily operations.": "帮助企业采用可靠的技术方案，提升日常运营效率。",

    /* ---- about: why choose us ---- */
    "Why choose us": "为何选择我们",
    "Why clients trust us": "客户为何信赖我们",
    "Industry Experience": "行业经验",
    "Part of the Hanindo Group, supporting retail, transport and service operators across China since 2007.": "隶属 Hanindo Group，自 2007 年起为中国各地的零售、交通与服务运营商提供支持。",
    "Technology Expertise": "技术专长",
    "Official CUSTOM solutions with the capability to integrate hardware into business operations.": "正式代理的 CUSTOM 解决方案，可将硬件集成到业务运营之中。",
    "Local Support": "本地支持",
    "Installation, technical assistance and after-sales service from our own team in Shanghai and Shenzhen.": "由我们在上海与深圳的自有团队提供安装、技术协助与售后服务。",

    /* ---- products & services ---- */
    "Products &": "产品与",
    "Services": "服务",
    "Printing, scanning and point of sale — supplied, integrated and supported across China.": "打印、扫描与销售点 — 在中国全境供应、集成并提供支持。",
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
    "How to reach us.": "如何联系我们。",
    "For printing, scanning and point-of-sale supply, integration, consumables or service in China, reach the Shanghai office.": "在中国，如需打印、扫描与销售点设备的供应、集成、耗材或服务，请联系上海办公室。",
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
    ": Room 3211-3212, Tower B, City Center, No. 100 Zunyi Rd, Changning District, Shanghai, China": "： Room 3211-3212, Tower B, City Center, No. 100 Zunyi Rd, Changning District, Shanghai, China",
    ": Monday to Friday, 09.00 – 18.00 CST": "：周一至周五，09:00 – 18:00（中国标准时间）",
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
