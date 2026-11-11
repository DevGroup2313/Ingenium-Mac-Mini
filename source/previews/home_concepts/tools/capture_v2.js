// her real Ingenium for the preview, taken from the running app, by day and by night:
//  - pictures of the parts the preview leaves as they are: the top bar, the side list, the side buttons, the page's own backdrop and
//    the rest of Home below its head (where you left off, your apps, the Offline Project, models and engine)
//  - the genuine parts the preview shows live: the seal key (R104's layered seal with R175's press flourishes), the next-step card,
//    the six room keys' words and icons, the greeting's words, with the style rules that draw them
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
(async () => {
  const b = await pw.chromium.launch(); fs.mkdirSync(OUT, { recursive: true }); const info = {};
  for (const th of ['day', 'night']) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(300);
    await p.evaluate((th) => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = th; applyTheme(); go('home'); }, th);
    await p.waitForTimeout(2600);
    await p.evaluate(() => { const c = document.getElementById('hxPlaque'); if (c) c.scrollIntoView(); }); await p.waitForTimeout(1600);
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(900);
    const g = await p.evaluate(() => {
      const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.left + scrollX, y: b.top + scrollY, w: b.width, h: b.height }; };
      let bar = null; for (let e = document.elementFromPoint(720, 6); e && e !== document.body; e = e.parentElement) {
        const cs = getComputedStyle(e); if ((cs.position === 'fixed' || cs.position === 'sticky') && e.getBoundingClientRect().width > 1200) bar = e; }
      let rail = null; for (let e = document.elementFromPoint(60, 400); e && e !== document.body; e = e.parentElement) {
        const cs = getComputedStyle(e); if (cs.position === 'fixed' || cs.position === 'sticky') rail = e; }
      const bs = getComputedStyle(document.body), hs = getComputedStyle(document.documentElement);
      return { hx: r(document.getElementById('hx')), recent: r(document.querySelector('#hx .hx-recent')), head: r(document.querySelector('#hx .hx-head')),
        bar: r(bar), barId: bar ? (bar.id || bar.className) : '', barPos: bar ? getComputedStyle(bar).position : '',
        rail: r(rail), railId: rail ? (rail.id || rail.className) : '', railPos: rail ? getComputedStyle(rail).position : '',
        bodyBg: bs.backgroundColor, bodyImg: bs.backgroundImage.slice(0, 160), bodyAtt: bs.backgroundAttachment, htmlBg: hs.backgroundColor, htmlImg: hs.backgroundImage.slice(0, 160),
        sealKey: r(document.getElementById('hxSealKey')) };
    });
    info[th] = g; console.log(th, JSON.stringify(g));
    const T = Math.round(g.bar ? g.bar.y + g.bar.h : 41), L = Math.round(g.hx.x - 8), RX = Math.round(g.hx.x + g.hx.w + 8);
    g.T = T; g.L = L; g.RX = RX;
    await p.screenshot({ path: path.join(OUT, 'top_' + th + '.png'), clip: { x: 0, y: 0, width: 1440, height: T } });
    await p.screenshot({ path: path.join(OUT, 'rail_' + th + '.png'), clip: { x: 0, y: T, width: L, height: 900 - T } });
    await p.screenshot({ path: path.join(OUT, 'right_' + th + '.png'), clip: { x: RX, y: T, width: 1440 - RX, height: 900 - T } });
    // the rest of Home below its head and its work keys, with the floating side buttons out of the way
    await p.addStyleTag({ content: '#fabBell,#fabTheme,#fabTimer,#fabNote,#fabPark,#fabQuiet,#railChevron,.rail-btn{visibility:hidden !important}' });
    await p.waitForTimeout(200);
    await p.screenshot({ path: path.join(OUT, 'rest_' + th + '.png'), fullPage: true, clip: { x: Math.round(g.recent.x - 14), y: Math.round(g.recent.y - 10), width: Math.round(g.hx.w + 28), height: Math.round(g.hx.y + g.hx.h - g.recent.y + 30) } });
    // the page's own backdrop behind Home, with everything on it hidden
    await p.addStyleTag({ content: 'body > *{visibility:hidden !important}' }); await p.waitForTimeout(200);
    await p.screenshot({ path: path.join(OUT, 'back_' + th + '.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, 'geometry.json'), JSON.stringify(info, null, 1));

  // the genuine parts, by day (their night looks are in the same rules)
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }); const p = await ctx.newPage();
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); await p.waitForTimeout(300);
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = 'day'; applyTheme(); go('home'); });
  await p.waitForTimeout(2500);
  const out = await p.evaluate(() => {
    const keep = /\.isl\b|\.isl-|r175-|\.s4-|seal-spin|seal-heart|seal-counter|seal3d|hx-next|hx-btn|hx-row|heroStepNote|heroNext|homeTour/;
    const frames = {}, rules = [], vars = {};
    function walk(list, wrap) {
      for (const r of list) {
        if (r.type === CSSRule.KEYFRAMES_RULE) { if (!frames[r.name]) frames[r.name] = r.cssText; continue; }
        if (r.cssRules && r.type !== CSSRule.STYLE_RULE) { const t = r.cssText; walk(r.cssRules, wrap.concat([t.slice(0, t.indexOf('{')).trim()])); continue; }
        if (r.type !== CSSRule.STYLE_RULE) continue;
        const sel = r.selectorText;
        if (!wrap.length && (sel === '.hx' || sel === 'body[data-theme="night"] .hx' || /--x-(sans|serif)\s*:/.test(r.cssText))) {
          for (let i = 0; i < r.style.length; i++) { const n = r.style[i]; if (n.indexOf('--x-') === 0) { (vars[sel] = vars[sel] || {})[n] = r.style.getPropertyValue(n).trim(); } } }
        if (keep.test(sel)) rules.push(wrap.slice().reverse().reduce((a, w) => w + '{' + a + '}', r.cssText));
      }
    }
    for (const s of document.styleSheets) { try { walk(s.cssRules, []); } catch (e) {} }
    const used = Object.keys(frames).filter(n => rules.some(t => new RegExp('(^|[^\\w-])' + n + '([^\\w-]|$)').test(t)));
    const key = document.getElementById('hxSealKey'), nx = document.querySelector('#hx .hx-next');
    const keys = [...document.querySelectorAll('#hx .hx-keys .hx-key')].map(k => ({
      h: (k.querySelector('.hx-kh') || {}).textContent || '', d: (k.querySelector('.hx-kd') || {}).textContent || '', m: (k.querySelector('.hx-km') || {}).textContent || '',
      icon: (k.querySelector('.hx-jewel .oxo-ico > svg') || k.querySelector('.hx-jewel svg') || { outerHTML: '' }).outerHTML, id: k.id || '', go: k.getAttribute('data-go') || k.getAttribute('onclick') || '' }));
    const hello = document.getElementById('hxHello'), date = document.getElementById('hxDate'), lede = document.querySelector('#hx .hx-lede');
    return { key: key ? key.outerHTML : '', next: nx ? nx.outerHTML : '', rules, frames: used.map(n => frames[n]), frameNames: used, vars, keys,
      hello: hello && hello.textContent, date: date && date.textContent, lede: lede && lede.textContent };
  });
  fs.writeFileSync(path.join(OUT, 'parts.json'), JSON.stringify(out, null, 1));
  console.log('rules', out.rules.length, 'frames', out.frameNames.join(','), 'vars', Object.keys(out.vars).map(k => k + ':' + Object.keys(out.vars[k]).length).join(' | '));
  console.log('keys', JSON.stringify(out.keys.map(k => [k.h, k.m, k.d.slice(0, 60), k.icon.length])));
  await b.close();
})();
