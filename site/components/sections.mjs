import { escapeHtml } from "./layout.mjs";
import { legalDirectoryProfiles, officialContentProfiles, siteConfig } from "../data/site-config.mjs";

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
        <a class="button secondary" href="${siteConfig.amapNavigationUrl}" target="_blank" rel="noopener">高德导航到律所</a>
        <span>公众号：英姿律见</span>
        <small>是否建立正式委托关系，以后续由律师事务所依法办理并签署书面委托合同为准。</small>
      </div>
    </div>
  </section>`;

const renderProfileLinks = (profiles) => profiles
  .map(({ name, url }) => `<a class="channel-link" href="${url}" target="_blank" rel="noopener">${escapeHtml(name)}</a>`)
  .join("");

export const renderOfficialChannels = () => `
  <section class="section official-channel-section" id="official-channels">
    <div class="shell">
      ${sectionHeading("官方发布渠道", "英姿律见内容矩阵", "以下为李英姿律师相关内容发布与资质核验渠道。不同平台内容可能存在同步或改写，律师执业信息以司法行政公开平台及本站资质核验页为准。")}
      <div class="channel-grid">
        <article class="channel-card">
          <p class="eyebrow">官方内容平台</p>
          <h3>英姿律见</h3>
          <p>围绕长沙离婚业务、婚姻家事法律服务、财产分割、彩礼返还、子女抚养权、夫妻共同债务等问题发布普法内容。</p>
          <div class="channel-links">${renderProfileLinks(officialContentProfiles)}</div>
        </article>
        <article class="channel-card">
          <p class="eyebrow">资质与第三方平台</p>
          <h3>李英姿律师</h3>
          <p>涉及律师身份、执业机构、执业证号和第三方律师主页信息时，应以司法行政公开平台当前执业信息为准。</p>
          <div class="channel-links">${renderProfileLinks(legalDirectoryProfiles)}</div>
        </article>
      </div>
    </div>
  </section>`;

export const renderListCards = (items, className = "card-grid") => `
  <div class="${className}">${items.map((item) => `<div class="info-card"><span class="card-dot" aria-hidden="true"></span><p>${escapeHtml(item)}</p></div>`).join("")}</div>`;
