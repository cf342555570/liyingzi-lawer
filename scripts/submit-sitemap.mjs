import { siteConfig } from "../site/data/site-config.mjs";

const origin = siteConfig.origin;
const sitemapUrl = `${origin}/sitemap.xml`;

const engines = {
  google: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  bing: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
};

console.log("提交 sitemap 到搜索引擎...\n");

const results = await Promise.allSettled(
  Object.entries(engines).map(async ([name, url]) => {
    try {
      const response = await fetch(url, { method: "GET", redirect: "follow" });
      return { engine: name, status: response.status, ok: response.ok };
    } catch (error) {
      return { engine: name, status: 0, ok: false, error: error.message };
    }
  })
);

let ok = 0;
for (const result of results) {
  const { engine, status, ok: success } = result.value || result;
  if (success) {
    console.log(`  ${engine}: HTTP ${status} — 已提交`);
    ok++;
  } else {
    console.error(`  ${engine}: 提交失败 (HTTP ${status || result.reason?.message || "unknown"})`);
  }
}

console.log("");

const encodedSite = encodeURIComponent(`site:${origin}`);
console.log("百度提交说明：");
console.log(`  百度无公开 ping 接口，请手动访问：`);
console.log(`  https://ziyuan.baidu.com/linksubmit/url?sitemap=${encodeURIComponent(sitemapUrl)}`);
console.log("  或登录百度搜索资源平台 → 普通收录 → 提交 sitemap");
console.log("");
console.log("手动检查收录（浏览器中打开）：");
console.log(`  Google: https://www.google.com/search?q=${encodedSite}`);
console.log(`  Bing:   https://www.bing.com/search?q=${encodedSite}`);
console.log(`  百度:   https://www.baidu.com/s?wd=${encodeURIComponent(origin)}`);

if (ok >= 2) console.log("\nGoogle 和 Bing sitemap 提交完成。");
