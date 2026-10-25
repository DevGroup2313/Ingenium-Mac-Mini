<script>try{(window.__ingParts=window.__ingParts||{})["p99"]="started";}catch(_){}
/* ============ R178 · AN APP SHIPPED AS ITSELF (Ingenium 6.7, 25 October 2026) ============
   The owner's words (25 October 2026): "Ingenium's windows app does not ship proper apps and packages. I tried to ship new
   Forge app on windows laptop and it kept on showing Ingenium's files on the zip folder and not the Forge and its kit and
   icons."
   The cause: every kit for an app other than Ingenium was made by kitAssemble from Ingenium's own repositories (the whole
   Windows repository for Windows, the Mac one for the Macs, the Android one for the tablet, iPhone and iPad), with only
   app.json, the model lists and the build file's name line changed and the app's page laid in as ingenium.html. Ingenium's
   icons, installer script, shell, guides and file names stayed in the zip, and a build from it made an app with Ingenium's
   icon.
   Now:
   1. An app whose page carries its own package templates (a script whose id ends in "pkg-src" and holds "b64:" and a JSON
      with v and a map of files for each device) is shipped from them, as its own packager ships it: the same folders,
      files and placeholders, its icons drawn from its own picture at every size the templates name, its licence and
      terms, its name, file stem and app id (from Fabrica's package details, else found in its page as its own code finds
      them). The packager below is a faithful port of that code (pkgMap, pkgFillText, pkgIcons, pkgSource, pkgEntries,
      pkgManifest, webifyApp, pkgZipName). The templates are found by their markup, never by the app's name.
   2. An app with no templates of its own still gets the generic kit, made the app's own: its icons in place of every icon
      file (the same formats and sizes), the files that carry the app's identity renamed for it with every build file that
      names them changed to match (its page, its shell's script, its build recipe, its icons, its installer script, its
      build and run files), the defaults in the build files set to its name, file stem and app id, and the guides that
      describe the app written for it. The makers' notices in the build files and the shell's and engine's own sources
      (their makers' work) stay as they are.
   3. Every way of shipping another app goes through this: Fabrica's Build kits and its web app card, Download as an app
      (each device row and its "Or the ... project" keys, in Chat, Code, Build and Fabrica) and the old Build page's rows,
      which now read a large page that Build holds part by part (they found the editor empty).
   4. A kit Fabrica kept before this part first ran on the device (made from Ingenium's files) is let go once, so its
      Releases cannot save it again in place of the app's own.
   modules/r112.js and r139.js wait for a kit that is still being drawn (two lines each); r139.js reads a page's title as far
   into its head as an app's own packager does (the Forge's title is past the first 400,000 characters, so Chat and Code
   named it from its file); this module does the rest. */
