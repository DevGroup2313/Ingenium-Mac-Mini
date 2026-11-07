<style id="r251-tok">
/* ============ R251 · CARPE DIEM'S KEYS AND SURFACES, AND A PAGE THAT KEEPS STILL (Ingenium 6.53, 7 November 2026) ============
   Her words (7 November 2026): "You keep making it more glossier, more smooth and glass like and I HATE THAT. I have told you many
   times that I want full parity with Carpe Diem's buttons and acrylic surfaces. I want my desired look for Ingenium restored! I like
   the clicky, acrylic feel and look of the app and the mechanical sounds and texture of the app ... All you've done is make everything
   smoother and FLATTER! You keep adding this freaking purple glow under every fucking button". And: "it is mostly slightly faster but
   still slow on my Macbook pro".
   Measured in Carpe Diem's own page (built into Ingenium; Chromium, 7 November 2026): its keys have a flat face and rest on a solid
   slate edge with grey casts, all of rgb(16,42,58): inset 0 -1.5px 0 at 16 %, 0 2px 0 at 30 %, 0 4px 5px at 20 %, 0 9px 14px at
   13 %; under the pointer a key rises 2 px and its edge and casts deepen (0 3px 0 at 30 %, 0 6px 8px at 22 %, 0 13px 20px at 15 %);
   pressed it sits 1 px down in a well (inset 0 2px 5px at 24 %, 0 1px 1px at 25 %) in 0.05 s; the motion is a 0.1 s spring
   (cubic-bezier(.34,1.35,.64,1)), the shadow 0.12 s. Its prompt keys are rounder and a little heavier (2 px at 34 %) and only rise
   1.5 px; its top pills rest on 1 px at 32 %. Its cards are acrylic: white at 72 % over the page, a fine rim of its accent at 16 %,
   a 1 px edge at 22 % and soft casts; its dialogs are white with a 4 px halo of its accent at 7 % and one deep cast. No glass blur.
   Ingenium's own had been tinted with its purple ink, rgb(40,22,68), so every key and card cast a violet haze, and 6.49 and 6.51
   added a white gloss line, a gradient face and a lavender edge. Now the purple ink is gone from every shadow (here for the
   recipes, and in build_page.py for the shadows written elsewhere in the page), the faces are flat, and the recipe is Carpe Diem's,
   number for number, in slate. Night keeps its own faces; Display's Flat depth keeps every key flat; the Author Studio's Soft and
   Deep still follow this recipe in the head and win.
   The page keeps still: the rail's hourglass, bell and moon, the seal's sway, the crest's sway, the top bar's breathing dots and the
   Guide's spark moved without end. In Chromium the graphics chip draws them, but they keep the compositor and, in Safari's engine
   (the Mac app), the painting busy for every frame; they now move while the pointer is on them. */
