// No scroll bar in sight (Ingenium 6.16, modules/r224.js). Her words (4 November 2026): "Please add this rule to Ingenium, all scroll
// bars unless explicitly stated are to be hidden from view while keeping the scrolling functionality intact. I don't like seeing them
// in view, they detract from the look of the app." The browser here draws real scroll bars (Playwright hides them by default, which
// would make this test say nothing), so a bar that showed would take room beside its content and be measured. Invented conversation.
//   node rig/t_616_scroll.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1200))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch({ ignoreDefaultArgs: ['--hide-scrollbars'] }); const ctx = await b.newContext({ viewport: { width: 1280, height: 640 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  /* a bar takes room beside its content: offsetWidth less clientWidth, less the borders */
  const GUT = 'window.__gut=function(e){var cs=getComputedStyle(e);return e.offsetWidth-e.clientWidth-(parseFloat(cs.borderLeftWidth)||0)-(parseFloat(cs.borderRightWidth)||0);};';
  await p.evaluate(GUT);

  /* 1. this browser draws bars: a box marked to show its bar has one; the same box unmarked has none */
  const probe = await p.evaluate(() => { const mkBox = (shown) => { const d = document.createElement('div'); d.style.cssText = 'position:fixed;left:0;top:0;width:200px;height:100px;overflow:auto;z-index:-1';
      d.innerHTML = '<div style="height:600px">x</div>'; if (shown) IngScrollbars.show(d); document.body.appendChild(d); const g = __gut(d); d.remove(); return g; };
    return { shown: mkBox(true), plain: mkBox(false) }; });
  ok(probe.shown > 0, 'this browser draws scroll bars, and a part marked to show its bar keeps one (the stated exception)', probe);
  ok(probe.plain === 0, 'the same part, unmarked, shows no bar', probe);

  /* 2. the page itself: taller than the window, it scrolls with no bar */
  const pg = await p.evaluate(async () => { go('guide'); await new Promise(r => setTimeout(r, 500)); const se = document.scrollingElement, m = document.querySelector('.main');
    const host = (m && m.scrollHeight > m.clientHeight + 40) ? m : se; const before = host.scrollTop; host.scrollTop = before + 400; await new Promise(r => setTimeout(r, 80));
    return { host: host === se ? 'page' : 'main', tall: host.scrollHeight > host.clientHeight + 40, moved: host.scrollTop > before, gut: host === se ? innerWidth - document.documentElement.clientWidth : __gut(host) }; });
  ok(pg.tall && pg.moved && pg.gut === 0, 'the Guide, taller than the window, scrolls with no bar beside it', pg);

  /* 3. the chat, with a long invented conversation */
  const ch = await p.evaluate(async () => { go('chat'); const c = curChat(); for (let i = 0; i < 40; i++) c.messages.push({ role: i % 2 ? 'bot' : 'me', text: 'Line ' + i + ' of an invented conversation about ferns and ivy.', at: Date.now() });
    renderChat(); await new Promise(r => setTimeout(r, 300)); const s = document.getElementById('chatScroll'); s.scrollTop = 0; await new Promise(r => setTimeout(r, 60)); s.scrollTop = 300; await new Promise(r => setTimeout(r, 60));
    const out = { tall: s.scrollHeight > s.clientHeight + 40, moved: s.scrollTop > 0, gut: __gut(s) }; c.messages.splice(-40); renderChat(); return out; });
  ok(ch.tall && ch.moved && ch.gut === 0, 'a long conversation scrolls with no bar', ch);

  /* 4. a text box with more than it shows */
  const ta = await p.evaluate(async () => { const t = document.createElement('textarea'); t.style.cssText = 'position:fixed;left:10px;top:10px;width:300px;height:80px;z-index:9999'; t.value = Array.from({ length: 60 }, (_, i) => 'line ' + i).join('\n');
    document.body.appendChild(t); t.scrollTop = 200; await new Promise(r => setTimeout(r, 40)); const o = { moved: t.scrollTop > 0, gut: __gut(t) }; t.remove(); return o; });
  ok(ta.moved && ta.gut === 0, 'a text box with more lines than it shows scrolls with no bar', ta);

  /* 5. the Code page's Plan and session column, and the Controls drawer */
  const cc = await p.evaluate(async () => { const pr = await ccMakeProject('Invented ferns', [{ name: 'index.html', text: '<!doctype html><title>Ferns</title><p>fern</p>' }], 'index.html'); go('code'); try { closeModal(); } catch (e) {} ccNewSession(pr);
    IngR215.panel('plan', true); IngR215.panel('session', true); await new Promise(r => setTimeout(r, 400)); const e = document.querySelector('#ccPanel .ccp-body'); e.scrollTop = 250; await new Promise(r => setTimeout(r, 60));
    const k = document.getElementById('chatCtlBtn'); k.click(); await new Promise(r => setTimeout(r, 400)); const d = document.getElementById('chatDrawer'), dsc = d && (d.scrollHeight > d.clientHeight + 20 ? d : d.querySelector('*'));
    let dd = null; if (d) { const all = [d].concat([...d.querySelectorAll('*')]).filter(x => { const o = getComputedStyle(x).overflowY; return (o === 'auto' || o === 'scroll') && x.scrollHeight > x.clientHeight + 20; });
      dd = all.map(x => __gut(x)); } k.click();
    return { colTall: e.scrollHeight > e.clientHeight + 20, colMoved: e.scrollTop > 0, colGut: __gut(e), drawer: dd }; });
  ok(cc.colTall && cc.colMoved && cc.colGut === 0, 'the Plan and session column scrolls with no bar', cc);
  ok(Array.isArray(cc.drawer) && cc.drawer.every(g => g === 0), 'nothing in Controls shows a bar', cc.drawer);

  /* 6. every part of the page that scrolls, now: none shows a bar */
  const all = await p.evaluate(() => { const L = [...document.querySelectorAll('*')].filter(x => { if (x.closest('[data-scrollbar="shown"]')) return false; const cs = getComputedStyle(x); return /(auto|scroll)/.test(cs.overflowY + cs.overflowX) && x.getBoundingClientRect().width > 0 && (x.scrollHeight > x.clientHeight + 4 || x.scrollWidth > x.clientWidth + 4); });
    return { n: L.length, bars: L.filter(x => __gut(x) > 0 || (x.offsetHeight - x.clientHeight - (parseFloat(getComputedStyle(x).borderTopWidth) || 0) - (parseFloat(getComputedStyle(x).borderBottomWidth) || 0)) > 0).map(x => x.tagName + (x.id ? '#' + x.id : '') + '.' + String(x.className).slice(0, 40)) }; });
  ok(all.n > 0 && !all.bars.length, 'of every part that scrolls on the page now (' + all.n + '), none shows a bar', all);
  await p.screenshot({ path: OUT + '/code_no_bars.png' });

  ok(!errs.length, 'no errors on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})();
