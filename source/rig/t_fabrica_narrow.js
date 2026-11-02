// R123: on a narrow screen Fabrica always opens on Your apps (a phone and an upright tablet), even after another panel was left open
// node rig/t_fabrica_narrow.js <url> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const OUT = process.argv[3]; let pass = 0, fail = 0;
const ok = (c, t, x) => { console.log((c ? 'PASS ' : 'FAIL ') + t + (x ? '  ' + x : '')); c ? pass++ : fail++; };
(async () => { const b = await pw.chromium.launch();
  for (const [w, h, nm] of [[390, 844, 'phone'], [800, 1280, 'upright tablet']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(process.argv[2]); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 60000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { try { hideIntro(); } catch (e) {} });
    const tab = () => p.evaluate(() => ({ sel: [...document.querySelectorAll('#fbTabs button')].filter(x => x.getAttribute('aria-selected') === 'true').map(x => x.dataset.p).join(), shown: [...document.querySelectorAll('#fb .f-pn')].filter(x => getComputedStyle(x).display !== 'none').map(x => x.id).join(), one: document.getElementById('fb').classList.contains('f-one') }));
    await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1500);
    const t1 = await tab();
    ok(t1.one && t1.sel === 'apps' && t1.shown === 'fbApps', nm + ': Fabrica opens on Your apps', JSON.stringify(t1));
    if (nm === 'phone') await p.screenshot({ path: OUT + '/fab-narrow-open.png' });
    await p.evaluate(() => [...document.querySelectorAll('#fbTabs button')].find(x => x.dataset.p === 'ship').click()); await p.waitForTimeout(300);
    await p.evaluate(() => go('home')); await p.waitForTimeout(500); await p.evaluate(() => go('fabrica')); await p.waitForTimeout(1200);
    const t2 = await tab();
    ok(t2.sel === 'apps' && t2.shown === 'fbApps', nm + ': and again on Your apps after another panel was left open', JSON.stringify(t2));
    await p.close();
  }
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); })().catch(e => { console.log('CRASH', e.message); process.exit(1); });
