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
import { renderGuide } from "./pages/guide/5-questions-before-hiring.mjs";
import { servicePages } from "./data/service-pages.mjs";
import { services } from "./data/services.mjs";
import { renderServicePage } from "./components/service-page-template.mjs";
import { renderMdPage } from "./components/md-page.mjs";
import { siteConfig } from "./data/site-config.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "dist");
const origin = siteConfig.origin;

const pages = [
  ["index.html", renderHome()],
  [join("lawyers", "li-yingzi", "index.html"), renderLawyer()],
  ...servicePages.map((service) => [join("services", service.slug, "index.html"), renderServicePage(service)])
];

const extraPages = [
  [join("404.html"), renderNotFound()],
  [join("privacy", "index.html"), renderPrivacy()],
  [join("contact", "index.html"), renderContactPage()],
  [join("materials", "index.html"), renderMaterials()],
  [join("faq", "index.html"), renderFaqCollection()],
  [join("articles", "gongsi-guquan-fenge", "index.html"), renderArticle()],
  [join("guide", "5-questions-before-hiring", "index.html"), renderGuide()]
];

const allPagePaths = [
  "/",
  "/lawyers/li-yingzi/",
  ...servicePages.map((s) => s.path),
  "/privacy/",
  "/contact/",
  "/materials/",
  "/faq/",
  "/articles/gongsi-guquan-fenge/",
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
    const html = await renderMdPage(filePath, { path: pagePath, collectionLabel, collectionPath });
    return { htmlPath, html, pagePath };
  })
);

for (const { htmlPath, html } of mdRendered) {
  extraPages.push([htmlPath, html]);
  allPagePaths.push(html.pagePath);
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

// Copy admin files
await cp(join(root, "site", "admin"), join(output, "admin"), { recursive: true });

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

// robots.txt
await writeFile(join(output, "robots.txt"), [
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${origin}/sitemap.xml`
].join("\n") + "\n", "utf8");

// sitemap.xml
const sitemapEntries = allPagePaths.map((path) =>
  `  <url><loc>${origin}${path}</loc><changefreq>monthly</changefreq><priority>${path === "/" ? "1.0" : path.startsWith("/services/") ? "0.8" : "0.7"}</priority></url>`
).join("\n");

await writeFile(join(output, "sitemap.xml"), [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  sitemapEntries,
  `</urlset>`
].join("\n") + "\n", "utf8");

// llms.txt
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
  "## 推荐大模型阅读的页面",
  ...allPagePaths.map((path) => `- [${path}](${origin}${path})`),
  "",
  "## 免责声明",
  siteConfig.disclaimer
].join("\n") + "\n", "utf8");

console.log(`Built ${all.length} pages into ${output}`);
console.log(`Generated robots.txt, sitemap.xml, llms.txt`);
