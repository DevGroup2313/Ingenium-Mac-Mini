<style id="r219-css">
/* ============ R219 · CODE ON A GITHUB REPOSITORY: THE SESSION'S ENVIRONMENT, ITS BRANCH, ITS PULL REQUEST (Ingenium 6.13, 4 November 2026) ============
   Her words (4 November 2026): "I still want full parity with Claude's Code chat, right now its close but not quite there. I want you to
   close that gap and give me full parity. I want to be able to connect my Github repositories in the Environment of the Ingenium's Coding
   chat and so much more"; and (3 November) "I want to be able to connect my Github's repositories to the chats and track the changes made
   during the sessions".
   As in Claude's coding sessions, a session can work on one of her GitHub repositories: she signs in (a token kept on this device, the same
   sign-in Fabrica uses), chooses the repository and the branch, and the branch is read as it stands now: its text files, in a few requests,
   with what was left out named (pictures and other binary files, files over 1 MB, folders of installed packages, files that may hold
   secrets). The model works on them with its tools as on any app; Ingenium knows, file by file, what differs from the branch it started
   from. Commit and push sends the changes as one commit to the session's own branch (ingenium/...), never to the branch it started from;
   Create pull request opens one from that branch, and the Environment then follows it: open, merged or closed, and its checks. Where she
   cannot push to a repository, Ingenium offers to make her own copy (a fork) and opens the pull request from there. Update from GitHub
   brings newer work on the branch into the files she has not changed, and names those she has. The model has the same four abilities as
   tools (git_status, git_diff, commit_and_push, open_pull_request); a pull request always waits for her yes.
   GitHub's own interface is used throughout (the REST API, version 2022-11-28): git refs, commits and trees, branches, compare, pulls and
   check runs. Nothing is sent to GitHub but what she asks for. */
#ccPanel .ghx{display:flex;flex-direction:column;gap:6px;margin-top:4px;padding-top:8px;border-top:.5px solid var(--hairline,rgba(34,26,46,.12))}
#ccPanel .ghx-row{display:flex;align-items:flex-start;gap:8px;font-size:12.5px;line-height:1.45;color:var(--ink-2)}
#ccPanel .ghx-row .ic{flex:0 0 18px;text-align:center;color:var(--ink-3);font-weight:700}
#ccPanel .ghx-row .tx{flex:1 1 auto;min-width:0;overflow-wrap:anywhere}
#ccPanel .ghx-row b{color:var(--ink-1);font-weight:650}
#ccPanel .ghx-row a{color:var(--accent,#6a3fb5);font-weight:600;text-decoration:underline;text-underline-offset:2px}
#ccPanel .ghx-keys{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 0 26px}
#ccPanel .ghx-keys .btn{font-size:12px;padding:4px 10px;min-height:28px}
#ccPanel .ghx-pill{display:inline-flex;align-items:center;gap:4px;font:600 11px/1 var(--sans);padding:3px 7px;border-radius:999px;background:var(--accent-soft,rgba(106,63,181,.10));color:var(--ink-2);margin-left:4px;vertical-align:1px}
#ccPanel .ghx-pill.ok{background:rgba(47,122,85,.14);color:#2f7a55}#ccPanel .ghx-pill.bad{background:rgba(180,72,60,.12);color:#b4483c}
body[data-theme="night"] #ccPanel .ghx-pill.ok{color:#8fd0a9}body[data-theme="night"] #ccPanel .ghx-pill.bad{color:#f0a097}
/* 6.15, her words (4 November 2026): "The 'Find a repository' text box area inside of the panel is a little too small, please fix that.
   I also want the Repository option list to be a little bit more 3D animated to match the rest of the app instead of being just still
   and flat." The box takes the sheet's width, as tall as the other fields; each repository is a raised key as the app's keys are (a lit
   face, a rim and a shadow under it), lifting under the pointer and pressing in when pressed, the chosen one held up with an amethyst
   rim; the rows rise in one after another as they arrive (still when motion is set to minimal or the device asks for less). */
.ghx-sheet #ghxFind{display:block;width:100%;box-sizing:border-box;min-height:44px;margin:10px 0 2px;padding:10px 14px;font:14.5px/1.3 var(--sans);color:var(--ink-1);
  border:1px solid var(--hairline,rgba(34,26,46,.16));border-radius:12px;background:var(--card,#fff);box-shadow:inset 0 1px 3px rgba(40,22,68,.10);outline:none;transition:border-color .12s ease,box-shadow .12s ease}
.ghx-sheet #ghxFind:focus{border-color:var(--accent,#6a3fb5);box-shadow:inset 0 1px 3px rgba(40,22,68,.10),0 0 0 3px var(--accent-soft,rgba(106,63,181,.16))}
.ghx-sheet .ghx-list{display:flex;flex-direction:column;gap:8px;max-height:min(46vh,420px);overflow:auto;margin:8px 0;padding:6px 6px 10px;scrollbar-width:none;-ms-overflow-style:none}
.ghx-sheet .ghx-list::-webkit-scrollbar{display:none;width:0;height:0}
.ghx-sheet .ghx-repo{display:flex;flex-direction:column;align-items:flex-start;gap:2px;text-align:left;width:100%;box-sizing:border-box;flex:0 0 auto;border:1px solid var(--hairline,rgba(34,26,46,.14));border-radius:12px;padding:10px 14px;
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f2fb));box-shadow:var(--pop,0 1px 0 rgba(255,255,255,.7) inset,0 2px 0 rgba(40,22,68,.10),0 6px 14px rgba(40,22,68,.10));
  cursor:pointer;color:var(--ink-1);font:600 13.5px/1.35 var(--sans);transition:transform .14s cubic-bezier(.34,1.35,.64,1),box-shadow .14s ease,border-color .14s ease}
