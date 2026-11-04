// Optional dev tool (needs Playwright + Chromium):
//   node tools/prerender.js [http://localhost:8090]
// 1) bakes the text from config.js into index.html / gallery.html (so crawlers and
//    AI engines read it without JavaScript), incl. JSON-LD; the page still renders
//    from config at runtime.  2) renders favicons.  3) renders og.jpg from the hero.
// Serve the folder first, e.g.  python3 -m http.server 8090
const path = require('path'), fs = require('fs');
const PW = process.env.PLAYWRIGHT || 'playwright';
const { chromium } = require(PW);
const root = path.join(__dirname, '..');
const BASE = process.argv[2] || 'http://localhost:8090';
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
  // ---- prerender
  for (const page of ['index.html', 'gallery.html']) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(() => { window.__PRERENDER = true; try { localStorage.removeItem('ak-theme'); } catch (e) {} });
    const p = await ctx.newPage();
    await p.route('**/gsap.min.js', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
    await p.route('**/ScrollTrigger.min.js', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
    await p.goto(`${BASE}/${page}`);
    await p.waitForFunction(() => window.__PRERENDER_DONE === true);
    let html = await p.evaluate(() => {
      document.querySelectorAll('link[rel=preload][as=image][imagesrcset*="hero-bg"]').forEach((l) => l.remove());
      document.documentElement.setAttribute('data-theme', 'dark');
      const tc = document.getElementById('themeColor'); if (tc) tc.content = '#0b0d16';
      return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    });
    fs.writeFileSync(path.join(root, page), html + '\n');
    console.log('prerendered', page, html.length);
    await ctx.close();
  }
  // ---- icons
  const svg = fs.readFileSync(path.join(root, 'favicon.svg'), 'utf8');
  const ip = await b.newPage();
  for (const [name, size, pad] of [['favicon-32.png', 32, 0], ['apple-touch-icon.png', 180, 0], ['icon-192.png', 192, 0], ['icon-512.png', 512, 0], ['icon-512-maskable.png', 512, 0.14]]) {
    await ip.setViewportSize({ width: size, height: size });
    await ip.setContent(`<html><body style="margin:0;background:${pad ? '#0b0d16' : 'transparent'}"><div style="width:${size}px;height:${size}px;display:grid;place-items:center">${svg.replace('<svg ', `<svg width="${Math.round(size * (1 - pad * 2))}" height="${Math.round(size * (1 - pad * 2))}" `)}</div></body></html>`);
    await ip.screenshot({ path: path.join(root, name), omitBackground: !pad });
  }
  console.log('icons done');
  // ---- og.jpg (dark hero, no agents)
  const ctx = await b.newContext({ viewport: { width: 1440, height: 756 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { localStorage.setItem('ak-theme', 'dark'); } catch (e) {} });
  const op = await ctx.newPage();
  await op.goto(`${BASE}/index.html`); await op.waitForTimeout(1500);
  await op.addStyleTag({ content: '#fx,.cursor,.wa-float,.build{display:none!important} .nav{background:transparent!important;border:0!important}' });
  await op.waitForTimeout(300);
  await op.screenshot({ path: '/tmp/og.png' });
  await b.close();
  console.log('og raw at /tmp/og.png (resize to 1200x630 → og.jpg)');
})();
