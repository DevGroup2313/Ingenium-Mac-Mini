<script>try{(window.__ingParts=window.__ingParts||{})["p57"]="started";}catch(_){}
/* R136 · AN APK AND AN IPA, MADE ON THE DEVICE
   The owner's words (20 October 2026): "It was supposed to be my own personal offline GitHub and ship ready made apps on
   my devices for all of my devices, it is supposed to be APKs and IPAs right there inside of Ingenium", "have not produced
   any APKs for my tablet, no Ipa for my ios devices as well, it just bundles up a bunch of files together into a zip folder".
   Until 6.0 neither Ingenium nor The Forge made a package a device installs: The Forge's "Fire tablet" package was an
   Android project for GitHub to compile (forge-fire's release the-forge-apk was built that way), and the iPhone package a
   project for GitHub's Macs.

   Now the package is made here, with no compiler and no connection, because its one compiled part is a shell that is the
   same for every app (source/shells): a window with a web view that runs the app's own page. This module writes the rest.
   ANDROID (IngApk): the binary manifest (the app's id, name, version and icon), a resource table naming the icon at five
   densities, the icons, the page and assets/shell.json, a zip laid out as Android 11 and later require (the resource
   table stored and aligned), and both signatures Android reads: v1 (the JAR signature, which the Fire tablet's Android 5
   reads) and v2 (the APK Signing Block, which Android 11 and later require). The key is made on the device the first time
   (RSA, 2048 bits, a certificate for 100 years) and kept; a key from a .keystore (PKCS #12, as keytool and GitHub's builds
   make them) can be brought in, so a package installs over one built before with that key.
   IPHONE AND IPAD (IngIpa): a copy of the compiled shell with the app's page, its name, id, version and icons. Apple lets
   no app onto a device unless an Apple ID signs it, so the IPA is unsigned, as GitHub's IPAs of The Forge and Ingenium
   are: Sideloadly or AltStore signs it with the owner's Apple ID as it installs it.
   Tested against Google's own verifier (apksig) and androguard, and in Android's emulator and Apple's simulator
   (source/shells/test). */
(function(root){
"use strict";
var TE=new TextEncoder(),TD=new TextDecoder();
function utf8(s){return TE.encode(String(s));}
function cat(list){var n=0,i;for(i=0;i<list.length;i++)n+=list[i].length;var o=new Uint8Array(n),k=0;for(i=0;i<list.length;i++){o.set(list[i],k);k+=list[i].length;}return o;}
function b64e(u8){var s="",CH=0x8000;for(var i=0;i<u8.length;i+=CH)s+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));return btoa(s);}
function b64d(s){var bin=atob(String(s).replace(/\s+/g,"")),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u;}
function subtle(){var c=root.crypto||(typeof crypto!=="undefined"?crypto:null);if(!c||!c.subtle)throw new Error("this window has no Web Crypto: open Ingenium from its own app or a secure address");return c.subtle;}
function sha256(u8){return subtle().digest("SHA-256",u8).then(function(b){return new Uint8Array(b);});}
function hex(u8){var s="";for(var i=0;i<u8.length;i++)s+=(u8[i]<16?"0":"")+u8[i].toString(16);return s;}

/* ---------- a growing little-endian writer ---------- */
function W(cap){this.b=new Uint8Array(cap||1024);this.n=0;}
W.prototype.need=function(k){if(this.n+k>this.b.length){var nb=new Uint8Array(Math.max(this.b.length*2,this.n+k+64));nb.set(this.b.subarray(0,this.n));this.b=nb;}};
W.prototype.u8=function(v){this.need(1);this.b[this.n++]=v&255;return this;};
W.prototype.u16=function(v){this.need(2);this.b[this.n++]=v&255;this.b[this.n++]=(v>>>8)&255;return this;};
W.prototype.u32=function(v){this.need(4);v=v>>>0;this.b[this.n++]=v&255;this.b[this.n++]=(v>>>8)&255;this.b[this.n++]=(v>>>16)&255;this.b[this.n++]=(v>>>24)&255;return this;};
W.prototype.u64=function(v){var lo=v%4294967296,hi=Math.floor(v/4294967296);return this.u32(lo).u32(hi);};
W.prototype.bytes=function(u){this.need(u.length);this.b.set(u,this.n);this.n+=u.length;return this;};
W.prototype.zero=function(k){this.need(k);this.b.fill(0,this.n,this.n+k);this.n+=k;return this;};
W.prototype.pad4=function(){while(this.n%4)this.u8(0);return this;};
W.prototype.set32=function(at,v){v=v>>>0;this.b[at]=v&255;this.b[at+1]=(v>>>8)&255;this.b[at+2]=(v>>>16)&255;this.b[at+3]=(v>>>24)&255;};
W.prototype.out=function(){return this.b.slice(0,this.n);};
function rd16(u,o){return u[o]|(u[o+1]<<8);}
function rd32(u,o){return (u[o]|(u[o+1]<<8)|(u[o+2]<<16)|(u[o+3]<<24))>>>0;}

