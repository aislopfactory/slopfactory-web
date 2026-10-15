// Usage: npm run build && npm run screenshots   (serves dist/ itself; writes ./screenshots/*.png)
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml' };
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  try { const b = await readFile(join(root, p)); res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' }); res.end(b); }
  catch { res.writeHead(404); res.end('nf'); }
}).listen(4399);

await mkdir('screenshots', { recursive: true });
const browser = await chromium.launch();
const sizes = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const pages = { home: '/{l}/', blog: '/{l}/blog/', post: '/{l}/blog/hello-from-slop-factory/' };
for (const lang of ['en', 'ko'])
  for (const [dev, viewport] of Object.entries(sizes)) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: dev === 'mobile' ? 2 : 1, isMobile: dev === 'mobile', reducedMotion: 'reduce' });
    for (const [name, path] of Object.entries(pages)) {
      const page = await ctx.newPage();
      await page.goto(`http://localhost:4399${path.replace('{l}', lang)}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow > 0) console.warn(`horizontal overflow ${overflow}px on ${lang}/${dev}/${name}`);
      await page.screenshot({ path: `screenshots/${lang}-${dev}-${name}.png`, fullPage: true });
      await page.close();
    }
    await ctx.close();
  }
await browser.close(); server.close();
