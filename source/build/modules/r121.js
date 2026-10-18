<style id="r121-css">
/* ============ R121 · THE SUPPORT MODULE, IN INGENIUM ============
   The owner's word (18 October 2026): "build a support module, that way it can have full parity with Carpe Diem and
   the Forge ... I want each app to not have any dependencies, not even on each other." The module is the shared file
   source/build/thoughts/support_core.html, written in whole just before this one (the same file Carpe Diem and the
   Forge carry inside themselves). Ingenium's Focus page was the first of the three, so it keeps its own cards (Now,
   Steps, Time, the Inbox, Calm, Clear words) and takes from the module the supports it lacked: routines, what today
   asks of you, a low-energy day, the Focus room, the two-minute Just start, and a switch for each support. */
#page-focus .fx-card-host{min-width:0}
#page-focus .fx-card-host[hidden]{display:none}
#page-focus .sc-solo{--sc-accent:var(--accent,#6b4fa0);--sc-deep:var(--accent-deep,var(--accent,#4f3a7a));--sc-soft:var(--accent-softer,rgba(107,79,160,.08))}
/* the module's cards wear Ingenium's own card and heading */
#page-focus .sc-solo .sc-card{padding:16px;border-radius:14px}
#page-focus .sc-solo .sc-h{font-family:var(--serif);font-size:16.5px;color:var(--ink-1);letter-spacing:.05em;font-weight:600}
body[data-theme="night"] #page-focus .sc-solo .sc-h{color:#ece4f8}
#page-focus .sc-solo .sc-head{margin-bottom:10px}
#page-focus .sc-solo .sc-seg{gap:0}
/* a switch that is off leaves its part of the page alone */
body[data-sc-tiny-off] #fxStepsCard{display:none}
body[data-sc-inbox-off] #fxParkCard,body[data-sc-inbox-off] #fabPark{display:none !important}
body[data-sc-low] #fxTimeCard{display:none}
#fxLowRow .fx-sw-label .r121-ic,#fxCalm .r121-ic{margin-right:6px}
/* Ingenium's own tooltip shows above the module's sheets, as it does above its own */
html body #ingTip{z-index:2147483300 !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p52"]="started";}catch(_){}
/* R121 · the support module in Ingenium: see the note at the top of its styles */
(function r121Support(){
"use strict";
if(!window.SupportCore||typeof state!=="object")return;
function $(id){return document.getElementById(id);}
function toast(t){try{ingToast(t);}catch(e){}}
function tc(){try{return window.IngInbox&&IngInbox.tc||null;}catch(e){return null;}}
function redraw(){try{fxRender();}catch(e){}}

/* ---------- where the module keeps its part: Ingenium's own tasks and step view, and state.supportCore for the rest ---------- */
function own(){if(!state.supportCore||typeof state.supportCore!=="object")state.supportCore={};return state.supportCore;}
var MAP={
  tasks:{g:function(){if(!Array.isArray(state.tasks))state.tasks=[];return state.tasks;},s:function(v){state.tasks=v;}},
  active:{g:function(){return state.activeTask;},s:function(v){state.activeTask=v;}},
  view:{g:function(){return sup("view");},s:function(v){state.support=state.support||{};state.support.view=v;}}};
var STORE=new Proxy({},{get:function(t,k){return MAP[k]?MAP[k].g():own()[k];},set:function(t,k,v){if(MAP[k])MAP[k].s(v);else own()[k]=v;return true;},
  has:function(t,k){return !!MAP[k]||k in own();}});

/* ---------- Ingenium's Clepsydra, as the module's timer ---------- */
var TIMER={state:function(){if(typeof pomo==="undefined"||!state.clep)return null;
    return {running:!!pomo.running,phase:pomo.phase==="focus"?"focus":"break",remaining:pomo.remaining,total:pomoPhaseLen(pomo.phase),focusLen:state.clep.focusLen};},
  start:function(n){state.clep.focusLen=n;saveState();pomoReset();pomoStart();redraw();},
  toggle:function(){pomoToggleRun();redraw();},
  stop:function(){pomoReset();redraw();},
  open:function(){openClepsydra();}};

/* ---------- what today asks of you, from Ingenium's own things ---------- */
function sameDay(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}
function todayRows(){var rs=[],now=new Date();
  var t=taskCur(),i=taskNext(t);
  if(t&&i>=0)rs.push({ico:"→",essential:true,text:"Your step in “"+t.title+"”: "+t.steps[i].t,
    acts:[["Done",function(){t.steps[i].done=true;delete t.steps[i].skip;saveState();redraw();SC.refresh();},1]]});
  (state.reminders||[]).slice(0,6).forEach(function(r){rs.push({ico:"🔔",essential:true,text:r.text,
    acts:[["Done",function(){var k=state.reminders.indexOf(r);if(k>=0)state.reminders.splice(k,1);saveState();try{bellRefresh();}catch(e){}SC.refresh();}]]});});
  var x=tc(),ps=Array.isArray(state.parked)?state.parked:[];
  ps.filter(function(it){return it.remindAt&&sameDay(new Date(it.remindAt),now);}).slice(0,4).forEach(function(it){
    rs.push({ico:"⏰",essential:true,text:"A thought asked to come back today: “"+String(it.t).replace(/\s+/g," ").slice(0,90)+"”",acts:x?[["Open it",function(){x.inbox(it.id);}]]:null});});
  if(ps.length&&!SC.on("inbox"))ps=[];
  if(ps.length)rs.push({ico:"💭",text:ps.length===1?"One thought waits in the Inbox.":ps.length+" thoughts wait in the Inbox.",acts:x?[["Open the Inbox",function(){x.inbox();}]]:null});
  try{var run=typeof lxActive==="function"?lxActive():null;if(run&&run.status==="reading")rs.push({ico:"📖",text:"Lector is reading "+(run.name||"an app")+": "+(run.done||0)+" of "+(run.total||0)+" parts.",acts:[["Open Lector",function(){go("lector");}]]});}catch(e){}
  try{if(state.clep)rs.push({ico:"⏳",text:pomoTodayText().replace(/^\w/,function(c){return c.toUpperCase();})+".",acts:pomo.running?null:[["Start one",function(){pomoReset();pomoStart();redraw();SC.refresh();}]]});}catch(e){}
  return rs;}

/* ---------- the switches: two are Ingenium's own already (its calm look and its clock); the rest are the module's ---------- */
var SW={calm:{get:function(){return !!sup("calm");},set:function(v){supSetRow("calm",v);}},
  time:{get:function(){return !!sup("clock");},set:function(v){supSet("clock",!!v);}}};
var WORDS={calm:["Calm look","No moving parts, fewer things on screen, softer shadows. The raised look stays."],
  tiny:["Smaller steps","Break any task into small steps, shown one at a time, with a two-minute Just start."],
  time:["Time you can see","The time in the top bar, with the minutes left while a focus timer runs."],
  inbox:["The Inbox","Catch a thought with Ctrl and the full stop, or the 💭 at the side, and sort it later."]};
function rowsFor(list){return list.map(function(r){var w=WORDS[r[0]];return w?[r[0],r[1],w[0],w[1]]:r;});}

/* ---------- a low day, and the switches, on Ingenium's own page ---------- */
var lastSig="";
function apply(low){var b=document.body;if(!b)return;
  b.toggleAttribute("data-sc-tiny-off",!SC.on("tiny"));b.toggleAttribute("data-sc-inbox-off",!SC.on("inbox"));b.toggleAttribute("data-sc-focus-off",!SC.on("focus"));
  var sig=[low,SC.on("tiny"),SC.on("inbox"),SC.on("focus"),SC.on("energy"),SC.on("routines")].join();
  if(sig!==lastSig){var first=!lastSig;lastSig=sig;if(!first)setTimeout(function(){redraw();try{supRowsPaint();}catch(e){}},0);}}
/* with the Inbox off, Ctrl and the full stop leave the page alone too */
window.addEventListener("keydown",function(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&(e.key==="."||e.code==="Period")&&!SC.on("inbox")){e.preventDefault();e.stopImmediatePropagation();
  toast("The Inbox is switched off. Focus, Your supports, turns it back on.");}},true);

var SC=SupportCore.create({app:"ingenium",appName:function(){try{return ingAppName();}catch(e){return "Ingenium";}},
  store:function(){return STORE;},save:function(){try{saveState();}catch(e){}},
  night:function(){return document.body.getAttribute("data-theme")==="night";},
  still:function(){return document.body.getAttribute("data-motion")==="minimal";},
  sw:SW,rows:rowsFor,tc:tc,timer:TIMER,timerName:"The full focus clock",accent:"#6b4fa0",
  toast:function(m){toast(m);},quietOpen:function(){quietOpen();},
  cls:{card:"card fx-card",btn:"btn small ghost",primary:"btn small primary",ghost:"btn small ghost",seg:"seg",segBtn:"seg-btn",segOn:"active",select:"",chip:"btn small ghost",title:"page-title",lede:"lede"},
  todayTitle:"Today asks of you",todayRows:todayRows,
  routines:function(){return [
    {id:"start",when:"start",icon:"🌅",en:"Start of the day",steps:[{en:"Water, and anything you take in the morning"},{en:"Look at your step in Focus: just look"},{en:"Choose the first small step"},{en:"Start one focus session"}]},
    {id:"end",when:"end",icon:"🌙",en:"End of the day",steps:[{en:"Write where the work stopped, in one line"},{en:"Empty your head into the Inbox"},{en:"Choose tomorrow’s first small step"}]}];},
  lowActs:function(box,k){box.appendChild(k.btn("⏱ Just start · 2 min","primary",function(){SC.justStart();}));
    if(SC.on("focus"))box.appendChild(k.btn("🎧 Open the Focus room","ghost",function(){SC.openFocus();}));
    box.appendChild(k.btn("🌿 I need quiet","ghost",function(){quietOpen();}));},
  applyLow:apply});

/* ---------- the module's cards in Ingenium's Focus grid ---------- */
function host(id,wide){var n=$(id);if(n)return n;n=document.createElement("div");n.id=id;n.className="fx-card-host"+(wide?" fx-wide":"");return n;}
function place(){var g=document.querySelector("#page-focus .fx-grid");if(!g)return false;
  var low=host("fxLowHost",true),today=host("fxTodayHost"),rt=host("fxRoutinesHost"),supp=host("fxSupportsHost",true);
  if(!low.parentNode)g.insertBefore(low,g.firstChild);
  if(!rt.parentNode)g.appendChild(rt);
  if(!today.parentNode)g.appendChild(today);
  if(!supp.parentNode)g.appendChild(supp);
  SC.mount({low:low,routines:rt,today:today,supports:supp});return true;}

/* Now: a routine at the right hour, as Carpe Diem's Now offers it */
var oNow=fxRenderNow;fxRenderNow=function(){var r=oNow.apply(this,arguments);try{var h=$("fxNow");if(!h)return r;
    [].forEach.call(h.querySelectorAll(".fx-txt"),function(t){var m=/^(\d+) parked thoughts? waiting\.$/.exec(t.textContent);if(m)t.textContent=(+m[1]===1?"One thought waits":m[1]+" thoughts wait")+" in the Inbox.";});
    var rt=SC.on("routines")&&!SC.lowToday()?SC.suggestedRoutine():null;if(rt){var d=el("div","fx-row");d.appendChild(el("span","fx-ico",rt.icon||"🌅"));
      d.appendChild(el("span","fx-txt","A good moment for your routine: "+SC.rName(rt).replace(/^\S+\s/,"")));var a=el("span","fx-acts");a.appendChild(fxBtn("Begin","ghost",function(){SC.runRoutine(rt);}));d.appendChild(a);
      var last=h.lastChild;h.insertBefore(d,last||null);}}catch(e){}return r;};
window.fxRenderNow=fxRenderNow;
/* Steps: the two-minute start, and the Focus room for the step in front of you */
var oSteps=fxRenderSteps;fxRenderSteps=function(){var r=oSteps.apply(this,arguments);try{var h=$("fxSteps");if(!h||fxBusy)return r;
    var row=h.querySelector(".fx-step-acts")||[].slice.call(h.querySelectorAll(".fx-acts")).filter(function(a){return !a.closest(".fx-task-top");}).pop();if(!row)return r;
    var js=fxBtn("⏱ Just start · 2 min","ghost",function(){SC.justStart();});js.setAttribute("data-sc-key","just");row.appendChild(js);
    var t=taskCur();if(SC.on("focus")&&t&&taskNext(t)>=0){var fr=fxBtn("🎧 Focus room","ghost",function(){SC.openFocus(t.title);});fr.setAttribute("data-sc-key","focusroom");row.appendChild(fr);}}catch(e){}return r;};
window.fxRenderSteps=fxRenderSteps;
/* Calm: a low-energy day beside the calm look, and the way into the Focus room */
var oCalm=fxRenderCalm;fxRenderCalm=function(){var r=oCalm.apply(this,arguments);try{var h=$("fxCalm");if(!h)return r;var at=h.querySelector(".fx-sw");
    if(SC.on("energy")){var w=el("label","fx-sw");w.id="fxLowRow";w.setAttribute("data-sc-key","low");var cb=el("input");cb.type="checkbox";cb.checked=SC.lowToday();cb.onchange=function(){SC.setLow(cb.checked);redraw();};
      var tx=el("span","fx-sw-text");var lb=el("span","fx-sw-label");lb.appendChild(el("span","r121-ic","🔋"));lb.appendChild(document.createTextNode("A low-energy day"));tx.appendChild(lb);
      tx.appendChild(el("span","small muted","Only what is essential today. Tomorrow starts afresh."));w.appendChild(cb);w.appendChild(tx);h.insertBefore(w,at?at.nextSibling:null);}
    if(SC.on("focus")){var a=el("div","fx-acts");a.style.marginTop="12px";var b=fxBtn("🎧 Open the Focus room","ghost",function(){SC.openFocus();});b.setAttribute("data-sc-key","focusroom");a.appendChild(b);h.appendChild(a);}}catch(e){}return r;};
window.fxRenderCalm=fxRenderCalm;

/* Settings, Support: the module's switches as a fourth group, in Ingenium's own rows */
var MODROWS=[["tiny","Smaller steps","The Steps card on Focus, with a two-minute Just start."],["energy","Low-energy days","One press, and the day keeps only what is essential. The next morning starts afresh."],
  ["inbox","The Inbox","The 💭 at the side, Ctrl and the full stop, and the Inbox card on Focus."],["routines","Routines","Step-by-step routines for starting and ending the day, offered at the right hour."],
  ["focus","Focus room","A quiet full-screen space with one task, the timer and a soft sound made on this device."]];
var oRows=supRowsPaint;supRowsPaint=function(){var r=oRows.apply(this,arguments);try{var h=$("supRows");if(!h)return r;
    var g=el("div","sup-group");g.appendChild(el("div","sup-group-title","Days, routines and the Focus room"));
    MODROWS.forEach(function(m){var w=el("label","fx-sw");w.setAttribute("data-sc-sw",m[0]);var cb=el("input");cb.type="checkbox";cb.checked=SC.on(m[0]);cb.onchange=function(){SC.set(m[0],cb.checked);};
      var tx=el("span","fx-sw-text");tx.appendChild(el("span","fx-sw-label",m[1]));tx.appendChild(el("span","small muted",m[2]));w.appendChild(cb);w.appendChild(tx);g.appendChild(w);});
    h.appendChild(g);}catch(e){}return r;};
window.supRowsPaint=supRowsPaint;

/* every redraw of Ingenium's Focus page draws the module's cards with it */
var oRender=fxRender;fxRender=function(){var r=oRender.apply(this,arguments);try{SC.refresh();}catch(e){}return r;};
window.fxRender=fxRender;

/* ---------- the tour: five more cards in its Focus chapter ---------- */
(function tour(){try{if(!Array.isArray(ING_TOUR)||ING_TOUR.some(function(s){return s.r121;}))return;
  var at=-1;ING_TOUR.forEach(function(s,k){if(s.chap==="Focus")at=k;});if(at<0)return;
  var F=function(){go("focus");};
  ING_TOUR.splice(at+1,0,
    {chap:"Focus",sub:"Routines",r121:1,go:F,ring:"#fxRoutinesHost",t:"🌅 Routines",b:"Two short routines, one to start the day and one to end it, each a few steps shown one at a time. The start routine is offered before noon and the end routine after five. Edit routines makes every step your own."},
    {chap:"Focus",r121:1,go:F,ring:"#fxTodayHost",t:"📋 Today asks of you",b:"Everything that waits on you today, in one place: your step, your reminders, a thought that asked to come back, a reading Lector is part way through, and your focus sessions. Each has its own key beside it."},
    {chap:"Focus",r121:1,go:F,ring:"#fxStepsCard",t:"🎧 The Focus room and Just start",b:"Just start runs a two-minute timer at the foot of the screen: starting is often the hardest part, and two minutes is enough. The Focus room fills the screen with one task, the timer and a soft sound made on this device. Esc leaves it."},
    {chap:"Focus",r121:1,go:F,ring:"#fxCalmCard",t:"🔋 A low-energy day",b:"On a day with little in the tank, turn on A low-energy day in Calm. Focus then shows only what is essential, with a card that says one small thing is enough. The next morning starts afresh on its own."},
    {chap:"Focus",r121:1,go:F,ring:"#fxSupportsHost",t:"🎛️ Your supports",b:"Each support has its own switch, here and in Settings, under Support. Off, it leaves the page and the side buttons alone. Carpe Diem and the Forge carry the same supports, in their own colours."});}catch(e){}})();

/* ---------- start ---------- */
(function start(){var tries=0;(function wait(){if(place()){redraw();SC.applyAll();return;}if(++tries<120)setTimeout(wait,500);})();})();
window.IngSupport={sc:SC,todayRows:todayRows,store:STORE};
})();
;try{window.__ingParts["p52"]="running";}catch(_){}
</script>
