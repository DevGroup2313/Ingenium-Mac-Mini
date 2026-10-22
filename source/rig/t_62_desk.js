// Ingenium 6.2 · the desk's ways back (modules/r123.js, r155.js; ingenium_app.py's window page), in Chromium.
// The owner's words (22 October 2026): "The exported floating windows have no way back into Ingenium's main desk and the
// app just disappears from view, a second window is not made when I click to create a standalone window, please fix that.
// the collapsible chevron is covered and hidden from view by the export floating window button for the apps".
//   - with an app open full width, the float key and the chevron both show, apart, the chevron above (desk and phone);
//   - a floating window has a key back into the desk: the app is full width again, the words written in it carried across;
//   - a window of its own keeps a tab on the main Desk bar; its ⤓ brings the app back into the desk, the work with it,
//     and the window closes; the window's own "Back to Ingenium's desk" key does the same; a window closed by hand
//     loses its tab; a refused pop-up is said at once;
//   - the window page (what the Mac and Windows apps give a window of its own) is about a quarter of the page and opens
//     an app with its side keys and its way home, with no page errors.
//   node rig/t_62_desk.js http://127.0.0.1:8150/ingenium.html <out folder> [window page url]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, WURL] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const shot = (p, n) => p.screenshot({ path: path.join(OUT, n + '.png') });
async function enter(p) {
  await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 150000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(500);
}
const rects = p => p.evaluate(() => { const r = id => { const e = document.getElementById(id); if (!e || getComputedStyle(e).display === 'none') return null; const b = e.getBoundingClientRect(); return b.width ? [Math.round(b.left), Math.round(b.top), Math.round(b.right), Math.round(b.bottom)] : null; };
  return { float: r('fabFloat'), chev: r('railChevron'), bell: r('fabBell'), top: Math.round((document.querySelector('.topbar') || { getBoundingClientRect: () => ({ bottom: 0 }) }).getBoundingClientRect().bottom), h: innerHeight }; });
