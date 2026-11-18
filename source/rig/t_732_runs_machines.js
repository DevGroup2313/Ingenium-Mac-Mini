// Ingenium 7.32: Fabrica's runs on her other computers, stage 2, the page's side (modules/r298.js, modules/r274.js; the computer's side,
// build/desktop/app_runs_728.py, since 7.28), as her approved phase 3 preview has them (source/previews/fabrica_p3: MACHINES, machines(),
// runSheet()). Two real computer apps run here (rig/run_app.py, each with HOME in a folder of its own): "this computer" (A), whose page is
// driven with its own functions as window.pywebview.api, and "the other computer" (B), which runs Fabrica's jobs for her devices. A plain
// browser with no computer app (as the Fire tablet, the iPhone or the iPad) is the third device. Checks:
//   - Settings, Your devices, on a computer app: the switch Run Fabrica's jobs for my devices (share_runs_set), on and off;
//   - a computer that runs jobs and lends no models pairs (its hello says runs: 1), and is kept with runs: 1;
//   - Fabrica's Machines: B as a machine, Ready, with its tools; Add a machine says how;
//   - the run sheet offers As the workflow says, Only on this computer, Only on B, and GitHub's machines (later, not pressable);
//   - Only on B: the run is made on B, the app's files sent, started, followed; its record says where it ran; its log and its file read
//     back here; once ended, a copy is kept on A (runs_keep_copy, runs_keep_log, runs_keep_file) and stands for it in the list;
//   - As the workflow says: the Linux job here (this computer first), the Windows job said as not run (no computer of hers runs Windows);
//   - the browser with no computer app sends a run to B and reads its log;
//   - B's runs switched off: Check it again says Runs off there;
//   - no page errors.
//   node rig/t_732_runs_machines.js <folder holding ingenium_app.py (patched) and ingenium.html> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [APP, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const RUN_APP = path.join(__dirname, 'run_app.py');
function start(name, apiPort) { const home = path.join(OUT, name, 'home'), dir = path.join(OUT, name, 'app'); fs.mkdirSync(home, { recursive: true }); fs.mkdirSync(dir, { recursive: true });
  for (const f of ['ingenium_app.py', 'ingenium.html']) fs.copyFileSync(path.join(APP, f), path.join(dir, f));
  const pr = cp.spawn('python3', ['-I', RUN_APP, dir, String(apiPort)], { env: Object.assign({}, process.env, { HOME: home, XDG_DATA_HOME: '' }), stdio: ['ignore', 'pipe', 'pipe'] });
  let out = '', err = ''; pr.stdout.on('data', d => out += d); pr.stderr.on('data', d => err += d);
  return { pr, port: apiPort, ready: async () => { for (let i = 0; i < 240; i++) { const m = /\{"page_port".*\}/.exec(out); if (m) return JSON.parse(m[0]); await new Promise(r => setTimeout(r, 250)); } throw new Error(name + ' did not start: ' + err.slice(-800)); }, err: () => err }; }
