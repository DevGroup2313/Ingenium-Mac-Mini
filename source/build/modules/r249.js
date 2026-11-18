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
/* ---------- 7.39: one record for each model, the same in every place, and a record of every change and of any reset caught ----------
   Her answer (18 November 2026), asked how: "Both" (one setting everywhere, and a record of changes); her approval of the live preview
   (https://claude.ai/artifact/1Pi8wWFGkSGt71bAekYcUP, source/previews/model_limits): "I approve of the preview". Measured on 7.38
   (rig/t_739_limits.js does it again): a Reply set in Lector (modules/r233.js) was written on the model only, so the next change of
   who answers put back this module's older record (2,048 set in Lector came back as 8,192). Now every place writes through note():
   the record here, the model's own numbers, and Chat's Controls when it is Chat's model, all at once; a zero or broken value is never
   taken (the last good one is kept, and the record says so). */
var FL={tokens:"Reply",ctx:"Memory",effort:"Effort"},SL={tokens:"ctlTokens",ctx:"ctlCtx",effort:"ctlEffort"},DEF={tokens:1024,ctx:8192,effort:3};
var PN={lector:"Lector",career:"Vocatio",folders:"Folders",fabrica:"Fabrica",build:"Build",models:"Models",settings:"Settings",blend:"Blend",home:"Home",focus:"Focus"};
function placeNow(){try{var sec=D.querySelector("section.active[id^='page-']"),p=sec?sec.id.slice(5):"";
  if(p==="chat"){try{if(typeof ccIsCode==="function"&&typeof curChat==="function"&&ccIsCode(curChat()))return "Code";}catch(e){}return "Chat";}
  return PN[p]||"Ingenium";}catch(e){return "Ingenium";}}
function byId(id){try{return (state.models||[]).filter(function(x){return x.id===id;})[0]||null;}catch(e){return null;}}
function modelOf(k){return k&&k.indexOf("m:")===0?byId(k.slice(2)):null;}
function nameOf(k){if(!k)return "";if(k==="none")return "No model yet";var m=modelOf(k);if(m)return m.customName||"a model on this device";
  if(k.indexOf("c:")===0){var r=k.slice(2),i=r.indexOf("|");return (i>=0&&r.slice(i+1))||r.slice(0,i>=0?i:r.length)||"a connected model";}return k;}
function good(f,v){v=+v;return f==="effort"?(v>=1&&v<=5&&Math.round(v)===v):(isFinite(v)&&v>0);}
/* this answerer's record: its own, else the model's own numbers (kept before 6.52), else none */
function rec(k){if(!W.state||!k)return null;var g=S(),r=g.by[k];
  if(!r){var m=modelOf(k);if(m&&(+m.tokens>0||+m.ctx>0||+m.effort>0))r={tokens:+m.tokens||0,ctx:+m.ctx||0,effort:+m.effort||0};}
  return r?{tokens:+r.tokens||0,ctx:+r.ctx||0,effort:+r.effort||0,at:+r.at||0}:null;}
function log(e){var g=S();if(!Array.isArray(g.log))g.log=[];e.at=Date.now();g.log.unshift(e);if(g.log.length>200)g.log.length=200;
  try{W.dispatchEvent(new CustomEvent("ing-gen",{detail:e}));}catch(x){}}
function caught(k,f,bad,kept,place,why){if(!FL[f])return;log({k:k,n:nameOf(k),f:f,from:bad,to:kept,p:place||placeNow(),reset:true,why:why||""});}
function slider(f,v){var e=el(SL[f]);if(!e)return;busy=true;try{if(f==="effort"){e.value=String(v);}else{room();put(e,v);}
    try{if(typeof W.paintChatCtl==="function")W.paintChatCtl();}catch(x){}try{if(W.IngR215&&typeof IngR215.paintKey==="function")IngR215.paintKey();}catch(x){}}finally{busy=false;}}
