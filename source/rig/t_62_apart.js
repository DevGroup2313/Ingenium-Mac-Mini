// Ingenium 6.2 · an app opened in a window of its own keeps to itself (modules/r163.js), in Chromium. Found in the security
// audit: a page from the chat, Build or Fabrica was opened from a blob: address, which belongs to Ingenium's own origin, so its
// code could read what Ingenium keeps. Checks:
//   - the chat stage's, the chat preview's, Build's and Fabrica's "own window" keys all open the page through ingOpenApart;
//   - in the window it opens, a hostile page runs (its script, a form, a dialog are allowed) but in no origin of its own: it
//     cannot read Ingenium's local storage (it is given an empty one of its own, in memory), its large store or any of its
//     databases, cannot reach the window it is in, and the window that opened it is not known to it (no opener); it keeps its
//     standards mode; a large page (over 2 MB) the same;
//   - a link Fabrica's GitHub views open is told nothing of Ingenium's window;
//   - no page errors.
//   node rig/t_62_apart.js <url of Ingenium> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
// the hostile page: it tries everything a page that wants Ingenium's data would try, and writes down what it got
const HOSTILE = (pad) => `<!doctype html><title>Hostile</title><h1 id="h">hostile</h1><script>
(async function(){const got={};
  try{got.ls=localStorage.getItem('ingenium_v4')||localStorage.length;}catch(e){got.ls='refused: '+e.name;}
  try{got.dbs=(await indexedDB.databases()).map(d=>d.name);}catch(e){got.dbs='refused: '+e.name;}
  try{await new Promise((res,rej)=>{const r=indexedDB.open('ingenium_big');r.onsuccess=()=>{got.big='opened';res();};r.onerror=()=>rej(r.error);});}catch(e){got.big='refused: '+(e&&e.name);}
  try{got.top=top.document.title;}catch(e){got.top='refused: '+e.name;}
  try{got.parentState=!!parent.state;}catch(e){got.parentState='refused: '+e.name;}
  try{got.opener=top.opener?'there':'none';}catch(e){got.opener='refused: '+e.name;}
  try{got.cookie=document.cookie;}catch(e){got.cookie='refused: '+e.name;}
  got.compat=document.compatMode;got.origin=String(self.origin);got.ran=true;
  document.getElementById('h').setAttribute('data-got',JSON.stringify(got));})();
<\/script>` + (pad ? '<!--' + 'x'.repeat(pad) + '-->' : '');

