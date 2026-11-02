// The Chromium side of the library tests (rig/idb/README.md): run_chromium.js (Chromium's own IndexedDB) and run_reference.js
// (Chromium with the reference implementation, fake-indexeddb, in place of its own) both run this.
// It loads the built page, injects suite.js once the page is ready, runs its phases, prints a PASS or FAIL line for each test and
// the count, and writes the results as JSON.
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const SUITE = fs.readFileSync(path.join(__dirname, 'suite.js'), 'utf8');
const QUOTA = 12 * 1048576;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function errorsScript() {
  return `(() => { window.__idbErrors = []; window.addEventListener('error', e => { try { window.__idbErrors.push(String(e.message || e.error || 'error') + (e.filename ? ' @' + e.filename.split('/').pop() + ':' + e.lineno : '')); } catch (x) { } }); })();`;
}
function envScript(impl, quota) { return `window.__idbEnv = ${JSON.stringify({ impl, quota: quota || null })};`; }

async function ready(p, ms) {
  await p.waitForFunction(() => window.__ingReady === true, null, { timeout: ms || 300000, polling: 500 });
  await sleep(600);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await sleep(400);
}
async function inject(p) { await p.evaluate(SUITE); }

// runs one phase in a page and gathers its results as they come; resolves with the new rows
async function phase(p, name, log, opt) {
  opt = opt || {};
  const n0 = await p.evaluate(() => window.__idbSuite.results.length);
  await p.evaluate(nm => { window.__idbSuite.run(nm).catch(() => { }); }, name);
  if (opt.navigates) return [];
  const t0 = Date.now(); let seen = n0, rows = [];
  for (;;) {
    let st;
    try { st = await p.evaluate(([nm, from]) => ({ done: window.__idbSuite.finished[nm], rows: window.__idbSuite.results.slice(from) }), [name, seen]); }
    catch (e) { log('NOTE the page could not be read during ' + name + ': ' + e.message.split('\n')[0]); await sleep(2000); if (Date.now() - t0 > (opt.ms || 3600000)) break; continue; }
    for (const r of st.rows) { rows.push(r); log((r.ok ? 'PASS ' : 'FAIL ') + r.name + '  (' + r.ms + ' ms)  ' + String(r.detail).slice(0, 700)); }
    seen += st.rows.length;
    if (st.done === true) break;
    if (typeof st.done === 'string') { log('NOTE phase ' + name + ' stopped: ' + st.done); break; }
    if (Date.now() - t0 > (opt.ms || 3600000)) { log('NOTE phase ' + name + ' ran out of time'); rows.push({ name: 'phase ' + name + ' finished in time', ok: false, detail: 'still running after ' + Math.round((Date.now() - t0) / 1000) + ' s', ms: Date.now() - t0 }); break; }
    await sleep(1500);
  }
  return rows;
}

async function run(impl, url, outFile, opts) {
  opts = opts || {};
  const log = s => console.log(s);
  const res = { impl, url, started: new Date().toISOString(), engine: null, results: [], notes: [] };
  const init = [];
  if (impl === 'reference') {
    const { build, FAKE, ESBUILD } = require('./build_reference.js');
    const bundle = build(); init.push(fs.readFileSync(bundle, 'utf8'));
    // its stores live in this page's memory, where Chromium's own count (navigator.storage.estimate) cannot see them: the
    // browser's count is hidden, as WebKitGTK has none, and Ingenium falls back on its own measure, as it does there
    init.push('try{Object.defineProperty(Navigator.prototype,"storage",{get:function(){return undefined;},configurable:true});}catch(e){}');
    res.reference = { 'fake-indexeddb': FAKE, esbuild: ESBUILD, bundle };
  }
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  res.engine = 'Chromium ' + b.version();
  log('NOTE ' + impl + ': ' + res.engine + (res.reference ? ', fake-indexeddb ' + res.reference['fake-indexeddb'] : '') + ', page ' + url);
  const newCtx = async (quota) => {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
    await ctx.addInitScript(envScript(impl, quota)); await ctx.addInitScript(errorsScript());
    for (const s of init) await ctx.addInitScript(s);
    return ctx;
  };
  const add = rows => { for (const r of rows) res.results.push(r); };
  const fail = (name, e) => { const r = { name, ok: false, detail: 'the runner could not do it: ' + String(e && e.message || e).split('\n')[0], ms: 0 }; res.results.push(r); log('FAIL ' + name + '  ' + r.detail); };
  try {
    // ---- one tab: every test ----
    const ctx = await newCtx(null); const pa = await ctx.newPage();
    pa.on('pageerror', e => res.notes.push('page error (A): ' + e.message.slice(0, 200)));
    const t0 = Date.now(); await pa.goto(url, { timeout: 300000 }); await ready(pa); log('NOTE ready in ' + (Date.now() - t0) + ' ms');
    await inject(pa);
    if (opts.only) await pa.evaluate(re => { window.__idbSuite.only = new RegExp(re); }, opts.only);
    if (!opts.skipMain) add(await phase(pa, 'main', log));
    // ---- two tabs on the same stores ----
    if (!opts.skipTabs) {
      try {
        add(await phase(pa, 'tabs-a1', log));
        let pb;
        if (impl === 'reference') { [pb] = await Promise.all([ctx.waitForEvent('page'), pa.evaluate(u => { window.open(u, '_blank'); }, url)]); }
        else { pb = await ctx.newPage(); await pb.goto(url, { timeout: 300000 }); }
        pb.on('pageerror', e => res.notes.push('page error (B): ' + e.message.slice(0, 200)));
        await ready(pb); await inject(pb);
        add(await phase(pb, 'tabs-b1', log));
        const nav = pb.waitForNavigation({ timeout: 300000 });
        await phase(pb, 'tabs-b-reset', log, { navigates: true });
        await nav; await ready(pb); await inject(pb);
        add(await phase(pb, 'tabs-b2', log));
        add(await phase(pa, 'tabs-a2', log));
        if (impl === 'reference') await pb.evaluate(() => window.__fidbCloseAll && window.__fidbCloseAll()).catch(() => { });
        await pb.close();
      } catch (e) { fail('two tabs: the runner ran both tabs', e); }
    }
    await ctx.close();
    // ---- the implementation's own quota, in a fresh profile ----
    if (!opts.skipQuota) {
      try {
        const quota = impl === 'chromium' ? QUOTA : null;
        const qc = await newCtx(quota); const pq = await qc.newPage();
        if (quota) { const cdp = await qc.newCDPSession(pq); await cdp.send('Storage.overrideQuotaForOrigin', { origin: new URL(url).origin, quotaSize: quota }); }
        await pq.goto(url, { timeout: 300000 }); await ready(pq); await inject(pq);
        add(await phase(pq, 'quota', log));
        await qc.close();
      } catch (e) { fail('quota: the runner made a profile with a small quota', e); }
    }
  } catch (e) { fail('the runner loaded the page and ran the suite', e); }
  await b.close();
  res.finished = new Date().toISOString();
  const pass = res.results.filter(r => r.ok).length, failed = res.results.length - pass;
  res.passed = pass; res.failed = failed;
  if (outFile) { fs.mkdirSync(path.dirname(path.resolve(outFile)), { recursive: true }); fs.writeFileSync(outFile, JSON.stringify(res, null, 1)); }
  log('\n' + impl + ': ' + pass + ' passed, ' + failed + ' failed');
  return res;
}
module.exports = { run };
