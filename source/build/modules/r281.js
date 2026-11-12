<style id="r281-css">
/* ============ R281 · FABRICA: A SECOND COPY ON ANOTHER DRIVE, AND FIND BY WHAT IT MEANS (Ingenium 6.88, 12 November 2026) ============
   Her words, on the preview of phase 2's second stage (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o, version 4): "I approve of the
   preview, please push it everywhere." 6.87 built its first part, working on the drive; this is the second, as the preview shows it, in
   the Ingenium part of Test and ship (modules/r280.js):
   - A second copy: "Every version, idea and tag, kept whole on another drive, and checked against this one by fingerprint." On a drive
     chosen in Ingenium's own list (r172's look, as the branch key's), or any folder through the system's dialog; Every day, Every Sunday
     or By hand (Fabrica's own segmented row); Make the copy now, then Check it now. The computer app does the work in the background
     (desktop/app_copy_688.py: a bare repository in "Ingenium copies" on that drive, every pack and object copied whole, the branches and
     tags set, then each file checked against its own SHA-1), and looks every half hour for a copy due. The card's line says where the
     copy is and when it is checked.
   - Find: By its words (6.86) or By what it means. By meaning uses the folder search's own engine on this computer (rag/: the
     bge-small model, through IngRag), never anything online: each text file of every repository (drive and Ingenium) is read once, cut
     into passages of a few dozen lines, and turned into numbers that hold what it means; those are kept by the file's git name
     (IndexedDB "ingenium_meaning"), so a file read once is never read again, in any repository or version. A search turns the words into
     the same numbers and lists the passages nearest in meaning, each opening in Code at its line. What is not read yet is said, and it
     goes on being read while Ingenium is open; nothing of the code itself is kept there, only the numbers and the lines they cover.
   Drawn with Fabrica's tokens and parts (--f-*, .f-chip, .f-seg, .f-btn, .r280-hit); nothing tilts or glows. */
