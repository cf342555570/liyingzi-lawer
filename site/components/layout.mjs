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

const navItems = Object.freeze([
  ["首页", "/"],
  ["律师介绍", "/lawyers/li-yingzi/"],
  ["家事业务", "/#services"],
  ["长沙区县服务", "/areas/"],
  ["普法专栏", "/articles/"],
  ["FAQ问答", "/faq/"],
  ["资质核验", "/qualifications/"],
  ["联系我们", "/contact/"]
]);

const isActive = (currentPath, href) => {
  if (href === "/") return currentPath === "/";
  if (href.includes("#")) return currentPath === href.split("#")[0];
  return currentPath.startsWith(href);
};

const renderHeader = (currentPath) => `
  <header class="site-header">
    <div class="credential-bar">
      <div class="shell credential-inner">
        <span>${siteConfig.organization}</span>
        <span>${lawyer.credentialLabel}</span>
        <span>长沙婚姻家事法律服务</span>
      </div>
    </div>
    <div class="shell header-inner">
      <a class="brand" href="/" aria-label="英姿律见首页">
        <span class="brand-mark" aria-hidden="true">英姿</span>
        <span><strong>${siteConfig.shortName}</strong><small>${lawyer.displayName} · 婚姻家事</small></span>
      </a>
      <button class="hamburger" type="button" aria-label="打开导航菜单" aria-controls="mobile-nav-panel" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="mobile-nav-overlay" data-nav-close hidden></div>
      <nav class="main-nav" id="mobile-nav-panel" aria-label="主导航">
        <div class="mobile-nav-head">
          <strong>${siteConfig.shortName}</strong>
          <button class="mobile-nav-close" type="button" aria-label="关闭导航菜单" data-nav-close>×</button>
        </div>
        ${navItems.map(([label, href]) => `<a href="${href}"${isActive(currentPath, href) ? ` aria-current="page" class="active"` : ""}>${label}</a>`).join("")}
      </nav>
      <a class="phone-link" href="${siteConfig.phoneHref}" aria-label="拨打咨询电话 ${siteConfig.phone}">${siteConfig.phone}</a>
    </div>
  </header>`;

const footer = `
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div>
        <strong>${siteConfig.shortName}</strong>
        <p>${lawyer.displayName}｜${siteConfig.organization}</p>
        <p>${lawyer.credentialLabel}</p>
        <p>电话：<a href="${siteConfig.phoneHref}">${siteConfig.phone}</a></p>
        <p>公众号：${lawyer.contentBrand}</p>
      </div>
      <div class="footer-nav">
        <strong>浏览</strong>
        <nav aria-label="底部导航">
          ${navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
          <a href="/materials/">材料清单</a>
          <a href="/privacy/">隐私说明</a>
        </nav>
      </div>
    </div>
    <div class="shell disclaimer" role="note" aria-label="法律信息免责声明">
      <strong>官方说明</strong><p>${siteConfig.footerOfficialText}</p>
    </div>
    <div class="shell footer-bottom"><span>${siteConfig.shortName}</span><span>服务区域：${lawyer.serviceArea}</span></div>
  </footer>`;

const navScript = `
  <script>
    (() => {
      const button = document.querySelector(".hamburger");
      const panel = document.querySelector(".main-nav");
      const overlay = document.querySelector(".mobile-nav-overlay");
      const closeEls = document.querySelectorAll("[data-nav-close]");
      if (!button || !panel || !overlay) return;
      const setOpen = (open) => {
        document.documentElement.classList.toggle("nav-open", open);
        button.setAttribute("aria-expanded", String(open));
        overlay.hidden = !open;
      };
      button.addEventListener("click", () => setOpen(!document.documentElement.classList.contains("nav-open")));
      closeEls.forEach((el) => el.addEventListener("click", () => setOpen(false)));
      panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
      });
    })();
  </script>`;

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
  <meta property="og:image:alt" content="${escapeHtml(siteConfig.imageAlt)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="675">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="theme-color" content="#ffffff">
  <link rel="icon" href="${faviconHref}" type="image/svg+xml">
  <link rel="stylesheet" href="${stylesheetHref}">
  ${renderJsonLd(schemas)}
</head>
<body>
  <a class="skip-link" href="#main">跳到主要内容</a>
  ${renderHeader(path)}
  <main id="main">${body}</main>
  ${footer}
  ${navScript}
</body>
</html>`;
};
