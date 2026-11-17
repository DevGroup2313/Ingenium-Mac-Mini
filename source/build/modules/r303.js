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
#schedaePanel .sch-acts{gap:0}
#schedaePanel .sch-acts > .btn + .btn{margin-left:6px}
#schedaePanel .sch-acts > .btn.danger{margin-left:auto}
#schedaePanel .sch-acts > .sch-btn + .sch-btn{margin-left:6px}   /* 7.33: their own keys again, spaced as before */
#schedaePanel .sch-acts > .sch-btn.del{margin-left:auto}
.sn-menu .sn-row{display:flex;width:100%;justify-content:flex-start;text-align:left;margin-top:6px;box-sizing:border-box}
.sn-menu .sn-row:first-of-type{margin-top:8px}
/* 7.33: Schedae's own keys, as they were in 7.14 (her words, 17 November 2026: "I want you to restore the colours of the buttons on the
   Schedae panel ..."; then, shown 7.14's panel beside the test copy: "Bring the old look back with the gold jewelled new note button and
   the glossy look. They looked better that way."). New note is the amethyst stone with its gold rim again, and Pin, Send to Tabula,
   Delete and a note's menu rows their own glossy keys (the base page's .gem-go.newnote, .sch-btn and .menu-btn, untouched). The two
   keys under the title (→ Tabula, → Abacus) are taken away, as she asked (see dressPanel).
   One thing only is mended: the keys' rising-in (fill both) held them
   still afterwards, so the lift their own hover gives never showed; it shows now. */
#schedaePanel .sch-btn,.sn-menu .menu-btn{animation-fill-mode:backwards}
#schedaePanel .sch-go{display:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p303"]="started";}catch(_){}
/* R303 · Schedae's keys, Ingenium's own: see the note at the top of its styles */
(function(){"use strict";
if(window.__r303)return;window.__r303=1;
var D=document;
function swap(el,from,to){if(!el)return;from.forEach(function(c){el.classList.remove(c);});to.forEach(function(c){el.classList.add(c);});}
/* the panel: its title's key, the two stones, each note's keys */
function dressPanel(p){if(!p||p.__r303)return;p.__r303=1;
  /* 7.33: New note stays the amethyst stone (.gem-go.newnote), as in 7.14 */
  /* 7.33: the two keys under the title (→ Tabula, → Abacus) are gone (her words, 17 November 2026: "Please remove the arrows to Tabula
     and Abacus buttons that are directly under the Schedae title on the panel"; asked which, she chose to remove both keys). Tabula and
     Abacus are still reached from the side list, and a note still goes to Tabula with its own Send to Tabula. */
  var go=p.querySelector(".sch-go");if(go)go.remove();
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
