// node rig/t_685_folders.js <Ingenium page url (master)> <out folder>
// 6.86: and the drawer's label as a key (her words: "Also by "filtered", I meant both options"): only the folders not read yet.
// Ingenium 6.85 (12 November 2026), in Chromium: Folders' drawer pulls, Your apps' logos as Lector's, and any app's logo (modules/r279.js,
// with modules/r263.js and r277.js). Her words: "I want the apps seals on the "your apps" section to be animated and interactive and
// clickable ... I also want the 3D folders for the apps at the top of the page to be able to filtered, and reorderd by alphabetical
// order, and date but do no change the existing page design, just build it in as part of the 3D drawer. I want the Folders page to read
// and accept any app icon/logo and not be limited my apps." And on the preview: "I want you to replicate the same animations from the
// Lector page for these the apps logos on the "Your apps" section".
// Folders for her apps and two invented ones (Harbour Garden, made in Fabrica with a logo in its page; Quiet Notes, with none), each with
// a made date and a last use set by the test. Checks:
//   the pulls are keys in the drawer's grooves (the groove's size kept): the left finds as she types, Escape clears it, a word nothing
//   matches says so; the right turns Used last, A to Z, Z to A, Newest, Oldest and back, the front folder following, the order kept;
//   Your apps: each logo is Lector's layered seal (its layers, the same sway, 7 s), the Offline Project its live crest, Harbour Garden its
//   own logo, Quiet Notes a quiet disc; under the pointer it turns toward it and lifts, pressed it sinks; the card opens its folder;
//   by night the night layers; an opened folder takes a picture, a Mac app's .icns and an app's page (an SVG icon), refuses a broken
//   picture, and gives back the app's own logo; no letter anywhere; no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const zlib = require('zlib');
const [URL_, OUT] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
// an invented logo, a real PNG of 96 pixels (an orange disc), and a Mac icon file (.icns) holding a PNG of 256 pixels
function png(w, h, rgb) { const raw = Buffer.alloc((w * 4 + 1) * h); for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; for (let x = 0; x < w; x++) { const o = y * (w * 4 + 1) + 1 + x * 4, d = Math.hypot(x - w / 2, y - h / 2) < w / 2 - 2; raw[o] = rgb[0]; raw[o + 1] = rgb[1]; raw[o + 2] = rgb[2]; raw[o + 3] = d ? 255 : 0; } }
  const crcT = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; crcT[n] = c >>> 0; }
  const crc = b => { let c = 0xffffffff; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]); }
const PNG96 = png(96, 96, [196, 90, 60]), PNG256 = png(256, 256, [60, 120, 196]), PNG32 = png(32, 32, [20, 160, 90]);
function icns(parts) { const chunks = parts.map(([t, d]) => { const h = Buffer.alloc(8); h.write(t, 0, 'latin1'); h.writeUInt32BE(d.length + 8, 4); return Buffer.concat([h, d]); });
  const body = Buffer.concat(chunks), head = Buffer.alloc(8); head.write('icns', 0, 'latin1'); head.writeUInt32BE(body.length + 8, 4); return Buffer.concat([head, body]); }
