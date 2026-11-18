// Ingenium 7.37: Terms and privacy (modules/r320.js; listed in Ownership by r173; Settings, Security links to it, r318), as her approved
// preview (https://claude.ai/artifact/1kH45upUM246ucJN89phJm): "I approve of the preview, please commit and push it everywhere."
//   node rig/t_737_terms.js <Ingenium page url> <out folder>
// Checks: the welcome's line and its key; Ownership holds the card after the licence; its four parts (In short, Privacy notice, Terms of
// use, Your contact) in the master edition, with Draft; the contact saved shows in the notice and the terms, and is kept over a reload;
// Settings, Security, Read the Privacy notice opens it; tiles, parts and sections lift under the pointer; by night; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage(); p.setDefaultTimeout(180000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  const line = await p.evaluate(() => { const l = document.getElementById('introTerms'); const d = document.getElementById('introDoor'); return { text: l && l.textContent, inDoor: !!(l && d && d.contains(l)), shown: !!(l && l.offsetParent) }; });
  /* 7.40, her words: "I am not sure that the Terms and Conditions should be added to the introduction door": the line is off the door (the
     agreement sheet after Enter follows in 7.41) */
  ok(line.text === null && !line.inDoor, 'the welcome door carries no terms line (7.40)', line);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); IngTerms.show('short'); }); await p.waitForTimeout(1500);   // 7.40: Settings, Ownership opened from inside the app try { await p.evaluate(() => { try { tourEnd(); } catch (e) {} }); } catch (e) {}
  const opened = await p.evaluate(() => { const c = document.getElementById('termsCard'); const r = c && c.getBoundingClientRect(); return { shown: !!(c && c.offsetParent), inView: r ? r.top < innerHeight && r.bottom > 0 : false, tab: [...document.querySelectorAll('#page-settings .rm-tab[aria-selected="true"],#page-settings .rm-tab.on')].map(x => x.textContent.trim()) }; });
  ok(opened.shown && opened.inView, 'IngTerms.show opens Settings, Ownership, at the card', opened);
  const c1 = await p.evaluate(() => { const c = document.getElementById('termsCard'), lic = document.getElementById('ingPermitCard');
    return { after: !!(lic && c && (lic.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING)), title: c.querySelector('h2').textContent, chips: [...c.querySelectorAll('.tp-chips .sc-chip')].map(x => x.textContent), parts: [...c.querySelectorAll('.tp-parts .sc-sub')].map(x => x.textContent), tiles: c.querySelectorAll('.tp-short').length }; });
  ok(c1.after && c1.title === 'Terms and privacy' && c1.parts.join('|') === 'In short|Privacy notice|Terms of use|Your contact' && c1.tiles === 6 && c1.chips.includes('Draft: a lawyer reads it before it is final'), 'Ownership: the card after the licence; In short, Privacy notice, Terms of use, Your contact; six tiles; Draft in the master edition', c1);
  const part = async (n) => { await p.evaluate(n => [...document.querySelectorAll('#termsCard .tp-parts .sc-sub')].find(x => x.textContent === n).click(), n); await p.waitForTimeout(300);
    return p.evaluate(() => [...document.querySelectorAll('#termsCard .tp-sec h3')].map(x => x.textContent)); };
  const pv = await part('Privacy notice'), tm = await part('Terms of use');
  ok(pv.length === 8 && pv[0] === '1. Who this notice is from' && tm.length === 10 && tm[3] === '4. Answers from AI models', 'the Privacy notice in 8 parts, the Terms of use in 10', { pv: pv.length, tm: tm.length });
  await part('Your contact'); await p.fill('#tpContact', 'hello@example.org'); await p.evaluate(() => document.querySelector('#termsCard [data-a="save"]').click()); await p.waitForTimeout(500);
  await part('Privacy notice'); const said = await p.evaluate(() => document.querySelector('#termsCard .tp-sec p').textContent);
  ok(/Questions about this notice: hello@example\.org\./.test(said), 'the contact saved shows in the Privacy notice', said);
  await p.waitForTimeout(1500); await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  const kept = await p.evaluate(() => IngTerms.contact());
  ok(kept === 'hello@example.org', 'and it is kept over a reload', kept);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await p.waitForTimeout(800);
  await p.evaluate(() => { go('settings'); IngRooms.open('settings', 'security', true); IngSecurity.view('all'); }); await p.waitForTimeout(900);
  const link = await p.evaluate(() => { const k = document.querySelector('#secCard [data-a="privacy"]'); if (k) k.click(); return k && k.textContent; }); await p.waitForTimeout(1200);
  const at = await p.evaluate(() => ({ shown: !!(document.getElementById('termsCard') || {}).offsetParent, part: (document.querySelector('#termsCard .tp-parts .sc-sub[aria-selected="true"]') || {}).textContent }));
  ok(link === 'Read the Privacy notice' && at.shown && at.part === 'Privacy notice', 'Settings, Security: Read the Privacy notice opens it', { link, at });
  const lift = async (sel) => { const h = await p.$(sel); await h.scrollIntoViewIfNeeded(); await p.mouse.move(2, 2); await p.waitForTimeout(350); const a = await h.evaluate(e => getComputedStyle(e).transform); await h.hover(); await p.waitForTimeout(450); return [a, await h.evaluate(e => getComputedStyle(e).transform)]; };
  const L = { sec: await lift('#termsCard .tp-sec'), part: await lift('#termsCard .tp-parts .sc-sub:not([aria-selected="true"])') };
  await p.evaluate(() => [...document.querySelectorAll('#termsCard .tp-parts .sc-sub')][0].click()); await p.waitForTimeout(300); L.tile = await lift('#termsCard .tp-short');
  ok(Object.values(L).every(([a, z]) => a !== z), 'sections, parts and tiles move under the pointer', L);
  await p.screenshot({ path: OUT + '/terms_day.png' });
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await p.waitForTimeout(700);
  const night = await p.evaluate(() => { const t = document.querySelector('#termsCard .tp-short b'); return { theme: document.body.getAttribute('data-theme'), ink: getComputedStyle(t).color, bg: getComputedStyle(document.querySelector('#termsCard .tp-short')).backgroundColor }; });
  ok(night.theme === 'night' && night.ink !== 'rgb(34, 26, 46)', 'by night its words take the night\'s ink', night);
  await p.screenshot({ path: OUT + '/terms_night.png' });
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1500)); process.exit(2); });
