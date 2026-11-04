<style id="r226-css">
/* ============ R226 · THE AUTHOR'S WORKSHOP (Ingenium 6.18, 4 November 2026; the master edition only) ============
   Her words (4 November 2026): "I want to be able to troubleshoot Ingenium inside of the app. I want to be able to run diagnostics and
   be able to find and fix a bug in the app. I want full agency and authorship over Ingenium. I want to be able to make proper edits,
   customise, troubleshoot, fix, curate, run diagnostics and add or remove new features, pages, sections or different functions in
   Ingenium as its author and creator. I want that capability added to my master version". Her answer on how edits take effect: both,
   layers first, then rewriting the page itself.
   The Workshop, a page of its own in the master edition (editions.py leaves this module out of every other):
   - Check Ingenium: every part loaded; every page opens; the large store and the small one write and read back; the room the browser
     offers; the engine and the models; the connections and connectors; the sign-in; the errors since it started; its version. Each
     line says ok, worth a look, or wrong, in plain words, and the report can be copied.
   - Errors since it started: every error the page meets, kept (the last 200, and the last 50 across restarts), with when and where.
   - Find and fix with a model: Ingenium's own page opens as an app in Code (as Your apps already opened it), with the report, or one
     error, ready in the message box for her to read before she sends it. The model searches, reads and changes ingenium.html; the
     preview runs the changed Ingenium; every change is a version she can undo; Download the app keeps the changed page.
   - Your layers, her additions that load as Ingenium starts, on every device that has her data: pages of her own in the side bar,
     sections added to a page, scripts that run in Ingenium (with all its power), styles, and pages or cards she hides. Nothing in the
     built page is changed.
   - A safe start: Start without your layers, and on its own when the last start stopped while one of her scripts ran.
   - Folders (her words, 4 November 2026: "I want the scroll bars kept hidden rule to be applied to all of my apps, please add that to
     the folders inside Ingenium as well for all future apps"): her rule is added once to How I work, on every app, in her words' place
     at its end, where she can change or remove it. */
