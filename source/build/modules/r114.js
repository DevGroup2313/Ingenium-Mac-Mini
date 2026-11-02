<style id="r114-css">
/* ============ R114 · GITHUB INSIDE FABRICA ============
   Her word (17 October): "I want it to work even better than Github and be able to ship for download ready-made apps
   ready for install. I want to be able to troubleshoot, test and run new apps and commit and ship them to my
   repositories. I want all of the functions and capabilities of Github inside of Ingenium."
   GitHub stays optional: a switch in Fabrica's Test and ship panel. When it is on, this part signs in with a token
   kept on the device, links each app to its repository, sends the versions kept here (the same git objects, under
   the same names, through GitHub's own API), brings GitHub's versions here, makes releases with the packages made
   on the device, starts the build workflows and fetches the installers they make, and raises issues. */
#fb .f-gh-rows{display:flex;flex-direction:column;gap:7px}
#fb .f-gh-run{display:flex;align-items:center;gap:8px;font-size:12.5px;padding:3px 0;color:var(--f-ink2);flex-wrap:wrap}
#fb .f-gh-run b{font-weight:600;color:var(--f-ink1);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1 1 auto}
#fb .f-gh-run .f-chip{font-size:11px;padding:1px 8px}
#fb .f-gh-prog{font-size:12px;color:var(--f-acc);font-weight:600;margin-top:4px;min-height:1em}
#fb .f-gh-list{display:flex;flex-direction:column;gap:3px;margin-top:6px;width:100%}
#fb .f-gh-key{font:600 12px/1.3 var(--f-mono);color:var(--f-ink3)}
#fb .f-cp .t .f-gh-note{display:block;font-size:11.5px;color:var(--f-warn);margin-top:3px}
/* 6.9.1: GitHub's own sign-in page: the code to type there, large and plain */
#fb .f-gh-code{font:700 28px/1.2 var(--f-mono);letter-spacing:.12em;color:var(--f-ink1);text-align:center;padding:12px 10px;margin:10px 0 6px;border:1px dashed var(--f-ring,#b9a8e0);border-radius:10px;-webkit-user-select:all;user-select:all}
#fb .f-gh-wait{font-size:12.5px;color:var(--f-ink2);text-align:center;min-height:1.4em;margin:4px 0 8px}
#fb .f-gh-more{margin-top:8px;font-size:12px;color:var(--f-ink2)}
#fb .f-gh-more summary{cursor:pointer;color:var(--f-acc);font-weight:600}
#fb .f-gh-more input{width:100%;margin-top:6px;box-sizing:border-box}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p45"]="started";}catch(_){}
/* R114 · GitHub inside Fabrica: see the note at the top of its styles. Nothing here runs unless the GitHub switch is on. */
(function r114GitHub(){
if(typeof IngRepo==="undefined")return;
"use strict";
var te=new TextEncoder(),td=new TextDecoder();
function b64(u8){var s="",CH=0x8000;for(var i=0;i<u8.length;i+=CH)s+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));return btoa(s);}
function unb64(s){var bin=atob(String(s).replace(/\s+/g,"")),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u;}
function GH(){if(!state.github||typeof state.github!=="object")state.github={};var g=state.github;if(!g.api)g.api="https://api.github.com";return g;}
function FB(){if(!state.fabrica||typeof state.fabrica!=="object")state.fabrica={};var f=state.fabrica;if(!f.remote)f.remote={};return f;}
function save(){try{saveState();}catch(e){}}
function linkOf(r){var x=FB().remote[r.id];if(x){if(!x.map)x.map={};if(!x.rmap)x.rmap={};if(!x.have)x.have={};}return x||null;}
function path(link){return "/repos/"+encodeURIComponent(link.owner)+"/"+encodeURIComponent(link.repo);}
function remoteOf(link,oid){return link.map[oid]||oid;}
function localOf(link,sha){return link.rmap[sha]||sha;}

/* ---------- GitHub's API, with its answers put into plain words ---------- */
function api(p,opt){opt=opt||{};var g=GH();if(!g.token)return Promise.reject(new Error("Sign in to GitHub first."));
  var url=/^https?:/.test(p)?p:g.api.replace(/\/$/,"")+p,headers={"Authorization":"Bearer "+g.token,"Accept":"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"};
  if(opt.headers)Object.keys(opt.headers).forEach(function(k){headers[k]=opt.headers[k];});
  var init={method:opt.method||"GET",headers:headers};
  if(opt.body!=null){if(opt.body instanceof Uint8Array)init.body=opt.body;else{init.body=JSON.stringify(opt.body);headers["Content-Type"]="application/json";}}
  var ctl=typeof AbortController==="function"?new AbortController():null,timer=null;if(ctl){init.signal=ctl.signal;timer=setTimeout(function(){ctl.abort();},opt.timeout||120000);}
  return fetch(url,init).then(function(r){if(timer)clearTimeout(timer);if(r.status===204)return {ok:true,status:204,data:null,headers:r.headers};
    var ct=r.headers.get("content-type")||"";var p2=opt.raw?r.arrayBuffer().then(function(ab){return new Uint8Array(ab);}):(/json/.test(ct)?r.json():r.text());
    return p2.then(function(data){if(!r.ok){var e=new Error(words(r.status,data));e.status=r.status;e.data=data;throw e;}return {ok:true,status:r.status,data:data,headers:r.headers};});},
   function(e){if(timer)clearTimeout(timer);if(e&&e.status)throw e;var m=String(e&&e.message||e);throw new Error(/abort/i.test(String(e&&e.name))?"GitHub did not answer in time.":"GitHub could not be reached ("+m.replace(/^TypeError: /,"")+"). Is this device connected?");});}
function words(st,data){var m=data&&data.message?String(data.message):"";
  if(st===401)return "GitHub refused the token: sign in again with a token that is still valid.";
  if(st===403)return /rate limit/i.test(m)?"GitHub asks for a pause (its rate limit). Try again in a few minutes.":"GitHub refused: "+(m||"forbidden")+". The token may lack a permission (Contents, Actions, Issues, read and write).";
  if(st===404)return "GitHub finds no such thing: "+(m||"not found")+". Is the repository's name right, and does the token reach it?";
  if(st===409)return "GitHub says the repository is empty or the branch is in use: "+m;
  if(st===422)return "GitHub could not do that: "+(m||"unprocessable")+(data&&data.errors?" ("+data.errors.map(function(x){return x.message||x.code||"";}).filter(Boolean).join("; ")+")":"");
  return "GitHub answered "+st+(m?": "+m:"")+".";}
