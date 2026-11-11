<style id="r222-css">
/* ============ R222 · THE TOUR, ITS DEMONSTRATIONS AND THE GUIDE, UP TO DATE (Ingenium 6.15, 4 November 2026) ============
   Her words (4 November 2026): "Please make sure that the guided tour and its demonstrations are also updated as well as the Guide page
   to reflect the latest pages and sections as well as updates recently made to Ingenium, they should all be properly updated to reflect
   the latest version of Ingenium, the same for all of the different editions of Ingeniums and its demos."
   Measured on 6.14: the tour had 56 steps in 13 chapters and none for Code, Folders or the Career Studio; Chat's chapter did not show
   effort or connectors; Models did not show the newer models or the engines; Making things showed one Blend step; Settings did not
   show connectors or the sign-in. The help by page had nothing for Folders or the Career Studio (Code's pointed to the Chat chapter),
   and the Guide had no card for Folders, the Career Studio or the models, nor a list of what is new. The tour's last card named the
   rooms of an older tour.
   Now: Chat gains Effort and Connectors, and its model and + key steps say what changed; a Code chapter of six steps, one of them a
   demonstration of a plan ticked off in a Code session of the tour's own (removed when the tour ends, with her own session, column
   and its keys put back as they were); a Folders chapter; a Career Studio chapter where the edition carries it; Models gains Newer
   models, and Two engines on a computer whose app carries both; Making things gains Ways to blend; Settings gains Connectors and Your
   data, sealed. Help gains Folders and the Career Studio, and Code's help tours the Code chapter. The Guide gains What is new, Folders,
   the Career Studio and Models. The last card names the chapters this copy's tour has.
   Every edition: a chapter, a card or a line about a page an edition does not carry (Lector and the Career Studio are not in the gift
   and demo editions; the engine card only in a computer app) is left out of that copy's tour, help and Guide. Every text here was
   checked against the release notes of the version that made the feature. */
