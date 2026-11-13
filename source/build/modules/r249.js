<style id="r249-css">
/* ============ R249 · HOW IT ANSWERS, KEPT AND AT HAND (Ingenium 6.52, 7 November 2026) ============
   Her words (7 November 2026): "I want the Tokens and Context controls to be fixed inside of Ingenium, the app always resets it to
   zero with the models even though I already moved it to a higher capacity earlier, it never remembers them and they are all out
   whack all over the app, I can only regulate it on the chat pages which is not really convenient since that I cannot regulate it on
   the other pages that are running these models and I can't adjust the effort level."
   Measured on 6.51 (rig/t_652_gen.js does it again): with a connected service (Claude, OpenAI ...) or with nothing set up, Longest
   reply went back to 1,024 tokens and Effort to Medium at every start, because the page kept them only inside a model on the device
   (its tokens, ctx and effort); for a service nothing was kept. Now every model on the device and every service has its own Longest
   reply, Context and Effort, kept with the app's data and given back at start and whenever she changes who answers; a model or a
   service used for the first time starts from the last settings she chose, never from the page's defaults. The same three
   controls are in the top bar's model key, under Who answers, so they can be changed from any page (Lector, the Career Studio,
   Blend, Build, Code); the chat's Controls show the same values. */
#waPop{max-height:min(700px,86vh)}
#waPop .gen{border-top:1px solid var(--hairline);margin-top:6px;padding:10px 12px 8px}
#waPop .gen-h{font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2);margin:0 0 2px}
#waPop .gen-for{font-size:12px;color:var(--ink-2);margin:0 0 8px;line-height:1.35}
#waPop .gen-row{margin:8px 0 2px}
#waPop .gen-lab{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-size:12.5px;font-weight:600;color:var(--ink-1);margin-bottom:5px}
#waPop .gen-lab b{font-weight:700;font-variant-numeric:tabular-nums;color:var(--accent,#5d37a1)}
#waPop .gen-eff{display:flex;flex-wrap:wrap;gap:5px}
#waPop .gen-eff button{appearance:none;font:600 12px/1 inherit;font-family:inherit;padding:6px 9px;border-radius:999px;border:1px solid var(--hairline);cursor:pointer;color:var(--ink-1);
  background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pill);transition:transform .2s var(--key-spring,ease),box-shadow .2s ease}
