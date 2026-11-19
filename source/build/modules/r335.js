<style id="r335-css">
/* ============ R335 · CODE'S START WINDOW IN VOCATIO'S RAISED DROP ZONE (Ingenium 7.47, 19 November 2026; held for her preview) ============
   Her words (19 November 2026), with a picture of Vocatio's "Drop your files here" and one of Code's start window (stage 1, r333):
   "I want you to give the new Code panel for Fabrica the same raised 3D effect as the "Drop your files" section of the Vocatio page, it
   looks that much better than the 3d button cards."
   So each card of Code's start window (New app, From GitHub, From Fabrica, Open an app file, Open a folder, Your apps) takes the drop
   zone's own face and depth, its values copied from modules/r283.js (#cs .cn-drop) and the Career Studio's tokens (modules/r188.js:
   --c-ring, --c-accs, --c-pop, --c-pophi, --c-spring), by day and by night: the dashed lilac edge, the lilac light falling from the top,
   the rounder corners, raised at rest as the drop zone is under the pointer, lifted two pixels under the pointer with the drop zone's
   deeper shadow and spring, and sinking when pressed. Each card keeps its words, their type and their order. Nothing else changes.
   Minimal or reduced motion keeps them still. */
html body #modalBox .cc-start .cc-card,html body #modalBox .cc-start .cc-new{border:1.5px dashed rgba(106,63,181,.5);border-radius:16px;
  background:linear-gradient(180deg,rgba(106,63,181,.10),rgba(106,63,181,0) 90%);
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s ease}
html body #modalBox .cc-start .cc-card:hover,html body #modalBox .cc-start .cc-new:hover,
html body #modalBox .cc-start .cc-card:focus-visible,html body #modalBox .cc-start .cc-new:focus-visible{
  background:linear-gradient(180deg,rgba(106,63,181,.10),rgba(106,63,181,0) 90%);transform:translateY(-2px);
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12)}
html body #modalBox .cc-start .cc-card:active,html body #modalBox .cc-start .cc-new:active{transform:translateY(1px);transition-duration:.08s;
  box-shadow:inset 0 -1px 0 rgba(40,22,68,.13),0 1px 0 rgba(40,22,68,.25),0 2px 3px rgba(40,22,68,.14)}
html body[data-theme="night"] #modalBox .cc-start .cc-card,html body[data-theme="night"] #modalBox .cc-start .cc-new{border-color:rgba(183,156,230,.45);
  background:linear-gradient(180deg,rgba(183,156,230,.14),rgba(106,63,181,0) 90%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.50),0 9px 14px rgba(0,0,0,.36)}
html body[data-theme="night"] #modalBox .cc-start .cc-card:hover,html body[data-theme="night"] #modalBox .cc-start .cc-new:hover,
html body[data-theme="night"] #modalBox .cc-start .cc-card:focus-visible,html body[data-theme="night"] #modalBox .cc-start .cc-new:focus-visible{
  background:linear-gradient(180deg,rgba(183,156,230,.14),rgba(106,63,181,0) 90%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.40)}
html body[data-theme="night"] #modalBox .cc-start .cc-card:active,html body[data-theme="night"] #modalBox .cc-start .cc-new:active{
  box-shadow:inset 0 -1px 0 rgba(0,0,0,.45),0 1px 0 rgba(0,0,0,.75),0 2px 3px rgba(0,0,0,.45)}
body[data-motion="minimal"] #modalBox .cc-start .cc-card,body[data-motion="minimal"] #modalBox .cc-start .cc-new{transition:none!important;transform:none!important}
@media (prefers-reduced-motion:reduce){#modalBox .cc-start .cc-card,#modalBox .cc-start .cc-new{transition:none!important;transform:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p335"]="running";}catch(_){}</script>
