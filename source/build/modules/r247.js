<style id="r247-tok">
/* ============ R247 · KEYS THAT RISE AND SEAT, ELEVATED AND REFINED (Ingenium 6.49, 7 November 2026) ============
   Her words (6 November 2026): "I want Ingenium to have that analogue look and feel, I want it to have that animated mechanical 3D
   feeling match Carpe Diem, The Forge and Inkwell's animation and vibe to stay cohesive and match the rest of the Offline Project."
   and "I don't want the buttons to be made bigger or wider. I just want them to look more weighted and 3D animated. I want them to
   look like clickable buttons and not just flat." Then, the same evening: "Please reduce the heavyness of the buttons, it looks a
   little too intense and take away from the look of the app. I want it to look elevated and refined."
   Measured in the three apps (their own pages, 6 November 2026): The Forge's and Carpe Diem's keys rest on a dark edge 2 px deep at
   30 % with casts at 20 % and 13 %, and are drawn by a crisp rim (The Forge's at 26 %); Inkwell's rest on four casts (30, 26, 18 and
   11 %). Ingenium's keys had the same shape at 25, 16 and 10 %, but its rim was a 10 % hairline, so on a white card a key read as
   paper with a shadow under it; its top bar pills were at less than half the family's weight, and several keys had no edge at all.
   The recipe now, elevated rather than heavy: a fine outline round every key (half a pixel at 20 %), a thin edge beneath it (1.5 px
   at 18 %, where 6.45 had 2 px at 25 %) and a soft, wide lift (3 px at 10 %, 18 px at 9 %); under the pointer the key rises 2 px and
   its lift spreads (16 px, then 30 px); pressed, it sinks into a seat at once (0.05 s) and springs back. The heavier, family-weight
   key is the Author Studio's Deep depth (modules/r236.js). No key changes size: the outline is a shadow and takes no room; only
   edges, casts and motion change.
   This first part, the recipe itself, is moved into the page's head ahead of the Author Studio's look (modules/r236.js), so a
   depth chosen there (Soft or Deep) still wins over it; Display's Flat depth still quiets every key. */
:root{
  --pop: 0 0 0 .5px rgba(var(--fam-rgb),.20), inset 0 -1px 0 rgba(var(--fam-rgb),.08), 0 1.5px 0 rgba(var(--fam-rgb),.18),
    0 3px 6px rgba(var(--fam-rgb),.10), 0 8px 18px rgba(var(--fam-rgb),.09);
  --pop-hi: 0 0 0 .5px rgba(var(--fam-rgb),.22), inset 0 -1px 0 rgba(var(--fam-rgb),.08), 0 2.5px 0 rgba(var(--fam-rgb),.16),
    0 7px 12px rgba(var(--fam-rgb),.12), 0 16px 30px rgba(var(--fam-rgb),.11);
  --seat: 0 0 0 .5px rgba(var(--fam-rgb),.22), inset 0 1.5px 4px rgba(var(--fam-rgb),.18), 0 1px 1px rgba(var(--fam-rgb),.10);
  --pill: 0 0 0 .5px rgba(var(--fam-rgb),.18), inset 0 -1px 0 rgba(var(--fam-rgb),.08), 0 1px 0 rgba(var(--fam-rgb),.18),
    0 2px 4px rgba(var(--fam-rgb),.10), 0 6px 12px rgba(var(--fam-rgb),.07);
  --pill-hi: 0 0 0 .5px rgba(var(--fam-rgb),.20), 0 2px 0 rgba(var(--fam-rgb),.15), 0 5px 8px rgba(var(--fam-rgb),.11),
    0 11px 20px rgba(var(--fam-rgb),.09);
}
</style>
<style id="r247-css">
/* the pill's night and flat faces (the key's own are the base page's, unchanged) */
body[data-theme="night"]{
  --pill: inset 0 1px 0 rgba(255,255,255,.09), inset 0 -1.5px 0 rgba(0,0,0,.4), 0 1px 0 rgba(0,0,0,.5), 0 3px 5px rgba(0,0,0,.4), 0 8px 12px rgba(0,0,0,.3);
  --pill-hi: inset 0 1px 0 rgba(255,255,255,.1), inset 0 -1.5px 0 rgba(0,0,0,.4), 0 2px 0 rgba(0,0,0,.55), 0 5px 7px rgba(0,0,0,.45), 0 11px 16px rgba(0,0,0,.34)}
body[data-depth="flat"]{--pill:0 1px 1px rgba(40,20,70,.09), 0 2px 5px rgba(40,20,70,.07); --pill-hi:0 1px 2px rgba(40,20,70,.10), 0 4px 8px rgba(40,20,70,.08)}
body[data-depth="flat"][data-theme="night"]{--pill:0 1px 1px rgba(0,0,0,.40), 0 2px 5px rgba(0,0,0,.22); --pill-hi:0 1px 2px rgba(0,0,0,.40), 0 4px 9px rgba(0,0,0,.26)}
/* each room's own copy of the key (Lector, Fabrica, the backup card, the Career Studio, the setup card, the tour and help, Home)
   follows the one recipe by day; their night faces are their own, as before */
