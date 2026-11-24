// Ingenium 7.73: Lector reads with your computer's model, and keeps reading (r365). Two stand-in computers (rig/lend681_mock.py):
// "Mac mini" and "HP laptop". Invented names and models.   node rig/t_773_lector_lend.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const LOG = path.join(OUT, 'lenders.jsonl'), CODE = 'K7QM-4HXP', PM = 8311, PH = 8312;
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
try { fs.unlinkSync(LOG); } catch (e) {}
const lender = (port, id, name, kind) => cp.spawn('python3', ['-I', path.join(__dirname, 'lend681_mock.py'), String(port), LOG, CODE, id, name, kind, '127.0.0.1:' + port], { stdio: 'ignore', detached: true });
const stop = c => { try { process.kill(-c.pid, 'SIGKILL'); } catch (e) {} };
(async () => {
  let MINI = lender(PM, 'mini0001', 'Mac mini', 'box'); const HP = lender(PH, 'hp000001', 'HP laptop', 'laptop'); await sleep(1200);
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage(); p.setDefaultTimeout(120000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngLectorLend && window.IngLend, null, { timeout: 600000, polling: 500 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const pr = await p.evaluate(async ([a, b2, code]) => { const out = []; for (const x of [a, b2]) { try { const c = await IngLend.pair('127.0.0.1:' + x, code); out.push(c.id); } catch (e) { out.push('err ' + (e && e.message || e)); } } return out; }, [PM, PH, CODE]);
  ok(pr.length === 2 && !pr.some(x => /^err/.test(x)), 'both stand-in computers pair', pr);
  await p.evaluate(() => { IngLend.useDevice(); go('lector'); }); await sleep(2500);
  // 1. the list names the computers' models
  const l0 = await p.evaluate(() => { const s = document.getElementById('l7HowModel'); if (!s) return null; return { groups: [...s.querySelectorAll('optgroup')].map(g => g.label), mini: [...s.options].filter(o => /on Mac mini$/.test(o.textContent)).map(o => o.textContent), who: (document.querySelector('#page-lector .r365-who') || {}).textContent || '' }; });
  ok(l0 && l0.groups[0] === 'On this device' && l0.groups.some(g => /^On Mac mini/.test(g)) && l0.groups.some(g => /^On HP laptop/.test(g)) && l0.mini.includes('Magister 9B · on Mac mini'), "Read and written by names this device's models and each computer's, by computer", l0);
  ok(l0 && /on this device reads and writes/.test(l0.who), 'one plain line says who reads and writes now: this device', l0 && l0.who);
  // 2. choosing the Mac mini's model connects to it; the line says so
  await p.evaluate(() => { const s = document.getElementById('l7HowModel'); s.value = [...s.options].find(o => o.textContent === 'Magister 9B · on Mac mini').value; s.dispatchEvent(new Event('change')); }); await sleep(1500);
  const l1 = await p.evaluate(() => { const s = document.getElementById('l7HowModel'); const o = s.options[s.selectedIndex]; return { sel: o && o.textContent, lend: state.cloud.lendId, model: state.cloud.model, src: chatSource(), who: (document.querySelector('#page-lector .r365-who') || {}).textContent || '', plan: (document.getElementById('l7Model') || {}).textContent || '' }; });
  ok(l1.lend === 'mini0001' && l1.model === 'Magister 9B' && l1.src === 'cloud' && l1.sel === 'Magister 9B · on Mac mini', "choosing the Mac mini's Magister 9B connects to it, and the list shows it as the choice", l1);
  ok(/Magister 9B on Mac mini reads and writes/.test(l1.who) && /other computer reads and writes/i.test(l1.plan), "the line and Lector's panel say the Mac mini's model reads and writes", { who: l1.who, plan: l1.plan.slice(0, 120) });
  await p.screenshot({ path: OUT + '/1_lector_list.png' });
  // 3. a request answers through the computer
  const a1 = await p.evaluate(async () => { try { return await lxAsk({}, [{ role: 'user', content: 'Hello?' }], 64, 0.2, null); } catch (e) { return 'err ' + (e && e.message || e); } });
  ok(/Hello from the mac mini/i.test(a1), 'a reading request goes to the Mac mini', a1);
  // 4. the Mac mini stops answering for a while: Lector waits, says so, and goes on
  stop(MINI); await sleep(600);
  const started = Date.now();
  const pending = p.evaluate(async () => { const seen = []; try { const t = await lxAsk({}, [{ role: 'user', content: 'Still there?' }], 64, 0.2, (x) => { if (/Waiting for/.test(x)) seen.push(x); }); return { t, seen }; } catch (e) { return { err: String(e && e.message || e), seen }; } });
  await sleep(5000); MINI = lender(PM, 'mini0001', 'Mac mini', 'box');
  const r4 = await pending; r4.ms = Date.now() - started;
  ok(r4.t && /Hello from the (mac mini|hp laptop)/i.test(r4.t) && r4.seen.length >= 1 && /Waiting for Mac mini to answer again/.test(r4.seen[0]), 'when the Mac mini stops answering, the request waits, says so, and finishes once it answers again (it no longer stops the reading)', r4);
  // 5. a refusal still stops at once (the code)
  const r5 = await p.evaluate(() => IngLectorLend.transient({ message: 'The code is not the one that computer shows.', status: 401 }) === false && IngLectorLend.transient({ message: 'Failed to fetch' }) === true && IngLectorLend.transient({ message: 'answered 503', status: 503 }) === true);
  ok(r5, 'a refusal (401) stops; no answer, a dropped connection or a failing server are waited for', r5);
  // 6. back to this device
  await p.evaluate(() => { const s = document.getElementById('l7HowModel'); const o = [...s.options].find(x => !/^lend\|/.test(x.value)); s.value = o.value; s.dispatchEvent(new Event('change')); }); await sleep(1200);
  const l6 = await p.evaluate(() => ({ src: chatSource(), who: (document.querySelector('#page-lector .r365-who') || {}).textContent || '' }));
  ok(l6.src === 'local' && /on this device reads and writes/.test(l6.who), "choosing a model on this device leaves the computer", l6);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); stop(MINI); stop(HP); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
