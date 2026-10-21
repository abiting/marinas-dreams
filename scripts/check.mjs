import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const content = JSON.parse(fs.readFileSync('src/content.json', 'utf8'));
const site = JSON.parse(fs.readFileSync('src/site.json', 'utf8'));
const origin = (process.env.PUBLIC_ORIGIN || site.publicOrigin || '').replace(/\/$/, '');
const basePath = (process.env.BASE_PATH || '').replace(/\/+$/, '');
const brand = "10eKokoro's Dream";
const decode = (s) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const japanese = (s) => /[\u3040-\u30ff\u3400-\u9fff]/.test(s);
const forbidden = /Abramovi|アブラモ|アブラム|The Artist Is Present|Marina.?s Dreams|Marina’s Dreams/i;
assert.equal(content.siteName, brand);
assert.equal(content.language, 'ja');
assert.equal(content.authorName, 'マリナ');
assert.equal(content.reviews.length, 104);
assert.equal(content.about.length, 3);
assert.ok(!forbidden.test(JSON.stringify(content)), 'Removed content must not reappear');
const horrorReviews = content.reviews.filter(r => r.collection === '日本ホラー名作20選');
assert.equal(horrorReviews.length, 20, 'All 20 new Japanese horror reviews are present');
const adultReviews = content.reviews.filter(r => r.collection === '日本の成人向け映画史20選');
assert.equal(adultReviews.length, 20, 'All 20 researched Japanese adult-cinema reviews are present');
const ghostReviews = content.reviews.filter(r => r.collection === '欧米ゴースト映画10選');
assert.equal(ghostReviews.length, 10, 'All ten Western ghost-film reviews are present');
const conanReviews = content.reviews.filter(r => r.collection === '名探偵コナン映画ノート');
assert.equal(conanReviews.length, 1, 'One new Black Iron Submarine review is present');
const conanReview = conanReviews[0];
assert.equal(conanReview.year, 2023);
assert.ok(conanReview.sources.some(ref => ref.url === 'https://coai.abiting.cc/archives/1190'));
assert.equal(site.pendingOrigin, 'https://10e.org');
assert.equal(site.legacyRedirects.enabled, true);
assert.equal(site.legacyRedirects.destination, '/');
const manifest = JSON.parse(fs.readFileSync('dist/manus-routes.json', 'utf8'));
assert.equal(manifest.routes.length, content.reviews.length + 3);
assert.ok(fs.existsSync('dist/.nojekyll'));
const titles = new Set();
const descriptions = new Set();
let articleCount = 0;
let commonAuthor;
for (const routeInfo of manifest.routes) {
  const route = routeInfo.path;
  const logicalRoute = basePath ? route.slice(basePath.length) || '/' : route;
  const file = path.join('dist', logicalRoute, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1, `${route}: one H1`);
  assert.ok(html.includes('<html lang="ja">'), `${route}: Japanese language`);
  assert.ok(!forbidden.test(decode(html)), `${route}: old branding and artist removed`);
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || '');
  const description = decode(html.match(/<meta name="description" content="([^"]+)"/)?.[1] || '');
  assert.ok(title && description && japanese(description), `${route}: Japanese metadata`);
  assert.ok(!titles.has(title) && !descriptions.has(description), `${route}: unique metadata`);
  titles.add(title); descriptions.add(description);
  assert.ok(title.includes(brand), `${route}: renamed page title`);
  assert.ok(html.includes('<meta property="og:locale" content="ja_JP">'));
  assert.ok(html.includes(`<meta property="og:image" content="${content.bannerUrl}">`));
  assert.ok(html.includes('<meta name="twitter:card" content="summary_large_image">'));
  assert.ok(decode(html).includes(`© 2026 ${brand}`), `${route}: new copyright`);
  assert.ok(html.includes('href="https://abiting.cc"'), `${route}: Abiting link retained`);
  assert.ok(!html.includes('YOUR-DOMAIN') && !html.includes('YYYY-MM-DD'));
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1] || '{}')['@graph'];
  assert.ok(Array.isArray(graph));
  const person = graph.find(item => item['@type'] === 'Person');
  assert.equal(person.name, 'マリナ');
  if (!commonAuthor) commonAuthor = person['@id'];
  assert.equal(person['@id'], commonAuthor);
  const article = graph.find(item => item['@type'] === 'Article');
  if (article) {
    articleCount += 1;
    assert.equal(article.author['@id'], commonAuthor);
    assert.equal(article.image, content.bannerUrl);
    assert.equal(article.inLanguage, 'ja');
    assert.ok(!('reviewRating' in article));
    assert.ok(japanese(article.headline));
    const articleBanners = [...html.matchAll(/<figure class="article-banner"><img src="([^"]+)" alt="([^"]+)" width="(\d+)" height="(\d+)" loading="lazy" decoding="async"><\/figure>/g)];
    assert.equal(articleBanners.length, 1, `${route}: one article-end banner`);
    const bannerMatch = articleBanners[0];
    assert.equal(bannerMatch[1], `${basePath}${content.bannerPath}`, `${route}: banner asset path`);
    assert.equal(Number(bannerMatch[3]), content.bannerWidth, `${route}: intrinsic banner width`);
    assert.equal(Number(bannerMatch[4]), content.bannerHeight, `${route}: intrinsic banner height`);
    assert.ok(decode(bannerMatch[2]).includes(brand) && japanese(decode(bannerMatch[2])), `${route}: descriptive Japanese banner alt`);
    assert.ok(bannerMatch.index > html.indexOf('<div class="author-note">'), `${route}: banner follows author note`);
    assert.ok(bannerMatch.index < html.indexOf('</article>', bannerMatch.index), `${route}: banner is at article end`);
    const review = content.reviews.find(r => `/${r.slug}/` === logicalRoute);
    assert.ok(review && review.paragraphs.length === 6 && review.sectionHeadings.length === 2);
    assert.ok(japanese(review.name) && japanese(review.director) && review.paragraphs.every(japanese));
    for (const ref of review.sources) assert.ok(decode(html).includes(`href="${ref.url}"`), `${route}: reference URL retained`);
    const researchedCollections = ['日本ホラー名作20選', '日本の成人向け映画史20選', '欧米ゴースト映画10選', '名探偵コナン映画ノート'];
    if (researchedCollections.includes(review.collection)) {
      assert.equal(review.sources.length >= 2 && review.sources.length <= 4, true, `${route}: 2–4 researched references`);
      const cited = new Set(review.paragraphs.flatMap(p => [...p.matchAll(/href="#source-([^"]+)"/g)].map(m => m[1])));
      assert.ok(review.sources.every(ref => cited.has(ref.id), `${route}: every research source is cited in the article`));
      assert.ok(review.paragraphs.every(p => !/<\s*(script|iframe|style|object|embed)\b/i.test(p)), `${route}: safe HTML fragments`);
      if (review.collection === '日本の成人向け映画史20選') {
        assert.ok(review.categoryLabel && review.keywords?.length >= 3, `${route}: specific adult-cinema category and search terms`);
        assert.ok(html.includes('成人向けの題材を含む作品を扱う評論です。'), `${route}: non-graphic adult-topic notice`);
      }
      if (review.collection === '欧米ゴースト映画10選' || review.collection === '名探偵コナン映画ノート') {
        assert.ok(review.releaseYearBasis && review.edition && review.originalTitle, `${route}: original title and release-year basis`);
        assert.ok(html.includes(`（${review.releaseYearBasis}）`), `${route}: explicit release-year basis`);
        assert.ok(html.includes(review.collection), `${route}: visible series label`);
        const keywordValues = decode(html.match(/<meta name="keywords" content="([^"]+)"/)?.[1] || '').split(', ');
        assert.ok(keywordValues.length >= 3 && keywordValues.length <= 8, `${route}: focused SEO keywords`);
        assert.ok(review.keywords.every(keyword => keywordValues.includes(keyword)), `${route}: custom long-tail keywords rendered`);
        assert.ok(title.length >= 30 && title.length <= 60 && description.length >= 50 && description.length <= 160, `${route}: metadata lengths`);
        assert.ok(!html.includes('成人向けの題材を含む作品を扱う評論です。'), `${route}: no unrelated adult-film notice`);
      }
    }
  }
  if (origin) {
    assert.ok(html.includes(`<link rel="canonical" href="${origin}${route}">`));
    assert.ok(html.includes(`<meta property="og:url" content="${origin}${route}">`));
    if (origin !== site.pendingOrigin) assert.ok(!html.includes('https://10e.org'), 'Future domain must not be advertised as active');
  }
  for (const href of html.matchAll(/href="(\/[^"#]*)(?:#[^"]*)?"/g)) {
    const target = href[1];
    const logicalTarget = basePath ? target.slice(basePath.length) : target;
    if (logicalTarget.startsWith('/assets/')) assert.ok(fs.existsSync(`dist${logicalTarget}`), `Asset ${target} exists`);
    else assert.ok(manifest.routes.some(r => r.path === target), `Internal link ${target} exists`);
  }
  console.log(`PASS ${route}: Japanese HTML, new brand, metadata, shared Person${article ? ', Article' : ''}`);
}
assert.equal(articleCount, content.reviews.length);
assert.ok(fs.readFileSync('dist/mewtwo-strikes-back-review/index.html', 'utf8').includes('href="https://list.abitingpokedex.com/pokemon/mewtwo"'));
const about = fs.readFileSync('dist/about-marina/index.html', 'utf8');
assert.ok(about.includes('台湾') && about.includes('バリスタ'));
const archive = fs.readFileSync('dist/film-reviews/index.html', 'utf8');
assert.ok(archive.includes('「三級」などを一律に当てはめず'));
assert.ok(archive.includes('欧米ゴースト映画10選') && archive.includes('名探偵コナン映画ノート'));
const conanHtml = fs.readFileSync(`dist/${conanReview.slug}/index.html`, 'utf8');
assert.ok(conanHtml.includes('href="https://coai.abiting.cc/archives/1190"'), 'Required Conan reference is publicly linked');
assert.ok(fs.readFileSync('dist/404.html', 'utf8').includes('noindex, follow'));
assert.ok(!forbidden.test(fs.readFileSync('dist/404.html', 'utf8')));
if (origin) {
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
  const robots = fs.readFileSync('dist/robots.txt', 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, content.reviews.length + 3);
  assert.ok(robots.includes(`Sitemap: ${origin}${basePath}/sitemap.xml`));
  assert.ok(sitemap.includes(`${origin}/`));
}
assert.ok(fs.existsSync(`dist${content.bannerPath}`), 'New banner is in the build output');
assert.ok(!fs.existsSync('dist/manus-storage/marina-banner_5b9233cb.jpg'), 'Old branded banner not public');
assert.ok(!fs.readFileSync('assets/main.js', 'utf8').includes('Link copied'));
console.log(`PASS ${content.reviews.length} Japanese reviews / ${content.reviews.length * 6} paragraphs, ${content.reviews.length + 3} routes, including ten Western ghost films and Black Iron Submarine with the required reference, existing collections, article-end banner, SEO and shared author.`);
