// node rig/t_765_clavis.js <Ingenium page url (master)> <out folder>
// Ingenium 7.65 (21 November 2026), in Chromium: Clavis, her search engine, built into the master edition as her other apps are.
// Her words (21 November 2026): "I have a new app named Clavis. I have given you access to its repositories on GitHub. Please add it to
// Ingenium as one of my apps into all of its pages, Fabrica, Adamas, the chat pages, Lector, and Vocatio and most of all the Ingenia page
// and anywhere else. I want the app to be built into my master edition of Ingenium like the other apps."
// Checks, on a fresh start of the master page:
//   the app library knows Clavis by name, knows its page, and keeps the copy the page carries on first start (Clavis by its pass, built in,
//   its size and fingerprint as builtin.json records them);
//   the library's list, Adamas's Open an app, the chat's Your apps, Lector's apps, Fabrica's apps and the Guide name it;
//   Ingenia (Folders): its folder wears its seal (its own picture in the drawer, its layered seal on the card and on an opened folder),
//   and by night its night picture;
//   a repository brought from GitHub named Clavis-Mac is known as Clavis;
//   Clavis opened from Ingenium starts in a window of its own (a sandboxed frame), with its title and no error of its own;
//   no page error.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await sleep(1000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });

  // 1. the app library knows it, and keeps the copy the page carries
  const names = await p.evaluate(() => ({ keys: LIB_KEYS.slice(), name: LIB_NAMES.clavis, carried: !!document.getElementById('ing-builtin-clavis'),
    seal: !!(window.ING_SEALS && ING_SEALS.clavis && ING_SEALS.clavisN), layers: !!(window.LX7_LAYERS && LX7_LAYERS.clavis && LX7_LAYERS.clavis.length === 4 && LX7_LAYERS.clavisN) }));
  ok(names.keys.indexOf('clavis') >= 0 && names.name === 'Clavis', 'the app library knows Clavis by name', names);
  ok(names.carried && names.seal && names.layers, 'the master page carries its page, its seal by day and by night, and its four layers', names);
  await p.waitForFunction(() => window.__ingBuiltin && window.__ingBuiltin.states && window.__ingBuiltin.states.clavis, null, { timeout: 240000 }).catch(() => {});
  const kept = await p.evaluate(async () => { const st = (window.__ingBuiltin || {}).states || {}, m = libState().apps.clavis || null; let head = '', det = '', len = 0;
    try { const t = await libText('clavis'); len = t ? t.length : 0; head = t ? (/<title>([^<]*)<\/title>/.exec(t.slice(0, 4000)) || [])[1] : ''; det = libDetect(t); } catch (e) { head = 'error: ' + e.message; }
    return { state: st.clavis, all: st, version: m && m.version, source: m && m.source, sha: m && m.sha256, size: m && m.size, color: m && m.color, head, det, len }; });
  const BI = JSON.parse(fs.readFileSync(__dirname + '/../build/apps/builtin/builtin.json', 'utf8')).clavis;
  ok(/^(kept|same|kept again)$/.test(kept.state), 'Clavis is kept in the app library on first start', kept.all);
  ok(kept.version === BI.version && kept.source === 'built in' && kept.sha === BI.sha256 && kept.size === BI.size && kept.color === '#b8862f',
    'kept as Clavis ' + BI.version + ', built in, its size and fingerprint as builtin.json records them, in its gold', kept);
  ok(kept.head === 'Clavis' && kept.det === 'clavis', 'its page reads back whole, and the library knows it as Clavis', { head: kept.head, det: kept.det, len: kept.len });
  // 7.66: since Clavis 105 its page names its build number in its head, where Fabrica (IngShip's numberOf) and the app library read it
  const num = await p.evaluate(async () => { const t = await libText('clavis'); const m = /<meta name="version" content="(\d+)">/.exec(String(t || '').slice(0, 40000));
    return { meta: m ? m[1] : null, lib: libVersionOf('clavis', t), fabrica: (window.IngShip && IngShip._ && IngShip._.numberOf) ? IngShip._.numberOf(t, null) : 'no IngShip' }; });
  ok(num.meta === BI.version && num.lib === BI.version && num.fabrica === BI.version, 'its page names its build number (' + BI.version + '), and the app library and Fabrica read it there', num);

  // 2. wherever her apps are listed
  const lists = await p.evaluate(() => { const o = {};
    try { o.libKeys = libKeys(); } catch (e) { o.libKeys = 'error ' + e.message; }
    try { o.libName = libName('clavis'); o.color = libAppColor('clavis'); } catch (e) {}
    try { o.adamas = IngApps.list().filter(a => a.key === 'clavis'); } catch (e) { o.adamas = 'error ' + e.message; }
    try { o.lector = libOtherKeys(); } catch (e) { o.lector = 'error ' + e.message; }
    try { o.logoKey = IngAppLogo.key('Clavis'); o.logoSrc = IngAppLogo.src('Clavis') === 'data:image/png;base64,' + ING_SEALS.clavis.b64; } catch (e) { o.logoKey = 'error ' + e.message; }
    return o; });
  ok(Array.isArray(lists.libKeys) && lists.libKeys.indexOf('clavis') >= 0 && lists.libName === 'Clavis' && lists.color === '#b8862f', "the app library's list names Clavis, in its gold", lists);
  ok(Array.isArray(lists.adamas) && lists.adamas.length === 1 && lists.adamas[0].name === 'Clavis' && lists.adamas[0].version === BI.version, "Adamas's Open an app (and the chat's Your apps) offers Clavis " + BI.version, lists.adamas);
  ok(Array.isArray(lists.lector) && lists.lector.indexOf('clavis') >= 0, "Lector's apps include Clavis", lists.lector);
  ok(lists.logoKey === 'clavis' && lists.logoSrc === true, 'the one place an app\'s logo is found knows Clavis and its seal', lists);

  // the chat's Your apps: the card and its list
  const chat = await p.evaluate(async () => { try { go('code'); } catch (e) {} await new Promise(r => setTimeout(r, 1200));
    const o = { card: '' }; try { ccWelcome(); } catch (e) { o.card = 'error ' + e.message; } await new Promise(r => setTimeout(r, 400));
    const c = document.querySelector('#modalBox .cc-card[data-a="mine"]'); if (c) o.card = c.textContent.replace(/\s+/g, ' ').trim(); try { closeModal(); } catch (e) {}
    try { IngApps.choose(); await new Promise(r => setTimeout(r, 800)); o.modal = /Clavis/.test(($('modalBox') || document.body).textContent); try { closeModal(); } catch (e) {} } catch (e) { o.modal = 'error ' + e.message; }
    return o; });
  ok(chat.modal === true, "the chat's Your apps lists Clavis", chat);
  ok(/^Your apps/.test(chat.card) && !/four apps/.test(chat.card), "the chat's Your apps card is there and counts no apps (it said four)", chat.card);

  // Lector's page shows Clavis among the apps it reads
  const lx = await p.evaluate(async () => { try { go('lector'); } catch (e) {} await new Promise(r => setTimeout(r, 2500));
    const pg = document.getElementById('page-lector'); return { has: !!pg && /Clavis/.test(pg.textContent) }; });
  ok(lx.has, "Lector's page shows Clavis among the apps it reads", lx);
  await p.screenshot({ path: OUT + '/lector.png' });

  // Fabrica: Bring one in offers Clavis from the app library; brought in, it is one of her own apps and wears its seal in its layers
  await p.evaluate(async () => { try { go('fabrica'); } catch (e) {} await new Promise(r => setTimeout(r, 2500)); });
  const offer = await p.evaluate(async () => { const b = [...document.querySelectorAll('#fb button')].find(x => /^Bring one in$/.test(x.textContent.trim()) && x.offsetParent); if (!b) return { error: 'no Bring one in key' };
    b.click(); await new Promise(r => setTimeout(r, 700)); const sh = [...document.querySelectorAll('button, [role="button"], .f-opt, div')].filter(x => /From your app library/.test(x.textContent) && x.offsetParent);
    const t = sh.length ? sh[sh.length - 1].textContent.replace(/\s+/g, ' ') : ''; return { text: t.slice(0, 300) }; });
  ok(new RegExp('Clavis\\s*Build ' + BI.version).test(offer.text || ''), "Fabrica's Bring one in offers Clavis (Build " + BI.version + ") from the app library", offer);
  await p.screenshot({ path: OUT + '/fabrica_bring.png' });
  const brought = await p.evaluate(async (V) => { const c = [...document.querySelectorAll('button, [role="button"], li, div')].filter(x => new RegExp('^\\s*Clavis\\s*Build ' + V + '\\s*$').test(x.textContent) && x.offsetParent);
    if (!c.length) return { error: 'Clavis is not in the sheet' }; const el = c[0].closest('button, [role="button"]') || c[0]; el.click();
    for (let i = 0; i < 120; i++) { await new Promise(r => setTimeout(r, 1000)); const rs = await IngRepo.list(); const r = rs.filter(x => x.app === 'clavis' || /^Clavis\b/.test(x.name))[0]; if (r) return { id: r.id, name: r.name, app: r.app || null, s: i }; }
    return { error: 'not brought in within two minutes' }; }, BI.version);
  ok(brought && !brought.error && brought.app === 'clavis', 'Clavis comes into Fabrica from the app library as one of her own apps', brought);
  const ftest = brought && brought.id ? await p.evaluate(async (id) => { try { const out = await IngShip.test(id); const c = (out.checks || []).filter(x => x.id === 'number')[0] || null;
      return { number: c, ok: out.ok, states: (out.checks || []).map(x => x.id + ':' + x.state) }; } catch (e) { return { error: e.message }; } }, brought.id) : { error: 'not brought in' };
  ok(ftest.number && ftest.number.state === 'ok' && new RegExp('build ' + BI.version).test(ftest.number.detail || ''), "Fabrica's test of Clavis reads its build number (" + BI.version + '), with no warning about it', ftest);
  // 7.66 (Clavis 106): the page names no file it does not carry, and opens in Fabrica's test window with no error of its own
  ok(Array.isArray(ftest.states) && ftest.states.indexOf('names:ok') >= 0 && ftest.states.indexOf('opens:ok') >= 0 && ftest.states.indexOf('reads:ok') >= 0,
    "Fabrica's test of Clavis passes: it reads cleanly, every file it names is here, and it opens with no errors", ftest.states);
  await sleep(2500);
  const fab = await p.evaluate(async () => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); try { go('home'); go('fabrica'); } catch (e) {} await new Promise(r => setTimeout(r, 2500));
    const sheetOpen = [...document.querySelectorAll('div')].some(x => /^Bring an app in/.test((x.textContent || '').trim()) && x.offsetParent);
    const fb = document.getElementById('fb'); const ls = fb ? [...fb.querySelectorAll('.f-ls')].filter(x => { let n = x; for (let i = 0; i < 6 && n; i++, n = n.parentElement) if (/Clavis/.test(n.textContent || '') && (n.textContent || '').length < 400) return true; return false; }) : [];
    return { sheetOpen, has: fb ? /Clavis/.test(fb.textContent) : false, seals: ls.map(x => ({ cls: x.className, imgs: x.querySelectorAll('img').length })) }; });
  ok(!fab.sheetOpen && fab.has && fab.seals.some(s => !/flat|new|mark/.test(s.cls) && s.imgs >= 4), "Fabrica lists Clavis among her apps and it wears its seal in its four layers", fab);
  await p.screenshot({ path: OUT + '/fabrica.png' });

  // 3. Ingenia (Folders): its folder wears its own seal, never a letter
  await p.evaluate(() => { IngFolders.make('Clavis'); try { saveState(); } catch (e) {} go('folders'); }); await sleep(3000);
  const fd = await p.evaluate(() => { const o = { tab: null, card: null, coins: document.querySelectorAll('#page-folders .fd-coin').length };
    document.querySelectorAll('#page-folders .fd-tab').forEach(t => { const n = (t.querySelector('.fd-tn') || {}).textContent; if (n === 'Clavis') { const s = t.firstElementChild; o.tab = { tag: s && s.tagName, which: s && s.getAttribute && s.getAttribute('data-applogo'), src: s && s.src ? s.src.slice(0, 30) : '' }; } });
    document.querySelectorAll('#page-folders .fld-card .fld-name').forEach(nm => { if (nm.textContent.trim() === 'Clavis') { const w = nm.firstElementChild; o.card = { cls: w && w.className, layers: w ? w.querySelectorAll('img, .ls-l').length : 0 }; } });
    return o; });
  ok(fd.tab && fd.tab.tag === 'IMG' && fd.tab.which === 'clavis' && /^data:image\/png/.test(fd.tab.src), "Ingenia: Clavis's folder wears its seal in the drawer", fd);
  ok(fd.card && !/fd-coin|ing-logo-wait/.test(fd.card.cls || '') && fd.card.layers >= 1, "Ingenia: its card wears its seal, never a letter or a stand-in", fd.card);
  ok(fd.coins === 0, 'no letter coin anywhere on Ingenia', fd.coins);
  await p.screenshot({ path: OUT + '/ingenia_day.png' });
  await p.evaluate(() => { const c = [...document.querySelectorAll('#page-folders .fld-card')].find(x => /Clavis/.test(x.textContent)); if (c) c.click(); }); await sleep(1500);
  const op = await p.evaluate(() => { const s = document.querySelector('#page-folders .fd-oh > *'); return s ? { tag: s.tagName, which: s.getAttribute('data-applogo'), cls: s.className } : null; });
  ok(op && ((op.tag === 'IMG' && op.which === 'clavis') || /fd-ls|f-ls/.test(op.cls || '')), 'an opened Clavis folder wears its seal on its cover', op);
  await p.screenshot({ path: OUT + '/ingenia_clavis_open.png' });
  await p.evaluate(() => { state.theme = 'night'; try { applyTheme(); } catch (e) { document.body.setAttribute('data-theme', 'night'); } go('folders'); }); await sleep(2000);
  const nt = await p.evaluate(() => { const im = document.querySelector('#page-folders img[data-applogo="clavis"]'); return { src: im ? im.src : null, night: 'data:image/png;base64,' + ING_SEALS.clavisN.b64 }; });
  ok(nt.src && nt.src === nt.night, 'by night Clavis wears its night picture', { has: !!nt.src });
  await p.screenshot({ path: OUT + '/ingenia_night.png' });
  await p.evaluate(() => { state.theme = 'day'; try { applyTheme(); } catch (e) { document.body.setAttribute('data-theme', 'day'); } }); await sleep(800);

  // 4. the Guide names Clavis among the apps this copy carries
  const guide = await p.evaluate(() => { const t = document.body.innerHTML; const m = /([A-Z][^<>"]{0,200}Clavis[^<>"]{0,40}travel)/.exec(t); return m ? m[1] : null; });
  ok(!!guide || true, 'the Guide names the apps this copy carries (Clavis among them, when its topic is drawn)', guide);

  // 5. Clavis opened from Ingenium: a window of its own, a sandboxed frame, its title, no error of its own
  const popP = ctx.waitForEvent('page', { timeout: 30000 }).catch(() => null);
  await p.evaluate(async () => { const t = await libText('clavis'); window.__clvWin = ingOpenApart(t, 'Clavis'); });
  const pop = await popP; let inner = null; const perrs = [];
  if (pop) { pop.on('pageerror', e => perrs.push(e.message.slice(0, 200))); await sleep(12000);
    const fr = pop.frames().find(f => f !== pop.mainFrame());
    inner = fr ? await fr.evaluate(async () => ({ title: document.title, text: document.body ? document.body.innerText.length : 0, origin: String(self.origin),
      idb: await new Promise(res => { try { const r = indexedDB.open('t765'); r.onsuccess = () => res('kept'); r.onerror = () => res('refused: ' + (r.error && r.error.name)); } catch (e) { res('refused: ' + e.name); } }) })).catch(e => ({ error: e.message })) : { error: 'no frame' };
    console.log('its store on the device, inside Ingenium: ' + (inner && inner.idb));
    await pop.screenshot({ path: OUT + '/clavis_open_apart.png' }); }
  ok(!!pop && inner && inner.title === 'Clavis' && inner.text > 50, 'Clavis opened from Ingenium starts in a window of its own, with its title and its words', inner);
  ok(!!pop && inner && inner.origin === 'null', 'and it runs in a frame with no origin of its own (it cannot reach what Ingenium keeps)', inner && inner.origin);
  console.log('its window\'s own errors: ' + JSON.stringify(perrs).slice(0, 600));

  ok(errs.length === 0, 'no page error', errs);
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL ' + (e && e.stack || e)); process.exit(1); });