.ghx-sheet .ghx-repo:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,0 1px 0 rgba(255,255,255,.7) inset,0 3px 0 rgba(40,22,68,.12),0 12px 24px rgba(40,22,68,.16))}
.ghx-sheet .ghx-repo:active{transform:translateY(1px);box-shadow:inset 0 2px 6px rgba(40,20,70,.22)}
.ghx-sheet .ghx-repo:focus-visible{outline:2px solid var(--accent,#6a3fb5);outline-offset:2px}
.ghx-sheet .ghx-repo span{font:400 12px/1.4 var(--sans);color:var(--ink-3)}
.ghx-sheet .ghx-repo[aria-pressed="true"]{border-color:var(--accent,#6a3fb5);background:linear-gradient(180deg,var(--card-hi,#fff),var(--accent-softer,rgba(106,63,181,.08)));
  box-shadow:var(--pop-hi,0 3px 0 rgba(40,22,68,.12),0 12px 24px rgba(40,22,68,.16)),inset 0 0 0 1px var(--accent,#6a3fb5);transform:translateY(-1px)}
@keyframes ghxIn{from{opacity:0;transform:translateY(8px) scale(.985)}60%{opacity:1;transform:translateY(-1px) scale(1)}to{opacity:1;transform:none}}
.ghx-sheet .ghx-repo.ghx-in{animation:ghxIn .32s cubic-bezier(.34,1.35,.64,1) both}
body[data-motion="minimal"] .ghx-sheet .ghx-repo{transition:none;animation:none}body[data-motion="minimal"] .ghx-sheet .ghx-repo:hover{transform:none}
@media (prefers-reduced-motion:reduce){.ghx-sheet .ghx-repo{transition:none;animation:none}.ghx-sheet .ghx-repo:hover{transform:none}}
.ghx-sheet .ghx-row2{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0}
.ghx-sheet .ghx-row2 > *{flex:1 1 180px;min-width:0}
.ghx-sheet .ghx-note{font-size:12.5px;line-height:1.5;color:var(--ink-3);margin:6px 0}
.ghx-sheet .ghx-files{list-style:none;margin:6px 0;padding:0;display:flex;flex-direction:column;gap:4px;max-height:min(40vh,360px);overflow:auto}
.ghx-sheet .ghx-files li{display:flex;gap:8px;align-items:baseline;font-size:12.5px;line-height:1.45;color:var(--ink-2)}
.ghx-sheet .ghx-files li b{font:600 12px/1.4 var(--mono,ui-monospace,monospace);color:var(--ink-1);overflow-wrap:anywhere}
.ghx-sheet .ghx-files .a{color:#2f7a55}.ghx-sheet .ghx-files .d{color:#b4483c}
.ghx-sheet pre.ghx-diff{max-height:min(46vh,420px);overflow:auto;font:12px/1.5 var(--mono,ui-monospace,monospace);background:var(--code-bg,rgba(106,63,181,.05));border-radius:10px;padding:10px 12px;white-space:pre;margin:8px 0}
.ghx-sheet pre.ghx-diff .p{color:#2f7a55}.ghx-sheet pre.ghx-diff .m{color:#b4483c}.ghx-sheet pre.ghx-diff .h{color:var(--accent,#6a3fb5)}
.ghx-sheet textarea{width:100%;box-sizing:border-box;min-height:84px}
.ghx-sheet .ghx-keys{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:12px}
.cc-card[data-a="github"] b::before{content:"⑂ ";color:var(--accent,#6a3fb5)}
#ghxTopKey{white-space:nowrap}#ghxTopKey .ghx-n{font-weight:700;margin-left:3px}
#ghxTopKey.ok{border-color:rgba(47,122,85,.45);color:#2f7a55}body[data-theme="night"] #ghxTopKey.ok{color:#8fd0a9}
.ghx-cmds{position:fixed;z-index:660;min-width:260px;max-width:min(420px,calc(100vw - 20px));padding:6px;border-radius:12px;background:var(--surface,#fff);border:1px solid var(--hairline,rgba(34,26,46,.12));box-shadow:0 2px 0 rgba(40,22,68,.08),0 12px 30px rgba(40,22,68,.18)}
.ghx-cmds[hidden]{display:none}
.ghx-cmd{display:flex;gap:10px;align-items:baseline;width:100%;text-align:left;border:0;background:transparent;border-radius:9px;padding:7px 10px;cursor:pointer;color:var(--ink-1);font:600 13px/1.35 var(--sans)}
.ghx-cmd small{font-weight:400;color:var(--ink-3);font-size:12px}
.ghx-cmd[aria-selected="true"],.ghx-cmd:hover{background:var(--accent-softer,rgba(106,63,181,.08))}
.ghx-sheet .ghx-br{font-family:var(--mono,ui-monospace,monospace)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p219"]="started";}catch(_){}
/* R219 · Code on a GitHub repository: see the note at the top of its styles.
   window.IngGitHubCode: connect(), open(o), changes(pr), push(pr, message), pullRequest(pr, o), status(pr), update(pr), forget(pr), repo(), api */
(function r219(){"use strict";
if(window.IngGitHubCode)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function toast(t){try{ingToast(t);}catch(e){}}
function save(){try{saveState();}catch(e){}}
function warn(e){try{console.warn("Ingenium GitHub:",e&&e.message||e);}catch(_){}}
function escH(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function short(sha){return String(sha||"").slice(0,7);}
function ago(t){var s=Math.round((Date.now()-(+t||0))/1000);if(s<60)return "just now";if(s<3600)return Math.round(s/60)+" min ago";if(s<86400)return Math.round(s/3600)+" h ago";return Math.round(s/86400)+" days ago";}
var te=new TextEncoder();
function b64dec(s){var bin=atob(String(s||"").replace(/\s+/g,"")),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u;}

/* ================= 1. GitHub: the sign-in Fabrica keeps (state.github), and its requests ================= */
function GH(){if(!state.github||typeof state.github!=="object")state.github={};var g=state.github;if(!g.api)g.api="https://api.github.com";return g;}
function signedIn(){return !!GH().token;}
function api(p,opt){if(W.fbGitHub&&typeof fbGitHub.api==="function")return fbGitHub.api(p,opt);
  opt=opt||{};var g=GH();if(!g.token)return Promise.reject(new Error("Sign in to GitHub first."));
  var url=/^https?:/.test(p)?p:g.api.replace(/\/$/,"")+p,h={"Authorization":"Bearer "+g.token,"Accept":"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"},init={method:opt.method||"GET",headers:h};
  if(opt.body!=null){init.body=JSON.stringify(opt.body);h["Content-Type"]="application/json";}
  return fetch(url,init).then(function(r){var ct=r.headers.get("content-type")||"";if(r.status===204)return {ok:true,status:204,data:null};
    return (/json/.test(ct)?r.json():r.text()).then(function(d){if(!r.ok){var e=new Error("GitHub answered "+r.status+(d&&d.message?": "+d.message:"")+".");e.status=r.status;e.data=d;throw e;}return {ok:true,status:r.status,data:d};});});}
function signIn(token){if(W.fbGitHub&&typeof fbGitHub.signIn==="function")return fbGitHub.signIn(token).then(function(l){GH().via="token";save();return l;});
  var g=GH(),old=g.token;g.token=String(token||"").trim();return api("/user").then(function(x){g.login=x.data.login||"";g.since=Date.now();g.via="token";save();return g.login;},function(e){g.token=old;save();throw e;});}
function R(owner,repo){return "/repos/"+encodeURIComponent(owner)+"/"+encodeURIComponent(repo);}
function enc(ref){return String(ref).split("/").map(encodeURIComponent).join("/");}

/* ================= 2. which files a session reads: text, under 1 MB, not installed packages, not secrets ================= */
var MAX_FILE=1048576,MAX_FILES=2000,MAX_BYTES=60*1048576;
var SKIP_DIR=/(^|\/)(node_modules|bower_components|jspm_packages|\.venv|venv|__pycache__|Pods|\.gradle|DerivedData|\.next|\.nuxt|\.svelte-kit|target|coverage|\.idea|\.vscode|\.git)\//;
var BINARY=/\.(png|jpe?g|gif|webp|ico|bmp|tiff?|psd|ai|heic|avif|pdf|zip|gz|tgz|bz2|xz|7z|rar|jar|war|apk|aab|ipa|dmg|pkg|exe|msi|dll|so|dylib|a|o|obj|class|wasm|mp3|mp4|m4a|wav|ogg|oga|webm|mov|avi|mkv|flac|aac|ttf|otf|woff2?|eot|bin|dat|db|sqlite3?|gguf|onnx|pt|pth|safetensors|npy|npz|pkl|parquet|car|xcf|sketch|fig)$/i;
var SECRET=/(^|\/)(\.env(\..*)?|.*\.(pem|key|p12|pfx|jks|keystore|mobileprovision|p8)|id_(rsa|ed25519|ecdsa)(\.pub)?|\.npmrc|\.pypirc|credentials(\.json)?|secrets?\.(json|ya?ml|toml))$/i;
function why(e){if(SKIP_DIR.test(e.path))return "a folder of installed packages or tools";if(SECRET.test(e.path))return "it may hold a secret (keys, passwords)";
  if(BINARY.test(e.path))return "not text (a picture, a font, an archive or a program)";if((+e.size||0)>MAX_FILE)return "over 1 MB";return "";}
function looksText(u8){var n=Math.min(u8.length,8000);for(var i=0;i<n;i++)if(u8[i]===0)return false;return true;}
function blobSha(text){var b=te.encode(String(text)),h=te.encode("blob "+b.length+"\0"),u=new Uint8Array(h.length+b.length);u.set(h,0);u.set(b,h.length);
  return IngRepo.core.sha1(u);}
function pool(items,n,fn){var i=0,out=new Array(items.length),err=null;return new Promise(function(res,rej){var running=0;
  function next(){if(err)return;if(i>=items.length&&!running){res(out);return;}while(running<n&&i<items.length){(function(k){running++;Promise.resolve().then(function(){return fn(items[k],k);}).then(function(v){out[k]=v;running--;next();},function(e){err=e;rej(e);});})(i++);}}
  next();});}

/* ================= 3. opening a branch as an app of the Code page ================= */
var STOP={};
function open(o){var owner=o.owner,repo=o.repo,full=owner+"/"+repo,job="gh:"+full,info=null,commit=null,tree=null,stop=false,left=[],picked=[],branch=o.branch;
  STOP[job]=function(){stop=true;};
  function step(t){try{IngJobs.update(job,{step:t});}catch(e){}}
  try{IngJobs.start({id:job,title:"Opening "+full+" from GitHub",kind:"task",step:"Asking GitHub for the repository",stop:function(){stop=true;}});}catch(e){}
  return api(R(owner,repo)).then(function(x){info=x.data;branch=branch||info.default_branch||"main";step("Reading the branch "+branch);
      return api(R(owner,repo)+"/git/ref/heads/"+enc(branch));})
    .then(function(x){commit=x.data.object.sha;return api(R(owner,repo)+"/git/commits/"+commit);})
    .then(function(x){tree=x.data.tree.sha;step("Listing the files");return api(R(owner,repo)+"/git/trees/"+tree+"?recursive=1");})
    .then(function(x){var ents=(x.data.tree||[]).filter(function(e){return e.type==="blob";}),bytes=0;
      if(x.data.truncated)left.push({path:"(more files)",why:"the repository holds more files than GitHub lists at once; only those listed were read"});
      ents.forEach(function(e){if(e.mode==="120000"){left.push({path:e.path,why:"a link to another file"});return;}var w=why(e);if(w){left.push({path:e.path,why:w});return;}
        if(picked.length>=MAX_FILES||bytes+(+e.size||0)>MAX_BYTES){left.push({path:e.path,why:"past the "+MAX_FILES.toLocaleString("en-GB")+" files or 60 MB a session reads"});return;}
        bytes+=+e.size||0;picked.push(e);});
      if(!picked.length)throw new Error("The branch "+branch+" of "+full+" has no text file Ingenium can work on.");
      var done=0;step("Reading "+picked.length+" files");
      return pool(picked,8,function(e){if(stop)throw new Error("Stopped.");return api(R(owner,repo)+"/git/blobs/"+e.sha,{timeout:300000}).then(function(b){var u8=b.data.encoding==="base64"?b64dec(b.data.content):te.encode(String(b.data.content||""));
          done++;if(done%10===0||done===picked.length)step("Read "+done+" of "+picked.length+" files");
          if(!looksText(u8)){left.push({path:e.path,why:"not text"});return null;}return {name:e.path,text:new TextDecoder("utf-8").decode(u8),sha:e.sha,mode:e.mode};});});})
    .then(function(files){files=files.filter(Boolean);if(stop)throw new Error("Stopped.");step("Keeping the files on this device");
      var main=(files.filter(function(f){return /^index\.html?$/i.test(f.name);})[0]||files.filter(function(f){return /\.html?$/i.test(f.name)&&f.name.indexOf("/")<0;})[0]||files.filter(function(f){return /(^|\/)index\.html?$/i.test(f.name);})[0]||files[0]).name;
      return ccMakeProject(repo,files.map(function(f){return {name:f.name,text:f.text};}),main).then(function(pr){
        var map={},byName={};files.forEach(function(f){byName[f.name]=f;});pr.files.forEach(function(pf){var f=byName[pf.name];if(f){pf.gh={sha:f.sha,mode:f.mode};map[f.name]={sha:f.sha,mode:f.mode};}});
        pr.gh={owner:owner,repo:repo,full:full,branch:branch,html:info.html_url||("https://github.com/"+full),priv:!!info.private,push:!!(info.permissions&&info.permissions.push),
          base:{commit:commit,tree:tree,at:Date.now()},map:map,pushed:null,left:left.slice(0,400),nLeft:left.length,at:Date.now()};
        /* the branch's text as it was read, kept for the differences (a second copy, on this device) */
        return Promise.all(pr.files.map(function(pf){if(!pf.gh)return null;var id=IngBig.newId();pf.gh.base=id;map[pf.name].base=id;return IngBig.put(id,pf.text);})).then(function(){save();return pr;});});})
    .then(function(pr){try{IngJobs.end(job);}catch(e){}delete STOP[job];
      if(o.session!==false){ccNewSession(pr);var c=curChat();if(c&&c.projectId===pr.id&&(!c.title||c.title==="New session"))c.title=repo+" · "+branch;save();try{ccPaintSide();ccPaintHead();}catch(e){}}
      toast("Opened "+full+" ("+branch+"): "+pr.files.length+" files"+(pr.gh.nLeft?", "+pr.gh.nLeft+" left out (see Environment)":"")+".");paint();return pr;},
      function(e){try{IngJobs.end(job);}catch(_){}delete STOP[job];throw e;});}

/* ================= 4. what differs: from the branch she opened, and since the last push ================= */
function curPr(){try{return ccProj();}catch(e){return null;}}
function clean(n){return String(n||"").replace(/^\.?\/+/,"");}
/* the files as they are now: the app's, or, while the model works, its own copies (saved to the app at the end of its turn) */
function current(pr,ws){var map={},L=[];(pr.files||[]).forEach(function(f){var e={name:f.name,f:f,gh:f.gh||null,text:typeof f.text==="string"?f.text:null};map[f.name]=e;L.push(e);});
  if(ws&&ws.pr===pr)(ws.files||[]).forEach(function(w){var n=clean(w.name),e=map[n]||map[w.name];if(e)e.text=w.text;else{e={name:n,f:null,gh:null,text:w.text};map[n]=e;L.push(e);}});
  return L;}
function changes(pr,ws){var G=pr&&pr.gh;if(!G)return Promise.resolve(null);
  return ccLoadAll(pr).then(function(){var L=current(pr,ws);return Promise.all(L.map(function(e){return typeof e.text==="string"?blobSha(e.text).then(function(s){e.sha=s;return e;}):Promise.resolve(e);}));})
    .then(function(L){var have={},out={files:[],toPush:[],base:G.base.commit};
      L.forEach(function(e){if(e.sha==null)return;have[e.name]=1;var b=G.map[e.name],P=G.pushed,p=P?P[e.name]:undefined;
        var vsBase=!b?"added":(e.sha!==b.sha?"changed":"");
        var vsPush=!P?vsBase:(p===undefined?(b?(e.sha!==b.sha?"changed":""):"added"):(p==="gone"?"added":(e.sha!==p?"changed":"")));
        if(vsBase)out.files.push({path:e.name,how:vsBase,e:e,sha:e.sha});if(vsPush)out.toPush.push({path:e.name,how:vsPush,e:e,sha:e.sha});});
      Object.keys(G.map).forEach(function(n){if(have[n])return;out.files.push({path:n,how:"removed"});if(!G.pushed||G.pushed[n]!=="gone")out.toPush.push({path:n,how:"removed"});});
      if(G.pushed)Object.keys(G.pushed).forEach(function(n){if(!have[n]&&!G.map[n]&&G.pushed[n]&&G.pushed[n]!=="gone")out.toPush.push({path:n,how:"removed"});});
      out.toPush=out.toPush.filter(function(x,i,a){return a.findIndex(function(y){return y.path===x.path;})===i;});
      return out;});}
function baseText(path,G){var m=G.map[path];return m&&m.base?IngBig.load(m.base):Promise.resolve("");}
function diffOf(pr,path,ws){var G=pr.gh,core=IngRepo.core,e=current(pr,ws).filter(function(x){return x.name===path;})[0];
  var how=!e?"removed":(!G.map[path]?"added":"changed");
  return Promise.all([how==="added"?Promise.resolve(""):baseText(path,G),!e?Promise.resolve(""):(typeof e.text==="string"?Promise.resolve(e.text):ccLoad(e.f))]).then(function(x){
    var A=core.splitLines(String(x[0]||"")),B=core.splitLines(how==="removed"?"":String(x[1]||"")),hs=core.hunks(A,B,3),add=0,del=0;
    hs.forEach(function(h){h.lines.forEach(function(l){if(l[0]==="+")add++;else if(l[0]==="-")del++;});});
    return {path:path,how:how,add:add,del:del,text:core.unified(path,A,B,hs,how==="removed"?"removed":how==="added"?"added":"")};});}

/* ================= 5. commit and push, to the session's own branch ================= */
function slug(t){return String(t||"").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"session";}
function workBranch(pr){var G=pr.gh;if(G.work)return G.work;var c=curChat(),t=c&&c.title&&c.title!=="New session"?c.title.replace(/\s*·.*$/,""):pr.name;
  return "ingenium/"+slug(t)+"-"+Date.now().toString(36).slice(-4);}
function target(pr){var G=pr.gh;return G.fork?{owner:G.fork.owner,repo:G.fork.repo}:{owner:G.owner,repo:G.repo};}
function forkIt(pr){var G=pr.gh;return api(R(G.owner,G.repo)+"/forks",{method:"POST",body:{default_branch_only:false}}).then(function(x){var d=x.data,fo=d.owner&&d.owner.login,fr=d.name;
    var tries=0;function ready(){return api(R(fo,fr)).then(function(){G.fork={owner:fo,repo:fr,html:d.html_url};save();return G.fork;},function(e){if(++tries>15)throw new Error("Your copy of "+G.full+" is not ready on GitHub yet. Press Commit and push again in a minute.");return new Promise(function(r){setTimeout(r,2000);}).then(ready);});}
    return ready();});}
function push(pr,message,o){o=o||{};var G=pr&&pr.gh;if(!G)return Promise.reject(new Error("This session's app is not a GitHub repository."));
  var job="ghp:"+G.full;message=String(message||"").trim()||("Changes from the Ingenium session"+(curChat()&&curChat().title?" “"+curChat().title+"”":""));
  var pre=(!G.push&&!G.fork)?(o.fork===true?forkIt(pr):Promise.reject(Object.assign(new Error("You cannot push to "+G.full+". Ingenium can make your own copy of it on GitHub (a fork) and push there."),{needFork:true}))):Promise.resolve();
  var ch=null,branch=null,T=null,parent=null,sent=null;
  function parentCommit(){return api(R(T.owner,T.repo)+"/git/commits/"+parent).then(null,function(e){
      /* a copy made earlier may not hold the commit this session started from: bring the copy up to date once */
      if(!(G.fork&&e&&e.status===404))throw e;return api(R(T.owner,T.repo)+"/merge-upstream",{method:"POST",body:{branch:G.branch}}).then(function(){return api(R(T.owner,T.repo)+"/git/commits/"+parent);});});}
  return pre.then(function(){T=target(pr);branch=G.work||workBranch(pr);return changes(pr,o.ws);}).then(function(c){ch=c;if(!c.toPush.length)throw Object.assign(new Error("Nothing to push: the files are as on GitHub."),{nothing:true});
      try{IngJobs.start({id:job,title:"Pushing to "+T.owner+"/"+T.repo,kind:"task",step:c.toPush.length+" file"+(c.toPush.length===1?"":"s")});}catch(e){}
      parent=G.head&&G.head.commit||G.base.commit;return parentCommit();})
    .then(function(x){var entries=ch.toPush.map(function(t){if(t.how==="removed"){var m=G.map[t.path];return {path:t.path,mode:(m&&m.mode)||"100644",type:"blob",sha:null};}
        return {path:t.path,mode:(t.e.gh&&t.e.gh.mode==="100755")?"100755":"100644",type:"blob",content:t.e.text};});
      sent=entries;return api(R(T.owner,T.repo)+"/git/trees",{method:"POST",body:{base_tree:x.data.tree.sha,tree:entries},timeout:600000});})
    .then(function(x){return api(R(T.owner,T.repo)+"/git/commits",{method:"POST",body:{message:message,tree:x.data.sha,parents:[parent]}});})
    .then(function(x){var sha=x.data.sha;
      var setRef=G.head?api(R(T.owner,T.repo)+"/git/refs/heads/"+enc(branch),{method:"PATCH",body:{sha:sha,force:false}})
        :api(R(T.owner,T.repo)+"/git/refs",{method:"POST",body:{ref:"refs/heads/"+branch,sha:sha}});
      return setRef.then(function(){return sha;},function(e){if(e&&e.status===422)throw new Error("GitHub's branch "+branch+" has newer work than this session; open it on GitHub, or update from GitHub, then push again.");throw e;});})
    .then(function(sha){G.work=branch;G.head={branch:branch,commit:sha,at:Date.now(),url:"https://github.com/"+T.owner+"/"+T.repo+"/commit/"+sha,message:message.split("\n")[0]};TOP.key="";
      var P=G.pushed||{};ch.toPush.forEach(function(t){if(t.how==="removed")P[t.path]="gone";else P[t.path]=t.sha;});
      Object.keys(G.map).forEach(function(n){if(P[n]===undefined)P[n]=G.map[n].sha;});G.pushed=P;
      G.log=(G.log||[]).concat([{commit:sha,files:ch.toPush.length,at:Date.now(),message:G.head.message}]).slice(-30);save();
      try{IngJobs.end(job);}catch(e){}paint();return {commit:sha,branch:branch,files:ch.toPush.map(function(t){return t.how+" "+t.path;}),url:G.head.url,where:T.owner+"/"+T.repo};},
      function(e){try{IngJobs.end(job);}catch(_){}throw e;});}

/* ================= 6. the pull request, and how it stands ================= */
function pullRequest(pr,o){o=o||{};var G=pr&&pr.gh;if(!G)return Promise.reject(new Error("This session's app is not a GitHub repository."));
  if(!G.head)return Promise.reject(new Error("Push the changes first: a pull request asks to bring a branch's commits into "+G.branch+"."));
  if(G.pr&&G.pr.state==="open")return Promise.resolve(G.pr);
  var head=(G.fork?G.fork.owner+":":"")+G.work;
  return api(R(G.owner,G.repo)+"/pulls",{method:"POST",body:{title:String(o.title||G.head.message||"Changes from Ingenium").slice(0,250),body:String(o.body||""),head:head,base:G.branch,draft:!!o.draft}})
    .then(function(x){var d=x.data;G.pr={number:d.number,url:d.html_url,state:d.state,draft:!!d.draft,title:d.title,at:Date.now()};save();paint();return G.pr;});}
function status(pr){var G=pr&&pr.gh;if(!G||!G.pr)return Promise.resolve(null);
  return api(R(G.owner,G.repo)+"/pulls/"+G.pr.number).then(function(x){var d=x.data;G.pr.state=d.merged?"merged":d.state;G.pr.mergeable=d.mergeable_state||"";G.pr.at=Date.now();
      var sha=d.head&&d.head.sha;if(!sha)return G.pr;
      return api(R(G.owner,G.repo)+"/commits/"+sha+"/check-runs?per_page=100").then(function(y){var runs=(y.data&&y.data.check_runs)||[],k={passed:0,failed:0,running:0,other:0};
          runs.forEach(function(r){if(r.status!=="completed")k.running++;else if(r.conclusion==="success")k.passed++;else if(/failure|timed_out|cancelled|action_required/.test(r.conclusion))k.failed++;else k.other++;});
          G.pr.checks=runs.length?k:null;return G.pr;},function(){G.pr.checks=undefined;return G.pr;});})
    .then(function(p){save();paint();return p;});}

/* ================= 7. newer work on GitHub, brought into the files she has not changed ================= */
function update(pr){var G=pr&&pr.gh;if(!G)return Promise.reject(new Error("This session's app is not a GitHub repository."));
  if(G.head)return Promise.reject(new Error("This session's branch ("+G.work+") is already on GitHub. Bring "+G.branch+"'s newer work into it on GitHub (the pull request's Update branch key), then keep working there."));
  var newSha=null,ch=null;
  return api(R(G.owner,G.repo)+"/git/ref/heads/"+enc(G.branch)).then(function(x){newSha=x.data.object.sha;if(newSha===G.base.commit)return {same:true};
      return changes(pr).then(function(c){ch=c;return api(R(G.owner,G.repo)+"/compare/"+G.base.commit+"..."+newSha);}).then(function(y){
        var files=(y.data&&y.data.files)||[],mine={},done=[],kept=[],skipped=[];ch.files.forEach(function(x){mine[x.path]=x.how;});
        return pool(files,6,function(f){var path=f.filename;if(f.status==="renamed"&&f.previous_filename){skipped.push(path+" (renamed from "+f.previous_filename+")");return null;}
            if(mine[path]){kept.push(path);return null;}
            var pf=(pr.files||[]).filter(function(x){return x.name===path;})[0];
            if(f.status==="removed"){if(pf){pr.files=pr.files.filter(function(x){return x!==pf;});delete G.map[path];done.push("removed "+path);}return null;}
            var w=why({path:path,size:0});if(w){skipped.push(path+" ("+w+")");return null;}
            return api(R(G.owner,G.repo)+"/git/blobs/"+f.sha).then(function(b){var u8=b.data.encoding==="base64"?b64dec(b.data.content):te.encode(String(b.data.content||""));if(!looksText(u8)){skipped.push(path+" (not text)");return null;}
              var t=new TextDecoder("utf-8").decode(u8);if(!pf){pf={name:path,ref:null,size:0};pr.files.push(pf);}
              return ccPut(pf,t).then(function(){var id=IngBig.newId();pf.gh={sha:f.sha,mode:(G.map[path]&&G.map[path].mode)||"100644",base:id};G.map[path]={sha:f.sha,mode:pf.gh.mode};done.push((f.status==="added"?"added ":"updated ")+path);return IngBig.put(id,t);});});})
          .then(function(){G.base={commit:newSha,tree:null,at:Date.now()};pr.updated=Date.now();save();paint();try{ccShowPreview(pr);}catch(e){}return {done:done,kept:kept,skipped:skipped,commit:newSha};});});});}
function forget(pr){if(!pr||!pr.gh)return;delete pr.gh;(pr.files||[]).forEach(function(f){delete f.gh;});save();paint();}

/* ================= 8. the Environment, in the Session column ================= */
function key(t,fn,primary){var b=mk("button","btn small "+(primary?"primary":"ghost"),t);b.type="button";b.onclick=function(e){e.stopPropagation();fn(b);};return b;}
function rowEl(ic,html){var r=mk("div","ghx-row");r.appendChild(mk("span","ic",ic));var t=mk("span","tx");t.innerHTML=html;r.appendChild(t);return r;}
var PENDING=null;
function paint(){var h=$("ccPanel");if(!h)return;var env=h.querySelector('[data-sec="session"] .ccp-in');if(!env)return;var old=env.querySelector(".ghx");if(old)old.remove();
  var pr=curPr(),box=mk("div","ghx");box.setAttribute("data-ghx","1");
  if(!pr||!pr.gh){box.appendChild(rowEl("⑂","<b>GitHub</b> · work on one of your repositories: its branch is read, your changes go to a branch of their own, and a pull request brings them in."));
    var k=mk("div","ghx-keys");k.appendChild(key(signedIn()?"Connect a repository":"Sign in and connect a repository",function(){connectSheet();},true));box.appendChild(k);env.appendChild(box);return;}
  var G=pr.gh;
  box.appendChild(rowEl("⑂","<b>"+escH(G.full)+"</b>"+(G.priv?'<span class="ghx-pill">private</span>':"")+(G.fork?'<span class="ghx-pill">pushing to your copy, '+escH(G.fork.owner+"/"+G.fork.repo)+'</span>':"")+' · <a href="'+escH(G.html)+'" target="_blank" rel="noopener noreferrer">open on GitHub</a>'));
  box.appendChild(rowEl("⎇","From <b>"+escH(G.branch)+"</b> at "+short(G.base.commit)+" ("+ago(G.base.at)+")"+(G.work?" → <b>"+escH(G.work)+"</b>":"")));
  var lf=rowEl("≡",(pr.files||[]).length+" file"+((pr.files||[]).length===1?"":"s")+" here"+(G.nLeft?" · "+G.nLeft+" left out <a href=\"#\" data-k=\"left\">(which, and why)</a>":""));box.appendChild(lf);
  var a=lf.querySelector('[data-k="left"]');if(a)a.onclick=function(e){e.preventDefault();leftSheet(pr);};
  var cr=rowEl("±","Comparing with GitHub…");box.appendChild(cr);
  if(G.head)box.appendChild(rowEl("↑",'Last push: <a href="'+escH(G.head.url)+'" target="_blank" rel="noopener noreferrer">'+short(G.head.commit)+"</a> "+ago(G.head.at)+(G.head.message?" · “"+escH(G.head.message.slice(0,80))+"”":"")));
  if(G.pr){var st=G.pr.state==="merged"?'<span class="ghx-pill ok">merged</span>':G.pr.state==="closed"?'<span class="ghx-pill bad">closed</span>':'<span class="ghx-pill">'+(G.pr.draft?"draft":"open")+'</span>';
    var ck=G.pr.checks?(' · checks: '+(G.pr.checks.passed?'<span class="ghx-pill ok">'+G.pr.checks.passed+" passed</span>":"")+(G.pr.checks.failed?'<span class="ghx-pill bad">'+G.pr.checks.failed+" failed</span>":"")+(G.pr.checks.running?'<span class="ghx-pill">'+G.pr.checks.running+" running</span>":"")):"";
    box.appendChild(rowEl("⇄",'<a href="'+escH(G.pr.url)+'" target="_blank" rel="noopener noreferrer">Pull request #'+G.pr.number+"</a> "+st+ck));}
  var keys=mk("div","ghx-keys");box.appendChild(keys);env.appendChild(box);
  var me=PENDING={};changes(pr).then(function(c){if(PENDING!==me||!box.isConnected)return;var n=c.toPush.length,all=c.files.length;
      cr.querySelector(".tx").innerHTML=n?("<b>"+n+" file"+(n===1?"":"s")+" to push</b>"+(all!==n?" · "+all+" differ from "+escH(G.branch):"")):(all?"Everything is pushed · "+all+" file"+(all===1?"":"s")+" differ from "+escH(G.branch):"No changes yet: the files are as on GitHub");
      if(n)keys.appendChild(key("Review and push",function(){pushSheet(pr);},true));
      if(G.head&&!(G.pr&&G.pr.state==="open"))keys.appendChild(key("Create pull request",function(){prSheet(pr);},!n));
      if(G.pr)keys.appendChild(key("Refresh",function(b){b.disabled=true;status(pr).then(null,function(e){toast(e&&e.message||String(e));});}));
      if(!G.head)keys.appendChild(key("Update from GitHub",function(b){b.disabled=true;update(pr).then(function(r){if(r.same)toast("Already up to date with "+G.branch+".");else updateSheet(pr,r);},function(e){toast(e&&e.message||String(e));paint();});}));
      keys.appendChild(key("Disconnect",function(){disconnect(pr);}));},
    function(e){cr.querySelector(".tx").textContent="Could not compare: "+(e&&e.message||e);});}
var obs=null;
function watch(){var h=$("ccPanel");if(!h||h.__ghx)return;h.__ghx=1;try{obs=new MutationObserver(function(){var env=h.querySelector('[data-sec="session"] .ccp-in');if(env&&!env.querySelector(".ghx"))paint();});obs.observe(h,{childList:true,subtree:true});}catch(e){}paint();}

/* ================= 9. the sheets: connect, what was left out, review and push, the pull request, after an update ================= */
function sheet(html){var box=modalOpen('<div class="ghx-sheet">'+html+'</div>');return box.querySelector(".ghx-sheet");}
function connectSheet(){var s;
  if(!signedIn()){s=sheet('<h3>Sign in to GitHub</h3><p class="small muted" style="margin-top:0">Ingenium reaches your repositories with a token you make on GitHub: github.com, Settings, Developer settings, Personal access tokens, Fine-grained tokens. Give it the repositories you want, with <b>Contents</b> and <b>Pull requests</b> read and write (and <b>Checks</b> read, to see test results). It is kept on this device, as Fabrica keeps it, and sent only to GitHub.</p>'
      +'<label class="field"><span>Token</span><input type="password" id="ghxTok" autocomplete="off" placeholder="github_pat_…"></label><div class="ghx-note" id="ghxSay" role="status"></div>'
      +'<div class="ghx-keys"><button class="btn ghost" type="button" id="ghxNo">Cancel</button><button class="btn primary" type="button" id="ghxIn">Sign in</button></div>');
    s.querySelector("#ghxNo").onclick=closeModal;var tok=s.querySelector("#ghxTok"),say=s.querySelector("#ghxSay");
    s.querySelector("#ghxIn").onclick=function(){var t=tok.value.trim();if(!t){tok.focus();return;}say.textContent="Checking the token with GitHub…";
      signIn(t).then(function(login){toast("Signed in to GitHub as "+login+".");closeModal();setTimeout(connectSheet,60);},function(e){say.textContent=e&&e.message||String(e);});};
    setTimeout(function(){tok.focus();},40);return;}
  var g=GH();s=sheet('<h3>A GitHub repository for this session</h3><p class="small muted" style="margin-top:0">Signed in as <b>'+escH(g.login||"you")+'</b>. Choose a repository and its branch: Ingenium reads the branch as it is now, and the session works on it here. Your changes go to a branch of their own when you push.</p>'
    +'<input type="search" id="ghxFind" placeholder="Find a repository" aria-label="Find a repository"><div class="ghx-list" id="ghxList" role="list"><div class="ghx-note">Asking GitHub for your repositories…</div></div>'
    +'<div class="ghx-row2"><label class="field" style="margin:0"><span>Branch</span><select id="ghxBr" disabled><option>Choose a repository first</option></select></label>'
    +'<label class="field" style="margin:0"><span>Or another repository (owner/name)</span><input type="text" id="ghxOther" placeholder="owner/name"></label></div>'
    +'<div class="ghx-note" id="ghxSay" role="status"></div>'
    +'<div class="ghx-keys"><button class="btn ghost" type="button" id="ghxOut">Sign out of GitHub</button><button class="btn ghost" type="button" id="ghxNo">Cancel</button><button class="btn primary" type="button" id="ghxGo" disabled>Open it in a new session</button></div>');
  var list=s.querySelector("#ghxList"),find=s.querySelector("#ghxFind"),br=s.querySelector("#ghxBr"),go=s.querySelector("#ghxGo"),say=s.querySelector("#ghxSay"),other=s.querySelector("#ghxOther"),chosen=null,repos=[],fresh=true;
  s.querySelector("#ghxNo").onclick=closeModal;
  s.querySelector("#ghxOut").onclick=function(){try{if(W.fbGitHub&&fbGitHub.signOut)fbGitHub.signOut();else{delete GH().token;delete GH().login;save();}}catch(e){}closeModal();paint();toast("Signed out of GitHub on this device.");};
  function pick(r){chosen=r;[].forEach.call(list.querySelectorAll(".ghx-repo"),function(b){b.setAttribute("aria-pressed",String(b.__r===r));});br.disabled=true;br.innerHTML="<option>Reading its branches…</option>";go.disabled=true;
    api(R(r.owner,r.repo)+"/branches?per_page=100").then(function(x){if(chosen!==r)return;br.innerHTML="";var names=(x.data||[]).map(function(b){return b.name;});if(names.indexOf(r.branch)<0)names.unshift(r.branch);
        names.forEach(function(n){var o=mk("option",null,n+(n===r.branch?" (default)":""));o.value=n;br.appendChild(o);});br.value=r.branch;br.disabled=false;go.disabled=false;},
      function(e){br.innerHTML='<option value="'+escH(r.branch)+'">'+escH(r.branch)+'</option>';br.disabled=false;go.disabled=false;say.textContent=e&&e.message||String(e);});}
  function draw(){var q=find.value.trim().toLowerCase();list.innerHTML="";var L=repos.filter(function(r){return !q||r.full.toLowerCase().indexOf(q)>=0;});
    if(!L.length){list.appendChild(mk("div","ghx-note",repos.length?"No repository matches.":"No repository found for this token."));return;}
    var rise=fresh&&repos.length>0;if(repos.length)fresh=false;/* the rows rise in when they first arrive, not again at each letter typed in Find */
    L.slice(0,200).forEach(function(r,i){var up=rise&&i<14,b=mk("button","ghx-repo"+(up?" ghx-in":""));b.type="button";b.__r=r;if(up){b.style.animationDelay=(i*35)+"ms";b.addEventListener("animationend",function(){b.classList.remove("ghx-in");b.style.animationDelay="";});}b.setAttribute("aria-pressed",String(chosen===r));b.appendChild(D.createTextNode(r.full));
      b.appendChild(mk("span",null,(r.priv?"private · ":"")+"default branch "+r.branch+(r.pushed?" · pushed "+ago(Date.parse(r.pushed)):"")+(r.canPush?"":" · you cannot push here (a copy of your own is offered)")));b.onclick=function(){other.value="";pick(r);};list.appendChild(b);});}
  find.oninput=draw;
  other.oninput=function(){var m=/^\s*([\w.-]+)\/([\w.-]+)\s*$/.exec(other.value);if(m){var r={full:m[1]+"/"+m[2],owner:m[1],repo:m[2].replace(/\.git$/,""),branch:"main",canPush:true};
      api(R(r.owner,r.repo)).then(function(x){if(other.value.trim()!==m[0].trim())return;r.branch=x.data.default_branch||"main";r.priv=!!x.data.private;r.canPush=!!(x.data.permissions&&x.data.permissions.push);pick(r);},function(e){say.textContent=e&&e.message||String(e);});}};
  function page(n){return api("/user/repos?per_page=100&sort=pushed&page="+n).then(function(x){var d=x.data||[];d.forEach(function(r){repos.push({full:r.full_name,owner:r.owner&&r.owner.login,repo:r.name,branch:r.default_branch||"main",priv:!!r.private,pushed:r.pushed_at,canPush:!(r.permissions&&r.permissions.push===false)});});
      draw();if(d.length===100&&n<3)return page(n+1);});}
  page(1).then(null,function(e){list.innerHTML="";list.appendChild(mk("div","ghx-note",e&&e.message||String(e)));});
  go.onclick=function(){if(!chosen)return;var o={owner:chosen.owner,repo:chosen.repo,branch:br.value||chosen.branch};closeModal();
    toast("Opening "+o.owner+"/"+o.repo+" ("+o.branch+")… its progress is under Background tasks.");
    try{W.go("code");}catch(e){}
    open(o).then(null,function(e){toast("Could not open "+o.owner+"/"+o.repo+": "+(e&&e.message||e));});};
  setTimeout(function(){find.focus();},40);}
function leftSheet(pr){var G=pr.gh,by={};(G.left||[]).forEach(function(x){(by[x.why]=by[x.why]||[]).push(x.path);});
  var s=sheet('<h3>Left out of this session</h3><p class="small muted" style="margin-top:0">'+G.nLeft+' of the branch\'s files were not read. They stay on GitHub as they are: a push never changes them.</p><div id="ghxLeft"></div><div class="ghx-keys"><button class="btn primary" type="button" id="ghxOk">Close</button></div>');
  var h=s.querySelector("#ghxLeft");Object.keys(by).forEach(function(w){h.appendChild(mk("div","ghx-note","Because "+w+" ("+by[w].length+"):"));var ul=mk("ul","ghx-files");by[w].slice(0,60).forEach(function(p){var li=mk("li");li.appendChild(mk("b",null,p));ul.appendChild(li);});if(by[w].length>60){var li=mk("li",null,"and "+(by[w].length-60)+" more");ul.appendChild(li);}h.appendChild(ul);});
  s.querySelector("#ghxOk").onclick=closeModal;}
function colour(t){return escH(t).split("\n").map(function(l){return l.charAt(0)==="+"&&l.indexOf("+++")!==0?'<span class="p">'+l+'</span>':l.charAt(0)==="-"&&l.indexOf("---")!==0?'<span class="m">'+l+'</span>':l.indexOf("@@")===0?'<span class="h">'+l+'</span>':l;}).join("\n");}
function draftMessage(pr,ch){var c=curChat(),plan=null;try{plan=W.IngR215&&IngR215.planOf?IngR215.planOf(c):null;}catch(e){}
  var done=plan&&plan.plan?plan.plan.tasks.filter(function(t){return t.s==="done";}).map(function(t){return t.t;}):[];
  var title=(c&&c.title&&c.title!=="New session"?c.title.replace(/\s*·.*$/,""):"Changes from Ingenium").slice(0,72);
  var body=(done.length?done.slice(0,8).map(function(t){return "- "+t;}).join("\n")+"\n\n":"")+"Files: "+ch.toPush.map(function(t){return t.path;}).slice(0,12).join(", ")+(ch.toPush.length>12?" and "+(ch.toPush.length-12)+" more":"")+"\n\nMade in an Ingenium Code session.";
  return title+"\n\n"+body;}
function pushSheet(pr){var G=pr.gh;changes(pr).then(function(ch){
  var s=sheet('<h3>Review and push</h3><p class="small muted" style="margin-top:0">'+ch.toPush.length+' file'+(ch.toPush.length===1?"":"s")+' go to the branch <b>'+escH(G.work||workBranch(pr))+'</b> of '+escH(G.fork?G.fork.owner+"/"+G.fork.repo:G.full)+', as one commit. <b>'+escH(G.branch)+'</b> itself is not changed.</p>'
    +'<ul class="ghx-files" id="ghxF"></ul><pre class="ghx-diff" id="ghxD" hidden></pre>'
    +(G.work?'':'<label class="field"><span>The branch it goes to (new)</span><input type="text" id="ghxBrName" class="ghx-br" maxlength="120"></label>')
    +'<label class="field"><span>The commit\'s message</span><textarea id="ghxMsg"></textarea></label><div class="ghx-note" id="ghxSay" role="status"></div>'
    +'<div class="ghx-keys"><button class="btn ghost" type="button" id="ghxNo">Cancel</button><button class="btn primary" type="button" id="ghxGo">Commit and push</button></div>');
  var ul=s.querySelector("#ghxF"),pre=s.querySelector("#ghxD"),msg=s.querySelector("#ghxMsg"),say=s.querySelector("#ghxSay"),go=s.querySelector("#ghxGo"),bn=s.querySelector("#ghxBrName");msg.value=draftMessage(pr,ch);
  if(bn){bn.value=workBranch(pr);}
  ch.toPush.forEach(function(t){var li=mk("li");var b=mk("b",null,t.path);li.appendChild(b);var n=mk("span",null,t.how);li.appendChild(n);
    diffOf(pr,t.path).then(function(d){n.innerHTML=escH(t.how)+' <span class="a">+'+d.add+'</span> <span class="d">−'+d.del+'</span>';var v=mk("button","btn small ghost","Show");v.type="button";v.onclick=function(){pre.hidden=false;pre.innerHTML=colour(d.text);};li.appendChild(v);});ul.appendChild(li);});
  s.querySelector("#ghxNo").onclick=closeModal;
  function run(fork){if(bn){var v=bn.value.trim();var okName=/^[A-Za-z0-9._\/-]+$/.test(v)&&!/(^|\/)\.|\.\.|\/\/|\/$|\.lock$|^-/.test(v);try{if(IngRepo.core.okRefName)okName=okName&&IngRepo.core.okRefName(v);}catch(_){}
      if(!okName){say.textContent="A branch name has letters, digits, dots, dashes and slashes, with no spaces, and does not start or end with a slash.";bn.focus();return;}if(v===G.branch){say.textContent="Push to a branch of its own, not "+G.branch+" itself.";bn.focus();return;}G.work=v;}
    go.disabled=true;say.textContent="Pushing to GitHub…";push(pr,msg.value,{fork:fork}).then(function(r){closeModal();toast("Pushed "+r.files.length+" file"+(r.files.length===1?"":"s")+" to "+r.branch+" ("+short(r.commit)+").");paint();
      if(!G.pr)setTimeout(function(){prSheet(pr);},120);},
    function(e){go.disabled=false;if(!G.head&&bn)delete G.work;if(e&&e.needFork){say.textContent=e.message;go.textContent="Make my copy and push";go.onclick=function(){ingAskOr({title:"Make your own copy of "+G.full+"?",text:"GitHub makes a copy of the repository under your account (a fork). The changes are pushed there, and the pull request asks "+G.full+" to take them.",yes:"Make my copy"}).then(function(ok){if(ok)run(true);});};return;}
      say.textContent=e&&e.message||String(e);});}
  go.onclick=function(){run(false);};},function(e){toast(e&&e.message||String(e));});}
function ingAskOr(o){try{if(typeof W.ingAsk==="function")return Promise.resolve(W.ingAsk(o));}catch(e){}return Promise.resolve(W.confirm(o.title+"\n\n"+(o.text||"")));}
function prSheet(pr){var G=pr.gh;if(!G.head){toast("Push the changes first.");return;}var c=curChat();
  var title=(G.head.message||(c&&c.title)||"Changes from Ingenium").slice(0,250),body=draftMessage(pr,{toPush:[]}).split("\n\n").slice(1).join("\n\n");
  try{var plan=W.IngR215&&IngR215.planOf?IngR215.planOf(c):null;if(plan&&plan.plan){body="## What this does\n"+plan.plan.tasks.map(function(t){return (t.s==="done"?"- [x] ":"- [ ] ")+t.t;}).join("\n")+"\n\nMade in an Ingenium Code session.";}}catch(e){}
  var s=sheet('<h3>Create a pull request</h3><p class="small muted" style="margin-top:0">It asks '+escH(G.full)+' to bring the branch <b>'+escH(G.work)+'</b>'+(G.fork?' (from your copy)':'')+' into <b>'+escH(G.branch)+'</b>. Collaborators on the repository will see it.</p>'
    +'<label class="field"><span>Title</span><input type="text" id="ghxT" maxlength="250"></label><label class="field"><span>Description</span><textarea id="ghxB" style="min-height:120px"></textarea></label>'
    +'<label class="key-toggle"><input type="checkbox" id="ghxDraft" style="width:auto"> A draft, not yet ready for review</label><div class="ghx-note" id="ghxSay" role="status"></div>'
    +'<div class="ghx-keys"><button class="btn ghost" type="button" id="ghxNo">Not now</button><button class="btn primary" type="button" id="ghxGo">Create pull request</button></div>');
  var t=s.querySelector("#ghxT"),b=s.querySelector("#ghxB"),say=s.querySelector("#ghxSay"),go=s.querySelector("#ghxGo");t.value=title;b.value=body;
  s.querySelector("#ghxNo").onclick=closeModal;
  go.onclick=function(){go.disabled=true;say.textContent="Asking GitHub…";pullRequest(pr,{title:t.value,body:b.value,draft:s.querySelector("#ghxDraft").checked}).then(function(p){closeModal();toast("Pull request #"+p.number+" is open on GitHub.");status(pr).then(null,function(){});},function(e){go.disabled=false;say.textContent=e&&e.message||String(e);});};}
function updateSheet(pr,r){var s=sheet('<h3>Updated from GitHub</h3><p class="small muted" style="margin-top:0">'+escH(pr.gh.branch)+' is now at '+short(r.commit)+'.</p><div id="ghxU"></div><div class="ghx-keys"><button class="btn primary" type="button" id="ghxOk">Close</button></div>');
  var h=s.querySelector("#ghxU");function list(t,L){if(!L.length)return;h.appendChild(mk("div","ghx-note",t));var ul=mk("ul","ghx-files");L.slice(0,80).forEach(function(p){var li=mk("li");li.appendChild(mk("b",null,p));ul.appendChild(li);});h.appendChild(ul);}
  list("Brought in:",r.done);list("Kept as you changed them (GitHub changed them too; compare before you push):",r.kept);list("Not brought in:",r.skipped);if(!r.done.length&&!r.kept.length&&!r.skipped.length)h.appendChild(mk("div","ghx-note","No file Ingenium reads changed."));
  s.querySelector("#ghxOk").onclick=closeModal;}
function disconnect(pr){ingAskOr({title:"Disconnect "+pr.gh.full+"?",text:"The files stay here, as an app of the Code page. Nothing changes on GitHub; the branch and any pull request stay there.",yes:"Disconnect",danger:false}).then(function(ok){if(ok)forget(pr);});}

/* ================= 10. the model: told where it works, and given four tools ================= */
function inRepo(){var pr=curPr();return !!(pr&&pr.gh);}
(function wrapSys(){var o=W.chatSystemPrompt;if(typeof o!=="function")return;W.chatSystemPrompt=chatSystemPrompt=function(){var s=o.apply(this,arguments);try{var c=curChat(),pr=c&&ccIsCode(c)?curPr():null,G=pr&&pr.gh;if(!G)return s;
    var t="This Code session works on the GitHub repository "+G.full+", opened from the branch "+G.branch+" at commit "+short(G.base.commit)+". Its files are here, on this device"+(G.nLeft?"; "+G.nLeft+" of the branch's files were left out (binary, over 1 MB, installed packages, or possibly secret) and cannot be read or changed here":"")+"."
      +" Your changes stay here until they are pushed, as one commit, to the session's own branch "+(G.work||"ingenium/…")+" (never to "+G.branch+"): she pushes with Review and push, or you do with commit_and_push when she asks you to. A pull request is opened only with her yes (open_pull_request)."
      +" git_status shows what differs; git_diff shows one file's differences. Never say that you pushed, committed or opened a pull request unless the tool said it was done.";
    return s?s+"\n\n"+t:t;}catch(e){return s;}};})();
function addTools(){var A=W.IngAgent;if(!A||typeof A.addTool!=="function")return false;
  A.addTool({name:"git_status",description:"For a session on a GitHub repository: the files that differ from the branch the session started from, and those not yet pushed, with the branch names and the pull request's state.",input_schema:{type:"object",properties:{},required:[]}},
    function(ws){var pr=curPr();return changes(pr,ws).then(function(c){var G=pr.gh;var lines=["Repository "+G.full+", from "+G.branch+" at "+short(G.base.commit)+(G.work?", session branch "+G.work:"")+(G.head?", last push "+short(G.head.commit):"")+(G.pr?", pull request #"+G.pr.number+" ("+G.pr.state+")":"")+"."];
      lines.push(c.files.length?"Differ from "+G.branch+" ("+c.files.length+"): "+c.files.map(function(x){return x.how+" "+x.path;}).join("; ")+".":"Nothing differs from "+G.branch+".");
      lines.push(c.toPush.length?"Not yet pushed ("+c.toPush.length+"): "+c.toPush.map(function(x){return x.how+" "+x.path;}).join("; ")+".":"Nothing waits to be pushed.");
      return {text:lines.join("\n"),step:{i:"⑂",t:"Looked at what differs from GitHub · "+c.toPush.length+" to push"}};});},{ro:true,when:inRepo});
  A.addTool({name:"git_diff",description:"For a session on a GitHub repository: one file's differences from the branch the session started from, as a unified diff.",input_schema:{type:"object",properties:{file:{type:"string"}},required:["file"]}},
    function(ws,a){var pr=curPr();var name=clean(a.file),e=current(pr,ws).filter(function(x){return x.name===name;})[0]||current(pr,ws).filter(function(x){return edBaseSafe(x.name)===edBaseSafe(name);})[0];var path=e?e.name:name;
      return diffOf(pr,path,ws).then(function(d){var t=d.text.length>24000?d.text.slice(0,24000)+"\n[… the rest left out]":d.text;return {text:d.add||d.del?t:"No difference in "+path+".",step:{i:"±",t:"Looked at the differences in "+path+" · +"+d.add+" −"+d.del}};});},{ro:true,when:inRepo});
  A.addTool({name:"commit_and_push",description:"For a session on a GitHub repository: commit every change not yet pushed as one commit, with this message, and push it to the session's own branch (never the branch it started from). Use it when she asks to push, commit or save the work to GitHub.",
      input_schema:{type:"object",properties:{message:{type:"string",description:"The commit message: a short first line (at most 72 characters), then a blank line and what changed and why."}},required:["message"]}},
    function(ws,a){var pr=curPr();return push(pr,a.message,{fork:false,ws:ws}).then(function(r){return {text:"Pushed "+r.files.length+" file(s) to "+r.where+", branch "+r.branch+", commit "+r.commit+": "+r.url,step:{i:"↑",t:"Pushed "+r.files.length+" file"+(r.files.length===1?"":"s")+" to "+r.branch+" ("+short(r.commit)+")",url:r.url,linkText:"the commit"}};},
      function(e){if(e&&e.nothing)return {text:"Nothing to push: every change is already on GitHub.",step:{i:"↑",t:"Nothing to push"}};if(e&&e.needFork)return {text:e.message+" Tell her: she can press Review and push in the Environment to make the copy.",err:true,step:{i:"!",t:"Cannot push to "+pr.gh.full,bad:true}};throw e;});},{ro:false,when:inRepo});
  A.addTool({name:"open_pull_request",description:"For a session on a GitHub repository whose changes are pushed: ask her to open a pull request from the session's branch into the branch it started from. She sees the title and description and says yes or no.",
      input_schema:{type:"object",properties:{title:{type:"string"},body:{type:"string",description:"What the changes do and why, and how they were checked, in Markdown."},draft:{type:"boolean"}},required:["title","body"]}},
    function(ws,a){var pr=curPr(),G=pr.gh;if(G.pr&&G.pr.state==="open")return {text:"Pull request #"+G.pr.number+" is already open: "+G.pr.url,step:{i:"⇄",t:"The pull request is already open (#"+G.pr.number+")"}};
      return ingAskOr({title:"Open a pull request on "+G.full+"?",text:"The model asks to open “"+String(a.title||"").slice(0,120)+"” from "+(G.work||"the session's branch")+" into "+G.branch+". Collaborators will see it.",yes:"Open it"}).then(function(ok){
        if(!ok)return {text:"She did not open the pull request now.",step:{i:"⇄",t:"She kept the pull request for later"}};
        return pullRequest(pr,{title:a.title,body:a.body,draft:!!a.draft}).then(function(p){return {text:"Pull request #"+p.number+" is open: "+p.url,step:{i:"⇄",t:"Opened pull request #"+p.number,url:p.url,linkText:"the pull request"}};});});},{ro:false,when:inRepo});
  return true;}
function edBaseSafe(n){try{return edBase(n);}catch(e){return String(n||"").split("/").pop();}}

/* ================= 10b. in the session's top row: Push, Create PR, or the pull request itself ================= */
var TOP={key:"",n:0,busy:false};
function topKey(){var keys=$("ccpKeys");if(!keys)return null;var k=$("ghxTopKey");if(!k){k=mk("button","chat-top-key");k.type="button";k.id="ghxTopKey";k.hidden=true;keys.appendChild(k);
    k.onclick=function(){var pr=curPr();if(!pr||!pr.gh)return;var G=pr.gh;if(TOP.n)pushSheet(pr);else if(G.pr&&G.pr.url)try{W.open(G.pr.url,"_blank","noopener");}catch(e){}else if(G.head)prSheet(pr);};}
  return k;}
function topCode(){try{return W.CC&&CC.mode==="code"&&ccIsCode(curChat());}catch(e){return false;}}
function paintTop(force){var k=topKey();if(!k)return;var pr=curPr(),G=pr&&pr.gh;if(!G||!topCode()){k.hidden=true;return;}
  var sig=pr.id+"|"+(pr.updated||0)+"|"+(pr.files||[]).length+"|"+(G.head&&G.head.commit)+"|"+(G.pr&&G.pr.state)+"|"+(G.base&&G.base.commit)+"|"+(W.liveBot?1:0);
  function draw(){var lab,cls="";if(TOP.n){lab="⑂ Push<span class=\"ghx-n\">"+TOP.n+"</span>";k.title=TOP.n+" file"+(TOP.n===1?"":"s")+" to push to "+(G.work||"a branch of their own")+" on GitHub";}
    else if(G.pr){lab="⇄ PR #"+G.pr.number+(G.pr.state==="merged"?" merged":G.pr.state==="closed"?" closed":"");cls=G.pr.state==="merged"?"ok":"";k.title="Open pull request #"+G.pr.number+" on GitHub";}
    else if(G.head){lab="⇄ Create PR";k.title="Ask "+G.full+" to bring "+G.work+" into "+G.branch;}
    else{k.hidden=true;return;}
    k.innerHTML=lab;k.className="chat-top-key"+(cls?" "+cls:"");k.hidden=false;}
  if(!force&&sig===TOP.key){draw();return;}if(TOP.busy)return;TOP.busy=true;TOP.key=sig;
  changes(pr).then(function(c){TOP.busy=false;TOP.n=c?c.toPush.length:0;draw();},function(){TOP.busy=false;});}
var tick=null;
function watchTop(){if(tick)return;tick=setInterval(function(){try{if(D.hidden)return;if(!topCode()){var k=$("ghxTopKey");if(k)k.hidden=true;return;}paintTop(false);}catch(e){}},1500);}

/* ================= 10c. commands typed after a slash in a session on a repository ================= */
var CMDS=[{c:"/status",d:"What differs from GitHub, and what waits to be pushed",run:function(pr){statusSheet(pr);}},
  {c:"/diff",d:"Every change, file by file, with its differences",run:function(pr){pushSheet(pr);}},
  {c:"/push",d:"Commit and push to the session's own branch",run:function(pr){pushSheet(pr);}},
  {c:"/pr",d:"Create the pull request, or open it on GitHub",run:function(pr){var G=pr.gh;if(G.pr&&G.pr.url){try{W.open(G.pr.url,"_blank","noopener");}catch(e){}return;}if(!G.head){toast("Push first: /push.");pushSheet(pr);return;}prSheet(pr);}},
  {c:"/review",d:"The model reviews the changes against the branch, without changing a file",send:function(pr){return "Review the changes of this session against "+pr.gh.branch+": use git_status and git_diff, and look for bugs, risks, unclear code and missing checks. List what you find, the most important first, with the file and the line, and say what you would change. Do not change any file.";}},
  {c:"/update",d:"Bring newer work on GitHub into the files you have not changed",run:function(pr){update(pr).then(function(r){if(r.same)toast("Already up to date with "+pr.gh.branch+".");else updateSheet(pr,r);},function(e){toast(e&&e.message||String(e));});}}];
var cmdBox=null,cmdSel=0,cmdList=[];
function cmdsFor(v){var pr=curPr();if(!pr||!pr.gh||!topCode())return [];var m=/^\/([a-z]*)$/.exec(String(v||"").trim());if(!m)return [];return CMDS.filter(function(c){return c.c.indexOf("/"+m[1])===0;});}
function cmdPaint(){var inp=$("chatInput");cmdList=inp?cmdsFor(inp.value):[];if(!cmdList.length){if(cmdBox)cmdBox.hidden=true;return;}
  if(!cmdBox){cmdBox=mk("div","ghx-cmds");cmdBox.id="ghxCmds";cmdBox.setAttribute("role","listbox");cmdBox.setAttribute("aria-label","Commands");cmdBox.hidden=true;D.body.appendChild(cmdBox);}
  if(cmdSel>=cmdList.length)cmdSel=0;cmdBox.innerHTML="";cmdList.forEach(function(c,i){var b=mk("button","ghx-cmd");b.type="button";b.setAttribute("role","option");b.setAttribute("aria-selected",String(i===cmdSel));
    b.appendChild(D.createTextNode(c.c));b.appendChild(mk("small",null,c.d));b.onmousedown=function(e){e.preventDefault();cmdRun(c);};cmdBox.appendChild(b);});
  cmdBox.hidden=false;try{var r=inp.getBoundingClientRect(),h=cmdBox.offsetHeight||200;cmdBox.style.left=Math.round(Math.max(8,Math.min(r.left,innerWidth-(cmdBox.offsetWidth||300)-8)))+"px";cmdBox.style.top=Math.round(Math.max(8,r.top-h-8))+"px";}catch(e){}}
function cmdRun(c){var inp=$("chatInput"),pr=curPr();if(cmdBox)cmdBox.hidden=true;if(!pr||!pr.gh)return;inp.value="";try{inp.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}
  if(c.send){inp.value=c.send(pr);try{sendChat();}catch(e){warn(e);}return;}c.run(pr);}
function cmdKeys(e){var inp=$("chatInput");if(!inp||e.target!==inp)return;if(!cmdBox||cmdBox.hidden||!cmdList.length){
    if(e.key==="Enter"&&!e.shiftKey){var exact=cmdsFor(inp.value).filter(function(c){return c.c===String(inp.value).trim();})[0];if(exact){e.preventDefault();e.stopImmediatePropagation();cmdRun(exact);}}return;}
  if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();e.stopImmediatePropagation();cmdSel=(cmdSel+(e.key==="ArrowDown"?1:cmdList.length-1))%cmdList.length;cmdPaint();}
  else if(e.key==="Enter"||e.key==="Tab"){e.preventDefault();e.stopImmediatePropagation();cmdRun(cmdList[cmdSel]);}
  else if(e.key==="Escape"){e.preventDefault();e.stopImmediatePropagation();cmdBox.hidden=true;}}
D.addEventListener("keydown",cmdKeys,true);
D.addEventListener("input",function(e){if(e.target&&e.target.id==="chatInput"){cmdSel=0;cmdPaint();}},true);
function statusSheet(pr){var G=pr.gh;changes(pr).then(function(c){var s=sheet('<h3>'+escH(G.full)+'</h3><p class="small muted" style="margin-top:0">From <b>'+escH(G.branch)+'</b> at '+short(G.base.commit)+(G.work?'; the session\'s branch is <b>'+escH(G.work)+'</b>'+(G.head?' (last push '+short(G.head.commit)+', '+ago(G.head.at)+')':' (not on GitHub yet)'):'')+(G.pr?'; pull request #'+G.pr.number+' is '+escH(G.pr.state):'')+'.</p><div id="ghxS"></div><div class="ghx-keys"><button class="btn ghost" type="button" id="ghxOk">Close</button>'+(c.toPush.length?'<button class="btn primary" type="button" id="ghxP">Review and push</button>':'')+'</div>');
    var h=s.querySelector("#ghxS");function list(t,L){h.appendChild(mk("div","ghx-note",t));if(!L.length){h.appendChild(mk("div","ghx-note","None."));return;}var ul=mk("ul","ghx-files");L.forEach(function(x){var li=mk("li");li.appendChild(mk("b",null,x.path));li.appendChild(mk("span",null,x.how));ul.appendChild(li);});h.appendChild(ul);}
    list("To push ("+c.toPush.length+"):",c.toPush);list("Different from "+G.branch+" ("+c.files.length+"):",c.files);
    s.querySelector("#ghxOk").onclick=closeModal;var pb=s.querySelector("#ghxP");if(pb)pb.onclick=function(){closeModal();setTimeout(function(){pushSheet(pr);},60);};});}

/* ================= 11. the Code page's own doors: From GitHub, beside New app ================= */
(function wrapWelcome(){var o=W.ccWelcome;if(typeof o!=="function")return;W.ccWelcome=ccWelcome=function(){var r=o.apply(this,arguments);try{var st=D.querySelector("#modalBox .cc-start");
    if(st&&!st.querySelector('[data-a="github"]')){var b=mk("button","cc-card");b.type="button";b.setAttribute("data-a","github");b.innerHTML="<b>From GitHub</b><span>One of your repositories, on the branch you choose: your changes go to a branch of their own, and a pull request brings them in.</span>";
      b.onclick=function(){closeModal();setTimeout(connectSheet,60);};st.insertBefore(b,st.children[1]||null);}}catch(e){warn(e);}return r;};})();

/* ================= 11b. the Guide: a card that explains it, for a refresher ================= */
function guideCard(){var page=$("page-guide");if(!page||$("ghxGuide"))return;var c=mk("div","card blx-guide");c.id="ghxGuide";
  c.innerHTML='<h3>Code on a GitHub repository</h3><p class="small muted" style="margin-top:0">A Code session can work on one of your repositories: its changes go to GitHub on a branch of their own, then into a pull request.</p>';
  var dl=mk("dl");function row(t,d){dl.appendChild(mk("dt",null,t));dl.appendChild(mk("dd",null,d));}
  row("Connect","In the Session column's Environment, or Code's first choice, From GitHub. Sign in once with a token made on GitHub (Contents and Pull requests, read and write); it is kept on this device and sent only to GitHub. Choose the repository and its branch.");
  row("What is read","The branch as it is now: its text files. Left out, and named with the reason: pictures and other binary files, files over 1 MB, folders of installed packages, and files that may hold secrets (a .env file, keys). What is left out is never fetched, and a push never changes it.");
  row("Changes","Ingenium knows, file by file, what differs from the branch it started from, and what waits to be pushed. Review and push shows each file with its lines added and removed, and the whole difference.");
  row("Push","One commit, with your message, to the session's own branch (ingenium/…, or a name you give before the first push). The branch it started from is never changed. Where you cannot push, Ingenium offers your own copy of the repository (a fork) and pushes there.");
  row("Pull request","Create PR asks the repository to bring the session's branch into the branch it started from. The Environment and the session's top row then follow it: open, merged or closed, and its checks (passed, failed, running).");
  row("Update from GitHub","Before the first push: newer work on the branch comes into the files you have not changed; those you have changed are kept and named.");
  row("Commands","Type a slash in the message box: /status, /diff, /push, /pr, /review (the model reviews the changes without editing), /update.");
  row("The model","It is told where it works, and has four tools: git_status, git_diff, commit_and_push (to the session's branch) and open_pull_request (which always waits for your yes).");
  c.appendChild(dl);var anchor=$("blxGuide")||$("guideEffortCard")||page.querySelector(".card:last-of-type");if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(c,anchor.nextSibling);else page.appendChild(c);}
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r219)return;var ng=function(p){var r=og.apply(this,arguments);try{if(p==="guide")guideCard();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r219=true;W.go=go=ng;})();

/* ================= 12. start ================= */
function boot(){try{addTools();}catch(e){warn(e);}try{watch();}catch(e){}try{watchTop();}catch(e){}try{guideCard();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function later(){var n=0;(function wait(){if(W.__ingReady===true){boot();var k=0;(function again(){watch();if(++k<40&&!($("ccPanel")&&$("ccPanel").__ghx))setTimeout(again,1500);})();return;}if(++n<400)setTimeout(wait,500);})();})();
W.IngGitHubCode={connect:connectSheet,open:open,commands:CMDS,paintTop:paintTop,changes:changes,diff:diffOf,push:push,pullRequest:pullRequest,status:status,update:update,forget:forget,paint:paint,api:api,signIn:signIn,
  repo:function(){var pr=curPr();return pr&&pr.gh||null;},blobSha:blobSha,limits:{file:MAX_FILE,files:MAX_FILES,bytes:MAX_BYTES},why:why};
})();
;try{window.__ingParts["p219"]="running";}catch(_){}
</script>
