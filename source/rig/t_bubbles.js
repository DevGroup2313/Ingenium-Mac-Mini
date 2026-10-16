// the chat's bubbles in each look, by day and night; and Chat after Code (the code keys must not follow)
const { start } = require('./lib.js');
const fs = require('fs');
(async () => {
  const TAG = process.env.TAG || 'before', O = process.env.S + '/shots/bubbles/';
  fs.mkdirSync(O, { recursive: true });
  const { page, browser } = await start({ viewport: { width: 1440, height: 900 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.evaluate(() => { go('chat'); const c = curChat(); c.messages = []; const t = Date.now() - 600e3;
    c.messages.push({ role: 'me', text: 'Could you draft a short note to my tutor about the reading list?', t: t });
    c.messages.push({ role: 'bot', text: 'Of course. Here is a first draft:\n\nDear Dr Hale, thank you for the reading list. I have begun with the two monographs on early modern print and would value a word about the order of the rest.', t: t + 20e3 });
    c.messages.push({ role: 'me', text: 'Make it a little warmer.', t: t + 60e3 });
    c.messages.push({ role: 'bot', text: 'Dear Dr Hale, thank you so much for the reading list; it is exactly what I hoped for.', t: t + 80e3 });
    c.title = 'Note to my tutor'; saveState(); renderChat(); });
  await page.waitForTimeout(600);
  const lum = c => { const m = c.match(/[\d.]+/g).map(Number); const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * f(m[0]) + .7152 * f(m[1]) + .0722 * f(m[2]); };
  for (const style of ['claude', 'soft', 'classic']) for (const theme of ['day', 'night']) {
    await page.evaluate(([s, t]) => { ccState().style = s; ccStyle(); state.theme = t; applyTheme(); renderChat(); }, [style, theme]);
    await page.waitForTimeout(500);
    const card = await page.$('#chatCol .chat-card');
    await card.screenshot({ path: O + TAG + '_' + style + '_' + theme + '.png' });
    const m = await page.evaluate(() => { const bgOf = e => { while (e) { const c = getComputedStyle(e).backgroundColor; if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return c; e = e.parentElement; } return 'rgb(255,255,255)'; };
      const me = document.querySelector('#page-chat .msg.me'), bot = document.querySelector('#page-chat .msg.bot');
      return { me: getComputedStyle(me).backgroundColor, meBorder: getComputedStyle(me).borderTopColor + ' ' + getComputedStyle(me).borderTopWidth, bot: getComputedStyle(bot).backgroundColor, behind: bgOf(me.parentElement), body: getComputedStyle(document.body).backgroundColor }; });
    console.log(style, theme, JSON.stringify(m));
  }
  // Chat after Code: the code keys must not stay in Chat's top row
  await page.evaluate(() => { ccState().style = 'soft'; ccStyle(); state.theme = 'day'; applyTheme(); go('code'); });
  await page.waitForTimeout(500);
  await page.evaluate(() => ccMakeProject('Tiny', [{ name: 'index.html', text: '<!doctype html><h1>Hi</h1>' }], 'index.html').then(ccNewSession));
  await page.waitForTimeout(1500);
  await page.evaluate(() => go('chat')); await page.waitForTimeout(800);
  const bar = await page.evaluate(() => { const b = document.getElementById('ccCodeBar'); return b ? { hidden: b.hidden, display: getComputedStyle(b).display, w: b.getBoundingClientRect().width } : null; });
  console.log('code keys in Chat after Code:', JSON.stringify(bar));
  await page.screenshot({ path: O + TAG + '_chat_after_code.png' });
  console.log('errors', errs);
  await browser.close();
})();
