// node rig/t_685_career.js <Ingenium page url> <out dir>
// 6.8.5: the Career Studio (modules/r188.js), pressed as a person presses it, with a stand-in model (the page's lxAsk
// replaced, every prompt kept). The owner's words (28 October 2026): "I want the cards on the 'How the Studio Works' on
// the Career page to be clickable and animated. I want to be able to click on them for additional details or just because
// it would feel nice"; "I want it operating and writing really well with all of its features"; "I want the text colour of
// the selected tabs to be white instead of black". So:
//   - the room key in hand reads white on its amethyst, still white under the pointer;
//   - the four cards are keys: they rise into place, lift under the pointer; pressed, one opens across the panel with what
//     that part does and a key into it (Enter does the same); pressed again, it closes; the page never scrolls;
//   - a word or page limit the posting sets is read from its own sentences, written into the request, and the draft's
//     length is shown against it; which criteria a draft speaks to is shown, and the essential ones it does not;
//   - Improve it: a note of her own (or the quick choices) rewrites the draft from her profile, read a second time
//     against it; the version before is kept, and The version before brings it back.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(d).slice(0, 400))); c ? pass++ : fail++; };
const POST = 'Lecturer in Digital History\nUniversity of Oxbridge\nWe seek a lecturer in digital history.\nEssential:\n- A PhD in history or a related field\n- Experience of teaching undergraduates\n- Skill in archival research\n- Experience of building digital tools\n' +
  'Desirable:\n- Palaeography\n- Grant writing\nHow to apply: send a CV of no more than two pages and a covering letter of no more than 120 words. The supporting statement should not exceed 800 words.\nCloses 30 November 2026.';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  await p.evaluate(() => {
    const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
    state.models.push({ id: 'mfake12', customName: 'Stand-in 12B', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true }); saveState();
    window.__asks = [];
    lxAsk = function (run, msgs, max, temp, onPiece) { const s = msgs[0].content, u = msgs[1].content; window.__asks.push({ s, u }); let out = '';
      if (/examiner of a draft/.test(s)) out = (u.split('THE DRAFT:\n')[1] || '');
      else if (/revising a draft of mine/.test(s)) out = (u.split('THE DRAFT:\n')[1] || '').split('\n\n').slice(0, 2).join('\n\n') + '\n\nYours faithfully,\nAda Lovelace';
      else if (/CRITERION: the criterion/.test(u)) out = ['TITLE: Lecturer in Digital History', 'ORGANISATION: University of Oxbridge', 'CLOSES: 30 November 2026', 'KIND: JOB',
        'CRITERION: A PhD in history or a related field | ESSENTIAL | NOT SHOWN | none', 'CRITERION: Experience of teaching undergraduates | ESSENTIAL | MET | Tutor in History, taught 40 undergraduates',
        'CRITERION: Skill in archival research | ESSENTIAL | MET | catalogued 312 letters', 'CRITERION: Experience of building digital tools | ESSENTIAL | PARTLY | built four offline apps alone',
        'CRITERION: Palaeography | DESIRABLE | MET | Palaeography', 'CRITERION: Grant writing | DESIRABLE | NOT SHOWN | none',
        'STRENGTH: Teaching and archival work are shown plainly.', 'CONCERN: The post asks for a PhD.', 'NEXT: Ask whether a doctorate near its end would do.', 'ASK: Is a PhD in progress acceptable?'].join('\n');
      else if (/Write my cover letter/.test(u)) out = 'Dear [the reader\'s name],\n\nI apply for the post of Lecturer in Digital History at the University of Oxbridge. My teaching of undergraduates and my archival research suit it.\n\n' +
        'As Tutor in History I taught 40 undergraduates in seminars of 12, and planned the reading for each term with the convenor. As Research Assistant I catalogued 312 letters, wrote a note on each, and kept the catalogue in order for the readers who came after me.\n\n' +
        'I would bring to the department a careful habit of reading sources and a patient way of teaching them, and I would gladly teach the survey courses as well as my own field. I should be glad to discuss how the catalogue might serve its teaching of digital methods.\n\nYours faithfully,\nAda Lovelace';
      else out = 'Nothing.';
      if (onPiece) onPiece(out); return Promise.resolve(out); };
    const P = IngCareer.state().profile; P.name = 'Ada Lovelace';
    P.items.push({ id: 'it1', sec: 'teaching', title: 'Tutor in History', place: 'University of London', from: '2022', to: '2024', text: 'Taught 40 undergraduates in seminars of 12.', src: 'me' },
      { id: 'it2', sec: 'post', title: 'Research Assistant', place: 'Analytical Society', from: '2019', to: '2021', text: 'Catalogued 312 letters.', src: 'me' }); saveState();
  });
  const press = async (text, within) => { const bb = await p.evaluate(([text, within]) => { const root = document.querySelector(within || '#cs') || document;
      const k = [...root.querySelectorAll('button')].find(x => x.offsetParent && (x.textContent.trim() === text || (x.querySelector('b') && x.querySelector('b').textContent.trim() === text)));
      if (!k) return null; const r = k.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, [text, within || null]);
    if (!bb) throw new Error('no key: ' + text); await p.mouse.click(bb[0], bb[1]); await p.waitForTimeout(400); };
  const idle = () => p.waitForFunction(() => !IngCareer.run.busy, null, { timeout: 60000 });
  const still = () => p.evaluate(() => { const se = document.scrollingElement, m = document.querySelector('.main'); return (se.scrollHeight - se.clientHeight) + (m ? m.scrollHeight - m.clientHeight : 0); });
  // 6.8.12: each task has its way; these checks are of Do it for me
  await p.evaluate(() => { IngCareer.state().ui.way = 'auto'; go('career'); }); await p.waitForTimeout(900);

  // 1. the room key in hand: white on amethyst, still white under the pointer
  const tab = await p.evaluate(() => { const t = document.querySelector('#cs .rm-tab[aria-selected="true"]'); const r = t.getBoundingClientRect(); return { c: getComputedStyle(t).color, sp: getComputedStyle(t.querySelector('span')).color, svg: getComputedStyle(t.querySelector('svg')).color, x: r.left + r.width / 2, y: r.top + r.height / 2, t: t.textContent.trim() }; });
  ok(tab.t === 'Applications' && tab.c === 'rgb(255, 255, 255)' && tab.sp === 'rgb(255, 255, 255)' && tab.svg === 'rgb(255, 255, 255)', 'the room key in hand (Applications) reads white on its amethyst, its mark too', JSON.stringify(tab));
  await p.mouse.move(tab.x, tab.y); await p.waitForTimeout(350);
  ok(await p.evaluate(() => getComputedStyle(document.querySelector('#cs .rm-tab[aria-selected="true"]')).color) === 'rgb(255, 255, 255)', 'still white under the pointer');
  const other = await p.evaluate(() => getComputedStyle(document.querySelector('#cs .rm-tab[aria-selected="false"]')).color);
  ok(other !== 'rgb(255, 255, 255)', 'the other room keys keep their dark lettering', other);
  await p.screenshot({ path: OUT + '/tabs.png', clip: { x: 300, y: 120, width: 1140, height: 170 } });

  // 2. the four cards
  const cards = await p.evaluate(() => [...document.querySelectorAll('#cs .c-howk')].map(k => ({ t: k.querySelector('b').textContent, ex: k.getAttribute('aria-expanded'), anim: getComputedStyle(k.parentNode).animationName })));
  ok(cards.length === 4 && cards.every(c => c.ex === 'false') && cards.every(c => c.anim === 'cHowRise'), 'four cards, each a key, closed, rising into place', JSON.stringify(cards));
  const c2 = await p.evaluate(() => { const r = document.querySelectorAll('#cs .c-howk')[1].getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
  await p.mouse.move(c2[0], c2[1]); await p.waitForTimeout(450);
  const lift = await p.evaluate(() => getComputedStyle(document.querySelectorAll('#cs .c-how > li')[1]).transform);
  ok(/matrix\(1, 0, 0, 1, 0, -[1-3]/.test(lift), 'a card lifts under the pointer', lift);
  const at0 = await p.evaluate(() => { const r = document.querySelectorAll('#cs .c-how > li')[1].getBoundingClientRect(); return [Math.round(r.left), Math.round(r.width)]; });
  await p.mouse.click(c2[0], c2[1]); await p.waitForTimeout(500);
  const open = await p.evaluate(() => { const k = document.querySelectorAll('#cs .c-howk')[1], li = k.parentNode, d = document.getElementById(k.getAttribute('aria-controls')), r = li.getBoundingClientRect(), g = document.querySelector('#cs .c-how').getBoundingClientRect();
    return { ex: k.getAttribute('aria-expanded'), ringed: li.classList.contains('c-open'), at: [Math.round(r.left), Math.round(r.width)], below: d && Math.round(d.getBoundingClientRect().top) >= Math.round(g.bottom), wide: d && d.getBoundingClientRect().width > g.width * 0.95,
      head: d && d.querySelector('h3') ? d.querySelector('h3').textContent : '', items: d ? d.querySelectorAll('ul li').length : 0, key: d && d.querySelector('.c-btn') ? d.querySelector('.c-btn').textContent : '', vis: d && !d.hidden && d.offsetHeight > 40, more: k.querySelector('.c-howm').textContent, focus: document.activeElement === k,
      named: d && d.getAttribute('aria-labelledby') === k.id }; });
  ok(open.ex === 'true' && open.ringed && open.at.join() === at0.join() && open.below && open.wide && open.head === 'Bring an opportunity' && open.items === 5 && open.key === 'Bring a posting' && open.vis && open.more === 'Less' && open.focus && open.named,
    'pressed, Bring an opportunity stays where it is, ringed; beneath the four cards open five lines on what it does, and a key into it', JSON.stringify({ open, at0 }));
  ok(await still() === 0, 'the page does not scroll when a card opens');
  await p.screenshot({ path: OUT + '/card-open.png' });
  await p.mouse.click(c2[0], c2[1]); await p.waitForTimeout(400);
  ok(await p.evaluate(() => document.querySelectorAll('#cs .c-howk')[1].getAttribute('aria-expanded') === 'false' && !document.querySelector('#cs .c-how > li.c-open')), 'pressed again, it closes');
  await p.evaluate(() => document.querySelectorAll('#cs .c-howk')[2].focus()); await p.keyboard.press('Enter'); await p.waitForTimeout(400);
  const k3 = await p.evaluate(() => ({ ex: document.querySelectorAll('#cs .c-howk')[2].getAttribute('aria-expanded'), key: (document.querySelector('#csHowD .c-btn') || {}).textContent }));
  ok(k3.ex === 'true' && k3.key === 'How each is built', 'Enter opens a card too (Decide, then write, with its key to the lessons)', JSON.stringify(k3));
  await press('How each is built', '#csHowD');
  ok(await p.evaluate(() => IngCareer.state().ui.room === 'learn' && document.querySelector('#cs .rm-tab[aria-selected="true"]').textContent.trim() === 'Learn'), "the card's key goes where it says (Learn)");
  await press('Applications', '#cs .rm-tabs');

  // 3. limits read from the posting
  const lim = await p.evaluate(() => [IngCareer.limitsIn('Cover letters should be no more than 500 words.'), IngCareer.limitsIn('Please submit a CV (maximum two pages) and a personal statement of up to 1,000 words.'),
    IngCareer.limitsIn('The supporting statement (maximum 2 sides of A4) must address each criterion.'), IngCareer.limitsIn('We have 3,000 staff and 40 departments.'), IngCareer.limitFor('Send a statement, which should not exceed 750 words.', 'statement')].map(x => JSON.stringify(x)));
  ok(lim[0] === '{"cover":{"words":500}}' && lim[1] === '{"cv":{"pages":2},"statement":{"words":1000}}' && lim[2] === '{"supporting":{"pages":2}}' && lim[3] === '{}' && lim[4] === '{"words":750}',
    "a posting's limits are read from its own sentences, each with its document; a number that is not a limit is not taken for one", lim.join(' '));

  // 4. an application, read, and its letter written within the limit the posting sets
  await p.evaluate(post => IngCareer.newOpp('job', post, 'pasted'), POST); await p.waitForTimeout(500);
  await p.evaluate(() => IngCareer.read(IngCareer.state().opps[0])); await idle(); await p.waitForTimeout(300);
  await p.evaluate(() => IngCareer.write(IngCareer.state().opps[0], 'cover')); await idle(); await p.waitForTimeout(800);
  const ask1 = await p.evaluate(() => (window.__asks.filter(a => /Write my cover letter/.test(a.u)).pop() || {}).u || '');
  ok(/THE POSTING SETS A LIMIT of 120 words: stay within it, at about 110 words\./.test(ask1), 'the request to write the letter carries the limit the posting sets (120 words)', ask1.slice(0, 200));
  const pane = await p.evaluate(() => ({ count: (document.querySelector('#cs .c-count') || {}).textContent || '', cover: (document.querySelector('#cs .c-cover') || {}).textContent || '', keys: [...document.querySelectorAll('#cs .c-work .c-pn-f .c-btn')].map(x => x.textContent) }));
  ok(/^\d+ words, \d+ over the posting's limit of 120\./.test(pane.count), "the letter's length is shown against the posting's limit", pane.count);
  ok(/It speaks to 2 of 6 criteria/.test(pane.cover) && /Essential, not found in it: A PhD in history or a related field; Experience of building digital tools\./.test(pane.cover), 'which criteria it speaks to is shown, and the essential ones it does not', pane.cover);
  ok(pane.keys.join('|') === 'Improve it|Change it|Copy the text|Write it again|Open in Tabula|Save as PDF|Save as Word', 'its keys: Improve it first, then as before', pane.keys.join('|'));
  ok(await still() === 0, 'the page does not scroll with the letter open');
  await p.screenshot({ path: OUT + '/letter.png' });

  // 5. Improve it: the quick choices, her note, a new version, the version before kept
  const before = await p.evaluate(() => { const o = IngCareer.state().opps[0]; return o.docs.cover.ref; });
  await press('Improve it', '#cs .c-work .c-pn-f');
  const form = await p.evaluate(() => ({ box: !!document.querySelector('#cs .c-improve'), tunes: [...document.querySelectorAll('#cs .c-improve .c-tunes .c-btn')].map(x => x.textContent), foot: [...document.querySelectorAll('#cs .c-work .c-pn-f .c-btn')].map(x => x.textContent), focus: document.activeElement && document.activeElement.getAttribute('aria-label') }));
  ok(form.box && form.tunes.join('|') === 'Shorter|Warmer|More formal|Plainer words|Essential criteria first|Within the limit|The missing criteria' && form.foot.join('|') === 'Cancel|Improve it' && form.focus === 'What should change',
    'Improve it opens a note with quick choices (and, here, Within the limit and The missing criteria); the note has the focus', JSON.stringify(form));
  await press('Shorter', '#cs .c-improve'); await press('Within the limit', '#cs .c-improve');
  const note = await p.evaluate(() => document.querySelector('#cs .c-improve textarea').value);
  ok(/^Make it about a fifth shorter.*Bring it within the posting's limit of 120 words\.$/.test(note), 'the quick choices write themselves into the note, one after another', note);
  await p.screenshot({ path: OUT + '/improve.png' });
  await press('Improve it', '#cs .c-work .c-pn-f'); await idle(); await p.waitForTimeout(800);
  const ask2 = await p.evaluate(() => (window.__asks.filter(a => /revising a draft of mine/.test(a.s)).pop() || {}).u || '');
  ok(/^Revise my cover letter as I ask below, and change nothing else\.\nWHAT I ASK: Make it about a fifth shorter/.test(ask2) && /THE POSTING SETS A LIMIT of 120 words/.test(ask2) && /THE DRAFT:\nDear \[the reader's name\]/.test(ask2) && /Add no claim, skill, post, date, figure, name or source that THE PROFILE does not give/.test(ask2),
    'the request carries her note, the limit, the rule against anything the profile does not give, and the draft', ask2.slice(0, 300));
  ok(await p.evaluate(() => window.__asks.length && /examiner of a draft/.test(window.__asks[window.__asks.length - 1].s)), 'the improved draft is read a second time against her profile');
  const after = await p.evaluate(() => { const o = IngCareer.state().opps[0]; return { ref: o.docs.cover.ref, note: o.docs.cover.note, older: (o.older.cover || []).map(x => x.ref), count: (document.querySelector('#cs .c-count') || {}).textContent || '', back: !!([...document.querySelectorAll('#cs .c-count .c-btn')].find(x => x.textContent === 'The version before')) }; });
  ok(after.ref !== before && after.older[0] === before && /^Make it about a fifth shorter/.test(after.note) && after.back && /Last improved: “Make it about a fifth shorter/.test(after.count), 'a new version, the note it answered shown with it; the version before is kept, with a key to bring it back', JSON.stringify(after));
  ok(/^\d+ words, within the posting's limit of 120\./.test(after.count), 'the improved letter is within the limit', after.count);
  await press('The version before', '#cs .c-count');
  const back = await p.evaluate(() => { const o = IngCareer.state().opps[0]; return { ref: o.docs.cover.ref, older: (o.older.cover || []).map(x => x.ref) }; });
  ok(back.ref === before && back.older[0] === after.ref, 'The version before brings it back, and keeps the other one press away', JSON.stringify(back));
  ok(await still() === 0, 'the page still does not scroll');
  ok(errs.length === 0, 'no errors on the page', errs.slice(0, 3).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
