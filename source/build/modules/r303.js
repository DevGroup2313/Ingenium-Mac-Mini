<style id="r303-css">
/* ============ R303 · SCHEDAE'S KEYS, INGENIUM'S OWN (Ingenium 7.15, 15 November 2026) ============
   Her words (15 November 2026): "The purple keys inside of Schedae's panels look really glossy and buttery and have a different texture
   and animation than the rest of Ingenium's buttons, I want to fix that discrepancy as well please. I also need you to give the Tabula
   and the Abacus buttons inside of Schedae's panel their proper app button black and green jeweled brick look instead of the plain
   purple keys that they currenlty have, please make the fix."
   Schedae's keys were made to the Forge's recipe (R17, R19 in the base page): a lavender face with a bright lip and four casts, a lift of
   three pixels, and rows that pop in one after another; its Tabula and Abacus keys were plain small keys; New note was an amethyst stone.
   So, when the panel and a note's menu are made (base: openSchedae, the note's menu), their keys take Ingenium's own classes: Pin, Send
   to Tabula and the menu's rows the raised white key (.btn), Delete the red one (.btn.danger), New note the purple key (.btn.primary),
   with Ingenium's face, depth and motion; Tabula and Abacus become their own cut stones (.gem-go.tabula, .gem-go.abacus: charcoal and
   green, with the sparkle at their corners), as the side list's apps are. What each key does is unchanged. */
#schedaePanel .sch-head .btn.sch-new{flex:0 0 auto}
#schedaePanel .sch-go{gap:0}
#schedaePanel .sch-go > .gem-go{flex:1 1 0;min-width:0;height:34px;display:flex;align-items:center;justify-content:center;padding:0 12px}
#schedaePanel .sch-go > .gem-go + .gem-go{margin-left:8px}
#schedaePanel .sch-acts{gap:0}
#schedaePanel .sch-acts > .btn + .btn{margin-left:6px}
#schedaePanel .sch-acts > .btn.danger{margin-left:auto}
#schedaePanel .sch-acts > .sch-btn + .sch-btn{margin-left:6px}   /* 7.33: their own keys again, spaced as before */
#schedaePanel .sch-acts > .sch-btn.del{margin-left:auto}
.sn-menu .sn-row{display:flex;width:100%;justify-content:flex-start;text-align:left;margin-top:6px;box-sizing:border-box}
.sn-menu .sn-row:first-of-type{margin-top:8px}
/* 7.33: Schedae's own keys brought back (her words, 17 November 2026: "I want you to restore the colours of the buttons on the Schedae
   panel, I only asked for the texture to be fixed not to strip the buttons of all colours and leave the panel flat and looking plain";
   then "The colours still look off and really different. Please bring back the other buttons back and just make them less glossy and
   more 3D and remove the light effect when I hover over them"). Pin, Send to Tabula, Delete and a note's menu rows are their own keys
   again (the base page's .sch-btn and .menu-btn: their lavender face, violet words, size and corners), only less glossy (no bright white
   lip, no inner glow) and more 3D (a solid edge under each, as Ingenium's keys have, and a deeper fall), and under the pointer they only
   lift, with no light. New note keeps Ingenium's purple key, and Tabula and Abacus their stones. */
#schedaePanel .sch-btn,.sn-menu .menu-btn{
  box-shadow:inset 0 1px 0 rgba(255,255,255,.30),inset 0 -1.5px 0 rgba(60,30,90,.14),0 2px 0 rgba(60,30,110,.30),0 4px 5px rgba(40,20,70,.18),0 9px 14px rgba(40,20,70,.10);
  transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s ease;filter:none;
  animation-fill-mode:backwards}   /* their rising-in held them still afterwards (fill both); now the lift under the pointer works */
