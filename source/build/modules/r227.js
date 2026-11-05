<style id="r227-css">
/* ============ R227 · INGENIUM'S OWN PAGE, CHANGED BY ITS AUTHOR (Ingenium 6.19, 4 November 2026; the master edition only) ============
   Her words (4 November 2026): "I want full agency and authorship over Ingenium. I want to be able to make proper edits, customise,
   troubleshoot, fix, curate, run diagnostics and add or remove new features, pages, sections or different functions in Ingenium as
   its author and creator." Her answer on how changes take effect: both, layers first (6.18, r226), then the page itself (here).
   - Your page, a card in the Workshop. On her computers (desktop/app_page_619.py): a changed page, from the Workshop's copy in Code
     or from a file, is kept as a version of its own and takes the place of the built one at once, at the same address and with the
     same stored work. A changed page counts as working once its Workshop reports in; one that has not within half a minute, or did
     not come up at a start, is left, and Ingenium goes back to the last version that worked (or the built page) on its own, and
     says so here. Versions: use one, or remove one; the built page is always one choice away (and, on a Mac, in the app menu).
   - The copy in Code is lighter: what the page carries at its end (the apps on the Desk, the engine, the kits, the typefaces:
     about 61 MB of 76) is left out, so the model reads and searches about 15 MB; it is put back whenever the page is used or
     downloaded whole. The Workshop's copy in Code is used again while the page running is the one it was made from.
   - In a browser, the card says how to keep the changed page: download it whole, with what it carries put back. */
