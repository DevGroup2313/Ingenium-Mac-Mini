<script>try{(window.__ingParts=window.__ingParts||{})["p42"]="started";}catch(_){}
/* R110 · HER REPOSITORIES, KEPT ON THE DEVICE
   Her word: "I want Ingenium to be my own offline GitHub ... I want for Github to be optional because Ingenium is
   fully capable of completing these tasks with no dependencies inside of the app." This is the engine under it: each
   app is a repository of real git objects (the same blob, tree, commit and tag bytes, under the same SHA-1 names, as
   git makes), with branches, tags, a working copy matched by its full path (pictures, keys and other binary files
   included), the changes since the last commit, a diff, a three-way merge, a revert, and a history that is never
   written over. A repository goes out as a folder any git opens (its .git inside), as a single bundle file any git
   clones (one file with the whole history), or as a zip of its files, as GitHub's own "Download ZIP" makes; and it
   comes in from any of those. Nothing here needs a connection. Each version of a large file is kept as the change
   from the version before it, so a 15 MB page committed twenty times costs little more than one copy. */
var IngRepo=(function(){
"use strict";
var te=new TextEncoder(),td=new TextDecoder();
function enc(s){return te.encode(String(s));}
function dec(u8){return td.decode(u8);}
function hex(u8){var s="";for(var i=0;i<u8.length;i++)s+=(u8[i]<16?"0":"")+u8[i].toString(16);return s;}
function unhex(h){var o=new Uint8Array(h.length>>1);for(var i=0;i<o.length;i++)o[i]=parseInt(h.substr(i*2,2),16);return o;}
function cat(arr){var n=0,i;for(i=0;i<arr.length;i++)n+=arr[i].length;var o=new Uint8Array(n),p=0;for(i=0;i<arr.length;i++){o.set(arr[i],p);p+=arr[i].length;}return o;}
function u8of(x){if(x instanceof Uint8Array)return x;if(typeof x==="string")return enc(x);if(x instanceof ArrayBuffer)return new Uint8Array(x);if(x&&x.buffer instanceof ArrayBuffer)return new Uint8Array(x.buffer,x.byteOffset,x.byteLength);return new Uint8Array(0);}
function same(a,b){if(a.length!==b.length)return false;for(var i=0;i<a.length;i++)if(a[i]!==b[i])return false;return true;}

/* ---------- SHA-1: the browser's own where it has one, else the same sum here ---------- */
function sha1JS(u8){var H=[0x67452301,0xEFCDAB89,0x98BADCFE,0x10325476,0xC3D2E1F0],W=new Int32Array(80),len=u8.length,i,t;
  function block(b,off){for(i=0;i<16;i++){var j=off+i*4;W[i]=(b[j]<<24)|(b[j+1]<<16)|(b[j+2]<<8)|b[j+3];}
    for(i=16;i<80;i++){t=W[i-3]^W[i-8]^W[i-14]^W[i-16];W[i]=(t<<1)|(t>>>31);}
    var a=H[0],b2=H[1],c=H[2],d=H[3],e=H[4],f,k;
    for(i=0;i<80;i++){if(i<20){f=(b2&c)|(~b2&d);k=0x5A827999;}else if(i<40){f=b2^c^d;k=0x6ED9EBA1;}else if(i<60){f=(b2&c)|(b2&d)|(c&d);k=0x8F1BBCDC;}else{f=b2^c^d;k=0xCA62C1D6;}
      t=(((a<<5)|(a>>>27))+f+e+k+W[i])|0;e=d;d=c;c=(b2<<30)|(b2>>>2);b2=a;a=t;}
    H[0]=(H[0]+a)|0;H[1]=(H[1]+b2)|0;H[2]=(H[2]+c)|0;H[3]=(H[3]+d)|0;H[4]=(H[4]+e)|0;}
  var full=len-(len%64);for(var off=0;off<full;off+=64)block(u8,off);
  var rest=len-full,tl=rest<56?64:128,tb=new Uint8Array(tl);tb.set(u8.subarray(full));tb[rest]=0x80;
  var hi=Math.floor(len/536870912),lo=(len*8)>>>0;tb[tl-8]=hi>>>24;tb[tl-7]=hi>>>16;tb[tl-6]=hi>>>8;tb[tl-5]=hi;tb[tl-4]=lo>>>24;tb[tl-3]=lo>>>16;tb[tl-2]=lo>>>8;tb[tl-1]=lo;
  block(tb,0);if(tl===128)block(tb,64);
  var s="";for(i=0;i<5;i++)s+=("0000000"+(H[i]>>>0).toString(16)).slice(-8);return s;}
var subtleOK=null;
function sha1(u8){
  if(subtleOK!==false){try{if(typeof crypto!=="undefined"&&crypto.subtle&&crypto.subtle.digest){
    return crypto.subtle.digest("SHA-1",u8).then(function(b){subtleOK=true;return hex(new Uint8Array(b));},function(){subtleOK=false;return sha1JS(u8);});}}catch(e){}
    subtleOK=false;}
  return Promise.resolve(sha1JS(u8));}

/* ---------- zlib: inflate here (and say where the stream ended, as a pack needs), deflate by the browser ---------- */
var LB=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258],LE=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];
var DB=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],DE=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
var CLO=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
function table(lens,n){var max=0,i;for(i=0;i<n;i++)if(lens[i]>max)max=lens[i];if(!max)return {bits:1,t:new Int32Array(2)};
  var cnt=new Uint16Array(16),next=new Uint16Array(16),code=0,b;for(i=0;i<n;i++)cnt[lens[i]]++;cnt[0]=0;
  for(b=1;b<=15;b++){code=(code+cnt[b-1])<<1;next[b]=code;}
  var size=1<<max,t=new Int32Array(size);
  for(var s=0;s<n;s++){var l=lens[s];if(!l)continue;var c=next[l]++,r=0;for(var k=0;k<l;k++){r=(r<<1)|(c&1);c>>=1;}
    for(var j=r;j<size;j+=(1<<l))t[j]=(s<<4)|l;}
  return {bits:max,t:t};}
var FIXL=null,FIXD=null;
function fixed(){if(FIXL)return;var l=new Uint8Array(288),i;for(i=0;i<144;i++)l[i]=8;for(;i<256;i++)l[i]=9;for(;i<280;i++)l[i]=7;for(;i<288;i++)l[i]=8;
  FIXL=table(l,288);var d=new Uint8Array(30);for(i=0;i<30;i++)d[i]=5;FIXD=table(d,30);}
/* raw deflate from src[pos]; size: the expected length when known. Returns {data, end} */
function inflateRaw(src,pos,size){var bb=0,bc=0,p=pos||0,n=src.length;
  var out=new Uint8Array(size>0?size:Math.max(1024,(n-p)*4)),o=0;
  function need(k){while(bc<k){bb|=(p<n?src[p]:0)<<bc;p++;bc+=8;}}
  function bits(k){need(k);var v=bb&((1<<k)-1);bb>>>=k;bc-=k;return v;}
  function room(k){if(o+k<=out.length)return;var m=new Uint8Array(Math.max(out.length*2,o+k));m.set(out.subarray(0,o));out=m;}
  function sym(h){need(h.bits);var e=h.t[bb&((1<<h.bits)-1)],l=e&15;if(!l)throw new Error("bad deflate data");bb>>>=l;bc-=l;return e>>4;}
  var last=0;
  do{last=bits(1);var type=bits(2);
    if(type===0){var skip=bc&7;bb>>>=skip;bc-=skip;var len=bits(16),nl=bits(16);if((len^0xffff)!==nl)throw new Error("bad stored block");
      /* what the bit buffer still holds are whole bytes read ahead: step back to them */
      p-=bc>>3;bb=0;bc=0;if(p+len>n)throw new Error("deflate data cut short");room(len);out.set(src.subarray(p,p+len),o);o+=len;p+=len;continue;}
    var L,D;
    if(type===1){fixed();L=FIXL;D=FIXD;}
    else if(type===2){var hl=bits(5)+257,hd=bits(5)+1,hc=bits(4)+4,cl=new Uint8Array(19),i;
      for(i=0;i<hc;i++)cl[CLO[i]]=bits(3);var C=table(cl,19),ls=new Uint8Array(hl+hd);
      for(i=0;i<hl+hd;){var s=sym(C);if(s<16)ls[i++]=s;else{var rep,v=0;if(s===16){if(!i)throw new Error("bad lengths");v=ls[i-1];rep=3+bits(2);}else if(s===17)rep=3+bits(3);else rep=11+bits(7);
        if(i+rep>hl+hd)throw new Error("bad lengths");while(rep--)ls[i++]=v;}}
      L=table(ls.subarray(0,hl),hl);D=table(ls.subarray(hl),hd);}
    else throw new Error("bad deflate block");
    for(;;){var x=sym(L);
      if(x<256){if(o>=out.length)room(1);out[o++]=x;}
      else if(x===256)break;
      else{x-=257;if(x>=29)throw new Error("bad length");var ln=LB[x]+bits(LE[x]),dc=sym(D);if(dc>=30)throw new Error("bad distance");var ds=DB[dc]+bits(DE[dc]);
        if(ds>o)throw new Error("distance too far");room(ln);for(var q=0;q<ln;q++){out[o]=out[o-ds];o++;}}}
  }while(!last);
  var end=p-(bc>>3);if(end>n)throw new Error("deflate data cut short");
  return {data:o===out.length?out:out.subarray(0,o),end:end};}
function adler(u8){var a=1,b=0,n=u8.length,i=0;while(i<n){var m=Math.min(n,i+3800);for(;i<m;i++){a+=u8[i];b+=a;}a%=65521;b%=65521;}return ((b<<16)|a)>>>0;}
/* zlib (RFC 1950): what git keeps each object in */
function inflateZ(src,pos,size){pos=pos||0;if((src[pos]&15)!==8||((src[pos]<<8)|src[pos+1])%31)throw new Error("not zlib data");
  if(src[pos+1]&32)throw new Error("zlib dictionary");var r=inflateRaw(src,pos+2,size);r.end+=4;if(r.end>src.length)throw new Error("zlib data cut short");return r;}
function storedZ(u8){var parts=[new Uint8Array([0x78,0x01])],off=0;
  do{var k=Math.min(65535,u8.length-off),lst=off+k>=u8.length,h=new Uint8Array(5);h[0]=lst?1:0;h[1]=k&255;h[2]=k>>8;h[3]=(~k)&255;h[4]=((~k)>>8)&255;parts.push(h,u8.subarray(off,off+k));off+=k;}while(off<u8.length);
  var a=adler(u8);parts.push(new Uint8Array([a>>>24,(a>>>16)&255,(a>>>8)&255,a&255]));return cat(parts);}
function canCS(){try{if(typeof CompressionStream!=="function")return false;new CompressionStream("deflate-raw");return true;}catch(e){return false;}}
function stream(u8,ts){return new Response(new Blob([u8]).stream().pipeThrough(ts)).arrayBuffer().then(function(b){return new Uint8Array(b);});}
/* zlib, as git writes it: the browser's deflate where it has one, else stored blocks (git reads both) */
function deflateZ(u8){if(u8.length>64&&canCS()){try{return stream(u8,new CompressionStream("deflate")).catch(function(){return storedZ(u8);});}catch(e){}}return Promise.resolve(storedZ(u8));}
function inflateZB(z,n){try{if(typeof DecompressionStream==="function")return stream(z,new DecompressionStream("deflate")).catch(function(){return inflateZ(z,0,n).data;});}catch(e){}
  return Promise.resolve().then(function(){return inflateZ(z,0,n).data;});}
/* raw deflate for a zip; null when the browser has none (the entry is then stored) */
function deflateRaw(u8){if(u8.length>64&&canCS()){try{return stream(u8,new CompressionStream("deflate-raw")).catch(function(){return null;});}catch(e){}}return Promise.resolve(null);}

/* ---------- git's objects ---------- */
var TYPES=["","commit","tree","blob","tag"],TNUM={commit:1,tree:2,blob:3,tag:4};
function raw(type,body){return cat([enc(type+" "+body.length+"\0"),body]);}
function oidOf(type,body){return sha1(raw(type,body));}
function treeSortKey(e){return e.mode==="40000"?e.name+"/":e.name;}
function cmpBytes(a,b){var n=Math.min(a.length,b.length);for(var i=0;i<n;i++)if(a[i]!==b[i])return a[i]-b[i];return a.length-b.length;}
function treeBody(ents){ents=ents.slice().sort(function(a,b){return cmpBytes(enc(treeSortKey(a)),enc(treeSortKey(b)));});
  return cat(ents.map(function(e){return cat([enc(e.mode+" "+e.name+"\0"),unhex(e.oid)]);}));}
