// node rig/t_681_sweep.js <Ingenium page url> [tabula|abacus|slides ...]
// 6.8.1: every key on every tab of Tabula's, Abacus's and Imago's ribbons, pressed once with something selected, as a
// person presses it. A key that throws an error fails; a key after which nothing at all changes (no change to the page, no
// menu or dialog, no file offered) is listed as silent, to be looked at by hand: some are right to be silent (a toggle
// already on, a key with nothing to act on).
const pw = require('/opt/node-tools/node_modules/playwright');
const URL = process.argv[2]; const APPS = process.argv.slice(3).length ? process.argv.slice(3) : ['tabula', 'abacus', 'slides'];
const SKIP = /^(Close|File|Guide|Print|Exit|Close Abacus|Close Imago|Close Tabula|Quit)\b|^Open (Tabula|Imago|Abacus)|^(Scriba|Fontes)$|full screen|Slide Show|From the beginning|From this slide|Present|Refresh|Reload|Restart|Open a|Open saved|New (deck|workbook|document)|Import|Export|Save|Download|Share|Sign in|Record|Dictate|Read aloud|Speak|Camera|Microphone|Delete this slide|Delete column|Delete row|Clear all|Remove every/i;
let fails = 0;
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, acceptDownloads: true }); const p = await ctx.newPage();
  const pageErrs = []; p.on('pageerror', e => pageErrs.push(e.message));
  let dialogs = 0; p.on('dialog', d => { dialogs++; d.dismiss().catch(() => {}); });
  let downloads = 0; p.on('download', () => downloads++);
  await p.goto(URL); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(800);
  for (const app of APPS) {
    await p.evaluate(a => go(a), app);
    await p.waitForFunction(a => { const f = document.querySelector('#ing-desk iframe[data-app="' + a + '"]'); try { return f.contentWindow.document.readyState === 'complete' && f.contentWindow.document.body.children.length > 3; } catch (e) { return false; } }, app, { timeout: 120000 });
    await p.waitForTimeout(2000);
    const fh = await p.$('#ing-desk iframe[data-app="' + app + '"]'); const fr = await fh.contentFrame();
    await fr.evaluate(() => { window.__fe = []; window.addEventListener('error', e => window.__fe.push(String(e.message))); window.__mut = 0; new MutationObserver(m => { window.__mut += m.length; }).observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true }); });
    const prepare = async () => {   // something selected, as a person would have it
      if (app === 'tabula') await fr.evaluate(() => { const ed = document.getElementById('editor'); if (!ed.textContent.trim()) ed.innerHTML = '<p>Alpha beta gamma delta.</p><p>Epsilon zeta.</p>'; const tw = document.createTreeWalker(ed, 4); const n = tw.nextNode(); const r = document.createRange(); r.setStart(n, 0); r.setEnd(n, Math.min(10, n.nodeValue.length)); ed.focus(); getSelection().removeAllRanges(); getSelection().addRange(r); });
      if (app === 'abacus') await fr.evaluate(() => { const td = document.querySelector('#grid td[data-ref="B2"]'); td.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })); td.click(); });
      if (app === 'slides') await fr.evaluate(() => { const f = document.querySelector('#slide [contenteditable="true"]'); if (!f) return; if (!f.textContent.trim()) f.textContent = 'Alpha beta gamma'; const tw = document.createTreeWalker(f, 4); const n = tw.nextNode(); if (!n) return; const r = document.createRange(); r.setStart(n, 0); r.setEnd(n, Math.min(5, n.nodeValue.length)); f.focus(); getSelection().removeAllRanges(); getSelection().addRange(r); });
    };
    const settle = async () => { await p.keyboard.press('Escape').catch(() => {}); await fr.evaluate(() => { document.querySelectorAll('.modal-back.open,.xg-pop.open,.cd-gal.open,[class*="pop"].open,[class*="menu"].open').forEach(e => e.classList.remove('open')); try { if (window.cdCloseModal) window.cdCloseModal(); } catch (e) {} }); await p.waitForTimeout(120); };
    const tabs = await fr.evaluate(() => [...document.querySelectorAll('.ribtab,.abtab,.rib-tab,#abRibTabs button,[role=tab]')].filter(e => e.offsetParent).map(e => e.textContent.trim()).filter((t, i, a) => t && a.indexOf(t) === i));
    const silent = [], errored = [], unpressed = []; let pressed = 0;
    for (const tab of tabs) {
      if (process.env.TABS && !new RegExp(process.env.TABS).test(tab)) continue;
      await fr.evaluate(t => { const e = [...document.querySelectorAll('.ribtab,.abtab,.rib-tab,#abRibTabs button,[role=tab]')].find(e => e.offsetParent && e.textContent.trim() === t); if (e) e.click(); }, tab);
      await p.waitForTimeout(300);
      const keys = await fr.evaluate(skip => { const out = []; const area = document.querySelector('#abRibPanels .ab-panel.on, .rib-panel.on, .ribbon-panel.on, .rpanel.on, .ribbon:not([style*="none"]), #ribbon, .rib-body') || document.body;
        [...area.querySelectorAll('button')].forEach((e, i) => { if (!e.offsetParent || e.disabled) return; const r = e.getBoundingClientRect(); if (r.top > 260 || r.width < 4) return; const name = (e.title || e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50);
          if (!name || new RegExp(skip, 'i').test(name) || e.closest('.abtab,.ribtab,.rib-tab,#abRibTabs')) return; e.setAttribute('data-sweep', String(out.length)); out.push(name); }); return out; }, SKIP.source);
      for (let i = 0; i < keys.length; i++) {
        await prepare(); await fr.evaluate(() => { window.__mut = 0; window.__fe = []; }); const d0 = dialogs, dl0 = downloads, pe0 = pageErrs.length;
        // found again by its name just before it is pressed (an app may build its ribbon afresh)
        const ok = await fr.evaluate(([name, n, skip]) => { document.querySelectorAll('[data-sweep-now]').forEach(e => e.removeAttribute('data-sweep-now'));
          const area = document.querySelector('#abRibPanels .ab-panel.on, .rib-panel.on, .ribbon-panel.on, .rpanel.on, .ribbon:not([style*="none"]), #ribbon, .rib-body') || document.body;
          const same = [...area.querySelectorAll('button')].filter(e => e.offsetParent && !e.disabled && (e.title || e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50) === name);
          const e = same[n] || same[0]; if (!e) return false; e.setAttribute('data-sweep-now', '1'); e.scrollIntoView({ block: 'nearest', inline: 'center' }); return true; }, [keys[i], keys.slice(0, i).filter(k => k === keys[i]).length, SKIP.source]);
        // the ribbon's own scroll arrows hide once the ribbon has been scrolled to that end by the keys pressed before them
        if (!ok && /^More tools to the (right|left)/.test(keys[i])) continue;
        if (!ok) { unpressed.push(tab + ' > ' + keys[i] + ' (not found again)'); continue; }
        try { await fr.click('[data-sweep-now="1"]', { timeout: 3000 }); } catch (e) { const why = String(e.message).replace(/\x1b\[[0-9;]*m/g, '').split('\n'); unpressed.push(tab + ' > ' + keys[i] + ' (' + (why.filter(l => /intercepts/.test(l))[0] || why.filter(l => /not |outside|unstable|detached/.test(l)).slice(-1)[0] || why[0]).trim() + ')'); continue; }
        pressed++; if (process.env.VERBOSE) console.log('pressed ' + tab + ' > ' + keys[i]); await p.waitForTimeout(350);
        const st = await fr.evaluate(() => ({ mut: window.__mut, fe: window.__fe.slice() }));
        const errs = st.fe.concat(pageErrs.slice(pe0));
        if (errs.length) errored.push(tab + ' > ' + keys[i] + ': ' + errs[0]);
        else if (!st.mut && dialogs === d0 && downloads === dl0) silent.push(tab + ' > ' + keys[i]);
        await settle();
        // back on the same tab (a key may have moved to another)
        await fr.evaluate(t => { const e = [...document.querySelectorAll('.ribtab,.abtab,.rib-tab,#abRibTabs button,[role=tab]')].find(e => e.offsetParent && e.textContent.trim() === t); if (e && !e.classList.contains('on') && !e.classList.contains('active')) e.click(); }, tab);
      }
      await fr.evaluate(() => document.querySelectorAll('[data-sweep]').forEach(e => e.removeAttribute('data-sweep')));
    }
    console.log('== ' + app + ': ' + tabs.length + ' tabs, ' + pressed + ' keys pressed, ' + errored.length + ' with errors, ' + silent.length + ' silent, ' + unpressed.length + ' could not be pressed');
    errored.forEach(x => console.log('ERROR ' + x)); silent.forEach(x => console.log('silent ' + x)); unpressed.forEach(x => console.log('UNPRESSED ' + x));
    fails += errored.length + unpressed.length;
    await p.evaluate(() => go('home')); await p.waitForTimeout(800);
  }
  await b.close(); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
