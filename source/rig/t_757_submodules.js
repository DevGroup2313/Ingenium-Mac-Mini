// node rig/t_757_submodules.js <Ingenium page url> <out folder>
// Ingenium 7.57 · a repository with submodules keeps them in every version Fabrica makes (modules/r110.js: linksOf, mergeLinks, writeTrees
// with the links; IngRepo.links). Until 7.57 a version kept in Ingenium on such a repository dropped them (git's mode 160000 entries were
// never part of the work, and each new version was written from the work alone). Made by git itself: a repository (Tide Clock) with a
// submodule (lib, from a second repository), an idea that moves the submodule on, and one that changes a file. Brought into Ingenium from
// git's bundle; then kept, merged, undone, picked, kept on a branch of its own, put aside and rebased with Fabrica's engine; then sent back
// out as a bundle, cloned by git and read by git: every version keeps lib, at the version each step should leave it at; git fsck content.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_757_submodules.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; return !!c; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const T = fs.mkdtempSync(path.join(OUT, 'git-'));
const ENV = Object.assign({}, process.env, { GIT_CONFIG_NOSYSTEM: '1', GIT_AUTHOR_NAME: 'Ada Ferreira', GIT_AUTHOR_EMAIL: 'ada@example.invalid', GIT_COMMITTER_NAME: 'Ada Ferreira', GIT_COMMITTER_EMAIL: 'ada@example.invalid' });
const git = (cwd, args) => cp.execFileSync('git', ['-c', 'protocol.file.allow=always'].concat(args), { cwd, env: ENV, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const put = (dir, rel, text) => { const f = path.join(dir, ...rel.split('/')); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); };
(async () => {
  // the submodule's own repository, and the repository that holds it, as git makes them
  const LIB = path.join(T, 'lib-src'), M = path.join(T, 'tide');
  fs.mkdirSync(LIB); git(LIB, ['init', '-q', '-b', 'main']); put(LIB, 'moon.js', 'export const moon = "waxing";\n'); git(LIB, ['add', '-A']); git(LIB, ['commit', '-qm', 'lib one']);
  const L1 = git(LIB, ['rev-parse', 'HEAD']).trim();
  fs.mkdirSync(M); git(M, ['init', '-q', '-b', 'main']); put(M, 'README.md', '# Tide Clock\n\nHigh water, twice a day.\n');
  git(M, ['submodule', 'add', '-q', LIB, 'lib']); git(M, ['add', '-A']); git(M, ['commit', '-qm', 'The first version, with lib']);
  put(LIB, 'moon.js', 'export const moon = "full";\n'); git(LIB, ['commit', '-qam', 'lib two']); const L2 = git(LIB, ['rev-parse', 'HEAD']).trim();
  git(M, ['checkout', '-qb', 'pointer']); git(path.join(M, 'lib'), ['pull', '-q', 'origin', 'main']); git(M, ['add', 'lib']); git(M, ['commit', '-qm', 'lib moves on']);
  const MOVE = git(M, ['rev-parse', 'HEAD']).trim();
  git(M, ['checkout', '-q', 'main']); git(M, ['submodule', 'update', '-q']);
  git(M, ['checkout', '-qb', 'words']); put(M, 'notes.md', 'a note\n'); git(M, ['add', 'notes.md']); git(M, ['commit', '-qm', 'A note']); git(M, ['checkout', '-q', 'main']);
  git(M, ['bundle', 'create', path.join(T, 'tide.bundle'), '--all']);
  const lsLib = (dir, ref) => { const l = git(dir, ['ls-tree', ref, 'lib']).trim(); const m = /^160000 commit ([0-9a-f]{40})\tlib$/.exec(l); return m ? m[1] : (l || null); };
  ok(lsLib(M, 'main') === L1 && lsLib(M, 'pointer') === L2, 'git made the repository: lib at "lib one" on main, at "lib two" on pointer', { main: lsLib(M, 'main'), pointer: lsLib(M, 'pointer') });

  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1360, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 300)));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(900);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
    await sleep(800);
    const b64 = fs.readFileSync(path.join(T, 'tide.bundle')).toString('base64');
    const id = await p.evaluate(async (b64) => { IngRepo.setAuthor({ name: 'Theo', email: 'theo@example.invalid' }); const bin = atob(b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      return (await IngRepo.fromBundle(u8, { name: 'Tide Clock' })).id; }, b64);
    // before 7.57 there is no IngRepo.links: the checks read {} and fail, and the test goes on to git's own reading at the end
    const links = (ref) => p.evaluate((a) => (typeof IngRepo.links === 'function' ? IngRepo.links(a[0], a[1]) : {}), [id, ref || null]);
    const R = await p.evaluate(async (id) => ({ has: typeof IngRepo.links === 'function', st: await IngRepo.status(id) }), id);
    ok(R.has, 'IngRepo.links is there');
    ok(JSON.stringify(await links()) === JSON.stringify({ lib: L1 }) && R.st.clean, '1. brought in from git\'s bundle: lib at "lib one"; nothing waits (a submodule is never a file of the work)', { links: await links(), st: R.st });
    // 2. keep a change
    await p.evaluate(async (id) => { await IngRepo.put(id, 'README.md', '# Tide Clock\n\nHigh water, twice a day, by the harbour.\n'); await IngRepo.commit(id, 'The harbour'); }, id);
    ok(JSON.stringify(await links()) === JSON.stringify({ lib: L1 }), '2. a version kept in Ingenium keeps lib, at the same version', await links());
    // 3. merge the idea that moves lib on
    const mg = await p.evaluate(async (id) => { try { return await IngRepo.merge(id, 'pointer'); } catch (e) { return { e: String(e.message || e) }; } }, id);
    ok(mg && mg.kind === 'merged' && (await links()).lib === L2, '3. merging the idea that moved lib on: the merge keeps lib at "lib two"', { mg, links: await links() });
    // 4. undo the version that moved it
    const un = await p.evaluate(async (a) => { try { return await IngRepo.revert(a[0], a[1]); } catch (e) { return { e: String(e.message || e) }; } }, [id, MOVE]);
    ok(un && un.kind === 'undone' && (await links()).lib === L1, '4. undoing the version that moved lib: lib is back at "lib one"', { un, links: await links() });
    // 5. pick it onto the idea "words"
    const pk = await p.evaluate(async (a) => { await IngRepo.switchTo(a[0], 'words'); try { return await IngRepo.cherryPick(a[0], a[1]); } catch (e) { return { e: String(e.message || e) }; } }, [id, MOVE]);
    ok(pk && pk.kind === 'picked' && (await links()).lib === L2, '5. bringing the version that moved lib onto "words": lib at "lib two" there (a pick that changes only a submodule is a change)', { pk, links: await links() });
    // 6. a branch of its own (commitTo)
    await p.evaluate(async (id) => { await IngRepo.commitTo(id, 'ingenium/tide', [{ path: 'tide.js', data: 'export const next = 6.25;\n' }], 'Finer figures', { from: 'main' }); }, id);
    ok((await links('ingenium/tide')).lib === L1, '6. a version kept on a branch of its own keeps lib, at its own version ("lib one", from main)', await links('ingenium/tide'));
    // 7. put aside: W holds lib, as git's W holds the index's
    const w = await p.evaluate(async (id) => { await IngRepo.put(id, 'notes.md', 'a note, longer\n'); return (await IngRepo.stashPush(id, 'Halfway')).oid; }, id);
    ok((await links(w)).lib === L2, '7. changes put aside: their version keeps lib as the version out holds it', await links(w));
    await p.evaluate(async (id) => { await IngRepo.stashApply(id, 0, { drop: true }); await IngRepo.commit(id, 'A longer note'); }, id);
    // 8. rebase: "words" made again on top of an idea taken from main (Fabrica's rebase, as GitHub's Rebase and merge, makes the other
    //    idea's versions again on top of the one out)
    const rb = await p.evaluate(async (id) => { try { await IngRepo.switchTo(id, 'main'); await IngRepo.branch(id, 're'); await IngRepo.switchTo(id, 're'); return await IngRepo.rebase(id, 'words'); } catch (e) { return { e: String(e.message || e) }; } }, id);
    ok(rb && rb.kind === 'rebased' && (await links()).lib === L2, '8. "words" made again on top of main (rebase): lib kept, at "lib two", the change the picked version made', { rb, links: await links() });
    // 9. out again, read by git
    const out = await p.evaluate(async (id) => { const u8 = await IngRepo.bundle(id); let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); }, id);
    fs.writeFileSync(path.join(T, 'out.bundle'), Buffer.from(out, 'base64'));
    const C = path.join(T, 'clone'); git(T, ['clone', '-q', path.join(T, 'out.bundle'), 'clone']);
    const branches = ['main', 'words', 'ingenium/tide', 'pointer', 're'];
    const seen = Object.fromEntries(branches.map((br) => [br, lsLib(C, 'origin/' + br)]));
    ok(seen.main === L1 && seen.words === L2 && seen['ingenium/tide'] === L1 && seen.pointer === L2 && seen.re === L2,
      '9. sent out as a bundle and cloned by git: every branch\'s version holds lib as a submodule (160000), at the version each step left it', seen);
    const hist = git(C, ['log', '--format=%s', 'origin/main']).trim().split('\n');
    const lost = hist.filter((s, i) => { const oid = git(C, ['rev-list', '--skip=' + i, '-n1', 'origin/main']).trim(); return !/^160000 commit /.test(git(C, ['ls-tree', oid, 'lib']).trim()); });
    ok(lost.length === 0, '   no version on main, from the first to the last, lost lib', lost);
    const fsck = cp.spawnSync('git', ['fsck', '--no-progress'], { cwd: C, env: ENV, encoding: 'utf8' });
    const bad = (fsck.stdout + fsck.stderr).split('\n').filter((x) => x.trim() && !/^dangling /.test(x));
    ok(fsck.status === 0 && bad.length === 0, '   git fsck finds nothing wrong', bad);
  } catch (e) { ok(false, 'the test ran to its end', String(e && e.stack || e).slice(0, 900)); }
  ok(errs.length === 0, 'no page error', errs.slice(0, 6));
  console.log(`\n${pass} passed, ${fail} failed`); await b.close(); process.exit(fail ? 1 : 0);
})();
