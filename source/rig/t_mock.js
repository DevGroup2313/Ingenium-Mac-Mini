const { start } = require('./lib.js');
(async () => {
  const S = process.env.S;
  const { browser, page, logs } = await start();
  await page.evaluate(() => {
    window.__canned = [];
    Engine.status = 'ready'; Engine.modelId = state.activeModelId; Engine.adapter = Engine.adapter || DeskAdapter;
    Engine.generate = function (job) { const t = window.__canned.shift() || 'OK.'; window.__lastJob = job; return new Promise(r => setTimeout(() => { job.onToken(t); r({ text: t, stats: {} }); }, 50)); };
  });
  async function run(q, canned, file) {
    await page.evaluate(() => { go('chat'); document.getElementById('chatNew').click(); });
    await page.waitForTimeout(300);
    if (file) { await page.setInputFiles('#chatAnyFile', file); await page.waitForTimeout(1500); }
    await page.evaluate((c) => { window.__canned = c.slice(); Engine.status = 'ready'; Engine.modelId = state.activeModelId; }, canned);
    await page.fill('#chatInput', q);
    await page.evaluate(() => sendChat());
    await page.waitForTimeout(3500);
    return page.evaluate(() => { const ms = curMsgs(); const bots = ms.filter(m => m.role === 'bot'); const m = bots[bots.length - 1]; const u = mkPrevMe(m);
      return { nBots: bots.length, versions: u && u.versions ? u.versions.length : 1, note: m.note, text: (m.text || '').slice(0, 300), doc: m.doc ? m.doc.title + ' / ' + mkWords(m.doc.md) + 'w' : null,
        edits: m.edits ? m.edits.map(e => e.file + ' ok ' + e.ok + ' unasked ' + e.unasked) : null, app: !!chatArtifactOf(m.text), cards: [...document.querySelectorAll('#chatScroll .msg:last-child .mk-card .mk-card-name')].map(x => x.textContent),
        lastNote: (window.__lastJob && window.__lastJob.messages.slice(-1)[0].content || '').slice(-200) }; });
  }
  const out = {};
  out.refuseRetry = await run('Write a cover letter for a museum archivist role as a Word document.', ["I'm sorry, but as a text-based AI I cannot create Word documents or files. However, I can give you the text to copy.", '<document title="Cover letter">\n# Cover letter\n\nDear Hiring Committee,\n\nI am writing to apply for the archivist role. My work with collections has taught me patience and care with every record.\n\nYours sincerely,\nYannie\n</document>']);
  out.shortLoose = await run('Write a short thank-you note to my supervisor as a PDF', ['Dear Dr Smith,\n\nThank you for your guidance this term. Your comments on my chapter made it clearer and stronger, and I am grateful for your time.\n\nWith thanks,\nYannie']);
  out.rawHtml = await run('Build me a tiny counter app', ['Here it is:\n<!doctype html><html><head><title>Counter</title></head><body><button id=b>0</button><script>let n=0;b.onclick=()=>b.textContent=++n;</script></body></html>']);
  out.changeWithRefusal = await run('Change the date in the subtitle to 15 October 2026', ['I cannot edit files on your device directly. Here is the revised document:\n\n<document title="statement.docx">\n# Research Statement — Draft 2\n\nPrepared for the Oxford Internet Institute, 15 October 2026\n\n## 1. Motivation\n\nMy work studies how offline-first software can protect the privacy of students. I built four applications that run entirely on the device and never send personal data to a server.\n\n## 2. Prior work\n\nCarpe Diem is a study planner. The Forge is a building tool. Inkwell is a writing room. Ingenium is a local model studio.\n\n## 3. Proposed project\n\nI propose to measure whether local language models can match cloud models for everyday academic writing tasks, while keeping every document on the student\'s own device.\n</document>'], S + '/fixtures/statement.docx');
  out.plainChat = await run('What is the capital of France?', ['Paris.']);
  console.log(JSON.stringify(out, null, 1));
  console.log(logs.filter(l => /error|R101/i.test(l)).slice(0, 10).join('\n'));
  await page.screenshot({ path: S + '/shots/mock_last.png' });
  await browser.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
