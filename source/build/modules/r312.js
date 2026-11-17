<style id="r312-css">
/* ============ R312 · ONE WORKSHOP: CHAT AND CODE SEND THEIR APPS TO FABRICA AND ADAMAS, AND CODE OPENS FABRICA'S APPS (Ingenium 7.27, 17 November 2026) ============
   Her words (16 November 2026): "I want to be able to send the apps that I am working on straight from Ingeniun's chat or coding to
   Fabrica or Adamas so that I can commit and ship it as an app. I want the option to connect a repository from GitHub the same way that
   I do on Claude but I also want to be able to connect to Fabrica's repositories as well and have it built into Ingenium. I want Ingenium
   to wort as one ecosystem and have it all be integrated seamlessly to facilitate working on the app and further enhance its overall
   performance." And (17 November 2026), of a preview that redrew a page: "I am not interested in changing its look for a new design".
   Found before (read in the code): Chat's app card had Run, Save page and Make it an app (to Adamas), nothing to Fabrica; Code's start
   window offered a new app, a file, a folder, the app library and From GitHub (modules/r219.js: a branch, commit and push, a pull
   request), not Fabrica's own repositories; Fabrica opened an app in Code (r112 openInCode, linked both ways) but what Code changed went
   back only when Fabrica was opened on that app again, and Code had no key to send it; Adamas kept a Fabrica page with Keep in Fabrica.
   Built with Ingenium's own parts only (Chat's card keys and their icons, Code's start cards, its list rows and top keys, the + menu's
   rows, the asking sheet's field and keys), so nothing new is drawn:
   - Chat's app card: Keep in Fabrica, after Make it an app. A sheet asks where: a new app in Fabrica (its name from the page's title) or
     a new version of an app there, and in a few words what this version is; Keep it makes the version (a commit). Then: Open in
     Fabrica, Ship it (Fabrica's Ship part, for that app), Make it an app (Adamas, linked back to Fabrica).
   - Code's start window: From Fabrica, beside From GitHub: one of the apps in Fabrica, opened as Fabrica's own Open it in Code does (the
     same files, linked both ways).
   - A Code session on an app: Keep in Fabrica and Make it an app among its top keys. Keep in Fabrica sends what changed to the app it
     is linked to (or makes a new app there, and links it) and keeps it as a version; Make it an app opens its page in Adamas.
   - Chat's + menu: Fabrica's apps, after One of your apps: an app's page goes with the next message, as one of your apps does.
   Only where Fabrica is (its page in the edition). Nothing is sent anywhere: all of it stays on this device. */
