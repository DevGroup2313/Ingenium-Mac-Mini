// node rig/t_655_fixes.js <Ingenium page url (master)> <out dir> [other=<another edition's page url> ...]
// Ingenium 6.55 (7 November 2026), in Chromium. Her words (7 November 2026): "The Link your file again, take the guided tour, Read the
// short guide are the ONLY stupid buttons that don't lift when I hover over them and make no sound ... I want them to match the rest of
// the buttons inside of Ingenium"; "The Check with Blend button looks flat and has that glossy look with the heavy purple shadow";
// "Clicking on any of the 4 apps inside of the "Your apps" section of the Lector page feels really heaving and slow"; "I want the Chat
// pages inside of Ingenium to be aware of who I am and actually greet me like the Home page does"; and of Lakay, her store's app: "I
// want its latest build embedded into Ingenium just like my other apps so that I can continue working on it and developing it further."
//   - the greeting card's keys: 6.53's size and white face; Ingenium's own keys' edge and casts; pointed at they rise 2px (and the edge
//     grows), pressed they sink 1px, on the keys' own spring; they are among the keys that sound (modules/r176.js);
//   - Check with Blend: its lilac face, a solid edge and casts in the page's shade, no glow in the accent's colour, no bright top line;
//     pointed at it rises 2px;
//   - the empty Chat and Code pages greet her by name, as Home does (an invented name here);
//   - Lakay: carried, kept on first start (checked against its fingerprint), listed with her apps after the four, by name and build, in
//     Lector (with its mark in layers: seven in Build 3, sixteen planes since Build 6, carried from 6.56) and in Fabrica's app library; brought into Fabrica, it is an app with its own mark;
//   - Lector prepares an app in its worker, with the same result as on the page; choosing a tile leaves no long pause on the page;
//   - in every other edition given: not Lakay's name, its page, its mark or its build;
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2); const OTHERS = args.filter(a => a.startsWith('other=')).map(a => a.slice(6)); const [URL_, OUT] = args.filter(a => !a.startsWith('other='));
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
async function open(b, url) { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(800);
  await p.evaluate(() => { try { const k = [...document.querySelectorAll('button')].find(x => /^Not now$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); } catch (e) {} });
  return { ctx, p, errs }; }
