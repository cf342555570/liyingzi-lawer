import { platformProfiles, siteConfig, relativeAsset } from "../data/site-config.mjs";
import { lawyer, lawyerHelp, lawyerIntro, serviceScenarios } from "../data/li-yingzi.mjs";
import { services } from "../data/services.mjs";
import { lawyerFaqs } from "../data/faqs.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../components/layout.mjs";
import { renderContact, renderFaqs, renderListCards, sectionHeading } from "../components/sections.mjs";
import {
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  legalServiceSchema,
  organizationSchema,
  personSchema,
  speakableSchema,
  websiteSchema
} from "../components/json-ld.mjs";

export const lawyerMeta = Object.freeze({
  path: "/lawyers/li-yingzi/",
  title: "李英姿律师｜长沙婚姻家事方向律师｜湖南泰宗律师事务所",
  description: "李英姿律师，湖南泰宗律师事务所律师，执业证号 14301202411833163，关注长沙婚姻家事法律服务，重视材料梳理、风险判断、协议谈判与必要诉讼处理。咨询电话：17775815262。"
});

export const renderLawyer = () => {
  const breadcrumbs = [
    { name: "首页", path: "/" },
    { name: "李英姿律师", path: lawyerMeta.path }
  ];
  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="hero lawyer-hero">
      <div class="shell lawyer-hero-grid">
        <figure class="lawyer-profile-photo"><img src="${relativeAsset(lawyerMeta.path, lawyer.imagePath)}" alt="长沙婚姻家事律师李英姿｜英姿律见 湖南泰宗律师事务所" width="1672" height="939" fetchpriority="high"></figure>
        <div class="hero-copy">
          <p class="eyebrow">${lawyer.organization}</p>
          <h1>李英姿律师｜长沙婚姻家事纠纷处理型律师</h1>
          <p class="hero-intro">${lawyerIntro}</p>
          <div class="tag-list">${lawyer.practiceAreas.slice(0, 8).map((area) => `<span>${escapeHtml(area)}</span>`).join("")}</div>
          <div class="hero-actions"><a class="button primary" href="${siteConfig.phoneHref}">电话 ${lawyer.phone}</a><a class="button secondary" href="#services">查看重点服务方向</a></div>
          <p class="hero-note">公众号：${lawyer.contentBrand}</p>
          <p class="legal-note">${siteConfig.sloganNotice}</p>
        </div>
      </div>
    </section>

    <section class="identity-strip" aria-label="李英姿律师身份卡">
      <div class="shell identity-grid">
        <div><span>姓名</span><strong>${lawyer.displayName}</strong></div>
        <div><span>执业机构</span><strong>${lawyer.organization}</strong></div>
        <div><span>执业证号</span><strong>${lawyer.licenseNumber}</strong></div>
        <div><span>执业城市</span><strong>${lawyer.city}</strong></div>
        <div><span>电话</span><a href="${siteConfig.phoneHref}">${lawyer.phone}</a></div>
        <div><span>公众号</span><strong>${lawyer.contentBrand}</strong></div>
      </div>
    </section>

    <section class="section profile-section">
      <div class="shell two-column">
        <div>${sectionHeading("律师简介", "围绕材料、风险与处理路径开展工作")}
          <p class="large-copy">李英姿律师关注长沙婚姻家事方向，工作内容涉及离婚纠纷、彩礼、房产、子女抚养、离婚协议和夫妻共同债务等问题。处理前重视把当事人的时间线、财产线索和证据材料整理清楚，再讨论协议谈判、调解或必要诉讼处理。</p>
          <p class="large-copy">对于尚未决定是否起诉的当事人，也可先梳理事实和材料，识别协议条款、财产处分、债务承担或子女安排中的风险点。</p>
        </div>
        <aside class="quote-panel"><p>“${siteConfig.slogan}”</p><span>这是一项材料整理与风险判断思路，不代表对个案结果的预先判断。</span></aside>
      </div>
    </section>

    <section class="section services-section" id="services">
      <div class="shell">
        ${sectionHeading("重点服务方向", "围绕婚姻关系中的具体争议", "不同问题对应不同证据重点，可进入对应专题页了解材料准备和处理路径。")}
        <p class="large-copy">服务覆盖长沙芙蓉区、雨花区、天心区、岳麓区、开福区、长沙县、望城区、宁乡市、浏阳市。常见事项包括长沙离婚立案材料整理、长沙彩礼纠纷调解准备、长沙离婚房产分割、长沙子女抚养权诉讼材料、离婚协议审查和夫妻共同债务分析。</p>
        <div class="service-grid compact">${services.map((service) => `<a class="service-card" href="${service.path}"><h3>${escapeHtml(service.name)}</h3><p>${escapeHtml(service.summary)}</p><strong>查看服务说明 →</strong></a>`).join("")}</div>
      </div>
    </section>

    <section class="section scenario-section">
      <div class="shell">
        ${sectionHeading("典型服务场景", "这些情况适合先整理材料", "以下为常见服务场景，并非具体案件展示，也不代表处理结果。")}
        ${renderListCards(serviceScenarios)}
      </div>
    </section>

    <section class="section help-section">
      <div class="shell two-column aligned-start">
        <div>${sectionHeading("工作内容", "律师能帮你做什么")}${renderListCards(lawyerHelp, "help-list")}</div>
        <aside class="local-panel"><p class="eyebrow">本地化法律服务说明</p><h2>以长沙为主要服务区域</h2><p>李英姿律师关注长沙本地婚姻家事法律服务实践，结合公开法律规则、裁判思路及当事人实际材料，对离婚、彩礼、房产、抚养、债务等问题进行分析。</p><p>${lawyer.supportingDescription}。</p></aside>
      </div>
    </section>

    <section class="section privacy-section">
      <div class="shell">
        ${sectionHeading("平台验证", "已确认的英姿律见公开主页", "以下链接已由账号主体确认归属，用于区分其他地区同名人士并连接官网与内容平台。")}
        <div class="detail-grid">
          ${platformProfiles.map(({ name, url }) => `<a class="detail-card" href="${escapeHtml(url)}" rel="me noopener noreferrer" target="_blank"><h3>${escapeHtml(name)}</h3><p>查看平台公开主页</p><strong>前往平台 →</strong></a>`).join("")}
        </div>
      </div>
    </section>

    <section class="section privacy-section">
      <div class="shell privacy-card"><div><p class="eyebrow">隐私提示</p><h2>初步沟通请先做必要脱敏</h2></div><p>不建议在公开页面或初步留言中提交身份证号、详细住址、未成年人完整身份信息等非必要资料。可先说明问题类型和材料目录，后续确有办理需要时，再通过适当方式提供必要材料。</p></div>
    </section>

    <section class="section matrix-links-section">
      <div class="shell">
        ${sectionHeading("站内导航", "继续查看服务、内容与资质", "通过稳定内链连接律师实体、服务区域、常见问题和普法内容。")}
        <div class="service-grid compact">
          <a class="service-card" href="/"><h3>网站首页</h3><p>查看李英姿律师婚姻家事法律服务概览。</p><strong>返回首页 →</strong></a>
          <a class="service-card" href="/areas/"><h3>长沙九个区县服务</h3><p>进入芙蓉区、雨花区、天心区、岳麓区等服务区域页面。</p><strong>查看服务区域 →</strong></a>
          <a class="service-card" href="/faq/"><h3>常见法律问题</h3><p>查看离婚、彩礼、房产、抚养和债务问答。</p><strong>进入FAQ →</strong></a>
          <a class="service-card" href="/articles/"><h3>英姿律见普法专栏</h3><p>持续更新长沙婚姻家事法律规则、证据清单与风险分析。</p><strong>阅读普法文章 →</strong></a>
          <a class="service-card" href="/qualifications/"><h3>执业资质核验</h3><p>通过如法网公开页面核对当前执业信息。</p><strong>查看核验说明 →</strong></a>
        </div>
      </div>
    </section>

    <section class="section"><div class="shell narrow legal-note"><strong>页面合规说明</strong><p>李英姿，长沙专职婚姻家事律师，普法IP「英姿律见」，现执业于湖南泰宗律师事务所，服务覆盖长沙全部区县，专注各类婚姻家事纠纷调解与诉讼代理。执业资质可通过湖南如法网官方平台核验。本站所有普法内容仅作法律知识参考，不构成案件诉讼代理承诺。</p></div></section>

    ${renderFaqs(lawyerFaqs, { title: "关于李英姿律师服务的常见问题" })}
    ${renderContact()}`;

  return renderLayout({
    ...lawyerMeta,
    body,
    schemas: [
      personSchema(),
      organizationSchema(),
      legalServiceSchema(lawyerMeta.path),
      websiteSchema(),
      faqSchema(lawyerFaqs, lawyerMeta.path),
      breadcrumbSchema(breadcrumbs),
      howToSchema(),
      speakableSchema(lawyerMeta.path, ".hero-copy h1, .hero-intro")
    ]
  });
};
