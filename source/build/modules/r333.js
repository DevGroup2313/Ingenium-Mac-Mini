<style id="r333-css">
/* Code's start window (where A repository begins) and Chat's + menu (A repository, The repository): raised and alive as Ingenium's keys,
   never a violet wash under the pointer. Her words on the stage 1 preview (19 November 2026): "I hate the purple shading, I want the
   animated popped out 3D look and animation of Ingenium to be consistent throughout". */
html body #modalBox .cc-start .cc-card,html body #modalBox .cc-start .cc-new{border:1px solid rgba(34,26,46,.10);background:linear-gradient(180deg,#ffffff,#f6f2fb);
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  transition:transform .24s cubic-bezier(.34,1.45,.64,1),box-shadow .24s ease}
html body #modalBox .cc-start .cc-card:hover,html body #modalBox .cc-start .cc-new:hover{background:linear-gradient(180deg,#ffffff,#f6f2fb);transform:translateY(-4px) rotate(-.35deg);
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 4px 0 rgba(40,22,68,.24),0 8px 10px rgba(40,22,68,.18),0 16px 24px rgba(40,22,68,.13)}
html body #modalBox .cc-start .cc-card:active,html body #modalBox .cc-start .cc-new:active{transform:translateY(1px) scale(.99);transition-duration:.08s;
  box-shadow:inset 0 -1px 0 rgba(40,22,68,.13),0 1px 0 rgba(40,22,68,.25),0 2px 3px rgba(40,22,68,.14)}
