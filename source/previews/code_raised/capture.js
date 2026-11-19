// r335's preview: Code's start window and Vocatio's "Drop your files here", taken out of the running page (7.46 with r335 added), each with
// its ancestors (shallow) so every selector still matches, and every style rule that draws them by day and by night.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1280, height: 800 } })).newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  await p.waitForTimeout(800);
  // a chain: the element whole, each ancestor up to <html> shallow (its attributes only), so selectors that name ancestors still match
  const chainOf = (sel) => p.evaluate((sel) => { const el = document.querySelector(sel); if (!el) return null;
    const clean = (c) => { c.querySelectorAll('script,iframe,canvas,video,audio,object,embed,template').forEach((x) => x.remove()); [c, ...c.querySelectorAll('*')].forEach((x) => [...x.attributes].forEach((at) => { if (/^on/i.test(at.name)) x.removeAttribute(at.name); })); return c; };
    let inner = clean(el.cloneNode(true)).outerHTML, n = el.parentElement, chain = [];
    while (n && n !== document.body && n !== document.documentElement) { const sh = n.cloneNode(false); sh.removeAttribute('style'); sh.removeAttribute('hidden'); chain.push(sh.outerHTML.replace(/<\/[a-z0-9-]+>$/i, '')); n = n.parentElement; }
    let out = inner; chain.forEach((open) => { const tag = open.match(/^<([a-z0-9-]+)/i)[1]; out = open + out + '</' + tag + '>'; });
    const r = el.getBoundingClientRect(); return { html: out, w: Math.round(r.width), h: Math.round(r.height), body: [...document.body.attributes].filter((a) => a.name !== 'style').map((a) => [a.name, a.value]) }; }, sel);
  const MATCHED = new Set();
  const collect = (sel) => p.evaluate((sel) => { const root = document.querySelector(sel); if (!root) return [];
    const els = [root, ...root.querySelectorAll('*')]; for (let n = root.parentElement; n; n = n.parentElement) els.push(n);
    const DYN = /::?(?:hover|active|focus-visible|focus-within|focus|visited|before|after|placeholder|selection|marker|-webkit-[a-z-]+|-moz-[a-z-]+)(?![a-z-])/g;
    const split = (s) => { const out = []; let d = 0, cur = ''; for (const ch of s) { if (ch === '(' || ch === '[') d++; if (ch === ')' || ch === ']') d--; if (ch === ',' && d === 0) { out.push(cur); cur = ''; } else cur += ch; } out.push(cur); return out; };
    const hit = (s) => split(s).some((part) => { let q = part.replace(DYN, '').trim(); if (!q) return false; try { return els.some((e) => e.matches(q)); } catch (x) { return false; } });
    const keys = []; const walk = (list) => { for (const r of list) { if (r.type === CSSRule.MEDIA_RULE || r.type === CSSRule.SUPPORTS_RULE) { walk(r.cssRules); continue; }
      if (r.type === CSSRule.STYLE_RULE && hit(r.selectorText || '')) keys.push(r.cssText.slice(0, 400)); } };
    for (const sh of document.styleSheets) { if (sh.ownerNode && sh.ownerNode.id === 'r335-css') continue; try { walk(sh.cssRules); } catch (e) {} } return keys; }, sel).then((ks) => ks.forEach((k) => MATCHED.add(k)));
  const scenes = {};
  for (const theme of ['day', 'night']) {
    await p.evaluate((t) => { state.theme = t; try { applyTheme(); } catch (e) {} }, theme); await p.waitForTimeout(500);
    // Code's start window
    await p.evaluate(() => { go('code'); }); await p.waitForTimeout(900); await p.evaluate(() => { try { ccWelcome(); } catch (e) {} }); await p.waitForTimeout(900);
    await collect('#modalRoot'); scenes['code_' + theme] = await chainOf('#modalBox');
    await p.screenshot({ path: path.join(OUT, 'code_' + theme + '.png') });
    await p.evaluate(() => { try { closeModal(); } catch (e) {} });
    // Vocatio's drop zone
    await p.evaluate(() => { go('career'); }); await p.waitForTimeout(1500);
    let has = await p.evaluate(() => !!document.querySelector('.cn-drop'));
    if (!has) { await p.evaluate(() => { const k = [...document.querySelectorAll('#page-career button, #page-career [role=tab]')].find((x) => /what you have|step 1/i.test(x.textContent)); if (k) k.click(); }); await p.waitForTimeout(1200); has = await p.evaluate(() => !!document.querySelector('.cn-drop')); }
    if (has) { await p.evaluate(() => document.querySelector('.cn-drop').scrollIntoView({ block: 'center' })); await p.waitForTimeout(500);
      const cardSel = await p.evaluate(() => { const d = document.querySelector('.cn-drop'); const c = d.closest('.card, section, .c-panel') || d.parentElement; if (!c.id) c.id = 'r335PrevDropCard'; return '#' + c.id; });
      await collect(cardSel); scenes['drop_' + theme] = await chainOf(cardSel); await p.screenshot({ path: path.join(OUT, 'drop_' + theme + '.png') }); }
    console.log(theme, 'code', !!scenes['code_' + theme], 'drop', has);
  }
  const r335 = await p.evaluate(() => { const s = document.getElementById('r335-css'); return s ? s.textContent : ''; });
  const css = await p.evaluate((KEEPL) => { const KEEP = new Set(KEEPL); const rules = [], frames = {}, fonts = [];
    function walk(list, wrap) { for (const r of list) { if (r.type === CSSRule.KEYFRAMES_RULE) { frames[r.name] = r.cssText; continue; }
        if (r.type === CSSRule.MEDIA_RULE || r.type === CSSRule.SUPPORTS_RULE) { const t = r.cssText; walk(r.cssRules, wrap.concat([t.slice(0, t.indexOf('{')).trim()])); continue; }
        if (r.type === CSSRule.FONT_FACE_RULE) { fonts.push(r.cssText); continue; }
        if (r.type === CSSRule.STYLE_RULE) { const s = r.selectorText || ''; const tok = /^(:root|html|body)(\[data-theme="night"\])?$/.test(s.trim()) || /^body\[data-theme="night"\]$/.test(s.trim());
          if (KEEP.has(r.cssText.slice(0, 400)) || tok) { let t = r.cssText; for (let i = wrap.length - 1; i >= 0; i--) t = wrap[i] + '{' + t + '}'; rules.push(t); } } } }
    for (const sh of document.styleSheets) { if (sh.ownerNode && sh.ownerNode.id === 'r335-css') continue; try { walk(sh.cssRules, []); } catch (e) {} } return { rules, frames, fonts }; }, [...MATCHED]);
  const used = new Set(); css.rules.forEach((t) => { const m = t.match(/animation(-name)?\s*:\s*([^;}]+)/g); (m || []).forEach((x) => x.split(':')[1].split(/[ ,]+/).forEach((w) => used.add(w.trim()))); });
  const frames = Object.keys(css.frames).filter((n) => used.has(n)).map((n) => css.frames[n]);
  const fams = new Set(); css.rules.forEach((t) => { const m = t.match(/font(-family)?\s*:[^;}]+/g); (m || []).forEach((x) => x.replace(/^[^:]+:/, '').split(',').forEach((f) => fams.add(f.replace(/["']/g, '').trim().toLowerCase()))); });
  const fonts = css.fonts.filter((f) => { const m = f.match(/font-family:\s*"?([^";]+)"?/); return m && [...fams].some((x) => x.indexOf(m[1].toLowerCase()) >= 0); });
  fs.writeFileSync(path.join(OUT, 'parts.json'), JSON.stringify({ scenes, rules: css.rules, frames, fonts, r335 }));
  console.log('rules', css.rules.length, 'frames', frames.length, 'fonts', fonts.length, Math.round(fonts.join('').length / 1024) + 'KB', 'r335', r335.length, 'errors', JSON.stringify(errs.slice(0, 3)));
  await b.close(); })().catch((e) => { console.error(e); process.exit(2); });
