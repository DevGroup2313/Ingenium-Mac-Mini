// The mark and the name on the Scriba and Fontes keys (Ingenium 6.9.7, modules/r193.js). Her words (3 November 2026): "There is a huge
// gap between the apps names and their symbols for Scriba and Fontes, please fix it. I want full parity with Carpe Diem's Magister dock
// buttons from the Home page." Carpe Diem's keys (as the Forge carries them: .scriba-app-btn, .fontes-btn) are inline-flex with a gap
// of 4 pixels and no margin on the mark; Scriba has 12 pixels on its left and 14 on its right.
//   node rig/t_697_stone_gap.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage();
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(800); await p.evaluate(() => go('home')); await p.waitForTimeout(500);
  const m = await p.evaluate(() => ['scriba', 'fontes'].map((k) => { const btn = document.querySelector('.dock .nav-btn.ing-stone[data-page="' + k + '"]'), B = btn.getBoundingClientRect(), sv = btn.querySelector('svg.ing-stone-sym').getBoundingClientRect();
    const tn = [...btn.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim())[0], rg = document.createRange(); rg.selectNodeContents(tn); const tq = rg.getBoundingClientRect(), cs = getComputedStyle(btn);
    return { k, gap: Math.round((tq.left - sv.right) * 10) / 10, left: Math.round((sv.left - B.left) * 10) / 10, right: Math.round((B.right - tq.right) * 10) / 10, padL: cs.paddingLeft, padR: cs.paddingRight, mid: Math.round(Math.abs((sv.top + sv.bottom) / 2 - (tq.top + tq.bottom) / 2) * 10) / 10 }; }));
  m.forEach((x) => ok(Math.abs(x.gap - 4) <= 0.6 && x.mid <= 1.5, x.k + ': the mark sits 4 pixels from the name, centred with it, as on Carpe Diem\'s keys', x));
  ok(m[0].padL === '12px' && m[0].padR === '14px' && m[1].padL === '14px' && m[1].padR === '14px', 'Scriba has 12 pixels on its left and 14 on its right; Fontes 14 on each side, as on Carpe Diem\'s keys', m.map((x) => x.k + ' ' + x.padL + '/' + x.padR));
  for (const k of ['scriba', 'fontes']) await p.locator('.dock .nav-btn.ing-stone[data-page="' + k + '"]').screenshot({ path: OUT + '/' + k + '_key.png' }).catch(() => {});
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
