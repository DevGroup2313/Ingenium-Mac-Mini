// node rig/t_638_scale.js <Ingenium page url> <out dir>
// Ingenium 6.38 (6 November 2026): one scale. Her note: "I want the fonts and sizes of the newly added pages and sections of
// Ingenium to match the rest of the app, everything should be consistent and cohesive. I don't want big bulky texts or buttons
// messing up the look of the app." The app's own scale (the base page): a page's title 25px serif (Home's greeting up to 30px), its
// first line 14px, a card's heading (h2.sec) 16.5px serif, text 13.5px, small text 12px, a key (.btn) 13px at about 34px high.
// Every page, every room and part of a page, Code, and (in the master edition) every room of the Author Studio are measured at
// 1440 by 900. Checks:
//   - no text is larger than the scale allows (headings up to 17.5px, other text up to 14.5px), except what is meant to stand out
//     and is named here: page titles, the chat's title (15px), Home's greeting and the Offline Project's plaque, figures (the storage's size, Focus's clock),
//     the chat's greeting, Lector's paper and the Ownership notice (documents, at a reading size)
//   - no one-line key is lettered above 13.5px or stands taller than 38px, except the named ones (the chat's +, microphone, send and
//     title keys, Home's seal, the fold keys, the app stones, whose letters are 12px)
//   - no page errors
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1500))); c ? pass++ : fail++; };
async function boot(p) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500); }
/* what is meant to stand out, by where it stands */
const TEXT_OK = [/page-title/, /\bau-h\b/, /fld-h > h2/, /div\.l-head > div > h1|div\.f-head > div > h1|div\.c-hrow > h1/, /hx-hello/, /hx-plaque/, /cc-title/, /stx-big/, /fx-bigclock/, /cc-hello/, /l-paper/, /pc-doc|pcd-/,
  /* 6.67, Home as the orrery (modules/r261.js): the line under the sky and the rooms' names on their keys, in Cormorant */
  /ox-legend/, /hx-kh/,
  /* 6.69, Folders as a drawer of her apps (modules/r263.js), as she approved it: the line under the words, the folders' tabs, names
     and label in the drawer, the headings of the page and of an opened folder's spread, the index cards' and the opened folder's
     names, the envelopes' and the conversations' names, the book's title; the text under them keeps the app's scale */
  /fd-words > p\.fd-hint/, /fd-tab > span\.fd-tn/, /fd-ft > b/, /fd-label > b/, /fld-wrap > div\.card[^ ]* > h2\.sec/, /fd-(left|right) > div[^ ]* > h2\.sec/,
  /fld-card > span\.fld-name/, /fd-oh > div > h2/, /fd-env > b/, /li\.fd-conv > div\.fld-t > b/, /fd-cover > b/,
  /* 6.70, Blend as a movement in 3D (modules/r262.js), as she approved it: the line under the words, the steps' numerals and names on
     their raised labels, the models' names beside the movement, the step's heading on its slab, the line that waits for the answers,
     the question asked, the blended answer's heading and the ready-made blends' names; the text under them keeps the app's scale */
  /bx-count/, /button\.rm-step[^ ]* > span/, /bx-label > span\.bx-name/, /bl-setup > h2\.sec/, /bl-empty > b/, /bl-q\b/, /bl-final > div\.bl-card-h > b/,
  /bl-preset > b/];
