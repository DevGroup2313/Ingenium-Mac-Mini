// R116: the models, cared for. Quality tiers on the houses (from the verified table), the pace measured by the engine,
// health model by model, and the larger catalogue grouped by what fits this device. Stand-ins take the engine's place.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  const parts = await p.evaluate(() => window.__ingParts);
  ok(parts.p47 === 'running' && parts.p46 === 'running', 'the models part (p47) runs beside the academic part', JSON.stringify({ p46: parts.p46, p47: parts.p47 }));

  // 1. the verified quality table: 13 house models with Fast, Balanced and Best; each variant a file, a size and a 64-hex fingerprint
  const table = await p.evaluate(() => { const T = IngQuality.table; const keys = Object.keys(T); let n = 0, good = 0; keys.forEach(k => Object.keys(T[k]).forEach(q => { n++; const v = T[k][q]; if (/^[0-9a-f]{64}$/.test(v.sha256) && v.size > 1e8 && /\.gguf$/.test(v.file) && v.url.indexOf('https://huggingface.co/') === 0) good++; })); return { keys: keys.length, n, good, gemma: !!T['gemma-4-12b'], q4: T['qwen3.5-4b'].Q4_K_M.sha256 === ING_LINEUP.models['qwen3.5-4b'].sha256 && T['qwen3.5-4b'].Q4_K_M.size === ING_LINEUP.models['qwen3.5-4b'].size }; });
  ok(table.keys === 13 && table.n === table.good && table.n >= 50 && !table.gemma, 'the table holds 13 house models and every variant has a file, a size and a fingerprint; Gemma 4 (one form) is not in it', JSON.stringify(table));
  ok(table.q4, "a house's Fast variant is the very file the lineup already shipped (same size, same fingerprint)", String(table.q4));

  // 2. the strip on the tiles, and what choosing Best does
  await p.evaluate(() => { window.__INGENIUM_DEVICE = { ramGB: 16, cores: 8 }; go('models'); }); await p.waitForTimeout(900);
  const strip = await p.evaluate(() => { const t = document.querySelector('.lu-tile[data-key="qwen3.5-4b"], .lu-tile[data-key="qwen3.5-9b"]'); const q = t && t.querySelector('.lu-q'); const g = document.querySelector('.lu-tile[data-key^="gemma-4"] .lu-q'); return { key: t && t.getAttribute('data-key'), labels: q ? [...q.querySelectorAll('.seg-btn')].map(b => b.textContent) : [], note: q && q.querySelector('.lu-q-note').textContent, gemma: g ? g.textContent.slice(0, 60) : null }; });
  ok(strip.labels.join(',') === 'Fast,Balanced,Best', "a house's tile offers Fast, Balanced and Best", JSON.stringify(strip));
  ok(/Hugging Face listed on 17 October 2026/.test(strip.note || ''), 'and says where the size and fingerprint come from', strip.note);
  const gemmaNote = await p.evaluate(() => /One form: Google trained this 4-bit file itself \(quantisation-aware training\)/.test(document.documentElement.outerHTML) && !IngQuality.variants('gemma-4-12b') && !!IngQuality.variants('qwen3.5-4b'));
  ok(gemmaNote, 'Gemma 4 has one form and a note saying why; a Qwen house has variants (on this 16 GB stand-in no Gemma house is shown)', String(gemmaNote));
  const before = await p.evaluate(k => { const sp = ING_LINEUP.models[k]; return { file: sp.file, size: sp.size, sha: sp.sha256, args: lineupArgs(k).url }; }, strip.key);
  await p.evaluate(k => { [...document.querySelectorAll('.lu-tile[data-key="' + k + '"] .lu-q .seg-btn')].find(b => b.textContent === 'Best').click(); }, strip.key); await p.waitForTimeout(600);
  const after = await p.evaluate(k => { const sp = ING_LINEUP.models[k]; const T = IngQuality.table[k].Q8_0; const t = document.querySelector('.lu-tile[data-key="' + k + '"]'); return { file: sp.file, size: sp.size, sha: sp.sha256, url: lineupArgs(k).url, isBest: sp.file === T.file && sp.size === T.size && sp.sha256 === T.sha256 && lineupArgs(k).url === T.url, state: t.querySelector('.lu-state').textContent, chosen: IngQuality.chosen(k), kept: state.lineupQuality[k], active: t.querySelector('.lu-q .seg-btn.active').textContent }; }, strip.key);
  ok(after.isBest && after.file !== before.file && after.size > before.size, "choosing Best turns the house's listing to the Q8_0 file: its name, size, fingerprint and address, as the install will use them", JSON.stringify({ before: before.file, after: after.file, size: after.size }));
  ok(after.active === 'Best' && after.kept === 'Q8_0' && new RegExp(fmtB(after.size)).test(after.state), 'the tile shows Best chosen and the larger size; the choice is kept in the state', JSON.stringify({ active: after.active, kept: after.kept, state: after.state }));
  function fmtB(n) { return (n / 1073741824).toFixed(1).replace(/\.0$/, ''); }
  await p.screenshot({ path: OUT + '/models-houses.png' });
  // a record installed at either quality belongs to the house; the house prefers the chosen quality's file
  const recs = await p.evaluate(k => { const T = IngQuality.table[k]; state.models = state.models.filter(m => !/^mq_/.test(m.id));
    state.models.push({ id: 'mq_fast', customName: 'Fast copy', fileState: 'ready', fileName: T.Q4_K_M.file, sizeBytes: T.Q4_K_M.size, stored: true, shellStored: true, quant: 'Q4_K_M', type: 'GGUF' });
    state.models.push({ id: 'mq_best', customName: 'Best copy', fileState: 'ready', fileName: T.Q8_0.file, sizeBytes: T.Q8_0.size, stored: true, shellStored: true, quant: 'Q8_0', type: 'GGUF' });
    const r1 = lineupRec(k).id; IngQuality.set(k, 'Q4_K_M'); const r2 = lineupRec(k).id; const keyOf = lineupKeyOfRec(state.models.find(m => m.id === 'mq_best'));
    return { r1, r2, keyOf, k }; }, strip.key);
  ok(recs.r1 === 'mq_best' && recs.r2 === 'mq_fast' && recs.keyOf === recs.k, 'the house uses the record of the chosen quality, and a Best file is known as the house\'s model too', JSON.stringify(recs));

  // 3. the pace: a reply timed from its first word, and the engine's own count used when it gives one
  const pace = await p.evaluate(async () => { perfState().length = 0; state.activeModelId = 'mq_fast'; Engine.modelId = 'mq_fast'; Engine.status = 'ready';
    const bot = { role: 'bot', text: '', live: true }; const tk = thinkTrack(bot); const t0 = Date.now(); await new Promise(r => setTimeout(r, 350)); tk.token('The first words of a reply, written by a stand-in engine, '); await new Promise(r => setTimeout(r, 400)); tk.token('and the rest of it, counted as it goes.'); tk.end(); delete bot.live;
    const approx = { at: bot.at, firstAt: bot.firstAt, done: bot.done };
    DeskAdapter.lastStats = { tokens: 42, tokens_per_second: 17.5, prompt_tokens: 300, prompt_per_second: 600 }; perfRecord(bot); const r1 = perfState()[0]; perfRecord(bot); const n1 = perfState().length;
    // the same model again, so its sparkline has two points
    const bx = { role: 'bot', text: '', live: true }; const kx = thinkTrack(bx); await new Promise(r => setTimeout(r, 320)); kx.token('Another reply from the same model, long enough to count.'); kx.end(); delete bx.live; DeskAdapter.lastStats = { tokens: 30, tokens_per_second: 16.1, prompt_tokens: 320, prompt_per_second: 640 }; perfRecord(bx);
    // a second model, without the engine's count: counted from characters, marked approximate
    DeskAdapter.lastStats = null; state.activeModelId = 'mq_best'; const b2 = { role: 'bot', text: '', live: true }; const k2 = thinkTrack(b2); await new Promise(r => setTimeout(r, 320)); k2.token('A reply of some length, so that its pace can be counted from its characters alone and marked as such.'); k2.end(); delete b2.live; b2.done = Date.now(); perfRecord(b2); const r2 = perfState()[0];
    return { approx: { hasAt: !!approx.at, firstAfter: approx.firstAt - approx.at, done: !!approx.done }, r1, n1, r2, n: perfState().length }; });
  ok(pace.approx.hasAt && pace.approx.firstAfter >= 300 && pace.approx.done, 'a reply is stamped when it starts, when its first word comes and when it ends', JSON.stringify(pace.approx));
  ok(pace.r1 && pace.r1.measured && pace.r1.tps === 17.5 && pace.r1.tok === 42 && pace.r1.read === 500 && pace.r1.first >= 300 && pace.n1 === 1, "the engine's own count is kept (42 tokens at 17.5 a second, the question read in 0.5 s) and a reply is recorded once", JSON.stringify(pace.r1));
  ok(pace.r2 && !pace.r2.measured && pace.r2.tps > 0 && pace.r2.mid === 'mq_best' && pace.n === 3, 'without the engine\'s count the pace is counted from characters and marked approximate', JSON.stringify(pace.r2));
  // the chip in the chat's top bar
  await p.evaluate(() => go('chat')); await p.waitForTimeout(900);
  const chip = await p.evaluate(() => { const c = document.getElementById('paceChip'); return { there: !!c, hidden: c && c.hidden, text: c && c.textContent.trim(), approx: c && c.classList.contains('approx'), title: c && c.title.slice(0, 80) }; });
  ok(chip.there && !chip.hidden && /tokens\/s/.test(chip.text), 'the chat\'s top bar carries the pace chip with the last reply\'s figure', JSON.stringify(chip));
  const live = await p.evaluate(async () => { const bot = { role: 'bot', text: '', live: true, at: Date.now(), firstAt: Date.now() - 2000, text: 'x'.repeat(360) }; liveBot = bot; await new Promise(r => setTimeout(r, 1100)); const c = document.getElementById('paceChip'); const out = { live: c.classList.contains('live'), text: c.textContent.trim() }; liveBot = null; return out; });
  ok(live.live && /^≈ \d+(\.\d)? tokens\/s/.test(live.text), 'while a reply streams the chip is live and shows an approximate pace', JSON.stringify(live));
  await p.screenshot({ path: OUT + '/models-chip.png', clip: { x: 230, y: 60, width: 1120, height: 70 } });

  // 4. health, model by model
  await p.evaluate(() => go('models')); await p.waitForTimeout(1200);
  const health = await p.evaluate(() => { const rows = [...document.querySelectorAll('#healthBox .hm-row')]; const best = rows.find(r => /Best copy/.test(r.textContent)); const fast = rows.find(r => /Fast copy/.test(r.textContent)); return { n: rows.length, best: best && [...best.querySelectorAll('.hm-tag')].map(t => t.className.replace('hm-tag', '').trim() + ':' + t.textContent), fast: fast && [...fast.querySelectorAll('.hm-tag')].map(t => t.textContent), spark: !!(fast && fast.querySelector('.hl-spark')), check: !!document.querySelector('#healthBox .hm-head button'), engine: (document.querySelector('#healthBox .hl-first') || {}).textContent }; });
  ok(health.n >= 2 && health.best && health.best.some(t => /ok:size matches its listing/.test(t)) && health.best.some(t => /fingerprint checked when installed/.test(t)), 'each installed model has a health line: the Best copy\'s size matches its listing and its fingerprint was checked', JSON.stringify(health.best));
  ok(health.fast && health.fast.some(t => /^16\.1 tokens\/s last time, first word in 0\.[3-9] s/.test(t)) && health.spark, 'the Fast copy shows its measured pace and a sparkline of its two replies', JSON.stringify({ fast: health.fast, spark: health.spark }));
  // a file whose size does not match its listing is named
  const bad = await p.evaluate(() => { const m = state.models.find(x => x.id === 'mq_best'); m.sizeBytes = m.sizeBytes - 5000000; renderHealth(); const row = [...document.querySelectorAll('#healthBox .hm-row')].find(r => /Best copy/.test(r.textContent)); return [...row.querySelectorAll('.hm-tag.bad')].map(t => t.textContent); });
  const advice = await p.evaluate(() => [...document.querySelectorAll('#healthBox .hl-a')].map(a => a.className.replace('hl-a', '').trim() + ':' + a.textContent.slice(0, 90)));
  ok(advice.some(a => /^bad:Best copy's file is .* where its listing says/.test(a)) && !advice.some(a => /^ok:/.test(a)), "the card's advice names the short file and no longer says all is well", JSON.stringify(advice));
  ok(bad.length === 1 && /its file is ([\d.]+ MB) but the listing says ([\d.]+ MB): install it again/.test(bad[0]) && bad[0].match(/[\d.]+ MB/g)[0] !== bad[0].match(/[\d.]+ MB/g)[1], 'a file that is not the size its listing gives is called out in figures that differ, with the remedy', JSON.stringify(bad));
  await p.evaluate(() => { document.getElementById('healthBox').scrollIntoView(); }); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/models-health.png' });

  // 5. the catalogue: 34 models, grouped by what fits, with filters and a search
  // 6.7: the catalogue has a room of its own on the Models page (r173); its tab is pressed first, as a person would
  await p.evaluate(() => { const t = document.getElementById('rmT-models-catalogue'); if (t) t.click(); }); await p.waitForTimeout(300);
  const cat = await p.evaluate(() => { const box = document.getElementById('catBox'); const groups = [...box.querySelectorAll('.cat-group')].map(g => g.textContent); return { n: ING_CATALOG.length, rows: box.querySelectorAll('.cat-row').length, groups, eyes: ING_CATALOG.filter(e => e.eyes).length, code: ING_CATALOG.filter(e => e.code).length, vision: ING_CATALOG.filter(e => e.vision).every(e => e.vision.repos.length && e.vision.prefer.length), more: !!box.querySelector('.cat-more'), filters: [...box.querySelectorAll('.cat-tools .seg-btn')].map(b => b.textContent) }; });
  ok(cat.n === 34 && cat.eyes >= 10 && cat.code >= 3 && cat.vision, 'the catalogue holds 34 models; those that read pictures carry a projector listing, and the coders are marked', JSON.stringify({ n: cat.n, eyes: cat.eyes, code: cat.code }));
  ok(cat.groups.length === 2 && /^Fits this device · \d+/.test(cat.groups[0]) && /^Too large for this device · \d+/.test(cat.groups[1]) && cat.more, 'on a 16 GB device the list is grouped into what fits and what is too large, the large ones folded away', JSON.stringify(cat.groups));
  ok(cat.filters.join(',') === 'All,Answers at once,Thinks first,For code,Reads pictures', 'the filters are there', cat.filters.join(','));
  await p.evaluate(() => { [...document.querySelectorAll('#catBox .cat-tools .seg-btn')].find(b => b.textContent === 'Reads pictures').click(); }); await p.waitForTimeout(400);
  const eyes = await p.evaluate(() => { const rows = [...document.querySelectorAll('#catBox .cat-row')]; return { n: rows.length, all: rows.every(r => r.querySelector('.cat-tag.eyes')) }; });
  ok(eyes.n >= 3 && eyes.all, 'Reads pictures shows only the models with eyes', JSON.stringify(eyes));
  await p.evaluate(() => { [...document.querySelectorAll('#catBox .cat-tools .seg-btn')].find(b => b.textContent === 'All').click(); }); await p.waitForTimeout(300);
  await p.fill('#catBox input[type=search]', 'granite'); await p.waitForTimeout(400);
  const found = await p.evaluate(() => [...document.querySelectorAll('#catBox .cat-row b')].map(b => b.textContent));
  ok(found.length === 2 && found.every(t => /Granite/.test(t)), 'the search narrows the list to the two Granite 4.0 models', JSON.stringify(found));
  await p.fill('#catBox input[type=search]', ''); await p.waitForTimeout(400);
  await p.evaluate(() => { document.getElementById('catBox').scrollIntoView(); }); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/models-catalogue.png' });
  // the whole page, by night
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); window.scrollTo(0, 0); document.getElementById('lineupGrid').scrollIntoView(); }); await p.waitForTimeout(500);
  await p.screenshot({ path: OUT + '/models-night.png' });
  await p.evaluate(() => document.body.setAttribute('data-theme', 'day'));

  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH', e); process.exit(2); });
