<style id="r155-css">
/* ============ R155 · THE SIDE KEYS ON A SHORT SCREEN ============
   Measured on 6.1, a phone held sideways (844 x 390): the six side keys and the chevron above them are placed for a tall
   window (the chevron 386 pixels up), so the bell sat over the Help key in the top bar and the chevron was above the window,
   out of reach: the keys could be laid down but never raised again. The owner wants the leaf in the column on every screen,
   as in the Forge (22 October 2026). Where the column fits, nothing changes. Where it does not, the keys come a little smaller
   (38 pixels, the glyphs to match) and closer, the lowest a little lower, so all six and the chevron stand between the top bar
   and the foot of the window. The Forge's column does the same (pass 644). */
html.ing-side-tight body .rail-btn.rail-btn{width:38px !important;height:38px !important;right:20px !important}
html.ing-side-tight body .rail-btn.rail-btn > span,html.ing-side-tight body #fabBell.rail-btn .bell{font-size:25px !important}
html.ing-side-tight body #railChevron#railChevron{width:38px !important;height:38px !important;right:20px !important;font-size:21px !important}
html.ing-side-tight body #railChevron#railChevron::before{top:3px;right:3px;bottom:3px;left:3px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p76"]="started";}catch(_){}
/* R155 · the side keys on a short screen: see the note at the top of its styles */
(function(){"use strict";
if(window.__r155)return;window.__r155=1;
/* from the foot up, as they stand: the notes, the Clepsydra, day or night, the 💭, the leaf, the bell; the chevron above */
var IDS=["fabNote","fabTimer","fabTheme","fabPark","fabQuiet","fabBell"],CHEV="railChevron",TIGHT="ing-side-tight";
var last="";
function $(id){return document.getElementById(id);}
function counted(e){if(!e)return false;var c=getComputedStyle(e);return c.display!=="none"&&c.visibility!=="hidden";}
function clear(){IDS.concat([CHEV]).forEach(function(id){var e=$(id);if(e&&e.style.getPropertyValue("bottom"))e.style.removeProperty("bottom");});
  document.documentElement.classList.remove(TIGHT);}
function fit(force){try{
  var keys=IDS.map($).filter(counted),ch=$(CHEV),top=document.querySelector(".topbar"),H=window.innerHeight||800;
  var hb=top&&counted(top)?Math.max(0,top.getBoundingClientRect().bottom):0,n=keys.length;
  var sig=H+"|"+Math.round(hb)+"|"+n+"|"+(window.innerWidth||0);if(!force&&sig===last)return;last=sig;
  if(n<2||!ch){clear();return;}
  /* the column as the page's own rules place it: is the chevron's top edge below the top bar? */
  var was=document.documentElement.classList.contains(TIGHT);if(was)clear();
  var cr=ch.getBoundingClientRect(),lowest=keys[0].getBoundingClientRect();
  if(cr.top>=hb+4&&lowest.bottom<=H){return;}
  /* it does not fit: smaller keys, closer, from the foot up */
  document.documentElement.classList.add(TIGHT);
  var kh=keys[0].getBoundingClientRect().height||38,chh=ch.getBoundingClientRect().height||38,safe=0;
  try{var pr=document.createElement("div");pr.style.cssText="position:fixed;bottom:0;height:env(safe-area-inset-bottom);visibility:hidden";document.body.appendChild(pr);safe=pr.getBoundingClientRect().height||0;pr.remove();}catch(e){}
  var room=H-hb-6-kh-4-chh,b0=Math.max(12+safe,Math.min(44+safe,room-(kh+3)*(n-1))),st=Math.max(kh+3,Math.min(56,(room-b0)/(n-1)));
  keys.forEach(function(e,i){e.style.setProperty("bottom",Math.round(b0+st*i)+"px","important");});
  ch.style.setProperty("bottom",Math.round(b0+st*(n-1)+kh+4)+"px","important");
}catch(e){try{console.warn("Ingenium side keys:",e&&e.message||e);}catch(_){}}}
window.addEventListener("resize",function(){fit(false);});
try{window.addEventListener("orientationchange",function(){setTimeout(function(){fit(true);},250);});}catch(e){}
/* a key that comes or goes (the desk, a window of its own) changes the count: looked at again every second, cheaply */
setInterval(function(){fit(false);},1000);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){fit(true);});else fit(true);
window.IngSideFit={fit:function(){fit(true);}};
})();
;try{window.__ingParts["p76"]="running";}catch(_){}
</script>
