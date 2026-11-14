// Folder search, phase 6 (7.07): the detail check and the guard of rag/prompt.js (pure functions), on passages of the invented fixture
// corpus and on the kinds of reply the evaluation's models gave (rag/eval/RESULTS.md). Run: node rig/t_rag6_guard.mjs
import * as P from '../rag/prompt.js';
import fs from 'fs';
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
const F = (p) => fs.readFileSync(new URL('../rag/fixtures/' + p, import.meta.url), 'utf8');
const letter = F('historian_archive/letters/1784-03-02_grieve_to_wren.txt');
const P_LETTER = { folder: 'historian_archive', file: 'letters/1784-03-02_grieve_to_wren.txt', text: letter.slice(0, 1400) };
const P_LETTER_END = { folder: 'historian_archive', file: 'letters/1784-03-02_grieve_to_wren.txt', text: letter.slice(-900) };
const log = F('historian_archive/logbook/ship_logbooks_1781-1802.txt').split('\n');
const i28 = log.findIndex((l) => /Daniel Roke/.test(l));
const P_LOG = { folder: 'historian_archive', file: 'logbook/ship_logbooks_1781-1802.txt', text: log.slice(i28 - 10, i28 + 3).join('\n') };
const csv = F('historian_archive/ledgers/cargo_manifest_maryann_1784.csv').split('\n');
const P_CSV = { folder: 'historian_archive', file: 'ledgers/cargo_manifest_maryann_1784.csv', text: csv.slice(0, 14).join('\n') };
const reg = JSON.parse(F('lab_notes/data/strain_registry.json'));
const fx = reg.strains.find((s) => s.strain === 'FX-208');
const P_REG = { folder: 'lab_notes', file: 'data/strain_registry.json', text: JSON.stringify(reg.strains.slice(4, 9), null, 1) };

// details
const d1 = P.details('The Mary Ann cleared Kingston on the 14th of February with 412 hogsheads of sugar [1].');
ok(d1.nums.includes('14') && d1.nums.includes('412') && d1.cal.includes('february') && d1.names.includes('mary') && d1.names.includes('kingston') && !d1.nums.includes('1'), 'details: numbers, ordinals, months and names; a citation is no number', d1);
const d2 = P.details('It cost £2,140 and three masts, on 1784-02-11.');
ok(d2.nums.includes('2140') && d2.nums.includes('3') && d2.nums.includes('1784') && d2.nums.includes('11') && d2.cal.includes('february'), 'details: thousands joined, number words as digits, an ISO date read out', d2);
ok(P.details('Strain FX-208 came from Hayley Wood.').codes.includes('fx-208'), 'details: a code such as FX-208');

// supports
ok(P.supports(P_LETTER, 'The Mary Ann cleared Kingston on the 14th of February with 412 hogsheads of sugar.').ok, 'supports: the letter holds the sugar and its date');
ok(!P.supports(P_LETTER, 'The Mary Ann carried 421 hogsheads of sugar.').ok, 'supports: 421 is not 412');
ok(!P.supports(P_LOG, 'The carpenter Daniel Roke was killed on Saturday 28th, 1781.').ok, 'supports: Saturday and 1781 are not in the logbook\'s entry (it says Friday 28th)', P.supports(P_LOG, 'The carpenter Daniel Roke was killed on Saturday 28th, 1781.'));
ok(P.supports(P_LOG, 'The carpenter, Daniel Roke, fell from the fore-topsail yard on Friday 28th and was killed.').ok, 'supports: the true entry');
ok(!P.supports(P_CSV, 'The manifest lists 22 puncheons of rum on 1784-02-11.').ok, 'supports: in a table, 22 and 11 February must stand on one row (22 is the 9th)', P.supports(P_CSV, 'The manifest lists 22 puncheons of rum on 1784-02-11.'));
ok(P.supports(P_CSV, 'The manifest lists 22 puncheons of rum on 9 February 1784.').ok, 'supports: the true row');
ok(!P.supports(P_LETTER, 'The letter is from Mr. Tobias Wren to Mr. Alexander Grieve.').ok, 'supports: "Alexander" is not in the letter (it is signed Alex. Grieve)');

