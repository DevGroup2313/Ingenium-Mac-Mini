// The Offline Project's site at Carpe Diem 1080, The Forge 656, Ingenium 6.9.3 (demo edition) and Inkwell 7.52, in Chromium.
// 1 November 2026: Carpe Diem's room shows its Public sample; the Forge's demonstration carries the site's other apps and
// its own page; the tab's icon wears its night dressing when the page is dark.
// The owner's words (25 October 2026) and what is checked for each:
//   - "Hide the scroll bars ... keeping scrolling": no scroll bar is drawn, and the hall still scrolls;
//   - "no way back to the main page when I click 'Open on its own'": an app opened on its own shows a key back to the hall,
//     which brings the hall back; inside the hall's frame the key is not there;
//   - "The app title when installed must be written like the other apps": the manifest, the home-screen title and the
//     one-file app's name say The Offline Project;
//   - "the current shield master seal with the gold book to be the app's icon": the icons are the master seal's shield;
//   - "a refresh button that refreshes the app if it glitches or freezes": the key reloads the page, in the room it was in;
//   - "a loading page telling the user the page is still being painted": shown first, gone once the page has arrived;
//   - every room opens its app (Carpe Diem's Public sample), with no page errors; a phone.
// node t_site_656.js <site url (index.html)> <one-file app path> <out dir> [trio]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [SITE, APPFILE, OUT, MODE] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true }); const TRIO = MODE === 'trio';
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : '')); c ? pass++ : fail++; };
async function roomReady(p, slug) {
  await p.evaluate(s => window.__opGo(s), slug);
  await p.waitForFunction(() => document.getElementById('veil').getAttribute('data-gone') === '1' || /could not/.test(document.getElementById('stageStatus').textContent), null, { timeout: 240000 }).catch(() => {});
  return p.evaluate(() => ({ status: document.getElementById('stageStatus').textContent, gone: document.getElementById('veil').getAttribute('data-gone') }));
}
(async () => {
  const b = await pw.chromium.launch({ args: ['--js-flags=--max-old-space-size=8192'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 200)));
  // the loading page, seen before the hall
  await p.goto(SITE, { waitUntil: 'commit' });
  const early = await p.waitForSelector('#opLoading', { timeout: 30000 }).then(() => p.evaluate(() => { const L = document.getElementById('opLoading'); const s = document.getElementById('oplSeal'); return { line: document.getElementById('oplLine').textContent, seal: !!(s && /^data:image\/webp/.test(s.src)) }; })).catch(e => ({ err: e.message }));
  await p.waitForLoadState('load');
  early.seal = await p.evaluate(() => /^data:image\/webp/.test(document.getElementById('oplSeal').src));
  ok(early.line === 'The page is still being painted…' && early.seal, 'the loading page says the page is still being painted, under the shield', early);
  await p.waitForTimeout(1500);
  const hall = await p.evaluate(() => ({ gone: (document.getElementById('opLoading') || {}).hidden, title: document.title, line: document.getElementById('builds').textContent,
    refresh: (document.getElementById('refreshKey') || {}).textContent, sbw: getComputedStyle(document.documentElement).scrollbarWidth, sbwShelf: getComputedStyle(document.querySelector('.shelf')).scrollbarWidth,
    sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, tall: document.documentElement.scrollHeight > innerHeight,
    icons: [...document.querySelectorAll('link[rel~="icon"],link[rel="apple-touch-icon"]')].map(l => l.getAttribute('href').slice(0, 40)),
    appTitle: (document.querySelector('meta[name="apple-mobile-web-app-title"]') || {}).content, appName: (document.querySelector('meta[name="application-name"]') || {}).content }));
  ok(hall.gone === true, 'the loading page is gone once the page has arrived', hall.gone);
  ok(hall.line === (TRIO ? 'Carpe Diem 1080 · The Forge 656 · Ingenium 6.9.3' : 'Carpe Diem 1080 · The Forge 656 · Ingenium 6.9.3 · Inkwell 7.52'), 'the builds named at the foot are the newest', hall.line);
  ok(hall.sbw === 'none' && hall.sbwShelf === 'none' && hall.sw <= hall.cw, 'no scroll bar is drawn (the page and the devices\' shelf), and nothing scrolls sideways', hall);
  await p.mouse.wheel(0, 900); await p.waitForTimeout(800);
  ok(await p.evaluate(() => scrollY > 100), 'the hall still scrolls', await p.evaluate(() => scrollY));
  await p.evaluate(() => scrollTo(0, 0));
  ok(hall.refresh === '↻ Refresh', 'a refresh key in the top bar', hall.refresh);
  ok(hall.appTitle === 'The Offline Project' && hall.appName === 'The Offline Project', 'the home-screen title and the application name: The Offline Project', hall);
  const man = await p.evaluate(() => fetch('manifest.webmanifest').then(r => r.json()));
  ok(man.name === 'The Offline Project' && man.short_name === 'The Offline Project', 'the installed web app is named The Offline Project', man);
  await p.screenshot({ path: path.join(OUT, 'hall.png') });
  // the refresh key reloads the page, in the room it was in
  const r1 = await roomReady(p, 'the-forge');
  ok(r1.gone === '1', 'the Forge\'s room opens its demonstration', r1);
  await p.evaluate(() => { window.__beforeRefresh = 1; });
  await Promise.all([p.waitForNavigation({ timeout: 120000 }), p.click('#refreshKey')]);
  await p.waitForLoadState('load'); await p.waitForTimeout(1500);
  ok(await p.evaluate(() => window.__beforeRefresh === undefined && location.hash === '#the-forge' && !document.getElementById('room').hidden), 'the refresh key reloads the page, and the room it was in opens again');
  // the frame carries no key back (the hall is around it)
  await p.waitForFunction(() => document.getElementById('veil').getAttribute('data-gone') === '1', null, { timeout: 240000 }).catch(() => {});
  ok(await p.evaluate(() => { try { return !document.getElementById('demoFrame').contentDocument.getElementById('op-home-key'); } catch (e) { return 'n/a'; } }), 'inside the hall\'s frame there is no key back');
  // every room
  // the Forge's demonstration carries the site's other apps and its own page
  const fc = await p.evaluate(() => { try { const w = document.getElementById('demoFrame').contentWindow; return w.__forgeLib.carried().map(x => x.key + ' ' + x.version).sort(); } catch (e) { return e.message; } });
  ok(JSON.stringify(fc) === JSON.stringify((TRIO ? ['cd 1080', 'forge 656', 'ingenium 6.9.3'] : ['cd 1080', 'forge 656', 'ingenium 6.9.3', 'inkwell 7.52']).sort()), 'the Forge\'s demonstration carries ' + (TRIO ? 'Carpe Diem, itself and Ingenium' : 'Carpe Diem, itself, Inkwell and Ingenium'), fc);
  const rooms = TRIO ? ['carpe-diem', 'ingenium'] : ['carpe-diem', 'ingenium', 'inkwell'];
  for (const slug of rooms) {
    const r = await roomReady(p, slug);
    const inside = await p.evaluate(() => { try { const w = document.getElementById('demoFrame').contentWindow; return { ed: w.CD_BUILD && w.CD_BUILD.edition, title: w.document.title.slice(0, 40) }; } catch (e) { return { err: e.message }; } });
    ok(r.gone === '1' && (slug !== 'carpe-diem' || inside.ed === 'Public sample'), slug + ': its room opens it' + (slug === 'carpe-diem' ? ' (the Public sample)' : ''), { r, inside });
    await p.screenshot({ path: path.join(OUT, 'room-' + slug + '.png') });
  }
  // Open on its own: the app alone, with its key back to the hall
  const appPage = await ctx.newPage(); const e2 = []; appPage.on('pageerror', e => e2.push(String(e).slice(0, 200)));
  await appPage.goto(new URL('apps/the-forge.html', SITE).href, { timeout: 180000 }); await appPage.waitForTimeout(6000);
  const k = await appPage.evaluate(() => { const k = document.getElementById('op-home-key'); if (!k) return null; const r = k.getBoundingClientRect(); return { t: k.textContent, top: Math.round(r.top), mid: Math.round(r.left + r.width / 2), w: innerWidth }; });
  ok(k && k.t === '← The Offline Project' && k.top < 30 && Math.abs(k.mid - k.w / 2) < 4, 'an app opened on its own shows a key back to the hall, at the top', k);
  await appPage.screenshot({ path: path.join(OUT, 'alone-forge.png') });
  await Promise.all([appPage.waitForNavigation({ timeout: 120000 }), appPage.click('#op-home-key')]);
  await appPage.waitForLoadState('load'); await appPage.waitForTimeout(1200);
  ok(await appPage.evaluate(() => !!document.getElementById('hall') && !document.getElementById('hall').hidden && /The Offline Project/.test(document.title)), 'the key brings the hall back', appPage.url());
  // the icon: the master seal's shield
  const icon = await p.evaluate(() => new Promise(res => { const i = new Image(); i.onload = () => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); x.drawImage(i, 0, 0, 64, 64);
    const d = x.getImageData(0, 0, 64, 64).data; let gold = 0, op = 0; for (let j = 0; j < d.length; j += 4) { if (d[j + 3] > 200) { op++; if (d[j] > 150 && d[j + 1] > 110 && d[j + 2] < 110) gold++; } } res({ op, gold }); }; i.onerror = () => res(null); i.src = 'assets/icons/shield-192.png'; }));
  ok(icon && icon.op > 1500 && icon.gold > 40, 'the icon is the gilt shield', icon);
  const icons = () => p.evaluate(() => [...document.querySelectorAll('link[data-op-icon]')].map(l => l.getAttribute('href')).join(' '));
  await p.evaluate(() => window.__opGo('')); await p.waitForTimeout(400);
  const dayI = await icons();
  await p.click('#themeKey'); await p.waitForTimeout(500); const nightI = await icons();
  await p.click('#themeKey'); await p.waitForTimeout(500); const backI = await icons();
  ok(/favicon\.ico.*shield-32\.png.*shield-192\.png/.test(dayI) && /favicon-dark\.ico.*shield-dark-32\.png.*shield-dark-192\.png/.test(nightI) && backI === dayI, 'the tab\'s icon wears its night dressing when Night is chosen, and its day one again by Day', { dayI, nightI });
  const dctx = await b.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: 'dark' }); const dp = await dctx.newPage();
  await dp.goto(SITE); await dp.waitForTimeout(2500);
  const autoI = await dp.evaluate(() => ({ theme: document.documentElement.getAttribute('data-theme'), h: [...document.querySelectorAll('link[data-op-icon]')].map(l => l.getAttribute('href')).join(' ') }));
  ok(!autoI.theme && /favicon-dark\.ico/.test(autoI.h), 'on Auto, with the device dark, the tab\'s icon wears its night dressing', autoI);
  await dctx.close();
  const man2 = await p.evaluate(() => fetch('manifest.webmanifest').then(r => r.json()));
  ok(man2.icons.some(i => i.purpose === 'maskable') && man2.icons.filter(i => i.purpose === 'any').length === 2, 'the installed app has the shield alone (any) and a white square for a device that cuts icons to its own shape (maskable)', man2.icons);
  ok(errs.length === 0 && e2.length === 0, 'no page errors in the hall or the app alone', errs.concat(e2).slice(0, 3));
  // a phone
  const ph = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); const q = await ph.newPage();
  await q.goto(SITE); await q.waitForTimeout(3000);
  const pm = await q.evaluate(() => { const ks = [...document.querySelectorAll('.minikeys .mk')].map(e => e.getBoundingClientRect()); return { sw: document.documentElement.scrollWidth, keys: ks.length, fit: ks.every(r => r.right <= innerWidth && r.left >= 0) }; });
  ok(pm.sw <= 390 && pm.keys === 3 && pm.fit, 'on a phone the three small keys fit and nothing scrolls sideways', pm);
  await q.screenshot({ path: path.join(OUT, 'phone.png') });
  // the one-file app: its name, its loading page, and its key back from an app opened on its own
  if (APPFILE && APPFILE !== '-') {
    ok(/The Offline Project( \(without Inkwell\))?\.html$/.test(APPFILE), 'the one-file app is named The Offline Project', path.basename(APPFILE));
    const a = await ctx.newPage(); const e3 = []; a.on('pageerror', e => e3.push(String(e).slice(0, 200)));
    await a.goto('file://' + APPFILE, { timeout: 300000 }); await a.waitForTimeout(3000);
    ok(await a.evaluate(() => document.getElementById('opLoading').hidden === true), 'the one-file app: its loading page is gone once every app inside has arrived');
    const r = await roomReady(a, 'the-forge');
    ok(r.gone === '1', 'the one-file app opens the Forge\'s demonstration from inside itself', r);
    const [pop] = await Promise.all([ctx.waitForEvent('page', { timeout: 120000 }), a.click('#aloneKey')]);
    await pop.waitForLoadState('load').catch(() => {}); await pop.waitForTimeout(6000);
    ok(await pop.evaluate(() => !!document.getElementById('op-home-key')), 'its app opened on its own shows the key back');
    await a.evaluate(() => window.__opGo('ingenium'));
    await Promise.all([pop.waitForEvent('close', { timeout: 30000 }), pop.click('#op-home-key')]).catch(() => {});
    await a.waitForTimeout(800);
    ok(pop.isClosed() && await a.evaluate(() => !document.getElementById('hall').hidden), 'the key closes that window and shows the hall in the one-file app', { closed: pop.isClosed() });
    ok(e3.length === 0, 'no page errors in the one-file app', e3.slice(0, 3));
  }
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close();
})().catch(e => { console.log('CRASH', e.message); process.exit(1); });