#lx7{--l-pop:var(--pop);--l-pophi:var(--pop-hi);--l-press:var(--seat);--l-pill:var(--pill)}
#fb{--f-pop:var(--pop);--f-pophi:var(--pop-hi);--f-press:var(--seat);--f-pill:var(--pill);--f-key:var(--pill)}
#bkCard{--b-pop:var(--pop);--b-pophi:var(--pop-hi);--b-press:var(--seat)}
#cs{--c-pop:var(--pop);--c-pophi:var(--pop-hi);--c-press:var(--seat);--c-pill:var(--pill)}
#stxCard{--sx-pill:var(--pill);--sx-press:var(--seat)}
#ingTour,#tourMenu,#guideTour,#tourGo,#ihPanel,#ihBubble,#ihAsk,#ihSetCard,#ingHelpKey{--ih-pop:var(--pop);--ih-pophi:var(--pop-hi);--ih-press:var(--seat)}
/* Home's large keys: the same outline, a thin edge and a soft, wide lift */
.hx{--x-pill:var(--pill);
  --x-key:0 0 0 .5px rgba(40,22,68,.16), inset 0 -2px 0 rgba(40,22,68,.05), 0 1px 0 rgba(40,22,68,.13), 0 4px 10px rgba(40,22,68,.08), 0 14px 30px rgba(40,22,68,.08);
  --x-keyhi:0 0 0 .5px rgba(40,22,68,.18), inset 0 -2px 0 rgba(40,22,68,.05), 0 2px 0 rgba(40,22,68,.11), 0 10px 18px rgba(40,22,68,.11), 0 24px 44px rgba(40,22,68,.11);
  --x-press:0 0 0 .5px rgba(40,22,68,.18), inset 0 2px 6px rgba(40,22,68,.16), 0 1px 0 rgba(40,22,68,.08)}
body[data-depth="flat"] .hx{--x-key:var(--pop);--x-keyhi:var(--pop-hi)}
/* the top bar's keys, as Carpe Diem's top bar wears them */
body:not([data-depth="flat"]) .cl-key, body:not([data-depth="flat"]) .cl-chev{box-shadow:var(--pill)}
body:not([data-depth="flat"]) button.cl-key:hover, body:not([data-depth="flat"]) .cl-key[role="button"]:hover,
body:not([data-depth="flat"]) .cl-chev:hover{box-shadow:var(--pill-hi)}
body:not([data-depth="flat"]) button.cl-key:active, body:not([data-depth="flat"]) .cl-key[role="button"]:active,
body:not([data-depth="flat"]) .cl-chev:active{box-shadow:var(--seat);transform:translateY(1px) scale(.98);transition-duration:.05s}
/* the keys above a chat or a Code session: full keys, by day and by night */
body:not([data-depth="flat"]) .chat-top-key{box-shadow:var(--pop)}
body:not([data-depth="flat"]) .chat-top-key:hover{box-shadow:var(--pop-hi)}
body:not([data-depth="flat"]) .chat-top-key:active{box-shadow:var(--seat);transform:translateY(1px) scale(.98)}
/* a choice key that is not chosen grows its edge under the pointer, as the other keys do */
body:not([data-depth="flat"]) :not(.intro-theme) > .seg-btn:hover:not(.on):not(.active):not([aria-pressed="true"]):not(:disabled){box-shadow:var(--pop-hi)}
/* keys that were drawn as words or as bare outlines are keys too now, each at its own size (only a face, an edge and casts are
   added): Chat's plus and microphone keys, its memory pill and the four ideas on an empty chat; Lector's Suggestions, Copy, Open in
   Tabula, Choose all four and Keep this copy; Home's See all; Fabrica's fold keys (their recipe, var(--f-key), was never set) */
body:not([data-depth="flat"]) .cplus-btn, body:not([data-depth="flat"]) .ing-mem-pill, body:not([data-depth="flat"]) .cc-idea{
  background:linear-gradient(180deg,var(--card-hi),var(--card-lo)); box-shadow:var(--pill);
  transition:transform .1s var(--spring), box-shadow .12s ease, color .12s ease, border-color .12s ease}
body:not([data-depth="flat"]) .cc-idea{border-width:.5px}
body:not([data-depth="flat"]) .cplus-btn:hover, body:not([data-depth="flat"]) .ing-mem-pill:hover, body:not([data-depth="flat"]) .cc-idea:hover{
  transform:translateY(-2px); box-shadow:var(--pill-hi)}
