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
/* 7.23, her words (16 November 2026): "I don't want to keep seeing Ingenium's own app files and logo when I try to ship a new version of
   the Forge or Carpe Diem or Inkwell or any future app that I choose to make." Fabrica's audit found Ingenium named where a person sees it
   in an app made here: the Mac app's rights line (Get Info, its About window), the Windows program's company (its Details) and the first
   line of these notes. Each now names the app's owner (the profile's author, else the name in Settings, else the app itself). */
/* 7.25: the publishing name (modules/r309.js, IngPublisher) when one is chosen, and then only it: a name, or none (""), never the
   app's title in its place; before one is chosen (an edition that asks, not yet answered), as before */
function ownerLine(title){var n="",P=root.IngPublisher,chosen=!!(P&&P.decided&&P.decided());
  if(chosen)n=String(P.name()||"");
  else{try{if(typeof lxhAuthor==="function")n=String(lxhAuthor()||"");}catch(e){}
    if(!n.trim()){try{n=String((typeof personaGet==="function"&&personaGet()||{}).name||"");}catch(e){}}}
  n=n.replace(/[^0-9A-Za-z\u00c0-\u024f .'\-]+/g," ").replace(/\s+/g," ").trim().slice(0,60);return chosen?n:(n||String(title||""));}
var HOWTO=function(title,folder){return [title,"","For a Mac (Apple silicon or Intel, macOS 12 or newer).","",
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
      t=plistSet(t,"CFBundleShortVersionString",vn);var ow=ownerLine(title);t=plistSet(t,"NSHumanReadableCopyright",ow?"\u00a9 "+new Date().getFullYear()+" "+ow:"");t=plistSet(t,"CFBundleVersion",String(o.build||o.versionName||"1").replace(/[^0-9.]/g,"")||"1");
      t=plistSet(t,"NSMicrophoneUsageDescription",title+" uses the microphone only while you ask it to listen, for dictation or a recording.");
      t=plistSet(t,"NSCameraUsageDescription",title+" uses the camera only while you ask it to, for a picture or a recording.");
      t=plistSet(t,"NSSpeechRecognitionUsageDescription","Dictation turns your speech into text inside "+title+".");
      files["Info.plist"]=utf8(t);
      var prog=files["MacOS/"+oldExe].slice();delete files["MacOS/"+oldExe];delete modes["MacOS/"+oldExe];files["MacOS/"+exe]=prog;modes["MacOS/"+exe]=0o100755;
      files["Resources/AppIcon.icns"]=icon;modes["Resources/AppIcon.icns"]=0o100644;
      var www="Resources/www/";
/* 7.29: her apps carry no credit naming Ingenium (her words, 17 November 2026: "I don't want to keep seeing Ingenium's own app files and logo when I try to ship a new version of the Forge or Carpe Diem or Inkwell or any future app"). The audit of that day (rig/t_729_family_real.js) found "Ingenium Fabrica" in each ready-made app's shell.json and shell.txt, and in an APK's signature files (Created-By); no shell reads it. It says "Fabrica" now, as the kits' guides do. */
      files[www+"shell.json"]=utf8(JSON.stringify({page:page,bridges:o.bridges||["CarpeNative"],title:title,made:"Fabrica"}));
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
/* 6.73: the program carries its own name, written in place. Her request of 10 November 2026: "I want the "exe" to be removed from
   the app's name when I build it inside of Ingenium, please fix this." 6.70 put a whole new resource directory, with a version
   resource, in a section of its own after the shell's others; Windows then refused to start every app made so (GitHub's Windows check
   of 6.70: "The specified executable is not a valid application for this OS platform"), though every rule of the program's layout
   that could be checked without Windows held. Now the shell carries its own version resource (shells/windows/shell.rc) with room kept
   for an app's name, its file and its version, as it keeps room for its icons; Fabrica writes them into that room and empties the
   rest of it, so not one byte of the program's layout moves and nothing past the room is touched. A shell without that room (one
   built before) is filled as before, without a name: the app opens, and Windows shows it by its file name. */
var WIN_SLOTS=[["FileDescription","@INGFD@",64,"title"],["ProductName","@INGPN@",64,"title"],["InternalName","@INGIN@",64,"name"],
  ["OriginalFilename","@INGOF@",72,"file"],["FileVersion","@INGFV@",24,"version"],["ProductVersion","@INGPV@",24,"version"]];
function u16le(s){var o=new Uint8Array(s.length*2);for(var i=0;i<s.length;i++){var c=s.charCodeAt(i);o[2*i]=c&255;o[2*i+1]=(c>>8)&255;}return o;}
function findAt(hay,needle,from,to){var end=Math.min(hay.length,to==null?hay.length:to)-needle.length;
  outer:for(var i=Math.max(0,from||0);i<=end;i++){if(hay[i]!==needle[0])continue;for(var j=1;j<needle.length;j++)if(hay[i+j]!==needle[j])continue outer;return i;}return -1;}
/* each value's room: its mark and dots, N characters in all; the String it belongs to has its key just before it (and at most one
   word of padding), and its header (wLength, wValueLength, wType) just before the key. A room not found as the shell keeps it means
   this shell keeps none, and nothing is written. Returns how many values were written. */
function winNameInto(exe,o){var dv=new DataView(exe.buffer,exe.byteOffset,exe.byteLength),found=[];
  for(var k=0;k<WIN_SLOTS.length;k++){var S=WIN_SLOTS[k],room=S[1];while(room.length<S[2])room+=".";
    var p=findAt(exe,u16le(room));if(p<0)return 0;
    var key=u16le(S[0]+"\u0000"),kp=findAt(exe,key,p-key.length-4,p);if(kp<0)return 0;var hdr=kp-6,vl=dv.getUint16(hdr+2,true);
    if((vl!==S[2]&&vl!==S[2]+1)||dv.getUint16(hdr+4,true)!==1)return 0;found.push({S:S,p:p,hdr:hdr});}
  var vals={title:String(o.title||""),name:String(o.name||""),file:String(o.name||"")+".exe",version:String(o.version||"1.0")};
  found.forEach(function(f){var v=vals[f.S[3]].slice(0,f.S[2]-1);exe.fill(0,f.p,f.p+2*f.S[2]);exe.set(u16le(v),f.p);dv.setUint16(f.hdr+2,v.length+1,true);});
  /* the numbers Windows shows under Details: the fixed part of the version resource, found by its signature */
  var n=String(o.version||"1.0").split(/[^0-9]+/).filter(function(x){return x!=="";}).slice(0,4).map(function(x){return Math.min(65535,parseInt(x,10)||0);});while(n.length<4)n.push(0);
  var sig=findAt(exe,new Uint8Array([0xBD,0x04,0xEF,0xFE]));
  if(sig>=0){var ms=(n[0]<<16|n[1])>>>0,ls=(n[2]<<16|n[3])>>>0;dv.setUint32(sig+8,ms,true);dv.setUint32(sig+12,ls,true);dv.setUint32(sig+16,ms,true);dv.setUint32(sig+20,ls,true);}
  return found.length;}
function winCompanyInto(exe,who){try{var room="Made with Ingenium Fabrica",p=findAt(exe,u16le(room));if(p<0)return false;var dv=new DataView(exe.buffer,exe.byteOffset,exe.byteLength);
  var key=u16le("CompanyName\u0000"),kp=findAt(exe,key,p-key.length-4,p);if(kp<0)return false;var hdr=kp-6,vl=dv.getUint16(hdr+2,true);if(vl!==room.length&&vl!==room.length+1)return false;
  var v=String(who||"").slice(0,room.length);exe.fill(0,p,p+2*room.length);if(v)exe.set(u16le(v),p);dv.setUint16(hdr+2,v.length+1,true);return true;}catch(e){return false;}}
function winIcons(src){if(typeof document==="undefined")return Promise.reject(new Error("icons are drawn in a window"));
  return new Promise(function(res,rej){var im=new Image();im.onload=function(){res(im);};im.onerror=function(){rej(new Error("the app's icon could not be read"));};im.src=src;}).then(function(im){
    return Promise.all(WIN_SIZES.map(function(z){var c=document.createElement("canvas");c.width=z;c.height=z;var x=c.getContext("2d");x.imageSmoothingEnabled=true;try{x.imageSmoothingQuality="high";}catch(e){}
      x.drawImage(im,0,0,z,z);return new Promise(function(r2){c.toBlob(function(b){b.arrayBuffer().then(function(ab){r2(new Uint8Array(ab));});},"image/png");});})).then(function(list){
      var o={};WIN_SIZES.forEach(function(z,i){o[z]=list[i];});return o;});});}
function winIconsFor(html,title,colour,fallback){var A=root.IngApk;var src=(A&&A.iconSource&&A.iconSource(html))||fallback||letterIcon(title,colour);return winIcons(src);}
var WIN_HOWTO=function(title,exe){return [title,"","For Windows 10 and 11 (64-bit).","",
  "1. Move "+title+" where you keep your apps (your Desktop, or a folder of its own).",
  "   Windows shows it by its name, "+title+". Only where a PC shows the endings of file names does its file read "+exe+".",
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
  /* 7.24: an installer, "<App> Setup.exe" (her approved preview), unless the portable program alone is asked for (o.setup false) */
  var setup=o.setup!==false,vn=String(o.versionName||"1.0").replace(/[\r\n]+/g," "),publisher=String(o.publisher!=null?o.publisher:ownerOnly()).replace(/[\r\n]+/g," ").trim().slice(0,80);
  var bridges=(o.bridges||["CarpeNative"]).filter(function(b){return /^[A-Za-z_][A-Za-z0-9_]*$/.test(b);});
  step("Opening the shell");
  return (o.shell?Promise.resolve(o.shell):winShellExe()).then(function(shell){var exe=bareShell(shell).slice();
    step("Drawing its icon in");var nIcons=winIconsInto(exe,o.icons||{});
    step("Giving it its name");if(!winNameInto(exe,{title:title,name:name,version:String(o.versionName||"1.0").replace(/[\r\n]+/g," ")}))step("This Windows shell keeps no room for a name, so Windows will show the app by its file name");winCompanyInto(exe,o.publisher!=null?publisher:ownerLine(title));
    step("Putting its files in");
    var files=[{name:"shell.txt",data:utf8(["page="+page,"title="+title,"id="+id,"bridges="+bridges.join(","),"version="+vn,"name="+name,"publisher="+publisher,"made=Fabrica",""].join("\n")),store:true},
      {name:"shell.json",data:utf8(JSON.stringify({page:page,bridges:bridges,title:title,id:id,made:"Fabrica"})),store:true}];
    (o.files||[]).forEach(function(f){var p=String(f.path).replace(/^\/+/,"").replace(/[^\w.\-\/]+/g,"_");if(!p||p===page||p==="shell.json"||p==="shell.txt"||/^__setup\//.test(p)||/(^|\/)\.\.(\/|$)/.test(p))return;files.push({name:p,data:typeof f.data==="string"?utf8(f.data):f.data,store:true});});
    files.push({name:page,data:html,store:true});
    if(setup){step("Writing its installer");var ic=(o.icons||{})[256]||(o.icons||{})[64];
      files.push({name:"__setup/index.html",data:utf8(setupPage({title:title,icon:ic?"data:image/png;base64,"+C.b64e(ic):"",font:(typeof LX7_FONTS!=="undefined"&&LX7_FONTS&&LX7_FONTS["cormorant-600-normal"])||""})),store:true});}
    return C.zipBuild(files).then(function(zz){var plen=zz.local.length+zz.cd.length+zz.eocd.length,out=new Uint8Array(exe.length+plen+16),dv=new DataView(out.buffer);
      out.set(exe,0);out.set(zz.local,exe.length);out.set(zz.cd,exe.length+zz.local.length);out.set(zz.eocd,exe.length+zz.local.length+zz.cd.length);
      dv.setUint32(exe.length+plen,plen%4294967296,true);dv.setUint32(exe.length+plen+4,Math.floor(plen/4294967296),true);out.set(TRAILER,exe.length+plen+8);
      if(setup)return C.sha256(out).then(function(h){var nm=name+" Setup.exe";
        return {bytes:out,size:out.length,sha256:C.hex(h),exe:nm,exeSha256:C.hex(h),exeSize:out.length,id:id,title:title,icons:nIcons,kind:"setup",fileName:nm,mime:"application/vnd.microsoft.portable-executable"};});
      step("Packing it");
      return C.zipBuild([{name:exeName,data:out},{name:"How to open "+name+".txt",data:utf8(WIN_HOWTO(title,exeName))}]).then(function(z2){
        var bytes=new Uint8Array(z2.local.length+z2.cd.length+z2.eocd.length);bytes.set(z2.local,0);bytes.set(z2.cd,z2.local.length);bytes.set(z2.eocd,z2.local.length+z2.cd.length);
        return Promise.all([C.sha256(bytes),C.sha256(out)]).then(function(h){return {bytes:bytes,size:bytes.length,sha256:C.hex(h[0]),exe:exeName,exeSha256:C.hex(h[1]),exeSize:out.length,id:id,title:title,icons:nIcons,kind:"portable",mime:"application/zip"};});});});});}

/* ============ 7.24 · THE WINDOWS INSTALLER'S PAGE ============
   Her approved preview (16 November 2026: "I approve of the preview, please push it everywhere"): an app made for Windows is
   its own installer, "<App> Setup.exe"; the Windows shell (shells/windows/shell.cpp) shows this page in a window of its own when
   the program opens as one, and again from Settings, Apps to uninstall it. In Ingenium's look, as approved: the window's own bar,
   its minimise and close keys lifting under the pointer (the close turning violet); the app's seal swaying and leaning to the
   pointer, its shadow cast below; the two ways to install as raised tiles, the chosen one lifted, ringed and glowing; the
   desktop tick and Open without installing as live keys; a progress well with its sheen; no scroll bar anywhere. The shell
   tells the page about the app and the install (window.SetupHost.info) and does the work it is asked for (SetupHost.send). */
var SETUP_CSS=[
  ":root{--card:#faf8fc;--hi:#fff;--lo:#eee8f4;--ink1:#221a2e;--ink2:#4a4358;--ink3:#6c6579;--hair:rgba(34,26,46,.10);--acc:#6a3fb5;--accs:rgba(106,63,181,.12);",
  "--ring:rgba(106,63,181,.5);--pa:#7348be;--pb:#5d37a1;--pledge:#3a2070;--glow1:rgba(183,140,240,.22);--glow2:rgba(240,170,220,.14);",
  "--pop:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);",
  "--pophi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);",
  "--press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);--well:inset 0 1px 2.5px rgba(40,22,68,.08);--wellbg:rgba(34,26,46,.035);",
  "--psh:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--pledge),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16);",
  "--pshhi:inset 0 1px 0 rgba(255,255,255,.18),0 3px 0 var(--pledge),0 6px 9px rgba(40,22,68,.26),0 13px 22px rgba(40,22,68,.18);--castc:rgba(40,22,68,.28);",
  "--f-title:\"Setup Serif\",\"Iowan Old Style\",\"Palatino Linotype\",Palatino,Georgia,serif;--f-ui:\"Segoe UI Variable Text\",\"Segoe UI\",system-ui,sans-serif}",
  "@media (prefers-color-scheme:dark){:root{--card:#1c1626;--hi:#201a2b;--lo:#2a2239;--ink1:#f3eefb;--ink2:#d3c9e3;--ink3:#a99cc1;--hair:rgba(205,184,240,.11);",
  "--acc:#b79ce6;--accs:rgba(183,156,230,.16);--ring:rgba(183,156,230,.45);--pa:#7a56c8;--pb:#5b3aa1;--pledge:#170b30;--glow1:rgba(122,86,200,.20);--glow2:rgba(180,90,170,.10);",
  "--pop:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.50),0 9px 14px rgba(0,0,0,.36);",
  "--pophi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.40);",
  "--press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);--well:inset 0 1px 3px rgba(0,0,0,.4);--wellbg:rgba(10,6,18,.35);",
  "--psh:inset 0 1px 0 rgba(255,255,255,.14),0 2px 0 var(--pledge),0 4px 6px rgba(0,0,0,.5),0 9px 16px rgba(0,0,0,.3);",
  "--pshhi:inset 0 1px 0 rgba(255,255,255,.16),0 3px 0 var(--pledge),0 6px 9px rgba(0,0,0,.55),0 13px 22px rgba(0,0,0,.35);--castc:rgba(0,0,0,.5);color-scheme:dark}}",
  "*{box-sizing:border-box}[hidden]{display:none !important}",
  /* her rule for Ingenium and every app: no scroll bar shows, and everything still scrolls */
  "html,body,*{scrollbar-width:none;-ms-overflow-style:none}*::-webkit-scrollbar{display:none;width:0;height:0}",
  "html,body{margin:0;height:100%;overflow:hidden;background:var(--card)}",
  "body{color:var(--ink1);font:15px/1.55 var(--f-ui);-webkit-user-select:none;user-select:none;cursor:default}",
  ".inst{position:relative;min-height:100vh;display:flex;flex-direction:column;background:radial-gradient(520px 260px at 8% -12%,var(--glow1),transparent 70%),",
  "radial-gradient(420px 220px at 104% 6%,var(--glow2),transparent 70%),var(--card)}",
  ".inst.measure{min-height:0}",
  ".bar{display:flex;align-items:center;gap:10px;padding:8px 10px 8px 16px;font:500 12.5px var(--f-ui);color:var(--ink3);background:linear-gradient(var(--hi),var(--card));",
  "border-bottom:1px solid var(--hair);cursor:grab;flex:none}",
  ".bar .mini{width:18px;height:18px;flex:none;background:var(--icon) center/contain no-repeat}",
  ".bar .bt{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bar .x{margin-left:auto;display:flex;gap:6px}",
  ".wc{all:unset;box-sizing:border-box;width:32px;height:28px;border-radius:10px;display:grid;place-items:center;color:var(--ink3);cursor:pointer;font-size:14px;",
  "transition:transform .18s cubic-bezier(.34,1.35,.64,1),background .18s ease,color .18s ease,box-shadow .18s ease}",
  ".wc:hover{transform:translateY(-2px);background:linear-gradient(var(--hi),var(--card));color:var(--acc);box-shadow:var(--pop)}",
  ".wc:active{transform:translateY(1px);box-shadow:var(--press);transition-duration:.06s}",
  ".wc.close:hover{color:#fff;background:linear-gradient(var(--pa),var(--pb));box-shadow:var(--psh)}",
  ".wc:focus-visible{outline:2px solid var(--ring);outline-offset:2px}.wc:disabled{opacity:.4;pointer-events:none}",
  ".head{display:grid;grid-template-columns:auto minmax(0,1fr);gap:18px;align-items:center;padding:22px 24px 6px;animation:rise .45s cubic-bezier(.22,1,.36,1)}",
  ".eye{font:600 11px/1 var(--f-ui);letter-spacing:.28em;text-transform:uppercase;color:var(--ink3)}",
  "h3{font:600 34px/1.05 var(--f-title);margin:6px 0 2px;overflow-wrap:anywhere}",
  ".sub{color:var(--ink2);font-size:13.5px;overflow-wrap:anywhere}",
  ".body{padding:14px 24px 22px;display:grid;gap:12px;align-content:start;flex:1 1 auto;animation:rise .45s cubic-bezier(.22,1,.36,1)}",
  ".body:empty{padding:4px}",
  ".foot{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end;align-items:center;padding:16px 24px;background:linear-gradient(var(--card),var(--lo));",
  "border-top:1px solid var(--hair);flex:none}",
  ".lnk{all:unset;box-sizing:border-box;margin-right:auto;color:var(--acc);font:500 13.5px var(--f-ui);cursor:pointer;text-decoration:underline;",
  "text-decoration-thickness:1px;text-underline-offset:3px;display:inline-block;transition:transform .18s cubic-bezier(.34,1.35,.64,1),",
  "text-decoration-thickness .18s ease,text-underline-offset .18s ease,color .18s ease}",
  ".lnk:hover{transform:translateY(-2px);text-decoration-thickness:2px;text-underline-offset:5px;color:var(--pa)}.lnk:active{transform:translateY(1px)}",
  ".lnk:focus-visible{outline:2px solid var(--ring);outline-offset:3px;border-radius:4px}",
  ".key{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:12px;",
  "background:linear-gradient(var(--hi),var(--card));color:var(--ink1);font:500 14px/1.2 var(--f-ui);box-shadow:var(--pop);",
  "transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s ease}",
  ".key:hover{transform:translateY(-2px);box-shadow:var(--pophi)}.key:active{transform:translateY(1px);box-shadow:var(--press);transition-duration:.06s}",
  ".key.pri{background:linear-gradient(var(--pa),var(--pb));color:#fff;box-shadow:var(--psh)}.key.pri:hover{box-shadow:var(--pshhi)}.key.pri:active{box-shadow:var(--press)}",
  ".key:focus-visible{outline:2px solid var(--ring);outline-offset:3px}.key:disabled{opacity:.55;cursor:default;pointer-events:none}",
  /* the seal: the app's icon in layers, swaying, leaning to the pointer, its shadow cast below */
  ".seal{position:relative;width:76px;height:76px;perspective:400px;flex:none}",
  ".seal .tilt{position:absolute;top:0;right:0;bottom:0;left:0;transform-style:preserve-3d;transition:transform .5s cubic-bezier(.22,1,.36,1)}",
  ".seal .idle{position:absolute;top:0;right:0;bottom:0;left:0;animation:sway 7s ease-in-out infinite;transform-style:preserve-3d}",
  ".seal .face{position:absolute;top:0;right:0;bottom:0;left:0;background:var(--icon) center/contain no-repeat;",
  "filter:drop-shadow(0 6px 8px rgba(40,22,68,.28)) drop-shadow(0 1px 0 rgba(0,0,0,.18))}",
  ".seal .shine{position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(140deg,rgba(255,255,255,.45),rgba(255,255,255,0) 45%);",
  "mix-blend-mode:soft-light;transform:translateZ(6px);-webkit-mask:var(--icon) center/contain no-repeat;mask:var(--icon) center/contain no-repeat}",
  ".seal .cast{position:absolute;left:12%;right:12%;bottom:-14px;height:12px;border-radius:50%;background:radial-gradient(closest-side,var(--castc),transparent);",
  "animation:castb 7s ease-in-out infinite}",
  "@keyframes sway{0%,100%{transform:rotateX(4deg) rotateY(-7deg) translateY(0)}50%{transform:rotateX(-3deg) rotateY(7deg) translateY(-3px)}}",
  "@keyframes castb{0%,100%{transform:scaleX(1);opacity:1}50%{transform:scaleX(.9);opacity:.75}}",
  "@keyframes rise{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}",
  /* the ways to install: raised tiles; the chosen one lifts, ringed and glowing */
  ".opts{display:grid;gap:12px}",
  ".opt{position:relative;display:grid;grid-template-columns:24px minmax(0,1fr);gap:12px;padding:14px 16px;border-radius:16px;background:linear-gradient(var(--hi),var(--card));",
  "box-shadow:var(--pop);cursor:pointer;transition:transform .18s cubic-bezier(.34,1.35,.64,1),box-shadow .18s ease}",
  ".opt:hover{transform:translateY(-2px);box-shadow:var(--pophi)}",
  ".opt.on{transform:translateY(-3px);box-shadow:var(--pophi),0 0 0 2px var(--ring),0 12px 26px var(--accs);animation:chosen .5s cubic-bezier(.34,1.56,.64,1)}",
  ".opt.on:hover{transform:translateY(-4px)}.opt.fixed{cursor:default}.opt.fixed:hover{transform:translateY(-3px)}",
  ".opt.on::after{content:\"\";position:absolute;top:-2px;right:-2px;bottom:-2px;left:-2px;border-radius:18px;pointer-events:none;box-shadow:0 0 18px 2px var(--accs);",
  "animation:breathe 4.5s ease-in-out infinite}",
  ".opt:focus-visible{outline:2px solid var(--ring);outline-offset:3px}",
  ".opt .gem{width:20px;height:20px;border-radius:50%;margin-top:2px;background:var(--lo);box-shadow:var(--well);display:grid;place-items:center;",
  "transition:transform .2s cubic-bezier(.34,1.56,.64,1)}.opt:hover .gem{transform:scale(1.08)}",
  ".opt.on .gem::after{content:\"\";width:12px;height:12px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#c9b3f2,var(--pa) 55%,var(--pb));",
  "box-shadow:0 1px 2px rgba(40,22,68,.4);animation:pip .35s cubic-bezier(.34,1.56,.64,1)}",
  ".opt b{font-weight:600}.opt small{display:block;color:var(--ink3);font-size:12.5px;margin-top:2px;overflow-wrap:anywhere}",
  "@keyframes chosen{0%{transform:translateY(0) scale(.985)}55%{transform:translateY(-5px) scale(1.012)}100%{transform:translateY(-3px) scale(1)}}",
  "@keyframes breathe{0%,100%{opacity:.35}50%{opacity:1}}@keyframes pip{from{transform:scale(.2)}to{transform:scale(1)}}",
  /* the ticks: a raised box that lifts, sinks when pressed, its tick popping in */
  ".chk{display:flex;gap:12px;align-items:center;font-size:14px;cursor:pointer;justify-self:start;border-radius:10px}",
  ".chk:focus-visible{outline:2px solid var(--ring);outline-offset:4px}",
  ".chk .c{width:22px;height:22px;flex:none;border-radius:7px;background:linear-gradient(var(--hi),var(--card));box-shadow:var(--pop);display:grid;place-items:center;",
  "color:#fff;font-size:13px;transition:transform .18s cubic-bezier(.34,1.35,.64,1),box-shadow .18s ease}",
  ".chk:hover .c{transform:translateY(-2px);box-shadow:var(--pophi)}.chk:active .c{transform:translateY(1px);box-shadow:var(--press);transition-duration:.06s}",
  ".chk .c.on{background:linear-gradient(var(--pa),var(--pb));box-shadow:var(--psh);animation:tick .4s cubic-bezier(.34,1.56,.64,1)}.chk:hover .c.on{box-shadow:var(--pshhi)}",
  "@keyframes tick{0%{transform:scale(.6)}60%{transform:scale(1.15)}100%{transform:scale(1)}}",
  /* the work: a well filling, with its sheen, and its steps ticked as each is done */
  ".well{height:12px;border-radius:999px;background:var(--wellbg);box-shadow:var(--well);overflow:hidden}",
  ".well i{display:block;height:100%;width:3%;border-radius:999px;background:linear-gradient(90deg,var(--pb),var(--pa));position:relative;overflow:hidden;",
  "transition:width .35s ease}",
  ".well i::after{content:\"\";position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(100deg,transparent 20%,rgba(255,255,255,.45) 50%,transparent 80%);",
  "animation:sheen 1.6s linear infinite}@keyframes sheen{from{transform:translateX(-100%)}to{transform:translateX(100%)}}",
  ".ticks{display:grid;gap:6px;font-size:13.5px;color:var(--ink2)}.ticks .t{display:flex;gap:10px;align-items:center}",
  ".ticks .d{width:18px;height:18px;flex:none;border-radius:50%;display:grid;place-items:center;font-size:11px;background:var(--accs);color:var(--acc);",
  "transition:background .25s ease,color .25s ease}",
  ".ticks .t.done .d{background:linear-gradient(var(--pa),var(--pb));color:#fff;animation:tick .4s cubic-bezier(.34,1.56,.64,1)}",
  ".err{padding:10px 14px;border-radius:14px;background:var(--wellbg);box-shadow:var(--well);color:var(--acc);font-size:13.5px;overflow-wrap:anywhere}",
  ".note{color:var(--ink3);font-size:13px}",
  "@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none !important;transition:none !important}}"].join("");
var SETUP_HTML='<div class="inst" id="inst" data-screen=""><div class="bar" id="bar"><span class="mini"></span><span class="bt" id="bt"></span><span class="x">'+
  '<button type="button" class="wc" id="wMin" title="Minimise" aria-label="Minimise">&#8211;</button>'+
  '<button type="button" class="wc close" id="wClose" title="Close" aria-label="Close">&#10005;</button></span></div>'+
  '<div class="head"><div class="seal" aria-hidden="true"><div class="tilt" id="tilt"><div class="idle"><div class="face"></div><div class="shine"></div></div></div><div class="cast"></div></div>'+
  '<div><div class="eye" id="eye"></div><h3 id="ttl"></h3><div class="sub" id="sub"></div></div></div>'+
  '<div class="body" id="body"></div><div class="foot" id="foot"></div></div>';
/* the installer's own script: it runs in the installer's window (never in Ingenium), from this function's text */
function setupMain(){"use strict";
  var D=document,W=window,H=W.SetupHost||{info:{},send:function(){}},I=H.info||{},T=String(I.title||"App"),ins=I.installed||null,UNI=I.mode==="uninstall";
  var send=function(){try{H.send.apply(H,arguments);}catch(e){}};
  function $(id){return D.getElementById(id);}
  function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  function cmp(a,b){var x=String(a||"").split(/[^0-9]+/),y=String(b||"").split(/[^0-9]+/);for(var i=0;i<Math.max(x.length,y.length);i++){var p=parseInt(x[i]||"0",10)||0,q=parseInt(y[i]||"0",10)||0;if(p!==q)return p<q?-1:1;}return 0;}
  var same=!!ins&&cmp(ins.version,I.version)===0,newer=!!ins&&cmp(ins.version,I.version)>0,wasIn=!!ins;
  var S={screen:UNI?"uninstall":"choose",scope:ins?(ins.all?"all":"me"):"all",desk:ins?!!ins.desktop:true,open:true,removeData:false,pct:0,step:0,asking:false,err:"",code:0};
  function where(){if(ins&&(!!ins.all)===(S.scope==="all"))return ins.dir;var d=I.dirs||{};return S.scope==="all"?d.all:d.me;}
  function act(){return UNI?"Uninstall":same?"Reinstall":newer?"Install this version":wasIn?"Update":"Install";}
  function busy(){return S.screen==="installing"||S.screen==="uninstalling";}
  function why(c){
    if(c===3)return T+" is open. Close it, then press "+act()+" again.";
    if(c===4)return "A file could not be written in "+(where()||"its folder")+". Check the drive has room, then try again.";
    if(c===5)return UNI?"Removing it needs an administrator, as it was installed for everyone on this PC.":"Installing for everyone needs an administrator. Choose Just for me, or ask an administrator to install it.";
    if(c===6)return "Its entry in Settings, Apps could not be "+(UNI?"removed":"written")+".";
    if(c===7)return "Its shortcuts could not be made.";
    if(c===8)return "This folder holds no installed copy of "+T+".";
    if(c===9)return "Its program could not be removed. Close "+T+", then try again.";
    if(c===10)return "Windows' administrator question was declined, so nothing changed."+(!UNI&&!wasIn?" Just for me needs no administrator.":"");
    if(c===11)return "Windows could not ask for an administrator."+(!UNI&&!wasIn?" Just for me needs none.":"");
    if(c===12)return "Some of its saved work could not be removed: it is still in "+(I.data||"its folder")+".";
    return "It stopped before the end (code "+c+").";}
  function head(eye,ttl,sub){$("eye").textContent=eye;$("ttl").textContent=ttl;$("sub").textContent=sub;}
  function opt(k,on,t1,t2,fixed){return '<div class="opt'+(on?" on":"")+(fixed?" fixed":"")+'" data-scope="'+k+'" role="radio" aria-checked="'+on+'"'+(fixed?' aria-disabled="true"':' tabindex="0"')+
    '><span class="gem"></span><div><b>'+t1+'</b><small>'+esc(t2)+'</small></div></div>';}
  function chk(k,on,label){return '<div class="chk" data-'+k+'="1" role="checkbox" aria-checked="'+on+'" tabindex="0"><span class="c'+(on?" on":"")+'">'+(on?"&#10003;":"")+'</span>'+esc(label)+'</div>';}
  function err(){return '<div class="err" id="err" role="alert"'+(S.err?"":" hidden")+'>'+esc(S.err)+'</div>';}
  function tick(i,label){var d=S.step>i;return '<div class="t'+(d?" done":"")+'"><span class="d">'+(d?"&#10003;":(i+1))+'</span>'+esc(label)+'</div>';}
  function ticks(){return UNI?tick(0,"Its shortcuts")+tick(1,"Its entry in Settings, Apps")+tick(2,"The program")+(S.removeData?tick(3,"Its saved work"):"")
    :tick(0,"The program copied")+tick(1,"Its Start menu entry"+(S.desk?" and desktop shortcut":""))+tick(2,"Its entry in Settings, Apps");}
  function paint(){var s=S.screen,b="",f="",v="Version "+(I.version||"1.0")+(I.publisher?" · from "+I.publisher:"");
    $("inst").setAttribute("data-screen",s);$("bt").textContent=T+" Setup";D.title=T+" Setup";$("wClose").disabled=busy();
    if(s==="choose"){head(same?"Installed already":newer?"A newer version is installed":wasIn?"Update":"Install",T,v+(wasIn?" · installed: "+(ins.version||"?"):""));
      b='<div class="opts" role="radiogroup" aria-label="Install it">'+(wasIn?opt(ins.all?"all":"me",true,ins.all?"For everyone on this PC":"Just for me","Installed in "+ins.dir+". It goes there again; your saved work stays.",true)
        :opt("all",S.scope==="all","For everyone on this PC","Into Program Files, for every account. Windows asks for an administrator first.")+
         opt("me",S.scope==="me","Just for me","Into your own apps folder. No administrator needed."))+'</div>'+chk("desk",S.desk,"Put a shortcut on the desktop")+err();
      f='<button type="button" class="lnk" id="goTry">Open without installing</button><button type="button" class="key" id="wCancel">Cancel</button>'+
        '<button type="button" class="key pri" id="goInstall">'+act()+'</button>';}
    else if(s==="installing"){head(wasIn?"Updating":"Installing",T,S.asking?"Windows asks for an administrator first.":"Into "+(where()||""));
      b='<div class="well"><i id="fill" style="width:'+Math.max(3,S.pct)+'%"></i></div><div class="ticks" id="ticks">'+ticks()+'</div>';
      f='<button type="button" class="key" disabled>Cancel</button>';}
    else if(s==="installed"){head(wasIn?"Updated":"Installed",T+" is ready","Find it in the Start menu"+(S.desk?" and on your desktop":"")+", and in Settings, Apps to uninstall it.");
      b=chk("open",S.open,"Open "+T+" now");f='<button type="button" class="key pri" id="wFinish">Finish</button>';}
    else if(s==="uninstall"){head("Uninstall","Remove "+T+"?","Its program, its shortcuts and its entry in Settings go.");
      b=chk("keep",S.removeData,"Also remove its saved work")+'<div class="note">'+(S.removeData?"Your saved work goes with it. Untick to keep it.":"Your saved work stays on this PC, so it is there if you install "+esc(T)+" again.")+'</div>'+err();
      f='<button type="button" class="key" id="wCancel">Cancel</button><button type="button" class="key pri" id="goUninstall">Uninstall</button>';}
    else if(s==="uninstalling"){head("Uninstalling",T,S.asking?"Windows asks for an administrator first.":"From "+(ins?ins.dir:""));
      b='<div class="well"><i id="fill" style="width:'+Math.max(3,S.pct)+'%"></i></div><div class="ticks" id="ticks">'+ticks()+'</div>';
      f='<button type="button" class="key" disabled>Cancel</button>';}
    else if(s==="uninstalled"){head("Uninstalled",T+" is removed",S.removeData?(S.err?"":"Its saved work is removed too."):"Your saved work stays on this PC.");b=err();
      f='<button type="button" class="key pri" id="wDone">Close</button>';}
    else {head(UNI?"Not removed":"Not installed",T,why(S.code));
      f='<button type="button" class="key" id="goBack">Back</button><button type="button" class="key pri" id="wClose2">Close</button>';}
    $("body").innerHTML=b;$("foot").innerHTML=f;wire();fit();}
  function on(id,fn){var e=$(id);if(e)e.addEventListener("click",fn);}
  function tog(sel,fn){var e=D.querySelector(sel);if(!e)return;e.addEventListener("click",fn);e.addEventListener("keydown",function(ev){if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();fn();}});}
  function wire(){
    [].forEach.call(D.querySelectorAll(".opt[data-scope]:not(.fixed)"),function(o){var pick=function(){S.scope=o.getAttribute("data-scope");S.err="";paint();var n=D.querySelector('.opt[data-scope="'+S.scope+'"]');if(n)n.focus();};
      o.addEventListener("click",pick);o.addEventListener("keydown",function(ev){if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();pick();}});});
    tog("[data-desk]",function(){S.desk=!S.desk;paint();var n=D.querySelector("[data-desk]");if(n)n.focus();});
    tog("[data-open]",function(){S.open=!S.open;paint();var n=D.querySelector("[data-open]");if(n)n.focus();});
    tog("[data-keep]",function(){S.removeData=!S.removeData;paint();var n=D.querySelector("[data-keep]");if(n)n.focus();});
    on("goTry",function(){send("run");});
    on("wCancel",function(){send("close");});on("wClose2",function(){send("close");});on("wDone",function(){send("close");});
    on("wFinish",function(){send(S.open?"open":"close");});
    on("goBack",function(){S.screen=UNI?"uninstall":"choose";S.err="";paint();});
    on("goInstall",function(){S.err="";S.pct=0;S.step=0;S.asking=false;S.screen="installing";paint();send("install",S.scope,S.desk?1:0);});
    on("goUninstall",function(){S.err="";S.pct=0;S.step=0;S.asking=false;S.screen="uninstalling";paint();send("uninstall",S.removeData?1:0);});}
  /* the shell's news: how far the work is, Windows asking, the end */
  function hear(m){if(!m||typeof m!=="object")return;
    if(m.type==="progress"){S.asking=false;S.pct=m.pct|0;S.step=m.step|0;var f=$("fill"),t=$("ticks");if(f)f.style.width=Math.max(3,S.pct)+"%";if(t)t.innerHTML=ticks();
      var sb=$("sub");if(sb&&busy())sb.textContent=(UNI?"From ":"Into ")+(UNI?(ins?ins.dir:""):(where()||""));return;}
    if(m.type==="asking"){S.asking=true;$("sub").textContent="Windows asks for an administrator first.";return;}
    if(m.type==="finished"){var c=m.code|0;S.asking=false;
      if(!UNI){if(c===0){S.screen="installed";}else if(c===3||c===5||c===10||c===11){S.screen="choose";S.err=why(c);}else{S.code=c;S.screen="failed";}}
      else{if(c===0||c===12){S.screen="uninstalled";S.err=c===12?why(12):"";}else if(c===3||c===5||c===10||c===11){S.screen="uninstall";S.err=why(c);}else{S.code=c;S.screen="failed";}}
      paint();}}
  try{W.chrome.webview.addEventListener("message",function(e){hear(e.data);});}catch(e){}
  /* the window's own bar: pressed, the window follows the pointer; its keys minimise and close */
  $("bar").addEventListener("mousedown",function(e){if(e.button!==0||e.target.closest(".wc"))return;e.preventDefault();send("drag");});
  on("wMin",function(){send("min");});on("wClose",function(){if(!busy())send("close");});
  D.addEventListener("keydown",function(e){if(e.key==="Escape"&&!busy()){e.preventDefault();send("close");}
    else if(e.key==="Enter"&&!(e.target&&e.target.closest&&e.target.closest("button,[role=radio],[role=checkbox]"))){var k=$("goInstall")||$("goUninstall")||$("wFinish")||$("wDone");if(k){e.preventDefault();k.click();}}});
  /* the seal leans to the pointer */
  var tilt=$("tilt");$("inst").addEventListener("pointermove",function(e){var r=tilt.getBoundingClientRect(),x=(e.clientX-(r.left+r.width/2))/Math.max(160,r.width*3),y=(e.clientY-(r.top+r.height/2))/Math.max(160,r.height*3);
    tilt.style.transform="rotateY("+(Math.max(-1,Math.min(1,x))*16).toFixed(1)+"deg) rotateX("+(Math.max(-1,Math.min(1,-y))*13).toFixed(1)+"deg)";});
  $("inst").addEventListener("pointerleave",function(){tilt.style.transform="";});
  /* the window takes the page's height: once at first, then only to grow, so it never jumps smaller under the pointer */
  var lastH=0;function fit(){var n=$("inst");n.classList.add("measure");var h=Math.ceil(n.getBoundingClientRect().height);n.classList.remove("measure");if(h>lastH){lastH=h;send("fit",540,h);}}
  paint();try{if(D.fonts&&D.fonts.ready)D.fonts.ready.then(fit);}catch(e){}
}
function setupEsc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
/* the page: o.title, o.icon (the app's icon as a data address), o.font (a woff2 data address for the titles, else the system's serif) */
function setupPage(o){var css=(o.font&&/^data:/.test(o.font)?'@font-face{font-family:"Setup Serif";src:url('+o.font+') format("woff2");font-weight:600;font-style:normal;font-display:block}':"")+
    (o.icon&&/^data:image\//.test(o.icon)?":root{--icon:url("+o.icon+")}":"")+SETUP_CSS;
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+setupEsc(o.title)+' Setup</title><style>'+css+
    '</style></head><body>'+SETUP_HTML+'<script>('+setupMain.toString()+')();<\/script></body></html>';}
/* the owner's name alone (the profile's author, else the name in Settings), or nothing */
function ownerOnly(){var n=ownerLine("");return n;}

root.IngMac={make:makeMac,iconsFor:iconsFor,sizes:MAC_SIZES,folder:macFolder,exeName:macExe,
  core:{icns:icns,codeResources:codeResources,resign:resign,slices:slices,plistDict:plistDict},
  has:function(){if(root.__ingMacShell)return true;var e=typeof document!=="undefined"&&document.getElementById("ing-mac-shell");return !!(e&&e.textContent.trim());}};
root.IngWin={make:makeWin,iconsFor:winIconsFor,sizes:WIN_SIZES,fileName:winName,
  core:{peIcons:peIcons,iconsInto:winIconsInto,nameInto:winNameInto,slots:WIN_SLOTS,bare:bareShell,TRAILER:TRAILER,setupPage:setupPage},
  has:function(){if(root.__ingWinShell)return true;var e=typeof document!=="undefined"&&document.getElementById("ing-win-shell");return !!(e&&e.textContent.trim());}};
})(typeof window!=="undefined"?window:globalThis);
;try{window.__ingParts["p91"]="running";}catch(_){}
</script>
