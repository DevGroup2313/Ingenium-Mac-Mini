<style id="r232-css">
/* ============ R232 · THE TRAIN ROOM, IN PARTS (Ingenium 6.28, 5 November 2026) ============
   Her words (5 November 2026): "The cards on the Train tab inside of the Models page is really stiff and not animated or clickable,
   please fix that. There is also a lot of scrolling on that page, it should have a redesign that has some tabs and sections to better
   show the page and not have me endlessly scrolling and losing interest in the page's contents. The rest of the pages inside of the
   Models Studio are quite short so the Train exceedingly long page looks off compared to the others."
   Measured on 6.27 at 1440 x 900: the Train room was 3,400 pixels tall (the other rooms of the Studio 930 to 1,145): What can be
   trained here (792), Train a small model (176) and the learning workbench (1,412, its five steps one under another), and the four
   bands of the first card were plain boxes of text.
   Now (modules/r199.js keeps the Studio's rooms; this part works inside the Train room, #stP-train):
   - three parts of the room, one at a time, under a row of raised keys: Overview (What can be trained here), Workbench (the learning
     workbench) and Trainer (Train a small model), each with its line; the part chosen last is kept on this device;
   - the four bands of the Overview are raised tiles: the tag as a chip, the title, the first sentence; pressed (or Enter, or Space),
     a tile opens across the card with all it says, the one open before folds; they rise in one after another and lift under the
     pointer; The arithmetic is a raised key that opens its list;
   - each tool of the workbench shows one step at a time: a row of numbered steps (1 Your text, 2 How big, 3 Learn, 4 Try it,
     5 Keep it), and Back and Next under each, so a tool is never longer than its longest step; a lesson keeps running whichever step
     is shown;
   - anything that opens the workbench (its key on the Trainer, Lector, the chat), scrolls to, focuses or rings a part of the room
     opens the part, and the step, that holds it.
   Still with motion set to minimal and under prefers-reduced-motion. Every id and handler of the three cards stays. */
#stP-train .tn-bar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 6px}
#stP-train .tn-tab{position:relative;display:inline-flex;align-items:center;gap:8px;min-height:38px;margin:0;padding:7px 15px 7px 11px;border-radius:12px;
  border:1px solid var(--hairline);background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop);color:var(--ink-2);font:600 13px/1.2 var(--sans);
  cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:transform .16s var(--spring,cubic-bezier(.2,.8,.2,1)),box-shadow .16s ease}
#stP-train .tn-tab svg{width:16px;height:16px;flex:0 0 auto;color:var(--accent)}
#stP-train .tn-tab:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop));color:var(--ink-1)}
#stP-train .tn-tab:active{transform:translateY(1px);transition-duration:.06s}
#stP-train .tn-tab[aria-selected="true"]{color:#fff;background:linear-gradient(180deg,var(--rm-pa,#7348be),var(--rm-pb,#5d37a1));border-color:var(--rm-pedge,#4b2a86);box-shadow:var(--rm-psh);text-shadow:0 1px 1px rgba(30,10,60,.32)}
#stP-train .tn-tab[aria-selected="true"] svg{color:#fff}
#stP-train .tn-tab:focus-visible{outline:2.5px solid var(--rm-focus,var(--accent));outline-offset:3px}
#stP-train .tn-says{margin:4px 2px 14px;font-size:13px;line-height:1.5;color:var(--ink-2);max-width:74ch}
#stP-train[data-tn="overview"] > #trainCard,#stP-train[data-tn="overview"] > #ingLabCard,
#stP-train[data-tn="workbench"] > #ingTruthCard,#stP-train[data-tn="workbench"] > #trainCard,
#stP-train[data-tn="trainer"] > #ingTruthCard,#stP-train[data-tn="trainer"] > #ingLabCard{display:none !important}
#stP-train > .card{animation:tnRise .4s cubic-bezier(.2,.8,.2,1) backwards}
/* the Overview's four bands, as tiles */
#ingTruthCard .tr-bands.tn-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
@media (max-width:760px){#ingTruthCard .tr-bands.tn-grid{grid-template-columns:minmax(0,1fr)}}
#ingTruthCard .tr-band.tn-tile{grid-template-columns:minmax(0,1fr) auto;align-items:start;gap:4px 12px;padding:14px 14px 14px 16px;cursor:pointer;border-radius:14px;
  box-shadow:var(--raise,0 1px 2px rgba(40,22,68,.1));transition:transform .2s cubic-bezier(.2,.8,.2,1),box-shadow .2s;animation:tnRise .42s cubic-bezier(.2,.8,.2,1) backwards;
  animation-delay:calc(var(--tn-i,0) * 60ms);-webkit-tap-highlight-color:transparent;touch-action:manipulation}
