<style id="r202-css">
/* ============ R202 · FOLDERS FOR THE CHAT (Ingenium 6.9.2, 1 November 2026) ============ */
#ragCard [hidden]{display:none !important}
#ragCard .rag-lede{margin:4px 0 0}
#ragCard .rag-list{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:10px}
#ragCard .rag-none{margin:14px 0 0;padding:12px 14px;border:1px dashed var(--hairline);border-radius:12px;color:var(--ink-3);font-size:13px}
#ragCard .rag-item{border:1px solid var(--hairline);border-radius:12px;padding:12px 14px;background:var(--bg);display:grid;gap:3px}
#ragCard .rag-name{font:600 14.5px/1.4 var(--sans);color:var(--ink-1);overflow-wrap:anywhere}
#ragCard .rag-path{font:12px/1.45 var(--mono);color:var(--ink-3);overflow-wrap:anywhere}
#ragCard .rag-facts{font-size:12.5px;line-height:1.5;color:var(--ink-2)}
#ragCard .rag-warn{font-size:12.5px;line-height:1.5;color:#b4483c;white-space:pre-line;overflow-wrap:anywhere}
body[data-theme="night"] #ragCard .rag-warn{color:#f0a097}
#ragCard .rag-notes{font-size:12.5px;line-height:1.5;color:var(--ink-3);white-space:pre-line;overflow-wrap:anywhere}
#ragCard .rag-prog{margin-top:6px}
#ragCard .rag-bar{height:6px;border-radius:3px;background:rgba(var(--fam-rgb),.16);overflow:hidden}
#ragCard .rag-bar > i{display:block;height:100%;width:0;border-radius:3px;background:var(--accent);transition:width .5s ease}
#ragCard .rag-say{margin:6px 0 0;font-size:12.5px;line-height:1.5;color:var(--ink-2);overflow-wrap:anywhere}
#ragCard .rag-acts{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;align-items:center}
#ragCard .rag-ask{margin-top:8px;padding:10px 12px;border-radius:10px;border:1px solid var(--hairline);display:grid;gap:8px;font-size:12.5px;line-height:1.5;color:var(--ink-1)}
#ragCard .rag-note{margin:10px 0 0;min-height:1.5em;color:var(--ink-2)}
#ragCard .rag-note.rag-bad,#ragCard .rag-problem{color:#b4483c}
body[data-theme="night"] #ragCard .rag-note.rag-bad,body[data-theme="night"] #ragCard .rag-problem{color:#f0a097}
#ragCard .rag-problem{margin:10px 0 0}
#ragCard [aria-disabled="true"]{opacity:.55;cursor:default;pointer-events:none}
@media (prefers-reduced-motion:reduce){#ragCard .rag-bar > i{transition:none}}
body[data-motion="minimal"] #ragCard .rag-bar > i{transition:none}
/* 6.59, phase 4: how often the folders are looked at again */
#ragCard .rag-sched{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:12px 0 0}
#ragCard .rag-next{margin:4px 0 0;overflow-wrap:anywhere}
#ragCard .rag-rr{display:flex;gap:8px;align-items:flex-start;margin:10px 0 0;font-size:12.5px;line-height:1.5;color:var(--ink-2)}
#ragCard .rag-rr input{margin-top:3px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p202"]="started";}catch(_){}
/* ============ R202 · FOLDERS FOR THE CHAT (Ingenium 6.9.2, 1 November 2026) ============
   The owner's words (31 October 2026): "Use the app's own folder dialog, and let the app read the folder's files when asked.
   Folders persist and the scheduler works." and "Only apply this to the Desktop versions not for IOS and APK".
   This module is the page's side of the folder search (rag/, shipped as files beside the page in the Mac and Windows apps):
   1. THE LOADER. Inside the desktop app only, that is when the app's folder bridge (window.pywebview.api.rag_list) is there, it
      imports ./rag/main.js, relative to the page, which makes window.IngRag. In a browser, on the Fire tablet and on the iPhone there
      is no bridge: nothing is imported, nothing is fetched, no card is made. A window the app opens for one of its apps
      (ingenium_window.html) does not load it either, so only the main window ever holds the index.
   2. THE CARD "Folders for the chat" in Settings (named in r173.js, room Models and AI): Add a folder..., each folder with its name,
      path, files, passages and when it was last read, Read it again now with a progress line (and Stop), Remove (with a question
      first). The store is opened the first time the card is seen, not when the app starts. Plain words, real buttons, a status line
      that is read out politely. The folders are read on this computer only; the chat uses them through modules/r257.js (6.59, phase 3:
      Your folders in the chat's + menu, each reply only from these folders, with its sources).
   3. THE SCHEDULER (6.59, phase 4). Her task: "Use setInterval in a Worker. Default interval 20 minutes, configurable. It runs only
      while the app is open." The card's "Look for changes and read them by itself" (never, 10, 20, 30 minutes or an hour; state.rag.every,
      kept per device) sets IngRag.schedule; the first look comes two minutes after the app opens, so what changed while it was closed is
      found soon. A look lists each folder and compares sizes and times with the index: only a folder where something changed is read
      (rag/main.js reconcile). The card says when the next look comes and what the last one found. */
(function(){"use strict";
if(window.__r202)return;window.__r202=1;
var W=window,D=document,R=null,card=null,ui={},rows={},booted=false,shown=false,busy=false,again=false,lastPaint=0,paintT=0,lastRefresh=0,refreshT=0,seenDone={};

function $(id){return D.getElementById(id);}
function el(tag,cls,text){var n=D.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;}
function num(n){try{return Number(n).toLocaleString();}catch(e){return String(n);}}
function plural(n,one,many){return num(n)+" "+(n===1?one:(many||one+"s"));}
function pad(n){return n<10?"0"+n:""+n;}
function clock(d){try{return d.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});}catch(e){return pad(d.getHours())+":"+pad(d.getMinutes());}}
function when(ts){
  if(!ts)return "";var d=new Date(ts),n=new Date(),diff=n.getTime()-d.getTime();
  if(diff<45000)return "just now";
  if(diff<3600000){var m=Math.max(1,Math.round(diff/60000));return m+(m===1?" minute":" minutes")+" ago";}
  var y=new Date(n.getTime()-86400000);
  function same(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}
  if(same(d,n))return "today at "+clock(d);
  if(same(d,y))return "yesterday at "+clock(d);
  try{return d.toLocaleDateString([],{day:"numeric",month:"long",year:"numeric"});}catch(e){return d.toDateString();}
}
function span(ms){
  var s=Math.round(ms/1000);if(s<2)return "a moment";if(s<90)return s+" seconds";
  var m=Math.round(s/60);if(m<90)return m+" minutes";
  var h=Math.floor(m/60),r=m%60;return h+(h===1?" hour":" hours")+(r?" "+r+(r===1?" minute":" minutes"):"");
}
function left(sec){
  if(sec<90)return "about a minute left";var m=Math.round(sec/60);if(m<90)return "about "+m+" minutes left";
  var h=Math.round(sec/360)/10;return "about "+h+" hours left";
}
function mb(bytes){var m=bytes/1048576;return m>=10?Math.round(m)+" MB":(Math.round(m*10)/10)+" MB";}

/* ---------------------------------------------------------------- the loader */
function bridgeThere(){try{var a=W.pywebview&&W.pywebview.api;return !!(a&&typeof a.rag_list==="function");}catch(e){return false;}}
function ownWindow(){try{return /\/ingenium_window\.html$/.test(W.location.pathname);}catch(e){return false;}}
function after(fn){if(D.readyState==="complete")setTimeout(fn,300);else W.addEventListener("load",function(){setTimeout(fn,300);});}
function boot(){
  if(booted||ownWindow()||!bridgeThere())return;booted=true;
  var url;try{url=new URL("rag/main.js",D.baseURI||W.location.href).href;}catch(e){booted=false;return;}
  import(url).then(function(m){
    R=W.IngRag||(m&&m.default);
    if(!R||typeof R.available!=="function"||!R.available())return;
    start();
  }).catch(function(e){try{console.warn("Ingenium folders:",e&&e.message||e);}catch(_){}});
}
function arm(){
  if(bridgeThere()){after(boot);return;}
  W.addEventListener("pywebviewready",function(){after(boot);});
  W.addEventListener("load",function(){setTimeout(function(){if(bridgeThere())after(boot);},1500);});
}

/* ---------------------------------------------------------------- the card */
function build(){
  var c=el("div","card");c.id="ragCard";c.setAttribute("role","region");c.setAttribute("aria-labelledby","ragH");
  var h=el("h2","sec","Folders for the chat");h.id="ragH";c.appendChild(h);
  c.appendChild(el("p","small muted rag-lede","Choose folders with your own papers in them. Ingenium reads their text, Markdown, web page, JSON, CSV, PDF and Word files and remembers what is in them, so that the chat can look things up there."));
  ui.none=el("p","rag-none","Looking for your folders…");c.appendChild(ui.none);
  ui.list=el("ul","rag-list");ui.list.setAttribute("aria-label","Folders chosen for the chat");c.appendChild(ui.list);
  var acts=el("div","rag-acts");
  ui.add=el("button","btn","Add a folder…");ui.add.type="button";ui.add.id="ragAdd";acts.appendChild(ui.add);
  ui.retry=el("button","btn","Try again");ui.retry.type="button";ui.retry.id="ragRetry";ui.retry.hidden=true;acts.appendChild(ui.retry);
  ui.rebuild=el("button","btn","Start the folder search again");ui.rebuild.type="button";ui.rebuild.id="ragRebuild";ui.rebuild.hidden=true;acts.appendChild(ui.rebuild);
  c.appendChild(acts);
  /* 6.59, phase 4: her task's scheduler, every 20 minutes unless she chooses otherwise, only while Ingenium is open */
  ui.sched=el("div","rag-sched");var sl=el("label","small","Look for changes and read them by itself:");sl.htmlFor="ragEvery";
  ui.every=el("select");ui.every.id="ragEvery";
  [[0,"Never (only when I press Read)"],[10,"Every 10 minutes"],[20,"Every 20 minutes"],[30,"Every 30 minutes"],[60,"Every hour"]].forEach(function(o){var op=el("option",null,o[1]);op.value=String(o[0]);ui.every.appendChild(op);});
  ui.every.value=String(everyMin());if(!ui.every.value)ui.every.value="20";
  ui.sched.appendChild(sl);ui.sched.appendChild(ui.every);c.appendChild(ui.sched);
  ui.next=el("p","small muted rag-next");ui.next.id="ragNext";c.appendChild(ui.next);
  /* 6.62, phase 5, her task: "Reranker. Optional, off by default, loaded on demand" */
  var rrw=el("label","rag-rr");var rri=el("input");rri.type="checkbox";rri.id="ragRerank";try{rri.checked=!!(state.rag&&state.rag.rerank);}catch(e){}
  rrw.appendChild(rri);rrw.appendChild(el("span",null,"Reorder what is found with a second reading model: it reads your question and each passage together. Slower; it loads only when you switch it on."));c.appendChild(rrw);
  rri.onchange=function(){try{if(!state.rag||typeof state.rag!=="object")state.rag={};state.rag.rerank=rri.checked;saveState();}catch(e){}setNote(rri.checked?"The chat's answers now reorder the passages found before choosing five.":"The chat's answers use the search's own order.");};
  ui.every.onchange=function(){var v=+ui.every.value;try{if(!state.rag||typeof state.rag!=="object")state.rag={};state.rag.every=v;saveState();}catch(e){}schedNow(false);};
  ui.problem=el("p","small rag-problem");ui.problem.id="ragProblem";ui.problem.setAttribute("role","status");ui.problem.hidden=true;c.appendChild(ui.problem);
  ui.note=el("p","small rag-note");ui.note.id="ragNote";ui.note.setAttribute("role","status");ui.note.setAttribute("aria-live","polite");c.appendChild(ui.note);
  ui.room=el("p","small muted rag-room");ui.room.id="ragRoom";ui.room.hidden=true;c.appendChild(ui.room);
  c.appendChild(el("p","small muted rag-foot","These folders are read on this computer only. In the chat, switch on Your folders in the + menu: each reply then comes only from these folders, with its sources. The passages found go to the model you chat with, and only to it."));
  ui.add.onclick=addClick;
  ui.retry.onclick=function(){setNote("");refresh(true);};
  ui.rebuild.onclick=rebuildClick;
  return c;
}
/* ---------------------------------------------------------------- the scheduler (phase 4) */
function everyMin(){try{var v=state.rag&&state.rag.every;return (v===0||v>0)?+v:20;}catch(e){return 20;}}
function schedNow(atStart){if(!R||typeof R.schedule!=="function")return;var m=everyMin();
  /* when the app opens, a first look after two minutes finds what changed while it was closed */
  R.schedule(m,atStart&&m>0?{firstMs:120000}:{}).then(paintNext,function(e){try{console.warn("Ingenium folders: the clock",e&&e.message||e);}catch(_){}});}
function soon(ts){var d=ts-Date.now();if(d<60000)return "in a moment";var m=Math.round(d/60000);return "in about "+m+(m===1?" minute":" minutes");}
function lastSay(L){var bad=(L.errors||[]).length,t;
  if(!L.read)t=L.folders?"nothing had changed":"no folder to look at";
  else{var p=[];if(L.changed)p.push(plural(L.changed,"file")+" new or changed");if(L.gone)p.push(plural(L.gone,"file")+" gone");t=p.join(", ")+", read again";}
  if(bad)t+="; "+plural(bad,"folder")+" could not be looked at";
  return t;}
function paintNext(){if(!ui.next||!R||typeof R.scheduleState!=="function")return;var st=R.scheduleState(),p=[];
  if(st.running)p.push("Looking for changes now…");
  else if(st.minutes>0&&st.next)p.push("Next look "+soon(st.next)+".");
  else if(!st.minutes)p.push("Your folders are read only when you press Read it now.");
  if(st.last)p.push("Last look "+when(st.last.at)+": "+lastSay(st.last)+".");
  var t=p.join(" ");if(ui.next.textContent!==t)ui.next.textContent=t;}
function setNote(text,bad){ui.note.textContent=text||"";ui.note.className="small rag-note"+(bad?" rag-bad":"");}

function makeRow(f){
  var r={id:f.id,name:f.name,sayAt:0,el:el("li","rag-item")};
  r.el.setAttribute("data-id",f.id);
  r.nm=el("b","rag-name");r.pa=el("div","rag-path");r.fa=el("div","rag-facts");r.wr=el("div","rag-warn");r.wr.hidden=true;r.nt=el("div","rag-notes");r.nt.hidden=true;
  r.prog=el("div","rag-prog");r.prog.hidden=true;
  r.bar=el("div","rag-bar");r.bar.setAttribute("role","progressbar");r.bar.setAttribute("aria-valuemin","0");r.bar.setAttribute("aria-valuemax","100");r.bar.hidden=true;r.fill=el("i");r.bar.appendChild(r.fill);
  r.say=el("p","rag-say");r.say.setAttribute("role","status");r.say.setAttribute("aria-live","polite");
  r.prog.appendChild(r.bar);r.prog.appendChild(r.say);
  r.acts=el("div","rag-acts");
  r.read=el("button","btn small rag-read","Read it now");r.read.type="button";
  r.stop=el("button","btn small rag-stop","Stop");r.stop.type="button";r.stop.hidden=true;
  r.del=el("button","btn small rag-del","Remove");r.del.type="button";r.del.setAttribute("aria-expanded","false");
  r.acts.appendChild(r.read);r.acts.appendChild(r.stop);r.acts.appendChild(r.del);
  r.ask=el("div","rag-ask");r.ask.hidden=true;r.ask.setAttribute("role","group");
  r.askText=el("span");r.ask.appendChild(r.askText);
  r.empty=el("div","rag-ask rag-empty");r.empty.hidden=true;r.empty.setAttribute("role","group");
  r.emptyText=el("span");r.empty.appendChild(r.emptyText);
  var ec=el("div","rag-acts");ec.style.marginTop="0";
  r.emptyYes=el("button","btn small","Yes, take them out");r.emptyYes.type="button";r.emptyNo=el("button","btn small","No, keep them");r.emptyNo.type="button";
  ec.appendChild(r.emptyYes);ec.appendChild(r.emptyNo);r.empty.appendChild(ec);
  var ac=el("div","rag-acts");ac.style.marginTop="0";
  r.yes=el("button","btn small","Remove it");r.yes.type="button";r.no=el("button","btn small","Keep it");r.no.type="button";
  ac.appendChild(r.yes);ac.appendChild(r.no);r.ask.appendChild(ac);
  [r.nm,r.pa,r.fa,r.wr,r.nt,r.prog,r.acts,r.ask,r.empty].forEach(function(n){r.el.appendChild(n);});
  r.emptyNo.onclick=function(){r.emptyAt=r.emptyFor;r.empty.hidden=true;r.read.focus();};
  r.emptyYes.onclick=function(){
    r.emptyAt=r.emptyFor;r.empty.hidden=true;setNote("");
    R.indexFolder(r.id,{confirmEmpty:true}).then(function(){},function(e){setNote(e&&e.plain||e&&e.message||"The folder could not be read.",true);});
  };
  r.read.onclick=function(){readClick(r);};
  r.stop.onclick=function(){R.stopReading(r.id);r.stop.setAttribute("aria-disabled","true");setNote("Stopping after the file in hand…");};
  r.del.onclick=function(){r.ask.hidden=false;r.del.setAttribute("aria-expanded","true");r.no.focus();};
  r.no.onclick=function(){r.ask.hidden=true;r.del.setAttribute("aria-expanded","false");r.del.focus();};
  r.yes.onclick=function(){removeClick(r);};
  r.ask.onkeydown=function(e){if(e.key==="Escape"){e.preventDefault();r.no.onclick();}};
  return r;
}

function failLines(s){
  var out=[];
  if(!s)return out;
  (s.failures||[]).slice(0,5).forEach(function(x){out.push(x.path+": "+x.error);});
  if((s.failures||[]).length>5)out.push("and "+plural(s.failures.length-5,"more file")+" that could not be read");
  return out;
}
function plainWarning(t){
  if(/not valid UTF-8/i.test(t))return "it is saved in an older style of text, so Ingenium read it as Windows text";
  if(/not valid JSON/i.test(t))return "it is not valid JSON, so it was read as plain text";
  if(/^no text on/i.test(t))return "some of its pages have no text (they may be scanned pictures), and those pages were not read";
  if(/^empty file/i.test(t))return "it is empty";
  if(/^no text found/i.test(t))return "no text was found in it";
  return t;
}
function noteLines(s){
  var out=[];
  if(!s)return out;
  (s.warnings||[]).slice(0,4).forEach(function(w){var i=w.indexOf(": ");out.push(i>0?"Note on "+w.slice(0,i)+": "+plainWarning(w.slice(i+2))+".":"Note: "+plainWarning(w)+".");});
  if((s.warnings||[]).length>4)out.push("and "+plural(s.warnings.length-4,"more note")+".");
  (s.notes||[]).forEach(function(n){out.push("Note: "+n);});
  return out;
}
function detail(p){
  switch(p.stage){
    case "reading":return "opening it";
    case "pdf":return p.stageOf?"page "+num(p.stageDone)+" of "+num(p.stageOf):"reading its pages";
    case "units":case "counting":case "splitting":case "packing":case "checking":return "cutting it into passages";
    case "embedding":return p.stageOf?"making passages: "+num(p.stageDone)+" of "+num(p.stageOf):"making passages";
    case "writing":return "saving it";
    default:return "";
  }
}
function jobLine(job){
  var p=job.progress;
  if(job.status==="waiting")return "Waiting for the other folder to finish.";
  if(job.status==="starting")return "Getting ready to read (the first time this takes a few seconds)…";
  if(!p.total&&p.phase!=="done")return "Looking at the folder…";
  var s=p.path?"Reading file "+num(Math.min(Math.max(p.index,1),p.total))+" of "+num(p.total)+": "+p.path:"Checking "+plural(p.total,"file")+"…";
  var d=p.path?detail(p):"";if(d)s+=" ("+d+")";
  if(p.passages&&p.stage!=="embedding")s+=" · "+plural(p.passages,"passage")+" made so far";
  if(p.etaSeconds)s+=" · "+left(p.etaSeconds);
  return s;
}
function jobFraction(job){
  var p=job.progress;if(!p.total)return 0;
  var inner=p.stage==="embedding"&&p.stageOf?Math.min(1,p.stageDone/p.stageOf):0;
  return Math.max(0,Math.min(1,(p.finished+p.skipped+p.failed+(p.path&&p.stage?inner:0))/p.total));
}
function lastLine(f){
  var l=f.last;if(!l||!l.summary)return "";var s=l.summary,fl=s.files||{};
  if(s.stopped)return "Stopped. "+plural(fl.indexed||0,"file")+" read before it stopped.";
  if(!fl.indexed&&!fl.failed&&!fl.deleted)return "Nothing had changed: "+plural(fl.total||0,"file")+" checked, none read again.";
  var t="Finished: "+plural(fl.indexed||0,"file")+" read, "+plural(s.chunks||0,"passage")+" made, in "+span(s.ms||0)+".";
  if(fl.failed)t+=" "+plural(fl.failed,"file")+" could not be read.";
  if(fl.deleted)t+=" "+plural(fl.deleted,"file")+" no longer in the folder "+(fl.deleted===1?"was":"were")+" taken out.";
  return t;
}

function paint(r,f){
  r.name=f.name;r.nm.textContent=f.name;r.pa.textContent=f.path;
  var bits=[];
  if(!f.files&&!f.lastReadAt)bits.push("Not read yet");
  else{bits.push(plural(f.files,"file"));bits.push(plural(f.passages,"passage"));bits.push(f.lastReadAt?"Last read "+when(f.lastReadAt):"Not read to the end");}
  r.fa.textContent=bits.join(" · ");
  r.fa.setAttribute("data-files",f.files);r.fa.setAttribute("data-passages",f.passages);
  var warn=[];
  if(f.available===false)warn.push("This folder cannot be found now. If it is on a drive, connect the drive.");
  if(f.last&&f.last.error)warn.push(f.last.error);
  if(!f.job)failLines(f.last&&f.last.summary).forEach(function(x){warn.push(x);});
  r.wr.textContent=warn.join("\n");r.wr.hidden=!warn.length;
  var nts=f.job?[]:noteLines(f.last&&f.last.summary);r.nt.textContent=nts.join("\n");r.nt.hidden=!nts.length;
  var label=(f.lastReadAt||f.files)?"Read it again now":"Read it now";
  r.read.textContent=label;r.read.setAttribute("aria-label",label+": "+f.name);
  r.del.setAttribute("aria-label","Remove: "+f.name);
  r.stop.setAttribute("aria-label","Stop reading: "+f.name);
  r.askText.textContent="Remove “"+f.name+"” from the folder search? Its files stay where they are; only what Ingenium remembered about them goes.";
  // a reading found the folder empty while some of its files are still in the search: she says whether she emptied it
  var s=f.last&&f.last.summary,emptyN=!f.job&&s&&s.emptyNow?s.emptyNow:0;
  r.emptyFor=emptyN?(f.last.at||1):0;
  if(emptyN&&r.emptyAt!==r.emptyFor){
    r.emptyText.textContent="“"+f.name+"” looks empty now, but "+plural(emptyN,"file")+" from it "+(emptyN===1?"is":"are")+" still in the folder search. Did you empty the folder on purpose? (If it is on a drive that is not connected, choose No.)";
    r.empty.hidden=false;
  }else r.empty.hidden=true;
  paintJob(r,f,true);
}
function paintJob(r,f,force){
  var job=f.job,now=Date.now();
  if(job){
    r.prog.hidden=false;r.bar.hidden=false;
    r.read.setAttribute("aria-disabled","true");
    var was=r.stop.hidden;r.stop.hidden=false;if(was)r.stop.removeAttribute("aria-disabled");
    var pc=Math.round(jobFraction(job)*100);r.fill.style.width=pc+"%";r.bar.setAttribute("aria-valuenow",pc);
    r.bar.setAttribute("aria-label","Reading "+f.name);
    var line=jobLine(job);if(line!==r.sayText){r.say.textContent=line;r.sayText=line;r.sayAt=now;}
  }else{
    r.bar.hidden=true;r.stop.hidden=true;r.read.removeAttribute("aria-disabled");
    var t=lastLine(f);r.prog.hidden=!t;if(t!==r.sayText||force){r.say.textContent=t;r.sayText=t;}
  }
}

var cache=[];
function sync(list){
  cache=list;var ids={};
  list.forEach(function(f){ids[f.id]=1;});
  Object.keys(rows).forEach(function(id){if(!ids[id]){var r=rows[id];if(r.el.parentNode)r.el.parentNode.removeChild(r.el);delete rows[id];}});
  list.forEach(function(f){var r=rows[f.id];if(!r){r=rows[f.id]=makeRow(f);ui.list.appendChild(r.el);}paint(r,f);});
  ui.none.textContent="No folder yet. Press “Add a folder…” to choose one.";ui.none.hidden=list.length>0;
}
function paintStatus(){
  var s=R.state(),bad=s.status==="locked"||s.status==="unavailable"||s.status==="failed"||s.status==="damaged";
  ui.problem.hidden=!bad;ui.problem.textContent=bad&&s.problem?s.problem.plain:"";
  ui.retry.hidden=!(s.status==="locked"||s.status==="failed");
  ui.rebuild.hidden=s.status!=="damaged";
  if(s.status==="unavailable"||s.status==="damaged")ui.add.setAttribute("aria-disabled","true");else if(!busy)ui.add.removeAttribute("aria-disabled");
}
function rebuildClick(){
  if(ui.rebuild.getAttribute("aria-disabled")==="true")return;
  ui.rebuild.setAttribute("aria-disabled","true");setNote("Starting the folder search again…");
  R.rebuild().then(function(r){
    setNote("The folder search starts again from nothing. "+(r&&r.folders?"Your "+plural(r.folders,"folder")+" "+(r.folders===1?"is":"are")+" back: press “Read it now” to read "+(r.folders===1?"it":"them")+" again.":"Add your folders again."));
    return refresh(true);
  },function(e){setNote(e&&e.plain||e&&e.message||"The folder search could not start again.",true);})
  .then(function(){ui.rebuild.removeAttribute("aria-disabled");paintStatus();});
}
function refresh(now){
  var t=Date.now();
  if(!now&&t-lastRefresh<1500){if(!refreshT)refreshT=setTimeout(function(){refreshT=0;refresh(true);},1500-(t-lastRefresh));return Promise.resolve();}
  if(refreshing){again=true;return refreshing;}
  lastRefresh=t;
  refreshing=Promise.all([R.folders(),R.stats().catch(function(){return null;})]).then(function(a){
    sync(a[0]);
    var st=a[1];ui.room.hidden=!(st&&st.bytes);if(st&&st.bytes)ui.room.textContent="The folder search takes about "+mb(st.bytes)+" on this computer.";
    ui.problem.hidden=true;ui.retry.hidden=true;paintStatus();
  },function(e){paintStatus();var s=R.state();if(s.status!=="locked"&&s.status!=="unavailable"&&s.status!=="failed"&&s.status!=="damaged"){ui.problem.hidden=false;ui.problem.textContent=e&&e.plain||e&&e.message||"The folders could not be listed.";}})
  .then(function(){refreshing=null;if(again){again=false;refresh(true);}});
  return refreshing;
}
var refreshing=null;

function addClick(){
  if(busy)return;busy=true;ui.add.setAttribute("aria-disabled","true");setNote("");
  R.addFolder().then(function(r){
    if(r.cancelled){ui.add.focus();return;}
    var nm=r.folder?r.folder.name:"the folder";
    setNote(r.again?"“"+nm+"” was already here.":"Added “"+nm+"”. Press “Read it now” to read its files.");
    return refresh(true).then(function(){var row=r.folder&&rows[r.folder.id];if(row)row.read.focus();});
  },function(e){setNote(e&&e.plain||e&&e.message||"The folder could not be added.",true);paintStatus();})
  .then(function(){busy=false;if(R.state().status!=="unavailable")ui.add.removeAttribute("aria-disabled");});
}
function readClick(r){
  if(r.read.getAttribute("aria-disabled")==="true")return;
  setNote("");
  R.indexFolder(r.id).then(function(){},function(e){setNote(e&&e.plain||e&&e.message||"The folder could not be read.",true);});
  var f=cache.filter(function(x){return x.id===r.id;})[0];
  if(f){f=Object.assign({},f,{job:R.running().filter(function(j){return j.folderId===r.id;}).map(function(j){return {status:j.status,progress:j.progress};})[0]||null});paintJob(r,f);}
  if(!r.stop.hidden)r.stop.focus();
}
function removeClick(r){
  if(r.yes.getAttribute("aria-disabled")==="true")return;
  r.yes.setAttribute("aria-disabled","true");var nm=r.name;setNote("Removing “"+nm+"”…");
  R.removeFolder(r.id).then(function(res){
    var t="Removed “"+nm+"” from the folder search. Its files were not touched.";
    if(res&&res.compacted&&res.compacted.before>res.compacted.after)t+=" Ingenium gave back "+mb(res.compacted.before-res.compacted.after)+" of room.";
    if(res&&res.forgot==="error")t+=" The app’s own list of folders could not be updated; this does no harm.";
    setNote(t);
    return refresh(true).then(function(){ui.add.focus();});
  },function(e){r.yes.removeAttribute("aria-disabled");r.ask.hidden=true;setNote(e&&e.plain||e&&e.message||"The folder could not be removed.",true);});
}

function paintJobs(ids){
  R.running().forEach(function(j){
    var r=rows[j.folderId];if(!r)return;
    var f=cache.filter(function(x){return x.id===j.folderId;})[0];if(!f)return;
    paintJob(r,Object.assign({},f,{job:{status:j.status,progress:j.progress}}));
  });
}
function onEvent(ev){
  if(!card)return;
  if(ev.type==="progress"){
    var n=Date.now();
    if(ev.progress.finished!==seenDone[ev.folderId]){seenDone[ev.folderId]=ev.progress.finished;if(shown)refresh();}
    if(n-lastPaint>=1000){lastPaint=n;paintJobs();}else if(!paintT){paintT=setTimeout(function(){paintT=0;lastPaint=Date.now();paintJobs();},1000-(n-lastPaint));}
  }else if(ev.type==="queued"||ev.type==="start"){paintJobs();}
  else if(ev.type==="scheduled"){paintNext();}
  else if(ev.type==="done"){delete seenDone[ev.folderId];if(/^Stopping/.test(ui.note.textContent))setNote("");if(shown)refresh(true).then(function(){var r=rows[ev.folderId];if(r&&D.activeElement===r.stop||(r&&D.activeElement===D.body))r.read.focus();});}
  else if(ev.type==="folders"){if(shown)refresh();}
  else if(ev.type==="status"){paintStatus();}
}

function place(){
  var pg=$("page-settings");if(!pg)return false;
  if(!card)card=build();
  if(card.parentNode)return true;
  var at=$("ingEyesCard")||$("linkCard")||$("personaCard");
  if(at&&at.parentNode)at.parentNode.insertBefore(card,at.nextSibling);else pg.appendChild(card);
  return true;
}
function seen(){
  if(shown)return;shown=true;refresh(true);
}
var started=false;
function start(){
  if(started)return;
  if(!place()){D.addEventListener("DOMContentLoaded",start);return;}
  started=true;
  R.on(onEvent);
  schedNow(true);setInterval(function(){if(card&&card.offsetParent!==null)paintNext();},30000);
  D.addEventListener("click",function(e){
    var t=e.target&&e.target.closest&&e.target.closest('.nav-btn[data-page="settings"]');
    if(t)setTimeout(function(){place();if(!shown&&card&&card.offsetParent!==null)seen();},50);
  },true);
  if("IntersectionObserver" in W){
    var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++)if(es[i].isIntersecting){io.disconnect();seen();return;}});
    io.observe(card);
  }else seen();
  paintStatus();
}

W.IngRagCard={rows:function(){return rows;},refresh:function(){return refresh(true);},seen:function(){seen();}};
arm();
})();
;try{window.__ingParts["p202"]="running";}catch(_){}
</script>
