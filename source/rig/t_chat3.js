const { start } = require('./lib.js');
(async () => {
  const { page, browser } = await start();
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  const out = {};
  out.part = await page.evaluate(() => window.__ingParts.p35);
  await page.evaluate(() => { window.__saved = []; const api = window.pywebview.api; api.save_file = (n, m, b) => { window.__saved.push({ n, m, len: b.length, head: atob(b.slice(0, 8)).slice(0, 4) }); return Promise.resolve('/tmp/' + n); }; });
  // a long conversation
  out.trim = await page.evaluate(() => { go('chat'); $('chatNew').click(); const c = curChat(); c.title = 'Long talk';
    const t0 = Date.now() - 3 * 864e5;
    for (let i = 0; i < 105; i++) c.messages.push(i % 2 ? { role: 'bot', text: 'Reply ' + i + ' with **bold** and a list:\n\n- one\n- two', at: t0 + i * 60000, done: t0 + i * 60000 + 5000, by: 'Scriba' } : { role: 'me', text: 'Question ' + i, at: t0 + i * 60000 });
    trimChat(); saveState(); renderChat();
    return { left: c.messages.length, earlier: c.earlier, firstLeft: c.messages[0].text, bar: (document.querySelector('.r3-earlier') || {}).textContent }; });
  await page.waitForTimeout(800);
  await page.click('.r3-earlier button'); await page.waitForTimeout(800);
  out.shown = await page.evaluate(() => ({ old: document.querySelectorAll('.r3-old .msg').length, first: (document.querySelector('.r3-old .msg') || {}).textContent.slice(0, 40), all: document.querySelectorAll('#chatScroll .msg').length, btn: document.querySelector('.r3-earlier button').textContent }));
  // saving
  for (const f of ['docx', 'pdf', 'md', 'txt']) await page.evaluate((f) => IngR103.save(curChat(), f), f);
  await page.waitForTimeout(1500);
  out.md = await page.evaluate(() => IngR103.md(curChat(), curChat().__old).split('\n').slice(0, 9).join(' | '));
  // the More menu
  await page.evaluate(() => { $('chatMoreBtn').click(); }); await page.waitForTimeout(200);
  await page.evaluate(() => $('chatDl').click()); await page.waitForTimeout(300);
  out.menu = await page.evaluate(() => [...document.querySelectorAll('#dlMenu .menu-btn')].map(b => b.textContent));
  await page.evaluate(() => [...document.querySelectorAll('#dlMenu .menu-btn')][0].click()); await page.waitForTimeout(1200);
  // backup export and the old plain download path go through Save
  await page.evaluate(() => exportApp()); await page.waitForTimeout(1200);
  out.saved = await page.evaluate(() => window.__saved);
  // the list's times
  await page.evaluate(() => { try { ccState().side = true; } catch (e) {} ccPaintSide(); const b = $('ccSideBtn'); if (b) b.click(); }); await page.waitForTimeout(500);
  out.rows = await page.evaluate(() => [...document.querySelectorAll('.cc-row')].slice(0, 4).map(r => [r.querySelector('.cc-open').textContent.slice(0, 20), (r.querySelector('.r3-when') || {}).textContent, (r.querySelector('.r3-when') || {}).title]));
  // the row menu
  await page.evaluate(() => { const k = document.querySelector('.cc-row .cc-more'); if (k) k.click(); }); await page.waitForTimeout(300);
  out.rowMenu = await page.evaluate(() => [...document.querySelectorAll('#ccMenu .menu-btn')].map(b => b.textContent));
  await page.screenshot({ path: process.env.S + '/shots/chat3_list.png' });
  // after a reload the earlier part is still there
  await page.reload(); await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await page.waitForTimeout(1500);
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); go('chat'); });
  await page.waitForTimeout(600);
  out.afterReload = await page.evaluate(() => { const c = state.chats.find(x => x.title === 'Long talk'); state.activeChat = c.id; renderChat(); return { left: c.messages.length, earlier: (c.earlier || []).length, bar: (document.querySelector('.r3-earlier') || {}).textContent }; });
  await page.click('.r3-earlier button'); await page.waitForTimeout(1000);
  out.reloadShown = await page.evaluate(() => document.querySelectorAll('.r3-old .msg').length);
  await page.screenshot({ path: process.env.S + '/shots/chat3_old.png' });
  out.errs = errs;
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})();
