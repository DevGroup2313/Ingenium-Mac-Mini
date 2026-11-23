// Mentes' Lending now, redesigned (her words, 23 November 2026: "I think that the "Lending Now" card is too bulky and completly detracts
// from the look of the Mentes page, I want it to be foldable and redesigned so that it looks better fits better with the rest of the
// page"): today's card, then two designs drawn in the running page with its own styles, folded and unfolded, by day and by night.
// A real computer app (rig/run_app.py, named Atelier) lends; its memory is measured live; the two devices' use is invented
// (Reading Tablet and Pocket Phone).
//   node capture_card.js <folder holding ingenium_app.py (patched with app_ask_770.py) and ingenium.html> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [APP, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const RUN_APP = path.join(__dirname, '..', '..', 'rig', 'run_app.py'); const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const home = path.join(OUT, '_mac', 'home'), dir = path.join(OUT, '_mac', 'app'); fs.mkdirSync(home, { recursive: true }); fs.mkdirSync(dir, { recursive: true });
for (const f of ['ingenium_app.py', 'ingenium.html']) fs.copyFileSync(path.join(APP, f), path.join(dir, f));
const pr = cp.spawn('python3', ['-I', RUN_APP, dir, '18996'], { env: Object.assign({}, process.env, { HOME: home, XDG_DATA_HOME: '', COMPUTERNAME: 'Atelier' }), stdio: ['ignore', 'pipe', 'pipe'] });
let out = ''; pr.stdout.on('data', (d) => out += d);
const api = (n, args) => fetch('http://127.0.0.1:18996/call/' + n, { method: 'POST', body: JSON.stringify(args || []) }).then((r) => r.json()).then((j) => { if (!j.ok) throw new Error(j.e); return j.v; });

