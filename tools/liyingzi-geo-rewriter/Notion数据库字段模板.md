# Notion 数据库字段模板

如果后续要把改写结果自动写入 Notion，建议先建一个数据库，字段如下。

## 字段

```text
标题：Title
状态：Select
母版文章：Text
公众号版：Text
知乎版：Text
小红书版：Text
今日头条版：Text
百家号版：Text
关键词：Multi-select
发布平台：Multi-select
发布时间：Date
输出目录：URL 或 Text
备注：Text
```

## 状态选项

```text
待写母版
待改写
已改写
待发布
已发布
需复盘
```

## 自动写入 Notion 还需要

```text
NOTION_TOKEN：Notion integration token
NOTION_DATABASE_ID：数据库 ID
```

拿到这两个值后，可以把当前工具升级为：

```text
读取 Notion 里“待改写”的文章
-> 调用 ChatGPT API 改写
-> 把 5 个平台版本写回 Notion
-> 状态改成“已改写”
```
