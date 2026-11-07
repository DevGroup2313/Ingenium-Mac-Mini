<style id="r248-css">
/* Ingenium 6.51, kept in 6.53: the seal and Home's app stones keep still until they are pointed at. (6.51's keys, a lavender
   edge and a shaded face, were taken out in 6.53, at her word: the keys have their 6.9.4 look again.) */
/* ---------- the seal keeps still until it is pointed at ----------
   Its star, its heart, its ring and its breath move inside its picture, which the browser cannot hand to the graphics card: each
   frame of them painted the page again, all the time, on every page (5 % of the slowed computer's time with nothing touched, and
   more than a third of the work while the pointer moved). They rest now, and move while the pointer is on the seal or the seal has
   the keyboard's focus, and on the welcome door. The seal's gentle sway, which the graphics card draws by itself, goes on. */
.seal3d .seal-spin, .seal3d .seal-heart, .seal3d .seal-counter, .seal3d .s4-breath{animation-play-state:paused}
#brandSealBtn:hover .seal3d .seal-spin, #brandSealBtn:hover .seal3d .seal-heart, #brandSealBtn:hover .seal3d .seal-counter, #brandSealBtn:hover .seal3d .s4-breath,
#brandSealBtn:focus-visible .seal3d .seal-spin, #brandSealBtn:focus-visible .seal3d .seal-heart, #brandSealBtn:focus-visible .seal3d .seal-counter, #brandSealBtn:focus-visible .seal3d .s4-breath,
.intro-seal .seal3d .seal-spin, .intro-seal .seal3d .seal-heart, .intro-seal .seal3d .seal-counter, .intro-seal .seal3d .s4-breath,
.seal3d:hover .seal-spin, .seal3d:hover .seal-heart, .seal3d:hover .seal-counter, .seal3d:hover .s4-breath{animation-play-state:running}
/* Home's app stones: their sparks (each drawn with four glows, and grown and shrunk by the main thread) come while the pointer is on
   a stone or it has the keyboard's focus; left running, they made Home's styles be worked out again for every frame (about 55 times
   a second) */
.hx-app .hx-stone::before{animation-play-state:paused}
.hx-app:hover .hx-stone::before, .hx-app:focus-visible .hx-stone::before{animation-play-state:running}

</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p248"]="started";}catch(_){}
/* R248 · the keys' recipe goes into the head, after 6.49's and ahead of the Author Studio's look, so a depth chosen there still wins */
(function r248(){
"use strict";
if(window.__r248)return;window.__r248=1;
var D=document;
function place(){var tok=D.getElementById("r248-tok");if(!tok||!D.head)return;
  var au=D.getElementById("auLook"),prev=D.getElementById("r247-tok");
  if(au&&au.parentNode===D.head){if(tok.nextSibling!==au)D.head.insertBefore(tok,au);}
  else if(prev&&prev.parentNode===D.head){if(prev.nextSibling!==tok)D.head.insertBefore(tok,prev.nextSibling);}
  else if(tok.parentNode!==D.head)D.head.appendChild(tok);}
try{place();}catch(e){}
window.IngKeys={place:place,version:1};
})();
;try{window.__ingParts["p248"]="running";}catch(_){}
</script>
