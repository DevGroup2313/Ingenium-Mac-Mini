// The Forge 644 · a page opened in a window of its own keeps to itself (the shared build/thoughts/open_apart.html, with
// patches_apart.json), in Chromium. Found in the security audit: the preview's Open wrote the page into a blank window, and
// Fabrica's Run opened it from a blob: address; both belong to the Forge's own origin, so the page's code could read what the
// Forge keeps. Checks:
//   - the preview's Open and Fabrica's Run go through ingOpenApart, and nothing opens a page from a blob: address or writes one
//     into a blank window of the Forge's any more;
//   - a hostile page, opened apart, runs but in no origin of its own (no storage, no databases, no way into the window around
//     it, no opener); a page that keeps things in local storage still runs, with a store of its own in memory;
//   - a link Fabrica's GitHub views open is told nothing of the Forge's window;
//   - no page errors.
//   node tests/t_644_apart.js <url of the Forge page> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const HOSTILE = `<!doctype html><title>Hostile</title><h1 id="h">hostile</h1><script>
(async function(){const got={};
  try{got.dbs=(await indexedDB.databases()).map(d=>d.name);}catch(e){got.dbs='refused: '+e.name;}
  try{await new Promise((res,rej)=>{const r=indexedDB.open('forge');r.onsuccess=()=>{got.db='opened';res();};r.onerror=()=>rej(r.error);});}catch(e){got.db='refused: '+(e&&e.name);}
  try{got.top=top.document.title;}catch(e){got.top='refused: '+e.name;}
  try{got.opener=top.opener?'there':'none';}catch(e){got.opener='refused: '+e.name;}
  try{localStorage.setItem('mine','kept');got.ls=localStorage.getItem('mine')+'/'+localStorage.length;}catch(e){got.ls='refused: '+e.name;}
  got.compat=document.compatMode;got.origin=String(self.origin);got.ran=true;
  document.getElementById('h').setAttribute('data-got',JSON.stringify(got));})();
<\/script>`;
async function gotOf(popup) {
  for (let i = 0; i < 60; i++) {
    const fr = popup.frames().find(f => f !== popup.mainFrame());
    if (fr) { try { const g = await fr.evaluate(() => { const h = document.getElementById('h'); return h && h.getAttribute('data-got'); }); if (g) return JSON.parse(g); } catch (e) { } }
    await popup.waitForTimeout(250);
  }
  return null;
}
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  try {
    await p.goto(URL_);
    await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
    await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(600);
    const code = await p.evaluate(() => { const t = [...document.scripts].map(s => s.textContent).join('\n');
      return { fn: typeof window.ingOpenApart, run: /window\.ingOpenApart\(html,r\.name\)/.test(t), blobWin: /window\.open\(u,"_blank"\)/.test(t),
        open: /window\.ingOpenApart\(current\.doc,current\.name\)/.test(t), blankWrite: /window\.open\('','_blank'\); if\(w\)\{ w\.document\.open\(\); w\.document\.write\(current\.doc\)/.test(t),
        link: /a\.rel="noopener noreferrer";document\.body\.appendChild\(a\);a\.click\(\)/.test(t) && !/function openUrl\(u\)\{try\{var w=window\.open\(u,"_blank"\)/.test(t) }; });
    ok(code.fn === 'function' && code.run && code.open && !code.blobWin && !code.blankWrite, 'the preview\'s Open and Fabrica\'s Run open the page apart; nothing opens one from a blob: address or writes it into a blank window', code);
    // the preview's Open, pressed, with a page in the preview
    const seen = await p.evaluate(() => { const real = window.ingOpenApart, s = []; window.ingOpenApart = (h, t) => { s.push([t, h.length]); return {}; };
      try { FORGE.showDoc('<!doctype html><title>Made</title><p>made', 'made.html', '<p>made', 'html'); } catch (e) { s.push('show: ' + e.message); }
      try { document.getElementById('openBtn').click(); } catch (e) { s.push('click: ' + e.message); } window.ingOpenApart = real; return s; });
    ok(seen.length === 1 && seen[0][0] === 'made.html', 'the preview\'s Open, pressed, opens the page the preview holds apart', seen);
    const [popup] = await Promise.all([ctx.waitForEvent('page'), p.evaluate(h => { window.ingOpenApart(h, 'Hostile'); }, HOSTILE)]);
    const got = await gotOf(popup);
    const wrap = await popup.evaluate(() => ({ opener: window.opener === null, sandbox: document.querySelector('iframe').getAttribute('sandbox'), title: document.title }));
    ok(got && got.ran && /refused/.test(String(got.dbs)) && /refused/.test(String(got.db)) && /refused/.test(String(got.top)) && got.origin === 'null' && wrap.opener && !/allow-same-origin/.test(wrap.sandbox),
      'a hostile page, opened apart, runs but in no origin of its own: no databases of the Forge\'s, no way into the window around it, no opener', { got, wrap });
    ok(got && got.ls === 'kept/1' && got.compat === 'CSS1Compat', 'a page that keeps things in local storage still runs, with a store of its own in memory, and keeps its standards mode', got && { ls: got.ls, compat: got.compat });
    await popup.close();
    ok(code.link, 'a link Fabrica\'s GitHub views open is told nothing of the Forge\'s window (noopener, noreferrer)');
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
