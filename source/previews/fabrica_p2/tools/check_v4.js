const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [SRC, OUT] = process.argv.slice(2);
const wrapped = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>body{margin:0}[hidden]{display:none!important}</style></head><body>' + fs.readFileSync(SRC, 'utf8') + '</body></html>';
fs.writeFileSync(OUT + '/page.html', wrapped);
(async () => { const b = await pw.chromium.launch(); const errs = []; const res = {};
  for (const [scheme, w, h] of [['light', 1500, 1000], ['dark', 1500, 1000], ['light', 390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme }); const p = await ctx.newPage();
    p.on('pageerror', e => errs.push(scheme + w + ': ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(scheme + w + ' console: ' + m.text().slice(0, 160)); });
    await p.goto('file://' + OUT + '/page.html'); await p.waitForTimeout(1200);
    const tag = scheme + w;
    await p.screenshot({ path: OUT + '/' + tag + '_1.png' });
    if (w > 600) {
      const st = await p.evaluate(() => ({ secs: [...document.querySelectorAll('#fb .r280-sec b')].map(x => x.textContent), drive: (document.getElementById('fbDiskLine') || {}).textContent, add: !!document.getElementById('fbDiskAdd'),
        tiles: [...document.querySelectorAll('#fb .f-repo .nm')].map(x => x.textContent), keep: !!document.getElementById('fbKeep') }));
      res[tag + '_start'] = st;
      await p.evaluate(() => document.getElementById('fbWrite').click()); await p.waitForTimeout(200);
      await p.evaluate(() => document.getElementById('fbKeep').click()); await p.waitForTimeout(900);
      res[tag + '_kept'] = await p.evaluate(() => ({ first: (document.querySelector('#fb .f-hist .f-cm .fr-cmh b') || {}).textContent, toast: document.getElementById('pvToast').textContent, tile: (document.querySelector('#fb .f-repo[aria-pressed="true"] .stl span:last-child') || {}).textContent }));
      await p.screenshot({ path: OUT + '/' + tag + '_2_kept.png' });
      await p.evaluate(() => document.querySelector('#fb [data-pv-branch]').click()); await p.waitForTimeout(400);
      res[tag + '_list'] = await p.evaluate(() => [...document.querySelectorAll('#win .r280-pop .r172-gl,#win .r280-pop .r172-opt')].map(x => x.textContent));
      await p.screenshot({ path: OUT + '/' + tag + '_3_list.png' });
      await p.evaluate(() => { const o = [...document.querySelectorAll('#win .r280-pop .r172-opt')].find(x => x.textContent === 'night-reader'); o && o.click(); }); await p.waitForTimeout(600);
      res[tag + '_branch'] = await p.evaluate(() => ({ name: (document.getElementById('fbBranchName') || {}).textContent, toast: document.getElementById('pvToast').textContent }));
      // Plans, the pull request, squash
      await p.evaluate(() => { const b = document.querySelector('#win .fr-room[data-room="plans"]'); b && b.click(); }); await p.waitForTimeout(500);
      await p.evaluate(() => { const M = document.querySelectorAll('#fb .f-panels > .f-pn')[1]; const b = [...M.querySelectorAll('.f-seg button')].find(x => x.textContent.replace(/\s*\d+$/, '').trim() === 'Pull requests'); b && b.click(); }); await p.waitForTimeout(500);
      await p.evaluate(() => { const M = document.querySelectorAll('#fb .f-panels > .f-pn')[1]; const b = [...M.querySelectorAll('button,a,[role=button],.h-row,.h-item')].find(x => /Night mode for the reader/.test(x.textContent)); b && b.click(); }); await p.waitForTimeout(700);
      res[tag + '_pr'] = await p.evaluate(() => ({ how: [...document.querySelectorAll('#hPrHow button')].map(x => x.textContent + (x.getAttribute('aria-pressed') === 'true' ? '*' : '')), merge: (document.getElementById('hPrMerge') || {}).textContent, ask: !!document.getElementById('hPrAskIng') }));
      await p.screenshot({ path: OUT + '/' + tag + '_4_pr.png' });
      await p.evaluate(() => document.getElementById('hPrMerge').click()); await p.waitForTimeout(500);
      res[tag + '_merged'] = await p.evaluate(() => (document.getElementById('hPrMergeBox') || {}).textContent);
      // the Ingenium part: a second copy, find by meaning
      await p.evaluate(() => { const k = document.querySelector('#fbPart_ingenium'); k && k.click(); }); await p.waitForTimeout(500);
      await p.evaluate(() => { const t = document.querySelector('#fbPartSec_ingenium .r280-tile[data-k="copy"]'); t && t.click(); }); await p.waitForTimeout(300);
      await p.evaluate(() => { const g = document.querySelector('#fbPartSec_ingenium [data-pv-copy]'); g && g.click(); }); await p.waitForTimeout(2400);
      res[tag + '_copy'] = await p.evaluate(() => ({ st: (document.querySelector('#fbPartSec_ingenium .pv-copyst') || {}).textContent, where: (document.querySelector('#fbPartSec_ingenium .r280-where') || {}).textContent }));
      await p.screenshot({ path: OUT + '/' + tag + '_5_copy.png' });
      await p.fill('#fbPartSec_ingenium .r280-find input', 'where night mode is chosen'); await p.evaluate(() => document.querySelector('#fbPartSec_ingenium .r280-find button').click()); await p.waitForTimeout(500);
      res[tag + '_find'] = await p.evaluate(() => [...document.querySelectorAll('#fbPartSec_ingenium .r280-hit b')].map(x => x.textContent).concat([(document.querySelector('#fbPartSec_ingenium .r280-hits .f-hint') || {}).textContent]));
      await p.evaluate(() => { const s = document.getElementById('fbPartSec_ingenium'); if (s) s.scrollIntoView({ block: 'end' }); }); await p.waitForTimeout(300);
      await p.screenshot({ path: OUT + '/' + tag + '_6_find.png' });
      res[tag + '_wide'] = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    } else { res[tag + '_wide'] = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); await p.screenshot({ path: OUT + '/' + tag + '_full.png', fullPage: true }); }
    await ctx.close(); }
  console.log(JSON.stringify(res, null, 1)); console.log('errors', JSON.stringify(errs)); await b.close(); })();
