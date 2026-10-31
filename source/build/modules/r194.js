<style id="r194-css">
/* ============ R194 · ONE ECOSYSTEM: A DOCUMENT MADE ANYWHERE OPENS IN ITS APP (Ingenium 6.9.1, 30 October 2026) ============
   The owner's words (30 October 2026): "I want Ingenium and all of its mini apps to work as one ecosystem the same way
   that Carpe Diem does, same for the Forge. I want the Word documents created on the Chats page, Lector Page or Career
   studio to be able to be sent and opened in Tabula or the Excel spreadsheets to be able to be opened in Abacus, and the
   powerpoint slides in Imago and so forth. [...] I want every page and feature to be aware of each other and the rest of
   the app."
   Until now a document went to Tabula as loose web text through a storage line (its fonts, crests and footers lost, and
   appended to whatever Tabula held), a spreadsheet went to Abacus as CSV (its formulas flattened), and slides had no way
   to Imago at all. Each of the three apps already carries Carpe Diem's own file opener (__cdOpenFile: a Word file into
   Tabula, an Excel workbook into Abacus, a PowerPoint deck into Imago). So now the very file a key would save (the Word
   file as the page shows it, the workbook with its formulas, the deck with its notes) is handed to the app's opener
   instead: from the chat's cards (Tabula, Abacus and a new Imago key), from the reading page's and the Career Studio's
   documents (Open in Tabula), and from inside each app (a From Ingenium key in Tabula's File menu, beside Abacus's
   Open .xlsx and Imago's Open .pptx) that lists what the chat and the studios have made. An app that is holding work is
   never overwritten unasked: the document opens in a second window, unless she chooses to replace. */
