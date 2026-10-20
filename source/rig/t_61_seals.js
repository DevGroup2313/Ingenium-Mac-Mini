// Ingenium 6.1 · The Offline Project's seals, and Lector's documents (modules r140, r107, r108), in Chromium:
// IngSeal draws the crest of any set of the four apps (the master for four, the owner's template for a trio, a duo for
// two, the app's own seal for one), live and still, by day and by night, and as a PNG; Lector puts it on the set's name,
// in the Documents list, on the paper's cover and on the covers of the Word, PDF and web page files it saves; the seals
// follow the Display setting with no reload; and the document grows with its panel on a large display (Fit, and steps,
// remembered), still reading well on a phone.
//   node rig/t_61_seals.js http://127.0.0.1:8208/ingenium.html <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : '')); c ? pass++ : fail++; };
const ALL = ['cd', 'forge', 'ingenium', 'inkwell'];

// the lines of the built page that hold this area's modules, so an error can be told apart from another part's
function myRanges(html) {
  const lines = html.split('\n'), R = [];
  const spans = [['<style id="r107-css">', '__ingParts["p39"]="running"'], ['<script>try{(window.__ingParts=window.__ingParts||{})["p40"]', '__ingParts["p40"]="running"'], ['<style id="r140-css">', '__ingParts["p61"]="running"']];
  spans.forEach(([a, b]) => { const s = lines.findIndex(l => l.includes(a)); if (s < 0) return; let e = s; while (e < lines.length && !lines[e].includes(b)) e++; R.push([s + 1, e + 1]); });
  return R;
}
function mine(text, R) { const m = [...String(text).matchAll(/ingenium\.html:(\d+):\d+/g)].map(x => +x[1]); return m.some(n => R.some(([a, b]) => n >= a && n <= b)) || /IngSeal|crest|sealMark|crestPaper|applyZoom|stepZoom/.test(text); }
function unzip(file, entry) { return cp.execFileSync('python3', ['-I', '-c', 'import zipfile,sys\nz=zipfile.ZipFile(sys.argv[1])\nsys.stdout.buffer.write(z.read(sys.argv[2]) if len(sys.argv)>2 else "\\n".join(z.namelist()).encode())', file].concat(entry ? [entry] : [])); }
function pngSize(buf) { return buf.slice(1, 4).toString() === 'PNG' ? [buf.readUInt32BE(16), buf.readUInt32BE(20)] : null; }

async function open(b, opts) {
  const ctx = await b.newContext(Object.assign({ viewport: { width: 1440, height: 900 }, acceptDownloads: true }, opts || {}));
  const p = await ctx.newPage(); p.__errs = []; p.__downloads = [];
  p.on('pageerror', e => p.__errs.push((e.message || '') + ' ' + (e.stack || '')));
  p.on('console', m => { if (m.type() === 'error') p.__errs.push('console: ' + m.text()); });
  p.on('download', d => p.__downloads.push(d));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1000);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(700);
  return { ctx, p };
}
let saved = 0;
async function nextDownload(p, fn, ext, timeout = 60000) { const n0 = p.__downloads.length; await fn(); const t0 = Date.now(); while (p.__downloads.length <= n0 && Date.now() - t0 < timeout) await p.waitForTimeout(150);
  const d = p.__downloads[n0]; if (!d) return null; const f = path.join(OUT, 's61-saved-' + (++saved) + '.' + ext); await d.saveAs(f); return f; }
// a set chosen in the brief, with a dossier already written for it (the reading itself needs a model; the seals do not)
async function setUp(p, apps) {
  await p.evaluate(async (apps) => {
    const A = libState().apps; ['cd', 'forge', 'ingenium', 'inkwell'].forEach(k => { if (!A[k] || !A[k].ref) A[k] = Object.assign({}, A[k] || {}, { ref: 'test-' + k, sha256: 'test-' + k, version: 'test', name: k + '.html' }); });
    const S = IngLector.state(); S.job = null; S.brief.apps = apps.slice(); S.brief.purpose = 'portfolio'; S.brief.docs = { dossier: true, appendix: true, portfolio: true, cover: true, cv: false };
    const key = IngLector.setKey(apps, 'portfolio'), ref = IngBig.newId();
    const md = '# The set\n\n## Overview\n\nWhat the apps are, measured from their files.\n\n## How they were made\n\nA paragraph about the making, long enough to wrap across the page at its own measure and show the type.\n\n## Method\n\nThe method, in short.\n\n---\n*Drafted on this device.*';
    await IngBig.put(ref, md);
    S.sets[key] = { apps: apps.slice(), purpose: 'portfolio', docs: { dossier: { ref, made: Date.now(), model: 'test', title: 'test', chk: { figures: 0, unmatched: [], fills: 0 } } }, older: {} };
    saveState(); go('lector'); IngLector.R7.doc = 'dossier'; IngLector.render();
  }, apps);
  await p.waitForTimeout(900);
}
async function theme(p, t) { await p.evaluate((t) => { state.theme = t; applyTheme(); }, t); await p.waitForTimeout(500); }
// a pixel of a PNG data URL, at a point given in the crest's own units
async function pixel(p, dataUrl, vb, pts) {
  return p.evaluate(async ({ dataUrl, vb, pts }) => { const im = new Image(); im.src = dataUrl; await im.decode(); const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; const x = c.getContext('2d'); x.drawImage(im, 0, 0);
    return pts.map(([u, v]) => Array.from(x.getImageData(Math.round((u - vb[0]) / vb[2] * c.width), Math.round((v - vb[1]) / vb[3] * c.height), 1, 1).data)); }, { dataUrl, vb, pts });
}

