// Asking and offering with Accept (modules/r360.js), and whose models answer (modules/r361.js): the pictures she sees before anything is
// released, from the running app: a real computer app (rig/run_app.py) named Atelier, and two devices, Reading Tablet and Pocket Phone
// (invented names). Each step's sheet, one picture each; the new parts ringed in Ingenium's violet; a plain backdrop behind each sheet, so
// no edge of a picture cuts through a line of words.
//   node capture_lend.js <folder holding ingenium_app.py (patched with app_ask_770.py) and ingenium.html (a test build)> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [APP, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const RUN_APP = path.join(__dirname, '..', '..', 'rig', 'run_app.py'); const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const home = path.join(OUT, '_mac', 'home'), dir = path.join(OUT, '_mac', 'app'); fs.mkdirSync(home, { recursive: true }); fs.mkdirSync(dir, { recursive: true });
for (const f of ['ingenium_app.py', 'ingenium.html']) fs.copyFileSync(path.join(APP, f), path.join(dir, f));
const pr = cp.spawn('python3', ['-I', RUN_APP, dir, '18995'], { env: Object.assign({}, process.env, { HOME: home, XDG_DATA_HOME: '', COMPUTERNAME: 'Atelier' }), stdio: ['ignore', 'pipe', 'pipe'] });
let out = ''; pr.stdout.on('data', (d) => out += d);
const api = (n, args) => fetch('http://127.0.0.1:18995/call/' + n, { method: 'POST', body: JSON.stringify(args || []) }).then((r) => r.json()).then((j) => { if (!j.ok) throw new Error(j.e); return j.v; });
const PLAIN = '.sl-veil{background:#efeaf6!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}body[data-theme="night"] .sl-veil{background:#1b1524!important}.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:6px!important}';
async function shot(pg, sel, key, ring) { await pg.evaluate(([css, ring, sel]) => { let st = document.getElementById('pvCss'); if (!st) { st = document.createElement('style'); st.id = 'pvCss'; document.head.appendChild(st); } st.textContent = css;
    document.querySelectorAll('.pv-ring').forEach((x) => x.classList.remove('pv-ring')); if (ring) document.querySelectorAll(ring).forEach((x) => x.classList.add('pv-ring'));
    const t = document.getElementById('ingToast'); if (t) t.style.display = 'none'; try { document.activeElement.blur(); } catch (e) {}
    let bk = document.getElementById('pvBack'); if (!bk) { bk = document.createElement('div'); bk.id = 'pvBack'; document.body.appendChild(bk); }
    const night = document.body.getAttribute('data-theme') === 'night', modal = /sl-sheet/.test(sel);
    bk.style.cssText = 'position:fixed;inset:0;z-index:' + (modal ? 2147482999 : -1) + ';background:' + (night ? '#1b1524' : '#efeaf6') + ';display:' + (modal ? 'block' : 'none'); }, [PLAIN, ring, sel]);
  await pg.mouse.move(2, 2); await sleep(900);
  const b = await pg.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }, sel);
  if (!b) { console.log(key, 'NOT TAKEN: no', sel); return; }
  const pad = /sl-sheet/.test(sel) ? 30 : 16, vw = pg.viewportSize();
  await pg.screenshot({ path: path.join(OUT, key + '.png'), clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: Math.min(vw.width, b.w + 2 * pad), height: Math.min(vw.height, b.h + 2 * pad) } }); console.log(key, 'taken'); }
const enter = async (pg) => { await pg.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await pg.waitForTimeout(1200);
  await pg.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await pg.waitForTimeout(800);
  await pg.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const k = [...document.querySelectorAll('.tg-veil button')].find((x) => x.offsetParent && !x.disabled); if (k) k.click(); state.theme = 'day'; applyTheme(); }); };
