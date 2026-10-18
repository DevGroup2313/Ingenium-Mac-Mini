// R125: Ingenium's chaptered tour, card by card: each card's go() runs, and the element it rings must be present and visible;
// the new card (Your apps, carried inside) and the five apps' words are checked. node t_tour_walk.js URL [shotsprefix]
const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const [url, shots] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 860 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(url, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(6000);
  await p.evaluate(() => { try { document.getElementById('introDoor') && (document.getElementById('introDoor').style.display = 'none'); } catch (e) {} try { if (typeof enterApp === 'function') enterApp(); } catch (e) {} });
  const n = await p.evaluate(() => ING_TOUR.length);
  let pass = 0, fail = 0; const titles = [];
  for (let i = 0; i < n; i++) {
    const r = await p.evaluate(async (i) => {
      const s = ING_TOUR[i]; let err = null;
      try { if (typeof s.go === 'function') s.go(); } catch (e) { err = e.message; }
      await new Promise(r => setTimeout(r, 1100));
      const rings = s.ring ? (Array.isArray(s.ring) ? s.ring : [s.ring]) : [];
      const seen = rings.filter(q => { try { const e = document.querySelector(q); return e && e.getBoundingClientRect().width > 2; } catch (e) { return false; } });
      return { i, chap: s.chap, t: s.t, err, rings, seen: seen.length };
    }, i);
    titles.push(r.t);
    const ok = !r.err && (r.rings.length === 0 || r.seen > 0);
    if (ok) pass++; else { fail++; console.log('FAIL', JSON.stringify(r)); }
    if (shots && /Your apps, carried|The apps, as in Carpe Diem/.test(r.t || '')) await p.screenshot({ path: `${shots}-${String(i).padStart(2, '0')}.png` });
  }
  const want = ['📦 Your apps, carried inside', '📚 The apps, as in Carpe Diem'];
  want.forEach(w => { if (titles.includes(w)) pass++; else { fail++; console.log('FAIL missing card', w); } });
  const t2 = await p.evaluate(() => [ING_TOUR_TEASERS['Making things'], (ING_TOUR.find(s => s.t === '📚 The apps, as in Carpe Diem') || {}).b]);
  if (/five apps/.test(t2[0]) && /every side button too/.test(t2[1] || '')) pass++; else { fail++; console.log('FAIL words', JSON.stringify(t2)); }
  console.log('cards', n, 'page errors', JSON.stringify(errs.slice(0, 4)));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close();
})();
