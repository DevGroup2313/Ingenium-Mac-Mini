<style id="r393-css">
/* ============ R393 · RESTORE POINTS, ONE THING BROUGHT BACK, AND A BACKUP CHECKED (Ingenium 7.91, 25 November 2026) ============
   Stage 2 of the recommendations she approved (25 November 2026: "I approve of all your recommendations, please build them into the
   app"; then "proceed with stage 2: backups, restore points and Cloud"). Before, the recovery shelf kept three moments of the desk in the
   browser's small store, minutes apart, and a backup could only be checked by restoring it.
   Now, in Settings, Your data, Back up and move, under the backup's card:
   - Restore points: the whole desk (conversations, notes, folders and their notes, what Ingenium knows, settings) kept in this device's
     larger store, sealed with her lock when it is on, at the moments that matter: once a day, before a new version of Ingenium first
     opens, before a backup is restored or merged (this covers what Ingenium Cloud brings in, which merges as a backup does), and when she
     presses Keep a restore point now. The last 30 are kept, each with when, why and what it held.
   - Bring all of it back (the desk as it is now is kept as a restore point first), or bring back one thing: a conversation, an app's
     folder notes, or the facts Ingenium knew, without touching anything else.
   - Check a backup: the file is opened and every part's fingerprint checked, and what it holds is said, without changing anything. */
#rpCard{display:grid;gap:12px}
#rpCard .rp-list{list-style:none;margin:0;padding:0;display:grid;gap:8px}
#rpCard .rp-row{background:var(--card-hi,rgba(255,255,255,.6));border:1px solid var(--hairline,rgba(106,63,181,.16));border-radius:12px;padding:10px 12px;display:grid;gap:6px;
  box-shadow:0 2px 0 rgba(96,62,150,.14),0 6px 14px rgba(60,34,110,.08);transition:transform .2s cubic-bezier(.2,.9,.3,1.3),box-shadow .2s}
