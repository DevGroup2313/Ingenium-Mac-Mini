<style id="r248-tok">
/* ============ R248 · KEYS THAT STAND UP FROM THE PAGE, AND A PAGE THAT KEEPS STILL (Ingenium 6.51, 7 November 2026) ============
   Her words (7 November 2026): "The buttons inside of Ingenium still feels flat and are missing the popped out 3D animated look and
   effect and everything feels really freaking slow when I move my mouse around inside of the app."
   Measured on the 6.51 test page (Chromium, the computer slowed four times, the Chat page, the pointer still and then sweeping):
   the main thread was busy 36 % of the time with nothing touched and 62 % while the pointer moved. Blend's step keys (modules/r173.js)
   rewrote themselves about 30 times a second on every page, each write waking their own watcher; the seal's four inner movements
   (its star, its heart, its ring and its breath) are drawn inside its picture, so the browser painted the page again for each frame
   of them. With the steps written only when they change it fell to 8 % and 48 %; with the seal at rest, to 5 % and 29 %.
   The keys, measured against Inkwell, The Forge and Carpe Diem (their own pages): their keys have a shaded face, lighter at the top,
   a drawn rim and a visible edge beneath, and rise 3 px on a spring. Ingenium's had a nearly white, flat face (#ffffff to #f9f7fc)
   and a 1.5 px edge at 18 %. Now, by day: the face shades from white to a pale lavender (#ebe4f6) with a bright top line and a soft
   shade along its foot, so it reads as rounded; beneath it a lavender edge 2.5 px deep (the accent at 20 %, a colour rather than a
   darker shadow, so the key stands up without weighing on the page); soft casts below. Under the pointer it rises 3 px on a spring
   (0.22 s, a little past and back) and its edge grows to 3.5 px; pressed, it sinks 2 px into its edge in 0.05 s. No key changes
   size. The Author Studio's Soft and Deep still win (this recipe sits ahead of its look, as 6.49's did), Display's Flat depth still
   quiets every key, and the night theme keeps its own faces. */
:root{
  --key-edge: rgba(93,55,161,.20);
  --pop: inset 0 1px 0 #fff, inset 0 -12px 14px -12px rgba(var(--fam-rgb),.12), 0 0 0 .5px rgba(var(--fam-rgb),.22),
    0 1px 0 rgba(var(--fam-rgb),.10), 0 2.5px 0 var(--key-edge), 0 4px 6px rgba(var(--fam-rgb),.13), 0 10px 18px rgba(var(--fam-rgb),.09);
  --pop-hi: inset 0 1px 0 #fff, inset 0 -12px 14px -12px rgba(var(--fam-rgb),.10), 0 0 0 .5px rgba(var(--fam-rgb),.24),
    0 1px 0 rgba(var(--fam-rgb),.10), 0 3.5px 0 var(--key-edge), 0 8px 12px rgba(var(--fam-rgb),.14), 0 18px 30px rgba(var(--fam-rgb),.11);
  --seat: 0 0 0 .5px rgba(var(--fam-rgb),.24), inset 0 2px 5px rgba(var(--fam-rgb),.22), inset 0 -1px 0 rgba(255,255,255,.6), 0 .5px 0 var(--key-edge);
  --pill: inset 0 1px 0 #fff, inset 0 -9px 10px -9px rgba(var(--fam-rgb),.10), 0 0 0 .5px rgba(var(--fam-rgb),.18),
    0 1px 0 rgba(var(--fam-rgb),.10), 0 2px 0 rgba(93,55,161,.18), 0 3px 5px rgba(var(--fam-rgb),.11), 0 7px 13px rgba(var(--fam-rgb),.07);
  --pill-hi: inset 0 1px 0 #fff, inset 0 -9px 10px -9px rgba(var(--fam-rgb),.09), 0 0 0 .5px rgba(var(--fam-rgb),.20),
    0 1px 0 rgba(var(--fam-rgb),.10), 0 3px 0 rgba(93,55,161,.18), 0 6px 9px rgba(var(--fam-rgb),.13), 0 13px 22px rgba(var(--fam-rgb),.09);
  --key-spring: cubic-bezier(.2,1.5,.35,1);
}
</style>
<style id="r248-css">
/* the face, by day: white at the top, a pale lavender at the foot (keys whose face is their own colour, such as the primary keys,
   do not use this shade and are unchanged) */
