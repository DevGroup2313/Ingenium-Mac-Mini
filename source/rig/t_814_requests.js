// R421 (Ingenium 8.14): her six requests of 28 November 2026, checked in the page: the Engine's Stop writing, Ingenia asking first,
// no rings behind the logos, the crest a key, Fabrica's title whole, its seal a key and its panels at their full height.
//     node rig/t_814_requests.js http://127.0.0.1:8150/ingenium.html <out>    # 17 checks
const pw = require('/opt/node-tools/node_modules/playwright');
const OUT = (process.argv[3] || '/tmp/t814') + '/'; require('fs').mkdirSync(OUT, { recursive: true });
const URL_ = process.argv[2] || 'http://127.0.0.1:8150/ingenium.html';
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.clock.install();
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(1200);
  ok(await p.evaluate(() => window.__ingParts && window.__ingParts.p421 === 'running'), 'r421 ran to its end');

  // 1. the Engine panel: Stop writing beside Unload and Load
  await p.evaluate(() => document.getElementById('enginePill').click()); await p.waitForSelector('#ingEngine .ie-keys-top');
  const idle = await p.evaluate(() => { const r = document.querySelector('#ingEngine .ie-keys-top'); const s = r.querySelector('.ie-stop'); const k = [...r.children]; return { at: k.indexOf(s), dis: s && s.disabled, keys: k.map(x => x.textContent.trim()) }; });
  ok(idle.at === 2 && /^Load/.test(idle.keys[0]) && /^Unload/.test(idle.keys[1]) && idle.dis === true, 'Stop writing stands in the row right after Load and Unload (which stay first), still while nothing writes', JSON.stringify(idle));
  await p.evaluate(() => { window.__aborts = 0; const oa = Engine.abort; Engine.abort = function () { window.__aborts++; try { return oa.apply(this, arguments); } catch (e) { } };
    window.__realUse = window.ingModelInUse; window.ingModelInUse = function () { return 'Lector'; }; });
  await p.waitForTimeout(1200); await p.clock.runFor(1700); await p.waitForTimeout(400);
  const busy = await p.evaluate(() => { const s = document.querySelector('#ingEngine .ie-stop'); return { dis: s.disabled, title: s.title, label: s.getAttribute('aria-label') }; });
  ok(busy.dis === false && /writing for Lector/.test(busy.title), 'while the model writes for a page, Stop writing wakes and says for whom', JSON.stringify(busy));
  await p.screenshot({ path: OUT + 't814-engine-writing.png', clip: await p.evaluate(() => { const r = document.getElementById('ingEngine').getBoundingClientRect(); return { x: r.left - 10, y: r.top - 10, width: r.width + 20, height: Math.min(420, r.height + 20) }; }) });
  await p.click('#ingEngine .ie-stop'); await p.waitForTimeout(200);
  ok(await p.evaluate(() => window.__aborts >= 1), 'pressed, it tells the engine to stop at once', await p.evaluate(() => window.__aborts));
  await p.evaluate(() => { window.ingModelInUse = window.__realUse; }); await p.clock.runFor(2500); await p.waitForTimeout(300);
  ok(await p.evaluate(() => document.querySelector('#ingEngine .ie-stop').disabled === true), 'when nothing writes any more, it is still again');
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);

  // 2. Ingenia asks first
  await p.evaluate(() => { ['Carpe Diem', 'The Forge', 'Inkwell', 'Ingenium', 'The Offline Project'].forEach(n => IngFolders.make(n));
    window.__ups = []; IngFolders.unread = function (x) { return x.name === 'Carpe Diem' ? [1, 2, 3] : x.name === 'The Forge' ? [1] : []; };
    IngFolders.bringUp = function (x) { window.__ups.push(x.name); return new Promise(r => setTimeout(() => r({ ok: true }), 300)); }; });
  await p.clock.fastForward(240000); await p.waitForTimeout(300);
  await p.evaluate(() => IngKnow.autoTick()); await p.waitForTimeout(500);
  const card = await p.evaluate(() => { const c = document.getElementById('r421Ask'); return c ? { rows: [...c.querySelectorAll('.ra-row b')].map(x => x.textContent), go: c.querySelector('.ra-keys .btn.primary').textContent, ups: window.__ups.length } : null; });
  ok(card && card.rows.join() === 'Carpe Diem,The Forge' && card.ups === 0, 'after quiet minutes it offers the folders waiting and writes nothing', JSON.stringify(card));
  await p.waitForTimeout(800); await p.screenshot({ path: OUT + 't814-ask.png' });
  await p.evaluate(() => { const r = [...document.querySelectorAll('#r421Ask .ra-row')].find(x => /The Forge/.test(x.textContent)); r.querySelector('input').click(); });
  ok(await p.evaluate(() => document.querySelector('#r421Ask .ra-keys .btn.primary').textContent === 'Bring it up to date'), 'she picks: unticking one says so on the key');
  await p.click('#r421Ask .ra-keys .btn.primary'); await p.clock.runFor(1200); await p.waitForTimeout(400);
  const after = await p.evaluate(() => ({ ups: window.__ups.slice(), st: [...document.querySelectorAll('#r421Ask .ra-st')].map(x => x.textContent), say: document.querySelector('#r421Ask .ra-say').textContent }));
  ok(after.ups.join() === 'Carpe Diem' && after.st.join() === 'Up to date,Left as it is', 'only the folder she chose is brought up to date', JSON.stringify(after));
  await p.waitForTimeout(300); await p.screenshot({ path: OUT + 't814-ask-done.png', clip: await p.evaluate(() => { const r = document.getElementById('r421Ask').getBoundingClientRect(); return { x: r.left - 12, y: r.top - 12, width: r.width + 24, height: r.height + 24 }; }) });
  await p.evaluate(() => document.querySelector('#r421Ask .ra-keys .btn').click());
  await p.evaluate(() => IngKnow.autoTick()); await p.waitForTimeout(300);
  ok(await p.evaluate(() => !document.getElementById('r421Ask')), 'the folder she left is not offered again at once');
  const label = await p.evaluate(() => { go('memoria'); return null; });

  // 3. Ingenia's logos: no ring; the crest a key
  await p.evaluate(() => { go('folders'); const f = IngFolders.folders().find(x => x.name === 'Carpe Diem'); state.folders.ui.open = f.id; IngFolders.paint(); }); await p.waitForTimeout(1200);
  ok(await p.evaluate(() => { const r = [...document.querySelectorAll('#page-folders .ig-ls-l.rim')]; return r.length === 0 || r.every(x => getComputedStyle(x).display === 'none'); }), 'no edge copies drawn behind the logos (the ring)');
  await p.evaluate(() => { const f = IngFolders.folders().find(x => x.name === 'The Offline Project'); state.folders.ui.open = f.id; IngFolders.paint(); }); await p.waitForTimeout(1500);
  const crest = await p.evaluate(() => { const k = document.querySelector('#page-folders .fd-oh .ig-ls.crest'); if (!k) return null; const r = k.getBoundingClientRect(); return { key: k.classList.contains('ig-key'), role: k.getAttribute('role'), tab: k.tabIndex, label: k.getAttribute('aria-label'), w: Math.round(r.width), h: Math.round(r.height), cursor: getComputedStyle(k).cursor }; });
  ok(crest && crest.key && crest.role === 'button' && crest.tab === 0 && crest.h > crest.w && crest.cursor === 'pointer', "the crest is a key on its folder's page, at its own shape", JSON.stringify(crest));
  const kb = await (await p.$('#page-folders .fd-oh .ig-ls.crest')).boundingBox();
  await p.mouse.move(kb.x + kb.width / 2, kb.y + kb.height / 2); await p.mouse.down(); await p.waitForTimeout(80);
  const down = await p.evaluate(() => document.querySelector('#page-folders .fd-oh .ig-ls.crest').classList.contains('down'));
  await p.mouse.up(); await p.waitForTimeout(150);
  const play = await p.evaluate(() => { const k = document.querySelector('#page-folders .fd-oh .ig-ls.crest'); return k.className; });
  ok(down && /r402-f|r402-up/.test(play) && /r421-glint/.test(play), 'pressed, it sinks, springs, plays a flourish and its light', play);
  await p.waitForTimeout(250);
  await p.screenshot({ path: OUT + 't814-crest.png', clip: { x: kb.x - 30, y: kb.y - 30, width: kb.width + 60, height: kb.height + 60 } });
  // the drawer's and the cards' crests sway too
  const still = await p.evaluate(() => [...document.querySelectorAll('#page-folders img.ing-crest-img')].map(e => e.className + ' seal=' + e.getAttribute('data-fd-seal') + ' in ' + (e.parentElement && e.parentElement.className) + ' shown=' + !!e.offsetParent + ' src=' + !!e.getAttribute('src')));
  ok(await p.evaluate(() => [...document.querySelectorAll('#page-folders .ig-ls.crest')].length >= 1 && ![...document.querySelectorAll('#page-folders img.ing-crest-img.fd-seal:not(.fd-wm)')].some(e => e.offsetParent)), 'no still crest picture left on the page', JSON.stringify(still));

  // 4. Fabrica: title, seal key, panel height
  await p.evaluate(async () => { const page = '<!doctype html><html><head><meta charset="utf-8"><title>Ingenium</title></head><body>x</body></html>';
    const x = await IngRepo.fromFiles([{ path: 'ingenium.html', data: page }], { name: 'Ingenium', msg: 'First version' }); state.fabrica.sel = x.id; });
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(2500); await p.clock.runFor(300);
  const fb = await p.evaluate(() => { const h = document.getElementById('fbWhName'); const c = getComputedStyle(h); const pn = document.getElementById('fbPanels').getBoundingClientRect(); const s = document.getElementById('fbWhSeal');
    return { lh: parseFloat(c.lineHeight), fs: parseFloat(c.fontSize), sh: h.scrollHeight, ch: h.clientHeight, panels: Math.round(pn.height), vh: innerHeight, role: s.getAttribute('role'), tab: s.tabIndex, lab: s.getAttribute('aria-label'), cur: getComputedStyle(s).cursor }; });
  ok(fb.lh >= fb.fs * 1.25 && fb.sh <= fb.ch + 1, "the work panel's title is whole (its line taller than its letters)", JSON.stringify(fb));
  ok(fb.panels >= fb.vh - 74 - 30, 'the three panels have their full height again', JSON.stringify(fb));
  ok(fb.role === 'button' && fb.tab === 0 && /Ingenium's logo/.test(fb.lab) && fb.cur === 'pointer', 'the seal beside the title is a key', JSON.stringify(fb));
  const sb = await (await p.$('#fbWhSeal')).boundingBox();
  await p.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2); await p.mouse.down(); await p.waitForTimeout(60);
  const sdown = await p.evaluate(() => document.getElementById('fbWhSeal').classList.contains('down'));
  await p.mouse.up(); await p.waitForTimeout(100);
  const splay = await p.evaluate(() => document.getElementById('fbWhSeal').className);
  ok(sdown && /r421-(hop|knock|spin|wobble|pulse|lift)/.test(splay), 'pressed, the seal sinks and plays a flourish', splay);
  await p.evaluate(() => { const r = document.getElementById('fbPanels').getBoundingClientRect(); window.scrollTo(0, r.top + window.scrollY - 52); });
  await p.waitForTimeout(900);
  await p.screenshot({ path: OUT + 't814-fabrica.png' });
  const hb = await p.evaluate(() => { const r = document.querySelector('#fbWork .f-pn-h').getBoundingClientRect(); return { x: r.left - 6, y: r.top - 6, width: Math.min(520, r.width + 12), height: r.height + 12 }; });
  await p.screenshot({ path: OUT + 't814-fabhead.png', clip: hb });
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await p.waitForTimeout(700);
  await p.screenshot({ path: OUT + 't814-fabrica-night.png' });
  console.log('errors', JSON.stringify(errs.slice(0, 6)));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close();
})();
