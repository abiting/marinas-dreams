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
assert.equal(content.authorName, '10eKokoro');
assert.equal(content.reviews.length, 142);
assert.equal(content.about.length, 3);
assert.ok(!forbidden.test(JSON.stringify(content)), 'Removed content must not reappear');
assert.ok(!JSON.stringify(content).includes('マリナ'), 'Old author display name is absent from all content and SEO fields');
const horrorReviews = content.reviews.filter(r => r.collection === '日本ホラー名作20選');
assert.equal(horrorReviews.length, 20, 'All 20 new Japanese horror reviews are present');
const adultReviews = content.reviews.filter(r => r.collection === '日本の成人向け映画史20選');
assert.equal(adultReviews.length, 20, 'All 20 researched Japanese adult-cinema reviews are present');
const ghostReviews = content.reviews.filter(r => r.collection === '欧米ゴースト映画10選');
assert.equal(ghostReviews.length, 10, 'All ten Western ghost-film reviews are present');
const ceramicsReviews = content.reviews.filter(r => r.collection === '中国陶磁ドキュメンタリー映画ノート');
assert.equal(ceramicsReviews.length, 1, 'One Wujie Zhijie ceramics documentary review is present');
const ceramicsReview = ceramicsReviews[0];
assert.equal(ceramicsReview.year, 2025, '2025 is the verified Chinese theatrical-release year');
assert.equal(ceramicsReview.productionYear, 2023, '2023 is shown separately as the shooting-completion year');
const chinaNewsSource = ceramicsReview.sources.find(ref => ref.url === 'https://www.fj.chinanews.com.cn/news/2025/2025-09-23/572731.html');
assert.equal(chinaNewsSource?.title, '中国首部白瓷纪录电影《无界之界》正式上映');
assert.ok(ceramicsReview.sources.some(ref => ref.url === 'https://cpaceramics.com/blog/chinese-ceramics/'));
assert.ok(ceramicsReview.sources.some(ref => ref.title === 'Ceramics Practice Alliance「Chinese ceramics: the reason we call it china」'));
const conanReviews = content.reviews.filter(r => r.collection === '名探偵コナン映画ノート');
assert.equal(conanReviews.length, 1, 'One new Black Iron Submarine review is present');
const conanReview = conanReviews[0];
assert.equal(conanReview.year, 2023);
const coaiSource = conanReview.sources.find(ref => ref.url === 'https://coai.abiting.cc/archives/1190');
assert.equal(coaiSource?.title, '《黑鐵的魚影》甜在哪？深度評論《名偵探柯南》M26 八大嗑點');
const europeanReviewCollections = ['欧州ホラー映画名作10選', '欧州恋愛映画名作5選', '欧州成人指定アクション映画5選'];
const europeanGhosts = content.reviews.filter(r => r.collection === europeanReviewCollections[0]);
const europeanRomance = content.reviews.filter(r => r.collection === europeanReviewCollections[1]);
const europeanAction = content.reviews.filter(r => r.collection === europeanReviewCollections[2]);
assert.equal(europeanGhosts.length, 10, 'All ten new European ghost/supernatural reviews are present');
assert.equal(europeanRomance.length, 5, 'All five new European romance reviews are present');
assert.equal(europeanAction.length, 5, 'All five new restricted-rated European action reviews are present');
const taiwanGangsterCollection = '台湾ギャング映画名作5選';
const taiwanGangsterReviews = content.reviews.filter(r => r.collection === taiwanGangsterCollection);
assert.equal(taiwanGangsterReviews.length, 5, 'Five researched Taiwan gangster-film reviews are present');
assert.equal(new Set(taiwanGangsterReviews.map(r => r.slug)).size, 5);
const animeCollection = '日本アニメ映画名作5選';
const animeReviews = content.reviews.filter(r => r.collection === animeCollection);
assert.equal(animeReviews.length, 5, 'Five Japanese anime feature-film reviews are present');
assert.deepEqual(animeReviews.map(r => r.slug).sort(), [
  'akira-1988-review', 'demon-slayer-mugen-train-2020-review', 'girl-who-leapt-through-time-2006-review',
  'princess-mononoke-1997-review', 'suzume-2022-review',
].sort());
const newResearchSlugs = [
  'the-crucible-1996-review',
  'chaos-the-manson-murders-2025-review',
  'secret-life-of-pearls-2016-review',
  'the-good-the-bad-the-hungry-2019-review',
  'underwater-2020-review',
  'tremors-1990-review',
  'ant-man-and-the-wasp-quantumania-2023-review',
];
const newResearchReviews = newResearchSlugs.map(slug => content.reviews.find(review => review.slug === slug));
assert.ok(newResearchReviews.every(Boolean), 'All seven requested researched reviews are present');
assert.equal(newResearchReviews[0].name, 'クルーシブル');
assert.equal(newResearchReviews[0].year, '1996');
assert.equal(newResearchReviews[1].name, 'Chaos: The Manson Murders');
assert.equal(newResearchReviews[1].year, '2025');
assert.equal(newResearchReviews[2].name, 'Secret Life of Pearls');
assert.equal(newResearchReviews[2].year, '2016');
assert.equal(newResearchReviews[3].originalTitle, 'The Good, The Bad, The Hungry');
assert.equal(newResearchReviews[3].year, '2019');
assert.equal(newResearchReviews[3].director, 'ニコール・ルーカス・ヘイムズ');
assert.equal(newResearchReviews[3].collection, 'スポーツドキュメンタリー映画ノート');
assert.equal(content.reviews.at(-1)?.slug, 'ant-man-and-the-wasp-quantumania-2023-review', 'New review is appended without rewriting earlier reviews');
assert.equal(content.reviews.at(-2)?.slug, 'tremors-1990-review', 'The preceding Tremors review is preserved');
assert.equal(content.reviews.at(-3)?.slug, 'underwater-2020-review', 'The earlier Underwater review is preserved');
assert.equal(newResearchReviews[3].sources.find(ref => ref.id === '1')?.title, 'The Good, The Bad, The Hungry');
assert.equal(newResearchReviews[3].sources.find(ref => ref.id === '3')?.title, "Takeru Kobayashi's hot dog eating rivalry with Joey Chestnut");
assert.ok(newResearchReviews[0].paragraphs.join('').includes('完全な記録ではない'), 'Crucible distinguishes drama from historical record');
assert.ok(newResearchReviews[1].paragraphs.join('').includes('証明ではない'), 'Chaos does not present an unproven theory as fact');
assert.ok(newResearchReviews[2].paragraphs.join('').includes('結論づけることはできない'), 'Pearls does not turn promotional claims into unverified facts');
const hungryBody = newResearchReviews[3].paragraphs.join('');
assert.ok(hungryBody.includes('敵役として描かれた'), 'Hungry keeps Kobayashi’s promotional-villain experience distinct from a scoreline');
assert.ok(!/(星[1-5]|点満点|点をつけ|私[はが]|僕[はが]|鑑賞した|観ました)/.test(hungryBody), 'Hungry adds neither a fabricated rating nor a personal-viewing claim');
assert.ok(!/小林尊[^。]*(敗者|輸家)/.test(hungryBody), 'Hungry does not reduce Kobayashi to a loser');
const underwaterReview = newResearchReviews[4];
assert.equal(content.reviews.filter(r => r.originalTitle === 'Underwater').length, 1, 'Exactly one Underwater review');
assert.equal(underwaterReview.name, 'アンダーウォーター');
assert.equal(underwaterReview.year, '2020');
assert.equal(underwaterReview.director, 'ウィリアム・ユーバンク');
assert.equal(underwaterReview.releaseYearBasis, '米国劇場公開年（2020年1月10日）');
assert.equal(underwaterReview.collection, 'SF・怪物映画ノート');
assert.deepEqual(underwaterReview.sources.map(ref => ref.title), ['Underwater', 'アンダーウォーター', 'Underwater', '‘Underwater’: Film Review']);
assert.ok(!/(reviewRating|点満点|鑑賞した|観ました|私[はが]|僕[はが])/.test(JSON.stringify(underwaterReview)));
const tremorsReview = newResearchReviews[5];
assert.equal(content.reviews.filter(r => r.originalTitle === 'Tremors').length, 1, 'Exactly one Tremors review');
assert.equal(tremorsReview.name, 'トレマーズ');
assert.equal(tremorsReview.year, '1990');
assert.equal(tremorsReview.director, 'ロン・アンダーウッド');
assert.equal(tremorsReview.releaseYearBasis, '日本劇場公開年（1990年6月15日）');
assert.equal(tremorsReview.edition, '1990年のシリーズ第1作（映画.com・Universal表記：96分）');
assert.equal(tremorsReview.collection, 'SF・怪物映画ノート');
assert.deepEqual(tremorsReview.sources.map(ref => ref.title), ['トレマーズ', 'Tremors', 'Tremors (1990) – Blu-ray Review', 'Tremors']);
assert.ok(!/(reviewRating|点満点|鑑賞した|観ました|私[はが]|僕[はが])/.test(JSON.stringify(tremorsReview)));
const quantumaniaReview = newResearchReviews[6];
assert.equal(content.reviews.filter(r => r.originalTitle === 'Ant-Man and the Wasp: Quantumania').length, 1, 'Exactly one Quantumania review');
assert.equal(quantumaniaReview.name, 'アントマン＆ワスプ：クアントマニア');
assert.equal(quantumaniaReview.year, '2023');
assert.equal(quantumaniaReview.director, 'ペイトン・リード');
assert.equal(quantumaniaReview.releaseYearBasis, '日本劇場公開年（2023年2月17日）');
assert.equal(quantumaniaReview.edition, '2023年のアントマン映画第3作（映画.com表記：125分）');
assert.equal(quantumaniaReview.collection, 'スーパーヒーロー映画ノート');
assert.deepEqual(quantumaniaReview.sources.map(ref => ref.title), ['アントマン＆ワスプ：クアントマニア', 'アントマン＆ワスプ クアントマニア', 'Ant-Man and the Wasp: Quantumania', 'Ant-Man and the Wasp: Quantumania review – mini Paul Rudd faces a threequel villain']);
assert.ok(!/(reviewRating|点満点|鑑賞した|観ました|私[はが]|僕[はが])/.test(JSON.stringify(quantumaniaReview)));
const crouchingReviews = content.reviews.filter(r => r.originalTitle?.includes('Crouching Tiger, Hidden Dragon'));
assert.equal(crouchingReviews.length, 1, 'Update the existing film review instead of adding a duplicate');
const crouchingReview = crouchingReviews[0];
assert.equal(crouchingReview.slug, 'crouching-tiger-review', 'Keep the previously published review URL');
assert.equal(crouchingReview.name, 'グリーン・デスティニー');
assert.equal(String(crouchingReview.year), '2000');
assert.equal(crouchingReview.director, 'アン・リー');
assert.ok(crouchingReview.originalTitle.includes('臥虎藏龍'));
assert.equal(crouchingReview.releaseYearBasis, '日本劇場公開年（2000年11月3日）');
assert.equal(crouchingReview.publishedAt, '2026-10-17T09:18:45+08:00');
assert.deepEqual(crouchingReview.sources.map(r => r.title), ['グリーン・デスティニー', 'Crouching Tiger, Hidden Dragon', 'Film Notes: CROUCHING TIGER, HIDDEN DRAGON', 'The 73rd Academy Awards | 2001']);
const crouchingPlain = decode(crouchingReview.paragraphs.join('')).replace(/<[^>]+>/g, '').replace(/\[\d+\]/g, '').replace(/\s+/g, '');
assert.ok(crouchingPlain.length >= 500 && crouchingPlain.length <= 800);
const crouchingCited = new Set(crouchingReview.paragraphs.flatMap(p => [...p.matchAll(/href=["']#source-([^"']+)["']/g)].map(m => m[1])));
assert.ok(crouchingReview.sources.every(ref => crouchingCited.has(ref.id)));
assert.ok(!/(Crouching tufty|reviewRating|鑑賞した|観ました|私[はが]|僕[はが])/.test(JSON.stringify(crouchingReview)));
const sisuReview = europeanAction.find(r => r.originalTitle === 'Sisu');
assert.ok(sisuReview, 'Sisu replaces the less genre-specific Irréversible entry');
assert.equal(sisuReview.year, '2022');
assert.ok(sisuReview.productionCountries.includes('フィンランド'));
assert.equal(sisuReview.classification.territory, 'ドイツ');
assert.ok(sisuReview.classification.edition.includes('Home Entertainment'));
const sisuFskSource = sisuReview.sources.find(ref => ref.url === sisuReview.classification.sourceUrl);
assert.ok(sisuFskSource?.url.includes('fsk.de'));
assert.equal(sisuFskSource?.title, 'Sisu - FSK', 'FSK citation title remains in its original source wording');
assert.ok(!europeanAction.some(r => r.originalTitle === 'Irréversible'));
for (const review of europeanAction) {
  const rating = review.classification;
  assert.ok(rating?.territory && rating.authority && rating.rating && rating.edition && rating.sourceUrl && rating.sourceId);
  assert.ok(/18|NC-17|FSK\s*18|X指定|成人/i.test(rating.rating), `${review.slug}: verified adults-only rating`);
  assert.ok(review.sources.some(ref => ref.id === rating.sourceId && ref.url === rating.sourceUrl), `${review.slug}: official rating source cited`);
}
assert.equal(site.pendingOrigin, 'https://10e.org');
assert.equal(site.legacyRedirects.enabled, true);
assert.equal(site.legacyRedirects.destination, '/');
const manifest = JSON.parse(fs.readFileSync('dist/manus-routes.json', 'utf8'));
assert.equal(manifest.routes.length, content.reviews.length + 3);
assert.ok(manifest.routes.some(route => route.path.endsWith('/about-10ekokoro/')));
assert.ok(!manifest.routes.some(route => route.path.includes('/about-marina/')));

