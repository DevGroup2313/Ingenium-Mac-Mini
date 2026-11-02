// Lector 2i: the Word file and the PDF in each app's palette (and the set's, and a CV's), written to disk to be opened
const { start } = require('./lib.js');
const fs = require('fs');
(async () => {
  const S = process.env.S, OUT = S + '/lx2i/files'; fs.mkdirSync(OUT, { recursive: true });
  const { browser, page, logs } = await start({ viewport: { width: 1280, height: 800 } });
  const md = '# T\n\n## What it is\n\nAn offline app. It keeps [your role] and 42 screens. **Bold** and *italic*.\n\n### A closer look\n\n- one\n- two\n\n> A quotation, set apart.\n\n| Measure | Value |\n|---|---|\n| Lines | 19,100 |\n| Functions | 1,234 |\n\n## Inkwell\n\nIts own section.\n\n---\n\n*A closing note.*';
  const sets = { cd: ['cd'], forge: ['forge'], inkwell: ['inkwell'], ingenium: ['ingenium'], family: ['cd', 'inkwell'], master: ['cd', 'forge', 'ingenium', 'inkwell'], cv: ['cd'] };
  for (const [k, apps] of Object.entries(sets)) {
    const kind = k === 'cv' ? 'cv' : 'dossier';
    const r = await page.evaluate(async ({ k, kind, md, apps }) => {
      const name = apps.length === 4 ? 'The Offline Project' : apps.map(a => ({ cd: 'Carpe Diem', forge: 'The Forge', ingenium: 'Ingenium', inkwell: 'Inkwell' })[a]).join(' and ');
      const meta = { kind, apps, subtitle: kind === 'cv' ? 'CV entry' : 'Project dossier', name: kind === 'cv' ? undefined : name, forText: 'Research Software Engineer · A University', master: apps.length === 4 };
      const docx = IngHouseDocs.docx(name + ' · Project dossier', md, meta);
      const seals = kind === 'cv' ? [] : (apps.length === 4 ? [{ key: 'master', src: 'data:image/png;base64,' + ING_SEALS.master.b64 }] : apps.map(a => ({ key: a, src: 'data:image/png;base64,' + ING_SEALS[a].b64 })));
      const pdf = await LxPdf.make(name + ' · Project dossier', md, { kind: kind === 'cv' ? 'cv' : 'dossier', apps, name: kind === 'cv' ? '' : name, subtitle: meta.subtitle, forText: meta.forText, author: 'Yannie D. Forest', month: 'October 2026', seals });
      const b64 = u => { let s = ''; for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(s); };
      return { docx: b64(docx), pdf: b64(pdf) };
    }, { k, kind, md, apps });
    fs.writeFileSync(`${OUT}/${k}.docx`, Buffer.from(r.docx, 'base64')); fs.writeFileSync(`${OUT}/${k}.pdf`, Buffer.from(r.pdf, 'base64'));
  }
  console.log('errors:', logs.filter(l => /error/i.test(l)).slice(0, 5));
  await browser.close();
})();
