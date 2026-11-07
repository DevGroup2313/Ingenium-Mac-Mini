<style id="r251-css">
/* ============ R251 · A PAGE THAT KEEPS STILL (Ingenium 6.53, 7 November 2026) ============
   Her words (7 November 2026): "it is mostly slightly faster but still slow on my Macbook pro". The rail's icons (the notepad, the
   hourglass, the bell, the moon), the seal's sway, the crest's sway, the top bar's breathing dots and the Guide's spark moved without
   end; in Chromium the graphics chip draws them, but they keep the compositor and, in Safari's engine (the Mac app), the painting busy
   for every frame. They now move while the pointer is on them. And the rail's arrow has no glass blur.
   This module first carried Carpe Diem's recipe for the keys as well; at her word ("I want my app to look like how it looked prior to
   this as far as the buttons. Perhaps how it looked on 6.9.4"), the keys have their 6.9.4 look again and no recipe is here. */
/* no glass: the rail's arrow sits on a plain face */
#railChevron::before{-webkit-backdrop-filter:none !important;backdrop-filter:none !important}

/* ---------- the page keeps still: decorations move while pointed at ---------- */
.rail-btn > span, .rail-btn > span > span, #fabTimer > span.glyph-only, #fabBell .bell, #fabTheme > span, .isl-idle, svg.seal3d, .ing-crest .ic-idle, #fbWhSeal span,
.cl-key .dot::after, #statusPill .pdot::after, .gd-spark, .gd-spark svg, .gd-dot{animation-play-state:paused !important}
.rail-btn:hover > span, .rail-btn:hover > span > span, #fabTimer:hover > span.glyph-only, #fabBell:hover .bell, #fabTheme:hover > span, #brandSealBtn:hover .isl-idle, #brandSealBtn:hover svg.seal3d,
.intro-seal .isl-idle, .intro-seal svg.seal3d, .ing-crest:hover .ic-idle, #fbWhSeal:hover span, .cl-key:hover .dot::after, #statusPill:hover .pdot::after,
#gdNewKey:hover .gd-spark, #gdNewKey:hover .gd-spark svg, #gdNewKey:hover .gd-dot{animation-play-state:running !important}

</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p251"]="started";}catch(_){}
/* R251 · (no recipe to place since 6.53's revert) */
(function r251(){
"use strict";
if(window.__r251)return;window.__r251=1;
var D=document;
function place(){var tok=D.getElementById("r251-tok");if(!tok||!D.head)return;
  var au=D.getElementById("auLook"),prev=D.getElementById("r248-tok")||D.getElementById("r247-tok");
  if(au&&au.parentNode===D.head){if(tok.nextSibling!==au)D.head.insertBefore(tok,au);}
  else if(prev&&prev.parentNode===D.head){if(prev.nextSibling!==tok)D.head.insertBefore(tok,prev.nextSibling);}
  else if(tok.parentNode!==D.head)D.head.appendChild(tok);}
try{place();}catch(e){}
/* r248 places its own recipe once it has run: this one follows it again */
setTimeout(function(){try{place();}catch(e){}},0);
window.IngParity={place:place,version:1};
})();
;try{window.__ingParts["p251"]="running";}catch(_){}
</script>