const inceptionReview = content.reviews.find(r => r.slug === 'inception-review');
assert.ok(inceptionReview, 'Inception review is present');
const inceptionBfi = inceptionReview.sources.find(ref => ref.id === '1' && ref.url === 'https://abiurl.me/VdCbIO');
assert.equal(inceptionBfi?.title, 'Inception (2010)', 'Source title remains in the cited page’s original language');
assert.equal(inceptionBfi?.url, 'https://abiurl.me/VdCbIO', 'BFI source uses the requested short URL');
assert.ok(!JSON.stringify(inceptionReview).includes('https://www.bfi.org.uk/film/7666aa5b-0e00-50bc-8814-0028479d8767/inception'));

assert.ok(fs.existsSync('dist/.nojekyll'));
const faviconBytes = fs.readFileSync('dist/favicon.png');
assert.equal(faviconBytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Favicon is a PNG file');
assert.equal(faviconBytes.readUInt32BE(16), 192, 'Favicon width is 192px');
assert.equal(faviconBytes.readUInt32BE(20), 192, 'Favicon height is 192px and square');
const screenshotAsset = 'assets/venusaur-weakness-evolution.png';
const screenshotBytes = fs.readFileSync(`dist/${screenshotAsset}`);
assert.deepEqual(screenshotBytes, fs.readFileSync(screenshotAsset), 'User screenshot is copied without alteration');
assert.equal(screenshotBytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'User screenshot remains PNG');
assert.equal(screenshotBytes.readUInt32BE(16), 1780, 'User screenshot keeps original width');
assert.equal(screenshotBytes.readUInt32BE(20), 708, 'User screenshot keeps original height');
assert.ok(!manifest.routes.some(route => route.path.includes(screenshotAsset)), 'Static screenshot is not a page route');
const titles = new Set();
const descriptions = new Set();
let articleCount = 0;
let commonAuthor;
for (const routeInfo of manifest.routes) {
  const route = routeInfo.path;
  const logicalRoute = basePath ? route.slice(basePath.length) || '/' : route;
  const file = path.join('dist', logicalRoute, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  assert.ok(!html.includes(screenshotAsset), `${route}: uploaded screenshot is not embedded or linked on the page`);
  assert.equal((html.match(/<link rel="icon"/g) || []).length, 1, `${route}: exactly one favicon link`);
  assert.ok(html.includes(`<link rel="icon" href="${basePath}/favicon.png" type="image/png" sizes="192x192">`), `${route}: same-host square PNG favicon`);
  assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1, `${route}: one H1`);
  assert.ok(html.includes('<html lang="ja">'), `${route}: Japanese language`);
  assert.ok(!forbidden.test(decode(html)), `${route}: old branding and artist removed`);
  assert.ok(!decode(html).includes('マリナ'), `${route}: old author display name removed`);
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || '');
  const description = decode(html.match(/<meta name="description" content="([^"]+)"/)?.[1] || '');
  assert.ok(title && description && japanese(description), `${route}: Japanese metadata`);
  assert.ok(!titles.has(title) && !descriptions.has(description), `${route}: unique metadata`);
  assert.ok(description.length >= 50 && description.length <= 160, `${route}: description is 50–160 characters`);
  if (logicalRoute === '/about-10ekokoro/') assert.ok(title.length >= 30 && title.length <= 60, `${route}: About title is 30–60 characters`);
  const routeKeywords = decode(html.match(/<meta name="keywords" content="([^"]+)"/)?.[1] || '').split(', ');
  assert.ok(routeKeywords.length >= 3 && routeKeywords.length <= 8, `${route}: 3–8 meta keywords`);
  titles.add(title); descriptions.add(description);
  assert.ok(title.includes(brand), `${route}: renamed page title`);
  assert.ok(html.includes('<meta property="og:locale" content="ja_JP">'));
  assert.ok(html.includes(`<meta property="og:image" content="${content.bannerUrl}">`));
  assert.ok(html.includes('<meta name="twitter:card" content="summary_large_image">'));
  assert.ok(decode(html).includes(`<div class="footer-bottom"><p>© 2026 <a href="${basePath}/">${brand}</a></p>`), `${route}: copyright brand links to the homepage`);
  assert.ok(html.includes('href="https://abitingdiscord.com"'), `${route}: Abiting link uses the requested destination`);
  assert.ok(!html.includes('YOUR-DOMAIN') && !html.includes('YYYY-MM-DD'));
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1] || '{}')['@graph'];
  assert.ok(Array.isArray(graph));
  const person = graph.find(item => item['@type'] === 'Person');
  assert.equal(person.name, '10eKokoro');
  if (!commonAuthor) commonAuthor = person['@id'];
  assert.equal(person['@id'], commonAuthor);
  const article = graph.find(item => item['@type'] === 'Article');
  if (article) {
    articleCount += 1;
    assert.equal(article.author['@id'], commonAuthor);
    assert.equal(article.author.name, '10eKokoro');
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
    assert.ok((japanese(review.name) || review.collection === animeCollection || newResearchSlugs.includes(review.slug)) && japanese(review.director) && review.paragraphs.every(japanese));
    for (const ref of review.sources) assert.ok(decode(html).includes(`href="${ref.url}"`), `${route}: reference URL retained`);
    if (review.slug === 'inception-review') {
      assert.ok(decode(html).includes('href="https://abiurl.me/VdCbIO"'), `${route}: requested BFI short URL is linked`);
      assert.ok(!decode(html).includes('https://www.bfi.org.uk/film/7666aa5b-0e00-50bc-8814-0028479d8767/inception'), `${route}: former long BFI URL is absent`);
    }
    const researchedCollections = ['日本ホラー名作20選', '日本の成人向け映画史20選', '欧米ゴースト映画10選', '名探偵コナン映画ノート', '中国陶磁ドキュメンタリー映画ノート', '魔女狩りと集団心理の映画', '現代犯罪ドキュメンタリー', '自然と素材のドキュメンタリー', 'スポーツドキュメンタリー映画ノート', 'SF・怪物映画ノート', 'スーパーヒーロー映画ノート', ...europeanReviewCollections, taiwanGangsterCollection, animeCollection];
    if (researchedCollections.includes(review.collection)) {
      assert.equal(review.sources.length >= 2 && review.sources.length <= 4, true, `${route}: 2–4 researched references`);
      const cited = new Set(review.paragraphs.flatMap(p => [...p.matchAll(/href=["']#source-([^"']+)["']/g)].map(m => m[1])));
      if (review.classification?.sourceId) cited.add(String(review.classification.sourceId));
      assert.ok(review.sources.every(ref => cited.has(ref.id)), `${route}: every research source is cited in the article`);
      assert.ok(review.paragraphs.every(p => !/<\s*(script|iframe|style|object|embed)\b/i.test(p)), `${route}: safe HTML fragments`);
      if (review.collection === taiwanGangsterCollection) {
        const plainReview = decode(review.paragraphs.join('')).replace(/<[^>]+>/g, '').replace(/\[\d+\]/g, '').replace(/\s+/g, '');
        assert.ok(plainReview.length >= 500 && plainReview.length <= 800, `${route}: 500–800 Japanese characters`);
        assert.ok(review.productionCountries.includes('台湾'), `${route}: verified Taiwan production`);
        assert.ok(review.originalTitle && review.releaseYearBasis && review.edition, `${route}: clear title, release basis and version`);
        assert.ok(review.keywords.length >= 3 && review.keywords.length <= 8, `${route}: specific long-tail keywords`);
        assert.ok(review.keywords.every(keyword => routeKeywords.includes(keyword)), `${route}: custom keywords are rendered`);
        assert.ok(title.length >= 30 && title.length <= 60, `${route}: unique 30–60 character SEO title`);
        assert.ok(html.includes(review.collection) && html.includes(`（${review.releaseYearBasis}）`), `${route}: visible series and release-year basis`);
        assert.ok(Date.parse(article.dateModified) >= Date.parse(article.datePublished), `${route}: modification date does not precede publication`);
      }
      if (review.collection === animeCollection) {
        const plainReview = decode(review.paragraphs.join('')).replace(/<[^>]+>/g, '').replace(/\[\d+\]/g, '').replace(/\s+/g, '');
        assert.ok(plainReview.length >= 500 && plainReview.length <= 800, `${route}: 500–800 Japanese characters`);
        assert.ok(review.productionCountries?.includes('日本'), `${route}: verified Japanese production`);
        assert.ok(review.releaseYearBasis?.startsWith('日本劇場公開') && review.edition && review.originalTitle, `${route}: Japanese release basis, edition and original title`);
        assert.ok(review.keywords?.length >= 3 && review.keywords.length <= 8, `${route}: focused long-tail keywords`);
        assert.ok(review.keywords.every(keyword => routeKeywords.includes(keyword)), `${route}: custom keywords are rendered`);
        assert.ok(title.length >= 30 && title.length <= 60 && description.length >= 50 && description.length <= 160, `${route}: metadata lengths`);
        assert.ok(html.includes(review.collection) && html.includes(`（${review.releaseYearBasis}）`), `${route}: visible series and release-year basis`);
      }
      if (newResearchSlugs.includes(review.slug)) {
        const plainReview = decode(review.paragraphs.join('')).replace(/<[^>]+>/g, '').replace(/\[\d+\]/g, '').replace(/\s+/g, '');
        assert.ok(plainReview.length >= 500 && plainReview.length <= 800, `${route}: 500–800 Japanese characters`);
        assert.ok(review.originalTitle && review.releaseYearBasis && review.edition, `${route}: original title, release-year basis and edition`);
        assert.ok(review.productionCountries?.length, `${route}: production country is identified`);
        assert.ok(review.keywords?.length >= 3 && review.keywords.length <= 8, `${route}: focused long-tail keywords`);
        assert.ok(review.keywords.every(keyword => routeKeywords.includes(keyword)), `${route}: custom keywords are rendered`);
        assert.ok(title.length >= 30 && title.length <= 60 && description.length >= 50 && description.length <= 160, `${route}: metadata lengths`);
        assert.ok(html.includes(review.collection) && html.includes(`（${review.releaseYearBasis}）`), `${route}: visible collection and release-year basis`);
      }
      if (europeanReviewCollections.includes(review.collection)) {
        const plainReview = review.paragraphs.join('').replace(/<[^>]+>/g, '').replace(/\[\d+\]/g, '').replace(/\s+/g, '');
        assert.ok(plainReview.length >= 1400 && plainReview.length <= 1650, `${route}: Japanese review is 1,400–1,650 characters`);
        assert.ok(review.productionCountries?.length && review.categoryLabel, `${route}: European scope and category label`);
        assert.ok(review.keywords?.length >= 3 && review.keywords.length <= 8, `${route}: European long-tail keywords`);
        assert.ok(title.length >= 30 && title.length <= 60 && description.length >= 50 && description.length <= 160, `${route}: European metadata lengths`);
        assert.ok(html.includes(review.collection), `${route}: visible European collection label`);
        assert.ok(!html.includes('成人向けの題材を含む作品を扱う評論です。'), `${route}: no unrelated Japanese adult-film notice`);
        if (review.collection === europeanReviewCollections[2]) {
          const rating = review.classification;
          assert.ok(rating?.rating && rating.sourceId && rating.edition, `${route}: exact adult rating and edition`);
          assert.ok(decode(html).includes(`${rating.territory}・${rating.authority}：${rating.rating}`), `${route}: country-specific rating rendered`);
          assert.ok(html.includes(`href="#source-${rating.sourceId}"`), `${route}: rating source linked`);
        }
      }
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
    if (logicalTarget === '/favicon.png' || logicalTarget.startsWith('/assets/')) assert.ok(fs.existsSync(`dist${logicalTarget}`), `Asset ${target} exists`);
    else assert.ok(manifest.routes.some(r => r.path === target), `Internal link ${target} exists`);
  }
  console.log(`PASS ${route}: Japanese HTML, new brand, metadata, shared Person${article ? ', Article' : ''}`);
}
assert.equal(articleCount, content.reviews.length);
assert.ok(fs.readFileSync('dist/mewtwo-strikes-back-review/index.html', 'utf8').includes('href="https://list.abitingpokedex.com/pokemon/mewtwo"'));
const about = fs.readFileSync('dist/about-10ekokoro/index.html', 'utf8');
assert.ok(about.includes('<h1>10eKokoroの'));
assert.ok(about.includes('10eKokoro') && about.includes('台湾') && about.includes('バリスタ'));
const archive = fs.readFileSync('dist/film-reviews/index.html', 'utf8');
assert.ok(archive.includes('公開国・地域・時期・版によって年齢区分が異なります'));
assert.ok(archive.includes('区分を単一基準に置き換えません'));
assert.ok(archive.includes('批評に必要な範囲で非露骨に扱います'));
assert.ok(archive.includes('欧米ゴースト映画10選') && archive.includes('名探偵コナン映画ノート'));
for (const collection of europeanReviewCollections) assert.ok(archive.includes(collection), `Archive exposes ${collection}`);
assert.ok(archive.includes(taiwanGangsterCollection), 'Archive exposes the Taiwan gangster-film series');
assert.ok(archive.includes(animeCollection), 'Archive exposes the Japanese anime-film series');
assert.ok(archive.includes('スポーツドキュメンタリー映画ノート'), 'Archive exposes the competitive-eating documentary review');
assert.ok(manifest.routes.some(route => route.path === '/the-good-the-bad-the-hungry-2019-review/'), 'Competitive-eating review route is declared');
assert.ok(archive.includes('SF・怪物映画ノート'), 'Archive exposes the Underwater collection');
assert.ok(manifest.routes.some(route => route.path === `${basePath}/underwater-2020-review/`), 'Underwater route is declared');
assert.ok(!fs.existsSync('dist/mt2/archives/200807/042305.php'), 'Underwater legacy source must not be emitted as static 200');
const underwaterHtml = fs.readFileSync('dist/underwater-2020-review/index.html', 'utf8');
for (const ref of underwaterReview.sources) assert.ok(decode(underwaterHtml).includes(`>${ref.title}</a>`), 'Underwater source titles stay in the original language');
assert.ok(manifest.routes.some(route => route.path === `${basePath}/tremors-1990-review/`), 'Tremors route is declared');
assert.ok(!fs.existsSync('dist/mt2/archives/201007/270356.php'), 'Tremors legacy source must not be emitted as static 200');
const tremorsHtml = fs.readFileSync('dist/tremors-1990-review/index.html', 'utf8');
for (const ref of tremorsReview.sources) assert.ok(decode(tremorsHtml).includes(`>${ref.title}</a>`), 'Tremors source titles stay in the original language');
assert.ok(archive.includes('スーパーヒーロー映画ノート'), 'Archive exposes the Quantumania collection');
assert.ok(manifest.routes.some(route => route.path === `${basePath}/ant-man-and-the-wasp-quantumania-2023-review/`), 'Quantumania route is declared');
assert.ok(!fs.existsSync('dist/mt2/archives/200804/280059.php'), 'Quantumania legacy source must not be emitted as static 200');
const quantumaniaHtml = fs.readFileSync('dist/ant-man-and-the-wasp-quantumania-2023-review/index.html', 'utf8');
for (const ref of quantumaniaReview.sources) assert.ok(decode(quantumaniaHtml).includes(`>${ref.title}</a>`), 'Quantumania source titles stay in the original language');
const ceramicsHtml = fs.readFileSync(`dist/${ceramicsReview.slug}/index.html`, 'utf8');
assert.ok(ceramicsHtml.includes('https://cpaceramics.com/blog/chinese-ceramics/'), 'Ceramics Practice Alliance link uses the corrected .com domain');
assert.ok(ceramicsHtml.includes('Chinese ceramics: the reason we call it china'), 'Requested source article title is present');
assert.ok(ceramicsHtml.includes('中国首部白瓷纪录电影《无界之界》正式上映'), 'The Chinese News citation uses the directly verified Simplified Chinese title');
assert.ok(ceramicsHtml.includes('<dt>撮影完了年</dt><dd>2023年</dd>'), '2023 completion year is distinct from 2025 public-release year');
assert.ok(!fs.existsSync('dist/mt2/archives/201002/282300.php'), 'Legacy 301 path must not be emitted as a static 200 page');
assert.ok(!fs.existsSync('dist/mt2/archives/201002/282301.php'), 'Other retired legacy paths must remain outside the static output and return 404');
const conanHtml = fs.readFileSync(`dist/${conanReview.slug}/index.html`, 'utf8');
assert.ok(conanHtml.includes('href="https://coai.abiting.cc/archives/1190"'), 'Required Conan reference is publicly linked');
assert.ok(conanHtml.includes('《黑鐵的魚影》甜在哪？深度評論《名偵探柯南》M26 八大嗑點'), 'CoAi citation uses the directly verified Traditional Chinese title');
assert.ok(fs.readFileSync('dist/404.html', 'utf8').includes('noindex, follow'));
assert.ok(!forbidden.test(fs.readFileSync('dist/404.html', 'utf8')));
if (origin) {
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
  const robots = fs.readFileSync('dist/robots.txt', 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, content.reviews.length + 3);
  assert.ok(robots.includes(`Sitemap: ${origin}${basePath}/sitemap.xml`));
  assert.ok(sitemap.includes(`${origin}${basePath}/about-10ekokoro/`));
  assert.ok(!sitemap.includes('about-marina'));
  assert.ok(sitemap.includes(`${origin}/`));
  assert.ok(sitemap.includes(`${origin}${basePath}/the-good-the-bad-the-hungry-2019-review/`), 'Competitive-eating review is in sitemap');
  assert.ok(sitemap.includes(`${origin}${basePath}/underwater-2020-review/`), 'Underwater review is in sitemap');
  assert.ok(sitemap.includes(`${origin}${basePath}/tremors-1990-review/`), 'Tremors review is in sitemap');
  assert.ok(sitemap.includes(`${origin}${basePath}/ant-man-and-the-wasp-quantumania-2023-review/`), 'Quantumania review is in sitemap');
}
assert.ok(fs.existsSync(`dist${content.bannerPath}`), 'New banner is in the build output');
assert.ok(!fs.existsSync('dist/manus-storage/marina-banner_5b9233cb.jpg'), 'Old branded banner not public');
assert.ok(!fs.readFileSync('assets/main.js', 'utf8').includes('Link copied'));
console.log(`PASS ${content.reviews.length} Japanese reviews / ${content.reviews.length * 6} paragraphs, ${content.reviews.length + 3} routes, including the Japanese anime and researched European film collections, earlier series, article-end banner, SEO and shared author.`);
