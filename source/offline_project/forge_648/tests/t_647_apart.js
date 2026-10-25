// The Forge 647 · the security audit's fixes (blocks/forge_security_647.html, patches_security.json), in Chromium, on the full
// page (it carries the owner's apps):
//   - a page from outside, opened in the Editor, is shown apart: a sandbox with no origin, a store of its own in memory; it
//     cannot read what the Forge keeps (local storage, the library), reach the window around it, or have the Forge save or
//     download a file for it;
//   - the Carpe Diem the Forge carries, opened from the library, is the owner's own: shown with the Forge's origin, its
//     registry reachable, the Editor's edits laid on it live; held blank while its fingerprint is read, then loaded once;
//   - the bakery: a page from outside in the bakery is baked and previewed apart, and the boot check before shipping runs apart
//     while it is there, even with the owner's app in the Editor;
//   - the boot check of a page apart still hears its errors and reads its title and whether it came up (by message);
//   - the diary and the command chat draw text from outside through the cleaner (nothing in it runs);
//   - saving and printing for a frame: the carried apps' rooms only, never the preview;
//   - a zip's entry: refused when it declares more than the Forge could hold or an impossible ratio, cut off when it unpacks
//     to more than it declares;
//   - no page errors.
//   node tests/t_647_apart.js <url of the full Forge page> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; };
const HOSTILE = `<!doctype html><html><head><title>Hostile</title></head><body><h1 id="h">hostile</h1><script>
(async function(){const got={};
  try{got.canary=localStorage.getItem('forge:canary');}catch(e){got.canary='refused: '+e.name;}
  try{localStorage.setItem('mine','kept');got.ls=localStorage.getItem('mine')+'/'+localStorage.length;}catch(e){got.ls='refused: '+e.name;}
  try{await new Promise((res,rej)=>{const r=indexedDB.open('forge-applib');r.onsuccess=()=>{got.db='opened';res();};r.onerror=()=>rej(r.error);});}catch(e){got.db='refused: '+(e&&e.name);}
  try{got.top=parent.document.title;}catch(e){got.top='refused: '+e.name;}
  try{got.api=typeof parent.pywebview;}catch(e){got.api='refused: '+e.name;}
  try{parent.postMessage({kind:'carpe-save',name:'stolen.txt',mime:'text/plain',bytes:new TextEncoder().encode('x')},'*');}catch(e){}
  try{parent.postMessage({kind:'carpe-download',filename:'stolen2.txt',mime:'text/plain',data:'x'},'*');}catch(e){}
  got.origin=String(self.origin);got.ran=true;document.getElementById('h').setAttribute('data-got',JSON.stringify(got));})();
<\/script></body></html>`;
async function ready(p) { await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 180000 }); await p.waitForTimeout(1500); }
const frameState = p => p.evaluate(() => { const f = document.getElementById('frame'); return { apart: f.getAttribute('data-forge-apart'), sandbox: f.getAttribute('sandbox') || '' }; });
async function previewGot(p) {
  for (let i = 0; i < 80; i++) {
    const fr = p.frames().find(f => f.name() === '' && f.parentFrame() === p.mainFrame() && f !== p.mainFrame() && /Hostile|about:srcdoc/.test(f.url() + ''));
    for (const f of p.frames()) { try { const g = await f.evaluate(() => { const h = document.getElementById('h'); return h && document.title === 'Hostile' ? h.getAttribute('data-got') : null; }); if (g) return JSON.parse(g); } catch (e) { } }
    await p.waitForTimeout(250);
  }
  return null;
}
(async () => {
  const b = await pw.chromium.launch({ args: ['--js-flags=--max-old-space-size=8192'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  const downloads = []; p.on('download', d => downloads.push(d.suggestedFilename()));
  try {
    await p.goto(URL_); await ready(p);
    for (let i = 0; i < 240 && !(await p.evaluate(() => !!window.__forgeBiLast)); i++) await p.waitForTimeout(1000);
    const api = await p.evaluate(() => ({ dress: typeof window.__forgePreviewDress, seen: typeof window.__forgeShellSeen, boot: typeof window.__forgeBootSandbox, info: typeof window.__forgeBootInfo, carried: typeof window.__forgeFromCarried,
      ed: typeof window.__forgeEd, sec: typeof window.__forgeSec, show: typeof window.__forgeShowSeen, safe: typeof window.IngSafe }));
    ok(Object.values(api).every(v => v === 'function' || v === 'object'), 'the security parts are in the page, and the Editor, the bakery and the boot check are where they look for them', api);
    await p.evaluate(() => { localStorage.setItem('forge:canary', 'secret'); window.__dl = []; const c = HTMLAnchorElement.prototype.click; HTMLAnchorElement.prototype.click = function () { if (this.download) window.__dl.push(this.download); return c.apply(this, arguments); }; });
    await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(600);

    // 1. a page from outside, opened in the Editor
    await p.evaluate(h => window.__forgeEd.open(h, 'hostile.html'), HOSTILE);
    const got = await previewGot(p); const st1 = await frameState(p);
    ok(st1.apart === '1' && !/allow-same-origin/.test(st1.sandbox), 'a page from outside, opened in the Editor, is shown apart (a sandbox with no origin)', st1);
    ok(got && got.ran && got.origin === 'null' && got.canary === null && /refused/.test(String(got.db)) && /refused/.test(String(got.top)) && /refused/.test(String(got.api)),
      'it runs, but cannot read what the Forge keeps (its local storage, the library), nor reach the window around it or the program', got);
    ok(got && got.ls === 'kept/1', 'a page that keeps things in local storage still runs, with a store of its own in memory', got && got.ls);
    await p.waitForTimeout(1500);
    const dl1 = await p.evaluate(() => window.__dl.slice());
    ok(!dl1.length && !downloads.length, 'the Forge saves and downloads nothing for it (carpe-save, carpe-download from the preview are ignored)', { anchors: dl1, downloads });

    // 2. the Carpe Diem the Forge carries, opened from the library
    const cdLen = await p.evaluate(() => new Promise(res => { const r = indexedDB.open('forge-applib', 1); r.onsuccess = () => { const q = r.result.transaction('bytes', 'readonly').objectStore('bytes').get('cd:newest');
      q.onsuccess = () => { window.__cdTxt = new TextDecoder().decode(new Uint8Array(q.result.bytes)); res(window.__cdTxt.length); }; q.onerror = () => res(0); }; r.onerror = () => res(0); }));
    ok(cdLen > 1e7, 'the library holds the Carpe Diem the page carries', cdLen);
    await p.evaluate(() => { const f = document.getElementById('frame'); window.__fgStates = []; window.__fgLoads = 0; f.addEventListener('load', () => { window.__fgLoads++; });
      new MutationObserver(() => window.__fgStates.push(f.getAttribute('data-forge-apart'))).observe(f, { attributes: true, attributeFilter: ['data-forge-apart'] }); });
    const t0 = Date.now();
    await p.evaluate(() => window.__forgeEd.open(window.__cdTxt, 'carpe_diem.html', 'cd'));
    let st2 = null; for (let i = 0; i < 120; i++) { st2 = await frameState(p); if (st2.apart === '0') break; await p.waitForTimeout(250); }
    const tTrust = Date.now() - t0;
    ok(st2.apart === '0' && /allow-same-origin/.test(st2.sandbox), 'the Carpe Diem the Forge carries is the owner\'s own: shown with the Forge\'s origin (in ' + tTrust + ' ms)', st2);
    let reach = false; for (let i = 0; i < 120 && !reach; i++) { reach = await p.evaluate(() => { try { return !!document.getElementById('frame').contentWindow.cdSurfacesX; } catch (e) { return false; } }); if (!reach) await p.waitForTimeout(500); }
    ok(reach, 'its registry is reachable in the preview');
    const pushed = await p.evaluate(() => { try { return window.__forgeSec.pushEdits(); } catch (e) { return 'threw ' + e.message; } });
    ok(pushed === true, 'the Editor\'s edits are laid on it live (pushEdits)', pushed);
    const seq = await p.evaluate(() => ({ states: window.__fgStates.slice(), loads: window.__fgLoads }));
    ok(seq.states[0] === 'wait' && seq.states.indexOf('1') < 0 && seq.loads <= 2, 'held blank while its fingerprint was read, then loaded once, never shown apart first', seq);

    // 3. the bakery holds a page from outside
    await p.evaluate(h => { window.__forgeSec.bakery().shell = h; window.__forgeSec.bakery().shellName = 'hostile.html'; }, HOSTILE);
    await p.waitForTimeout(2500);
    const boot3 = await p.evaluate(() => ({ sb: window.__forgeBootSandbox(), mem: window.__forgeBootMem({}).length > 100 }));
    ok(boot3.sb === 'allow-scripts' && boot3.mem, 'with a page from outside in the bakery, the boot check runs apart, even with the owner\'s app in the Editor', boot3);
    await p.evaluate(h => window.FORGE.showDoc(h, 'hostile_authored.html (baked, preview)', h, 'bake'), HOSTILE);
    let st3 = null; for (let i = 0; i < 40; i++) { st3 = await frameState(p); if (st3.apart === '1') break; await p.waitForTimeout(250); }
    ok(st3.apart === '1' && !/allow-same-origin/.test(st3.sandbox), 'a bake of the bakery\'s page from outside is previewed apart', st3);
    await p.evaluate(() => { window.__forgeSec.bakery().shell = null; window.__forgeSec.bakery().shellName = ''; });
    const boot3b = await p.evaluate(() => window.__forgeBootSandbox());
    ok(boot3b === 'allow-scripts allow-same-origin', 'with the bakery empty and the owner\'s app in the Editor, the boot check has the Forge\'s origin again', boot3b);

    // 4. the boot check of a page apart
    await p.evaluate(h => window.__forgeEd.open(h, 'hostile.html'), HOSTILE); await p.waitForTimeout(1500);
    const info = await p.evaluate(() => new Promise(res => { const page = '<!doctype html><html><head><title>Checked apart</title></head><body><p>up</p><script>setTimeout(function(){ throw new Error("boom in the page"); }, 50)<\/script></body></html>';
      try { window.__forgeSec.bootCheck(page, i => res({ errors: i.errors, title: i.title, booted: i.booted, sb: window.__forgeBootSandbox() })); } catch (e) { res({ threw: e.message }); } }));
    ok(info && info.sb === 'allow-scripts' && (info.errors || []).some(e => /boom in the page/.test(e)), 'the boot check of a page apart still hears its errors', info);
    ok(info && info.title === 'Checked apart' && info.booted === true, 'and reads its title and that it came up, by message', info);

    // 5. the diary and the command chat
    const inj = await p.evaluate(() => { window.__pwned = 0; const bad = 'file <img src=x onerror="window.__pwned=1"><b>bold</b>';
      window.FORGE.diary('import', bad); window.FORGE.say('no such command <img src=y onerror="window.__pwned=2">');
      return new Promise(r => setTimeout(() => { const L = document.getElementById('diaryList'), C = document.getElementById('chatThread');
        r({ pwned: window.__pwned, diaryImg: L ? L.querySelectorAll('img[onerror]').length : -1, diaryBold: L ? !!L.querySelector('b + b, b') : false, chatImg: C ? C.querySelectorAll('[onerror]').length : -1 }); }, 800)); });
    ok(inj.pwned === 0 && inj.diaryImg === 0 && inj.chatImg === 0, 'the diary and the command chat draw text from outside through the cleaner: nothing in it runs', inj);

    // 6. saving and printing for a frame
    const who = await p.evaluate(() => { const pv = document.getElementById('frame'); const room = document.querySelector('iframe[id^="frame-tabula"],iframe[id^="frame-scriba"],iframe[id^="frame-abacus"]');
      return { preview: window.__forgeFromCarried({ source: pv.contentWindow, origin: 'null' }), room: room ? window.__forgeFromCarried({ source: room.contentWindow, origin: location.origin }) : 'no room open', self: window.__forgeFromCarried({ source: window, origin: location.origin }), none: window.__forgeFromCarried({}) }; });
    ok(who.preview === false && who.self === true && who.none === false && who.room !== false, 'saving and printing for a frame: the carried apps\' rooms (and the Forge passing a message on), never the preview', who);

    // 7. a zip's entry
    const zip = await p.evaluate(async () => { const okz = window.__fgZipOk;
      const r = { huge: okz({ usz: 2e9, csz: 1e8 }), ratio: okz({ usz: 6e7, csz: 1e4 }), fair: okz({ usz: 3e7, csz: 4e6 }), small: okz({ usz: 1000, csz: 10 }) };
      try { const big = new Uint8Array(300000); const out = await new Response(new Blob([big]).stream().pipeThrough(window.__fgCap(1000))).arrayBuffer(); r.cap = 'read ' + out.byteLength; } catch (e) { r.cap = 'cut off: ' + e.message; }
      try { const fine = new Uint8Array(5000); const out = await new Response(new Blob([fine]).stream().pipeThrough(window.__fgCap(5000))).arrayBuffer(); r.fine = out.byteLength; } catch (e) { r.fine = 'cut off: ' + e.message; }
      return r; });
    ok(zip.huge === false && zip.ratio === false && zip.fair === true && zip.small === true, 'a zip\'s entry is refused when it declares more than the Forge could hold, or an impossible ratio', zip);
    ok(/^cut off/.test(zip.cap) && zip.fine === 5000, 'an entry that unpacks to more than it declares is cut off; one that keeps its word is read whole', zip);

    const errs2 = errs.filter(m => !/boom in the page/.test(m));  // the boot check's own test page throws on purpose
    ok(!errs2.length, 'no page errors (but the one the boot check\'s test page throws on purpose)', errs2.slice(0, 4));
    await p.screenshot({ path: OUT + '/apart-end.png' });
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