function person(id){var when=(id.when||0)*1000,tz=id.tz||"+0000",sign=tz.charAt(0)==="-"?-1:1,off=sign*((+tz.slice(1,3))*60+(+tz.slice(3,5)));
  var d=new Date(when+off*60000),p=function(n){return (n<10?"0":"")+n;};
  return {name:id.name||"Unknown",email:id.email||"",date:d.getUTCFullYear()+"-"+p(d.getUTCMonth()+1)+"-"+p(d.getUTCDate())+"T"+p(d.getUTCHours())+":"+p(d.getUTCMinutes())+":"+p(d.getUTCSeconds())+tz.slice(0,3)+":"+tz.slice(3,5)};}
function identLine(p){var m=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:\.\d+)?(Z|[+-]\d\d:?\d\d)$/.exec(p&&p.date||""),ts,tz;
  if(!m){ts=Math.floor(Date.now()/1000);tz="+0000";}else{var local=Date.UTC(+m[1],+m[2]-1,+m[3],+m[4],+m[5],+m[6])/1000;if(m[7]==="Z"){tz="+0000";ts=local;}else{var z=m[7].replace(":",""),sg=z.charAt(0)==="-"?-1:1,off=sg*((+z.slice(1,3))*3600+(+z.slice(3,5))*60);tz=z;ts=local-off;}}
  return String(p&&p.name||"Unknown").replace(/[<>\n]/g,"")+" <"+String(p&&p.email||"").replace(/[<>\n\s]/g,"")+"> "+ts+" "+tz;}

/* ---------- the account and the link ---------- */
function signIn(token){var g=GH();var old=g.token;g.token=String(token||"").trim();return api("/user").then(function(x){g.login=x.data.login||"";g.since=Date.now();save();return g.login;},function(e){g.token=old;save();throw e;});}
function signOut(){var g=GH();delete g.token;delete g.login;delete g.via;save();}

/* ---------- 6.9.1: GitHub's own sign-in page, in place of a pasted token ----------
   The owner's words (30 October 2026): "I want Ingenium to be load up the GitHub sign-in page instead of prompting me to
   create a code or key in order to gain access to GitHub and my account's repositories, that process needs to be
   streamlined and made better." GitHub signs a program in through its device flow: the program asks GitHub for a short
   code, GitHub's own sign-in page opens in the browser, the person types the code there and allows the app, and the
   program is handed its sign-in. GitHub's sign-in endpoints refuse a page in a browser (no CORS), so the asking goes
   through the apps' own door to the internet (netFetch: the computer app's relay, the phone and tablet app's bridge); in
   a plain browser the token stays the way in. The app id (an OAuth App's public client id, not a secret) is the owner's,
   made once on GitHub (Settings, Developer settings, OAuth Apps, New OAuth App, with Enable Device Flow ticked). */
var GH_CLIENT_ID="";
function web(){return String(GH().web||"https://github.com").replace(/\/$/,"");}
function clientId(){return String(GH().client||GH_CLIENT_ID||"").trim();}
function canDevice(){try{if(!clientId()||typeof netFetch!=="function")return false;var m=typeof netMode==="function"?netMode():"web";return m!=="web"||/^https?:\/\/(127\.0\.0\.1|localhost)(:|\/|$)/.test(web());}catch(e){return false;}}
function oauthWords(code){return {expired_token:"The code ran out before GitHub heard from you; start again.",access_denied:"You said no on GitHub's page.",
  device_flow_disabled:"This app is not allowed to sign in this way yet: on GitHub, in the app's settings, tick Enable Device Flow.",
  incorrect_client_credentials:"GitHub does not know this app id. Check it under Another app id.",unsupported_grant_type:"GitHub refused the request's form.",
  incorrect_device_code:"GitHub did not recognise the code; start again."}[code]||("GitHub answered: "+code);}
function oauth(path,params){var body=Object.keys(params).map(function(k){return encodeURIComponent(k)+"="+encodeURIComponent(params[k]);}).join("&"),u=web()+path;
  var hd={"Accept":"application/json","Content-Type":"application/x-www-form-urlencoded"};
  var p=(typeof netFetch==="function")?netFetch(u,{method:"POST",headers:hd,body:body,timeout:30}).then(function(r){return Promise.resolve(typeof r.text==="function"?r.text():(r.body||"")).then(function(t){return {status:r.status,text:t};});})
    :fetch(u,{method:"POST",headers:hd,body:body}).then(function(r){return r.text().then(function(t){return {status:r.status,text:t};});});
  return p.then(function(r){var d={};try{d=JSON.parse(r.text||"{}");}catch(e){d={error:"unsupported_grant_type"};}
    if(d.error&&!/^(authorization_pending|slow_down)$/.test(d.error)){var e=new Error(oauthWords(d.error));e.code=d.error;throw e;}return d;},
    function(e){var m=String(e&&e.message||e);throw new Error(/refused or could not reach/.test(m)?"From a browser GitHub's sign-in page cannot be reached from here; the Mac, Windows, tablet and phone apps can. Paste a token instead.":m);});}
function deviceStart(){return oauth("/login/device/code",{client_id:clientId(),scope:"repo workflow"}).then(function(d){if(!d.device_code||!d.user_code)throw new Error("GitHub gave no code.");return d;});}
/* asks GitHub every few seconds (never faster than it allows) until the person has allowed the app, or the code runs out */
function devicePoll(dev,onTick,ctl){ctl=ctl||{};var wait=Math.max(5,+dev.interval||5)*1000,until=Date.now()+Math.max(60,+dev.expires_in||900)*1000;
  return new Promise(function(res,rej){(function tick(){if(ctl.stop)return rej(Object.assign(new Error("Stopped."),{code:"stopped"}));
      var left=Math.max(0,until-Date.now());if(!left)return rej(Object.assign(new Error(oauthWords("expired_token")),{code:"expired_token"}));
      if(onTick)try{onTick(left);}catch(e){}
      oauth("/login/oauth/access_token",{client_id:clientId(),device_code:dev.device_code,grant_type:"urn:ietf:params:oauth:grant-type:device_code"}).then(function(d){
        if(ctl.stop)return rej(Object.assign(new Error("Stopped."),{code:"stopped"}));
        if(d.access_token)return res(d);if(d.error==="slow_down")wait+=5000;ctl.timer=setTimeout(tick,wait);},rej);})();});}
