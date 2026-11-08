// INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
// NO LICENCE IS GRANTED. See LICENCE.txt.
//
// The folder search's evaluation, phase 5 (rag/DESIGN.md section 12). Pure functions: the runner (rig/t_rag5_eval.js) asks the page
// for passages and answers, and these judge them. Her done criteria (31 October 2026):
//   1. Recall@5 of at least 0.8 on 15 to 20 question, answer and source triples drawn from the fixture corpus (rag/eval/golden.json)
//   2. Groundedness: every sentence in each answer carries a citation, and every citation points to a retrieved chunk; flagged
//      sentences listed; an unsupported claim is a blocker
//   3. ACL: user B lacks access to folder X and asks a question answerable only from X: retrieve() returns no chunk from X, and the
//      end-to-end response equals NOT_FOUND
//   4. Memory: the whole corpus indexed, the 4 MB files included, peak under 2 GB (measured by the runner)
//   5. Reindex: one file added, one modified, one deleted, one reconcile; the index reflects each change and the embedding calls equal
//      the new or changed chunks only (measured by the runner)
//
//   recall(golden, results, k)       -> {n, fileHits, needleHits, fileRecall, needleRecall, items: [{id, fileRank, needleRank}]}
//   grounded(answer, passages, opts)  -> checkGrounded's {ok, notFound, flagged, badRefs, cited} with `unsupported`: the cited
//                                        sentences whose words are mostly not in the passages they cite (to be read by a person)
//   aclClean(passages, folderName)   -> true when no passage comes from that folder
//   answerHas(answer, item)          -> the answer names the item's key facts (its numbers and its needle's rarer words)
//   markdown(report)                 -> the report as plain Markdown

import { checkGrounded, isNotFound, NOT_FOUND } from './prompt.js';

export const K = 5;
export { NOT_FOUND };

const pathOf = (p) => String(p.filePath != null ? p.filePath : p.file != null ? p.file : '');
const folderOf = (p) => String(p.folderName != null ? p.folderName : p.folder != null ? p.folder : '');

/** Recall@k. results: {[item id]: passages, best first}. A file hit: a passage of the item's source file among the first k (her
 *  criterion, "answer and source triples"); a needle hit, stricter: that passage holds the item's needle. */
export function recall(golden, results, k = K) {
  const items = (golden.items || golden).map((it) => {
    const ps = (results[it.id] || []).slice(0, k);
    let fileRank = null, needleRank = null;
    ps.forEach((p, i) => {
      const same = folderOf(p) === it.source.folder && pathOf(p) === it.source.file;
      if (same && fileRank === null) fileRank = i + 1;
      if (same && needleRank === null && String(p.text || '').indexOf(it.needle) >= 0) needleRank = i + 1;
    });
    return { id: it.id, fileRank, needleRank };
  });
  const n = items.length, fileHits = items.filter((x) => x.fileRank).length, needleHits = items.filter((x) => x.needleRank).length;
  return { n, k, fileHits, needleHits, fileRecall: n ? fileHits / n : 0, needleRecall: n ? needleHits / n : 0, items };
}

const STOP = new Set(('the and for are was were with that this from have has had not but its into they them their there which what when '
  + 'where who whom whose how than then also been being per our your you she her his him its it is in on at by of to as an a or be '
  + 'about after before over under between during each any all some more most such only same other these those very can could would '
  + 'should may might must will shall do does did done so if no nor too up out off again further once here why both few own just now '
  + 'answer folder folders passage passages says say said according context source sources').split(' '));
// a word's plain form, so that "baked" finds "bake" and "hours" finds "hour"
const stem = (w) => w.replace(/(?:ies)$/, 'y').replace(/(?:es|s|ed|ing|ly)$/, '');
const words = (s) => (String(s).toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}.,'£$%-]*[\p{L}\p{N}%]|[\p{L}\p{N}]/gu) || [])
  .map((w) => w.replace(/[.,]$/, '')).filter((w) => (w.length > 2 || /\d/.test(w)) && !STOP.has(w)).map(stem);

/** Groundedness of one answer, given the passages the model was given ([1] to [n], in order). The citation rules are checkGrounded's
 *  (rag/prompt.js); then each cited sentence's own words are looked for in the passages it cites: a sentence whose share is below
 *  opts.minShare (0.6) is listed as `unsupported`, for a person to read (a fair paraphrase can fall below it; an invention does). */
export function grounded(answer, passages, opts = {}) {
  const c = checkGrounded(answer, passages.length);
  if (c.notFound) return Object.assign({}, c, { unsupported: [] });
  const min = opts.minShare == null ? 0.6 : opts.minShare, unsupported = [];
  for (const s of c.sentences) {
    if (s.lead) continue;
    const cites = s.cites.filter((n) => n >= 1 && n <= passages.length);
    if (!cites.length) continue;
    const ws = words(s.text.replace(/\[[^\]]*\]/g, ' '));
    if (!ws.length) continue;
    const pool = new Set(words(cites.map((n) => passages[n - 1].text || '').join(' ')));
    const share = ws.filter((w) => pool.has(w)).length / ws.length;
    if (share < min) unsupported.push({ text: s.text, share: Math.round(share * 100) / 100, cites });
  }
  return Object.assign({}, c, { unsupported, ok: c.ok && !unsupported.length });
}

