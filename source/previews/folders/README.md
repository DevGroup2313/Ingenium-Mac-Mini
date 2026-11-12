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

## The drawer's pulls, living logos and any app's logo (12 November 2026), a preview first

Her words (12 November 2026): "I want the apps seals on the "your apps" section to be animated and interactive and clickable, I like
the effect. I also want the 3D folders for the apps at the top of the page to be able to filtered, and reorderd by alphabetical order,
and date but do no change the existing page design, just build it in as part of the 3D drawer. I want the Folders page to read and
accept any app icon/logo and not be limited my apps."

`folders_683_template.html` (made from `folders_template.html`, the approved design, which it leaves as it was):
- The drawer's two pulls are its keys: the left one finds a folder as she types (by its name or its parts; Escape clears it), the
  right one turns through Used last, A to Z, Z to A, Newest and Oldest (Shift turns back). The label between them says how many
  folders there are and in what order, or how many match. The drawer still shows six at a time.
- Your apps: each card's logo sways on its own, leans toward the pointer, lifts under it, sinks and knocks when pressed, then the
  folder opens.
- An opened folder takes any app's logo: Choose a picture (PNG, JPEG, WebP or SVG), From the app's page (the icon its page carries),
  or either dropped on its cover. A picture that cannot be read is refused. Every logo is drawn whole, never cut to a circle (the
  Offline Project's crest is taller than wide); an app with no logo has a quiet disc, never a letter. Harbour Garden is an invented
  app wearing its own logo.

To build it, as before, with two more pictures put in first (Lakay's Spiral from `build/apps/builtin/lakay_mark.json` and the
master crest from `build/master_seal.json`, by day and by night, for `{{SEAL_LAKAY}}`, `{{SEAL_LAKAYN}}`, `{{SEAL_MASTER}}` and
`{{SEAL_MASTERN}}`). `tools/build_folders.py` now takes the seal key at whatever size it was captured.