/* the one way a value is set, from any place */
function note(k,f,v,place){if(!W.state||!k||!FL[f])return false;v=+v;if(f==="effort")v=Math.round(v);
  var g=S(),had=!!g.by[k],old=rec(k),r=g.by[k]||{},cur=old?old[f]:0,fill=g.last||{};
  /* Chat's own model, the first time: the base page has already written the slider's number on the model, so its "before" is unknown */
  if(!had&&k===key()&&SL[f]&&f!=="effort")cur=0;
  ["tokens","ctx","effort"].forEach(function(x){if(!good(x,r[x]))r[x]=old&&good(x,old[x])?old[x]:(good(x,fill[x])?+fill[x]:DEF[x]);});
  if(!good(f,v)){var keepV=good(f,cur)?cur:r[f];caught(k,f,v,keepV,place,"asked for "+(isFinite(v)?v:"nothing"));if(k===key())slider(f,keepV);return false;}
  var same=had&&good(f,cur)&&+cur===v;r[f]=v;r.at=Date.now();g.by[k]=r;g.last=g.last||{};g.last[f]=v;
  var m=modelOf(k);if(m){m[f]=v;if(f==="ctx"){m.ctxUser=true;delete m.ctxAuto;}}
  if(k===key()&&now()[f]!==v)slider(f,v);
  if(!same)log({k:k,n:nameOf(k),f:f,from:good(f,cur)?cur:0,to:v,p:place||placeNow()});
  try{saveState();}catch(e){}paintSection();
  if(!same)try{W.dispatchEvent(new CustomEvent("ing-gen-set",{detail:{k:k,f:f,v:v}}));}catch(x){}
  return true;}
/* kept: every change she makes in Chat's Controls (a slider, the effort menu): only the control she moved */
function keep(f){if(busy||!W.state)return;var k=key(),v=now();
  (f?[f]:["tokens","ctx","effort"]).forEach(function(x){note(k,x,v[x]);});}
/* given back: this answerer's own, else (a model's own numbers from before 6.52), else the last she chose anywhere; a lost value
   in it is mended to the last good one, and the record says so */
function restore(){if(!W.state)return false;var k=key();lastKey=k;var g=S(),v=rec(k);
  if(v){var fix=false;["tokens","ctx","effort"].forEach(function(x){if(!good(x,v[x])){var to=good(x,(g.last||{})[x])?+g.last[x]:DEF[x];caught(k,x,v[x],to,null,"a lost value");v[x]=to;fix=true;}});
    if(fix){if(g.by[k]){g.by[k].tokens=v.tokens;g.by[k].ctx=v.ctx;g.by[k].effort=v.effort;}var mm=modelOf(k);if(mm){mm.tokens=v.tokens;mm.ctx=v.ctx;mm.effort=v.effort;}try{saveState();}catch(e){}}}
  if(!v)v=g.last;if(!v)return false;
  busy=true;try{room();put(el("ctlTokens"),v.tokens);put(el("ctlCtx"),v.ctx);var e=el("ctlEffort");if(e&&+v.effort>=1&&+v.effort<=5)e.value=String(+v.effort);
    try{if(typeof W.paintChatCtl==="function")W.paintChatCtl();}catch(x){}try{if(W.IngR215&&typeof IngR215.paintKey==="function")IngR215.paintKey();}catch(x){}}
  finally{busy=false;}paintSection();return true;}
function wire(){[["ctlTokens","tokens"],["ctlCtx","ctx"],["ctlEffort","effort"]].forEach(function(a){var e=el(a[0]);if(!e||e.__r249)return;e.__r249=1;
    var f=function(){setTimeout(function(){keep(a[1]);},0);};e.addEventListener("input",f);e.addEventListener("change",f);});}
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
W.IngGen={version:2,key:key,keep:keep,restore:restore,section:section,paint:paintSection,
  note:note,rec:rec,caught:caught,name:nameOf,place:placeNow,good:good,defaults:DEF,
  log:function(){try{return (S().log||[]).slice();}catch(e){return [];}},entry:function(e){try{if(e&&typeof e==="object")log(e);}catch(x){}}};
})();
;try{window.__ingParts["p249"]="running";}catch(_){}
</script>