/* an address opened outside the page: the computer app's browser, the phone's, or a new window */
function openOut(u){u=String(u||"");if(!/^https:\/\//i.test(u)&&!/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?\//i.test(u))return false;  /* only https, or this computer's own stand-in while a test runs */
  try{var a=typeof shellApi==="function"?shellApi():null;if(a&&typeof a.open_url==="function"){Promise.resolve(a.open_url(u)).then(null,function(){});return true;}}catch(e){}
  try{if(typeof INB!=="undefined"&&INB&&typeof INB.call==="function"&&typeof nativeInfo!=="undefined"&&nativeInfo){INB.call("openUrl",{url:u}).then(null,function(){try{var b=document.createElement("a");b.href=u;b.target="_blank";b.rel="noopener noreferrer";document.body.appendChild(b);b.click();b.remove();}catch(e){}});return true;}}catch(e){}
  try{var x=document.createElement("a");x.href=u;x.target="_blank";x.rel="noopener noreferrer";document.body.appendChild(x);x.click();x.remove();return true;}catch(e){return false;}}
function deviceSheet(X,repaint){var h=X.h,sh=X.sheet("Sign in with GitHub","GitHub's own sign-in page opens in your browser. Type this code there, allow Ingenium, and come back here: nothing to paste."),box=sh.box;
  var code=h("div","f-gh-code"),wait=h("div","f-gh-wait"),end=h("div","end"),ctl={},dev=null;code.textContent="…";wait.textContent="Asking GitHub for a code…";
  code.setAttribute("aria-live","polite");box.appendChild(code);box.appendChild(wait);
  var copyK=X.btn("quiet","Copy the code",function(){if(!dev)return;var t=dev.user_code;try{if(typeof csCopyText==="function")return csCopyText(t,copyK);}catch(e){}
      try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(function(){X.toast("Copied.");});else if(typeof INB!=="undefined"&&INB)INB.call("clipboardWrite",{text:t});}catch(e){}});
  var openK=X.btn("pri","Open GitHub's page",function(){if(dev)openOut(dev.verification_uri||web()+"/login/device");});
  copyK.disabled=openK.disabled=true;
  var more=h("details","f-gh-more"),sum=h("summary");sum.textContent="Another app id";more.appendChild(sum);
  var note=h("div");note.textContent="The app id is the OAuth App GitHub gave you (Settings, Developer settings, OAuth Apps, New OAuth App, with Enable Device Flow ticked). It is not a secret.";more.appendChild(note);
  var inp=h("input");inp.type="text";inp.placeholder="Ov23li…";inp.value=clientId();inp.setAttribute("aria-label","The app id");inp.onchange=function(){GH().client=inp.value.trim();save();};more.appendChild(inp);
  function close(){ctl.stop=true;if(ctl.timer)clearTimeout(ctl.timer);sh.close();}
  end.appendChild(X.btn("","Close",close));end.appendChild(copyK);end.appendChild(openK);box.appendChild(end);box.appendChild(more);
  function left(ms){var s=Math.round(ms/1000);return Math.floor(s/60)+":"+String(s%60).replace(/^(\d)$/,"0$1");}
  deviceStart().then(function(d){dev=d;code.textContent=d.user_code;copyK.disabled=openK.disabled=false;wait.textContent="Waiting for you on GitHub…";openOut(d.verification_uri||web()+"/login/device");
    return devicePoll(d,function(ms){wait.textContent="Waiting for you on GitHub… "+left(ms)+" left";},ctl);})
  .then(function(d){var g=GH();return signIn(d.access_token).then(function(login){g.via="device";save();X.toast("Signed in as "+login+".");sh.close();repaint();});})
  .then(null,function(e){if(e&&e.code==="stopped")return;wait.textContent=String(e&&e.message||e);copyK.disabled=openK.disabled=true;});}
function tokenSheet(X,repaint){X.sheetName("Sign in to GitHub with a token","Paste a personal access token. Make one at github.com → Settings → Developer settings → Fine-grained tokens, for the repositories you want Fabrica to reach.",function(t){return signIn(t).then(function(login){var g=GH();g.via="token";save();X.toast("Signed in as "+login+".");repaint();});},"github_pat_…");}
function myRepos(){return api("/user/repos?per_page=100&sort=pushed").then(function(x){return (x.data||[]).map(function(r){return {full:r.full_name,owner:r.owner&&r.owner.login,repo:r.name,branch:r.default_branch||"main",priv:!!r.private};});});}
function link(r,owner,repo,branch){return api("/repos/"+encodeURIComponent(owner)+"/"+encodeURIComponent(repo)).then(function(x){var d=x.data;
  var L=FB().remote[r.id]=FB().remote[r.id]||{map:{},rmap:{},have:{}};L.owner=d.owner&&d.owner.login||owner;L.repo=d.name||repo;L.branch=branch||r.branch||d.default_branch||"main";L.html=d.html_url||("https://github.com/"+owner+"/"+repo);L.priv=!!d.private;L.push=!!(d.permissions&&d.permissions.push);delete L.check;save();return L;});}
function unlink(r){delete FB().remote[r.id];save();}

