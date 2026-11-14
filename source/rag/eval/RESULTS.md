# The folder search: evaluation results (phase 5)

Her done criteria (31 October 2026), measured on 8 November 2026 by `rig/t_rag5_eval.js`; the judges are `rag/eval.js`, the
questions `rag/eval/golden.json` (20 items from the fixture corpus, which is invented). Each run's full report (`report.md`) lists
every flagged sentence; this page keeps the figures and what a person found on reading the flagged answers against the files.

How it was run, and where it differs from her setting:

- The built page in headless Chromium on Linux (4 processors, 16 GB), with `rag/` beside it and the desktop app's folder bridge
  standing in (`rig/rag_bridge.py`, the app's own folder functions behind HTTP). Folders are added through the app's folder dialog,
  not the browser's directory picker. Not yet run in the Mac's or Windows' own web view.
- The model answers through the chat's own connection path: an OpenAI-style server on this computer (llama.cpp b11321
  `llama-server`, context 8,192 tokens, thinking off, CPU). Runs 1 and 2: Qwen3.5 2B Q4_K_M, the model the Mac and Windows apps carry
  (Scriba). The evaluation does not use the reranker (off by default).
- Run 1: the 6.61 page (started 16:46 UTC). Run 2: the 6.63 page, which shows a reply that says the NOT_FOUND sentence and cites no
  passage given as exactly NOT_FOUND (started 18:02 UTC, after run 1's finding). Run 3: the 6.64 page (its citation reader no longer
  ends a sentence at a title or counts strains[7]) with Qwen3.5 9B Q4_K_M, the strongest model of Ingenium's lineup for a computer
  with 16 GB of memory (installed in the app, not carried; SHA-256 03b74727..., as the lineup pins it), started 20:58 UTC. Other tests
  ran on the same processors during parts of runs 1 and 3, so their minutes and seconds are slower; the memory figures count only the
  evaluation's own browser.

## The five criteria

| criterion | her threshold | run 1 (6.61 page, 2B) | run 2 (6.63 page, 2B) | run 3 (6.64 page, 9B) |
| --- | --- | --- | --- | --- |
| 1. Recall@5, file level | at least 0.8 | **18 of 20 (0.90)** | **18 of 20 (0.90)** | **18 of 20 (0.90)** |
| 2. groundedness: every sentence cited, every citation to a passage given | every answer | 10 of 20 answers | 10 of 20 answers | 16 of 20 answers |
| 2. unsupported claims (read by a person) | none (a blocker) | 2 | 3 | 1 |
| 3. ACL: retrieve() gives no chunk of the folder test-b may not read | none | **0 of 4 questions** | **0 of 4 questions** | **0 of 4 questions** |
| 3. ACL: end-to-end response equals NOT_FOUND | 4 of 4 | 3 of 4 | **4 of 4** | **4 of 4** |
| 4. memory, the whole corpus (72 files, 3,511 passages, the 4 MB logbook) | under 2 GB | **1,410 MB** (PSS 1,166 MB) | **1,410 MB** (PSS 1,132 MB) | **1,430 MB** (PSS 1,115 MB) |
| 5. reindex: one file added, one modified, one deleted, one reconcile | the index reflects each change; embedding calls equal new or changed chunks | **reflects; 3 calls, 3 passages** | **reflects; 3 calls, 3 passages** | **reflects; 3 calls, 3 passages** |

Recall@5 misses, both runs: H11 (a JSON ledger; the five passages are letters about the same ship) and L05 (an instrument log in CSV;
the passages include a notebook entry about the same night, from which the model answered in part). Memory: `ps` every 250 ms, the
resident memory (RSS) of the browser process and all its children added up (shared pages counted in each process, so an upper
bound), and the proportional share (PSS) from `/proc/<pid>/smaps_rollup` every second; reading took 41 minutes with one
reading-model worker. `performance.measureUserAgentSpecificMemory` needs cross-origin isolation, which the app does not have.

