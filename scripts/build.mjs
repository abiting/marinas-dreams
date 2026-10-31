import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const data = JSON.parse(fs.readFileSync(path.join(root, 'src/content.json'), 'utf8'));
const settings = JSON.parse(fs.readFileSync(path.join(root, 'src/site.json'), 'utf8'));
const brand = "10eKokoro's Dream";
const siteName = data.siteName === brand ? data.siteName : brand;
const language = data.language || 'ja';
const authorName = data.authorName || '10eKokoro';
const europeanCollections = new Set(['欧州ホラー映画名作10選', '欧州恋愛映画名作5選', '欧州成人指定アクション映画5選']);

const validateOrigin = (value) => {
  if (!value) return '';
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error('PUBLIC_ORIGIN/publicOrigin must be a valid HTTPS origin');
  }
  if (parsed.protocol !== 'https:' || !parsed.hostname || parsed.username || parsed.password || parsed.search || parsed.hash || (parsed.pathname !== '' && parsed.pathname !== '/')) {
    throw new Error('PUBLIC_ORIGIN/publicOrigin must be an HTTPS origin without credentials, path, query, or hash');
  }
  return parsed.origin;
};
const configuredOrigin = process.env.PUBLIC_ORIGIN?.trim() || settings.publicOrigin || '';
const origin = validateOrigin(configuredOrigin);
const basePath = (process.env.BASE_PATH?.trim() || '').replace(/\/+$/, '');
if (basePath && (!/^\/[A-Za-z0-9._/-]+$/.test(basePath) || basePath.includes('//') || basePath.split('/').some(part => part === '.' || part === '..'))) {
  throw new Error('BASE_PATH must be a safe absolute URL prefix');
}
const publicPath = (route) => `${basePath}${route}`;

