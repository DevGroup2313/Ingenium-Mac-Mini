// R132 in Carpe Diem and the Forge: a desk the small store refuses is kept in the larger store, the corner says so, and on
// the next start the newer desk opens from there; once the small store takes it again, the larger store lets its copy go.
// node rig/t_cd_room.js <url> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
async function door(p, fresh) { await p.waitForTimeout(6000);
  await p.evaluate((fresh) => { const re = fresh ? /^\s*(Start fresh|Go to Home|Enter)/ : /^\s*(Go to Home|Enter)/; const c = [...document.querySelectorAll('#cd-door *, button')].find(x => re.test(x.textContent || '') && x.children.length < 4 && (x.tagName === 'BUTTON' || x.onclick || x.getAttribute('role') === 'button') && x.offsetParent); if (c) c.click(); }, !!fresh);
  await p.waitForTimeout(2500); }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 200)));
  await p.goto(URL_, { timeout: 180000 }); await door(p, true);
  const has = await p.evaluate(() => ({ api: !!window.__cdRoomApi, hook: typeof window.__cdOverflow === 'function', key: typeof STORAGE_KEY === 'string' ? STORAGE_KEY : null, build: JSON.stringify(window.CD_BUILD) }));
  ok(has.api && has.hook && has.key, 'the room part is in the page, on its own desk key', JSON.stringify(has));
  await p.waitForFunction(() => window.__cdRoomApi && window.__cdRoomApi.checked(), null, { timeout: 15000 });
  const full = await p.evaluate(() => new Promise(res => { const real = Storage.prototype.setItem;
    Storage.prototype.setItem = function (k, v) { if (this === localStorage && k === STORAGE_KEY) { const e = new Error('full'); e.name = 'QuotaExceededError'; throw e; } return real.call(this, k, v); };
    state.__roomTest = 'R132 check ' + Date.now(); window.__roomMark = state.__roomTest; saveState();
    setTimeout(() => window.__cdRoomApi.get().then(r => { const n = document.getElementById('cd-save-notice');
      res({ lsOk: r && r.lsOk, has: !!(r && r.raw && r.raw.indexOf(window.__roomMark) >= 0), ls: (localStorage.getItem(STORAGE_KEY) || '').indexOf(window.__roomMark) >= 0, notice: n ? n.textContent : '', mark: window.__roomMark }); }), 900); }));
  ok(full.lsOk === false && full.has && !full.ls && /larger store|grande mémoire/.test(full.notice), 'a desk the small store refuses is kept in the larger store, and the corner says so', JSON.stringify(full));
  await p.reload({ timeout: 180000 }); await door(p, false); /* not Start fresh, which empties a demonstration's desk on purpose */
  await p.waitForFunction(() => window.__cdRoomApi && window.__cdRoomApi.checked(), null, { timeout: 15000 }); await p.waitForTimeout(800);
  const back = await p.evaluate((mark) => window.__cdRoomApi.get().then(r => ({ st: state.__roomTest === mark, ls: (localStorage.getItem(STORAGE_KEY) || '').indexOf(mark) >= 0, rec: r && r.lsOk, raw: r && r.raw === null })), full.mark);
  ok(back.st && back.ls && back.rec === true && back.raw, 'on the next start the newer desk opens from the larger store; the small store takes it again and the larger store lets its copy go', JSON.stringify(back));
  await p.screenshot({ path: path.join(OUT, 'after.png') });
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH ' + e.stack); process.exit(2); });
