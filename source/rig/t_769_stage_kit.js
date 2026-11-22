// Ingenium 7.69 · every app opens in the preview (modules/r358.js, build/stagekit). Lakay, as the page carries it (build/apps/builtin),
// and invented pages (a tide ledger, a harbour guide) with invented data.
//   1. the kit goes into the stage's page, with what it may keep, and into Build's preview, with nothing kept
//   2. Lakay in the preview beside the chat: its door with Enter (not "cannot keep its books"); Enter opens the practice store
//   3. what it keeps is handed to Ingenium: its two databases, and the key it made
//   4. the page run again in the stage: the practice store opens on the same books (a mark the test left in them is still there)
//   5. every kind of value a database keeps comes back: a Date, a Map, a Set, a Blob's bytes, an index, a key the page made
//      (it opens what it sealed with it), an array with a hole
//   6. Ingenium itself started again: Lakay's books and the tide ledger are still there, the key included
//   7. a link to a part of the page stays in it, as does a history entry for one, and a form that names nowhere to go
//   8. a file the page saves goes to Ingenium's own save (saveFileNative), with its name and its bytes
//   9. cookies with a lifetime come back when the page runs again; one without a lifetime does not
//  10. Build's preview: a page's database works there, and nothing of it is kept
//  11. a page opened in a window of its own: its database works there
//  12. Clear the preview (modules/r359.js): in More just above Close; the page leaves the preview and the panel says it is clear; the
//      same page shown again by itself stays away; a new one comes; one she opens herself comes and ends the clearing; More's rows lie
//      quietly in one raised card (her Design A), a row that is on keeps its seat, and every row is in view
//  13. no page errors
//     node rig/t_769_stage_kit.js <page file>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const http = require('http'); const os = require('os'); const zlib = require('zlib');
const [PAGE] = process.argv.slice(2);
if (!PAGE) { console.log('usage: node rig/t_769_stage_kit.js <page file>'); process.exit(2); }
let P = 0, F = 0;
function ok(c, m, d) { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 900))); c ? P++ : F++; }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
setTimeout(() => { console.log('FAIL the test did not finish in 30 minutes'); process.exit(3); }, 30 * 60 * 1000).unref();
const LAKAY = zlib.gunzipSync(fs.readFileSync(path.join(__dirname, '..', 'build', 'apps', 'builtin', 'lakay.html.gz'))).toString('utf8');
const LEDGER = `<!doctype html><html><head><meta charset="utf-8"><title>Tide ledger</title></head><body><p id="o">…</p><p id="c"></p><script>
document.getElementById("c").textContent=document.cookie;
document.cookie="tide=spring; max-age=3600";document.cookie="visit=once";
(async function(){
  function req(r){return new Promise(function(res,rej){r.onsuccess=function(){res(r.result);};r.onerror=function(){rej(r.error);};});}
  var op=indexedDB.open("tide-ledger",1);op.onupgradeneeded=function(){var s=op.result.createObjectStore("tides",{keyPath:"id",autoIncrement:true});s.createIndex("by_port","port");};
  var db=await req(op),have=await req(db.transaction("tides").objectStore("tides").getAll());
  if(!have.length){
    var key=await crypto.subtle.generateKey({name:"AES-GCM",length:256},false,["encrypt","decrypt"]),iv=crypto.getRandomValues(new Uint8Array(12));
    var ct=await crypto.subtle.encrypt({name:"AES-GCM",iv:iv},key,new TextEncoder().encode("high water 06:25"));
    var tx=db.transaction("tides","readwrite");
    tx.objectStore("tides").add({port:"Saint-Malo",when:new Date(Date.UTC(2026,10,22,6,25)),heights:new Map([["high",12.4],["low",1.1]]),chart:new Blob(["chart of the harbour"],{type:"text/plain"}),
      key:key,iv:iv,ct:ct,tags:new Set(["spring","neap"]),nested:{a:[1,,3]}});
    await new Promise(function(r){tx.oncomplete=r;});document.getElementById("o").textContent="written";return;}
  var t=have[0],pt=new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:t.iv},t.key,t.ct)),chart=await t.chart.text();
  var byPort=await req(db.transaction("tides").objectStore("tides").index("by_port").get("Saint-Malo"));
  document.getElementById("o").textContent=JSON.stringify({n:have.length,id:t.id,date:t.when instanceof Date&&t.when.toISOString(),map:t.heights instanceof Map&&t.heights.get("high"),
    set:t.tags instanceof Set&&t.tags.has("neap"),blob:chart,sealed:pt,index:!!byPort&&byPort.port,hole:!(1 in t.nested.a)&&t.nested.a.length});
})().catch(function(e){document.getElementById("o").textContent="error "+e.name+": "+e.message;});
</script></body></html>`;
const WANT = JSON.stringify({ n: 1, id: 1, date: '2026-11-22T06:25:00.000Z', map: 12.4, set: true, blob: 'chart of the harbour', sealed: 'high water 06:25', index: 'Saint-Malo', hole: 3 });
const GUIDE = `<!doctype html><html><head><meta charset="utf-8"><title>Harbour guide</title></head><body>
<a id="lk" href="#moorings">Moorings</a> <a id="top" href="#">Top</a>
<form id="fm"><input name="q" value="ferry"><button id="sb">Find</button></form>
<button id="save">Save the tide table</button>
<div style="height:2400px"></div><h2 id="moorings">Moorings</h2><div style="height:2400px"></div>
<script>window.SEEN=[];addEventListener("hashchange",function(){SEEN.push(location.hash);});
document.getElementById("save").addEventListener("click",function(){var a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["Saint-Malo 06:25 12.4 m"],{type:"text/plain"}));a.download="tides.txt";a.click();});</script></body></html>`;
const SMALLDB = `<!doctype html><html><head><meta charset="utf-8"><title>Buoys</title></head><body><p id="o">…</p><script>
var r=indexedDB.open("buoys",1);r.onupgradeneeded=function(){r.result.createObjectStore("b");};
r.onsuccess=function(){var db=r.result,tx=db.transaction("b","readwrite");tx.objectStore("b").put({colour:"red"},"north");
  tx.oncomplete=function(){var g=db.transaction("b").objectStore("b").get("north");g.onsuccess=function(){document.getElementById("o").textContent="buoy "+g.result.colour;};};};
r.onerror=function(){document.getElementById("o").textContent="error "+r.error;};</script></body></html>`;

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), 't769-'));
fs.symlinkSync(path.resolve(PAGE), path.join(DIR, 'ingenium.html'));
const serve = (port) => new Promise((res) => { const s = http.createServer((q, r) => { const f = path.join(DIR, decodeURIComponent(q.url.split('?')[0]));
  if (!f.startsWith(DIR) || !fs.existsSync(f)) { r.writeHead(404); r.end(); return; }
  r.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(r); });
  s.listen(port, '127.0.0.1', () => res(s)); });
