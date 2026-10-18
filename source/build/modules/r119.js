<style id="r119-css">
/* ============ R119, R121 · THE INBOX AND ITS THOUGHT CLOUD ============
   R119 (17 October 2026) brought Carpe Diem's 💭 across whole. R121 (the same evening), her words: the panel was
   "really heavy to drag around the screen", its shadow "overwhelming the entire page"; "minimise and close ... both do
   the same thing"; "give the cloud emoji the Alerts bell emoji treatment and have a little number"; "little reminders
   throughout all of my apps"; "a little cloud and airy and puffy and animated". The cloud itself is the shared file
   source/build/thoughts/thought_cloud.html (the same one the Forge and Carpe Diem carry), written in just before this
   module; here are Ingenium's own parts: where its thoughts are kept (the parked thoughts she already has), where a
   thought can go, its night and its quiet times, the Focus page's Inbox card, the quiet screen's key, and the side
   buttons in Carpe Diem's order (the bell, then the 💭). */
.ib-list{display:flex;flex-direction:column;gap:9px;max-height:min(58vh,520px);overflow:auto;padding:2px 2px 4px;margin:8px 0 4px}
.ib-item{padding:10px 12px;border-radius:12px;background:var(--card-hi,#fff);border:.5px solid var(--hairline-soft,rgba(0,0,0,.06));box-shadow:var(--pop,0 1px 0 rgba(34,26,46,.06))}
.ib-t{font-size:14px;line-height:1.5;color:var(--ink-1);white-space:pre-wrap;overflow-wrap:anywhere}
.ib-w{font-size:11px;color:var(--ink-3);margin-top:2px;display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.ib-acts,.tc-acts.ib-acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.ib-foot{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px}
.ib-foot .btn{white-space:nowrap}
.ib-empty{padding:16px 4px;text-align:center;font-family:var(--serif,Georgia,serif);font-size:17px;color:var(--ink-2)}
.qs-cap{margin-top:12px}
/* the side column in Carpe Diem's order, her word (17 October): "the bell emoji button to be placed above the leaf
   emoji button to match Carpe Diem since the Alerts bell is not always present ... so that there isn't a weird gap".
   From the top: the bell, the leaf (Ingenium's own), the 💭, day or night, the Clepsydra, the notes. */
html body #fabBell{bottom:332px !important}
html body #fabQuiet{bottom:276px !important}
html body #fabPark{bottom:220px !important}
@supports (bottom:max(0px)){html body #fabBell{bottom:max(332px, calc(env(safe-area-inset-bottom) + 328px)) !important}
  html body #fabQuiet{bottom:max(276px, calc(env(safe-area-inset-bottom) + 272px)) !important}
  html body #fabPark{bottom:max(220px, calc(env(safe-area-inset-bottom) + 216px)) !important}}
@media (max-width:720px){html body #fabBell{bottom:calc(env(safe-area-inset-bottom,0px) + 274px) !important}
  html body #fabQuiet{bottom:calc(env(safe-area-inset-bottom,0px) + 228px) !important}
  html body #fabPark{bottom:calc(env(safe-area-inset-bottom,0px) + 182px) !important}}
/* the 💭's number sits on the button as the bell's does, whatever size the side buttons are given */
html body #fabPark > .tc-badge{font-size:10px !important;line-height:18px !important;display:block !important}
html body #fabPark > .tc-draft{font-size:0 !important;display:block !important}
html body #fabPark > .tc-badge[hidden],html body #fabPark > .tc-draft[hidden]{display:none !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p50"]="started";}catch(_){}
/* R119, R121 · the Inbox: see the note at the top of its styles */
(function r119Inbox(){
"use strict";
if(!window.ThoughtCloud)return;
function $(id){return document.getElementById(id);}
function list(){if(!Array.isArray(state.parked))state.parked=[];return state.parked;}
function h(tag,attrs,kids){var n=document.createElement(tag);if(attrs)for(var k in attrs){var v=attrs[k];if(v==null)continue;
    if(k==="class")n.className=v;else if(k==="text")n.textContent=v;else if(k==="onclick")n.addEventListener("click",v);else n.setAttribute(k,v);}
  (kids||[]).forEach(function(c){if(c)n.appendChild(c);});return n;}
function toast(t){try{ingToast(t);}catch(e){}}
function refresh(){try{fxRenderPark();}catch(e){}try{fxRenderNow();}catch(e){}}

/* where a thought can go, in Ingenium */
var PLACES=[
  {key:"note",label:"🗒️ To a note",word:"a note",run:function(it){try{var nn=newStickyNote();nn.text=esc(it.t).replace(/\n/g,"<br>");saveState();renderStickyPins();updateNotesCount();}catch(e){}toast("Pinned as a Schedae note.");}},
  {key:"tabula",label:"📝 To Tabula",word:"Tabula",run:function(it,tc){tc.closeInbox();
    try{localStorage.setItem("tabula_incoming",JSON.stringify({title:"From the Inbox",html:"<h1>From the Inbox</h1><p>"+esc(it.t).replace(/\n/g,"<br>")+"</p>"}));}catch(e){}
    go("tabula");toast("Sent to Tabula.");}},
  {key:"task",label:"🪜 Steps",word:"a task with steps",run:function(it,tc){tc.closeInbox();go("focus");try{taskBreak(it.t);}catch(e){}}},
  {key:"chat",label:"💬 To the chat",word:"the chat",run:function(it,tc){tc.closeInbox();go("chat");var ci=$("chatInput");if(ci){ci.value=it.t;try{ci.dispatchEvent(new Event("input"));}catch(e){}ci.focus();}}},
  {key:"reminder",label:"🔔 A reminder",word:"a reminder",run:function(it){state.reminders=state.reminders||[];state.reminders.push({text:it.t.slice(0,300)});try{bellRefresh();}catch(e){}toast("Kept with your reminders (the bell).");}}];

/* the model on this device suggests a place for each; nothing moves until she presses Do it */
function suggest(items){
  var prompt="These are thoughts I caught while working. For each one, say where it belongs, choosing exactly one word:\n"
    +"task (something to do, best broken into small steps), note (something to keep and look at again), reminder (something to remember at a time or a day), "
    +"chat (a question I want to think through with you), tabula (writing I want to develop into a page), done (no longer needed).\n"
    +"Answer with one line per thought and nothing else, in exactly this form: 3: task, a few words of reason.\n\n"
    +items.map(function(it,i){return (i+1)+". "+it.t.replace(/\s+/g," ").slice(0,300);}).join("\n");
  return supAsk(prompt,40+items.length*30).then(function(txt){var map={},got=0;String(txt||"").split(/\n+/).forEach(function(line){
      var m=/^\s*\**\s*(\d+)\s*\**\s*[:.)\-]\s*\**\s*(task|note|reminder|chat|tabula|done)\b\**\s*[,;:—–-]?\s*(.*)$/i.exec(line);if(!m)return;
      var it=items[+m[1]-1];if(!it)return;map[it.id]={to:m[2].toLowerCase(),why:m[3].replace(/\s*\.$/,"").slice(0,140)};got++;});
    toast(got?"Ingenium suggested a place for "+got+" thought"+(got===1?"":"s")+". Nothing has moved: press Do it where you agree.":"The model's answer could not be read as places. Sort them by hand, or try again.");
    return map;});}

function calm(){try{return document.body.getAttribute("data-motion")==="minimal"||document.body.getAttribute("data-calm")==="1"||(typeof sup==="function"&&sup("calm"));}catch(e){return false;}}
/* quiet times: a focus session running on the Clepsydra, or the quiet screen open; reminders wait until after */
function quiet(){try{if(window.IngSupport&&!IngSupport.sc.on("inbox"))return true;}catch(e){}/* R121: the Inbox switched off stays silent */
  try{if(typeof pomo!=="undefined"&&pomo&&pomo.running&&pomo.phase==="focus")return true;}catch(e){}
  var q=$("quietScreen");return !!(q&&!q.hidden);}

var TC=ThoughtCloud.create({app:"ingenium",prefix:"ing_tc_",fab:function(){return $("fabPark");},list:list,save:function(){try{saveState();}catch(e){}},
  uid:function(){try{return uid();}catch(e){return "t"+Date.now().toString(36);}},toast:toast,
  night:function(){return document.body.getAttribute("data-theme")==="night";},calm:calm,quiet:quiet,places:PLACES,suggest:suggest,onChange:refresh,
  placeholder:"A thought, a task, a worry: let it go"});

/* the Focus page's Inbox card: the same thoughts and places */
fxRenderPark=function(){var hst=$("fxParkList");if(!hst)return;hst.innerHTML="";var ps=list();
  var head=h("div",{class:"ib-foot",style:"margin:4px 0 8px"},[h("button",{type:"button",class:"btn small primary",text:"💭 Catch a thought",onclick:function(){TC.open();}}),
    ps.length?h("button",{type:"button",class:"btn small",text:"Open the Inbox · "+ps.length,onclick:function(){TC.inbox();}}):null]);hst.appendChild(head);
  if(!ps.length){hst.appendChild(h("div",{class:"small muted",text:"The Inbox is empty. A clear head."}));return;}
  ps.slice(0,30).forEach(function(it){var s=TC.spheres[it.sphere||TC.guess(it.t)]||TC.spheres.personal;
    var r=h("div",{class:"ib-item"},[h("div",{class:"ib-t",text:it.t}),h("div",{class:"ib-w"},[h("span",{text:TC.ago(it.at)}),h("span",{text:s.icon+" "+s.label}),it.remindAt?h("span",{text:"⏰ "+TC.when(it.remindAt)}):null])]);
    var a=TC.actsFor(it,refresh);a.classList.add("ib-acts");r.appendChild(a);hst.appendChild(r);});
  if(ps.length>30)hst.appendChild(h("div",{class:"small muted",text:"And "+(ps.length-30)+" more in the Inbox."}));};
window.fxRenderPark=fxRenderPark;
function quietKey(){var q=$("quietScreen");if(!q||q.querySelector(".qs-cap"))return;var inner=q.querySelector(".qs-inner")||q;
  inner.appendChild(h("div",{class:"qs-cap"},[h("button",{type:"button",class:"btn ghost small",id:"qsCatch",text:"💭 A thought came in",onclick:function(){TC.open();}})]));}
/* the words about the 💭, across the guide and the tour */
function words(){try{ING_TOUR.forEach(function(s){
    if(s.sub==="Parked thoughts"||s.sub==="The Inbox"){s.sub="The Inbox";s.t="💭 The Inbox";s.b="When a thought arrives in the middle of work, catch it and let it go: press Ctrl and the full stop anywhere in the app, or the 💭 at the side, and a little cloud pops up for it. Keep sends it into the Inbox; − puts it away with the 💭, which shows a number like the bell's and reminds you later. In the Inbox each thought is filed under a part of your life (academic, professional, creative, personal), can ask to come back at a time, and goes where it belongs: to a note, to Tabula, into steps, to the chat, to a reminder, or done.";}
    if(/Park, quiet, and out of the way|Catch, quiet, and out of the way/.test(s.t||"")){s.t="💭 Catch, quiet, and out of the way";s.b="The thought bubble catches a stray thought (Ctrl and the full stop do the same from anywhere) and its number counts what waits; the leaf opens the quiet screen. The small arrow above them lays all the side buttons down when you want a clearer page, and brings them back.";}});}catch(e){}}
function framesCatch(){[].slice.call(document.querySelectorAll("iframe")).forEach(function(f){try{if(f.contentDocument&&f.contentDocument.body)TC.keyCatch(f.contentDocument);}catch(e){}});}
/* day or night: the moon in light mode, the sun in dark mode (her word, 17 October). The button watches the page's own
   light, so whatever changes it (the button, Display, the system in Auto, a shell), the emoji is never the wrong one */
(function themeGlyph(){function paint(){try{var n=document.body.getAttribute("data-theme")==="night",g=$("fabThemeGlyph");var want=n?"☀️":"🌙";if(g&&g.textContent!==want)g.textContent=want;}catch(e){}}
  try{new MutationObserver(paint).observe(document.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}paint();})();
(function hooks(){var f=$("fabPark");if(f)f.onclick=null;
  if(typeof parkOpen==="function"){parkOpen=function(p){TC.open(p);};window.parkOpen=parkOpen;}
  quietKey();words();framesCatch();TC.wireFab();
  setInterval(function(){try{framesCatch();TC.wireFab();}catch(e){}},2000);
  if(typeof saveState==="function"&&!saveState.__ingInbox){var _ss=saveState;saveState=function(){var r=_ss.apply(this,arguments);try{TC.badge();}catch(e){}return r;};saveState.__ingInbox=1;window.saveState=saveState;}
  document.addEventListener("load",function(e){if(e.target&&e.target.tagName==="IFRAME")setTimeout(framesCatch,50);},true);
  try{fxRenderPark();}catch(e){}})();
window.IngInbox={tc:TC,capture:function(p){return TC.open(p);},open:function(id){return TC.inbox(id);},places:PLACES,list:list,suggest:suggest,markBar:function(){TC.badge();},keyCatch:TC.keyCatch};
})();
;try{window.__ingParts["p50"]="running";}catch(_){}
</script>
