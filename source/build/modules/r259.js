<style id="r259-css">
/* ============ R259 · DOWNLOADS: A MODEL KEPT FOR A STRONGER COMPUTER (Ingenium 6.66, 10 November 2026) ============
   Her words (9 November 2026): "I want to be able to download models on the Models page to store for later on the app and on my device
   so that I can have access to them when I get a stronger computer to run them ... I want to be able to download to run inside of the
   app on my device or save to storage for later to run on a more powerful device equipped with more memory ... directly from Ingenium
   to my device on my desktop or folder or also be able to store it inside of Ingenium's app library or storage", and "I also want a
   section added to the Models page where I can see recently downloaded models and also the ones downloaded for Storage for later use".
   A room of its own on the Models page, Downloads (modules/r173.js), in three cards, one thing each:
     1. Keep a model for later: every model of Ingenium's lineup, the largest first, with the memory it needs and whether this computer
        has it; Keep for later downloads it, checked against its fingerprint, into the place Ingenium keeps models (this computer, or the
        drive chosen on Your models), without making it a model of this computer. In a browser, Download the file saves it in the
        device's own Downloads folder (the browser keeps no list of it; Ingenium names it here so it can be found).
     2. Kept for a stronger computer: each kept model, where it is, Use it on this computer, Copy it to a folder (the desktop, a drive to
        carry; a note beside it says how to add it on the other computer), Show the file, Remove.
     3. Downloaded lately: what came in the last sixty days, newest first, kept or in use.
   A kept model is left out of every list where a model is chosen (deskInstalled), until Use it on this computer. The desktop's side is
   build/desktop/app_keep_666.py. Plain words, one step at a time, its progress always in view, and nothing lost if she is called away:
   a download carries on where it stopped, and a copy is checked before it is named done. */
#page-models .kf-lede{margin:0 0 10px;color:var(--ink-2);font-size:13.5px;line-height:1.55;max-width:78ch}
#page-models .kf-where{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 12px;padding:9px 12px;border-radius:12px;background:var(--rm-wellbg,rgba(34,26,46,.035));box-shadow:var(--rm-well,inset 0 1px 2.5px rgba(40,22,68,.09));font-size:13px;color:var(--ink-2)}
#page-models .kf-where b{color:var(--ink-1)}
#page-models .kf-find{display:flex;gap:8px;align-items:center;margin:0 0 10px}
#page-models .kf-find input{flex:1;min-width:0;min-height:38px;padding:8px 14px;border-radius:12px;border:1px solid var(--hairline);background:var(--rm-wellbg,rgba(34,26,46,.035));
  box-shadow:var(--rm-well,inset 0 1px 2.5px rgba(40,22,68,.09));color:var(--ink-1);font:inherit;font-size:13.5px}
