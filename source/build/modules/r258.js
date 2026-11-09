<style id="r258-css">
/* ============ R258 · THE BUILD LIBRARY IN FOLDERS (Ingenium 6.65, 8 November 2026) ============ */
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
#modalBox.bl-read{max-width:820px}
#modalBox .bl-reader h3{margin:0 0 4px}
#modalBox .bl-meta{margin:0 0 10px;color:var(--ink-3);overflow-wrap:anywhere}
#modalBox .bl-text{max-height:62vh;overflow:auto;border:1px solid var(--hairline);border-radius:12px;padding:6px 18px;background:var(--bg);color:var(--ink-1);font-size:14px;line-height:1.6;overflow-wrap:anywhere}
#modalBox .bl-text h1{font-size:19px;margin:12px 0 8px}#modalBox .bl-text h2{font-size:16px;margin:16px 0 6px}#modalBox .bl-text h3{font-size:14.5px;margin:14px 0 6px}
#modalBox .bl-text pre{white-space:pre-wrap}
#modalBox .bl-acts{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p258"]="started";}catch(_){}
/* ============ R258 · THE BUILD LIBRARY IN FOLDERS (Ingenium 6.65, 8 November 2026) ============
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
function load(){if(LIB)return Promise.resolve(LIB);if(LOADING)return LOADING;
  LOADING=idb().then(function(db){return new Promise(function(res){var t=db.transaction(["notes","meta"],"readonly"),out={notes:[],meta:null};
      t.objectStore("notes").getAll().onsuccess=function(e){out.notes=e.target.result||[];};
      t.objectStore("meta").get("lib").onsuccess=function(e){out.meta=e.target.result||null;};
      t.oncomplete=function(){db.close();res(out);};t.onerror=function(){db.close();res({notes:[],meta:null});};});})
    .then(function(x){LIB=x;LOADING=null;return x;},function(){LOADING=null;LIB={notes:[],meta:null};return LIB;});
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
  .then(function(notes){var apps={};notes.forEach(function(n){if(n.app)apps[n.app]=(apps[n.app]||0)+1;});
    var meta={at:Date.now(),count:notes.length,apps:apps,name:String(file.name||"").slice(0,120)};
    return save(notes,meta).then(function(){var made=[];
      try{var have=(W.IngFolders&&IngFolders.folders?IngFolders.folders():[]).map(function(p){return norm(p.name);});
        /* her order of the apps (8 November 2026), then the rest by name; a folder is made with its name only: the parts' names (Scriba,
           Fontes, Focus ...) also name parts of Ingenium, and as a folder's words they would sort other conversations into it */
        var ORDER=['carpe diem','forge','ingenium','inkwell','lakay','offline project'];
        Object.keys(apps).sort(function(x,y){var i=ORDER.indexOf(norm(x)),j=ORDER.indexOf(norm(y));i=i<0?99:i;j=j<0?99:j;return i-j||x.localeCompare(y);})
          .forEach(function(a){if(have.indexOf(norm(a))<0&&W.IngFolders&&IngFolders.make(a))made.push(a);});}catch(e){}
      return {meta:meta,made:made};});});}
function pick(then){var i=el("input");i.type="file";i.accept=".zip,application/zip";i.style.display="none";D.body.appendChild(i);
  i.addEventListener("change",function(){var f=i.files&&i.files[0];i.remove();if(!f)return;say("Reading the build library…");
    bring(f).then(function(r){say(r.meta.count+" notes kept for "+Object.keys(r.meta.apps).length+" apps"+(r.made.length?"; folders made for "+r.made.join(", "):"")+".");if(then)then(r);},
      function(e){say("The build library could not be read: "+(e&&e.message||e)+".");});});
  i.click();}
function repaint(){try{IngFolders.paint();}catch(e){}}
function read(n){var box=D.getElementById("modalBox"),root=D.getElementById("modalRoot");if(!box||typeof openModal!=="function")return;var from=D.activeElement;
  box.innerHTML="";box.classList.add("bl-read");var w=el("div","bl-reader");w.setAttribute("role","document");
  w.appendChild(el("h3",null,shown(n)+(/ history$/.test(n.title)?": its history":"")));
  w.appendChild(el("p","small muted bl-meta",(n.app?n.app+(n.group?" · "+n.group:"")+" · ":"")+n.words+" words"+(n.src?" · from "+n.src:"")));
  var t=el("div","bl-text md");t.tabIndex=0;try{t.innerHTML=typeof chatMd==="function"?chatMd(n.text):esc(n.text).replace(/\n/g,"<br>");}catch(e){t.textContent=n.text;}w.appendChild(t);
  var a=el("div","bl-acts"),c=btn("primary small","Close",function(){try{closeModal();}catch(_){}});a.appendChild(c);w.appendChild(a);box.appendChild(w);
  var mo=new MutationObserver(function(){if(!root||!root.classList.contains("open")||!box.querySelector(".bl-reader")){box.classList.remove("bl-read");mo.disconnect();try{if(from&&from.focus)from.focus();}catch(_){}}});
  if(root)mo.observe(root,{attributes:true,attributeFilter:["class"]});mo.observe(box,{childList:true});
  openModal();try{c.focus();}catch(e){}}
