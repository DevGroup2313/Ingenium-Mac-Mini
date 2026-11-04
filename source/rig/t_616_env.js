// A Code session's environment, as in Claude's (Ingenium 6.16, modules/r223.js). Her words (4 November 2026): "When I click on the
// Settings button for the Environment section on the Coding chat inside of Ingenium, it just opens up the Controls panel, it does not
// open the settings for the editing the Environment unlike Claude's coding chat settings, please make the fix to bridge that gap as
// well. I want full parity please." The app, its sites, its values and its secret are invented; the two sites are stand-ins.
//   node rig/t_616_env.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1400))); c ? pass++ : fail++; };
const APP = '<!doctype html><html><head><title>Weather</title></head><body><p id="o">weather</p><script>'
  + 'console.log("ENV "+JSON.stringify(window.ENV||null));console.log("SETUP "+(window.__setupRan?"ran":"no"));'
  + 'document.addEventListener("securitypolicyviolation",function(e){console.log("CSP "+e.violatedDirective+" "+e.blockedURI);});'
  + 'fetch("https://api.invented.test/data").then(function(r){return r.text();}).then(function(t){console.log("API "+t);},function(e){console.log("API failed "+e.name);});'
  + 'fetch("https://other.invented.test/x").then(function(r){return r.text();}).then(function(t){console.log("OTHER "+t);},function(e){console.log("OTHER failed "+e.name);});'
  + '</scr' + 'ipt></body></html>';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1500, height: 980 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  const hits = [];
  for (const host of ['api.invented.test', 'other.invented.test']) await ctx.route('https://' + host + '/**', route => { const rq = route.request();
    const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Authorization, X-Api-Key', 'Access-Control-Allow-Methods': 'GET, POST' };
    if (rq.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
    hits.push({ host, auth: rq.headers()['authorization'] || '' }); return route.fulfill({ status: 200, body: host === 'api.invented.test' ? 'ok-api' : 'ok-other', headers: cors }); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  const own = await p.evaluate(async (APP) => { const pr = await ccMakeProject('Invented weather', [{ name: 'index.html', text: APP }], 'index.html'); go('code'); try { closeModal(); } catch (e) {} ccNewSession(pr);
    IngR215.panel('session', true); return { chat: curChat().id, proj: pr.id }; }, APP);
  const lines = async (ms) => { await p.waitForTimeout(ms || 1400); return p.evaluate(() => { const c = document.getElementById('csConsole'); return c ? c.innerText : ''; }); };
  const rerun = async () => { await p.evaluate(() => { try { csCur._ran = null; csRender(); } catch (e) {} }); return lines(); };
  let con = await lines(2000);
  ok(/ENV null/.test(con) && /API ok-api/.test(con) && /OTHER ok-other/.test(con), 'with the Default environment untouched, the app runs as before: no values, every site reached', con.slice(0, 600));

  /* 1. the gear opens the environment, not Controls */
  await p.click('#ccPanel .ccp-gear'); await p.waitForTimeout(250);
  const d = await p.evaluate(() => { const s = document.querySelector('#modalBox .env-sheet'); if (!s) return null; const n = document.getElementById('envName');
    return { title: s.querySelector('h3').textContent, name: n.value, dis: n.disabled, note: document.getElementById('envNameNote').textContent, rows: [...s.querySelectorAll('.env-row')].map(r => r.innerText.replace(/\s+/g, ' ').trim()),
      del: document.getElementById('envDel').hidden, ctl: (document.getElementById('chatCtlBtn') || {}).getAttribute && document.getElementById('chatCtlBtn').getAttribute('aria-expanded') }; });
  ok(d && d.title === 'Environment' && d.ctl !== 'true', 'the gear beside Environment opens the environment, not Controls', d);
  ok(d && d.name === 'Default' && d.dis && /cannot be renamed or removed/.test(d.note) && d.del, 'the Default environment cannot be renamed or removed, as in Claude\'s', d);
  ok(d && d.rows[0] === 'Network access Full ›' && d.rows[1] === 'Network secrets None ›' && d.rows[2] === 'Setup script Not set ›' && d.rows[3] === 'Environment variables None for this environment ›' && /^The model and its engine/.test(d.rows[4]),
    'its rows: network access, network secrets, the setup script, the variables, and the model and its engine', d && d.rows);
  await p.screenshot({ path: OUT + '/env_dialog.png' });

  /* 2. variables: NAME=value lines, refused when a line is not one */
  await p.click('#envVars'); await p.waitForTimeout(120);
  await p.fill('#envVarsT', 'API_BASE=https://api.invented.test\nnot a line'); await p.click('#envDone'); await p.waitForTimeout(100);
  const bad = await p.evaluate(() => ({ still: !!document.getElementById('envVarsT'), say: (document.getElementById('envVarsBad') || {}).textContent }));
  ok(bad.still && /Line 2 is not NAME=value/.test(bad.say), 'a line that is not NAME=value is refused, and says which', bad);
  await p.fill('#envVarsT', '# the base of the stand-in service\nAPI_BASE=https://api.invented.test\nGREETING="hello there"'); await p.click('#envDone'); await p.waitForTimeout(100);
  /* 3. a setup script */
  await p.click('#envSetup'); await p.waitForTimeout(100); await p.fill('#envSetupT', 'window.__setupRan = 1; console.log("setup says hi");'); await p.click('#envDone'); await p.waitForTimeout(100);
  /* 4. a secret for one site */
  await p.click('#envSec'); await p.waitForTimeout(100); await p.click('#envSecAdd');
  await p.fill('#envSecs [data-k="host"]', 'https://api.invented.test/'); await p.fill('#envSecs [data-k="value"]', 'Bearer invented-secret'); await p.click('#envDone'); await p.waitForTimeout(100);
  const rows2 = await p.evaluate(() => [...document.querySelectorAll('#modalBox .env-row')].map(r => r.innerText.replace(/\s+/g, ' ').trim()));
  ok(rows2[1] === 'Network secrets api.invented.test ›' && rows2[2] === 'Setup script 1 line ›' && rows2[3] === 'Environment variables API_BASE, GREETING ›', 'each row says what it now holds, the secret by its site alone', rows2);
  const n0 = hits.length; await p.click('#envOk');
  con = await lines(1800);
  const auth = hits.slice(n0);
  ok(/ENV \{"API_BASE":"https:\/\/api\.invented\.test","GREETING":"hello there"\}/.test(con), 'saved, the app runs again and reads the variables as window.ENV', con.slice(0, 700));
  ok(/setup says hi/.test(con) && /SETUP ran/.test(con) && con.indexOf('setup says hi') < con.indexOf('ENV {'), 'the setup script runs before the app\'s own scripts', con.slice(0, 400));
  ok(auth.some(h => h.host === 'api.invented.test' && h.auth === 'Bearer invented-secret') && auth.some(h => h.host === 'other.invented.test' && h.auth === ''), 'the secret goes with the requests to its site only', auth);

  /* 5. network access: none, then only the sites listed */
  await p.click('#ccPanel .ccp-gear'); await p.waitForTimeout(150); await p.click('#envNet'); await p.waitForTimeout(100);
  await p.check('input[name="envNetR"][value="none"]'); await p.click('#envDone'); await p.waitForTimeout(80);
  let n1 = hits.length; await p.click('#envOk'); con = await lines(1800);
  ok(hits.length === n1 && /The environment refused https:\/\/api\.invented\.test\/data \(connect-src\): its network access is None\./.test(con) && /API failed TypeError/.test(con),
    'with network access None, the browser refuses every request, and the console says what was refused and why', { calls: hits.length - n1, con: con.slice(0, 900) });
  await p.click('#ccPanel .ccp-gear'); await p.waitForTimeout(150); await p.click('#envNet'); await p.waitForTimeout(100);
  await p.check('input[name="envNetR"][value="list"]'); await p.fill('#envHosts', 'not a site!'); await p.click('#envDone'); await p.waitForTimeout(80);
  const hb = await p.evaluate(() => (document.getElementById('envHostBad') || {}).textContent || '');
  ok(/Not a site name: not a site!/.test(hb), 'a line that is not a site\'s name is refused', hb);
  await p.fill('#envHosts', 'api.invented.test'); await p.click('#envDone'); await p.waitForTimeout(80);
  n1 = hits.length; await p.click('#envOk'); con = await lines(1800);
  const got = hits.slice(n1).map(h => h.host);
  ok(got.join() === 'api.invented.test' && /API ok-api/.test(con) && /OTHER failed TypeError/.test(con) && /refused https:\/\/other\.invented\.test\/x/.test(con),
    'with Listed sites only, the listed site is reached and any other refused', { got, con: con.slice(0, 900) });

  /* 6. what the model is told, and what never leaves */
  const told = await p.evaluate(() => { const s = chatSystemPrompt(20000); const i = s.indexOf('This Code session\'s app runs in the environment'); return i >= 0 ? s.slice(i, i + 900) : ''; });
  ok(/environment "Default"/.test(told) && /only these sites: api\.invented\.test/.test(told) && /window\.ENV\.NAME: API_BASE, GREETING/.test(told) && /api\.invented\.test \(Authorization\)/.test(told) && /setup script/.test(told),
    'the model is told the network rule, the variables\' names, the secret\'s site and the setup script', told);
  ok(!/hello there|invented-secret/.test(told), 'and never a value or the secret', told);
  const kept = await p.evaluate(() => { const pr = ccProj(); const t = (pr.files || []).map(f => f.text || '').join('\n') + ccPreviewHtml(pr); return /hello there|invented-secret|setup says hi/.test(t); });
  ok(!kept, 'none of it is written into the app\'s files', kept);
  const rowNow = await p.evaluate(() => { const r = document.querySelector('#ccPanel .env-pick'); return r ? r.innerText.replace(/\s+/g, ' ').trim() : ''; });
  ok(rowNow === '☁ Default · Listed sites only (1) · 2 variables · 1 secret · a setup script', 'the Session column names the environment and what it holds', rowNow);

  /* 7. another environment for this session; the Default untouched; removed, the session returns to the Default */
  await p.click('#ccPanel .ccp-gear'); await p.waitForTimeout(150); await p.click('#envNew'); await p.waitForTimeout(120);
  const nw = await p.evaluate(() => ({ dis: document.getElementById('envName').disabled, del: document.getElementById('envDel').hidden, use: document.getElementById('envUse').value }));
  await p.fill('#envName', 'Weather offline'); await p.click('#envNet'); await p.waitForTimeout(80); await p.check('input[name="envNetR"][value="none"]'); await p.click('#envDone'); await p.waitForTimeout(80);
  await p.click('#envOk'); await p.waitForTimeout(400);
  const two = await p.evaluate(() => ({ now: IngEnv.forChat(curChat()).name, net: IngEnv.forChat(curChat()).net, def: IngEnv.list().filter(e => e.id === 'default')[0].net, n: IngEnv.list().length, row: document.querySelector('#ccPanel .env-pick').innerText.replace(/\s+/g, ' ').trim() }));
  ok(!nw.dis && !nw.del && two.now === 'Weather offline' && two.net === 'none' && two.def === 'list' && two.n === 2 && /^☁ Weather offline · None/.test(two.row), 'a new environment can be named and chosen for this session, and leaves the Default as it was', { nw, two });
  await p.click('#ccPanel .ccp-gear'); await p.waitForTimeout(150); await p.click('#envDel'); await p.waitForTimeout(80); await p.click('#envOk'); await p.waitForTimeout(300);
  const gone = await p.evaluate(() => ({ now: IngEnv.forChat(curChat()).name, n: IngEnv.list().length }));
  ok(gone.now === 'Default' && gone.n === 1, 'removed, its sessions return to the Default', gone);

  /* 8. the engine and the connection are still one press away */
  await p.click('#ccPanel .ccp-gear'); await p.waitForTimeout(150); await p.click('#envModel'); await p.waitForTimeout(400);
  const ctl = await p.evaluate(() => ({ modal: document.getElementById('modalRoot').classList.contains('open'), ctl: document.getElementById('chatCtlBtn').getAttribute('aria-expanded') }));
  ok(!ctl.modal && ctl.ctl === 'true', 'its last row opens Controls, where the engine and the connection are', ctl);
  await p.evaluate(() => { const k = document.getElementById('chatCtlBtn'); if (k.getAttribute('aria-expanded') === 'true') k.click(); });

  /* 9. kept: after a reload, the environment is as it was saved */
  await p.waitForTimeout(1200); await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  const after = await p.evaluate((id) => { const c = (state.chats || []).filter(x => x.id === id)[0]; const e = IngEnv.forChat(c); return { net: e.net, hosts: e.hosts.join(), vars: e.vars.map(v => v.k).join(), sec: e.secrets.length, setup: !!e.setup.trim() }; }, own.chat);
  ok(after.net === 'list' && after.hosts === 'api.invented.test' && after.vars === 'API_BASE,GREETING' && after.sec === 1 && after.setup, 'after a reload, the environment is as it was saved', after);

  /* 10. at phone width the dialog fits */
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(300);
  const ph = await p.evaluate(() => { go('code'); try { IngEnv.open(); } catch (e) { return { err: e.message }; } const s = document.querySelector('#modalBox'); const r = s.getBoundingClientRect(); return { left: Math.round(r.left), right: Math.round(r.right), w: innerWidth, over: document.documentElement.scrollWidth - innerWidth }; });
  ok(ph.left >= 0 && ph.right <= ph.w && ph.over <= 1, 'at phone width the dialog fits the screen', ph);
  await p.screenshot({ path: OUT + '/env_phone.png' });

  ok(!errs.length, 'no errors on the page', errs);
  console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})();
