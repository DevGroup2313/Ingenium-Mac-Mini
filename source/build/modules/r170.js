<script>try{(window.__ingParts=window.__ingParts||{})["p91"]="started";}catch(_){}
/* ============ R170 · AN APP FOR A MAC, AND FOR WINDOWS, MADE ON THE DEVICE (Ingenium 6.5, 24 October 2026) ============
   The owner's words (20 October 2026): "It was supposed to be my own personal offline GitHub and ship ready made apps on my
   devices for all of my devices". Since 6.0 Fabrica made the Fire tablet's APK and the iPhone and iPad's IPA here (r136.js);
   the Mac's and Windows' rows of Download as an app still made a project for GitHub to compile. Now each makes the app
   itself (Windows: below, IngWin). For a Mac it makes the app here, with
   no compiler and no connection, as the IPA is made: the one compiled part is a shell that is the same for every app
   (source/shells/mac: a window with a web view that runs the app's own page, built once on GitHub's Macs for Apple silicon
   and Intel in one file, and sealed there with an ad-hoc signature). This module writes the rest:
   - the bundle's folder, <the app's name>.app, and its program under the app's own name;
   - Info.plist: the app's name, id and version;
   - Resources/AppIcon.icns, the app's icon at every size a Mac draws (PNG inside);
   - Resources/www: the app's page and shell.json (which page, its bridges, the window's title);
   - the seal again: _CodeSignature/CodeResources lists every file of the bundle with its SHA-1 and SHA-256, and the
     program's signature (each CodeDirectory, in each of its two halves) is given the new fingerprints of Info.plist and
     of that list. The program's own code is not changed, so the rest of its signature stays as GitHub's Mac made it.
   A Mac opens an app sealed this way as it opens any app from outside the App Store: the first time, macOS asks
   (Control-click, Open; on macOS 15, System Settings, Privacy and Security, Open Anyway), and then it opens like any other.
   Checked on GitHub's Macs, Apple silicon and Intel: codesign --verify --deep --strict accepts each app made here, and
   the app opens, shows its page, keeps its storage from one start to the next, and saves a file
   (.github/workflows/build-shells.yml). */