.r312 .cc-plist{display:flex;flex-direction:column;gap:6px;max-height:min(46vh,340px);overflow:auto;margin:10px 0 12px}
.r312 .cc-prow[aria-pressed="true"]{background:var(--accent-soft);box-shadow:inset 0 0 0 1.5px var(--accent)}
.r312 .r312-l{display:block;font-size:12.5px;color:var(--ink-3);margin:8px 0 4px}
.r312 .r312-done{margin:6px 0 10px;font-size:14px;line-height:1.5}
.r312 [hidden]{display:none !important}
:root{--mk-i-fab:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='6' cy='5' r='2.2'/%3E%3Ccircle cx='6' cy='19' r='2.2'/%3E%3Ccircle cx='18' cy='9' r='2.2'/%3E%3Cpath d='M6 7.2v9.6M18 11.2c0 3.6-4.5 3.9-9.9 5.4'/%3E%3C/svg%3E")}
[data-mk-k="fab"]{--mk-i:var(--mk-i-fab)}
</style>
<script>
/* R312 (7.27): one workshop. See the note at the top of its styles. */
(function(){var W=window,D=document;if(W.IngWorkshopLinks)return;
function $(id){return D.getElementById(id);}
function mk(t,c,s){var e=D.createElement(t);if(c)e.className=c;if(s!=null)e.textContent=s;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);}catch(e){}}
function warn(e){try{console.error("R312",e);}catch(_){}}
function here(){return !!($("page-fabrica")&&W.IngRepo);}
function H(){return W.fbHubHost||null;}
function links(){var h=H();if(!h)return null;var f=h.FBS();f.links=f.links||{};f.linksBack=f.linksBack||{};return f;}
function link(repoId,pid){var f=links();if(!f||!pid)return;f.links[repoId]=pid;f.linksBack[pid]=repoId;try{H().saveSoon();}catch(e){}}
function stale(){var h=H();if(!h)return;try{h.C.log={};h.C.diff={};h.C.files={};}catch(e){}try{if($("page-fabrica").classList.contains("active"))h.refresh().then(function(){h.paint();});}catch(e){}}
function titleOf(html,fb){var t="";try{t=typeof W.csTitleOf==="function"?W.csTitleOf(html,""):"";}catch(e){}
  if(!t){var m=/<title[^>]*>([^<]{1,120})<\/title>/i.exec(String(html||""));t=m?m[1].trim():"";}return t||fb||"My app";}
function mainOf(list){var p=(list.filter(function(f){return /\.html?$/i.test(f.path)&&f.path.indexOf("/")<0;})[0]||list.filter(function(f){return /\.html?$/i.test(f.path);})[0]||{}).path;return p||"";}
function same(a,b){return String(a||"").trim().toLowerCase()===String(b||"").trim().toLowerCase();}

/* ---------- the sheet: where it is kept, and in a few words what this version is ---------- */
function keepSheet(o){if(!here()){toast("Fabrica is not in this copy of Ingenium.");return;}
  IngRepo.list().then(function(rs){rs=rs||[];
    var box=W.modalOpen('<div class="ing-ask r312" id="r312Sheet"><h3>Keep it in Fabrica</h3><p>Fabrica keeps it with every version, ready to test and to ship as an app for your devices. Nothing leaves this device.</p>'+
      '<div class="cc-plist" id="r312List" role="list"></div>'+
      '<label class="r312-l" id="r312NameL" for="r312Name">Its name in Fabrica</label><input type="text" class="ing-ask-in" id="r312Name" maxlength="80">'+
      '<label class="r312-l" for="r312Msg">What this version is, in a few words</label><input type="text" class="ing-ask-in" id="r312Msg" maxlength="200">'+
      '<div class="ing-ask-keys"><button class="btn ghost" type="button" id="r312X">Cancel</button><button class="btn primary" type="button" id="r312Go">Keep it</button></div></div>');
    var list=box.querySelector("#r312List"),nm=box.querySelector("#r312Name"),msg=box.querySelector("#r312Msg"),nl=box.querySelector("#r312NameL"),go=box.querySelector("#r312Go");
    var choice=null,rows=[];
    function row(k,title,sub){var b=mk("button","cc-prow");b.type="button";b.setAttribute("data-k",k);b.setAttribute("aria-pressed","false");b.appendChild(mk("b",null,title));b.appendChild(mk("span","small muted",sub));
      b.onclick=function(){pick(k);};list.appendChild(b);rows.push(b);return b;}
    function pick(k){choice=k;rows.forEach(function(b){b.setAttribute("aria-pressed",String(b.getAttribute("data-k")===k));});var isNew=k==="new";nm.hidden=!isNew;nl.hidden=!isNew;
      go.textContent=isNew?"Keep it as a new app":"Keep it as a new version";}
    row("new","A new app in Fabrica","Its first version, under the name below");
    rs.forEach(function(r){row(r.id,"A new version of "+r.name,o.linked===r.id?"Linked to this work: what changed goes there":"Its page replaced by this one");});
    nm.value=o.title||"My app";msg.value=o.msg||"";
    var pre=o.linked&&rs.some(function(r){return r.id===o.linked;})?o.linked:(rs.filter(function(r){return same(r.name,o.title);})[0]||{}).id||"new";pick(pre);
    box.querySelector("#r312X").onclick=function(){W.closeModal();};
    msg.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();go.click();}});
    go.onclick=function(){var m=msg.value.trim()||o.msg||"A new version";var n=nm.value.trim()||o.title||"My app";go.disabled=true;go.textContent="Keeping it…";
      keep(o,choice,n,m).then(function(res){stale();done(box,o,res);},function(e){go.disabled=false;pick(choice);toast("Fabrica did not keep it: "+(e&&e.message||e));});};
    setTimeout(function(){try{msg.focus();msg.select();}catch(e){}},60);}).catch(warn);}