/* the two designs: styles in the page's own variables, and a builder that mirrors the live card (its lit segments, its reading, its rows) */
const DESIGNS = String.raw`
.pvA{margin:0 0 4px;padding:10px 12px 10px 10px;border-radius:20px;background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#fbf9fe));
  box-shadow:0 1px 2px rgba(40,20,70,.07),0 6px 16px rgba(40,20,70,.08);transition:transform .45s cubic-bezier(.34,1.3,.64,1),box-shadow .3s}
.pvA:hover{transform:translateY(-2px);box-shadow:0 2px 4px rgba(40,20,70,.09),0 12px 24px rgba(40,20,70,.11)}
.pvA-row{display:grid;grid-template-columns:auto minmax(0,1fr) auto auto auto;align-items:center;gap:14px}
.pvA-badge{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;color:rgb(var(--ak-c));
  background:radial-gradient(circle at 34% 28%,#fff,rgba(var(--ak-c),.14) 75%);box-shadow:inset 0 1px 1px rgba(255,255,255,.9),0 1px 1px rgba(40,20,70,.12),0 3px 7px rgba(40,20,70,.12)}
.pvA-badge svg{width:20px;height:20px}
.pvA-t b{display:block;font:500 17px/1.15 var(--serif,Georgia,serif);letter-spacing:.01em;color:var(--ink-1)}
.pvA-t small{display:block;margin-top:2px;font-size:12px;color:var(--ink-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pvA-lv{display:flex;align-items:stretch;gap:3px;height:30px;padding:6px 8px;border-radius:11px;background:linear-gradient(180deg,rgba(34,26,46,.06),rgba(34,26,46,.02));
  box-shadow:inset 0 1.5px 3px rgba(40,20,70,.13),inset 0 -1px 0 rgba(255,255,255,.7)}
.pvA-lv i{display:block;width:6px;border-radius:2px;background:rgba(34,26,46,.10)}
.pvA-lv i.on{background:linear-gradient(180deg,rgba(var(--ak-s),.95),rgba(var(--ak-s),.72));box-shadow:0 0 6px rgba(var(--ak-s),.4)}
.pvA-read{font:600 12.5px/1.2 var(--sans);color:var(--ink-3);white-space:nowrap;text-align:right}
.pvA-read b{display:block;font:600 17px/1.1 var(--serif,Georgia,serif);color:var(--ink-1)}
.pvA-fold{width:34px;height:34px;border:0;border-radius:50%;cursor:pointer;display:grid;place-items:center;color:var(--ink-2);
  background:linear-gradient(var(--mr-keyA,#fff),var(--mr-keyB,#f4f0fa));box-shadow:var(--mr-sh-key,0 1px 1px rgba(40,20,70,.12),0 3px 6px rgba(40,20,70,.1));transition:transform .3s cubic-bezier(.34,1.5,.64,1),box-shadow .2s}
.pvA-fold:hover{transform:translateY(-2px)}
.pvA-fold svg{width:16px;height:16px;transition:transform .3s}
.pvA[data-open="1"] .pvA-fold svg{transform:rotate(180deg)}
.pvA-more{display:none;margin:10px 2px 2px;padding-top:12px;border-top:1px solid var(--hairline,rgba(34,26,46,.08))}
.pvA[data-open="1"] .pvA-more{display:block}
.pvA-more .ak-meter{margin:0 0 6px;padding:7px;gap:3px}
.pvA-more .ak-seg{height:12px;border-radius:3.5px}
.pvA-uses{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:8px;margin-top:10px}
.pvA-uses .ak-use{padding:8px 11px;border-radius:12px}
body[data-theme="night"] .pvA{background:linear-gradient(var(--card-hi,#2a2236),var(--card-lo,#241d2f));box-shadow:0 1px 2px rgba(0,0,0,.4),0 8px 20px rgba(0,0,0,.35)}
body[data-theme="night"] .pvA-badge{background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.16),rgba(var(--ak-c),.18) 75%);box-shadow:inset 0 1px 1px rgba(255,255,255,.12),0 2px 6px rgba(0,0,0,.45)}
body[data-theme="night"] .pvA-lv{background:rgba(0,0,0,.25);box-shadow:inset 0 2px 4px rgba(0,0,0,.5),inset 0 -1px 0 rgba(255,255,255,.05)}
body[data-theme="night"] .pvA-lv i{background:rgba(255,255,255,.07)}
body[data-theme="night"] .pvA-lv i.on{background:linear-gradient(180deg,rgba(var(--ak-s),.9),rgba(var(--ak-s),.65))}

.pvB-key{margin-left:auto;align-self:center;display:inline-flex;align-items:center;gap:7px;min-height:38px;padding:0 12px 0 11px;border:0;border-radius:14px;cursor:pointer;
  font:600 13px/1 var(--sans);color:var(--ink-1);background:linear-gradient(var(--mr-keyA,#fff),var(--mr-keyB,#f4f0fa));
  box-shadow:var(--mr-sh-key,0 1px 1px rgba(40,20,70,.12),0 3px 6px rgba(40,20,70,.1));transition:transform .3s cubic-bezier(.34,1.5,.64,1),box-shadow .2s;position:relative}
.pvB-key:hover{transform:translateY(-2px)}
.pvB-key .pvB-lv{display:flex;align-items:flex-end;gap:2px;height:18px}
.pvB-key .pvB-lv i{display:block;width:3.5px;border-radius:2px;background:rgba(34,26,46,.14)}
.pvB-key .pvB-lv i.on{background:rgb(var(--ak-s))}
.pvB-key small{font-weight:600;color:var(--ink-3)}
.pvB-key .pvB-dot{width:9px;height:9px;border-radius:50%;background:rgb(var(--ak-c));box-shadow:0 0 0 3px rgba(var(--ak-c),.18)}
.pvB-pop{position:absolute;right:0;top:calc(100% + 10px);width:440px;z-index:30;padding:16px 16px 14px;border-radius:20px;text-align:left;cursor:default;
  background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#fbf9fe));box-shadow:0 2px 4px rgba(40,20,70,.1),0 18px 40px rgba(40,20,70,.18)}
.pvB-pop h3{margin:0;font:500 18px/1.2 var(--serif,Georgia,serif);color:var(--ink-1)}
.pvB-pop .pvB-read{margin:3px 0 10px;font:600 12.5px/1.3 var(--sans);color:var(--ink-3)}
.pvB-pop .pvB-read b{font:600 17px/1 var(--serif,Georgia,serif);color:var(--ink-1)}
.pvB-pop .ak-meter{margin:0 0 6px;padding:7px;gap:3px}
.pvB-pop .ak-seg{height:14px;border-radius:3.5px}
.pvB-pop .ak-uses{margin-top:10px;gap:6px}
.pvB-pop .ak-use{padding:8px 11px;border-radius:12px}
body[data-theme="night"] .pvB-pop{background:linear-gradient(var(--card-hi,#2a2236),var(--card-lo,#241d2f));box-shadow:0 2px 4px rgba(0,0,0,.45),0 18px 40px rgba(0,0,0,.5)}
body[data-theme="night"] .pvB-key .pvB-lv i{background:rgba(255,255,255,.12)}
`;
const pvRing = '.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:6px!important}';
function build(design) {
  /* runs in the page */
  const D = document, card = D.getElementById('akMeterCard'); if (!card) return 'no card';
  const SV = { cast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/><path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6M15.8 8.2a5.4 5.4 0 0 1 0 7.6M5.3 5.3a9.5 9.5 0 0 0 0 13.4M18.7 5.3a9.5 9.5 0 0 1 0 13.4"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>' };
  const col = (i, n) => { const f = (i + 1) / n; return f <= 0.6 ? '104,176,122' : (f <= 0.85 ? '214,160,62' : '214,96,110'); };
  const lid = window.IngLendMeter && IngLendMeter._state && IngLendMeter._state.id; const c = lid ? IngLendMeter.colorOf(lid) : '139,111,214';
  ['pvA', 'pvB'].forEach((id) => { const x = D.getElementById(id); if (x) x.remove(); }); const ok = D.querySelector('.pvB-key'); if (ok) ok.remove();
  card.style.display = design === 'now' ? '' : 'none';
  const lit = () => card.querySelectorAll('.ak-seg.on').length / 32;
  const reading = () => { const b = D.querySelector('#akRead b'); const t = (D.getElementById('akRead') || {}).textContent || ''; const m = / of ([\d.]+ GB)/.exec(t); return { used: b ? b.textContent : '', tot: m ? m[1] : '' }; };
  const rows = () => [...card.querySelectorAll('.ak-use')];
  const devLine = () => { const r = rows(); if (!r.length) return 'No device has used its models yet'; const first = r[0].querySelector('b').textContent, when = (r[0].querySelector('small').textContent.split(' · ').pop() || '');
    return r.length + ' device' + (r.length === 1 ? '' : 's') + ' · ' + first + ' ' + when; };
  const meterClone = (h) => { const m = card.querySelector('.ak-meter').cloneNode(true); m.removeAttribute('id'); return m; };
  if (design === 'A') {
    const a = D.createElement('div'); a.id = 'pvA'; a.className = 'pvA'; a.setAttribute('data-open', '0'); a.style.setProperty('--ak-c', c);
    a.innerHTML = '<div class="pvA-row"><span class="pvA-badge">' + SV.cast + '</span><div class="pvA-t"><b>Lending now</b><small></small></div><div class="pvA-lv" role="meter" aria-label="Memory in use"></div><div class="pvA-read"></div><button type="button" class="pvA-fold" aria-expanded="false" title="Show each device\'s use">' + SV.chev + '</button></div><div class="pvA-more"></div>';
    const lv = a.querySelector('.pvA-lv'); for (let i = 0; i < 32; i++) { const b = D.createElement('i'); b.style.setProperty('--ak-s', col(i, 32)); lv.appendChild(b); }
    card.parentNode.insertBefore(a, card.nextSibling);
    const paint = () => { const f = lit(); [...lv.children].forEach((b, i) => b.classList.toggle('on', i < Math.round(f * 32))); const r = reading();
      a.querySelector('.pvA-read').innerHTML = '<b>' + r.used + '</b>of ' + r.tot + ' in use'; a.querySelector('.pvA-t small').textContent = devLine();
      const more = a.querySelector('.pvA-more'); if (a.getAttribute('data-open') === '1') { more.innerHTML = ''; more.appendChild(meterClone()); const sc = card.querySelector('.ak-scale').cloneNode(true); more.appendChild(sc);
        const u = D.createElement('div'); u.className = 'pvA-uses'; rows().forEach((r) => u.appendChild(r.cloneNode(true))); if (!rows().length) u.innerHTML = '<div class="small muted">No device has used this computer’s models yet.</div>'; more.appendChild(u); } };
    a.querySelector('.pvA-fold').onclick = () => { const o = a.getAttribute('data-open') === '1'; a.setAttribute('data-open', o ? '0' : '1'); a.querySelector('.pvA-fold').setAttribute('aria-expanded', String(!o)); paint(); };
    paint(); clearInterval(window.__pvT); window.__pvT = setInterval(paint, 400); return 'A';
  }
  if (design === 'B') {
    const host = D.getElementById('page-models'), bar = host && host.querySelector('[id^="rmBar-"]'); if (!bar) return 'no bar';
    const k = D.createElement('button'); k.type = 'button'; k.className = 'pvB-key'; k.style.setProperty('--ak-c', c); k.setAttribute('aria-expanded', 'false');
    k.innerHTML = '<span class="pvB-dot"></span><span class="pvB-lv" aria-hidden="true"></span><span>Lending</span><small></small>';
    const lv = k.querySelector('.pvB-lv'); for (let i = 0; i < 8; i++) { const b = D.createElement('i'); b.style.setProperty('--ak-s', col(i, 8)); b.style.height = (25 + i * 75 / 7) + '%'; lv.appendChild(b); }
    const tabs = bar.querySelector('[role="tablist"]') || bar; tabs.appendChild(k);
    const pop = D.createElement('div'); pop.className = 'pvB-pop'; pop.id = 'pvB'; pop.hidden = true; k.appendChild(pop);
    const paint = () => { const f = lit(); [...lv.children].forEach((b, i) => b.classList.toggle('on', i < Math.round(f * 8))); const r = reading(); k.querySelector('small').textContent = r.used;
      if (!pop.hidden) { pop.innerHTML = '<h3>Lending now</h3><div class="pvB-read"><b>' + r.used + '</b> of ' + r.tot + ' in use on this computer</div>'; pop.appendChild(meterClone()); pop.appendChild(card.querySelector('.ak-scale').cloneNode(true));
        const u = D.createElement('div'); u.className = 'ak-uses'; rows().forEach((x) => u.appendChild(x.cloneNode(true))); pop.appendChild(u); } };
    k.onclick = (e) => { if (pop.contains(e.target)) return; pop.hidden = !pop.hidden; k.setAttribute('aria-expanded', String(!pop.hidden)); paint(); };
    paint(); clearInterval(window.__pvT); window.__pvT = setInterval(paint, 400); return 'B';
  }
  return 'now';
}
(async () => {
  let ia = null; for (let i = 0; i < 240 && !ia; i++) { const m = /\{"page_port".*\}/.exec(out); if (m) ia = JSON.parse(m[0]); else await sleep(250); }
  const b = await pw.chromium.launch(); const errs = [];
  const ca = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  await ca.addInitScript(({ names }) => { const a = {}; for (const n of names) a[n] = (...args) => fetch('http://127.0.0.1:18996/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then((r) => r.json()).then((j) => { if (!j.ok) throw new Error(j.e); return j.v; });
    /* the devices' use is invented for the pictures: two devices with a few requests each */
    const su = a.share_usage; a.share_usage = () => su().then((u) => { const now = Date.now() / 1000; u.devices = [
      { id: 'dreadingtab01', name: 'Reading Tablet', kind: 'tablet', today: 4, all: 23, last: now - 60, model: 'Qwen3 4B Instruct', chars: 0 },
      { id: 'dpocketphone1', name: 'Pocket Phone', kind: 'phone', today: 1, all: 9, last: now - 3 * 3600, model: 'LFM2.5 1.2B Instruct', chars: 0 }]; return u; });
    window.pywebview = { api: a }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); }, { names: ia.names });
  const p = await ca.newPage(); p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  await p.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 });
  await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await api('share_set', [true]);
  await p.evaluate((css) => { const s = document.createElement('style'); s.id = 'pvCss'; s.textContent = css; document.head.appendChild(s); state.theme = 'day'; applyTheme(); go('models'); }, DESIGNS + pvRing);
  await p.waitForFunction(() => { const c = document.getElementById('akMeterCard'); return c && !c.hidden && c.querySelectorAll('.ak-seg.on').length > 0 && c.querySelectorAll('.ak-use').length === 2; }, null, { timeout: 90000 });
  const region = async (sel, key, extra) => {
    await p.mouse.move(2, 2); await sleep(900);
    const r = await p.evaluate(([sel, extra]) => { const host = document.getElementById('page-models'), bar = host.querySelector('[id^="rmBar-"]'), t = document.querySelector(sel);
      const a = bar.getBoundingClientRect(), z = t.getBoundingClientRect(), pop = extra ? document.querySelector(extra) : null, q = pop && !pop.hidden ? pop.getBoundingClientRect() : null;
      const top = Math.min(a.top, z.top) - 18, bottom = Math.max(a.bottom, z.bottom, q ? q.bottom : 0) + 26, left = host.getBoundingClientRect().left - 4, right = host.getBoundingClientRect().right + 4;
      return { x: Math.max(0, left), y: top + window.scrollY, w: right - left, h: bottom - top }; }, [sel, extra || null]);
    await p.screenshot({ path: path.join(OUT, key + '.png'), clip: { x: r.x, y: r.y, width: r.w, height: r.h }, fullPage: true }); console.log(key, 'taken');
  };
  const scrollTo = async () => { await p.evaluate(() => { const bar = document.querySelector('#page-models [id^="rmBar-"]'); window.scrollTo(0, bar.getBoundingClientRect().top + window.scrollY - 140); }); await sleep(500); };
  for (const night of [false, true]) {
    const tag = night ? '-night' : '';
    await p.evaluate((n) => { state.theme = n ? 'night' : 'day'; applyTheme(); }, night); await sleep(700); await scrollTo();
    if (!night) { await p.evaluate((src) => eval('(' + src + ')')('now'), build.toString()); await region('#akMeterCard', '1-today'); }
    await p.evaluate((src) => eval('(' + src + ')')('A'), build.toString()); await sleep(900);
    await region('#pvA', '2-design-a-folded' + tag);
    await p.evaluate(() => document.querySelector('#pvA .pvA-fold').click()); await sleep(900);
    await region('#pvA', '3-design-a-open' + tag);
    await p.evaluate((src) => eval('(' + src + ')')('B'), build.toString()); await sleep(900);
    await region('.pvB-key', '4-design-b-folded' + tag);
    await p.evaluate(() => document.querySelector('.pvB-key').click()); await sleep(900);
    await region('.pvB-key', '5-design-b-open' + tag, '#pvB');
  }
  console.log('page errors:', errs.length, JSON.stringify(errs.slice(0, 5)));
  await b.close(); pr.kill();
})().catch((e) => { console.log('FAILED', e && e.stack || e); pr.kill(); process.exit(1); });
