// Fabrica's plan, stage 1, as it really is (modules/r333.js on the built page), filled with an invented app, taken out of the running page
// for its live preview: at each step, the top bar, the page in view and the sheet over it, with every style rule, token and keyframe that
// draws them (day; the night rules come with them).
//   node capture_stage1.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 860 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(async () => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.theme = 'day'; try { applyTheme(); } catch (e) {}
    const enc = (s) => new TextEncoder().encode(s); IngRepo.setAuthor({ name: 'Ada', email: '' });
    const a = await IngRepo.fromFiles([{ path: 'index.html', data: enc('<!doctype html><meta charset="utf-8"><title>Tide Clock</title>\n<link rel="stylesheet" href="app/clock.css">\n<h1>Tide Clock</h1>\n<p id="next">The next high tide</p>\n<script src="app/tide.js"></script>\n') },
      { path: 'app/tide.js', data: enc('// the next high tide, in hours from now\nfunction next(){\n  return 6;\n}\ndocument.getElementById("next").textContent = "High tide in " + next() + " hours";\n') },
      { path: 'app/clock.css', data: enc('body{font:16px Georgia,serif;margin:2rem}\nh1{color:#1f4f68}\n') }, { path: 'README.md', data: enc('# Tide Clock\n\nThe tides of the harbour, offline.\n') }], { name: 'tide-clock', desc: 'The tides of the harbour, offline' });
    await IngRepo.branch(a.id, 'evening'); await IngRepo.branch(a.id, 'night-face');
    const g = await IngRepo.fromFiles([{ path: 'index.html', data: enc('<!doctype html><title>Harbour Garden</title><h1>Harbour Garden</h1>\n') }], { name: 'harbour-garden', desc: 'A garden planner for a boat' });
    window.__cap = { a: a.id, g: g.id }; try { saveState(); } catch (e) {} go('code'); });
  await p.waitForTimeout(1500);
  const MATCHED = new Set(), scenes = {};
  const collect = () => p.evaluate(() => { const roots = [document.querySelector('.fbx.r333x'), document.querySelector('.topbar'), document.querySelector('.page.active,section.page:not([hidden]).active') || null, document.getElementById('modalRoot'), document.getElementById('chatPlusMenu')]
      .concat([...document.querySelectorAll('[id^="page-"]')].filter((x) => x.offsetParent || getComputedStyle(x).display !== 'none')).filter(Boolean);
    const els = []; roots.forEach((r) => { els.push(r); r.querySelectorAll('*').forEach((e) => els.push(e)); }); els.push(document.body, document.documentElement);
    const DYN = /::?(?:hover|active|focus-visible|focus-within|focus|visited|before|after|placeholder|selection|marker|-webkit-[a-z-]+|-moz-[a-z-]+)(?![a-z-])/g;
    const hit = (sel) => sel.split(',').some((part) => { let q = part.replace(DYN, '').trim(); if (!q) return false; q = q.replace(/:(?:is|where|not)\(\s*\)/g, ''); try { return els.some((e) => e.matches(q)); } catch (x) { return false; } });
    const keys = []; const walk = (list) => { for (const r of list) { if (r.type === CSSRule.MEDIA_RULE || r.type === CSSRule.SUPPORTS_RULE) { walk(r.cssRules); continue; } if (r.type === CSSRule.STYLE_RULE && hit(r.selectorText || '')) keys.push(r.cssText.slice(0, 400)); } };
    for (const sh of document.styleSheets) { try { walk(sh.cssRules); } catch (e) {} } return keys; }).then((ks) => ks.forEach((k) => MATCHED.add(k)));
  /* one scene: the top bar, the page in view, the sheet over it (if any), each as the page draws it now */
  const grab = async (key, note) => { await p.waitForTimeout(900); await collect();
    scenes[key] = await p.evaluate((note) => { const strip = (el) => { if (!el) return ''; el.querySelectorAll('input,textarea').forEach((f) => { if (f.tagName === 'TEXTAREA') f.textContent = f.value; else f.setAttribute('value', f.value); }); const c = el.cloneNode(true); c.querySelectorAll('script,iframe,canvas,video,audio,object,embed,template').forEach((x) => x.remove());
        c.querySelectorAll('*').forEach((x) => { [...x.attributes].forEach((at) => { if (/^on/i.test(at.name)) x.removeAttribute(at.name); }); });
        return c.outerHTML; };
      const page = [...document.querySelectorAll('[id^="page-"]')].filter((x) => x.offsetParent)[0];
      const mr = document.getElementById('modalRoot'); const open = mr && getComputedStyle(mr).display !== 'none' && mr.querySelector('#modalBox') && mr.querySelector('#modalBox').children.length;
      const pm = document.getElementById('chatPlusMenu'); const pmOpen = pm && pm.offsetParent;
      const fx = document.querySelector('.fbx.r333x'); return { note, top: strip(document.querySelector('.topbar')), page: strip(page), pageId: page && page.id, modal: (open ? strip(mr) : '') + (fx ? strip(fx) : ''), plus: pmOpen ? strip(pm) : '', plusRect: pmOpen ? (() => { const r = pm.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width }; })() : null,
        bodyClass: document.body.className, bodyAttrs: [...document.body.attributes].filter((a) => a.name !== 'class' && a.name !== 'style').map((a) => [a.name, a.value]), htmlClass: document.documentElement.className }; }, note);
    await p.screenshot({ path: path.join(OUT, 's_' + key + '.png') }); };
  // A. Code's start window
  await p.evaluate(() => ccWelcome()); await grab('a-start', "Code's start window: From Fabrica works on a branch of its own");
  // B. A repository
  await p.click('#modalBox .cc-start [data-a="fabrica"]'); await p.waitForSelector('#r333List .f-opt', { timeout: 15000 }); await grab('b-pick', 'A repository: your apps in Fabrica, and GitHub');
  // C. the branches
  await p.evaluate(() => [...document.querySelectorAll('#r333List .f-opt')].find((x) => /tide-clock/.test(x.textContent)).click()); await p.waitForSelector('#r333Br .f-opt', { timeout: 15000 }); await grab('c-branch', 'Its branches: the session begins from the one you choose');
  // D. the session, after the model changed two files
  await p.evaluate(() => [...document.querySelectorAll('#r333Br .f-opt')].find((x) => /^⑂?\s*main/.test(x.textContent.trim())).click()); await p.waitForTimeout(3000);
  await p.evaluate(async () => { const pr = ccProj(), f = pr.files.filter((x) => x.name === 'app/tide.js')[0];
    await ccPut(f, '// the next high tide, in hours from now, from the harbour\'s own table\nvar TABLE = { next: 6.5 };\nfunction next(){\n  return Math.round(TABLE.next * 10) / 10;\n}\ndocument.getElementById("next").textContent = "High tide in " + next() + " hours";\n');
    const nf = { name: 'app/tides.json', ref: null, size: 0 }; pr.files.push(nf); await ccPut(nf, '{ "harbour": "Kingsbridge", "next": 6.5 }\n');
    const c = curChat(); c.title = 'Half-hour tides'; try { saveState(); ccPaintHead(); IngRepoWork.paint(); } catch (e) {} });
  await p.waitForTimeout(4500); await grab('d-session', 'The session works on main, on a branch of its own; Review and keep shows 2');
  // E. Review and keep, a file's differences shown
  await p.evaluate(() => IngRepoWork.keepSheet(ccProj())); await p.waitForSelector('#r333F .f-frow', { timeout: 15000 }); await p.evaluate(() => document.querySelector('#r333F .f-frow').click());
  await p.fill('input#r333Br', 'ingenium/half-hour-tides'); await grab('e-review', 'Review and keep: each file, its lines, the branch of its own');
  // F. Create pull request
  await p.click('#r333Go'); await p.waitForSelector('#r333G2', { timeout: 15000 }); await grab('f-pr', 'Create pull request: it waits in Fabrica for your yes');
  await p.click('#r333G2'); await p.waitForTimeout(2200); await p.evaluate(() => { try { IngRepoWork.paint(); } catch (e) {} }); await p.waitForTimeout(1500); await grab('g-session-pr', 'The session follows its pull request');
  // H. the pull request in Fabrica
  await p.evaluate(async () => { const id = window.__cap.a, n = ccProj().fab.pr.n; go('fabrica'); await new Promise((r) => setTimeout(r, 1500));
    const row = [...document.querySelectorAll('#fb .f-repo')].find((x) => /tide-clock/.test(x.textContent)); if (row) row.click(); await new Promise((r) => setTimeout(r, 1800)); try { fbHub.open('pulls', { n }); } catch (e) {} });
  await p.waitForTimeout(2500); await grab('h-fabrica', 'In Fabrica: the pull request from ingenium/half-hour-tides into main, waiting for your yes');
  // I. Chat: A repository in the + menu
  await p.evaluate(() => { go('chat'); document.getElementById('chatNew').click(); }); await p.waitForTimeout(900);
  await p.evaluate(() => { const b = document.getElementById('chatImgBtn'); if (b) b.click(); else paintPlus(); }); await p.waitForTimeout(900); await grab('i-chat-plus', "Chat's + menu: A repository");
  await p.evaluate(() => { try { closePlus(); } catch (e) {} IngRepoWork.tieChat({ kind: 'fabrica', repo: window.__cap.a, name: 'tide-clock', branch: 'main' }); const c = curChat(); c.title = 'How the tide clock works';
    c.messages.push({ role: 'me', text: 'How does the tide clock work out the next high tide?', at: Date.now() - 60000 });
    c.messages.push({ role: 'bot', text: 'It reads **app/tide.js**: `next()` returns the hours to the next high tide, and the page writes it into the line under the title. On main that is a fixed 6 hours; the session branch *ingenium/half-hour-tides* reads it from `app/tides.json` instead.', at: Date.now() - 50000,
      steps: [{ i: '⌕', t: 'Looked at the files of tide-clock' }, { i: '⌕', t: 'Read app/tide.js' }], model: 'Gemma' });
    try { saveState(); renderChat(); } catch (e) {} });
  await p.waitForTimeout(1500); await p.evaluate(() => { const b = document.getElementById('chatImgBtn'); if (b) b.click(); else paintPlus(); }); await p.waitForTimeout(900); await grab('j-chat-repo', 'A conversation that reads tide-clock: the + menu offers Continue in Code');
  // the style rules that draw them, with the page's own tokens and keyframes
  const css = await p.evaluate((KEEPL) => { const KEEP = new Set(KEEPL); const rules = [], frames = {}, toks = [];
    function walk(list, wrap) { for (const r of list) { if (r.type === CSSRule.KEYFRAMES_RULE) { frames[r.name] = r.cssText; continue; }
        if (r.type === CSSRule.MEDIA_RULE || r.type === CSSRule.SUPPORTS_RULE) { const t = r.cssText; walk(r.cssRules, wrap.concat([t.slice(0, t.indexOf('{')).trim()])); continue; }
        if (r.type === CSSRule.FONT_FACE_RULE) { rules.push(r.cssText); continue; }
        if (r.type === CSSRule.STYLE_RULE) { const s = r.selectorText || ''; const tok = /^(:root|html|body)(\[data-theme="night"\])?$/.test(s.trim());
          if (KEEP.has(r.cssText.slice(0, 400)) || tok) { let t = r.cssText; for (let i = wrap.length - 1; i >= 0; i--) t = wrap[i] + '{' + t + '}'; rules.push(t); } } } }
    for (const sh of document.styleSheets) { try { walk(sh.cssRules, []); } catch (e) {} } return { rules, frames }; }, [...MATCHED]);
  const used = new Set(); css.rules.forEach((t) => { const m = t.match(/animation(-name)?\s*:\s*([^;}]+)/g); (m || []).forEach((x) => x.split(':')[1].split(/[ ,]+/).forEach((w) => used.add(w.trim()))); });
  const frames = Object.keys(css.frames).filter((n) => used.has(n)).map((n) => css.frames[n]);
  fs.writeFileSync(path.join(OUT, 'parts.json'), JSON.stringify({ scenes, rules: css.rules, frames }));
  console.log('scenes', Object.keys(scenes).map((k) => k + ':' + Math.round((scenes[k].page.length + scenes[k].modal.length + scenes[k].top.length) / 1024) + 'KB').join(' '));
  console.log('rules', css.rules.length, 'frames', frames.length, 'errors', JSON.stringify(errs));
  await b.close(); })().catch((e) => { console.error(e); process.exit(2); });
