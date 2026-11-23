// Ingenium 7.70: asking and offering with Accept (modules/r360.js, build/desktop/app_ask_770.py; the hooks in r319 and r274), and whose
// models answer (modules/r361.js: the who-answers glow, the colours, Mentes' memory meter and each device's use).
//   node rig/t_770_ask.js <folder holding ingenium_app.py (patched with app_ask_770.py) and ingenium.html (a test build)> <out folder>
// A real computer app runs here (rig/run_app.py) as the Mac, its page bridged as window.pywebview.api; plain browsers are her devices.
// Invented names only. Checks:
//   1. the Mac's hello says it can be asked; a device asks to use its models without the code: both screens show the same four words;
//      on the Mac, "<device> asks to use your models", Accept and Decline
//   2. Accept: on the Mac, "Your models can now be used by <device>." with Go to the Mentes page; on the device, "<Mac> accepted: you can
//      now use <Mac>'s models."; the device is paired, sealed, with no code typed
//   3. a second device asks; Decline: on the Mac, "You declined <device>'s request."; on the device, "<Mac> declined your request."
//   4. the Mac offers its models to the second device: it sees "<Mac> offers to lend you its models", declines: "You declined <Mac>'s
//      request."; on the Mac, "<device> declined your request."; offered again, it accepts: "<Mac>'s models are now available for you to
//      use."; on the Mac, "<device> accepted: your models are now lent to <device>."; an offer to a device nearby is taken by the first
//      device that accepts it, and by no other
//   5. the device that cannot seal is told to type the code; asking while the Mac does not lend is refused plainly
//   6. usage: the Mac counts each device's requests to its models (share_usage); its memory now (share_memory)
//   7. the glow: the device using the Mac's models pulses inward in the Mac's colour; the Mac, lending while a device used it, outward,
//      in the same colour; a colour chosen on the device changes its glow; Mentes on the Mac: the Lending key at the end of its tabs (her
//      Design B, 7.71), folded; pressed, its panel with the meter and each device's use; pressing elsewhere folds it
//   8. every new sheet lifts under the pointer; no page errors
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [APP, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
setTimeout(() => { console.log('FAIL the test did not finish in 40 minutes'); process.exit(3); }, 40 * 60 * 1000).unref();
const RUN_APP = path.join(__dirname, 'run_app.py');
function start(name, apiPort) { const home = path.join(OUT, name, 'home'), dir = path.join(OUT, name, 'app'); fs.mkdirSync(home, { recursive: true }); fs.mkdirSync(dir, { recursive: true });
  for (const f of ['ingenium_app.py', 'ingenium.html']) fs.copyFileSync(path.join(APP, f), path.join(dir, f));
  const pr = cp.spawn('python3', ['-I', RUN_APP, dir, String(apiPort)], { env: Object.assign({}, process.env, { HOME: home, XDG_DATA_HOME: '' }), stdio: ['ignore', 'pipe', 'pipe'] });
  let out = '', err = ''; pr.stdout.on('data', (d) => out += d); pr.stderr.on('data', (d) => err += d);
  return { pr, port: apiPort, err: () => err, ready: async () => { for (let i = 0; i < 240; i++) { const m = /\{"page_port".*\}/.exec(out); if (m) return JSON.parse(m[0]); await new Promise((r) => setTimeout(r, 250)); } throw new Error('the app did not start: ' + err.slice(-800)); } };
}
const api = (port, n, args) => fetch('http://127.0.0.1:' + port + '/call/' + n, { method: 'POST', body: JSON.stringify(args || []) }).then((r) => r.json()).then((j) => { if (!j.ok) throw new Error(j.e); return j.v; });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const enter = async (pg) => { await pg.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await pg.waitForTimeout(1200);
  await pg.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await pg.waitForTimeout(800);
  await pg.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const g = [...document.querySelectorAll('button')].find((x) => /^I agree$/.test(x.textContent.trim()) && x.offsetParent && !x.disabled); if (g) g.click(); }); };