(function(root){
"use strict";
var TE=new TextEncoder(),TD=new TextDecoder();
function utf8(s){return TE.encode(String(s));}
function core(){var a=root.IngApk&&root.IngApk.core;if(!a)throw new Error("the APK and IPA maker (r136) is missing");return a;}
function subtle(){var c=root.crypto||(typeof crypto!=="undefined"?crypto:null);if(!c||!c.subtle)throw new Error("this window has no Web Crypto: open Ingenium from its own app or a secure address");return c.subtle;}
function digest(alg,u8){return subtle().digest(alg,u8).then(function(b){return new Uint8Array(b);});}
function b64(u8){return core().b64e(u8);}
function xmlEsc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

/* ---------- the shell, as the page carries it ---------- */
function macShellZip(){if(root.__ingMacShell)return Promise.resolve(root.__ingMacShell);var e=typeof document!=="undefined"&&document.getElementById("ing-mac-shell");
  if(!e||!e.textContent.trim())return Promise.reject(new Error("this build of Ingenium carries no Mac shell"));var u=core().b64d(e.textContent);root.__ingMacShell=u;return Promise.resolve(u);}

/* ---------- names ---------- */
/* the bundle's folder: the app's name as a person reads it (spaces kept), without what a Mac's file names cannot hold */
function macFolder(title){var n=String(title||"").replace(/[\/:\\\u0000-\u001f\u007f]+/g," ").replace(/^[.\s]+/,"").replace(/\s+/g," ").trim().slice(0,60);return (n||"App")+".app";}
/* the program's own name, as Activity Monitor shows it: letters and digits */
function macExe(title){var n=String(title||"");if(n.normalize)n=n.normalize("NFD").replace(/[\u0300-\u036f]/g,"");n=n.replace(/[^A-Za-z0-9]+/g,"");if(!n||/^[0-9]/.test(n))n="App"+n;return n.slice(0,40);}
function plistSet(text,key,value){var re=new RegExp("(<key>"+key.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"</key>\\s*<string>)[^<]*(</string>)");
  if(re.test(text))return text.replace(re,function(m,a,b){return a+xmlEsc(value)+b;});
  return text.replace(/<dict>/,"<dict>\n\t<key>"+key+"</key>\n\t<string>"+xmlEsc(value)+"</string>");}

/* ---------- the icon: Apple's .icns, a PNG at each size ---------- */
var ICNS=[["icp4",16],["icp5",32],["ic11",32],["icp6",64],["ic12",64],["ic07",128],["ic13",256],["ic08",256],["ic14",512],["ic09",512],["ic10",1024]];
var MAC_SIZES=[16,32,64,128,256,512,1024];
function icns(pngs){var parts=[],total=8;
  ICNS.forEach(function(t){var d=pngs[t[1]];if(!d)throw new Error("the "+t[1]+" pixel icon is missing");parts.push([t[0],d]);total+=8+d.length;});
  var o=new Uint8Array(total),dv=new DataView(o.buffer),p=8;o.set(utf8("icns"),0);dv.setUint32(4,total,false);
  parts.forEach(function(x){o.set(utf8(x[0]),p);dv.setUint32(p+4,8+x[1].length,false);o.set(x[1],p+8);p+=8+x[1].length;});return o;}
/* drawn from the app's own icon, as Mac icons are drawn: the picture inside a margin (Apple's grid: 824 of 1024) */
function macIcons(src){if(typeof document==="undefined")return Promise.reject(new Error("icons are drawn in a window"));
  return new Promise(function(res,rej){var im=new Image();im.onload=function(){res(im);};im.onerror=function(){rej(new Error("the app's icon could not be read"));};im.src=src;}).then(function(im){
    return Promise.all(MAC_SIZES.map(function(z){var c=document.createElement("canvas");c.width=z;c.height=z;var x=c.getContext("2d");x.imageSmoothingEnabled=true;try{x.imageSmoothingQuality="high";}catch(e){}
      var inner=Math.round(z*824/1024),off=Math.round((z-inner)/2);x.drawImage(im,off,off,inner,inner);
      return new Promise(function(r2){c.toBlob(function(b){b.arrayBuffer().then(function(ab){r2(new Uint8Array(ab));});},"image/png");});})).then(function(list){
      var o={};MAC_SIZES.forEach(function(z,i){o[z]=list[i];});return o;});});}
function iconsFor(html,title,colour,fallback){var A=root.IngApk;var src=(A&&A.iconSource&&A.iconSource(html))||fallback||letterIcon(title,colour);return macIcons(src);}
function letterIcon(title,colour){if(typeof document==="undefined")return null;var c=document.createElement("canvas");c.width=512;c.height=512;var x=c.getContext("2d");
  x.fillStyle=colour||"#6a3fb5";x.beginPath();x.arc(256,256,240,0,Math.PI*2);x.fill();x.fillStyle="#fff";x.font="600 220px Georgia,serif";x.textAlign="center";x.textBaseline="middle";
  var w=String(title||"A").replace(/[^A-Za-z0-9 ]/g,"").split(/\s+/).filter(Boolean);x.fillText(((w[0]||"A")[0]+((w[1]||"")[0]||"")).toUpperCase(),256,268);return c.toDataURL("image/png");}

/* ---------- the seal: _CodeSignature/CodeResources ---------- */
/* the text of <key>name</key><dict>...</dict> in a plist, nested dictionaries and all */
function plistDict(text,name){var k=text.indexOf("<key>"+name+"</key>");if(k<0)return null;var s=text.indexOf("<dict",k);if(s<0)return null;
  var re=/<dict\s*\/>|<dict>|<\/dict>/g,depth=0,m;re.lastIndex=s;
  while((m=re.exec(text))){if(m[0]==="<dict>")depth++;else if(m[0]==="</dict>"){depth--;if(depth===0)return text.slice(s,re.lastIndex);}else if(depth===0)return m[0];}
  return null;}
function dataEl(u8,ind){return ind+"<data>\n"+ind+b64(u8)+"\n"+ind+"</data>";}
/* files: [{rel (from Contents/), data}]; the rules come from the shell's own seal, as codesign wrote them */
function codeResources(files,template){var rules=plistDict(template,"rules"),rules2=plistDict(template,"rules2");
  if(!rules||!rules2)throw new Error("the shell's seal has no rules: this shell cannot be filled");
  var both=/<key>files2<\/key>[\s\S]*?<key>hash<\/key>/.test(template);   /* older seals give each file its SHA-1 beside its SHA-256 */
  var sorted=files.slice().sort(function(a,b){return a.rel<b.rel?-1:a.rel>b.rel?1:0;});
  return Promise.all(sorted.map(function(f){return Promise.all([digest("SHA-1",f.data),digest("SHA-256",f.data)]).then(function(h){return {rel:f.rel,sha1:h[0],sha256:h[1]};});})).then(function(list){
    var v1=[],v2=[];
    list.forEach(function(x){
      if(/^Resources\//.test(x.rel)&&!/^Resources\/.*\.lproj\/locversion\.plist$/.test(x.rel))v1.push("\t\t<key>"+xmlEsc(x.rel)+"</key>\n"+dataEl(x.sha1,"\t\t"));
      v2.push("\t\t<key>"+xmlEsc(x.rel)+"</key>\n\t\t<dict>\n"+(both?"\t\t\t<key>hash</key>\n"+dataEl(x.sha1,"\t\t\t")+"\n":"")+"\t\t\t<key>hash2</key>\n"+dataEl(x.sha256,"\t\t\t")+"\n\t\t</dict>");});
    var xml='<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n<dict>\n'+
      "\t<key>files</key>\n\t<dict>\n"+v1.join("\n")+(v1.length?"\n":"")+"\t</dict>\n"+
      "\t<key>files2</key>\n\t<dict>\n"+v2.join("\n")+(v2.length?"\n":"")+"\t</dict>\n"+
      "\t<key>rules</key>\n\t"+rules+"\n\t<key>rules2</key>\n\t"+rules2+"\n</dict>\n</plist>\n";
    return utf8(xml);});}
/* which files the seal lists: everything in Contents/ but Info.plist and PkgInfo (bound to the signature itself or left
   out by Apple's rules), the seal, and the program */
function sealed(rel,exe){return rel!=="Info.plist"&&rel!=="PkgInfo"&&!/^_CodeSignature\//.test(rel)&&rel!=="MacOS/"+exe;}

/* ---------- the program's signature: the new fingerprints in each CodeDirectory ---------- */
function slices(u8){var dv=new DataView(u8.buffer,u8.byteOffset,u8.byteLength),m=dv.getUint32(0,false),out=[],i,n;
  if(m===0xcafebabe){n=dv.getUint32(4,false);for(i=0;i<n;i++)out.push({cpu:dv.getUint32(8+i*20,false),offset:dv.getUint32(16+i*20,false),size:dv.getUint32(20+i*20,false)});return out;}
  if(m===0xcafebabf){n=dv.getUint32(4,false);for(i=0;i<n;i++){var q=8+i*32;out.push({cpu:dv.getUint32(q,false),offset:dv.getUint32(q+8,false)*4294967296+dv.getUint32(q+12,false),size:dv.getUint32(q+16,false)*4294967296+dv.getUint32(q+20,false)});}return out;}
  if(dv.getUint32(0,true)===0xfeedfacf)return [{cpu:dv.getUint32(4,true),offset:0,size:u8.length}];
  throw new Error("the shell's program is not one a Mac runs");}
var HASH={1:["SHA-1",20],2:["SHA-256",32],3:["SHA-256",20],4:["SHA-384",48]};
/* slots: {1: Info.plist's bytes, 3: CodeResources' bytes}; returns how many CodeDirectories were given them */
function resign(exe,slots){var dv=new DataView(exe.buffer,exe.byteOffset,exe.byteLength),jobs=[];
  slices(exe).forEach(function(sl){var b=sl.offset;if(dv.getUint32(b,true)!==0xfeedfacf)throw new Error("a part of the shell's program is not 64-bit");
    var ncmds=dv.getUint32(b+16,true),p=b+32,sig=null;
    for(var i=0;i<ncmds;i++){var cmd=dv.getUint32(p,true),cs=dv.getUint32(p+4,true);if(cmd===0x1d){sig={off:b+dv.getUint32(p+8,true),size:dv.getUint32(p+12,true)};}p+=cs;}
    if(!sig)throw new Error("the shell's program is not signed: this shell cannot be filled");
    if(dv.getUint32(sig.off,false)!==0xfade0cc0)throw new Error("the shell's signature is damaged");
    var count=dv.getUint32(sig.off+8,false);
    for(var k=0;k<count;k++){var bo=sig.off+dv.getUint32(sig.off+16+k*8,false);if(dv.getUint32(bo,false)!==0xfade0c02)continue;
      var hashOffset=dv.getUint32(bo+16,false),nSpecial=dv.getUint32(bo+24,false),hsize=exe[bo+36],htype=exe[bo+37],flags=dv.getUint32(bo+12,false);
      if(nSpecial<3)throw new Error("the shell was signed without its bundle (only by the linker): this shell cannot be filled");
      if(!HASH[htype])throw new Error("the shell's signature uses a hash this does not know ("+htype+")");
      if(!(flags&2))throw new Error("the shell's signature is not ad-hoc: this shell cannot be filled");
      jobs.push({at:bo+hashOffset,hsize:hsize,alg:HASH[htype][0]});}});
  if(!jobs.length)throw new Error("the shell's signature has no CodeDirectory");
  return Promise.all(jobs.map(function(j){return Promise.all([digest(j.alg,slots[1]),digest(j.alg,slots[3])]).then(function(h){
      exe.set(h[0].subarray(0,j.hsize),j.at-1*j.hsize);exe.set(h[1].subarray(0,j.hsize),j.at-3*j.hsize);});})).then(function(){return jobs.length;});}

/* ---------- the app ---------- */
var HOWTO=function(title,folder){return [title,"","Made with Ingenium Fabrica, for a Mac (Apple silicon or Intel, macOS 12 or newer).","",
  "1. Drag "+folder+" into your Applications folder.",
  "2. The first time, Control-click it (or right-click) and choose Open, then Open again.",
  "   On macOS 15 and newer: open it once, then open System Settings, Privacy and Security,",
  "   and choose Open Anyway beside its name.",
  "3. From then on it opens like any other app. Your work in it stays on this Mac.",""].join("\n");};
/* o: {html (text or bytes), page ("the_app.html"), title, id, versionName, build, icons ({16..1024: PNG bytes}) or icns (bytes),
   bridges, files ([{path, data}] beside the page), shell (zip bytes, else the one in the page), onStep(text)} */
function makeMac(o){var C=core(),step=o.onStep||function(){};var id=root.IngApk.cleanId(o.id);if(!id)return Promise.reject(new Error("“"+o.id+"” cannot be an app id: letters, digits and dots, such as com.yannieforest.myapp"));
  var page=String(o.page||"index.html").replace(/^\/+/,"").replace(/[^\w.\-\/]+/g,"_")||"index.html";if(!/\.html?$/i.test(page))page+=".html";
  var html=typeof o.html==="string"?utf8(o.html):o.html;if(!html||!html.length)return Promise.reject(new Error("there is no page to put in the app"));
  var title=String(o.title||"My app").slice(0,60),folder=macFolder(title),exe=macExe(title);
  var icon;try{icon=o.icns||icns(o.icons||{});}catch(e){return Promise.reject(e);}
  step("Opening the shell");
  return (o.shell?Promise.resolve(o.shell):macShellZip()).then(function(z){var list=C.zipRead(z),files={},dirs=[],modes={},oldExe=null,template=null,top=null;
    return list.reduce(function(p,e){return p.then(function(){var m=/^([^\/]+\.app)\/Contents\/(.*)$/.exec(e.name);if(!m)return;top=top||m[1];var rel=m[2];
        if(e.dir){if(rel&&!/^Resources\/www\//.test(rel))dirs.push(rel.replace(/\/$/,""));return;}
        if(/^Resources\/www\//.test(rel))return;   /* the shell's stand-in page: the app's own goes in its place */
        return e.read().then(function(data){files[rel]=data;modes[rel]=e.mode||0o100644;});});},Promise.resolve()).then(function(){
      var info=files["Info.plist"];if(!info)throw new Error("the shell has no Info.plist");var t=TD.decode(info);
      if(!/^<\?xml/.test(t.trim()))throw new Error("the shell's Info.plist is not text: this shell cannot be filled");
      var m=/<key>CFBundleExecutable<\/key>\s*<string>([^<]+)<\/string>/.exec(t);oldExe=m&&m[1];if(!oldExe||!files["MacOS/"+oldExe])throw new Error("the shell's program is missing");
      template=files["_CodeSignature/CodeResources"];if(!template)throw new Error("the shell is not sealed: this shell cannot be filled");template=TD.decode(template);
      step("Writing its name, id and version");
      var vn=String(o.versionName||"1.0").replace(/[^0-9.]/g,"")||"1.0";
      t=plistSet(t,"CFBundleIdentifier",id);t=plistSet(t,"CFBundleDisplayName",title);t=plistSet(t,"CFBundleName",title.slice(0,15));t=plistSet(t,"CFBundleExecutable",exe);
      t=plistSet(t,"CFBundleShortVersionString",vn);t=plistSet(t,"CFBundleVersion",String(o.build||o.versionName||"1").replace(/[^0-9.]/g,"")||"1");
      t=plistSet(t,"NSMicrophoneUsageDescription",title+" uses the microphone only while you ask it to listen, for dictation or a recording.");
      t=plistSet(t,"NSCameraUsageDescription",title+" uses the camera only while you ask it to, for a picture or a recording.");
      t=plistSet(t,"NSSpeechRecognitionUsageDescription","Dictation turns your speech into text inside "+title+".");
      files["Info.plist"]=utf8(t);
      var prog=files["MacOS/"+oldExe].slice();delete files["MacOS/"+oldExe];delete modes["MacOS/"+oldExe];files["MacOS/"+exe]=prog;modes["MacOS/"+exe]=0o100755;
      files["Resources/AppIcon.icns"]=icon;modes["Resources/AppIcon.icns"]=0o100644;
      var www="Resources/www/";
      files[www+"shell.json"]=utf8(JSON.stringify({page:page,bridges:o.bridges||["CarpeNative"],title:title,made:"Ingenium Fabrica"}));
      (o.files||[]).forEach(function(f){var p=String(f.path).replace(/^\/+/,"").replace(/[^\w.\-\/]+/g,"_");if(!p||p===page||p==="shell.json"||/(^|\/)\.\.(\/|$)/.test(p))return;files[www+p]=typeof f.data==="string"?utf8(f.data):f.data;});
      files[www+page]=html;
      Object.keys(files).forEach(function(r){if(/^Resources\/www\//.test(r))modes[r]=0o100644;});
      step("Sealing it");
      var list2=Object.keys(files).filter(function(r){return sealed(r,exe);}).map(function(r){return {rel:r,data:files[r]};});
      return codeResources(list2,template).then(function(cr){files["_CodeSignature/CodeResources"]=cr;modes["_CodeSignature/CodeResources"]=0o100644;
        return resign(prog,{1:files["Info.plist"],3:cr});});}).then(function(nCD){
      step("Packing it");
      var root2=folder+"/Contents/",out=[{name:folder+"/",dir:true,mode:0o40755,madeBy:3},{name:root2,dir:true,mode:0o40755,madeBy:3}],seen={};
      function dir(d){if(!d||seen[d])return;var up=d.lastIndexOf("/");if(up>0)dir(d.slice(0,up));seen[d]=1;out.push({name:root2+d+"/",dir:true,mode:0o40755,madeBy:3});}
      dirs.forEach(dir);Object.keys(files).sort().forEach(function(r){var up=r.lastIndexOf("/");if(up>0)dir(r.slice(0,up));});
      Object.keys(files).sort().forEach(function(r){out.push({name:root2+r,data:files[r],mode:modes[r]||0o100644,madeBy:3});});
      out.push({name:"How to open "+title.replace(/[\/:\\]+/g," ")+".txt",data:utf8(HOWTO(title,folder)),mode:0o100644,madeBy:3});
      return C.zipBuild(out).then(function(zz){var bytes=new Uint8Array(zz.local.length+zz.cd.length+zz.eocd.length);bytes.set(zz.local,0);bytes.set(zz.cd,zz.local.length);bytes.set(zz.eocd,zz.local.length+zz.cd.length);
        return C.sha256(bytes).then(function(h){return {bytes:bytes,size:bytes.length,sha256:C.hex(h),id:id,title:title,folder:folder,exe:exe,signatures:nCD};});});});});}

/* ============ WINDOWS (IngWin) ============
   The Windows shell (source/shells/windows: a window with Microsoft's WebView2, which Windows 10 and 11 carry) is one
   program, built once on GitHub's Windows machines. An app made from it is that program under the app's own name, with
   the app's icon written into the icon the program carries (each size has room kept for it, make_ico.py), and the app's
   files after the program's code: a zip of them, stored as they are, then its length and a mark (TRAILER) that says
   where it begins. Windows reads a program's code and resources and never what follows them, so nothing else changes.
   Windows asks the first time an app from outside the Store opens (SmartScreen: More info, Run anyway). */
var TRAILER=utf8("INGWWW01"),WIN_SIZES=[16,24,32,48,64,256];
function winShellExe(){if(root.__ingWinShell)return Promise.resolve(root.__ingWinShell);var e=typeof document!=="undefined"&&document.getElementById("ing-win-shell");
  if(!e||!e.textContent.trim())return Promise.reject(new Error("this build of Ingenium carries no Windows shell"));var u=core().b64d(e.textContent);root.__ingWinShell=u;return Promise.resolve(u);}
/* the name Windows shows and keeps the file under: without what its file names cannot hold, and never a device's name */
function winName(title){var n=String(title||"").replace(/[\\\/:*?"<>|\u0000-\u001f\u007f]+/g," ").replace(/\s+/g," ").trim().replace(/[. ]+$/,"").slice(0,60);
  if(!n)n="App";if(/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\.|$)/i.test(n))n+=" app";return n;}
/* the program without any app's files after it */
function bareShell(exe){var n=exe.length;if(n>16){var t=exe.subarray(n-8);for(var i=0;i<8&&t[i]===TRAILER[i];i++);if(i===8){var dv=new DataView(exe.buffer,exe.byteOffset+n-16,8);var len=dv.getUint32(0,true)+dv.getUint32(4,true)*4294967296;
      if(len>0&&len<n-16)return exe.subarray(0,n-16-len);}}return exe;}
/* the program's icons: each picture's place, its room, and the table (the icon group) that names them */
function peIcons(u8){var dv=new DataView(u8.buffer,u8.byteOffset,u8.byteLength);if(dv.getUint16(0,true)!==0x5a4d)throw new Error("the Windows shell is not a program");
  var e=dv.getUint32(0x3c,true);if(dv.getUint32(e,true)!==0x4550)throw new Error("the Windows shell is not a program");
  var nsec=dv.getUint16(e+6,true),optSize=dv.getUint16(e+20,true),opt=e+24,magic=dv.getUint16(opt,true),dd=opt+(magic===0x20b?112:96);
  var rsrc=dv.getUint32(dd+16,true),secs=[],i;
  for(i=0;i<nsec;i++){var q=opt+optSize+i*40;secs.push({va:dv.getUint32(q+12,true),vsize:dv.getUint32(q+8,true),rawSize:dv.getUint32(q+16,true),raw:dv.getUint32(q+20,true)});}
  function off(rva){for(var k=0;k<secs.length;k++){var s=secs[k];if(rva>=s.va&&rva<s.va+Math.max(s.vsize,s.rawSize))return rva-s.va+s.raw;}throw new Error("the Windows shell's resources are out of place");}
  if(!rsrc)throw new Error("the Windows shell has no icon");var base=off(rsrc);
  function dir(o){var nn=dv.getUint16(base+o+12,true)+dv.getUint16(base+o+14,true),out=[];
    for(var k=0;k<nn;k++){var p=base+o+16+k*8,nm=dv.getUint32(p,true),d=dv.getUint32(p+4,true);out.push({id:nm&0x7fffffff,sub:!!(d&0x80000000),off:d&0x7fffffff});}return out;}
  function leaf(x){while(x.sub){var d=dir(x.off);if(!d.length)throw new Error("the Windows shell's icon is empty");x=d[0];}var p=base+x.off;return {at:off(dv.getUint32(p,true)),size:dv.getUint32(p+4,true),sizeAt:p+4};}
  var types=dir(0),ti=types.filter(function(t){return t.id===3;})[0],tg=types.filter(function(t){return t.id===14;})[0];
  if(!ti||!tg)throw new Error("the Windows shell has no icon");
  var pics={};dir(ti.off).forEach(function(x){pics[x.id]=leaf(x);});
  var g=leaf(dir(tg.off)[0]),count=dv.getUint16(g.at+4,true),entries=[];
  for(i=0;i<count;i++){var q2=g.at+6+i*14;entries.push({size:u8[q2]||256,bytesAt:q2+8,id:dv.getUint16(q2+12,true)});}
  return {pics:pics,entries:entries};}
function winIconsInto(exe,icons){var t=peIcons(exe),dv=new DataView(exe.buffer,exe.byteOffset,exe.byteLength);
  t.entries.forEach(function(en){var png=icons[en.size],pic=t.pics[en.id];if(!png)throw new Error("the "+en.size+" pixel icon is missing");if(!pic)throw new Error("the Windows shell's icon is damaged");
    if(png.length>pic.size)throw new Error("the "+en.size+" pixel icon is larger than the room the shell keeps for it ("+png.length+" of "+pic.size+" bytes)");
    exe.set(png,pic.at);exe.fill(0,pic.at+png.length,pic.at+pic.size);dv.setUint32(pic.sizeAt,png.length,true);dv.setUint32(en.bytesAt,png.length,true);});
  return t.entries.length;}
function winIcons(src){if(typeof document==="undefined")return Promise.reject(new Error("icons are drawn in a window"));
  return new Promise(function(res,rej){var im=new Image();im.onload=function(){res(im);};im.onerror=function(){rej(new Error("the app's icon could not be read"));};im.src=src;}).then(function(im){
    return Promise.all(WIN_SIZES.map(function(z){var c=document.createElement("canvas");c.width=z;c.height=z;var x=c.getContext("2d");x.imageSmoothingEnabled=true;try{x.imageSmoothingQuality="high";}catch(e){}
      x.drawImage(im,0,0,z,z);return new Promise(function(r2){c.toBlob(function(b){b.arrayBuffer().then(function(ab){r2(new Uint8Array(ab));});},"image/png");});})).then(function(list){
      var o={};WIN_SIZES.forEach(function(z,i){o[z]=list[i];});return o;});});}
function winIconsFor(html,title,colour,fallback){var A=root.IngApk;var src=(A&&A.iconSource&&A.iconSource(html))||fallback||letterIcon(title,colour);return winIcons(src);}
var WIN_HOWTO=function(title,exe){return [title,"","Made with Ingenium Fabrica, for Windows 10 and 11 (64-bit).","",
  "1. Move "+exe+" where you keep your apps (your Desktop, or a folder of its own).",
  "2. Double-click it. The first time, Windows may say it protected your PC:",
  "   choose More info, then Run anyway.",
  "3. To keep it on the taskbar, right-click its button while it is open and choose Pin to taskbar.",
  "   Your work in it stays on this PC, even if you move the file.",
  "","It uses Microsoft Edge WebView2, which Windows 10 and 11 carry. If it is missing, the app says so and opens the page to get it.",""].join("\n");};
/* o: {html (text or bytes), page, title, id, versionName, icons ({16,24,32,48,64,256: PNG bytes}), bridges, files ([{path, data}]),
   shell (the program's bytes, else the one in the page), onStep(text)} */
function makeWin(o){var C=core(),step=o.onStep||function(){};var id=root.IngApk.cleanId(o.id);if(!id)return Promise.reject(new Error("“"+o.id+"” cannot be an app id: letters, digits and dots, such as com.yannieforest.myapp"));
  var page=String(o.page||"index.html").replace(/^\/+/,"").replace(/[^\w.\-\/]+/g,"_")||"index.html";if(!/\.html?$/i.test(page))page+=".html";
  var html=typeof o.html==="string"?utf8(o.html):o.html;if(!html||!html.length)return Promise.reject(new Error("there is no page to put in the app"));
  var title=String(o.title||"My app").slice(0,60).replace(/[\r\n]+/g," "),name=winName(title),exeName=name+".exe";
  var bridges=(o.bridges||["CarpeNative"]).filter(function(b){return /^[A-Za-z_][A-Za-z0-9_]*$/.test(b);});
  step("Opening the shell");
  return (o.shell?Promise.resolve(o.shell):winShellExe()).then(function(shell){var exe=bareShell(shell).slice();
    step("Drawing its icon in");var nIcons=winIconsInto(exe,o.icons||{});
    step("Putting its files in");
    var files=[{name:"shell.txt",data:utf8(["page="+page,"title="+title,"id="+id,"bridges="+bridges.join(","),"version="+String(o.versionName||"1.0").replace(/[\r\n]+/g," "),"made=Ingenium Fabrica",""].join("\n")),store:true},
      {name:"shell.json",data:utf8(JSON.stringify({page:page,bridges:bridges,title:title,id:id,made:"Ingenium Fabrica"})),store:true}];
    (o.files||[]).forEach(function(f){var p=String(f.path).replace(/^\/+/,"").replace(/[^\w.\-\/]+/g,"_");if(!p||p===page||p==="shell.json"||p==="shell.txt"||/(^|\/)\.\.(\/|$)/.test(p))return;files.push({name:p,data:typeof f.data==="string"?utf8(f.data):f.data,store:true});});
    files.push({name:page,data:html,store:true});
    return C.zipBuild(files).then(function(zz){var plen=zz.local.length+zz.cd.length+zz.eocd.length,out=new Uint8Array(exe.length+plen+16),dv=new DataView(out.buffer);
      out.set(exe,0);out.set(zz.local,exe.length);out.set(zz.cd,exe.length+zz.local.length);out.set(zz.eocd,exe.length+zz.local.length+zz.cd.length);
      dv.setUint32(exe.length+plen,plen%4294967296,true);dv.setUint32(exe.length+plen+4,Math.floor(plen/4294967296),true);out.set(TRAILER,exe.length+plen+8);
      step("Packing it");
      return C.zipBuild([{name:exeName,data:out},{name:"How to open "+name+".txt",data:utf8(WIN_HOWTO(title,exeName))}]).then(function(z2){
        var bytes=new Uint8Array(z2.local.length+z2.cd.length+z2.eocd.length);bytes.set(z2.local,0);bytes.set(z2.cd,z2.local.length);bytes.set(z2.eocd,z2.local.length+z2.cd.length);
        return Promise.all([C.sha256(bytes),C.sha256(out)]).then(function(h){return {bytes:bytes,size:bytes.length,sha256:C.hex(h[0]),exe:exeName,exeSha256:C.hex(h[1]),exeSize:out.length,id:id,title:title,icons:nIcons};});});});});}

root.IngMac={make:makeMac,iconsFor:iconsFor,sizes:MAC_SIZES,folder:macFolder,exeName:macExe,
  core:{icns:icns,codeResources:codeResources,resign:resign,slices:slices,plistDict:plistDict},
  has:function(){if(root.__ingMacShell)return true;var e=typeof document!=="undefined"&&document.getElementById("ing-mac-shell");return !!(e&&e.textContent.trim());}};
root.IngWin={make:makeWin,iconsFor:winIconsFor,sizes:WIN_SIZES,fileName:winName,
  core:{peIcons:peIcons,iconsInto:winIconsInto,bare:bareShell,TRAILER:TRAILER},
  has:function(){if(root.__ingWinShell)return true;var e=typeof document!=="undefined"&&document.getElementById("ing-win-shell");return !!(e&&e.textContent.trim());}};
})(typeof window!=="undefined"?window:globalThis);
;try{window.__ingParts["p91"]="running";}catch(_){}
</script>
