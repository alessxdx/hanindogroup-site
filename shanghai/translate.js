/* =====================================================================
   Hanindo Shanghai — EN / 简体中文 language toggle  (plain JS, no deps)
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
    /* ---- navigation / header ---- */
    "Home": "首页",
    "About Us": "关于我们",
    "Products & Services": "产品与服务",
    "Contact Us": "联系我们",
    "Your Solution Provider": "您的解决方案伙伴",
    "Other markets": "其他市场",

    /* ---- home hero + intro ---- */
    "Hanindo Shanghai supplies the printing, scanning and point-of-sale hardware and software behind retail and hospitality automation.": "汉琳德上海为零售与酒店自动化提供打印、扫描及销售点软硬件。",
    "Printing, scanning, and point of sale.": "打印、扫描与销售点。",
    "Incorporated and open in Shanghai since 2007, Hanindo (Shanghai) International Co., Ltd is the Hanindo Group's company in China, where it goes to market as Hanindo CUSTOM China. It represents Custom, for its automation with printing, scanning and reading solutions — the same business the group runs across South East Asia through Gralessando Pte Ltd.": "汉琳德（上海）系统集成有限公司成立于 2007 年，并于同年在上海开展业务，是 Hanindo Group 在中国的公司，以 Hanindo CUSTOM China 的名义开拓市场。公司代理 Custom 品牌，提供打印、扫描与读取的自动化解决方案 — 与集团通过 Gralessando Pte Ltd 在东南亚经营的业务相同。",
    "Within China the company works from two locations: Shanghai & Shenzhen.": "公司在中国设有两处办公地点：上海与深圳。",
    "Professional printing": "专业打印",
    "POS, fiscal, ticket, label and mobile printers.": "POS、税控、票据、标签及移动打印机。",
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

    /* ---- customers ---- */
    "Customer base": "客户群",

    /* ---- contact block ---- */
    "Talk to Hanindo Shanghai": "联系汉琳德上海",
    "Sourcing printing or POS,": "正在采购打印或 POS 设备，",
    "for the Chinese market?": "面向中国市场？",
    "Tell us the sites and volumes you handle and our team will match the right printing, scanning and POS package.": "请告知您负责的站点与业务量，我们的团队将为您匹配合适的打印、扫描与 POS 方案。",
    "Email our team": "发送邮件给我们",
    "Contact page": "联系页面",
    "Shanghai Office": "上海办公室",
    "Shanghai Phone": "上海电话",
    "Shenzhen Representative Office": "深圳代表处",
    "Shenzhen Phone": "深圳电话",
    "Shenzhen Office": "深圳办公室",
    "Shanghai, China": "中国上海",
    "Shenzhen, China": "中国深圳",
    "Tel:": "电话：",

    /* ---- market note ---- */
    "This contact handles": "此联系方式负责",
    "China": "中国",
    "Indonesia": "印度尼西亚",
    ". For": "。如需",
    ", see": "，请联系",
    ". For Singapore, Malaysia, Vietnam, the Philippines or Thailand, see": "。如需新加坡、马来西亚、越南、菲律宾或泰国地区，请联系",

    /* ---- footer ---- */
    "Our Companies": "集团公司",
    "Your technology one stop solution — serving the oil & gas, automation, automotive and fire protection industries in Indonesia since 1987.": "您的一站式技术解决方案 — 自 1987 年起服务于印尼的石油天然气、自动化、汽车与消防行业。",
    "© 2026 Hanindo Group. All Rights Reserved.": "© 2026 Hanindo Group. 版权所有。",

    /* ---- about: hero + journey ---- */
    "About": "关于",
    "Us": "我们",
    "From receipt printers to self-service kiosks, Hanindo Shanghai supplies and supports the systems that keep retail, transport and hospitality moving.": "从收据打印机到自助服务终端，汉琳德上海为零售、交通与酒店行业供应并支持保障其运转的系统。",
    "Our journey": "我们的历程",
    "Custom Hanindo Growth": "Custom 与 Hanindo 的发展",
    "CUSTOM partnership": "CUSTOM 合作",
    "Partnered to expand CUSTOM products to the China market.": "达成合作，将 CUSTOM 产品拓展至中国市场。",
    "Shanghai office": "上海办公室",
    "The group’s first office in China.": "集团在中国的首个办公室。",
    "Shenzhen office": "深圳办公室",
    "A second China office as the market grows.": "随着市场增长，在中国设立第二个办公室。",
    "South East Asia expansion": "东南亚拓展",
    "Hanindo Automation Solutions adds CUSTOM Indonesia.": "Hanindo Automation Solutions 引入 CUSTOM 印尼业务。",
    "Singapore office": "新加坡办公室",
    "Gralessando Pte Ltd opens, covering CUSTOM South East Asia.": "Gralessando Pte Ltd 成立，覆盖 CUSTOM 东南亚市场。",
    "Regional partnerships": "区域合作",
    "CUSTOM partnerships established in Vietnam, Thailand and the Philippines.": "在越南、泰国与菲律宾建立 CUSTOM 合作关系。",
    "Manila office": "马尼拉办公室",
    "A CUSTOM office follows the Philippines partnership.": "继菲律宾合作之后设立 CUSTOM 办公室。",

    /* ---- about: where we are ---- */
    "Where we are": "我们的所在",
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
    "To be the automation partner China’s retail, transport and service operators rely on.": "成为中国零售、交通与服务运营商所依赖的自动化合作伙伴。",
    "02 / Mission": "02 / 使命",
    "Mission": "使命",
    "Supply Custom’s printing, scanning and point-of-sale hardware with the software that runs it.": "供应 Custom 的打印、扫描与销售点硬件及其配套软件。",
    "Integrate, install and support every system locally.": "在本地完成每套系统的集成、安装与支持。",
    "Keep pace with Custom’s range so customers run current technology.": "紧跟 Custom 的产品线，让客户始终使用当前的技术。",

    /* ---- about: why choose us ---- */
    "Why choose us": "为何选择我们",
    "Why clients trust us": "客户为何信赖我们",
    "Three things you can count on, from first specification through to long-term support.": "从最初的规格设计到长期支持，有三件事您可以放心。",
    "Trusted": "值得信赖",
    "One of the companies of the Hanindo Group, working in China since 2007.": "Hanindo Group 旗下公司之一，自 2007 年起在中国开展业务。",
    "Best Quality": "卓越品质",
    "Custom hardware and software, built for unattended, high-volume use.": "Custom 软硬件，专为无人值守、高负荷使用而设计。",
    "Excellent Service": "优质服务",
    "Supply, integration and after-sales support.": "供应、集成与售后支持。",

    /* ---- products & services ---- */
    "Products &": "产品与",
    "Services": "服务",
    "Printing, scanning and point of sale — supplied, integrated and supported across China.": "打印、扫描与销售点 — 在中国全境供应、集成并提供支持。",
    "What we offer": "我们提供的产品",
    "Automation hardware, counter to kiosk": "自动化硬件，从柜台到自助终端",
    "Four families of Custom hardware and the software that runs them, supplied, integrated and supported across China. Each links through to the full Custom catalogue.": "四大系列 Custom 硬件及其配套软件，在中国全境供应、集成并提供支持。每一项均可链接至完整的 Custom 产品目录。",
    "POS, fiscal, ticket, label, kiosk and mobile printers.": "POS、税控、票据、标签、自助终端及移动打印机。",
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
    "— Monday to Friday, 09.00 – 18.00 CST": "— 周一至周五，09:00 – 18:00（中国标准时间）",
    "The company also keeps a representative office in southern China:": "公司在华南地区还设有一个代表处：",
    "Representative office": "代表处",
    "For": "如需",
    "Singapore, Malaysia, Vietnam, the Philippines or Thailand": "新加坡、马来西亚、越南、菲律宾或泰国",
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
