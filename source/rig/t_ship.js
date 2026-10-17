// IngShip in the page: the five checks on Carpe Diem's real files and on a broken app; one page; a web app
const { start } = require('./lib.js');
const fs = require('fs'), path = require('path'); const { execFileSync } = require('child_process');
(async () => {
  const S = process.env.S, OUT = S + '/yard/stest'; const { browser, page, logs } = await start({ viewport: { width: 1280, height: 800 } });
  const CD = '/home/user/devgroup2313/carpe-diem-offline';
  const walk = d => fs.readdirSync(d).flatMap(n => { const p = path.join(d, n); return fs.statSync(p).isDirectory() ? (n === '.git' ? [] : walk(p)) : [p]; });
  const files = walk(CD).map(p => ({ path: path.relative(CD, p), b64: fs.readFileSync(p).toString('base64') }));
  const r = await page.evaluate(async (files) => {
    const u8 = b => { const s = atob(b), o = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) o[i] = s.charCodeAt(i); return o; };
    const res = {}; const R = IngRepo;
    const cd = await R.fromFiles(files.map(f => ({ path: f.path, data: u8(f.b64) })), { name: 'Carpe Diem', msg: 'Carpe Diem 1051' });
    let t0 = performance.now(); const steps = [];
    res.cd = await IngShip.test(cd.id, { onStep: c => steps.push(c.id + ':' + c.state) }); res.cd.ms = Math.round(performance.now() - t0); res.cdSteps = steps;
    // a second version with a higher build number, and one with the same
    const html = await R.readText(cd.id, 'index.html');
    // a broken app: a script that does not parse, a missing picture, an error when it runs
    const br = await R.fromFiles([{ path: 'index.html', data: '<!doctype html><html><head><meta name="ingenium-build" content="1.0.2"><link rel="stylesheet" href="style.css"></head><body><img src="pics/missing.png"><script src="app.js"></script><script>var x = {;</script><script>console.log("INGENIUM_SELFTEST START")</script></body></html>' },
      { path: 'style.css', data: 'body{background:url(pics/bg.png)}' }, { path: 'app.js', data: 'document.body.appendChild(document.createElement("p"));\nnoSuchFunction();\n' }], { name: 'Broken', msg: 'First' });
    res.broken = await IngShip.test(br.id, { seconds: 2 });
    await R.put(br.id, 'index.html', '<!doctype html><html><head><meta name="ingenium-build" content="1.0.1"></head><body><p>ok</p><script>console.log("INGENIUM_SELFTEST DONE pass")</script></body></html>'); await R.commit(br.id, 'Lower number');
    res.lower = await IngShip.test(br.id, { seconds: 2 });
    // one page and a web app from Carpe Diem
    t0 = performance.now(); const one = await IngShip.onePage(cd.id); res.one = { size: one.bytes.length, inlined: one.inlined, missing: one.missing, ms: Math.round(performance.now() - t0) };
    const w = await IngShip.webApp(cd.id); res.web = { name: w.name, files: w.files, size: w.bytes.length };
    const b64 = u => { let x = ''; for (let i = 0; i < u.length; i += 32768) x += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(x); };
    res.oneB64 = b64(one.bytes); res.webB64 = b64(w.bytes);
    res.notes = Object.keys(await R.notes(cd.id, res.cd.commit));
    return res;
  }, files);
  const show = t => t.checks.map(c => `${c.state.toUpperCase()} ${c.label}: ${c.detail}`).join('\n   ');
  console.log('Carpe Diem (' + r.cd.ms + ' ms):\n   ' + show(r.cd)); console.log('   steps as they came:', r.cdSteps.join(' '));
  console.log('Broken:\n   ' + show(r.broken)); console.log('Lower build number:\n   ' + show(r.lower));
  console.log('one page:', JSON.stringify(r.one)); console.log('web app:', JSON.stringify(r.web)); console.log('notes kept beside the version:', r.notes.join(', '));
  fs.writeFileSync(OUT + '/cd-one.html', Buffer.from(r.oneB64, 'base64')); fs.writeFileSync(OUT + '/cd-web.zip', Buffer.from(r.webB64, 'base64'));
  const uz = OUT + '/web'; fs.rmSync(uz, { recursive: true, force: true }); fs.mkdirSync(uz); execFileSync('unzip', ['-q', OUT + '/cd-web.zip', '-d', uz]);
  console.log('web zip top:', fs.readdirSync(uz), '->', fs.readdirSync(path.join(uz, fs.readdirSync(uz)[0])).slice(0, 12).join(' '));
  // the one page opens by itself with no requests for local files
  const p2 = await browser.newPage(); const reqs = []; p2.on('request', q => { if (!/^data:|^about:/.test(q.url())) reqs.push(q.url()); }); const errs = []; p2.on('pageerror', e => errs.push(e.message));
  await p2.goto('file://' + OUT + '/cd-one.html'); await p2.waitForTimeout(3000);
  console.log('one page: requests for files outside it:', reqs.filter(u => !u.endsWith('cd-one.html')).slice(0, 5), 'errors:', errs.slice(0, 3));
  console.log('errors:', logs.filter(l => /error/i.test(l)).slice(0, 5));
  await browser.close();
})();
