// Code on a GitHub repository (Ingenium 6.13, modules/r219.js). Her words (4 November 2026): "I want to be able to connect my Github
// repositories in the Environment of the Ingenium's Coding chat and so much more"; and (3 November) "I want to be able to connect my
// Github's repositories to the chats and track the changes made during the sessions".
// GitHub is a stand-in: window.fetch answers GitHub's REST API (the same paths and forms) from an invented account, with two invented
// repositories whose files carry their real git fingerprints (SHA-1 of "blob <size>\0<content>"), so "changed" is judged as GitHub
// judges it. Nothing goes online.
//   node rig/t_613_github.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const crypto = require('crypto');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1400))); c ? pass++ : fail++; };
const gitSha = (t) => { const b = Buffer.from(t, 'utf8'); return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob ' + b.length + '\0'), b])).digest('hex'); };
const FILES = {
  'index.html': '<!doctype html>\n<html><head><link rel="stylesheet" href="styles/site.css"></head>\n<body><h1>Tiny</h1>\n<script src="app.js"></script></body></html>\n',
  'app.js': 'function greet(n){return "Hello, "+n;}\ndocument.querySelector("h1").textContent=greet("world");\n',
  'styles/site.css': 'h1{color:#6a3fb5}\n',
  'scripts/run.sh': '#!/bin/sh\necho hi\n' };
const NEWER = { 'app.js': 'function greet(n){return "Hello there, "+n;}\ndocument.querySelector("h1").textContent=greet("world");\n', 'index.html': '<!doctype html>\n<html><body><h1>Tiny, newer</h1></body></html>\n', 'NEW.md': '# New\n' };
const DATA = { files: {}, newer: {}, readme: '# Upstream\n', readmeSha: '' };
for (const k in FILES) DATA.files[k] = { text: FILES[k], sha: gitSha(FILES[k]) };
for (const k in NEWER) DATA.newer[k] = { text: NEWER[k], sha: gitSha(NEWER[k]) };
DATA.readmeSha = gitSha(DATA.readme);

const STAND = (D) => { if (window.top !== window) return;
  const hex = (n) => (n.toString(16) + 'c0ffee').padEnd(40, '0').slice(0, 40);
  const b64 = (t) => btoa(unescape(encodeURIComponent(t)));
  const G = window.__gh = { calls: [], n: 0, refs: {}, commits: {}, trees: {}, blobs: {}, forkMissing: true, forked: false };
  const C0 = hex(100), T0 = 'tree0', C2 = hex(200);
  G.C0 = C0; G.C2 = C2;
  for (const k in D.files) G.blobs[D.files[k].sha] = D.files[k].text;
  for (const k in D.newer) G.blobs[D.newer[k].sha] = D.newer[k].text;
  G.blobs[D.readmeSha] = D.readme; G.blobs['png0'] = '\u0000PNG binary';
  G.refs['invented-dev/tiny-app:main'] = C0; G.commits[C0] = { tree: T0 }; G.commits[C2] = { tree: T0, parents: [C0] };
  G.trees[T0] = Object.keys(D.files).map(k => ({ path: k, mode: k === 'scripts/run.sh' ? '100755' : '100644', type: 'blob', sha: D.files[k].sha, size: D.files[k].text.length }))
    .concat([{ path: 'img', mode: '040000', type: 'tree', sha: 'tdir' }, { path: 'img/logo.png', mode: '100644', type: 'blob', sha: 'png0', size: 2048 },
      { path: 'node_modules/left/index.js', mode: '100644', type: 'blob', sha: 'nm0', size: 30 }, { path: 'big/data.txt', mode: '100644', type: 'blob', sha: 'big0', size: 2000000 },
      { path: '.env', mode: '100644', type: 'blob', sha: 'env0', size: 20 }]);
  const UP0 = hex(300); G.UP0 = UP0; G.refs['someone/upstream-lib:main'] = UP0; G.commits[UP0] = { tree: 'treeU' }; G.trees.treeU = [{ path: 'README.md', mode: '100644', type: 'blob', sha: D.readmeSha, size: D.readme.length }];
  const repoInfo = { 'invented-dev/tiny-app': { push: true, priv: false }, 'someone/upstream-lib': { push: false, priv: false }, 'invented-dev/upstream-lib': { push: true, priv: false, fork: true } };
  const json = (code, body) => Promise.resolve(new Response(code === 204 ? null : JSON.stringify(body), { status: code, headers: { 'Content-Type': 'application/json' } }));
  const of = window.fetch.bind(window);
  window.fetch = function (url, init) { url = String(url); if (url.indexOf('https://api.github.com/') !== 0) return of(url, init);
    init = init || {}; const method = (init.method || 'GET').toUpperCase(); const u = new URL(url); const p = decodeURIComponent(u.pathname); let body = null; try { body = init.body ? JSON.parse(init.body) : null; } catch (e) {}
    const auth = (init.headers || {})['Authorization'] || '';
    G.calls.push({ method, path: p + (u.search || ''), body, auth });
    if (auth !== 'Bearer ghp_invented_token') return json(401, { message: 'Bad credentials' });
    let m;
    if (method === 'GET' && p === '/user') return json(200, { login: 'invented-dev' });
    if (method === 'GET' && p === '/user/repos') return json(200, u.searchParams.get('page') === '1' ? [
      { full_name: 'invented-dev/tiny-app', name: 'tiny-app', owner: { login: 'invented-dev' }, private: false, default_branch: 'main', pushed_at: new Date(Date.now() - 3600e3).toISOString(), permissions: { push: true } },
      { full_name: 'someone/upstream-lib', name: 'upstream-lib', owner: { login: 'someone' }, private: false, default_branch: 'main', pushed_at: new Date(Date.now() - 86400e3).toISOString(), permissions: { push: false } }] : []);
    if ((m = /^\/repos\/([^/]+)\/([^/]+)$/.exec(p)) && method === 'GET') { const full = m[1] + '/' + m[2], r = repoInfo[full]; if (!r || (r.fork && !G.forked)) return json(404, { message: 'Not Found' });
      return json(200, { name: m[2], full_name: full, owner: { login: m[1] }, default_branch: 'main', private: r.priv, html_url: 'https://github.com/' + full, permissions: { push: r.push } }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/branches$/.exec(p))) return json(200, [{ name: 'main' }, { name: 'dev' }]);
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/git\/ref\/heads\/(.+)$/.exec(p))) { const sha = G.refs[m[1] + '/' + m[2] + ':' + m[3]]; return sha ? json(200, { ref: 'refs/heads/' + m[3], object: { sha, type: 'commit' } }) : json(404, { message: 'Not Found' }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/git\/commits\/([0-9a-z]+)$/.exec(p)) && method === 'GET') {
      if (m[1] === 'invented-dev' && m[2] === 'upstream-lib' && G.forkMissing && m[3] === UP0) return json(404, { message: 'No commit found for SHA' });
      const c = G.commits[m[3]]; return c ? json(200, { sha: m[3], tree: { sha: c.tree }, parents: (c.parents || []).map(x => ({ sha: x })) }) : json(404, { message: 'Not Found' }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/git\/trees\/([^/]+)$/.exec(p)) && method === 'GET') { const t = G.trees[m[3]]; return t ? json(200, { sha: m[3], tree: t, truncated: false }) : json(404, { message: 'Not Found' }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/git\/blobs\/([0-9a-z]+)$/.exec(p)) && method === 'GET') { const t = G.blobs[m[3]]; return t != null ? json(200, { sha: m[3], encoding: 'base64', content: b64(t) }) : json(404, { message: 'Not Found' }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/git\/trees$/.exec(p)) && method === 'POST') { const id = 'tree' + (++G.n); G.trees[id] = body.tree; G.lastTree = { repo: m[1] + '/' + m[2], id, body }; return json(201, { sha: id }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/git\/commits$/.exec(p)) && method === 'POST') { const id = hex(1000 + (++G.n)); G.commits[id] = { tree: body.tree, parents: body.parents, message: body.message }; G.lastCommit = { repo: m[1] + '/' + m[2], id, body }; return json(201, { sha: id }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/git\/refs$/.exec(p)) && method === 'POST') { const name = body.ref.replace(/^refs\/heads\//, ''); const key = m[1] + '/' + m[2] + ':' + name; if (G.refs[key]) return json(422, { message: 'Reference already exists' }); G.refs[key] = body.sha; return json(201, { ref: body.ref, object: { sha: body.sha } }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/git\/refs\/heads\/(.+)$/.exec(p)) && method === 'PATCH') { const key = m[1] + '/' + m[2] + ':' + m[3]; if (!G.refs[key]) return json(422, { message: 'Reference does not exist' }); G.refs[key] = body.sha; return json(200, { ref: 'refs/heads/' + m[3], object: { sha: body.sha } }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/forks$/.exec(p)) && method === 'POST') { G.forked = true; return json(202, { name: 'upstream-lib', full_name: 'invented-dev/upstream-lib', owner: { login: 'invented-dev' }, html_url: 'https://github.com/invented-dev/upstream-lib' }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/merge-upstream$/.exec(p)) && method === 'POST') { G.forkMissing = false; return json(200, { message: 'Successfully fetched and fast-forwarded from upstream', merge_type: 'fast-forward' }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/pulls$/.exec(p)) && method === 'POST') { G.pr = { repo: m[1] + '/' + m[2], body }; const n = m[2] === 'tiny-app' ? 7 : 3; return json(201, { number: n, html_url: 'https://github.com/' + m[1] + '/' + m[2] + '/pull/' + n, state: 'open', draft: !!body.draft, title: body.title }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/pulls\/(\d+)$/.exec(p))) { const head = G.refs['invented-dev/tiny-app:' + (G.pr && G.pr.body.head)] || ''; return json(200, { number: +m[3], state: 'open', merged: false, mergeable_state: 'clean', head: { sha: head } }); }
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/commits\/([0-9a-z]+)\/check-runs$/.exec(p))) return json(200, { total_count: 3, check_runs: [{ status: 'completed', conclusion: 'success' }, { status: 'completed', conclusion: 'failure' }, { status: 'in_progress', conclusion: null }] });
    if ((m = /^\/repos\/([^/]+)\/([^/]+)\/compare\/([0-9a-z]+)\.\.\.([0-9a-z]+)$/.exec(p))) return json(200, { status: 'ahead', files: [
      { filename: 'app.js', status: 'modified', sha: D.newer['app.js'].sha }, { filename: 'index.html', status: 'modified', sha: D.newer['index.html'].sha }, { filename: 'NEW.md', status: 'added', sha: D.newer['NEW.md'].sha }] });
    return json(404, { message: 'Not Found (stand-in): ' + method + ' ' + p });
  };
};
const proj = (p) => p.evaluate(() => { const pr = ccProj(); if (!pr) return null; const G = pr.gh || null; return { name: pr.name, files: (pr.files || []).map(f => f.name).sort(), gh: G && { full: G.full, branch: G.branch, base: G.base.commit, work: G.work || '', head: G.head && G.head.commit, pr: G.pr || null, nLeft: G.nLeft, left: (G.left || []).map(x => x.path + ' :: ' + x.why).sort(), push: G.push, fork: G.fork || null } }; });
const env = (p) => p.evaluate(() => { const e = document.querySelector('#ccPanel [data-sec="session"] .ghx'); return e ? e.innerText.replace(/\s+/g, ' ') : ''; });
const calls = (p, re) => p.evaluate((re) => window.__gh.calls.filter(c => new RegExp(re).test(c.method + ' ' + c.path)).map(c => ({ m: c.method, p: c.path, body: c.body })), re);
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1500, height: 980 } }); await ctx.addInitScript(STAND, DATA); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(900);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.evaluate(() => { state.github = {}; saveState(); go('code'); try { closeModal(); } catch (e) {} IngR215.PANEL.session = true; IngR215.paintPanel(); }); await p.waitForTimeout(600);

  /* 1. the Environment offers GitHub; the Code page's own door says From GitHub */
  let e = await env(p);
  ok(/GitHub · work on one of your repositories/.test(e) && /Sign in and connect a repository/.test(e), 'the Environment offers a GitHub repository, as Claude\'s sessions do', e);
  await p.evaluate(() => ccWelcome()); await p.waitForTimeout(200);
  ok(await p.evaluate(() => { const b = document.querySelector('#modalBox .cc-card[data-a="github"]'); return !!b && /From GitHub/.test(b.innerText); }), 'Code\'s first choice offers From GitHub beside New app');
  await p.evaluate(() => closeModal());

  /* 2. sign in with a token, choose the repository and its branch, open it */
  await p.evaluate(() => [...document.querySelectorAll('#ccPanel .ghx .btn')].find(x => /connect a repository/i.test(x.textContent)).click()); await p.waitForTimeout(200);
  await p.fill('#ghxTok', 'ghp_wrong'); await p.click('#ghxIn'); await p.waitForTimeout(300);
  const wr = await p.evaluate(() => ({ say: document.getElementById('ghxSay').textContent, tok: state.github.token || '' }));
  ok(/refused the token|Bad credentials|401/.test(wr.say) && !wr.tok, 'a wrong token is refused, and not kept', wr);
  await p.fill('#ghxTok', 'ghp_invented_token'); await p.click('#ghxIn');
  await p.waitForFunction(() => document.querySelectorAll('#ghxList .ghx-repo').length === 2, null, { timeout: 10000 }).catch(() => {});
  let L = await p.evaluate(() => ({ login: state.github.login, rows: [...document.querySelectorAll('#ghxList .ghx-repo')].map(x => x.innerText.replace(/\s+/g, ' ')) }));
  ok(L.login === 'invented-dev' && L.rows.length === 2 && /invented-dev\/tiny-app/.test(L.rows[0]) && /cannot push here/.test(L.rows[1]), 'signed in; her repositories listed, each with its default branch, and where she cannot push it says so', L);
  await p.evaluate(() => document.querySelector('#ghxList .ghx-repo').click());
  await p.waitForFunction(() => { const s = document.getElementById('ghxBr'); return s && !s.disabled && s.options.length >= 2; }, null, { timeout: 8000 }).catch(() => {});
  const br = await p.evaluate(() => [...document.getElementById('ghxBr').options].map(o => o.value + (o.selected ? '*' : '')));
  ok(br.join(',') === 'main*,dev', 'its branches, the default chosen', br);
  await p.evaluate(() => document.getElementById('ghxGo').click());
  await p.waitForFunction(() => { const pr = ccProj(); return pr && pr.gh && pr.gh.full === 'invented-dev/tiny-app'; }, null, { timeout: 20000 }).catch(() => {});
  let P = await proj(p);
  ok(P && P.files.join(',') === 'app.js,index.html,scripts/run.sh,styles/site.css' && P.gh.base === await p.evaluate(() => window.__gh.C0), 'the branch is read as it stands: its four text files, at its newest commit', P);
  ok(P && P.gh.nLeft === 4 && P.gh.left.join(' | ') === '.env :: it may hold a secret (keys, passwords) | big/data.txt :: over 1 MB | img/logo.png :: not text (a picture, a font, an archive or a program) | node_modules/left/index.js :: a folder of installed packages or tools',
    'four left out, each with its reason: a secret, over 1 MB, a picture, installed packages', P && P.gh.left);
  ok(!(await calls(p, 'git/blobs/(png0|nm0|big0|env0)')).length, 'what is left out is never fetched (a possible secret never leaves GitHub)');
  const sess = await p.evaluate(() => ({ title: curChat().title, code: ccIsCode(curChat()), app: ccProj().name }));
  ok(sess.code && sess.title === 'tiny-app · main' && sess.app === 'tiny-app', 'a new Code session on the app, named for the repository and branch', sess);
  await p.evaluate(() => { IngR215.PANEL.session = true; IngR215.paintPanel(); }); await p.waitForTimeout(700);
  e = await env(p);
  ok(/invented-dev\/tiny-app/.test(e) && /From main at [0-9a-f]{7}/.test(e) && /4 files here · 4 left out/.test(e) && /No changes yet/.test(e), 'the Environment: repository, branch and commit, files read and left out, no changes yet', e);
  await p.screenshot({ path: OUT + '/gh_env.png' });

  /* 3. the model's tools: offered only here; status and push from its own copies, in the middle of its work */
  const T = await p.evaluate(() => ({ here: IngAgent.toolsFor(false).map(t => t.name).filter(n => /^git_|commit_and_push|open_pull_request/.test(n)), ro: IngAgent.toolsFor(true).map(t => t.name).filter(n => /^git_|commit_and_push|open_pull_request/.test(n)) }));
  ok(T.here.join(',') === 'git_status,git_diff,commit_and_push,open_pull_request' && T.ro.join(',') === 'git_status,git_diff', 'four tools in a GitHub session (two that only read, when the task only reads)', T);
  const r1 = await p.evaluate(async () => { const ws = await IngAgent.wsFor({}); window.__ws = ws;
    const ed = await IngAgent.exec(ws, 'edit', { file: 'app.js', old_text: 'greet("world")', new_text: 'greet("Ingenium")' });
    const st = await IngAgent.exec(ws, 'git_status', {}); const df = await IngAgent.exec(ws, 'git_diff', { file: 'app.js' });
    const pu = await IngAgent.exec(ws, 'commit_and_push', { message: 'Greet Ingenium\n\nThe greeting names Ingenium.' });
    return { ed: ed.text, st: st.text, df: df.text, pu: pu.text, step: pu.step && pu.step.t }; });
  ok(/Not yet pushed \(1\): changed app\.js/.test(r1.st) && /\+document\.querySelector\("h1"\)\.textContent=greet\("Ingenium"\);/.test(r1.df) && /-document\.querySelector\("h1"\)\.textContent=greet\("world"\);/.test(r1.df),
    'git_status and git_diff see the model\'s edit at once, before it is saved to the app', r1);
  const t1 = await p.evaluate(() => window.__gh.lastTree), c1 = await p.evaluate(() => window.__gh.lastCommit);
  ok(/Pushed 1 file\(s\) to invented-dev\/tiny-app, branch ingenium\//.test(r1.pu) && t1.body.base_tree === 'tree0' && t1.body.tree.length === 1 && t1.body.tree[0].path === 'app.js' && /greet\("Ingenium"\)/.test(t1.body.tree[0].content) && c1.body.parents[0] === await p.evaluate(() => window.__gh.C0),
    'commit_and_push: one commit on the branch read, with only the changed file, pushed to a branch of its own', { pu: r1.pu, tree: t1.body, commit: c1.body });
  const refs1 = await calls(p, '^(POST|PATCH) .*/git/refs');
  ok(refs1.length === 1 && refs1[0].m === 'POST' && /^refs\/heads\/ingenium\/tiny-app-[0-9a-z]{4}$/.test(refs1[0].body.ref) && !(await calls(p, 'heads/main$')).some(c => c.m !== 'GET'), 'a new branch ingenium/…; main is never written', refs1);
  /* the turn ends: its edits are saved to the app, as the working loop does */
  await p.evaluate(async () => { const pr = ccProj(), w = window.__ws.files.find(x => x.name === 'app.js'); await ccPut(ccFile(pr, 'app.js'), w.text); saveState(); });

  /* 4. her own push: a change and a removal, reviewed with their differences, then the pull request */
  await p.evaluate(async () => { const pr = ccProj(); await ccPut(ccFile(pr, 'styles/site.css'), 'h1{color:#4e2c8a;font-family:Georgia,serif}\n'); pr.files = pr.files.filter(f => f.name !== 'scripts/run.sh'); saveState(); IngR215.paintPanel(); });
  await p.waitForTimeout(700); e = await env(p);
  ok(/2 files to push/.test(e) && /3 differ from main/.test(e), 'the Environment counts what waits to be pushed and what differs from main', e);
  await p.evaluate(() => IngGitHubCode.paintTop(true)); await p.waitForTimeout(500);
  let tk = await p.evaluate(() => { const k = document.getElementById('ghxTopKey'); return k && !k.hidden ? k.textContent : ''; });
  ok(/⑂ Push\s*2/.test(tk), 'the session\'s top row: Push, with the number of files', tk);
  await p.evaluate(() => [...document.querySelectorAll('#ccPanel .ghx .btn')].find(x => x.textContent === 'Review and push').click()); await p.waitForTimeout(600);
  const sh = await p.evaluate(() => ({ rows: [...document.querySelectorAll('#ghxF li')].map(x => x.innerText.replace(/\s+/g, ' ')), msg: document.getElementById('ghxMsg').value, head: document.querySelector('.ghx-sheet p').innerText }));
  ok(sh.rows.length === 2 && sh.rows.some(r => /styles\/site\.css changed \+1 −1/.test(r)) && sh.rows.some(r => /scripts\/run\.sh removed \+0 −2/.test(r)) && /main itself is not changed/.test(sh.head), 'Review and push: each file with its lines added and removed; main is not changed', sh);
  await p.evaluate(() => [...document.querySelectorAll('#ghxF li button')][0].click()); await p.waitForTimeout(150);
  ok(/@@ -1 \+1 @@/.test(await p.evaluate(() => document.getElementById('ghxD').textContent)), 'Show opens the unified difference');
  await p.fill('#ghxMsg', 'Restyle the heading; drop the shell script'); await p.click('#ghxGo');
  await p.waitForFunction(() => !!document.getElementById('ghxT'), null, { timeout: 8000 }).catch(() => {});
  const t2 = await p.evaluate(() => window.__gh.lastTree), c2 = await p.evaluate(() => window.__gh.lastCommit), refs2 = await calls(p, '^PATCH .*/git/refs');
  ok(t2.body.tree.length === 2 && t2.body.tree.some(x => x.path === 'scripts/run.sh' && x.sha === null && x.mode === '100755') && t2.body.tree.some(x => x.path === 'styles/site.css' && /Georgia/.test(x.content)) && c2.body.parents[0] === c1.id && refs2.length === 1 && refs2[0].body.force === false,
    'the second push: the change and the removal, on top of the first push, moving the branch without force', { tree: t2.body, parents: c2.body.parents, refs2 });
  const prs = await p.evaluate(() => ({ t: document.getElementById('ghxT').value, b: document.getElementById('ghxB').value }));
  ok(/Restyle the heading/.test(prs.t), 'after a push, the pull request is offered, its title from the commit', prs);
  tk = await p.evaluate(() => { IngGitHubCode.paintTop(true); return new Promise(r => setTimeout(() => { const k = document.getElementById('ghxTopKey'); r(k && !k.hidden ? k.textContent : ''); }, 400)); });
  ok(/Create PR/.test(tk), 'pushed, the top row offers Create PR', tk);
  await p.click('#ghxGo'); await p.waitForTimeout(800);
  const pr1 = await p.evaluate(() => window.__gh.pr); P = await proj(p);
  ok(pr1 && pr1.repo === 'invented-dev/tiny-app' && /^ingenium\/tiny-app-/.test(pr1.body.head) && pr1.body.base === 'main' && P.gh.pr && P.gh.pr.number === 7, 'Create pull request: from the session\'s branch into main', { pr1, mine: P.gh.pr });
  await p.evaluate(() => IngR215.paintPanel()); await p.waitForTimeout(700); e = await env(p);
  ok(/Pull request #7 open/.test(e) && /1 passed/.test(e) && /1 failed/.test(e) && /1 running/.test(e) && /Last push: [0-9a-f]{7}/.test(e) && /Everything is pushed/.test(e), 'the Environment follows the pull request: open, its checks, the last push', e);
  await p.screenshot({ path: OUT + '/gh_pr.png' });
  const again = await p.evaluate(async () => (await IngAgent.exec(window.__ws, 'open_pull_request', { title: 'x', body: 'y' })).text);
  ok(/already open/.test(again), 'the model is told the pull request is already open', again);
  tk = await p.evaluate(() => { IngGitHubCode.paintTop(true); return new Promise(r => setTimeout(() => { const k = document.getElementById('ghxTopKey'); r(k && !k.hidden ? k.textContent : ''); }, 400)); });
  ok(/PR #7/.test(tk), 'and then the pull request itself, by its number', tk);
  const sys = await p.evaluate(() => chatSystemPrompt(20000));
  ok(/GitHub repository invented-dev\/tiny-app, opened from the branch main/.test(sys) && /never to main/.test(sys) && /Never say that you pushed/.test(sys), 'the model is told where it works, where its changes go, and not to claim a push it did not make');

  /* 5. a repository she cannot push to: her own copy, brought up to date, and the pull request from it */
  await p.evaluate(() => IngGitHubCode.open({ owner: 'someone', repo: 'upstream-lib' }));
  await p.waitForFunction(() => { const pr = ccProj(); return pr && pr.gh && pr.gh.full === 'someone/upstream-lib'; }, null, { timeout: 15000 }).catch(() => {});
  await p.evaluate(async () => { const pr = ccProj(); await ccPut(ccFile(pr, 'README.md'), '# Upstream\n\nA line from Ingenium.\n'); saveState(); });
  const f1 = await p.evaluate(async () => { try { await IngGitHubCode.push(ccProj(), 'Add a line'); return 'pushed?'; } catch (e) { return (e.needFork ? 'NEEDFORK ' : '') + e.message; } });
  ok(/^NEEDFORK You cannot push to someone\/upstream-lib/.test(f1), 'where she cannot push, nothing is pushed: Ingenium offers her own copy', f1);
  const f2 = await p.evaluate(async () => { const r = await IngGitHubCode.push(ccProj(), 'Add a line', { fork: true }); const pr = await IngGitHubCode.pullRequest(ccProj(), { title: 'Add a line', body: 'From Ingenium.' }); return { r, pr, gh: window.__gh.pr }; });
  ok(f2.r.where === 'invented-dev/upstream-lib' && (await calls(p, 'POST /repos/someone/upstream-lib/forks')).length === 1 && (await calls(p, 'merge-upstream')).length === 1 && f2.gh.repo === 'someone/upstream-lib' && /^invented-dev:ingenium\//.test(f2.gh.body.head),
    'her copy (a fork) is made and brought up to date, the push goes there, and the pull request asks the original to take it', f2);

  /* 6. Update from GitHub: newer work comes into the files she has not changed; hers are kept, and named */
  await p.evaluate(() => IngGitHubCode.open({ owner: 'invented-dev', repo: 'tiny-app' }));
  await p.waitForFunction(() => { const pr = ccProj(); return pr && pr.gh && pr.gh.full === 'invented-dev/tiny-app' && !pr.gh.head; }, null, { timeout: 15000 }).catch(() => {});
  await p.evaluate(async () => { const pr = ccProj(); await ccPut(ccFile(pr, 'index.html'), '<!doctype html><html><body><h1>Mine</h1></body></html>\n'); saveState(); window.__gh.refs['invented-dev/tiny-app:main'] = window.__gh.C2; });
  const up = await p.evaluate(async () => { const r = await IngGitHubCode.update(ccProj()); const pr = ccProj(); await ccLoadAll(pr); return { r, app: ccFile(pr, 'app.js').text, idx: ccFile(pr, 'index.html').text, nw: (ccFile(pr, 'NEW.md') || {}).name || '', base: pr.gh.base.commit }; });
  ok(up.r.done.sort().join('|') === 'added NEW.md|updated app.js' && up.r.kept.join('|') === 'index.html' && /Hello there/.test(up.app) && /Mine/.test(up.idx) && up.nw === 'NEW.md' && up.base === await p.evaluate(() => window.__gh.C2),
    'Update from GitHub: app.js updated and NEW.md added; her index.html kept and named; the session now starts from the newer commit', up);
  const st2 = await p.evaluate(async () => (await IngGitHubCode.changes(ccProj())).files.map(x => x.how + ' ' + x.path));
  ok(st2.join('|') === 'changed index.html', 'after the update only her own change differs from main', st2);

  /* 6b. commands after a slash: the menu, /status, /review; and naming the branch before the first push */
  await p.evaluate(() => { go('code'); const i = document.getElementById('chatInput'); i.focus(); });
  await p.fill('#chatInput', '/st'); await p.waitForTimeout(200);
  const menu = await p.evaluate(() => { const m = document.getElementById('ghxCmds'); return m && !m.hidden ? [...m.querySelectorAll('.ghx-cmd')].map(x => x.innerText.replace(/\s+/g, ' ')) : []; });
  ok(menu.length === 1 && /^\/status What differs from GitHub/.test(menu[0]), 'typing /st offers /status, with what it does', menu);
  await p.press('#chatInput', 'Enter'); await p.waitForTimeout(500);
  const ss = await p.evaluate(() => { const s = document.querySelector('.ghx-sheet'); return s ? s.innerText.replace(/\s+/g, ' ') : ''; });
  ok(/To push \(1\): index\.html changed/.test(ss) && /Different from main \(1\)/.test(ss) && await p.evaluate(() => document.getElementById('chatInput').value === ''), '/status shows what waits and what differs, and nothing is sent to the model', ss);
  await p.evaluate(() => closeModal());
  await p.fill('#chatInput', '/'); await p.waitForTimeout(150);
  const all = await p.evaluate(() => [...document.querySelectorAll('#ghxCmds .ghx-cmd')].map(x => x.firstChild.textContent));
  ok(all.join(' ') === '/status /diff /push /pr /review /update', 'a slash alone lists every command', all);
  await p.fill('#chatInput', '/review'); await p.press('#chatInput', 'Enter'); await p.waitForTimeout(600);
  const rv = await p.evaluate(() => { const ms = curMsgs().filter(m => m.role === 'me'); return ms.length ? ms[ms.length - 1].text : ''; });
  ok(/^Review the changes of this session against main: use git_status and git_diff/.test(rv) && /Do not change any file\./.test(rv), '/review asks the model to review the changes against main, without changing a file', rv);
  try { await p.evaluate(() => { try { chatStop(); } catch (e) {} }); } catch (e) {}
  await p.evaluate(() => IngGitHubCode.connect && null);
  await p.evaluate(() => { const pr = ccProj(); delete pr.gh.work; }); 
  await p.evaluate(() => [...document.querySelectorAll('#ccPanel .ghx .btn')].find(x => x.textContent === 'Review and push') ? [...document.querySelectorAll('#ccPanel .ghx .btn')].find(x => x.textContent === 'Review and push').click() : null);
  await p.evaluate(() => { if (!document.getElementById('ghxBrName')) { IngR215.PANEL.session = true; IngR215.paintPanel(); } }); await p.waitForTimeout(600);
  if (!(await p.evaluate(() => !!document.getElementById('ghxBrName')))) { await p.evaluate(() => [...document.querySelectorAll('#ccPanel .ghx .btn')].find(x => x.textContent === 'Review and push').click()); await p.waitForTimeout(600); }
  const bn0 = await p.evaluate(() => (document.getElementById('ghxBrName') || {}).value || '');
  ok(/^ingenium\/[a-z0-9-]+-[0-9a-z]{4}$/.test(bn0), 'before the first push, the branch\'s name is proposed and can be changed', bn0);
  await p.fill('#ghxBrName', 'bad name'); await p.click('#ghxGo'); await p.waitForTimeout(200);
  ok(/no spaces/.test(await p.evaluate(() => document.getElementById('ghxSay').textContent)), 'a name GitHub would refuse is caught before anything is sent');
  await p.fill('#ghxBrName', 'main'); await p.click('#ghxGo'); await p.waitForTimeout(200);
  ok(/not main itself/.test(await p.evaluate(() => document.getElementById('ghxSay').textContent)), 'and main itself is refused: the work goes to a branch of its own');
  await p.fill('#ghxBrName', 'ingenium/my-heading'); await p.click('#ghxGo'); await p.waitForTimeout(900);
  const say3 = await p.evaluate(() => (document.getElementById('ghxSay') || {}).textContent || '');
  const nb = await calls(p, '^POST .*/git/refs$');
  ok(nb.some(c => c.body.ref === 'refs/heads/ingenium/my-heading'), 'the branch she named is the one made', { refs: nb.map(c => c.body.ref), say: say3 });
  await p.evaluate(() => { try { closeModal(); } catch (e) {} });

  /* 7. a session without a repository is offered none of the four tools; Disconnect keeps the files and touches nothing on GitHub */
  const before = await p.evaluate(() => window.__gh.calls.length);
  await p.evaluate(() => { IngR215.PANEL.session = true; IngR215.paintPanel(); }); await p.waitForTimeout(500);
  await p.evaluate(() => [...document.querySelectorAll('#ccPanel .ghx .btn')].find(x => x.textContent === 'Disconnect').click()); await p.waitForTimeout(200);
  await p.evaluate(() => { const b = [...document.querySelectorAll('.ing-ask .btn')].find(x => x.textContent === 'Disconnect'); if (b) b.click(); }); await p.waitForTimeout(500);
  const dc = await p.evaluate(() => ({ gh: !!ccProj().gh, files: ccProj().files.length, tools: IngAgent.toolsFor(false).map(t => t.name).filter(n => /^git_|commit_and_push|open_pull_request/.test(n)) }));
  const after = await p.evaluate(() => window.__gh.calls.filter(c => c.method !== 'GET').length);
  ok(!dc.gh && dc.files === 5 && !dc.tools.length && (await p.evaluate((n) => window.__gh.calls.slice(n).filter(c => c.method !== 'GET').length, before)) === 0, 'Disconnect: the files stay, the tools go, nothing is sent to GitHub', dc);
  e = await env(p); ok(/Connect a repository/.test(e), 'and the Environment offers a repository again', e);

  /* 8. a phone: the Environment fits */
  await p.setViewportSize({ width: 390, height: 844 }); await p.evaluate(() => { IngR215.PANEL.session = true; IngR215.paintPanel(); }); await p.waitForTimeout(500);
  const ph = await p.evaluate(() => { const W = document.documentElement.clientWidth, g = document.querySelector('#ccPanel .ghx'); if (!g) return { none: true }; const bad = [...g.querySelectorAll('*')].filter(x => { const r = x.getBoundingClientRect(); return r.width && r.right > W + 1; }).map(x => x.className || x.tagName); return { W, bad }; });
  ok(ph.none || !ph.bad.length, 'on a phone, the Environment\'s GitHub part fits the screen', ph);

  await p.setViewportSize({ width: 1500, height: 980 }); await p.evaluate(() => go('guide')); await p.waitForTimeout(400);
  const gd = await p.evaluate(() => { const g = document.getElementById('ghxGuide'); return g ? [...g.querySelectorAll('dt')].map(x => x.textContent) : null; });
  ok(gd && gd.join('|') === 'Connect|What is read|Changes|Push|Pull request|Update from GitHub|Commands|The model', 'the Guide explains it, for a refresher', gd);
  ok(!errs.length, 'no errors on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})();
