# Fabrica, phase 3: every device, your own machines, and learning as you go (14 November 2026), a preview first

Her words (14 November 2026): "Please continue working on expanding the Fabrica page and continue with the rest of my requests please
... I want to focus on deepening and expanding Fabrica and its capabilities and making it my own personal GitHub inside of Ingenium. I
want full and exact parity with GitHub please." With her standing list: build kits and ready-made apps for every device, with each app's
own icon and never Ingenium's files; the APK and the IPA built in Ingenium or on GitHub; a Windows app that installs and uninstalls;
machines to build and test on; no caps beyond safety; and Fabrica easier to navigate than GitHub, teaching her as she goes.

Drawn from Fabrica itself (her 6.84 rule: measure the app first): the real #fb of the 7.05 page with three invented apps (quill-notes,
harbour-garden, ledger, each with an invented logo), the window's frame and Fabrica's header as pictures of 7.06, and the new pieces in
Fabrica's own forms and tokens (add.css uses only --f-* and Fabrica's classes):
- Needs you, at the top of Your apps: failed runs, runs going on, dates due, reviews waiting, versions ready to ship, across all apps.
- Runs, a fifth room (GitHub's Actions): Runs (each job, its machine, its steps, its whole log, the files it made, Explain this error),
  Workflows (the .github/workflows files, Run it now, recipes), Machines (this MacBook Pro, the Mac mini, the HP laptop, GitHub's
  machines, each with its tools; the test devices of phase 4).
- Story, Releases: every device in one release, with Install on this Mac, a Windows installer that registers and uninstalls, Send to
  the Fire tablet, Ingenium on the iPhone, and each kit built on a machine.
- Test and ship, Ship: where each package is made (here, or on a machine from its kit).
- Learn in every room (what it is, its names on GitHub and in git, why it matters, Show me, every word side by side) and Learning mode.
- Below the window: the parity map, read from Fabrica's code on 14 November 2026.

To build it (S is a scratch folder; the page served at a local address; logos.json holds three PNG data URLs keyed quill, leaf, ledger):
    node ../fabrica_p2/tools/capture_fabrica_686.js <page url> <S>/fabcap705 <S>/fabcap705/logos.json
    node ../fabrica_p2/tools/capture_frame.js <page url> <S>/fabcap706/frame fabrica
    node tools/capture_head.js <page url> <S>/fabcap706/head <S>/fabcap705/logos.json
    python3 -I build.py <S> <out.html>
    node tools/check_p3.js <out.html url> <out folder>          (17 checks)
Version 1: https://claude.ai/artifact/GKVKb3isARMrB1NtBytnTp (private). Waiting for her answer before any of it is built into Ingenium.