#rpCard .rp-row:hover{transform:translateY(-2px);box-shadow:0 4px 0 rgba(96,62,150,.14),0 10px 18px rgba(60,34,110,.14)}
#rpCard .rp-top{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between}
#rpCard .rp-top b{font-weight:600;color:var(--ink-1)}
#rpCard .rp-top small,#rpCard .rp-sum{font-size:12.5px;color:var(--ink-3)}
#rpCard .rp-acts{display:flex;flex-wrap:wrap;gap:8px}
#rpCard .rp-one{display:grid;gap:6px;margin-top:4px}
#rpCard .rp-one h5{margin:4px 0 0;font:600 11.5px/1.2 var(--sans,system-ui,sans-serif);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3)}
#rpCard .rp-item{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;font-size:13px;color:var(--ink-2);padding:6px 10px;border-radius:10px;transition:background .2s,transform .2s cubic-bezier(.2,.9,.3,1.3)}
#rpCard .rp-item:hover{background:rgba(106,63,181,.06);transform:translateX(3px)}
#rpCard .rp-check{display:grid;gap:8px;border-top:1px solid var(--hairline,rgba(106,63,181,.14));padding-top:12px}
#rpCard #rpPw{flex:0 1 300px;max-width:300px}
#rpCard .rp-out{font-size:13px;line-height:1.55;color:var(--ink-2);white-space:pre-wrap}
#rpCard .rp-ok{color:#2e7a50}#rpCard .rp-bad{color:#a8323e}
body[data-theme="night"] #rpCard .rp-ok{color:#6fd39a}body[data-theme="night"] #rpCard .rp-bad{color:#f08a95}
body[data-motion="minimal"] #rpCard .rp-row,body[data-motion="minimal"] #rpCard .rp-item{transition:none}
body[data-motion="minimal"] #rpCard .rp-row:hover,body[data-motion="minimal"] #rpCard .rp-item:hover{transform:none}
@media (prefers-reduced-motion:reduce){#rpCard .rp-row,#rpCard .rp-item{transition:none}#rpCard .rp-row:hover,#rpCard .rp-item:hover{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p393"]="started";}catch(_){}
(function r393(){"use strict";
if(window.IngPoints)return;var W=window,D=document,KEEP=30,DB="ingenium_points",ST="p";
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function key(t,f,pri){var b=mk("button","btn small"+(pri?" primary":""),t);b.type="button";b.onclick=function(e){e.stopPropagation();f(b);};return b;}
function when(t){try{return new Date(t).toLocaleString("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});}catch(e){return "";}}
function say(t){try{W.ingToast(t);}catch(e){}}
/* ---------- the store: this device's larger store (IndexedDB) ---------- */
var dbp=null;function db(){if(dbp)return dbp;dbp=new Promise(function(res,rej){var r=indexedDB.open(DB,1);r.onupgradeneeded=function(){if(!r.result.objectStoreNames.contains(ST))r.result.createObjectStore(ST,{keyPath:"id"});};r.onsuccess=function(){res(r.result);};r.onerror=function(){rej(r.error);};});return dbp;}
function tx(mode,f){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction(ST,mode),s=t.objectStore(ST),out=f(s);t.oncomplete=function(){res(out&&out.result!==undefined?out.result:out);};t.onerror=function(){rej(t.error);};});});}
function all(){return tx("readonly",function(s){return s.getAll();}).then(function(L){return (L||[]).sort(function(a,b){return b.at-a.at;});});}
function lock(){try{return W.IngLock&&IngLock.active&&IngLock.active();}catch(e){return false;}}
function summary(st){st=st||{};var chats=(st.chats||[]).filter(function(c){return c&&c.id;}),apps=(st.projects||[]).filter(function(p){return p&&p.kind==="app";}),know=st.know&&st.know.facts||[];
  return {chats:chats.length,msgs:chats.reduce(function(n,c){return n+((c.messages||[]).length);},0),notes:Array.isArray(st.notes)?st.notes.length:0,apps:apps.length,facts:know.length,
    titles:chats.slice(-40).map(function(c){return c.title||"Untitled";})};}
function deskText(){return JSON.stringify(W.state);}
/* take a restore point: why it was taken, what it held, the desk itself (sealed when her lock is on) */
var busy=false;
function take(why){if(busy)return Promise.resolve(null);busy=true;var raw="",sum=null;try{raw=deskText();sum=summary(W.state);}catch(e){busy=false;return Promise.resolve(null);}
  var p={id:"rp"+Date.now().toString(36),at:Date.now(),why:why,ver:(typeof ING_VERSION!=="undefined"?ING_VERSION:""),sum:sum,size:raw.length};
  return Promise.resolve(lock()?IngLock.sealText(raw,"restore-point"):raw).then(function(body){p.raw=body;p.sealed=lock();return tx("readwrite",function(s){s.put(p);});})
    .then(function(){return all();}).then(function(L){var old=L.slice(KEEP);return old.length?tx("readwrite",function(s){old.forEach(function(x){s.delete(x.id);});}):null;})
    .then(function(){busy=false;paint();return p;},function(e){busy=false;try{console.warn("restore point",e);}catch(_){}return null;});}
function body(p){return Promise.resolve(p.sealed?IngLock.openText(p.raw,"restore-point"):p.raw).then(function(t){return JSON.parse(t);});}
/* bring it all back: the desk as it is now is kept first */
function backAll(p){return take("Before bringing back "+when(p.at)).then(function(){return body(p);}).then(function(st){Object.keys(W.state).forEach(function(k){delete W.state[k];});Object.assign(W.state,st);try{saveState();}catch(e){}
  say("The desk of "+when(p.at)+" is back. Ingenium opens again on it.");setTimeout(function(){try{location.reload();}catch(e){}},900);});}
/* bring back one thing, leaving everything else as it is */
function backChat(p,id){return body(p).then(function(st){var c=(st.chats||[]).filter(function(x){return x&&x.id===id;})[0];if(!c)throw new Error("it is not in that restore point");
  W.state.chats=W.state.chats||[];var i=W.state.chats.findIndex(function(x){return x&&x.id===id;});if(i>=0)W.state.chats[i]=c;else W.state.chats.push(c);try{saveState();}catch(e){}try{renderChat();}catch(e){}say("“"+(c.title||"The conversation")+"” is back as it was "+when(p.at)+".");});}
function backNotes(p,id){return body(p).then(function(st){var o=(st.projects||[]).filter(function(x){return x&&x.id===id;})[0],n=(W.state.projects||[]).filter(function(x){return x&&x.id===id;})[0];if(!o||!o.app)throw new Error("those notes are not in that restore point");
  if(!n){W.state.projects=W.state.projects||[];W.state.projects.push(o);}else{n.app=n.app||{};["brief","briefAt","decisions","open","how"].forEach(function(k){if(o.app[k]!==undefined)n.app[k]=o.app[k];});}
  try{saveState();}catch(e){}try{W.IngFolders.paint();}catch(e){}say(o.name+"'s notes are back as they were "+when(p.at)+".");});}
function backFacts(p){return body(p).then(function(st){var F=(st.know&&st.know.facts)||[],K=W.state.know=W.state.know||{facts:[]};K.facts=K.facts||[];var have={},n=0;K.facts.forEach(function(f){have[f.id]=1;});
  F.forEach(function(f){if(!have[f.id]){K.facts.push(f);n++;}});try{saveState();}catch(e){}try{W.IngKnow.paint();}catch(e){}say(n?n+" fact"+(n===1?"":"s")+" brought back from "+when(p.at)+".":"Every fact of that restore point is already here.");});}
/* ---------- check a backup: opened, every fingerprint checked, nothing changed ---------- */
function check(file,pw,out){out.className="rp-out";out.textContent="Opening "+file.name+" and checking every part…";
  return Promise.resolve(W.IngBackup.open(file,{sealPassword:pw||null})).then(function(b){var m=b.manifest||{},t="";try{t=W.IngBackup.describe(b,"replace");}catch(e){}
      if(t&&typeof t==="object")t=t.text||t.summary||JSON.stringify(t).slice(0,600);
      out.className="rp-out rp-ok";out.textContent="This backup can be restored. Every part's fingerprint was checked, and nothing here was changed.\n"+(m.made||m.date?"Made "+when(Date.parse(m.made||m.date)||m.made)+(m.device?" on "+(m.device.name||m.device):"")+".\n":"")+(t?String(t).slice(0,1200):"");},
    function(e){var msg=String(e&&e.message||e);out.className="rp-out rp-bad";out.textContent=/sealed/i.test(msg)&&!pw?"This backup is sealed with a password: write it below and check again.":"This file cannot be restored: "+msg;});}
/* ---------- the card ---------- */
var OPEN="";
function card(){var bk=D.getElementById("bkCard");if(!bk||!bk.parentNode)return null;var c=D.getElementById("rpCard");if(c&&c.previousSibling===bk)return c;if(!c){c=mk("section","card");c.id="rpCard";c.setAttribute("aria-label","Restore points");}bk.parentNode.insertBefore(c,bk.nextSibling);return c;}
function paint(){var c=card();if(!c)return;all().then(function(L){c.innerHTML="";var hd=mk("div","rp-top");hd.appendChild(mk("h3",null,"Restore points"));hd.appendChild(key("Keep a restore point now",function(b){b.disabled=true;take("Kept by you").then(function(){say("A restore point is kept.");});},true));c.appendChild(hd);
  c.appendChild(mk("p","small muted","Your whole desk, kept on this device"+(lock()?" and sealed with your lock":"")+": once a day, before a new version of Ingenium first opens, before a backup or Ingenium Cloud brings work in, and when you ask. The last "+KEEP+" are kept. Bring all of one back, or only one thing from it."));
  var ul=mk("ul","rp-list");if(!L.length)ul.appendChild(mk("li","small muted","None yet: the first is kept a little after Ingenium opens."));
  L.forEach(function(p){var li=mk("li","rp-row"),top=mk("div","rp-top"),l=mk("div");l.appendChild(mk("b",null,when(p.at)));l.appendChild(mk("small",null,"  ·  "+p.why+(p.ver?"  ·  Ingenium "+p.ver:"")));top.appendChild(l);
    var acts=mk("div","rp-acts");acts.appendChild(key("Bring all of it back",function(b){if(b.getAttribute("data-sure")!=="1"){b.setAttribute("data-sure","1");b.textContent="Press again to bring it back";return;}b.disabled=true;backAll(p).catch(function(e){b.disabled=false;say("It could not be brought back: "+(e&&e.message||e));});}));
    acts.appendChild(key(OPEN===p.id?"Close":"Bring back one thing",function(){OPEN=OPEN===p.id?"":p.id;paint();}));top.appendChild(acts);li.appendChild(top);
    var s=p.sum||{};function pl(n,w){return n+" "+w+(n===1?"":"s");}li.appendChild(mk("div","rp-sum",pl(s.chats||0,"conversation")+" ("+pl(s.msgs||0,"message")+") · "+pl(s.notes||0,"note")+" · "+pl(s.apps||0,"app folder")+" · "+pl(s.facts||0,"fact")));
    if(OPEN===p.id){var one=mk("div","rp-one");li.appendChild(one);one.appendChild(mk("div","small muted","Opening it…"));body(p).then(function(st){one.innerHTML="";
        one.appendChild(mk("h5",null,"A conversation"));(st.chats||[]).filter(function(x){return x&&x.id;}).slice(-12).reverse().forEach(function(ch){var it=mk("div","rp-item");it.appendChild(mk("span",null,(ch.title||"Untitled")+" · "+((ch.messages||[]).length)+" messages"));it.appendChild(key("Bring it back",function(){backChat(p,ch.id).catch(function(e){say(String(e&&e.message||e));});}));one.appendChild(it);});
        var A=(st.projects||[]).filter(function(x){return x&&x.kind==="app"&&x.app&&(x.app.brief||(x.app.decisions||[]).length);});if(A.length){one.appendChild(mk("h5",null,"An app's folder notes"));A.forEach(function(pr){var it=mk("div","rp-item");it.appendChild(mk("span",null,pr.name+(pr.app.briefAt?" · notes of "+when(pr.app.briefAt):"")));it.appendChild(key("Bring its notes back",function(){backNotes(p,pr.id).catch(function(e){say(String(e&&e.message||e));});}));one.appendChild(it);});}
        var nf=(st.know&&st.know.facts||[]).length;if(nf){one.appendChild(mk("h5",null,"What Ingenium knew"));var it=mk("div","rp-item");it.appendChild(mk("span",null,nf+" facts"));it.appendChild(key("Bring back the facts not here now",function(){backFacts(p).catch(function(e){say(String(e&&e.message||e));});}));one.appendChild(it);}},
        function(e){one.innerHTML="";one.appendChild(mk("div","small muted","It could not be opened: "+(e&&e.message||e)+(p.sealed?" (it is sealed: unlock Ingenium first).":"")));});}
    ul.appendChild(li);});c.appendChild(ul);
  var ck=mk("div","rp-check");ck.appendChild(mk("h3",null,"Check a backup"));ck.appendChild(mk("p","small muted","Choose a backup file: Ingenium opens it, checks every part against its fingerprint and says what it holds, without changing anything here."));
  var row=mk("div","rp-acts"),fi=mk("input");fi.type="file";fi.accept=".zip,.json,.ingenium,application/zip,application/json,application/octet-stream";fi.hidden=true;fi.id="rpFile";var pw=mk("input");pw.type="password";pw.placeholder="Its password, if it is sealed";pw.className="kn-in";pw.id="rpPw";pw.autocomplete="off";
  var out=mk("div","rp-out");out.id="rpOut";row.appendChild(key("Choose a backup to check",function(){fi.click();},true));row.appendChild(pw);fi.onchange=function(){if(fi.files&&fi.files[0])check(fi.files[0],pw.value,out);};ck.appendChild(row);ck.appendChild(fi);ck.appendChild(out);c.appendChild(ck);});}
/* ---------- when restore points are taken ---------- */
function daily(){return all().then(function(L){var last=L[0],ver=typeof ING_VERSION!=="undefined"?ING_VERSION:"";if(last&&ver&&last.ver&&last.ver!==ver)return take("Before Ingenium "+ver+" first opened");
  if(!last||new Date(last.at).toDateString()!==new Date().toDateString())return take("The day's first");return null;});}
function wrapBackup(){var B=W.IngBackup;if(!B||B.__r393)return;var oa=B.apply;if(typeof oa==="function")B.apply=function(b,o){var self=this,args=arguments,mode=o&&o.mode==="merge"?"merged in":"restored";
    return take("Before a backup was "+mode).then(function(){return oa.apply(self,args);});};B.__r393=1;}
(function start(){var n=0;(function w(){if(W.__ingReady===true&&W.state){wrapBackup();setTimeout(function(){daily().catch(function(){});},20000);setInterval(function(){try{wrapBackup();card();if(D.getElementById("rpCard")&&!D.getElementById("rpCard").firstChild)paint();}catch(e){}},2000);return;}if(++n<400)setTimeout(w,500);})();})();
W.IngPoints={take:take,list:all,backAll:backAll,backChat:backChat,backNotes:backNotes,backFacts:backFacts,check:check,daily:daily,paint:paint,summary:summary};
})();
;try{window.__ingParts["p393"]="running";}catch(_){}
</script>
