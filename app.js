const express = require('express');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');
const { marked } = require('marked');
const { markedHighlight } = require('marked-highlight');
const hljs = require('highlight.js');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Load site configuration ---
let siteConfig = {};
try {
  const siteRaw = fs.readFileSync(path.join(__dirname, 'content', 'site.json'), 'utf-8');
  siteConfig = JSON.parse(siteRaw);
} catch (e) {
  console.warn('⚠️  content/site.json not found, using defaults.');
  siteConfig = {
    name: 'Your Name', nameEn: 'Your Name', initial: 'Y',
    title: 'Your Title', titleEn: 'Your Title',
    school: 'Your School', schoolEn: 'Your School',
    email: 'your.email@example.com', github: 'yourusername',
    researchInterests: [],
    metaDescription: 'Personal academic homepage.'
  };
}

// --- Configure marked with highlight.js + custom heading IDs ---
marked.use({ headerIds: false, mangle: false });

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  })
);

// Custom heading renderer to add IDs matching TOC anchors
marked.use({
  extensions: [{
    name: 'heading',
    level: 'block',
    renderer(token) {
      const raw = token.text;
      const anchor = raw.toLowerCase().replace(/[^\w一-鿿]+/g, '-').replace(/^-|-$/g, '');
      return `<h${token.depth} id="${anchor}">${raw}</h${token.depth}>\n`;
    }
  }]
});

// --- View engine ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Static files ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'content')));

// --- Blog helpers with simple in-memory cache ---
let postsCache = null;
let cacheTime = 0;
const CACHE_TTL = 30 * 1000; // 30 seconds

function getBlogPosts() {
  const now = Date.now();
  if (postsCache && (now - cacheTime) < CACHE_TTL) {
    return postsCache;
  }

  const blogDir = path.join(__dirname, 'content', 'blog');
  if (!fs.existsSync(blogDir)) {
    postsCache = [];
    cacheTime = now;
    return postsCache;
  }

  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const { data, content } = matter(raw);
    const slug = file.replace(/\.md$/, '');

    // Count words for reading time (Chinese: characters, English: words)
    const text = content.replace(/[#*`\-\n\r\[\]()>|!]/g, ' ');
    const wordCount = text.length;
    const readTime = Math.max(1, Math.ceil(wordCount / 500));

    // Extract h2 headings for TOC
    const headings = [];
    const headingRegex = /^##\s+(.+)$/gm;
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const title = match[1].trim();
      const anchor = title
        .toLowerCase()
        .replace(/[^\w一-鿿]+/g, '-')
        .replace(/^-|-$/g, '');
      headings.push({ title, anchor });
    }

    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date) : new Date(),
      category: data.category || '未分类',
      tags: data.tags || [],
      excerpt: data.excerpt || content.replace(/[#*`\n\r]/g, ' ').slice(0, 150) + '...',
      content,
      headings,
      readTime,
    };
  });

  // Sort by date descending
  posts.sort((a, b) => b.date - a.date);

  postsCache = posts;
  cacheTime = now;
  return posts;
}

function getPostBySlug(slug) {
  const posts = getBlogPosts();
  return posts.find(p => p.slug === slug) || null;
}

// --- Categories — add new categories here (single source of truth) ---
const CATEGORIES = [
  { name: '技术文章', css: 'cat-tech' },
  { name: '项目实战', css: 'cat-project' },
  { name: '教程笔记', css: 'cat-tutorial' },
];

function getCategoryClass(category) {
  const found = CATEGORIES.find(c => c.name === category);
  return found ? found.css : 'cat-internship';
}

function getCategoryList() {
  return CATEGORIES.map(c => c.name);
}

// --- Content loaders — reads markdown files from content/ directories ---
function loadContentFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { ...data, body: content.trim() };
}

function loadAbout() {
  const file = loadContentFile(path.join(__dirname, 'content', 'about', 'about.md'));
  if (!file) return { zh: '', en: '' };
  return {
    zh: (file.text_zh || '').replace(/\n/g, '\n'),
    en: (file.text_en || '').replace(/\n/g, '\n'),
  };
}

function loadPublications() {
  const file = loadContentFile(path.join(__dirname, 'content', 'publications', 'list.md'));
  return file ? (file.items || []) : [];
}

function loadHonors() {
  const file = loadContentFile(path.join(__dirname, 'content', 'honors', 'list.md'));
  return file ? (file.items || []) : [];
}

// Make helpers available in templates
app.locals.site = siteConfig;
app.locals.getCategoryClass = getCategoryClass;
app.locals.CATEGORIES = CATEGORIES;
app.locals.getCategoryList = getCategoryList;

// ==========================================
// Routes
// ==========================================

// Homepage — About
app.get('/', (req, res) => {
  const about = loadAbout();
  res.render('index', {
    title: siteConfig.name,
    currentPage: 'home',
    aboutZhHtml: marked.parse(about.zh),
    aboutEnHtml: marked.parse(about.en),
  });
});

// Publications page
app.get('/publications', (req, res) => {
  res.render('publications', {
    title: 'Publications — ' + siteConfig.name,
    currentPage: 'publications',
    items: loadPublications(),
  });
});

// Honors page
app.get('/honors', (req, res) => {
  res.render('honors', {
    title: 'Honors — ' + siteConfig.name,
    currentPage: 'honors',
    items: loadHonors(),
  });
});

// Blog list
app.get('/blog', (req, res) => {
  const posts = getBlogPosts();
  res.render('blog-list', {
    title: '博客',
    currentPage: 'blog',
    posts,
    activeCategory: req.query.category || null,
  });
});

// Blog post detail
app.get('/blog/:slug', (req, res) => {
  const post = getPostBySlug(req.params.slug);
  if (!post) {
    return res.status(404).render('404', {
      title: '404 未找到',
      currentPage: 'blog',
    });
  }

  const posts = getBlogPosts();
  const currentIndex = posts.findIndex(p => p.slug === req.params.slug);
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  // Render markdown to HTML
  const bodyHtml = marked.parse(post.content);

  res.render('blog-post', {
    title: post.title,
    currentPage: 'blog',
    post,
    bodyHtml,
    prevPost,
    nextPost,
  });
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 未找到',
    currentPage: 'home',
  });
});

// ==========================================
// Start server
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Blog server running at http://localhost:${PORT}`);
});
