// The Offline Project, made from demonstrations only (Ingenium 6.77; modules/r246.js, modules/r268.js; the master edition alone).
// Her words (10 November 2026): "I want the Offline Project apps to only contain the apps demos and never the full version, I just
// installed the mac app after shipping it inside of Ingenium's Fabrica and it had the full versions of all 4 apps and not the demos,
// please make the fix."
// Checks, on a master page that carries its demo edition (release.py page, or a test build given ING_DEMO_PAGE):
//   - Fabrica's Bring one in offers The Offline Project; its work says what each room holds: Carpe Diem's Public sample, The Forge's
//     demonstration, Ingenium's demo edition (never this master edition), Inkwell's own page; no copy of the library is offered;
//   - Make and open makes the one-file app and opens it: the hall, the line naming the four builds, four apps inside;
//   - each room, unpacked from the file, is a demonstration: Carpe Diem names its edition (Public sample) and has no Forge section;
//     The Forge is its demonstration and carries exactly the four demonstrations, each unpacking whole against its fingerprint;
//     Ingenium is the demo edition with the fingerprint the page's own recipe names (the one editions/README.txt lists), without any
//     app of hers and without her Author Studio; Inkwell is its page; each has the three additions at its top;
//   - nowhere in the file is this master edition: its own marks are not in any room;
//   - a room opens its app from inside the page, and Ingenium's room runs as the demo edition;
//   - without Inkwell: three rooms, the Forge carrying three, the line without Inkwell; Save the app saves it under its name;
//   - a full app handed to a room is refused, in plain words, and nothing is made;
//   - kept in Fabrica, its history says it was made from the demonstrations; nothing is kept in the app library; no page errors.
//   node rig/t_677_offline.js <master page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_677_offline.js <master page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, acceptDownloads: true }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await p.waitForTimeout(500);
  const part = await p.evaluate(() => ({ p268: window.__ingParts && window.__ingParts.p268, demos: !!window.IngDemos, why4: window.IngDemos ? IngDemos.why(true) : 'none', why3: window.IngDemos ? IngDemos.why(false) : 'none', ver: ING_VERSION,
    slot: (document.getElementById('ing-demo-ingenium') || { getAttribute() { return null; } }).getAttribute('data-sha256') }));
  ok(part.p268 === 'running' && part.demos && part.why4 === '' && part.why3 === '' && /^[0-9a-f]{64}$/.test(part.slot || ''), 'the page carries the demonstrations, its own demo edition among them, and nothing stands in the way', part);
  if (!part.demos || part.why4) { console.log(pass + ' passed, ' + (fail) + ' failed'); await b.close(); process.exit(1); }
  const keys0 = await p.evaluate(() => Object.keys(libState().apps).sort());

  // 1. Fabrica: Bring one in, then what each room holds
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1500);
  await p.click('#fbBring'); await p.waitForTimeout(400);
  // since 6.72 the sheet shows the three as tiles under the heading The Offline Project (modules/r112.js)
  const t2 = await p.evaluate(() => [...document.querySelectorAll('.f-sheet .op-bring .f-tile')].map(x => x.innerText.replace(/\s+/g, ' ')));
  ok(t2.length === 3 && /^All four apps Their demonstrations, never their full versions$/.test(t2[0]) && /^Without Inkwell The demonstrations of Carpe Diem, The Forge and Ingenium$/.test(t2[1]) && /^See what each room holds/.test(t2[2]), 'Bring one in offers The Offline Project, made from the demonstrations, never the full versions', t2);
  await p.evaluate(() => { const k = [...document.querySelectorAll('.f-sheet .op-bring .f-tile')].find(x => /See what each room/.test(x.textContent)); k.click(); }); await p.waitForTimeout(400);
  const r1 = await p.evaluate(() => { const w = document.querySelector('.op-work'); return { lede: w.querySelector('.op-lede').textContent, rooms: [...w.querySelectorAll('.op-room:not(.op-hall) .t')].map(x => x.innerText.replace(/\s+/g, ' ')),
    selects: w.querySelectorAll('.op-room select').length, make: !document.getElementById('opMakeOpen').disabled }; });
  await p.screenshot({ path: OUT + '/1_work.png' });
  ok(r1.rooms.length === 4 && /^Carpe Diem Carpe Diem \d+ · its Public sample/.test(r1.rooms[0]) && /The Forge \d+ · its demonstration, which carries the four demonstrations/.test(r1.rooms[1])
    && new RegExp('Ingenium ' + part.ver.replace(/\./g, '\\.') + ' · its demo edition, never this master edition').test(r1.rooms[2]) && /Inkwell [\d.]+ · its own page \(Inkwell has one edition\)/.test(r1.rooms[3]),
    'each room says what it holds: the Public sample, the demonstration, the demo edition (never this master edition), Inkwell\'s own page', r1.rooms);
  ok(r1.selects === 0 && /never holds a full version of an app, nor this master edition/.test(r1.lede) && r1.make, 'no copy of the app library is offered for a room; the words say it never holds a full version; Make and open is ready', r1);

  // 2. Make and open
  const t0 = Date.now();
  const [pop] = await Promise.all([p.waitForEvent('popup', { timeout: 30000 }), p.click('#opMakeOpen')]);
  await pop.waitForURL(/^blob:/, { timeout: 600000 }); await pop.waitForLoadState('domcontentloaded', { timeout: 300000 });
  await pop.waitForFunction(() => !!document.getElementById('builds') && document.getElementById('builds').textContent.length > 0, null, { timeout: 180000 }).catch(() => {}); await pop.waitForTimeout(1500);
  const took = Math.round((Date.now() - t0) / 1000);
  const h2 = await pop.evaluate(() => ({ title: document.title, line: (document.getElementById('builds') || {}).textContent || '', ids: [...document.querySelectorAll('script[type="op/gz64"]')].map(x => x.id) }));
  await pop.screenshot({ path: OUT + '/2_hall.png' });
  ok(h2.title === 'The Offline Project' && new RegExp('^Carpe Diem \\d+ · The Forge \\d+ · Ingenium ' + part.ver.replace(/\./g, '\\.') + ' · Inkwell [\\d.]+$').test(h2.line) && h2.ids.length === 4,
    'Make and open: the hall opens in a window of its own, naming the four builds, with four apps inside (made in ' + took + ' s)', h2);

  // 3. each room, unpacked from the file itself
  const rooms = await p.evaluate(async () => { const X = IngDemos.bytes, r = IngOffline.last(), t = await r.blob.text(), out = { size: r.size, line: r.line };
    const hex = async u8 => X.sha(u8); const dec = new TextDecoder();
    for (const [k, slug] of [['cd', 'carpe-diem'], ['forge', 'the-forge'], ['ingenium', 'ingenium'], ['inkwell', 'inkwell']]) {
      const m = new RegExp('<script type="op/gz64" id="op-app-' + slug + '">([^<]+)</script>').exec(t); if (!m) { out[k] = null; continue; }
      const u8 = await X.gunzip(X.unb64(m[1])), s = dec.decode(u8), o = { bytes: u8.length };
      o.top = /^<!doctype html>\s*<meta charset="utf-8"><script id="op-shim">/i.test(s.slice(0, 200)); o.corner = s.indexOf('("op:' + k + ':")') >= 0; o.home = s.indexOf('id="op-home"') >= 0; o.bars = s.indexOf('id="op-no-bars"') >= 0;
      // the page as it was before the three additions (modules/r246.js puts exactly these after its doctype), checked as a demonstration
      const tags = IngOffline.prepParts(k, new Uint8Array(0))[1], i0 = s.indexOf(tags), plain = i0 > 0 ? s.slice(0, i0) + s.slice(i0 + tags.length) : s;
      o.demo = IngDemos.check(k, new TextEncoder().encode(plain));
      // this master edition's own marks, which no room may hold
      o.master = { edition: s.indexOf('var ING_EDITION="master"') >= 0, studio: s.indexOf('id="r236-css"') >= 0 || s.indexOf('IngWorkshop=') >= 0, recipe: s.indexOf('id="r126') >= 0, hers: s.indexOf('id="ing-builtin-') >= 0 || s.indexOf('id="ing-tail:ing-builtin-') >= 0 };
      if (k === 'cd') { o.build = (/window\.CD_BUILD=\{[^}]*\}/.exec(s) || [''])[0]; o.forgeSection = s.indexOf('id="section-forge"') >= 0; }
      if (k === 'forge') { o.build = (/window\.CD_BUILD=\{[^}]*\}/.exec(s) || [''])[0]; o.flag = s.indexOf('window.FORGE_DEMO = true') >= 0;
        const L = JSON.parse((/<script type="application\/json" id="forge-bi-meta">(.*?)<\/script>/s.exec(s) || [0, '{}'])[1].replace(/<\\\//g, '</')); o.carries = (L.apps || []).map(a => a.key + ' ' + a.version);
        o.whole = true; o.inner = {};
        for (const a of L.apps || []) { const mm = new RegExp('<script type="forge/b64" id="' + a.id + '">([^<]*)</script>').exec(s); const bb = mm ? await X.gunzip(X.unb64(mm[1])) : null;
          if (!bb || bb.length !== a.size || (await hex(bb)) !== a.sha256) o.whole = false; else o.inner[a.key] = a.key === 'forge' ? '' : IngDemos.check(a.key, bb); } }
      if (k === 'ingenium') { o.edition = (/var ING_EDITION="[^"]*"/.exec(s) || [''])[0]; o.version = (/var ING_VERSION="([0-9.]+)"/.exec(s) || [0, ''])[1];
        // the page as the demo edition is, without the three additions: its fingerprint is the one this page's recipe names
        o.sha = await hex(new TextEncoder().encode(plain)); o.slot = document.getElementById('ing-demo-ingenium').getAttribute('data-sha256'); }
      if (k === 'inkwell') o.build = (/<!-- BUILD='[\d.]+'/.exec(s.slice(0, 20000)) || [''])[0]; // below the three additions
      out[k] = o; }
    return out; });
  const tops = ['cd', 'forge', 'ingenium', 'inkwell'].every(k => rooms[k] && rooms[k].top && rooms[k].corner && rooms[k].home && rooms[k].bars);
  ok(tops, 'each of the four rooms is its own page with the three additions at its top (its own corner of the storage, the key back, no scroll bars)', Object.fromEntries(['cd', 'forge', 'ingenium', 'inkwell'].map(k => [k, rooms[k] && [rooms[k].top, rooms[k].corner, rooms[k].home, rooms[k].bars]])));
  ok(rooms.cd && rooms.cd.demo === '' && /edition:"Public sample"/.test(rooms.cd.build) && !rooms.cd.forgeSection, "Carpe Diem's room holds its Public sample (it names its edition, and has no Forge section as the full app has)", rooms.cd);
  ok(rooms.forge && rooms.forge.demo === '' && /edition:"Demo"/.test(rooms.forge.build) && rooms.forge.flag, "The Forge's room holds its demonstration", rooms.forge && [rooms.forge.demo, rooms.forge.build]);
  ok(rooms.forge && rooms.forge.whole && rooms.forge.carries.length === 4 && /^ingenium /.test(rooms.forge.carries[0]) && /^cd /.test(rooms.forge.carries[1]) && /^inkwell /.test(rooms.forge.carries[2]) && /^forge /.test(rooms.forge.carries[3])
    && rooms.forge.inner.ingenium === '' && rooms.forge.inner.cd === '' && rooms.forge.inner.inkwell === '',
    'the Forge carries exactly the four demonstrations (Ingenium\'s demo edition, the Public sample, Inkwell, a copy of itself), each unpacking whole against its fingerprint', rooms.forge && [rooms.forge.carries, rooms.forge.whole, rooms.forge.inner]);
  ok(rooms.ingenium && rooms.ingenium.demo === '' && rooms.ingenium.edition === 'var ING_EDITION="demo"' && rooms.ingenium.version === part.ver && rooms.ingenium.sha === rooms.ingenium.slot,
    "Ingenium's room holds the demo edition of this version, with the very fingerprint the page's recipe names", rooms.ingenium && [rooms.ingenium.edition, rooms.ingenium.version, rooms.ingenium.sha, rooms.ingenium.slot]);
  ok(rooms.inkwell && rooms.inkwell.demo === '' && /BUILD='[\d.]+'/.test(rooms.inkwell.build), "Inkwell's room holds Inkwell's own page", rooms.inkwell && rooms.inkwell.build);
  const marks = ['cd', 'forge', 'ingenium', 'inkwell'].map(k => [k, rooms[k] && rooms[k].master]);
  ok(marks.every(([k, m]) => m && !m.edition && !m.studio && !m.recipe && !m.hers), 'no room holds this master edition: not its name, her Author Studio, Lector\'s recipe or the apps it carries', marks);
  const st2 = await p.evaluate(() => { const s = document.querySelector('.op-work .op-state'); return s ? s.textContent : ''; });
  ok(/^Made: The Offline Project\.html, [0-9.]+ MB/.test(st2) && /lives only in this window/.test(st2), 'Fabrica says what was made, how large, and that it lives only in this window until saved', st2);

  // 4. a room opens its app from inside the page; Ingenium's runs as the demo edition
  await pop.evaluate(() => window.__opGo('ingenium')); await pop.waitForTimeout(1500);
  const f4 = await pop.waitForFunction(() => { const f = document.getElementById('demoFrame'); try { return f && f.contentWindow && f.contentWindow.__ingReady === true ? { ed: f.contentWindow.ING_EDITION, title: f.contentDocument.title, studio: !!f.contentWindow.IngWorkshop, lib: typeof f.contentWindow.libOn === 'function' ? f.contentWindow.libOn() : null } : false; } catch (e) { return { err: e.message }; } }, null, { timeout: 240000 }).then(h => h.jsonValue(), e => ({ err: e.message.slice(0, 200) }));
  await pop.screenshot({ path: OUT + '/4_ingenium_room.png' });
  ok(f4 && f4.ed === 'demo' && /Ingenium/.test(f4.title || '') && f4.studio === false, "Ingenium's room opens and runs as the demo edition, without the Author Studio", f4);
  await pop.close();

  // 5. without Inkwell
  await p.evaluate(() => { document.querySelector('.op-seg button[data-four="0"]').click(); }); await p.waitForTimeout(300);
  const r5 = await p.evaluate(() => [...document.querySelectorAll('.op-work .op-room:not(.op-hall) .t')].map(x => x.innerText.replace(/\s+/g, ' ')));
  const [pop3] = await Promise.all([p.waitForEvent('popup', { timeout: 30000 }), p.click('#opMakeOpen')]);
  await pop3.waitForURL(/^blob:/, { timeout: 600000 }); await pop3.waitForLoadState('domcontentloaded', { timeout: 300000 });
  await pop3.waitForFunction(() => !!document.getElementById('builds') && document.getElementById('builds').textContent.length > 0, null, { timeout: 180000 }).catch(() => {}); await pop3.waitForTimeout(1200);
  const h5 = await pop3.evaluate(() => ({ line: (document.getElementById('builds') || {}).textContent || '', ids: [...document.querySelectorAll('script[type="op/gz64"]')].map(x => x.id) }));
  await pop3.screenshot({ path: OUT + '/5_trio.png' }); await pop3.close();
  const f5 = await p.evaluate(async () => { const X = IngDemos.bytes, t = await IngOffline.last().blob.text(), m = /<script type="op\/gz64" id="op-app-the-forge">([^<]+)<\/script>/.exec(t), s = new TextDecoder().decode(await X.gunzip(X.unb64(m[1])));
    const L = JSON.parse(/<script type="application\/json" id="forge-bi-meta">(.*?)<\/script>/s.exec(s)[1].replace(/<\\\//g, '</')); return { carries: L.apps.map(a => a.key), inkwellRoom: /id="op-app-inkwell"/.test(t) }; });
  ok(r5.length === 3 && /which carries the three demonstrations/.test(r5[1]) && /^Carpe Diem \d+ · The Forge \d+ · Ingenium [0-9.]+$/.test(h5.line) && h5.ids.length === 3 && !f5.inkwellRoom && f5.carries.join(',') === 'ingenium,cd,forge',
    'without Inkwell: three rooms, the line without Inkwell, and the Forge carrying the three demonstrations', { r5, h5, f5 });
  const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 180000 }), p.click('#opSave')]);
  const name = dl.suggestedFilename(), file = OUT + '/saved.html'; await dl.saveAs(file); const size = fs.statSync(file).size;
  ok(name === 'The Offline Project (without Inkwell).html' && size > 3e7, "Save the app saves the file under the variation's name", { name, size });

  // 6. a full app handed to a room is refused, and nothing is made
  const refused = await p.evaluate(async () => { const orig = IngDemos.page, out = {};
    for (const k of ['cd', 'ingenium']) { IngDemos.page = (key, four, say) => key !== k ? orig(key, four, say) : (k === 'cd' ? libText('cd') : fetch(location.href).then(r => r.text())).then(t => ({ key: k, u8: new TextEncoder().encode(t || ''), version: 'x', edition: '' }));
      try { await IngOffline.make({ four: false }); out[k] = 'made'; } catch (e) { out[k] = e.message; } }
    IngDemos.page = orig; return out; });
  ok(/Carpe Diem: this page is not one of its demonstrations/.test(refused.cd) && /Ingenium: this page is not its demo edition/.test(refused.ingenium), 'the full Carpe Diem of the app library, and this master edition itself, are refused as rooms, and nothing is made', refused);

  // 7. kept in Fabrica: its history says what it was made from
  const kept = await p.evaluate(async () => { await IngOffline.keep(false); const rs = await IngRepo.list(), r = rs.filter(x => x.name === 'The Offline Project (without Inkwell)')[0]; if (!r) return { none: true };
    const l = await IngRepo.log(r.id, { max: 5 }); return { name: r.name, title: (l[0] || {}).title }; });
  ok(kept.name === 'The Offline Project (without Inkwell)' && /^Made from the demonstrations \(without Inkwell\): Carpe Diem \d+ · The Forge \d+ · Ingenium [0-9.]+$/.test(kept.title || ''), 'kept in Fabrica, its history says it was made from the demonstrations, with their builds', kept);
  const keys1 = await p.evaluate(() => Object.keys(libState().apps).sort());
  // the app library may have filled itself with the apps the page carries (reading Carpe Diem from it, above, does that); nothing else
  const carried = ['cd', 'forge', 'inkwell', 'ingenium', 'lakay'];
  ok(keys1.every(k => carried.indexOf(k) >= 0) && !keys1.some(k => /offline|op-/i.test(k)), 'nothing of the Offline Project is kept in the app library', { keys0, keys1 });
  ok(errs.length === 0, 'no script errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + (e && e.message || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
