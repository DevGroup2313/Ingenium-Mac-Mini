// The Forge 656 (as 655, carrying Ingenium 6.8.12), in Chromium:
//   - the page says build 656 · 9s88 and carries Ingenium 6.8.12, Carpe Diem 1058, Inkwell 7.52 and itself;
//   - About: its large seal is a key, as Carpe Diem's is (the owner's words, 27 October 2026: "I want the seal inside of
//     the Forge's About panel to be clickable, the same way the one inside of Carpe Diem's About panel is"): a button
//     named "The Forge seal" that Tab reaches; held down it sinks, let go it knocks; Enter knocks it too; with movement
//     reduced it keeps still;
//   - Tabula, Abacus and Imago, opened as the Forge opens them, are told their house (The Forge, with its seal), draw the
//     Forge's seal and name no Carpe Diem in their seal group;
//   - no page errors.
//   node tests/t_656.js <url of the 656 page> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL);
  await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 240000 });
  await p.waitForTimeout(1500);
  const info = await p.evaluate(() => ({ build: window.CD_BUILD, foot: [...document.querySelectorAll('.build')].map(e => e.textContent),
    apps: (() => { const n = document.getElementById('forge-bi-meta'); return n ? JSON.parse(n.textContent).apps.map(a => a.key + ' ' + a.version) : null; })() }));
  ok(info.build && info.build.pass === '656' && info.build.stamp === '9s88' && info.foot.every(t => t === 'Build 656 · 9s88'), 'the page says build 656 · 9s88', info);
  ok(info.apps && ['ingenium 6.8.12', 'cd 1058', 'inkwell 7.52', 'forge 656'].every(x => info.apps.includes(x)), 'it carries Ingenium 6.8.12, Carpe Diem 1058, Inkwell 7.52 and The Forge 656', info.apps);
  await p.evaluate(() => { try { if (typeof cdCloseDoor === 'function') cdCloseDoor(); } catch (e) {} });
  await p.waitForTimeout(800);

  // About
  await p.evaluate(() => { const a = document.getElementById('about-btn'); if (a) a.click(); else openAbout(); });
  await p.waitForSelector('#forgeAboutBack:not([hidden]) .fsl-solo', { timeout: 20000 });
  await p.waitForTimeout(600);
  const key = await p.evaluate(() => { const s = document.querySelector('#forgeAboutBack .fsl-solo'); const r = s.getBoundingClientRect();
    return { role: s.getAttribute('role'), tab: s.getAttribute('tabindex'), label: s.getAttribute('aria-label'), w: r.width, x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  ok(key.role === 'button' && key.tab === '0' && key.label === 'The Forge seal' && key.w >= 48, "About's large seal is a key named The Forge seal, in the order Tab follows", key);
  await p.mouse.move(key.x, key.y); await p.waitForTimeout(200); await p.mouse.down(); await p.waitForTimeout(120);
  const held = await p.evaluate(() => document.querySelector('#forgeAboutBack .fsl-solo').className);
  await p.screenshot({ path: path.join(OUT, 'about-held.png') });
  await p.mouse.up(); await p.waitForTimeout(80);
  const let_go = await p.evaluate(() => document.querySelector('#forgeAboutBack .fsl-solo').className);
  ok(/\bdown\b/.test(held), 'held down, it sinks', held);
  ok(/\bknock\b/.test(let_go) && !/\bdown\b/.test(let_go), 'let go, it knocks', let_go);
  const stillOpen = await p.evaluate(() => !document.getElementById('forgeAboutBack').hidden);
  ok(stillOpen, 'pressing the seal leaves About open');
  await p.waitForTimeout(700);
  await p.evaluate(() => document.querySelector('#forgeAboutBack .fsl-solo').focus());
  await p.keyboard.press('Enter'); await p.waitForTimeout(60);
  const byKey = await p.evaluate(() => ({ cls: document.querySelector('#forgeAboutBack .fsl-solo').className, focus: document.activeElement === document.querySelector('#forgeAboutBack .fsl-solo') }));
  ok(/\bknock\b/.test(byKey.cls) && byKey.focus, 'Enter knocks it too, and it keeps the focus', byKey);
  await p.waitForTimeout(700);
  await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal'));
  await p.mouse.move(key.x, key.y); await p.mouse.down(); await p.waitForTimeout(80);
  const calmHeld = await p.evaluate(() => document.querySelector('#forgeAboutBack .fsl-solo').className); await p.mouse.up(); await p.waitForTimeout(60);
  const calmGo = await p.evaluate(() => document.querySelector('#forgeAboutBack .fsl-solo').className);
  ok(!/\bdown\b/.test(calmHeld) && !/\bknock\b/.test(calmGo), 'with movement reduced, it keeps still', { calmHeld, calmGo });
  await p.evaluate(() => document.body.removeAttribute('data-motion'));
  await p.evaluate(() => { const c = document.getElementById('aboutClose'); if (c) c.click(); });
  await p.waitForTimeout(400);

  // the seal studios of Tabula, Abacus and Imago
  for (const app of ['tabula', 'abacus', 'slides']) {
    await p.evaluate(a => openExt(a), app);
    await p.waitForFunction(a => { const f = document.getElementById('frame-' + a) || document.getElementById('cd-fw-frame-' + a);
      try { return !!f.contentWindow.document.getElementById('cd-seal-group'); } catch (e) { return false; } }, app, { timeout: 90000 });
    const r = await p.evaluate(a => { const f = document.getElementById('frame-' + a) || document.getElementById('cd-fw-frame-' + a);
      const w = f.contentWindow, d = w.document, H = w.__ingHouse || null, g = d.getElementById('cd-seal-group');
      const u = w.cdSeal && w.cdSeal.uri ? w.cdSeal.uri(64, 'blue') : '';
      const texts = g ? g.innerText + ' ' + [...g.querySelectorAll('[title],[aria-label]')].map(e => (e.title || '') + ' ' + (e.getAttribute('aria-label') || '')).join(' ') : '';
      const all = (d.body.innerText.match(/.{0,40}carpe diem.{0,40}/gi) || []);
      return { house: H && { name: H.name, word: H.word, png: !!H.png, accent: H.accent }, png: /data:image\/png/.test(decodeURIComponent(u)), carpe: /carpe diem/i.test(texts), text: texts.replace(/\s+/g, ' ').slice(0, 160), all }; }, app);
    const name = app === 'slides' ? 'Imago' : app[0].toUpperCase() + app.slice(1);
    ok(r.house && r.house.name === 'The Forge' && r.house.word === 'THE FORGE' && r.house.png, name + ': told its house, The Forge, with its seal', r.house);
    ok(r.png, name + ": the seal it draws is the Forge's picture, not Carpe Diem's drawing", r);
    ok(!r.carpe, name + ': nothing in its seal group names Carpe Diem', r.text);
    ok(!r.all.length, name + ': no text it shows names Carpe Diem', r.all);
    await p.screenshot({ path: path.join(OUT, app + '.png') });
  }
  ok(errs.length === 0, 'no errors on the page', errs.slice(0, 3));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
