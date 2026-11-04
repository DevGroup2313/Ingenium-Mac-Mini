// The author's workshop (Ingenium 6.18, modules/r226.js, the master edition) and How I work, on every app in Code and Build (r208,
// r190). Her words (4 November 2026): "I want to be able to troubleshoot Ingenium inside of the app. I want to be able to run diagnostics
// and be able to find and fix a bug in the app ... add or remove new features, pages, sections or different functions in Ingenium as its
// author and creator"; "please add that [the hidden scroll bar rule] to the folders inside Ingenium as well for all future apps".
// Every page, section, script, style and text here is invented; Ingenium's own page is a stand-in when Find and fix reads it.
//   node rig/t_618_workshop.js <Ingenium page url> <mock server url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, MOCK, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1400))); c ? pass++ : fail++; };
const http = (method, path) => fetch(MOCK + path, { method }).then(r => r.json());
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 980 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => { if (!/invented failure|invented script failure/.test(e.message)) errs.push(e.message.slice(0, 300)); });
  const open = async () => { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1400);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(300); };
  await p.goto(URL_); await open();

  /* 1. the Workshop, beside Settings */
  const nav = await p.evaluate(() => { const st = document.querySelector('.nav-btn[data-page="settings"]'), ws = document.querySelector('.nav-btn[data-page="workshop"]'); go('workshop');
    return { key: !!ws, after: !!(ws && st && st.nextElementSibling === ws), cards: [...document.querySelectorAll('#page-workshop .card > h2')].map(h => h.textContent), edition: ING_EDITION }; });
  ok(nav.key && nav.after && nav.cards.join('|') === 'Check Ingenium|Errors since it started|Your layers|Your page', 'the Workshop is in the side bar after Settings, with its four cards', nav);

  /* 2. the check */
  const chats0 = await p.evaluate(() => (state.chats || []).length);
  await p.click('#page-workshop .card:first-child .btn.primary'); await p.waitForFunction(() => document.querySelectorAll('#wsRes .ws-list li').length >= 10, null, { timeout: 60000 }).catch(() => {});
  const ck = await p.evaluate(() => ({ page: document.querySelector('.section.active').id, lines: [...document.querySelectorAll('#wsRes .ws-list li')].map(li => li.className + ':' + li.innerText.replace(/\s+/g, ' ').slice(0, 90)) }));
  const has = (re) => ck.lines.some(l => re.test(l));
  ok(ck.page === 'page-workshop' && has(/^ok:✓ Parts: all \d+ loaded/) && has(/^ok:✓ Pages: \d+ opened/) && has(/^ok:✓ The large store: writes and reads back/) && has(/^ok:✓ The small store/) && has(/Version: Ingenium \d+\.\d+/),
    'the check opens every page, writes and reads both stores, and says each in plain words, and comes back to the Workshop', ck);
  ok(!ck.lines.some(l => /^bad:/.test(l)), 'on a page that works, no line says wrong', ck.lines.filter(l => /^bad:/.test(l)));
  const chats = await p.evaluate(() => (state.chats || []).length);
  ok(chats === chats0, 'the check makes no new conversation as it opens Chat and Code', { before: chats0, after: chats });

  /* 3. errors, and the report */
  await p.evaluate(() => { setTimeout(() => { throw new Error('invented failure in a part'); }, 0); }); await p.waitForTimeout(500);
  const er = await p.evaluate(() => ({ list: [...document.querySelectorAll('#wsErrs li code')].map(c => c.textContent), key: !!document.querySelector('#wsErrs li .btn'), rep: IngWorkshop.report() }));
  ok(/invented failure in a part/.test(er.list[0] || '') && er.list.filter(t => /invented failure in a part/.test(t)).length === 1 && er.key, 'an error the page meets is listed at once, once (not again as Ingenium\'s own handler repeats it), with Find and fix this with a model', er.list);
  ok(/\[ok\] Parts: all/.test(er.rep) && /invented failure in a part/.test(er.rep) && !/sk-|key:/i.test(er.rep), 'the report says each line plainly, with the errors, and no key', er.rep.slice(0, 400));

  /* 4. find and fix: Ingenium's own page in Code, the report in the message box */
  const fx = await p.evaluate(async () => { window.selfPageText = () => Promise.resolve('<!doctype html><title>Ingenium, a stand-in</title><p>invented</p>'); await IngWorkshop.fix(); await new Promise(r => setTimeout(r, 600));
    const pr = ccProj(); return { mode: CC.mode, name: pr && pr.name, file: pr && pr.files.map(f => f.name).join(), msg: document.getElementById('chatInput').value.slice(0, 160), sent: curChat().messages.length }; });
  ok(fx.mode === 'code' && fx.name === 'Ingenium (workshop)' && fx.file === 'ingenium.html' && /^Ingenium's own check, in the workshop, found what is below/.test(fx.msg) && fx.sent === 0,
    'Find and fix opens Ingenium\'s own page as an app in Code, with the report ready to read before it is sent', fx);

  /* 5. layers: a page, a section, a style, a hidden page and a script, each kept */
  await p.evaluate(() => { document.getElementById('chatInput').value = ''; go('workshop'); });
  const ly = await p.evaluate(async () => { const x = IngWorkshop.layers();
    x.pages.push({ id: 'pinv', name: 'Invented board', icon: '★', html: '<!doctype html><title>Board</title><h1>Ferns and ivy</h1>', on: true });
    x.sections.push({ id: 'sinv', page: 'home', place: 'top', title: 'Invented reminders', kind: 'md', body: '- Water the ferns on Fridays', on: true });
    x.styles.push({ id: 'yinv', name: 'Wider titles', css: '.page-title{letter-spacing:3px}', on: true });
    x.hide.pages.push('fabrica');
    x.scripts.push({ id: 'cinv', name: 'Invented mark', code: 'window.__invented = (window.__invented || 0) + 1;', on: true });
    x.scripts.push({ id: 'cbad', name: 'Invented broken', code: 'throw new Error("invented script failure");', on: true });
    saveState(); IngWorkshop.apply(); go('home'); await new Promise(r => setTimeout(r, 300));
    const pb = document.querySelector('.nav-btn[data-lyr="pinv"]'), ws = document.querySelector('.nav-btn[data-page="workshop"]'), home = document.getElementById('page-home');
    const sec = home.querySelector('.ws-lyr-card'), wt = document.querySelector('#page-workshop .page-title');
    const r = { key: !!pb && ws.nextElementSibling === pb, keyText: pb && pb.textContent, section: sec ? sec.innerText.replace(/\s+/g, ' ') : '', top: !!(sec && home.firstElementChild === sec),
      style: getComputedStyle(wt).letterSpacing, hidden: getComputedStyle(document.querySelector('.nav-btn[data-page="fabrica"]')).display };
    go('lyr-pinv'); await new Promise(r => setTimeout(r, 200)); const sp = document.getElementById('page-lyr-pinv'); r.page = !!(sp && sp.classList.contains('active') && sp.querySelector('iframe') && /Ferns and ivy/.test(sp.querySelector('iframe').srcdoc));
    r.sandbox = sp && sp.querySelector('iframe').getAttribute('sandbox'); return r; });
  ok(ly.key && /Invented board/.test(ly.keyText) && ly.page && !/allow-same-origin/.test(ly.sandbox || ''), 'a page of hers joins the side bar after the Workshop and opens in a frame of its own, apart from her data', ly);
  ok(/Invented reminders/.test(ly.section) && /Water the ferns on Fridays/.test(ly.section) && ly.top, 'a section of hers stands at the top of Home (Home has no plain title, so first on the page)', ly);
  ok(ly.style === '3px' && ly.hidden === 'none', 'her style applies at once, and a page she hides leaves the side bar', ly);
  await p.screenshot({ path: OUT + '/layers_home.png' });
  /* across a restart: the layers come back, her scripts run once each, the broken one is listed with its error */
  await p.waitForTimeout(1500); await p.reload(); await open();
  const rs = await p.evaluate(async () => { await new Promise(r => setTimeout(r, 1200)); const x = IngWorkshop.layers(); const bad = x.scripts.filter(s => s.id === 'cbad')[0];
    return { mark: window.__invented, key: !!document.querySelector('.nav-btn[data-lyr="pinv"]'), sec: !!document.querySelector('#page-home .ws-lyr-card'), err: bad && bad.err, boot: localStorage.getItem('ing.layers.boot'),
      listed: IngWorkshop.errors.some(e => e.kind === 'layer' && /invented script failure/.test(e.msg)) }; });
  ok(rs.mark === 1 && rs.key && rs.sec && /invented script failure/.test(rs.err || '') && rs.listed && rs.boot === null, 'after a restart her layers are back, each script ran once, and the one that failed is marked and listed', rs);
  await p.evaluate(() => go('workshop')); await p.click('#page-workshop .ws-tabs button:nth-child(3)'); await p.waitForTimeout(200);
  const sc = await p.evaluate(() => [...document.querySelectorAll('#page-workshop .ws-item .t')].map(t => t.innerText.replace(/\s+/g, ' ')));
  ok(sc.some(t => /Invented broken stopped with an error: invented script failure/.test(t)), 'the Scripts list says which script stopped, and why', sc);
  await p.screenshot({ path: OUT + '/workshop.png', fullPage: false });

  /* 6. a safe start, asked for; and one on its own, after a start that stopped inside a script */
  await p.evaluate(() => IngWorkshop.safeStart(true)); await p.waitForTimeout(500); await open();
  const sf = await p.evaluate(async () => { await new Promise(r => setTimeout(r, 1200)); go('workshop'); return { safe: IngWorkshop.safe(), mark: window.__invented, key: !!document.querySelector('.nav-btn[data-lyr="pinv"]'),
    style: getComputedStyle(document.querySelector('#page-workshop .page-title')).letterSpacing, banner: (document.querySelector('#page-workshop .ws-safe') || {}).textContent || '' }; });
  ok(sf.safe && sf.mark === undefined && !sf.key && sf.style !== '3px' && /without your layers, as you asked/.test(sf.banner), 'Start without your layers: none of them is applied, and the Workshop says so', sf);
  await p.evaluate(() => IngWorkshop.safeStart(false)); await p.waitForTimeout(500); await open();
  const back = await p.evaluate(async () => { await new Promise(r => setTimeout(r, 1200)); return { safe: IngWorkshop.safe(), mark: window.__invented, key: !!document.querySelector('.nav-btn[data-lyr="pinv"]') }; });
  ok(!back.safe && back.mark === 1 && back.key, 'Start with your layers again: they are back', back);
  await p.evaluate(() => localStorage.setItem('ing.layers.boot', JSON.stringify({ at: Date.now(), running: 'cinv', name: 'Invented mark' }))); await p.reload(); await open();
  const auto = await p.evaluate(async () => { await new Promise(r => setTimeout(r, 1200)); go('workshop'); return { safe: IngWorkshop.safe(), mark: window.__invented, banner: (document.querySelector('#page-workshop .ws-safe') || {}).textContent || '' }; });
  ok(auto.safe && auto.mark === undefined && /the last start stopped while your script Invented mark ran/.test(auto.banner), 'a start that stopped inside one of her scripts makes the next start safe, and names the script', auto);
  await p.evaluate(() => IngWorkshop.safeStart(false)); await p.waitForTimeout(500); await open();

  /* 7. Folders: her rule, once; and How I work, on every app in every Code session and every Build request */
  const fr = await p.evaluate(async () => { state.folders = state.folders || { how: '', ui: {} }; state.folders.how = '- One step at a time.'; delete (state.ingRules || {}).scroll; saveState();
    go('folders'); await new Promise(r => setTimeout(r, 200)); const a = state.folders.how; go('folders'); const b2 = state.folders.how;
    const pr = await ccMakeProject('Invented ferns', [{ name: 'index.html', text: '<!doctype html><title>Ferns</title><p>fern</p>' }], 'index.html'); go('code'); try { closeModal(); } catch (e) {} ccNewSession(pr);
    const sys = chatSystemPrompt(20000); return { a, same: a === b2, sys: sys.slice(sys.indexOf('How I work, on every app'), sys.indexOf('How I work, on every app') + 260) }; });
  ok(/^- One step at a time\.\n- Scroll bars: hidden from view in every app, with scrolling kept/.test(fr.a) && fr.same, 'her rule is added once to How I work, on every app, after her own words', fr.a);
  ok(/How I work, on every app \(in my own words\):\n- One step at a time\.\n- Scroll bars: hidden/.test(fr.sys), 'a Code session on an app not in a folder carries How I work, on every app, so every new app follows it', fr.sys);
  await http('POST', '/reset');
  await p.evaluate(([base]) => { state.cloud = { provider: 'anthropic', base, key: 'test-key', model: 'claude-opus-5-5', models: ['claude-opus-5-5'], on: true }; state.chatSource = 'cloud'; state.thinking = false; state.agent = state.agent || {}; state.agent.buildEff = '1'; saveState();
    go('build'); const ce = document.getElementById('codeEditor'); ce.value = '<!doctype html>\n<html><body><h1 id="title"></h1>\n<script>\nfunction greet(n){document.getElementById("title").textContent="Hello, "+n+"!";}\ngreeet("world");\n</script>\n</body></html>\n'; ce.dispatchEvent(new Event('input', { bubbles: true })); runBuild(); }, [MOCK]);
  await p.waitForTimeout(700); await p.fill('#agBuild textarea.agb-in', 'Make the page greet the gardener.'); await p.click('#agBuild .agb-go');
  await p.waitForFunction(() => !IngAgent.build.state.busy, null, { timeout: 120000 }).catch(() => {});
  const rep = await http('GET', '/report'); const q = (rep.requests || [])[0] || {};
  ok(/How I work, on every app \(in my own words\):\n- One step at a time\.\n- Scroll bars: hidden/.test(q.sys || ''), 'and so does every request Build makes', String(q.sys || '').slice(-300));

  const own = errs.filter(e => !/greeet is not defined/.test(e));
  ok(!own.length, 'no errors on the page (besides the invented failures, and the invented page\'s own mistake)', own);
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})();
