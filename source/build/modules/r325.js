<style id="r325-css">
/* ============ R325 · THE CONTROLS KEY: ONE DISCREET KEY FOR REPLY, MEMORY AND EFFORT (Ingenium 7.41, 18 November 2026) ============
   Her words (18 November 2026): "The Tokens and Effort levels need to be folded away into one discreet button" (7.40 took them off the
   pages); on the live preview (https://claude.ai/artifact/S7Rwqc72usWw7Ly138jeSz, source/previews/v741): "I approve of the preview ...
   Please put the controls button next to the Learn button on the Vocatio page. You can put it next to the 'Bring one in' button on the
   Fabrica page." So: a small round key, a slider's mark on it, beside Vocatio's Learn tab and beside Fabrica's Bring one in; on Lector
   and Ingenia beside the page's title (the preview's second way). Pressed, it opens the sheet of modules/r321.js (Reply, Memory and Effort
   for the model that page uses, the same in every place). Chat keeps its own Controls key. At rest it keeps its look; under the pointer it
   lifts and turns a little; pressed, it sinks. */
.mk3{width:34px;height:34px;flex:0 0 auto;border-radius:50%;border:1px solid var(--hairline,rgba(34,26,46,.12));padding:0;cursor:pointer;display:inline-grid;place-items:center;
  color:#6a3fb5;background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f9f7fc));vertical-align:middle;
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.1);
  transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
.mk3:hover{transform:translateY(-2px) rotate(-8deg);box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12)}
.mk3:active{transform:translateY(1px) scale(.96)}
.mk3:focus-visible{outline:3px solid #6a3fb5;outline-offset:2px}
.mk3 svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;pointer-events:none}
.mk3[hidden]{display:none!important}
body[data-theme="night"] .mk3{color:#b79ce6;border-color:rgba(205,184,240,.14);background:linear-gradient(#2a2239,#251e33);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5)}
body[data-theme="night"] .mk3:focus-visible{outline-color:#b79ce6}
/* in a row of tabs or keys, it stands at their height, a little apart */
.rm-tabs > .mk3{align-self:center;margin-left:4px}
.skh-keys > .mk3{align-self:center;margin-left:2px}
.mk3-title{display:inline-flex;align-items:center;gap:12px}
@media (prefers-reduced-motion: reduce){.mk3{transition:none}.mk3:hover{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p325"]="started";}catch(_){}
/* R325 · the controls key: see the note at the top of its styles. window.IngModelKey */
(function r325(){
"use strict";
if(window.IngModelKey)return;
var W=window,D=document;
var SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2.2"/><circle cx="10" cy="17" r="2.2"/></svg>';
function chatKey(){try{return W.IngGen?IngGen.key():"none";}catch(e){return "none";}}
function pageKey(){var k="none";try{k=W.IngLimits&&IngLimits.pageKey?IngLimits.pageKey():"none";}catch(e){}return k&&k!=="none"?k:chatKey();}   /* a page with no model of its own yet: the one Chat uses */
/* where: the page, what it sits beside, how it is put there, and whose model it opens */
var PLACES=[
  {pg:"career",id:"mk3Vocatio",place:"Vocatio",key:pageKey,find:function(s){var row=s.querySelector(".rm-tabs");return row?{after:row.lastElementChild,row:row}:null;}},
  {pg:"fabrica",id:"mk3Fabrica",place:"Fabrica",key:chatKey,find:function(s){var row=s.querySelector(".skh-keys");if(!row)return null;var k=[].filter.call(row.children,function(x){return /Bring one in/.test(x.textContent);})[0]||row.lastElementChild;return {after:k,row:row};}},
  /* 7.42 (her words, 18 November 2026): "remove the controls button from next to the Lector and Ingenia page titles and place them in their
     appropriate places": in the row of the page's own keys, as on Fabrica: after Add your apps (Lector) and after Bring in your work (Ingenia) */
  {pg:"lector",id:"mk3Lector",place:"Lector",key:pageKey,find:function(s){return keysRow(s,/Add your apps/);}},
  {pg:"folders",id:"mk3Ingenia",place:"Folders",key:pageKey,find:function(s){return keysRow(s,/Bring in your work/);}}];
function keysRow(s,re){var k=[].filter.call(s.querySelectorAll(".skh-keys button,.skh-keys a"),function(x){return re.test(x.textContent)&&x.offsetParent;})[0];
  if(!k){var all=[].filter.call(s.querySelectorAll("button"),function(x){return re.test(x.textContent.trim())&&x.offsetParent;});k=all[0];}
  if(!k||!k.parentNode)return null;return {after:k,row:k.parentNode};}
function title(s){var t=s.querySelector(".skh-title")||s.querySelector("h1.page-title");if(!t||!t.offsetParent)t=[].filter.call(s.querySelectorAll(".skh-title,h1"),function(x){return !!x.offsetParent;})[0];
  return t?{title:t}:null;}
function make(P){var b=null;
  if(W.IngGenKey&&typeof IngGenKey.chip==="function"){b=IngGenKey.chip(P.key,P.place,{icon:true});b.className="mk3";}
  else{b=D.createElement("button");b.type="button";b.className="mk3";}
  b.id=P.id;b.innerHTML=SVG;b.title="Reply, Memory and Effort";b.setAttribute("aria-label","Reply, Memory and Effort for this page's model");return b;}
function placeOne(P){var s=D.getElementById("page-"+P.pg);if(!s)return;var b=D.getElementById(P.id);var f=P.find(s);if(!f)return;
  if(b&&!f.title&&b.parentNode&&b.parentNode.classList&&b.parentNode.classList.contains("mk3-title")){b.parentNode.classList.remove("mk3-title");}
  if(f.title){var t=f.title;if(b&&b.parentNode===t)return;if(!b)b=make(P);t.classList.add("mk3-title");t.appendChild(b);return;}
  if(b&&b.parentNode===f.row&&b.previousElementSibling===f.after)return;if(!b)b=make(P);
  if(f.after&&f.after.parentNode===f.row)f.row.insertBefore(b,f.after.nextSibling);else f.row.appendChild(b);}
function all(){PLACES.forEach(function(P){try{placeOne(P);}catch(e){}});}
function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r325)return;var ng=function(){var r=og.apply(this,arguments);setTimeout(all,60);setTimeout(all,900);return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r325=1;W.go=ng;}
(function wait(n){if(W.__ingReady===true&&W.IngGenKey){wrapGo();all();setTimeout(all,2500);
    setInterval(function(){if(D.hidden||(W.IngStill&&IngStill.on()))return;all();},2000);return;}
  if(n<240)setTimeout(function(){wait(n+1);},250);})(0);
W.IngModelKey={version:1,place:all,places:PLACES.map(function(P){return P.id;})};
})();
;try{window.__ingParts["p325"]="running";}catch(_){}
</script>
