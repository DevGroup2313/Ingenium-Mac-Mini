// The Code page's column and the GitHub repository picker, as she asked (Ingenium 6.15, modules/r215.js and r219.js). Her words
// (4 November 2026): "please hide the scroll bar from the Plan and session panel on the Coding chat page. I want the scrollability
// kept but I want the scroll bar hidden to match the rest of the app"; "The 'Find a repository' text box area inside of the panel is
// a little too small, please fix that. I also want the Repository option list to be a little bit more 3D animated to match the rest
// of the app instead of being just still and flat." The app, the account and its repositories are invented; GitHub is a stand-in.
//   node rig/t_615_code_look.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1200))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1500, height: 640 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.addInitScript(() => { if (window.top !== window) return; const json = (c, body) => Promise.resolve(new Response(JSON.stringify(body), { status: c, headers: { 'Content-Type': 'application/json' } }));
    const of = window.fetch.bind(window); window.fetch = function (url, init) { url = String(url); if (url.indexOf('https://api.github.com/') !== 0) return of(url, init); const u = new URL(url);
      if (u.pathname === '/user') return json(200, { login: 'invented-dev' });
      if (u.pathname === '/user/repos') return json(200, u.searchParams.get('page') === '1' ? ['garden', 'tiny-app', 'notes-kit', 'atlas', 'recipes', 'weather-board', 'flash-cards', 'reader'].map((n, i) => ({ full_name: 'invented-dev/' + n, owner: { login: 'invented-dev' }, name: n, default_branch: 'main', private: i % 3 === 0, pushed_at: new Date(Date.now() - i * 3600e3).toISOString(), permissions: { push: true } })) : []);
      if (/\/branches$/.test(u.pathname)) return json(200, [{ name: 'main' }, { name: 'dev' }]);
      return json(404, { message: 'Not Found' }); }; });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.evaluate(async () => { const pr = await ccMakeProject('Invented garden', [{ name: 'index.html', text: '<!doctype html><title>Garden</title><p>fern</p>' }], 'index.html'); go('code'); try { closeModal(); } catch (e) {} ccNewSession(pr);
    IngR215.panel('plan', true); IngR215.panel('session', true); });
  await p.waitForTimeout(600);

  /* 1. the column scrolls, with no bar to see */
  const sc = await p.evaluate(async () => { const e = document.querySelector('#ccPanel .ccp-body'); const cs = getComputedStyle(e), wk = getComputedStyle(e, '::-webkit-scrollbar');
    const can = e.scrollHeight > e.clientHeight + 20; e.scrollTop = 0; e.dispatchEvent(new WheelEvent('wheel', { deltaY: 300, bubbles: true })); e.scrollBy(0, 300); await new Promise(r => setTimeout(r, 120));
    return { sw: cs.scrollbarWidth, wk: wk.display, ov: cs.overflowY, can, top: e.scrollTop, gutter: e.offsetWidth - e.clientWidth }; });
  ok(sc.sw === 'none' && sc.gutter === 0, 'the Plan and session column shows no scroll bar', sc);
  ok(sc.ov === 'auto' && sc.can && sc.top > 0, 'and it still scrolls when its content is taller than the window', sc);
  await p.screenshot({ path: OUT + '/column.png' });

  /* 2. the repository picker: a Find box as wide as the sheet, and raised rows that lift and rise in */
  await p.setViewportSize({ width: 1500, height: 980 });
  await p.evaluate(() => { state.github = Object.assign(state.github || {}, { token: 'ghp_invented_token', login: 'invented-dev' }); saveState(); IngGitHubCode.paint && IngGitHubCode.paint();
    [...document.querySelectorAll('#ccPanel .ghx .btn')].find(x => /connect a repository/i.test(x.textContent)).click(); });
  await p.waitForFunction(() => document.querySelectorAll('#ghxList .ghx-repo').length === 8, null, { timeout: 10000 }).catch(() => {});
  const g = await p.evaluate(() => { const f = document.getElementById('ghxFind'), list = document.getElementById('ghxList'), rows = [...list.querySelectorAll('.ghx-repo')];
    const fr = f.getBoundingClientRect(), lr = list.getBoundingClientRect();
    return { find: Math.round(fr.width), list: Math.round(lr.width), fh: Math.round(fr.height), rows: rows.length, rising: rows.filter(x => x.classList.contains('ghx-in')).length, shadow: getComputedStyle(rows[0]).boxShadow, bar: getComputedStyle(list).scrollbarWidth }; });
  ok(g.find >= g.list - 2 && g.fh >= 40, 'Find a repository is as wide as the list beneath it, and as tall as the other fields', g);
  ok(g.rows === 8 && g.shadow !== 'none' && /rgba/.test(g.shadow), 'each repository is a raised key, with a shadow under it, as the app\'s keys are', g.shadow);
  ok(g.rising === 8, 'the rows rise in one after another as they arrive', g);
  await p.waitForTimeout(900);
  await p.hover('#ghxList .ghx-repo:nth-child(2)'); await p.waitForTimeout(260);
  const hv = await p.evaluate(() => ({ t: getComputedStyle(document.querySelector('#ghxList .ghx-repo:nth-child(2)')).transform, done: document.querySelectorAll('#ghxList .ghx-in').length }));
  ok(/matrix\(1, 0, 0, 1, 0, -2\)/.test(hv.t) && hv.done === 0, 'a row lifts under the pointer, once the rows have settled', hv);
  await p.screenshot({ path: OUT + '/picker.png' });
  await p.click('#ghxList .ghx-repo:nth-child(3)'); await p.waitForTimeout(260);
  const pk = await p.evaluate(() => { const r = document.querySelector('#ghxList .ghx-repo[aria-pressed="true"]'); return r ? { name: r.firstChild.textContent, t: getComputedStyle(r).transform, sh: getComputedStyle(r).boxShadow } : null; });
  ok(pk && pk.name === 'invented-dev/notes-kit' && /inset/.test(pk.sh), 'the chosen repository stays held up, with an amethyst rim', pk);
  await p.fill('#ghxFind', 'ga'); await p.waitForTimeout(120);
  const ty = await p.evaluate(() => ({ rows: [...document.querySelectorAll('#ghxList .ghx-repo')].map(x => x.firstChild.textContent), rising: document.querySelectorAll('#ghxList .ghx-in').length }));
  ok(ty.rows.join() === 'invented-dev/garden' && ty.rising === 0, 'typing in Find narrows the list at once, without the rows rising again at each letter', ty);
  await p.evaluate(() => { document.body.setAttribute('data-motion', 'minimal'); }); await p.fill('#ghxFind', ''); await p.waitForTimeout(80);
  const mm = await p.evaluate(() => { const r = document.querySelector('#ghxList .ghx-repo'); return { an: getComputedStyle(r).animationName, tr: getComputedStyle(r).transitionDuration }; });
  ok(mm.an === 'none' && /^0s/.test(mm.tr), 'with motion set to minimal, the rows neither rise nor lift', mm);

  ok(!errs.length, 'no errors on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})();
