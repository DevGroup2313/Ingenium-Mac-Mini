<style id="r233-css">
/* ============ R233 · A MODEL'S LIMITS, REMEMBERED, AND SET WHEREVER IT WORKS (Ingenium 6.29, 5 November 2026) ============
   Her words (5 November 2026): the Tokens and Context controls "reset", and she wants to set them, and the effort, on every page
   that runs a model (the Career Studio, Lector and the rest). What was found on 6.24, and still so on 6.28:
   - a model with no saved limits (or a value lost on the way) was shown the sliders' midpoints (16,512 tokens and 17,408 of
     memory), and those were the values it then ran with; the Models page's Settings saved them on the model;
   - the Models page's Settings could cut a saved value: its memory slider stopped at 32,768, so saving a model whose memory was
     65,536 wrote 32,768;
   - Lector, the Career Studio and Folders had Effort beside their model (r225) but no reply length or memory.
   Now a model's reply length and memory are always its own saved numbers: a missing, zero or broken value is mended to the
   app's own defaults (1,024 and 8,192, or the model's trained memory if smaller), never a slider's midpoint; Settings shows and
   keeps every saved value; and beside Effort on Lector, the Career Studio and Folders, Reply and Memory set the same two numbers
   for the model that page writes with, so a change anywhere is the same change everywhere, and is remembered per model. A
   longer reply set there lets the work run longer when it fits in the model's memory; a task that needs more still gets what
   it needs. A new memory takes effect when the model next loads. */