#waPop .gen-eff button:hover{transform:translateY(-1.5px);box-shadow:var(--pill-hi,var(--pill))}
#waPop .gen-eff button[aria-checked="true"]{color:#fff;border-color:#4b2a86;background:linear-gradient(180deg,#7348be,#5d37a1);box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 #3a2070}
#waPop .gen input[type=range]{width:100%;margin:0;accent-color:var(--accent,#5d37a1)}
#waPop .gen select{width:100%;font:inherit;font-size:12.5px;padding:5px 8px;border-radius:9px;border:1px solid var(--hairline);background:var(--card-hi);color:var(--ink-1)}
#waPop .gen-auto{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--ink-2);margin-top:5px;cursor:pointer}
#waPop .gen-auto input{margin:0}
#waPop .gen.follows .gen-tok input[type=range]{opacity:.55}
#waPop .gen-note{font-size:11.5px;line-height:1.4;color:var(--ink-2);margin:8px 0 0}
body[data-theme="night"] #waPop .gen-eff button[aria-checked="true"]{border-color:#2c1956;background:linear-gradient(180deg,#7a56c8,#5b3aa1)}
@media (prefers-reduced-motion: reduce){#waPop .gen-eff button{transition:none}#waPop .gen-eff button:hover{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p249"]="started";}catch(_){}
/* R249 · Longest reply, Context and Effort: kept for each model and each service, given back at start and on every change of who
   answers, and at hand from the top bar's model key on every page */
(function r249(){
"use strict";
if(window.IngGen)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
var EFL=["Low","Medium","High","Extra","Max"];
function S(){if(!W.state)return {by:{}};if(!state.gen||typeof state.gen!=="object")state.gen={v:1,by:{},last:null};if(!state.gen.by||typeof state.gen.by!=="object")state.gen.by={};return state.gen;}
function onCloud(){try{return chatSource()==="cloud"&&!!(state.cloud&&state.cloud.on&&state.cloud.provider);}catch(e){return false;}}  /* as modules/r244.js decides it */
function local(){try{return (state.models||[]).filter(function(x){return x.id===state.activeModelId;})[0]||null;}catch(e){return null;}}
/* who answers now: a service (by its provider and model), a model on this device (by its id), or nobody yet */
function key(){try{if(onCloud())return "c:"+String(state.cloud.provider||"")+"|"+String(state.cloud.model||"");var m=local();if(m)return "m:"+m.id;}catch(e){}return "none";}
function who(){try{if(onCloud()){var n=String(state.cloud.model||state.cloud.provider||"the service");return n;}var m=local();if(m)return m.customName||"this model";}catch(e){}return "";}
function el(id){return $(id);}
function now(){var t=el("ctlTokens"),c=el("ctlCtx"),e=el("ctlEffort");return {tokens:t?+t.value||0:0,ctx:c?+c.value||0:0,effort:e?+e.value||3:3};}
/* the slider's own room for this model, as the page's limits give it (modules/r159.js), set before a value is put back */
function room(){var m=local(),t=el("ctlTokens"),c=el("ctlCtx");
  try{if(t&&typeof W.ingReplyMax==="function"){var rx=+W.ingReplyMax(m)||0;if(rx>0&&+t.max!==rx)t.max=String(rx);}}catch(e){}
  try{if(c&&typeof W.ingCtxMax==="function"){var cx=+W.ingCtxMax(m)||0;if(cx>0&&+c.max!==cx)c.max=String(cx);}}catch(e){}}
function put(e,v){if(!e||!(+v>0))return;var mn=+e.min||0,mx=+e.max||+v,st=+e.step||1;v=Math.max(mn,Math.min(mx,+v));v=Math.round((v-mn)/st)*st+mn;if(v>mx)v-=st;e.value=String(v);}
var busy=false,lastKey=null;
/* kept: every change she makes (a slider, the effort menu, the model key's controls) */
function keep(){if(busy||!W.state)return;var k=key(),v=now(),g=S();
  g.by[k]={tokens:v.tokens,ctx:v.ctx,effort:v.effort,at:Date.now()};g.last={tokens:v.tokens,ctx:v.ctx,effort:v.effort};
  if(k.indexOf("m:")===0){var m=local();if(m){m.tokens=v.tokens;m.ctx=v.ctx;m.effort=v.effort;}}
  try{saveState();}catch(e){}}
/* given back: this answerer's own, else (a model's own numbers from before 6.52), else the last she chose anywhere */
function restore(){if(!W.state)return false;var k=key();lastKey=k;var g=S(),v=g.by[k]||null;
  if(!v&&k.indexOf("m:")===0){var m=local();if(m&&(+m.tokens>0||+m.ctx>0||+m.effort>0))v={tokens:+m.tokens||0,ctx:+m.ctx||0,effort:+m.effort||0};}
  if(!v)v=g.last;if(!v)return false;
  busy=true;try{room();put(el("ctlTokens"),v.tokens);put(el("ctlCtx"),v.ctx);var e=el("ctlEffort");if(e&&+v.effort>=1&&+v.effort<=5)e.value=String(+v.effort);
    try{if(typeof W.paintChatCtl==="function")W.paintChatCtl();}catch(x){}try{if(W.IngR215&&typeof IngR215.paintKey==="function")IngR215.paintKey();}catch(x){}}
  finally{busy=false;}paintSection();return true;}
function wire(){["ctlTokens","ctlCtx","ctlEffort"].forEach(function(id){var e=el(id);if(!e||e.__r249)return;e.__r249=1;
    e.addEventListener("input",function(){setTimeout(keep,0);});e.addEventListener("change",function(){setTimeout(keep,0);});});}
/* who answers changed (a model chosen, a service connected or left): its own settings come back */
function wrapSave(){var o=W.saveState;if(typeof o!=="function"||o.__r249)return;
  var n=function(){var r=o.apply(this,arguments);try{if(!busy&&key()!==lastKey)setTimeout(restore,0);}catch(e){}return r;};
  try{Object.keys(o).forEach(function(k){if(!(k in n))n[k]=o[k];});}catch(e){}n.__r249=1;W.saveState=n;try{saveState=n;}catch(e){}}
/* the base page puts a model's own numbers in the controls when it is chosen: they are kept as that model's */
function wrapNote(){var o=W.refreshChatNote;if(typeof o!=="function"||o.__r249)return;
  var n=function(){var r=o.apply(this,arguments);try{if(key()!==lastKey)restore();}catch(e){}return r;};n.__r249=1;W.refreshChatNote=n;try{refreshChatNote=n;}catch(e){}}

/* ---------- the top bar's model key: How it answers, under Who answers ---------- */
var SEC=null;
function follows(){try{return !(state.effort&&state.effort.replyAuto===false);}catch(e){return true;}}
function autoEffort(){try{return !!(state.effort&&state.effort.auto);}catch(e){return false;}}
function fire(e){try{e.dispatchEvent(new Event("input",{bubbles:true}));}catch(x){}}
function section(pop){if(!pop)return;var old=pop.querySelector(".gen");if(old)old.remove();
  var s=mk("div","gen");s.setAttribute("role","group");s.setAttribute("aria-label","How it answers");
  s.appendChild(mk("div","gen-h","How it answers"));
  var w=who();s.appendChild(mk("div","gen-for",w?"For "+w+": kept for it, and used on every page.":"Kept for each model and each service, and used on every page."));
  /* effort */
  var r1=mk("div","gen-row"),l1=mk("div","gen-lab");l1.appendChild(mk("span",null,"Effort"));var v1=mk("b");l1.appendChild(v1);r1.appendChild(l1);
  var eff=mk("div","gen-eff");eff.setAttribute("role","radiogroup");eff.setAttribute("aria-label","Effort");
  var opts=[["auto","Auto"]].concat(EFL.map(function(n,i){return [String(i+1),n];}));
  opts.forEach(function(o){var b=mk("button",null,o[1]);b.type="button";b.setAttribute("role","radio");b.setAttribute("data-eff",o[0]);
    b.addEventListener("click",function(ev){ev.stopPropagation();try{if(!state.effort||typeof state.effort!=="object")state.effort={};
      if(o[0]==="auto"){state.effort.auto=true;try{saveState();}catch(x){}}
      else{state.effort.auto=false;var e=el("ctlEffort");if(e){e.value=o[0];fire(e);}}
      try{if(W.IngR215&&typeof IngR215.paintKey==="function")IngR215.paintKey();}catch(x){}}catch(x){}paintSection();});eff.appendChild(b);});
  r1.appendChild(eff);s.appendChild(r1);
  /* longest reply */
  var r2=mk("div","gen-row gen-tok"),l2=mk("div","gen-lab");l2.appendChild(mk("span",null,"Longest reply"));var v2=mk("b");l2.appendChild(v2);r2.appendChild(l2);
  var tk=D.createElement("input");tk.type="range";tk.id="genTokens";tk.setAttribute("aria-label","Longest reply, in tokens");r2.appendChild(tk);
  tk.addEventListener("input",function(){var t=el("ctlTokens");if(!t)return;t.value=tk.value;try{if(!state.effort||typeof state.effort!=="object")state.effort={};state.effort.replyAuto=false;}catch(x){}fire(t);paintSection();});
  var fl=mk("label","gen-auto"),cb=D.createElement("input");cb.type="checkbox";cb.id="genFollow";fl.appendChild(cb);fl.appendChild(D.createTextNode("Follows the effort"));r2.appendChild(fl);
  cb.addEventListener("change",function(){try{if(!state.effort||typeof state.effort!=="object")state.effort={};state.effort.replyAuto=!!cb.checked;saveState();}catch(x){}paintSection();});
  s.appendChild(r2);
  /* context: a model on this device has its window; a service has the memory Ingenium gives it */
  var r3=mk("div","gen-row"),l3=mk("div","gen-lab");l3.appendChild(mk("span",null,"Context"));var v3=mk("b");l3.appendChild(v3);r3.appendChild(l3);
  var cx=D.createElement("input");cx.type="range";cx.id="genCtx";cx.setAttribute("aria-label","Context window, in tokens");r3.appendChild(cx);
  cx.addEventListener("input",function(){var c=el("ctlCtx");if(!c)return;c.value=cx.value;fire(c);paintSection();});
  var cs=D.createElement("select");cs.id="genCloudCtx";cs.setAttribute("aria-label","Memory for a connected model");r3.appendChild(cs);
  cs.addEventListener("change",function(){var o=el("ctlCloudCtx");if(o){o.value=cs.value;try{o.dispatchEvent(new Event("change",{bubbles:true}));}catch(x){}}
    else{try{state.cloud=state.cloud||{};state.cloud.window=+cs.value||0;saveState();}catch(x){}}paintSection();});
  s.appendChild(r3);
  s.appendChild(mk("p","gen-note","The chat's Controls show the same settings. Lector, Vocatio, Blend, Build and Code use them too."));
  /* the arrow keys move a slider here, not the menu's focus */
  s.addEventListener("keydown",function(ev){var t=ev.target;if(t&&/^(INPUT|SELECT)$/.test(t.tagName)&&(ev.key==="ArrowUp"||ev.key==="ArrowDown"))ev.stopPropagation();});
  pop.appendChild(s);SEC=s;paintSection();}
function fmt(n){n=+n||0;return n>=1024&&n%1024===0?(n/1024)+"K":n.toLocaleString();}
function paintSection(){var s=SEC;if(!s||!s.isConnected)return;var v=now(),au=autoEffort();
  [].forEach.call(s.querySelectorAll(".gen-eff button"),function(b){var on=au?b.getAttribute("data-eff")==="auto":(!au&&+b.getAttribute("data-eff")===v.effort);if(b.getAttribute("aria-checked")!==(on?"true":"false"))b.setAttribute("aria-checked",on?"true":"false");});
  var vb=s.querySelector(".gen-row b");if(vb)vb.textContent=au?"Auto":EFL[(v.effort||3)-1];
  var t=el("ctlTokens"),tk=s.querySelector("#genTokens");if(t&&tk){tk.min=t.min;tk.max=t.max;tk.step=t.step;tk.value=t.value;}
  var f=follows(),cb=s.querySelector("#genFollow");if(cb)cb.checked=f;s.classList.toggle("follows",f);
  var bs=s.querySelectorAll(".gen-lab b");if(bs[1])bs[1].textContent=f?"follows the effort":fmt(v.tokens)+" tokens";
  var cl=onCloud(),c=el("ctlCtx"),cx=s.querySelector("#genCtx"),cs=s.querySelector("#genCloudCtx");
  if(cx){cx.hidden=cl;if(c&&!cl){cx.min=c.min;cx.max=c.max;cx.step=c.step;cx.value=c.value;}}
  if(cs){cs.hidden=!cl;if(cl){var o=el("ctlCloudCtx");if(o&&cs.options.length!==o.options.length){cs.innerHTML=o.innerHTML;}
      if(!cs.options.length){[["0","Auto: the model's own window"],["32768","32K"],["65536","64K"],["131072","128K"],["200000","200K"],["1000000","1M"]].forEach(function(x){var op=D.createElement("option");op.value=x[0];op.textContent=x[1];cs.appendChild(op);});}
      var pv=String(+((state.cloud||{}).window)||0);if(cs.value!==pv)cs.value=pv;}}
  if(bs[2])bs[2].textContent=cl?(+((state.cloud||{}).window)>0?fmt(+state.cloud.window)+" tokens":"the model's own"):fmt(v.ctx)+" tokens";}

function boot(){wire();wrapSave();wrapNote();restore();}
(function wait(n){if(W.__ingReady===true&&W.state){try{boot();}catch(e){}return;}if(n<240)setTimeout(function(){wait(n+1);},250);})(0);
W.IngGen={version:1,key:key,keep:keep,restore:restore,section:section,paint:paintSection};
})();
;try{window.__ingParts["p249"]="running";}catch(_){}
</script>
