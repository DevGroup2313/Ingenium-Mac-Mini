// node rig/t_691_rules.js <Ingenium page url (master or full)> <out folder>
// Ingenium 6.91 (12 November 2026), in Chromium: Fabrica's Rules before main, Safety on every version, and what changed while she was away
// (modules/r285.js, with r141's and r112's hooks). Her words, on the preview of phase 2's second stage (version 4, with the pieces of commit
// 9287840): "I approve of the preview, please push it everywhere." Invented people (Ada Ferreira, Theo) and invented apps (Quill, Slate),
// kept in Ingenium; the invented key and tokens are put together here, so no file holds one whole. Checks:
//   Safety, in Checks: a key left in the newest version, a token taken away a version later (still in the history) and a key in an
//   environment file are found, an example file's place holder is not; no secret is shown whole; the parts made by others with their
//   licences (MIT read from its notice, a banner whose licence is not named), the app's own licence, the parts package.json names;
//   large files; the reading is kept with the version, and read again on asking;
//   Rules before main, in Settings: four switches, all off; Only through a pull request refuses a version kept on main, a version undone on
//   main and a merge into main, and lets an idea take versions; Your review first and The checks pass first hold the pull request's merge
//   key, and say what main waits for; approved, with its checks passed, the pull request merges; Kept versions stay as they are refuses
//   moving main back and taking it away, and lets it move forward; the switches are kept; an app with no rules turned on is not held;
//   what changed while you were away: nothing at first sight, nothing for her own work; versions, a new idea, a release, an issue Theo
//   opened and his comment on a pull request are counted; the row says so, its list names each, a choice opens it and marks all read;
//   the versions open as a comparison;
//   on a phone nothing scrolls sideways; no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_691_rules.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const AK = 'AK' + 'IA' + 'QUILL' + 'EXAMPLE' + '0000', SL = 'xo' + 'xb-' + '1111111111-quill-invented', EV = 'q8Zr4Lm2' + 'Tn6Vb1Xc';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  const refused = (fn, args) => p.evaluate(async ([fn, args]) => { try { await IngRepo[fn].apply(IngRepo, args); return 'done'; } catch (e) { return 'refused: ' + (e && e.message || e); } }, [fn, args]);
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await sleep(800);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('fabrica'); });
    await sleep(2000);
    const part = await p.evaluate(() => window.__ingParts && window.__ingParts.p285);
    ok(part === 'running', 'the part runs (p285)', part);
    const S = await p.evaluate(async ([AK, SL, EV]) => { IngRepo.setAuthor({ name: 'Ada Ferreira', email: 'ada@example.invalid' });
      const r = await IngRepo.create({ name: 'Quill' });
      await IngRepo.put(r.id, 'README.md', '# Quill\n\nA notebook, offline.\n');
      await IngRepo.put(r.id, 'LICENSE', 'Apache License\nVersion 2.0, January 2004\nhttp://www.apache.org/licenses/\n');
      await IngRepo.put(r.id, 'index.html', '<!doctype html><title>Quill</title><script src="app/reader.js"></script>\n');
      await IngRepo.put(r.id, 'app/reader.js', 'function theme(){\n  return "day";\n}\n');
      await IngRepo.put(r.id, 'app/old.js', 'const hook = "' + SL + '";\n');
      await IngRepo.put(r.id, 'vendor/chartish/LICENSE', 'MIT License\n\nCopyright (c) 2026 Chartish\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software.\n');
      await IngRepo.put(r.id, 'vendor/chartish/chartish.min.js', '/*! chartish v1 */var c=1;\n');
      await IngRepo.put(r.id, 'lib/tiny.min.js', '/*! tiny v2 | (c) Tiny authors */var t=2;\n');
      await IngRepo.put(r.id, 'package.json', JSON.stringify({ name: 'quill', dependencies: { a: '1.0.0', b: '2.0.0' }, devDependencies: { c: '3.0.0' } }, null, 2) + '\n');
      const first = await IngRepo.commit(r.id, 'The first version');
      await IngRepo.del(r.id, 'app/old.js');
      await IngRepo.put(r.id, 'app/config.js', 'export const key = "' + AK + '";\n');
      await IngRepo.put(r.id, '.env', 'API_KEY=' + EV + '\nDEBUG=true\n');
      await IngRepo.put(r.id, '.env.example', 'API_KEY=your-key-here\n');
      const second = await IngRepo.commit(r.id, 'Settings');
      fbHubHost.FBS().sel = r.id; fbHubHost.S.home = false; await fbHubHost.refresh(); fbHubHost.paint(); return { id: r.id, first, second }; }, [AK, SL, EV]);
    const id = S.id;
    await sleep(1200);
    // what changed while you were away: nothing at first sight
    const a0 = await p.evaluate(async () => { const it = await IngGuard.check(); const row = document.getElementById('fbAway'); return { n: it.length, hidden: row ? row.hidden : null, before: row && row.nextElementSibling && row.nextElementSibling.id }; });
    ok(a0.n === 0 && a0.hidden === true && a0.before === 'fbRepos', 'what changed while you were away: nothing at first sight, the row waits hidden above Your apps', a0);
    // Safety, on every version
    await p.evaluate(() => fbHub.open('actions')); await sleep(800);
    await p.waitForFunction(() => { const b = document.getElementById('hSafety'); return b && !b.querySelector('.f-ck.run'); }, null, { timeout: 60000 });
    const s1 = await p.evaluate(() => { const b = document.getElementById('hSafety'); return { title: b.querySelector('.h-big').textContent, lead: b.textContent.slice(0, 120), rows: [...b.querySelectorAll('.f-ck')].map(x => [x.className.replace('f-ck ', ''), x.querySelector('div').firstChild.textContent, x.querySelector('small').textContent]), head: b.getAttribute('data-head') }; });
    ok(s1.title === 'Safety, on every version' && /Read on this computer, with nothing sent anywhere/.test(s1.lead) && s1.rows.length === 3, 'Checks has Safety, on every version, read on this computer', s1);
    const sec = s1.rows[0] || [];
    ok(sec[0] === 'warn' && sec[1] === '3 possible secrets left in the code', 'three possible secrets are found', sec);
    ok(/an AWS access key \(AKIA…00\) in app\/config\.js, line 1, version [0-9a-f]{7}/.test(sec[2]) && /a password or key in an environment file \(q8Zr…Xc\) in \.env, line 1/.test(sec[2]) && /a Slack token \(xoxb…ed\) in app\/old\.js, line 1, version [0-9a-f]{7}/.test(sec[2]),
      'a key in the newest version, a key in an environment file, and a token taken away a version later, still in the history', sec[2]);
    ok(sec[2].indexOf(AK) < 0 && sec[2].indexOf(SL) < 0 && sec[2].indexOf(EV) < 0 && !/env\.example/.test(sec[2]), 'no secret is shown whole, and the example file\'s place holder is not counted', sec[2]);
    ok(/make a new key where the old one was made/.test(sec[2]), 'it says what to do, in plain words', sec[2]);
    const lic = s1.rows[1] || [];
    ok(lic[0] === 'warn' && /^2 parts made by others kept in it: 1 under MIT; 1 whose licence Fabrica could not name; its own licence: Apache 2\.0; 3 more parts named in package\.json, fetched when it is built, their licences not kept in the repository/.test(lic[2]) && /could not name the licence of: lib\/tiny\.min\.js$/.test(lic[2]),
      'the parts it uses and their licences: MIT read from its notice, a banner with no licence named, its own licence, the parts package.json names', lic);
    const big = s1.rows[2] || [];
    ok(big[0] === 'ok' && big[2] === 'no file over 48 MB in this version', 'large files kept whole', big);
    const kept = await p.evaluate(async ([id, h]) => { const n = await IngRepo.notes(id, h); return n.safety ? { v: n.safety.v, secrets: n.safety.secrets.length, head: n.safety.head } : null; }, [id, S.second]);
    ok(kept && kept.v === 1 && kept.secrets === 3 && kept.head === S.second && s1.head === S.second, 'the reading is kept with the version it read', kept);
    await p.evaluate(() => { const k = [...document.querySelectorAll('#hSafety button')].find(x => x.textContent === 'Read it again'); k.click(); });
    await sleep(150);
    await p.waitForFunction(() => { const b = document.getElementById('hSafety'); return b && !b.querySelector('.f-ck.run') && !b.querySelector('button').disabled; }, null, { timeout: 60000 });
    const s2 = await p.evaluate(() => [...document.querySelectorAll('#hSafety .f-ck')].map(x => x.className.replace('f-ck ', '')));
    ok(JSON.stringify(s2) === '["warn","warn","ok"]', 'Read it again reads it again', s2);
    // Rules before main
    await p.evaluate(() => fbHub.open('settings')); await sleep(1000);
    const r0 = await p.evaluate(() => { const b = document.getElementById('hSetRules'); return b ? { t: b.querySelector('.h-big').textContent, lead: b.querySelector('.r285-lead').textContent, rows: [...b.querySelectorAll('.r285-rule')].map(x => [x.getAttribute('data-rule'), x.querySelector('b').textContent, x.querySelector('small').textContent, x.querySelector('input').checked]), next: b.nextElementSibling && b.nextElementSibling.id } : null; });
    ok(r0 && r0.t === 'Rules before main' && r0.rows.length === 4 && r0.rows.every(x => x[3] === false) && r0.next === 'hSetLabels', 'Settings has Rules before main: four switches, each off until she turns it on', r0);
    ok(r0 && JSON.stringify(r0.rows.map(x => x[1])) === '["Only through a pull request","Your review first","The checks pass first","Kept versions stay as they are"]' && /a program other than Fabrica that writes to the repository is not held by them/.test(r0.lead), 'the four rules, as the preview drew them, and what they do not hold', r0 && r0.rows);
    const sw = async k => { await p.evaluate(k => { const i = document.querySelector('#hSetRules .r285-rule[data-rule="' + k + '"] input'); i.click(); }, k); await sleep(600); };
    await sw('pr');
    const live1 = await p.evaluate(async id => (await fbHub.live(id)).rules, id);
    ok(live1 && live1.pr === true && !live1.review, 'Only through a pull request: on, and kept with the repository', live1);
    await p.evaluate(async id => { await IngRepo.put(id, 'app/reader.js', 'function theme(){\n  return "night";\n}\n'); }, id);
    const c1 = await refused('commit', [id, 'Night, straight into main']);
    ok(/^refused: main takes new versions only through a pull request \(Rules before main\)/.test(c1), 'a version kept on main is refused, in plain words', c1);
    await p.evaluate(async id => { await IngRepo.discard(id); }, id);
    const v1 = await refused('revert', [id, S.second]);
    ok(/^refused: main takes new versions only through a pull request/.test(v1), 'a version undone on main is refused too', v1);
    const night = await p.evaluate(async id => { await IngRepo.branch(id, 'night-reader'); await IngRepo.switchTo(id, 'night-reader');
      await IngRepo.put(id, 'app/reader.js', 'function theme(){\n  return matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";\n}\n');
      const o = await IngRepo.commit(id, 'Night for the reader'); await IngRepo.switchTo(id, 'main'); return o; }, id);
    ok(/^[0-9a-f]{40}$/.test(night || ''), 'an idea of its own takes versions as before', night);
    const m1 = await refused('merge', [id, 'night-reader']);
    ok(/^refused: main takes versions only through a pull request \(Rules before main\): open a pull request for this idea/.test(m1), 'a merge straight into main is refused', m1);
    await p.evaluate(async id => { await fbHubHost.refresh(); fbHubHost.paint(); fbHub.open('settings'); }, id); await sleep(1000);
    await sw('review'); await sw('checks'); await sw('keep');
    await p.evaluate(() => fbHub.open('settings')); await sleep(900);
    const r1 = await p.evaluate(() => [...document.querySelectorAll('#hSetRules .r285-rule input')].map(i => i.checked));
    ok(JSON.stringify(r1) === '[true,true,true,true]', 'the switches are kept, as they were left', r1);
    // the pull request, held until main has what it waits for
    await p.evaluate(() => fbHub.open('pulls')); await sleep(1000);
    await p.click('#hPrNew'); await sleep(2500);
    await p.fill('#hPrT', 'Night mode for the reader'); await p.click('#hPrGo'); await sleep(2500);
    const need = async () => p.evaluate(() => { const n = document.querySelector('#hPrMergeBox .r285-need'), k = document.getElementById('hPrMerge'); return { t: n ? n.textContent : null, ok: n ? n.classList.contains('ok') : null, dis: k ? k.disabled : null }; });
    const n1 = await need();
    ok(n1.t === 'Rules before main: main waits for your approval and the checks to pass on night-reader\'s newest version.' && n1.dis === true, 'the merge box says what main waits for, and its key waits too', n1);
    await p.click('#hPrApprove'); await sleep(1800);
    const n2 = await need();
    ok(n2.t === 'Rules before main: main waits for the checks to pass on night-reader\'s newest version.' && n2.dis === true, 'approved: main waits for the checks only', n2);
    await p.evaluate(async ([id, o]) => { await IngRepo.setNote(id, o, 'test', { ok: true, at: Date.now(), commit: o, checks: [] }); fbHub.repaint(); }, [id, night]); await sleep(1800);
    const n3 = await need();
    ok(n3.t === 'Rules before main: everything main waits for is here.' && n3.ok === true && n3.dis === false, 'with its checks passed, everything main waits for is here, and the key is free', n3);
    await p.click('#hPrMerge'); await sleep(3000);
    const mg = await p.evaluate(async ([id, o]) => { const l = await IngRepo.log(id, { ref: 'refs/heads/main', max: 20 }); const rec = await fbHub.live(id); return { has: l.some(c => c.oid === o), state: rec.pulls[0] && rec.pulls[0].state, flag: window.__ingPrMerge }; }, [id, night]);
    ok(mg.has && mg.state === 'merged' && mg.flag === null, 'approved, with its checks passed, the pull request merges into main', mg);
    const k1 = await refused('setRef', [id, 'main', S.first, { why: 'a test' }]);
    ok(/^refused: main would lose versions it holds, so it was not moved \(Rules before main: kept versions stay as they are\)/.test(k1), 'Kept versions stay as they are: main is not moved back', k1);
    const k2 = await p.evaluate(async id => { await IngRepo.switchTo(id, 'night-reader'); try { await IngRepo.delBranch(id, 'main'); return 'done'; } catch (e) { return 'refused: ' + e.message; } finally { await IngRepo.switchTo(id, 'main'); } }, id);
    ok(/^refused: main stays, with every version it holds/.test(k2), 'nor taken away', k2);
    const k3 = await p.evaluate(async id => { const main = await IngRepo.resolve(id, 'refs/heads/main'); await IngRepo.switchTo(id, 'night-reader');
      await IngRepo.put(id, 'NOTES.md', 'Night first.\n'); const o = await IngRepo.commit(id, 'A note'); await IngRepo.switchTo(id, 'main');
      try { await IngRepo.merge(id, 'main'); } catch (e) {} /* nothing to bring */
      await IngRepo.switchTo(id, 'night-reader'); await IngRepo.merge(id, 'main'); const tip = await IngRepo.resolve(id, 'refs/heads/night-reader'); await IngRepo.switchTo(id, 'main');
      window.__ingPrMerge = null; try { await IngRepo.setRef(id, 'main', tip, { why: 'forward' }); } catch (e) { return 'refused: ' + e.message; }
      return (await IngRepo.resolve(id, 'refs/heads/main')) === tip ? 'moved forward' : 'not moved'; }, id);
    ok(k3 === 'moved forward', 'main may still move forward (a version brought from GitHub comes this way)', k3);
    const free = await p.evaluate(async () => { const s = await IngRepo.create({ name: 'Slate' }); await IngRepo.put(s.id, 'index.html', '<!doctype html><title>Slate</title>\n'); try { await IngRepo.commit(s.id, 'The first version'); await IngRepo.put(s.id, 'a.txt', 'a\n'); return await IngRepo.commit(s.id, 'A second'); } catch (e) { return 'refused: ' + e.message; } });
    ok(/^[0-9a-f]{40}$/.test(free), 'an app with no rules turned on is not held', free);
    // what changed while you were away
    await p.evaluate(async () => { await fbHubHost.refresh(); fbHubHost.paint(); }); await sleep(800);
    const a1 = await p.evaluate(async id => { await IngGuard.check(); await IngRepo.switchTo(id, 'night-reader'); await IngRepo.put(id, 'NOTES.md', 'Night first, then day.\n');
      await IngRepo.commit(id, 'Another note'); await IngRepo.branch(id, 'theo-notes'); await IngRepo.tag(id, 'v1.0'); await IngRepo.switchTo(id, 'main');
      await new Promise(r => setTimeout(r, 900)); await fbHubHost.refresh(); fbHubHost.paint(); const it = await IngGuard.check(); return { n: it.length, labels: it.map(x => x.label), hidden: document.getElementById('fbAway').hidden }; }, id);
    ok(a1.n === 0 && a1.hidden === true, 'her own work in Fabrica is never news to her (a version, an idea, a release)', a1);
    const a2 = await p.evaluate(async ([id, first]) => { const sn = fbHubHost.FBS().away.repos[id];
      /* as another program would leave it: main moved on from the first version, an idea and a release that were not here */
      sn.refs['refs/heads/main'] = first.slice(0, 12); delete sn.refs['refs/heads/theo-notes']; delete sn.refs['refs/tags/v1.0'];
      const rec = await fbHub.live(id); rec.issues.push({ n: rec.next++, kind: 'issue', title: 'Night mode flashes on start', body: '', state: 'open', labels: [], created: Date.now(), updated: Date.now(), by: 'Theo', comments: [], events: [], refs: [] });
      rec.pulls[0].comments.push({ by: 'Theo', at: Date.now(), body: 'Read well at night.', kind: 'comment' }); await fbHub.keep(rec);
      const it = await IngGuard.check(); const row = document.getElementById('fbAway'); return { labels: it.map(x => x.label), row: row.textContent, hidden: row.hidden, n: row.getAttribute('data-n') }; }, [id, S.first]);
    ok(a2.hidden === false && a2.row === '3 new while you were away›'.replace('3', String(a2.labels.length)) && a2.labels.length === 5, 'what came while she was away is counted, and the row says so', a2);
    ok(JSON.stringify(a2.labels) === JSON.stringify(['main · 4 new versions', 'theo-notes · a new idea', 'v1.0 · kept as a release', '#2 Night mode flashes on start · Theo opened it', '#1 Night mode for the reader · Theo wrote']) ||
       (a2.labels.length === 5 && /^main · \d+ new versions$/.test(a2.labels[0]) && a2.labels[1] === 'theo-notes · a new idea' && a2.labels[2] === 'v1.0 · kept as a release' && a2.labels.indexOf('#2 Night mode flashes on start · Theo opened it') >= 0 && a2.labels.indexOf('#1 Night mode for the reader · Theo wrote') >= 0),
      'each is named: the versions on main, a new idea, a release, the issue Theo opened, his comment on the pull request', a2.labels);
    await p.click('#fbAway'); await sleep(500);
    const l1 = await p.evaluate(() => [...document.querySelectorAll('.r280-pop .r172-opt')].map(o => o.textContent));
    ok(l1.length === 6 && l1[5] === 'Mark all as read' && l1.indexOf('#2 Night mode flashes on start · Theo opened it') >= 0, 'its list names each, in Ingenium\'s own look, with Mark all as read', l1);
    await p.evaluate(() => [...document.querySelectorAll('.r280-pop .r172-opt')].find(o => /^#2 /.test(o.textContent)).click()); await sleep(2200);
    const o1 = await p.evaluate(() => ({ v: fbHub.viewing(), row: document.getElementById('fbAway').textContent, items: IngGuard.state().items.length }));
    ok(o1.v && o1.v.view === 'issues' && o1.v.issue === 2 && /^All read/.test(o1.row) && o1.items === 0, 'a choice opens it (issue #2), and all is marked read', o1);
    const a3 = await p.evaluate(async () => (await IngGuard.check()).length);
    ok(a3 === 0, 'read stays read', a3);
    const o2 = await p.evaluate(async ([id, first]) => { fbHubHost.FBS().away.repos[id].refs['refs/heads/main'] = first.slice(0, 12); await IngGuard.check(); return true; }, [id, S.first]);
    await p.click('#fbAway'); await sleep(500);
    await p.evaluate(() => [...document.querySelectorAll('.r280-pop .r172-opt')].find(o => /^main · /.test(o.textContent)).click()); await sleep(2500);
    const o3 = await p.evaluate(() => ({ v: fbHub.viewing(), from: [...document.querySelectorAll('#fb .h-pick select')].map(s => s.value) }));
    ok(o3.v && o3.v.view === 'compare', 'the versions that came open as a comparison, from the one she last saw', o3);
    // a phone
    await p.setViewportSize({ width: 390, height: 860 }); await sleep(800);
    await p.evaluate(() => fbHub.open('settings')); await sleep(1000);
    const ph1 = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, rules: document.querySelectorAll('#hSetRules .r285-rule').length }));
    await p.screenshot({ path: path.join(OUT, 'phone_rules.png') });
    await p.evaluate(() => fbHub.open('actions')); await sleep(1500);
    const ph2 = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, rows: document.querySelectorAll('#hSafety .f-ck').length }));
    await p.screenshot({ path: path.join(OUT, 'phone_safety.png') });
    ok(ph1.sw <= ph1.iw && ph1.rules === 4 && ph2.sw <= ph2.iw && ph2.rows === 3, 'on a phone nothing scrolls sideways, in Settings or Checks', [ph1, ph2]);
    ok(!errs.length, 'no page error', errs);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 900)); }
  finally { await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0); }
})();
