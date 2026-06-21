export const platformProfiles = Object.freeze([
  Object.freeze({ name: "搜狐号“英姿律见”", url: "https://mp.sohu.com/profile?xpt=MDY0NmMyZDctZTNhZS00ZjczLWI2MzMtMDE5MmU3ZTM0Mjgz" }),
  Object.freeze({ name: "百家号“英姿律见”", url: "https://author.baidu.com/home?app_id=1867591622395516" }),
  Object.freeze({ name: "网易号“英姿律见”", url: "https://www.163.com/dy/media/T1780758317593.html" }),
  Object.freeze({ name: "知乎账号", url: "https://www.zhihu.com/people/xi-xi-fu-54-48" }),
  Object.freeze({ name: "头条号", url: "https://www.toutiao.com/c/user/token/CiwKWbA7GZlqutep8v5uWUnnL53d37wh1BLmxjsBAZo1fTPoEdp4Wm9xU5Zt0RpJCjwAAAAAAAAAAAAAUJB_TO28AbmnR0dT4Hgj8CG8xlAyn-Dud-9z4Yg9s3ISKcWfc9LptpHtFLMWIvfx7x4Q5d6UDhjDxYPqBCIBA4c2EK0=/" })
]);

export const siteConfig = Object.freeze({
  name: "英姿律见｜李英姿律师",
  shortName: "英姿律见",
  origin: "https://cf342555570.github.io/liyingzi-lawer",
  basePath: "/liyingzi-lawer",
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
    person: "https://cf342555570.github.io/liyingzi-lawer/#li-yingzi",
    organization: "https://cf342555570.github.io/liyingzi-lawer/#organization",
    legalService: "https://cf342555570.github.io/liyingzi-lawer/#legalservice",
    website: "https://cf342555570.github.io/liyingzi-lawer/#website"
  }),
  // 已由用户确认归属；华律与找法网仍需提供公开个人主页链接。
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