#fb .r281-copyrow{display:flex;align-items:center;gap:8px;margin:8px 0 6px;font-size:12.5px;color:var(--f-ink2);flex-wrap:wrap}
#fb .r281-copyrow .r281-drive{cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#fb .r281-copyrow .r281-drive:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .r281-copyrow .r281-drive:active{transform:translateY(1px);transition-duration:.06s}
#fb .r281-copyrow .r281-drive:focus-visible{outline:2px solid var(--f-ring);outline-offset:2px}
#fb .r281-when{margin:2px 0 8px}
#fb .r281-copyst{margin:6px 0 0}
#fb .r281-copyst.bad{color:var(--f-warn)}
#fb .r281-probs{margin:4px 0 0;padding-left:18px;font-size:12.5px;color:var(--f-ink2)}
#fb .r281-how{align-self:flex-start;margin:2px 0 -2px}
#fb .r281-read{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#fb .r281-read .f-btn{flex:0 0 auto}
@media (prefers-reduced-motion:reduce){#fb .r281-copyrow .r281-drive{transition:none}}
@media (forced-colors:active){#fb .r281-copyrow .r281-drive{border:1px solid CanvasText}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p281"]="started";}catch(_){}
/* window.IngCopies {open, line, state} and window.IngMeaning {dress, find, read, stop, state}: see the stylesheet above. */
(function r281(){
"use strict";
if(window.IngCopies)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function X(){return W.fbHubHost||null;}
function K(){return W.IngDisk||null;}
function A(){try{var a=typeof W.shellApi==="function"?W.shellApi():null;return a&&typeof a.copy_list==="function"?a:null;}catch(e){return null;}}
function call(n,args){var a=A();if(!a)return Promise.reject(new Error("This needs Ingenium's app on this computer, from 6.88."));return Promise.resolve(a[n].apply(a,args||[]));}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function el(tag,cls,html){var e=D.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function gb(n){n=+n||0;return n>=1e12?(n/1e12).toFixed(1)+" TB":n>=1e9?(n/1e9).toFixed(1)+" GB":n>=1e6?(n/1e6).toFixed(n>=1e8?0:1)+" MB":Math.max(1,Math.round(n/1e3))+" KB";}
function toast(m){var x=X();if(x&&x.toast)x.toast(m);}
function fail(e){var x=X();if(x&&x.fail)x.fail(e);else toast(String(e&&e.message||e));}
function thumbs(){var x=X();if(x&&x.thumbs)try{x.thumbs();}catch(e){}}
function cur(){var x=X();return x&&x.cur?x.cur():null;}
function isDisk(id){return typeof id==="string"&&id.indexOf("disk:")===0;}
function ansBox(){return D.querySelector("#fbPartSec_ingenium .r280-ans");}
var DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
function day(ms){var d=new Date(ms),n=new Date(),t0=new Date(n.getFullYear(),n.getMonth(),n.getDate()).getTime(),dd=new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime();
  if(dd===t0)return "today";if(dd===t0+86400000)return "tomorrow";if(dd===t0-86400000)return "yesterday";return DAYS[d.getDay()]+" "+d.getDate()+" "+MONTHS[d.getMonth()];}
function when(ms){var s=(Date.now()-ms)/1000;if(s<90)return "just now";if(s<3600)return Math.round(s/60)+" minutes ago";return day(ms)+" at "+new Date(ms).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});}

/* ================= a second copy on another drive ================= */
var C={list:null,places:null,poll:null,sel:{},lastAns:null};
var WHEN=[["day","Every day"],["sunday","Every Sunday"],["hand","By hand"]];
function planOf(id){return (C.list||[]).filter(function(c){return c.id===id;})[0]||null;}
function loadList(){return call("copy_list",[]).then(function(r){if(r&&r.ok)C.list=r.copies||[];return C.list;});}
function loadPlaces(){return call("copy_places",[]).then(function(r){if(r&&r.ok)C.places=r.places||[];return C.places;});}
function placeLabel(p){return (p.label||"This computer")+(p.away?" · not connected":p.free!=null?" · "+gb(p.free)+" free":"");}
/* the card's line: where the copy is, and when it is checked */
function line(r){var c=r&&planOf(r.id),w=c?{day:"checked every day",sunday:"checked every Sunday",hand:"checked by hand"}[c.when]:"";
  if(!c)return "on another drive, checked every Sunday";return "on "+(c.label||"its drive")+", "+w;}
function dressTile(){var t=D.querySelector('#fbPartSec_ingenium .r280-tile[data-k="copy"] small');if(!t)return;var r=cur(),s=line(r);if(t.textContent!==s)t.textContent=s;}
function pickDefault(r){var ps=C.places||[],mine=r&&r.disk&&r.disk.drive;
  return ps.filter(function(p){return p.kind!=="computer"&&!p.away&&p.label!==mine;})[0]||ps.filter(function(p){return !p.away;})[0]||null;}
function status(c){var j=c&&c.job||{},res=c&&c.result;
  if(j.state==="waiting")return {t:"Waiting for the copy before it to finish…"};
  if(j.state==="running"){var a=gb(j.done||0),b=gb(j.total||0);return {t:j.phase==="copying"?"Copying every version… "+a+" of "+b:j.phase==="checking"?"Checking it by fingerprint… "+a+" of "+b:"Starting…",busy:true};}
  if(!c||!c.made&&!res)return {t:"Not copied yet."};
  var nx=c.next?" Next check: "+day(c.next)+(c.when==="sunday"||c.when==="day"?" (when Ingenium is open).":"."):c.when==="hand"?" It is checked again when you ask.":"";
  if(c.away)return {t:(c.label||"Its drive")+" is not connected now: the copy is checked when it is.",bad:true};
  if(res&&res.ok)return {t:(c.made===res.at?"Copied and checked ":"Checked ")+when(res.at)+": every version matches, by fingerprint."+nx};
  if(res)return {t:(res.unfinished?"The last copy did not finish ":"The last check found a fault ")+when(res.at)+". Check it now copies again what is not right."+nx,bad:true,probs:res.problems||[]};
  return {t:"Not checked yet."+nx};}
function open(){var b=ansBox(),r=cur();if(!b)return;C.lastAns=b;stopPoll();
  function say(t){b.innerHTML='<b class="h-big">A second copy</b><div class="r280-out"></div>';b.querySelector(".r280-out").textContent=t;}
  if(!r){say("Choose an app first.");return;}
  if(!isDisk(r.id)){say("A second copy is kept of a repository on this computer's drive (On this computer, in Your apps). "+r.name+" is kept in Ingenium itself.");return;}
  if(!A()){say("A second copy is made by Ingenium's app on this computer, from 6.88.");return;}
  say("Reading where it can go…");
  Promise.all([loadList(),loadPlaces()]).then(function(){paintCopy(r);},function(e){say(String(e&&e.message||e));});}
function paintCopy(r){var b=ansBox();if(!b||!r)return;var c=planOf(r.id),st=C.sel[r.id]||(C.sel[r.id]={});
  if(!st.place){st.place=c&&c.folder?{label:c.label,folder:c.folder,free:c.free,away:c.away}:pickDefault(r);}
  if(!st.when)st.when=c&&c.when||"sunday";
  b.innerHTML='<b class="h-big">A second copy of '+esc(r.name)+'</b><div class="r280-out">Every version, idea and tag, kept whole on another drive, and checked against this one by fingerprint.</div>';
  var row=el("div","r281-copyrow");row.appendChild(el("span",null,"On"));var drv=el("button","f-chip r281-drive");drv.type="button";drv.setAttribute("aria-haspopup","listbox");
  drv.textContent=st.place?placeLabel(st.place):"Choose a drive";drv.title=st.place?st.place.folder:"";row.appendChild(drv);b.appendChild(row);
  drv.onclick=function(e){e.preventDefault();e.stopPropagation();var k=K();if(!k||!k.openList)return;
    var items=(C.places||[]).map(function(p){return {kind:"place",p:p,label:placeLabel(p),on:!!(st.place&&st.place.folder===p.folder)};});
    k.openList(drv,[{label:"Where the copy goes",items:items},{label:"",items:[{kind:"choose",label:"Choose another folder…"}]}],function(it){
      if(it.kind==="choose"){call("copy_choose",[]).then(function(res){if(!res||res.cancelled)return;if(!res.ok)throw new Error(res.error||"That folder could not be chosen.");st.place=res.place;
          if(!(C.places||[]).some(function(p){return p.folder===res.place.folder;}))(C.places=C.places||[]).push(res.place);paintCopy(r);}).catch(fail);return;}
      st.place=it.p;paintCopy(r);});};
  if(c&&st.place&&c.folder&&st.place.folder!==c.folder)b.appendChild(el("p","f-hint","A new place makes a new copy there; the copy on "+esc(c.label||"the other drive")+" stays where it is."));
  if(st.place&&r.disk&&st.place.label===r.disk.drive)b.appendChild(el("p","f-hint","This is the drive the repository is on: a copy on another drive keeps it safe if this one fails."));
  var seg=el("div","f-seg r281-when");seg.setAttribute("role","group");seg.setAttribute("aria-label","When it is checked");seg.appendChild(el("span","f-thumb"));
  WHEN.forEach(function(w){var k=el("button",null,esc(w[1]));k.type="button";k.setAttribute("data-w",w[0]);k.setAttribute("aria-pressed",st.when===w[0]?"true":"false");
    k.onclick=function(){st.when=w[0];[].forEach.call(seg.querySelectorAll("button"),function(y){y.setAttribute("aria-pressed",y===k?"true":"false");});thumbs();
      if(c&&c.folder&&st.place&&st.place.folder===c.folder)call("copy_plan",[r.id,null,st.when]).then(function(res){if(res&&res.ok){C.list=(C.list||[]).map(function(y){return y.id===r.id?res.copy:y;});paintCopy(r);dressTile();}else if(res)throw new Error(res.error);}).catch(fail);};
    seg.appendChild(k);});b.appendChild(seg);
  var keys=el("div","f-row"),go=el("button","f-btn pri r280-key",c&&c.made?"Check it now":"Make the copy now");go.type="button";go.setAttribute("data-copy","go");
  if(c&&c.made)go.title="Brings the copy up to date, then checks every version by fingerprint";
  go.onclick=function(){if(!st.place){toast("Choose where the copy goes first.");return;}go.disabled=true;
    call("copy_plan",[r.id,st.place.folder,st.when,st.place.label||null]).then(function(res){if(!res||!res.ok)throw new Error(res&&res.error||"That place could not be used.");return call("copy_now",[r.id]);})
      .then(function(res){if(!res||!res.ok)throw new Error(res&&res.error||"The copy could not start.");return loadList();}).then(function(){paintCopy(r);dressTile();startPoll(r);},function(e){go.disabled=false;fail(e);});};
  keys.appendChild(go);
  if(c){var stop=el("button","f-btn quiet sm","Stop keeping a copy");stop.type="button";stop.title="The copy stays on its drive, whole";
    stop.onclick=function(){stop.disabled=true;call("copy_forget",[r.id]).then(function(){return loadList();}).then(function(){delete C.sel[r.id];paintCopy(r);dressTile();toast("Fabrica no longer keeps a copy of "+r.name+"; the copy stays on "+(c.label||"its drive")+", whole.");},function(e){stop.disabled=false;fail(e);});};
    keys.appendChild(stop);}
  b.appendChild(keys);
  var s=status(c),p=el("p","f-hint r281-copyst"+(s.bad?" bad":""));p.textContent=s.t;p.setAttribute("aria-live","polite");b.appendChild(p);
  if(s.probs&&s.probs.length){var ul=el("ul","r281-probs");s.probs.slice(0,6).forEach(function(t){ul.appendChild(el("li",null,esc(t)));});b.appendChild(ul);}
  if(s.busy){go.disabled=true;startPoll(r);}
  requestAnimationFrame(thumbs);}
/* while the copy she started runs, its line says how far it is (only that line changes) */
function startPoll(r){if(C.poll)return;C.poll=setInterval(function(){var b=ansBox();if(!b||b!==C.lastAns||!b.querySelector("[data-copy]")||!cur()||cur().id!==r.id){stopPoll();return;}
  loadList().then(function(){var c=planOf(r.id),s=status(c),p=b.querySelector(".r281-copyst");if(!s.busy){stopPoll();paintCopy(r);dressTile();return;}if(p&&p.textContent!==s.t)p.textContent=s.t;},function(){});},800);}
function stopPoll(){if(C.poll){clearInterval(C.poll);C.poll=null;}}

/* ================= find by what it means ================= */
var M={db:null,emb:null,key:null,vec:new Map(),reading:false,stop:false,files:0,done:0,failed:0,started:0,line:null,run:0};
var TEXT=/\.(md|markdown|txt|text|rst|adoc|js|mjs|cjs|ts|tsx|jsx|json|html?|css|scss|sass|less|py|pyw|rb|go|rs|java|kt|kts|swift|c|h|cc|cpp|hpp|cs|php|sh|bash|zsh|bat|cmd|ps1|ya?ml|toml|ini|cfg|conf|xml|svg|sql|lua|dart|vue|svelte|gradle|properties|plist|tex|r|m|pl|ex|exs|hs|scala)$/i;
var SKIP=/(^|\/)(node_modules|vendor|dist|build|bower_components|\.git|Pods|DerivedData)\//,LOCK=/(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|Cargo\.lock|Podfile\.lock|composer\.lock|Gemfile\.lock)$|\.min\.(js|css)$/i;
var ONE=384*1024,PER_REPO=4000,PASSAGE=1100;
function rag(){var R=W.IngRag;try{return R&&typeof R.available==="function"&&R.available()&&typeof R.ready==="function"?R:null;}catch(e){return null;}}
/* the folder search's engine is here, or coming: the computer app has it (modules/r202.js loads it a moment after the page) */
function ragHere(){if(rag())return true;try{var a=W.pywebview&&W.pywebview.api;return !!(a&&typeof a.rag_list==="function");}catch(e){return false;}}
function ragWait(ms){var t0=Date.now();return new Promise(function(res){(function look(){if(rag()||Date.now()-t0>ms)return res(rag());setTimeout(look,250);})();});}
function wordsOk(p){var n=p.split("/").pop();return (TEXT.test(n)||/^(README|LICENSE|LICENCE|CHANGELOG|NOTICE|Makefile|Dockerfile|CONTRIBUTING)(\.[^.]*)?$/i.test(n))&&!SKIP.test(p)&&!LOCK.test(p);}
function db(){if(M.db)return M.db;M.db=new Promise(function(res,rej){try{var q=indexedDB.open("ingenium_meaning",1);q.onupgradeneeded=function(){try{q.result.createObjectStore("v");}catch(e){}};
  q.onsuccess=function(){res(q.result);};q.onerror=function(){rej(q.error||new Error("this device will not keep the meanings"));};}catch(e){rej(e);}});M.db.catch(function(){M.db=null;});return M.db;}
function tx(mode,fn){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction("v",mode),r=fn(t.objectStore("v"));t.oncomplete=function(){res(r&&"result" in r?r.result:undefined);};t.onerror=function(){rej(t.error);};t.onabort=function(){rej(t.error||new Error("the device's storage is full"));};});});}
function getVec(oid){var k=M.key+"|"+oid;if(M.vec.has(k))return Promise.resolve(M.vec.get(k));return tx("readonly",function(s){return s.get(k);}).then(function(v){
  if(v){v={l:v.l,e:v.e,v:new Float32Array(v.v)};M.vec.set(k,v);}return v||null;});}
