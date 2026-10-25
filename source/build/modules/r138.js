<style id="r138-css">
/* ============ R138 · BUILD, FOR WHOLE APPS OF ANY SIZE ============
   The owner's words (20 October 2026): "I want the Build page to be more capable because I tried to download my apps through
   there but it would not transfer the HTML app because it said that it was too strong for the Build page", and: "every page
   of Ingenium MUST be strong and capable to properly edit and curate and customise all of my apps even Ingenium and be able
   to recreate them or make new apps"; "I need it to be able to edit the full apps no matter their sizes and features".
   Build was one text box that ran the page again at every key pressed, so it refused any page over 3 MB ("too large for the
   Build editor to stay quick"); the owner's apps are 3 to 41 MB. Now a large page (6.7: up to the editor's limit, 480 MB on a computer and 128 MB on a tablet or phone) opens part by part: each script, each style
   and each stretch of markup is a part of its own, written in a box of its own (quick, whatever the whole), embedded data
   (pictures, the apps an app carries) stands aside as data, a search finds a word anywhere in the whole page, and the whole
   app runs in the preview when asked. A small page opens in the one box, as before. */
#bdBox{display:none;flex-direction:column;min-height:0;flex:1 1 auto;gap:8px}
.bd-large #bdBox{display:flex}
.bd-large #codeEditor{display:none !important}
.bd-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12.5px;color:var(--ink-2)}
.bd-head b{font:600 15px/1.2 var(--serif);color:var(--ink-1)}
.bd-head .bd-chip{font-size:11.5px;font-weight:600;padding:2px 9px;border-radius:999px;background:var(--accent-softer,rgba(106,63,181,.08));color:var(--accent,#6a3fb5)}
.bd-head .bd-chip.warn{background:rgba(184,116,46,.12);color:#9a5a12}
.bd-tools{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.bd-tools input[type="search"]{flex:1 1 200px;min-width:140px;border-radius:999px;padding:6px 12px;border:1px solid var(--hairline,rgba(0,0,0,.12));background:var(--card-hi,#fff);color:var(--ink-1);font:13px var(--sans)}
.bd-body{display:flex;gap:8px;min-height:0;flex:1 1 auto}
.bd-parts{flex:0 0 clamp(190px,32%,300px);overflow:auto;border:1px solid var(--hairline,rgba(0,0,0,.1));border-radius:12px;padding:5px;background:var(--card-hi,#fff);scrollbar-width:thin}
.bd-part{display:flex;align-items:center;gap:6px;width:100%;text-align:left;border:0;background:transparent;border-radius:8px;padding:5px 7px;cursor:pointer;font:12px/1.3 var(--sans);color:var(--ink-1);transition:background .15s,transform .16s cubic-bezier(.34,1.35,.64,1)}
.bd-part:hover{background:var(--accent-softer,rgba(106,63,181,.08));transform:translateX(2px)}
.bd-part[aria-pressed="true"]{background:var(--accent-softer,rgba(106,63,181,.12));color:var(--accent,#6a3fb5);font-weight:600}
.bd-part i{font-style:normal;flex:0 0 auto;width:34px;font:600 9.5px var(--mono,monospace);text-transform:uppercase;color:var(--ink-3);letter-spacing:.04em}
.bd-part span{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bd-part small{flex:0 0 auto;color:var(--ink-3);font-size:10.5px;font-variant-numeric:tabular-nums}
.bd-part.changed span::after{content:" •";color:var(--accent,#6a3fb5)}
.bd-part.data{opacity:.75}
.bd-edit{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:6px;min-height:0}
#bdText{flex:1 1 auto;min-height:260px;width:100%;resize:none;font:12.5px/1.5 var(--mono,ui-monospace,Menlo,monospace);border-radius:12px;border:1px solid var(--hairline,rgba(0,0,0,.12));padding:10px 12px;background:var(--card-hi,#fff);color:var(--ink-1);white-space:pre;overflow:auto;tab-size:2}
.bd-note{font-size:12px;color:var(--ink-3);line-height:1.45}
.bd-hits{max-height:34%;overflow:auto;border:1px solid var(--hairline,rgba(0,0,0,.1));border-radius:10px;padding:4px;display:none}
.bd-hits.on{display:block}
.bd-hit{display:block;width:100%;text-align:left;border:0;background:transparent;border-radius:7px;padding:4px 7px;cursor:pointer;font:11.5px/1.4 var(--mono,monospace);color:var(--ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bd-hit:hover{background:var(--accent-softer,rgba(106,63,181,.08))}
.bd-hit b{color:var(--accent,#6a3fb5)}
.bd-open-list{display:grid;gap:7px;margin:8px 0 4px}
@media (max-width:920px){.bd-body{flex-direction:column}.bd-parts{flex:0 0 auto;max-height:180px}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p59"]="started";}catch(_){}
/* R138 · BUILD, FOR WHOLE APPS OF ANY SIZE. See the note at the top of its styles. IngBuild.open({name, text, repo, path,
   title}) opens a page here (Fabrica, Chat's and Code's stage, Lector, any file); IngBuild.text() is the whole page. A page
   over LARGE characters opens part by part; the page is kept in the large store (IngBig), never in the desk's record, and
   the Build page no longer runs it again on every start: it runs when asked. */
(function r138(){
"use strict";
if(!document.getElementById("codeEditor")||typeof IngBig==="undefined")return;
function $(id){return document.getElementById(id);}
function E(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function fb(n){return typeof fmtBytes==="function"?fmtBytes(n):Math.round(n/1024)+" KB";}
function keep(){try{saveState();}catch(e){}}
function toast(m){try{ingToast(m);}catch(e){}}
var LARGE=2500000,DATA_AT=400000,MARKUP_PIECE=160000;
var BD=null;   /* {name, title, repo, path, parts:[{kind,label,text,changed}], sel, ref} */

/* ---------- a page, part by part ---------- */
function labelOf(kind,text){var head=text.slice(0,600),m;
  if((m=/^<(?:script|style)\b[^>]*\bid=["']([^"']+)["']/i.exec(head)))return "#"+m[1];
  if((m=/\/\*\s*=*\s*([^*\n=]{3,90})/.exec(head)))return m[1].trim();
  if((m=/^\s*(?:<script[^>]*>)?\s*\/\/\s*([^\n]{3,80})/i.exec(head)))return m[1].trim();
  if(kind==="markup"){m=/<([a-z][\w-]*)\b([^>]*)>/i.exec(head);if(m){var id=/\bid=["']([^"']+)/i.exec(m[2]),cl=/\bclass=["']([^"'\s]+)/i.exec(m[2]);return "<"+m[1].toLowerCase()+(id?"#"+id[1]:cl?"."+cl[1]:"")+">";}}
  var t=text.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim();return t.slice(0,60)||kind;}
function isDataScript(open,body){var ty=/\btype=["']([^"']+)["']/i.exec(open);var t=ty?ty[1].toLowerCase():"";
  if(t&&!/^(text\/javascript|application\/javascript|module|text\/ecmascript)$/.test(t)&&body.length>DATA_AT)return true;
  if(body.length>DATA_AT){var sample=body.slice(0,4000),b64=(sample.match(/[A-Za-z0-9+\/=]/g)||[]).length;if(b64/sample.length>0.97)return true;}return false;}
function split(text){var parts=[],re=/<(script|style)\b[^>]*>/gi,m,last=0;
  function markup(s){var i=0;while(i<s.length){var end=Math.min(s.length,i+MARKUP_PIECE);if(end<s.length){var cut=s.lastIndexOf("\n<",end);if(cut>i+MARKUP_PIECE/3)end=cut+1;}var piece=s.slice(i,end);if(piece)parts.push({kind:"markup",text:piece});i=end;}}
  while((m=re.exec(text))){var tag=m[1].toLowerCase(),openEnd=re.lastIndex,cre=new RegExp("<\\/"+tag,"ig");cre.lastIndex=openEnd;var c=cre.exec(text);
    var end=c?text.indexOf(">",c.index)+1:text.length;if(end<=0)end=text.length;
    markup(text.slice(last,m.index));var block=text.slice(m.index,end),body=text.slice(openEnd,c?c.index:end);
    parts.push({kind:tag==="script"&&isDataScript(m[0],body)?"data":tag,text:block});last=end;re.lastIndex=end;}
  markup(text.slice(last));
  parts.forEach(function(p){p.label=labelOf(p.kind,p.text);if(p.kind!=="data"&&p.text.length>DATA_AT){var sample=p.text.slice(0,4000),b=(sample.match(/[A-Za-z0-9+\/=]/g)||[]).length;if(b/sample.length>0.97&&p.text.length>1048576)p.kind="data";}});
  return parts;}
function whole(){return BD?BD.parts.map(function(p){return p.text;}).join(""):$("codeEditor").value;}

/* ---------- opening a page ---------- */
var saveT=0;
function store(){if(!BD)return Promise.resolve();var t=whole();var id=BD.ref||IngBig.newId();BD.ref=id;
  state.buildDoc={ref:id,name:BD.name,title:BD.title||"",repo:BD.repo||"",path:BD.path||"",chars:t.length};state.build="";keep();return IngBig.put(id,t);}
function storeSoon(){clearTimeout(saveT);saveT=setTimeout(store,1500);}
function open(o){o=o||{};var text=String(o.text||"");try{go("build");}catch(e){}
  if(text.length<=LARGE&&!o.parts){BD=null;$("buildGrid").classList.remove("bd-large");$("codeEditor").value=text;
    if(o.repo){state.buildDoc={repo:o.repo,path:o.path||"",name:o.name||"",title:o.title||"",small:true};keep();}else{delete state.buildDoc;keep();}
    paintLink();try{$("codeEditor").dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}try{window.runBuild();}catch(e){}
    toast((o.title||o.name||"The page")+" is open in Build ("+fb(text.length)+").");return;}
  var old=BD&&BD.ref;BD={name:o.name||"page.html",title:o.title||"",repo:o.repo||"",path:o.path||"",parts:split(text),sel:0,ref:old||null};
  var first=0;BD.parts.some(function(p,i){if(p.kind==="script"){first=i;return true;}return false;});BD.sel=first;
  $("codeEditor").value="";$("buildGrid").classList.add("bd-large");try{$("autoRun").checked=false;}catch(e){}
  paintBox();store();paintLink();
  toast((o.title||o.name)+" is open in Build: "+fb(text.length)+" in "+BD.parts.length+" parts. Press Run the whole app to see it on the right.");}
function close(){if(!BD)return;var t=whole();BD=null;$("buildGrid").classList.remove("bd-large");delete state.buildDoc;keep();if(t.length<=LARGE){$("codeEditor").value=t;try{window.runBuild();}catch(e){}}else{$("codeEditor").value="";}paintLink();}

/* ---------- the box: the parts, the part chosen, the search ---------- */
function paintBox(){var ep=$("editorPane"),box=$("bdBox");if(!box){box=E("div");box.id="bdBox";ep.appendChild(box);}box.innerHTML="";if(!BD)return;
  var t=whole(),changed=BD.parts.filter(function(p){return p.changed;}).length;
  var hd=E("div","bd-head");hd.appendChild(E("b",null,BD.title||BD.name));hd.appendChild(E("span",null,BD.name+" · "+fb(t.length)+" · "+BD.parts.length+" parts"));
  if(changed){hd.appendChild(E("span","bd-chip",changed+" part"+(changed===1?"":"s")+" changed"));}box.appendChild(hd);
  var tl=E("div","bd-tools"),q=E("input");q.type="search";q.id="bdFind";q.placeholder="Find anywhere in the whole page…";q.value=BD.q||"";tl.appendChild(q);
  function key(label,fn,cls,title){var b=E("button","btn small"+(cls?" "+cls:""),label);b.type="button";if(title)b.title=title;b.onclick=fn;tl.appendChild(b);return b;}
  key("Run the whole app",function(){runNow();},"primary","The whole page, in the preview on the right");
  key("Save the page",function(){saveFileNative(BD.name.replace(/[^\w.() -]+/g,"_")||"page.html","text/html",whole());},"","Save it as one .html file");
  if(window.IngDownload)key("📦 Download as an app",function(){IngDownload.open({getHtml:function(){return Promise.resolve(whole());},name:BD.name,title:BD.title&&BD.title!==BD.name?BD.title:null});},"","This app for each of your devices: Mac, Mac mini, Windows, iPhone and iPad, Fire, web; one at a time or all");
  if(BD.repo&&typeof window.fbFromBuild==="function")key("Keep in Fabrica",toFabrica,"","Your changes go to "+(BD.title||"the app")+" in Fabrica, as changes to keep");
  key("Close it",function(){if(BD.parts.some(function(p){return p.changed;})&&!window.confirm("Close "+(BD.title||BD.name)+"? Your changes stay kept here only until another page is opened."))return;close();},"ghost");
  box.appendChild(tl);
  var hits=E("div","bd-hits");hits.id="bdHits";box.appendChild(hits);
  var body=E("div","bd-body"),list=E("div","bd-parts");list.id="bdParts";list.setAttribute("role","listbox");list.setAttribute("aria-label","The page's parts");
  BD.parts.forEach(function(p,i){var b=E("button","bd-part"+(p.changed?" changed":"")+(p.kind==="data"?" data":""));b.type="button";b.setAttribute("aria-pressed",i===BD.sel?"true":"false");b.title=p.label+" · "+fb(p.text.length);
    b.appendChild(E("i",null,p.kind==="markup"?"html":p.kind==="script"?"js":p.kind==="style"?"css":"data"));b.appendChild(E("span",null,p.label));b.appendChild(E("small",null,fb(p.text.length)));
    b.onclick=function(){choose(i);};list.appendChild(b);});
  body.appendChild(list);var ed=E("div","bd-edit");ed.id="bdEdit";body.appendChild(ed);box.appendChild(body);
  paintPart();q.oninput=function(){BD.q=q.value;clearTimeout(q._t);q._t=setTimeout(find,220);};if(BD.q)find();
  setTimeout(function(){var on=list.querySelector('[aria-pressed="true"]');if(on)on.scrollIntoView({block:"nearest"});},30);}
function choose(i,sel){BD.sel=i;[].forEach.call($("bdParts").children,function(b,k){b.setAttribute("aria-pressed",k===i?"true":"false");});paintPart(sel);}
function paintPart(sel){var ed=$("bdEdit");if(!ed||!BD)return;ed.innerHTML="";var p=BD.parts[BD.sel];if(!p)return;
  if(p.kind==="data"){var n=E("div","bd-note");n.textContent="Data held in the page: "+p.label+", "+fb(p.text.length)+". It is not text to write in (pictures, fonts, or apps this app carries, encoded). Save it as a file, or put another file of the same kind in its place.";ed.appendChild(n);
    var r=E("div","bd-tools");var s1=E("button","btn small","Save it as a file");s1.type="button";s1.onclick=function(){saveFileNative((p.label.replace(/[^\w.-]+/g,"_")||"data")+".txt","text/plain",p.text);};r.appendChild(s1);
    var s2=E("button","btn small","Show it anyway");s2.type="button";s2.onclick=function(){p.kind="script";paintBox();};r.appendChild(s2);ed.appendChild(r);return;}
  var ta=E("textarea");ta.id="bdText";ta.spellcheck=false;ta.value=p.text;ed.appendChild(ta);
  var note=E("div","bd-note");note.textContent=p.label+" · "+p.text.split("\n").length.toLocaleString()+" lines · "+fb(p.text.length)+". Written here, it is part of the whole page at once; Run the whole app shows it.";ed.appendChild(note);
  ta.oninput=function(){p.text=ta.value;if(!p.changed){p.changed=true;var b=$("bdParts").children[BD.sel];if(b)b.classList.add("changed");}storeSoon();};
  ta.addEventListener("keydown",function(e){if((e.ctrlKey||e.metaKey)&&(e.key==="s"||e.key==="S")){e.preventDefault();store().then(function(){toast("Kept on this device. Save the page, or Keep in Fabrica, when you want a copy out.");});return;}
    if((e.ctrlKey||e.metaKey)&&e.key==="Enter"){e.preventDefault();runNow();return;}
    if(e.key==="Tab"&&!e.shiftKey&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();var a=ta.selectionStart,b=ta.selectionEnd;ta.value=ta.value.slice(0,a)+"  "+ta.value.slice(b);ta.selectionStart=ta.selectionEnd=a+2;ta.oninput();}});
  if(sel){setTimeout(function(){try{ta.focus();ta.setSelectionRange(sel[0],sel[1]);var line=ta.value.slice(0,sel[0]).split("\n").length;ta.scrollTop=Math.max(0,(line-4)*18.75);}catch(e){}},30);}}
function find(){var box=$("bdHits"),q=(BD.q||"").trim();if(!box)return;box.innerHTML="";if(q.length<2){box.classList.remove("on");return;}box.classList.add("on");
  var lq=q.toLowerCase(),n=0,MAX=300;
  for(var i=0;i<BD.parts.length&&n<MAX;i++){var p=BD.parts[i];if(p.kind==="data")continue;var t=p.text,lt=t.toLowerCase(),at=lt.indexOf(lq);
    while(at>=0&&n<MAX){(function(i,at){var ls=t.lastIndexOf("\n",at)+1,le=t.indexOf("\n",at);if(le<0)le=t.length;var line=t.slice(0,at).split("\n").length;
        var before=t.slice(Math.max(ls,at-60),at),match=t.slice(at,at+q.length),after=t.slice(at+q.length,Math.min(le,at+q.length+80));
        var b=E("button","bd-hit");b.type="button";b.appendChild(document.createTextNode(p.label.slice(0,28)+" · "+line+": "+before));b.appendChild(E("b",null,match));b.appendChild(document.createTextNode(after));
        b.onclick=function(){choose(i,[at,at+q.length]);};box.appendChild(b);})(i,at);n++;at=lt.indexOf(lq,at+lq.length);}}
  if(!n)box.appendChild(E("div","bd-note","Nowhere in the page."));else if(n>=MAX)box.appendChild(E("div","bd-note","The first "+MAX+" places shown: say more to narrow them."));}

/* ---------- running, saving, Fabrica ---------- */
function runNow(){var code=whole();$("consolePane").innerHTML="";try{consoleLines=0;updateConsoleCount();}catch(e){}
  try{if(typeof csOpen==="function"){}}catch(e){}
  /* 6.2 (R158): a large app runs from a file of its own, never as one giant attribute of the frame */
  if(typeof window.ingRunInFrame==="function")window.ingRunInFrame($("previewFrame"),code);else $("previewFrame").srcdoc=ingStageDoc(code);
  $("frameWrap").setAttribute("data-lived","1");}
/* Build's own Run, Save, Package and kits read the whole page: a page held part by part is put together for them first */
var oRun=window.runBuild;window.runBuild=function(){if(BD)return runNow();var code=$("codeEditor").value;if(code.length>LARGE){open({name:"page.html",text:code});return;}return oRun.apply(this,arguments);};
$("runBtn").onclick=function(){window.runBuild();};
["downloadBuild","downloadZip","shipAll","copyPreview","openPreview","dlPreview"].forEach(function(id){var b=$(id);if(!b)return;b.addEventListener("click",function(){if(BD)$("codeEditor").value=whole();},true);
  b.addEventListener("click",function(){if(BD)setTimeout(function(){if(BD)$("codeEditor").value="";},0);});});
$("downloadBuild").onclick=function(){var n=BD?BD.name:(state.buildDoc&&state.buildDoc.name)||"my-page.html";saveFileNative(n,"text/html",whole()||"");};
$("clearBuild").addEventListener("click",function(){if(BD){BD=null;$("buildGrid").classList.remove("bd-large");delete state.buildDoc;keep();paintLink();}},true);
$("sampleBtn").addEventListener("click",function(){if(BD){BD=null;$("buildGrid").classList.remove("bd-large");delete state.buildDoc;keep();paintLink();}},true);
function toFabrica(){var d=state.buildDoc||{};var repo=BD?BD.repo:d.repo,path=BD?BD.path:d.path;if(!repo||!path)return;
  window.fbFromBuild(repo,path,whole()).then(function(){if(BD)BD.parts.forEach(function(p){p.changed=false;});if(BD)paintBox();toast("In Fabrica now, as changes to keep: open Fabrica to see them, keep a version, test it and ship it.");},function(e){toast("Fabrica did not take it: "+(e&&e.message||e));});}
/* a small page that came from Fabrica keeps its way back */
function paintLink(){var bar=$("runBtn")&&$("runBtn").parentNode;if(!bar)return;var k=$("bdKeepSmall"),d=state.buildDoc||{};
  if(!BD&&d.small&&d.repo&&typeof window.fbFromBuild==="function"){if(!k){k=E("button","btn small","Keep in Fabrica");k.id="bdKeepSmall";k.type="button";k.onclick=toFabrica;bar.insertBefore(k,$("downloadBuild"));}k.hidden=false;k.title="Your changes go to "+(d.title||"the app")+" in Fabrica";}
  else if(k)k.hidden=true;}

/* ---------- opening an app: your apps, Ingenium itself, Fabrica, a file ---------- */
/* 6.7: the largest page Build takes, the same as the editor's (r164: a little under what a browser holds as one text) */
function maxMB(){return window.ingEditMaxMB||480;}
function openPicker(){var box=modalOpen('<h3>Open an app in Build</h3><p class="small muted" style="margin-top:0">A page of up to '+maxMB()+' MB on this device. A large page opens part by part, and runs whole in the preview.</p><div class="bd-open-list" id="bdOpenList"><div class="small muted">Reading what is here…</div></div><div style="display:flex;justify-content:flex-end;margin-top:10px"><button class="btn ghost" id="bdOpenX" type="button">Close</button></div>');
  box.querySelector("#bdOpenX").onclick=closeModal;var host=box.querySelector("#bdOpenList");
  function row(title,sub,fn){var b=E("button","cc-prow");b.type="button";b.appendChild(E("b",null,title));b.appendChild(E("span","small muted",sub));b.onclick=function(){b.disabled=true;Promise.resolve().then(fn).then(function(){closeModal();},function(e){b.disabled=false;toast(title+": "+(e&&e.message||e));});};host.appendChild(b);}
  var lib=[];try{lib=window.IngApps?IngApps.list():[];}catch(e){}
  var repos=typeof IngRepo!=="undefined"?IngRepo.list().catch(function(){return [];}):Promise.resolve([]);
  repos.then(function(rs){host.innerHTML="";
    lib.forEach(function(a){row(a.name,(a.version?a.version+" · ":"")+"your app library",function(){var p=a.key==="ingenium-self"?selfPageText():AppLib.text(a.key);return Promise.resolve(p).then(function(t){if(!t)throw new Error("its page could not be read from this device");closeModal();open({name:(a.key==="ingenium-self"?"ingenium":a.key)+".html",text:t,title:a.name.replace(/ \(this copy\)$/,"")});});});});
    rs.forEach(function(r){row(r.name,"Fabrica · its working copy, with a way back as changes to keep",function(){return IngRepo.files(r.id).then(function(list){var p=(list.filter(function(f){return /\.html?$/i.test(f.path)&&f.path.indexOf("/")<0;})[0]||list.filter(function(f){return /\.html?$/i.test(f.path);})[0]||{}).path;
        if(!p)throw new Error("there is no page in it");return IngRepo.readText(r.id,p).then(function(t){closeModal();open({name:p.split("/").pop(),text:t||"",repo:r.id,path:p,title:r.name});});});});});
    row("A page from this device","An .html file of up to "+maxMB()+" MB",function(){return new Promise(function(res,rej){var i=E("input");i.type="file";i.accept=".html,.htm,text/html";i.onchange=function(){var f=i.files&&i.files[0];if(!f){res();return;}
      /* 6.7: a file larger than this device can hold whole is refused before it is read, and a read that fails says so */
      if(f.size>maxMB()*1048576){rej(new Error("it is "+Math.round(f.size/1048576)+" MB; Build opens a page of up to "+maxMB()+" MB on this device"));return;}
      f.text().then(function(t){closeModal();open({name:f.name,text:t,title:f.name.replace(/\.html?$/i,"")});res();},function(e){rej(new Error("it could not be read on this device ("+(e&&e.message||e)+")"));});};i.click();});});
    if(!lib.length&&!rs.length)host.insertBefore(E("div","small muted","No app is kept on this device yet: add yours in Lector (Add your apps) or bring one into Fabrica."),host.firstChild);});}
(function(){var s=$("sampleBtn");if(!s||$("bdOpenBtn"))return;var b=E("button","btn small","Open an app…");b.id="bdOpenBtn";b.type="button";b.title="Your apps, Ingenium itself, an app in Fabrica, or a page from this device";b.onclick=openPicker;s.parentNode.insertBefore(b,s);})();

/* ---------- Edit in Build, from the stage: no page is too large now ---------- */
(function(){var b=$("csEdit");if(!b)return;b.onclick=function(){try{csMenu(false);}catch(e){}if(typeof csCur==="undefined"||!csCur)return;open({name:csCur.name||"page.html",text:csCur.html||"",title:(csCur.name||"").replace(/\.html?$/i,"")});};})();

/* ---------- on start: a page kept part by part comes back when Build is opened, not before ---------- */
(function(){var d=state.buildDoc;if(!d||!d.ref)return;var pending=true;
  var og=go;go=function(p){var r=og.apply(this,arguments);if(p==="build"&&pending){pending=false;IngBig.load(d.ref).then(function(t){if(t==null){delete state.buildDoc;keep();return;}var o=BD;
      BD={name:d.name,title:d.title,repo:d.repo,path:d.path,parts:split(t),sel:0,ref:d.ref};BD.parts.some(function(p,i){if(p.kind==="script"){BD.sel=i;return true;}return false;});$("buildGrid").classList.add("bd-large");$("codeEditor").value="";paintBox();paintLink();});}return r;};window.go=go;})();
paintLink();
window.IngBuild={open:open,close:close,text:whole,split:split,parts:function(){return BD?BD.parts:null;},large:function(){return !!BD;}};
})();
;try{window.__ingParts["p59"]="running";}catch(_){}
</script>