#page-workshop .ws-wrap{max-width:1180px;margin:0 auto;display:flex;flex-direction:column;gap:18px}
#page-workshop .ws-keys{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:10px 0 0}
#page-workshop .ws-list{list-style:none;margin:10px 0 0;padding:0;display:flex;flex-direction:column;gap:6px}
#page-workshop .ws-list li{display:grid;grid-template-columns:22px minmax(0,1fr);gap:8px;align-items:start;font-size:13.5px;line-height:1.5;color:var(--ink-2)}
#page-workshop .ws-list li .m{font-weight:800;text-align:center}
#page-workshop .ws-list li.ok .m{color:#2f7a55}#page-workshop .ws-list li.warn .m{color:#a86b12}#page-workshop .ws-list li.bad .m{color:#b4483c}
body[data-theme="night"] #page-workshop .ws-list li.ok .m{color:#8fd0a9}body[data-theme="night"] #page-workshop .ws-list li.bad .m{color:#f0a097}
#page-workshop .ws-list li b{color:var(--ink-1)}
#page-workshop .ws-errs{list-style:none;margin:10px 0 0;padding:0;display:flex;flex-direction:column;gap:8px}
#page-workshop .ws-errs li{padding:10px 12px;border-radius:12px;border:1px solid var(--hairline);background:var(--card);font-size:13px;line-height:1.45}
#page-workshop .ws-errs li code{font:12px/1.45 var(--mono,ui-monospace,monospace);color:var(--ink-1);overflow-wrap:anywhere}
#page-workshop .ws-errs li .w{color:var(--ink-3);font-size:12px;margin-top:2px}
#page-workshop .ws-tabs{display:inline-flex;flex-wrap:wrap;gap:3px;padding:3px;border-radius:11px;background:rgba(34,26,46,.035);border:1px solid var(--hairline);margin:6px 0 10px}
#page-workshop .ws-tabs button{border:0;background:transparent;color:var(--ink-2);font:600 12.5px/1 var(--sans);padding:8px 12px;border-radius:8px;cursor:pointer}
#page-workshop .ws-tabs button[aria-selected="true"]{background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f6f2fb));color:var(--ink-1);box-shadow:inset 0 0 0 1px var(--accent),0 1px 2px rgba(40,22,68,.12)}
#page-workshop .ws-items{display:flex;flex-direction:column;gap:8px}
#page-workshop .ws-item{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;padding:10px 12px;border-radius:12px;border:1px solid var(--hairline);background:var(--card)}
#page-workshop .ws-item .t{flex:1 1 220px;min-width:0;font-size:13.5px;line-height:1.4;color:var(--ink-1)}
#page-workshop .ws-item .t span{display:block;font-size:12px;color:var(--ink-3);overflow-wrap:anywhere}
#page-workshop .ws-item .t .bad{color:#b4483c}
#page-workshop .ws-form{display:flex;flex-direction:column;gap:8px;margin-top:10px;padding:12px;border-radius:12px;border:1px solid var(--hairline);background:var(--card)}
#page-workshop .ws-form textarea{width:100%;box-sizing:border-box;min-height:140px;font:12.5px/1.5 var(--mono,ui-monospace,monospace);padding:10px 12px;border-radius:10px;border:1px solid var(--hairline);background:var(--card-hi,#fff);color:var(--ink-1)}
#page-workshop .ws-form .row{display:flex;flex-wrap:wrap;gap:8px}
#page-workshop .ws-form .row > *{flex:1 1 180px;min-width:0}
#page-workshop .ws-note{font-size:12.5px;line-height:1.5;color:var(--ink-3);margin:8px 0 0}
#page-workshop .ws-safe{padding:10px 12px;border-radius:12px;background:rgba(168,107,18,.10);color:var(--ink-1);font-size:13px;line-height:1.5}
.ws-lyr-page{display:flex;flex-direction:column;gap:12px;height:100%}
.ws-lyr-page iframe{width:100%;flex:1 1 auto;min-height:70vh;border:1px solid var(--hairline);border-radius:14px;background:#fff}
.ws-lyr-card iframe{width:100%;min-height:260px;border:1px solid var(--hairline);border-radius:12px;background:#fff}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p226"]="started";}catch(_){}
/* R226 · the author's workshop: see the note at the top of its styles. window.IngWorkshop */
(function r226(){"use strict";
if(window.IngWorkshop)return;
var W=window,D=document;
try{if(typeof ING_EDITION!=="undefined"&&ING_EDITION!=="master")return;}catch(e){}
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function key(cls,txt,fn,title){var b=mk("button","btn "+(cls||""),txt);b.type="button";if(title)b.title=title;b.onclick=fn;return b;}
function save(){try{saveState();}catch(e){}}
function toast(t){try{ingToast(t);}catch(e){}}
function uid(p){return (p||"l")+Date.now().toString(36)+Math.random().toString(36).slice(2,5);}
function when(t){try{return new Date(t).toLocaleString();}catch(e){return String(t);}}

/* ================= 1. errors, from the moment this part loads ================= */
var ERR=[],LSE="ing.errlog";
try{var old=JSON.parse(localStorage.getItem(LSE)||"[]");if(Array.isArray(old))old.forEach(function(e){e.before=true;ERR.push(e);});}catch(e){}
var errT=0;function keepErrs(){clearTimeout(errT);errT=setTimeout(function(){try{localStorage.setItem(LSE,JSON.stringify(ERR.filter(function(e){return !e.before;}).slice(-50)));}catch(e){}},400);}
function core(t){return String(t||"").replace(/^(Uncaught\s+)?(\(in promise\)\s*)?/i,"").replace(/^Ingenium error:\s*/i,"").replace(/^(Error|TypeError|ReferenceError|RangeError|SyntaxError):\s*/,"").split("\n")[0].trim();}
function pushErr(kind,msg,where){var m=String(msg==null?"":msg).slice(0,800);if(!m)return;var last=ERR[ERR.length-1];if(last&&!last.before&&last.msg===m&&Date.now()-last.at<1500){last.n=(last.n||1)+1;return;}
  /* the same error said twice (as it is thrown, and again by Ingenium's own handler, which writes it to the console) is kept once */
  if(last&&!last.before&&Date.now()-last.at<2000){var a1=core(last.msg),b1=core(m);if(a1&&b1&&(a1.indexOf(b1)>=0||b1.indexOf(a1)>=0))return;}
  ERR.push({at:Date.now(),kind:kind,msg:m,where:String(where||"").slice(0,240)});if(ERR.length>200)ERR.splice(0,ERR.length-200);keepErrs();paintErrsSoon();}
W.addEventListener("error",function(e){var t=e&&e.target;if(t&&t!==W&&(t.src||t.href)){pushErr("load","A file did not load: "+(t.src||t.href),t.tagName||"");return;}
  pushErr("error",(e&&(e.message||(e.error&&e.error.message)))||"An error",(e&&e.filename?String(e.filename).split("/").pop():"")+(e&&e.lineno?" line "+e.lineno:""));},true);
W.addEventListener("unhandledrejection",function(e){var r=e&&e.reason;pushErr("promise",(r&&r.message)||String(r),"a promise not caught");});
(function(){var ce=console.error;console.error=function(){try{pushErr("console",[].map.call(arguments,function(x){try{return typeof x==="string"?x:(x&&x.message)||JSON.stringify(x);}catch(_){return String(x);}}).join(" "),"console.error");}catch(_){}return ce.apply(console,arguments);};})();

/* ================= 2. layers: applied as Ingenium starts, unless it starts safe ================= */
function L(){var s=W.state;if(!s)return null;var x=s.layers;if(!x||typeof x!=="object")x=s.layers={};["pages","sections","scripts","styles"].forEach(function(k){if(!Array.isArray(x[k]))x[k]=[];});
  if(!x.hide||typeof x.hide!=="object")x.hide={pages:[],cards:[]};["pages","cards"].forEach(function(k){if(!Array.isArray(x.hide[k]))x.hide[k]=[];});return x;}
var BOOTKEY="ing.layers.boot",SAFEKEY="ing.layers.safe";
var SAFE=false,SAFEWHY="";
try{if(/(^|[#&])ing-safe/.test(location.hash||"")){SAFE=true;SAFEWHY="asked";}
  else if(localStorage.getItem(SAFEKEY)==="1"){SAFE=true;SAFEWHY="asked";}
  else{var bt=JSON.parse(localStorage.getItem(BOOTKEY)||"null");if(bt&&bt.at&&Date.now()-bt.at<6*3600e3){SAFE=true;SAFEWHY="stopped:"+(bt.name||bt.running||"");}}}catch(e){}
function styleEl(){var s=$("wsLayerStyles");if(!s){s=mk("style");s.id="wsLayerStyles";D.head.appendChild(s);}return s;}
/* her styles win over Ingenium's own: each of her selectors is given the weight of two ids more (html:not(#a):not(#b)), read by the
   browser's own parser; where it cannot read them, they go in as written */
var BOOST="html:not(#ws-a):not(#ws-b)";
function boostSel(sel){return sel.split(",").map(function(x){x=x.trim();if(!x)return x;if(/^html\b/i.test(x))return x.replace(/^html/i,BOOST);if(/^:root\b/.test(x))return x.replace(/^:root/,BOOST);return BOOST+" "+x;}).join(", ");}
function boostRules(rules){var out=[];for(var i=0;i<rules.length;i++){var r=rules[i];
    if(r.selectorText!==undefined&&r.style){try{r.selectorText=boostSel(r.selectorText);}catch(e){}out.push(r.cssText);}
    else if(r.cssRules&&r.conditionText!==undefined){var inner=boostRules(r.cssRules),head=r.cssText.slice(0,r.cssText.indexOf("{"));out.push(head+"{\n"+inner.join("\n")+"\n}");}
    else out.push(r.cssText);}return out;}
function boost(css){try{if(typeof CSSStyleSheet!=="function")return css;var sh=new CSSStyleSheet();if(typeof sh.replaceSync!=="function")return css;sh.replaceSync(String(css));var t=boostRules(sh.cssRules).join("\n");return t||css;}catch(e){return css;}}
function applyStyles(){var x=L();if(!x)return;var css="";if(!SAFE){x.styles.forEach(function(s){if(s.on!==false&&s.css)css+="\n/* "+String(s.name||"style").replace(/\*\//g,"")+" */\n"+boost(s.css);});
    x.hide.pages.forEach(function(p){css+='\n.nav-btn[data-page="'+String(p).replace(/[^\w-]/g,"")+'"]{display:none!important}';});
    x.hide.cards.forEach(function(c){css+="\n#"+String(c).replace(/[^\w-]/g,"")+"{display:none!important}";});}
  styleEl().textContent=css;}
function navHost(){var ws=D.querySelector('.nav-btn[data-page="workshop"]');if(ws)return {parent:ws.parentNode,after:ws};var st=D.querySelector('.nav-btn[data-page="settings"]');return st?{parent:st.parentNode,after:st}:null;}
var ICON='<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/></svg>';
function applyPages(){var x=L(),main=D.querySelector("main.main")||D.querySelector(".main");if(!x||!main)return;
  [].forEach.call(D.querySelectorAll(".nav-btn[data-lyr]"),function(b){b.remove();});[].forEach.call(D.querySelectorAll("section[data-lyr]"),function(s){if(!s.classList.contains("active"))s.remove();});
  if(SAFE)return;var host=navHost(),at=host&&host.after;
  x.pages.filter(function(p){return p.on!==false;}).forEach(function(p){var id="lyr-"+p.id;
    var sec=$("page-"+id);if(!sec){sec=mk("section","section");sec.id="page-"+id;sec.setAttribute("data-lyr",p.id);main.appendChild(sec);}
    sec.innerHTML="";var wrap=mk("div","ws-lyr-page");wrap.appendChild(mk("h1","page-title",p.name||"My page"));var fr=D.createElement("iframe");fr.setAttribute("sandbox","allow-scripts allow-forms allow-popups allow-modals");
    fr.setAttribute("title",p.name||"My page");fr.srcdoc=String(p.html||"");wrap.appendChild(fr);sec.appendChild(wrap);
    if(host){var b=mk("button","nav-btn");b.type="button";b.setAttribute("data-page",id);b.setAttribute("data-lyr",p.id);b.setAttribute("onclick","go('"+id+"')");b.title=p.name||"My page";
      b.innerHTML='<span aria-hidden="true" style="display:inline-block;width:18px;text-align:center">'+String(p.icon||"✦").replace(/[<>&"]/g,"").slice(0,4)+"</span>";b.appendChild(D.createTextNode(p.name||"My page"));
      host.parent.insertBefore(b,at.nextSibling);at=b;}
    try{if(W.PAGES&&PAGES.indexOf(id)<0)PAGES.push(id);}catch(e){}});}
function applySections(){var x=L();if(!x)return;[].forEach.call(D.querySelectorAll(".ws-lyr-card"),function(c){c.remove();});if(SAFE)return;
  x.sections.filter(function(s){return s.on!==false;}).forEach(function(s){var pg=$("page-"+s.page);if(!pg)return;var c=mk("div","card ws-lyr-card");c.setAttribute("data-lyr",s.id);
    if(s.title)c.appendChild(mk("h2","sec",s.title));
    if(s.kind==="html"){var fr=D.createElement("iframe");fr.setAttribute("sandbox","allow-scripts allow-forms allow-popups allow-modals");fr.setAttribute("title",s.title||"A section of yours");fr.srcdoc=String(s.body||"");c.appendChild(fr);}
    else{var d=mk("div","ws-md");try{d.innerHTML=typeof chatMd==="function"?chatMd(String(s.body||"")):"";}catch(e){d.textContent=String(s.body||"");}if(!d.innerHTML)d.textContent=String(s.body||"");c.appendChild(d);}
    /* at the top: under the page's title and its line, where it has them (Home has neither: there, first on the page) */
    var title=pg.querySelector(":scope > .page-title"),lede=title&&title.nextElementSibling&&title.nextElementSibling.classList.contains("lede")?title.nextElementSibling:null;
    if(s.place==="top"){if(title){var after=lede||title;after.parentNode.insertBefore(c,after.nextSibling);}else pg.insertBefore(c,pg.firstChild);}
    else{var col=pg.querySelector("#ingColophon");if(col&&col.parentNode===pg)pg.insertBefore(c,col);else pg.appendChild(c);}});}
var ran=false;
function runScripts(){if(ran)return;ran=true;var x=L();if(!x||SAFE)return;var list=x.scripts.filter(function(s){return s.on!==false&&s.code;});if(!list.length)return;
  list.forEach(function(s){try{localStorage.setItem(BOOTKEY,JSON.stringify({at:Date.now(),running:s.id,name:s.name||""}));}catch(e){}
    try{(new Function(String(s.code)))();s.err="";s.ranAt=Date.now();}catch(e){s.err=String(e&&e.message||e).slice(0,400);s.ranAt=Date.now();pushErr("layer","Your script "+(s.name||"")+": "+s.err,"layer");}});
  try{localStorage.removeItem(BOOTKEY);}catch(e){}save();}
function applyAll(){try{applyStyles();}catch(e){}try{applyPages();}catch(e){}try{applySections();}catch(e){}}
function safeStart(on){try{if(on){localStorage.setItem(SAFEKEY,"1");}else{localStorage.removeItem(SAFEKEY);localStorage.removeItem(BOOTKEY);}}catch(e){}
  try{var h=String(location.hash||"").replace(/(^#|&)ing-safe/,"");if(on)location.hash="ing-safe";else if(/ing-safe/.test(location.hash||""))history.replaceState(null,"",location.pathname+location.search+(h&&h!=="#"?h:""));}catch(e){}
  location.reload();}

/* ================= 3. the check ================= */
function line(st,t){return {st:st,t:t};}
function pagesOf(){var P=[];try{P=(W.PAGES||[]).slice();}catch(e){}["code","folders","career"].forEach(function(p){if($("page-"+p)&&P.indexOf(p)<0)P.push(p);});return P.filter(function(p){return !/^lyr-/.test(p)&&p!=="workshop";});}
/* the pages the check opens: not the apps on the Desk (pages of their own), and Chat or Code only when a conversation of that kind exists,
   so the check never makes an empty one */
function toOpen(){var cs=(W.state&&W.state.chats)||[],code=function(c){try{return ccIsCode(c);}catch(e){return false;}};
  return pagesOf().filter(function(p){if(p==="tabula"||p==="abacus")return false;if(p==="chat")return cs.some(function(c){return !code(c);});if(p==="code")return cs.some(code);return true;});}
var CHECKING=false;
function run(){var out=[],e0=ERR.length;
  var P=W.__ingParts||{},names=Object.keys(P),bad=names.filter(function(k){return P[k]!=="running";});
  out.push(bad.length?line("bad","<b>Parts</b>: "+bad.length+" of "+names.length+" did not finish loading ("+bad.join(", ")+"). Each is a part of the page that stopped with an error as Ingenium started."):line("ok","<b>Parts</b>: all "+names.length+" loaded."));
  var cur=null;try{var a=D.querySelector(".section.active");cur=a?a.id.replace(/^page-/,""):"workshop";}catch(e){}
  var failed=[],opened=toOpen();CHECKING=true;opened.forEach(function(p){try{W.go(p);}catch(e){failed.push(p+" ("+(e&&e.message||e)+")");}});try{W.go(cur||"workshop");}catch(e){}CHECKING=false;
  return new Promise(function(res){setTimeout(res,300);}).then(function(){var during=ERR.slice(e0);
    out.push(failed.length?line("bad","<b>Pages</b>: "+failed.length+" did not open: "+failed.join("; ")+"."):line(during.length?"warn":"ok","<b>Pages</b>: "+opened.length+" opened"+(during.length?", with "+during.length+" error"+(during.length===1?"":"s")+" meanwhile (listed below).":".")+" The apps on the Desk are pages of their own, and are not opened."));
    var id="wscheck"+Date.now().toString(36),txt="Workshop check "+Date.now();
    return Promise.resolve().then(function(){return IngBig.put(id,txt);}).then(function(){return IngBig.load(id);}).then(function(back){try{IngBig.del(id);}catch(e){}
        out.push(back===txt?line("ok","<b>The large store</b>: writes and reads back."):line("bad","<b>The large store</b>: what was written did not come back."));},
      function(e){out.push(line("bad","<b>The large store</b>: "+(e&&e.message||e)));});})
  .then(function(){try{var k="ing.wscheck";localStorage.setItem(k,"1");var ok=localStorage.getItem(k)==="1";localStorage.removeItem(k);var n=0;try{n=JSON.stringify(W.state).length;}catch(e){}
      out.push(ok?line("ok","<b>The small store</b>: writes and reads back. Your desk is about "+Math.round(n/1024)+" KB."):line("bad","<b>The small store</b>: what was written did not come back."));}catch(e){out.push(line("warn","<b>The small store</b>: "+(e&&e.message||e)+" (Ingenium keeps your desk in the large store when this one refuses it)."));}
    var est=navigator.storage&&navigator.storage.estimate?navigator.storage.estimate():Promise.resolve(null);return est.then(function(r){if(r&&r.quota){var u=r.usage/1e9,q=r.quota/1e9,f=u/q;
        out.push(line(f>0.9?"bad":f>0.75?"warn":"ok","<b>Room</b>: Ingenium uses about "+u.toFixed(2)+" GB of the "+q.toFixed(1)+" GB the browser offers it here."));}},function(){});})
  .then(function(){var ms=(W.state.models||[]),ready=ms.filter(function(m){return m&&m.fileState==="ready";}).length,st="";try{st=Engine.status;}catch(e){}
    var desk=false;try{desk=typeof deskApi==="function"&&!!deskApi();}catch(e){}
    out.push(line("ok","<b>The engine</b>: "+(st||"unknown")+(desk?", in the computer app":", in the page")+". Models kept: "+ms.length+", "+ready+" ready."));
    var cx=(W.state.cxKept||[]).map(function(c){return c.provider;}),cl=W.state.cloud||{};
    out.push(line("ok","<b>Connections</b>: "+(cx.length?cx.length+" kept ("+cx.join(", ")+")":"none kept")+(cl.on&&cl.provider?"; the chat uses "+cl.provider+(cl.model?" ("+cl.model+")":""):"; the chat uses this device")+". Their keys stay on this device and are not in this report."));
    var cn=[];try{cn=W.IngConnectors?IngConnectors.list():[];}catch(e){}var cbad=cn.filter(function(c){return c.err;});
    out.push(line(cbad.length?"warn":"ok","<b>Connectors</b>: "+(cn.length?cn.length+" added"+(cbad.length?", "+cbad.length+" with an error at its last test ("+cbad.map(function(c){return c.name;}).join(", ")+")":""):"none added")+"."));
    var lk="";try{lk=W.IngLock?(IngLock.on()?"on":"off"):"not carried";}catch(e){lk="unknown";}out.push(line("ok","<b>Sign-in</b>: "+lk+"."));
    var x=L()||{pages:[],sections:[],scripts:[],styles:[],hide:{pages:[],cards:[]}},se=x.scripts.filter(function(s){return s.err;});
    out.push(line(SAFE?"warn":se.length?"warn":"ok","<b>Your layers</b>: "+x.pages.length+" page"+(x.pages.length===1?"":"s")+", "+x.sections.length+" section"+(x.sections.length===1?"":"s")+", "+x.scripts.length+" script"+(x.scripts.length===1?"":"s")+", "+x.styles.length+" style"+(x.styles.length===1?"":"s")+
      (SAFE?"; this start is without them":"")+(se.length?"; "+se.length+" script"+(se.length===1?"":"s")+" stopped with an error":"")+"."));
    var now=ERR.filter(function(e){return !e.before;});
    out.push(line(now.length?"warn":"ok","<b>Errors since it started</b>: "+(now.length?now.length+" (listed below)":"none")+"."));
    var v="";try{v=ING_VERSION+(typeof ING_PAGE_DATE!=="undefined"?" ("+ING_PAGE_DATE+")":"")+", the "+ING_EDITION+" edition";}catch(e){}
    out.push(line("ok","<b>Version</b>: Ingenium "+v+". "+(navigator.userAgent||"").replace(/[<>]/g,"").slice(0,160)));
    LAST={at:Date.now(),lines:out};return out;});}
var LAST=null;
function plainOf(lines){return lines.map(function(l){return (l.st==="ok"?"[ok] ":l.st==="warn"?"[look] ":"[wrong] ")+l.t.replace(/<[^>]+>/g,"");}).join("\n");}
function report(){var r="Ingenium's own check, "+when((LAST&&LAST.at)||Date.now())+":\n"+(LAST?plainOf(LAST.lines):"(not run yet)");
  var now=ERR.filter(function(e){return !e.before;}).slice(-12);if(now.length)r+="\n\nErrors since it started:\n"+now.map(function(e){return "- "+when(e.at)+" ["+e.kind+"] "+e.msg+(e.where?" ("+e.where+")":"")+(e.n>1?" (x"+e.n+")":"");}).join("\n");return r;}
function fix(about){if(typeof selfPageText!=="function"||typeof ccMakeProject!=="function"){toast("Ingenium's own page cannot be opened in Code from here.");return Promise.resolve(null);}
  toast("Opening Ingenium's own page in Code…");
  return (W.IngPage&&IngPage.project?IngPage.project():selfPageText().then(function(t){if(!t)throw new Error("its page could not be read from this device");
      return ccMakeProject("Ingenium (workshop)",[{name:"ingenium.html",text:t}],"ingenium.html");}))
    .then(function(pr){W.go("code");try{closeModal();}catch(e){}ccNewSession(pr);var inp=$("chatInput");
      if(inp){inp.value="Ingenium's own check, in the workshop, found what is below. Find the cause in ingenium.html (this copy of Ingenium) and fix it, changing as little as you can. Then run the app and check it starts with no errors, and tell me what you changed and why."+(W.IngPage&&IngPage.hint?" "+IngPage.hint:"")+"\n\n"+(about||report());
        try{inp.dispatchEvent(new Event("input",{bubbles:true}));inp.focus();}catch(e){}}
      toast("Ingenium's own page is open in Code, with the report in the message box: read it, then send it.");return pr;},
      function(e){toast("Ingenium's own page could not be read here: "+(e&&e.message||e)+". In the computer app it can; in a browser, open the page from its address.");return null;});}

/* ================= 4. the page ================= */
var UI={tab:"pages",form:null};
function install(){if($("page-workshop"))return;var main=D.querySelector("main.main")||D.querySelector(".main");if(!main)return;
  var sec=mk("section","section");sec.id="page-workshop";
  sec.innerHTML='<h1 class="page-title">Workshop</h1><p class="lede">Ingenium\'s author\'s workshop: check how it is, find and fix what is wrong, and add, change or hide its parts. In your master edition only.</p><div class="ws-wrap" id="wsBody"></div>';
  main.appendChild(sec);
  var st=D.querySelector('.nav-btn[data-page="settings"]');
  if(st&&!D.querySelector('.nav-btn[data-page="workshop"]')){var b=mk("button","nav-btn");b.type="button";b.setAttribute("data-page","workshop");b.setAttribute("onclick","go('workshop')");b.title="Workshop";b.innerHTML=ICON+"Workshop";st.parentNode.insertBefore(b,st.nextSibling);}
  try{if(W.PAGES&&PAGES.indexOf("workshop")<0)PAGES.push("workshop");}catch(e){}}
function card(title,lede){var c=mk("div","card");c.appendChild(mk("h2","sec",title));if(lede){var p=mk("p","small muted",lede);p.style.marginTop="0";c.appendChild(p);}return c;}
var paintT=0;function paintErrsSoon(){clearTimeout(paintT);paintT=setTimeout(function(){try{if($("wsErrs"))paintErrs();}catch(e){}},200);}
function paintErrs(){var host=$("wsErrs");if(!host)return;host.innerHTML="";var list=ERR.slice(-40).reverse();
  if(!list.length){host.appendChild(mk("p","ws-note","None. Every error the page meets from now on is listed here, with when and where."));return;}
  var ul=mk("ul","ws-errs");list.forEach(function(e){var li=mk("li");var c=mk("code",null,e.msg);li.appendChild(c);li.appendChild(mk("div","w",when(e.at)+" · "+(e.kind==="layer"?"one of your scripts":e.kind==="load"?"a file":e.kind==="promise"?"a promise not caught":e.kind==="console"?"written to the console":"an error")+(e.where?" · "+e.where:"")+(e.n>1?" · "+e.n+" times":"")+(e.before?" · before the last restart":"")));
    var k=mk("div","ws-keys");k.appendChild(key("small ghost","Find and fix this with a model",function(){fix("The error: "+e.msg+(e.where?" ("+e.where+")":"")+", "+when(e.at)+".\n\n"+report());}));li.appendChild(k);ul.appendChild(li);});host.appendChild(ul);}
function paint(){var body=$("wsBody");if(!body)return;body.innerHTML="";
  if(SAFE){var sf=mk("div","ws-safe");sf.textContent=SAFEWHY.indexOf("stopped:")===0?"This start is without your layers: the last start stopped while your script "+(SAFEWHY.slice(8)||"")+" ran. Look at it below, then start with your layers again.":"This start is without your layers, as you asked.";
    var k0=mk("div","ws-keys");k0.appendChild(key("primary","Start with your layers again",function(){safeStart(false);}));sf.appendChild(k0);body.appendChild(sf);}
  /* the check */
  var c1=card("Check Ingenium","Every part, every page, the stores, the room, the engine, your connections and connectors, the sign-in and the errors since it started, each in plain words.");
  var keys=mk("div","ws-keys"),res=mk("div");res.id="wsRes";
  keys.appendChild(key("primary","Run the check",function(){var b=this;b.disabled=true;res.innerHTML="";res.appendChild(mk("p","ws-note","Checking: each page is opened in turn…"));
    run().then(function(){paint();},function(e){paint();toast("The check stopped: "+(e&&e.message||e));});}));
  keys.appendChild(key("ghost","Copy the report",function(){var t=report();try{navigator.clipboard.writeText(t).then(function(){toast("The report is copied.");},function(){toast(t.slice(0,200));});}catch(e){toast(t.slice(0,200));}}));
  keys.appendChild(key("ghost","Find and fix with a model",function(){fix();},"Opens Ingenium's own page in Code, with the report in the message box"));
  c1.appendChild(keys);c1.appendChild(res);if(LAST)paintRes(res,LAST.lines);body.appendChild(c1);
  /* the errors */
  var c2=card("Errors since it started","What the page met, newest first: errors, files that did not load, promises not caught and what was written to the console as an error. The last 50 are kept across restarts.");
  var eh=mk("div");eh.id="wsErrs";c2.appendChild(eh);var k2=mk("div","ws-keys");k2.appendChild(key("small ghost","Clear the list",function(){ERR.length=0;try{localStorage.removeItem(LSE);}catch(e){}paintErrs();}));c2.appendChild(k2);body.appendChild(c2);paintErrs();
  /* the layers */
  var c3=card("Your layers","Your own additions, loaded as Ingenium starts, on every device that has your data. Nothing in the built page is changed: turn one off, or start without them all, and Ingenium is as it was built.");
  var tabs=mk("div","ws-tabs");tabs.setAttribute("role","tablist");[["pages","Pages"],["sections","Sections"],["scripts","Scripts"],["styles","Styles"],["hide","Hidden"]].forEach(function(t){var b=mk("button",null,t[1]);b.type="button";b.setAttribute("role","tab");
    b.setAttribute("aria-selected",UI.tab===t[0]?"true":"false");b.onclick=function(){UI.tab=t[0];UI.form=null;paint();};tabs.appendChild(b);});c3.appendChild(tabs);
  var pane=mk("div");c3.appendChild(pane);paintPane(pane);
  var k3=mk("div","ws-keys");k3.appendChild(key("ghost",SAFE?"Start with your layers again":"Start without your layers",function(){safeStart(!SAFE);},"Reloads Ingenium"));c3.appendChild(k3);
  c3.appendChild(mk("p","ws-note","A script runs inside Ingenium with all its power: it can read and change your data. Keep only scripts you wrote or understand. If a start ever stops while one of them runs, the next start is without your layers, and says which."));
  body.appendChild(c3);
  /* the page itself (r227, 6.19): Your page; otherwise what comes next */
  if(W.IngPage&&IngPage.card){IngPage.card(body);return;}
  var c4=card("Changing Ingenium itself","Find and fix with a model opens Ingenium's own page in Code: the model reads and changes ingenium.html, the preview runs the changed Ingenium, and every change is a version you can undo. Download the app keeps the changed page. Next: on your computers, the changed page will take the place of the installed one, and go back to the last working version if it does not start.");body.appendChild(c4);}
function paintRes(res,lines){res.innerHTML="";var ul=mk("ul","ws-list");lines.forEach(function(l){var li=mk("li",l.st);li.appendChild(mk("span","m",l.st==="ok"?"✓":l.st==="warn"?"!":"✗"));var t=mk("span");t.innerHTML=l.t;li.appendChild(t);ul.appendChild(li);});res.appendChild(ul);
  res.appendChild(mk("p","ws-note","Checked "+when((LAST&&LAST.at)||Date.now())+". Wrong: something does not work. Look: worth a look, it may be fine."));}
function itemRow(title,sub,on,acts,bad){var r=mk("div","ws-item"),t=mk("div","t");t.appendChild(D.createTextNode(title));if(sub){var s=mk("span",null,sub);if(bad)s.className="bad";t.appendChild(s);}r.appendChild(t);
  acts.forEach(function(a){r.appendChild(key("small "+(a[2]||"ghost"),a[0],a[1]));});return r;}
function changed(){save();applyAll();paint();}
function paintPane(pane){var x=L();if(!x){pane.textContent="Your data is not open yet.";return;}var items=mk("div","ws-items");pane.appendChild(items);
  function form(fields,onSave){var f=mk("div","ws-form");fields.forEach(function(fl){var lab=mk("label","field");lab.style.margin="0";lab.appendChild(mk("span",null,fl.label));var inp;
      if(fl.type==="area"){inp=D.createElement("textarea");inp.spellcheck=false;}else if(fl.type==="select"){inp=D.createElement("select");fl.opts.forEach(function(o){var op=D.createElement("option");op.value=o[0];op.textContent=o[1];inp.appendChild(op);});}else{inp=D.createElement("input");inp.type="text";}
      inp.value=fl.value==null?"":fl.value;if(fl.ph)inp.placeholder=fl.ph;inp.setAttribute("data-k",fl.k);lab.appendChild(inp);f.appendChild(lab);});
    var k=mk("div","ws-keys");k.appendChild(key("primary","Keep it",function(){var v={};[].forEach.call(f.querySelectorAll("[data-k]"),function(i){v[i.getAttribute("data-k")]=i.value;});if(onSave(v)!==false){UI.form=null;changed();}}));
    k.appendChild(key("ghost","Cancel",function(){UI.form=null;paint();}));f.appendChild(k);return f;}
  var T=UI.tab;
  if(T==="pages"){x.pages.forEach(function(p,i){items.appendChild(itemRow((p.icon||"✦")+" "+(p.name||"My page"),(p.on===false?"Off · ":"")+"a page in the side bar, after Workshop · "+Math.round(String(p.html||"").length/1024)+" KB",p.on,
      [["Open",function(){W.go("lyr-"+p.id);}],["Edit",function(){UI.form={k:"page",i:i};paint();}],[p.on===false?"Turn on":"Turn off",function(){p.on=p.on===false;changed();}],["Remove",function(){x.pages.splice(i,1);changed();}]]));});
    if(UI.form&&UI.form.k==="page"){var p0=UI.form.i!=null?x.pages[UI.form.i]:{};pane.appendChild(form([{k:"name",label:"Its name in the side bar",value:p0.name||"",ph:"My notes board"},{k:"icon",label:"Its sign (an emoji or a letter)",value:p0.icon||"✦"},
        {k:"from",label:"Or take one of your Code apps",type:"select",value:"",opts:[["","(write the page below)"]].concat((typeof ccProjects==="function"?ccProjects():[]).map(function(pr){return [pr.id,pr.name];}))},
        {k:"html",label:"Its page (HTML; it runs in a frame of its own, apart from your data)",type:"area",value:p0.html||"",ph:"<!doctype html>\n<h1>My page</h1>"}],function(v){var name=v.name.trim();if(!name){toast("Give the page a name.");return false;}
        var html=v.html;if(v.from){try{var pr=(ccProjects()||[]).filter(function(q){return q.id===v.from;})[0];if(pr){var h=ccPreviewHtml(pr);if(h)html=h;else{toast("That app's main page is not loaded yet: open it once in Code, then try again.");return false;}}}catch(e){}}
        if(!String(html||"").trim()){toast("Write the page, or choose one of your Code apps.");return false;}
        var rec={id:p0.id||uid("p"),name:name.slice(0,40),icon:(v.icon||"✦").slice(0,4),html:String(html),on:p0.on!==false};if(UI.form.i!=null)x.pages[UI.form.i]=rec;else x.pages.push(rec);}));}
    else pane.appendChild(key("ghost","Add a page",function(){UI.form={k:"page",i:null};paint();}));
    pane.appendChild(mk("p","ws-note","A page of yours runs in a frame of its own, as a preview does: it cannot read your data, and its links open in a new window."));}
  if(T==="sections"){x.sections.forEach(function(s,i){items.appendChild(itemRow(s.title||"A section",(s.on===false?"Off · ":"")+"on "+s.page+", at the "+(s.place==="top"?"top":"foot")+(s.kind==="html"?" · HTML in a frame":" · written text"),s.on,
      [["Edit",function(){UI.form={k:"section",i:i};paint();}],[s.on===false?"Turn on":"Turn off",function(){s.on=s.on===false;changed();}],["Remove",function(){x.sections.splice(i,1);changed();}]]));});
    if(UI.form&&UI.form.k==="section"){var s0=UI.form.i!=null?x.sections[UI.form.i]:{};pane.appendChild(form([{k:"page",label:"On the page",type:"select",value:s0.page||"home",opts:pagesOf().map(function(p){return [p,p.charAt(0).toUpperCase()+p.slice(1)];})},
        {k:"place",label:"Where",type:"select",value:s0.place||"top",opts:[["top","At the top, under its title"],["foot","At the foot"]]},{k:"title",label:"Its title",value:s0.title||"",ph:"My reminders"},
        {k:"kind",label:"Its kind",type:"select",value:s0.kind||"md",opts:[["md","Written text (Markdown)"],["html","HTML, in a frame of its own"]]},{k:"body",label:"Its text",type:"area",value:s0.body||"",ph:"- Water the ferns on Fridays"}],function(v){
        if(!String(v.body||"").trim()){toast("Write what the section says.");return false;}var rec={id:s0.id||uid("s"),page:v.page,place:v.place,title:v.title.trim().slice(0,80),kind:v.kind==="html"?"html":"md",body:v.body,on:s0.on!==false};
        if(UI.form.i!=null)x.sections[UI.form.i]=rec;else x.sections.push(rec);}));}
    else pane.appendChild(key("ghost","Add a section",function(){UI.form={k:"section",i:null};paint();}));}
  if(T==="scripts"){x.scripts.forEach(function(s,i){items.appendChild(itemRow(s.name||"A script",(s.on===false?"Off · ":"")+(s.err?"stopped with an error: "+s.err:s.ranAt?"ran "+when(s.ranAt):"runs as Ingenium starts"),s.on,
      [["Run it now",function(){try{(new Function(String(s.code)))();s.err="";toast("It ran.");}catch(e){s.err=String(e&&e.message||e).slice(0,400);toast("It stopped: "+s.err);}s.ranAt=Date.now();save();paint();}],["Edit",function(){UI.form={k:"script",i:i};paint();}],
       [s.on===false?"Turn on":"Turn off",function(){s.on=s.on===false;save();paint();}],["Remove",function(){x.scripts.splice(i,1);save();paint();}]],!!s.err));});
    if(UI.form&&UI.form.k==="script"){var c0=UI.form.i!=null?x.scripts[UI.form.i]:{};pane.appendChild(form([{k:"name",label:"Its name",value:c0.name||"",ph:"A quieter Home"},{k:"code",label:"Its code (JavaScript, run in Ingenium as it starts, after every part has loaded)",type:"area",value:c0.code||"",ph:"// for example\ndocument.title = 'Ingenium · my studio';"}],function(v){
        if(!String(v.code||"").trim()){toast("Write the script.");return false;}try{new Function(String(v.code));}catch(e){toast("It cannot run as written: "+(e&&e.message||e));return false;}
        var rec={id:c0.id||uid("c"),name:(v.name.trim()||"A script").slice(0,60),code:String(v.code),on:c0.on!==false,err:""};if(UI.form.i!=null)x.scripts[UI.form.i]=rec;else x.scripts.push(rec);}));}
    else pane.appendChild(key("ghost","Add a script",function(){UI.form={k:"script",i:null};paint();}));
    pane.appendChild(mk("p","ws-note","Scripts run at the next start, in the order listed; Run it now runs one at once. A change a script makes to the page lasts until Ingenium starts again."));}
  if(T==="styles"){x.styles.forEach(function(s,i){items.appendChild(itemRow(s.name||"A style",(s.on===false?"Off · ":"")+String(s.css||"").length+" characters of CSS",s.on,
      [["Edit",function(){UI.form={k:"style",i:i};paint();}],[s.on===false?"Turn on":"Turn off",function(){s.on=s.on===false;changed();}],["Remove",function(){x.styles.splice(i,1);changed();}]]));});
    if(UI.form&&UI.form.k==="style"){var y0=UI.form.i!=null?x.styles[UI.form.i]:{};pane.appendChild(form([{k:"name",label:"Its name",value:y0.name||"",ph:"Larger headings"},{k:"css",label:"Its CSS (applied at once and at every start, ahead of Ingenium's own)",type:"area",value:y0.css||"",ph:".page-title { font-size: 40px; }"}],function(v){
        if(!String(v.css||"").trim()){toast("Write the style.");return false;}var rec={id:y0.id||uid("y"),name:(v.name.trim()||"A style").slice(0,60),css:String(v.css),on:y0.on!==false};if(UI.form.i!=null)x.styles[UI.form.i]=rec;else x.styles.push(rec);}));}
    else pane.appendChild(key("ghost","Add a style",function(){UI.form={k:"style",i:null};paint();}));}
  if(T==="hide"){var keep={home:1,settings:1,workshop:1};
    pane.appendChild(mk("p","ws-note","Pages hidden from the side bar (Home, Settings and the Workshop always stay):"));
    var grid=mk("div","ws-items");[].forEach.call(D.querySelectorAll(".nav-btn[data-page]:not([data-lyr])"),function(b){var p=b.getAttribute("data-page");if(keep[p])return;var row=mk("label","ws-item");var cb=D.createElement("input");cb.type="checkbox";cb.checked=x.hide.pages.indexOf(p)>=0;
      cb.onchange=function(){var i=x.hide.pages.indexOf(p);if(cb.checked&&i<0)x.hide.pages.push(p);if(!cb.checked&&i>=0)x.hide.pages.splice(i,1);save();applyStyles();};row.appendChild(cb);row.appendChild(mk("span","t",(b.textContent||p).trim()));grid.appendChild(row);});pane.appendChild(grid);
    pane.appendChild(mk("p","ws-note","Cards hidden on a page (the cards that have a name of their own):"));
    var sel=D.createElement("select");pagesOf().forEach(function(p){var o=D.createElement("option");o.value=p;o.textContent=p.charAt(0).toUpperCase()+p.slice(1);sel.appendChild(o);});sel.value=UI.hidePage||"home";pane.appendChild(sel);
    var cg=mk("div","ws-items");pane.appendChild(cg);
    function cards(){cg.innerHTML="";UI.hidePage=sel.value;var pg=$("page-"+sel.value);if(!pg)return;[].forEach.call(pg.querySelectorAll(".card[id]"),function(c){var id=c.id;if(/^ws/.test(id))return;var h=c.querySelector("h2,h3"),row=mk("label","ws-item"),cb=D.createElement("input");cb.type="checkbox";cb.checked=x.hide.cards.indexOf(id)>=0;
      cb.onchange=function(){var i=x.hide.cards.indexOf(id);if(cb.checked&&i<0)x.hide.cards.push(id);if(!cb.checked&&i>=0)x.hide.cards.splice(i,1);save();applyStyles();};row.appendChild(cb);row.appendChild(mk("span","t",(h?h.textContent.trim():id)+" ("+id+")"));cg.appendChild(row);});
      if(!cg.children.length)cg.appendChild(mk("p","ws-note","This page has no named cards to hide. Open it once, then choose it here again."));}
    sel.onchange=cards;cards();}}

/* ================= 4b. the Guide ================= */
function guideCard(){var page=$("page-guide");if(!page||$("wsGuide"))return;var c=mk("div","card blx-guide");c.id="wsGuide";
  c.appendChild(mk("h3",null,"The Workshop"));var p0=mk("p","small muted","In your master edition only, after Settings: Ingenium's author's workshop.");p0.style.marginTop="0";c.appendChild(p0);
  var dl=mk("dl");[["Check Ingenium","Every part, every page, both stores, the room, the engine, your connections and connectors, the sign-in and the errors, each in plain words; Copy the report."],
    ["Errors since it started","Every error the page meets, with when and where; the last 50 kept across restarts."],
    ["Find and fix with a model","Ingenium's own page opens as an app in Code, with the report or one error in the message box: the model finds the cause and changes ingenium.html, the preview runs the changed Ingenium, and every change can be undone. The copy leaves out what the page carries at its end (the apps on the Desk, the engine, the kits), so it is lighter to read; it is put back whenever the page is used or downloaded."],
    ["Your page","On your computers, the page changed in Code (or a page file of your own) takes the place of the one Ingenium was built with, at once, with all your work as it is. A changed page that does not start is left: Ingenium goes back to the last page that worked on its own, and says so. Earlier versions can be used again or removed, and the built page is always one choice away (on a Mac, in the app menu too)."],
    ["Your layers","Pages of your own in the side bar (each in a frame of its own, apart from your data), sections added to any page, scripts that run in Ingenium as it starts (with all its power: keep only those you understand), styles that win over Ingenium's own, and pages or cards you hide. Nothing in the built page changes."],
    ["A safe start","Start without your layers, from the Workshop; and on its own, when the last start stopped while one of your scripts ran. Ingenium says which."]].forEach(function(r){dl.appendChild(mk("dt",null,r[0]));dl.appendChild(mk("dd",null,r[1]));});
  c.appendChild(dl);var at=$("envGuide")||$("ghxGuide")||$("cnGuide");if(at&&at.parentNode)at.parentNode.insertBefore(c,at.nextSibling);else page.appendChild(c);}

/* ================= 5. Folders: her rule for every app, added once, where she can change it ================= */
var RULE="- Scroll bars: hidden from view in every app, with scrolling kept (scrollbar-width: none; and ::-webkit-scrollbar { display: none; }), unless I say otherwise for one part.";
function addRule(){var s=W.state;if(!s||!Array.isArray(s.chats))return;s.ingRules=s.ingRules||{};if(s.ingRules.scroll)return;
  if(!s.folders||typeof s.folders!=="object")s.folders={how:"",ui:{}};var how=String(s.folders.how||"");
  if(!/scroll ?bars?/i.test(how))s.folders.how=(how.trim()?how.replace(/\s+$/,"")+"\n":"")+RULE;s.ingRules.scroll=Date.now();save();
  try{if($("page-folders")&&$("page-folders").classList.contains("active")&&W.IngFolders&&IngFolders.paint)IngFolders.paint();}catch(e){}}

/* ================= 6. start ================= */
function boot(){try{install();}catch(e){}try{applyAll();}catch(e){}}
try{applyStyles();}catch(e){}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function later(){var n=0;(function wait(){if(W.__ingReady===true){boot();setTimeout(function(){try{runScripts();}catch(e){}try{applyAll();}catch(e){}},800);return;}if(++n<400)setTimeout(wait,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r226)return;
  var ng=function(p){if(p==="workshop")install();var r=og.apply(this,arguments);try{if(p==="workshop"&&!CHECKING)paint();if(p==="guide")guideCard();if(p==="folders"||p==="code"||p==="chat")addRule();if(!SAFE&&L()&&L().sections.some(function(s){return s.page===p&&s.on!==false;})&&!D.querySelector('#page-'+p+' .ws-lyr-card'))applySections();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r226=true;W.go=go=ng;})();
W.IngWorkshop={run:run,report:report,errors:ERR,fix:fix,layers:L,apply:applyAll,runScripts:function(){ran=false;runScripts();},safe:function(){return SAFE;},safeStart:safeStart,paint:paint,rule:RULE,addRule:addRule,
  push:pushErr};
})();
;try{window.__ingParts["p226"]="running";}catch(_){}
</script>
