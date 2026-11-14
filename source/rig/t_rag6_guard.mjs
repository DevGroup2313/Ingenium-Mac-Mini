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
const d3 = P.details('The letter is from Mr. Tobias Wren to Capt. Carew.');
ok(d3.names.includes('tobias') && d3.names.includes('carew'), 'details: a name after a title (Mr., Capt.) is a name', d3);

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
// what the 2B's answers of 14 November 2026 taught (the 7.06 page): the question's own details, the passage's label, a mark mid-sentence
const P_Q2 = { folder: 'lab_notes', file: 'reports/quarterly_report.pdf', text: 'Consumables. Spending on consumables in the quarter came to £14,206.50, which is 8% under the budget set in January.' };
const g14 = P.guard('The lab spent £14,206.50 on consumables in the second quarter of 2026, which is 8% under budget [1].', [P_Q2], 'What did the lab spend on consumables in the second quarter of 2026?');
ok(g14.ok && g14.kept === 1 && !g14.removed.length, 'guard: a year the question states is given, not claimed (L08)', g14);
const g14b = P.guard('The lab spent £14,206.50 on consumables in the second quarter of 2026, which is 8% under budget [1].', [P_Q2]);
ok(g14b.notFound, 'guard: without the question, 2026 is a claim its passage lacks', g14b);
const P_WAGES = { folder: 'historian_archive', file: 'ledgers/wages_roll_hester_1788.csv', text: 'Name,Rank,Monthly wage,Signed\nSilas Pennock,Boatswain,£3 15s 0d,S. Pennock\nJohn Ide,Cook,£2 10s 0d,J. Ide\nAmos Webb,Carpenter,£3 5s 0d,A. Webb\nPeter Lusk,Seaman,£1 15s 0d,P. Lusk' };
const g15 = P.guard('Pennock is listed in the wages roll of the Hester for 1788 [1].', [P_WAGES]);
ok(g15.ok && g15.kept === 1 && !g15.repaired.length, 'guard: a passage is its label too: the ship and the year are in its file name (H07)', g15);
const g16 = P.guard('The firm owed Joaquim da Cunha £1,386 11s 4d, which is stated in [2] as a debt not to be cleared before the next vintage.', [{ folder: 'historian_archive', file: 'chapters/chapter3_the_cooper_trade.docx', text: 'By the winter of 1790 the firm owed the Lisbon wine merchant Joaquim da Cunha £1,386 11s 4d, a debt Hollis privately thought could not be cleared before the next vintage.' }, P_LETTER]);
ok(g16.ok && /stated in \[1\] as a debt/.test(g16.text) && g16.repaired.length === 1, 'guard: a wrong mark mid-sentence is renumbered where it stands (H08)', g16.text);
const P_MEET = { folder: 'lab_notes', file: 'meetings/lab_meeting_2026-06-18.html', text: 'Second centrifuge. After the demonstrations the group chose the Hettich Rotanta 460, quoted at £6,480 plus VAT.' };
const g17 = P.guard('The lab decided to buy the Hettich Rotanta 460, quoted at £6,480 plus VAT [1]. This decision was made on 18 June 2026. [1]', [P_MEET], 'Which second centrifuge did the lab decide to buy on 18 June 2026, and at what price?');
ok(g17.ok && g17.kept === 2 && !g17.removed.length, 'guard: a sentence that only repeats the question\'s date, cited, is kept (L11)', g17);

const P_NB = { folder: 'lab_notes', file: 'notebook/2026-05-17_incubator_alarm.txt', text: F('lab_notes/notebook/2026-05-17_incubator_alarm.txt') };
const g18 = P.guard('Tom was contacted by the porter and came in at once [1]. Additionally, Incubator B was checked before a run and showed no drift against the reference [1].', [P_NB], 'What happened to Incubator B on the night of 17 May 2026?');
// what the check cannot see (the 9B, 14 November 2026): every word of the second sentence is in the passage, but the notebook says it
// of the laminar flow cabinet. A name carried into the wrong sentence is left for a person to read: a stricter rule took out true
// sentences ("Strain FX-208 was isolated from ...", whose code and origin stand on different lines of the registry).
ok(g18.kept === 2 && !g18.removed.length, 'guard: a subject carried in from another sentence is NOT seen (its limit, kept on record)', g18);
const g19 = P.guard('The overnight alarm on Incubator B went off at about three in the morning [1]. The laminar flow cabinet was checked before the run and showed no drift against the reference [1].', [P_NB]);
ok(g19.ok && g19.kept === 2 && !g19.removed.length, 'guard: the same sentences, true to their passage, are kept', g19);

const g20 = P.guard('The Mary Ann cleared Kingston with 412 hogsheads of sugar [1]. This part comes from nowhere in particular. It is also in [9].', [P_LETTER]);
ok(g20.ok && g20.kept === 1 && g20.removed.length === 2 && !g20.repaired.length && !/\[9\]|nowhere/.test(g20.text), 'guard: a sentence of no content citing no passage given is taken out, never mended', g20);

// every kept reply passes the grounding check
for (const [k, g] of Object.entries({ g1, g2, g3, g4, g6, g7, g8, g10, g12, g13, g14, g15, g16, g17, g19 })) ok(P.checkGrounded(g.text, 2).ok, 'guard: ' + k + '\'s reply passes checkGrounded', g.text);

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