const safeRelativePath = (value, fallback) => {
  const normalized = String(value || fallback).replace(/^\/+/, '');
  if (!normalized || normalized.includes('\0') || normalized.split('/').some((part) => part === '..')) {
    throw new Error('Asset paths must stay inside the project');
  }
  return normalized;
};
const bannerPath = `/${safeRelativePath(data.bannerPath, 'assets/banner.jpg')}`;
const bannerAsset = safeRelativePath(data.bannerAsset, 'assets/banner.jpg');
const faviconAsset = safeRelativePath(settings.faviconAsset, 'assets/favicon.png');
const positiveInteger = (value, fallback) => Number.isInteger(Number(value)) && Number(value) > 0 ? Number(value) : fallback;
const bannerWidth = positiveInteger(data.bannerWidth, 2560);
const bannerHeight = positiveInteger(data.bannerHeight, 1086);
const output = path.join(root, 'dist');
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(path.join(output, 'assets'), { recursive: true });
const bannerSource = path.join(root, bannerAsset);
if (!fs.existsSync(bannerSource)) throw new Error(`Banner asset not found: ${bannerAsset}`);
const bannerTarget = path.join(output, safeRelativePath(bannerPath, 'assets/banner.jpg'));
fs.mkdirSync(path.dirname(bannerTarget), { recursive: true });
fs.copyFileSync(bannerSource, bannerTarget);
const faviconSource = path.join(root, faviconAsset);
if (!fs.existsSync(faviconSource)) throw new Error(`Favicon asset not found: ${faviconAsset}`);
const faviconBytes = fs.readFileSync(faviconSource);
if (faviconBytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a' || faviconBytes.readUInt32BE(16) !== 192 || faviconBytes.readUInt32BE(20) !== 192) throw new Error('Favicon must be a 192x192 PNG');
fs.copyFileSync(faviconSource, path.join(output, 'favicon.png'));

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
const absolute = (route) => origin ? `${origin}${publicPath(route)}` : publicPath(route);
const imageUrl = data.bannerUrl || absolute(bannerPath);
const authorId = absolute('/about-10ekokoro/#author');
const person = {
  '@type': 'Person', '@id': authorId, name: authorName, url: absolute('/about-10ekokoro/'),
  description: '台湾出身で映画を愛するバリスタ、10eKokoro。',
};
const arrow = '<span aria-hidden="true">↗</span>';
const collectionPrefix = (review) => review.collection ? `${escape(review.collection)} <span class="dot">·</span> ` : '';
const categoryPrefix = (review) => review.categoryLabel ? `${escape(review.categoryLabel)} <span class="dot">·</span> ` : '' ;
const nav = (route) => `<header class="site-header"><a class="wordmark" href="/" aria-label="${escape(siteName)} ホーム"><span class="brand-initial" aria-hidden="true">k.</span><span>${escape(siteName)}</span></a><nav aria-label="メインナビゲーション"><a href="/" ${route === '/' ? 'aria-current="page"' : ''}>ホーム</a><a href="/film-reviews/" ${route.includes('review') ? 'aria-current="page"' : ''}>映画レビュー</a><a href="/about-10ekokoro/" ${route.includes('about') ? 'aria-current="page"' : ''}>10eKokoroについて</a></nav><span class="header-note">台湾発、映画をめぐる個人ノート</span></header>`;
const footer = `<footer class="site-footer"><div class="footer-top"><a class="footer-brand" href="/">${escape(siteName)}</a><p>映画の余韻と、静かなひととき。<br>ページをめくるように、ゆっくりと。</p><a class="text-link" href="/about-10ekokoro/">10eKokoroについて ${arrow}</a></div><div class="footer-bottom"><p>© 2026 ${escape(siteName)}</p><p>このサイトは、台湾のマーケティング専門家 <a href="https://abiting.cc">Abiting</a> が制作・運営しています。</p></div></footer>`;
const card = (review, index, compact = false) => {
  const searchText = [review.fullName, review.originalTitle, review.director, review.collection, review.categoryLabel, review.theme, review.title, review.subtitle].filter(Boolean).join(' ').toLocaleLowerCase('ja');
  return `<article class="review-entry ${compact ? 'compact' : ''}" data-review data-theme="${escape(review.theme)}" data-search="${escape(searchText)}"><span class="entry-number">${String(index + 1).padStart(2, '0')}</span><div class="entry-main"><p class="eyebrow">${collectionPrefix(review)}${categoryPrefix(review)}${escape(review.theme)} <span class="dot">·</span> ${escape(review.year)}</p><h3><a href="/${escape(review.slug)}/">${escape(review.name)}</a></h3><p class="entry-subtitle">${escape(review.subtitle || review.title || '')}</p><p class="entry-description">${escape(review.description)}</p><div class="entry-meta"><span>${escape(review.director)}</span><span>${escape(review.readMinutes || 1)}分で読めます</span><span>ネタバレ控えめ</span></div></div><a class="entry-link" href="/${escape(review.slug)}/" aria-label="${escape(review.name)}のレビューを読む">レビューを読む ${arrow}</a></article>`;
};
const effectiveModified = (article) => article?.modifiedAt || article?.publishedAt || data.modifiedAt || data.publishedAt;
const dateOnly = (value) => value ? String(value).slice(0, 10) : '';
const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('ja-JP', { timeZone: 'Asia/Taipei', year: 'numeric', month: 'long', day: 'numeric' });
};
const page = ({ route, title, description, body, article, noindex = false, keywords = [] }) => {
  const modifiedAt = effectiveModified(article);
  const graph = [person];
  if (article) {
    graph.push({ '@type': 'Article', '@id': absolute(`${route}#article`), mainEntityOfPage: absolute(route),
      headline: article.title, description, author: { '@id': authorId, name: authorName }, datePublished: article.publishedAt || data.publishedAt,
      dateModified: modifiedAt, image: imageUrl, inLanguage: 'ja', articleSection: '映画レビュー',
      about: { '@type': 'Movie', name: article.fullName, director: { '@type': 'Person', name: article.director } },
    });
  }
  const structured = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="${escape(language)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta name="keywords" content="${escape(keywords.join(', '))}"><meta name="theme-color" content="#70483c">${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}${origin ? `<link rel="canonical" href="${escape(absolute(route))}"><meta property="og:url" content="${escape(absolute(route))}">` : ''}<meta property="og:type" content="${article ? 'article' : 'website'}"><meta property="og:title" content="${escape(article?.title || title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:site_name" content="${escape(siteName)}"><meta property="og:locale" content="ja_JP"><meta property="og:image" content="${escape(imageUrl)}"><meta property="og:image:width" content="${bannerWidth}"><meta property="og:image:height" content="${bannerHeight}"><meta property="og:image:alt" content="${escape(`${siteName}：古いカメラとフィルム、ノート、コーヒーのある静かな机`)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(article?.title || title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${escape(imageUrl)}">${article ? `<meta property="article:published_time" content="${escape(article.publishedAt || data.publishedAt)}"><meta property="article:modified_time" content="${escape(modifiedAt)}">` : ''}<link rel="icon" href="/favicon.png" type="image/png" sizes="192x192"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Noto+Sans+JP:wght@400;500;600&family=Noto+Serif+JP:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="/assets/${assetNames['styles.css']}"><script type="application/ld+json">${structured}</script><script src="/assets/${assetNames['main.js']}" defer></script></head><body class="${article ? 'article-page' : 'journal-page'}"><a class="skip-link" href="#main">本文へ移動</a>${nav(route)}<main id="main">${body}</main>${footer}</body></html>`.replace(/\b(href|src)="\/(?!\/)/g, (_, attribute) => `${attribute}="${basePath}/`);
};
const writePage = (route, options) => {
  const target = route === '/' ? output : path.join(output, safeRelativePath(route, ''));
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, 'index.html'), page({ route, ...options }));
};

