// node rig/t_753_pick_aside.js <Ingenium page url (master or full)> <out folder>
// Ingenium 7.53 (held for her preview): Fabrica's plan, stage 3, part two (modules/r342.js; the engine in r110.js: cherryPick, stashPush,
// stashList, stashApply, stashDrop; Rules before main in r285.js). The audit's recommendation 11 ("Cherry-pick, stash and submodules"),
// approved in full on 19 November 2026. Checked against git 2.43 itself, in the session: git cherry-pick -x adds "(cherry picked from
// commit <id>)" and keeps the author; git stash keeps W (the files; parents: the version out, then I) and I ("index on <idea>: ...").
// Invented app (Tide Clock) and people (Ada writes on an idea, Theo brings a version in). Pictures for the preview are kept in <out folder>.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_753_pick_aside.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; return !!c; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 300)));
  const show = async (v) => { await p.evaluate((v) => { fbHubHost.S.view = v; fbHubHost.paint(); }, v); await sleep(1600); };
  const toastText = () => p.evaluate(() => (document.querySelector('#fb .f-toast') || {}).textContent || '');
  const logOf = (id, ref, max) => p.evaluate(async (a) => (await IngRepo.log(a[0], { ref: a[1], max: a[2] || 20 })).map((c) => ({ oid: c.oid, title: c.title, msg: c.msg, parents: c.parents, author: c.author && c.author.name })), [id, ref, max]);
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(900);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); }); await sleep(2200);
    ok(await p.evaluate(() => window.__ingParts && window.__ingParts.p342 === 'running' && typeof IngRepo.cherryPick === 'function' && typeof IngRepo.stashPush === 'function'), '0. the part runs (p342), with the engine\'s cherryPick and stash in r110');
    const id = await p.evaluate(async () => {
      IngRepo.setAuthor({ name: 'Ada', email: 'ada@example.invalid' });
      const r = await IngRepo.create({ name: 'Tide Clock' });
      await IngRepo.put(r.id, 'app/tide.js', 'function next(){\n  return 6.2;\n}\nfunction half(){\n  return 3.1;\n}\nexport { next, half };\n');
      await IngRepo.put(r.id, 'README.md', '# Tide Clock\n\nHigh water, twice a day.\n');
      await IngRepo.commit(r.id, 'The first version');
      await IngRepo.branch(r.id, 'evening'); await IngRepo.switchTo(r.id, 'evening');
      await IngRepo.put(r.id, 'app/evening.js', 'export function evening(){\n  return 18.5;\n}\n'); await IngRepo.commit(r.id, 'Evening tides');
      await IngRepo.put(r.id, 'app/tide.js', 'function next(){\n  return 6.25;\n}\nfunction half(){\n  return 3.1;\n}\nexport { next, half };\n'); await IngRepo.commit(r.id, 'Finer figures\n\nThe next tide to the quarter hour.');
      await IngRepo.put(r.id, 'app/moon.js', 'export const moon = "waxing";\n'); await IngRepo.commit(r.id, 'Moon phases');
      await IngRepo.switchTo(r.id, 'main');
      IngRepo.setAuthor({ name: 'Theo', email: 'theo@example.invalid' });
      fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.paint(); return r.id; });
    await sleep(900);
    // ---------------------------------------------------------------- cherry-pick
    await show('ideas');
    const k1 = await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .f-idea')].map((e) => ({ on: e.classList.contains('on'), name: e.querySelector('b').firstChild.nodeValue.trim(), keys: [...e.querySelectorAll('.f-acts button')].map((x) => x.textContent) })));
    ok(k1.some((x) => x.name === 'evening' && !x.on && x.keys.indexOf('Pick its versions') >= 0) && k1.some((x) => x.name === 'main' && x.on && x.keys.indexOf('Pick its versions') < 0), '11. Ideas: an idea she is not on offers Pick its versions; the one she works on does not', k1);
    await p.evaluate(() => [...document.querySelectorAll('#fbWorkBody .f-idea')].find((e) => /^evening/.test(e.textContent)).querySelector('[data-r342="pick"]').click()); await sleep(1500);
    const s1 = await p.evaluate(() => ({ title: (document.querySelector('.f-sheet h3') || {}).textContent, rows: [...document.querySelectorAll('.f-sheet .r342-v')].map((x) => [x.querySelector('.t b').textContent, [...x.querySelectorAll('button')].map((k) => k.textContent).join('|')]) }));
    ok(s1.title === 'Pick versions of “evening”' && s1.rows.map((x) => x[0]).join('|') === 'Moon phases|Finer figures|Evening tides' && s1.rows.every((x) => x[1] === 'Bring it here'), '   a sheet of the versions main does not hold yet, newest first, each with Bring it here', s1);
    const ev = await logOf(id, 'refs/heads/evening', 5), finer = ev.find((c) => c.title === 'Finer figures');
    await p.evaluate((oid) => document.querySelector('.f-sheet .r342-v[data-oid="' + oid + '"] [data-r342="bring"]').click(), finer.oid); await sleep(2500);
    const m1 = await logOf(id, 'refs/heads/main', 3), f1 = await p.evaluate(async (id) => IngRepo.readText(id, 'app/tide.js', 'refs/heads/main'), id);
    const raw = await p.evaluate(async (a) => { const c = (await IngRepo.log(a, { ref: 'refs/heads/main', max: 1 }))[0]; return { author: c.author, committer: c.committer || null }; }, id);
    ok(m1[0].msg === 'Finer figures\n\nThe next tide to the quarter hour.\n\n(cherry picked from commit ' + finer.oid + ')\n' && m1[0].parents.length === 1 && /return 6\.25/.test(f1), '   Bring it here: a new version on main with its own words and git\'s own line, "(cherry picked from commit <id>)"', { msg: m1[0].msg, f1 });
    ok(raw.author && raw.author.name === 'Ada', '   its author is kept (Ada wrote it; Theo brought it in)', raw);
    const ev2 = await logOf(id, 'refs/heads/evening', 5);
    ok(ev2[0].oid === ev[0].oid, '   the other idea is not changed', ev2.map((c) => c.title));
    const s2 = await p.evaluate(() => { const r = document.querySelector('.f-sheet .r342-v.r342-done'); return r ? r.textContent : null; });
    ok(/Brought in as [0-9a-f]{7}/.test(s2 || ''), '   the row says Brought in, with its new version', s2);
    await p.screenshot({ path: path.join(OUT, 'pick_sheet.png') });
    await p.evaluate(() => { try { document.querySelector('.f-sheet-wrap').remove(); } catch (e) {} });
    let refused = ''; try { await p.evaluate(async (a) => IngRepo.cherryPick(a[0], a[1]), [id, finer.oid]); } catch (e) { refused = String(e.message); }
    ok(/already holds that version's change/.test(refused), '   a change the idea already holds is said so, and nothing is made', refused);
    // both versions: main changes the same line another way, then a version of evening that changes it is brought in
    await p.evaluate(async (id) => { await IngRepo.put(id, 'README.md', '# Tide Clock\n\nHigh water, twice a day, by the harbour.\n'); await IngRepo.commit(id, 'The harbour');
      await IngRepo.switchTo(id, 'evening'); IngRepo.setAuthor({ name: 'Ada', email: 'ada@example.invalid' }); await IngRepo.put(id, 'README.md', '# Tide Clock\n\nHigh water, twice a day, and the evening tide.\n'); await IngRepo.commit(id, 'The evening, said');
      IngRepo.setAuthor({ name: 'Theo', email: 'theo@example.invalid' }); await IngRepo.switchTo(id, 'main'); await fbHubHost.refresh(); fbHubHost.paint(); }, id); await sleep(800);
    const said = (await logOf(id, 'refs/heads/evening', 1))[0];
    const c1 = await p.evaluate(async (a) => IngRepo.cherryPick(a[0], a[1]), [id, said.oid]);
    const st1 = await p.evaluate(async (id) => { const i = await IngRepo.info(id); const t = await IngRepo.readText(id, 'README.md'); return { merging: i.merging, both: /<<<<<<<[\s\S]*=======[\s\S]*>>>>>>>/.test(t) }; }, id);
    ok(c1.kind === 'conflicts' && c1.conflicts.join() === 'README.md' && st1.both && st1.merging && /^The evening, said \([0-9a-f]{7}\)$/.test(st1.merging.theirs), '   a line changed both ways: both versions in the file between git\'s marks, as a merge, its name the version\'s own', { c1, st1 });
    await p.evaluate(async (id) => { await IngRepo.put(id, 'README.md', '# Tide Clock\n\nHigh water, twice a day, by the harbour and in the evening.\n'); await IngRepo.commit(id, 'The evening, said\n\n(cherry picked from commit x)'); }, id);
    const kept = await p.evaluate(async (id) => { const c = (await IngRepo.log(id, { ref: 'refs/heads/main', max: 1 }))[0]; return { author: c.author.name, parents: c.parents.length }; }, id);
    ok(kept.author === 'Ada' && kept.parents === 1, '   kept once chosen: one version, its author still the one who wrote it', kept);
    // Rules before main: main takes new versions only through a pull request
    await p.evaluate(async (id) => { const rec = await fbHub.live(id); rec.rules = Object.assign({}, rec.rules || {}, { pr: true }); await fbHub.keep(rec); }, id);
    const moon = (await logOf(id, 'refs/heads/evening', 5)).find((c) => c.title === 'Moon phases');
    let held = ''; try { await p.evaluate(async (a) => IngRepo.cherryPick(a[0], a[1]), [id, moon.oid]); } catch (e) { held = String(e.message); }
    ok(/main takes new versions only through a pull request \(Rules before main\): bring the version into an idea of its own/.test(held), '   Rules before main hold it, as they hold a version kept', held);
    await p.evaluate(async (id) => { const rec = await fbHub.live(id); rec.rules = Object.assign({}, rec.rules || {}, { pr: false }); await fbHub.keep(rec); }, id);
    // ---------------------------------------------------------------- changes put aside
    await p.evaluate(async (id) => { await IngRepo.put(id, 'README.md', '# Tide Clock\n\nHigh water, twice a day, by the harbour and in the evening.\n\nThe moon, too.\n'); await IngRepo.put(id, 'app/moon.js', 'export const moon = "full";\n'); await fbHubHost.refresh(); fbHubHost.paint(); }, id);
    await show('changes');
    const k2 = await p.evaluate(() => [...document.querySelectorAll('#fbWorkFoot .f-keep .f-row button')].map((x) => x.textContent));
    ok(k2.join('|') === 'Write it for me|Put aside|Keep this version', '   Changes: Put aside stands beside Keep this version', k2);
    await p.fill('#fbMsg', 'Halfway through the moon'); await p.evaluate(() => document.querySelector('[data-r342="aside"]').click()); await sleep(2200);
    const a1 = await p.evaluate(async (id) => { const s = await IngRepo.status(id); const l = await IngRepo.stashList(id); return { clean: s.clean, list: l.map((x) => ({ msg: x.msg, branch: x.branch, files: x.files.slice().sort() })), oid: l[0] && l[0].oid }; }, id);
    ok(a1.clean && a1.list.length === 1 && a1.list[0].msg === 'On main: Halfway through the moon' && a1.list[0].files.join() === 'README.md,app/moon.js', '   Put aside: the files go back to the last version, and what waited is kept, named by the words written for it', a1);
    const w = await p.evaluate(async (a) => { const c = (await IngRepo.log(a[0], { ref: a[1], max: 1 }))[0]; const i = (await IngRepo.log(a[0], { ref: c.parents[1], max: 1 }))[0]; const head = (await IngRepo.log(a[0], { ref: 'refs/heads/main', max: 1 }))[0];
      return { parents: c.parents.length, first: c.parents[0] === head.oid, imsg: i.msg, ip: i.parents[0] === head.oid, head: head.short, title: head.title }; }, [id, a1.oid]);
    ok(w.parents === 2 && w.first && w.ip && w.imsg === 'index on main: ' + w.head + ' ' + w.title + '\n', '   in git\'s own shape: its parents the version out and one for the staged files ("index on main: ...")', w);
    const l1 = await p.evaluate(() => { const b = document.getElementById('r342Aside'); return b ? { head: b.querySelector('.h-big').textContent, rows: [...b.querySelectorAll('.r342-row')].map((x) => [x.querySelector('.t b').textContent, x.querySelector('.t small').textContent, [...x.querySelectorAll('button')].map((k) => k.textContent).join('|')]) } : null; });
    ok(l1 && l1.head === 'Put aside' && l1.rows.length === 1 && l1.rows[0][0] === 'Halfway through the moon' && /^on main · 2 files · /.test(l1.rows[0][1]) && l1.rows[0][2] === 'Drop|Bring back', '   Put aside lists it: its words, its idea, how many files and when, with Drop and Bring back', l1);
    await p.screenshot({ path: path.join(OUT, 'put_aside.png') });
    await p.evaluate(() => document.querySelector('#r342Aside [data-r342="back"]').click()); await sleep(2200);
    const a2 = await p.evaluate(async (id) => { const s = await IngRepo.status(id); return { changes: s.changes.map((c) => c.path).sort(), left: (await IngRepo.stashList(id)).length, moon: await IngRepo.readText(id, 'app/moon.js') }; }, id);
    ok(a2.changes.join() === 'README.md,app/moon.js' && a2.left === 0 && /full/.test(a2.moon), '   Bring back: the changes are on the files again, and out of the list', a2);
    // put aside with no words; the same line changed and kept meanwhile; brought back: both versions, kept in the list
    await p.evaluate(async (id) => { await IngRepo.stashPush(id, ''); await IngRepo.put(id, 'app/moon.js', 'export const moon = "new";\n'); await IngRepo.commit(id, 'A new moon'); await fbHubHost.refresh(); fbHubHost.paint(); }, id);
    const a3 = await p.evaluate(async (id) => { const l = await IngRepo.stashList(id); const r = await IngRepo.stashApply(id, 0, { drop: true }); const t = await IngRepo.readText(id, 'app/moon.js'); return { msg: l[0].msg, r, both: /<<<<<<<[\s\S]*>>>>>>>/.test(t), left: (await IngRepo.stashList(id)).length }; }, id);
    ok(/^WIP on main: [0-9a-f]{7} The evening, said$/.test(a3.msg), '   with no words written, git\'s own: "WIP on main: <short id> <title>"', a3.msg);
    ok(a3.r.kind === 'conflicts' && a3.r.conflicts.join() === 'app/moon.js' && a3.both && a3.left === 1, '   a line changed meanwhile: both versions in the file, and it stays in the list, as git keeps it', a3);
    await p.evaluate(async (id) => { await IngRepo.put(id, 'app/moon.js', 'export const moon = "full";\n'); await IngRepo.commit(id, 'The moon, chosen'); await fbHubHost.refresh(); fbHubHost.paint(); }, id);
    await show('changes');
    await p.evaluate(() => { window.ingAsk = () => Promise.resolve(true); document.querySelector('#r342Aside [data-r342="drop"]').click(); }); await sleep(1800);
    const a4 = await p.evaluate(async (id) => ({ left: (await IngRepo.stashList(id)).length, box: !!document.getElementById('r342Aside') }), id);
    ok(a4.left === 0 && !a4.box, '   Drop (asked first) takes it out of the list', a4);
    // raised: a row lifts under the pointer
    await p.evaluate(async (id) => { await IngRepo.put(id, 'README.md', '# Tide Clock\n'); await IngRepo.stashPush(id, 'A short README'); await fbHubHost.refresh(); fbHubHost.paint(); }, id); await show('changes');
    await p.hover('#r342Aside .r342-row'); await sleep(400); const tf = await p.evaluate(() => getComputedStyle(document.querySelector('#r342Aside .r342-row')).transform);
    ok(/matrix\(1, 0, 0, 1, 0, -2\)/.test(tf), '   each row is raised: it lifts 2px under the pointer', tf);
    // the dates of a version brought in: its author's own time
    const tm = await p.evaluate(async (id) => { const m = await IngRepo.log(id, { ref: 'refs/heads/main', max: 20 }), e = await IngRepo.log(id, { ref: 'refs/heads/evening', max: 20 });
      const picked = m.find((x) => /cherry picked/.test(x.msg) && x.title === 'Finer figures'), orig = e.find((x) => x.title === 'Finer figures'); return { picked: picked && picked.author.when, orig: orig && orig.author.when }; }, id);
    ok(tm.picked && tm.picked === tm.orig, '   its author\'s own time is kept too (git keeps the author\'s date)', tm);
    await p.setViewportSize({ width: 390, height: 844 }); await sleep(1000);
    const ph = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, w: innerWidth }));
    ok(ph.sw <= ph.w + 1, '   on a phone nothing scrolls sideways', ph);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 900)); }
  ok(errs.length === 0, 'no page error', errs.slice(0, 6));
  console.log(`\n${pass} passed, ${fail} failed`); await b.close(); process.exit(fail ? 1 : 0);
})();
