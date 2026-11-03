// The switches in the chat's + menu (Research, Web search, Thinking, Scholarly sources first), in Chat and in Code (Ingenium 6.9.4).
// Her words (3 November 2026): "there is something wrong inside of Ingenium's chat pages, both the regular chat and the coding
// chat, its really hard for the turn the "Research" and the "Web Search" toggles to enable them, they are so hard to select no
// matter how hard I click".
// Each switch is pressed where a person presses it: on the switch itself, on its words, and with the keyboard. Each press must
// turn it over exactly once, and the menu must say so (aria-checked) as the switch shows it.
//   node rig/t_694_plus_switches.js http://127.0.0.1:8150/ingenium.html <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 600) : '')); c ? pass++ : fail++; };
const KEYS = { research: () => !!state.research, web: () => !!state.webSearch, think: () => thinkOn(), scholar: () => schOn() };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1400, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(400);
  const read = (k) => p.evaluate((k) => ({ research: !!state.research, web: !!state.webSearch, think: thinkOn(), scholar: (typeof schOn === 'function') ? schOn() : null })[k], k);
  const openMenu = async () => {
    const open = await p.evaluate(() => !document.getElementById('chatPlusMenu').hidden);
    if (!open) await p.click('#chatImgBtn');
    await p.waitForSelector('#chatPlusMenu:not([hidden]) .pm-item');
    // each row found by its words (in 6.9.3 only some rows carried their key)
    await p.evaluate(() => { const W = { Research: 'research', 'Web search': 'web', Thinking: 'think', 'Scholarly sources first': 'scholar' };
      document.querySelectorAll('#chatPlusMenu .pm-item').forEach((e) => { const t = e.querySelector('.pm-txt'); const w = t && t.firstChild && t.firstChild.textContent; if (W[w]) e.setAttribute('data-k', W[w]); }); });
  };
  const item = (k) => '#chatPlusMenu .pm-item[data-k="' + k + '"]';
  for (const mode of ['chat', 'code']) {
    await p.evaluate((mode) => { go(mode); }, mode);
    await p.waitForTimeout(400);
    const shown = await p.evaluate(() => (document.body.getAttribute('data-chatmode') || 'chat') + (document.getElementById('page-chat').offsetParent ? '' : ' (hidden)'));
    ok(shown === mode, mode + ': the page is in ' + mode + ' mode, and the chat is shown', shown);
    for (const k of ['research', 'web', 'think', 'scholar']) {
      await openMenu();
      if (!(await p.$(item(k)))) { ok(k === 'scholar', mode + ': ' + k + ' is in the menu', k); continue; }
      // 1. on the switch itself, the round knob a person aims at
      for (let i = 0; i < 2; i++) {
        await openMenu();
        const before = await read(k);
        await p.click(item(k) + ' .etrack');
        await p.waitForTimeout(150);
        const after = await read(k);
        const aria = await p.evaluate((s) => { const e = document.querySelector(s); return e ? e.getAttribute('aria-checked') : null; }, item(k));
        const box = await p.evaluate((s) => { const e = document.querySelector(s + ' input'); return e ? e.checked : null; }, item(k));
        ok(after === !before && aria === String(after) && box === after, mode + ': ' + k + ', pressed on its switch, turns ' + (after ? 'on' : 'off') + ' once (press ' + (i + 1) + ')', { before, after, aria, box });
      }
      // 2. on its words
      await openMenu();
      let before = await read(k);
      await p.click(item(k) + ' .pm-txt');
      await p.waitForTimeout(150);
      ok((await read(k)) === !before, mode + ': ' + k + ', pressed on its words, turns over once', { before });
      // 3. with the keyboard (Enter, then Space), from the menu
      for (const key of ['Enter', ' ']) {
        await openMenu();
        before = await read(k);
        await p.focus(item(k));
        await p.keyboard.press(key === ' ' ? 'Space' : key);
        await p.waitForTimeout(150);
        const focus = await p.evaluate(() => document.activeElement && document.activeElement.getAttribute('data-k'));
        ok((await read(k)) === !before && focus === k, mode + ': ' + k + ', ' + (key === ' ' ? 'Space' : key) + ' turns it over once, and the focus stays on it', { before, focus });
      }
      // the menu stays open after a switch is turned, so several can be set in one visit
      ok(await p.evaluate(() => !document.getElementById('chatPlusMenu').hidden), mode + ': ' + k + ', the menu stays open after the switch is turned');
      // set it back to off for the next mode
      if (await read(k)) { await openMenu(); await p.click(item(k) + ' .pm-txt'); await p.waitForTimeout(120); }
    }
    // the role and the whole row's size: the switch is a part of a row that is easy to hit, not a small target of its own
    await openMenu();
    const rows = await p.evaluate(() => ['research', 'web'].map((k) => { const e = document.querySelector('#chatPlusMenu .pm-item[data-k="' + k + '"]'); const r = e.getBoundingClientRect(); return { k, role: e.getAttribute('role'), h: Math.round(r.height), w: Math.round(r.width) }; }));
    ok(rows.every((r) => r.role === 'menuitemcheckbox' && r.h >= 40 && r.w >= 200), mode + ': Research and Web search are switches a screen reader names as such (menuitemcheckbox), on rows at least 40 pixels high', rows);
    await p.locator('#chatPlusMenu').screenshot({ path: OUT + '/plus_menu_' + mode + '.png' }).catch(() => {});
    await p.keyboard.press('Escape');
  }
  ok(await p.evaluate(() => Object.values(window.__ingParts || {}).every(v => v === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