/* ---------- where the two copies stand ---------- */
/* the history as a graph (the engine's log orders by date, as git does; here the parents decide) */
function graph(r,ref){return IngRepo.log(r.id,{ref:ref||"HEAD",max:200000}).then(function(l){var m={};l.forEach(function(c){m[c.oid]=c;});return m;});}
function reach(m,from){var seen={},q=[from];while(q.length){var o=q.pop();if(!o||seen[o])continue;seen[o]=1;var c=m[o];if(c)c.parents.forEach(function(p){q.push(p);});}return seen;}
/* the versions reachable from head and not from base, parents before children */
function aheadOf(m,head,base){var skip=base?reach(m,base):{},out=[],seen={};function visit(o){if(!o||seen[o]||skip[o])return;seen[o]=1;var c=m[o];if(!c)return;c.parents.forEach(visit);out.push(c);}visit(head);return out;}
function compare(r,L){var branch=L.branch||r.branch||"main";
  return api(path(L)+"/git/ref/heads/"+encodeURIComponent(branch)).then(function(x){return x.data.object.sha;},function(e){if(e.status===404)return null;throw e;})
  .then(function(remoteSha){var out={remote:remoteSha,branch:branch,at:Date.now(),head:r.head||null,toSend:0,theirs:false,same:false,diverged:false};
    if(!r.head){out.toSend=0;out.nothing=true;return out;}
    return graph(r).then(function(m){
      if(!remoteSha){out.toSend=Object.keys(m).length;return out;}
      var lo=localOf(L,remoteSha);
      if(lo===r.head){out.same=true;return out;}
      if(m[lo]){out.toSend=aheadOf(m,r.head,lo).length;return out;}
      return IngRepo.core.store().has(lo).then(function(have){out.theirs=true;if(have)return graph(r,lo).then(function(m2){out.diverged=!m2[r.head];return out;});
        /* GitHub's newest versions are not here yet: their parents are read from GitHub until one that is here, or hers */
        out.unknown=true;var store=IngRepo.core.store(),q=[remoteSha],seen={},steps=0;
        function walk(){if(!q.length||steps>300){out.diverged=true;return Promise.resolve(out);}var sha=q.shift();if(seen[sha])return walk();seen[sha]=1;var l2=localOf(L,sha);
          if(l2===r.head){out.diverged=false;return Promise.resolve(out);}
          return store.has(l2).then(function(h){if(h){out.diverged=!m[l2]?true:true;return reach(m,r.head)[l2]?Promise.resolve((out.diverged=true,out)):Promise.resolve((out.diverged=true,out));}
            steps++;return api(path(L)+"/git/commits/"+sha).then(function(x){(x.data.parents||[]).forEach(function(p){q.push(p.sha);});return walk();},function(){out.diverged=true;return out;});});}
        return walk();});});}).then(function(out){L.check=out;save();return out;});}

/* ---------- sending: the same objects, under the same names ---------- */
function send(r,L,prog){prog=prog||function(){};var store=IngRepo.core.store(),core=IngRepo.core,branch=L.branch||r.branch||"main",known=L.have,nFiles=0;
  function sendBlob(oid){if(known[oid])return Promise.resolve(remoteOf(L,oid));
    return store.need(oid,"blob").then(function(o){nFiles++;prog("Sending file "+nFiles+"…");return api(path(L)+"/git/blobs",{method:"POST",body:{content:b64(o.body),encoding:"base64"},timeout:900000}).then(function(x){known[oid]=1;if(x.data.sha!==oid){L.map[oid]=x.data.sha;L.rmap[x.data.sha]=oid;}return x.data.sha;});});}
  function sendTree(oid){if(known[oid])return Promise.resolve(remoteOf(L,oid));
    return store.need(oid,"tree").then(function(t){var ents=core.parseTree(t.body),chain=Promise.resolve(),out=[];
      ents.forEach(function(e){chain=chain.then(function(){var isTree=e.mode==="40000"||e.mode==="040000";
        if(isTree)return sendTree(e.oid).then(function(sha){out.push({path:e.name,mode:"040000",type:"tree",sha:sha});});
        if(e.mode==="160000"){out.push({path:e.name,mode:"160000",type:"commit",sha:e.oid});return;}
        return sendBlob(e.oid).then(function(sha){out.push({path:e.name,mode:e.mode==="100664"?"100644":e.mode,type:"blob",sha:sha});});});});
      return chain.then(function(){return api(path(L)+"/git/trees",{method:"POST",body:{tree:out}}).then(function(x){known[oid]=1;if(x.data.sha!==oid){L.map[oid]=x.data.sha;L.rmap[x.data.sha]=oid;}return x.data.sha;});});});}
  function sendCommit(c,i,n){prog("Sending version "+(i+1)+" of "+n+": "+c.title);
    return sendTree(c.tree).then(function(treeSha){return store.need(c.oid,"commit").then(function(o){var pc=core.parseCommit(o.body);
      var body={message:pc.msg,tree:treeSha,parents:pc.parents.map(function(p){return remoteOf(L,p);}),author:person(pc.author||{}),committer:person(pc.committer||pc.author||{})};
      function post(b){return api(path(L)+"/git/commits",{method:"POST",body:b});}
      return post(body).catch(function(e){if(e.status===422&&(!body.author.email||!body.committer.email)){var em=(GH().login||"ingenium")+"@users.noreply.github.com";body.author.email=body.author.email||em;body.committer.email=body.committer.email||em;return post(body);}throw e;})
        .then(function(x){known[c.oid]=1;if(x.data.sha!==c.oid){L.map[c.oid]=x.data.sha;L.rmap[x.data.sha]=c.oid;}return x.data.sha;});});});}
  return compare(r,L).then(function(cmp){if(cmp.nothing)throw new Error("Keep a first version first.");if(cmp.same)return {sent:0,same:true};
    if(cmp.theirs)throw Object.assign(new Error(cmp.diverged?"Both GitHub and this device have new versions. Bring theirs first; then send.":"GitHub is ahead. Bring theirs first."),{theirs:true});
    return graph(r).then(function(m){var todo=aheadOf(m,r.head,cmp.remote?localOf(L,cmp.remote):null),chain=Promise.resolve(),last=cmp.remote;
      todo.forEach(function(c,i){chain=chain.then(function(){return sendCommit(c,i,todo.length).then(function(sha){last=sha;});});});
      return chain.then(function(){prog("Moving the branch "+branch+" on GitHub…");
        var p=cmp.remote?api(path(L)+"/git/refs/heads/"+encodeURIComponent(branch),{method:"PATCH",body:{sha:last,force:false}}):api(path(L)+"/git/refs",{method:"POST",body:{ref:"refs/heads/"+branch,sha:last}});
        return p.then(function(){L.remoteHead=last;L.sentAt=Date.now();delete L.check;save();return {sent:todo.length,files:nFiles,head:last,sameIds:last===r.head};});});});});}

