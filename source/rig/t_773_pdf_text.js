// Ingenium 7.73: text copied from Lector's PDF keeps its word breaks (r183). Her pasted text (24 November 2026) showed words run
// together where a line ended, and a stray page number. Each word was drawn on its own with no space in the file, so readers guessed
// the spaces from the gaps; now a real space follows each word that a gap, a line's end or the page's end follows (inside the word's
// own text, so nothing is seen or moves), and the page number is marked as page furniture (an Artifact, /Pagination) with a space
// after it. Checks, on three to four pages of invented prose made by IngDoc.pdf (the writer Lector's documents use, IngDoc.make):
// the words a plain copy finds (rig/pdf_plain.py: the file's pieces in order, nothing added) are the words pdftotext lays out, one for
// one; no line's last word joins the next line's first; each page number is marked. The 7.72 writer fails all three.
//   node rig/t_773_pdf_text.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage(); p.setDefaultTimeout(120000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngDoc && window.IngDoc.pdf, null, { timeout: 600000, polling: 500 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  // three pages of plain prose with a list, in the way a Lector document reads (invented words); the dossier's own paper is made by the
  // same writer (IngDoc.make), so the chat's document stands for both
  const files = await p.evaluate(async () => { const para = 'Limits and next steps. Sharing a model between two computers is sealed from end to end, and each reading keeps going while a computer is away for a while. Conversion runs on a computer, not on a phone, and storage care tells you before a folder grows too large for the device that keeps it. ';
    let md = '# Limits and next steps\n\n'; for (let i = 0; i < 14; i++) md += para + para + '\n\n' + (i % 4 === 0 ? '- one point of a list that runs long enough to wrap onto a second line of the page\n- another point of the same list, also long enough to wrap onto a second line\n\n' : '');
    const out = []; for (const t of ['Limits and next steps', 'A second document']) { const r = await IngDoc.pdf(t, md); const u = r.bytes; let s = ''; for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); out.push({ name: t + '.pdf', b64: btoa(s), pages: r.pages }); } return out; });
  const kinds = files;
  ok(files.length === 2 && files.every(f => f.pages >= 2), 'the writer makes two PDFs of several pages each', files.map(f => [f.name, f.pages]));
  for (const f of files) {
    const fp = path.join(OUT, f.name.replace(/[^\w. -]/g, '_')); fs.writeFileSync(fp, Buffer.from(f.b64, 'base64'));
    // the words as a reader that lays the page out finds them (pdftotext), and as the plainest copy finds them (rig/pdf_plain.py:
    // each piece of text in the file's order, nothing added between): the same words, in the same order
    const laid = cp.execFileSync('pdftotext', ['-enc', 'UTF-8', fp, '-'], { encoding: 'utf8' }).split(/\s+/).filter(Boolean);
    const plain = JSON.parse(cp.execFileSync('python3', ['-I', path.join(__dirname, 'pdf_plain.py'), fp], { encoding: 'utf8' })).split(/\s+/).filter(Boolean);
    let same = 0; for (let k = 0; k < Math.min(laid.length, plain.length); k++) if (laid[k] === plain[k]) same++;
    const firstOff = laid.findIndex((w, k) => plain[k] !== w);
    ok(laid.length > 300 && plain.length === laid.length && same === laid.length, f.name + ': copied plainly, the text keeps every word apart, at line ends too, as the page shows it', { laid: laid.length, plain: plain.length, same, at: firstOff, laidHere: laid.slice(Math.max(0, firstOff), firstOff + 6), plainHere: plain.slice(Math.max(0, firstOff), firstOff + 6) });
    const glued = []; const lines = cp.execFileSync('pdftotext', ['-enc', 'UTF-8', fp, '-'], { encoding: 'utf8' }).split('\n').map(l => l.trim()).filter(Boolean); const pj = plain.join(' ');
    for (let k = 0; k + 1 < lines.length && glued.length < 6; k++) { const a = lines[k].split(/\s+/).pop(), c = lines[k + 1].split(/\s+/)[0]; if (/^[A-Za-z,.]{2,}$/.test(a) && /^[A-Za-z]{2,}$/.test(c) && pj.indexOf(a + c) >= 0 && pj.indexOf(a + ' ' + c) < 0) glued.push(a + c); }
    ok(glued.length === 0, f.name + ': no word at the end of a line is joined to the first of the next', glued);
    const cs = cp.execFileSync('python3', ['-I', '-c', 'import sys,pypdf;r=pypdf.PdfReader(sys.argv[1]);print(len(r.pages));print("\\n".join(pg.get_contents().get_data().decode("latin1") for pg in r.pages))', fp], { encoding: 'latin1', maxBuffer: 1 << 28 });
    const np = parseInt(cs, 10), marks = (cs.match(/\/Artifact <<\/Type \/Pagination/g) || []).length;
    ok(np < 2 || marks >= np - 1, f.name + ': the page numbers are marked as page furniture (Artifacts), not as part of the text', { pages: np, marked: marks });
  }
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
