# Code, raised: a live preview, waiting for her word

https://claude.ai/artifact/KqvAsVp9Q87ZtDvYhbKCZz (version 1, 19 November 2026), private.

Her words (19 November 2026): "I want you to give the new Code panel for Fabrica the same raised 3D effect as the "Drop your files" section
of the Vocatio page, it looks that much better than the 3d button cards." The module is `build/modules/r335.js`, held for this preview
(build/held.json).

Code's start window and Vocatio's "Drop your files here", taken out of the running 7.46 page (with r335 added, as a test build keeps it)
by `capture.js`: each scene's markup with its ancestors, and every style rule that draws it by day and by night; r335's own rules are kept
apart, so the switch shows the cards as they are in 7.46 and as r335 draws them. `build.py` writes the page from `page.html`.
    node capture.js <page url> <capture folder>
    python3 -I build.py <capture folder> <out.html>
