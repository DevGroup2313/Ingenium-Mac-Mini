// Draws the shield of a built Offline Project page (its crest, still, by day, without its ribbon) as a large picture, for the
// site's icons: node shield_shot.js INDEX.html OUT.png   (the site without Inkwell gives its icons the crest of three fields)
const pw = require('/opt/node-tools/node_modules/playwright');
const [PAGE, OUT] = process.argv.slice(2);
(async () => {
  const b = await pw.chromium.launch();
  const p = await b.newPage({ viewport: { width: 1000, height: 1300 }, deviceScaleFactor: 3, colorScheme: 'light', reducedMotion: 'reduce' });
  await p.goto(PAGE.includes('://') ? PAGE : 'file://' + PAGE); await p.waitForTimeout(2500);
  await p.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}.ms-tilt,.ms-idle,.ms-l{transform:none!important}.ms-cast,.ms-doors{display:none!important}body,#app,.wrap,.hall,.hero,#crest{background:transparent!important}' });
  await p.evaluate(() => { document.querySelectorAll('#crest .ms-l').forEach(l => { if (/OFFLINE · PROJECT/.test(l.textContent)) l.style.display = 'none'; }); });
  await p.waitForTimeout(400);
  await p.locator('#crest .ms').screenshot({ path: OUT, omitBackground: true });
  await b.close(); console.log('shield', OUT);
})().catch(e => { console.log('CRASH', e.message); process.exit(1); });
