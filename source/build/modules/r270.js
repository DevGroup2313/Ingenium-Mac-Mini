<style id="r270-css">
/* ============ R270 · LOAD A MODEL FROM ANY PAGE (Ingenium 6.78, 11 November 2026) ============
   Her words: "loading and unloading models simplified", asked more than once, and the turret's preview she chose drew it: under the top
   bar's model key, "Load a model: from any page, in one press. Press the loaded one to unload it."
   Measured on 6.77: on any page but Models, loading a model took the top bar's key, Models on this device, then the model's lens (three
   presses and a change of page); the key's menu, Who answers (modules/r244.js), chose who answers but loaded nothing.
   Now the menu holds Load a model on this device: each of her models with its lens (drawn as the turret draws it, modules/r269.js), its
   size and the memory it needs. One press loads it, as the turret does (chosen, the engine loads it, the chat answers from this device);
   a press on the one in the engine unloads it. The row follows the load (Loading, then In the engine). A model too heavy for this device
   asks first (press again to load it anyway); a busy engine is not interrupted; a file not linked says so. The menu stays open while
   it loads, and every row lifts, sinks and sounds (r176). The rows are raised keys that lean, lift and sink, and This device always
   names what is in the engine now (her words of the same day, below). */
#waPop .tl-sec{margin:4px 0 2px;padding-top:4px;border-top:1px solid var(--hairline)}
#waPop .tl-h{font:800 10.5px/1 var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--ink-3);padding:7px 10px 2px}
#waPop .tl-say{margin:0;padding:2px 10px 5px;font:500 11.5px/1.35 var(--sans);color:var(--ink-3)}
/* her words (11 November 2026): "I want the newly added buttons to have the popped out animated 3D look and animation": each row is a raised
   key as Blend's are (modules/r262.js): it leans toward the pointer, lifts under it and sinks when pressed; the one in the engine is filled
   purple, as a chosen room key is */
#waPop{--tl-keyA:#ffffff;--tl-keyB:#f6f2fb;--tl-hair:rgba(34,26,46,.10);--tl-pa:#7348be;--tl-pb:#5d37a1;--tl-pedge:#4b2a86;
  --tl-key:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.1);
  --tl-keyhi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --tl-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18)}
body[data-theme="night"] #waPop{--tl-keyA:#2a2239;--tl-keyB:#231c31;--tl-hair:rgba(205,184,240,.12);--tl-pa:#7a56c8;--tl-pb:#5b3aa1;--tl-pedge:#2c1956;
  --tl-key:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5),0 9px 14px rgba(0,0,0,.36);
  --tl-keyhi:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.38);
  --tl-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4)}
#waPop .tl-list{padding:2px 4px 10px}
#waPop .tl-row{display:flex;align-items:center;gap:10px;width:100%;text-align:left;margin:8px 0 0;padding:8px 11px;border:1px solid var(--tl-hair);border-radius:13px;
  background:linear-gradient(var(--tl-keyA),var(--tl-keyB));box-shadow:var(--tl-key);cursor:pointer;color:var(--ink-1);font:600 12.5px/1.3 var(--sans);
  -webkit-tap-highlight-color:transparent;transform:perspective(700px) rotateX(var(--ly,0deg)) rotateY(var(--lx,0deg)) translateY(var(--lz,0px));
  transition:transform .45s cubic-bezier(.34,1.35,.64,1),box-shadow .3s ease,background .2s ease}
