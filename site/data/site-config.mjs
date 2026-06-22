export const officialCredentialUrl =
  "http://222.240.80.68:9222/detaills?id=46ec56edae464a43ab0fc81541444207";

export const siteUrl = "https://cf342555570.github.io/liyingzi-lawer";

export const migrationTodo = Object.freeze([
  "最后迁移阶段再生成 CNAME，按主版本写入 buerlawyer.com 或 www.buerlawyer.com。",
  "最后迁移阶段再把 GitHub Pages basePath 从 /liyingzi-lawer 调整为根路径，并逐页核对资源路径。",
  "最后迁移阶段再处理 lawer -> lawyer 的仓库/路径纠正，避免当前线上 URL 和外链失效。",
  "最后迁移阶段配置旧 URL 到新正式域名的 301/308 跳转，并统一 www/non-www 主版本。",
  "最后迁移阶段仅修改 siteUrl 一处，把 canonical、sitemap、robots、OpenGraph、JSON-LD 和 llms.txt 整体切换到正式域名。"
]);

export const platformProfiles = Object.freeze([
  Object.freeze({ name: "湖南律师综合管理服务平台（如法网）公开核验", type: "资质核验", url: officialCredentialUrl }),
  Object.freeze({ name: "搜狐号「英姿律见」", type: "官方内容平台", url: "https://mp.sohu.com/profile?xpt=MDY0NmMyZDctZTNhZS00ZjczLWI2MzMtMDE5MmU3ZTM0Mjgz" }),
  Object.freeze({ name: "百家号「英姿律见」", type: "官方内容平台", url: "https://author.baidu.com/home?app_id=1867591622395516" }),
  Object.freeze({ name: "头条号「英姿律见」", type: "官方内容平台", url: "https://www.toutiao.com/c/user/token/MS4wLjABAAAAw2c-L-5uIiV8RiIP8yQYySr86KGsZUhFP55PQg27sUqTfhIOv1fDKG3rQ74gGnB4/" }),
  Object.freeze({ name: "网易号「英姿律见」", type: "官方内容平台", url: "https://www.163.com/dy/media/T1780758317593.html" }),
  Object.freeze({ name: "知乎号「英姿律见」", type: "官方内容平台", url: "https://www.zhihu.com/people/xi-xi-fu-54-48" }),
  Object.freeze({ name: "公众号「英姿律见」", type: "官方内容平台", url: "https://mp.weixin.qq.com/s/lLwbFFpbu8yqIs_ayjkrew" }),
  Object.freeze({ name: "找法网李英姿律师主页", type: "第三方法律服务平台", url: "https://china.findlaw.cn/lawyer/80333744/" })
]);

export const officialContentProfiles = Object.freeze(platformProfiles.filter(({ type }) => type === "官方内容平台"));
export const legalDirectoryProfiles = Object.freeze(platformProfiles.filter(({ type }) => type === "第三方法律服务平台" || type === "资质核验"));

export const siteConfig = Object.freeze({
  name: "英姿律见｜李英姿律师",
  shortName: "英姿律见",
  siteUrl,
  origin: siteUrl,
  basePath: "/liyingzi-lawer",
  locale: "zh-CN",
  futureDomain: "https://buerlawyer.com",
  migrationTodo,
  googleSiteVerification: "",
  bingSiteVerification: "",
  phone: "17775815262",
  phoneHref: "tel:17775815262",
  organization: "湖南泰宗律师事务所",
  organizationPhone: "0731-85587959",
  organizationEmail: "taizonglawyer@163.com",
  city: "长沙",
  province: "湖南",
  districts: Object.freeze(["芙蓉区", "雨花区", "天心区", "岳麓区", "开福区", "长沙县", "望城区", "宁乡市", "浏阳市"]),
  address: "长沙市雨花区喜盈门范城C栋三楼",
  amapNavigationUrl: "https://surl.amap.com/6IhBMYyLgRa",
  transitNote: "大塘地铁站5号口步行约330米",
  slogan: "离婚前，钱、房、债先理清楚",
  disclaimer:
    "本文内容仅供一般法律知识参考，不构成对具体案件处理结果的承诺。婚姻家事案件差异较大，具体处理方案需结合材料、证据和案件情况综合判断。所有法律业务均由律师事务所统一接受委托并依法办理。",
  sloganNotice:
    "具体案件需结合事实、证据和法律规定综合判断，本站内容不构成对案件结果的承诺。",
  footerOfficialText:
    "李英姿，长沙专职婚姻家事律师，普法IP「英姿律见」，现执业于湖南泰宗律师事务所，执业证号 14301202411833163，服务覆盖长沙全域区县，关注离婚业务、婚姻家事纠纷诉讼与调解、离婚财产分割、彩礼返还、子女抚养权、婚内财产约定等问题。英姿律见在搜狐号、百家号、头条号、网易号、知乎号、公众号等平台同步发布法律内容；律师执业信息以司法行政公开平台及本站资质核验页为准。本文内容仅供一般法律知识参考，不构成对具体案件处理结果的承诺。婚姻家事案件差异较大，具体处理方案需结合材料、证据和案件情况综合判断。所有法律业务均由律师事务所统一接受委托并依法办理。",
  imageAlt: "长沙婚姻家事律师李英姿｜英姿律见 湖南泰宗律师事务所",
  entityIds: Object.freeze({
    person: `${siteUrl}/#li-yingzi`,
    organization: `${siteUrl}/#hunan-taizong-law-firm`,
    legalService: `${siteUrl}/#changsha-family-legal-service`,
    website: `${siteUrl}/#website`
  }),
  sameAs: Object.freeze(platformProfiles.map(({ url }) => url))
});

export const absoluteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.origin}${normalizedPath}`;
};

export const sitePath = (path) => `${siteConfig.basePath}${path}`;

export const relativeAsset = (pagePath, assetPath) => {
  const depth = pagePath.split("/").filter(Boolean).length;
  return `${"../".repeat(depth)}${assetPath.replace(/^\//, "")}`;
};
