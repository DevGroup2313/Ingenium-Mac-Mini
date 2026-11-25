<style id="r381-css">
/* ============ R381 · TROUBLESHOOT IN THE FULL EDITION (Ingenium 7.83, 25 November 2026) ============
   Her words (24 November 2026): "I want the Full edition of Ingenium to have the Author Studio with limited access or functions that
   will only be reserved for the owner's master edition. I want the Full edition app to at least have the Troubleshoot page from the
   Author Studio". Before that (19 November 2026), the full edition "without my Author access and owner administrative functions", and
   (17 November 2026) her authorship "limited to my master edition only".
   So the full edition has Troubleshoot, the room she approved (modules/r329.js), as a room of Settings: Check everything with its gauge,
   each check unfolding to say why and what to do, what went wrong, and what happened in the person's own words, copied with the report
   to send to Ingenium's author. It has no Author Studio, no workshop (no layers, no scripts, no own page in Code), and no key that hands
   Ingenium's own page to a model (r329 leaves them out where ING_HAS("author") says no).
   This part gives r329 the error list and the check it reads, from r226's own code, copied as it stands less the line on her layers;
   the master edition leaves this part out (build/editions.py) and keeps r226. */
#tsHostFull{--ts-well:rgba(106,63,181,.035);--ts-line:var(--hairline,rgba(34,26,46,.1));--ts-ink1:var(--ink-1,#221a2e);--ts-ink2:var(--ink-2,#4a4358);--ts-ink3:var(--ink-3,#6c6579);--ts-acc:var(--accent,#6a3fb5);
  --ts-card:var(--card-hi,#fff);--ts-card-sh:0 1px 0 rgba(40,22,68,.06),0 2px 6px rgba(40,22,68,.05),0 12px 30px rgba(40,22,68,.07);--ts-card-hi:0 2px 0 rgba(40,22,68,.08),0 8px 16px rgba(40,22,68,.1),0 18px 38px rgba(40,22,68,.12);
  --ts-key:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f9f7fc));--ts-key-sh:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.1);
  --ts-key-hi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --ts-pri:linear-gradient(#7348be,#5d37a1);--ts-pri-line:#4b2a86;--ts-pri-sh:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26);
  --ts-ok-t:rgba(31,157,99,.14);--ts-ok-c:#1a7f50;--ts-look-t:rgba(232,144,42,.16);--ts-look-c:#b4600f;--ts-bad-t:rgba(196,60,72,.13);--ts-bad-c:#a8323e;--ts-lav-t:rgba(106,63,181,.12);
  --ts-rim:#d9d0e6;--ts-needle:#3a2a55;
  --ts-slot:rgba(60,40,90,.06);--ts-slot-sh:inset 0 1px 2px rgba(40,22,68,.18),inset 0 0 0 1px rgba(40,22,68,.05),0 1px 0 rgba(255,255,255,.85)}
