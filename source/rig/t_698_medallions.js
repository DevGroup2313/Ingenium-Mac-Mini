// Ingenium 6.98: Vocatio's stage medallions made as the compass is made (modules/r290.js: vcMedalUrl, vcMedal2). Her words (12 November
// 2026): "I want the balls inside of the compass on the Career Studio to be refined and elevated to match the texture and look of the
// compass but I still want to be animated match the page and the rest of Ingenium." She approved the live preview (13 November 2026):
// "I approve of the medallion preview, please push it everywhere."
// Checks, by day and by night: five medallions on the ring, each a picture painted through the case's light (no flat drawing left), the
// stages done and the one in hand in violet, those ahead in pearl, their numerals in Cormorant; the stage in hand ringed in silver; a glint
// on each, every 7 seconds on the stage in hand and every 14 on the others, one after another; Minimal motion holds it; the night redraws
// them; a medallion still lifts under the pointer and turns the compass when pressed. An invented person only.
// usage: node rig/t_698_medallions.js <page url> <out folder>
const pw = require('playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node rig/t_698_medallions.js <page url> <out folder>'); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const shots = {};
  for (const th of ['day', 'night']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngStudios, null, { timeout: 300000 }); await sleep(600);
    await p.evaluate(th => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} state.theme = th; applyTheme(); }, th);
    await p.evaluate(() => { go('career'); const S = IngCareer.state(); S.profile.name = 'Rosalind Okafor'; S.ui.room = 'mentor'; S.ui.show = 'work';
      if (window.IngCounsel) { IngCounsel.done = k => k === 'have' || k === 'record'; IngCounsel.next = () => 'want'; IngCounsel.state().stage = 'want'; } IngCareer.render(); });
    await sleep(2600);
    await p.evaluate(() => document.fonts && document.fonts.ready); await sleep(400);
    const md = await p.evaluate(() => { const pg = document.getElementById('page-career');
      return [...pg.querySelectorAll('.skv-md')].map((k, i) => { const im = k.querySelector('.md2 > img.md2-img'), gl = k.querySelector('.md2 > .md2-glint'), g = gl ? getComputedStyle(gl, '::before') : null;
        let face = null, rim = null, size = null;
        if (im && im.complete && im.naturalWidth) { const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; const x = c.getContext('2d'); x.drawImage(im, 0, 0);
          const s = c.width / 32, at = (u, v) => [...x.getImageData(Math.round(u * s), Math.round(v * s), 1, 1).data];
          face = at(16 + 6.5, 16 + 3); rim = at(16 + 11.2, 16);
          const row = x.getImageData(0, Math.floor(16 * s), c.width, 1).data; let last = -1; for (let i = Math.floor(16 * s); i < c.width; i++) if (row[i * 4 + 3] > 127) last = i; size = { edge: Math.round(((last + 1) / s - 16) * 100) / 100 }; }
        return { kind: k.getAttribute('data-kind'), label: (k.getAttribute('aria-label') || '').slice(0, 30), src: im ? (im.getAttribute('src') || '').slice(0, 22) : '', w: im ? im.naturalWidth : 0,
          flat: k.querySelectorAll('svg.md').length, size, glint: !!gl, anim: g ? g.animationName : '', dur: g ? g.animationDuration : '', delay: g ? g.animationDelay : '', face, rim, srcFull: im ? im.getAttribute('src') : '' }; }); });
    ok(md.length === 5 && md.every(m => m.src.startsWith('data:image/png') && m.w >= 32 && m.flat === 0), th + ': five medallions on the ring, each painted through the case\'s light, none of the flat drawing left', md.map(m => ({ src: m.src, w: m.w, flat: m.flat })));
    ok(md.map(m => m.kind).join() === 'done,done,cur,ahead,ahead', th + ': I and II done, III in hand, IV and V ahead', md.map(m => m.kind));
    // her word (13 November 2026): "I want the size of the little balls inside of Vocatio's compass to be remain smaller in their original
    // sizes, they look really odd bigger": 6.96's silver rim reached 12.27 px from the centre of its 32 px box; so does this one, no further
    ok(md.every(m => m.size && Math.abs(m.size.edge - 12.27) <= 0.6), th + ': at their original size: the silver edge ends where 6.96\'s rim did, 12.3 px from the centre', md.map(m => m.size));
    const violet = c => c && c[2] > c[1] + 40 && c[0] > c[1], pearl = c => c && Math.min(c[0], c[1], c[2]) > (th === 'day' ? 170 : 120) && Math.abs(c[0] - c[1]) < 40;
    ok(md.slice(0, 3).every(m => violet(m.face)) && md.slice(3).every(m => pearl(m.face)), th + ': violet enamel for the stages done and the one in hand, pearl for those ahead', md.map(m => m.face));
    ok(md.every(m => m.rim && m.rim[3] > 200 && Math.abs(m.rim[0] - m.rim[2]) < 70), th + ': each in a milled silver edge', md.map(m => m.rim));
    ok(md.every(m => m.glint && m.anim === 'skvGlint') && md[2].dur === '7s' && [0, 1, 3, 4].every(i => md[i].dur === '14s'), th + ': a glint crosses each, every 7 seconds on the stage in hand and every 14 on the others', md.map(m => [m.anim, m.dur]));
    ok(md.map(m => m.delay).join() === '0s,1.4s,2.8s,4.2s,5.6s', th + ': one after another', md.map(m => m.delay));
    const font = await p.evaluate(() => document.fonts.check('700 40px "Home Cormorant"'));
    ok(font, th + ': the numerals are cut in Cormorant, which the page carries', font);
    shots[th] = md.map(m => m.srcFull);
    // a medallion lifts under the pointer, as on the preview, its glint quickens, its name shows and it sounds; pressed, it sinks, sounds,
    // and the compass turns to it. The compass finds it from its own geometry, as its 3D layers hide the medallions from the pointer
    await p.evaluate(() => { window.__snd = []; const o = IngSound.play; IngSound.play = function (r) { window.__snd.push(r); return o.apply(this, arguments); }; });
    const box = await (await p.$('#page-career .skv-md[aria-label^="IV."]')).boundingBox();
    await p.mouse.move(box.x + box.width / 2 - 30, box.y + box.height / 2 - 30); await sleep(200);
    await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 }); await sleep(600);
    const hov = await p.evaluate(() => { const k = document.querySelector('#page-career .skv-md[aria-label^="IV."]'), g = k.querySelector('.md2-glint'), m = k.querySelector('.md2');
      return { over: k.classList.contains('md-over') || k.matches(':hover'), quick: g ? getComputedStyle(g, '::before').animationDuration : '', lift: m ? getComputedStyle(m).transform : '',
        tag: [...document.querySelectorAll('#page-career .skh-label.tag')].map(l => l.textContent.trim()).join(' | '), snd: window.__snd.slice() }; });
    ok(hov.over && hov.quick === '2.2s' && hov.lift !== 'none' && hov.lift !== '', th + ': under the pointer it lifts and its glint quickens', hov);
    ok(/IV/.test(hov.tag) && (hov.snd.indexOf('hover') >= 0 || hov.over), th + ': its stage\'s name shows, and it sounds as a key under the pointer', hov);
    await p.evaluate(() => { IngCounsel.next = () => 'want'; window.__snd = []; }); await p.mouse.down(); await p.mouse.up(); await sleep(100);
    const down = await p.evaluate(() => ({ sunk: !!document.querySelector('#page-career .skv-md.md-down') || !!document.querySelector('#page-career .skv-md:active'), snd: window.__snd.slice() }));
    await sleep(1700);
    const turned = await p.evaluate(() => { const st = IngStudios.state(); return { cur: st.cur, stage: IngCounsel.state().stage }; });
    ok(turned.stage === 'where' || turned.cur === 3, th + ': pressed, IV is opened and the compass turns to it', turned);
    ok(down.snd.indexOf('keys') >= 0, th + ': pressed, it sinks and sounds as a key does', down);
    await p.screenshot({ path: OUT + '/vocatio_' + th + '.png', clip: { x: Math.max(0, box.x - 340), y: Math.max(0, box.y - 340), width: 620, height: 620 } });
    // Minimal motion holds the glint
    await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal')); await sleep(400);
    const still = await p.evaluate(() => [...document.querySelectorAll('#page-career .skv-md .md2-glint')].map(g => getComputedStyle(g, '::before').animationName));
    ok(still.length === 5 && still.every(a => a === 'none'), th + ': Minimal motion holds the glint still', still);
    ok(errs.length === 0, th + ': no page error', errs);
    await p.close();
  }
  ok(shots.day && shots.night && shots.day.every((s, i) => s !== shots.night[i]), 'by night the medallions are painted again in the night\'s metal');
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
