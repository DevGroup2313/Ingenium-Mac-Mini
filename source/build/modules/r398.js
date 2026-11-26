<style id="r398-css">
/* ============ R398 · MENTES, HEALTH: EACH MODEL'S CARD LIFTS AS THE STICKY NOTES DO (Ingenium 7.95, 26 November 2026) ============
   Her words (26 November 2026): "I just want you to make the models name cards on the Health section of the Mentes page lift on hover
   in Ingenium's signature popped out 2D lift from the sticky notes and the Live Preview panel, please make the fix"; and before it: "I
   don't want it to just be motionless and flat ... It should be set as a rule for my preference for that style on my display for all of
   my apps, not just Ingenium."
   Measured on 7.94 (the page drawn with two models): under Each model, every model's card (.hm-row, r116) lay flat, a hairline on a
   pale lilac, with no shadow and nothing under the pointer. And Health's four readings, made raised in 7.72 (r364, approved), were flat
   too: the Turret's own rule (r267, #page-models.tu-on #healthBox .hl-row: two ids and two classes) outweighs r364's (one id, two
   classes), so their raised shadow and its rise to --pop-hi never showed; only the 3 pixel rise did.
   Now both take the lift r364 meant, stated with the weight to hold on the Turret: the app's raised shadow (--pop) at rest, rising 3
   pixels to --pop-hi with a spring under the pointer, sinking when pressed, by day and by night (each theme gives --pop its own values),
   with a strip under the foot so the pointer stays on a card while it rises. A reading that warns keeps its warm ground. The tags inside
   a model's card (its fit, its file) stay as they were. Nothing else moves at rest; Minimal motion and reduced motion keep them still.
   Her rule is kept in How I work, once, in her master copy (r327's LATER, u795). */
#page-models #healthBox .hm-list{gap:10px}
#page-models #healthBox .hm-list .hm-row,
#page-models.tu-on #healthBox .hl-rows .hl-row{position:relative;border:0!important;border-radius:14px;
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#faf8fc));box-shadow:var(--pop);
  transition:transform .32s cubic-bezier(.34,1.35,.64,1),box-shadow .22s}
#page-models #healthBox .hm-list .hm-row{padding:10px 12px}
#page-models.tu-on #healthBox .hl-rows .hl-row.warn,#page-models.tu-on #healthBox .hl-rows .hl-row.bad{background:var(--tu-warnbg,var(--card-lo,#faf8fc))}
#page-models #healthBox .hm-list .hm-row:hover,
#page-models.tu-on #healthBox .hl-rows .hl-row:hover{transform:translateY(-3px);box-shadow:var(--pop-hi,var(--pop))}
#page-models #healthBox .hm-list .hm-row:active,
#page-models.tu-on #healthBox .hl-rows .hl-row:active{transform:translateY(0);transition-duration:.08s}
#page-models #healthBox .hm-list .hm-row::after,
#page-models.tu-on #healthBox .hl-rows .hl-row::after{content:"";position:absolute;left:0;right:0;bottom:-7px;height:7px}
body[data-motion="minimal"] #page-models #healthBox .hm-list .hm-row,
body[data-motion="minimal"] #page-models.tu-on #healthBox .hl-rows .hl-row{transition:none!important;transform:none!important}
@media (prefers-reduced-motion:reduce){#page-models #healthBox .hm-list .hm-row,#page-models.tu-on #healthBox .hl-rows .hl-row{transition:none!important;transform:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p398"]="started";}catch(_){}
/* R398 · Mentes, Health: see the note at the top of its styles. Styles only. */
try{window.__ingParts["p398"]="running";}catch(_){}
</script>
