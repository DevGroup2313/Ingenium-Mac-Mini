// Ingenium 7.71's pictures, for her word: Clavis in Ingenia (modules/r362.js), from a profile like hers (Ingenia set up before 7.65 with
// six folders and an unsorted conversation that names it); and the nature sounds in their groups (modules/r363.js, r295.js) in the
// Display panel and in Settings, by day and by night. Invented conversations only.
//   node capture_771.js <test page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const enter = async (p) => { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await p.waitForTimeout(600); };
const RING = '.pv-ring{outline:2.5px solid #6a3fb5!important;outline-offset:2px!important}';
async function shot(p, sel, key, ring, pad) {
  await p.evaluate(([css, ring]) => { let st = document.getElementById('pvCss'); if (!st) { st = document.createElement('style'); st.id = 'pvCss'; document.head.appendChild(st); } st.textContent = css;
    document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring')); if (ring) document.querySelectorAll(ring).forEach((x) => x.classList.add('pv-ring'));
    const t = document.getElementById('ingToast'); if (t) t.style.display = 'none'; try { document.activeElement.blur(); } catch (e) {} }, [RING, ring || null]);
  await p.mouse.move(2, 2); await sleep(900);
  const el = await p.$(sel); if (!el) { console.log(key, 'NOT TAKEN: no', sel); return; }
  await el.scrollIntoViewIfNeeded(); await sleep(500);
  const b = await el.boundingBox(); pad = pad == null ? 16 : pad; const vw = p.viewportSize();
  await p.screenshot({ path: path.join(OUT, key + '.png'), clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: Math.min(vw.width - Math.max(0, b.x - pad), b.width + 2 * pad), height: Math.min(vw.height, b.height + 2 * pad) } }); console.log(key, 'taken');
}
(async () => {
  const b = await pw.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }); const errs = [];
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { try { if (sessionStorage.getItem('pvHold') !== '0') window.IngCarriedFolders = { held: true }; } catch (e) {} });
  const p = await ctx.newPage(); p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await enter(p);
  /* her copy before 7.71: six folders, and conversations as she might have them (invented) */
  await p.evaluate(() => { ['Carpe Diem', 'The Forge', 'Ingenium', 'Inkwell', 'Lakay', 'Offline Project'].forEach((n) => IngFolders.make(n));
    const now = Date.now(), add = (id, title, text, ago) => state.chats.push({ id, title, made: now - ago, updated: now - ago, messages: [{ role: 'user', text, at: now - ago }] });
    state.chats = state.chats || [];
    add('pv1', 'The results page of Clavis', 'Clavis should keep its index tabs on the results page, and Clavis needs its catalogue cards.', 3600e3);
    add('pv2', 'Clavis: the astrolabe logo', 'For Clavis, the astrolabe swings when pressed.', 7200e3);
    add('pv3', 'Lakay: the practice store', 'Lakay opens on its door with Enter.', 9000e3);
    add('pv4', 'A recipe for bread', 'How long should dough rise?', 5000e3);
    if (state.folders) delete state.folders.carried; saveState(); });
  await p.evaluate(() => sessionStorage.setItem('pvHold', '0'));
  await p.reload({ waitUntil: 'domcontentloaded', timeout: 600000 }); await enter(p);
  await p.waitForFunction(() => IngFolders.folders().some((f) => f.name === 'Clavis'), null, { timeout: 60000 });
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); go('folders'); }); await sleep(2500);
  const head = await p.evaluate(() => { const pg = document.getElementById('page-folders'); const c = pg && [...pg.querySelectorAll('section, .card, div')].find((x) => /A DRAWER OF YOUR APPS/i.test(x.innerText || '') && x.getBoundingClientRect().height > 300 && x.getBoundingClientRect().height < 900); if (c) c.id = c.id || 'pvHead'; return c ? c.id : null; });
  if (head) await shot(p, '#' + head, '1-ingenia-drawer');
  const grid = await p.evaluate(() => { const pg = document.getElementById('page-folders'); const h = [...pg.querySelectorAll('h2,h3')].find((x) => /^Your apps$/.test(x.textContent.trim()) && x.offsetParent);
    let g = h && h.nextElementSibling; while (g && !g.querySelector('button, [role=button]')) g = g.nextElementSibling; if (g) g.id = g.id || 'pvGrid'; return g ? g.id : null; });
  if (grid) await shot(p, '#' + grid, '2-ingenia-your-apps', null, 6);
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await sleep(1200);
  if (head) await shot(p, '#' + head, '3-ingenia-drawer-night');
  /* the nature sounds, in the Display panel */
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); go('home'); }); await sleep(800);
  await p.evaluate(() => { const k = document.getElementById('displayBtn'); if (k) k.click(); }); await sleep(1500);
  await p.evaluate(() => IngNature.start('dawn')); await p.waitForFunction(() => IngNature.mode() === 'dawn' && document.querySelector('#dpSound [data-nat-k="dawn"].on'), null, { timeout: 30000 }).catch(() => {}); await sleep(1500);
  await shot(p, '#dpSound [data-nat="dp"]', '4-display-nature-sounds', '#dpSound .nat-grp:not(.nat-q) [data-nat-k="brook"],#dpSound [data-nat-k="cascade"],#dpSound [data-nat-k="lightrain"],#dpSound [data-nat-k="window"],#dpSound [data-nat-k="storm"],#dpSound [data-nat-k="dawn"],#dpSound [data-nat-k="forest"],#dpSound [data-nat-k="meadow"],#dpSound [data-nat-k="pond"],#dpSound [data-nat-k="campfire"]', 14);
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await sleep(1200);
  await shot(p, '#dpSound [data-nat="dp"]', '5-display-nature-sounds-night', null, 14);
  await p.evaluate(() => { const k = document.getElementById('displayBtn'); if (k) k.click(); state.theme = 'day'; applyTheme(); }); await sleep(800);
  /* and in Settings, Sound */
  await p.evaluate(() => { go('settings'); try { const t = [...document.querySelectorAll('button,[role=tab]')].find((x) => x.offsetParent && /^Sound/.test(x.textContent.trim())); if (t) t.click(); } catch (e) {} }); await sleep(1500);
  await p.evaluate(() => { const c = document.getElementById('ingSoundCard'); if (c) { c.scrollIntoView({ block: 'center' }); const t = c.closest('[data-st-tile]'); if (t && t.getAttribute('aria-expanded') === 'false') t.click(); } }); await sleep(1200);
  await shot(p, '#ingSoundCard [data-nat="set"]', '6-settings-nature-sounds', null, 14);
  await p.evaluate(() => IngNature.stop());
  console.log('page errors:', errs.length, JSON.stringify(errs.slice(0, 5))); await b.close();
})().catch((e) => { console.log('FAILED', e && e.stack || e); process.exit(1); });
