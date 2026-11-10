// node rig/t_639_repo.js <Ingenium page url> <out dir>
// Ingenium 6.39 (6 November 2026): a GitHub repository in a folder (modules/r238.js, the hooks in r208.js). Her answer: "I want its
// README, its files, and its issues." GitHub is a stand-in here (api.github.com and raw.githubusercontent.com answered by the test,
// with an invented repository, example-owner/quill-notes); nothing goes online. Checks:
//   - Folders' Bring in your work has the GitHub way and its key; the dialog brings the repository into a new folder named after it
//   - its README is among the folder's files (so it goes with every conversation there); its five text files are kept, each word for
//     word; a picture and a file over 1 MB are left out and counted; its two issues are kept with their labels and all three comments,
//     and the pull request is left out
//   - the folder's card: README, Files and Issues; Show gives a file's text and an issue with its comments; Use in a conversation
//     starts a conversation in the folder with the issue added to the next message
//   - Bring it up to date reads it again: the new README, a file gone, a new issue; what the first reading kept is let go
//   - a repository not found, GitHub's hourly limit and a link that is not one each say so in plain words, and make no folder
//   - Remove from this folder lets it all go; no token is sent when none is kept; no other host is asked; the card is in the app's scale
//   - no page errors
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
async function boot(p) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500); }
// ---- the invented repository, in two versions
const V = { n: 1 };
const FILES1 = { 'README.md': '# Quill notes\n\nAn invented notes app. INVENTED-README-MARK one.\n', 'LICENSE': 'Invented licence text for the test.\n', 'notes/empty.txt': '',
  'src/app.js': "console.log('INVENTED-FILE-MARK app');\n", 'docs/guide.md': '# Guide\n\nINVENTED-GUIDE-MARK\n' };
const FILES2 = { 'README.md': '# Quill notes\n\nINVENTED-README-MARK two.\n', 'LICENSE': FILES1.LICENSE, 'notes/empty.txt': '', 'src/app.js': FILES1['src/app.js'] };
const files = () => (V.n === 1 ? FILES1 : FILES2);
const tree = () => ({ sha: 't' + V.n, truncated: false, tree: Object.keys(files()).map(p => ({ path: p, type: 'blob', size: Buffer.byteLength(files()[p]) }))
  .concat([{ path: 'assets', type: 'tree' }, { path: 'assets/logo.png', type: 'blob', size: 2000 }, { path: 'data/big.json', type: 'blob', size: 2000000 }]) });
const ISSUES1 = [
  { number: 1, title: 'The export forgets the title', state: 'open', labels: [{ name: 'bug' }], user: { login: 'example-user' }, created_at: '2026-10-01T10:00:00Z', updated_at: '2026-10-02T10:00:00Z', closed_at: null, body: 'INVENTED-ISSUE-ONE the title is lost on export.' },
  { number: 2, title: 'Fix the export', state: 'open', labels: [], user: { login: 'example-user' }, created_at: '2026-10-03T10:00:00Z', pull_request: { url: 'x' }, body: 'a pull request' },
  { number: 3, title: 'Add a dark theme', state: 'closed', labels: [{ name: 'enhancement' }], user: { login: 'another-user' }, created_at: '2026-10-04T10:00:00Z', updated_at: '2026-10-06T10:00:00Z', closed_at: '2026-10-06T10:00:00Z', body: 'INVENTED-ISSUE-THREE' }];
