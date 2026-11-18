// Ingenium 7.39: dictation in-house on a device without the speech files: they come from its paired computer (build/desktop/
// app_speech_739.py; modules/r254.js), sealed (7.37), never from the internet.
//   node rig/t_738_speech.js <folder holding ingenium_app.py (patched), ingenium.html and speech/> <device page url (no speech/ beside it)> <out folder>
// A real computer app runs here (rig/run_app.py) with the speech files beside its page, as the Mac and Windows apps carry them; a browser
// page served from elsewhere, with no speech files beside it, is the device; the internet (cdn.jsdelivr.net, huggingface.co) is closed to
// it. Checks: the computer's hello offers speech; the device pairs sealed (the words confirmed on the computer); IngEars.ready("en") loads
// the engine and the English model, which came from the computer (IngEars.from), sealed, with not one request to the internet; the files
// are kept on the device (the engine in Scriba's store, the model in transformers.js's cache) and a second load needs the computer no more.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [APP, DEV_URL, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const home = path.join(OUT, 'home'), dir = path.join(OUT, 'app'); fs.mkdirSync(home, { recursive: true }); fs.mkdirSync(dir, { recursive: true });
for (const f of ['ingenium_app.py', 'ingenium.html']) fs.copyFileSync(path.join(APP, f), path.join(dir, f));
fs.cpSync(path.join(APP, 'speech'), path.join(dir, 'speech'), { recursive: true });
const api = (port, n, args) => fetch('http://127.0.0.1:' + port + '/call/' + n, { method: 'POST', body: JSON.stringify(args || []) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
(async () => {
  const pr = cp.spawn('python3', ['-I', path.join(__dirname, 'run_app.py'), dir, '18992'], { env: Object.assign({}, process.env, { HOME: home, XDG_DATA_HOME: '' }), stdio: ['ignore', 'pipe', 'pipe'] });
  let out = ''; pr.stdout.on('data', d => out += d); pr.stderr.on('data', d => out += d);
  let ia = null; for (let i = 0; i < 240 && !ia; i++) { const m = /\{"page_port".*\}/.exec(out); if (m) ia = JSON.parse(m[0]); else await new Promise(r => setTimeout(r, 250)); }
  if (!ia) { ok(false, 'the computer app starts', out.slice(-500)); process.exit(2); }
  const s0 = await api(18992, 'share_runs_set', [true]); const code = s0.code, SP = s0.port;
  const hello = await (await fetch('http://127.0.0.1:' + SP + '/ingenium/hello')).json();
  ok(hello.speech === 1 && hello.seal === 1, "the computer's hello offers its speech files, and seals", { speech: hello.speech, seal: hello.seal });
  const b = await pw.chromium.launch(); const errs = [], internet = [], sealed = [];
  const cd = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await cd.route(/https:\/\/(cdn\.jsdelivr\.net|huggingface\.co|[a-z0-9.-]*\.hf\.co)\//, r => { internet.push(r.request().url()); return r.abort(); });
  cd.on('request', r => { if (r.url().includes('/ingenium/sealed')) sealed.push(r.url()); });
  const q = await cd.newPage(); q.setDefaultTimeout(600000); q.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await q.goto(DEV_URL, { timeout: 600000 }); await q.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await q.waitForTimeout(1200);
  await q.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const besides = await q.evaluate(async () => { try { const r = await fetch(new URL('speech/speech.json', document.baseURI).href); return r.status; } catch (e) { return 'none'; } });
  ok(besides !== 200, 'the device has no speech files beside its page', besides);
  const confirm = async () => { for (let i = 0; i < 120; i++) { const r = await api(18992, 'seal_pending', []); if (r.asks && r.asks.length) return api(18992, 'seal_answer', [r.asks[0].rid, true]); await new Promise(r => setTimeout(r, 500)); } };
  const [pd] = await Promise.all([q.evaluate(async ([port, code]) => { try { const c = await IngLend.pair('127.0.0.1:' + port, code); return { id: c.id }; } catch (e) { return { err: String(e && e.message || e) }; } }, [SP, code]), confirm()]);
  await q.waitForTimeout(3000);
  ok(pd.id && (await q.evaluate(() => IngSealing.computers().length)) === 1, 'the device pairs sealed with the computer', pd);
  const t0 = Date.now(); const s1 = sealed.length;
  const r1 = await q.evaluate(async () => { try { await IngEars.ready('en'); return IngEars.from(); } catch (e) { return { err: String(e && e.message || e) }; } });
  const secs = Math.round((Date.now() - t0) / 1000);
  ok(r1.runtime === 'computer' && r1.models === 'computer' && r1.model, 'IngEars.ready("en"): the engine and the English model came from the computer, and loaded', Object.assign({ secs }, r1));
  ok(internet.length === 0 && sealed.length - s1 >= 5, 'not one request went to the internet; the files came sealed', { internet: internet.slice(0, 4), sealedRequests: sealed.length - s1 });
  const kept = await q.evaluate(async () => { const c = await caches.open('transformers-cache'); const ks = (await c.keys()).map(r => r.url); return { model: ks.filter(u => /moonshine-base-ONNX\/resolve\/main\/onnx\/.*\.onnx$/.test(u)).length, files: ks.length }; });
  ok(kept.model >= 2, "the model is kept in transformers.js's own cache, under the address it asks for", kept);
  const line = await q.evaluate(() => { const l = document.getElementById('ingEarsLine'); return l ? l.textContent : null; });
  ok(/The speech model came from vm, over your home network/.test(line || ''), 'the line under the message box says the model came from the computer, by its name', line);
  // a second load (the page reopened) needs the computer no more
  await q.reload(); await q.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await q.waitForTimeout(1000);
  const s2 = sealed.length; await api(18992, 'share_runs_set', [false]);
  const r2 = await q.evaluate(async () => { try { await IngEars.ready('en'); return IngEars.from(); } catch (e) { return { err: String(e && e.message || e) }; } });
  ok(!r2.err && r2.model && internet.length === 0, 'reopened, with the computer away, it loads from what the device kept', { r2, sealedAgain: sealed.length - s2, internet: internet.length });
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); pr.kill(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1500)); process.exit(2); });