(async () => {
  let ia = null; for (let i = 0; i < 240 && !ia; i++) { const m = /\{"page_port".*\}/.exec(out); if (m) ia = JSON.parse(m[0]); else await sleep(250); }
  const b = await pw.chromium.launch(); const errs = [];
  const ca = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  await ca.addInitScript(({ names }) => { const a = {}; for (const n of names) a[n] = (...args) => fetch('http://127.0.0.1:18995/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then((r) => r.json()).then((j) => { if (!j.ok) throw new Error(j.e); return j.v; });
    window.pywebview = { api: a }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); }, { names: ia.names });
  const p = await ca.newPage(); p.on('pageerror', (e) => errs.push('mac: ' + e.message.slice(0, 200)));
  await p.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await enter(p);
  const s0 = await api('share_set', [true]); await api('share_runs_set', [true]); const SP = s0.port;
  const dev = async (id, kind, name) => { const c = await b.newContext({ viewport: { width: 1180, height: 860 }, deviceScaleFactor: 2 });
    await c.addInitScript(([id, kind, name]) => { try { localStorage.setItem('ing.lend.device', JSON.stringify({ id, kind, name })); } catch (e) {} }, [id, kind, name]);
    const q = await c.newPage(); q.on('pageerror', (e) => errs.push(name + ': ' + e.message.slice(0, 200)));
    await q.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await enter(q); return q; };
  const q = await dev('dreadingtab01', 'tablet', 'Reading Tablet');
  // 1 to 4: the tablet asks; Atelier accepts
  await q.evaluate((port) => { window.__a = IngLend.ask('127.0.0.1:' + port, 'use').catch(() => null); }, SP);
  await q.waitForSelector('#sealPair .sl-word'); await p.waitForSelector('#sealAsk .sl-word');
  await shot(p, '#sealAsk .sl-sheet', '01-computer-asked', '#sealAsk .sl-sheet');
  await shot(q, '#sealPair .sl-sheet', '02-device-asking', '#sealPair .sl-sheet');
  await p.click('#sealAsk .sl-key.pri'); await p.waitForSelector('#akDone'); await q.waitForSelector('#akDone', { timeout: 60000 }); await q.evaluate(() => window.__a);
  await shot(p, '#akDone .sl-sheet', '03-computer-accepted', '#akDone .sl-sheet');
  await shot(q, '#akDone .sl-sheet', '04-device-accepted', '#akDone .sl-sheet');
  await p.evaluate(() => document.getElementById('akDone').remove()); await q.evaluate(() => document.getElementById('akDone').remove());
  // 5 and 6: the phone asks; Atelier declines
  const q2 = await dev('dpocketphone1', 'phone', 'Pocket Phone');
  await q2.evaluate((port) => { window.__a = IngLend.ask('127.0.0.1:' + port, 'use').catch(() => null); }, SP);
  await p.waitForSelector('#sealAsk .sl-key'); await p.click('#sealAsk .sl-key:not(.pri)'); await p.waitForSelector('#akDone'); await q2.waitForSelector('#akDone', { timeout: 60000 });
  await shot(p, '#akDone .sl-sheet', '05-computer-declined', '#akDone .sl-sheet');
  await shot(q2, '#akDone .sl-sheet', '06-device-declined', '#akDone .sl-sheet');
  await p.evaluate(() => document.getElementById('akDone').remove()); await q2.evaluate(() => document.getElementById('akDone').remove());
  // 7: Offer my models, beside the phone in Atelier's list of devices
  await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'ai', true); } catch (e) {} setTimeout(() => { const t = [...document.querySelectorAll('button,[role=tab]')].find((x) => x.offsetParent && /^Your devices/.test(x.textContent.trim())); if (t) t.click(); }, 800); }); await sleep(2500);
  await sleep(11500);   /* the lender's card reads the computer's state again every ten seconds while it is in view */
  await p.evaluate(() => { const c = document.getElementById('linkCard'); if (c) c.scrollIntoView({ block: 'start' }); }); await sleep(1500);
  const offerKey = await p.evaluate(() => { const k = [...document.querySelectorAll('#linkCard .ld-plate button')].find((x) => /Offer my models/.test(x.textContent)); if (!k) return null; k.closest('.ld-plate').id = 'pvRow'; k.id = 'pvOffer'; k.closest('.ld-plate').scrollIntoView({ block: 'center' }); return true; });
  if (offerKey) { await sleep(800); await shot(p, '#pvRow', '07-computer-offer-key', '#pvOffer'); }
  else console.log('07 NOT TAKEN: no Offer my models key');
  // 8 to 11: Atelier offers its models to the phone: it declines, then, offered again, accepts
  await api('share_offer', ['dpocketphone1', true]);
  await q2.evaluate((port) => { const f = IngLend.found; IngLend.found = () => [{ address: '127.0.0.1:' + port }].concat(f ? f() : []); IngAsk._offerPoll(); }, SP);
  await q2.waitForSelector('#akOffer');
  await shot(q2, '#akOffer .sl-sheet', '08-device-offered', '#akOffer .sl-sheet');
  await q2.click('#akOffer .sl-key:not(.pri)'); await q2.waitForSelector('#akDone');
  await p.evaluate(() => IngAsk._lenderPoll()); await p.waitForSelector('#akDone');
  await shot(p, '#akDone .sl-sheet', '09-computer-offer-declined', '#akDone .sl-sheet');
  await p.evaluate(() => document.getElementById('akDone').remove()); await q2.evaluate(() => document.getElementById('akDone').remove());
  await api('share_offer', ['dpocketphone1', true]); await q2.evaluate(() => { for (const k in IngAsk._seen) delete IngAsk._seen[k]; IngAsk._offerPoll(); });
  await q2.waitForSelector('#akOffer'); await q2.click('#akOffer .sl-key.pri'); await q2.waitForSelector('#akDone', { timeout: 60000 });
  await shot(q2, '#akDone .sl-sheet', '10-device-offer-accepted', '#akDone .sl-sheet');
  await p.evaluate(() => IngAsk._lenderPoll()); await p.waitForSelector('#akDone');
  await shot(p, '#akDone .sl-sheet', '11-computer-offer-accepted', '#akDone .sl-sheet');
  await p.evaluate(() => document.getElementById('akDone').remove()); await q2.evaluate(() => document.getElementById('akDone').remove());
  // 12: the tablet's card for Atelier, with its colour and the eight swatches
  const st = await q.evaluate(() => IngLend.state().computers.map((c) => c.id)); const cid = st[0];
  await q.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'ai', true); } catch (e) {} setTimeout(() => { const t = [...document.querySelectorAll('button,[role=tab]')].find((x) => x.offsetParent && /^Your devices/.test(x.textContent.trim())); if (t) t.click(); }, 800); }); await sleep(2500);
  await q.evaluate(() => { try { IngLend.repaint(); } catch (e) {} IngLendMeter._decorate(); const box = document.querySelector('#linkCard .ld-comp[data-comp]'); if (box) { box.scrollIntoView({ block: 'center' }); const k = box.querySelector('.ak-ckey'); if (k) k.click(); } }); await sleep(1200);
  await shot(q, '#linkCard .ld-comp[data-comp]', '12-device-colour', '#linkCard .ld-comp[data-comp] .ak-ckey,#linkCard .ld-comp[data-comp] .ak-sw');
  // the devices use Atelier's models
  await q.evaluate(async (id) => { try { await IngLend.request(id, 'POST', '/v1/chat/completions', JSON.stringify({ model: 'Atelier model', messages: [{ role: 'user', content: 'hello' }] })); } catch (e) {} }, cid);
  await q2.evaluate(async () => { const c = IngLend.state().computers[0]; try { await IngLend.request(c.id, 'POST', '/v1/chat/completions', JSON.stringify({ model: 'Atelier model', messages: [{ role: 'user', content: 'hi' }] })); } catch (e) {} });
  // 13 and 14: the glow: the tablet answering through Atelier (inward), Atelier lending (outward)
  const alone = (pg, sel) => pg.evaluate((sel) => { const e = document.querySelector(sel); if (!e) return; e.scrollIntoView({ block: 'center' }); [...e.parentNode.children].forEach((x) => { if (x !== e) x.style.visibility = 'hidden'; }); e.id = e.id || 'pvAlone'; }, sel);
  const still = (pg, d) => pg.evaluate((d) => { window.__pvDelay = d; const st = document.createElement('style'); st.textContent = '.ak-glow{animation-play-state:paused!important;animation-delay:'+(window.__pvDelay||'-0.5s')+'!important}'; document.head.appendChild(st); }, d);
  await q.evaluate((id) => { const c = IngLend.state().computers.find((x) => x.id === id) || {}; state.cloud = Object.assign({}, state.cloud || {}, { provider: 'ingenium', on: true, lendId: id, base: (c.base || '') + '/v1', key: 'ASKD-SEAL', model: 'Qwen3 4B Instruct', models: ['Qwen3 4B Instruct'] }); state.chatSource = 'cloud'; try { saveState(); } catch (e) {} go('chat'); }, cid); await sleep(2500);
  await q.evaluate(() => IngLendMeter._paint()); await sleep(300); await still(q, '-2.05s'); await alone(q, '#chatModelBtn'); await sleep(500);
  await shot(q, '#chatModelBtn', '13-device-glow-inward', '');
  await sleep(5000); await p.evaluate(() => { go('chat'); IngLendMeter._paint(); }); await sleep(800); await still(p, '-0.35s'); await alone(p, '#activeModelPill'); await sleep(500);
  console.log('mac glow', JSON.stringify(await p.evaluate(() => ({ st: IngLendMeter._state, cls: document.getElementById('activeModelPill').className, c: document.getElementById('activeModelPill').style.getPropertyValue('--ak-c') }))));
  await shot(p, '#activeModelPill', '14-computer-glow-outward', '');
  await p.evaluate(() => { const e = document.getElementById('activeModelPill'); [...e.parentNode.children].forEach((x) => { x.style.visibility = ''; }); });
  // 15 and 16: Mentes on Atelier, lending: the meter, by day and by night
  await sleep(4500);
  await p.evaluate(() => go('models')); await sleep(5000);
  await p.evaluate(() => { const c = document.getElementById('akMeterCard'); if (c && c.previousElementSibling) c.previousElementSibling.style.visibility = 'hidden'; c.scrollIntoView({ block: 'center' }); }); await sleep(800);
  await shot(p, '#akMeterCard', '15-mentes-meter', '#akMeterCard');
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await sleep(2500);
  await shot(p, '#akMeterCard', '16-mentes-meter-night', '#akMeterCard');
  fs.writeFileSync(path.join(OUT, 'errors.txt'), errs.join('\n')); console.log('page errors:', errs.length, errs.slice(0, 3));
  await b.close(); pr.kill(); process.exit(0);
})().catch((e) => { console.log('FAILED', e && e.stack || e); try { pr.kill(); } catch (x) {} process.exit(1); });
