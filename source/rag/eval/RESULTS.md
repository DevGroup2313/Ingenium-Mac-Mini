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
  passage given as exactly NOT_FOUND (started 18:02 UTC, after run 1's finding). Other tests ran on the same processors during parts of run 1, so its
  minutes are slower; the memory figures count only the evaluation's own browser.

## The five criteria

| criterion | her threshold | run 1 (6.61 page) | run 2 (6.63 page) |
| --- | --- | --- | --- |
| 1. Recall@5, file level | at least 0.8 | **18 of 20 (0.90)** | **18 of 20 (0.90)** |
| 2. groundedness: every sentence cited, every citation to a passage given | every answer | 10 of 20 answers | 10 of 20 answers |
| 2. unsupported claims (read by a person) | none (a blocker) | 2 | 3 |
| 3. ACL: retrieve() gives no chunk of the folder test-b may not read | none | **0 of 4 questions** | **0 of 4 questions** |
| 3. ACL: end-to-end response equals NOT_FOUND | 4 of 4 | 3 of 4 | **4 of 4** |
| 4. memory, the whole corpus (72 files, 3,511 passages, the 4 MB logbook) | under 2 GB | **1,410 MB** (PSS 1,166 MB) | **1,410 MB** (PSS 1,132 MB) |
| 5. reindex: one file added, one modified, one deleted, one reconcile | the index reflects each change; embedding calls equal new or changed chunks | **reflects; 3 calls, 3 passages** | **reflects; 3 calls, 3 passages** |

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

Two flags came from the checker, not the model, and are corrected in 6.64 (`rig/t_rag5_prompt.mjs`): a title such as "Mr." ended a
sentence (run 2, H01's two fragments), and "strain[7]" in a quoted JSON line counted as a citation to passage 7 (L07, both runs).

With the model the apps carry, criterion 2 is not met: half the answers leave a sentence without a citation, and in each run two or
three claims are wrong in a detail. The page names the uncited sentences and the citations to no passage under each reply.

## The reranker (`rig/t_rag5_rerank.js`, 15 checks, on the 6.62 and 6.63 pages)

- The three folders without the 4 MB logbook (so H09 is left out): Recall@5 17 of 19 with it and 17 of 19 without it; the passage
  holding the answer first in 17 of the 17 found with it, 14 of 17 without it.
- A search took a median of 48 ms without it and 7.4 s with it (20 passages read by the cross-encoder on one processor thread, while
  other tests ran); the first search with it also loaded it (8 to 15 s).
- With it on, test-b still got no passage of household_papers; a copy of the app without its files keeps the fusion's order and says so
  under the reply.