#ingTruthCard .tr-band.tn-tile > .tr-tag{grid-column:1;justify-self:start;padding:3px 9px;border-radius:999px;background:var(--accent-soft,rgba(106,63,181,.14));font-size:10.5px}
#ingTruthCard .tr-band.tn-tile > .tr-tag.no{background:rgba(120,110,135,.13)}
#ingTruthCard .tr-band.tn-tile > div{grid-column:1}
#ingTruthCard .tr-band.tn-tile > .tn-chev{grid-column:2;grid-row:1/3;align-self:center;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;
  border:1px solid var(--hairline);background:linear-gradient(180deg,var(--card-hi,#fff),var(--card,#faf8fd));box-shadow:var(--pop);color:var(--accent);transition:transform .28s cubic-bezier(.2,.8,.2,1)}
#ingTruthCard .tr-band.tn-tile > .tn-chev svg{width:14px;height:14px}
#ingTruthCard .tr-band.tn-open{grid-column:1/-1}
#ingTruthCard .tr-band.tn-open > .tn-chev{transform:rotate(180deg)}
#ingTruthCard .tr-band.tn-tile:not(.tn-open) p{display:none}
#ingTruthCard .tr-band.tn-tile .tn-sum{display:block;margin:2px 0 0;font-size:12.8px;line-height:1.45;color:var(--ink-3)}
#ingTruthCard .tr-band.tn-open .tn-sum{display:none}
#ingTruthCard .tr-band.tn-open p{animation:tnIn .3s cubic-bezier(.2,.8,.2,1) backwards}
#ingTruthCard .tr-band.tn-tile:not(.tn-open):hover{transform:translateY(-3px);box-shadow:var(--raise,0 1px 2px rgba(40,22,68,.1)),0 12px 24px rgba(52,24,100,.13)}
body[data-theme="night"] #ingTruthCard .tr-band.tn-tile:not(.tn-open):hover{box-shadow:var(--raise),0 12px 24px rgba(0,0,0,.42)}
#ingTruthCard .tr-band.tn-tile:not(.tn-open):active{transform:translateY(1px)}
#ingTruthCard .tr-band.tn-tile:focus-visible{outline:2.5px solid var(--rm-focus,var(--accent));outline-offset:2px}
body[data-theme="night"] #ingTruthCard .tr-band.tn-tile > .tn-chev{color:#d4c2f4}
#ingTruthCard details.tr-math > summary{display:inline-flex;align-items:center;gap:8px;min-height:36px;padding:6px 14px;border-radius:12px;border:1px solid var(--hairline);
  background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop);list-style:none;transition:transform .16s,box-shadow .16s}
#ingTruthCard details.tr-math > summary::-webkit-details-marker{display:none}
#ingTruthCard details.tr-math > summary::before{content:"";width:7px;height:7px;border-right:2px solid var(--accent);border-bottom:2px solid var(--accent);transform:rotate(-45deg);transition:transform .2s}
#ingTruthCard details.tr-math[open] > summary::before{transform:rotate(45deg)}
#ingTruthCard details.tr-math > summary:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop))}
/* the workbench, one step at a time */
#ingLabCard .tn-steps{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0 10px}
#ingLabCard .tn-step{display:inline-flex;align-items:center;gap:7px;min-height:34px;margin:0;padding:5px 13px 5px 6px;border-radius:999px;border:1px solid var(--hairline);
  background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop);color:var(--ink-2);font:600 12.5px/1.2 var(--sans);cursor:pointer;
  transition:transform .16s cubic-bezier(.2,.8,.2,1),box-shadow .16s;-webkit-tap-highlight-color:transparent}