const ISSUES2 = ISSUES1.concat([{ number: 4, title: 'Sync between devices', state: 'open', labels: [], user: { login: 'example-user' }, created_at: '2026-10-07T10:00:00Z', body: 'INVENTED-ISSUE-FOUR' }]);
const iu = (n) => 'https://api.github.com/repos/example-owner/quill-notes/issues/' + n;
const COMMENTS = [{ issue_url: iu(1), user: { login: 'another-user' }, created_at: '2026-10-01T12:00:00Z', body: 'INVENTED-COMMENT-A' }, { issue_url: iu(3), user: { login: 'example-user' }, created_at: '2026-10-05T12:00:00Z', body: 'INVENTED-COMMENT-C' },
  { issue_url: iu(1), user: { login: 'example-user' }, created_at: '2026-10-01T13:00:00Z', body: 'INVENTED-COMMENT-B' }];
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const origin = new URL(URL_).origin, other = [], asked = [], tokens = [];
  await ctx.route((u) => u.origin !== origin && !/^(data|blob):/.test(u.protocol), async (route) => {
    const req = route.request(), u = new URL(req.url()); const json = (o, st, hd) => route.fulfill({ status: st || 200, contentType: 'application/json', headers: Object.assign({ 'access-control-allow-origin': '*' }, hd || {}), body: JSON.stringify(o) });
    const text = (t) => route.fulfill({ status: 200, contentType: 'text/plain; charset=utf-8', headers: { 'access-control-allow-origin': '*' }, body: t });
    if (u.host === 'api.github.com') { asked.push(u.pathname + u.search); const auth = req.headers()['authorization']; if (auth) tokens.push(auth);
      const m = /^\/repos\/example-owner\/([^/]+)(\/.*)?$/.exec(u.pathname); const name = m && m[1], rest = (m && m[2]) || '';
      if (name === 'missing') return json({ message: 'Not Found' }, 404);
      /* as GitHub answers (checked with its real API on 6 November 2026: it exposes X-RateLimit-Remaining and X-RateLimit-Reset to pages) */
      if (name === 'limited') return json({ message: 'API rate limit exceeded' }, 403, { 'x-ratelimit-remaining': '0', 'x-ratelimit-reset': String(Math.floor(Date.now() / 1000) + 1800), 'access-control-expose-headers': 'X-RateLimit-Remaining, X-RateLimit-Reset' });
      if (name !== 'quill-notes') return json({ message: 'Not Found' }, 404);
      if (rest === '') return json({ default_branch: 'main', html_url: 'https://github.com/example-owner/quill-notes', description: 'An invented notes app for the test', private: false });
      if (rest === '/git/trees/main') return json(tree());
      if (rest === '/readme') return text(files()['README.md']);
      if (rest === '/issues') { const pg = +u.searchParams.get('page') || 1; return json(pg === 1 ? (V.n === 1 ? ISSUES1 : ISSUES2) : []); }
      if (rest === '/issues/comments') { const pg = +u.searchParams.get('page') || 1; return json(pg === 1 ? COMMENTS : []); }
      return json({ message: 'Not Found' }, 404); }
    if (u.host === 'raw.githubusercontent.com') { const m = /^\/example-owner\/quill-notes\/main\/(.+)$/.exec(u.pathname); const path = m && decodeURIComponent(m[1]);
      if (path != null && files()[path] != null) return text(files()[path]); return route.fulfill({ status: 404, body: '404: Not Found' }); }
    other.push(req.url()); return route.abort(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await boot(p);
  // 1. the way in Bring in your work, and the dialog
  await p.evaluate(() => go('folders')); await p.waitForTimeout(800);
  const way = await p.evaluate(() => { const w = [...document.querySelectorAll('#page-folders .fld-way')].find(x => /A GitHub repository/.test(x.textContent)); return w ? [...w.querySelectorAll('button')].map(k => k.textContent.trim()) : null; });
  ok(way && way.includes('Bring in a repository'), 'Folders\' Bring in your work has "A GitHub repository" with its key', way);
  await p.evaluate(() => [...document.querySelectorAll('#page-folders .fld-way')].find(x => /A GitHub repository/.test(x.textContent)).querySelector('button').click()); await p.waitForTimeout(400);
  await p.fill('#frpLink', 'https://github.com/example-owner/quill-notes'); await p.selectOption('#frpFolder', 'new'); await p.click('#frpGo');
  await p.waitForFunction(() => (window.state.projects || []).some(x => x.app && x.app.repo && x.app.repo.r === 'quill-notes'), null, { timeout: 30000 }); await p.waitForTimeout(800);
  const s1 = await p.evaluate(async () => { const f = state.projects.find(x => x.app && x.app.repo && x.app.repo.r === 'quill-notes'), R = f.app.repo;
    const texts = {}; for (const x of R.files) texts[x.path] = await IngBig.load(x.big); const iss = JSON.parse(await IngBig.load(R.issues.big));
    return { name: f.name, kind: f.kind, readme: (f.files.find(x => x.name === 'README (example-owner/quill-notes)') || {}).text || null, files: R.files.map(x => x.path), texts, skipped: R.skipped, issues: R.issues,
      iss: iss.map(x => ({ n: x.n, state: x.state, labels: x.labels, c: x.comments.map(c => c.body) })), modalOpen: document.getElementById('modalRoot').classList.contains('open'), open: state.folders.ui.open === f.id, id: f.id,
      bigIds: R.files.map(x => x.big).concat([R.issues.big]) }; });
  ok(s1.name === 'quill-notes' && s1.kind === 'app' && !s1.modalOpen && s1.open, 'the repository came into a new folder named after it, and the folder is open', s1);
  ok(s1.readme && /INVENTED-README-MARK one/.test(s1.readme), 'its README is among the folder\'s files, so it goes with every conversation in the folder', s1.readme);
  ok(JSON.stringify(s1.files) === JSON.stringify(['LICENSE', 'README.md', 'docs/guide.md', 'notes/empty.txt', 'src/app.js']) && Object.keys(s1.texts).every(k => s1.texts[k] === FILES1[k]),
    'its five text files are kept on this device, each word for word', s1.files);
  ok(s1.skipped.notText === 1 && s1.skipped.tooBig === 1, 'a picture and a file over 1 MB are left out, and counted', s1.skipped);
  const i1 = s1.iss.find(x => x.n === 1), i3 = s1.iss.find(x => x.n === 3);
  ok(s1.issues.count === 2 && s1.issues.open === 1 && s1.issues.prs === 1 && i1 && i1.c.join() === 'INVENTED-COMMENT-A,INVENTED-COMMENT-B' && i3 && i3.state === 'closed' && i3.labels.join() === 'enhancement' && i3.c.join() === 'INVENTED-COMMENT-C',
    'its two issues are kept with their labels and their three comments, in order; the pull request is left out', s1.iss);
  // 2. the folder's card
  const card = await p.evaluate(() => { const c = document.getElementById('frpCard'); if (!c) return null; const cs = (e) => e ? getComputedStyle(e) : {};
    return { h: c.querySelector('h2').textContent, hfs: cs(c.querySelector('h2')).fontSize, spread: !!c.closest('#page-folders.fd-on .fd-spread'), tabs: [...c.querySelectorAll('.frp-tab')].map(t => t.textContent), readme: /INVENTED-README-MARK one/.test((c.querySelector('.frp-readme') || {}).textContent || ''),
      keys: [...c.querySelectorAll('button.btn, a.btn')].map(k => [k.textContent.trim(), cs(k).fontSize, Math.round(k.getBoundingClientRect().height)]) }; });
  ok(card && /example-owner\/quill-notes/.test(card.h) && card.tabs.join('|') === 'README|Files (5)|Issues (2)' && card.readme, 'the folder shows the repository\'s card: README (shown), Files (5) and Issues (2)', card);
  // 6.69: in Folders' drawer look (modules/r263.js) an opened folder is a spread, and every heading on its pages is 20px, as she approved it
  ok(card && (card.hfs === '16.5px' || (card.spread && card.hfs === '20px')) && card.keys.every(k => parseFloat(k[1]) <= 13 && k[2] <= 34), 'the card is in the app\'s scale: its heading 16.5px (20px on an opened folder\'s spread), its keys small (12px to 13px, no taller than 34px)', card && [card.hfs, card.spread, card.keys]);
  await p.evaluate(() => [...document.querySelectorAll('#frpCard .frp-tab')].find(t => /Files/.test(t.textContent)).click()); await p.waitForTimeout(300);
  await p.evaluate(() => { const li = [...document.querySelectorAll('#frpCard .frp-list > li')].find(l => /src\/app\.js/.test(l.textContent)); [...li.querySelectorAll('button')].find(k => k.textContent === 'Show').click(); }); await p.waitForTimeout(400);
  const shownFile = await p.evaluate(() => { const li = [...document.querySelectorAll('#frpCard .frp-list > li')].find(l => /src\/app\.js/.test(l.textContent)); return (li.querySelector('.frp-text') || {}).textContent || ''; });
  ok(/INVENTED-FILE-MARK/.test(shownFile), 'Files: Show gives a file\'s text', shownFile.slice(0, 80));
  await p.evaluate(() => [...document.querySelectorAll('#frpCard .frp-tab')].find(t => /Issues/.test(t.textContent)).click()); await p.waitForTimeout(300);
  await p.evaluate(() => { const li = [...document.querySelectorAll('#frpCard .frp-list > li')].find(l => (l.querySelector('.frp-n') || {}).textContent === '#1'); [...li.querySelectorAll('button')].find(k => k.textContent === 'Show').click(); }); await p.waitForTimeout(400);
  const shownIssue = await p.evaluate(() => { const li = [...document.querySelectorAll('#frpCard .frp-list > li')].find(l => (l.querySelector('.frp-n') || {}).textContent === '#1'); return (li.querySelector('.frp-text') || {}).textContent || ''; });
  ok(/INVENTED-ISSUE-ONE/.test(shownIssue) && /INVENTED-COMMENT-A[\s\S]*INVENTED-COMMENT-B/.test(shownIssue) && /Labels: bug/.test(shownIssue), 'Issues: Show gives an issue with its labels and its comments, in order', shownIssue.slice(0, 200));
  await p.evaluate(() => document.getElementById('frpCard').scrollIntoView({ block: 'start' })); await p.waitForTimeout(300); await (await p.$('#frpCard')).screenshot({ path: OUT + '/folder_repo.png' });
  await p.evaluate(() => { const li = [...document.querySelectorAll('#frpCard .frp-list > li')].find(l => (l.querySelector('.frp-n') || {}).textContent === '#1'); [...li.querySelectorAll('button')].find(k => /Use in a conversation/.test(k.textContent)).click(); }); await p.waitForTimeout(900);
  const used = await p.evaluate((fid) => ({ page: (document.querySelector('.section.active') || {}).id || null, inFolder: curChat().projectId === fid, staged: (window.stagedFiles || []).map(f => f.name) }), s1.id);
  ok(used.page === 'page-chat' && used.inFolder && used.staged.includes('quill-notes issue #1.md'), 'Use in a conversation starts a conversation in the folder with the issue added to the next message', used);
  await p.evaluate(() => { try { stagedFiles.length = 0; paintChips(); } catch (e) {} go('folders'); }); await p.waitForTimeout(600);
  // 3. Bring it up to date
  V.n = 2;
  await p.evaluate(() => [...document.querySelectorAll('#frpCard button')].find(k => k.textContent === 'Bring it up to date').click());
  await p.waitForFunction(() => { const f = state.projects.find(x => x.app && x.app.repo && x.app.repo.r === 'quill-notes'); return f && f.app.repo.issues.count === 3; }, null, { timeout: 30000 }); await p.waitForTimeout(800);
  const s2 = await p.evaluate(async (old) => { const f = state.projects.find(x => x.app && x.app.repo && x.app.repo.r === 'quill-notes'), R = f.app.repo;
    const gone = []; for (const id of old) gone.push(await IngBig.load(id)); return { readme: f.files.filter(x => /^README \(/.test(x.name)).map(x => x.text), files: R.files.map(x => x.path), issues: R.issues.count, gone }; }, s1.bigIds);
  ok(s2.readme.length === 1 && /INVENTED-README-MARK two/.test(s2.readme[0]) && s2.files.length === 4 && !s2.files.includes('docs/guide.md') && s2.issues === 3,
    'Bring it up to date: the new README (one, not two), the removed file gone, the new issue there', s2);
  ok(s2.gone.every(t => t == null), 'what the first reading kept is let go from the long-text store', s2.gone.map(t => t == null));
  // 4. refusals in plain words, and no folder for them
  const before = await p.evaluate(() => state.projects.length);
  const tryLink = async (link) => { await p.evaluate(() => IngFolderRepo.open()); await p.waitForTimeout(300); await p.fill('#frpLink', link); await p.click('#frpGo');
    await p.waitForFunction(() => { const e = document.getElementById('frpProg'); return e && /frp-err/.test(e.className); }, null, { timeout: 20000 }).catch(() => {});
    const t = await p.evaluate(() => document.getElementById('frpProg').textContent); await p.evaluate(() => closeModal()); await p.waitForTimeout(200); return t; };
  const tMissing = await tryLink('https://github.com/example-owner/missing'), tLimit = await tryLink('example-owner/limited'), tBad = await tryLink('not a link at all');
  ok(/was not found on GitHub/.test(tMissing) && /token/.test(tMissing), 'a repository not found says so, and that a private one needs a token', tMissing);
  ok(/limit/.test(tLimit) && /opens again at/.test(tLimit), 'GitHub\'s hourly limit says so, with the time it opens again', tLimit);
  ok(/not a repository's link/.test(tBad), 'a link that is not one says so', tBad);
  ok((await p.evaluate(() => state.projects.length)) === before, 'none of them made a folder');
  // 5. Remove from this folder
  const ids2 = await p.evaluate(() => { const f = state.projects.find(x => x.app && x.app.repo && x.app.repo.r === 'quill-notes'); return f.app.repo.files.map(x => x.big).concat([f.app.repo.issues.big]); });
  await p.evaluate(() => [...document.querySelectorAll('#frpCard button')].find(k => k.textContent === 'Remove from this folder').click()); await p.waitForTimeout(500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Take it out' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(600);
  const s3 = await p.evaluate(async (ids) => { const f = state.projects.find(x => x.name === 'quill-notes'); const gone = []; for (const id of ids) gone.push(await IngBig.load(id));
    return { repo: !!(f && f.app.repo), readme: f ? f.files.filter(x => /^README \(/.test(x.name)).length : -1, gone, card: !!document.getElementById('frpCard'), cardText: (document.getElementById('frpCard') || {}).textContent || '' }; }, ids2);
  ok(!s3.repo && s3.readme === 0 && s3.gone.every(t => t == null) && /Bring in a repository/.test(s3.cardText), 'Remove from this folder lets it all go (the README, the files, the issues), and the card offers to bring one in', s3);
  ok(tokens.length === 0 && asked.length > 0, 'no token was sent, as none is kept on this device (' + asked.length + ' requests to GitHub\'s API)', tokens);
  ok(other.length === 0, 'no other host was asked', other);
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
