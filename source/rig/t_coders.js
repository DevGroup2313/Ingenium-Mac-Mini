const { start } = require('./lib.js');
(async () => {
  const { page, browser } = await start({ viewport: { width: 1280, height: 900 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.evaluate(() => { go('models'); }); await page.waitForTimeout(1200);
  const a = await page.evaluate(() => ({ dev: lineupDevice(), mem: deviceMemGB(), use: lineupUsableGB(), faber: lineupKeyFor('faber'), list: IngR105.list(),
    rows: [...document.querySelectorAll('.lu-cd')].map(r => [r.getAttribute('data-cd'), r.classList.contains('on'), r.querySelector('.lu-cd-fit').textContent.slice(0, 60), [...r.querySelectorAll('.lu-cd-acts button,.lu-cd-acts .lu-cd-now')].map(b => b.textContent)]) }));
  console.log(JSON.stringify(a, null, 1));
  const t = await page.evaluate(() => { const e = document.querySelector('.lu-tile[data-tier="faber"]'); e.scrollIntoView(); const b = e.getBoundingClientRect(); return [b.top + scrollY, b.height]; });
  await page.screenshot({ path: process.env.S + '/shots/coders.png', fullPage: true });
  // a coding model already on the device can be chosen for Faber
  const b = await page.evaluate(() => { state.models.push({ id: 'mfake', fileName: 'LFM2.5-8B-A1B-Q4_K_M.gguf', customName: 'LFM2.5 8B-A1B', fileState: 'ready', sizeBytes: 5155564768, color: '#7a5' }); lineupTag(); renderLineup();
    const row = document.querySelector('.lu-cd[data-cd="lfm2.5-8b-a1b"]'); const btn = [...row.querySelectorAll('button')].find(x => /Use for Faber/.test(x.textContent)); btn.click();
    return { pick: state.tierPick, faber: lineupKeyFor('faber'), active: state.activeModelId, tier: state.activeTier, now: [...document.querySelectorAll('.lu-cd.on')].map(r => r.getAttribute('data-cd')), back: !!([...document.querySelectorAll('.lu-coders button')].find(x => /Back to/.test(x.textContent))) }; });
  console.log(JSON.stringify(b));
  const c = await page.evaluate(() => { [...document.querySelectorAll('.lu-coders button')].find(x => /Back to/.test(x.textContent)).click(); return { pick: state.tierPick, faber: lineupKeyFor('faber') }; });
  console.log(JSON.stringify(c), t, errs);
  await page.evaluate(() => { state.models = state.models.filter(m => m.id !== 'mfake'); saveState(); });
  await browser.close();
})();
