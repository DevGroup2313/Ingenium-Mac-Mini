// node rig/t_811_editions.js <page url> [folder holding ingenium_full.html, ingenium_gift.html and ingenium_demo.html]
// Ingenium 8.11 (modules/r420.js, r268.js, r111.js; build/demo_recipe.py): the master edition carries Ingenium's Full, Gift and Demo editions
// as recipes and gives each back whole; Fabrica's Ship and Download as an app offer them; the page every package carries is the edition
// chosen, and the package's name and id follow it. Her words (28 November 2026): "I want all of the editions of all of my apps built into
// the master edition for all of my devices, not just the master edition. I want full authorship and agency over all of the editions."
// Nothing of anyone's is read: the Fabrica record used here is invented (an app named Ingenium) and taken away again.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const crypto = require('crypto');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 400))); c ? pass++ : fail++; };
const URL = process.argv[2], DIR = process.argv[3] || '';
const shaOf = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
  const has = await p.evaluate(() => ({ demos: !!window.IngDemos, eds: !!window.IngEditions, carried: window.IngDemos && IngDemos.editions ? IngDemos.editions() : null }));
  ok(has.demos && has.eds, 'the master edition has the editions\' maker (IngDemos, IngEditions)', has);
  ok(JSON.stringify(has.carried) === JSON.stringify(['full', 'gift', 'demo']), 'it carries the Full, Gift and Demo editions', has.carried);
  /* 1. each edition, given back whole */
  for (const k of ['full', 'gift', 'demo']) {
    const r = await p.evaluate(async (k) => { try { const d = await IngDemos.edition(k); const B = IngDemos.bytes; const at = B.find(d.u8, 'var ING_EDITION="', 0); const t = new TextDecoder().decode(d.u8.subarray(at, at + 40));
      const sha = await B.sha(d.u8); return { size: d.u8.length, sha: sha, said: d.sha256, ed: (/var ING_EDITION="(\w+)"/.exec(t) || [])[1], builtin: B.find(d.u8, 'id="ing-builtin-', 0) >= 0, ver: d.version }; } catch (e) { return { err: String(e && e.message || e) }; } }, k);
    ok(r && !r.err && r.sha === r.said && r.ed === k && !r.builtin, k + ' edition: put together from its recipe, its fingerprint as carried, named ' + k + ', no app of hers in it', r);
    if (DIR && fs.existsSync(path.join(DIR, 'ingenium_' + k + '.html'))) { const f = path.join(DIR, 'ingenium_' + k + '.html'); ok(r && r.sha === shaOf(f) && r.size === fs.statSync(f).size, k + ' edition: byte for byte the page published in editions/', { got: r && r.sha, file: shaOf(f) }); }
  }
  await p.evaluate(() => { try { IngDemos.release(); } catch (e) {} });
  /* 2. the choices each app offers */
  const lists = await p.evaluate(() => ({ ingenium: IngEditions.list('ingenium').map((e) => e.k), cd: IngEditions.list('cd').map((e) => e.k), forge: IngEditions.list('forge').map((e) => e.k), inkwell: IngEditions.list('inkwell').map((e) => e.k) }));
  ok(lists.ingenium.join() === 'master,full,gift,demo', 'Ingenium offers its master, Full, Gift and Demo editions', lists.ingenium);
  ok(lists.cd.join() === 'master,sample' && lists.forge.join() === 'master,fdemo' && lists.inkwell.length === 0, 'Carpe Diem its full edition and Public sample, The Forge itself and its demonstration; Inkwell, with one edition, no choice', lists);
  /* 3. Fabrica: an invented record of an app named Ingenium, the Gift edition chosen */
  await p.evaluate(() => { try { go('fabrica'); } catch (e) {} }); await sleep(2500);
  const fab = await p.evaluate(async () => { const H = window.fbHubHost; if (!H) return { err: 'no Fabrica' };
    const r = { id: 't808-ingenium', name: 'Ingenium', slug: 'ingenium', app: 'ingenium' }; H.C.repos.push(r);
    const out = {};
    try {
      const host = document.createElement('div'); host.id = 'fb'; document.body.appendChild(host); const inner = document.createElement('div'); host.appendChild(inner);
      IngEditions.row(inner, r); out.keys = [...inner.querySelectorAll('.r420-ed .f-btn')].map((x) => x.textContent + (x.getAttribute('aria-pressed') === 'true' ? '*' : ''));
      out.note0 = (inner.querySelector('.r420-note') || {}).textContent;
      const P0 = H.pkgOf(r); out.p0 = { title: P0.title, id: P0.id, ed: P0.edition || '' };
      inner.querySelector('.r420-ed .f-btn[data-edition="gift"]').click(); await new Promise((z) => setTimeout(z, 300));
      out.chosen = IngEditions.chosen(r);
      const P1 = H.pkgOf(r); out.p1 = { title: P1.title, id: P1.id, ed: P1.edition, version: P1.version };
      const x = await IngEditions.substitute(r.id, { html: '<html></html>', bytes: new Uint8Array(13), page: 'ingenium.html', commit: 'abc' }, { target: 'win' });
      out.sub = { ed: x.edition, size: x.bytes.length, sha: await IngDemos.bytes.sha(x.bytes), page: x.page, commit: x.commit, gift: /var ING_EDITION="gift"/.test(x.html.slice(0, 2000000)) || x.html.indexOf('var ING_EDITION="gift"') >= 0 };
      IngEditions.choose(r, 'full'); const P2 = H.pkgOf(r); out.p2 = { title: P2.title, id: P2.id };
      IngEditions.choose(r, 'master'); const P3 = H.pkgOf(r); out.p3 = { title: P3.title, id: P3.id };
      const keep = await IngEditions.substitute(r.id, { html: 'kept', bytes: new Uint8Array(4) }, { target: 'win' }); out.kept = keep.html;
      /* Download as an app: the editions in the panel's own list */
      IngDownload.open({ html: '<!doctype html><html><head><title>Ingenium</title></head><body>x</body></html>', title: 'Ingenium', app: 'ingenium', top: function (app, idb) { IngEditions.select(idb, r, {}); } });
      await new Promise((z) => setTimeout(z, 600));
      const sel = document.querySelector('.dl-id select[data-r420]'); out.sel = sel ? [...sel.options].map((o) => o.value + (o.selected ? '*' : '')) : null;
      try { closeModal(); } catch (e) {}
      host.remove();
    } catch (e) { out.err = String(e && e.message || e); }
    H.C.repos.splice(H.C.repos.indexOf(r), 1); try { delete H.FBS().ship[r.id]; H.saveSoon(); } catch (e) {}
    return out; });
  ok(fab && !fab.err && fab.keys && fab.keys.join('|') === 'Master edition*|Full edition|Gift edition|Demo edition', 'Fabrica\'s Ship: the four editions as Fabrica\'s own keys, the master pressed at first', fab);
  ok(fab && fab.p0 && fab.p0.title === 'Ingenium' && !fab.p0.ed, 'the master edition\'s package keeps its name and id', fab && fab.p0);
  ok(fab && fab.chosen === 'gift' && fab.p1 && fab.p1.title === 'Ingenium Gift' && /\.gift$/.test(fab.p1.id) && fab.p1.ed === 'gift', 'the Gift edition chosen: its package is named Ingenium Gift, with an id of its own', fab && fab.p1);
  ok(fab && fab.sub && fab.sub.ed === 'gift' && fab.sub.gift && fab.sub.page === 'ingenium.html' && fab.sub.commit === 'abc', 'and every package carries the Gift edition\'s page', fab && fab.sub);
  ok(fab && fab.p2 && fab.p2.title === 'Ingenium Full' && !/\.(full|gift|demo)$/.test(fab.p2.id), 'the Full edition keeps the master\'s id, so it installs over the master in place', fab && fab.p2);
  ok(fab && fab.p3 && fab.p3.title === 'Ingenium' && fab.kept === 'kept', 'back on the master edition, the package is the version kept, as before', fab && { p3: fab.p3, kept: fab.kept });
  ok(fab && fab.sel && fab.sel.join('|') === 'master*|full|gift|demo', 'Download as an app: the editions in the panel\'s own list', fab && fab.sel);
  ok(errs.length === 0, 'no error on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
