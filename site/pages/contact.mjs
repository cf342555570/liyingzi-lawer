import { siteConfig, relativeAsset } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { renderBreadcrumbs, renderLayout } from "../components/layout.mjs";
import { sectionHeading } from "../components/sections.mjs";
import { breadcrumbSchema, contactPageSchema, legalServiceSchema, organizationSchema, personSchema, speakableSchema, websiteSchema } from "../components/json-ld.mjs";

export const contactMeta = Object.freeze({
  path: "/contact/",
  title: "联系李英姿律师｜英姿律见",
  description: `联系李英姿律师，长沙婚姻家事法律服务。电话：${siteConfig.phone}，公众号：英姿律见。律所地址：${siteConfig.address}。`
});

export const renderContactPage = () => {
  const breadcrumbs = [{ name: "首页", path: "/" }, { name: "联系我们", path: "/contact/" }];
  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="section contact-page-section">
      <div class="shell narrow">
        <h1>联系我们</h1>
        <p class="large-copy">初步沟通用于了解问题类型、目前阶段和已经掌握的基本情况，帮助判断服务是否对口。</p>

        <div class="contact-methods">
          <div class="info-card">
            <span class="card-dot" aria-hidden="true"></span>
            <div>
              <p class="eyebrow">电话</p>
              <a class="button primary" href="${siteConfig.phoneHref}" style="display:inline-block;margin:0.5rem 0;">${siteConfig.phone}</a>
              <p>建议通话前先准备问题类型、基本时间线和现有材料清单，便于高效沟通。</p>
            </div>
          </div>

          <div class="info-card">
            <span class="card-dot" aria-hidden="true"></span>
            <div>
              <p class="eyebrow">微信公众号</p>
              <p><strong>${lawyer.contentBrand}</strong></p>
              <p>关注公众号可了解婚姻家事相关法律知识和服务方向。</p>
            </div>
          </div>

          <div class="info-card qr-card">
            <span class="card-dot" aria-hidden="true"></span>
            <div>
              <p class="eyebrow">微信联系</p>
              <img src="${relativeAsset(contactMeta.path, lawyer.wechatQrPath)}" alt="${siteConfig.imageAlt}" class="wechat-qr-img" width="160" height="160" loading="lazy">
              <p>扫码添加微信进行初步沟通。是否建立正式委托关系，以双方后续签署书面委托合同为准。</p>
            </div>
          </div>

          <div class="info-card">
            <span class="card-dot" aria-hidden="true"></span>
            <div>
              <p class="eyebrow">执业机构</p>
              <p><strong>${lawyer.organization}</strong></p>
              <p>律师：${lawyer.displayName}<br>资质核验：湖南如法网官方平台<br>执业城市：${lawyer.city}</p>
              <p><a href="/qualifications/">查看资质核验说明</a></p>
            </div>
          </div>

          <div class="info-card address-card">
            <span class="card-dot" aria-hidden="true"></span>
            <div>
              <p class="eyebrow">律所地址</p>
              <p><strong>${siteConfig.address}</strong></p>
              <p>${siteConfig.transitNote}。来访前请电话预约，以便安排接待时间。</p>
            </div>
          </div>
        </div>

        <div class="map-container map-placeholder" aria-label="律所到访指引">
          <p class="eyebrow">到访指引</p>
          <h2>${siteConfig.address}</h2>
          <p>${siteConfig.transitNote}。具体路线请以地图实时导航为准，来访前建议电话确认。</p>
        </div>

        ${sectionHeading("咨询前须知", "初步沟通不等于正式委托")}
        <div style="margin:1.5rem 0;">
          <ol class="step-grid">
            <li><span>01</span><h3>说明问题类型</h3><p>是离婚、彩礼、房产、抚养、债务还是其他家事问题。</p></li>
            <li><span>02</span><h3>说明目前阶段</h3><p>是否已起诉、正在协商、刚有分歧，还是想先了解风险。</p></li>
            <li><span>03</span><h3>列出现有材料</h3><p>结婚登记材料、房产材料、银行流水、聊天记录等大致清单。</p></li>
            <li><span>04</span><h3>确认后续步骤</h3><p>是否需要正式委托，以律师事务所依法办理并签署书面合同为准。</p></li>
          </ol>
        </div>

        <div class="privacy-card" style="background:#f8f6f0;padding:1.5rem;border-radius:8px;margin:2rem 0;">
          <p class="eyebrow">隐私提示</p>
          <h2>提交信息不等于建立委托关系</h2>
          <p>初步沟通时无需提供身份证号、详细住址或未成年人完整身份信息等非必要敏感资料。正式委托以双方签署书面委托合同为准，由${siteConfig.organization}统一接受委托并依法办理。</p>
          <p style="font-size:0.875rem;color:#666;">${siteConfig.sloganNotice}</p>
        </div>

        <p style="font-size:0.875rem;color:#999;margin-top:2rem;"><strong>免责声明</strong><br>${siteConfig.disclaimer}</p>
      </div>
    </section>`;

  return renderLayout({
    ...contactMeta,
    body,
    schemas: [personSchema(), organizationSchema(), legalServiceSchema(), websiteSchema(), breadcrumbSchema(breadcrumbs), contactPageSchema(), speakableSchema("/contact/")]
  });
};
