import { escapeHtml } from "./layout.mjs";
import { siteConfig } from "../data/site-config.mjs";

export const sectionHeading = (eyebrow, title, intro = "") => `
  <div class="section-heading">
    <p class="eyebrow">${escapeHtml(eyebrow)}</p>
    <h2>${escapeHtml(title)}</h2>
    ${intro ? `<p>${escapeHtml(intro)}</p>` : ""}
  </div>`;

export const renderFaqs = (faqs, { eyebrow = "常见问题", title = "咨询前常见问题" } = {}) => `
  <section class="section faq-section" id="faq">
    <div class="shell narrow">
      ${sectionHeading(eyebrow, title, "以下回答用于说明一般流程，具体问题仍需结合事实和材料判断。")}
      <div class="faq-list">
        ${faqs.map(({ question, answer }) => `
          <details class="faq-item">
            <summary>${escapeHtml(question)}</summary>
            <p>${escapeHtml(answer)}</p>
          </details>`).join("")}
      </div>
    </div>
  </section>`;

export const renderContact = () => `
  <section class="section contact-section" id="contact">
    <div class="shell contact-card">
      <div><p class="eyebrow">联系与下一步</p><h2>先说明问题，再整理材料</h2><p>初步沟通可说明争议类型、目前阶段和已经掌握的材料，不必一开始提交非必要的敏感信息。</p></div>
      <div class="contact-actions">
        <a class="button primary" href="${siteConfig.phoneHref}">拨打 ${siteConfig.phone}</a>
        <span>公众号：英姿律见</span>
        <small>是否建立正式委托关系，以后续由律师事务所依法办理并签署书面委托合同为准。</small>
      </div>
    </div>
  </section>`;

export const renderListCards = (items, className = "card-grid") => `
  <div class="${className}">${items.map((item) => `<div class="info-card"><span class="card-dot" aria-hidden="true"></span><p>${escapeHtml(item)}</p></div>`).join("")}</div>`;
