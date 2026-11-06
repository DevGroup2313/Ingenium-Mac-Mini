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
var NEW=[["6.39","Folders can bring in a GitHub repository: its README goes with every conversation in the folder, and its files and its issues, with their comments, are kept there to show or to use in a conversation. On a computer app the signing keys are now kept on its disk as well, so they outlast a web view that forgets, and Reset everything takes them away too."],
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
function newNow(){return NEW.filter(function(x){return (x[2]!=="career"||has("page-career"))&&(x[2]!=="nocareer"||!has("page-career"))&&(x[2]!=="fabrica"||has("page-fabrica"))&&(x[2]!=="master"||!!W.IngWorkshop);});}
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