function putVec(oid,rec){var k=M.key+"|"+oid;M.vec.set(k,{l:rec.l,e:rec.e,v:rec.v});return tx("readwrite",function(s){return s.put({l:rec.l,e:rec.e,v:rec.v.buffer.slice(0)},k);});}
function engine(){if(M.emb)return Promise.resolve(M.emb);
  return (rag()?Promise.resolve(rag()):ragHere()?ragWait(20000):Promise.resolve(null)).then(function(R){
    if(!R)throw new Error("Finding by meaning uses the folder search's own engine, which is in Ingenium's Mac and Windows apps.");
    return R.ready().then(function(info){var e=R._embedder;if(!e||typeof e.embed!=="function")throw new Error("The folder search's engine did not start.");M.emb=e;M.key=(info&&info.modelId||"model")+"|"+(info&&info.dims||0);return e;});});}
/* passages: a few dozen lines each, never cut inside a line; the file's path goes with each, so the name of a file counts too */
function passages(text){var ls=String(text).split("\n"),out=[],cur=[],start=1,n=0;
  for(var i=0;i<ls.length;i++){var L=ls[i].length>PASSAGE?ls[i].slice(0,PASSAGE):ls[i];if(n+L.length>PASSAGE&&cur.length){out.push({l:start,e:i,s:cur.join("\n")});cur=[];n=0;start=i+1;}cur.push(L);n+=L.length+1;}
  if(cur.length)out.push({l:start,e:ls.length,s:cur.join("\n")});return out.filter(function(p){return p.s.replace(/\s+/g,"").length>=12;}).slice(0,300);}
