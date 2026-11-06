<style id="r238-css">
/* ============ R238 · A GITHUB REPOSITORY IN A FOLDER (Ingenium 6.39, 6 November 2026) ============
   Asked what a folder should take from a GitHub repository, she answered (6 November 2026): "I want its README, its files, and its
   issues." So a repository can be brought into a folder, a new one or one she has:
   - its README joins the folder's files, so it goes with every conversation in the folder (as a folder's files always have);
   - its text files are kept on this device, in the long-text store (on a computer app, on its disk too), each one listed in the
     folder with Show and Use in a conversation;
   - its issues, open and closed, with their labels and every comment, are kept the same way; pull requests are left out (GitHub's
     issue list carries them too).
   Bring it up to date reads it all again; Remove from this folder lets it all go. It is read straight from GitHub on her press and at
   no other time: from api.github.com (the repository, its file list, its README, its issues and comments) and raw.githubusercontent.com
   (each file). A public repository needs nothing more; a private one needs the token Add from GitHub keeps on this device, and then
   every file is read through the API. What is left out, for the page's own stability (one file over 1 MB, or more than 3,000 files or
   25 MB of text in all) or because it is not text (pictures, archives), is counted and said. Sizes are the app's own: card headings
   16.5px, text 13px, keys .btn small. */
