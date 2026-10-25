// The Forge 647 · the apps the master Forge carries, as the owner asked (25 October 2026): "I need to be able to edit the latest
// versions of all of my apps on my master version of the Forge, not just the demos." In Chromium, one browser and one address:
//   - the 646 page is opened first (it carried Carpe Diem 1058's committee demo, Ingenium 6.4 and Inkwell 7.51) and keeps them;
//   - then the 647 page: what it carries says Ingenium 6.7.1 (the master edition), Carpe Diem 1058 (the full edition, not the
//     demo), Inkwell 7.52 and The Forge 647; it keeps them on the device, the full Carpe Diem in place of the demo (the demo
//     kept as the earlier copy), each copy the very bytes the page carries;
//   - in the Editor, the Carpe Diem opened is the full edition (its build says no demo), Ingenium is 6.7.1 master, Inkwell 7.52;
//   - no page errors.
//   node tests/t_647_carried.js <url of the 646 full page> <url of the 647 full page> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [U646, U647, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
async function ready(p) { await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 180000 }); await p.waitForTimeout(1500); }
// the library as the Forge keeps it (IndexedDB forge-applib, store meta)
const lib = p => p.evaluate(() => new Promise(res => { const r = indexedDB.open('forge-applib', 1); r.onsuccess = () => { const d = r.result; if (!d.objectStoreNames.contains('meta')) return res({});
  const out = {}, c = d.transaction('meta', 'readonly').objectStore('meta').openCursor(); c.onsuccess = () => { const k = c.result; if (k) { out[k.value.id] = { version: k.value.version, sha256: k.value.sha256, size: k.value.size, source: k.value.source }; k.continue(); } else res(out); }; }; r.onerror = () => res({}); }));
async function seeded(p, n) { for (let i = 0; i < 240; i++) { const L = await lib(p); if (Object.keys(L).filter(k => /:newest$/.test(k)).length >= n && await p.evaluate(() => !!window.__forgeBiLast)) return L; await p.waitForTimeout(1000); } return lib(p); }
const meta = p => p.evaluate(() => JSON.parse(document.getElementById('forge-bi-meta').textContent).apps.map(a => ({ key: a.key, version: a.version, sha256: a.sha256, size: a.size })));
(async () => {
  const b = await pw.chromium.launch({ args: ['--js-flags=--max-old-space-size=8192'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  let p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(U646); await ready(p);
  await p.evaluate(() => { try { const k = [...document.querySelectorAll('[data-lib="seed"]')][0]; if (k) k.click(); } catch (e) { } });
  const L0 = await seeded(p, 3);
  ok(L0['cd:newest'] && L0['cd:newest'].version === '1058' && L0['ingenium:newest'] && L0['ingenium:newest'].version === '6.4', 'the 646 page keeps what it carried (Carpe Diem 1058, the committee demo; Ingenium 6.4)', L0);
  await p.close(); p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto(U647); await ready(p);
  const M = await meta(p); const by = Object.fromEntries(M.map(a => [a.key, a]));
  ok(by.ingenium && by.ingenium.version === '6.7.1' && by.cd && by.cd.version === '1058' && by.inkwell && by.inkwell.version === '7.52' && by.forge && by.forge.version === '647',
    'the 647 page carries Ingenium 6.7.1, Carpe Diem 1058, Inkwell 7.52 and The Forge 647', M.map(a => a.key + ' ' + a.version));
  await p.evaluate(() => { try { const k = [...document.querySelectorAll('[data-lib="seed"]')][0]; if (k) k.click(); } catch (e) { } });
  let L1 = {}; for (let i = 0; i < 240; i++) { L1 = await lib(p); if (['cd', 'ingenium', 'inkwell', 'forge'].every(k => L1[k + ':newest'] && L1[k + ':newest'].sha256 === by[k].sha256)) break; await p.waitForTimeout(1000); }
  ok(['cd', 'ingenium', 'inkwell', 'forge'].every(k => L1[k + ':newest'] && L1[k + ':newest'].sha256 === by[k].sha256 && L1[k + ':newest'].size === by[k].size), 'each app it carries is kept on the device as the very bytes the page carries', Object.fromEntries(Object.entries(L1).map(([k, v]) => [k, v.version + ' ' + String(v.sha256).slice(0, 8)])));
  ok(L1['cd:earlier'] && L1['cd:earlier'].sha256 === (L0['cd:newest'] || {}).sha256, 'the full Carpe Diem took the demo\'s place; the demo is kept as the earlier copy', { earlier: L1['cd:earlier'], demo: L0['cd:newest'] });
  // the copies themselves: what each one says it is
  const said = await p.evaluate(() => new Promise(res => { const r = indexedDB.open('forge-applib', 1); r.onsuccess = () => { const st = r.result.transaction('bytes', 'readonly').objectStore('bytes'), out = {}; let n = 0;
    ['cd:newest', 'ingenium:newest', 'inkwell:newest'].forEach(id => { const q = st.get(id); q.onsuccess = () => { const t = new TextDecoder().decode(new Uint8Array(q.result.bytes));
      const cd = /window\.CD_BUILD=\{([^}]*)\}/.exec(t), ing = /var ING_VERSION="([0-9.]+)"/.exec(t), ed = /ING_EDITION="([a-z]+)"/.exec(t), ink = /<!-- BUILD='([\d.]+)'/.exec(t.slice(0, 4000)), ti = /<title>([^<]*)<\/title>/.exec(t.slice(0, 600000));
      out[id] = { cd: cd && cd[1], ing: ing && ing[1], edition: ed && ed[1], ink: ink && ink[1], title: ti && ti[1] }; if (++n === 3) res(out); }; }); }; }));
  ok(said['cd:newest'] && !/demo/i.test(said['cd:newest'].cd + ' ' + said['cd:newest'].title) && /pass:"1058"/.test(said['cd:newest'].cd), 'the Carpe Diem kept is the full edition (its build names no demo edition, nor does its title)', said['cd:newest']);
  ok(said['ingenium:newest'] && said['ingenium:newest'].ing === '6.7.1' && said['ingenium:newest'].edition === 'master', 'the Ingenium kept is 6.7.1, the master edition', said['ingenium:newest']);
  ok(said['inkwell:newest'] && said['inkwell:newest'].ink === '7.52', 'the Inkwell kept is 7.52', said['inkwell:newest']);
  ok(!errs.length, 'no page errors', errs.slice(0, 4));
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed ' + e.stack); process.exit(2); });
