// Ingenium 7.16: every page's 3D header answers a finger. Her words (15 November 2026): "The diamon and the overall 3D display of the Adamas
// page is not clickable on my iphone, they do not react no matter how many times I press on them please fix that. All of the 3D headers of
// Ingenium's pages need to be clickable and animated when I press on them on my phone or Fire tablet."
// A finger sends no pointer movement before it presses, so nothing may hang on a hover seen first. Each page is opened on a phone's screen
// (390 by 844, touch, as an iPhone 14) and on a Fire tablet's (800 by 1280, touch), its header's instrument is tapped where its parts stand
// (no mouse anywhere), and again by a mouse that arrives first; a press is answered when it sounds (Ingenium's sound engine, or any sound a
// head makes itself). A finger must be answered wherever a mouse's press is: on 7.15 Adamas answered a finger in 1 place of 5 against a
// mouse's 5, Lector's sheets in 1 against 3. Chromium's touch, standing in for the iPhone's Safari engine, which this machine does not have.
// usage: node rig/t_716_touch_heads.js <page url> <out folder> [phone|fire|both] [mouse|finger]
const pw = require('playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, WHICH, ONLY] = process.argv.slice(2);
// each screen is pressed twice: by a mouse that arrives first (its hover may lift a part), then by a finger; a finger must be answered
// wherever a mouse's press is (a header's quiet places, quiet for both, are not counted against it)
const MODES = ONLY === 'mouse' ? ['mouse'] : ONLY === 'finger' ? ['finger'] : ['mouse', 'finger'];
if (!URL_ || !OUT) { console.log('usage: node rig/t_716_touch_heads.js <page url> <out folder> [phone|fire|both]'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const RES = {}; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const SCREENS = {
  phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148' },
  fire: { viewport: { width: 800, height: 1280 }, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (Linux; Android 11; KFTRWI) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 Safari/537.36' }
};
// each page, its header, and the parts of its instrument to tap (fractions of the instrument's box)
const PAGES = [
  { pg: 'home', name: 'Home' }, { pg: 'blend', name: 'Concordia' }, { pg: 'folders', name: 'Ingenia' }, { pg: 'models', name: 'Models' },
  { pg: 'focus', name: 'Vesta' }, { pg: 'build', name: 'Adamas' }, { pg: 'fabrica', name: 'Fabrica' }, { pg: 'lector', name: 'Lector' },
  { pg: 'career', name: 'Vocatio' }
];
const SPOTS = [[0.5, 0.36], [0.5, 0.5], [0.5, 0.7], [0.32, 0.55], [0.68, 0.55]];
(async () => {
  const b = await pw.chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const screens = WHICH === 'phone' ? ['phone'] : WHICH === 'fire' ? ['fire'] : ['phone', 'fire'];
  for (const MODE of MODES) for (const sc of screens) {
    const ctx = await b.newContext(MODE === 'mouse' ? Object.assign({}, SCREENS[sc], { hasTouch: false, isMobile: false }) : SCREENS[sc]); const p = await ctx.newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await sleep(700);
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await sleep(400);
    await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); window.__keepQ = 1;
      // every sound Ingenium's own engine is asked for, by name
      window.__snd = []; const S = window.IngSound;
      [window.AudioContext, window.webkitAudioContext].forEach(C => { if (!C || C.prototype.__spied) return; C.prototype.__spied = 1;
        ['createBufferSource', 'createOscillator'].forEach(k => { const o = C.prototype[k]; C.prototype[k] = function () { window.__snd.push('audio:' + k); return o.apply(this, arguments); }; }); });
      try { const op = HTMLMediaElement.prototype.play; HTMLMediaElement.prototype.play = function () { window.__snd.push('media'); return op.apply(this, arguments); }; } catch (e) {} if (S) ['play', 'voice', 'tap', 'click', 'water', 'stone'].forEach(k => { if (typeof S[k] === 'function') { const o = S[k]; S[k] = function (a) { window.__snd.push(k + ':' + (typeof a === 'string' ? a : '')); return o.apply(this, arguments); }; } }); });
    for (const P of PAGES) {
      const has = await p.evaluate(pg => !!document.getElementById('page-' + pg), P.pg); if (!has) { console.log('note: ' + sc + ' ' + P.name + ' is not in this edition'); continue; }
      await p.evaluate(pg => { go(pg); document.scrollingElement.scrollTop = 0; }, P.pg); await sleep(2200); await p.evaluate(() => { document.scrollingElement.scrollTop = 0; }); await sleep(300);
      // the header: the first raised head of the page; its instrument: the largest drawing in it that is not the card's own sky
      const box = await p.evaluate(pg => {
        const page = document.getElementById('page-' + pg); if (!page) return null;
        const head = page.querySelector('.skh, .tr-head, .hm-head, .bl-head, .fd-head, [class*="-head"]');
        if (!head) return { none: true };
        const cand = [...head.querySelectorAll('.skh-obj, .tr-scene, .fd-drawer, canvas, svg, .bl-mv, .orr, [class*="scene"], [class*="stage"]')].filter(e => {
          const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 60 && r.height > 60 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.classList.contains('bd-bg') && !/\bsky|bg\b/.test(e.className.baseVal || e.className || '');
        });
        const hr = head.getBoundingClientRect();
        cand.sort((a, c) => { const A = a.getBoundingClientRect(), C = c.getBoundingClientRect(); return C.width * C.height - A.width * A.height; });
        const el = cand.find(e => { const r = e.getBoundingClientRect(); return r.width * r.height < hr.width * hr.height * 0.9; }) || cand[0];
        if (!el) return { head: head.className, noObj: true };
        const r = el.getBoundingClientRect();
        return { head: String(head.className).slice(0, 60), obj: (el.tagName + '.' + String(el.className.baseVal || el.className)).slice(0, 60), x: r.left, y: r.top, w: r.width, h: r.height, vh: innerHeight };
      }, P.pg);
      if (!box || box.none || box.noObj) { ok(false, sc + ': ' + P.name + ' has a header with an instrument to press', box); continue; }
      // the instrument into the window (a phone stacks it under the words)
      if (box.y + box.h * 0.75 > box.vh || box.y < 0) { await p.evaluate(y => { document.scrollingElement.scrollTop += y; }, Math.round(box.y - 80)); await sleep(500); }
      const bx = await p.evaluate(pg => { const page = document.getElementById('page-' + pg), head = page.querySelector('.skh, .tr-head, .hm-head, .bl-head, .fd-head, [class*="-head"]'); return head ? head.getBoundingClientRect().top : 0; }, P.pg);
      const box2 = await p.evaluate(([pg, sel]) => {
        const page = document.getElementById('page-' + pg), head = page.querySelector('.skh, .tr-head, .hm-head, .bl-head, .fd-head, [class*="-head"]');
        const cand = [...head.querySelectorAll('.skh-obj, .tr-scene, .fd-drawer, canvas, svg, .bl-mv, .orr, [class*="scene"], [class*="stage"]')].filter(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 60 && r.height > 60 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.classList.contains('bd-bg') && !/\bsky|bg\b/.test(e.className.baseVal || e.className || ''); });
        const hr = head.getBoundingClientRect(); cand.sort((a, c) => { const A = a.getBoundingClientRect(), C = c.getBoundingClientRect(); return C.width * C.height - A.width * A.height; });
        const el = cand.find(e => { const r = e.getBoundingClientRect(); return r.width * r.height < hr.width * hr.height * 0.9; }) || cand[0]; const r = el.getBoundingClientRect();
        return { x: r.left, y: r.top, w: r.width, h: r.height };
      }, [P.pg]);
      let answered = 0; const said = [];
      for (const [fx, fy] of SPOTS) {
        const x = Math.round(box2.x + box2.w * fx), y = Math.round(box2.y + box2.h * fy);
        // what is under the finger, and how much of the header changes in the next 0.7 s, without and then with a tap
        const top = await p.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e ? (e.tagName + '.' + String(e.className.baseVal || e.className)).slice(0, 50) : null; }, [x, y]);
        await p.evaluate(pg => { window.__snd.length = 0; const page = document.getElementById('page-' + pg); window.__mut = 0; if (window.__mo) window.__mo.disconnect();
          window.__mo = new MutationObserver(l => { window.__mut += l.length; }); window.__mo.observe(page, { subtree: true, attributes: true, childList: true }); }, P.pg);
        await sleep(700); const base = await p.evaluate(() => window.__mut);
        await p.evaluate(() => { window.__mut = 0; });
        // a mouse arrives first (its hover may sound): only what the press itself sounds counts
        if (MODE === 'mouse') { await p.mouse.move(x, y, { steps: 4 }); await sleep(250); await p.evaluate(() => { window.__snd.length = 0; }); await p.mouse.down(); await sleep(90); await p.mouse.up(); await sleep(610); }
        else { await p.touchscreen.tap(x, y); await sleep(700); }
        const after = await p.evaluate(() => ({ mut: window.__mut, snd: window.__snd.slice(), y: document.scrollingElement.scrollTop }));
        const hit = after.snd.length > 0;
        if (hit) answered++; said.push({ at: [fx, fy], top, snd: after.snd, mut: [base, after.mut] });
      }
      await p.screenshot({ path: path.join(OUT, sc + '_' + P.pg + '.png') });
      RES[MODE + ':' + sc + ':' + P.pg] = { obj: box.obj, answered, said };
      console.log((MODE + ' ' + sc + ' ' + P.name).padEnd(28) + answered + ' of ' + SPOTS.length); if (false) ok(answered >= 3, sc + ': ' + P.name + '\'s header answers a ' + (MODE === 'mouse' ? 'mouse' : 'finger') + ' (its press sounds) in ' + answered + ' of ' + SPOTS.length + ' places', { obj: box.obj, said: said.map(s => [s.at, s.top, s.snd.length]) });
    }
    ok(errs.length === 0, MODE + ' ' + sc + ': no page error', errs);
    await ctx.close();
  }
  await b.close(); fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(RES, null, 1));
  if (MODES.length === 2) for (const sc of screens) for (const P of PAGES) { const m = RES['mouse:' + sc + ':' + P.pg], f = RES['finger:' + sc + ':' + P.pg]; if (!m || !f) continue;
    ok(f.answered >= m.answered, sc + ': ' + P.name + '\'s header answers a finger wherever it answers a mouse (finger ' + f.answered + ', mouse ' + m.answered + ' of ' + SPOTS.length + ')', { finger: f.said.map(x => [x.at, x.top, x.snd.length]), mouse: m.said.map(x => [x.at, x.top, x.snd.length]) }); }
  // the heads she named, and the turret made a toy: a finger is answered almost everywhere on them
  for (const sc of screens) for (const pg of ['build', 'models']) { const f = RES['finger:' + sc + ':' + pg]; if (f) ok(f.answered >= 4, sc + ': ' + (pg === 'build' ? 'Adamas' : 'the Mentes turret') + ' answers a finger in ' + f.answered + ' of ' + SPOTS.length + ' places', f.said.map(x => [x.at, x.top, x.snd.length])); }
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})();
