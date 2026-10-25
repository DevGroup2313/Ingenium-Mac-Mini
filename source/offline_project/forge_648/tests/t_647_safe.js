// The Forge 647 · the five apps the Forge carries in its page (Tabula, Abacus, Imago, Scriba, Fontes) take in markup only through
// Ingenium 6.7's strict sanitiser (forge647.py, step 3b; build/safe_html.js, build/apps/safe_import_patch.py). In Chromium:
//   - each app's page, as the Forge prepares it for its window, carries the sanitiser first and the import mark;
//   - Tabula opens in its window with IngSafe installed; markup written into it by any way (innerHTML) runs no script and
//     keeps no event attribute; a document brought in keeps formatting only (no form, no password field, no style that loads,
//     no frame); Tabula still types and keeps its text;
//   - Imago, Scriba, Fontes and Abacus open with the sanitiser too; no page errors.
//   node tests/t_647_safe.js <url of the Forge page> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 500) : '')); c ? pass++ : fail++; };
async function ready(p) { await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(600); }
// an app opens in its own frame in the room (#frame-<app>, from its page as the Forge prepares it)
async function openApp(p, label, key) {
  // (the side rail's Fontes key opens the Forge's own Fontes room, the coding well; the carried Fontes app opens as the others do)
  if (key === 'fontes') await p.evaluate(() => openExt('fontes'));
  else await p.evaluate(l => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === l && x.offsetParent); if (b) b.click(); }, label);
  await p.waitForFunction(k => { const f = document.getElementById('frame-' + k); return f && f.hasAttribute('srcdoc'); }, key, { timeout: 30000 }).catch(() => { });
  const el = await p.$('#frame-' + key); if (!el) return null;
  const fr = await el.contentFrame(); if (!fr) return null;
  for (let i = 0; i < 80; i++) { try { if (await fr.evaluate(() => document.readyState === 'complete' && !!document.body && !!window.IngSafe)) break; } catch (e) { } await p.waitForTimeout(250); }
  await p.waitForTimeout(600); return fr;
}
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL_); await ready(p);
  const prep = await p.evaluate(() => ['tabula', 'abacus', 'slides', 'scriba', 'fontes'].map(k => { const h = __cdPrepSrc(k, 'en'); return [k, h.indexOf('id="ing-safe"') > 0 && h.indexOf('ingSafeMake') > 0, h.indexOf('6.7-SAFE-IMPORT') > 0, h.indexOf('id="ing-safe"') < h.indexOf('<body')]; }));
  ok(prep.every(x => x[1] && x[2] && x[3]), 'each of the five apps, as the Forge prepares it for its window, carries the sanitiser first, in its head, with the import mark', prep);
  const tab = await openApp(p, 'Tabula', 'tabula');
  ok(!!tab, 'Tabula opens in its window');
  if (tab) {
    const g = await tab.evaluate(() => ({ safe: !!(window.IngSafe && IngSafe.html), installed: !!(window.IngSafe && IngSafe.installed !== false) }));
    ok(g.safe, 'IngSafe is installed in Tabula\'s window', g);
    const r = await tab.evaluate(async () => {
      const host = document.createElement('div'); document.body.appendChild(host);
      host.innerHTML = '<img src="x" onerror="window.__pwned=1"><svg><script>window.__pwned2=1</script></svg><a href="javascript:window.__pwned3=1">x</a><b>kept</b>';
      await new Promise(r => setTimeout(r, 600));
      const img = host.querySelector('img'), a = host.querySelector('a');
      const strict = IngSafe.html('<form action="https://evil.example/"><input type="password" name="p"></form><style>@import url(https://evil.example/x.css)</style><iframe src="https://evil.example"></iframe><p style="color:red">Text</p><b>bold</b>');
      const out = { pwned: !!(window.__pwned || window.__pwned2 || window.__pwned3), onerror: img ? img.getAttribute('onerror') : null, href: a ? a.getAttribute('href') : null, kept: /kept/.test(host.innerHTML), strict };
      host.remove(); return out;
    });
    ok(!r.pwned && !r.onerror && !(r.href || '').startsWith('javascript:') && r.kept, 'markup written into Tabula runs no script and keeps no event attribute or javascript: address; the formatting stays', r);
    ok(!/<form|password|<iframe|@import|evil\.example/i.test(r.strict) && /Text/.test(r.strict) && /<b>bold<\/b>/.test(r.strict), 'a document brought in keeps formatting only: no form, no password field, no style that loads, no frame', r.strict);
    const typed = await tab.evaluate(async () => { const ed = document.getElementById('editor') || document.querySelector('[contenteditable="true"]'); if (!ed) return null; ed.focus(); document.execCommand('insertText', false, 'Hello from the Forge'); await new Promise(r => setTimeout(r, 300)); return /Hello from the Forge/.test(ed.innerText); });
    ok(typed === true, 'Tabula still takes typing and keeps its text', typed);
  }
  for (const [label, key] of [['Imago', 'slides'], ['Scriba', 'scriba'], ['Fontes', 'fontes'], ['Abacus', 'abacus']]) {
    const fr = await openApp(p, label, key);
    const s = fr ? await fr.evaluate(() => !!(window.IngSafe && IngSafe.html)) : false;
    ok(s, label + ' opens with the sanitiser in its window');
  }
  ok(!errs.length, 'no page errors', errs.slice(0, 4));
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed ' + e.stack); process.exit(2); });
