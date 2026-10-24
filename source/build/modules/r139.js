<style id="r139-css">
/* ============ R139 · DOWNLOAD AS AN APP: EVERY DEVICE, ONE AT A TIME OR ALL ============
   The owner's words (20 October 2026): "I want the "Download as an app" function from the Forge that has all of my devices
   shown separately with their emojis and allows me to download them one at a time and also the option to get them all,
   right now Ingenium does not have that. I want full parity. I want that function offered on the Chat pages as an option to
   download for anything built there and for the Build and possibly Fabrica page."
   The Forge's step 5 (Download the app), in Ingenium: a row for each device with its emoji, the app's name, id and version
   above, each press makes that device's package alone, and All makes every one, one after another, each saved before the
   next is made. The iPhone and iPad and the Fire tablet rows make the app itself (an IPA, a signed APK) here; from 6.5 the
   Mac and Windows rows do too (R170: one Mac app for Apple silicon and Intel, one Windows program), and each row still
   offers the project GitHub builds into the app. Offered in Chat and Code (the preview's menu and its Download
   key), in Build and in Fabrica. */
#modalBox.dl-wide{width:min(920px,96vw) !important;max-width:96vw !important;max-height:92vh;overflow:auto}
.dl-app h3{margin:0 0 4px;font-size:20px}
.dl-app .dl-lead{margin:0 0 12px;color:var(--muted,#6c6579);font-size:13.5px;line-height:1.5;max-width:70ch}
.dl-id{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;margin:0 0 12px;padding:10px 12px;border-radius:12px;border:1px solid var(--hair,rgba(34,26,46,.1));background:var(--card2,rgba(127,110,160,.06))}
.dl-id label{display:flex;flex-direction:column;gap:3px;font-size:12px;font-weight:600;color:var(--muted,#6c6579)}
.dl-id input,.dl-id select{font:inherit;font-size:13.5px;font-weight:500;padding:6px 9px;border-radius:9px;border:1px solid var(--hair,rgba(34,26,46,.14));background:var(--bg,#fff);color:inherit;min-width:9em}
.dl-id input.dl-wid{min-width:17em}.dl-id input.dl-wv{min-width:6em;width:7em}
.dl-id .dl-note{flex:1 1 100%;margin:0;font-size:12px;color:var(--muted,#6c6579)}
.dl-devs{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:10px}
.dl-dev{display:flex;gap:12px;align-items:flex-start;padding:11px 12px;border-radius:14px;border:1px solid var(--hair,rgba(34,26,46,.1));background:var(--bg,#fff);transition:border-color .2s,box-shadow .2s,transform .25s cubic-bezier(.34,1.35,.64,1)}
.dl-dev:hover{border-color:rgba(106,63,181,.35);box-shadow:0 6px 18px -10px rgba(60,30,110,.35)}
.dl-dev.off{opacity:.62}
.dl-dev.done{border-color:rgba(46,140,90,.45)}
.dl-dev.busy{border-color:rgba(106,63,181,.6)}
.dl-emo{flex:0 0 auto;width:54px;height:54px;border-radius:50%;border:1px solid var(--hair,rgba(34,26,46,.14));background:radial-gradient(circle at 35% 28%,#fff,#efe9f7 70%);font-size:27px;line-height:1;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 0 rgba(60,30,110,.18),inset 0 1px 0 #fff;transition:transform .2s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
.dl-emo:hover{transform:translateY(-2px) scale(1.05)}
.dl-emo:active{transform:translateY(1px) scale(.97);box-shadow:0 0 0 rgba(0,0,0,0)}
.dl-emo:focus-visible{outline:2px solid #6a3fb5;outline-offset:3px}
.dl-emo[disabled]{cursor:not-allowed;transform:none}
body[data-theme="night"] .dl-emo{background:radial-gradient(circle at 35% 28%,#3a3050,#251e33 70%);box-shadow:0 2px 0 rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.06)}
.dl-t{min-width:0;flex:1 1 auto;display:flex;flex-direction:column;gap:3px}
.dl-t b{font-size:14.5px}
.dl-t .dl-file{font:12px ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--muted,#6c6579);word-break:break-all}
.dl-t i{font-style:normal;font-size:12.5px;line-height:1.45;color:var(--muted,#6c6579)}
.dl-t .dl-st{font-size:12.5px;font-weight:600;min-height:1em}
.dl-t .dl-st.ok{color:#2e8c5a}.dl-t .dl-st.bad{color:#b4402a}.dl-t .dl-st.run{color:#6a3fb5}
.dl-t .dl-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:3px}
.dl-foot{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:flex-end;margin:0 0 12px}
.dl-foot .dl-all-st{margin-right:auto;font-size:13px;color:var(--muted,#6c6579)}
@media (max-width:560px){.dl-devs{grid-template-columns:minmax(0,1fr)}.dl-emo{width:46px;height:46px;font-size:23px}}
@media (prefers-reduced-motion:reduce){.dl-dev,.dl-emo{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p60"]="started";}catch(_){}
(function(){"use strict";
var $=function(id){return document.getElementById(id);};
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
var te=new TextEncoder();
function S61(){if(!state.v61||typeof state.v61!=="object")state.v61={};return state.v61;}
function keep(){try{saveState();}catch(e){}}
function kb(n){try{return fmtBytes(n);}catch(e){return n+" bytes";}}

/* the devices, as the Forge shows them; a kit is the project GitHub (or the computer) builds into the app */
var DEV=[
  {k:"mac",e:"🍎",t:"Mac (MacBook and Mac mini)",d:"The app itself, made here: one app for Apple silicon (your Mac mini) and Intel (your MacBook), macOS 12 or newer. Drag it to Applications; the first time, Control-click it and choose Open.",kind:"mac",alt:{label:"Or the Mac projects",kits:["mac","macarm"]}},
  {k:"windows",e:"🪟",t:"Windows",d:"The app itself, made here: one program that opens as it is on Windows 10 and 11, with nothing to install. The first time, Windows may ask: More info, then Run anyway.",kind:"win",alt:{label:"Or the Windows project",kits:["windows"]}},
  {k:"ipa",e:"📱",t:"iPhone and iPad",d:"The app itself (.ipa), made here. Sideloadly or AltStore installs it from a computer with your Apple ID (seven days with a free Apple ID, a year with a paid one).",kind:"ipa",alt:{label:"Or the Xcode projects",kits:["iphone","ipad"]}},
  {k:"apk",e:"🔥",t:"Fire and Android",d:"The app itself (.apk), made and signed here: open it on the tablet to install it. Signed with the same key, each new one installs over the last and keeps your work.",kind:"apk",alt:{label:"Or the Android project",kits:["fire"]}},
  {k:"web",e:"🌐",t:"Web",d:"An installable site: the page, its manifest, its offline worker and its icons, for any web host (https). On iPhone and iPad, Add to Home Screen.",kind:"web"},
  {k:"html",e:"📄",t:"One HTML file",d:"The whole app in one file, for any browser. Nothing to install.",kind:"html"}];

function titleOf(h){var m=/<title[^>]*>([^<]{1,80})<\/title>/i.exec(String(h||"").slice(0,400000));return m&&m[1].trim()?m[1].trim():"";}
function knownOf(title){var t=String(title||"");return /\bThe Forge\b/i.test(t)?"forge":/Carpe Diem/i.test(t)?"cd":/Inkwell/i.test(t)?"inkwell":/^Ingenium\b/i.test(t)?"ingenium":"";}
function KNOWN(){try{return window.fbKnown||{};}catch(e){return {};}}
function slugId(name){var s=String(name||"app").toLowerCase().replace(/[^a-z0-9]+/g,"");if(!s||/^[0-9]/.test(s))s="app"+s;return "com.yannieforest."+s.slice(0,40);}
function versionOf(h){var s=String(h||"").slice(0,600000),m=/(?:APP_VERSION|ING_VERSION|BUILD)\s*[=:]\s*["']([0-9][0-9.]{0,12})["']/.exec(s)||/window\.CD_BUILD=\{[^}]*pass:"(\d+)"/.exec(s)||/<meta[^>]+name=["']version["'][^>]+content=["']([^"']+)["']/i.exec(s);return m?m[1]:"1.0";}
function stem(t){return (String(t||"app").replace(/[^\w.-]+/g,"-").replace(/^-+|-+$/g,"")||"app");}
function hereKits(){return typeof kitStore==="function"&&typeof kitAssemble==="function"&&typeof makeZip==="function"&&!!$("ingenium-kit-bundle");}
function hereApk(){return !!(window.IngApk&&$("ing-android-shell"));}
function hereIpa(){try{return !!(window.IngIpa&&IngIpa.has());}catch(e){return false;}}
function hereMac(){try{return !!(window.IngMac&&IngMac.has());}catch(e){return false;}}
function hereWin(){try{return !!(window.IngWin&&IngWin.has());}catch(e){return false;}}
function here(d){return d.kind==="kit"?hereKits():d.kind==="apk"?hereApk():d.kind==="ipa"?hereIpa():d.kind==="mac"?hereMac():d.kind==="win"?hereWin():true;}
function whyNot(d){return d.kind==="kit"?"Made on a computer: the Mac and Windows apps of Ingenium carry the projects (the phone and tablet apps leave them out).":d.kind==="apk"?"This copy of Ingenium carries no Android shell.":d.kind==="ipa"?"This copy of Ingenium carries no iPhone and iPad shell.":d.kind==="mac"?"This copy of Ingenium carries no Mac shell.":d.kind==="win"?"This copy of Ingenium carries no Windows shell.":"";}

/* a picture drawn at one size, as a PNG */
function png(src,z,fill){return new Promise(function(res,rej){var im=new Image();im.onload=function(){var c=E("canvas");c.width=z;c.height=z;var x=c.getContext("2d");x.imageSmoothingEnabled=true;try{x.imageSmoothingQuality="high";}catch(e){}
    if(fill){x.fillStyle=fill;x.fillRect(0,0,z,z);}x.drawImage(im,0,0,z,z);c.toBlob(function(b){if(!b){rej(new Error("the icon could not be drawn"));return;}b.arrayBuffer().then(function(ab){res(new Uint8Array(ab));});},"image/png");};
    im.onerror=function(){rej(new Error("the app's icon could not be read"));};im.src=src;});}
function letterSeal(title){var c=E("canvas");c.width=512;c.height=512;var x=c.getContext("2d");x.fillStyle="#6a3fb5";x.beginPath();x.arc(256,256,240,0,Math.PI*2);x.fill();
  x.fillStyle="#fff";x.font="600 220px Georgia,serif";x.textAlign="center";x.textBaseline="middle";var w=String(title||"A").replace(/[^A-Za-z0-9 ]/g,"").split(/\s+/).filter(Boolean);
  x.fillText(((w[0]||"A")[0]+((w[1]||"")[0]||"")).toUpperCase(),256,268);return c.toDataURL("image/png");}
function sealFor(P,html){var s=null;try{s=window.IngApk&&IngApk.iconSource?IngApk.iconSource(html):null;}catch(e){}
  if(!s&&P.app){try{var k=window.ING_SEALS&&ING_SEALS[P.app];if(k)s="data:image/png;base64,"+k.b64;}catch(e){}}return s||letterSeal(P.title);}

/* the installable site: the page with its manifest and offline worker, and its icons */
function webZip(P,html){var top=stem(P.title)+"-web-"+stem(P.version)+"/",src=sealFor(P,html),ver=stem(P.version);
  return Promise.all([png(src,192),png(src,512),png(src,180,"#ffffff")]).then(function(ic){var h=html,files=[];
    if(!/<link[^>]+rel=["']manifest["']/i.test(h)){h=h.replace(/<\/head>/i,'  <link rel="manifest" href="manifest.webmanifest">\n  <link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n</head>');
      files.push({name:"manifest.webmanifest",data:JSON.stringify({name:P.title,short_name:P.title.length>12?P.title.split(/\s+/).pop():P.title,id:"./",start_url:"./index.html",scope:"./",display:"standalone",background_color:"#ffffff",theme_color:"#ffffff",
        icons:[{src:"icons/icon-192.png",sizes:"192x192",type:"image/png"},{src:"icons/icon-512.png",sizes:"512x512",type:"image/png"},{src:"icons/apple-touch-icon.png",sizes:"180x180",type:"image/png"}]},null,2)});}
    if(!/serviceWorker\.register/.test(h)){files.push({name:"sw.js",data:"/* "+P.title+": keeps itself for when there is no connection (made by Ingenium) */\nconst CACHE = '"+stem(P.title).toLowerCase()+"-"+ver+"';\nconst FILES = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];\n"+
        "self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });\n"+
        "self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim())); });\n"+
        "self.addEventListener('fetch', e => { if (e.request.method !== 'GET') return; e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request))); });\n"});
      h=h.replace(/<\/body>(?![\s\S]*<\/body>)/i,"<script>if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('sw.js').catch(function(){});<\/script>\n</body>");}
    var out=[{name:top+"index.html",data:te.encode(h)}];files.forEach(function(f){out.push({name:top+f.name,data:te.encode(f.data)});});
    out.push({name:top+"icons/icon-192.png",data:ic[0]},{name:top+"icons/icon-512.png",data:ic[1]},{name:top+"icons/apple-touch-icon.png",data:ic[2]});
    out.push({name:top+"README.txt",data:te.encode(P.title+" "+P.version+"\n\nOpen index.html in a browser, or put this folder on any web host (https) and open it there: it installs as an app and works with no connection.\nMade by Ingenium.\n")});
    if(window.IngRepo&&IngRepo.core&&IngRepo.core.zip)return IngRepo.core.zip(out,{comment:P.title+" "+P.version});
    return makeZip(out);}).then(function(z){return {name:top.slice(0,-1)+".zip",mime:"application/zip",bytes:z};});}

/* one device's package */
function make(d,P,html,said,alt){var bytes=te.encode(html),page=P.page||"index.html";
  if(alt||d.kind==="kit"){var ids=alt?d.alt.kits:[d.kit];
    if(!hereKits())return Promise.reject(new Error(whyNot({kind:"kit"})));
    var who={isNew:true,name:P.title.replace(/[^A-Za-z0-9 ._-]/g,"").replace(/\s+/g," ").trim()||"My App",id:P.id,file:typeof kitFileWord==="function"?kitFileWord(P.title):stem(P.title)};
    var prob=typeof kitIdentityProblem==="function"?kitIdentityProblem(who):null;if(prob)return Promise.reject(new Error(prob));
    said("Reading the projects…");
    return kitStore().then(function(store){return ids.map(function(id){var k=kitAssemble(store,id,who,html);return {name:k.zip,mime:"application/zip",bytes:makeZip(k.entries)};});});}
  if(d.kind==="html")return Promise.resolve([{name:(P.file||stem(P.title)+".html").replace(/[^\w.() -]+/g,"_"),mime:"text/html",bytes:bytes}]);
  if(d.kind==="web"){said("Drawing its icons…");return webZip(P,html).then(function(x){return [x];});}
  if(d.kind==="mac"||d.kind==="win"){var M=d.kind==="mac"?IngMac:IngWin,vm=String(P.version||"1.0").replace(/^v(?=\d)/,"");said("Drawing its icon…");
    return M.iconsFor(html,P.title,"#6a3fb5",P.app&&window.ING_SEALS&&ING_SEALS[P.app]?"data:image/png;base64,"+ING_SEALS[P.app].b64:null).then(function(icons){
      return M.make({html:bytes,page:page,title:P.title,id:P.id,versionName:vm,build:String(IngApk.versionCodeNow()),icons:icons,bridges:P.ios,onStep:said});})
      .then(function(a){return [{name:stem(P.title)+"-"+(d.kind==="mac"?"mac":"windows")+"-"+stem(vm)+".zip",mime:"application/zip",bytes:a.bytes,info:a}];});}
  said("Drawing its icons…");
  return IngApk.iconsFor(html,P.title,"#6a3fb5",P.app&&window.ING_SEALS&&ING_SEALS[P.app]?"data:image/png;base64,"+ING_SEALS[P.app].b64:null).then(function(icons){var vn=String(P.version||"1.0").replace(/^v(?=\d)/,"");
    if(d.kind==="apk")return IngApk.make({html:bytes,page:page,title:P.title,id:P.id,versionName:vn,icons:icons.android,background:"#ffffff",bridges:P.and,alias:P.alias,keyId:P.keyId||"device",onStep:said})
      .then(function(a){return [{name:stem(P.title)+"-"+stem(vn)+".apk",mime:"application/vnd.android.package-archive",bytes:a.bytes,info:a}];});
    return IngIpa.make({html:bytes,page:page,title:P.title,id:P.id,versionName:vn,build:String(IngApk.versionCodeNow()),icons:icons.ios,bridges:P.ios,onStep:said})
      .then(function(a){return [{name:IngIpa.iosName(P.title)+"-"+stem(vn)+".ipa",mime:"application/octet-stream",bytes:a.bytes,info:a}];});});}

function save(f){var r;try{r=saveFileNative(f.name,f.mime,f.bytes);}catch(e){return Promise.reject(e);}return Promise.resolve(r);}

/* the panel */
function open(opt){opt=opt||{};
  var getHtml=opt.getHtml||function(){return Promise.resolve(opt.html||"");};
  return Promise.resolve(getHtml()).then(function(html){html=String(html||"");if(html.length<20){ingToast("There is no page to make into an app yet.");return;}
    var title=(opt.title||titleOf(html)||String(opt.name||"My app").replace(/\.html?$/i,"").replace(/[_-]+/g," ")).slice(0,50),app=opt.app||knownOf(title),K=KNOWN()[app]||{};
    var mem=(S61().dl=S61().dl||{})[title]||{};
    var P={title:mem.title||title,id:opt.id||mem.id||K.id||slugId(title),version:opt.version||mem.version||versionOf(html),keyId:opt.keyId||mem.keyId||"device",app:app,alias:opt.alias!=null?opt.alias:(K.alias||""),
      and:K.and||["CarpeNative"],ios:K.ios||["CarpeNative","pywebview"],page:opt.page||"index.html",file:opt.name&&/\.html?$/i.test(opt.name)?opt.name:null};
    var box=modalOpen('<div class="dl-app"><h3>📦 Download as an app</h3><p class="dl-lead"></p><div class="dl-id"></div><div class="dl-foot"><span class="dl-all-st" aria-live="polite"></span></div><div class="dl-devs" role="list"></div></div>');
    box.classList.add("dl-wide");
    try{var root=$("modalRoot"),mo=new MutationObserver(function(){if(!root.classList.contains("open")||!box.querySelector(".dl-app")){box.classList.remove("dl-wide");mo.disconnect();}});mo.observe(root,{attributes:true,attributeFilter:["class"],childList:true,subtree:true});}catch(e){}
    box.querySelector(".dl-lead").textContent="Choose a device: each press makes that device's own package from "+title+" ("+kb(html.length)+"), named for the app, the device and its version, and saves it before anything else is made. All makes every one, one after another. Each package comes with a READ ME FIRST that takes you from the file to the app on the device.";
    /* the app's identity */
    var idb=box.querySelector(".dl-id");
    function field(label,cls,val,ph){var l=E("label");l.appendChild(document.createTextNode(label));var i=E("input",cls);i.type="text";i.value=val;i.spellcheck=false;i.autocapitalize="off";if(ph)i.placeholder=ph;l.appendChild(i);idb.appendChild(l);return i;}
    var fT=field("Name under the icon","dl-wt",P.title),fI=field("App id","dl-wid",P.id,"com.yourname.myapp"),fV=field("Version","dl-wv",P.version);
    var kl=E("label");kl.appendChild(document.createTextNode("Signing key (Android)"));var ks=E("select");kl.appendChild(ks);idb.appendChild(kl);
    var note=E("p","dl-note","Keep the id the same for every version of an app: the tablet and the iPhone take a new id as a different app. "+(K.note||""));idb.appendChild(note);
    if(window.IngApk&&IngApk.keys&&IngApk.keys.list)IngApk.keys.list().then(function(list){if(!list.some(function(k){return k.id==="device";}))list.unshift({id:"device",label:"Made on this device"});
      list.forEach(function(k){var o=E("option",null,(k.label||k.id)+(k.fingerprint?" · "+k.fingerprint.slice(0,10)+"…":""));o.value=k.id;if(k.id===P.keyId)o.selected=true;ks.appendChild(o);});},function(){var o=E("option",null,"Made on this device");o.value="device";ks.appendChild(o);});
    else{kl.hidden=true;}
    function read(){P.title=(fT.value.trim()||title).slice(0,50);P.id=fI.value.trim();P.version=fV.value.trim()||"1.0";P.keyId=ks.value||"device";
      var okId=window.IngApk&&IngApk.cleanId?IngApk.cleanId(P.id):/^[A-Za-z][A-Za-z0-9_]*(\.[A-Za-z][A-Za-z0-9_]*)+$/.test(P.id);
      if(!okId){fI.focus();throw new Error("“"+P.id+"” cannot be an app id: letters, digits and dots, such as com.yannieforest.myapp.");}
      S61().dl[title]={title:P.title,id:P.id,version:P.version,keyId:P.keyId};keep();paintNames();}
    [fT,fI,fV].forEach(function(i){i.addEventListener("input",function(){try{read();}catch(e){}});});ks.onchange=function(){try{read();}catch(e){}};
    /* the devices */
    var list=box.querySelector(".dl-devs"),rows={},busy=false;
    function nameFor(d){var vn=stem(P.version);return d.kind==="html"?(P.file||stem(P.title)+".html"):d.kind==="web"?stem(P.title)+"-web-"+vn+".zip":d.kind==="apk"?stem(P.title)+"-"+vn+".apk":d.kind==="ipa"?(window.IngIpa?IngIpa.iosName(P.title):stem(P.title))+"-"+vn+".ipa":d.kind==="mac"?stem(P.title)+"-mac-"+vn+".zip":d.kind==="win"?stem(P.title)+"-windows-"+vn+".zip":"the "+d.t+" project (.zip)";}
    function paintNames(){DEV.forEach(function(d){var r=rows[d.k];if(r)r.file.textContent=here(d)?nameFor(d):whyNot(d);});}
    DEV.forEach(function(d){var row=E("div","dl-dev"+(here(d)?"":" off"));row.setAttribute("role","listitem");
      var b=E("button","dl-emo",d.e);b.type="button";b.title=here(d)?"Make and save the "+d.t+" package":whyNot(d);b.setAttribute("aria-label",b.title);
      var t=E("div","dl-t"),bb=E("b",null,d.t),file=E("span","dl-file"),i=E("i",null,d.d),st=E("span","dl-st");st.setAttribute("aria-live","polite");
      t.appendChild(bb);t.appendChild(file);t.appendChild(i);var acts=E("div","dl-row");
      var mk=E("button","btn small","Make and save");mk.type="button";mk.disabled=!here(d);acts.appendChild(mk);
      if(d.alt){var al=E("button","btn small ghost",d.alt.label);al.type="button";al.disabled=!hereKits();al.title=hereKits()?"The project that is built into the app, with its guide":whyNot({kind:"kit"});acts.appendChild(al);al.onclick=function(){one(d,true);};}
      t.appendChild(acts);t.appendChild(st);row.appendChild(b);row.appendChild(t);list.appendChild(row);
      rows[d.k]={row:row,st:st,file:file,b:b,mk:mk};b.onclick=mk.onclick=function(){if(!here(d)){ingToast(whyNot(d));return;}one(d,false);};});
    paintNames();
    function say(d,t,cls){var r=rows[d.k];r.st.textContent=t;r.st.className="dl-st"+(cls?" "+cls:"");}
    function lock(on){busy=on;DEV.forEach(function(d){var r=rows[d.k];r.b.disabled=on||!here(d);r.mk.disabled=on||!here(d);});allB.disabled=on;}
    function run(d,alt){var r=rows[d.k];r.row.classList.add("busy");r.row.classList.remove("done");say(d,"Making…","run");
      return Promise.resolve().then(function(){read();return make(d,P,html,function(t){say(d,t,"run");},alt);}).then(function(files){var q=Promise.resolve(),names=[];
          files.forEach(function(f){q=q.then(function(){say(d,"Saving "+f.name+"…","run");return save(f).then(function(){names.push(f.name+" · "+kb(f.bytes.length));if(typeof opt.onMade==="function"){try{return opt.onMade(alt?"kits":d.k,f.name,f.mime,f.bytes,f.info||null);}catch(e){}}});});});
          return q.then(function(){r.row.classList.remove("busy");r.row.classList.add("done");say(d,"Saved: "+names.join(", "),"ok");return true;});})
        .catch(function(e){r.row.classList.remove("busy");var m=e&&e.message?e.message:String(e);try{if(window.IngErr)m=IngErr.say(e);}catch(_){}say(d,m.charAt(0).toUpperCase()+m.slice(1),"bad");return false;});}
    function one(d,alt){if(busy)return;lock(true);run(d,alt).then(function(){lock(false);});}
    var foot=box.querySelector(".dl-foot"),allSt=box.querySelector(".dl-all-st"),avail=DEV.filter(here);
    var allB=E("button","btn primary","⬇ All "+avail.length+", one at a time");allB.type="button";allB.title="Every device below that this copy of Ingenium can make, one after another, each saved before the next";
    var cl=E("button","btn ghost","Close");cl.type="button";cl.onclick=function(){closeModal();};foot.appendChild(cl);foot.appendChild(allB);
    allB.onclick=function(){if(busy)return;try{read();}catch(e){ingToast(e.message);return;}lock(true);var q=Promise.resolve(),ok=0,bad=0;
      avail.forEach(function(d,i){q=q.then(function(){allSt.textContent=(i+1)+" of "+avail.length+": "+d.t+"…";return run(d,false).then(function(x){if(x)ok++;else bad++;});});});
      q.then(function(){lock(false);allSt.textContent=ok+" saved"+(bad?", "+bad+" not made (see the row)":"")+".";});};
    setTimeout(function(){try{var ad=DEV.filter(function(x){return x.k==="apk";})[0];rows.apk&&ad&&here(ad)?rows.apk.b.focus():allB.focus();}catch(e){}},80);});}

window.IngDownload={open:open,devices:DEV,make:function(k,P,html){var d=DEV.filter(function(x){return x.k===k;})[0];return make(d,P,html,function(){},false);}};

/* ---------- where it is offered ---------- */
/* Chat and Code: the Download key's menu (dlMenuShow, also Build's own for a small page). It closed at the very press that
   opened it: the page closes any chat menu on a press outside the chat's own keys, and the preview's Download key is not one of
   them, so the press, going on up to the page, took the menu away again. That press now leaves it open. */
var born=null;
if(typeof closeChatMenus==="function"){var oClose=closeChatMenus;closeChatMenus=function(){var ev=window.event,dm=document.getElementById("dlMenu");
    if(born&&ev&&ev===born&&dm){dm.parentNode.removeChild(dm);var r=oClose.apply(this,arguments);document.body.appendChild(dm);return r;}return oClose.apply(this,arguments);};window.closeChatMenus=closeChatMenus;}
if(typeof dlMenuShow==="function"){var oDl=dlMenuShow;dlMenuShow=function(anchorBtn,nameBase,getText){var r=oDl.apply(this,arguments);born=document.getElementById("dlMenu")?(window.event||null):null;try{var m=$("dlMenu");if(m&&!m.querySelector(".dl-as-app")){var sp=E("div","ctx-sep");m.appendChild(sp);
      var b=E("button","menu-btn dl-as-app","📦 As an app for your devices…");b.type="button";b.title="Mac, Mac mini, Windows, iPhone and iPad, Fire, web: one at a time or all";
      b.onclick=function(ev){ev.stopPropagation();m.remove();open({getHtml:function(){return Promise.resolve(getText());},name:nameBase+".html"});};m.appendChild(b);
      var rr=anchorBtn.getBoundingClientRect();m.style.top=Math.max(8,rr.top-(m.offsetHeight||120)-8)+"px";}}catch(e){}return r;};window.dlMenuShow=dlMenuShow;}
/* the preview's menu, in Chat and Code */
(function(){var ed=$("csEdit");if(!ed||$("csAsApp"))return;var b=E("button","menu-btn","📦 Download as an app");b.id="csAsApp";b.type="button";b.setAttribute("role","menuitem");
  b.title="This page as an app for each of your devices: Mac, Mac mini, Windows, iPhone and iPad, Fire, web";
  b.onclick=function(){try{csMenu(false);}catch(e){}if(typeof csCur==="undefined"||!csCur||!csCur.html){ingToast("There is no page in the preview yet.");return;}open({html:csCur.html,name:csCur.name});};
  ed.parentNode.insertBefore(b,ed);})();

;try{window.__ingParts["p60"]="running";}catch(_){}
})();
</script>