.ing-from-key{font:inherit}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p194"]="started";}catch(_){}
(function(){"use strict";
if(window.IngOpenIn)return;
var W=window;
var APPS={tabula:{name:"Tabula",kinds:["doc"]},abacus:{name:"Abacus",kinds:["sheet"]},slides:{name:"Imago",kinds:["deck"]}};
var MIME={docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",html:"text/html",htm:"text/html",txt:"text/plain",md:"text/markdown",csv:"text/csv",tsv:"text/tab-separated-values"};
function toast(t){try{ingToast(t);}catch(e){}}
function fileName(t){try{return lxFileName(t);}catch(e){return String(t||"document").replace(/[\\\/:*?"<>|]+/g,"-").replace(/\s+/g," ").trim().slice(0,120)||"document";}}
function extOf(n){var m=/\.([a-z0-9]+)$/i.exec(String(n||""));return m?m[1].toLowerCase():"";}
/* which app a file belongs to, by its name, as Carpe Diem decides it */
function appFor(name){var e=extOf(name);if(/^(docx|doc|html|htm|txt|md|markdown)$/.test(e))return "tabula";if(/^(xlsx|csv|tsv)$/.test(e))return "abacus";if(e==="pptx")return "slides";return "";}
function bytesOf(b){if(b instanceof Uint8Array)return b;if(b instanceof ArrayBuffer)return new Uint8Array(b);if(typeof b==="string")return new TextEncoder().encode(b);try{return new Uint8Array(b);}catch(e){return new Uint8Array(0);}}

/* ---------- 1. the file the app opens: the same bytes a Save key gives ---------- */
function fileOf(app,doc){doc=doc||{};var title=String(doc.title||"Document");
  if(doc.file&&doc.file.bytes!=null)return Promise.resolve({name:String(doc.file.name||fileName(title)),mime:String(doc.file.mime||MIME[extOf(doc.file.name)]||"application/octet-stream"),bytes:bytesOf(doc.file.bytes)});
  if(app==="tabula"){
    if(doc.md!=null){var md=String(doc.md);
      if(W.IngDoc&&typeof IngDoc.docx==="function")return IngDoc.docx(title,md).then(function(r){return {name:fileName(title)+".docx",mime:MIME.docx,bytes:bytesOf(r&&r.bytes)};},
        function(){return {name:fileName(title)+".docx",mime:MIME.docx,bytes:bytesOf(lxDocx(title,md))};});
      return Promise.resolve({name:fileName(title)+".docx",mime:MIME.docx,bytes:bytesOf(lxDocx(title,md))});}
    if(doc.html!=null)return Promise.resolve({name:fileName(title)+".html",mime:MIME.html,bytes:bytesOf(String(doc.html))});}
  if(app==="abacus"){
    if(doc.rows)return Promise.resolve({name:fileName(title)+".xlsx",mime:MIME.xlsx,bytes:bytesOf(shXlsx(title,doc.rows))});
    if(doc.csv!=null)return Promise.resolve({name:fileName(title)+".csv",mime:MIME.csv,bytes:bytesOf("\uFEFF"+String(doc.csv))});}
  if(app==="slides"&&doc.deck)return Promise.resolve({name:fileName(title)+".pptx",mime:MIME.pptx,bytes:bytesOf(slPptx(doc.deck))});
  return Promise.reject(new Error("There is nothing here that "+(APPS[app]||{}).name+" opens."));}

/* ---------- 2. the frames an app is running in, and whether each holds work ---------- */
function frames(app){var A=W.IngApps2,F=(A&&A.frames)||{},out=[];
  ["desk:"+app,"fw:"+app,"fw:"+app+"-2","fw:"+app+"-3"].forEach(function(k){var f=F[k];if(f&&f.isConnected)out.push({key:k,ifr:f});});return out;}
function winOf(x){try{return x.ifr.contentWindow;}catch(e){return null;}}
function ready(x){try{var w=winOf(x);return !!(w&&typeof w.__cdOpenFile==="function"&&w.document&&w.document.body&&w.document.readyState!=="loading");}catch(e){return false;}}
function busy(app,x){try{var w=winOf(x);if(!w)return false;
    if(app==="tabula"){var c=typeof w.__tabulaCapture==="function"?w.__tabulaCapture():null,t=c?(c.html||c.text||c.body||c.content||""):"";return String(t).replace(/<[^>]*>/g,"").replace(/&nbsp;|\s/g,"").length>0;}
    if(app==="abacus"){var b=typeof w.__ingBook==="function"?w.__ingBook():null,d=b&&b.data;if(!d)return false;var ks=Object.keys(d);
      for(var i=0;i<ks.length;i++){var v=d[ks[i]];if(v==null)continue;var s=typeof v==="object"?(v.v!=null?v.v:(v.f!=null?v.f:(v.raw!=null?v.raw:(v.value!=null?v.value:"")))):v;if(String(s).trim())return true;}return false;}
    if(app==="slides"){var api=w.__imAPI,s=api&&typeof api.slides==="function"?api.slides():null;if(!s||!s.length)return false;if(s.length>1)return true;var one=s[0]||{};
      return !!String((one.title||"")+(one.body||one.text||"")+(one.sub||"")).replace(/\s/g,"").length;}}catch(e){}return false;}
function waitReady(x,ms){return new Promise(function(res,rej){var t0=Date.now();(function tick(){if(ready(x))return res(x);if(Date.now()-t0>(ms||20000))return rej(new Error(APPS[x.app]?APPS[x.app].name+" did not open in time.":"The app did not open in time."));setTimeout(tick,120);})();});}
function hand(app,x,file){var w=winOf(x);var f;try{f=new File([file.bytes],file.name,{type:file.mime});}catch(e){f=new Blob([file.bytes],{type:file.mime});f.name=file.name;}
  /* what the app holds is written to its own store first, so its last state is kept */
  try{if(app==="tabula"&&typeof w.__tabulaFlush==="function")w.__tabulaFlush();}catch(e){}
  try{if(app==="slides"&&w.__imAPI&&typeof w.__imAPI.save==="function")w.__imAPI.save();}catch(e){}
  w.__cdOpenFile(f);
  /* the workbook's name: Abacus's own reader keeps the sheets' names, not the book's */
  if(app==="abacus"){var want=file.name.replace(/\.[^.]+$/,""),t0=Date.now();(function name(){try{if(w.__abImported||Date.now()-t0>8000){var t=w.document.getElementById("docTitle");
      if(t){t.value=want;try{t.dispatchEvent(new w.Event("input",{bubbles:true}));t.dispatchEvent(new w.Event("change",{bubbles:true}));}catch(e){}}return;}}catch(e){return;}setTimeout(name,150);})();}}
function surface(app,x){var D=W.IngDesk;if(!D)return;if(x.key.indexOf("desk:")===0)D.open(app);else if(typeof D.surface==="function")D.surface(x.key.slice(3));}

/* ---------- 3. open: the document, in its app ---------- */
function open(app,doc,opts){opts=opts||{};if(!APPS[app])return Promise.reject(new Error("No such app."));
  var D=W.IngDesk,A=W.IngApps2;if(!D||!A){toast("The apps are not inside this copy of the page.");return Promise.reject(new Error("no apps"));}
  var name=APPS[app].name,what=String((doc&&doc.title)||"the document");toast("Opening in "+name+"…");
  return fileOf(app,doc).then(function(file){
    var live=frames(app).filter(ready);live.forEach(function(x){x.app=app;});
    function into(x){hand(app,x,file);surface(app,x);toast(name+" has "+what+".");return {app:app,frame:x.key,name:file.name};}
    if(opts.frame){var tgt=live.filter(function(x){return winOf(x)===opts.frame;})[0];if(tgt)return into(tgt);}
    if(!live.length){
      D.open(app);var fs=frames(app),x0=fs.filter(function(x){return x.key==="desk:"+app;})[0]||fs[0];if(!x0)throw new Error(name+" could not be opened.");x0.app=app;
      return waitReady(x0).then(function(){return into(x0);});}
    var x=live[0];if(opts.replace||!busy(app,x))return into(x);
    var ask=typeof W.ingAsk==="function"?ingAsk({title:name+" is holding work",text:"Open \u201c"+what+"\u201d in a second "+name+" window, and leave what is there as it is? Or replace what "+name+" holds with it (what is not saved there is lost).",yes:"Replace it",no:"A second window"}):Promise.resolve(false);
    return ask.then(function(replace){if(replace)return into(x);
      var st=D.state(),n=2;while(st.windows.indexOf(app+"-"+n)>=0&&n<3)n++;
      if(st.windows.indexOf(app+"-"+n)>=0){var had=frames(app).filter(function(y){return y.key==="fw:"+app+"-"+n;})[0];if(had&&ready(had)){had.app=app;return into(had);}}
      var win=D.window(app,n);if(!win)throw new Error("A second "+name+" window could not be opened.");
      var x2=frames(app).filter(function(y){return y.key==="fw:"+app+"-"+n;})[0];if(!x2)throw new Error("A second "+name+" window could not be opened.");x2.app=app;
      return waitReady(x2).then(function(){return into(x2);});});})
  .then(null,function(e){toast("It could not be opened in "+name+": "+(e&&e.message||e));throw e;});}

/* ---------- 4. the chat's cards: Tabula, Abacus, and now Imago, hand the very file ---------- */
W.lxToTabula=function(title,md){return open("tabula",{title:title,md:md});};
W.shToAbacus=function(sh){return open("abacus",{title:sh.title,rows:sh.rows});};
(function(){if(typeof W.slCard!=="function"||W.slCard.__r194)return;var o=W.slCard;
  W.slCard=slCard=function(mm,d,live,ix){var w=o.apply(this,arguments);try{if(!live&&w){var row=w.querySelector(".mk-card-acts");
      if(row&&!row.querySelector("[data-openin]")){var b=document.createElement("button");b.type="button";b.className="msg-act";b.setAttribute("data-openin","slides");b.textContent="Imago";
        b.title="Open it in Imago, Ingenium's own slides, to keep working on it";b.onclick=function(){open("slides",{title:d.title,deck:d});};
        var last=row.lastElementChild;if(last&&/^Copy$/.test(last.textContent.trim()))row.insertBefore(b,last);else row.appendChild(b);}}}catch(e){}return w;};W.slCard.__r194=1;})();

/* ---------- 5. what the chat and the studios have made, for the apps to list ---------- */
var providers=[];
function list(){var out=[];
  try{(state.chats||[]).forEach(function(c){var ms=c.messages;if(!ms||!ms.length)return;ms.forEach(function(mm,i){if(mm.role!=="bot"||!mm.text)return;var t=String(mm.text),from="Chat"+(c.title?" · "+c.title:""),when=mm.done||mm.at||c.updated||c.made||0;
      try{mkDocsOf(t).forEach(function(d,k){if(!d.done)return;out.push({id:"chat:"+c.id+":"+i+":d"+k,kind:"doc",title:d.title,from:from,when:when,open:function(o){return open("tabula",{title:d.title,md:d.md},o);}});});}catch(e){}
      try{W.Sheets&&Sheets.sheetsOf(t).forEach(function(s,k){if(!s.done)return;out.push({id:"chat:"+c.id+":"+i+":s"+k,kind:"sheet",title:s.title,from:from,when:when,open:function(o){return open("abacus",{title:s.title,rows:s.rows},o);}});});}catch(e){}
      try{W.Sheets&&Sheets.decksOf(t).forEach(function(d,k){if(!d.done)return;out.push({id:"chat:"+c.id+":"+i+":k"+k,kind:"deck",title:d.title,from:from,when:when,open:function(o){return open("slides",{title:d.title,deck:d},o);}});});}catch(e){}});});}catch(e){}
  providers.forEach(function(p){try{(p.list()||[]).forEach(function(it){if(it&&it.id&&it.kind)out.push(it);});}catch(e){}});
  out.sort(function(a,b){return (b.when||0)-(a.when||0);});return out;}

/* ---------- 6. the apps' requests: the list, a document chosen, and a file Imago downloads ---------- */
W.addEventListener("message",function(ev){var d=ev&&ev.data;if(!d||typeof d.kind!=="string")return;var A=W.IngApps2,F=(A&&A.frames)||{},src=null;
  for(var k in F){if(F[k]&&F[k].contentWindow===ev.source)src=F[k];}if(!src)return;var app=src.getAttribute("data-app")||"";
  if(d.kind==="carpe-download"){try{var bytes;if(d.encoding==="base64"){var bin=atob(String(d.data||"")),u8=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);bytes=u8;}else bytes=new TextEncoder().encode(String(d.data||""));
      saveFileNative(String(d.filename||"download"),String(d.mime||"application/octet-stream"),bytes);}catch(e){toast("The file could not be saved: "+(e&&e.message||e));}return;}
  if(d.kind==="ing-docs-list"){var kinds=(APPS[app]||{}).kinds||[],items=list().filter(function(it){return kinds.indexOf(it.kind)>=0;}).slice(0,80).map(function(it){return {id:it.id,title:it.title,from:it.from,when:it.when,kind:it.kind};});
    try{ev.source.postMessage({kind:"ing-docs",items:items},"*");}catch(e){}return;}
  if(d.kind==="ing-open-doc"){var it=list().filter(function(x){return x.id===d.id;})[0];if(!it){toast("That document is no longer here.");return;}it.open({frame:ev.source,replace:true});return;}});

/* ---------- 7. From Ingenium, inside each app (the key, and the list it opens), written into the app's page ---------- */
function inFrame(which){var key;
  if(which==="tabula")key='var m=document.getElementById("fileMenu");if(!m||m.querySelector("[data-fm=\\"ing\\"]"))return;var after=m.querySelector("[data-fm=\\"docs\\"]");if(!after)return;'
    +'var b=document.createElement("button");b.className="fm-item";b.setAttribute("data-fm","ing");b.innerHTML="From Ingenium <span class=\\"chev\\">made in the chat and the studios</span>";'
    +'b.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();try{m.classList.remove("open");}catch(x){}ask();},true);after.parentNode.insertBefore(b,after.nextSibling);';
  else if(which==="abacus")key='var o=document.getElementById("abOpenXlsx");if(!o||document.getElementById("abFromIng"))return;var b=o.cloneNode(true);b.id="abFromIng";'
    +'b.innerHTML=o.innerHTML.replace(/Open \\.xlsx/,"From Ingenium");b.title="A spreadsheet made in Ingenium\\u2019s chat";b.addEventListener("click",function(e){e.preventDefault();ask();});o.parentNode.insertBefore(b,o.nextSibling);';
  else key='var all=document.querySelectorAll("button"),o=null;for(var i=0;i<all.length;i++){if(/Open \\.pptx/.test(all[i].textContent||"")){o=all[i];break;}}if(!o||document.getElementById("imFromIng"))return;'
    +'var b=o.cloneNode(true);b.id="imFromIng";b.innerHTML=o.innerHTML.replace(/Open \\.pptx/,"From Ingenium");b.title="Slides made in Ingenium\\u2019s chat";b.addEventListener("click",function(e){e.preventDefault();ask();});o.parentNode.insertBefore(b,o.nextSibling);';
  return '(function(){var W='+JSON.stringify(which)+',panel=null;'
    +'function ask(){try{parent.postMessage({kind:"ing-docs-list",which:W},"*");}catch(e){}}'
    +'function close(){if(panel){panel.remove();panel=null;}}'
    +'function show(items){close();panel=document.createElement("div");panel.id="ingFromPanel";panel.setAttribute("role","dialog");panel.setAttribute("aria-label","From Ingenium");'
    +'panel.style.cssText="position:fixed;z-index:2147483000;left:50%;top:12%;transform:translateX(-50%);width:min(560px,92vw);max-height:72vh;overflow:auto;background:#fff;color:#1d1d1f;border:1px solid rgba(0,0,0,.18);border-radius:12px;box-shadow:0 18px 50px rgba(0,0,0,.28);padding:14px 16px;font:14px/1.45 system-ui,-apple-system,Segoe UI,sans-serif";'
    +'var h=document.createElement("div");h.style.cssText="font:600 16px/1.3 Georgia,serif;margin:0 0 6px";h.textContent="From Ingenium";panel.appendChild(h);'
    +'var p=document.createElement("div");p.style.cssText="opacity:.75;margin:0 0 10px";p.textContent=items.length?"Made in Ingenium\\u2019s chat and studios. Choose one to open it here; what is open now is replaced.":"Nothing yet. What the chat and the studios make appears here.";panel.appendChild(p);'
    +'items.forEach(function(it){var b=document.createElement("button");b.type="button";b.className="ing-from-item";b.style.cssText="display:block;width:100%;text-align:left;padding:8px 10px;margin:0 0 6px;border:1px solid rgba(0,0,0,.14);border-radius:8px;background:#f7f7f9;cursor:pointer;font:inherit;color:inherit";'
    +'var t=document.createElement("b");t.textContent=it.title;var s=document.createElement("small");s.style.display="block";s.style.opacity=".7";var when="";try{if(it.when)when=" \\u00b7 "+new Date(it.when).toLocaleDateString();}catch(e){}s.textContent=it.from+when;b.appendChild(t);b.appendChild(s);'
    +'b.onclick=function(){try{parent.postMessage({kind:"ing-open-doc",id:it.id,which:W},"*");}catch(e){}close();};panel.appendChild(b);});'
    +'var c=document.createElement("button");c.type="button";c.textContent="Cancel";c.style.cssText="margin-top:6px;padding:6px 12px;border:1px solid rgba(0,0,0,.2);border-radius:8px;background:#fff;cursor:pointer;font:inherit";c.onclick=close;panel.appendChild(c);document.body.appendChild(panel);try{c.focus();}catch(e){}}'
    +'document.addEventListener("keydown",function(e){if(e.key==="Escape"&&panel){close();e.stopPropagation();}},true);'
    +'window.addEventListener("message",function(ev){var d=ev&&ev.data;if(!d||d.kind!=="ing-docs")return;show(d.items||[]);});'
    +'function key(){try{'+key+'}catch(e){}}'
    +'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",key);else key();setInterval(key,1200);})();';}
(function(){var A=W.IngApps2;if(!A||typeof A.prep!=="function"||A.prep.__r194)return;var o=A.prep;
  A.prep=function(which,opts){var html=o.apply(this,arguments);if(!html||!APPS[which])return html;
    var s='<script id="ing-from-ingenium">'+inFrame(which)+'<\/script>';var bi=html.lastIndexOf("</body>");return bi>=0?html.slice(0,bi)+s+html.slice(bi):html+s;};A.prep.__r194=1;})();

W.IngOpenIn={open:open,list:list,appFor:appFor,fileOf:fileOf,frames:frames,register:function(p){if(p&&typeof p.list==="function")providers.push(p);},providers:providers,apps:APPS};
/* the pages that loaded before this one left their lists in a queue */
try{(W.__ingOpenInProviders||[]).forEach(function(p){W.IngOpenIn.register(p);});W.__ingOpenInProviders={push:function(p){W.IngOpenIn.register(p);}};}catch(e){}
})();
;try{window.__ingParts["p194"]="running";}catch(_){}
</script>
