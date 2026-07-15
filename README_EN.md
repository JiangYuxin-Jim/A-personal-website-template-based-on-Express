# Personal Academic Homepage & Blog

> 📖 [中文版](README.md) | English Version

A lightweight, bilingual (Chinese/English) personal academic homepage and blog system. Built with **Express + EJS + Markdown**, zero database required — all content is managed through Markdown files.

## ✨ Features

- 🌐 **Bilingual Support** — Chinese/English toggle, all content supports dual language
- 📝 **Markdown Writing** — Write blog posts in Markdown with syntax highlighting (highlight.js)
- 🗂️ **Zero Database** — All content stored as Markdown files, no database setup needed
- 🎨 **Clean Design** — Minimal academic style, responsive layout, dark code blocks
- ⚡ **Fast & Lightweight** — Express server, server-side rendering, instant load
- 🔧 **Easy Customization** — Edit `content/site.json` and Markdown files to change everything
- 📱 **Responsive** — Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/personal-academic-homepage.git
cd personal-academic-homepage

# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Or start production server
npm start
```

Open `http://localhost:3000` in your browser.

## 📁 Project Structure

```
.
├── app.js                  # Express server & route logic
├── package.json
├── content/                # 📝 ALL content lives here — just edit these files!
│   ├── site.json           # Personal info (name, school, GitHub, email, etc.)
│   ├── about/
│   │   ├── about.md        # About / self-introduction (bilingual)
│   │   └── about.md.example  # Template reference
│   ├── blog/
│   │   ├── hello-world.md  # Example blog post
│   │   └── TEMPLATE.md.example  # Blog post template
│   ├── honors/
│   │   ├── list.md         # Honors & experiences
│   │   └── list.md.example # Template reference
│   ├── publications/
│   │   ├── list.md         # Publications & research projects
│   │   └── list.md.example # Template reference
│   └── images/
│       ├── README.md       # Image usage guide
│       └── photo.png       # Your profile photo (optional)
├── views/                  # EJS templates (usually no need to modify)
│   ├── partials/           # Header, navbar, sidebar, footer
│   └── *.ejs               # Page templates
├── public/
│   ├── css/style.css       # Stylesheet
│   └── js/main.js          # Language toggle & UI logic
└── docs/                   # Screenshots & documentation assets
```

## ✏️ How to Customize

### Step 1: Update Personal Information

Edit **`content/site.json`**:

```json
{
  "name": "Your Name",
  "nameEn": "Your Name (English)",
  "initial": "Y",
  "title": "Your Job Title",
  "titleEn": "Your Job Title (English)",
  "school": "Your University / Company",
  "schoolEn": "Your University / Company (English)",
  "email": "your.email@example.com",
  "github": "yourusername",
  "researchInterests": [
    { "zh": "研究方向一", "en": "Research Area 1" },
    { "zh": "研究方向二", "en": "Research Area 2" }
  ],
  "metaDescription": "Personal academic homepage and tech blog."
}
```

| Field | Description |
|-------|-------------|
| `name` / `nameEn` | Your name in Chinese and English |
| `initial` | A single letter used as favicon and avatar placeholder |
| `title` / `titleEn` | Your job title or role |
| `school` / `schoolEn` | Your affiliation |
| `email` | Your email (hidden if set to `your.email@example.com`) |
| `github` | Your GitHub username (hidden if set to `yourusername`) |
| `researchInterests` | List of research interests (bilingual) |
| `avatar` | (Optional) Path to your profile photo, e.g., `"/images/photo.png"` |

### Step 2: Write Your About Page

Edit **`content/about/about.md`**:

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

### Step 3: Add Blog Posts

Create `.md` files in **`content/blog/`**. Each file needs frontmatter at the top:

```markdown
---
title: Your Post Title
date: 2026-07-20
category: 技术文章
tags: [JavaScript, Node.js]
excerpt: A short summary shown in the blog list (optional)
---

## Section 1

Write your content here with full Markdown support...
```

**Frontmatter fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Post title |
| `date` | ✅ | Publication date (YYYY-MM-DD) |
| `category` | ❌ | Category name (must match one defined in `app.js` CATEGORIES) |
| `tags` | ❌ | Array of tags: `[tag1, tag2]` |
| `excerpt` | ❌ | Summary text (auto-generated from first 150 chars if omitted) |

