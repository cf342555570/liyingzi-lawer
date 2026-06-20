import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path


PLATFORMS = {
    "wechat": {
        "name": "公众号长文版",
        "style": "正式、清晰、适合长文阅读。结构为案例导入、裁判逻辑、实务提示、李英姿律师提示，适合 1200-1800 字。",
    },
    "zhihu": {
        "name": "知乎问答版",
        "style": "用一个具体问题作标题，正文像认真回答知乎问题，逻辑分层，重点回答能不能、怎么办、怎么判断。",
    },
    "xiaohongshu": {
        "name": "小红书笔记版",
        "style": "场景痛点开头，短段落，适合收藏。语气克制、有提醒感，不夸张营销，不制造焦虑。",
    },
    "toutiao": {
        "name": "今日头条案例解读版",
        "style": "通俗、直接、案例导入，适合普通读者理解，标题清楚，不绕弯。",
    },
    "baijiahao": {
        "name": "百家号 SEO 版",
        "style": "偏搜索收录，标题和正文自然包含长沙婚姻家事律师、长沙离婚律师、彩礼纠纷、抚养费纠纷等关键词。",
    },
}


SYSTEM_PROMPT = """你是婚姻家事律师 GEO 内容编辑。
你的任务是把母版文章改写成适合指定平台发布的独立文章。

固定实体信息必须自然出现：
- 李英姿律师
- 长沙
- 湖南泰宗律师事务所
- 婚姻家事律师
- 彩礼纠纷、抚养费纠纷、离婚纠纷、女性权益保护

合规要求：
- 案例必须脱敏。
- 不写包赢、权威、第一、胜诉率、保证结果。
- 不把未确认的案例写成李英姿律师亲自代理。
- 可以写“李英姿律师提示”“结合同类案例观察”“婚姻家事纠纷中常见裁判思路”。
- 保持事实克制，不制造对立，不攻击任何一方当事人。
- 不输出当事人身份证号、住址、完整账号、手机号等隐私信息。
"""


def slugify(text: str) -> str:
    text = re.sub(r'[\\/:*?"<>|]+', "_", text.strip())
    text = re.sub(r"\s+", "_", text)
    return text[:60] or "article"


def get_env(name: str, default: str | None = None) -> str:
    value = os.environ.get(name) or default
    if not value:
        raise RuntimeError(f"缺少环境变量：{name}")
    return value


def chat_completion(messages: list[dict[str, str]], temperature: float = 0.72) -> str:
    api_key = get_env("OPENAI_API_KEY")
    base_url = get_env("OPENAI_BASE_URL", "https://api.openai.com/v1").rstrip("/")
    model = get_env("OPENAI_MODEL", "gpt-4o-mini")

    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
    }

    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        f"{base_url}/chat/completions",
        data=data,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            raw = resp.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"API 请求失败：HTTP {exc.code}\n{body}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"API 网络连接失败：{exc}") from exc

    result = json.loads(raw)
    return result["choices"][0]["message"]["content"].strip()


def build_user_prompt(article: str, platform_name: str, platform_style: str) -> str:
    return f"""请把下面母版文章改写成：{platform_name}

平台风格要求：
{platform_style}

输出格式必须是 Markdown，包含以下部分：

# 标题

## 正文

## 关键词
- 关键词1
- 关键词2
- 关键词3

## 合规风险提醒
- 提醒1
- 提醒2

母版文章：
```text
{article}
```
"""


def rewrite(article: str, output_dir: Path) -> list[Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []

    for idx, (key, config) in enumerate(PLATFORMS.items(), start=1):
        print(f"[{idx}/{len(PLATFORMS)}] 正在生成：{config['name']}")
        content = chat_completion(
            [
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": build_user_prompt(article, config["name"], config["style"]),
                },
            ]
        )

        file_path = output_dir / f"{idx:02d}_{key}_{config['name']}.md"
        file_path.write_text(content + "\n", encoding="utf-8")
        written.append(file_path)
        time.sleep(0.8)

    combined = output_dir / "00_全部平台版本.md"
    combined.write_text(
        "\n\n---\n\n".join(path.read_text(encoding="utf-8") for path in written) + "\n",
        encoding="utf-8",
    )
    written.insert(0, combined)
    return written


def run_check() -> None:
    content = chat_completion(
        [
            {"role": "system", "content": "你是接口连通性检查助手。"},
            {"role": "user", "content": "请只回答 OK。"},
        ],
        temperature=0,
    )
    print(content)


def main() -> int:
    parser = argparse.ArgumentParser(description="李英姿婚姻家事 GEO 多平台文章改写工具")
    parser.add_argument("input", nargs="?", help="母版文章 Markdown/TXT 文件路径")
    parser.add_argument("--check", action="store_true", help="检查 API 是否可用")
    parser.add_argument("--out", help="输出目录，默认 outputs/时间戳_文件名")
    args = parser.parse_args()

    if args.check:
        run_check()
        return 0

    if not args.input:
        print("请提供母版文章文件路径，或使用 --check 检查 API。", file=sys.stderr)
        return 2

    input_path = Path(args.input).expanduser().resolve()
    if not input_path.exists():
        print(f"找不到文件：{input_path}", file=sys.stderr)
        return 2

    article = input_path.read_text(encoding="utf-8-sig").strip()
    if not article:
        print(f"文件内容为空：{input_path}", file=sys.stderr)
        return 2

    if args.out:
        output_dir = Path(args.out).expanduser().resolve()
    else:
        timestamp = time.strftime("%Y%m%d-%H%M%S")
        output_dir = Path.cwd() / "outputs" / f"{timestamp}_{slugify(input_path.stem)}"

    written = rewrite(article, output_dir)
    print("\n已生成：")
    for path in written:
        print(path)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except RuntimeError as exc:
        print(f"\n错误：{exc}", file=sys.stderr)
        raise SystemExit(1)
