// Ingenium 6.5 · Train a small model from zero, in four sizes (build_page.py 6.5 edits; the trainer itself is
// desktop/app_train_65.py, checked by rig/t_65_train.py). In Chromium, with a stand-in for the desktop app's trainer:
//   - the size step offers Tiny, Small, Medium and Large, each saying how many numbers it has and how much text it wants;
//   - with too little text for the chosen size, it says so plainly (a smaller size learns as much, sooner);
//   - the estimate grows with the size, in the order measured (source/rig/train_sizes.txt);
//   - Start training hands the trainer the size chosen, the passes and the text;
//   - the lesson names the large size; no page errors.
//   node rig/t_65_train.js <url of Ingenium> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const p = await (await b.newContext({ viewport: { width: 1400, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(600);
    // the desktop app's trainer, stood in for: it says it carries llama.cpp's trainer and keeps what it is asked to do
    await p.evaluate(() => { window.__trainAsked = null;
      const api = { train_available: () => ({ ok: true, trainer: true, cores: 8 }), train_status: () => ({ state: 'idle' }),
        train_start: spec => { window.__trainAsked = spec; return { ok: true, id: 'test' }; }, train_cancel: () => ({ ok: true }) };
      window.trainApi = () => api; });
    await p.evaluate(() => openTrainer(null)); await p.waitForSelector('#trBody', { timeout: 10000 }); await p.waitForTimeout(300);
    const lesson = await p.evaluate(() => document.getElementById('trBody').innerText);
    ok(/1\.3 million of them and the large one about 41 million/.test(lesson), 'the lesson names the tiny and the large size', lesson.slice(0, 300));
    await p.click('#trNext'); await p.waitForTimeout(300);
    const short = 'The tide comes in twice a day. '.repeat(200);   // 6,200 characters
    await p.fill('#trBody textarea.tr-text', short); await p.click('#trNext'); await p.waitForTimeout(400);
    const sizes = await p.evaluate(() => [...document.querySelectorAll('#trBody .seg-btn')].filter(x => /^About/.test(x.title)).map(x => ({ t: x.textContent, title: x.title, on: x.classList.contains('active') })));
    ok(sizes.map(s => s.t).join() === 'Tiny,Small,Medium,Large' && sizes[0].on, 'the size step offers Tiny, Small, Medium and Large (Tiny chosen at first)', sizes.map(s => s.t + (s.on ? '*' : '')));
    ok(/1\.3 million/.test(sizes[0].title) && /6 million/.test(sizes[1].title) && /16 million/.test(sizes[2].title) && /41 million/.test(sizes[3].title) && /500,000 characters/.test(sizes[2].title) && /2 million characters/.test(sizes[3].title),
      'each size says how many numbers it has and how much text it wants', sizes.map(s => s.title));
    const est = {};
    for (const [i, k] of [[0, 'tiny'], [1, 'small'], [2, 'medium'], [3, 'large']]) {
      await p.evaluate(i => [...document.querySelectorAll('#trBody .seg-btn')].filter(x => /^About/.test(x.title))[i].click(), i); await p.waitForTimeout(250);
      est[k] = await p.evaluate(() => ({ est: document.querySelector('#trBody .tr-est').textContent, hint: (document.querySelector('#trBody .tr-size') || {}).textContent || '' }));
    }
    const secs = t => { const m = /Roughly (.*?) on this computer/.exec(t) || []; const s = m[1] || ''; let n = 0; const h = /(\d+)\s*h/.exec(s), mi = /(\d+)\s*min/.exec(s), se = /(\d+)\s*s\b/.exec(s); if (h) n += 3600 * h[1]; if (mi) n += 60 * mi[1]; if (se) n += +se[1]; return n || NaN; };
    const raw = await p.evaluate(() => ['tiny', 'small', 'medium', 'large'].map(k => trainEstimate(500000, k, 8, 8)));
    ok(raw[0] < raw[1] && raw[1] < raw[2] && raw[2] < raw[3], 'the estimate grows with the size, as measured (500,000 characters, 8 passes, 8 cores, seconds)', raw);
    ok(/wants 50,000 characters or more; with 6,200/.test(est.small.hint) && /wants 2,000,000 characters or more/.test(est.large.hint) && !/wants/.test(est.tiny.hint),
      'with too little text for a size, it says so plainly; Tiny asks for no more', { tiny: est.tiny.hint, small: est.small.hint, large: est.large.hint });
    await p.screenshot({ path: path.join(OUT, 'train_sizes.png') });
    await p.evaluate(() => [...document.querySelectorAll('#trBody .seg-btn')].filter(x => /^About/.test(x.title))[2].click()); await p.waitForTimeout(250);
    await p.click('#trNext'); await p.waitForTimeout(800);
    const asked = await p.evaluate(() => window.__trainAsked);
    ok(asked && asked.size === 'medium' && asked.passes === 8 && asked.text === short, 'Start training hands the trainer the size chosen (Medium), the passes and the text', asked && { size: asked.size, passes: asked.passes, chars: asked.text.length });
    // 6.6: start from a model you have (desktop/app_studio_65.py on the trainer's side)
    await p.evaluate(() => { try { closeModal(); } catch (e) {} window.__trainAsked = null; window.__trainPhase = 'widening';
      const api = { train_available: () => ({ ok: true, trainer: true, cores: 8 }),
        train_status: () => window.__trainAsked ? ({ state: 'running', phase: window.__trainPhase, passes: 2, pass: 0, frac: 0.1, history: [], nvocab: 49152 }) : ({ state: 'idle' }),
        train_bases: () => ({ ok: true, ramGB: 16, models: [
          { id: 'smollm2-135m', name: 'SmolLM2 135M Instruct', params: 134515008, forms: ['F16', 'F32'], trainable: true, fits: true, needGB: 2.8 },
          { id: 'big-one', name: 'A 12B model', params: 12e9, forms: ['F16'], trainable: true, fits: false, needGB: 192.6 },
          { id: 'qwen-q4', name: 'Qwen Coder 1.5B', params: 1.5e9, forms: ['Q4_K'], trainable: false, why: 'Its numbers are packed smaller than 8 bits, which cannot be widened without loss: choose its 16-bit (F16) or 8-bit (Q8_0) file.', fits: true, needGB: 24.6 }] }),
        train_start: spec => { window.__trainAsked = spec; return { ok: true, id: 'test2' }; }, train_cancel: () => ({ ok: true }) };
      window.trainApi = () => api; });
    await p.waitForTimeout(300);
    await p.evaluate(() => openTrainer(null)); await p.waitForSelector('#trBody', { timeout: 10000 });
    await p.click('#trNext'); await p.waitForTimeout(200); await p.fill('#trBody textarea.tr-text', short); await p.click('#trNext'); await p.waitForTimeout(500);
    const from = await p.evaluate(() => [...document.querySelectorAll('#trBody .seg')][0].innerText.replace(/\s+/g, ' '));
    ok(/A new model/.test(from) && /A model you have/.test(from), 'the size step asks where to start: a new model, or a model you have', from);
    await p.evaluate(() => [...document.querySelectorAll('#trBody .seg-btn')].find(x => x.textContent === 'A model you have').click()); await p.waitForTimeout(400);
    const bm = await p.evaluate(() => ({ title: document.getElementById('trTitle').textContent, opts: [...document.querySelectorAll('#trBody select.tr-base option')].map(o => o.textContent + (o.disabled ? ' (off)' : '')),
      val: (document.querySelector('#trBody select.tr-base') || {}).value, why: (document.querySelector('#trBody .tr-why') || {}).textContent || '', size: !!document.querySelector('#trBody .seg-btn[title^="About 1.3 million"]'),
      passes: [document.querySelector('#trBody input[type=range]').min, document.querySelector('#trBody input[type=range]').max, document.querySelector('#trBody input[type=range]').value],
      est: document.querySelector('#trBody .tr-est').textContent, note: (document.querySelector('#trBody .tr-size') || {}).textContent || '' }));
    ok(/Train a model you have on your text/.test(bm.title) && bm.opts.length === 2 && /SmolLM2 135M Instruct · 135 million numbers · needs about 2.8 GB/.test(bm.opts[0]) && /\(more than this computer has\) \(off\)$/.test(bm.opts[1]) && bm.val === 'smollm2-135m',
      'a model you have: the trainable ones listed with what they need, one too large for this computer shown but not offered', bm.opts);
    ok(/Qwen Coder 1\.5B: Its numbers are packed smaller than 8 bits/.test(bm.why) && !bm.size && /One pass is enough/.test(bm.note), 'one that cannot be trained says why; no size to choose; one pass advised', { why: bm.why, note: bm.note });
    const rawB = await p.evaluate(() => [trainEstimate(500000, 'tiny', 2, 8), trainEstimate(500000, 'base:134515008', 2, 8)]);
    ok(bm.passes.join() === '1,5,1' && rawB[1] > rawB[0] * 20, 'passes from 1 to 5, one to begin with; the estimate follows the model\'s size', { passes: bm.passes, est: rawB });
    await p.screenshot({ path: path.join(OUT, 'train_from_model.png') });
    await p.click('#trNext'); await p.waitForTimeout(1500);
    const asked2 = await p.evaluate(() => window.__trainAsked);
    const line = await p.evaluate(() => (document.getElementById('trLine') || {}).textContent || '');
    ok(asked2 && asked2.base === 'smollm2-135m' && asked2.passes === 1 && asked2.from_model === '' && /Widening the model to 32-bit numbers/.test(line),
      'Start training hands the trainer the model to start from and one pass, and the progress names the widening', { asked: asked2 && { base: asked2.base, passes: asked2.passes }, line });
    // none of the person's models can be trained
    await p.evaluate(() => { try { closeModal(); } catch (e) {} window.__trainAsked = null; const a = window.trainApi(); a.train_bases = () => ({ ok: true, models: [{ id: 'qwen-q4', name: 'Qwen Coder 1.5B', params: 1.5e9, trainable: false, why: 'packed smaller', fits: true, needGB: 24.6 }] }); });
    await p.evaluate(() => openTrainer(null)); await p.waitForSelector('#trBody'); await p.click('#trNext'); await p.waitForTimeout(200);
    await p.fill('#trBody textarea.tr-text', short); await p.click('#trNext'); await p.waitForTimeout(400);
    await p.evaluate(() => [...document.querySelectorAll('#trBody .seg-btn')].find(x => x.textContent === 'A model you have').click()); await p.waitForTimeout(400);
    const none = await p.evaluate(() => (document.querySelector('#trBody .tr-none') || {}).textContent || '');
    await p.click('#trNext'); await p.waitForTimeout(500);
    const nn = await p.evaluate(() => ({ asked: window.__trainAsked, note: document.getElementById('trNote').textContent }));
    ok(/SmolLM2 135M Instruct \(271 MB\) or SmolLM2 360M Instruct \(726 MB\)/.test(none) && !nn.asked && /Choose a model to start from first/.test(nn.note),
      'with none that can be trained, it names the small open models that can, and nothing starts', { none: none.slice(0, 160), note: nn.note });
    // More models offers the two small open models to train further, in the quality For training (F16) or Best (Q8_0)
    await p.evaluate(() => { try { closeModal(); } catch (e) {} go('models'); }); await p.waitForTimeout(1500);
    const cat = await p.evaluate(() => [...document.querySelectorAll('#catBox .cat-row')].filter(r => /SmolLM2/.test(r.textContent)).map(r => ({ name: r.querySelector('b').textContent,
      q: [...r.querySelectorAll('.cat-q .seg-btn')].map(b => b.textContent), why: (r.querySelector('.cat-t .small:last-child') || r.querySelector('.cat-t')).textContent.slice(0, 140) })));
    ok(cat.length === 2 && cat[0].name === 'SmolLM2 135M Instruct' && cat[0].q.join() === 'For training,Best' && /train further on your own writing/.test(cat[0].why) && cat[1].name === 'SmolLM2 360M Instruct',
      'More models offers SmolLM2 135M and 360M Instruct to train further, in the quality For training (16-bit) or Best (8-bit)', cat);
    ok(!errs.length, 'no page errors', errs);
  } catch (e) { ok(false, 'the run crashed', e.message); }
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
