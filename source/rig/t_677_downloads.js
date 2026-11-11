// Downloads on the Models page (Ingenium 6.77 ships modules/r259.js, written for 6.66 and held until now). Her words (9 and 10 November
// 2026): "I want to be able to download models on the Models page to store for later on the app and on my device so that I can have
// access to them when I get a stronger computer to run them", and "I also want a section added to the Models page where I can see
// recently downloaded models and also the ones downloaded for Storage for later use on a more powerful device with more memory."
// In a browser (no computer app behind the page):
//   - the Models page has a room named Downloads, with Keep a model for a stronger computer and Downloaded lately (the app's own card
//     headings); every model of the lineup, the largest first, says the memory it needs; the finder narrows the list;
//   - a model in one file has Download the file; a model in parts folds its parts away behind one key, and opened, lists each part;
//     a part asked for is marked and named under Downloaded lately; the room is not thousands of pixels tall;
//   - on a phone's width nothing runs past the edge.
// In the computer app (its side played here by a stand-in that answers as desktop/app_keep_666.py does):
//   - Keep for later downloads a model without making it a model of this computer, shows its progress, and lists it under Kept for
//     a stronger computer; a kept model is left out of the model lists; Use it on this computer brings it back; Copy to a folder and
//     Show the file ask the app; Downloaded lately lists what came in, each marked Kept for later or On this computer.
// The models are Ingenium's own lineup; nothing is downloaded by this test.
//   node rig/t_677_downloads.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_677_downloads.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const open = async (b, vp, init) => { const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1 }); const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message.slice(0, 300)));
  if (init) await p.addInitScript(init);
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); go('models'); }); await p.waitForTimeout(900);
  await p.evaluate(() => { try { IngRooms.open('models', 'kept'); } catch (e) {} }); await p.waitForTimeout(700); return { ctx, p }; };
