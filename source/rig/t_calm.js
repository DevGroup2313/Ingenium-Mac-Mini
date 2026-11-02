const { start } = require('./lib.js');
(async () => {
  const { page, browser } = await start();
  const r = await page.evaluate(async () => {
    const out = {};
    for (const m of ['calm', 'full', 'minimal']) {
      document.body.setAttribute('data-motion', m); await new Promise(r => setTimeout(r, 400));
      const idle = document.querySelector('#brandSealBtn .isl-idle');
      const a = getComputedStyle(idle).transform; await new Promise(r => setTimeout(r, 900)); const b = getComputedStyle(idle).transform;
      out[m] = { anim: getComputedStyle(idle).animationName, moving: a !== b };
    }
    out.default = state.motion; return out; });
  console.log(JSON.stringify(r));
  await browser.close();
})();