function parseTree(b){var out=[],p=0;while(p<b.length){var sp=b.indexOf(32,p),nul=b.indexOf(0,sp);if(sp<0||nul<0)throw new Error("broken tree");
  out.push({mode:dec(b.subarray(p,sp)),name:dec(b.subarray(sp+1,nul)),oid:hex(b.subarray(nul+1,nul+21))});p=nul+21;}return out;}
function ident(who,when,tz){return String(who.name||"Unknown").replace(/[<>\n]/g,"")+" <"+String(who.email||"").replace(/[<>\n\s]/g,"")+"> "+when+" "+tz;}
function tzOf(d){var m=-d.getTimezoneOffset(),s=m>=0?"+":"-";m=Math.abs(m);return s+("0"+Math.floor(m/60)).slice(-2)+("0"+(m%60)).slice(-2);}
function commitBody(c){var s="tree "+c.tree+"\n";(c.parents||[]).forEach(function(p){s+="parent "+p+"\n";});
  s+="author "+c.author+"\ncommitter "+(c.committer||c.author)+"\n\n"+c.msg;return enc(s);}
function parseIdent(s){var m=/^(.*) <([^>]*)> (\d+) ([+-]\d{4})$/.exec(s||"");return m?{name:m[1],email:m[2],when:+m[3],tz:m[4]}:{name:s||"",email:"",when:0,tz:"+0000"};}
function parseCommit(b){var s=dec(b),i=s.indexOf("\n\n"),head=i<0?s:s.slice(0,i),msg=i<0?"":s.slice(i+2),c={tree:"",parents:[],msg:msg};
  head.split("\n").forEach(function(l){var k=l.indexOf(" "),key=l.slice(0,k),v=l.slice(k+1);if(key==="tree")c.tree=v;else if(key==="parent")c.parents.push(v);else if(key==="author")c.author=parseIdent(v);else if(key==="committer")c.committer=parseIdent(v);});
  return c;}
function parseTag(b){var s=dec(b),i=s.indexOf("\n\n"),head=i<0?s:s.slice(0,i),t={msg:i<0?"":s.slice(i+2)};
  head.split("\n").forEach(function(l){var k=l.indexOf(" "),key=l.slice(0,k),v=l.slice(k+1);if(key==="object")t.object=v;else if(key==="type")t.type=v;else if(key==="tag")t.tag=v;else if(key==="tagger")t.tagger=parseIdent(v);});return t;}
function isBinary(u8){var n=Math.min(u8.length,8000);for(var i=0;i<n;i++)if(u8[i]===0)return true;return false;}

/* ---------- a change from one version to the next: git's delta form (copy from the old, or add new bytes) ---------- */
function varint(n){var o=[];do{var b=n&127;n=Math.floor(n/128);if(n)b|=128;o.push(b);}while(n);return o;}
var WIN=16,RB=0x01000193,RBW=(function(){var x=1;for(var i=0;i<WIN-1;i++)x=Math.imul(x,RB);return x>>>0;})();
function makeDelta(base,target){
  var parts=[new Uint8Array(varint(base.length).concat(varint(target.length)))],ins=[],insN=0,total=parts[0].length;
  function flushIns(from,to){while(from<to){var k=Math.min(127,to-from);parts.push(new Uint8Array([k]),target.subarray(from,from+k));total+=k+1;from+=k;}}
  function copy(off,len){while(len>0){var k=Math.min(len,0xffffff),b=[0x80],x;
      for(x=0;x<4;x++){var v=(off>>>(8*x))&255;if(v){b[0]|=1<<x;b.push(v);}}
      for(x=0;x<3;x++){var w=(k>>>(8*x))&255;if(w){b[0]|=0x10<<x;b.push(w);}}
      parts.push(new Uint8Array(b));total+=b.length;off+=k;len-=k;}}
  if(base.length<WIN||target.length<WIN){flushIns(0,target.length);return cat(parts);}
  /* every 16th window of the old version, by its rolling hash, in a table of its own */
  var cap=1;while(cap<(base.length/WIN)*2+16)cap<<=1;var mask=cap-1,keys=new Int32Array(cap),vals=new Int32Array(cap).fill(-1),h=0,i,slot;
  function find(hv){var k=hv|0,j=(k^(k>>>15))&mask;while(vals[j]!==-1){if(keys[j]===k)return vals[j];j=(j+1)&mask;}return -1;}
  for(i=0;i<WIN;i++)h=(Math.imul(h,RB)+base[i])>>>0;
  for(i=0;;i++){if(i%WIN===0){var k0=h|0;slot=(k0^(k0>>>15))&mask;while(vals[slot]!==-1&&keys[slot]!==k0)slot=(slot+1)&mask;if(vals[slot]===-1){keys[slot]=k0;vals[slot]=i;}}
    if(i+WIN>=base.length)break;h=(Math.imul((h-Math.imul(base[i],RBW))>>>0,RB)+base[i+WIN])>>>0;}
  var t=0,lit=0,n=target.length;h=0;for(i=0;i<WIN;i++)h=(Math.imul(h,RB)+target[i])>>>0;
  while(t+WIN<=n){var at=find(h),len=0;
    if(at>=0){while(at+len<base.length&&t+len<n&&base[at+len]===target[t+len])len++;}
    if(len>=WIN){/* reach back into the bytes not yet written */
      var back=0;while(back<t-lit&&at-back>0&&base[at-back-1]===target[t-back-1])back++;
      flushIns(lit,t-back);copy(at-back,len+back);t+=len;lit=t;
      if(t+WIN<=n){h=0;for(i=0;i<WIN;i++)h=(Math.imul(h,RB)+target[t+i])>>>0;}
      if(total>target.length)return null;continue;}
    if(t+WIN<n)h=(Math.imul((h-Math.imul(target[t],RBW))>>>0,RB)+target[t+WIN])>>>0;t++;}
  flushIns(lit,n);var d=cat(parts);return d.length<target.length?d:null;}
function applyDelta(base,d){var p=0;function vi(){var r=0,s=1,b;do{b=d[p++];r+=(b&127)*s;s*=128;}while(b&128);return r;}
  var bs=vi(),ts=vi();if(bs!==base.length)throw new Error("delta does not fit its base");var out=new Uint8Array(ts),o=0;
  while(p<d.length){var c=d[p++];
    if(c&128){var off=0,sz=0,k;for(k=0;k<4;k++)if(c&(1<<k))off+=d[p++]*Math.pow(256,k);for(k=0;k<3;k++)if(c&(16<<k))sz|=d[p++]<<(8*k);if(!sz)sz=0x10000;
      if(off+sz>base.length||o+sz>ts)throw new Error("delta reaches past its base");out.set(base.subarray(off,off+sz),o);o+=sz;}
    else if(c){if(o+c>ts)throw new Error("delta too long");out.set(d.subarray(p,p+c),o);o+=c;p+=c;}else throw new Error("bad delta");}
  if(o!==ts)throw new Error("delta size");return out;}

/* ---------- where the objects live: this device's own store; each object once, under its git name ---------- */
var MAXDEPTH=24;
function Store(backend){this.be=backend;this.cache=new Map();this.cacheBytes=0;this.pending=new Map();}
Store.prototype._remember=function(oid,o){if(o.b.length>48*1048576)return;if(this.cache.has(oid))return;this.cache.set(oid,o);this.cacheBytes+=o.b.length;
  while(this.cacheBytes>96*1048576&&this.cache.size>1){var k=this.cache.keys().next().value;this.cacheBytes-=this.cache.get(k).b.length;this.cache.delete(k);}};
Store.prototype.has=function(oid){if(this.cache.has(oid)||this.pending.has(oid))return Promise.resolve(true);return this.be.getRec(oid).then(function(r){return !!r;});};
/* {type, body} or null */
Store.prototype.get=function(oid){var me=this;if(me.cache.has(oid)){var c=me.cache.get(oid);me.cache.delete(oid);me.cache.set(oid,c);return Promise.resolve({type:c.t,body:c.b});}
  if(me.pending.has(oid))return me.pending.get(oid).then(function(){return me.get(oid);});
  return me.be.getRec(oid).then(function(r){if(!r)return null;return me._decode(oid,r).then(function(b){me._remember(oid,{t:r.t,b:b});return {type:r.t,body:b};});});};
Store.prototype._decode=function(oid,r){var me=this;
  var body=r.z?inflateZB(r.b,r.base?0:r.n):Promise.resolve(r.b);
  if(!r.base)return body;
  return Promise.all([body,me.get(r.base)]).then(function(x){if(!x[1])throw new Error("a version this one is kept against is missing");return applyDelta(x[1].body,x[0]);});};
Store.prototype.size=function(oid){if(this.cache.has(oid))return Promise.resolve(this.cache.get(oid).b.length);return this.be.getRec(oid).then(function(r){return r?r.n:null;});};
Store.prototype.depth=function(oid){var me=this;return me.be.getRec(oid).then(function(r){return r?(r.d||0):0;});};
/* keep an object; hint: an object it is likely a new version of (kept as the change from it);
   delta: that change already made (a pack's own), taken as it is */
Store.prototype.put=function(type,body,hint,delta){var me=this;body=u8of(body);
  return oidOf(type,body).then(function(oid){if(me.cache.has(oid))return oid;if(me.pending.has(oid))return me.pending.get(oid).then(function(){return oid;});
    var job=me.be.getRec(oid).then(function(r){if(r)return;
      var try1=(hint&&hint!==oid&&body.length>=512)?me.be.getRec(hint).then(function(hr){if(!hr||hr.t!==type||(hr.d||0)>=MAXDEPTH)return null;
          if(delta&&delta.length<=body.length*0.6)return {t:type,n:body.length,base:hint,d:(hr.d||0)+1,b:delta};
          return me.get(hint).then(function(h){if(!h)return null;var d=makeDelta(h.body,body);if(!d||d.length>body.length*0.6)return null;return {t:type,n:body.length,base:hint,d:(hr.d||0)+1,b:d};});}).catch(function(){return null;}):Promise.resolve(null);
      return try1.then(function(rec){if(rec){if(rec.b.length>=4096&&canCS())return deflateZ(rec.b).then(function(z){if(z.length<rec.b.length*0.9){rec.b=z;rec.z=1;}return rec;});return rec;}
        if(body.length>=4096&&canCS())return deflateZ(body).then(function(z){return z.length<body.length*0.9?{t:type,n:body.length,z:1,b:z}:{t:type,n:body.length,b:body};});
        return {t:type,n:body.length,b:body};}).then(function(rec){return me.be.putRec(oid,rec).then(function(){if(me.onPut)me.onPut(oid);});});});
    me.pending.set(oid,job);me._remember(oid,{t:type,b:body});
    return job.then(function(){me.pending.delete(oid);return oid;},function(e){me.pending.delete(oid);me.cache.delete(oid);throw e;});});};
Store.prototype.need=function(oid,type){return this.get(oid).then(function(o){if(!o)throw new Error("missing "+(type||"object")+" "+String(oid).slice(0,7));if(type&&o.type!==type)throw new Error(String(oid).slice(0,7)+" is a "+o.type+", not a "+type);return o;});};

/* IndexedDB: "ingenium_repos" — o: objects by name; r: each repository's own record (its refs and working copy) */
function IdbBackend(){var dbp=null;
  function db(){if(dbp)return dbp;dbp=new Promise(function(res,rej){try{var rq=indexedDB.open("ingenium_repos",1);
      rq.onupgradeneeded=function(){var d=rq.result;try{d.createObjectStore("o");}catch(e){}try{d.createObjectStore("r");}catch(e){}};
      rq.onsuccess=function(){res(rq.result);};rq.onerror=function(){rej(rq.error||new Error("this device will not keep repositories"));};}catch(e){rej(e);}});
    dbp.catch(function(){dbp=null;});return dbp;}
  function tx(st,mode,fn){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction(st,mode),r=fn(t.objectStore(st));
    t.oncomplete=function(){res(r&&"result" in r?r.result:undefined);};t.onerror=function(){rej(t.error);};t.onabort=function(){rej(t.error||new Error("the device's storage is full"));};});});}
  return {getRec:function(oid){return tx("o","readonly",function(s){return s.get(oid);}).then(function(r){return r||null;});},
    putRec:function(oid,rec){return tx("o","readwrite",function(s){return s.put(rec,oid);});},
    delRec:function(oid){return tx("o","readwrite",function(s){return s.delete(oid);});},
    eachRec:function(fn){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction("o","readonly"),c=t.objectStore("o").openCursor();
      c.onsuccess=function(){var cur=c.result;if(cur){fn(cur.key,cur.value);cur.continue();}};t.oncomplete=function(){res();};t.onerror=function(){rej(t.error);};});});},
    getRepo:function(id){return tx("r","readonly",function(s){return s.get(id);}).then(function(r){return r||null;});},
    putRepo:function(rec){return tx("r","readwrite",function(s){return s.put(rec,rec.id);});},
    delRepo:function(id){return tx("r","readwrite",function(s){return s.delete(id);});},
    allRepos:function(){return tx("r","readonly",function(s){return s.getAll();}).then(function(a){return a||[];});}};}
