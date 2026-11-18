<style id="r328-css">
/* ============ R328 · WHO SERVES YOUR MODELS: YOUR COMPUTERS IN ORDER (Ingenium 7.42, 18 November 2026) ============
   Her answer (18 November 2026): "I want the Mac mini as the default with the 2 TB drive but also if its not available or near, I want to
   use the HP 16GB laptops." Her word on the live preview (https://claude.ai/artifact/9YgFwK1uKce3NXHgD4xRzt, source/previews/model_server):
   "I approve of the preview".
   Before (r274): a device pairs once with each computer and she chooses one by hand; when it is away, the chat waits for it. Now, in
   Settings, Models and AI, Your devices: her paired computers in her order (she moves them up and down; the first is her default), each
   with its state; with "The first that answers serves your models" on, before a message the computers are asked in that order and the
   first that answers serves it, keeping the model she chose when it has it; when that is not the one in use, the chat moves to it and says
   so. Sealed as every pairing is (7.37). A plain word under it: a drive adds room for models, not memory. */
#srvCard{--sv-well:rgba(106,63,181,.035);--sv-line:var(--hairline,rgba(34,26,46,.1));--sv-ink1:var(--ink-1,#221a2e);--sv-ink2:var(--ink-2,#4a4358);--sv-ink3:var(--ink-3,#6c6579);--sv-acc:#6a3fb5;
  --sv-key:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f9f7fc));--sv-key-sh:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.1);
  --sv-key-hi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --sv-row-sh:0 1px 0 rgba(40,22,68,.06),0 2px 6px rgba(40,22,68,.06);--sv-row-hi:0 2px 0 rgba(40,22,68,.08),0 8px 16px rgba(40,22,68,.12);
  --sv-ok-t:rgba(31,157,99,.14);--sv-ok-c:#1a7f50;--sv-gry-t:rgba(34,26,46,.07);--sv-gry-c:#6c6579;--sv-lav-t:rgba(106,63,181,.12);--sv-amb-t:rgba(232,144,42,.16);--sv-amb-c:#b4600f;
  --sv-groove:linear-gradient(#e4dced,#efe9f5);--sv-groove-sh:inset 0 2px 3px rgba(40,22,68,.28),inset 0 -1px 0 rgba(255,255,255,.9);
  --sv-pearl:radial-gradient(circle at 36% 30%,#fff 0 18%,#f4f0fa 40%,#ddd3ec 78%,#c9bcdf 100%);--sv-pearl-sh:inset 0 -2px 3px rgba(60,30,90,.18),0 1px 1px rgba(40,20,70,.35),0 3px 5px rgba(40,20,70,.25)}
body[data-theme="night"] #srvCard{--sv-well:rgba(183,156,230,.05);--sv-line:rgba(205,184,240,.12);--sv-ink1:#f6f1fd;--sv-ink2:#d3c9e3;--sv-ink3:#a99cc1;--sv-acc:#b79ce6;
  --sv-key:linear-gradient(#2a2239,#251e33);--sv-key-sh:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5);
  --sv-key-hi:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -2px 0 rgba(0,0,0,.4),0 3px 0 rgba(0,0,0,.7),0 7px 10px rgba(0,0,0,.5);
  --sv-row-sh:0 1px 0 rgba(0,0,0,.4),0 3px 8px rgba(0,0,0,.3);--sv-row-hi:0 2px 0 rgba(0,0,0,.45),0 10px 20px rgba(0,0,0,.42);
  --sv-ok-t:rgba(64,192,128,.15);--sv-ok-c:#6fd8a2;--sv-gry-t:rgba(233,227,243,.08);--sv-gry-c:#a99cc1;--sv-lav-t:rgba(183,156,230,.15);--sv-amb-t:rgba(240,176,96,.15);--sv-amb-c:#f0b060;
  --sv-groove:linear-gradient(#120d1a,#1b1526);--sv-groove-sh:inset 0 2px 4px rgba(0,0,0,.7),inset 0 -1px 0 rgba(255,255,255,.05);
  --sv-pearl:radial-gradient(circle at 36% 30%,#f2ecfb 0 14%,#cfc2e6 42%,#9d8cbd 80%,#7d6c9e 100%);--sv-pearl-sh:inset 0 -2px 3px rgba(0,0,0,.3),0 1px 1px rgba(0,0,0,.7),0 3px 5px rgba(0,0,0,.55)}
#srvCard button{font:inherit;color:inherit;cursor:pointer}
#srvCard .sv-sub{margin:4px 0 0;font-size:12.8px;line-height:1.5;color:var(--sv-ink2);max-width:72ch}
#srvCard .sv-list{display:flex;flex-direction:column;gap:10px;margin-top:12px}
#srvCard .sv-row{display:grid;grid-template-columns:auto auto minmax(0,1fr) auto;gap:12px;align-items:center;padding:12px 14px;border-radius:14px;border:1px solid var(--sv-line);background:var(--sv-well);box-shadow:var(--sv-row-sh);
  transition:transform .3s cubic-bezier(.2,.9,.25,1.2),box-shadow .2s,opacity .3s}
#srvCard .sv-row:hover{transform:translateY(-2px);box-shadow:var(--sv-row-hi)}
#srvCard .sv-row.serves{border-color:var(--sv-acc);box-shadow:0 0 0 2px var(--sv-lav-t),var(--sv-row-sh)}
#srvCard .sv-row.away{opacity:.74}
#srvCard .sv-n{font:600 22px/1 "Home Cormorant","Cormorant Garamond",Georgia,serif;font-variant-numeric:lining-nums;color:var(--sv-acc);min-width:20px;text-align:center}
#srvCard .sv-dev{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:var(--sv-key);box-shadow:var(--sv-key-sh);color:var(--sv-acc);transition:transform .45s cubic-bezier(.2,.9,.25,1.2)}
#srvCard .sv-row:hover .sv-dev{transform:rotate(-6deg) scale(1.05)}
#srvCard .sv-dev svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
#srvCard .sv-who{min-width:0}
#srvCard .sv-who b{display:block;color:var(--sv-ink1);font-size:14px;overflow-wrap:anywhere}
#srvCard .sv-who small{display:block;color:var(--sv-ink3);font-size:12.3px;line-height:1.45;overflow-wrap:anywhere}
#srvCard .sv-chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
#srvCard .sv-chip{display:inline-flex;align-items:center;gap:6px;font:600 11.5px/1 var(--sans,system-ui);padding:5px 9px;border-radius:999px;white-space:nowrap}
#srvCard .sv-chip i{width:7px;height:7px;border-radius:50%;background:currentColor}
#srvCard .sv-chip.ok{background:var(--sv-ok-t);color:var(--sv-ok-c)}#srvCard .sv-chip.off{background:var(--sv-gry-t);color:var(--sv-gry-c)}#srvCard .sv-chip.now{background:var(--sv-lav-t);color:var(--sv-acc)}#srvCard .sv-chip.def{background:var(--sv-amb-t);color:var(--sv-amb-c)}
#srvCard .sv-mini{display:flex;flex-direction:column;gap:4px}
#srvCard .sv-mini button{width:30px;height:28px;border-radius:9px;border:1px solid var(--sv-line);background:var(--sv-key);box-shadow:var(--sv-key-sh);font:600 12px/1 var(--sans,system-ui);color:var(--sv-ink2);transition:transform .25s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#srvCard .sv-mini button:hover{transform:translateY(-2px);box-shadow:var(--sv-key-hi)}#srvCard .sv-mini button:active{transform:translateY(1px)}
#srvCard .sv-sw{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;padding:10px 12px;border-radius:13px;border:1px solid var(--sv-line);background:var(--sv-well);box-shadow:var(--sv-row-sh);font-size:13px;color:var(--sv-ink1);cursor:pointer;transition:transform .3s cubic-bezier(.2,.9,.25,1.2),box-shadow .2s}
#srvCard .sv-sw:hover{transform:translateY(-2px);box-shadow:var(--sv-row-hi)}
#srvCard .sv-sw small{display:block;color:var(--sv-ink3);font-size:12px}
#srvCard .sv-tg{width:44px;height:25px;border-radius:999px;border:1px solid var(--sv-line);background:var(--sv-groove);box-shadow:var(--sv-groove-sh);position:relative;flex:0 0 auto;padding:0}
#srvCard .sv-tg::after{content:"";position:absolute;top:2px;left:2px;width:19px;height:19px;border-radius:50%;background:var(--sv-pearl);box-shadow:var(--sv-pearl-sh);transition:transform .35s cubic-bezier(.34,1.35,.64,1)}
#srvCard .sv-tg[aria-checked="true"]{background:linear-gradient(#8d66d6,#5d37a1)}#srvCard .sv-tg[aria-checked="true"]::after{transform:translateX(19px)}
#srvCard .sv-keys{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
#srvCard .sv-key{display:inline-flex;align-items:center;min-height:34px;padding:0 14px;border:1px solid var(--sv-line);border-radius:10px;background:var(--sv-key);box-shadow:var(--sv-key-sh);color:var(--sv-ink1);font-weight:600;font-size:12.8px;transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#srvCard .sv-key:hover{transform:translateY(-2px);box-shadow:var(--sv-key-hi)}#srvCard .sv-key:active{transform:translateY(1px)}
#srvCard .sv-empty{margin:12px 0 0;font-size:13px;color:var(--sv-ink3)}
#srvCard details.sv-why{margin-top:12px;border:1px solid var(--sv-line);border-radius:12px;background:var(--sv-well);padding:9px 12px;transition:transform .3s cubic-bezier(.2,.9,.25,1.2)}
#srvCard details.sv-why:hover{transform:translateX(3px)}
#srvCard details.sv-why summary{cursor:pointer;list-style:none;font-weight:600;font-size:13px;color:var(--sv-ink1);display:flex;justify-content:space-between}
#srvCard details.sv-why summary::-webkit-details-marker{display:none}
#srvCard details.sv-why summary::after{content:"Read";color:var(--sv-acc);font-size:12px}#srvCard details.sv-why[open] summary::after{content:"Fold"}
#srvCard details.sv-why p{margin:8px 0 0;font-size:12.8px;color:var(--sv-ink2)}
#srvCard .sv-mini button:focus-visible,#srvCard .sv-tg:focus-visible,#srvCard .sv-key:focus-visible{outline:3px solid var(--sv-acc);outline-offset:2px}
.msg .sv-said{display:block;width:max-content;max-width:100%;margin-top:8px;opacity:.8}
@media (prefers-reduced-motion: reduce){#srvCard *{transition:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p328"]="started";}catch(_){}
/* R328 · who serves your models: see the note at the top of its styles. window.IngServe */
(function r328(){
"use strict";
if(window.IngServe)return;
var W=window,D=document;
var IC={mini:'<rect x="3.5" y="9" width="17" height="7" rx="2.2"/><path d="M7 12.5h.01M17 12.5h.01"/>',laptop:'<rect x="5" y="5" width="14" height="10" rx="1.6"/><path d="M3 18.5h18"/>',
  desktop:'<rect x="3.5" y="4" width="17" height="11.5" rx="1.6"/><path d="M9 20h6M12 15.5V20"/>',tablet:'<rect x="5.5" y="3.5" width="13" height="17" rx="2"/><path d="M11 17.5h2"/>',phone:'<rect x="7.5" y="3" width="9" height="18" rx="2"/><path d="M11 18h2"/>'};
function L(){return W.IngLend?IngLend.state():{computers:[],active:null};}
function O(){var s=W.state;if(!s)return {order:[],auto:true};if(!s.lend||typeof s.lend!=="object")s.lend={};var l=s.lend;
  if(!Array.isArray(l.order))l.order=[];if(typeof l.autoServe!=="boolean")l.autoServe=true;return l;}
function save(){try{saveState();}catch(e){}}
/* her computers in her order: those not in it yet come after, a computer without a screen (Mac mini) first among them */
function ordered(){var cs=L().computers||[],o=O().order.slice(),ids=cs.map(function(c){return c.id;});o=o.filter(function(id){return ids.indexOf(id)>=0;});
  cs.filter(function(c){return o.indexOf(c.id)<0;}).sort(function(a,b){return (a.kind==="box"?0:1)-(b.kind==="box"?0:1);}).forEach(function(c){o.push(c.id);});
  if(O().order.join()!==o.join()){O().order=o;save();}
  return o.map(function(id){return cs.filter(function(c){return c.id===id;})[0];}).filter(Boolean);}
function iconOf(k){var v=k==="box"||k==="mini"?"mini":k==="desktop"?"desktop":k==="tablet"?"tablet":k==="phone"?"phone":"laptop";return '<svg viewBox="0 0 24 24" aria-hidden="true">'+IC[v]+'</svg>';}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
/* ---------- before a message: the first in her order that answers serves it ---------- */
var BUSY=false;
function serving(){var c=W.state&&W.state.cloud;return !!(W.state&&W.state.chatSource==="cloud"&&c&&c.on&&c.provider==="ingenium");}
/* all are asked at once; the first in her order that answers serves (so one away costs one wait, not one each); when none answers
   at the addresses they gave, they are looked for on the Wi-Fi (the apps that can), one by one in her order */
function pick(){var list=ordered();
  var asked=list.map(function(c){return IngLend.check(c.id,{find:false}).catch(function(){return false;});});
  function first(i){if(i>=list.length)return Promise.resolve(null);return asked[i].then(function(ok){return ok?list[i]:first(i+1);});}
  function found(i){if(i>=list.length)return Promise.resolve(null);var c=list[i];return IngLend.check(c.id,{find:true}).then(function(ok){return ok?c:found(i+1);},function(){return found(i+1);});}
  return first(0).then(function(c){return c||found(0);});}
/* the chat says, under the answer, which computer answered */
function msgs(){try{return W.curMsgs()||[];}catch(e){return [];}}
function tagNext(n0,line){var t=0;(function look(){var ms=msgs(),b=null;for(var i=ms.length-1;i>=Math.max(0,n0-1);i--)if(ms[i].role==="bot"&&!ms[i].preview){b=ms[i];break;}
  if(b){b.srv=line;try{saveState();}catch(e){}try{W.renderChat();}catch(e){}return;}if(++t<40)setTimeout(look,100);})();}
function wrapNode(){var o=W.msgNode;if(typeof o!=="function"||o.__r328)return;var n=function(mm){var d=o.apply(this,arguments);
    try{if(mm&&mm.role==="bot"&&mm.srv&&!d.querySelector(".sv-said")){var s=D.createElement("div");s.className="web-tag sv-said";s.textContent=mm.srv;d.appendChild(s);}}catch(e){}return d;};
  n.__r328=1;W.msgNode=n;try{msgNode=n;}catch(e){}}
function wrapSend(){var o=W.sendChat;if(typeof o!=="function"||o.__r328)return;
  var n=function(){var self=this,a=arguments;if(BUSY||!O().autoServe||!serving()||!W.IngLend||ordered().length<2)return o.apply(self,a);
    var cur=(W.state.cloud||{}).lendId,first=ordered()[0];
    /* the one in use is her first and answered in the last minute: nothing to do */
    var st=L().computers.filter(function(c){return c.id===cur;})[0];if(first&&cur===first.id&&st&&st.status==="ok"){var m0=msgs().length,r0=o.apply(self,a);tagNext(m0,"Answered by "+first.name+".");return r0;}
    BUSY=true;return pick().then(function(c){BUSY=false;var line=null;
      if(c){var was=null;if(c.id!==cur){was=L().computers.filter(function(x){return x.id===cur;})[0];IngLend.use(c.id,(W.state.cloud||{}).model);}
        else if(first&&c.id!==first.id)was=first;
        if(first&&c.id!==first.id)line="Answered by "+c.name+": "+first.name+" was away.";else line="Answered by "+c.name+".";}
      var n0=msgs().length,r=o.apply(self,a);if(line)tagNext(n0,line);return r;},function(){BUSY=false;return o.apply(self,a);});};
  n.__r328=1;try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}W.sendChat=n;try{sendChat=n;}catch(e){}}
/* ---------- the card: Settings, Models and AI, Your devices ---------- */
function card(){var c=D.getElementById("srvCard");if(c)return c;var pg=D.getElementById("page-settings");if(!pg)return null;
  c=mk("div","card");c.id="srvCard";var host=D.getElementById("linkCard");if(host&&host.parentNode)host.parentNode.insertBefore(c,host.nextSibling);else pg.appendChild(c);return c;}
var SIG="";
function paint(force){var c=card();if(!c||!W.IngLend)return;var list=ordered(),s=L(),cur=(W.state&&W.state.cloud&&serving())?W.state.cloud.lendId:null,firstOn=list.filter(function(x){return x.status==="ok";})[0];
  var sig=JSON.stringify([list.map(function(x){return [x.id,x.name,x.status,x.kind,(x.models||[]).length];}),cur,O().autoServe]);if(!force&&sig===SIG&&c.firstChild)return;SIG=sig;
  if(!c.querySelector(":scope > h2"))c.insertBefore(mk("h2","sec","Who serves your models"),c.firstChild);
  var R=c.querySelector(":scope > .sv-root");if(!R){R=mk("div","sv-root");c.appendChild(R);}R.innerHTML="";c=R;
  c.appendChild(mk("p","sv-sub","Your computers in your order. The first one that answers serves your models; when it is away, the next one does. Each is paired once in Your devices, sealed between your devices."));
  if(!list.length){c.appendChild(mk("p","sv-empty","No computer is paired with this device yet. Pair your Mac mini (and your other computers) in Your devices, above; they appear here in order."));return;}
  var ls=mk("div","sv-list");
  list.forEach(function(x,i){var row=mk("div","sv-row"+(x.status!=="ok"&&x.status?" away":"")+(cur===x.id?" serves":""));row.appendChild(mk("span","sv-n",String(i+1)));
    var dv=mk("span","sv-dev");dv.innerHTML=iconOf(x.kind);row.appendChild(dv);
    var who=mk("span","sv-who");who.appendChild(mk("b",null,x.name||"A computer"));var n=(x.models||[]).length;who.appendChild(mk("small",null,n?n+" model"+(n===1?"":"s")+" to lend"+(x.model?" · "+x.model:""):"Its models show once it answers"));
    var ch=mk("span","sv-chips");var ok=x.status==="ok";var a=mk("span","sv-chip "+(ok?"ok":"off"));a.appendChild(mk("i"));a.appendChild(D.createTextNode(ok?"On":x.status==="re"?"Looking":"Away"));ch.appendChild(a);
    if(cur===x.id)ch.appendChild(mk("span","sv-chip now","Serves your models now"));else if(!cur&&firstOn===x&&O().autoServe)ch.appendChild(mk("span","sv-chip now","Serves next"));
    if(i===0)ch.appendChild(mk("span","sv-chip def","Your default"));who.appendChild(ch);row.appendChild(who);
    var mn=mk("span","sv-mini");[["↑","Move up",-1],["↓","Move down",1]].forEach(function(m){var b=mk("button",null,m[0]);b.type="button";b.setAttribute("aria-label",m[1]+": "+(x.name||""));b.title=m[1];
      b.addEventListener("click",function(){var o=O().order,j=i+m[2];if(j<0||j>=o.length)return;var t=o[i];o[i]=o[j];o[j]=t;save();paint(true);});mn.appendChild(b);});
    row.appendChild(mn);ls.appendChild(row);});
  c.appendChild(ls);
  var sw=mk("div","sv-sw"),l=mk("span",null,"The first that answers serves your models");l.appendChild(mk("small",null,"Off: the computer you chose answers, and the chat waits for it when it is away."));sw.appendChild(l);
  var tg=mk("button","sv-tg");tg.type="button";tg.setAttribute("role","switch");tg.setAttribute("aria-checked",String(O().autoServe));tg.setAttribute("aria-label","The first that answers serves your models");
  function flip(){O().autoServe=!O().autoServe;save();paint(true);}tg.addEventListener("click",function(e){e.stopPropagation();flip();});sw.addEventListener("click",flip);sw.appendChild(tg);c.appendChild(sw);
  var keys=mk("div","sv-keys"),k=mk("button","sv-key","Ask them now");k.type="button";k.addEventListener("click",function(){k.disabled=true;k.textContent="Asking…";
    Promise.all(list.map(function(x){return IngLend.check(x.id,{find:true}).catch(function(){return false;});})).then(function(){k.disabled=false;k.textContent="Ask them now";paint(true);});});
  var u=mk("button","sv-key","Use the first that answers");u.type="button";u.addEventListener("click",function(){pick().then(function(x){if(x){IngLend.use(x.id,(W.state.cloud||{}).model);paint(true);}else{try{ingToast("None of your computers answered. This device's own model answers.");}catch(e){}}});});
  keys.appendChild(k);keys.appendChild(u);c.appendChild(keys);
  var dt=D.createElement("details");dt.className="sv-why";var sm=mk("summary",null,"Drives, flash drives and memory");dt.appendChild(sm);
  dt.appendChild(mk("p",null,"A drive holds more models; it does not add memory. A model runs in a computer's memory (RAM), so a large drive lets a computer keep many models and load the one you ask for, while a device with less memory uses them from that computer instead of running them itself. Flash drives are slow to load from: they are best for carrying models from one computer to another. Where a computer keeps its models is set on that computer, in Models, Your drives."));
  c.appendChild(dt);}
function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r328)return;var ng=function(p){var r=og.apply(this,arguments);if(p==="settings")setTimeout(function(){paint(true);},80);return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r328=1;W.go=ng;}
(function wait(n){if(W.__ingReady===true&&W.state&&W.IngLend){wrapSend();wrapNode();wrapGo();paint(true);
    setInterval(function(){if(D.hidden||(W.IngStill&&IngStill.on()))return;var c=D.getElementById("srvCard");if(c&&c.offsetParent)paint(false);},2500);return;}
  if(n<240)setTimeout(function(){wait(n+1);},250);})(0);
W.IngServe={version:1,order:function(){return ordered().map(function(c){return c.id;});},pick:pick,paint:paint,
  setOrder:function(ids){O().order=(ids||[]).slice();save();paint(true);},auto:function(v){if(typeof v==="boolean"){O().autoServe=v;save();paint(true);}return O().autoServe;}};
})();
;try{window.__ingParts["p328"]="running";}catch(_){}
</script>