**To add or change categories**, edit the `CATEGORIES` array in `app.js`:

```js
const CATEGORIES = [
  { name: '技术文章', css: 'cat-tech' },
  { name: '项目实战', css: 'cat-project' },
  { name: '教程笔记', css: 'cat-tutorial' },
  // Add more categories here...
];
```

### Step 4: Update Honors & Experiences

Edit **`content/honors/list.md`**:

```yaml
items:
  - year: "2026"
    title_zh: "荣誉或经历的中文标题"
    title_en: "English Title"
    desc_zh: "中文描述（可选）"
    desc_en: "English description (optional)"
```

### Step 5: Update Publications

Edit **`content/publications/list.md`**:

```yaml
# Single-language paper:
items:
  - title: "Paper Title"
    venue: "Journal Name, 2025"
    doi: "10.xxxx/example"
    link: "https://doi.org/10.xxxx/example"

# Bilingual entry:
  - title_zh: "中文论文标题"
    title_en: "English Paper Title"
    venue_zh: "《期刊名》，2025"
    venue_en: "Journal Name, 2025"
```

### Step 6: Add Your Profile Photo

Place a photo named `photo.png` in `content/images/`. Or set a custom path via `avatar` in `site.json`.

If no photo is provided, your initial letter is displayed as a placeholder.

## 🎨 Markdown Features

Your blog posts support full Markdown with syntax highlighting:

- **Code blocks** with language detection (Python, JavaScript, Java, SQL, Bash, etc.)
- **Tables**, **blockquotes**, **images**, **links**
- **Automatic Table of Contents** — generated from `##` (h2) headings
- **Reading time** estimation

## 🖥️ Pages

| Route | Page | Content Source |
|-------|------|----------------|
| `/` | Home (About) | `content/about/about.md` |
| `/blog` | Blog List | `content/blog/*.md` |
| `/blog/:slug` | Blog Post | Individual blog markdown file |
| `/publications` | Publications | `content/publications/list.md` |
| `/honors` | Honors & Experience | `content/honors/list.md` |

## 🚢 Deployment

### Option 1: Deploy to cloud platforms

This is a standard Node.js app — deploy anywhere that supports Node.js:

**Railway / Render / Heroku:**
```bash
# Build command
npm install

# Start command
npm start
```

Make sure to set the `PORT` environment variable if required by the platform.

### Option 2: Deploy with PM2 (VPS)

```bash
npm install -g pm2
pm2 start app.js --name "homepage"
pm2 save
pm2 startup
```

### Option 3: GitHub Pages (static export)

Since this is a server-rendered app, it cannot be directly deployed to GitHub Pages. Consider using a cloud platform or VPS instead.

## 🔧 Tech Stack

- **Backend**: [Express](https://expressjs.com/) 5.x
- **Template Engine**: [EJS](https://ejs.co/)
- **Markdown Parsing**: [marked](https://marked.js.org/) + [highlight.js](https://highlightjs.org/)
- **Frontmatter**: [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Dev Server**: [nodemon](https://nodemon.io/)

## 📄 License

MIT — feel free to use and modify for your own personal homepage.

---

## 🙋 FAQ

### How do I change the theme colors?

Edit the CSS variables in `public/css/style.css`, lines 5-21:

```css
:root {
  --bg: #fafaf9;           /* Page background */
  --text: #3c4043;         /* Body text */
  --accent: #1a56db;       /* Accent color (links, buttons) */
  --heading: #202124;      /* Heading text */
  /* ... more variables ... */
}
```

### How do I remove the bilingual feature?

1. Delete the language toggle button from `views/*.ejs` files
2. Remove `.zh` / `.en` span wrappers in the EJS templates
3. Remove the CSS rules under `/* Language Toggle */` in `style.css`
4. Simplify frontmatter in content files to single language

### How do I add Google Analytics?

Add your tracking code in `views/partials/scripts.ejs` before the closing `</body>` tag.

### Can I change the nav labels?

Edit the `<nav class="section-nav">` sections in the view files under `views/`.

---

💡 **Having trouble?** [Open an issue](https://github.com/yourusername/personal-academic-homepage/issues) — we're happy to help!
