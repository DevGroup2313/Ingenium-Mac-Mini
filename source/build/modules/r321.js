<style id="r321-css">
/* ============ R321 · ONE SETTING FOR EACH MODEL: THE SAME KEY BESIDE IT IN EVERY PLACE, AND A RECORD OF EVERY CHANGE (Ingenium 7.39, 18 November 2026) ============
   Her words: the Tokens and Context controls reset to zero, are "out whack all over the app", and can be set only on the chat pages,
   with no effort level elsewhere. Asked what to do (18 November 2026): "Both" (one setting everywhere, and a record that shows where a
   reset comes from). Her approval of the live preview (https://claude.ai/artifact/1Pi8wWFGkSGt71bAekYcUP, source/previews/model_limits):
   "I approve of the preview".
   The key beside the model, in Chat and Code (beside the model in the message box), Lector, Vocatio and Folders (in place of their
   Reply and Memory menus), and Fabrica (under its head, for the model Chat and Code use there): Reply, Memory and Effort for that
   model. Pressed, a small sheet sets the three; each change goes through the one record (modules/r249.js, IngGen.note), so it is the
   change in every place. In Settings, Models and AI: each model with its key, and every change and any reset caught, newest first. */
.gk{display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(106,63,181,.16);border-radius:10px;padding:6px 11px;cursor:pointer;
  background:linear-gradient(rgba(106,63,181,.1),rgba(106,63,181,.1)),linear-gradient(var(--card-hi,#fff),var(--card-lo,#f9f7fc));color:#6a3fb5;
  font:600 12.3px/1.2 var(--sans,system-ui,sans-serif);white-space:nowrap;max-width:100%;
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.22),0 4px 5px rgba(40,22,68,.14),0 9px 14px rgba(40,22,68,.08);
  transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s ease}
.gk:hover{transform:translateY(-2px);box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.22),0 6px 8px rgba(40,22,68,.16),0 13px 20px rgba(40,22,68,.1)}
.gk:active{transform:translateY(1px)}
.gk:focus-visible{outline:3px solid #6a3fb5;outline-offset:2px}
.gk b{font-weight:700;font-variant-numeric:tabular-nums;color:inherit}
.gk .gk-s{opacity:.5}
.gk[hidden]{display:none!important}
body[data-theme="night"] .gk{color:#b79ce6;border-color:rgba(183,156,230,.18);background:linear-gradient(rgba(183,156,230,.13),rgba(183,156,230,.13)),linear-gradient(#2a2239,#251e33);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5),0 9px 14px rgba(0,0,0,.36)}
body[data-theme="night"] .gk:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -2px 0 rgba(0,0,0,.4),0 3px 0 rgba(0,0,0,.7),0 7px 10px rgba(0,0,0,.5)}
body[data-theme="night"] .gk:focus-visible{outline-color:#b79ce6}
/* in the message box, beside the model */
.chat-top-key.model + .gk{margin-left:2px}
/* Lector, Vocatio and Folders: the key in place of the two menus */
.wlim.gk-on{gap:6px 10px}
#cs > .c-lims .wlim.gk-on .wlim-say{display:none}
/* Fabrica: under its head */
.gk-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;margin:10px 0 0;font-size:12.5px;color:var(--ink-2,#4a4358)}
/* the small sheet */
.gk-pop{position:fixed;z-index:9000;width:min(380px,calc(100vw - 32px));border-radius:16px;border:1px solid var(--hairline,rgba(34,26,46,.1));background:var(--card,#fff);color:var(--ink-1,#221a2e);
  box-shadow:0 2px 0 rgba(40,22,68,.08),0 8px 16px rgba(40,22,68,.1),0 18px 38px rgba(40,22,68,.12);padding:14px;display:grid;gap:10px;
  max-height:calc(100vh - 32px);overflow:auto;scrollbar-width:none;animation:gkRise .3s cubic-bezier(.2,.9,.25,1.2) both;font:14px/1.5 var(--sans,system-ui,sans-serif)}
.gk-pop::-webkit-scrollbar{display:none}
@keyframes gkRise{from{opacity:0;transform:translateY(6px)}}
.gk-pop h3{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:0;font:600 15px/1.35 var(--serif,Georgia,serif);color:var(--ink-1,#221a2e)}
.gk-chip{display:inline-flex;align-items:center;font:600 11.5px/1 var(--sans,system-ui);padding:5px 9px;border-radius:999px;background:rgba(31,157,99,.14);color:#1a7f50;white-space:nowrap}
.gk-r{display:grid;grid-template-columns:70px minmax(0,1fr) 76px;gap:10px;align-items:center}
.gk-r.eff{grid-template-columns:70px minmax(0,1fr)}
.gk-r label,.gk-r .gk-l{font:600 12.5px/1.2 var(--sans,system-ui);color:var(--ink-2,#4a4358)}
.gk-r output{font:600 13px/1 var(--sans,system-ui);font-variant-numeric:tabular-nums;color:var(--ink-1,#221a2e);text-align:right}
.gk-r input[type=range]{width:100%;margin:0;accent-color:#6a3fb5}
.gk-r select{font:inherit;font-size:12.5px;padding:5px 8px;border-radius:9px;border:1px solid var(--hairline,rgba(34,26,46,.14));background:var(--card-hi,#fff);color:inherit;grid-column:2 / 4}
.gk-fine{margin:0;color:var(--ink-3,#6c6579);font-size:12.2px;line-height:1.5}
.gk-seg{display:flex;gap:6px;flex-wrap:wrap}
.gk-seg button{border:1px solid var(--hairline,rgba(34,26,46,.12));background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f9f7fc));border-radius:9px;padding:6px 10px;cursor:pointer;
  font:600 12px/1 var(--sans,system-ui);color:var(--ink-2,#4a4358);box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.12),0 2px 0 rgba(40,22,68,.2),0 3px 5px rgba(40,22,68,.1);transition:transform .25s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
.gk-seg button:hover{transform:translateY(-2px)}
.gk-seg button[aria-pressed="true"]{background:linear-gradient(#7348be,#5d37a1);border-color:#4b2a86;color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26)}
body[data-theme="night"] .gk-pop{background:#201a2b;color:#f6f1fd;border-color:rgba(205,184,240,.11);box-shadow:0 2px 0 rgba(0,0,0,.45),0 10px 20px rgba(0,0,0,.42),0 20px 40px rgba(0,0,0,.4)}
body[data-theme="night"] .gk-pop h3,body[data-theme="night"] .gk-r output{color:#f6f1fd}
body[data-theme="night"] .gk-r label,body[data-theme="night"] .gk-r .gk-l{color:#d3c9e3}
body[data-theme="night"] .gk-fine{color:#a99cc1}
body[data-theme="night"] .gk-chip{background:rgba(64,192,128,.15);color:#6fd8a2}
body[data-theme="night"] .gk-seg button{background:linear-gradient(#2a2239,#251e33);color:#d3c9e3;border-color:rgba(205,184,240,.11);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 2px 0 rgba(0,0,0,.7)}
body[data-theme="night"] .gk-seg button[aria-pressed="true"]{background:linear-gradient(#7a56c8,#5b3aa1);border-color:#2c1956;color:#fff}
body[data-theme="night"] .gk-r select{background:#211a2b;color:#e9e3f3;border-color:rgba(233,227,243,.18)}
body[data-theme="night"] .gk-r input[type=range]{accent-color:#b79ce6}
/* Settings, Models and AI: each model with its key, and the record */
#genLogCard .gl-head{display:flex;gap:12px;align-items:flex-start;margin-bottom:10px}
#genLogCard .gl-coin{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;flex:0 0 auto;color:#6a3fb5;background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f9f7fc));
  box-shadow:inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -3px 5px rgba(60,30,90,.16),0 1px 1px rgba(40,20,70,.3),0 3px 4px rgba(40,20,70,.24),0 6px 9px rgba(40,20,70,.18);transition:transform .45s cubic-bezier(.2,.9,.25,1.2)}
#genLogCard .gl-coin:hover{transform:rotate(-6deg) scale(1.05)}
#genLogCard .gl-coin svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
#genLogCard .gl-sub{margin:2px 0 0;font-size:12.8px;line-height:1.5;color:var(--ink-2,#4a4358)}
#genLogCard h3{font:600 14.5px/1.4 var(--serif,Georgia,serif);color:var(--ink-1,#221a2e);margin:14px 0 8px}
#genLogCard .gl-models{display:grid;gap:8px}
#genLogCard .gl-m{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 12px;padding:9px 11px;border-radius:12px;background:var(--well,rgba(106,63,181,.035));
  border:1px solid var(--hairline,rgba(34,26,46,.1));transition:transform .3s cubic-bezier(.2,.9,.25,1.2),box-shadow .2s}
#genLogCard .gl-m:hover{transform:translateY(-1.5px);box-shadow:0 6px 14px rgba(40,22,68,.1)}
#genLogCard .gl-m > span{font:600 13px/1.3 var(--sans,system-ui);color:var(--ink-1,#221a2e);min-width:0;overflow-wrap:anywhere}
#genLogCard .gl-log{display:grid;gap:8px}
#genLogCard .gl-e{display:grid;grid-template-columns:auto minmax(0,1fr);gap:2px 10px;padding:9px 11px;border-radius:12px;background:var(--well,rgba(106,63,181,.035));border:1px solid var(--hairline,rgba(34,26,46,.1));transition:transform .3s cubic-bezier(.2,.9,.25,1.2)}
#genLogCard .gl-e:hover{transform:translateX(3px)}
#genLogCard .gl-e time{font:600 11.5px/1.4 var(--sans,system-ui);color:var(--ink-3,#6c6579);font-variant-numeric:tabular-nums;white-space:nowrap}
#genLogCard .gl-e b{color:var(--ink-1,#221a2e);font-weight:650}
#genLogCard .gl-e small{grid-column:2;color:var(--ink-3,#6c6579);font-size:12px;line-height:1.45}
#genLogCard .gl-e.amb{background:rgba(232,144,42,.14);border-color:transparent}
#genLogCard .gl-e.amb b{color:#b4600f}
#genLogCard .gl-none{margin:0;font-size:12.8px;color:var(--ink-3,#6c6579)}
#genLogCard .gl-more{margin-top:10px}
body[data-theme="night"] #genLogCard .gl-coin{color:#b79ce6;background:linear-gradient(#2a2239,#251e33);box-shadow:inset 0 1.5px 0 rgba(255,255,255,.16),inset 0 -3px 5px rgba(0,0,0,.45),0 1px 1px rgba(0,0,0,.65),0 3px 4px rgba(0,0,0,.55),0 6px 9px rgba(0,0,0,.45)}
body[data-theme="night"] #genLogCard .gl-e.amb{background:rgba(240,176,96,.15)}
body[data-theme="night"] #genLogCard .gl-e.amb b{color:#f0b060}
/* 7.40: taken off the pages, her words (18 November 2026): "The Tokens and Effort levels need to be folded away into one discreet button,
   right now they are cluttering the pages designs and layout, especially the Vocatio and Fabrica page, please remove these buttons from
   where they are currently placed". Gone from Vocatio (its Effort row and key under the room keys), Lector, Folders, Fabrica's head and the
   chat box; they stay in the model's name in the top bar and in Settings, Models and AI, until she chooses the one discreet button's
   place on its live preview (the top bar, or a small key by each page's title). */
#cs > .c-lims,.wef,.wlim,#chatGenKey,#fbGenRow{display:none!important}
@media (prefers-reduced-motion: reduce){.gk,.gk-seg button,#genLogCard .gl-m,#genLogCard .gl-e,#genLogCard .gl-coin{transition:none}.gk:hover,.gk-seg button:hover,#genLogCard .gl-m:hover,#genLogCard .gl-e:hover{transform:none}.gk-pop{animation:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p321"]="started";}catch(_){}
/* R321 · the key beside the model in every place, its small sheet, and the record in Settings: see the note at the top of its styles.
   window.IngGenKey */
(function r321(){
"use strict";
if(window.IngGenKey)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function G(){return W.IngGen&&typeof IngGen.note==="function"?IngGen:null;}
var EFL=["Low","Medium","High","Extra","Max"];
var LXP={Lector:1,Vocatio:1,Folders:1};
function fmt(n){try{return Number(n).toLocaleString("en-GB");}catch(e){return String(n);}}
function kay(n){n=+n||0;return n>=1024&&n%1024===0?(n/1024)+"K":fmt(n);}
function byId(id){try{return (state.models||[]).filter(function(x){return x.id===id;})[0]||null;}catch(e){return null;}}
function modelOf(k){return k&&k.indexOf("m:")===0?byId(k.slice(2)):null;}
function cloudKey(){try{var c=state.cloud||{};return c.provider?"c:"+String(c.provider||"")+"|"+String(c.model||""):"none";}catch(e){return "none";}}
function isCloud(k){return !!k&&k.indexOf("c:")===0;}
/* a place's own Auto: Chat, Code and Fabrica share the chat's (state.effort.auto); Lector, Vocatio and Folders share theirs (state.wEff) */
function autoName(place){try{if(LXP[place]){var w=String(state.wEff||"auto");return w==="auto"?"Auto":w==="ultra"?"Ultra":"";}
  return state.effort&&state.effort.auto?"Auto":"";}catch(e){return "";}}
function vals(k){var g=G(),r=g?g.rec(k):null,d=(g&&g.defaults)||{tokens:1024,ctx:8192,effort:3},o={tokens:d.tokens,ctx:d.ctx,effort:d.effort};
  if(r){if(r.tokens>0)o.tokens=r.tokens;if(r.ctx>0)o.ctx=r.ctx;if(r.effort>=1&&r.effort<=5)o.effort=r.effort;}
  else{try{var l=state.gen&&state.gen.last;if(l){if(+l.tokens>0)o.tokens=+l.tokens;if(+l.ctx>0)o.ctx=+l.ctx;if(+l.effort>=1&&+l.effort<=5)o.effort=+l.effort;}}catch(e){}}
  return o;}
function cloudWin(){try{return +((state.cloud||{}).window)||0;}catch(e){return 0;}}
function placeOf(el){var p=el&&el.getAttribute("data-gk-place");if(p)return p;var g=G();return g?g.place():"Ingenium";}

/* ---------- the key ---------- */
function paintChip(b){var kf=b.__gkKey,k="none";try{k=kf();}catch(e){}b.__gkK=k;
  if(!k||k==="none"){if(!b.hidden)b.hidden=true;return;}if(b.hidden)b.hidden=false;
  var v=vals(k),au=autoName(placeOf(b)),mem=isCloud(k)?(cloudWin()>0?kay(cloudWin()):"its own"):kay(v.ctx);
  var sig=v.tokens+"|"+mem+"|"+v.effort+"|"+au;if(b.__gkSig===sig)return;b.__gkSig=sig;
  if(!b.__gkIcon){b.innerHTML="";function part(l,x){var s=mk("span");s.appendChild(D.createTextNode(l+" "));s.appendChild(mk("b",null,x));b.appendChild(s);}
  part("Reply",kay(v.tokens));b.appendChild(mk("span","gk-s","·"));part("Memory",mem);b.appendChild(mk("span","gk-s","·"));part("Effort",au||EFL[v.effort-1]);}   /* 7.41: a round key (r325) keeps its mark; its title says the numbers */
  var g=G(),nm=g?g.name(k):"this model";b.title="Reply, Memory and Effort for "+nm+": the same in every place";
  b.setAttribute("aria-label","Reply "+fmt(v.tokens)+" tokens, Memory "+(isCloud(k)&&cloudWin()<=0?"the model's own":fmt(isCloud(k)?cloudWin():v.ctx)+" tokens")+", Effort "+(au||EFL[v.effort-1])+", for "+nm+". Press to change.");}
function chip(keyFn,place,opts){var b=mk("button","gk");if(opts&&opts.icon)b.__gkIcon=true;b.type="button";b.__gkKey=typeof keyFn==="function"?keyFn:function(){return String(keyFn||"none");};
  if(place)b.setAttribute("data-gk-place",place);b.setAttribute("aria-haspopup","dialog");b.setAttribute("aria-expanded","false");
  b.addEventListener("click",function(ev){ev.preventDefault();ev.stopPropagation();if(POP&&POP.__for===b){close();return;}open(b);});
  paintChip(b);return b;}
function paintChips(){[].forEach.call(D.querySelectorAll(".gk,.mk3"),function(b){try{if(b.__gkKey)paintChip(b);}catch(e){}});}   /* 7.41: the round keys too (r325) */

/* ---------- the small sheet ---------- */
var POP=null,TM=null;
function close(){if(!POP)return;var b=POP.__for;if(b)b.setAttribute("aria-expanded","false");POP.remove();POP=null;}
function setEffort(k,v,place){var g=G();if(!g)return;
  if(LXP[place]&&W.IngWriteEffort&&typeof IngWriteEffort.set==="function"&&W.IngLimits&&IngLimits.pageKey&&IngLimits.pageKey()===k){IngWriteEffort.set(String(v));}
  else{try{if(place==="Chat"||place==="Code"||place==="Fabrica"){if(!state.effort||typeof state.effort!=="object")state.effort={};state.effort.auto=false;}
      else if(LXP[place]){state.wEff=String(v);}}catch(e){}g.note(k,"effort",v,place);}
  try{if(W.IngR215&&typeof IngR215.paintKey==="function")IngR215.paintKey();}catch(e){}}
function setWin(k,v,place){var o=$("ctlCloudCtx"),from=cloudWin();if(from===v)return;
  if(o&&k===(G()&&G().key())){o.value=String(v);try{o.dispatchEvent(new Event("change",{bubbles:true}));}catch(e){}}
  try{state.cloud=state.cloud||{};state.cloud.window=v;saveState();}catch(e){}
  try{G().entry({k:k,n:G().name(k),f:"window",from:from,to:v,p:place});}catch(e){}}
function replyMax(k,m){var x=0;try{if(m&&typeof W.ingReplyMax==="function")x=+W.ingReplyMax(m)||0;}catch(e){}
  if(!(x>=256)){var t=$("ctlTokens");if(t&&G()&&k===G().key())x=+t.max||0;}return Math.max(x>=256?x:32768,vals(k).tokens);}
function ctxMax(m){var x=0;try{if(typeof W.ingCtxMax==="function")x=+W.ingCtxMax(m)||0;}catch(e){}if(!(x>=2048)){x=+(m&&(m.ctxTrain||m.ctxLen))||0;}return Math.max(x>=2048?x:32768,vals("m:"+(m&&m.id)).ctx);}
function open(b){close();var g=G();if(!g)return;var k=b.__gkK||"none";if(k==="none")return;var place=placeOf(b),m=modelOf(k),v=vals(k),nm=g.name(k);
  var p=mk("div","gk-pop");p.setAttribute("role","dialog");p.setAttribute("aria-label","Reply, Memory and Effort for "+nm);p.__for=b;
  var h=mk("h3");h.appendChild(mk("span",null,nm));h.appendChild(mk("span","gk-chip","The same in every place"));p.appendChild(h);
  function range(id,lab,min,max,step,val,onset){var r=mk("div","gk-r"),l=mk("label",null,lab);l.htmlFor=id;var i=D.createElement("input");i.type="range";i.id=id;
    i.min=String(min);i.max=String(max);i.step=String(step);if(val%step||val<min)i.step="any";i.value=String(val);var o=mk("output",null,fmt(val));r.appendChild(l);r.appendChild(i);r.appendChild(o);
    i.addEventListener("input",function(){o.textContent=fmt(+i.value);clearTimeout(TM);TM=setTimeout(function(){onset(Math.round(+i.value));},350);});
    i.addEventListener("change",function(){clearTimeout(TM);onset(Math.round(+i.value));});
    i.addEventListener("keydown",function(ev){if(ev.key!=="Escape")ev.stopPropagation();});return r;}
  p.appendChild(range("gkReply","Reply",256,replyMax(k,m),256,v.tokens,function(x){g.note(k,"tokens",x,place);paintChips();}));
  p.appendChild(mk("p","gk-fine","The longest answer it may write, in tokens. A task that needs more still gets what it needs."));
  if(isCloud(k)){var r=mk("div","gk-r"),l=mk("label",null,"Memory");l.htmlFor="gkMem";var s=D.createElement("select");s.id="gkMem";
    [[0,"Auto: the model's own window"],[32768,"32K"],[65536,"64K"],[131072,"128K"],[200000,"200K"],[1000000,"1M"]].forEach(function(x){var op=mk("option",null,x[1]);op.value=String(x[0]);s.appendChild(op);});
    var cw=cloudWin();if(!s.querySelector('option[value="'+cw+'"]')){var op2=mk("option",null,kay(cw));op2.value=String(cw);s.appendChild(op2);}s.value=String(cw);
    s.addEventListener("change",function(){setWin(k,+s.value||0,place);paintChips();});r.appendChild(l);r.appendChild(s);p.appendChild(r);
    p.appendChild(mk("p","gk-fine","How much of the conversation Ingenium gives this connected model at once."));}
  else{var cmax=ctxMax(m),tr=+(m&&(m.ctxTrain||m.ctxLen))||0;
    p.appendChild(range("gkMem","Memory",Math.min(2048,v.ctx),cmax,1024,v.ctx,function(x){g.note(k,"ctx",x,place);paintChips();}));
    p.appendChild(mk("p","gk-fine","How much of the conversation it holds at once (its context)"+(tr>0?", up to what the model was trained for: "+fmt(tr)+" here":"")+". A new memory takes effect when the model next loads."));}
  var er=mk("div","gk-r eff");er.appendChild(mk("span","gk-l","Effort"));var seg=mk("div","gk-seg");seg.setAttribute("role","group");seg.setAttribute("aria-label","Effort");
  var au=autoName(place);
  EFL.forEach(function(n,i){var x=mk("button",null,n);x.type="button";x.setAttribute("aria-pressed",String(!au&&v.effort===i+1));
    x.addEventListener("click",function(ev){ev.stopPropagation();setEffort(k,i+1,place);[].forEach.call(seg.children,function(y,j){y.setAttribute("aria-pressed",String(j===i));});
      var a=p.querySelector(".gk-auto");if(a)a.remove();paintChips();});seg.appendChild(x);});
  er.appendChild(seg);p.appendChild(er);
  if(au)p.appendChild(mk("p","gk-fine gk-auto",au+" is on "+(LXP[place]?"for Lector, Vocatio and Folders":"in Chat and Code")+": it chooses the effort for each piece of work. Pressing a level sets it by hand."));
  p.appendChild(mk("p","gk-fine","Kept on this device for this model, over restarts and updates. Never set to zero: a lost or broken value is mended to its last good one, and the record in Settings, Models and AI says so."));
  p.addEventListener("click",function(ev){ev.stopPropagation();});
  p.addEventListener("keydown",function(ev){if(ev.key==="Escape"){ev.stopPropagation();close();try{b.focus();}catch(e){}}});
  D.body.appendChild(p);POP=p;b.setAttribute("aria-expanded","true");place2(b,p);
  try{var f=p.querySelector("input,select,button");if(f)f.focus({preventScroll:true});}catch(e){}}
function place2(b,p){var r=b.getBoundingClientRect(),vw=W.innerWidth||D.documentElement.clientWidth,vh=W.innerHeight||D.documentElement.clientHeight,pw=p.offsetWidth,ph=p.offsetHeight;
  var left=Math.max(16,Math.min(r.left,vw-16-pw)),top=r.bottom+8;if(top+ph>vh-16&&r.top-8-ph>=16)top=r.top-8-ph;if(top+ph>vh-16)top=Math.max(16,vh-16-ph);
  p.style.left=Math.round(left)+"px";p.style.top=Math.round(top)+"px";}
D.addEventListener("pointerdown",function(ev){if(POP&&!POP.contains(ev.target)&&!(POP.__for&&POP.__for.contains(ev.target)))close();},true);
W.addEventListener("resize",function(){if(POP&&POP.__for&&POP.__for.isConnected)place2(POP.__for,POP);else close();});

/* ---------- the places ---------- */
function chatKey(){var g=G();return g?g.key():"none";}
function placeChat(){var mb=$("chatModelBtn");if(!mb||!mb.parentNode)return;var nx=mb.nextElementSibling;if(nx&&nx.classList.contains("gk"))return;
  var b=chip(chatKey,null);b.id="chatGenKey";mb.parentNode.insertBefore(b,mb.nextSibling);}
function placeFabrica(){var pg=$("page-fabrica");if(!pg||$("fbGenKey"))return;var keys=pg.querySelector(".skh-keys"),host=keys?keys.parentNode:pg.querySelector("#fb");if(!host)return;
  var row=mk("div","gk-row");row.id="fbGenRow";row.appendChild(mk("span",null,"Chat and Code answer here with:"));var b=chip(chatKey,"Fabrica");b.id="fbGenKey";row.appendChild(b);
  if(keys)host.insertBefore(row,keys.nextSibling);else host.insertBefore(row,host.firstChild);}
function pageKeyFn(){try{return W.IngLimits&&IngLimits.pageKey?IngLimits.pageKey():"none";}catch(e){return "none";}}

/* ---------- Settings, Models and AI: each model with its key, and the record ---------- */
var ALL=false;
function when(t){try{var d=new Date(t),n=new Date();var hm=d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});
  return d.toDateString()===n.toDateString()?hm:d.toLocaleDateString("en-GB",{day:"numeric",month:"short"})+", "+hm;}catch(e){return "";}}
function val(f,v){if(f==="effort")return EFL[(+v||0)-1]||String(v);if(f==="window")return +v>0?fmt(+v):"the model's own";return fmt(+v||0);}
var FN={tokens:"Reply",ctx:"Memory",effort:"Effort",window:"Memory"};
function line(e){var f=FN[e.f]||e.f,nm=e.n||"a model";
  if(e.reset){var bad=(e.from===undefined||e.from===null||e.from==="")?"nothing":(isFinite(+e.from)?fmt(+e.from):String(e.from));
    return {b:"A reset caught",s:(e.why==="a lost value"?nm+": "+f+" was lost ("+bad+"). It was mended to "+val(e.f,e.to)+", the last good value.":nm+": "+(e.p||"A place")+" asked for "+f+" "+bad+". It was kept at "+val(e.f,e.to)+", the last good value."),amb:true};}
  return {b:f+" "+(+e.from>0?val(e.f,e.from)+" to ":"set to ")+val(e.f,e.to),s:nm+", in "+(e.p||"Ingenium")+", and so in every place"};}
function keys(){var out=[],seen={};function add(k){if(k&&k!=="none"&&!seen[k]){seen[k]=1;out.push(k);}}
  try{(state.models||[]).forEach(function(m){add("m:"+m.id);});}catch(e){}add(cloudKey());
  try{Object.keys((state.gen&&state.gen.by)||{}).forEach(function(k){if(k.indexOf("c:")===0)add(k);});}catch(e){}return out;}
function card(){var c=$("genLogCard");if(c)return c;var page=$("page-settings");if(!page)return null;
  c=mk("div","card");c.id="genLogCard";var host=$("awakeCard")||$("ragCard")||$("ingEarsCard")||$("personaCard");
  if(host&&host.parentNode)host.parentNode.insertBefore(c,host.nextSibling);else page.appendChild(c);return c;}
/* the places this copy has (the gift and demo editions carry no Vocatio and no Fabrica) */
function placesText(){var a=["Chat","Code"];[["page-lector","Lector"],["page-career","Vocatio"],["page-folders","Folders"],["page-fabrica","Fabrica"]].forEach(function(x){if($(x[0]))a.push(x[1]);});
  return a.slice(0,-1).join(", ")+" and "+a[a.length-1];}
function paintCard(){var c=card();if(!c)return;var g=G();
  c.innerHTML='<div class="gl-head"><span class="gl-coin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2.2"/><circle cx="10" cy="17" r="2.2"/></svg></span>'
    +'<div><h2 class="sec" style="margin:0">Reply, Memory and Effort</h2><p class="gl-sub">One setting for each model, the same in '+placesText()+'. Press a model\'s key to change it.</p></div></div>';
  c.appendChild(mk("h3",null,"Each model"));var ml=mk("div","gl-models"),ks=keys();
  if(!ks.length)ml.appendChild(mk("p","gl-none","No model is ready yet. Once one is, its key is here."));
  ks.forEach(function(k){var row=mk("div","gl-m");row.appendChild(mk("span",null,g?g.name(k):k));row.appendChild(chip(function(){return k;},"Settings"));ml.appendChild(row);});
  c.appendChild(ml);
  c.appendChild(mk("h3",null,"Every change, and any reset"));var lg=mk("div","gl-log"),L=g?g.log():[];
  if(!L.length)lg.appendChild(mk("p","gl-none","Nothing yet. Each change from now on is kept here, newest first, with the place that made it."));
  L.slice(0,ALL?200:12).forEach(function(e){var x=line(e),d=mk("div","gl-e"+(x.amb?" amb":""));d.appendChild(mk("time",null,when(e.at)));d.appendChild(mk("b",null,x.b));d.appendChild(mk("small",null,x.s));lg.appendChild(d);});
  c.appendChild(lg);
  if(L.length>12){var mo=mk("button","btn xs ghost gl-more",ALL?"Show the newest only":"Show all "+L.length);mo.type="button";mo.onclick=function(){ALL=!ALL;paintCard();};c.appendChild(mo);}}
function paintCardSoon(){var c=$("genLogCard");if(!c||!c.isConnected){paintCard();return;}if(c.offsetParent!==null)paintCard();else c.__dirty=1;}

/* ---------- start, and kept in step ---------- */
function all(){try{if(!$("genLogCard"))paintCard();}catch(e){}paintChips();}   /* 7.40: no key in the chat box or under Fabrica's head */
W.addEventListener("ing-gen",function(){paintChips();try{paintCardSoon();}catch(e){}});
W.addEventListener("ing-gen-set",function(){paintChips();});
function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r321)return;var ng=function(p){close();var r=og.apply(this,arguments);setTimeout(function(){all();if(p==="settings")try{paintCard();}catch(e){}},0);return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r321=1;W.go=ng;}
(function wait(n){if(W.__ingReady===true&&W.state&&G()){try{wrapGo();all();setTimeout(all,2500);}catch(e){}
    setInterval(function(){if(D.hidden||(W.IngStill&&IngStill.on()))return;try{if(POP&&!(POP.__for&&POP.__for.isConnected&&POP.__for.offsetParent))close();paintChips();}catch(e){}},1500);return;}
  if(n<240)setTimeout(function(){wait(n+1);},250);})(0);
W.IngGenKey={version:1,chip:chip,paint:paintChips,open:open,close:close,card:paintCard,pageKey:pageKeyFn,line:line};
})();
;try{window.__ingParts["p321"]="running";}catch(_){}
</script>