:root{
  --fam-rgb:16,42,58;
  --pop: inset 0 -1.5px 0 rgba(16,42,58,.16), 0 2px 0 rgba(16,42,58,.30), 0 4px 5px rgba(16,42,58,.20), 0 9px 14px rgba(16,42,58,.13);
  --pop-hi: inset 0 -1.5px 0 rgba(16,42,58,.16), 0 3px 0 rgba(16,42,58,.30), 0 6px 8px rgba(16,42,58,.22), 0 13px 20px rgba(16,42,58,.15);
  --seat: inset 0 2px 5px rgba(16,42,58,.24), 0 1px 1px rgba(16,42,58,.25);
  --pill: inset 0 -1.5px 0 rgba(16,42,58,.16), 0 1px 0 rgba(16,42,58,.32), 0 3px 3px rgba(16,42,58,.20), 0 6px 8px rgba(16,42,58,.11);
  --pill-hi: inset 0 -1.5px 0 rgba(16,42,58,.16), 0 1px 0 rgba(16,42,58,.32), 0 3px 3px rgba(16,42,58,.20), 0 6px 8px rgba(16,42,58,.11);
  --chip: inset 0 -1.5px 0 rgba(16,42,58,.18), 0 2px 0 rgba(16,42,58,.34), 0 4px 4px rgba(16,42,58,.22), 0 8px 10px rgba(16,42,58,.12);
  --raise: inset 0 -1px 0 rgba(16,42,58,.10), 0 1px 0 rgba(16,42,58,.22), 0 3px 4px rgba(16,42,58,.14), 0 8px 14px rgba(16,42,58,.09);
  --raise-sm: var(--pop); --raise-sm-hi: var(--pop-hi);
  --face-a:#ffffff; --face-b:#ffffff; --glint:rgba(255,255,255,0); --glint-lo:rgba(16,42,58,0);
  --key-edge: rgba(16,42,58,.30);
  --key-spring: cubic-bezier(.34,1.35,.64,1);
}
</style>
<style id="r251-css">
/* flat faces by day: the key's face is one colour, as Carpe Diem's (no gradient, no gloss line) */
body:not([data-theme="night"]):not([data-depth="flat"]) .btn, body:not([data-theme="night"]):not([data-depth="flat"]) .quick,
body:not([data-theme="night"]):not([data-depth="flat"]) .chat-top-key, body:not([data-theme="night"]):not([data-depth="flat"]) .cl-key,
body:not([data-theme="night"]):not([data-depth="flat"]) .cl-chev, body:not([data-theme="night"]):not([data-depth="flat"]) .cplus-btn,
body:not([data-theme="night"]):not([data-depth="flat"]) .ing-mem-pill, body:not([data-theme="night"]):not([data-depth="flat"]) .seg-btn,
body:not([data-theme="night"]):not([data-depth="flat"]) .tab-tool, body:not([data-theme="night"]):not([data-depth="flat"]) .msg-act{--card-lo:#ffffff;--card-hi:#ffffff}
/* the motion: Carpe Diem's spring, 0.1 s, and its shadow, 0.12 s */
.btn, .btn.ghost, .seg-btn, .quick, .msg-act, .aib-model, .cl-key, .cl-chev, .tab-tool, .chat-top-key, .chat-sess .btn, .chat-menu .menu-btn.menu-key{
  transition:transform .1s var(--key-spring), box-shadow .12s ease, background-color .15s ease, color .15s ease, border-color .15s ease}
body:not([data-depth="flat"]) .cplus-btn, body:not([data-depth="flat"]) .ing-mem-pill{transition:transform .1s var(--key-spring), color .15s ease, border-color .15s ease}
.btn:hover, .btn.ghost:hover, .quick:hover, .msg-act:hover, .chat-sess .btn:hover, .btn.primary:hover{transform:translateY(-2px)}
body:not([data-depth="flat"]) .cplus-btn:hover, body:not([data-depth="flat"]) .ing-mem-pill:hover{transform:translateY(-1.5px)}
.btn:hover::before, .quick:hover::before, .msg-act:hover::before{bottom:-3px; height:3px}
.btn:not(.primary):active, .btn.ghost:active, .quick:active, .msg-act:active, .btn.primary:active{transform:translateY(1px); transition-duration:.05s}
body:not([data-depth="flat"]) .chat-top-key:active, body:not([data-depth="flat"]) .cplus-btn:active,
body:not([data-depth="flat"]) .ing-mem-pill:active{transform:translateY(1px); transition-duration:.05s}
/* the prompt keys and the small round keys: Carpe Diem's prompt key */
body:not([data-theme="night"]):not([data-depth="flat"]) .cplus-btn, body:not([data-theme="night"]):not([data-depth="flat"]) .ing-mem-pill{box-shadow:var(--chip)}
/* the primary key and a chosen segment: the accent, flat, on the same slate edge */
body:not([data-theme="night"]):not([data-depth="flat"]) .btn.primary{background:var(--accent,#6a3fb5) !important;border-color:rgba(46,24,84,.55) !important;
  box-shadow:var(--pop) !important;text-shadow:none !important}
body:not([data-theme="night"]):not([data-depth="flat"]) .btn.primary:hover{background:var(--accent,#6a3fb5) !important;box-shadow:var(--pop-hi) !important}
body:not([data-theme="night"]):not([data-depth="flat"]) .btn.primary:active{box-shadow:var(--seat) !important}
body:not([data-theme="night"]):not([data-depth="flat"]) .seg-btn.on, body:not([data-theme="night"]):not([data-depth="flat"]) .aib .seg-btn.active,
body:not([data-theme="night"]):not([data-depth="flat"]) .aib-steps li.on{background:var(--accent,#6a3fb5) !important;border-color:rgba(46,24,84,.55) !important;box-shadow:var(--pop) !important}
/* acrylic cards and dialogs, as Carpe Diem's */
body:not([data-theme="night"]):not([data-depth="flat"]) .card{background:rgba(255,255,255,.72);border:1px solid rgba(106,63,181,.16);box-shadow:var(--raise)}
body:not([data-theme="night"]):not([data-depth="flat"]) .modal{background:#ffffff;border:1px solid var(--accent,#6a3fb5);border-radius:16px;
  box-shadow:0 0 0 4px rgba(106,63,181,.07), 0 16px 48px rgba(16,42,58,.22)}
/* no glass: the rail's arrow sits on a plain face */
#railChevron::before{-webkit-backdrop-filter:none !important;backdrop-filter:none !important}

/* ---------- the page keeps still: decorations move while pointed at ---------- */
.rail-btn > span, .rail-btn > span > span, #fabTimer > span.glyph-only, #fabBell .bell, #fabTheme > span, .isl-idle, svg.seal3d, .ing-crest .ic-idle, #fbWhSeal span,
.cl-key .dot::after, #statusPill .pdot::after, .gd-spark, .gd-spark svg, .gd-dot{animation-play-state:paused !important}
.rail-btn:hover > span, .rail-btn:hover > span > span, #fabTimer:hover > span.glyph-only, #fabBell:hover .bell, #fabTheme:hover > span, #brandSealBtn:hover .isl-idle, #brandSealBtn:hover svg.seal3d,
.intro-seal .isl-idle, .intro-seal svg.seal3d, .ing-crest:hover .ic-idle, #fbWhSeal:hover span, .cl-key:hover .dot::after, #statusPill:hover .pdot::after,
#gdNewKey:hover .gd-spark, #gdNewKey:hover .gd-spark svg, #gdNewKey:hover .gd-dot{animation-play-state:running !important}

@media (prefers-reduced-motion: reduce){
  .btn, .btn.ghost, .seg-btn, .quick, .msg-act, .aib-model, .cl-key, .cl-chev, .tab-tool, .chat-top-key, .chat-sess .btn, .chat-menu .menu-btn.menu-key,
  body:not([data-depth="flat"]) .cplus-btn, body:not([data-depth="flat"]) .ing-mem-pill{transition:none}
  .btn:hover, .btn.ghost:hover, .quick:hover, .msg-act:hover, .chat-sess .btn:hover, .btn.primary:hover,
  .btn:not(.primary):active, .btn.ghost:active, .quick:active, .msg-act:active, .btn.primary:active,
  body:not([data-depth="flat"]) .cplus-btn:hover, body:not([data-depth="flat"]) .ing-mem-pill:hover,
  body:not([data-depth="flat"]) .chat-top-key:active, body:not([data-depth="flat"]) .cplus-btn:active, body:not([data-depth="flat"]) .ing-mem-pill:active{transform:none}}
body[data-motion="minimal"] .btn:hover, body[data-motion="minimal"] .btn.primary:hover, body[data-motion="minimal"] .quick:hover,
body[data-motion="minimal"] .msg-act:hover, body[data-motion="minimal"] .chat-sess .btn:hover,
body[data-motion="minimal"] .btn:not(.primary):active, body[data-motion="minimal"] .btn.primary:active, body[data-motion="minimal"] .quick:active,
body[data-motion="minimal"] .msg-act:active, body[data-motion="minimal"]:not([data-depth="flat"]) .chat-top-key:active,
body[data-motion="minimal"]:not([data-depth="flat"]) .cplus-btn:active, body[data-motion="minimal"]:not([data-depth="flat"]) .ing-mem-pill:active,
body[data-motion="minimal"]:not([data-depth="flat"]) .cplus-btn:hover, body[data-motion="minimal"]:not([data-depth="flat"]) .ing-mem-pill:hover{transform:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p251"]="started";}catch(_){}
/* R251 · Carpe Diem's recipe goes into the head after the earlier ones and ahead of the Author Studio's look */
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