const ICNS = icns([['icp5', PNG32], ['ic08', PNG256]]);
const SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#7a4fd0"/><path d="M20 34l8 8 16-18" stroke="#fff" stroke-width="5" fill="none"/></svg>';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(1000);
  await p.evaluate(async ({ PNG }) => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    const D = { 'Carpe Diem': ['2026-10-02', 7], 'The Forge': ['2026-10-05', 4], 'Ingenium': ['2026-10-01', 8], 'Inkwell': ['2026-10-20', 3], 'Lakay': ['2026-11-08', 5],
      'Offline Project': ['2026-11-06', 6], 'Harbour Garden': ['2026-11-12', 1], 'Quiet Notes': ['2026-11-11', 2] };
    Object.keys(D).forEach(n => { const f = IngFolders.make(n, n === 'Lakay' ? ['its Spiral'] : []); f.app.made = +new Date(D[n][0] + 'T12:00:00Z'); f.app.briefAt = +new Date('2026-11-01T00:00:00Z') + D[n][1] * 3600e3; f.app.brief = 'Where things stand in ' + n + '.'; });
    const html = '<!doctype html><html><head><meta charset="utf-8"><link rel="icon" type="image/png" sizes="96x96" href="data:image/png;base64,' + PNG + '"><title>Harbour Garden</title></head><body>A garden</body></html>';
    await IngRepo.fromFiles([{ path: 'index.html', data: new TextEncoder().encode(html) }], { name: 'Harbour Garden' });
    // 6.86: conversations not read yet in Carpe Diem (two) and Lakay (one); none elsewhere
    const byName = n => IngFolders.folders().find(f => f.name === n); state.chats = state.chats || [];
    [['Carpe Diem', 'The Desk, again'], ['Carpe Diem', 'Tabula prints'], ['Lakay', 'The Spiral at night']].forEach(([n, t], i) => state.chats.push({ id: 'c685' + i, projectId: byName(n).id, title: t, made: +new Date('2026-10-20T12:00:00Z') - i * 1000, messages: [{ role: 'user', content: t, at: +new Date('2026-10-20T12:00:00Z') - i * 1000 }] }));  // older than every folder's last use, so the order checks stand
    try { saveState(); } catch (e) {} go('folders'); }, { PNG: PNG96.toString('base64') });
  await sleep(3500);
  const st = () => p.evaluate(() => { const s = IngFoldersLook.state(), f = document.querySelector('#page-folders .fd-dfront'), inp = document.getElementById('fdFindIn'), ob = document.getElementById('fdOrderKey');
    const r = e => { if (!e) return null; const q = e.getBoundingClientRect(); return [Math.round(q.width), Math.round(q.height)]; };
    return { files: s.files, front: s.files[s.files.length - 1], label: (document.querySelector('#page-folders .fd-label small') || {}).textContent, hint: (document.querySelector('#page-folders .fd-hint') || {}).textContent,
      hidden: f && f.getAttribute('aria-hidden'), find: r(inp && inp.parentNode), order: r(ob), orderText: ob && ob.textContent, kept: state.folders.ui.order || null,
      coins: document.querySelectorAll('#page-folders .fd-coin').length }; });
  // 1. the pulls
  let s = await st();
  ok(s.hidden === null && s.find && s.order && s.find.join() === '120,20' && s.order.join() === '120,20', 'the drawer\'s two pulls are keys, in grooves of the same size as before (120 by 20)', s);
  ok(s.files.length === 6 && s.front === 'Ingenium' && /^8 folders, used last, the first six$/.test(s.label) && s.orderText === 'Used last', 'the drawer holds the six used last, Ingenium in front, and its label says so', s);
  await p.evaluate(() => window.scrollTo(0, 0)); await (await p.$('#page-folders .fd-head')).screenshot({ path: OUT + '/drawer.png' });
  await p.click('#fdFindIn'); await p.keyboard.type('lak'); await sleep(500); s = await st();
  ok(s.files.join() === 'Lakay' && /^1 of 8 match .lak.$/.test(s.label), 'the left pull finds Lakay as she types', s);
  await (await p.$('#page-folders .fd-head')).screenshot({ path: OUT + '/find.png' });
  await p.fill('#fdFindIn', 'spiral'); await sleep(400); s = await st(); ok(s.files.join() === 'Lakay', 'it finds a folder by its parts too (its Spiral)', s);
  await p.fill('#fdFindIn', 'zzz'); await sleep(400); s = await st();
  ok(s.files.length === 0 && /^No folder matches .zzz.$/.test(s.label) && /Clear the left pull/.test(s.hint), 'a word nothing matches empties the drawer and says so', s);
  await p.press('#fdFindIn', 'Escape'); await sleep(500); s = await st(); ok(s.files.length === 6 && !/match/.test(s.label), 'Escape clears it, and the six stand again', s);
  const orders = [['az', 'A to Z', 'Carpe Diem'], ['za', 'Z to A', 'The Forge'], ['new', 'Newest', 'Harbour Garden'], ['old', 'Oldest', 'Ingenium'], ['used', 'Used last', 'Ingenium']];
  for (const [k, t, fr] of orders) { await p.click('#fdOrderKey'); await sleep(450); s = await st();
    ok(s.kept === k && s.orderText === t && s.front === fr && s.label.indexOf(t.toLowerCase()) > 0, 'the right pull turns to ' + t + ', ' + fr + ' in front, and the order is kept', s); }
  await p.keyboard.down('Shift'); await p.click('#fdOrderKey'); await p.keyboard.up('Shift'); await sleep(400); s = await st(); ok(s.kept === 'old', 'with Shift it turns back (Oldest)', s);
  await p.click('#fdOrderKey'); await sleep(300);
  // 1b. the label as a key (6.86): only the folders with conversations not read yet
  const lab = () => p.evaluate(() => { const l = document.querySelector('#page-folders .fd-dfront .fd-label'); return { keyed: l.classList.contains('fd-keyed'), role: l.getAttribute('role'), pressed: l.getAttribute('aria-pressed'), title: (l.querySelector('b') || {}).textContent, kept: state.folders.ui.filter || null }; });
  let lb = await lab(); ok(lb.keyed && lb.role === 'button' && lb.pressed === 'false' && lb.title === 'Your apps', 'the drawer\'s label is a key, showing every folder', lb);
  await p.click('#page-folders .fd-dfront .fd-label'); await sleep(500); s = await st(); lb = await lab();
  ok(lb.pressed === 'true' && lb.title === 'Not read yet' && lb.kept === 'unread' && s.files.slice().sort().join() === 'Carpe Diem,Lakay' && /^2 of 8 not read yet, used last$/.test(s.label), 'pressed, the drawer holds only the folders not read yet (Carpe Diem and Lakay), says so, and keeps the choice', { lb, s });
  await (await p.$('#page-folders .fd-head')).screenshot({ path: OUT + '/unread.png' });
  await p.fill('#fdFindIn', 'car'); await sleep(400); s = await st(); ok(s.files.join() === 'Carpe Diem' && /^1 of 2 not read yet match .car.$/.test(s.label), 'it works with the left pull\'s word', s);
  await p.fill('#fdFindIn', 'forge'); await sleep(400); s = await st(); ok(s.files.length === 0 && /Clear the left pull, or press the label/.test(s.hint), 'a word that matches none not read yet says how to see every folder', s);
  await p.press('#fdFindIn', 'Escape'); await sleep(300);
  await p.focus('#page-folders .fd-dfront .fd-label'); await p.keyboard.press('Enter'); await sleep(500); s = await st(); lb = await lab();
  ok(lb.pressed === 'false' && lb.kept === 'all' && s.files.length === 6, 'pressed again (by the keyboard too), every folder stands again', { lb, files: s.files });
  // 2. Your apps: the logos as Lector's
  const cards = () => p.evaluate(() => { const out = {}; document.querySelectorAll('#page-folders .fld-card:not(.fld-new)').forEach(c => { const nm = c.querySelector('.fld-name'), e = nm && nm.firstElementChild;
      const idle = e && e.querySelector('.ls-idle'), ims = e ? [...e.querySelectorAll('.ls-idle > img.ls-l')] : [];
      out[nm.textContent.trim()] = { cls: e && e.className, seal: e && e.getAttribute('data-fd-seal'), layers: ims.length, z: ims.map(i => i.style.getPropertyValue('--z')), src: ims[0] && ims[0].src.slice(0, 22), srcs: ims.map(i => i.src),
        anim: idle ? getComputedStyle(idle).animationName + ' ' + getComputedStyle(idle).animationDuration : null, disc: !!(e && e.querySelector('.ls-l.ing-logo-wait')), quarters: !!(e && /ic-quarters/.test(e.className)) }; }); return out; });
  await p.waitForFunction(() => { const c = [...document.querySelectorAll('#page-folders .fld-card')].find(x => /Harbour Garden/.test(x.textContent)); return c && c.querySelector('.fd-ls img.ls-l'); }, null, { timeout: 30000 }).catch(() => {});
  let C = await cards();
  const lx = await p.evaluate(() => ({ cd: (window.LX7_LAYERS && LX7_LAYERS.cd || []).map(x => x.src), cdN: (window.LX7_LAYERS && LX7_LAYERS.cdN || []).map(x => x.src), lakay: (window.LX7_LAYERS && LX7_LAYERS.lakay || []).length }));
  ok(['Carpe Diem', 'The Forge', 'Ingenium', 'Inkwell'].every(n => C[n] && /fd-ls/.test(C[n].cls) && C[n].layers === 4 && C[n].anim === 'fdLsSway 7s'), 'Carpe Diem, The Forge, Ingenium and Inkwell wear Lector\'s layered seals, four layers each, swaying as on Lector (7 s)', ['Carpe Diem', 'The Forge', 'Ingenium', 'Inkwell'].map(n => C[n]));
  ok(C['Carpe Diem'] && JSON.stringify(C['Carpe Diem'].srcs) === JSON.stringify(lx.cd), 'they are Lector\'s very layers (LX7_LAYERS), by day', { have: C['Carpe Diem'] && C['Carpe Diem'].srcs.length, lx: lx.cd.length });
  ok(C.Lakay && C.Lakay.layers === lx.lakay && lx.lakay === 16 && C.Lakay.anim === 'fdLsSway 7s', 'Lakay wears its Spiral in its sixteen planes, as on Lector', C.Lakay);
  ok(C['Offline Project'] && /ing-crest/.test(C['Offline Project'].cls) && C['Offline Project'].quarters, 'the Offline Project wears its live crest with its quarters moving, as on Lector', C['Offline Project']);
  ok(C['Harbour Garden'] && C['Harbour Garden'].layers === 1 && C['Harbour Garden'].src === 'data:image/png;base64,' && C['Harbour Garden'].anim === 'fdLsSway 7s', 'Harbour Garden wears the logo from its own page, in the same motion', C['Harbour Garden']);
  ok(C['Quiet Notes'] && C['Quiet Notes'].disc && C['Quiet Notes'].layers === 0, 'Quiet Notes, with no logo anywhere, a quiet disc in the same motion; no letter', C['Quiet Notes']);
  // under the pointer, and pressed
  const card = await p.evaluateHandle(() => [...document.querySelectorAll('#page-folders .fld-card')].find(x => /^\s*Inkwell/.test(x.querySelector('.fld-name').textContent)));
  await card.asElement().scrollIntoViewIfNeeded(); await sleep(400);
  const bb = await (await card.asElement().$('.fd-ls')).boundingBox();
  await p.mouse.move(bb.x + bb.width * .9, bb.y + bb.height * .2); await sleep(150); await p.mouse.move(bb.x + bb.width * .95, bb.y + bb.height * .15); await sleep(500);
  const hv = await card.asElement().evaluate(c => { const l = c.querySelector('.fd-ls'); return { hov: l.classList.contains('hov'), ry: l.style.getPropertyValue('--ry'), rx: l.style.getPropertyValue('--rx'), t: getComputedStyle(l.querySelector('.ls-tilt')).transform }; });
  ok(hv.hov && parseFloat(hv.ry) > 5 && parseFloat(hv.rx) > 5 && hv.t !== 'none', 'under the pointer it turns toward it and lifts, as on Lector', hv);
  await p.screenshot({ path: OUT + '/cards_hover.png' });
  await p.mouse.down(); await sleep(120);
  const dn = await card.asElement().evaluate(c => c.querySelector('.fd-ls').classList.contains('down'));
  await p.mouse.up(); await sleep(1200);
  const op = await p.evaluate(() => ({ open: state.folders.ui.open, name: (IngFolders.folders().find(f => f.id === state.folders.ui.open) || {}).name, down: document.querySelectorAll('#page-folders .fd-ls.down').length }));
  ok(dn && op.name === 'Inkwell' && op.down === 0, 'pressed, it sinks; the card opens its folder', { dn, op });
  // 3. an opened folder: its logo
  const back = () => p.evaluate(() => { state.folders.ui.open = null; IngFolders.paint(); });
  const openF = n => p.evaluate(n => { const f = IngFolders.folders().find(x => x.name === n); state.folders.ui.open = f.id; IngFolders.paint(); }, n);
  await back(); await sleep(600); await openF('Quiet Notes'); await sleep(1200);
  const row = await p.evaluate(() => { const r = document.querySelector('#page-folders .fd-logorow'); return r ? { keys: [...r.querySelectorAll('button')].map(b => b.textContent), input: !!r.querySelector('input[type=file]') } : null; });
  ok(row && row.keys.join('|') === 'Choose a picture|From the app\'s page' && row.input, 'an opened folder offers Its logo: a picture or the app\'s page', row);
  await p.screenshot({ path: OUT + '/folder_before.png' });
  const logoState = n => p.evaluate(n => { const k = IngAppLogo.norm(n), o = (state.appLogos || {})[k], cover = document.querySelector('#page-folders .fd-oh > img');
    return { own: !!(o && o.own), src: o && o.src && o.src.slice(0, 22), cover: cover && cover.src.slice(0, 22), coverW: cover && cover.naturalWidth }; }, n);
  await p.setInputFiles('#fdLogoFile', { name: 'logo.png', mimeType: 'image/png', buffer: PNG96 }); await sleep(1500);
  let ls = await logoState('Quiet Notes');
  ok(ls.own && ls.src === 'data:image/png;base64,' && ls.cover === 'data:image/png;base64,' && ls.coverW === 96, 'a picture chosen becomes Quiet Notes\' own logo, on its cover, read and kept', ls);
  await p.screenshot({ path: OUT + '/folder_logo.png' });
  const again = await p.evaluate(() => [...document.querySelectorAll('#page-folders .fd-logorow button')].map(b => b.textContent));
  ok(again.indexOf('Its own logo again') >= 0, 'and Its own logo again is offered', again);
  await back(); await sleep(900); C = await cards();
  // (Quiet Notes is not among the six used last: the left pull finds it)
  await p.evaluate(() => IngFolderView.setFind('quiet')); await sleep(600);
  const dr = await p.evaluate(() => { const f = [...document.querySelectorAll('#page-folders .fd-file')].find(x => /^Quiet Notes/.test(x.getAttribute('aria-label'))); return f ? (f.querySelector('.fd-tab img') || {}).src : 'not in the drawer'; });
  await p.evaluate(() => IngFolderView.setFind('')); await sleep(400);
  ok(C['Quiet Notes'] && C['Quiet Notes'].seal === 'own' && C['Quiet Notes'].layers === 1 && C['Quiet Notes'].src === 'data:image/png;base64,' && /^data:image\/png/.test(dr || ''), 'it wears it on its card, in Lector\'s motion, and in the drawer', { card: C['Quiet Notes'], dr: String(dr).slice(0, 30) });
  // a Mac app's icon file, and an app's page with an SVG icon
  await openF('Harbour Garden'); await sleep(1000);
  await p.setInputFiles('#fdLogoFile', { name: 'Harbour Garden.icns', mimeType: '', buffer: ICNS }); await sleep(1500);
  ls = await logoState('Harbour Garden'); ok(ls.own && ls.coverW === 256, 'a Mac app\'s icon file (.icns) gives its logo (its PNG of 256 pixels)', ls);
  const pg = '<!doctype html><html><head><link rel="icon" href="data:image/svg+xml;base64,' + Buffer.from(SVG).toString('base64') + '"><title>The Lantern</title></head><body></body></html>';
  await back(); await sleep(400); await p.evaluate(() => IngFolders.make('The Lantern')); await openF('The Lantern'); await sleep(1000);
  await p.setInputFiles('#fdLogoFile', { name: 'lantern.html', mimeType: 'text/html', buffer: Buffer.from(pg) }); await sleep(1500);
  ls = await logoState('The Lantern'); ok(ls.own && ls.src === 'data:image/png;base64,' && ls.coverW === 256, 'an app\'s own page gives its logo, an SVG drawn whole and kept as a picture', ls);
  // a broken picture is refused
  await p.setInputFiles('#fdLogoFile', { name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('not a picture') }); await sleep(1200);
  const br = await logoState('The Lantern'); ok(br.own && br.src === ls.src, 'a picture that cannot be read is refused, and the logo stays as it was', br);
  // its own logo again (Ingenium: its seal)
  await back(); await sleep(400); await openF('Ingenium'); await sleep(900);
  await p.setInputFiles('#fdLogoFile', { name: 'logo.png', mimeType: 'image/png', buffer: PNG96 }); await sleep(1400);
  const io = await p.evaluate(() => { const c = document.querySelector('#page-folders .fd-oh > *'); return { own: !!IngAppLogo.own('Ingenium'), cover: c && c.tagName, which: c && c.getAttribute('data-applogo') }; });
  ok(io.own && io.which === 'own', 'any app can wear a logo of her choosing, even one with its own seal', io);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#page-folders .fd-logorow button')].find(b => b.textContent === 'Its own logo again'); if (k) k.click(); }); await sleep(1200);
  const ig = await p.evaluate(() => { const c = document.querySelector('#page-folders .fd-oh > *'); return { own: !!IngAppLogo.own('Ingenium'), seal: c && c.getAttribute('data-fd-seal') }; });
  ok(!ig.own && ig.seal === 'ingenium', 'Its own logo again gives Ingenium its seal back', ig);
  // 4. by night: the night layers
  await back(); await p.evaluate(() => { state.theme = 'night'; try { applyTheme(); } catch (e) { document.body.setAttribute('data-theme', 'night'); } }); await sleep(1500);
  C = await cards();
  ok(C['Carpe Diem'] && JSON.stringify(C['Carpe Diem'].srcs) === JSON.stringify(lx.cdN) && lx.cdN.length === 4, 'by night Carpe Diem wears its night layers, as on Lector', { have: C['Carpe Diem'] && C['Carpe Diem'].srcs.length });
  s = await st(); ok(s.coins === 0, 'no letter coin anywhere, by day or by night', s.coins);
  await p.evaluate(() => { const c = document.querySelector('#page-folders .fld-grid'); if (c) c.scrollIntoView({ block: 'center' }); }); await sleep(800);
  await p.screenshot({ path: OUT + '/cards_night.png' });
  await p.evaluate(() => { state.theme = 'day'; try { applyTheme(); } catch (e) { document.body.setAttribute('data-theme', 'day'); } }); await sleep(800);
  ok(errs.length === 0, 'no page error', errs);
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
