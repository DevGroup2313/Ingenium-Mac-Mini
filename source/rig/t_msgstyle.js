// computed look of her message and the model's in each chat look, by day and night
const { start } = require('./lib.js');
(async () => {
  const { page, browser } = await start({ viewport: { width: 1440, height: 900 } });
  await page.evaluate(() => { go('chat'); const c = curChat(); c.messages = [{ role: 'me', text: 'Could you draft a short note to my tutor?', t: Date.now() - 6e4 }, { role: 'bot', text: 'Of course. Dear Dr Hale, thank you for the reading list.', t: Date.now() - 3e4 }]; renderChat(); });
  await page.waitForTimeout(500);
  for (const style of (process.env.STYLES || 'classic,soft,claude').split(',')) for (const theme of ['day', 'night']) {
    await page.evaluate(([s, t]) => { ccState().style = s; ccStyle(); state.theme = t; applyTheme(); renderChat(); }, [style, theme]);
    await page.waitForTimeout(400);
    const m = await page.evaluate(() => { const g = e => { const c = getComputedStyle(e); return { bg: c.backgroundColor, img: c.backgroundImage.slice(0, 70), border: c.borderTopWidth + ' ' + c.borderTopStyle + ' ' + c.borderTopColor, shadow: c.boxShadow.slice(0, 160), radius: c.borderTopLeftRadius, pad: c.padding, color: c.color }; };
      const me = document.querySelector('#page-chat .msg.me'), bot = document.querySelector('#page-chat .msg.bot:not(.r3-earlier)');
      let e = me.parentElement, behind = ''; while (e) { const c = getComputedStyle(e).backgroundColor; if (!/rgba\(0, 0, 0, 0\)/.test(c)) { behind = c; break; } e = e.parentElement; }
      return { behind, me: g(me), bot: g(bot) }; });
    console.log(style, theme, JSON.stringify(m));
  }
  await browser.close();
})();