function keep(o,choice,name,m){
  if(choice==="new")return IngRepo.fromFiles(o.files,{name:name,msg:m}).then(function(r){if(o.project)link(r.id,o.project.id);return {id:r.id,name:name,oid:r.commit,main:o.main||mainOf(o.files),fresh:true,msg:m};});
  return IngRepo.list().then(function(rs){var r=rs.filter(function(x){return x.id===choice;})[0];if(!r)throw new Error("that app is no longer in Fabrica");
    var put;
    if(o.project&&o.linked===r.id&&typeof W.fbSync==="function")put=W.fbSync(r);  /* Fabrica's own way back from Code: the files that changed */
    else if(o.project)put=IngRepo.putMany(r.id,o.files).then(function(){link(r.id,o.project.id);});
    else put=IngRepo.files(r.id).then(function(list){var p=mainOf(list)||"index.html";o.main=p;return IngRepo.putMany(r.id,[{path:p,data:o.files[0].data}]);});
    return Promise.resolve(put).then(function(){return IngRepo.commit(r.id,m);}).then(function(oid){return {id:r.id,name:r.name,oid:oid,main:o.main||"",msg:m};},
      function(e){if(/nothing has changed/i.test(String(e&&e.message||e)))return {id:r.id,name:r.name,oid:null,main:o.main||"",msg:m,same:true};throw e;});});}
function done(box,o,res){var w=box.querySelector("#r312Sheet");if(!w)return;
  w.innerHTML='<h3>Kept in Fabrica</h3><p class="r312-done"></p><div class="ing-ask-keys"></div>';
  w.querySelector("p").textContent=res.same?(res.name+" in Fabrica already holds this as it is: nothing new to keep."):(res.name+(res.fresh?", a new app in Fabrica: ":", a new version: ")+res.msg+(res.oid?" ("+String(res.oid).slice(0,7)+")":"")+". Test it and ship it from there.");
  var k=w.querySelector(".ing-ask-keys");
  function key(t,cls,fn){var b=mk("button","btn "+cls,t);b.type="button";b.onclick=fn;k.appendChild(b);return b;}
  key("Close","ghost",function(){W.closeModal();});
  key("Make it an app","",function(){W.closeModal();toAdamas(res.id,res.name);});
  key("Open in Fabrica","",function(){W.closeModal();openFab(res.id,false);});
  key("Ship it","primary",function(){W.closeModal();openFab(res.id,true);}).focus();
  toast(res.same?"Already kept in Fabrica.":"Kept in Fabrica: "+res.name+".");}
function openFab(id,ship){var h=H();if(!h)return;try{h.FBS().sel=id;h.saveSoon();}catch(e){}try{W.go("fabrica");}catch(e){}
  /* Fabrica's parts follow the app's step when the app on show changes (thoughts/fabrica_rooms.html, stepFollow), which happens after
     it opens: the Ship part is pressed again until Fabrica has settled with it chosen */
  var n=0;function settle(){n++;try{h.FBS().sel=id;if(n===1)h.paint();if(ship){if(h.one&&h.one())h.setPanel("ship");var t=$("fbPart_ship");if(t&&t.getAttribute("aria-selected")!=="true")t.click();}}catch(e){warn(e);}
    if(ship&&n<9)setTimeout(settle,400);}
  setTimeout(settle,500);}
function toAdamas(id,name){if(!W.IngBuild)return;IngRepo.files(id).then(function(list){var p=mainOf(list);if(!p)throw new Error("there is no page in it");
    return IngRepo.readText(id,p).then(function(t){W.IngBuild.open({name:p.split("/").pop(),text:t||"",repo:id,path:p,title:name});try{if(W.IngRooms)W.IngRooms.open("build","page");}catch(e){}});})
  .catch(function(e){toast("Adamas could not open it: "+(e&&e.message||e));});}

/* ---------- 1. Chat's app card: Keep in Fabrica, after Make it an app ---------- */
function wrapCard(){var o=W.mkAppActs;if(typeof o!=="function"||o.__r312)return;
  var f=function(mm,html){var row=o.apply(this,arguments);try{if(here()&&row&&!row.querySelector(".r312-keep")){var b=mk("button","msg-act r312-keep","Keep in Fabrica");b.type="button";
      b.title="Keep it in Fabrica with every version, then test it and ship it as an app for your devices";
      b.onclick=function(){keepSheet({from:"Chat",title:titleOf(html,"My app"),files:[{path:"index.html",data:String(html||"")}],main:"index.html",msg:"Made in Chat: "+titleOf(html,"the page")});};
      var after=[].filter.call(row.children,function(x){return x.textContent.trim()==="Make it an app";})[0];
      if(after&&after.nextSibling)row.insertBefore(b,after.nextSibling);else row.appendChild(b);}}catch(e){warn(e);}return row;};
  try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}f.__r312=1;W.mkAppActs=f;try{mkAppActs=f;}catch(e){}
  try{if(W.MK_LK)W.MK_LK["Keep in Fabrica"]="fab";else if(typeof MK_LK!=="undefined")MK_LK["Keep in Fabrica"]="fab";}catch(e){}}

