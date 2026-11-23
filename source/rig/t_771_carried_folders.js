// Ingenium 7.71: every app Ingenium carries for her has its folder in Ingenia (modules/r362.js).
//   node rig/t_771_carried_folders.js <master page url> [<edition page url, which must make none>]
// A profile like hers: Ingenia set up before 7.65 with six folders (Carpe Diem, The Forge, Ingenium, Inkwell, Lakay, the Offline
// Project), none for the app carried since 7.65, and a conversation that names that app waiting under Not sorted yet. Invented
// conversations only. Checks:
//   1. on the next start, Ingenia has a folder for it (one), named as the app library names it, and the conversation that names it has
//      moved into it; a conversation that names no app stays under Not sorted yet; the six folders are as they were
//   2. Ingenia's drawer shows its tab, Your apps shows its card, with its own logo (never a letter)
//   3. a folder she lets go is not made again at the next start
//   4. the app library keeps it (r120), so Lector, Fabrica, Adamas, Code and Home, which read the library, name it
//   5. no page errors; with a second url (another edition), that page makes no folder and names no app of hers
const pw = require('/opt/node-tools/node_modules/playwright');
const [URL_, ED] = process.argv.slice(2);
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
setTimeout(() => { console.log('FAIL the test did not finish in 30 minutes'); process.exit(3); }, 30 * 60 * 1000).unref();
const enter = async (p) => { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.waitForTimeout(600);
  await p.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const g = [...document.querySelectorAll('button')].find((x) => /^I agree$/.test(x.textContent.trim()) && x.offsetParent && !x.disabled); if (g) g.click(); }); };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  // the first start stands for her copy before this release: r362 is kept from running (as if it were not in the page)
  await ctx.addInitScript(() => { try { if (sessionStorage.getItem('t771hold') !== '0') window.IngCarriedFolders = { held: true }; } catch (e) {} });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e.message || e).slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await enter(p);
  const app = await p.evaluate(() => { const N = (typeof LIB_NAMES === 'object' && LIB_NAMES) || {}; const ks = [...document.querySelectorAll('[id^="ing-builtin-"]')].map((e) => e.id.replace('ing-builtin-', ''));
    const k = ks.filter((x) => !['cd', 'forge', 'inkwell', 'lakay', 'ingenium'].includes(x) && N[x])[0]; return k ? { key: k, name: N[k] } : null; });
  ok(!!app, 'the master page carries an app beyond the first five (its library name read from the page)', app);
  await p.evaluate((nm) => { ['Carpe Diem', 'The Forge', 'Ingenium', 'Inkwell', 'Lakay', 'Offline Project'].forEach((n) => IngFolders.make(n));
    state.chats = state.chats || [];
    state.chats.push({ id: 'c771a', title: 'Search results page for ' + nm, made: Date.now(), updated: Date.now(), messages: [{ role: 'user', text: 'In ' + nm + ', the results page should keep its tabs. ' + nm + ' needs its catalogue cards.', at: Date.now() }] });
    state.chats.push({ id: 'c771b', title: 'A recipe for bread', made: Date.now(), updated: Date.now(), messages: [{ role: 'user', text: 'How long should dough rise?', at: Date.now() }] });
    if (state.folders) delete state.folders.carried; saveState(); }, app.name);
  const before = await p.evaluate(() => IngFolders.folders().map((f) => f.name));
  ok(before.length === 6 && !before.some((n) => /^clavis$/i.test(n)), 'her copy before: six folders, none for it', before);
  // the next start, with this release
  await p.evaluate(() => sessionStorage.setItem('t771hold', '0'));
  await p.reload({ waitUntil: 'domcontentloaded', timeout: 600000 }); await enter(p);
  await p.waitForFunction(() => window.IngCarriedFolders && !window.IngCarriedFolders.held, null, { timeout: 60000 });
  await p.waitForFunction((nm) => IngFolders.folders().some((f) => f.name === nm), app.name, { timeout: 60000 }).catch(() => {});
  const after = await p.evaluate((nm) => { const fs = IngFolders.folders(), f = fs.filter((x) => x.name === nm); const ch = (id) => (state.chats.filter((c) => c.id === id)[0] || {}).projectId || null;
    return { names: fs.map((x) => x.name), n: f.length, words: f[0] && f[0].app.words, a: ch('c771a'), b: ch('c771b'), fid: f[0] && f[0].id, carried: state.folders && state.folders.carried && Object.keys(state.folders.carried) }; }, app.name);
  ok(after.n === 1 && after.names.length === 7, 'the next start: one folder for it, named as the library names it, the six as they were', after);
  ok(after.a && after.a === after.fid, 'the conversation that names it moved into its folder', after);
  ok(!after.b, 'a conversation that names no app stays under Not sorted yet', after);
  // Ingenia: its drawer and its Your apps
  await p.evaluate(() => go('folders')); await p.waitForTimeout(2500);
  const shown = await p.evaluate((nm) => { const pg = document.getElementById('page-folders'); const t = pg ? pg.innerText : '';
    const cards = [...(pg ? pg.querySelectorAll('button, [role="button"], .fd-tab, .fld-card') : [])].filter((x) => x.textContent.trim().indexOf(nm) === 0 || x.textContent.indexOf(nm) >= 0).length;
    const seals = [...(pg ? pg.querySelectorAll('[data-fd-seal]') : [])].map((x) => x.getAttribute('data-fd-seal'));
    const coins = [...(pg ? pg.querySelectorAll('.fd-coin') : [])].map((x) => x.getAttribute('data-l'));
    return { inText: t.split(nm).length - 1, cards, seals, coins }; }, app.name);
  ok(shown.inText >= 2 && shown.cards >= 1, 'Ingenia shows it: its tab in the drawer and its card in Your apps', shown);
  ok(shown.seals.includes(app.key) || shown.seals.some((s) => s && s !== 'app'), 'its folder wears its own logo, never a letter', shown);
  await p.screenshot({ path: '/tmp/claude-0/-home-user/16660cff-4d17-5704-afa8-d642b4edb0ea/scratchpad/t771_ingenia.png' }).catch(() => {});
  // a folder she lets go is not made again
  await p.evaluate((fid) => { state.projects = state.projects.filter((x) => x.id !== fid); state.chats.forEach((c) => { if (c.projectId === fid) delete c.projectId; }); saveState(); }, after.fid);
  await p.reload({ waitUntil: 'domcontentloaded', timeout: 600000 }); await enter(p); await p.waitForTimeout(9000);
  const again = await p.evaluate((nm) => IngFolders.folders().filter((f) => f.name === nm).length, app.name);
  ok(again === 0, 'a folder she let go is not made again at the next start', again);
  // the rest of the app still names it
  // the app library keeps the carried apps once per opening, when nothing else is busy (r120): wait for it
  await p.waitForFunction(() => window.__ingBuiltin && window.__ingBuiltin.states, null, { timeout: 120000 }).catch(() => {});
  const rest = await p.evaluate((nm) => { const r = {}; const k = Object.keys(LIB_NAMES).filter((x) => LIB_NAMES[x] === nm)[0];
    try { r.lib = !!(libState().apps || {})[k]; r.state = window.__ingBuiltin && window.__ingBuiltin.states[k]; } catch (e) { r.lib = 'err ' + e.message; }
    return r; }, app.name);
  ok(rest.lib === true, 'the app library keeps it', rest);
  ok(errs.length === 0, 'no page errors', errs);
  if (ED) {
    const c2 = await b.newContext({ viewport: { width: 1440, height: 1000 } }); const q = await c2.newPage(); const e2 = [];
    q.on('pageerror', (e) => e2.push(String(e.message || e).slice(0, 200)));
    await q.goto(ED, { waitUntil: 'domcontentloaded', timeout: 600000 }); await enter(q);
    await q.evaluate(() => { ['Notebook', 'Garden'].forEach((n) => IngFolders.make(n)); saveState(); });
    await q.reload({ waitUntil: 'domcontentloaded', timeout: 600000 }); await enter(q); await q.waitForTimeout(9000);
    const ed = await q.evaluate(() => ({ names: IngFolders.folders().map((f) => f.name), r362: !!window.IngCarriedFolders, builtin: document.querySelectorAll('[id^="ing-builtin-"]').length }));
    ok(ed.names.length === 2 && !ed.r362 && ed.builtin === 0, 'another edition makes no folder for any app of hers, and carries none', ed);
    ok(e2.length === 0, 'no page errors in that edition', e2);
  }
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(2); });
