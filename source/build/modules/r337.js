<style id="r337-css">
/* ============ R337 · FABRICA'S PLAN, STAGE 2: ONE ECOSYSTEM (Ingenium 7.48, 20 November 2026) ============
   The audit's recommendations 5 to 7, approved in full (19 November 2026: "I approve of all your recommendations ... I want them all
   implemented into Ingenium in the proposed order"), and her words of the same day: "one ecosystem ... the same for the Adamas and Fabrica
   and the Folders page should be connected to all of the chat pages".
   5. The folder in Code: a Code session on an app works with that app's folder (the folder of the same name on the Folders page): its
      notes go with every turn, as a conversation in the folder has them (r208's contextFor, through IngCodeFolder), and its key, Its
      folder, stands in the session's top row. With no folder yet, the key makes one.
   6. Folders and Fabrica, both ways: an app's folder shows its repository in Fabrica (the branch it is on, its newest version, the open
      pull requests, the last run), with Open in Fabrica, Open in Code and All in one place; and Fabrica writes a dated line into the
      folder's Where we left off when a pull request is merged or closed, a run fails or a release is made (a tag), so a later
      conversation knows what happened without rereading everything. The lines go with the folder's notes to the model.
   7. One view of an app, All in one place, on Fabrica's own sheet (r333's .fbx): where we left off, its repository, its releases, its
      conversations and Code sessions, and its keys (Open the folder, Open in Fabrica, Open in Code, Open in Adamas, Start a conversation),
      reached from Folders (the folder's head), Fabrica (the app's page), Code (Its folder), Chat (a conversation in the folder) and Adamas
      (an app opened from Fabrica).
   Her word on its pictures (19 November 2026): "I approve of the preview, please commit and push it everywhere". In the gift and demo
   editions, which have no Fabrica, only the folder in Code is kept (its key opens the folder).
   Nothing here is drawn of its own: the keys are Ingenium's raised keys (chat-top-key, the folder's btn, Fabrica's f-btn) and the sheet
   is Fabrica's; no violet wash under the pointer; Minimal or reduced motion keeps everything still. */
