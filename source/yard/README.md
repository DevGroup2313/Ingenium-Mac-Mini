# The repository engine (IngRepo) and the Fabrica page

`source/build/modules/r110.js` is the engine that keeps each app as a real git
repository on the device: blobs, trees, commits and tags under git's own SHA-1
names, branches, a working copy by full path (binary files too), changes line by
line, a three-way merge, undo by a new commit, and out and in as a git bundle, a
folder with its `.git` (zipped) or a zip of the files. On the computer apps it
also keeps a copy on disk beside the desk.

Tests (real git is the referee):

    node tests/t_repo.mjs ../build/modules/r110.js /tmp/t_out      # 46 checks
    node tests/t_mirror.mjs ../build/modules/r110.js /tmp/m_out    # the disk copy
    S=<scratch> node ../rig/t_repo_page.js                         # in the page, in Chromium

`preview/` holds the live preview of the page that uses it, Fabrica, as she approved
it: `python3 preview/gen.py` makes `fabrica_preview.html` from the template, the seal
pictures and Lector's layered seals (`../build/lx_layers.json`). The page itself is
`../build/modules/r112.js` (stage 2l), on IngRepo (r110) and IngShip (r111); its
test is `/tmp/.../w/fab_e2e.js` in the session that made it (33 checks in Chromium,
with real git as the referee for the bundle it exports).
