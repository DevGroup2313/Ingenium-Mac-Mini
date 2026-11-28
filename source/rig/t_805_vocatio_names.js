// node rig/t_805_vocatio_names.js <page url> [picture folder]
// Ingenium 8.05 (modules/r188.js, r283.js, r290.js): Vocatio's rooms named in Latin, as her pages are, at her questionnaire (27 November 2026)
// and her approval of the live preview: Diurna, Dux, Petitiones, Socii, Vita, Dotes, Cursus, Gradus; the Latin name alone, its English
// meaning only on hover; "The Career Studio" in the eyebrow. No sign-in; nothing of anyone's is read or written.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 300))); c ? pass++ : fail++; };
(async () => {
  const OUT = process.argv[3] || path.join(require('os').tmpdir(), 't805'); fs.mkdirSync(OUT, { recursive: true });
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)));
  await p.goto(process.argv[2], { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => /^(Enter|I agree)$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await sleep(900); }
  await p.evaluate(() => go('career')); await sleep(2500);
  const want = ['Diurna', 'Dux', 'Petitiones', 'Socii', 'Vita', 'Dotes', 'Cursus', 'Gradus'];
  const tabs = await p.evaluate(() => [...document.querySelectorAll('#cs .rm-tabs .rm-tab')].map((t) => ({ room: t.getAttribute('data-room'), name: t.textContent.trim(), mean: t.getAttribute('data-mean'), title: t.getAttribute('title') })));
  ok(JSON.stringify(tabs.map((t) => t.name)) === JSON.stringify(want), 'the eight rooms carry her Latin names: ' + tabs.map((t) => t.name).join(', '), tabs.map((t) => t.name));
  ok(tabs.every((t) => t.mean && !t.title), 'each room keeps its meaning for the pointer, and no other tooltip', tabs.map((t) => [t.name, t.title]));
  const head = await p.evaluate(() => { const h = document.querySelector('#page-career section.skh'); return { eye: h.querySelector('.skh-eyebrow').textContent.trim(), key: document.getElementById('skCareerGo').textContent.trim(), says: (h.querySelector('.skh-says') || {}).textContent || '' }; });
  ok(head.eye === 'The Career Studio · The compass of your path', 'the eyebrow reads: The Career Studio · The compass of your path', head.eye);
  ok(head.key === 'Dux' && /^Dux leads you through the stages/.test(head.says), 'the head\'s key reads Dux, and its line names Dux', head);
  // the meaning shows only while the pointer is on a room
  const before = await p.evaluate(() => { const t = document.querySelector('#cs .rm-mean'); return t ? t.classList.contains('on') : false; });
  const box = await p.evaluate(() => { const t = document.querySelector('#cs .rm-tab[data-room="apps"]'); t.scrollIntoView({ block: 'center' }); const r = t.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await p.mouse.move(box.x, box.y, { steps: 3 }); await sleep(350);
  const on = await p.evaluate(() => { const t = document.querySelector('#cs .rm-mean'); return t ? { on: t.classList.contains('on'), text: t.textContent, op: getComputedStyle(t).opacity } : null; });
  await p.screenshot({ path: path.join(OUT, 'tabs_hover.png'), clip: { x: Math.max(0, box.x - 420), y: box.y - 60, width: 840, height: 140 } });
  await p.mouse.move(5, 5, { steps: 3 }); await sleep(350);
  const off = await p.evaluate(() => { const t = document.querySelector('#cs .rm-mean'); return t ? t.classList.contains('on') : false; });
  ok(!before && on && on.on && on.text === 'Each application: its posting read against your profile, its drafts and dates' && !off, 'Petitiones shows its meaning only while the pointer is on it: ' + (on && on.text), { before, on, off });
  // each room opens under its Latin name
  const heads = [], left = {};
  const OLD = ['Your mentor', 'Your counsellor', 'your counsellor', 'the counsellor', 'Goals and plan', 'Open Today', 'in Applications', 'under Applications', 'to Applications', 'in Your profile', 'to Your profile', '\u2039 Learn', '\u2039 Your', 'in Your edge', 'Vocatio, Your edge', 'How People works'];
  for (const r of ['today', 'apps', 'people', 'profile', 'edge', 'goals', 'learn', 'mentor']) {
    await p.evaluate((r) => document.querySelector('#cs .rm-tab[data-room="' + r + '"]').click(), r); await sleep(700);
    heads.push(await p.evaluate(() => { const h = document.querySelector('#csList h2, #csList h3, #csList .c-pn-h, #csList [class*="title"]'); return h ? h.textContent.trim().split('\n')[0] : ''; }));
    const t = await p.evaluate(() => document.getElementById('page-career').innerText);
    OLD.forEach((w) => { if (t.indexOf(w) >= 0) (left[r] = left[r] || []).push(w); });
  }
  ok(heads.every((h, i) => h.indexOf(['Diurna', 'Petitiones', 'Socii', 'Vita', 'Dotes', 'Cursus', 'Gradus', 'Dux'][i]) === 0), 'each room opens under its Latin name: ' + heads.join(', '), heads);
  ok(Object.keys(left).length === 0, 'no room still sends you to a room by its old name (Your mentor, Goals and plan, in Applications...)', left);
  // the How it works cards, in the studio
  const how = await p.evaluate(() => { try { const S = IngCareer && IngCareer.state ? IngCareer.state() : null; } catch (e) {} const t = document.getElementById('page-career').innerHTML; return { vita: /Vita, your profile/.test(t) || null, cursus: /Open Cursus/.test(t) || null }; });
  console.log('(How it works, if drawn here: ' + JSON.stringify(how) + ')');
  // the Guide's card for Vocatio names the rooms by their Latin names
  await p.evaluate(() => go('guide')); await sleep(1500);
  const guide = await p.evaluate(() => { const c = document.getElementById('csGuide'); return c ? c.innerText : null; });
  ok(guide && /Diurna/.test(guide) && /Petitiones and Socii/.test(guide) && !/Applications and people/.test(guide), 'the Guide\'s card for Vocatio names Diurna, Petitiones and Socii', (guide || '').slice(0, 200));
  await p.evaluate(() => go('career')); await sleep(1200);
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await sleep(600);
  await p.mouse.move(box.x, box.y, { steps: 3 }); await sleep(350);
  await p.screenshot({ path: path.join(OUT, 'tabs_hover_night.png'), clip: { x: Math.max(0, box.x - 420), y: box.y - 60, width: 840, height: 140 } });
  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
