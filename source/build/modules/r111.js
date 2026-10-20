<script>try{(window.__ingParts=window.__ingParts||{})["p43"]="started";}catch(_){}
/* R111 · TEST A VERSION, AND SHIP IT AS A WEB APP OR AS ONE PAGE
   Her word: "fully capable to build, test, run and ship ready made apps and zip packages for all of my apps and any
   future ones". From any version kept in an app's repository (R110): five checks, each recorded beside the version
   (the page reads cleanly; every file it names is there; it opens with no errors in a quiet window of its own; its own
   self-test, when it carries one; its build number moves forward), and two packages made on the device: the whole
   app in one page (its scripts, styles and pictures written into it), and a web app to install (a zip with its own
   manifest and offline copy). Nothing here needs a connection. */
var IngShip=(function(){
"use strict";
var td=new TextDecoder(),te=new TextEncoder();
function dec(u8){return td.decode(u8);}
var MIME={html:"text/html",htm:"text/html",css:"text/css",js:"text/javascript",mjs:"text/javascript",json:"application/json",webmanifest:"application/manifest+json",svg:"image/svg+xml",png:"image/png",
  jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",ico:"image/x-icon",avif:"image/avif",woff:"font/woff",woff2:"font/woff2",ttf:"font/ttf",otf:"font/otf",wasm:"application/wasm",
  mp3:"audio/mpeg",ogg:"audio/ogg",wav:"audio/wav",m4a:"audio/mp4",mp4:"video/mp4",webm:"video/webm",txt:"text/plain",md:"text/markdown",xml:"application/xml",pdf:"application/pdf"};
function mimeOf(p){var m=/\.([a-z0-9]+)$/i.exec(p);return (m&&MIME[m[1].toLowerCase()])||"application/octet-stream";}
function b64(u8){var s="",CH=0x8000;for(var i=0;i<u8.length;i+=CH)s+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));return btoa(s);}
function dataUri(path,u8){return "data:"+mimeOf(path)+";base64,"+b64(u8);}
/* a path named by the page, from the folder the page is in; null for anything not in the app (a site, data:, #) */
function localPath(base,ref){ref=String(ref||"").trim();try{ref=decodeURIComponent(ref);}catch(e){}
  if(!ref||/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\{|\$|%)/i.test(ref))return null;
  ref=ref.split("#")[0].split("?")[0];if(!ref)return null;
  var parts=(ref.charAt(0)==="/"?[]:base.split("/").slice(0,-1)).concat(ref.split("/")),out=[];
  parts.forEach(function(p){if(!p||p===".")return;if(p==="..")out.pop();else out.push(p);});return out.join("/");}

/* ---------- the app's files at a version ---------- */
function snapshot(id,ref){return IngRepo.resolve(id,ref||"HEAD").then(function(c){if(!c)throw new Error("keep a first version first");
  return IngRepo.files(id,c).then(function(list){var map={};list.forEach(function(f){map[f.path]=f;});return {commit:c,map:map,list:list};});});}
function readText(id,commit,path){return IngRepo.read(id,path,commit).then(function(b){return b==null?null:dec(b);});}
/* its recipe, if it has one: ingenium.build.json {page, name, app_id, version, test:{seconds}} */
function recipe(id,snap){if(!snap.map["ingenium.build.json"])return Promise.resolve({});
  return readText(id,snap.commit,"ingenium.build.json").then(function(t){try{return JSON.parse(t)||{};}catch(e){return {_bad:e.message};}});}
/* which page is the app: the recipe's; else index.html; else the one page at the top; else the largest page */
function mainPage(snap,rec){if(rec&&rec.page&&snap.map[rec.page])return rec.page;if(snap.map["index.html"])return "index.html";
  var top=snap.list.filter(function(f){return /\.html?$/i.test(f.path)&&f.path.indexOf("/")<0;});if(top.length===1)return top[0].path;
  var all=(top.length?top:snap.list.filter(function(f){return /\.html?$/i.test(f.path);})).sort(function(a,b){return (b.size||0)-(a.size||0);});return all.length?all[0].path:null;}

