# Folders, a drawer of her apps (10 November 2026), a preview first

Her words: "The Folders page needs its own design and not just be a replica of the Blend page and Home page." and "Also, I want the
apps icon logos on their folders please." On the live preview: "I like this new look, please fix the stretched icons and push it
everywhere. I really like this new design." And: "I want the apps seals to switch to their dark mode look when the app is on Dark mode
instead of keeping their light mode look."

What the preview shows. It ships in Ingenium 6.69 as modules/r263.js, built on Folders' own page (rig/t_669_folders.js):
- A drawer pulled open toward her, in Ingenium's colours: a folder for each app stands in it with its tab, its papers and its app's own
  seal (Carpe Diem, The Forge, Ingenium and Inkwell carry their seals from r140, by day and by night as the Display is); any other app
  has a coin with its first letter. Pointing at a folder lifts it out of the drawer and names it; pressing it opens it.
- Beside the drawer, the page's own words, its two keys, and a small ruled label of what a folder holds.
- Every folder an index card, ruled and punched, with its seal; the build library a bound volume on its shelf; the ways of bringing work
  in, envelopes in a tray, each sealed with its own mark; How I work, a ruled sheet with Ingenium's seal pressed faintly in its corner.
- A folder opened is a spread: the inside of its cover on the left (its seal, its name, where she left off, how she works on it), its
  papers on the right (how it was built, the decisions, its conversations, its repository, the words that mark it).
- Cards, envelopes, rows and notes lean toward the pointer, lift under it and sink when pressed.

The first version of the preview showed the seals stretched across the index cards: the card's own `top` class met the frame's `.win
.top img` rule (the top bar's picture). The card's part is called `fd-ctop` now; in Ingenium itself the cards are Folders' own.

To build it: `node tools/capture_frame.js <page url> <folder> folders` (the app's frame with Folders open, by day and by night), then
`python3 -I tools/extract_seals.py ../../build/modules/r140.js <scratch folder>/appseals`, then
`python3 -I tools/build_folders.py <scratch folder> folders_template.html <out.html>` (it also reads `real2/parts.json`, made by
../home_concepts/tools/capture_v2.js), then `node tools/check_folders.js <out.html> <out prefix>` (absolute paths).
