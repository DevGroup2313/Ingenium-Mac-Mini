// R123: what Carpe Diem adds to each app's frame once the app is open, taken from the running page, so Ingenium dresses
// the five apps the same way: the cut stones on the ribbon's app keys (cd-jewel-stones, built by Carpe Diem from its own
// desk), its seal, its signature night colours, and its pen that writes into any field (the slate and its engine).
// Usage:  node harvest_cd_dress.js http://127.0.0.1:8150/carpe_diem.html
// (serve the Carpe Diem page with any static server; Playwright's Chromium). Writes cd_inject.json beside this file:
// { texts: { key: text }, apps: { tabula: [[tag, id, where, key], ...], ... } }, in the order Carpe Diem adds them.
// Left out: Carpe Diem's theme bridge and language line (Ingenium writes its own), and empty style tags.
const pw = require(process.env.PLAYWRIGHT || '/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const APPS = ['tabula', 'abacus', 'slides', 'scriba', 'fontes'];
(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(process.argv[2]); await p.waitForTimeout(7000);
  const out = { from: '', texts: {}, apps: {} };
  out.from = await p.evaluate(() => { try { return JSON.stringify(window.CD_BUILD || {}); } catch (e) { return ''; } });
  for (const w of APPS) {
    await p.evaluate((w) => { ['tabula', 'abacus', 'slides', 'scriba', 'fontes'].forEach(x => { try { closeExt(x); } catch (e) {} }); openExt(w); }, w);
    await p.waitForTimeout(6000);
    const items = await p.evaluate((w) => {
      const d = document.getElementById('frame-' + w).contentDocument; let prep = ''; try { prep = __cdPrepSrc(w) || ''; } catch (e) {}
      return [...d.querySelectorAll('style,script')].map(s => ({ tag: s.tagName.toLowerCase(), id: s.id || '', where: s.parentNode === d.head ? 'head' : 'body', text: s.textContent }))
        .filter(x => x.id ? (prep.indexOf('id="' + x.id + '"') < 0 && prep.indexOf("id='" + x.id + "'") < 0) : false)
        .filter(x => x.text.trim().length > 0);
    }, w);
    out.apps[w] = items.map(x => { const k = x.id + '-' + crypto.createHash('sha1').update(x.text).digest('hex').slice(0, 8); out.texts[k] = x.text; return [x.tag, x.id, x.where, k]; });
    console.log(w, items.map(x => x.tag + '#' + x.id + '(' + x.text.length + ')').join(' '));
  }
  fs.writeFileSync(path.join(__dirname, 'cd_inject.json'), JSON.stringify(out));
  console.log('cd_inject.json', Object.keys(out.texts).length, 'texts,', Object.values(out.texts).reduce((a, t) => a + t.length, 0), 'characters, from', out.from);
  await b.close();
})().catch(e => { console.log('CRASH', e.message); process.exit(1); });
