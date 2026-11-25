// Ingenium 7.83: Troubleshoot in the full edition (modules/r381.js, r329.js, r173.js; build/editions.py). Her words (24 November 2026):
// "I want the Full edition of Ingenium to have the Author Studio with limited access or functions that will only be reserved for the
// owner's master edition. I want the Full edition app to at least have the Troubleshoot page from the Author Studio"; and before
// (17 November 2026) her authorship "limited to my master edition only".
//   node rig/t_783_full_trouble.js full=<full edition url> master=<master url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const args = process.argv.slice(2), arg = k => (args.find(a => a.startsWith(k + '=')) || '').slice(k.length + 1);
const FULL = arg('full'), MASTER = arg('master'), OUT = args.find(a => !/=/.test(a)) || '/tmp';
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function open(b, url) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); try { await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(url).origin }); } catch (e) {}
  const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message.slice(0, 200))); p.setDefaultTimeout(90000);
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await sleep(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await sleep(1000);
  // 7.51: the editions other than the master show their terms first (r326); agree, as rig/t_626_guide.js does
  await p.evaluate(() => { const tick = [...document.querySelectorAll('.tg-veil input[type=checkbox], #tgTick')].find((c) => !c.checked);
    if (tick) tick.click(); const g = [...document.querySelectorAll('button')].find((b) => /^I agree$/.test(b.textContent.trim()) && b.offsetParent); if (g) g.click(); });
  await sleep(800); return p;
}
(async () => {
  const b = await pw.chromium.launch();
  // the full edition: a Troubleshoot room in Settings
  const p = await open(b, FULL);
  const ed = await p.evaluate(() => ({ ed: ING_EDITION, ws: !!window.IngWorkshop, au: !!window.IngAuthor, ch: !!window.IngChecks, tr: !!window.IngTrouble }));
  ok(ed.ed === 'full' && ed.ch && ed.tr && !ed.ws && !ed.au, 'the full edition carries Troubleshoot and its check, and neither the workshop nor the Author Studio', ed);
  await p.evaluate(() => go('settings')); await sleep(800);
  const tab = await p.evaluate(() => { const t = document.getElementById('rmT-settings-trouble'); return t ? { shown: !!t.offsetParent, text: t.textContent.trim() } : null; });
  ok(tab && tab.shown && /Troubleshoot/.test(tab.text), "Settings has a Troubleshoot room", tab);
  await p.evaluate(() => document.getElementById('rmT-settings-trouble').click()); await sleep(900);
  const room = await p.evaluate(() => { const h = document.getElementById('tsHostFull'), r = h && h.querySelector('#tsRoom'); return r ? { shown: !!h.offsetParent, keys: [...r.querySelectorAll('button')].map(x => x.textContent.trim()).filter(Boolean), fold: !!r.querySelector('.ts-fold'), ph: (r.querySelector('#tsProb') || {}).placeholder || '', acc: getComputedStyle(h).getPropertyValue('--ts-acc').trim() } : null; });
  ok(room && room.shown && room.keys.indexOf('Check everything') >= 0 && room.keys.indexOf('Copy the report') >= 0 && room.keys.indexOf('Copy it, with what you tick') >= 0 && room.acc, 'the room is the one she approved: Check everything, Copy the report, and her own words to copy, in its own colours', room);
  ok(room && !room.keys.some(k => /^(Ask a model|Hand to a model)/.test(k)) && !room.fold && !/HP laptop/.test(room.ph), "no key hands Ingenium's own page to a model, no note on fixing with one, and no device of the owner's named", room);
  await p.screenshot({ path: OUT + '/full_trouble.png' });
  // Check everything
  await p.evaluate(() => document.getElementById('tsRun').click()); await p.waitForFunction(() => { const r = document.getElementById('tsRun'); return r && !r.disabled && /Check everything/.test(r.textContent); }, null, { timeout: 90000 }); await sleep(800);
  const ck = await p.evaluate(() => ({ lines: IngTrouble.lines().map(l => l.g + ':' + l.st + ':' + l.n).slice(0, 30), active: (document.querySelector('.section.active') || {}).id, room: (document.getElementById('rmT-settings-trouble') || {}).getAttribute && document.getElementById('rmT-settings-trouble').getAttribute('aria-selected') }));
  ok(ck.lines.length >= 6 && ck.lines.some(l => /The large store/.test(l)) && ck.lines.some(l => /Pages/.test(l)) && !ck.lines.some(l => /layers/i.test(l)) && ck.active === 'page-settings', 'Check everything runs the check (pages, both stores, the engine, the errors) and comes back to Troubleshoot', ck);
  await p.screenshot({ path: OUT + '/full_checked.png' });
  // what went wrong
  await p.evaluate(() => setTimeout(() => { throw new Error('A test error from t_783'); }, 0)); await sleep(2600);
  const er = await p.evaluate(() => { const e = document.querySelector('#tsHostFull .ts-errs'); return e ? { text: e.textContent, keys: [...e.querySelectorAll('button')].map(x => x.textContent.trim()) } : null; });
  ok(er && /A test error from t_783/.test(er.text) && er.keys.indexOf('Copy') >= 0 && !er.keys.some(k => /^(Ask a model|Hand to a model)/.test(k)), 'what went wrong lists the error, with Copy and no model key', er && { keys: er.keys.slice(0, 4) });
  // Copy the report; her own words, copied with what she ticks
  await p.evaluate(() => [...document.querySelectorAll('#tsHostFull button')].find(x => x.textContent.trim() === 'Copy the report').click()); await sleep(500);
  const rep = await p.evaluate(() => navigator.clipboard.readText().catch(e => 'ERR ' + e.message));
  ok(/Ingenium's own check/.test(rep) && /The large store/.test(rep), 'Copy the report copies the check', rep.slice(0, 160));
  await p.fill('#tsProb', 'The chat stopped answering after a long reply.');
  await p.evaluate(() => [...document.querySelectorAll('#tsHostFull button')].find(x => x.textContent.trim() === 'Copy it, with what you tick').click()); await sleep(700);
  const mine = await p.evaluate(() => navigator.clipboard.readText().catch(e => 'ERR ' + e.message));
  ok(/What happened, in my own words: The chat stopped answering/.test(mine) && /Ingenium's own check/.test(mine) && /A test error from t_783/.test(mine), 'her own words are copied with the report and the last errors, ready to send', mine.slice(0, 200));
  const words = await p.evaluate(() => document.body.innerText);
  ok(!/Author Studio|Workshop|Mac mini|HP laptop/.test(words), 'nothing in view names the Author Studio, the Workshop or a device of the owner\'s', (words.match(/.{0,40}(Author Studio|Workshop|Mac mini|HP laptop).{0,40}/) || [''])[0]);
  ok(p.__errs.filter(e => !/A test error from t_783/.test(e)).length === 0, 'no page errors in the full edition', p.__errs.slice(0, 4));
  // the master: Troubleshoot stays the Author Studio's room, with its model keys; no Troubleshoot room in Settings
  if (MASTER) {
    const m = await open(b, MASTER);
    await m.evaluate(() => go('settings')); await sleep(800);
    const mt = await m.evaluate(() => { const t = document.getElementById('rmT-settings-trouble'); return { tab: !!(t && t.offsetParent), host: !!document.getElementById('tsHostFull'), checks: !!window.IngChecks }; });
    ok(!mt.tab && !mt.host && !mt.checks, 'the master has no Troubleshoot room in Settings: its Troubleshoot is in the Author Studio', mt);
    await m.evaluate(() => IngAuthor.open('trouble')); await sleep(900);
    const mk = await m.evaluate(() => [...document.querySelectorAll('#tsRoom button')].map(x => x.textContent.trim()).filter(Boolean));
    ok(mk.indexOf('Hand to a model in Code') >= 0 && mk.indexOf('Copy it, with what you tick') < 0, "the master's Troubleshoot keeps Hand to a model in Code", mk.slice(0, 12));
    ok(m.__errs.length === 0, 'no page errors in the master', m.__errs.slice(0, 4));
  }
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL (crash) ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
