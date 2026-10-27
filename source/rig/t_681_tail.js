// node rig/t_681_tail.js <page url> [--no-builtins]
// 6.8.1: the blocks Ingenium carries for later wait at the end of the page, or beside it (the phone and tablet apps), or with
// the computer app (build/tail.py, desktop/app_quick_681.py, the Fire repository's tools/app_page.py). The page must be
// ready without them, and each must arrive whole the first time it is wanted: the typefaces of a document, the engine, the
// kit store, the picture reader, and the apps the library keeps on first start.
const pw = require('/opt/node-tools/node_modules/playwright');
const URL = process.argv[2], NOBI = process.argv.includes('--no-builtins');
let pass = 0, fail = 0; function ok(c, what, info) { if (c) pass++; else fail++; console.log((c ? 'PASS ' : 'FAIL ') + what + (c ? '' : '  ' + (info || ''))); }
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL, { waitUntil: 'commit' });
  await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000, polling: 50 });
  const early = await p.evaluate(() => ({ loading: document.readyState === 'loading', left: typeof ingDeferredLeft === 'function' ? ingDeferredLeft() : -1,
    places: [...document.querySelectorAll('script[data-defer]')].map(e => e.id + ' -> ' + e.getAttribute('data-defer')) }));
  console.log('at ready: still reading the page:', early.loading, '; blocks waiting:', early.left);
  ok(early.left >= 5, 'the blocks carried for later are not read before the page is ready', JSON.stringify(early.places));
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForFunction(() => document.readyState !== 'loading', null, { timeout: 120000 });
  const fonts = await p.evaluate(() => IngDoc.ready().then(() => ({ n: IngDoc.faces.length, css: IngDoc.faceCss().length }), e => ({ err: String(e) })));
  ok(fonts.n >= 10 && fonts.css > 1e6, 'the typefaces of a document arrive whole when first wanted', JSON.stringify(fonts));
  const pdf = await p.evaluate(() => IngDoc.pdf('A test', '# A test\n\nSome words, and **bold** ones.').then(r => ({ bytes: r.bytes.length, pages: r.pages }), e => ({ err: String(e) })));
  ok(pdf.bytes > 5000 && pdf.pages === 1, 'a PDF is made with them', JSON.stringify(pdf));
  const eng = await p.evaluate(() => { try { const i = engineEmbeddedInfo(); return i ? { js: !!i.js || i.jsBytes || true, embedded: i.embedded } : null; } catch (e) { return { err: String(e) }; } });
  const hasEngine = await p.evaluate(() => !!document.getElementById('ingenium-engine-js'));
  ok(!hasEngine || (eng && !eng.err), 'the page knows its own engine is there before it is read', JSON.stringify(eng));
  if (hasEngine) {
    const blob = await p.evaluate(() => ingSlotBlob(ingSlot('ingenium-engine-wasm') || ingSlot('ingenium-engine-compat-wasm'), 'application/wasm').then(b => b.size, e => 'ERR ' + e));
    ok(typeof blob === 'number' && blob > 1e6, 'the engine arrives whole when it starts', blob);
  }
  const kit = await p.evaluate(() => document.getElementById('ingenium-kit-bundle') && typeof kitStore === 'function' ? kitStore().then(k => !!(k && (k.kits || k.files)), e => 'ERR ' + e) : 'none');
  ok(kit === true || kit === 'none', 'the kit store arrives whole when Fabrica wants it', kit);
  const eyes = await p.evaluate(() => { const e = document.getElementById('ing-eyes'); if (!e) return 'none'; return ingFill('ing-eyes').then(x => x.textContent.length, e => 'ERR ' + e); });
  ok(eyes === 'none' || eyes > 1e6, 'the picture reader arrives whole', eyes);
  if (!NOBI) {
    await p.waitForFunction(() => window.__ingBuiltin && window.__ingBuiltin.states, null, { timeout: 180000 });
    const bi = await p.evaluate(() => window.__ingBuiltin.states);
    ok(['cd', 'forge', 'inkwell'].every(k => /kept|same/.test(bi[k] || '')), 'the library keeps Carpe Diem, the Forge and Inkwell on first start', JSON.stringify(bi));
  }
  const left = await p.evaluate(() => [...document.querySelectorAll('script[id^="ing-tail:"]')].map(e => e.id));
  console.log('blocks still at the end (not wanted yet):', left.join(', ') || 'none');
  ok(!errs.length, 'no errors', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
