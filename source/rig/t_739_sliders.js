// Ingenium 7.39: raised sliders everywhere (modules/r322.js; her approved preview, source/previews/sliders_3d).
//   node rig/t_739_sliders.js <page url> <out folder>
// Checks: every slider on the page is drawn by Ingenium (not the browser's own); its violet fill follows its value when she moves it,
// when the page sets it, and when a new slider appears; Effort's five stops under the Models page's Effort slider; the sliders keep
// their size in the model's key and in Chat's Controls; no page errors. Screenshots by day and by night, at rest and under the pointer.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1280, height: 860 } })).newPage(); p.setDefaultTimeout(300000);
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true && window.IngSliders, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    state.models = [{ id: 'mA', customName: 'Qwen3.5 9B', fileName: 'a.gguf', sizeBytes: 5e9, type: 'GGUF', fileState: 'ready', stored: true, paramB: 9, tokens: 4096, ctx: 16384, effort: 2, ctxTrain: 131072 }];
    state.activeModelId = 'mA'; saveState(); go('chat'); });
  await p.waitForTimeout(1200);
  const all = await p.evaluate(() => [...document.querySelectorAll('input[type=range]')].map(i => ({ id: i.id, app: getComputedStyle(i).appearance || getComputedStyle(i).webkitAppearance, p: i.style.getPropertyValue('--r3-p'),
    want: (((+i.value - (+i.min || 0)) / ((i.max === '' ? 100 : +i.max) - (+i.min || 0))) * 100).toFixed(2) + '%' })));
  ok(all.length >= 4 && all.every(x => x.app === 'none'), 'every slider on the page is drawn by Ingenium, not the browser', all.map(x => x.id + ':' + x.app));
  ok(all.every(x => x.p === x.want), "each slider's violet fill reaches its value", all.filter(x => x.p !== x.want));
  // moved by her
  const t = p.locator('#ctlTokens'); await p.evaluate(() => { const b = document.getElementById('chatCtlBtn'); if (b && b.getAttribute('aria-expanded') !== 'true') b.click(); }); await p.waitForTimeout(600);
  const box = await t.boundingBox(); let moved = null;
  if (box) { await p.mouse.click(box.x + box.width * 0.75, box.y + box.height / 2); await p.waitForTimeout(200);
    moved = await t.evaluate(i => ({ v: i.value, p: i.style.getPropertyValue('--r3-p'), want: (((+i.value - +i.min) / (+i.max - +i.min)) * 100).toFixed(2) + '%' })); }
  ok(moved && moved.p === moved.want && +moved.p.replace('%', '') > 60, 'moved by a press, the fill follows', moved);
  // set by the page
  const set = await p.evaluate(() => { const i = document.getElementById('ctlCtx'); i.value = i.min; const a = i.style.getPropertyValue('--r3-p'); i.value = i.max; return [a, i.style.getPropertyValue('--r3-p')]; });
  ok(set[0] === '0.00%' && set[1] === '100.00%', 'set by the page (a model\'s numbers put back), the fill follows at once', set);
  // a new slider, as a card paints one
  const fresh = await p.evaluate(async () => { const d = document.createElement('div'); d.innerHTML = '<input type="range" id="r3probe" min="0" max="10" value="5">'; document.body.appendChild(d); await new Promise(r => setTimeout(r, 50));
    const v = document.getElementById('r3probe').style.getPropertyValue('--r3-p'); d.remove(); return v; });
  ok(fresh === '50.00%', 'a slider that appears later is drawn the same way', fresh);
  // sizes: in the model's key and Chat's Controls
  const sizes = await p.evaluate(() => { const i = document.getElementById('ctlTokens'); const r = i.getBoundingClientRect(); return { h: Math.round(r.height), w: Math.round(r.width) }; });
  ok(sizes.h === 26 && sizes.w > 100, "Chat's Controls keep their sliders' width, each 26 pixels high", sizes);
  await p.screenshot({ path: OUT + '/chat_controls_day.png' });
  await p.hover('#ctlTokens'); await p.waitForTimeout(400); await t.screenshot({ path: OUT + '/slider_hover_day.png' }).catch(() => {});
  await p.click('#chatGenKey'); await p.waitForTimeout(500); await p.screenshot({ path: OUT + '/key_sheet_day.png' });
  const sheet = await p.evaluate(() => [...document.querySelectorAll('.gk-pop input[type=range]')].map(i => [getComputedStyle(i).appearance, i.style.getPropertyValue('--r3-p')]));
  ok(sheet.length === 2 && sheet.every(s => s[0] === 'none' && /%$/.test(s[1])), "the model's key sheet has the raised sliders", sheet);
  await p.keyboard.press('Escape');
  // Effort's stops, in the Models page's settings for a model
  await p.evaluate(() => { go('models'); try { editModel('mA'); } catch (e) {} }); await p.waitForTimeout(1800);
  const st = await p.evaluate(() => { const i = document.getElementById('emEffort'); if (!i) return null; const s = i.parentNode.nextElementSibling; const a = i.getBoundingClientRect(), r = s ? s.getBoundingClientRect() : null;
    return { stops: !!(s && s.classList.contains('r3-stops')), labels: s ? [...s.querySelectorAll('span')].map(x => x.textContent) : [], under: r ? [Math.round(r.left - a.left), Math.round(a.right - r.right), Math.round(r.top - a.bottom)] : null, name: (document.getElementById('emEffortV') || {}).textContent };
  });
  ok(st && st.stops && st.labels.join() === 'Low,Medium,High,Extra,Max' && st.under && st.under[0] === 11 && st.under[1] === 11 && st.under[2] >= -4 && st.under[2] <= 4 && st.name === 'Medium', "the Models page's Effort slider has its five stops under it, and names its level as everywhere else", st);
  await p.screenshot({ path: OUT + '/models_effort_day.png' });
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); }); await p.waitForTimeout(400); await p.screenshot({ path: OUT + '/models_effort_night.png' });
  const night = await p.evaluate(() => getComputedStyle(document.body).getPropertyValue('--r3-gel-a').trim());
  ok(night === '#9a76de', 'by night the sliders take the night colours', night);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
