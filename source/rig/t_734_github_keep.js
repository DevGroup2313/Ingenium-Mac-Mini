// Ingenium 7.34: a GitHub session in Code keeps a copy in Fabrica, linked and with its history (modules/r312.js ghKeep, with r114's link
// and bring and r219's changes). Her answer (17 November 2026), asked what Keep in Fabrica should make of a Code session opened From
// GitHub: "Linked, with history".
//   node rig/t_734_github_keep.js <Ingenium page url> <out folder>
// GitHub is stood in for inside the test's browser (page.route on api.github.com): an invented repository, harbour/tide-clock, of two
// versions with real git ids (computed here as git does), holding index.html, style.css, README.md, docs/notes.md and a picture,
// logo.png. Nothing reaches the real GitHub. The session is opened as Code opens one (IngGitHubCode.open, From GitHub), then changed:
// style.css changed, app.js added, README.md removed. Checks:
//   - Code's keys in the session include Keep in Fabrica; its sheet offers a new app "with its versions from GitHub", linked;
//   - kept: a new app in Fabrica, linked to harbour/tide-clock on main (state.fabrica.remote), with GitHub's two versions under their own
//     git ids, and one more on top: what the session changed (style.css, app.js, README.md removed), the rest as GitHub has it (the
//     picture, which the session never read, kept byte for byte; docs/notes.md);
//   - Fabrica's GitHub part sees it one version ahead of GitHub, not diverged (so Send works at once);
//   - the done sheet says it is linked, with 2 versions from GitHub and 3 files changed on top;
//   - Code's session is linked to the app; kept again after another change, the sheet chooses that app, and only the changed file goes
//     there, as one more version;
//   - GitHub not answering: kept as a copy of its own, linked, and the sheet says why and how to try again;
//   - without a GitHub sign-in the sheet says so, and the copy is the plain one, as before;
//   - no page errors, and no request leaves for any GitHub address but the stand-in's.
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), crypto = require('crypto');
const [U, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
function ok(c, name, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + name + (info !== undefined ? '  ' + JSON.stringify(info).slice(0, 500) : '')); }

/* ---------- the invented repository, as git makes it ---------- */
const OBJ = {};   // sha -> {type, body(Buffer), json}
function put(type, body) { const sha = crypto.createHash('sha1').update(Buffer.concat([Buffer.from(type + ' ' + body.length + '\0'), body])).digest('hex'); OBJ[sha] = { type, body }; return sha; }
function blob(s) { return put('blob', Buffer.isBuffer(s) ? s : Buffer.from(s, 'utf8')); }
function tree(ents) {   // ents: [{name, mode, sha}] sorted as git sorts (a tree's name with a slash after it)
  ents = ents.slice().sort((a, b) => { const x = a.name + (a.mode === '40000' ? '/' : ''), y = b.name + (b.mode === '40000' ? '/' : ''); return x < y ? -1 : x > y ? 1 : 0; });
  const sha = put('tree', Buffer.concat(ents.map(e => Buffer.concat([Buffer.from(e.mode + ' ' + e.name + '\0'), Buffer.from(e.sha, 'hex')]))));
  OBJ[sha].ents = ents; return sha;
}
function commit(treeSha, parents, msg, when) {
  const id = 'Ada Harbour <ada@example.org> ' + when + ' +0000';
  const body = Buffer.from('tree ' + treeSha + '\n' + parents.map(p => 'parent ' + p + '\n').join('') + 'author ' + id + '\ncommitter ' + id + '\n\n' + msg + '\n');
  const sha = put('commit', body); Object.assign(OBJ[sha], { tree: treeSha, parents, msg: msg + '\n', when }); return sha;
}
const PNG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137]);
const b = { index: blob('<!doctype html><title>Tide Clock</title><link rel="stylesheet" href="style.css"><h1>Tide Clock</h1>'), readme: blob('# Tide Clock\n'),
  logo: blob(PNG), notes: blob('High water at noon.\n'), style1: blob('h1{color:navy}') };