## Groundedness, read by a person

Most flagged answers state the fact in a first sentence without a citation and cite in the next ("This information is stated in
[1]"), or repeat it as "Answer: ..." without one; the fact itself is in the passage. The claims the passages do not support:

- Run 1, H09: "This occurred on Saturday 28th, 1781": the logbook says "Friday 28th", in a voyage that sailed in January 1802
  (a sentence without a citation, so it was flagged under the reply).
- Run 1, H08: the sentence is word for word in the chapter, but it cites [2], whose words it mostly does not share (0.1): the number
  points to the wrong passage.
- Run 2, H01: "the letter ... from Mr. Tobias Wren to Mr. Alexander Grieve": the letter is addressed to Wren, from Kingston.
- Run 2, H09: it gives Friday 28th the weather of Wednesday 26th and says the carpenter was killed on Saturday 29th, citing [2].
- Run 2, L05: "A porter named Tom came to investigate": the notebook says the porter phoned Tom, who came in.

- Run 3 (9B), H01: among the manifest's sugar shipments it lists "8 on 1784-02-11"; the passages it was given show 8 on 9 February
  and 31 on 10 February, and cotton on 11 February. Its answer (412 hogsheads, from the letter) is right and cited.

Run 3's other flags are of form, not substance: list lines ("- 214 letters") and an echoed context line or quotation without their
own citation (H03, H06, L07, R09); each fact is in the passage cited next to it.

Two flags came from the checker, not the model, and are corrected in 6.64 (`rig/t_rag5_prompt.mjs`): a title such as "Mr." ended a
sentence (run 2, H01's two fragments), and "strain[7]" in a quoted JSON line counted as a citation to passage 7 (L07, both runs).

With the model the apps carry (2B), criterion 2 is not met: half the answers leave a sentence without a citation, and in each run two
or three claims are wrong in a detail. With the 9B model, 16 of 20 answers are fully cited and one detail is wrong, so criterion 2 is
still not met to the letter. The page names the uncited sentences and the citations to no passage under each reply.

## The reranker (`rig/t_rag5_rerank.js`, 15 checks, on the 6.62 and 6.63 pages)

- The three folders without the 4 MB logbook (so H09 is left out): Recall@5 17 of 19 with it and 17 of 19 without it; the passage
  holding the answer first in 17 of the 17 found with it, 14 of 17 without it.
- A search took a median of 48 ms without it and 7.4 s with it (20 passages read by the cross-encoder on one processor thread, while
  other tests ran); the first search with it also loaded it (8 to 15 s).
- With it on, test-b still got no passage of household_papers; a copy of the app without its files keeps the fusion's order and says so
  under the reply.

## Run 4 (14 November 2026): the 7.06 page, Qwen3.5 2B, and the detail check (phase 6)

The same evaluation (`rig/t_rag5_eval.js`) on the 7.06 page, in headless Chromium on Linux (4 processors, 15 GB), llama.cpp built
from its public source that day, Qwen3.5 2B Q4_K_M (SHA-256 aaf42c8b..., as the lineup pins it), context 8,192, thinking off, CPU;
one reading-model worker. Started 18:35 UTC, 43.6 minutes.

| criterion | her threshold | run 4 (7.06 page, 2B) |
| --- | --- | --- |
| 1. Recall@5, file level | at least 0.8 | **18 of 20 (0.90)**; H11 and L05 missed, as before |
| 2. every sentence cited, every citation to a passage given | every answer | 15 of 20 answers, as the model gave them (the second pass of 6.65 asked again in 10 and kept the second answer in 6) |
| 3. ACL | none; 4 of 4 NOT_FOUND | **0 of 4 questions; 4 of 4 NOT_FOUND** |
| 4. memory, the whole corpus | under 2 GB | **1,465 MB** (PSS 1,110 MB), 35.4 minutes to read |
| 5. reindex | reflects; calls equal new or changed | **reflects; 3 calls, 3 passages** |

### The detail check (rag/prompt.js guard, 7.07, not yet used by the chat)

Each reply judged as the check would show it: a sentence must cite a passage that holds its exact details (numbers, dates,
weekdays, months, names, codes), standing together where they must (a table's row, two sentences of prose); a missing or wrong
citation is mended when one passage holds them all; what no passage supports is taken out; nothing left gives NOT_FOUND.

The first version, run inside the evaluation, took out five sentences, and four of them were true: they repeated details the
question gave ("on 18 June 2026", "the second quarter of 2026", "February 1784") or the passage's file name gave
("wages_roll_hester_1788"). It also mended a citation by deleting the "[2]" in "as stated in [2] as a debt", leaving no sentence.
So: what the question states is given, not claimed; a passage is its label too (folder, file, heading, page); a mark is renumbered
where it stands; a sentence whose every detail is the question's own is kept when it cites a passage; a name after a title (Mr.,
Capt.) is a name. Re-scored on run 4's stored answers (the passages as the report keeps them, up to 2,000 characters):

- every sentence cited and every citation to a passage given: **20 of 20** (15 of 20 before the check);
- answers naming the fact: 14 of 20, as before the check (none lost); NOT_FOUND: 1 (H11, the model's own);
- citations mended: 9 (among them H08's [2] to [1], the passage that holds the debt: the misattribution of run 1);
- taken out: 1, H12's echo of its passage's label (the stored passages lack the chunk number and page the label gives).

Read by a person against the passages, the checked answers hold one claim the check cannot see: H07's first sentence says the crew
petitioned "stating that the stewards sold part of the stores at Cork as the master has been a just man"; the petition says they
do not complain of the master, "who has been a just man, but of the steward, who sold part of the stores at Cork". A true detail
in a false relation; the sentence does not touch the question's answer (£3 15s 0d, cited). So with the 2B and the check, criterion
2's form is met in every answer, and one claim of relation remains for a person to see.

Tests: `rig/t_rag6_guard.mjs` 43/43 (the run's lessons among them), `rig/t_rag5_prompt.mjs` 15/15.

## Run 5 (14 November 2026): the 7.06 page, Qwen3.5 9B, on run 4's index

The same evaluation with `REUSE_INDEX=1` on a copy of run 4's browser profile (the corpus already read, so criterion 4 is run 4's),
Qwen3.5 9B Q4_K_M (SHA-256 03b74727..., as the lineup pins it), llama.cpp, context 8,192, thinking off, CPU. 29.0 minutes.

| criterion | her threshold | run 5 (9B) |
| --- | --- | --- |
| 1. Recall@5 | at least 0.8 | **18 of 20 (0.90)** |
| 2. every sentence cited, every citation to a passage given | every answer | **20 of 20 answers**, as the model gave them (the second pass asked again in 9 and kept the second answer each time) |
| 3. ACL | none; 4 of 4 NOT_FOUND | **0 of 4; 4 of 4 NOT_FOUND** |
| 5. reindex | reflects; calls equal new or changed | **reflects; 3 calls, 3 passages** |

With the detail check: 20 of 20, nothing taken out, one citation mended (L01's [4] to [1]: all five passages are from the protocol, and [1] is the one that holds
24.5 °C and 72 hours together); 15 answers name the fact, as before. The evaluation's own word-share flag listed four sentences to read (H07, L01, L08, R01):
each states its passage's figure; they are paraphrases, not inventions.

Read by a person, one claim the passages do not support: L05 adds "Incubator B was checked before a run and showed no drift against
the reference"; the notebook says it of the laminar flow cabinet. Every word is in the passage; the subject is carried in from another
sentence. A stricter rule tried that day (each name must stand where the rest of the sentence comes from) took out true sentences
(a strain's code and its origin stand on different lines of the registry) and still missed this one (the notebook's title names
Incubator B), so it was not kept. With the 9B and the check, criterion 2's form is met in every answer, and one subject slip remains
for a person to see; with the 2B, one relation.