(async () => {
  const srv = await serve(8769); const URL_ = 'http://127.0.0.1:8769/ingenium.html';
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1500, height: 1000 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 200)));
  const start = async () => {
    await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 });
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
    // the full, gift and demo editions open with their terms: tick, then I agree (the first key in the veil is its In short tab)
    await sleep(800); await p.evaluate(() => { const t = document.getElementById('tgTick'); if (t && !t.checked) t.click(); const g = [...document.querySelectorAll('button')].find((x) => /^I agree$/.test(x.textContent.trim()) && x.offsetParent && !x.disabled); if (g) g.click(); });
    await p.evaluate(() => { window.__kitOps = []; addEventListener('message', (e) => { const f = document.getElementById('csFrame'); if (f && e.source === f.contentWindow && e.data && e.data.__ingKit) window.__kitOps.push(e.data.op + (e.data.name ? ' ' + e.data.name : '')); }); });
  };
  const show = async (html, name, key) => { await p.evaluate(([h, n, k]) => { go('chat'); csShow({ kind: 'file', html: h, name: n, storeKey: k }, { user: true }); }, [html, name, key]); await sleep(600); };
  const again = async () => { await p.evaluate(() => { csCur._ran = null; csRender(); }); await sleep(600); };
  const stage = async () => (await p.$('#csFrame')).contentFrame();
  const textOf = async (fr) => fr.evaluate(() => document.body ? document.body.innerText.replace(/\n+/g, ' | ') : '').catch((e) => 'unreadable: ' + e.message);
  const waitText = async (re, ms) => { const end = Date.now() + (ms || 20000); let t = ''; while (Date.now() < end) { const fr = await stage(); t = fr ? await textOf(fr) : ''; if (re.test(t)) return t; await sleep(300); } return t; };
  const kept = (key) => p.evaluate((k) => window.IngStageKit && IngStageKit.kept(k), key);
  const waitKept = async (key, db, ms) => { const end = Date.now() + (ms || 15000); let k = null; while (Date.now() < end) { k = await kept(key); if (k && k.dbs.indexOf(db) >= 0) return k; await sleep(300); } return k; };
  await start();

  // 1. the kit, where it goes
  const docs = await p.evaluate(() => { const a = ingStageDoc('<!doctype html><p>x</p>', Object.defineProperty({}, '__kit', { value: { key: 'k', cookie: '' } })), c = ingStageDoc('<!doctype html><p>x</p>');
    return { kit: !!window.IngStageKit && IngStageKit.size > 50000, stage: /__ING_KIT_OPTS=\{"persist":1,"relay":1\}/.test(a) && a.indexOf('__ingKitOn') > 0 && a.indexOf(ING_STAGE_SHIM) >= 0 && a.indexOf(ING_STAGE_SHIM) < a.indexOf('__ING_KIT_OPTS'),
      build: /__ING_KIT_OPTS=\{"persist":0,"relay":1\}/.test(c) && c.indexOf('__ingKitOn') > 0 }; });
  ok(docs.kit && docs.stage && docs.build, 'the kit goes into the stage\'s page after the stand-in for local storage, keeping what the page keeps; into Build\'s preview, keeping nothing', docs);

  // 2. Lakay in the preview beside the chat
  await show(LAKAY, 'lakay.html', 'test:lakay');
  const door = await waitText(/Enter|cannot keep its books/, 30000);
  ok(/THE STORE'S OWN BOOKS/i.test(door) && /Enter/.test(door) && !/cannot keep its books/.test(door), 'Lakay in the preview: its door, with Enter (not "Lakay cannot keep its books in this browser")', door.slice(0, 300));
  await (await stage()).click('text=Enter');
  const shop = await waitText(/Welcome to the practice store/, 30000);
  ok(/Welcome to the practice store/.test(shop) && /Register/.test(shop) && /Inventory/.test(shop), 'Enter opens the practice store, every room on its rail', shop.slice(0, 300));

  // 3. what it keeps, handed to Ingenium
  const k3 = await waitKept('test:lakay', 'emporium-practice');
  ok(k3 && k3.dbs.indexOf('emporium') >= 0 && k3.dbs.indexOf('emporium-practice') >= 0, 'its two databases are handed to Ingenium', k3);
  // a mark in its books, to know them again
  await (await stage()).evaluate(() => new Promise((res) => { const r = indexedDB.open('emporium-practice'); r.onsuccess = () => { const db = r.result, tx = db.transaction('meta', 'readwrite'); tx.objectStore('meta').put('kept by the test', 't769-mark'); tx.oncomplete = () => { db.close(); res(); }; }; }));
  await sleep(1500);

  // 4. the page run again
  await again();
  await waitText(/Enter/, 30000); await (await stage()).click('text=Enter');
  const shop2 = await waitText(/Welcome to the practice store/, 30000);
  const mark2 = await (await stage()).evaluate(() => new Promise((res) => { const r = indexedDB.open('emporium-practice'); r.onsuccess = () => { const db = r.result, g = db.transaction('meta').objectStore('meta').get('t769-mark'); g.onsuccess = () => { db.close(); res(g.result); }; }; r.onerror = () => res('error'); }));
  ok(/Welcome to the practice store/.test(shop2) && mark2 === 'kept by the test', 'run again in the stage: the practice store opens on the same books (the mark left in them is still there)', { shop2: shop2.slice(0, 120), mark2 });

  // 5. every kind of value comes back
  await show(LEDGER, 'tide-ledger.html', 'test:ledger');
  const w1 = await (async () => { const end = Date.now() + 15000; let t = ''; while (Date.now() < end) { t = await (await stage()).evaluate(() => document.getElementById('o').textContent).catch(() => ''); if (t && t !== '…') return t; await sleep(300); } return t; })();
  await waitKept('test:ledger', 'tide-ledger');
  await again(); await sleep(1500);
  const w2 = await (async () => { const end = Date.now() + 15000; let t = ''; while (Date.now() < end) { t = await (await stage()).evaluate(() => document.getElementById('o').textContent).catch(() => ''); if (t && t !== '…' && t !== 'written') return t; await sleep(300); } return t; })();
  ok(w1 === 'written' && w2 === WANT, 'every kind of value comes back: a Date, a Map, a Set, a Blob\'s bytes, an index, a key the page made (it opens what it sealed), an array with a hole', { w1, w2 });
  // 9. cookies
  const c2 = await (await stage()).evaluate(() => document.getElementById('c').textContent);
  ok(/tide=spring/.test(c2) && !/visit=once/.test(c2), 'cookies: one with a lifetime comes back when the page runs again; one without does not', c2);

  // 6. Ingenium started again
  await sleep(2000);
  await start();
  await show(LEDGER, 'tide-ledger.html', 'test:ledger');
  const w3 = await (async () => { const end = Date.now() + 20000; let t = ''; while (Date.now() < end) { t = await (await stage()).evaluate(() => document.getElementById('o').textContent).catch(() => ''); if (t && t !== '…' && t !== 'written') return t; await sleep(300); } return t; })();
  await show(LAKAY, 'lakay.html', 'test:lakay');
  await waitText(/Enter/, 30000); await (await stage()).click('text=Enter');
  const shop3 = await waitText(/Welcome to the practice store/, 30000);
  const mark3 = await (await stage()).evaluate(() => new Promise((res) => { const r = indexedDB.open('emporium-practice'); r.onsuccess = () => { const db = r.result, g = db.transaction('meta').objectStore('meta').get('t769-mark'); g.onsuccess = () => { db.close(); res(g.result); }; }; r.onerror = () => res('error'); }));
  const sealed = await p.evaluate(() => JSON.stringify(state.stageKits || {}));
  ok(w3 === WANT && /Welcome to the practice store/.test(shop3) && mark3 === 'kept by the test' && /test:lakay/.test(sealed) && /test:ledger/.test(sealed),
    'Ingenium started again: the tide ledger (its key included) and Lakay\'s books are still there, each named on the desk (state.stageKits)', { w3, shop3: shop3.slice(0, 100), mark3 });

  // 7. links, history, forms
  await show(GUIDE, 'harbour-guide.html', 'test:guide');
  await sleep(800);
  let fr = await stage();
  await fr.click('#lk'); await sleep(500); fr = await stage();
  const l1 = { url: fr.url(), seen: await fr.evaluate(() => window.SEEN).catch(() => null), title: await fr.title().catch(() => '') };
  const l2 = await fr.evaluate(() => { try { history.pushState({ at: 'ferry' }, '', '#ferry'); return location.hash + ' ' + JSON.stringify(history.state); } catch (e) { return 'threw ' + e.message; } });
  await fr.click('#sb'); await sleep(700); fr = await stage();
  const l3 = { url: fr.url(), title: await fr.title().catch(() => '') };
  ok(/^about:srcdoc#moorings$/.test(l1.url) && l1.seen && l1.seen[0] === '#moorings' && l1.title === 'Harbour guide', 'a link to a part of the page stays in the page (it does not load Ingenium inside it)', l1);
  ok(l2 === '#ferry {"at":"ferry"}', 'a history entry for a part of the page is made, not refused', l2);
  ok(/^about:srcdoc/.test(l3.url) && l3.title === 'Harbour guide', 'a form that names nowhere to go stays on the page', l3);

  // 8. a file the page saves
  await p.evaluate(() => { window.__saved = []; window.saveFileNative = function (name, mime, data) { const b = data instanceof Blob ? data : new Blob([data]); return b.text().then((t) => { window.__saved.push({ name, mime, text: t }); return 'test'; }); }; });
  await fr.click('#save'); await sleep(1200);
  const sv = await p.evaluate(() => window.__saved);
  ok(sv.length === 1 && sv[0].name === 'tides.txt' && sv[0].mime === 'text/plain' && sv[0].text === 'Saint-Malo 06:25 12.4 m', 'a file the page saves goes to Ingenium\'s own save, with its name and bytes', sv);

  // 10. Build's preview
  await p.evaluate((h) => { window.__buildOps = []; addEventListener('message', (e) => { const f = document.getElementById('previewFrame'); if (f && e.source === f.contentWindow && e.data && e.data.__ingKit) window.__buildOps.push(e.data.op); });
    document.getElementById('previewFrame').srcdoc = ingStageDoc(h); }, SMALLDB);
  await sleep(2000);
  const bf = await (await p.$('#previewFrame')).contentFrame();
  const bt = await bf.evaluate(() => document.getElementById('o').textContent).catch((e) => 'unreadable ' + e.message);
  const bk = await p.evaluate(() => window.__buildOps);
  ok(bt === 'buoy red' && bk.length === 0, 'Build\'s preview: a page\'s database works there, and nothing of it is handed over to be kept', { bt, bk });

  // 11. a window of its own
  const pop = p.waitForEvent('popup', { timeout: 20000 });
  await p.evaluate((h) => { window.ingOpenApart(h, 'Buoys'); }, SMALLDB);
  const w = await pop; await w.waitForLoadState('domcontentloaded'); await sleep(1500);
  const wf = w.frames().find((x) => x !== w.mainFrame());
  const wt = wf ? await wf.evaluate(() => document.getElementById('o').textContent).catch((e) => 'unreadable ' + e.message) : 'no frame';
  ok(wt === 'buoy red', 'a page opened in a window of its own: its database works there', wt);
  await w.close();

  // 12. Clear the preview, and More's look
  await show(GUIDE, 'harbour-guide.html', 'test:guide'); await sleep(800);
  await p.click('#csMore'); await sleep(700);
  const menu = await p.evaluate(() => { const m = document.getElementById('csMenu'), c = document.getElementById('csClear'), k = document.getElementById('csClose');
    const row = getComputedStyle(document.getElementById('csFold')), card = getComputedStyle(m), on = document.getElementById('csChanges');
    return { order: !!c && c.nextElementSibling && c.nextElementSibling.classList.contains('ctx-sep') && c.nextElementSibling.nextElementSibling === k, text: c && c.textContent,
      rowBg: row.backgroundColor, rowImg: row.backgroundImage, rowShadow: row.boxShadow, rowBorder: row.borderTopWidth, pad: card.paddingTop, all: m.scrollHeight <= m.clientHeight + 1 }; });
  ok(menu.order && menu.text === '⊘ Clear the preview' && menu.rowBg === 'rgba(0, 0, 0, 0)' && menu.rowImg === 'none' && menu.rowShadow === 'none' && menu.rowBorder === '0px' && menu.pad === '8px' && menu.all,
    'More: Clear the preview just above Close; its rows lie quietly in one raised card (Design A), every row in view', menu);
  await p.hover('#csFold'); await sleep(500);
  const hov = await p.evaluate(() => { const r = getComputedStyle(document.getElementById('csFold')); return { img: r.backgroundImage, shadow: r.boxShadow, t: r.transform }; });
  ok(/gradient/.test(hov.img) && hov.shadow !== 'none' && /matrix/.test(hov.t), 'a row rises under the pointer', hov);
  await p.click('#csClear'); await p.mouse.move(4, 4); await sleep(900);
  const q1 = await p.evaluate(() => ({ cur: window.csCur, src: document.getElementById('csFrame').getAttribute('srcdoc'), empty: document.getElementById('csEmpty').textContent, mark: !!(curChat().stageCleared), toasts: (window.__toasts || []).slice(-1) }));
  ok(q1.cur === null && !q1.src && /The preview is clear/.test(q1.empty) && q1.mark, 'Clear the preview: the page leaves the preview, the panel says it is clear, the conversation remembers it', q1);
  const q2 = await p.evaluate((h) => { csShow({ kind: 'file', html: h, name: 'harbour-guide.html', storeKey: 'test:guide' }, { quiet: true }); return window.csCur === null; }, GUIDE);
  const q3 = await p.evaluate((h) => { csShow({ kind: 'file', html: h.replace('Moorings</h2>', 'Moorings and buoys</h2>'), name: 'harbour-guide.html', storeKey: 'test:guide' }, { quiet: true }); const n = !!window.csCur; window.csCur = null; try { csCur = null; } catch (e) {} csRender(); return n; }, GUIDE);
  ok(q2 && q3, 'the page she cleared does not come back by itself; a new version of it does', { q2, q3 });
  await show(GUIDE, 'harbour-guide.html', 'test:guide'); await sleep(700);
  const q4 = await p.evaluate(() => ({ cur: !!window.csCur, mark: !!(curChat().stageCleared) }));
  ok(q4.cur && !q4.mark, 'a page she opens herself comes back, and ends the clearing', q4);
  // her standard for side menus: a sticky note's menu wears it too
  await p.evaluate(() => { go('home'); newStickyNote(); }); await sleep(900);
  await p.evaluate(() => { const n = document.querySelector('.sticky-note'); const k = n && [...n.querySelectorAll('button')].find((x) => /⋯|…|···/.test(x.textContent)); if (k) k.click(); }); await sleep(700);
  const sn = await p.evaluate(() => { const m = document.querySelector('.sn-menu'); if (!m) return null; const r = getComputedStyle(m.querySelector('.menu-btn')), c = getComputedStyle(m), d = m.querySelector('.menu-btn.danger');
    return { rowBg: r.backgroundColor, rowImg: r.backgroundImage, rowShadow: r.boxShadow, rowBorder: r.borderTopWidth, radius: c.borderTopLeftRadius, pad: c.paddingTop, danger: d ? getComputedStyle(d).color : '' }; });
  await p.evaluate(() => { try { closeStickyMenus(); } catch (e) {} });
  ok(sn && sn.rowBg === 'rgba(0, 0, 0, 0)' && sn.rowImg === 'none' && sn.rowShadow === 'none' && sn.rowBorder === '0px' && sn.radius === '16px' && sn.pad === '8px' && sn.danger && sn.danger !== 'rgb(34, 26, 46)',
    'her standard for side menus: a sticky note\'s menu is one raised card with quiet rows; Delete note stays red', sn);
  // its paper swatches by night: raised as by day (a light on the face, a shadow under), not a flat rim
  await p.evaluate(() => { state.theme = 'night'; applyTheme(); }); await sleep(700);
  await p.evaluate(() => { const n = document.querySelector('.sticky-note'); const k = n && [...n.querySelectorAll('button')].find((x) => /⋯|…|···/.test(x.textContent)); if (k) k.click(); }); await sleep(900);
  const dots = await p.evaluate(() => { const d = document.querySelector('.sn-menu .sn-dot:not(.sel)'); if (!d) return null; const c = getComputedStyle(d); return { img: c.backgroundImage.slice(0, 40), shadow: c.boxShadow, inline: d.style.getPropertyValue('box-shadow') }; });
  await p.evaluate(() => { try { closeStickyMenus(); } catch (e) {} state.theme = 'day'; applyTheme(); });
  ok(dots && /radial-gradient/.test(dots.img) && /0px 2px 0px/.test(dots.shadow) && !dots.inline, 'by night a note\'s paper swatches stay raised (a light on the face, a wall and a cast), as by day', dots);

  ok(errs.length === 0, 'no page errors', errs);
  console.log(P + ' passed, ' + F + ' failed');
  await b.close(); srv.close(); process.exit(F ? 1 : 0);
})().catch((e) => { console.log('FAIL the test stopped: ' + (e && e.stack || e)); process.exit(1); });
