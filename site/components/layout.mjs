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
      <nav class="main-nav" aria-label="主导航">
        <a href="/">首页</a>
        <a href="/lawyers/li-yingzi/">关于李英姿</a>
        <a href="/#services">服务方向</a>
        <a href="/contact/">联系我</a>
      </nav>
      <a class="phone-link" href="${siteConfig.phoneHref}" aria-label="拨打咨询电话 ${siteConfig.phone}">${siteConfig.phone}</a>
    </div>
  </header>`;

const footer = `
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div><strong>${siteConfig.shortName}</strong><p>${lawyer.displayName}｜${siteConfig.organization}</p></div>
      <div><p>电话：<a href="${siteConfig.phoneHref}">${siteConfig.phone}</a></p><p>公众号：${lawyer.contentBrand}</p></div>
    </div>
    <div class="shell disclaimer" role="note" aria-label="法律信息免责声明">
      <strong>免责声明</strong><p>${siteConfig.disclaimer}</p>
    </div>
    <div class="shell footer-bottom"><span>© ${new Date().getFullYear()} ${siteConfig.shortName}</span><span>服务区域：${lawyer.serviceArea}</span></div>
  </footer>`;

export const renderLayout = ({ title, description, path, body, schemas = [] }) => {
  const canonical = absoluteUrl(path);
  const faviconHref = relativeAsset(path, "/assets/favicon.svg");
  const stylesheetHref = relativeAsset(path, "/assets/styles.css");
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:site_name" content="${escapeHtml(siteConfig.name)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${absoluteUrl(lawyer.imagePath)}">
  <meta property="og:image:alt" content="李英姿律师｜湖南泰宗律师事务所">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#173f35">
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