.wn-list{list-style:none;margin:8px 0 0;padding:0;display:grid;gap:8px}
.wn-list li{display:grid;grid-template-columns:64px 1fr;gap:10px;font-size:13px;line-height:1.5;color:var(--ink-2)}
.wn-list li b{font:700 12.5px/1.5 var(--mono,ui-monospace,monospace);color:var(--accent,#6a3fb5)}
@media (max-width:640px){.wn-list li{grid-template-columns:1fr;gap:2px}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p222"]="started";}catch(_){}
/* R222 · the tour, its demonstrations and the Guide, up to date: see the note at the top of its styles.
   window.IngTourNow: added(), whatsNew, codeId */
(function r222(){"use strict";
if(window.IngTourNow)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function has(id){return !!$(id);}
function goPage(p){try{W.go(p);}catch(e){}}
function touring(){return D.body.classList.contains("touring");}
function deskEngine(){try{var a=typeof W.deskApi==="function"?W.deskApi():null;return !!(a&&typeof a.engine_choice==="function");}catch(e){return false;}}
var ALL=["new","some","expert"];

/* ================= 1. a Code session of the tour's own, for its demonstrations ================= */
var CODE_ID="c-tour-code",kept=null;
var CODE_Q="Add a dark mode to my app, with a key that switches it.";
var CODE_A="I will add a dark colour scheme and a key that switches it. The plan is in the column on the right: each task is ticked as it is done, and the app is run and checked at the end.";
function freshPlan(){return {tasks:[{t:"Read the page and its styles",s:"done"},{t:"Add a dark colour scheme",s:"doing"},{t:"Add a key that switches it",s:"todo"},{t:"Run the app and check both looks",s:"todo"}],at:Date.now()};}
function keep(){if(kept)return;var cs={};try{cs=ccState();}catch(e){}
  kept={code:cs.activeCode||null,panel:cs.panel?JSON.parse(JSON.stringify(cs.panel)):null,
    P:W.IngR215&&IngR215.PANEL?{plan:!!IngR215.PANEL.plan,session:!!IngR215.PANEL.session}:null};
  try{if(tourSaved.chat===undefined)tourSaved.chat=state.activeChat||null;}catch(e){}}
function codeChat(){state.chats=state.chats||[];keep();
  var c=state.chats.filter(function(x){return x.id===CODE_ID;})[0];
  if(!c){c={id:CODE_ID,title:"Example from the tour",messages:[],kind:"code",__tourCode:true};state.chats.push(c);}
  if(!c.messages.length){var now=Date.now();c.messages=[{role:"me",text:CODE_Q,at:now},{role:"bot",text:CODE_A,at:now,done:now,plan:freshPlan()}];}
  try{ccState().activeCode=c.id;}catch(e){}
  goPage("code");
  try{if(state.activeChat!==c.id){state.activeChat=c.id;renderChat();ccPaintSide();ccPaintHead();}}catch(e){}
  return c;}
function codeBot(c){var ms=(c&&c.messages)||[];for(var i=ms.length-1;i>=0;i--)if(ms[i].role==="bot")return ms[i];return null;}
function column(which){try{if(W.IngR215&&IngR215.panel)IngR215.panel(which,true);}catch(e){}}
function codeGo(open){return function(){codeChat();(open||[]).forEach(column);};}
function dropCode(){var had=(state.chats||[]).some(function(c){return c.__tourCode;});if(had)state.chats=state.chats.filter(function(c){return !c.__tourCode;});return had;}
function putBack(){if(!kept)return;try{var cs=ccState(),k=kept;
    cs.activeCode=k.code&&(state.chats||[]).some(function(c){return c.id===k.code;})?k.code:null;
    if(k.panel)cs.panel=k.panel;else delete cs.panel;
    if(W.IngR215&&IngR215.PANEL&&k.P){IngR215.PANEL.plan=k.P.plan;IngR215.PANEL.session=k.P.session;}}catch(e){}kept=null;}
(function wrapClear(){var o=W.tourDemoClear;if(typeof o!=="function"||o.__r222)return;
  var n=function(){var wasCode=false;try{wasCode=!!(W.CC&&CC.mode==="code");}catch(e){}
    var had=dropCode(),r=o.apply(this,arguments);putBack();
    if(had){try{saveState();}catch(e){}}
    try{if(wasCode&&!ccIsCode(curChat()))goPage("code");else{renderChat();if(W.IngR215)IngR215.paintPanel();}}catch(e){}
    try{ccPaintSide();}catch(e){}
    return r;};
  n.__r222=1;W.tourDemoClear=tourDemoClear=n;})();
/* the demonstration: the example plan, ticked off one task at a time */
function demoPlan(){var c=codeChat(),bot=codeBot(c);if(!bot)return;bot.plan=freshPlan();column("plan");
  try{renderChat();IngR215.planChanged(bot);}catch(e){}
  var step=2,live=typeof tourLively==="function"?tourLively():true;
  var iv=setInterval(function(){var T=bot.plan.tasks;
    if(step>=T.length){T[T.length-1].s="done";clearInterval(iv);}else{T[step-1].s="done";T[step].s="doing";step++;}
    bot.plan.at=Date.now();try{renderChat();IngR215.planChanged(bot);}catch(e){}},live?1100:10);
  try{tourTimers.push(iv);}catch(e){}}
(function wrapDemo(){var o=W.tourDemoRun;if(typeof o!=="function"||o.__r222)return;
  var n=function(name){if(name==="r222Plan"){try{demoPlan();}catch(e){}return;}return o.apply(this,arguments);};n.__r222=1;W.tourDemoRun=tourDemoRun=n;})();

/* ================= 2. the new steps ================= */
var S={
  effort:{r222:1,levels:ALL,chap:"Chat",go:function(){tourDemoChat(true);},ring:"#effKey",
    t:"🎚️ Effort, beside the model",
    b:"The key beside the model's name sets how hard the model works on each message, from Low to Max: how much it thinks, how long it may write, and how many steps it may take. Auto chooses for each message and says under the reply what it chose and why. Point at a level to read what it does with the model you have.",
    tip:"Not sure? Leave it on Auto. Auto never chooses Max: Max is yours to choose."},
  connectors:{r222:1,levels:ALL,chap:"Chat",go:function(){tourDemoChat(true);},ring:"#chatImgBtn",
    t:"🔌 Connectors",
    b:"The + key, then Connectors: tools from outside services that the model can use while it answers. A tool that only reads runs when the model asks for it; a tool that changes something asks you first. Each use is a step under the reply.",
    tip:"Add one in Settings, Connectors, by its address. With none added, nothing changes."},
  code1:{r222:1,chap:"Code",sub:"Building an app",go:codeGo(),ring:"#chatInput",
    t:"🧩 Code: building an app with the model",
    b:"Code is where you build an app with the model and watch it run beside the conversation. Choose an app (a new one, a file or a folder of yours, or one of your GitHub repositories) and describe a change: the model reads the code and changes it, and the app runs beside the conversation. Every change is kept as a version you can undo.",
    tip:"One change at a time works best: look at the app after each."},
  code2:{r222:1,chap:"Code",sub:"The plan",go:codeGo(["plan"]),ring:'#ccPanel [data-sec="plan"]',demo:"r222Plan",
    t:"☑️ The plan, ticked off",
    b:"For a task of more than two steps, the model keeps a plan, and the Plan column shows it as a checklist: each task is ticked as it is done. The tour is ticking an example plan now.",
    tip:"With Ultracode on, every task has a plan."},
  code3:{r222:1,chap:"Code",sub:"The session",go:codeGo(["plan","session"]),ring:"#ccPanel",
    t:"🗂️ The Session column",
    b:"Session shows the session's Environment (where the files are kept, the app, the model, and a GitHub repository if you connect one), its Context (how much of the model's memory it uses), its Outputs (the files it made), its Changes (the lines added and removed), its Connectors and its Background tasks, each with a stop key."},
  code4:{r222:1,levels:ALL,chap:"Code",go:codeGo(),ring:"#effKey",
    t:"🚀 Ultracode",
    b:"In the effort menu, Ultracode works at Max effort: it plans, builds, runs checks inside the app as it runs, and fixes what fails. If it stops with tasks still open, errors in the app, a change not yet run or a failed check, Ingenium sends it back, up to three times, saying what is left."},
  code5:{r222:1,chap:"Code",sub:"GitHub",go:codeGo(["session"]),ring:"#ccPanel .ghx",
    t:"⑂ Your GitHub repositories",
    b:"In the Session column's Environment, connect one of your repositories and choose its branch. Ingenium reads the branch as it is now and keeps track of what you change. Push sends your changes to a branch of their own, never to the one you started from; Create PR opens a pull request, and the column then follows it and its checks."},
  codeEnv:{r222:1,levels:ALL,chap:"Code",go:codeGo(["session"]),ring:"#ccPanel .ccp-gear",
    t:"⚙️ The environment",
    b:"The gear beside Environment opens the environment the app runs in: network access (Full, Listed sites only, or None, held to by the browser), secrets added to the app's requests to one site, a setup script run before the app, and variables the app reads as window.ENV. One environment can serve many sessions."},
  code6:{r222:1,levels:ALL,chap:"Code",go:codeGo(),ring:"#chatInput",
    t:"⌨️ Pointing with @, commands with /",
    b:"In the message box, @ lists the app's files, to point the model at one: it reads that file before it answers. In a session on a GitHub repository, / lists its commands: /status, /diff, /push, /pr, /review (the model reviews your changes without editing them) and /update."},
  folders1:{r222:1,chap:"Folders",sub:"A folder for each app",go:function(){goPage("folders");},ring:"#page-folders .card",
    t:"🗂️ Folders",
    b:"Folders keeps a folder for each of your apps: how you like to work on it, where you left off, the decisions so far and what is open next. A conversation in a folder starts from those few thousand words, instead of every conversation before it, so nothing has to be explained again.",
    tip:"How I work, on every app, written once in your own words, goes with every conversation in a folder."},
  folders2:{r222:1,chap:"Folders",go:function(){goPage("folders");},ring:"#page-folders .fld-ways",
    t:"📥 Bringing your work in",
    b:"Bring in Claude's export (its chats and projects), Claude Code's sessions on this computer (in the computer app), a conversation pasted from Claude Code on the web or from Ollama, and an Ollama Modelfile as a way of working. Each is read on this device; each conversation is sorted into the folder of the app it names, and any can be moved."},
  career1:{r222:1,chap:"Career Studio",sub:"Applications and people",go:function(){goPage("career");},ring:"#page-career .rm-tabs",
    t:"💼 The Career Studio",
    b:"The Career Studio helps with applications for jobs, PhD places, fellowships and grants. Applications keeps each one with its documents and dates; People keeps the supervisors, referees, recruiters and hiring managers you write to, each with a status and a date to follow up; Today shows the single most urgent step.",
    tip:"One step at a time: the rest waits, folded, until you ask for it."},
  career2:{r222:1,chap:"Career Studio",go:function(){goPage("career");},ring:"#csWork",
    t:"🔗 A posting from its link",
    b:"Paste a job posting's link: Ingenium fetches it once and, with a model ready, reads it against your profile at once. A page behind a sign-in is said so plainly, and its text can be pasted instead. The jobs you saved or applied to on LinkedIn come in from LinkedIn's own copy of your data."},
  career3:{r222:1,chap:"Career Studio",go:function(){goPage("career");},ring:"#csHowK2",
    t:"✍️ Drafts you review",
    b:"For each application the studio writes the CV, the cover letter and a portfolio in the shape the role calls for, with every fact taken from your profile. Draft an email for me leaves what it does not know in square brackets. You read, change and send everything yourself: Ingenium sends nothing."},
  found:{r222:1,chap:"Models",sub:"Newer models",go:function(){goPage("models");},ring:"#foundCard",
    t:"🔎 Newer models, found online",
    b:"Check for newer models asks Hugging Face, only when you press it, for the newest model files of twelve publishers. It offers only a kind of model this device's engine can load and a file its memory can hold, with its size and licence, and installs it with the same checked download as Ingenium's own models.",
    tip:"How well a new model answers cannot be known until you try it. A weekly look is a switch, off until you turn it on."},
  engines:{r222:1,r222e:1,levels:ALL,chap:"Models",go:function(){goPage("models");},ring:"#engPairCard",
    t:"⚙️ Two engines",
    b:"On this computer, a newer engine sits beside the proven one. Automatic, the default, runs every model on the proven engine, except a kind of model only the newer engine can load. If the newer engine cannot load a model, the proven engine loads it at once."},
  blend2:{r222:1,levels:ALL,chap:"Making things",go:function(){goPage("blend");try{if(W.IngRooms){IngRooms.open("blend","new");IngRooms.step(2);}}catch(e){}},ring:"#blendStrats",
    t:"⚗️ Ways to blend",
    b:"Eight ways to bring the answers together, from Pass and refine and Compare and combine to Debate and settle, Check every claim and Divide the work; or Ingenium chooses, and says why. Your connected models answer beside the ones on this device, and under the answer you can read how it was settled, and every check."},
  settingsCn:{r222:1,levels:ALL,chap:"Settings",go:function(){goPage("settings");},ring:"#cnCard",
    t:"🔌 Connectors",
    b:"Settings, Connectors: add a connector by its address, and a token if it asks for one (kept on this device and sent only to that server). Its tools are listed, each saying whether it only reads or asks you first."},
  workshop:{r222:1,levels:ALL,chap:"Settings",go:function(){goPage("workshop");},ring:"#rmT-settings-author",
    t:"✒️ The Author Studio",
    b:"In your master edition, the Author Studio, a room of Settings: check Ingenium in plain words, see every error since it started, and find and fix one with a model on Ingenium's own page in Code. Add pages, sections, scripts and styles of your own, or hide what you do not use; a safe start runs Ingenium without them. On your computers, Your page puts a page changed in Code in place of the built one, and goes back on its own if it does not start."},
  settingsLock:{r222:1,levels:ALL,chap:"Settings",go:function(){goPage("settings");},ring:"#ingLockCard",
    t:"🔐 Your data, sealed",
    b:"An optional sign-in of your own, a name and a password, seals your data on this device. Several ways back in open it: the password, ten words you keep, a key file on a stick or a drive, and a hint. On a Mac or a Windows computer, its own sign-in (Touch ID or Windows Hello) can be one more.",
    tip:"There is no back door: keep the ways back in in different places."}};
var TEASE={"Code":"Building an app with the model: the plan, the Session column, its environment, Ultracode and GitHub.","Folders":"A folder for each app, and your work brought in from Claude and Ollama.","Career Studio":"Applications, the people you write to, and drafts you review."};
var CLOSE={"Code":"Code plans, builds, checks and fixes, and keeps every change as a version you can undo.","Folders":"Folders keep how you work, so no conversation starts from nothing.","Career Studio":"The Career Studio keeps every application and person in view, one step at a time."};

/* ================= 3. into the tour, where they belong ================= */
function idx(fn){for(var i=0;i<ING_TOUR.length;i++)if(fn(ING_TOUR[i]))return i;return -1;}
function lastOf(chap){var k=-1;ING_TOUR.forEach(function(s,i){if(s.chap===chap)k=i;});return k;}
function insertAfter(i,steps){if(i<0||!steps.length)return false;Array.prototype.splice.apply(ING_TOUR,[i+1,0].concat(steps));return true;}
function bare(t){return String(t||"").replace(/^[^A-Za-z]+/,"").trim();}
function apply(){if(!Array.isArray(W.ING_TOUR)||ING_TOUR.some(function(s){return s.r222;}))return;
  var km=idx(function(s){return s.chap==="Chat"&&/^Choosing the model/.test(bare(s.t));});
  if(km>=0){if(String(ING_TOUR[km].b).indexOf("by service")<0)ING_TOUR[km].b+=" When you connect Claude, OpenAI, Gemini, Kimi, OpenRouter or Ollama in Settings, their models join this menu, by service, and each conversation keeps the model that last answered it.";
    insertAfter(km,[S.effort]);}
  var plus=idx(function(s){return s.chap==="Chat"&&/^The \+ key/.test(bare(s.t));});
  if(plus>=0){ING_TOUR[plus].b+=" A document you attach opens beside the chat when you press it, and shows its first lines when you point at it.";insertAfter(plus,[S.connectors]);}
  insertAfter(lastOf("Chat"),[S.code1,S.code2,S.code3,S.code4,S.code5].concat(W.IngEnv?[S.codeEnv]:[]).concat([S.code6]));
  insertAfter(lastOf("Models"),[S.found]);
  var bl=idx(function(s){return s.chap==="Making things"&&/^Blend/.test(bare(s.t));});insertAfter(bl>=0?bl:lastOf("Making things"),[S.blend2]);
  var st=[];if(W.IngConnectors)st.push(S.settingsCn);if(W.IngLock)st.push(S.settingsLock);if(W.IngWorkshop)st.push(S.workshop);insertAfter(lastOf("Settings"),st);
  try{Object.keys(TEASE).forEach(function(k){if(!ING_TOUR_TEASERS[k])ING_TOUR_TEASERS[k]=TEASE[k];});}catch(e){}
  try{Object.keys(CLOSE).forEach(function(k){if(!ING_TOUR_CLOSERS[k])ING_TOUR_CLOSERS[k]=CLOSE[k];});}catch(e){}
  /* two chapters' lines say what they now hold, where they still say what they held */
  try{if(ING_TOUR_TEASERS.Models==="The four houses of models, and bringing your own.")ING_TOUR_TEASERS.Models="The four houses of models, bringing your own, and newer ones found online.";
    if(ING_TOUR_TEASERS.Settings==="Your own instructions, the support switches, and your data."&&W.IngConnectors&&W.IngLock)ING_TOUR_TEASERS.Settings="Your own instructions, the support switches, your data, connectors and the sign-in.";}catch(e){}
  try{tourPaintEntry();}catch(e){}}
/* the Guide's tour card: the tour is a third longer than when it said "About ten minutes", so it no longer guesses a time */
(function wrapEntry(){var o=W.tourPaintEntry;if(typeof o!=="function"||o.__r222)return;
  var n=function(){var r=o.apply(this,arguments);try{var p=D.querySelector("#guideTour p");if(p&&p.textContent.indexOf("About ten minutes; stop whenever you like.")>=0)p.textContent=p.textContent.replace("About ten minutes; stop whenever you like.","Stop whenever you like: the tour remembers where you stopped.");}catch(e){}return r;};
  try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}n.__r222=1;W.tourPaintEntry=tourPaintEntry=n;})();
/* the chapters of pages made as the page starts (Folders is made when the page has loaded, and the page may say it is ready a
   moment before): each joins once its page is there, and never while the tour runs */
function optional(){if(touring()||!Array.isArray(W.ING_TOUR)||!ING_TOUR.some(function(s){return s.r222;}))return;var did=false;
  if(has("page-folders")&&ING_TOUR.indexOf(S.folders1)<0){var mt=lastOf("Making things");if(mt<0)mt=lastOf("Chat");did=insertAfter(mt,[S.folders1,S.folders2])||did;}
  if(has("page-career")&&ING_TOUR.indexOf(S.career1)<0){var after=lastOf("Lector");if(after<0)after=lastOf(ING_TOUR.indexOf(S.folders1)>=0?"Folders":"Making things");did=insertAfter(after,[S.career1,S.career2,S.career3])||did;}
  if(did)try{tourPaintEntry();}catch(e){}}
/* the engines step, only where this computer's app carries both engines: its app is asked, as the Engine room asks it (a copy with
   the proven engine alone, as Windows has for now, shows the room but gets no step); its key may come a moment after the page */
var asking=false;
function engineStep(){if(asking||touring()||!Array.isArray(W.ING_TOUR)||!ING_TOUR.some(function(s){return s.r222;})||ING_TOUR.some(function(s){return s.r222e;})||!deskEngine())return;
  var a=null;try{a=W.deskApi();}catch(e){return;}asking=true;
  Promise.resolve().then(function(){return a.engine_choice();}).then(function(r){asking=false;
    if(!(r&&r.newer&&r.newer.available)||touring()||ING_TOUR.some(function(s){return s.r222e;}))return;
    var at=ING_TOUR.indexOf(S.found);if(at<0)at=lastOf("Models");if(insertAfter(at,[S.engines]))try{tourPaintEntry();}catch(e){}},function(){asking=false;});}
/* the last card names the chapters this copy's tour has */
var WORD={"Your devices":"your other devices","Making things":"the making tools","Career Studio":"the Career Studio","Scholarship":"the scholarly sources","The side buttons":"the side buttons","The top bar":"the top bar"};
function roomsLine(){var n=[];try{W.tourChapList().forEach(function(c){if(c.chap!=="Welcome")n.push(WORD[c.chap]||c.chap);});}catch(e){return null;}
  if(n.length<2)return null;return "You have seen every room: "+n.slice(0,-1).join(", ")+" and "+n[n.length-1]+". The best way to learn the rest is to try it. Here are three good first steps:";}
(function wrapFinale(){var o=W.tourFinale;if(typeof o!=="function"||o.__r222)return;
  var n=function(){var r=o.apply(this,arguments);try{var b=D.querySelector("#ingTour .finale .tour-body"),t=roomsLine();if(b&&t)b.textContent=t;}catch(e){}return r;};
  n.__r222=1;W.tourFinale=tourFinale=n;})();
/* a ring kept on what draws itself again (the Plan and Session column, its GitHub rows): while the tour shows the step, an
   element the step names wears the ring again once the one it was drawn on is gone */
var ringIv=null;
function keepRing(sel){if(ringIv){clearInterval(ringIv);ringIv=null;}var sels=Array.isArray(sel)?sel:[sel],k=0;
  ringIv=setInterval(function(){if(++k>48||!$("ingTour")){clearInterval(ringIv);ringIv=null;return;}
    if(D.querySelector(".tour-ring"))return;
    sels.forEach(function(q){var e=null;try{e=D.querySelector(q);}catch(_){}if(e&&e.getBoundingClientRect().width>2){e.classList.add("tour-ring");try{if(tourLively())e.classList.add("tour-pulse");}catch(_){}}});},250);
  try{tourTimers.push(ringIv);}catch(e){}}
(function wrapRing(){var o=W.tourRing;if(typeof o!=="function"||o.__r222)return;
  var n=function(sel){var r=o.apply(this,arguments);try{keepRing(sel);}catch(e){}return r;};
  try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}n.__r222=1;W.tourRing=tourRing=n;})();

/* ================= 4. help by page: Folders and the Career Studio; Code tours its own chapter ================= */
function help(){var P=W.IngHelp&&IngHelp.pages;if(!P||typeof P!=="object")return;
  if(P.code&&Array.isArray(P.code.tour)&&P.code.tour[0]==="Chat"&&ING_TOUR.some(function(s){return s.chap==="Code";}))P.code.tour=["Code"];
  if(has("page-folders")&&!P.folders)P.folders={name:"Folders",tour:["Folders"],
    what:"Folders keeps a folder for each of your apps: how you like to work on it, where you left off, the decisions so far and what is open next.",
    plain:"A conversation in a folder starts from what the folder keeps, a few thousand words, instead of every conversation before it.",
    dos:[["Open a folder","Its conversations, its notes and how you work on it.","#page-folders .card"],
      ["Bring in your work","Claude's export, Claude Code's sessions on this computer, and what you paste from Claude Code on the web or Ollama.","#page-folders .fld-ways"],
      ["Say how you work","Once, in your own words, for every app.","#fldHowAll"]],
    tips:{"new":["Start from the apps your profile names: untick any you do not want."],
      some:["Where we left off is brought up to date when you press it: only the conversations not read yet are read."],
      expert:["A conversation that names no app clearly waits under Not sorted yet; move it by hand."]}};
  if(has("page-career")&&!P.career)P.career={name:"Career Studio",tour:["Career Studio"],
    what:"The Career Studio helps with applications for jobs, PhD places, fellowships and grants: each application, the people you write to, and Today's step.",
    plain:"It drafts from your profile and your notes alone; you read, change and send everything yourself.",
    dos:[["Bring a posting by its link","Paste the link: it is read against your profile at once.","#csWork"],
      ["Applications","Each application with its documents and dates.","#csList"]],
    tips:{"new":["One step at a time: Today shows the most urgent one, and the rest waits, folded."],
      some:["Draft an email for me leaves what it does not know in square brackets, for you to fill in."],
      expert:["The jobs you saved on LinkedIn come in from LinkedIn's own copy of your data, one at a time."]}};}

/* ================= 5. the Guide: what is new, Folders, the Career Studio, the models ================= */
var NEW=[["6.77","The Models page's turret is now the one you chose, in its own lavender and violet. Each model on this device is a lens, its glass in the model's own colour and its name beside it; the turret holds five, the one in the engine always among them, and one empty port. Press a lens: the turret turns it under the engine's mark and loads it, and the card beside it shows how far the load has come. Press it again, or the empty port, to unload it. The scale round the turret is this device's memory for a model, filled as far as the loaded model needs. A model too heavy for this device asks first, and a busy engine is never interrupted. The rooms below keep the design of 6.76, drawn with these lenses; the room you are in stays filled in purple, and the line Open the Studio is gone (the Studio keeps its own room)."],
  ["6.77","The Offline Project you make in Fabrica now holds demonstrations only, never a full version of an app. Each room holds what your own site of The Offline Project holds: Carpe Diem's Public sample, The Forge's demonstration, Ingenium's demo edition (never this master edition) and Inkwell's own page. Ingenium carries each one, checks it against its fingerprint, and refuses a page that is not a demonstration. A version of The Offline Project you kept in Fabrica before 6.72 still holds the full apps: make it again with Bring one in, and its history will say Made from the demonstrations. The phone and tablet apps cannot make it, because their page leaves the engine out: make it in the computer app.","master"],
  ["6.77","The Models page has a new room, Downloads. Keep a model for a stronger computer: in the Ingenium app on a computer, Keep for later downloads a model, checks it against its fingerprint and keeps it without making it a model of this computer. Kept for a stronger computer lists the ones you keep, each with Use it on this computer, Copy to a folder and Show the file. In a web browser, Download the file saves a model's file to your Downloads folder; a model in several parts lists each part. Downloaded lately names what came in during the last sixty days."],
  ["6.76","The rooms of the Models page wear the turret's design too: Health reads as gauges; each of your models in Your models has its lens, its name in the page's serif, In the engine beside the one loaded, and a key to load or unload it through the turret; each of Ingenium's houses is a card with its lens."],["6.75","The Models page opens on a turret of lenses, as in your design: each of your models is a lens in the turret. Press one and the turret turns it into the engine and loads it; press it again, or turn in the empty port, to unload it. The scale round the turret shows the memory the model takes of what this device has, and the card beside it says what the engine is doing. A model too heavy for this device says so first."],["6.74","On Fabrica's A new app panel, the app's logo is a key of its own. It sways, its letter lifts and settles, and it leans toward your pointer, lifts under it and sinks when pressed; a press knocks it and turns it to its next colour. Use a picture puts a picture of your own on it, and the app is made with that logo: on its page, as its icon and in its installers. The colours, the ways and the fields of the panel move too.","fabrica"],["6.74","Ingenium says logo, not seal, wherever it speaks of an app's mark, its own included: on Home, in Blend, in the top bar, in the Guide and in the sounds. Seal still means locking a backup."],["6.74","The Career Studio's documents and Tabula, Abacus and Imago say logo too: the master logo of the Offline Project, each app's logo on a document, the logo studio and Tabula's watermarks.","career"],["6.73","A Windows app you make in Fabrica opens again. Since 6.70 Windows refused to start the apps Fabrica made; now each one opens, and Windows shows it by its own name, written into room the program keeps for it, not as a file ending in .exe.","fabrica"],
  ["6.72","Home's rooms are as solid as Ingenium's seal. Each orb has a body you see as it turns, its mark stands up from its face, and at rest its mark lifts and settles while its surface drifts like a turning planet. Point at a room and it lifts toward you; press it and it sinks as a key does; let go and it knocks, as your seal knocks before it opens the door, and the room opens. Minimal motion keeps them still."],
  ["6.72","On a phone, the next step's two keys on Home, Bring in your first model and Take the guided tour, are as wide as their words again, one under the other, as they are on a computer, instead of stretching across the card."],
  ["6.72","Lector and your app library carry Carpe Diem 1084, its full edition, in place of 1081: Tabula prints in colour and splits a long list across pages (1082), on a Mac the five rooms can sit in the Dock as apps of their own (1083), and set to French, all five rooms are in French throughout (1084). Lector measures it and quotes build 1084 with its own figures (48.7 MB and 71,421 lines).","master"],
  ["6.71","On a phone or a narrow window, Home, Blend and Folders now wear their new looks too. Home's rooms ride around Ingenium's seal on a gentler tilt, so no room's name passes under the seal. Blend's movement and Folders' drawer fit the screen's width, with words you can read at that size, and the build library's volume stands above its words. On a wider screen nothing changes. On a phone the side buttons start laid down; they now stay laid down when the guided tour closes, so they no longer cover the page."],
  ["6.70","Blend has a look of its own: the models you choose turn together as a movement in 3D. Each model is a wheel of rendered metal in its own violet, with its own mark, meshing with Ingenium's wheel, which holds Ingenium's seal in a polished collar, its star turning as on Home; the light falls from the top left and stays still while the wheels turn, and each wheel has its depth and its shadow on the plate. The movement sways a little and always faces you: point at a wheel and it comes to rest, the wheels slow to a stop and it names what that model does in this blend; press it and step I opens at its row. Press the seal to wind the movement. The four steps are raised labels with their numerals. Everything Blend did, it still does; where the window is narrow, Blend keeps its plain layout."],
  ["6.70","A Windows app you make in Fabrica now carries its own name inside it, so Windows shows it by that name (in Task Manager, on the taskbar and in its notices), not as a file ending in .exe. Fabrica's card for it is called Windows app, and the note that comes with the app calls it by its name. The file itself still ends in .exe, as every Windows program must; Windows hides that ending unless a PC is set to show it.","fabrica"],
  ["6.69","Folders has a look of its own: your apps stand in a drawer, each folder with its tab, its papers and its app's own seal (Carpe Diem, The Forge, Ingenium and Inkwell carry theirs, by day and by night as your Display is; any other app has a coin with its first letter). Point at a folder and it lifts out of the drawer and says where you left off; press it and it opens as a spread, the inside of its cover on the left with where you left off and how you work on it, its papers on the right. Every folder is an index card with its seal, the build library a bound book, the ways of bringing in your work envelopes in a tray, and How I work a ruled sheet. Everything Folders did, it still does; where the window is narrow, Folders keeps its plain layout."],
  ["6.68","Blend wears Home's look: its title and rooms stand in a sky, and Ingenium's seal is the blend's engine, its star turning counterclockwise; press it and it plays, as on Home. The models you choose ride round the engine as orbs, each with its own mark (Velox, Magister, Scriba, Faber, a connected model); point at one and the orbit stops and names what it does in this blend, press it and step I opens at its row. The four steps are coins, and every model, way, answer and ready-made card leans toward the pointer, lifts and sinks when pressed, with the keys' sound. Everything Blend did, it still does."],
  ["6.67","Home is an orrery: Ingenium's seal stands at its centre as the engine, larger and in more depth, its star turning counterclockwise without stopping, and your rooms ride around it as orbs. Each orb is a key drawn in layers, as the seal is: it sways a little, tilts to follow the pointer, lifts under it and sinks when pressed, with the keys' sound. Point at a room, or reach it with the Tab key, and the orbit stops and brings it near with what it holds; the guided tour holds it still. The greeting is in Ingenium's own Cormorant, and the next step keeps its two keys as they were, without the short guide's key (the Guide stays in the side list). Where Home is narrow, it keeps its grid of rooms; Minimal motion keeps it all still."],
  ["6.66","Fabrica moves as the rest of Ingenium does: the cards of Your apps lift, lean toward the pointer and sink when pressed, with the keys' sound; so do each app's own page, the tiles of Bring an app in, and the New app panel's choices, colours and close key. A panel opens with no film over the page, standing out as a raised plate, and the new app's seal is a coin that turns when you change its letter or colour.","fabrica"],
  ["6.66","The Offline Project without Inkwell is an app of its own in Fabrica, named so, and wears the shield of three; a copy you made before under the name of all four, every version of it without Inkwell, takes its own name and shield the first time Fabrica opens.","master"],
  ["6.65","Your build library on the Folders page: bring in the zip of notes on how your apps were built, and each app's notes appear in its folder under How it was built, with a Start here, its parts by name and its versions folded together. A finder on the card looks for a word in every note and opens the note at that place. The notes are kept on your devices, in a store of their own (Storage names it Your build library): they go with a backup and with Ingenium Cloud, and are never part of the page.","master"],
  ["6.65","Your sticky notes and the side buttons now float over a floating window, as they do over an app open full width. A floating window keeps to its own layers however often it is pressed, so the chat's drawer, the notes panel and every dialog always open above it; before, each press lifted the window one layer higher, until it covered them.","desk"],
  ["6.65","Answers from your folders are checked once more: when a sentence names no passage, the model is asked to cite every sentence, and the better answer is kept, with the first one folded under it. What still has no source is named under the reply, and when a small model answered, Ingenium names the stronger model for your computer, which cites more carefully. You can turn the second check off in Settings, Models and AI, Folders for the chat."],
  ["6.64","The notes under an answer from your folders are more exact: a title such as Mr. or Dr. no longer cuts a sentence in two, and a number in brackets joined to a word, such as strain[7], is no longer taken for a citation. The Windows app carries the folder search's optional reranker as well."],
  ["6.63","The Mac and Windows apps carry the folder search again, with its optional reranker (the 6.62 apps were built without it by mistake). When the model answers from your folders that it could not find something but adds an explanation around that sentence, the chat now shows only the sentence, as your rules for the folder search ask."],
  ["6.62","In the Mac and Windows apps, the folder search can reorder what it finds with a second reading model that reads your question and each passage together, so the passage that answers comes first more often. It is off until you switch it on in Settings, Models and AI, Folders for the chat, and it loads only then; it makes each answer several seconds slower."],
  ["6.61","Fabrica: press Your apps to open the library of your apps, each with its 3D seal, where it stands and Ship and Open; Open shows the app's own page. A new app is three choices and one key (its name and colour, how it starts), Bring an app in shows your apps as seals, and every panel closes with its ✕. The three panels stay as they were.","fabrica"],
  ["6.60","In the Mac and Windows apps, your folders keep themselves up to date: every 20 minutes while Ingenium is open (or as often as you choose in Settings, Models and AI, Folders for the chat), Ingenium looks for files that are new, changed or gone, and reads only those again."],
  ["6.59","In the Mac and Windows apps, the chat can answer from your own folders: switch on Your folders in the chat's + menu. Each reply then comes only from the folders you added in Settings (Models and AI, Folders for the chat), with its sources numbered; press a number to open the file at the passage it came from, marked. When nothing in your folders matches, the reply says so and no model is asked."],
  ["6.58","The Career Studio has a mentor: Your mentor, beside Today. It walks you through seven steps, one on the screen at a time, with your place always in view: what it can read about you (your CV, your documents, your LinkedIn export and Lector's readings of your apps), a short talk of eight questions, the entries and skills found in them (kept or dropped one at a time), what transfers and your blind spots, paths that fit, your CV and documents looked at with you, and a summary of what to do this week. Do the rest for me runs every step for you; Stop keeps what was finished, and the mentor opens where you left off. Each profile has its own.","career"],
  ["6.58","While Ingenium is working (a reply being written, Blend, dictation, the Cloud), the screen stays on, so a tablet or phone borrowing another computer's model does not stop halfway. In Settings, Models and AI, Your devices."],
  ["6.58","Dictation works in the Fire tablet, Android, iPhone and iPad apps too: they ask once for the microphone, and the speech model is fetched once and then works offline."],
  ["6.57","Ingenium Cloud: your work the same on every device. Your computer at home can keep it for all your devices, or any of your computers for another, over Wi-Fi, a phone's hotspot included. Everything is sealed with your passphrase on each device before it travels, only what changed travels, and what you delete on one device is deleted on the others. New work from another device is announced, and brought in when you say, or by itself when you are not typing. Away from home, a sync file does the same. In Settings, Your data, Ingenium Cloud."],
  ["6.57","The Mac apps and the installed Windows app carry the speech models dictation writes with, so it works offline from the first launch. The portable Windows program, the Fire tablet, iPhone and iPad fetch the model once instead."],
  ["6.57","A computer that keeps your Cloud stays awake while it does (its screen may still turn off), and it can do so without lending its models."],
  ["6.56","The microphone in the message box writes what you say with Scriba's own speech models, here on this device: your voice is never sent away. The first time, the speech model is fetched once and kept, so it works offline after that. Choose the language you speak (English, French, Haitian Creole or Spanish), or get it ready before you travel, in Settings, Models and AI, Search, eyes and ears. Your browser's speech service, which sends the sound away to be written down, is used only if you turn it on there.","career"],
  ["6.56","The microphone in the message box writes what you say with Ingenium's own speech models, here on this device: your voice is never sent away. The first time, the speech model is fetched once and kept, so it works offline after that. Choose the language you speak (English, French, Haitian Creole or Spanish), or get it ready before you travel, in Settings, Models and AI, Search, eyes and ears. Your browser's speech service, which sends the sound away to be written down, is used only if you turn it on there.","nocareer"],
  ["6.56","Lector and your app library carry Carpe Diem 1081, its full edition, in place of 1058: Lector measures it and quotes build 1081 with its own figures (48.5 MB and 71,186 lines).","master"],
  ["6.56","Lakay is carried at Build 6, with its new Spiral: a coin in sixteen planes, its edge, enamel plate, shell and pearl each at its own depth, in Lector, Fabrica and wherever your apps are listed.","master"],
  ["6.55","The keys in Home's greeting card are Ingenium's own keys again: the weighted edge beneath them, a rise when you point at them, a press when you choose them, and the keys' sound, with their white face and size kept. Check with Blend, under a reply, is a lilac key with the same edge, rise and press, without the glow."],
  ["6.55","The empty Chat and Code pages greet you by name, as Home does."],
  ["6.55","Choosing an app in Lector's Your apps answers at once: Lector prepares the app in the background, and the app's seal is drawn once instead of at every choice.","master"],
  ["6.55","Lakay, your store's app, is carried inside Ingenium at its latest build and kept with your other apps on first start: in Lector, in Fabrica's app library and wherever your apps are listed, with its Spiral in its seven layers.","master"],
  ["6.55","On a Mac, opening Ingenium again straight after quitting it, or while another copy is still open, no longer opens it without your models and conversations: it takes its own address again at once, and if another copy holds it, it says so and asks you to quit that one first."],
  ["6.54","Everything moves again as it did in 6.8.7: the seal's star, heart and ring, its sway, the sparks on Home's app stones, the crest's sway and quarters, the rail's bell, moon and hourglass, the top bar's dots and the apps' key glows, by themselves, with the colours, sizes and white faces of 6.53 kept. Home's sparks are drawn more lightly than before, in the same places and sizes, so Home does much less work while you are not using it."],
  ["6.54","The keys in Home's greeting card keep their size and white face, with a solid edge beneath in place of the bright line along the top; they no longer rise or spring under the pointer, and pressed they sit down into their edge."],
  ["6.53","The keys and surfaces look as they did in 6.9.4 again, with every feature since kept: the raised recipes added in 6.49 and 6.51 are gone, and nothing glows under a key. The + and microphone keys sit flat in the message box again, and the model key has no ring while nothing answers. The rail's icons, the seal and the top bar's dots keep still until you point at them, so the page does no work while you are not using it."],
  ["6.53","Fabrica no longer pins The Offline Project above Your apps. Bring one in offers it, made from your apps (all four, or without Inkwell); it is then an app in Your apps beside Ingenium and the others, with its crest, its versions and its ships, and making it again adds a version. Its own choices (each app's copy, its hall, Make and open, Save the app) are in Bring one in too.","master"],
  ["6.53","The guided tour, the Guide and Help now show what came lately: who answers and How it answers in the top bar, Connect a service, Context and compacting, how long a model thinks and sources when you ask, in every edition."],
  ["6.52","Longest reply, Context and Effort are kept. Each model on this device and each service you connected keeps its own, given back when Ingenium starts and whenever you change who answers; a model or service used for the first time starts from the last settings you chose. They were kept only for a model on this device before, so with a service they went back to 1,024 tokens and Medium at every start. The top bar's model key now holds How it answers under Who answers: Effort (Auto or a level), Longest reply (or Follows the effort) and Context, or a service's memory, so you can change them from any page; the chat's Controls show the same."],
  ["6.51","Quicker when the pointer moves, and keys that stand up from the page. Nothing in Ingenium redraws itself any more while you are not using it: Blend's step keys were rewriting themselves about thirty times a second on every page, and the seal's star, heart and ring were repainting the page for each frame of their movement; now the steps change only when they change, and the seal moves when you point at it (its gentle sway goes on). Keys have a shaded face, white above and lavender below, a lavender edge beneath them, and rise on a spring under the pointer; pressed, they sink into their edge. The empty Chat page keeps only its greeting, and Connect a service and Get a model while nothing answers yet: the four ready-made ideas are gone."],
  ["6.51","The Offline Project is listed with your apps: in Code's Your apps and in the + menu's One of your apps, all four apps or without Inkwell, each made fresh from your apps when you choose it, and opened as a project in Code or sent with your next message, as any of your apps is. Its hall's words can be edited in Code: in Fabrica, Edit its words in Code opens the hall's page (The Offline Project's hall), and every making uses your words until you choose the hall Ingenium carries again. Lector gathers it as you asked: choose all four apps, or the three, and the set wears its crest.","master"],
  ["6.50","The three levels, New to this, Some experience and Expert, are one card size on Settings, in the Guide's Start here and on the tour's first card: one width and one height, their words at the left, and narrower: on Settings as narrow as Some experience was."],
  ["6.49","Keys that rise and seat, elevated and refined. Every key has a fine outline, a thin edge beneath it and a soft, wide lift, lighter than before and the same size as before: under the pointer it rises and its lift spreads; pressed, it sinks into its seat at once and springs back. The top bar's keys and Home's large keys follow the same recipe, and keys that were words or bare outlines are keys now: Chat's + and microphone keys, the memory key and the ideas on an empty chat, and Home's See all. Display, then Depth, still offers Flat, and reduced motion keeps every key still."],
  ["6.49","The keys of Lector, Fabrica and the Career Studio follow the same recipe, and Lector's Suggestions, Copy and Open in Tabula are keys now.","career"],
  ["6.49","The Author Studio's Look keeps its depths either side of Ingenium's own keys: Soft is lighter still, a fine outline and a faint lift; Deep is the heavier key with the weight of Carpe Diem, The Forge and Inkwell. Its choice wins over the own keys, by day.","master"],
  ["6.48","Fabrica makes the Offline Project from your apps. Its list of apps opens with The Offline Project, wearing its live crest: choose All four apps or Without Inkwell, see the copy of each app its rooms hold (the one your library keeps now, or the earlier one), and Make and open, or Save the app: the hall with its crest and each app's live page inside it, in one file that opens on any device with no connection. It is made fresh each time, in this window; nothing of it is kept in the app library.","master"],
  ["6.47","Conversations compact like Claude's. The memory key beside the message box opens Context: how much of the model's memory the conversation fills, part by part (the instructions, the summary of its earlier part, the conversation, files and the room kept for the reply), and Compact now, with what to keep in focus. Compacting asks the model to write a summary of everything before the newest messages, and the summary takes that part's place for the model; every message stays on the page, and a line marks where it was compacted, with the summary to read. Automatic, on unless you turn it off, compacts before a message is sent when the conversation would fill more than 85 percent of the model's memory. Code's session column has Compact now and Automatic beside its Context bar."],
  ["6.47","Slash commands in every chat and in Code: type / at the start of the message box for the list (arrows, Enter or Tab, Escape): /compact, /context, /clear, /model, /connect, /connectors, /effort, /think, /fast, /research, /web, /remember and /help; in Code also /plan and /session, and on a GitHub repository its six commands in the same list. The + menu has Slash commands, and Code's + menu opens with Add files or photos, Slash commands and Add connectors."],
  ["6.46","Choosing who answers is at hand. Connect a service in three steps: choose it (Claude, OpenAI, Gemini, Kimi, OpenRouter, Ollama on this computer, another one or its cloud, LM Studio, or another service), paste your key or its address, and pick a model from the list the service gives, the strongest suggested; a refused key or a service that does not answer is said in plain words, with where to get a key. It opens from the menu beside the message box, the top bar, Controls, Settings and an empty chat. The menu beside the message box opens on Who answers: this device and each connection, one press each, then the models; Find a model searches every model of every connection. The top bar's key names who answers and switches from any page without leaving it. The key beside the message box names the service beside the model, and says Choose who answers when nothing can. Settings opens its Connections on Connect a service and the connections kept, with the form by hand folded under them. Key fields now have the app's look."],
  ["6.46","A model on this device thinks briefly and answers. Beside Thinking: How long it thinks (Brief by default, Standard, Deep, No limit); when its thinking passes that length, or goes round in circles (Wait, let me check again), Ingenium stops it and the model answers at once from its notes, in the same reply. Only when it helps (on): a short, simple message is answered without thinking. Models are asked to think a question through once and decide, not to go back over it. With Web search or Research on, answers come without numbers or a list of sources, which wait under the reply behind a Sources key; ask for sources, citations or references and they are cited and shown. Titles shown twice are gone, as in Settings' licence card."],
  ["6.46","The Career Studio's Today no longer names itself twice: the panel beside the list is now Your day.","career"],
  ["6.46","The Author Studio's Side bar room names itself once: the card under its head no longer says Side bar again.","master"],
  ["6.46","Every connected service keeps within its model's limits, as Claude does: OpenAI's models, Gemini, Kimi, OpenRouter, LM Studio and any service of their form, in a chat, a chat with files, Code and Blend. When a service refuses a reply asked longer than its model gives, Ingenium asks again within the figure it names and keeps it for the model; a refusal for your key's tokens a minute is waited out, and the reply comes. Ollama is asked what each model holds and is given the memory each conversation needs, up to the model's own window, in place of 32,768 at most (16,384 in Blend, and in a chat with files Ollama's own default of a few thousand, which cut the start of what was sent). When the computer running it is short of memory, Ingenium gives it half, fits the conversation to it, and the reply comes."],
["6.45","The Guide's Start here is in two calm parts: Take the tour, with the three levels each explained, and The chapters, a quiet list in two columns, like a book's contents, with how many you have seen."],
["6.45","Today's step in the Career Studio is in parts: the application's date and stage as chips, the step on a lilac card with its own mark and minutes, the posting's words when it quotes them, what the application holds so far, and the pace in a soft band.","career"],
["6.45","Presses are lighter: the Guide's What's new key, the drop-down lists and a visit to Chat or Code do far less work on each press, and the top bar's breathing dots no longer make the processor redraw them. Check with Blend, under a reply, is a lavender key with Blend's mark. The chat box has one stop key: while a reply is written, the purple key in the box stops it, and the white Stop above the box is gone. Outside its owner's edition, no permission opens Ingenium itself in Code or Build any more."],
["6.45","Settings has no Name card any more: the Author Studio's Names room renames Ingenium. The app library keeps no copy of the Offline Project's page: a page or a zip of it is not kept, and the library says why; a copy kept before is let go of. The Offline Project is always made from the four apps Ingenium holds now, and Lector shows the set you choose with its crest. The permission card you sign offers use, install, share and sell; edit and package are gone from it, since only your edition opens or packages Ingenium itself.","master"],
["6.44","The Career Studio has a room of its own, Your edge: what transfers from your record (each skill with its evidence, where it counts and a sentence for your documents drawn from that evidence), your blind spots (what you undersell or leave out, what your targets ask that your record does not show yet, habits that weaken your documents, questions a reader will ask, each with a fix), what sets you apart with your positioning as a professional, as an academic and the bridge between the two, and suggestions for each of your documents, never rewritten. Goals and plan has Your direction: paths that fit what you are looking for, each with why, the evidence, what is missing, a first step this week and the next three months, and what to find out before choosing. When Lector has read an app afresh, a newer copy above all, it spots by itself what the app shows that your CV and profile do not show yet: each skill or experience with its evidence, where it fits (the CV section and your other documents) and a sentence; they are kept in Your edge, under From your apps. Lector's Suggestions key brings a document there, and the chat's + menu attaches your career profile to a message. The studio now reads as much as the model's memory holds. Everything rests on your profile; nothing is invented or searched online.","career"],
  ["6.44","Claude through your connection keeps within each model's own limits: in a chat, a chat with files, Code and Blend, a request asks for no more than the model gives, and a refusal for a reply too long, a conversation over the model's window or your API key's tokens a minute is answered by Ingenium itself, and the reply comes. A connected model now reads its whole window, and Ingenium's own caps on how much a model reads are gone; a model's own limits and your key's still hold."],
["6.43","Making Ingenium itself as an app is kept to its owner's edition: in every other, the Build page's kits make your own apps only. Folders shows its names and titles at the app's own sizes."],
["6.43","The Author Studio gains a Side bar room: the order of the pages in each group, and which of them the side bar shows, each change undoable. In the top bar the Studio key now stands before About.","master"],
["6.42","Lector, Fabrica and every page that lists your app library take any app, not only the ones Ingenium knew by name. Add any app's page (or a zip of its files) and it is kept under its own name, with its version and its colour when its page names them. Lector reads it in full and writes its documents on a paper in its own colour, with its own logo on the cover; on the page its logo stands in 3D, or, when it has none, a seal of its initials. The chat's + menu, Fabrica's library and Storage name it as itself.","fabrica"],
  ["6.42","In your master edition, the app library recognises the Offline Project too, in both variations (all four apps, or without Inkwell): each is listed after your four, under its own name, and wears its live crest in Lector, the master seal or the shield of three. A set of your apps with another app in it is named as the apps it holds (2 apps together, and so on); the Offline Project's names, its crests and the master seal stay with your four.","master"],
  ["6.41","Fabrica shows each app's own logo when the app has one: the icon its page names, its manifest's icon, or a logo written into its page, in place of the empty mark, drawn in 3D as your apps' seals are (in layers at depth, with its shadow, swaying, turning toward the pointer, lifting when pressed). Nothing is fetched from the internet; with minimal motion it stands still, and so do the seals.","fabrica"],
  ["6.40","In your master edition, a repository named for the Offline Project wears its own crest in Fabrica, the way each of your apps wears its seal: in its row of Your apps and at the head of its work, live, each quarter moving as its app's seal moves (Carpe Diem's ring breathes, The Forge's sparks glint, Ingenium's star turns, Inkwell's wax glows). Named for the variation without Inkwell, it wears the trio's crest. With minimal motion it stands still.","master"],
  ["6.39","Folders can bring in a GitHub repository: its README goes with every conversation in the folder, and its files and its issues, with their comments, are kept there to show or to use in a conversation. On a computer app the signing keys are now kept on its disk as well, so they outlast a web view that forgets, and Reset everything takes them away too."],
["6.38","One size throughout: Home, the rooms' tabs and the backup's keys now use the app's own lettering and key sizes, with no oversized keys or headings. The model list in Chat and Code opens just above its key. Reset everything now clears everything Ingenium keeps on this device, and says what stays."],
["6.38","The Author Studio is drawn in the app's own measures: a slim top bar with pills, a rail lettered like the side bar, and cards, headings and fields at the sizes used everywhere else.","master"],
["6.37","The Author Studio is a studio of its own, the room behind the rooms, as Carpe Diem's is: press any words in Ingenium and rewrite them, on that page or everywhere; rename Ingenium and each page; change its colour, fonts and depth; check it, read its errors and add your own parts. Every change is kept and listed, and each can be undone; Export all, Import all and Reset all are in its top bar.","master"],
["6.36","Focus in four parts, one at a time: Today, Work, Calm and Supports. Each part is a raised card that says what stands in it now (the step in front of you, the timer counting, the thoughts waiting in the Inbox, how many supports are on); pressed, its cards rise in. The part you chose last is kept, and the tour and Help open the part they point to."],
["6.35","Newer models have a room of their own on the Models page, beside Ingenium's models, with Check for newer models at its top: before a look it says what pressing it does, and after one a single line counts the models this device can run. It used to sit at the foot of the houses' long card, out of sight."],
  ["6.34","Your documents reach a model on this device: a Word file, a PDF or your notes go to it whole when they fit (a long one as its opening and passages from across it), a Word document can be read with the model's tools, and a question about documents is answered as a careful reader would, from what it read, naming the document and the place. Each document in a chat still opens when you press it and shows its first lines when you point at it."],
  ["6.33","Settings without the long scroll: Your data in four sections (Bring in, Back up and move, Storage, Sign-in and reset) and Models and AI in four (Your Ingenium, Connections, Search and eyes, Your devices), one at a time; Moving's steps two by two, Storage in two columns, and Everyday's cards side by side. Reset everything now leaves nothing of the earlier desk behind: not its recovery shelf, not a save still on its way, and on a computer not the copy on its disk, which the computer keeps among its earlier desks."],
  ["6.32","With the sign-in on, your app library, Fabrica's apps with every version, and the packages Fabrica made are sealed too, as the rest of your data is (AES-256, under the key your password opens). A copy locked before 6.32 seals them at its next sign-in; turning protection off writes them back plain.","fabrica"],
["6.31","Folders brings in your work from ChatGPT, Gemini, Grok, DeepSeek, Le Chat, Copilot and LM Studio, as well as from Claude and Ollama: Bring in an export takes the file each one gives you, as it came, and each conversation is sorted into your folders. An LM Studio chat comes in with the reply you chose, and its system prompt kept as a note."],
["6.30","A backup can now be sealed whole: on the Backup page, Seal the whole backup encrypts every part of it with a password of your own (AES-256, under a key drawn from the password over 600,000 rounds), and it is on by itself while Ingenium is locked. Without the password nothing in it can be read, by you or by anyone; restoring asks for it, and a changed file is refused."],
["6.29","Each model keeps its own reply length and memory: a model with none saved gets 1,024 tokens and 8K, never a slider's midpoint, and Settings on the Models page no longer cuts a larger memory it cannot show. Lector, the Career Studio and Folders now set Reply and Memory beside Effort, for the model they write with; a change there is the same change in Chat, remembered per model.","career"],
  ["6.29","Each model keeps its own reply length and memory: a model with none saved gets 1,024 tokens and 8K, never a slider's midpoint, and Settings on the Models page no longer cuts a larger memory it cannot show. Folders now sets Reply and Memory beside Effort, for the model it writes with; a change there is the same change in Chat, remembered per model.","nocareer"],
["6.28","Models, Studio, Train in three parts: Overview, Workbench and Trainer, one at a time. The Overview's four cards open when you press them; each workbench tool goes one step at a time, with Back and Next."],
  ["6.27","The editions, as you set them out: the public ones (gift, demo) hold Home, Chat, Code, Folders, Focus, Models, Blend, Build, the Guide and Settings, and nothing else; the full one keeps the five apps, Lector, the Career Studio and Fabrica, with no renaming, no author's key, no Author Studio and none of your other apps. Only your master edition has them all.","master"],
  ["6.26","The Guide in rooms: Start here, Chat and Code, Models and devices, Making and study, and Around the app. Each topic is a raised tile that opens in place when you press it, one at a time; Find in the guide and Show the whole guide at once sit above them. What's new waits in its own key beside the title, with the versions grouped."],
  ["6.25","Ingenium speaks in its own words: Code's Plan and session column, the Guide, the tour and Settings no longer compare its parts to another assistant's. Names stay only where Ingenium really connects to a service or reads its files (your Claude export, a Claude connection, GitHub, Ollama)."],
  ["6.25","In your master edition, the Workshop is now the Author Studio, a room of Settings beside Your data and Ownership; the side bar no longer carries it.","master"],
  ["6.24","The Career Studio's Stop stops at one press: it says Stopping at once, ends within a few seconds whatever the model is doing, and no layer can ask the model again for a stopped reading (Lector and Folders are never held up). The Stop key is the studio's purple. A reading is now asked as a reading (the model is no longer told to write in your voice while it judges), and a model on this device reads a shorter extract, so it starts sooner.","career"],
["6.23","A model is installed once: Get on a model already here no longer downloads it again, a file already here is not added twice, and models installed more than once are listed on the Models page with one key that keeps one of each (the one in use first), after you confirm."],
  ["6.22","The Career Studio reads a posting as an admissions tutor or a recruiter would: experience that transfers from your other work counts, each judgement names the entry of your profile it rests on, and each gap says whether you could learn it, whether it waits on you, or whether it is a formal requirement. While it reads you see the model's reasoning, and each criterion as it is judged; your CV and letters are told the link to make, and never to claim what is not shown.","career","career"],
  ["6.22","A profile file can now carry applications and people too: programmes or posts with their particulars and dates, and the people to write to, each tied to its application.","career"],
  ["6.21","Copy in the right-click panel reaches every other app: the words you selected are kept as the panel opens and copied inside the press itself, as the keyboard's shortcut does. The Copy, Open and Download keys under Build's and Code's previews are the page's own raised keys, each with a symbol."],
  ["6.21","In the Career Studio, + Bring one on Today and + A person on People are purple like the other add keys, the card you have open is light purple, and the back keys show only on a narrow screen, where they take you back to the list.","career"],
  ["6.20","Code's column: the sessions list is as tall as its sessions, so Files sits right under it. The chat's height holds steady when two layouts swing, until the window or the chat's layout changes."],
  ["6.20","In your master edition, Your page saves the page running, or the copy in Code made whole, straight from the computer app; a page older than 6.19 is refused, with the reason.","master"],
  ["6.19","In your master edition, Your page, in the Author Studio (then the Workshop): on your computers, Ingenium's page changed in Code (or a page file) takes the place of the built one at once, with your work as it is; one that does not start is left, and Ingenium goes back to the last page that worked on its own.","master"],
  ["6.18","In your master edition, the Workshop (now the Author Studio): check Ingenium, see its errors, find and fix one with a model, and add pages, sections, scripts and styles of your own.","master"],
  ["6.18","How I work, on every app now goes with every Code session and every request Build makes."],
  ["6.17","Effort wherever a model is chosen: Build has its own, with Ultracode."],
  ["6.17","Lector, the Career Studio and Folders share one writing effort, with Ultra to check each piece against its material.","career"],
  ["6.16","A Code session's environment: network access, secrets for sites, a setup script and variables, applied to the app as it runs. No scroll bar in sight anywhere, and everything still scrolls."],
  ["6.15","The guided tour and the Guide up to date in every edition; the Code column without a scroll bar; a wider, raised repository picker."],
  ["6.14","Connectors in Chat and in Code; @ to point the model at a file; each Code session's state in the list."],
  ["6.13","Code on your GitHub repositories: a branch read as it is now, your changes pushed to a branch of their own, pull requests and their checks."],
  ["6.12","Blend with your connected models, effort up to Ultra, three new ways, how each answer was settled, and Check with Blend under any reply."],
  ["6.11.2","Check for newer models, on the Models page, when you press it."],
  ["6.11.1","Ingenium's own pop-ups everywhere; a document in a chat opens beside it, with a preview when you point at it."],
  ["6.11","Code sessions with effort, Auto and Ultracode beside the model, the plan ticked off, and the Session column."],
  ["6.10.5","On a Mac, a newer engine beside the proven one, which stays the default."],
  ["6.10.3","More models for every device, and quicker replies."],
  ["6.10.1","The computer's own sign-in (Touch ID or Windows Hello) as a way back in."],
  ["6.10","Folders, one for each of your apps; your work brought in from Claude and Ollama."],
  ["6.9.9","More ways back in: a recovery key file and a hint, beside the password and the ten words."],
  ["6.9.8","A job posting read from its link, and your saved jobs from LinkedIn's copy of your data.","career"],
  ["6.9.7","The Career Studio's People, and Today: one step at a time.","career"],
  ["6.9.2","An optional sign-in, with your data sealed on this device."],
  ["6.9.1","A longer memory: more of each conversation kept in view."]];
/* x[2]: "career" where the Career Studio is, "nocareer" where it is not (the same news in the words of an edition without it), "fabrica" where
   Fabrica is (6.33), "master" in the master edition alone */
function newNow(){return NEW.filter(function(x){return (x[2]!=="career"||has("page-career"))&&(x[2]!=="nocareer"||!has("page-career"))&&(x[2]!=="fabrica"||has("page-fabrica"))&&(x[2]!=="master"||!!W.IngWorkshop)&&(x[2]!=="desk"||!!W.IngDesk);});}
function card(id,title,lede){var c=mk("div","card blx-guide");c.id=id;c.appendChild(mk("h3",null,title));if(lede){var p=mk("p","small muted",lede);p.style.marginTop="0";c.appendChild(p);}return c;}
function dl(rows){var d=mk("dl");rows.forEach(function(r){d.appendChild(mk("dt",null,r[0]));d.appendChild(mk("dd",null,r[1]));});return d;}
function guide(){var page=$("page-guide");if(!page)return;var added=false;
  if(!$("wnGuide")){var wn=card("wnGuide","What is new","The latest versions, newest first. The cards below explain each part.");var ul=mk("ul","wn-list");
    newNow().forEach(function(x){var li=mk("li");li.appendChild(mk("b",null,x[0]));li.appendChild(mk("span",null,x[1]));ul.appendChild(li);});wn.appendChild(ul);
    var first=$("guideTourCard")||page.querySelector(".card");if(first&&first.parentNode)first.parentNode.insertBefore(wn,first.nextSibling);else page.appendChild(wn);}
  if(has("page-folders")&&!$("fdGuide")){var f=card("fdGuide","Folders","A folder for each of your apps, so no conversation starts from nothing.");
    f.appendChild(dl([["What a folder keeps","How you like to work on the app, in your own words; where you left off (a summary); the decisions so far; what is open next."],
      ["Why it helps","A conversation in a folder starts from those few thousand words instead of every conversation before it: fewer words for the model to read, and nothing to explain again."],
      ["Where we left off","Brought up to date when you press it, by reading only the conversations not read yet, each once. The model is told never to invent a version, a date, a decision or a file."],
      ["Bringing your work in","Claude's export (its chats and projects); the exports of ChatGPT, Gemini, Grok, DeepSeek, Le Chat, Copilot and LM Studio; Claude Code's sessions on this computer, in the computer app; a conversation pasted from Claude Code on the web or from Ollama; an Ollama Modelfile as a way of working. Each is read on this device."],
      ["A GitHub repository","Brought into a folder on your press (6.39): its README joins the folder's files and goes with every conversation in it; its text files and its issues, with their comments, are kept in the folder, each with Show and Use in a conversation. It is read from GitHub, the only part of Folders that uses the internet; a private repository needs the token Add from GitHub keeps."],
      ["What it does not do","No model is retrained. A folder gives the model what it should read about your way of working, briefly."]]));page.appendChild(f);added=true;}
  if(has("page-career")&&!$("csGuide")){var cs=card("csGuide","The Career Studio","Applications for jobs, PhD places, fellowships and grants, one step at a time.");
    cs.appendChild(dl([["Today","The single most urgent step across your applications and the people you write to; the rest waits, folded."],
      ["Applications and people","Each application with its documents and dates; supervisors, referees, recruiters and hiring managers, each with a status and a date to follow up."],
      ["Drafts","The CV, the cover letter and a portfolio for each application, shaped by templates for 25 roles in 8 fields, with every fact from your profile. Draft an email for me leaves what it does not know in square brackets. You send everything yourself."],
      ["Postings and LinkedIn","A posting's link is fetched once and read against your profile. Your saved jobs come in from LinkedIn's own copy of your data; nothing signs in to LinkedIn."]]));page.appendChild(cs);added=true;}
  if(!$("mdGuide")){var md=card("mdGuide","Models: newer ones, and two engines","How Ingenium keeps your models current, and runs them.");
    md.appendChild(dl([["Check for newer models","On the Models page, in its own room, Newer models: it asks Hugging Face, only when you press it, for the newest files of twelve publishers, and offers only those this device can load and hold, with their size and licence. A weekly look is a switch, off until you turn it on."],
      ["Two engines","On a Mac, the proven engine (llama.cpp) stays the default, and a newer one runs the kinds of model only it can load; if the newer one cannot load a model, the proven one does at once. Windows has the same choice, and its builds will carry the newer engine in a later release. Phones and tablets keep the proven engine."],
      ["What it cannot know","How well a new model answers, until you try it."]]));page.appendChild(md);added=true;}
  /* in their order after the other cards of the Guide, whichever came first */
  if(added){var at=$("cnGuide")||$("ghxGuide")||$("blxGuide")||$("guideEffortCard");
    ["fdGuide","csGuide","mdGuide"].forEach(function(id){var c=$(id);if(!c||!at||!at.parentNode)return;at.parentNode.insertBefore(c,at.nextSibling);at=c;});}}

/* ================= 6. start ================= */
function leftovers(){if(touring())return;try{if(dropCode()){var cs=ccState();if(cs.activeCode===CODE_ID)cs.activeCode=null;if(state.activeChat===CODE_ID)state.activeChat=((state.chats||[])[0]||{}).id||null;saveState();try{ccPaintSide();}catch(e){}}}catch(e){}}
function boot(){try{leftovers();}catch(e){}try{apply();}catch(e){try{console.warn("Ingenium tour:",e);}catch(_){}}try{optional();}catch(e){}try{engineStep();}catch(e){}try{help();}catch(e){}try{guide();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function later(){var n=0;(function wait(){if(W.__ingReady===true){boot();setTimeout(function(){try{boot();}catch(e){}},2500);return;}if(++n<400)setTimeout(wait,500);})();})();
W.addEventListener("load",function(){try{boot();}catch(e){}});
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r222)return;
  var ng=function(p){var r=og.apply(this,arguments);try{optional();if(p==="guide")guide();if(p==="models")engineStep();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r222=true;W.go=go=ng;})();
W.IngTourNow={added:function(){return (W.ING_TOUR||[]).filter(function(s){return s.r222;}).map(function(s){return s.chap+": "+bare(s.t);});},whatsNew:newNow,codeId:CODE_ID};
})();
;try{window.__ingParts["p222"]="running";}catch(_){}
</script>