function textOf(oid){return W.IngRepo.core.store().need(oid,"blob").then(function(o){var b=o.body,n=Math.min(b.length,8000);for(var i=0;i<n;i++)if(b[i]===0)return null;return new TextDecoder().decode(b);},function(){return null;});}
/* what is to be read: every text file of every repository, by its git name (the same file in two places is read once) */
function plan(){var x=X(),rs=(x&&x.C&&x.C.repos||[]).slice();var by={},list=[],repos=0;
  return rs.reduce(function(p,r){return p.then(function(){return W.IngRepo.files(r.id).then(function(fs){var n=0;repos++;
      fs.forEach(function(f){if(n>=PER_REPO||!wordsOk(f.path)||(f.size!=null&&f.size>ONE)||!/^[0-9a-f]{40}$/.test(f.oid||""))return;n++;
        if(!by[f.oid]){by[f.oid]={oid:f.oid,where:[]};list.push(by[f.oid]);}by[f.oid].where.push({id:r.id,repo:r.name,path:f.path});});},function(){});});},Promise.resolve())
    .then(function(){return {list:list,repos:repos};});}
function read(){if(M.reading)return Promise.resolve();M.reading=true;M.stop=false;M.err=null;M.started=Date.now();M.done=0;M.failed=0;sayRead();
  return engine().then(function(e){return plan().then(function(pl){M.files=pl.list.length;
    var todo=[];return pl.list.reduce(function(p,f){return p.then(function(){return getVec(f.oid).then(function(v){if(v)M.done++;else todo.push(f);});});},Promise.resolve()).then(function(){sayRead();
      return (function next(i){if(M.stop||i>=todo.length)return Promise.resolve();if(D.hidden)return new Promise(function(r){setTimeout(r,1500);}).then(function(){return next(i);});
        var f=todo[i];return textOf(f.oid).then(function(t){if(t==null){M.failed++;M.done++;return putVec(f.oid,{l:[],e:[],v:new Float32Array(0)});}
          var ps=passages(t),path=f.where[0].path;if(!ps.length){M.done++;return putVec(f.oid,{l:[],e:[],v:new Float32Array(0)});}
          return e.embed({texts:ps.map(function(q){return path+"\n"+q.s;}),kind:"passage"}).then(function(vs){var dims=vs[0]?vs[0].length:0,flat=new Float32Array(dims*vs.length);
            vs.forEach(function(v,j){flat.set(v,j*dims);});M.done++;return putVec(f.oid,{l:ps.map(function(q){return q.l;}),e:ps.map(function(q){return q.e;}),v:flat});});})
          .catch(function(){M.failed++;M.done++;}).then(function(){if(M.done%8===0)sayRead();return new Promise(function(r){setTimeout(r,25);});}).then(function(){return next(i+1);});})(0);});});})
    .then(function(){M.reading=false;sayRead();},function(e){M.reading=false;M.err=String(e&&e.message||e);sayRead();throw e;});}
