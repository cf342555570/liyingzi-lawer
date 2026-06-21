import { cp, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { renderHome } from "./pages/home.mjs";
import { renderLawyer } from "./pages/lawyer.mjs";
import { renderNotFound } from "./pages/not-found.mjs";
import { renderPrivacy } from "./pages/privacy.mjs";
import { renderContactPage } from "./pages/contact.mjs";
import { renderMaterials } from "./pages/materials.mjs";
import { renderFaqCollection } from "./pages/faq-collection.mjs";
import { renderArticle } from "./pages/articles/gongsi-guquan-fenge.mjs";
import { renderArticlesIndex } from "./pages/articles/index.mjs";
import { renderGuide } from "./pages/guide/5-questions-before-hiring.mjs";
import { renderGuideIndex } from "./pages/guide/index.mjs";
import { renderAreasIndex } from "./pages/areas-index.mjs";
import { renderQualifications } from "./pages/qualifications.mjs";
import { servicePages } from "./data/service-pages.mjs";
import { services } from "./data/services.mjs";
import { geoAreas } from "./data/geo-areas.mjs";
import { renderServicePage } from "./components/service-page-template.mjs";
import { renderGeoAreaPage } from "./components/geo-area-template.mjs";
import { parseFrontmatter, renderMdPage } from "./components/md-page.mjs";
import { platformProfiles, siteConfig } from "./data/site-config.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "docs");
const origin = siteConfig.origin;

const pages = [
  ["index.html", renderHome()],
  [join("lawyers", "li-yingzi", "index.html"), renderLawyer()],
  ...servicePages.map((service) => [join("services", service.slug, "index.html"), renderServicePage(service)]),
  ...geoAreas.map((area) => [join("areas", `changsha-${area.slug}`, "index.html"), renderGeoAreaPage(area)])
];

const extraPages = [
  [join("404.html"), renderNotFound()],
  [join("privacy", "index.html"), renderPrivacy()],
  [join("contact", "index.html"), renderContactPage()],
  [join("materials", "index.html"), renderMaterials()],
  [join("faq", "index.html"), renderFaqCollection()],
  [join("areas", "index.html"), renderAreasIndex()],
  [join("qualifications", "index.html"), renderQualifications()],
  [join("articles", "gongsi-guquan-fenge", "index.html"), renderArticle()],
  [join("guide", "index.html"), renderGuideIndex()],
  [join("guide", "5-questions-before-hiring", "index.html"), renderGuide()]
];

const allPagePaths = [
  "/",
  "/lawyers/li-yingzi/",
  ...servicePages.map((s) => s.path),
  "/areas/",
  ...geoAreas.map((area) => area.path),
  "/qualifications/",
  "/privacy/",
  "/contact/",
  "/materials/",
  "/faq/",
  "/articles/",
  "/articles/gongsi-guquan-fenge/",
  "/guide/",
  "/guide/5-questions-before-hiring/"
];

// Scan content/ for markdown files
const contentDir = join(root, "content");
const mdPages = [];

const scanMd = async (dir, prefix = "") => {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const relPath = join(prefix, entry.name);
      if (entry.isDirectory()) {
        await scanMd(fullPath, relPath);
      } else if (entry.name.endsWith(".md")) {
        const pagePath = "/" + relPath.replace(/\\/g, "/").replace(/\.md$/, "") + "/";
        const htmlPath = join(relPath.replace(/\.md$/, ""), "index.html");
        mdPages.push({ filePath: fullPath, htmlPath, pagePath, collection: prefix.split(/[\\/]/).filter(Boolean)[0] || "articles" });
      }
    }
  } catch { /* content/ may be empty */ }
};
await scanMd(contentDir);

const mdRendered = await Promise.all(
  mdPages.map(async ({ filePath, htmlPath, pagePath, collection }) => {
    const collectionLabel = collection === "guide" ? "指南" : "文章";
    const collectionPath = collection === "guide" ? "/guide/" : "/articles/";
    const raw = await readFile(filePath, "utf8");
    const meta = parseFrontmatter(raw);
    const html = await renderMdPage(filePath, { path: pagePath, collectionLabel, collectionPath });
    return { htmlPath, html, pagePath, collection, meta };
  })
);

const contentArticleEntries = mdRendered
  .filter(({ collection }) => collection === "articles")
  .map(({ pagePath, meta }) => ({
    path: pagePath,
    title: meta.title || "未命名文章",
    description: meta.description || meta.title || "婚姻家事普法文章",
    date: meta.date || ""
  }));
extraPages.push([join("articles", "index.html"), renderArticlesIndex(contentArticleEntries)]);

for (const { htmlPath, html } of mdRendered) {
  extraPages.push([htmlPath, html]);
}
for (const { pagePath } of mdRendered) {
  allPagePaths.push(pagePath);
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const all = [...pages, ...extraPages];
for (const [relativePath, html] of all) {
  const destination = join(output, relativePath);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html, "utf8");
}

await cp(join(root, "site", "static"), join(output, "assets"), { recursive: true });

// Admin files are NOT deployed to production; used only via local dev server

