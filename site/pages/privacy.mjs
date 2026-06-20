import { siteConfig } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../components/layout.mjs";
import { renderContact } from "../components/sections.mjs";
import { breadcrumbSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "../components/json-ld.mjs";

export const privacyMeta = Object.freeze({
  path: "/privacy/",
  title: "隐私保护说明｜英姿律见｜李英姿律师",
  description: "英姿律见（李英姿律师）隐私保护说明，说明信息收集、使用方式以及初步沟通中的隐私注意事项。"
});

export const renderPrivacy = () => {
  const breadcrumbs = [{ name: "首页", path: "/" }, { name: "隐私保护说明", path: "/privacy/" }];
  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="section privacy-policy-section">
      <div class="shell narrow">
        <h1>隐私保护说明</h1>
        <p class="large-copy">${siteConfig.shortName}（${lawyer.displayName}，${siteConfig.organization}）重视您的隐私保护。本说明介绍在初步沟通、咨询及后续法律服务过程中涉及个人信息处理的基本方式。</p>

        <h2>一、信息收集范围</h2>
        <p>初步沟通阶段，我们建议您仅提供问题类型、争议概况和基本材料目录，无需发送身份证号、详细住址、未成年人完整身份信息等非必要敏感资料。</p>
        <p>后续确有委托需要时，再根据律师事务所要求通过适当方式提供必要材料。</p>

        <h2>二、信息使用方式</h2>
        <p>您提供的信息仅用于：了解案件基本情况、判断服务是否对口、分析法律风险与处理路径，以及依法办理委托手续。</p>
        <p>未经您同意，不会将您的信息用于上述目的之外的用途。</p>

        <h2>三、信息保护</h2>
        <p>我们采取合理措施保护您的信息安全。正式委托后，相关材料按照律师执业规范和律师事务所管理制度进行保管。</p>

        <h2>四、委托关系说明</h2>
        <p>提交咨询信息或进行初步沟通，不代表已经形成正式委托关系。正式委托关系以双方签署书面委托合同为准，由${siteConfig.organization}统一接受委托并依法办理。</p>

        <h2>五、联系方式</h2>
        <p>如对本隐私说明有任何疑问，可拨打 ${siteConfig.phone} 进行沟通。</p>
        <p class="legal-note">${siteConfig.sloganNotice}</p>
      </div>
    </section>
    ${renderContact()}`;

  return renderLayout({
    ...privacyMeta,
    body,
    schemas: [personSchema(), organizationSchema(), legalServiceSchema(), websiteSchema(), breadcrumbSchema(breadcrumbs)]
  });
};
