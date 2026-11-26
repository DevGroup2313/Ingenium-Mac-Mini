<style id="r398-css">
/* ============ R398 · MENTES, HEALTH: FLAT AT REST, POPPED OUT UNDER THE POINTER (Ingenium 7.95; corrected in 7.97, 26 November 2026) ============
   Her words (26 November 2026, before 7.95): "I just want you to make the models name cards on the Health section of the Mentes page lift
   on hover in Ingenium's signature popped out 2D lift from the sticky notes and the Live Preview panel".
   7.95 read that as raised at rest as well. Her correction (26 November 2026, on 7.95): "I want the models cards to stay flat and just have
   the lifted 3D popped out effect when I hover the mouse on it, not just have it look poppped out and 3D at rest all the time. This looks
   ugly. I want the same effect that the "Your models" and "Where your models are kept" sections have to be applied to the Health section."
   So, as Your models' cards (r267: #page-models.tu-on .model-row) and the rows of Where your models are kept (r364: #mdPlaceCard .mp-row):
   - at rest, each model's card under Each model (.hm-row, r116) and each reading (.hl-row) lies flat: the pale card ground (--tu-card2)
     with a hairline (--tu-hair2), no shadow, exactly as Your models' cards rest;
   - under the pointer it pops out: the white card face fades in, the app's raised shadow (--pop-hi) comes up under it, and it rises 3
     pixels with a spring; pressed, it sinks back; a strip under its foot keeps the pointer on it while it rises;
   - a reading that warns keeps its warm ground, at rest and under the pointer;
   - by day and by night (each theme gives these tokens its own values); Minimal motion and reduced motion keep it still (the shadow and
     the white face still answer the pointer).
   The weight of the selectors holds on the Turret (r267's rule for the readings has two ids and two classes). */
#page-models #healthBox .hm-list{gap:8px}
#page-models #healthBox .hm-list .hm-row,
#page-models #healthBox .hl-rows .hl-row,
#page-models.tu-on #healthBox .hl-rows .hl-row{position:relative;z-index:0;border:0!important;border-radius:14px;
  background:var(--tu-card2,var(--card,#f8f5fc));box-shadow:inset 0 0 0 1px var(--tu-hair2,rgba(34,26,46,.06));
  transition:transform .32s cubic-bezier(.34,1.35,.64,1),box-shadow .22s}
#page-models #healthBox .hm-list .hm-row{padding:10px 12px}
#page-models #healthBox .hl-rows .hl-row.warn,#page-models #healthBox .hl-rows .hl-row.bad,
#page-models.tu-on #healthBox .hl-rows .hl-row.warn,#page-models.tu-on #healthBox .hl-rows .hl-row.bad{background:var(--tu-warnbg,var(--card,#fbf3e6))}
/* the white face, faded in under the pointer */
#page-models #healthBox .hm-list .hm-row::before,
#page-models #healthBox .hl-rows .hl-row::before{content:"";position:absolute;inset:0;border-radius:inherit;z-index:-1;pointer-events:none;
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#faf8fc));opacity:0;transition:opacity .22s}
#page-models #healthBox .hl-rows .hl-row.warn::before,#page-models #healthBox .hl-rows .hl-row.bad::before{display:none}
#page-models #healthBox .hm-list .hm-row:hover,
#page-models #healthBox .hl-rows .hl-row:hover,
#page-models.tu-on #healthBox .hl-rows .hl-row:hover{transform:translateY(-3px);box-shadow:var(--pop-hi,var(--pop))}
#page-models #healthBox .hm-list .hm-row:hover::before,
#page-models #healthBox .hl-rows .hl-row:hover::before{opacity:1}
#page-models #healthBox .hm-list .hm-row:active,
#page-models #healthBox .hl-rows .hl-row:active,
#page-models.tu-on #healthBox .hl-rows .hl-row:active{transform:translateY(0);transition-duration:.08s}
#page-models #healthBox .hm-list .hm-row::after,
#page-models #healthBox .hl-rows .hl-row::after{content:"";position:absolute;left:0;right:0;bottom:-7px;height:7px}
body[data-motion="minimal"] #page-models #healthBox .hm-list .hm-row,
body[data-motion="minimal"] #page-models #healthBox .hl-rows .hl-row{transition:none!important;transform:none!important}
@media (prefers-reduced-motion:reduce){#page-models #healthBox .hm-list .hm-row,#page-models #healthBox .hl-rows .hl-row{transition:none!important;transform:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p398"]="started";}catch(_){}
/* R398 · Mentes, Health: see the note at the top of its styles. Styles only. */
try{window.__ingParts["p398"]="running";}catch(_){}
</script>