#page-models .kf-find input:focus{outline:2px solid var(--accent,#6a3fb5);outline-offset:1px}
#page-models .kf-acts a.btn,#page-models .kf-partgrid a.btn{text-decoration:none}
#page-models .kf-list{list-style:none;margin:0;padding:0;display:grid;gap:9px}
#page-models .kf-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 14px;align-items:center;padding:12px 14px;border-radius:14px;border:1px solid var(--hairline);
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#faf8fd));box-shadow:var(--pop,0 2px 0 rgba(40,22,68,.16),0 6px 12px rgba(40,22,68,.08));transition:transform .2s var(--spring,cubic-bezier(.34,1.35,.64,1)),box-shadow .2s ease}
#page-models .kf-row:hover{transform:translateY(-2px)}
#page-models .kf-name{font-weight:650;color:var(--ink-1);font-size:14.5px;overflow-wrap:anywhere}
#page-models .kf-meta{font-size:12.5px;color:var(--ink-3);margin-top:2px}
#page-models .kf-fit{font-size:12.5px;margin-top:4px;color:var(--ink-2)}
#page-models .kf-fit.no{color:#a5641a}
#page-models .kf-fit.yes{color:#2f7a55}
#page-models .kf-acts{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}
#page-models .kf-prog{grid-column:1 / -1;display:flex;align-items:center;gap:10px}
#page-models .kf-bar{flex:1;height:8px;border-radius:999px;background:var(--rm-wellbg,rgba(34,26,46,.06));box-shadow:inset 0 1px 2px rgba(40,22,68,.15);overflow:hidden}
#page-models .kf-bar i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,var(--accent),var(--accent-deep,#4f3a7a));transition:width .4s ease}
#page-models .kf-prog small{font-size:12px;color:var(--ink-3);min-width:9ch;text-align:right}
#page-models .kf-badge{display:inline-block;margin-left:8px;padding:1px 9px;border-radius:999px;font-size:11px;font-weight:600;border:1px solid var(--hairline);color:var(--ink-2);vertical-align:middle}
#page-models .kf-badge.kept{color:#7a5a12;border-color:rgba(165,120,30,.4);background:rgba(232,176,64,.12)}
#page-models .kf-none{margin:4px 0 0;font-size:13px;color:var(--ink-3)}
#page-models .kf-more{margin-top:10px}
body[data-theme="night"] #page-models .kf-badge.kept{color:#f0cf86;background:rgba(232,176,64,.12)}
body[data-theme="night"] #page-models .kf-fit.no{color:#e6b062}
body[data-theme="night"] #page-models .kf-fit.yes{color:#7fd1a6}
body[data-motion="minimal"] #page-models .kf-row:hover{transform:none}
@media (max-width:620px){#page-models .kf-row{grid-template-columns:1fr}#page-models .kf-acts{justify-content:flex-start}}
/* 6.71: in a browser, a model in many parts showed every part as a key beside its name and squeezed the name into a column one letter
   wide (a model in 32 parts made the room 5,077 pixels tall). Its name now keeps its room; one key opens its parts, numbered, in a grid
   under it, each part marked once it is asked for */
@media (min-width:621px){#page-models .kf-row{grid-template-columns:minmax(220px,1fr) auto}}
#page-models .kf-parts{grid-column:1 / -1;margin:6px 0 2px;padding:12px;border-radius:12px;background:var(--rm-wellbg,rgba(34,26,46,.035));box-shadow:var(--rm-well,inset 0 1px 2.5px rgba(40,22,68,.09))}
#page-models .kf-parts[hidden]{display:none}
#page-models .kf-parts p{margin:0 0 10px;font-size:12.5px;line-height:1.5;color:var(--ink-2)}
#page-models .kf-partgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:7px}
#page-models .kf-partgrid .btn{min-width:0;padding:6px 0;justify-content:center;font-variant-numeric:tabular-nums}
#page-models .kf-partgrid .btn.kf-asked{box-shadow:inset 0 0 0 1.5px var(--accent,#6a3fb5),var(--key-shadow,0 2px 0 rgba(40,22,68,.2))}
#page-models .kf-partgrid .btn.kf-asked::after{content:" \2713";color:var(--accent,#6a3fb5)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p259"]="started";}catch(_){}
(function r259(){
"use strict";
if(window.IngKeep)return;
var W=window,D=document,LATE=60*864e5,SHOW=12;
var K={kept:[],late:[],jobs:{},copies:{},q:"",all:false,busy:false,open:{},asked:{}};
function $(id){return D.getElementById(id);}
function el(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function key(cls,txt,fn){var b=el("button","btn"+(cls?" "+cls:""),txt);b.type="button";b.addEventListener("click",function(e){e.preventDefault();fn(b);});return b;}
function say(t){try{ingToast(t);}catch(e){}}
function api(){try{return typeof shellApi==="function"?shellApi():null;}catch(e){return null;}}
function can(n){var a=api();return !!(a&&typeof a[n]==="function");}
function desk(){return can("install_model")&&can("kept_models")&&can("model_later");}
function size(b){try{return fmtBytes(b);}catch(e){return Math.round((b||0)/1e9*10)/10+" GB";}}
function day(t){if(!t)return "";var d=new Date(t*1000),n=new Date();var same=d.toDateString()===n.toDateString();
  return same?"today":d.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:d.getFullYear()!==n.getFullYear()?"numeric":undefined});}
function M(){try{return (W.ING_LINEUP&&ING_LINEUP.models)||{};}catch(e){return {};}}
function need(sp){try{return typeof lineupNeedGB==="function"?lineupNeedGB(sp):sp.size/1073741824*1.12+0.7;}catch(e){return 0;}}
function usable(){try{return typeof lineupUsableGB==="function"?lineupUsableGB():null;}catch(e){return null;}}
function models(){var m=M(),out=[];Object.keys(m).forEach(function(k){var sp=m[k];if(!sp||!sp.url||!sp.sha256||!sp.size)return;if(/-(mmproj|dspark)$/.test(k))return;out.push({k:k,sp:sp});});
  out.sort(function(a,b){return b.sp.size-a.sp.size;});return out;}
/* ---------- the desktop's lists ---------- */
function reload(){var a=api();if(!desk())return Promise.resolve();
  return Promise.all([Promise.resolve().then(function(){return a.kept_models();}),Promise.resolve().then(function(){return a.installed_models();})]).then(function(r){
    K.kept=(r[0]||[]).filter(function(x){return x&&x.id;});var now=Date.now()/1000;
    K.late=(r[1]||[]).filter(function(x){return x&&x.id&&x.role==="model"&&x.at&&now-x.at<LATE/1000;}).sort(function(a,b){return b.at-a.at;});},function(){});}
/* a kept model is left out of the lists where a model is chosen: after the page reads what the app installed, it takes them out */
function hideKept(){var di=W.deskInstalled;if(typeof di!=="function"||di.__r259)return;
  var w=function(){return di.apply(this,arguments).then(function(list){try{var later={};(list||[]).forEach(function(b){if(b&&b.later)later[b.id]=1;});
      var before=state.models.length;state.models=state.models.filter(function(m){return !later[m.id];});
      if(state.activeModelId&&later[state.activeModelId])state.activeModelId=null;
      if(state.models.length!==before){try{saveState();}catch(e){}try{renderModels();}catch(e){}try{renderDockModels();}catch(e){}}}catch(e){}return list;});};
  w.__r259=1;try{W.deskInstalled=w;deskInstalled=w;}catch(e){W.deskInstalled=w;}}
/* ---------- keeping one ---------- */
function keep(k,row){var a=api(),sp=M()[k];if(!sp)return;
  if(!desk()){return;}
  if(K.jobs[k]&&K.jobs[k].state==="running")return;
  var have=K.late.concat(K.kept).filter(function(x){return x.lineup===k;})[0];
  if(have){Promise.resolve().then(function(){return a.model_later(have.id,true);}).then(function(r){if(r&&r.ok===false)throw new Error(r.error||"it could not be kept");
      return Promise.resolve(typeof deskInstalled==="function"?deskInstalled():null);}).then(reload).then(function(){say(sp.name+" was already downloaded; it is kept for later now.");paint();},function(e){say(String(e&&e.message||e));});return;}
  var args=typeof lineupArgs==="function"?lineupArgs(k):{key:k,url:sp.url,sha256:sp.sha256,size:sp.size,file:sp.file,name:sp.name};args.later=true;
  var job=K.jobs[k]={state:"running",got:0,total:sp.size};paint();
  Promise.resolve().then(function(){return a.install_model(args);}).then(function(r){if(!r||!r.ok)throw new Error((r&&r.error)||"the download could not start");
    return new Promise(function(res,rej){(function poll(){Promise.resolve().then(function(){return a.install_status(k);}).then(function(st){st=st||{};
      if(st.state==="done")return res(st);if(st.state==="error")return rej(new Error(st.error||"the download stopped"));if(st.state==="cancelled")return rej(new Error("stopped"));
      job.got=+st.received||0;if(st.total)job.total=+st.total;bar(k);setTimeout(poll,700);},rej);})();});})
    .then(function(){delete K.jobs[k];return reload();}).then(function(){say(sp.name+" is downloaded, checked against its fingerprint, and kept for later. It is in Kept for a stronger computer.");paint();},
      function(e){var stopped=/stopped/i.test(String(e&&e.message||e));delete K.jobs[k];paint();say(stopped?"The download of "+sp.name+" was stopped. Keep for later carries on from where it stopped.":"The download of "+sp.name+" stopped: "+String(e&&e.message||e)+". Keep for later carries on from where it stopped.");});}
function stop(k){var a=api();try{if(a&&a.install_cancel)a.install_cancel(k);}catch(e){}}
function bar(k){var j=K.jobs[k],r=D.querySelector('#kfCard [data-kf="'+k+'"]');if(!j||!r)return;var i=r.querySelector(".kf-bar i"),s=r.querySelector(".kf-prog small");
  var p=j.total?Math.min(100,Math.round(j.got/j.total*100)):0;if(i)i.style.width=p+"%";if(s)s.textContent=p+"% · "+size(j.got);}
/* ---------- a kept one ---------- */
function use(x){var a=api();Promise.resolve().then(function(){return a.model_later(x.id,false);}).then(function(r){if(r&&r.ok===false)throw new Error(r.error||"");
    return Promise.resolve(typeof deskInstalled==="function"?deskInstalled():null);}).then(reload)
  .then(function(){say(x.name+" is a model of this computer again: choose it with the model key. If it needs more memory than this computer has, it may not load.");paint();},function(e){say(String(e&&e.message||e));});}
function later(x){var a=api();Promise.resolve().then(function(){return a.model_later(x.id,true);}).then(function(r){if(r&&r.ok===false)throw new Error(r.error||"");
    return Promise.resolve(typeof deskInstalled==="function"?deskInstalled():null);}).then(reload).then(function(){say(x.name+" is kept for later: it is left out of the model lists until you choose Use it on this computer.");paint();},function(e){say(String(e&&e.message||e));});}
function show(x){var a=api();Promise.resolve().then(function(){return a.reveal_model(x.id);}).then(function(r){if(r&&r.ok===false)say(r.error||"The file could not be shown.");},function(){});}
function copy(x){var a=api();if(K.copies[x.id]&&K.copies[x.id].state==="running")return;
  Promise.resolve().then(function(){return a.copy_model_out(x.id);}).then(function(r){if(!r||r.cancelled)return;if(!r.ok)throw new Error(r.error||"it could not be copied");
    var job=K.copies[x.id]={state:"running",done:0,total:x.size||0,folder:r.folder||""};paint();
    (function poll(){Promise.resolve().then(function(){return a.copy_status(x.id);}).then(function(st){st=st||{};job.done=+st.done||0;if(st.total)job.total=+st.total;
      if(st.state==="running"){paintCopy(x.id);setTimeout(poll,600);return;}
      delete K.copies[x.id];paint();
      if(st.state==="done")say(x.name+" is copied to "+(st.folder||"the folder")+(st.checked?", checked against its fingerprint,":"")+" with a note beside it on how to add it on the other computer.");
      else if(st.state==="stopped")say("The copy was stopped; nothing half-made was left in the folder.");
      else say("The copy stopped: "+(st.error||"")+". Nothing half-made was left in the folder.");},function(){delete K.copies[x.id];paint();});})();},function(e){say(String(e&&e.message||e));});}
function paintCopy(id){var j=K.copies[id],r=D.querySelector('#kfKeptCard [data-kid="'+id+'"]');if(!j||!r)return;var i=r.querySelector(".kf-bar i"),s=r.querySelector(".kf-prog small");
  var p=j.total?Math.min(100,Math.round(j.done/j.total*100)):0;if(i)i.style.width=p+"%";if(s)s.textContent=p+"%";}
function remove(x){if(!confirm("Remove "+x.name+" from "+(x.where||"this computer")+"? The file is deleted. A copy you made in another folder is not touched."))return;
  var a=api();Promise.resolve().then(function(){return a.delete_model_file(x.id);}).then(reload).then(function(){say(x.name+" was removed.");paint();},function(e){say(String(e&&e.message||e));});}
/* ---------- the cards ---------- */
function card(id,title,lede){var c=$(id);if(!c){c=el("div","card");c.id=id;}c.innerHTML="";c.appendChild(el("h2","sec",title));if(lede)c.appendChild(el("p","kf-lede",lede));return c;}
function prog(r,label){var p=el("div","kf-prog"),b=el("div","kf-bar");b.appendChild(el("i"));p.appendChild(b);p.appendChild(el("small",null,"…"));if(label)p.appendChild(label);r.appendChild(p);}
function keepCard(){var web=!desk(),c=card("kfCard","Keep a model for a stronger computer",web?
    "Download a model's file to keep, to run later on a computer with more memory. In a web browser the file goes to this device's Downloads folder; in the Ingenium app on a computer, Ingenium keeps it for you and lists it below.":
    "Download a model to keep, without making it a model of this computer: it is checked against its fingerprint, kept where Ingenium keeps models, and listed under Kept for a stronger computer. Copy it to a drive or a folder whenever you like.");
  if(!web){var wh=el("div","kf-where");
    wh.appendChild(el("span",null,"Kept on "));var b0=el("b",null,"this computer");wh.appendChild(b0);
    wh.appendChild(el("span",null,". To keep them on a drive, choose its folder on Your models, where models are kept."));c.appendChild(wh);
    if(can("model_places"))Promise.resolve().then(function(){return api().model_places();}).then(function(p){var d=p&&p.drive;
      if(d&&p.writes_to==="drive")b0.textContent=d.label||d.path;else if(d&&!d.connected)b0.textContent="this computer, while "+(d.label||"the drive")+" is not connected";},function(){});}
  var fd=el("div","kf-find"),q=el("input");q.type="search";q.placeholder="Find a model by name or maker";q.setAttribute("aria-label","Find a model to keep");q.value=K.q;fd.appendChild(q);c.appendChild(fd);
  var ul=el("ul","kf-list");c.appendChild(ul);var U=usable();
  function rows(){ul.innerHTML="";var s=K.q.trim().toLowerCase(),list=models().filter(function(m){return !s||(m.sp.name+" "+(m.sp.maker||"")+" "+m.k).toLowerCase().indexOf(s)>=0;});
    if(!list.length){ul.appendChild(el("li","kf-none","No model of Ingenium's lineup has that name."));return;}
    (K.all||s?list:list.slice(0,SHOW)).forEach(function(m){var sp=m.sp,n=need(sp),li=el("li","kf-row");li.setAttribute("data-kf",m.k);
      var t=el("div");t.appendChild(el("div","kf-name",sp.name));t.appendChild(el("div","kf-meta",[sp.maker,size(sp.size),sp.parts?sp.parts.length+" parts":""].filter(Boolean).join(" · ")));
      var fit=U==null?null:n<=U;t.appendChild(el("div","kf-fit"+(fit===false?" no":fit?" yes":""),"Needs about "+n.toFixed(1)+" GB of memory"+(fit===false?": more than this device has. Keep it for a stronger computer.":fit?": this device has room for it.":".")));li.appendChild(t);
      var acts=el("div","kf-acts"),job=K.jobs[m.k],kept=K.kept.some(function(x){return x.lineup===m.k;});
      if(web){var parts=sp.parts&&sp.parts.length?sp.parts:[{url:sp.url,file:sp.file}],box=null,grid=null;
        if(parts.length>1){box=el("div","kf-parts");box.hidden=!K.open[m.k];box.appendChild(el("p",null,"This model comes in "+parts.length+" parts. Download each one and keep them together in one folder: a model in parts runs only with all of them. In the Ingenium app on a computer, Keep for later downloads and checks every part for you."));
          grid=el("div","kf-partgrid");grid.setAttribute("role","list");box.appendChild(grid);
          var tg=key("small","Download its "+parts.length+" parts",function(){box.hidden=!box.hidden;K.open[m.k]=!box.hidden;tg.setAttribute("aria-expanded",String(!box.hidden));});tg.setAttribute("aria-expanded",String(!box.hidden));acts.appendChild(tg);li.__parts=box;}
        parts.forEach(function(p,i,all){var a=el("a","btn"+(all.length>1?" small":""),all.length>1?String(i+1):"Download the file");a.href=p.url;a.rel="noopener";a.setAttribute("download",p.file||"");
          a.title="Saves "+(p.file||"the file")+" in this device's Downloads folder";if(all.length>1){a.setAttribute("aria-label","Part "+(i+1)+" of "+all.length);a.setAttribute("role","listitem");if((K.asked[m.k]||{})[i])a.classList.add("kf-asked");}
          a.addEventListener("click",function(){try{var L=state.keptLinks=Array.isArray(state.keptLinks)?state.keptLinks:[];L.unshift({k:m.k,name:sp.name+(all.length>1?", part "+(i+1)+" of "+all.length:""),file:p.file||sp.file,at:Date.now()});state.keptLinks=L.slice(0,40);saveState();}catch(e){}
            (K.asked[m.k]=K.asked[m.k]||{})[i]=1;a.classList.add("kf-asked");setTimeout(lateCard,50);});(grid||acts).appendChild(a);});
        if(sp.page){var pg=el("a","btn ghost","Model page");pg.href=sp.page;pg.target="_blank";pg.rel="noopener noreferrer";acts.appendChild(pg);}}
      else if(job&&job.state==="running"){acts.appendChild(key("small ghost","Stop",function(){stop(m.k);}));li.appendChild(acts);prog(li);ul.appendChild(li);bar(m.k);return;}
      else if(kept)acts.appendChild(el("span","kf-badge kept","Kept for later"));
      else acts.appendChild(key("primary small","Keep for later",function(){keep(m.k,li);}));
      li.appendChild(acts);if(li.__parts)li.appendChild(li.__parts);ul.appendChild(li);});
    if(!K.all&&!s&&list.length>SHOW){var more=key("ghost small kf-more","Show all "+list.length+" models",function(){K.all=true;rows();});var li2=el("li");li2.appendChild(more);ul.appendChild(li2);}}
  q.addEventListener("input",function(){K.q=q.value;rows();});rows();return c;}
function keptCard(){if(!desk())return null;var c=card("kfKeptCard","Kept for a stronger computer","The models you keep for later. They are left out of the model lists until you choose Use it on this computer.");
  if(!K.kept.length){c.appendChild(el("p","kf-none","None yet. Keep for later, above, downloads one and lists it here."));return c;}
  var ul=el("ul","kf-list");K.kept.forEach(function(x){var li=el("li","kf-row");li.setAttribute("data-kid",x.id);var t=el("div");var nm=el("div","kf-name",x.name);nm.appendChild(el("span","kf-badge kept","Kept for later"));t.appendChild(nm);
    t.appendChild(el("div","kf-meta",[size(x.size),x.at?"downloaded "+day(x.at):"",x.connected?(x.where?"on "+x.where:""):"on "+(x.where||"a drive")+", not connected now"].filter(Boolean).join(" · ")));li.appendChild(t);
    var acts=el("div","kf-acts");
    if(K.copies[x.id]){li.appendChild(acts);prog(li);ul.appendChild(li);paintCopy(x.id);return;}
    if(x.connected){acts.appendChild(key("primary small","Use it on this computer",function(){use(x);}));acts.appendChild(key("small","Copy to a folder…",function(){copy(x);}));acts.appendChild(key("ghost small","Show the file",function(){show(x);}));}
    acts.appendChild(key("ghost small","Remove",function(){remove(x);}));li.appendChild(acts);ul.appendChild(li);});c.appendChild(ul);return c;}
function lateCard(){var c=card("kfLateCard","Downloaded lately","What came in during the last sixty days, newest first.");
  if(!desk()){var L=(function(){try{return Array.isArray(state.keptLinks)?state.keptLinks:[];}catch(e){return [];}})().filter(function(x){return Date.now()-x.at<LATE;});
    if(!L.length){c.appendChild(el("p","kf-none","Nothing yet. A file you download above is named here, with the day, so you can find it in your Downloads folder."));return c;}
    var u=el("ul","kf-list");L.forEach(function(x){var li=el("li","kf-row"),t=el("div");t.appendChild(el("div","kf-name",x.name));t.appendChild(el("div","kf-meta",(x.file||"")+" · asked for "+day(x.at/1000)));li.appendChild(t);li.appendChild(el("div"));u.appendChild(li);});c.appendChild(u);return c;}
  var list=K.late.concat(K.kept.filter(function(x){return x.at&&Date.now()/1000-x.at<LATE/1000&&!K.late.some(function(y){return y.id===x.id;});})).sort(function(a,b){return b.at-a.at;});
  if(!list.length){c.appendChild(el("p","kf-none","Nothing in the last sixty days."));return c;}
  var ul=el("ul","kf-list");list.forEach(function(x){var li=el("li","kf-row"),t=el("div"),nm=el("div","kf-name",x.name);if(x.later)nm.appendChild(el("span","kf-badge kept","Kept for later"));else nm.appendChild(el("span","kf-badge","On this computer"));
    t.appendChild(nm);t.appendChild(el("div","kf-meta",[size(x.size),"downloaded "+day(x.at),x.where?"on "+x.where:""].filter(Boolean).join(" · ")));li.appendChild(t);
    var acts=el("div","kf-acts");if(!x.later)acts.appendChild(key("small","Keep for later",function(){later(x);}));acts.appendChild(key("ghost small","Show the file",function(){show(x);}));li.appendChild(acts);ul.appendChild(li);});c.appendChild(ul);return c;}
function paint(){var host=$("page-models");if(!host)return;var cs=[keepCard(),keptCard(),lateCard()];
  cs.forEach(function(c){if(c&&!c.parentNode)host.appendChild(c);});
  var kc=$("kfKeptCard");if(!desk()&&kc)kc.remove();}
function boot(){hideKept();reload().then(paint);}
function start(){if(!$("page-models")){setTimeout(start,600);return;}boot();
  try{var og=W.go;if(typeof og==="function"&&!og.__r259){var ng=function(p){var r=og.apply(this,arguments);try{if(p==="models")reload().then(paint);}catch(e){}return r;};ng.__r259=1;W.go=ng;try{go=ng;}catch(e){}}}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else setTimeout(start,0);
W.IngKeep={reload:reload,paint:paint,keep:keep,use:use,later:later,state:function(){return K;}};
try{window.__ingParts["p259"]="running";}catch(_){}
})();
</script>