#waPop .tl-row:hover,#waPop .tl-row.tl-ph{--lz:-3px;box-shadow:var(--tl-keyhi)}
#waPop .tl-row:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
#waPop .tl-row:active,#waPop .tl-row.tl-pd{--lz:1px;box-shadow:var(--tl-press);transition-duration:.08s}
#waPop .tl-row canvas{flex:0 0 auto;transition:transform .3s cubic-bezier(.34,1.35,.64,1)}
#waPop .tl-row:hover canvas,#waPop .tl-row.tl-ph canvas{transform:translateY(-1px) scale(1.07)}
#waPop .tl-txt{display:flex;flex-direction:column;min-width:0;flex:1 1 auto}
#waPop .tl-sub{font-weight:500;font-size:11px;color:var(--ink-3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#waPop .tl-row.on{background:linear-gradient(var(--tl-pa),var(--tl-pb));border-color:var(--tl-pedge);color:#fff;text-shadow:0 1px 1px rgba(30,10,60,.32)}
#waPop .tl-row.on .tl-sub,#waPop .tl-row.on .tl-on{color:rgba(255,255,255,.9)}
#waPop .tl-row.warn .tl-sub{color:var(--warn,#9a5b06);white-space:normal}
#waPop .tl-on{font-size:10.5px;font-weight:700;color:var(--ok,#2f7a55);white-space:nowrap}
#waPop .tl-none{display:block;padding:4px 10px 6px;font:500 12px/1.4 var(--sans);color:var(--ink-3)}
@media (prefers-reduced-motion:reduce){#waPop .tl-row,#waPop .tl-row canvas{transition:none}#waPop .tl-row{transform:none !important}}
body[data-motion="minimal"] #waPop .tl-row,body[data-motion="minimal"] #waPop .tl-row canvas{transition:none}
body[data-motion="minimal"] #waPop .tl-row{transform:none !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p270"]="started";}catch(_){}
/* R270 · Load a model from any page: see the note at the top of its styles */
(function(){"use strict";
if(window.__r270)return;window.__r270=1;
var D=document,W=window,ASK=null,SAID={},RQ=0;
function $(id){return D.getElementById(id);}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function setText(e,s){if(e&&e.textContent!==s)e.textContent=s;}
function eng(){try{return typeof Engine!=="undefined"&&Engine?Engine:null;}catch(e){return null;}}
function T(){return W.IngTurret&&typeof W.IngTurret.check==="function"?W.IngTurret:null;}
function models(){try{return ((W.state&&W.state.models)||[]).filter(function(m){return m&&m.id;});}catch(e){return [];}}
function byId(id){var a=models();for(var i=0;i<a.length;i++)if(a[i].id===id)return a[i];return null;}
function nm(m){return String((m&&(m.customName||m.name||m.fileName))||"Model");}
function st(){var e=eng();return e?String(e.status||"disconnected"):"disconnected";}
function loadedId(){var e=eng(),s=st();return e&&(s==="ready"||s==="busy")?(e.modelId||null):null;}
function loadingId(){return st()==="loading"?((W.state&&W.state.activeModelId)||null):null;}
function pct(){var e=eng(),p=e?+e.progress:0;return isFinite(p)?Math.round(Math.max(0,Math.min(1,p))*100):0;}
function size(m){try{return m&&m.sizeBytes?String(fmtBytes(m.sizeBytes)):"";}catch(e){return "";}}
function need(m){try{if(typeof lineupNeedGB==="function"){var n=+lineupNeedGB({size:m.sizeBytes||0});if(n>0)return n;}}catch(e){}try{var x=+estimateNeedGB(m);return x>0?x:null;}catch(e){return null;}}
function gb(x){return Math.abs(x-Math.round(x))<.05?String(Math.round(x)):x.toFixed(1);}
function pop(){var p=$("waPop");return p&&!p.hidden?p:null;}

/* each row says what pressing it will do, and follows the engine */
function paintRow(b){var id=b.getAttribute("data-model"),m=byId(id);if(!m)return;var ld=loadedId(),lg=loadingId(),sub,cls="",tag="";
  if(SAID[id]){sub=SAID[id];cls="warn";}
  else if(ld===id){sub=st()==="busy"?"Writing now; press when it ends to unload it":"In the engine · press to unload it";cls="on";tag="In the engine";}
  else if(lg===id){sub="Loading · "+pct()+"%";cls="on";}
  else{var n=need(m),z=size(m);sub=(z?z:"")+(n?(z?" · ":"")+"needs about "+gb(n)+" GB":"")||"Press to load it";}
  if(b.classList.contains("on")!==(cls==="on"))b.classList.toggle("on",cls==="on");if(b.classList.contains("warn")!==(cls==="warn"))b.classList.toggle("warn",cls==="warn");
  setText(b.querySelector(".tl-sub"),sub);var on=b.querySelector(".tl-on");setText(on,tag);
  var lab=nm(m)+": "+(ld===id?"in the engine; press to unload it":lg===id?"loading":"press to load it");if(b.getAttribute("aria-label")!==lab)b.setAttribute("aria-label",lab);}
function paint(){var p=pop();if(!p)return;[].forEach.call(p.querySelectorAll(".tl-row"),paintRow);}
function schedule(){if(RQ)return;try{RQ=requestAnimationFrame(function(){RQ=0;paint();});}catch(e){RQ=0;paint();}}
function press(id){var t=T(),m=byId(id);if(!t||!m)return;delete SAID[id];
  if(loadedId()===id&&st()==="ready"){ASK=null;t.unload();schedule();return;}
  var v=t.check(id);
  if(v&&v.kind==="heavy"){if(ASK!==id){ASK=id;SAID[id]=v.says+" Press again to load it anyway.";paint();return;}}
  else if(v){SAID[id]=said(v,m);paint();return;}
  ASK=null;t.load(id);schedule();}
/* what stands in the way, said for this menu (the turret's card says it for the Models page) */
function said(v,m){var k=v.kind;
  if(k==="busy")return st()==="busy"?"The engine is writing. Let it finish, or stop it, first.":"The engine is loading a model. Let it finish first.";
  if(k==="relink")return "The file for "+nm(m)+" is not linked. Relink it on the Models page, then press it again.";
  if(k==="ollama")return nm(m)+" is Ollama's list, not a model. Link the real one on the Models page.";
  if(k==="engine")return "There is no engine here yet. Add it in the Engine room of the Models page.";
  return v.name+(v.says?". "+v.says:"");}
function row(m){var b=mk("button","tl-row");b.type="button";b.setAttribute("role","menuitem");b.setAttribute("data-model",m.id);
  var cv=D.createElement("canvas");cv.setAttribute("aria-hidden","true");try{W.IngTurret.lens(cv,30,m,false);}catch(e){}b.appendChild(cv);
  var tx=mk("span","tl-txt");tx.appendChild(mk("span","tl-name",nm(m)));tx.appendChild(mk("span","tl-sub",""));b.appendChild(tx);b.appendChild(mk("span","tl-on",""));
  b.addEventListener("click",function(e){e.stopPropagation();press(m.id);});paintRow(b);return b;}
/* the section, put into Who answers each time it opens (r244 draws the menu afresh then) */
function section(p){if(!p||p.querySelector(".tl-sec")||!T())return;
  var sec=mk("div","tl-sec");sec.setAttribute("role","group");sec.setAttribute("aria-label","Load a model on this device");
  sec.appendChild(mk("div","tl-h","Load a model"));
  var ms=models();
  if(!ms.length){sec.appendChild(mk("span","tl-none","No model on this device yet. Models on this device, below, gets one."));}
  else{sec.appendChild(mk("p","tl-say","From any page, in one press. Press the one in the engine to unload it."));var list=mk("div","tl-list");ms.forEach(function(m){list.appendChild(row(m));});sec.appendChild(list);}
  var sep=p.querySelector(".wa-sep");p.insertBefore(sec,sep||null);place(p);}
/* the menu grew: placed again under its key, as r244 places it */
function place(p){try{var k=$("activeModelPill");if(!k)return;var r=k.getBoundingClientRect(),w=p.offsetWidth||280;
  p.style.top=Math.round(r.bottom+6)+"px";p.style.left=Math.round(Math.max(8,Math.min(W.innerWidth-w-8,r.right-w)))+"px";}catch(e){}}
/* her words (11 November 2026): "The loaded model section sometimes shows a past loaded model instead of the current ones, please fix that
   as well from the top bar": This device (drawn by r244 when the menu opens) is said again whenever the engine or the chosen model changes,
   from the engine itself: the model loading or in the engine, and the chosen one when it is another; How it answers (r249) follows */
function syncWho(p){try{var sub=p.querySelector(".wa-row.dev .wa-sub");if(!sub)return;var act=byId(W.state&&W.state.activeModelId),ld=byId(loadedId()),lg=byId(loadingId()),s;
    if(lg)s="Loading "+nm(lg);else if(ld&&act&&ld.id!==act.id)s=nm(act)+" chosen · "+nm(ld)+" in the engine";else if(ld)s=nm(ld)+" · in the engine";
    else if(act)s=nm(act)+" · not loaded yet";else s="No model chosen yet";setText(sub,s);}catch(e){}}
function refreshWho(p){syncWho(p);try{if(W.IngGen&&typeof IngGen.section==="function"&&p.querySelector(".gen"))IngGen.section(p);}catch(e){}}
function still(){try{return D.body.getAttribute("data-motion")==="minimal"||(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}catch(e){return false;}}
/* each row leans toward the pointer, lifts under it and sinks when pressed, as Blend's do (one listener for the menu) */
function wireLean(p){if(p.__tl)return;p.__tl=1;var cur=null;
  function off(e){if(!e)return;e.classList.remove("tl-ph","tl-pd");e.style.removeProperty("--lx");e.style.removeProperty("--ly");}
  p.addEventListener("pointerover",function(e){if(e.pointerType!=="mouse"||still())return;var t=e.target.closest&&e.target.closest(".tl-row");if(t===cur)return;off(cur);cur=t;if(t)t.classList.add("tl-ph");},{passive:true});
  p.addEventListener("pointermove",function(e){if(!cur||e.pointerType!=="mouse"||still())return;var r=cur.getBoundingClientRect();if(!r.width)return;
    var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5,k=Math.min(1,320/Math.max(r.width,r.height));
    cur.style.setProperty("--lx",(x*7*k).toFixed(2)+"deg");cur.style.setProperty("--ly",(-y*7*k).toFixed(2)+"deg");},{passive:true});
  p.addEventListener("pointerleave",function(){off(cur);cur=null;},{passive:true});
  p.addEventListener("pointerdown",function(e){var t=e.target.closest&&e.target.closest(".tl-row");if(t&&!still())t.classList.add("tl-pd");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(n){p.addEventListener(n,function(){[].forEach.call(p.querySelectorAll(".tl-pd"),function(x){x.classList.remove("tl-pd");});},{passive:true});});}
function boot(){var e=eng();if(!e||typeof e.on!=="function"||!D.body){setTimeout(boot,700);return;}
  e.on("status",function(s){ASK=null;SAID={};schedule();var p=pop();if(p){if(s==="ready"||s==="disconnected")refreshWho(p);else syncWho(p);}});
  /* a model chosen elsewhere (the page draws its models again): the menu says so */
  var ml=$("modelList");if(ml){try{new MutationObserver(function(){var p=pop();if(p){syncWho(p);schedule();}}).observe(ml,{childList:true});}catch(x){}}
  /* Who answers is one element, kept and shown again: each time it is shown, its section is put in */
  var seen=null;
  function watch(){var p=$("waPop");if(!p){setTimeout(watch,800);return;}if(seen===p)return;seen=p;
    try{new MutationObserver(function(){var q=pop();if(q&&!q.querySelector(".tl-sec")){ASK=null;SAID={};section(q);syncWho(q);}}).observe(p,{attributes:true,attributeFilter:["hidden"],childList:true});}catch(x){}
    wireLean(p);if(pop()){section(p);syncWho(p);}}
  watch();
  /* the menu is made the first time the key is pressed */
  D.addEventListener("click",function(ev){var t=ev.target;if(t&&t.closest&&t.closest("#activeModelPill"))setTimeout(watch,0);},true);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngLoadAnywhere={paint:paint,state:function(){var p=pop();return {open:!!p,rows:p?[].slice.call(p.querySelectorAll(".tl-row")).map(function(b){return {id:b.getAttribute("data-model"),name:(b.querySelector(".tl-name")||{}).textContent,sub:(b.querySelector(".tl-sub")||{}).textContent,cls:b.className};}):[]};}};
try{window.__ingParts["p270"]="running";}catch(_){}
})();
</script>
