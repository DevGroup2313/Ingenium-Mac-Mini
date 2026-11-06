// node rig/t_641_logos.js <Ingenium page url> <out dir>
// Every app's own logo, in 3D, in Fabrica (Ingenium 6.41; modules/r239.js and r112.js). Her words (6 November 2026): "I want Fabrica to
// automatically load the apps' icons and logos with the same animated popped out 3D look and effects ... When the app clearly has a logo
// icon, it should replace Ingenium's placeholder empty slot and show the app's actual 3D logo animated and active and swaying back and forth
// the same way that it does for Carpe Diem, The Forge, Ingenium, Inkwell and the Offline Project's app icons."
// Six invented apps are kept in Fabrica's store, their logos drawn here on a canvas: one names an icon file of its own, one a manifest
// whose icon is a square tile, one writes an SVG logo into its page, one names only a banner, one has only a tiny favicon, one names an
// icon on the web.
// Checks: the three with a clear logo wear it in their rows, in the seals' own layers (its edge behind, the logo, a sheen in front), with
// the cast shadow and the sway; a square tile keeps its rounded corners and a free logo its own shape; the three without one keep the
// placeholder; nothing is fetched from the web; chosen, the work panel's head shows the logo; the pointer turns it and lifts it as it
// turns the seals; minimal motion stills it (and the seals); after a reload it is there at once; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const APPS = ['Tide Clock', 'Ledger Lamp', 'Quill Notes', 'Banner Board', 'Plain Page', 'Web Icon'];
const boot = async (ctx) => { const p = await ctx.newPage(); p.__errs = []; p.__web = []; p.on('pageerror', e => p.__errs.push(e.message.slice(0, 200)));
  p.on('request', q => { if (/example\.(com|org)/.test(q.url())) p.__web.push(q.url()); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500); return p; };
// the apps and their logos, made in the page (pictures drawn on a canvas)
const MAKE = async () => {
  const png = (w, h, draw) => new Promise((res) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); c.toBlob(b => b.arrayBuffer().then(ab => res(new Uint8Array(ab))), 'image/png'); });
  const disc = await png(192, 192, (x, w) => { x.fillStyle = '#1f6f8b'; x.beginPath(); x.arc(w / 2, w / 2, w * .46, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffd66b'; x.beginPath(); x.arc(w / 2, w / 2, w * .18, 0, Math.PI * 2); x.fill(); });
  const tile = await png(512, 512, (x, w) => { x.fillStyle = '#7a3e14'; x.fillRect(0, 0, w, w); x.fillStyle = '#f5d48a'; x.fillRect(w * .3, w * .2, w * .4, w * .6); });
  const banner = await png(600, 200, (x, w, h) => { x.fillStyle = '#334'; x.fillRect(0, 0, w, h); });
  const tiny = await png(16, 16, (x) => { x.fillStyle = '#a33'; x.fillRect(0, 0, 16, 16); });
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M20 80 Q50 5 80 20 Q60 50 30 85 Z" fill="#5b3a8c"/></svg>';
  const page = (title, head) => '<!doctype html><html><head><meta charset="utf-8"><title>' + title + '</title>' + head + '</head><body><h1>' + title + '</h1></body></html>';
  const sets = [
    ['Tide Clock', [{ path: 'index.html', data: page('Tide Clock', '<link rel="icon" type="image/png" sizes="192x192" href="icons/tide-192.png">') }, { path: 'icons/tide-192.png', data: disc }]],
    ['Ledger Lamp', [{ path: 'index.html', data: page('Ledger Lamp', '<link rel="manifest" href="manifest.json">') }, { path: 'manifest.json', data: JSON.stringify({ name: 'Ledger Lamp', icons: [{ src: 'img/lamp-512.png', sizes: '512x512', type: 'image/png' }] }) }, { path: 'img/lamp-512.png', data: tile }]],
    ['Quill Notes', [{ path: 'quill.html', data: page('Quill Notes', '<link rel="icon" href="data:image/svg+xml,' + encodeURIComponent(svg) + '">') }]],
    ['Banner Board', [{ path: 'index.html', data: page('Banner Board', '<link rel="icon" href="banner.png">') }, { path: 'banner.png', data: banner }]],
    ['Plain Page', [{ path: 'index.html', data: page('Plain Page', '') }, { path: 'favicon.png', data: tiny }]],
    ['Web Icon', [{ path: 'index.html', data: page('Web Icon', '<link rel="icon" sizes="512x512" href="https://example.com/icon-512.png"><link rel="apple-touch-icon" href="//example.org/touch.png">') }]]];
  for (const [name, files] of sets) await IngRepo.fromFiles(files, { name, msg: 'First version' });
  return (await IngRepo.list()).map(r => r.name); };
const rowOf = (p, n) => p.evaluate((n) => { const b = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => (x.querySelector('.nm') || {}).textContent === n); if (!b) return { found: false };
  const ls = b.querySelector('.f-ls'), idle = ls && ls.querySelector('.f-ls-idle'), L = ls ? [...ls.querySelectorAll('img.f-ls-l')] : [];
  return { found: true, cls: ls ? ls.className : '', layers: L.map(i => (i.classList.contains('side') ? 'side' : 'l') + ':' + i.style.getPropertyValue('--z')), loaded: L.every(i => i.complete && i.naturalWidth > 0),
    cast: !!(ls && ls.querySelector('.f-ls-cast')), sway: idle ? getComputedStyle(idle).animationName : '', mark: !!(ls && ls.classList.contains('new')) }; }, n);
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await boot(ctx);
  const made = await p.evaluate(MAKE);
  ok(APPS.every(n => made.indexOf(n) >= 0), 'six invented apps are kept in Fabrica\'s store, with their files', made);
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(800);
  await p.waitForFunction(() => document.querySelectorAll('#fbRepos .f-ls.logo').length >= 3, null, { timeout: 15000 }).catch(() => {}); await p.waitForTimeout(600);
  const R = {}; for (const n of APPS) R[n] = await rowOf(p, n);
  const three = ['Tide Clock', 'Ledger Lamp', 'Quill Notes'];
  ok(three.every(n => /\blogo\b/.test(R[n].cls) && R[n].layers.join() === 'side:-0.03,l:0,l:0.035' && R[n].loaded && R[n].cast && R[n].sway === 'fbSway'),
    'each app with a clear logo wears it in the seals\' own layers (its edge behind, the logo, a sheen in front), with the cast shadow and the sway', three.map(n => [n, R[n]]));
  ok(/\btile\b/.test(R['Ledger Lamp'].cls) && !/\btile\b/.test(R['Tide Clock'].cls) && !/\btile\b/.test(R['Quill Notes'].cls), 'a square tile keeps its rounded corners; a logo on a clear ground keeps its own shape', { lamp: R['Ledger Lamp'].cls, tide: R['Tide Clock'].cls });
  ok(R['Tide Clock'].found && R['Ledger Lamp'].found && R['Quill Notes'].found, 'found by each road: an icon file the page names, a manifest\'s icon, a logo written into the page');
  ok(['Banner Board', 'Plain Page', 'Web Icon'].every(n => R[n].mark && !/\blogo\b/.test(R[n].cls)), 'a banner, a tiny favicon and an icon on the web are not taken: those keep the placeholder', ['Banner Board', 'Plain Page', 'Web Icon'].map(n => [n, R[n].cls]));
  ok(p.__web.length === 0, 'nothing is fetched from the web', p.__web);
  await p.screenshot({ path: OUT + '/your-apps.png', clip: { x: 220, y: 130, width: 520, height: 640 } });
  // chosen: the work panel's head
  await p.evaluate(() => { const b = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => (x.querySelector('.nm') || {}).textContent === 'Tide Clock'); b.click(); }); await p.waitForTimeout(1200);
  const wh = await p.evaluate(() => { const s = document.getElementById('fbWhSeal'); return { name: (document.getElementById('fbWhName') || {}).textContent, logo: !!(s && s.classList.contains('logo')), size: s ? Math.round(s.getBoundingClientRect().width) : 0 }; });
  ok(wh.name === 'Tide Clock' && wh.logo && wh.size === 34, 'chosen, the work panel\'s head shows the app\'s logo at its size', wh);
  // the pointer turns it and lifts it, as it does the seals
  const box = await p.evaluate(() => { const b = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => (x.querySelector('.nm') || {}).textContent === 'Ledger Lamp'); const r = b.querySelector('.f-ls').getBoundingClientRect(); return { x: r.left + r.width * .85, y: r.top + r.height * .3 }; });
  await p.mouse.move(box.x - 20, box.y); await p.mouse.move(box.x, box.y, { steps: 4 }); await p.waitForTimeout(300);
  const tilt = await p.evaluate(() => { const b = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => (x.querySelector('.nm') || {}).textContent === 'Ledger Lamp'); const ls = b.querySelector('.f-ls'); return { hov: ls.classList.contains('hov'), ry: ls.style.getPropertyValue('--ry') }; });
  ok(tilt.hov && /deg/.test(tilt.ry) && parseFloat(tilt.ry) !== 0, 'the pointer turns it toward itself and lifts it, as it does the seals', tilt);
  await p.mouse.move(5, 5);
  // minimal motion stills it, and the seals with it
  await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal')); await p.waitForTimeout(300);
  const still = await p.evaluate(() => [...document.querySelectorAll('#fbRepos .f-ls .f-ls-idle')].map(x => getComputedStyle(x).animationName));
  await p.evaluate(() => document.body.setAttribute('data-motion', 'calm'));
  ok(still.length >= 3 && still.every(a => a === 'none'), 'minimal motion stills it, and the seals with it', still);
  // after a reload it is there at once
  await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); go('fabrica'); });
  await p.waitForFunction(() => document.querySelectorAll('#fbRepos .f-ls.logo').length >= 3, null, { timeout: 15000 }).catch(() => {});
  const again = await p.evaluate(() => document.querySelectorAll('#fbRepos .f-ls.logo').length);
  ok(again === 3, 'after a reload the three wear their logos again', again);
  ok(p.__errs.length === 0, 'no script errors on the page', p.__errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
