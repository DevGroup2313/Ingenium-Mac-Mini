// Code page as in her screenshots: empty session (composer placement), long session (code keys, column edge), nav open or folded
const { start } = require('./lib.js');
const fs = require('fs');
(async () => {
  const W = +(process.env.W || 1600), H = +(process.env.H || 1000), NAV = process.env.NAV || 'open', TAG = process.env.TAG || 'before', O = process.env.S + '/shots/code2/';
  fs.mkdirSync(O, { recursive: true });
  const { page, browser } = await start({ viewport: { width: W, height: H } }); await page.evaluate(s => { window.__style = s; }, process.env.STYLE || 'soft');
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  const dir = process.env.S + '/inkwell_in/' + fs.readdirSync(process.env.S + '/inkwell_in').find(d => fs.existsSync(process.env.S + '/inkwell_in/' + d) && fs.statSync(process.env.S + '/inkwell_in/' + d).isDirectory() && fs.readdirSync(process.env.S + '/inkwell_in/' + d).some(f => /\.html$/.test(f)));
  const app = fs.readFileSync(dir + '/' + fs.readdirSync(dir).find(f => /\.html$/.test(f)), 'utf8');
  await page.evaluate((nav) => { ccState().style = (window.__style||'soft'); ccStyle(); state.theme = 'day'; applyTheme(); state.navCollapsed = nav !== 'open'; applyCollapse(); go('chat'); }, NAV);
  await page.waitForTimeout(600);
  const meas = () => page.evaluate(() => { const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [b.left | 0, b.top | 0, b.width | 0, b.height | 0]; };
    return { mode: document.body.getAttribute('data-chatmode'), blank: document.body.classList.contains('cc-blank'), navC: document.body.classList.contains('nav-collapsed'), scrollH: document.documentElement.scrollHeight, inner: innerHeight,
      card: r('#chatCol .chat-card'), scroll: r('#chatScroll'), hello: r('.cc-hello'), comp: r('#page-chat .composer'), top: r('#page-chat .chat-top'), bar: r('#ccCodeBar'),
      keys: [...document.querySelectorAll('#page-chat .chat-top > *')].filter(b => b.offsetParent).map(b => [b.id || b.className.split(' ')[0], (b.textContent || '').trim().slice(0, 14), b.getBoundingClientRect().width | 0, b.getBoundingClientRect().height | 0]),
      topCls: (document.querySelector('#page-chat .chat-top') || {}).className, overlap: (() => { const ks = [...document.querySelectorAll('#page-chat .chat-top > *, #ccCodeBar > *')].filter(b => b.offsetParent && b.id !== 'ccCodeBar' && b.getBoundingClientRect().width > 2).map(b => [b.id || b.textContent.trim().slice(0, 10), b.getBoundingClientRect()]).sort((a, b) => a[1].left - b[1].left); const o = []; for (let i = 1; i < ks.length; i++) if (ks[i][1].left < ks[i - 1][1].right - 1) o.push(ks[i - 1][0] + '|' + ks[i][0]); const card = document.querySelector('#chatCol .chat-card').getBoundingClientRect(); ks.forEach(k => { if (k[1].right > card.right + 1) o.push(k[0] + ' past the card'); }); return o; })(), barBtns: [...document.querySelectorAll('#ccCodeBar button')].map(b => [b.textContent.trim(), b.getBoundingClientRect().width | 0, b.getBoundingClientRect().height | 0]) }; });
  await page.screenshot({ path: O + TAG + '_' + (process.env.STYLE || 'soft') + '_' + NAV + '_' + W + '_chat_empty.png' });
  console.log('chat empty', JSON.stringify(await meas()));
  await page.evaluate(() => go('code')); await page.waitForTimeout(600);
  await page.evaluate((html) => ccMakeProject('Inkwell', [{ name: 'inkwell.html', text: html }], 'inkwell.html').then(ccNewSession), app);
  await page.waitForTimeout(2500);
  await page.screenshot({ path: O + TAG + '_' + (process.env.STYLE || 'soft') + '_' + NAV + '_' + W + '_code_empty.png' });
  console.log('code empty', JSON.stringify(await meas()));
  await page.evaluate(() => { const c = curChat(); const t = Date.now() - 3600e3; for (let i = 0; i < 16; i++) { c.messages.push({ role: 'me', text: 'Please explain part ' + (i + 1) + ' of how this app is put together.', t: t + i * 60e3 }); c.messages.push({ role: 'bot', text: '## Part ' + (i + 1) + '\n\n- **Frontend:** HTML, CSS and JavaScript in one file for simplicity.\n- **Storage:** IndexedDB keeps every document on the device.\n- **Security:** no sign-in; privacy by default.\n\nThat is the shape of it.', t: t + i * 60e3 + 30e3 }); } c.title = 'Carpe Diem project review'; saveState(); renderChat(); });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: O + TAG + '_' + (process.env.STYLE || 'soft') + '_' + NAV + '_' + W + '_code_long.png' });
  console.log('code long', JSON.stringify(await meas()));
  console.log('errors', errs);
  await browser.close();
})();