(function r178(){
"use strict";
if(window.__ingR178)return;window.__ingR178=true;
var TE=new TextEncoder(),TD=new TextDecoder("utf-8");
function u8(x){return typeof x==="string"?TE.encode(x):x;}
function b64Bytes(s){var bin=atob(s),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u;}
function bytesB64(u){var s="",i,C=0x8000;for(i=0;i<u.length;i+=C)s+=String.fromCharCode.apply(null,u.subarray(i,i+C));return btoa(s);}
function pageText(h){return typeof h==="string"?h:(h&&h.length?TD.decode(h):"");}

/* ---------- 1. the templates an app's page carries ---------- */
var DEVICES=["mac","mac_mini","windows","ios","fire","web"];
var tplMemo={key:"",val:null};
function templatesOf(html){var s=pageText(html);if(s.length<200)return null;var from=0,i;
  while((i=s.indexOf("pkg-src",from))>=0){from=i+7;
    var open=s.lastIndexOf("<script",i);if(open<0||s.lastIndexOf(">",i)>open)continue;
    var close=s.indexOf(">",i);if(close<0)continue;var tag=s.slice(open,close+1);
    if(!/^<script\b[^>]*\bid=["'][\w-]*pkg-src["'][^>]*>$/i.test(tag))continue;
    var end=s.indexOf("<\/script",close);if(end<0)continue;
    var body=s.slice(close+1,end).trim();if(body.indexOf("b64:")!==0)continue;
    var key=body.length+":"+body.slice(4,68)+body.slice(-64);if(tplMemo.key===key)return tplMemo.val;
    var T=null;try{T=JSON.parse(TD.decode(b64Bytes(body.slice(4).replace(/\s+/g,""))));}catch(e){T=null;}
    if(T&&typeof T==="object"&&T.v!=null&&DEVICES.some(function(d){return T[d]&&typeof T[d]==="object";})){tplMemo={key:key,val:T};return T;}}
  return null;}

/* ---------- 2. the app's own packager, as its page writes it (ported faithfully; the templates are passed in) ---------- */
var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
function pad(n){return (n<10?"0":"")+n;}
function pkgTitle(base){var t=String(base||"").replace(/[_\-.]+/g," ").replace(/\s+/g," ").trim().replace(/\b[a-z]/g,function(c){return c.toUpperCase();});return t||"My App";}
function cleanTitle(t){var x=String(t||"");
  try{x=x.replace(new RegExp("[^\\p{L}\\p{N} ]+","gu")," ");}catch(e){x=x.replace(/[^A-Za-z0-9\u00c0-\u024f ]+/g," ");}
  x=x.replace(/\s+/g," ").trim();if(x.length>40)x=x.slice(0,40).trim();return x;}
function slug(t){var x=String(t||"");try{x=x.normalize("NFD").replace(/[\u0300-\u036f]/g,"");}catch(e){}
  x=x.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");if(!x)x="my_app";if(/^[0-9]/.test(x))x="app_"+x;return x;}
function detect(html){var d={},h=pageText(html),head=h.slice(0,3000000);
  var m=/window\.CD_BUILD=\{date:"([^"]*)",pass:"([^"]*)",stamp:"([^"]*)"\}/.exec(h);
  if(m){d.date=m[1];d.pass=m[2].replace(/\D/g,"").slice(0,9);d.stamp=m[3];}
  var t=/<title>([^<]{1,160})<\/title>/i.exec(head);if(t)d.htmlTitle=cleanTitle(t[1].split(/\s*;\s*|\s+[\u00b7|:\u2014\u2013-]\s+/)[0]);
  var tc=/<meta\s+name="theme-color"\s+content="(#[0-9a-fA-F]{3,8})"/i.exec(head);if(tc)d.theme=tc[1];
  return d;}
function idOk(id){return /^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$/.test(String(id||""))&&String(id).length<=100;}
/* an id made from the app's name as Ingenium makes one (kitIdFor names the edition's own prefix) */
function idFor(key){var w=String(key||"").toLowerCase().replace(/[^a-z0-9]/g,"");if(!/^[a-z]/.test(w))w="app"+w;
  try{if(typeof kitIdFor==="function")return kitIdFor(w);}catch(e){}return "app.ingenium."+w;}
function mapOf(idt){var title=idt.title,base=slug(title),dash=base.replace(/_/g,"-"),nosp=title.replace(/\s+/g,"");
  var ios=nosp;try{ios=ios.normalize("NFD").replace(/[\u0300-\u036f]/g,"");}catch(e){}
  ios=ios.replace(/[^A-Za-z0-9]/g,"");if(!ios||/^[0-9]/.test(ios))ios="App"+ios;
  var appleId=String(idt.id).replace(/_/g,""),dt=new Date();
  return {__APP_TITLE__:title,__APP_STAMP__:title.toUpperCase(),__APP_HTML__:base+".html",__APP_BASE__:base,
    __APP_DIR__:nosp,__APP_DASH__:dash,__APP_ID__:idt.id,__APP_IOS_ID__:appleId,__APP_MAC_ID__:(idt.macId||appleId).replace(/_/g,""),
    __APP_IOS_NAME__:ios,__APP_APK__:dash+".apk",__APP_EXE__:title+".exe",__APP_DOTAPP__:title+".app",
    __APP_ZIPMAC__:title.replace(/\s+/g,"-")+"-Mac.zip",__APP_ZIPWIN__:title.replace(/\s+/g,"-")+"-Windows.zip",__APP_IPA__:ios+".ipa",
    __APP_PASS__:idt.pass,__APP_DATE__:idt.date,__APP_BUILD__:idt.stamp||idt.pass,
    __APP_TODAY__:dt.getDate()+" "+MONTHS[dt.getMonth()]+" "+dt.getFullYear(),
    __APP_PROJ__:base+"_android_project",__APP_APK_NAME__:dash};}
function fill(str,map){return String(str).replace(/__APP_[A-Z0-9_]+?__/g,function(k){return Object.prototype.hasOwnProperty.call(map,k)?map[k]:k;});}
function fillText(str,map){var has=Object.prototype.hasOwnProperty,src=String(str).split("\n"),out=[];
  function rep(ch,n){return new Array(n+1).join(ch);}
  for(var i=0;i<src.length;i++){var t=src[i],cr=t.charAt(t.length-1)==="\r";if(cr)t=t.slice(0,-1);
    var f=t.replace(/(__APP_[A-Z0-9_]+?__)( {3,})(?=\S)/g,function(m,k,sp){if(!has.call(map,k))return m;var v=String(map[k]);return v+rep(" ",Math.max(2,k.length+sp.length-v.length));});
    f=fill(f,map);
    var u=/^( *)(=+|-+) *$/.exec(t);
    if(u&&u[2].length>=3&&i>0&&/__APP_[A-Z0-9_]+?__/.test(src[i-1])){var above=out[i-1].replace(/\r$/,"").replace(/\s+$/,"");
      if(above)f=u[1]+rep(u[2].charAt(0),Math.max(3,above.length-u[1].length));}
    out.push(cr?f+"\r":f);}
  return out.join("\n");}
function textOf(T,which,map){return fillText((T.texts||{})[which]||"",map);}
/* the app's picture: the largest PNG its page names as its icon (180 pixels or more), else the templates' own seal */
function iconSource(html,T){var head=pageText(html).slice(0,3000000),best=null,bestSize=0,re=/<link\b[^>]*>/gi,m;
  while((m=re.exec(head))){var tag=m[0];if(!/rel="(?:icon|apple-touch-icon|shortcut icon)"/i.test(tag))continue;
    var href=/href="(data:image\/png;base64,[^"]+)"/i.exec(tag);if(!href)continue;
    var sz=/sizes="(\d+)x\d+"/i.exec(tag),n=sz?parseInt(sz[1],10):0;if(/media="[^"]*dark/i.test(tag))n-=1;
    if(n>bestSize){bestSize=n;best=href[1];}}
  if(best&&bestSize>=180)return best;
  var seal=T&&T.icons&&T.icons.seal512;return seal?"data:image/png;base64,"+String(seal).replace(/^b64:/,""):null;}
function loadImage(url){return new Promise(function(res,rej){var im=new Image();im.onload=function(){res(im);};im.onerror=function(){rej(new Error("the app's icon could not be read"));};im.src=url;});}
function canvas(w,h){var c=document.createElement("canvas");c.width=w;c.height=h;return c;}
function draw(img,size){var cur=img,cw=img.naturalWidth||img.width,ch=img.naturalHeight||img.height;
  while(cw/2>=size&&ch/2>=size){var c=canvas(Math.round(cw/2),Math.round(ch/2)),x=c.getContext("2d");x.imageSmoothingEnabled=true;try{x.imageSmoothingQuality="high";}catch(e){}x.drawImage(cur,0,0,c.width,c.height);cur=c;cw=c.width;ch=c.height;}
  var o=canvas(size,size),ox=o.getContext("2d");ox.imageSmoothingEnabled=true;try{ox.imageSmoothingQuality="high";}catch(e){}ox.drawImage(cur,0,0,size,size);return o;}
function onSquare(img,size,frac,bg){var c=canvas(size,size),x=c.getContext("2d");x.fillStyle=bg;x.fillRect(0,0,size,size);var inner=Math.round(size*frac),off=Math.round((size-inner)/2);x.drawImage(draw(img,inner),off,off);return c;}
function png(c){var u=c.toDataURL("image/png");return b64Bytes(u.slice(u.indexOf(",")+1));}
function ico(list){var n=list.length,head=6+16*n,total=head+list.reduce(function(a,p){return a+p.bytes.length;},0);
  var out=new Uint8Array(total),dv=new DataView(out.buffer);dv.setUint16(0,0,true);dv.setUint16(2,1,true);dv.setUint16(4,n,true);
  var off=head;list.forEach(function(p,i){var e=6+16*i;out[e]=p.size>=256?0:p.size;out[e+1]=p.size>=256?0:p.size;dv.setUint16(e+4,1,true);dv.setUint16(e+6,32,true);dv.setUint32(e+8,p.bytes.length,true);dv.setUint32(e+12,off,true);out.set(p.bytes,off);off+=p.bytes.length;});
  return out;}
function icns(list){var total=8+list.reduce(function(a,e){return a+8+e.bytes.length;},0),out=new Uint8Array(total),dv=new DataView(out.buffer);
  function tag(o,t){for(var i=0;i<4;i++)out[o+i]=t.charCodeAt(i);}
  tag(0,"icns");dv.setUint32(4,total,false);
  var off=8;list.forEach(function(e){tag(off,e.type);dv.setUint32(off+4,8+e.bytes.length,false);out.set(e.bytes,off+8);off+=8+e.bytes.length;});
  return out;}
var ICNS_TYPES=[["icp4",16],["icp5",32],["ic11",32],["icp6",64],["ic12",64],["ic07",128],["ic08",256],["ic13",256],["ic09",512],["ic14",512],["ic10",1024]];
/* every icon the templates can name, drawn from one picture */
function iconSet(img){var I={},p={},sizes=[16,24,32,48,64,72,96,128,144,192,256,384,512,1024];
  sizes.forEach(function(z){p[z]=png(draw(img,z));});
  I.seal512=p[512];I.and_mdpi=p[48];I.and_hdpi=p[72];I.and_xhdpi=p[96];I.and_xxhdpi=p[144];I.and_xxxhdpi=p[192];
  I.w32=p[32];I.w192=p[192];I.w256=p[256];I.w384=p[384];
  I.w512m=png(onSquare(img,512,0.78,"#FFFFFF"));
  I.apple180w=png(onSquare(img,180,0.88,"#FFFFFF"));I.apple180=I.apple180w;
  I.ios1024=png(onSquare(img,1024,0.88,"#FFFFFF"));
  I.favicon=ico([16,32,48].map(function(z){return {size:z,bytes:p[z]};}));
  I.winico=ico([16,24,32,48,64,128,256].map(function(z){return {size:z,bytes:p[z]};}));
  I.macicns=icns(ICNS_TYPES.map(function(t){return {type:t[0],bytes:p[t[1]]};}));
  return I;}
var iconMemo={key:"",val:null};
/* the app's own packager draws no night icons; where the templates carry a night seal (icons.seal512_dark), each icon is drawn
   from it too, under its name with _dark, and the files the templates name with _dark are written; without one they are left
   out, as the app's own packager leaves them out */
function iconsOf(html,T){var url=iconSource(html,T);if(!url)return Promise.resolve({});
  var dk=T&&T.icons&&T.icons.seal512_dark?"data:image/png;base64,"+String(T.icons.seal512_dark).replace(/^b64:/,""):null;
  var key=url.length+":"+url.slice(-64)+(dk?":"+dk.length+dk.slice(-32):"");
  if(iconMemo.key===key&&iconMemo.val)return Promise.resolve(iconMemo.val);
  return loadImage(url).then(function(img){var I=iconSet(img);
    if(!dk)return I;return loadImage(dk).then(function(im2){var D=iconSet(im2);Object.keys(D).forEach(function(k){I[k+"_dark"]=D[k];});return I;});})
    .then(function(I){iconMemo={key:key,val:I};return I;});}
function sourceOf(T,kind){var src=T&&T[kind];if(!src||!src["@@from"])return src||null;
  var base=T[src["@@from"]];if(!base)return null;
  var has=Object.prototype.hasOwnProperty,from=src["@@folder_from"]||"",to=src["@@folder"]||"",out={};
  Object.keys(base).forEach(function(n){var name=(from&&n.indexOf(from)===0)?to+n.slice(from.length):n;out[name]=has.call(src,name)?src[name]:base[n];});
  Object.keys(src).forEach(function(n){if(n.indexOf("@@")!==0&&!has.call(out,n))out[n]=src[n];});
  return out;}
/* the owner line its own licence carries (year and name), for the web manifest */
function ownerOf(T){var t=String((T.texts||{}).licence||""),m=/Copyright \(c\) (\d{4}) ([^\n]+?)\. All rights reserved\./.exec(t);return m?{year:m[1],name:m[2]}:null;}
function manifestOf(map,idt,T){var t=map.__APP_TITLE__,o=ownerOf(T),c=o?"Copyright (c) "+o.year+" "+o.name+".":"";
  var j={name:t,short_name:(t.length>12?t.slice(0,12):t),description:t+"."+(o?" "+c+" All rights reserved. No licence granted.":""),
    start_url:"./index.html",scope:"./",id:"./",display:"standalone",orientation:"any",background_color:"#FFFFFF",theme_color:(idt&&idt.theme)||"#1B6B93",
    icons:[{src:"icons/icon-192.png",sizes:"192x192",type:"image/png",purpose:"any"},{src:"icons/icon-512.png",sizes:"512x512",type:"image/png",purpose:"any"},{src:"icons/icon-512-maskable.png",sizes:"512x512",type:"image/png",purpose:"maskable"},{src:"icons/icon-256.png",sizes:"256x256",type:"image/png",purpose:"any"},{src:"icons/icon-384.png",sizes:"384x384",type:"image/png",purpose:"any"},{src:"icons/apple-touch-icon.png",sizes:"180x180",type:"image/png",purpose:"any"}]};
  if(o){j.author=o.name;j.copyright=c+" All rights reserved.";}
  return JSON.stringify(j,null,2);}
function webify(h){var inject='<link rel="manifest" href="manifest.webmanifest">'+'<link rel="icon" href="favicon.ico">'+'<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">'
    +'<script>if("serviceWorker" in navigator&&(location.protocol==="https:"||location.protocol==="http:")){window.addEventListener("load",function(){navigator.serviceWorker.register("./sw.js").catch(function(){});});}</scr'+'ipt>';
  if(h.indexOf('rel="manifest"')>=0)return h;
  return h.indexOf("</head>")>=0?h.replace("</head>",inject+"</head>"):h;}
function entriesOf(T,kind,html,idt){var src=sourceOf(T,kind);if(!src||T.v!==2)return Promise.resolve(null);
  var map=mapOf(idt),h=pageText(html);
  return iconsOf(h,T).then(function(icons){var out=[];
    Object.keys(src).forEach(function(n){var v=src[n],name=fill(n,map),mode=/\.command$/.test(name)?493:0;
      if(v==="@@html")out.push({name:name,text:h});
      else if(v==="@@web")out.push({name:name,text:webify(h)});
      else if(v==="@@manifest")out.push({name:name,text:manifestOf(map,idt,T)});
      else if(v==="@@licence")out.push({name:name,text:textOf(T,"licence",map)});
      else if(v==="@@terms")out.push({name:name,text:textOf(T,"terms",map)});
      else if(typeof v==="string"&&v.indexOf("icon:")===0){var b=icons[v.slice(5)];if(b)out.push({name:name,bytes:b});}
      else if(typeof v==="string"&&v.indexOf("b64:")===0)out.push({name:name,bytes:b64Bytes(v.slice(4)),mode:mode});
      else if(/\.(txt|md)$/i.test(name)&&!/GITHUB_WORKFLOW/.test(name))out.push({name:name,text:fillText(v,map),mode:mode});
      else out.push({name:name,text:fill(v,map),mode:mode});});
    return out;});}
function shipLabel(idt){return /^[0-9]+s[0-9]+$/.test(idt.stamp||"")?idt.stamp:idt.pass;}
function zipName(kind,idt){return mapOf(idt).__APP_BASE__+"_"+kind+"_"+shipLabel(idt)+".zip";}

/* ---------- 3. who the app is, and a package from its templates ---------- */
/* who: {title or name, id, version, base} from Fabrica's package details, Download as an app's fields or the Build page's */
function identityOf(html,who){who=who||{};var det=detect(html);
  var title=cleanTitle(who.title||who.name||det.htmlTitle||pkgTitle(who.base||"my_app"))||"My App",key=slug(title);
  var dt=new Date(),iso=dt.getFullYear()+"-"+pad(dt.getMonth()+1)+"-"+pad(dt.getDate());
  var ver=String(who.version||"").replace(/^v/,"");
  return {key:key,title:title,id:idOk(who.id)?String(who.id):idFor(key),macId:"",pass:det.pass||(/^\d{1,9}$/.test(ver)?ver:iso.replace(/-/g,"")),
    date:det.date||iso,stamp:det.stamp||"",theme:det.theme||"#1B6B93"};}
function zipOf(entries){var R=window.IngRepo&&IngRepo.core&&IngRepo.core.zip;
  if(typeof R==="function")return R(entries.map(function(e){return {name:e.name,data:u8(e.data),mode:0x8000|((e.mode||420)&0x1ff)};}));
  return Promise.resolve(makeZip(entries));}
var KIND={fire:"fire",iphone:"ios",ipad:"ios",mac:"mac",macarm:"mac_mini",windows:"windows",web:"web"};
function canTemplate(T,kind){return !!(T&&T.v===2&&kind&&sourceOf(T,kind));}
function templated(T,kind,html,who){var idt=identityOf(html,who);
  return entriesOf(T,kind,html,idt).then(function(list){if(!list||!list.length)return null;
    var entries=list.map(function(e){return {name:e.name,data:e.bytes||e.text,mode:e.mode||420};});
    lastTpl=zipName(kind,idt);
    return zipOf(entries).then(function(bytes){return {zip:zipName(kind,idt),entries:entries,bytes:bytes,fileCount:entries.length,kind:kind,templated:true,identity:idt};});});}

/* ---------- 4. the generic kit, made the app's own ---------- */
function letterSeal(title,colour){var c=canvas(512,512),x=c.getContext("2d");x.fillStyle=colour||"#6a3fb5";x.beginPath();x.arc(256,256,240,0,Math.PI*2);x.fill();
  x.fillStyle="#fff";x.font="600 220px Georgia,serif";x.textAlign="center";x.textBaseline="middle";var w=String(title||"A").replace(/[^A-Za-z0-9 ]/g,"").split(/\s+/).filter(Boolean);
  x.fillText(((w[0]||"A")[0]+((w[1]||"")[0]||"")).toUpperCase(),256,268);return c.toDataURL("image/png");}
function ownPicture(page,who){var s=null;try{s=window.IngApk&&IngApk.iconSource?IngApk.iconSource(page):null;}catch(e){}
  if(!s&&who.app){try{var k=window.ING_SEALS&&ING_SEALS[who.app];if(k)s="data:image/png;base64,"+k.b64;}catch(e){}}
  return s||letterSeal(who.title||who.name,who.colour);}
function pngSize(b){if(!b||b.length<24||b[0]!==0x89||b[1]!==0x50)return 0;return ((b[16]<<24)|(b[17]<<16)|(b[18]<<8)|b[19])>>>0;}
function pngOpaque(b){return pngSize(b)&&(b[25]===2||b[25]===0);}
function icoSizes(b){var n=b[4]|(b[5]<<8),out=[];for(var i=0;i<n&&6+16*i+16<=b.length;i++)out.push(b[6+16*i]||256);return out;}
function icnsTypes(b){var out=[],p=8,dv=new DataView(b.buffer,b.byteOffset,b.byteLength);
  while(p+8<=b.length){var t=String.fromCharCode(b[p],b[p+1],b[p+2],b[p+3]),l=dv.getUint32(p+4,false);if(l<8)break;
    var z=pngSize(b.subarray(p+8,p+l));if(z)out.push([t,z]);p+=l;}return out;}
function sealSvg(title,pngBytes){var d="data:image/png;base64,"+bytesB64(pngBytes);
  return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" width="1024" height="1024">'
    +'<title>'+String(title).replace(/[<&>]/g,"")+'</title><image width="1024" height="1024" href="'+d+'" xlink:href="'+d+'"/></svg>\n';}
/* its icon in place of each icon file: the same format and the same sizes */
function redrawIcon(rel,data,img,title){var b=typeof data==="string"?null:data;
  if(/\.ico$/i.test(rel)&&b)return ico(icoSizes(b).map(function(z){return {size:z,bytes:png(draw(img,z))};}));
  if(/\.icns$/i.test(rel)&&b){var t=icnsTypes(b);if(!t.length)t=ICNS_TYPES;return icns(t.map(function(x){return {type:x[0],bytes:png(draw(img,x[1]))};}));}
  if(/\.png$/i.test(rel)&&b){var z=pngSize(b)||512;return png(pngOpaque(b)?onSquare(img,z,0.88,"#FFFFFF"):draw(img,z));}
  if(/seal\.svg$/i.test(rel))return sealSvg(title,png(draw(img,1024)));
  return null;}
function esc(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,"\\$&");}
/* the words a person reads about the app, written for it (the build files keep every name they look for) */
function docs(who,low,kitId){var N=who.name,F=who.file,id=who.id,mac=kitId==="mac"||kitId==="macarm";
  if(kitId==="windows")return {"WINDOWS_README.txt":[N+" for Windows",new Array(N.length+13).join("="),"",
    "Install it","----------",F+"-Setup.exe installs "+N+" for you alone, with no administrator password, on Windows 10 and 11.","",
    "  1. Download "+F+"-Setup.exe from the Releases page of the app's repository.","  2. Double-click it. If Windows SmartScreen says \"Windows protected your PC\",",
    "     choose More info, then Run anyway.","  3. It installs at once and ends with \"Open "+N+" now\" ticked. Press Finish.","",
    N+" then sits on the Desktop and in the Start menu with its own icon, and","Settings, Apps lists it, so it can be removed there like any other program.","",
    "Your work","---------","What you keep in "+N+" stays on this PC, in AppData\\Local\\"+F+" and","AppData\\Roaming\\"+F+". Updating or removing the app leaves it where it is.","",
    "Update it","---------","Run a newer "+F+"-Setup.exe. An open "+N+" is closed first.","",
    "Build it yourself","-----------------","START_HERE.html in this folder takes you through every step: on GitHub, or","on this PC with \"Build "+N+" (Windows).bat\".",""].join("\r\n")};
  if(mac)return {"README.md":["# "+N+" for Mac","","These files build **"+N+"** (app id `"+id+"`) as a Mac app: "+F+".app, with its own window, its own icon and its own data folder.","",
      "- On GitHub: the build file `.github/workflows/build-mac.yml` builds it whenever these files change, and puts it on the Releases page.",
      "- On the Mac itself: double-click `Build Mac App.command`.","","`START_HERE.html` takes you through every step. `"+low+".html` is the app's page.",""].join("\n"),
    "MACOS_IF_BLOCKED.txt":[N+" on macOS: if it will not open",new Array(N.length+31).join("="),"",
      "An app from outside the App Store is checked by macOS the first time it opens.","",
      "  1. Drag "+F+".app to Applications and double-click it. If macOS says it cannot","     check it, press Done.",
      "  2. Open System Settings, Privacy & Security, and press Open Anyway for "+N+".","     Confirm. You do this once.","",
      "If that button is not there, open Terminal and type:","","    xattr -dr com.apple.quarantine /Applications/"+F+".app","",
      "then open the app again.",""].join("\n")};
  return {};}
