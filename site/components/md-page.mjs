import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig, absoluteUrl } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "./layout.mjs";
import { renderContact } from "./sections.mjs";
import { articleSchema, breadcrumbSchema, howToSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "./json-ld.mjs";
import { renderMarkdown } from "./markdown.mjs";

export const parseFrontmatter = (content) => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { body: content };
  const front = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (kv) front[kv[1]] = kv[2].trim();
  }
  return { ...front, body: match[2].trim() };
};

export const renderMdPage = async (filePath, options = {}) => {
  const raw = await readFile(filePath, "utf8");
  const { title, description, date, category, cover, source, sourceUrl, body } = parseFrontmatter(raw);

  const pagePath = options.path || `/${filePath.replace(/\\/g, "/").replace(/^content\//, "").replace(/\.md$/, "")}/`;
  const displayTitle = title || options.defaultTitle || "未命名";
  const displayDate = date || new Date().toISOString().slice(0, 10);
  const breadcrumbLabel = options.breadcrumbLabel || displayTitle;
  const collectionLabel = options.collectionLabel || "内容";
  const collectionPath = options.collectionPath || "/";

  const breadcrumbs = [
    { name: "首页", path: "/" },
    { name: collectionLabel, path: collectionPath },
    { name: breadcrumbLabel, path: pagePath }
  ];

  const htmlBody = `
    ${renderBreadcrumbs(breadcrumbs)}
    <article class="section" aria-labelledby="md-title">
      <div class="shell narrow">
        ${category ? `<p class="eyebrow">${escapeHtml(category)}</p>` : ""}
        <h1 id="md-title">${escapeHtml(displayTitle)}</h1>
        <p style="color:#666;font-size:0.875rem;">发布日期：${displayDate} · ${lawyer.displayName} · ${lawyer.organization}</p>
        <p class="legal-note">${siteConfig.sloganNotice}</p>
        ${cover ? `<figure class="article-cover" style="margin:1.5rem 0;"><img src="${escapeHtml(cover)}" alt="${escapeHtml(displayTitle)}" style="display:block;inline-size:72rem;max-inline-size:100vw;height:auto;border-radius:8px;"></figure>` : ""}
        ${renderMarkdown(body)}
        ${source || sourceUrl ? `<p style="margin-top:1.5rem;font-size:0.95rem;color:#555;">${source ? `${escapeHtml(source)}` : ""}${source && sourceUrl ? " · " : ""}${sourceUrl ? `<a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener">原始链接</a>` : ""}</p>` : ""}
        <div class="privacy-card" style="background:#f8f6f0;padding:1.5rem;border-radius:8px;margin:2rem 0;">
          <p class="eyebrow">说明</p>
          <p>${siteConfig.disclaimer}</p>
        </div>
      </div>
    </article>
    ${renderContact()}`;

  return renderLayout({
    title: `${escapeHtml(displayTitle)}｜英姿律见｜李英姿律师`,
    description: description || displayTitle,
    path: pagePath,
    body: htmlBody,
    schemas: [
      personSchema(),
      organizationSchema(),
      legalServiceSchema(),
      websiteSchema(),
      articleSchema({
        title: `${escapeHtml(displayTitle)}｜英姿律见`,
        description: description || displayTitle,
        path: pagePath,
        datePublished: displayDate,
        author: lawyer.displayName
      }),
      breadcrumbSchema(breadcrumbs),
      howToSchema()
    ]
  });
};
