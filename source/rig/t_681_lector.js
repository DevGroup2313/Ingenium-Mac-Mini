// node rig/t_681_lector.js <page url> <out dir>
// 6.8.1: Lector's paper, as shown on its page, against the paper its PDF and Word file are read off. For a CV, a cover letter,
// and a dossier in each app's paper (Carpe Diem, Ingenium, Inkwell, and two apps together as The Offline Project): lays the
// paper out on Lector's page and in the frame its files are made in, and checks every word stands in the same place in both
// (within half a pixel); then makes the PDF and the Word file and writes them, with a picture of the paper shown, to <out dir>.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
const BODY = `## Education

- **MPhil**, University of Cambridge, with a thesis on reading and difficulty
- **MSc**, a Russell Group university, in education and technology
- **BA**, in French and English literature

## Experience

Curriculum and learning designer. Designed bilingual (English and French) study materials, assessments and job aids for adult learners, and built four offline apps to test them: Carpe Diem, The Forge, Ingenium and Inkwell.

| Project | Role | Year |
|---|---|---|
| Carpe Diem | Designer and builder | 2025 |
| The Forge | Designer and builder | 2026 |

> "The difficulty was the point." The proposal's title, and the method.

1. Read the posting twice.
2. Mark every requirement met, and every one missed.
3. Write only what can be shown.

### Notes

Greek in a note: λόγος; a sign: ✓; and the rest of the paragraph runs on long enough to wrap onto a second line and a third, so the line breaks can be compared word by word between the page and the file.`;
const CASES = [
  ['cv', [], 'Yannie D. Forest · CV entry', '# CV\n\n' + BODY],
  ['cover', [], 'Yannie D. Forest · Cover letter', 'Dear Hiring Manager,\n\n' + BODY + '\n\nYours sincerely,\n\nYannie D. Forest'],
  ['dossier', ['cd'], 'Carpe Diem · Project dossier', '# Carpe Diem\n\n' + BODY],
  ['dossier', ['ingenium'], 'Ingenium · Project dossier', '# Ingenium\n\n' + BODY],
  ['dossier', ['inkwell'], 'Inkwell · Project dossier', '# Inkwell\n\n' + BODY],
  ['dossier', ['cd', 'forge'], 'Carpe Diem and The Forge · Project dossier', '# Carpe Diem and The Forge\n\n' + BODY],
];
(async () => {
  const b = await pw.chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForFunction(() => window.__ingReady === true && window.IngDoc && window.IngLectorPaper, null, { timeout: 300000 });
  if (process.env.R183DEV) { await p.evaluate(() => { delete window.IngDoc; }); await p.addScriptTag({ url: process.env.R183DEV }); }
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(600); await p.evaluate(() => go('lector')); await p.waitForTimeout(1500);
  let ok = true; const out = [];
  for (const [kind, apps, title, md] of CASES) {
    const tag = kind + (apps.length ? '-' + apps.join('-') : '');
    const r = await p.evaluate(async ([kind, apps, title, md]) => {
      const html = IngLectorPaper.page(kind, md, { apps, name: title.split(' · ')[0], label: title.split(' · ')[1], title });
      const th = /<body class="(th-[a-z]+)">/.exec(html)[1], inner = html.slice(html.indexOf('<body'), html.lastIndexOf('</body>')).replace(/^<body[^>]*>/, '');
      // the paper on Lector's own page, under its own rules, by day, unzoomed
      document.body.removeAttribute('data-theme');
      let host = document.getElementById('t681'); if (host) host.remove();
      host = document.createElement('div'); host.id = 't681'; host.className = 'l-desk ' + th;
      host.style.cssText = 'position:absolute;left:0;top:0;width:900px;z-index:2147483000;padding:20px;background:#fff';
      host.innerHTML = inner; document.getElementById('lx7').appendChild(host);
      await document.fonts.ready; await new Promise(r => setTimeout(r, 300));
      const sp = host.querySelector('.l-paper'), A = IngDoc.read(document, sp, {});
      const f = await IngDoc.laid(html, 900), B = IngDoc.read(f.contentDocument, f.contentDocument.querySelector('.l-paper'), {}); f.remove();
      const bad = []; const n = Math.max(A.segs.length, B.segs.length);
      for (let i = 0; i < n; i++) { const a = A.segs[i], c = B.segs[i];
        if (!a || !c || a.t !== c.t || Math.abs(a.x - c.x) > 0.5 || Math.abs(a.y - c.y) > 0.5) { bad.push([i, a && [a.t, a.x.toFixed(2), a.y.toFixed(2)], c && [c.t, c.x.toFixed(2), c.y.toFixed(2)]]); if (bad.length > 4) break; } }
      const toArr = u => Array.from(u);
      const pdf = await IngDoc.make('pdf', html, IngLectorPaper.opts(kind, apps, title));
      const docx = await IngDoc.make('docx', html, IngLectorPaper.opts(kind, apps, title));
      const rect = sp.getBoundingClientRect();
      return { words: A.segs.length, frameWords: B.segs.length, bad, pages: pdf.pages, pdf: toArr(pdf.bytes), docx: toArr(docx.bytes), rect: [rect.left, rect.top, rect.width, rect.height] };
    }, [kind, apps, title, md]);
    fs.writeFileSync(path.join(OUT, tag + '.pdf'), Buffer.from(r.pdf)); fs.writeFileSync(path.join(OUT, tag + '.docx'), Buffer.from(r.docx));
    await p.screenshot({ path: path.join(OUT, tag + '-shown.png'), clip: { x: r.rect[0], y: r.rect[1], width: r.rect[2], height: Math.min(r.rect[3], 2400) }, fullPage: true });
    const good = r.bad.length === 0 && r.words === r.frameWords && r.words > 50;
    ok = ok && good; out.push({ tag, words: r.words, frameWords: r.frameWords, pages: r.pages, same: good, bad: r.bad });
  }
  console.log(JSON.stringify({ cases: out, errors: errs.slice(0, 5) }, null, 1)); console.log(ok ? 'PASS' : 'FAIL');
  await b.close(); process.exit(ok ? 0 : 1);
})().catch(e => { console.error(e); process.exit(1); });
