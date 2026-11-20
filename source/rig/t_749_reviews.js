// node rig/t_749_reviews.js <Ingenium page url (master or full)> <out folder>
// Ingenium 7.49 (held for her preview): Fabrica's plan, stage 3, part one (modules/r339.js). The audit's recommendations 9 and 10, approved in
// full on 19 November 2026 ("I want them all implemented into Ingenium in the proposed order"):
//   9. requested reviewers and code owners: a pull request asks a person, or your own model, for a review; CODEOWNERS is read as GitHub reads it
//  10. suggested changes in a review: a comment proposes new lines, and one press applies them as a version
// Checked against GitHub's own documentation as read at its source (github/docs, commit 16d03dd), with an invented app (Tide Clock) and invented
// people and owners (Ada, Theo, @rain-gauge, @tide-team/keepers, docs@example.invalid). Pictures for the preview are kept in <out folder>.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_749_reviews.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; return !!c; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const boxes = {};
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 300)));
  const shot = async (name, sel, pad) => { const r = await p.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center' }); const q = e.getBoundingClientRect(); return { x: q.x, y: q.y, w: q.width, h: q.height }; }, sel); if (!r) return null; await sleep(350);
    const q = await p.evaluate((s) => { const e = document.querySelector(s); const q = e.getBoundingClientRect(); return { x: q.x, y: q.y, w: q.width, h: q.height }; }, sel); boxes[name] = q; pad = pad == null ? 28 : pad;
    const clip = { x: Math.max(0, q.x - pad), y: Math.max(0, q.y - pad), width: Math.min(1440 - Math.max(0, q.x - pad), q.w + 2 * pad), height: Math.min(950 - Math.max(0, q.y - pad), q.h + 2 * pad) };
    await p.screenshot({ path: path.join(OUT, name + '.png'), clip }); return q; };
  const filesTab = async () => { await p.evaluate(() => { const k = [...document.querySelectorAll('#fb .h-bar .f-seg button')].find((x) => /^Files changed/.test(x.textContent)); k.click(); }); await sleep(2400); };
  const convTab = async () => { await p.evaluate(() => { const k = [...document.querySelectorAll('#fb .h-bar .f-seg button')].find((x) => /^Conversation/.test(x.textContent)); k.click(); }); await sleep(1500); };
  const pills = () => p.evaluate(() => [...document.querySelectorAll('#r339Revs .r339-mk')].map((x) => [x.getAttribute('data-who'), x.getAttribute('data-s'), x.textContent.replace(/\s+/g, ' ').trim()]));
  const tl = () => p.evaluate(() => [...document.querySelectorAll('#hPrTl .h-ev')].map((x) => x.textContent));
  const pick = async (sel, label) => { await p.click(sel); await sleep(450); const items = await p.evaluate(() => [...document.querySelectorAll('.r280-pop .r172-opt')].map((o) => o.textContent)); if (label) await p.evaluate((l) => [...document.querySelectorAll('.r280-pop .r172-opt')].find((o) => o.textContent === l).click(), label); await sleep(900); return items; };
  const suggest = async (line, text, words) => {
    await p.evaluate((n) => document.querySelector('#fb .f-dl[data-side="new"][data-line="' + n + '"] .r282-lc').click(), line); await sleep(450);
    await p.click('#fb .r282-new .r339-sk'); await sleep(700); const was = await p.evaluate(() => document.querySelector('#fb .r282-new .r339-sugta').value);
    await p.fill('#fb .r282-new .r339-sugta', text); if (words != null) await p.fill('#fb .r282-new textarea:not(.r339-sugta)', words);
    await p.evaluate(() => document.querySelector('#fb .r282-new [data-x="go"]').click()); await sleep(1800); return was; };
  const thread = (line) => p.evaluate((n) => { let e = document.querySelector('#fb .f-dl[data-side="new"][data-line="' + n + '"]'); e = e && e.nextElementSibling; while (e && e.classList.contains('r282-thread') && !e.querySelector('.r339-sug')) e = e.nextElementSibling;
    if (!e || !e.querySelector('.r339-sug')) return null; const s = e.querySelector('.r339-sug'); return { id: e.getAttribute('data-c'), del: [...s.querySelectorAll('.f-dl.del')].map((x) => x.textContent), add: [...s.querySelectorAll('.f-dl.add')].map((x) => x.textContent), tag: (s.querySelector('.r339-tag') || {}).textContent, why: (s.querySelector('.r339-why') || {}).textContent || '', keys: [...s.querySelectorAll('.r282-lck button')].map((x) => x.textContent) }; }, line);
  const press = (id, k) => p.evaluate((a) => document.querySelector('#fb .r282-thread[data-c="' + a[0] + '"] .r339-sug [data-k="' + a[1] + '"]').click(), [id, k]);
  const file = (id, ref) => p.evaluate(async (a) => (await IngRepo.readText(a[0], 'app/tide.js', a[1])), [id, ref]);
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(900);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); }); await sleep(2200);
    ok(await p.evaluate(() => window.__ingParts && window.__ingParts.p339 === 'running' && !!window.IngReview), '0. the part runs (p339), with its points of connection in r282 and r285');
    const S = await p.evaluate(async () => {
      IngRepo.setAuthor({ name: 'Ada', email: 'ada@example.invalid' });
      const r = await IngRepo.create({ name: 'Tide Clock' });
      await IngRepo.put(r.id, 'app/tide.js', 'function next(){\n  return 6.2;\n}\nfunction half(){\n  return 3.1;\n}\nexport { next, half };\n');
      await IngRepo.put(r.id, 'docs/guide.md', '# Tide Clock\n\nHigh water, twice a day.\n');
      await IngRepo.put(r.id, 'README.md', '# Tide Clock\n');
      await IngRepo.put(r.id, '.github/CODEOWNERS', '# Tide Clock: who reviews what\n*        @ada\n/app/    @rain-gauge @tide-team/keepers\ndocs/*   docs@example.invalid\n!*.tmp   @nobody\n');
      await IngRepo.commit(r.id, 'The first version');
      await IngRepo.branch(r.id, 'evening-tides'); await IngRepo.switchTo(r.id, 'evening-tides');
      await IngRepo.put(r.id, 'app/tide.js', 'function next(){\n  return 6.25;\n}\nfunction half(){\n  return 3.125;\n}\nfunction evening(){\n  return 18.5;\n}\nexport { next, half, evening };\n');
      await IngRepo.put(r.id, 'docs/guide.md', '# Tide Clock\n\nHigh water, twice a day, and the evening tide.\n');
      await IngRepo.commit(r.id, 'Evening tides'); await IngRepo.switchTo(r.id, 'main');
      fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.paint();
      const pr = await fbHub.newPull(r.id, { from: 'evening-tides', to: 'main', title: 'Evening tides', body: 'The evening tide, and finer figures.' });
      return { id: r.id, n: pr.n };
    });
    await sleep(800); await p.evaluate((n) => fbHub.open('pulls', { n }), S.n); await sleep(3500);
    // ---------------------------------------------------------------- 9. reviewers and code owners
    const c1 = await p.evaluate(() => ({ chips: [...document.querySelectorAll('#fb .r282-meta .r282-mk')].map((x) => x.getAttribute('data-k')), rev: (document.getElementById('r339Rev') || {}).textContent, same: (() => { const a = document.getElementById('r339Rev'), b = document.querySelector('#fb .r282-meta .r282-mk'); return !!(a && b && a.parentNode === b.parentNode); })() }));
    ok(c1.chips.join('|') === 'people|milestone' && c1.same && /^Reviewers: /.test(c1.rev || ''), '9. a third chip, Reviewers, stands beside People and Milestone (theirs unchanged)', c1);
    const p1 = await pills();
    ok(p1.length === 3 && p1.every((x) => x[1] === 'wait') && p1.map((x) => x[0]).join('|') === '@rain-gauge|@tide-team/keepers|docs@example.invalid' && /CODEOWNERS line 3/.test(p1[0][2]) && /CODEOWNERS line 4/.test(p1[2][2]),
      '   CODEOWNERS of main is read as GitHub reads it: the owners of the changed files are asked, each with the line that named them (the last match wins: /app/ over *, docs/* over *)', p1);
    const t1 = await tl();
    ok(t1.some((t) => /^Asked @rain-gauge for a review, as line 3 of CODEOWNERS says/.test(t)) && t1.some((t) => /^Asked docs@example\.invalid for a review, as line 4 of CODEOWNERS says/.test(t)), '   the conversation says who was asked, and why', t1);
    const o1 = await p.evaluate(() => { const n = document.getElementById('r339Own'); return n ? n.textContent : null; });
    ok(/^Code owners \(\.github\/CODEOWNERS\): waiting for a review of app\/tide\.js \(@rain-gauge and @tide-team\/keepers, line 3\); docs\/guide\.md \(docs@example\.invalid, line 4\)/.test(o1 || '') && /Line 5 of \.github\/CODEOWNERS is skipped: ! \(leaving files out\) does not work/.test(o1),
      '   the merge box says who owns what, and that line 5 (a !) is skipped, as GitHub skips it; nothing is held back', o1);
    const mk1 = await p.evaluate(() => { const m = document.getElementById('hPrMerge'); return { disabled: m.disabled, title: m.title }; });
    ok(!/Code owners/.test(mk1.title) && (!mk1.disabled || /^Rules before main/.test(mk1.title)), '   the Merge key is held only by Rules before main (r285, its own note), never by code owners', mk1);
    await shot('conv_reviewers', '#r339Revs', 40);
    const lift = async (sel) => { await p.hover(sel); await sleep(400); const t = await p.evaluate((s) => getComputedStyle(document.querySelector(s)).transform, sel); await p.mouse.move(5, 5); await sleep(300); return t; };
    const h1 = await lift('#r339Rev'), h2 = await lift('#r339Revs .r339-mk');
    ok(/matrix\(1, 0, 0, 1, 0, -2\)/.test(h1) && /matrix\(1, 0, 0, 1, 0, -2\)/.test(h2), '   the chip and each pill are raised: they lift 2px under the pointer, as People and Milestone do', { h1, h2 });
    const l1 = await pick('#r339Rev', 'Someone else…');
    ok(l1.indexOf('Ada') < 0 && l1.some((x) => /^Your model/.test(x)) && l1.indexOf('Someone else…') >= 0 && l1.indexOf('No one') >= 0, '   Reviewers opens Ingenium\'s own list: the people known here (not the pull request\'s author), your model, Someone else, No one', l1);
    await p.fill('.f-sheet input', 'Theo'); await p.evaluate(() => [...document.querySelectorAll('.f-sheet button')].find((x) => x.textContent === 'Ask them for a review').click()); await sleep(1500);
    const p2 = await pills();
    ok(p2.some((x) => x[0] === 'Theo' && x[1] === 'wait'), '   Someone else asks Theo for a review', p2);
    // their reviews, as r141 keeps them
    for (const who of ['Theo', 'rain-gauge']) { await p.evaluate((w) => IngRepo.setAuthor({ name: w, email: w.toLowerCase() + '@example.invalid' }), who); await p.click('#hPrApprove'); await sleep(1400); }
    await p.evaluate(() => IngRepo.setAuthor({ name: 'Ada', email: 'ada@example.invalid' })); await sleep(300); await convTab();
    const p3 = await pills(), o3 = await p.evaluate(() => (document.getElementById('r339Own') || {}).textContent);
    ok(p3.find((x) => x[0] === 'Theo')[1] === 'approved' && p3.find((x) => x[0] === '@rain-gauge')[1] === 'approved' && p3.find((x) => x[0] === '@tide-team/keepers')[1] === 'wait', '   each pill says what they did since they were asked: Theo and @rain-gauge approved; @tide-team/keepers still waits', p3);
    ok(!/app\/tide\.js/.test(o3 || '') && /docs\/guide\.md/.test(o3 || ''), '   one approval from any owner of a file is enough: app/tide.js no longer waits; docs/guide.md does', o3);
    const mk3 = await p.evaluate(() => { const m = document.getElementById('hPrMerge'); return { disabled: m.disabled, title: m.title }; });
    ok(!mk3.disabled, '   with an approval in, the Merge key opens although docs/guide.md still waits for its code owner: code owners hold nothing back', mk3);
    const l2 = await pick('#r339Revs .r339-mk[data-who="Theo"]', 'Ask Theo again');
    const p4 = await pills(), t4 = await tl();
    ok(l2.join('|') === 'Ask Theo again|No longer ask Theo' && p4.find((x) => x[0] === 'Theo')[1] === 'wait' && t4.some((t) => /^Asked Theo again for a review/.test(t)), '   a pill asks again (Theo waits once more), as GitHub asks again after changes', { l2, p4: p4.find((x) => x[0] === 'Theo') });
    await pick('#r339Revs .r339-mk[data-who="docs@example.invalid"]', 'No longer ask docs@example.invalid'); await convTab(); await filesTab(); await convTab();
    const p5 = await pills(), t5 = await tl();
    ok(!p5.some((x) => x[0] === 'docs@example.invalid') && t5.some((t) => /^No longer waiting for a review from docs@example\.invalid/.test(t)), '   or no longer: a code owner taken away by hand is not asked again when the view is drawn again', p5);
    // your model (a stand-in that answers as Lector's model would), asked from the list
    await p.evaluate(() => { window.__planWas = IngLector.plan; IngLector.plan = () => ({ chosen: { id: 'test-model', name: 'Test model' } }); window.__lxWas = window.lxAsk;
      window.lxAsk = (o, msgs) => new Promise((res) => { window.__asked = msgs; setTimeout(() => res('1. app/tide.js, line 8: 18.5 is half past six in the evening; check it against the tide table.\n2. A test for half() would catch a wrong figure.'), 1500); }); });
    const l3 = await pick('#r339Rev', 'Your model, Test model'); const p6 = await pills();
    ok(p6.some((x) => x[0] === 'Your model' && x[1] === 'reading'), '   Your model is asked: its pill says reading… while it reads the changes', { l3, p6 });
    await shot('model_reading', '#r339Revs', 40);
    await sleep(2500); await convTab();
    const m7 = await p.evaluate(() => { const a = window.__asked || []; const u = (a[1] || {}).content || ''; const cs = [...document.querySelectorAll('#hPrTl .h-cmt')].map((x) => x.textContent); return { prompt: /THE PULL REQUEST #1: Evening tides/.test(u) && /app\/tide\.js/.test(u) && /return 18\.5/.test(u), card: cs.find((t) => /Test model/.test(t) && /18\.5 is half past six/.test(t)) || null }; });
    const p7 = await pills();
    ok(m7.prompt && /Written by your model, Test model, on this computer\. Read it before you use it\./.test(m7.card || '') && p7.find((x) => x[0] === 'Your model')[1] === 'commented',
      '   its review, written from the pull request\'s own changes, is kept in the conversation as a comment, never an approval; its pill says commented', { m7, p7 });
    await p.evaluate(() => { IngLector.plan = window.__planWas; window.lxAsk = window.__lxWas; });
    await shot('conv_pills', '#r339Revs', 40); await shot('merge_owners', '#hPrMergeBox', 24);
    await p.click('#r339Rev'); await sleep(450); await shot('reviewers_list', '.r280-pop', 24); await p.keyboard.press('Escape'); await sleep(300);
    // ---------------------------------------------------------------- 10. suggested changes
    await filesTab();
    const f0 = await p.evaluate(() => (document.querySelector('#fb .f-diff-h b') || {}).textContent);
    ok(f0 === 'app/tide.js', '10. Files changed shows app/tide.js, line by line', f0);
    const g0 = await p.evaluate(() => { const pre = document.querySelector('#fb .f-diff pre.f-dcode'); return { h: pre.clientHeight, all: pre.scrollHeight }; });
    ok(g0.all > 0 && g0.h >= g0.all - 1, '   the change panel shows the whole file\'s changes, threads and all (it no longer stops at 120 pixels); the view scrolls as a whole', g0);
    await p.evaluate(() => document.querySelector('#fb .f-dl[data-side="new"][data-line="2"] .r282-lc').click()); await sleep(450);
    const k0 = await p.evaluate(() => [...document.querySelectorAll('#fb .r282-new .r282-lck button')].map((x) => x.textContent.trim()));
    ok(k0.join('|') === 'Suggest a change|Cancel|Comment on line 2', '   a comment on a line of the pull request\'s own idea offers Suggest a change', k0);
    await p.evaluate(() => document.querySelector('#fb .r282-new [data-x="no"]').click()); await sleep(300);
    const was1 = await suggest(2, '  return 6.21;', 'A finer figure.');
    const s1 = await thread(2);
    ok(was1 === '  return 6.25;' && s1 && s1.del.join() === '2−  return 6.25;' && s1.add.join() === '2+  return 6.21;' && s1.keys.join('|') === 'Add suggestion to batch|Commit suggestion',
      '   Suggest a change starts from the line as it is; the thread shows the change as Fabrica draws changes, with Commit suggestion and Add suggestion to batch', { was1, s1 });
    await shot('suggestion', '#fb .r282-thread[data-c="' + s1.id + '"]', 30);
    const kept = await p.evaluate(async (a) => { const rec = await fbHub.record(a.id); const c = rec.pulls[0].lines.find((x) => x.line === 2); return c && c.sug ? c.sug : null; }, S);
    ok(kept && kept.text === '  return 6.21;' && kept.was === '  return 6.25;' && kept.before === 'function next(){' && kept.after === '}', '   the suggestion is kept with the comment, with the line it replaces and the lines either side', kept);
    const n0 = await p.evaluate(async (id) => (await IngRepo.log(id, { ref: 'refs/heads/evening-tides', max: 50 })).length, S.id);
    await press(s1.id, 'commit'); await sleep(600);
    const sh1 = await p.evaluate(() => ({ title: (document.querySelector('.f-sheet h3') || {}).textContent, msg: (document.querySelector('.f-sheet input') || {}).value }));
    await p.click('#r339Commit'); await sleep(3200);
    const a1 = await p.evaluate(async (id) => { const l = await IngRepo.log(id, { ref: 'refs/heads/evening-tides', max: 50 }); const st = await IngRepo.status(id); const info = await IngRepo.info(id);
      return { n: l.length, msg: l[0].msg, tip: l[0].short, branch: info.branch, clean: st.clean, main: await IngRepo.readText(id, 'app/tide.js') }; }, S.id);
    const f1 = await file(S.id, 'refs/heads/evening-tides');
    ok(sh1.title === 'Commit the suggestion' && sh1.msg === 'Apply a suggestion from the review of #1' && a1.n === n0 + 1 && f1.split('\n')[1] === '  return 6.21;' && /Suggested in the review of pull request #1 by Ada\./.test(a1.msg),
      '   Commit suggestion keeps one version on evening-tides, its message naming who suggested it', { sh1, a1: { n: a1.n, n0, msg: a1.msg } });
    ok(a1.branch === 'main' && a1.clean && a1.main.split('\n')[1] === '  return 6.2;', '   the folder\'s own files (main, open in Changes) are not touched', a1);
    await convTab(); const t8 = await tl(); await filesTab(); const s1b = await thread(2);
    ok(t8.some((t) => new RegExp('^A suggestion was kept as version ' + a1.tip + ' on evening-tides \\(app/tide\\.js\\)').test(t)) && s1b && s1b.tag === 'Committed' && new RegExp('Kept as version ' + a1.tip + ' on evening-tides by Ada').test(s1b.why) && !s1b.keys.length,
      '   the conversation says so, and the thread says Committed, with its version', { t8: t8.slice(-2), s1b });
    // a batch: two suggestions, on lines side by side, kept as one version
    await suggest(7, 'function evening(hours){', 'It takes the hours.'); await suggest(8, '  return 18.45;\n  // the evening tide, in hours', 'Finer, and said.');
    const s2 = await thread(7), s3 = await thread(8);
    await press(s2.id, 'batch'); await sleep(500); await press(s3.id, 'batch'); await sleep(900);
    const bb = await p.evaluate(() => { const b = document.getElementById('r339Batch'); return b ? { text: b.querySelector('span').textContent, go: document.getElementById('r339BatchGo').textContent } : null; });
    const s2b = await thread(7);
    ok(bb && bb.text === '2 suggestions gathered, to be kept as one version on evening-tides' && bb.go === 'Commit suggestions (2)' && s2b.tag === 'In the batch' && s2b.keys[0] === 'Take it out of the batch', '   Add suggestion to batch gathers them: Commit suggestions (2)', { bb, s2b });
    await shot('batch', '#r339Batch', 30);
    const n1 = await p.evaluate(async (id) => (await IngRepo.log(id, { ref: 'refs/heads/evening-tides', max: 50 })).length, S.id);
    await p.click('#r339BatchGo'); await sleep(600); const sh2 = await p.evaluate(() => (document.querySelector('.f-sheet input') || {}).value); await p.click('#r339Commit'); await sleep(3200);
    const f2 = await file(S.id, 'refs/heads/evening-tides'), n2 = await p.evaluate(async (id) => (await IngRepo.log(id, { ref: 'refs/heads/evening-tides', max: 50 })).length, S.id);
    ok(sh2 === 'Apply 2 suggestions from the review of #1' && n2 === n1 + 1 && f2 === 'function next(){\n  return 6.21;\n}\nfunction half(){\n  return 3.125;\n}\nfunction evening(hours){\n  return 18.45;\n  // the evening tide, in hours\n}\nexport { next, half, evening };\n',
      '   Commit suggestions keeps the batch as one version: each line checked first, then all written (one line becoming two)', { sh2, n1, n2, f2 });
    ok(await p.evaluate(() => !document.getElementById('r339Batch')), '   the batch is empty once kept');
    // out of date: the line changed on evening-tides after the suggestion
    await filesTab(); await suggest(11, 'export { next, half, evening, moon };', 'And the moon?'); const s4 = await thread(11);
    await p.evaluate(async (id) => { const t = await IngRepo.readText(id, 'app/tide.js', 'refs/heads/evening-tides'); await IngRepo.commitTo(id, 'evening-tides', [{ path: 'app/tide.js', data: t.replace('export { next, half, evening };', 'export { next, half, evening as dusk };') }], 'Dusk'); await fbHubHost.refresh(); fbHubHost.paint(); }, S.id); await sleep(1500);
    await convTab(); await filesTab();
    const s4b = await p.evaluate((id) => { const s = document.querySelector('#fb .r282-thread[data-c="' + id + '"] .r339-sug'); return s ? { tag: s.querySelector('.r339-tag').textContent, why: (s.querySelector('.r339-why') || {}).textContent, keys: s.querySelectorAll('[data-k]').length } : null; }, s4.id);
    ok(s4 && s4b && s4b.tag === 'Out of date' && /has changed since this was suggested, so it is not applied/.test(s4b.why) && s4b.keys === 0, '   a suggestion whose line has changed since is out of date, and has no key to apply it', s4b);
    await shot('outdated', '#fb .r282-thread[data-c="' + s4.id + '"] .r339-sug', 30);
    // when the pull request's own idea is the one open in Changes: only when nothing else waits there
    await p.evaluate(async (id) => { await IngRepo.switchTo(id, 'evening-tides'); await IngRepo.put(id, 'README.md', '# Tide Clock\n\nA note not kept yet.\n'); await fbHubHost.refresh(); fbHubHost.paint(); }, S.id); await sleep(1200);
    await filesTab(); await suggest(1, 'function next(at){', 'From a given hour.'); const s5 = await thread(1);
    await press(s5.id, 'commit'); await sleep(500); await p.click('#r339Commit'); await sleep(1500);
    const r5 = await p.evaluate(async (id) => ({ toast: (document.querySelector('#fb .f-toast') || {}).textContent || '', line1: (await IngRepo.readText(id, 'app/tide.js', 'refs/heads/evening-tides')).split('\n')[0], sheet: !!document.querySelector('.f-sheet') }), S.id);
    ok(/open in Changes, and some changes there are not kept yet/.test(r5.toast) && r5.line1 === 'function next(){', '   with the idea open in Changes and a change not kept there, nothing is committed, and it says why', r5);
    await p.evaluate(async (id) => { try { document.querySelector('.f-sheet-wrap').remove(); } catch (e) {} await IngRepo.discard(id); await fbHubHost.refresh(); fbHubHost.paint(); }, S.id); await sleep(1200);
    await filesTab(); const s5b = await thread(1); await press(s5b.id, 'commit'); await sleep(500); await p.click('#r339Commit'); await sleep(3200);
    const r6 = await p.evaluate(async (id) => { const st = await IngRepo.status(id); const l = await IngRepo.log(id, { ref: 'refs/heads/evening-tides', max: 2 }); return { clean: st.clean, work: (await IngRepo.readText(id, 'app/tide.js')).split('\n')[0], kept: (await IngRepo.readText(id, 'app/tide.js', 'refs/heads/evening-tides')).split('\n')[0], msg: l[0].msg }; }, S.id);
    ok(r6.clean && r6.work === 'function next(at){' && r6.kept === 'function next(at){' && /Suggested in the review of pull request #1 by Ada\./.test(r6.msg), '   once nothing waits there, it is kept through the folder as a version of its own', r6);
    // night, and a phone
    await p.evaluate(() => { try { if (typeof setTheme === 'function') setTheme('night'); else document.body.setAttribute('data-theme', 'night'); } catch (e) { document.body.setAttribute('data-theme', 'night'); } }); await sleep(900);
    await shot('suggestion_night', '#fb .r282-thread[data-c="' + s1.id + '"]', 30); await convTab(); await shot('conv_pills_night', '#r339Revs', 40); await shot('merge_owners_night', '#hPrMergeBox', 24);
    await p.evaluate(() => { try { if (typeof setTheme === 'function') setTheme('day'); else document.body.setAttribute('data-theme', 'day'); } catch (e) {} });
    await p.setViewportSize({ width: 390, height: 844 }); await sleep(1200);
    const ph = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, w: innerWidth }));
    ok(ph.sw <= ph.w + 1, '   on a phone nothing scrolls sideways', ph);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 900)); }
  ok(errs.length === 0, 'no page error', errs.slice(0, 6));
  fs.writeFileSync(path.join(OUT, 'boxes.json'), JSON.stringify(boxes, null, 1));
  console.log(`\n${pass} passed, ${fail} failed`); await b.close(); process.exit(fail ? 1 : 0);
})();
