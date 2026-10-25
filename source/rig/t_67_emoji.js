// Ingenium 6.7.1 · the side keys on Windows 10 (modules/r182.js, part p103), in Chromium with the browser's own report of
// the system set as Windows reports it (navigator.userAgentData: Windows 10 says platformVersion 10.0.0 or lower, Windows 11
// 13.0.0 or higher). Checks: on Windows 10 each of the six side keys shows Microsoft's flat drawing of its emoji (an image
// that says nothing, the key keeping its own name), the moon becomes the sun with the theme and back, and the pictures stay
// when the page writes the glyph again; on Windows 11, on a Mac and with no report at all, the keys keep the system's own
// emoji; no page errors.
//   node rig/t_67_emoji.js <url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 600) : '')); c ? pass++ : fail++; };
const WIN_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0';
const MAC_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
const KEYS = ['fabNote', 'fabTimer', 'fabTheme', 'fabPark', 'fabQuiet', 'fabBell'];

async function open(b, ua, platform, platformVersion) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message));
  const cdp = await ctx.newCDPSession(p);
  const o = { userAgent: ua };
  if (platform) o.userAgentMetadata = { platform, platformVersion, architecture: 'x86', model: '', mobile: false, brands: [{ brand: 'Microsoft Edge', version: '141' }] };
  await cdp.send('Emulation.setUserAgentOverride', o);
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(1500);
  return { ctx, p };
}
const look = p => p.evaluate(keys => ({ on: document.documentElement.classList.contains('ing-emoji-pics'), part: (window.__ingParts || {}).p103,
  keys: keys.map(id => { const k = document.getElementById(id); if (!k) return { id, missing: true };
    const im = k.querySelector('img.r182-emo'); const r = im && { width: im.offsetWidth, height: im.offsetHeight }, sp = im && im.parentElement;
    return { id, img: !!im, alt: im ? im.getAttribute('alt') : null, src: im ? im.src.slice(0, 26) : '', w: r ? Math.round(r.width) : 0, h: r ? Math.round(r.height) : 0,
      font: sp ? Math.round(parseFloat(getComputedStyle(sp).fontSize)) : 0, emoji: sp ? sp.getAttribute('data-emoji') : null, label: k.getAttribute('aria-label'), text: k.textContent.replace(/\s+/g, '').slice(0, 6) }; }) }), KEYS);

(async () => {
  const b = await pw.chromium.launch();
  // Windows 10
  let { ctx, p } = await open(b, WIN_UA, 'Windows', '10.0.0');
  const w10 = await look(p);
  ok(w10.part === 'running' && w10.on, 'on Windows 10 the part runs and the side keys take their pictures', { part: w10.part, on: w10.on });
  ok(w10.keys.every(k => k.img && k.alt === '' && k.src.startsWith('data:image/svg+xml') && k.label), 'each of the six side keys shows a picture that says nothing, and keeps its own name', w10.keys);
  ok(w10.keys.every(k => k.w > 0 && Math.abs(k.w - k.font) <= 1 && Math.abs(k.h - k.font) <= 1), 'each picture is the size the glyph was (one line of its key)', w10.keys.map(k => [k.id, k.w, k.h, k.font]));
  const theme0 = w10.keys.find(k => k.id === 'fabTheme').emoji;
  await p.click('#fabTheme'); await p.waitForTimeout(700);
  const t1 = (await look(p)).keys.find(k => k.id === 'fabTheme');
  await p.click('#fabTheme'); await p.waitForTimeout(700);
  const t2 = (await look(p)).keys.find(k => k.id === 'fabTheme');
  ok(t1.img && t2.img && t1.emoji !== theme0 && t2.emoji === theme0 && ['🌙', '☀'].includes(t1.emoji), 'Day or night: the moon becomes the sun and back, each drawn', { before: theme0, after: t1.emoji, again: t2.emoji });
  await p.evaluate(() => { const s = document.querySelector('#fabQuiet span'); if (s) s.textContent = '🌿'; }); await p.waitForTimeout(400);
  const again = (await look(p)).keys.find(k => k.id === 'fabQuiet');
  ok(again.img && again.text === '', 'a glyph the page writes again is drawn again', again);
  await p.screenshot({ path: path.join(OUT, 'emoji-windows10.png'), clip: { x: 1340, y: 380, width: 100, height: 520 } });
  ok(!p.__errs.length, 'Windows 10: no page errors', p.__errs.slice(0, 3));
  await ctx.close();
  // Windows 11, a Mac, and no report at all
  for (const [name, ua, plat, ver] of [['Windows 11', WIN_UA, 'Windows', '15.0.0'], ['a Mac', MAC_UA, null, null], ['Windows with no report', WIN_UA, null, null]]) {
    ({ ctx, p } = await open(b, ua, plat, ver));
    const r = await look(p);
    ok(!r.on && r.keys.every(k => !k.img), 'on ' + name + ' the side keys keep the system\'s own emoji', r.keys.map(k => [k.id, k.img, k.text]));
    ok(!p.__errs.length, name + ': no page errors', p.__errs.slice(0, 3));
    await ctx.close();
  }
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed ' + e.stack); process.exit(2); });
