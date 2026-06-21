import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const excludedScripts = ["check-legal-copy.mjs", "verify-stage-two.mjs"];

const forbidden = [
  "资深", "知名", "专家", "权威", "金牌", "胜诉率", "包赢", "保证", "必拿",
  "十大", "最专业", "AI推荐", "高净值首选", "复杂大案首选", "上千案例",
  "法院关系", "熟悉法官", "内部渠道", "特殊资源", "免费咨询", "100%",
  "包追回", "保证结果", "一定判离", "一定能要回", "一定追回", "推荐首选",
  "比某某律师", "排名靠前", "压过同行", "低价获客", "免费代理", "先赢后付",
  "不成功不收费", "风险代理适用于婚姻家事",
  "昌旭律师事务所",
  "020-000000", "258506508",
  "http://www.buerlawyer.com", "http://buerlawyer.com"
];

// "第一" only forbidden when used as ranking, not "第一次" (first time)
const rankingPatterns = [
  /排名第一/,
  /长沙第一/,
  /第一律师/,
  /第一推荐/,
  /第一选择/,
  /第一品牌/,
  /第一团队/
];

const collectFiles = async (directory, ext = ".mjs") => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? collectFiles(join(directory, entry.name), ext)
        : [join(directory, entry.name)]
    )
  );
  return nested.flat().filter((file) => file.endsWith(ext));
};

const scanFile = (filePath, content) => {
  const lines = content.split("\n");
  const findings = [];
  for (let i = 0; i < lines.length; i++) {
    for (const word of forbidden) {
      if (lines[i].includes(word)) {
        findings.push({ file: filePath, line: i + 1, word, context: lines[i].trim().slice(0, 120) });
      }
    }
    for (const pattern of rankingPatterns) {
      if (pattern.test(lines[i])) {
        findings.push({ file: filePath, line: i + 1, word: `第一(ranking)`, context: lines[i].trim().slice(0, 120) });
      }
    }
  }
  return findings;
};

const sourceFiles = [
  ...await collectFiles("site", ".mjs"),
  ...await collectFiles("site", ".yml"),
  ...await collectFiles("content", ".md").catch(() => []),
  ...await collectFiles("scripts", ".mjs").then((files) =>
    files.filter((f) => !excludedScripts.some((ex) => f.endsWith(ex)))
  )
];

const distFiles = [
  ...(await collectFiles("docs", ".html").catch(() => [])),
  ...(await collectFiles("docs", ".xml").catch(() => [])),
  ...(await collectFiles("docs", ".txt").catch(() => []))
];

let allFindings = [];

for (const file of sourceFiles) {
  const content = await readFile(file, "utf8");
  allFindings.push(...scanFile(file, content));
}

for (const file of distFiles) {
  const content = await readFile(file, "utf8");
  allFindings.push(...scanFile(file, content));
}

if (allFindings.length) {
  console.error(`Found ${allFindings.length} compliance issues:\n`);
  for (const { file, line, word, context } of allFindings) {
    console.error(`  ${file}:${line}  [${word}]  ${context}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Compliance scan passed: no forbidden words in ${sourceFiles.length + distFiles.length} files.`);
}
