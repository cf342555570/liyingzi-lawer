import { siteConfig } from "../../data/site-config.mjs";
import { lawyer } from "../../data/li-yingzi.mjs";
import { escapeHtml, renderBreadcrumbs, renderLayout } from "../../components/layout.mjs";
import { renderContact, sectionHeading } from "../../components/sections.mjs";
import { articleSchema, breadcrumbSchema, howToSchema, legalServiceSchema, organizationSchema, personSchema, websiteSchema } from "../../components/json-ld.mjs";

export const articleMeta = Object.freeze({
  path: "/articles/gongsi-guquan-fenge/",
  title: "离婚时公司股权如何分割？长沙婚姻家事律师分析｜英姿律见",
  description: "离婚涉及公司股权时，需要区分婚前持股还是婚后取得、是否参与经营、其他股东意见等因素。李英姿律师，湖南泰宗律师事务所，结合婚姻家事方向分析处理思路。电话：17775815262。"
});

export const renderArticle = () => {
  const breadcrumbs = [
    { name: "首页", path: "/" },
    { name: "文章", path: "/articles/" },
    { name: "离婚时公司股权如何分割", path: articleMeta.path }
  ];
  const datePublished = "2026-06-20";

  const body = `
    ${renderBreadcrumbs(breadcrumbs)}
    <article class="section" aria-labelledby="article-title">
      <div class="shell narrow">
        <p class="eyebrow">婚姻家事分析</p>
        <h1 id="article-title">离婚时公司股权如何分割？</h1>
        <p style="color:#666;font-size:0.875rem;">发布日期：${datePublished} · ${lawyer.displayName} · ${lawyer.organization}</p>
        <p class="legal-note">${siteConfig.sloganNotice}</p>

        <p class="large-copy">离婚时一方名下持有公司股权，另一方能否主张分割、按什么标准分割，取决于股权取得时间、资金来源、是否参与经营以及公司性质等多种因素。本文结合婚姻家事方向分析处理思路，不构成对具体案件结果的判断。</p>

        <h2>一、先区分股权取得时间与资金来源</h2>
        <p>判断股权是否为夫妻共同财产，通常需要先看取得时间节点：</p>
        <ul>
          <li><strong>婚前取得的股权：</strong>股权本身属于个人财产，但婚后公司分红、配股、增资扩股对应的增值部分在有些情况下可能被认定为共同财产。</li>
          <li><strong>婚后以夫妻共同财产出资取得的股权：</strong>无论登记在谁名下，通常属于夫妻共同财产。</li>
          <li><strong>婚后以个人财产出资取得的股权：</strong>需要有明确的资金来源证明，否则在争议中可能被推定为共同财产。</li>
        </ul>

        <h2>二、股权分割的几种可能方式</h2>
        <p>股权不同于房产和存款，分割时需要额外考虑公司性质和股东结构：</p>
        <ul>
          <li><strong>协商作价补偿：</strong>双方协商确定股权价值，由持股方以现金或其他财产补偿对方。</li>
          <li><strong>股权转让：</strong>持股方将部分股权转让给配偶，但有限公司股权对外转让需要其他股东过半数同意并放弃优先购买权。</li>
          <li><strong>拍卖或变卖后分配价款：</strong>双方无法协商时，在对公司影响最小的前提下由法院处理。</li>
        </ul>

        <h2>三、公司类型不同，处理方式也不同</h2>
        <ul>
          <li><strong>一人有限公司：</strong>股权分割相对简单，但要区分公司财产与个人财产，避免混淆。</li>
          <li><strong>有限责任公司：</strong>涉及其他股东优先购买权，配偶直接取得股权存在障碍，常见处理为作价补偿。</li>
          <li><strong>股份有限公司（非上市）：</strong>股份可转让性较好，但估值需要参考财务资料。</li>
          <li><strong>上市公司：</strong>股票可直接在二级市场转让，分割相对简单，但需遵守相关减持规定。</li>
        </ul>

        <h2>四、典型争议场景</h2>
        <p>以下为常见服务场景，并非具体案件展示，也不代表处理结果：</p>
        <ul>
          <li>一方经营公司多年，另一方不了解公司情况，担心财产被转移；</li>
          <li>婚前设立的公司在婚后大幅增值，双方对增值归属有争议；</li>
          <li>夫妻均为公司股东，离婚财产分割与公司控制权争夺交叉；</li>
          <li>一方以亲属名义代持股权，需要确认实际权利人。</li>
        </ul>

        <h2>五、需要准备的材料</h2>
        <ol class="material-list">
          <li><span>01</span><p>结婚登记及婚姻经过时间线</p></li>
          <li><span>02</span><p>公司营业执照及工商登记信息</p></li>
          <li><span>03</span><p>公司章程、股东名册及出资证明</p></li>
          <li><span>04</span><p>出资来源的银行流水及凭证</p></li>
          <li><span>05</span><p>公司近年财务报表及纳税资料</p></li>
          <li><span>06</span><p>股权转让、增资、减资的工商变更记录</p></li>
          <li><span>07</span><p>双方关于公司经营与财产归属的沟通记录</p></li>
        </ol>

        <h2>六、处理路径建议</h2>
        <p>一般先整理股权取得时间线、出资源流和公司财务资料，判断股权性质及大致价值范围；再结合股东人数、公司类型和章程约定评估可行的分割方式。如果对方不配合提供公司材料，可考虑通过诉讼中的证据调查程序获取，但周期和成本需要提前评估。</p>
        <p>律师可以在分析事实和材料后，帮助识别不同处理路径的可行性和风险，协助设计协商方案或准备诉讼材料。</p>

        <div class="privacy-card" style="background:#f8f6f0;padding:1.5rem;border-radius:8px;margin:2rem 0;">
          <p class="eyebrow">重要提示</p>
          <p>公司股权分割涉及公司法、婚姻家庭编和会计估值等交叉问题，不同案件在取得时间、出资来源、公司类型和其他股东态度上差异显著。本文仅提供一般性分析思路，具体问题需结合完整材料和案件情况综合判断。</p>
        </div>
      </div>
    </article>
    ${renderContact()}`;

  return renderLayout({
    ...articleMeta,
    body,
    schemas: [
      personSchema(),
      organizationSchema(),
      legalServiceSchema(),
      websiteSchema(),
      articleSchema({
        title: articleMeta.title,
        description: articleMeta.description,
        path: articleMeta.path,
        datePublished,
        author: lawyer.displayName
      }),
      breadcrumbSchema(breadcrumbs),
      howToSchema()
    ]
  });
};
