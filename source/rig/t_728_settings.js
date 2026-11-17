// Ingenium 7.28 · Settings, raised (modules/r313.js), in the built page at her window's size (1280 by 800).
//   1. tiles that open: Everyday's four cards as tiles, one open, the one open before folds, the choice kept; Search, eyes and ears
//   2. the long cards by their groups: Storage (five) and Your Ingenium (four), every part keeping its id
//   3. Find a setting reaches into a folded tile and opens it; Show every setting at once shows everything, as before
//   4. raised and moving controls: a lit switch, a strip whose raised key slides under the choice, a field as a lit well, rows as plates
//   5. the chosen level lifted, ringed and glowing, its mark lit: in Settings and in the Guide
//   6. Memory: its switches and How it works fold, each head saying what is inside; Calm's groups raised
//   7. by night, dark purple tiles; no motion with Minimal motion
//     node rig/t_728_settings.js http://127.0.0.1:8193/<page>
const pw = require('/opt/node-tools/node_modules/playwright');
const URL = process.argv[2] || 'http://127.0.0.1:8193/ingenium.html';
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 500))); c ? P++ : F++; }
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => { if (/r313/.test(m.text())) errs.push(m.text().slice(0, 200)); });
  await p.goto(URL, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { try { localStorage.removeItem('ing.settings.tiles.v1'); } catch (e) {} const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('settings'); });
  await p.waitForTimeout(2000);
  const room = async (r, k) => { await p.evaluate(([r, k]) => { IngRooms.open('settings', r); if (k) IngSettingsParts.show(r, k, false); window.scrollTo(0, 0); }, [r, k]); await p.waitForTimeout(700); };
  const tiles = (sel) => p.evaluate((sel) => [...document.querySelectorAll(sel)].filter((t) => t.offsetParent).sort((a, b) => { const x = a.getBoundingClientRect(), y = b.getBoundingClientRect(); return (x.top - y.top) || (x.left - y.left); }).map((t) => ({ name: (t.querySelector(':scope > .st-th .st-nm') || {}).textContent, say: (t.querySelector(':scope > .st-th .st-say') || {}).textContent, open: t.classList.contains('st-open'), shut: t.classList.contains('rm-shut'), w: Math.round(t.getBoundingClientRect().width), h: Math.round(t.getBoundingClientRect().height), exp: (t.querySelector(':scope > .st-th') || { getAttribute: () => null }).getAttribute('aria-expanded') })), sel);

  // 1. Everyday
  await room('everyday');
  let t = await tiles('#rmP-settings-everyday > .st-tile');
  ok(t.length === 4 && t.map((x) => x.name).join('|') === 'Look and feel|Sound|Help and the guided tour|If the app glitches or stops answering', 'Everyday: its four cards as tiles, in the preview\'s order', t.map((x) => x.name));
  ok(t.filter((x) => x.open).length === 1 && t[0].open && t[0].exp === 'true' && t.slice(1).every((x) => x.shut && x.exp === 'false'), 'one tile open (Look and feel, the first), the others folded and said so', t);
  const order = await p.evaluate(() => [...document.querySelectorAll('#rmP-settings-everyday > .st-tile')].map((c) => c.id || 'look'));
  ok(order[0] === 'ing-refresh-card', 'the cards themselves stay where they were in the page (only drawn in another order)', order);
  ok(t.every((x) => x.say && x.say.length > 3) && /^(Day|Night|Follow the system) · motion /.test(t[0].say), 'each head says its state in one line', t.map((x) => x.say));
  const evH = await p.evaluate(() => { const pn = document.getElementById('rmP-settings-everyday'); return Math.round(pn.getBoundingClientRect().bottom + window.scrollY); });
  ok(evH < 760, 'Everyday fits in the window: its tiles end at ' + evH + ' points (1058 before, with the page above)', evH);
  ok(t[0].w > 900 && t[1].w < 500, 'the open tile across the section, the folded ones two to a row', t.map((x) => x.w));
  const n0 = await p.evaluate(() => (window.IngSound ? IngSound.count() : -1));
  await p.click('#ingSoundCard > .st-th'); await p.waitForTimeout(600);
  const snd = await p.evaluate(() => (window.IngSound ? { n: IngSound.count(), last: IngSound.last() } : null));
  ok(snd && snd.n > n0 && snd.last && snd.last.role === 'keys', "pressing a tile's head sounds as Ingenium's keys do", snd);
  t = await tiles('#rmP-settings-everyday > .st-tile');
  t.sort((a, b) => ['Look and feel', 'Sound', 'Help and the guided tour', 'If the app glitches or stops answering'].indexOf(a.name) - ['Look and feel', 'Sound', 'Help and the guided tour', 'If the app glitches or stops answering'].indexOf(b.name));
  ok(t[1].open && !t[0].open && t.filter((x) => x.open).length === 1, 'pressing Sound opens it and folds Look and feel', t.map((x) => [x.name, x.open]));
  const kept = await p.evaluate(() => JSON.parse(localStorage.getItem('ing.settings.tiles.v1') || '{}'));
  ok(kept['c:everyday/'] === 'ingSoundCard', 'the tile left open is kept on this device', kept);
  await p.keyboard.press('Tab'); // the head is a key: Enter opens it
  await p.focus('#ihSetCard > .st-th'); await p.keyboard.press('Enter'); await p.waitForTimeout(500);
  ok(await p.evaluate(() => document.getElementById('ihSetCard').classList.contains('st-open')), 'a head opens with Enter, from the keyboard');
  await room('ai', 'search');
  t = await tiles('#rmP-settings-ai > .st-tile');
  ok(t.length === 3 && t[0].name === "Ingenium's eyes" && t[0].open && t[0].w > 900 && t[1].w > 400 && t[2].w > 400, 'Search, eyes and ears: three tiles, the open one across, the half-wide cards of before in full cells', t.map((x) => [x.name, x.w, x.open]));

  // 2. the long cards by their groups
  await room('data', 'storage');
  t = await tiles('#stxCard .st-itile');
  ok(t.length === 5 && t.map((x) => x.name).join('|') === 'Room used|What takes the room|Your limit|Old copies|Your app library' && t[0].open, 'Storage: five tiles, Room used open', t.map((x) => [x.name, x.open]));
  const ids = await p.evaluate(() => ['stxUsed', 'stxLimit', 'stxUnit', 'stxAuto', 'stxKeep', 'stxKinds', 'stxApps', 'stxClean', 'stxLogBox', 'stxPartsBox'].filter((i) => { const e = document.getElementById(i); return !e || !e.closest('#stxCard .st-itile'); }));
  ok(!ids.length, 'every part of Storage keeps its id, inside its tile', ids);
  const sth = await p.evaluate(() => Math.round(document.getElementById('stxCard').getBoundingClientRect().height));
  ok(sth < 700, 'Storage now ' + sth + ' points tall (1123 before)', sth);
  await room('ai', 'you');
  t = await tiles('#personaCard .st-itile');
  ok(t.length === 4 && t[0].name === 'Who you are' && t[0].open, 'Your Ingenium: four tiles, Who you are open', t.map((x) => x.name));
  ok(await p.evaluate(() => !!document.getElementById('psCore').closest('.st-itile') && document.getElementById('psCore').closest('.st-itile').__stK === 'rules'), "Ingenium's own instructions: its switch beside its ten rules");
  await p.fill('#psName', 'Ada Example'); await p.waitForTimeout(400);
  ok(await p.evaluate(() => /Ingenium calls you Ada Example/.test(document.querySelector('#personaCard .st-itile .st-say').textContent)), 'a head says what was just typed');
  await p.fill('#psName', ''); await p.waitForTimeout(300);

  // 3. Find a setting
  await room('everyday');
  await p.fill('#rmFind', 'scholarly sources'); await p.waitForTimeout(500);
  const hit = await p.evaluate(() => { const h = document.querySelector('#rmFindOut .rm-hit'); return h ? h.textContent : null; });
  ok(!!hit && /scholarly/i.test(hit), 'Find a setting finds a setting inside a folded tile', hit);
  await p.click('#rmFindOut .rm-hit'); await p.waitForTimeout(900);
  const vis = await p.evaluate(() => { const e = document.getElementById('srchScholar'); const c = e && e.closest('.st-tile'); return { open: !!c && c.classList.contains('st-open'), shown: !!(e && e.closest('.sch-set').offsetParent) }; });
  ok(vis.open && vis.shown, 'and opens it: Web search open, Scholarly sources first in sight', vis);
  await p.fill('#rmFind', 'versions kept'); await p.waitForTimeout(500);
  const hit2 = await p.evaluate(() => [...document.querySelectorAll('#rmFindOut .rm-hit')].map((h) => h.textContent));
  const vi = hit2.findIndex((x) => /versions kept/i.test(x));
  if (vi >= 0) { await p.click('#rmFindOut li:nth-child(' + (vi + 1) + ') .rm-hit'); await p.waitForTimeout(900); }
  ok(vi >= 0 && await p.evaluate(() => { const e = document.getElementById('stxKeep'); return !!e.offsetParent && e.closest('.st-itile').classList.contains('st-open'); }), 'a group inside Storage too: Old copies opens', hit2);
  await p.fill('#rmFind', ''); await p.waitForTimeout(200);
  await p.evaluate(() => IngRooms.all(true)); await p.waitForTimeout(900);
  const all = await p.evaluate(() => ({ heads: [...document.querySelectorAll('#page-settings .st-th')].filter((h) => h.offsetParent).length,
    shown: ['stxLimit', 'stxKeep', 'psCustom', 'srchScholar', 'awakeOn', 'eyesOn'].filter((i) => { const e = document.getElementById(i); return !(e && (e.offsetParent || (e.nextElementSibling && e.nextElementSibling.offsetParent))); }) }));
  ok(all.heads === 0 && !all.shown.length, 'Show every setting at once: every setting shown, no head between them, as before', all);
  await p.evaluate(() => IngRooms.all(false)); await p.waitForTimeout(700);

  // 4. raised and moving controls
  await room('everyday'); await p.click('#rmP-settings-everyday .st-tile:not(.st-open) .st-th >> nth=0').catch(() => {});
  await p.evaluate(() => { const c = [...document.querySelectorAll('#rmP-settings-everyday > .st-tile')].find((x) => /look and feel/i.test(x.textContent)); IngSettingsRaised.open(c); }); await p.waitForTimeout(600);
  const key = () => { const g = document.querySelector('#page-settings .st-pills[aria-label="Motion"]'), k = getComputedStyle(g, '::before'), on = g.querySelector('[aria-checked="true"]');
    return { ready: g.classList.contains('st-ready'), left: Math.round(parseFloat(k.left)), want: on.offsetLeft, w: Math.round(parseFloat(k.width)), ww: on.offsetWidth, bg: getComputedStyle(on).backgroundImage, kbg: k.backgroundImage,
      tab: [...g.children].every((c) => /^(BUTTON)$/.test(c.tagName)) }; };
  const strip = await p.evaluate(key);
  ok(strip.ready && Math.abs(strip.left - strip.want) <= 1 && Math.abs(strip.w - strip.ww) <= 1 && strip.bg === 'none' && /linear-gradient/.test(strip.kbg), 'a strip: its raised key under the choice, the choice itself clear', strip);
  ok(strip.tab, 'the key is no child of the strip: its keys alone are reached by Tab and by its arrows', strip.tab);
  const before = strip.left;
  await p.evaluate(() => { const g = document.querySelector('#page-settings .st-pills[aria-label="Motion"]'); [...g.querySelectorAll('[role=radio]')].find((x) => x.getAttribute('aria-checked') !== 'true').click(); });
  await p.waitForTimeout(120);
  const mid = (await p.evaluate(key)).left;
  await p.waitForTimeout(700);
  const after = await p.evaluate(key);
  ok(after.left !== before && Math.abs(after.left - after.want) <= 1 && Math.abs(mid - after.left) > 2 && Math.abs(mid - before) > 2, 'chosen anew, the key slides across to it (caught on its way)', { before, mid, after: after.left });
  await p.evaluate(() => { const g = document.querySelector('#page-settings .st-pills[aria-label="Motion"]'); [...g.querySelectorAll('[role=radio]')].find((x) => x.textContent.trim() === 'Calm').click(); }); await p.waitForTimeout(500);
  await room('ai', 'search');
  const sw = await p.evaluate(() => { const i = document.getElementById('eyesOn'); if (!i.checked) i.click(); const tr = i.nextElementSibling; const a = getComputedStyle(tr), k = getComputedStyle(tr, '::before'); const row = i.closest('.ey-row');
    return { bg: a.backgroundImage, knob: k.backgroundImage, glow: k.boxShadow, tr: k.transitionTimingFunction, plate: row.classList.contains('st-plate'), sh: getComputedStyle(row).boxShadow }; });
  ok(/linear-gradient/.test(sw.bg) && /linear-gradient/.test(sw.knob) && /cubic-bezier\(0\.34, 1\.56/.test(sw.tr) && /10px/.test(sw.glow), 'a switch on: a lit violet key, its knob raised, glowing and springing across', sw);
  ok(sw.plate && sw.sh !== 'none', "the switch's row a raised plate", sw.sh);
  const well = await p.evaluate(() => { const i = document.getElementById('srchKey'); return getComputedStyle(i).boxShadow; });
  ok(/inset/.test(well), 'a field: a well', well);

  // 5. the chosen level
  await room('everyday');
  await p.evaluate(() => { const c = document.getElementById('ihSetCard'); IngSettingsRaised.open(c); }); await p.waitForTimeout(500);
  await p.click('#ihSetCard .ih-lvk[data-lv="some"]'); await p.mouse.move(5, 790); await p.waitForTimeout(800);
  const lv = await p.evaluate(() => { const k = document.querySelector('#ihSetCard .ih-lvk[aria-checked="true"]'); if (!k) return null; const s = getComputedStyle(k), a = getComputedStyle(k, '::after'), i = getComputedStyle(k.querySelector('.ih-lvi'));
    return { lv: k.getAttribute('data-lv'), tf: s.transform, sh: s.boxShadow, glow: a.animationName, jewel: i.backgroundImage, jt: i.transform, say: document.querySelector('#ihSetCard > .st-th .st-say').textContent }; });
  ok(lv && lv.lv === 'some' && /-3\)$/.test(lv.tf) && /2px/.test(lv.sh), 'Settings: the chosen level lifted and ringed', lv);
  ok(lv && lv.glow === 'lvBreathe' && /radial-gradient/.test(lv.jewel) && /matrix\(1\.08/.test(lv.jt), 'glowing, its mark lit as a jewel', lv);
  ok(lv && /Some experience/.test(lv.say), "and the tile's head says it", lv && lv.say);
  await p.evaluate(() => go('guide')); await p.waitForTimeout(1500);
  const glv = await p.evaluate(() => { const k = document.querySelector('#page-guide .ih-lvk[aria-checked="true"]'); if (!k) return null; const s = getComputedStyle(k); return { lv: k.getAttribute('data-lv'), tf: s.transform, glow: getComputedStyle(k, '::after').animationName }; });
  ok(glv && glv.lv === 'some' && /-3\)$/.test(glv.tf) && glv.glow === 'lvBreathe', "the Guide's Your level: the same, lifted and glowing", glv);
  await p.evaluate(() => go('settings')); await p.waitForTimeout(1000);

  // 6. Memory and Calm
  await room('data', 'memory');
  const mem = await p.evaluate(() => { const c = document.getElementById('memRoomCard'), h = c.querySelector('.st-memk'); return { head: !!h && !!h.offsetParent, say: h && h.querySelector('.st-say').textContent, sw: [...c.querySelectorAll('.mr-sw')].filter((x) => x.offsetParent).length, how: c.querySelector('.mr-how').classList.contains('rm-shut') }; });
  ok(mem.head && mem.sw === 0 && /in your chats/.test(mem.say) && mem.how, "Memory: its switches folded under one head that says all four; How it works folded", mem);
  await p.click('#memRoomCard .st-memk'); await p.waitForTimeout(500);
  ok(await p.evaluate(() => [...document.querySelectorAll('#memRoomCard .mr-sw')].filter((x) => x.offsetParent).length === 4), 'pressed, the four switches show');
  await room('calm');
  const calm = await p.evaluate(() => [...document.querySelectorAll('#supRows > .sup-group')].map((g) => getComputedStyle(g).boxShadow !== 'none'));
  ok(calm.length >= 2 && calm.every(Boolean), "Calm and focus: each group a raised tile", calm);

  // 7. by night; minimal motion
  await p.evaluate(() => document.body.setAttribute('data-theme', 'night')); await room('data', 'storage');
  const night = await p.evaluate(() => { const t = document.querySelector('#stxCard .st-itile.rm-shut'); const bg = getComputedStyle(t).backgroundImage; const m = bg.match(/rgb\((\d+), (\d+), (\d+)\)/); return { bg, lum: m ? (0.2126 * m[1] + 0.7152 * m[2] + 0.0722 * m[3]) : 999 }; });
  ok(night.lum < 60, 'by night a tile is dark purple, never pale', night);
  await p.evaluate(() => { document.body.removeAttribute('data-theme'); document.body.setAttribute('data-motion', 'minimal'); }); await room('everyday');
  const still = await p.evaluate(() => [...document.querySelectorAll('#rmP-settings-everyday > .st-tile')].map((t) => getComputedStyle(t).animationName));
  ok(still.every((x) => x === 'none'), 'Minimal motion: the tiles do not rise in', still);
  ok(!errs.length, 'no error on the page', errs);
  console.log('\n' + P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
