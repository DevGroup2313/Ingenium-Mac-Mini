// node rig/t_700b_lock_shell.js <Ingenium page url> <out dir>
// Ingenium 6.9.x (31 October 2026): the sign-in and the seal (modules/r197.js) with a stand-in of the computer apps' bridge
// (window.pywebview.api, put in place before the page runs, as pywebview does). It keeps the desk and the long texts as the
// real app does (desk.json, big/<id>.txt) and records what it was given. Checks:
//   - with the lock off, the bridge receives the desk and the long texts as plain text (as before);
//   - protection turned on: from then on save_state receives only sealed envelopes with the clear header, big_put only
//     envelopes, and the copies already on the stand-in disk are sealed in place by the migration;
//   - big_get gives the page the plain text back (opened on its way in), a long text kept on the disk alone is read whole;
//   - a reload: the sealed desk on the "disk" is adopted by the base's deskAdopt as a sealed one (nothing read as a desk), the
//     sign-in opens it, and Lock now writes the desk to the bridge before the page starts again;
//   - no script errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const NAME = 'Yannie', PW1 = 'the-abbey-of-cluny-1088', MSG = 'Folio 12 names Abbot Hugh as its author.', BIG = 'DISK-ONLY-LONG-TEXT the register of the abbey, copied whole. '.repeat(900);
// the stand-in bridge: a disk kept in sessionStorage so it survives the page's reloads within the test (never the real app's way; only for this check)
const SHELL = `(function(){var D={};try{D=JSON.parse(sessionStorage.getItem("__t700disk")||"{}");}catch(e){}
  function keep(){try{sessionStorage.setItem("__t700disk",JSON.stringify(D));}catch(e){}}
  var log=[];window.__shellLog=log;
  window.pywebview={api:{
    load_state:function(){log.push(["load_state"]);return Promise.resolve(D.desk||null);},
    save_state:function(raw){log.push(["save_state",String(raw).slice(0,40),String(raw).length]);D.desk=String(raw);keep();return Promise.resolve({ok:true});},
    big_put:function(id,text){log.push(["big_put",id,String(text).slice(0,24),String(text).length]);D["big:"+id]=String(text);keep();return Promise.resolve({ok:true});},
    big_get:function(id){log.push(["big_get",id]);var t=D["big:"+id];return Promise.resolve(t==null?{ok:false}:{ok:true,text:t});},
    big_del:function(id){delete D["big:"+id];keep();return Promise.resolve({ok:true});},
    big_gc:function(){return Promise.resolve({ok:true});},
    desk_keep_text:function(){return Promise.resolve({ok:true});},
    device_info:function(){return Promise.resolve({});}}};
  window.__t700disk=function(){return D;};
  setTimeout(function(){try{window.dispatchEvent(new Event("pywebviewready"));}catch(e){}},0);})();`;
