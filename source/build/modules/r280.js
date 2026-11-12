<style id="r280-css">
/* ============ R280 · FABRICA, PHASE 2: EVERY REPOSITORY ON THIS COMPUTER, AND INGENIUM BESIDE YOU (Ingenium 6.86, 12 November 2026) ============
   Her words (12 November 2026): "Please continue working on my requests and deepening and enhancing Fabrica and making it my own offline
   GitHub. I want full and complete parity with GitHub but I want you to go above and beyond that and really enhance it and Ingenium as a
   whole." On the preview (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o): "Please fix the formatting issues and also redesign the long
   wide buttons from the "Test and ship" section. Please make the fixes and then push this preview everywhere, I approve of the design."
   Then: "I approve, please push it everywhere."
   - Every repository on this computer opens in Fabrica straight from its drive, whatever its size (desktop/app_disk_686.py reads it with
     dulwich; nothing is copied into the page): Your apps shows them under On this computer, beside the apps kept in Ingenium, with a key to
     add any folder that holds a git repository, on any drive. Every one brought from GitHub (6.83) is there at once, with its issues and
     pull requests. Every view (Code, History, Compare, Blame, Issues, Pull requests, Releases...) reads it as it is on the drive.
   - Read only in this stage: Fabrica shows any branch, tag or version of it, and keeps its own notes beside it, but writes nothing on the
     drive. A key that would write says so in plain words. Writing on the drive is the next stage.
   - The work's header says where the repository is: its drive, its room, every version, no size limit.
   - The branch key opens Ingenium's own list (r172's look, never the system's): the branches and the tags; choosing one shows it.
   - Test and ship has a fourth part, Ingenium: cards, as the ship cards are, two to a row. Ask your model: Explain, Review, Release notes,
     A message (written by the model she chose in Lector; where it runs is said). Find in every repository, by its words. Beyond GitHub:
     Any version, live; A second copy (said plainly: it comes in the next stage); Its folder, in Folders.
   - A pull request has a key beside Ask for changes: Ask Ingenium to review it. Merge, squash or rebase are in r141; the header wraps
     instead of cutting the name (r112). */
#fb .f-repos > .r280-sec{grid-column:1/-1;display:flex;flex-direction:column;gap:1px;padding:4px 4px 2px}
#fb .f-repos > .r280-sec b{font:600 10.5px/1.25 var(--f-sans);letter-spacing:.16em;text-transform:uppercase;color:var(--f-ink3)}
#fb .f-repos > .r280-sec span{font-size:11.5px;color:var(--f-ink3);overflow-wrap:anywhere}
#fb .f-repos > .r280-grid{grid-column:1/-1;padding:0;margin:0}
#fb .r280-disk{display:flex;align-items:center;gap:8px;margin:8px 12px 0;padding:7px 11px;border-radius:11px;background:var(--f-wellbg);box-shadow:var(--f-well);
  font-size:12px;line-height:1.35;color:var(--f-ink2);animation:fbRise .3s ease both}
#fb .r280-disk b{color:var(--f-ink1);font-weight:600}
#fb .r280-disk > span:last-child{min-width:0;overflow-wrap:anywhere}
#fb .r280-dot{width:8px;height:8px;border-radius:50%;flex:0 0 auto;background:var(--f-ok,#2f7a55);box-shadow:0 0 0 3px rgba(47,122,85,.2)}
#fb .r280-disk.away .r280-dot{background:var(--f-gold,#b08a2e);box-shadow:0 0 0 3px rgba(176,138,46,.22)}
#fb .r280-ing{display:flex;flex-direction:column;gap:10px;padding:12px 14px 16px;animation:fbRise .32s cubic-bezier(.34,1.35,.64,1) both}
#fb .r280-ing[hidden]{display:none}
#fb .r280-ing-h{display:flex;align-items:center;justify-content:space-between;gap:10px}
#fb .r280-ing-h b{font:600 16px/1.25 var(--f-serif);color:var(--f-ink1)}
#fb .r280-ing p{margin:0}
#fb .r280-sub{font:600 10.5px/1.25 var(--f-sans);letter-spacing:.14em;text-transform:uppercase;color:var(--f-ink3);margin:4px 0 -2px}
#fb .r280-tiles{grid-template-columns:repeat(2,minmax(0,1fr))}
#fb .r280-tiles .r280-tile{padding:10px 11px}
#fb .r280-tiles .r280-tile small{display:block}
#fb .r280-tile[aria-busy="true"]{opacity:.7;cursor:progress}
#fb .r280-tile:focus-visible{outline:2px solid var(--f-ring);outline-offset:2px}
#fb .r280-ans{border-radius:14px;background:var(--f-hi);box-shadow:var(--f-pill);padding:12px 14px;font-size:13px;line-height:1.5;color:var(--f-ink2);min-height:92px;overflow-wrap:anywhere}
#fb .r280-ans .h-big{display:block;margin-bottom:4px;font:600 14px/1.3 var(--f-sans);color:var(--f-ink1)}
#fb .r280-ans .r280-out{white-space:pre-wrap;margin:4px 0 6px}
#fb .r280-ans .f-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
#fb .r280-find{display:flex;gap:8px;align-items:center}
#fb .r280-find input{flex:1 1 auto;min-width:0;border-radius:10px;border:1px solid var(--f-hair);background:var(--f-wellbg);box-shadow:var(--f-well);color:var(--f-ink1);font:13px/1.4 var(--f-sans);padding:7px 11px}
#fb .r280-find input:focus-visible{outline:2px solid var(--f-acc);outline-offset:2px}
#fb .r280-hits{display:flex;flex-direction:column;gap:6px}
#fb .r280-hit{display:block;width:100%;text-align:left;border:0;cursor:pointer;font:inherit;padding:8px 10px;border-radius:11px;background:var(--f-wellbg);box-shadow:var(--f-well);
  font-size:12px;color:var(--f-ink2);animation:fbRise .3s ease both;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#fb .r280-hit:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .r280-hit:active{transform:translateY(1px);box-shadow:var(--f-press);transition-duration:.06s}
