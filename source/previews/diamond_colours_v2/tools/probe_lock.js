const pw = require('/opt/node-tools/node_modules/playwright');
(async () => { const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage(); p.setDefaultTimeout(180000);
  await p.goto(process.argv[2], { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(2500);
  const out = {};
  for (const th of ['day', 'night']) {
    await p.evaluate(t => { try { state.theme = t; applyTheme(); } catch (e) { document.body.setAttribute('data-theme', t); } }, th); await p.waitForTimeout(800);
    out[th] = await p.evaluate(() => { const b = document.getElementById('introProtect'); if (!b) return 'no lock key (the door may be closed)'; const pill = b.parentElement, corner = pill.parentElement, svg = b.querySelector('svg');
      const pick = (e, ks) => { const cs = getComputedStyle(e), o = {}; ks.forEach(k => o[k] = cs[k]); const r = e.getBoundingClientRect(); o.box = [Math.round(r.width), Math.round(r.height)]; return o; };
      return { corner: pick(corner, ['top', 'right', 'left', 'position']), pill: pick(pill, ['display', 'gap', 'padding', 'border', 'borderRadius', 'backgroundColor', 'backgroundImage', 'boxShadow', 'backdropFilter']),
        btn: pick(b, ['width', 'height', 'padding', 'border', 'borderRadius', 'color', 'backgroundColor', 'backgroundImage', 'boxShadow', 'fontSize', 'lineHeight', 'display', 'alignItems', 'justifyContent', 'transition']), svg: pick(svg, ['width', 'height']), cls: pill.className }; });
    const r = await p.evaluate(() => { const b = document.getElementById('introProtect'); if (!b) return null; const r = b.parentElement.getBoundingClientRect(); return { x: r.left - 20, y: r.top - 20, width: r.width + 40, height: r.height + 40 }; });
    if (r) await p.screenshot({ path: process.argv[3] + '_' + th + '.png', clip: r });
  }
  console.log(JSON.stringify(out, null, 1)); await b.close(); })();
