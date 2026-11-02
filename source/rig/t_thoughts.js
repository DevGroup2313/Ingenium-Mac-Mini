// R121: Ingenium's thought cloud (the shared thoughts/thought_cloud.html): light, dragged like a sticky note, resized,
// put away with a number and a reminder, closed only after asking, the Inbox with life areas and follow-ups, reminders.
// node thoughts_e2e.js <url> <outdir>
const pw = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 320) : '')); c ? pass++ : fail++; };
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  async function boot() { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await wait(900);
    await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); }); }
  await p.goto(URL_); await boot();
  await p.evaluate(() => { state.parked = [{ id: 'old1', t: 'An old parked thought', at: Date.now() - 3600e3 }]; state.reminders = []; Object.keys(localStorage).filter(k => k.indexOf('ing_tc_') === 0).forEach(k => localStorage.removeItem(k)); saveState(); go('home'); IngInbox.markBar(); });
  await wait(300);
  const parts = await p.evaluate(() => window.__ingParts);
  ok(parts.p50 === 'running' && await p.evaluate(() => !!window.ThoughtCloud), 'the Inbox part (p50) runs on the shared thought cloud', parts.p50);
  const fab = await p.evaluate(() => { const f = document.getElementById('fabPark'), b = f.querySelector('.tc-badge'), r = f.getBoundingClientRect(), br = b.getBoundingClientRect(), bell = document.getElementById('fabBell').getBoundingClientRect(), cs = getComputedStyle(b);
    return { title: f.title, n: b.textContent, shown: !b.hidden, right: br.right > r.right - 6 && br.top < r.top + 8, bg: cs.backgroundImage, font: cs.fontSize, bellAbove: bell.top < r.top }; });
  ok(fab.title === 'Catch a thought (1 in the Inbox)' && fab.n === '1' && fab.shown && fab.right && fab.font === '10px' && /106, 63, 181/.test(fab.bg), 'the 💭 carries a little number at its top right, as the bell does, in Ingenium\'s purple', JSON.stringify(fab));
  ok(fab.bellAbove, 'the side buttons follow Carpe Diem\'s order: the bell, then the 💭', JSON.stringify(fab));

  // 1. it pops up as a little cloud
  await p.keyboard.press('Control+Period'); await wait(900);
  const c1 = await p.evaluate(() => { const c = document.querySelector('.tc-cloud'); if (!c) return null; const slab = getComputedStyle(c.querySelector('.tc-body')).boxShadow; const dots = [...c.querySelectorAll('.tc-dot')].filter(d => getComputedStyle(d).visibility === 'visible').length;
    return { app: c.getAttribute('data-tc-app'), keys: [...c.querySelectorAll('.tc-keys button')].map(b => b.textContent), focus: document.activeElement && document.activeElement.className, slab, dots, left: c.style.left, will: getComputedStyle(c).willChange }; });
  ok(c1 && c1.app === 'ingenium' && c1.keys.join('|') === 'Keep|Inbox · 1|−|✕' && /tc-in/.test(c1.focus), 'Ctrl and the full stop pops up the cloud, ready to write, with Keep, Inbox · 1, − and ✕', JSON.stringify(c1));
  ok(c1 && /0px -3px 0px 0px inset/.test(c1.slab) && /-2px 0px 0px 0px inset/.test(c1.slab) && c1.dots === 3, 'it is a raised slab with the thickness of paper: lit top and left edges, a wall on the right and beneath, and three raised beads leading to the 💭', JSON.stringify({ dots: c1 && c1.dots }));
  const noteCasts = await p.evaluate(() => { const n = newStickyNote(); renderStickyPins(); const c = document.querySelector('.sticky-note[data-sn-id="' + n.id + '"]'); const sh = getComputedStyle(c).boxShadow; state.notes = state.notes.filter(x => x.id !== n.id); renderStickyPins(); return sh; });
  const geo = sh => sh.split(/,(?![^(]*\))/).map(e => (e.indexOf('inset') >= 0 ? 'in ' : '') + (e.match(/-?[\d.]+px/g) || []).join(' ')).filter(g => g !== '0px 0px 0px 1px');
  const want = geo(noteCasts), have = geo(c1.slab);
  const inner = want.filter(g => g.indexOf('in ') === 0), outer = have.filter(g => g.indexOf('in ') !== 0);
  const blur = Math.max(...outer.map(g => +((g.split(' ')[2] || '0px').replace('px', ''))));
  ok(inner.length === 4 && inner.every(g => have.includes(g)) && blur <= 12, 'it has the sticky notes\' paper edges and walls, with only a short, light shadow beneath', JSON.stringify({ edges: inner, casts: outer }));
  ok(c1.will === 'transform' && (c1.left === '' || c1.left === '0px'), 'it stands on its own layer and is moved by a transform, so dragging repaints nothing', JSON.stringify({ will: c1.will, left: c1.left }));
  await p.keyboard.type('Ask the supervisor about chapter two'); await p.keyboard.press('Enter'); await p.keyboard.type('and the reading list'); await wait(250);
  const g1 = await p.evaluate(() => ({ h: document.querySelector('.tc-body').offsetHeight, ta: document.querySelector('.tc-in').offsetHeight, w: document.querySelector('.tc-in').offsetWidth }));
  ok(g1.h > 70 && g1.h < 200 && g1.w > 200, 'the panel grows with the words, line by line, and no more', JSON.stringify(g1));
  await p.screenshot({ path: OUT + '/cloud-open.png' });

  // the second look, layered depth: layers at their own depths, turning to follow the mouse
  await p.evaluate(() => { IngInbox.tc.setLook('layered'); }); await wait(150);
  const lay = await p.evaluate(async () => { const c = document.querySelector('.tc-cloud'); const back = getComputedStyle(c.querySelector('.tc-back')).display, persp = getComputedStyle(c).perspective, keysZ = getComputedStyle(c.querySelector('.tc-keys')).transform;
    const r = c.querySelector('.tc-body').getBoundingClientRect(); c.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'mouse', bubbles: false })); c.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'mouse', clientX: r.right - 10, clientY: r.bottom - 6, bubbles: true }));
    await new Promise(x => setTimeout(x, 450)); const ry = c.style.getPropertyValue('--ry'), tilt = getComputedStyle(c.querySelector('.tc-tilt')).transform; c.dispatchEvent(new PointerEvent('pointerleave', { bubbles: false })); return { look: c.getAttribute('data-tc-look'), back, persp, keysZ, ry, tilt }; });
  ok(lay.look === 'layered' && lay.back === 'block' && lay.persp !== 'none' && /matrix3d/.test(lay.keysZ) && parseFloat(lay.ry) > 2 && /matrix3d/.test(lay.tilt), 'the layered look stands in layers, and turns to follow the mouse as the seal does', JSON.stringify(lay));
  await p.evaluate(() => { IngInbox.tc.setLook('note'); }); await wait(150);
  // 2. dragged like a sticky note
  const gl = await p.evaluate(() => { const r = document.querySelector('.tc-glyph').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, t: document.querySelector('.tc-cloud').style.transform }; });
  await p.mouse.move(gl.x, gl.y); await p.mouse.down();
  for (let i = 1; i <= 12; i++) { await p.mouse.move(gl.x - i * 18, gl.y + i * 9); }
  const held = await p.evaluate(() => { const c = document.querySelector('.tc-cloud'); return { held: c.classList.contains('tc-held'), lift: getComputedStyle(c.querySelector('.tc-lift')).transform, tilt: c.querySelector('.tc-tilt').style.transform }; });
  await p.screenshot({ path: OUT + '/cloud-held.png' });
  await p.mouse.up(); await wait(700);
  const dr = await p.evaluate(() => { const c = document.querySelector('.tc-cloud'); return { t: c.style.transform, held: c.classList.contains('tc-held'), saved: JSON.parse(localStorage.getItem('ing_tc_pos') || 'null'), tilt: c.querySelector('.tc-tilt').style.transform }; });
  ok(held.held && held.lift !== 'none' && /rotate/.test(held.tilt), 'picked up, it lifts and sways with the hand', JSON.stringify(held));
  ok(dr.t !== gl.t && !dr.held && dr.saved && dr.tilt === '', 'set down, it settles where it is left, and keeps that place', JSON.stringify(dr));
  // 3. resized from its corner
  const gr = await p.evaluate(() => { const r = document.querySelector('.tc-rz[data-rz="se"]').getBoundingClientRect(); return { x: r.left + 10, y: r.top + 10, w: document.querySelector('.tc-cloud').offsetWidth }; });
  await p.mouse.move(gr.x, gr.y); await p.mouse.down(); await p.mouse.move(gr.x + 90, gr.y + 50, { steps: 8 }); await p.mouse.up(); await wait(300);
  const rs = await p.evaluate(() => ({ w: document.querySelector('.tc-cloud').offsetWidth, sized: document.querySelector('.tc-cloud').classList.contains('tc-sized'), saved: JSON.parse(localStorage.getItem('ing_tc_size') || 'null') }));
  ok(rs.w > gr.w + 60 && rs.sized && rs.saved && rs.saved.w === rs.w, 'its corner resizes it, and the size is kept', JSON.stringify({ before: gr.w, after: rs }));
  // the left edge and the top edge: the far sides stay put
  const box0 = await p.evaluate(() => { const c = document.querySelector('.tc-cloud').getBoundingClientRect(), w = document.querySelector('.tc-rz[data-rz="w"]').getBoundingClientRect(), n = document.querySelector('.tc-rz[data-rz="n"]').getBoundingClientRect(); return { l: c.left, r: c.right, t: c.top, b: c.bottom, wx: w.left + 5, wy: w.top + w.height / 2, nx: n.left + n.width / 2, ny: n.top + 5, count: document.querySelectorAll('.tc-rz').length }; });
  await p.mouse.move(box0.wx, box0.wy); await p.mouse.down(); await p.mouse.move(box0.wx - 60, box0.wy, { steps: 6 }); await p.mouse.up(); await wait(250);
  await p.mouse.move(box0.nx - 30, box0.ny); await p.mouse.down(); await p.mouse.move(box0.nx - 30, box0.ny - 40, { steps: 6 }); await p.mouse.up(); await wait(250);
  const box1 = await p.evaluate(() => { const c = document.querySelector('.tc-cloud').getBoundingClientRect(); return { l: c.left, r: c.right, t: c.top, b: c.bottom }; });
  ok(box0.count === 8 && box1.l < box0.l - 40 && Math.abs(box1.r - box0.r) < 4 && box1.t < box0.t - 25 && Math.abs(box1.b - box0.b) < 6, 'every edge and corner resizes it: pulled by its left and top edges, it grows that way and its far sides stay put', JSON.stringify({ box0, box1 }));

  // 4. − puts it away: the words stay with the 💭, which says so
  await p.click('.tc-min', { force: true }); await wait(700);
  const pa = await p.evaluate(() => { const f = document.getElementById('fabPark'); return { open: !!document.querySelector('.tc-cloud'), n: f.querySelector('.tc-badge').textContent, dot: !f.querySelector('.tc-draft').hidden, title: f.title, draft: JSON.parse(localStorage.getItem('ing_tc_draft') || 'null') }; });
  ok(!pa.open && pa.n === '2' && pa.dot && /^Bring back your thought \(1 in the Inbox, 1 put away/.test(pa.title) && pa.draft && /reading list/.test(pa.draft.t), '− puts it away: the 💭 keeps the words, counts them and shows a small cloud', JSON.stringify(pa));
  await p.screenshot({ path: OUT + '/put-away.png' });
  // it survives a restart of the app
  await p.reload(); await boot(); await wait(500);
  const rl = await p.evaluate(() => { const f = document.getElementById('fabPark'); return { n: f.querySelector('.tc-badge').textContent, dot: !f.querySelector('.tc-draft').hidden }; });
  ok(rl.n === '2' && rl.dot, 'the thought put away is still there after the app is opened again', JSON.stringify(rl));
  await p.click('#fabPark'); await wait(900);
  const back = await p.evaluate(() => (document.querySelector('.tc-in') || {}).value);
  ok(back === 'Ask the supervisor about chapter two\nand the reading list', 'the 💭 brings it back with every word', JSON.stringify(back));
  // 5. ✕ asks before letting words go
  await p.click('.tc-x', { force: true }); await wait(200);
  const ask = await p.evaluate(() => ({ ask: !document.querySelector('.tc-ask').hidden, keys: document.querySelector('.tc-keys').hidden, text: document.querySelector('.tc-ask').textContent }));
  ok(ask.ask && ask.keys && /Keep these words in the Inbox\?/.test(ask.text) && /Keep them/.test(ask.text) && /Let them go/.test(ask.text), '✕ with words written asks first: keep them, or let them go', JSON.stringify(ask));
  await p.screenshot({ path: OUT + '/close-asks.png' });
  await p.evaluate(() => [...document.querySelectorAll('.tc-ask button')].find(b => b.textContent === 'Back').click()); await wait(150);
  const bk = await p.evaluate(() => ({ ask: !document.querySelector('.tc-ask').hidden, val: document.querySelector('.tc-in').value.length }));
  ok(!bk.ask && bk.val > 10, 'Back returns to the words', JSON.stringify(bk));
  // Keep: the words drift into the 💭
  await p.click('.tc-keep', { force: true }); await wait(320);
  const motes = await p.evaluate(() => document.querySelectorAll('.tc-mote').length);
  ok(motes > 20, 'kept, the words drift letter by letter into the 💭', 'letters in flight: ' + motes);
  await wait(2400);
  const kp = await p.evaluate(() => ({ open: !!document.querySelector('.tc-cloud'), n: state.parked.length, first: state.parked[0], badge: document.querySelector('#fabPark .tc-badge').textContent, dot: !document.querySelector('#fabPark .tc-draft').hidden, toast: (document.querySelector('.toast, #toast, .ing-toast') || {}).textContent }));
  ok(!kp.open && kp.n === 2 && kp.first.t.indexOf('Ask the supervisor') === 0 && kp.first.sphere === 'academic' && kp.badge === '2' && !kp.dot, 'it is first in the Inbox, filed as academic, and the 💭 counts two', JSON.stringify(kp).slice(0, 300));
  // Esc: with words, put away; empty, closed
  await p.keyboard.press('Control+Period'); await wait(500); await p.keyboard.type('Water the basil'); await p.keyboard.press('Escape'); await wait(700);
  const e1 = await p.evaluate(() => ({ open: !!document.querySelector('.tc-cloud'), draft: (JSON.parse(localStorage.getItem('ing_tc_draft') || 'null') || {}).t }));
  ok(!e1.open && e1.draft === 'Water the basil', 'Esc with words puts them away rather than losing them', JSON.stringify(e1));
  await p.click('#fabPark'); await wait(700);
  await p.evaluate(() => { const t = document.querySelector('.tc-in'); t.value = ''; t.dispatchEvent(new Event('input')); }); await p.keyboard.press('Escape'); await wait(1200);
  const e2 = await p.evaluate(() => ({ open: !!document.querySelector('.tc-cloud'), draft: localStorage.getItem('ing_tc_draft') }));
  ok(!e2.open && !e2.draft, 'Esc on an empty cloud simply closes it', JSON.stringify(e2));
  // with less motion: it simply goes
  await p.evaluate(() => document.body.setAttribute('data-motion', 'minimal'));
  await p.keyboard.press('Control+Period'); await wait(200); await p.keyboard.type('Buy printer ink'); await p.keyboard.press('Control+Enter'); await wait(300);
  const ce = await p.evaluate(() => ({ open: !!document.querySelector('.tc-cloud'), n: state.parked.length, motes: document.querySelectorAll('.tc-mote').length, still: true }));
  ok(!ce.open && ce.n === 3 && ce.motes === 0, 'Ctrl and Enter keeps it; with less motion it simply goes, with no drift', JSON.stringify(ce));
  await p.evaluate(() => document.body.setAttribute('data-motion', 'calm'));
  // inside the whole Tabula
  await p.evaluate(() => go('tabula')); await p.waitForSelector('#ing-desk iframe[data-app="tabula"]'); await wait(3500);
  const inFrame = await p.evaluate(async () => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); const ev = new f.contentWindow.KeyboardEvent('keydown', { key: '.', code: 'Period', ctrlKey: true, bubbles: true, cancelable: true }); f.contentDocument.body.dispatchEvent(ev); await new Promise(r => setTimeout(r, 400)); const open = !!document.querySelector('.tc-cloud'); IngInbox.tc.shut(true); return { open, prevented: ev.defaultPrevented }; });
  ok(inFrame.open && inFrame.prevented, 'Ctrl and the full stop works inside Tabula\'s frame too', JSON.stringify(inFrame));

  // 6. the Inbox
  await p.evaluate(() => { go('home'); IngInbox.open(); }); await wait(500);
  const ib = await p.evaluate(() => { const s = document.querySelector('.tc-sheet'); const rows = [...s.querySelectorAll('.tc-item')]; return { title: s.querySelector('h3').textContent, items: rows.map(r => r.querySelector('.tc-item-t').textContent), bal: [...s.querySelectorAll('.tc-bal .tc-chip')].map(c => c.textContent), acts: [...rows[0].querySelectorAll('.tc-acts button')].map(b => b.textContent), foot: [...s.querySelectorAll('.tc-foot button')].map(b => b.textContent), meta: [...rows[0].querySelectorAll('.tc-meta .tc-chip')].map(c => c.textContent) }; });
  ok(ib.title === '💭The Inbox' && ib.items.length === 3 && ib.items[0] === 'Buy printer ink' && ib.items[2] === 'An old parked thought', 'the Inbox holds them newest first, her old parked thought among them', JSON.stringify(ib.items));
  ok(ib.acts.join('|') === '🗒️ To a note|📝 To Tabula|🪜 Steps|💬 To the chat|🔔 A reminder|✓ Done' && ib.foot.includes('+ Catch another') && ib.foot.includes('✨ Suggest where each goes') && ib.foot.includes('Let them all go') && ib.foot.some(t => /Gentle reminders/.test(t)), 'each goes to a note, Tabula, steps, the chat, a reminder, or done; the foot catches, suggests, sets the reminders, lets all go', JSON.stringify({ acts: ib.acts, foot: ib.foot }));
  ok(ib.bal[0] === 'All · 3' && ib.bal.some(t => /Academic · 1/.test(t)) && ib.meta.length === 2 && /Remind me/.test(ib.meta[1]), 'each thought is filed under a part of her life, with a key to bring it back later', JSON.stringify({ bal: ib.bal, meta: ib.meta }));
  await p.screenshot({ path: OUT + '/inbox.png' });
  // the part of life, changed by hand
  await p.evaluate(() => { const row = [...document.querySelectorAll('.tc-item')].find(r => /printer ink/.test(r.textContent)); row.querySelectorAll('.tc-meta .tc-chip')[0].click(); });
  await wait(150);
  await p.evaluate(() => [...document.querySelectorAll('.tc-menu button')].find(b => /Personal/.test(b.textContent)).click()); await wait(200);
  // a follow-up time
  await p.evaluate(() => { const row = [...document.querySelectorAll('.tc-item')].find(r => /printer ink/.test(r.textContent)); row.querySelectorAll('.tc-meta .tc-chip')[1].click(); });
  await wait(150);
  const menuItems = await p.evaluate(() => [...document.querySelectorAll('.tc-menu button')].map(b => b.textContent));
  await p.evaluate(() => [...document.querySelectorAll('.tc-menu button')].find(b => b.textContent === 'Tomorrow morning').click()); await wait(200);
  const fu = await p.evaluate(() => { const it = state.parked.find(x => /printer ink/.test(x.t)); const d = new Date(it.remindAt), t = new Date(); t.setDate(t.getDate() + 1); return { sphere: it.sphere, nine: d.getHours() === 9 && d.getDate() === t.getDate(), chip: [...document.querySelectorAll('.tc-item')].find(r => /printer ink/.test(r.textContent)).querySelectorAll('.tc-meta .tc-chip')[1].textContent }; });
  ok(menuItems.join('|') === 'In an hour|This evening|Tomorrow morning|In three days|Next week' && fu.sphere === 'personal' && fu.nine && /tomorrow/.test(fu.chip), 'she can refile it, and ask for it back tomorrow morning at nine', JSON.stringify({ menuItems, fu }));
  // places
  await p.evaluate(() => { const row = [...document.querySelectorAll('.tc-item')].find(r => /printer ink/.test(r.textContent)); [...row.querySelectorAll('.tc-acts button')].find(b => /reminder/.test(b.textContent)).click(); }); await wait(300);
  const rem = await p.evaluate(() => ({ rem: state.reminders.map(r => r.text), n: state.parked.length, rows: document.querySelectorAll('.tc-item').length, badge: (document.getElementById('bellBadge') || {}).textContent, fab: document.querySelector('#fabPark .tc-badge').textContent }));
  ok(rem.rem.includes('Buy printer ink') && rem.n === 2 && rem.rows === 2 && rem.badge === '1' && rem.fab === '2', 'A reminder sends it to the bell; the Inbox and the 💭\'s number follow', JSON.stringify(rem));
  await p.evaluate(() => { const row = [...document.querySelectorAll('.tc-item')].find(r => /old parked/.test(r.textContent)); [...row.querySelectorAll('.tc-acts button')].find(b => /To a note/.test(b.textContent)).click(); }); await wait(300);
  const note = await p.evaluate(() => ({ text: state.notes[0].text, pinned: state.notes[0].pinned, n: state.parked.length }));
  ok(note.text === 'An old parked thought' && note.pinned && note.n === 1, 'To a note pins it as a Schedae note', JSON.stringify(note));
  await p.evaluate(() => { const row = document.querySelector('.tc-item'); [...row.querySelectorAll('.tc-acts button')].find(b => /To Tabula/.test(b.textContent)).click(); });
  await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); try { return /Ask the supervisor about chapter two/.test(f.contentDocument.getElementById('editor').innerText); } catch (e) { return false; } }, null, { timeout: 30000 }).then(() => ok(true, 'To Tabula sends it into the whole Tabula, and the Inbox closes'), () => ok(false, 'To Tabula sends it into the whole Tabula'));
  const tab = await p.evaluate(() => ({ page: IngDesk.state().shown && IngDesk.state().active, n: state.parked.length, sheet: !!document.querySelector('.tc-sheet') }));
  ok(tab.page === 'tabula' && tab.n === 0 && !tab.sheet, 'Tabula is open on the Desk and the Inbox is empty', JSON.stringify(tab));

  // 7. the model's suggestion
  await p.evaluate(() => { state.parked = [{ id: 's1', t: 'Write the abstract for the conference', at: Date.now() }, { id: 's2', t: 'Is a mixed-methods design right for chapter three?', at: Date.now() - 1000 }, { id: 's3', t: 'The idea about seasons in the calm room', at: Date.now() - 2000 }]; saveState();
    window.__asked = null; supAsk = function (prompt) { window.__asked = prompt; return Promise.resolve('1: task, it has several parts\n2: chat, a question to think through\n3: note, worth keeping'); }; go('home'); IngInbox.open(); });
  await wait(300);
  await p.evaluate(() => [...document.querySelectorAll('.tc-foot button')].find(b => /Suggest/.test(b.textContent)).click()); await wait(500);
  const sug = await p.evaluate(() => ({ asked: /one word/.test(window.__asked || '') && /1\. Write the abstract/.test(window.__asked || ''), chips: [...document.querySelectorAll('.tc-sug')].map(s => s.textContent), n: state.parked.length }));
  ok(sug.asked && sug.chips.length === 3 && /a task with steps: it has several parts/.test(sug.chips[0]) && /the chat/.test(sug.chips[1]) && /a note/.test(sug.chips[2]) && sug.n === 3, 'the model on this device suggests a place for each, and nothing moves yet', JSON.stringify(sug.chips));
  await p.evaluate(() => { const row = [...document.querySelectorAll('.tc-item')].find(r => /seasons/.test(r.textContent)); row.querySelector('.tc-sug button').click(); }); await wait(300);
  const did = await p.evaluate(() => ({ note: state.notes[0].text, n: state.parked.length }));
  ok(/seasons in the calm room/.test(did.note) && did.n === 2, 'Do it carries out the suggestion she agrees with', JSON.stringify(did));
  await p.evaluate(() => [...document.querySelectorAll('.tc-foot button')].find(b => /Let them all go/.test(b.textContent)).click()); await wait(150);
  const lg = await p.evaluate(() => [...document.querySelectorAll('.tc-foot button')].map(b => b.textContent));
  await p.evaluate(() => [...document.querySelectorAll('.tc-foot button')].find(b => /Yes, let them go/.test(b.textContent)).click()); await wait(200);
  const empty = await p.evaluate(() => ({ n: state.parked.length, text: (document.querySelector('.tc-empty') || {}).textContent }));
  ok(lg.includes('Yes, let them go') && lg.includes('Keep them') && empty.n === 0 && empty.text === 'The Inbox is empty. A clear head.', 'Let them all go asks on the page, then clears the Inbox', JSON.stringify({ lg, empty }));
  await p.evaluate(() => IngInbox.tc.closeInbox());

  // 8. reminders across the app
  await p.evaluate(() => { const now = Date.now(); state.parked = [{ id: 'r1', t: 'Email the librarian about the reading list', at: now - 2 * 864e5, sphere: 'academic', remindAt: now - 1000 }, { id: 'r2', t: 'Sketch the zine cover', at: now - 3 * 864e5, sphere: 'creative' }, { id: 'r3', t: 'Send the gallery invoice', at: now - 5 * 36e5, sphere: 'work' }]; saveState(); IngInbox.tc.tick(); });
  await wait(700);
  const due = await p.evaluate(() => { const n = document.querySelector('.tc-nudge'); if (!n) return null; const r = n.getBoundingClientRect(), f = document.getElementById('fabPark').getBoundingClientRect(); return { text: n.querySelector('.tc-nudge-t').textContent, keys: [...n.querySelectorAll('.tc-nudge-k button')].map(b => b.textContent), leftOfFab: r.right < f.left }; });
  ok(due && /A thought you asked to come back to/.test(due.text) && /Email the librarian/.test(due.text) && due.keys.join('|') === 'Open it|Later|Done' && due.leftOfFab, 'a follow-up comes back as a small cloud beside the 💭: open it, later, or done', JSON.stringify(due));
  await p.screenshot({ path: OUT + '/reminder.png' });
  await p.evaluate(() => [...document.querySelectorAll('.tc-nudge button')].find(b => b.textContent === 'Open it').click()); await wait(500);
  const op = await p.evaluate(() => ({ sheet: !!document.querySelector('.tc-sheet'), hl: (document.querySelector('.tc-item.tc-hl .tc-item-t') || {}).textContent, cleared: !state.parked.find(x => x.id === 'r1').remindAt }));
  ok(op.sheet && /Email the librarian/.test(op.hl) && op.cleared, 'Open it shows that thought in the Inbox, marked', JSON.stringify(op));
  await p.evaluate(() => IngInbox.tc.closeInbox());
  // quiet times: nothing during a focus session
  await p.evaluate(() => { state.parked[0].remindAt = Date.now() - 1000; state.parked[0].reminded = 0; window.__pomoWas = pomo.running; pomo.running = true; pomo.phase = 'focus'; IngInbox.tc.tick(); });
  await wait(400);
  const q1 = await p.evaluate(() => { const n = !!document.querySelector('.tc-nudge'); pomo.running = window.__pomoWas; return n; });
  ok(!q1, 'during a focus session on the Clepsydra, reminders wait', String(q1));
  await p.evaluate(() => IngInbox.tc.tick()); await wait(500);
  const q2 = await p.evaluate(() => !!document.querySelector('.tc-nudge'));
  ok(q2, 'and come once the session is over', String(q2));
  await p.evaluate(() => { const x = document.querySelector('.tc-nudge-x'); if (x) x.click(); }); await wait(300);
  // the round-up names each part of life and takes turns
  const lastNudge = () => { const n = document.querySelectorAll('.tc-nudge-t'); return n[n.length - 1].textContent; };
  const r1 = await p.evaluate(() => { IngInbox.tc.nudge('roundup', true); const n = document.querySelectorAll('.tc-nudge-t'); return n[n.length - 1].textContent; });
  await wait(300);
  const r2 = await p.evaluate(() => { IngInbox.tc.nudge('roundup', true); const n = document.querySelectorAll('.tc-nudge-t'); return n[n.length - 1].textContent; });
  ok(/3 thoughts are waiting in the Inbox: 1 academic, 1 professional, 1 creative/.test(r1) && /Your oldest \w+ one has waited/.test(r1) && r1.split('Your oldest')[1].split(' ')[1] !== r2.split('Your oldest')[1].split(' ')[1], 'what waits is named by part of life, and the reminders take turns between them', JSON.stringify({ r1, r2 }));
  await p.evaluate(() => { const x = document.querySelector('.tc-nudge-x'); if (x) x.click(); }); await wait(300);
  // a thought put away and left: it comes back to mind
  await p.evaluate(() => { localStorage.setItem('ing_tc_draft', JSON.stringify({ t: 'Ring the dentist', at: Date.now() - 16 * 6e4, nudged: 0 })); state.parked.forEach(x => { x.remindAt = null; }); localStorage.setItem('ing_tc_roundAt', JSON.stringify(Date.now())); IngInbox.tc.tick(); });
  await wait(600);
  const dn = await p.evaluate(() => { const n = document.querySelector('.tc-nudge'); return n ? { t: n.querySelector('.tc-nudge-t').textContent, keys: [...n.querySelectorAll('.tc-nudge-k button')].map(b => b.textContent) } : null; });
  ok(dn && /You put a thought away/.test(dn.t) && /Ring the dentist/.test(dn.t) && dn.keys.join('|') === 'Bring it back|Keep it in the Inbox', 'a thought put away and left for a while comes back as a reminder', JSON.stringify(dn));
  await p.evaluate(() => [...document.querySelectorAll('.tc-nudge button')].find(b => b.textContent === 'Keep it in the Inbox').click()); await wait(300);
  const kd = await p.evaluate(() => ({ first: state.parked[0].t, draft: localStorage.getItem('ing_tc_draft') }));
  ok(kd.first === 'Ring the dentist' && !kd.draft, 'Keep it in the Inbox files it there', JSON.stringify(kd));

  // 9. the Focus page and the quiet screen
  await p.evaluate(() => { state.parked = [{ id: 'f1', t: 'Email the librarian', at: Date.now() }]; saveState(); go('focus'); fxRenderPark(); }); await wait(600);
  const fx = await p.evaluate(() => { const c = document.getElementById('fxParkCard'); return { head: c.querySelector('h2').textContent, keys: [...c.querySelectorAll('.ib-foot button')].map(b => b.textContent), item: (c.querySelector('.ib-item .ib-t') || {}).textContent, acts: c.querySelectorAll('.ib-item .ib-acts button').length, meta: (c.querySelector('.ib-item .ib-w') || {}).textContent }; });
  ok(fx.head === '💭 The Inbox' && fx.keys[0] === '💭 Catch a thought' && /Open the Inbox · 1/.test(fx.keys[1]) && fx.item === 'Email the librarian' && fx.acts === 6 && /Academic/.test(fx.meta), 'the Focus page holds the Inbox, with the same places and parts of life', JSON.stringify(fx));
  await p.evaluate(() => quietOpen()); await wait(300);
  const qs = await p.evaluate(async () => { const k = document.getElementById('qsCatch'); if (!k) return null; k.click(); await new Promise(r => setTimeout(r, 500)); const c = document.querySelector('.tc-cloud'); const z = c ? +getComputedStyle(c).zIndex : 0; const zq = +getComputedStyle(document.getElementById('quietScreen')).zIndex; return { key: k.textContent, open: !!c, above: z > zq }; });
  ok(qs && qs.key === '💭 A thought came in' && qs.open && qs.above, 'the quiet screen has "A thought came in", and the cloud opens above it', JSON.stringify(qs));
  // by night
  await p.evaluate(() => { quietClose(); document.body.setAttribute('data-theme', 'night'); IngInbox.tc.redress(); const t = document.querySelector('.tc-in'); t.value = 'A thought by night'; t.dispatchEvent(new Event('input')); }); await wait(300);
  const nt = await p.evaluate(() => { const c = document.querySelector('.tc-cloud'); return { night: c.getAttribute('data-tc-night'), p1: getComputedStyle(c).getPropertyValue('--tc-face-a').trim() }; });
  ok(nt.night === '1' && nt.p1 === '#2c2440', 'by night the cloud wears Ingenium\'s plum', JSON.stringify(nt));
  await p.screenshot({ path: OUT + '/cloud-night.png' });
  await p.evaluate(() => { IngInbox.tc.shut(true); document.body.setAttribute('data-theme', 'day'); });
  const tour = await p.evaluate(() => { const s = ING_TOUR.find(x => x.sub === 'The Inbox'); return s ? s.b : ''; });
  ok(/little cloud pops up/.test(tour) && /number like the bell/.test(tour), 'the tour describes the cloud, its number and its reminders', tour.slice(0, 120));
  // a phone
  const ph = await ctx.newPage(); await ph.setViewportSize({ width: 390, height: 820 }); await ph.goto(URL_);
  await ph.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await wait(900);
  await ph.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); localStorage.removeItem('ing_tc_pos'); localStorage.removeItem('ing_tc_size'); });
  await ph.evaluate(() => document.getElementById('fabPark').click()); await wait(900);
  const pf = await ph.evaluate(() => { const r = document.querySelector('.tc-cloud').getBoundingClientRect(), f = document.getElementById('fabPark').getBoundingClientRect(); return { l: r.left, r: r.right, w: innerWidth, above: r.bottom <= f.top + 4, sw: document.documentElement.scrollWidth }; });
  ok(pf.l >= 0 && pf.r <= pf.w && pf.above && pf.sw <= pf.w, 'on a phone it fits the screen and opens above the 💭', JSON.stringify(pf));
  await ph.screenshot({ path: OUT + '/phone.png' });
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH ' + e.message); process.exit(2); });
