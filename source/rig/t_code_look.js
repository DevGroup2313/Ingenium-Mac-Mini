const { start } = require('./lib.js');
const fs = require('fs');
(async () => {
  const W = +(process.env.W || 1440), H = +(process.env.H || 900), O = process.env.S + '/shots/code/';
  fs.mkdirSync(O, { recursive: true });
  const { page, browser } = await start({ viewport: { width: W, height: H } });
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  const app = fs.readFileSync(process.env.S + '/inkwell_in/' + fs.readdirSync(process.env.S + '/inkwell_in').find(d => fs.readdirSync(process.env.S + '/inkwell_in/' + d).some(f => /\.html$/.test(f))) + '/' + fs.readdirSync(process.env.S + '/inkwell_in/' + fs.readdirSync(process.env.S + '/inkwell_in').find(d => fs.readdirSync(process.env.S + '/inkwell_in/' + d).some(f => /\.html$/.test(f)))).find(f => /\.html$/.test(f)), 'utf8');
  await page.evaluate(() => { state.theme = 'night'; applyTheme(); go('code'); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: O + W + '_empty.png' });
  await page.evaluate((html) => ccMakeProject('Inkwell', [{ name: 'inkwell.html', text: html }], 'inkwell.html').then(ccNewSession), app);
  await page.waitForTimeout(2500);
  await page.screenshot({ path: O + W + '_app.png' });
  const m = await page.evaluate(() => { const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [b.left | 0, b.top | 0, b.width | 0, b.height | 0]; };
    return { mode: document.body.getAttribute('data-chatmode'), cls: document.body.className, scrollH: document.documentElement.scrollHeight, inner: innerHeight, col: r('#chatCol'), card: r('#chatCol .chat-card'), wrap: r('#page-chat .chat-wrap'), side: r('#ccSide'), pane: r('#csPane'), top: r('#page-chat .chat-top'), topH: (document.querySelector('#page-chat .chat-top') || {}).scrollHeight, bar: r('#ccCodeBar'), barBtns: [...document.querySelectorAll('#ccCodeBar button')].map(b => [b.textContent.trim(), b.getBoundingClientRect().height | 0]) }; });
  console.log(JSON.stringify(m));
  // open the list of sessions
  console.log('btn', await page.evaluate(() => { const b = document.getElementById('ccSideBtn'); return b ? [b.hidden, b.getBoundingClientRect().width, getComputedStyle(b).display, ccState().side] : null; }));
  try { await page.click('#ccSideBtn', { timeout: 3000 }); } catch (e) { console.log('click failed', e.message.slice(0, 80)); }
  await page.waitForTimeout(800);
  await page.screenshot({ path: O + W + '_side.png' });
  const m2 = await page.evaluate(() => { const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [b.left | 0, b.top | 0, b.width | 0, b.height | 0]; };
    return { cls: document.body.className, scrollH: document.documentElement.scrollHeight, side: r('#ccSide'), card: r('#chatCol .chat-card'), pane: r('#csPane'), wrap: r('#page-chat .chat-wrap') }; });
  console.log(JSON.stringify(m2), errs);
  await browser.close();
})();
