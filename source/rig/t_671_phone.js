// Home, Blend and Folders on a phone (Ingenium 6.71, modules r261, r262 and r263; the tour's edit in build_page.py). Her words
// (10 November 2026): "The Iphone app does not have the new pages designs, I want them visible on the new Ios apps, I hate that they
// still have the old design and not the new one, I want that fixed now please."
// At an iPhone's size (390 by 844) and at the smallest (320 by 568, also an iPhone set to Larger Text in Display Zoom):
//   - Home is the orrery, Blend the movement and Folders the drawer, each in its phone layout, and no page is wider than the screen;
//   - over a whole turn of Home's orbit no room's name passes under the seal at the centre, and no room leaves the screen;
//   - the next step stands below the rooms; Blend's plate and Folders' drawer fit the screen; the build library's volume stands
//     above its words, not over them;
//   - on a phone the side buttons start laid down, and they stay laid down when the guided tour closes (they had stood up again
//     over the page); when she has raised them herself, the tour leaves them raised;
//   - below 260 pixels each page keeps its former look; no page error.
// The person and the apps are invented (Ada; Quill and Lantern), with Ingenium itself for its seal. On the public editions (four rooms on
// Home, no build library) the same checks run without the volume's.
//   node rig/t_671_phone.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_671_phone.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const SIZES = [['an iPhone (390 by 844)', { width: 390, height: 844 }], ['the smallest phone (320 by 568)', { width: 320, height: 568 }]];
(async () => {
  const b = await pw.chromium.launch();
  for (const [label, vp] of SIZES) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: true, hasTouch: true }); const p = await ctx.newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
    // 1. the side buttons: laid down on a phone, and still laid down when the guided tour closes
    const r0 = await p.evaluate(() => ({ down: document.body.classList.contains('rail-collapsed'), chosen: !!state.railChosen }));
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(400);
    await p.evaluate(() => { tourStart(0); }); await p.waitForTimeout(600);
    await p.evaluate(() => { tourEnd(); }); await p.waitForTimeout(900);
    // laid down, a side button is moved off the screen's edge, clear and out of reach (body.rail-collapsed .rail-btn)
    const r1 = await p.evaluate(() => ({ down: document.body.classList.contains('rail-collapsed'), seen: [...document.querySelectorAll('.rail-btn')].filter(e => { const cs = getComputedStyle(e);
      return cs.display !== 'none' && cs.pointerEvents !== 'none' && +cs.opacity > 0.05 && e.getBoundingClientRect().width > 0; }).length }));
    ok(r0.down && !r0.chosen && r1.down && r1.seen === 0, label + ': the side buttons start laid down and stay laid down when the tour closes', { r0, r1 });
    await p.evaluate(() => { state.railChosen = true; state.railCollapsed = false; applyCollapse(); tourStart(0); }); await p.waitForTimeout(500);
    await p.evaluate(() => { tourEnd(); }); await p.waitForTimeout(300);
    const r2 = await p.evaluate(() => document.body.classList.contains('rail-collapsed'));
    ok(!r2, label + ': raised by her own hand, the side buttons stay raised when the tour closes', r2);
    await p.evaluate(() => { state.railCollapsed = true; applyCollapse(); state.theme = 'day'; applyTheme();
      ['Lantern', 'Ingenium', 'Quill'].forEach(n => { try { IngFolders.make(n); } catch (e) {} }); saveState(); });

    // 2. Home: the orrery, in its phone layout
    await p.evaluate(() => go('home')); await p.waitForTimeout(1800);
    const h = await p.evaluate(async () => { const hx = document.getElementById('hx'), head = hx && hx.querySelector('.hx-head');
      const on = !!(hx && hx.classList.contains('ox-on') && hx.classList.contains('ox-narrow') && hx.querySelector('.ox-world'));
      if (!on) return { on };
      const an = document.getAnimations().filter(a => a.effect && a.effect.target && /ox-spin|ox-counter/.test(a.effect.target.className)), dur = an.length ? an[0].effect.getTiming().duration : 105000;
      an.forEach(a => a.pause()); const seal = head.querySelector('.hx-seal'), card = head.querySelector('.hx-next');
      let under = 0, edge = 0, low = 0, at = null;
      for (let i = 0; i < 36; i++) { an.forEach(a => a.currentTime = dur * i / 36); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        const s = seal.getBoundingClientRect(), pad = 4;
        head.querySelectorAll('.hx-key').forEach(k => { const n = k.querySelector('.hx-kh'), j = k.querySelector('.hx-jewel'); if (!n || !j) return; const q = n.getBoundingClientRect(), jr = j.getBoundingClientRect();
          const ox = Math.min(q.right, s.right - pad) - Math.max(q.left, s.left + pad), oy = Math.min(q.bottom, s.bottom - pad) - Math.max(q.top, s.top + pad);
          const ov = ox > 0 && oy > 0 ? Math.round(Math.min(ox, oy)) : 0; if (ov > under) { under = ov; at = n.textContent.trim(); }
          edge = Math.max(edge, Math.round(Math.max(-jr.left, jr.right - innerWidth, -q.left, q.right - innerWidth)));
          low = Math.max(low, Math.round(q.bottom)); }); }
      an.forEach(a => a.play());
      return { on, keys: head.querySelectorAll('.hx-key').length, under, at, edge, low, cardTop: Math.round(card.getBoundingClientRect().top), wide: document.documentElement.scrollWidth - innerWidth }; });
    ok(h.on && h.keys >= 4, label + ': Home is the orrery, in its phone layout', h);  // the master edition has six rooms, the public editions four
    ok(h.under === 0, label + ": over a whole turn no room's name passes under the seal at the centre", h);
    ok(h.edge <= 0 && h.wide <= 0, label + ': no room leaves the screen and Home is no wider than it', h);
    ok(h.low < h.cardTop, label + ': the next step stands below the rooms', h);
    // 6.72: the next step's keys keep the width of their words, one under the other, not the card's width (her words: "I don't want
    // the 'Bring in your first model' and 'Take the guided tour' buttons to be this wide and long for no reason")
    const kw = await p.evaluate(() => { const card = document.querySelector('#hx .hx-next'), row = card && card.querySelector('.hx-row-top'), cs = row && getComputedStyle(row);
      const inner = row ? row.getBoundingClientRect().width : 0, keys = ['heroNext', 'homeTour'].map(id => document.getElementById(id)).filter(k => k && k.offsetParent);
      return { inner: Math.round(inner), keys: keys.map(k => { const r = k.getBoundingClientRect(); return { id: k.id, w: Math.round(r.width), left: Math.round(r.left - row.getBoundingClientRect().left), words: Math.round(k.scrollWidth) }; }) }; });
    ok(kw.keys.length === 2 && kw.keys.every(k => k.w < kw.inner - 12 && k.left <= 1), label + ": the next step's keys keep the width of their words, not the card's", kw);
    await p.screenshot({ path: OUT + '/home_' + vp.width + '.png' });

    // 3. Blend: the movement, in its phone layout
    await p.evaluate(() => go('blend')); await p.waitForTimeout(1800);
    const bl = await p.evaluate(() => { const pg = document.getElementById('page-blend'), plate = pg.querySelector('.bx-plate'), st = window.IngBlendLook && IngBlendLook.state();
      const r = plate ? plate.getBoundingClientRect() : null;
      return { on: !!(st && st.on && pg.classList.contains('bx-narrow')), plate: r ? [Math.round(r.left), Math.round(r.right)] : null, wide: document.documentElement.scrollWidth - innerWidth,
        steps: pg.querySelectorAll('.rm-steps button, .rm-step').length }; });
    ok(bl.on && bl.plate && bl.plate[0] >= 0 && bl.plate[1] <= vp.width && bl.wide <= 0, label + ': Blend is the movement, its plate inside the screen and the page no wider than it', bl);
    await p.screenshot({ path: OUT + '/blend_' + vp.width + '.png' });

    // 4. Folders: the drawer, in its phone layout; the build library's volume above its words
    await p.evaluate(() => go('folders')); await p.waitForTimeout(1800);
    const fo = await p.evaluate(() => { const pg = document.getElementById('page-folders'), st = window.IngFoldersLook && IngFoldersLook.state(), dr = pg.querySelector('.fd-drawer');
      const card = pg.querySelector('.fd-libcard'), book = card && card.querySelector('.fd-book'), words = card ? [...card.children].filter(e => !e.classList.contains('fd-shelf') && e.getBoundingClientRect().height > 0) : [];
      const br = book ? book.getBoundingClientRect() : null, hit = br ? words.filter(e => { const r = e.getBoundingClientRect(); return Math.min(r.right, br.right) - Math.max(r.left, br.left) > 2 && Math.min(r.bottom, br.bottom) - Math.max(r.top, br.top) > 2; }).map(e => e.tagName + ':' + (e.textContent || '').trim().slice(0, 30)) : ['no book'];
      const d = dr ? dr.getBoundingClientRect() : null;
      return { on: !!(st && st.on && pg.classList.contains('fd-phone')), drawer: d ? [Math.round(d.left), Math.round(d.right)] : null, hit, lib: !!card, wide: document.documentElement.scrollWidth - innerWidth }; });
    ok(fo.on && fo.drawer && fo.drawer[0] >= 0 && fo.drawer[1] <= vp.width && fo.wide <= 0, label + ': Folders is the drawer, inside the screen, the page no wider than it', fo);
    // the build library is the master edition's alone (modules/r258.js): where there is none, there is no volume to place
    if (fo.lib) ok(fo.hit.length === 0, label + ": the build library's volume stands above its words, not over them", fo.hit);
    else console.log('note ' + label + ': this edition has no build library, so no volume is drawn');
    await p.evaluate(() => { const c = document.querySelector('#page-folders .fd-libcard'); if (c) c.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(400);
    await p.screenshot({ path: OUT + '/folders_' + vp.width + '.png' });
    ok(errs.length === 0, label + ': no page error', errs);
    await ctx.close();
  }

  // 5. below 260 pixels each page keeps its former look
  const ctx = await b.newContext({ viewport: { width: 250, height: 700 }, deviceScaleFactor: 1 }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); try { tourEnd(); } catch (e) {} }); await p.waitForTimeout(400);
  const old = {};
  for (const pg of ['home', 'blend', 'folders']) { await p.evaluate(pg => go(pg), pg); await p.waitForTimeout(1200);
    old[pg] = await p.evaluate(pg => { const e = document.getElementById('page-' + pg); return { w: e.clientWidth, on: pg === 'home' ? !!document.querySelector('#hx.ox-on') : pg === 'blend' ? e.classList.contains('bx-on') : e.classList.contains('fd-on') }; }, pg); }
  ok(!old.home.on && !old.blend.on && !old.folders.on && old.home.w < 260, 'below 260 pixels Home, Blend and Folders keep their former look', old);
  ok(errs.length === 0, 'below 260 pixels: no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + (e && e.message || e)); process.exit(1); });
