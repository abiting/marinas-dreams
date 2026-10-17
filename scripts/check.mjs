import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const content = JSON.parse(fs.readFileSync('src/content.json', 'utf8'));
const site = JSON.parse(fs.readFileSync('src/site.json', 'utf8'));
const manifest = JSON.parse(fs.readFileSync('dist/manus-routes.json', 'utf8'));
const files = manifest.routes.map((route) => [route.path, path.join('dist', route.path, 'index.html')]);
assert.equal(files.length, content.reviews.length + 3, 'All public pages must exist');
const titles = new Set();
const descriptions = new Set();
let articleCount = 0;
let commonAuthor;
for (const [route, file] of files) {
  const html = fs.readFileSync(file, 'utf8');
  assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1, `${route}: one H1`);
  assert.ok(html.includes('<html lang="en">'), `${route}: English language`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1];
  assert.ok(title && description, `${route}: title and description`);
  assert.ok(!titles.has(title), `${route}: unique title`);
  assert.ok(!descriptions.has(description), `${route}: unique description`);
  titles.add(title); descriptions.add(description);
  assert.ok(html.includes(`<meta property="og:image" content="${content.bannerUrl}">`), `${route}: supplied OG image`);
  assert.ok(html.includes('<meta name="twitter:card" content="summary_large_image">'), `${route}: Twitter card`);
  assert.ok(html.includes('Copyright © 2026 Marina’s Dreams'), `${route}: copyright`);
  assert.ok(html.includes('href="https://abiting.cc"'), `${route}: developer credit`);
  assert.ok(!html.includes('YOUR-DOMAIN') && !html.includes('YYYY-MM-DD'), `${route}: no placeholders`);
  const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert.ok(json, `${route}: structured data`);
  const graph = JSON.parse(json)['@graph'];
  const person = graph.find((item) => item['@type'] === 'Person');
  assert.equal(person.name, 'Marina');
  if (!commonAuthor) commonAuthor = person['@id'];
  assert.equal(person['@id'], commonAuthor, 'One stable author entity');
  const article = graph.find((item) => item['@type'] === 'Article');
  if (article) {
    articleCount += 1;
    assert.equal(article.author['@id'], commonAuthor);
    assert.equal(article.image, content.bannerUrl);
    assert.ok(!('reviewRating' in article), 'No invented rating');
    assert.ok(html.includes('Sources &amp; references') || html.includes('Sources & references'));
  }
  if (site.publicOrigin) {
    assert.ok(html.includes(`<link rel="canonical" href="${site.publicOrigin}${route}">`), `${route}: canonical`);
    assert.ok(html.includes(`<meta property="og:url" content="${site.publicOrigin}${route}">`), `${route}: OG URL`);
  }
  for (const href of html.matchAll(/href="(\/[^"#]*)(?:#[^"]*)?"/g)) {
    const target = href[1];
    if (target.startsWith('/assets/')) assert.ok(fs.existsSync(`dist${target}`), `Asset ${target} exists`);
    else assert.ok(manifest.routes.some((r) => r.path === target), `Internal link ${target} exists`);
  }
  console.log(`PASS ${route}: complete HTML, metadata, shared Person${article ? ', Article' : ''}`);
}
assert.equal(articleCount, content.reviews.length, 'Every review uses Article');
const mewtwoHtml = fs.readFileSync('dist/mewtwo-strikes-back-review/index.html', 'utf8');
assert.ok(mewtwoHtml.includes('href="https://list.abitingpokedex.com/pokemon/mewtwo"'));
const aboutHtml = fs.readFileSync('dist/about-marina/index.html', 'utf8');
assert.ok(aboutHtml.includes('The Artist Is Present'));
assert.ok(aboutHtml.includes('is not affiliated with Marina Abramović'));
if (site.publicOrigin) {
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
  const robots = fs.readFileSync('dist/robots.txt', 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, content.reviews.length + 3);
  assert.ok(robots.includes(`Sitemap: ${site.publicOrigin}/sitemap.xml`));
  console.log('PASS sitemap, robots, canonical and shared absolute author ID');
}
assert.ok(fs.readFileSync('dist/404.html', 'utf8').includes('noindex, follow'));
console.log(`PASS ${content.reviews.length} reviews, supplied Mewtwo link, About content, footer and 404 metadata.`);
