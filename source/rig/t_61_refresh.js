// Ingenium 6.1 · the loading page (boot/splash.html) and Refresh (modules/r151.js), in Chromium:
// the loading page is painted before the rest of the page is read, follows the Display setting by night, shows how far the
// painting has got and lifts once the page is ready; a page that never finishes starting says so and offers Refresh; the
// Refresh key in the top bar (and F5, Ctrl+R) saves the desk first and starts again, asking first while a reply is still
// being written; a press on a slow page's name shows "Painting …" while the page is painted, and the note goes after.
//   node rig/t_61_refresh.js http://127.0.0.1:8311/ingenium.html <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : '')); c ? pass++ : fail++; };
const shot = (p, n) => p.screenshot({ path: path.join(OUT, n + '.png') });

// what the loading page looks like while the page is read: polled from the start until the page is ready
async function watchLoad(p) {
  const seen = { splashBefore: 0, polls: 0, night: false, pctMax: 0, pcts: [] };
  const t0 = Date.now();
  while (Date.now() - t0 < 120000) {
    let r = null;
    try { r = await p.evaluate(() => { const b = document.getElementById('ing-boot'); if (!b) return { none: 1, ready: window.__ingReady === true };
      const cs = getComputedStyle(b); return { ready: window.__ingReady === true, vis: cs.display !== 'none' && cs.visibility !== 'hidden', night: b.classList.contains('ib-night'),
        pct: +(b.querySelector('.ib-bar').getAttribute('aria-valuenow') || 0), say: document.getElementById('ib-say').textContent }; }); } catch (e) { }
    if (r) { seen.polls++; if (!r.ready && r.vis) seen.splashBefore++; if (r.night) seen.night = true; if (r.pct) { seen.pcts.push(r.pct); seen.pctMax = Math.max(seen.pctMax, r.pct); } if (r.say) seen.say = r.say; if (r.ready) break; }
    await new Promise(z => setTimeout(z, 30));
  }
  return seen;
}
// the key lives in the Display panel (the owner's words, 21 October 2026: "Put the refresh the app button inside of the
// display panel, that keeps things neater."): open it first
async function openDisplay(p) { await p.evaluate(() => { const d = document.getElementById('displayPanel'); if (d && d.hidden) document.getElementById('displayBtn').click(); }); await p.waitForTimeout(350); }
async function enter(p) {
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(600);
}