#page-folders .frp-meta{font-size:12.5px;color:var(--ink-3);line-height:1.5;margin:2px 0 0}
#page-folders .frp-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0 8px}
#page-folders .frp-tab{min-height:28px;padding:4px 12px;border-radius:999px;border:1px solid var(--hairline);background:var(--card);color:var(--ink-2);font:600 12px/1.2 var(--sans);cursor:pointer}
#page-folders .frp-tab[aria-selected="true"]{background:var(--accent);border-color:var(--accent);color:#fff}
#page-folders .frp-tab:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
#page-folders .frp-find{display:flex;gap:8px;align-items:center;margin:0 0 6px}
#page-folders .frp-find input{max-width:340px}
#page-folders .frp-find select{width:auto;min-width:180px}
#page-folders .frp-card a.btn{text-decoration:none}
#page-folders .frp-list{list-style:none;margin:0;padding:0;max-height:360px;overflow:auto;border-top:1px solid var(--hairline)}
#page-folders .frp-list > li{padding:7px 2px;border-bottom:1px solid var(--hairline);font-size:13px;line-height:1.45}
#page-folders .frp-row{display:flex;align-items:center;gap:8px;min-width:0}
#page-folders .frp-p{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink-1)}
#page-folders .frp-n{flex:0 0 auto;font-size:11.5px;color:var(--ink-3)}
#page-folders .frp-st{flex:0 0 auto;font:600 11px/1 var(--sans);padding:3px 7px;border-radius:999px;background:var(--accent-softer,rgba(106,63,181,.08));color:var(--accent)}
#page-folders .frp-st.closed{background:rgba(110,110,120,.12);color:var(--ink-3)}
#page-folders .frp-text{margin:6px 0 2px;max-height:300px;overflow:auto;white-space:pre-wrap;word-break:break-word;font:12.5px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  background:var(--input-bg);border:1px solid var(--hairline);border-radius:10px;padding:10px 12px;color:var(--ink-1)}
#page-folders .frp-readme{font-family:var(--sans);font-size:13px}
#page-folders .frp-note{font-size:12px;color:var(--ink-3);margin:8px 0 0}
#frpBox .frp-prog{min-height:18px;font-size:12.5px;color:var(--ink-2);margin-top:8px}
#frpBox .frp-err{color:var(--bad,#b8433f)}
body[data-theme="night"] #frpBox .frp-err{color:#f0a89e}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p238"]="started";}catch(_){}
(function r238(){"use strict";
var W=window,D=document;
var API="https://api.github.com",RAW="https://raw.githubusercontent.com";
var LIMIT={file:1048576,total:25*1048576,files:3000,issuePages:50,commentPages:100};
var BUSY=null;   // the run in progress: {stop}
function $(id){return D.getElementById(id);}
function h(t,c,html){var e=D.createElement(t);if(c)e.className=c;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function say(t){try{W.ingToast(t);}catch(e){}}
function save(){try{W.saveState();}catch(e){}}
function day(t){try{return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}
function key(cls,txt,fn,title){var b=h("button","btn small"+(cls?" "+cls:""));b.type="button";b.textContent=txt;if(title)b.title=title;b.addEventListener("click",function(e){e.preventDefault();fn(b,e);});return b;}
function size(n){n=+n||0;return n<1024?n+" bytes":n<1048576?Math.round(n/1024)+" KB":(n/1048576).toFixed(1)+" MB";}
function coded(code,extra){var e=new Error(code);e.code=code;if(extra)Object.keys(extra).forEach(function(k){e[k]=extra[k];});return e;}
function projects(){var s=W.state;if(!Array.isArray(s.projects))s.projects=[];return s.projects;}
function folders(){return projects().filter(function(p){return p&&p.kind==="app"&&p.app;});}
function folderById(id){return folders().filter(function(p){return p.id===id;})[0]||null;}
function token(){try{return String((W.state.github&&W.state.github.token)||"").trim();}catch(e){return "";}}
function headers(raw){var hd={"Accept":raw?"application/vnd.github.raw":"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"},t=token();if(t)hd.Authorization="Bearer "+t;return hd;}
var TEXTISH=/^(readme|license|licence|copying|notice|authors|contributing|changelog|changes|makefile|dockerfile|procfile|gemfile|rakefile|\.gitignore|\.gitattributes|\.editorconfig|\.env\.example)(\.[a-z0-9]+)?$/i;
function isText(path){var name=String(path).split("/").pop();try{if(W.TEXT_EXT&&W.TEXT_EXT.test(name))return true;}catch(e){}
  return TEXTISH.test(name)||/\.(txt|md|markdown|rst|adoc|csv|tsv|json|jsonl|xml|html?|css|js|mjs|cjs|ts|tsx|jsx|py|java|c|h|cc|cpp|hpp|cs|go|rs|rb|php|swift|kt|sh|ya?ml|toml|ini|cfg|sql|tex|svg|gradle|properties|lua|dart|scala|vue|svelte|ipynb)$/i.test(name);}

/* "https://github.com/owner/repository", with /tree/<branch> or .git, or "owner/repository" */
function parseLink(u){u=String(u||"").trim().replace(/\.git\/?$/,"");
  var m=/^(?:https?:\/\/)?(?:www\.)?github\.com\/([A-Za-z0-9-]{1,39})\/([A-Za-z0-9._-]{1,100})(?:\/tree\/([^?#]+?))?\/?(?:[?#].*)?$/.exec(u)||/^([A-Za-z0-9-]{1,39})\/([A-Za-z0-9._-]{1,100})$/.exec(u);
  if(!m||m[2]==="."||m[2]==="..")return null;return {o:m[1],r:m[2],ref:m[3]?decodeURIComponent(m[3]):null};}

/* one request to GitHub's API: its refusals in plain words (not found or private, the token, the hourly limit) */
function gh(path,raw){if(BUSY&&BUSY.stopped)return Promise.reject(coded("STOPPED"));
  return fetch(API+path,{headers:headers(raw)}).then(function(res){
    if(res.status===404)throw coded("NOT_FOUND");if(res.status===401)throw coded("TOKEN");
    if(res.status===403||res.status===429){var rem=res.headers.get("x-ratelimit-remaining"),reset=+res.headers.get("x-ratelimit-reset")||0;
      if(rem==="0"||res.status===429)throw coded("RATE",{reset:reset});
      /* where the limit's headers cannot be read, GitHub's own message says it */
      return res.text().then(function(t){if(/rate limit/i.test(String(t||"")))throw coded("RATE",{reset:reset});throw coded("FORBIDDEN");},function(e){if(e&&e.code)throw e;throw coded("FORBIDDEN");});}
    if(!res.ok)throw coded("HTTP",{status:res.status});return raw?res.text():res.json();},function(e){if(e&&e.code)throw e;throw coded("OFFLINE");});}
function fileText(R,path){var enc=path.split("/").map(encodeURIComponent).join("/");
  if(token())return gh("/repos/"+R.o+"/"+R.r+"/contents/"+enc+"?ref="+encodeURIComponent(R.branch),true);
  if(BUSY&&BUSY.stopped)return Promise.reject(coded("STOPPED"));
  return fetch(RAW+"/"+R.o+"/"+R.r+"/"+encodeURIComponent(R.branch)+"/"+enc).then(function(res){if(!res.ok)throw coded(res.status===404?"NOT_FOUND":"HTTP",{status:res.status});return res.text();},function(){throw coded("OFFLINE");});}
function plain(e,R){var c=e&&e.code,who=R?R.o+"/"+R.r:"The repository";
  if(c==="NOT_FOUND")return who+" was not found on GitHub. Check the link; if it is private, add a token (Chat, the + key, Add from GitHub) and try again.";
  if(c==="TOKEN")return "GitHub did not accept the token kept on this device. Replace it in Chat, the + key, Add from GitHub.";
  if(c==="RATE")return "GitHub's limit of requests without a token is reached for this hour"+(e.reset?"; it opens again at "+new Date(e.reset*1000).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}):"")+". A token (Chat, the + key, Add from GitHub) raises the limit.";
  if(c==="FORBIDDEN")return "GitHub refused to show "+who+" to this device.";
  if(c==="OFFLINE")return "GitHub could not be reached. Check the connection and try again.";
  if(c==="STOPPED")return "Stopped. Nothing was changed in the folder.";
  return "GitHub answered with an error"+(e&&e.status?" ("+e.status+")":"")+".";}

/* every page of a list (issues, comments), a hundred at a time */
function pages(path,max,onPage){var all=[],n=1;function next(){return gh(path+(path.indexOf("?")<0?"?":"&")+"per_page=100&page="+n).then(function(list){
    list=Array.isArray(list)?list:[];all=all.concat(list);if(onPage)onPage(n,all.length);if(list.length<100||n>=max)return {items:all,more:list.length>=100&&n>=max};n++;return next();});}return next();}

/* reads the repository whole: what it is, its README, its text files and its issues with their comments. Nothing is kept until all is read */
function read(R,step){var out={o:R.o,r:R.r,ref:R.ref||null,files:[],skipped:{notText:0,tooBig:0,beyond:0,failed:0},truncated:false};
  step("Asking GitHub for "+R.o+"/"+R.r+"…");
  return gh("/repos/"+R.o+"/"+R.r).then(function(info){
    out.branch=R.ref||info.default_branch||"main";out.url=info.html_url||("https://github.com/"+R.o+"/"+R.r);out.desc=String(info.description||"").slice(0,400);out.isPrivate=!!info.private;
    R.branch=out.branch;step("Reading its list of files…");
    return gh("/repos/"+R.o+"/"+R.r+"/git/trees/"+encodeURIComponent(out.branch)+"?recursive=1");
  }).then(function(tree){out.truncated=!!tree.truncated;
    var blobs=(tree.tree||[]).filter(function(x){return x&&x.type==="blob"&&x.path;}).sort(function(a,b){return a.path<b.path?-1:a.path>b.path?1:0;});
    var take=[],total=0;
    blobs.forEach(function(b){if(!isText(b.path)){out.skipped.notText++;return;}if((b.size||0)>LIMIT.file){out.skipped.tooBig++;return;}
      if(take.length>=LIMIT.files||total+(b.size||0)>LIMIT.total){out.skipped.beyond++;return;}take.push(b);total+=b.size||0;});
    step("Reading its README…");
    return gh("/repos/"+R.o+"/"+R.r+"/readme"+(R.ref?"?ref="+encodeURIComponent(out.branch):""),true).then(function(t){out.readme=String(t||"");},function(e){if(e.code==="NOT_FOUND"){out.readme="";return;}throw e;})
      .then(function(){var i=0,done=0,texts={};
        function worker(){if(i>=take.length)return Promise.resolve();var b=take[i++];
          return fileText(R,b.path).then(function(t){t=String(t);if(t.indexOf("\u0000")>=0){out.skipped.notText++;return;}texts[b.path]=t;},function(e){if(e.code==="RATE"||e.code==="TOKEN"||e.code==="STOPPED"||e.code==="OFFLINE")throw e;out.skipped.failed++;})
            .then(function(){done++;if(done%5===0||done===take.length)step("Reading its files: "+done+" of "+take.length+"…");return worker();});}
        return Promise.all([worker(),worker(),worker(),worker()]).then(function(){take.forEach(function(b){if(texts[b.path]!=null)out.files.push({path:b.path,size:b.size||texts[b.path].length,text:texts[b.path]});});});});
  }).then(function(){step("Reading its issues…");
    return pages("/repos/"+R.o+"/"+R.r+"/issues?state=all&sort=created&direction=asc",LIMIT.issuePages,function(n,c){step("Reading its issues: "+c+" so far…");});
  }).then(function(iss){var issues=[],prs=0;
    iss.items.forEach(function(x){if(!x||x.pull_request){prs++;return;}issues.push({n:x.number,title:String(x.title||""),state:x.state==="closed"?"closed":"open",
      labels:(x.labels||[]).map(function(l){return typeof l==="string"?l:l&&l.name;}).filter(Boolean),by:x.user&&x.user.login||"",made:x.created_at||"",updated:x.updated_at||"",closed:x.closed_at||"",body:String(x.body||""),comments:[]});});
    out.issues=issues;out.prs=prs;out.issuesMore=iss.more;
    if(!issues.length)return;step("Reading the comments…");
    return pages("/repos/"+R.o+"/"+R.r+"/issues/comments?sort=created&direction=asc",LIMIT.commentPages,function(n,c){step("Reading the comments: "+c+" so far…");}).then(function(cm){
      var byN={};issues.forEach(function(x){byN[x.n]=x;});
      cm.items.forEach(function(c){var m=/\/issues\/(\d+)$/.exec(String(c&&c.issue_url||""));var x=m&&byN[+m[1]];if(x)x.comments.push({by:c.user&&c.user.login||"",made:c.created_at||"",body:String(c.body||"")});});
      out.commentsMore=cm.more;});
  }).then(function(){return out;});}

/* an issue as text, for Show and for a conversation */
function issueText(R,x){var L=["#"+x.n+" "+x.title,"State: "+x.state+(x.closed?" (closed "+day(x.closed)+")":"")+(x.labels.length?". Labels: "+x.labels.join(", "):"")+". Opened by "+(x.by||"someone")+", "+day(x.made)+".","",x.body.trim()||"(no description)"];
  x.comments.forEach(function(c){L.push("","---","Comment by "+(c.by||"someone")+", "+day(c.made)+":","",c.body.trim());});
  return L.join("\n");}

function readmeName(R){return "README ("+R.o+"/"+R.r+")";}
/* keeps what was read in the folder: the README among its files, the files and the issues in the long-text store */
function keep(p,got){var B=W.IngBig;if(!B||typeof B.put!=="function")return Promise.reject(new Error("the long-text store is missing"));
  var old=p.app.repo||null,puts=[],files=[];
  got.files.forEach(function(f){var id=B.newId();puts.push(B.put(id,f.text));files.push({path:f.path,size:f.size,big:id});});
  var issueId=null;if(got.issues.length){issueId=B.newId();puts.push(B.put(issueId,JSON.stringify(got.issues)));}
  return Promise.all(puts).then(function(){
    p.files=(p.files||[]).filter(function(f){return !(f&&f.name===readmeName(got)||old&&f&&f.name===readmeName(old));});
    if(got.readme){var max=W.FILE_MAX_CHARS||200000;p.files.push({name:readmeName(got),text:got.readme.slice(0,max)});}
    p.app.repo={o:got.o,r:got.r,ref:got.ref,branch:got.branch,url:got.url,desc:got.desc,isPrivate:got.isPrivate,at:Date.now(),readmeChars:got.readme.length,
      files:files,skipped:got.skipped,truncated:got.truncated,issues:{big:issueId,count:got.issues.length,open:got.issues.filter(function(x){return x.state==="open";}).length,prs:got.prs,more:!!(got.issuesMore||got.commentsMore),
        list:got.issues.map(function(x){return {n:x.n,title:x.title.slice(0,200),state:x.state,c:x.comments.length,labels:x.labels.slice(0,6)};})}};
    save();
    /* what the earlier reading kept goes, now that the new one is kept */
    if(old){(old.files||[]).forEach(function(f){try{B.del(f.big);}catch(e){}});if(old.issues&&old.issues.big)try{B.del(old.issues.big);}catch(e){}}
    return p.app.repo;});}

function forget(p){var R=p.app.repo;if(!R)return;var B=W.IngBig;
  (R.files||[]).forEach(function(f){try{B.del(f.big);}catch(e){}});if(R.issues&&R.issues.big)try{B.del(R.issues.big);}catch(e){}
  p.files=(p.files||[]).filter(function(f){return !(f&&f.name===readmeName(R));});delete p.app.repo;save();}

/* a folder for a repository: the one chosen, or a new one named after the repository */
function folderFor(choice,R){if(choice&&choice!=="new")return folderById(choice);
  var p=null;try{p=W.IngFolders&&W.IngFolders.make?W.IngFolders.make(R.r,[]):null;}catch(e){p=null;}return p;}

/* brings a repository into a folder: the link, the folder, then everything read before anything is kept */
function bring(link,choice,step){var R=parseLink(link);if(!R)return Promise.reject(coded("LINK"));
  if(BUSY)return Promise.reject(coded("BUSY"));BUSY={stopped:false};var run=BUSY;
  return read(R,step||function(){}).then(function(got){if(run.stopped)throw coded("STOPPED");var p=folderFor(choice,R);if(!p)throw coded("FOLDER");
      return keep(p,got).then(function(repo){return {folder:p,repo:repo,got:got};});})
    .then(function(r){BUSY=null;return r;},function(e){BUSY=null;throw e;});}
function stop(){if(BUSY)BUSY.stopped=true;}

function summary(R){var s=R.files.length+" file"+(R.files.length===1?"":"s")+" and "+R.issues.count+" issue"+(R.issues.count===1?"":"s")+" ("+R.issues.open+" open)";return s;}

/* ---------- the dialog: a link and a folder ---------- */
function open(folderId){if(typeof W.modalOpen!=="function")return;
  var fs=folders(),opts='<option value="new">A new folder, named after the repository</option>'+fs.map(function(p){return '<option value="'+esc(p.id)+'"'+(p.id===folderId?" selected":"")+'>'+esc(p.name)+'</option>';}).join("");
  var box=W.modalOpen('<div id="frpBox"><h3>Bring in a GitHub repository</h3><p class="small muted">Its README joins the folder\'s files and goes with every conversation in it; its text files and its issues, with their comments, are kept in the folder for you to show or use. This uses the internet, on your press only.</p>'
    +'<label class="field"><span>The repository\'s link</span><input type="text" id="frpLink" placeholder="https://github.com/owner/repository" autocomplete="off" spellcheck="false"></label>'
    +'<label class="field"><span>Into the folder</span><select id="frpFolder">'+opts+'</select></label>'
    +'<p class="small muted">A public repository needs nothing more. A private one needs a token: the one Add from GitHub keeps on this device ('+(token()?"there is one":"none yet")+').</p>'
    +'<div class="frp-prog" id="frpProg" role="status" aria-live="polite"></div>'
    +'<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px"><button class="btn ghost" id="frpClose" type="button">Close</button><button class="btn primary" id="frpGo" type="button">Bring it in</button></div></div>');
  var prog=box.querySelector("#frpProg"),go=box.querySelector("#frpGo"),cl=box.querySelector("#frpClose");
  cl.onclick=function(){if(BUSY){stop();return;}W.closeModal();};
  go.onclick=function(){var link=box.querySelector("#frpLink").value,choice=box.querySelector("#frpFolder").value;
    if(!parseLink(link)){prog.className="frp-prog frp-err";prog.textContent="That is not a repository's link. It looks like https://github.com/owner/repository.";return;}
    go.disabled=true;cl.textContent="Stop";prog.className="frp-prog";
    bring(link,choice,function(t){prog.textContent=t;}).then(function(r){W.closeModal();
      try{var G=W.state.folders;if(G&&G.ui){G.ui.open=r.folder.id;G.ui.repoTab="readme";}save();if(W.IngFolders&&W.IngFolders.paint)W.IngFolders.paint();}catch(e){}
      say(r.repo.o+"/"+r.repo.r+" is in the folder "+r.folder.name+": its README, "+summary(r.repo)+".");},
    function(e){go.disabled=false;cl.textContent="Close";prog.className="frp-prog frp-err";
      prog.textContent=e&&e.code==="LINK"?"That is not a repository's link.":e&&e.code==="BUSY"?"A repository is already being read.":e&&e.code==="FOLDER"?"The folder could not be made.":plain(e,parseLink(link));});};
  setTimeout(function(){var i=box.querySelector("#frpLink");if(i)i.focus();},30);}

/* ---------- the card in a folder ---------- */
function useIn(p,name,text){try{W.go("chat");var b=$("chatNew");if(b)b.click();var c=W.curChat();c.projectId=p.id;save();if(typeof W.paintChips==="function")W.paintChips();
    if(typeof W.stageText==="function"){W.stageText(name,text,false);if(typeof W.paintChips==="function")W.paintChips();}
    say(name+" goes with your next message, in a new conversation in "+p.name+".");}catch(e){say("It could not be added: "+(e&&e.message||e));}}
function loadText(id){var B=W.IngBig;if(!B)return Promise.resolve(null);return Promise.resolve(typeof B.load==="function"?B.load(id):B.get(id));}
function issuesOf(R){return R.issues&&R.issues.big?loadText(R.issues.big).then(function(t){try{return JSON.parse(t)||[];}catch(e){return [];}}):Promise.resolve([]);}

function card(p,host){var R=p.app&&p.app.repo;var G=W.state.folders||{};G.ui=G.ui||{};
  var c=h("div","card frp-card");c.id="frpCard";
  if(!R){c.appendChild(h("h2","sec","A GitHub repository"));c.appendChild(h("p","small muted","Bring one into this folder: its README goes with every conversation here, and its files and issues are kept here for you to show or use."));
    var r0=h("div","fld-row");r0.style.marginTop="8px";r0.appendChild(key("","Bring in a repository",function(){open(p.id);}));c.appendChild(r0);host.appendChild(c);return c;}
  c.appendChild(h("h2","sec","GitHub repository: "+esc(R.o+"/"+R.r)));
  c.appendChild(h("p","frp-meta",esc((R.desc?R.desc.trim().replace(/[.!?]?$/,function(x){return x||".";})+" ":"")+"Branch "+R.branch+", brought in "+day(R.at)+(R.isPrivate?", private":"")+". Its README goes with every conversation in this folder; a file or an issue goes with a conversation when you use it.")));
  var row=h("div","fld-row");row.style.marginTop="8px";
  row.appendChild(key("","Bring it up to date",function(btn){btn.disabled=true;var old=btn.textContent;
    bring(R.o+"/"+R.r+(R.ref?"/tree/"+R.ref:""),p.id,function(t){btn.textContent=t.length>48?t.slice(0,46)+"…":t;}).then(function(r){say(r.repo.o+"/"+r.repo.r+" is up to date: "+summary(r.repo)+".");paintAll();},
      function(e){btn.disabled=false;btn.textContent=old;say(plain(e,R));});},"Reads the README, the files and the issues again"));
  var gl=h("a","btn small");gl.href=R.url;gl.target="_blank";gl.rel="noopener";gl.textContent="Open on GitHub";row.appendChild(gl);
  row.appendChild(key("ghost","Remove from this folder",function(){var fn=function(){forget(p);paintAll();say(R.o+"/"+R.r+" was taken out of "+p.name+".");};
    if(typeof W.ingConfirm==="function")W.ingConfirm("Take "+R.o+"/"+R.r+" out of "+p.name+"? Its README, files and issues kept here go; the repository on GitHub is not touched.",fn,{yes:"Take it out",no:"Keep it"});else fn();}));
  c.appendChild(row);
  var tabs=h("div","frp-tabs");tabs.setAttribute("role","tablist");tabs.setAttribute("aria-label","The repository's parts");
  var cur=G.ui.repoTab||"readme",body=h("div","frp-body");
  [["readme","README"],["files","Files ("+R.files.length+")"],["issues","Issues ("+R.issues.count+")"]].forEach(function(t){var b=h("button","frp-tab",esc(t[1]));b.type="button";b.setAttribute("role","tab");b.setAttribute("aria-selected",t[0]===cur?"true":"false");b.setAttribute("data-k",t[0]);
    b.addEventListener("click",function(){G.ui.repoTab=t[0];save();paintAll();});tabs.appendChild(b);});
  c.appendChild(tabs);c.appendChild(body);
  if(cur==="readme"){var rf=(p.files||[]).filter(function(f){return f&&f.name===readmeName(R);})[0];
    body.appendChild(rf?h("div","frp-text frp-readme",esc(rf.text)):h("p","small muted","This repository has no README."));}
  else if(cur==="files")filesView(p,R,body);
  else issuesView(p,R,body);
  var sk=R.skipped||{},left=[];if(sk.notText)left.push(sk.notText+" not text (pictures, archives and the like)");if(sk.tooBig)left.push(sk.tooBig+" over 1 MB");if(sk.beyond)left.push(sk.beyond+" beyond 3,000 files or 25 MB of text");if(sk.failed)left.push(sk.failed+" GitHub did not give");
  if(left.length||R.truncated||(R.issues&&R.issues.more))c.appendChild(h("p","frp-note",esc("Left out: "+(left.join("; ")||"nothing")+"."+(R.truncated?" GitHub gave only part of a very large file list.":"")+(R.issues&&R.issues.more?" Only the first 5,000 issues or 10,000 comments were read.":""))));
  host.appendChild(c);return c;}

function filesView(p,R,body){var G=W.state.folders.ui,f=h("div","frp-find"),inp=h("input");inp.type="text";inp.placeholder="Find a file";inp.setAttribute("aria-label","Find a file in "+R.o+"/"+R.r);inp.value=G.repoFind||"";
  f.appendChild(inp);body.appendChild(f);var ul=h("ul","frp-list");body.appendChild(ul);
  function fill(){ul.innerHTML="";var q=inp.value.trim().toLowerCase(),list=R.files.filter(function(x){return !q||x.path.toLowerCase().indexOf(q)>=0;});
    list.slice(0,500).forEach(function(x){var li=h("li"),r=h("div","frp-row");r.appendChild(h("span","frp-p",esc(x.path)));r.appendChild(h("span","frp-n",esc(size(x.size))));
      var shown=null;r.appendChild(key("ghost","Show",function(btn){if(shown){shown.remove();shown=null;btn.textContent="Show";return;}loadText(x.big).then(function(t){shown=h("div","frp-text",esc(t==null?"(this file is no longer on this device: bring the repository up to date)":t));li.appendChild(shown);btn.textContent="Hide";});}));
      r.appendChild(key("","Use in a conversation",function(){loadText(x.big).then(function(t){if(t==null){say("This file is no longer on this device: bring the repository up to date.");return;}useIn(p,R.r+"/"+x.path,t);});},"Starts a conversation in this folder with this file"));
      li.appendChild(r);ul.appendChild(li);});
    if(!list.length)ul.appendChild(h("li",null,'<span class="small muted">'+(R.files.length?"No file has these letters in its name.":"No text file was kept.")+'</span>'));
    if(list.length>500)ul.appendChild(h("li",null,'<span class="small muted">'+(list.length-500)+' more: type a few letters of a name to find them.</span>'));}
  inp.addEventListener("input",function(){G.repoFind=inp.value;fill();});fill();}

function issuesView(p,R,body){var G=W.state.folders.ui,f=h("div","frp-find"),sel=h("select");sel.setAttribute("aria-label","Which issues");
  [["all","Every issue"],["open","Open"],["closed","Closed"]].forEach(function(o){var op=h("option",null,esc(o[1]));op.value=o[0];if((G.repoIss||"all")===o[0])op.selected=true;sel.appendChild(op);});
  f.appendChild(sel);body.appendChild(f);var ul=h("ul","frp-list");body.appendChild(ul);
  function fill(){ul.innerHTML="";var w=sel.value,list=(R.issues.list||[]).filter(function(x){return w==="all"||x.state===w;}).slice().reverse();
    list.forEach(function(x){var li=h("li"),r=h("div","frp-row");r.appendChild(h("span","frp-n","#"+x.n));r.appendChild(h("span","frp-p",esc(x.title)));
      r.appendChild(h("span","frp-st"+(x.state==="closed"?" closed":""),x.state==="closed"?"Closed":"Open"));if(x.c)r.appendChild(h("span","frp-n",x.c+" comment"+(x.c===1?"":"s")));
      var shown=null;r.appendChild(key("ghost","Show",function(btn){if(shown){shown.remove();shown=null;btn.textContent="Show";return;}issuesOf(R).then(function(all){var it=all.filter(function(y){return y.n===x.n;})[0];shown=h("div","frp-text frp-readme",esc(it?issueText(R,it):"(this issue is no longer on this device)"));li.appendChild(shown);btn.textContent="Hide";});}));
      r.appendChild(key("","Use in a conversation",function(){issuesOf(R).then(function(all){var it=all.filter(function(y){return y.n===x.n;})[0];if(!it){say("This issue is no longer on this device: bring the repository up to date.");return;}useIn(p,R.r+" issue #"+x.n+".md",issueText(R,it));});},"Starts a conversation in this folder with this issue and its comments"));
      li.appendChild(r);ul.appendChild(li);});
    if(!list.length)ul.appendChild(h("li",null,'<span class="small muted">'+(R.issues.count?"None of these.":"This repository has no issues.")+(R.issues.prs?" ("+R.issues.prs+" pull request"+(R.issues.prs===1?" was":"s were")+" left out.)":"")+'</span>'));}
  sel.addEventListener("change",function(){G.repoIss=sel.value;save();fill();});fill();}

function paintAll(){try{if(W.IngFolders&&W.IngFolders.paint)W.IngFolders.paint();}catch(e){}}

W.IngFolderRepo={version:1,open:open,bring:bring,stop:stop,card:card,parseLink:parseLink,forget:forget,issueText:issueText,limits:LIMIT};
})();
;try{window.__ingParts["p238"]="running";}catch(_){}
</script>
