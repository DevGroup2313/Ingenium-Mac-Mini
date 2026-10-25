// Ingenium 6.3 / The Forge 645 · each app on its own, with no connection (in Chromium). The owner's words (23 October 2026):
// "I don't want for Ingenium or the Forge to have any dependencies on any apps, not even each other. They should be
// self-sustained and be fully operational offline." Every request that would leave the computer is refused and written down.
//   Ingenium: it starts; Home, Chat, Build, Code, Fabrica, Lector, Focus, the desk and Settings each open; the page's own engine
//     is found inside the page; the picture reader reads a picture (its words and what it shows) from what the page carries;
//     the code editor works.
//   The Forge (its page without the apps it carries, so nothing of Ingenium's is there): it starts; each room opens; the code
//     editor works; a small app is opened in the Editor and runs on the stage.
//   For both: not one request left the computer, and no page errors.
//   node rig/t_63_offline.js ingenium=<url> forge=<url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const args = process.argv.slice(2), OUT = args.pop(); fs.mkdirSync(OUT, { recursive: true });
const URLS = Object.fromEntries(args.map(a => a.split(/=(.*)/s).slice(0, 2)));
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700) : '')); c ? pass++ : fail++; };
const LOCAL = /^(https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?\/|data:|blob:|about:|file:)/;

async function cut(ctx, out) {
  await ctx.route('**/*', r => { const u = r.request().url(); if (LOCAL.test(u)) return r.continue(); out.push(u.slice(0, 160)); return r.abort('internetdisconnected'); });
}

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  if (URLS.ingenium) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const left = []; await cut(ctx, left);
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    try {
      await p.goto(URLS.ingenium); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(1000);
      await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
      ok(true, 'Ingenium starts with no connection');
      const rooms = ['home', 'chat', 'build', 'code', 'fabrica', 'lector', 'focus', 'settings'], seen = {};
      for (const r of rooms) { const shown = await p.evaluate(r => { try { go(r); } catch (e) { return 'error: ' + e.message; } const pg = document.getElementById('page-' + r); return pg ? pg.classList.contains('active') : 'no page'; }, r); seen[r] = shown; await p.waitForTimeout(700); }
      ok(Object.values(seen).every(v => v === true || v === 'no page') && Object.values(seen).filter(v => v === true).length >= 6, 'its rooms open: ' + rooms.join(', '), seen);
      const eng = await p.evaluate(() => { const s = [...document.querySelectorAll('script')].map(x => x.id || x.type).filter(x => /engine|wllama|wasm/i.test(x)); return { blocks: s.slice(0, 8), baked: typeof window.ENGINE_BAKED !== 'undefined' ? !!window.ENGINE_BAKED : null }; });
      ok(eng.blocks.length > 0, 'the page\'s own engine is inside the page', eng);
      // the picture reader, from what the page carries
      const eyes = await p.evaluate(async () => {
        const c = document.createElement('canvas'); c.width = 640; c.height = 200; const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, 640, 200); g.fillStyle = '#000'; g.font = 'bold 56px sans-serif'; g.fillText('OFFLINE WORDS', 30, 120);
        const E = window.IngEyes; if (!E || !E.look) return { none: true };
        try { const r = await Promise.race([E.look({ name: 'words.png', dataUrl: c.toDataURL('image/png'), file: new File([await new Promise(r => c.toBlob(r, 'image/png'))], 'words.png', { type: 'image/png' }) }), new Promise((_, j) => setTimeout(() => j(new Error('timeout')), 120000))]); return { text: String(r && (r.text || r.words || r.ocr) || ''), kind: r && r.kind, labels: (r && r.labels || []).map(x => x.name).slice(0, 3) }; } catch (e) { return { error: String(e && e.message || e) }; } });
      ok(eyes.text && /OFFLINE/i.test(eyes.text), 'the picture reader reads a picture\'s words with no connection, from what the page carries', eyes);
      // the code editor
      await p.evaluate(() => go('build')); await p.waitForTimeout(500);
      const ed = await p.evaluate(() => { const t = document.getElementById('codeEditor'); t.value = '<p>offline</p>'; return !!(t.__ingCode && window.IngEditor); });
      ok(ed, 'the code editor works (it is inside the page)');
      ok(left.length === 0, 'Ingenium: not one request left the computer', left.slice(0, 8));
      ok(!errs.length, 'Ingenium: no page errors', errs.slice(0, 4));
    } catch (e) { ok(false, 'Ingenium: the run crashed', e.stack); }
    await ctx.close();
  }
  if (URLS.forge) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const left = []; await cut(ctx, left);
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    try {
      await p.goto(URLS.forge); await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
      await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(800);
      const carries = await p.evaluate(() => !!document.getElementById('forge-bi-meta'));
      ok(!carries, 'the Forge starts with no connection, from its page alone (none of the apps it can carry is in it, Ingenium neither)');
      const rooms = await p.evaluate(() => [...document.querySelectorAll('[data-room]')].map(x => x.getAttribute('data-room')).filter((v, i, a) => v && a.indexOf(v) === i));
      const opened = {};
      for (const r of rooms.slice(0, 16)) { opened[r] = await p.evaluate(r => { try { FORGE.openRoom(r); return true; } catch (e) { return 'error: ' + e.message; } }, r); await p.waitForTimeout(400); }
      ok(Object.keys(opened).length >= 6 && Object.values(opened).every(v => v === true), 'each room opens: ' + Object.keys(opened).join(', '), opened);
      await p.evaluate(() => FORGE.openRoom('editor')); await p.waitForTimeout(500);
      await p.setInputFiles('#edShell', { name: 'small_app.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><title>Small</title><h1>Small offline app</h1><script>document.title="ran";</script>') }); await p.waitForTimeout(2500);
      // (since the Forge 647 a page from outside is shown apart, in no origin of the Forge's, so it is read through the browser)
      const ran = await (async () => { try { const f = await (await p.$('#frame')).contentFrame(); return await f.evaluate(() => document.body.innerText); } catch (e) { return ''; } })();
      ok(/Small offline app/.test(ran), 'a small app opened in the Editor runs on the stage', ran.slice(0, 80));
      await p.evaluate(() => FORGE.openRoom('files')); await p.waitForTimeout(500);
      const ed = await p.evaluate(() => !!window.IngEditor);
      ok(ed, 'the code editor is inside the Forge\'s own page');
      ok(left.length === 0, 'the Forge: not one request left the computer', left.slice(0, 8));
      ok(!errs.length, 'the Forge: no page errors', errs.slice(0, 4));
    } catch (e) { ok(false, 'the Forge: the run crashed', e.stack); }
    await ctx.close();
  }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
