<style id="r189-css">
/* ============ R189 · THE COLOPHON: EVERY PAGE ENDS, AND ABOUT SAYS WHO MADE IT (Ingenium 6.8.10, 28 October 2026) ============
   The owner's words (28 October 2026): "I want the copyrights and authorship line of "Designed and built by Yannie D. Forest
   · © 2026 Yannie D. Forest" placed at the bottom of the app's display page as well as the About panel like it is done on
   Carpe Diem. I want the app's page to not just abruptly end."
   Carpe Diem closes its page with a colophon (its seal, its name, a fine rule with one word, and the rights) and its About
   with "Designed and built by" over the copyright. Ingenium now does the same, in its own colours: under the last card of
   each page that scrolls (Home, Focus, Models, Blend, Build, Schedae's notes, the Guide, Settings) stand its seal, its name,
   a fine rule with LOCAL MODEL STUDIO, and the line in her words. The rooms that fill the window (Chat, Code, Lector,
   Career, Fabrica, and the apps on the Desk) keep the whole window. About ends with the same two lines as Carpe Diem's. */
#ingColophon{display:none;max-width:1300px;margin:60px auto 0;padding:34px 20px 30px;border-top:.5px solid var(--hairline);text-align:center}
#ingColophon[data-on="1"]{display:block}
#ingColophon .icol-seal{display:block;width:46px;height:46px;margin:0 auto 12px}
#ingColophon .icol-word{font:700 19px/1.2 "Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,"Times New Roman",serif;letter-spacing:.04em;color:var(--ink-1)}
#ingColophon .icol-rule{display:flex;align-items:center;justify-content:center;gap:10px;margin:10px auto 14px}
#ingColophon .icol-rule i{display:block;width:58px;height:1px;background:var(--accent);opacity:.5}
#ingColophon .icol-rule span{font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--accent)}
#ingColophon .icol-credit{font-size:11.5px;letter-spacing:.02em;color:var(--ink-3)}
.ab-credit{margin-top:22px;padding-top:14px;border-top:.5px solid var(--hairline);text-align:center}
.ab-credit .ab-by{font-size:11.5px;font-weight:500;letter-spacing:.03em;color:var(--accent)}
.ab-credit .ab-rights{margin-top:4px;font-size:10.5px;letter-spacing:.02em;color:var(--ink-3)}
@media print{#ingColophon{display:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p189"]="started";}catch(_){}
(function(){"use strict";
var BY="Designed and built by Yannie D. Forest",RIGHTS="© 2026 Yannie D. Forest";
/* the pages that scroll; the others fill the window */
var SCROLLS={"page-home":1,"page-focus":1,"page-models":1,"page-blend":1,"page-build":1,"page-notes":1,"page-guide":1,"page-settings":1};
var foot=null,seal=null;
function night(){return document.body.getAttribute("data-theme")==="night";}
function drawSeal(){try{if(!seal||typeof drawIngeniumSeal!=="function")return;var d=Math.max(1,Math.min(3,window.devicePixelRatio||1)),s=Math.round(46*d);
  if(seal.width!==s){seal.width=s;seal.height=s;}drawIngeniumSeal(seal,{night:night()});}catch(e){}}
function name(){var n=document.getElementById("footName");return (n&&n.textContent.trim())||"Ingenium";}
function make(){var main=document.querySelector("main.main");if(!main)return null;
  foot=document.getElementById("ingColophon");
  if(!foot){foot=document.createElement("footer");foot.id="ingColophon";
    foot.innerHTML='<canvas class="icol-seal" aria-hidden="true"></canvas><div class="icol-word"></div><div class="icol-rule" aria-hidden="true"><i></i><span>Local model studio</span><i></i></div><div class="icol-credit"></div>';
    foot.querySelector(".icol-credit").textContent=BY+"  ·  "+RIGHTS;}
  if(foot.parentNode!==main||main.lastElementChild!==foot)main.appendChild(foot);
  seal=foot.querySelector(".icol-seal");return foot;}
function place(){try{if(!make())return;var a=document.querySelector("main.main > .section.active");
  var on=!!(a&&SCROLLS[a.id]&&!document.body.classList.contains("ing-desk-on"));
  foot.setAttribute("data-on",on?"1":"0");var w=foot.querySelector(".icol-word");if(w.textContent!==name())w.textContent=name();
  if(on)drawSeal();}catch(e){}}
/* About ends with who made it, as Carpe Diem's does */
function credit(){try{var box=document.getElementById("modalBox");if(!box||!box.querySelector("#abVersion")||box.querySelector(".ab-credit"))return;
  var close=box.querySelector("#aClose");var row=close&&close.parentNode;if(!row||row.parentNode!==box)return;
  var c=document.createElement("div");c.className="ab-credit";c.innerHTML='<div class="ab-by"></div><div class="ab-rights"></div>';
  c.firstChild.textContent=BY;c.lastChild.textContent=RIGHTS;box.insertBefore(c,row);}catch(e){}}
function start(){place();
  var g=window.go;if(typeof g==="function"&&!g.__r189){window.go=function(){var r=g.apply(this,arguments);place();return r;};window.go.__r189=1;}
  try{[].forEach.call(document.querySelectorAll("main.main > .section"),function(s){new MutationObserver(place).observe(s,{attributes:true,attributeFilter:["class"]});});}catch(e){}
  try{new MutationObserver(function(){place();drawSeal();}).observe(document.body,{attributes:true,attributeFilter:["data-theme","class"]});}catch(e){}
  try{var box=document.getElementById("modalBox");if(box)new MutationObserver(credit).observe(box,{childList:true});}catch(e){}
  try{var fn=document.getElementById("footName");if(fn)new MutationObserver(place).observe(fn,{childList:true,characterData:true,subtree:true});}catch(e){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
window.addEventListener("load",function(){place();setTimeout(place,1500);});
window.IngColophon={place:place,credit:credit,el:function(){return foot;}};
})();
;try{window.__ingParts["p189"]="running";}catch(_){}
</script>
