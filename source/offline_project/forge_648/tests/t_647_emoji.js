// The Forge 647 · the side menu and the side keys on Windows 10 (blocks/forge_emoji_win10.html), in Chromium with the browser's
// own report of the system set as Windows reports it (navigator.userAgentData: Windows 10 says platformVersion 10.0.0 or lower,
// Windows 11 13.0.0 or higher). Checks: on Windows 10 each room's emoji in the side menu and each side key's emoji is
// Microsoft's flat drawing of it (an image that says nothing, the button keeping its name), the size the glyph was; the moon
// becomes the sun with the theme and back, each drawn; on Windows 11, on a Mac and with no report, the system's own emoji
// stay; no page errors.
//   node tests/t_647_emoji.js <url of the Forge page> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 600) : '')); c ? pass++ : fail++; };
const WIN_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0';
const MAC_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
const SIDE = ['sticky-fab', 'cd-thought-fab', 'forge-quiet-fab', 'cd-theme-fab', 'reminders-fab', 'horo-fab'];
async function open(b, ua, platform, platformVersion) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message));
  const cdp = await ctx.newCDPSession(p); const o = { userAgent: ua };
  if (platform) o.userAgentMetadata = { platform, platformVersion, architecture: 'x86', model: '', mobile: false, brands: [{ brand: 'Microsoft Edge', version: '141' }] };
  await cdp.send('Emulation.setUserAgentOverride', o);
  await p.goto(URL_); await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(1800);
  return { ctx, p };
}
const look = p => p.evaluate(side => {
  const one = (sp, name) => { if (!sp) return { name, missing: true }; const im = sp.querySelector('img.forge-emo');
    return { name, img: !!im, alt: im ? im.getAttribute('alt') : null, src: im ? im.src.slice(0, 26) : '', nw: im ? im.naturalWidth : 0, w: im ? im.offsetWidth : 0, font: Math.round(parseFloat(getComputedStyle(sp).fontSize)), emoji: sp.getAttribute('data-emoji'), text: sp.textContent.trim() }; };
  const nav = [...document.querySelectorAll('.nav-btn')].filter(b => b.offsetParent).map(b => Object.assign(one(b.querySelector('.rg'), (b.querySelector('.rw') || {}).textContent), { label: b.getAttribute('title') || b.textContent.trim() }));
  const keys = side.map(id => { const k = document.getElementById(id); if (!k) return { name: id, missing: true }; const sp = k.querySelector('.cd-thought-glyph,.forge-quiet-glyph,.rem-fab-bell') || k.querySelector(':scope>span'); return Object.assign(one(sp, id), { label: k.getAttribute('aria-label') || k.title || '' }); });
  return { on: document.documentElement.classList.contains('forge-emoji-pics'), nav, keys };
}, SIDE);
(async () => {
  const b = await pw.chromium.launch();
  let { ctx, p } = await open(b, WIN_UA, 'Windows', '10.0.0');
  const w = await look(p);
  const navWith = w.nav.filter(x => !x.missing);
  ok(w.on && navWith.length >= 10 && navWith.every(x => x.img && x.alt === '' && x.src.startsWith('data:image/svg+xml') && x.label), 'on Windows 10 every room in the side menu shows a flat drawing that says nothing, and keeps its name', w.nav.map(x => [x.name, x.img]));
  ok(w.keys.every(k => !k.missing && k.img && k.alt === '' && k.label), 'on Windows 10 each of the six side keys shows a flat drawing that says nothing, and keeps its name', w.keys.map(k => [k.name, k.img, k.label]));
  ok(navWith.concat(w.keys).every(x => x.nw > 0 && x.w > 0 && Math.abs(x.w - x.font) <= 1), 'each drawing is drawn (a picture the browser can read) and is the size its glyph was', navWith.concat(w.keys).map(x => [x.name, x.nw, x.w, x.font]));
  const th0 = w.keys.find(k => k.name === 'cd-theme-fab').emoji;
  await p.click('#cd-theme-fab'); await p.waitForTimeout(900); const t1 = (await look(p)).keys.find(k => k.name === 'cd-theme-fab');
  await p.click('#cd-theme-fab'); await p.waitForTimeout(900); const t2 = (await look(p)).keys.find(k => k.name === 'cd-theme-fab');
  ok(t1.img && t2.img && t1.emoji !== th0 && t2.emoji === th0, 'Day or night: the moon becomes the sun and back, each drawn', { th0, t1: t1.emoji, t2: t2.emoji });
  await p.screenshot({ path: path.join(OUT, 'forge-windows10.png') });
  ok(!p.__errs.length, 'Windows 10: no page errors', p.__errs.slice(0, 3)); await ctx.close();
  for (const [name, ua, plat, ver] of [['Windows 11', WIN_UA, 'Windows', '15.0.0'], ['a Mac', MAC_UA, null, null], ['Windows with no report', WIN_UA, null, null]]) {
    ({ ctx, p } = await open(b, ua, plat, ver)); const r = await look(p);
    ok(!r.on && r.nav.concat(r.keys).every(x => !x.img), 'on ' + name + ' the side menu and side keys keep the system\'s own emoji', r.keys.map(k => [k.name, k.img]));
    ok(!p.__errs.length, name + ': no page errors', p.__errs.slice(0, 3)); await ctx.close();
  }
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed ' + e.stack); process.exit(2); });