#wsStudio .pg-line{font-size:13.5px;line-height:1.55;color:var(--ink-1);margin:4px 0 0}
#wsStudio .pg-line b{font-weight:700}
#wsStudio .pg-busy{font-size:12.5px;color:var(--ink-3);margin:8px 0 0;min-height:1em}
#wsStudio .ws-item .t .good{color:#2f7a55}
body[data-theme="night"] #wsStudio .ws-item .t .good{color:#8fd0a9}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p227"]="started";}catch(_){}
/* R227 · Ingenium's own page, changed by its author: see the note at the top of its styles. window.IngPage */
(function r227(){"use strict";
if(window.IngPage)return;
var W=window,D=document;
try{if(typeof ING_EDITION!=="undefined"&&ING_EDITION!=="master")return;}catch(e){}
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function key(cls,txt,fn,title){var b=mk("button","btn "+(cls||""),txt);b.type="button";if(title)b.title=title;b.onclick=fn;return b;}
function toast(t){try{ingToast(t);}catch(e){}}
function when(ms){try{return new Date(ms).toLocaleString();}catch(e){return String(ms);}}
function mb(n){return (n/1048576).toFixed(n<10485760?1:0)+" MB";}
function api(){try{var a=typeof shellApi==="function"?shellApi():null;return a&&typeof a.page_state==="function"&&typeof a.page_put==="function"?a:null;}catch(e){return null;}}
function call(name){var a=api(),args=[].slice.call(arguments,1);if(!a||typeof a[name]!=="function")return Promise.reject(new Error("only the computer app can do this"));
  try{return Promise.resolve(a[name].apply(a,args));}catch(e){return Promise.reject(e);}}
function ask(q,o){return typeof ingConfirm==="function"?ingConfirm(q,null,o):Promise.resolve(W.confirm(String(q)));}

/* ================= 1. what the page carries at its end: out of the copy in Code, back in when used ================= */
/* the marks are put together here, so this script never holds them whole (the build and the computer apps look for them) */
var PRE="ing-"+"tail:",SC="scr"+"ipt";
function reTail(){return new RegExp("<"+SC+' id="'+PRE+'([^"]+)"[^>]*>[^<]*<\\/'+SC+">\\n?","g");}
function tailsOf(t){var re=reTail(),m,o={};while((m=re.exec(t)))o[m[1]]=m[0];return o;}
function lean(t){return String(t||"").replace(reTail(),"");}
function named(t){var re=new RegExp('data-defer="#'+PRE+'([^"]+)"',"g"),m,o=[];while((m=re.exec(t)))if(o.indexOf(m[1])<0)o.push(m[1]);return o;}
function whole(t){t=String(t||"");var want=named(t).filter(function(k){return t.indexOf("<"+SC+' id="'+PRE+k+'"')<0;});
  if(!want.length)return Promise.resolve(t);
  if(typeof selfPageText!=="function")return Promise.reject(new Error("the running page cannot be read here"));
  return selfPageText().then(function(full){var have=tailsOf(full),miss=want.filter(function(k){return !have[k];});
    if(miss.length)throw new Error("the running page does not carry "+miss.join(", "));
    var add=want.map(function(k){var b=have[k];return b.slice(-1)==="\n"?b:b+"\n";}).join(""),i=t.lastIndexOf("</body>");
    return i<0?t+add:t.slice(0,i)+add+t.slice(i);});}
function mark(t){var h=5381,n=t.length,step=Math.max(1,Math.floor(n/200000));for(var i=0;i<n;i+=step)h=(((h<<5)+h)^t.charCodeAt(i))>>>0;return n+":"+h.toString(36);}
var HINT="This copy leaves out what the page carries at its end (the apps on the Desk, the engine, the kits and the typefaces): its blocks marked data-defer stay empty here, are filled again when the page is used, and are best left as they are.";

/* the Workshop's copy in Code: used again while the page running is the one it was made from */
function projects(){var ps=(W.state&&Array.isArray(W.state.projects))?W.state.projects:[];
  return ps.filter(function(p){return p&&(p.ingSelf||/^Ingenium \((workshop|Author Studio)/.test(String(p.name||"")));}).sort(function(a,b){return (b.updated||b.made||0)-(a.updated||a.made||0);});}
function project(){if(typeof selfPageText!=="function"||typeof ccMakeProject!=="function")return Promise.reject(new Error("Ingenium's own page cannot be opened in Code from here"));
  return selfPageText().then(function(t){if(!t)throw new Error("its page could not be read from this device");var l=lean(t),m=mark(l);
    var pr=projects().filter(function(p){return p.ingSelf&&p.ingSelf.base===m;})[0];if(pr)return pr;
    return ccMakeProject("Ingenium (Author Studio)",[{name:"ingenium.html",text:l}],"ingenium.html").then(function(p){p.ingSelf={base:m,at:Date.now(),lean:true,bytes:t.length};try{saveState();}catch(e){}return p;});});}
function codeText(pr){return Promise.resolve(typeof ccLoadAll==="function"?ccLoadAll(pr):null).then(function(){
  var f=(pr.files||[]).filter(function(x){return /(^|\/)ingenium\.html$/i.test(String(x.name||""))&&typeof x.text==="string";})[0];
  if(!f)throw new Error("the copy in Code has no ingenium.html");return f.text;});}

/* ================= 2. handing a page to the computer app ================= */
var BUSY="",STATE=null;
function busy(t){BUSY=t||"";var b=$("pgBusy");if(b)b.textContent=BUSY;}
/* a page in pieces of text (a pair of surrogates is never cut), to page_put (a version) or page_export (6.20: a download) */
function pieces(fn,text,lastArg){var N=2000000,i=0,len=text.length,first=true;
  function next(){var end=Math.min(len,i+N);if(end<len){var c=text.charCodeAt(end-1);if(c>=0xD800&&c<=0xDBFF)end--;}
    var last=end>=len;return call(fn,text.slice(i,end),first,last,last?String(lastArg||""):"").then(function(r){
      if(last)return r;if(!r||!r.ok)throw new Error((r&&r.error)||"a piece was not kept");first=false;i=end;
      busy("Handing the page over: "+Math.round(i*100/len)+"%");return next();});}
  return next();}
function send(text,note){return pieces("page_put",text,note).then(function(r){if(!r||!r.ok)throw new Error((r&&r.error)||"the page was not kept");return r;});}
/* 6.20: on the computer app, a download is written by the app (from its own file, or from the copy in pieces); nothing large crosses
   its bridge in one piece */
function saved(r){busy("");if(typeof r==="string"){if(r!=="cancelled")toast("Saved: "+r);return r;}throw new Error((r&&r.error)||"it was not saved");}
function can(fn){var a=api();return !!(a&&typeof a[fn]==="function");}
function useText(text,note){text=String(text||"");
  if(text.indexOf("__INGENIUM_BOOTED")<0){toast("This is not Ingenium's page: it never says it has started.");return Promise.resolve(null);}
  if(text.indexOf("W.IngPage=")<0){toast("This page is older than Ingenium 6.19: it has no Your page card, so it could not say it has started, and Ingenium would go back from it. Use a page made from this one.");return Promise.resolve(null);}
  return ask("Use this page in place of the one running?\n\nIngenium loads it now, at the same address, with all your work as it is. If it does not start within half a minute, Ingenium goes back to the last page that worked, on its own.",{yes:"Use it now",no:"Not now",danger:false})
    .then(function(ok){if(!ok)return null;busy("Handing the page over…");
      return send(text,note).then(function(r){busy("Kept"+(r.put_back?" (what it carries put back)":"")+". Loading it…");return call("page_use",r.id,true);})
        .then(function(r){busy("");toast(r&&r.now?"Your page is loading. The Author Studio, in Settings, says whether it started.":"Your page starts the next time Ingenium opens.");fill();return r;});})
    .catch(function(e){busy("");toast("The page could not be used: "+(e&&e.message||e));return null;});}
function fromCode(){var pr=projects()[0];if(!pr){toast("There is no copy of Ingenium's page in Code yet: press Find and fix with a model first.");return Promise.resolve(null);}
  busy("Reading the copy in Code…");
  return codeText(pr).then(function(t){return selfPageText().then(function(full){if(lean(full)===lean(t)){busy("");toast("The copy in Code is the page running: nothing has been changed in it yet.");return null;}
      busy("");return useText(t,"from Code: "+pr.name);});})
    .catch(function(e){busy("");toast("The copy in Code could not be read: "+(e&&e.message||e));return null;});}
function fromFile(){var inp=mk("input");inp.type="file";inp.accept=".html,.htm,text/html";
  inp.onchange=function(){var f=inp.files&&inp.files[0];if(!f)return;f.text().then(function(t){return useText(t,"from the file "+f.name);});};inp.click();}
function useVersion(id){busy(id?"Loading your page…":"Loading the page Ingenium was built with…");
  return call("page_use",id||"",true).then(function(r){busy("");if(!r||!r.ok)throw new Error((r&&r.error)||"it was not chosen");toast(r.now?"Loading it now.":"It starts the next time Ingenium opens.");fill();return r;})
    .catch(function(e){busy("");toast("It could not be used: "+(e&&e.message||e));});}
function dropVersion(v){return ask("Remove your page of "+vw(v.id)+"?\n\nIts file is deleted from this computer; the others stay.",{yes:"Remove it",no:"Keep it"}).then(function(ok){if(!ok)return;
  return call("page_drop",v.id).then(function(r){if(!r||!r.ok)throw new Error((r&&r.error)||"it was not removed");fill();},function(e){toast("It could not be removed: "+(e&&e.message||e));});});}
function save(name,text){if(typeof saveFileNative==="function")return saveFileNative(name,"text/html",text);
  var a=D.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type:"text/html"}));a.download=name;D.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},4000);}