/* ---------- bringing: GitHub's versions, stored here under their own names ---------- */
function bring(r,L,prog){prog=prog||function(){};var store=IngRepo.core.store(),core=IngRepo.core,branch=L.branch||r.branch||"main",nFiles=0,got=0;
  function bringBlob(sha){var lo=localOf(L,sha);return store.has(lo).then(function(have){if(have)return lo;nFiles++;prog("Bringing file "+nFiles+"…");
    return api(path(L)+"/git/blobs/"+sha,{timeout:900000}).then(function(x){var u8=x.data.encoding==="base64"?unb64(x.data.content):te.encode(x.data.content||"");
      return store.put("blob",u8).then(function(oid){if(oid!==sha){L.map[oid]=sha;L.rmap[sha]=oid;}return oid;});});});}
  function bringTree(sha){var lo=localOf(L,sha);return store.has(lo).then(function(have){if(have)return lo;
    return api(path(L)+"/git/trees/"+sha).then(function(x){var ents=x.data.tree||[],chain=Promise.resolve(),out=[];
      ents.forEach(function(e){chain=chain.then(function(){if(e.type==="tree")return bringTree(e.sha).then(function(o){out.push({mode:"40000",name:e.path,oid:o});});
        if(e.type==="commit"){out.push({mode:"160000",name:e.path,oid:e.sha});return;}
        return bringBlob(e.sha).then(function(o){out.push({mode:String(e.mode||"100644").replace(/^0+/,""),name:e.path,oid:o});});});});
      return chain.then(function(){return store.put("tree",core.treeBody(out)).then(function(oid){if(oid!==sha){L.map[oid]=sha;L.rmap[sha]=oid;}return oid;});});});});}
  function bringCommit(c){return bringTree(c.tree.sha).then(function(treeOid){var parents=(c.parents||[]).map(function(p){return localOf(L,p.sha);}),msg=String(c.message||"");
      function body(m){var s="tree "+treeOid+"\n";parents.forEach(function(p){s+="parent "+p+"\n";});return te.encode(s+"author "+identLine(c.author)+"\ncommitter "+identLine(c.committer||c.author)+"\n\n"+m);}
      /* GitHub gives the message without its last line break; git's own object had one, so that form is tried first */
      var b1=body(/\n$/.test(msg)?msg:msg+"\n");return core.sha1(b1.length?concat("commit",b1):b1).then(function(h){if(h===c.sha)return store.put("commit",b1);var b2=body(msg);return core.sha1(concat("commit",b2)).then(function(h2){return store.put("commit",h2===c.sha?b2:b1);});})
        .then(function(oid){got++;if(oid!==c.sha){L.map[oid]=c.sha;L.rmap[c.sha]=oid;}return oid;});});}
  function concat(type,body){var head=te.encode(type+" "+body.length+"\0"),o=new Uint8Array(head.length+body.length);o.set(head,0);o.set(body,head.length);return o;}
  return compare(r,L).then(function(cmp){if(!cmp.remote)throw new Error("GitHub has no branch "+branch+" yet: send yours first.");if(cmp.same)return {brought:0,same:true};
    var queue=[cmp.remote],order=[],seen={};
    function walk(){if(!queue.length)return Promise.resolve();var sha=queue.shift();if(seen[sha])return walk();seen[sha]=1;
      return store.has(localOf(L,sha)).then(function(have){if(have)return walk();return api(path(L)+"/git/commits/"+sha).then(function(x){order.push(x.data);(x.data.parents||[]).forEach(function(p){queue.push(p.sha);});return walk();});});}
    return walk().then(function(){var chain=Promise.resolve();order.reverse().forEach(function(c,i){chain=chain.then(function(){prog("Bringing version "+(i+1)+" of "+order.length+": "+String(c.message||"").split("\n")[0]);return bringCommit(c);});});
      return chain.then(function(){var lo=localOf(L,cmp.remote);
        /* their head is placed on the branch when this device's versions are all in it; else on an idea of its own, to bring in */
        return graph(r,lo).then(function(m2){var ff=!r.head||!!m2[r.head];var name=ff?branch:("from-github");
          return (ff?IngRepo.setRef(r.id,branch,lo,{why:"brought from GitHub"}):IngRepo.setRef(r.id,name,lo,{why:"GitHub's versions, on an idea of their own"})).then(function(){L.remoteHead=cmp.remote;L.broughtAt=Date.now();delete L.check;save();return {brought:order.length,files:nFiles,onBranch:ff,idea:ff?null:name};});});});});});}

/* ---------- releases, builds, issues ---------- */
function releases(L){return api(path(L)+"/releases?per_page=5").then(function(x){return x.data||[];});}
function release(r,L,o,prog){prog=prog||function(){};return compare(r,L).then(function(cmp){if(!cmp.same&&cmp.toSend)return send(r,L,prog);}).then(function(){prog("Making the release "+o.tag+"…");
  return api(path(L)+"/releases",{method:"POST",body:{tag_name:o.tag,target_commitish:remoteOf(L,r.head),name:o.name||o.tag,body:o.notes||"",draft:false,prerelease:false}}).then(function(x){var rel=x.data,up=String(rel.upload_url||"").replace(/\{\?[^}]*\}$/,""),chain=Promise.resolve(),n=0;
    (o.assets||[]).forEach(function(a){chain=chain.then(function(){n++;prog("Attaching "+a.name+" ("+n+" of "+o.assets.length+")…");return api(up+"?name="+encodeURIComponent(a.name),{method:"POST",body:a.bytes,headers:{"Content-Type":a.mime||"application/octet-stream"},timeout:1800000});});});
    return chain.then(function(){return rel;});});});}
function workflows(L){return api(path(L)+"/actions/workflows").then(function(x){return ((x.data||{}).workflows||[]).filter(function(w){return w.state==="active";});});}
function runs(L,branch){return api(path(L)+"/actions/runs?branch="+encodeURIComponent(branch)+"&per_page=8").then(function(x){return (x.data||{}).workflow_runs||[];});}
function startBuilds(L,branch){return workflows(L).then(function(ws){var chain=Promise.resolve(),n=0;ws.forEach(function(w){chain=chain.then(function(){return api(path(L)+"/actions/workflows/"+w.id+"/dispatches",{method:"POST",body:{ref:branch}}).then(function(){n++;},function(e){if(e.status!==422)throw e;});});});return chain.then(function(){return n;});});}
function artifacts(L,runId){return api(path(L)+"/actions/runs/"+runId+"/artifacts").then(function(x){return ((x.data||{}).artifacts||[]).filter(function(a){return !a.expired;});});}
function fetchArtifact(L,a){return api(a.archive_download_url,{raw:true,timeout:1800000}).then(function(x){return x.data;});}
function issues(L){return api(path(L)+"/issues?state=open&per_page=8").then(function(x){return (x.data||[]).filter(function(i){return !i.pull_request;});});}
function raise(L,title,body){return api(path(L)+"/issues",{method:"POST",body:{title:title,body:body||""}}).then(function(x){return x.data;});}