function MemBackend(){var o=new Map(),r=new Map();function cp(x){return x==null?null:JSON.parse(JSON.stringify(x));}
  return {getRec:function(k){return Promise.resolve(o.get(k)||null);},putRec:function(k,v){o.set(k,v);return Promise.resolve();},delRec:function(k){o.delete(k);return Promise.resolve();},
    eachRec:function(fn){o.forEach(function(v,k){fn(k,v);});return Promise.resolve();},
    getRepo:function(id){return Promise.resolve(cp(r.get(id)));},putRepo:function(x){r.set(x.id,cp(x));return Promise.resolve();},delRepo:function(id){r.delete(id);return Promise.resolve();},
    allRepos:function(){return Promise.resolve(Array.from(r.values()).map(cp));},_objects:o};}

/* ---------- names: a path inside a repository, a branch or a tag ---------- */
function cleanPath(p){p=String(p||"").replace(/\\/g,"/").replace(/^\.\/+/,"").replace(/^\/+/,"");
  var parts=p.split("/").filter(function(x){return x&&x!==".";});
  if(!parts.length)throw new Error("a file needs a name");
  parts.forEach(function(x){if(x===".."||x.toLowerCase()===".git")throw new Error("“"+p+"” is not a name a repository can keep");if(/[\0\n\r]/.test(x))throw new Error("a file name cannot hold a line break");});
  return parts.join("/");}
