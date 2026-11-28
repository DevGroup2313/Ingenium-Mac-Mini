// node rig/t_815_orbit_stop_folders_fabrica.js <page url> <picture folder>
// Ingenium 8.15: the welcome's orbs on their orbit (r410); Stop writing in the Engine panel (r374); the folders ask first (r390, r208);
// Fabrica's head logo a live key, its name whole, its panels at their full length (r112, r421). Invented people and apps only.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let P = 0, F = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? P++ : F++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  const ready = () => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 500 });
  await p.goto(URL_, { timeout: 600000 }); await ready();
  await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await p.reload(); await ready(); await p.waitForTimeout(2500);
  // 1. the welcome's orbs ride their orbit round the seal
  const pos = () => p.evaluate(() => [...document.querySelectorAll('#sioStage .sio-orb .sio-ball')].map((e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), w: Math.round(r.width) }; }));
  const inWorld = await p.evaluate(() => document.querySelectorAll('#sioStage .sio-orbit .sio-world .sio-spin .sio-arm .sio-stand .sio-orb').length);
  let a = await pos(); await p.waitForTimeout(3000); let c = await pos();
  const moved = a.length === 2 && c.length === 2 && a.some((x, i) => Math.abs(x.x - c[i].x) + Math.abs(x.y - c[i].y) > 6);
  ok(inWorld === 2 && moved, 'the welcome: both orbs ride the orbit round the seal, moving by themselves', { inWorld, a, c });
  await p.screenshot({ path: path.join(OUT, '1_orbit_a.png') });
  const seal = await p.evaluate(() => { const r = document.querySelector('#sioStage .sio-centre .hx-seal').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, r: r.width / 2 }; });
  ok(c.every((o) => Math.hypot(o.x - seal.x, o.y - seal.y) > seal.r + o.w / 2 - 4), 'the orbs pass round the seal, never over it', { c, seal });
  // pointing at an orb stops the orbit, and the orb answers a press
  const o2 = c[1]; await p.mouse.move(o2.x, o2.y); await p.waitForTimeout(600); const h1 = await pos(); await p.waitForTimeout(1500); const h2 = await pos();
  const held = h1.every((x, i) => Math.abs(x.x - h2[i].x) + Math.abs(x.y - h2[i].y) <= 2);
  ok(held, 'pointing at an orb holds the orbit still', { h1, h2 });
  await p.mouse.move(5, 5); await p.waitForTimeout(2500); const r1 = await pos(); const rolled = r1.some((x, i) => Math.abs(x.x - h2[i].x) + Math.abs(x.y - h2[i].y) > 4);
  ok(rolled, 'and leaving it lets the orbit turn again', { h2, r1 });
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(1200);
  const phone = await p.evaluate(() => { const orbs = [...document.querySelectorAll('#sioStage .sio-orb')].map((o) => o.getBoundingClientRect()); const pl = document.querySelector('#introDoor .intro-card').getBoundingClientRect();
    return { orbs: orbs.map((r) => ({ l: r.left, r: r.right, t: r.top, b: r.bottom })), plateTop: pl.top, wide: document.documentElement.scrollWidth <= innerWidth + 1 }; });
  ok(phone.wide && phone.orbs.every((o) => o.l >= -2 && o.r <= 392), 'on a phone the orbit stays on the screen', phone);
  await p.screenshot({ path: path.join(OUT, '2_orbit_phone.png') });
  await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(800);
  // her orb still enters
  const mine = (await pos())[0]; await p.mouse.move(mine.x, mine.y); await p.waitForTimeout(500); await p.mouse.down(); await p.mouse.up(); await p.waitForTimeout(1800);
  const entered = await p.evaluate(() => document.getElementById('introDoor').hasAttribute('hidden') && !document.body.classList.contains('sio-on'));
  ok(entered, 'pressing her orb as it rides the orbit still enters', entered);
  // 2. Stop writing in the Engine panel, beside Load and Unload
  await p.evaluate(() => { const k = document.getElementById('enginePill'); if (k) k.click(); }); await p.waitForTimeout(700);
  let e1 = await p.evaluate(() => { const s = document.querySelector('#ingEngine .ie-keys-top .ie-stop'), row = s && s.parentNode; return s ? { dis: s.disabled, text: s.textContent.trim(), keys: [...row.querySelectorAll('button')].map((x) => x.textContent.trim().slice(0, 30)) } : null; });
  ok(e1 && e1.dis && /Stop writing/.test(e1.text) && e1.keys.some((k) => /^Load/.test(k)) && e1.keys.some((k) => /^Unload/.test(k)), 'the Engine panel: Stop writing beside Load and Unload, resting while nothing is written', e1);
  await p.evaluate(() => { window.__stops = 0; const o = window.ingStopWriting; window.ingModelInUse = function () { return 'Lector'; }; window.ingStopWriting = function () { window.__stops++; return o(); }; }); await p.waitForTimeout(1300);
  e1 = await p.evaluate(() => { const s = document.querySelector('#ingEngine .ie-stop'), ln = document.getElementById('ieWriting'); return { dis: s.disabled, line: ln ? ln.textContent : '' }; });
  ok(!e1.dis && /Writing now: Lector/.test(e1.line), 'while the model writes, Stop writing wakes and says for whom', e1);
  await p.screenshot({ path: path.join(OUT, '3_engine_stop.png') });
  await p.click('#ingEngine .ie-stop'); await p.waitForTimeout(500);
  const st = await p.evaluate(() => ({ n: window.__stops, line: (document.getElementById('ieWriting') || {}).textContent || '' }));
  ok(st.n === 1 && /Stopped: Lector/.test(st.line), 'pressing it stops the writing, and says what was stopped', st);
  await p.evaluate(() => { window.ingModelInUse = function () { return ''; }; document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); }); await p.waitForTimeout(400);
  // 3. the folders' question: nothing written until she says so; she picks which
  const fq = await p.evaluate(() => new Promise((res) => {
    const F = window.IngFolders, made = [];
    const fake = [{ id: 'fA', name: 'Tide Clock', app: { read: {} } }, { id: 'fB', name: 'Green Leaf', app: { read: {} } }];
    F.folders = function () { return fake; }; F.unread = function (pp) { return pp.id === 'fA' ? [{ id: 'c1' }, { id: 'c2' }] : [{ id: 'c3' }]; };
    F.bringUp = function (pp) { made.push(pp.name); return new Promise((r) => setTimeout(() => r(pp), 600)); };
    const n = window.IngKnow.askFolders(); const A = document.getElementById('knAsk');
    const rows = A ? [...A.querySelectorAll('.ka-row')].map((r) => r.textContent.replace(/\s+/g, ' ').trim()) : [];
    const before = made.length;
    if (A) { const boxes = A.querySelectorAll('.ka-row input'); boxes[1].click(); A.querySelector('.btn.primary').click(); }
    setTimeout(() => { const A2 = document.getElementById('knAsk'); const during = A2 ? A2.querySelector('h4').textContent : '';
      setTimeout(() => res({ n, rows, before, during, made: made.slice(), after: !!document.getElementById('knAsk'), skip: window.state.know.fask.skip }), 1500); }, 300);
  }));
  ok(fq.n === 2 && fq.rows.length === 2 && /Tide Clock.*2 new/.test(fq.rows[0]) && fq.before === 0, 'the folders\' question names each folder with new conversations; nothing is written before she answers', fq);
  ok(fq.made.length === 1 && fq.made[0] === 'Tide Clock' && /Writing Tide Clock's folder/.test(fq.during) && !fq.after && fq.skip.fB === 'c3', 'only the folder she ticked is written, the card saying which; the one she left is not asked about again until it has something new', fq);
  await p.evaluate(() => { window.IngKnow.askFolders(); }); await p.waitForTimeout(400); await p.screenshot({ path: path.join(OUT, '4_folders_question.png') });
  const nn = await p.evaluate(() => { const A = document.getElementById('knAsk'); const x = A && [...A.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Not now'); if (x) x.click(); return { gone: !document.getElementById('knAsk'), until: window.state.know.fask.until > Date.now() }; });
  ok(nn.gone && nn.until, 'Not now: the card goes, and asks again later', nn);
  const sw = await p.evaluate(() => { try { window.IngKnow.open && window.IngKnow.open(); } catch (e) {} return window.state.know.opts.askFolders; });
  ok(sw === true, 'asking first is on unless she turns it off', sw);
  // 4. Fabrica: the head's logo a live key, its name whole, its panels at their full length
  await p.setViewportSize({ width: 2000, height: 1250 });
  await p.evaluate(() => { try { go('fabrica'); } catch (e) {} }); await p.waitForTimeout(3500);
  const fb = await p.evaluate(() => { const s = document.getElementById('fbWhSeal'), h = document.getElementById('fbWhName'), pn = document.getElementById('fbPanels');
    const cs = h ? getComputedStyle(h) : null; return { key: !!(s && s.classList.contains('f-key')), role: s && s.getAttribute('role'), tab: s && s.getAttribute('tabindex'), name: h ? h.textContent : '',
      lh: cs ? parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) : 0, clip: h ? h.scrollHeight - h.clientHeight : 99, panels: pn ? Math.round(pn.getBoundingClientRect().height) : 0 }; });
  ok(fb.key && fb.role === 'button' && fb.tab === '0', 'Fabrica: the logo by the branch is a key', fb);
  ok(fb.lh >= 1.25 && fb.clip <= 0, 'its name stands whole, nothing cut below the line', fb);
  // what stands above the panels inside the frame (the way-finding bar, the next step) no longer shortens them
  const tall = await p.evaluate(() => new Promise((res) => { const fbEl = document.getElementById('fb'), pn = document.getElementById('fbPanels'); const h0 = pn.getBoundingClientRect().height;
    const x = document.createElement('div'); x.style.cssText = 'height:330px;flex:0 0 auto'; x.id = 'tExtra'; fbEl.insertBefore(x, pn); window.dispatchEvent(new Event('resize'));
    setTimeout(() => { const h1 = pn.getBoundingClientRect().height; x.remove(); window.dispatchEvent(new Event('resize')); res({ h0: Math.round(h0), h1: Math.round(h1), win: innerHeight }); }, 600); }));
  ok(tall.h1 >= tall.win - 100 && Math.abs(tall.h1 - tall.h0) <= 4, 'with a bar and a card above them, the panels keep the window\'s full height, as before', tall);
  await p.setViewportSize({ width: 1240, height: 625 }); await p.waitForTimeout(900);
  const small = await p.evaluate(() => Math.round(document.getElementById('fbPanels').getBoundingClientRect().height));
  ok(small >= 640, 'on a small window the panels keep at least 640 points; the page scrolls', small);
  await p.setViewportSize({ width: 2000, height: 1250 }); await p.waitForTimeout(900);
  const sr = await p.evaluate(() => { const r = document.getElementById('fbWhSeal').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width }; });
  await p.mouse.move(sr.x, sr.y); await p.waitForTimeout(400); const hov = await p.evaluate(() => document.getElementById('fbWhSeal').matches(':hover') && getComputedStyle(document.getElementById('fbWhSeal')).translate !== 'none');
  await p.mouse.down(); await p.waitForTimeout(120); const down = await p.evaluate(() => document.getElementById('fbWhSeal').classList.contains('down'));
  await p.mouse.up(); await p.waitForTimeout(300); const fl = await p.evaluate(() => [...document.getElementById('fbWhSeal').classList].filter((c) => /^r421-/.test(c)));
  ok(hov && down && fl.length === 1 && fl[0] !== 'r421-up', 'under the pointer it lifts; pressed it sinks; let go it plays a flourish', { sr, hov, down, fl });
  await p.screenshot({ path: path.join(OUT, '5_fabrica.png') });
  ok(errs.length === 0, 'no page error', errs);
  console.log(P + ' passed, ' + F + ' failed'); await b.close(); process.exit(F ? 1 : 0);
})();
