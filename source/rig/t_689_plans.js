// node rig/t_689_plans.js <Ingenium page url (master or full)> <out folder>
// Ingenium 6.89 (12 November 2026), in Chromium: Fabrica's people and milestones, a comment on any line, templates (modules/r282.js, with
// r141's hooks and r276's mapping of what GitHub kept). Her words, on the preview of phase 2's second stage (version 4, with the pieces of
// commit 9287840): "I approve of the preview, please push it everywhere." Invented people (Ada Ferreira, Theo) and an invented app, Quill,
// kept in Ingenium. Checks:
//   a new pull request starts from the repository's pull request template; People and Milestone chips under its first line, each with
//   Ingenium's own list; Someone else gives it to Theo; A new milestone makes v3.3 with its day; the conversation and the list say so;
//   the milestone's line counts what is done;
//   in Files changed, a + key on each line: a comment on line 2, kept and shown under its line after the view is drawn again; Reply;
//   Resolve folds it, Unresolve opens it; the conversation says so; Viewed folds the file, still folded when drawn again, and open again
//   once the file changes;
//   a new issue offers the repository's issue templates: Bug report fills its title, words and label; another template asks first, in
//   Ingenium's own words, before its words take the place of what was written;
//   from GitHub (a stand-in for the records phase 1 keeps): the people of each issue, its milestone, the milestones with their days, and
//   the comments on lines with their replies;
//   on a phone nothing scrolls sideways; no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_689_plans.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await sleep(800);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); });
    await sleep(2000);
    const part = await p.evaluate(() => window.__ingParts && window.__ingParts.p282);
    ok(part === 'running', 'the part runs (p282)', part);
    const id = await p.evaluate(async () => { IngRepo.setAuthor({ name: 'Ada Ferreira', email: 'ada@example.invalid' });
      const r = await IngRepo.create({ name: 'Quill' });
      await IngRepo.put(r.id, 'README.md', '# Quill\n\nA notebook, offline.\n');
      await IngRepo.put(r.id, 'app/reader.js', 'function theme(){\n  return "day";\n}\nexport default theme;\n');
      await IngRepo.put(r.id, '.github/ISSUE_TEMPLATE/bug_report.md', '---\nname: Bug report\nabout: Something does not work\ntitle: "[Bug] "\nlabels: bug\n---\n## What happened\n\n## What you expected\n');
      await IngRepo.put(r.id, '.github/ISSUE_TEMPLATE/idea.md', '---\nname: An idea\nabout: Something new to try\nlabels: [idea, enhancement]\n---\nThe idea, in a few words:\n');
      await IngRepo.put(r.id, '.github/pull_request_template.md', '## What it changes\n\n## How it was tested\n');
      await IngRepo.commit(r.id, 'The first version');
      await IngRepo.branch(r.id, 'night-reader'); await IngRepo.switchTo(r.id, 'night-reader');
      await IngRepo.put(r.id, 'app/reader.js', 'function theme(){\n  return matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";\n}\nexport default theme;\n');
      await IngRepo.commit(r.id, 'Night for the reader'); await IngRepo.switchTo(r.id, 'main');
      fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.paint(); return r.id; });
    await sleep(1200);
    // a new pull request, from the template
    await p.evaluate(() => fbHub.open('pulls')); await sleep(1200);
    await p.click('#hPrNew'); await sleep(2500);
    const pt = await p.evaluate(() => ({ body: (document.querySelector('#hPrB textarea, #hPrB') || {}).value, row: [...document.querySelectorAll('#fb .r282-tpl .f-chip')].map(x => [x.textContent, x.getAttribute('aria-pressed')]) }));
    ok(/^## What it changes/.test(pt.body || '') && pt.row.length === 1 && pt.row[0][1] === 'true', 'a new pull request starts from the repository\'s pull request template, as GitHub does', pt);
    await p.fill('#hPrT', 'Night mode for the reader'); await p.click('#hPrGo'); await sleep(2000);
    const m0 = await p.evaluate(() => [...document.querySelectorAll('#fb .r282-meta .r282-mk')].map(x => x.textContent));
    ok(m0.length === 2 && m0[0] === 'People: No one' && m0[1] === 'Milestone: No milestone', 'People and Milestone chips stand under the pull request\'s first line', m0);
    await p.click('#fb .r282-meta .r282-mk[data-k="people"]'); await sleep(400);
    const pl = await p.evaluate(() => [...document.querySelectorAll('.r280-pop .r172-opt')].map(o => o.textContent));
    ok(pl.indexOf('Ada Ferreira') >= 0 && pl.indexOf('Someone else…') >= 0 && pl.indexOf('No one') >= 0, 'People opens Ingenium\'s own list: the people known here, Someone else, No one', pl);
    await p.evaluate(() => [...document.querySelectorAll('.r280-pop .r172-opt')].find(o => o.textContent === 'Someone else…').click()); await sleep(500);
    await p.fill('.f-sheet input', 'Theo'); await p.evaluate(() => [...document.querySelectorAll('.f-sheet button')].find(x => x.textContent === 'Give it to them').click()); await sleep(1500);
    await p.click('#fb .r282-meta .r282-mk[data-k="milestone"]'); await sleep(400);
    await p.evaluate(() => [...document.querySelectorAll('.r280-pop .r172-opt')].find(o => o.textContent === 'A new milestone…').click()); await sleep(500);
    await p.fill('.f-sheet .r282-ms input[type="text"]', 'v3.3'); await p.fill('.f-sheet .r282-ms input[type="date"]', '2026-12-01');
    await p.evaluate(() => [...document.querySelectorAll('.f-sheet button')].find(x => x.textContent === 'Make it').click()); await sleep(1500);
    const m1 = await p.evaluate(() => ({ chips: [...document.querySelectorAll('#fb .r282-meta .r282-mk')].map(x => x.textContent), tl: [...document.querySelectorAll('#hPrTl .h-ev')].map(x => x.textContent) }));
    ok(m1.chips[0] === 'People: Theo' && m1.chips[1] === 'Milestone: v3.3', 'given to Theo, in the milestone v3.3', m1.chips);
    ok(m1.tl.some(t => /^Given to Theo/.test(t)) && m1.tl.some(t => /^Added to the milestone “v3\.3”/.test(t)), 'the conversation says so', m1.tl);
    await p.click('#fb .r282-meta .r282-mk[data-k="milestone"]'); await sleep(400);
    const ml = await p.evaluate(() => [...document.querySelectorAll('.r280-pop .r172-opt')].map(o => [o.textContent, o.getAttribute('aria-selected')]));
    await p.keyboard.press('Escape'); await sleep(200);
    ok(ml.some(x => x[0] === 'v3.3 · due 1 December · 0 of 1 done' && x[1] === 'true'), 'the milestone\'s line: its day, and how many of its issues and pull requests are done', ml);
    // files changed: a comment on a line
    const filesTab = async () => { await p.evaluate(() => { const k = [...document.querySelectorAll('#fb .h-bar .f-seg button')].find(x => /^Files changed/.test(x.textContent)); k.click(); }); await sleep(2200); };
    const convTab = async () => { await p.evaluate(() => { const k = [...document.querySelectorAll('#fb .h-bar .f-seg button')].find(x => /^Conversation/.test(x.textContent)); k.click(); }); await sleep(1200); };
    await filesTab();
    const f0 = await p.evaluate(() => ({ keys: document.querySelectorAll('#fb .f-dcode.r282-on .r282-lc').length, path: (document.querySelector('#fb .f-diff-h b') || {}).textContent, viewed: !!document.querySelector('#fb .r282-viewed input') }));
    ok(f0.keys >= 4 && f0.path === 'app/reader.js' && f0.viewed, 'in Files changed, every line has its + key, and the file has Viewed', f0);
    await p.evaluate(() => { const l = document.querySelector('#fb .f-dl[data-side="new"][data-line="2"]'); l.querySelector('.r282-lc').click(); }); await sleep(400);
    await p.fill('#fb .r282-new textarea', 'Could this read the system\'s choice once, at start?');
    await p.evaluate(() => document.querySelector('#fb .r282-new [data-x="go"]').click()); await sleep(1200);
    const c1 = await p.evaluate(() => { const l = document.querySelector('#fb .f-dl[data-side="new"][data-line="2"]'), th = l && l.nextElementSibling; return th && th.classList.contains('r282-thread') ? th.textContent : null; });
    ok(/Ada Ferreira/.test(c1 || '') && /on line 2/.test(c1) && /read the system's choice once/.test(c1), 'the comment is kept on line 2, its thread under the line', c1);
    await convTab(); await filesTab();
    const c2 = await p.evaluate(() => { const l = document.querySelector('#fb .f-dl[data-side="new"][data-line="2"]'), th = l && l.nextElementSibling; return th && th.classList.contains('r282-thread') ? th.textContent : null; });
    ok(/read the system's choice once/.test(c2 || ''), 'drawn again, the thread is still under line 2', c2);
    await p.evaluate(() => document.querySelector('#fb .r282-thread .r282-replyk').click()); await sleep(300);
    await p.fill('#fb .r282-thread .r282-reply textarea', 'Yes: once at start, then on each change.');
    await p.evaluate(() => document.querySelector('#fb .r282-thread .r282-reply [data-y="go"]').click()); await sleep(1000);
    await p.evaluate(() => { const th = document.querySelector('#fb .r282-thread'); if (th) th.scrollIntoView({ block: 'center' }); }); await sleep(300);
    await p.screenshot({ path: path.join(OUT, 'files.png') });
    await p.evaluate(() => document.querySelector('#fb .r282-thread [data-r]').click()); await sleep(800);
    const c3 = await p.evaluate(() => { const th = document.querySelector('#fb .r282-thread'); return { cards: th.querySelectorAll('.h-cmt').length, done: th.classList.contains('r282-done'), key: th.querySelector('[data-r]').textContent }; });
    ok(c3.cards === 2 && c3.done && c3.key === 'Unresolve', 'a reply joins the thread; Resolve folds it, and the key says Unresolve', c3);
    await p.evaluate(() => document.querySelector('#fb .r282-thread [data-r]').click()); await sleep(600);
    const c4 = await p.evaluate(() => ({ done: document.querySelector('#fb .r282-thread').classList.contains('r282-done') }));
    await convTab();
    const tl2 = await p.evaluate(() => [...document.querySelectorAll('#hPrTl .h-ev')].map(x => x.textContent));
    ok(!c4.done && tl2.some(t => /^Commented on line 2 of app\/reader\.js/.test(t)) && tl2.some(t => /^Resolved a comment on line 2 of app\/reader\.js/.test(t)), 'Unresolve opens it again; the conversation says what was commented and resolved', tl2);
    // viewed, until the file changes
    await filesTab();
    await p.evaluate(() => { const i = document.querySelector('#fb .r282-viewed input'); i.click(); }); await sleep(800);
    const v1 = await p.evaluate(() => document.querySelector('#fb .f-dcode').classList.contains('r282-folded'));
    await convTab(); await filesTab();
    const v2 = await p.evaluate(() => ({ folded: document.querySelector('#fb .f-dcode').classList.contains('r282-folded'), on: document.querySelector('#fb .r282-viewed input').checked }));
    ok(v1 && v2.folded && v2.on, 'Viewed folds the file away, and it stays folded when drawn again', [v1, v2]);
    await p.evaluate(async id => { await IngRepo.switchTo(id, 'night-reader'); await IngRepo.put(id, 'app/reader.js', 'function theme(){\n  return matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";\n}\nexport default theme;\n// read once at start\n');
      await IngRepo.commit(id, 'A note on when it is read'); await IngRepo.switchTo(id, 'main'); await fbHubHost.refresh(); fbHubHost.paint(); }, id); await sleep(1500);
    await convTab(); await filesTab();
    const v3 = await p.evaluate(() => ({ folded: document.querySelector('#fb .f-dcode').classList.contains('r282-folded'), on: document.querySelector('#fb .r282-viewed input').checked }));
    ok(!v3.folded && !v3.on, 'once the file changes again, it is no longer viewed', v3);
    // the list
    await p.evaluate(() => { const k = [...document.querySelectorAll('#fb button')].find(y => /All pull requests/.test(y.textContent)); if (k) k.click(); }); await sleep(1200);
    const row = await p.evaluate(() => (document.querySelector('#hPrList .h-item .m') || {}).textContent);
    ok(/· v3\.3 · Theo$/.test(row || ''), 'the list says its milestone and who has it', row);
    // a new issue from a template
    await p.evaluate(() => fbHub.open('issues')); await sleep(1000);
    await p.click('#hIssNew'); await sleep(2200);
    const i0 = await p.evaluate(() => [...document.querySelectorAll('#fb .r282-tpl .f-chip')].map(x => x.textContent));
    ok(JSON.stringify(i0) === JSON.stringify(['An idea', 'Bug report']), 'a new issue offers the repository\'s issue templates', i0);
    await p.evaluate(() => [...document.querySelectorAll('#fb .r282-tpl .f-chip')].find(x => x.textContent === 'Bug report').click()); await sleep(1600);
    const i1 = await p.evaluate(() => ({ title: document.getElementById('hIsT').value, body: (document.querySelector('#hIsB textarea, #hIsB') || {}).value, bug: (([...document.querySelectorAll('#fb .h-form .h-lab')].find(x => x.textContent === 'bug')) || {}).getAttribute && [...document.querySelectorAll('#fb .h-form .h-lab')].find(x => x.textContent === 'bug').getAttribute('aria-pressed') }));
    ok(i1.title === '[Bug] ' && /^## What happened/.test(i1.body || '') && i1.bug === 'true', 'Bug report fills its title, its words and its label', i1);
    /* words of her own in it: another template asks before it takes their place (the template's own words, untouched, are replaced at once) */
    await p.evaluate(() => { const t = document.querySelector('#hIsB textarea, #hIsB'); t.value += 'It flashes white for a moment.'; t.dispatchEvent(new Event('input', { bubbles: true })); });
    await p.evaluate(() => [...document.querySelectorAll('#fb .r282-tpl .f-chip')].find(x => x.textContent === 'An idea').click()); await sleep(700);
    const asked = await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent === 'Use the template' && x.offsetParent); if (k) { k.click(); return true; } return false; }); await sleep(1600);
    const i2 = await p.evaluate(() => ({ body: (document.querySelector('#hIsB textarea, #hIsB') || {}).value, labs: [...document.querySelectorAll('#fb .h-form .h-lab[aria-pressed="true"]')].map(x => x.textContent).sort() }));
    ok(asked && /^The idea, in a few words:/.test(i2.body || '') && JSON.stringify(i2.labs) === JSON.stringify(['bug', 'enhancement', 'idea']), 'another template asks first, in Ingenium\'s own words; then its words and labels come in', [asked, i2]);
    // what GitHub kept: people, milestones, comments on lines (a stand-in for phase 1's records)
    const gh = await p.evaluate(async () => { const keep = window.pywebview;
      const DATA = { issues: [{ number: 3, title: 'Night mode flashes on start', body: '', state: 'open', labels: [], created_at: '2026-11-01T10:00:00Z', updated_at: '2026-11-02T10:00:00Z', user: { login: 'ada-f' }, assignees: [{ login: 'theo-k' }], milestone: { title: 'v3.3' } },
          { number: 4, title: 'Night mode for the reader', body: '', state: 'open', labels: [], created_at: '2026-11-03T10:00:00Z', updated_at: '2026-11-03T12:00:00Z', user: { login: 'theo-k' }, pull_request: {}, assignees: [], milestone: null }],
        pulls: [{ number: 4, head: { ref: 'night-reader' }, base: { ref: 'main' } }], comments: [], reviews: {}, labels: [], repo: { default_branch: 'main' },
        milestones: [{ title: 'v3.3', due_on: '2026-12-01T08:00:00Z', state: 'open', description: 'The night release' }, { title: 'v3.2', due_on: null, state: 'closed' }],
        review_comments: [{ id: 11, pull_request_url: 'https://api.github.com/repos/ada-f/quill/pulls/4', path: 'app/reader.js', line: 2, side: 'RIGHT', body: 'Read once?', user: { login: 'ada-f' }, created_at: '2026-11-03T11:00:00Z' },
          { id: 12, pull_request_url: 'https://api.github.com/repos/ada-f/quill/pulls/4', path: 'app/reader.js', line: 2, side: 'RIGHT', body: 'Yes.', user: { login: 'theo-k' }, created_at: '2026-11-03T11:30:00Z', in_reply_to_id: 11 }] };
      window.pywebview = { api: { claude_sessions: () => Promise.resolve([]), hub_scan: () => Promise.resolve({ ok: true }), hub_hub_json: (full, name) => Promise.resolve({ ok: true, data: DATA[name] || null }) } };
      try { const rec = await IngHubBring.record('ada-f/quill'); const i = rec.issues[0], pr = rec.pulls[0];
        return { people: rec.people, ip: i.people, im: i.milestone, ms: rec.milestones.map(m => [m.title, m.due ? new Date(m.due).toISOString().slice(0, 10) : null, m.state]), lines: pr.lines.map(l => [l.path, l.side, l.line, l.by, l.body, l.replies.map(x => x.by + ': ' + x.body)]) };
      } finally { window.pywebview = keep; } });
    ok(JSON.stringify(gh.ip) === '["theo-k"]' && gh.im === 'v3.3' && gh.people.indexOf('ada-f') >= 0 && gh.people.indexOf('theo-k') >= 0 && JSON.stringify(gh.ms) === JSON.stringify([['v3.3', '2026-12-01', 'open'], ['v3.2', null, 'closed']]),
       'from GitHub: the people of each issue, its milestone, and the milestones with their days', gh);
    ok(JSON.stringify(gh.lines) === JSON.stringify([['app/reader.js', 'new', 2, 'ada-f', 'Read once?', ['theo-k: Yes.']]]), 'from GitHub: the comments on lines, each with its replies under it', gh.lines);
    // a phone
    await p.setViewportSize({ width: 390, height: 860 }); await sleep(800);
    await p.evaluate(() => { fbHub.open('pulls'); }); await sleep(800);
    await p.evaluate(() => { const x = document.querySelector('#hPrList .h-item'); if (x) x.click(); }); await sleep(1500);
    const ph = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, chips: document.querySelectorAll('#fb .r282-meta .r282-mk').length }));
    await p.screenshot({ path: path.join(OUT, 'phone.png') });
    ok(ph.sw <= ph.iw && ph.chips === 2, 'on a phone nothing scrolls sideways, and the chips are there', ph);
    ok(!errs.length, 'no page error', errs);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 900)); }
  finally { await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0); }
})();
