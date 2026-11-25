// Ingenium 7.87: an app in a reply shows as the app, not as its code (modules/r389.js), in Chat and Code (one page); and each app's logo on
// Ingenia has a press of its own (r388), approved with the live preview (25 November 2026).
//   node rig/t_787_presses.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage(); p.setDefaultTimeout(120000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngAppFold && window.IngLogoPress, null, { timeout: 600000 }); await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  // 1. Chat: a finished app, an app cut off before its fence closed, and an app being written
  const c1 = await p.evaluate(async () => { const app = '<!doctype html>\n<html><head><title>Pomodoro Timer</title></head><body>\n' + Array.from({ length: 200 }, (_, i) => '<div>Row ' + i + '</div>').join('\n') + '\n</body></html>';
    go('chat'); await new Promise(r => setTimeout(r, 600)); const ms = curMsgs(); ms.length = 0;
    ms.push({ role: 'me', text: 'Make me a timer app' }); ms.push({ role: 'bot', text: 'Here is your app:\n\n```html\n' + app + '\n```\n\nEnjoy.' });
    ms.push({ role: 'me', text: 'Longer' }); ms.push({ role: 'bot', text: 'Here it is:\n\n```html\n' + app.slice(0, 3000) });
    ms.push({ role: 'me', text: 'Live' }); ms.push({ role: 'bot', live: true, text: 'Writing:\n\n```html\n' + app.slice(0, 4000) });
    renderChat(); await new Promise(r => setTimeout(r, 2500)); renderChat(); await new Promise(r => setTimeout(r, 1500));
    const msgs = [...document.querySelectorAll('#chatScroll .msg.bot')]; return msgs.map(d => { const pr = d.querySelector('pre'); return { card: !!d.querySelector('.cs-card'), h: pr ? Math.round(pr.getBoundingClientRect().height) : null, bar: pr ? (pr.querySelector('.md-bar') || {}).textContent : null }; }); });
  ok(c1[0] && c1[0].card && c1[0].h < 60 && /Show code \(\d+ lines\)/.test(c1[0].bar), 'a finished app: its card in the reply, its code folded under one bar with Show code', c1[0]);
  ok(c1[1] && c1[1].card && c1[1].h < 60 && /Show code/.test(c1[1].bar), 'a reply cut off before its fence closed is still the app: its card, its code folded', c1[1]);
  ok(c1[2] && c1[2].card && c1[2].h < 60 && /Writing the app: \d+ lines so far/.test(c1[2].bar), 'an app being written: its code waits folded under one line that counts it', c1[2]);
  await p.screenshot({ path: OUT + '/chat_folded.png' });
  const c2 = await p.evaluate(async () => { const k = [...document.querySelectorAll('#chatScroll .r1-show')][0]; k.click(); await new Promise(r => setTimeout(r, 300)); const pr = k.closest('pre'); const open = Math.round(pr.getBoundingClientRect().height);
    k.click(); await new Promise(r => setTimeout(r, 300)); return { open, shut: Math.round(pr.getBoundingClientRect().height), label: k.textContent }; });
  ok(c2.open > 1000 && c2.shut < 60 && /Show code/.test(c2.label), 'Show code opens the code in the reply, and folds it again', c2);
  // 2. Ingenia: each of the five seals has its own press; Ingenium keeps its knock
  await p.evaluate(() => go('folders')); await sleep(1200);
  const press = async (name) => { await p.evaluate(n => { const c = [...document.querySelectorAll('#page-folders .fd-file')].find(x => new RegExp(n).test(x.textContent)); if (c) c.click(); }, name); await sleep(1400);
    const box = await p.evaluate(() => { const k = document.querySelector('#page-folders .fd-oh .ig-ls'); if (!k) return null; const r = k.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, key: k.getAttribute('data-fd-seal'), roles: [...k.querySelectorAll('.ig-ls-l')].map(i => i.getAttribute('data-r') || '') }; });
    if (!box) return null; await p.mouse.move(box.x, box.y); await p.mouse.down(); await sleep(120); await p.mouse.up(); await sleep(260);
    const st = await p.evaluate(() => { const k = document.querySelector('#page-folders .fd-oh .ig-ls'); const an = [...k.querySelectorAll('.ig-ls-l')].map(i => getComputedStyle(i).animationName).filter(a => a && a !== 'none');
      return { play: k.classList.contains('r388-play'), knock: k.classList.contains('knock'), tilt: getComputedStyle(k.querySelector('.ig-ls-tilt')).animationName, anims: an }; });
    await p.screenshot({ path: OUT + '/press_' + box.key + '.png', clip: { x: Math.max(0, box.x - 90), y: Math.max(0, box.y - 90), width: 180, height: 180 } });
    await p.evaluate(() => { const bc = [...document.querySelectorAll('#page-folders a, #page-folders button')].find(x => x.textContent.trim() === 'Ingenia' && x.offsetParent && x.getBoundingClientRect().top > 200); if (bc) bc.click(); }); await sleep(900);
    return Object.assign(box, st); };
  const cd = await press('Carpe Diem'); ok(cd && cd.key === 'cd' && cd.play && cd.anims.indexOf('r388cdRays') >= 0 && cd.tilt !== 'igKnock', "Carpe Diem: Sunrise (its rays turn and flare), not Ingenium's knock", cd);
  const fg = await press('The Forge'); ok(fg && fg.play && fg.anims.indexOf('r388fgMark') >= 0 && fg.tilt === 'r388fgShake', 'The Forge: Strike (the anvil takes the blow, the seal shakes)', fg);
  const ik = await press('Inkwell'); ok(ik && ik.play && ik.anims.indexOf('r388ikDip') >= 0, 'Inkwell: Dip (the quill dips)', ik);
  const cl = await press('Clavis'); ok(cl && cl.play && cl.anims.indexOf('r388clKey') >= 0 && cl.anims.indexOf('r388clRete') >= 0, 'Clavis: Unlock (the key turns, the rete answers)', cl);
  const lk = await press('Lakay'); ok(lk && lk.play && lk.anims.indexOf('r388lkWhorl') >= 0, 'Lakay: Spiral (its whorls turn)', lk);
  const ig = await press('Ingenium'); ok(ig && !ig.play && ig.knock && ig.tilt === 'igKnock', 'Ingenium keeps its own knock', ig);
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
