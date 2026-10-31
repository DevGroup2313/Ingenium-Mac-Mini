# The folder search's test corpus

Written by `rag/tools/make_fixtures.py` (run it again to rewrite every file byte for byte). 72 files in three folders:

- `historian_archive/`: 28 files (csv, docx, html, json, md, pdf, txt)
- `lab_notes/`: 24 files (csv, docx, html, json, md, pdf, txt)
- `household_papers/`: 20 files (csv, docx, html, json, md, pdf, txt)

`FACTS.json` lists 37 facts, each stated in exactly one file; `household_papers` is the folder whose facts exist only there (the permissions test). `MANIFEST.json` lists every file with its size and SHA-256. The people, firms and figures are invented.
