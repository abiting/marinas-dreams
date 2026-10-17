import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const data = JSON.parse(fs.readFileSync(path.join(root, 'src/content.json'), 'utf8'));
const settings = JSON.parse(fs.readFileSync(path.join(root, 'src/site.json'), 'utf8'));
const origin = settings.publicOrigin?.replace(/\/$/, '') || '';
if (origin && !/^https:\/\/[^/]+$/.test(origin)) throw new Error('publicOrigin must be a real HTTPS origin');
const output = path.join(root, 'dist');
fs.mkdirSync(output, { recursive: true });
fs.mkdirSync(path.join(output, 'assets'), { recursive: true });
const bannerTarget = path.join(output, data.bannerPath);
fs.mkdirSync(path.dirname(bannerTarget), { recursive: true });
fs.copyFileSync(path.join(root, 'assets/banner.jpg'), bannerTarget);
const assetNames = {};
for (const name of ['styles.css', 'main.js']) {
  const bytes = fs.readFileSync(path.join(root, 'assets', name));
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 10);
  const ext = path.extname(name);
  const hashedName = `${path.basename(name, ext)}.${hash}${ext}`;
  assetNames[name] = hashedName;
  fs.writeFileSync(path.join(output, 'assets', hashedName), bytes);
}
const escape = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const absolute = (route) => origin ? `${origin}${route}` : route;
const authorId = absolute('/about-marina/#marina');
const person = {
  '@type': 'Person', '@id': authorId, name: 'Marina', url: absolute('/about-marina/'),
  description: 'A Taiwan-based barista who loves film, documentaries, and contemporary art.',
};
const arrow = '<span aria-hidden="true">↗</span>';
const nav = (route) => `<header class="site-header"><a class="wordmark" href="/" aria-label="Marina’s Dreams home"><span class="brand-initial" aria-hidden="true">m.</span><span>Marina’s <i>Dreams</i></span></a><nav aria-label="Main navigation"><a href="/" ${route === '/' ? 'aria-current="page"' : ''}>Home</a><a href="/film-reviews/" ${route.includes('review') ? 'aria-current="page"' : ''}>Film reviews</a><a href="/about-marina/" ${route.includes('about') ? 'aria-current="page"' : ''}>About Marina</a></nav><span class="header-note">A personal film & art journal</span></header>`;
const footer = `<footer class="site-footer"><div class="footer-top"><a class="footer-brand" href="/">Marina’s <i>Dreams</i></a><p>A few films. A quiet moment.<br>Something to carry with you.</p><a class="text-link" href="/about-marina/">Meet Marina ${arrow}</a></div><div class="footer-bottom"><p>Copyright © 2026 Marina’s Dreams</p><p>This website was built and is maintained by <a href="https://abiting.cc">Abiting</a>, a Taiwan-based marketing specialist.</p></div><p class="disclaimer">A personal portfolio. Not affiliated with Marina Abramović or the 2010 film <em>MARINA</em>.</p></footer>`;
const card = (review, index, compact = false) => `<article class="review-entry ${compact ? 'compact' : ''}" data-review data-theme="${escape(review.theme)}" data-search="${escape(`${review.fullName} ${review.director} ${review.theme} ${review.title}`.toLowerCase())}"><span class="entry-number">${String(index + 1).padStart(2, '0')}</span><div class="entry-main"><p class="eyebrow">${escape(review.theme)} <span class="dot">·</span> ${review.year}</p><h3><a href="/${review.slug}/">${escape(review.name)}</a></h3><p class="entry-subtitle">${escape(review.title.split('Review: ')[1])}</p><p class="entry-description">${escape(review.description)}</p><div class="entry-meta"><span>${escape(review.director)}</span><span>${review.readMinutes} min read</span><span>Spoiler-light</span></div></div><a class="entry-link" href="/${review.slug}/" aria-label="Read ${escape(review.name)} review">Read the review ${arrow}</a></article>`;
const page = ({ route, title, description, body, article, noindex = false, keywords = [] }) => {
  const graph = [person];
  if (article) {
    graph.push({ '@type': 'Article', '@id': absolute(`${route}#article`), mainEntityOfPage: absolute(route),
      headline: article.title, description, author: { '@id': authorId }, datePublished: article.publishedAt || data.publishedAt,
      dateModified: article.publishedAt || data.publishedAt, image: data.bannerUrl, inLanguage: 'en', articleSection: 'Film reviews',
      about: { '@type': 'Movie', name: article.fullName, director: { '@type': 'Person', name: article.director } },
    });
  }
  const structured = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta name="keywords" content="${escape(keywords.join(', '))}"><meta name="theme-color" content="#70483c">${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}${origin ? `<link rel="canonical" href="${escape(absolute(route))}"><meta property="og:url" content="${escape(absolute(route))}">` : ''}<meta property="og:type" content="${article ? 'article' : 'website'}"><meta property="og:title" content="${escape(article?.title || title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:site_name" content="Marina’s Dreams"><meta property="og:locale" content="en_US"><meta property="og:image" content="${data.bannerUrl}"><meta property="og:image:width" content="2560"><meta property="og:image:height" content="1086"><meta property="og:image:alt" content="Marina’s Dreams: a vintage camera, film, notebooks, and a cup of coffee in soft morning light"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(article?.title || title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${data.bannerUrl}">${article ? `<meta property="article:published_time" content="${article.publishedAt || data.publishedAt}"><meta property="article:modified_time" content="${article.publishedAt || data.publishedAt}">` : ''}<link rel="icon" href="${data.bannerUrl}" type="image/jpeg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet"><link rel="stylesheet" href="/assets/${assetNames['styles.css']}"><script type="application/ld+json">${structured}</script><script src="/assets/${assetNames['main.js']}" defer></script></head><body class="${article ? 'article-page' : 'journal-page'}"><a class="skip-link" href="#main">Skip to content</a>${nav(route)}<main id="main">${body}</main>${footer}</body></html>`;
};
const writePage = (route, options) => {
  const target = route === '/' ? output : path.join(output, route);
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, 'index.html'), page({ route, ...options }));
};

