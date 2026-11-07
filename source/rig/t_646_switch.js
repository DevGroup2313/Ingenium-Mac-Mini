// node rig/t_646_switch.js <Ingenium page url> <out dir>
// Who answers, at hand (Ingenium 6.46; modules/r244.js, r144.js, build_page.py 6.46). Her words (6 November 2026): "Switching between providers
// and connections in Ingenium is really tedious and the whole setting is hidden and not very visible or accessible to new users. I want that
// process to be improved and be more acessible to me, its a bit flawed right now."
// Stand-ins at the page's own address and for Anthropic's (page.route; the keys and the models are invented): Claude lists three models for a
// key and refuses another; Ollama on another computer lists two; another service of OpenAI's form lists forty.
// Checks: with nothing set up, the key beside the message box says Choose who answers and its menu offers Connect a service and Get a model,
// and an empty chat says so too; Controls' A connection opens Connect a service; the sheet's three steps (a refused key said plainly, where to
// get one, the models the service lists with the strongest suggested, Use), and the connection kept; a second and a third; the menu's Who
// answers (each place one press), Find a model across every model of every connection; a model on this device chosen there answers from
// it; the top bar's key names who answers and switches from any page without leaving it; Settings opens on Connect a service with the form
// folded; key fields have the page's look; the tour and Help say what the key does; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const p = await (await b.newContext({ viewport: { width: 1360, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  const ORIGIN = new URL(URL_).origin;
  const calls = { claude: 0, ollama: 0, many: 0 };
  await p.route('https://api.anthropic.com/**', (route) => { calls.claude++; const h = route.request().headers();
    if (h['x-api-key'] !== 'sk-ant-invented-good') return route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ type: 'error', error: { type: 'authentication_error', message: 'invalid x-api-key' } }) });
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: [{ id: 'claude-sonnet-5-5' }, { id: 'claude-opus-5-5' }, { id: 'claude-haiku-5-5' }] }) }); });
  await p.route('**/mockollama/**', (route) => { calls.ollama++; return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ models: [{ name: 'invented-local:8b' }, { name: 'invented-small:1b' }] }) }); });
  await p.route('**/mockmany/**', (route) => { calls.many++; const d = []; for (let i = 0; i < 40; i++) d.push({ id: 'maker' + (i % 5) + '/invented-model-' + i }); d.push({ id: 'maker9/rare-needle-model' });
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: d }) }); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  if (process.env.INJECT) { const src = fs.readFileSync(process.env.INJECT, 'utf8'); const css = (src.match(/<style[^>]*>([\s\S]*?)<\/style>/) || [])[1] || ''; const js = (src.match(/<script>([\s\S]*?)<\/script>/) || [])[1] || '';
    await p.addStyleTag({ content: css }); await p.addScriptTag({ content: js }); await p.waitForTimeout(300); }  // trying the module on a page built without it
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500);
  await p.evaluate(() => { state.cloud = { provider: '', base: '', key: '', model: '', on: false }; state.cxKept = []; state.chatSource = 'local'; state.activeModelId = null; saveState(); go('chat'); }); await p.waitForTimeout(500);
  await p.evaluate(() => { const n = document.getElementById('chatNew'); if (n) n.click(); }); await p.waitForTimeout(400);
  // 1. nothing set up
  const s1 = await p.evaluate(() => { paintChatTop(); const b = document.getElementById('chatModelBtn'); const hello = document.querySelector('#chatScroll .wa-hello');
    return { name: document.getElementById('chatModelName').textContent, attn: b.classList.contains('wa-attn'), hello: hello ? hello.textContent : '' }; });
  ok(s1.name === 'Choose who answers' && s1.attn && /connect a service/i.test(s1.hello), 'with nothing set up, the key beside the message box says Choose who answers, and the empty chat offers Connect a service and Get a model', s1);
  await p.click('#chatModelBtn'); await p.waitForTimeout(300);
  const m1 = await p.evaluate(() => { const m = document.getElementById('chatModelMenu'); return { open: !m.hidden, text: m.innerText, chips: [...m.querySelectorAll('.wa-chip')].map(c => c.textContent), empty: !!m.querySelector('.wa-empty'), add: !!m.querySelector('.wa-add') }; });
  await p.screenshot({ path: OUT + '/1_menu_empty.png' });
  ok(m1.open && m1.empty && /Connect a service/.test(m1.text) && /Get a model/.test(m1.text) && m1.chips.includes('This device') && m1.chips.some(c => /Connect/.test(c)) && !/No models yet\. Add them on the Models page/.test(m1.text), 'its menu opens on Who answers (This device, ＋ Connect), says nothing answers yet and offers both ways', m1);
  await p.evaluate(() => closeChatMenus());
  // 2. Controls' A connection, with nothing set up, opens Connect a service
  await p.evaluate(() => { const sc = document.getElementById('srcCloud'); sc.click(); }); await p.waitForTimeout(300);
  const s2 = await p.evaluate(() => { const root = document.getElementById('modalRoot'); return { open: root.classList.contains('open'), tiles: [...document.querySelectorAll('.wa-sheet .wa-svc')].map(t => t.getAttribute('data-p')) }; });
  await p.screenshot({ path: OUT + '/2_sheet_choose.png' });
  ok(s2.open && ['anthropic', 'openai', 'gemini', 'moonshot', 'openrouter', 'ollama-local', 'ollama-lan', 'ollama-cloud', 'lmstudio', 'ingenium', 'openai-compat'].every(x => s2.tiles.includes(x)), 'Controls\' A connection, with nothing set up, opens Connect a service: every service Settings lists, as a tile', s2.tiles);
  // 3. Claude: a refused key, said plainly; then the right one; the models; Use
  await p.click('.wa-sheet .wa-svc[data-p="anthropic"]'); await p.waitForTimeout(250);
  const k0 = await p.evaluate(() => { const i = document.getElementById('waKey'); const cs = getComputedStyle(i); const a = document.querySelector('.wa-sheet .wa-note a');
    return { type: i.type, radius: cs.borderTopLeftRadius, width: i.getBoundingClientRect().width, link: a ? a.href : '' }; });
  ok(k0.type === 'password' && parseFloat(k0.radius) >= 6 && k0.width > 200 && /console\.anthropic\.com/.test(k0.link), 'step two asks for the key in a field with the page\'s look, and says where to make one', k0);
  await p.click('#waGo'); await p.waitForTimeout(200);
  const e0 = await p.evaluate(() => (document.querySelector('.wa-sheet .wa-err') || {}).textContent || '');
  ok(/Paste your key first/.test(e0), 'Connect with no key asks for it, and sends nothing', { e0, calls: calls.claude });
  await p.fill('#waKey', 'sk-ant-invented-bad'); await p.click('#waGo'); await p.waitForFunction(() => !!document.querySelector('.wa-sheet .wa-err'), null, { timeout: 10000 }).catch(() => {});
  const e1 = await p.evaluate(() => (document.querySelector('.wa-sheet .wa-err') || {}).textContent || '');
  await p.screenshot({ path: OUT + '/3_refused.png' });
  ok(/Claude refused the key/.test(e1) && /copied whole/.test(e1), 'a refused key is said plainly (copied whole, still active), not as the service\'s code', e1);
  await p.fill('#waKey', 'sk-ant-invented-good'); await p.click('#waGo'); await p.waitForFunction(() => !!document.getElementById('waUse'), null, { timeout: 10000 }).catch(() => {});
  const k3 = await p.evaluate(() => ({ models: [...document.querySelectorAll('.wa-sheet .wa-model')].map(x => x.textContent), use: (document.getElementById('waUse') || {}).textContent }));
  await p.screenshot({ path: OUT + '/4_pick.png' });
  ok(k3.models.length === 3 && /^Claude Opus 5\.5suggested$/.test(k3.models[0]) && k3.use === 'Use Claude Opus 5.5', 'step three lists the models the service gives, in Anthropic\'s writing, the strongest first and suggested', k3);
  await p.click('#waUse'); await p.waitForTimeout(400);
  const s3 = await p.evaluate(() => ({ prov: state.cloud.provider, model: state.cloud.model, on: state.cloud.on, src: state.chatSource, kept: (state.cxKept || []).map(k => k.provider), name: document.getElementById('chatModelName').textContent,
    where: (document.querySelector('#chatModelBtn .wa-where') || {}).textContent, pill: document.getElementById('activeModelName').textContent, modal: document.getElementById('modalRoot').classList.contains('open') }));
  ok(s3.prov === 'anthropic' && s3.model === 'claude-opus-5-5' && s3.on && s3.src === 'cloud' && s3.kept.includes('anthropic') && s3.name === 'Claude Opus 5.5' && s3.where === 'Claude' && s3.pill === 'Claude Opus 5.5' && !s3.modal,
    'Use: Claude answers at once, the connection is kept, and both keys name it (the one beside the message box says Claude beside the model)', s3);
  // 4. a second and a third: Ollama on another computer, and a service of OpenAI's form with forty models
  await p.evaluate(() => IngWho.open('ollama-lan')); await p.waitForTimeout(200);
  await p.fill('#waAddr', ORIGIN + '/mockollama'); await p.click('#waGo'); await p.waitForFunction(() => !!document.getElementById('waUse'), null, { timeout: 10000 }).catch(() => {});
  await p.click('#waUse'); await p.waitForTimeout(300);
  await p.evaluate(() => IngWho.open('openai-compat')); await p.waitForTimeout(200);
  await p.fill('#waAddr', ORIGIN + '/mockmany/v1'); await p.click('#waGo'); await p.waitForFunction(() => !!document.getElementById('waUse'), null, { timeout: 10000 }).catch(() => {});
  const many = await p.evaluate(() => ({ find: !!document.querySelector('.wa-sheet .wa-find'), n: document.querySelectorAll('.wa-sheet .wa-model').length }));
  await p.click('#waUse'); await p.waitForTimeout(300);
  const s4 = await p.evaluate(() => ({ kept: (state.cxKept || []).map(k => k.provider), prov: state.cloud.provider }));
  ok(s4.kept.length === 3 && ['anthropic', 'ollama-lan', 'openai-compat'].every(x => s4.kept.includes(x)) && s4.prov === 'openai-compat' && many.find && many.n === 41, 'Ollama on another computer and a service with forty-one models connect the same way (the long list can be searched); all three are kept', { s4, many });
  // 5. the menu: who answers, one press each
  await p.click('#chatModelBtn'); await p.waitForTimeout(300);
  const m5 = await p.evaluate(() => { const m = document.getElementById('chatModelMenu'); return { chips: [...m.querySelectorAll('.wa-chip')].map(c => c.textContent + (c.getAttribute('aria-pressed') === 'true' ? '*' : '')), find: !!m.querySelector('.wa-find') }; });
  await p.screenshot({ path: OUT + '/5_menu_three.png' });
  ok(m5.chips[0] === 'This device' && m5.chips.some(c => c === 'Claude') && m5.chips.some(c => /^Ollama · /.test(c)) && m5.chips.some(c => /\*$/.test(c) && /127\.0\.0\.1|localhost/.test(c)) && m5.find, 'the menu opens on Who answers: this device and each connection, the one answering marked, and Find a model', m5);
  await p.evaluate(() => { const c = [...document.querySelectorAll('#chatModelMenu .wa-chip')].find(x => x.textContent === 'Claude'); c.click(); }); await p.waitForTimeout(300);
  const s5 = await p.evaluate(() => ({ prov: state.cloud.provider, model: state.cloud.model, src: state.chatSource, open: !document.getElementById('chatModelMenu').hidden, pressed: [...document.querySelectorAll('#chatModelMenu .wa-chip')].filter(c => c.getAttribute('aria-pressed') === 'true').map(c => c.textContent) }));
  ok(s5.prov === 'anthropic' && s5.model === 'claude-opus-5-5' && s5.src === 'cloud' && s5.open && s5.pressed[0] === 'Claude', 'one press on Claude: Claude answers again (the model last chosen there), and the menu stays open on it', s5);
  // Find a model: past the fourteen the menu shows of a connection
  await p.fill('#chatModelMenu .wa-find', 'needle'); await p.waitForTimeout(200);
  const f5 = await p.evaluate(() => [...document.querySelectorAll('#chatModelMenu .wa-results .menu-btn')].map(x => x.title));
  ok(f5.length === 1 && f5[0] === 'maker9/rare-needle-model', 'Find a model searches every model of every connection, not only the fourteen shown', f5);
  await p.evaluate(() => { const b = document.querySelector('#chatModelMenu .wa-results .menu-btn'); b.click(); }); await p.waitForTimeout(300);
  const s6 = await p.evaluate(() => ({ prov: state.cloud.provider, model: state.cloud.model }));
  ok(s6.prov === 'openai-compat' && s6.model === 'maker9/rare-needle-model', 'pressing what was found switches to that service and model', s6);
  // a model on this device, chosen in the menu, answers from this device
  await p.evaluate(() => { state.models = state.models || []; if (!state.models.some(m => m.id === 'sw-test')) state.models.push({ id: 'sw-test', customName: 'Invented local (test)', fileState: 'ready', sizeBytes: 1, color: '#7a5' }); saveState(); });
  await p.click('#chatModelBtn'); await p.waitForTimeout(300);
  await p.evaluate(() => { const b = [...document.querySelectorAll('#chatModelMenu .wa-body .menu-btn')].find(x => /Invented local \(test\)/.test(x.textContent)); b.click(); }); await p.waitForTimeout(300);
  const s7 = await p.evaluate(() => ({ src: state.chatSource, active: state.activeModelId, name: document.getElementById('chatModelName').textContent, pill: document.getElementById('activeModelName').textContent }));
  ok(s7.src === 'local' && s7.active === 'sw-test' && s7.name === 'Invented local (test)' && s7.pill === 'Invented local (test)', 'a model on this device chosen in that menu answers from this device, and both keys say so', s7);
  // 6. the top bar's key, from another page
  await p.evaluate(() => go('home')); await p.waitForTimeout(300);
  await p.click('#activeModelPill'); await p.waitForTimeout(250);
  const t6 = await p.evaluate(() => { const pop = document.getElementById('waPop'); return { open: !!pop && !pop.hidden, rows: [...pop.querySelectorAll('.wa-row')].map(r => r.textContent), page: (document.querySelector('section.active') || {}).id }; });
  await p.screenshot({ path: OUT + '/6_top_pop.png' });
  ok(t6.open && /^This device/.test(t6.rows[0]) && t6.rows.some(r => /Claude/.test(r)) && t6.rows.some(r => /Connect a service/.test(r)), 'the top bar\'s key opens Who answers: this device, each connection, Connect a service', t6);
  await p.evaluate(() => { const r = [...document.querySelectorAll('#waPop .wa-row')].find(x => /Claude/.test(x.textContent)); r.click(); }); await p.waitForTimeout(300);
  const t7 = await p.evaluate(() => ({ prov: state.cloud.provider, src: state.chatSource, page: (document.querySelector('section.active') || {}).id, pill: document.getElementById('activeModelName').textContent, closed: document.getElementById('waPop').hidden }));
  ok(t7.prov === 'anthropic' && t7.src === 'cloud' && t7.page === t6.page && /Claude/.test(t7.pill) && t7.closed, 'one press there switches to Claude without leaving the page, and the key names it', t7);
  // 7. Settings: Connect a service first, the form folded
  await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'ai', true); IngSettingsParts.show('ai', 'conn', true); } catch (e) {} }); await p.waitForTimeout(500);
  const g7 = await p.evaluate(() => { const card = document.getElementById('cxProvider').closest('.card'); const kids = [...card.children].map(c => c.id || c.tagName.toLowerCase() + (c.className ? '.' + String(c.className).split(' ')[0] : ''));
    const hand = document.getElementById('waHand'); return { kids, hand: !!hand && hand.contains(document.getElementById('cxProvider')), open: hand && hand.open, keyField: (() => { const k = document.getElementById('cxKey'); return k ? getComputedStyle(k).borderTopLeftRadius : ''; })() }; });
  await p.evaluate(() => { const h = document.getElementById('waHero'); if (h) h.scrollIntoView({ block: 'start' }); }); await p.waitForTimeout(200);
  await p.screenshot({ path: OUT + '/7_settings.png' });
  ok(g7.kids.indexOf('waHero') >= 0 && g7.kids.indexOf('cxKept') === g7.kids.indexOf('waHero') + 1 && g7.hand && g7.open === false && g7.keyField === '9px', 'Settings\' Connections card opens on Connect a service and the connections kept; the form by hand folds away under them; its key field has the page\'s look', g7);
  // 8. the tour and Help
  const h8 = await p.evaluate(() => { const all = document.documentElement.innerHTML; return { help: /Names who answers right now/.test(all), oldHelp: /Press it to open Models and choose another\./.test(all), tour: /the second key lets you choose who answers/.test(all), oldTour: /Tap either one to open the Models page/.test(all) }; });
  ok(h8.help && !h8.oldHelp && h8.tour && !h8.oldTour, 'Help and the tour say what the top bar\'s key does now', h8);
  ok(errs.length === 0, 'no script errors on the page', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