/* ---------- crc32, deflate and inflate ---------- */
var CRCT=(function(){var t=new Uint32Array(256);for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t;})();
function crc32(u8){var c=0xFFFFFFFF;for(var i=0;i<u8.length;i++)c=CRCT[(c^u8[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0;}
function streamAll(u8,ts){var s=new Blob([u8]).stream().pipeThrough(ts),r=s.getReader(),parts=[];
  return (function pump(){return r.read().then(function(x){if(x.done)return cat(parts);parts.push(x.value instanceof Uint8Array?x.value:new Uint8Array(x.value));return pump();});})();}
function deflateRaw(u8){
  if(typeof CompressionStream!=="undefined"){try{return streamAll(u8,new CompressionStream("deflate-raw")).catch(function(){return null;});}catch(e){}}
  try{if(root.IngRepo&&IngRepo.core&&IngRepo.core.deflateZ){var z=IngRepo.core.deflateZ(u8);if(z&&z.length>6)return Promise.resolve(z.subarray(2,z.length-4));}}catch(e){}
  return Promise.resolve(null);}
function inflateRaw(u8,size){
  if(typeof DecompressionStream!=="undefined"){try{return streamAll(u8,new DecompressionStream("deflate-raw"));}catch(e){}}
  try{if(root.IngRepo&&IngRepo.core&&IngRepo.core.inflateRaw)return Promise.resolve(IngRepo.core.inflateRaw(u8,size));}catch(e){}
  return Promise.reject(new Error("this window cannot unpack a zip"));}

/* ---------- a zip, with each stored entry's data aligned (Android's zipalign, extra field 0xD935) ----------
   entries: {name, data, store (true: kept as it is), align (bytes), mode (unix mode for the IPA), madeBy, dir}
   returns {local, cd, eocd, cdOffset} so a signing block can go between the entries and the central directory */
var DOSTIME=0,DOSDATE=(1<<5)|1;   /* 1 January 1980, 00:00: the same bytes on every device, as Android's tools write them */
function zipBuild(entries){return entries.reduce(function(p,e){return p.then(function(list){
    var data=e.data||new Uint8Array(0),crc=crc32(data);
    if(e.store||e.dir||data.length===0)return list.concat([{e:e,crc:crc,method:0,comp:data,size:data.length}]);
    return deflateRaw(data).then(function(z){var keep=!z||z.length>=data.length;return list.concat([{e:e,crc:crc,method:keep?0:8,comp:keep?data:z,size:data.length}]);});});},Promise.resolve([]))
  .then(function(list){var parts=[],cd=new W(4096),off=0;
    list.forEach(function(x){var e=x.e,name=utf8(e.name),extra=new Uint8Array(0);
      if(x.method===0&&e.align&&e.align>1){var base=off+30+name.length,pad=(e.align-((base+6)%e.align))%e.align;var xw=new W(6+pad);xw.u16(0xD935).u16(2+pad).u16(e.align).zero(pad);extra=xw.out();}
      var h=new W(30+name.length+extra.length);
      h.u32(0x04034b50).u16(x.method===8?20:10).u16(0x0800).u16(x.method).u16(DOSTIME).u16(DOSDATE).u32(x.crc).u32(x.comp.length).u32(x.size).u16(name.length).u16(extra.length).bytes(name).bytes(extra);
      var hb=h.out();parts.push(hb,x.comp);
      var unix=e.madeBy===undefined?(e.mode?3:0):e.madeBy,ext=e.ext!==undefined?e.ext:(e.mode?((e.mode&0xFFFF)<<16)>>>0:0);
      if(e.dir&&!e.mode)ext=0x10;
      cd.u32(0x02014b50).u16((unix<<8)|20).u16(x.method===8?20:10).u16(0x0800).u16(x.method).u16(DOSTIME).u16(DOSDATE).u32(x.crc).u32(x.comp.length).u32(x.size)
        .u16(name.length).u16(0).u16(0).u16(0).u16(0).u32(ext).u32(off).bytes(name);
      off+=hb.length+x.comp.length;});
    var cdb=cd.out(),eo=new W(22);eo.u32(0x06054b50).u16(0).u16(0).u16(list.length).u16(list.length).u32(cdb.length).u32(off).u16(0);
    if(list.length>65000||off>0xFFFF0000)throw new Error("this package is too large for one zip");
    return {local:cat(parts),cd:cdb,eocd:eo.out(),cdOffset:off};});}

/* reading a zip: its entries, each read when asked */
function zipRead(u8){var n=u8.length,eo=-1;for(var i=n-22;i>=Math.max(0,n-22-65535);i--){if(u8[i]===0x50&&u8[i+1]===0x4b&&u8[i+2]===5&&u8[i+3]===6){eo=i;break;}}
  if(eo<0)throw new Error("not a zip");var count=rd16(u8,eo+10),cdo=rd32(u8,eo+16),out=[],p=cdo;
  for(var k=0;k<count;k++){if(rd32(u8,p)!==0x02014b50)throw new Error("the zip's directory is damaged");
    var madeBy=rd16(u8,p+4),method=rd16(u8,p+10),crc=rd32(u8,p+16),csize=rd32(u8,p+20),usize=rd32(u8,p+24),nl=rd16(u8,p+28),xl=rd16(u8,p+30),cl=rd16(u8,p+32),ext=rd32(u8,p+38),lo=rd32(u8,p+42);
    var name=TD.decode(u8.subarray(p+46,p+46+nl));p+=46+nl+xl+cl;
    (function(name,method,csize,usize,lo,madeBy,ext,crc){var dstart=lo+30+rd16(u8,lo+26)+rd16(u8,lo+28),raw=u8.subarray(dstart,dstart+csize);
      out.push({name:name,method:method,size:usize,madeBy:madeBy>>>8,ext:ext,mode:(ext>>>16)&0xFFFF,dir:/\/$/.test(name),crc:crc,
        read:function(){return method===0?Promise.resolve(raw.slice()):method===8?inflateRaw(raw,usize):Promise.reject(new Error(name+": packed in a way this cannot read"));}});})(name,method,csize,usize,lo,madeBy,ext,crc);}
  return out;}

/* ---------- Android's binary XML (the manifest) ---------- */
var ANDROID_NS="http://schemas.android.com/apk/res/android";
var A={theme:16842752,label:16842753,icon:16842754,name:16842755,exported:16842768,launchMode:16842781,screenOrientation:16842782,configChanges:16842783,
  targetActivity:16843266,minSdkVersion:16843276,versionCode:16843291,versionName:16843292,windowSoftInputMode:16843307,targetSdkVersion:16843376,
  allowBackup:16843392,hardwareAccelerated:16843475,largeHeap:16843610,supportsRtl:16843695,resizeableActivity:16844022,compileSdkVersion:16844146,compileSdkVersionCodename:16844147};
var THEME_MATERIAL_LIGHT_NOACTIONBAR=16974401;
function strPool(strings,utf8Flag){var data=new W(4096),offs=[];
  strings.forEach(function(s){offs.push(data.n);s=String(s);
    if(utf8Flag){var b=utf8(s);var L=s.length;if(L>0x7f)data.u8(((L>>8)&0x7f)|0x80);data.u8(L&0xff);var B=b.length;if(B>0x7f)data.u8(((B>>8)&0x7f)|0x80);data.u8(B&0xff);data.bytes(b).u8(0);}
    else{var L2=s.length;if(L2>0x7fff){data.u16(((L2>>>16)&0x7fff)|0x8000);data.u16(L2&0xffff);}else data.u16(L2);for(var i=0;i<L2;i++)data.u16(s.charCodeAt(i));data.u16(0);}});
  data.pad4();var n=strings.length,start=28+4*n,size=start+data.n,w=new W(size);
  w.u16(0x0001).u16(28).u32(size).u32(n).u32(0).u32(utf8Flag?0x100:0).u32(start).u32(0);offs.forEach(function(o){w.u32(o);});w.bytes(data.out());return w.out();}
/* el: {tag, attrs:[{ns:"android"|null, name, type:"string"|"int"|"hex"|"bool"|"ref", value}], kids:[]} */
function axml(rootEl){
  var withIds=[],seen={};(function walk(el){el.attrs.forEach(function(a){if(a.ns==="android"){if(!(a.name in A))throw new Error("no resource id known for android:"+a.name);if(!seen[a.name]){seen[a.name]=1;withIds.push(a.name);}}});(el.kids||[]).forEach(walk);})(rootEl);
  withIds.sort(function(x,y){return A[x]-A[y];});
  var strings=withIds.slice(),index={};strings.forEach(function(s,i){index[s]=i;});
  function S(s){s=String(s);if(!(s in index)){index[s]=strings.length;strings.push(s);}return index[s];}
  S("android");S(ANDROID_NS);(function walk(el){S(el.tag);el.attrs.forEach(function(a){S(a.name);if(a.type==="string")S(a.value);});(el.kids||[]).forEach(walk);})(rootEl);
  var body=new W(8192),NONE=0xFFFFFFFF,line=1;
  body.u16(0x0100).u16(16).u32(24).u32(line).u32(NONE).u32(S("android")).u32(S(ANDROID_NS));
  (function walk(el){var at=el.attrs.slice().sort(function(x,y){var ix=x.ns==="android",iy=y.ns==="android";if(ix&&iy)return A[x.name]-A[y.name];if(ix!==iy)return ix?1:-1;return x.name<y.name?-1:x.name>y.name?1:0;});
    line++;body.u16(0x0102).u16(16).u32(36+20*at.length).u32(line).u32(NONE).u32(NONE).u32(S(el.tag)).u16(20).u16(20).u16(at.length).u16(0).u16(0).u16(0);
    at.forEach(function(a){var t,d,raw=NONE;
      if(a.type==="string"){t=0x03;d=S(a.value);raw=d;}else if(a.type==="int"){t=0x10;d=a.value|0;}else if(a.type==="hex"){t=0x11;d=a.value>>>0;}
      else if(a.type==="bool"){t=0x12;d=a.value?NONE:0;}else if(a.type==="ref"){t=0x01;d=a.value>>>0;}else throw new Error("an attribute of no known kind: "+a.name);
      body.u32(a.ns==="android"?S(ANDROID_NS):NONE).u32(S(a.name)).u32(raw).u16(8).u8(0).u8(t).u32(d);});
    (el.kids||[]).forEach(walk);
    line++;body.u16(0x0103).u16(16).u32(24).u32(line).u32(NONE).u32(NONE).u32(S(el.tag));})(rootEl);
  line++;body.u16(0x0101).u16(16).u32(24).u32(line).u32(NONE).u32(S("android")).u32(S(ANDROID_NS));
  var pool=strPool(strings,false),map=new W(8+4*withIds.length);map.u16(0x0180).u16(8).u32(8+4*withIds.length);withIds.forEach(function(n){map.u32(A[n]);});
  var b=body.out(),mb=map.out(),total=8+pool.length+mb.length+b.length,w=new W(total);w.u16(0x0003).u16(8).u32(total).bytes(pool).bytes(mb).bytes(b);return w.out();}
function el(tag,attrs,kids){return {tag:tag,attrs:attrs||[],kids:kids||[]};}
function an(name,type,value){return {ns:"android",name:name,type:type,value:value};}

/* ---------- the resource table: one type (mipmap), one entry (ic_launcher), at five densities ---------- */
var DENSITIES=[["mdpi",160,48],["hdpi",240,72],["xhdpi",320,96],["xxhdpi",480,144],["xxxhdpi",640,192]];
function iconPath(d){return "res/mipmap-"+d[0]+"-v4/ic_launcher.png";}
function arsc(pkgName){
  var values=strPool(DENSITIES.map(iconPath),true),types=strPool(["mipmap"],true),keys=strPool(["ic_launcher"],true);
  var spec=new W(20);spec.u16(0x0202).u16(16).u32(20).u8(1).u8(0).u16(0).u32(1).u32(0x0100);
  var typeChunks=DENSITIES.map(function(d,i){var cfg=new W(64);cfg.u32(64).u32(0).u32(0).u8(0).u8(0).u16(d[1]).u32(0).u32(0).u16(4).u16(0).zero(64-28);
    var hs=20+64,entriesStart=hs+4,w=new W(entriesStart+16);w.u16(0x0201).u16(hs).u32(entriesStart+16).u8(1).u8(0).u16(0).u32(1).u32(entriesStart).bytes(cfg.out());
    w.u32(0);w.u16(8).u16(0).u32(0);w.u16(8).u8(0).u8(0x03).u32(i);return w.out();});
  var name=new W(256);var nm=String(pkgName).slice(0,127);for(var i=0;i<128;i++)name.u16(i<nm.length?nm.charCodeAt(i):0);
  var body=cat([types,keys,spec.out()].concat(typeChunks)),hs=288,size=hs+body.length;
  var pkg=new W(size);pkg.u16(0x0200).u16(hs).u32(size).u32(0x7f).bytes(name.out()).u32(hs).u32(1).u32(hs+types.length).u32(1).u32(0).bytes(body);
  var pb=pkg.out(),total=12+values.length+pb.length,t=new W(total);t.u16(0x0002).u16(12).u32(total).u32(1).bytes(values).bytes(pb);return t.out();}
var ICON_REF=0x7f010000;

/* ---------- DER, enough for a certificate, a PKCS #7 signature and a PKCS #12 keystore ---------- */
function derLen(n){if(n<128)return [n];var b=[];while(n>0){b.unshift(n&255);n=Math.floor(n/256);}return [0x80|b.length].concat(b);}
function tlv(tag,content){return cat([new Uint8Array([tag].concat(derLen(content.length))),content]);}
function SEQ(){return tlv(0x30,cat([].slice.call(arguments)));}
function SET(){return tlv(0x31,cat([].slice.call(arguments)));}
function OID(s){var p=s.split(".").map(Number),out=[40*p[0]+p[1]];for(var i=2;i<p.length;i++){var v=p[i],st=[v&127];v=Math.floor(v/128);while(v>0){st.unshift((v&127)|128);v=Math.floor(v/128);}out=out.concat(st);}return tlv(0x06,new Uint8Array(out));}
function INTb(u){var i=0;while(i<u.length-1&&u[i]===0)i++;u=u.subarray(i);if(u[0]&0x80)u=cat([new Uint8Array([0]),u]);return tlv(0x02,u);}
function INT(n){var b=[];do{b.unshift(n&255);n=Math.floor(n/256);}while(n>0);return INTb(new Uint8Array(b));}
var NUL=new Uint8Array([5,0]);
function OCT(u){return tlv(0x04,u);}
function BIT(u){return tlv(0x03,cat([new Uint8Array([0]),u]));}
function CTX(n,u,prim){return tlv((prim?0x80:0xa0)|n,u);}
function UTF8S(s){return tlv(0x0c,utf8(s));}
function timeDER(d){var p=function(x){return (x<10?"0":"")+x;},y=d.getUTCFullYear(),s=p(d.getUTCMonth()+1)+p(d.getUTCDate())+p(d.getUTCHours())+p(d.getUTCMinutes())+p(d.getUTCSeconds())+"Z";
  return y<2050?tlv(0x17,utf8(String(y).slice(2)+s)):tlv(0x18,utf8(String(y)+s));}
/* reading DER: {tag, start (of the value), end, hdr (where the TLV begins)} and its children */
function dread(u,o){var t=u[o],l=u[o+1],p=o+2;if(l&0x80){var k=l&0x7f;l=0;for(var i=0;i<k;i++)l=l*256+u[p+i];p+=k;}return {tag:t,hdr:o,start:p,end:p+l,len:l};}
function dkids(u,n){var out=[],p=n.start;while(p<n.end){var c=dread(u,p);out.push(c);p=c.end;}return out;}
function dbytes(u,n){return u.subarray(n.hdr,n.end);}
function dval(u,n){return u.subarray(n.start,n.end);}
function doid(u,n){var b=dval(u,n),out=[Math.floor(b[0]/40),b[0]%40],v=0;for(var i=1;i<b.length;i++){v=v*128+(b[i]&127);if(!(b[i]&128)){out.push(v);v=0;}}return out.join(".");}
var OIDS={rsa:"1.2.840.113549.1.1.1",sha256rsa:"1.2.840.113549.1.1.11",sha256:"2.16.840.1.101.3.4.2.1",data:"1.2.840.113549.1.7.1",signedData:"1.2.840.113549.1.7.2",
  encData:"1.2.840.113549.1.7.6",cn:"2.5.4.3",o:"2.5.4.10",ou:"2.5.4.11",pbes2:"1.2.840.113549.1.5.13",pbkdf2:"1.2.840.113549.1.5.12",hmac256:"1.2.840.113549.2.9",
  aes256cbc:"2.16.840.1.101.3.4.1.42",aes128cbc:"2.16.840.1.101.3.4.1.2",keyBag:"1.2.840.113549.1.12.10.1.1",shroudedKeyBag:"1.2.840.113549.1.12.10.1.2",certBag:"1.2.840.113549.1.12.10.1.3",
  x509:"1.2.840.113549.1.9.22.1",friendlyName:"1.2.840.113549.1.9.20",localKeyId:"1.2.840.113549.1.9.21"};
/* what signing needs from a certificate: the issuer and serial (exactly as written), its public key, its subject's CN */
function certParts(der){var c=dread(der,0),k=dkids(der,c),tbs=dkids(der,k[0]),i=0;if(tbs[0].tag===0xa0)i=1;
  var issuer=tbs[i+2],subject=tbs[i+4],spki=tbs[i+5],cn="";
  try{dkids(der,subject).forEach(function(set){var at=dkids(der,dkids(der,set)[0]);if(doid(der,at[0])===OIDS.cn)cn=TD.decode(dval(der,at[1]));});}catch(e){}
  return {serial:dbytes(der,tbs[i]),issuer:dbytes(der,issuer),spki:dbytes(der,spki),cn:cn};}

/* ---------- keys: made here, or brought in from a .keystore ---------- */
var RSA={name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"};
function importPkcs8(pk){return subtle().importKey("pkcs8",pk,RSA,false,["sign"]);}
function makeKeyPair(cn){var s=subtle();return s.generateKey({name:"RSASSA-PKCS1-v1_5",modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:"SHA-256"},true,["sign","verify"]).then(function(kp){
    return Promise.all([s.exportKey("spki",kp.publicKey),s.exportKey("pkcs8",kp.privateKey)]).then(function(x){var spki=new Uint8Array(x[0]),pk8=new Uint8Array(x[1]);
      var now=new Date(),later=new Date(now.getTime()+36500*864e5),serial=new Uint8Array(16);(root.crypto||crypto).getRandomValues(serial);serial[0]&=0x7f;
      var name=SEQ(SET(SEQ(OID(OIDS.cn),UTF8S(cn||"Ingenium"))),SET(SEQ(OID(OIDS.o),UTF8S("Yannie D. Forest"))));
      var alg=SEQ(OID(OIDS.sha256rsa),NUL),tbs=SEQ(CTX(0,INT(2)),INTb(serial),alg,name,SEQ(timeDER(now),timeDER(later)),name,spki);
      return s.sign(RSA,kp.privateKey,tbs).then(function(sig){return {pkcs8:pk8,cert:SEQ(tbs,alg,BIT(new Uint8Array(sig))),made:Date.now()};});});});}
/* PKCS #12, as keytool makes it today (PBES2: PBKDF2 with HMAC-SHA-256, AES-CBC); the integrity MAC is not checked:
   a wrong password shows as a key that cannot be unlocked */
function pbes2Decrypt(der,algNode,data,password){var k=dkids(der,algNode);if(doid(der,k[0])!==OIDS.pbes2)return Promise.reject(new Error("this keystore is locked in an older way Ingenium cannot open (not PBES2): make it again with keytool, or export it as PKCS #12 with AES"));
  var params=dkids(der,k[1]),kdf=dkids(der,params[0]),enc=dkids(der,params[1]);if(doid(der,kdf[0])!==OIDS.pbkdf2)return Promise.reject(new Error("this keystore uses a key derivation Ingenium cannot open"));
  var kp=dkids(der,kdf[1]),salt=dval(der,kp[0]),iter=0,iv=dval(der,enc[1]),prf="SHA-1",j;var ib=dval(der,kp[1]);for(j=0;j<ib.length;j++)iter=iter*256+ib[j];
  for(j=2;j<kp.length;j++){if(kp[j].tag===0x30){var po=doid(der,dkids(der,kp[j])[0]);prf=po===OIDS.hmac256?"SHA-256":po==="1.2.840.113549.2.10"?"SHA-384":po==="1.2.840.113549.2.11"?"SHA-512":"SHA-1";}}
  var eo=doid(der,enc[0]),len=eo===OIDS.aes256cbc?256:eo===OIDS.aes128cbc?128:eo==="2.16.840.1.101.3.4.1.22"?192:0;if(!len)return Promise.reject(new Error("this keystore uses a cipher Ingenium cannot open"));
  var s=subtle();return s.importKey("raw",utf8(password),"PBKDF2",false,["deriveKey"]).then(function(base){return s.deriveKey({name:"PBKDF2",salt:salt,iterations:iter,hash:prf},base,{name:"AES-CBC",length:len},false,["decrypt"]);})
    .then(function(key){return s.decrypt({name:"AES-CBC",iv:iv},key,data);}).then(function(b){return new Uint8Array(b);},function(){throw new Error("the password does not open this keystore");});}
function readP12(u8,password){var pfx=dread(u8,0),k=dkids(u8,pfx),auth=dkids(u8,k[1]);if(doid(u8,auth[0])!==OIDS.data)throw new Error("not a PKCS #12 keystore Ingenium can read");
  var octet=dkids(u8,auth[1])[0],safe=dval(u8,octet),cis=dkids(safe,dread(safe,0)),keys=[],certs=[];
  function bags(der,node){return dkids(der,node).reduce(function(p,bag){return p.then(function(){var b=dkids(der,bag),t=doid(der,b[0]),v=dkids(der,b[1])[0];
      if(t===OIDS.shroudedKeyBag){var e=dkids(der,v);return pbes2Decrypt(der,e[0],dval(der,e[1]),password).then(function(pk){keys.push(pk.slice());});}
      if(t===OIDS.keyBag){keys.push(dbytes(der,v).slice());return;}
      if(t===OIDS.certBag){var cb=dkids(der,v);if(doid(der,cb[0])===OIDS.x509)certs.push(dval(der,dkids(der,cb[1])[0]).slice());}});},Promise.resolve());}
  return cis.reduce(function(p,ci){return p.then(function(){var c=dkids(safe,ci),t=doid(safe,c[0]);
      if(t===OIDS.data){var inner=dval(safe,dkids(safe,c[1])[0]);return bags(inner,dread(inner,0));}
      if(t===OIDS.encData){var ed=dkids(safe,dkids(safe,c[1])[0]),eci=dkids(safe,ed[1]);var ct=eci[2];
        var data=ct.tag===0x80?dval(safe,ct):cat(dkids(safe,ct).map(function(x){return dval(safe,x);}));
        return pbes2Decrypt(safe,eci[1],data,password).then(function(plain){return bags(plain,dread(plain,0));});}});},Promise.resolve())
    .then(function(){if(!keys.length)throw new Error("this keystore holds no private key");if(!certs.length)throw new Error("this keystore holds no certificate");
      return Promise.all(certs.map(function(c){return sha256(certParts(c).spki);})).then(function(){return {pkcs8:keys[0],cert:certs[0],chain:certs};});});}
/* a .p12 back out, so the key can be kept off the device, and used by keytool or by GitHub's builds:
   PBES2 (PBKDF2 with HMAC-SHA-256, 10,000 rounds, AES-256-CBC), and the MAC by RFC 7292's own derivation with SHA-256 */
function p12KDF(pass,salt,id,iter,n){var s=subtle(),v=64,u=32,P=new Uint8Array(0);
  var pw=new Uint8Array((pass.length+1)*2);for(var i=0;i<pass.length;i++){pw[2*i]=pass.charCodeAt(i)>>8;pw[2*i+1]=pass.charCodeAt(i)&255;}
  function fill(src){if(!src.length)return new Uint8Array(0);var L=v*Math.ceil(src.length/v),o=new Uint8Array(L);for(var j=0;j<L;j++)o[j]=src[j%src.length];return o;}
  var D=new Uint8Array(v).fill(id),I=cat([fill(salt),fill(pw)]),out=[];
  function round(){var A=cat([D,I]),k=0;return (function more(x){return k<iter?s.digest("SHA-256",x).then(function(h){k++;return more(new Uint8Array(h));}):Promise.resolve(x);})(A).then(function(Ai){
      out.push(Ai);var B=fill(Ai.subarray(0,u)).subarray(0,v);for(var j=0;j<I.length;j+=v){var c=1;for(var q=v-1;q>=0;q--){c+=I[j+q]+B[q];I[j+q]=c&255;c>>=8;}}
      return out.length*u<n?round():cat(out).subarray(0,n);});}
  return round();}
function writeP12(key,password,alias){var s=subtle(),rnd=function(n){var x=new Uint8Array(n);(root.crypto||crypto).getRandomValues(x);return x;};
  function pbes2(plain){var salt=rnd(16),iv=rnd(16),iter=10000;return s.importKey("raw",utf8(password),"PBKDF2",false,["deriveKey"]).then(function(b){return s.deriveKey({name:"PBKDF2",salt:salt,iterations:iter,hash:"SHA-256"},b,{name:"AES-CBC",length:256},false,["encrypt"]);})
      .then(function(k){return s.encrypt({name:"AES-CBC",iv:iv},k,plain);}).then(function(ct){
        return {alg:SEQ(OID(OIDS.pbes2),SEQ(SEQ(OID(OIDS.pbkdf2),SEQ(OCT(salt),INT(iter),INT(32),SEQ(OID(OIDS.hmac256),NUL))),SEQ(OID(OIDS.aes256cbc),OCT(iv)))),ct:new Uint8Array(ct)};});}
  return sha256(key.cert).then(function(lk){var attrs=SET(SEQ(OID(OIDS.friendlyName),SET(tlv(0x1e,(function(){var u=new Uint8Array(alias.length*2);for(var i=0;i<alias.length;i++){u[2*i]=alias.charCodeAt(i)>>8;u[2*i+1]=alias.charCodeAt(i)&255;}return u;})()))),SEQ(OID(OIDS.localKeyId),SET(OCT(lk.subarray(0,20)))));
    return Promise.all([pbes2(key.pkcs8),pbes2(SEQ(SEQ(OID(OIDS.certBag),CTX(0,SEQ(OID(OIDS.x509),CTX(0,OCT(key.cert)))),attrs)))]).then(function(x){
      var keyBag=SEQ(SEQ(OID(OIDS.shroudedKeyBag),CTX(0,SEQ(x[0].alg,OCT(x[0].ct))),attrs));
      var authSafe=SEQ(SEQ(OID(OIDS.data),CTX(0,OCT(keyBag))),SEQ(OID(OIDS.encData),CTX(0,SEQ(INT(0),SEQ(OID(OIDS.data),x[1].alg,CTX(0,x[1].ct,true))))));
      var macSalt=rnd(20);return p12KDF(password,macSalt,3,10000,32).then(function(mk){return s.importKey("raw",mk,{name:"HMAC",hash:"SHA-256"},false,["sign"]);})
        .then(function(hk){return s.sign("HMAC",hk,authSafe);}).then(function(mac){
          return SEQ(INT(3),SEQ(OID(OIDS.data),CTX(0,OCT(authSafe))),SEQ(SEQ(SEQ(OID(OIDS.sha256),NUL),OCT(new Uint8Array(mac))),OCT(macSalt),INT(10000)));});});});}

/* the keys kept on this device: IndexedDB, and on the computer apps a copy on disk beside the desk */
var KDB=null;function kdb(){if(KDB)return KDB;KDB=new Promise(function(res,rej){try{var rq=indexedDB.open("ingenium_keys",1);rq.onupgradeneeded=function(){try{rq.result.createObjectStore("k");}catch(e){}};
  rq.onsuccess=function(){res(rq.result);};rq.onerror=function(){rej(rq.error||new Error("this device will not keep a signing key"));};}catch(e){rej(e);}});KDB.catch(function(){KDB=null;});return KDB;}
function ktx(mode,fn){return kdb().then(function(d){return new Promise(function(res,rej){var t=d.transaction("k",mode),r=fn(t.objectStore("k"));t.oncomplete=function(){res(r&&"result" in r?r.result:undefined);};t.onerror=function(){rej(t.error);};});});}
var MEMK={};
function kget(id){if(typeof indexedDB==="undefined")return Promise.resolve(MEMK[id]||null);return ktx("readonly",function(s){return s.get(id);}).then(function(r){return r||diskGet(id);});}
function kput(rec){if(typeof indexedDB==="undefined"){MEMK[rec.id]=rec;return Promise.resolve(rec);}return ktx("readwrite",function(s){return s.put(rec,rec.id);}).then(function(){diskPut(rec);return rec;});}
function kdel(id){if(typeof indexedDB==="undefined"){delete MEMK[id];return Promise.resolve();}return ktx("readwrite",function(s){return s.delete(id);}).then(function(){diskDel(id);});}
function kall(){if(typeof indexedDB==="undefined")return Promise.resolve(Object.keys(MEMK).map(function(k){return MEMK[k];}));return ktx("readonly",function(s){return s.getAll();}).then(function(a){return a||[];});}
function shell(){try{var a=typeof shellApi==="function"?shellApi():null;return a&&typeof a.big_put==="function"&&typeof a.big_get==="function"?a:null;}catch(e){return null;}}
function diskPut(rec){var a=shell();if(!a)return;try{a.big_put("signing_"+rec.id,JSON.stringify({id:rec.id,label:rec.label,source:rec.source,made:rec.made,pkcs8:b64e(rec.pkcs8),cert:b64e(rec.cert)}));}catch(e){}}
function diskDel(id){var a=shell();if(a&&typeof a.big_del==="function"){try{a.big_del("signing_"+id);}catch(e){}}}
function diskGet(id){var a=shell();if(!a)return Promise.resolve(null);return Promise.resolve(a.big_get("signing_"+id)).then(function(r){if(!r||!r.ok)return null;var o=JSON.parse(r.text);
  var rec={id:o.id,label:o.label,source:o.source,made:o.made,pkcs8:b64d(o.pkcs8),cert:b64d(o.cert)};return ktx("readwrite",function(s){return s.put(rec,rec.id);}).then(function(){return rec;});}).catch(function(){return null;});}
function describe(rec){if(!rec)return Promise.resolve(null);var p=certParts(rec.cert);return sha256(rec.cert).then(function(h){return {id:rec.id,label:rec.label,source:rec.source,made:rec.made,cn:p.cn,fingerprint:hex(h)};});}
var keys={
  /* the device's own key, made the first time it is asked for */
  device:function(){return kget("device").then(function(r){if(r)return r;return makeKeyPair("Ingenium, on this device").then(function(k){return kput({id:"device",label:"Made on this device",source:"device",made:k.made,pkcs8:k.pkcs8,cert:k.cert});});});},
  get:function(id){return id&&id!=="device"?kget(id):keys.device();},
  list:function(){return kall().then(function(a){return Promise.all(a.map(describe));});},
  /* a .keystore or .p12 file: its first key and certificate, kept under a name of its own */
  bring:function(u8,password,label){return readP12(u8,password).then(function(k){var id="k"+Date.now().toString(36);var p=certParts(k.cert);
    return importPkcs8(k.pkcs8).then(function(){return kput({id:id,label:label||p.cn||"From a keystore",source:"keystore",made:Date.now(),pkcs8:k.pkcs8,cert:k.cert});}).then(describe);});},
  save:function(id,password){if(!password||password.length<6)return Promise.reject(new Error("choose a password of at least six characters"));
    return keys.get(id).then(function(r){if(!r)throw new Error("there is no such key here");return writeP12(r,password,"app");});},
  remove:function(id){if(id==="device")return Promise.reject(new Error("the device's own key stays: an app signed with it could not be updated without it"));return kdel(id);},
  describe:function(id){return keys.get(id).then(describe);}};

/* ---------- v1, the JAR signature ---------- */
function mfLine(name,value){var s=utf8(name+": "+value),out=[],first=true,i=0;
  while(i<s.length){var take=first?72:71;var piece=s.subarray(i,i+take);out.push(first?piece:cat([utf8(" "),piece]));out.push(utf8("\r\n"));i+=take;first=false;}return cat(out);}
function signV1(files,key,created){var keyP=importPkcs8(key.pkcs8);
  return files.reduce(function(p,f){return p.then(function(list){return sha256(f.data).then(function(h){return list.concat([[f.name,b64e(h)]]);});});},Promise.resolve([])).then(function(dig){
    var main=cat([mfLine("Manifest-Version","1.0"),mfLine("Created-By",created),utf8("\r\n")]),sections=dig.map(function(d){return cat([mfLine("Name",d[0]),mfLine("SHA-256-Digest",d[1]),utf8("\r\n")]);});
    var mf=cat([main].concat(sections));
    return Promise.all([sha256(mf),sha256(main)].concat(sections.map(sha256))).then(function(h){
      var sf=cat([mfLine("Signature-Version","1.0"),mfLine("Created-By",created),mfLine("SHA-256-Digest-Manifest",b64e(h[0])),mfLine("SHA-256-Digest-Manifest-Main-Attributes",b64e(h[1])),mfLine("X-Android-APK-Signed","2"),utf8("\r\n")]
        .concat(dig.map(function(d,i){return cat([mfLine("Name",d[0]),mfLine("SHA-256-Digest",b64e(h[i+2])),utf8("\r\n")]);})));
      return keyP.then(function(k){return subtle().sign(RSA,k,sf);}).then(function(sig){var cp=certParts(key.cert);
        var signer=SEQ(INT(1),SEQ(cp.issuer,cp.serial),SEQ(OID(OIDS.sha256),NUL),SEQ(OID(OIDS.rsa),NUL),OCT(new Uint8Array(sig)));
        var sd=SEQ(INT(1),SET(SEQ(OID(OIDS.sha256),NUL)),SEQ(OID(OIDS.data)),CTX(0,key.cert),SET(signer));
        return {mf:mf,sf:sf,rsa:SEQ(OID(OIDS.signedData),CTX(0,sd))};});});});}

/* ---------- v2, the APK Signing Block ---------- */
function lp(u){var w=new W(4+u.length);w.u32(u.length).bytes(u);return w.out();}
function chunkDigest(sections){var parts=[],CH=1048576;sections.forEach(function(s){for(var i=0;i<s.length;i+=CH){var c=s.subarray(i,Math.min(s.length,i+CH));parts.push(c);}});
  return parts.reduce(function(p,c){return p.then(function(list){var h=new W(5);h.u8(0xa5).u32(c.length);return subtle().digest("SHA-256",cat([h.out(),c])).then(function(d){list.push(new Uint8Array(d));return list;});});},Promise.resolve([]))
    .then(function(list){var h=new W(5);h.u8(0x5a).u32(list.length);return sha256(cat([h.out()].concat(list)));});}
function signV2(z,key){var eocd=z.eocd.slice();var dv=new DataView(eocd.buffer);dv.setUint32(16,z.local.length,true);
  return chunkDigest([z.local,z.cd,eocd]).then(function(digest){var cp=certParts(key.cert),ALG=0x0103,w=new W(16);
    var digests=lp((function(){var x=new W(8+digest.length);x.u32(ALG).bytes(lp(digest));return lp(x.out());})());
    var signedData=cat([digests,lp(lp(key.cert)),lp(new Uint8Array(0))]);
    return importPkcs8(key.pkcs8).then(function(k){return subtle().sign(RSA,k,signedData);}).then(function(sig){
      var one=(function(){var x=new W(8+sig.byteLength);x.u32(ALG).bytes(lp(new Uint8Array(sig)));return lp(x.out());})();
      var signer=lp(cat([lp(signedData),lp(one),lp(cp.spki)])),value=lp(signer);
      var pair=new W(12+value.length);pair.u64(4+value.length).u32(0x7109871a).bytes(value);var pb=pair.out();
      var size=pb.length+8+16,blk=new W(size+8);blk.u64(size).bytes(pb).u64(size).bytes(utf8("APK Sig Block 42"));var block=blk.out();
      var eo=z.eocd.slice();new DataView(eo.buffer).setUint32(16,z.local.length+block.length,true);
      return cat([z.local,block,z.cd,eo]);});});}

/* ---------- the APK ---------- */
function versionCodeNow(){return Math.floor((Date.now()-1735689600000)/60000);}   /* minutes since 1 January 2025, as GitHub's builds of the family count */
function cleanId(id){id=String(id||"").trim();return /^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$/.test(id)&&id.length<=100?id:"";}
function manifest(o){var perms=["android.permission.INTERNET","android.permission.ACCESS_NETWORK_STATE","android.permission.RECORD_AUDIO","android.permission.MODIFY_AUDIO_SETTINGS"];
  var activityName="studio.ingenium.shell.ShellActivity",launch=el("intent-filter",[],[el("action",[an("name","string","android.intent.action.MAIN")]),el("category",[an("name","string","android.intent.category.LAUNCHER")])]);
  var actAttrs=[an("name","string",activityName),an("exported","bool",true),an("configChanges","hex",0x0080|0x0400|0x0020|0x0800|0x0100|0x0010|0x0200),an("windowSoftInputMode","hex",0x10),an("launchMode","int",2),an("resizeableActivity","bool",true)];
  var appKids=[el("activity",actAttrs,o.alias?[]:[launch])];
  if(o.alias)appKids.push(el("activity-alias",[an("name","string",o.alias),an("targetActivity","string",activityName),an("exported","bool",true)],[launch]));
  return el("manifest",[{ns:null,name:"package",type:"string",value:o.id},an("versionCode","int",o.versionCode),an("versionName","string",o.versionName),an("compileSdkVersion","int",34),{ns:null,name:"platformBuildVersionCode",type:"int",value:34}],
    [el("uses-sdk",[an("minSdkVersion","int",22),an("targetSdkVersion","int",34)])].concat(perms.map(function(p){return el("uses-permission",[an("name","string",p)]);}))
    .concat([el("application",[an("theme","ref",THEME_MATERIAL_LIGHT_NOACTIONBAR),an("label","string",o.title),an("icon","ref",ICON_REF),an("allowBackup","bool",!!o.allowBackup),an("hardwareAccelerated","bool",true),an("largeHeap","bool",true),an("supportsRtl","bool",true)],appKids)]));}
function shellDex(){if(root.__ingAndroidShell)return Promise.resolve(root.__ingAndroidShell);var e=typeof document!=="undefined"&&document.getElementById("ing-android-shell");
  if(!e)return Promise.reject(new Error("this build of Ingenium carries no Android shell"));var u=b64d(e.textContent);root.__ingAndroidShell=u;return Promise.resolve(u);}
/* o: {html (text or bytes), page ("the_app.html"), title, id, versionName, versionCode, icons ({mdpi..xxxhdpi: PNG bytes}), background, bridges, alias,
   keyId (a kept key; else the device's own), files ([{path, data}] beside the page in assets/), onStep(text)} */
function makeApk(o){var step=o.onStep||function(){};var id=cleanId(o.id);if(!id)return Promise.reject(new Error("“"+o.id+"” cannot be an Android app id: letters, digits and dots, such as com.yannieforest.myapp"));
  var page=String(o.page||"index.html").replace(/^\/+/,"").replace(/[^\w.\-\/]+/g,"_")||"index.html";if(!/\.html?$/i.test(page))page+=".html";
  var html=typeof o.html==="string"?utf8(o.html):o.html;if(!html||!html.length)return Promise.reject(new Error("there is no page to put in the app"));
  var vc=o.versionCode||versionCodeNow(),vn=String(o.versionName||"1.0").slice(0,60),title=String(o.title||"My app").slice(0,50);
  var bridges=o.bridges||["CarpeNative"];
  step("Writing the manifest");
  return Promise.all([shellDex(),keys.get(o.keyId)]).then(function(x){var dex=x[0],key=x[1];if(!key)throw new Error("the signing key chosen is not on this device");
    var files=[{name:"AndroidManifest.xml",data:axml(manifest({id:id,versionCode:vc,versionName:vn,title:title,alias:o.alias||"",allowBackup:!!o.allowBackup}))},{name:"classes.dex",data:dex},
      {name:"resources.arsc",data:arsc(id),store:true,align:4}];
    DENSITIES.forEach(function(d){var png=o.icons&&o.icons[d[0]];if(!png)throw new Error("the "+d[0]+" icon is missing");files.push({name:iconPath(d),data:png,store:true,align:4});});
    files.push({name:"assets/shell.json",data:utf8(JSON.stringify({page:page,background:o.background||"#ffffff",bridges:bridges,title:title,made:"Ingenium Fabrica"}))});
    (o.files||[]).forEach(function(f){var p=String(f.path).replace(/^\/+/,"");if(!p||p===page||/^shell\.json$/.test(p))return;files.push({name:"assets/"+p,data:typeof f.data==="string"?utf8(f.data):f.data});});
    files.push({name:"assets/"+page,data:html});
    step("Signing it (v1)");
    return signV1(files,key,"Ingenium Fabrica").then(function(v1){var all=[{name:"META-INF/MANIFEST.MF",data:v1.mf},{name:"META-INF/CERT.SF",data:v1.sf},{name:"META-INF/CERT.RSA",data:v1.rsa}].concat(files);
      step("Packing it");return zipBuild(all);}).then(function(z){step("Signing it (v2)");return signV2(z,key);}).then(function(apk){
      return Promise.all([sha256(apk),describe(key)]).then(function(h){return {bytes:apk,size:apk.length,sha256:hex(h[0]),id:id,versionCode:vc,versionName:vn,title:title,key:h[1]};});});});}

/* ---------- the IPA ---------- */
function shellZip(){if(root.__ingIosShell)return Promise.resolve(root.__ingIosShell);var e=typeof document!=="undefined"&&document.getElementById("ing-ios-shell");
  if(!e||!e.textContent.trim())return Promise.reject(new Error("this build of Ingenium carries no iPhone and iPad shell"));var u=b64d(e.textContent);root.__ingIosShell=u;return Promise.resolve(u);}
function xmlEsc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function plistSet(text,key,value){var re=new RegExp("(<key>"+key.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"</key>\\s*<string>)[^<]*(</string>)");
  if(re.test(text))return text.replace(re,function(m,a,b){return a+xmlEsc(value)+b;});
  return text.replace(/<dict>/,"<dict>\n\t<key>"+key+"</key>\n\t<string>"+xmlEsc(value)+"</string>");}
var IOS_ICONS=[["AppIcon60x60@2x.png",120],["AppIcon60x60@3x.png",180],["AppIcon76x76@2x~ipad.png",152],["AppIcon83.5x83.5@2x~ipad.png",167]];
function iosName(title){var n=String(title||"").normalize?String(title).normalize("NFD").replace(/[\u0300-\u036f]/g,""):String(title);n=n.replace(/[^A-Za-z0-9]+/g,"");if(!n||/^[0-9]/.test(n))n="App"+n;return n.slice(0,40);}
/* o: {html, page, title, id, versionName, build, icons ({120,180,152,167: PNG bytes}), bridges, files, shell (zip bytes, else the one in the page), onStep} */
function makeIpa(o){var step=o.onStep||function(){};var id=cleanId(o.id);if(!id)return Promise.reject(new Error("“"+o.id+"” cannot be an app id: letters, digits and dots, such as com.yannieforest.myapp"));
  var page=String(o.page||"index.html").replace(/^\/+/,"").replace(/[^\w.\-\/]+/g,"_")||"index.html";if(!/\.html?$/i.test(page))page+=".html";
  var html=typeof o.html==="string"?utf8(o.html):o.html,title=String(o.title||"My app").slice(0,50),folder=iosName(title)+".app";
  step("Opening the shell");
  return (o.shell?Promise.resolve(o.shell):shellZip()).then(function(z){var list=zipRead(z),out=[],icons={};IOS_ICONS.forEach(function(x){icons[x[0]]=o.icons&&o.icons[x[1]];});
    return list.reduce(function(p,e){return p.then(function(){var m=/^[^\/]+\.app\/(.*)$/.exec(e.name);if(!m)return;var rel=m[1],dest="Payload/"+folder+"/"+rel;
        if(/^www\//.test(rel)&&!e.dir)return;   /* the shell's stand-in page: the app's own goes in its place */
        if(e.dir){out.push({name:dest,dir:true,mode:e.mode||0o40755,madeBy:3});return;}
        if(icons[rel]){out.push({name:dest,data:icons[rel],mode:0o100644,madeBy:3});return;}
        return e.read().then(function(data){
          if(rel==="Info.plist"){var t=TD.decode(data);if(!/^<\?xml/.test(t.trim()))throw new Error("the shell's Info.plist is not text: this shell cannot be filled");
            t=plistSet(t,"CFBundleIdentifier",id);t=plistSet(t,"CFBundleDisplayName",title);t=plistSet(t,"CFBundleName",title.slice(0,15));
            t=plistSet(t,"CFBundleShortVersionString",String(o.versionName||"1.0").replace(/[^0-9.]/g,"")||"1.0");t=plistSet(t,"CFBundleVersion",String(o.build||o.versionName||"1").replace(/[^0-9.]/g,"")||"1");
            t=plistSet(t,"NSMicrophoneUsageDescription",title+" uses the microphone only while you ask it to listen, for dictation or a recording.");
            t=plistSet(t,"NSSpeechRecognitionUsageDescription","Dictation turns your speech into text inside "+title+".");data=utf8(t);}
          out.push({name:dest,data:data,mode:e.mode||0o100644,madeBy:3});});});},Promise.resolve()).then(function(){
      if(!out.some(function(f){return /\.app\/Info\.plist$/.test(f.name);}))throw new Error("the shell has no Info.plist");
      var www="Payload/"+folder+"/www/";if(!out.some(function(f){return f.name===www;}))out.push({name:www,dir:true,mode:0o40755,madeBy:3});
      out.push({name:www+"shell.json",data:utf8(JSON.stringify({page:page,bridges:o.bridges||["CarpeNative"],title:title,made:"Ingenium Fabrica"})),mode:0o100644,madeBy:3});
      (o.files||[]).forEach(function(f){var p=String(f.path).replace(/^\/+/,"");if(!p||p===page||p==="shell.json")return;out.push({name:www+p,data:typeof f.data==="string"?utf8(f.data):f.data,mode:0o100644,madeBy:3});});
      out.push({name:www+page,data:html,mode:0o100644,madeBy:3});
      out.unshift({name:"Payload/",dir:true,mode:0o40755,madeBy:3});
      step("Packing it");return zipBuild(out);});}).then(function(zz){var ipa=cat([zz.local,zz.cd,zz.eocd]);return sha256(ipa).then(function(h){return {bytes:ipa,size:ipa.length,sha256:hex(h),id:id,title:title,folder:folder};});});}

/* ---------- icons, from the app's own: the largest PNG it names as its icon, drawn at each size ---------- */
function iconSource(html){var head=typeof html==="string"?html.slice(0,3000000):TD.decode(html.subarray(0,3000000)),best=null,bestN=0,re=/<link\b[^>]*>/gi,m;
  while((m=re.exec(head))){var tag=m[0];if(!/rel=["'](?:icon|apple-touch-icon|shortcut icon)["']/i.test(tag))continue;var h=/href=["'](data:image\/(?:png|jpeg|webp);base64,[^"']+)["']/i.exec(tag);if(!h)continue;
    var sz=/sizes=["'](\d+)x\d+["']/i.exec(tag),n=sz?parseInt(sz[1],10):64;if(/media=["'][^"']*dark/i.test(tag))n-=1;if(n>bestN){bestN=n;best=h[1];}}
  return best;}
function drawIcons(src,sizes,onWhite){if(typeof document==="undefined")return Promise.reject(new Error("icons are drawn in a window"));
  return new Promise(function(res,rej){var im=new Image();im.onload=function(){res(im);};im.onerror=function(){rej(new Error("the app's icon could not be read"));};im.src=src;}).then(function(im){
    return Promise.all(sizes.map(function(z){var c=document.createElement("canvas");c.width=z;c.height=z;var x=c.getContext("2d");x.imageSmoothingEnabled=true;try{x.imageSmoothingQuality="high";}catch(e){}
      if(onWhite){var D=discOf(im);x.fillStyle=D.rim;x.fillRect(0,0,z,z);var inner=Math.round(z*0.985),off=Math.round((z-inner)/2);x.drawImage(im,D.x,D.y,D.w,D.h,off,off,inner,inner);}else x.drawImage(im,0,0,z,z);
      return new Promise(function(r2){c.toBlob(function(b){b.arrayBuffer().then(function(ab){r2(new Uint8Array(ab));});},"image/png");});}));});}
/* 6.1 · an iPhone and iPad icon fills its square: iOS cuts every icon to its rounded square and shows no transparency, so a
   round seal drawn small on white looked like a miniature in a grey square (the owner's words, 20 October 2026: "it changes to
   this miniature icon inside of a grey square that I despise"). The seal's own disc (its solid part, a soft shadow left out)
   is drawn as large as the square allows, on the colour of its outer ring; a square icon stays as it is. */
function discOf(im){var W=im.naturalWidth||im.width,H=im.naturalHeight||im.height,N=256,c=document.createElement("canvas");c.width=N;c.height=N;var x=c.getContext("2d");x.drawImage(im,0,0,N,N);
  var d;try{d=x.getImageData(0,0,N,N).data;}catch(e){return {x:0,y:0,w:W,h:H,rim:"#ffffff"};}
  var x0=N,y0=N,x1=-1,y1=-1,X,Y;for(Y=0;Y<N;Y++)for(X=0;X<N;X++)if(d[(Y*N+X)*4+3]>200){if(X<x0)x0=X;if(X>x1)x1=X;if(Y<y0)y0=Y;if(Y>y1)y1=Y;}
  if(x1<0)return {x:0,y:0,w:W,h:H,rim:"#ffffff"};
  var side=Math.max(x1-x0+1,y1-y0+1),cx=(x0+x1+1)/2,cy=(y1-y0)>(x1-x0)?y0+side/2:(y0+y1+1)/2,row=Math.round(cy);
  function first(from,to,step){for(var i=from;i!==to;i+=step){var k=(Math.min(N-1,Math.max(0,row))*N+i)*4;if(d[k+3]>230)return [d[k],d[k+1],d[k+2]];}return [255,255,255];}
  var l=first(0,N,1),r=first(N-1,-1,-1),rim="rgb("+[0,1,2].map(function(i){return Math.round((l[i]+r[i])/2);}).join(",")+")";
  var f=W/N;return {x:Math.max(0,(cx-side/2)*f),y:Math.max(0,(cy-side/2)*f),w:Math.min(W,side*f),h:Math.min(H,side*f),rim:rim};}
/* a seal of letters on the app's colour, for an app that names no icon */
function letterIcon(title,colour){if(typeof document==="undefined")return null;var c=document.createElement("canvas");c.width=512;c.height=512;var x=c.getContext("2d");
  x.fillStyle=colour||"#6a3fb5";x.beginPath();x.arc(256,256,240,0,Math.PI*2);x.fill();x.fillStyle="#fff";x.font="600 220px Georgia,serif";x.textAlign="center";x.textBaseline="middle";
  var w=String(title||"A").replace(/[^A-Za-z0-9 ]/g,"").split(/\s+/).filter(Boolean);x.fillText(((w[0]||"A")[0]+((w[1]||"")[0]||"")).toUpperCase(),256,268);return c.toDataURL("image/png");}
function iconsFor(html,title,colour,fallback){var src=iconSource(html)||fallback||letterIcon(title,colour);
  return Promise.all([drawIcons(src,DENSITIES.map(function(d){return d[2];}),false),drawIcons(src,IOS_ICONS.map(function(x){return x[1];}),true)]).then(function(x){
    var a={},i={};DENSITIES.forEach(function(d,k){a[d[0]]=x[0][k];});IOS_ICONS.forEach(function(d,k){i[d[1]]=x[1][k];});return {android:a,ios:i,source:src};});}

root.IngApk={make:makeApk,keys:keys,versionCodeNow:versionCodeNow,cleanId:cleanId,iconsFor:iconsFor,iconSource:iconSource,
  core:{axml:axml,arsc:arsc,manifest:manifest,zipBuild:zipBuild,zipRead:zipRead,signV1:signV1,signV2:signV2,readP12:readP12,writeP12:writeP12,makeKeyPair:makeKeyPair,certParts:certParts,
    crc32:crc32,sha256:sha256,hex:hex,b64e:b64e,b64d:b64d,DENSITIES:DENSITIES}};
root.IngIpa={make:makeIpa,iosName:iosName,icons:IOS_ICONS,has:function(){if(root.__ingIosShell)return true;var e=typeof document!=="undefined"&&document.getElementById("ing-ios-shell");return !!(e&&e.textContent.trim());}};
})(typeof window!=="undefined"?window:globalThis);
;try{window.__ingParts["p57"]="running";}catch(_){}
</script>
