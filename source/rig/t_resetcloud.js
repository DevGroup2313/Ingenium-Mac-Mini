const { start } = require('./lib.js');
(async () => { const { page, browser } = await start();
  await page.evaluate(() => { state.cloud = { provider: '', base: '', key: '', model: '', on: false }; state.chatSource = 'local'; state.projects = (state.projects || []).filter(p => p.name !== 'Inkwell'); state.chats = state.chats.filter(c => !(c.kind === 'code')); saveState(); });
  await page.waitForTimeout(1500); await browser.close(); })();
