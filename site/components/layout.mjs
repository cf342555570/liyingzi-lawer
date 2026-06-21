import { siteConfig, absoluteUrl, relativeAsset } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { renderJsonLd } from "./json-ld.mjs";

export const escapeHtml = (value = "") =>
  String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);

export const renderBreadcrumbs = (items) => `
  <nav class="breadcrumbs shell" aria-label="面包屑">
    <ol>${items.map((item, index) => `<li>${index === items.length - 1 ? `<span aria-current="page">${escapeHtml(item.name)}</span>` : `<a href="${item.path}">${escapeHtml(item.name)}</a>`}</li>`).join("")}</ol>
  </nav>`;

const header = `
  <header class="site-header">
    <div class="credential-bar"><div class="shell credential-inner"><span>${siteConfig.organization}</span><span>执业证号 ${lawyer.licenseNumber}</span><span>长沙婚姻家事法律服务</span></div></div>
    <div class="shell header-inner">
      <a class="brand" href="/" aria-label="英姿律见首页">
        <span class="brand-mark" aria-hidden="true">英姿</span>
        <span><strong>${siteConfig.shortName}</strong><small>李英姿律师 · 婚姻家事</small></span>
      </a>
      <input type="checkbox" id="menu-toggle" class="menu-toggle" aria-hidden="true">
      <label for="menu-toggle" class="hamburger" aria-label="菜单" tabindex="0" role="button">
        <span></span><span></span><span></span>
      </label>
      <label for="menu-toggle" class="mobile-nav-overlay" aria-hidden="true"></label>
      <nav class="main-nav" aria-label="主导航">
        <a href="/">首页</a>
        <a href="/lawyers/li-yingzi/">关于李英姿</a>
        <a href="/#services">服务方向</a>
        <a href="/areas/">服务区域</a>
        <a href="/articles/">普法文章</a>
        <a href="/faq/">常见问题</a>
        <a href="/materials/">材料清单</a>
        <a href="/contact/">联系我</a>
      </nav>
      <a class="phone-link" href="${siteConfig.phoneHref}" aria-label="拨打咨询电话 ${siteConfig.phone}">${siteConfig.phone}</a>
    </div>
  </header>`;

const footer = `
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div><strong>${siteConfig.shortName}</strong><p>${lawyer.displayName}｜${siteConfig.organization}</p><p>执业证号：${lawyer.licenseNumber}</p><p>电话：<a href="${siteConfig.phoneHref}">${siteConfig.phone}</a></p><p>公众号：${lawyer.contentBrand}</p></div>
      <div class="footer-nav">
        <strong>浏览</strong>
        <nav aria-label="底部导航">
          <a href="/">首页</a>
          <a href="/lawyers/li-yingzi/">关于李英姿</a>
          <a href="/#services">服务方向</a>
          <a href="/areas/">服务区域</a>
          <a href="/articles/">普法文章</a>
          <a href="/qualifications/">资质核验</a>
          <a href="/faq/">常见问题</a>
          <a href="/materials/">材料清单</a>
          <a href="/contact/">联系我</a>
          <a href="/privacy/">隐私说明</a>
        </nav>
      </div>
    </div>
    <div class="shell disclaimer" role="note" aria-label="法律信息免责声明">
      <strong>免责声明</strong><p>${siteConfig.disclaimer}</p>
    </div>
    <div class="shell footer-bottom"><span>&copy; ${new Date().getFullYear()} ${siteConfig.shortName}</span><span>服务区域：${lawyer.serviceArea}</span></div>
  </footer>`;

export const renderLayout = ({ title, description, path, body, schemas = [], keywords = "", robots = "index, follow" }) => {
  const canonical = absoluteUrl(path);
  const faviconHref = relativeAsset(path, "/assets/favicon.svg");
  const stylesheetHref = relativeAsset(path, "/assets/styles.css");
  const ogImage = absoluteUrl(lawyer.imagePath);
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  ${keywords ? `<meta name="keywords" content="${escapeHtml(keywords)}">` : ""}
  <meta name="robots" content="${escapeHtml(robots)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:site_name" content="${escapeHtml(siteConfig.name)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:alt" content="李英姿律师｜湖南泰宗律师事务所">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="675">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="theme-color" content="#0a2923">
  <link rel="icon" href="${faviconHref}" type="image/svg+xml">
  <link rel="stylesheet" href="${stylesheetHref}">
  ${renderJsonLd(schemas)}
</head>
<body>
  <a class="skip-link" href="#main">跳到主要内容</a>
  ${header}
  <main id="main">${body}</main>
  ${footer}
</body>
</html>`;
};
