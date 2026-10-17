// R114: GitHub inside Fabrica, against a stand-in GitHub API (ghmock.py) that hashes objects as git does.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3], API = 'http://127.0.0.1:8170'; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0, page = null;
const ok =(c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 260) : '')); c ? pass++ : fail++; };
const mock = async (p, init) => { const r = await fetch(API + p, Object.assign({ headers: { Authorization: 'Bearer t', 'Content-Type': 'application/json' } }, init || {})); return r.status === 204 ? null : r.json(); };
(async () => {
  await mock('/_reset', { method: 'POST' });
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); page = p;
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200))); p.on('console', m => { if (m.type() === 'warning' || m.type() === 'error') console.log('  [console]', m.text().slice(0, 300)); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1000);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  const id = await p.evaluate(async (API) => { state.github = { api: API }; const rs = await IngRepo.list(); for (const r of rs) await IngRepo.remove(r.id);
    const x = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><meta charset="utf-8"><meta name="ingenium-build" content="1.0.0"><title>Notes</title><h1>Notes</h1><script src="app.js"></script>' }, { path: 'style.css', data: 'body{font:16px serif}' }, { path: 'app.js', data: 'document.title="Notes";' }], { name: 'My Notes', msg: 'First version' });
    state.fabrica = state.fabrica || {}; state.fabrica.sel = x.id; state.fabrica.gh = true; saveState(); go('fabrica'); return x.id; }, API);
  await p.waitForTimeout(1200);
  const rows = () => p.evaluate(() => [...document.querySelectorAll('#fbCopies .f-cp .t')].map(t => t.firstChild.textContent.trim()));
  ok((await rows()).includes('Sign in to GitHub'), 'with GitHub on and no token, the panel offers to sign in', (await rows()).join(' | '));
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Sign in').click(); }); await p.waitForTimeout(300);
  await p.fill('#fb .f-sheet input', 'test-token'); await p.click('#fb .f-sheet .f-btn.pri'); await p.waitForTimeout(900);
  ok((await rows()).some(t => /Signed in as testowner/.test(t)), 'the token is checked with GitHub and the account named', (await rows()).join(' | '));
  // link the repository
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Link').click(); }); await p.waitForTimeout(600);
  const opts = await p.evaluate(() => [...document.querySelectorAll('#fb .f-sheet select option')].map(o => o.value).filter(Boolean));
  ok(opts.join() === 'testowner/notes,testowner/other', 'the sheet lists her repositories from GitHub', opts.join());
  await p.evaluate(() => { const s = document.querySelector('#fb .f-sheet select'); s.value = 'testowner/notes'; s.dispatchEvent(new Event('change')); });
  await p.click('#fb .f-sheet .f-btn.pri'); await p.waitForTimeout(900);
  ok((await rows()).some(t => /testowner\/notes · main/.test(t)), 'the app is linked to its repository and branch', (await rows()).join(' | '));
  // send the first version: identical ids on both sides
  await p.waitForFunction(() => /GitHub has no branch main yet/.test(document.querySelector('#fbCopies').innerText), null, { timeout: 15000 });
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Send' && !x.hidden).click(); });
  await p.waitForFunction(() => /In step: GitHub holds the same versions/.test(document.querySelector('#fbCopies').innerText), null, { timeout: 30000 });
  let st = await mock('/_state'); const head1 = await p.evaluate(async (id) => (await IngRepo.info(id)).head, id);
  ok(st.refs['refs/heads/main'] === head1 && st.objects === 5, 'sent: GitHub\'s branch points at the very same commit id; 3 blobs, 1 tree, 1 commit', st.refs['refs/heads/main'] + ' vs ' + head1 + ' · objects ' + st.objects);
  await p.screenshot({ path: OUT + '/gh-linked.png' });
  // a second version here, sent
  await p.evaluate(async (id) => { await IngRepo.put(id, 'app.js', 'document.title="Notes 2";'); await IngRepo.commit(id, 'Second version'); await fbRender(); }, id);
  await p.waitForFunction(() => /1 version here that GitHub does not have/.test(document.querySelector('#fbCopies').innerText), null, { timeout: 15000 });
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Send' && !x.hidden).click(); });
  await p.waitForFunction(() => /In step/.test(document.querySelector('#fbCopies').innerText), null, { timeout: 30000 });
  st = await mock('/_state'); const head2 = await p.evaluate(async (id) => (await IngRepo.info(id)).head, id);
  ok(st.refs['refs/heads/main'] === head2 && head2 !== head1, 'the second version went up, and only it (the first was already there)', st.refs['refs/heads/main'].slice(0, 7));
  // a change made on GitHub: brought here, same id, working copy updated
  const remoteCommit = async (parentSha, file, text, msg) => {
    const c = await mock('/repos/testowner/notes/git/commits/' + parentSha); const t = await mock('/repos/testowner/notes/git/trees/' + c.tree.sha);
    const blob = await mock('/repos/testowner/notes/git/blobs', { method: 'POST', body: JSON.stringify({ content: Buffer.from(text).toString('base64'), encoding: 'base64' }) });
    const ents = t.tree.filter(e => e.path !== file).map(e => ({ path: e.path, mode: e.mode, type: e.type, sha: e.sha })).concat([{ path: file, mode: '100644', type: 'blob', sha: blob.sha }]);
    const tree = await mock('/repos/testowner/notes/git/trees', { method: 'POST', body: JSON.stringify({ tree: ents }) });
    const cm = await mock('/repos/testowner/notes/git/commits', { method: 'POST', body: JSON.stringify({ message: msg, tree: tree.sha, parents: [parentSha], author: { name: 'Remote Editor', email: 'remote@example.com', date: '2026-10-17T12:00:00+01:00' }, committer: { name: 'Remote Editor', email: 'remote@example.com', date: '2026-10-17T12:00:00+01:00' } }) });
    await mock('/repos/testowner/notes/git/refs/heads/main', { method: 'PATCH', body: JSON.stringify({ sha: cm.sha, force: true }) }); return cm.sha; };
  const r1 = await remoteCommit(head2, 'readme.md', '# Notes\n\nEdited on GitHub.\n', 'Edited on GitHub');
  const again = () => p.evaluate(() => { const k = [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Check again'); if (k) k.click(); });
  await again(); await p.waitForFunction(() => /GitHub is ahead/.test(document.querySelector('#fbCopies').innerText), null, { timeout: 15000 });
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Bring theirs' && !x.hidden).click(); });
  for (let i = 0; i < 6; i++) { await p.waitForTimeout(1500); const dbg = await p.evaluate(() => { const t = [...document.querySelectorAll('#fbCopies .f-cp')].find(x => /^Its versions/.test(x.textContent)); return { row: t ? t.innerText.replace(/\s+/g, ' ').slice(0, 220) : null, toast: (document.querySelector('#fb .f-toast') || {}).textContent || '' }; }); console.log('  [after bring ' + i + ']', JSON.stringify(dbg)); if (/In step/.test(dbg.row || '')) break; }
  await p.waitForFunction(() => /In step/.test(document.querySelector('#fbCopies').innerText), null, { timeout: 30000 });
  const got =await p.evaluate(async (id) => { const i = await IngRepo.info(id); return { head: i.head, branch: i.branch, readme: await IngRepo.readText(id, 'readme.md'), files: i.files }; }, id);
  ok(got.head === r1 && got.branch === 'main' && /Edited on GitHub/.test(got.readme || '') && got.files === 4, 'brought: GitHub\'s version is here under the same id, on main, and the working copy has the new file', JSON.stringify({ head: got.head.slice(0, 7), r1: r1.slice(0, 7), files: got.files }));
  // both sides change: theirs comes onto an idea of its own
  await p.evaluate(async (id) => { await IngRepo.put(id, 'style.css', 'body{font:17px serif}'); await IngRepo.commit(id, 'Larger type'); }, id);
  const r2 = await remoteCommit(r1, 'readme.md', '# Notes\n\nEdited twice on GitHub.\n', 'Edited again on GitHub');
  await p.evaluate(() => fbRender()); await p.waitForTimeout(800); await again(); await p.waitForFunction(() => /Both have new versions/.test(document.querySelector('#fbCopies').innerText), null, { timeout: 15000 });
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Bring theirs' && !x.hidden).click(); }); await p.waitForTimeout(2500);
  const div = await p.evaluate(async (id) => { const i = await IngRepo.info(id); const tip = await IngRepo.resolve(id, 'from-github'); return { branches: i.branches.sort().join(), head: i.head, idea: tip, toast: document.querySelector('#fb .f-toast') && document.querySelector('#fb .f-toast').textContent }; }, id);
  ok(div.branches === 'from-github,main' && div.idea === r2 && div.head !== r2 && /onto the idea “from-github”/.test(div.toast || ''), 'when both have new versions, GitHub\'s come onto the idea “from-github”, and main keeps hers', JSON.stringify(div).slice(0, 200));
  await p.evaluate(async (id) => { await IngRepo.merge(id, 'from-github'); await IngRepo.delBranch(id, 'from-github'); await fbRender(); }, id);
  await p.waitForFunction(() => /1 version here that GitHub does not have|2 versions here that GitHub does not have/.test(document.querySelector('#fbCopies').innerText), null, { timeout: 15000 });
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Send' && !x.hidden).click(); });
  await p.waitForFunction(() => /In step/.test(document.querySelector('#fbCopies').innerText), null, { timeout: 30000 });
  st = await mock('/_state'); const head3 = await p.evaluate(async (id) => (await IngRepo.info(id)).head, id);
  ok(st.refs['refs/heads/main'] === head3, 'after bringing the idea into main, the merge goes up and both are in step again', st.refs['refs/heads/main'].slice(0, 7) + ' ' + head3.slice(0, 7));
  // a release with the packages made here
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Release this version').click(); }); await p.waitForTimeout(300);
  await p.fill('#fb .f-sheet input[type=text]', 'v1.0'); await p.click('#fb .f-sheet .f-btn.pri');
  await p.waitForFunction(() => /Released v1\.0 with 2 packages attached/.test((document.querySelector('#fb .f-toast') || {}).textContent || ''), null, { timeout: 60000 }); await p.waitForTimeout(1200);
  st = await mock('/_state');
  const rel = st.releases[0]; const sizes = Object.values(st.assets);
  ok(rel && rel.tag_name === 'v1.0' && rel.assets.length === 2 && sizes.every(s => s > 100) && st.refs['refs/tags/v1.0'] === head3, 'the release is on GitHub with the one-page app and the web app attached, tagged at this version', JSON.stringify({ tag: rel && rel.tag_name, assets: rel && rel.assets.map(a => a.name), sizes }));
  const relUi = await p.evaluate(() => { const t = [...document.querySelectorAll('#fbCopies .f-cp')].find(x => /^Releases/.test(x.textContent)); return t ? { text: t.innerText.replace(/\s+/g, ' ').slice(0, 200), downloads: [...t.querySelectorAll('.f-btn')].filter(b => b.textContent === 'Download').length } : null; });
  ok(relUi && /v1\.0/.test(relUi.text) && relUi.downloads === 2, 'the panel lists the release with a Download key for each package', JSON.stringify(relUi));
  // builds: start them, see them, fetch the installer
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Start the builds').click(); });
  await p.waitForFunction(() => /2 builds started on GitHub/.test((document.querySelector('#fb .f-toast') || {}).textContent || ''), null, { timeout: 15000 }); await p.waitForTimeout(1200);
  st = await mock('/_state');
  const runsUi = await p.evaluate(() => [...document.querySelectorAll('#fbCopies .f-gh-run b')].map(x => x.textContent));
  ok(st.dispatches.length === 2 && st.dispatches.every(d => d.ref === 'main') && runsUi.includes('Build for the Fire tablet') && runsUi.includes('Build for the Mac'), 'both build workflows were started on the branch, and the runs show', JSON.stringify(st.dispatches) + ' ' + runsUi.join(','));
  const runs = st.runs.map(r => Object.assign({}, r, r.name === 'Build for the Fire tablet' ? { status: 'completed', conclusion: 'success' } : {}));
  await mock('/_runs', { method: 'POST', body: JSON.stringify(runs) });
  await p.evaluate((id) => { saveFileNative = function (name, mime, data) { window.__saved = { name, size: data.length || data.byteLength }; }; fbGitHub.forget(id); fbPaintShip(); }, id); await p.waitForTimeout(1500);
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Installers').click(); }); await p.waitForTimeout(900);
  const inst = await p.evaluate(() => [...document.querySelectorAll('#fbCopies .f-gh-run b')].map(x => x.textContent));
  ok(inst.includes('Ingenium-Fire-Tablet-app'), 'a finished build lists its installer', inst.join(','));
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Download' && x.classList.contains('pri')).click(); }); await p.waitForTimeout(1500);
  const saved = await p.evaluate(() => window.__saved);
  ok(saved && saved.name === 'Ingenium-Fire-Tablet-app.zip' && saved.size > 0, 'the installer is fetched through the API and saved', JSON.stringify(saved));
  // issues, and the troubleshooting row from a failed test
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Raise an issue').click(); }); await p.waitForTimeout(300);
  await p.fill('#fb .f-sheet input[type=text]', 'The title does not update'); await p.fill('#fb .f-sheet textarea', 'On the Fire tablet the title stays as it was.'); await p.click('#fb .f-sheet .f-btn.pri');
  await p.waitForFunction(() => /Issue #1 raised/.test((document.querySelector('#fb .f-toast') || {}).textContent || ''), null, { timeout: 15000 }); await p.waitForTimeout(1000);
  st = await mock('/_state');
  const issUi = await p.evaluate(() => { const t = [...document.querySelectorAll('#fbCopies .f-cp')].find(x => /^Issues/.test(x.textContent)); return t ? t.innerText.replace(/\s+/g, ' ').slice(0, 160) : ''; });
  ok(st.issues.length === 1 && st.issues[0].title === 'The title does not update' && /1 open issue/.test(issUi) && /#1 The title does not update/.test(issUi), 'an issue is raised on GitHub and listed', issUi);
  await p.evaluate(async (id) => { const i = await IngRepo.info(id); await IngRepo.setNote(id, i.head, 'test', { ok: false, at: Date.now(), checks: [{ id: 'reads', label: 'The page reads cleanly', state: 'ok', detail: '' }, { id: 'opens', label: 'It opens with no errors', state: 'fail', detail: 'ReferenceError: notes is not defined (app.js:1)' }] }); await fbRender(); }, id);
  await p.waitForTimeout(1500);
  const tr = await p.evaluate(() => { const t = [...document.querySelectorAll('#fbCopies .f-cp')].find(x => /^Troubleshoot/.test(x.textContent)); return t ? [...t.querySelectorAll('.f-btn')].map(b => b.textContent) : null; });
  ok(tr && tr.join('|') === 'Fix it in Code|Raise it as an issue', 'a failed test brings a Troubleshoot row: Fix it in Code, or raise it as an issue', JSON.stringify(tr));
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Fix it in Code').click(); }); await p.waitForTimeout(2500);
  const code = await p.evaluate(() => ({ page: document.querySelector('.section.active').id, mode: document.body.getAttribute('data-chatmode'), text: (document.getElementById('chatInput') || {}).value || '' }));
  ok(code.page === 'page-chat' && code.mode === 'code' && /ReferenceError: notes is not defined/.test(code.text) && /fix it/.test(code.text), 'Fix it in Code opens the app in Code with the report ready to send', JSON.stringify(code).slice(0, 200));
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1200);
  await p.screenshot({ path: OUT + '/gh-full.png' });
  await p.evaluate(() => { [...document.querySelectorAll('#fbCopies .f-btn')].find(x => x.textContent === 'Sign out').click(); }); await p.waitForTimeout(600);
  ok((await rows()).includes('Sign in to GitHub') && !(await p.evaluate(() => state.github.token)), 'signing out forgets the token', (await rows()).join(' | '));
  const notRunning = await p.evaluate(() => Object.entries(window.__ingParts || {}).filter(([k, v]) => v !== 'running').map(x => x.join(':')));
  ok(notRunning.length === 0, 'every part of the page ran to its end', notRunning.join(' '));
  ok(errs.length === 0, 'no script errors on the page', errs.join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(async e => { console.log('FAIL (crash) ' + e.message.split('\n')[0]); try { const d = await page.evaluate(() => ({ toast: (document.querySelector('#fb .f-toast') || {}).textContent, copies: document.querySelector('#fbCopies').innerText.replace(/\s+/g, ' ').slice(0, 500) })); console.log('  at crash:', JSON.stringify(d)); } catch (_) {} console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
