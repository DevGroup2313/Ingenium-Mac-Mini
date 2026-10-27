<script>try{(window.__ingParts=window.__ingParts||{})["p105"]="started";}catch(_){}
/* ============ R184 · THE POPUP CARDS, RAISED AND QUIETER (Ingenium 6.8.1, 27 October 2026) ============
   The owner's words (27 October 2026): "I still don't like the bright harsh look of the popup cards and notifications inside
   of Ingenium, the purple colour is too bight and harsh on both light and dark mode, I also think the popup cards are too
   flat, I want them to gain that weighted animated popped out 3D look and animation that the rest of the app has, please
   match the thoughts bubble card or something similar."
   Every card that pops up is now built as the thought card is: a face lit from above, a lit top and left edge, a darker wall
   along its right and its foot, a fine rim and a shadow that falls under it, so it stands off the page; and it arrives as
   the thought card does, rising a little and settling with a small spring (still, when motion is set to minimal or the
   device asks for less). Its purple is quieter: by day a deep, greyed amethyst for its keys, by night a deep, greyed amethyst face (still
   purple, never a plum that reads as black) with soft lavender keys, never the bright violet.
   The cards: the support notes, the tour's card, the status menu, About and the other dialogs, the Help and Display panels,
   a window's menu, the storage and sound dialogs, Lector's recipe, and the reminder card's night face (r153).
   The note at the foot of the page ("Saved", and the other short notes) stays flat, as it was. The owner's words (27 October
   2026): "The "Saved. Your documents is kept on this device." cards can be exempted from the 3D look and remain flat." */