#ingLabCard .tn-step i{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;font:700 11.5px/1 var(--sans);font-style:normal;color:var(--accent);background:var(--accent-soft,rgba(106,63,181,.14))}
#ingLabCard .tn-step:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop));color:var(--ink-1)}
#ingLabCard .tn-step[aria-current="step"]{color:#fff;background:linear-gradient(180deg,var(--rm-pa,#7348be),var(--rm-pb,#5d37a1));border-color:var(--rm-pedge,#4b2a86);box-shadow:var(--rm-psh)}
#ingLabCard .tn-step[aria-current="step"] i{color:var(--rm-pb,#5d37a1);background:#fff}
#ingLabCard .tn-step:focus-visible{outline:2.5px solid var(--rm-focus,var(--accent));outline-offset:3px}
#ingLabCard .lb-panel.tn-stepped > .lb-sec{display:none}
#ingLabCard .lb-panel.tn-stepped > .lb-sec.tn-on{display:block;margin-top:4px;padding-top:0;border-top:0;animation:tnIn .3s cubic-bezier(.2,.8,.2,1) backwards}
#ingLabCard .tn-nav{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;margin-top:16px;padding-top:12px;border-top:1px dashed var(--hairline)}
#ingLabCard .tn-nav button{min-height:34px}
#ingLabCard .tn-nav .tn-next{margin-left:auto}
@keyframes tnRise{from{opacity:0;transform:translateY(10px) scale(.99)}to{opacity:1;transform:none}}
@keyframes tnIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@media (max-width:600px){#stP-train .tn-tab{padding:6px 12px 6px 9px}#ingLabCard .tn-step{padding:5px 10px 5px 5px}#ingLabCard .tn-step span{display:none}#ingLabCard .tn-step[aria-current="step"] span{display:inline}}
body[data-motion="minimal"] #stP-train > .card,body[data-motion="minimal"] #ingTruthCard .tr-band.tn-tile,body[data-motion="minimal"] #ingTruthCard .tr-band p,body[data-motion="minimal"] #ingLabCard .lb-sec{animation:none !important}
body[data-motion="minimal"] #stP-train .tn-tab,body[data-motion="minimal"] #ingTruthCard .tr-band.tn-tile,body[data-motion="minimal"] #ingLabCard .tn-step{transition:none !important}
@media (prefers-reduced-motion:reduce){#stP-train > .card,#ingTruthCard .tr-band.tn-tile,#ingTruthCard .tr-band p,#ingLabCard .lb-sec{animation:none !important}#stP-train .tn-tab,#ingTruthCard .tr-band.tn-tile,#ingLabCard .tn-step{transition:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p232"]="started";}catch(_){}
/* R232 · the Train room, in parts: see the note at the top of its styles. window.IngTrain */
(function r232(){"use strict";
if(window.IngTrain)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function svg(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>';}
function lively(){try{if(D.body.getAttribute("data-motion")==="minimal")return false;return !(W.matchMedia&&W.matchMedia("(prefers-reduced-motion: reduce)").matches);}catch(e){return true;}}
var CHEV=svg('<path d="M6 9l6 6 6-6"/>');
var PARTS=[
  {k:"overview",t:"Overview",card:"ingTruthCard",i:svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>'),
    says:"What this device can train, and what needs a stronger machine: four cards, each opening when you press it."},
  {k:"workbench",t:"Workbench",card:"ingLabCard",i:svg('<path d="M4 18L10 11l4 4 6-8"/><path d="M4 21h16"/>'),
    says:"Lessons in how models learn, in this page, on any device: choose a tool, then go through its steps one at a time."},
  {k:"trainer",t:"Trainer",card:"trainCard",i:svg('<rect x="3.5" y="4.5" width="17" height="11" rx="1.6"/><path d="M8 19.5h8M12 15.5v4"/>'),
    says:"Train a small model on a computer, with the Ingenium app's own trainer."}];
var KEY="ing.train.part.v1";
function pref(){try{var v=W.localStorage.getItem(KEY);return PARTS.some(function(p){return p.k===v;})?v:"overview";}catch(e){return "overview";}}
function keep(v){try{W.localStorage.setItem(KEY,v);}catch(e){}}

/* ---------- the room's three parts ---------- */
var CUR=null;
function room(){return $("stP-train");}
function bar(){var r=room();if(!r||!$("ingTruthCard"))return null;var b=r.querySelector(":scope > .tn-bar");if(b)return b;
  b=mk("div","tn-bar");b.setAttribute("role","tablist");b.setAttribute("aria-label","The Train room, in parts");
  PARTS.forEach(function(p){var t=mk("button","tn-tab");t.type="button";t.setAttribute("role","tab");t.id="tnT-"+p.k;t.setAttribute("data-part",p.k);t.setAttribute("aria-controls",p.card);
    t.innerHTML=p.i;t.appendChild(mk("span",null,p.t));t.addEventListener("click",function(){part(p.k,true);});b.appendChild(t);});
  b.addEventListener("keydown",function(e){var k=e.key;if(k!=="ArrowLeft"&&k!=="ArrowRight"&&k!=="Home"&&k!=="End")return;var ts=[].slice.call(b.querySelectorAll(".tn-tab")),i=ts.indexOf(D.activeElement);if(i<0)return;e.preventDefault();
    var j=k==="Home"?0:k==="End"?ts.length-1:(i+(k==="ArrowRight"?1:-1)+ts.length)%ts.length;part(ts[j].getAttribute("data-part"),true);ts[j].focus();});
  var says=mk("p","tn-says");says.id="tnSays";says.setAttribute("aria-live","polite");
  r.insertBefore(says,r.firstChild);r.insertBefore(b,says);return b;}
function part(k,mine){var b=bar();if(!b)return;var r=room(),p=PARTS.filter(function(x){return x.k===k;})[0]||PARTS[0];CUR=p.k;r.setAttribute("data-tn",p.k);
  [].forEach.call(b.querySelectorAll(".tn-tab"),function(t){var on=t.getAttribute("data-part")===p.k;t.setAttribute("aria-selected",on?"true":"false");t.tabIndex=on?0:-1;});
  PARTS.forEach(function(x){var c=$(x.card);if(c){c.setAttribute("role","tabpanel");c.setAttribute("aria-labelledby","tnT-"+x.k);}});
  var s=$("tnSays");if(s&&s.textContent!==p.says)s.textContent=p.says;if(mine)keep(p.k);
  if(p.k==="workbench")stepAll();}
function partOf(el){for(var i=0;i<PARTS.length;i++){var c=$(PARTS[i].card);if(c&&c.contains(el))return PARTS[i].k;}return null;}

/* ---------- the Overview's bands, as tiles ---------- */
function sentence(t){t=String(t||"").replace(/\s+/g," ").trim();var m=t.match(/^.{12,170}?[.!?](?=\s|$)/);return m?m[0]:(t.length>150?t.slice(0,147).replace(/\s+\S*$/,"")+"…":t);}
function tiles(){var ul=$("ingTruthBands");if(!ul)return;ul.classList.add("tn-grid");var i=0;
  [].forEach.call(ul.children,function(li){if(!li.classList.contains("tr-band"))return;li.style.setProperty("--tn-i",String(i++));if(li.__tn)return;li.__tn=1;
    li.classList.add("tn-tile");li.setAttribute("role","button");li.tabIndex=0;li.setAttribute("aria-expanded","false");
    var body=li.querySelector(":scope > div"),p=body&&body.querySelector("p");if(body&&p){var s=mk("span","tn-sum",sentence(p.textContent));body.insertBefore(s,p);}
    var ch=mk("span","tn-chev");ch.innerHTML=CHEV;ch.setAttribute("aria-hidden","true");li.appendChild(ch);
    li.addEventListener("click",function(e){if(e.target&&e.target.closest&&e.target.closest("a,button,input,select,textarea"))return;band(li);});
    li.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();band(li);}});});}
function band(li,on){var open=on==null?!li.classList.contains("tn-open"):!!on;
  if(open&&li.parentNode)[].forEach.call(li.parentNode.children,function(o){if(o!==li&&o.classList.contains("tn-open")){o.classList.remove("tn-open");o.setAttribute("aria-expanded","false");}});
  li.classList.toggle("tn-open",open);li.setAttribute("aria-expanded",open?"true":"false");try{if(W.IngSound&&IngSound.play)IngSound.play("cards");}catch(e){}}

/* ---------- the workbench: one step at a time ---------- */
var STEP={};
function titleOf(sec){var h=sec.querySelector(":scope > h3");return h?String(h.textContent||"").replace(/^\s*\d+\.\s*/,"").replace(/,.*$/,"").trim():"Step";}
function stepPanel(pn){var secs=[].slice.call(pn.querySelectorAll(":scope > .lb-sec"));if(secs.length<2)return;var id=pn.id||"lab";
  if(!pn.__tn||pn.__tnN!==secs.length){pn.__tn=1;pn.__tnN=secs.length;pn.classList.add("tn-stepped");
    var old=pn.querySelector(":scope > .tn-steps");if(old)old.remove();[].forEach.call(pn.querySelectorAll(".tn-nav"),function(n){n.remove();});
    var row=mk("div","tn-steps");row.setAttribute("role","list");row.setAttribute("aria-label","Steps");
    secs.forEach(function(sec,i){var b=mk("button","tn-step");b.type="button";b.setAttribute("role","listitem");b.setAttribute("data-step",String(i));
      var n=mk("i",null,String(i+1));b.appendChild(n);b.appendChild(mk("span",null,titleOf(sec)));b.addEventListener("click",function(){step(pn,i,true);});row.appendChild(b);
      var nav=mk("div","tn-nav");
      if(i>0){var bk=mk("button","btn ghost tn-back","‹ "+titleOf(secs[i-1]));bk.type="button";bk.addEventListener("click",function(){step(pn,i-1,true);});nav.appendChild(bk);}
      if(i<secs.length-1){var nx=mk("button","btn tn-next","Next: "+titleOf(secs[i+1])+" ›");nx.type="button";nx.addEventListener("click",function(){step(pn,i+1,true);});nav.appendChild(nx);}
      sec.appendChild(nav);});
    pn.insertBefore(row,secs[0]);}
  step(pn,STEP[id]==null?0:STEP[id],false);}
function step(pn,i,mine){var secs=[].slice.call(pn.querySelectorAll(":scope > .lb-sec"));if(!secs.length)return;i=Math.max(0,Math.min(secs.length-1,i|0));STEP[pn.id||"lab"]=i;
  secs.forEach(function(s,j){s.classList.toggle("tn-on",j===i);});
  [].forEach.call(pn.querySelectorAll(":scope > .tn-steps .tn-step"),function(b,j){if(j===i)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");});
  if(mine){try{var r=pn.getBoundingClientRect();if(r.top<60)pn.scrollIntoView({block:"start",behavior:lively()?"smooth":"auto"});}catch(e){}
    try{var f=secs[i].querySelector("h3");if(f){f.setAttribute("tabindex","-1");f.focus({preventScroll:true});}}catch(e){}}}
function stepAll(){var lab=$("labPanels");if(!lab)return;[].forEach.call(lab.querySelectorAll(":scope > .lb-panel"),stepPanel);}
function stepOf(el){var sec=el&&el.closest&&el.closest("#labPanels .lb-panel > .lb-sec");if(!sec)return;var pn=sec.parentNode,secs=[].slice.call(pn.querySelectorAll(":scope > .lb-sec")),i=secs.indexOf(sec);
  if(i>=0&&!sec.classList.contains("tn-on"))step(pn,i,false);}

/* ---------- reaching a part of the room from elsewhere ---------- */
function reach(el){try{if(!el||!el.closest||!room()||!room().contains(el))return;var k=partOf(el);if(k&&k!==CUR)part(k,false);stepOf(el);
  var li=el.closest("#ingTruthBands > .tr-band");if(li&&!li.classList.contains("tn-open")&&el!==li)band(li,true);}catch(e){}}
W.__rmRevealHook=(function(prev){return function(el){try{reach(el);}catch(e){}if(typeof prev==="function")try{prev(el);}catch(e){}};})(W.__rmRevealHook);
function wrapLab(){var L=W.IngLab;if(!L||typeof L.open!=="function"||L.open.__r232)return;var o=L.open;
  var n=function(){var r=o.apply(this,arguments);try{part("workbench",false);stepAll();var c=$("ingLabCard");if(c)c.scrollIntoView({block:"start"});}catch(e){}return r;};n.__r232=1;L.open=n;}

/* ---------- start, and later ---------- */
function apply(){if(!bar())return;if(!CUR)part(pref(),false);tiles();stepAll();wrapLab();
  var r=room();if(r&&!r.__tnWatch){r.__tnWatch=1;r.addEventListener("focusin",function(e){reach(e.target);});var T=0;
    try{new MutationObserver(function(){if(T)return;T=setTimeout(function(){T=0;tiles();stepAll();},0);}).observe(r,{childList:true,subtree:true});}catch(e){}}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",apply);else apply();
(function later(){var n=0;(function wait(){apply();if(W.__ingReady===true){setTimeout(apply,700);return;}if(++n<400)setTimeout(wait,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r232)return;var ng=function(p){var r=og.apply(this,arguments);try{if(p==="models")apply();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r232=true;W.go=go=ng;})();
W.IngTrain={part:function(k){if(k)part(k,true);return CUR;},step:function(tool,i){var pn=$("labP-"+tool);if(pn&&i!=null)step(pn,i,true);return pn?STEP[pn.id]:null;},band:function(k,on){var li=D.querySelector('#ingTruthBands > .tr-band[data-band="'+k+'"]');if(li)band(li,on);},apply:apply};
})();
;try{window.__ingParts["p232"]="running";}catch(_){}
</script>