(async () => {
  const pageText = await (await fetch(URL_)).text(); const R = myRanges(pageText);
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  let { ctx, p } = await open(b);

  // ---------------- IngSeal itself ----------------
  const api = await p.evaluate(() => ({ part: window.__ingParts.p61, has: typeof IngSeal === 'object',
    kinds: [['cd', 'forge', 'ingenium', 'inkwell'], ['cd', 'forge', 'ingenium'], ['ingenium', 'forge'], ['inkwell'], ['cd', 'tabula'], [], 'master'].map(s => IngSeal.kind(s)),
    norm: IngSeal.norm(['inkwell', 'cd', 'cd', 'forge']), names: IngSeal.names(['ingenium', 'forge', 'cd']), title3: IngSeal.title(['cd', 'forge', 'ingenium']), title4: IngSeal.title(['cd', 'forge', 'ingenium', 'inkwell']),
    other: [IngSeal.svg(['cd', 'abacus']), IngSeal.el(['cd', 'abacus']), IngSeal.url(['scriba'])] }));
  ok(api.part === 'running' && api.has, 'the seals part (p61) runs to its end and IngSeal is there', api.part);
  ok(JSON.stringify(api.kinds) === JSON.stringify(['master', 'trio', 'duo', 'one', null, null, 'master']), 'all four is the master, three a trio, two a duo, one its own seal; a set with any other app has no crest', api.kinds);
  ok(api.norm.join() === 'cd,forge,inkwell' && api.names === 'Carpe Diem · The Forge · Ingenium' && api.title3 === 'The Offline Project without Inkwell' && api.title4 === 'The Offline Project', 'a set is put in the order Carpe Diem, The Forge, Ingenium, Inkwell; names and titles read as she says them', [api.norm, api.names, api.title3]);
  ok(api.other[0] === '' && api.other[1] === null && api.other[2] === '', 'a set naming another app falls back to what was there before (no crest made)', api.other);

  const svgs = await p.evaluate(() => { const s = (a, n) => IngSeal.svg(a, { night: n });
    const m = s(['cd', 'forge', 'ingenium', 'inkwell'], false), t = s(['cd', 'forge', 'ingenium'], false), d = s(['cd', 'forge'], false), mn = s(['cd', 'forge', 'ingenium', 'inkwell'], true);
    const imgs = x => (x.match(/<image /g) || []).length;
    return { mRibbon: /THE · OFFLINE · PROJECT/.test(m), tRibbon: /OFFLINE/.test(t), dRibbon: /OFFLINE/.test(d), mImgs: imgs(m), tImgs: imgs(t), dImgs: imgs(d), tBar: /<rect x="146.6" y="0" width="6.8" height="181.4"/.test(t), mBar: /<rect x="146.6" y="0" width="6.8" height="400"/.test(m),
      dShield: d.indexOf('M22,16 H278') >= 0, tShield: t.indexOf('M22,16 H278') >= 0, tBook: (t.match(/M150,186.5 C145,183.6/g) || []).length > 0, dBook: (d.match(/M150,186.5 C145,183.6/g) || []).length > 0,
      dayNight: m !== mn, nightPal: mn.indexOf('#1f5f80') >= 0 && m.indexOf('#3483a9') >= 0, external: /(src|href)="https?:/.test(m + t + d) || /claudeusercontent/.test(document.documentElement.innerHTML.slice(0, 0)) }; });
  ok(svgs.mRibbon && svgs.mImgs === 4 && svgs.mBar, 'the master: four seals, the full cross, the ribbon THE · OFFLINE · PROJECT', svgs);
  ok(!svgs.tRibbon && svgs.tImgs === 3 && svgs.tBar && svgs.tShield && svgs.tBook, 'a trio: the same shield and book, three seals, the upright only between the upper quarters, no ribbon', svgs);
  ok(!svgs.dRibbon && !svgs.dShield && svgs.dImgs === 2 && svgs.dBook, 'a duo: no shield and no ribbon, the two seals with the small gold open book', svgs);
  ok(svgs.dayNight && svgs.nightPal && !svgs.external, 'by night the night palette and pictures; nothing is fetched from anywhere', svgs);
  const outside = await p.evaluate(() => (document.documentElement.outerHTML.match(/claudeusercontent/g) || []).length);
  ok(outside === 0, 'nothing from the design file\'s outside script came into Ingenium', outside);

  // the PNGs, and what is where in them (the owner's template, read pixel by pixel)
  const pngs = await p.evaluate(async () => { const o = {};
    for (const [k, a, n, w] of [['m', ['cd', 'forge', 'ingenium', 'inkwell'], false, 600], ['t1', ['cd', 'forge', 'ingenium'], false, 600], ['t2', ['forge', 'ingenium', 'inkwell'], false, 600], ['t3', ['cd', 'ingenium', 'inkwell'], true, 600], ['d', ['ingenium', 'forge'], false, 600], ['dn', ['ingenium', 'forge'], true, 600]])
      o[k] = await IngSeal.png(a, { night: n, width: w });
    const bytes = await IngSeal.png(['cd', 'forge', 'inkwell'], { width: 1200, as: 'bytes' }), info = await IngSeal.docPicture(['cd', 'forge']);
    o.bytesSig = Array.from(bytes.slice(0, 8)); o.bytesLen = bytes.length; o.doc = { w: info.w, h: info.h, inches: info.inches, kind: info.kind }; return o; });
  for (const k of ['m', 't1', 't2', 't3', 'd', 'dn']) fs.writeFileSync(path.join(OUT, 's61-png-' + k + '.png'), Buffer.from(pngs[k].split(',')[1], 'base64'));
  const dims = ['m', 't1', 'd'].map(k => pngSize(Buffer.from(pngs[k].split(',')[1], 'base64')));
  ok(JSON.stringify(dims) === JSON.stringify([[600, 800], [600, 736], [600, 280]]) && pngs.bytesSig.join() === '137,80,78,71,13,10,26,10', 'IngSeal.png draws a real PNG at the width asked (master 600×800, trio 600×736, duo 600×280), as a data address or as bytes', [dims, pngs.bytesSig.slice(0, 4), pngs.bytesLen]);
  ok(pngs.doc.w === 900 && pngs.doc.h === 552 && pngs.doc.inches === 2.9 && pngs.doc.kind === 'duo', 'a cover\'s duo is drawn wide, with room above and below, at 2.9 inches in Word', pngs.doc);
  const T = [0, 0, 300, 368], M = [0, 0, 300, 400];
  // where: upper-left field, upper-right field, lower field on the left, the lower field where the master's upright runs, lower right
  const pt = [[40, 40], [260, 40], [45, 215], [150, 318], [255, 215]];
  const pm = await pixel(p, pngs.m, M, pt), p1 = await pixel(p, pngs.t1, T, pt), p2 = await pixel(p, pngs.t2, T, pt), p3 = await pixel(p, pngs.t3, T, pt);
  // what a pixel is: clear, a field (cream, lavender, blue, purple, brown) or gold
  const cls = a => a[3] < 200 ? 'clear' : (a[0] > 200 && a[1] > 185 && a[0] - a[2] >= 15) ? 'cream' : (a[2] > 200 && a[0] > 180 && a[2] - a[1] >= 8) ? 'lavender'
    : (a[2] - a[0] > 30 && a[1] > a[0]) ? 'blue' : (a[2] - a[1] > 15 && a[0] > a[1]) ? 'purple' : (a[0] > 120 && a[0] - a[2] > 45) ? 'gold' : (a[0] > a[2] + 10 && a[0] < 140) ? 'brown' : 'other';
  const C = x => x.map(cls).join(',');
  ok(C(p1) === 'blue,cream,lavender,lavender,lavender', 'Carpe Diem, The Forge and Ingenium: Carpe Diem\'s blue upper left, The Forge\'s cream upper right, Ingenium\'s lavender across the whole lower half (the template)', C(p1) + ' ' + JSON.stringify(p1));
  ok(cls(p1[3]) !== 'gold' && cls(pm[3]) === 'gold', 'in the trio the gold upright stops at the bar (the lower half is one field); in the master it runs down', [p1[3], pm[3]]);
  ok(C(p2) === 'cream,lavender,blue,blue,blue', 'The Forge, Ingenium and Inkwell: each keeps its own field colour wherever it sits (Inkwell\'s blue across the lower half)', C(p2) + ' ' + JSON.stringify(p2));
  ok(C(p3) === 'blue,purple,blue,blue,blue', 'by night the trio wears the night fields (Carpe Diem\'s and Inkwell\'s night blues, Ingenium\'s night violet)', C(p3) + ' ' + JSON.stringify(p3));
  const pd = await pixel(p, pngs.d, [0, 0, 300, 140], [[3, 3], [297, 137], [138.4, 66.7], [119, 68.5], [62, 70], [238, 70]]);
  const gilt = a => a[3] > 250 && a[0] > 140 && a[0] - a[2] > 55;
  ok(pd[0][3] === 0 && pd[1][3] === 0 && gilt(pd[2]) && gilt(pd[3]) && pd[4][3] > 250 && pd[5][3] > 250, 'the duo: clear around (no shield), the gold book at the middle on its gilt bar, a seal either side', C(pd) + ' ' + JSON.stringify(pd));

  // live and still elements
  const els = await p.evaluate(() => { const live = IngSeal.el(['cd', 'forge', 'ingenium'], { live: true, size: 160 }), still = IngSeal.el(['cd', 'forge'], { size: 90 }), one = IngSeal.el(['inkwell'], { live: true, size: 80 });
    const host = document.createElement('div'); host.id = 's61host'; host.style.cssText = 'position:fixed;left:20px;top:20px;z-index:99999;display:flex;gap:30px;align-items:center;padding:30px;background:#f5f3f7';
    host.append(live, still, one); document.body.appendChild(host);
    return { live: live.className, layers: live.querySelectorAll('img.ic-l').length, aria: live.getAttribute('aria-label'), role: live.getAttribute('role'), still: still.tagName + ' ' + still.className, alt: still.alt, oneLayers: one.querySelectorAll('img.ic-l').length }; });
  ok(/ing-crest is-live ic-trio/.test(els.live) && els.layers === 4 && els.role === 'img' && /without Inkwell/.test(els.aria), 'a live trio: four layers (shield, seals, gold, book), labelled for a screen reader', els);
  ok(/^IMG ing-crest-img ic-duo/.test(els.still) && /side by side/.test(els.alt) && els.oneLayers >= 3, 'a still duo is a picture with its words; one app live is its own layered seal', els);
  await p.waitForTimeout(1300);
  const box = await p.evaluate(() => { const r = document.querySelector('#s61host .ing-crest').getBoundingClientRect(); return [r.left + r.width * .85, r.top + r.height * .2]; });
  await p.mouse.move(box[0], box[1]); await p.waitForTimeout(450);
  const hov = await p.evaluate(() => { const e = document.querySelector('#s61host .ing-crest'); return { cls: e.className, ry: e.style.getPropertyValue('--ry'), rx: e.style.getPropertyValue('--rx'), anim: getComputedStyle(e.querySelector('.ic-idle')).animationName }; });
  await p.mouse.down(); await p.waitForTimeout(150); const down = await p.evaluate(() => document.querySelector('#s61host .ing-crest').classList.contains('down')); await p.mouse.up();
  ok(/hov/.test(hov.cls) && parseFloat(hov.ry) > 5 && parseFloat(hov.rx) > 2 && down && hov.anim === 'icSway', 'pointed at, the live crest turns toward the pointer and lifts; pressed, it sinks; at rest it sways', hov);
  await p.screenshot({ path: path.join(OUT, 's61-live-crests.png'), clip: { x: 0, y: 0, width: 640, height: 330 } });
  await p.evaluate(() => document.getElementById('s61host').remove());

  // ---------------- Lector: a trio ----------------
  await theme(p, 'day');
  await setUp(p, ['cd', 'forge', 'ingenium']);
  const L1 = await p.evaluate(() => { const sn = document.querySelector('#l7Bf .l-setname'), marks = [...document.querySelectorAll('#l7Bf .l-doc .l-mark')];
    const paper = document.querySelector('#l7Desk .l-paper .cv .seals');
    return { setCrest: !!sn.querySelector('.ing-crest.is-live.ic-trio'), setText: sn.textContent, marks: marks.map(m => m.querySelector('img') ? m.querySelector('img').className + '|' + m.querySelectorAll('img').length : m.textContent),
      markSrc: marks[0].querySelector('img').src === IngSeal.url(['cd', 'forge', 'ingenium'], { night: false }), hint: [...document.querySelectorAll('#l7Bf .l-hint')].map(x => x.textContent).find(t => /goes on/.test(t)),
      paper: paper ? [paper.querySelectorAll('img').length, paper.querySelector('img').className, paper.querySelector('img').src === IngSeal.url(['cd', 'forge', 'ingenium'], { night: false })] : null,
      paperW: paper ? Math.round(paper.querySelector('img').getBoundingClientRect().width) : 0 }; });
  ok(L1.setCrest && /a trio of The Offline Project/i.test(L1.setText), 'the brief names the set beside its live crest: a trio of The Offline Project', L1.setText);
  ok(L1.marks.slice(0, 3).every(m => /ing-crest-img ic-trio.*\|1$/.test(m)) && L1.marks[3] === 'No seal' && L1.markSrc, 'the Documents list shows one crest for the dossier, the appendix and the portfolio piece (not three seals), and No seal on the letter', L1.marks);
  ok(/for these three goes on the dossier/.test(L1.hint || ''), 'and says which seal goes on which documents', L1.hint);
  ok(L1.paper && L1.paper[0] === 1 && /crest c-trio/.test(L1.paper[1]) && L1.paper[2] && L1.paperW >= 100, 'the dossier\'s cover on the page carries the trio\'s crest, alone', L1);
  await p.screenshot({ path: path.join(OUT, 's61-lector-trio-day.png') });
  // the brief's Documents section, shown (the seals there kept the day look by night before)
  async function shotDocs(name) { await p.evaluate(() => document.querySelector('#l7Bf .l-docs').scrollIntoView({ block: 'center' })); await p.waitForTimeout(350);
    const r = await p.evaluate(() => { const b = document.getElementById('l7Brief').getBoundingClientRect(); return { x: b.left, y: b.top, width: b.width, height: b.height }; }); await p.screenshot({ path: path.join(OUT, name), clip: r }); }
  await shotDocs('s61-documents-day.png');

  // night, with no reload
  await theme(p, 'night');
  const N1 = await p.evaluate(() => { const a = ['cd', 'forge', 'ingenium'], marks = [...document.querySelectorAll('#l7Bf .l-doc .l-mark img')], pap = document.querySelector('#l7Desk .l-paper .cv .seals img'), live = document.querySelector('#l7Bf .l-setname .ing-crest');
    return { marks: marks.map(m => m.src === IngSeal.url(a, { night: true })), paper: pap && pap.src === IngSeal.url(a, { night: true }), live: live && live.classList.contains('night') && [...live.querySelectorAll('img.ic-l')].some(x => x.src === live.querySelectorAll('img.ic-l')[0].src), tiles: [...document.querySelectorAll('#l7Bf .l-app .ls')].length }; });
  ok(N1.marks.length === 3 && N1.marks.every(Boolean), 'by night the Documents list shows the night crest (it kept the day look before)', N1.marks);
  ok(N1.paper && N1.live, 'by night the cover and the live crest by the set\'s name change too, with no reload', N1);
  await p.screenshot({ path: path.join(OUT, 's61-lector-trio-night.png') });
  await shotDocs('s61-documents-night.png');
  // one app's mark by night is its night picture
  await setUp(p, ['inkwell']);
  const N2 = await p.evaluate(() => { const m = document.querySelector('#l7Bf .l-doc .l-mark img'); return { cls: m && m.className, night: m && m.src === IngSeal.url(['inkwell'], { night: true }), paper: document.querySelectorAll('#l7Desk .l-paper .cv .seals img.crest').length }; });
  ok(/ic-one/.test(N2.cls) && N2.night && N2.paper === 0, 'one app: its own seal in the list, by night its night picture; its cover keeps its own seal', N2);
  await theme(p, 'day');
  const D2 = await p.evaluate(() => { const m = document.querySelector('#l7Bf .l-doc .l-mark img'); return m && m.src === IngSeal.url(['inkwell'], { night: false }); });
  ok(D2, 'and back by day when the Display setting changes back', D2);

  // ---------------- the files it saves ----------------
  async function saveAs(fmt) { await p.evaluate((fmt) => document.querySelector('#l7Fmt button[data-v="' + fmt + '"]').click(), fmt); await p.waitForTimeout(200); return nextDownload(p, () => p.evaluate(() => document.getElementById('l7Save').click()), fmt); }
  await setUp(p, ['cd', 'forge', 'ingenium']);
  const docx = await saveAs('docx');
  let names = [], xml = '', media = null;
  try { names = unzip(docx).toString().split('\n'); xml = unzip(docx, 'word/document.xml').toString(); const mf = names.filter(n => /^word\/media\//.test(n)); media = mf.map(n => pngSize(unzip(docx, n))); } catch (e) { names = ['unzip failed: ' + e.message]; }
  const ext = (xml.match(/<wp:extent cx="(\d+)" cy="(\d+)"/g) || []);
  ok(docx && media && media.length === 1 && JSON.stringify(media[0]) === JSON.stringify([720, 883]) && ext.length === 1 && /cx="1417320"/.test(ext[0]), 'Word: the trio\'s file carries one picture, the crest (720 by 883), 1.55 inches wide on its cover, not three seals', { media, ext, file: docx && path.basename(docx) });
  ok(/Carpe Diem, The Forge and Ingenium/.test(xml), 'and its cover keeps the set\'s name', /Carpe Diem, The Forge and Ingenium/.test(xml));
  const pdf = await saveAs('pdf');
  const pdfText = pdf ? fs.readFileSync(pdf).toString('latin1') : '';
  const imgs = (pdfText.match(/\/Subtype\s*\/Image/g) || []).length, wh = (pdfText.match(/\/Width (\d+) \/Height (\d+)|\/Height (\d+) \/Width (\d+)/g) || []);
  ok(pdf && /^%PDF/.test(pdfText) && imgs >= 1 && imgs <= 2, 'PDF: the trio\'s file carries the crest (one picture, with its clear edge), not three seals', { imgs, wh: wh.slice(0, 3), file: pdf && path.basename(pdf) });
  const htm = await saveAs('html');
  const page = htm ? fs.readFileSync(htm, 'utf8') : '';
  ok(htm && (page.match(/<img class="crest c-trio sd" src="data:image\/png;base64,/g) || []).length === 1 && (page.match(/<img class="crest c-trio sn" src="data:image\/png;base64,/g) || []).length === 1 && !/blob:/.test(page), 'Web page: the crest by day and by night, each a picture inside the file, the night one shown on a device set to dark', htm && path.basename(htm));
  // a duo and the master in Word
  await setUp(p, ['forge', 'ingenium']);
  const dsetText = await p.evaluate(() => document.querySelector('#l7Bf .l-setname').textContent);
  const docx2 = await saveAs('docx'); let x2 = '', m2 = null; try { x2 = unzip(docx2, 'word/document.xml').toString(); m2 = unzip(docx2).toString().split('\n').filter(n => /^word\/media\//.test(n)).map(n => pngSize(unzip(docx2, n))); } catch (e) { }
  ok(/a duo/i.test(dsetText) && m2 && m2.length === 1 && JSON.stringify(m2[0]) === '[900,552]' && /<wp:extent cx="2651760"/.test(x2), 'a duo: the brief says a duo; its Word file carries the pair, one picture, 2.9 inches wide', { dsetText, m2 });
  await setUp(p, ALL);
  const docx3 = await saveAs('docx'); let m3 = null, x3 = ''; try { x3 = unzip(docx3, 'word/document.xml').toString(); m3 = unzip(docx3).toString().split('\n').filter(n => /^word\/media\//.test(n)).map(n => pngSize(unzip(docx3, n))); } catch (e) { }
  ok(m3 && m3.length === 1 && JSON.stringify(m3[0]) === '[720,960]' && /cx="1417320"/.test(x3), 'all four: the master seal, drawn from the approved design, alone on the cover', m3);
  const ms = await p.evaluate(() => ({ list: [...document.querySelectorAll('#l7Bf .l-doc .l-mark img')].map(i => i.className), cover: (document.querySelector('#l7Desk .l-paper .cv .seals img') || {}).className, set: document.querySelector('#l7Bf .l-setname').textContent }));
  ok(ms.list.slice(0, 3).every(c => /ic-master/.test(c)) && /crest c-master/.test(ms.cover) && /The Offline Project/.test(ms.set), 'and on the page: the master in the list, on the cover, by the set\'s name', ms);
  // a Word file made by another road (a backup's export) finds the crest drawn ahead
  const other = await p.evaluate(() => { const u8 = lxDocx('Carpe Diem, The Forge and Ingenium · Project dossier', '# x\n\n## One\n\nText.'); const s = new TextDecoder('latin1').decode(u8); return { media: (s.match(/word\/media\/seal-[\w-]+\.png/g) || []).filter((v, i, a) => a.indexOf(v) === i), cached: !!IngSeal.docCached(['cd', 'forge', 'ingenium']) }; });
  ok(other.cached && other.media.length === 1 && other.media[0] === 'word/media/seal-master.png', 'a Word file made from the same set by another road carries the crest too, once it is drawn', other);
  const cvx = await p.evaluate(() => { const u8 = IngHouseDocs.docx('CV entry', '## Projects\n\nx', { kind: 'cv', apps: ['cd', 'forge', 'ingenium'] }); const s = new TextDecoder('latin1').decode(u8); return (s.match(/word\/media\//g) || []).length; });
  ok(cvx === 0, 'a CV stays plain', cvx);
  const onex = await p.evaluate(() => { const u8 = IngHouseDocs.docx('Carpe Diem · Project dossier', '## One\n\nx', { kind: 'dossier', apps: ['cd'] }); const s = new TextDecoder('latin1').decode(u8); return (s.match(/word\/media\/seal-[\w-]+\.png/g) || []).filter((v, i, a) => a.indexOf(v) === i); });
  ok(onex.length === 1 && onex[0] === 'word/media/seal-cd.png', 'a document about one app keeps that app\'s own seal, as before', onex);
  const forx = await p.evaluate(() => { const u8 = IngHouseDocs.docx('Carpe Diem and Tide Clock · Project dossier', '## One\n\nx', { kind: 'dossier', apps: ['cd', 'tideclock'] }); const s = new TextDecoder('latin1').decode(u8); return (s.match(/word\/media\/seal-[\w-]+\.png/g) || []).filter((v, i, a) => a.indexOf(v) === i); });
  ok(forx.join() === 'word/media/seal-cd.png', 'a set naming an app outside the four is left as the house style made it (no crest)', forx);

  // ---------------- the document on a large display ----------------
  async function measure() { return p.evaluate(() => { const d = document.getElementById('l7Desk'), pp = d.querySelector('.l-paper'), cs = getComputedStyle(d); const inner = d.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    return { desk: Math.round(inner), paper: Math.round(pp.getBoundingClientRect().width), zoom: parseFloat(d.style.getPropertyValue('--l-zoom')), pc: document.querySelector('#l7Zoom .pc').textContent, fit: document.querySelector('#l7Zoom [data-z="fit"]').getAttribute('aria-pressed'),
      over: d.scrollWidth - d.clientWidth, lx7: Math.round(document.getElementById('lx7').getBoundingClientRect().width), main: Math.round(document.querySelector('.main').getBoundingClientRect().width) }; }); }
  await setUp(p, ['cd', 'forge', 'ingenium']);
  await p.evaluate(() => { state.v61 = state.v61 || {}; state.v61.seals = state.v61.seals || {}; delete state.v61.seals.zoom; saveState(); });
  await p.setViewportSize({ width: 3440, height: 1440 }); await p.waitForTimeout(900);
  const w1 = await measure();
  ok(w1.lx7 >= w1.main - 60, 'at 3440 by 1440 Lector takes the whole width of the window', w1);
  ok(w1.fit === 'true' && w1.zoom > 1.4 && Math.abs(w1.paper - w1.desk) <= Math.max(12, w1.desk * 0.02) && w1.over <= 1, 'Fit: the document grows to the panel\'s width (it stood at 640 in the middle), with nothing running off the side', w1);
  await p.screenshot({ path: path.join(OUT, 's61-wide-3440-fit.png') });
  await p.evaluate(() => document.querySelector('#l7Zoom [data-z="-"]').click()); await p.waitForTimeout(400);
  const w2 = await measure();
  ok(w2.fit === 'false' && w2.zoom < w1.zoom && w2.paper < w1.paper && /%$/.test(w2.pc), 'Smaller: one step down, and the readout says how large', [w1.pc, w2.pc]);
  await p.evaluate(() => document.querySelector('#l7Zoom [data-z="+"]').click()); await p.evaluate(() => document.querySelector('#l7Zoom [data-z="+"]').click()); await p.waitForTimeout(400);
  const w3 = await measure(), kept = await p.evaluate(() => state.v61 && state.v61.seals && state.v61.seals.zoom);
  ok(w3.zoom > w2.zoom && kept === w3.zoom, 'Larger: steps up, and the choice is kept', { zoom: w3.zoom, kept });
  // the brief and the thinking folded: the document takes the room, and Fit fills it
  await p.evaluate(() => document.querySelector('#l7Zoom [data-z="fit"]').click()); await p.waitForTimeout(300);
  await p.evaluate(() => { document.querySelector('#l7Brief .l-fold').click(); }); await p.waitForTimeout(300); await p.evaluate(() => { document.querySelector('#l7Read .l-fold').click(); }); await p.waitForTimeout(700);
  const w4 = await measure();
  ok(w4.fit === 'true' && w4.zoom > w1.zoom && (Math.abs(w4.paper - w4.desk) <= Math.max(12, w4.desk * 0.02) || (w4.zoom === 3 && Math.abs(w4.paper - 1920) <= 4)), 'with the other panels folded away, Fit grows the page with the panel (up to three times its size, so it never turns into a poster)', w4);
  await p.evaluate(() => document.querySelector('#l7Zoom [data-z="+"]').click()); await p.waitForTimeout(300);
  const w4b = await measure();
  ok(w4b.fit === 'false' && w4b.zoom === 3.5 && w4b.paper > w4.paper, 'and the + key still takes it larger for whoever wants it', [w4.pc, w4b.pc]);
  await p.evaluate(() => document.querySelector('#l7Zoom [data-z="fit"]').click()); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(OUT, 's61-wide-3440-folded.png') });
  await theme(p, 'night'); await p.screenshot({ path: path.join(OUT, 's61-wide-3440-night.png') }); await theme(p, 'day');
  await p.evaluate(() => { document.querySelector('#l7Brief .l-fold').click(); }); await p.waitForTimeout(200); await p.evaluate(() => { document.querySelector('#l7Read .l-fold').click(); }); await p.waitForTimeout(300);
  // the zoom chosen survives a restart
  await p.evaluate(() => document.querySelector('#l7Zoom [data-z="+"]').click()); await p.waitForTimeout(300);
  const chosen = await p.evaluate(() => state.v61.seals.zoom); await p.evaluate(() => saveState()); await p.waitForTimeout(300);
  await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1000);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(500);
  await p.evaluate(() => { go('lector'); IngLector.R7.doc = 'dossier'; IngLector.render(); }); await p.waitForTimeout(1000);
  const w5 = await measure();
  ok(Math.abs(w5.zoom - chosen) < .001 && w5.fit === 'false', 'after a restart the document opens at the size chosen', { chosen, now: w5.zoom });
  await p.evaluate(() => document.querySelector('#l7Zoom [data-z="fit"]').click()); await p.waitForTimeout(300);
  // a laptop
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(800);
  const w6 = await measure();
  ok(w6.zoom >= 1 && w6.zoom < 1.3 && w6.paper <= w6.desk + 2 && w6.over <= 1, 'at 1440 by 900 the page fits its panel at its own size or a little larger', w6);
  await p.screenshot({ path: path.join(OUT, 's61-1440-fit.png') });
  const lay = await p.evaluate(() => ({ pageScroll: document.scrollingElement.scrollHeight - innerHeight, shown: ['l7Brief', 'l7Read', 'l7Doc'].filter(id => getComputedStyle(document.getElementById(id)).display !== 'none').length, one: document.getElementById('lx7').classList.contains('l-one'),
    keysOnRow: (() => { const z = document.getElementById('l7Zoom').getBoundingClientRect(), d = document.getElementById('l7Doc').getBoundingClientRect(); return z.right <= d.right + 1 && z.left >= d.left - 1; })() }));
  ok(lay.pageScroll <= 1 && lay.shown === 3 && !lay.one && lay.keysOnRow, 'at 1440 by 900 the three panels stand side by side, the page itself does not scroll, and the size keys sit inside the document panel', lay);
  const sharp = await p.evaluate(() => { const pp = document.querySelector('#l7Desk .l-paper'); return getComputedStyle(pp).transform; });
  ok(sharp === 'none', 'the page is zoomed (laid out again), not scaled as a picture', sharp);
  const mineErrs = p.__errs.filter(e => mine(e, R));
  ok(mineErrs.length === 0, 'no script errors from this area\'s parts (r107, r108, r140)', mineErrs.slice(0, 3).join(' | ').slice(0, 400));
  if (p.__errs.length) console.log('(other parts\' errors, not this area\'s: ' + p.__errs.filter(e => !mine(e, R)).map(e => e.slice(0, 120)).slice(0, 3).join(' | ') + ')');
  await ctx.close();

  // a phone
  ({ ctx, p } = await open(b, { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }));
  await setUp(p, ['cd', 'forge', 'ingenium']);
  await p.evaluate(() => IngLector.setPanel('doc')); await p.waitForTimeout(700);
  const ph = await measure();
  const phx = await p.evaluate(() => ({ one: document.getElementById('lx7').classList.contains('l-one'), crestW: Math.round((document.querySelector('#l7Desk .l-paper .cv .seals img.crest') || { getBoundingClientRect: () => ({ width: 0 }) }).getBoundingClientRect().width), page: document.scrollingElement.scrollWidth - innerWidth, zoomKeys: document.querySelectorAll('#l7Zoom button').length, zoomShown: !!document.getElementById('l7Zoom').offsetParent }));
  ok(phx.one && ph.zoom === 1 && ph.paper <= ph.desk + 2 && ph.over <= 1 && phx.page <= 1 && phx.crestW >= 80, 'on a phone the page reads at its own size, the width of the screen, with the crest on its cover', Object.assign({}, ph, phx));
  ok(phx.zoomShown && phx.zoomKeys === 3, 'and the size keys are there on the phone too', phx);
  await p.screenshot({ path: path.join(OUT, 's61-phone-doc.png') });
  await p.evaluate(() => IngLector.setPanel('brief')); await p.waitForTimeout(400); await p.screenshot({ path: path.join(OUT, 's61-phone-brief.png') });
  for (const e of p.__errs) if (mine(e, R)) { ok(false, 'a script error from this area (phone)', e.slice(0, 300)); }
  await ctx.close();

  // less motion
  ({ ctx, p } = await open(b, { reducedMotion: 'reduce' }));
  await setUp(p, ['cd', 'forge', 'inkwell']);
  const rm = await p.evaluate(() => { const c = document.querySelector('#l7Bf .l-setname .ing-crest'); return { rise: c.classList.contains('rise'), anim: getComputedStyle(c.querySelector('.ic-idle')).animationName }; });
  ok(rm && !rm.rise && rm.anim === 'none', 'with less motion asked for, the crest stands still (no sway, no parting)', rm);
  // keyboard: the size keys are reachable and labelled
  const kb = await p.evaluate(() => [...document.querySelectorAll('#l7Zoom button')].map(b => (b.getAttribute('aria-label') || b.textContent) + (b.tabIndex >= 0 ? '' : '!')));
  ok(kb.join('|') === 'Smaller|Fit|Larger', 'the size keys are keys a keyboard reaches, each with its name', kb);
  await p.screenshot({ path: path.join(OUT, 's61-lector-trio-inkwell.png') });
  for (const e of p.__errs) if (mine(e, R)) { ok(false, 'a script error from this area (less motion)', e.slice(0, 300)); }
  await ctx.close();

  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FAIL', e); process.exit(1); });
