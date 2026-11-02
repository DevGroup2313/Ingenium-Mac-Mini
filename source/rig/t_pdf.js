const { start } = require('./lib.js');
const fs = require('fs');
(async () => { const S = process.env.S; const { browser, page, logs } = await start();
  await page.evaluate(() => go('lector')); await page.waitForTimeout(1200);
  await page.evaluate(() => { window.__pdf = []; saveFileNative = function (name, mime, data) { const u = data instanceof Uint8Array ? data : new Uint8Array(0); let s = ''; for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); window.__pdf.push({ name: name, b64: btoa(s) }); return Promise.resolve('ok'); }; window.saveFileNative = saveFileNative; });
  for (const k of ['dossier', 'appendix', 'portfolio', 'cover', 'cv', 'analysis']) {
    await page.evaluate((k) => { IngLector.R7.doc = k; IngLector.render(); IngLector.state().brief.fmt = 'pdf'; document.getElementById('l7Save').click(); }, k);
    await page.waitForFunction((n) => window.__pdf.length >= n, ['dossier', 'appendix', 'portfolio', 'cover', 'cv', 'analysis'].indexOf(k) + 1, { timeout: 30000 }).catch(() => {}); }
  const files = await page.evaluate(() => window.__pdf);
  files.forEach(f => { fs.writeFileSync(S + '/pdfout/' + f.name.replace(/[^\w. -]/g, '_'), Buffer.from(f.b64, 'base64')); console.log('wrote', f.name, Buffer.from(f.b64, 'base64').length); });
  console.log(logs.filter(l => /error/i.test(l)).slice(0, 6).join('\n')); await browser.close(); })();