(function(){"use strict";
if(window.__r184)return;window.__r184=1;
var CARDS="#sc-toast,.tour-card,.pres-menu,#modalBox,#ihPanel,#displayPanel,#ing-export-choice,.isc-box,#lxRx .rx-card";
function sel(suffix,pre){return CARDS.split(",").map(function(s){return (pre||"")+s+suffix;}).join(",");}
var css=[
 ':root{--rc-face-a:#ffffff;--rc-face-b:#f7f5fa;--rc-wall:#d3cbe0;--rc-rim:rgba(40,22,68,.10);--rc-fam:40,22,68;--rc-ink:#221a2e;--rc-soft:rgba(70,58,92,.74);',
 '--rc-acc:#5b4690;--rc-acc-hi:#6a56a0;--rc-acc-lo:#4c3a7c;--rc-acc-edge:#352858;--rc-on-acc:#ffffff;--rc-line:rgba(91,70,144,.40);',
 '--rc-slab:inset 0 2px 0 rgba(255,255,255,.72),inset 2px 0 0 rgba(255,255,255,.42),inset -2px 0 0 var(--rc-wall),inset 0 -3px 0 var(--rc-wall),0 0 0 1px var(--rc-rim),0 2px 3px rgba(var(--rc-fam),.10),0 9px 12px -7px rgba(var(--rc-fam),.18),0 22px 40px -14px rgba(var(--rc-fam),.24);',
 '--rc-key:inset 0 1px 0 rgba(255,255,255,.22),inset 0 -2px 0 rgba(0,0,0,.18),0 0 0 .5px var(--rc-acc-edge),0 2px 0 var(--rc-acc-edge),0 4px 6px rgba(var(--rc-fam),.20),0 9px 14px rgba(var(--rc-fam),.12);',
 '--rc-key-hi:inset 0 1px 0 rgba(255,255,255,.26),inset 0 -2px 0 rgba(0,0,0,.18),0 0 0 .5px var(--rc-acc-edge),0 3px 0 var(--rc-acc-edge),0 6px 9px rgba(var(--rc-fam),.22),0 13px 20px rgba(var(--rc-fam),.14);',
 '--rc-seat:inset 0 2px 5px rgba(0,0,0,.30),0 0 0 .5px var(--rc-acc-edge),0 1px 1px rgba(var(--rc-fam),.18)}',
 'body[data-theme="night"]{--rc-face-a:#342a4c;--rc-face-b:#2c2341;--rc-wall:#140e1c;--rc-rim:rgba(205,184,240,.11);--rc-ink:#ece6f6;--rc-soft:rgba(236,230,246,.72);',
 '--rc-acc:#6b5a96;--rc-acc-hi:#7867a3;--rc-acc-lo:#5b4b84;--rc-acc-edge:#2f2547;--rc-on-acc:#ffffff;--rc-line:rgba(190,170,230,.34);',
 '--rc-slab:inset 0 2px 0 rgba(255,255,255,.10),inset 2px 0 0 rgba(255,255,255,.05),inset -2px 0 0 var(--rc-wall),inset 0 -3px 0 var(--rc-wall),0 0 0 1px var(--rc-rim),0 2px 3px rgba(0,0,0,.40),0 9px 12px -7px rgba(0,0,0,.50),0 22px 40px -14px rgba(0,0,0,.55);',
 '--rc-key:inset 0 1px 0 rgba(255,255,255,.14),inset 0 -2px 0 rgba(0,0,0,.40),0 0 0 .5px rgba(205,184,240,.12),0 2px 0 rgba(0,0,0,.70),0 4px 6px rgba(0,0,0,.45),0 9px 14px rgba(0,0,0,.32);',
 '--rc-key-hi:inset 0 1px 0 rgba(255,255,255,.16),inset 0 -2px 0 rgba(0,0,0,.40),0 0 0 .5px rgba(205,184,240,.14),0 3px 0 rgba(0,0,0,.72),0 6px 9px rgba(0,0,0,.48),0 13px 20px rgba(0,0,0,.36);',
 '--rc-seat:inset 0 2px 5px rgba(0,0,0,.55),0 1px 1px rgba(0,0,0,.40)}',
 /* the slab */
 CARDS+'{background:linear-gradient(180deg,var(--rc-face-a),var(--rc-face-b) 62%,color-mix(in srgb,var(--rc-face-b) 93%,var(--rc-wall))) !important;box-shadow:var(--rc-slab) !important;border-color:transparent !important;color:var(--rc-ink) !important}',
 '#sc-toast{border-radius:14px !important}',
 /* their keys: the quiet amethyst, raised, pressed in */
 sel(' .btn.primary')+'{background:linear-gradient(180deg,var(--rc-acc-hi),var(--rc-acc-lo)) !important;border:0 !important;color:var(--rc-on-acc) !important;box-shadow:var(--rc-key) !important;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s ease}',
 sel(' .btn.primary:hover')+'{transform:translateY(-1.5px);box-shadow:var(--rc-key-hi) !important}',
 sel(' .btn.primary:active')+'{transform:translateY(1.5px);box-shadow:var(--rc-seat) !important;transition-duration:.05s}',
 /* what they mark as chosen, and their focus, in the same quiet purple */
 sel(' [aria-pressed="true"]')+','+sel(' [aria-checked="true"]')+'{border-color:var(--rc-acc) !important;box-shadow:inset 0 0 0 1px var(--rc-acc),0 2px 6px rgba(var(--rc-fam),.14) !important}',
 sel(' :focus-visible')+'{outline:2px solid var(--rc-acc) !important;outline-offset:2px}',
 sel(' a')+'{color:var(--rc-acc)}'+sel(' a','body[data-theme="night"] ')+'{color:#c9b8ee}',
 /* their arrival: up a little, and settled with a small spring */
 '@keyframes rcIn{0%{opacity:0;translate:0 12px;scale:.955}62%{opacity:1;translate:0 -2px;scale:1.008}100%{opacity:1;translate:0 0;scale:1}}',
 '.tour-card,.tour-card.lively,.pres-menu,#modalBox,#ihPanel,#displayPanel,#ing-export-choice,.isc-box,#lxRx .rx-card{animation:rcIn .46s cubic-bezier(.22,.8,.3,1) both !important}',
 'body[data-motion="minimal"] .tour-card,body[data-motion="minimal"] .pres-menu,body[data-motion="minimal"] #modalBox,body[data-motion="minimal"] #ihPanel,body[data-motion="minimal"] #displayPanel,body[data-motion="minimal"] #ing-export-choice,body[data-motion="minimal"] .isc-box,body[data-motion="minimal"] #lxRx .rx-card{animation:none !important}',
 '@media (prefers-reduced-motion:reduce){.tour-card,.pres-menu,#modalBox,#ihPanel,#displayPanel,#ing-export-choice,.isc-box,#lxRx .rx-card{animation:none !important}}'].join("\n");
var st=document.createElement("style");st.id="r184-css";st.textContent=css;(document.head||document.documentElement).appendChild(st);
})();
;try{window.__ingParts["p105"]="running";}catch(_){}
</script>