.wlim{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin:6px 0 0;font-size:12.5px;color:var(--ink-2,#4a4358)}
.wlim label{display:inline-flex;align-items:center;gap:6px;font-weight:600;color:var(--ink,#231a31);white-space:nowrap}
.wlim select{font:inherit;font-weight:500;padding:3px 8px;border-radius:9px;border:1px solid var(--hairline,rgba(60,40,90,.18));background:var(--card,#fff);color:inherit}
.wlim .wlim-say{flex-basis:100%;font-weight:400;line-height:1.45;color:var(--ink-2,#4a4358)}
body[data-theme="night"] .wlim select{background:#211a2b;color:#e9e3f3;border-color:rgba(233,227,243,.18)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p233"]="started";}catch(_){}
(function r233(){"use strict";
var W=window,D=document;
var DEF_T=1024,DEF_C=8192;
function $(id){return D.getElementById(id);}
function num(v){v=+v;return isFinite(v)?v:0;}
function fmt(n){try{return Number(n).toLocaleString("en-GB");}catch(e){return String(n);}}
function kay(n){return n>=1024&&n%1024===0?(n/1024)+"K":fmt(n);}
function models(){try{return Array.isArray(state.models)?state.models:[];}catch(e){return [];}}
function byId(id){return models().filter(function(m){return m.id===id;})[0]||null;}
function save(){try{saveState();}catch(e){}}

/* ================= 1. every model's own numbers, mended where missing ================= */
function trained(m){return num(m&&(m.ctxTrain||m.ctxLen))||0;}
function defaults(m){var c=DEF_C,t=trained(m);if(t>0)c=Math.min(c,t);return {tokens:DEF_T,ctx:c,effort:3};}
/* only a missing, zero, negative or broken number is mended: a small model's own small memory (a trained 256) is kept */
function mend(m){if(!m)return false;var d=defaults(m),ch=false;
  if(!(num(m.tokens)>0)){m.tokens=d.tokens;ch=true;}
  if(!(num(m.ctx)>0)){m.ctx=d.ctx;ch=true;}
  var e=num(m.effort);if(!(e>=1&&e<=5)){m.effort=d.effort;ch=true;}
  return ch;}
function mendAll(){var n=0;models().forEach(function(m){if(mend(m))n++;});if(n)save();return n;}
function ctxMax(m){var x=0;try{if(typeof W.ingCtxMax==="function")x=num(W.ingCtxMax(m));}catch(e){}return x>=1024?x:32768;}
function replyMax(m){var x=0;try{if(typeof W.ingReplyMax==="function")x=num(W.ingReplyMax(m));}catch(e){}return x>=128?x:16384;}

/* ================= 2. Chat's Controls: the active model is mended before its numbers are shown ================= */
function wrapNote(){var o=W.refreshChatNote;if(typeof o!=="function"||o.__r233)return;
  var n=function(){try{var m=byId(state.activeModelId);if(m&&mend(m))save();}catch(e){}var r=o.apply(this,arguments);try{paintAll();}catch(e){}return r;};
  n.__r233=1;try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}W.refreshChatNote=n;}

/* ================= 3. the Models page's Settings: shows and keeps every saved value ================= */
function fitDialog(m){var t=$("emTokens"),c=$("emCtx");if(!t||!c||!m)return;
  var tv=num(m.tokens),cv=num(m.ctx);
  t.max=String(Math.max(num(t.max),replyMax(m),tv));c.max=String(Math.max(num(c.max),ctxMax(m),cv));
  if(tv>0&&tv<num(t.min))t.min=String(tv);if(cv>0&&cv<num(c.min))c.min=String(cv);
  if(tv>0&&tv%(num(t.step)||1))t.step="any";if(cv>0&&cv%(num(c.step)||1))c.step="any";
  if(tv>0)t.value=String(tv);if(cv>0)c.value=String(cv);
  [t,c].forEach(function(x){try{x.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}});}
function wrapEdit(){var o=W.editModel;if(typeof o!=="function"||o.__r233)return;
  var n=function(id){var m=byId(id);if(m&&mend(m))save();var r=o.apply(this,arguments);try{fitDialog(m);}catch(e){}return r;};
  n.__r233=1;try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}W.editModel=n;}

/* ================= 4. Reply and Memory beside Effort, on each page that writes with a model ================= */
function pageModel(){var o=null;try{if(W.IngLector&&typeof IngLector.plan==="function")o=IngLector.plan();}catch(e){}
  if(o&&(o.link||o.cloud))return {link:true};
  var m=(o&&o.chosen)||null;if(!m){try{m=supModel();}catch(e){}}return {m:m};}
var RS=[512,1024,2048,4096,6144,8192,12288,16384,32768,65536],CS=[2048,4096,8192,16384,32768,65536,131072,262144];
function opts(list,cur,max){var a=list.filter(function(v){return v<=max;});if(cur>0&&a.indexOf(cur)<0)a.push(cur);return a.sort(function(x,y){return x-y;});}
function loadedCtx(m){try{if(!m||Engine.modelId!==m.id||Engine.status==="loading")return 0;
  if(typeof DeskAdapter!=="undefined"&&Engine.adapter===DeskAdapter&&DeskAdapter.loaded)return num(DeskAdapter.loaded.ctx);
  if(typeof NativeAdapter!=="undefined"&&Engine.adapter===NativeAdapter&&NativeAdapter.loaded)return num(NativeAdapter.loaded.n_ctx);}catch(e){}return 0;}
function say(m){var lc=loadedCtx(m),cv=num(m.ctx);
  var s="For "+(m.customName||"this model")+", here and in Chat. A task that needs a longer reply still gets it.";
  if(lc&&cv&&lc!==cv)s+=" It is loaded now with "+kay(lc)+" of memory; "+kay(cv)+" takes effect when it next loads.";
  return s;}
function strip(where){var w=D.createElement("div");w.className="wlim";w.setAttribute("data-wlim",where);paintStrip(w);return w;}
function paintStrip(w){var pm=pageModel();w.innerHTML="";
  if(pm.link){var t=D.createElement("span");t.className="wlim-say";t.textContent="Reply length and memory follow your connected model.";w.appendChild(t);return;}
  var m=pm.m;if(!m){var t2=D.createElement("span");t2.className="wlim-say";t2.textContent="Reply length and memory are set once a model is ready.";w.appendChild(t2);return;}
  if(mend(m))save();
  function sel(label,aria,list,cur,max,show,onpick){var lab=D.createElement("label");lab.appendChild(D.createTextNode(label));var s=D.createElement("select");s.setAttribute("aria-label",aria);
    opts(list,cur,max).forEach(function(v){var op=D.createElement("option");op.value=String(v);op.textContent=show(v);s.appendChild(op);});s.value=String(cur);
    s.onchange=function(){onpick(+s.value);};lab.appendChild(s);w.appendChild(lab);return s;}
  var tv=num(m.tokens),cv=num(m.ctx);
  sel("Reply up to","Longest reply, in tokens, for "+(m.customName||"this model"),RS,tv,Math.max(replyMax(m),tv),function(v){return fmt(v)+" tokens";},function(v){setLimit(m,"tokens",v);});
  sel("Memory","Memory (context window), in tokens, for "+(m.customName||"this model"),CS,cv,Math.max(ctxMax(m),cv),function(v){return kay(v);},function(v){setLimit(m,"ctx",v);});
  var t3=D.createElement("span");t3.className="wlim-say";t3.textContent=say(m);w.appendChild(t3);}
function setLimit(m,k,v){if(!m||!(v>0))return;m[k]=v;if(k==="ctx"){m.ctxUser=true;delete m.ctxAuto;}save();
  /* the same numbers in Chat's Controls when this is Chat's model too */
  try{if(m.id===state.activeModelId&&typeof W.refreshChatNote==="function")W.refreshChatNote();}catch(e){}
  try{paintAll();}catch(e){}}
function paintAll(){[].forEach.call(D.querySelectorAll(".wlim"),function(w){try{paintStrip(w);}catch(e){}});}
function place(){[].forEach.call(D.querySelectorAll(".wef"),function(wef){var nx=wef.nextElementSibling;if(nx&&nx.classList&&nx.classList.contains("wlim"))return;
  var where=wef.getAttribute("data-wef")||"page";var s=strip(where);if(wef.classList.contains("c-pad"))s.classList.add("c-pad");wef.parentNode.insertBefore(s,wef.nextSibling);});}
var pend=0;function soon(){if(pend)return;pend=(W.requestAnimationFrame||setTimeout)(function(){pend=0;try{place();}catch(e){}});}
function watch(){["lx7","cs","page-folders"].forEach(function(id){var el=$(id);if(!el||el.__r233)return;el.__r233=1;try{new MutationObserver(soon).observe(el,{childList:true,subtree:true});}catch(e){}});soon();}

/* ================= 5. the reply length set there is used: a longer reply where the model's memory has room ================= */
function wrapAsk(){var prev=W.lxAsk;if(typeof prev!=="function"||prev.__r233)return;
  var n=function(run,msgs,maxTok,temp,onPiece){try{var link=false;try{link=typeof supUsesLink==="function"&&supUsesLink();}catch(e){}
      if(!link&&!(run&&run.__stopped)){var m=null;try{m=lxModel(run);}catch(e){}var want=num(m&&m.tokens);
        if(m&&want>num(maxTok)){var ctx=0;try{ctx=num(lxCtx(m));}catch(e){}if(!ctx)ctx=4096;
          var used=0;(msgs||[]).forEach(function(x){used+=String(x&&x.content||"").length;});
          var room=Math.floor(ctx-used/3-256),nt=Math.min(want,room);if(nt>num(maxTok))maxTok=nt;}}}catch(e){}
    return prev.call(this,run,msgs,maxTok,temp,onPiece);};
  try{Object.keys(prev).forEach(function(k){n[k]=prev[k];});}catch(e){}n.__r233=1;W.lxAsk=n;try{lxAsk=n;}catch(e){}}

function boot(){try{mendAll();}catch(e){}try{wrapNote();}catch(e){}try{wrapEdit();}catch(e){}try{wrapAsk();}catch(e){}try{watch();}catch(e){}
  ["ctlTokens","ctlCtx"].forEach(function(id){var x=$(id);if(x&&!x.__r233){x.__r233=1;x.addEventListener("input",function(){setTimeout(paintAll,0);});}});}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function later(){var n=0;(function wait(){if(W.__ingReady===true){boot();setTimeout(boot,2500);return;}if(++n<400)setTimeout(wait,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r233)return;var ng=function(p){var r=og.apply(this,arguments);try{if(/^(lector|career|folders)$/.test(p)){watch();setTimeout(paintAll,0);}}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r233=1;W.go=ng;})();
W.IngLimits={mend:mend,mendAll:mendAll,defaults:defaults,fitDialog:fitDialog,paintAll:paintAll,place:place,pageModel:pageModel};
})();
;try{window.__ingParts["p233"]="running";}catch(_){}
</script>
