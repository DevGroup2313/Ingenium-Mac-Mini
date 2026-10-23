// Ingenium 6.2 · a quicker start on a computer (desktop/app_quick_62.py and modules/r161.js), with the computer app's own local
// server (ingenium_app.py, patched) serving the page, and Chromium as the web view. The owner's words (23 October 2026): "I want
// both Ingenium and the Forge to be expanded to run faster on the mac mini." Checks:
//   - the window's own load of the page is given the quick page (the parts carried for later left with the app); a fetch of
//     the page from code, a load that asks for ?full=1, and a web view that does not say a load is its own get the whole page;
//     each part is served whole, and an unknown one is not;
//   - the time to a page that answers, the whole page against the quick page (three loads each);
//   - in the quick page every part arrives when it is used: the picture reader looks, a built-in app unpacks whole (its size
//     and fingerprint checked), the page's own engine is reported present and its blocks arrive, the kit store opens;
//   - the page fetching itself (to keep a copy, show its code, make a kit) gets the whole page; baking the engine into a copy
//     waits for every part;
//   - no page errors.
//   node rig/t_62_quick.js <patched ingenium_app.py> <ingenium.html> <out folder> [picture.jpg]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const http = require('http');
const [APP, PAGE, OUT, PIC] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const get = (port, p, headers) => new Promise((res, rej) => { http.get({ host: '127.0.0.1', port, path: p, headers: headers || {} }, r => { const b = []; r.on('data', d => b.push(d)); r.on('end', () => res({ status: r.statusCode, body: Buffer.concat(b) })); }).on('error', rej); });

(async () => {
  // the computer app's server, on a copy of the page
  const dir = fs.mkdtempSync(path.join(OUT, 'site-')); fs.copyFileSync(PAGE, path.join(dir, 'ingenium.html'));
  const py = `import importlib.util,sys,types,time\nsys.modules["webview"]=types.ModuleType("webview")\nspec=importlib.util.spec_from_file_location("ia",${JSON.stringify(APP)})\nia=importlib.util.module_from_spec(spec);spec.loader.exec_module(ia)\nprint(ia._start_local_server(${JSON.stringify(dir)},"ingenium.html"),flush=True)\nwhile True: time.sleep(60)\n`;
  const srv = cp.spawn('python3', ['-I', '-c', py], { stdio: ['ignore', 'pipe', 'inherit'] });
  const port = await new Promise(r => srv.stdout.once('data', d => r(+String(d).trim())));
  const full = fs.readFileSync(PAGE);
  try {
    const q = await get(port, '/ingenium.html', { 'Sec-Fetch-Dest': 'document' }), f1 = await get(port, '/ingenium.html'), f2 = await get(port, '/ingenium.html?full=1', { 'Sec-Fetch-Dest': 'document' }), f3 = await get(port, '/ingenium.html', { 'Sec-Fetch-Dest': 'empty' });
    const ids = [...String(q.body).matchAll(/data-defer="\/_payload\/([^"]+)"/g)].map(m => m[1]);
    ok(q.body.length < full.length * 0.3 && ids.length === 7 && f1.body.equals(full) && f2.body.equals(full) && f3.body.equals(full),
      'the window\'s own load gets the quick page (' + (q.body.length / 1e6).toFixed(1) + ' of ' + (full.length / 1e6).toFixed(1) + ' MB, ' + ids.length + ' parts left with the app); any other request gets the whole page', ids);
    let whole = true; for (const id of ids) { const r = await get(port, '/_payload/' + id); const m = new RegExp('<script\\b[^>]*\\bid="' + id + '"[^>]*>([^<]*)</script>').exec(String(full)); if (!(r.status === 200 && m && r.body.toString() === m[1])) whole = false; }
    const no = await get(port, '/_payload/nothing');
    ok(whole && no.status === 404, 'each part is served whole; an unknown one is not');

    const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
    async function load(url) { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message));
      const t0 = Date.now(); await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); return { p, ctx, ms: Date.now() - t0 }; }
    const times = { full: [], quick: [] };
    for (let i = 0; i < 3; i++) { for (const k of ['full', 'quick']) { const r = await load('http://127.0.0.1:' + port + '/ingenium.html' + (k === 'full' ? '?full=1' : '')); times[k].push(r.ms); await r.ctx.close(); } }
    const med = a => a.slice().sort((x, y) => x - y)[1];
    ok(med(times.quick) < med(times.full), 'a page that answers: ' + (med(times.quick) / 1000).toFixed(1) + ' s from the quick page, ' + (med(times.full) / 1000).toFixed(1) + ' s from the whole page (the middle of three loads each)', times);

    const { p, ctx } = await load('http://127.0.0.1:' + port + '/ingenium.html');
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
    const st = await p.evaluate(() => ({ on: !!(window.IngQuick && IngQuick.on), left: ingDeferredLeft(), eng: (function () { try { return engineEmbeddedInfo(); } catch (e) { return String(e); } })() }));
    ok(st.on && st.left === 7 && st.eng && st.eng.present, 'the quick page: seven parts with the app, the page\'s own engine reported present', st);
    if (PIC) {
      const pic = fs.readFileSync(PIC).toString('base64');
      const seen = await p.evaluate(async b64 => { const bin = atob(b64), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
        const file = new File([u], 'p.jpg', { type: 'image/jpeg' }); const dataUrl = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(file); });
        const s = await IngEyes.look({ name: 'p.jpg', dataUrl, file }); return { line: s.line, left: ingDeferredLeft() }; }, pic);
      ok(/a photo/.test(seen.line) && seen.left === 6, 'the picture reader fetches its part when it first looks, and looks', seen);
    }
    const bi = await p.evaluate(async () => { try { const u = await IngBuiltin.unpack('forge'); return { n: u.length, left: ingDeferredLeft() }; } catch (e) { return { err: String(e && e.message || e) }; } });
    ok(bi.n > 1e6 && !bi.err, 'a built-in app (the Forge) fetches its part and unpacks whole, its size and fingerprint checked', bi);
    const en = await p.evaluate(async () => { try { const e = ingSlot('ingenium-engine-wasm'); const blob = await ingSlotBlob(e, 'application/wasm'); return { bytes: blob.size, filled: !e.getAttribute('data-defer') }; } catch (x) { return { err: String(x && x.message || x) }; } });
    ok(en.bytes > 1e6 && en.filled, 'the page\'s own engine fetches its blocks when it is loaded', en);
    const kit = await p.evaluate(async () => { try { const k = await kitStore(); return { keys: Object.keys(k || {}).length }; } catch (e) { return { err: String(e && e.message || e) }; } });
    ok(kit.keys > 0, 'the kit store fetches its part and opens', kit);
    const self = await p.evaluate(async () => (await (await fetch(location.href.split('#')[0], { cache: 'no-store' })).text()).length);
    ok(Math.abs(self - full.toString('utf8').length) < 10, 'the page fetching itself gets the whole page (to keep a copy, show its code, make a kit)', self);
    const all = await p.evaluate(async () => { await ingFillAll(); return { left: ingDeferredLeft(), len: document.documentElement.outerHTML.length }; });
    ok(all.left === 0 && all.len > full.length * 0.95, 'gathered, every part is in place (what baking the engine into a copy waits for)', all);
    ok(!p.__errs.length, 'no page errors', p.__errs.slice(0, 4));
    await ctx.close(); await b.close();
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  srv.kill(); fs.rmSync(dir, { recursive: true, force: true });
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
