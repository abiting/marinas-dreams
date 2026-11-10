import fs from 'node:fs';
import path from 'node:path';

const namespace = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const escapeXml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);

export function writeLegacySitemaps(output, origin, basePath) {
  // This is a manually refreshed, verified 10e.org migration snapshot, not the canonical sitemap.
  if (origin !== 'https://10e.org' || basePath) return;
  const snapshot = JSON.parse(fs.readFileSync('src/legacy-301-urls.json', 'utf8'));
  if (snapshot.version !== 1 || !snapshot.verifiedAt || snapshot.verifiedProtocols?.join(',') !== 'http,https') {
    throw new Error('Legacy sitemap requires a verified HTTP/HTTPS snapshot');
  }
  const paths = snapshot.entries.map(entry => entry.path);
  if (!paths.length || paths.length > 50000 || new Set(paths).size !== paths.length) {
    throw new Error('Legacy sitemap must contain 1–50,000 unique verified old paths');
  }
  for (const entry of snapshot.entries) {
    const url = new URL(`https://10e.org${entry.path}`);
    if (!entry.path.startsWith('/') || /[\s*?#\\]/.test(entry.path) || url.hostname !== '10e.org' || url.pathname !== entry.path || url.search || url.hash) {
      throw new Error(`Invalid legacy path: ${entry.path}`);
    }
    if (new URL(entry.target).protocol !== 'https:') throw new Error('Invalid legacy target');
  }
  const filenames = [];
  for (const scheme of ['http', 'https']) {
    const filename = `legacy-301-sitemap-${scheme}.xml`;
    const urls = paths.map(oldPath => `  <url><loc>${escapeXml(`${scheme}://10e.org${oldPath}`)}</loc></url>`).join('\n');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${namespace}">\n${urls}\n</urlset>\n`;
    fs.writeFileSync(path.join(output, filename), xml);
    filenames.push(filename);
  }
  const index = filenames.map(filename => `  <sitemap><loc>${escapeXml(`${origin}/${filename}`)}</loc></sitemap>`).join('\n');
  fs.writeFileSync(path.join(output, 'legacy-301-sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="${namespace}">\n${index}\n</sitemapindex>\n`);
}
