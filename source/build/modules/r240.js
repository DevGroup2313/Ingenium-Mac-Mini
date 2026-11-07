<style id="r240-css">
/* 6.42: the Offline Project's crest in Lector's app tiles, at a seal's height (modules/r240.js) */
#lx7 .l-app > .ing-crest{display:block;margin:0 auto 2px}
#lx7 .l-app > .ing-crest img.ic-l{width:100%;height:100%}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p240"]="started";}catch(_){}
/* ============ R240 · ANY APP, NOT ONLY HER FOUR (Ingenium 6.42, 6 November 2026) ============
   Her words (6 November 2026): "I need for Lector and every other page inside of Ingenium to be able to take other apps. It should not be
   limited to only the 4 apps inside of Ingenium. Lector should be able to read and analyse and process any app inside of Ingenium."
   Until now the app library (the base page's libDetect, libFromPage) kept only a page it recognised as Carpe Diem, The Forge, Ingenium or
   Inkwell; any other page was left aside, so Lector, the chat's + menu, Fabrica's library and Storage never saw it. Now:
   - any app's page is kept, under its own name: its <title> (or the application name, its first heading, the file's name), as
     "app-" and the name in plain letters (a page named the same again is a newer copy of it, the copy before it kept one step back, as
     for her apps); its version from the page (a version meta, an APP_VERSION or VERSION in its code, or a number in its title); its own
     colour from its theme-color; a zip keeps the app's main page (index.html, or the largest page) when none of her apps is in it;
   - libKeys() lists her four first (in the edition's own order), then the others by name; libApps() follows it, so every page that lists
     the library lists them all; libName(k) names any of them;
   - each other app has a seal: its own logo when its page names one (modules/r239.js), or a seal of its initials in its colour; the seal
     is kept in ING_SEALS beside her apps' seals, so Lector's paper and a Word file's cover carry it as they carry hers;
   - what stays hers alone: the four apps' seals, papers and crests, the Offline Project's names (a duo, a trio, all four), and the
     Forge's library file format (it holds her apps). The public editions, which have no Lector and no Fabrica, keep the library as it was. */