html body #chatPlusMenu .pm-item{transition:transform .22s cubic-bezier(.34,1.45,.64,1),box-shadow .22s ease,background .18s ease}
html body #chatPlusMenu .pm-item:hover,html body #chatPlusMenu .pm-item:focus-visible{background:linear-gradient(180deg,#ffffff,#f6f2fb);transform:translateY(-2px);
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.12),0 2px 0 rgba(40,22,68,.20),0 5px 9px rgba(40,22,68,.14)}
html body #chatPlusMenu .pm-item:active{transform:translateY(1px);transition-duration:.08s;box-shadow:0 1px 0 rgba(40,22,68,.2)}
html body[data-theme="night"] #modalBox .cc-start .cc-card,html body[data-theme="night"] #modalBox .cc-start .cc-new{border-color:rgba(255,255,255,.08);background:linear-gradient(180deg,#3a3050,#2f2742);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.10),inset 0 -1.5px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.55),0 4px 6px rgba(0,0,0,.40),0 9px 14px rgba(0,0,0,.30)}
html body[data-theme="night"] #modalBox .cc-start .cc-card:hover,html body[data-theme="night"] #modalBox .cc-start .cc-new:hover{background:linear-gradient(180deg,#3f3557,#322a47);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.12),inset 0 -1.5px 0 rgba(0,0,0,.45),0 4px 0 rgba(0,0,0,.55),0 8px 10px rgba(0,0,0,.42),0 16px 24px rgba(0,0,0,.32)}
html body[data-theme="night"] #chatPlusMenu .pm-item:hover,html body[data-theme="night"] #chatPlusMenu .pm-item:focus-visible{background:linear-gradient(180deg,#3f3557,#322a47);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.10),inset 0 -1.5px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.5),0 5px 9px rgba(0,0,0,.36)}
body[data-motion="minimal"] #modalBox .cc-start .cc-card,body[data-motion="minimal"] #modalBox .cc-start .cc-new,body[data-motion="minimal"] #chatPlusMenu .pm-item{transition:none!important;transform:none!important}
@media (prefers-reduced-motion:reduce){#modalBox .cc-start .cc-card,#modalBox .cc-start .cc-new,#chatPlusMenu .pm-item{transition:none!important;transform:none!important}}
/* a key of Code's top row that is hidden stays hidden: .chat-top-key's display:flex outweighed the hidden attribute, so a key set aside
   (r219's GitHub key in a session that is not on GitHub, r312's Keep in Fabrica in a session on a branch of its own) showed as an empty pill */
.chat-top-key[hidden]{display:none!important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p333"]="started";}catch(_){}
/* ============ R333 · ONE WAY OF WORKING ON A REPOSITORY, IN CHAT AND IN CODE (Ingenium 7.46, 19 November 2026) ============
   Fabrica's plan, stage 1 (recommendations 1 to 4 of the audit, source/previews/fabrica_stage1). Her words (19 November 2026): "I want for
   both chats to be able to connect to both Github repositories and Fabrica's repositories in the same way and work flawlessly, and in
   the same manner that it works here on Claude to GitHub's repos since that is the setup that I am most familiar with"; and, of the
   audit's recommendations: "I approve of all your recommendations ... I want them all implemented into Ingenium in the proposed order".
   Measured before building (the audit, 19 November 2026): Code worked on a GitHub repository on a branch of its own with a pull request
   (r219); Code on a Fabrica app wrote straight onto the branch the app had out (r312's Keep in Fabrica); Chat reached neither.
   1. One picker (window.IngRepoWork.pick): A repository, in Code's start window, in the Session column's Environment and in Chat's + menu:
      Fabrica's apps (kept in Ingenium) and, once signed in, her GitHub repositories, each with the branch to start from. A GitHub
      repository goes on through r219's own way (unchanged); a Fabrica app through the same steps, here.
   2. Code on a Fabrica app, on a branch of its own: the files of the branch she chose open as a Code project; the work stays here until
      it is kept, as one version, on the session's own branch (ingenium/..., named before the first keep), by IngRepo.commitTo (r110), so
      the branch Fabrica has out and its working copy are never touched. Create pull request opens one in Fabrica (fbHub.newPull, r141),
      from the session's branch into the branch it began from; it waits there for her yes, under her Rules before main. Update from
      Fabrica brings newer work on that branch into the files she has not changed, and names those she has.
   3. The model's own tools, as r219 gives them for GitHub: fabrica_status, fabrica_diff, keep_version (onto the session's branch, never the
      branch it began from) and open_pull_request (which always asks her first).
   4. Review and keep, before anything is kept: Fabrica's own Changes view in Fabrica's own sheet (her words on the preview: "use Fabrica's
      actual template and designs for this panel"), each changed file with its lines added and taken away, the branch, the message.
   5. Chat on a repository: A repository in Chat's + menu ties the conversation to it; the model reads its file list and its files with two
      tools that only read (repo_files, repo_read), and Continue in Code opens a Code session on it, on a branch of its own.
   Repositories on a drive (r280) work the same way: the computer app keeps the session's version on its branch (desktop/app_session_746.py,
   through r280's ROUTE.commitTo), and the files in the repository's folder are never touched.
   Only where Fabrica is (its page in the edition), as r312. */
(function(){"use strict";
var W=window,D=document;if(W.IngRepoWork)return;
function $(id){return D.getElementById(id);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function toast(t){try{W.ingToast(t);}catch(e){}}
function warn(e){try{console.warn("Ingenium R333:",e&&e.message||e);}catch(_){}}
function save(){try{W.saveState();}catch(e){}}
function here(){return !!(W.IngRepo&&W.fbHub&&D.getElementById("page-fabrica"));}
function short(o){return String(o||"").slice(0,7);}
function ask(o){try{if(typeof W.ingAsk==="function")return Promise.resolve(W.ingAsk(o));}catch(e){}return Promise.resolve(W.confirm(o.title+"\n\n"+(o.text||"")));}
function proj(){try{return typeof W.ccProj==="function"?W.ccProj():null;}catch(e){return null;}}
function chat(){try{return typeof W.curChat==="function"?W.curChat():null;}catch(e){return null;}}
function isCode(c){try{return !!(c&&typeof W.ccIsCode==="function"&&W.ccIsCode(c));}catch(e){return false;}}
var te=new TextEncoder(),td=new TextDecoder();
var TEXT=/\.(html?|css|js|mjs|cjs|jsx|ts|tsx|json|md|markdown|txt|svg|xml|ya?ml|toml|ini|cfg|py|rb|go|rs|java|kt|swift|c|h|cpp|hpp|cs|sh|bat|ps1|gradle|properties|csv|tsv|webmanifest|gitignore|gitattributes|license|lock)$/i;
function textual(path,u8){if(TEXT.test(path)||!/\.[^/]+$/.test(path.split("/").pop()))for(var i=0,n=Math.min(u8.length,8000);i<n;i++){if(u8[i]===0)return false;}else return false;return true;}
var LIM=4*1048576;

/* ---------- the git name of a text, as the engine names its blobs, to know what changed without reading Fabrica again ---------- */
function blobOid(text){var b=te.encode(String(text)),h=te.encode("blob "+b.length+"\0"),u=new Uint8Array(h.length+b.length);u.set(h,0);u.set(b,h.length);
  return Promise.resolve(IngRepo.core.sha1(u));}
function slug(t){return String(t||"").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"session";}
function okBranch(v){try{return IngRepo.core.okRefName(v);}catch(e){return /^[A-Za-z0-9._\/-]+$/.test(v);}}

/* ================= 0. Fabrica's own sheet, outside Fabrica ================= */
/* Her words on the stage 1 preview (19 November 2026): "I want you to actually use Fabrica's actual template and designs for this panel so
   that everything stays cohesive and consistent." Fabrica's look is written for its frame, #fb (its tokens by day and by night, its sheet,
   option rows, keys, segmented rows, fields, its Changes view and diff). These panels open over Code and Chat, outside that frame, so
   Fabrica's own rules are taken from the page as they stand, once, for a frame of the same kind (.fbx), and the panels are built with
   Fabrica's own parts and markup (f-sheet-wrap, f-sheet, f-x, f-opt, f-seg, f-field, f-files, f-frow, f-diff, f-dcode, f-dl, f-btn). */
var FBX=false;
function fbxStyles(){if(FBX)return;FBX=true;var out=[],frame=[];
  /* 7.46: a selector is split only at its own commas, never at those inside :is(), :where(), :not() or [ ]; split at every comma, a rule of
     Fabrica's such as "#fb :is(li,div):has(> .m)" (modules/r315.js) came out as ".fbx :is(li{...}", and that open bracket swallowed the
     rules after it, the frame's own among them: the sheet then lay at the foot of the page instead of over it */
  function parts(sel){var o=[],d=0,cur="";for(var i=0;i<sel.length;i++){var ch=sel.charAt(i);if(ch==="("||ch==="[")d++;else if((ch===")"||ch==="]")&&d>0)d--;
      if(ch===","&&d===0){o.push(cur);cur="";}else cur+=ch;}o.push(cur);return o;}
  function rw(sel){return parts(sel).filter(function(x){return x.indexOf("#fb")>=0;}).map(function(x){return x.replace(/#fb(?![\w-])/g,".fbx");}).join(",");}
  function walk(list,wrap){for(var i=0;i<list.length;i++){var r=list[i];
      if(r.type===4||r.type===12){var t=r.cssText;walk(r.cssRules,wrap.concat([t.slice(0,t.indexOf("{")).trim()]));continue;}
      if(r.type!==1||!r.selectorText||r.selectorText.indexOf("#fb")<0)continue;var s=rw(r.selectorText);if(!s)continue;
      var c=s+"{"+r.style.cssText+"}";for(var j=wrap.length-1;j>=0;j--)c=wrap[j]+"{"+c+"}";out.push(c);}}
  [].forEach.call(D.styleSheets,function(sh){try{walk(sh.cssRules,[]);}catch(e){}});
  /* the frame itself lies over the window, with no film, and holds only the sheet (7.46: in a style of its own, which no copied rule can touch) */
  frame.push("html body .fbx.r333x{position:fixed!important;inset:0!important;z-index:2147481000!important;display:block!important;height:auto!important;min-height:0!important;padding:0!important;margin:0!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:hidden}");
  frame.push("html body .fbx.r333x .f-sheet-wrap{position:absolute;inset:0;border-radius:0;background:transparent!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}");
  frame.push("html body .fbx.r333x .f-sheet{width:min(600px,calc(100vw - 32px));max-height:calc(100vh - 48px)}");
  frame.push("html body .fbx.r333x .r333-list{display:flex;flex-direction:column;gap:0;margin:10px 0 4px}");
  frame.push("html body .fbx.r333x .r333-keys{display:flex;justify-content:flex-end;gap:8px;margin-top:12px;flex-wrap:wrap}");
  frame.push("html body .fbx.r333x .f-seg{margin:6px 0 4px}");
  frame.push("html body .fbx.r333x .f-note:empty{display:none}");
  var st=D.createElement("style");st.id="r333-fbx";st.textContent=out.join("\n");D.head.appendChild(st);
  var fr=D.createElement("style");fr.id="r333-fbx-frame";fr.textContent=frame.join("\n");D.head.appendChild(fr);}
function fsheet(title,lead){fbxStyles();var old=D.querySelector(".fbx.r333x");if(old)old.remove();
  var root=mk("div","fbx r333x"),wrap=mk("div","f-sheet-wrap"),s=mk("div","f-sheet");s.setAttribute("role","dialog");s.setAttribute("aria-modal","true");
  s.innerHTML="<h3>"+esc(title)+"</h3>"+(lead?"<p>"+esc(lead)+"</p>":"");wrap.appendChild(s);root.appendChild(wrap);
  try{if(D.body.getAttribute("data-theme"))root.setAttribute("data-theme",D.body.getAttribute("data-theme"));}catch(e){}
  D.body.appendChild(root);
  var sh={root:root,wrap:wrap,box:s,close:function(){root.remove();}};
  var x=mk("button","f-x","✕");x.type="button";x.title="Close";x.setAttribute("aria-label","Close");x.onclick=function(){sh.close();};s.appendChild(x);
  wrap.onclick=function(e){if(e.target===wrap)sh.close();};wrap.tabIndex=-1;wrap.addEventListener("keydown",function(e){if(e.key==="Escape"){e.stopPropagation();sh.close();}});
  setTimeout(function(){try{wrap.focus({preventScroll:true});}catch(e){}},30);return sh;}
function fopt(ic,title,small,on){var b=mk("button","f-opt");b.type="button";b.innerHTML='<span class="ic">'+esc(ic)+'</span><span><b>'+esc(title)+'</b><small>'+esc(small)+'</small></span>';b.onclick=on;return b;}
function fbtn(cls,label,on){var b=mk("button","f-btn"+(cls?" "+cls:""),label);b.type="button";b.onclick=on;return b;}
function fseg(names,cur,on){var g=mk("div","f-seg");g.setAttribute("role","tablist");var th=mk("span","f-thumb");g.appendChild(th);
  names.forEach(function(n){var b=mk("button",null,n[1]);b.type="button";b.setAttribute("role","tab");b.setAttribute("data-t",n[0]);b.onclick=function(){set(n[0]);on(n[0]);};g.appendChild(b);});
  function set(t){[].forEach.call(g.querySelectorAll("button"),function(b){var y=b.getAttribute("data-t")===t;b.setAttribute("aria-selected",y?"true":"false");if(y){b.classList.add("on");setTimeout(function(){th.style.left=b.offsetLeft+"px";th.style.width=b.offsetWidth+"px";},0);}else b.classList.remove("on");});}
  setTimeout(function(){set(cur);},0);return g;}
function ffield(label,el){var f=mk("label","f-field");f.appendChild(mk("span",null,label));f.appendChild(el);return f;}
function letter(n){return String(n||"?").replace(/^[^A-Za-z0-9]+/,"").charAt(0).toUpperCase()||"⑂";}

/* ================= 1. the picker: A repository ================= */
function ghSigned(){try{return !!(W.state&&state.github&&state.github.token);}catch(e){return false;}}
function ghRepos(){if(!ghSigned()||!W.IngGitHubCode||typeof IngGitHubCode.api!=="function")return Promise.resolve(null);
  return IngGitHubCode.api("/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator").then(function(x){var d=x&&x.data;return Array.isArray(d)?d:[];},function(){return null;});}
function pick(o){o=o||{};var into=o.into||"code";
  var sh=fsheet("A repository",into==="chat"?"This conversation reads it: its files, as the model needs them. Continue in Code makes changes, on a branch of their own.":"Code works on it on a branch of its own. Nothing joins the branch it starts from until you say yes to a pull request.");
  sh.root.classList.add("r333-pick");var list=mk("div","r333-list");list.id="r333List";
  sh.box.appendChild(fseg([["fabrica","Fabrica"],["github","GitHub"]],o.tab||"fabrica",function(t){list.innerHTML="";if(t==="fabrica")fabRows(list,into);else ghRows(list,into);}));
  sh.box.appendChild(list);if((o.tab||"fabrica")==="fabrica")fabRows(list,into);else ghRows(list,into);return sh;}
function fabRows(host,into){host.appendChild(mk("div","f-empty","Reading Fabrica…"));IngRepo.list().then(function(rs){host.innerHTML="";rs=rs||[];
    if(!rs.length){host.appendChild(mk("div","f-empty","No apps in Fabrica yet. Start one there, or keep one from Chat or Code with Keep in Fabrica."));return;}
    rs.forEach(function(r){host.appendChild(fopt(letter(r.name),r.name,(IngRepo.isDisk(r.id)?"On your drive":"Kept in Ingenium")+(r.branch?" · "+r.branch:"")+(r.branches&&r.branches.length>1?" · "+r.branches.length+" branches":""),function(){branchSheet(r,into);}));});})
  .catch(function(e){host.innerHTML="";host.appendChild(mk("div","f-empty",String(e&&e.message||e)));});}
function ghRows(host,into){if(!ghSigned()){host.appendChild(mk("div","f-empty","Sign in to GitHub once, with a token made on GitHub; it is kept on this device and sent only to GitHub."));
    var k=mk("div","r333-keys");k.appendChild(fbtn("pri","Sign in to GitHub",function(){var s=D.querySelector(".fbx.r333x");if(s)s.remove();try{IngGitHubCode.connect();}catch(e){toast("GitHub is not in this copy.");}}));host.appendChild(k);return;}
  host.appendChild(mk("div","f-empty","Reading your repositories on GitHub…"));
  ghRepos().then(function(rs){host.innerHTML="";if(!rs){host.appendChild(mk("div","f-empty","GitHub could not be reached just now."));return;}
    rs.forEach(function(g){host.appendChild(fopt(letter(g.name),g.full_name,(g.private?"Private":"Public")+" · "+(g.default_branch||"main"),function(){var s=D.querySelector(".fbx.r333x");if(s)s.remove();
        if(into==="chat"){tieChat({kind:"github",full:g.full_name,owner:g.owner&&g.owner.login,repo:g.name,branch:g.default_branch||"main"});return;}
        try{IngGitHubCode.connect({owner:g.owner&&g.owner.login,repo:g.name});}catch(e){try{IngGitHubCode.connect();}catch(_){}}}));});}).catch(warn);}
function branchSheet(r,into){IngRepo.info(r.id).then(function(info){var bs=(info.branches||[]).slice().sort(function(a,b){return a===info.branch?-1:b===info.branch?1:a.localeCompare(b);});
  var sh=fsheet(info.name,into==="chat"?"Start from the branch this conversation reads.":"Start from the branch the session begins from. Its work goes to a branch of its own.");
  var host=mk("div","r333-list");host.id="r333Br";sh.box.appendChild(host);
  bs.forEach(function(b){host.appendChild(fopt("⑂",b,b===info.branch?"Out in Fabrica now":"A branch",function(){sh.close();if(into==="chat")tieChat({kind:"fabrica",repo:r.id,name:info.name,branch:b});else openFab(r.id,b);}));});
  var k=mk("div","r333-keys");k.appendChild(fbtn("quiet","Back",function(){pick({into:into});}));sh.box.appendChild(k);}).catch(function(e){toast(String(e&&e.message||e));});}


/* ================= 2. Code on a Fabrica app, on a branch of its own ================= */
function readBranch(id,branch){return IngRepo.files(id,branch).then(function(list){var files=[],left=[],map={},chain=Promise.resolve();
  (list||[]).forEach(function(f){chain=chain.then(function(){if(f.size!=null&&f.size>LIM){left.push(f.path);map[f.path]="~"+f.oid;return;}
    return IngRepo.read(id,f.path,branch).then(function(b){if(b&&textual(f.path,b)&&b.length<=LIM){files.push({name:f.path,text:td.decode(b)});map[f.path]=f.oid;}else{left.push(f.path);map[f.path]="~"+f.oid;}});});});
  return chain.then(function(){return {files:files,left:left,map:map};});});}
function mainOf(files){var h=files.filter(function(f){return /\.html?$/i.test(f.name)&&f.name.indexOf("/")<0;});return ((h.filter(function(f){return /^index\.html?$/i.test(f.name);})[0]||h[0]||files[0])||{}).name||"";}
function openFab(id,branch){if(typeof W.ccMakeProject!=="function"||typeof W.ccNewSession!=="function"){toast("Code is not in this copy.");return Promise.resolve(null);}
  toast("Opening its "+branch+" in Code…");
  return Promise.all([IngRepo.info(id),IngRepo.resolve(id,branch),readBranch(id,branch)]).then(function(x){var info=x[0],oid=x[1],rb=x[2];
    return W.ccMakeProject(info.name,rb.files,mainOf(rb.files)).then(function(p){
      p.fab={repo:id,name:info.name,base:branch,baseOid:oid,work:null,head:null,pr:null,map:rb.map,left:rb.left,at:Date.now()};save();
      W.ccNewSession(p);try{W.go("code");}catch(e){}if(rb.left.length)setTimeout(function(){toast(rb.left.length+" of its files are not text or are over 4 MB: they stay in Fabrica as they are.");},900);return p;});})
  .catch(function(e){toast(String(e&&e.message||e));return null;});}
function loadAll(pr){return Promise.resolve(typeof W.ccLoadAll==="function"?W.ccLoadAll(pr):null);}
/* what differs from the branch it began from (the session's branch, once something is kept there) */
function changes(pr){var F=pr&&pr.fab;if(!F)return Promise.resolve(null);
  return loadAll(pr).then(function(){var now={},out=[];(pr.files||[]).forEach(function(f){if(typeof f.text==="string")now[f.name]=f.text;});
    var known=F.kept||F.map,names={},k;for(k in known)names[k]=1;for(k in now)names[k]=1;
    return Promise.all(Object.keys(names).sort().map(function(p){var was=known[p];if(was&&String(was).charAt(0)==="~")return null;
      if(!(p in now))return was?{path:p,how:"taken away",data:null}:null;
      return blobOid(now[p]).then(function(o){if(o===was)return null;return {path:p,how:was?"changed":"new",data:now[p]};});})).then(function(l){l.forEach(function(x){if(x)out.push(x);});return out;});});}
function baseText(pr,path){var F=pr.fab,ref=F.head||F.baseOid;return IngRepo.readText(F.repo,path,ref).then(function(t){return t||"";},function(){return "";});}
function diffOf(pr,path){var e=(pr.files||[]).filter(function(f){return f.name===path;})[0],now=e&&typeof e.text==="string"?e.text:"";
  return baseText(pr,path).then(function(was){var u="",add=0,del=0;try{var C=IngRepo.core,hs=C.hunks(C.splitLines(was),C.splitLines(now));u=hs.length?C.unified(path,was,now,hs,!e?"removed":(was?"":"added")):"";}catch(x){u="";}
    String(u).split("\n").forEach(function(l){if(l.charAt(0)==="+"&&l.indexOf("+++")!==0)add++;else if(l.charAt(0)==="-"&&l.indexOf("---")!==0)del++;});return {text:u,add:add,del:del};});}
function workBranch(pr){var F=pr.fab;if(F.work)return F.work;var c=chat(),t=c&&c.title&&c.title!=="New session"?c.title:"";return "ingenium/"+slug(t||F.name);}
function keep(pr,message,o){o=o||{};var F=pr&&pr.fab;if(!F)return Promise.reject(new Error("This session's app is not one of Fabrica's."));
  return changes(pr).then(function(ch){if(!ch.length){var e=new Error("Nothing to keep: every change is already on "+(F.work||F.base)+".");e.nothing=true;throw e;}
    var br=o.branch||F.work||workBranch(pr);if(br===F.base)throw new Error("Keep the work on a branch of its own, not on "+F.base+" itself.");
    return IngRepo.commitTo(F.repo,br,ch.map(function(x){return {path:x.path,data:x.data};}),String(message||"").trim()||"Work from Code",{from:F.baseOid}).then(function(oid){
      var kept={},p;for(p in (F.kept||F.map))kept[p]=(F.kept||F.map)[p];
      return Promise.all(ch.map(function(x){if(x.data==null){delete kept[x.path];return null;}return blobOid(x.data).then(function(o2){kept[x.path]=o2;});})).then(function(){
        F.work=br;F.head=oid;F.kept=kept;F.keptAt=Date.now();save();paint();
        try{fbHub.kept(F.repo,oid);}catch(e){}return {oid:oid,branch:br,files:ch};});});});}
function pullRequest(pr,o){o=o||{};var F=pr.fab;if(!F.head)return Promise.reject(new Error("Keep the work first: a pull request brings a kept version into "+F.base+"."));
  return fbHub.newPull(F.repo,{from:F.work,to:F.base,title:o.title,body:o.body,session:{chat:(chat()||{}).id||null,at:Date.now()}}).then(function(it){F.pr={n:it.n,state:it.state||"open"};save();paint();return it;});}
function prState(pr){var F=pr&&pr.fab;if(!F||!F.pr)return Promise.resolve(null);return fbHub.live(F.repo).then(function(rec){var it=(rec.pulls||[]).filter(function(x){return x.n===F.pr.n;})[0];
  if(it&&it.state!==F.pr.state){F.pr.state=it.state;save();}return it||null;},function(){return null;});}
/* newer work on the branch it began from, brought into the files she has not changed */
function update(pr){var F=pr.fab;return IngRepo.resolve(F.repo,F.base).then(function(now){if(!now||now===F.baseOid)return {same:true};
  return Promise.all([changes(pr),readBranch(F.repo,F.base)]).then(function(x){var mine={},kept=[],came=0,q=Promise.resolve();x[0].forEach(function(c){mine[c.path]=1;});
    var files=x[1].files,have={};(pr.files||[]).forEach(function(f){have[f.name]=f;});
    files.forEach(function(f){if(mine[f.name]){kept.push(f.name);return;}var e=have[f.name];if(e&&e.text===f.text)return;came++;
      if(e)q=q.then(function(){return W.ccPut(e,f.text);});else{var nf={name:f.name,ref:null,size:0};pr.files.push(nf);q=q.then(function(){return W.ccPut(nf,f.text);});}});
    return q.then(function(){if(!F.head){F.baseOid=now;var m={},p;for(p in x[1].map)m[p]=x[1].map[p];kept.forEach(function(k){if(F.map[k])m[k]=F.map[k];});F.map=m;}save();return {came:came,kept:kept};});});});}

/* ================= 4. Review and keep: Fabrica's own Changes view (f-files, f-frow, f-diff), in Fabrica's sheet ================= */
function hunksOf(was,now){try{var C=IngRepo.core;return C.hunks(C.splitLines(was),C.splitLines(now));}catch(e){return [];}}
function diffEl(path,how,was,now){var dv=mk("div","f-diff");dv.innerHTML='<div class="f-diff-h"><b>'+esc(path)+'</b><span>'+esc(how==="taken away"?"taken away":how==="new"?"a new file":"what changed")+"</span></div>";
  var pre=mk("pre","f-dcode"),hs=hunksOf(was,now);if(!hs.length)pre.appendChild(mk("div","f-dl hunk","No lines differ."));
  hs.forEach(function(hk){pre.appendChild(mk("div","f-dl hunk","lines "+(hk.b0+1).toLocaleString("en-GB")+" to "+(hk.b0+hk.bN).toLocaleString("en-GB")));var la=hk.a0,lb=hk.b0;
    hk.lines.forEach(function(l){var d=mk("div","f-dl"+(l[0]==="+"?" add":l[0]==="-"?" del":""));var num=l[0]==="-"?(++la):(++lb);if(l[0]===" ")la++;d.innerHTML="<i>"+num.toLocaleString("en-GB")+"</i><s>"+(l[0]===" "?"":l[0]==="+"?"+":"−")+"</s>"+esc(l[1]);pre.appendChild(d);});});
  dv.appendChild(pre);return dv;}
function keepSheet(pr){var F=pr.fab;changes(pr).then(function(ch){if(!ch.length){toast("Nothing to keep: every change is already on "+(F.work||F.base)+".");return;}
  var sh=fsheet("Review and keep",ch.length+" file"+(ch.length===1?"":"s")+" go to the branch "+(F.work||workBranch(pr))+" of "+F.name+", as one version. "+F.base+" itself is not changed.");sh.root.classList.add("r333-keep");
  var list=mk("div","f-files");list.id="r333F";var hold=mk("div");sh.box.appendChild(list);sh.box.appendChild(hold);var texts={};
  function show(i){[].forEach.call(list.children,function(r,j){r.setAttribute("aria-pressed",j===i?"true":"false");});var c=ch[i],t=texts[c.path]||{was:"",now:""};hold.innerHTML="";hold.appendChild(diffEl(c.path,c.how,t.was,t.now));}
  Promise.all(ch.map(function(c){var e=(pr.files||[]).filter(function(f){return f.name===c.path;})[0];return baseText(pr,c.path).then(function(was){texts[c.path]={was:was,now:e&&typeof e.text==="string"?e.text:""};});})).then(function(){
    ch.forEach(function(c,i){var t=texts[c.path],add=0,del=0;hunksOf(t.was,t.now).forEach(function(hk){hk.lines.forEach(function(l){if(l[0]==="+")add++;else if(l[0]==="-")del++;});});
      var row=mk("button","f-frow");row.type="button";row.innerHTML='<span class="p">'+esc(c.path)+'</span><span class="k '+(c.how==="new"?"added":c.how==="taken away"?"removed":"modified")+'">'+esc(c.how)+'</span><span class="c"><span class="a">+'+add+'</span> <span class="r">−'+del+'</span></span>';
      row.onclick=function(){show(i);};list.appendChild(row);});show(0);});
  var bn=null;if(!F.work){bn=mk("input");bn.type="text";bn.id="r333Br";bn.maxLength=120;bn.value=workBranch(pr);sh.box.appendChild(ffield("The branch it goes to (new)",bn));}
  var msg=mk("textarea");msg.id="r333Msg";var c=chat();msg.value=(c&&c.title&&c.title!=="New session"?c.title:"Work from Code")+"\n\n"+ch.map(function(x){return "- "+x.how+": "+x.path;}).join("\n");sh.box.appendChild(ffield("What this version is",msg));
  var say=mk("div","f-note");say.id="r333Say";say.setAttribute("role","status");sh.box.appendChild(say);
  var keys=mk("div","r333-keys"),go=fbtn("pri","Keep this version",function(){var br=null;if(bn){br=bn.value.trim();if(!okBranch(br)){say.textContent="A branch name has letters, digits, dots, dashes and slashes, with no spaces, and does not start or end with a slash.";bn.focus();return;}
      if(br===F.base){say.textContent="Keep it on a branch of its own, not on "+F.base+" itself.";bn.focus();return;}}
    go.disabled=true;say.textContent="Keeping the version…";keep(pr,msg.value,{branch:br}).then(function(r){sh.close();toast("Kept "+r.files.length+" file"+(r.files.length===1?"":"s")+" on "+r.branch+" ("+short(r.oid)+").");
      if(!F.pr)setTimeout(function(){prSheet(pr);},150);},function(e){go.disabled=false;say.textContent=e&&e.message||String(e);});});go.id="r333Go";keys.appendChild(go);sh.box.appendChild(keys);}).catch(function(e){toast(String(e&&e.message||e));});}
function prSheet(pr){var F=pr.fab;if(!F.head){toast("Keep the work first.");return;}var c=chat();
  var sh=fsheet("Create pull request","Asks "+F.name+" to bring "+F.work+" into "+F.base+". It waits in Fabrica, under your Rules before main, until you say yes there.");sh.root.classList.add("r333-pr");
  var t=mk("input");t.type="text";t.id="r333T";t.maxLength=240;t.value=(c&&c.title&&c.title!=="New session"?c.title:"Work from "+F.work);sh.box.appendChild(ffield("Title",t));
  var b=mk("textarea");b.id="r333B";b.value="Made in a Code session, on "+F.work+".";sh.box.appendChild(ffield("What it does and why",b));
  var say=mk("div","f-note");say.setAttribute("role","status");sh.box.appendChild(say);
  var keys=mk("div","r333-keys"),go=fbtn("pri","Create pull request",function(){go.disabled=true;say.textContent="Opening it in Fabrica…";pullRequest(pr,{title:t.value,body:b.value}).then(function(it){sh.close();toast("Pull request #"+it.n+" waits for you in Fabrica.");},function(e){go.disabled=false;say.textContent=e&&e.message||String(e);});});
  go.id="r333G2";keys.appendChild(go);sh.box.appendChild(keys);}

function openPr(pr){var F=pr.fab;if(!F||!F.pr)return;try{W.go("fabrica");}catch(e){}setTimeout(function(){try{if(W.fbSelect)W.fbSelect(F.repo);}catch(e){}try{fbHub.open("pulls",{n:F.pr.n});}catch(e){}},400);}

/* ================= the Environment row and the session's top keys ================= */
function codeHere(){try{return W.CC&&CC.mode==="code"&&isCode(chat());}catch(e){return false;}}
var PAINT={n:0,busy:false,sig:""};
function topKeys(){var bar=$("ccCodeBar")||$("ccpKeys");if(!bar)return null;var k=$("r333Top");if(!k){k=mk("button","chat-top-key r333-k");k.type="button";k.id="r333Top";k.hidden=true;bar.appendChild(k);
    k.onclick=function(){var pr=proj();if(!pr||!pr.fab)return;if(PAINT.n)keepSheet(pr);else if(pr.fab.pr)openPr(pr);else if(pr.fab.head)prSheet(pr);};}return k;}
function paint(){var pr=proj(),F=pr&&pr.fab,k=topKeys();
  /* r312's Keep in Fabrica would make a version on the branch out: a session on a branch of its own keeps through Review and keep */
  try{[].forEach.call(D.querySelectorAll("#ccCodeBar .r312-k"),function(b){if(/Keep in Fabrica/.test(b.textContent))b.hidden=!!F;});}catch(e){}
  if(k){if(!F||!codeHere())k.hidden=true;}
  envRow(pr);if(!F||!k||!codeHere())return;if(PAINT.busy)return;PAINT.busy=true;
  changes(pr).then(function(ch){PAINT.busy=false;PAINT.n=ch.length;var lab;
    if(PAINT.n){lab="⑂ Review and keep<span class=\"ghx-n\">"+PAINT.n+"</span>";k.title=PAINT.n+" file"+(PAINT.n===1?"":"s")+" to keep on "+(F.work||"a branch of their own");}
    else if(F.pr){lab="⇄ Pull request #"+F.pr.n+(F.pr.state==="merged"?" merged":F.pr.state==="closed"?" closed":"");k.title="Open pull request #"+F.pr.n+" in Fabrica";}
    else if(F.head){lab="⇄ Create pull request";k.title="Ask "+F.name+" to bring "+F.work+" into "+F.base;}
    else{k.hidden=true;return;}
    k.innerHTML=lab;k.hidden=false;},function(){PAINT.busy=false;});
  if(F.pr)prState(pr);}
function envRow(pr){var h=$("ccPanel");if(!h)return;var env=h.querySelector('[data-sec="session"] .ccp-in');if(!env)return;var old=env.querySelector(".r333-env");
  var F=pr&&pr.fab;if(!F||!codeHere()){if(old)old.remove();return;}
  var box=old||mk("div","ghx-box r333-env");if(!old)env.insertBefore(box,env.firstChild);
  box.innerHTML='<div class="ghx-row"><span class="ic">⑂</span><span class="tx"><b>'+esc(F.name)+'</b> in Fabrica · from <b>'+esc(F.base)+'</b> at '+esc(short(F.baseOid))+'</span></div>'
    +'<div class="ghx-row"><span class="ic">↳</span><span class="tx">'+(F.work?'Its own branch: <b>'+esc(F.work)+'</b>'+(F.head?', last kept '+esc(short(F.head)):''):'Its own branch is named at the first keep')+'</span></div>'
    +(F.pr?'<div class="ghx-row"><span class="ic">⇄</span><span class="tx">Pull request #'+F.pr.n+' · '+esc(F.pr.state)+'</span></div>':'');
  var keys=mk("div","ghx-keys");[["Review and keep",function(){keepSheet(pr);}],["Update from Fabrica",function(){update(pr).then(function(r){if(r.same)toast(F.base+" has nothing newer.");else toast(r.came+" file"+(r.came===1?"":"s")+" came from "+F.base+(r.kept.length?"; yours kept as they are: "+r.kept.slice(0,4).join(", "):"")+".");paint();},function(e){toast(String(e&&e.message||e));});}]]
    .forEach(function(x){var b=mk("button","btn small ghost",x[0]);b.type="button";b.onclick=function(e){e.stopPropagation();x[1]();};keys.appendChild(b);});box.appendChild(keys);}
function wrapHead(){var o=W.ccPaintHead;if(typeof o!=="function"||o.__r333)return;var f=function(){var r=o.apply(this,arguments);try{paint();}catch(e){warn(e);}return r;};
  try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}f.__r333=1;W.ccPaintHead=f;try{ccPaintHead=f;}catch(e){}}
var tick=null;function watch(){if(tick)return;tick=setInterval(function(){try{if(codeHere()&&proj()&&proj().fab)paint();}catch(e){}},4000);}

/* ================= 1b. the doors: Code's start window, and the + menu of Chat ================= */
function wrapWelcome(){var o=W.ccWelcome;if(typeof o!=="function"||o.__r333)return;
  var f=function(){var r=o.apply(this,arguments);try{var st=D.querySelector("#modalBox .cc-start");if(st&&here()){
      var fb=st.querySelector('[data-a="fabrica"]');if(fb&&!fb.__r333){fb.__r333=1;fb.innerHTML="<b>From Fabrica</b><span>One of your apps, on the branch you choose: the work goes to a branch of its own, then into a pull request that waits for your yes.</span>";
        fb.onclick=function(e){e.stopPropagation();W.closeModal();setTimeout(function(){pick({into:"code",tab:"fabrica"});},0);};}}}catch(e){warn(e);}return r;};
  try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}f.__r333=1;W.ccWelcome=f;try{ccWelcome=f;}catch(e){}}
function wrapPlus(){var o=W.paintPlus;if(typeof o!=="function"||o.__r333)return;
  var f=function(view){var res=o.apply(this,arguments);
    try{if(!view&&here()){var mm=$("chatPlusMenu");if(mm&&!mm.querySelector(".r333-pm")){var c=chat(),R=c&&c.repo;
        var it=W.pmItem(mm,"file",R?"The repository: "+(R.full||R.name):"A repository",R?"Change, or Continue in Code":"Fabrica or GitHub · this conversation reads it",function(){try{if(typeof W.closePlus==="function")W.closePlus();}catch(e){}if(R)repoSheet(c);else pick({into:"chat"});},'<span class="pm-arw">›</span>');
        it.classList.add("r333-pm");var after=mm.querySelector(".r312-pm");if(after&&after.nextSibling)mm.insertBefore(it,after.nextSibling);}}}catch(e){warn(e);}return res;};
  try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}f.__r333=1;W.paintPlus=f;try{paintPlus=f;}catch(e){}}

/* ================= 5. Chat on a repository ================= */
function tieChat(R){var c=chat();if(!c){toast("Open a conversation first.");return;}if(isCode(c)){toast("In Code, a repository is opened from its start window.");return;}
  c.repo=R;save();toast("This conversation reads "+(R.full||R.name)+", "+R.branch+". Continue in Code, from the + menu, to change it.");}
function repoSheet(c){var R=c.repo;var sh=fsheet(R.full||R.name,"This conversation reads it, on "+R.branch+". The model looks at its files as it needs them, and changes nothing. Continue in Code opens a Code session on it, whose work goes to a branch of its own.");
  var host=mk("div","r333-list");sh.box.appendChild(host);
  host.appendChild(fopt("‹›","Continue in Code","A Code session on "+R.branch+", its work on a branch of its own",function(){sh.close();if(R.kind==="fabrica")openFab(R.repo,R.branch);else{try{IngGitHubCode.connect({owner:R.owner,repo:R.repo,branch:R.branch});}catch(e){toast("GitHub is not in this copy.");}}}));
  host.appendChild(fopt("⑂","Another repository","Fabrica or GitHub",function(){pick({into:"chat"});}));
  host.appendChild(fopt("✕","Let it go","This conversation no longer reads a repository",function(){delete c.repo;save();sh.close();toast("This conversation no longer reads a repository.");}));}

function chatRepo(){var c=chat();return c&&!isCode(c)&&c.repo?c.repo:null;}
function repoList(R){if(R.kind==="fabrica")return IngRepo.files(R.repo,R.branch).then(function(l){return (l||[]).map(function(f){return {path:f.path,size:f.size};});});
  return IngGitHubCode.api("/repos/"+encodeURIComponent(R.owner)+"/"+encodeURIComponent(R.repo)+"/git/trees/"+encodeURIComponent(R.branch)+"?recursive=1").then(function(x){x=x&&x.data;return ((x&&x.tree)||[]).filter(function(t){return t.type==="blob";}).map(function(t){return {path:t.path,size:t.size};});});}
function repoRead(R,path){if(R.kind==="fabrica")return IngRepo.read(R.repo,path,R.branch).then(function(b){if(!b)return null;if(!textual(path,b))return "(not a text file: "+b.length+" bytes)";return td.decode(b.length>LIM?b.subarray(0,LIM):b);});
  return IngGitHubCode.api("/repos/"+encodeURIComponent(R.owner)+"/"+encodeURIComponent(R.repo)+"/contents/"+String(path).split("/").map(encodeURIComponent).join("/")+"?ref="+encodeURIComponent(R.branch)).then(function(x){x=x&&x.data;if(!x||!x.content)return null;
    var bin=atob(String(x.content).replace(/\s+/g,"")),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return textual(path,u)?td.decode(u):"(not a text file: "+u.length+" bytes)";});}

/* ================= 3. the model: told where it works, and given its tools ================= */
(function wrapSys(){var o=W.chatSystemPrompt;if(typeof o!=="function"||o.__r333)return;var f=function(){var s=o.apply(this,arguments);try{var c=chat();
    if(isCode(c)){var pr=proj(),F=pr&&pr.fab;if(!F)return s;
      var t="This Code session works on "+F.name+", one of her apps in Fabrica (Ingenium's own repositories, on this device), begun from the branch "+F.base+" at "+short(F.baseOid)+"."
        +" Your changes stay here until they are kept, as one version, on the session's own branch "+(F.work||"ingenium/…")+" (never on "+F.base+"): she keeps them with Review and keep, or you do with keep_version when she asks you to."
        +" A pull request into "+F.base+" is opened only with her yes (fabrica_pull_request), and it waits in Fabrica for her yes again. fabrica_status shows what differs; fabrica_diff shows one file's differences."
        +" Never say that you kept a version or opened a pull request unless the tool said it was done.";
      return s?s+"\n\n"+t:t;}
    var R=c&&c.repo;if(!R)return s;var t2="This conversation reads the repository "+(R.full||R.name)+" ("+(R.kind==="fabrica"?"one of her apps in Fabrica, on this device":"on GitHub")+"), branch "+R.branch+". repo_files lists its files; repo_read reads one. You change nothing here: to change it, she presses Continue in Code (in the + menu), where the work goes to a branch of its own.";
    return s?s+"\n\n"+t2:t2;}catch(e){return s;}};
  try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}f.__r333=1;W.chatSystemPrompt=f;try{chatSystemPrompt=f;}catch(e){}})();
function inFab(){var c=chat();if(!isCode(c))return false;var pr=proj();return !!(pr&&pr.fab);}
var TOOLS=false;
function addTools(){var A=W.IngAgent;if(TOOLS||!A||typeof A.addTool!=="function")return false;TOOLS=true;
  A.addTool({name:"fabrica_status",description:"For a Code session on one of her apps in Fabrica: the files that differ from the branch the session began from (or from its last kept version), with the branch names and the pull request's state.",input_schema:{type:"object",properties:{},required:[]}},
    function(){var pr=proj(),F=pr.fab;return changes(pr).then(function(ch){var l=["App "+F.name+" in Fabrica, from "+F.base+" at "+short(F.baseOid)+(F.work?", session branch "+F.work:"")+(F.head?", last kept "+short(F.head):"")+(F.pr?", pull request #"+F.pr.n+" ("+F.pr.state+")":"")+"."];
      l.push(ch.length?"Not yet kept ("+ch.length+"): "+ch.map(function(x){return x.how+" "+x.path;}).join("; ")+".":"Nothing waits to be kept.");return {text:l.join("\n"),step:{i:"⑂",t:"Looked at what differs in Fabrica · "+ch.length+" to keep"}};});},{ro:true,when:inFab});
  A.addTool({name:"fabrica_diff",description:"For a Code session on one of her apps in Fabrica: one file's differences from the branch the session began from (or its last kept version), as a unified diff.",input_schema:{type:"object",properties:{file:{type:"string"}},required:["file"]}},
    function(ws,a){var pr=proj();var p=String(a&&a.file||"").replace(/^\.?\/+/,"");return diffOf(pr,p).then(function(d){var t=d.text.length>24000?d.text.slice(0,24000)+"\n[… the rest left out]":d.text;
      return {text:d.add||d.del?t:"No difference in "+p+".",step:{i:"±",t:"Looked at the differences in "+p+" · +"+d.add+" −"+d.del}};});},{ro:true,when:inFab});
  A.addTool({name:"keep_version",description:"For a Code session on one of her apps in Fabrica: keep every change not yet kept as one version, with this message, on the session's own branch (never the branch it began from). Use it when she asks to keep, commit or save the work.",
      input_schema:{type:"object",properties:{message:{type:"string",description:"A short first line (at most 72 characters), then a blank line and what changed and why."}},required:["message"]}},
    function(ws,a){var pr=proj();return keep(pr,a.message).then(function(r){return {text:"Kept "+r.files.length+" file(s) on "+r.branch+" as version "+r.oid+".",step:{i:"↑",t:"Kept "+r.files.length+" file"+(r.files.length===1?"":"s")+" on "+r.branch+" ("+short(r.oid)+")"}};},
      function(e){if(e&&e.nothing)return {text:"Nothing to keep: every change is already kept.",step:{i:"↑",t:"Nothing to keep"}};throw e;});},{ro:false,when:inFab});
  A.addTool({name:"fabrica_pull_request",description:"For a Code session on one of her apps in Fabrica whose work is kept: ask her to open a pull request from the session's branch into the branch it began from. She sees the title and says yes or no; it then waits in Fabrica for her yes again.",
      input_schema:{type:"object",properties:{title:{type:"string"},body:{type:"string"}},required:["title","body"]}},
    function(ws,a){var pr=proj(),F=pr.fab;if(F.pr&&F.pr.state==="open")return {text:"Pull request #"+F.pr.n+" is already open in Fabrica.",step:{i:"⇄",t:"The pull request is already open (#"+F.pr.n+")"}};
      return ask({title:"Open a pull request in "+F.name+"?",text:"The model asks to open “"+String(a.title||"").slice(0,120)+"” from "+(F.work||"the session's branch")+" into "+F.base+". It then waits in Fabrica for your yes.",yes:"Open it"}).then(function(ok){
        if(!ok)return {text:"She did not open the pull request now.",step:{i:"⇄",t:"She kept the pull request for later"}};
        return pullRequest(pr,{title:a.title,body:a.body}).then(function(it){return {text:"Pull request #"+it.n+" is open in Fabrica, waiting for her yes.",step:{i:"⇄",t:"Opened pull request #"+it.n+" in Fabrica"}};});});},{ro:false,when:inFab});
  A.addTool({name:"repo_files",description:"For a conversation that reads a repository (from Fabrica or GitHub): the list of its files on its branch, with their sizes.",input_schema:{type:"object",properties:{},required:[]}},
    function(){var R=chatRepo();return repoList(R).then(function(l){return {text:l.length+" files on "+R.branch+":\n"+l.slice(0,2000).map(function(f){return f.path+(f.size!=null?" ("+f.size+" bytes)":"");}).join("\n"),step:{i:"⌕",t:"Looked at the files of "+(R.full||R.name)}};});},{ro:true,when:function(){return !!chatRepo();}});
  A.addTool({name:"repo_read",description:"For a conversation that reads a repository (from Fabrica or GitHub): one file's text, on its branch.",input_schema:{type:"object",properties:{file:{type:"string"}},required:["file"]}},
    function(ws,a){var R=chatRepo(),p=String(a&&a.file||"").replace(/^\.?\/+/,"");return repoRead(R,p).then(function(t){if(t==null)return {text:"There is no file "+p+" on "+R.branch+".",step:{i:"⌕",t:"No file "+p}};
      return {text:t.length>60000?t.slice(0,60000)+"\n[… the rest left out]":t,step:{i:"⌕",t:"Read "+p}};});},{ro:true,when:function(){return !!chatRepo();}});
  return true;}

/* a conversation with no files runs the model's working loop only where a tool is lent to it (r190 asks IngConnectors.activeFor):
   one that reads a repository is lent repo_files and repo_read, so it is counted too */
function wrapConn(){var C=W.IngConnectors;if(!C||typeof C.activeFor!=="function"||C.activeFor.__r333)return;var a0=C.activeFor;
  var f=function(c){var r=false;try{r=a0.apply(this,arguments);}catch(e){}return r||!!(c&&!isCode(c)&&c.repo);};f.__r333=1;C.activeFor=f;}
function boot(){if(!here())return;try{wrapConn();}catch(e){warn(e);}try{wrapWelcome();}catch(e){warn(e);}try{wrapHead();}catch(e){warn(e);}try{wrapPlus();}catch(e){warn(e);}try{addTools();}catch(e){warn(e);}watch();}
boot();if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);
(function later(){var n=0;(function wait(){if(W.__ingReady===true){boot();return;}if(++n<400)setTimeout(wait,500);})();})();
W.IngRepoWork={version:1,pick:pick,openFab:openFab,changes:changes,diff:diffOf,keep:keep,pullRequest:pullRequest,update:update,keepSheet:keepSheet,prSheet:prSheet,paint:paint,tieChat:tieChat,repoList:repoList,repoRead:repoRead};
try{window.__ingParts["p333"]="running";}catch(_){}
})();
</script>
