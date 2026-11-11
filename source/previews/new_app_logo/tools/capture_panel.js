// Her real Fabrica, with its A new app panel open, taken from the running app by day and by night, for a live preview:
//  - a picture of the page behind the panel (the panel hidden while it is taken);
//  - the panel itself, as Ingenium drew it, with the chain of elements it stands in and the style rules that draw them (each rule
//    kept when its selector, without its pseudo-classes, matches the panel, one of its ancestors, the page or the body; @media and
//    @supports kept around the rules they hold; the @keyframes and @font-face those rules use).
//   node capture_panel.js <Ingenium page url (6.74 or later)> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2);
if (!URL_ || !OUT) { console.log('usage: node capture_panel.js <page url> <out folder>'); process.exit(2); }
(async () => {
  const b = await pw.chromium.launch(); fs.mkdirSync(OUT, { recursive: true }); const info = { css: [], themes: {} };
  for (const th of ['day', 'night']) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 }); await p.waitForTimeout(700);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(300);
    await p.evaluate((th) => { try { tourEnd && tourEnd(); } catch (e) {} state.theme = th; applyTheme(); go('fabrica'); }, th); await p.waitForTimeout(2200);
    await p.evaluate(() => document.getElementById('fbNew').click()); await p.waitForTimeout(1200);
    // the page behind the panel
    await p.evaluate(() => { const w = document.querySelector('#fb .f-sheet').closest('.f-sheet-wrap') || document.querySelector('#fb .f-sheet'); w.style.visibility = 'hidden'; });
    await p.mouse.move(1430, 890); await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(OUT, 'behind_' + th + '.jpg'), type: 'jpeg', quality: 86 });
    await p.evaluate(() => { const w = document.querySelector('#fb .f-sheet').closest('.f-sheet-wrap') || document.querySelector('#fb .f-sheet'); w.style.visibility = ''; });
    const got = await p.evaluate(() => {
      const sheet = document.querySelector('#fb .f-sheet'), wrap = sheet.closest('.f-sheet-wrap') || sheet;
      const chain = []; for (let e = wrap.parentElement; e && e !== document.documentElement; e = e.parentElement) {
        const at = {}; [...e.attributes].forEach(a => { if (a.name !== 'style' || e === document.body || e.id === 'fb') at[a.name] = a.value; }); chain.unshift({ tag: e.tagName.toLowerCase(), at }); }
      const els = [document.documentElement, document.body, ...[...document.querySelectorAll('*')].filter(e => e.contains(wrap) || wrap.contains(e))];
      const strip = (s) => s.replace(/::?[a-zA-Z-]+(\((?:[^()]|\([^()]*\))*\))?/g, (m) => /^:(is|where|not)\(/.test(m) ? m : '').trim();
      const hits = (sel) => { return sel.split(',').some(part => { let q = strip(part); if (!q) q = '*'; try { return els.some(e => e.matches(q)); } catch (x) { return false; } }); };
      const out = [], frames = new Set(), fams = new Set(); let order = 0;
      const walk = (rules, wrapIn) => { for (const r of rules) {
        if (r instanceof CSSStyleRule) { if (hits(r.selectorText)) { out.push({ i: order++, t: wrapIn ? wrapIn(r.cssText) : r.cssText });
            const an = r.style.getPropertyValue('animation-name') || r.style.getPropertyValue('animation') || ''; an.split(/[\s,]+/).forEach(n => { if (n) frames.add(n); });
            const ff = r.style.getPropertyValue('font-family') || r.style.getPropertyValue('font') || ''; ff.split(',').forEach(f => fams.add(f.replace(/["']/g, '').trim().split(' ').slice(-3).join(' '))); } }
        else if (r instanceof CSSMediaRule) { const m = r.media.mediaText; walk(r.cssRules, (t) => '@media ' + m + '{' + (wrapIn ? wrapIn(t) : t) + '}'); }
        else if (typeof CSSSupportsRule !== 'undefined' && r instanceof CSSSupportsRule) { const c = r.conditionText; walk(r.cssRules, (t) => '@supports ' + c + '{' + (wrapIn ? wrapIn(t) : t) + '}'); }
      } };
      const sheets = [...document.styleSheets]; for (const s of sheets) { try { walk(s.cssRules, null); } catch (x) { } }
      // the variables and animations its rules use come from rules kept above; the keyframes and fonts they name
      const extra = []; for (const s of sheets) { let rs; try { rs = s.cssRules; } catch (x) { continue; } for (const r of rs) {
        if (r instanceof CSSKeyframesRule && [...frames].some(n => n.indexOf(r.name) >= 0 || r.name === n)) extra.push(r.cssText);
        if (r instanceof CSSFontFaceRule) { const fam = (r.style.getPropertyValue('font-family') || '').replace(/["']/g, '').trim(); if (fam && [...fams].some(f => f && (f.indexOf(fam) >= 0 || fam.indexOf(f) >= 0))) extra.push(r.cssText); } } }
      const keep = []; document.querySelectorAll('#fb .f-sw button').forEach(x => keep.push(x.getAttribute('aria-label')));
      return { chain, html: wrap.outerHTML, css: out.map(o => o.t), extra, frames: [...frames], body: { theme: document.body.getAttribute('data-theme') }, swatches: keep,
        rect: (() => { const r = wrap.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height, pos: getComputedStyle(wrap).position }; })() };
    });
    info.themes[th] = { chain: got.chain, html: got.html, body: got.body, rect: got.rect, swatches: got.swatches };
    info.css.push(...got.css, ...got.extra);
    console.log(th, 'rules', got.css.length, 'extra', got.extra.length, 'html', got.html.length, 'wrap', JSON.stringify(got.rect));
    await ctx.close();
  }
  info.css = [...new Set(info.css)];
  fs.writeFileSync(path.join(OUT, 'panel.json'), JSON.stringify(info));
  console.log('css rules kept', info.css.length, 'bytes', info.css.join('\n').length);
  await b.close();
})().catch(e => { console.error(e); process.exit(2); });
