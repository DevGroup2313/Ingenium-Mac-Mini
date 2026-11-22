<style id="r361-css">
/* ============ R361 · WHOSE MODELS ANSWER, AND THE MEMORY THEY TAKE (Ingenium 7.70, 22 November 2026; held until her word) ============
   Her words (22 November 2026): "I also want the 'who answers' widget to pulse with a faint colour glow based on which Ingenium's models are
   being used. If A Lends to B - A's model widget should pulse outward B's model widget should pulse in reverse with the same dimensions.
   Finally add another widget in Mentes which only appears when ingenium lend's it's models, displaying the live amount of RAM being used the
   same way a mic tester displays sound volume." Her answer on the colours: each computer its own colour, chosen by itself, "but I also want
   the option built in for me to be able to change the colours if I want and choose other colours for them".
   - The who-answers keys (beside the message box, #chatModelBtn, and the top bar's, #activeModelPill): on a device using a computer's models,
     a faint ring in that computer's colour pulses inward; on the computer lending them while a device uses them (a request now, or one in the
     last three minutes), the same ring pulses outward in its own colour. One ring, the same width and the same beat, run backwards on the
     device. Under the pointer the key is itself (the ring rests); Minimal or reduced motion: a still faint ring.
   - Colours: each computer's chosen by itself from eight soft colours (the same on every device, from its id); a colour key on each
     computer's card in Your devices, and on the lending computer's own column, opens the eight raised swatches to choose another.
   - Mentes, while this computer lends: a level meter of the memory in use, its segments lit like a microphone tester's (soft green, then
     amber, then rose near the top), with the peak held a moment; the figures; and each device's use of the models (today, in all, last).
   The computer's side: build/desktop/app_ask_770.py (share_memory, measured each time it is asked; share_usage). */
