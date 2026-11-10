# Blend in Home's language (10 November 2026), a preview only

Her words: "I like the Blend redesign but I want everything made clickable and popped out animated. I want you to match the Home page
and have the Ingenium engine be animated and a clickable button, the same for Scriba and Magister's buttons. I want you give them the
same effect as the orbs from the Home page. I also want them to be redesigned a bit to better fit the app and its visuals."

What the preview shows. She approved it the same day ("I approve of the design please push it everywhere"), and it ships in Ingenium 6.68
as modules/r262.js, built on Blend's own elements (rig/t_668_blend.js):
- Blend's head as Home's sky: the eyebrow, the title in Cormorant, the lede, New blend and Ready-made as Home's card keys.
- The engine: Ingenium's own seal key with every flourish of R175 (it tilts to follow a mouse, sinks when pressed, and plays one of its
  flourishes on each press), in Home's deeper layers with a rim behind its face, its star turning counterclockwise.
- The chosen models ride a CSS 3D orbit round the engine. Each is a key built as Home's orbs are (the ball, and its own mark standing
  above it: Velox a swift arrow, Magister the scales, Scriba a quill, Faber a hammer, a connected model a cloud): it sways, tilts to
  follow a mouse, lifts and sinks. Pointing at one stops the orbit, brings it near and names what it does in this blend; pressing it
  opens its row in step I. Places wait, as keys too, while fewer than two are chosen.
- The four steps as coins made like the seal's face; the step and the answers as Home's slabs; every row, way, answer plate, ready-made
  card and the blended answer lean toward the pointer, lift and sink, as Fabrica's cards do; an answer shows its thinking on a press.

To build it: `node tools/capture_frame.js <page url> <folder> blend` (the app's frame with Blend open, by day and by night), then
`python3 -I tools/build_blend.py <scratch folder> blend_template.html <out.html>` (it also takes the seal key from the Home preview's
`real2/parts.json`, made by ../home_concepts/tools/capture_v2.js), then `node tools/check_blend.js <out.html> <out prefix>`.