function stop(){M.stop=true;}
/* the reading line, under the finds: how far the reading is (only this line changes while it reads) */
function sayRead(){var l=M.line;if(!l||!l.isConnected)return;var t;
  if(M.err)t=M.err;else if(M.reading)t="Reading your repositories for what they mean: "+M.done.toLocaleString("en-GB")+" of "+M.files.toLocaleString("en-GB")+" files, on this computer. Finds come from what is read so far.";
  else if(M.files)t="Every file is read for what it means ("+M.files.toLocaleString("en-GB")+" files"+(M.failed?", "+M.failed+" could not be read":"")+").";else t="";
  var p=l.querySelector("span");if(p.textContent!==t)p.textContent=t;var k=l.querySelector("button");if(k)k.hidden=!M.reading;}
function cosine(q,v,off,dims){var s=0;for(var i=0;i<dims;i++)s+=q[i]*v[off+i];return s;}
function find(q,box){var run=++M.run;box.innerHTML="";q=String(q||"").trim();
  if(!q){box.appendChild(el("p","f-hint","Say what you mean, in your own words: where night mode is chosen, how the accounts are kept safe."));return Promise.resolve([]);}
  var note=el("p","f-hint","Finding by what it means…");box.appendChild(note);
  var rl=el("div","r281-read");rl.appendChild(el("span","f-hint"));var sk=el("button","f-btn quiet sm","Stop reading");sk.type="button";sk.onclick=function(){stop();};rl.appendChild(sk);M.line=rl;
  return engine().then(function(e){if(!M.reading)read().catch(function(){});
    return Promise.all([e.embed({texts:[q],kind:"query"}),plan()]).then(function(x){var qv=x[0][0],pl=x[1],dims=qv.length,hits=[],seen=0,files=0;
      return pl.list.reduce(function(p,f){return p.then(function(){return getVec(f.oid).then(function(v){if(!v)return;seen++;if(!v.l.length)return;files++;var best=-2,bi=0;
          for(var j=0;j<v.l.length;j++){var sc=cosine(qv,v.v,j*dims,dims);if(sc>best){best=sc;bi=j;}}hits.push({f:f,score:best,l:v.l[bi],e:v.e[bi]});});});},Promise.resolve())
        .then(function(){if(run!==M.run)return [];hits.sort(function(a,b){return b.score-a.score;});
          /* the passages near the best in meaning (within 0.1 of it, as the model scores them), at most twelve */
          var floor=hits.length?hits[0].score-0.1:0,top=hits.filter(function(h){return h.score>=floor;}).slice(0,12);
          return Promise.all(top.map(function(h){return textOf(h.f.oid).then(function(t){var ls=t?t.split("\n").slice(h.l-1,h.e):[],qw=q.toLowerCase().split(/\W+/).filter(function(w){return w.length>2;}),pick=0,most=-1;
            ls.forEach(function(L,i){var lo=L.toLowerCase(),n=0;qw.forEach(function(w){if(lo.indexOf(w)>=0)n++;});if(L.trim()&&n>most){most=n;pick=i;}});h.line=h.l+pick;h.text=(ls[pick]||"").trim().slice(0,240);});}))
            .then(function(){if(run!==M.run)return [];box.innerHTML="";var inRepos={};top.forEach(function(h){h.f.where.forEach(function(w){inRepos[w.id]=1;});});var nr=Object.keys(inRepos).length;
              box.appendChild(el("p","f-hint",(top.length?top.length+" found in "+nr+" "+(nr===1?"repository":"repositories")+", by what they mean (the folder search's own engine, on this computer)":"Nothing read yet comes near it")+"; "+
                seen.toLocaleString("en-GB")+" files read in "+pl.repos+" "+(pl.repos===1?"repository":"repositories")+"."));
              var here=cur();top.forEach(function(h){var w=(here&&h.f.where.filter(function(x){return x.id===here.id;})[0])||h.f.where[0],b=el("button","r280-hit","<b>"+esc(w.repo)+"</b> · "+esc(w.path)+" · line "+h.line+"<code>"+esc(h.text)+"</code>");b.type="button";b.setAttribute("data-score",h.score.toFixed(3));
                b.onclick=function(){var x=X();x.FBS().sel=w.id;x.S.home=false;x.saveSoon();x.refresh().then(function(){x.paint();if(W.fbHub&&fbHub.open)fbHub.open("code",{file:w.path,line:h.line});});};box.appendChild(b);});
              box.appendChild(rl);sayRead();return top;});});});})
    .catch(function(e){if(run!==M.run)return [];box.innerHTML="";box.appendChild(el("p","f-hint",String(e&&e.message||e)));return [];});}
