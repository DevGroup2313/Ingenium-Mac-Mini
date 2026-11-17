# Fabrica's runs on her other computers, stage 2 (the page's side): drafts, not applied yet

Written on 17 November 2026 against the 7.29 modules, as the approved phase 3 preview has it (source/previews/fabrica_p3: MACHINES,
machines(), runSheet()). Both scripts were dry-run on copies (they apply, and the scripts parse); nothing was tested in a browser yet.
    python3 -I patch_r274.py source/build/modules    # pairing a computer that runs jobs; IngLend.request; the Settings switch
    python3 -I patch_r298.py source/build/modules    # the calls to another computer, the list, Machines, the run sheet, kept copies
The test to write: two computer apps in this container (rig/run_app.py with HOME in two folders; rig/bridge.js gives the page the
first one's functions), the second with share_runs_set(true); the page pairs with it (IngLend.pair), runs a workflow there ("Only on"),
follows its log and file, and keeps a copy here; and a browser with no computer app sends a run too.
