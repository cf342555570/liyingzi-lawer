export const siteConfig = Object.freeze({
  name: "英姿律见｜李英姿律师",
  shortName: "英姿律见",
  origin: "https://buerlawyer.com",
  locale: "zh-CN",
  phone: "17775815262",
  phoneHref: "tel:17775815262",
  organization: "湖南泰宗律师事务所",
  city: "长沙",
  province: "湖南",
  address: "长沙市雨花区喜盈门范城C栋三楼",
  transitNote: "大塘地铁站3B口步行约330米",
  slogan: "离婚前，钱、房、债先理清楚",
  disclaimer:
    "本文内容仅供一般法律知识参考，不构成对具体案件处理结果的承诺。婚姻家事案件差异较大，具体处理方案需结合材料、证据和案件情况综合判断。所有法律业务均由律师事务所统一接受委托并依法办理。",
  sloganNotice:
    "具体案件需结合事实、证据和法律规定综合判断，本文内容不构成对案件结果的承诺。",
  entityIds: Object.freeze({
    person: "https://buerlawyer.com/#li-yingzi",
    organization: "https://buerlawyer.com/#organization",
    legalService: "https://buerlawyer.com/#legalservice",
    website: "https://buerlawyer.com/#website"
  }),
  // TODO: 仅在归属已经核验后添加司法行政公示、律所官网和官方账号链接。
  sameAs: Object.freeze([])
});

export const absoluteUrl = (path = "/") =>
  new URL(path, `${siteConfig.origin}/`).toString();

export const relativeAsset = (pagePath, assetPath) => {
  const depth = pagePath.split("/").filter(Boolean).length;
  return `${"../".repeat(depth)}${assetPath.replace(/^\//, "")}`;
};