writePage('/', {
  title: 'Marina’s Dreams | Film Reviews & Visual Essays',
  description: 'Film reviews, documentary notes, and visual essays by Marina, a Taiwan-based barista drawn to quiet, powerful images.',
  keywords: ['Marina’s Dreams', 'film reviews', 'visual essays', 'Taiwan film journal'],
  body: `<section class="home-hero"><div class="hero-image"><img src="${data.bannerPath}" alt="Marina’s Dreams: a vintage camera, rolls of film, notebooks, and coffee in soft morning light" width="2560" height="1086" fetchpriority="high"></div><div class="hero-caption"><span>Films, art & the moments in between</span><span>Written from Taiwan <span aria-hidden="true">—</span> read everywhere</span></div></section><section class="intro-section section-wrap"><div><p class="eyebrow">A notebook, not a verdict</p><h1>For the images<br>that <i>stay with us.</i></h1></div><div class="intro-note"><p>Hi, I’m Marina—a barista from Taiwan with a deep love of cinema.</p><p>This is where I put the things that linger: a glance, a silence, a scene that feels different the next morning.</p><a class="text-link" href="/about-marina/">A little about me ${arrow}</a></div></section><section class="reviews-section section-wrap" aria-labelledby="reviews-heading"><div class="section-heading"><div><p class="eyebrow">From the notebook</p><h2 id="reviews-heading">From the screen, <i>into the notebook.</i></h2></div><a class="text-link" href="/film-reviews/">All film reviews ${arrow}</a></div><div class="review-list">${data.reviews.slice(-6).map((r, i) => card(r, i)).join('')}</div></section><section class="journal-note section-wrap" aria-labelledby="notes-heading"><div class="note-label"><span class="eyebrow">Still unfolding</span><span class="note-index">04 — ∞</span></div><div><h2 id="notes-heading">Beyond the screen</h2><p>Documentary notes, contemporary art, and short personal essays will find their way here, too. A creative notebook has room for unfinished thoughts.</p><div class="topic-labels"><span>Documentaries</span><span>Contemporary art</span><span>Personal essays</span></div></div></section><section class="closing-note"><p>“Sometimes, presence alone can tell a story.”</p><span class="eyebrow">A thought from Marina’s notebook</span></section>`,
});
writePage('/film-reviews/', {
  title: 'Film Reviews & Reflections | Marina’s Dreams',
  description: 'Browse Marina’s spoiler-light film reviews, from cinema classics to animation and Taiwanese films, with personal reflections on the images that linger.',
  keywords: ['film reviews', 'Marina’s Dreams', 'spoiler-light reviews', 'cinema reflections'],
  body: `<section class="archive-header section-wrap"><p class="eyebrow">The film notebook</p><h1>Film reviews<br>& <i>afterthoughts.</i></h1><p class="lead">Not a score to settle. A place to look a little closer.</p><div class="archive-controls" data-archive-controls hidden><label class="search-box"><span class="sr-only">Search film reviews</span><input type="search" placeholder="Find a film, filmmaker, or thought…" data-search-input><span aria-hidden="true">⌕</span></label><span class="result-count" aria-live="polite" data-result-count>${data.reviews.length} reviews</span></div></section><section class="archive-list section-wrap" aria-labelledby="archive-list-heading"><h2 class="sr-only" id="archive-list-heading">From the notebook</h2><div class="review-list">${data.reviews.map((r, i) => card(r, i)).join('')}</div><p class="no-results" data-no-results hidden>No matching reviews yet. Try a film title or filmmaker.</p></section>`,
});
writePage('/about-marina/', {
  title: 'About Marina | A Film Journal from Taiwan',
  description: 'Meet Marina, a Taiwan-based barista who loves film, documentaries, and contemporary art. Marina’s Dreams is her personal creative notebook.',
  keywords: ['Marina', 'Taiwan-based barista', 'film journal', 'contemporary art'],
  body: `<section class="about-heading section-wrap"><p class="eyebrow">The person behind the pages</p><h1>Hi, I’m <i>Marina.</i></h1><p class="lead">A barista, a film lover, a work in progress.</p></section><section class="about-layout section-wrap"><aside class="about-margin"><span class="margin-mark" aria-hidden="true">m.</span><p class="eyebrow">Based in Taiwan<br>Drawn to cinema</p><p class="margin-note">Quiet images.<br>Strong feelings.<br>A cup of coffee.</p></aside><div class="prose about-prose">${data.about.map(p => `<p>${p}</p>`).join('')}<div class="about-disclaimer"><h2>A note on the name</h2><p>Marina’s Dreams is a personal portfolio and is not affiliated with Marina Abramović or the 2010 film <em>MARINA</em>.</p></div><a class="text-link" href="/film-reviews/">Open the film notebook ${arrow}</a></div></section>`,
});
const sectionTitles = {
  'lust-caution-2007-review': ['Watching people watch each other', 'Intimacy, performance, and power'],
  'the-bucket-list-2007-review': ['A friendship behind the checklist', 'What makes a life feel full?'],
  'mewtwo-strikes-back-review': ['A beginning someone else decided', 'The compassionate core'],
};
for (const review of data.reviews) {
  const [firstHeading, secondHeading] = review.sectionHeadings || sectionTitles[review.slug];
  writePage(`/${review.slug}/`, {
    title: review.seoTitle, description: review.description, article: review,
    keywords: [review.name, `${review.name} review`, review.director, 'film review'],
    body: `<section class="article-heading section-wrap"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/film-reviews/">Film reviews</a><span aria-hidden="true">/</span><span>${escape(review.name)}</span></nav><p class="eyebrow">${escape(review.theme)} <span class="dot">·</span> ${review.year}</p><h1>${escape(review.name)}<span>${escape(review.title.split('Review: ')[1])}</span></h1><p class="article-deck">${escape(review.description)}</p><div class="byline"><a href="/about-marina/">By Marina</a><span>${new Date(review.publishedAt || data.publishedAt).toLocaleDateString('en-US', { timeZone: 'Asia/Taipei', year: 'numeric', month: 'long', day: 'numeric' })}</span><span>${review.readMinutes} min read</span><span class="spoiler-label">Spoiler-light review</span></div></section><div class="article-layout section-wrap"><aside class="article-margin"><div class="sticky-margin"><p class="eyebrow">In this review</p><nav aria-label="Article sections"><a href="#close-look">${escape(firstHeading)}</a><a href="#afterthoughts">${escape(secondHeading)}</a><a href="#sources">Sources & references</a></nav><dl class="film-facts"><div><dt>Film</dt><dd>${escape(review.fullName)}</dd></div><div><dt>Director</dt><dd>${escape(review.director)}</dd></div><div><dt>Year</dt><dd>${review.year}${review.slug.includes('mewtwo') ? ' (original Japanese release)' : ''}</dd></div>${review.edition ? `<div><dt>Version</dt><dd>${escape(review.edition)}</dd></div>` : ''}</dl><button class="share-button" type="button" data-copy-link hidden>Copy article link ${arrow}</button><span class="share-status sr-only" aria-live="polite" data-share-status></span></div></aside><article class="prose article-prose" aria-label="${escape(review.name)} review">${review.paragraphs.map((p, i) => `${i === 1 ? `<h2 id="close-look">${escape(firstHeading)}</h2>` : ''}${i === 4 ? `<h2 id="afterthoughts">${escape(secondHeading)}</h2>` : ''}<p>${p}</p>`).join('')}<section class="source-note" id="sources"><h2>Sources & references</h2><p>Film details were checked against the following references. The reflections are Marina’s own.</p><ol>${review.sources.map(s => `<li id="source-${s.id}"><a href="${s.url}">${escape(s.title)}</a></li>`).join('')}</ol></section><div class="author-note"><span class="author-mark" aria-hidden="true">m.</span><div><p class="eyebrow">Written by Marina</p><p>A Taiwan-based barista with a deep love of cinema and the quiet moments between people.</p><a class="text-link" href="/about-marina/">About the author ${arrow}</a></div></div></article></div><section class="related-reviews section-wrap"><div class="section-heading"><div><p class="eyebrow">Keep turning the pages</p><h2>Another film, <i>another thought.</i></h2></div></div>${data.reviews.filter(r => r.slug !== review.slug).slice(0, 2).map((r, i) => card(r, i, true)).join('')}</section>`,
  });
}
fs.writeFileSync(path.join(output, '404.html'), page({ route: '/404/', title: 'Page Not Found | Marina’s Dreams', description: 'This page is not in Marina’s notebook. Return to the film reviews or the homepage.', noindex: true, keywords: ['Marina’s Dreams', 'film reviews', 'notebook'], body: '<section class="not-found section-wrap"><p class="eyebrow">A missing page</p><h1>This thought<br>isn’t here <i>yet.</i></h1><p>You may have followed an old link. Let’s turn back a page.</p><a class="button-link" href="/film-reviews/">Explore film reviews ↗</a></section>' }));
const routes = [
  { path: '/', title: 'Marina’s Dreams' }, { path: '/film-reviews/', title: 'Film reviews' },
  { path: '/about-marina/', title: 'About Marina' }, ...data.reviews.map(r => ({ path: `/${r.slug}/`, title: r.name })),
];
fs.writeFileSync(path.join(output, 'manus-routes.json'), JSON.stringify({ routes }, null, 2));
if (origin) {
  fs.writeFileSync(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(r => `  <url><loc>${escape(absolute(r.path))}</loc><lastmod>${data.publishedAt.slice(0, 10)}</lastmod></url>`).join('\n')}\n</urlset>\n`);
  fs.writeFileSync(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`);
} else {
  for (const name of ['sitemap.xml', 'robots.txt']) {
    const file = path.join(output, name);
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }
}
console.log(`Built ${routes.length} complete HTML pages, route manifest, and 404 page${origin ? ` for ${origin}` : ' (canonical origin pending publication)'}.`);