(function r240(){
"use strict";
if(window.__r240)return;window.__r240=1;
var W=window,D=document;
if(typeof W.libState!=="function"||typeof W.libFromPage!=="function"||typeof W.libKeep!=="function"||typeof W.libSha!=="function")return;
function allowed(){try{if(typeof W.libOn==="function"&&!W.libOn())return false;return typeof ING_HAS!=="function"||ING_HAS("lector")||ING_HAS("fabrica");}catch(e){return true;}}
function plain(s){var t=D.createElement("textarea");t.innerHTML=String(s||"").replace(/<[^>]+>/g," ");return t.value.replace(/\s+/g," ").trim();}
function metaContent(head,name){var re=new RegExp("<meta\\b[^>]*(?:name|property)\\s*=\\s*[\"']"+name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"[\"'][^>]*>","i"),m=re.exec(head);if(!m)return "";
  var c=/content\s*=\s*("([^"]*)"|'([^']*)')/i.exec(m[0]);return c?(c[2]!=null?c[2]:c[3]):"";}
function slug(s){s=String(s||"");try{s=s.normalize("NFKD").replace(/[\u0300-\u036f]/g,"");}catch(e){}return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/,"");}
function isPage(text){return /<(html|head|body|script|main|div|canvas|svg)\b/i.test(String(text||"").slice(0,200000));}
/* its name, without a version written after it */
function titleOf(text,name){var head=String(text||"").slice(0,400000),m,t="";
  if((m=/<title[^>]*>([\s\S]*?)<\/title>/i.exec(head)))t=plain(m[1]);
  if(!t)t=plain(metaContent(head,"application-name")||metaContent(head,"og:title"));
  if(!t&&(m=/<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(head)))t=plain(m[1]);
  if(!t){t=String(name||"").replace(/^.*[\\\/]/,"").replace(/\.(html?|zip)$/i,"").replace(/[-_]+/g," ").trim();if(t)t=t.charAt(0).toUpperCase()+t.slice(1);}
  t=t.replace(/\s*[-·|:,]?\s*v?\d+(\.\d+){1,3}[a-z0-9.-]*\s*$/i,"").trim();
  return (t||"An app").slice(0,80);}
function versionOf(text){var head=String(text||"").slice(0,400000),v=metaContent(head,"version")||metaContent(head,"application-version")||metaContent(head,"app-version"),m;
  if(!v&&(m=/\b(?:APP_VERSION|VERSION|appVersion)\s*[:=]\s*["']v?(\d+(?:\.\d+){1,3}[a-z0-9.-]*)["']/.exec(head)))v=m[1];
  if(!v&&(m=/<title[^>]*>([\s\S]*?)<\/title>/i.exec(head))){var t=/\bv?(\d+(?:\.\d+){1,3})\b/i.exec(m[1]);if(t)v=t[1];}
  return v?String(v).replace(/^v/i,"").slice(0,24):"";}
function colorOf(text){var c=metaContent(String(text||"").slice(0,400000),"theme-color").trim(),m=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c);if(!m)return "";
  var h=m[1];if(h.length===3)h=h.split("").map(function(x){return x+x;}).join("");return "#"+h.toLowerCase();}
/* a quiet ink for an app that names no colour, the same each time */
var TONES=["#2f6f8f","#7a4a1f","#3f6b3a","#7a2f4f","#4a4a8a","#8a5a2a","#2f6a6a","#6a3a7a"];
function tone(k){var h=0;k=String(k||"");for(var i=0;i<k.length;i++)h=(h*31+k.charCodeAt(i))>>>0;return TONES[h%TONES.length];}
function rec(k){try{return libState().apps[k]||null;}catch(e){return null;}}
function keyFor(title){var A=libState().apps,base="app-"+(slug(title)||"app"),k=base,n=2;
  while(A[k]&&A[k].title&&A[k].title!==title)k=base+"-"+(n++);return k;}

/* ---------- the Offline Project: never kept as a copy (6.45) ----------
   6.42 kept its page in the master edition as two more apps, "offline" and "offline3" (her words then: "I want the Offline Project to be
   built into Ingenium the same way as the other 4 apps and be listed among them. I want both variations in"). Her words since (6 November
   2026): "that way, the Offline Project inside of the app can always reflect the 4 latest apps that is kept inside of Ingenium instead of
   an old saved version of older apps versions"; and, asked whether the app library should stop keeping saved copies of the Offline
   Project's page altogether: "Yes, the app library stop keeping saved copies of the Offline Project's page". So, in every edition:
   - a page that is the Offline Project (its one-file app, source/offline_project/master_demo/build_master_demo.py --mode app, or its
     site's hall; known by its title, with or without Inkwell) is not kept, nor a zip that holds one (the apps' pages in such a zip are
     the copies it was made with), and the library says why;
   - a copy kept by 6.42 or 6.43 ("offline", "offline3", or in the full edition an app of that name) is let go of, its bytes with it;
   - in the master edition Lector shows the Offline Project's crest for the set of her apps chosen, drawn from the apps Ingenium holds
     now (modules/r108.js, 6.43). */
function master(){try{return typeof ING_EDITION==="undefined"||ING_EDITION==="master";}catch(e){return false;}}
function offlineOf(text){var head=String(text||"").slice(0,400000);if(!/<title>\s*The Offline Project\s*<\/title>/i.test(head))return null;
  return /"without"\s*:\s*\[\s*"inkwell"/.test(String(text||"").slice(0,3000000))?"offline3":"offline";}
var OFF_SAYS=master()?"The Offline Project is not kept as a copy: Ingenium makes it from the four apps it holds now, so it always has their latest versions. To bring in a newer version of one of them, add that app's own page or the zip you install it from."
  :"This page holds a set of apps, not one app, so the app library does not keep it. Add each app's own page instead.";  /* the other editions never name it */
var REFUSED=[];
function refused(name){name=String(name||"The Offline Project");if(REFUSED.indexOf(name)<0)REFUSED.push(name);return Promise.resolve([]);}
var oDet=W.libDetect;
/* not one of her apps, whatever it carries inside it (its one-file app holds all four) */
if(typeof oDet==="function")W.libDetect=function(text){return offlineOf(text)?null:oDet.apply(this,arguments);};
function isOffTitle(t){return /^The Offline Project( without Inkwell| \(without Inkwell\))?$/i.test(String(t||"").trim());}
/* what 6.42 and 6.43 kept: let go of, with its bytes here and on the computer app's disk */
function letGo(){var n=0;try{var A=libState().apps;Object.keys(A).forEach(function(k){var m=A[k];
      if(!(k==="offline"||k==="offline3"||(/^app-/.test(k)&&m&&isOffTitle(m.title))))return;
      try{if(m&&m.earlier&&m.earlier.ref)libDel(m.earlier.ref);if(m&&m.ref)libDel(m.ref);}catch(e){}
      delete A[k];n++;try{if(W.ING_SEALS)delete ING_SEALS[k];}catch(e){}});
    if(n){try{saveState();}catch(e){}}}catch(e){}return n;}
letGo();try{setTimeout(letGo,2500);}catch(e){}
/* a desk adopted from the computer app's disk without a reload */
var oRep=W.repaintDesk;if(typeof oRep==="function")W.repaintDesk=function(){var r=oRep.apply(this,arguments);letGo();return r;};

/* ---------- the list of the library: her four first, then any other app by name ---------- */
/* 6.55: Lakay, her store's app, is one of her apps by name (LIB_KEYS) and is listed as the others after the four are: by name, in its colour */
var BEYOND=["lakay"];
function otherKeys(){var A=libState().apps;if(!allowed())return [];
  return Object.keys(A).filter(function(k){return (/^app-/.test(k)||BEYOND.indexOf(k)>=0)&&A[k]&&A[k].ref;}).sort(function(a,b){return String(A[a].title||a).localeCompare(String(A[b].title||b));});}
function libKeys(){letGo();var base=(typeof LIB_KEYS!=="undefined"&&LIB_KEYS)?LIB_KEYS.filter(function(k){return BEYOND.indexOf(k)<0;}):[];return base.concat(otherKeys());}
function libName(k){try{if(typeof LIB_NAMES!=="undefined"&&LIB_NAMES[k])return LIB_NAMES[k];}catch(e){}var m=rec(k);return (m&&m.title)||String(k||"");}
function appColor(k){var m=rec(k);return (m&&m.color)||tone(k);}
W.libOtherKeys=otherKeys;W.libKeys=libKeys;W.libName=libName;W.libAppColor=appColor;
W.libApps=function(){var A=libState().apps;return libKeys().filter(function(k){return A[k]&&A[k].ref;}).map(function(k){return Object.assign({key:k},A[k]);});};
var oVer=W.libVersionOf;if(typeof oVer==="function")W.libVersionOf=function(key,text){return /^app-/.test(String(key||""))?versionOf(text):oVer.apply(this,arguments);};

/* ---------- keeping one: any app's page, under its own name ---------- */
var oFrom=W.libFromPage;
/* a page of one of her apps that this edition does not list (the full edition lists Ingenium alone) is kept as any other app,
   under its own name, so it is never kept out of sight */
function listed(k){try{return typeof LIB_KEYS==="undefined"||LIB_KEYS.indexOf(k)>=0;}catch(e){return true;}}
W.libFromPage=function(u8,name){var text=new TextDecoder().decode(u8);if(offlineOf(text))return refused(name);
  var k0=typeof libDetect==="function"?libDetect(text):null;
  if(typeof libDetect!=="function"||(k0&&listed(k0))||!allowed())return oFrom.apply(this,arguments);
  if(!isPage(text))return Promise.resolve([]);
  var title=titleOf(text,name),key=keyFor(title),ver=versionOf(text);
  return libSha(u8).then(function(h){return libKeep(key,{title:title,version:ver,build:"",date:"",size:u8.length,sha256:h,name:name,source:"file",color:colorOf(text),other:1},u8,text);})
    .then(function(r){if(r!=="same"){delete SEAL[key];try{if(W.ING_SEALS)delete ING_SEALS[key];}catch(e){}}sealFor(key);return [{key:key,label:title+(ver?" "+ver:""),state:r}];});};
/* a zip with none of her apps in it: its main page (index.html, or the largest page), kept as the app it is */
var oZip=W.libFromZip;
if(typeof oZip==="function")W.libFromZip=function(u8,name,depth){return oZip.apply(this,arguments).then(function(out){if((out&&out.length)||!allowed()||(depth||0)>0)return out||[];
  var ents=null;try{ents=libZipEntries(u8);}catch(e){}if(!ents)return out||[];
  var pages=Object.keys(ents).filter(function(n){return /\.html?$/i.test(n)&&!/(^|\/)(vendor|node_modules|__MACOSX)\//i.test(n);});if(!pages.length)return out||[];
  var main=pages.filter(function(n){return /(^|\/)index\.html?$/i.test(n);}).sort(function(a,b){return a.split("/").length-b.split("/").length;})[0]||pages.sort(function(a,b){return (ents[b].usz||0)-(ents[a].usz||0);})[0];
  return libZipData(u8,ents[main]).then(function(b){return W.libFromPage(b,main.split("/").pop());});});};
/* a zip that holds the Offline Project's page (its site, or its one-file app) is not kept: the apps' pages in it are the copies it was
   made with. Its hall is a small page (the apps' pages are large), so only the small pages are opened to look */
function offZip(u8){var ents=null;try{ents=libZipEntries(u8);}catch(e){}if(!ents)return Promise.resolve(false);
  var names=Object.keys(ents).filter(function(n){return /\.html?$/i.test(n)&&!/(^|\/)(vendor|node_modules|__MACOSX)\//i.test(n);});
  if(names.some(function(n){return /(^|\/)The Offline Project( \(without Inkwell\))?\.html?$/i.test(n);}))return Promise.resolve(true);
  var small=names.filter(function(n){return (ents[n].usz||0)<=8e6;}).sort(function(a,b){return a.split("/").length-b.split("/").length;}).slice(0,6),i=0;
  function next(){if(i>=small.length)return Promise.resolve(false);var n=small[i++];
    return libZipData(u8,ents[n]).then(function(b){return offlineOf(new TextDecoder().decode(b.subarray(0,Math.min(b.length,400000))))?true:next();},function(){return next();});}
  return next();}
var oZip2=W.libFromZip;
if(typeof oZip2==="function")W.libFromZip=function(u8,name,depth){var self=this,args=arguments;
  return offZip(u8).then(function(hit){return hit?refused(name):oZip2.apply(self,args);});};
/* Add your apps: what was not kept, and why */
var oAdd=W.libAddFiles;
if(typeof oAdd==="function")W.libAddFiles=function(list){if(!LIB.busy)REFUSED=[];
  return Promise.resolve(oAdd.apply(this,arguments)).then(function(v){if(!REFUSED.length||LIB.busy)return v;var last=W.__libLastAdd||{};
    var none=last.none||[],left=none.filter(function(n){return REFUSED.indexOf(n)<0;}),tail=". Choose an app's own page, or the zip you install it from.";
    var was=none.length?"None of your apps was found in "+none.join(", ")+tail:"",now=(left.length?"None of your apps was found in "+left.join(", ")+tail+" ":"")+OFF_SAYS;
    var note=String(LIB.note||"");LIB.note=was&&note.indexOf(was)>=0?note.replace(was,now):(note?note+" ":"")+OFF_SAYS;
    last.none=left;last.offline=REFUSED.slice();W.__libLastAdd=last;
    try{libPaint();}catch(e){}
    try{var c=D.getElementById("libCard");if(c&&typeof libCardHtml==="function"){var x=D.createElement("div");x.innerHTML=libCardHtml();c.replaceWith(x.firstChild);if(typeof libWire==="function")libWire();}}catch(e){}
    return v;});};
/* the older card's "Or choose one app's page": any page, not only hers */
W.libImportPage=function(file){if(LIB.busy)return;LIB.busy="Reading "+file.name+"…";libPaint();REFUSED=[];
  libReadBuf(file).then(function(buf){return W.libFromPage(new Uint8Array(buf),file.name);})
    .then(function(rs){if(!rs||!rs.length)throw new Error(REFUSED.length?OFF_SAYS:"This file is not an app's page.");var r=rs[0];LIB.warn=false;LIB.note=(r.state==="same"?"Already kept, unchanged: ":"Kept on this device: ")+r.label+".";})
    .catch(function(e){LIB.warn=true;LIB.note=String(e&&e.message||e);})
    .then(function(){LIB.busy=null;libPaint();try{if(typeof lxRender==="function")lxRender();}catch(e){}});};

/* ---------- each other app's seal: its own logo, or its initials in its colour ---------- */
var SEAL={},LETTER={};
function initials(t){var w=String(t||"A").replace(/[^A-Za-z0-9 ]/g," ").split(/\s+/).filter(Boolean);return ((w[0]||"A").charAt(0)+((w[1]||"").charAt(0)||"")).toUpperCase();}
function letterSeal(k){var m=rec(k),key=k+":"+((m&&m.title)||"")+":"+appColor(k);if(LETTER[key])return LETTER[key];
  var c=D.createElement("canvas");c.width=256;c.height=256;var x=c.getContext("2d"),col=appColor(k);
  var g=x.createRadialGradient(110,96,20,128,128,124);g.addColorStop(0,col);g.addColorStop(1,shade(col,-.28));x.fillStyle=g;x.beginPath();x.arc(128,128,120,0,Math.PI*2);x.fill();
  x.strokeStyle="rgba(255,255,255,.55)";x.lineWidth=5;x.beginPath();x.arc(128,128,104,0,Math.PI*2);x.stroke();
  x.fillStyle="#ffffff";x.font="600 "+(initials(m&&m.title).length>1?92:112)+"px Georgia,'Times New Roman',serif";x.textAlign="center";x.textBaseline="middle";x.fillText(initials(m&&m.title),128,136);
  var u=c.toDataURL("image/png");LETTER[key]=u;try{W.ING_SEALS=W.ING_SEALS||{};if(!ING_SEALS[k])ING_SEALS[k]={b64:u.split(",")[1],w:256,h:256,letter:1};}catch(e){}return u;}
function shade(hex,f){var n=parseInt(String(hex).slice(1),16),r=n>>16&255,g=n>>8&255,b=n&255;function s(v){return Math.max(0,Math.min(255,Math.round(f<0?v*(1+f):v+(255-v)*f)));}
  return "#"+[s(r),s(g),s(b)].map(function(v){return (v<16?"0":"")+v.toString(16);}).join("");}
function sealFor(k){if(SEAL[k])return SEAL[k];var m=rec(k);if(!m||!/^app-/.test(k))return Promise.resolve(null);
  SEAL[k]=Promise.resolve().then(function(){return typeof libText==="function"?libText(k):null;})
    .then(function(text){return (text&&W.IngAppIcon&&typeof IngAppIcon.forPage==="function")?IngAppIcon.forPage(text,k+":"+(m.sha256||"")):null;})
    .then(function(ic){var face=null;if(ic&&ic.layers){var f=ic.layers.filter(function(L){return !L.side;})[0];if(f&&/^data:image\/png;base64,/.test(f.src))face=f.src;}
      if(face){try{W.ING_SEALS=W.ING_SEALS||{};ING_SEALS[k]={b64:face.split(",")[1],w:256,h:256};}catch(e){}return {face:face,layers:ic.layers,logo:true};}
      var u=letterSeal(k);return (W.IngAppIcon&&IngAppIcon.layersFrom?IngAppIcon.layersFrom(u):Promise.resolve(null)).then(function(L){return {face:u,layers:L&&L.layers?L.layers:[{src:u,z:0}],logo:false};});},
      function(){var u=letterSeal(k);return {face:u,layers:[{src:u,z:0}],logo:false};});
  return SEAL[k];}
W.libSealFor=sealFor;W.libLetterSeal=letterSeal;W.libShade=shade;
/* the seals of what is already kept, ready for the papers and the Word files */
try{setTimeout(function(){otherKeys().forEach(function(k){letterSeal(k);sealFor(k);});},1500);}catch(e){}
W.IngAnyApp={offlineOf:offlineOf,offSays:OFF_SAYS,refused:function(){return REFUSED.slice();},letGo:letGo,titleOf:titleOf,versionOf:versionOf,colorOf:colorOf,keyFor:keyFor,keys:libKeys,others:otherKeys,name:libName,color:appColor,seal:sealFor};
})();
;try{window.__ingParts["p240"]="running";}catch(_){}
</script>
