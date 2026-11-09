// Ingenium 6.21 (5 November 2026): the Career Studio's keys and chosen cards, its back keys, Copy from the right-click panel, and the
// preview's own keys. Her words: "I want the "+ Bring one" button to be purple on the Today tab page ... the "+ A person" button of the
// People tab page to also be made purple ... add the light purple colour of the "Roles and programmes that suit you" card to the selected
// cards of the "Your Profile" tab page"; "The "< Today" button does not do anything when I click on it"; "I kept on trying to copy this
// prompt that I typed in Ingenium's sticky notes ... no matter what I tried it would not work properly"; "Please redesign the
// Copy/Open/Download buttons that is at the bottom of the Build's page live interactive Preview Screen". Invented text only.
//   node rig/t_621_studio.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1400))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(URL_).origin });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e.message).slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1400);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  const room = async (r) => { await p.evaluate((r) => { const t = document.querySelector('#cs .c-head [data-room="' + r + '"]'); t.click(); }, r); await p.waitForTimeout(500); };
  const keyLook = (txt) => p.evaluate((txt) => { const k = [...document.querySelectorAll('#cs .c-list .c-pn-h .c-btn')].find(x => x.textContent.trim() === txt && x.offsetParent);
    if (!k) return null; const c = getComputedStyle(k); return { pri: k.classList.contains('pri'), bg: c.backgroundImage, color: c.color }; }, txt);
  await p.evaluate(() => go('career')); await p.waitForTimeout(1200);

  // 1. the four add keys, all in the studio's purple
  await room('today'); const kToday = await keyLook('+ Bring one');
  await room('people'); const kPeople = await keyLook('+ A person');
  await room('apps'); const kApps = await keyLook('+ Bring one');
  await room('goals'); const kGoals = await keyLook('+ A goal');
  const purple = (k) => k && k.pri && /gradient/.test(k.bg) && k.color === 'rgb(255, 255, 255)';
  ok(purple(kToday), 'Today: + Bring one is purple', kToday);
  ok(purple(kPeople), 'People: + A person is purple', kPeople);
  ok(purple(kApps) && purple(kGoals) && kToday.bg === kApps.bg && kPeople.bg === kGoals.bg, 'the same purple as + Bring one (Applications) and + A goal', { kApps, kGoals });
  await p.screenshot({ path: OUT + '/621_goals.png' });

  // 2. a chosen card takes the light purple of the pinned card, by day and by night
  await room('profile'); await p.waitForTimeout(300);
  const chosen = () => p.evaluate(() => { const c = document.querySelector('#cs .c-list .c-item[aria-current="true"]'); const pin = document.querySelector('#cs .c-item.c-pin');
    return { chosen: c ? getComputedStyle(c).backgroundImage : null, other: (() => { const o = document.querySelector('#cs .c-list .c-item:not([aria-current="true"])'); return o ? getComputedStyle(o).backgroundImage : null; })() }; });
  const d1 = await chosen();
  ok(d1.chosen && d1.chosen.indexOf('rgba(106, 63, 181, 0.1)') >= 0 && d1.other && d1.other.indexOf('rgba(106, 63, 181') < 0, 'Your profile: the chosen card is light purple, the others stay paper', d1);
  await p.screenshot({ path: OUT + '/621_profile_day.png' });
  await room('goals'); const pinBg = await p.evaluate(() => getComputedStyle(document.querySelector('#cs .c-item.c-pin')).backgroundImage);
  ok(pinBg === d1.chosen, 'the same light purple as Roles and programmes that suit you', { pinBg, chosen: d1.chosen });
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await room('profile');
  const d2 = await chosen();
  ok(d2.chosen && d2.chosen.indexOf('rgba(183, 156, 230, 0.14)') >= 0, 'by night the chosen card takes the night\'s soft lavender', d2);
  await p.screenshot({ path: OUT + '/621_profile_night.png' });
  await p.evaluate(() => document.body.removeAttribute('data-theme'));

  // 3. the back keys: none on a wide window (both panels are shown); on a narrow one they show and take her back to the list
  const backs = () => p.evaluate(() => [...document.querySelectorAll('#cs .c-back')].map(x => ({ t: x.textContent.trim(), shown: !!x.offsetParent && getComputedStyle(x).display !== 'none' })));
  const wide = [];
  for (const r of ['today', 'profile', 'goals', 'people', 'apps', 'learn']) { await room(r); wide.push(...(await backs())); }
  ok(wide.length >= 3 && wide.every(x => !x.shown), 'a wide window: no back key shows (the list is already beside the work)', wide);
  await p.setViewportSize({ width: 820, height: 900 }); await p.waitForTimeout(700);
  await room('profile');
  await p.evaluate(() => { const it = [...document.querySelectorAll('#cs .c-list .c-item')].find(x => /What you are looking for/.test(x.textContent)); it.click(); }); await p.waitForTimeout(500);
  const n1 = await p.evaluate(() => ({ one: document.getElementById('cs').classList.contains('c-one'), show: document.getElementById('cs').getAttribute('data-show'),
    back: (() => { const k = document.querySelector('#cs .c-work .c-back'); return k ? { t: k.textContent.trim(), shown: !!k.offsetParent } : null; })(), list: !!(document.querySelector('#cs .c-list') || {}).offsetParent }));
  ok(n1.one && n1.show === 'work' && n1.back && n1.back.shown && n1.back.t === '‹ Your profile' && !n1.list, 'a narrow window: the section opens alone, with ‹ Your profile shown', n1);
  await p.screenshot({ path: OUT + '/621_narrow_work.png' });
  await p.click('#cs .c-work .c-back'); await p.waitForTimeout(500);
  const n2 = await p.evaluate(() => ({ show: document.getElementById('cs').getAttribute('data-show'), list: !!(document.querySelector('#cs .c-list') || {}).offsetParent, work: !!(document.querySelector('#cs .c-work') || {}).offsetParent }));
  ok(n2.show === 'list' && n2.list && !n2.work, '‹ Your profile takes her back to the list', n2);
  await p.setViewportSize({ width: 1440, height: 1000 }); await p.waitForTimeout(600);

  // 4. Copy from the right-click panel on a sticky note: the words kept as the panel opens; copied inside the press
  await p.evaluate(() => go('home')); await p.waitForTimeout(700);
  const id = await p.evaluate(() => { const n = newStickyNote(); n.text = 'Alpha beta gamma delta'; renderStickyPins(); return n.id; }); await p.waitForTimeout(500);
  const body = p.locator('.sticky-note[data-sn-id="' + id + '"] .sn-body');
  const pick = (a, z) => p.evaluate(([id, a, z]) => { const el = document.querySelector('.sticky-note[data-sn-id="' + id + '"] .sn-body'); el.focus(); const tn = el.firstChild; const r = document.createRange(); r.setStart(tn, a); r.setEnd(tn, z); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }, [id, a, z]);
  const rclick = async () => { const bx = await body.boundingBox(); await p.mouse.click(bx.x + 60, bx.y + 12, { button: 'right' }); await p.waitForTimeout(350); };
  const row = (re) => p.locator('#cd-em-menu button').filter({ hasText: re }).first();
  const clip = () => p.evaluate(() => navigator.clipboard.readText());
  // a bridge that refuses, as a web view may: the copy must not depend on it
  await p.evaluate(() => { window.__bridgeCalls = 0; window.__ingClipWrite = function () { window.__bridgeCalls++; return Promise.reject(new Error('refused')); }; });
  await p.evaluate(() => navigator.clipboard.writeText('BEFORE'));
  await pick(11, 16); await rclick();
  // what Safari's engine may do: the press on the panel takes the selection out of the note
  await p.evaluate(() => getSelection().removeAllRanges());
  await row(/^Copy(⌘|Ctrl)/).click(); await p.waitForTimeout(400);
  const c1 = await clip(); const how1 = await p.evaluate(() => ({ last: window.__ingLastCopy, bridge: window.__bridgeCalls }));
  ok(c1 === 'gamma' && how1.last && how1.last.how === 'press' && how1.bridge === 0, 'Copy: the word selected reaches the clipboard, copied inside the press, even with the selection gone and the bridge refusing', { c1, how1 });
  await pick(0, 5); await rclick(); await row(/^Copy the whole field/).click(); await p.waitForTimeout(400);
  const c2 = await clip();
  ok(c2 === 'Alpha beta gamma delta', 'Copy the whole field: the whole note reaches the clipboard', c2);
  await pick(6, 11); await rclick(); await p.evaluate(() => getSelection().removeAllRanges());
  await row(/^Cut(⌘|Ctrl)/).click(); await p.waitForTimeout(400);
  const c3 = await clip(); const left = await body.evaluate(e => e.innerText);
  ok(c3 === 'beta ' && left.replace(/\s+/g, ' ').trim() === 'Alpha gamma delta', 'Cut: the words go to the clipboard and out of the note', { c3, left });
  const kept = await p.evaluate(() => { const ae = document.activeElement; return !!(ae && ae.classList && ae.classList.contains('sn-body')); });
  ok(kept, 'the note keeps the focus after the panel copies', kept);
  // pasting back through the panel (the app's reading of the clipboard) still works
  await p.evaluate(() => { window.__ingClipRead = function () { return navigator.clipboard.readText(); }; });
  await p.evaluate(() => navigator.clipboard.writeText(' Epsilon'));
  await p.evaluate((id) => { const el = document.querySelector('.sticky-note[data-sn-id="' + id + '"] .sn-body'); el.focus(); const r = document.createRange(); r.selectNodeContents(el); r.collapse(false); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }, id);
  await rclick(); await row(/^Paste(⌘|Ctrl)/).click(); await p.waitForTimeout(600);
  const pasted = await body.evaluate(e => e.innerText);
  ok(/Epsilon\s*$/.test(pasted), 'Paste from the panel still puts the clipboard\'s words into the note', pasted);
  await p.evaluate((id) => { state.notes = state.notes.filter(x => x.id !== id); renderStickyPins(); }, id);

  // 5. the preview's own keys: the page's raised keys with a symbol each, in Build and in Code
  await p.evaluate(() => go('build')); await p.waitForTimeout(900);
  await p.evaluate(() => { const e = document.getElementById('codeEditor'); e.value = '<!doctype html><html><body><h1>Invented</h1><p>A page for the test.</p></body></html>'; e.dispatchEvent(new Event('input', { bubbles: true })); });
  await p.waitForTimeout(1200);
  const keys = await p.evaluate(() => { const look = (e) => { const c = getComputedStyle(e); return { bg: c.backgroundImage, sh: c.boxShadow, r: c.borderRadius, col: c.color, border: c.borderTopWidth }; };
    const ref = look(document.getElementById('downloadBuild'));
    const ks = ['copyPreview', 'openPreview', 'dlPreview'].map(id => { const e = document.getElementById(id); return { id, cl: e.className, svg: !!e.querySelector('svg'), text: e.textContent.trim(), look: look(e), shown: !!e.offsetParent }; });
    const tray = getComputedStyle(document.querySelector('#stageFoot .cluster'));
    const code = ['csCopy', 'csOpen', 'csDl'].map(id => { const e = document.getElementById(id); return e ? { id, cl: e.className, svg: !!e.querySelector('svg') } : null; });
    return { ref, ks, tray: { bg: tray.backgroundImage, bc: tray.backgroundColor, border: tray.borderTopWidth, sh: tray.boxShadow }, code }; });
  ok(keys.ks.every(k => k.shown && /\bbtn\b/.test(k.cl) && /\bsmall\b/.test(k.cl) && !/\bcl\b/.test(k.cl) && k.svg), 'Build: Copy, Open and Download are the page\'s own raised keys, each with a symbol', keys.ks);
  ok(keys.ks.every(k => k.look.bg === keys.ref.bg && k.look.sh === keys.ref.sh && k.look.r === keys.ref.r && k.look.col === keys.ref.col), 'they look exactly as Save this page beside them', { ref: keys.ref, k: keys.ks[0].look });
  ok(keys.tray.bg === 'none' && keys.tray.border === '0px' && keys.tray.sh === 'none', 'no pale tray around them any more', keys.tray);
  ok(keys.ks.map(k => k.text).join('|') === 'Copy|Open|Download', 'their words are unchanged', keys.ks.map(k => k.text));
  ok(keys.code.every(k => k && /\bbtn\b/.test(k.cl) && k.svg), 'Code\'s preview keys are dressed the same way', keys.code);
  await p.locator('#stageFoot').screenshot({ path: OUT + '/621_build_keys.png' });
  await p.evaluate(() => navigator.clipboard.writeText('BEFORE'));
  await p.click('#copyPreview'); await p.waitForTimeout(500);
  const c4 = await clip(); const lab = await p.evaluate(() => document.getElementById('copyPreview').textContent.trim());
  ok(/<h1>Invented<\/h1>/.test(c4), 'Build\'s Copy puts the page\'s source on the clipboard', c4.slice(0, 80));
  ok(lab === 'Copied', 'and says Copied for a moment', lab);
  await p.waitForTimeout(1700);
  const lab2 = await p.evaluate(() => { const e = document.getElementById('copyPreview'); return { t: e.textContent.trim(), svg: !!e.querySelector('svg') }; });
  ok(lab2.t === 'Copy' && lab2.svg, 'then Copy again, with its symbol', lab2);
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await p.waitForTimeout(300);
  await p.locator('#stageFoot').screenshot({ path: OUT + '/621_build_keys_night.png' });
  const night = await p.evaluate(() => { const a = getComputedStyle(document.getElementById('copyPreview')), r = getComputedStyle(document.getElementById('downloadBuild')); return { same: a.backgroundImage === r.backgroundImage && a.color === r.color, a: a.backgroundImage, r: r.backgroundImage }; });
  ok(night.same, 'by night too they match the page\'s keys', night);
  await p.evaluate(() => document.body.removeAttribute('data-theme'));
  await p.screenshot({ path: OUT + '/621_build.png' });
  ok(!errs.length, 'no errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
