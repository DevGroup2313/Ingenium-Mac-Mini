// Ingenium 7.94: one model, one task at a time (modules/r397.js). Her words (25 November 2026): Vocatio's notices "keep saying the model is
// busy and can't finish when I can clearly see the model working and writing still".
//   node rig/t_794_model.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.ingModelInUse && window.IngCareer && window.IngKnow && window.IngFolders, null, { timeout: 600000 }); await sleep(3000);
  // the background folder step: it starts when nothing uses the model, and not while Vocatio does
  // r390's step waits three quiet minutes after the page opens (its own rule); the test waits them out once
  await p.waitForFunction(() => performance.now() > 186000, null, { timeout: 400000, polling: 2000 });
  const bg = await p.evaluate(async () => { try { const K = IngKnow.store ? IngKnow.store() : null; if (K && K.opts) K.opts.auto = true; } catch (e) {} const F = IngFolders, ou = F.unread, ob = F.bringUp, R = IngCareer.ui.RUN; let calls = 0; F.unread = () => [1]; F.bringUp = () => { calls++; return Promise.resolve(null); };
    const idle = ingModelInUse(180000); IngKnow.autoTick(); const c1 = calls;
    R.busy = true; await new Promise(r => setTimeout(r, 1300)); const who = ingModelInUse(0); IngKnow.autoTick(); const c2 = calls - c1;
    R.busy = false; await new Promise(r => setTimeout(r, 1300)); const after = ingModelInUse(180000); IngKnow.autoTick(); const c3 = calls - c1 - c2;
    F.unread = ou; F.bringUp = ob; return { idle, c1, who, c2, after, c3 }; });
  ok(bg.idle === '' && bg.c1 === 1 && bg.who === 'Vocatio' && bg.c2 === 0 && bg.after === 'Vocatio' && bg.c3 === 0, "Ingenia's background step waits while Vocatio uses the model, and for three minutes after", bg);
  // Vocatio, the model busy with Lector: it waits, says for whom, and finishes by itself
  const v1 = await p.evaluate(async () => { const U = IngCareer.ui, R = U.RUN, ol = window.lxAsk; let n = 0, lines = []; window.LX.busy = true;
    window.lxAsk = function () { n++; if (n <= 2) return Promise.reject(new Error('busy')); return Promise.resolve('the answer'); };
    R.busy = true; const iv = setInterval(() => { if (R.live) lines.push(R.live); }, 200); setTimeout(() => { window.LX.busy = false; }, 4000);
    let out = null, err = null; try { out = await U.ask(() => [{ role: 'user', content: 'x' }], 50, 0.1); } catch (e) { err = String(e && e.message || e); }
    clearInterval(iv); window.lxAsk = ol; R.busy = false; return { out, err, n, said: [...new Set(lines)].slice(0, 3) }; });
  ok(v1.out === 'the answer' && !v1.err && v1.said.some(l => /Lector is using it/.test(l)), 'Vocatio waits while Lector uses the model, says so, and finishes by itself', v1);
  // a lent model still writing its first reply: "busy at the moment" is waited on, not a failure
  const v2 = await p.evaluate(async () => { const U = IngCareer.ui, R = U.RUN, ol = window.lxAsk; let n = 0;
    window.lxAsk = function () { n++; if (n === 1) return Promise.reject(new Error('the request took too long')); if (n <= 3) return Promise.reject(new Error('Your Mac mini is busy at the moment.')); return Promise.resolve('written'); };
    R.busy = true; let out = null, err = null; try { out = await U.ask(() => [{ role: 'user', content: 'x' }], 50, 0.1); } catch (e) { err = String(e && e.message || e); }
    window.lxAsk = ol; R.busy = false; return { out, err, n }; });
  ok(v2.out === 'written' && !v2.err && v2.n === 4, 'a lent model still writing: Vocatio waits for it instead of giving up', v2);
  // what she reads if the model truly stays busy
  const msg = await p.evaluate(() => { let said = ''; const os = window.ingToast; window.ingToast = function (t) { said = String(t); }; try { IngCareer.ui.failed(new Error('busy')); } catch (e) {} window.ingToast = os; const box = document.querySelector('#cs .c-say, #csSay'); return said || (box ? box.textContent : ''); });
  ok(!/could not be finished: busy/.test(msg), 'no bare "could not be finished: busy" notice', msg);
  const lent = await p.evaluate(async () => { try { await netFetch('http://127.0.0.1:9/none', { method: 'POST', body: '{}', timeout: 600, onChunk: function () {} }); } catch (e) {} return window.__r397t; });
  ok(lent === 1800, 'a reply from a lent model may take 30 minutes', lent);
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