function dlRunning(){if(can("page_save")){busy("Saving the page running…");return call("page_save",(STATE&&STATE.running)||"","ingenium.html").then(saved).catch(function(e){busy("");toast("The page could not be saved: "+(e&&e.message||e));});}
  busy("Reading the page running…");selfPageText().then(function(t){busy("");save("ingenium.html",t);},function(e){busy("");toast("The page could not be read: "+(e&&e.message||e));});}
function dlCopy(pr){if(can("page_export")){busy("Handing the copy over…");return codeText(pr).then(function(t){return pieces("page_export",t,"ingenium.html");}).then(saved).catch(function(e){busy("");toast("The page could not be saved: "+(e&&e.message||e));});}
  busy("Putting back what the page carries…");return codeText(pr).then(whole).then(function(t){busy("");save("ingenium.html",t);},function(e){busy("");toast("The page could not be made whole: "+(e&&e.message||e));});}
function dlFromCode(){var pr=projects()[0];if(!pr){toast("There is no copy of Ingenium's page in Code yet: press Find and fix with a model first.");return;}return dlCopy(pr);}

/* ================= 3. the card, in the Workshop ================= */
function vw(id){var m=/^(\d{4})(\d\d)(\d\d)-(\d\d)(\d\d)(\d\d)/.exec(String(id||""));return m?when(new Date(+m[1],+m[2]-1,+m[3],+m[4],+m[5],+m[6]).getTime()):String(id||"");}
function card(body){var c=mk("div","card");c.id="pgCard";c.appendChild(mk("h2","sec","Your page"));
  var p=mk("p","small muted","Ingenium's own page, changed by you or by a model, in place of the one it was built with. If a changed page does not start, Ingenium goes back to the last page that worked, on its own, and says so here.");p.style.marginTop="0";c.appendChild(p);
  var st=mk("div");st.id="pgState";c.appendChild(st);var k=mk("div","ws-keys");k.id="pgKeys";c.appendChild(k);
  var b=mk("p","pg-busy",BUSY);b.id="pgBusy";c.appendChild(b);var v=mk("div","ws-items");v.id="pgVers";c.appendChild(v);var n=mk("p","ws-note");n.id="pgNote";c.appendChild(n);
  body.appendChild(c);fill();return c;}