(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  let navs = 0; p.on('framenavigated', f => { if (f === p.mainFrame()) navs++; });

  // 1 · the first start
  p.goto(URL_).catch(() => { });
  const s1 = await watchLoad(p);
  ok(s1.splashBefore > 0, 'the loading page is shown while the page is still being read', s1.splashBefore + ' of ' + s1.polls + ' looks');
  ok(/still being painted; nothing has crashed/.test(s1.say || ''), 'it says the page is still being painted and nothing has crashed', s1.say);
  const mono = s1.pcts.every((v, i, a) => i === 0 || v >= a[i - 1]);
  ok(mono, 'its bar only moves forward', s1.pcts.slice(0, 30));
  await p.waitForTimeout(900);
  const after = await p.evaluate(() => { const b = document.getElementById('ing-boot'); return { gone: b.classList.contains('ib-gone'), busy: b.getAttribute('aria-busy'), disp: getComputedStyle(b).display,
    scripts: document.scripts.length, map: (document.documentElement.innerHTML.match(/ING_BOOT_MAP\*\/(\[[0-9,]*\])/) || [])[1] }; });
  ok(after.gone && after.disp === 'none' && after.busy === 'false', 'it lifts once the page is ready', after);
  const mapLen = after.map ? JSON.parse(after.map).length : -1;
  ok(mapLen > 20 && Math.abs(mapLen - after.scripts) <= Math.max(3, Math.round(mapLen * 0.05)), "the bar's map counts the page's scripts as the browser does", { map: mapLen, scripts: after.scripts });
  await enter(p);

  // 2 · the Refresh key, in the top bar, labelled
  const bar = await p.evaluate(() => { const k = document.getElementById('refreshBtn'); return { inBar: !!(k && k.closest('.topbar,.topbar-tools')), inPanel: !!(k && k.closest('#displayPanel')) }; });
  ok(!bar.inBar && bar.inPanel, 'the key is in the Display panel, not in the top bar', bar);
  await openDisplay(p);
  const key = await p.evaluate(() => { const k = document.getElementById('refreshBtn'); if (!k) return null; const r = k.getBoundingClientRect(), panel = document.getElementById('displayPanel');
    const first = panel.querySelector('.sch-head').nextElementSibling;
    const other = document.querySelector('#dpTheme .seg-btn'), o = other.getBoundingClientRect(), cs = getComputedStyle(k), co = getComputedStyle(other);
    const same = k.classList.contains('seg-btn') && Math.abs(r.height - o.height) <= 2 && cs.borderRadius === co.borderRadius && cs.fontSize === co.fontSize && r.width < panel.getBoundingClientRect().width * 0.75;
    const rows = [...panel.children].map(c => c.className);
    return { name: k.innerText.trim(), vis: !!k.offsetParent && r.width > 60 && r.bottom <= innerHeight, first: rows[1] === 'dp-sec' && rows[2].indexOf('dp-refresh') >= 0, tag: k.tagName, same, w: Math.round(r.width), h: Math.round(r.height), oh: Math.round(o.height) }; });
  ok(key && key.vis && key.first && key.name === 'Refresh the app' && key.tag === 'BUTTON', 'Display opens with "Refresh the app" first, in words, as a button', key);
  ok(key && key.same, 'the key has the look and size of the panel\'s other keys (not a wide bar)', key);
  await p.screenshot({ path: path.join(OUT, 'r61-display-panel.png') });
  await p.evaluate(() => document.getElementById('dpClose').click());
  await p.evaluate(() => go('settings')); await p.waitForTimeout(400);
  const crd = await p.evaluate(() => { const c = document.getElementById('ing-refresh-card'); const pg = document.getElementById('page-settings'); return c ? { text: c.innerText.replace(/\s+/g, ' ').trim(), first: pg.querySelector('.card') === c } : null; });
  ok(crd && crd.first && /If the app glitches or stops answering/.test(crd.text) && /Refresh the app/.test(crd.text), 'Settings opens with a large "Refresh the app" key, first of its cards', crd);
  await p.evaluate(() => go('home'));
  await shot(p, 'r61-topbar-day');

  // 3 · Refresh saves the desk first, then starts again, and the loading page says so
  await p.evaluate(() => { state.__r151probe = 'kept-' + Date.now(); window.__r151mark = 1; });
  const probe = await p.evaluate(() => state.__r151probe);
  const n0 = navs; await openDisplay(p); await Promise.all([p.waitForNavigation({ timeout: 15000 }).catch(() => { }), p.click('#refreshBtn')]);
  const s3 = await watchLoad(p);
  const kept = await p.evaluate(() => { try { return JSON.parse(localStorage.getItem('ingenium_v4') || '{}').__r151probe; } catch (e) { return 'err'; } });
  ok(navs > n0 && kept === probe, 'Refresh saves the desk first and starts Ingenium again', { navs: navs - n0, kept, probe });
  ok(/after Refresh/.test(s3.say || ''), 'the loading page says it is starting again after Refresh', s3.say);
  await p.waitForTimeout(800); await enter(p);

  // 4 · F5 and Ctrl+R save first too
  await p.evaluate(() => { state.__r151probe = 'f5-' + Date.now(); });
  const probe2 = await p.evaluate(() => state.__r151probe);
  const n1 = navs; await Promise.all([p.waitForNavigation({ timeout: 15000 }).catch(() => { }), p.keyboard.press('F5')]); await watchLoad(p);
  const kept2 = await p.evaluate(() => { try { return JSON.parse(localStorage.getItem('ingenium_v4') || '{}').__r151probe; } catch (e) { return 'err'; } });
  ok(navs > n1 && kept2 === probe2, 'F5 saves the desk first and starts again', { navs: navs - n1, kept2 });
  await p.waitForTimeout(800); await enter(p);
  const n2 = navs; await Promise.all([p.waitForNavigation({ timeout: 15000 }).catch(() => { }), p.keyboard.press('Control+r')]); await watchLoad(p);
  ok(navs > n2, 'Ctrl+R starts again the same way', navs - n2);
  await p.waitForTimeout(800); await enter(p);

  // 5 · while a reply is still being written, Refresh asks first
  await p.evaluate(() => { go('chat'); const m = document.createElement('div'); m.className = 'msg bot msg-live'; m.id = 'r151live'; const sc = document.getElementById('chatScroll') || document.querySelector('#page-chat'); sc.appendChild(m); });
  const n3 = navs; await openDisplay(p); await p.click('#refreshBtn'); await p.waitForTimeout(500);
  const asked = await p.evaluate(() => { const t = document.body.innerText; return /Refresh Ingenium\?/.test(t) && /A reply is still being written/.test(t); });
  ok(asked, 'with a reply still being written, Refresh asks first and says why');
  await shot(p, 'r61-ask');
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Keep waiting' && x.offsetParent); if (k) k.click(); });
  await p.waitForTimeout(900);
  ok(navs === n3 && await p.evaluate(() => !!document.getElementById('r151live')), 'Keep waiting leaves the page as it is', navs - n3);
  await openDisplay(p); await p.click('#refreshBtn'); await p.waitForTimeout(400);
  await Promise.all([p.waitForNavigation({ timeout: 15000 }).catch(() => { }), p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Refresh' && x.offsetParent && x.id !== 'refreshBtn'); if (k) k.click(); })]);
  await watchLoad(p);
  ok(navs > n3, 'and Refresh, once agreed, starts again', navs - n3);
  await p.waitForTimeout(800); await enter(p);

  // 6 · a press on a slow page's name shows "Painting …" while it is painted, and the note goes after
  await p.evaluate(() => { go('home'); const o = window.lxRender; window.lxRender = function () { const t = Date.now(); while (Date.now() - t < 900) { } return o && o.apply(this, arguments); };
    try { lxRender = window.lxRender; } catch (e) { } });
  const nav = await p.$('.nav-btn[data-page="lector"]'); const bx = await nav.boundingBox();
  await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2); await p.mouse.down(); await p.waitForTimeout(260);
  const chipUp = await p.evaluate(() => { const c = document.getElementById('ing-painting'); return c ? { on: c.classList.contains('on'), t: c.textContent, op: getComputedStyle(c).opacity } : null; });
  await shot(p, 'r61-painting');
  ok(chipUp && chipUp.on && /Painting Lector/.test(chipUp.t) && +chipUp.op > 0.5, 'a press on Lector shows "Painting Lector…" while the press is held', chipUp);
  await p.mouse.up(); await p.waitForTimeout(2200);
  const chipAfter = await p.evaluate(() => { const c = document.getElementById('ing-painting'); return { on: c.classList.contains('on'), page: document.querySelector("section.section.active[id^='page-']").id }; });
  ok(!chipAfter.on && chipAfter.page === 'page-lector', 'Lector opens and the note goes once it is painted', chipAfter);
  // a page that opens at once never shows it: a second visit
  await p.evaluate(() => go('home')); await p.waitForTimeout(300);
  await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2); await p.mouse.down(); await p.waitForTimeout(60);
  const quick = await p.evaluate(() => document.getElementById('ing-painting').classList.contains('on')); await p.mouse.up();
  ok(!quick, 'a page already painted opens with no note');

  // 7 · by night, and on a phone
  await p.evaluate(() => { state.theme = 'night'; saveState(); });
  await p.reload().catch(() => { });
  const s7 = await watchLoad(p);
  ok(s7.night, 'by night the loading page is dark from the first look', s7);
  await p.evaluate(() => { const b = window.__ingBoot; b.look(true); b.again('Starting Ingenium again. Your work is saved.'); });
  await p.waitForTimeout(900); await shot(p, 'r61-splash-night');
  await p.evaluate(() => { const b = window.__ingBoot; b.look(false); }); await p.waitForTimeout(300); await shot(p, 'r61-splash-day');
  await p.evaluate(() => { state.theme = 'day'; saveState(); window.__ingBoot.done(); });
  const ph = await ctx.newPage(); await ph.setViewportSize({ width: 390, height: 844 });
  ph.goto(URL_).catch(() => { }); await watchLoad(ph); await ph.waitForTimeout(700); await enter(ph);
  await openDisplay(ph);
  const fit = await ph.evaluate(() => { const k = document.getElementById('refreshBtn'), r = k.getBoundingClientRect(); return { over: document.documentElement.scrollWidth - innerWidth, k: r.width > 0 && r.left >= 0 && r.right <= innerWidth && r.bottom <= innerHeight, words: k.innerText.trim() }; });
  await ph.screenshot({ path: path.join(OUT, 'r61-phone.png') });
  ok(fit.over <= 0 && fit.k && fit.words === 'Refresh the app', 'on a phone Display opens with "Refresh the app" in full view, and no sideways scroll', fit);
  await ph.close();

  // 8 · a page that never finishes starting says so and offers Refresh
  const stuck = await ctx.newPage();
  await stuck.route(URL_, async r => { const res = await r.fetch(); let t = await res.text(); t = t.replace('window.__ingReady=true;', '/* not ready, for the test */'); await r.fulfill({ response: res, body: t }); });
  stuck.goto(URL_).catch(() => { });
  await stuck.waitForTimeout(15000);
  const st = await stuck.evaluate(() => ({ keys: !document.getElementById('ib-keys').hidden, more: document.getElementById('ib-more').textContent, wait: document.getElementById('ib-wait').textContent }));
  await stuck.screenshot({ path: path.join(OUT, 'r61-stuck.png') });
  ok(st.keys && /did not finish starting/.test(st.more) && st.wait === 'Show it anyway', 'a page that never finishes starting says so and offers Refresh', st);
  await stuck.click('#ib-wait'); await stuck.waitForTimeout(700);
  ok(await stuck.evaluate(() => getComputedStyle(document.getElementById('ing-boot')).display === 'none'), '"Show it anyway" lifts the loading page');
  await stuck.close();

  const mine = errs.filter(e => /ing-boot|ib-|r151|ingRefresh|painting|__ingBoot/.test(e));
  ok(!mine.length, 'no errors from the loading page or Refresh', mine.slice(0, 3));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed ' + e.stack); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
