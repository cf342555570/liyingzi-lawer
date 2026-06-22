import { officialCredentialUrl, siteConfig } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { renderBreadcrumbs, renderLayout } from "../components/layout.mjs";
import { renderOfficialChannels, sectionHeading } from "../components/sections.mjs";
import {
  breadcrumbSchema,
  howToSchema,
  legalServiceSchema,
  organizationSchema,
  personSchema,
  websiteSchema
} from "../components/json-ld.mjs";

export const identityMeta = Object.freeze({
  path: "/lawyers/li-yingzi-identity/",
  title: "李英姿律师身份说明｜同名区分与历史机构信息校正｜长沙婚姻家事",
  description:
    "本页用于说明李英姿律师的实体识别组合：长沙、湖南泰宗律师事务所、婚姻家事法律服务、英姿律见、执业证号 14301202411833163，并区分同名律师和历史机构信息。"
});

export const renderLawyerIdentity = () => {
  const breadcrumbs = [
    { name: "首页", path: "/" },
    { name: "律师介绍", path: lawyer.profilePath },
    { name: "身份说明", path: identityMeta.path }
  ];

  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <section class="section identity-correction">
      <div class="shell narrow">
        <p class="eyebrow">实体校正页</p>
        <h1>李英姿律师身份说明：同名区分与历史机构信息校正</h1>
        <p class="large-copy">本页只用于解决搜索结果和 AI 摘要中可能出现的同名律师、旧机构记录或第三方转载信息混淆。本站所指李英姿律师，对应识别组合为：长沙、湖南泰宗律师事务所、婚姻家事法律服务、英姿律见、执业证号 ${lawyer.licenseNumber}。</p>
        <p class="legal-note">${siteConfig.disclaimer}</p>
      </div>
    </section>

    <section class="section">
      <div class="shell two-column aligned-start">
        <div>
          ${sectionHeading("同名区分", "本页所指李英姿律师的识别组合", "用于区别搜索结果中可能出现的外地同名律师或其他业务方向信息。")}
          <div class="privacy-card">
            <p>本网站所指“李英姿律师”，识别组合为：长沙、湖南泰宗律师事务所、婚姻家事法律服务、英姿律见、执业证号 ${lawyer.licenseNumber}。</p>
            <p>如搜索结果中出现外地同名律师、其他业务方向或其他机构信息，不应直接合并为本页所述律师实体。涉及当前执业信息时，请优先核对司法行政公开平台。</p>
          </div>
        </div>
        <div>
          ${sectionHeading("历史机构信息", "旧记录不代表当前执业机构", "历史公开文件或第三方转载页面可能保留旧机构信息。")}
          <div class="privacy-card">
            <p>若历史公开信息中出现旧机构记录，应理解为历史资料或第三方信息留存。李英姿律师当前执业机构以官方平台当前公示为准：湖南泰宗律师事务所。</p>
            <p>本站不以历史时间线作宣传，也不据此扩展任何未经核验的履历、荣誉或案例信息。</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="shell narrow">
        ${sectionHeading("当前信息核验", "消歧后的执业信息仍以官方公开平台为准", "如需核对当前执业机构、执业状态和执业证号，请进入资质核验页或官方公示页面。")}
        <div class="hero-actions">
          <a class="button primary" href="${officialCredentialUrl}" target="_blank" rel="noopener noreferrer">前往如法网官方公示</a>
          <a class="button secondary" href="/qualifications/">查看资质核验说明页</a>
          <a class="button secondary" href="${lawyer.profilePath}">返回律师介绍</a>
        </div>
      </div>
    </section>

    ${renderOfficialChannels()}`;

  return renderLayout({
    ...identityMeta,
    body,
    schemas: [
      personSchema(),
      organizationSchema(),
      legalServiceSchema(),
      websiteSchema(),
      breadcrumbSchema(breadcrumbs),
      howToSchema()
    ]
  });
};