// guard
const g1 = P.guard('The Mary Ann cleared Kingston on the 14th of February with 412 hogsheads of sugar [1].', [P_LETTER]);
ok(!g1.notFound && g1.ok && g1.kept === 1 && !g1.removed.length && /412 hogsheads of sugar \[1\]\.$/.test(g1.text), 'guard: a cited, supported sentence is kept as it is', g1);
const g2 = P.guard('The buildings of the ship are fine. The Mary Ann cleared Kingston on the 14th of February with 412 hogsheads of sugar.\n\nThis information is stated in [1].', [P_LETTER]);
ok(!g2.notFound && g2.ok && g2.repaired.length === 1 && /412 hogsheads of sugar \[1\]\./.test(g2.text) && g2.removed.some((r) => /buildings/.test(r.text)), 'guard: the fact without a citation is cited [1]; a sentence no passage holds is taken out', g2);
const g3 = P.guard('Daniel Roke, the carpenter, fell from the fore-topsail yard and was killed [1]. This occurred on Saturday 28th, 1781 [1].', [P_LOG]);
ok(!g3.notFound && g3.kept === 1 && g3.removed.length === 1 && /Saturday/.test(g3.removed[0].text) && !/Saturday/.test(g3.text), 'guard: H09 (run 1): the wrong day and year are taken out, the true sentence stays', g3);
const g4 = P.guard('The manifest lists 8 puncheons of rum on 1784-02-08 [2].', [P_LETTER, P_CSV]);
ok(g4.ok && g4.kept === 1 && !g4.repaired.length, 'guard: a row read right, cited right, is kept', g4);
const g5 = P.guard('The manifest lists 8 puncheons of rum on 1784-02-11 [2].', [P_LETTER, P_CSV]);
ok(g5.notFound && g5.removed.length === 1, 'guard: H01 (run 3, 9B): a number put on the wrong date is taken out; nothing left gives NOT_FOUND', g5);
const g6 = P.guard('Strain FX-208 was isolated from beech litter at Hayley Wood [2].', [P_LETTER, P_REG]);
ok(fx && /beech litter/.test(fx.origin) && g6.ok && g6.kept === 1, 'guard: L07: the registry\'s strain, cited right', g6);
const g7 = P.guard('Strain FX-208 was isolated from beech litter at Hayley Wood [1].', [P_LETTER, P_REG]);
ok(g7.ok && g7.repaired.length === 1 && g7.repaired[0].to === 2 && /\[2\]\.$/.test(g7.text), 'guard: a citation to the wrong passage is pointed to the one that holds it (H08\'s kind)', g7);
const g8 = P.guard('Here is what I found:\n- 412 hogsheads of sugar [1]\n- 38 puncheons of rum [1]\n- 900 casks of coffee [1]', [P_LETTER]);
ok(g8.ok && g8.kept === 2 && g8.removed.length === 1 && /coffee/.test(g8.removed[0].text) && /^Here is what I found:/.test(g8.text) && g8.text.split('\n').length === 3, 'guard: a list keeps its form; the line no passage holds is taken out', g8);
const g9 = P.guard('I could not find that in the selected folders.', [P_LETTER]);
ok(g9.notFound && g9.text === P.NOT_FOUND, 'guard: NOT_FOUND stays NOT_FOUND');
const g10 = P.guard('The Mary Ann cleared Kingston with 412 hogsheads of sugar.\n\n[1]', [P_LETTER]);
ok(g10.ok && g10.kept === 1 && !g10.repaired.length && /sugar\. \[1\]$/.test(g10.text), 'guard: a mark on the next line belongs to the sentence before (H01, run 2)', g10);
const g11 = P.guard('The ship sank with all hands in 1790 [1].', [P_LETTER]);
ok(g11.notFound && g11.removed.length === 1, 'guard: a cited sentence its passage does not hold is taken out', g11);
const g12 = P.guard('Capt. Carew was well satisfied with the stowage [1]. The rum is of the usual proof [1].', [P_LETTER]);
ok(g12.ok && g12.kept === 2 && !g12.removed.length, 'guard: a title (Capt.) does not end a sentence; two supported sentences stay', g12);
const g13 = P.guard('The letter is from Mr. Tobias Wren to Mr. Alexander Grieve [1]. The Mary Ann carried 412 hogsheads of sugar [1].', [P_LETTER, P_LETTER_END]);
ok(g13.ok && g13.kept === 1 && g13.removed.length === 1 && /Alexander/.test(g13.removed[0].text), 'guard: H01 (run 2): the name the letter does not have is taken out', g13);
// every kept reply passes the grounding check
for (const [k, g] of Object.entries({ g1, g2, g3, g4, g6, g7, g8, g10, g12, g13 })) ok(P.checkGrounded(g.text, 2).ok, 'guard: ' + k + '\'s reply passes checkGrounded', g.text);

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
