// Playwright helpers: open the page with window.pywebview.api bridged to run_app.py
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
async function openApp(opts = {}) {
  const apiPort = opts.apiPort || 18999;
  const info = await (await fetch(`http://127.0.0.1:${apiPort}/`)).json();
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext(Object.assign({ viewport: opts.viewport || { width: 1440, height: 900 }, acceptDownloads: true }, opts.ua ? { userAgent: opts.ua, hasTouch: true, deviceScaleFactor: opts.dpr || 1.5 } : {}));
  await context.addInitScript(({ names, apiPort }) => {
    const api = {};
    for (const n of names) api[n] = (...args) => fetch(`http://127.0.0.1:${apiPort}/call/${n}`, { method: 'POST', body: JSON.stringify(args) })
      .then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
    window.pywebview = { api };
    window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50));
  }, { names: info.names, apiPort });
  const page = await context.newPage();
  const logs = [];
  page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));
  await page.goto(`http://127.0.0.1:${info.port}/ingenium.html?b=test`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  return { browser, context, page, logs, info };
}
module.exports = { openApp };