body:not([data-depth="flat"]) .cplus-btn:active, body:not([data-depth="flat"]) .ing-mem-pill:active, body:not([data-depth="flat"]) .cc-idea:active{
  transform:translateY(1px) scale(.97); box-shadow:var(--seat); transition-duration:.05s}
body:not([data-depth="flat"]) .cplus-btn.rec{background:var(--card-hi)}
body:not([data-depth="flat"]) #lx7 .l-btn.quiet{border-color:var(--l-hair);background:linear-gradient(var(--l-a),var(--l-b));box-shadow:var(--pill)}
body:not([data-depth="flat"]) #lx7 .l-btn.quiet:hover:not(:disabled){transform:translateY(-2px);text-decoration:none;box-shadow:var(--pill-hi)}
body:not([data-depth="flat"]) #lx7 .l-btn.quiet:active:not(:disabled){transform:translateY(1px) scale(.97);box-shadow:var(--seat);transition-duration:.05s}
body:not([data-depth="flat"]) .hx .hx-btn.quiet{border-color:var(--x-hair);background:linear-gradient(var(--x-a),var(--x-b));box-shadow:var(--pill)}
body:not([data-depth="flat"]) .hx .hx-btn.quiet:hover{transform:translateY(-2px);text-decoration:none;box-shadow:var(--pill-hi)}
body:not([data-depth="flat"]) .hx .hx-btn.quiet:active{transform:translateY(1px) scale(.97);box-shadow:var(--seat);transition-duration:.05s}
/* the press: down at once, back up on the spring (the family's 0.05 s press) */
.btn:active, .btn.ghost:active, .seg-btn:active, .quick:active, .msg-act:active, .aib-model:active, .chat-sess .btn:active,
.tab-tool:active, .chat-top-key:active, .chat-menu .menu-btn.menu-key:active{transition-duration:.05s}
.btn:not(.primary):active, .quick:active{transform:translateY(1px) scale(.98)}
@media (prefers-reduced-motion: reduce){
  .cl-key, .cl-chev, .chat-top-key, .btn, .quick, .cplus-btn, .ing-mem-pill, .cc-idea, #lx7 .l-btn.quiet, .hx .hx-btn.quiet{transition:none}
  body:not([data-depth="flat"]) .cplus-btn:hover, body:not([data-depth="flat"]) .ing-mem-pill:hover, body:not([data-depth="flat"]) .cc-idea:hover,
  body:not([data-depth="flat"]) .cplus-btn:active, body:not([data-depth="flat"]) .ing-mem-pill:active, body:not([data-depth="flat"]) .cc-idea:active,
  body:not([data-depth="flat"]) #lx7 .l-btn.quiet:hover:not(:disabled), body:not([data-depth="flat"]) #lx7 .l-btn.quiet:active:not(:disabled),
  body:not([data-depth="flat"]) .hx .hx-btn.quiet:hover, body:not([data-depth="flat"]) .hx .hx-btn.quiet:active{transform:none}
  body:not([data-depth="flat"]) button.cl-key:active, body:not([data-depth="flat"]) .cl-chev:active, body:not([data-depth="flat"]) .chat-top-key:active,
  .btn:not(.primary):active, .quick:active{transform:none}}
body[data-motion="minimal"] .cl-key:active, body[data-motion="minimal"] .cl-chev:active, body[data-motion="minimal"] .chat-top-key:active,
body[data-motion="minimal"] .btn:active, body[data-motion="minimal"] .quick:active,
body[data-motion="minimal"] .cplus-btn:hover, body[data-motion="minimal"] .ing-mem-pill:hover, body[data-motion="minimal"] .cc-idea:hover,
body[data-motion="minimal"] .cplus-btn:active, body[data-motion="minimal"] .ing-mem-pill:active, body[data-motion="minimal"] .cc-idea:active,
body[data-motion="minimal"] #lx7 .l-btn.quiet:hover:not(:disabled), body[data-motion="minimal"] #lx7 .l-btn.quiet:active:not(:disabled),
body[data-motion="minimal"] .hx .hx-btn.quiet:hover, body[data-motion="minimal"] .hx .hx-btn.quiet:active{transform:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p247"]="started";}catch(_){}
/* R247 · elevated keys: the recipe goes into the head, ahead of the Author Studio's look (the styles above say why) */
(function r247(){
"use strict";
if(window.__r247)return;window.__r247=1;
var D=document;
function place(){var tok=D.getElementById("r247-tok");if(!tok||!D.head)return;
  var au=D.getElementById("auLook");
  if(au&&au.parentNode===D.head){if(tok.nextSibling!==au)D.head.insertBefore(tok,au);}
  else if(tok.parentNode!==D.head)D.head.appendChild(tok);}
try{place();}catch(e){}
window.IngWeight={place:place};
})();
;try{window.__ingParts["p247"]="running";}catch(_){}
</script>
