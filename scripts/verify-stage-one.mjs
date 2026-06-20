import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { homeFaqs, lawyerFaqs } from "../site/data/faqs.mjs";

const root = process.cwd();
const pagePaths = ["index.html", join("lawyers", "li-yingzi", "index.html")];
const pages = await Promise.all(pagePaths.map(async (path) => ({ path, html: await readFile(join(root, "dist", path), "utf8") })));
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
    '<link rel="canonical" href="https://buerlawyer.com',
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

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Stage 1 verification passed for ${pages.length} pages.`);
}