body:not([data-theme="night"]):not([data-depth="flat"]) .btn, body:not([data-theme="night"]):not([data-depth="flat"]) .quick,
body:not([data-theme="night"]):not([data-depth="flat"]) .chat-top-key, body:not([data-theme="night"]):not([data-depth="flat"]) .cl-key,
body:not([data-theme="night"]):not([data-depth="flat"]) .cl-chev, body:not([data-theme="night"]):not([data-depth="flat"]) .cplus-btn,
body:not([data-theme="night"]):not([data-depth="flat"]) .ing-mem-pill, body:not([data-theme="night"]):not([data-depth="flat"]) .seg-btn,
body:not([data-theme="night"]):not([data-depth="flat"]) .tab-tool, body:not([data-theme="night"]):not([data-depth="flat"]) .msg-act{--card-lo:#ebe4f6}
/* the motion: up on a spring, a little past and back (the same selectors as the keys' own rules, later, so a key that is meant to
   keep still under a more particular rule still keeps still) */
.btn, .btn.ghost, .seg-btn, .quick, .msg-act, .aib-model, .cl-key, .cl-chev, .tab-tool, .chat-top-key, .chat-sess .btn, .chat-menu .menu-btn.menu-key{
  transition:transform .22s var(--key-spring), box-shadow .22s ease, background-color .15s ease, color .15s ease, border-color .15s ease}
body:not([data-depth="flat"]) .cplus-btn, body:not([data-depth="flat"]) .ing-mem-pill{
  transition:transform .22s var(--key-spring), box-shadow .22s ease, color .15s ease, border-color .15s ease}
.btn:hover, .btn.ghost:hover, .quick:hover, .msg-act:hover, .chat-sess .btn:hover, .btn.primary:hover{transform:translateY(-3px)}
/* the strip that keeps the pointer on a risen key reaches its full 3 px */
.btn:hover::before, .quick:hover::before, .msg-act:hover::before{bottom:-4px; height:4px}
/* pressed: down into its edge at once, back up on the spring */
.btn:not(.primary):active, .btn.ghost:active, .quick:active, .msg-act:active{transform:translateY(2px) scale(.985); transition-duration:.05s}
.btn.primary:active{transform:translateY(2px); transition-duration:.05s}
body:not([data-depth="flat"]) .chat-top-key:active, body:not([data-depth="flat"]) .cplus-btn:active,
body:not([data-depth="flat"]) .ing-mem-pill:active{transform:translateY(1.5px) scale(.98); transition-duration:.05s}

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

@media (prefers-reduced-motion: reduce){
  .btn, .btn.ghost, .seg-btn, .quick, .msg-act, .aib-model, .cl-key, .cl-chev, .tab-tool, .chat-top-key, .chat-sess .btn, .chat-menu .menu-btn.menu-key,
  body:not([data-depth="flat"]) .cplus-btn, body:not([data-depth="flat"]) .ing-mem-pill{transition:none}
  .btn:hover, .btn.ghost:hover, .quick:hover, .msg-act:hover, .chat-sess .btn:hover, .btn.primary:hover,
  .btn:not(.primary):active, .btn.ghost:active, .quick:active, .msg-act:active, .btn.primary:active,
  body:not([data-depth="flat"]) .chat-top-key:active, body:not([data-depth="flat"]) .cplus-btn:active, body:not([data-depth="flat"]) .ing-mem-pill:active{transform:none}}
body[data-motion="minimal"] .btn:hover, body[data-motion="minimal"] .btn.primary:hover, body[data-motion="minimal"] .quick:hover,
body[data-motion="minimal"] .msg-act:hover, body[data-motion="minimal"] .chat-sess .btn:hover,
body[data-motion="minimal"] .btn:not(.primary):active, body[data-motion="minimal"] .btn.primary:active, body[data-motion="minimal"] .quick:active,
body[data-motion="minimal"] .msg-act:active, body[data-motion="minimal"]:not([data-depth="flat"]) .chat-top-key:active,
body[data-motion="minimal"]:not([data-depth="flat"]) .cplus-btn:active, body[data-motion="minimal"]:not([data-depth="flat"]) .ing-mem-pill:active{transform:none}
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
