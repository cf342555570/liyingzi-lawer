import { escapeHtml } from "./layout.mjs";

export const renderDetailCards = (items, className = "detail-grid") => `<div class="${className}">${items.map((item) => {
  const [title, body] = Array.isArray(item) ? item : [item, ""];
  return `<article class="detail-card"><h3>${escapeHtml(title)}</h3>${body ? `<p>${escapeHtml(body)}</p>` : ""}</article>`;
}).join("")}</div>`;

export const renderMaterialList = (items) => `<ol class="material-list">${items.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(item)}</p></li>`).join("")}</ol>`;
