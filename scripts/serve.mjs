import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const settings = JSON.parse(fs.readFileSync(path.resolve('src/site.json'), 'utf8'));
const redirectUnknownPages = settings.legacyRedirects?.enabled === true;
const redirectDestination = settings.legacyRedirects?.destination || '/';
if (redirectDestination !== '/') throw new Error('Legacy redirects must point to the homepage');
const systemPrefixes = ['/api/', '/assets/', '/manus-storage/', '/manus-oauth/', '/__manus/', '/__system__/', '/.well-known/'];
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
};
function sendText(request, response, status, text, headers = {}) {
  response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  response.end(request.method === 'HEAD' ? '' : text);
}
const server = http.createServer((request, response) => {
  if (!['GET', 'HEAD'].includes(request.method || '')) {
    sendText(request, response, 405, 'この操作は利用できません。', { Allow: 'GET, HEAD' });
    return;
  }
  let pathname;
  let requestUrl;
  try {
    requestUrl = new URL(request.url || '/', 'http://localhost');
    pathname = decodeURIComponent(requestUrl.pathname);
    if (pathname.includes('\0') || /[\r\n]/.test(pathname)) throw new Error('Invalid path');
  } catch {
    sendText(request, response, 400, 'リクエストを読み取れませんでした。');
    return;
  }
  if (pathname === '/health') {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? '' : JSON.stringify({ status: 'ok' }));
    return;
  }
  const oldQueryKeys = ['p', 'page_id', 'attachment_id', 'cat', 'tag', 'author', 'year', 'monthnum', 'day', 'feed', 's'];
  if (redirectUnknownPages && pathname === '/' && oldQueryKeys.some(key => requestUrl.searchParams.has(key))) {
    response.writeHead(301, { Location: '/', 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(request.method === 'HEAD' ? '' : 'このページはトップページへ移動しました。');
    return;
  }
  const target = path.resolve(root, `.${pathname}`);
  if (!target.startsWith(`${root}${path.sep}`) && target !== root) {
    sendText(request, response, 403, 'この場所にはアクセスできません。');
    return;
  }
  let file = target;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  const exists = fs.existsSync(file) && fs.statSync(file).isFile();
  const systemPath = systemPrefixes.some(prefix => pathname === prefix.slice(0, -1) || pathname.startsWith(prefix)) || pathname === '/favicon.ico' || pathname === '/robots.txt' || pathname === '/sitemap.xml' || pathname === '/manus-routes.json';
  if (!exists && redirectUnknownPages && !systemPath) {
    response.writeHead(301, {
      Location: redirectDestination,
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? '' : 'このページはトップページへ移動しました。');
    return;
  }
  if (!exists) file = path.join(root, '404.html');
  response.writeHead(exists ? 200 : 404, {
    'Content-Type': types[path.extname(file)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  if (request.method === 'HEAD') response.end();
  else fs.createReadStream(file).pipe(response);
});
const port = Number(process.env.PORT || 3000);
server.listen(port, '0.0.0.0', () => console.log(`10eKokoro's Dream listening on 0.0.0.0:${port}`));