function okRefName(n){n=String(n||"");return n.length>0&&n.length<=200&&!/(^|\/)\.|\.\.|\/\/|^\/|\/$|\.lock(\/|$)|@\{|[\0-\x20~^:?*\[\\\x7f]|^-|^@$|\.$/.test(n);}
function execByName(p){var b=p.split("/").pop();return b==="gradlew"||/\.(sh|command|bash|zsh)$/i.test(b);}

/* ---------- reading a commit's whole tree as a flat list of paths ---------- */
function flatten(store,treeOid,prefix,out){out=out||{};prefix=prefix||"";
  return store.need(treeOid,"tree").then(function(t){var ents=parseTree(t.body),chain=Promise.resolve();
    ents.forEach(function(e){var p=prefix+e.name;if(e.mode==="40000"||e.mode==="040000")chain=chain.then(function(){return flatten(store,e.oid,p+"/",out);});
      else if(e.mode!=="160000")out[p]=[e.mode==="100664"?"100644":e.mode,e.oid];});
    return chain.then(function(){return out;});});}
/* paths -> trees, each kept; returns the root tree's name */
function writeTrees(store,files){var root={d:{},f:[]};
  Object.keys(files).forEach(function(p){var parts=p.split("/"),d=root;
    for(var i=0;i<parts.length-1;i++){d=d.d[parts[i]]||(d.d[parts[i]]={d:{},f:[]});}
    d.f.push({mode:files[p][0],name:parts[parts.length-1],oid:files[p][1]});});
  function walk(d){var names=Object.keys(d.d);return Promise.all(names.map(function(n){return walk(d.d[n]);})).then(function(oids){
      var ents=d.f.slice();names.forEach(function(n,i){ents.push({mode:"40000",name:n,oid:oids[i]});});
      return store.put("tree",treeBody(ents));});}
  return walk(root);}

/* ---------- lines: the differences between two texts, as git shows them ---------- */
function splitLines(s){if(!s)return [];var a=s.split("\n");if(a[a.length-1]==="")a.pop();return a;}
/* the edit script between line lists a and b: [{a0,a1,b0,b1}] regions where a[a0..a1) became b[b0..b1) */
function lineDiff(a,b){var regions=[];
  function rec(a0,a1,b0,b1){while(a0<a1&&b0<b1&&a[a0]===b[b0]){a0++;b0++;}while(a1>a0&&b1>b0&&a[a1-1]===b[b1-1]){a1--;b1--;}
    if(a0===a1&&b0===b1)return;if(a0===a1||b0===b1){regions.push({a0:a0,a1:a1,b0:b0,b1:b1});return;}
    var N=a1-a0,M=b1-b0;
    if(N*M>4e6){/* large: lines found once in each side hold the two together (patience), and the gaps between are compared alone */
      var ca=new Map(),cb=new Map(),i;for(i=a0;i<a1;i++){var x=ca.get(a[i]);ca.set(a[i],x===undefined?i:-1);}for(i=b0;i<b1;i++){var y=cb.get(b[i]);cb.set(b[i],y===undefined?i:-1);}
      var pairs=[];for(i=b0;i<b1;i++){var ia=ca.get(b[i]);if(ia!==undefined&&ia>=0&&cb.get(b[i])===i)pairs.push([ia,i]);}
      pairs.sort(function(p,q){return p[0]-q[0];});
      var tails=[],prev=new Int32Array(pairs.length);for(i=0;i<pairs.length;i++){var lo=0,hi=tails.length;while(lo<hi){var mid=(lo+hi)>>1;if(pairs[tails[mid]][1]<pairs[i][1])lo=mid+1;else hi=mid;}
        prev[i]=lo>0?tails[lo-1]:-1;tails[lo]=i;}
      var lis=[];for(var k=tails.length?tails[tails.length-1]:-1;k>=0;k=prev[k])lis.unshift(pairs[k]);
      if(lis.length){var pa=a0,pb=b0;lis.forEach(function(pr){rec(pa,pr[0],pb,pr[1]);pa=pr[0]+1;pb=pr[1]+1;});rec(pa,a1,pb,b1);return;}
      if(N*M>6e7){regions.push({a0:a0,a1:a1,b0:b0,b1:b1});return;}}
    /* Myers: the shortest edit script (past 2,500 steps, the rest is shown as one change) */
    var max=N+M,off=max+1,V=new Int32Array(2*max+3),trace=[],D,kk,xx,yy,found=false;
    for(D=0;D<=max&&!found;D++){if(D>2500){regions.push({a0:a0,a1:a1,b0:b0,b1:b1});return;}
      trace.push(V.slice(off-D-1,off+D+2));
      for(kk=-D;kk<=D;kk+=2){if(kk===-D||(kk!==D&&V[off+kk-1]<V[off+kk+1]))xx=V[off+kk+1];else xx=V[off+kk-1]+1;yy=xx-kk;
        while(xx<N&&yy<M&&a[a0+xx]===b[b0+yy]){xx++;yy++;}V[off+kk]=xx;if(xx>=N&&yy>=M){found=true;break;}}}
    var ops=[],X=N,Y=M;
    for(var d=trace.length-1;d>0;d--){var T=trace[d],k2=X-Y,vkm=T[k2-1+d+1],vkp=T[k2+1+d+1],
        down=(k2===-d||(k2!==d&&vkm<vkp)),pk=down?k2+1:k2-1,px=down?vkp:vkm,py=px-pk,sx=down?px:px+1,sy=down?py+1:py;
      while(X>sx&&Y>sy){X--;Y--;}
      ops.push(down?["+",a0+px,b0+py]:["-",a0+px,b0+py]);X=px;Y=py;}
    ops.reverse();
    var cur=null;ops.forEach(function(op){var ai=op[1],bj=op[2];
      if(cur&&cur.a1===ai&&cur.b1===bj){if(op[0]==="-")cur.a1++;else cur.b1++;}
      else{if(cur)regions.push(cur);cur=op[0]==="-"?{a0:ai,a1:ai+1,b0:bj,b1:bj}:{a0:ai,a1:ai,b0:bj,b1:bj+1};}});
    if(cur)regions.push(cur);}
  rec(0,a.length,0,b.length);
  regions.sort(function(p,q){return p.a0-q.a0||p.b0-q.b0;});
  /* join regions that touch */
  var out=[];regions.forEach(function(r){var l=out[out.length-1];if(l&&l.a1===r.a0&&l.b1===r.b0){l.a1=r.a1;l.b1=r.b1;}else out.push({a0:r.a0,a1:r.a1,b0:r.b0,b1:r.b1});});
  return out;}
/* hunks with three lines either side, as in a unified diff */
function hunks(a,b,ctx){ctx=ctx==null?3:ctx;var rs=lineDiff(a,b),out=[],i=0;
  while(i<rs.length){var j=i;while(j+1<rs.length&&rs[j+1].a0-rs[j].a1<=2*ctx)j++;
    var s=Math.max(0,rs[i].a0-ctx),e=Math.min(a.length,rs[j].a1+ctx),h={a0:s,b0:rs[i].b0-(rs[i].a0-s),lines:[]},p=s;
    for(var k=i;k<=j;k++){var r=rs[k];for(;p<r.a0;p++)h.lines.push([" ",a[p]]);for(var q=r.a0;q<r.a1;q++)h.lines.push(["-",a[q]]);for(q=r.b0;q<r.b1;q++)h.lines.push(["+",b[q]]);p=r.a1;}
    for(;p<e;p++)h.lines.push([" ",a[p]]);
    h.aN=h.lines.filter(function(l){return l[0]!=="+";}).length;h.bN=h.lines.filter(function(l){return l[0]!=="-";}).length;out.push(h);i=j+1;}
  return out;}
function unified(path,a,b,hs,how){var s="diff --git a/"+path+" b/"+path+"\n"+(how==="added"?"new file mode 100644\n":how==="removed"?"deleted file mode 100644\n":"")+
  "--- "+(how==="added"?"/dev/null":"a/"+path)+"\n+++ "+(how==="removed"?"/dev/null":"b/"+path)+"\n";
  hs.forEach(function(h){s+="@@ -"+(h.aN?h.a0+1:h.a0)+(h.aN===1?"":","+h.aN)+" +"+(h.bN?h.b0+1:h.b0)+(h.bN===1?"":","+h.bN)+" @@\n";h.lines.forEach(function(l){s+=l[0]+l[1]+"\n";});});return s;}
/* three-way: what both sides did to the text they share */
function merge3(base,ours,theirs,labels){labels=labels||{};var A=lineDiff(base,ours).map(function(r){r.s=0;return r;}),B=lineDiff(base,theirs).map(function(r){r.s=1;return r;});
  var all=A.concat(B).sort(function(p,q){return p.a0-q.a0||p.a1-q.a1||p.s-q.s;}),out=[],pos=0,conflicts=0,i=0;
  function touch(g,r){return r.a0<g.a1||(r.a0===g.a1&&(r.a0===r.a1||g.a0===g.a1))||(r.a0===g.a0);}
  while(i<all.length){var g={a0:all[i].a0,a1:all[i].a1,m:[all[i]]};i++;
    while(i<all.length&&touch(g,all[i])){g.a1=Math.max(g.a1,all[i].a1);g.m.push(all[i]);i++;}
    for(;pos<g.a0;pos++)out.push(base[pos]);
    var side=[ours,theirs].map(function(arr,s){var ms=g.m.filter(function(r){return r.s===s;});if(!ms.length)return null;
      /* this side's text for base[g.a0..g.a1) */
      var res=[],p=g.a0;ms.forEach(function(r){for(;p<r.a0;p++)res.push(base[p]);for(var q=r.b0;q<r.b1;q++)res.push(arr[q]);p=r.a1;});for(;p<g.a1;p++)res.push(base[p]);return res;});
    if(!side[1])out.push.apply(out,side[0]);else if(!side[0])out.push.apply(out,side[1]);
    else if(side[0].join("\n")===side[1].join("\n"))out.push.apply(out,side[0]);
    else{conflicts++;out.push("<<<<<<< "+(labels.ours||"yours"));out.push.apply(out,side[0]);out.push("=======");out.push.apply(out,side[1]);out.push(">>>>>>> "+(labels.theirs||"theirs"));}
    pos=g.a1;}
  for(;pos<base.length;pos++)out.push(base[pos]);
  return {lines:out,conflicts:conflicts};}
function joinLines(ls,endNL){return ls.join("\n")+(ls.length&&endNL!==false?"\n":"");}

/* ---------- a pack: many objects in one file, as git sends and keeps them ---------- */
var CRC=null;function crc32(u8){if(!CRC){CRC=new Int32Array(256);for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;CRC[n]=c;}}
  var x=-1;for(var i=0;i<u8.length;i++)x=CRC[(x^u8[i])&255]^(x>>>8);return (x^-1)>>>0;}
function packHead(type,size){var b=[],c=(type<<4)|(size&15);size=Math.floor(size/16);while(size){b.push(c|128);c=size&127;size=Math.floor(size/128);}b.push(c);return new Uint8Array(b);}
function ofsBytes(d){var b=[d&127];while((d=Math.floor(d/128))){d-=1;b.unshift(128|(d&127));}return new Uint8Array(b);}
/* items: [{oid,type,base?}] in the order they go in (a base before what is kept against it); get(oid) gives the body.
   Only the bodies still needed as a base are held while it is written. -> {pack, idx, sum, count} */
function writePack(items,get){var parts=[],ents=[],off=12,at={},need={},held=new Map();
  items.forEach(function(o){if(o.base)need[o.base]=(need[o.base]||0)+1;});
  var chain=Promise.resolve();
  items.forEach(function(o){chain=chain.then(function(){return get(o.oid).then(function(body){var d=null,bb=o.base?held.get(o.base):null;
      if(bb&&at[o.base]!=null){d=makeDelta(bb,body);if(d&&d.length>body.length*0.6)d=null;}
      if(o.base&&need[o.base]&&!--need[o.base])held.delete(o.base);
      if(need[o.oid])held.set(o.oid,body);
      return deflateZ(d||body).then(function(z){var bytes=d?cat([packHead(6,d.length),ofsBytes(off-at[o.base]),z]):cat([packHead(TNUM[o.type],body.length),z]);
        ents.push({oid:o.oid,off:off,crc:crc32(bytes)});at[o.oid]=off;parts.push(bytes);off+=bytes.length;});});});});
  return chain.then(function(){var h=new Uint8Array(12);h.set(enc("PACK"));h[7]=2;var n=ents.length;h[8]=n>>>24;h[9]=(n>>>16)&255;h[10]=(n>>>8)&255;h[11]=n&255;
    var body=cat([h].concat(parts));parts=null;return sha1(body).then(function(sum){var pack=cat([body,unhex(sum)]);
      ents.sort(function(p,q){return p.oid<q.oid?-1:1;});
      var fan=new Uint8Array(1024),j=0,i;for(i=0;i<256;i++){while(j<ents.length&&parseInt(ents[j].oid.slice(0,2),16)<=i)j++;fan[i*4]=j>>>24;fan[i*4+1]=(j>>>16)&255;fan[i*4+2]=(j>>>8)&255;fan[i*4+3]=j&255;}
      var ids=cat(ents.map(function(e){return unhex(e.oid);})),crcs=new Uint8Array(4*ents.length),offs=new Uint8Array(4*ents.length),big=[];
      ents.forEach(function(e,k){var c=e.crc;crcs[4*k]=c>>>24;crcs[4*k+1]=(c>>>16)&255;crcs[4*k+2]=(c>>>8)&255;crcs[4*k+3]=c&255;
        var v=e.off;if(v>=0x80000000){v=(0x80000000|big.length)>>>0;var bb=new Uint8Array(8),hi=Math.floor(e.off/4294967296),lo=e.off>>>0;bb[0]=hi>>>24;bb[1]=(hi>>>16)&255;bb[2]=(hi>>>8)&255;bb[3]=hi&255;bb[4]=lo>>>24;bb[5]=(lo>>>16)&255;bb[6]=(lo>>>8)&255;bb[7]=lo&255;big.push(bb);}
        offs[4*k]=v>>>24;offs[4*k+1]=(v>>>16)&255;offs[4*k+2]=(v>>>8)&255;offs[4*k+3]=v&255;});
      var ib=cat([new Uint8Array([0xff,0x74,0x4f,0x63,0,0,0,2]),fan,ids,crcs,offs].concat(big).concat([unhex(sum)]));
      return sha1(ib).then(function(isum){return {pack:pack,idx:cat([ib,unhex(isum)]),sum:sum,count:n};});});});}
/* read every object of a pack (a bundle's or a .git's), one after another, deltas put back together.
   put(type, body, baseOid) keeps one and gives its name; lookup(oid) finds a base kept earlier. */
function readPack(pack,put,lookup){var dv=new DataView(pack.buffer,pack.byteOffset,pack.byteLength);
  if(pack.length<32||dec(pack.subarray(0,4))!=="PACK")return Promise.reject(new Error("not a git pack"));var ver=dv.getUint32(4),n=dv.getUint32(8);
  if(ver!==2&&ver!==3)return Promise.reject(new Error("a pack version Ingenium does not read"));
  var p=12,i=0,byOff=new Map(),byOid=new Map(),held=new Map(),heldBytes=0;
  function hold(off,o){held.set(off,o);heldBytes+=o.body.length;while(heldBytes>128*1048576&&held.size>1){var k=held.keys().next().value;heldBytes-=held.get(k).body.length;held.delete(k);}}
  function baseAt(off){var h=held.get(off);if(h)return Promise.resolve(h);var e=byOff.get(off);if(!e)return Promise.resolve(null);return lookup(e.oid);}
  function next(){if(i>=n){var sum=pack.subarray(p,p+20);return sha1(pack.subarray(0,p)).then(function(s){if(s!==hex(sum))throw new Error("the pack's checksum does not match: it is damaged");return n;});}
    i++;var start=p,c=pack[p++],type=(c>>4)&7,size=c&15,s=16,baseOff=null,baseOid=null;while(c&128){c=pack[p++];size+=(c&127)*s;s*=128;}
    if(type===6){c=pack[p++];var d=c&127;while(c&128){c=pack[p++];d=((d+1)*128)+(c&127);}baseOff=start-d;}
    else if(type===7){baseOid=hex(pack.subarray(p,p+20));p+=20;}
    else if(type<1||type>4)return Promise.reject(new Error("a pack object of a kind git does not make"));
    var z;try{z=inflateZ(pack,p,size);}catch(e){return Promise.reject(e);}if(z.data.length!==size)return Promise.reject(new Error("a pack object is not the size it says"));p=z.end;
    var whole=type<5?Promise.resolve({type:TYPES[type],body:z.data}):(type===6?baseAt(baseOff):(byOid.has(baseOid)?baseAt(byOid.get(baseOid)):lookup(baseOid))).then(function(bo){
      if(type<5)return bo;if(!bo)throw new Error("a pack object's base is missing");return {type:bo.type,body:applyDelta(bo.body,z.data)};});
    return whole.then(function(o){var hint=type===6?(byOff.get(baseOff)||{}).oid:baseOid;
      return put(o.type,o.body,hint||null,type<5?null:z.data).then(function(oid){byOff.set(start,{oid:oid,type:o.type});byOid.set(oid,start);hold(start,o);return next();});});}
  return next();}

/* ---------- zips: read (with each file's mode), and written with deflate where the browser has it ---------- */
function unzip(u8){var dv=new DataView(u8.buffer,u8.byteOffset,u8.byteLength),n=u8.length,at=-1,i;
  for(i=n-22;i>=Math.max(0,n-65557);i--)if(dv.getUint32(i,true)===0x06054b50){at=i;break;}
  if(at<0)throw new Error("this is not a zip file");
  var cnt=dv.getUint16(at+10,true),cdo=dv.getUint32(at+16,true),cml=dv.getUint16(at+20,true),comment=dec(u8.subarray(at+22,at+22+cml)),out=[];
  if(cdo===0xffffffff||cnt===0xffff){/* zip64 */var l=at-20;if(l>=0&&dv.getUint32(l,true)===0x07064b50){var z=Number(dv.getBigUint64(l+8,true));cnt=Number(dv.getBigUint64(z+32,true));cdo=Number(dv.getBigUint64(z+48,true));}}
  var off=cdo;for(i=0;i<cnt;i++){if(dv.getUint32(off,true)!==0x02014b50)throw new Error("the zip's list of files is broken");
    var flags=dv.getUint16(off+8,true),meth=dv.getUint16(off+10,true),crc=dv.getUint32(off+16,true),csz=dv.getUint32(off+20,true),usz=dv.getUint32(off+24,true),nl=dv.getUint16(off+28,true),xl=dv.getUint16(off+30,true),cl=dv.getUint16(off+32,true),made=dv.getUint16(off+4,true)>>8,ext=dv.getUint32(off+38,true),lho=dv.getUint32(off+42,true);
    var nameB=u8.subarray(off+46,off+46+nl),name=(flags&0x800)?dec(nameB):dec(nameB);
    if(csz===0xffffffff||usz===0xffffffff||lho===0xffffffff){var xp=off+46+nl,xe=xp+xl;while(xp+4<=xe){var id=dv.getUint16(xp,true),sz=dv.getUint16(xp+2,true),q=xp+4;
      if(id===1){if(usz===0xffffffff){usz=Number(dv.getBigUint64(q,true));q+=8;}if(csz===0xffffffff){csz=Number(dv.getBigUint64(q,true));q+=8;}if(lho===0xffffffff){lho=Number(dv.getBigUint64(q,true));}}xp+=4+sz;}}
    var unix=made===3?(ext>>>16):0;out.push({name:name,meth:meth,crc:crc,csz:csz,usz:usz,lho:lho,unix:unix,dir:/\/$/.test(name)||((ext&0x10)!==0&&!usz)});off+=46+nl+xl+cl;}
  return {entries:out,comment:comment};}
function unzipData(u8,e){var dv=new DataView(u8.buffer,u8.byteOffset,u8.byteLength);if(dv.getUint32(e.lho,true)!==0x04034b50)return Promise.reject(new Error("a file in the zip is broken"));
  var s=e.lho+30+dv.getUint16(e.lho+26,true)+dv.getUint16(e.lho+28,true),c=u8.subarray(s,s+e.csz);
  if(e.meth===0)return Promise.resolve(c);if(e.meth!==8)return Promise.reject(new Error("“"+e.name+"” is packed in a way Ingenium does not read"));
  var viaJS=function(){return inflateRaw(c,0,e.usz).data;};
  try{if(typeof DecompressionStream==="function"){new DecompressionStream("deflate-raw");return stream(c,new DecompressionStream("deflate-raw")).catch(viaJS);}}catch(x){}
  return Promise.resolve().then(viaJS);}
function dosTime(d){return {t:(d.getHours()<<11)|(d.getMinutes()<<5)|(d.getSeconds()>>1),d:((Math.max(1980,d.getFullYear())-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate()};}
/* files: [{name, data, mode? (unix: 0o100644, 0o100755, 0o120000 for a link whose data is its target), dir?}] */
function zip(files,opt){opt=opt||{};var when=dosTime(opt.date||new Date()),parts=[],cds=[],off=0;
  function le(n,b){var a=new Uint8Array(b);for(var i=0;i<b;i++){a[i]=n&255;n=Math.floor(n/256);}return a;}
  var chain=Promise.resolve();
  files.forEach(function(f){chain=chain.then(function(){var name=enc(f.name),data=f.dir?new Uint8Array(0):u8of(f.data),crc=crc32(data);
    var tryZ=(!f.dir&&opt.deflate!==false&&data.length>=128&&!/\.(png|jpe?g|gif|webp|zip|gz|jar|apk|ipa|woff2?|mp[34]|gguf|wasm)$/i.test(f.name))?deflateRaw(data):Promise.resolve(null);
    return tryZ.then(function(z){var meth=z&&z.length<data.length?8:0,body=meth?z:data,mode=f.dir?(0o40755):(f.mode||0o100644);
      var ext=((mode<<16)>>>0)|(f.dir?0x10:0);
      var lh=cat([le(0x04034b50,4),le(meth?20:10,2),le(0x800,2),le(meth,2),le(when.t,2),le(when.d,2),le(crc,4),le(body.length,4),le(data.length,4),le(name.length,2),le(0,2),name]);
      cds.push(cat([le(0x02014b50,4),le(0x0314,2),le(meth?20:10,2),le(0x800,2),le(meth,2),le(when.t,2),le(when.d,2),le(crc,4),le(body.length,4),le(data.length,4),le(name.length,2),le(0,2),le(0,2),le(0,2),le(0,2),le(ext,4),le(off,4),name]));
      parts.push(lh,body);off+=lh.length+body.length;});});});
  return chain.then(function(){var cd=cat(cds),cm=enc(opt.comment||"");
    var eo=cat([le(0x06054b50,4),le(0,2),le(0,2),le(files.length,2),le(files.length,2),le(cd.length,4),le(off,4),le(cm.length,2),cm]);
    if(off>0xfffffff0||files.length>65000)throw new Error("too large for one zip");
    return cat(parts.concat([cd,eo]));});}

/* ---------- the .git index, so a folder made here shows no changes in git ---------- */
function gitIndex(files){var paths=Object.keys(files).sort(function(a,b){return cmpBytes(enc(a),enc(b));}),parts=[];
  var h=new Uint8Array(12);h.set(enc("DIRC"));h[7]=2;var n=paths.length;h[8]=n>>>24;h[9]=(n>>>16)&255;h[10]=(n>>>8)&255;h[11]=n&255;parts.push(h);
  paths.forEach(function(p){var f=files[p],nm=enc(p),len=62+nm.length,pad=8-(len%8),e=new Uint8Array(len+pad),m=parseInt(f[0],8),sz=f[2]>>>0;
    e[24]=m>>>24;e[25]=(m>>>16)&255;e[26]=(m>>>8)&255;e[27]=m&255;e[36]=sz>>>24;e[37]=(sz>>>16)&255;e[38]=(sz>>>8)&255;e[39]=sz&255;
    e.set(unhex(f[1]),40);var fl=Math.min(nm.length,0xfff);e[60]=fl>>8;e[61]=fl&255;e.set(nm,62);parts.push(e);});
  var body=cat(parts);return sha1(body).then(function(s){return cat([body,unhex(s)]);});}

/* ================= the repositories ================= */
var BE=null,ST=null;
function backend(){if(!BE){BE=(typeof indexedDB!=="undefined")?IdbBackend():MemBackend();ST=new Store(BE);ST.onPut=function(oid){if(mshell())MIR.fresh.add(oid);};}return BE;}
function store(){backend();return ST;}
function newId(){return "repo_"+Date.now().toString(36)+Math.random().toString(36).slice(2,7);}
function slug(n){return String(n||"repository").normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^A-Za-z0-9._-]+/g,"-").replace(/^[-.]+|[-.]+$/g,"").slice(0,60)||"repository";}
var who={name:"Yannie D. Forest",email:""};
function setAuthor(a){if(a&&a.name)who={name:String(a.name),email:String(a.email||"")};return who;}
/* one at a time for each repository: no two changes cross */
var locks={};
function locked(id,fn){var prev=locks[id]||Promise.resolve(),job=prev.catch(function(){}).then(fn);locks[id]=job.catch(function(){});return job;}
function load(id){return backend().getRepo(id).then(function(r){if(!r)throw new Error("that repository is no longer on this device");return r;});}
function save(r){r.changed=Date.now();return backend().putRepo(r).then(function(){mirrorSoon(r.id);return r;});}
function headOid(r){return r.head&&r.head.ref?(r.refs[r.head.ref]||null):(r.head?r.head.oid:null);}
function moveHead(r,oid,why){var from=headOid(r);if(r.head.ref)r.refs[r.head.ref]=oid;else r.head={oid:oid};
  r.log=(r.log||[]).concat([{at:Date.now(),from:from,to:oid,why:why}]).slice(-200);}
function resolve(r,ref){if(!ref||ref==="HEAD")return Promise.resolve(headOid(r));
  if(/^[0-9a-f]{40}$/.test(ref))return Promise.resolve(ref);
  var names=[ref,"refs/heads/"+ref,"refs/tags/"+ref];for(var i=0;i<names.length;i++)if(r.refs[names[i]])return peel(r.refs[names[i]]);
  if(/^[0-9a-f]{4,39}$/.test(ref)){/* a short name: look in this repository's history */
    return logOf(r,headOid(r),100000,Object.keys(r.refs).map(function(k){return r.refs[k];})).then(function(l){var m=l.filter(function(c){return c.oid.indexOf(ref)===0;});if(m.length===1)return m[0].oid;throw new Error(m.length?"“"+ref+"” names more than one commit":"nothing here is called “"+ref+"”");});}
  return Promise.reject(new Error("nothing here is called “"+ref+"”"));}
function peel(oid){return store().need(oid).then(function(o){if(o.type==="tag")return peel(parseTag(o.body).object);if(o.type!=="commit")throw new Error("that is not a commit");return oid;});}
function commitOf(oid){return store().need(oid,"commit").then(function(o){var c=parseCommit(o.body);c.oid=oid;return c;});}
function treeFiles(commitOid){if(!commitOid)return Promise.resolve({});return commitOf(commitOid).then(function(c){return flatten(store(),c.tree);});}
/* the history from one or more commits, newest first */
function logOf(r,from,max,more){var seen={},out=[],queue=[from].concat(more||[]).filter(Boolean);
  function step(){if(!queue.length||out.length>=max)return Promise.resolve(out);
    return Promise.all(queue.splice(0).filter(function(o){if(seen[o])return false;seen[o]=1;return true;}).map(commitOf)).then(function(cs){
      cs.forEach(function(c){out.push(c);c.parents.forEach(function(p){if(!seen[p])queue.push(p);});});
      out.sort(function(a,b){return (b.committer?b.committer.when:0)-(a.committer?a.committer.when:0);});
      return step();});}
  return step().then(function(o){return o.slice(0,max);});}
function summary(r){return {id:r.id,name:r.name,slug:r.slug,app:r.app||null,desc:r.desc||"",created:r.created,changed:r.changed,
  branch:r.head&&r.head.ref?r.head.ref.replace(/^refs\/heads\//,""):null,detached:!!(r.head&&r.head.oid),head:headOid(r),
  branches:Object.keys(r.refs).filter(function(k){return k.indexOf("refs/heads/")===0;}).map(function(k){return k.slice(11);}),
  tags:Object.keys(r.refs).filter(function(k){return k.indexOf("refs/tags/")===0;}).map(function(k){return k.slice(10);}),
  files:Object.keys(r.work||{}).length,merging:r.merging?{theirs:r.merging.label,conflicts:r.merging.conflicts.slice()}:null};}

function create(opt){opt=opt||{};var r={id:newId(),name:String(opt.name||"New app").slice(0,80),app:opt.app||null,desc:String(opt.desc||""),created:Date.now(),
    head:{ref:"refs/heads/"+(okRefName(opt.branch)?opt.branch:"main")},refs:{},work:{},sizes:{},log:[],merging:null};r.slug=slug(r.name);
  return save(r).then(summary);}
function list(){return recover().then(function(){return backend().allRepos();}).then(function(a){return a.map(summary).sort(function(x,y){return (y.changed||0)-(x.changed||0);});});}
function info(id){return load(id).then(summary);}
function rename(id,name,desc){return locked(id,function(){return load(id).then(function(r){if(name)r.name=String(name).slice(0,80);if(desc!=null)r.desc=String(desc);r.slug=slug(r.name);return save(r).then(summary);});});}
function remove(id){return locked(id,function(){return backend().delRepo(id).then(function(){mirrorSoon(id);});});}

/* the working copy: put, take away, move, read */
function putFile(id,path,data,mode){return locked(id,function(){return load(id).then(function(r){var p=cleanPath(path),b=u8of(data),old=r.work[p];
    var m=mode?String(mode):(old?old[0]:(execByName(p)?"100755":"100644"));if(!/^(100644|100755|120000)$/.test(m))throw new Error("not a mode a file can have");
    return store().put("blob",b,old?old[1]:null).then(function(oid){
      Object.keys(r.work).forEach(function(q){if(q.indexOf(p+"/")===0||p.indexOf(q+"/")===0)throw new Error("“"+q+"” is in the way of “"+p+"”");});
      r.work[p]=[m,oid];r.sizes=r.sizes||{};r.sizes[oid]=b.length;return save(r).then(function(){return oid;});});});});}
function putFiles(id,files,onEach){/* many at once: [{path,data,mode}] */
  return locked(id,function(){return load(id).then(function(r){var i=0;r.sizes=r.sizes||{};
    function next(){if(i>=files.length)return save(r).then(function(){return files.length;});var f=files[i++],p=cleanPath(f.path),b=u8of(f.data),old=r.work[p];
      var m=f.mode?String(f.mode):(old?old[0]:(execByName(p)?"100755":"100644"));
      return store().put("blob",b,old?old[1]:null).then(function(oid){r.work[p]=[m,oid];r.sizes[oid]=b.length;if(onEach)onEach(i,files.length,p);return next();});}
    return next();});});}
function delFile(id,path){return locked(id,function(){return load(id).then(function(r){var p=cleanPath(path),n=0;
  Object.keys(r.work).forEach(function(q){if(q===p||q.indexOf(p+"/")===0){delete r.work[q];n++;}});if(!n)throw new Error("“"+p+"” is not here");return save(r).then(function(){return n;});});});}
function moveFile(id,from,to){return locked(id,function(){return load(id).then(function(r){var a=cleanPath(from),b=cleanPath(to),n=0;
  Object.keys(r.work).forEach(function(q){if(q===a||q.indexOf(a+"/")===0){var nq=b+q.slice(a.length);if(r.work[nq]&&nq!==q)throw new Error("“"+nq+"” is already here");r.work[nq]=r.work[q];delete r.work[q];n++;}});
  if(!n)throw new Error("“"+a+"” is not here");return save(r).then(function(){return n;});});});}
function readFile(id,path,ref){return load(id).then(function(r){var p=cleanPath(path);
  var files=ref?resolve(r,ref).then(treeFiles):Promise.resolve(r.work);
  return files.then(function(f){var e=f[p];if(!e)return null;return store().need(e[1],"blob").then(function(o){return o.body;});});});}
function readText(id,path,ref){return readFile(id,path,ref).then(function(b){return b==null?null:dec(b);});}
function files(id,ref){return load(id).then(function(r){var f=ref?resolve(r,ref).then(treeFiles):Promise.resolve(r.work);
  return f.then(function(m){var ps=Object.keys(m).sort();return Promise.all(ps.map(function(p){var o=m[p][1];return (r.sizes&&r.sizes[o]!=null)?r.sizes[o]:store().size(o);})).then(function(sz){
    return ps.map(function(p,i){return {path:p,mode:m[p][0],oid:m[p][1],size:sz[i]};});});});});}

/* what has changed since the last commit */
function changesBetween(A,B){var out=[];Object.keys(A).forEach(function(p){if(!B[p])out.push({path:p,kind:"removed",old:A[p]});else if(A[p][1]!==B[p][1]||A[p][0]!==B[p][0])out.push({path:p,kind:A[p][1]===B[p][1]?"mode":"changed",old:A[p],now:B[p]});});
  Object.keys(B).forEach(function(p){if(!A[p])out.push({path:p,kind:"added",now:B[p]});});
  /* a file taken away and the same bytes put elsewhere: moved */
  var gone=out.filter(function(c){return c.kind==="removed";}),came=out.filter(function(c){return c.kind==="added";});
  gone.forEach(function(g){var m=came.filter(function(c){return c.now[1]===g.old[1]&&!c.moved;})[0];if(m){m.kind="moved";m.from=g.path;m.old=g.old;m.moved=true;g.drop=true;}});
  return out.filter(function(c){return !c.drop;}).map(function(c){delete c.moved;return c;}).sort(function(a,b){return a.path<b.path?-1:1;});}
function status(id){return load(id).then(function(r){return treeFiles(headOid(r)).then(function(h){var ch=changesBetween(h,r.work);
  return {changes:ch,clean:!ch.length,head:headOid(r),branch:summary(r).branch,merging:summary(r).merging};});});}

function commit(id,msg,opt){opt=opt||{};return locked(id,function(){return load(id).then(function(r){msg=String(msg||"").replace(/\r\n/g,"\n").trim();if(!msg)throw new Error("a commit needs a few words to say what it changes");
    if(r.merging&&r.merging.conflicts.length){return Promise.all(r.merging.conflicts.map(function(p){return r.work[p]?store().need(r.work[p][1]).then(function(o){return /^(<<<<<<<|=======|>>>>>>>)( |$)/m.test(dec(o.body))?p:null;}):null;})).then(function(left){left=left.filter(Boolean);
      if(left.length)throw new Error("these still hold both versions: "+left.join(", "));r.merging.conflicts=[];return go();});}
    return go();
    function go(){var parent=headOid(r);return writeTrees(store(),r.work).then(function(tree){
      var chk=parent?commitOf(parent).then(function(pc){return pc.tree===tree&&!r.merging&&!opt.allowEmpty;}):Promise.resolve(false);
      return chk.then(function(empty){if(empty)throw new Error("nothing has changed since the last commit");
        var d=opt.date||new Date(),when=Math.floor(d.getTime()/1000),a=ident(opt.author||who,when,tzOf(d)),parents=parent?[parent]:[];if(r.merging&&r.merging.theirs)parents.push(r.merging.theirs);
        return store().put("commit",commitBody({tree:tree,parents:parents,author:a,msg:msg+"\n"})).then(function(oid){moveHead(r,oid,r.merging?"merge "+r.merging.label:"commit");r.merging=null;return save(r).then(function(){return oid;});});});});}});});}
function log(id,opt){opt=opt||{};return load(id).then(function(r){var refsAt={};Object.keys(r.refs).forEach(function(k){(refsAt[r.refs[k]]=refsAt[r.refs[k]]||[]).push(k.replace(/^refs\/(heads|tags)\//,""));});
  return resolve(r,opt.ref).then(function(from){if(!from)return [];return logOf(r,from,opt.max||200).then(function(l){return l.map(function(c){return {oid:c.oid,short:c.oid.slice(0,7),parents:c.parents,tree:c.tree,
    author:c.author,when:c.author?c.author.when*1000:0,msg:c.msg,title:c.msg.split("\n")[0],names:refsAt[c.oid]||[]};});});});});}

/* branches and tags */
function branch(id,name,from){return locked(id,function(){return load(id).then(function(r){if(!okRefName(name))throw new Error("“"+name+"” cannot be a branch's name");var k="refs/heads/"+name;
  if(r.refs[k])throw new Error("there is already a branch called “"+name+"”");return resolve(r,from).then(function(o){if(!o)throw new Error("make a first commit before a branch");r.refs[k]=o;return save(r).then(summary);});});});}
function delBranch(id,name){return locked(id,function(){return load(id).then(function(r){var k="refs/heads/"+name;if(!r.refs[k])throw new Error("there is no branch called “"+name+"”");
  if(r.head.ref===k)throw new Error("you are on “"+name+"”: move to another branch first");r.log=(r.log||[]).concat([{at:Date.now(),from:r.refs[k],to:null,why:"branch "+name+" taken away"}]).slice(-200);delete r.refs[k];return save(r).then(summary);});});}
function tag(id,name,opt){opt=opt||{};return locked(id,function(){return load(id).then(function(r){if(!okRefName(name))throw new Error("“"+name+"” cannot be a tag's name");var k="refs/tags/"+name;
  if(r.refs[k])throw new Error("there is already a tag called “"+name+"”");return resolve(r,opt.target).then(function(o){if(!o)throw new Error("make a first commit before a tag");
    if(!opt.msg){r.refs[k]=o;return save(r).then(summary);}
    var d=new Date(),body=enc("object "+o+"\ntype commit\ntag "+name+"\ntagger "+ident(opt.author||who,Math.floor(d.getTime()/1000),tzOf(d))+"\n\n"+String(opt.msg).trim()+"\n");
    return store().put("tag",body).then(function(t){r.refs[k]=t;return save(r).then(summary);});});});});}
function delTag(id,name){return locked(id,function(){return load(id).then(function(r){var k="refs/tags/"+name;if(!r.refs[k])throw new Error("there is no tag called “"+name+"”");delete r.refs[k];return save(r).then(summary);});});}
/* move to a branch (or an older commit, to look at it): the working copy follows; changes not yet committed come along when they do not clash */
function switchTo(id,target,opt){opt=opt||{};return locked(id,function(){return load(id).then(function(r){if(r.merging)throw new Error("finish or stop the merge first");
  var k="refs/heads/"+target,isB=!!r.refs[k];
  return Promise.all([treeFiles(headOid(r)),isB?Promise.resolve(r.refs[k]):resolve(r,target)]).then(function(x){var cur=x[0],to=x[1];return treeFiles(to).then(function(next){
    var mine=changesBetween(cur,r.work),work={},p,clash=[];for(p in next)work[p]=next[p];
    mine.forEach(function(c){var p2=c.path;if((cur[p2]?cur[p2][1]:null)!==(next[p2]?next[p2][1]:null)||(c.from&&(cur[c.from]?cur[c.from][1]:null)!==(next[c.from]?next[c.from][1]:null)))clash.push(p2);});
    if(clash.length&&!opt.force)throw new Error("your changes to "+clash.slice(0,4).join(", ")+(clash.length>4?" and others":"")+" would be lost: commit them first");
    if(!opt.force)mine.forEach(function(c){if(c.kind==="removed")delete work[c.path];else{if(c.from)delete work[c.from];work[c.path]=c.now;}});
    r.work=work;var from=headOid(r);r.head=isB?{ref:k}:{oid:to};r.log=(r.log||[]).concat([{at:Date.now(),from:from,to:to,why:"switch to "+target}]).slice(-200);
    return save(r).then(summary);});});});});}
function discard(id,paths){return locked(id,function(){return load(id).then(function(r){return treeFiles(headOid(r)).then(function(h){
  if(!paths){r.work=h;}else paths.forEach(function(p){p=cleanPath(p);if(h[p])r.work[p]=h[p];else delete r.work[p];});return save(r).then(summary);});});});}
/* an older version of a file, back into the working copy */
function restore(id,path,ref){return locked(id,function(){return load(id).then(function(r){var p=cleanPath(path);return resolve(r,ref).then(treeFiles).then(function(f){
  if(f[p])r.work[p]=f[p];else delete r.work[p];return save(r).then(summary);});});});}

/* differences: between two commits, or from a commit to the working copy */
function diff(id,opt){opt=opt||{};return load(id).then(function(r){
  var A=opt.from==="empty"?Promise.resolve({}):resolve(r,opt.from||"HEAD").then(treeFiles),
      B=(!opt.to||opt.to==="work")?Promise.resolve(r.work):resolve(r,opt.to).then(treeFiles);
  return Promise.all([A,B]).then(function(x){var ch=changesBetween(x[0],x[1]);if(opt.paths)ch=ch.filter(function(c){return opt.paths.indexOf(c.path)>=0;});
    return Promise.all(ch.map(function(c){
      var ob=c.old?store().need(c.old[1]).then(function(o){return o.body;}):Promise.resolve(new Uint8Array(0)),nb=c.now?store().need(c.now[1]).then(function(o){return o.body;}):Promise.resolve(new Uint8Array(0));
      return Promise.all([ob,nb]).then(function(y){var bin=isBinary(y[0])||isBinary(y[1]),item={path:c.path,kind:c.kind,from:c.from||null,binary:bin,oldSize:y[0].length,newSize:y[1].length,adds:0,dels:0,hunks:[]};
        if(!bin&&!opt.namesOnly&&c.kind!=="mode"&&(y[0].length+y[1].length)<=(opt.limit||24*1048576)){var a=splitLines(dec(y[0])),b=splitLines(dec(y[1]));item.hunks=hunks(a,b,opt.context);
          item.hunks.forEach(function(h){h.lines.forEach(function(l){if(l[0]==="+")item.adds++;else if(l[0]==="-")item.dels++;});});
          if(opt.text)item.text=unified(c.path,a,b,item.hunks,c.kind);}
        return item;});}));});});}

/* the commit two branches last shared */
function mergeBase(a,b){var da={},q=[a];function up(list,mark){return Promise.all(list.map(commitOf)).then(function(cs){var nx=[];cs.forEach(function(c){c.parents.forEach(function(p){if(!mark[p]){mark[p]=1;nx.push(p);}});});return nx;});}
  da[a]=1;function walkA(list){if(!list.length)return Promise.resolve();return up(list,da).then(walkA);}
  return walkA(q).then(function(){var seen={},front=[b];seen[b]=1;
    function step(list){var hit=list.filter(function(o){return da[o];});if(hit.length)return Promise.resolve(hit[0]);if(!list.length)return Promise.resolve(null);return up(list,seen).then(step);}
    return step(front);});}
function mergeTrees(base,ours,theirs,labels){var paths={},p,out={},conflicts=[],texts=[];[base,ours,theirs].forEach(function(t){for(var k in t)paths[k]=1;});
  Object.keys(paths).forEach(function(p){var b=base[p],o=ours[p],t=theirs[p],key=function(e){return e?e[0]+e[1]:"";};
    if(key(o)===key(t)){if(o)out[p]=o;return;}if(key(o)===key(b)){if(t)out[p]=t;return;}if(key(t)===key(b)){if(o)out[p]=o;return;}
    if(o&&t&&b){texts.push(p);out[p]=o;return;}
    if(o&&t&&!b){texts.push(p);out[p]=o;return;}
    /* one took it away, the other changed it: keep the changed one and say so */
    out[p]=o||t;conflicts.push(p);});
  var chain=Promise.resolve();
  texts.forEach(function(p){chain=chain.then(function(){var b=base[p],o=ours[p],t=theirs[p];
    return Promise.all([b?store().need(b[1]).then(function(x){return x.body;}):Promise.resolve(new Uint8Array(0)),store().need(o[1]).then(function(x){return x.body;}),store().need(t[1]).then(function(x){return x.body;})]).then(function(y){
      if(isBinary(y[0])||isBinary(y[1])||isBinary(y[2])){conflicts.push(p);return;}
      var sb=dec(y[0]),so=dec(y[1]),stt=dec(y[2]),m=merge3(splitLines(sb),splitLines(so),splitLines(stt),labels);
      var endNL=/\n$/.test(so)||/\n$/.test(stt)||!so;
      return store().put("blob",enc(joinLines(m.lines,endNL)),o[1]).then(function(oid){out[p]=[o[0],oid];if(m.conflicts)conflicts.push(p);});});});});
  return chain.then(function(){return {files:out,conflicts:conflicts.sort()};});}
function merge(id,other,opt){opt=opt||{};return locked(id,function(){return load(id).then(function(r){if(r.merging)throw new Error("a merge is already under way");
  return Promise.all([treeFiles(headOid(r)),resolve(r,other)]).then(function(x){if(changesBetween(x[0],r.work).length)throw new Error("commit or put aside your changes before a merge");
    var ours=headOid(r),theirs=x[1];if(!ours)throw new Error("make a first commit first");if(ours===theirs)return {kind:"same"};
    return mergeBase(ours,theirs).then(function(base){
      if(base===theirs)return {kind:"same"};
      if(base===ours){return treeFiles(theirs).then(function(f){r.work=f;moveHead(r,theirs,"merge "+other+" (moved forward)");return save(r).then(function(){return {kind:"forward",commit:theirs};});});}
      return Promise.all([treeFiles(base),Promise.resolve(x[0]),treeFiles(theirs)]).then(function(t){return mergeTrees(t[0],t[1],t[2],{ours:summary(r).branch||ours.slice(0,7),theirs:other});}).then(function(m){
        r.work=m.files;r.merging={theirs:theirs,label:other,conflicts:m.conflicts};
        if(m.conflicts.length)return save(r).then(function(){return {kind:"conflicts",conflicts:m.conflicts};});
        return save(r).then(function(){return null;});});});});});}).then(function(res){
  if(res)return res;return commit(id,opt.msg||("Merge "+other)).then(function(oid){return {kind:"merged",commit:oid};});});}
function stopMerge(id){return locked(id,function(){return load(id).then(function(r){if(!r.merging)return summary(r);return treeFiles(headOid(r)).then(function(h){r.work=h;r.merging=null;return save(r).then(summary);});});});}
/* undo a commit with a new one (nothing is written over) */
function revert(id,target){return locked(id,function(){return load(id).then(function(r){if(r.merging)throw new Error("finish or stop the merge first");
  return Promise.all([treeFiles(headOid(r)),resolve(r,target)]).then(function(x){if(changesBetween(x[0],r.work).length)throw new Error("commit your changes before undoing an older one");
    return commitOf(x[1]).then(function(c){if(c.parents.length>1)throw new Error("a merge cannot be undone in one step");
      return Promise.all([treeFiles(c.oid),treeFiles(c.parents[0]||null)]).then(function(t){return mergeTrees(t[0],x[0],t[1],{ours:"now",theirs:"before "+c.oid.slice(0,7)});}).then(function(m){
        r.work=m.files;var msg="Undo “"+c.msg.split("\n")[0]+"”\n\nThis undoes commit "+c.oid+".";
        if(m.conflicts.length){r.merging={theirs:null,label:"undo "+c.oid.slice(0,7),conflicts:m.conflicts,msg:msg};return save(r).then(function(){return {kind:"conflicts",conflicts:m.conflicts};});}
        return save(r).then(function(){return {msg:msg};});});});});});}).then(function(res){if(res.kind)return res;return commit(id,res.msg).then(function(oid){return {kind:"undone",commit:oid};});});}

/* ---------- out: a bundle, a folder for git (zipped), a zip of the files ---------- */
/* every object the named commits need, oldest first, each blob kept against the version before it at its path
   (names only; the bodies are read while the pack is written) */
function reachable(tips){var seen={},items=[],lastAt={},depth={},ordered=[],tagItems=[];
  return Promise.all(tips.map(function(t){return store().need(t).then(function(o){return {oid:t,o:o};});})).then(function(ts){
    ts.forEach(function(x){if(x.o.type==="tag")tagItems.push({oid:x.oid,type:"tag"});});
    return Promise.all(ts.map(function(x){return x.o.type==="tag"?peel(x.oid):x.oid;})).then(function(cs){
      var all={},queue=cs.slice();function walk(){if(!queue.length)return Promise.resolve();var n=queue.splice(0);
        return Promise.all(n.filter(function(o){if(all[o])return false;all[o]=1;return true;}).map(commitOf)).then(function(list){list.forEach(function(c){ordered.push(c);c.parents.forEach(function(p){if(!all[p])queue.push(p);});});return walk();});}
      return walk().then(function(){ordered.sort(function(a,b){return (a.committer?a.committer.when:0)-(b.committer?b.committer.when:0);});
        var chain=Promise.resolve();
        ordered.forEach(function(c){chain=chain.then(function(){
          function tree(oid,prefix){if(seen[oid])return Promise.resolve();seen[oid]=1;return store().need(oid,"tree").then(function(t){items.push({oid:oid,type:"tree"});
            parseTree(t.body).forEach(function(e){var p=prefix+e.name;if(e.mode==="40000")return;if(e.mode==="160000"||seen[e.oid])return;seen[e.oid]=1;
              var prev=lastAt[p],d=prev?(depth[prev]||0)+1:0;if(d>16)d=0;var it={oid:e.oid,type:"blob"};if(prev&&d)it.base=prev;depth[e.oid]=d;items.push(it);lastAt[p]=e.oid;});
            var ch=Promise.resolve();parseTree(t.body).forEach(function(e){if(e.mode==="40000")ch=ch.then(function(){return tree(e.oid,prefix+e.name+"/");});});return ch;});}
          return tree(c.tree,"").then(function(){items.push({oid:c.oid,type:"commit"});});});});
        return chain.then(function(){return items.concat(tagItems);});});});});}
function packOf(tips){return reachable(tips).then(function(items){return writePack(items,function(oid){return store().need(oid).then(function(o){return o.body;});});});}
function bundle(id){return load(id).then(function(r){var names=Object.keys(r.refs).sort(),tips=names.map(function(k){return r.refs[k];});if(!tips.length)throw new Error("make a first commit first");
  return packOf(tips).then(function(p){var h="# v2 git bundle\n";var ho=headOid(r);if(ho)h+=ho+" HEAD\n";names.forEach(function(k){h+=r.refs[k]+" "+k+"\n";});
    return cat([enc(h+"\n"),p.pack]);});});}
function gitConfig(r){return "[core]\n\trepositoryformatversion = 0\n\tfilemode = false\n\tbare = false\n\tlogallrefupdates = true\n";}
function gitFolder(id,opt){opt=opt||{};return load(id).then(function(r){var names=Object.keys(r.refs).sort(),tips=names.map(function(k){return r.refs[k];}),top=(opt.folder||r.slug)+"/";
  if(!tips.length)throw new Error("make a first commit first");
  return Promise.all([packOf(tips),treeFiles(headOid(r))]).then(function(x){var p=x[0],head=x[1],out=[],sizes={};
    out.push({name:top+".git/HEAD",data:r.head.ref?"ref: "+r.head.ref+"\n":r.head.oid+"\n"});
    out.push({name:top+".git/config",data:gitConfig(r)});
    out.push({name:top+".git/description",data:(r.desc||r.name)+"\n"});
    names.forEach(function(k){out.push({name:top+".git/"+k,data:r.refs[k]+"\n"});});
    if(!names.some(function(k){return k.indexOf("refs/tags/")===0;}))out.push({name:top+".git/refs/tags/",dir:true});
    out.push({name:top+".git/objects/info/",dir:true});
    out.push({name:top+".git/objects/pack/pack-"+p.sum+".pack",data:p.pack,mode:0o100444});
    out.push({name:top+".git/objects/pack/pack-"+p.sum+".idx",data:p.idx,mode:0o100444});
    var chain=Promise.resolve();
    Object.keys(head).sort().forEach(function(path){chain=chain.then(function(){return store().need(head[path][1],"blob").then(function(b){sizes[path]=b.body.length;out.push({name:top+path,data:b.body,mode:parseInt(head[path][0],8)});});});});
    return chain.then(function(){var idxFiles={};Object.keys(head).forEach(function(k){idxFiles[k]=[head[k][0],head[k][1],sizes[k]];});return gitIndex(idxFiles);}).then(function(ix){
      out.push({name:top+".git/index",data:ix});return zip(out);});});});}
function sourceZip(id,ref){return load(id).then(function(r){return resolve(r,ref).then(function(c){if(!c)throw new Error("make a first commit first");return treeFiles(c).then(function(f){
  var top=r.slug+"-"+c.slice(0,7)+"/",out=[],chain=Promise.resolve();
  Object.keys(f).sort().forEach(function(p){chain=chain.then(function(){return store().need(f[p][1],"blob").then(function(b){out.push({name:top+p,data:b.body,mode:parseInt(f[p][0],8)});});});});
  return chain.then(function(){return zip(out,{comment:c});});});});});}

/* ---------- in: a zip (GitHub's, or a folder holding its .git), a bundle, files chosen from a folder ---------- */
function importObjects(pack){var s=store();return readPack(pack,function(type,body,hint,delta){return s.put(type,body,type==="blob"?hint:null,type==="blob"?delta:null);},function(oid){return s.get(oid);});}
function fromBundle(u8,opt){opt=opt||{};var nl=u8.indexOf(10),first=dec(u8.subarray(0,nl));if(first!=="# v2 git bundle"&&first!=="# v3 git bundle")throw new Error("this is not a git bundle");
  var p=nl+1,refs={},head=null,prereq=[];
  for(;;){var e=u8.indexOf(10,p),line=dec(u8.subarray(p,e));p=e+1;if(!line)break;if(line[0]==="@")continue;if(line[0]==="-"){prereq.push(line.slice(1,41));continue;}
    var sp=line.indexOf(" "),oid=line.slice(0,sp),name=line.slice(sp+1);if(name==="HEAD")head=oid;else refs[name]=oid;}
  if(prereq.length)throw new Error("this bundle carries only part of a history (it needs commits that are not in it)");
  return importObjects(u8.subarray(p)).then(function(n){return made(opt,refs,head,n);});}
function made(opt,refs,head,n){var heads=Object.keys(refs).filter(function(k){return k.indexOf("refs/heads/")===0;});
  var hr=heads.filter(function(k){return refs[k]===head;}).sort(function(a,b){return (a==="refs/heads/main"?-1:0)-(b==="refs/heads/main"?-1:0);})[0]||(refs["refs/heads/main"]?"refs/heads/main":heads[0]);
  var keep={};Object.keys(refs).forEach(function(k){if(/^refs\/(heads|tags)\//.test(k))keep[k]=refs[k];});
  return create({name:opt.name||"Imported",app:opt.app,desc:opt.desc}).then(function(s){return load(s.id).then(function(r){r.refs=keep;r.head=hr?{ref:hr}:(head?{oid:head}:r.head);
    return treeFiles(headOid(r)).then(function(f){r.work=f;r.log=[{at:Date.now(),from:null,to:headOid(r),why:"brought in"}];return save(r);}).then(function(){return {id:r.id,objects:n,summary:summary(r)};});});});}
/* a .git folder's own files (from a zip or a folder): its packs, loose objects and refs */
function fromGitDir(get,names,opt){var packs=names.filter(function(n){return /^objects\/pack\/pack-[0-9a-f]{40}\.pack$/.test(n);}),loose=names.filter(function(n){return /^objects\/[0-9a-f]{2}\/[0-9a-f]{38}$/.test(n);}),count=0,s=store();
  var chain=Promise.resolve();
  packs.forEach(function(n){chain=chain.then(function(){return get(n).then(importObjects).then(function(k){count+=k;});});});
  loose.forEach(function(n){chain=chain.then(function(){return get(n).then(function(z){var rw=inflateZ(z,0).data,nul=rw.indexOf(0),hd=dec(rw.subarray(0,nul)).split(" ");
    return s.put(hd[0],rw.subarray(nul+1)).then(function(oid){if(oid!==n.slice(8,10)+n.slice(11))throw new Error("a loose object is not what its name says");count++;});});});});
  return chain.then(function(){var refs={},head=null,jobs=[];
    names.filter(function(n){return /^refs\/(heads|tags)\/./.test(n)&&!/\/$/.test(n);}).forEach(function(n){jobs.push(get(n).then(function(b){var v=dec(b).trim();if(/^[0-9a-f]{40}$/.test(v))refs[n]=v;}));});
    if(names.indexOf("packed-refs")>=0)jobs.push(get("packed-refs").then(function(b){dec(b).split("\n").forEach(function(l){var m=/^([0-9a-f]{40}) (refs\/\S+)/.exec(l);if(m&&!refs[m[2]])refs[m[2]]=m[1];});}));
    return Promise.all(jobs).then(function(){return names.indexOf("HEAD")>=0?get("HEAD").then(function(b){var v=dec(b).trim();if(/^ref: /.test(v))head=refs[v.slice(5)]||null;else if(/^[0-9a-f]{40}$/.test(v))head=v;}):null;})
      .then(function(){if(!Object.keys(refs).length)throw new Error("this .git holds no branches");return made(opt,refs,head,count);});});}
function fromZip(u8,opt){opt=opt||{};var z=unzip(u8),ents=z.entries.filter(function(e){return !e.dir&&!/(^|\/)__MACOSX\//.test(e.name)&&!/(^|\/)\.DS_Store$/.test(e.name);});
  if(!ents.length)throw new Error("this zip is empty");
  /* one folder around everything (GitHub's name-sha/): take it off */
  var tops={};ents.forEach(function(e){tops[e.name.split("/")[0]]=1;});var tk=Object.keys(tops),prefix=(tk.length===1&&ents.every(function(e){return e.name.indexOf("/")>0;}))?tk[0]+"/":"";
  var gitEnts=ents.filter(function(e){return e.name.indexOf(prefix+".git/")===0;});
  var get=function(e){return unzipData(u8,e);};
  if(gitEnts.length){var by={};gitEnts.forEach(function(e){by[e.name.slice((prefix+".git/").length)]=e;});
    return fromGitDir(function(n){return get(by[n]);},Object.keys(by),Object.assign({name:prefix?prefix.slice(0,-1):"Imported"},opt)).then(function(res){
      return status(res.id).then(function(st){res.changes=st.changes.length;return res;});});}
  var files=[],chain=Promise.resolve();
  ents.forEach(function(e){chain=chain.then(function(){return get(e).then(function(d){var t=e.unix&0o170000,m=t===0o120000?"120000":((e.unix&0o111)?"100755":(e.unix?"100644":null));files.push({path:e.name.slice(prefix.length),data:d,mode:m});});});});
  var name=opt.name||(prefix?prefix.slice(0,-1).replace(/-[0-9a-f]{7,40}$/,"").replace(/-(main|master)$/,""):"Imported");
  return chain.then(function(){return fromFiles(files,Object.assign({},opt,{name:name,msg:opt.msg||("Brought in from "+(opt.fileName||"a zip")+(/^[0-9a-f]{40}$/.test(z.comment)?" (GitHub commit "+z.comment.slice(0,7)+")":""))}));});}
/* files: [{path, data, mode?}] -> a new repository with them as its first commit */
function fromFiles(files,opt){opt=opt||{};return create({name:opt.name,app:opt.app,desc:opt.desc}).then(function(s){
  return putFiles(s.id,files,opt.onEach).then(function(){return opt.noCommit?null:commit(s.id,opt.msg||"First version");}).then(function(c){return {id:s.id,commit:c,files:files.length};});});}
function importAny(u8,opt){u8=u8of(u8);opt=opt||{};var head=dec(u8.subarray(0,16));
  if(/^# v[23] git bundle/.test(head))return fromBundle(u8,opt);
  if(u8[0]===0x50&&u8[1]===0x4b)return fromZip(u8,opt);
  return Promise.reject(new Error("Ingenium reads a zip or a git bundle here"));}

/* what is no longer named by any repository is let go */
function gc(){var live={},s=store();return backend().allRepos().then(function(rs){var tips=[];rs.forEach(function(r){Object.keys(r.refs).forEach(function(k){tips.push(r.refs[k]);});(r.log||[]).forEach(function(l){if(l.from)tips.push(l.from);if(l.to)tips.push(l.to);});
      if(r.merging&&r.merging.theirs)tips.push(r.merging.theirs);Object.keys(r.work||{}).forEach(function(p){live[r.work[p][1]]=1;});});
    function mark(oid){if(live[oid]===2)return Promise.resolve();live[oid]=2;return s.get(oid).then(function(o){if(!o)return;var ch=Promise.resolve();
      if(o.type==="commit"){var c=parseCommit(o.body);ch=ch.then(function(){return mark(c.tree);});c.parents.forEach(function(p){ch=ch.then(function(){return mark(p);});});}
      else if(o.type==="tree")parseTree(o.body).forEach(function(e){if(e.mode!=="160000")ch=ch.then(function(){return mark(e.oid);});});
      else if(o.type==="tag")ch=ch.then(function(){return mark(parseTag(o.body).object);});return ch;});}
    var chain=Promise.resolve();tips.forEach(function(t){chain=chain.then(function(){return mark(t);});});return chain;}).then(function(){
    var bases={},all=[];return backend().eachRec(function(k,v){all.push(k);if(v.base)bases[k]=v.base;}).then(function(){
      /* a version kept against another keeps that one, too */
      Object.keys(live).forEach(function(k){var b=bases[k];while(b&&!live[b]){live[b]=1;b=bases[b];}});
      var gone=all.filter(function(k){return !live[k];});return Promise.all(gone.map(function(k){s.cache.delete(k);return backend().delRec(k);})).then(function(){
        return (gone.length&&mshell()?remirror().catch(function(){}):null);}).then(function(){return {kept:all.length-gone.length,gone:gone.length};});});});}

/* ---------- on the computer apps, a second copy on disk beside the desk, for a web view that forgets ----------
   New objects go out in segments (each a big text the desk names, so nothing lets it go), each repository's record
   in one more; when the page's own store comes back empty, they are read back in. */
var MIR={fresh:new Set(),dirty:new Set(),timer:null,busy:null};
function mshell(){try{var a=(typeof shellApi==="function")?shellApi():null;return a&&typeof a.big_put==="function"&&typeof a.big_get==="function"?a:null;}catch(e){return null;}}
function mstate(){try{if(typeof state!=="object"||!state)return null;if(!state.yard||typeof state.yard!=="object")state.yard={};var y=state.yard;if(!y.mir)y.mir={segs:[],recs:{}};return y.mir;}catch(e){return null;}}
function bigId(){return "big_"+Date.now().toString(36)+Math.random().toString(36).slice(2,8);}
function b64(u8){var s="",CH=0x8000;for(var i=0;i<u8.length;i+=CH)s+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));return btoa(s);}
function unb64(t){var bin=atob(t),o=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)o[i]=bin.charCodeAt(i);return o;}
function mirrorSoon(id){if(!mshell())return;if(id)MIR.dirty.add(id);clearTimeout(MIR.timer);MIR.timer=setTimeout(function(){mirrorNow().catch(function(e){try{console.warn("repositories: the copy on disk was not written",e);}catch(_){}});},1500);}
function mirrorNow(){var a=mshell(),m=mstate();if(!a||!m)return Promise.resolve(false);if(MIR.busy)return MIR.busy.then(mirrorNow);
  var oids=Array.from(MIR.fresh),ids=Array.from(MIR.dirty);MIR.fresh.clear();MIR.dirty.clear();
  var job=Promise.resolve().then(function(){var segs=[],cur=[],n=0;
    return oids.reduce(function(p,oid){return p.then(function(){return backend().getRec(oid).then(function(r){if(!r)return;cur.push([oid,r]);n+=r.b.length;if(n>24*1048576){segs.push(cur);cur=[];n=0;}});});},Promise.resolve()).then(function(){if(cur.length)segs.push(cur);
      return segs.reduce(function(p,seg){return p.then(function(){var head=seg.map(function(x){var r=x[1];return [x[0],r.t,r.n,r.base||0,r.d||0,r.z||0,r.b.length];}),body=cat(seg.map(function(x){return x[1].b;})),bid=bigId();
        return Promise.resolve(a.big_put(bid,"INGREPO1\n"+JSON.stringify(head)+"\n"+b64(body))).then(function(res){if(res&&res.ok===false)throw new Error(res.error||"not written");m.segs.push(bid);});});},Promise.resolve());});
  }).then(function(){return ids.reduce(function(p,id){return p.then(function(){return backend().getRepo(id).then(function(r){
      if(!r){if(m.recs[id]){try{a.big_del(m.recs[id]);}catch(e){}delete m.recs[id];}return;}
      var bid=m.recs[id]||bigId();return Promise.resolve(a.big_put(bid,JSON.stringify(r))).then(function(res){if(res&&res.ok===false)throw new Error(res.error||"not written");m.recs[id]=bid;});});});},Promise.resolve());})
  .then(function(){try{if(typeof saveState==="function")saveState();}catch(e){}return true;},function(e){oids.forEach(function(o){MIR.fresh.add(o);});ids.forEach(function(i){MIR.dirty.add(i);});throw e;});
  MIR.busy=job.then(function(){MIR.busy=null;},function(){MIR.busy=null;});return job;}
/* the page's store forgot (or never had) what the disk copy holds: bring it back */
var recovered=null;
function recover(){if(recovered)return recovered;var a=mshell(),m=mstate();if(!a||!m||!Object.keys(m.recs).length){recovered=Promise.resolve(0);return recovered;}
  recovered=backend().allRepos().then(function(have){var by={};have.forEach(function(r){by[r.id]=r;});var want=[];
    return Promise.all(Object.keys(m.recs).map(function(id){return Promise.resolve(a.big_get(m.recs[id])).then(function(res){if(!res||!res.ok)return;var r;try{r=JSON.parse(res.text);}catch(e){return;}
      if(!by[id]||(by[id].changed||0)<(r.changed||0))want.push(r);});})).then(function(){if(!want.length)return 0;
      /* every object any of them needs that this store lacks */
      return m.segs.reduce(function(p,bid){return p.then(function(){return Promise.resolve(a.big_get(bid)).then(function(res){if(!res||!res.ok)return;var t=res.text,i1=t.indexOf("\n"),i2=t.indexOf("\n",i1+1);if(t.slice(0,i1)!=="INGREPO1")return;
        var head=JSON.parse(t.slice(i1+1,i2)),body=unb64(t.slice(i2+1)),off=0;
        return head.reduce(function(q,h){var b=body.subarray(off,off+h[6]);off+=h[6];return q.then(function(){return backend().getRec(h[0]).then(function(x){if(x)return;var rec={t:h[1],n:h[2],b:b.slice()};if(h[3])rec.base=h[3];if(h[4])rec.d=h[4];if(h[5])rec.z=1;return backend().putRec(h[0],rec);});});},Promise.resolve());});});},Promise.resolve())
        .then(function(){return want.reduce(function(p,r){return p.then(function(){return backend().putRepo(r);});},Promise.resolve());}).then(function(){return want.length;});});}).catch(function(e){try{console.warn("repositories: the copy on disk could not be read",e);}catch(_){}return 0;});
  return recovered;}
/* after a gc, the disk copy is written again from what is kept, and the old segments let go */
function remirror(){var a=mshell(),m=mstate();if(!a||!m)return Promise.resolve(false);var old=m.segs.slice();
  return backend().eachRec(function(k){MIR.fresh.add(k);}).then(function(){return backend().allRepos();}).then(function(rs){rs.forEach(function(r){MIR.dirty.add(r.id);});
    m.segs=[];return mirrorNow();}).then(function(){old.forEach(function(b){try{a.big_del(b);}catch(e){}});return true;},function(e){m.segs=old.concat(m.segs);throw e;});}

/* R114: a ref moved by a copy brought from outside (GitHub's); when it is the branch in use, the working copy follows,
   and changes not yet committed come along when they do not clash */
function setRef(id,name,oid,opt){opt=opt||{};return locked(id,function(){return load(id).then(function(r){var k=/^refs\//.test(name)?name:"refs/heads/"+name;
  if(!okRefName(k.replace(/^refs\/(heads|tags)\//,"")))throw new Error("“"+name+"” cannot be a ref's name");if(!/^[0-9a-f]{40}$/.test(oid))throw new Error("not a version's id");
  var old=r.refs[k]||null,onIt=!!(r.head&&r.head.ref===k);
  function done(){r.refs[k]=oid;r.log=(r.log||[]).concat([{at:Date.now(),from:old,to:oid,why:opt.why||("ref "+k+" set")}]).slice(-200);return save(r).then(summary);}
  if(!onIt||old===oid)return done();
  return Promise.all([treeFiles(old),treeFiles(oid)]).then(function(x){var cur=x[0],next=x[1],mine=changesBetween(cur,r.work),work={},p,clash=[];for(p in next)work[p]=next[p];
    mine.forEach(function(c){var p2=c.path;if((cur[p2]?cur[p2][1]:null)!==(next[p2]?next[p2][1]:null)||(c.from&&(cur[c.from]?cur[c.from][1]:null)!==(next[c.from]?next[c.from][1]:null)))clash.push(p2);});
    if(clash.length&&!opt.force)throw new Error("your changes to "+clash.slice(0,4).join(", ")+(clash.length>4?" and others":"")+" would be lost: commit them first");
    if(!opt.force)mine.forEach(function(c){if(c.kind==="removed")delete work[c.path];else{if(c.from)delete work[c.from];work[c.path]=c.now;}});
    r.work=work;return done();});});});}
/* notes kept beside a version: its test results, the packages made from it */
function setNote(id,oid,key,val){return locked(id,function(){return load(id).then(function(r){r.notes=r.notes||{};var n=r.notes[oid]=r.notes[oid]||{};if(val==null)delete n[key];else n[key]=val;
  var ks=Object.keys(r.notes);if(ks.length>400)ks.slice(0,ks.length-400).forEach(function(k){delete r.notes[k];});return save(r).then(function(){return n;});});});}
function notes(id,oid){return load(id).then(function(r){var n=r.notes||{};return oid?(n[oid]||{}):n;});}
function headOf(id){return load(id).then(function(r){return headOid(r);});}
function _use(be){BE=be;ST=new Store(be);ST.onPut=function(oid){if(mshell())MIR.fresh.add(oid);};locks={};recovered=null;}
return {create:create,list:list,info:info,rename:rename,remove:remove,
  put:putFile,putMany:putFiles,del:delFile,move:moveFile,read:readFile,readText:readText,files:files,
  status:status,commit:commit,log:log,diff:diff,branch:branch,delBranch:delBranch,tag:tag,delTag:delTag,switchTo:switchTo,discard:discard,restore:restore,
  merge:merge,stopMerge:stopMerge,revert:revert,
  setNote:setNote,notes:notes,head:headOf,resolve:function(id,ref){return load(id).then(function(r){return resolve(r,ref);});},setRef:setRef,
  bundle:bundle,gitFolder:gitFolder,sourceZip:sourceZip,importAny:importAny,fromZip:fromZip,fromBundle:fromBundle,fromFiles:fromFiles,gc:gc,setAuthor:setAuthor,author:function(){return who;},
  core:{sha1:sha1,sha1JS:sha1JS,inflateRaw:inflateRaw,inflateZ:inflateZ,deflateZ:deflateZ,storedZ:storedZ,makeDelta:makeDelta,applyDelta:applyDelta,writePack:writePack,readPack:readPack,
    zip:zip,unzip:unzip,unzipData:unzipData,lineDiff:lineDiff,hunks:hunks,merge3:merge3,unified:unified,splitLines:splitLines,parseTree:parseTree,parseCommit:parseCommit,treeBody:treeBody,
    okRefName:okRefName,cleanPath:cleanPath,crc32:crc32,MemBackend:MemBackend,use:_use,store:store,mirrorNow:mirrorNow,recover:recover,remirror:remirror}};
})();
window.IngRepo=IngRepo;
;try{window.__ingParts["p42"]="running";}catch(_){}
</script>
