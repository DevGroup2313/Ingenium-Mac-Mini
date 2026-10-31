// The way back to Ingenium's choice of coding model, as text only (Ingenium 6.9.2). Her words (31 October 2026):
// "limit the button of "Back to Ingenium's choice for this computer" to only the text, I don't like the long raised line
// look, please redesign that button."
//   node rig/t_697_back_link.js http://127.0.0.1:8152/ingenium.html <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 600) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1400, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(400);
  // the list of coding models shows only in the computer apps: the page is told it runs in one, and another model is chosen
  const set = await p.evaluate(() => {
    window.lineupDevice = function () { return 'desktop'; };
    const v = ING_LINEUP.devices.desktop.tiers.faber, ks = [].concat(v).filter(k => ING_LINEUP.models[k]);
    const cur = lineupKeyFor('faber'), other = ks.find(k => k !== cur);
    state.tierPick = state.tierPick || {}; state.tierPick.faber = other; go('models'); renderLineup();
    return { ks, cur, other };
  });
  await p.waitForTimeout(600);
  // the lineup lives in one of the Models page's rooms: reaching its tile opens that room (r173)
  await p.evaluate(() => { const t = document.querySelector('#lineupGrid .lu-tile[data-tier="faber"]'); try { if (window.IngRooms && IngRooms.reveal) IngRooms.reveal(t); } catch (e) {} t.scrollIntoView({ block: 'center' }); });
  await p.waitForTimeout(700);
  const look = await p.evaluate(() => {
    const k = document.querySelector('#lineupGrid .lu-tile[data-tier="faber"] .lu-coders > button.lu-cd-back'); if (!k) return null;
    const cs = getComputedStyle(k), box = k.parentElement.getBoundingClientRect(), r = k.getBoundingClientRect(), be = getComputedStyle(k, '::before');
    return { text: k.textContent, cls: k.className, bg: cs.backgroundColor, bgi: cs.backgroundImage, shadow: cs.boxShadow, border: cs.borderTopWidth, deco: cs.textDecorationLine,
      color: cs.color, w: Math.round(r.width), boxW: Math.round(box.width), h: Math.round(r.height), before: be.content, left: Math.round(r.left - box.left) };
  });
  ok(look && /^Back to Ingenium's choice for this computer$/.test(look.text), 'the way back is there when another coding model is chosen', { set, look });
  ok(look && !/\bbtn\b/.test(look.cls) && look.bg === 'rgba(0, 0, 0, 0)' && look.bgi === 'none' && look.shadow === 'none' && look.border === '0px', 'it is text only: no face, no raised edge, no border', look);
  ok(look && look.w < look.boxW * 0.6 && look.h < 34 && look.left < 8, 'it is as wide as its words, at the start of the line, not a bar across the card', look);
  ok(look && look.deco.indexOf('underline') >= 0 && look.before.indexOf('↺') >= 0, 'it reads as a link: underlined, with a small return mark before its words', look);
  const boxL = p.locator('#lineupGrid .lu-tile[data-tier="faber"] .lu-coders');
  await boxL.screenshot({ path: OUT + '/back_link_day.png' }).catch(() => {});
  await p.evaluate(() => { try { state.theme = 'night'; applyTheme(); } catch (e) {} }); await p.waitForTimeout(400);
  await boxL.screenshot({ path: OUT + '/back_link_night.png' }).catch(() => {});
  await p.focus('#lineupGrid .lu-tile[data-tier="faber"] .lu-coders > button.lu-cd-back').catch(() => {});
  await p.keyboard.press('Enter'); await p.waitForTimeout(500);
  const after = await p.evaluate(() => ({ pick: state.tierPick && state.tierPick.faber, link: !!document.querySelector('#lineupGrid .lu-cd-back') }));
  ok(after.pick === undefined && !after.link, 'pressed (with the keyboard), Ingenium\'s choice is back and the link goes away', after);
  ok(await p.evaluate(() => Object.values(window.__ingParts || {}).every(v => v === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); process.exit(1); });