@keyframes akPulse{0%{box-shadow:var(--ak-base,0 0 0 transparent),0 0 0 0 rgba(var(--ak-c),.55)}70%{box-shadow:var(--ak-base,0 0 0 transparent),0 0 0 7px rgba(var(--ak-c),0)}100%{box-shadow:var(--ak-base,0 0 0 transparent),0 0 0 7px rgba(var(--ak-c),0)}}
.ak-glow{animation:akPulse 2.4s cubic-bezier(.3,.7,.4,1) infinite}
.ak-glow.ak-in{animation-direction:reverse}
.ak-glow:hover,.ak-glow:focus-visible{animation:none}
body[data-motion="minimal"] .ak-glow{animation:none;box-shadow:var(--ak-base,0 0 0 transparent),0 0 0 2px rgba(var(--ak-c),.4)}
@media (prefers-reduced-motion:reduce){.ak-glow{animation:none;box-shadow:var(--ak-base,0 0 0 transparent),0 0 0 2px rgba(var(--ak-c),.4)}}
/* the colour key and its swatches */
.ak-ckey.ak-in-tx{margin-top:7px}
.ak-ckey{display:inline-flex;align-items:center;gap:7px;min-height:30px;padding:0 11px 0 8px;border:0;border-radius:10px;cursor:pointer;font:600 12px/1 var(--sans);color:var(--mr-ink1,var(--ink-1));
  background:linear-gradient(var(--mr-keyA,#fff),var(--mr-keyB,#f4f0fa));box-shadow:var(--mr-sh-key,0 1px 1px rgba(40,20,70,.12),0 3px 6px rgba(40,20,70,.1));transition:transform .3s cubic-bezier(.34,1.5,.64,1),box-shadow .2s}
.ak-ckey:hover{transform:translateY(-2px);box-shadow:var(--mr-sh-keyhi,0 2px 2px rgba(40,20,70,.12),0 7px 14px rgba(40,20,70,.14))}
.ak-ckey:active{transform:translateY(1px)}
.ak-ckey i{width:14px;height:14px;border-radius:50%;background:rgb(var(--ak-c));box-shadow:inset 0 1px 1px rgba(255,255,255,.55),inset 0 -1px 2px rgba(0,0,0,.25),0 1px 2px rgba(0,0,0,.2)}
.ak-sw{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;padding:9px 10px;border-radius:14px;background:var(--mr-well,rgba(106,63,181,.04));box-shadow:inset 0 1px 3px rgba(40,20,70,.1)}
.ak-dot{width:24px;height:24px;border-radius:50%;border:0;padding:0;cursor:pointer;background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.45),rgba(255,255,255,0) 58%),rgb(var(--ak-c));
  box-shadow:inset 0 1.5px 1px rgba(255,255,255,.55),inset 0 -2px 2px rgba(40,20,70,.2),0 2px 0 rgba(40,20,70,.2),0 3px 6px rgba(40,20,70,.14);transition:transform .14s cubic-bezier(.3,.9,.3,1)}
.ak-dot:hover{transform:translateY(-2px) scale(1.08)}
.ak-dot:active{transform:translateY(1px)}
.ak-dot[aria-pressed="true"]{box-shadow:0 0 0 2px var(--accent,#6a3fb5),inset 0 1.5px 1px rgba(255,255,255,.55),0 2px 0 rgba(40,20,70,.2)}
body[data-theme="night"] .ak-dot{box-shadow:inset 0 1.5px 1px rgba(255,255,255,.35),inset 0 -2px 3px rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.6),0 4px 8px rgba(0,0,0,.45)}
body[data-motion="minimal"] .ak-dot:hover,body[data-motion="minimal"] .ak-ckey:hover{transform:none}
/* Mentes: the meter */
#akMeterCard{border-radius:22px;padding:18px 20px;box-shadow:var(--p3-card-sh,0 2px 3px rgba(40,20,70,.08),0 12px 26px rgba(40,20,70,.1));transition:transform .45s cubic-bezier(.34,1.3,.64,1),box-shadow .3s}
#akMeterCard:hover{transform:translateY(-2px);box-shadow:var(--p3-card-hi,0 3px 5px rgba(40,20,70,.1),0 18px 34px rgba(40,20,70,.13))}
#akMeterCard .ak-top{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
#akMeterCard .ak-top h2{margin:0}
#akMeterCard .ak-read{margin-left:auto;font:600 13px/1.3 var(--sans);color:var(--ink-2)}
#akMeterCard .ak-read b{font:600 22px/1 var(--serif,Georgia,serif);color:var(--ink-1)}
.ak-meter{position:relative;display:grid;grid-template-columns:repeat(32,1fr);gap:4px;margin:14px 0 8px;padding:10px;border-radius:14px;
  background:linear-gradient(180deg,rgba(34,26,46,.06),rgba(34,26,46,.02));box-shadow:inset 0 2px 4px rgba(40,20,70,.14),inset 0 -1px 0 rgba(255,255,255,.7)}
body[data-theme="night"] .ak-meter{background:rgba(0,0,0,.25);box-shadow:inset 0 2px 5px rgba(0,0,0,.55),inset 0 -1px 0 rgba(255,255,255,.05)}
.ak-seg{height:26px;border-radius:5px;background:rgba(34,26,46,.08);box-shadow:inset 0 1px 1px rgba(255,255,255,.5),inset 0 -1px 1px rgba(40,20,70,.08);transition:box-shadow .12s}
body[data-theme="night"] .ak-seg{background:rgba(255,255,255,.05);box-shadow:inset 0 1px 1px rgba(255,255,255,.06)}
.ak-seg.on{background:linear-gradient(180deg,rgba(var(--ak-s),.95),rgba(var(--ak-s),.75));box-shadow:inset 0 1px 1px rgba(255,255,255,.6),0 0 8px rgba(var(--ak-s),.45)}
.ak-seg.peak,body[data-theme="night"] .ak-seg.peak{background:linear-gradient(180deg,rgba(var(--ak-s),.95),rgba(var(--ak-s),.82));box-shadow:inset 0 1px 1px rgba(255,255,255,.45),0 0 11px rgba(var(--ak-s),.65)}
body[data-theme="night"] .ak-seg.on{background:linear-gradient(180deg,rgba(var(--ak-s),.9),rgba(var(--ak-s),.65));box-shadow:inset 0 1px 1px rgba(255,255,255,.3),0 0 9px rgba(var(--ak-s),.4)}
.ak-scale{display:flex;justify-content:space-between;font:600 10.5px/1 var(--sans);letter-spacing:.08em;color:var(--ink-3)}
.ak-uses{display:grid;gap:8px;margin-top:14px}
.ak-use{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:4px 12px;align-items:center;padding:10px 12px;border-radius:14px;background:linear-gradient(var(--card-hi),var(--card-lo));
  box-shadow:0 1px 2px rgba(40,20,70,.08),0 4px 10px rgba(40,20,70,.07);transition:transform .35s cubic-bezier(.34,1.3,.64,1),box-shadow .2s}
.ak-use:hover{transform:translateY(-2px);box-shadow:0 2px 4px rgba(40,20,70,.1),0 9px 18px rgba(40,20,70,.11)}
.ak-use .ak-dot{width:16px;height:16px;cursor:default}
.ak-use b{font:600 13.5px/1.2 var(--sans);color:var(--ink-1)}
.ak-use small{display:block;color:var(--ink-3);font-size:12px;margin-top:2px}
.ak-use .ak-n{font:600 13px/1.2 var(--sans);color:var(--ink-2);text-align:right}
body[data-motion="minimal"] #akMeterCard:hover,body[data-motion="minimal"] .ak-use:hover{transform:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p361"]="started";}catch(_){}
(function(){"use strict";
var W=window,D=document;if(W.IngLendMeter)return;
function $(id){return D.getElementById(id);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function shell(){try{var a=W.pywebview&&W.pywebview.api;return a&&typeof a.share_status==="function"?a:null;}catch(e){return null;}}
/* ---------- colours ---------- */
var PALETTE=[["Violet","139,111,214"],["Teal","72,160,162"],["Rose","214,122,158"],["Amber","214,160,62"],["Sky","98,152,214"],["Sage","118,170,128"],["Coral","224,124,100"],["Plum","158,94,160"]];
function hash(s){s=String(s||"");var h=0x811c9dc5;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193);}return h>>>0;}
function chosen(){try{return (W.state&&state.lendColors)||{};}catch(e){return {};}}
function colorOf(id){var c=chosen()[id];if(typeof c==="number"&&PALETTE[c])return PALETTE[c][1];return PALETTE[hash(id)%PALETTE.length][1];}
function indexOf(id){var c=chosen()[id];return typeof c==="number"&&PALETTE[c]?c:hash(id)%PALETTE.length;}
function choose(id,i){try{state.lendColors=state.lendColors||{};state.lendColors[id]=i;saveState();}catch(e){}paintGlow();decorate();}
function picker(host,id,name){var sw=host.querySelector(".ak-sw");if(sw){sw.remove();return;}sw=mk("div","ak-sw");sw.setAttribute("role","group");sw.setAttribute("aria-label","The colour of "+name);
  PALETTE.forEach(function(p,i){var d=mk("button","ak-dot");d.type="button";d.style.setProperty("--ak-c",p[1]);d.title=p[0];d.setAttribute("aria-label",p[0]);d.setAttribute("aria-pressed",indexOf(id)===i?"true":"false");
    d.onclick=function(){choose(id,i);try{if(W.IngSound)IngSound.play("confirm");}catch(e){}};sw.appendChild(d);});host.appendChild(sw);}
function ckey(id,name){var k=mk("button","ak-ckey");k.type="button";k.setAttribute("data-ak",id);k.style.setProperty("--ak-c",colorOf(id));var i=mk("i");k.append(i,D.createTextNode("Colour"));
  k.title="The colour "+name+"’s models glow in (press to choose another)";return k;}
/* on each computer's card (a device), and on the lending computer's own column */
function decorate(){var card=$("linkCard");if(!card)return;
  [].forEach.call(card.querySelectorAll(".ld-comp[data-comp]"),function(box){var id=box.getAttribute("data-comp"),k=box.querySelector(".ak-ckey");
    if(k){k.style.setProperty("--ak-c",colorOf(id));var sw=box.querySelector(".ak-sw");if(sw)[].forEach.call(sw.children,function(d,i){d.setAttribute("aria-pressed",indexOf(id)===i?"true":"false");});return;}
    var nm=(box.querySelector("b")||{}).textContent||"this computer",h=box.querySelector(".ld-comp-h")||box,tx=h!==box&&h.children[1]&&h.children[1].tagName==="DIV"?h.children[1]:null;k=ckey(id,nm);k.onclick=function(e){e.stopPropagation();picker(box,id,nm);};if(tx){k.classList.add("ak-in-tx");tx.appendChild(k);}else h.appendChild(k);});
  var lc=card.querySelector("[data-lender]");if(lc){var id=lc.getAttribute("data-lender"),k=lc.querySelector(".ak-ckey");
    if(k){k.style.setProperty("--ak-c",colorOf(id));var sw=lc.querySelector(".ak-sw");if(sw)[].forEach.call(sw.children,function(d,i){d.setAttribute("aria-pressed",indexOf(id)===i?"true":"false");});}
    else{var hd=lc.querySelector(".ld-head")||lc;k=ckey(id,"this computer");k.onclick=function(e){e.stopPropagation();picker(hd.parentNode||lc,id,"this computer");};hd.appendChild(k);}}}
/* ---------- the glow ---------- */
var LEND={id:"",on:false,busy:0,recent:false,at:0};
function keys(){return [$("chatModelBtn"),$("activeModelPill")].filter(Boolean);}
function setGlow(el,rgb,dir){if(!rgb){if(el.classList.contains("ak-glow")){el.classList.remove("ak-glow","ak-in");el.style.removeProperty("--ak-c");el.style.removeProperty("--ak-base");}return;}
  if(!el.classList.contains("ak-glow")){var b=getComputedStyle(el).boxShadow;el.style.setProperty("--ak-base",b&&b!=="none"?b:"0 0 0 transparent");el.classList.add("ak-glow");}
  if(el.style.getPropertyValue("--ak-c")!==rgb)el.style.setProperty("--ak-c",rgb);el.classList.toggle("ak-in",dir==="in");}
function paintGlow(){var c=(W.state&&state.cloud)||{},rgb=null,dir="";
  if(c.provider==="ingenium"&&c.lendId&&(typeof W.chatSource==="function"?W.chatSource()==="cloud":W.state.chatSource==="cloud")){rgb=colorOf(c.lendId);dir="in";}
  else if(LEND.on&&LEND.id&&(LEND.busy>0||LEND.recent)){rgb=colorOf(LEND.id);dir="out";}
  keys().forEach(function(el){setGlow(el,rgb,dir);});}
/* ---------- the computer that lends: its state, its devices' use, its memory ---------- */
var USE=null,MEM=null,PEAK={v:0,at:0},MT=0,UT=0;
function lendPoll(){var a=shell();clearTimeout(UT);if(!a)return;
  Promise.resolve().then(function(){return a.share_status();}).then(function(st){LEND.id=(st&&st.id)||LEND.id;LEND.on=!!(st&&st.on);
      if(!LEND.on||typeof a.share_usage!=="function"){USE=null;return;}return a.share_usage();})
    .then(function(u){if(u&&u.ok){USE=u;LEND.busy=u.busy||0;var now=Date.now()/1000;LEND.recent=(u.devices||[]).some(function(d){return d.last&&now-d.last<180;});}
      paintGlow();paintCard();},function(){})
    .then(function(){UT=setTimeout(lendPoll,D.hidden?15000:4000);});}
function onMentes(){var p=$("page-models");return !!(p&&p.offsetParent!==null&&!D.hidden);}
function memPoll(){var a=shell();clearTimeout(MT);if(!a||typeof a.share_memory!=="function")return;
  if(!LEND.on||!onMentes()){MT=setTimeout(memPoll,1500);return;}
  Promise.resolve().then(function(){return a.share_memory();}).then(function(m){if(m&&m.ok){MEM=m;paintMeter();}},function(){})
    .then(function(){MT=setTimeout(memPoll,250);});}
/* ---------- Mentes: the card ---------- */
var SEGS=32;
function segColor(i){var f=(i+1)/SEGS;return f<=0.6?"104,176,122":(f<=0.85?"214,160,62":"214,96,110");}
function card(){var c=$("akMeterCard");if(c)return c;var host=$("page-models");if(!host)return null;
  c=mk("div","card");c.id="akMeterCard";c.setAttribute("aria-live","off");c.setAttribute("data-rm-skip","1");   /* above every room of Mentes, not filed into one (r173) */
  var top=mk("div","ak-top"),h=mk("h2","sec","Lending now");top.appendChild(h);var rd=mk("div","ak-read");rd.id="akRead";top.appendChild(rd);c.appendChild(top);
  c.appendChild(mk("p","small muted","The memory in use on this computer while your devices use its models, live."));
  var m=mk("div","ak-meter");m.id="akMeter";m.setAttribute("role","meter");m.setAttribute("aria-label","Memory in use");m.setAttribute("aria-valuemin","0");
  for(var i=0;i<SEGS;i++){var s=mk("div","ak-seg");s.style.setProperty("--ak-s",segColor(i));m.appendChild(s);}c.appendChild(m);
  var sc=mk("div","ak-scale");sc.id="akScale";c.appendChild(sc);
  var u=mk("div","ak-uses");u.id="akUses";c.appendChild(u);
  var bar=host.querySelector('[id^="rmBar-"]'),first=$("lineupCard");
  if(bar&&bar.parentNode===host)host.insertBefore(c,bar.nextSibling);else if(first&&first.parentNode===host)host.insertBefore(c,first);else host.insertBefore(c,host.firstChild);return c;}
function gb(v){return (Math.round(v*10)/10).toFixed(1)+" GB";}
function paintMeter(){var c=$("akMeterCard");if(!c||!MEM)return;var tot=MEM.total||1,used=Math.min(tot,MEM.used||0),f=used/tot,n=Math.round(f*SEGS),now=Date.now();
  if(n>=PEAK.v||now-PEAK.at>1500){PEAK.v=n;PEAK.at=now;}
  var segs=$("akMeter").children;for(var i=0;i<SEGS;i++){segs[i].classList.toggle("on",i<n);segs[i].classList.toggle("peak",i===PEAK.v-1&&PEAK.v>n);}
  var m=$("akMeter");m.setAttribute("aria-valuemax",String(tot));m.setAttribute("aria-valuenow",String(used));m.setAttribute("aria-valuetext",gb(used)+" of "+gb(tot)+" in use");
  var rd=$("akRead");rd.innerHTML="";var b=mk("b",null,gb(used));rd.append(b,D.createTextNode(" of "+gb(tot)+" in use"+(MEM.busy?" · answering "+MEM.busy+(MEM.busy===1?" request":" requests"):"")));
  var sc=$("akScale");if(!sc.childNodes.length)["0","",""+Math.round(tot/2)+" GB","",gb(tot)].forEach(function(t){sc.appendChild(mk("span",null,t));});}
function ago(t){if(!t)return "not yet";var s=Date.now()/1000-t;if(s<90)return "just now";if(s<3600)return Math.round(s/60)+" minutes ago";if(s<86400)return Math.round(s/3600)+" hours ago";return Math.round(s/86400)+" days ago";}
function paintCard(){var show=LEND.on&&!!shell();var c=show?card():$("akMeterCard");if(!c)return;c.hidden=!show;if(!show)return;
  var u=$("akUses");if(!u)return;var rows=(USE&&USE.devices)||[];var sig=JSON.stringify(rows.map(function(r){return [r.id,r.today,r.all,r.last,r.model,r.name];}))+LEND.id;
  if(u.__sig===sig)return;u.__sig=sig;u.innerHTML="";
  if(!rows.length){u.appendChild(mk("div","mr-empty small muted","No device has used this computer’s models yet."));return;}
  rows.slice(0,12).forEach(function(r){var row=mk("div","ak-use"),d=mk("span","ak-dot");d.style.setProperty("--ak-c",colorOf(LEND.id));var t=mk("div");t.append(mk("b",null,r.name||"A device"),mk("small",null,[r.model||"",ago(r.last)].filter(Boolean).join(" · ")));
    row.append(d,t,mk("div","ak-n",r.today+" today · "+r.all+" in all"));u.appendChild(row);});}
W.IngLendMeter={show:function(){var c=card();if(c){c.hidden=!LEND.on;try{c.scrollIntoView({block:"start",behavior:"smooth"});}catch(e){}}},colorOf:colorOf,palette:PALETTE,choose:choose,
  _paint:paintGlow,_decorate:decorate,_state:LEND};
/* the keys are drawn again by their own parts every second or two: the glow follows them, never fighting them */
setTimeout(function wait(){if(W.__ingReady!==true){setTimeout(wait,1200);return;}
  lendPoll();memPoll();setInterval(function(){try{paintGlow();decorate();}catch(e){}},1500);
  try{var lk=$("linkCard");if(lk&&W.MutationObserver)new MutationObserver(function(){try{decorate();}catch(e){}}).observe(lk,{childList:true,subtree:true});}catch(e){}},1500);
})();
;try{window.__ingParts["p361"]="running";}catch(_){}
</script>