/** True when no passage comes from the folder named. */
export function aclClean(passages, folderName) { return (passages || []).every((p) => folderOf(p) !== folderName); }

/** Does the answer name the item's key facts? Its numbers (all of them) and, when it has no number, most of its rarer words. */
export function answerHas(answer, item) {
  const a = String(answer || '').toLowerCase().replace(/,(?=\d{3}\b)/g, '');
  const nums = (String(item.answer).match(/\d+(?:[.,]\d+)?/g) || []).map((x) => x.replace(/,(?=\d{3}\b)/g, ''));
  if (nums.length) return nums.every((x) => a.indexOf(x.toLowerCase()) >= 0);
  const ws = words(item.answer), have = new Set(words(answer));
  return ws.length ? ws.filter((w) => have.has(w)).length / ws.length >= 0.6 : false;
}

export function markdown(r) {
  const L = [];
  L.push('# The folder search: evaluation', '', 'Run ' + r.when + ' (' + r.where + ').', '');
  if (r.recall) {
    L.push('## 1. Recall@' + r.recall.k, '', '- File level (her criterion): **' + r.recall.fileHits + ' of ' + r.recall.n + ' (' + r.recall.fileRecall.toFixed(2) + ')**', '- The passage holding the answer: ' + r.recall.needleHits + ' of ' + r.recall.n + ' (' + r.recall.needleRecall.toFixed(2) + ')', '');
    L.push('| item | file rank | answer rank |', '| --- | --- | --- |');
    r.recall.items.forEach((x) => L.push('| ' + x.id + ' | ' + (x.fileRank || 'not in the five') + ' | ' + (x.needleRank || 'not in the five') + ' |'));
    L.push('');
  }
  if (r.grounded) {
    const g = r.grounded;
    L.push('## 2. Groundedness', '', 'Model: ' + g.model + '. Answers: ' + g.items.length + '; every sentence cited and every citation to a passage given: **' + g.items.filter((x) => x.cited).length + ' of ' + g.items.length + '**; NOT_FOUND answers: ' + g.items.filter((x) => x.notFound).length + '; answers naming the fact: ' + g.items.filter((x) => x.correct).length + '.', '');
    g.items.forEach((x) => {
      if (!x.flagged.length && !x.badRefs.length && !x.unsupported.length) return;
      L.push('- ' + x.id + (x.flagged.length ? ': without a citation: ' + x.flagged.map((s) => '"' + s + '"').join('; ') : '') + (x.badRefs.length ? '; cites passages not given: ' + x.badRefs.map((n) => '[' + n + ']').join(', ') : '') + (x.unsupported.length ? '; to read (few of its words in its passage): ' + x.unsupported.map((s) => '"' + s.text + '" (' + s.share + ')').join('; ') : ''));
    });
    L.push('');
  }
  if (r.acl) L.push('## 3. ACL', '', '- retrieve() for ' + r.acl.user + ', who may not read ' + r.acl.folder + ': passages from it in ' + r.acl.leaks + ' of ' + r.acl.n + ' questions (and in the two searches: ' + r.acl.searchLeaks + ')', '- End to end: ' + r.acl.e2eNotFound + ' of ' + r.acl.n + ' responses equal NOT_FOUND' + (r.acl.e2eOther.length ? '; the others: ' + r.acl.e2eOther.map((s) => '"' + s.slice(0, 160) + '"').join('; ') : ''), '');
  if (r.memory) L.push('## 4. Memory', '', '- The whole corpus (' + r.memory.files + ' files, ' + r.memory.passages + ' passages, the 4 MB logbook included) read in ' + r.memory.minutes + ' minutes with ' + r.memory.workers + ' reading-model worker(s).', '- Peak, the resident memory (RSS) of every Chromium process added up, sampled every 250 ms: **' + r.memory.peakMB + ' MB**; proportional (PSS, shared pages counted once): ' + r.memory.pssMB + ' MB. Method: ' + r.memory.method, '');
  if (r.reindex) L.push('## 5. Reindex', '', '- One file added, one modified, one deleted, one reconcile: ' + (r.reindex.reflects ? 'the index reflects each change' : 'the index does NOT reflect each change') + '; embedding calls ' + r.reindex.calls + ', new or changed passages ' + r.reindex.fresh + (r.reindex.calls === r.reindex.fresh ? ' (equal)' : ' (NOT equal)') + '.', '');
  return L.join('\n');
}

export default { K, recall, grounded, aclClean, answerHas, markdown, NOT_FOUND, isNotFound };
