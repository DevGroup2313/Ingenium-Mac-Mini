// Folder search: PDFs in WebKit (the Mac apps' web view). On GitHub's macOS 15.8 machines every PDF failed with "undefined is not a
// function (near '...t of e...')": pdf.js 6.4's getTextContent loops over a ReadableStream with "for await", and WebKit's streams
// cannot be looped so. The parse worker now gives them the standard iterator when they lack it. This test takes Chromium's iterator
// away (rag/test/strip_streams.js) before the parse worker starts, and after it (what WebKit did before the fix).
//   python3 rag/test/serve.py 8175 --vendor <the unpacked vendor tree>
//   node rig/t_rag1_webkit_pdf.js http://127.0.0.1:8175/ <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [BASE0, OUT] = process.argv.slice(2);
if (!BASE0 || !OUT) { console.log('usage: node rig/t_rag1_webkit_pdf.js <server address> <out folder>'); process.exit(2); }
const BASE = BASE0.replace(/\/?$/, '/'); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 600) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(BASE + 'rag/test/harness.html'); await p.waitForFunction(() => window.RagHarness && window.RagHarness.ready === true, null, { timeout: 30000 });
  const r = await p.evaluate(async () => {
    const { ParseClient } = await import('/rag/indexer.js');
    const out = {};
    for (const mode of ['native', 'webkit', 'webkit-unfixed']) {
      const url = mode === 'native' ? '/rag/parse.worker.js' : mode === 'webkit' ? '/rag/test/webkit_streams.worker.js' : '/rag/test/webkit_streams_after.worker.js';
      const pc = new ParseClient({ workerUrl: url, vendorBase: new URL('/rag/vendor/', location.href).href, count: async (texts) => texts.map((t) => Math.ceil(t.length / 4)) });
      out[mode] = {};
      for (const f of ['insurance/home_policy_schedule.pdf', 'insurance/car_policy.pdf']) {
        const bytes = new Uint8Array(await (await fetch('/rag/fixtures/household_papers/' + f)).arrayBuffer());
        const pieces = (async function* () { yield bytes; })();
        try { const res = await pc.parse(pieces, { ext: 'pdf', path: f, size: bytes.length, maxTokens: 450, timeoutMs: 60000 }); out[mode][f] = { chunks: res.chunks.length, hashes: res.chunks.map((c) => c.content_hash).join(',') }; }
        catch (e) { out[mode][f] = { error: String(e && e.message || e).slice(0, 160) }; }
      }
      try { pc.terminate(); } catch (e) { /* gone */ }
    }
    return out;
  });
  const files = Object.keys(r.native);
  ok(files.every((f) => r.native[f].chunks > 0), 'in Chromium as it is, both PDFs are read', r.native);
  ok(files.every((f) => /not async iterable|not a function/.test(r['webkit-unfixed'][f].error || '')), 'with streams that cannot be looped (WebKit) and nothing done about it, every PDF fails, as on the Macs', r['webkit-unfixed']);
  ok(files.every((f) => r.webkit[f].chunks === r.native[f].chunks && r.webkit[f].hashes === r.native[f].hashes), 'with the parse worker\'s fix, the same PDFs give the very same passages as in Chromium', { webkit: r.webkit, native: r.native });
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('FAIL the test itself: ' + (e && e.stack || e)); process.exit(1); });
