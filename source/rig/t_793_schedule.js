// Ingenium 7.93: scheduled backups (modules/r395.js), the page's side. The computer app is played by a stand-in bridge that keeps what
// it is given in memory (its own side is checked by rig/t_793_backup_place.py).
//   node rig/t_793_schedule.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const BRIDGE = () => { if (window.top !== window) return; window.__files = {}; window.__parts = {};
  window.pywebview = { api: {
    engine_info: () => Promise.resolve({ available: true, platform: 'macos-arm64', version: 'llama.cpp b11321', devices: [], state: 'off', device: { ramGB: 16, cores: 8 } }), engine_status: () => Promise.resolve({ state: 'off' }), engine_load: () => Promise.resolve({ ok: false }), engine_unload: () => Promise.resolve(true),
    installed_models: () => Promise.resolve([]),
    backup_choose_place: () => Promise.resolve({ ok: true, folder: '/Users/her/Documents/Ingenium backups' }),
    backup_write: (folder, name, b64, first, last) => { const k = folder + '/' + name; if (first) window.__parts[k] = ''; window.__parts[k] = (window.__parts[k] || '') + atob(b64 || ''); if (last) { window.__files[k] = { size: window.__parts[k].length, at: Date.now() + Object.keys(window.__files).length }; delete window.__parts[k]; return Promise.resolve({ ok: true, path: k, size: window.__files[k].size }); } return Promise.resolve({ ok: true }); },
    backup_files: (folder) => Promise.resolve({ ok: true, files: Object.keys(window.__files).filter(k => k.indexOf(folder + '/') === 0).map(k => ({ name: k.slice(folder.length + 1), size: window.__files[k].size, at: window.__files[k].at })).sort((a, b) => b.at - a.at) }),
    backup_remove: (folder, name) => { delete window.__files[folder + '/' + name]; return Promise.resolve({ ok: true }); } } }; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); await ctx.addInitScript(BRIDGE); const p = await ctx.newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngSchedule, null, { timeout: 600000 }); await sleep(2500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'data'); } catch (e) {} }); await sleep(3000);
  const c1 = await p.evaluate(() => { const c = document.getElementById('sbCard'); return c ? { keys: [...c.querySelectorAll('button')].map(b => b.textContent) } : null; });
  ok(c1 && c1.keys.includes('Choose a folder') && c1.keys.includes('Every day') && c1.keys.includes('The last 7') && c1.keys.includes('Back up now'), 'on a computer: Scheduled backups, with the folder, how often, how many to keep, and Back up now', c1);
  await p.evaluate(() => [...document.querySelectorAll('#sbCard button')].find(b => b.textContent === 'Choose a folder').click()); await sleep(600);
  const c2 = await p.evaluate(async () => { const r = await IngSchedule.run('by hand'); const made = await IngBackup.make({}); const F = Object.keys(__files); return { r, files: F, size: F.length ? __files[F[0]].size : 0, want: made.blob.size, parts: Object.keys(__parts).length }; });
  ok(c2.r.ok && c2.files.length === 1 && /Ingenium backup \d{4}-\d\d-\d\d \d\d-\d\d\.zip$/.test(c2.files[0]) && Math.abs(c2.size - c2.want) < 4096 && c2.parts === 0, 'Back up now: a whole backup written in pieces into her folder, named with its date', c2);
  const c3 = await p.evaluate(async () => { const c = IngSchedule.cfg(); c.keep = 3; IngSchedule.put(c); for (let i = 0; i < 4; i++) { __files['/Users/her/Documents/Ingenium backups/Ingenium backup 2026-11-0' + (i + 1) + ' 10-00.zip'] = { size: 10, at: 1000 + i }; }
    await IngSchedule.run('by hand'); return Object.keys(__files).length; });
  ok(c3 === 3, 'only the last few are kept (3 here); older ones of Ingenium\'s own are removed', c3);
  const c4 = await p.evaluate(() => { const c = IngSchedule.cfg(), sun = new Date(2026, 10, 29, 12), mon = new Date(2026, 10, 30, 12); const out = {};
    c.every = 'day'; c.last = { ok: true, at: Date.now() }; out.dayDone = IngSchedule.due(c, new Date()); c.last = { ok: true, at: Date.now() - 2 * 864e5 }; out.dayDue = IngSchedule.due(c, new Date());
    c.every = 'sunday'; c.last = { ok: true, at: Date.now() - 9 * 864e5 }; out.sun = IngSchedule.due(c, sun); out.mon = IngSchedule.due(c, mon); c.every = 'hand'; out.hand = IngSchedule.due(c, new Date()); return out; });
  ok(!c4.dayDone && c4.dayDue && c4.sun && !c4.mon && !c4.hand, 'every day: once a day; every Sunday: on Sundays; by hand: never by itself', c4);
  await p.evaluate(() => { IngSchedule.paint(); const c = document.getElementById('sbCard'); if (c) c.scrollIntoView({ block: 'center' }); }); await sleep(800); await p.screenshot({ path: OUT + '/schedule.png' });
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
