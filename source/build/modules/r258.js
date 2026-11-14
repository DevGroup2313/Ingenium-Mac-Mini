<style id="r258-css">
/* ============ R258 · THE BUILD LIBRARY IN FOLDERS (Ingenium 6.65, 9 November 2026) ============ */
#page-folders .bl-list{list-style:none;margin:6px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:4px 14px}
#page-folders .bl-row{display:flex;gap:10px;align-items:baseline;justify-content:space-between;width:100%;text-align:left;padding:7px 10px;border:0;border-radius:9px;background:transparent;color:var(--ink-1);font:inherit;font-size:14px;line-height:1.35;cursor:pointer;box-shadow:none;transform:none}
#page-folders .bl-row:hover,#page-folders .bl-row:focus-visible{background:var(--bg-2,rgba(120,100,160,.08));outline:none}
#page-folders .bl-row:focus-visible{box-shadow:0 0 0 2px var(--accent)}
#page-folders .bl-row b{font-weight:600;font-size:14px;overflow-wrap:anywhere}
#page-folders .bl-row small{flex:none;color:var(--ink-3);font-size:11.5px}
#page-folders .bl-sub{margin:14px 0 0;font:700 10.5px/1.4 var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
#page-folders .bl-group{margin:8px 0 0}
#page-folders .bl-group > summary{cursor:pointer;padding:6px 10px;color:var(--ink-2);font-size:13px}
#page-folders .bl-apps{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 0}
#page-folders .bl-apps span{padding:3px 10px;border:1px solid var(--hairline);border-radius:999px;font-size:12px;color:var(--ink-2)}
#page-folders .bl-find{display:flex;gap:8px;align-items:center;margin:12px 0 0}
#page-folders .bl-find input{flex:1;min-width:0}
#page-folders .bl-hits{list-style:none;margin:8px 0 0;padding:0;display:grid;gap:2px}
#page-folders .bl-hit{display:block;width:100%;text-align:left;padding:8px 10px;border:0;border-radius:9px;background:transparent;color:var(--ink-1);font:inherit;font-size:14px;line-height:1.4;cursor:pointer;box-shadow:none;transform:none}
#page-folders .bl-hit:hover,#page-folders .bl-hit:focus-visible{background:var(--bg-2,rgba(120,100,160,.08));outline:none}
#page-folders .bl-hit:focus-visible{box-shadow:0 0 0 2px var(--accent)}
#page-folders .bl-hit b{font-weight:600}
#page-folders .bl-hit small{color:var(--ink-3);font-size:11.5px;margin-left:8px}
#page-folders .bl-hit span{display:block;color:var(--ink-2);font-size:13px;overflow-wrap:anywhere}
#page-folders .bl-hit mark,#modalBox .bl-text mark{background:rgba(232,176,64,.38);color:inherit;border-radius:3px;padding:0 1px}
#page-folders .bl-none{margin:8px 0 0}
#modalBox.bl-read{max-width:820px}
#modalBox .bl-reader h3{margin:0 0 4px}
#modalBox .bl-meta{margin:0 0 10px;color:var(--ink-3);overflow-wrap:anywhere}
#modalBox .bl-text{max-height:62vh;overflow:auto;border:1px solid var(--hairline);border-radius:12px;padding:6px 18px;background:var(--bg);color:var(--ink-1);font-size:14px;line-height:1.6;overflow-wrap:anywhere}
#modalBox .bl-text h1{font-size:19px;margin:12px 0 8px}#modalBox .bl-text h2{font-size:16px;margin:16px 0 6px}#modalBox .bl-text h3{font-size:14.5px;margin:14px 0 6px}
#modalBox .bl-text pre{white-space:pre-wrap}
#modalBox .bl-acts{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p258"]="started";}catch(_){}
/* ============ R258 · THE BUILD LIBRARY IN FOLDERS (Ingenium 6.65, 9 November 2026) ============
   Her words (8 November 2026): "I want all of my apps and how I like to work and how I build them and specific and great details that be
   recalled upon to build other apps in a similar way to be neatly added into the Folders. I don't want to have to redo things from
   scratch if I don't have to. I want how I built Tabula, Abacus, Imago, Scriba, Fontes, Schedae and Clepsydra, and everything else
   inside of my 4 apps to be filed and organised and always made accessible to me." Her answer: both, on the Folders page and as files
   the chat's Your folders can search. The library itself (a zip of Markdown notes, made from her apps' own build notes, some from
   private repositories) is never in this page or in any repository: she brings it in, and it stays on this device (IndexedDB
   "ingenium-buildlib"). Its top folders are the apps; each app's notes show in that app's folder ("How it was built"), and an app
   with no folder yet gets one. The Folders page draws the cards (modules/r208.js calls home and folder). */
