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
    "Incorporated in 2007 and open in Shanghai since 2008, Hanindo (Shanghai) International Co., Ltd is the Hanindo Group's company in China, where it goes to market as Hanindo CUSTOM China. It represents Custom, for its automation with printing, scanning and reading solutions — the same business the group runs across South East Asia through Gralessando Pte Ltd.": "汉琳德（上海）系统集成有限公司成立于 2007 年，自 2008 年在上海开展业务，是 Hanindo Group 在中国的公司，以 Hanindo CUSTOM China 的名义开拓市场。公司代理 Custom 品牌，提供打印、扫描与读取的自动化解决方案 — 与集团通过 Gralessando Pte Ltd 在东南亚经营的业务相同。",
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