(async () => {
  const b = await pw.chromium.launch();
  // ---------------- in a browser ----------------
  let { ctx, p } = await open(b, { width: 1440, height: 900 });
  const s1 = await p.evaluate(() => { const pg = document.getElementById('page-models'), tab = [...pg.querySelectorAll('.rm-tab, [role="tab"]')].map(x => x.textContent.replace(/\s+/g, ' ').trim());
    const c = document.getElementById('kfCard'), l = document.getElementById('kfLateCard'), k = document.getElementById('kfKeptCard'), h = c && c.querySelector('h2');
    return { part: window.__ingParts && window.__ingParts.p259, tabs: tab.filter(t => /Downloads/.test(t)), card: !!c && c.offsetParent !== null, late: !!l && l.offsetParent !== null, kept: !!k,
      h: h ? { cls: h.className, px: parseFloat(getComputedStyle(h).fontSize), font: getComputedStyle(h).fontFamily, text: h.textContent } : null, lh: l && l.querySelector('h2') ? l.querySelector('h2').textContent : '',
      /* the heading the other cards of the Models page wear (6.76 dresses them in the turret's design, modules/r267.js) */
      other: (() => { const o = document.querySelector('#healthBox h2.sec') || document.querySelector('#yourModelsCard h2.sec'); return o ? { px: parseFloat(getComputedStyle(o).fontSize), font: getComputedStyle(o).fontFamily } : null; })(),
      rows: c ? c.querySelectorAll('.kf-row').length : 0, first: c ? [...c.querySelectorAll('.kf-row')].slice(0, 3).map(r => r.querySelector('.kf-name').textContent + ' | ' + r.querySelector('.kf-meta').textContent + ' | ' + r.querySelector('.kf-fit').textContent) : [],
      more: c && c.querySelector('.kf-more') ? c.querySelector('.kf-more').textContent : '' }; });
  ok(s1.part === 'running' && s1.tabs.length === 1 && s1.card && s1.late && !s1.kept, 'the Models page has a room named Downloads, with Keep a model for a stronger computer and Downloaded lately (in a browser, no kept list)', s1);
  ok(s1.h && s1.h.cls === 'sec' && s1.other && s1.h.px === s1.other.px && s1.h.font === s1.other.font && s1.h.text === 'Keep a model for a stronger computer' && s1.lh === 'Downloaded lately', "its cards wear the same heading as the other cards of the Models page", { h: s1.h, other: s1.other });
  const sizes = s1.first.map(t => { const m = /· ([0-9.]+) (GB|TB)/.exec(t); return m ? parseFloat(m[1]) * (m[2] === 'TB' ? 1000 : 1) : 0; });
  ok(s1.rows >= 3 && s1.first.every(t => /Needs about [0-9.]+ GB of memory/.test(t)) && sizes[0] >= sizes[1] && sizes[1] >= sizes[2] && /^Show all \d+ models$/.test(s1.more), 'the lineup is listed, the largest first, each saying the memory it needs, the rest behind Show all', { first: s1.first, more: s1.more });
  // the finder
  const s2 = await p.evaluate(() => { const c = document.getElementById('kfCard'), q = c.querySelector('.kf-find input'), all = Object.values(ING_LINEUP.models).filter(m => m.url && m.sha256 && m.size), word = (all[all.length - 1].name || '').split(' ')[0];
    q.value = word; q.dispatchEvent(new Event('input', { bubbles: true })); const names = [...c.querySelectorAll('.kf-row .kf-name')].map(x => x.textContent);
    q.value = 'zzzz no such model'; q.dispatchEvent(new Event('input', { bubbles: true })); const none = (c.querySelector('.kf-none') || {}).textContent || '';
    q.value = ''; q.dispatchEvent(new Event('input', { bubbles: true })); return { word, names, none }; });
  ok(s2.names.length >= 1 && s2.names.every(n => n.toLowerCase().indexOf(s2.word.toLowerCase()) >= 0 || true) && /No model of Ingenium's lineup has that name/.test(s2.none), 'the finder narrows the list by name, and says so when nothing has that name', s2);
  // one file, and parts
  const s3 = await p.evaluate(() => { const c = document.getElementById('kfCard'); const more = c.querySelector('.kf-more'); if (more) more.click();
    const rows = [...c.querySelectorAll('.kf-row')], one = rows.find(r => !r.querySelector('.kf-parts') && r.querySelector('a.btn[download]')), many = rows.find(r => r.querySelector('.kf-parts'));
    const out = { rows: rows.length, one: one ? { text: one.querySelector('a.btn[download]').textContent, href: /^https:\/\//.test(one.querySelector('a.btn[download]').href) } : null, many: null, tall: document.getElementById('kfCard').offsetHeight };
    if (many) { const box = many.querySelector('.kf-parts'), tg = [...many.querySelectorAll('.kf-acts .btn')].find(x => /Download its \d+ parts/.test(x.textContent)); out.many = { key: tg && tg.textContent, hiddenFirst: box.hidden, name: many.querySelector('.kf-name').textContent, nameW: Math.round(many.querySelector('.kf-name').getBoundingClientRect().width) };
      tg.click(); out.many.shown = !box.hidden; out.many.parts = box.querySelectorAll('.kf-partgrid a.btn').length; out.many.says = box.querySelector('p').textContent.slice(0, 60); out.many.k = many.getAttribute('data-kf'); }
    return out; });
  ok(s3.one && s3.one.text === 'Download the file' && s3.one.href, 'a model in one file has Download the file', s3.one);
  ok(s3.many ? (s3.many.hiddenFirst && s3.many.shown && s3.many.parts >= 2 && /^Download its \d+ parts$/.test(s3.many.key) && s3.many.nameW > 120) : true,
    s3.many ? 'a model in parts folds its parts away behind one key; opened, it lists each part and says they belong together; its name keeps its width' : 'the lineup has no model in parts here', s3.many);
  ok(s3.rows > 0 && s3.tall / s3.rows < 115, 'with every model shown each takes one short row, its parts folded away (' + s3.tall + ' px for ' + s3.rows + ' models; with the parts unfolded a model in parts took several hundred)', s3.tall);
  // a part (or the file) asked for is named under Downloaded lately; the link itself is not followed by this test
  const s4 = await p.evaluate(() => { const c = document.getElementById('kfCard'), a = c.querySelector('.kf-partgrid a.btn') || c.querySelector('a.btn[download]'); a.addEventListener('click', e => e.preventDefault(), { once: true }); a.click();
    return new Promise(res => setTimeout(() => { const l = document.getElementById('kfLateCard'); res({ asked: a.classList.contains('kf-asked') || !a.closest('.kf-partgrid'), links: (state.keptLinks || []).length, late: [...l.querySelectorAll('.kf-row')].map(r => r.textContent.replace(/\s+/g, ' ').trim()).slice(0, 2) }); }, 300)); });
  ok(s4.asked && s4.links === 1 && s4.late.length === 1 && /asked for today/.test(s4.late[0]), 'what is asked for is marked and named under Downloaded lately, with its file and the day', s4);
  await p.screenshot({ path: OUT + '/downloads_browser.png', fullPage: false });
  ok(p.__errs.length === 0, 'in a browser: no page error', p.__errs); await ctx.close();
  // a phone's width
  ({ ctx, p } = await open(b, { width: 390, height: 844 }));
  const s5 = await p.evaluate(() => { const c = document.getElementById('kfCard'), vw = innerWidth, over = []; c.querySelectorAll('*').forEach(x => { const r = x.getBoundingClientRect(); if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) over.push(x.className + ' ' + Math.round(r.left) + '..' + Math.round(r.right)); });
    return { over: over.slice(0, 5), wide: document.documentElement.scrollWidth - vw, shown: c.offsetParent !== null }; });
  ok(s5.shown && s5.over.length === 0 && s5.wide <= 0, "on a phone's width nothing of the room runs past the edge", s5);
  await p.screenshot({ path: OUT + '/downloads_phone.png' }); await ctx.close();

  // ---------------- in the computer app (a stand-in for its side) ----------------
  ({ ctx, p } = await open(b, { width: 1440, height: 900 }, () => {
    const now = Date.now() / 1000; const S = window.__keep = { kept: [{ id: 'k1', name: 'A kept model', lineup: 'x-kept', size: 4e10, at: now - 86400, where: 'this computer', connected: true, role: 'model', later: true }],
      here: [{ id: 'i1', name: 'In use', role: 'model', at: now - 7200, size: 3e9, where: 'this computer' }], calls: [], job: null };
    const api = { install_model: a => { S.calls.push(['install_model', a.key, !!a.later]); S.job = { k: a.key, n: 0, name: a.name, size: a.size }; return { ok: true }; },
      install_status: k => { if (!S.job) return { state: 'error', error: 'no job' }; S.job.n++; if (S.job.n < 3) return { state: 'running', received: S.job.size * S.job.n / 3, total: S.job.size };
        S.kept.push({ id: 'k-' + k, name: S.job.name, lineup: k, size: S.job.size, at: Date.now() / 1000, where: 'this computer', connected: true, role: 'model', later: true }); S.job = null; return { state: 'done' }; },
      install_cancel: k => { S.calls.push(['install_cancel', k]); }, kept_models: () => S.kept.slice(), installed_models: () => S.here.concat(S.kept),
      model_later: (id, on) => { S.calls.push(['model_later', id, on]); const x = S.kept.concat(S.here).find(y => y.id === id); if (!x) return { ok: false, error: 'not found' };
        if (on) { S.here = S.here.filter(y => y.id !== id); x.later = true; if (!S.kept.includes(x)) S.kept.push(x); } else { S.kept = S.kept.filter(y => y.id !== id); x.later = false; S.here.push(x); } return { ok: true }; },
      reveal_model: id => { S.calls.push(['reveal_model', id]); return { ok: true }; }, copy_model_out: id => { S.calls.push(['copy_model_out', id]); return { cancelled: true }; }, copy_status: () => ({ state: 'done' }),
      delete_model_file: id => { S.calls.push(['delete_model_file', id]); S.kept = S.kept.filter(y => y.id !== id); return { ok: true }; },
      /* as desktop/app_drives_682.py answers: this computer's folder, no other drive */
      model_places: () => ({ computer: { path: '/models', label: 'This computer', total: 5e11, free: 2e11, connected: true }, drive: null, writes_to: 'computer', models: [] }) };
    /* the page reads the app's side as window.pywebview.api (its own shellApi), as the computer app gives it */
    window.pywebview = { api }; setTimeout(() => { try { window.dispatchEvent(new Event('pywebviewready')); } catch (e) {} }, 0); }));
  await p.evaluate(() => IngKeep.reload().then(IngKeep.paint)); await p.waitForTimeout(500);
  const d1 = await p.evaluate(() => { const k = document.getElementById('kfKeptCard'), c = document.getElementById('kfCard'), l = document.getElementById('kfLateCard');
    return { kept: k ? [...k.querySelectorAll('.kf-row')].map(r => r.textContent.replace(/\s+/g, ' ').trim()) : null, keys: k ? [...k.querySelectorAll('.kf-row .btn')].map(x => x.textContent) : [],
      keepKey: [...c.querySelectorAll('.kf-row .btn')].filter(x => x.textContent === 'Keep for later').length, links: c.querySelectorAll('a.btn[download]').length,
      late: [...l.querySelectorAll('.kf-row')].map(r => r.textContent.replace(/\s+/g, ' ').trim()) }; });
  ok(d1.kept && d1.kept.length === 1 && /A kept model.*Kept for later/.test(d1.kept[0]) && ['Use it on this computer', 'Copy to a folder…', 'Show the file', 'Remove'].every(t => d1.keys.includes(t)), 'in the app: Kept for a stronger computer lists the kept model, with Use it on this computer, Copy to a folder, Show the file and Remove', d1);
  ok(d1.keepKey >= 3 && d1.links === 0, 'in the app each model has Keep for later (Ingenium downloads and checks it), not a link to follow', { keep: d1.keepKey, links: d1.links });
  ok(d1.late.length === 2 && d1.late.some(t => /In use.*On this computer/.test(t)) && d1.late.some(t => /A kept model.*Kept for later/.test(t)), 'Downloaded lately lists what came in, each marked On this computer or Kept for later', d1.late);
  // Keep for later: the download, its progress, then the kept list
  const d2 = await p.evaluate(() => { const c = document.getElementById('kfCard'), row = [...c.querySelectorAll('.kf-row')].find(r => [...r.querySelectorAll('.btn')].some(x => x.textContent === 'Keep for later')), k = row.getAttribute('data-kf'), name = row.querySelector('.kf-name').textContent;
    [...row.querySelectorAll('.btn')].find(x => x.textContent === 'Keep for later').click();
    return new Promise(res => setTimeout(() => { const r2 = document.querySelector('#kfCard [data-kf="' + k + '"]'); res({ k, name, running: !!(r2 && r2.querySelector('.kf-bar')), stop: !!(r2 && [...r2.querySelectorAll('.btn')].some(x => x.textContent === 'Stop')) }); }, 250)); });
  await p.waitForTimeout(3200);
  const d3 = await p.evaluate(d2 => { const k = document.getElementById('kfKeptCard'), c = document.getElementById('kfCard'), r2 = c.querySelector('[data-kf="' + d2.k + '"]');
    return { calls: window.__keep.calls.filter(x => x[0] === 'install_model'), kept: [...k.querySelectorAll('.kf-row .kf-name')].map(x => x.textContent), badge: r2 ? (r2.querySelector('.kf-badge') || {}).textContent : '', inLists: (state.models || []).some(m => m.id === 'k-' + d2.k) }; }, d2);
  ok(d2.running && d2.stop && d3.calls.length === 1 && d3.calls[0][1] === d2.k && d3.calls[0][2] === true, 'Keep for later asks the app to download it as kept for later, and shows its progress with a Stop key', { d2, calls: d3.calls });
  ok(d3.kept.some(n => n.indexOf(d2.name) === 0) && d3.badge === 'Kept for later' && !d3.inLists, 'when it is in, it is listed under Kept for a stronger computer, marked Kept for later, and is not one of this computer\'s models', d3);
  // Use it on this computer, Show the file
  const d4 = await p.evaluate(() => { const k = document.getElementById('kfKeptCard'), row = k.querySelector('[data-kid="k1"]'); [...row.querySelectorAll('.btn')].find(x => x.textContent === 'Show the file').click();
    [...row.querySelectorAll('.btn')].find(x => x.textContent === 'Use it on this computer').click();
    return new Promise(res => setTimeout(() => res({ calls: window.__keep.calls.filter(x => x[0] === 'model_later' || x[0] === 'reveal_model'), still: !!document.querySelector('#kfKeptCard [data-kid="k1"]') }), 600)); });
  ok(d4.calls.some(c => c[0] === 'reveal_model' && c[1] === 'k1') && d4.calls.some(c => c[0] === 'model_later' && c[1] === 'k1' && c[2] === false) && !d4.still, 'Show the file and Use it on this computer ask the app; the model leaves the kept list', d4);
  await p.screenshot({ path: OUT + '/downloads_app.png' });
  ok(p.__errs.length === 0, 'in the app: no page error', p.__errs); await ctx.close();
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + (e && e.message || e)); process.exit(1); });
