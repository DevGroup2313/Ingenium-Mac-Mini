# Fabrica, phase 2: every repository on her own drive (12 November 2026), a preview first

Her words (12 November 2026): "Please continue working on my requests and deepening and enhancing Fabrica and making it my own offline
GitHub. I want full and complete parity with GitHub but I want you to go above and beyond that and really enhance it and Ingenium as a
whole." On the first preview (drawn from components of the 6.83 preview, not from Fabrica itself): "Everything is stiff and some
sections are out of formatting. It is not good enough, I don't like it." So this preview is drawn FROM FABRICA ITSELF (her 6.84 rule:
measure the app first): the real #fb of the built page, filled with invented repositories (quill-notes, ledger, harbour-garden, each
with an invented logo in its page), every room captured (Now, Story, Plans, Care and their tabs; a pull request opened), with every style
rule and keyframe that draws it, inside the app's window frame; and the phase 2 pieces in Fabrica's own forms:
- Your apps: On this computer (repositories read straight from the drive, any size) and In this window; Add one from this computer.
- Under the work's header: the drive and size of the repository; the branch chosen in Ingenium's own list (r172), never the system's.
- Plans, a pull request: merge, squash or rebase (Fabrica's own segmented row), and Ask Ingenium to review it.
- Beside Test, Ship and Copies: Ingenium (her own model reading the repository, offline): explain, review, release notes, the message;
  find in every repository; open any version as the app itself; a second copy on another drive; its folder in Folders.
- Below the window: the parity map with GitHub, by phase.

To build it (paths absolute; S is a scratch folder; the page served at a local address):
    node tools/capture_frame.js <page url> <S>/fabcap/frame fabrica
    python3 -I <make the logos: see logos.json in the session's notes, or any three PNG data URLs keyed quill, leaf, ledger>
    node tools/capture_fabrica.js <page url> <S>/fabcap <S>/fabcap/logos.json
    python3 -I build.py <S> <out.html>      (it reads <S>/preview/fabrica_p2/{add.css,app.js,map.html}: copy these files there)
    node tools/check_p2.js <out.html> <out prefix>
