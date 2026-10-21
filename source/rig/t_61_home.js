// Ingenium 6.1 · Home, redesigned (module r147, part p68), in Chromium:
// the head (the seal, a greeting by the time of day, the next step, the tour and the guide), the large keys into the work,
// what the owner was last doing (conversations, Fabrica's apps with the step each is at, Lector's documents; a press goes
// back to each), the models and the engine in plain words, the plaque of The Offline Project by day and by night, the
// Wallpapers key once that part is there, every key going where it should, the elements other parts speak to kept,
// less motion, a phone, a 3440-pixel display, and no script errors.
//   node rig/t_61_home.js http://127.0.0.1:8207/ingenium.html <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : '')); c ? pass++ : fail++; };

// the lines of the built page that hold this area's module, so an error can be told apart from another part's
function myRanges(html) {
  const lines = html.split('\n'), R = [];
  const s = lines.findIndex(l => l.includes('<style id="r147-css">')); if (s < 0) return R;
  let e = s; while (e < lines.length && !lines[e].includes('__ingParts["p68"]="running"')) e++; R.push([s + 1, e + 1]); return R;
}
function mine(text, R) { const m = [...String(text).matchAll(/ingenium\.html:(\d+):\d+/g)].map(x => +x[1]); return m.some(n => R.some(([a, b]) => n >= a && n <= b)) || /R147|IngHome|hx-|hxList/.test(text); }

