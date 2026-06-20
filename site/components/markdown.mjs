import { escapeHtml } from "./layout.mjs";

const parseInline = (text) =>
  escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

export const renderMarkdown = (md) => {
  const lines = md.split("\n");
  const html = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // headings
    if (/^### (.+)/.test(line)) {
      html.push(`<h3>${parseInline(RegExp.$1)}</h3>`);
      i++;
      continue;
    }
    if (/^## (.+)/.test(line)) {
      html.push(`<h2>${parseInline(RegExp.$1)}</h2>`);
      i++;
      continue;
    }
    if (/^# (.+)/.test(line)) {
      html.push(`<h1>${parseInline(RegExp.$1)}</h1>`);
      i++;
      continue;
    }

    // unordered list
    if (/^- (.+)/.test(line)) {
      const items = [];
      while (i < lines.length && /^- (.+)/.test(lines[i])) {
        items.push(`<li>${parseInline(RegExp.$1)}</li>`);
        i++;
      }
      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    // ordered list
    if (/^\d+\. (.+)/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\. (.+)/.test(lines[i])) {
        items.push(`<li>${parseInline(RegExp.$1)}</li>`);
        i++;
      }
      html.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    // blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // paragraph
    const paragraphLines = [];
    while (i < lines.length && lines[i].trim() !== "" && !/^(#{1,3} |- |\d+\. )/.test(lines[i])) {
      paragraphLines.push(lines[i]);
      i++;
    }
    if (paragraphLines.length) {
      html.push(`<p>${paragraphLines.map(parseInline).join("<br>")}</p>`);
    } else {
      i++;
    }
  }

  return html.join("\n");
};
