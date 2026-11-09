// Ingenium in its own words, and the Author Studio in Settings (Ingenium 6.25; modules r219, r220, r222, r223, r226, r227, r173 and
// two edits in build_page.py). Her words (5 November 2026): "There is a lot of mention of Claude on the Plan and session panel of the
// Coding chat, please remove them unless it is referring to a function that connects to Claude. I want for Ingenium's pages and
// chatrooms to have their own identities, please [remove] the Claude, Ollama and GitHub comparisons and others if there are more
// scattered around the app. I specifically want you to start with the Plan and session panel in the Coding chat page." And: "Please
// rename the "Workshop" page to the Author Studio. Perhaps it would look better added to the Setting page instead of being a part of
// Ingenium's side navigation bar."
//   node rig/t_625_words.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1600))); c ? pass++ : fail++; };
// a comparison: Ingenium described by another product's way of doing it (not a name where Ingenium connects to it or reads its files)
// ("files named like Ollama tags" and "the client id, as GitHub shows it" describe those services themselves, and stay)
const COMPARE = /\bas (?:in )?Claude\b|\bas Claude['’]s\b|\bthe way Claude\b|\blike Claude\b|\ba Claude session\b|\bClaude['’]s (?:coding )?sessions\b|\bClaude['’]s connectors\b|\bClaude['’]s projects do\b|\bas in (?:GitHub|Ollama|ChatGPT)\b|\b(?:as|like) (?:GitHub|Ollama|ChatGPT)['’]s\b|\bas (?:GitHub|Ollama|ChatGPT) do(?:es)?\b|\bthe way (?:GitHub|Ollama|ChatGPT)\b/;
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.waitForTimeout(600);

  /* 1. the page's own words, everywhere: the whole page as it is served (its code and markup) holds no comparison */
  const raw = await p.evaluate(async () => { const r = await fetch(location.href); return r.text(); });
  const hits = []; const g = new RegExp(COMPARE.source, 'g'); let m; while ((m = g.exec(raw)) && hits.length < 20) hits.push(raw.slice(Math.max(0, m.index - 90), m.index + 90).replace(/\s+/g, ' '));
  ok(raw.length > 1e6 && hits.length === 0, 'nowhere in the page (code, markup, the tour, the Guide, What is new) is Ingenium described by another assistant\'s way of doing it', hits);

  /* 2. the Plan and session column of a Code session, as she sees it */
  const panel = await p.evaluate(async () => {
    const pr = await ccMakeProject('Invented garden', [{ name: 'index.html', text: '<!doctype html><title>Garden</title><p>fern</p>' }], 'index.html');
    go('code'); try { closeModal(); } catch (e) {} ccNewSession(pr); await new Promise(r => setTimeout(r, 700));
    try { IngR215.PANEL.plan = true; IngR215.PANEL.session = true; ccState().panel = { plan: true, session: true }; } catch (e) {}
    go('home'); go('code'); await new Promise(r => setTimeout(r, 1200));
    const el = document.querySelector('#ccPanel'); return el ? el.innerText : '';
  });
  ok(/Plan and session/.test(panel) && /GitHub · work on one of your repositories: its branch is read/.test(panel) && /Tools from outside services that the model can use while it works \(MCP servers\)\. None yet\./.test(panel) && !/Claude/.test(panel),
    'the Plan and session column names no other assistant: GitHub where Ingenium connects to it, and connectors in its own words', panel.slice(0, 1400));
  await p.screenshot({ path: OUT + '/plan_and_session.png' });

  /* 3. every page's words, hidden rooms included (text nodes, not code), hold no comparison; the real connections keep their names */
  const words = await p.evaluate(async () => { const out = {}; const pages = [...document.querySelectorAll('[data-page]')].map(x => x.getAttribute('data-page')).filter((v, i, a) => a.indexOf(v) === i && !/^(tabula|abacus|slides|scriba|fontes)$/.test(v));
    const text = () => { const w = document.createTreeWalker(document.querySelector('main') || document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && n.parentElement.closest('script,style,template,noscript') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT }); let s = '', n; while ((n = w.nextNode())) s += n.nodeValue + ' '; return s.replace(/\s+/g, ' '); };
    for (const pg of pages) { try { go(pg); } catch (e) {} await new Promise(r => setTimeout(r, 900)); out[pg] = text(); }
    try { openProjects(); await new Promise(r => setTimeout(r, 300)); const pj = document.getElementById('pjList'); out.projects = pj && pj.parentElement ? pj.parentElement.textContent : ''; closeModal(); } catch (e) { out.projects = ''; }
    out.tour = (window.ING_TOUR || []).map(s => (s.t || '') + ' ' + (s.b || '')).join(' ');
    return out; });
  const bad = Object.entries(words).filter(([k, v]) => COMPARE.test(v)).map(([k, v]) => k + ': ' + v.slice(Math.max(0, v.search(COMPARE) - 80), v.search(COMPARE) + 80));
  ok(Object.keys(words).length >= 15 && bad.length === 0, 'every page\'s words (every room, the Projects card, the tour) are Ingenium\'s own: ' + Object.keys(words).length + ' read', bad);
  ok(/Bring in your Claude data/.test(words.settings) && /Sign in/.test(words.code + words.fabrica) && /Ollama/.test(words.models), 'the names stay where Ingenium really connects or reads files: your Claude export, GitHub, Ollama', { settings: /Bring in your Claude data/.test(words.settings), models: /Ollama/.test(words.models) });
  ok(/Every model in Ingenium starts each chat with Ingenium's own instructions and its ten rules\. Below them come yours/.test(words.settings), 'Ingenium\'s own instructions are described in its own words', (words.settings.match(/Every model in Ingenium[^.]*\.[^.]*\./) || [''])[0]);
  ok(/every conversation in it shares\. They stay on this device\./.test(words.projects), 'the Projects card is in Ingenium\'s own words', (words.projects || '').slice(0, 300));

  /* 4. the Author Studio: a room of Settings, not a key in the side bar */
  const nav = await p.evaluate(() => [...document.querySelectorAll('.nav-btn[data-page]')].map(x => x.getAttribute('data-page')));
  const rooms = await p.evaluate(() => IngRooms.rooms('settings').filter(r => r.shown).map(r => r.name));
  ok(nav.indexOf('workshop') < 0 && nav.indexOf('settings') >= 0, 'the side bar has no Workshop key', nav);
  ok(rooms.join('|') === 'Everyday|Calm and focus|Models and AI|Your data|Ownership|Author Studio', 'Settings has six rooms, the Author Studio last, after Ownership', rooms);
  const st = await p.evaluate(async () => { go('home'); await new Promise(r => setTimeout(r, 200)); go('workshop'); await new Promise(r => setTimeout(r, 700));
    const panel = document.getElementById('rmP-settings-author'), ws = document.getElementById('wsStudio'), r = ws ? ws.getBoundingClientRect() : { width: 0 };
    return { page: document.querySelector('.section.active').id, room: IngRooms.current('settings'), visible: !!(panel && !panel.hidden && ws && r.width > 300), inPanel: !!(panel && ws && panel.contains(ws)),
      says: (document.getElementById('rmSays-settings') || {}).textContent || '', title: (document.querySelector('#wsStudio .as-title') || {}).textContent || '',
      cards: [...document.querySelectorAll('#wsStudio .card > h2')].map(h => h.textContent), errs: !!document.getElementById('wsErrs') }; });
  ok(st.page === 'page-settings' && st.room === 'author' && st.visible && st.inPanel && st.title === 'Author Studio' && /Author Studio/.test(st.says)
    && st.cards.join('|') === 'Check Ingenium|Errors since it started|Your layers|Your page' && st.errs, 'go("workshop") opens Settings at the Author Studio, with its four cards painted', st);
  await p.screenshot({ path: OUT + '/author_studio_day.png' });
  const sw = await p.evaluate(async () => { document.getElementById('rmT-settings-own').click(); await new Promise(r => setTimeout(r, 300)); const a = document.getElementById('rmP-settings-author').hidden;
    document.getElementById('wsBody').innerHTML = ''; document.getElementById('rmT-settings-author').click(); await new Promise(r => setTimeout(r, 400));
    return { hidAway: a, back: !document.getElementById('rmP-settings-author').hidden, repainted: document.querySelectorAll('#wsStudio .card > h2').length }; });
  ok(sw.hidAway && sw.back && sw.repainted === 4, 'another room hides it; its tab brings it back, painted afresh', sw);
  const fd = await p.evaluate(() => IngRooms.find('diagnostics').map(h => h.room));
  ok(fd.indexOf('author') >= 0, 'Find a setting finds it ("diagnostics")', fd);
  /* the check opens every page in turn and comes back to the room it was run from, even when another room was chosen last */
  await p.evaluate(async () => { document.getElementById('rmT-settings-own').click(); go('home'); await new Promise(r => setTimeout(r, 200)); go('workshop'); await new Promise(r => setTimeout(r, 500)); });
  await p.click('#wsStudio .card:first-child .btn.primary'); await p.waitForFunction(() => document.querySelectorAll('#wsRes .ws-list li').length >= 10, null, { timeout: 90000 }).catch(() => {});
  const ck = await p.evaluate(async () => { return { page: document.querySelector('.section.active').id, room: IngRooms.current('settings'),
    lines: [...document.querySelectorAll('#wsRes .ws-list li')].length, bad: [...document.querySelectorAll('#wsRes .ws-list li.bad')].map(l => l.innerText.slice(0, 120)) }; });
  ok(ck.page === 'page-settings' && ck.room === 'author' && ck.lines >= 10 && ck.bad.length === 0, 'Check Ingenium runs from the room and comes back to it (Ownership was the room chosen last), with no line that says wrong', ck);

  /* 5. the Guide and the tour say Author Studio */
  const gd = await p.evaluate(async () => { go('guide'); await new Promise(r => setTimeout(r, 500)); const c = document.getElementById('wsGuide'); return c ? c.textContent.slice(0, 200) : ''; });
  ok(/^The Author Studio/.test(gd) && /a room of Settings/.test(gd) && !/Workshop/.test(gd), 'the Guide\'s card is the Author Studio, a room of Settings', gd);
  const tr = await p.evaluate(async () => { const i = ING_TOUR.findIndex(s => /The Author Studio/.test(s.t || '')); if (i < 0) return { i };
    document.body.setAttribute('data-motion', 'minimal'); tourI = i; window.tourI = i; tourRender(); await new Promise(r => setTimeout(r, 1700));
    const ring = document.querySelector('.tour-ring'); const r = { i, ring: ring ? ring.id : '', title: ((document.querySelector('#ingTour .tour-title') || {}).textContent || '').replace(/^[^A-Za-z]+/, ''), body: ((document.querySelector('#ingTour .tour-body, #ingTour .tour-card p') || {}).textContent || '').slice(0, 160) };
    try { tourEnd(); } catch (e) {} document.body.removeAttribute('data-motion'); return r; });
  ok(tr.i >= 0 && tr.ring === 'rmT-settings-author' && tr.title === 'The Author Studio', 'the tour\'s step rings the Author Studio\'s tab in Settings', tr);

  /* 6. by night, and on a phone */
  await p.evaluate(async () => { document.body.setAttribute('data-theme', 'night'); go('workshop'); await new Promise(r => setTimeout(r, 500)); });
  const nt = await p.evaluate(() => { const t = document.querySelector('#wsStudio .as-title'), bn = document.querySelector('#wsStudio .as-banner'); return { ink: getComputedStyle(t).color, bg: getComputedStyle(bn).backgroundImage.slice(0, 60) }; });
  await p.screenshot({ path: OUT + '/author_studio_night.png' });
  ok(/rgb\((2[0-9]{2}|1[89][0-9]), ?(2[0-9]{2}|1[89][0-9]), ?(2[0-9]{2}|1[89][0-9])\)/.test(nt.ink), 'by night its title reads light on the dark card', nt);
  await p.evaluate(() => document.body.setAttribute('data-theme', 'day'));
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(700);
  const ph = await p.evaluate(async () => { go('workshop'); await new Promise(r => setTimeout(r, 600)); const ws = document.getElementById('wsStudio'), r = ws.getBoundingClientRect();
    return { over: document.scrollingElement.scrollWidth - innerWidth, left: Math.round(r.left), right: Math.round(r.right), w: innerWidth, tab: !!document.getElementById('rmT-settings-author').offsetParent }; });
  ok(ph.over <= 1 && ph.left >= 0 && ph.right <= ph.w + 1 && ph.tab, 'on a phone the room and its tab fit the screen, with nothing past its edge', ph);
  await p.screenshot({ path: OUT + '/author_studio_phone.png' });

  ok(errs.length === 0, 'no error on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
