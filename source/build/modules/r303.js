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
.sn-menu .sn-row{display:flex;width:100%;justify-content:flex-start;text-align:left;margin-top:6px;box-sizing:border-box}
.sn-menu .sn-row:first-of-type{margin-top:8px}
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
  [].forEach.call(p.querySelectorAll(".sch-acts .sch-btn"),function(b){var del=b.classList.contains("del");swap(b,["sch-btn","del"],del?["btn","xs","danger"]:["btn","xs"]);});}
/* a note's menu: its rows */
function dressMenu(m){if(!m||m.__r303)return;m.__r303=1;
  [].forEach.call(m.querySelectorAll(".menu-btn"),function(b){var del=b.classList.contains("danger");swap(b,["menu-btn","danger"],del?["btn","small","danger","sn-row"]:["btn","small","sn-row"]);});}
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
