# 李英姿 GEO 发布环境

这是一个轻量发布环境，不需要部署 Dify、n8n 或本地 AI 系统。

## 怎么用

1. 双击 `启动李英姿GEO发布环境.bat`
2. 第一次打开后，在这个 Chrome 窗口里安装“文章同步助手”
3. 在这个 Chrome 窗口里登录发布平台账号
4. 后续继续用同一个 `.bat` 启动，登录态会保留

## 第一次需要登录的平台

```text
微信公众号：https://mp.weixin.qq.com/
知乎创作者：https://www.zhihu.com/creator
今日头条：https://mp.toutiao.com/
百家号：https://baijiahao.baidu.com/
小红书创作服务平台：https://creator.xiaohongshu.com/
文章同步助手：https://www.wechatsync.com/
Chrome 插件页：https://chromewebstore.google.com/detail/文章同步助手/hchobocdmclopcbnibdnoafilagadion
```

## 推荐流程

```text
母版文章
-> 用“多平台改写提示词.md”生成 5 个版本
-> 打开专用 Chrome 发布环境
-> 用文章同步助手同步/保存草稿
-> 人工检查格式和合规
-> 发布
```

## 注意事项

- 不要删除 `.chrome-profiles/liyingzi-geo-publish`，这是登录态保存目录。
- 不要在这个 Chrome 环境里清理 Cookie。
- 第一次安装插件和登录账号无法省略。
- 平台偶尔要求短信、人脸或扫码验证，这是平台机制，无法完全绕过。
- 建议先保存草稿，不要完全自动发布。
