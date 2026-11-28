// node rig/t_806_fixes.js <page url> [picture folder]
// Ingenium 8.06: three fixes at her word (28 November 2026).
//  1. Vocatio (r188, r283): "For the Petitiones pointer english definition mentions Rome, I want that reworded and please remove the Rome
//     mention. I want all of them to be reworded to actually reflect the Vocatio page and its functions, I don't just want literal
//     definitions for the Latin names on the page." Each room's meaning now says what the room does; the label wraps and stays in the head.
//  2. Ingenia (r378): "There is a heavy blurry shadow over the Clavis logo on the Ingenia folder page, please remove it but keep the look
//     and animation of the Clavis logo button intact." No shadow on any of Clavis's layers; its depth, sway and lean stay.
//  3. Custodia (r408): "I don't like the highlight that follows the mouse hover it looks really weird, please fix it." No light follows
//     the pointer; the dial still leans toward it.
// No sign-in; nothing of anyone's is read or written.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 400))); c ? pass++ : fail++; };
const MEAN = {
  today: "Today's next step, across your applications and the people you write to",
  mentor: "Your guide through five stages, from what you have to this week's steps",
  apps: 'Each application: its posting read against your profile, its drafts and dates',
  people: 'The people you write to, each with a status and a date to follow up',
  profile: 'Your CV, your entries and what you want: the facts every draft is written from',
  edge: 'What transfers from your record, your blind spots and what sets you apart',
  goals: 'Your goals with their dated steps, and the paths and roles that suit you',
  learn: 'How each document is built, lesson by lesson, with templates for 25 roles' };
(async () => {
  const OUT = process.argv[3] || path.join(require('os').tmpdir(), 't806'); fs.mkdirSync(OUT, { recursive: true });
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  await p.goto(process.argv[2], { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }

  // 1. Vocatio's meanings
  await p.evaluate(() => go('career')); await sleep(2500);
  const tabs = await p.evaluate(() => [...document.querySelectorAll('#cs .rm-tabs .rm-tab')].map((t) => ({ room: t.getAttribute('data-room'), mean: t.getAttribute('data-mean'), aria: t.getAttribute('aria-label') })));
  ok(tabs.length === 8 && tabs.every((t) => t.mean === MEAN[t.room]), 'each room\'s meaning says what the room does', tabs.filter((t) => t.mean !== MEAN[t.room]));
  ok(tabs.every((t) => !/Rome|cursus honorum|Parnass|dux itineris|a life|gifts, talents|companions/i.test(t.mean + ' ' + t.aria)), 'no literal definition is left, and Rome is not named', tabs.map((t) => t.mean));
  ok(tabs.every((t) => t.aria.indexOf(t.mean) > 0), 'each tab\'s spoken name carries its meaning', tabs.map((t) => t.aria));
  const place = [];
  for (const r of ['today', 'learn', 'apps']) {
    const bx = await p.evaluate((r) => { const t = document.querySelector('#cs .rm-tab[data-room="' + r + '"]'); t.scrollIntoView({ block: 'center' }); const q = t.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, r);
    await p.mouse.move(bx.x, bx.y, { steps: 3 }); await sleep(380);
    place.push(await p.evaluate((r) => { const t = document.querySelector('#cs .rm-mean'), h = t.parentElement.getBoundingClientRect(), q = t.getBoundingClientRect(); return { r, on: t.classList.contains('on'), text: t.textContent, w: Math.round(q.width), inside: q.left >= h.left - 0.5 && q.right <= h.right + 0.5 }; }, r));
    if (r === 'apps') await p.screenshot({ path: path.join(OUT, 'meaning_apps.png'), clip: { x: Math.max(0, bx.x - 380), y: bx.y - 50, width: 760, height: 150 } });
    await p.mouse.move(5, 5, { steps: 2 }); await sleep(300);
  }
  ok(place.every((x) => x.on && x.text === MEAN[x.r] && x.inside && x.w <= 401), 'the meaning shows under the pointer, wraps when long and stays inside the head, at either end of the row', place);

  // 2. Clavis on its folder page
  await p.evaluate(() => { go('folders'); const b = [...document.querySelectorAll('#page-folders button, #page-folders a, #page-folders [role=button]')].find((x) => x.offsetParent && /^Ingenia$/.test(x.textContent.trim())); if (b) b.click(); }); await sleep(1200);
  await p.evaluate(() => { const c = [...document.querySelectorAll('#page-folders .fld-card')].find((x) => x.textContent.trim().startsWith('Clavis')); if (c) c.click(); }); await sleep(2200);
  for (const th of ['day', 'night']) {
    await p.evaluate((th) => document.body.setAttribute('data-theme', th), th); await sleep(900);
    const cl = await p.evaluate(() => { const k = document.querySelector('#page-folders .ig-ls.ig-key'); if (!k) return null;
      return { obj: k.classList.contains('obj'), filters: [...k.querySelectorAll('.ig-ls-l')].map((l) => getComputedStyle(l).filter), z: [...k.querySelectorAll('.ig-ls-l')].map((l) => parseFloat(l.style.getPropertyValue('--z')) || 0),
        idle: getComputedStyle(k.querySelector('.ig-ls-idle')).animationName + ' ' + getComputedStyle(k.querySelector('.ig-ls-idle')).animationDuration, cast: getComputedStyle(k.querySelector('.ig-ls-cast') || k).display }; });
    ok(cl && cl.obj && cl.filters.every((f) => f === 'none'), 'Clavis (' + th + '): no shadow on its face or its raised parts', cl && cl.filters);
    ok(cl && cl.z.filter((z) => z > 0).length >= 3 && /igSway 11s/.test(cl.idle), 'Clavis (' + th + '): its raised parts keep their depth, and it sways as before', cl && { z: cl.z, idle: cl.idle });
  }
  await p.evaluate(() => document.body.setAttribute('data-theme', 'day')); await sleep(600);

  // 3. Custodia's dial
  await p.evaluate(() => go('custodia')); await sleep(2500);
  const box = await p.evaluate(() => { const d = document.querySelector('#cuHead .cu-dialbox'); if (!d) return null; d.scrollIntoView({ block: 'center' }); const r = d.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  if (box) { await p.mouse.move(box.x + box.w * 0.8, box.y + box.h * 0.25, { steps: 6 }); await sleep(450); }
  const dl = await p.evaluate(() => { const b = document.querySelector('#cuHead .cu-dialbox'); return b ? { live: b.classList.contains('live'), ry: b.style.getPropertyValue('--ry'), sheen: !!b.querySelector('.cu-sheen'), lx: b.style.getPropertyValue('--lx') } : null; });
  ok(dl && !dl.sheen && !dl.lx, 'Custodia: no light follows the pointer across the dial', dl);
  ok(dl && dl.live && parseFloat(dl.ry) > 2, 'Custodia: the dial still leans toward the pointer', dl);
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
