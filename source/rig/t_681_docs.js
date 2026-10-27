// node rig/t_681_docs.js <page url> <out dir>
// 6.8.1: a document is saved as it is shown. Shows a long Markdown document in the page Ingenium shows it in, and saves it as
// a PDF and as a Word file through the very functions the keys call; writes the shown pages (each A4 page, at 96 dots to the
// inch), the PDF and the Word file to <out dir>. rig/t_681_docs.py then compares the pages with the PDF, pixel by pixel.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
const MD = `# A reading of the Lettres philosophiques

## Introduction

Voltaire's **Lettres philosophiques** (1734) set out, in twenty-five letters, what an Englishman's liberty looked like to a Frenchman who had *lived among it*. This note reads them alongside [the Bodleian's copy](https://www.bodleian.ox.ac.uk/) and the \`1734\` Rouen printing, and asks how far the letters argue and how far they merely *show*.

The question matters because the book was burnt: the Parlement de Paris ordered it "lacerated and burnt at the foot of the great staircase" on 10 June 1734, and the hangman did so.

### What the letters cover

- The Quakers, in the first four letters, as a sect without priests
- Parliament, commerce and the smallpox inoculation, as the conditions of a free people
- Newton, Locke and Bacon, as the philosophy that liberty makes possible
- Pascal, in the twenty-fifth, as the adversary

1. First, the religious letters (I to VII).
2. Second, the political and commercial letters (VIII to X).
3. Third, the philosophical letters (XII to XVII), with **Newton** at their centre.
4. Last, the *Remarques sur les Pensées de M. Pascal*.

> "Un Anglais, comme homme libre, va au Ciel par le chemin qui lui plaît." (Letter V)

#### A table of the editions

| Edition | Place | Year | Letters |
|---|---|---|---|
| Letters concerning the English Nation | London | 1733 | 24 |
| Lettres philosophiques | Rouen (as Amsterdam) | 1734 | 25 |
| Lettres écrites de Londres | Basel (as London) | 1734 | 24 |
| Mélanges | Geneva | 1756 | dispersed |

## The argument, letter by letter

Letter VIII praises a nation that "has arrived at the point of regulating the power of kings by resisting them". The sentence is longer than it looks: it moves from praise of an outcome to praise of a method, and the method is resistance. Voltaire is careful to give the English their civil wars; he is less careful to say whether the French should have them.

Letter X turns to trade. The merchant who "enriches his country" is set against the marquis who "knows exactly at what time the king rises", and the comparison is not kind to the marquis. Commerce here is not a vulgar pursuit but the ground of liberty: the English are free because they are rich, and rich because they are free.

Letters XII to XVII are the longest stretch of philosophy in the book. Bacon is "the father of experimental philosophy"; Locke is the man who "unfolded to man the nature of human reason"; Newton is the one before whom Descartes' vortices give way. The letters on Newton are as much about method as about matter: the point is that a hypothesis must answer to measurement.

\`\`\`
Lettre XIV, sur Descartes et Newton:
  "Un Français qui arrive à Londres trouve les choses bien changées
   en philosophie comme dans tout le reste."
\`\`\`

---

## Greek, signs and the rest

The letters quote no Greek, but a scholar's notes do: λόγος, ἀρετή, and Ψυχή. Signs a note may use: ✓ read, ✗ not yet, → see below, ★ important, and an emoji 📚 for the reading list.

### Notes

The Rouen printing's catchwords and signatures (A–Z⁸) suggest a hurried job; the 1733 London English text was set first, and the French follows it closely in most letters but not in the thirteenth, on Locke, which Voltaire rewrote twice.

Further reading: René Pomeau, *Voltaire en son temps*; Nicholas Cronk's introduction to the Oxford World's Classics translation.

A last paragraph, to carry the document onto another page if it has not already gone there, and to show that the page's number sits at its foot as the PDF's does. Each line of this paragraph should break exactly where the page breaks it, and the PDF's should break at the same words.`;

(async () => {
  const b = await pw.chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForFunction(() => window.__ingReady === true && window.IngDoc, null, { timeout: 300000 });
  if (process.env.R183DEV) { await p.evaluate(() => { delete window.IngDoc; }); await p.addScriptTag({ url: process.env.R183DEV }); }
  const html = await p.evaluate(md => mkDocPage('A reading of the Lettres philosophiques', md), MD);
  fs.writeFileSync(path.join(OUT, 'shown.html'), html);
  // the files, by the very functions the keys call (their saving caught as it is handed to the device)
  const files = await p.evaluate(async md => {
    const got = {}; const was = window.saveFileNative;
    window.saveFileNative = (name, mime, data) => { got[name] = Array.from(data instanceof Uint8Array ? data : new TextEncoder().encode(String(data))); return Promise.resolve(true); };
    try { await mkSavePdf({ title: 'A reading of the Lettres philosophiques', md }); await lxSaveWord('A reading of the Lettres philosophiques', md); }
    finally { window.saveFileNative = was; }
    return got;
  }, MD);
  for (const [n, a] of Object.entries(files)) fs.writeFileSync(path.join(OUT, n.endsWith('.pdf') ? 'saved.pdf' : 'saved.docx'), Buffer.from(a));
  // the shown pages, each A4 card at 96 dots to the inch
  const q = await ctx.newPage(); await q.setViewportSize({ width: 900, height: 1200 });
  await q.setContent(html, { waitUntil: 'load' }); await q.waitForTimeout(1500);
  const cards = await q.evaluate(() => [...document.querySelectorAll('.card')].map(c => { const r = c.getBoundingClientRect(); return [r.left + scrollX, r.top + scrollY, r.width, r.height]; }));
  for (let i = 0; i < cards.length; i++) { const [x, y, w, h] = cards[i]; await q.screenshot({ path: path.join(OUT, `shown-${i + 1}.png`), clip: { x, y, width: w, height: h }, fullPage: true }); }
  // a narrow panel: the pages made smaller whole
  await q.setViewportSize({ width: 420, height: 800 }); await q.waitForTimeout(400);
  const narrow = await q.evaluate(() => ({ t: getComputedStyle(document.getElementById('sheet')).transform, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  await q.screenshot({ path: path.join(OUT, 'narrow.png') });
  console.log(JSON.stringify({ files: Object.keys(files), cards: cards.length, narrow, errors: errs.slice(0, 5) }));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