function shown(n){var t=n.title.replace(/^00\s+/,"").replace(/ history$/,"");if(t===t.toUpperCase())t=t.toLowerCase();return t.charAt(0).toUpperCase()+t.slice(1);}
function row(n){var b=el("button","bl-row");b.type="button";b.appendChild(el("b",null,shown(n)));b.appendChild(el("small",null,n.words+" words"));b.title="Read "+shown(n)+(/ history$/.test(n.title)?": its history in the build notes":"");b.addEventListener("click",function(){read(n);});var li=el("li");li.appendChild(b);return li;}
function order(a,b){var rk=function(n){return /^00 Index/i.test(n.title)?0:/^00 How I build/i.test(n.title)?0:/^00 /.test(n.title)?1:2;},ia=rk(a),ib=rk(b);if(ia!==ib)return ia-ib;
  var va=/(\d+)\.(\d+)(?:\.(\d+))?/.exec(a.title),vb=/(\d+)\.(\d+)(?:\.(\d+))?/.exec(b.title);
  if(va&&vb){for(var i=1;i<4;i++){var x=+(va[i]||0),y=+(vb[i]||0);if(x!==y)return y-x;}}
  return a.title.localeCompare(b.title);}
function list(notes){var ul=el("ul","bl-list");notes.slice().sort(order).forEach(function(n){ul.appendChild(row(n));});return ul;}
/* the Folders page: the library's own card */
function home(host,U){var c=U.card("Your build library",null);host.appendChild(c);
  load().then(function(L){var m=L.meta;
    if(!m||!L.notes.length){c.appendChild(el("p","small muted","How each of your apps was built, filed by app and by part, kept on this device. Bring in your build library (the zip of notes) and each app's notes appear in its folder."));
      var r=el("div","fld-row");r.appendChild(btn("primary","Bring in the build library",function(){pick(repaint);}));c.appendChild(r);}
    else{var apps=Object.keys(m.apps||{});c.appendChild(el("p","small muted",m.count+" notes for "+apps.length+" app"+(apps.length===1?"":"s")+", brought in on "+day(m.at)+". They stay on this device; each app's notes are in its folder, under How it was built."));
      var ap=el("div","bl-apps");apps.forEach(function(a){ap.appendChild(el("span",null,a+" · "+m.apps[a]));});c.appendChild(ap);
      var top=L.notes.filter(function(n){return !n.app;});if(top.length)c.appendChild(list(top));
      var r2=el("div","fld-row");r2.style.marginTop="10px";r2.appendChild(btn("","Bring in a newer copy",function(){pick(repaint);}));
      r2.appendChild(btn("ghost","Remove it from this device",function(){if(!confirm("Remove the build library from this device? Your zip and your folders are not touched."))return;save([],null).then(function(){say("The build library was removed from this device.");repaint();});}));c.appendChild(r2);}});}
/* an app's folder: How it was built */
function folder(p,host,U){var c=U.card("How it was built",null);c.hidden=true;host.appendChild(c);
  load().then(function(L){var mine=L.notes.filter(function(n){return n.app&&norm(n.app)===norm(p.name);});if(!mine.length){c.remove();return;}
    c.hidden=false;var h2=c.querySelector("h2");if(h2)h2.textContent="How it was built ("+mine.length+")";
    var rag=false;try{rag=!!(W.IngRag&&typeof IngRag.available==="function"&&IngRag.available());}catch(e){rag=false;}
    c.appendChild(el("p","small muted","From your build library: "+p.name+"'s own build notes, filed by part, in their own words."+(rag?" To ask about them in the chat, add the library's folder in Settings, Models and AI, Folders for the chat, then turn on Your folders.":"")));
    var flat=mine.filter(function(n){return !n.group;}),start=flat.filter(function(n){return /^00 /.test(n.title);}),parts=flat.filter(function(n){return / history$/.test(n.title);}),rest=flat.filter(function(n){return start.indexOf(n)<0&&parts.indexOf(n)<0;});
    if(start.length){c.appendChild(el("p","bl-sub","Start here"));c.appendChild(list(start));}
    if(parts.length){c.appendChild(el("p","bl-sub","Its parts, each with its history in the build notes"));c.appendChild(list(parts));}
    if(rest.length){c.appendChild(el("p","bl-sub","Notes"));c.appendChild(list(rest));}
    var groups={};mine.forEach(function(n){if(n.group)(groups[n.group]=groups[n.group]||[]).push(n);});
    Object.keys(groups).sort().forEach(function(g){var d=el("details","bl-group");d.appendChild(el("summary",null,g.charAt(0).toUpperCase()+g.slice(1)+" ("+groups[g].length+")"));d.appendChild(list(groups[g]));c.appendChild(d);});});}
W.IngBuildLib={home:home,folder:folder,bring:bring,load:load,read:read,_reset:function(){LIB=null;}};
try{window.__ingParts.p258="ok";}catch(_){}
})();
</script>