const KEY_OK = [/cplus-btn/, /#chatSend/, /cc-title/, /r175-seal/, /l-fold|f-fold/, /hx-app\b/, /pcd-toc/];
const MEASURE = (scopeSel) => {
  const W = window, D = document;
  const vis = (el) => { if (!el.getClientRects().length) return false; const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || +cs.opacity === 0) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const sheets = [...D.styleSheets].map((sh, i) => { let rules = []; try { rules = sh.cssRules; } catch (e) {} const o = sh.ownerNode; return { rules, owner: o ? (o.id || (o.tagName + '#' + i)) : 'sheet#' + i }; });
  function srcOf(el, prop) { let cur = el, depth = 0;
    while (cur && cur.nodeType === 1 && depth < 8) { if (cur.style && cur.style.getPropertyValue(prop)) return (depth ? '^' + depth + ' ' : '') + 'inline';
      let best = null; const walk = (rules, owner) => { for (const r of rules) { if (r.type === 1) { if (r.style.getPropertyValue(prop) || (prop === 'font-size' && r.style.getPropertyValue('font'))) { let m = false; try { m = cur.matches(r.selectorText); } catch (e) {} if (m) best = owner + ' { ' + r.selectorText.slice(0, 110) + ' }'; } }
        else if (r.type === 4) { try { if (W.matchMedia(r.media.mediaText).matches) walk(r.cssRules, owner); } catch (e) {} } else if (r.cssRules) { try { walk(r.cssRules, owner); } catch (e) {} } } };
      for (const s of sheets) walk(s.rules, s.owner);
      if (best) return (depth ? '^' + depth + ' ' : '') + best; cur = cur.parentElement; depth++; }
    return 'inherited'; }
  const first = (f) => String(f || '').split(',')[0].trim().replace(/^["']|["']$/g, '').toLowerCase();
  const SERIF1 = first(getComputedStyle(D.documentElement).getPropertyValue('--serif'));
  const scope = D.querySelector(scopeSel); if (!scope) return { err: 'no ' + scopeSel };
  const out = { texts: [], keys: [] };
  const path = (el) => { const a = []; let c = el; for (let i = 0; i < 4 && c && c !== scope; i++) { a.unshift(c.tagName.toLowerCase() + (c.id ? '#' + c.id : '') + (c.classList.length ? '.' + [...c.classList].slice(0, 3).join('.') : '')); c = c.parentElement; } return a.join(' > '); };
  scope.querySelectorAll('*').forEach((el) => {
    if (/^(SCRIPT|STYLE|SVG|PATH|OPTION|NOSCRIPT|TEMPLATE)$/i.test(el.tagName)) return;
    const own = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim().length > 1).map(n => n.textContent.trim()).join(' ');
    const isKey = el.matches('button, .btn, a.btn, [role=button], [role=tab], input[type=button], input[type=submit]');
    if (!own && !isKey) return; if (!vis(el)) return;
    const cs = getComputedStyle(el), fs_ = parseFloat(cs.fontSize), r = el.getBoundingClientRect();
    if (own && !/^[\p{Extended_Pictographic}\s‍️]+$/u.test(own)) out.texts.push({ t: own.slice(0, 60), fs: fs_, fw: cs.fontWeight, serif: SERIF1 && first(cs.fontFamily) === SERIF1, tag: el.tagName.toLowerCase(), path: path(el), src: fs_ > 14.5 ? srcOf(el, 'font-size') : '' });
    if (isKey) { const txt = (el.innerText || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ');
      out.keys.push({ t: txt.slice(0, 50), fs: fs_, h: Math.round(r.height), w: Math.round(r.width), pad: cs.paddingTop + ' ' + cs.paddingRight, path: path(el), lines: Math.max(1, Math.round((r.height - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - parseFloat(cs.borderTopWidth) - parseFloat(cs.borderBottomWidth)) / (parseFloat(cs.lineHeight) || fs_ * 1.25))),
        src: (fs_ > 13.5 || r.height > 40) ? srcOf(el, 'font-size') + ' | pad: ' + srcOf(el, 'padding') : '' }); }
  });
  return out; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await boot(p);
  // 6.39: invented content, so each page is measured as it draws what it holds (a folder's card and its view, an app in Fabrica,
  // a conversation), not only as it stands empty
  await p.evaluate(async () => {
    try { if (window.IngFolders && IngFolders.make) IngFolders.make('Invented Quill', ['notes']); } catch (e) {}
    try { if (window.IngRepo) { const r = await IngRepo.create({ name: 'An invented app' }); await IngRepo.put(r.id, 'index.html', '<p>invented</p>'); await IngRepo.commit(r.id, 'First'); } } catch (e) {}
    try { go('chat'); curMsgs().push({ role: 'me', text: 'An invented question about the tides.' }, { role: 'bot', text: 'An invented answer: the Moon, and to a lesser degree the Sun.' }); saveState(); try { renderChat(); } catch (e) {} } catch (e) {}
    try { saveState(); } catch (e) {} });
  await p.waitForTimeout(800);
  const views = [];
  const pages = await p.evaluate(() => ['home', 'chat', 'notes', 'folders', 'focus', 'models', 'blend', 'lector', 'career', 'build', 'fabrica', 'guide', 'settings'].filter(pg => document.getElementById('page-' + pg)));
  for (const pg of pages) {
    await p.evaluate((pg) => { try { go(pg); } catch (e) {} }, pg); await p.waitForTimeout(900);
    const parts = await p.evaluate((pg) => { const out = [];
      if (pg === 'focus' && window.IngFocusParts) return IngFocusParts.parts().map(x => ({ part: x.key }));
      const rooms = (window.IngRooms && IngRooms.rooms(pg)) || [];
      if (!rooms.length) return [{}];
      rooms.filter(r => r.shown).forEach(r => { const sub = (pg === 'settings' && window.IngSettingsParts) ? IngSettingsParts.parts(r.key) : [];
        if (sub.length) sub.forEach(s => out.push({ room: r.key, part: s.key })); else out.push({ room: r.key }); });
      return out; }, pg);
    for (const pp of parts) { const part = [pp.room, pp.part].filter(Boolean).join('.') || null;
      if (part) { await p.evaluate(([pg, pp]) => { try { if (pg === 'focus') IngFocusParts.show(pp.part); else { if (pp.room) IngRooms.open(pg, pp.room); if (pp.part && pg === 'settings') IngSettingsParts.show(pp.room, pp.part); } } catch (e) {} }, [pg, pp]); await p.waitForTimeout(600); }
      views.push({ view: pg + (part ? ':' + part : ''), ...(await p.evaluate(MEASURE, '#page-' + pg)) }); } }
  const fid = await p.evaluate(() => { try { const f = IngFolders.folders()[0]; if (!f) return null; state.folders.ui.open = f.id; saveState(); go('folders'); IngFolders.paint(); return f.id; } catch (e) { return null; } });
  if (fid) { await p.waitForTimeout(700); views.push({ view: 'folders:a folder', ...(await p.evaluate(MEASURE, '#page-folders')) }); await p.evaluate(() => { state.folders.ui.open = null; saveState(); IngFolders.paint(); }); }
  await p.evaluate(() => { try { go('chat'); if (window.ccEnter) ccEnter('code'); } catch (e) {} }); await p.waitForTimeout(900);
  views.push({ view: 'code', ...(await p.evaluate(MEASURE, '#page-chat')) });
  await p.evaluate(() => { try { if (window.ccEnter) ccEnter(''); } catch (e) {} });
  const rooms = await p.evaluate(() => window.IngAuthor ? ['editor', 'words', 'names', 'look', 'checks', 'log'] : []);
  for (const rm of rooms) { await p.evaluate((rm) => IngAuthor.open(rm), rm); await p.waitForTimeout(600); views.push({ view: 'author:' + rm, ...(await p.evaluate(MEASURE, '#ingAuthor')) }); }
  if (rooms.length) await p.evaluate(() => IngAuthor.close());
  fs.writeFileSync(OUT + '/scale.json', JSON.stringify(views, null, 1));
  const bigT = [], bigK = [];
  for (const v of views) { if (v.err) { bigT.push(v.view + ': ' + v.err); continue; }
    v.texts.forEach(x => { if (TEXT_OK.some(r => r.test(x.path))) return; const head = /^h[1-4]$/.test(x.tag) || x.serif;
      if (head ? x.fs > 17.5 : x.fs > 14.5) bigT.push(v.view + ' ' + x.fs + 'px "' + x.t.slice(0, 30) + '" ' + x.path.slice(-70) + ' <- ' + x.src); });
    v.keys.forEach(k => { if (KEY_OK.some(r => r.test(k.path))) return; if (k.lines > 1) return;
      if (k.fs > 13.5 || k.h > 38) bigK.push(v.view + ' ' + k.fs + 'px h' + k.h + ' "' + k.t.slice(0, 30) + '" ' + k.path.slice(-70) + ' <- ' + k.src); }); }
  const uniq = (a) => [...new Set(a)];
  ok(views.length >= 30, 'every page, room and part was measured (' + views.length + ' views' + (rooms.length ? ', with the Author Studio\'s rooms' : '') + ')', views.map(v => v.view).join(' '));
  ok(bigT.length === 0, 'no text is larger than the app\'s scale (headings to 17.5px, other text to 14.5px), but what is meant to stand out', uniq(bigT).slice(0, 30));
  ok(bigK.length === 0, 'no one-line key is lettered above 13.5px or stands taller than 38px, but the named ones', uniq(bigK).slice(0, 30));
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