writePage('/', {
  title: `${siteName}｜映画レビューと映像のノート`,
  description: '台湾出身で映画を愛するバリスタ、10eKokoroによる映画レビューと、映像の余韻を書き留める個人ノート。',
  keywords: [siteName, '映画レビュー', '映画ノート', '台湾'],
  body: `<section class="home-hero"><div class="hero-image"><img src="${escape(bannerPath)}" alt="${escape(`${siteName}：古いカメラとフィルム、ノート、コーヒーのある静かな机`)}" width="${bannerWidth}" height="${bannerHeight}" fetchpriority="high"></div><div class="hero-caption"><span>映画と、あいだにある時間</span><span>台湾から綴る <span aria-hidden="true">—</span> どこからでも読める</span></div></section><section class="intro-section section-wrap"><div><p class="eyebrow">結論ではなく、ノート</p><h1>あとからも<br><i>残る映像のために。</i></h1></div><div class="intro-note"><p>台湾出身で映画を愛するバリスタ、10eKokoroの映画ノートです。</p><p>視線や沈黙、翌朝になってもふと戻ってくる場面を、ここに書き留めています。</p><a class="text-link" href="/about-10ekokoro/">10eKokoroについて ${arrow}</a></div></section><section class="reviews-section section-wrap" aria-labelledby="reviews-heading"><div class="section-heading"><div><p class="eyebrow">ノートから</p><h2 id="reviews-heading">スクリーンから、<i>ノートの中へ。</i></h2></div><a class="text-link" href="/film-reviews/">映画レビューをすべて見る ${arrow}</a></div><div class="review-list">${data.reviews.slice(-6).map((r, i) => card(r, i)).join('')}</div></section><section class="journal-note section-wrap" aria-labelledby="notes-heading"><div class="note-label"><span class="eyebrow">少しずつ更新中</span><span class="note-index">04 — ∞</span></div><div><h2 id="notes-heading">スクリーンの外側</h2><p>映画やドキュメンタリー、短いエッセイ。未完成の考えも置いておける、余白のあるノートです。</p><div class="topic-labels"><span>ドキュメンタリー</span><span>映画の記憶</span><span>個人的なエッセイ</span></div></div></section><section class="closing-note"><p>「静かな場面ほど、あとから長く残る。」</p><span class="eyebrow">10eKokoroのノートより</span></section>`,
});
writePage('/film-reviews/', {
  title: `映画レビューと余韻｜${siteName}`,
  description: '台湾角頭映画、欧州ホラー・恋愛・成人指定アクション、欧米ゴースト、日本のホラー・アニメ、名探偵コナン、陶磁ドキュメンタリー。映像と物語の余韻を読み解く日本語レビュー。',
  keywords: ['台湾角頭映画レビュー', '欧州映画レビュー', '欧米ゴースト映画', '日本アニメ映画名作', '日本ホラー映画', '日本成人映画史', '名探偵コナン映画', '中国陶磁ドキュメンタリー'],
  body: `<section class="archive-header section-wrap"><p class="eyebrow">映画ノート</p><h1>映画レビューと<br><i>そのあとの余韻。</i></h1><p class="lead">点数をつけるためではなく、もう少し近くで眺めるために。</p><p class="content-note archive-content-note">成人向け作品や制限区分の作品は、公開国・地域・時期・版によって年齢区分が異なります。確認できた審査機関と版を各記事で個別に示し、区分を単一基準に置き換えません。成人向けの題材や暴力は、批評に必要な範囲で非露骨に扱います。</p><div class="archive-controls" data-archive-controls hidden><label class="search-box"><span class="sr-only">映画レビューを検索</span><input type="search" placeholder="作品名・監督・言葉を検索…" data-search-input><span aria-hidden="true">⌕</span></label><span class="result-count" aria-live="polite" data-result-count>${data.reviews.length}件のレビュー</span></div></section><section class="archive-list section-wrap" aria-labelledby="archive-list-heading"><h2 class="sr-only" id="archive-list-heading">ノートから</h2><div class="review-list">${data.reviews.map((r, i) => card(r, i)).join('')}</div><p class="no-results" data-no-results hidden>一致するレビューがありません。作品名や監督名を変えてお試しください。</p></section>`,
});
writePage('/about-10ekokoro/', {
  title: `10eKokoroについて｜${siteName}`,
  description: '台湾出身で映画を愛するバリスタ、10eKokoroのプロフィールと、映画や日々のノートについて紹介します。',
  keywords: ['10eKokoro', '台湾', 'バリスタ', '映画ノート'],
  body: `<section class="about-heading section-wrap"><p class="eyebrow">このページを書いている人</p><h1>10eKokoroの<br><i>映画ノート。</i></h1><p class="lead">台湾出身のバリスタ。映画が好きです。</p></section><section class="about-layout section-wrap"><aside class="about-margin"><span class="margin-mark" aria-hidden="true">10</span><p class="eyebrow">台湾から<br>映画のそばで</p><p class="margin-note">静かな映像。<br>強く残る気持ち。<br>一杯のコーヒー。</p></aside><div class="prose about-prose">${(data.about || []).map((paragraph) => `<p>${paragraph}</p>`).join('')}<a class="text-link" href="/film-reviews/">映画ノートを読む ${arrow}</a></div></section>`,
});
const sectionTitles = {
  'lust-caution-2007-review': ['互いを見つめる人々', '親密さと演技、そして力'],
  'the-bucket-list-2007-review': ['リストの向こうにある友情', '人生を満たすもの'],
  'mewtwo-strikes-back-review': ['誰かに決められた始まり', '思いやりの核'],
};
for (const review of data.reviews) {
  const [firstHeading, secondHeading] = review.sectionHeadings || sectionTitles[review.slug] || ['もう一度近くで見る', 'そのあとに残るもの'];
  const articleDate = review.publishedAt || data.publishedAt;
  writePage(`/${review.slug}/`, {
    title: review.seoTitle, description: review.description, article: review,
    keywords: (review.releaseYearBasis || europeanCollections.has(review.collection)) && review.keywords?.length ? [...new Set(review.keywords)] : [...new Set([review.name, review.originalTitle, review.director, review.theme, review.collection, review.categoryLabel, '映画レビュー'].filter(Boolean))],
    body: `<section class="article-heading section-wrap"><nav class="breadcrumbs" aria-label="パンくず"><a href="/">ホーム</a><span aria-hidden="true">/</span><a href="/film-reviews/">映画レビュー</a><span aria-hidden="true">/</span><span>${escape(review.name)}</span></nav><p class="eyebrow">${collectionPrefix(review)}${categoryPrefix(review)}${escape(review.theme)} <span class="dot">·</span> ${escape(review.year)}</p><h1>${escape(review.title)} </h1><p class="article-deck">${escape(review.description)}</p><div class="byline"><a href="/about-10ekokoro/">10eKokoro</a><span>${escape(formatDate(articleDate))}公開</span><span>${escape(review.readMinutes || 1)}分で読めます</span><span class="spoiler-label">ネタバレ控えめ</span></div></section><div class="article-layout section-wrap"><aside class="article-margin"><div class="sticky-margin"><p class="eyebrow">この記事の構成</p><nav aria-label="記事内セクション"><a href="#close-look">${escape(firstHeading)}</a><a href="#afterthoughts">${escape(secondHeading)}</a><a href="#sources">参考資料</a></nav><dl class="film-facts"><div><dt>作品</dt><dd>${escape(review.fullName)}</dd></div><div><dt>監督</dt><dd>${escape(review.director)}</dd></div>${review.productionCountries?.length ? `<div><dt>製作国</dt><dd>${review.productionCountries.map(escape).join('・')}</dd></div>` : ''}${review.classification?.rating ? `<div><dt>年齢区分</dt><dd>${escape(review.classification.territory)}・${escape(review.classification.authority)}：${escape(review.classification.rating)}${review.classification.edition ? `（${escape(review.classification.edition)}）` : ''}${review.classification.sourceId ? ` <sup><a href="#source-${escape(review.classification.sourceId)}" aria-label="年齢区分の出典">[出典]</a></sup>` : ''}</dd></div>` : ''}<div><dt>公開年</dt><dd>${escape(review.year)}${review.releaseYearBasis ? `（${escape(review.releaseYearBasis)}）` : review.slug.includes('mewtwo') ? '（日本公開）' : ''}</dd></div>${review.productionYear ? `<div><dt>撮影完了年</dt><dd>${escape(review.productionYear)}年</dd></div>` : ''}${review.edition ? `<div><dt>版</dt><dd>${escape(review.edition)}</dd></div>` : ''}</dl><button class="share-button" type="button" data-copy-link hidden>記事リンクをコピー ${arrow}</button><span class="share-status sr-only" aria-live="polite" data-share-status></span></div></aside><article class="prose article-prose" aria-label="${escape(review.name)}のレビュー">${review.collection === '日本の成人向け映画史20選' ? '<p class="content-note" role="note">成人向けの題材を含む作品を扱う評論です。性的題材は映画史と映像表現の文脈から非露骨に論じています。</p>' : ''}${review.paragraphs.map((paragraph, index) => `${index === 1 ? `<h2 id="close-look">${escape(firstHeading)}</h2>` : ''}${index === 4 ? `<h2 id="afterthoughts">${escape(secondHeading)}</h2>` : ''}<p>${paragraph}</p>`).join('')}<section class="source-note" id="sources"><h2>参考資料</h2><p>作品情報は以下の資料を参照しています。</p><ol>${review.sources.map((source) => `<li id="source-${escape(source.id)}"><a href="${escape(source.url)}">${escape(source.title)}</a>${source.edition ? ` <span>（${escape(source.edition)}）</span>` : ''}</li>`).join('')}</ol></section><div class="author-note"><span class="author-mark" aria-hidden="true">10</span><div><p class="eyebrow">10eKokoroが書いています</p><p>台湾出身で映画を愛するバリスタ、10eKokoroの映画ノートです。</p><a class="text-link" href="/about-10ekokoro/">10eKokoroについて ${arrow}</a></div></div><figure class="article-banner"><img src="${escape(bannerPath)}" alt="${escape(`${siteName}のサイトバナー：フィルムカメラ、ノート、コーヒーのある静かな机`)}" width="${bannerWidth}" height="${bannerHeight}" loading="lazy" decoding="async"></figure></article></div><section class="related-reviews section-wrap"><div class="section-heading"><div><p class="eyebrow">ページをめくるように</p><h2>別の映画、<i>別の余韻。</i></h2></div></div>${data.reviews.filter((candidate) => candidate.slug !== review.slug).slice(0, 2).map((candidate, index) => card(candidate, index, true)).join('')}</section>`,
  });
}
fs.writeFileSync(path.join(output, '404.html'), page({ route: '/404/', title: `ページが見つかりません｜${siteName}`, description: 'お探しのページは見つかりませんでした。映画レビューまたはホームへお戻りください。', noindex: true, keywords: [siteName, '映画レビュー'], body: '<section class="not-found section-wrap"><p class="eyebrow">ページが見つかりません</p><h1>このページは<br><i>まだありません。</i></h1><p>古いリンクから移動した可能性があります。前のページへ戻りましょう。</p><a class="button-link" href="/film-reviews/">映画レビューを見る ↗</a></section>' }));

const routesWithDates = [
  { path: '/', title: siteName, lastmod: effectiveModified() },
  { path: '/film-reviews/', title: '映画レビュー', lastmod: effectiveModified() },
  { path: '/about-10ekokoro/', title: '10eKokoroについて', lastmod: effectiveModified() },
  ...data.reviews.map((review) => ({ path: `/${review.slug}/`, title: review.name, lastmod: effectiveModified(review) })),
];
const routes = routesWithDates.map(({ path: route, title }) => ({ path: publicPath(route), title }));
fs.writeFileSync(path.join(output, 'manus-routes.json'), JSON.stringify({ routes }, null, 2));
if (origin) {
  fs.writeFileSync(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routesWithDates.map((route) => `  <url><loc>${escape(absolute(route.path))}</loc><lastmod>${escape(dateOnly(route.lastmod))}</lastmod></url>`).join('\n')}\n</urlset>\n`);
  fs.writeFileSync(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}${basePath}/sitemap.xml\n`);
}
fs.writeFileSync(path.join(output, '.nojekyll'), '');
console.log(`Built ${routes.length} complete Japanese HTML pages for ${brand}${origin ? ` at ${origin}` : ' (canonical origin pending publication)'}.`);