/* ---------- what a page names: scripts, styles, pictures, its manifest, and what its styles name ---------- */
var REFS=[["script","src"],["link","href"],["img","src"],["source","src"],["video","src"],["video","poster"],["audio","src"],["track","src"],["iframe","src"],["embed","src"],["object","data"],["image","href"],["use","href"]];
function namedBy(html){var doc=new DOMParser().parseFromString(html,"text/html"),out=[];
  REFS.forEach(function(r){[].forEach.call(doc.getElementsByTagName(r[0]),function(el){var v=el.getAttribute(r[1])||(r[1]==="href"?el.getAttribute("xlink:href"):null);
    if(!v)return;if(r[0]==="link"&&!/stylesheet|icon|manifest|apple-touch-icon|modulepreload|preload/i.test(el.getAttribute("rel")||""))return;out.push({tag:r[0],ref:v});});});
  [].forEach.call(doc.querySelectorAll("img[srcset],source[srcset]"),function(el){String(el.getAttribute("srcset")).split(",").forEach(function(s){var u=s.trim().split(/\s+/)[0];if(u)out.push({tag:el.tagName.toLowerCase(),ref:u});});});
  [].forEach.call(doc.getElementsByTagName("style"),function(st){cssUrls(st.textContent).forEach(function(u){out.push({tag:"style",ref:u});});});
  return {doc:doc,refs:out};}