const docs = tree([{ name: 'notes.md', mode: '100644', sha: b.notes }]);
const t1 = tree([{ name: 'index.html', mode: '100644', sha: b.index }, { name: 'README.md', mode: '100644', sha: b.readme }, { name: 'logo.png', mode: '100644', sha: b.logo }, { name: 'docs', mode: '40000', sha: docs }]);
const C1 = commit(t1, [], 'First version', 1762768800);
const t2 = tree(OBJ[t1].ents.concat([{ name: 'style.css', mode: '100644', sha: b.style1 }]));
const C2 = commit(t2, [C1], 'Its colours', 1762855200);
const HEAD = { main: C2 };
function iso(t) { return new Date(t * 1000).toISOString().replace(/\.000Z$/, 'Z'); }
function treeJson(sha, recursive, prefix) {
  const out = []; for (const e of OBJ[sha].ents) { const isT = e.mode === '40000'; const path = (prefix || '') + e.name;
    out.push({ path, mode: isT ? '040000' : e.mode, type: isT ? 'tree' : 'blob', sha: e.sha, size: isT ? undefined : OBJ[e.sha].body.length });
    if (isT && recursive) out.push(...treeJson(e.sha, true, path + '/')); }
  return out;
}
let down = false; const seen = [];
async function github(route) {
  const url = new URL(route.request().url()); seen.push(url.pathname);
  const json = (code, o) => route.fulfill({ status: code, contentType: 'application/json; charset=utf-8', body: JSON.stringify(o) });
  if (down && /\/git\//.test(url.pathname)) return json(503, { message: 'Service unavailable' });
  const m = url.pathname.match(/^\/repos\/harbour\/tide-clock(.*)$/); if (!m) return json(404, { message: 'Not Found' });
  const rest = m[1];
  if (rest === '') return json(200, { name: 'tide-clock', full_name: 'harbour/tide-clock', owner: { login: 'harbour' }, default_branch: 'main', html_url: 'https://github.com/harbour/tide-clock', private: false, permissions: { push: true } });
  let x;
  if ((x = rest.match(/^\/git\/ref\/heads\/(.+)$/))) return HEAD[x[1]] ? json(200, { ref: 'refs/heads/' + x[1], object: { sha: HEAD[x[1]], type: 'commit' } }) : json(404, { message: 'Not Found' });
  if ((x = rest.match(/^\/git\/commits\/([0-9a-f]{40})$/)) && OBJ[x[1]]) { const c = OBJ[x[1]], who = { name: 'Ada Harbour', email: 'ada@example.org', date: iso(c.when) };
    return json(200, { sha: x[1], tree: { sha: c.tree }, parents: c.parents.map(p => ({ sha: p })), message: c.msg.replace(/\n$/, ''), author: who, committer: who }); }
  if ((x = rest.match(/^\/git\/trees\/([0-9a-f]{40})$/)) && OBJ[x[1]]) return json(200, { sha: x[1], tree: treeJson(x[1], url.searchParams.get('recursive') === '1'), truncated: false });
  if ((x = rest.match(/^\/git\/blobs\/([0-9a-f]{40})$/)) && OBJ[x[1]]) return json(200, { sha: x[1], size: OBJ[x[1]].body.length, encoding: 'base64', content: OBJ[x[1]].body.toString('base64') });
  return json(404, { message: 'Not Found' });
}

(async () => {
  const br = await pw.chromium.launch(); const ctx = await br.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); p.setDefaultTimeout(240000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const elsewhere = []; p.on('request', r => { const u = r.url(); if (/github/i.test(u) && !/^https:\/\/api\.github\.com\//.test(u)) elsewhere.push(u); });
  await p.route('https://api.github.com/**', github);
  await p.goto(U, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  /* signed in (a token the stand-in accepts), Fabrica's page built once, then the session opened From GitHub, as Code opens one */
  await p.evaluate(async () => { state.github = state.github || {}; state.github.token = 'test-token'; state.github.login = 'harbour'; try { saveState(); } catch (e) {} go('fabrica'); });
  await p.waitForTimeout(2000);
  const opened = await p.evaluate(async () => { const pr = await IngGitHubCode.open({ owner: 'harbour', repo: 'tide-clock', branch: 'main' }); go('code'); return { id: pr.id, files: pr.files.map(f => f.name).sort(), left: (pr.gh.left || []).map(x => x.path) }; });
  ok(opened.files.join() === 'README.md,docs/notes.md,index.html,style.css' && opened.left.includes('logo.png'), 'the session is opened From GitHub, as Code opens one (the picture left out: not text)', opened);
  /* the session's work */
  await p.evaluate(async id => { const pr = state.projects.find(x => x.id === id); await ccLoadAll(pr);
    await ccPut(pr.files.find(f => f.name === 'style.css'), 'h1{color:teal}');
    const nf = { name: 'app.js', ref: null, size: 0 }; pr.files.push(nf); await ccPut(nf, 'console.log("tide")');
    pr.files = pr.files.filter(f => f.name !== 'README.md'); try { saveState(); ccPaintHead(); } catch (e) {} }, opened.id);
  await p.waitForTimeout(800);
  const keys = await p.evaluate(() => [...document.querySelectorAll('#ccCodeBar button')].filter(x => x.offsetParent).map(x => x.textContent.trim()));
  ok(keys.includes('Keep in Fabrica'), "the session's keys include Keep in Fabrica", keys);
  async function sheet() { await p.click('#ccCodeBar .r312-k'); await p.waitForSelector('#r312Sheet', { timeout: 10000 }); await p.waitForTimeout(500);
    return p.evaluate(() => ({ rows: [...document.querySelectorAll('#r312List .cc-prow')].map(b => [b.getAttribute('data-k'), b.innerText.replace(/\s+/g, ' '), b.getAttribute('aria-pressed')]), go: document.getElementById('r312Go').textContent })); }
  async function keepIt(pick) { if (pick) await p.click('#r312List .cc-prow[data-k="' + pick + '"]'); await p.click('#r312Go');
    await p.waitForFunction(() => /Kept in Fabrica/.test((document.getElementById('r312Sheet') || {}).innerText || ''), null, { timeout: 120000 }); await p.waitForTimeout(400);
    const t = await p.evaluate(() => document.getElementById('r312Sheet').innerText.replace(/\s+/g, ' ')); await p.screenshot({ path: OUT + '/kept_' + (++shots) + '.png' }); await p.evaluate(() => closeModal()); return t; }
  let shots = 0;
  const s1 = await sheet();
  ok(s1.rows[0][0] === 'new' && /With its versions from GitHub \(harbour\/tide-clock, main\), linked to it/.test(s1.rows[0][1]) && s1.rows[0][2] === 'true', 'its sheet offers a new app with its versions from GitHub, linked, chosen', s1);
  const t1 = await keepIt();
  const app = await p.evaluate(async () => { const r = (await IngRepo.list()).find(x => x.name === 'tide-clock'); if (!r) return null;
    const log = await IngRepo.log(r.id, { max: 20 }); const files = await IngRepo.files(r.id); const L = state.fabrica.remote[r.id];
    const text = {}; for (const f of files) if (!/\.png$/.test(f.path)) text[f.path] = await IngRepo.readText(r.id, f.path);
    const logo = Array.from(await IngRepo.read(r.id, 'logo.png') || []);
    let cmp = null; try { cmp = await fbGitHub.compare(await IngRepo.info(r.id), L); } catch (e) { cmp = { err: String(e.message || e) }; }
    return { id: r.id, branch: r.branch, log: log.map(c => [c.oid, (c.message || c.msg || '').trim()]), files: files.map(f => f.path), text, logo, L: L && { owner: L.owner, repo: L.repo, branch: L.branch, rmap: L.rmap }, cmp: cmp && { toSend: cmp.toSend, diverged: cmp.diverged, same: cmp.same, theirs: cmp.theirs, err: cmp.err } }; });
  ok(!!app && app.L && app.L.owner === 'harbour' && app.L.repo === 'tide-clock' && app.L.branch === 'main', 'kept: a new app in Fabrica, linked to harbour/tide-clock on main', app && app.L);
  const ids = app ? app.log.map(x => x[0]) : [];
  const own = sha => ids.includes(sha) || !!(app && app.L.rmap && ids.includes(app.L.rmap[sha]));
  ok(app && app.log.length === 3 && own(C1) && own(C2) && app.log[1][1] === 'Its colours' && app.log[2][1] === 'First version', "with GitHub's two versions (under their own git ids), and one more on top", { log: app && app.log, C1, C2, exact: ids.includes(C1) && ids.includes(C2) });
  ok(app && app.text['style.css'] === 'h1{color:teal}' && app.text['app.js'] === 'console.log("tide")' && !app.files.includes('README.md'), 'on top: what the session changed (style.css changed, app.js added, README.md removed)', app && app.files);
  ok(app && app.text['docs/notes.md'] === 'High water at noon.\n' && JSON.stringify(app.logo) === JSON.stringify(Array.from(PNG)) && app.text['index.html'] === OBJ[b.index].body.toString(), 'the rest as GitHub has it: docs/notes.md, index.html, and the picture the session never read, byte for byte', app && app.files);
  ok(app && app.cmp && app.cmp.toSend === 1 && !app.cmp.diverged && !app.cmp.err, "Fabrica's GitHub part sees it one version ahead of GitHub, not diverged: Send works at once", app && app.cmp);
  ok(/Linked to harbour\/tide-clock \(main\) on GitHub, with its 2 versions from there; on top, what this session changed \(3 files\)/.test(t1), 'the done sheet says so: linked, 2 versions from GitHub, 3 files changed on top', t1);
  const linked = await p.evaluate(([pid, aid]) => state.fabrica.linksBack && state.fabrica.linksBack[pid] === aid, [opened.id, app && app.id]);
  ok(linked, "Code's session is linked to the app");
  /* kept again after another change: that app, only that file */
  await p.evaluate(async id => { const pr = state.projects.find(x => x.id === id); await ccLoadAll(pr); await ccPut(pr.files.find(f => f.name === 'index.html'), '<!doctype html><title>Tide Clock</title><h1>Tide Clock, by the hour</h1>'); try { saveState(); } catch (e) {} }, opened.id);
  const s2 = await sheet();
  const chosen = s2.rows.find(r => r[2] === 'true');
  ok(chosen && chosen[0] === (app && app.id) && /Linked to this work/.test(chosen[1]), 'kept again, the sheet chooses that app', s2.rows);
  const t2 = await keepIt();
  const again = await p.evaluate(async id => { const log = await IngRepo.log(id, { max: 20 }); return { n: log.length, idx: await IngRepo.readText(id, 'index.html'), css: await IngRepo.readText(id, 'style.css'), notes: await IngRepo.readText(id, 'docs/notes.md'), logo: !!(await IngRepo.read(id, 'logo.png')) }; }, app && app.id);
  ok(again.n === 4 && /by the hour/.test(again.idx) && again.css === 'h1{color:teal}' && again.notes && again.logo, 'only the changed file goes there, as one more version (the picture and docs/notes.md still there)', again);
  /* GitHub not answering: kept as a copy of its own, linked, and told */
  down = true;
  await sheet(); await p.click('#r312List .cc-prow[data-k="new"]'); await p.fill('#r312Name', 'tide-clock offline');
  const t3 = await keepIt();
  const off = await p.evaluate(async () => { const r = (await IngRepo.list()).find(x => x.name === 'tide-clock offline'); if (!r) return null; const L = state.fabrica.remote[r.id]; return { files: (await IngRepo.files(r.id)).map(f => f.path), n: (await IngRepo.log(r.id, { max: 9 })).length, linked: !!(L && L.repo === 'tide-clock') }; });
  ok(off && off.n === 1 && off.files.includes('app.js') && off.files.includes('style.css') && off.linked && /could not be brought from GitHub/.test(t3) && /Bring from GitHub/.test(t3), "GitHub not answering: kept as a copy of its own, linked, and the sheet says why and how to try again", { off, t3 });
  down = false;
  /* without a GitHub sign-in */
  await p.evaluate(() => { delete state.github.token; });
  const s4 = await sheet();
  ok(/sign in to GitHub in Fabrica to bring its versions too/.test(s4.rows[0][1]), 'without a GitHub sign-in the sheet says so', s4.rows[0]);
  await p.click('#r312List .cc-prow[data-k="new"]'); await p.fill('#r312Name', 'tide-clock plain');
  const t4 = await keepIt();
  const plain = await p.evaluate(async () => { const r = (await IngRepo.list()).find(x => x.name === 'tide-clock plain'); return r ? { n: (await IngRepo.log(r.id, { max: 9 })).length, remote: !!state.fabrica.remote[r.id] } : null; });
  ok(plain && plain.n === 1 && !plain.remote && !/GitHub/.test(t4), 'and the copy is the plain one, as before', { plain, t4 });
  ok(errs.length === 0, 'no page errors', errs);
  ok(elsewhere.length === 0, "no request leaves for any GitHub address but the stand-in's", elsewhere.slice(0, 5));
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await br.close(); process.exit(fail ? 1 : 0);
})();
