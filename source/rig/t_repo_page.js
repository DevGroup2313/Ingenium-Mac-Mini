// IngRepo in the page itself: IndexedDB, the browser's SHA-1 and deflate, then the same with neither (plain JS)
const { start } = require('./lib.js');
const fs = require('fs'); const { execFileSync } = require('child_process');
(async () => {
  const S = process.env.S, OUT = S + '/yard/btest'; const { browser, page, logs } = await start({ viewport: { width: 1280, height: 800 } });
  for (const plain of [false, true]) {
    const r = await page.evaluate(async (plain) => {
      if (plain) { try { Object.defineProperty(crypto, 'subtle', { value: undefined, configurable: true }); } catch (e) {} window.CompressionStream = undefined; window.DecompressionStream = undefined; }
      const R = IngRepo, t0 = performance.now(), log = [];
      const s = await R.create({ name: plain ? 'Plain JS' : 'In the page' });
      const pageText = await (await fetch(location.href.split('#')[0])).text();
      await R.putMany(s.id, [{ path: 'ingenium.html', data: pageText }, { path: 'README.md', data: '# Hello\n' }, { path: 'tools/run.sh', data: '#!/bin/sh\necho hi\n' }]);
      const c1 = await R.commit(s.id, 'First version'); log.push('commit1 ' + Math.round(performance.now() - t0) + 'ms');
      await R.put(s.id, 'ingenium.html', pageText.replace('<title>', '<title>Edited ')); const c2 = await R.commit(s.id, 'An edit'); log.push('commit2 ' + Math.round(performance.now() - t0) + 'ms');
      await R.branch(s.id, 'idea'); await R.switchTo(s.id, 'idea'); await R.put(s.id, 'README.md', '# Hello\n\nFrom an idea.\n'); await R.commit(s.id, 'Idea'); await R.switchTo(s.id, 'main');
      await R.put(s.id, 'tools/run.sh', '#!/bin/sh\necho hello\n'); await R.commit(s.id, 'Main');
      const m = await R.merge(s.id, 'idea'); const d = await R.diff(s.id, { from: c1, to: 'HEAD' });
      const b = await R.bundle(s.id); log.push('bundle ' + Math.round(performance.now() - t0) + 'ms');
      const z = await R.gitFolder(s.id); const sz = await R.sourceZip(s.id);
      const b64 = u => { let x = ''; for (let i = 0; i < u.length; i += 32768) x += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(x); };
      // the store survives a reload of the module's view of it: read it all back from IndexedDB
      return { merge: m.kind, diff: d.map(x => x.path + ':' + x.kind + ':+' + x.adds + '-' + x.dels), log, list: (await R.list()).map(x => x.name), bundle: b64(b), git: b64(z), src: b64(sz), head: (await R.log(s.id))[0].oid, id: s.id };
    }, plain);
    const tag = plain ? 'plain' : 'browser';
    console.log(tag, JSON.stringify({ merge: r.merge, diff: r.diff, log: r.log, list: r.list }));
    fs.writeFileSync(`${OUT}/${tag}.bundle`, Buffer.from(r.bundle, 'base64')); fs.writeFileSync(`${OUT}/${tag}-git.zip`, Buffer.from(r.git, 'base64')); fs.writeFileSync(`${OUT}/${tag}-src.zip`, Buffer.from(r.src, 'base64'));
    const cl = `${OUT}/${tag}-clone`; fs.rmSync(cl, { recursive: true, force: true }); execFileSync('git', ['clone', '-q', `${OUT}/${tag}.bundle`, cl]);
    let fsck = 'clean'; try { execFileSync('git', ['-C', cl, 'fsck', '--full', '--strict'], { stdio: 'pipe' }); } catch (e) { fsck = String(e.stderr); }
    const head = execFileSync('git', ['-C', cl, 'rev-parse', 'HEAD']).toString().trim();
    const uz = `${OUT}/${tag}-unz`; fs.rmSync(uz, { recursive: true, force: true }); fs.mkdirSync(uz); execFileSync('unzip', ['-q', `${OUT}/${tag}-git.zip`, '-d', uz]);
    const dir = uz + '/' + fs.readdirSync(uz)[0]; const st = execFileSync('git', ['-C', dir, 'status', '--porcelain']).toString();
    console.log(tag, 'clone fsck:', fsck, '| same head:', head === r.head, '| folder status clean:', st.trim() === '', '| commits:', execFileSync('git', ['-C', cl, 'rev-list', '--count', 'HEAD']).toString().trim());
  }
  // a reload: the repositories are still there (IndexedDB)
  await page.reload(); await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
  console.log('after reload:', JSON.stringify(await page.evaluate(async () => (await IngRepo.list()).map(x => x.name + ' ' + x.files + ' files ' + x.branch))));
  console.log('errors:', logs.filter(l => /error/i.test(l)).slice(0, 5));
  await browser.close();
})();