body[data-theme="night"] #tsHostFull{--ts-well:rgba(183,156,230,.05);--ts-line:rgba(205,184,240,.12);--ts-ink1:#f6f1fd;--ts-ink2:#d3c9e3;--ts-ink3:#a99cc1;--ts-acc:#b79ce6;--ts-card:#201a2b;
  --ts-card-sh:0 1px 0 rgba(0,0,0,.4),0 2px 6px rgba(0,0,0,.3),0 12px 30px rgba(0,0,0,.34);--ts-card-hi:0 2px 0 rgba(0,0,0,.45),0 10px 20px rgba(0,0,0,.42),0 20px 40px rgba(0,0,0,.4);
  --ts-key:linear-gradient(#2a2239,#251e33);--ts-key-sh:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5);
  --ts-key-hi:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -2px 0 rgba(0,0,0,.4),0 3px 0 rgba(0,0,0,.7),0 7px 10px rgba(0,0,0,.5);
  --ts-pri:linear-gradient(#7a56c8,#5b3aa1);--ts-pri-line:#2c1956;--ts-pri-sh:inset 0 1px 0 rgba(255,255,255,.14),0 1px 0 #170b30,0 3px 6px rgba(0,0,0,.45);
  --ts-ok-t:rgba(64,192,128,.15);--ts-ok-c:#6fd8a2;--ts-look-t:rgba(240,176,96,.15);--ts-look-c:#f0b060;--ts-bad-t:rgba(230,110,120,.15);--ts-bad-c:#f0939c;--ts-lav-t:rgba(183,156,230,.15);
  --ts-rim:#3a3050;--ts-needle:#e9e0f7;--ts-slot:rgba(0,0,0,.28);--ts-slot-sh:inset 0 2px 3px rgba(0,0,0,.55),inset 0 0 0 1px rgba(0,0,0,.25),0 1px 0 rgba(255,255,255,.05)}
#tsHostFull{border-radius:18px}
#tsHostFull>.ts-head{margin:0 0 10px}
#tsHostFull>.ts-head h2{margin:0 0 2px}
</style>
<script>
(function(){"use strict";var W=window,D=document;
try{if(typeof ING_EDITION==="undefined"||ING_EDITION!=="full")return;}catch(e){return;}
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function when(t){try{return new Date(t).toLocaleString();}catch(e){return String(t);}}
var paintT=0;function paintErrsSoon(){clearTimeout(paintT);paintT=setTimeout(function(){try{if($("tsRoom")&&W.IngTrouble)IngTrouble.paint();}catch(e){}},400);}

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
  var cur=null,room=null;try{var a=D.querySelector(".section.active");cur=a?a.id.replace(/^page-/,""):"settings";if(cur==="settings"&&W.IngRooms)room=IngRooms.current("settings");}catch(e){}
  var failed=[],opened=toOpen();CHECKING=true;opened.forEach(function(p){try{W.go(p);}catch(e){failed.push(p+" ("+(e&&e.message||e)+")");}});try{W.go(cur||"settings");if(room&&W.IngRooms)IngRooms.open("settings",room,false);}catch(e){}CHECKING=false;
  return new Promise(function(res){setTimeout(res,300);}).then(function(){var during=ERR.slice(e0);
    out.push(failed.length?line("bad","<b>Pages</b>: "+failed.length+" did not open: "+failed.join("; ")+"."):line(during.length?"warn":"ok","<b>Pages</b>: "+opened.length+" opened"+(during.length?", with "+during.length+" error"+(during.length===1?"":"s")+" meanwhile (listed below).":".")+" The apps on the Desk are pages of their own, and are not opened."));
    var id="wscheck"+Date.now().toString(36),txt="Ingenium check "+Date.now();
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
    var now=ERR.filter(function(e){return !e.before;});
    out.push(line(now.length?"warn":"ok","<b>Errors since it started</b>: "+(now.length?now.length+" (listed below)":"none")+"."));
    var v="";try{v=ING_VERSION+(typeof ING_PAGE_DATE!=="undefined"?" ("+ING_PAGE_DATE+")":"")+", the "+ING_EDITION+" edition";}catch(e){}
    out.push(line("ok","<b>Version</b>: Ingenium "+v+". "+(navigator.userAgent||"").replace(/[<>]/g,"").slice(0,160)));
    LAST={at:Date.now(),lines:out};return out;});}
var LAST=null;
function plainOf(lines){return lines.map(function(l){return (l.st==="ok"?"[ok] ":l.st==="warn"?"[look] ":"[wrong] ")+l.t.replace(/<[^>]+>/g,"");}).join("\n");}
function report(){var r="Ingenium's own check, "+when((LAST&&LAST.at)||Date.now())+":\n"+(LAST?plainOf(LAST.lines):"(not run yet)");
  var now=ERR.filter(function(e){return !e.before;}).slice(-12);if(now.length)r+="\n\nErrors since it started:\n"+now.map(function(e){return "- "+when(e.at)+" ["+e.kind+"] "+e.msg+(e.where?" ("+e.where+")":"")+(e.n>1?" (x"+e.n+")":"");}).join("\n");return r;}
W.IngChecks={run:run,report:report,errors:ERR};

/* ================= the room in Settings ================= */
function host(){var st=$("page-settings");if(!st)return null;var h=$("tsHostFull");
  if(!h){h=mk("div","card");h.id="tsHostFull";var hd=mk("div","ts-head");hd.appendChild(mk("h2","sec","Troubleshoot"));
    hd.appendChild(mk("p","small muted","Find what is wrong and see why. Every check runs on this device; nothing leaves it unless you copy the report and send it."));
    h.appendChild(hd);h.appendChild(mk("div","ts-body"));st.appendChild(h);}
  return h;}
function paint(){var h=host();if(!h||!W.IngTrouble||CHECKING)return;var b=h.querySelector(".ts-body");if(!b.querySelector("#tsRoom"))IngTrouble.paint(b);}
function hookTab(){var t=$("rmT-settings-trouble");if(t&&!t.__ts){t.__ts=1;t.addEventListener("click",function(){setTimeout(paint,0);});}}
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r381)return;
  var ng=function(p){var r=og.apply(this,arguments);try{if(p==="settings"&&!CHECKING){host();hookTab();paint();}}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r381=true;W.go=go=ng;})();
function boot(){try{host();hookTab();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function later(){var n=0;(function wait(){boot();if(W.__ingReady===true)return;if(++n<400)setTimeout(wait,500);})();})();
try{window.__ingParts["p381"]="running";}catch(_){}
})();
</script>