async function open(b, opts) {
  const ctx = await b.newContext(Object.assign({ viewport: { width: 1440, height: 900 } }, opts || {}));
  const p = await ctx.newPage(); p.__errs = [];
  p.on('pageerror', e => p.__errs.push((e.message || '') + ' ' + (e.stack || '')));
  p.on('console', m => { if (m.type() === 'error') p.__errs.push('console: ' + m.text() + ' ' + JSON.stringify(m.location())); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
  p.__atReady = await p.evaluate(() => ({ part: (window.__ingParts || {}).p68, hx: !!document.getElementById('hx'), busy: [...document.querySelectorAll('#hx .hx-list')].map(u => u.getAttribute('aria-busy')) }));
  await p.waitForTimeout(800);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(600);
  return { ctx, p };
}
async function home(p, ms = 1400) { await p.evaluate(() => go('home')); await p.waitForTimeout(ms); }
async function theme(p, t) { await p.evaluate((t) => { state.theme = t; applyTheme(); }, t); await p.waitForTimeout(600); }
const active = p => p.evaluate(() => { const s = document.querySelector('.main > section.active, main > section.active'); return { page: s ? s.id : null, mode: document.body.getAttribute('data-chatmode') || '' }; });
async function press(p, sel) { await p.evaluate(() => window.scrollTo(0, 0)); const el = await p.$(sel); if (!el) return false; await el.scrollIntoViewIfNeeded(); await el.click(); await p.waitForTimeout(700); return true; }

async function seed(p) { return p.evaluate(async () => {
  const now = Date.now();
  const c1 = { id: 'c' + (now - 5000).toString(36), title: 'New conversation', messages: [{ role: 'me', text: 'Plan a quiet week of walks by the sea', at: now - 5000 }, { role: 'bot', text: 'Here is a plan.', done: now - 4000 }] };
  const c2 = { id: 'c' + (now - 90000000).toString(36), title: 'Letter to the library', messages: [{ role: 'me', text: 'Write a short letter', at: now - 90000000 }, { role: 'bot', text: 'Dear library…', done: now - 89990000 }] };
  const c3 = { id: 'c' + (now - 1000).toString(36) + 'k', title: 'New session', kind: 'code', messages: [{ role: 'me', text: 'Make the clock hands gold', at: now - 1000 }, { role: 'bot', text: 'Done.', done: now - 900 }] };
  const blank = { id: 'c' + (now - 10).toString(36) + 'z', title: 'New conversation', messages: [] };
  state.chats = (state.chats || []).filter(c => (c.messages || []).length).concat([c2, c1, c3, blank]); saveState();
  const a = await IngRepo.create({ name: 'Sketch Pad' });                                   // started, nothing kept
  const bb = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Tide Clock</title><p>one</p>' }], { name: 'Tide Clock', msg: 'First version' });
  await IngRepo.put(bb.id, 'index.html', '<!doctype html><title>Tide Clock</title><p>two</p>');   // one change to keep
  const c = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Garden</title>' }], { name: 'Garden Log', msg: 'First' }); // kept, to test
  const d = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Ledger</title>' }], { name: 'Ledger', msg: 'First' });
  const dh = await IngRepo.head(d.id); await IngRepo.setNote(d.id, dh, 'test', { ok: true, checks: [{ id: 'reads', state: 'ok' }] }); // tested, to ship
  const e = await IngRepo.fromFiles([{ path: 'index.html', data: '<!doctype html><title>Forge copy</title>' }], { name: 'The Forge', msg: 'First', app: 'forge' });
  const eh = await IngRepo.head(e.id); await IngRepo.setNote(e.id, eh, 'test', { ok: true, checks: [{ id: 'reads', state: 'ok' }] }); await IngRepo.setNote(e.id, eh, 'onePage', { at: now }); // shipped
  // a Lector document for a trio
  const L = IngLector.state(), apps = ['cd', 'forge', 'ingenium'], key = IngLector.setKey(apps, 'portfolio'), ref = IngBig.newId();
  await IngBig.put(ref, '# The set\n\n## Overview\n\nA paragraph.\n');
  L.sets[key] = { apps: apps.slice(), purpose: 'portfolio', docs: { dossier: { ref, made: now - 60000, model: 'test', title: 'test', chk: { figures: 0, unmatched: [], fills: 0 } } }, older: {} };
  saveState();
  return { chats: [c1.id, c2.id, c3.id, blank.id], repos: { a: a.id, b: bb.id, c: c.id, d: d.id, e: e.id }, lkey: key };
  }); }

(async () => {
  const pageText = await (await fetch(URL_)).text(); const R = myRanges(pageText);
  ok(R.length === 1, 'the Home module is in the built page', R);
  const src = fs.readFileSync(path.join(__dirname, '..', 'build', 'modules', 'r147.js'), 'utf8');
  ok(!/\b(claude|gpt|gemini|llama|qwen|mistral|anthropic|openai|deepseek|phi-?\d)\b/i.test(src), 'no model is named anywhere in the module');
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  let { ctx, p } = await open(b);

  // ---------------- the part runs, and the frame is there at once ----------------
  const ms = await p.evaluate(() => window.IngHome && IngHome.buildMs);
  ok(typeof ms === 'number' && ms < 60, 'the new Home is drawn at start in a moment (its lists and crest come after)', ms + ' ms');
  ok(p.__atReady.part === 'running' && p.__atReady.hx, 'the Home part (p68) runs to its end and the new Home is there when Ingenium is ready', p.__atReady);
  const frame = await p.evaluate(() => {
    const ids = ['homeTitle', 'heroNext', 'heroStepNote', 'homeTour', 'homeFocusQuick', 'homeFocusLine', 'deviceReadout'];
    return { ids: ids.filter(i => { const e = document.getElementById(i); return e && e.closest('#hx'); }), oldCards: document.querySelectorAll('#page-home > .card').length,
      keys: [...document.querySelectorAll('#hx .hx-key')].map(k => k.getAttribute('data-go')), apps: [...document.querySelectorAll('#hx .hx-app')].map(k => k.getAttribute('data-app')),
      hello: document.getElementById('hxHello').textContent, title: document.getElementById('homeTitle').textContent, h1: document.getElementById('homeTitle').tagName,
      lists: [...document.querySelectorAll('#hx .hx-list')].map(u => u.id), plaque: !!document.getElementById('hxPlaque'), facts: document.querySelectorAll('#hxFacts .hx-fact').length,
      next: document.getElementById('heroNext').textContent, step: document.getElementById('heroStepNote').textContent };
  });
  ok(frame.ids.length === 7 && frame.oldCards === 0, 'the elements the rest of Ingenium speaks to keep their ids, inside the new Home; the old cards are gone', frame);
  ok(frame.keys.join() === 'chat,code,build,fabrica,lector,focus' && frame.apps.join() === 'tabula,abacus,slides,scriba,fontes,schedae,clepsydra', 'large keys into the work, and a key for each app and instrument', [frame.keys, frame.apps]);
  const h = new Date().getHours(), part = h < 5 ? 'Good evening' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  ok(frame.hello.indexOf(part) === 0 && frame.h1 === 'H1' && frame.title === 'Ingenium', 'the greeting fits the time of day, and the page is still headed by its name', [frame.hello, frame.title]);
  ok(frame.next.length > 3 && frame.step.length > 3, 'the next step is still told and offered', [frame.next, frame.step]);
  ok(frame.lists.length === 3 && frame.plaque && frame.facts === 3, 'three lists of where the owner left off, the plaque, and three plain facts about the models and the engine', frame);

  // ---------------- the work, real: conversations, a coding session, Fabrica's apps at each step, a Lector document ----------------
  const made = await seed(p);
  await home(p, 2000);
  const lists = await p.evaluate(() => {
    const rows = id => [...document.querySelectorAll('#hxList_' + id + ' .hx-item')].map(b => ({ t: b.querySelector('b').textContent, s: [...b.querySelectorAll('small')].map(x => x.textContent).join(' | '), c: (b.querySelector('.hx-chip') || {}).textContent || '', tone: (b.querySelector('.hx-chip') || { className: '' }).className, label: b.getAttribute('aria-label') }));
    return { chats: rows('chats'), fabrica: rows('fabrica'), lector: rows('lector'), busy: [...document.querySelectorAll('#hx .hx-list')].map(u => u.getAttribute('aria-busy')),
      meta: ['chat', 'code', 'fabrica', 'lector'].map(k => document.getElementById('hxKm_' + k).textContent) };
  });
  ok(lists.busy.every(x => x === 'false'), 'the lists fill in once Home shows, and say so to a screen reader', lists.busy);
  ok(lists.chats.length === 3 && lists.chats[0].t.indexOf('Make the clock hands gold') === 0 && lists.chats[0].c === 'Code' && /Plan a quiet week/.test(lists.chats[1].t) && /Letter to the library/.test(lists.chats[2].t),
    'recent conversations, newest first, the coding session marked Code; an empty conversation is left out', lists.chats.map(x => x.t + ' | ' + x.s + ' | ' + x.c));
  ok(/^Today, \d\d:\d\d · 2 messages$/.test(lists.chats[1].s) && /^Yesterday, /.test(lists.chats[2].s), 'each says when, in plain words, and how long it is', lists.chats.map(x => x.s));
  const fb = {}; lists.fabrica.forEach(x => { fb[x.t] = x; });
  ok(lists.fabrica.length === 5, 'the five Fabrica apps are listed', lists.fabrica.map(x => x.t));
  ok(fb['Sketch Pad'] && fb['Sketch Pad'].c === 'Started · nothing kept yet' && fb['Tide Clock'] && fb['Tide Clock'].c === '1 change to keep' && fb['Garden Log'] && fb['Garden Log'].c === 'Kept · to test'
    && fb['Ledger'] && fb['Ledger'].c === 'Tested · ready to ship' && /ok/.test(fb['Ledger'].tone) && fb['The Forge'] && fb['The Forge'].c === 'Shipped',
    'each Fabrica app shows the step it is at, in Fabrica\'s own words', lists.fabrica.map(x => x.t + ': ' + x.c));
  ok(lists.lector.length === 1 && lists.lector[0].t === 'Project dossier' && /^Carpe Diem, The Forge and Ingenium \| Today, \d\d:\d\d · for your portfolio$/.test(lists.lector[0].s), 'the Lector document is listed with its set and when it was written', lists.lector);
  ok(/^2 conversations · last today/.test(lists.meta[0]) && /^1 session · last today/.test(lists.meta[1]) && /^5 apps · 2 ready · 3 in progress$/.test(lists.meta[2]) && /^1 document · last today/.test(lists.meta[3]), 'the large keys say, in a line, what each holds', lists.meta);
  const sealsIn = await p.evaluate(() => ({ forge: !!document.querySelector('#hxList_fabrica .hx-item .ing-crest-img'), lector: !!document.querySelector('#hxList_lector .hx-item .ing-crest-img') }));
  ok(sealsIn.lector && sealsIn.forge, 'the Lector document wears its set\'s crest, and an app of The Offline Project its own seal', sealsIn);
  await p.screenshot({ path: path.join(OUT, 'h61-wide-day-lists.png'), fullPage: true });

  // ---------------- a press goes back ----------------
  async function row(listId, text) { return p.evaluate(({ listId, text }) => { const b = [...document.querySelectorAll('#hxList_' + listId + ' .hx-item')].find(x => x.querySelector('b').textContent.indexOf(text) === 0); if (!b) return false; b.scrollIntoView({ block: 'center' }); b.click(); return true; }, { listId, text }); }
  await row('chats', 'Plan a quiet week'); await p.waitForTimeout(900);
  let a = await active(p); let st = await p.evaluate(() => ({ chat: state.activeChat, name: (document.getElementById('chatConvName') || {}).textContent }));
  ok(a.page === 'page-chat' && a.mode === 'chat' && st.chat === made.chats[0], 'a conversation pressed opens in Chat', [a, st]);
  await home(p); await row('chats', 'Make the clock hands gold'); await p.waitForTimeout(900);
  a = await active(p); st = await p.evaluate(() => ({ chat: state.activeChat, code: (state.cc || {}).activeCode }));
  ok(a.page === 'page-chat' && a.mode === 'code' && st.chat === made.chats[2] && st.code === made.chats[2], 'a coding session pressed opens in Code', [a, st]);
  await home(p); await row('fabrica', 'Garden Log'); await p.waitForTimeout(1600);
  a = await active(p); st = await p.evaluate(() => ({ sel: (state.fabrica || {}).sel, name: (document.getElementById('fbWhName') || {}).textContent }));
  ok(a.page === 'page-fabrica' && st.sel === made.repos.c && /Garden Log/.test(st.name || ''), 'a Fabrica app pressed opens in Fabrica, chosen', [a, st]);
  await home(p); await row('lector', 'Project dossier'); await p.waitForTimeout(1400);
  a = await active(p); st = await p.evaluate(() => ({ doc: IngLector.R7.doc, apps: IngLector.state().brief.apps.join(), purpose: IngLector.state().brief.purpose, paper: !!document.querySelector('#l7Desk .l-paper') }));
  ok(a.page === 'page-lector' && st.doc === 'dossier' && st.apps === 'cd,forge,ingenium' && st.purpose === 'portfolio' && st.paper, 'a Lector document pressed opens in Lector, on that document', [a, st]);

  // Lector in the middle of a reading: the document waits, and nothing of the reading is touched
  await home(p);
  await p.evaluate(() => { const L = IngLector.state(); L.job = { key: 'cd+inkwell|portfolio', apps: ['cd', 'inkwell'], purpose: 'portfolio', kinds: ['dossier'], status: 'reading', at: Date.now(), made: {} }; L.brief.apps = ['cd', 'inkwell']; });
  await row('lector', 'Project dossier'); await p.waitForTimeout(900);
  st = await p.evaluate(() => ({ job: IngLector.state().job && IngLector.state().job.key, status: IngLector.state().job && IngLector.state().job.status, brief: IngLector.state().brief.apps.join(), toast: (document.getElementById('ingToast') || {}).textContent || '' }));
  a = await active(p);
  ok(a.page === 'page-lector' && st.job === 'cd+inkwell|portfolio' && st.status === 'reading' && st.brief === 'cd,inkwell' && /reading paused/.test(st.toast), 'with a reading paused in Lector, the document waits, the reading is left as it was, and Home says why', [a, st]);
  // a finished reading of another set is set aside, as Start a new set does, and the document opens
  await p.evaluate(() => { IngLector.state().job.status = 'done'; });
  await home(p); await row('lector', 'Project dossier'); await p.waitForTimeout(1200);
  st = await p.evaluate(() => ({ job: IngLector.state().job, doc: IngLector.R7.doc, apps: IngLector.state().brief.apps.join() }));
  ok(st.job === null && st.doc === 'dossier' && st.apps === 'cd,forge,ingenium', 'with the last reading finished, the document opens', st);
  // Fabrica's store failing: said in plain words, and the rest of Home carries on
  await p.evaluate(() => { window.__list = IngRepo.list; IngRepo.list = () => Promise.reject(new Error('the store is busy')); });
  await home(p, 1200);
  st = await p.evaluate(() => ({ fb: document.getElementById('hxList_fabrica').innerText, chats: document.querySelectorAll('#hxList_chats .hx-item').length }));
  ok(/could not be read just now: the store is busy/.test(st.fb) && st.chats === 3, 'when Fabrica cannot be read, Home says so plainly and the other lists still fill', st);
  await p.evaluate(() => { IngRepo.list = window.__list; });

  // ---------------- every key goes where it should ----------------
  const want = { chat: ['page-chat', 'chat'], code: ['page-chat', 'code'], build: ['page-build', ''], fabrica: ['page-fabrica', ''], lector: ['page-lector', ''], focus: ['page-focus', ''] };
  for (const k of Object.keys(want)) {
    await home(p, 500); await press(p, '#hx .hx-key[data-go="' + k + '"]'); a = await active(p);
    ok(a.page === want[k][0] && a.mode === want[k][1], 'the ' + k + ' key opens ' + k, a);
  }
  // Carpe Diem's apps open on the Desk; the instruments open over the page
  for (const k of ['tabula', 'abacus', 'slides', 'scriba', 'fontes']) {
    await home(p, 500); await press(p, '#hx .hx-app[data-app="' + k + '"]'); await p.waitForTimeout(400);
    const d = await p.evaluate(() => IngDesk.state());
    ok(d.shown && d.active && d.active.split('-')[0] === k, 'the ' + k + ' key opens it on the Desk', d);
  }
  await p.evaluate(() => { IngDesk.state().open.slice().forEach(id => { try { IngDesk.close(id); } catch (e) {} }); });
  for (const k of ['schedae', 'clepsydra']) {
    await home(p, 500);
    const fn = k === 'schedae' ? 'openSchedae' : 'openClepsydra';
    await p.evaluate((fn) => { window.__calls = 0; const o = window[fn]; window[fn] = function () { window.__calls++; return o.apply(this, arguments); }; window['__o' + fn] = o; }, fn);
    await press(p, '#hx .hx-app[data-app="' + k + '"]');
    const n = await p.evaluate((fn) => { const n = window.__calls; window[fn] = window['__o' + fn]; try { closeModal(); } catch (e) {} document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); return n; }, fn);
    ok(n === 1, 'the ' + k + ' key opens it, as before', n);
  }
  await home(p, 500); await press(p, '#heroNext'); a = await active(p);
  ok(a.page === 'page-models', 'the next step key goes to its step (here, the Models page)', a);
  await home(p, 500); await press(p, '#homeTour'); await p.waitForTimeout(500);
  const tour = await p.evaluate(() => { const t = document.getElementById('ingTour'); const on = !!(t && t.getBoundingClientRect().width > 0); try { tourEnd(); } catch (e) {} return on; });
  ok(tour, 'the guided tour still starts from Home', tour);
  await home(p, 500); await press(p, '#hx .hx-row .hx-btn:not(#homeTour):not(#hxWall)'); a = await active(p);
  ok(a.page === 'page-guide', 'the short guide key opens the Guide', a);
  await home(p, 500); await press(p, '#hxModelsKey'); a = await active(p);
  ok(a.page === 'page-models', 'the models key opens the Models page', a);
  for (const [i, pg] of [[0, 'page-chat'], [1, 'page-fabrica'], [2, 'page-lector']]) {
    await home(p, 500); await p.evaluate((i) => document.querySelectorAll('#hx .hx-rch .hx-btn')[i].click(), i); await p.waitForTimeout(600); a = await active(p);
    ok(a.page === pg, 'See all opens ' + pg.slice(5), a);
  }
  // the Wallpapers key: hidden while there is no wallpapers part, there once there is, and it opens it
  await home(p, 500);
  const w0 = await p.evaluate(() => ({ has: !!window.IngWallpapers, hidden: document.getElementById('hxWall').hidden }));
  ok(w0.has || w0.hidden, 'with no wallpapers part the Wallpapers key is hidden', w0);
  await p.evaluate(() => { window.__wallOrig = window.IngWallpapers; window.__wall = 0; window.IngWallpapers = Object.assign({}, window.IngWallpapers || {}, { open: function () { window.__wall++; } }); });
  await home(p, 500);
  const w1 = await p.evaluate(() => { const k = document.getElementById('hxWall'); const shown = !k.hidden && !!k.offsetParent; k.click(); return { shown, calls: window.__wall, label: k.getAttribute('aria-label') }; });
  ok(w1.shown && w1.calls === 1 && /Wallpapers/.test(w1.label), 'once the wallpapers part is there, the Wallpapers key shows and opens it', w1);
  await p.evaluate(() => { if (window.__wallOrig) window.IngWallpapers = window.__wallOrig; else delete window.IngWallpapers; });

  // ---------------- what others write into Home still lands ----------------
  await home(p, 900);
  const kept = await p.evaluate(() => { renderDevice(); supHomeLine(); renderNextStep();
    return { dev: document.querySelectorAll('#deviceReadout .kv').length, focus: document.getElementById('homeFocusLine').textContent, next: document.getElementById('heroNext').textContent }; });
  ok(kept.dev >= 6 && kept.focus.length > 10 && kept.next.length > 3, 'the device readout, the Focus step and the next step are still written in', kept);
  await p.evaluate(() => { const d = document.getElementById('hxDev'); d.open = true; d.dispatchEvent(new Event('toggle')); });
  await p.waitForTimeout(300);
  const dev = await p.evaluate(() => ({ open: document.getElementById('hxDev').open, kept: !!(state.v61 && state.v61.home && state.v61.home.hxDev), rows: document.querySelectorAll('#deviceReadout .kv').length }));
  ok(dev.open && dev.kept && dev.rows >= 6, 'This device opens to its numbers, and Home remembers it open (state.v61.home)', dev);
  const facts = await p.evaluate(() => [...document.querySelectorAll('#hxFacts .hx-fact')].map(f => f.querySelector('dt').textContent + ': ' + f.querySelector('dd b').textContent));
  ok(facts[0] === 'Your model: None yet' && /^The engine: /.test(facts[1]) && facts[2] === 'Connection: None', 'the models and the engine are told in plain words', facts);
  // a model kept, and loaded: the words follow
  await p.evaluate(() => { state.models.push({ id: 'mtest', customName: 'Little Helper', sizeBytes: 1e9, fileState: 'ready', color: '#6a3fb5' }); state.activeModelId = 'mtest'; saveState(); });
  await home(p, 900);
  const facts2 = await p.evaluate(() => document.querySelector('#hxFacts .hx-fact dd').textContent);
  ok(/^Little Helper/.test(facts2) && /not loaded yet/.test(facts2) && /1 model kept/.test(facts2), 'a model kept is named, and whether it is loaded is said', facts2);
  await p.evaluate(() => { state.models = state.models.filter(m => m.id !== 'mtest'); state.activeModelId = null; saveState(); });

  // ---------------- words ----------------
  const words = await p.evaluate(() => document.getElementById('hx').innerText);
  ok(!/\s[-–—]\s|—|–/.test(words), 'no dash used as punctuation anywhere on Home', (words.match(/.{0,30}(\s[-–—]\s|—|–).{0,30}/) || [''])[0]);
  const names = await p.evaluate(() => [...document.querySelectorAll('#hx button, #hx summary')].filter(b => b.offsetParent).filter(b => !((b.getAttribute('aria-label') || b.textContent || '').trim())).length);
  ok(names === 0, 'every key on Home has a name a screen reader says', names);

  // ---------------- the plaque, by day and by night ----------------
  await home(p, 500);
  await p.evaluate(() => document.getElementById('hxPlaque').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1500);
  const pd = await p.evaluate(() => { const c = document.querySelector('#hxCrest .ing-crest'), r = c && c.getBoundingClientRect(), pl = document.getElementById('hxPlaque').getBoundingClientRect(), ln = document.getElementById('hxLine');
    return { kind: c && c.className, night: c && c.classList.contains('night'), auto: c && c.getAttribute('data-ic-auto'), w: r && Math.round(r.width), centre: r && Math.round((r.left + r.width / 2) - (pl.left + pl.width / 2)), line: ln.textContent, below: r && ln.getBoundingClientRect().top > r.bottom, layers: c ? c.querySelectorAll('img').length : 0, font: getComputedStyle(ln).fontStyle, label: c && c.getAttribute('aria-label') }; });
  ok(pd.kind && /ic-master/.test(pd.kind) && /is-live/.test(pd.kind) && pd.auto === 'cd+forge+ingenium+inkwell' && !pd.night && pd.layers > 0, 'the plaque holds the master crest, live, by day', pd);
  ok(Math.abs(pd.centre) <= 2 && pd.line === 'Carpe Diem · The Forge · Ingenium · Inkwell' && pd.below && pd.font === 'italic', 'the crest is centred with the line beneath it, in italic', pd);
  ok(/The Offline Project/.test(pd.label || ''), 'the crest is named for a screen reader', pd.label);
  const plq = await p.$('#hxPlaque'); await plq.screenshot({ path: path.join(OUT, 'h61-plaque-day.png') });
  await theme(p, 'night'); await p.waitForTimeout(700);
  const pn = await p.evaluate(() => { const c = document.querySelector('#hxCrest .ing-crest'); return { night: c.classList.contains('night'), bg: getComputedStyle(document.getElementById('hxPlaque')).backgroundImage.slice(0, 80), color: getComputedStyle(document.getElementById('hxLine')).color }; });
  ok(pn.night && /rgb\(26, 36, 54\)|#1a2436/.test(pn.bg), 'by night the crest turns to its night picture and the plaque to the night sky', pn);
  await plq.screenshot({ path: path.join(OUT, 'h61-plaque-night.png') });
  await theme(p, 'day');

  // ---------------- three sizes, both looks ----------------
  for (const e of p.__errs) if (mine(e, R)) ok(false, 'a script error from Home', e.slice(0, 300));
  await ctx.close();
  const sizes = [['wide', { width: 1440, height: 900 }], ['big', { width: 3440, height: 1440 }], ['phone', { width: 390, height: 844 }]];
  for (const [nm, vp] of sizes) {
    ({ ctx, p } = await open(b, Object.assign({ viewport: vp }, nm === 'phone' ? { deviceScaleFactor: 2, isMobile: true, hasTouch: true } : {})));
    await seed(p); await home(p, 3500);
    const m = await p.evaluate(() => { const r = n => document.querySelector(n).getBoundingClientRect(); const keys = [...document.querySelectorAll('#hx .hx-key')].map(k => Math.round(k.getBoundingClientRect().top));
      return { over: document.scrollingElement.scrollWidth - innerWidth, rows: new Set(keys).size, main: Math.round(r('.hx-main').width), side: Math.round(r('.hx-side').width), sideLeft: Math.round(r('.hx-side').left), mainRight: Math.round(r('.hx-main').right), hx: Math.round(r('#hx').width) }; });
    if (nm === 'wide') ok(m.over <= 1 && m.rows === 2, 'at 1440 the work keys stand in two rows of three, with no sideways scroll', m);
    if (nm === 'big') ok(m.over <= 1 && m.rows === 1 && m.sideLeft > m.mainRight && m.main + m.side > m.hx * 0.9, 'at 3440 the whole width is used: the keys in one row, the plaque and the models beside the work', m);
    if (nm === 'phone') ok(m.over <= 1 && m.rows === 3, 'on a phone everything fits the width, the keys two by two', m);
    for (const t of ['day', 'night']) { await theme(p, t); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400); await p.screenshot({ path: path.join(OUT, 'h61-' + nm + '-' + t + '.png'), fullPage: true }); }
    for (const e of p.__errs) if (mine(e, R)) ok(false, 'a script error from Home (' + nm + ')', e.slice(0, 300));
    await ctx.close();
  }

  // ---------------- less motion ----------------
  ({ ctx, p } = await open(b, { reducedMotion: 'reduce' }));
  await home(p, 1200);
  const rm = await p.evaluate(() => ({ key: getComputedStyle(document.querySelector('#hx .hx-key')).animationName, tr: getComputedStyle(document.querySelector('#hx .hx-key')).transitionDuration }));
  ok(rm.key === 'none' && /^0\.00001s|^1e-05s|^0s/.test(rm.tr.split(',')[0]), 'with less motion asked for, the keys neither rise nor spring', rm);
  // keyboard: the first key is reached and shows where it is
  await p.evaluate(() => document.querySelector('#hx .hx-key').focus());
  const fv = await p.evaluate(() => { const k = document.activeElement; return { on: k.classList.contains('hx-key'), outline: getComputedStyle(k).outlineStyle }; });
  await p.keyboard.press('Tab'); const nx = await p.evaluate(() => document.activeElement.getAttribute('data-go'));
  ok(fv.on && nx === 'code', 'the keys are reached in order by the keyboard', [fv, nx]);
  for (const e of p.__errs) if (mine(e, R)) ok(false, 'a script error from Home (less motion)', e.slice(0, 300));
  await ctx.close();

  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FAIL', e); process.exit(1); });
