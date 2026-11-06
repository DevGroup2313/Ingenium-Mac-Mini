<style id="r235-css">
/* ============ R235 · FOCUS, IN PARTS (Ingenium 6.36, 6 November 2026) ============
   Her request: the Focus page redesigned the way the Train room was (6.28): tabs and sections, cards that are animated and
   clickable, and far less scrolling. Measured on 6.35 at 1440 x 900: the page was 2,351 pixels tall (3,856 on a phone 390 wide), its
   ten cards one under another: Now, Steps, Time, the Inbox, Calm, Clear words, Routines, Today asks of you, Your supports (and a
   low-energy day's card when one is on).
   Now four parts, one at a time, under four raised cards that are the tabs: Today (Now, what today asks of you, your routines),
   Work (Steps, Time and the Inbox), Calm (Calm and Clear words) and Supports (each support's switch). Each card-tab says what stands
   in its part at this moment, read from the page itself (the step in front of you, the focus timer, the thoughts in the Inbox, the
   calm look, how many supports are on); it rises in, lifts under the pointer, and pressed (or Enter, Space and the arrow keys) shows
   its part, whose cards rise in one after another. The part chosen last is kept on this device (ing.focus.part.v1), only when she
   chooses it. Anything that scrolls to, focuses or rings a card in another part (the guided tour, Help's Show me) opens that part
   first. A low-energy day's card stays above the parts, in every one. The Calm look, the minimal motion setting and the system's
   reduced motion stop every movement here. */
#page-focus .fxp-bar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:6px 0 4px}
#page-focus .fxp-tab{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:5px;min-width:0;min-height:88px;margin:0;padding:12px 14px 12px;
  border-radius:14px;border:1px solid var(--hairline);background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f3fa));box-shadow:var(--pop);
  color:var(--ink-2);font:inherit;text-align:left;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;
  transition:transform .18s var(--spring,cubic-bezier(.2,.8,.2,1)),box-shadow .18s ease;animation:fxpRise .42s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(var(--i,0) * 60ms)}
