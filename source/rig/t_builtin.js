// R120 + R122 + R124: The Forge (its lean copy), Inkwell and Carpe Diem carried inside Ingenium, kept in the app library on first start.
// node builtin_e2e.js <url> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const t0 = Date.now();
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 });
  const ready = Date.now() - t0;
  ok(ready < 60000, 'the page opens and is ready with both apps inside it', ready + ' ms');
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  const parts = await p.evaluate(() => window.__ingParts);
  ok(parts.p51 === 'running', 'the built-in copies part (p51) runs', parts.p51);
  const meta = await p.evaluate(() => { const m = IngBuiltin.meta; return { f: [m.forge.version, m.forge.build, m.forge.date, m.forge.size], i: [m.inkwell.version, m.inkwell.date, m.inkwell.size] }; });
  ok(meta.f[0] === '641' && meta.f[1] === '9s73' && meta.i[0] === '7.49' && meta.i[1] === '2026-10-19', 'Ingenium carries The Forge 641 (9s73) and Inkwell 7.49', JSON.stringify(meta));

  // 1. on its own, soon after it opens, the library is given both
  await p.waitForFunction(() => window.__ingBuiltin && window.__ingBuiltin.states, null, { timeout: 90000 });
  const auto = await p.evaluate(() => ({ st: window.__ingBuiltin.states, ms: window.__ingBuiltin.ms, f: libState().apps.forge, i: libState().apps.inkwell }));
  ok(auto.st.forge === 'kept' && auto.st.inkwell === 'kept', 'soon after it opens, both are unpacked, checked and kept', JSON.stringify(auto.st) + ' in ' + auto.ms + ' ms');
  ok(auto.f.version === '641' && auto.f.source === 'built in' && auto.f.sha256 === '653fc9ff1ef5e96aef6639dad7618768f12d616738f481d9284a680c0423836f' && auto.i.version === '7.49',
    'the library names them as their own builds name them, with their fingerprints', JSON.stringify({ f: [auto.f.version, auto.f.build, auto.f.source, auto.f.size], i: [auto.i.version, auto.i.source, auto.i.size] }));
  const txt = await p.evaluate(() => Promise.all([libText('forge'), libText('inkwell')]).then(([f, i]) => ({ f: f && /pass:"641"/.test(f) && /id="section-forge"/.test(f), fl: f && f.length, i: i && /const BUILD='7\.49/.test(i), il: i && i.length })));
  ok(txt.f && txt.i, 'their pages read back whole from this device', JSON.stringify(txt));

  const cd = await p.evaluate(() => { const m = IngBuiltin.meta.cd, a = libState().apps.cd; return libText('cd').then(t => ({ st: window.__ingBuiltin.states.cd, mv: m && m.version, mb: m && m.build, v: a && a.version, src: a && a.source, sha: a && a.sha256 === m.sha256, pass: /pass:"1058"/.test(t || ''), det: libDetect(t), ver: libVersionOf('cd', t), len: (t || '').length, claude: /claude\.ai/.test((t || '').slice(0, 4000)) })); });
  ok(cd.st === 'kept' && cd.mv === '1058' && cd.mb === '528171058' && cd.v === '1058' && cd.src === 'built in' && cd.sha, 'Carpe Diem 1058 is carried inside, unpacked, checked and kept', JSON.stringify(cd));
  ok(cd.pass && cd.det === 'cd' && cd.ver === '1058' && !cd.claude, 'its page reads back whole, is recognised as Carpe Diem 1058, and carries no outside script', JSON.stringify(cd));
  // 2. again: unchanged
  const again = await p.evaluate(() => IngBuiltin.seed().then(s => s));
  ok(again.forge === 'same' && again.inkwell === 'same' && again.cd === 'same', 'opened again, nothing is kept twice', JSON.stringify(again));

  // 3. an older copy the owner had: replaced, the older one one step back
  const older = await p.evaluate(() => { const A = libState().apps; A.inkwell = Object.assign({}, A.inkwell, { version: '7.30', sha256: 'aaaa', source: 'file' }); return IngBuiltin.seed().then(s => ({ s: s.inkwell, v: libState().apps.inkwell.version, e: libState().apps.inkwell.earlier && libState().apps.inkwell.earlier.version })); });
  ok(older.s === 'kept' && older.v === '7.49' && older.e === '7.30', 'an older Inkwell (7.30) is replaced by 7.49, and 7.30 stays one step back', JSON.stringify(older));

  // 4. a Forge stamp older than 9s73 counts as older; a later stamp (9s74) as newer
  const cmp = await p.evaluate(() => { const A = libState().apps, keep = Object.assign({}, A.forge), r = {};
    A.forge = Object.assign({}, keep, { version: '9s44', build: '', sha256: 'bbbb' }); r.s44 = IngBuiltin.standing('forge');
    A.forge = Object.assign({}, keep, { version: '9s74', build: '', sha256: 'bbbb' }); r.s72 = IngBuiltin.standing('forge');
    A.forge = Object.assign({}, keep, { version: '628', build: '9s60', sha256: 'bbbb' }); r.p628 = IngBuiltin.standing('forge');
    A.forge = Object.assign({}, keep, { version: '', build: '', sha256: 'bbbb' }); r.none = IngBuiltin.standing('forge');
    A.forge = keep; r.same = IngBuiltin.standing('forge'); return r; });
  ok(cmp.s44 === 'older' && cmp.s72 === 'newer' && cmp.p628 === 'older' && cmp.none === 'other' && cmp.same === 'same', 'versions are placed in order: 9s44 and 628 older, 9s74 newer, an unnamed build left alone', JSON.stringify(cmp));

  // 5. a newer Forge the owner added stays; the card offers the built-in one
  await p.evaluate(() => { const A = libState().apps; A.forge = Object.assign({}, A.forge, { version: '642', build: '9s80', sha256: 'cccc', source: 'file' }); saveState(); });
  const newer = await p.evaluate(() => IngBuiltin.seed().then(s => ({ s: s.forge, v: libState().apps.forge.version })));
  ok(newer.s === 'newer' && newer.v === '642', 'a newer Forge (642) the owner added is never replaced', JSON.stringify(newer));
  await p.evaluate(() => go('lector')); await p.waitForTimeout(1200);
  const card = await p.evaluate(() => { const c = document.getElementById('libBuiltin'); return c ? { line: c.textContent, keys: [...c.querySelectorAll('[data-bi-use]')].map(b => b.textContent), apps: [...document.querySelectorAll('#l7Bf .l-app')].map(a => a.textContent) } : null; });
  ok(card && /Built into this Ingenium: Carpe Diem 1058, The Forge 641 and Inkwell 7\.49\./.test(card.line) && card.keys.length === 1 && /Use the built-in The Forge 641/.test(card.keys[0]),
    'the Your apps card says what Ingenium carries, and offers the built-in Forge beside the owner\'s newer one', JSON.stringify(card));
  await p.evaluate(() => document.getElementById('libBuiltin').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/builtin-card-offer.png' });
  await p.evaluate(() => document.querySelector('[data-bi-use="forge"]').click());
  await p.waitForFunction(() => libState().apps.forge.version === '641' && !LIB.busy, null, { timeout: 60000 });
  const used = await p.evaluate(() => ({ v: libState().apps.forge.version, e: libState().apps.forge.earlier && libState().apps.forge.earlier.version, note: (document.getElementById('libNote') || {}).textContent, keys: document.querySelectorAll('[data-bi-use]').length, tiles: [...document.querySelectorAll('#l7Bf .l-app')].map(a => a.textContent) }));
  ok(used.v === '641' && used.e === '642' && /built in/.test(used.note) && used.keys === 0, 'Use the built-in keeps 641, with the owner\'s 642 one step back', JSON.stringify(used));

  // 6. a copy whose bytes were lost from this device is kept again
  const lost = await p.evaluate(() => { const ref = libState().apps.inkwell.ref; return libTx('readwrite', s => s.delete(ref)).then(() => IngBuiltin.seed()).then(s => s.inkwell); });
  ok(lost === 'kept again', 'a copy whose bytes were lost is kept again', lost);

  // 7. the owner's own Forge page chosen by itself is named by its pass, as the built-in copy is
  const ver = await p.evaluate(() => libText('forge').then(t => ({ v: libVersionOf('forge', t), d: libDetect(t) })));
  ok(ver.v === '641' && ver.d === 'forge', 'a Forge page added by hand is recognised and named 641 too', JSON.stringify(ver));

  // 8. Lector and Fabrica see them
  await p.evaluate(() => { const c = document.getElementById('libBuiltin'); if (c) c.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(400);
  await p.screenshot({ path: OUT + '/builtin-card.png' });
  const seen = await p.evaluate(() => ({ tiles: [...document.querySelectorAll('#l7Bf .l-app:not(.none)')].map(b => b.getAttribute('data-k') + ': ' + b.textContent), lib: libApps().map(a => a.key + ' ' + a.version) }));
  ok(seen.tiles.some(t => /^forge: .*641/.test(t)) && seen.tiles.some(t => /^inkwell: .*7\.49/.test(t)), 'Lector shows both among your apps, ready to read', JSON.stringify(seen));
  // 9. Lector: a reading of an earlier Forge is not passed off as a reading of 641
  await p.evaluate(() => { const s = lxState(); s.runs = s.runs.filter(r => r.id !== 'lx_old628');
    s.runs.unshift({ id: 'lx_old628', name: 'The Forge', app: 'forge', sha: 'old628sha', version: '628', file: 'the_forge.html', kind: 'app', depth: 'overview', status: 'done', created: Date.now() - 2 * 864e5, updated: Date.now() - 864e5, finished: Date.now() - 864e5, done: 12, total: 12, writings: {} });
    const B = IngLector.state().brief; B.apps = ['forge']; B.depth = 'overview'; delete B.useEarlier; saveState(); lxRender(); });
  await p.waitForTimeout(500);
  const st1 = await p.evaluate(() => ({ tile: (document.querySelector('#l7Bf .l-app[data-k="forge"] .st') || {}).textContent, line: (document.querySelector('#l7Bf .l-stale') || {}).textContent, key: [...document.querySelectorAll('#l7Bf .l-btn')].map(b => b.textContent).find(t => /earlier reading|afresh/.test(t)) }));
  const mainKey = await p.evaluate(() => (document.querySelector('.l-btn.pri.wide.next') || {}).textContent);
  ok(mainKey === 'Start reading', 'the brief offers Start reading, not Write the documents', mainKey);
  ok(/^Read from 628 · 641$/.test(st1.tile) && /read from an earlier copy \(628, .*The copy kept now is 641: Lector reads it afresh when you start/.test(st1.line) && st1.key === 'Keep the earlier reading',
    'Lector says its reading of The Forge is of 628, and that it reads 641 afresh', JSON.stringify(st1));
  await p.evaluate(() => document.querySelector('#l7Bf .l-stale').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/lector-newer-copy.png' });
  await p.evaluate(() => [...document.querySelectorAll('#l7Bf .l-btn')].find(b => b.textContent === 'Keep the earlier reading').click()); await p.waitForTimeout(300);
  const st2 = await p.evaluate(() => ({ tile: (document.querySelector('#l7Bf .l-app[data-k="forge"] .st') || {}).textContent, line: (document.querySelector('#l7Bf .l-stale') || {}).textContent, ue: IngLector.state().brief.useEarlier }));
  const mainKey2 = await p.evaluate(() => (document.querySelector('.l-btn.pri.wide.next') || {}).textContent);
  ok(mainKey2 === 'Write the documents', 'with the earlier reading kept, it offers Write the documents', mainKey2);
  ok(/^Read .* · 641$/.test(st2.tile) && /from its reading of 628, as you chose/.test(st2.line) && st2.ue && st2.ue.forge, 'the owner can keep the earlier reading, and Lector says so', JSON.stringify(st2));
  const kept1 = await p.evaluate(() => IngLector.ensureRun('forge', { depth: 'overview' }).then(r => r.id));
  ok(kept1 === 'lx_old628', 'kept, the earlier reading is the one used', kept1);
  await p.evaluate(() => { [...document.querySelectorAll('#l7Bf .l-btn')].find(b => /afresh instead/.test(b.textContent)).click(); });
  await p.waitForTimeout(300);
  const fresh = await p.evaluate(() => IngLector.ensureRun('forge', { depth: 'overview' }).then(r => ({ id: r.id, sha: r.sha, v: r.version, total: r.total, ev: IngLector.R7.ev.filter(e => e.label === 'A newer copy').map(e => e.text), want: IngBuiltin.meta.forge.sha256 }), e => ({ err: String(e && e.message || e) })));
  ok(fresh.id && fresh.id !== 'lx_old628' && fresh.sha === fresh.want && fresh.v === '641' && fresh.ev.length === 1, 'otherwise Lector measures 641 and starts a fresh reading of it, saying why', JSON.stringify(fresh).slice(0, 400));
  await p.evaluate(() => lxRender()); await p.waitForTimeout(300);
  const st3 = await p.evaluate(() => (document.querySelector('#l7Bf .l-app[data-k="forge"] .st') || {}).textContent);
  ok(/^Read in part: 0 of \d+ · 641$/.test(st3), 'the tile then follows the fresh reading', st3);
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1500);
  await p.evaluate(() => document.getElementById('fbBring').click()); await p.waitForTimeout(400);
  const fab = await p.evaluate(() => { const o = [...document.querySelectorAll('.f-sheet .f-opt')].find(x => /From your app library/.test(x.textContent)); return o ? o.querySelector('small').textContent : ''; });
  ok(/The Forge 641/.test(fab) && /Inkwell 7\.49/.test(fab) && /Carpe Diem 1058/.test(fab), 'Fabrica can bring them in from the app library', fab);
  await p.screenshot({ path: OUT + '/builtin-fabrica.png' });
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH ' + e.message); process.exit(2); });
