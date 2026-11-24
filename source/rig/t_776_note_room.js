// Ingenium 7.76 (24 November 2026): a sticky note keeps room below the line being written (modules/r370.js).
// Her words: "I want it to auto-scroll slightly and leave the page at half a page or something ... that way I can keep my sticky notes
// at my desired size on the page and continue writing ... As always, I want the scrolling function kept but the scroll bars hidden".
//   node rig/t_776_note_room.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} go('home'); });
  await sleep(600);
  await p.evaluate(() => { newStickyNote(); }); await sleep(800);
  // she gives the note her size, with its corner (as the corner does: the card's width and height)
  const at0 = await p.evaluate(() => { const n = [...document.querySelectorAll('.sticky-note')].pop(); n.style.width = '340px'; n.style.height = '300px';
    const r = n.getBoundingClientRect(), bd = n.querySelector('.sn-body'); bd.focus(); return { h: Math.round(r.height), w: Math.round(r.width), bh: bd.clientHeight }; });
  // she writes, line after line, past the foot of the note
  const lines = []; for (let i = 1; i <= 26; i++) {
    await p.keyboard.type('Line ' + i + ' of the note, written at the pace of a thought.'); await p.keyboard.press('Enter'); await sleep(i > 6 ? 260 : 60);
    lines.push(await p.evaluate(() => { const n = [...document.querySelectorAll('.sticky-note')].pop(), bd = n.querySelector('.sn-body'), br = bd.getBoundingClientRect();
      const s = getSelection(), r = s.getRangeAt(0).cloneRange(); let c = r.getClientRects()[0]; if (!c || !c.height) { const m = document.createElement('span'); m.textContent = '​'; r.insertNode(m); c = m.getBoundingClientRect(); m.remove(); }
      return { below: Math.round(br.top + bd.clientHeight - c.bottom), from: Math.round(c.top - br.top), bh: bd.clientHeight, noteH: Math.round(n.getBoundingClientRect().height), st: Math.round(bd.scrollTop), sh: bd.scrollHeight }; })); }
  const last = lines[lines.length - 1], minBelow = Math.min(...lines.slice(8).map(l => l.below));
  ok(last.st > 0 && last.sh > last.bh, 'past the foot, the note scrolls (its writing goes on below)', last);
  ok(minBelow >= 40, 'the line being written never sits at the foot: at least about two lines of room below it, always', { minBelow, lines: lines.slice(8).map(l => l.below) });
  ok(lines.slice(8).some(l => l.from <= l.bh * 0.62), 'it rises to a little above the middle once the foot is near', lines.slice(8).map(l => l.from + '/' + l.bh));
  ok(lines.every(l => Math.abs(l.noteH - at0.h) <= 2), 'the note keeps the size she gave it', { before: at0.h, after: lines.map(l => l.noteH) });
  const sb = await p.evaluate(() => { const bd = [...document.querySelectorAll('.sticky-note .sn-body')].pop(), cs = getComputedStyle(bd); return { sw: cs.scrollbarWidth, gap: bd.offsetWidth - bd.clientWidth - (parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth)) }; });
  ok(sb.sw === 'none' && sb.gap <= 0, 'the scroll bar stays hidden', sb);
  // her text is kept as written (the marker that finds the caret leaves nothing behind)
  const txt = await p.evaluate(() => { const n = [...document.querySelectorAll('.sticky-note')].pop(); return n.querySelector('.sn-body').innerText; });
  ok(!/​/.test(txt) && (txt.match(/written at the pace of a thought/g) || []).length === 26, 'the note holds exactly what she wrote, nothing added', { n: (txt.match(/written at the pace/g) || []).length });
  await p.screenshot({ path: OUT + '/note.png' });
  // a new note that still grows line by line grows as before, with no room added
  await p.evaluate(() => { newStickyNote(); }); await sleep(800);
  const g0 = await p.evaluate(() => { const n = [...document.querySelectorAll('.sticky-note')].pop(), bd = n.querySelector('.sn-body'); bd.focus(); return { h: Math.round(n.getBoundingClientRect().height), pad: getComputedStyle(bd).paddingBottom }; });
  for (let i = 1; i <= 5; i++) { await p.keyboard.type('Growing line ' + i + '.'); await p.keyboard.press('Enter'); await sleep(120); }
  const g1 = await p.evaluate(() => { const n = [...document.querySelectorAll('.sticky-note')].pop(), bd = n.querySelector('.sn-body'); return { h: Math.round(n.getBoundingClientRect().height), pad: getComputedStyle(bd).paddingBottom, st: bd.scrollTop }; });
  ok(g1.pad === g0.pad && g1.h > g0.h && g1.st === 0, 'a new note that grows line by line grows as it did, with no room added', { g0, g1 });
  ok(errs.length === 0, 'no page errors', errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