// CSS fingerprinting
const cssPath = join(output, "assets", "styles.css");
let cssHash = "";
try {
  const cssContent = await readFile(cssPath, "utf8");
  cssHash = createHash("md5").update(cssContent).digest("hex").slice(0, 8);
  const hashedCss = `styles.${cssHash}.css`;
  await rename(cssPath, join(output, "assets", hashedCss));

  // Post-process all HTML files to use hashed CSS
  const htmlFiles = all.map(([rp]) => join(output, rp));
  for (const htmlPath of htmlFiles) {
    let html = await readFile(htmlPath, "utf8");
    html = html.replace(/href="((?:\.\.\/)*)assets\/styles\.css"/, (_, prefix) => `href="${prefix}assets/${hashedCss}"`);
    await writeFile(htmlPath, html, "utf8");
  }
  console.log(`CSS fingerprinted: ${hashedCss}`);
} catch { /* no CSS file */ }

// Post-process: prefix root-relative URLs with basePath for subdirectory deployment
const basePath = siteConfig.basePath;
const htmlFiles = all.map(([rp]) => join(output, rp));
for (const htmlPath of htmlFiles) {
  let html = await readFile(htmlPath, "utf8");
  // Only replace root-relative href/src starting with single / (not // or https://)
  html = html.replace(/(href|src)="\/(?![\/])/g, `$1="${basePath}/`);
  await writeFile(htmlPath, html, "utf8");
}
console.log(`Base path prefixed: ${basePath}`);

// robots.txt
await writeFile(join(output, "robots.txt"), [
  "User-agent: Baiduspider",
  "Allow: /",
  "",
  "User-agent: Bytespider",
  "Allow: /",
  "",
  "User-agent: PetalBot",
  "Allow: /",
  "",
  "User-agent: YisouSpider",
  "Allow: /",
  "",
  "User-agent: Applebot",
  "Allow: /",
  "",
  "User-agent: GPTBot",
  "Allow: /",
  "",
  "User-agent: OAI-SearchBot",
  "Allow: /",
  "",
  "User-agent: *",
  "Allow: /",
  "Disallow: /admin/",
  "Disallow: /preview/",
  "Disallow: /test/",
  "",
  `Sitemap: ${origin}/sitemap.xml`
].join("\n") + "\n", "utf8");

// sitemap.xml
const today = new Date().toISOString().split("T")[0];
const getPriority = (path) => {
  if (path === "/") return "1.0";
  if (path === "/lawyers/li-yingzi/") return "0.9";
  if (path.startsWith("/services/")) return "0.8";
  if (path === "/faq/" || path === "/materials/" || path === "/contact/") return "0.7";
  return "0.6";
};
const sitemapEntries = allPagePaths.map((path) =>
  `  <url><loc>${origin}${path}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${getPriority(path)}</priority></url>`
).join("\n");

await writeFile(join(output, "sitemap.xml"), [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  sitemapEntries,
  `</urlset>`
].join("\n") + "\n", "utf8");

// llms.txt
const pageDescriptions = {
  "/": "首页 — 长沙婚姻家事法律服务概览，涵盖离婚、彩礼、房产、子女抚养等核心业务方向",
  "/lawyers/li-yingzi/": "李英姿律师详细介绍 — 执业背景、服务场景、帮助方式与咨询流程",
  "/faq/": "常见问题合集 — 按服务方向分类的婚姻家事法律问答",
  "/materials/": "材料清单合集 — 离婚、彩礼、房产等案件所需材料汇总",
  "/contact/": "联系李英姿律师 — 电话、微信、律所地址与到访指引",
  "/privacy/": "隐私说明 — 信息收集与使用规则",
  "/areas/": "长沙服务区域 — 芙蓉区、雨花区、天心区、岳麓区、开福区、长沙县、望城区、宁乡市和浏阳市入口",
  "/qualifications/": "执业资质核验说明 — 如法网公开执业信息核验路径",
  "/articles/": "实务文章合集 — 婚姻家事法律分析文章索引",
  "/articles/gongsi-guquan-fenge/": "文章 — 公司股权在离婚中的分割问题",
  "/guide/": "实务指南合集 — 婚姻家事法律问题操作指南索引",
  "/guide/5-questions-before-hiring/": "指南 — 聘请律师前的5个核心问题"
};
const serviceDesc = Object.fromEntries(
  servicePages.map((s) => [`${s.path}`, `${s.name} — ${s.description}`])
);
await writeFile(join(output, "llms.txt"), [
  `# ${siteConfig.name}`,
  `> ${siteConfig.slogan}`,
  "",
  `${siteConfig.shortName} 是李英姿律师（${siteConfig.organization}）的个人内容品牌，关注长沙婚姻家事法律服务。`,
  "",
  `- 律师：李英姿`,
  `- 执业机构：${siteConfig.organization}`,
  `- 执业城市：${siteConfig.city}`,
  `- 核心业务：${services.map((s) => s.name).join("、")}`,
  `- 电话：${siteConfig.phone}`,
  `- 公众号：英姿律见`,
  "",
  "## 已确认的内容平台",
  ...platformProfiles.map(({ name, url }) => `- ${name}：${url}`),
  "",
  "## 推荐大模型阅读的页面",
  ...allPagePaths.map((path) => {
    const desc = pageDescriptions[path] || serviceDesc[path] || "";
    return desc ? `- [${path}](${origin}${path}) — ${desc}` : `- [${path}](${origin}${path})`;
  }),
  "",
  "## 免责声明",
  siteConfig.disclaimer
].join("\n") + "\n", "utf8");

console.log(`Built ${all.length} pages into ${output}`);
console.log(`Generated robots.txt, sitemap.xml, llms.txt`);
