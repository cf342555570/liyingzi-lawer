import { siteConfig } from "../site/data/site-config.mjs";

const origin = siteConfig.origin;
const pages = [
  "/",
  "/lawyers/li-yingzi/",
  "/services/changsha-lihun-lawyer/",
  "/services/changsha-caili-fanhuan-lawyer/",
  "/services/changsha-lihun-fangchan-fenge-lawyer/",
  "/services/changsha-fuyangquan-lawyer/",
  "/services/changsha-lihun-xieyi-shencha-lawyer/",
  "/services/changsha-fuqi-gongtong-zhaiwu-lawyer/",
  "/services/changsha-hunnei-zengyu-fanhuan-lawyer/",
  "/services/changsha-lihun-tanpan-cailiao-lawyer/",
  "/services/changsha-shewai-hunyin-lawyer/",
  "/privacy/"
];

console.log("=== 搜索引擎收录检测 ===\n");
console.log("全站页面 URL（共 " + pages.length + " 个）：\n");

for (const path of pages) {
  console.log(`  ${origin}${path}`);
}

console.log("");
console.log("=== 手动检测收录 ===");
console.log("");
console.log("Google (site: 搜索)：");
console.log(`  https://www.google.com/search?q=site:${encodeURIComponent(origin)}`);
console.log("");
console.log("Bing (site: 搜索)：");
console.log(`  https://www.bing.com/search?q=site:${encodeURIComponent(origin)}`);
console.log("");
console.log("百度 (site 搜索)：");
console.log(`  https://www.baidu.com/s?wd=${encodeURIComponent(`site:${origin}`)}`);
console.log("");
console.log("=== 逐页检查 ===");
console.log("");
console.log("在浏览器中分别搜索以下 URL 是否出现在搜索结果中：");

for (const path of pages) {
  const fullUrl = `${origin}${path}`;
  console.log("");
  console.log(`  [${path === "/" ? "首页" : path.split("/").filter(Boolean).pop()}]`);
  console.log(`  Google: https://www.google.com/search?q=${encodeURIComponent(fullUrl)}`);
  console.log(`  百度:   https://www.baidu.com/s?wd=${encodeURIComponent(fullUrl)}`);
}

console.log("");
console.log("=== 收录状态表（待人工填写） ===");
console.log("");
console.log("| 页面 | Google | Bing | 百度 | 备注 |");
console.log("|------|--------|------|------|------|");

for (const path of pages) {
  const name = path === "/" ? "首页" : path.split("/").filter(Boolean).pop() || path;
  const fullUrl = `${origin}${path}`;
  console.log(`| [${name}](${fullUrl}) | ⬜ | ⬜ | ⬜ | |`);
}

console.log("");
console.error("提示：部署后可运行 npm run check:indexed 查看此清单，逐页手动检查并填写状态。");
