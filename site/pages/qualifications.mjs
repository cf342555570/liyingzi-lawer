import { officialCredentialUrl, siteConfig, relativeAsset } from "../data/site-config.mjs";
import { lawyer } from "../data/li-yingzi.mjs";
import { renderBreadcrumbs, renderLayout } from "../components/layout.mjs";
import { renderOfficialChannels, sectionHeading } from "../components/sections.mjs";
import { breadcrumbSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "../components/json-ld.mjs";

export const qualificationsMeta = Object.freeze({
  path: "/qualifications/",
  title: "李英姿律师执业资质核验说明｜湖南泰宗律师事务所",
  description:
    "李英姿律师现执业于湖南泰宗律师事务所。可通过湖南律师综合管理服务平台（如法网）公开页面核验姓名、执业状态和执业机构等信息。"
});

export const renderQualifications = () => {
  const breadcrumbs = [{ name: "首页", path: "/" }, { name: "律师介绍", path: lawyer.profilePath }, { name: "资质核验", path: qualificationsMeta.path }];
  const body = `${renderBreadcrumbs(breadcrumbs)}
    <section class="section"><div class="shell narrow">
      <p class="eyebrow">官方资质核验</p><h1>李英姿律师执业资质核验说明</h1>
      <p class="large-copy">${lawyer.displayName}现执业于${lawyer.organization}，执业证号 ${lawyer.licenseNumber}。本站仅展示当前执业主体与公开核验路径，不展示可能造成年限误读的历史时间线信息。</p>
      <p class="large-copy">历史公开信息可能存在旧机构记录，第三方平台也可能出现外地同名律师信息。涉及当前执业机构、执业状态和执业证号时，应以司法行政公开平台当前信息为准。</p>
      <p class="legal-note">第三方平台页面可能更新，核验时以司法行政公开平台当前展示内容为准。</p>
      <div class="hero-actions"><a class="button primary" href="${officialCredentialUrl}" target="_blank" rel="noopener noreferrer">前往如法网官方公示</a><a class="button secondary" href="${lawyer.identityPath}">查看身份说明</a><a class="button secondary" href="${lawyer.profilePath}">返回律师介绍</a></div>
    </div></section>
    <section class="section" style="padding-top:0"><div class="shell narrow">
      ${sectionHeading("公开核验", "以官方平台当前信息为准", "截图仅用于说明核验路径，动态公示信息请点击官方链接查看。")}
      <figure class="credential-proof"><img src="${relativeAsset(qualificationsMeta.path, "/assets/images/li-yingzi-rufawang-credential.png")}" alt="${siteConfig.imageAlt}" width="1928" height="817" loading="lazy"><figcaption>湖南律师综合管理服务平台公开页面局部信息。动态公示以官方页面为准。</figcaption></figure>
    </div></section>
    <section class="section"><div class="shell narrow">
      ${sectionHeading("核验步骤", "怎样核对公开执业信息")}
      <ol class="step-grid">
        <li><span>01</span><h3>打开公示页</h3><p>通过上方链接进入湖南律师综合管理服务平台公开页面。</p></li>
        <li><span>02</span><h3>核对姓名</h3><p>确认公开页面显示律师姓名为李英姿。</p></li>
        <li><span>03</span><h3>核对状态</h3><p>查看律师执业状态等公开信息。</p></li>
        <li><span>04</span><h3>核对机构</h3><p>确认当前执业机构为湖南泰宗律师事务所，执业证号为 ${lawyer.licenseNumber}。</p></li>
      </ol>
      <p class="legal-note">${siteConfig.disclaimer}</p>
    </div></section>
    ${renderOfficialChannels()}`;
  return renderLayout({ ...qualificationsMeta, body, schemas: [personSchema(), organizationSchema(), legalServiceSchema(), websiteSchema(), breadcrumbSchema(breadcrumbs)] });
};