const api = (port, n, args) => fetch('http://127.0.0.1:' + port + '/call/' + n, { method: 'POST', body: JSON.stringify(args || []) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
const WF = ['name: Build', 'on: [workflow_dispatch]', 'jobs:', '  linux:', '    name: Linux', '    runs-on: ubuntu-latest', '    steps:',
  '      - name: Say hello', '        run: echo "hello from the machine" && mkdir -p out && echo made > out/made.txt',
  '      - uses: actions/upload-artifact@v4', '        with:', '          name: made', '          path: out/made.txt',
  '  win:', '    name: Windows', '    runs-on: windows-latest', '    steps:', '      - run: echo windows'].join('\n') + '\n';
(async () => {
  const A = start('a', 18961), B = start('b', 18962); let ia, ib;
  try { ia = await A.ready(); ib = await B.ready(); } catch (e) { ok(false, 'both computer apps start', String(e)); process.exit(2); }
  ok(ia.names.includes('share_runs_set') && ia.names.includes('runs_keep_copy'), 'both computer apps run here, with stage 1\'s functions', { a: ia.page_port, b: ib.page_port });
  const sb = await api(B.port, 'share_runs_set', [true]); const code = sb.code, bport = sb.port, bname = sb.computer;
  ok(sb.runs_on === true && sb.running && bport && code, 'the other computer runs Fabrica\'s jobs for her devices (its switch on)', { runs_on: sb.runs_on, port: bport, name: bname });
  const b = await pw.chromium.launch(); const errs = [];
  // ---- device A: a computer app, its own functions as window.pywebview.api ----
  const ca = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ca.addInitScript(({ names, port }) => { const a = {}; for (const n of names) a[n] = (...args) => fetch('http://127.0.0.1:' + port + '/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
    window.pywebview = { api: a }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); }, { names: ia.names, port: A.port });
  const p = await ca.newPage(); p.setDefaultTimeout(180000); p.on('pageerror', e => errs.push('A: ' + e.message.slice(0, 200)));
  const enter = async (pg) => { await pg.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await pg.waitForTimeout(1200);
    await pg.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await pg.waitForTimeout(800); };
  await p.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await enter(p);
  // Settings, Your devices: the switch beside Lend my models to my devices
  const sw = await p.evaluate(async () => { go('settings'); await new Promise(r => setTimeout(r, 800)); const c = document.getElementById('linkCard'); try { IngRooms.reveal(c, {}); } catch (e) {} try { IngLend.paint(); } catch (e) {} await new Promise(r => setTimeout(r, 1500));
    const s = document.getElementById('ldRuns'); return s ? { on: s.getAttribute('aria-checked'), text: (s.parentElement || {}).textContent } : null; });
  ok(sw && sw.on === 'false' && /Run Fabrica's jobs for my devices/.test(sw.text), 'Settings, Your devices: the switch Run Fabrica\'s jobs for my devices, off at first', sw);
  await p.evaluate(() => document.getElementById('ldRuns').click()); await p.waitForTimeout(1500);
  const swOn = await api(A.port, 'share_status', []); ok(swOn.runs_on === true, 'pressed, this computer runs jobs for her devices (share_status says so)', { runs_on: swOn.runs_on });
  await p.evaluate(() => document.getElementById('ldRuns').click()); await p.waitForTimeout(1500);
  const swOff = await api(A.port, 'share_status', []); ok(swOff.runs_on === false, 'pressed again, off', { runs_on: swOff.runs_on });
  // pairing a computer that runs jobs and lends no models
  // 7.37 (app_seal_737.py, r319): the other computer is asked to confirm the four words; it has no window open here, so its own
  // functions answer (seal_pending, then seal_answer), as its sheet would
  const confirmOn = async (port) => { for (let i = 0; i < 120; i++) { const r = await api(port, 'seal_pending', []); if (r.asks && r.asks.length) return api(port, 'seal_answer', [r.asks[0].rid, true]); await new Promise(r => setTimeout(r, 500)); } throw new Error('no pairing ask arrived'); };
  const [pr] = await Promise.all([p.evaluate(async ([port, code]) => { try { const c = await IngLend.pair('127.0.0.1:' + port, code); const s = IngLend.state().computers.filter(x => x.id === c.id)[0]; return { id: c.id, name: c.name, runs: s && s.runs }; } catch (e) { return { err: String(e && e.message || e) }; } }, [bport, code]), confirmOn(B.port)]);
  await p.waitForTimeout(3000);
  ok(pr.id && pr.runs === 1, 'a computer that runs jobs and lends no models pairs, kept with runs', pr);
  // a repository with a workflow
  const rid = await p.evaluate(async (wf) => { const r = await IngRepo.create({ name: 'Tide Clock' }); await IngRepo.put(r.id, 'index.html', '<!doctype html><title>Tide Clock</title><h1>High water at six</h1>');
    await IngRepo.put(r.id, '.github/workflows/build.yml', wf); await IngRepo.commit(r.id, 'First version, with a workflow'); return r.id; }, WF);
  await p.evaluate((rid) => { go('fabrica'); }, rid); await p.waitForTimeout(1500);
  await p.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /Tide Clock/.test(x.textContent)); if (t) t.click(); }); await p.waitForTimeout(1500);
  const view = async (pg, v) => { await pg.evaluate(v => { const x = window.fbHubHost; x.S.view = v; x.paintWork(); }, v); await pg.waitForTimeout(1500); };
  await view(p, 'machines'); await p.waitForTimeout(2500); await view(p, 'machines');
  const mc = await p.evaluate(n => { const cards = [...document.querySelectorAll('#fbWorkBody .r298-mc')]; const c = cards.find(x => (x.querySelector('b') && x.querySelector('b').textContent.trim() === n)); return { cards: cards.map(x => x.querySelector('b') && x.querySelector('b').textContent), ready: c ? c.querySelector('.f-chip.st').textContent : null, tools: c ? c.querySelectorAll('.r298-tool').length : 0, add: !![...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Add a machine') }; }, pr.name);
  ok(mc.ready === 'Ready' && mc.tools > 0 && mc.add, 'Machines: the other computer, Ready, with its tools; Add a machine', mc);
  await p.screenshot({ path: path.join(OUT, 'machines.png') });
  // the run sheet
  await view(p, 'workflows');
  await p.evaluate(() => { const k = [...document.querySelectorAll('#fbWorkBody button')].find(x => x.textContent.trim() === 'Run it now'); k.click(); }); await p.waitForTimeout(2500);
  const shs = await p.evaluate(() => { const s = [...document.querySelectorAll('.f-sheet')].pop(); return s ? [...s.querySelectorAll('.f-opt')].map(o => [o.querySelector('b') ? o.querySelector('b').textContent : o.textContent.slice(0, 40), o.disabled]) : null; });
  ok(shs && shs.some(o => o[0] === 'As the workflow says' && !o[1]) && shs.some(o => o[0] === 'Only on this computer') && shs.some(o => o[0] === 'Only on ' + pr.name && !o[1]) && shs.some(o => o[0] === "Only on GitHub's machines" && o[1]),
    'the run sheet: As the workflow says, Only on this computer, Only on the other computer, GitHub\'s machines not yet', shs);
  await p.evaluate(n => { const s = [...document.querySelectorAll('.f-sheet')].pop(); [...s.querySelectorAll('.f-opt')].find(o => o.querySelector('b') && o.querySelector('b').textContent === 'Only on ' + n).click();
    [...s.querySelectorAll('button')].filter(x => x.textContent.trim() === 'Run it now').pop().click(); }, pr.name);
  // followed until it ends, there
  let rec = null; for (let i = 0; i < 240; i++) { await p.waitForTimeout(500); rec = await p.evaluate(async id => { const l = await IngLend.request(id, 'GET', '/ingenium/runs/list'); return (l.runs || [])[0] || null; }, pr.id).catch(() => null); if (rec && /ok|bad|stopped/.test(rec.state)) break; }
  ok(rec && rec.state === 'ok' && (rec.jobs || []).some(j => j.key === 'linux' && j.state === 'ok') && (rec.jobs || []).some(j => j.key === 'win' && j.state === 'skipped'), 'Only on the other computer: it ran there, the Linux job well, the Windows job not (another system)', rec && { state: rec.state, jobs: (rec.jobs || []).map(j => [j.key, j.state]) });
  await p.waitForTimeout(4000); await view(p, 'runs');
  const rl = await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .r298-run, #fbWorkBody .r298-runhead')].map(x => x.textContent));  /* the run started opens its own page; the list shows it otherwise */
  ok(rl.some(t => t.includes(pr.name) || /kept here too/.test(t)), 'the Runs list says where it ran', rl);
  // its log and its file, read here
  const lg = await p.evaluate(async ([id, r]) => { const g = await IngLend.request(id, 'GET', '/ingenium/runs/log?rid=' + encodeURIComponent(r) + '&job=linux&offset=0'); return g.text || ''; }, [pr.id, rec.id]);
  ok(/hello from the machine/.test(lg), 'its log, read from the other computer', lg.slice(0, 200));
  // the copy kept on this computer (A), standing for it
  let kept = null; for (let i = 0; i < 60; i++) { const l = await api(A.port, 'runs_list', []); kept = (l.runs || []).find(x => x.remote && x.remote.rid === rec.id); if (kept) break; await p.waitForTimeout(1000); }
  const klog = kept ? await api(A.port, 'runs_log', [kept.id, 'linux', 0]) : null;
  ok(kept && kept.remote.computer === pr.name && klog && /hello from the machine/.test(klog.text), 'once ended, a copy kept on this computer: its record says where it ran, its log is here', kept && { remote: kept.remote, log: klog && klog.text.slice(0, 80) });
  const kf = kept ? await api(A.port, 'runs_file', [kept.id, 'made', 'out/made.txt', 0, 4096]).catch(e => ({ err: String(e) })) : null;
  ok(kf && kf.b64 && Buffer.from(kf.b64, 'base64').toString().trim() === 'made', 'and the file it kept is here too', kf && (kf.err || Buffer.from(kf.b64 || '', 'base64').toString()));
  // As the workflow says: the Linux job on this computer (first), the Windows job said as not run
  await view(p, 'workflows');
  await p.evaluate(() => { const k = [...document.querySelectorAll('#fbWorkBody button')].find(x => x.textContent.trim() === 'Run it now'); k.click(); }); await p.waitForTimeout(2500);
  await p.evaluate(() => { const s = [...document.querySelectorAll('.f-sheet')].pop(); [...s.querySelectorAll('.f-opt')].find(o => o.querySelector('b') && o.querySelector('b').textContent === 'As the workflow says').click();
    [...s.querySelectorAll('button')].filter(x => x.textContent.trim() === 'Run it now').pop().click(); }); await p.waitForTimeout(3000);
  const toast = await p.evaluate(() => { const t = document.querySelector('#fb .f-toast'); return t ? t.textContent : ''; });
  let here = null; for (let i = 0; i < 120; i++) { const l = await api(A.port, 'runs_list', []); here = (l.runs || []).find(x => !x.remote && x.n === 2); if (here && /ok|bad|stopped/.test(here.state)) break; await p.waitForTimeout(500); }
  ok(here && here.state === 'ok' && /on this computer/.test(toast) && /Not run: Windows/.test(toast), 'As the workflow says: the Linux job here, the Windows job said as not run', { state: here && here.state, toast });
  // a device with no computer app (the Fire tablet, the iPhone, the iPad, a browser)
  const cb = await b.newContext({ viewport: { width: 1180, height: 820 } }); const q = await cb.newPage(); q.setDefaultTimeout(180000); q.on('pageerror', e => errs.push('browser: ' + e.message.slice(0, 200)));
  await q.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await enter(q);
  const [pq] = await Promise.all([q.evaluate(async ([port, code]) => { try { const c = await IngLend.pair('127.0.0.1:' + port, code); return { id: c.id, name: c.name }; } catch (e) { return { err: String(e && e.message || e) }; } }, [bport, code]), confirmOn(B.port)]);
  await q.waitForTimeout(3000);
  ok(pq.id, 'a browser pairs with the other computer too', pq);
  const rq = await q.evaluate(async (wf) => { const r = await IngRepo.create({ name: 'Harbour Garden' }); await IngRepo.put(r.id, 'index.html', '<!doctype html><title>Harbour Garden</title>'); await IngRepo.put(r.id, '.github/workflows/build.yml', wf); await IngRepo.commit(r.id, 'First'); return r.id; }, WF);
  await q.evaluate(() => { go('fabrica'); }); await q.waitForTimeout(1500); await q.evaluate(() => { const t = [...document.querySelectorAll('#fbRepos .f-repo')].find(x => /Harbour Garden/.test(x.textContent)); if (t) t.click(); }); await q.waitForTimeout(1500);
  await view(q, 'machines'); await q.waitForTimeout(2500); await view(q, 'workflows');
  const can = await q.evaluate(() => { const k = [...document.querySelectorAll('#fbWorkBody button')].find(x => x.textContent.trim() === 'Run it now'); return k ? !k.disabled : null; });
  await q.evaluate(() => { const k = [...document.querySelectorAll('#fbWorkBody button')].find(x => x.textContent.trim() === 'Run it now'); k.click(); }); await q.waitForTimeout(2500);
  await q.evaluate(n => { const s = [...document.querySelectorAll('.f-sheet')].pop(); const o = [...s.querySelectorAll('.f-opt')].find(o => o.querySelector('b') && o.querySelector('b').textContent === 'Only on ' + n); if (o) o.click();
    [...s.querySelectorAll('button')].filter(x => x.textContent.trim() === 'Run it now').pop().click(); }, pq.name);
  let rb = null; for (let i = 0; i < 240; i++) { await q.waitForTimeout(500); rb = await q.evaluate(async id => { const l = await IngLend.request(id, 'GET', '/ingenium/runs/list'); return (l.runs || []).find(x => /Harbour Garden/.test(x.app || '')) || null; }, pq.id).catch(() => null); if (rb && /ok|bad|stopped/.test(rb.state)) break; }
  ok(can === true && rb && rb.state === 'ok', 'a device with no computer app runs its workflow on the other computer', { can, state: rb && rb.state });
  // the other computer's runs switched off
  await api(B.port, 'share_runs_set', [false]); await p.waitForTimeout(800); await view(p, 'machines');
  await p.evaluate(n => { const c = [...document.querySelectorAll('#fbWorkBody .r298-mc')].find(x => (x.querySelector('b') && x.querySelector('b').textContent.trim() === n)); [...c.querySelectorAll('button')].find(x => x.textContent.trim() === 'Check it again').click(); }, pr.name); await p.waitForTimeout(3000); await view(p, 'machines');
  const off = await p.evaluate(n => { const c = [...document.querySelectorAll('#fbWorkBody .r298-mc')].find(x => (x.querySelector('b') && x.querySelector('b').textContent.trim() === n)); return c ? (c.querySelector('.f-chip.st') || {}).textContent : null; }, pr.name);
  ok(off === 'Runs off there' || off === 'Asleep', 'its runs switched off there: Machines says so after Check it again', off);
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); A.pr.kill(); B.pr.kill(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1500)); process.exit(2); });
