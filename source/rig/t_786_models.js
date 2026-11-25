// Ingenium 7.86: Inkling 2, the Oracle house and Find models (modules/r385.js); Ingenia to the left and what an app is (r386, r387).
// A Mac mini with 64 GB is played through the computer app's bridge (window.pywebview.api), its newer engine reporting the kinds only it
// reads; Hugging Face is played by a stand-in for netFetch. Nothing is downloaded.
//   node rig/t_786_models.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const BRIDGE = () => { if (window.top !== window) return; window.__INGENIUM_DEVICE = { ramGB: 64 }; window.__eng = { newer: true, choice: 'auto' };
  window.pywebview = { api: {
    engine_info: () => Promise.resolve({ available: true, platform: 'macos-arm64', version: 'llama.cpp b11321', gpu: 'Apple M4', devices: [], state: 'off', device: { ramGB: 64, cores: 10 } }),
    engine_status: () => Promise.resolve({ state: 'off' }), engine_load: () => Promise.resolve({ ok: false }), engine_unload: () => Promise.resolve(true),
    engine_choice: () => { const E = window.__eng; return Promise.resolve({ choice: E.choice, proven: { available: true, version: 'llama.cpp b11321', kinds: 154 },
      newer: E.newer ? { available: true, version: 'llama.cpp b12723', kinds: 190, only: ['inkling2', 'inkling2_loop', 'lfm3'] } : { available: false, version: '', kinds: null, only: [] }, running: null }); },
    installed_models: () => Promise.resolve([]) } }; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); await ctx.addInitScript(BRIDGE);
  const p = await ctx.newPage(); p.setDefaultTimeout(120000); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngR385 && window.IngAppFacts, null, { timeout: 600000 }); await p.waitForTimeout(2500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  // 1. the gate and the houses
  const g1 = await p.evaluate(async () => { await IngR385.ask(); IngR385.place(); return { dev: lineupDevice(), use: lineupUsableGB(), gate: IngR385.gate(), mag: lineupKeyFor('magister'), fab: lineupKeyFor('faber'), mini: ING_LINEUP.models['inkling-2-mini'] && ING_LINEUP.models['inkling-2-mini'].kind }; });
  ok(g1.dev === 'mac-arm' && g1.mag === 'inkling-2-mini' && g1.fab === 'inkling-2-mini', 'a 64 GB Mac whose newer engine reads inkling2_loop: Inkling 2 Mini is Magister and Faber', g1);
  const g2 = await p.evaluate(async () => { window.__eng.choice = 'proven'; await IngR385.ask(); IngR385.place(); const a = lineupKeyFor('magister'); window.__eng.choice = 'auto'; window.__eng.newer = false; await IngR385.ask(); IngR385.place(); const c = lineupKeyFor('magister'); return { proven: a, none: c, oracle: IngR385.oracle() }; });
  ok(g2.proven !== 'inkling-2-mini' && g2.none !== 'inkling-2-mini' && g2.oracle.indexOf('inkling-2-mini') >= 0, 'with the proven engine only, or no newer engine, Inkling 2 is never a house\'s model, and waits under Oracle', g2);
  // 2. the Oracle tile, smallest first, each with what it needs
  await p.evaluate(async () => { window.__eng.newer = true; await IngR385.ask(); IngR385.place(); go('models'); try { IngRooms.open('models', 'get'); } catch (e) {} renderLineup(); }); await p.waitForTimeout(1500);
  const o1 = await p.evaluate(() => { const t = document.querySelector('#lineupGrid .lu-tile[data-tier="oracle"]'); if (!t) return null; const rows = [...t.querySelectorAll('.lu-cd')];
    const sizes = rows.map(r => ING_LINEUP.models[r.getAttribute('data-cd')].size); return { n: rows.length, sorted: sizes.every((s, i) => !i || s >= sizes[i - 1]), state: t.querySelector('.lu-state').textContent, waits: t.querySelectorAll('.lu-cd-wait').length, left: /first Inkling/.test(t.textContent), key: !!t.querySelector('.mc-shelfkey') }; });
  ok(o1 && o1.n === 12 && o1.sorted && /0 of 12 fit/.test(o1.state) && o1.waits === 12 && o1.left, 'Oracle: twelve models, smallest first, none fits 64 GB and each says it needs a stronger computer; the first Inkling is said to be left out', o1);
  const o2 = await p.evaluate(async () => { window.__INGENIUM_DEVICE = { ramGB: 512 }; renderLineup(); await new Promise(r => setTimeout(r, 300)); const t = document.querySelector('#lineupGrid .lu-tile[data-tier="oracle"]');
    const out = { state: t.querySelector('.lu-state').textContent, installs: [...t.querySelectorAll('.lu-cd .btn.primary')].map(b => b.closest('.lu-cd').getAttribute('data-cd')) }; window.__INGENIUM_DEVICE = { ramGB: 64 }; renderLineup(); return out; });
  ok(/fit/.test(o2.state) && o2.installs.indexOf('inkling-2-small') >= 0 && o2.installs.indexOf('kimi-k3-best') < 0, 'on 512 GB the ones that fit install from their rows (Inkling 2 Small among them), the largest still waits', o2);
  // 3. a firm limit on Inkling 2's replies
  const cap = await p.evaluate(() => ({ ink: IngR385.capped({ params: { max_tokens: 30000 } }, { fileName: 'Inkling-2-Mini-IQ4_NL.gguf' }).params.max_tokens, other: IngR385.capped({ params: { max_tokens: 30000 } }, { fileName: 'Qwen3.6-35B-A3B-Q4_K_M.gguf' }).params.max_tokens }));
  ok(cap.ink === 8192 && cap.other === 30000, 'Inkling 2 never writes more than 8,192 tokens in one reply; other models are as asked', cap);
  // 4. Find models: its room, the sites with their keys, and a search with its four checks
  await p.evaluate(() => { try { IngRooms.open('models', 'find'); } catch (e) {} }); await p.waitForTimeout(800);
  const f1 = await p.evaluate(() => { const c = document.getElementById('fmCard'); if (!c) return null; const sites = [...c.querySelectorAll('#fmSites .fm-src')].map(s => ({ name: (s.querySelector('b') || {}).textContent, keys: [...s.querySelectorAll('.fm-k')].map(k => k.textContent.replace('↗', '').trim() + ' ' + (k.getAttribute('href') || '')) }));
    return { shown: !!c.offsetParent, tab: [...document.querySelectorAll('#page-models button, #page-models [role=tab]')].some(x => x.textContent.trim() === 'Find models'), sites }; });
  const hf = f1 && f1.sites.find(s => s.name === 'Hugging Face'), ol = f1 && f1.sites.find(s => s.name === 'Ollama'), lm = f1 && f1.sites.find(s => s.name === 'LM Studio');
  ok(f1 && f1.shown && f1.tab && hf && hf.keys.some(k => /^Sign in https:\/\/huggingface\.co\/login$/.test(k)) && ol && ol.keys.some(k => /ollama\.com\/signin/.test(k)) && lm && lm.keys.some(k => /lmstudio\.ai\/login/.test(k)) && f1.sites.some(s => s.name === 'Another site'), 'Find models is a room of its own; each site is a card with its own Open and Sign in keys, and another site can be given', f1);
  await p.evaluate(() => { const H = 'https://huggingface.co/api/'; const J = (o) => Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve(JSON.stringify(o)) });
    const lfs = (n, s) => ({ type: 'file', path: n, size: s, lfs: { oid: 'a'.repeat(64), size: s } });
    window.netFetch = (u) => { if (u.indexOf(H + 'models?search=') === 0) return J([{ id: 'ggml-org/Inkling-2-Mini-GGUF', tags: ['gguf'] }, { id: 'unsloth/inkling-GGUF', tags: ['gguf'] }]);
      if (/models\/ggml-org\/Inkling-2-Mini-GGUF\/tree/.test(u)) return J([lfs('Inkling-2-Mini-Q4_0.gguf', 15e9), lfs('mmproj-Inkling-2-Mini-Q8_0.gguf', 3.4e8)]);
      if (/models\/unsloth\/inkling-GGUF\/tree/.test(u)) return J([lfs('UD-IQ1_S/inkling-UD-IQ1_S-00001-of-00001.gguf', 2.7e11)]);
      if (/models\/ggml-org\/Inkling-2-Mini-GGUF$/.test(u)) return J({ gguf: { architecture: 'inkling2_loop', total: 2.62e10 }, cardData: { license: 'apache-2.0' } });
      if (/models\/unsloth\/inkling-GGUF$/.test(u)) return J({ gguf: { architecture: 'inkling', total: 9.75e11 }, cardData: { license: 'apache-2.0' } });
      return Promise.resolve({ ok: false, status: 404, text: () => Promise.resolve('') }); };
    document.getElementById('fmQ').value = 'Inkling'; IngR385.search(); });
  await p.waitForFunction(() => IngR385.rows().length === 2, null, { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(400);
  const f2 = await p.evaluate(() => [...document.querySelectorAll('#fmList .fm-row')].map(r => ({ id: r.querySelector('b').textContent, chips: [...r.querySelectorAll('.fm-chip')].map(c => c.className.replace('fm-chip ', '') + ':' + c.textContent), key: (r.querySelector('.fm-acts button') || {}).textContent, dis: (r.querySelector('.fm-acts button') || {}).disabled })));
  const mini = f2.find(r => /Inkling-2-Mini/.test(r.id)), v1 = f2.find(r => /inkling-GGUF/.test(r.id));
  ok(mini && mini.chips.some(c => /^ok:Kind: inkling2_loop/.test(c)) && mini.chips.some(c => /Licence: apache-2.0/.test(c)) && mini.chips.some(c => /Fingerprint/.test(c)) && mini.key === 'Install' && !mini.dis, 'a search: Inkling 2 Mini shows its four checks, and can be installed here (the newer engine reads its kind)', mini);
  ok(v1 && v1.chips.some(c => /^bad:Kind: inkling/.test(c)) && v1.dis, 'the first Inkling: no engine reads its kind, so it cannot be installed', v1);
  // 5. the chips stand raised and lift under the pointer
  const chip = await p.$('#fmList .fm-chip'); const cb = await chip.boundingBox(); await p.mouse.move(cb.x + cb.width / 2, cb.y + cb.height / 2); await p.waitForTimeout(450);
  ok(/matrix\(1, 0, 0, 1, 0, -2\)/.test(await p.evaluate(() => getComputedStyle(document.querySelector('#fmList .fm-chip')).transform)), 'a chip lifts under the pointer');
  await p.screenshot({ path: OUT + '/find_models.png' });
  await p.evaluate(() => { try { IngRooms.open('models', 'get'); } catch (e) {} }); await p.waitForTimeout(600);
  await p.evaluate(() => { const t = document.querySelector('#lineupGrid .lu-tile[data-tier="oracle"]'); if (t) t.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(500); await p.screenshot({ path: OUT + '/oracle.png' });
  // 6. what an app is, as she says it: the summary that called her app a Windows app is corrected, and the facts go first in the notes
  const a1 = await p.evaluate(() => { const L = IngAppFacts.of('Carpe Diem'); const f = { name: 'Carpe Diem', app: { brief: 'Carpe Diem is a standalone Windows app running offline in a browser.' } }; const fixed = IngAppFacts.fix(f);
    return { facts: L.map(x => x.t), fixed, brief: f.app.brief, note: f.app.fixNote, block: IngAppFacts.block('Carpe Diem') }; });
  ok(a1.facts.length === 1 && a1.fixed && a1.brief === 'Carpe Diem is an app for all devices running offline in a browser.' && /Corrected at your word/.test(a1.note) && /WHAT THE APP IS/.test(a1.block), "Carpe Diem: an app for all devices; the summary's \"Windows app\" is corrected and says so", a1);
  // 7. Ingenia starts at the left, under its tabs
  await p.setViewportSize({ width: 3440, height: 1440 }); await p.evaluate(() => go('folders')); await p.waitForTimeout(1500);
  const al = await p.evaluate(() => { const L = s => { const e = document.querySelector(s); return e && e.offsetParent ? Math.round(e.getBoundingClientRect().left) : null; }; return { head: L('#page-folders .fd-head'), body: L('#page-folders .fld-wrap'), tabs: L('#page-folders .fw-homebar') }; });
  ok(al.head !== null && al.head === al.tabs && al.body === al.tabs, 'Ingenia on a 3,440-pixel screen: its head and its rooms start where its tabs start', al);
  await p.screenshot({ path: OUT + '/ingenia_wide.png' });
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
