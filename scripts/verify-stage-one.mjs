import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { homeFaqs, lawyerFaqs } from "../site/data/faqs.mjs";
import { siteConfig, absoluteUrl } from "../site/data/site-config.mjs";

const root = process.cwd();
const pagePaths = ["index.html", join("lawyers", "li-yingzi", "index.html")];
const pages = await Promise.all(pagePaths.map(async (path) => ({ path, html: await readFile(join(root, "docs", path), "utf8") })));
const errors = [];
const titles = new Set();

for (const [groupName, faqs] of [["首页", homeFaqs], ["律师页", lawyerFaqs]]) {
  if (faqs.length < 6 || faqs.length > 8) errors.push(`${groupName}: FAQ 数量应为 6-8 条`);
  for (const { question, answer } of faqs) {
    if (answer.length < 80 || answer.length > 150) {
      errors.push(`${groupName}: FAQ 答案长度不是 80-150 字（${answer.length}）：${question}`);
    }
  }
}

for (const { path, html } of pages) {
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  if (!title) errors.push(`${path}: 缺少 title`);
  if (titles.has(title)) errors.push(`${path}: title 重复`);
  titles.add(title);

  for (const required of [
    `<link rel="canonical" href="${siteConfig.origin}`,
    'property="og:title"',
    'property="og:description"',
    'property="og:url"',
    "17775815262",
    "湖南泰宗律师事务所",
    "本文内容仅供一般法律知识参考"
  ]) {
    if (!html.includes(required)) errors.push(`${path}: 缺少 ${required}`);
  }

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  if (!blocks.length) errors.push(`${path}: 缺少 JSON-LD`);
  for (const [, json] of blocks) {
    try {
      const schema = JSON.parse(json);
      if (JSON.stringify(schema).includes("undefined")) errors.push(`${path}: JSON-LD 含 undefined`);
      if (schema["@type"] === "FAQPage") {
        for (const item of schema.mainEntity) {
          if (!html.includes(item.name) || !html.includes(item.acceptedAnswer.text)) {
            errors.push(`${path}: FAQ 可见内容与 JSON-LD 不一致：${item.name}`);
          }
        }
      }
    } catch (error) {
      errors.push(`${path}: JSON-LD 解析失败：${error.message}`);
    }
  }

  for (const schemaType of ["Person", "Organization", "LegalService", "WebSite", "FAQPage", "BreadcrumbList", "HowTo"]) {
    const found = blocks.some(([, json]) => {
      const type = JSON.parse(json)["@type"];
      return Array.isArray(type) ? type.includes(schemaType) : type === schemaType;
    });
    if (!found) errors.push(`${path}: 缺少 ${schemaType} 结构化数据`);
  }
}

const faqCollection = await readFile(join(root, "docs", "faq", "index.html"), "utf8");
const visibleFaqs = [...faqCollection.matchAll(/<summary>(.*?)<\/summary>/gs)].map((match) => match[1]);
const faqBlocks = [...faqCollection.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
  .map((match) => JSON.parse(match[1]));
const faqPage = faqBlocks.find((schema) => schema["@type"] === "FAQPage");
const structuredFaqs = faqPage?.mainEntity?.map((item) => item.name) || [];
if (JSON.stringify(visibleFaqs) !== JSON.stringify(structuredFaqs)) {
  errors.push(`FAQ合集页可见问答与FAQPage不一致：可见${visibleFaqs.length}条，结构化数据${structuredFaqs.length}条`);
}

const notFound = await readFile(join(root, "docs", "404.html"), "utf8");
if (!notFound.includes('<meta name="robots" content="noindex, follow">')) {
  errors.push("404.html: 缺少 noindex, follow");
}

for (const [path, expected] of [["/", `${siteConfig.origin}/`], ["/lawyers/li-yingzi/", absoluteUrl("/lawyers/li-yingzi/")]]) {
  const html = pages.find((page) => page.path === (path === "/" ? "index.html" : join("lawyers", "li-yingzi", "index.html")))?.html || "";
  if (!html.includes(`<link rel="canonical" href="${expected}">`)) errors.push(`${path}: canonical未保留GitHub Pages基路径`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Stage 1 verification passed for ${pages.length} pages.`);
}
