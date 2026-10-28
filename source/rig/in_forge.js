// rig/in_forge.js: opens one of the apps the Forge carries (tabula, abacus, slides) as the owner opens it there, by its key in
// the Forge's side column, and gives back its frame and the frame's element. The 6.8.1 tests of Tabula, Abacus and Imago take
// a Forge page too (The Forge 653, which carries Ingenium 6.8.1's fixes to them).
//   const { fr, fh } = await require('./in_forge.js')(page, url, 'tabula', '#editor');
module.exports = async function inForge(p, url, app, ready) {
  await p.goto(url);
  await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 300000 });
  await p.waitForTimeout(1500);
  await p.evaluate(() => { try { if (typeof cdCloseDoor === 'function') cdCloseDoor(); } catch (e) {} });
  await p.waitForTimeout(500);
  const name = { tabula: 'Tabula', abacus: 'Abacus', slides: 'Imago' }[app];
  await p.evaluate(n => { const k = [...document.querySelectorAll('button.rail-stone')].find(x => x.textContent.trim() === n); if (!k) throw new Error('no key for ' + n); k.click(); }, name);
  await p.waitForFunction(([id, sel]) => { const f = document.getElementById(id); try { return !!(f && f.offsetParent && f.contentWindow.document.querySelector(sel) && f.contentWindow.document.readyState === 'complete'); } catch (e) { return false; } },
    ['frame-' + app, ready], { timeout: 120000 });
  await p.waitForTimeout(2000);
  const fh = await p.$('#frame-' + app);
  return { fh, fr: await fh.contentFrame() };
};
