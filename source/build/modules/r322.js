<style id="r322-css">
/* ============ R322 · RAISED SLIDERS, EVERYWHERE IN INGENIUM (Ingenium 7.39, 18 November 2026) ============
   Her words (18 November 2026): "I want the sliders to be 3D and not look so flat." Her approval of the live preview
   (https://claude.ai/artifact/Le3ujQHWeH9srAcrJ9T3kr, source/previews/sliders_3d): "I approve of the preview".
   Before: every slider was the browser's own (input type=range) in Ingenium's violet: a thin line and a plain circle. Now every slider
   is a groove shaded inside as if cut into the card, a violet fill lit along its top edge up to its value, and a pearl with a shadow and
   a small violet jewel at its centre, which rises under the pointer and presses in when held; at rest each keeps its look. Effort's
   five levels (the Models page's settings) show as small stops under its groove. Day and night. Nothing else on the page changes. */
:root{
  --r3-groove:linear-gradient(#e4dced,#efe9f5);
  --r3-groove-sh:inset 0 2px 3px rgba(40,22,68,.28),inset 0 -1px 0 rgba(255,255,255,.9),0 1px 0 rgba(255,255,255,.95);
  --r3-gel-a:#8d66d6;--r3-gel-b:#5d37a1;
  --r3-gel-sh:inset 0 1px 0 rgba(255,255,255,.42),inset 0 -1px 0 rgba(30,10,60,.3),0 1px 2px rgba(52,24,100,.35);
  --r3-pearl:radial-gradient(circle at 36% 30%,#ffffff 0 18%,#f4f0fa 40%,#ddd3ec 78%,#c9bcdf 100%);
  --r3-pearl-line:rgba(60,30,90,.22);
  --r3-pearl-sh:inset 0 -2px 3px rgba(60,30,90,.18),0 1px 1px rgba(40,20,70,.35),0 3px 5px rgba(40,20,70,.25),0 7px 12px rgba(40,20,70,.16);
  --r3-pearl-hi:inset 0 -2px 3px rgba(60,30,90,.16),0 2px 2px rgba(40,20,70,.3),0 6px 10px rgba(40,20,70,.26),0 13px 20px rgba(40,20,70,.18);
  --r3-jewel:radial-gradient(circle at 50% 50%,#b79ce6 0 1.2px,#6a3fb5 2.6px,rgba(106,63,181,0) 3.6px);
  --r3-stop:rgba(40,22,68,.28);--r3-ring:#6a3fb5;--r3-label:#6c6579}
body[data-theme="night"]{
  --r3-groove:linear-gradient(#120d1a,#1b1526);
  --r3-groove-sh:inset 0 2px 4px rgba(0,0,0,.7),inset 0 -1px 0 rgba(255,255,255,.05),0 1px 0 rgba(255,255,255,.06);
  --r3-gel-a:#9a76de;--r3-gel-b:#5b3aa1;
  --r3-gel-sh:inset 0 1px 0 rgba(255,255,255,.3),inset 0 -1px 0 rgba(0,0,0,.4),0 1px 3px rgba(0,0,0,.6);
  --r3-pearl:radial-gradient(circle at 36% 30%,#f2ecfb 0 14%,#cfc2e6 42%,#9d8cbd 80%,#7d6c9e 100%);
  --r3-pearl-line:rgba(0,0,0,.45);
  --r3-pearl-sh:inset 0 -2px 3px rgba(0,0,0,.3),0 1px 1px rgba(0,0,0,.7),0 3px 5px rgba(0,0,0,.55),0 7px 12px rgba(0,0,0,.4);
  --r3-pearl-hi:inset 0 -2px 3px rgba(0,0,0,.28),0 2px 2px rgba(0,0,0,.65),0 6px 10px rgba(0,0,0,.55),0 13px 20px rgba(0,0,0,.42);
  --r3-jewel:radial-gradient(circle at 50% 50%,#e1d3fb 0 1.2px,#7a56c8 2.6px,rgba(122,86,200,0) 3.6px);
  --r3-stop:rgba(233,227,243,.3);--r3-ring:#b79ce6;--r3-label:#a99cc1}
input[type=range]{-webkit-appearance:none;appearance:none;height:26px;margin-top:0;margin-bottom:0;background:transparent;cursor:pointer;accent-color:auto}
input[type=range]:focus{outline:none}
input[type=range]::-webkit-slider-runnable-track{height:10px;border-radius:999px;box-shadow:var(--r3-groove-sh);
  background:linear-gradient(180deg,var(--r3-gel-a),var(--r3-gel-b)) 0 0/var(--r3-p,0%) 100% no-repeat,var(--r3-groove)}
input[type=range]::-moz-range-track{height:10px;border-radius:999px;background:var(--r3-groove);box-shadow:var(--r3-groove-sh)}
input[type=range]::-moz-range-progress{height:10px;border-radius:999px;background:linear-gradient(180deg,var(--r3-gel-a),var(--r3-gel-b));box-shadow:var(--r3-gel-sh)}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:22px;height:22px;margin-top:-6px;border-radius:50%;border:1px solid var(--r3-pearl-line);
  background:var(--r3-jewel),var(--r3-pearl);box-shadow:var(--r3-pearl-sh);transition:transform .25s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
input[type=range]::-moz-range-thumb{width:22px;height:22px;border-radius:50%;border:1px solid var(--r3-pearl-line);
  background:var(--r3-jewel),var(--r3-pearl);box-shadow:var(--r3-pearl-sh);transition:transform .25s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
input[type=range]:hover:not(:disabled)::-webkit-slider-thumb{transform:translateY(-1.5px) scale(1.1);box-shadow:var(--r3-pearl-hi)}
input[type=range]:hover:not(:disabled)::-moz-range-thumb{transform:translateY(-1.5px) scale(1.1);box-shadow:var(--r3-pearl-hi)}
input[type=range]:active:not(:disabled)::-webkit-slider-thumb{transform:scale(.96);box-shadow:var(--r3-pearl-sh)}
input[type=range]:active:not(:disabled)::-moz-range-thumb{transform:scale(.96);box-shadow:var(--r3-pearl-sh)}
input[type=range]:focus-visible::-webkit-slider-thumb{outline:3px solid var(--r3-ring);outline-offset:2px}
input[type=range]:focus-visible::-moz-range-thumb{outline:3px solid var(--r3-ring);outline-offset:2px}
input[type=range]:disabled{cursor:default;opacity:.55}
/* Effort's five levels, as small stops under its groove (the pearl's centre runs 11 pixels in from each end) */
.r3-stops{position:relative;height:16px;margin:-2px 11px 0;pointer-events:none}
.r3-stops i{position:absolute;top:2px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--r3-stop)}
.r3-stops span{position:absolute;top:7px;transform:translateX(-50%);font:600 10.5px/1 var(--sans,system-ui,sans-serif);color:var(--r3-label);white-space:nowrap}
@media (prefers-reduced-motion: reduce){input[type=range]::-webkit-slider-thumb,input[type=range]::-moz-range-thumb{transition:none}
  input[type=range]:hover:not(:disabled)::-webkit-slider-thumb,input[type=range]:hover:not(:disabled)::-moz-range-thumb{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p322"]="started";}catch(_){}
/* R322 · raised sliders: the violet fill follows each slider's value, whether she moves it or the page sets it. window.IngSliders */
(function r322(){
"use strict";
if(window.IngSliders)return;
var W=window,D=document,EFF=["Low","Medium","High","Extra","Max"];
function show(i){try{if(!i||i.type!=="range")return;var mn=+i.min||0,mx=i.max===""?100:+i.max,v=+i.value,p=mx>mn?Math.max(0,Math.min(100,(v-mn)/(mx-mn)*100)):0;
  var t=p.toFixed(2)+"%";if(i.__r3!==t){i.__r3=t;i.style.setProperty("--r3-p",t);}
  if(/Effort$/.test(i.id||"")&&+i.min===1&&+i.max===5&&!i.__r3s)stops(i);
  if(i.id==="emEffort")setTimeout(function(){name(i);fit(i);},0);else if(i.__r3row)fit(i);}catch(e){}}
/* the Models page's settings named the five levels "Very light" to "Very careful"; everywhere else they are Low to Max (r249, r321) */
function name(i){var v=D.getElementById("emEffortV"),n=EFF[(+i.value||3)-1];if(v&&n&&v.textContent!==n)v.textContent=n;}
/* the five stops, once, under an Effort slider */
function stops(i){var host=i.parentNode;if(!host||i.style.display==="none"||!i.offsetWidth)return;   /* placed once it is shown */
  var row=false;try{var cs=getComputedStyle(host);row=/flex|grid/.test(cs.display)&&!/column/.test(cs.flexDirection||"");}catch(e){}
  var at=row?host:i,nx=at.nextElementSibling;i.__r3s=1;if(nx&&nx.classList&&nx.classList.contains("r3-stops"))return;
  var s=D.createElement("div");s.className="r3-stops";s.setAttribute("aria-hidden","true");
  EFF.forEach(function(n,k){var x=(k/4*100)+"%",d=D.createElement("i"),l=D.createElement("span");d.style.left=x;l.style.left=x;l.textContent=n;s.appendChild(d);s.appendChild(l);});
  at.parentNode.insertBefore(s,at.nextSibling);if(row){i.__r3row=[host,s];fit(i);}}
/* in a row beside its value, the stops follow the slider's own width and place */
function fit(i){var r=i.__r3row;if(!r||!r[1].isConnected||!i.offsetWidth)return;var a=i.getBoundingClientRect(),h=r[0].getBoundingClientRect(),
  w=Math.max(0,a.width-22)+"px",m=Math.round(a.left-h.left+11)+"px";if(r[1].style.width!==w)r[1].style.width=w;if(r[1].style.marginLeft!==m)r[1].style.marginLeft=m;}
function all(){try{[].forEach.call(D.querySelectorAll('input[type="range"]'),show);}catch(e){}}
/* moved by her */
D.addEventListener("input",function(e){show(e.target);},true);
D.addEventListener("change",function(e){show(e.target);},true);
/* set by the page (a model's own numbers put back, a reset): the value's own setter, kept as it was, then the fill */
try{var P=HTMLInputElement.prototype,dv=Object.getOwnPropertyDescriptor(P,"value");
  if(dv&&dv.set&&!dv.set.__r322){var ns=function(v){dv.set.call(this,v);if(this.type==="range")show(this);};ns.__r322=1;
    Object.defineProperty(P,"value",{configurable:true,enumerable:dv.enumerable,get:dv.get,set:ns});}
  ["min","max"].forEach(function(k){var d=Object.getOwnPropertyDescriptor(P,k);if(d&&d.set&&!d.set.__r322){var s2=function(v){d.set.call(this,v);if(this.type==="range")show(this);};s2.__r322=1;
    Object.defineProperty(P,k,{configurable:true,enumerable:d.enumerable,get:d.get,set:s2});}});}catch(e){}
/* new sliders as they appear (a card painted, a dialog opened), and a slow sweep for anything else */
try{new MutationObserver(function(ms){for(var a=0;a<ms.length;a++){var n=ms[a].addedNodes;for(var b=0;b<n.length;b++){var x=n[b];if(x.nodeType!==1)continue;
  if(x.tagName==="INPUT")show(x);else if(x.querySelector&&x.querySelector('input[type="range"]'))[].forEach.call(x.querySelectorAll('input[type="range"]'),show);}}})
  .observe(D.documentElement,{childList:true,subtree:true});}catch(e){}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",all);else all();
setInterval(function(){if(!D.hidden&&!(W.IngStill&&IngStill.on()))all();},1500);   /* 7.40: not at rest (r324) */
W.addEventListener("resize",all);
W.IngSliders={version:1,show:show,all:all};
})();
;try{window.__ingParts["p322"]="running";}catch(_){}
</script>
