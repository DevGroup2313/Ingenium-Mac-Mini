// Ingenium 6.24 (5 November 2026): Stop stops, and the studio reads with a rule of its own. Her words: "there is a bug on the "Stop" button
// inside of the Career Studio, I keep on pressing it over and over again to stop a reading but it does not stop and I have had to close and
// force quit the app"; "the models takes ages running in circles trying to dissect the simple instructions and calls it ambiguous"; and
// "make the "Stop" button on the Applications tab page purple". A stand-in engine answers a stop as the real ones do (it hands back the
// words so far, as if the reply had ended), under a layer that asks again after a draft, as Ultra's check does. Invented data only.
//   node rig/t_624_stop.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(800);
  const src = await p.evaluate(() => fetch(location.href).then(r => r.text()).then(t => ({ guard: t.includes('function lxAsk(run,msgs,maxTok,temp,onPiece){if(run&&run.__stopped)return Promise.reject(new Error("stopped"));') })));
  ok(src.guard, 'lxAsk refuses a request marked stopped (in the page source)', src);
  /* the real chain, with every layer that wraps lxAsk: a stopped request is refused at once; a fresh one is not refused as stopped */
  const real = await p.evaluate(() => { window.__realAsk = window.lxAsk; const M = [{ role: 'system', content: 'You are Lector, writing a test.' }, { role: 'user', content: 'Say yes.' }];
    const t = (run) => Promise.race([Promise.resolve().then(() => window.__realAsk(run, M, 16, 0.2, function () {})).then(() => 'answered', e => 'refused: ' + String(e && e.message || e)), new Promise(r => setTimeout(() => r('still working'), 2500))]);
    return t({ __stopped: true }).then(a => t({}).then(b => { try { if (window.Engine && Engine.abort) Engine.abort(); } catch (e) {} return { stopped: a, fresh: b }; })); });
  ok(real.stopped === 'refused: stopped' && real.fresh !== 'refused: stopped', 'through every layer: a stopped request is refused at once, and any other request is not (Lector and Folders are never held up)', real);
  await p.evaluate(() => {
    const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake12', customName: 'Stand-in 12B', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true }); saveState();
    window.__gens = 0; window.__after = 0; window.__stopAt = 0; window.__asked = [];
    let abortHook = null; Engine.abort = function () { if (abortHook) abortHook(); };
    function gen(onPiece) { window.__gens++; if (window.__stopAt) window.__after++;
      return new Promise((res) => { let out = '', n = 0; const t = setInterval(() => { out += 'word ' + (n++) + ' '; if (onPiece) onPiece(out); if (n > 400) { clearInterval(t); res(out); } }, 50);
        abortHook = () => { if (window.__deaf) { setTimeout(() => { clearInterval(t); res(out); }, 4000); return; } clearInterval(t); res(out); }; }); }
      /* a stop hands back what was written so far, as the real engines do; a deaf engine answers four seconds late */
    lxAsk = function (run, msgs, max, temp, onPiece) { window.__asked.push({ sys: msgs[0].content.slice(0, 160) });
      if (run && run.__stopped) return Promise.reject(new Error('stopped'));   /* as the real lxAsk now does */
      return gen(onPiece).then(draft => { if (run && run.__stopped) return Promise.reject(new Error('stopped')); return gen(onPiece); }); }; /* a layer that asks again after a draft, with the same request */
    const P = IngCareer.state().profile; P.name = 'Ada Example'; P.items.push({ id: 'i1', sec: 'education', title: 'MSt in Digital Humanities', place: 'University of Exampleton', from: '2021', to: '2022', text: 'With distinction.', src: 'me' }); saveState(); });
  const id = await p.evaluate(() => IngCareer.newOpp('job', 'Learning Designer\nExample Learning Ltd\nEssential: a degree; experience designing learning materials.\n' + 'x'.repeat(60), 'pasted').then(o => { o.step = 'post'; saveState(); const S = IngCareer.state(); S.ui.room = 'apps'; S.ui.open = o.id; S.ui.show = 'work'; go('career'); IngCareer.render(); return o.id; }));
  await p.waitForTimeout(400);
  await p.evaluate(() => { [...document.querySelectorAll('#cs button')].find(x => x.offsetParent && /Read it against my profile/.test(x.textContent)).click(); });
  await p.waitForTimeout(1500);
  const key = await p.evaluate(() => { const k = document.getElementById('csStopKey'); if (!k) return null; const c = getComputedStyle(k); return { pri: k.classList.contains('pri'), bg: c.backgroundImage, color: c.color }; });
  ok(key && key.pri && /gradient/.test(key.bg) && key.color === 'rgb(255, 255, 255)', 'the Stop key is the studio\'s purple, as Do this now', key);
  await p.locator('#cs .c-live-pn').screenshot({ path: OUT + '/624_live.png' }).catch(() => {});
  const sysr = await p.evaluate(() => window.__asked[0] && window.__asked[0].sys);
  ok(/^You read and advise on this device for the applicant/.test(sysr) && !/in the first person as the applicant/.test(sysr), 'a reading opens with a rule of its own: no instruction to write in the first person', sysr);
  const t0 = Date.now();
  /* read the key in the same moment as the press: a stand-in stop ends the run within milliseconds, and the panel then closes */
  const st = await p.evaluate(() => { window.__stopAt = Date.now(); document.getElementById('csStopKey').click();
    return { label: (document.getElementById('csStopKey') || {}).textContent, what: (document.getElementById('csWhat') || {}).textContent, disabled: (document.getElementById('csStopKey') || {}).disabled }; });
  ok(/Stopping/.test(st.label || '') && st.disabled === true && /Stopping/.test(st.what || ''), 'one press: it says Stopping at once, and the key cannot be pressed again', st);
  await p.waitForFunction(() => !IngCareer.run.busy, null, { timeout: 8000 }).catch(() => {});
  const done = await p.evaluate(() => ({ busy: IngCareer.run.busy, after: window.__after, gens: window.__gens, read: !!(IngCareer.state().opps.find(x => x.title) || {}).read }));
  ok(!done.busy && Date.now() - t0 < 6000, 'one press is enough: the run ends within a few seconds', { ms: Date.now() - t0, done });
  ok(done.after === 0, 'no further request is started after Stop (the layer that asks again is refused)', done);
  await p.waitForTimeout(3000);
  const later = await p.evaluate(() => ({ after: window.__after, busy: IngCareer.run.busy }));
  ok(later.after === 0 && !later.busy, 'and none later either', later);
  // a new reading after the stop runs as usual (the stop is let go of when a new run begins)
  await p.evaluate(() => { window.__stopAt = 0; window.__gens = 0; [...document.querySelectorAll('#cs button')].find(x => x.offsetParent && /Read it (against my profile|again)/.test(x.textContent)).click(); });
  await p.waitForTimeout(1200);
  const again = await p.evaluate(() => ({ gens: window.__gens, busy: IngCareer.run.busy }));
  ok(again.gens >= 1 && again.busy, 'a new reading after a stop starts as usual', again);
  await p.evaluate(() => document.getElementById('csStopKey').click()); await p.waitForTimeout(3000);
  // an engine that answers a stop late: the panel still ends, and the late answer never ends a newer run
  await p.evaluate(() => { [...document.querySelectorAll('#cs button')].find(x => x.offsetParent && /Read it (against my profile|again)/.test(x.textContent)).click(); });
  await p.waitForTimeout(1200);
  await p.evaluate(() => { window.__deaf = true; document.getElementById('csStopKey').click(); });
  await p.waitForFunction(() => !IngCareer.run.busy, null, { timeout: 6000 }).catch(() => {});
  const ended = await p.evaluate(() => IngCareer.run.busy);
  await p.evaluate(() => { window.__deaf = false; window.__gens = 0; [...document.querySelectorAll('#cs button')].find(x => x.offsetParent && /Read it (against my profile|again)/.test(x.textContent)).click(); });
  await p.waitForTimeout(4500);   /* the stopped request's late answer arrives in this time */
  const newer = await p.evaluate(() => ({ busy: IngCareer.run.busy, gens: window.__gens, what: (document.getElementById('csWhat') || {}).textContent || '' }));
  ok(ended === false && newer.busy && newer.gens >= 1 && !/Stopping/.test(newer.what), 'an engine that answers a stop late: the panel still ends, and the late answer never ends the newer reading', { ended, newer });
  await p.evaluate(() => document.getElementById('csStopKey').click()); await p.waitForTimeout(3000);
  ok(!errs.length, 'no errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