(function r258(){
"use strict";
if(window.IngBuildLib)return;
var W=window,D=document,DB="ingenium-buildlib",LIB=null,LOADING=null;
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function el(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function btn(cls,txt,fn){var b=el("button","btn"+(cls?" "+cls:""),txt);b.type="button";b.addEventListener("click",function(e){e.preventDefault();fn(b,e);});return b;}
function norm(n){return String(n||"").toLowerCase().replace(/^the\s+/,"").replace(/[^a-z0-9]+/g," ").trim();}
function say(t){try{ingToast(t);}catch(e){}}
function day(t){try{return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}
function idb(){return new Promise(function(res,rej){if(!W.indexedDB){rej(new Error("this browser keeps no database"));return;}
  var q=indexedDB.open(DB,1);q.onupgradeneeded=function(){var db=q.result;if(!db.objectStoreNames.contains("notes"))db.createObjectStore("notes",{keyPath:"path"});if(!db.objectStoreNames.contains("meta"))db.createObjectStore("meta");};
  q.onsuccess=function(){res(q.result);};q.onerror=function(){rej(q.error||new Error("the database could not be opened"));};});}
/* the notes are read once and kept in memory; each later look reads only the small record that says when they were brought in, so a
   library that arrived another way (a backup put back, Ingenium Cloud) is seen without the page being opened again */
function load(){if(LOADING)return LOADING;
  LOADING=idb().then(function(db){return new Promise(function(res){var t=db.transaction(["notes","meta"],"readonly"),out={notes:null,meta:null};
      t.objectStore("meta").get("lib").onsuccess=function(e){out.meta=e.target.result||null;
        if(LIB&&((!LIB.meta&&!out.meta&&!LIB.notes.length)||(LIB.meta&&out.meta&&LIB.meta.at===out.meta.at&&LIB.meta.count===out.meta.count)))return;
        t.objectStore("notes").getAll().onsuccess=function(e2){out.notes=e2.target.result||[];};};
      t.oncomplete=function(){db.close();res(out.notes?out:LIB);};t.onerror=function(){db.close();res(LIB||{notes:[],meta:null});};});})
    .then(function(x){if(x.notes.length&&!x.meta){var apps={};x.notes.forEach(function(n){if(n.app)apps[n.app]=(apps[n.app]||0)+1;});x.meta={at:0,count:x.notes.length,apps:apps,name:""};}
      LIB=x;LOADING=null;return x;},function(){LOADING=null;LIB=LIB||{notes:[],meta:null};return LIB;});
  return LOADING;}
function save(notes,meta){return idb().then(function(db){return new Promise(function(res,rej){var t=db.transaction(["notes","meta"],"readwrite"),s=t.objectStore("notes");
  s.clear();notes.forEach(function(n){s.put(n);});var m=t.objectStore("meta");if(meta)m.put(meta,"lib");else m.delete("lib");
  t.oncomplete=function(){db.close();LIB={notes:notes,meta:meta};res(LIB);};t.onerror=function(){db.close();rej(t.error||new Error("the notes could not be kept"));};});});}
/* a note from its path in the zip: "Carpe Diem/Tabula_history.md" -> app "Carpe Diem", title "Tabula history", group "" */
function noteOf(path,text){var parts=path.split("/").filter(Boolean),file=parts.pop(),app=parts.length?parts[0]:"",group=parts.slice(1).join(" / ");
  var src="",m=/^<!--\s*From ([\s\S]*?)-->\s*/.exec(text);if(m){src=m[1].trim();text=text.slice(m[0].length);}
  var title=file.replace(/\.md$/i,"").replace(/_/g," ");
  return {path:path,app:app,group:group,title:title,src:src,text:text,words:(text.match(/\S+/g)||[]).length};}
var MAX_FILES=3000,MAX_BYTES=40*1024*1024;
function bring(file){if(!file)return Promise.resolve(null);
  if(typeof libZipEntries!=="function"||typeof libZipData!=="function")return Promise.reject(new Error("this copy of Ingenium cannot read zip files"));
  return file.arrayBuffer().then(function(buf){var u8=new Uint8Array(buf),ents=libZipEntries(u8);
    if(!ents)throw new Error("this is not a zip file");
    var names=Object.keys(ents).filter(function(n){return /\.md$/i.test(n)&&!/(^|\/)(__MACOSX|\.)/.test(n);});
    if(!names.length)throw new Error("the zip holds no notes (Markdown files)");
    if(names.length>MAX_FILES)throw new Error("the zip holds more than "+MAX_FILES+" notes");
    var total=names.reduce(function(s,n){return s+(ents[n].usz||0);},0);if(total>MAX_BYTES)throw new Error("the notes are larger than 40 MB");
    var td=new TextDecoder(),notes=[];
    return names.reduce(function(p,n){return p.then(function(){return libZipData(u8,ents[n]).then(function(d){notes.push(noteOf(n.replace(/^\.\//,""),td.decode(d)));});});},Promise.resolve())
      .then(function(){return notes;});})
  .then(function(notes){return load().then(function(L){return {notes:notes,had:(L&&L.notes)||[]};},function(){return {notes:notes,had:[]};});})
  .then(function(x){var notes=x.notes,apps={};notes.forEach(function(n){if(n.app)apps[n.app]=(apps[n.app]||0)+1;});
    /* 7.03 (her words, 14 November 2026: "receive new nopes or recipes without wiping all stored notes"): the zip's notes are added to the
       ones kept; a note at the same place in the zip (its app, its folder, its name) is replaced by the newer one, and every other stays */
    var byPath={},had=x.had.length,added=0,updated=0;x.had.forEach(function(n){var c={};for(var k in n)if(k!=="low")c[k]=n[k];byPath[n.path]=c;});
    notes.forEach(function(n){if(byPath[n.path])updated++;else added++;byPath[n.path]=n;});
    var all=Object.keys(byPath).map(function(k){return byPath[k];}),allApps={};all.forEach(function(n){if(n.app)allApps[n.app]=(allApps[n.app]||0)+1;});
    var meta={at:Date.now(),count:all.length,apps:allApps,name:String(file.name||"").slice(0,120)};
    return save(all,meta).then(function(){var made=[];
      try{var have=(W.IngFolders&&IngFolders.folders?IngFolders.folders():[]).map(function(p){return norm(p.name);});
        /* her order of the apps (8 November 2026), then the rest by name; a folder is made with its name only: the parts' names (Scriba,
           Fontes, Focus ...) also name parts of Ingenium, and as a folder's words they would sort other conversations into it */
        var ORDER=['carpe diem','forge','ingenium','inkwell','lakay','offline project'];
        Object.keys(apps).sort(function(x,y){var i=ORDER.indexOf(norm(x)),j=ORDER.indexOf(norm(y));i=i<0?99:i;j=j<0?99:j;return i-j||x.localeCompare(y);})
          .forEach(function(a){if(have.indexOf(norm(a))<0&&W.IngFolders&&IngFolders.make(a))made.push(a);});}catch(e){}
      return {meta:meta,made:made,had:had,added:added,updated:updated};});});}
function pick(then){var i=el("input");i.type="file";i.accept=".zip,application/zip";i.style.display="none";D.body.appendChild(i);
  i.addEventListener("change",function(){var f=i.files&&i.files[0];i.remove();if(!f)return;say("Reading the build library…");
    bring(f).then(function(r){var na=Object.keys(r.meta.apps).length,fm=r.made.length?"; folders made for "+r.made.join(", "):"";
      if(r.had)say(r.added+" new note"+(r.added===1?"":"s")+" and "+r.updated+" updated: "+r.meta.count+" notes kept for "+na+" app"+(na===1?"":"s")+fm+". The others are kept as they were.");
      else say(r.meta.count+" notes kept for "+na+" apps"+fm+".");if(then)then(r);},
      function(e){say("The build library could not be read: "+(e&&e.message||e)+".");});});
  i.click();}
function repaint(){try{IngFolders.paint();}catch(e){}}
/* 6.65: the notes are wrapped by hand at about 130 letters; a line that only continues the one before (a paragraph, a list item)
   is joined to it, so a list item is not cut in two. Code between fences, headings, tables, rules and indented blocks stay as written. */
function unwrap(t){var out=[],code=false,BLOCK=/^\s*([-*+]\s|\d+[.)]\s|#{1,6}\s|>|\||```|~~~|={3,}\s*$|-{3,}\s*$|\*{3,}\s*$)/;
  String(t==null?"":t).replace(/\r\n?/g,"\n").split("\n").forEach(function(l){
    if(/^\s*(```|~~~)/.test(l)){code=!code;out.push(l);return;}
    var last=out.length?out[out.length-1]:"";
    if(code||!l.trim()||BLOCK.test(l)||/^(\t| {4,})/.test(l)&&!/^\s*([-*+]\s|\d+[.)]\s)/.test(last)||!last.trim()||/^\s*(#{1,6}\s|\||```|~~~|={3,}\s*$|-{3,}\s*$|\*{3,}\s*$)/.test(last)||/ {2}$/.test(last)){out.push(l);return;}
    out[out.length-1]=last.replace(/\s+$/,"")+" "+l.trim();});
  return out.join("\n");}
/* the first place the words looked for stand in the note as shown, marked and brought into view */
function markIn(host,q){q=String(q||"").trim().toLowerCase();if(!q)return null;
  try{var tw=D.createTreeWalker(host,NodeFilter.SHOW_TEXT,null),nd;
    while((nd=tw.nextNode())){var i=nd.nodeValue.toLowerCase().indexOf(q);if(i<0)continue;
      var r=D.createRange();r.setStart(nd,i);r.setEnd(nd,i+q.length);var m=el("mark");r.surroundContents(m);return m;}}catch(e){}
  return null;}
function read(n,q){var box=D.getElementById("modalBox"),root=D.getElementById("modalRoot");if(!box||typeof openModal!=="function")return;var from=D.activeElement;
  box.innerHTML="";box.classList.add("bl-read");var w=el("div","bl-reader");w.setAttribute("role","document");
  w.appendChild(el("h3",null,shown(n)+(/ history$/.test(n.title)?": its history":"")));
  w.appendChild(el("p","small muted bl-meta",(n.app?n.app+(n.group?" · "+n.group:"")+" · ":"")+n.words+" words"+(n.src?" · from "+n.src:"")));
  var t=el("div","bl-text md");t.tabIndex=0;try{t.innerHTML=typeof chatMd==="function"?chatMd(unwrap(n.text)):esc(n.text).replace(/\n/g,"<br>");}catch(e){t.textContent=n.text;}w.appendChild(t);
  var a=el("div","bl-acts"),c=btn("primary small","Close",function(){try{closeModal();}catch(_){}});a.appendChild(c);w.appendChild(a);box.appendChild(w);
  var mo=new MutationObserver(function(){if(!root||!root.classList.contains("open")||!box.querySelector(".bl-reader")){box.classList.remove("bl-read");mo.disconnect();try{if(from&&from.focus)from.focus();}catch(_){}}});
  if(root)mo.observe(root,{attributes:true,attributeFilter:["class"]});mo.observe(box,{childList:true});
  openModal();try{c.focus();}catch(e){}
  var mk=markIn(t,q);if(mk)setTimeout(function(){try{t.scrollTop=Math.max(0,mk.getBoundingClientRect().top-t.getBoundingClientRect().top+t.scrollTop-90);}catch(e){}},30);}
function shown(n){var t=n.title.replace(/^00\s+/,"").replace(/ history$/,"");if(t===t.toUpperCase())t=t.toLowerCase();return t.charAt(0).toUpperCase()+t.slice(1);}
function row(n){var b=el("button","bl-row");b.type="button";b.appendChild(el("b",null,shown(n)));b.appendChild(el("small",null,n.words+" words"));b.title="Read "+shown(n)+(/ history$/.test(n.title)?": its history in the build notes":"");b.addEventListener("click",function(){read(n);});var li=el("li");li.appendChild(b);return li;}
function order(a,b){var rk=function(n){return /^00 Index/i.test(n.title)?0:/^00 How I build/i.test(n.title)?0:/^00 /.test(n.title)?1:2;},ia=rk(a),ib=rk(b);if(ia!==ib)return ia-ib;
  var va=/(\d+)\.(\d+)(?:\.(\d+))?/.exec(a.title),vb=/(\d+)\.(\d+)(?:\.(\d+))?/.exec(b.title);
  if(va&&vb){for(var i=1;i<4;i++){var x=+(va[i]||0),y=+(vb[i]||0);if(x!==y)return y-x;}}
  return a.title.localeCompare(b.title);}
function list(notes){var ul=el("ul","bl-list");notes.slice().sort(order).forEach(function(n){ul.appendChild(row(n));});return ul;}
/* 6.65: find a word or a phrase in the notes (all of them, or one app's): the title first, then how often it stands in the note;
   each row shows where, and opens the note at that place. Nothing leaves the device: it reads the notes kept here. */
function find(notes,q){q=String(q||"").trim().toLowerCase();if(q.length<2)return [];var out=[];
  notes.forEach(function(n){var low=n.low||(n.low=(n.text||"").toLowerCase()),i=low.indexOf(q),inTitle=shown(n).toLowerCase().indexOf(q)>=0;if(i<0&&!inTitle)return;
    var c=0,j=i;while(j>=0&&c<500){c++;j=low.indexOf(q,j+q.length);}
    var a=Math.max(0,i-70),bit=i<0?"":(a>0?"…":"")+n.text.slice(a,i+q.length+110).replace(/\s+/g," ")+"…";
    out.push({n:n,c:c,title:inTitle,bit:bit,at:i<0?-1:(a>0?1:0)+n.text.slice(a,i).replace(/\s+/g," ").length});});
  out.sort(function(x,y){return (y.title?1:0)-(x.title?1:0)||y.c-x.c||order(x.n,y.n);});return out;}
function finder(c,notes,label,withApp){var w=el("div","bl-find"),i=el("input");i.type="search";i.className="bl-q";i.placeholder=label;i.setAttribute("aria-label",label);i.autocomplete="off";w.appendChild(i);c.appendChild(w);
  var res=el("div","bl-res");res.setAttribute("role","status");res.setAttribute("aria-live","polite");c.appendChild(res);var T=null;
  function show(){var q=i.value.trim();res.innerHTML="";if(q.length<2)return;var hits=find(notes,q);
    if(!hits.length){res.appendChild(el("p","small muted bl-none","Nothing in these notes says “"+q+"”."));return;}
    res.appendChild(el("p","small muted bl-none",hits.length+" note"+(hits.length===1?"":"s")+(hits.length>40?", the first 40 shown":"")+":"));
    var ul=el("ul","bl-hits");hits.slice(0,40).forEach(function(h){var b=el("button","bl-hit");b.type="button";b.appendChild(el("b",null,shown(h.n)));
      b.appendChild(el("small",null,(withApp&&h.n.app?h.n.app+" · ":"")+(h.c?h.c+" time"+(h.c===1?"":"s"):"in its name")));
      if(h.bit){var s=el("span"),k=h.at,ql=q.length;s.appendChild(D.createTextNode(h.bit.slice(0,k)));s.appendChild(el("mark",null,h.bit.slice(k,k+ql)));s.appendChild(D.createTextNode(h.bit.slice(k+ql)));b.appendChild(s);}
      b.addEventListener("click",function(){read(h.n,q);});var li=el("li");li.appendChild(b);ul.appendChild(li);});res.appendChild(ul);}
  i.addEventListener("input",function(){clearTimeout(T);T=setTimeout(show,140);});
  i.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();clearTimeout(T);show();}if(e.key==="Escape"&&i.value){e.preventDefault();e.stopPropagation();i.value="";show();}});}
/* the Folders page: the library's own card */
function home(host,U){var c=U.card("Your build library",null);host.appendChild(c);
  load().then(function(L){var m=L.meta;
    if(!m||!L.notes.length){c.appendChild(el("p","small muted","How each of your apps was built, filed by app and by part, kept on this device. Bring in your build library (the zip of notes) and each app's notes appear in its folder."));
      var r=el("div","fld-row");r.appendChild(btn("primary","Bring in the build library",function(){pick(repaint);}));c.appendChild(r);}
    else{var apps=Object.keys(m.apps||{});c.appendChild(el("p","small muted",m.count+" notes for "+apps.length+" app"+(apps.length===1?"":"s")+(m.at?", ":". ")+(m.at?"brought in on "+day(m.at)+". ":"")+"They are kept on this device and go with your backups and with Ingenium Cloud; each app's notes are in its folder, under How it was built. More notes or recipes brought in are added to these: a note with the same name in the same place is updated, and nothing else is removed."));
      var ap=el("div","bl-apps");apps.forEach(function(a){ap.appendChild(el("span",null,a+" · "+m.apps[a]));});c.appendChild(ap);
      var top=L.notes.filter(function(n){return !n.app;});if(top.length)c.appendChild(list(top));
      finder(c,L.notes,"Find a word in your build library",true);
      var r2=el("div","fld-row");r2.style.marginTop="10px";r2.appendChild(btn("","Bring in more notes",function(){pick(repaint);}));
      r2.appendChild(btn("ghost","Remove it from this device",function(){if(!confirm("Remove the build library from this device? Your zip and your folders are not touched."))return;save([],null).then(function(){say("The build library was removed from this device.");repaint();});}));c.appendChild(r2);}});}
/* an app's folder: How it was built */
function folder(p,host,U){var c=U.card("How it was built",null);c.hidden=true;host.appendChild(c);
  load().then(function(L){var mine=L.notes.filter(function(n){return n.app&&norm(n.app)===norm(p.name);});if(!mine.length){c.remove();return;}
    c.hidden=false;var h2=c.querySelector("h2");if(h2)h2.textContent="How it was built ("+mine.length+")";
    var rag=false;try{rag=!!(W.IngRag&&typeof IngRag.available==="function"&&IngRag.available());}catch(e){rag=false;}
    c.appendChild(el("p","small muted","From your build library: "+p.name+"'s own build notes, filed by part, in their own words."+(rag?" To ask about them in the chat, add the library's folder in Settings, Models and AI, Folders for the chat, then turn on Your folders.":"")));
    if(mine.length>3)finder(c,mine,"Find a word in "+p.name+"'s notes",false);
    var flat=mine.filter(function(n){return !n.group;}),start=flat.filter(function(n){return /^00 /.test(n.title);}),parts=flat.filter(function(n){return / history$/.test(n.title);}),rest=flat.filter(function(n){return start.indexOf(n)<0&&parts.indexOf(n)<0;});
    if(start.length){c.appendChild(el("p","bl-sub","Start here"));c.appendChild(list(start));}
    if(parts.length){c.appendChild(el("p","bl-sub","Its parts, each with its history in the build notes"));c.appendChild(list(parts));}
    if(rest.length){c.appendChild(el("p","bl-sub","Notes"));c.appendChild(list(rest));}
    var groups={};mine.forEach(function(n){if(n.group)(groups[n.group]=groups[n.group]||[]).push(n);});
    Object.keys(groups).sort().forEach(function(g){var d=el("details","bl-group");d.appendChild(el("summary",null,g.charAt(0).toUpperCase()+g.slice(1)+" ("+groups[g].length+")"));d.appendChild(list(groups[g]));c.appendChild(d);});});}
W.IngBuildLib={home:home,folder:folder,bring:bring,load:load,read:read,find:function(q,app){return load().then(function(L){return find(app?L.notes.filter(function(n){return norm(n.app)===norm(app);}):L.notes,q).map(function(h){return {path:h.n.path,app:h.n.app,title:shown(h.n),times:h.c,bit:h.bit};});});},unwrap:unwrap,_reset:function(){LIB=null;}};
try{window.__ingParts["p258"]="running";}catch(_){}
})();
</script>
