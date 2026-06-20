import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { servicePages } from "../site/data/service-pages.mjs";
import { serviceFaqs } from "../site/data/service-faqs.mjs";

const errors = [];
const titles = new Set();
const contentSignatures = { materials: new Set(), help: new Set(), scenarios: new Set(), faqs: new Set() };
const forbidden = ["资深", "知名", "专家", "权威", "金牌", "胜诉率", "包赢", "保证", "必拿", "十大", "最专业", "AI推荐", "高净值首选", "复杂大案首选", "上千案例", "法院关系", "熟悉法官", "内部渠道", "特殊资源", "免费咨询", "100%"];

if (servicePages.length < 8) errors.push(`服务页数量不足：${servicePages.length}`);

for (const service of servicePages) {
  const faqs = serviceFaqs[service.slug];
  const file = join("dist", "services", service.slug, "index.html");
  let html = "";
  try { html = await readFile(file, "utf8"); } catch { errors.push(`缺少页面：${file}`); continue; }

  if (titles.has(service.title)) errors.push(`title重复：${service.title}`);
  titles.add(service.title);
  if (!html.includes(`<h1>${service.h1}</h1>`)) errors.push(`${service.slug}: H1不匹配`);
  if (!html.includes(`<link rel="canonical" href="https://buerlawyer.com${service.path}">`)) errors.push(`${service.slug}: canonical错误`);
  for (const required of ["og:title", "og:description", "og:url", "17775815262", "湖南泰宗律师事务所", "英姿律见", "本文内容仅供一般法律知识参考"]) {
    if (!html.includes(required)) errors.push(`${service.slug}: 缺少${required}`);
  }
  for (const word of forbidden) if (html.includes(word)) errors.push(`${service.slug}: 出现风险词“${word}”`);
  for (const oldValue of ["020-000000", "258506508", "http://www.buerlawyer.com", "https://www.buerlawyer.com", "昌旭律师事务所"]) if (html.includes(oldValue)) errors.push(`${service.slug}: 出现旧值${oldValue}`);

  if (!faqs || faqs.length < 6 || faqs.length > 8) errors.push(`${service.slug}: FAQ应为6-8条`);
  for (const faq of faqs || []) {
    if (faq.answer.length < 80 || faq.answer.length > 150) errors.push(`${service.slug}: FAQ长度${faq.answer.length}不合规：${faq.question}`);
    if (!html.includes(faq.question) || !html.includes(faq.answer)) errors.push(`${service.slug}: 可见FAQ与数据不一致：${faq.question}`);
  }

  for (const key of ["materials", "help", "scenarios"]) {
    const signature = JSON.stringify(service[key]);
    if (contentSignatures[key].has(signature)) errors.push(`${service.slug}: ${key}与其他页面重复`);
    contentSignatures[key].add(signature);
  }
  const faqSignature = JSON.stringify(faqs);
  if (contentSignatures.faqs.has(faqSignature)) errors.push(`${service.slug}: FAQ与其他页面重复`);
  contentSignatures.faqs.add(faqSignature);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
  const pageService = blocks.find((schema) => schema["@id"] === `https://buerlawyer.com${service.path}#service`);
  if (!pageService) errors.push(`${service.slug}: 缺少独立LegalService JSON-LD`);
  const faqSchema = blocks.find((schema) => schema["@type"] === "FAQPage");
  if (JSON.stringify(faqSchema?.mainEntity?.map((item) => [item.name, item.acceptedAnswer.text])) !== JSON.stringify(faqs.map((item) => [item.question, item.answer]))) errors.push(`${service.slug}: FAQPage JSON-LD不一致`);

  for (const relatedSlug of service.related) {
    try { await stat(join("dist", "services", relatedSlug, "index.html")); } catch { errors.push(`${service.slug}: 相关推荐链接不存在：${relatedSlug}`); }
  }
}

if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`Stage 2 verification passed for ${servicePages.length} service pages.`);
