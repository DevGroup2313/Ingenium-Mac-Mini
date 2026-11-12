// Fabrica as it really is (6.85), filled with invented repositories, taken out of the running page for its phase 2 preview:
// each room's markup, the three panels, and every style rule and keyframe that draws #fb, by day (the night rules come with them).
//   node capture_fabrica.js <page url> <out folder> <logos.json>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, LOGOS] = process.argv.slice(2);
const L = JSON.parse(fs.readFileSync(LOGOS, 'utf8'));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  const ids = await p.evaluate(async (L) => {
    const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.theme = 'day'; applyTheme();
    const enc = s => new TextEncoder().encode(s);
    const page = (title, logo) => '<!doctype html><html><head><meta charset="utf-8"><link rel="icon" type="image/png" sizes="256x256" href="data:image/png;base64,' + logo + '"><title>' + title + '</title></head><body><h1>' + title + '</h1></body></html>';
    IngRepo.setAuthor({ name: 'Ada', email: '' });
    const a = await IngRepo.fromFiles([
      { path: 'index.html', data: enc(page('Quill Notes', L.quill)) },
      { path: 'README.md', data: enc('# Quill Notes\n\nA notebook for students, offline. Open `index.html` in any browser, or install it with Fabrica\'s kits for the Mac, Windows, the iPhone and the Fire tablet.\n\n- Works with no connection\n- Your notes stay on your device\n- Night mode follows the system\n') },
      { path: 'app/reader.js', data: enc('function theme(){\n  return state.theme||"day";\n}\n') },
      { path: 'app/export.js', data: enc('function exportPdf(doc){\n  return pdf(doc,{fonts:false});\n}\n') },
      { path: 'docs/guide.md', data: enc('# The guide\n\nWrite, keep, find.\n') },
      { path: '.github/workflows/build.yml', data: enc('name: Build for Mac and Windows\non: [push]\njobs:\n  mac:\n    runs-on: macos-14\n    steps:\n      - uses: actions/checkout@v4\n      - run: python3 build.py --mac\n') }], { name: 'quill-notes', desc: 'A notebook for students, offline' });
    await IngRepo.put(a.id, 'app/export.js', enc('function exportPdf(doc){\n  return pdf(doc,{fonts:true});\n}\n')); await IngRepo.commit(a.id, 'The export keeps its fonts');
    await IngRepo.put(a.id, 'docs/guide.fr.md', enc('# Le guide\n\nÉcrire, garder, retrouver.\n')); await IngRepo.commit(a.id, 'French for the guide');
    await IngRepo.tag(a.id, 'v3.2');
    await IngRepo.put(a.id, 'app/print.js', enc('function print(doc){ return colour(doc); }\n')); await IngRepo.commit(a.id, 'Print in colour');
    await IngRepo.branch(a.id, 'night-reader'); await IngRepo.switchTo(a.id, 'night-reader');
    await IngRepo.put(a.id, 'app/reader.js', enc('function theme(){\n  if(state.theme)return state.theme;\n  return matchMedia("(prefers-color-scheme: dark)").matches?"night":"day";\n}\n')); await IngRepo.commit(a.id, "Night mode reads the system's choice first");
    await IngRepo.switchTo(a.id, 'main');
    const g = await IngRepo.fromFiles([{ path: 'index.html', data: enc(page('Harbour Garden', L.leaf)) }, { path: 'README.md', data: enc('# Harbour Garden\n\nA garden planner for a boat\'s deck.\n') }], { name: 'harbour-garden', desc: 'A garden planner for a boat\'s deck' });
    const l = await IngRepo.fromFiles([{ path: 'index.html', data: enc(page('Ledger', L.ledger)) }, { path: 'README.md', data: enc('# Ledger\n\nHousehold accounts, kept private.\n') }], { name: 'ledger', desc: 'Household accounts, kept private' });
    const now = Date.now(), you = 'Ada';
    const it = (n, kind, title, body, labels, extra) => Object.assign({ n, kind, title, body, state: 'open', labels, created: now - n * 86400000, updated: now - n * 3600000, by: you, comments: [], events: [], refs: [] }, extra || {});
    await fbHub.importAll({ kind: 'ingenium-hub', apps: [{ id: a.id, next: 10, about: { desc: 'A notebook for students, offline', site: '', topics: ['notes', 'offline', 'students'] },
      issues: [it(1, 'issue', 'The export loses the last page in PDF', 'Exporting a long note to PDF drops its last page.', ['bug']),
               it(2, 'issue', 'A tablet layout with two columns', 'On the Fire tablet, the notes and the reader side by side.', ['enhancement']),
               it(3, 'issue', "Night mode flashes on start", 'The page opens white, then turns dark.', ['bug'], { comments: [{ by: 'Ada', at: now - 7200000, body: 'Seen on the Mac mini too.' }] })],
      pulls: [it(4, 'pr', 'Night mode for the reader', "The reader follows the system's night mode, and keeps your own choice once you make one.", ['enhancement'], { from: 'night-reader', to: 'main' })] }] });
    try { saveState(); } catch (e) {}
    go('fabrica'); return { a: a.id, g: g.id, l: l.id };
  }, L);
  await p.waitForTimeout(3000);
  // open quill-notes
  await p.evaluate(() => { const r = [...document.querySelectorAll('#fb .f-repo')].find(x => /quill-notes/.test(x.textContent)); if (r) r.click(); }); await p.waitForTimeout(2200);
  const click = (txt, scope) => p.evaluate(({ txt, scope }) => { const root = scope === 'mid' ? document.querySelectorAll('#fb .f-panels > .f-pn')[1] : scope === 'right' ? document.querySelectorAll('#fb .f-panels > .f-pn')[2] : document.getElementById('fb');
    const bs = [...root.querySelectorAll('button')].filter(x => x.offsetParent); const t = x => x.textContent.replace(/\s+/g, ' ').trim(); const rx = new RegExp('^' + txt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![A-Za-z])'); const k = bs.find(x => t(x) === txt) || bs.find(x => rx.test(t(x))); if (k) { k.click(); return true; } return false; }, { txt, scope });
  const grab = (which) => p.evaluate((which) => { const pn = document.querySelectorAll('#fb .f-panels > .f-pn')[which]; return pn ? pn.innerHTML : null; }, which);
  const views = {}; const notes = [];
  const shot = async (key, room, sub) => { if (room) { notes.push(room + ':' + (await click(room, 'mid'))); await p.waitForTimeout(900); } if (sub) { notes.push(sub + ':' + (await click(sub, 'mid'))); await p.waitForTimeout(1400); }
    views[key] = await grab(1); await p.screenshot({ path: path.join(OUT, 'v_' + key + '.png') }); };
  await shot('now-changes', 'Now', 'Changes'); await shot('now-files', null, 'Files'); await shot('now-code', null, 'Code');
  await shot('story-history', 'Story', 'History'); await shot('story-compare', null, 'Compare'); await shot('story-releases', null, 'Releases');
  await shot('plans-ideas', 'Plans', 'Ideas'); await shot('plans-issues', null, 'Issues'); await shot('plans-pulls', null, 'Pull requests');
  // the pull request, opened
  notes.push('pr:' + await p.evaluate(() => { const pn = document.querySelectorAll('#fb .f-panels > .f-pn')[1]; const k = [...pn.querySelectorAll('button,a,[role=button]')].find(x => /Night mode for the reader/.test(x.textContent)); if (k) { k.click(); return true; } return false; }));
  await p.waitForTimeout(1600); views['plans-pr'] = await grab(1); await p.screenshot({ path: path.join(OUT, 'v_plans-pr.png') });
  await shot('plans-projects', 'Plans', 'Projects');
  await shot('plans-wiki', 'Plans', 'Wiki'); await shot('care-checks', 'Care', 'Checks'); await shot('care-overview', null, 'Overview'); await shot('care-settings', null, 'Settings');
  const right = {}; for (const t of ['Test', 'Ship', 'Copies']) { notes.push('r' + t + ':' + (await click(t, 'right'))); await p.waitForTimeout(900); right[t] = await grab(2); }
  await click('Test', 'right'); await p.waitForTimeout(500);
  await click('Now', 'mid'); await p.waitForTimeout(500); await click('Changes', 'mid'); await p.waitForTimeout(800);
  const left = await grab(0);
  const skeleton = await p.evaluate(() => { const fb = document.getElementById('fb'); const c = fb.cloneNode(true); c.querySelectorAll('.f-panels > .f-pn').forEach((x, i) => { x.setAttribute('data-pn', String(i)); x.innerHTML = ''; }); return { html: c.outerHTML, cls: fb.className, attrs: [...fb.attributes].map(a => [a.name, a.value]) }; });
  // the style rules that draw Fabrica, with the page's own words for its tokens and keyframes
  const css = await p.evaluate(() => { const rules = [], frames = {}, toks = [];
    function walk(list, wrap) { for (const r of list) {
        if (r.type === CSSRule.KEYFRAMES_RULE) { frames[r.name] = r.cssText; continue; }
        if (r.type === CSSRule.MEDIA_RULE || r.type === CSSRule.SUPPORTS_RULE) { const t = r.cssText; walk(r.cssRules, wrap.concat([t.slice(0, t.indexOf('{')).trim()])); continue; }
        if (r.type === CSSRule.STYLE_RULE) { const s = r.selectorText || '';
          if (/#fb|\.ing-crest|\.ing-logo|#ingList|\.r172|\.ing-menu/.test(s)) { let t = r.cssText; for (let i = wrap.length - 1; i >= 0; i--) t = wrap[i] + '{' + t + '}'; rules.push(t); }
          else if (/^(:root|html|body)(\[data-theme="night"\])?$/.test(s.trim())) { const d = [...r.style].filter(n => n.startsWith('--')).map(n => n + ':' + r.style.getPropertyValue(n)).join(';'); if (d) toks.push((s.trim()) + '{' + d + '}'); } } } }
    for (const sh of document.styleSheets) { try { walk(sh.cssRules, []); } catch (e) {} }
    return { rules, frames, toks }; });
  const used = new Set(); css.rules.forEach(t => { const m = t.match(/animation(-name)?\s*:\s*([^;}]+)/g); (m || []).forEach(x => x.split(':')[1].split(/[ ,]+/).forEach(w => used.add(w.trim()))); });
  const frames = Object.keys(css.frames).filter(n => used.has(n)).map(n => css.frames[n]);
  fs.writeFileSync(path.join(OUT, 'parts.json'), JSON.stringify({ ids, views, right, left, skeleton, rules: css.rules, frames, toks: css.toks }));
  console.log('views', Object.keys(views).map(k => k + ':' + (views[k] || '').length).join(' '));
  console.log('right', Object.keys(right).map(k => k + ':' + (right[k] || '').length).join(' '), 'left', left.length, 'rules', css.rules.length, 'frames', frames.length, 'toks', css.toks.length);
  console.log('notes', notes.join(' '), 'errors', JSON.stringify(errs));
  await b.close(); })().catch(e => { console.error(e); process.exit(2); });
