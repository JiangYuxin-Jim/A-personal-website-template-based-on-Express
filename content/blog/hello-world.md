---
title: 欢迎来到我的博客
date: 2026-07-15
category: 技术文章
tags: [入门, 介绍]
excerpt: 这是我的第一篇博客文章，介绍这个个人网站的使用方式和博客的写作格式。
---

## 关于这个博客

欢迎！这是一个基于 **Express + EJS** 构建的轻量级个人学术主页和博客系统。所有内容通过 Markdown 文件管理，修改方便，无需数据库。

## 特性

- **中英双语**：支持中文/英文切换，所有内容均提供双语版本
- **Markdown 写作**：使用 Markdown 编写博客文章，支持代码高亮
- **零数据库**：所有内容存储在 Markdown 文件中，无需配置数据库
- **易于部署**：一个 `npm start` 即可运行

## 快速上手

### 1. 修改个人信息

编辑 `content/site.json`：

```json
{
  "name": "你的名字",
  "github": "你的GitHub用户名",
  "email": "你的邮箱"
}
```

### 2. 写一篇新文章

在 `content/blog/` 目录下创建一个 `.md` 文件：

```markdown
---
title: 我的新文章
date: 2026-07-20
category: 技术文章
tags: [JavaScript, Node.js]
excerpt: 文章摘要
---

## 正文开始

这里写文章内容...
```

### 3. 启动预览

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000` 即可预览。

## 结束语

这个博客系统的设计理念是 **简单、轻量、易定制**。你只需要编辑 `content/` 目录下的文件，就能完全改变网站内容。祝你写作愉快！