/* ---------- 2. Code's start window: From Fabrica, beside From GitHub ---------- */
function fabPicker(){IngRepo.list().then(function(rs){rs=rs||[];
  var box=W.modalOpen('<div class="ing-ask r312"><h3>Open an app from Fabrica</h3><p>Its files open here as a project, linked to the app in Fabrica: Keep in Fabrica, among Code\'s keys, keeps what you change as a new version there.</p><div class="cc-plist" id="r312Apps"></div><div class="ing-ask-keys"><button class="btn ghost" type="button" id="r312AppsX">Close</button></div></div>');
  box.querySelector("#r312AppsX").onclick=function(){W.closeModal();};var host=box.querySelector("#r312Apps");
  if(!rs.length)host.appendChild(mk("div","small muted","No apps in Fabrica yet. Start one there, or keep one from Chat or Code with Keep in Fabrica."));
  rs.forEach(function(r){var b=mk("button","cc-prow");b.type="button";b.appendChild(mk("b",null,r.name));b.appendChild(mk("span","small muted",(r.branch?r.branch+" · ":"")+(r.files!=null?r.files+(r.files===1?" file":" files"):"")));
    b.onclick=function(){if(typeof W.fbOpenInCode!=="function"){toast("Fabrica is not in this copy of Ingenium.");return;}W.closeModal();W.fbOpenInCode(r);};host.appendChild(b);});}).catch(warn);}
function wrapWelcome(){var o=W.ccWelcome;if(typeof o!=="function"||o.__r312)return;
  var f=function(){var r=o.apply(this,arguments);try{var st=D.querySelector("#modalBox .cc-start");if(st&&here()&&!st.querySelector('[data-a="fabrica"]')){
      var b=mk("button","cc-card");b.type="button";b.setAttribute("data-a","fabrica");b.innerHTML="<b>From Fabrica</b><span>One of your apps in Fabrica, with every version: what you change here is kept there as a new version.</span>";
      b.onclick=function(){W.closeModal();setTimeout(fabPicker,0);};var gh=st.querySelector('[data-a="github"]');if(gh&&gh.nextSibling)st.insertBefore(b,gh.nextSibling);else st.appendChild(b);}}catch(e){warn(e);}return r;};
  try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}f.__r312=1;W.ccWelcome=f;try{ccWelcome=f;}catch(e){}}

/* ---------- 3. A Code session on an app: Keep in Fabrica and Make it an app, among its top keys ---------- */
function proj(){try{return typeof W.ccProj==="function"?W.ccProj():null;}catch(e){return null;}}
function linkedOf(pr){var f=links();return f&&pr?f.linksBack[pr.id]||null:null;}
function codeFiles(pr){return Promise.resolve(typeof W.ccLoadAll==="function"?W.ccLoadAll(pr):null).then(function(){
  return (pr.files||[]).filter(function(f){return typeof f.text==="string";}).map(function(f){return {path:f.name,data:f.text};});});}
function sessionTitle(){try{var c=typeof W.curChat==="function"?W.curChat():null;return c&&typeof W.chatTitle==="function"?W.chatTitle(c):"";}catch(e){return "";}}
function codeKeep(){var pr=proj();if(!pr)return;codeFiles(pr).then(function(files){if(!files.length){toast("This project has no files to keep yet.");return;}
  var m=typeof W.ccMain==="function"?W.ccMain(pr):null,t=sessionTitle();
  keepSheet({from:"Code",title:pr.name,files:files,main:m?m.name:mainOf(files),project:pr,linked:linkedOf(pr),msg:"Made in Code"+(t&&t!==pr.name?": "+t:"")});}).catch(warn);}
function codeAdamas(){var pr=proj();if(!pr||!W.IngBuild)return;codeFiles(pr).then(function(files){var m=typeof W.ccMain==="function"?W.ccMain(pr):null,p=m?m.name:mainOf(files),f=files.filter(function(x){return x.path===p;})[0];
  if(!f){toast("This project has no page to make an app of yet.");return;}
  var local=files.filter(function(x){return x.path!==p&&/\.(css|js|mjs|json|svg)$/i.test(x.path)&&f.data.indexOf(x.path.split("/").pop())>=0;});
  if(local.length){toast("Adamas makes an app of one page; this one also uses "+local.map(function(x){return x.path;}).slice(0,3).join(", ")+". Keep it in Fabrica and ship it from there: Fabrica makes apps of every file.");codeKeep();return;}
  W.IngBuild.open({name:p.split("/").pop(),text:f.data,repo:linkedOf(pr)||"",path:p,title:pr.name});try{if(W.IngRooms)W.IngRooms.open("build","page");}catch(e){}}).catch(warn);}