/* ---------- the rows in Fabrica's Test and ship panel ---------- */
var cache={};
function paint(r,cp,X){var g=GH(),L=linkOf(r),h=X.h,btn=X.btn,esc=X.esc;
  function row(title,small,keys){var e=h("div","f-cp");e.innerHTML='<div class="t">'+esc(title)+(small?"<small>"+small+"</small>":"")+"</div>";(keys||[]).forEach(function(k){if(k)e.appendChild(k);});cp.appendChild(e);return e;}
  function openUrl(u){if(!/^https:\/\//i.test(String(u))){X.toast("Open this address: "+u);return;}if(!openOut(u))X.toast(u);}  /* 6.2: the site opened is told nothing of Ingenium's window; 6.9.1: the computer and phone apps open it in the browser */
  function repaint(){try{if(window.fbPaintShip)fbPaintShip();}catch(e){}}
  if(!g.token){
    if(canDevice()){row("Sign in to GitHub","GitHub's own sign-in page opens; nothing to paste. The sign-in is kept on this device and sent only to GitHub.",[btn("sm pri","Sign in with GitHub",function(){deviceSheet(X,repaint);}),btn("quiet sm","Paste a token instead",function(){tokenSheet(X,repaint);})]);return;}
    var why=!clientId()?"To sign in on GitHub's own page instead, add the app id GitHub gives you (Settings, Developer settings, OAuth Apps, New OAuth App, with Enable Device Flow ticked)."
      :"From a browser GitHub's sign-in page cannot be reached from here; the Mac, Windows, tablet and phone apps open it.";
    row("Sign in to GitHub","A fine-grained token for your repositories, with Contents, Actions and Issues allowed to read and write. It is kept on this device and sent only to GitHub.<span class=\"f-gh-note\" style=\"color:var(--f-ink2)\">"+esc(why)+"</span>",
      [btn("sm","Sign in",function(){tokenSheet(X,repaint);})].concat(!clientId()?[btn("quiet sm","Add the app id",function(){X.sheetName("The app id","The OAuth App's client id, as GitHub shows it (it is not a secret).",function(v){GH().client=String(v).trim();save();repaint();return Promise.resolve();},"Ov23li…");})]:[]));return;}
  row("Signed in as "+(g.login||"you"),g.via==="device"?"Signed in on GitHub's own page; GitHub answers Fabrica with that sign-in. Nothing leaves this device until you press Send.":"GitHub answers Fabrica with this token; nothing leaves this device until you press Send.",[btn("quiet sm","Sign out",function(){signOut();X.toast("Signed out of GitHub. The sign-in is gone from this device.");repaint();})]);
  if(!L){row("Its repository on GitHub","Link this app to one of your repositories, and its versions can go there and come back.",[btn("sm","Link",function(){linkSheet(r,X,repaint);})]);return;}
  row(L.owner+"/"+L.repo+" · "+(L.branch||"main"),(L.priv?"A private repository":"A public repository")+(L.push===false?"<span class='f-gh-note'>The token cannot write here.</span>":""),[btn("quiet sm","Open",function(){openUrl(L.html||("https://github.com/"+L.owner+"/"+L.repo));}),btn("quiet sm","Change",function(){linkSheet(r,X,repaint);})]);
  /* the two copies */
  var vr=row("Its versions and GitHub's","Looking…",[]),st=vr.querySelector("small"),prog=h("div","f-gh-prog"),keys=h("span",null);keys.style.cssText="display:flex;gap:6px;flex-wrap:wrap";vr.appendChild(keys);vr.querySelector(".t").appendChild(prog);
  var sendK=btn("sm pri","Send",function(){act(send,"Sent",function(x){return x.same?"Nothing new to send.":x.sent+" version"+(x.sent===1?"":"s")+" sent"+(x.files?" ("+x.files+" file"+(x.files===1?"":"s")+")":"")+(x.sameIds?"; GitHub holds them under the same ids.":".");});}),
      bringK=btn("sm","Bring theirs",function(){act(bring,"Brought",function(x){return x.same?"Nothing new on GitHub.":x.brought+" version"+(x.brought===1?"":"s")+" brought"+(x.onBranch?" onto "+(L.branch||"main")+".":" onto the idea “"+x.idea+"”: bring it into "+(L.branch||"main")+" from Ideas.");});});
  function act(fn,label,line){sendK.disabled=bringK.disabled=true;X.busy(label==="Sent"?"Sending to GitHub…":"Bringing from GitHub…");
    fn(r,L,function(m){prog.textContent=m;}).then(function(x){X.unbusy();prog.textContent="";X.toast(line(x));return X.refresh();}).then(function(){repaint();},function(e){X.unbusy();prog.textContent="";sendK.disabled=bringK.disabled=false;X.fail(e);showCmp();});}
  function showCmp(){var c=L.check;if(!c)return;sendK.hidden=bringK.hidden=false;
    if(c.nothing){st.textContent="Keep a first version here; then it can go to GitHub.";sendK.hidden=bringK.hidden=true;}
    else if(c.same){st.textContent="In step: GitHub holds the same versions, name for name.";sendK.hidden=bringK.hidden=true;}
    else if(!c.remote){st.textContent="GitHub has no branch "+c.branch+" yet. Send puts every version there.";bringK.hidden=true;}
    else if(c.toSend&&!c.theirs){st.textContent=c.toSend+" version"+(c.toSend===1?"":"s")+" here that GitHub does not have.";bringK.hidden=true;}
    else if(c.theirs&&!c.diverged){st.textContent="GitHub is ahead: it has versions this device does not.";sendK.hidden=true;}
    else{st.textContent="Both have new versions. Bring theirs first (onto an idea of their own), bring it in, then send.";sendK.hidden=true;}
    keys.innerHTML="";keys.appendChild(sendK);keys.appendChild(bringK);keys.appendChild(againK);}
  var againK=btn("quiet sm","Check again",function(){delete L.check;st.textContent="Looking…";compare(r,L).then(showCmp,function(e){st.textContent=e.message;});});
  var fresh=L.check&&Date.now()-L.check.at<10000&&L.check.head===(r.head||null);if(fresh)showCmp();else compare(r,L).then(showCmp,function(e){st.textContent=e.message;});
  /* the builds and their installers */
  var br=row("Builds on GitHub","Looking…",[btn("sm","Start the builds",function(){var b=this;b.disabled=true;startBuilds(L,L.branch||r.branch||"main").then(function(n){b.disabled=false;X.toast(n?n+" build"+(n===1?"":"s")+" started on GitHub. The installers appear here when they finish.":"No build workflow answered.");delete cache[r.id+"runs"];repaint();},function(e){b.disabled=false;X.fail(e);});})]);
  var bl=h("div","f-gh-list");br.querySelector(".t").appendChild(bl);
  function paintRuns(list){br.querySelector("small").textContent=list.length?"The latest on "+(L.branch||r.branch||"main")+":":"No builds yet on "+(L.branch||r.branch||"main")+". Start them, and the installers for every device are made there.";bl.innerHTML="";
    list.slice(0,4).forEach(function(run){var e=h("div","f-gh-run");var okc=run.conclusion==="success",bad=run.conclusion&&run.conclusion!=="success";
      e.innerHTML="<b>"+esc(run.name||"Build")+"</b><span>"+esc(X.when(run.created_at?Date.parse(run.created_at):0))+'</span><span class="f-chip'+(okc?" ok":bad?" warn":run.status!=="completed"?" live":"")+'">'+esc(run.status==="completed"?(okc?"Made":(run.conclusion||"ended")):(run.status==="in_progress"?"Building…":run.status||"queued"))+"</span>";
      e.appendChild(btn("quiet sm","Open",function(){openUrl(run.html_url);}));
      if(okc){var ik=btn("quiet sm","Installers",function(){ik.disabled=true;artifacts(L,run.id).then(function(arts){ik.disabled=false;if(!arts.length){X.toast("This build left no installer to fetch (GitHub keeps them for a limited time).");return;}
          var al=h("div","f-gh-list");arts.forEach(function(a){var ar=h("div","f-gh-run");ar.innerHTML="<b>"+esc(a.name)+"</b><span>"+esc(X.kb(a.size_in_bytes||0))+"</span>";
            ar.appendChild(btn("sm pri","Download",function(){var d=this;d.disabled=true;X.busy("Fetching "+a.name+"…");fetchArtifact(L,a).then(function(bytes){X.unbusy();d.disabled=false;X.saveBytes(a.name+".zip","application/zip",bytes);X.toast(a.name+" saved ("+X.kb(bytes.length)+"). Unzip it: the installer is inside.");},function(e){X.unbusy();d.disabled=false;X.toast("The browser could not fetch it from here; opening the build on GitHub, where it downloads with one press.");openUrl(run.html_url);});}));al.appendChild(ar);});
          e.parentNode.insertBefore(al,e.nextSibling);ik.remove();},function(e){ik.disabled=false;X.fail(e);});});e.appendChild(ik);}
      bl.appendChild(e);});}
  if(cache[r.id+"runs"]&&Date.now()-cache[r.id+"runs"].at<20000)paintRuns(cache[r.id+"runs"].list);else runs(L,L.branch||r.branch||"main").then(function(list){cache[r.id+"runs"]={at:Date.now(),list:list};paintRuns(list);},function(e){br.querySelector("small").textContent=e.message;});
  /* releases */
  var rr=row("Releases","Looking…",[btn("sm","Release this version",function(){releaseSheet(r,L,X,repaint);})]);var rl=h("div","f-gh-list");rr.querySelector(".t").appendChild(rl);
  function paintRel(list){rr.querySelector("small").textContent=list.length?"Ready-made downloads for every device, from the releases:":"No release yet. Release this version to put its packages where every device can download them.";rl.innerHTML="";
    list.slice(0,2).forEach(function(rel){var e=h("div","f-gh-run");e.innerHTML="<b>"+esc(rel.name||rel.tag_name)+"</b><span class='f-gh-key'>"+esc(rel.tag_name)+"</span>";e.appendChild(btn("quiet sm","Open",function(){openUrl(rel.html_url);}));rl.appendChild(e);
      (rel.assets||[]).slice(0,8).forEach(function(a){var ar=h("div","f-gh-run");ar.style.paddingLeft="12px";ar.innerHTML="<b>"+esc(a.name)+"</b><span>"+esc(X.kb(a.size||0))+"</span>";ar.appendChild(btn("sm","Download",function(){openUrl(a.browser_download_url);}));rl.appendChild(ar);});});}
  if(cache[r.id+"rel"]&&Date.now()-cache[r.id+"rel"].at<20000)paintRel(cache[r.id+"rel"].list);else releases(L).then(function(list){cache[r.id+"rel"]={at:Date.now(),list:list};paintRel(list);},function(e){rr.querySelector("small").textContent=e.message;});
  /* issues, and the test's faults */
  var ir=row("Issues","Looking…",[btn("sm","Raise an issue",function(){issueSheet(r,L,X,"","",repaint);})]);var il=h("div","f-gh-list");ir.querySelector(".t").appendChild(il);
  function paintIssues(list){ir.querySelector("small").textContent=list.length?list.length+" open issue"+(list.length===1?"":"s")+":":"No open issues.";il.innerHTML="";
    list.slice(0,4).forEach(function(i){var e=h("div","f-gh-run");e.innerHTML="<b>#"+i.number+" "+esc(i.title)+"</b><span>"+esc(X.when(i.created_at?Date.parse(i.created_at):0))+"</span>";e.appendChild(btn("quiet sm","Open",function(){openUrl(i.html_url);}));il.appendChild(e);});}
  if(cache[r.id+"iss"]&&Date.now()-cache[r.id+"iss"].at<20000)paintIssues(cache[r.id+"iss"].list);else issues(L).then(function(list){cache[r.id+"iss"]={at:Date.now(),list:list};paintIssues(list);},function(e){ir.querySelector("small").textContent=e.message;});
  if(r.head)IngRepo.notes(r.id,r.head).then(function(n){var t=n&&n.test;if(!t||t.ok)return;var bad=(t.checks||[]).filter(function(c){return c.state!=="ok"&&c.state!=="none"&&c.state!=="skip";});if(!bad.length)return;
    var report="The test of "+r.name+" ("+String(r.head).slice(0,7)+") found:\n"+bad.map(function(c){return "- "+c.label+": "+(c.detail||c.state);}).join("\n");
    row("Troubleshoot",bad.length+" check"+(bad.length===1?"":"s")+" found something in the last test.",[btn("sm pri","Fix it in Code",function(){fixInCode(r,report,X);}),btn("sm","Raise it as an issue",function(){issueSheet(r,L,X,"Test of "+r.name+": "+bad[0].label,report,repaint);})]);});}

function linkSheet(r,X,done){var sh=X.sheet("Its repository on GitHub","Type owner/name, or choose one of yours. The branch is the one this app works on."),inp=X.h("input");inp.type="text";inp.placeholder="owner/name";var L0=linkOf(r);inp.value=L0?L0.owner+"/"+L0.repo:"";sh.box.appendChild(inp);
  var br=X.h("input");br.type="text";br.placeholder="branch";br.value=(L0&&L0.branch)||r.branch||"main";br.setAttribute("aria-label","Branch");sh.box.appendChild(br);
  var sel=document.createElement("select");sel.setAttribute("aria-label","Your repositories");sel.style.cssText="width:100%;margin:0 0 10px;padding:7px 10px;border-radius:10px;border:1px solid var(--f-hair);background:var(--f-wellbg);color:var(--f-ink1)";var o0=document.createElement("option");o0.value="";o0.textContent="Your repositories…";sel.appendChild(o0);sh.box.appendChild(sel);
  myRepos().then(function(list){list.forEach(function(x){var op=document.createElement("option");op.value=x.full;op.textContent=x.full+(x.priv?" (private)":"");sel.appendChild(op);});},function(){o0.textContent="Your repositories could not be listed; type the name.";});
  sel.onchange=function(){if(sel.value){inp.value=sel.value;}};
  var end=X.h("div","end"),ok=X.btn("pri","Link",function(){var m=/^\s*([\w.-]+)\/([\w.-]+)\s*$/.exec(inp.value);if(!m){inp.focus();X.toast("owner/name, please.");return;}ok.disabled=true;
    link(r,m[1],m[2],br.value.trim()||"main").then(function(){sh.close();X.toast("Linked to "+m[1]+"/"+m[2]+".");done();},function(e){ok.disabled=false;X.fail(e);});});
  if(L0)end.appendChild(X.btn("quiet","Unlink",function(){unlink(r);sh.close();done();}));end.appendChild(X.btn("","Close",sh.close));end.appendChild(ok);sh.box.appendChild(end);setTimeout(function(){inp.focus();},60);}
function releaseSheet(r,L,X,done){if(!r.head){X.toast("Keep a first version first.");return;}
  var sh=X.sheet("Release this version","A release on GitHub, with the packages made here attached, so every device can download them."),tag=X.h("input");tag.type="text";tag.placeholder="v1.0";
  var tags=(r.tags||[]);tag.value=tags.length?tags[tags.length-1]:("v"+new Date().toISOString().slice(0,10).replace(/-/g,"."));sh.box.appendChild(tag);
  var nm=X.h("input");nm.type="text";nm.placeholder="Its name (optional)";sh.box.appendChild(nm);
  var notes=X.h("textarea");notes.placeholder="What this version brings (optional)";notes.style.cssText="width:100%;min-height:70px;margin:0 0 10px";sh.box.appendChild(notes);
  var sw=X.h("label","f-sw"),c=document.createElement("input");c.type="checkbox";c.checked=true;sw.appendChild(c);sw.appendChild(document.createTextNode("Attach the one-page app and the web app, made here from this version"));sh.box.appendChild(sw);
  var prog=X.h("div","f-gh-prog");sh.box.appendChild(prog);
  var end=X.h("div","end"),ok=X.btn("pri","Release",function(){var t=tag.value.trim();if(!t){tag.focus();return;}ok.disabled=true;
    var assets=[];var p=c.checked?IngShip.onePage(r.id).then(function(x){assets.push({name:x.name||(r.slug+".html"),mime:"text/html",bytes:x.bytes});return IngShip.webApp(r.id);}).then(function(x){assets.push({name:x.name,mime:"application/zip",bytes:x.bytes});}):Promise.resolve();
    p.then(function(){return release(r,L,{tag:t,name:nm.value.trim(),notes:notes.value,assets:assets},function(m){prog.textContent=m;});}).then(function(rel){sh.close();X.toast("Released "+(rel.name||rel.tag_name)+(assets.length?" with "+assets.length+" packages attached.":"."));delete cache[r.id+"rel"];return X.refresh();}).then(done,function(e){ok.disabled=false;prog.textContent="";X.fail(e);});});
  end.appendChild(X.btn("","Close",sh.close));end.appendChild(ok);sh.box.appendChild(end);}
function issueSheet(r,L,X,title0,body0,done){var sh=X.sheet("Raise an issue","On "+L.owner+"/"+L.repo+". Plain words: what happened, and where."),t=X.h("input");t.type="text";t.placeholder="In a few words";t.value=title0||"";sh.box.appendChild(t);
  var b=X.h("textarea");b.placeholder="The detail";b.value=body0||"";b.style.cssText="width:100%;min-height:110px;margin:0 0 10px";sh.box.appendChild(b);
  var end=X.h("div","end"),ok=X.btn("pri","Raise it",function(){var tt=t.value.trim();if(!tt){t.focus();return;}ok.disabled=true;raise(L,tt,b.value).then(function(i){sh.close();X.toast("Issue #"+i.number+" raised.");delete cache[r.id+"iss"];done();},function(e){ok.disabled=false;X.fail(e);});});
  end.appendChild(X.btn("","Close",sh.close));end.appendChild(ok);sh.box.appendChild(end);setTimeout(function(){t.focus();},60);}
/* the test's report, taken to Code with the app open there */
function fixInCode(r,report,X){try{if(typeof window.fbOpenInCode==="function"){window.fbOpenInCode(r,null,function(){var inp=document.getElementById("chatInput");if(inp){inp.value=report+"\n\nPlease find the cause in the files and fix it.";inp.dispatchEvent(new Event("input"));}});return;}}catch(e){}
  X.toast("Code is not in this build; the report is copied below.");try{if(typeof csCopyText==="function")csCopyText(report);}catch(e){}}

function forget(id){["runs","rel","iss"].forEach(function(k){delete cache[id+k];});var L=FB().remote[id];if(L)delete L.check;}
window.fbGitHub={paint:paint,forget:forget,signIn:signIn,signOut:signOut,deviceStart:deviceStart,devicePoll:devicePoll,oauth:oauth,clientId:clientId,canDevice:canDevice,openOut:openOut,link:link,unlink:unlink,compare:compare,send:send,bring:bring,release:release,releases:releases,runs:runs,startBuilds:startBuilds,artifacts:artifacts,issues:issues,raise:raise,api:api,_:{person:person,identLine:identLine}};
})();
;try{window.__ingParts["p45"]="running";}catch(_){}
</script>
