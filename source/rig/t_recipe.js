// R126: Lector's recipe. Measures the apps kept on this device in a frame from which nothing can leave, keeps a document,
// finds the figures an update changed and the rules a sentence breaks, and updates the Word file in place, run by run.
// The Word file is made here, in the page, so no personal document is needed.   node t_recipe.js <url> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 400) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const left = []; p.on('request', r => { const u = r.url(); if (/^https?:/.test(u) && !u.startsWith(new URL(URL_).origin)) left.push(u); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  const parts = await p.evaluate(() => window.__ingParts);
  ok(parts.p54 === 'running', 'the recipe part (p54) runs', parts.p54);
  const data = await p.evaluate(() => { const R = IngRecipe.data; return { refs: R.refs.length, rules: R.rules.length, docs: R.docs.length, csl: R.refs.every(r => r.csl && r.csl.title && r.supports), personal: /Yannie|Forest\b/.test(JSON.stringify(R)) }; });
  ok(data.refs === 32 && data.rules === 11 && data.docs === 17 && data.csl && !data.personal, 'the recipe is in the code: 32 verified sources, 11 rules, 17 kinds of document, nothing personal', JSON.stringify(data));
  const hook = await p.evaluate(() => !!(window.lxAsk && window.lxAsk.__recipe));
  ok(hook, 'Lector\'s calls to the model go through the recipe');

  // 1. the section in Lector's brief, and the tour card
  await p.waitForFunction(() => window.__ingBuiltin && window.__ingBuiltin.states, null, { timeout: 120000 });
  await p.evaluate(() => go('lector')); await p.waitForTimeout(1500);
  const sec = await p.evaluate(() => { const s = document.getElementById('lxRxSec'); if (!s) return null; const r = s.getBoundingClientRect(); return { w: r.width, h: r.height, t: s.textContent.slice(0, 120), after: s.previousElementSibling && s.previousElementSibling.textContent.slice(0, 20) }; });
  ok(sec && sec.w > 100 && sec.h > 60, 'the recipe stands in Lector\'s brief, after Your apps', JSON.stringify(sec));
  const tour = await p.evaluate(() => { const i = ING_TOUR.findIndex(c => c && c.r126); return { i, prev: i > 0 ? ING_TOUR[i - 1].sub : null, n: ING_TOUR.length }; });
  ok(tour.i > 0 && tour.prev === 'Your apps', 'the tour has a card for it, after Lector\'s Your apps', JSON.stringify(tour));
  // it survives Lector repainting its brief
  await p.evaluate(() => { try { lxRender(); } catch (e) {} }); await p.waitForTimeout(400);
  ok(await p.evaluate(() => !!document.getElementById('lxRxSec')), 'it stays when Lector repaints the brief');

  // 2. measure every app kept here, in the frame
  const t0 = Date.now();
  const m = await p.evaluate(() => IngRecipe.measureAll().then(r => { const o = {}; Object.keys(r).forEach(k => { const v = r[k].v || {}; o[k] = r[k].error ? { error: r[k].error } : { pass: v.pass, version: v.version, tour: v.tour, read: v.read, sha: (v.sha || '').slice(0, 12), bytes: v.bytes, req: v.requests, tutor: v.tutor, house: v.house, catalog: v.catalog, carried: (v.carried || []).length, stamp: v.stamp }; }); return o; }), null);
  const ms = Date.now() - t0;
  ok(m.cd && m.cd.pass === '1054' && m.cd.tour === 201 && m.cd.tutor === 323 && m.cd.read, 'Carpe Diem is measured from its kept copy: build 1054, 201 tour cards, 323 tutor entries', JSON.stringify(m.cd));
  ok(m.forge && /^\d{3}$/.test(m.forge.pass || '') && /^9s\d+$/.test(m.forge.stamp || '') && m.forge.tour === 31, 'The Forge is measured: its pass and stamp from its About panel, 31 tour cards (its lean copy carries no apps)', JSON.stringify(m.forge));
  ok(m.inkwell && m.inkwell.version === '7.43' && m.inkwell.tour === 49, 'Inkwell is measured: 7.43, 49 tour cards', JSON.stringify(m.inkwell));
  ok(m.ingenium && /^5\.\d+$/.test(m.ingenium.version || '') && m.ingenium.house === 18 && m.ingenium.catalog === 34, 'Ingenium is measured: its version, 18 house models, 34 in the catalogue', JSON.stringify(m.ingenium));
  ok(m.inkwell && m.inkwell.req && m.inkwell.req.loopback.length === 1 && m.inkwell.req.outside.length === 0, 'what an app tries is written down: Inkwell\'s check of its loopback helper, refused in the frame', JSON.stringify(m.inkwell && m.inkwell.req));
  ok(left.length === 0, 'nothing left the page while the apps were measured', JSON.stringify(left.slice(0, 5)) + ' in ' + ms + ' ms');
  const isolated = await p.evaluate(() => ({ v: ING_VERSION, kept: Object.keys(libState().apps).length, rx: !!state.recipe.facts.cd }));
  ok(isolated.kept >= 4 && isolated.rx, 'the apps measured in the frame did not touch Ingenium\'s own memory', JSON.stringify(isolated));

  // 3. a document: a Word file made here, with figures from an earlier build, split runs and the owner's rules broken
  const made = await p.evaluate(() => {
    const W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
    const para = (runs) => '<w:p>' + runs.map(r => '<w:r>' + (r.b ? '<w:rPr><w:b/></w:rPr>' : '') + '<w:t xml:space="preserve">' + r.t + '</w:t></w:r>').join('') + '</w:p>';
    const body = [
      para([{ t: 'Carpe Diem build 1051, dated 12 October 2026, holds a guided tour of 199 cards.' }]),
      para([{ t: 'Its tutor of 320-' }, { t: 'entry corpus is written by hand.', b: true }]),
      para([{ t: 'The size of the full edition is as last measured at build 1051.' }]),
      para([{ t: 'Lector drafted none of this — it was written by hand.' }]),
      para([{ t: 'Opening it makes no network request as you work in it.' }]),
      para([{ t: 'Ingenium 5.0 runs its own models.' }]),
      para([{ t: 'References' }]),
      para([{ t: 'Risko, Evan F., and Sam J. Gilbert. 2016. “Cognitive Offloading.” Trends in Cognitive Sciences 20 (9): 676–88. https://doi.org/10.1016/j.tics.2016.07.002.' }]),
      para([{ t: 'Nobody, A. 2024. An Invented Book That Does Not Exist. Nowhere: No Press.' }])].join('');
    const doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ' + W + '><w:body>' + body + '<w:sectPr/></w:body></w:document>';
    const ct = '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>';
    const rels = '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
    const u8 = makeZip([{ name: '[Content_Types].xml', data: ct }, { name: '_rels/.rels', data: rels }, { name: 'word/document.xml', data: doc }]);
    const f = new File([u8], 'Test_Appendix_Digital_Humanities.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    // an earlier measurement of Carpe Diem, as if 1051 had been measured before 1054
    const H = state.recipe.facts.cd; const old = JSON.parse(JSON.stringify(H[0])); old.v.pass = '1051'; old.v.tour = 199; old.v.tutor = 320; old.v.sha = 'older'; old.at = Date.now() - 86400000 * 6; H.splice(1, 0, old);
    return IngRecipe.addDocs([f]).then(ds => ds[0]).then(d => IngRecipe.check(d).then(F => ({ id: d.id, tpl: d.tpl, bin: !!d.bin, F: F.map(x => ({ k: x.kind, r: x.rule, f: x.fact, from: x.from, to: x.to, on: x.on, p: x.p })) })));
  });
  ok(made.bin && made.tpl === 'appendix-dh', 'the Word file is kept here, whole, and known as an appendix for the digital humanities', JSON.stringify({ tpl: made.tpl, bin: made.bin }));
  const F = made.F, find = (from, on) => F.find(x => x.from === from && (on === undefined || x.on === on));
  ok(find('Carpe Diem build 1051', true) && find('Carpe Diem build 1051').to === 'Carpe Diem build 1054', 'a build an update changed is found in the owner\'s words, ticked, with its new figure', JSON.stringify(find('Carpe Diem build 1051')));
  ok(find('tour of 199 cards', true) && find('tour of 199 cards').to === 'tour of 201 cards', 'so is the tour', JSON.stringify(find('tour of 199 cards')));
  ok(find('320-entry', true) && find('320-entry').to === '323-entry', 'so is a figure split across two runs of the Word file', JSON.stringify(find('320-entry')));
  const guarded = F.find(x => x.p === 2 && x.k === 'figure');
  ok(guarded && guarded.on === false, '"as last measured at build 1051" is found but left unticked: its sentence means the earlier build', JSON.stringify(guarded));
  ok(F.some(x => x.r === 'lector' && x.p === 3), 'Lector named in an academic document is marked', JSON.stringify(F.filter(x => x.r === 'lector')));
  ok(F.some(x => x.r === 'dash' && x.p === 3), 'a dash in prose is marked');
  ok(F.some(x => x.r === 'scope' && x.p === 4), '"makes no network request" is marked, for the loopback check');
  ok(F.some(x => x.p === 5 && x.k === 'figure' && x.from === '5.0' && x.on === false), 'an earlier Ingenium named in the owner\'s words is offered, not ticked', JSON.stringify(F.filter(x => x.p === 5)));
  ok(F.some(x => x.r === 'sources' && x.p === 8) && !F.some(x => x.r === 'sources' && x.p === 7), 'a source neither verified nor in My sources is marked; a verified one is not', JSON.stringify(F.filter(x => x.r === 'sources')));

  // 4. update what is ticked, in the Word file itself
  const up = await p.evaluate((id) => { const d = state.recipe.docs.find(x => x.id === id); return IngRecipe.apply(d).then(n => IngBig.load(d.bin).then(s => { const bin = atob(s), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++)u8[i] = bin.charCodeAt(i);
    return libZipData(u8, libZipEntries(u8)['word/document.xml']).then(x => { const xml = new TextDecoder().decode(x); return IngRecipe.docxParas(u8).then(P => ({ n, ver: d.ver.length, P: P.map(p => p.text), bold: /<w:rPr><w:b\/><\/w:rPr><w:t xml:space="preserve">entry corpus/.test(xml), wellFormed: !new DOMParser().parseFromString(xml, 'application/xml').querySelector('parsererror') })); }); })); }, made.id);
  ok(up.n === 3, 'the three ticked figures are changed', JSON.stringify(up.n));
  ok(up.P[0] === 'Carpe Diem build 1054, dated 12 October 2026, holds a guided tour of 201 cards.' && up.P[1] === 'Its tutor of 323-entry corpus is written by hand.', 'the owner\'s sentences read as before, with the new figures', JSON.stringify(up.P.slice(0, 2)));
  ok(up.P[2] === 'The size of the full edition is as last measured at build 1051.' && up.P[3].indexOf('Lector') === 0, 'what was not ticked is untouched', JSON.stringify(up.P.slice(2, 4)));
  ok(up.bold && up.wellFormed, 'the bold run keeps its bold, and the Word file\'s XML is well formed', JSON.stringify({ bold: up.bold, wf: up.wellFormed }));
  ok(up.ver === 1, 'the version before is kept', up.ver);
  const re = await p.evaluate((id) => { const d = state.recipe.docs.find(x => x.id === id); return IngRecipe.check(d).then(F => F.filter(x => x.on && x.to != null).length); }, made.id);
  ok(re === 0, 'checked again, nothing ticked is left to change', re);
  // undo
  const un = await p.evaluate((id) => { const d = state.recipe.docs.find(x => x.id === id); IngRecipe.undo(d); return IngRecipe.check(d).then(F => F.filter(x => x.on && x.to != null).length); }, made.id);
  ok(un === 3, 'Undo brings the version before back', un);

  // 5. writing by the recipe: the layer that travels with Lector's sections, and the sources for My sources
  const lay = await p.evaluate(() => { const L = IngRecipe.layer(); return { rules: /THE OWNER'S RULES \(the recipe/.test(L), facts: /MEASURED BY THE RECIPE/.test(L) && /Carpe Diem \(measured/.test(L), dev: /development notes/.test(L), len: L.length }; });
  ok(lay.rules && lay.facts && lay.dev && lay.len < 9000, 'the rules, the latest measures and the attributed figures travel with every section Lector writes', JSON.stringify(lay));
  const sent = await p.evaluate(() => { let got = null; const keep = { a: supUsesLink, b: ensureCloudModel, c: cloudChat };
    supUsesLink = () => true; ensureCloudModel = () => Promise.resolve(); cloudChat = (msgs, onTok) => { got = msgs; if (onTok) onTok('ok'); return Promise.resolve(); };
    const done = () => { supUsesLink = keep.a; ensureCloudModel = keep.b; cloudChat = keep.c; };
    return lxAsk({ modelId: null }, [{ role: 'system', content: 'You are Lector, writing on the owner\'s own device.' }, { role: 'user', content: 'x' }], 10, 0.2)
      .then(() => { done(); return got && got[0].content.indexOf('THE OWNER\'S RULES (the recipe') > 0 && got[0].content.indexOf('MEASURED BY THE RECIPE') > 0; }, e => { done(); return 'error ' + e; }); });
  ok(sent === true, 'a section Lector asks for carries the recipe: the owner\'s rules and the latest measures', String(sent));
  const fo = await p.evaluate(() => { const n0 = fontesItems().length; IngRecipe.sourcesToFontes(); const items = fontesItems().filter(c => c.ingRecipe); return { n0, n: items.length, note: items[0] && items[0].ingNote.slice(0, 60), again: IngRecipe.sourcesToFontes() }; });
  ok(fo.n === 32 && /^Verified for the recipe/.test(fo.note || '') && fo.again === 0, 'the verified sources go into My sources once, each with the claim it supports', JSON.stringify(fo));
  const chi = await p.evaluate(() => { const c = fontesItems().find(x => x.ingRecipe === 'bastani2025'); return fontesFormat([c], 'chicago-author-date').then(r => r[0].text); });
  ok(/^Bastani, Hamsa, Osbert Bastani/.test(chi) && /2025/.test(chi) && /e2422633122/.test(chi), 'and Fontes formats them in Chicago author-date', chi);

  // 6. the sheet, by day and by night, and on a phone
  await p.evaluate(() => IngRecipe.open('facts')); await p.waitForTimeout(500);
  await p.screenshot({ path: OUT + '/recipe_facts_day.png' });
  await p.evaluate(() => IngRecipe.open('docs')); await p.waitForTimeout(500);
  await p.screenshot({ path: OUT + '/recipe_docs_day.png' });
  const vis = await p.evaluate(() => { const c = document.querySelector('#lxRx .rx-card'); const r = c.getBoundingClientRect(); const b = [...document.querySelectorAll('#lxRx .l-btn')].slice(0, 3).map(x => getComputedStyle(x).borderRadius); return { w: r.width, h: r.height, btn: b }; });
  ok(vis.w > 600 && vis.h > 300, 'the sheet opens over Lector', JSON.stringify(vis));
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); IngRecipe.open('docs'); }); await p.waitForTimeout(400);
  await p.screenshot({ path: OUT + '/recipe_docs_night.png' });
  const night = await p.evaluate(() => { const c = getComputedStyle(document.querySelector('#lxRx .rx-card')); return c.backgroundColor; });
  ok(!/255, 255, 255/.test(night), 'by night the sheet is dark', night);
  await p.evaluate(() => IngRecipe.open('recipe')); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/recipe_recipe_night.png' });
  await p.setViewportSize({ width: 390, height: 844 }); await p.evaluate(() => { document.body.setAttribute('data-theme', 'day'); IngRecipe.open('docs'); }); await p.waitForTimeout(500);
  await p.screenshot({ path: OUT + '/recipe_docs_phone.png' });
  const phone = await p.evaluate(() => { const c = document.querySelector('#lxRx .rx-card').getBoundingClientRect(); return { w: c.width, sx: document.querySelector('#lxRx .rx-body').scrollWidth <= document.querySelector('#lxRx .rx-body').clientWidth + 2 }; });
  ok(phone.w <= 390 && phone.sx, 'on a phone it fills the screen, with no sideways scroll', JSON.stringify(phone));
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  ok(await p.evaluate(() => !document.getElementById('lxRx')), 'Esc closes it');
  ok(errs.length === 0, 'no page errors', JSON.stringify(errs.slice(0, 5)));
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed: ' + e.message); process.exit(1); });