#r337Folder[hidden]{display:none!important}
.fbx.r333x .r337-sec{margin:12px 0 0}
.fbx.r333x .r337-sec > h4{margin:0 0 6px;font:600 10.5px/1.3 var(--f-sans,inherit);letter-spacing:.14em;text-transform:uppercase;color:var(--f-ink3,#6c6579)}
.fbx.r333x .r337-brief{white-space:pre-wrap;font-size:13px;line-height:1.55;max-height:9.5em;overflow:auto;scrollbar-width:none}
.fbx.r333x .r337-brief::-webkit-scrollbar{display:none}
.fbx.r333x .r337-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.fbx.r333x .r337-facts > div{padding:8px 10px;border-radius:11px;background:var(--f-wellbg,rgba(106,63,181,.05));box-shadow:var(--f-well,none)}
.fbx.r333x .r337-facts b{display:block;font-size:13.5px;line-height:1.3;color:var(--f-ink1,#221a2e);overflow-wrap:anywhere}
.fbx.r333x .r337-facts small{display:block;font-size:11px;color:var(--f-ink3,#6c6579)}
.fbx.r333x .r337-log{margin:6px 0 0;padding:0;list-style:none;font-size:12.5px;line-height:1.5}
.fbx.r333x .r337-log li{padding:2px 0}
.fbx.r333x .r337-log time{color:var(--f-ink3,#6c6579);margin-right:6px}
.fbx.r333x .r337-keys{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;margin-top:14px}
@media (max-width:620px){.fbx.r333x .r337-facts{grid-template-columns:repeat(2,minmax(0,1fr))}}
/* the folder's repository card on the Folders page: Folders' own card and rows */
#page-folders .r337-repo .r337-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:8px 0 10px}
#page-folders .r337-repo .r337-facts > div{padding:8px 10px;border-radius:11px;background:rgba(106,63,181,.05);box-shadow:inset 0 1px 2px rgba(40,22,68,.10)}
body[data-theme="night"] #page-folders .r337-repo .r337-facts > div{background:rgba(255,255,255,.04);box-shadow:inset 0 1px 2px rgba(0,0,0,.4)}
#page-folders .r337-repo .r337-facts b{display:block;font-size:13.5px;overflow-wrap:anywhere}
#page-folders .r337-repo .r337-facts small{display:block;font-size:11px;opacity:.75}
#page-folders .r337-log{margin:8px 0 0;padding:0;list-style:none;font-size:12.5px;line-height:1.5}
#page-folders .r337-log time{opacity:.7;margin-right:6px}
@media (max-width:760px){#page-folders .r337-repo .r337-facts{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p337"]="started";}catch(_){}
(function r337(){"use strict";
if(window.__r337)return;window.__r337=1;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function toast(t){try{ingToast(t);}catch(e){}}
function save(){try{saveState();}catch(e){}}
function day(t){try{return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}
function UI(){return (W.IngRepoWork&&IngRepoWork.ui)||null;}
/* the gift and demo editions have no Fabrica (editions.py): there only the folder in Code is kept, and its key opens the folder */
function FAB(){try{return typeof ING_HAS!=="function"||ING_HAS("fabrica");}catch(e){return false;}}

/* ---------------------------------------------------------------- an app's name, its folder, its repository */
function norm(n){return String(n||"").toLowerCase().replace(/^the\s+/,"").replace(/\s+/g," ").trim();}
function folders(){try{return W.IngFolders&&typeof IngFolders.folders==="function"?IngFolders.folders():[];}catch(e){return [];}}
function folderOf(name){var n=norm(name);if(!n)return null;return folders().filter(function(p){return norm(p.name)===n;})[0]||null;}
function repos(){try{return (W.fbHubHost&&fbHubHost.C&&fbHubHost.C.repos)||[];}catch(e){return [];}}
function repoList(){return typeof IngRepo!=="undefined"&&IngRepo.list?Promise.resolve(IngRepo.list()).catch(function(){return repos();}):Promise.resolve(repos());}
function repoOf(name){var n=norm(name);return repoList().then(function(rs){return (rs||[]).filter(function(r){return norm(r.name)===n;})[0]||null;});}
function curChat(){try{return W.curChat();}catch(e){return null;}}
function isCode(c){try{return !!(c&&(c.kind==="code"||(typeof W.ccIsCode==="function"&&W.ccIsCode(c))));}catch(e){return false;}}
function projOf(c){try{return c&&c.projectId&&typeof W.projById==="function"?W.projById(c.projectId):null;}catch(e){return null;}}
/* the app a conversation is about: a Code session's app (Fabrica's, or the project's name), or the folder a conversation is in */
function appOfChat(c){var p=projOf(c);if(!p)return null;if(p.kind==="app"&&p.app)return p.name;if(p.fab&&p.fab.name)return p.fab.name;return p.app?p.name:null;}

/* ---------------------------------------------------------------- 5. the folder in Code */
/* r208's chatSystemPrompt asks this for a project that is not a folder: a Code session's project gives the folder of its app */
W.IngCodeFolder=function(p){try{if(!p||p.kind==="app")return null;var c=curChat();if(!isCode(c))return null;var n=p.fab&&p.fab.name?p.fab.name:p.name;return folderOf(n);}catch(e){return null;}};
function openFolder(f){try{var s=W.state;if(!s.folders||typeof s.folders!=="object")s.folders={how:"",ui:{}};if(!s.folders.ui)s.folders.ui={};s.folders.ui.open=f.id;save();}catch(e){}
  try{W.go("folders");}catch(e){}try{IngFolders.paint();}catch(e){}}
function makeFolder(name){var f=null;try{f=IngFolders.make(name);}catch(e){}if(f){save();toast("A folder for "+name+" is made: its notes go with every Code session on it.");}return f;}
function codeKey(){var c=curChat(),host=$("ccCodeBar")||$("ccpKeys");var k=$("r337Folder");  /* Code's top row, where r333's and r219's keys stand */
  if(!isCode(c)){if(k)k.hidden=true;return;}
  var name=appOfChat(c);if(!name){if(k)k.hidden=true;return;}
  if(!k){if(!host)return;k=mk("button","chat-top-key");k.id="r337Folder";k.type="button";host.appendChild(k);}
  var f=folderOf(name);k.hidden=false;k.textContent=f?"Its folder":"Make its folder";k.title=f?(name+": its folder's notes go with this session. Press for all of it in one place."):("No folder for "+name+" yet: make one, and its notes go with every session on it.");
  k.onclick=function(){var f2=folderOf(name);if(!f2){f2=makeFolder(name);if(!f2)return;codeKey();}if(FAB())openView(name);else openFolder(f2);};}

/* ---------------------------------------------------------------- 6. Folders and Fabrica, both ways */
/* the dated lines Fabrica writes into a folder's Where we left off (kept on the folder: p.app.log, the newest first, twenty at most) */
function logLine(name,t){var f=folderOf(name);if(!f||!f.app)return false;var L=f.app.log=Array.isArray(f.app.log)?f.app.log:[];
  if(L.length&&L[0].t===t)return false;L.unshift({at:Date.now(),t:String(t).slice(0,240)});if(L.length>20)L.length=20;save();try{if(W.IngFolders)IngFolders.paint();}catch(e){}return true;}
W.IngFolderFab={
  /* r208's contextFor asks for these: the lines go with the folder's notes */
  lines:function(p){var L=p&&p.app&&p.app.log;if(!L||!L.length)return "";return "What happened in Fabrica, newest first (written by Fabrica as it happened):\n"+L.slice(0,12).map(function(x){return "- "+day(x.at)+": "+x.t;}).join("\n");},
  /* r208's Where we left off card asks for this: the lines under the summary */
  left:function(p,card){var L=p&&p.app&&p.app.log;if(!L||!L.length)return;var ul=mk("ul","r337-log");L.slice(0,6).forEach(function(x){var li=mk("li");var tm=mk("time",null,day(x.at));li.appendChild(tm);li.appendChild(D.createTextNode(x.t));ul.appendChild(li);});card.appendChild(ul);},
  /* r208's folder view asks for this: the repository card, after Where we left off */
  card:function(p,host,ui){if(!FAB())return;var c=ui.card("Its repository in Fabrica",null);c.classList.add("r337-repo");c.id="r337Repo";host.appendChild(c);
    var note=mk("p","small muted","Looking for "+p.name+" in Fabrica…");c.appendChild(note);
    facts(p.name).then(function(x){note.remove();
      if(!x){c.appendChild(mk("p","small muted","Fabrica keeps no app named "+p.name+" yet. Bring its files into Fabrica, or open it in Code from Fabrica, and its repository shows here."));
        var r=mk("div","fld-row");r.appendChild(ui.key("","Open Fabrica",function(){try{W.go("fabrica");}catch(e){}}));c.appendChild(r);return;}
      c.appendChild(factsEl(x));
      var r2=mk("div","fld-row");r2.appendChild(ui.key("primary","All in one place",function(){openView(p.name);}));
      r2.appendChild(ui.key("","Open in Fabrica",function(){openFab(x.repo.id);}));r2.appendChild(ui.key("","Open in Code",function(){openCode(x.repo.id);}));c.appendChild(r2);});}};
/* what a repository is now: its branch, its newest version, its open pull requests, its last run, its releases */
function facts(name){return repoOf(name).then(function(r){if(!r)return null;
  return Promise.all([Promise.resolve(IngRepo.info(r.id)).catch(function(){return {};}),Promise.resolve(IngRepo.log(r.id,{max:1})).catch(function(){return [];}),
      (W.fbHub&&fbHub.record?Promise.resolve(fbHub.record(r.id)).catch(function(){return {};}):Promise.resolve({}))])
    .then(function(a){var info=a[0]||{},top=(a[1]||[])[0]||null,rec=a[2]||{};var pulls=(rec.pulls||[]).filter(function(x){return x.state==="open";});
      var runs=(rec.runs||[]).slice().sort(function(x,y){return (+y.at||0)-(+x.at||0);});
      return {repo:r,branch:info.branch||(info.detached?"a version of its own":"no branch yet"),top:top,pulls:pulls,run:runs[0]||null,tags:info.tags||[]};});});}
function factsEl(x){var g=mk("div","r337-facts");function cell(big,small){var d=mk("div");d.appendChild(mk("b",null,big));d.appendChild(mk("small",null,small));g.appendChild(d);}
  cell(x.branch,"the branch it is on");cell(x.top?(x.top.title||x.top.short):"none yet",x.top?("newest version, "+day(x.top.when)):"no version kept");
  cell(String(x.pulls.length),x.pulls.length===1?"pull request open":"pull requests open");
  /* a run of the checks (r141's record: ok, at, title, ref) */
  cell(x.run?(x.run.ok?"passed":"failed"):"none yet",x.run?("last run of the checks, "+day(x.run.at)):"no run of the checks yet");return g;}
function openFab(id){try{W.go("fabrica");}catch(e){}setTimeout(function(){try{var h=W.fbHubHost;if(h){h.FBS().sel=id;h.S.home=false;h.S.appPg=id;h.saveSoon();if(W.fbRender)W.fbRender();}}catch(e){}},300);}
/* Code on the app, on the branch it is on, as Code's start window does it (r333's openFab: the work goes to a branch of its own) */
function openCode(id){if(!W.IngRepoWork||typeof IngRepoWork.openFab!=="function"){try{W.go("fabrica");}catch(e){}return;}
  Promise.resolve(IngRepo.info(id)).then(function(i){return IngRepoWork.openFab(id,(i&&i.branch)||undefined);},function(){return IngRepoWork.openFab(id);});}
/* a conversation or a Code session opened as the conversation menu opens one */
function openConv(c){try{W.go(isCode(c)?"code":"chat");}catch(e){}
  try{W.state.activeChat=c.id;if(isCode(c)){W.ccState().activeCode=c.id;W.ccState().project=c.projectId;}else W.ccState().activeChat=c.id;save();W.renderChat();}catch(e){}}
function openAdamas(id){if(typeof W.bdOpenRepo==="function")return W.bdOpenRepo(id);toast("Adamas opens an app from Fabrica with its Open an app key.");try{W.go("build");}catch(e){}}
/* Fabrica writes as it happens: a pull request merged or closed, a run that failed, a release made (a tag). What each app's record held
   when it was first seen here is not news; only what changes after is written. A merge is followed where Fabrica makes it (IngRepo.merge,
   which a pull request's Merge calls), and the record is read again just after; runs are read every ten seconds while any are kept. */
var SEEN={};
function nameOf(id){var r=repos().filter(function(x){return x.id===id;})[0];return r?r.name:null;}
function nameFor(id){var n=nameOf(id);if(n)return Promise.resolve(n);return Promise.resolve(IngRepo.info(id)).then(function(i){return i&&i.name;},function(){return null;});}
function look(id,quiet){if(!W.fbHub||typeof fbHub.live!=="function")return Promise.resolve();return Promise.all([Promise.resolve(fbHub.live(id)),nameFor(id)]).then(function(a){var rec=a[0];if(!rec)return;
    var s=SEEN[id],base=!s||quiet;s=SEEN[id]=s||{p:{},r:{}};var name=rec.name||a[1];
    s.r=s.r||{};(rec.runs||[]).forEach(function(r){var seen=s.r[r.n];s.r[r.n]=1;if(base||seen||!name||r.ok)return;
      logLine(name,"The checks failed on "+(r.title||r.short||"a version")+(r.ref?" ("+r.ref+")":"")+".");});
    (rec.pulls||[]).forEach(function(p){var was=s.p[p.n];s.p[p.n]=p.state;if(base||was===p.state||!name)return;
      if(p.state==="merged")logLine(name,"Pull request #"+p.n+", "+(p.title||"untitled")+", merged into "+(p.to||"its branch")+".");
      else if(p.state==="closed")logLine(name,"Pull request #"+p.n+", "+(p.title||"untitled")+", closed without merging.");});},function(){});}
function baseline(){return repoList().then(function(rs){return Promise.all((rs||[]).map(function(r){return SEEN[r.id]?null:look(r.id,true);}));});}
function watchMerge(){if(typeof IngRepo==="undefined"||IngRepo.__r337m||typeof IngRepo.merge!=="function")return;IngRepo.__r337m=1;var om=IngRepo.merge;
  IngRepo.merge=function(id){var args=arguments;var before=SEEN[id]?Promise.resolve():look(id,true);
    return before.then(function(){return om.apply(IngRepo,args);}).then(function(v){setTimeout(function(){look(id);},900);setTimeout(function(){look(id);},3000);return v;});};}
var RUNSEEN=null,runAt=0;
function watchRuns(){if(!W.IngRuns||typeof IngRuns.list!=="function"||Date.now()-runAt<10000)return;runAt=Date.now();
  Promise.resolve(IngRuns.list()).then(function(list){list=list||[];var first=RUNSEEN===null;RUNSEEN=RUNSEEN||{};
    list.forEach(function(r){var k=r.id||r.n||r.at;var st=String(r.state||r.status||r.result||"");var was=RUNSEEN[k];RUNSEEN[k]=st;if(first||was===st)return;
      if(/fail|error/i.test(st)){var nm=r.app||r.repo&&nameOf(r.repo)||r.name;if(nm)logLine(nm,"A run failed"+(r.workflow?" ("+r.workflow+")":"")+(r.ref?" on "+r.ref:"")+".");}});},function(){});}
function watchTags(){if(typeof IngRepo==="undefined"||IngRepo.__r337t||typeof IngRepo.tag!=="function")return;IngRepo.__r337t=1;var ot=IngRepo.tag;
  IngRepo.tag=function(id,name){var args=arguments;return Promise.resolve(ot.apply(IngRepo,args)).then(function(v){
    nameFor(id).then(function(nm){if(nm)logLine(nm,"Release "+name+" made.");});return v;});};}
W.IngFolderFab.look=look;

/* ---------------------------------------------------------------- 7. one view of an app */
function openView(name){var ui=UI();if(!ui){openFolderBy(name);return;}
  var f=folderOf(name),sh=ui.fsheet(name+": all in one place","Its folder, its repository, its releases and its conversations, together.");
  function sec(t){var s=mk("div","r337-sec");s.appendChild(mk("h4",null,t));sh.box.appendChild(s);return s;}
  var s1=sec("Where we left off");
  if(f&&f.app){var a=f.app;s1.appendChild(mk("div","r337-brief",a.brief||"No summary yet: bring it up to date on the Folders page."));
    if(a.log&&a.log.length){var ul=mk("ul","r337-log");a.log.slice(0,5).forEach(function(x){var li=mk("li");li.appendChild(mk("time",null,day(x.at)));li.appendChild(D.createTextNode(x.t));ul.appendChild(li);});s1.appendChild(ul);}}
  else s1.appendChild(mk("p","f-note","No folder for "+name+" yet. Make one, and its notes go with every conversation and Code session on it."));
  var s2=sec("Its repository");var wait=mk("p","f-note","Looking in Fabrica…");s2.appendChild(wait);
  var s3=sec("Its releases");var s4=sec("Its conversations");
  var cv=[];try{cv=(W.state.chats||[]).filter(function(c){var n=appOfChat(c);return n&&norm(n)===norm(name);});}catch(e){}
  if(!cv.length)s4.appendChild(mk("p","f-note","None yet."));
  else{var L=mk("div","r333-list");cv.slice(0,6).forEach(function(c){L.appendChild(ui.fopt(isCode(c)?"‹›":"✦",c.title||"A conversation",(isCode(c)?"Code":"Chat")+(c.updated||c.made?", "+day(c.updated||c.made):""),function(){sh.close();openConv(c);}));});s4.appendChild(L);}
  var keys=mk("div","r337-keys");sh.box.appendChild(keys);
  facts(name).then(function(x){wait.remove();
    if(!x){s2.appendChild(mk("p","f-note","Fabrica keeps no app named "+name+" yet."));s3.appendChild(mk("p","f-note","None yet."));}
    else{s2.appendChild(factsEl(x));
      if(x.tags.length){var tl=mk("p","f-note",x.tags.slice(-6).reverse().join(" · "));s3.appendChild(tl);}else s3.appendChild(mk("p","f-note","No release made yet: a release is a version Fabrica tags and ships."));}
    keys.appendChild(ui.fbtn("",f?"Open the folder":"Make its folder",function(){sh.close();var g=folderOf(name)||makeFolder(name);if(g)openFolder(g);}));
    if(x){keys.appendChild(ui.fbtn("","Open in Fabrica",function(){sh.close();openFab(x.repo.id);}));keys.appendChild(ui.fbtn("","Open in Adamas",function(){sh.close();openAdamas(x.repo.id);}));
      keys.appendChild(ui.fbtn("pri","Open in Code",function(){sh.close();openCode(x.repo.id);}));}
    else keys.appendChild(ui.fbtn("pri","Start a conversation",function(){sh.close();var g=folderOf(name);try{if(g&&W.IngFolders&&typeof IngFolders.start==="function")IngFolders.start(g);else W.go("chat");}catch(e){}}));});}
function openFolderBy(name){var f=folderOf(name);if(f)openFolder(f);}
W.IngAppView={open:openView,facts:facts,folderOf:folderOf,log:logLine};

/* ---------------------------------------------------------------- the ways in: Folders, Fabrica, Code, Chat, Adamas */
function dressFolders(){var pg=$("page-folders");if(!pg)return;var hd=pg.querySelector(".fld-h");if(!hd||hd.querySelector(".r337-all"))return;
  var nm=(pg.querySelector(".fld-here")||{}).textContent;if(!nm)return;var k=mk("button","btn small r337-all","All in one place");k.type="button";k.onclick=function(){openView(nm);};hd.appendChild(k);}
function dressFabrica(){var pg=$("fbAppPg");if(!pg)return;var ks=pg.querySelector(".f-hero .ks");if(!ks||ks.querySelector(".r337-all"))return;var nm=(pg.querySelector(".f-hero .nm")||{}).textContent;if(!nm)return;
  var b=mk("button","f-btn r337-all","All in one place");b.type="button";b.onclick=function(){openView(nm);};ks.insertBefore(b,ks.firstChild);}
function dressChat(){var c=curChat();var k=$("r337Chat");var p=projOf(c);var ok=!isCode(c)&&p&&p.kind==="app"&&p.app;var host=D.querySelector("#page-chat .chat-top");
  if(!ok){if(k)k.hidden=true;return;}if(!k){if(!host)return;k=mk("button","chat-top-key");k.id="r337Chat";k.type="button";var ctl=$("chatCtlBtn");if(ctl&&ctl.parentNode===host)host.insertBefore(k,ctl);else host.appendChild(k);}  /* Chat's own top row, beside Controls */
  k.hidden=false;k.textContent="All of "+p.name;k.title=p.name+": its folder, its repository, its releases and its conversations, in one place";k.onclick=function(){openView(p.name);};}
function dressAdamas(){var d=null;try{d=W.state.buildDoc;}catch(e){}var bar=$("runBtn")&&$("runBtn").parentNode;var k=$("r337Adamas");
  var r=d&&d.repo?repos().filter(function(x){return x.id===d.repo;})[0]:null;
  if(!r||!bar){if(k)k.hidden=true;return;}if(!k){k=mk("button","btn small");k.id="r337Adamas";k.type="button";bar.appendChild(k);}
  k.hidden=false;k.textContent="All in one place";k.onclick=function(){openView(r.name);};}
function tick(){try{codeKey();}catch(e){}if(!FAB())return;try{dressChat();}catch(e){}try{dressFolders();}catch(e){}try{dressAdamas();}catch(e){}}
(W.fbAfterPaint=W.fbAfterPaint||[]).push(function(){try{dressFabrica();}catch(e){}});
/* the folder's head keeps its key each time Folders draws itself again */
(function(){var F=W.IngFolders;if(!F||typeof F.paint!=="function"||F.paint.__r337)return;var op=F.paint;F.paint=function(){var r=op.apply(this,arguments);setTimeout(function(){try{dressFolders();}catch(e){}},0);return r;};F.paint.__r337=1;})();
var og=W.go;if(typeof og==="function"&&!og.__r337){W.go=function(){var r=og.apply(this,arguments);setTimeout(tick,60);return r;};W.go.__r337=1;}
(function start(){var n=0;(function wait(){if(W.__ingReady===true){if(!FAB()){tick();setInterval(tick,1500);return;}watchMerge();watchTags();baseline();tick();setInterval(function(){tick();watchRuns();},1500);
      setInterval(function(){repoList().then(function(rs){(rs||[]).slice(0,40).forEach(function(r){look(r.id);});});},15000);return;}if(++n<600)setTimeout(wait,500);})();})();
})();
;try{window.__ingParts["p337"]="running";}catch(_){}
</script>