const text = (pg, sel) => pg.evaluate((s) => { const e = document.querySelector(s); return e ? e.innerText.replace(/\s+/g, ' ').trim() : null; }, sel);
const waitSel = (pg, sel, ms) => pg.waitForSelector(sel, { timeout: ms || 30000 }).then(() => true, () => false);
(async () => {
  const A = start('mac', 18996);
  let ia; try { ia = await A.ready(); } catch (e) { ok(false, 'the computer app starts', String(e)); process.exit(2); }
  ok(['share_asks', 'share_offer', 'share_usage', 'share_memory', 'seal_pending'].every((n) => ia.names.includes(n)), 'the computer app runs here, with share_asks, share_offer, share_usage and share_memory');
  const b = await pw.chromium.launch(); const errs = [];
  const ca = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  await ca.addInitScript(({ names, port }) => { const a = {}; for (const n of names) a[n] = (...args) => fetch('http://127.0.0.1:' + port + '/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then((r) => r.json()).then((j) => { if (!j.ok) throw new Error(j.e); return j.v; });
    window.pywebview = { api: a }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); }, { names: ia.names, port: A.port });
  const p = await ca.newPage(); p.setDefaultTimeout(180000); p.on('pageerror', (e) => errs.push('mac: ' + e.message.slice(0, 200)));
  await p.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await enter(p);
  const s0 = await api(A.port, 'share_set', [true]); const SP = s0.port, base = 'http://127.0.0.1:' + SP, macName = s0.computer || 'this computer';
  await api(A.port, 'share_runs_set', [true]);   // no model is installed here: a computer that runs Fabrica's jobs pairs with none (as rig/t_737_seal.js)
  const hello = await (await fetch(base + '/ingenium/hello')).json();
  ok(hello.ask === 1 && hello.seal === 1 && Array.isArray(hello.offers), "the Mac's hello says it can be asked, seals, and names its offers", { ask: hello.ask, seal: hello.seal, offers: hello.offers });

  /* 1 and 2: a device asks, the Mac accepts */
  const mkDev = async (name) => { const c = await b.newContext({ viewport: { width: 1180, height: 820 } }); const q = await c.newPage(); q.setDefaultTimeout(180000); q.on('pageerror', (e) => errs.push(name + ': ' + e.message.slice(0, 200)));
    await q.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await enter(q); return { c, q }; };
  const D1 = await mkDev('tablet'); const q = D1.q;
  await q.evaluate((port) => { window.__ask = IngLend.ask('127.0.0.1:' + port, 'use').then((c) => ({ id: c.id, name: c.name }), (e) => ({ err: String(e && e.message || e) })); }, SP);
  await waitSel(q, '#sealPair .sl-word'); await waitSel(p, '#sealAsk .sl-word');
  const wq = await q.evaluate(() => [...document.querySelectorAll('#sealPair .sl-word')].map((x) => x.lastChild.textContent));
  const wp = await p.evaluate(() => ({ h: document.querySelector('#sealAsk h2').textContent, w: [...document.querySelectorAll('#sealAsk .sl-word')].map((x) => x.lastChild.textContent), keys: [...document.querySelectorAll('#sealAsk .sl-key')].map((x) => x.textContent) }));
  const devName = (wp.h || '').replace(/ asks to use your models$/, '');
  ok(wq.length === 4 && JSON.stringify(wq) === JSON.stringify(wp.w), 'both screens show the same four words', { device: wq, mac: wp.w });
  ok(/ asks to use your models$/.test(wp.h) && wp.keys.join('|') === 'Accept|Decline', 'on the Mac: "<device> asks to use your models", Accept and Decline', wp);
  const qw = await text(q, '#sealPair'); ok(/Asked .* to use its models/.test(qw || '') && /Stop asking/.test(qw || ''), 'on the device: Asked <Mac> to use its models, with Stop asking', qw);
  await p.screenshot({ path: OUT + '/mac_ask.png' }); await q.screenshot({ path: OUT + '/device_asked.png' });
  await p.click('#sealAsk .sl-key.pri');
  const r1 = await q.evaluate(() => window.__ask);
  ok(r1 && r1.id && !r1.err, 'Accept: the device is paired, with no code typed', r1);
  await waitSel(p, '#akDone'); const md = await text(p, '#akDone');
  ok(md && md.indexOf('Your models can now be used by ' + devName + '.') >= 0 && md.indexOf('Go to the Mentes page to track ' + devName + '’s usage.') >= 0 && /Go to Mentes/.test(md), 'on the Mac: "Your models can now be used by <device>. Go to the Mentes page to track <device>\'s usage."', md);
  await waitSel(q, '#akDone'); const dd = await text(q, '#akDone');
  ok(dd && dd.indexOf(macName + ' accepted: you can now use ' + macName + '’s models.') >= 0, 'on the device: "<Mac> accepted: you can now use <Mac>\'s models."', { dd, macName });
  const sealed = await q.evaluate(() => (window.IngSealing && IngSealing.computers ? IngSealing.computers() : []).length);
  ok(sealed === 1, 'the device holds its sealed key for the Mac', sealed);
  await p.evaluate(() => { const v = document.getElementById('akDone'); if (v) v.remove(); }); await q.evaluate(() => { const v = document.getElementById('akDone'); if (v) v.remove(); });

  /* 3: a second device asks; the Mac declines */
  const D2 = await mkDev('phone'); const q2 = D2.q;
  await q2.evaluate((port) => { window.__ask = IngLend.ask('127.0.0.1:' + port, 'use').then((c) => ({ id: c.id }), (e) => ({ err: String(e && e.message || e) })); }, SP);
  await waitSel(p, '#sealAsk .sl-key'); const dn2 = (await text(p, '#sealAsk h2') || '').replace(/ asks to use your models$/, '');
  await p.click('#sealAsk .sl-key:not(.pri)');
  await waitSel(p, '#akDone'); const md2 = await text(p, '#akDone');
  ok(md2 && md2.indexOf('You declined ' + dn2 + '’s request.') >= 0, 'Decline: on the Mac, "You declined <device>\'s request."', md2);
  const r2 = await q2.evaluate(() => window.__ask);
  await waitSel(q2, '#akDone'); const dd2 = await text(q2, '#akDone');
  ok(r2 && r2.err && dd2 && dd2.indexOf(macName + ' declined your request.') >= 0, 'on the device: "<Mac> declined your request."', { r2, dd2 });
  await p.evaluate(() => { const v = document.getElementById('akDone'); if (v) v.remove(); }); await q2.evaluate(() => { const v = document.getElementById('akDone'); if (v) v.remove(); });

  /* 4: the Mac offers its models to the second device */
  const dev2 = await q2.evaluate(() => IngLend.me().id);
  await api(A.port, 'share_offer', [dev2, true]);
  await q2.evaluate((port) => { IngAsk._seen = {}; IngLend.state(); return IngLend.hello('127.0.0.1:' + port); }, SP);
  await q2.evaluate((port) => { window.__offerBase = '127.0.0.1:' + port; }, SP);
  // the device looks for computers it knows of: give it the Mac's address as found, then let it look
  await q2.evaluate((port) => { const f = IngLend.found; IngLend.found = () => [{ address: '127.0.0.1:' + port, computer: 'x' }].concat(f ? f() : []); IngAsk._offerPoll(); }, SP);
  const sawOffer = await waitSel(q2, '#akOffer');
  const of1 = await text(q2, '#akOffer');
  ok(sawOffer && of1 && of1.indexOf(macName + ' offers to lend you its models') >= 0 && /Accept/.test(of1) && /Decline/.test(of1), 'on the device: "<Mac> offers to lend you its models", Accept and Decline', of1);
  await q2.click('#akOffer .sl-key:not(.pri)');
  await waitSel(q2, '#akDone'); const dd3 = await text(q2, '#akDone');
  ok(dd3 && dd3.indexOf('You declined ' + macName + '’s request.') >= 0, 'declined: on the device, "You declined <Mac>\'s request."', dd3);
  await p.evaluate(() => IngAsk._lenderPoll()); await waitSel(p, '#akDone'); const md3 = await text(p, '#akDone');
  ok(md3 && md3.indexOf(' declined your request.') >= 0, 'on the Mac: "<device> declined your request."', md3);
  await p.evaluate(() => { const v = document.getElementById('akDone'); if (v) v.remove(); }); await q2.evaluate(() => { const v = document.getElementById('akDone'); if (v) v.remove(); });
  await api(A.port, 'share_offer', [dev2, true]);
  await q2.evaluate(() => { for (const k in IngAsk._seen) delete IngAsk._seen[k]; IngAsk._offerPoll(); });
  await waitSel(q2, '#akOffer'); await q2.click('#akOffer .sl-key.pri');
  await waitSel(q2, '#akDone', 60000); const dd4 = await text(q2, '#akDone');
  ok(dd4 && dd4.indexOf(macName + '’s models are now available for you to use.') >= 0, 'accepted: on the device, "<Mac>\'s models are now available for you to use."', dd4);
  await p.evaluate(() => IngAsk._lenderPoll()); await waitSel(p, '#akDone'); const md4 = await text(p, '#akDone');
  ok(md4 && / accepted: your models are now lent to /.test(md4) && /Go to the Mentes page to track/.test(md4), 'on the Mac: "<device> accepted: your models are now lent to <device>. Go to the Mentes page …"', md4);
  await p.evaluate(() => { const v = document.getElementById('akDone'); if (v) v.remove(); }); await q2.evaluate(() => { const v = document.getElementById('akDone'); if (v) v.remove(); });

  /* 4b: an offer to "a device nearby" is taken by the first device that accepts it, and by no other */
  const rawKey = async () => { const k = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']); return Buffer.from(await crypto.subtle.exportKey('raw', k.publicKey)).toString('base64'); };
  const askOffer = async (id, name) => fetch(base + '/ingenium/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, kind: 'tablet', name, pub: await rawKey(), mode: 'offer' }) }).then((r) => r.json(), (e) => ({ err: String(e) }));
  await api(A.port, 'share_offer', ['*', true]);
  const near1 = await askOffer('near-device-01', 'Near Tablet'), near2 = await askOffer('near-device-02', 'Other Tablet');
  const hello2 = await fetch(base + '/ingenium/hello').then((r) => r.json(), () => ({}));
  ok(near1 && near1.state === 'ok' && near2 && near2.state === 'gone' && !(hello2.offers || []).includes('*'), 'an offer to a device nearby is taken by the first device that accepts it, and by no other', { near1: near1 && near1.state, near2, offers: hello2.offers });

  /* 5: refusals in plain words */
  const noPub = await (await fetch(base + '/ingenium/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: 'plain-device-01', kind: 'browser', name: 'Old browser' }) })).json();
  ok(/type the code/i.test(JSON.stringify(noPub)), 'a device that cannot seal is told to type the code', noPub);
  await api(A.port, 'share_set', [false]);
  const off = await fetch(base + '/ingenium/hello').then((r) => r.json(), () => null);
  await api(A.port, 'share_runs_set', [true]);
  const offAsk = await fetch(base + '/ingenium/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: 'x', kind: 'browser', name: 'x', pub: 'BA' + 'A'.repeat(86) }) }).then((r) => r.json(), (e) => ({ err: String(e) }));
  ok(/not lending|Only a device that seals/.test(JSON.stringify(offAsk)), 'asking while the Mac does not lend is refused plainly', { offAsk, off: off && off.lends });
  await api(A.port, 'share_set', [true]);

  /* 6: usage and memory */
  const cid = r1.id;
  const chat = await q.evaluate(async (id) => { try { const r = await IngLend.request(id, 'POST', '/v1/chat/completions', JSON.stringify({ model: 'none', messages: [{ role: 'user', content: 'hello' }] })); return { status: r.status }; } catch (e) { return { err: String(e && e.message || e) }; } }, cid);
  await sleep(500);
  const use = await api(A.port, 'share_usage', []);
  const mine = (use.devices || []).find((d) => d.today >= 1);
  ok(use.ok && mine && mine.all >= 1, "the Mac counts each device's requests to its models", { use, chat });
  const mem = await api(A.port, 'share_memory', []);
  ok(mem.ok && mem.total > 0 && mem.used >= 0 && mem.used <= mem.total, 'the Mac measures its memory now', mem);

  /* 7: the glow, the colours, the meter */
  await q.evaluate((id) => { const c = IngLend.state().computers.find((x) => x.id === id); state.cloud = Object.assign({}, state.cloud || {}, { provider: 'ingenium', lendId: id }); state.chatSource = 'cloud'; try { window.chatSource = () => 'cloud'; } catch (e) {} IngLendMeter._paint(); }, cid);
  await sleep(600);
  const gq = await q.evaluate(() => { const k = document.getElementById('chatModelBtn') || document.getElementById('activeModelPill'); return k ? { cls: k.className, c: k.style.getPropertyValue('--ak-c'), anim: getComputedStyle(k).animationName, dir: getComputedStyle(k).animationDirection } : null; });
  const macColor = await q.evaluate((id) => IngLendMeter.colorOf(id), cid);
  ok(gq && /ak-glow/.test(gq.cls) && /ak-in/.test(gq.cls) && gq.c === macColor && gq.anim === 'akPulse' && gq.dir === 'reverse', "the device using the Mac's models: its who-answers key pulses inward in the Mac's colour", gq);
  await p.evaluate(() => { IngLendMeter._state.recent = true; IngLendMeter._state.on = true; IngLendMeter._paint(); }); await sleep(400);
  const gp = await p.evaluate(() => { const k = document.getElementById('activeModelPill') || document.getElementById('chatModelBtn'); return k ? { cls: k.className, c: k.style.getPropertyValue('--ak-c'), dir: getComputedStyle(k).animationDirection } : null; });
  const ownColor = await p.evaluate(() => IngLendMeter.colorOf(IngLendMeter._state.id));
  ok(gp && /ak-glow/.test(gp.cls) && !/ak-in/.test(gp.cls) && gp.dir === 'normal' && gp.c === ownColor && ownColor === macColor, 'the Mac lending: the same ring pulses outward, in the same colour on both', { gp, ownColor, macColor });
  await q.evaluate((id) => IngLendMeter.choose(id, (IngLendMeter.palette.findIndex((x) => x[1] === IngLendMeter.colorOf(id)) + 1) % 8), cid); await sleep(300);
  const gq2 = await q.evaluate(() => (document.getElementById('chatModelBtn') || document.getElementById('activeModelPill')).style.getPropertyValue('--ak-c'));
  ok(gq2 && gq2 !== macColor, 'a colour chosen on the device changes its glow', { before: macColor, after: gq2 });
  await p.evaluate(() => go('models')); await sleep(2500);
  // 7.71, her Design B: a key at the end of Mentes' tabs, folded; pressed, a small panel with the meter and each device's use
  const kb = await p.evaluate(() => { const w = document.getElementById('akLend'), k = document.getElementById('akLendKey'), c = document.getElementById('akMeterCard'), bar = document.querySelector('#page-models [id^="rmBar-"]');
    return w && k && c ? { inBar: !!(bar && bar.contains(w)), last: w === w.parentNode.lastElementChild, shown: !w.hidden && !!k.offsetParent, folded: c.hidden, exp: k.getAttribute('aria-expanded'), lit: k.querySelectorAll('.akB-lv i.on').length, gb: k.querySelector('small').textContent } : null; });
  ok(kb && kb.inBar && kb.last && kb.shown && kb.folded && kb.exp === 'false' && kb.lit > 0 && /GB$/.test(kb.gb), "Mentes on the Mac: the Lending key at the end of Mentes' tabs, folded, its level lit and the memory in use on it", kb);
  // the offer taken by a device nearby (4b) told the Mac in a sheet of its own: closed first, as she would
  await p.evaluate(() => { const v = document.getElementById('akDone'); if (v) { const k = [...v.querySelectorAll('button')].find((x) => /^Close$/.test(x.textContent.trim())); if (k) k.click(); else v.remove(); } }); await sleep(600);
  await p.click('#akLendKey'); await sleep(900);
  const mc = await p.evaluate(() => { const c = document.getElementById('akMeterCard'); return c ? { hidden: c.hidden, exp: document.getElementById('akLendKey').getAttribute('aria-expanded'), segs: c.querySelectorAll('.ak-seg').length, on: c.querySelectorAll('.ak-seg.on').length, read: (document.getElementById('akRead') || {}).textContent, uses: c.querySelectorAll('.ak-use').length } : null; });
  ok(mc && !mc.hidden && mc.exp === 'true' && mc.segs === 32 && mc.on > 0 && / of .* GB in use/.test(mc.read || '') && mc.uses >= 1, 'pressed, its panel shows the memory in use, lit like a level meter, and each device\'s use', mc);
  await p.screenshot({ path: OUT + '/mac_mentes.png' });
  await p.mouse.click(30, 700); await sleep(500);
  const folded = await p.evaluate(() => document.getElementById('akMeterCard').hidden);
  ok(folded === true, 'pressing elsewhere folds it again', folded);
  await api(A.port, 'share_set', [false]); await sleep(4800);
  const mc2 = await p.evaluate(() => { const w = document.getElementById('akLend'); return w ? w.hidden : 'none'; });
  ok(mc2 === true || mc2 === 'none', 'the key goes when the Mac stops lending', mc2);

  /* 8 */
  ok(errs.length === 0, 'no page errors', errs);
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); A.pr.kill(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test stopped: ' + (e && e.stack || e)); process.exit(1); });
