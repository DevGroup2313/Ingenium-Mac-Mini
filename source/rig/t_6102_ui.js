// Three fixes she asked for, and the Fire tablet's way to its models (Ingenium 6.10.2, modules/r211.js, r193.js and r164.js). Her words
// (3 November 2026): Home's app buttons are "still left bare, please fix that and give them their symbols as well and make sure that there is
// no weird space between the text on the buttons and the symbols"; "The 'Your models' cards looks distorted on the Iphone screen ... instead of
// in a compact column like a weird narrow strip"; "The code inside of the 'Your code' panel of the Build page does not fit to the panel"; and
// the Fire tablet's app with its models "keeps on failling and I have to install the one without the models instead".
// The models listed are invented records (no file is read); the phone and tablet app is a stand-in bridge (window.INB).
//   node rig/t_6102_ui.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const MODELS = [
  { id: 'm1', customName: 'LFM2.5 1.2B Instruct', fileName: 'LFM2.5-1.2B-Instruct-Q4_K_M.gguf', type: 'GGUF', arch: 'lfm2', quant: 'Q4_K_M', paramB: 1.2, sizeBytes: 730895168, fileState: 'ready', stored: true, color: '#6a3fb5' },
  { id: 'm2', customName: 'A model with a very long name that a person gave it', fileName: 'Qwen3.5-122B-A10B-Q4_K_M-00001-of-00003.gguf', type: 'GGUF', arch: 'qwen35moe', quant: 'Q4_K_M', paramB: 122, sizeBytes: 76500000000, fileState: 'ready', stored: true, color: '#2f7a55' }];
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1360, height: 950 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); state.motion = 'minimal'; });
  await p.waitForTimeout(500);

  // 1. Home's stones: Scriba and Fontes wear their marks, 4 pixels from the name, as the rail's do
  await p.evaluate(() => go('home')); await p.waitForTimeout(900);
  const st = await p.evaluate(() => { const one = (sel) => { const b = document.querySelector(sel); if (!b) return null; const sv = b.querySelector('svg.hx-sym, svg.ing-stone-sym'), nm = b.querySelector('.hx-an') || [...b.childNodes].find(n => n.nodeType === 3 && n.nodeValue.trim());
      let gap = null; if (sv && nm) { const r = document.createRange(); r.selectNodeContents(nm.nodeType === 3 ? nm : nm); const a = sv.getBoundingClientRect(), t = r.getBoundingClientRect(); gap = Math.round((t.left - a.right) * 10) / 10; }
      return { mark: !!sv, gap, h: Math.round(b.getBoundingClientRect().height) }; };
    const o = {}; ['scriba', 'fontes', 'tabula', 'abacus', 'slides'].forEach(k => { o['home_' + k] = one('.hx-apps .hx-app[data-app="' + k + '"]'); });
    ['scriba', 'fontes'].forEach(k => { o['rail_' + k] = one('.dock .nav-btn.ing-stone[data-page="' + k + '"]'); }); return o; });
  ok(st.home_scriba && st.home_scriba.mark && st.home_fontes && st.home_fontes.mark, 'Home: Scriba and Fontes wear their marks, as on the side rail', st);
  ok([st.home_scriba, st.home_fontes].every(x => x && x.gap >= 3 && x.gap <= 5.5) && [st.rail_scriba, st.rail_fontes].every(x => !x || (x.gap >= 3 && x.gap <= 5.5)), 'about 4 pixels between each mark and its name, on Home as on the rail: no odd gap', st);
  ok(['tabula', 'abacus', 'slides'].every(k => st['home_' + k] && !st['home_' + k].mark), 'the stones without a mark of their own in Carpe Diem stay as they are', st);
  await p.evaluate(() => document.querySelector('.hx-apps').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/home-stones.png', clip: await p.evaluate(() => { const r = document.querySelector('.hx-apps').getBoundingClientRect(); return { x: Math.max(0, r.left - 10), y: Math.max(0, r.top - 10), width: Math.min(900, r.width + 20), height: r.height + 30 }; }) });

  // 2. Your models: on a desktop one row; on an iPhone the details take the card's width and the keys sit beneath
  const cards = () => p.evaluate((MODELS) => { state.models = MODELS.map(m => Object.assign({}, m)); state.activeModelId = 'm1'; go('models'); renderModels();
    return [...document.querySelectorAll('#modelList .model-row')].map(r => { const R = r.getBoundingClientRect(), i = r.querySelector('.minfo').getBoundingClientRect(), a = r.querySelector('.mact').getBoundingClientRect(),
      bs = [...r.querySelectorAll('.mact .btn')].map(x => { const q = x.getBoundingClientRect(); return [Math.round(q.left), Math.round(q.top), Math.round(q.width)]; });
      return { row: Math.round(R.width), info: Math.round(i.width), infoBottom: Math.round(i.bottom), actTop: Math.round(a.top), keys: bs, over: r.scrollWidth - r.clientWidth, pageOver: document.scrollingElement.scrollWidth - innerWidth }; }); }, MODELS);
  const wide = await cards();
  ok(wide.length === 2 && wide.every(c => c.actTop < c.infoBottom && c.info > c.row * 0.5), 'a desktop window: each card is one row, as before (its keys beside the details)', wide);
  await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(500);
  const narrow = await cards(); await p.waitForTimeout(300);
  ok(narrow.length === 2 && narrow.every(c => c.info >= c.row * 0.8), 'an iPhone (390 pixels): the name and details take the card\'s width, not a strip', narrow.map(c => [c.row, c.info]));
  ok(narrow.every(c => c.actTop >= c.infoBottom && c.keys.length === 3 && new Set(c.keys.map(k => k[1])).size === 1 && Math.max(...c.keys.map(k => k[2])) - Math.min(...c.keys.map(k => k[2])) <= 2), 'its three keys sit beneath the details, in one row, of equal width', narrow.map(c => c.keys));
  ok(narrow.every(c => c.over <= 1 && c.pageOver <= 1), 'nothing runs past the card or the screen (a long file name breaks to the next line)', narrow.map(c => [c.over, c.pageOver]));
  await p.evaluate(() => { const c = document.getElementById('yourModelsCard'); if (c) c.scrollIntoView(); }); await p.waitForTimeout(200);
  await p.screenshot({ path: OUT + '/models-iphone.png' });
  await p.setViewportSize({ width: 1360, height: 950 }); await p.waitForTimeout(400);

  // 3. Build: long lines wrap inside the panel; the head's key says so and turns it off; her choice is kept
  await p.evaluate(() => { go('build'); }); await p.waitForTimeout(900);
  const long = '<p>' + 'A very long line of text that would run far past the edge of the code panel. '.repeat(8) + '</p>';
  const w1 = await p.evaluate((long) => { const ta = document.getElementById('codeEditor'); ta.value = '<!doctype html>\n<html><body>\n' + long + '\n</body></html>'; try { ta.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) {}
    const k = document.querySelector('#editorPane .pane-head .ing-wrapkey'), sc = document.querySelector('#editorPane .cm-scroller'), box = document.querySelector('#editorPane .ic-wrapbox');
    return { key: k && k.textContent, pressed: k && k.getAttribute('aria-pressed'), wrapped: !!document.querySelector('#editorPane .cm-content.cm-lineWrapping'), over: sc ? sc.scrollWidth - sc.clientWidth : null, box: box && box.checked }; }, long);
  await p.waitForTimeout(300);
  const w1b = await p.evaluate(() => { const sc = document.querySelector('#editorPane .cm-scroller'); return sc ? sc.scrollWidth - sc.clientWidth : null; });
  ok(w1.key === 'Long lines wrap' && w1.pressed === 'true' && w1.wrapped && w1.box && w1b <= 1, 'Build: long lines wrap inside the panel by default, with nothing to scroll sideways, and the panel\'s head says so', Object.assign(w1, { over: w1b }));
  await p.screenshot({ path: OUT + '/build-wrap.png' });
  await p.evaluate(() => document.querySelector('#editorPane .pane-head .ing-wrapkey').click()); await p.waitForTimeout(400);
  const w2 = await p.evaluate(() => { const k = document.querySelector('#editorPane .pane-head .ing-wrapkey'), sc = document.querySelector('#editorPane .cm-scroller');
    return { key: k.textContent, pressed: k.getAttribute('aria-pressed'), wrapped: !!document.querySelector('#editorPane .cm-content.cm-lineWrapping'), over: sc.scrollWidth - sc.clientWidth, kept: state.buildWrap }; });
  ok(w2.key === 'Long lines scroll' && w2.pressed === 'false' && !w2.wrapped && w2.over > 50 && w2.kept === false, 'one press: each line on one row again (to scroll sideways), and her choice is kept', w2);
  await p.evaluate(() => document.querySelector('#editorPane .ic-wrapbox').click()); await p.waitForTimeout(300);
  const w3 = await p.evaluate(() => ({ key: document.querySelector('#editorPane .pane-head .ing-wrapkey').textContent, kept: state.buildWrap }));
  ok(w3.key === 'Long lines wrap' && w3.kept === true, 'the Wrap box at the editor\'s foot and the head\'s key agree, and either keeps her choice', w3);

  // 4. the small Fire app: its own two models, one press away; none of this where the models are built in
  const own = await p.evaluate(() => { const keepINB = window.INB, keepNI = window.nativeInfo; state.models = []; go('models');
    window.INB = { platform: 'android', on: () => () => {}, call: () => Promise.resolve({}) }; window.nativeInfo = { builtin: null };
    window.__INGENIUM_DEVICE = { ramGB: 3 }; IngR211.own(); const c = document.querySelector('#lineupCard .ing-own'), btn = c && c.querySelector('button');
    const r1 = { shown: !!c, text: c && c.textContent, btn: btn && btn.textContent };
    window.nativeInfo = { builtin: { available: true, name: 'LFM2.5 1.2B Instruct' } }; IngR211.own(); const r2 = !document.querySelector('#lineupCard .ing-own');
    window.INB = keepINB; window.nativeInfo = keepNI; window.__INGENIUM_DEVICE = null; IngR211.own(); const r3 = !document.querySelector('#lineupCard .ing-own');
    return { r1, gone: r2, desktop: r3 }; });
  ok(own.r1.shown && /This copy came without its own models/.test(own.r1.text) && /LFM2\.5 1\.2B Instruct and LFM2\.5 1\.2B Thinking/.test(own.r1.text) && /fingerprint/.test(own.r1.text) && /^Install both · /.test(own.r1.btn || ''),
    'the small Fire app with no model: the Models page offers its own two (Velox and Scriba for a 3 GB tablet) in one press, checked by fingerprint', own.r1);
  const one = await p.evaluate(() => { const keepINB = window.INB, keepNI = window.nativeInfo; state.models = [{ id: 'v', customName: 'LFM2.5 1.2B Instruct', fileName: 'LFM2.5-1.2B-Instruct-Q4_K_M.gguf', type: 'GGUF', fileState: 'ready', sizeBytes: 730895168 }];
    window.INB = { platform: 'android', on: () => () => {}, call: () => Promise.resolve({}) }; window.nativeInfo = { builtin: null }; window.__INGENIUM_DEVICE = { ramGB: 3 }; IngR211.own();
    const c = document.querySelector('#lineupCard .ing-own'), t = c && c.textContent; window.INB = keepINB; window.nativeInfo = keepNI; window.__INGENIUM_DEVICE = null; state.models = []; IngR211.own(); return t; });
  ok(/Install LFM2\.5 1\.2B Thinking here, which the larger download also carries/.test(one || '') && /it matches its fingerprint/.test(one || '') && /Install it · /.test(one || ''), 'with one of the two already there, it offers the other alone, in words for one', one);
  ok(own.gone && own.desktop, 'not shown where the models are built in, nor on a computer', own);
  ok(await p.evaluate(() => !document.body.classList.contains('rail-collapsed')), 'a desktop window: the side buttons stand as before');
  // 5. a phone: the side buttons start laid down, so they do not cover the cards; her own choice then holds
  const pc = await b.newContext({ ...pw.devices['iPhone 13'] }); const q = await pc.newPage(); q.on('pageerror', e => errs.push('phone: ' + e.message.slice(0, 200)));
  await q.goto(URL_); await q.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await q.waitForTimeout(800);
  await q.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await q.waitForTimeout(500);
  const ph = await q.evaluate((MODELS) => { state.models = MODELS.map(m => Object.assign({}, m)); go('models'); renderModels(); document.getElementById('yourModelsCard').scrollIntoView();
    const cr = document.querySelector('#modelList .model-row').getBoundingClientRect();
    const cover = ['fabBell', 'fabTheme', 'fabTimer', 'fabNote', 'fabPark', 'fabQuiet'].filter(id => { const e = document.getElementById(id); if (!e) return false; const s = getComputedStyle(e), r = e.getBoundingClientRect();
      return s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > 0.05 && r.width > 0 && r.left < cr.right && r.right > cr.left && r.top < cr.bottom && r.bottom > cr.top; });
    return { down: document.body.classList.contains('rail-collapsed'), cover, key: document.getElementById('railChevron').textContent }; }, MODELS);
  await q.waitForTimeout(300); await q.screenshot({ path: OUT + '/iphone-models.png' });
  ok(ph.down && ph.cover.length === 0 && ph.key === '‹', 'an iPhone: the side buttons start laid down, so none covers the cards; the key to raise them stays', ph);
  const ph2 = await q.evaluate(() => { document.getElementById('railChevron').click(); return { down: document.body.classList.contains('rail-collapsed'), chosen: state.railChosen }; });
  ok(!ph2.down && ph2.chosen === true, 'one press raises them, and from then on her choice holds', ph2);
  await pc.close();
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