function codeKeys(){var cb=$("ccCodeBar");if(!cb||cb.hidden||!here())return;var pr=proj();if(!pr||cb.querySelector(".r312-k"))return;
  var lk=linkedOf(pr);
  var k1=mk("button","chat-top-key r312-k","Keep in Fabrica");k1.type="button";k1.title=lk?"Keep what changed as a new version of the app in Fabrica":"Keep this app in Fabrica, with every version";k1.onclick=codeKeep;
  var k2=mk("button","chat-top-key r312-k","Make it an app");k2.type="button";k2.title="Open its page in Adamas, where it becomes an app for your devices";k2.onclick=codeAdamas;
  cb.appendChild(k1);cb.appendChild(k2);}
function wrapHead(){var o=W.ccPaintHead;if(typeof o!=="function"||o.__r312)return;
  var f=function(){var r=o.apply(this,arguments);try{codeKeys();}catch(e){warn(e);}return r;};
  try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}f.__r312=1;W.ccPaintHead=f;try{ccPaintHead=f;}catch(e){}}

/* ---------- 4. Chat's + menu: Fabrica's apps, their page with the next message ---------- */
function attach(r,btn){if(btn)btn.disabled=true;IngRepo.files(r.id).then(function(list){var p=mainOf(list);if(!p)throw new Error("there is no page in it");
    return IngRepo.readText(r.id,p).then(function(t){if(typeof W.stageText!=="function")throw new Error("the chat cannot take it here");W.stageText(p.split("/").pop(),t||"",false);
      try{if(typeof W.closePlus==="function")W.closePlus();}catch(e){}toast(r.name+"'s page, from Fabrica, goes with your next message.");});})
  .catch(function(e){if(btn)btn.disabled=false;toast(r.name+": "+(e&&e.message||e));});}
function wrapPlus(){var o=W.paintPlus;if(typeof o!=="function"||o.__r312)return;
  var f=function(view){if(view==="fabrica"&&here()){var m=$("chatPlusMenu");if(!m)return;m.innerHTML="";var back=W.pmItem(m,null,"‹ Back","",function(){W.paintPlus();});back.classList.add("pm-back");
      var hold=mk("div");m.appendChild(hold);hold.appendChild(mk("div","ctx-note","Reading Fabrica…"));
      IngRepo.list().then(function(rs){hold.innerHTML="";rs=rs||[];if(!rs.length)hold.appendChild(mk("div","ctx-note","No apps in Fabrica yet."));
        rs.forEach(function(r){W.pmItem(hold,"file",r.name,"Fabrica · its page goes with your message",function(b){attach(r,b);});});}).catch(warn);return;}
    var res=o.apply(this,arguments);
    try{if(!view&&here()){var mm=$("chatPlusMenu");if(mm&&!mm.querySelector(".r312-pm")){var it=W.pmItem(mm,"file","One of your apps in Fabrica","Its page goes with your message",function(){W.paintPlus("fabrica");},'<span class="pm-arw">›</span>');it.classList.add("r312-pm");
        var after=[].filter.call(mm.querySelectorAll(".pm-item"),function(b){return /One of your apps/.test(b.textContent)&&b!==it;})[0];if(after&&after.nextSibling)mm.insertBefore(it,after.nextSibling);}}}catch(e){warn(e);}
    return res;};
  try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}f.__r312=1;W.paintPlus=f;try{paintPlus=f;}catch(e){}}

function boot(){try{wrapCard();}catch(e){warn(e);}try{wrapWelcome();}catch(e){warn(e);}try{wrapHead();}catch(e){warn(e);}try{wrapPlus();}catch(e){warn(e);}}
boot();if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);
(function later(){var n=0;(function wait(){if(W.__ingReady===true){boot();return;}if(++n<400)setTimeout(wait,500);})();})();
W.IngWorkshopLinks={keep:keepSheet,openFab:openFab,toAdamas:toAdamas,picker:fabPicker};})();
</script>