#schedaePanel .sch-btn:hover,.sn-menu .menu-btn:hover{transform:translateY(-2px);filter:none;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.30),inset 0 -1.5px 0 rgba(60,30,90,.14),0 3px 0 rgba(60,30,110,.30),0 6px 8px rgba(40,20,70,.20),0 13px 20px rgba(40,20,70,.12)}
#schedaePanel .sch-btn:not(.del):hover,.sn-menu .menu-btn:not(.danger):hover{background:var(--accent-soft);color:var(--accent);border-color:var(--accent-soft)}
#schedaePanel .sch-btn:active,.sn-menu .menu-btn:active{transform:translateY(1px);transition-duration:.05s;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 1px 0 rgba(60,30,110,.30),0 2px 3px rgba(40,20,70,.16)}
body[data-theme="night"] #schedaePanel .sch-btn,body[data-theme="night"] .sn-menu .menu-btn{
  box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.35),0 2px 0 rgba(0,0,0,.62),0 4px 6px rgba(0,0,0,.42),0 9px 14px rgba(0,0,0,.30)}
body[data-theme="night"] #schedaePanel .sch-btn:hover,body[data-theme="night"] .sn-menu .menu-btn:hover{
  box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.35),0 3px 0 rgba(0,0,0,.62),0 7px 10px rgba(0,0,0,.48),0 14px 22px rgba(0,0,0,.34)}
body[data-theme="night"] #schedaePanel .sch-btn:active,body[data-theme="night"] .sn-menu .menu-btn:active{box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 1px 0 rgba(0,0,0,.62),0 2px 3px rgba(0,0,0,.4)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p303"]="started";}catch(_){}
/* R303 · Schedae's keys, Ingenium's own: see the note at the top of its styles */
(function(){"use strict";
if(window.__r303)return;window.__r303=1;
var D=document;
function swap(el,from,to){if(!el)return;from.forEach(function(c){el.classList.remove(c);});to.forEach(function(c){el.classList.add(c);});}
/* the panel: its title's key, the two stones, each note's keys */
function dressPanel(p){if(!p||p.__r303)return;p.__r303=1;
  var nn=p.querySelector(".sch-head .gem-go.newnote");if(nn)swap(nn,["gem-go","newnote"],["btn","small","primary","sch-new"]);
  [].forEach.call(p.querySelectorAll(".sch-go > button"),function(b){var t=(b.textContent||"").replace(/^\s*→\s*/,"").trim();
    if(/^Tabula$/i.test(t)){swap(b,["btn","xs"],["gem-go","tabula"]);b.textContent="Tabula";b.setAttribute("aria-label","Open Tabula");}
    else if(/^Abacus$/i.test(t)){swap(b,["btn","xs"],["gem-go","abacus"]);b.textContent="Abacus";b.setAttribute("aria-label","Open Abacus");}});
  /* 7.33: Pin, Send to Tabula and Delete keep their own keys (.sch-btn), less glossy and more 3D (see the style above) */}
/* a note's menu: its rows */
function dressMenu(m){if(!m||m.__r303)return;m.__r303=1;
  /* 7.33: its rows keep their own keys (.menu-btn), less glossy and more 3D (see the style above) */}
function look(n){if(!n||n.nodeType!==1)return;
  if(n.id==="schedaePanel")dressPanel(n);else{var p=n.querySelector&&n.querySelector("#schedaePanel");if(p)dressPanel(p);}
  if(n.classList&&n.classList.contains("sn-menu"))dressMenu(n);else{var m=n.querySelector&&n.querySelector(".sn-menu");if(m)dressMenu(m);}}
/* both are made and put on the page whole (the base page appends their backdrop to <body>): watched there, before they are painted */
try{new MutationObserver(function(ms){ms.forEach(function(r){[].forEach.call(r.addedNodes,look);});}).observe(D.body,{childList:true});}catch(e){}
try{var p0=D.getElementById("schedaePanel");if(p0)dressPanel(p0);}catch(e){}
window.IngSchedaeKeys={dressPanel:dressPanel,dressMenu:dressMenu};
try{window.__ingParts["p303"]="running";}catch(_){}
})();
</script>
