# Personal Academic Homepage & Blog

> 📖 [English Version](README_EN.md) | 中文版

一个轻量级的双语（中文/英文）个人学术主页和博客系统。基于 **Express + EJS + Markdown** 构建，无需数据库 —— 所有内容通过 Markdown 文件管理。

## ✨ 特性

- 🌐 **双语支持** — 中/英文一键切换，所有内容均支持双语
- 📝 **Markdown 写作** — 用 Markdown 写博客，支持语法高亮（highlight.js）
- 🗂️ **零数据库** — 所有内容以 Markdown 文件存储，无需配置数据库
- 🎨 **简约设计** — 极简学术风格，响应式布局，暗色代码块
- ⚡ **轻量快速** — Express 服务端渲染，秒开页面
- 🔧 **极易定制** — 只需编辑 `content/` 目录下的文件即可改变整个网站
- 📱 **响应式** — 适配桌面、平板、手机

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) 18+

### 安装运行

```bash
# 克隆仓库
git clone https://github.com/JiangYuxin-Jim/A-personal-website-template-based-on-Express.git
cd A-personal-website-template-based-on-Express

# 安装依赖
npm install

# 启动开发服务器（自动重载）
npm run dev

# 或启动生产服务器
npm start
```

浏览器打开 `http://localhost:3000` 即可预览。

## 📁 项目结构

```
.
├── app.js                  # Express 服务器和路由逻辑
├── package.json
├── content/                # 📝 所有内容都在这里 —— 只需编辑这些文件！
│   ├── site.json           # 个人信息（姓名、学校、GitHub、邮箱等）
│   ├── about/
│   │   ├── about.md        # 自我介绍（双语）
│   │   └── about.md.example  # 文件模板参考
│   ├── blog/
│   │   ├── hello-world.md  # 示例博客文章
│   │   └── TEMPLATE.md.example  # 博客文章模板
│   ├── experience/
│   │   ├── list.md         # 教育背景与经历
│   │   └── list.md.example # 文件模板参考
│   ├── publications/
│   │   ├── list.md         # 论文发表与获奖
│   │   └── list.md.example # 文件模板参考
│   └── images/
│       ├── README.md       # 图片使用说明
│       └── photo.png       # 你的个人照片（可选）
├── views/                  # EJS 模板（通常无需修改）
│   ├── partials/           # 头部、导航栏、侧边栏、页脚
│   └── *.ejs               # 页面模板
├── public/
│   ├── css/style.css       # 样式表
│   └── js/main.js          # 语言切换与 UI 逻辑
└── docs/                   # 截图和文档资源
```

## ✏️ 如何自定义

### 第一步：修改个人信息

编辑 **`content/site.json`**：

```json
{
  "name": "你的名字",
  "nameEn": "Your Name",
  "initial": "Y",
  "title": "你的职位 / 头衔",
  "titleEn": "Your Job Title",
  "school": "你的学校 / 公司",
  "schoolEn": "Your University / Company",
  "email": "your.email@example.com",
  "github": "yourusername",
  "researchInterests": [
    { "zh": "研究方向一", "en": "Research Area 1" },
    { "zh": "研究方向二", "en": "Research Area 2" }
  ],
  "metaDescription": "个人学术主页与技术博客。"
}
```

| 字段 | 说明 |
|-------|-------------|
| `name` / `nameEn` | 你的名字（中文和英文） |
| `initial` | 一个字母，用作网站图标和头像占位符 |
| `title` / `titleEn` | 你的职位或头衔 |
| `school` / `schoolEn` | 你的所属单位 |
| `email` | 你的邮箱（设为 `your.email@example.com` 则隐藏） |
| `github` | 你的 GitHub 用户名（设为 `yourusername` 则隐藏） |
| `researchInterests` | 研究方向列表（双语） |
| `avatar` | （可选）头像图片路径，如 `"/images/photo.png"` |

### 第二步：写自我介绍

编辑 **`content/about/about.md`**：

```markdown
---
section: about

text_zh: |
  第一段中文介绍。

  第二段中文介绍。空一行创建新段落。

text_en: |
  First paragraph in English.

  Second paragraph. Blank lines create new paragraphs.
---
```

### 第三步：写博客文章

在 **`content/blog/`** 目录下创建 `.md` 文件，每篇文件开头需要填写 frontmatter：

```markdown
---
title: 文章标题
date: 2026-07-20
category: 技术文章
tags: [JavaScript, Node.js]
excerpt: 显示在博客列表中的简短摘要（可选）
---

## 第一章

用 Markdown 写正文内容...
```

**Frontmatter 字段说明：**

| 字段 | 必填 | 说明 |
|-------|----------|-------------|
| `title` | ✅ | 文章标题 |
| `date` | ✅ | 发布日期（YYYY-MM-DD） |
| `category` | ❌ | 分类名（需与 `app.js` 中 CATEGORIES 定义一致） |
| `tags` | ❌ | 标签数组：`[标签1, 标签2]` |
| `excerpt` | ❌ | 摘要（不填则自动截取正文前150字） |