async function gotOf(popup) {
  for (let i = 0; i < 60; i++) {
    const fr = popup.frames().find(f => f !== popup.mainFrame());
    if (fr) { try { const g = await fr.evaluate(() => { const h = document.getElementById('h'); return h && h.getAttribute('data-got'); }); if (g) return JSON.parse(g); } catch (e) { } }
    await popup.waitForTimeout(250);
  }
  return null;
}
// local storage: the page is given an empty store of its own in memory (thoughts/open_apart.html), never Ingenium's
const isolated = g => g && g.ran && g.ls === 0 && g.compat === 'CSS1Compat' && /refused/.test(String(g.dbs)) && /refused/.test(String(g.big)) && /refused/.test(String(g.top)) && /refused/.test(String(g.parentState)) && g.origin === 'null';

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(1500);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
    // something of Ingenium's to steal
    await p.evaluate(async () => { state.cloud = state.cloud || {}; state.cloud.key = 'sk-apart-secret-777'; saveState(); await IngBig.put(IngBig.newId(), 'a long text of the owner\'s'); });
    // every key that opens a page in a window of its own goes through ingOpenApart
    const calls = await p.evaluate(async () => {
      const seen = []; const real = window.ingOpenApart; window.ingOpenApart = (h, t) => { seen.push(t); return null; };
      try { csShow({ kind: 'file', html: '<!doctype html><title>Stage</title><p>stage', name: 'stage.html' }, { user: true }); } catch (e) { }
      await new Promise(r => setTimeout(r, 600)); try { document.getElementById('csOpen').click(); } catch (e) { }
      // the chat preview's key is only in the page when the base has it (its handler is changed either way)
      window._chatPreviewHtml = '<p>preview'; const cp = document.getElementById('cpOpen'); if (cp) cp.click();
      seen.cp = !!cp; seen.cpEdited = /\$\("cpOpen"\)\.onclick=function\(\)\{if\(!window\._chatPreviewHtml\)return;ingOpenApart\(/.test([...document.scripts].map(s => s.textContent).join('\n'));
      go('build'); await new Promise(r => setTimeout(r, 400)); document.getElementById('codeEditor').value = '<p>build'; document.getElementById('openPreview').click();
      window.ingOpenApart = real; return { seen, cp: seen.cp, cpEdited: seen.cpEdited }; });
    ok(calls.seen.length === 2 + (calls.cp ? 1 : 0) && calls.seen.includes('stage.html') && calls.seen.includes('Build') && (!calls.cp || calls.seen.includes('Preview')) && calls.cpEdited,
      'the stage\'s, the chat preview\'s and Build\'s own-window keys open the page apart', calls);
    const fab = await p.evaluate(() => { const t = [...document.scripts].map(s => s.textContent).join('\n'); return { apart: /ingOpenApart\(html,r\.name\)/.test(t), blobWin: /window\.open\(u,"_blank"\)/.test(t) }; });
    ok(fab.apart && !fab.blobWin, 'Fabrica\'s Run opens the app apart too, and no key opens a page from a blob: address any more', fab);
    // a hostile page, opened apart
    for (const [label, pad] of [['a page', 0], ['a large page (over 2 MB)', 2100000]]) {
      const [popup] = await Promise.all([ctx.waitForEvent('page'), p.evaluate(h => { ingOpenApart(h, 'Hostile'); }, HOSTILE(pad))]);
      const got = await gotOf(popup);
      const wrap = await popup.evaluate(() => ({ opener: window.opener === null, sandbox: (document.querySelector('iframe') || {}).getAttribute && document.querySelector('iframe').getAttribute('sandbox'), title: document.title }));
      ok(isolated(got) && wrap.opener && /allow-scripts/.test(wrap.sandbox) && !/allow-same-origin/.test(wrap.sandbox) && !/allow-top-navigation/.test(wrap.sandbox) && wrap.title === 'Hostile',
        label + ', opened apart, runs, but in no origin of its own: no storage of Ingenium\'s (an empty one of its own), no way into the window around it, no opener', { got, wrap });
      await popup.close();
    }
    // for comparison, what the old way allowed (a blob: address): the same page reads Ingenium's store
    const [old] = await Promise.all([ctx.waitForEvent('page'), p.evaluate(h => { window.open(URL.createObjectURL(new Blob([h.replace('top.document.title', 'document.title')], { type: 'text/html' })), '_blank'); }, HOSTILE(0))]);
    await old.waitForTimeout(1500);
    const oldGot = await old.evaluate(() => { const h = document.getElementById('h'); return h && JSON.parse(h.getAttribute('data-got') || 'null'); });
    ok(oldGot && Array.isArray(oldGot.dbs) && oldGot.dbs.includes('ingenium_big'), 'the way it was (for comparison): the same page from a blob: address could read Ingenium\'s databases', oldGot && oldGot.dbs);
    await old.close();
    // a link from Fabrica's GitHub views
    const link = await p.evaluate(() => { const t = [...document.scripts].map(s => s.textContent).join('\n'); return /a\.rel="noopener noreferrer";document\.body\.appendChild\(a\);a\.click\(\)/.test(t) && !/function openUrl\(u\)\{try\{var w=window\.open\(u,"_blank"\)/.test(t); });
    ok(link, 'a link Fabrica\'s GitHub views open is told nothing of Ingenium\'s window (noopener, noreferrer)');
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
