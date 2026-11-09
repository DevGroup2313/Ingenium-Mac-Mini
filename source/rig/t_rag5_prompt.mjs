// Folder search: the citation reader of rag/prompt.js (pure functions), checked on the replies the evaluation's model gave
// (rig/t_rag5_eval.js, 8 November 2026; the fixture corpus is invented). Run: node rig/t_rag5_prompt.mjs
import * as P from '../rag/prompt.js';
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d) : '')); c ? pass++ : fail++; };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// citations
ok(same(P.citations('[1] [2, 3] [4-6] [1][2] [7](http://x)').map((c) => c.n), [1, 2, 3, 4, 5, 6, 1, 2]), 'citations: single, list, range, side by side; a Markdown link is not one');
ok(same(P.citations('strains[7].strain: FX-208 and x[2] but [3]').map((c) => c.n), [3]), 'a bracket joined to a word before it is an index, not a citation (6.64)');

// sentences: titles and short forms do not end a sentence (6.64)
ok(same(P.sentences('The letter from Mr. Tobias Wren reached Dr. Hale [1]. It was answered [2].').map((s) => s.text),
  ['The letter from Mr. Tobias Wren reached Dr. Hale [1].', 'It was answered [2].']), 'Mr. and Dr. do not end a sentence');
ok(same(P.sentences('It is in St. James, No. 7 [1]. Capt. Pryce sailed [2].').map((s) => s.text), ['It is in St. James, No. 7 [1].', 'Capt. Pryce sailed [2].']), 'St., No. and Capt. do not end a sentence');
ok(same(P.sentences('It ends here. Then it goes on [1].').map((s) => s.text), ['It ends here.', 'Then it goes on [1].']), 'an ordinary full stop still ends a sentence');
ok(same(P.sentences('Two years. [1] The next one [2].').map((s) => s.cites), [[1], [2]]), 'marks after a full stop belong to the sentence before');

// checkGrounded on the evaluation's replies
const h01 = 'From the provided context, specifically from the letter dated 2nd March 1784 from Mr. Tobias Wren to Mr. Alexander Grieve, it is stated that the Mary Ann cleared Kingston on the 14th of February with **412 hogsheads of sugar**.\n\n[3]';
ok(P.checkGrounded(h01, 5).ok, 'H01 (second run): one sentence, cited by the [3] after it, nothing flagged', P.checkGrounded(h01, 5).flagged);
const l07 = 'strain FX-208 was isolated from beech litter at Hayley Wood.\n\nThis information is found in the context [4], where strain[7] with strain name FX-208 is listed with the origin "Isolated from beech litter at Hayley Wood". [4]';
const c7 = P.checkGrounded(l07, 5);
ok(!c7.ok && same(c7.badRefs, []) && same(c7.flagged, ['strain FX-208 was isolated from beech litter at Hayley Wood.']), 'L07 (second run): strain[7] is no citation; the first sentence is still flagged', c7);
const r01 = 'The buildings sum insured is £385,000.\n\nThis information is stated in the policy schedule at [1].';
ok(same(P.checkGrounded(r01, 5).flagged, ['The buildings sum insured is £385,000.']), 'R01 (first run): the fact without a citation is flagged');
ok(same(P.checkGrounded('It is in [9].', 5).badRefs, [9]), 'a citation to no passage given is named');

// NOT_FOUND
ok(P.isNotFound('"I could not find that in the selected folders."') && P.isNotFound('*I could not find that in the selected folders* [1]'), 'the sentence in quotes or emphasis is NOT_FOUND');
const r01b = 'The provided text does not contain the answer to this question. It discusses insurance policies, rates, and the importance of insurance in the 18th century, but it does not specify the actual sum insured on a specific home insurance policy.\n\nI could not find that in the selected folders.';
ok(P.declaresNotFound(r01b, 5), 'R01 for test-b (first run): an explanation, then the sentence, no citation: NOT_FOUND (6.63)');
const h11 = 'I could not find that in the selected folders.\n\nThe provided context contains letters from Mr. Josiah Hollis to Sir William Wren dated 14 September 1795, which discuss the Providence ship\'s accounts.';
ok(P.declaresNotFound(h11, 5), 'H11 (first run): the sentence, then an explanation, no citation: NOT_FOUND');
const h03 = 'The ship Hester cost £2,140 to build. This is stated in the document [1].\n\nI could not find that in the selected folders.';
ok(!P.declaresNotFound(h03, 5), 'H03 (second run): a cited answer that also says the sentence stays an answer');
ok(P.declaresNotFound('I could not find that in the selected folders. It may be in [9].', 5), 'a citation to no passage given does not make it an answer');

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
