import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const content = JSON.parse(fs.readFileSync('src/content.json', 'utf8'));
const site = JSON.parse(fs.readFileSync('src/site.json', 'utf8'));
const origin = (process.env.PUBLIC_ORIGIN || site.publicOrigin || '').replace(/\/$/, '');
const brand = "10eKokoro's Dream";
const decode = (s) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const japanese = (s) => /[\u3040-\u30ff\u3400-\u9fff]/.test(s);
const forbidden = /Abramovi|アブラモ|アブラム|The Artist Is Present|Marina.?s Dreams|Marina’s Dreams/i;
assert.equal(content.siteName, brand);
assert.equal(content.language, 'ja');
assert.equal(content.authorName, 'マリナ');
assert.equal(content.reviews.length, 53);
assert.equal(content.about.length, 3);
assert.ok(!forbidden.test(JSON.stringify(content)), 'Removed content must not reappear');
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
  const file = path.join('dist', route, 'index.html');
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
    const review = content.reviews.find(r => `/${r.slug}/` === route);
    assert.ok(review && review.paragraphs.length === 6 && review.sectionHeadings.length === 2);
    assert.ok(japanese(review.name) && japanese(review.director) && review.paragraphs.every(japanese));
    for (const ref of review.sources) assert.ok(decode(html).includes(`href="${ref.url}"`), `${route}: reference URL retained`);
  }
  if (origin) {
    assert.ok(html.includes(`<link rel="canonical" href="${origin}${route}">`));
    assert.ok(html.includes(`<meta property="og:url" content="${origin}${route}">`));
    if (origin !== site.pendingOrigin) assert.ok(!html.includes('https://10e.org'), 'Future domain must not be advertised as active');
  }
  for (const href of html.matchAll(/href="(\/[^"#]*)(?:#[^"]*)?"/g)) {
    const target = href[1];
    if (target.startsWith('/assets/')) assert.ok(fs.existsSync(`dist${target}`), `Asset ${target} exists`);
    else assert.ok(manifest.routes.some(r => r.path === target), `Internal link ${target} exists`);
  }
  console.log(`PASS ${route}: Japanese HTML, new brand, metadata, shared Person${article ? ', Article' : ''}`);
}
assert.equal(articleCount, 53);
assert.ok(fs.readFileSync('dist/mewtwo-strikes-back-review/index.html', 'utf8').includes('href="https://list.abitingpokedex.com/pokemon/mewtwo"'));
const about = fs.readFileSync('dist/about-marina/index.html', 'utf8');
assert.ok(about.includes('台湾') && about.includes('バリスタ'));
assert.ok(fs.readFileSync('dist/404.html', 'utf8').includes('noindex, follow'));
assert.ok(!forbidden.test(fs.readFileSync('dist/404.html', 'utf8')));
if (origin) {
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
  const robots = fs.readFileSync('dist/robots.txt', 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 56);
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.ok(sitemap.includes(`${origin}/`));
}
assert.ok(fs.existsSync(`dist${content.bannerPath}`), 'New banner is in the build output');
assert.ok(!fs.existsSync('dist/manus-storage/marina-banner_5b9233cb.jpg'), 'Old branded banner not public');
assert.ok(!fs.readFileSync('assets/main.js', 'utf8').includes('Link copied'));
console.log('PASS 53 Japanese reviews / 318 paragraphs, 56 routes, new brand image, canonical, sitemap, author and retained source links.');