const snap = (p, s) => p.evaluate((s) => { const e = document.querySelector(s), c = getComputedStyle(e), r = e.getBoundingClientRect(); return { h: Math.round(r.height), fs: c.fontSize, fw: c.fontWeight, bg: c.backgroundImage, sh: c.boxShadow, tf: c.transform, tr: c.transition, x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, s);
(async () => {
  const b = await pw.chromium.launch(); const A = await open(b, URL_); const p = A.p;
  // 1. the greeting card's keys
  await p.evaluate(() => go('home')); await p.mouse.move(1439, 899); await p.waitForTimeout(800);
  const kk = []; for (const s of ['#heroNext', '#homeTour', '#hxGuide']) kk.push(await snap(p, s));
  ok(kk.every(k => k.h >= 33 && k.h <= 37 && k.fs === '13px' && k.fw === '600'), 'the greeting card\'s keys keep 6.53\'s size (13px, 34 to 36px high)', kk.map(k => [k.h, k.fs, k.fw]));
  ok(kk[1].bg === 'linear-gradient(rgb(255, 255, 255), rgb(246, 242, 251))' && kk[2].bg === kk[1].bg && /^linear-gradient\(rgb\(122, 80, 198\)/.test(kk[0].bg), 'their faces are 6.53\'s: white, and the purple key purple', kk.map(k => k.bg));
  ok([kk[1], kk[2]].every(k => /rgba\(40, 22, 68, 0\.25\) 0px 2px 0px 0px/.test(k.sh) && /0px 9px 14px/.test(k.sh)) && /rgb\(58, 32, 112\) 0px 2px 0px 0px/.test(kk[0].sh), 'they wear the keys\' own edge, 2px deep, and casts', kk.map(k => k.sh));
  ok(kk.every(k => /transform 0\.16s/.test(k.tr)), 'they move on the keys\' own spring', kk.map(k => k.tr));
  for (const [i, s] of [[1, '#homeTour'], [0, '#heroNext']]) {
    await p.mouse.move(kk[i].x, kk[i].y); await p.waitForTimeout(450); const hv = await snap(p, s);
    await p.mouse.down(); await p.waitForTimeout(140); const pr = await snap(p, s); await p.mouse.move(1439, 899); await p.mouse.up(); await p.keyboard.press('Escape'); await p.waitForTimeout(400);
    await p.evaluate(() => go('home')); await p.waitForTimeout(500);
    ok(hv.tf === 'matrix(1, 0, 0, 1, 0, -2)' && / 0px 3px 0px 0px/.test(hv.sh), s + ': pointed at, it rises 2px and its edge grows to 3px', hv);
    ok(pr.tf === 'matrix(1, 0, 0, 1, 0, 1)' && /inset/.test(pr.sh), s + ': pressed, it sinks 1px with its edge pressed in', pr); }
  const snd = await p.evaluate(() => [...document.scripts].some(x => /'\.hx-btn,\.hx-item,\.blx-chk',keyAt=0/.test(x.textContent)));
  ok(snd, 'the greeting card\'s keys, Home\'s recent work and Check with Blend are among the keys that sound');
  // 2. Check with Blend, under the tour's example reply
  await p.evaluate(() => { try { tourDemoChat(true); } catch (e) {} }); await p.waitForTimeout(1500); await p.mouse.move(1439, 899);
  const kb = await p.evaluate(() => { const k = [...document.querySelectorAll('.blx-chk')].find(x => x.getClientRects().length); if (!k) return null; k.scrollIntoView({ block: 'center' }); return true; });
  if (kb) { await p.waitForTimeout(400); const r0 = await snap(p, '.blx-chk');
    ok(/rgb\(201, 182, 234\) 0px 2px 0px 0px/.test(r0.sh) && !/rgba\(106, 63, 181/.test(r0.sh) && !/rgba\(255, 255, 255, 0\.85\)/.test(r0.sh) && /f5eeff|245, 238, 255/.test(r0.bg), 'Check with Blend: a lilac key with a solid edge and soft casts; no violet glow, no bright top line', r0);
    await p.mouse.move(r0.x, r0.y); await p.waitForTimeout(450); const r1 = await snap(p, '.blx-chk'); await p.mouse.move(1439, 899);
    ok(r1.tf === 'matrix(1, 0, 0, 1, 0, -2)' && / 0px 3px 0px 0px/.test(r1.sh), 'pointed at, Check with Blend rises 2px', r1);
  } else ok(false, 'the tour\'s example reply shows Check with Blend');
  // 3. the empty Chat and Code pages greet her by name (an invented one)
  const hi = await p.evaluate(async () => { state.persona = Object.assign({}, state.persona || {}, { name: 'Ada Lovelace' }); try { tourEnd && tourEnd(); } catch (e) {}
    go('chat'); try { newChat(); } catch (e) {} await new Promise(r => setTimeout(r, 600)); const c = [...document.querySelectorAll('.cc-hello h2')].find(x => x.getClientRects().length);
    let code = null; try { if (typeof ccMode === 'function') ccMode('code'); else go('code'); } catch (e) {} await new Promise(r => setTimeout(r, 600));
    const d = [...document.querySelectorAll('.cc-hello h2')].find(x => x.getClientRects().length); code = d ? d.textContent : null; return { chat: c ? c.textContent : null, code }; });
  ok(/^Good (morning|afternoon|evening), Ada$/.test(hi.chat || ''), 'the empty Chat page greets her by name, as Home does', hi);
  ok(/^Good (morning|afternoon|evening), Ada$/.test(hi.code || ''), 'the empty Code page greets her by name too', hi);
  // 4. Lakay among her apps
  await p.waitForFunction(() => window.__ingBuiltin, null, { timeout: 180000 }).catch(() => {});
  const lk = await p.evaluate(() => { const m = libState().apps.lakay || {}; return { st: window.__ingBuiltin && __ingBuiltin.states.lakay, keys: libKeys(), title: m.title, version: m.version, source: m.source, color: m.color, seal: !!(window.ING_SEALS && ING_SEALS.lakay), layers: window.LX7_LAYERS && LX7_LAYERS.lakay ? LX7_LAYERS.lakay.length : 0, night: window.LX7_LAYERS && LX7_LAYERS.lakayN ? LX7_LAYERS.lakayN.length : 0 }; });
  ok(lk.st === 'kept' || lk.st === 'same', 'Lakay is kept on first start from inside Ingenium, checked against its fingerprint', lk);
  ok(lk.title === 'Lakay' && /^\d+$/.test(lk.version || '') && lk.source === 'built in' && lk.color === '#6f78d8', 'it is kept as Lakay, by its build number, in its own colour', lk);
  ok(lk.keys.slice(0, 4).join() === 'cd,forge,inkwell,ingenium' && lk.keys.indexOf('lakay') === 4, 'it is listed with her apps, after the four', lk.keys);
  ok(lk.seal && lk.layers === 16 && lk.night === 16, 'its seal and its mark in its planes (Build 6: sixteen), by day and by night', lk);
  await p.evaluate(() => go('lector')); await p.waitForTimeout(2500);
  const lt = await p.evaluate(() => { const t = [...document.querySelectorAll('#lx7 .l-app')].find(x => /Lakay/.test(x.textContent)); return t ? { text: t.textContent.replace(/\s+/g, ' ').trim(), layers: t.querySelectorAll('img.ls-l').length } : null; });
  ok(lt && /Lakay/.test(lt.text) && lt.layers === 16, 'Lector shows Lakay among her apps, with its mark in its sixteen planes', lt);
  // 5. Lector prepares in its worker, with the same result; choosing a tile leaves no long pause
  const lw = await p.evaluate(async () => { const out = {}; for (const k of ['inkwell', 'lakay']) { const name = libState().apps[k].name || k; const a = await IngLectorWorker.prepareKey(k, name), z = await IngLectorWorker.orig(name, await libText(k), () => {}); out[k] = !!a && JSON.stringify(a) === JSON.stringify(z); } out.on = IngLectorWorker.on(); return out; });
  ok(lw.inkwell && lw.lakay && lw.on, 'Lector prepares an app in its worker, with the same result as on the page', lw);
  const lp = await p.evaluate(() => new Promise(res => { const longs = []; const po = new PerformanceObserver(l => l.getEntries().forEach(x => longs.push(Math.round(x.duration)))); try { po.observe({ type: 'longtask' }); } catch (e) {}
    const t = [...document.querySelectorAll('#lx7 .l-app')].find(x => /The Forge/.test(x.textContent)); t.click(); setTimeout(() => { po.disconnect(); res(longs); }, 4000); }));
  ok(Math.max(0, ...lp) < 400, 'choosing The Forge (14 MB) leaves no pause of 0.4 s or more on the page (' + Math.max(0, ...lp) + ' ms at most)', lp);
  // 6. Fabrica: from the app library, Lakay comes in as an app with its own mark
  await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#fb button')].find(x => /Bring one in/.test(x.textContent)); if (k) k.click(); }); await p.waitForTimeout(900);
  const libLine = await p.evaluate(() => { const o = [...document.querySelectorAll('button, div')].filter(x => /From your app library/.test(x.textContent) && x.textContent.length < 300).pop(); return o ? o.textContent.replace(/\s+/g, ' ') : ''; });
  ok(/Lakay \d+/.test(libLine), 'Fabrica\'s Bring one in offers Lakay from the app library', libLine);
  const fb = await p.evaluate(async () => { const o = [...document.querySelectorAll('.f-opt')].find(x => /^From your app library/.test((x.querySelector('b') || {}).textContent || '')); if (o) o.click(); await new Promise(r => setTimeout(r, 700));
    const k = [...document.querySelectorAll('.f-opt')].find(x => /^Lakay\b/.test((x.querySelector('b') || {}).textContent || '') && x.getClientRects().length); if (!k) return { none: [...document.querySelectorAll('.f-opt b')].map(x => x.textContent.trim()) }; k.click();
    for (let i = 0; i < 40; i++) { await new Promise(r => setTimeout(r, 500)); const rows = [...document.querySelectorAll('#fb .f-repo')]; const r = rows.find(x => /Lakay/.test(x.textContent)); if (r) return { name: r.textContent.replace(/\s+/g, ' ').slice(0, 60), layers: r.querySelectorAll('img.f-ls-l').length }; }
    return { timeout: true }; });
  ok(fb && /Lakay/.test(fb.name || '') && fb.layers === 16, 'brought in, Lakay is an app in Fabrica\'s Your apps, with its own mark in its sixteen planes', fb);
  ok(A.errs.length === 0, 'no errors on the page', A.errs);
  await A.ctx.close();
  // 7. no Lakay in any other edition
  for (const u of OTHERS) { const html = await (await fetch(u)).text();
    // (the app's key, lakay, may appear in code as her other apps' keys do; neither its name, its page, its mark nor its build is there)
    ok(!/ing-builtin-lakay|lakay-build|lakay:"Lakay"|"lakayN"/i.test(html) && !/\bLakay\b/.test(html), 'no Lakay in ' + u.split('/').pop() + ': not its name, its page, its mark or its build'); }
  await b.close(); console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('failed: ' + e.message); process.exit(1); });
