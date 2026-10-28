// The Forge 649 · the Windows app's quicker start, as the Windows app opens its page: from the disk (a file: address, where
// her work is kept). In Chromium, which, like Windows' web view, lets a page opened from the disk run a script beside it but
// not read that file as text:
//   - the quick page (forge_quick_split_js.py) is ready, and its four parts are still unread when it is;
//   - its time to ready against the full page's, opened the same way (each in a fresh browser, three times);
//   - keeping the apps it carries reads each part from its script: the four copies kept on the device are the very bytes
//     the page names (size and SHA-256), and no part is left unread;
//   - a part that is not there is reported as gone, not as a fault;
//   - no page errors.
//   node tests/t_649_quick.js <quick page path> <full page path>
const pw = require('/opt/node-tools/node_modules/playwright'); const { pathToFileURL } = require('url');
const [QUICK, FULL] = process.argv.slice(2).map(p => pathToFileURL(p).href);
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
const ready = p => p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone') || b.classList.contains('fb-done'); }, null, { timeout: 240000, polling: 50 });
const lib = p => p.evaluate(() => new Promise(res => { const r = indexedDB.open('forge-applib', 1); r.onsuccess = () => { const d = r.result; if (!d.objectStoreNames.contains('meta')) return res({});
  const out = {}, c = d.transaction('meta', 'readonly').objectStore('meta').openCursor(); c.onsuccess = () => { const k = c.result; if (k) { out[k.value.id] = { version: k.value.version, sha256: k.value.sha256, size: k.value.size }; k.continue(); } else res(out); }; }; r.onerror = () => res({}); }));
async function timed(url) {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const t0 = Date.now(); await p.goto(url, { waitUntil: 'commit', timeout: 300000 }); await ready(p); const t = Date.now() - t0; await b.close(); return t; }
(async () => {
  const times = { full: [], quick: [] };
  for (let i = 0; i < 3; i++) { times.full.push(await timed(FULL)); times.quick.push(await timed(QUICK)); }
  const med = a => a.slice().sort((x, y) => x - y)[1];
  console.log('ready, from the disk (ms): full ' + times.full.join(', ') + '; quick ' + times.quick.join(', '));
  ok(med(times.quick) < med(times.full), 'the quick page is ready sooner than the full page (medians ' + med(times.quick) + ' ms against ' + med(times.full) + ' ms)', times);

  const b = await pw.chromium.launch({ args: ['--js-flags=--max-old-space-size=8192'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(QUICK); await ready(p);
  const left0 = await p.evaluate(() => ({ left: window.forgeDeferredLeft ? window.forgeDeferredLeft() : -1, js: [...document.querySelectorAll('script[data-defer]')].map(e => e.getAttribute('data-defer')), quick: !!window.__forgeQuickFile }));
  ok(left0.quick && left0.left === 4 && left0.js.every(u => /^the_forge_parts\/forge-bi-[a-z]+\.js$/.test(u)), 'ready with its four parts still unread, each named as a script beside the page', left0);
  const gone = await p.evaluate(() => { const s = document.createElement('script'); s.type = 'forge/b64'; s.id = 'forge-bi-test'; s.setAttribute('data-defer', 'the_forge_parts/not-there.js'); document.body.appendChild(s);
    return window.forgeFill('forge-bi-test').then(() => 'filled', e => e && e.code); });
  ok(gone === 'gone', 'a part that is not there is reported as gone', gone);
  await p.evaluate(() => { const s = document.getElementById('forge-bi-test'); if (s) s.remove(); });
  const M = await p.evaluate(() => JSON.parse(document.getElementById('forge-bi-meta').textContent).apps);
  const by = Object.fromEntries(M.map(a => [a.key, a]));
  await p.evaluate(() => { try { const k = [...document.querySelectorAll('[data-lib="seed"]')][0]; if (k) k.click(); } catch (e) {} });
  let L = {};
  for (let i = 0; i < 300; i++) { L = await lib(p); if (['cd', 'ingenium', 'inkwell', 'forge'].every(k => L[k + ':newest'] && L[k + ':newest'].sha256 === by[k].sha256)) break; await p.waitForTimeout(1000); }
  ok(['cd', 'ingenium', 'inkwell', 'forge'].every(k => L[k + ':newest'] && L[k + ':newest'].sha256 === by[k].sha256 && L[k + ':newest'].size === by[k].size),
    'each app it carries is kept on the device from its script, as the very bytes the page names', Object.fromEntries(Object.entries(L).map(([k, v]) => [k, v.version + ' ' + String(v.sha256).slice(0, 8)])));
  const left1 = await p.evaluate(() => ({ left: window.forgeDeferredLeft(), last: window.__forgeBiLast || null }));
  ok(left1.left === 0 && left1.last && !left1.last.failed, 'no part is left unread, and keeping them reported no fault', left1);
  ok(errs.length === 0, 'no errors on the page', errs.slice(0, 3));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