const waitBoot = (p) => p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
const doorUp = (p) => p.evaluate(() => { const d = document.querySelector('#ingLockDoor'); return !!(d && !d.hidden && d.querySelector('#ildPw')); });
const settle = async (p) => { for (let i = 0; i < 80; i++) { const n = await p.evaluate(() => (window.IngLock && window.IngLock._test.pending()) || 0); if (!n) break; await p.waitForTimeout(100); } await p.waitForTimeout(900); };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); await ctx.addInitScript(SHELL); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await waitBoot(p); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  // 1. with the lock off: plain text to the bridge, as before
  await p.evaluate(async (t) => { const id = IngBig.newId(); window.__t700big = id; state.t700ref = id; await IngBig.put(id, t); const c = curChat(); c.messages.push({ role: 'me', text: 'first words' }); saveState(); }, BIG);
  await p.waitForTimeout(1200);
  const d0 = await p.evaluate(() => { const D = window.__t700disk(); return { desk: (D.desk || '').slice(0, 2), big: Object.keys(D).filter(k => k.indexOf('big:') === 0).map(k => D[k].slice(0, 19)), checked: window.DESK_CHECKED }; });
  ok(d0.desk === '{"' && d0.big.length === 1 && d0.big[0] === 'DISK-ONLY-LONG-TEXT' && d0.checked === true, 'with the lock off the bridge keeps the desk and the long text as plain text, as before', d0);
  // a text the disk alone holds (as on a computer whose page store forgot it)
  await p.evaluate((t) => { const id = IngBig.newId(); window.__t700only = id; state.t700only = id; window.__t700disk()['big:' + id] = t + ' ONLY'; saveState(); }, BIG);
  // 2. protection on, from Settings
  await p.evaluate(() => { go('settings'); if (window.IngRooms) IngRooms.open('settings', 'data'); }); await p.waitForSelector('#ingLockCard', { timeout: 10000 });
  await p.evaluate(() => [...document.querySelectorAll('#ingLockCard button')].find(b => /Protect this copy/.test(b.textContent)).click());
  await p.waitForSelector('#ingLockDoor #ildUser', { timeout: 5000 });
  await p.fill('#ildUser', NAME); await p.fill('#ildP1', PW1); await p.fill('#ildP2', PW1); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForSelector('#ingLockDoor .ild-words', { timeout: 10000 });
  const words = await p.evaluate(() => [...document.querySelectorAll('#ingLockDoor .ild-words div')].map(d => d.textContent.replace(/^\d+/, '').trim()));
  await p.click('#ingLockDoor #ildWrote'); await p.waitForSelector('#ingLockDoor #ildW1', { timeout: 10000 });
  const asked = await p.evaluate(() => { const m = /word (\d+) and word (\d+)/.exec(document.querySelector('#ingLockDoor p').textContent); return [+m[1], +m[2]]; });
  await p.fill('#ildW1', words[asked[0] - 1]); await p.fill('#ildW2', words[asked[1] - 1]); await p.click('#ingLockDoor form button[type=submit]');
  await p.waitForFunction(() => /^Protected$/.test((document.querySelector('#ingLockDoor h2') || {}).textContent || ''), null, { timeout: 60000 });
  await p.click('#ingLockDoor #ildDone'); await p.waitForTimeout(600);
  await p.evaluate(() => { window.__shellLog.length = 0; });
  await p.evaluate((t) => { curChat().messages.push({ role: 'me', text: t }); saveState(); }, MSG);
  await settle(p);
  const d1 = await p.evaluate(() => { const D = window.__t700disk(), L = window.__shellLog; return { desk: (D.desk || '').slice(0, 15), hasMsg: (D.desk || '').includes('Folio 12'), bigs: Object.keys(D).filter(k => k.indexOf('big:') === 0).map(k => D[k].slice(0, 5)), mine: [D['big:' + window.__t700big], D['big:' + window.__t700only]].map(v => (v || '').slice(0, 5)), plainLeft: Object.keys(D).some(k => k.indexOf('big:') === 0 && D[k].includes('LONG-TEXT')), saves: L.filter(x => x[0] === 'save_state').map(x => x[1].slice(0, 15)), puts: L.filter(x => x[0] === 'big_put').map(x => x[2].slice(0, 5)) }; });
  ok(d1.desk === '{"ing":"locked"' && !d1.hasMsg && d1.saves.length >= 1 && d1.saves.every(s => s === '{"ing":"locked"'), 'with the lock on, save_state receives only the sealed desk with its clear header', d1);
  ok(d1.bigs.length >= 2 && d1.bigs.every(s => s === 'ING1g' || s === 'ING1.') && d1.mine.every(s => s === 'ING1g' || s === 'ING1.') && !d1.plainLeft, 'every long text on the stand-in disk is sealed: the one the store had and the one the disk alone held were sealed in place, and what other parts mirror through the bridge arrives sealed', { n: d1.bigs.length, mine: d1.mine });
  const read = await p.evaluate(async () => { const a = await IngBig.load(window.__t700only); const r = await window.pywebview.api.big_get(window.__t700only); return { a: a && a.slice(0, 19), aEnd: a && a.slice(-5), r: r && r.text && r.text.slice(0, 19) }; });
  ok(read.a === 'DISK-ONLY-LONG-TEXT' && read.aEnd === ' ONLY' && read.r === 'DISK-ONLY-LONG-TEXT', 'a text kept on the disk alone is read back whole, opened on its way in (big_get gives plain text to the page)', read);
  // 3. a reload: deskAdopt meets a sealed desk on the disk; the sign-in opens it
  await p.reload(); await waitBoot(p); await p.waitForTimeout(1500);
  ok(await doorUp(p), 'after a reload, with a sealed desk on the disk and in the store, the sign-in is drawn');
  const st0 = await p.evaluate(() => ({ locked: window.__ingLocked, n: (state.chats || []).reduce((n, c) => n + (c.messages || []).length, 0), rawIsEnv: (window.__ingLockedRaw || '').indexOf('{"ing":"locked"') === 0, loads: window.__shellLog.filter(x => x[0] === 'load_state').length }));
  ok(st0.locked && st0.n === 0 && st0.rawIsEnv && st0.loads >= 1, 'the base\'s deskAdopt read the disk copy and kept it for the sign-in; nothing of it was read as a desk', st0);
  await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor #ildGo');
  await p.waitForFunction(() => window.__ingLocked === false && document.querySelector('#ingLockDoor').hidden, null, { timeout: 30000 }); await p.waitForTimeout(800);
  ok(await p.evaluate((t) => (state.chats || []).some(c => (c.messages || []).some(m => m.text === t)), MSG), 'the sign-in opened the same desk, with the chat message');
  // 4. Lock now: the desk reaches the bridge, sealed, before the page starts again
  await p.evaluate(() => { window.__shellLog.length = 0; curChat().messages.push({ role: 'me', text: 'the very last words before the lock' }); document.getElementById('chatInput').value = 'UNSENT-DRAFT-MARK typed and not sent'; });
  await p.evaluate(() => { IngLock.lockNow('key'); });
  let relocked = false; for (let i = 0; i < 30; i++) { await p.waitForTimeout(500); try { if (await doorUp(p)) { relocked = true; break; } } catch (e) {} }
  const d2 = await p.evaluate(() => { const D = window.__t700disk(); return { desk: (D.desk || '').slice(0, 15), plain: (D.desk || '').includes('very last words') || (D.desk || '').includes('UNSENT-DRAFT-MARK') }; });
  ok(relocked && d2.desk === '{"ing":"locked"' && !d2.plain, 'Lock now: the page is back at the sign-in and the disk copy is the sealed desk, with no plain words in it', d2);
  await waitBoot(p); await p.fill('#ingLockDoor #ildPw', PW1); await p.click('#ingLockDoor #ildGo');
  await p.waitForFunction(() => window.__ingLocked === false, null, { timeout: 30000 }); await p.waitForTimeout(600);
  ok(await p.evaluate(() => (state.chats || []).some(c => (c.messages || []).some(m => m.text === 'the very last words before the lock'))), 'the words written just before Lock now were kept (saved and sealed first)');
  await p.waitForTimeout(500);
  const dr = await p.evaluate(() => ({ box: document.getElementById('chatInput').value, left: state.__lockDraft === undefined }));
  ok(dr.box === 'UNSENT-DRAFT-MARK typed and not sent' && dr.left, 'what was typed in the chat\'s box and not sent is kept through the lock (inside the sealed desk, never in the clear on the disk) and put back after the sign-in', dr);
  ok(errs.length === 0, 'no script errors on the page', errs.join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
