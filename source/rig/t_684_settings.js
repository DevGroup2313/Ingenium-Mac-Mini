// node rig/t_684_settings.js <Ingenium page url> <out dir>
// Ingenium 6.84 (12 November 2026), in Chromium: Settings as one console, every card in one anatomy (modules/r278.js, r234.js's bar by
// its id). Her words (11 November 2026): "all of those lone buttons from the Settings page, the tabs could the entire Setting page could
// use a better organising and a slight redesign to keep things looking tidy and cohesive to match the rest of Ingenium"; (12 November)
// "I approve of the preview, please push it everywhere."
// Checks: the console holds Find a setting with Show every setting at once beside it, the room keys and the tier; Models and AI and
// Your data show their section keys in the tier, which still choose their cards; the other rooms show their line; Every setting at once
// hides the tier and shows every room; Find a setting still finds and opens; Theme's pills set the theme (and the select), Motion's too;
// a longer choice keeps Ingenium's own list (r172) as a row; Support's and Your Ingenium's checkboxes are switches and still change
// their setting; Sounds is a switch that presses On and Off; Help's levels side by side; every card title has one icon after many room
// changes; nothing in the console is rewritten while left alone; by night the console is dark; at phone width nothing is wider than
// the screen; no page error. Invented nothing: the page's own settings, on this test browser.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.waitForTimeout(500); await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} try { closeModal && closeModal(); } catch (e) {} go('settings'); });
  await p.waitForTimeout(1500);
  const room = async k => { await p.evaluate(k => document.getElementById('rmT-settings-' + k).click(), k); await p.waitForTimeout(400); };
  // the console
  const c0 = await p.evaluate(() => { const sc = document.getElementById('setConsole'), find = document.querySelector('#setConsole .rm-find');
    return { sc: !!sc, part: window.__ingParts && window.__ingParts.p278, bar: !!(sc && sc.contains(document.getElementById('rmBar-settings'))), allBeside: !!(find && find.contains(document.getElementById('rmAll-settings'))),
      tabs: !!(sc && sc.contains(document.getElementById('rmTabs-settings'))), tier: !!(sc && sc.contains(document.getElementById('setTier'))), says: !!document.querySelector('#setTier #rmSays-settings'),
      ph: (document.getElementById('rmFind') || {}).placeholder, lab: getComputedStyle(document.querySelector('#setConsole .rm-find-lab')).width,
      filed: !document.querySelector('.rm-panel #setConsole') };
  });
  ok(c0.sc && c0.part === 'running' && c0.bar && c0.allBeside && c0.tabs && c0.tier && c0.says && /backup, theme, sound, memory/.test(c0.ph || '') && c0.filed,
    'one console: Find a setting with Show every setting at once beside it, the room keys and the line under them', c0);
  await room('ai');
  const s1 = await p.evaluate(() => ({ room: document.getElementById('setConsole').getAttribute('data-room'), bar: !!document.querySelector('#setTier #dxB-ai'), barShown: getComputedStyle(document.getElementById('dxB-ai')).display !== 'none',
    saysShown: getComputedStyle(document.getElementById('dxSays-ai')).display !== 'none', roomLine: getComputedStyle(document.getElementById('rmSays-settings')).display, dupBars: document.querySelectorAll('#page-settings .dx-bar[data-room="ai"]').length,
    dataBar: document.getElementById('dxB-data') ? getComputedStyle(document.getElementById('dxB-data')).display : 'none' }));
  ok(s1.room === 'ai' && s1.bar && s1.barShown && s1.saysShown && s1.roomLine === 'none' && s1.dupBars === 1 && s1.dataBar === 'none', 'Models and AI: its section keys and their line sit in the console (one bar, not two)', s1);
  await p.evaluate(() => document.getElementById('dxT-ai-conn').click()); await p.waitForTimeout(400);
  const s2 = await p.evaluate(() => ({ persona: getComputedStyle(document.getElementById('personaCard')).display, cn: getComputedStyle(document.getElementById('cnCard')).display, sel: document.getElementById('dxT-ai-conn').getAttribute('aria-selected'), says: document.getElementById('dxSays-ai').textContent }));
  ok(s2.persona === 'none' && s2.cn !== 'none' && s2.sel === 'true' && /online|computers|connectors/i.test(s2.says), 'a section key still chooses its cards (Connections)', s2);
  await room('data'); await p.evaluate(() => document.getElementById('dxT-data-storage').click()); await p.waitForTimeout(400);
  const s3 = await p.evaluate(() => ({ shown: getComputedStyle(document.getElementById('dxB-data')).display, ai: getComputedStyle(document.getElementById('dxB-ai')).display, stx: getComputedStyle(document.getElementById('stxCard')).display, bk: getComputedStyle(document.getElementById('bkCard')).display }));
  ok(s3.shown !== 'none' && s3.ai === 'none' && s3.stx !== 'none' && s3.bk === 'none', 'Your data: its own section keys, Storage chosen shows Storage alone', s3);
  await room('everyday');
  const s4 = await p.evaluate(() => ({ line: getComputedStyle(document.getElementById('rmSays-settings')).display, text: document.getElementById('rmSays-settings').textContent, ai: getComputedStyle(document.getElementById('dxB-ai')).display }));
  ok(s4.line !== 'none' && /day or night/i.test(s4.text) && s4.ai === 'none', 'Everyday: the room\'s line under the keys, no section keys', s4);
  await p.screenshot({ path: OUT + '/1_everyday.png' });
  // Theme's and Motion's pills
  const t0 = await p.evaluate(() => { const g = document.querySelector('#setTheme').closest('label').querySelector('.st-pills'); return { n: g ? g.children.length : 0, words: g ? [...g.children].map(x => x.textContent) : [], cb: getComputedStyle(document.getElementById('setTheme-dd')).display, chosen: g ? [...g.children].filter(x => x.getAttribute('aria-checked') === 'true').map(x => x.textContent) : [], v: document.getElementById('setTheme').value }; });
  ok(t0.n === 3 && t0.words.join('|') === 'Day|Follow the system|Night' && t0.cb === 'none' && t0.chosen.length === 1, 'Theme is three pills, one chosen; its list is not shown', t0);
  await p.evaluate(() => [...document.querySelector('#setTheme').closest('label').querySelectorAll('.st-pill')].find(x => x.textContent === 'Night').click()); await p.waitForTimeout(700);
  const t1 = await p.evaluate(() => ({ v: document.getElementById('setTheme').value, theme: document.body.getAttribute('data-theme'), chosen: [...document.querySelector('#setTheme').closest('label').querySelectorAll('.st-pill[aria-checked="true"]')].map(x => x.textContent),
    sc: getComputedStyle(document.getElementById('setConsole')).backgroundImage, bodyBg: getComputedStyle(document.body).backgroundColor }));
  ok(t1.v === 'night' && t1.theme === 'night' && t1.chosen.join() === 'Night', 'pressing Night sets the theme by night, as the list did', t1);
  ok(/rgb\((2|3|4)\d, /.test(t1.sc), 'by night the console takes the card\'s night colours', t1.sc);
  await room('ai'); await p.screenshot({ path: OUT + '/2_night_ai.png' });
  await p.evaluate(() => [...document.querySelector('#setTheme').closest('label').querySelectorAll('.st-pill')].find(x => x.textContent === 'Day').click()); await p.waitForTimeout(600);
  await room('everyday');
  const m1 = await p.evaluate(() => { const g = document.querySelector('#setMotion').closest('label').querySelector('.st-pills'); const was = document.getElementById('setMotion').value;
    const tgt = [...g.children].find(x => x.getAttribute('data-v') !== was); tgt.click(); return { was, now: document.getElementById('setMotion').value, want: tgt.getAttribute('data-v'), chosen: g.querySelector('[aria-checked="true"]').getAttribute('data-v') }; });
  ok(m1.now === m1.want && m1.chosen === m1.want && m1.now !== m1.was, 'Motion\'s pills set Motion', m1);
  await p.evaluate(v => { const g = document.querySelector('#setMotion').closest('label').querySelector('.st-pills'); [...g.children].find(x => x.getAttribute('data-v') === v).click(); }, m1.was);
  // a longer choice keeps Ingenium's own list, as a row
  await room('ai'); await p.evaluate(() => document.getElementById('dxT-ai-you').click()); await p.waitForTimeout(400);
  const l1 = await p.evaluate(() => { const l = document.getElementById('psLength').closest('label'); const cb = document.getElementById('psLength-dd'); const lr = l.getBoundingClientRect(), cr = cb.getBoundingClientRect(), sp = l.querySelector('span').getBoundingClientRect();
    return { row: l.classList.contains('st-row'), disp: getComputedStyle(l).display, cb: getComputedStyle(cb).display, rightEnd: Math.round(lr.right - cr.right), side: cr.left > sp.left + 60, pills: !!l.querySelector('.st-pills') }; });
  ok(l1.row && l1.disp === 'flex' && l1.cb !== 'none' && l1.side && l1.rightEnd < 4 && !l1.pills, 'a longer choice (Answers) is a row: its name on the left, Ingenium\'s own list at its end', l1);
  // checkboxes are switches, and still set their setting
  const w1 = await p.evaluate(() => { const i = document.getElementById('psCloud'); const cs = getComputedStyle(i); const was = i.checked; i.click(); const now = i.checked; i.click(); return { app: cs.appearance || cs.webkitAppearance, w: cs.width, was, now, back: i.checked }; });
  ok(w1.app === 'none' && w1.w === '40px' && w1.now !== w1.was && w1.back === w1.was, 'Your Ingenium\'s checkboxes are switches, and still turn their setting', w1);
  await room('calm');
  const w2 = await p.evaluate(() => { const i = document.querySelector('#supRows label.fx-sw input'); const cs = getComputedStyle(i); const l = i.closest('label'); const ir = i.getBoundingClientRect(), lr = l.getBoundingClientRect(); return { app: cs.appearance, w: cs.width, right: Math.round(lr.right - ir.right) }; });
  ok(w2.app === 'none' && w2.w === '40px' && w2.right < 4, 'Support\'s checkboxes are switches at the row\'s end', w2);
  // Sounds as a switch
  await room('everyday');
  const snd = await p.evaluate(() => { const sw = document.getElementById('setSndSw'), on = document.querySelector('#setSndOn [data-snd-on="1"]'); const a = { sw: !!sw, seg: getComputedStyle(document.getElementById('setSndOn')).display, was: sw && sw.getAttribute('aria-checked'), onWas: on.getAttribute('aria-pressed') };
    sw.click(); a.after = sw.getAttribute('aria-checked'); a.onAfter = on.getAttribute('aria-pressed'); sw.click(); a.back = sw.getAttribute('aria-checked'); a.onBack = on.getAttribute('aria-pressed'); return a; });
  ok(snd.sw && snd.seg === 'none' && snd.was === snd.onWas && snd.after === snd.onAfter && snd.after !== snd.was && snd.back === snd.was, 'Sounds is a switch, and it presses On and Off', snd);
  const lv = await p.evaluate(() => { const ks = [...document.querySelectorAll('#ihSetCard .ih-lvk')].map(x => x.getBoundingClientRect().top); return { n: ks.length, sameRow: ks.length === 3 && Math.abs(ks[0] - ks[2]) < 3, cols: getComputedStyle(document.querySelector('#ihSetCard .ih-lv')).gridTemplateColumns.split(' ').length }; });
  ok(lv.sameRow && lv.cols === 3, 'Help\'s three levels stand side by side', lv);
  // icons once, after many room changes
  for (const k of ['ai', 'data', 'own', 'calm', 'everyday', 'ai', 'data']) await room(k);
  const ic = await p.evaluate(() => { const hs = [...document.querySelectorAll('#page-settings .card > h2.sec')]; return { n: hs.length, with: hs.filter(h => h.querySelectorAll(':scope > .st-ic').length === 1).length, dup: hs.filter(h => h.querySelectorAll(':scope > .st-ic').length > 1).length }; });
  ok(ic.n > 8 && ic.with === ic.n && ic.dup === 0, 'every card title has its icon, once', ic);
  // Every setting at once
  await p.evaluate(() => document.getElementById('rmAll-settings').click()); await p.waitForTimeout(600);
  const a1 = await p.evaluate(() => ({ all: document.getElementById('page-settings').classList.contains('rm-all'), tier: getComputedStyle(document.getElementById('setTier')).display, panels: [...document.querySelectorAll('#page-settings .rm-panel')].filter(x => !x.hidden && x.offsetParent).length, key: document.getElementById('rmAll-settings').textContent.trim() }));
  ok(a1.all && a1.tier === 'none' && a1.panels >= 5 && /rooms/i.test(a1.key), 'Every setting at once: every room shown, the tier put away, the key says how to go back', a1);
  await p.screenshot({ path: OUT + '/3_all.png' });
  await p.evaluate(() => document.getElementById('rmAll-settings').click()); await p.waitForTimeout(500);
  // Find a setting
  await p.fill('#rmFind', 'backup'); await p.waitForTimeout(700);
  const f1 = await p.evaluate(() => { const o = document.getElementById('rmFindOut'); return { open: o && !o.hidden, hits: o ? o.querySelectorAll('li,button').length : 0, inConsole: document.getElementById('setConsole').contains(o) }; });
  ok(f1.open && f1.hits > 0 && f1.inConsole, 'Find a setting still finds, in the console', f1);
  await p.fill('#rmFind', ''); await p.waitForTimeout(300);
  // left alone, nothing in the console is rewritten
  await room('data'); await p.waitForTimeout(800);
  const still = await p.evaluate(() => new Promise(res => { let n = 0; const mo = new MutationObserver(ms => { n += ms.length; }); mo.observe(document.getElementById('setConsole'), { childList: true, subtree: true, attributes: true, characterData: true }); setTimeout(() => { mo.disconnect(); res(n); }, 4000); }));
  ok(still === 0, 'left alone for four seconds, nothing in the console is rewritten', still);
  // phone width
  await p.setViewportSize({ width: 400, height: 860 }); await p.waitForTimeout(700); await room('everyday');
  const ph = await p.evaluate(() => ({ over: document.documentElement.scrollWidth - document.documentElement.clientWidth, sc: Math.round(document.getElementById('setConsole').getBoundingClientRect().width) }));
  ok(ph.over <= 0, 'at phone width nothing is wider than the screen', ph);
  await p.screenshot({ path: OUT + '/4_phone.png' });
  ok(errs.length === 0, 'no page error', errs);
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
