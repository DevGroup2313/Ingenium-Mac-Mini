// node rig/t_683_logos.js <Ingenium page url (master)> <out folder>
// Ingenium 6.83 (12 November 2026), in Chromium: every app's folder wears its own logo, never a letter (modules/r277.js, modules/r263.js).
// Her words: "I want the Lakay and Offline Project app folders and any future apps folders to show their logo icon and not have some
// randomised letter stand-in when they clearly have a logo. I thought that this was already resolved. I want that made into the standard."
// Folders for her apps (Carpe Diem, The Forge, Ingenium, Inkwell, Lakay, Offline Project), for an invented app made in Fabrica with a logo
// in its page (Harbour Garden), and for an invented app with no logo anywhere (Quiet Notes). Checks:
//   no letter coin anywhere on Folders, in the drawer's tabs, the front folder, the cards or an opened folder;
//   Lakay wears its Spiral (its own picture), the Offline Project its master logo, the four their seals;
//   Harbour Garden wears the logo from its own page in Fabrica, and keeps it (found once);
//   Quiet Notes, with no logo anywhere, a quiet disc with no letter;
//   by night Lakay wears its night picture; no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
// an invented logo: a 2x2 PNG
const PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFUlEQVR42mNk+M9Qz0AEYBxVSF+FAAhKDveksOjmAAAAAElFTkSuQmCC';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(1000);
  await p.evaluate(async ({ PNG }) => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    ['Carpe Diem', 'The Forge', 'Ingenium', 'Inkwell', 'Lakay', 'Offline Project', 'Harbour Garden', 'Quiet Notes'].forEach(n => IngFolders.make(n));
    const html = '<!doctype html><html><head><meta charset="utf-8"><link rel="icon" type="image/png" sizes="512x512" href="data:image/png;base64,' + PNG + '"><title>Harbour Garden</title></head><body>A garden</body></html>';
    await IngRepo.fromFiles([{ path: 'index.html', data: new TextEncoder().encode(html) }], { name: 'Harbour Garden' });
    try { saveState(); } catch (e) {} go('folders'); }, { PNG });
  await sleep(3500);
  const read = () => p.evaluate(() => {
    const out = { coins: document.querySelectorAll('#page-folders .fd-coin,#page-folders [data-l]').length, tabs: {}, cards: {} };
    document.querySelectorAll('#page-folders .fd-tab').forEach(t => { const n = (t.querySelector('.fd-tn') || {}).textContent, s = t.firstElementChild; out.tabs[n] = { tag: s && s.tagName, cls: s && s.className, src: s && s.getAttribute && (s.getAttribute('src') || '').slice(0, 40), which: s && s.getAttribute('data-applogo') }; });
    document.querySelectorAll('#page-folders .fld-card .fld-name').forEach(nm => { const s = nm.firstElementChild, n = nm.textContent.trim(); out.cards[n] = { tag: s && s.tagName, cls: s && s.className, letter: s && getComputedStyle(s, '::before').content }; });
    return out; });
  let r = await read();
  ok(r.coins === 0, 'no letter coin anywhere on Folders', r.coins);
  const T = r.tabs;
  ok(T.Lakay && T.Lakay.tag === 'IMG' && T.Lakay.which === 'lakay' && /^data:image\/png/.test(T.Lakay.src), 'Lakay wears its Spiral, its own picture', T.Lakay);
  ok(T['Offline Project'] && (T['Offline Project'].tag === 'IMG' || /ing-crest/.test(T['Offline Project'].cls)) && !/ing-logo-wait/.test(T['Offline Project'].cls), 'the Offline Project wears its master logo', T['Offline Project']);
  ok(['Carpe Diem', 'The Forge', 'Ingenium', 'Inkwell'].every(n => T[n] && /ing-crest/.test(T[n].cls)), 'Carpe Diem, The Forge, Ingenium and Inkwell wear their seals, as before', ['Carpe Diem', 'The Forge', 'Ingenium', 'Inkwell'].map(n => T[n]));
  // the drawer shows some folders at a time; every folder has its card below it
  await p.waitForFunction(() => !!(state.appLogos && state.appLogos['harbour garden']), null, { timeout: 30000 }).catch(() => {}); await sleep(500);
  r = await read();
  const C = r.cards, hgc = await p.evaluate(() => { const nm = [...document.querySelectorAll('#page-folders .fld-card .fld-name')].find(x => /Harbour Garden/.test(x.textContent)), s = nm && nm.firstElementChild; return s ? { tag: s.tagName, src: (s.getAttribute('src') || '').slice(0, 40), cls: s.className } : null; });
  ok(hgc && hgc.tag === 'IMG' && /^data:image\/png;base64,iVBOR/.test(hgc.src), 'Harbour Garden, an app made in Fabrica, wears the logo from its own page', hgc);
  const kept = await p.evaluate(() => !!(state.appLogos && state.appLogos['harbour garden'] && state.appLogos['harbour garden'].src));
  ok(kept, 'and its logo is kept once found, so it shows at once next time', kept);
  ok(C['Quiet Notes'] && /ing-logo-wait/.test(C['Quiet Notes'].cls) && C['Quiet Notes'].tag === 'SPAN', 'Quiet Notes, with no logo anywhere, wears a quiet disc', C['Quiet Notes']);
  ok(Object.keys(C).length >= 8 && Object.values(C).every(c => c.tag && !/fd-coin/.test(c.cls) && (c.letter === 'none' || c.letter === 'normal' || c.letter === '""')), 'the cards wear the same logos, and none shows a letter', C);
  await p.screenshot({ path: OUT + '/folders_logos_day.png' });
  // an opened folder
  await p.evaluate(() => { const c = [...document.querySelectorAll('#page-folders .fld-card')].find(x => /Lakay/.test(x.textContent)); if (c) c.click(); }); await sleep(1500);
  const sp = await p.evaluate(() => { const s = document.querySelector('#page-folders .fd-oh > *'); return s ? { tag: s.tagName, which: s.getAttribute('data-applogo') } : null; });
  ok(sp && sp.tag === 'IMG' && sp.which === 'lakay', 'an opened folder (Lakay) wears its logo on its cover', sp);
  await p.screenshot({ path: OUT + '/folders_lakay_open.png' });
  // by night
  await p.evaluate(() => { state.theme = 'night'; try { applyTheme(); } catch (e) { document.body.setAttribute('data-theme', 'night'); } go('folders'); }); await sleep(2000);
  const nt = await p.evaluate(() => { const im = document.querySelector('#page-folders img[data-applogo="lakay"]'); return { src: im && im.src, nightSrc: window.ING_SEALS && ING_SEALS.lakayN ? 'data:image/png;base64,' + ING_SEALS.lakayN.b64 : null }; });
  ok(nt.nightSrc && nt.src === nt.nightSrc, 'by night Lakay wears its night picture', { has: !!nt.src, night: !!nt.nightSrc });
  r = await read();
  ok(r.coins === 0, 'by night too, no letter coin anywhere', r.coins);
  await p.screenshot({ path: OUT + '/folders_logos_night.png' });
  ok(errs.length === 0, 'no page error', errs);
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
