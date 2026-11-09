// More models for every device, and quicker replies (Ingenium 6.10.3, modules/r212.js, with r203.js and r105.js). Her words
// (3 November 2026): "I want better, stronger and faster models and more options for my fire tablet app and for the iphone and iPad apps.
// I want that for all of my devices, the Mac mini, the MacBook Pro, and the windows laptops as well."
// Memory and the kind of device are stubbed as the page reads them; the computer app is a stand-in (its engine on a graphics chip, or not),
// and its install is caught, so nothing is fetched. Today's picks for every device and band are checked by t_698_lineup.js (unchanged).
//   node rig/t_6103_more.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1400, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.waitForTimeout(400);
  const setDev = (kind, ram, cpu) => p.evaluate(([kind, ram, cpu]) => { window.lineupDevice = () => kind; window.lineupCpuOnly = () => !!cpu; try { Object.defineProperty(navigator, 'deviceMemory', { configurable: true, get: () => undefined }); } catch (e) {}
    window.__INGENIUM_DEVICE = ram == null ? null : { ramGB: ram }; state.tierPick = {}; return lineupUsableGB(); }, [kind, ram, cpu]);

  // 1. the four models: files, fingerprints, pages, licences, notes; each a choice of its own, never a house's pick
  const data = await p.evaluate(() => { const L = window.IngR212, M = ING_LINEUP.models, probs = [], hex = /^[0-9a-f]{64}$/;
    L.keys.forEach(k => { const s = M[k]; if (!s) { probs.push([k, 'missing']); return; }
      ['name', 'maker', 'page', 'licence', 'licenceUrl', 'why', 'file', 'url'].forEach(f => { if (!s[f]) probs.push([k, f]); });
      if (!hex.test(s.sha256) || !(s.size > 1e8) || !s.url.endsWith('/' + s.file) || !/^https:\/\/huggingface\.co\//.test(s.url)) probs.push([k, 'file record']);
      const need = lineupNeedGB(s); if (!new RegExp('needing about ' + need.toFixed(1).replace('.', '\\.') + ' GB of memory').test(s.why)) probs.push([k, 'need in note', need.toFixed(1)]);
      const a = lineupArgs(k); if (a.sha256 !== s.sha256 || a.size !== s.size || a.file !== s.file || a.parts) probs.push([k, 'lineupArgs']);
      for (const dv in ING_LINEUP.devices) { const t = ING_LINEUP.devices[dv].tiers; for (const h in t) if ([].concat(t[h]).includes(k)) probs.push([k, 'in the picking list of ' + dv + ' ' + h]); } });
    return { probs, n: L.keys.length }; });
  ok(data.n === 4 && data.probs.length === 0, 'four further models (MiniCPM5 1B, Ministral 3 3B, Nemotron 3.5 Bolt E4B, Ministral 3 14B Reasoning): each file named, sized and fingerprinted as Hugging Face lists it, with its page, licence and a note that says what it needs; none is in any house\'s picking order', data.probs.slice(0, 5));

  // 2. today's picks unchanged on her devices; each further choice can be chosen, and Back returns to the house's own
  const mine = async (kind, ram, cpu) => { await setDev(kind, ram, cpu); return p.evaluate(() => { const o = {}; ['velox', 'scriba', 'magister', 'faber'].forEach(t => { o[t] = lineupKeyFor(t); }); return o; }); };
  const mini = await mine('mac-arm', 16), mbp = await mine('mac-arm', 8), win = await mine('desktop', 16), winc = await mine('desktop', 16, true), fire = await mine('android', 3), iph = await mine('ios', 8);
  ok(mini.magister === 'qwen3.5-9b' && mini.scriba === 'gemma-4-e4b' && mbp.magister === 'qwen3.5-4b' && win.magister === 'qwen3.5-9b' && winc.magister === 'qwen3.5-4b' && fire.velox === 'lfm2.5-1.2b-instruct' && fire.scriba === 'lfm2.5-1.2b-thinking' && iph.scriba === 'minicpm5-2b',
    'her devices keep the houses they had (Mac mini, MacBook Pro, Windows with and without a graphics chip, Fire tablet, iPhone)', { mini, mbp, win, winc, fire, iph });
  const ch = await p.evaluate(() => { window.lineupDevice = () => 'mac-arm'; window.__INGENIUM_DEVICE = { ramGB: 16 }; state.tierPick = { magister: 'ministral-3-14b-reasoning', scriba: 'nemotron-3.5-bolt-e4b', velox: 'ministral-3-3b' };
    const got = { m: lineupKeyFor('magister'), s: lineupKeyFor('scriba'), v: lineupKeyFor('velox') }; state.tierPick = { magister: 'minicpm5-1b' }; got.foreign = lineupKeyFor('magister');
    window.lineupDevice = () => 'android'; window.__INGENIUM_DEVICE = { ramGB: 3 }; state.tierPick = { velox: 'minicpm5-1b', scriba: 'ministral-3-14b-reasoning' }; got.fv = lineupKeyFor('velox'); got.fs = lineupKeyFor('scriba');
    state.tierPick = {}; return got; });
  ok(ch.m === 'ministral-3-14b-reasoning' && ch.s === 'nemotron-3.5-bolt-e4b' && ch.v === 'ministral-3-3b' && ch.fv === 'minicpm5-1b', 'a further choice she picks becomes the house\'s model (Mac mini: Ministral 3 14B Reasoning for Magister; Fire: MiniCPM5 1B for Velox)', ch);
  ok(ch.foreign === 'qwen3.5-9b' && ch.fs === 'lfm2.5-1.2b-thinking', 'a pick that is not among that device\'s choices is ignored, and the house keeps its own', ch);

  // 3. the Models page lists them under each house, with what each needs and what the device has to spare
  const rows = async (kind, ram) => { await setDev(kind, ram, false); return p.evaluate(() => { go('models'); renderLineup(); const o = {};
    ['velox', 'scriba', 'magister'].forEach(t => { const box = document.querySelector('#lineupGrid .lu-tile[data-tier="' + t + '"] .lu-coders');
      o[t] = box ? [...box.querySelectorAll('.lu-cd')].map(r => [r.getAttribute('data-od').split(':')[1], (r.querySelector('.lu-cd-fit') || {}).textContent || '', (r.querySelector('.lu-cd-acts') || {}).textContent || '']) : null; }); return o; }); };
  const r16 = await rows('mac-arm', 16); await p.waitForTimeout(300); await p.screenshot({ path: OUT + '/models-16gb.png' });
  const f = (o, t, k) => (o[t] || []).find(x => x[0] === k);
  ok(f(r16, 'magister', 'ministral-3-14b-reasoning') && /Needs about 9\.3 GB: fits here/.test(f(r16, 'magister', 'ministral-3-14b-reasoning')[1]) && /Install · 7\.7 GB/.test(f(r16, 'magister', 'ministral-3-14b-reasoning')[2])
     && f(r16, 'scriba', 'nemotron-3.5-bolt-e4b') && /fits here/.test(f(r16, 'scriba', 'nemotron-3.5-bolt-e4b')[1]) && f(r16, 'velox', 'ministral-3-3b'),
    'a Mac mini with 16 GB: Magister offers Ministral 3 14B Reasoning (needs 9.3 GB, fits, Install · 7.7 GB), Scriba Nemotron 3.5 Bolt E4B, and Velox, now with a list of its own, Ministral 3 3B', { m: r16.magister && r16.magister.slice(-3), s: r16.scriba && r16.scriba.slice(-2), v: r16.velox });
  const r3 = await rows('android', 3);
  ok(f(r3, 'velox', 'minicpm5-1b') && /fits here/.test(f(r3, 'velox', 'minicpm5-1b')[1]) && f(r3, 'velox', 'ministral-3-3b') && /more than this tablet has to spare/.test(f(r3, 'velox', 'ministral-3-3b')[1]),
    'a Fire tablet with 3 GB: Velox offers MiniCPM5 1B, which fits, and Ministral 3 3B, which says it needs more than the tablet has', r3.velox);

  // 4. quicker replies: speed-up files offered on a graphics chip only, installed under the name the computer app looks for
  const sp = await p.evaluate(async () => { const keepApi = window.deskApi, keepEng = window.deskEngine, sent = [];
    window.deskApi = () => ({ install_model: a => { sent.push(a); return Promise.resolve({ ok: true }); }, install_status: () => Promise.resolve({ state: 'done' }), engine_load: () => {} });
    window.deskEngine = { gpu: true }; const M = ING_LINEUP.models;
    const can = ['nemotron-3.5-bolt-e4b', 'minicpm5-2b', 'qwen3.8-27b', 'qwen3.8-27b-best', 'lfm2.5-8b-a1b', 'lfm2.5-24b-a2b'].map(k => drafterCan(M[k]));
    try { drafterInstall('nemotron-3.5-bolt-e4b'); } catch (e) {}
    await new Promise(r => setTimeout(r, 300));
    window.deskEngine = { gpu: false }; const cpu = drafterCan(M['nemotron-3.5-bolt-e4b']);
    window.deskApi = keepApi; window.deskEngine = keepEng;
    return { can, cpu, sent: sent.map(a => ({ key: a.key, file: a.file, size: a.size, sha: a.sha256 && a.sha256.slice(0, 12) })) }; });
  ok(sp.can.every(Boolean) && sp.cpu === false, 'on a graphics chip, MiniCPM5 2B, LFM2.5 8B-A1B and 24B-A2B, Qwen3.8 27B (both copies) and Nemotron 3.5 Bolt E4B offer a speed-up file; on the processor alone none is offered (R73 measured it slower there)', sp);
  ok(sp.sent.length === 1 && sp.sent[0].key === 'nemotron-3.5-bolt-e4b-dspark' && sp.sent[0].file === 'dflash-NVIDIA-Nemotron-3.5-Bolt-E4B-Q8_0.gguf' && sp.sent[0].size === 398892256 && sp.sent[0].sha === '9a63662ae839',
    'adding it sends its file, size and fingerprint under the name the computer app reads when it loads the model', sp.sent);

  // 5. the settings each card gives
  const S = await p.evaluate(() => { const keep = window.activeTierFor; window.activeTierFor = () => 'scriba'; const g = (f, e, t) => modelSampling({ fileName: f }, e, t);
    const o = { mt: g('MiniCPM5-1B-Q4_K_M.gguf', 3, true), mp: g('MiniCPM5-1B-Q4_K_M.gguf', 3, false), m2: g('MiniCPM5-2B-Q4_K_M.gguf', 3, true), s3: g('Ministral-3-3B-Instruct-2512-Q4_K_M.gguf', 3, false),
      s14: g('Ministral-3-14B-Reasoning-2512-Q4_K_M.gguf', 3, true), bolt: g('NVIDIA-Nemotron-3.5-Bolt-E4B-UD-Q4_K_XL.gguf', 3, true) }; window.activeTierFor = keep; return o; });
  ok(S.mt.family === 'minicpm5-1b' && S.mt.temperature === 0.9 && S.mt.top_p === 0.95 && S.mp.temperature === 0.7 && S.m2.family === 'minicpm5', 'MiniCPM5 1B: 0.9 and 0.95 when it thinks, 0.7 when it answers at once (its card); MiniCPM5 2B keeps its own', [S.mt, S.mp, S.m2.family]);
  ok(S.s3.family === 'ministral-3-instruct' && S.s3.temperature === 0.1 && S.s14.family === 'ministral-3-reasoning' && S.s14.temperature === 1 && S.s14.top_p === 0.95 && S.bolt.family === 'nemotron-3.5-bolt' && S.bolt.temperature === 1,
    'Ministral 3 3B at temperature 0.1 and the 14B Reasoning at 1 with top-p 0.95 (their cards); Nemotron 3.5 Bolt E4B at 1.0 and 0.95 (its card)', [S.s3, S.s14, S.bolt]);
  ok(await p.evaluate(() => window.__ingParts.p212 === 'running'), 'the module ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