function line(host,html){var p=mk("p","pg-line");p.innerHTML=html;host.appendChild(p);return p;}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function fill(){var st=$("pgState"),k=$("pgKeys"),vs=$("pgVers"),nt=$("pgNote");if(!st)return Promise.resolve(null);
  if(!api()){st.innerHTML="";k.innerHTML="";vs.innerHTML="";
    line(st,"In the computer app, a changed page takes the place of the one Ingenium was built with, and Ingenium goes back to the last page that worked if it does not start.");
    nt.textContent="Here, in a browser: download the changed page whole (what it carries is put back), and open that file in place of this one.";
    k.appendChild(key("ghost","Download the page from Code, whole",dlFromCode,"The Author Studio's copy in Code, with what the page carries put back"));return Promise.resolve(null);}
  st.innerHTML="";line(st,"Asking the computer app…");
  return call("page_state").then(function(s){STATE=s;st.innerHTML="";k.innerHTML="";vs.innerHTML="";var by={};(s.versions||[]).forEach(function(v){by[v.id]=v;});
    function nameOf(id){if(!id)return "the page Ingenium was built with";var v=by[id];return "your page of "+esc(vw(id))+(v&&v.note?" ("+esc(v.note)+")":"");}
    line(st,"<b>Running:</b> "+nameOf(s.running)+".");
    if((s.use||"")!==(s.running||""))line(st,"<b>Chosen for the next start:</b> "+nameOf(s.use)+".");
    if(s.back&&s.back.from){var w=mk("div","ws-safe");w.style.marginTop="8px";w.textContent=when((s.back.at||0)*1000)+": your page of "+vw(s.back.from)+" "+(s.back.why||"did not start")+", so Ingenium went back to "+(s.back.to?"your page of "+vw(s.back.to):"the page it was built with")+" on its own. Your work is as it was.";st.appendChild(w);}
    k.appendChild(key("primary","Use the page from Code",fromCode,"The Author Studio's copy of Ingenium's page in Code, as the model or you changed it"));
    k.appendChild(key("ghost","Use a page file…",fromFile,"An ingenium.html of your own"));
    if(s.running||s.use)k.appendChild(key("ghost","Go back to the built page",function(){useVersion("");},"The page Ingenium was built with, now"));
    k.appendChild(key("ghost","Download the page running",dlRunning,"The page running now, whole"));
    (s.versions||[]).forEach(function(v){var it=mk("div","ws-item"),t=mk("div","t");t.appendChild(D.createTextNode("Your page of "+vw(v.id)));
      var sp=mk("span");var stx=v.good?"works":(v.tries?"did not start":"not tried yet");var so=mk("b",v.good?"good":(v.tries?"bad":null),stx);
      sp.appendChild(D.createTextNode((v.note?v.note+" · ":"")+mb(v.bytes||0)+" · "));sp.appendChild(so);if(v.id===s.running)sp.appendChild(D.createTextNode(" · running"));
      t.appendChild(sp);it.appendChild(t);
      if(v.id!==s.running)it.appendChild(key("small ghost","Use",function(){useVersion(v.id);}));
      if(v.id!==s.running&&v.id!==s.use)it.appendChild(key("small ghost","Remove",function(){dropVersion(v);}));
      vs.appendChild(it);});
    var mac=/Mac/i.test(navigator.platform||navigator.userAgent||"");
    nt.textContent="Kept on this computer, beside your stored work"+(s.folder?": "+s.folder:"")+". At most five versions are kept; the one in use and the last that worked always stay."+(mac?" Ingenium's app menu also has Use the built page, which works whatever a changed page does.":"");
    return s;},function(e){st.innerHTML="";line(st,"The computer app did not answer: "+esc(e&&e.message||e));return null;});}

/* ================= 4. start: the page reports in; a return made on its own is said once ================= */
var REPORTED=false;
function reportIn(){if(REPORTED)return;var a=api();if(!a||typeof a.page_started!=="function")return;if(!W.IngWorkshop)return;REPORTED=true;
  call("page_started").then(function(){return call("page_state");}).then(function(s){if(!s||!s.back||!s.back.from)return;var seen=0;try{seen=+localStorage.getItem("ing.page.backSeen")||0;}catch(e){}
    if((s.back.at||0)<=seen)return;try{localStorage.setItem("ing.page.backSeen",String(s.back.at||0));}catch(e){}
    toast("Your page of "+vw(s.back.from)+" "+(s.back.why||"did not start")+", so Ingenium went back to "+(s.back.to?"your page of "+vw(s.back.to):"the page it was built with")+" on its own. The Author Studio, in Settings, says more.");},function(){});}
(function later(){var n=0;(function wait(){if(W.__ingReady===true){setTimeout(reportIn,1500);return;}if(++n<400)setTimeout(wait,500);})();})();

/* Download the app in Code: the Workshop's copy is downloaded whole */
(function wrapDl(){var o=W.ccDownload;if(typeof o!=="function"||o.__r227)return;
  var n=function(pr){if(!(pr&&pr.ingSelf&&pr.ingSelf.lean))return o.apply(this,arguments);toast("Putting back what Ingenium's page carries…");return dlCopy(pr);};
  n.__r227=true;W.ccDownload=n;})();

W.IngPage={card:card,fill:fill,project:project,lean:lean,whole:whole,tails:tailsOf,named:named,mark:mark,hint:HINT,send:send,use:useText,fromCode:fromCode,
  useVersion:useVersion,state:function(){return STATE;},reportIn:reportIn,projects:projects};
})();
;try{window.__ingParts["p227"]="running";}catch(_){}
</script>