**添加或修改分类**，编辑 `app.js` 中的 `CATEGORIES` 数组：

```js
const CATEGORIES = [
  { name: '技术文章', css: 'cat-tech' },
  { name: '项目实战', css: 'cat-project' },
  { name: '教程笔记', css: 'cat-tutorial' },
  // 在这里添加更多分类...
];
```

### 第四步：更新经历

编辑 **`content/experience/list.md`**：

```yaml
items:
  - year: "2026"
    title_zh: "经历的中文标题"
    title_en: "English Title"
    desc_zh: "中文描述（可选）"
    desc_en: "English description (optional)"
```

### 第五步：更新发表与获奖

编辑 **`content/publications/list.md`**（按 year 降序自动排列）：

```yaml
# 单语言论文：
items:
  - year: "2025"
    title: "Paper Title"
    venue: "Journal Name"
    doi: "10.xxxx/example"
    link: "https://doi.org/10.xxxx/example"

# 双语条目：
  - year: "2025"
    title_zh: "中文论文标题"
    title_en: "English Paper Title"
    venue_zh: "《期刊名》"
    venue_en: "Journal Name"

# 获奖类（用 summary 替代 venue）：
  - year: "2025"
    title_zh: "获奖荣誉"
    title_en: "Awards & Honors"
    summary_zh: "国家奖学金 · 竞赛奖项"
    summary_en: "National Scholarship"
```

### 第六步：放上你的照片

将照片命名为 `photo.png` 放入 `content/images/` 目录，或在 `site.json` 中设置 `avatar` 字段指向自定义路径。

如果不放照片，侧边栏会显示你的名字首字母作为占位符。

## 🎨 Markdown 功能

你的博客文章支持完整的 Markdown 语法和代码高亮：

- **代码块**自动识别语言（Python、JavaScript、Java、SQL、Bash 等）
- **表格**、**引用**、**图片**、**链接**
- **自动目录** — 由 `##`（h2）标题自动生成
- **阅读时长**估算

## 🖥️ 页面路由

| 路由 | 页面 | 内容来源 |
|-------|------|----------------|
| `/` | 首页（关于） | `content/about/about.md` |
| `/blog` | 博客列表 | `content/blog/*.md` |
| `/blog/:slug` | 博客详情 | 对应博客 markdown 文件 |
| `/publications` | 发表与获奖 | `content/publications/list.md` |
| `/experience` | 经历 | `content/experience/list.md` |

## 🚢 部署

### 方式一：部署到云平台

这是标准的 Node.js 应用，可部署到任何支持 Node.js 的平台：

**Railway / Render / Heroku：**
```bash
# 构建命令
npm install

# 启动命令
npm start
```

注意：部分平台需要在环境变量中设置 `PORT`。

### 方式二：VPS 部署（PM2）

```bash
npm install -g pm2
pm2 start app.js --name "homepage"
pm2 save
pm2 startup
```

### 方式三：GitHub Pages

由于这是服务端渲染应用，不能直接部署到 GitHub Pages。建议使用云平台或 VPS。

## 🔧 技术栈

- **后端框架**：[Express](https://expressjs.com/) 5.x
- **模板引擎**：[EJS](https://ejs.co/)
- **Markdown 解析**：[marked](https://marked.js.org/) + [highlight.js](https://highlightjs.org/)
- **Frontmatter**：[gray-matter](https://github.com/jonschlinkert/gray-matter)
- **开发服务器**：[nodemon](https://nodemon.io/)

## 📄 许可证

MIT — 自由使用和修改，打造你自己的个人主页。

---

## 🙋 常见问题

### 如何修改主题颜色？

编辑 `public/css/style.css` 中第 5-21 行的 CSS 变量：

```css
:root {
  --bg: #fafaf9;           /* 页面背景 */
  --text: #3c4043;         /* 正文颜色 */
  --accent: #1a56db;       /* 强调色（链接、按钮等） */
  --heading: #202124;      /* 标题颜色 */
  /* ... 更多变量 ... */
}
```

### 如何去掉双语功能？

1. 删除 `views/*.ejs` 文件中的语言切换按钮
2. 删除 EJS 模板中的 `.zh` / `.en` 包裹标签
3. 删除 `style.css` 中 `/* Language Toggle */` 下的 CSS 规则
4. 将内容文件中的 frontmatter 简化为单语言

### 如何添加网站统计（Google Analytics）？

在 `views/partials/scripts.ejs` 的 `</body>` 标签前添加统计代码。

### 可以修改导航栏的文字吗？

编辑 `views/` 目录下各页面文件中的 `<nav class="section-nav">` 部分。

---

💡 **遇到问题？** [提交 Issue](https://github.com/JiangYuxin-Jim/A-personal-website-template-based-on-Express/issues)，我们很乐意帮忙！