const apart = (a, b) => !!a && !!b && (a[3] <= b[1] || b[3] <= a[1] || a[2] <= b[0] || b[2] <= a[0]);
// the words in Tabula: written through its own editor, read back from it
const write = (fr, t) => fr.evaluate(t => { const e = document.getElementById('editor'); e.focus(); e.innerHTML = e.innerHTML + '<p>' + t + '</p>'; e.dispatchEvent(new Event('input', { bubbles: true })); }, t);
const words = fr => fr.evaluate(() => { const e = document.getElementById('editor'); return e ? e.innerText : ''; });
const tabFrame = (p, sel) => p.waitForSelector(sel, { timeout: 30000 }).then(h => h.contentFrame());

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  try {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    const pops = []; ctx.on('page', np => { pops.push(np); np.on('pageerror', e => errs.push('[window] ' + e.message)); });
    await p.goto(URL_); await enter(p);

    // ---------------- 1 · the float key and the chevron ----------------
    await p.evaluate(() => go('tabula')); await p.waitForTimeout(3500);
    let r = await rects(p);
    ok(r.float && r.chev && apart(r.float, r.chev) && r.chev[3] <= r.float[1] && r.chev[1] >= r.top, 'with Tabula open, the float key and the chevron both show, apart, the chevron above it', r);
    await shot(p, 'd62-keys-desk');
    await p.evaluate(() => go('home')); await p.waitForTimeout(500);
    const r0 = await rects(p);
    ok(!r0.float && r0.chev && r0.chev[3] <= r0.bell[1], 'back at Ingenium\'s own pages, the float key goes and the chevron stands above the bell as before', r0);
    for (const vp of [{ width: 390, height: 844 }, { width: 844, height: 390 }]) {
      await p.setViewportSize(vp); await p.evaluate(() => go('tabula')); await p.waitForTimeout(1800); await p.evaluate(() => window.IngSideFit && IngSideFit.fit()); await p.waitForTimeout(300);
      r = await rects(p);
      ok(r.float && r.chev && apart(r.float, r.chev) && r.chev[1] >= r.top - 1 && r.float[3] <= r.h, 'at ' + vp.width + ' x ' + vp.height + ' too: both show, apart, inside the window', r);
      await shot(p, 'd62-keys-' + vp.width);
    }
    await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(600);

    // ---------------- 2 · a floating window goes back into the desk ----------------
    await p.evaluate(() => go('tabula')); await p.waitForTimeout(1500);
    await p.click('#fabFloat'); await p.waitForTimeout(3500);
    let fr = await tabFrame(p, '.ing-fw iframe'); await fr.waitForSelector('#editor', { timeout: 30000 });
    await write(fr, 'Carried home from a floating window.'); await p.waitForTimeout(500);
    const dk = await p.evaluate(() => { const k = [...document.querySelectorAll('.ing-fw-keys button')].find(b => /Back into the desk/.test(b.getAttribute('aria-label') || '')); return k ? { name: k.getAttribute('aria-label'), svg: !!k.querySelector('svg') } : null; });
    ok(!!dk && dk.svg, 'a floating window has a key back into the desk, named', dk);
    await shot(p, 'd62-float-keys');
    await p.evaluate(() => [...document.querySelectorAll('.ing-fw-keys button')].find(b => /Back into the desk/.test(b.getAttribute('aria-label') || '')).click()); await p.waitForTimeout(3500);
    const st = await p.evaluate(() => IngDesk.state());
    fr = await tabFrame(p, '#ing-desk iframe[data-app="tabula"]'); await fr.waitForSelector('#editor', { timeout: 30000 }); await p.waitForTimeout(800);
    const w2 = await words(fr);
    ok(st.windows.length === 0 && st.shown && st.active === 'tabula', 'pressed: the floating window is gone and Tabula is full width in the desk', st);
    ok(/Carried home from a floating window/.test(w2), 'with the words written in it', w2.slice(0, 120));

    // ---------------- 3 · a window of its own, and home again ----------------
    await write(fr, ' And sent out to a window of its own.'); await p.waitForTimeout(400);
    await p.click('#fabFloat'); await p.waitForTimeout(3000);
    const n0 = pops.length;
    await p.evaluate(() => document.querySelector('.ing-fw [data-ing-export]').click());
    for (let i = 0; i < 60 && pops.length === n0; i++) await p.waitForTimeout(500);
    let pop = pops[pops.length - 1];
    if (pop) { await pop.setViewportSize({ width: 1180, height: 840 }); }
    for (let i = 0; i < 120; i++) { const l = await p.evaluate(() => Object.keys(IngDesk.lites()).length); if (l) break; await p.waitForTimeout(500); }
    const t1 = await p.evaluate(() => ({ lites: IngDesk.lites(), tab: (document.querySelector('#ing-deskbar [data-lite]') || {}).textContent || '', home: !!document.querySelector('#ing-deskbar [data-litex]'), wins: IngDesk.state().windows }));
    ok(!!pop && Object.keys(t1.lites).length === 1 && /Tabula/.test(t1.tab) && t1.home && t1.wins.length === 0, 'sent to a window of its own: the main Desk bar keeps a tab for it, with a key to bring it back', t1);
    await shot(p, 'd62-lite-tab');
    if (pop) {
      await pop.waitForFunction(() => window.IngDesk && IngDesk.state().active === 'tabula', null, { timeout: 60000 }).catch(() => {});
      const lp = await pop.evaluate(() => { const k = document.getElementById('ingLiteHome'); return { key: !!k && getComputedStyle(k).display !== 'none', name: k && k.textContent }; });
      ok(lp.key && /Back to Ingenium/.test(lp.name), 'that window has a key back to Ingenium\'s desk', lp);
      await pop.screenshot({ path: path.join(OUT, 'd62-lite-window.png') });
      // the tab's ⤓ brings it home
      const closed = pop.waitForEvent('close', { timeout: 20000 }).then(() => true, () => false);
      await p.evaluate(() => document.querySelector('#ing-deskbar [data-litex]').click());
      const gone = await closed;
      await p.waitForTimeout(3500);
      const t2 = await p.evaluate(() => ({ s: IngDesk.state(), lites: Object.keys(IngDesk.lites()).length }));
      fr = await tabFrame(p, '#ing-desk iframe[data-app="tabula"]'); await fr.waitForSelector('#editor', { timeout: 30000 }); await p.waitForTimeout(800);
      const w3 = await words(fr);
      ok(gone && t2.s.shown && t2.s.active === 'tabula' && t2.lites === 0, 'the tab\'s ⤓ brings Tabula back into the desk, full width, and the window closes', { gone, t2 });
      ok(/And sent out to a window of its own/.test(w3), 'with the work carried home', w3.slice(0, 160));
    }
    // the window's own key home
    await p.click('#fabFloat'); await p.waitForTimeout(3000);
    const n1 = pops.length;
    await p.evaluate(() => document.querySelector('.ing-fw [data-ing-export]').click());
    for (let i = 0; i < 60 && pops.length === n1; i++) await p.waitForTimeout(500);
    pop = pops[pops.length - 1];
    if (pop && pops.length > n1) {
      await pop.waitForFunction(() => window.IngDesk && IngDesk.state().active === 'tabula' && document.getElementById('ingLiteHome'), null, { timeout: 60000 }).catch(() => {});
      const closed = pop.waitForEvent('close', { timeout: 20000 }).then(() => true, () => false);
      await pop.click('#ingLiteHome');
      const gone = await closed; await p.waitForTimeout(3000);
      const t3 = await p.evaluate(() => ({ s: IngDesk.state(), lites: Object.keys(IngDesk.lites()).length }));
      ok(gone && t3.s.shown && t3.s.active === 'tabula' && t3.lites === 0, 'the window\'s own "Back to Ingenium\'s desk" brings it home too', { gone, t3 });
    } else ok(false, 'a second window opened for the window\'s own key', pops.length);
    // a window closed by hand loses its tab
    await p.click('#fabFloat'); await p.waitForTimeout(3000);
    const n2 = pops.length;
    await p.evaluate(() => document.querySelector('.ing-fw [data-ing-export]').click());
    for (let i = 0; i < 60 && pops.length === n2; i++) await p.waitForTimeout(500);
    pop = pops[pops.length - 1];
    for (let i = 0; i < 120; i++) { const l = await p.evaluate(() => Object.keys(IngDesk.lites()).length); if (l) break; await p.waitForTimeout(500); }
    if (pop && pops.length > n2) { await pop.close(); await p.waitForTimeout(3000); }
    const t4 = await p.evaluate(() => ({ lites: Object.keys(IngDesk.lites()).length, tab: !!document.querySelector('#ing-deskbar [data-lite]') }));
    ok(t4.lites === 0 && !t4.tab, 'a window of its own closed by hand loses its tab', t4);
    // a refused pop-up is said at once
    await p.evaluate(() => go('abacus')); await p.waitForTimeout(3000); await p.click('#fabFloat'); await p.waitForTimeout(3000);
    const t0 = Date.now();
    await p.evaluate(() => { window.__openWas = window.open; window.open = () => null; document.querySelector('.ing-fw [data-ing-export]').click(); }); await p.waitForTimeout(800);
    const t5 = await p.evaluate(() => ({ w: IngDesk.state().windows, t: (document.getElementById('ingToast') || {}).textContent || '' }));
    await p.evaluate(() => { window.open = window.__openWas; });
    ok(t5.w.join() === 'abacus' && /kept no new window/.test(t5.t) && Date.now() - t0 < 3000, 'a refused pop-up leaves Abacus where it was and says so at once', t5);

    // ---------------- 4 · the window page ----------------
    if (WURL) {
      const wp = await ctx.newPage(); const werrs = []; wp.on('pageerror', e => werrs.push(e.message));
      const size = (await (await fetch(WURL)).arrayBuffer()).byteLength, full = (await (await fetch(URL_)).arrayBuffer()).byteLength;
      ok(size < full * 0.35, 'the window page is about a quarter of the page (' + Math.round(size / 1e6) + ' of ' + Math.round(full / 1e6) + ' MB)', { size, full });
      const t6 = Date.now();
      await wp.goto(WURL + '#ingapp=scriba'); await wp.waitForFunction(() => window.IngDesk && IngDesk.state().active === 'scriba', null, { timeout: 120000 });
      const wst = await wp.evaluate(() => ({ lite: document.documentElement.classList.contains('ing-lite'), bell: getComputedStyle(document.getElementById('fabBell')).display, home: !!document.getElementById('ingLiteHome'), title: document.title }));
      ok(wst.lite && wst.bell !== 'none' && wst.home && /Scriba/.test(wst.title), 'it opens an app with its side keys and its way home (' + Math.round((Date.now() - t6) / 100) / 10 + ' s here)', wst);
      await wp.waitForTimeout(10000);
      ok(werrs.length === 0, 'and no page errors there, ten seconds on', werrs.slice(0, 3));
      await wp.close();
    }
    ok(errs.length === 0, 'no page errors along the way', errs.slice(0, 4));
  } catch (e) { ok(false, 'crashed: ' + (e && e.stack || e)); }
  await b.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
