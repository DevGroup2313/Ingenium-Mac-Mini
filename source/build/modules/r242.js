<style id="r242-css">
/* ============ R242 · THE TOP BAR'S DOTS, MOVED BY THE GRAPHICS CHIP (Ingenium 6.45, 6 November 2026) ============
   Her words (6 November 2026): "Everything is moving slower inside of the app and my mouse's cursor is just delayed on the screen of
   the app, it feels off". Two dots in the top bar breathe on every page, all the time: the engine's and the model's (dotPulse, a
   shadow ring) and the status key's (presPulse, a glow filter). Both had the processor redraw them on every frame. The same
   breathing now comes from a ring and a glow on layers of their own, which only grow and fade: the graphics chip moves them and
   nothing is redrawn. Their colours, sizes and rhythm (1.9 s and 2.6 s) are the ones they had; with minimal or reduced motion they
   stay still, as before. */
@media (prefers-reduced-motion: no-preference){
  body:not([data-motion="minimal"]) .cl-key .dot{position:relative;animation:none;box-shadow:none}
  body:not([data-motion="minimal"]) .cl-key .dot::after{content:"";position:absolute;inset:0;border-radius:50%;pointer-events:none;
    box-shadow:0 0 0 2px var(--dotc,rgba(184,121,31,.5));opacity:0;animation:r242Ring 1.9s ease-out infinite;will-change:transform,opacity}
  body:not([data-motion="minimal"]) #statusPill .pdot{position:relative;animation:none}
  body:not([data-motion="minimal"]) #statusPill .pdot::after{content:"";position:absolute;inset:-1px;border-radius:50%;pointer-events:none;
    box-shadow:0 0 4px 1px currentColor;opacity:0;animation:r242Glow 2.6s ease-in-out infinite;will-change:opacity}
}
@keyframes r242Ring{0%{transform:scale(1);opacity:1}70%{transform:scale(2.2);opacity:0}100%{transform:scale(2.2);opacity:0}}
@keyframes r242Glow{0%,100%{opacity:0}50%{opacity:.7}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p242"]="started";}catch(_){}
/* R242 is its styles alone (above). */
;try{window.__ingParts["p242"]="running";}catch(_){}
</script>
