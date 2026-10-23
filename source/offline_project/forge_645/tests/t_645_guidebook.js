// The Forge 645 · the Guidebook's entries laid out like the rest (blocks/forge_guidebook_fix.html), in Chromium. The owner's words
// (23 October 2026): "some of the new entries look weird and almost clipped out of the panel". Checks, at 1440 x 900 and 820 x 1180:
//   - every entry opened in turn: each list keeps room for its numbers and bullets, and nothing reaches past the panel;
//   - each entry's line in the list says what it is about (at least 25 letters);
//   - the search keeps a space above the first part;
//   - no page errors.
//   node tests/t_645_guidebook.js <url of the Forge page> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  for (const [W, H] of [[1440, 900], [820, 1180]]) {
    const ctx = await b.newContext({ viewport: { width: W, height: H } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    try {
      await p.goto(URL_); await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
      await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(800);
      await p.evaluate(() => document.getElementById('guide-btn').click()); await p.waitForTimeout(1000);
      await p.evaluate(() => document.querySelectorAll('.gb-part[data-open="0"] .gb-part-head').forEach(h => h.click())); await p.waitForTimeout(300);
      const prev = await p.evaluate(() => [...document.querySelectorAll('.gb-ch')].map(c => [c.querySelector('.gb-ch-t').textContent.slice(0, 40), c.querySelector('.gb-ch-s').textContent]));
      const weak = prev.filter(x => x[1].trim().length < 25);
      ok(prev.length >= 40 && !weak.length, W + ' wide: each of the ' + prev.length + ' entries says in its line what it is about', weak);
      const gap = await p.evaluate(() => { const s = document.getElementById('guideSearch'), f = document.querySelector('#guideToc .gb-part'); return s && f && s.offsetParent ? Math.round(f.getBoundingClientRect().top - s.getBoundingClientRect().bottom) : null; });
      ok(gap === null || gap >= 8, W + ' wide: the search keeps a space above the first part', gap);
      await p.screenshot({ path: path.join(OUT, 'list_' + W + '.png') });
      const bad = [];
      for (let i = 0; i < prev.length; i++) {
        await p.evaluate(i => { document.querySelectorAll('.gb-part[data-open="0"] .gb-part-head').forEach(h => h.click()); document.querySelectorAll('.gb-ch')[i].click(); }, i); await p.waitForTimeout(200);
        const r = await p.evaluate(() => { const art = [...document.querySelectorAll('#guide article')].find(a => a.offsetParent); if (!art) return { none: true };
          const panel = (art.closest('.forge-modal-body') || art.closest('.room-body') || document.body).getBoundingClientRect(); const out = [];
          for (const l of art.querySelectorAll('ol,ul')) { if (!l.offsetParent) continue; const cs = getComputedStyle(l); if (parseFloat(cs.paddingLeft) < 14 && cs.listStyleType !== 'none') out.push('a list without room for its marks'); }
          for (const e of art.querySelectorAll('*')) { if (!e.offsetParent) continue; const r = e.getBoundingClientRect(); if (r.right > panel.right - 4 || r.left < panel.left + 4) { out.push(e.tagName + ' past the panel'); break; } }
          return { t: (art.querySelector('h3') || {}).textContent, out }; });
        if (r.none || r.out.length) bad.push(r);
        if (/Fabrica, your workshop|screen reader/.test(r.t || '')) await p.screenshot({ path: path.join(OUT, 'entry_' + W + '_' + i + '.png') });
      }
      ok(!bad.length, W + ' wide: every entry opened in turn: each list keeps room for its numbers, nothing reaches past the panel', bad.slice(0, 4));
      ok(!errs.length, W + ' wide: no page errors', errs.slice(0, 3));
    } catch (e) { ok(false, W + ' wide: the run crashed', e.stack); }
    await ctx.close();
  }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
