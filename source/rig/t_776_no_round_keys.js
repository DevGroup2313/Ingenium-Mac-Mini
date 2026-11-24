// Ingenium 7.76 (24 November 2026): the round model keys are taken off the pages (modules/r325.js).
// Her words: "Please also remove the little controls buttons that was added all over the app for the models on the Lector, Vocatio,
// Ingenia, Fabrica, Adamas and etc ... only keep the ones that truly belongs on the page".
//   node rig/t_776_no_round_keys.js <Ingenium page url>
const pw = require('/opt/node-tools/node_modules/playwright');
const URL_ = process.argv.slice(2).filter(a => /^https?:\/\//.test(a))[0];
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    /* a model ready on this device, as on her computers: the keys showed only then */
    state.models = (state.models || []).concat([{ id: 'm-ready', customName: 'A ready model', name: 'A ready model', fileState: 'ready', size: 2e9, sizeBytes: 2e9, ctx: 8192 }]); setActive('m-ready', { fromUser: true }); saveState(); });
  for (const pg of ['lector', 'career', 'folders', 'fabrica', 'build']) {
    const has = await p.evaluate(pg => !!document.getElementById('page-' + pg), pg); if (!has) continue;
    await p.evaluate(pg => go(pg), pg); await sleep(1600);
    const k = await p.evaluate(() => [...document.querySelectorAll('.mk3')].filter(x => x.offsetParent).map(x => x.id || x.className));
    ok(k.length === 0, pg + ': no round model key on the page', k);
  }
  // Chat keeps its own Controls key: it belongs to the chat
  await p.evaluate(() => go('chat')); await sleep(1000);
  const c = await p.evaluate(() => { const b = document.getElementById('chatCtlBtn'); return !!(b && b.offsetParent); });
  ok(c, 'Chat keeps its own Controls key', c);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
