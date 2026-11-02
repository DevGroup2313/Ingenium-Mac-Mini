const { openApp } = require('./bridge.js');
(async () => {
  const S = process.env.S;
  const { browser, page, logs } = await openApp();
  await page.waitForTimeout(8000);
  await page.screenshot({ path: S + '/shots/p1_home.png' });
  const info = await page.evaluate(() => ({
    title: document.title,
    parts: window.__ingParts,
    models: (state.models || []).map(m => ({ id: m.id, name: m.customName, ctx: m.ctx, tokens: m.tokens, lineup: m.lineup, fileState: m.fileState })),
    active: state.activeModelId,
    desk: typeof deskEngine !== 'undefined' ? deskEngine : null,
    ver: (document.body.innerText.match(/Version [0-9.]+[^\n]*/) || [])[0]
  }));
  console.log(JSON.stringify(info, null, 1));
  console.log(logs.slice(0, 40).join('\n'));
  await browser.close();
})();