/* the find form of the Ingenium part (modules/r280.js): By its words, as 6.86, or By what it means */
function dress(f){if(!f||f.__r281)return;f.__r281=1;var on=ragHere(),seg=el("div","f-seg r281-how");seg.setAttribute("role","group");seg.setAttribute("aria-label","How to find");seg.appendChild(el("span","f-thumb"));
  var inp=f.querySelector("input");
  [["words","By its words"],["meaning","By what it means"]].forEach(function(x){var b=el("button",null,x[1]);b.type="button";b.setAttribute("data-h",x[0]);b.setAttribute("aria-pressed",(on?x[0]==="meaning":x[0]==="words")?"true":"false");
    if(x[0]==="meaning"&&!on)b.title="Finding by meaning uses the folder search's own engine, which is in Ingenium's Mac and Windows apps";
    b.onclick=function(){[].forEach.call(seg.querySelectorAll("button"),function(y){y.setAttribute("aria-pressed",y===b?"true":"false");});f.setAttribute("data-how",x[0]);
      if(inp){inp.placeholder=x[0]==="meaning"?"Describe what you are looking for":"Find in every repository";inp.setAttribute("aria-label",x[0]==="meaning"?"Find in every repository, by what it means":"Find in every repository, by its words");}thumbs();};
    seg.appendChild(b);});
  f.setAttribute("data-how",on?"meaning":"words");if(on&&inp){inp.placeholder="Describe what you are looking for";inp.setAttribute("aria-label","Find in every repository, by what it means");}
  f.parentNode.insertBefore(seg,f);requestAnimationFrame(thumbs);}

W.IngCopies={open:open,line:line,dressTile:dressTile,load:function(){return Promise.all([loadList(),loadPlaces()]);},state:function(){return {list:C.list,places:C.places,polling:!!C.poll};}};
W.IngMeaning={dress:dress,find:find,read:read,stop:stop,passages:passages,state:function(){return {reading:M.reading,files:M.files,done:M.done,failed:M.failed,key:M.key,cached:M.vec.size,engine:!!rag()};}};
/* the computer app looks for a copy due from the start (its scheduler starts with the first call) */
function boot(){if(A())loadList().then(function(){dressTile();},function(){});}
W.addEventListener("pywebviewready",function(){setTimeout(boot,1500);});if(D.readyState!=="loading")setTimeout(boot,2500);else D.addEventListener("DOMContentLoaded",function(){setTimeout(boot,2500);});
try{window.__ingParts["p281"]="running";}catch(_){}
})();
</script>