#page-focus .fxp-tab:hover{transform:translateY(-3px);box-shadow:var(--pop-hi,var(--pop));color:var(--ink-1)}
#page-focus .fxp-tab:active{transform:translateY(1px);transition-duration:.06s}
#page-focus .fxp-tab:focus-visible{outline:2.5px solid var(--rm-focus,var(--accent));outline-offset:3px}
#page-focus .fxp-top{display:flex;align-items:center;gap:8px;min-width:0;width:100%}
#page-focus .fxp-ico{display:inline-flex;width:30px;height:30px;flex:0 0 auto;align-items:center;justify-content:center;border-radius:9px;background:var(--accent-softer,rgba(107,79,160,.10));color:var(--accent)}
#page-focus .fxp-ico svg{width:18px;height:18px}
#page-focus .fxp-name{font:600 15px/1.2 var(--serif);letter-spacing:.03em;color:var(--ink-1)}
#page-focus .fxp-chev{margin-left:auto;width:14px;height:14px;color:var(--ink-3);transition:transform .18s ease}
#page-focus .fxp-tab:hover .fxp-chev{transform:translateX(2px)}
#page-focus .fxp-stat{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:12.4px;line-height:1.45;color:var(--ink-3);min-height:1.45em}
#page-focus .fxp-tab[aria-selected="true"]{color:#fff;background:linear-gradient(180deg,var(--rm-pa,#7348be),var(--rm-pb,#5d37a1));border-color:var(--rm-pedge,#4b2a86);box-shadow:var(--rm-psh,var(--pop));text-shadow:0 1px 1px rgba(30,10,60,.32)}
#page-focus .fxp-tab[aria-selected="true"] .fxp-name{color:#fff}
#page-focus .fxp-tab[aria-selected="true"] .fxp-stat{color:rgba(255,255,255,.88)}
#page-focus .fxp-tab[aria-selected="true"] .fxp-ico{background:rgba(255,255,255,.18);color:#fff}
#page-focus .fxp-tab[aria-selected="true"] .fxp-chev{color:rgba(255,255,255,.85)}
#page-focus .fxp-says{margin:6px 2px 14px;font-size:12.8px;line-height:1.5;color:var(--ink-2);max-width:78ch}
#page-focus .fx-grid > .fxp-off{display:none !important}
#page-focus .fx-grid > .fxp-on{animation:fxpIn .38s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(var(--i,0) * 70ms)}
#page-focus .fx-grid > .card.fxp-on{transition:box-shadow .2s ease}
#page-focus .fx-grid > .card.fxp-on:hover{box-shadow:var(--pop-hi,var(--pop))}
@keyframes fxpRise{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
@keyframes fxpIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@media (max-width:760px){#page-focus .fxp-bar{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
  #page-focus .fxp-tab{min-height:64px;padding:10px 11px}
  #page-focus .fxp-stat{-webkit-line-clamp:1}
  #page-focus .fxp-ico{width:26px;height:26px}#page-focus .fxp-ico svg{width:16px;height:16px}}
body[data-theme="night"] #page-focus .fxp-tab:not([aria-selected="true"]) .fxp-name{color:#ece4f8}
body[data-motion="minimal"] #page-focus .fxp-tab,body[data-motion="minimal"] #page-focus .fx-grid > .fxp-on,
body[data-calm="1"] #page-focus .fxp-tab,body[data-calm="1"] #page-focus .fx-grid > .fxp-on{animation:none !important;transition:none !important}
body[data-motion="minimal"] #page-focus .fxp-tab:hover,body[data-calm="1"] #page-focus .fxp-tab:hover{transform:none}
@media (prefers-reduced-motion:reduce){#page-focus .fxp-tab,#page-focus .fx-grid > .fxp-on{animation:none !important;transition:none !important}#page-focus .fxp-tab:hover{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p235"]="started";}catch(_){}
/* R235 · Focus, in parts: see the note at the top of its styles. window.IngFocusParts */
(function r235(){"use strict";
if(window.IngFocusParts)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function svg(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>';}
var CHEV='<svg class="fxp-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6"/></svg>';
/* the parts: which cards each holds; a card no part names (one a later part of the page may add) goes to Today */
var PARTS=[
  {k:"today",t:"Today",i:svg('<circle cx="12" cy="12" r="4"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>'),
    says:"What is in front of you now, what today asks of you, and your routines for starting and ending the day.",m:["fxNowCard","fxTodayHost","fxRoutinesHost"]},
  {k:"work",t:"Work",i:svg('<path d="M9 6.5h10.5M9 12h10.5M9 17.5h10.5"/><path d="M4 6.2l1.2 1.2L7.4 5M4 11.7l1.2 1.2L7.4 10.5"/><circle cx="5.2" cy="17.5" r="1.3"/>'),
    says:"Your task as small steps, time you can see, and the Inbox for the thoughts that come while you work.",m:["fxStepsCard","fxTimeCard","fxParkCard"]},
  {k:"calm",t:"Calm",i:svg('<path d="M5 19c8.5 0 14-5.5 14-14C10.5 5 5 10.5 5 19z"/><path d="M5 19l7.5-7.5"/>'),
    says:"A quieter screen when things feel like too much, and words that are clear: answers, reading aloud, decoding a message.",m:["fxCalmCard","fxWordsCard"]},
  {k:"supports",t:"Supports",i:svg('<rect x="3" y="5" width="18" height="6" rx="3"/><circle cx="15" cy="8" r="1.8"/><rect x="3" y="13" width="18" height="6" rx="3"/><circle cx="9" cy="16" r="1.8"/>'),
    says:"Each support has its own switch. Off, it leaves the page and the side buttons alone; on, it is here and in Settings, under Support.",m:["fxSupportsHost"]}];
var ABOVE={fxLowHost:1};
var KEY="ing.focus.part.v1",PREF="";try{PREF=String(W.localStorage.getItem(KEY)||"");}catch(e){PREF="";}
var CUR="";
function page(){return $("page-focus");}
function grid(){var p=page();return p?p.querySelector(".fx-grid"):null;}
function partFor(c){var id=c.id||"";for(var i=0;i<PARTS.length;i++)if(PARTS[i].m.indexOf(id)>=0)return PARTS[i].k;return "today";}
function isCard(c){return !!(c&&c.nodeType===1&&!ABOVE[c.id]&&(c.classList.contains("card")||c.classList.contains("fx-card-host")));}
function short(s,n){s=String(s==null?"":s).replace(/\s+/g," ").trim();if(s.length<=n)return s;var t=s.slice(0,n-1);var sp=t.lastIndexOf(" ");return (sp>n*0.6?t.slice(0,sp):t)+"…";}
function sc(){try{return (W.IngSupport&&W.IngSupport.sc)||null;}catch(e){return null;}}
function curTask(){try{if(typeof W.taskCur!=="function")return null;var t=W.taskCur();if(!t)return null;var i=typeof W.taskNext==="function"?W.taskNext(t):-1;return {t:t,i:i};}catch(e){return null;}}
/* what each part holds at this moment, read from the page's own state; nothing here is guessed */
function status(k){try{var S=sc(),ct=curTask();
  if(k==="today"){if(S&&typeof S.lowToday==="function"&&S.lowToday())return "A low-energy day: only what is essential";
    if(ct&&ct.i>=0)return "Step "+(ct.i+1)+" of "+ct.t.steps.length+": "+short(ct.t.steps[ct.i].t,60);
    if(S&&typeof S.on==="function"&&S.on("routines")&&typeof S.suggestedRoutine==="function"){var r=S.suggestedRoutine();if(r){var nm=typeof S.rName==="function"?String(S.rName(r)).replace(/^\S+\s/,""):String(r.name||"");if(nm)return "A good moment for: "+short(nm,48);}}
    if(ct&&ct.t.steps&&ct.t.steps.length)return "All steps of “"+short(ct.t.title,40)+"” are done";
    return "Nothing planned yet";}
  if(k==="work"){var out=[],p=W.pomo;
    if(p&&p.running&&typeof W.pomoFmt==="function")out.push((p.phase==="focus"?"Focus":"Break")+": "+W.pomoFmt(p.remaining)+" left");
    else if(p&&typeof W.pomoPhaseLen==="function"&&typeof W.pomoFmt==="function"&&p.remaining<W.pomoPhaseLen(p.phase))out.push("Paused: "+W.pomoFmt(p.remaining)+" left");
    else if(ct&&ct.i>=0)out.push("Next: "+short(ct.t.steps[ct.i].t,52));
    else out.push("Steps, a timer and the Inbox");
    var n=(W.state&&Array.isArray(W.state.parked))?W.state.parked.length:0,inboxOn=!(S&&typeof S.on==="function")||S.on("inbox");
    if(n&&inboxOn)out.push(n===1?"1 thought in the Inbox":n+" thoughts in the Inbox");
    return out.join(" · ");}
  if(k==="calm"){var on=typeof W.sup==="function"?!!W.sup("calm"):false,tx=typeof W.sup==="function"?String(W.sup("text")):"m";
    var TX={s:"smaller",m:"standard",l:"larger",xl:"largest"};return "Calm look "+(on?"on":"off")+" · text "+(TX[tx]||"standard");}
  if(k==="supports"){var h=$("fxSupportsHost");if(!h)return "";var rows=h.querySelectorAll(".sc-sw"),total=0,ons=0;
    [].forEach.call(rows,function(r){var b=r.querySelector(".seg-btn");if(!b)return;total++;if(b.getAttribute("aria-pressed")==="true")ons++;});
    return total?(ons+" of "+total+" on"):"Each support's own switch";}
}catch(e){}return "";}
function bar(){var g=grid();if(!g)return null;var p=page(),b=p.querySelector(":scope > .fxp-bar");if(b)return b;
  if(!g.id)g.id="fxpPanel";var gid=g.id;
  b=mk("div","fxp-bar");b.setAttribute("role","tablist");b.setAttribute("aria-label","Focus, in parts");
  PARTS.forEach(function(P,i){var t=mk("button","fxp-tab");t.type="button";t.setAttribute("role","tab");t.id="fxpT-"+P.k;t.setAttribute("data-part",P.k);t.style.setProperty("--i",i);
    var top=mk("span","fxp-top"),ic=mk("span","fxp-ico");ic.innerHTML=P.i;top.appendChild(ic);var nm=mk("span","fxp-name",P.t);nm.id="fxpN-"+P.k;top.appendChild(nm);top.insertAdjacentHTML("beforeend",CHEV);
    var st=mk("span","fxp-stat");st.id="fxpS-"+P.k;t.appendChild(top);t.appendChild(st);
    t.setAttribute("aria-labelledby",nm.id);t.setAttribute("aria-describedby",st.id);t.setAttribute("aria-controls",gid);
    t.addEventListener("click",function(){show(P.k,true);});b.appendChild(t);});
  b.addEventListener("keydown",function(e){var k=e.key;if(k!=="ArrowLeft"&&k!=="ArrowRight"&&k!=="Home"&&k!=="End")return;var ts=[].slice.call(b.querySelectorAll(".fxp-tab")),i=ts.indexOf(D.activeElement);if(i<0)return;e.preventDefault();
    var j=k==="Home"?0:k==="End"?ts.length-1:(i+(k==="ArrowRight"?1:-1)+ts.length)%ts.length;show(ts[j].getAttribute("data-part"),true);ts[j].focus();});
  var says=mk("p","fxp-says");says.id="fxpSays";says.setAttribute("aria-live","polite");
  p.insertBefore(says,g);p.insertBefore(b,says);
  g.setAttribute("role","tabpanel");return b;}
function paint(){var b=bar();if(!b)return;PARTS.forEach(function(P){var s=$("fxpS-"+P.k);if(!s)return;var v=status(P.k);if(s.textContent!==v)s.textContent=v;});}
function show(k,mine){var g=grid(),b=bar();if(!g||!b)return;
  if(!PARTS.some(function(P){return P.k===k;}))k=PARTS[0].k;
  var changed=CUR!==k;CUR=k;var p=page();p.setAttribute("data-fxp",k);var n=0;
  [].forEach.call(g.children,function(c){if(!isCard(c))return;var on=partFor(c)===k;
    if(on){if(!c.classList.contains("fxp-on")||changed){c.classList.remove("fxp-on");if(changed)void c.offsetWidth;c.classList.add("fxp-on");c.style.setProperty("--i",n);}n++;}
    else c.classList.remove("fxp-on");c.classList.toggle("fxp-off",!on);});
  [].forEach.call(b.querySelectorAll(".fxp-tab"),function(t){var on=t.getAttribute("data-part")===k;t.setAttribute("aria-selected",on?"true":"false");t.tabIndex=on?0:-1;});
  var P=PARTS.filter(function(x){return x.k===k;})[0],s=$("fxpSays");if(s&&P&&s.textContent!==P.says)s.textContent=P.says;
  g.setAttribute("aria-labelledby","fxpT-"+k);
  if(mine){PREF=k;try{W.localStorage.setItem(KEY,k);}catch(e){}}
  paint();}
/* a card reached from elsewhere (scrolled to, focused, ringed by the tour, Help's Show me) opens its part first */
function reach(el){try{if(!el||el.nodeType!==1||!el.closest)return;var c=el.closest("#page-focus .fx-grid > .fxp-off");if(!c)return;show(partFor(c),false);}catch(e){}}
function reachSel(sel){try{var s=Array.isArray(sel)?sel:String(sel||"").split(/\s*,\s*/);for(var i=0;i<s.length;i++){var e=null;try{e=D.querySelector(s[i]);}catch(_){}if(e){reach(e);if(e.closest&&e.closest("#page-focus"))return;}}}catch(e){}}
(function wrapReveal(){try{var EP=Element.prototype,HP=HTMLElement.prototype;
  if(!EP.scrollIntoView.__r235){var oS=EP.scrollIntoView,nS=function(){reach(this);return oS.apply(this,arguments);};nS.__r235=1;try{Object.keys(oS).forEach(function(k){nS[k]=oS[k];});}catch(e){}EP.scrollIntoView=nS;}
  var oI=EP.scrollIntoViewIfNeeded;if(typeof oI==="function"&&!oI.__r235){var nI=function(){reach(this);return oI.apply(this,arguments);};nI.__r235=1;try{Object.keys(oI).forEach(function(k){nI[k]=oI[k];});}catch(e){}EP.scrollIntoViewIfNeeded=nI;}
  if(!HP.focus.__r235){var oF=HP.focus,nF=function(){if(this.isConnected)reach(this);return oF.apply(this,arguments);};nF.__r235=1;try{Object.keys(oF).forEach(function(k){nF[k]=oF[k];});}catch(e){}HP.focus=nF;}}catch(e){}})();
function wrapTour(){try{var o=W.tourRing;if(typeof o==="function"&&!o.__r235){var n=function(sel){reachSel(sel);return o.apply(this,arguments);};try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}n.__r235=1;W.tourRing=n;}
  var T=null;try{T=typeof W.ING_TOUR!=="undefined"?W.ING_TOUR:null;}catch(e){}if(!Array.isArray(T))return;
  T.forEach(function(s){if(!s||!s.ring||typeof s.go!=="function"||s.go.__r235)return;var rs=Array.isArray(s.ring)?s.ring:[s.ring];
    if(!rs.some(function(r){return /#fx/.test(String(r));}))return;var g=s.go;var ng=function(){var r=g.apply(this,arguments);reachSel(rs);return r;};try{Object.keys(g).forEach(function(k){ng[k]=g[k];});}catch(e){}ng.__r235=1;s.go=ng;});}catch(e){}}
/* Now, with no task yet, pointed to Steps "below": Steps is in Work now, and a key goes there */
function wrapNow(){var o=W.fxRenderNow;if(typeof o!=="function"||o.__r235)return;
  var n=function(){var r=o.apply(this,arguments);try{var h=$("fxNow");if(h)[].forEach.call(h.querySelectorAll(".fx-txt"),function(t){if(!/^No task yet\. Steps, below,/.test(t.textContent))return;
      t.textContent="No task yet. Steps, in Work, turns a task into small steps.";var row=t.parentNode;if(!row||row.querySelector("[data-fxp-go]"))return;
      var a=mk("span","fx-acts"),k=typeof W.fxBtn==="function"?W.fxBtn("Go to Steps","ghost",goSteps):mk("button","btn small ghost","Go to Steps");if(!k.onclick)k.onclick=goSteps;k.setAttribute("data-fxp-go","steps");a.appendChild(k);row.appendChild(a);});}catch(e){}paint();return r;};
  n.__r235=1;try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}W.fxRenderNow=n;}
function goSteps(){show("work",true);var i=D.querySelector("#fxSteps textarea, #fxSteps input");if(i)try{i.focus();}catch(e){}}
function wrapRender(){var o=W.fxRender;if(typeof o!=="function"||o.__r235)return;var n=function(){var r=o.apply(this,arguments);try{apply();}catch(e){}return r;};n.__r235=1;try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}W.fxRender=n;}

/* ---------- start, and later ---------- */
function apply(){if(!grid())return;if(!bar())return;wrapNow();wrapRender();wrapTour();show(CUR||PREF||PARTS[0].k,false);
  var g=grid();if(!g.__fxpWatch){g.__fxpWatch=1;g.addEventListener("focusin",function(e){reach(e.target);});var T=0;
    try{new MutationObserver(function(){if(T)return;T=setTimeout(function(){T=0;show(CUR||PREF||PARTS[0].k,false);},0);}).observe(g,{childList:true});}catch(e){}}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",apply);else apply();
(function later(){var n=0;(function wait(){apply();if(W.__ingReady===true){setTimeout(apply,700);return;}if(++n<400)setTimeout(wait,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r235)return;var ng=function(p){var r=og.apply(this,arguments);try{if(p==="focus")apply();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r235=true;W.go=go=ng;})();
/* the card-tabs say what stands in each part: once a second while Focus is in sight (the timer counts down there) */
setInterval(function(){try{var p=page();if(!p||!p.classList.contains("active")||D.hidden)return;paint();}catch(e){}},1000);
W.IngFocusParts={show:function(k,remember){if(k)show(k,!!remember);var p=page();return p?p.getAttribute("data-fxp"):null;},parts:function(){return PARTS.map(function(P){return {key:P.k,name:P.t,cards:P.m.slice()};});},status:status,apply:apply};
})();
;try{window.__ingParts["p235"]="running";}catch(_){}
</script>