function cssUrls(css){var out=[],re=/url\(\s*(['"]?)([^'")]+)\1\s*\)|@import\s+(['"])([^'"]+)\3/g,m;while((m=re.exec(css||"")))out.push(m[2]||m[4]);return out;}

/* ---------- the checks ---------- */
var LABELS={reads:"The page reads cleanly",names:"Every file it names is here",opens:"It opens with no errors",self:"Its own self-test",number:"Its build number moves forward"};
/* every script in the page parses (a classic script by the browser's own parser; a module only for its shape) */
function checkReads(html){var doc=new DOMParser().parseFromString(html,"text/html"),bad=[],n=0,mods=0,lineOf=function(idx){return html.slice(0,idx).split("\n").length;};
  var pos=0;[].forEach.call(doc.getElementsByTagName("script"),function(s){if(s.getAttribute("src"))return;var type=(s.getAttribute("type")||"").toLowerCase().trim(),code=s.textContent;
    var at=html.indexOf(code.slice(0,80),pos);if(at>=0)pos=at;var line=at>=0?lineOf(at):0;
    if(/json/.test(type)){n++;try{JSON.parse(code);}catch(e){bad.push("the data at line "+line+": "+e.message);}return;}
    if(type&&!/^(text|application)\/(javascript|ecmascript)$|^module$/.test(type))return;
    if(type==="module"){mods++;return;}
    n++;try{new Function(code);}catch(e){if(e&&e.name==="SyntaxError")bad.push("the script at line "+line+": "+e.message);}});
  return bad.length?{state:"fail",detail:bad.slice(0,4).join("; ")+(bad.length>4?"; and "+(bad.length-4)+" more":"")}:
    {state:"ok",detail:n+" script"+(n===1?"":"s")+" and data block"+(n===1?"":"s")+" read"+(mods?"; "+mods+" module"+(mods>1?"s":"")+" left to the browser":"")};}
function checkNames(id,snap,page,html){var refs=namedBy(html).refs,missing=[],seen={},cssJobs=[];
  refs.forEach(function(r){var p=localPath(page,r.ref);if(!p||seen[p])return;seen[p]=1;if(!snap.map[p])missing.push(p);else if(/\.css$/i.test(p))cssJobs.push(p);});
  return Promise.all(cssJobs.map(function(css){return readText(id,snap.commit,css).then(function(t){cssUrls(t).forEach(function(u){var p=localPath(css,u);if(p&&!seen[p]){seen[p]=1;if(!snap.map[p])missing.push(p);}});});})).then(function(){
    var n=Object.keys(seen).length;return missing.length?{state:"fail",detail:"not here: "+missing.slice(0,5).join(", ")+(missing.length>5?" and "+(missing.length-5)+" more":"")}:{state:"ok",detail:n?n+" file"+(n>1?"s":"")+" named, all here":"it names no other file"};});}
/* the build number: the page's ingenium-build, else the recipe's version, else its manifest's */
function numberOf(html,rec){var m=/<meta\s+name=["']ingenium-build["']\s+content=["']([^"']*)["']/i.exec(html||"");if(m&&m[1])return m[1];if(rec&&rec.version)return String(rec.version);
  var v=/<meta\s+name=["'](?:version|app-version)["']\s+content=["']([^"']*)["']/i.exec(html||"");return v?v[1]:"";}
function cmpVer(a,b){var x=String(a).split(/[^0-9]+/).filter(Boolean).map(Number),y=String(b).split(/[^0-9]+/).filter(Boolean).map(Number);
  for(var i=0;i<Math.max(x.length,y.length);i++){var p=x[i]||0,q=y[i]||0;if(p!==q)return p<q?-1:1;}return 0;}

/* the quiet window: the page made whole (its own files written into it), opened in a frame of its own with no access to
   Ingenium, for a few seconds; what it reports is gathered. Storage the frame is not allowed is lent to it in memory, so
   the app's own errors are not hidden behind the frame's. */
var SHIM='(function(){var P=parent,K="__NONCE__";function send(k,m){try{P.postMessage({ingTest:K,kind:k,msg:String(m).slice(0,600)},"*");}catch(e){}}'+
  'function mem(){var d={};return {getItem:function(k){return Object.prototype.hasOwnProperty.call(d,k)?d[k]:null;},setItem:function(k,v){d[k]=String(v);},removeItem:function(k){delete d[k];},clear:function(){d={};},key:function(i){return Object.keys(d)[i]||null;},get length(){return Object.keys(d).length;}};}'+
  '["localStorage","sessionStorage"].forEach(function(n){var ok=true;try{window[n].getItem("x");}catch(e){ok=false;}if(!ok){try{Object.defineProperty(window,n,{value:mem(),configurable:true});}catch(e){}}});'+
  'window.addEventListener("error",function(e){if(e&&e.target&&e.target!==window&&(e.target.src||e.target.href)){send("missing",(e.target.src||e.target.href));return;}send("error",(e.message||"error")+(e.lineno?" (line "+e.lineno+")":""));},true);'+
  'window.addEventListener("unhandledrejection",function(e){var r=e.reason;send("error","a promise was refused: "+(r&&r.message||r));});'+
  'var ce=console.error,cl=console.log;console.error=function(){send("console",[].slice.call(arguments).join(" "));try{ce.apply(console,arguments);}catch(e){}};'+
  'console.log=function(){var t=[].slice.call(arguments).join(" ");if(/INGENIUM_SELFTEST/.test(t))send("self",t);try{cl.apply(console,arguments);}catch(e){}};'+
  'window.addEventListener("load",function(){send("load","")});})();';
var NOISE=/SecurityError|The operation is insecure|access is denied|denied for this document|sandbox|serviceWorker|service worker|ServiceWorker|indexedDB|IndexedDB|cookie|storage|Storage|BroadcastChannel|Notification|clipboard|navigator\.share|getUserMedia/;
function quietRun(html,seconds){return new Promise(function(res){var nonce="t"+Math.random().toString(36).slice(2),frame=document.createElement("iframe"),got={errors:[],env:[],missing:[],self:[],loaded:false};
  var shim="<script>"+SHIM.replace("__NONCE__",nonce)+"<\/script>",h=/<head[^>]*>/i.test(html)?html.replace(/<head[^>]*>/i,function(m){return m+shim;}):shim+html;
  frame.setAttribute("sandbox","allow-scripts");frame.setAttribute("aria-hidden","true");frame.tabIndex=-1;frame.title="A quiet window for a test";
  frame.style.cssText="position:fixed;left:-12000px;top:0;width:1024px;height:768px;border:0;opacity:0;pointer-events:none";
  function on(e){var d=e.data;if(!d||d.ingTest!==nonce||e.source!==frame.contentWindow)return;
    if(d.kind==="load")got.loaded=true;else if(d.kind==="self")got.self.push(d.msg);else if(d.kind==="missing")got.missing.push(d.msg);
    else if(NOISE.test(d.msg))got.env.push(d.msg);else got.errors.push(d.msg);}
  window.addEventListener("message",on);frame.srcdoc=h;document.body.appendChild(frame);
  setTimeout(function(){window.removeEventListener("message",on);try{frame.remove();}catch(e){}res(got);},Math.max(1500,(seconds||4)*1000));});}

/* the five checks, recorded beside the version */
function test(id,opt){opt=opt||{};var step=opt.onStep||function(){},out={checks:[],at:Date.now()};
  return snapshot(id,opt.ref).then(function(snap){out.commit=snap.commit;return recipe(id,snap).then(function(rec){var page=mainPage(snap,rec);out.page=page;
    if(!page){out.checks=Object.keys(LABELS).map(function(k){return {id:k,label:LABELS[k],state:"none",detail:"there is no page in this version"};});out.ok=false;return out;}
    return readText(id,snap.commit,page).then(function(html){var C=function(k,r){var c={id:k,label:LABELS[k],state:r.state,detail:r.detail};out.checks.push(c);step(c);return c;};
      C("reads",checkReads(html));
      return checkNames(id,snap,page,html).then(function(r){C("names",r);return onePageFrom(id,snap,page,html);}).then(function(one){
        return quietRun(one.html,(rec.test&&rec.test.seconds)||opt.seconds||4).then(function(got){
          var here=location.href.replace(/[#?].*$/,"").replace(/[^\/]*$/,""),errs=got.errors.concat(got.missing.map(function(m){return "a file it asked for did not load: "+String(m).replace(here,"");}));
          C("opens",errs.length?{state:"fail",detail:errs.slice(0,3).join("; ")+(errs.length>3?"; and "+(errs.length-3)+" more":"")}:
            {state:got.env.length?"warn":"ok",detail:got.env.length?"no errors of its own; "+got.env.length+" thing"+(got.env.length>1?"s":"")+" a test window cannot lend it (its offline copy or stored data), which work on your devices":"it opened and ran with no errors"});
          var s=got.self.join("\n");C("self",!s?{state:"none",detail:"this app carries no self-test of its own"}:/FAIL/.test(s)?{state:"fail",detail:s.split("\n").filter(function(l){return /FAIL/.test(l);})[0]}:
            /\b(DONE|PASS|PAGE|READY)\b/.test(s)?{state:"ok",detail:"its self-test passed"}:{state:"warn",detail:"its self-test began but did not finish in the time given"});
          var num=numberOf(html,rec);
          return IngRepo.log(id,{ref:snap.commit,max:2}).then(function(l){var parent=l[1];if(!parent)return C("number",{state:num?"ok":"none",detail:num?"build "+num+", its first version here":"it carries no build number"});
            return IngRepo.files(id,parent.oid).then(function(pf){var pp=pf.filter(function(f){return f.path===page;})[0];if(!pp)return C("number",{state:num?"ok":"none",detail:num?"build "+num:"it carries no build number"});
              return readText(id,parent.oid,page).then(function(ph){var before=numberOf(ph,rec);
                if(!num)return C("number",{state:"none",detail:"it carries no build number"});
                if(!before)return C("number",{state:"ok",detail:"build "+num});
                var c=cmpVer(num,before);return C("number",c>0?{state:"ok",detail:"build "+before+" before, "+num+" now"}:c===0?{state:"warn",detail:"the same build number as the version before ("+num+"): devices may not take it as an update"}:{state:"fail",detail:"build "+num+" is lower than "+before+" before it"});});});});});});});});
  }).then(function(){out.ok=out.checks.every(function(c){return c.state!=="fail";});return IngRepo.setNote(id,out.commit,"test",out).then(function(){return out;});});}

/* ---------- the whole app in one page: its scripts, styles and pictures written into it ---------- */
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;");}
function onePageFrom(id,snap,page,html){var cache={},missing=[],n=0,big=0;
  function bytes(p){if(cache[p])return cache[p];cache[p]=IngRepo.read(id,p,snap.commit);return cache[p];}
  function inlineCss(base,css,depth){var jobs=[],urls=cssUrls(css);urls.forEach(function(u){var p=localPath(base,u);if(!p||!snap.map[p])return;
      jobs.push(bytes(p).then(function(b){if(!b)return;if(/\.css$/i.test(p)&&depth<4)return inlineCss(p,dec(b),depth+1).then(function(t){css=css.split(u).join("data:text/css;base64,"+b64(te.encode(t)));});
        if(b.length>24*1048576){big++;return;}n++;css=css.split(u).join(dataUri(p,b));}));});
    return Promise.all(jobs).then(function(){return css;});}
  var jobs=[],parts=[],re=/<script\b([^>]*?)\bsrc=(["'])([^"']+)\2([^>]*)>\s*<\/script>|<link\b([^>]*?)\bhref=(["'])([^"']+)\6([^>]*)>|<(img|source|video|audio|input)\b([^>]*?)\b(src|poster)=(["'])([^"']+)\12([^>]*)>|<style\b([^>]*)>([\s\S]*?)<\/style>/gi,m,last=0;
  while((m=re.exec(html))){parts.push(html.slice(last,m.index));var idx=parts.length;parts.push(m[0]);last=re.lastIndex;
    (function(m,idx){
      if(m[3]!==undefined){var p=localPath(page,m[3]);if(!p)return;if(!snap.map[p]){missing.push(p);return;}
        jobs.push(bytes(p).then(function(b){if(!b)return;n++;parts[idx]="<script"+(m[1]+m[4]).replace(/\s+defer\b|\s+async\b/gi,"")+">\n"+dec(b).replace(/<\/script/gi,"<\\/script")+"\n<\/script>";}));}
      else if(m[7]!==undefined){var rel=(/\brel=(["'])([^"']*)\1/i.exec(m[5]+m[8])||[])[2]||"",p2=localPath(page,m[7]);if(!p2)return;if(!snap.map[p2]){if(/stylesheet|icon/i.test(rel))missing.push(p2);return;}
        if(/stylesheet/i.test(rel))jobs.push(bytes(p2).then(function(b){if(!b)return;return inlineCss(p2,dec(b),0).then(function(css){n++;parts[idx]="<style>\n"+css+"\n</style>";});}));
        else if(/icon|apple-touch-icon/i.test(rel))jobs.push(bytes(p2).then(function(b){if(!b)return;n++;parts[idx]=m[0].replace(m[7],dataUri(p2,b));}));}
      else if(m[13]!==undefined){var p3=localPath(page,m[13]);if(!p3)return;if(!snap.map[p3]){missing.push(p3);return;}
        jobs.push(bytes(p3).then(function(b){if(!b)return;if(b.length>24*1048576){big++;return;}n++;parts[idx]=m[0].replace(m[13],dataUri(p3,b));}));}
      else if(m[16]!==undefined){jobs.push(inlineCss(page,m[16],0).then(function(css){parts[idx]="<style"+m[15]+">"+css+"</style>";}));}
    })(m,idx);}
  parts.push(html.slice(last));
  return Promise.all(jobs).then(function(){return {html:parts.join(""),inlined:n,missing:missing,tooBig:big};});}
/* 6.0: opt.quiet makes the page for another package (an APK, an IPA) without noting a one page made */
function onePage(id,opt){opt=opt||{};return snapshot(id,opt.ref).then(function(snap){return recipe(id,snap).then(function(rec){var page=mainPage(snap,rec);if(!page)throw new Error("there is no page in this version");
  return readText(id,snap.commit,page).then(function(html){return onePageFrom(id,snap,page,html);}).then(function(r){r.page=page;r.commit=snap.commit;r.bytes=te.encode(r.html);r.recipe=rec;
    if(opt.quiet)return r;
    return IngRepo.setNote(id,snap.commit,"onePage",{at:Date.now(),size:r.bytes.length,inlined:r.inlined,missing:r.missing.length}).then(function(){return r;});});});});}

/* ---------- a web app to install: its files, its manifest, and an offline copy of itself ---------- */
function webApp(id,opt){opt=opt||{};return snapshot(id,opt.ref).then(function(snap){return recipe(id,snap).then(function(rec){var page=mainPage(snap,rec);if(!page)throw new Error("there is no page in this version");
  return IngRepo.info(id).then(function(info){var name=rec.name||info.name,slug=info.slug,dir=page.indexOf("/")>=0?page.slice(0,page.lastIndexOf("/")+1):"";
    var files=snap.list.filter(function(f){return !/^(\.github\/|source\/|signing\/)/.test(f.path)&&!/\.(keystore|jks|p12|pem|key)$/i.test(f.path)&&f.path!=="ingenium.build.json";});
    return readText(id,snap.commit,page).then(function(html){var hasMan=/<link[^>]+rel=["']manifest["']/i.test(html),hasSw=/serviceWorker\.register/.test(html),extra=[],ver=numberOf(html,rec)||snap.commit.slice(0,7);
      var icons=files.filter(function(f){return /(^|\/)(icon|icons|app-?icon)[^\/]*\.png$|(^|\/)icons?\/[^\/]+\.png$/i.test(f.path);}).slice(0,6).map(function(f){var s=/(\d{2,4})x?\1?/.exec(f.path);return {src:f.path.slice(dir.length),sizes:s?s[1]+"x"+s[1]:"any",type:"image/png"};});
      if(!hasMan){extra.push({name:dir+"manifest.webmanifest",data:JSON.stringify({name:name,short_name:name.length>12?name.split(/\s+/).pop():name,start_url:"./"+page.slice(dir.length),scope:"./",display:"standalone",background_color:"#ffffff",theme_color:"#ffffff",icons:icons},null,2)});
        html=html.replace(/<\/head>/i,'  <link rel="manifest" href="manifest.webmanifest">\n</head>');}
      if(!hasSw){var list=files.map(function(f){return "./"+f.path.slice(dir.length);}).filter(function(p){return p.indexOf("./../")<0;});list.push("./");if(!hasMan)list.push("./manifest.webmanifest");
        extra.push({name:dir+"sw.js",data:"/* "+name+": keeps itself for when there is no connection (made by Ingenium) */\nconst CACHE = '"+slug+"-"+ver.replace(/[^\w.-]/g,"")+"';\nconst FILES = "+JSON.stringify(list)+";\n"+
          "self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });\n"+
          "self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim())); });\n"+
          "self.addEventListener('fetch', e => { if (e.request.method !== 'GET') return; e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request))); });\n"});
        html=html.replace(/<\/body>/i,"<script>if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('sw.js').catch(function(){});<\/script>\n</body>");}
      var out=[],chain=Promise.resolve(),top=slug+"-web-"+ver.replace(/[^\w.-]/g,"")+"/";
      files.forEach(function(f){chain=chain.then(function(){if(f.path===page){out.push({name:top+f.path,data:te.encode(html),mode:parseInt(f.mode,8)});return;}
        return IngRepo.read(id,f.path,snap.commit).then(function(b){out.push({name:top+f.path,data:b,mode:parseInt(f.mode,8)});});});});
      return chain.then(function(){extra.forEach(function(x){out.push({name:top+x.name,data:te.encode(x.data)});});
        out.push({name:top+"README.txt",data:te.encode(name+" "+ver+"\n\nOpen "+page+" in a browser, or put this folder on any web host (https) and open it there: it installs as an app and works with no connection.\nMade by Ingenium from version "+snap.commit+".\n")});
        return IngRepo.core.zip(out,{comment:snap.commit});}).then(function(z){return IngRepo.setNote(id,snap.commit,"webApp",{at:Date.now(),size:z.length,files:out.length}).then(function(){return {bytes:z,name:top.slice(0,-1)+".zip",files:out.length,commit:snap.commit};});});});});});});}

return {test:test,onePage:onePage,webApp:webApp,labels:LABELS,_:{checkReads:checkReads,namedBy:namedBy,localPath:localPath,cssUrls:cssUrls,cmpVer:cmpVer,numberOf:numberOf,quietRun:quietRun}};
})();
window.IngShip=IngShip;
;try{window.__ingParts["p43"]="running";}catch(_){}
</script>