var baseTemplate=typeof kitTemplate==="function"?kitTemplate:null,guideHook=null;
if(baseTemplate){var tpl=function(){var md=baseTemplate.apply(this,arguments);try{return guideHook?guideHook(md):md;}catch(e){return md;}};kitTemplate=tpl;window.kitTemplate=tpl;}
function ownKit(store,kitId,who,page){
  var K=store.kits,kit=K.kits.filter(function(x){return x.id===kitId;})[0];if(!kit)return Promise.resolve(baseAssemble(store,kitId,who,page));
  var vars={APP_NAME:who.name,APP_FILE:who.file,APP_ID:who.id};
  function fillv(t){return String(t).replace(/\{([A-Z_]+)\}/g,function(a,x){return vars[x]!=null?vars[x]:a;});}
  var root=fillv(kit.zip),pre=root+"/"+fillv(kit.inner)+"/";
  /* Ingenium's own identity, as its build files carry it (read from them, never written here) */
  var aj=store.files.filter(function(f){return f.s===kit.source&&f.p==="app.json";})[0],ing={};try{ing=JSON.parse(aj.t);}catch(e){}
  var ingName=ing.name||"Ingenium",ingFile=ing.file_name||ingName,ingId=ing.app_id||"",ingLow=ingFile.toLowerCase();
  var N=who.name,F=who.file,low=String(F).toLowerCase().replace(/[^a-z0-9]/g,"");if(!/^[a-z]/.test(low))low="app"+low;
  var desk=kitId==="windows"||kitId==="mac"||kitId==="macarm";
  /* the name Xcode gives the iPhone and iPad app's target and program: letters, digits and _ only */
  var XN=String(F).replace(/[^A-Za-z0-9_]/g,"");if(!/^[A-Za-z]/.test(XN))XN="App"+XN;
  /* the files that carry the app's identity, renamed for it: [old path, new path]; every text naming them is changed to match */
  var RN=[[ingLow+".html",low+".html"],[ingLow+"_app.py",low+"_app.py"],[ingLow+"_win.spec",low+"_win.spec"],[ingLow+".spec",low+".spec"],
    [ingLow+".ico",low+".ico"],[ingLow+".png",low+".png"],[ingLow+".icns",low+".icns"],["icons/"+ingLow+".png","icons/"+low+".png"],
    ["icons/"+ingLow+"_seal.svg","icons/"+low+"_seal.svg"],["tools/"+ingLow+"_seal.svg","tools/"+low+"_seal.svg"],["make_"+ingLow+"_icon.py","make_"+low+"_icon.py"],
    ["installer/"+ingFile+".iss","installer/"+F+".iss"],["Build "+ingName+" (Windows).bat","Build "+N+" (Windows).bat"],["Run "+ingName+" (Windows).bat","Run "+N+" (Windows).bat"]];
  /* the same names inside the text of every file, longest first */
  var TOK=[[ingLow+"_app",low+"_app"],[ingLow+"_win.spec",low+"_win.spec"],[ingLow+".spec",low+".spec"],[ingLow+".html",low+".html"],[ingLow+".iconset",low+".iconset"],
    [ingLow+".icns",low+".icns"],[ingLow+".ico",low+".ico"],[ingLow+".png",low+".png"],[ingLow+"_seal.svg",low+"_seal.svg"],["make_"+ingLow+"_icon","make_"+low+"_icon"],
    [ingFile+".iss",F+".iss"],["Build "+ingName+" (Windows)","Build "+N+" (Windows)"],["Run "+ingName+" (Windows)","Run "+N+" (Windows)"],
    [ingFile+"-Setup",F+"-Setup"],[ingFile+"-Windows-with-models",F+"-Windows-with-models"],[ingFile+".exe",F+".exe"],
    [ingLow+"_crash.log",low+"_crash.log"],[ingLow+"_diag.txt",low+"_diag.txt"],[ingLow+"_session.flag",low+"_session.flag"],["."+ingLow+"_write_test","."+low+"_write_test"]];
  if(desk)TOK.push([ingFile+".app",F+".app"]);
  if(!desk){TOK.push([ingLow+"_android_project",low+"_android_project"],[ingLow+"_ios_project",low+"_ios_project"]);}
  if(ingId)TOK.push([ingId,who.id]);
  var DROP={".github/workflows/test-kit-build-mac.yml":1};   /* the repository's own check of its kit, written for Ingenium's names */
  var publisher="";try{publisher=String((typeof personaGet==="function"?personaGet().name:"")||"").trim();}catch(e){}
  if(!publisher&&typeof ING_EDITION!=="undefined"&&ING_EDITION!=="master")publisher=N;
  function renamed(rel){var segs=rel.split("/");
    for(var i=0;i<RN.length;i++){if(rel===RN[i][0])return RN[i][1];}
    if(!desk){segs=segs.map(function(s){return s===ingLow+"_android_project"?low+"_android_project":s===ingLow+"_ios_project"?low+"_ios_project":s;});}
    return segs.join("/");}
  /* the Android and iPhone sources keep Ingenium's id as their code's own name (the Java package and its native calls) */
  var codeFile=/\.(java|kt|c|cc|cpp|h|hpp|m|mm|swift|gradle)$/i;
  function words(t,rel){var s=t;
    TOK.forEach(function(p){if(!p[0]||p[0]===p[1])return;if(p[0]===ingId&&codeFile.test(rel))return;s=s.split(p[0]).join(p[1]);});
    /* the defaults the build files fall back to when app.json is missing, set to the app's own */
    var named=new RegExp("([\"'])"+esc(ingName)+"\\1","g"),fileLine=/file_name/;
    s=s.split("\n").map(function(line){if(/Copyright/.test(line))return line;
      if(/get\((["'])(?:name|file_name)\1|appCfg\.name\b/.test(line))line=line.replace(named,function(m,q){return q+(fileLine.test(line)?F:N)+q;});
      if(ingId&&/app_id\s*\?:\s*'/.test(line))line=line.split(ingId).join(who.id);
      return line;}).join("\n");
    s=s.replace(new RegExp("(#define AppName \")"+esc(ingName)+"\"","g"),"$1"+N+"\"").replace(new RegExp("(#define AppFile \")"+esc(ingFile)+"\"","g"),"$1"+F+"\"")
      .replace(new RegExp("(set \"APP_FILE=)"+esc(ingFile)+"\"","g"),"$1"+F+"\"").replace(new RegExp("(\\$\\{APP_NAME:-)"+esc(ingName)+"\\}","g"),"$1"+N+"}")
      .replace(new RegExp("\\|\\| echo "+esc(ingFile)+"\\)","g"),"|| echo "+F+")")
      .replace(new RegExp("(<key>CFBundleDisplayName</key>\\s*<string>)"+esc(ingName)+"(</string>)"),"$1"+N+"$2")
      .replace(new RegExp(esc(ingName)+" uses (your|the) home network","g"),N+" uses $1 home network");
    /* the iPhone and iPad project: its target, product and program take the app's name, and the cloud build that makes it
       looks for them by that name (the app's bundle was Ingenium.app inside an IPA named for the app) */
    if(!desk&&(/(^|\/)project\.yml$/.test(rel)||/(^|\/)\.github\/workflows\/[^\/]*ios[^\/]*\.ya?ml$/.test(rel))){var I0=esc(ingName);
      s=s.replace(new RegExp("^name: "+I0+"$","m"),"name: "+XN).replace(new RegExp("^(  )"+I0+":$","m"),"$1"+XN+":")
        .replace(new RegExp("^(\\s+PRODUCT_NAME: )"+I0+"$","m"),"$1"+XN)
        .replace(new RegExp("\\b"+I0+"\\.xcodeproj\\b","g"),XN+".xcodeproj").replace(new RegExp("(-scheme )"+I0+"\\b","g"),"$1"+XN)
        .replace(new RegExp("/"+I0+"\\.app\\b","g"),"/"+XN+".app");}
    if(publisher)s=s.replace(/^(AppPublisher=).*$/m,"$1"+publisher).replace(/^(AppCopyright=Copyright \(c\) \d{4} ).*$/m,"$1"+publisher);
    /* what the build and run files say while they work, and the build recipes' own notes, name the app they build */
    var says=/\.(bat|command|spec|iss)$/i.test(rel),notes=/(^|\/)make_[^\/]*_icon\.py$/.test(rel);
    if(says||notes)s=s.split("\n").map(function(line){if(/Copyright/.test(line)||(notes&&!/^\s*#/.test(line)))return line;
      return line.replace(new RegExp("\\b"+esc(ingName)+"\\b(?!['\u2019]s builder)(?![-\\w])","g"),N);}).join("\n");
    return s;}
  /* the guide is written with the app's names before it is laid out (its lines are wrapped for the .txt) */
  var k;guideHook=function(md){return words(md,"");};try{k=baseAssemble(store,kitId,who,page);}finally{guideHook=null;}
  var D=docs(who,low,kitId),guide=k.entries.filter(function(e){return e.name===root+"/START_HERE.html"||e.name===root+"/START_HERE.txt";});
  return loadImage(ownPicture(page,who)).then(function(img){var out=[],wf=null;
    k.entries.forEach(function(e){var name=e.name,data=e.data;
      if(name===root+"/START_HERE.html"||name===root+"/START_HERE.txt"){out.push(e);return;}
      if(name.indexOf(root+"/build_file_copy/")===0)return;   /* made again below, from the changed build file */
      if(name.indexOf(pre)!==0){out.push(e);return;}
      var rel=name.slice(pre.length);if(DROP[rel])return;
      var nrel=renamed(rel);
      if(typeof data==="string"){
        if(D[rel]!=null)data=D[rel];
        else if(rel==="START_HERE.html"||rel==="START_HERE.txt"){var g=guide.filter(function(x){return /\.html$/.test(x.name)===/\.html$/.test(rel);})[0];if(g)data=g.data;}
        else if(/seal\.svg$/i.test(rel))data=redrawIcon(rel,null,img,N)||data;
        else data=words(data,rel);}
      else if(/\.(png|ico|icns)$/i.test(rel)){var nb=redrawIcon(rel,data,img,N);if(nb)data=nb;}
      var ne={name:pre+nrel,data:data,mode:e.mode};out.push(ne);if(kit.workflow&&rel===kit.workflow)wf=ne;});
    if(wf)out.push({name:root+"/build_file_copy/"+kit.workflow.split("/").pop()+".txt",data:wf.data,mode:420});
    return {zip:k.zip,entries:out,fileCount:out.filter(function(e){return e.name.indexOf(pre)===0;}).length,own:true,renamed:RN.filter(function(r){return k.entries.some(function(e){return e.name===pre+r[0];});})};});}

/* ---------- 5. where they are used ---------- */
var baseAssemble=typeof kitAssemble==="function"?kitAssemble:null;
function assemble(store,kitId,who,page){
  if(!who||!who.isNew||!baseAssemble)return baseAssemble.apply(this,arguments);
  var T=templatesOf(page),kind=KIND[kitId];
  return Promise.resolve(canTemplate(T,kind)?templated(T,kind,page,who):null).then(function(k){return k||ownKit(store,kitId,who,page);});}
if(baseAssemble){kitAssemble=assemble;window.kitAssemble=assemble;}
/* the web kit of the Build page: from the templates when the app carries them */
var baseWeb=typeof kitWebEntries==="function"?kitWebEntries:null;
/* without templates, its icons are its own picture (they were Ingenium's seal) */
function ownWeb(who,page){var k=baseWeb(who,page);if(!who||!who.isNew)return k;
  return loadImage(ownPicture(page,who)).then(function(img){k.entries.forEach(function(e){var m=/\/icon-(\d+)\.png$/.exec(e.name);if(m)e.data=png(draw(img,+m[1]));});return k;},function(){return k;});}
if(baseWeb){var web=function(who,page){var T=templatesOf(page);if(canTemplate(T,"web"))return templated(T,"web",page,who).then(function(k){return k||ownWeb(who,page);});return ownWeb(who,page);};
  kitWebEntries=web;window.kitWebEntries=web;}
/* the old Build page: a package from the app's own templates opens with its own READ ME FIRST */
var lastTpl="";
var baseKitMake=typeof kitMake==="function"?kitMake:null;
if(baseKitMake){var km=function(){lastTpl="";return Promise.resolve(baseKitMake.apply(this,arguments)).then(function(r){try{var n=document.getElementById("shipNote");
    if(n&&lastTpl&&n.textContent.indexOf(lastTpl)===0)n.textContent=n.textContent.replace(/Start with README\.txt inside it\./,"Start with READ ME FIRST.txt inside it.");}catch(e){}return r;});};
  kitMake=km;window.kitMake=km;}
/* the old Build page holds a large page part by part (modules/r138.js) and leaves its editor empty: its ship rows, and the name
   they offer, read the page it holds */
function heldPage(){try{if(window.IngBuild&&IngBuild.large&&IngBuild.large())return String(IngBuild.text()||"");}catch(e){}return "";}
function editorPage(){return (document.getElementById("codeEditor")||{}).value||heldPage();}
var basePageFor=typeof kitPageFor==="function"?kitPageFor:null;
if(basePageFor){var pageFor=function(who){var held=who&&who.isNew&&!(document.getElementById("codeEditor")||{}).value?heldPage():"";
    return held?Promise.resolve(held):basePageFor.apply(this,arguments);};
  kitPageFor=pageFor;window.kitPageFor=pageFor;}
var baseTitleOf=typeof kitTitleOfEditor==="function"?kitTitleOfEditor:null;
if(baseTitleOf){var titleOf=function(){var held=!(document.getElementById("codeEditor")||{}).value?heldPage():"";if(!held)return baseTitleOf.apply(this,arguments);
    var m=/<title>([^<]{1,60})<\/title>/i.exec(held.slice(0,3000000));return (m?m[1]:"My App").replace(/[^A-Za-z0-9 ._-]/g,"").replace(/\s+/g," ").trim()||"My App";};
  kitTitleOfEditor=titleOf;window.kitTitleOfEditor=titleOf;}
/* the old Build page: its rows name the packages the templates make */
var baseRender=typeof shipRender==="function"?shipRender:null;
if(baseRender){var render=function(){var r=baseRender.apply(this,arguments);try{var who=kitIdentity();if(!who.isNew)return r;var page=editorPage(),T=templatesOf(page);if(!T)return r;
    var idt=identityOf(page,who),rows=document.querySelectorAll("#shipList .ship-row");
    KIT_ROWS.forEach(function(d,i){var kind=KIND[d[0]],z=rows[i]&&rows[i].querySelector(".ship-zip");if(z&&canTemplate(T,kind))z.textContent=zipName(kind,idt);});}catch(e){}return r;};
  shipRender=render;window.shipRender=render;}
/* Fabrica's web app card: an app with templates gets its own web package (as Fabrica's Build kits get its own projects) */
if(window.IngShip&&typeof IngShip.webApp==="function"&&!IngShip.webApp.__r178){var baseWebApp=IngShip.webApp;
  IngShip.webApp=function(id,opt){var self=this,args=arguments;opt=opt||{};
    return IngShip.onePage(id,{quiet:true,ref:opt.ref}).then(function(x){var T=templatesOf(x.html);if(!canTemplate(T,"web"))return baseWebApp.apply(self,args);
      var P=opt.pkg||{};return IngRepo.info(id).then(function(info){return templated(T,"web",x.html,{title:P.title||(info&&info.name)||"",id:P.id,version:P.version,base:info&&info.slug});})
        .then(function(k){if(!k)return baseWebApp.apply(self,args);
          return IngRepo.setNote(id,x.commit,"webApp",{at:Date.now(),size:k.bytes.length,files:k.entries.length}).then(function(){return {bytes:k.bytes,name:k.zip,files:k.entries.length,commit:x.commit,templated:true};});});});};
  IngShip.webApp.__r178=true;}
/* Download as an app's web row, and anything else that asks */
function make(kind,html,who){var T=templatesOf(html);if(!canTemplate(T,kind))return Promise.resolve(null);return templated(T,kind,html,who);}

/* ---------- 6. kits kept from before ---------- */
/* Fabrica keeps what it made beside each version (IndexedDB fabrica_made, modules/r112.js) and its Releases save a kept file
   again with no making. A kit kept before this part first ran on this device was made from Ingenium's own files, so it is let
   go, once: Save it again can never hand back Ingenium's kit for another app. Ingenium's own kits stay. The time this part
   first ran is kept in this browser; without it nothing is let go. */
var SINCE_KEY="ing:r178:since",since=0;
try{since=+localStorage.getItem(SINCE_KEY)||0;if(!since){since=Date.now();localStorage.setItem(SINCE_KEY,String(since));}}catch(e){since=0;}
function forgetOldKits(before){if(!before||!window.indexedDB)return Promise.resolve(0);
  var known=indexedDB.databases?indexedDB.databases().then(function(l){return (l||[]).some(function(d){return d&&d.name==="fabrica_made";});},function(){return true;}):Promise.resolve(true);
  return known.then(function(there){if(!there)return 0;return new Promise(function(res){var rq;
    try{rq=indexedDB.open("fabrica_made",1);}catch(e){res(0);return;}
    /* made as Fabrica makes it, if it is not there yet */
    rq.onupgradeneeded=function(){var d=rq.result;try{d.createObjectStore("meta");}catch(e){}try{d.createObjectStore("bytes");}catch(e){}};
    rq.onerror=function(){res(0);};rq.onblocked=function(){res(0);};
    rq.onsuccess=function(){var d=rq.result,n=0;
      try{var t=d.transaction(["meta","bytes"],"readwrite"),meta=t.objectStore("meta"),bytes=t.objectStore("bytes");
        var cur=meta.openCursor();cur.onsuccess=function(){var c=cur.result;if(!c)return;var m=c.value||{};
          if(m.kind==="kits"&&(+m.at||0)<before&&!/^Ingenium-/.test(String(m.name||""))){bytes.delete(c.key);c.delete();n++;}c.continue();};
        t.oncomplete=function(){try{d.close();}catch(e){}res(n);};t.onerror=t.onabort=function(){try{d.close();}catch(e){}res(0);};}
      catch(e){try{d.close();}catch(_){}res(0);}};});});}
setTimeout(function(){forgetOldKits(since).catch(function(){});},1500);

window.IngKits={templates:templatesOf,identity:identityOf,make:make,kinds:KIND,zipName:zipName,
  _:{map:mapOf,fill:fill,fillText:fillText,iconSource:iconSource,icons:iconsOf,source:sourceOf,entries:entriesOf,manifest:manifestOf,webify:webify,ownKit:ownKit,redrawIcon:redrawIcon,
    forgetOldKits:forgetOldKits,since:function(){return since;}}};

;try{window.__ingParts["p99"]="running";}catch(_){}
})();
</script>
