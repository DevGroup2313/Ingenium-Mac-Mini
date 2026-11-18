// Ingenium 7.42: who serves your models, her computers in her order (r328). Her answer (18 November 2026): "I want the Mac mini as the
// default with the 2 TB drive but also if its not available or near, I want to use the HP 16GB laptops." Her approved preview:
// source/previews/model_server (https://claude.ai/artifact/9YgFwK1uKce3NXHgD4xRzt).
// Two stand-in computers (rig/lend681_mock.py): "Mac mini" (a computer without a screen) and "HP laptop". Invented names and models.
//   node rig/t_742_serve.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const LOG = path.join(OUT, 'lenders.jsonl'), CODE = 'K7QM-4HXP', PM = 8301, PH = 8302;
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
try { fs.unlinkSync(LOG); } catch (e) {}
const lender = (port, id, name, kind) => cp.spawn('python3', ['-I', path.join(__dirname, 'lend681_mock.py'), String(port), LOG, CODE, id, name, kind, '127.0.0.1:' + port], { stdio: 'ignore', detached: true });
const stop = c => { try { process.kill(-c.pid, 'SIGKILL'); } catch (e) {} };
(async () => {
  let MINI = lender(PM, 'mini0001', 'Mac mini', 'box'); const HP = lender(PH, 'hp000001', 'HP laptop', 'laptop'); await sleep(1200);
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage(); p.setDefaultTimeout(120000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngServe && window.IngLend, null, { timeout: 600000, polling: 500 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  // pair the HP laptop first, then the Mac mini: the Mac mini still comes first, as her default
  const pr = await p.evaluate(async ([a, b2, code]) => { const out = []; for (const x of [b2, a]) { try { const c = await IngLend.pair('127.0.0.1:' + x, code); out.push(c.id); } catch (e) { out.push('err ' + (e && e.message || e)); } } return out; }, [PM, PH, CODE]);
  ok(pr.length === 2 && !pr.some(x => /^err/.test(x)), 'both computers pair', pr);
  const o1 = await p.evaluate(() => IngServe.order()); ok(o1[0] === 'mini0001' && o1[1] === 'hp000001', 'the Mac mini comes first, though paired second: her default', o1);
  await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'ai'); } catch (e) {} try { IngSettingsParts.show('ai', 'devices', false); } catch (e) {} IngServe.paint(true); }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const c = document.getElementById('srvCard'); if (c && c.classList.contains('rm-shut')) { const h = c.querySelector('.st-th'); if (h) h.click(); } }); await p.waitForTimeout(800);
  const c1 = await p.evaluate(() => { const c = document.getElementById('srvCard'), l = document.getElementById('linkCard'); if (!c) return null; const rows = [...c.querySelectorAll('.sv-row')];
    return { shown: !!c.offsetParent && !!c.querySelector('.st-th') && c.querySelector('.sv-row').getBoundingClientRect().height > 30, after: l && l.nextElementSibling === c, names: rows.map(r => r.querySelector('.sv-who b').textContent), def: rows[0] && /Your default/.test(rows[0].textContent), sw: c.querySelector('.sv-tg').getAttribute('aria-checked'), why: !!c.querySelector('details.sv-why') }; });
  ok(c1 && c1.shown && c1.after && c1.names.join() === 'Mac mini,HP laptop' && c1.def && c1.sw === 'true' && c1.why, 'Settings, Your devices: Who serves your models, after the pairing card, in her order, the switch on, the drives note folded', c1);
  const row = p.locator('#srvCard .sv-row').first(); const r0 = await row.evaluate(e => getComputedStyle(e).transform); await row.hover(); await p.waitForTimeout(450); const r1 = await row.evaluate(e => getComputedStyle(e).transform);
  ok(r0 === 'none' && r1 !== 'none', 'each row keeps its look at rest and lifts under the pointer', { r0, r1 });
  const sh = await p.evaluate(() => { const k = document.querySelector('#srvCard .sv-mini button'); return getComputedStyle(k).boxShadow; }); ok(/rgba/.test(sh) && sh.split('rgba').length > 2, 'the up and down keys are raised', sh.slice(0, 80));
  await p.screenshot({ path: OUT + '/1_card.png' });
  // a message: the Mac mini answers, and the chat says so under the answer
  await p.evaluate(() => { IngLend.use('mini0001', 'Scriba 4B'); }); await p.waitForTimeout(600);
  const openTile = () => p.evaluate(() => { const c = document.getElementById('srvCard'); if (c && c.classList.contains('rm-shut')) { const h = c.querySelector('.st-th'); if (h) h.click(); } });
  const send = async t => { const n0 = await p.evaluate(t => { go('chat'); const n = curMsgs().length; const i = document.getElementById('chatInput'); i.value = t; window.__t0 = Date.now(); sendChat(); return n; }, t);
    await p.waitForFunction(n0 => { const m = curMsgs(); const l = m[m.length - 1]; return m.length >= n0 + 2 && l.role === 'bot' && !l.live && l.text; }, n0, { timeout: 30000, polling: 100 }).catch(() => {});
    const ms = await p.evaluate(() => Date.now() - window.__t0); console.log('  (answered in ' + ms + ' ms)'); await p.waitForTimeout(600);
    return p.evaluate(() => { const m = curMsgs(), last = m.slice(-1)[0]; const nodes = [...document.querySelectorAll('#chatScroll .msg.bot')]; const n = nodes[nodes.length - 1];
      return { text: last && last.text, srv: last && last.srv, said: n && (n.querySelector('.sv-said') || {}).textContent, lend: state.cloud.lendId }; }); };
  await p.evaluate(() => { go('chat'); document.getElementById('chatNew').click(); }); await p.waitForTimeout(500);
  const m1 = await send('Hello?');
  ok(/Hello from/.test(m1.text || '') && m1.lend === 'mini0001' && m1.said === 'Answered by Mac mini.', 'the Mac mini answers, and the chat says so under the answer', m1);
  // the Mac mini goes away: the HP laptop answers, and the chat says the Mac mini was away
  stop(MINI); await sleep(800);
  await p.evaluate(() => { try { IngLend.check('mini0001', { find: false }); } catch (e) {} }); await p.waitForTimeout(5000);
  const m2 = await send('Are you there?');
  ok(/Hello from/.test(m2.text || '') && m2.lend === 'hp000001' && m2.said === 'Answered by HP laptop: Mac mini was away.', 'with the Mac mini away, the HP laptop answers, keeping her model, and the chat says the Mac mini was away', m2);
  const asked = fs.readFileSync(LOG, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)).filter(l => /chat\/completions/.test(l.path || '') && l.port === PH);
  ok(asked.length >= 2 && asked[asked.length - 1].model === 'Scriba 4B', 'the HP laptop was asked for the same model', asked.slice(-1).map(a => a.model));
  // the Mac mini back: it serves again, first in her order
  MINI = lender(PM, 'mini0001', 'Mac mini', 'box'); await sleep(1500);
  const m3 = await send('And now?');
  ok(m3.lend === 'mini0001' && m3.said === 'Answered by Mac mini.', 'the Mac mini back, it serves again: first in her order', m3);
  // she reorders: the HP laptop first
  await p.evaluate(() => { go('settings'); try { IngRooms.open('settings', 'ai'); } catch (e) {} try { IngSettingsParts.show('ai', 'devices', false); } catch (e) {} IngServe.paint(true); }); await p.waitForTimeout(1200); await openTile(); await p.waitForTimeout(800);
  await p.locator('#srvCard .sv-row').nth(1).locator('button[aria-label^="Move up"]').click(); await p.waitForTimeout(300);
  const o2 = await p.evaluate(() => ({ o: IngServe.order(), kept: state.lend.order.slice(), first: document.querySelector('#srvCard .sv-row .sv-who b').textContent }));
  ok(o2.o[0] === 'hp000001' && o2.kept[0] === 'hp000001' && o2.first === 'HP laptop', 'Move up: the HP laptop first, kept on this device', o2);
  const m4 = await send('Who now?'); ok(m4.lend === 'hp000001' && m4.said === 'Answered by HP laptop.', 'her new order is followed', m4);
  // switched off: the chosen computer answers, as before
  await p.evaluate(() => { IngServe.auto(false); IngLend.use('mini0001', 'Scriba 4B'); }); await p.waitForTimeout(400);
  const m5 = await send('Off?'); ok(m5.lend === 'mini0001' && !m5.said, 'switched off, the computer she chose answers and nothing is added', m5);
  await p.evaluate(() => IngServe.auto(true));
  // by night
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); go('settings'); try { IngRooms.open('settings', 'ai'); } catch (e) {} try { IngSettingsParts.show('ai', 'devices', false); } catch (e) {} IngServe.paint(true); }); await p.waitForTimeout(1200); await openTile(); await p.waitForTimeout(800);
  const nt = await p.evaluate(() => getComputedStyle(document.querySelector('#srvCard .sv-who b')).color); ok(/rgb\(2[2-5]\d, 2[2-5]\d, 2[2-5]\d\)/.test(nt), 'by night its names are light on the dark card', nt);
  await p.locator('#srvCard').screenshot({ path: OUT + '/2_night.png' });
  // nothing scrolls sideways, and nothing is redrawn while left alone
  const sc = await p.evaluate(() => { const c = document.getElementById('srvCard'); return c.scrollWidth <= c.clientWidth + 1; }); ok(sc, 'no sideways scroll in the card');
  const sig0 = await p.evaluate(() => { window.__svN = 0; const o = new MutationObserver(m => { window.__svN += m.length; }); o.observe(document.getElementById('srvCard'), { childList: true, subtree: true }); return 1; });
  await p.waitForTimeout(6000); const redraw = await p.evaluate(() => window.__svN); ok(redraw === 0, 'left alone, the card is not redrawn', redraw);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); stop(MINI); stop(HP); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
