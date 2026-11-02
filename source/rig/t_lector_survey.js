// Lector survey: drive the real Lector page at 1440x900 and a Fire-like 1280x800, record what a person sees.
// Run: cd rig && S=<scratchpad> node t_lector_survey.js   (MODEL=0 skips the short model step)
const { start } = require('./lib.js');
const fs = require('fs');
const S = process.env.S, O = S + '/shots/lector/';
fs.mkdirSync(O, { recursive: true });
const INK = S + '/inkwell_in/5d95cd55-Inkwell_v7p41_standalone/5d95cd55-Inkwell_v7p41_standalone.html';
const FORGE = S + '/forge_in/html/the_forge.html';
const DOCX = S + '/fixtures/statement.docx';
const NOTLIB = S + '/t.zip';
const MODEL = process.env.MODEL !== '0';
const UA_FIRE = 'Mozilla/5.0 (Linux; Android 11; KFTRWI) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.230 Safari/537.36';
const VIEWS = [
  { tag: '1440x900', viewport: { width: 1440, height: 900 } },
  { tag: 'fire1280x800', viewport: { width: 1280, height: 800 }, ua: UA_FIRE, dpr: 1.5 },
];
const REPORT = { views: {} };
const log = (...a) => console.log(...a);

async function measure(page) {
  return page.evaluate(() => {
    const r = e => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)]; };
    const name = e => e.id ? '#' + e.id : e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/).join('.') : '');
    const de = document.documentElement, pl = document.getElementById('page-lector');
    const scrollers = []; let e = pl;
    while (e) { const cs = getComputedStyle(e); if (e.scrollHeight > e.clientHeight + 1 && (/(auto|scroll)/.test(cs.overflowY) || e === de || e === document.body)) scrollers.push({ el: name(e), scrollH: e.scrollHeight, clientH: e.clientHeight, top: Math.round(e.scrollTop), overflowY: cs.overflowY }); e = e.parentElement; }
    const over = []; pl.querySelectorAll('*').forEach(x => { const b = x.getBoundingClientRect(); if (b.width && b.right > innerWidth + 1) over.push(name(x) + ' right=' + Math.round(b.right)); });
    const cards = [...document.querySelectorAll('#lxHost > .card, #lxHost > .tip')].map(c => ({ head: (c.querySelector('h2') || c).textContent.replace(/\s+/g, ' ').trim().slice(0, 70), rect: r(c) }));
    const nav = document.querySelector('.nav-btn[data-page="lector"]');
    return { inner: [innerWidth, innerHeight], doc: [de.scrollWidth, de.scrollHeight], body: [document.body.scrollWidth, document.body.scrollHeight],
      pageLector: r(pl), host: r(document.getElementById('lxHost')), title: r(pl.querySelector('.page-title')), lede: r(pl.querySelector('.lede')),
      scrollers, overflowX: over.slice(0, 15), cards, shown: !pl.classList.contains('hidden') && getComputedStyle(pl).display !== 'none',
      navBtn: nav ? { text: nav.textContent.replace(/\s+/g, ' ').trim(), active: nav.classList.contains('active') || nav.getAttribute('aria-current') === 'page', rect: r(nav) } : null,
      theme: state.theme, bodyCls: document.body.className };
  });
}
async function controls(page) {
  return page.evaluate(() => {
    const vis = e => { const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return b.width > 0 && b.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    const mb = document.getElementById('modalBox');
    const roots = [document.getElementById('page-lector')]; if (mb && vis(mb)) roots.push(mb);
    const out = [], seen = new Set();
    roots.forEach(root => root.querySelectorAll('button, input, select, textarea, summary, a[href], [role=button]').forEach(e => {
      if (seen.has(e)) return; seen.add(e); const b = e.getBoundingClientRect();
      let text;
      if (e.tagName === 'SELECT') text = 'select #' + e.id + ' [' + [...e.options].map(o => o.textContent.trim()).join(' | ') + '] = ' + ((e.selectedOptions[0] || {}).textContent || '');
      else if (e.tagName === 'INPUT') { const lab = e.closest('label'); text = 'input ' + e.type + (e.id ? ' #' + e.id : '') + (e.name ? ' name=' + e.name : '') + (e.value && e.type === 'radio' ? ' value=' + e.value : '') + (e.placeholder ? ' placeholder="' + e.placeholder + '"' : '') + ((e.type === 'radio' || e.type === 'checkbox') && e.checked ? ' (checked)' : '') + (e.accept ? ' accept=' + e.accept : '') + (lab ? ' label="' + lab.textContent.replace(/\s+/g, ' ').trim().slice(0, 110) + '"' : ''); }
      else text = (e.textContent || '').replace(/\s+/g, ' ').trim();
      out.push({ where: root.id === 'modalBox' ? 'modal' : 'page', tag: e.tagName.toLowerCase(), id: e.id || '', text: text.slice(0, 220), visible: vis(e), disabled: !!e.disabled, size: [Math.round(b.width), Math.round(b.height)], title: e.title || '' });
    }));
    return out;
  });
}
async function snap(page, V, name, extra = {}) {
  const base = O + V.tag + '_' + name;
  await page.screenshot({ path: base + '.png' });
  // the whole Lector page, whatever the scroller
  try { await page.locator('#page-lector').screenshot({ path: base + '_full.png', timeout: 15000 }); } catch (e) { log('full shot failed', name, e.message.slice(0, 100)); }
  const m = await measure(page), c = await controls(page);
  const toast = await page.evaluate(() => { const t = document.getElementById('ingToast'); return t && t.style.display !== 'none' ? t.textContent : ''; });
  const text = await page.evaluate(() => document.getElementById('lxHost').innerText.slice(0, 4000));
  const rec = { name, shot: base + '.png', full: base + '_full.png', measure: m, controls: c, toast, text, ...extra };
  REPORT.views[V.tag].states.push(rec);
  log(`\n=== [${V.tag}] ${name}  doc ${m.doc[1]} vs window ${m.inner[1]}  scrollers ${JSON.stringify(m.scrollers)}  overflowX ${m.overflowX.length}`);
  log('cards', JSON.stringify(m.cards));
  log('controls (visible):', c.filter(x => x.visible).map(x => `${x.tag}${x.disabled ? '[disabled]' : ''} "${x.text}" ${x.size.join('x')}`).join('\n  '));
  if (toast) log('toast:', toast);
  return rec;
}
async function choose(page, trigger, file) {
  // a person presses the button and picks the file in the system dialog
  try {
    const [fc] = await Promise.all([page.waitForEvent('filechooser', { timeout: 6000 }), page.click(trigger)]);
    await fc.setFiles(file); return 'filechooser';
  } catch (e) {
    const inputFor = { '#lxChoose': '#lxFile', '#libOpen': '#libFile', '#libPage': '#libPageFile', '#lxMine': '#lxMineFile' }[trigger];
    await page.setInputFiles(inputFor, file); return 'setInputFiles (' + e.message.slice(0, 60) + ')';
  }
}
async function scrollLectorTo(page, where) {
  await page.evaluate((where) => { const pl = document.getElementById('page-lector'); let e = pl;
    while (e) { const cs = getComputedStyle(e); if (e.scrollHeight > e.clientHeight + 1 && (/(auto|scroll)/.test(cs.overflowY) || e === document.documentElement)) { e.scrollTop = where === 'bottom' ? e.scrollHeight : 0; } e = e.parentElement; }
    window.scrollTo(0, where === 'bottom' ? document.documentElement.scrollHeight : 0); }, where);
  await page.waitForTimeout(400);
}
async function waitPick(page, timeout) {
  const t0 = Date.now(), seen = [];
  while (Date.now() - t0 < timeout) {
    const s = await page.evaluate(() => LX_PICK ? { state: LX_PICK.state, note: LX_PICK.note || '', err: LX_PICK.err || '' } : null);
    const k = s ? s.state + '|' + s.note : 'none';
    if (!seen.length || seen[seen.length - 1].k !== k) seen.push({ k, at: Date.now() - t0 });
    if (!s || s.state === 'ready' || s.state === 'error') return { s, ms: Date.now() - t0, seen };
    await page.waitForTimeout(150);
  }
  return { s: 'timeout', ms: Date.now() - t0, seen };
}

// PART=b: on a private back end (API=<port>), open apps with "Read it with Lector" and watch, without scrolling for the page,
// where the page lands, how long the preparation takes, and whether the step's heading is left under the top bar; then a PDF.
async function partB() {
  const API = +(process.env.API || 18997), PDF = S + '/fixtures/conv.pdf';
  const out = { views: {} };
  for (const V of VIEWS) {
    const R = out.views[V.tag] = { notes: [], states: [] };
    REPORT.views[V.tag] = { states: R.states, errors: [], notes: R.notes };
    const { browser, page, logs } = await start({ viewport: V.viewport, ua: V.ua, dpr: V.dpr, apiPort: API });
    R.build = await page.evaluate(() => ({ version: ING_VERSION, bytes: document.documentElement.outerHTML.length }));
    await page.evaluate(() => { state.theme = 'day'; applyTheme(); go('lector'); }); await page.waitForTimeout(1200);
    const [fc] = await Promise.all([page.waitForEvent('filechooser'), page.click('#libAdd')]); await fc.setFiles([INK, FORGE]);
    await page.waitForTimeout(300); await page.waitForFunction(() => !LIB.busy, null, { timeout: 120000 });
    R.notes.push('library: ' + await page.evaluate(() => LIB.note));
    const cover = () => page.evaluate(() => {
      const bar = document.elementFromPoint(innerWidth / 2, 4); let top = bar; while (top && top.parentElement && getComputedStyle(top).position !== 'fixed' && getComputedStyle(top).position !== 'sticky') top = top.parentElement;
      const barRect = top && top.getBoundingClientRect();
      const c = [...document.querySelectorAll('#lxHost .lx-card')].find(x => /Choose what to read/.test(x.textContent)); const h = c && c.querySelector('h2'); const hr = h && h.getBoundingClientRect();
      const hit = hr ? document.elementFromPoint(hr.left + 20, hr.top + hr.height / 2) : null;
      return { scrollY: Math.round(scrollY), bar: barRect ? { el: (top.id ? '#' + top.id : top.tagName.toLowerCase() + '.' + String(top.className).split(' ')[0]), bottom: Math.round(barRect.bottom), pos: getComputedStyle(top).position } : null,
        heading: hr ? { top: Math.round(hr.top), bottom: Math.round(hr.bottom) } : null, headingVisible: !!(hit && h.contains(hit)), hitIs: hit ? (hit.id || hit.className || hit.tagName) : null }; });
    for (const key of ['forge', 'inkwell']) {
      await page.evaluate(() => { LX_PICK = null; lxRender(); scrollTo(0, 0); }); await page.waitForTimeout(500);
      const t0 = Date.now(); await page.click(`[data-lib-read="${key}"]`);
      const seen = []; let shotBusy = false;
      while (Date.now() - t0 < 300000) {
        const s = await page.evaluate(() => LX_PICK ? LX_PICK.state + '|' + (LX_PICK.note || '') : 'none');
        if (!seen.length || seen[seen.length - 1].s !== s) seen.push({ s, at: Date.now() - t0 });
        if (!shotBusy && /^(reading|preparing)/.test(s)) { shotBusy = true; await page.screenshot({ path: O + V.tag + '_b_' + key + '_preparing.png' }); R.states.push({ name: 'b_' + key + '_preparing', shot: O + V.tag + '_b_' + key + '_preparing.png', at: s }); }
        if (/^(ready|error)/.test(s)) break; await page.waitForTimeout(100);
      }
      R.notes.push(key + ' preparation steps: ' + JSON.stringify(seen));
      await page.waitForTimeout(1500); // let the page's own smooth scroll settle
      const cv = await cover(); const shot = O + V.tag + '_b_' + key + '_ready_as_landed.png'; await page.screenshot({ path: shot });
      const info = await page.evaluate(() => LX_PICK && LX_PICK.P ? { title: LX_PICK.P.title, counts: LX_PICK.counts, facts: lxFactsText({ kind: 'app', name: LX_PICK.name, facts: LX_PICK.P.facts }) } : null);
      R.states.push({ name: 'b_' + key + '_ready_as_landed', shot, cover: cv, info, doc: await page.evaluate(() => [document.documentElement.scrollHeight, innerHeight]) });
      log(V.tag, key, JSON.stringify(cv), JSON.stringify(info && info.counts));
    }
    // a PDF through Choose a file
    await page.evaluate(() => { LX_PICK = null; lxRender(); scrollTo(0, 0); }); await page.waitForTimeout(400);
    const [fc2] = await Promise.all([page.waitForEvent('filechooser'), page.click('#lxChoose')]); await fc2.setFiles(PDF);
    const w = await waitPick(page, 120000); R.notes.push('pdf preparation: ' + JSON.stringify({ end: w.s, ms: w.ms, steps: w.seen }));
    await page.waitForTimeout(800); const cvp = await cover();
    await page.evaluate(() => { const c = document.getElementById('lxChoose'); if (c) c.scrollIntoView({ block: 'center' }); }); await page.waitForTimeout(400);
    const shotp = O + V.tag + '_b_pdf_ready.png'; await page.screenshot({ path: shotp });
    R.states.push({ name: 'b_pdf_ready', shot: shotp, cover: cvp, text: await page.evaluate(() => { const f = document.querySelector('#lxHost .lx-facts'); return f ? f.innerText : (document.querySelector('#lxHost .lx-err') || {}).innerText || ''; }) });
    // tap targets a person uses on a touch screen
    R.targets = await page.evaluate(() => [...document.querySelectorAll('#page-lector button, #page-lector label.kit-opt, #page-lector select, #page-lector summary')].filter(e => e.getBoundingClientRect().height > 0).map(e => { const b = e.getBoundingClientRect(); return [e.textContent.replace(/\s+/g, ' ').trim().slice(0, 50), Math.round(b.width), Math.round(b.height)]; }));
    R.errors = logs.filter(l => /^\[(error|pageerror)\]/.test(l) || /uncaught|exception/i.test(l));
    log(V.tag, 'notes', R.notes.join('\n  '), '\nerrors', R.errors.length ? R.errors.join('\n') : 'none');
    await browser.close();
  }
  fs.writeFileSync(O + 'report_b.json', JSON.stringify(out, null, 1)); log('report', O + 'report_b.json');
}

(async () => {
  if (process.env.PART === 'b') return partB();
  for (const V of VIEWS) {
    REPORT.views[V.tag] = { states: [], errors: [], notes: [] };
    const R = REPORT.views[V.tag];
    const t0 = Date.now();
    const { browser, page, logs } = await start({ viewport: V.viewport, ua: V.ua, dpr: V.dpr });
    R.notes.push('app ready in ' + Math.round((Date.now() - t0) / 1000) + ' s');
    const info = await page.evaluate(() => ({ edition: typeof ING_EDITION !== 'undefined' ? ING_EDITION : null, version: typeof ING_VERSION !== 'undefined' ? ING_VERSION : null, libOn: typeof libOn === 'function' ? libOn() : null,
      runs: lxState().runs.map(r => ({ name: r.name, status: r.status, done: r.done, total: r.total })), models: state.models.map(m => [m.customName, m.fileState]), active: state.activeModelId, ingApps: window.IngApps ? IngApps.list() : null }));
    R.info = info; log(V.tag, JSON.stringify(info));

    // 1 · empty
    await page.evaluate(() => go('lector')); await page.waitForTimeout(1500);
    await snap(page, V, '01_empty');
    await scrollLectorTo(page, 'bottom'); await snap(page, V, '02_empty_bottom'); await scrollLectorTo(page, 'top');

    // 2 · her apps: Keep this copy (Ingenium itself), Add your apps with a zip that holds none, then two app pages at once, then an install zip
    const addApps = async (files) => {
      try { const [fc] = await Promise.all([page.waitForEvent('filechooser', { timeout: 6000 }), page.click('#libAdd')]); await fc.setFiles(files); return 'filechooser multiple=' + fc.isMultiple(); }
      catch (e) { return 'NO filechooser: ' + e.message.slice(0, 80); } };
    const libDone = async (ms) => { const t1 = Date.now(); await page.waitForTimeout(300); await page.waitForFunction(() => !LIB.busy, null, { timeout: ms }).catch(() => R.notes.push('LIB still busy after ' + ms)); return Date.now() - t1; };
    if (await page.$('#libCard')) {
      if (await page.$('#libSelf')) { await page.click('#libSelf'); await page.waitForTimeout(400);
        await snap(page, V, '03a_keep_this_copy_busy', { lib: await page.evaluate(() => ({ busy: LIB.busy, note: LIB.note })) });
        R.notes.push('Keep this copy took ' + await libDone(180000) + ' ms; note: ' + await page.evaluate(() => LIB.note));
        await page.waitForTimeout(500); await snap(page, V, '03b_keep_this_copy_done'); }
      R.notes.push('Add your apps (t.zip, holds no app): ' + await addApps([NOTLIB]));
      R.notes.push('t.zip took ' + await libDone(60000) + ' ms; note: ' + await page.evaluate(() => LIB.note));
      await page.waitForTimeout(400); await snap(page, V, '04_add_zip_with_no_app');
      R.notes.push('Add your apps (Inkwell + Forge pages together): ' + await addApps([INK, FORGE]));
      await page.waitForTimeout(400); await snap(page, V, '05a_adding_two_pages_busy', { lib: await page.evaluate(() => ({ busy: LIB.busy, note: LIB.note })) });
      R.notes.push('two pages took ' + await libDone(240000) + ' ms; note: ' + await page.evaluate(() => LIB.note));
      await page.waitForTimeout(600); await snap(page, V, '05b_apps_added');
      if (V === VIEWS[0]) { // an install zip (Fire tablet, an .apk inside): the zip path
        R.notes.push('Add your apps (Inkwell Fire zip): ' + await addApps([S + '/inkwell_in/511502e3-Inkwell_Fire_Tablet_v7p41/511502e3-Inkwell_Fire_Tablet_v7p41.zip']));
        R.notes.push('Fire zip took ' + await libDone(240000) + ' ms; note: ' + await page.evaluate(() => LIB.note));
        await page.waitForTimeout(500); await snap(page, V, '05c_added_fire_zip'); }
      R.ingAppsAfter = await page.evaluate(() => window.IngApps ? IngApps.list() : null);
      R.libApps = await page.evaluate(() => libApps().map(a => ({ key: a.key, version: a.version, size: a.size, name: a.name, source: a.source })));
    } else R.notes.push('no Your apps card (libOn false?)');

    // 3 · choosing what to read: Inkwell from Your apps (Read it with Lector), the preparation that needs no model
    const readBtn = await page.$('[data-lib-read="inkwell"]');
    let w;
    if (readBtn) {
      await readBtn.click();
      // catch the in-between state a person sees
      await page.waitForTimeout(250); await snap(page, V, '06_inkwell_preparing', { pick: await page.evaluate(() => LX_PICK && { state: LX_PICK.state, note: LX_PICK.note }) });
      w = await waitPick(page, 240000);
    } else {
      R.notes.push('Inkwell via Choose a file: ' + await choose(page, '#lxChoose', INK));
      w = await waitPick(page, 240000);
    }
    R.notes.push('Inkwell preparation: ' + JSON.stringify({ end: w.s, ms: w.ms, steps: w.seen }));
    await page.waitForTimeout(500);
    const prepInk = await page.evaluate(() => LX_PICK && LX_PICK.P ? { kind: LX_PICK.P.kind, title: LX_PICK.P.title, sections: LX_PICK.P.sections.length, counts: LX_PICK.counts, facts: LX_PICK.P.facts } : null);
    await scrollLectorTo(page, 'top');
    const card1 = await page.evaluate(() => { const c = [...document.querySelectorAll('#lxHost .lx-card')].find(x => /Choose what to read/.test(x.textContent)); if (c) c.scrollIntoView({ block: 'start' }); return !!c; });
    await page.waitForTimeout(400);
    await snap(page, V, '07_inkwell_ready', { prep: prepInk });
    // Thorough
    if (await page.$('input[name="lxDepth"][value="thorough"]')) { await page.click('input[name="lxDepth"][value="thorough"]'); await page.waitForTimeout(300); await snap(page, V, '08_inkwell_thorough_chosen'); await page.click('input[name="lxDepth"][value="overview"]'); }

    // 4 · Choose another → back
    if (await page.$('#lxCancel')) { await page.click('#lxCancel'); await page.waitForTimeout(500); await snap(page, V, '09_after_choose_another'); }

    // 5 · a document: Word file through Choose a file
    R.notes.push('docx via ' + await choose(page, '#lxChoose', DOCX));
    w = await waitPick(page, 120000); R.notes.push('docx preparation: ' + JSON.stringify({ end: w.s, ms: w.ms, steps: w.seen }));
    await page.waitForTimeout(400);
    const prepDoc = await page.evaluate(() => LX_PICK && LX_PICK.P ? { kind: LX_PICK.P.kind, sections: LX_PICK.P.sections.length, counts: LX_PICK.counts, facts: LX_PICK.P.facts } : (LX_PICK ? { state: LX_PICK.state, err: LX_PICK.err } : null));
    await page.evaluate(() => { const c = document.getElementById('lxChoose'); if (c) c.scrollIntoView({ block: 'start' }); });
    await snap(page, V, '10_doc_ready', { prep: prepDoc });

    // 6 · the big one: The Forge (12 MB) from Your apps, only timing what a person waits for
    if (await page.$('#lxCancel')) { await page.click('#lxCancel'); await page.waitForTimeout(300); }
    const fb = await page.$('[data-lib-read="forge"]');
    if (fb) { await fb.click(); w = await waitPick(page, 300000); R.notes.push('Forge preparation: ' + JSON.stringify({ end: w.s, ms: w.ms, steps: w.seen }));
      const prepF = await page.evaluate(() => LX_PICK && LX_PICK.P ? { kind: LX_PICK.P.kind, title: LX_PICK.P.title, sections: LX_PICK.P.sections.length, counts: LX_PICK.counts } : (LX_PICK ? { state: LX_PICK.state, err: LX_PICK.err } : null));
      await page.evaluate(() => { const c = document.getElementById('lxChoose'); if (c) c.scrollIntoView({ block: 'start' }); });
      await snap(page, V, '11_forge_ready', { prep: prepF }); }

    // 7 · a short model step at the first size only: start reading Inkwell (overview), pause soon, see the shelf
    const hadRuns = await page.evaluate(() => lxState().runs.length);
    if (MODEL && V === VIEWS[0]) {
      if (await page.$('#lxCancel')) { await page.click('#lxCancel'); await page.waitForTimeout(300); }
      await page.click('[data-lib-read="inkwell"]'); await waitPick(page, 240000);
      await page.evaluate(() => { const s = document.getElementById('lxModel'); if (s) { const o = [...s.options].find(o => /LFM2\.5 1\.2B/.test(o.textContent)); if (o) s.value = o.value; } });
      const tb = Date.now(); await page.click('#lxBegin');
      await page.waitForTimeout(12000);
      await snap(page, V, '12_reading_started', { lx: await page.evaluate(() => ({ busy: LX.busy, step: LX.step, live: (LX.live || '').slice(-300), run: lxActive() && { status: lxActive().status, done: lxActive().done, total: lxActive().total } })) });
      await page.waitForTimeout(12000);
      const live2 = await page.evaluate(() => ({ busy: LX.busy, step: LX.step, live: (LX.live || '').slice(-400), eng: Engine.status }));
      R.notes.push('after 24 s of reading: ' + JSON.stringify(live2));
      if (await page.$('#lxPause')) await page.click('#lxPause');
      await page.waitForFunction(() => !LX.busy, null, { timeout: 90000 }).catch(() => R.notes.push('pause did not settle in 90 s'));
      R.notes.push('model step lasted ' + Math.round((Date.now() - tb) / 1000) + ' s');
      await page.waitForTimeout(800);
      await scrollLectorTo(page, 'top');
      await snap(page, V, '13_reading_paused', { lx: await page.evaluate(() => ({ busy: LX.busy, step: LX.step, run: lxActive() && { status: lxActive().status, done: lxActive().done, total: lxActive().total, err: lxActive().err } })) });
      await scrollLectorTo(page, 'bottom'); await snap(page, V, '14_document_list');
      await page.evaluate(() => { const n = document.getElementById('lxNotes'); if (n) { n.open = true; n.dispatchEvent(new Event('toggle')); } }); await page.waitForTimeout(800);
      await page.evaluate(() => { const n = document.getElementById('lxNotes'); if (n) n.scrollIntoView({ block: 'center' }); }); await snap(page, V, '15_notes_open');
      try { await fetch('http://127.0.0.1:18999/call/engine_unload', { method: 'POST', body: '[]' }); } catch (e) {}
    } else if (hadRuns) {
      await page.reload({ waitUntil: 'domcontentloaded' }).catch(() => {});
      await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await page.waitForTimeout(1500);
      await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
      await page.evaluate(() => go('lector')); await page.waitForTimeout(1200);
      await snap(page, V, '12_with_a_reading_top');
      await scrollLectorTo(page, 'bottom'); await snap(page, V, '14_document_list');
      const del = await page.$('[data-lxdel]');
      if (del) { await del.click(); await page.waitForTimeout(300); await snap(page, V, '16_delete_armed'); await del.click(); await page.waitForTimeout(800); await snap(page, V, '17_after_delete'); }
    }
    // night theme, empty-ish state, for the look
    await page.evaluate(() => { LX_PICK = null; state.theme = 'night'; applyTheme(); lxRender(); }); await scrollLectorTo(page, 'top'); await page.waitForTimeout(600);
    await snap(page, V, '18_night');
    await page.evaluate(() => { state.theme = 'day'; applyTheme(); });

    R.errors = logs.filter(l => /^\[(error|pageerror)\]/.test(l) || /uncaught|exception/i.test(l));
    R.warnings = logs.filter(l => /^\[warning\]/.test(l)).slice(0, 30);
    log('\n[' + V.tag + '] console errors:', R.errors.length ? R.errors.join('\n') : 'none');
    log('[' + V.tag + '] notes:\n ' + R.notes.join('\n '));
    await browser.close();
  }
  fs.writeFileSync(O + 'report.json', JSON.stringify(REPORT, null, 1));
  log('\nreport', O + 'report.json');
})().catch(e => { console.error('FAILED', e); try { fs.writeFileSync(O + 'report.json', JSON.stringify(REPORT, null, 1)); } catch (_) {} process.exit(1); });
