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
    const sizes = await p.evaluate(() => [...document.querySelectorAll('#trBody .seg .seg-btn')].map(x => ({ t: x.textContent, title: x.title, on: x.classList.contains('active') })));
    ok(sizes.map(s => s.t).join() === 'Tiny,Small,Medium,Large' && sizes[0].on, 'the size step offers Tiny, Small, Medium and Large (Tiny chosen at first)', sizes.map(s => s.t + (s.on ? '*' : '')));
    ok(/1\.3 million/.test(sizes[0].title) && /6 million/.test(sizes[1].title) && /16 million/.test(sizes[2].title) && /41 million/.test(sizes[3].title) && /500,000 characters/.test(sizes[2].title) && /2 million characters/.test(sizes[3].title),
      'each size says how many numbers it has and how much text it wants', sizes.map(s => s.title));
    const est = {};
    for (const [i, k] of [[0, 'tiny'], [1, 'small'], [2, 'medium'], [3, 'large']]) {
      await p.evaluate(i => document.querySelectorAll('#trBody .seg .seg-btn')[i].click(), i); await p.waitForTimeout(250);
      est[k] = await p.evaluate(() => ({ est: document.querySelector('#trBody .tr-est').textContent, hint: (document.querySelector('#trBody .tr-size') || {}).textContent || '' }));
    }
    const secs = t => { const m = /Roughly (.*?) on this computer/.exec(t) || []; const s = m[1] || ''; let n = 0; const h = /(\d+)\s*h/.exec(s), mi = /(\d+)\s*min/.exec(s), se = /(\d+)\s*s\b/.exec(s); if (h) n += 3600 * h[1]; if (mi) n += 60 * mi[1]; if (se) n += +se[1]; return n || NaN; };
    const raw = await p.evaluate(() => ['tiny', 'small', 'medium', 'large'].map(k => trainEstimate(500000, k, 8, 8)));
    ok(raw[0] < raw[1] && raw[1] < raw[2] && raw[2] < raw[3], 'the estimate grows with the size, as measured (500,000 characters, 8 passes, 8 cores, seconds)', raw);
    ok(/wants 50,000 characters or more; with 6,200/.test(est.small.hint) && /wants 2,000,000 characters or more/.test(est.large.hint) && !/wants/.test(est.tiny.hint),
      'with too little text for a size, it says so plainly; Tiny asks for no more', { tiny: est.tiny.hint, small: est.small.hint, large: est.large.hint });
    await p.screenshot({ path: path.join(OUT, 'train_sizes.png') });
    await p.evaluate(() => document.querySelectorAll('#trBody .seg .seg-btn')[2].click()); await p.waitForTimeout(250);
    await p.click('#trNext'); await p.waitForTimeout(800);
    const asked = await p.evaluate(() => window.__trainAsked);
    ok(asked && asked.size === 'medium' && asked.passes === 8 && asked.text === short, 'Start training hands the trainer the size chosen (Medium), the passes and the text', asked && { size: asked.size, passes: asked.passes, chars: asked.text.length });
    ok(!errs.length, 'no page errors', errs);
  } catch (e) { ok(false, 'the run crashed', e.message); }
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
