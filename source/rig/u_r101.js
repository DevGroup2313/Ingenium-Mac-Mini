const { start } = require('./lib.js');
const fs = require('fs');
(async () => {
  const S = process.env.S;
  const { browser, page, logs } = await start();
  const res = await page.evaluate(async (docxB64) => {
    const out = {};
    const W = (text, files, mode) => { const r = IngR101.want({ text, files: files || [], makeMode: mode }); return r ? r.kind + (r.fmt ? '/' + r.fmt : '') : null; };
    out.wants = {
      cover: W('Write a short cover letter for a junior librarian position at the Bodleian Libraries, as a Word document.'),
      edit: W('Change the date in the subtitle to 15 October 2026 and rename section 3 to "Research questions".', [{ name: 'statement.docx' }]),
      pdf: W('Turn this into a PDF', [{ name: 'statement.docx' }]),
      app: W('Make me a pomodoro timer app'),
      howq: W('How do I make an app with React?'),
      canyou: W('Can you make a quiz game about capitals?'),
      sheet: W('Create a spreadsheet of my weekly budget'),
      slides: W('Make slides for my thesis defence'),
      chat: W('What is the capital of France?'),
      cvfromfile: W('Use my CV to write a cover letter for this job', [{ name: 'cv.docx' }]),
      formal: W('make it more formal', [{ name: 'letter.docx' }]),
      mode: W('Some notes about my week', [], 'doc'),
      emailq: W('Draft an email to my supervisor about the meeting')
    };
    const bytes = b64ToBytes(docxB64);
    const R = await IngR101.docxRead(bytes);
    out.md = R.md;
    const newMd = R.md.replace('3 October 2026', '15 October 2026').replace('## 3. Proposed project', '## 3. Research questions');
    const ob = R.units.map(u => u.md), nb = IngR101.blocks(newMd);
    const D = IngR101.diff(ob, nb.map(b => b.md), false);
    out.ops = D.ops; out.kept = D.kept;
    const z = await IngR101.applyDocx(docxB64, D.ops, nb, null);
    out.newDocx = (function (u8) { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); })(z);
    // a model that dropped section 2 and added a paragraph
    const dropped = newMd.replace(/## 2\. Prior work[\s\S]*?(?=## 3)/, '') + '\n\nA closing sentence I added.';
    const D2 = IngR101.diff(ob, IngR101.blocks(dropped).map(b => b.md), false);
    out.ops2 = D2.ops; out.kept2 = D2.kept;
    out.refuse = ['I cannot edit files on your device directly due to technical limitations.', "As an AI text-based model, I can't create Word documents.", 'I am unable to generate PDF files directly.', 'Here is your letter.', "I can't confirm this quote is accurate."].map(t => IngR101.refused(t));
    out.loose = IngR101.looseDoc('Sure! Here is the revised text:\n\n# Title\n\nBody text here.\n\nLet me know if you want changes.');
    return out;
  }, fs.readFileSync(S + '/fixtures/statement.docx').toString('base64'));
  fs.writeFileSync(S + '/fixtures/statement_out.docx', Buffer.from(res.newDocx, 'base64'));
  delete res.newDocx;
  console.log(JSON.stringify(res, null, 1));
  console.log(logs.filter(l => /error/i.test(l)).slice(0, 10).join('\n'));
  await browser.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
