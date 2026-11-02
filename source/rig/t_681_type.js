// node rig/t_681_type.js <url> <out dir>  ·  6.8.1 (modules/r185.js): on every page and every room, no text inside a card falls to the page's own 16px; Settings pictured
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(process.argv[2]); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(900);
  const pages = await p.evaluate(() => [...document.querySelectorAll('.nav-btn[data-page]')].map(b => b.getAttribute('data-page')).filter((v, i, a) => a.indexOf(v) === i));
  const out = {};
  for (const pg of pages) {
    await p.evaluate(g => go(g), pg); await p.waitForTimeout(900);
    const rooms = await p.evaluate(() => { const s = document.querySelector('.main > section.active'); return s ? [...s.querySelectorAll('[role=tab]')].filter(t => t.offsetParent).map(t => t.textContent.trim()).slice(0, 12) : []; });
    for (const r of [''].concat(rooms)) {
      if (r) { await p.evaluate(r => { const s = document.querySelector('.main > section.active'); const t = [...s.querySelectorAll('[role=tab]')].find(x => x.textContent.trim() === r && x.offsetParent); if (t) t.click(); }, r); await p.waitForTimeout(400); }
      const f = await p.evaluate(() => { const sec = document.querySelector('.main > section.active'), res = []; if (!sec) return res;
        const tw = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT); let n;
        while ((n = tw.nextNode())) { if (!/\S/.test(n.nodeValue)) continue; const el = n.parentElement; if (!el.offsetParent || el.closest('iframe,svg,pre,code,textarea,.msg,.tour-card,[contenteditable],.l-paper,.doc,.stx-sr') || !el.closest('.card')) continue;
          const c = getComputedStyle(el); if (c.fontSize !== '16px') continue;
          let a = el, set = false; while (a && a !== document.body) { if (a.style && a.style.fontSize) { set = true; break; } const sh = [...document.styleSheets]; a = a.parentElement; }
          const card = el.closest('.card,section.sec,.panel,[class*=card]'); const h = card && card.querySelector('h2,h3'); 
          res.push((h ? h.textContent.trim().slice(0, 30) : (card ? card.className : '-')) + ' | ' + el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0] + ' | ' + c.fontFamily.split(',')[0] + ' ' + c.fontWeight + ' | ' + n.nodeValue.trim().slice(0, 40)); }
        return res; });
      if (f.length) out[pg + (r ? ' / ' + r : '')] = [...new Set(f)];
    }
  }
  fs.writeFileSync(OUT + '/type16.json', JSON.stringify(out, null, 1));
  const n = Object.values(out).reduce((a, v) => a + v.length, 0);
  for (const [k, v] of Object.entries(out)) console.log('FAIL ' + k + ': ' + v.length + ' at 16px, e.g. ' + v[0]);
  await p.evaluate(() => go('settings')); await p.waitForTimeout(700);
  for (const r of ['Everyday', 'Models and AI', 'Your data', 'Ownership']) { await p.evaluate(r => { const t = [...document.querySelectorAll('#page-settings [role=tab]')].find(x => x.textContent.trim() === r && x.offsetParent); if (t) t.click(); }, r); await p.waitForTimeout(500);
    await p.screenshot({ path: OUT + '/settings-' + r.replace(/\W+/g, '_') + '.png', fullPage: false }); }
  console.log(n ? n + ' texts fall to 16px: FAIL' : 'PASS no text inside a card falls to the page\'s 16px, on any page or room');
  await b.close(); process.exit(n ? 1 : 0);
})();
