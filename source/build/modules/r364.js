<style id="r364-css">
/* ============ R364 · MENTES: THE TRAIN OVERVIEW, HEALTH AND WHERE YOUR MODELS ARE KEPT (Ingenium 7.72, 24 November 2026) ============
   Her words (24 November 2026):
   - "There is a glitch or bug on the "Train" tab from the Mentes Studio page. The cards on the Overview area look compressed in and
     cramped in and they also keep on popping up and down, please make the fix." Measured on 7.71: each card's label (Here, On a
     computer, Not yet, Not at home) ended 10 pixels below the top of its title, because the turret's labels (r269, .tr-tag: placed
     absolutely, raised half their height) and these labels (r199, .tr-tag) share a class name; and a card lifted 3 pixels under the
     pointer (r232), so a pointer near its foot left it as it rose, and it fell, and rose: popping up and down. Now the label is a pill
     above the title, as r232 meant it, the cards have more room, and each keeps a strip under its foot while lifted, so the pointer
     stays on it.
   - "There are a lot of flat and motionless sections and cards on the Mentes "Your Models" tab, the "Health" and "Where your models are
     kept" sections are all flat and have no animation on hover ... I want you to fix that and give them the signature lift and 3D popped
     out animation and refined look of the sticky notes side menu panel and that of the rest of Ingenium." Health's four readings (This
     device, Loaded now, The page itself, Installed models) and the places where models are kept become raised tiles: the app's own
     raised shadow (--pop) at rest, lifting under the pointer to --pop-hi with a spring, sinking when pressed; their cards lift a little.
   Nothing else moves at rest; Minimal motion and reduced motion keep them still. */
/* the Train overview: the label above the title, more room, a steady lift */
#ingTruthCard .tr-bands.tn-grid{gap:14px}
#ingTruthCard .tr-band.tn-tile{position:relative;padding:14px 16px 14px 16px;gap:6px 14px;min-height:96px;align-content:start}
#ingTruthCard .tr-band.tn-tile > .tr-tag{position:static!important;transform:none!important;display:inline-block;-webkit-line-clamp:unset;overflow:visible;white-space:nowrap;
  margin:0 0 2px;padding:3px 10px;border-radius:999px;font:700 10.5px/1.35 var(--sans,system-ui);letter-spacing:.08em;text-transform:uppercase;text-shadow:none;
  color:var(--accent,#6a3fb5);background:var(--accent-soft,rgba(106,63,181,.14));box-shadow:inset 0 0 0 .5px rgba(106,63,181,.18)}
#ingTruthCard .tr-band.tn-tile > .tr-tag.no{color:var(--ink-3,#6c6579);background:rgba(120,110,135,.13);box-shadow:inset 0 0 0 .5px rgba(120,110,135,.2)}
body[data-theme="night"] #ingTruthCard .tr-band.tn-tile > .tr-tag{color:#d9c8fb;background:rgba(183,156,230,.16)}
body[data-theme="night"] #ingTruthCard .tr-band.tn-tile > .tr-tag.no{color:#b6aac9;background:rgba(233,227,243,.08)}
#ingTruthCard .tr-band.tn-tile > div > b{display:block;line-height:1.3}
#ingTruthCard .tr-band.tn-tile::after{content:"";position:absolute;left:0;right:0;bottom:-7px;height:7px}
/* Health: four raised readings */
#healthBox{transition:transform .35s cubic-bezier(.2,.9,.25,1.2),box-shadow .25s}
#healthBox:hover{transform:translateY(-2px)}
#healthBox .hl-rows .hl-row{position:relative;border:0!important;border-radius:14px;padding:12px 14px;background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#faf8fc));
  box-shadow:var(--pop);transition:transform .32s cubic-bezier(.34,1.35,.64,1),box-shadow .22s}
#healthBox .hl-rows .hl-row:hover{transform:translateY(-3px);box-shadow:var(--pop-hi,var(--pop))}
#healthBox .hl-rows .hl-row:active{transform:translateY(0);transition-duration:.08s}
#healthBox .hl-rows .hl-row::after{content:"";position:absolute;left:0;right:0;bottom:-7px;height:7px}
/* where your models are kept: raised places, rows that answer the pointer */
#mdPlaceCard{transition:transform .35s cubic-bezier(.2,.9,.25,1.2),box-shadow .25s}
#mdPlaceCard:hover{transform:translateY(-2px)}
#mdPlaceCard .mp-place{position:relative;border:0!important;border-radius:14px!important;padding:12px 14px!important;background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#faf8fc))!important;
  box-shadow:var(--pop);transition:transform .32s cubic-bezier(.34,1.35,.64,1),box-shadow .22s}
#mdPlaceCard .mp-place:hover{transform:translateY(-3px);box-shadow:var(--pop-hi,var(--pop))}
#mdPlaceCard .mp-place:active{transform:translateY(0);transition-duration:.08s}
#mdPlaceCard .mp-place::after{content:"";position:absolute;left:0;right:0;bottom:-7px;height:7px}
#mdPlaceCard .mp-row{border-radius:12px;padding:8px 10px!important;transition:transform .3s cubic-bezier(.2,.9,.25,1.2),background .2s,box-shadow .2s}
#mdPlaceCard .mp-row:hover{transform:translateX(3px);background:var(--card-hi,rgba(255,255,255,.6));box-shadow:var(--pop)}
body[data-motion="minimal"] #ingTruthCard .tr-band.tn-tile,body[data-motion="minimal"] #healthBox,body[data-motion="minimal"] #healthBox .hl-row,
body[data-motion="minimal"] #mdPlaceCard,body[data-motion="minimal"] #mdPlaceCard .mp-place,body[data-motion="minimal"] #mdPlaceCard .mp-row{transition:none!important;transform:none!important}
@media (prefers-reduced-motion:reduce){#healthBox,#healthBox .hl-row,#mdPlaceCard,#mdPlaceCard .mp-place,#mdPlaceCard .mp-row{transition:none!important;transform:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p364"]="started";}catch(_){}
/* R364 · Mentes: see the note at the top of its styles. Styles only. */
try{window.__ingParts["p364"]="running";}catch(_){}
</script>