#fb .r280-hit b{font:600 12px var(--f-mono);color:var(--f-ink1)}
#fb .r280-hit code{display:block;font:11.5px/1.45 var(--f-mono);color:var(--f-ink2);margin-top:3px;overflow-wrap:anywhere;white-space:pre-wrap}
#fb .r280-vers{display:flex;flex-direction:column;gap:6px;margin-top:6px}
#fb .r280-ver{display:flex;align-items:center;gap:8px;justify-content:space-between}
#fb .r280-ver span{min-width:0;overflow-wrap:anywhere;font-size:12px}
#fb .r280-ver span b{font:600 12px var(--f-mono);color:var(--f-ink1)}
#fb .r280-key{white-space:nowrap}
.r172-pop.r280-pop{min-width:220px;max-width:min(360px,calc(100vw - 24px));max-height:min(420px,calc(100vh - 24px))}
#fb.f-phone .r280-tiles{grid-template-columns:1fr}
@media (max-width:560px){#fb .r280-tiles{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){#fb .r280-disk,#fb .r280-ing,#fb .r280-hit{animation:none;transition:none}}
body[data-motion="minimal"] #fb .r280-disk,body[data-motion="minimal"] #fb .r280-ing,body[data-motion="minimal"] #fb .r280-hit{animation:none}
@media (forced-colors:active){#fb .r280-tile,#fb .r280-hit,#fb .r280-disk{border:1px solid CanvasText}#fb .r280-tile[aria-pressed="true"]{outline:2px solid Highlight}}
</style>
<script>
try{(window.__ingParts=window.__ingParts||{})["p280"]="started";}catch(_){}
(function(){"use strict";if(window.__r280)return;window.__r280=1;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function X(){return W.fbHubHost||null;}
function A(){try{var a=typeof W.shellApi==="function"?W.shellApi():null;return a&&typeof a.disk_repo==="function"?a:null;}catch(e){return null;}}
function isDisk(id){return typeof id==="string"&&id.indexOf("disk:")===0;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function el(tag,cls,html){var e=D.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function size(n){n=+n||0;var K=1024;if(n<K)return n+" B";if(n<K*K)return Math.round(n/K)+" KB";if(n<K*K*K)return (n/K/K).toFixed(n<10*K*K?1:0)+" MB";
  if(n<K*K*K*K)return (n/K/K/K).toFixed(1)+" GB";return (n/K/K/K/K).toFixed(1)+" TB";}
function unb64(t){var bin=atob(t),o=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)o[i]=bin.charCodeAt(i);return o;}
function utf8(s){try{return new TextEncoder().encode(s);}catch(e){var o=new Uint8Array(s.length);for(var i=0;i<s.length;i++)o[i]=s.charCodeAt(i)&255;return o;}}
function toast(m){var x=X();if(x&&x.toast)x.toast(m);}
function fail(e){var x=X();if(x&&x.fail)x.fail(e);else toast(String(e&&e.message||e));}
function headOid(r){return r&&r.head?(r.head.ref?(r.refs[r.head.ref]||null):(r.head.oid||null)):null;}
function slugOf(n){return String(n||"repository").replace(/[^A-Za-z0-9._-]+/g,"-").replace(/^[-.]+|[-.]+$/g,"").slice(0,60)||"repository";}
var IR=W.IngRepo;
if(!IR||!IR.core||typeof IR.core.use!=="function"||typeof IR.core.be!=="function"){try{console.warn("r280: IngRepo is not here; Fabrica reads no repository from the drive");}catch(_){}return;}

/* ============ the repositories on the drive, through the computer app (desktop/app_disk_686.py) ============
   Each is a record as IngRepo keeps one (its refs, HEAD, the files at HEAD), read from the drive; its git objects are asked for in
   batches and lent to IngRepo's store marked away (r110: lent, never counted as kept here). Nothing is written on the drive. */
var DK={},ORDER=[],LIST=null,LISTAT=0,LISTP=null,PRE=new Map(),PREB=0,Q={},QT=0;
var READONLY="is read from the drive as it is: in this stage Fabrica shows every version of it and writes nothing on the drive. Writing on the drive (new versions, ideas, tags, merges) comes in the next stage.";
function refuse(name){return new Error("“"+(name||"This repository")+"” "+READONLY);}
function sideNotes(id){try{var f=X().FBS();f.diskNotes=f.diskNotes||{};return f.diskNotes[id]||{};}catch(e){return {};}}
function keepNotes(id,n){try{var x=X(),f=x.FBS();f.diskNotes=f.diskNotes||{};f.diskNotes[id]=n||{};x.saveSoon();}catch(e){}}
function touch(id){var i=ORDER.indexOf(id);if(i>=0)ORDER.splice(i,1);ORDER.unshift(id);if(ORDER.length>12)ORDER.length=12;}
function light(x){return {id:x.id,name:x.name,slug:slugOf(x.name),app:null,desc:x.desc||"",created:x.changed||0,changed:x.changed||0,head:x.head||{ref:"refs/heads/main"},refs:x.refs||{},
  work:{},sizes:{},log:[],merging:null,fileCount:x.fileCount!=null?x.fileCount:null,
  disk:{path:x.path,drive:x.drive,size:x.size||0,free:x.free==null?null:x.free,brought:!!x.brought,full:x.full||"",icon:x.icon||"",bare:!!x.bare,away:!x.ok,error:x.ok?"":(x.error||"")}};}
function frozen(o){try{Object.keys(o).forEach(function(k){if(o[k]&&typeof o[k]==="object")Object.freeze(o[k]);});Object.freeze(o);}catch(e){}return o;}
/* a copy for IngRepo: small parts copied; the files at HEAD and the refs shared and frozen (a repository brought from GitHub can hold
   thousands of refs, and Fabrica reads the record once for each tag on every refresh; IngRepo writes a new object when it changes them,
   and every write to a repository on the drive is refused before it begins) */
var WRITING={};/* 6.87: while Fabrica writes on a repository on the drive, its record is its own to change */
function copyOf(b){var w=!!WRITING[b.id];if(!w&&b.refs&&!Object.isFrozen(b.refs))Object.freeze(b.refs);
  return {id:b.id,name:b.name,slug:b.slug,app:b.app||null,desc:b.desc||"",created:b.created,changed:b.changed,head:JSON.parse(JSON.stringify(b.head||{ref:"refs/heads/main"})),
  refs:w?Object.assign({},b.refs||{}):(b.refs||Object.freeze({})),work:w?Object.assign({},b.work||{}):(b.work||frozen({})),sizes:b.sizes||{},log:(b.log||[]).slice(),merging:null,
  fileCount:b.fileCount!=null?b.fileCount:null,disk:b.disk,changes:b.changes||[],notes:JSON.parse(JSON.stringify(sideNotes(b.id)))};}
function listDisk(force){var a=A();if(!a)return Promise.resolve([]);if(!force&&LIST&&Date.now()-LISTAT<4000)return Promise.resolve(LIST);if(LISTP)return LISTP;
  LISTP=Promise.resolve(a.disk_list()).then(function(x){LISTP=null;LIST=(x&&x.ok&&x.repos)||[];LISTAT=Date.now();return LIST;},function(){LISTP=null;return LIST||[];});return LISTP;}
function diskAll(){return listDisk().then(function(l){return Promise.all(l.map(function(x){var d=DK[x.id];if(d&&d.rec&&x.ok&&!d.at&&!d.over)return diskRec(x.id).then(function(r){return r||light(x);},function(){return light(x);});
  return (d&&d.rec&&x.ok)?copyOf(d.rec):light(x);}));});}
/* 6.87: a merge's step between its joined files and its version (r110 merge saves the one, then keeps the other) is held in memory:
   only the version kept reaches the drive */
function midCopy(m){return {id:m.id,name:m.name,slug:m.slug,app:m.app||null,desc:m.desc||"",created:m.created,changed:m.changed,head:JSON.parse(JSON.stringify(m.head)),
  refs:Object.assign({},m.refs),work:Object.assign({},m.work),sizes:m.sizes||{},log:(m.log||[]).slice(),merging:m.merging?JSON.parse(JSON.stringify(m.merging)):null,
  fileCount:Object.keys(m.work||{}).length,disk:m.disk,changes:[],notes:JSON.parse(JSON.stringify(sideNotes(m.id)))};}
function diskRec(id){var d=DK[id]||(DK[id]={});touch(id);if(d.mid)return Promise.resolve(midCopy(d.mid));
  if(d.rec&&(d.over||Date.now()-d.at<3000))return Promise.resolve(copyOf(d.rec));
  /* asked again while it is being read: each asker gets a copy of its own (one may switch it while another reads it) */
  if(d.p)return d.p.then(function(r){return r&&d.rec&&!(r.disk&&r.disk.away)?copyOf(d.rec):r;});var a=A();if(!a)return Promise.resolve(d.rec?copyOf(d.rec):null);
  d.p=Promise.resolve(a.disk_repo(id)).then(function(x){d.p=null;
      if(!x||!x.ok){var l=(LIST||[]).filter(function(y){return y.id===id;})[0];if(!l&&!d.rec)return null;var r=d.rec?copyOf(d.rec):light(l);r.disk=JSON.parse(JSON.stringify(r.disk||{}));r.disk.away=true;r.disk.error=(x&&x.error)||"It could not be read.";return r;}
      var rec=x.rec;rec.work=frozen(rec.work||{});rec.disk.away=false;
      /* she moved to another branch or version while it was open: what she looks at stays, unless the drive moved on */
      d.rec=rec;d.at=Date.now();d.over=false;return copyOf(rec);},function(e){d.p=null;throw e;});
  return d.p;}
/* 6.87: what IngRepo made for a repository on the drive (an idea, a tag, a merge, a squash, a rebase, a version undone, another idea
   worked on) is written there: its new objects, each checked by its git name on the computer's side, then each branch or tag moved only
   if it is still where Fabrica read it; for a working copy, the folder follows its branch (only when nothing waits to be kept in it).
   Showing an older version, or another idea of a bare repository, changes nothing on the drive: it is a view, held for the session. */
function diskPut(rec){var d=DK[rec.id];if(!d||!d.rec)return Promise.reject(new Error("that repository is no longer on this device"));var b=d.rec;
  if(rec.merging&&!(rec.merging.conflicts||[]).length){d.mid=midCopy(rec);return Promise.resolve();}
  if(rec.merging){var cs=(rec.merging.conflicts||[]),n=cs.length;delete d.mid;return Promise.reject(new Error("The two ideas changed the same lines in "+n+" file"+(n===1?"":"s")+(n?": "+cs.slice(0,4).join(", "):"")+
    ". Fabrica does not resolve that on the drive yet: bring it in with git there, or in a repository kept in Ingenium."));}
  if(rec.name!==b.name||(rec.desc||"")!==(b.desc||"")||(rec.app||null)!==(b.app||null))return Promise.reject(new Error("“"+b.name+"” is named by its folder on the drive: rename the folder, then add it again."));
  var updates=[],ks={};Object.keys(b.refs||{}).concat(Object.keys(rec.refs||{})).forEach(function(k){ks[k]=1;});
  Object.keys(ks).sort().forEach(function(k){var o=(b.refs||{})[k]||null,nw=(rec.refs||{})[k]||null;if(o!==nw)updates.push({ref:k,old:o,new:nw,why:"Fabrica"});});
  var wtree=!!(b.disk&&b.disk.worktree),bh=b.head||{},rh=rec.head||{},sw=null,view=false;
  if(rh.oid)view=true;else if(rh.ref&&(rh.ref!==bh.ref||bh.oid)){if(wtree)sw=rh.ref;else view=true;}
  if(rec.notes)keepNotes(rec.id,rec.notes);
  /* a view laid over the record as the drive holds it (its ideas and tags as they are), with the version or idea shown */
  function hold(base){var n={};Object.keys(base).forEach(function(k){n[k]=base[k];});n.head=JSON.parse(JSON.stringify(rh));n.work=rec.work===base.work?base.work:frozen(rec.work);n.log=(rec.log||[]).slice(-200);
    n.fileCount=Object.keys(n.work).length;n.changes=[];d.rec=n;d.over=true;}
  if(!updates.length&&!sw){if(view||JSON.stringify(rh)!==JSON.stringify(bh))hold(b);return Promise.resolve();}
  return newObjects(b,updates).then(function(objs){var w=author();return call("disk_write",[rec.id,{objects:objs,updates:updates,head:sw,name:w.name||null,email:w.email||null}]);})
    .then(function(x){delete d.mid;d.at=0;d.over=false;LIST=null;if(x.aside)toast("A file .gitignore names stood where that version puts one: it is kept in "+x.aside+", inside its folder.");
      if(view)return diskRec(rec.id).then(function(){if(d.rec)hold(d.rec);});});}
function newObjects(b,updates){var st=IR.core.store(),be=IR.core.be(),seen={},out=[];Object.keys(b.refs||{}).forEach(function(k){seen[b.refs[k]]=1;});
  function visit(oid){if(!oid||seen[oid])return Promise.resolve();seen[oid]=1;
    return be.ownRec(oid).then(function(r){if(!r)return null;return st.get(oid).then(function(o){if(!o)return null;out.push([oid,o.type,b64(o.body)]);
      if(o.type==="commit"){var c=IR.core.parseCommit(o.body);return Promise.all([visit(c.tree)].concat((c.parents||[]).map(visit)));}
      if(o.type==="tree")return Promise.all(IR.core.parseTree(o.body).filter(function(e){return e.mode!=="160000";}).map(function(e){return visit(e.oid);}));
      if(o.type==="tag"){var m=/^object ([0-9a-f]{40})$/m.exec(new TextDecoder().decode(o.body));return m?visit(m[1]):null;}return null;});});}
  return Promise.all(updates.map(function(u){return visit(u.new);})).then(function(){return out;});}
/* that a version is on the drive (a view can move to it; a version made here cannot be written there yet) */
function need(id,oid){return want(id,oid).then(function(r){return !!r;});}
function forget(id){var a=A();if(!a)return Promise.reject(new Error("Fabrica can forget a repository on the drive only in the computer app."));
  return Promise.resolve(a.disk_forget(id)).then(function(x){if(!x||!x.ok)throw new Error((x&&x.error)||"It could not be forgotten.");delete DK[id];var i=ORDER.indexOf(id);if(i>=0)ORDER.splice(i,1);LIST=null;});}

/* ---------- objects: asked in batches (and the history and trees beyond them in the same answer), lent marked away ---------- */
function pre(o,r){if(PRE.has(o))return;PRE.set(o,r);PREB+=r.n;while(PREB>32*1048576&&PRE.size>1){var k=PRE.keys().next().value;PREB-=PRE.get(k).n;PRE.delete(k);}}
function want(rid,oid){return new Promise(function(res){var q=Q[rid]||(Q[rid]=new Map()),l=q.get(oid);if(l)l.push(res);else q.set(oid,[res]);if(!QT)QT=setTimeout(flush,1);});}
function flush(){QT=0;var all=Q;Q={};Object.keys(all).forEach(function(rid){send(rid,all[rid]);});}
function bigRec(rid,v){if(v.t!=="blob")return null;var d=DK[rid],where=d&&d.rec&&d.rec.disk?d.rec.disk.path:"its folder";
  var b=utf8("This file is "+size(v.n)+". Fabrica keeps a file this large whole on the drive and does not bring it into the page: open it from "+where+".\n");return {t:"blob",n:b.length,b:b,away:1,big:v.n};}
function parts(rid,oid,v){var a=A(),got=[],off=0;return (function next(){if(off>=v.n){var u=new Uint8Array(v.n),at=0;got.forEach(function(p){u.set(p,at);at+=p.length;});return Promise.resolve({t:v.t,n:v.n,b:u,away:1});}
  return Promise.resolve(a.disk_part(rid,oid,off,8388608)).then(function(x){if(!x||!x.ok)throw new Error((x&&x.error)||"a part could not be read");var u=unb64(x.b64);if(!u.length)throw new Error("a part ended early");got.push(u);off+=u.length;return next();});})();}
function send(rid,q){var a=A(),oids=Array.from(q.keys());function settle(o,r){(q.get(o)||[]).forEach(function(f){f(r);});}
  if(!a){oids.forEach(function(o){settle(o,null);});return;}
  for(var i=0;i<oids.length;i+=2000)(function(chunk){Promise.resolve(a.disk_objs(rid,chunk,300)).then(function(ans){
      if(!ans||!ans.ok){chunk.forEach(function(o){settle(o,null);});return;}
      var objs=ans.objs||{},again=new Map();
      chunk.forEach(function(o){if(!Object.prototype.hasOwnProperty.call(objs,o)){again.set(o,q.get(o));return;}var v=objs[o];if(!v){settle(o,null);return;}
        if(v.big){settle(o,bigRec(rid,v));return;}if(v.part){parts(rid,o,v).then(function(r){settle(o,r);},function(){settle(o,null);});return;}
        settle(o,{t:v.t,n:v.n,b:unb64(v.b64),away:1});});
      var more=ans.more||{};Object.keys(more).forEach(function(o){var v=more[o];if(v&&v.b64)pre(o,{t:v.t,n:v.n,b:unb64(v.b64),away:1});});
      if(again.size)send(rid,again);},function(){chunk.forEach(function(o){settle(o,null);});});})(oids.slice(i,i+2000));}
function diskObj(oid){if(PRE.has(oid)){var r=PRE.get(oid);PRE.delete(oid);PREB-=r.n;return Promise.resolve(r);}
  if(!ORDER.length||!A())return Promise.resolve(null);var order=ORDER.slice();
  return (function at(i){if(i>=order.length)return Promise.resolve(null);return want(order[i],oid).then(function(r){return r||at(i+1);});})(0);}

function Mux(inner){var m={};Object.keys(inner).forEach(function(k){if(typeof inner[k]==="function")m[k]=inner[k].bind(inner);});
  m.getRepo=function(id){return isDisk(id)?diskRec(id):inner.getRepo(id);};
  m.putRepo=function(rec){return isDisk(rec&&rec.id)?diskPut(rec):inner.putRepo(rec);};
  m.delRepo=function(id){return isDisk(id)?forget(id):inner.delRepo(id);};
  m.allRepos=function(){return Promise.all([inner.allRepos(),diskAll().catch(function(){return [];})]).then(function(x){return x[0].concat(x[1]);});};
  m.getRec=function(oid){return inner.getRec(oid).then(function(r){return r||diskObj(oid);});};
  m.ownRec=function(oid){return inner.getRec(oid);};
  m.diskSizes=function(id,oids){var a=A();if(!a||!oids.length)return Promise.resolve({});return Promise.resolve(a.disk_sizes(id,oids)).then(function(x){return (x&&x.ok&&x.sizes)||{};});};
  m.__r280=true;return m;}
try{var INNER=IR.core.be();if(INNER&&!INNER.__r280)IR.core.use(Mux(INNER));}catch(e){try{console.warn("r280: the drive's repositories could not be joined to Fabrica",e);}catch(_){}}

/* 6.87: working on the drive (desktop/app_disk2_687.py). A working copy's folder is its work: a file written, taken away or moved in
   Fabrica goes to the folder; Keep this version keeps the folder's changes as git would, with the repository's own name; Put it back saves
   what it replaces first. Ideas, tags, merges, squashes, rebases and versions undone are made by IngRepo as for any repository, and
   written on the drive by diskPut. A bare repository (brought from GitHub) takes ideas, tags and merges; its files change through a
   working copy, made from it in one press. */
function ra(id){var d=DK[id];return d&&d.rec?d.rec:null;}
function wt(id){var r=ra(id);return !!(r&&r.disk&&r.disk.worktree);}
function call(name,args){var a=A();if(!a||typeof a[name]!=="function")return Promise.reject(new Error("Fabrica works on a repository on the drive in the Mac and Windows apps."));
  return Promise.resolve(a[name].apply(a,args)).then(function(x){if(x&&x.cancelled)return x;if(!x||!x.ok)throw new Error((x&&x.error)||"It could not be done.");return x;});}
function stale(id){var d=DK[id];if(d){d.at=0;d.over=false;}LIST=null;}
function noFolder(id){var r=ra(id);return new Error("“"+(r?r.name:"This repository")+"” has no folder of files on the drive: make a working copy of it (Make a working copy, under its name), and change its files there.");}
function u8(x){if(x instanceof Uint8Array)return x;if(typeof x==="string")return utf8(x);if(x&&x.buffer)return new Uint8Array(x.buffer,x.byteOffset||0,x.byteLength);return utf8(String(x==null?"":x));}
function b64(u){var t="",CH=0x8000;for(var i=0;i<u.length;i+=CH)t+=String.fromCharCode.apply(null,u.subarray(i,i+CH));return btoa(t);}
function ready(id){return diskRec(id).then(function(r){if(!r)throw new Error("that repository is no longer on this device");if(!wt(id))throw noFolder(id);return r;});}
function under(r,p){return Object.keys(r.work||{}).filter(function(k){return k===p||k.indexOf(p+"/")===0;});}
function author(){try{return IR.author()||{};}catch(e){return {};}}
function cp(p){return IR.core.cleanPath(p);}
var ROUTE={
  put:function(id,path,data,mode){return ready(id).then(function(){return call("disk_write_file",[id,cp(path),b64(u8(data)),mode||null]);}).then(function(){stale(id);return null;});},
  putMany:function(id,files,onEach){return ready(id).then(function(){var i=0;return (function next(){if(i>=files.length){stale(id);return files.length;}var f=files[i++];
    return call("disk_write_file",[id,cp(f.path),b64(u8(f.data)),f.mode||null]).then(function(){if(onEach)onEach(i,files.length,f.path);return next();});})();});},
  del:function(id,path){return ready(id).then(function(r){var p=cp(path),ps=under(r,p);if(!ps.length)throw new Error("“"+p+"” is not here");
    return ps.reduce(function(q,x){return q.then(function(){return call("disk_remove_file",[id,x]);});},Promise.resolve()).then(function(){stale(id);toast("Taken away from its folder; kept aside in .git/ingenium-put-back, inside it.");return ps.length;});});},
  move:function(id,a,b){return ready(id).then(function(r){var pa=cp(a),pb=cp(b),ps=under(r,pa);if(!ps.length)throw new Error("“"+pa+"” is not here");
    return ps.reduce(function(q,x){return q.then(function(){return call("disk_move_file",[id,x,pb+x.slice(pa.length)]);});},Promise.resolve()).then(function(){stale(id);return ps.length;});});},
  commit:function(id,msg){return ready(id).then(function(){var w=author();return call("disk_commit",[id,String(msg||""),w.name||null,w.email||null]);}).then(function(x){stale(id);return x.commit;});},
  discard:function(id,paths){return ready(id).then(function(){return call("disk_put_back",[id,paths?paths.map(cp):null]);}).then(function(x){stale(id);
    if(x.saved)toast("Put back. What "+(x.saved===1?"it":"they")+" held first is kept in "+x.aside+", inside its folder.");return IR.info(id);});},
  restore:function(id,path,ref){return ready(id).then(function(){var p=cp(path);return IR.read(id,p,ref).then(function(bb){return bb==null?call("disk_remove_file",[id,p]):call("disk_write_file",[id,p,b64(u8(bb)),null]);});})
    .then(function(){stale(id);return IR.info(id);});},
  rename:function(id){var r=ra(id);return Promise.reject(new Error("“"+(r?r.name:"It")+"” is named by its folder on the drive: rename the folder, then add it again."));}
};
Object.keys(ROUTE).forEach(function(k){var f=IR[k];if(typeof f!=="function")return;IR[k]=function(id){return isDisk(id)?ROUTE[k].apply(null,arguments):f.apply(IR,arguments);};});
["branch","delBranch","tag","delTag","merge","rebase","revert","setRef","stopMerge","switchTo"].forEach(function(k){var f=IR[k];if(typeof f!=="function")return;
  IR[k]=function(id){if(!isDisk(id))return f.apply(IR,arguments);var args=arguments;WRITING[id]=(WRITING[id]||0)+1;
    function done(){WRITING[id]--;var dd=DK[id];if(dd&&!WRITING[id])delete dd.mid;}
    return Promise.resolve().then(function(){return f.apply(IR,args);}).then(function(x){done();return x;},function(e){done();throw e;});};});
/* a removed file and a new one holding the same bytes: moved, as r110's changesBetween says it */
function moves(list){var out=list.map(function(c){return JSON.parse(JSON.stringify(c));}),gone=out.filter(function(c){return c.kind==="removed";}),came=out.filter(function(c){return c.kind==="added";});
  gone.forEach(function(g){var m=came.filter(function(c){return c.now[1]===g.old[1]&&!c.moved;})[0];if(m){m.kind="moved";m.from=g.path;m.old=g.old;m.moved=true;g.drop=true;}});
  return out.filter(function(c){return !c.drop;});}
(function(){var st=IR.status;IR.status=function(id){if(!isDisk(id))return st.apply(IR,arguments);
  /* 6.87: a working copy's folder, as git sees it (read again for the repository open; the others as last read); a bare repository,
     or a version shown as it was, has nothing waiting */
  var d=DK[id],sel=null;try{sel=X().FBS().sel;}catch(e){}
  /* the repository open is read again from its folder every time: a change made a moment ago in another program shows at once */
  if(d&&d.rec&&id===sel&&!d.over&&!d.mid&&!WRITING[id]&&d.rec.disk&&d.rec.disk.worktree)d.at=0;
  var p=(d&&d.rec&&d.at&&id!==sel)?Promise.resolve(copyOf(d.rec)):diskRec(id);
  return p.then(function(r){if(!r)throw new Error("that repository is no longer on this device");var dd=DK[id],view=!!(dd&&dd.over),ch=(!view&&r.changes&&r.changes.length)?moves(r.changes):[];
    return {changes:ch,clean:!ch.length,head:headOid(r),branch:r.head&&r.head.ref?r.head.ref.replace(/^refs\/heads\//,""):null,merging:null};});};
  var nt=IR.notes;IR.notes=function(id,oid){if(!isDisk(id))return nt.apply(IR,arguments);var n=sideNotes(id);return Promise.resolve(oid?JSON.parse(JSON.stringify(n[oid]||{})):JSON.parse(JSON.stringify(n)));};})();

/* ============ Your apps: On this computer, and Kept in Ingenium ============ */
function repos(){var x=X();return x&&x.C&&x.C.repos?x.C.repos:[];}
function tileWords(s,line){var d=s.disk||{};if(d.away)return "drive not connected";return line;}/* 6.87: Fabrica's own line, as for any app she works on (short, so never cut) */
function dressRepos(){var box=$("fbRepos"),rs=repos();if(!box)return;var anyDisk=rs.some(function(r){return isDisk(r.id);});
  var direct=[].filter.call(box.children,function(e){return e.classList&&e.classList.contains("f-repo");});
  if(!anyDisk||direct.length!==rs.length)return;/* only a fresh paint of the tiles, one for each repository in order */
  var mine=[],kept=[];direct.forEach(function(b,i){(isDisk(rs[i].id)?mine:kept).push([b,rs[i]]);});
  var drives={},free=null;mine.forEach(function(p){var d=p[1].disk||{};if(d.drive)drives[d.drive]=1;if(free==null&&d.free!=null)free=d.free;});
  var dn=Object.keys(drives);
  function sec(t,s){return el("div","r280-sec","<b>"+esc(t)+"</b><span>"+esc(s)+"</span>");}
  box.appendChild(sec("On this computer · "+mine.length,(dn.join(", ")||"This computer")+(dn.length===1&&free!=null?" · "+size(free)+" free":"")+" · no size limit"));
  var g1=el("div","f-repos r280-grid");mine.forEach(function(p){var b=p[0],s=p[1],line=b.querySelector(".stl span:last-child"),st=b.querySelector(".stl .st");
    if(line)line.textContent=tileWords(s,line.textContent);if(st&&s.disk&&s.disk.away){st.className="st new";st.title="Its drive is not connected";}
    b.title=(s.disk&&s.disk.path?s.disk.path:s.name)+(s.disk&&s.disk.brought?" · brought from GitHub":"");g1.appendChild(b);});box.appendChild(g1);
  if(kept.length){box.appendChild(sec("Kept in Ingenium · "+kept.length,"made or brought into Fabrica, kept in Ingenium itself"));var g2=el("div","f-repos r280-grid");kept.forEach(function(p){g2.appendChild(p[0]);});box.appendChild(g2);}}
function addKey(){var a=A();if(!a||typeof a.disk_choose!=="function"||$("fbDiskAdd"))return;var after=$("fbHubBring")||$("fbBring");if(!after||!after.parentNode)return;
  var k=el("button","f-btn r280-key","Add one from this computer");k.type="button";k.id="fbDiskAdd";k.title="Any folder that holds a git repository, on any drive: Fabrica reads it from there, at any size";
  k.onclick=function(){k.disabled=true;Promise.resolve(a.disk_choose()).then(function(x){k.disabled=false;if(!x||x.cancelled)return;if(!x.ok){toast(x.error||"That folder could not be added.");return;}
      LIST=null;var h=X();h.FBS().sel=x.id;h.S.home=false;h.saveSoon();return h.refresh().then(function(){h.paint();var r=repos().filter(function(y){return y.id===x.id;})[0];
        toast((r?r.name:"It")+(x.already?" was already here: it":"")+" opens from the drive as it is: every version, at any size.");});},function(e){k.disabled=false;fail(e);});};
  after.parentNode.insertBefore(k,after.nextSibling);}

/* ============ the work: where it is, and the branch key's own list ============ */
function dressWork(){var w=$("fbWork"),head=w&&w.querySelector(".f-pn-h"),x=X(),r=x&&x.cur?x.cur():null,line=$("fbDiskLine");
  if(!head)return;if(!r||!isDisk(r.id)){if(line)line.remove();return;}
  var d=r.disk||{},rr0=ra(r.id),sig=r.id+"|"+(d.away?"away":"")+"|"+d.size+"|"+d.drive;if(line&&line.getAttribute("data-sig")===sig+"|"+(rr0&&rr0.disk&&rr0.disk.worktree===false?"bare":"wt"))return;
  if(!line){line=el("div","r280-disk");line.id="fbDiskLine";line.setAttribute("role","note");}line.setAttribute("data-sig",sig);line.classList.toggle("away",!!d.away);
  var rr=ra(r.id),bare=!!(rr&&rr.disk&&rr.disk.worktree===false);
  line.innerHTML=d.away?'<span class="r280-dot"></span><span>Its drive is not connected now: connect it, and '+esc(r.name)+" opens here as it is on the drive.</span>"
    :'<span class="r280-dot"></span><span>From <b>'+esc(d.drive||"this computer")+"</b> · "+esc(size(d.size))+", every version"+(d.brought?", brought from GitHub":"")+" · no size limit · "+
      (bare?"its files change through a working copy":"kept on the drive as you work")+"</span>";
  if(bare&&!d.away){var k=el("button","f-btn sm r280-key","Make a working copy");k.type="button";k.title="A folder of its files, beside it on a drive you choose: Fabrica lists it at once";
    k.onclick=function(){k.disabled=true;call("disk_working_copy",[r.id]).then(function(x){k.disabled=false;if(!x||x.cancelled)return;LIST=null;var h=X();h.FBS().sel=x.id;h.S.home=false;h.saveSoon();
      return h.refresh().then(function(){h.paint();toast("A working copy of "+r.name+" is made"+(x.path?" in "+x.path:"")+": change its files there, and keep them as versions.");});},function(e){k.disabled=false;fail(e);});};
    line.appendChild(k);}
  line.setAttribute("data-sig",sig+"|"+(bare?"bare":"wt"));
  if(head.nextSibling!==line)head.parentNode.insertBefore(line,head.nextSibling);}
var POP=null;
function closePop(){if(!POP)return;var p=POP;POP=null;p.remove();D.removeEventListener("pointerdown",outside,true);D.removeEventListener("keydown",keys,true);W.removeEventListener("resize",closePop);}
function outside(e){if(POP&&!POP.contains(e.target)&&!(e.target.closest&&e.target.closest("#fbBranch")))closePop();}
function keys(e){if(!POP)return;var os=[].slice.call(POP.querySelectorAll(".r172-opt")),i=os.indexOf(POP.querySelector(".r172-act"));
  if(e.key==="Escape"){e.preventDefault();e.stopPropagation();closePop();var b=$("fbBranch");if(b)b.focus();return;}
  if(e.key==="ArrowDown"||e.key==="ArrowUp"||e.key==="Home"||e.key==="End"){e.preventDefault();var j=e.key==="Home"?0:e.key==="End"?os.length-1:Math.max(0,Math.min(os.length-1,i+(e.key==="ArrowDown"?1:-1)));
    os.forEach(function(o){o.classList.remove("r172-act");});if(os[j]){os[j].classList.add("r172-act");os[j].scrollIntoView({block:"nearest"});}return;}
  if((e.key==="Enter"||e.key===" ")&&i>=0){e.preventDefault();os[i].click();}}
function openList(anchor,groups,onPick){closePop();var r=anchor.getBoundingClientRect(),pop=el("div","r172-pop r172-in r280-pop");pop.setAttribute("role","listbox");pop.setAttribute("aria-label","Branches and tags");
  groups.forEach(function(g){if(!g.items.length)return;var gr=el("div","r172-grp");gr.setAttribute("role","group");if(g.label){var gl=el("div","r172-gl");gl.textContent=g.label;gr.appendChild(gl);}
    g.items.forEach(function(it){var o=el("div","r172-opt");o.setAttribute("role","option");o.setAttribute("aria-selected",it.on?"true":"false");o.innerHTML="<r172-t>"+esc(it.label)+"</r172-t>";
      o.addEventListener("pointerenter",function(){[].forEach.call(pop.querySelectorAll(".r172-opt"),function(c){c.classList.remove("r172-act");});o.classList.add("r172-act");});
      o.addEventListener("click",function(){closePop();onPick(it);});gr.appendChild(o);});pop.appendChild(gr);});
  D.body.appendChild(pop);POP=pop;var pw=pop.offsetWidth,ph=pop.offsetHeight,left=Math.max(12,Math.min(r.left,innerWidth-pw-12)),top=r.bottom+6;
  if(top+ph>innerHeight-12&&r.top-ph-6>12){top=r.top-ph-6;pop.classList.add("r172-up");}pop.style.left=Math.round(left)+"px";pop.style.top=Math.round(Math.max(12,top))+"px";
  var on=pop.querySelector('.r172-opt[aria-selected="true"]')||pop.querySelector(".r172-opt");if(on)on.classList.add("r172-act");
  setTimeout(function(){D.addEventListener("pointerdown",outside,true);D.addEventListener("keydown",keys,true);W.addEventListener("resize",closePop);},0);}
function branchList(e){var x=X(),r=x&&x.cur?x.cur():null,b=$("fbBranch");if(!r||!b)return;e.preventDefault();e.stopPropagation();if(POP){closePop();return;}
  var cur=r.detached?null:(r.branch||"main"),bs=(r.branches||[]).slice().sort(),ts=(r.tags||[]).slice().sort().reverse();
  openList(b,[{label:"Branches",items:bs.map(function(n){return {kind:"branch",name:n,label:n,on:n===cur};})},
      {label:"Tags",items:ts.slice(0,200).map(function(n){return {kind:"tag",name:n,label:n,on:false};})},
      {label:"",items:[{kind:"ideas",label:"All the ideas, side by side"}]}],function(it){
    if(it.kind==="ideas"){x.S.view="ideas";x.paintWork();x.thumbs();return;}
    if(it.kind==="branch"&&it.name===cur)return;
    IR.switchTo(r.id,it.name).then(function(){x.C.files={};x.C.diff={};x.C.log={};
        toast(it.kind==="tag"?"Showing "+r.name+" as it was at "+it.name+". Nothing is changed.":isDisk(r.id)?"Now showing “"+it.name+"”, read from the drive as you look.":"Now working on “"+it.name+"”. Your files follow it.");
        return x.refresh();}).then(function(){x.paint();},fail);});}
D.addEventListener("click",function(e){var t=e.target;if(t&&t.closest&&t.closest("#fbBranch"))branchList(e);},true);

/* ============ Test and ship: a fourth part, Ingenium ============ */
var ICON={explain:'<circle cx="10.5" cy="10.5" r="5.5"/><path d="M14.6 14.6L19 19M8 10.5h5"/>',review:'<path d="M6 3.5h8l4 4v13H6z"/><path d="M9 13.5l2 2 4-4.5"/>',
  notes:'<path d="M8 7h9M8 12h9M8 17h6"/><circle cx="5" cy="7" r=".9" fill="currentColor"/><circle cx="5" cy="12" r=".9" fill="currentColor"/><circle cx="5" cy="17" r=".9" fill="currentColor"/>',
  message:'<path d="M5 6.5h14v9H10l-4 3v-3H5z"/><path d="M8.5 10h7M8.5 12.8h4.5"/>',time:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.8 1.8"/>',
  copy:'<rect x="4" y="5" width="16" height="6" rx="2"/><rect x="4" y="13" width="16" height="6" rx="2"/><path d="M7.5 8h.01M7.5 16h.01"/>',
  folder:'<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>'};
function plan(){try{return W.IngLector&&W.IngLector.plan?W.IngLector.plan():null;}catch(e){return null;}}
function modelName(){var o=plan();try{if(o&&(o.cloud||o.link)&&typeof W.lxCloudName==="function")return W.lxCloudName();if(o&&o.chosen)return o.chosen.customName||o.chosen.name||"your model";}catch(e){}return "your model";}
function whereSaid(){var o=plan();if(!o||!(o.chosen||o.cloud||o.link))return "Choose a model in Lector, and it answers here.";
  if(o.cloud||(o.link&&!o.chosen))return "Your model, "+modelName()+", answers here. It does not run on this computer: what it reads is sent to it.";
  return "Your model on this computer, "+modelName()+", reads the repository and answers here. Nothing is sent anywhere.";}
function room(){var ctx=8192,o=plan();try{if(o&&(o.chosen||o.cloud)&&typeof W.lxCtx==="function")ctx=W.lxCtx(o.chosen)||ctx;}catch(e){}return Math.max(7000,(ctx-2200)*3);}
function cut(s,n){s=String(s||"");return s.length<=n?s:s.slice(0,Math.max(0,n-60))+"\n[… the rest is left out: it is longer than your model can read at once …]";}
var MANNER="You help me with my own app's repository. Plain words, short sentences, no jargon. Use only what is given here: never a file, a change, a version or a reason it does not show. If something is not clear from it, say so.";
function ansBox(){return D.querySelector("#fbPartSec_ingenium .r280-ans");}
function say(title,body){var b=ansBox();if(!b)return null;b.innerHTML='<b class="h-big">'+esc(title)+"</b>";var o=el("div","r280-out");o.textContent=body||"";b.appendChild(o);return b;}
function ask(title,msgs,max,then){var o=plan(),b=say(title,"");if(!b)return Promise.resolve(null);var out=b.querySelector(".r280-out");
  if(typeof W.lxAsk!=="function"||!o||!(o.chosen||o.cloud||o.link)){out.textContent="Choose a model in Lector first: Explain, Review, Release notes and A message are written by your own model.";return Promise.resolve(null);}
  out.textContent="Your model is reading…";var said=false;
  return Promise.resolve(W.lxAsk({modelId:o.chosen?o.chosen.id:null},[{role:"system",content:MANNER}].concat(msgs),max||900,0.2,function(t){said=true;out.textContent=t;}))
    .then(function(t){t=String(t||"").trim();out.textContent=t||"The model gave no answer.";var p=el("p","f-hint","Written by "+modelName()+". Read it before you use it.");b.appendChild(p);if(then&&t)then(t,b);return t;},
      function(e){out.textContent="The model could not answer: "+String(e&&e.message||e);return null;});}
function cur(){var x=X();return x&&x.cur?x.cur():null;}
function diffText(r,from,to,limit){return IR.diff(r.id,{from:from,to:to,text:true}).then(function(items){var t=[],n=0;items.forEach(function(it){var s=it.binary?"(a binary file: "+it.path+", "+it.kind+")":(it.text||("("+it.kind+": "+it.path+")"));t.push(s);n+=s.length;});
  return {count:items.length,adds:items.reduce(function(a,i){return a+(i.adds||0);},0),dels:items.reduce(function(a,i){return a+(i.dels||0);},0),text:cut(t.join("\n"),limit)};});}
function explain(){var r=cur();if(!r||!r.head){say("Explain","Choose an app with a version first.");return;}
  IR.log(r.id,{max:1}).then(function(l){var c=l[0];if(!c)throw new Error("there is no version to explain");var parent=c.parents&&c.parents[0];
    return diffText(r,parent||"empty",c.oid,room()-1500).then(function(d){
      return ask("What the newest version changes",[{role:"user",content:"THE APP: "+r.name+"\nTHE VERSION: "+c.short+" by "+((c.author&&c.author.name)||"someone")+", "+new Date(c.when).toDateString()+"\nITS MESSAGE:\n"+c.msg+
        "\n\nWHAT IT CHANGES ("+d.count+" files, +"+d.adds+" −"+d.dels+" lines):\n"+d.text+"\n\nExplain to me in plain words what this version changes and why it matters to the app. Four to eight short sentences."}],700);});}).catch(function(e){say("Explain",String(e&&e.message||e));});}
function lca(r,a,b){return Promise.all([IR.log(r.id,{ref:a,max:600}),IR.log(r.id,{ref:b,max:600})]).then(function(x){var seen={};x[1].forEach(function(c){seen[c.oid]=1;});for(var i=0;i<x[0].length;i++)if(seen[x[0][i].oid])return x[0][i].oid;return null;});}
function review(n){var r=cur();if(!r){say("Review","Choose an app first.");return;}if(!W.fbHub||typeof fbHub.record!=="function"){say("Review","Pull requests are not in this build.");return;}
  fbHub.record(r.id).then(function(rec){var ps=(rec&&rec.pulls||[]).filter(function(p){return p.state==="open";});var v=fbHub.viewing?fbHub.viewing():null,want=n!=null?n:(v&&v.pr!=null?v.pr:null);
    var p=ps.filter(function(x){return x.n===want;})[0]||ps.sort(function(a,b){return (b.updated||0)-(a.updated||0);})[0];
    if(!p)throw new Error("no pull request is open in "+r.name);var from="refs/heads/"+p.from,to="refs/heads/"+p.to;
    if(r.branches.indexOf(p.from)<0||r.branches.indexOf(p.to)<0)throw new Error("the branches of #"+p.n+" ("+p.from+" into "+p.to+") are not both here");
    return lca(r,from,to).then(function(base){return diffText(r,base||to,from,room()-2500);}).then(function(d){
      return ask("A review of #"+p.n+", "+p.title,[{role:"user",content:"THE APP: "+r.name+"\nTHE PULL REQUEST #"+p.n+": "+p.title+" ("+p.from+" into "+p.to+")\nWHAT IT SAYS:\n"+(p.body||"(nothing)")+
        "\n\nITS CHANGES ("+d.count+" files, +"+d.adds+" −"+d.dels+" lines):\n"+d.text+"\n\nReview it for me as a careful reader would: does it do what it says; anything that looks wrong or risky, with the file and the line; one or two tests worth adding. Short points."}],900);});})
    .catch(function(e){say("Review",String(e&&e.message||e));});}
/* the version each tag names (an annotated tag is an object of its own, naming the version) */
function tagsAt(r){var x=X(),m=x&&x.C&&x.C.tags?x.C.tags[r.id]:null;if(m&&Object.keys(m).length>=(r.tags||[]).length)return Promise.resolve(m);
  return Promise.all((r.tags||[]).map(function(t){return IR.resolve(r.id,t).then(function(o){return [o,t];},function(){return null;});})).then(function(ps){var o={};ps.forEach(function(p){if(p&&p[0]&&!o[p[0]])o[p[0]]=p[1];});return o;});}
function notes(){var r=cur();if(!r||!r.head){say("Release notes","Choose an app with a version first.");return;}
  Promise.all([IR.log(r.id,{max:400}),tagsAt(r)]).then(function(x){var l=x[0],at=x[1],since=null,list=[];for(var i=0;i<l.length;i++){
      if(i>0&&at[l[i].oid]){since=at[l[i].oid];break;}list.push(l[i]);if(list.length>=150)break;}
    if(!list.length)throw new Error("there is nothing new since the last release");
    return ask("Release notes"+(since?" since "+since:""),[{role:"user",content:"THE APP: "+r.name+"\nTHE VERSIONS"+(since?" SINCE "+since:"")+", NEWEST FIRST:\n"+cut(list.map(function(c){return "- "+c.short+": "+c.msg.replace(/\s+/g," ").trim();}).join("\n"),room()-1500)+
      "\n\nWrite the release notes a person using the app would read: what is new, what is better, what is fixed. Short lines, grouped, no version names of the code itself."}],700);}).catch(function(e){say("Release notes",String(e&&e.message||e));});}
function message(){var r=cur();if(!r){say("A message","Choose an app first.");return;}if(isDisk(r.id)){say("A message","Nothing here waits to be kept: "+r.name+" is read from the drive as it is.");return;}
  IR.status(r.id).then(function(s){if(!s.changes.length)throw new Error("nothing waits to be kept: every change is already in a version");
    return diffText(r,"HEAD","work",room()-1500).then(function(d){return ask("A message for your changes",[{role:"user",content:"THE APP: "+r.name+"\nTHE CHANGES NOT KEPT YET ("+d.count+" files, +"+d.adds+" −"+d.dels+" lines):\n"+d.text+
      "\n\nWrite the message for keeping these changes: a first line of at most 60 characters saying what changed, then a blank line, then one to three short lines saying why. Only the message."}],300,function(t,b){
        var row=el("div","f-row"),k=el("button","f-btn r280-key","Put it in the message box");k.type="button";k.onclick=function(){var x=X();x.FBS().drafts[r.id]=t;x.saveSoon();var m=$("fbMsg");
          if(m){m.value=t;m.focus();}else{x.S.view="changes";x.paintWork();x.thumbs();}toast("The message is in the box: read it, change it if you wish, then keep the version.");};row.appendChild(k);b.appendChild(row);});});})
    .catch(function(e){say("A message",String(e&&e.message||e));});}
var TEXT=/\.(md|markdown|txt|text|rst|adoc|js|mjs|cjs|ts|tsx|jsx|json|jsonc|html?|css|scss|sass|less|py|pyw|rb|go|rs|java|kt|kts|swift|c|h|cc|cpp|hpp|cs|php|sh|bash|zsh|bat|cmd|ps1|ya?ml|toml|ini|cfg|conf|xml|svg|csv|tsv|sql|lua|dart|vue|svelte|gradle|properties|plist|tex|r|m|pl|el|clj|ex|exs|erl|hs|scala|txt|env|gitignore|editorconfig)$/i;
function textLike(p){var n=p.split("/").pop();return TEXT.test(n)||/^(README|LICENSE|LICENCE|CHANGELOG|NOTICE|Makefile|Dockerfile|Procfile|Gemfile|AUTHORS|CONTRIBUTING)(\.[^.]*)?$/i.test(n);}
var FIND={run:0};
function findAll(q,box){var words=String(q||"").toLowerCase().split(/\s+/).filter(Boolean);box.innerHTML="";if(!words.length){box.appendChild(el("p","f-hint","Type a word or a few: every repository is read for them."));return;}
  var run=++FIND.run,rs=repos().slice(),hits=[],filesRead=0,bytes=0,left=0,inRepos={},t0=Date.now(),LIM={files:6000,bytes:48*1048576,ms:25000,hits:200,one:768*1024};
  var note=el("p","f-hint","Reading…");box.appendChild(note);
  function show(final){if(run!==FIND.run)return;box.innerHTML="";var n=Object.keys(inRepos).length;
    box.appendChild(el("p","f-hint",(hits.length?hits.length+(hits.length>=LIM.hits?"+":"")+" found in "+n+" "+(n===1?"repository":"repositories"):"Nothing found")+", by their words; "+filesRead+" files read in "+rs.length+" "+(rs.length===1?"repository":"repositories")+"."+
      (left?" "+left+" more were not read (too large, or past what one search reads here): narrow the words, or search one repository in its Code.":"")+(final?"":" Still reading…")));
    hits.forEach(function(h){var b=el("button","r280-hit","<b>"+esc(h.repo)+"</b> · "+esc(h.path)+" · line "+h.line+"<code>"+esc(h.text)+"</code>");b.type="button";
      b.onclick=function(){var x=X();x.FBS().sel=h.id;x.S.home=false;x.saveSoon();x.refresh().then(function(){x.paint();if(W.fbHub&&fbHub.open)fbHub.open("code",{file:h.path});});};box.appendChild(b);});}
  (function nextRepo(i){if(run!==FIND.run)return;if(i>=rs.length||hits.length>=LIM.hits){show(true);return;}var r=rs[i];
    IR.files(r.id).then(function(fs){var todo=fs.filter(function(f){if(!textLike(f.path))return false;if(f.size!=null&&f.size>LIM.one){left++;return false;}return true;});
      return (function nextFile(j){if(run!==FIND.run)return null;if(j>=todo.length||hits.length>=LIM.hits)return null;
        if(filesRead>=LIM.files||bytes>=LIM.bytes||Date.now()-t0>LIM.ms){left+=todo.length-j;return null;}var f=todo[j];
        return IR.readText(r.id,f.path).then(function(t){filesRead++;if(t==null)return;bytes+=t.length;var ls=t.split("\n");
          for(var k=0;k<ls.length&&hits.length<LIM.hits;k++){var lo=ls[k].toLowerCase(),all=true;for(var w=0;w<words.length;w++)if(lo.indexOf(words[w])<0){all=false;break;}
            if(all){hits.push({repo:r.name,id:r.id,path:f.path,line:k+1,text:ls[k].trim().slice(0,240)});inRepos[r.id]=1;}}},function(){left++;})
          .then(function(){if(filesRead%40===0)show(false);return nextFile(j+1);});})(0);},function(){return null;}).then(function(){nextRepo(i+1);});})(0);}
function liveVersions(){var r=cur(),b=say("Any version, live","");if(!b)return;var out=b.querySelector(".r280-out");if(!r||!r.head){out.textContent="Choose an app with a version first.";return;}
  out.textContent="Choose a version: it opens as the app was then, in a window of its own.";IR.log(r.id,{max:15}).then(function(l){var list=el("div","r280-vers");
    l.forEach(function(c){var row=el("div","r280-ver","<span><b>"+esc(c.names.length?c.names.join(", "):c.short)+"</b> · "+esc(new Date(c.when).toLocaleDateString())+" · "+esc(c.title)+"</span>"),k=el("button","f-btn sm r280-key","Open");k.type="button";
      k.onclick=function(){k.disabled=true;if(!W.IngShip||typeof IngShip.onePage!=="function"){k.disabled=false;toast("This build cannot open a version as an app.");return;}
        IngShip.onePage(r.id,{ref:c.oid}).then(function(x){k.disabled=false;var w=typeof W.ingOpenApart==="function"?W.ingOpenApart(x.html,r.name+" · "+c.short):null;
          toast(w?r.name+" as it was at "+(c.names[0]||c.short)+" is open in a window of its own.":"This build cannot open a window; Run opens the newest version.");},function(e){k.disabled=false;fail(e);});};row.appendChild(k);list.appendChild(row);});
    b.appendChild(list);},function(e){out.textContent=String(e&&e.message||e);});}
function secondCopy(){if(W.IngCopies&&IngCopies.open)return IngCopies.open();/* 6.88: modules/r281.js */
  say("A second copy","A second copy on another drive is made by Ingenium's app on this computer.");}
function itsFolder(){var r=cur();if(!r){say("Its folder","Choose an app first.");return;}var fs=[];try{fs=W.IngFolders&&IngFolders.folders?IngFolders.folders():[];}catch(e){}
  var nm=String(r.name||"").toLowerCase(),f=fs.filter(function(p){return String(p.name||"").toLowerCase()===nm;})[0];
  if(!f){say("Its folder","No folder in Folders is named "+r.name+" yet.");return;}
  if(typeof W.go==="function")W.go("folders");setTimeout(function(){try{if(W.IngFolderView&&IngFolderView.setFind)IngFolderView.setFind(f.name);}catch(e){}},60);}
function tile(k,title,line,fn){var t=el("div","f-tg r280-tile");t.setAttribute("role","button");t.tabIndex=0;t.setAttribute("aria-pressed","false");t.setAttribute("data-k",k);
  t.innerHTML='<div class="top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICON[k]+"</svg><b>"+esc(title)+"</b></div><small>"+esc(line)+"</small>";
  function go(){[].forEach.call(D.querySelectorAll("#fbPartSec_ingenium .r280-tile"),function(x){x.setAttribute("aria-pressed",x===t?"true":"false");});fn();}
  t.addEventListener("click",go);t.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}});return t;}
function ingPart(){var sp=$("fbShip"),body=sp&&sp.querySelector(".f-pn-b"),row=body&&body.querySelector(".fr-parts");if(!row||$("fbPart_ingenium"))return;
  var b=el("button","fr-part");b.type="button";b.setAttribute("role","tab");b.setAttribute("data-part","ingenium");b.id="fbPart_ingenium";b.textContent="Ingenium";b.setAttribute("aria-controls","fbPartSec_ingenium");
  b.setAttribute("aria-selected","false");b.tabIndex=-1;row.appendChild(b);
  var sec=el("div","r280-ing");sec.id="fbPartSec_ingenium";sec.setAttribute("role","tabpanel");sec.setAttribute("aria-labelledby","fbPart_ingenium");sec.hidden=true;
  sec.innerHTML='<div class="r280-ing-h"><b>Beyond GitHub, with Ingenium</b><span class="f-chip">Yours</span></div><p class="f-hint r280-where"></p>';
  sec.appendChild(el("div","r280-sub","Ask your model"));
  var t1=el("div","f-targets r280-tiles");[["explain","Explain","the newest version, in plain words",explain],["review","Review","the open pull request, line by line",function(){review(null);}],
    ["notes","Release notes","from the versions since the last tag",notes],["message","A message","for the changes you are keeping",message]].forEach(function(a){t1.appendChild(tile(a[0],a[1],a[2],a[3]));});sec.appendChild(t1);
  var ans=el("div","r280-ans",'<p class="f-hint">Press a card above: the answer is written here.</p>');ans.setAttribute("aria-live","polite");sec.appendChild(ans);
  var f=el("form","r280-find");f.innerHTML='<input type="search" placeholder="Find in every repository" aria-label="Find in every repository, by its words"><button class="f-btn r280-key" type="submit">Find</button>';
  var hits=el("div","r280-hits");f.addEventListener("submit",function(e){e.preventDefault();var q=f.querySelector("input").value;
    if(f.getAttribute("data-how")==="meaning"&&W.IngMeaning){IngMeaning.find(q,hits);return;}findAll(q,hits);});sec.appendChild(f);sec.appendChild(hits);
  if(W.IngMeaning&&IngMeaning.dress)IngMeaning.dress(f);/* 6.88: By its words, or By what it means (modules/r281.js) */
  sec.appendChild(el("div","r280-sub","Beyond GitHub"));
  var t2=el("div","f-targets r280-tiles");[["time","Any version, live","the app as it was then, in its own window",liveVersions],["copy","A second copy","on another drive, checked every Sunday",secondCopy],
    ["folder","Its folder","in Folders: its conversations and notes",itsFolder]].forEach(function(a){t2.appendChild(tile(a[0],a[1],a[2],a[3]));});sec.appendChild(t2);
  body.appendChild(sec);
  function mineOn(on){sec.hidden=!on;b.setAttribute("aria-selected",on?"true":"false");b.tabIndex=on?0:-1;var ft=sp.querySelector(".f-pn-f");if(ft)ft.hidden=on;if(on){sec.querySelector(".r280-where").textContent=whereSaid();body.scrollTop=0;if(W.IngCopies&&IngCopies.dressTile)IngCopies.dressTile();}}
  b.addEventListener("click",function(){if(W.fbRooms&&fbRooms.part)fbRooms.part("ingenium");mineOn(true);});
  try{new MutationObserver(function(){var other=[].some.call(row.querySelectorAll(".fr-part"),function(x){return x!==b&&x.getAttribute("aria-selected")==="true";});if(other&&!sec.hidden)mineOn(false);})
    .observe(row,{attributes:true,subtree:true,attributeFilter:["aria-selected"]});}catch(e){}}
function reviewKey(){var ch=$("hPrChanges");if(!ch||$("hPrAskIng"))return;var k=el("button","f-btn r280-key","Ask Ingenium to review it");k.type="button";k.id="hPrAskIng";
  k.onclick=function(){var v=W.fbHub&&fbHub.viewing?fbHub.viewing():null,p=$("fbPart_ingenium");if(p)p.click();review(v?v.pr:null);var s=$("fbPartSec_ingenium");if(s&&s.scrollIntoView)s.scrollIntoView({block:"nearest"});};
  ch.parentNode.insertBefore(k,ch.nextSibling);}

/* ============ a repository brought from GitHub: its issues and pull requests, once, from their records on the drive (6.83) ============ */
function attachHub(){var a=A(),H=W.IngHubBring;if(!a||!H||typeof H.record!=="function"||!W.fbHub||typeof fbHub.importAll!=="function")return;var x=X();if(!x)return;var f=x.FBS();f.diskHub=f.diskHub||{};
  repos().forEach(function(r){var d=r.disk||{};if(!isDisk(r.id)||!d.brought||!d.full||f.diskHub[r.id]||d.away)return;f.diskHub[r.id]="pending";
    H.record(d.full).then(function(rec){if(!rec)throw new Error("no records");rec.id=r.id;rec.name=r.name;return fbHub.importAll({kind:"ingenium-hub",apps:[rec]});})
      .then(function(){f.diskHub[r.id]=Date.now();x.saveSoon();},function(){delete f.diskHub[r.id];});});}

/* ============ dressing Fabrica as it paints ============ */
var T=0,LASTSIG="";
function dress(){T=0;try{dressRepos();}catch(e){}try{addKey();}catch(e){}try{dressWork();}catch(e){}try{ingPart();}catch(e){}try{reviewKey();}catch(e){}
  var sig=repos().map(function(r){return r.id;}).join(",");if(sig!==LASTSIG){LASTSIG=sig;try{attachHub();}catch(e){}}}
function soon(){if(!T)T=setTimeout(dress,30);}
function boot(){var fb=$("fb");if(!fb){setTimeout(boot,800);return;}if(fb.__r280)return;fb.__r280=1;try{new MutationObserver(soon).observe(fb,{childList:true,subtree:true});}catch(e){}soon();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
/* the computer app's bridge comes after the page: Fabrica reads its list again then, so the drive's repositories show at once */
W.addEventListener("pywebviewready",function(){LIST=null;var x=X();if(x&&x.refresh&&$("fb"))x.refresh().then(function(){x.paint();},function(){});});
W.IngDisk={list:function(){return listDisk(true);},open:function(id){return diskRec(id);},isDisk:isDisk,forget:forget,find:findAll,openList:openList,
  state:function(){return {open:Object.keys(DK),order:ORDER.slice(),pre:PRE.size,list:LIST?LIST.length:null};}};
})();
try{window.__ingParts["p280"]="running";}catch(_){}
</script>
