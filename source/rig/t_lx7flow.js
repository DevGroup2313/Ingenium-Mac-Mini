// Lector from start to finish with a stand-in model: a set of two apps, a posting, a CV, every document; then saved
const { start } = require('./lib.js');
const fs = require('fs');
(async () => {
  const S = process.env.S;
  const { browser, page, logs } = await start({ viewport: { width: 1440, height: 900 } });
  await page.evaluate(() => {
    state.models = state.models || [];
    state.models.push({ id: 'fake1', customName: 'Test Magister 9B', fileState: 'ready', ctx: 32768, paramB: 9, size: 6e9 });
    window.ingEnsureLoaded = function () { return Promise.resolve(); };
    Engine.status = 'ready'; Engine.setStatus = function (s) { Engine.status = s; };
    window.__calls = [];
    Engine.generate = function (job) { const u = job.messages[job.messages.length - 1].content; window.__calls.push(u.slice(0, 120)); let t;
      if (/Write notes on this part/.test(u)) t = 'What it does:\n- It keeps every page on the device and works with no connection.\n- It shows 42 screens.\nNotable details:\n- nothing here';
      else if (/Combine|combine|join/i.test(u) && /NOTES|notes/.test(u) && !/Write the section/.test(u)) t = '- It keeps every page on the device.\n- It works offline.';
      else if (/Write the section "/.test(u) && /deep analysis/.test(u)) t = 'The app keeps everything on the device and asks for no connection. It was built in many passes.';
      else if (/cover letter/i.test(u)) t = 'Dear [the reader\'s name],\n\nI am writing to apply for the post of Research Software Engineer. As [your current role], I designed and built these apps alone.\n\nThe work answers what the post asks for: research software that lasts.\n\nYours sincerely,\n\nYannie D. Forest';
      else if (/Projects section/.test(u)) t = '**Ingenium · an offline studio for local models · [the years]**\n- Built a studio of 1,234 functions.\n- Designed calm layouts.\n\nSkills: design, programming.';
      else if (/short introduction/.test(u)) t = 'The tables that follow were measured from the files themselves.';
      else t = 'I designed this work to keep every page on the device. It answers a plain need: careful work without a server. In 2026 I measured it at 99,999 lines.';
      return new Promise(r => setTimeout(() => { job.onToken(t); r({ text: t, stats: {} }); }, 15)); };
  });
  // her apps: this copy of Ingenium, and Inkwell's page
  await page.evaluate(() => { const i = document.createElement('input'); i.type = 'file'; i.id = '__f'; i.multiple = true; document.body.appendChild(i); });
  await page.setInputFiles('#__f', ['/root/.claude/uploads/d39fdd94-06f3-51ef-8895-bcbb5e212e6c/5d95cd55-Inkwell_v7p41_standalone.html', S + '/rig/app/ingenium.html']);
  await page.evaluate(() => libAddFiles(document.getElementById('__f').files));
  await page.waitForFunction(() => !LIB.busy && AppLib.apps().length >= 2, null, { timeout: 120000 });
  console.log('kept:', await page.evaluate(() => AppLib.apps().map(a => a.key + ' ' + a.version).join(', ')));
  await page.evaluate(() => go('lector')); await page.waitForTimeout(1200);
  // the brief: Ingenium and Inkwell, for a job, every document; a posting and a CV
  await page.evaluate(async () => { const L = IngLector.state(); L.brief.apps = ['ingenium', 'inkwell']; L.brief.purpose = 'job'; L.brief.docs = { dossier: true, appendix: true, portfolio: true, cover: true, cv: true }; L.brief.modelId = 'fake1'; L.brief.depth = 'overview';
    const post = 'Research Software Engineer\nCentre for Digital Humanities, University of Example\n\nWhat you will do:\n- Build research software in JavaScript\n- Explain your work to non-specialists\n- Keep software that lasts\n\nApplications close 14 November 2026';
    const ref = IngBig.newId(); await IngBig.put(ref, post); L.posts.job = Object.assign({ id: 'ptest', ref: ref, name: 'posting.txt', chars: post.length, at: Date.now() }, IngLector.parsePost(post));
    const cvr = IngBig.newId(); await IngBig.put(cvr, 'Yannie D. Forest\nMontreal\nIndependent software designer, 2024 to 2026\nBA in English Literature'); L.me.cv = { ref: cvr, name: 'cv.txt', chars: 90, at: Date.now() };
    saveState(); IngLector.render(); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: S + '/shots/lx7_brief_job.png' });
  const t0 = Date.now();
  await page.evaluate(() => IngLector.go());
  // watch it read and write
  let shotRead = false, shotWrite = false;
  for (let i = 0; i < 900; i++) { await page.waitForTimeout(1000);
    const st = await page.evaluate(() => { const j = IngLector.state().job; return { s: j && j.status, made: j && Object.keys(j.made || {}).length, err: j && j.err, live: !!IngLector.R7.live }; });
    if (!shotRead && st.s === 'reading' && i > 4) { await page.screenshot({ path: S + '/shots/lx7_reading.png' }); shotRead = true; }
    if (!shotWrite && st.s === 'writing' && st.live) { await page.waitForTimeout(400); await page.screenshot({ path: S + '/shots/lx7_writing.png' }); shotWrite = true; }
    if (st.s === 'done' || st.s === 'error' || st.s === 'paused') { console.log('ended', JSON.stringify(st), 'in', Math.round((Date.now() - t0) / 1000), 's'); break; } }
  const res = await page.evaluate(async () => { const L = IngLector.state(), j = L.job, set = L.sets[j.key]; const out = { key: j.key, kinds: Object.keys(set.docs), calls: window.__calls.length };
    out.docs = {}; for (const k of Object.keys(set.docs)) { const md = await IngBig.load(set.docs[k].ref); out.docs[k] = { words: md.split(/\s+/).length, chk: set.docs[k].chk, head: md.slice(0, 160) }; }
    out.events = IngLector.R7.ev.map(e => e.k).reduce((a, k) => (a[k] = (a[k] || 0) + 1, a), {}); return out; });
  console.log(JSON.stringify(res, null, 1));
  // each document on the paper, and saved in each format
  await page.evaluate(() => { window.__saved = []; saveFileNative = function (name, mime, data) { window.__saved.push({ name: name, mime: mime, size: (data && (data.length || data.size || data.byteLength)) || 0 }); return Promise.resolve('ok'); }; window.saveFileNative = saveFileNative; });
  for (const k of ['dossier', 'appendix', 'portfolio', 'cover', 'cv']) {
    await page.evaluate((k) => { IngLector.R7.doc = k; IngLector.render(); }, k); await page.waitForTimeout(700);
    await page.screenshot({ path: S + '/shots/lx7_doc_' + k + '.png' });
    for (const f of ['docx', 'html', 'md']) { await page.evaluate((f) => { IngLector.state().brief.fmt = f; document.getElementById('l7Save').click(); }, f); await page.waitForTimeout(500); } }
  console.log('saved:', JSON.stringify(await page.evaluate(() => window.__saved.map(s => s.name + ' ' + s.size))));
  console.log(logs.filter(l => /error|R108/i.test(l)).slice(0, 10).join('\n'));
  await browser.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
