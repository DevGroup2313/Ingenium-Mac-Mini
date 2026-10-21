// Ingenium 6.1 · the automated half of the accessibility audit: axe-core (Deque's rules, WCAG 2.1 A and AA) run on every
// page of the app, by day and by night, on a desktop window and on a phone. It writes one JSON report and prints, for each
// rule broken, how many elements break it and where. The other half is a real screen reader (orca_walk.js).
//   node rig/a11y/axe_walk.js <page url> <axe.min.js> <out folder> [the_forge]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], AXE = process.argv[3], OUT = process.argv[4], FORGE = process.argv[5] === 'the_forge';
fs.mkdirSync(OUT, { recursive: true });
const ING_PAGES = ['home', 'chat', 'code', 'focus', 'models', 'blend', 'lector', 'build', 'fabrica', 'guide', 'settings'];

async function ready(p) {
  if (FORGE) { await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 90000 }); await p.waitForTimeout(1200); return; }
  await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(600);
}
async function run(p, where) {
  await p.addScriptTag({ path: AXE });
  return p.evaluate(async (where) => {
    const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, resultTypes: ['violations'] });
    return r.violations.map(v => ({ where, id: v.id, impact: v.impact, help: v.help, n: v.nodes.length,
      nodes: v.nodes.slice(0, 8).map(n => ({ t: n.target.join(' '), html: n.html.slice(0, 220), why: (n.failureSummary || '').slice(0, 300) })) }));
  }, where);
}
(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const all = [];
  for (const vp of [{ name: 'desk', w: 1440, h: 900 }, { name: 'phone', w: 390, h: 844 }]) {
    for (const theme of ['day', 'night']) {
      const p = await b.newPage({ viewport: { width: vp.w, height: vp.h } });
      await p.goto(URL_); await ready(p);
      if (FORGE) {
        await p.evaluate(t => { try { state.theme = t === 'night' ? 'night' : 'light'; applyTheme(); } catch (e) { } }, theme);
        await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); });
        await p.waitForTimeout(900);
        const rooms = await p.evaluate(() => [...document.querySelectorAll('.nav-inner [data-room]')].filter(x => x.offsetParent).map(x => x.getAttribute('data-room')));
        for (const r of rooms.slice(0, 14)) {
          await p.evaluate(r => { const k = document.querySelector('.nav-inner [data-room="' + r + '"]'); if (k) k.click(); }, r); await p.waitForTimeout(900);
          all.push(...await run(p, `${vp.name}/${theme}/${r}`));
        }
      } else {
        await p.evaluate(t => { try { state.theme = t; applyTheme && applyTheme(); } catch (e) { } document.body.setAttribute('data-theme', t); }, theme);
        for (const pg of ING_PAGES) {
          await p.evaluate(pg => go(pg), pg); await p.waitForTimeout(900);
          all.push(...await run(p, `${vp.name}/${theme}/${pg}`));
        }
      }
      await p.close();
    }
  }
  fs.writeFileSync(path.join(OUT, 'axe.json'), JSON.stringify(all, null, 1));
  const byRule = {};
  all.forEach(v => { const k = v.id; byRule[k] = byRule[k] || { impact: v.impact, help: v.help, n: 0, where: new Set(), eg: v.nodes[0] }; byRule[k].n += v.n; byRule[k].where.add(v.where.split('/').slice(2).join('/')); });
  Object.entries(byRule).sort((a, b) => b[1].n - a[1].n).forEach(([k, v]) => console.log(`${v.impact}\t${k}\t${v.n}\t${v.help}\n\t on: ${[...v.where].join(', ')}\n\t e.g. ${v.eg.t}  ${v.eg.html.replace(/\s+/g, ' ').slice(0, 160)}`));
  console.log('rules broken:', Object.keys(byRule).length, ' elements:', all.reduce((a, v) => a + v.n, 0));
  await b.close();
})().catch(e => { console.log('crashed', e.stack); process.exit(1); });
