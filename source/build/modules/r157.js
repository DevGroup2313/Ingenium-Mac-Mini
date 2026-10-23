<style id="r157-css">
/* ============ R157 · INGENIUM'S EYES ============
   The owner asked (22 October 2026) that basic picture recognition work offline, with no projector and no model that can
   see. Measured on 6.1: a picture sent to a model that reads text only was answered "the loaded model does not report
   image input, so it cannot see the picture", and on a tablet or a phone "the engine on this tablet reads text only".
   Now Ingenium looks at the picture itself, on the device, with nothing fetched:
   - what it may show: MobileNet v2, an image classifier trained on ImageNet's thousand kinds of thing, its weights in
     eight bits (3.6 MB instead of 14), run by TensorFlow.js;
   - the words in it: Tesseract, the text recogniser, with its English data, run in a worker of its own;
   - its colours, named, and whether it is a photo, a screenshot, a page of text or a drawing;
   - its facts: its size, its kind of file, and what a camera wrote in it (the camera, the day).
   The chat sends a model that reads text only what Ingenium saw, and shows it under the message ("What Ingenium saw").
   With no model loaded, Ingenium answers with what it saw. Settings has its switches and a "Try it on a picture" key.
   Everything it needs rides in the page (eyes/eyes.pack, made by eyes/make_eyes.py; all Apache-2.0). */
.eyes-card{margin:8px 0 2px;border:1px solid var(--hairline);border-radius:11px;background:var(--card);font:500 12.5px/1.5 var(--sans);color:var(--ink-2);max-width:560px;text-align:left}
.eyes-card > summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:7px;padding:7px 11px;font-weight:650;color:var(--ink-1);min-width:0;border-radius:11px}
.eyes-card > summary::-webkit-details-marker{display:none}
.eyes-card > summary::after{content:"▾";margin-left:auto;padding-left:6px;opacity:.65;transition:transform .2s}
.eyes-card[open] > summary::after{transform:rotate(180deg)}
.eyes-card > summary:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
.eyes-card .ey-i{font-size:14px;line-height:1}
.eyes-card .ey-s{font-weight:500;color:var(--ink-3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;flex:1 1 auto}
.eyes-card .ey-b{padding:2px 12px 11px;display:grid;grid-template-columns:auto minmax(0,1fr);gap:5px 12px;margin:0}
.eyes-card dt{font:700 10.5px/1.9 var(--sans);letter-spacing:.05em;text-transform:uppercase;color:var(--ink-3)}
.eyes-card dd{margin:0;min-width:0;overflow-wrap:anywhere}
.eyes-card .ey-words{white-space:pre-wrap;font:12px/1.5 var(--mono);background:var(--bg);border:1px solid var(--hairline);border-radius:8px;padding:6px 9px;max-height:220px;overflow:auto;margin:0 0 5px}
.eyes-card .ey-sw{display:inline-block;width:11px;height:11px;border-radius:3px;border:1px solid var(--hairline);vertical-align:-1px;margin-right:4px}
.eyes-card .ey-col{display:inline-block;margin:0 10px 0 0;white-space:nowrap}
.eyes-card .ey-foot{font-size:11.5px;color:var(--ink-3);padding:0 12px 10px;margin-top:-4px}
.eyes-card .ey-bar{display:inline-block;height:6px;border-radius:3px;background:var(--accent);opacity:.55;vertical-align:1px;margin-left:6px}
#ingEyesCard .ey-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:10px 0 0}
#ingEyesCard .ey-row > span{display:flex;flex-direction:column;gap:2px}
#ingEyesCard .ey-try{margin-top:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
#ingEyesCard .ey-out{margin-top:8px}
#ingEyesCard .ey-out .eyes-card{max-width:none}
#ingEyesCard .ey-made{margin-top:12px}
#ingEyesCard .ey-notice > summary{cursor:pointer;color:var(--ink-3);margin:4px 0}
#ingEyesCard .ey-notice .ey-words{white-space:pre-wrap;font:11.5px/1.5 var(--mono);background:var(--bg);border:1px solid var(--hairline);border-radius:8px;padding:8px 10px;max-height:260px;overflow:auto;margin:6px 0 0;color:var(--ink-2)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p78"]="started";}catch(_){}
/* R157 · Ingenium's eyes: see the note at the top of its styles */
(function(){"use strict";
if(window.__r157)return;window.__r157=1;
var W=window,PACK="ing-eyes",LANG="https://eyes.ingenium.invalid/eng";
var P=null,URLS={},TF=null,NET=null,LABELS=null,TESS=null,TESS_P=null,nap=0,busy=0;
function $(id){return document.getElementById(id);}
function have(){return !!$(PACK);}
function on(){try{return have()&&state.eyes!==false;}catch(e){return have();}}
function wordsOn(){try{return state.eyesWords!==false;}catch(e){return true;}}
function pct(p){return Math.round(p*100)+"%";}

/* ---------- the pack: opened once, each part unpacked and checked against its size ---------- */
function open(){if(P)return Promise.resolve(P);var el=$(PACK);
  if(!el)return Promise.reject(new Error("this copy of Ingenium carries no picture reader"));
  return new Promise(function(res){var s=atob(el.textContent.trim()),n=s.length,u=new Uint8Array(n);for(var i=0;i<n;i++)u[i]=s.charCodeAt(i);
    if(String.fromCharCode.apply(null,u.subarray(0,8))!=="INGEYES1")throw new Error("the picture reader's pack is not whole");
    var hl=u[8]|(u[9]<<8)|(u[10]<<16)|(u[11]<<24);
    P={h:JSON.parse(new TextDecoder().decode(u.subarray(12,12+hl))),base:12+hl,u:u};res(P);});}
function gunzip(z){try{if(typeof DecompressionStream==="function")
    return new Response(new Blob([z]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer().then(function(b){return new Uint8Array(b);},function(){return ingInflateGzip(z);});}catch(e){}
  return Promise.resolve().then(function(){return ingInflateGzip(z);});}
function part(name){return open().then(function(p){var d=p.h.parts[name];if(!d)throw new Error("the picture reader has no "+name);
  var z=p.u.subarray(p.base+d.o,p.base+d.o+d.n);
  return (d.gz?gunzip(z):Promise.resolve(z.slice())).then(function(b){if(b.length!==d.size)throw new Error("the picture reader's "+name+" did not unpack whole");return b;});});}
function url(name,type){if(URLS[name])return Promise.resolve(URLS[name]);
  return part(name).then(function(b){return URLS[name]=URL.createObjectURL(new Blob([b],{type:type}));});}
var RAN={};
function script(name){if(RAN[name])return RAN[name];
  RAN[name]=url(name,"text/javascript").then(function(u){return new Promise(function(res,rej){var s=document.createElement("script");s.src=u;
    s.onload=function(){res();};s.onerror=function(){delete RAN[name];rej(new Error("the picture reader's "+name+" did not start"));};document.head.appendChild(s);});});
  return RAN[name];}

/* ---------- what it may show: MobileNet v2 ---------- */
function net(){if(NET)return NET;
  /* the graphics card where there is one (TensorFlow.js falls back to the processor by itself when it cannot start it) */
  NET=script("tf").then(function(){TF=W.tf;if(!TF)throw new Error("TensorFlow.js did not start");try{TF.enableProdMode();}catch(e){}return TF.ready();})
    .then(function(){return Promise.all([part("mnv2.json"),part("mnv2.bin"),part("labels")]);})
    .then(function(r){var m=JSON.parse(new TextDecoder().decode(r[0])),w=r[1];LABELS=JSON.parse(new TextDecoder().decode(r[2]));
      return TF.loadGraphModel(TF.io.fromMemory({modelTopology:m.modelTopology,weightSpecs:m.weightSpecs,weightData:w.buffer.slice(w.byteOffset,w.byteOffset+w.byteLength)}));})
    .catch(function(e){NET=null;throw e;});
  return NET;}
function classify(c,again){return net().then(function(model){var tf=TF;
    var t=tf.tidy(function(){var x=tf.browser.fromPixels(c).toFloat().div(255).expandDims(0);return tf.softmax(tf.slice(model.predict(x),[0,1],[-1,1000]));});
    return t.data().then(function(d){t.dispose();var ix=[];for(var i=0;i<d.length;i++)ix.push(i);ix.sort(function(a,b){return d[b]-d[a];});
      if(!(d[ix[0]]>=0))throw new Error("the classifier gave no answer");
      return ix.slice(0,5).map(function(i){return {name:String(LABELS[i]).split(",")[0].trim(),all:LABELS[i],p:d[i]};});});})
  .catch(function(e){/* a graphics card that fails (a lost context, a driver): once more on the processor */
    if(again||!TF||TF.getBackend()==="cpu")throw e;var m=NET;NET=null;
    return Promise.resolve(m).then(function(x){try{x.dispose();}catch(_){}},function(){}).then(function(){return TF.setBackend("cpu");}).then(function(){return classify(c,true);});});}

/* ---------- the words in it: Tesseract, in a worker of its own, its parts handed to it from the pack ---------- */
var PRELUDE="(function(E){var f=self.fetch.bind(self);self.fetch=function(u,o){var s=String(u&&u.url||u);if(s.indexOf(E.lang)===0)return f(E.eng);return f(u,o);};"+
  "importScripts(E.core);var C=self.TesseractCore;self.TesseractCore=function(o){o=o||{};o.locateFile=function(p){return /\\.wasm$/.test(p)?E.wasm:p;};return C(o);};})(self.__ingEyes);\n";
function reader(){if(TESS_P)return TESS_P;
  TESS_P=Promise.all([script("tesseract"),url("core.js","text/javascript"),url("core.wasm","application/wasm"),url("eng","application/gzip"),part("worker")])
    .then(function(r){if(!W.Tesseract)throw new Error("the text recogniser did not start");
      var wb=URL.createObjectURL(new Blob(["self.__ingEyes="+JSON.stringify({core:r[1],wasm:r[2],eng:r[3],lang:LANG.replace(/\/eng$/,"")})+";\n",PRELUDE,r[4]],{type:"text/javascript"}));
      return W.Tesseract.createWorker("eng",1,{workerPath:wb,workerBlobURL:false,corePath:r[1],langPath:LANG.replace(/\/eng$/,""),cacheMethod:"none",gzip:true})
        .then(function(w){TESS=w;setTimeout(function(){URL.revokeObjectURL(wb);},1000);return w;});})
    .catch(function(e){TESS_P=null;throw e;});
  return TESS_P;}
function lettersShare(t){var a=(t.match(/[A-Za-z0-9À-ž]/g)||[]).length,n=t.replace(/\s/g,"").length;return n?a/n:0;}
function read(c,kind){return reader().then(function(w){return w.recognize(c,{},{text:true,blocks:true});}).then(function(r){var d=(r&&r.data)||{},lines=[];
  (d.blocks||[]).forEach(function(b){(b.paragraphs||[]).forEach(function(p){(p.lines||[]).forEach(function(l){lines.push(l);});});});
  if(!lines.length&&d.lines)lines=d.lines;
  /* what a photo's leaves and waves look like to a text recogniser is left out: a photo needs surer lines */
  var min=kind==="photo"?75:55,kept=[];
  lines.forEach(function(l){var t=String(l.text||"").replace(/\s+$/,"").replace(/^\s+/,"");if(!t)return;
    if((+l.confidence||0)>=min&&/[A-Za-z0-9]{2,}/.test(t)&&lettersShare(t)>=0.6)kept.push(t);});
  return kept.join("\n").replace(/\n{3,}/g,"\n\n").trim();});}
function timed(p,ms,what){return Promise.race([p,new Promise(function(_,rej){setTimeout(function(){rej(new Error(what+" took longer than "+Math.round(ms/1000)+" seconds"));},ms);})]);}

/* ---------- the picture's own facts: its file, and what a camera wrote in it ---------- */
function bytesOf(src){try{var b=src.buf;if(b instanceof ArrayBuffer)return new Uint8Array(b);if(b&&b.buffer instanceof ArrayBuffer)return new Uint8Array(b.buffer,b.byteOffset,b.byteLength);}catch(e){}
  try{var du=String(src.dataUrl||""),i=du.indexOf(",");if(i<0)return null;var s=atob(du.slice(i+1)),u=new Uint8Array(s.length);for(var j=0;j<s.length;j++)u[j]=s.charCodeAt(j);return u;}catch(e){return null;}}
function exif(u){var out={};try{if(!u||u[0]!==0xFF||u[1]!==0xD8)return out;var p=2;
  while(p+4<u.length&&u[p]===0xFF){var mk=u[p+1],len=(u[p+2]<<8)|u[p+3];
    if(mk===0xE1&&u[p+4]===0x45&&u[p+5]===0x78&&u[p+6]===0x69&&u[p+7]===0x66){var t=p+10,le=u[t]===0x49;
      var r16=function(o){return le?u[t+o]|(u[t+o+1]<<8):(u[t+o]<<8)|u[t+o+1];},r32=function(o){return le?(u[t+o]|(u[t+o+1]<<8)|(u[t+o+2]<<16)|(u[t+o+3]<<24))>>>0:((u[t+o]<<24)|(u[t+o+1]<<16)|(u[t+o+2]<<8)|u[t+o+3])>>>0;};
      var str=function(o,n){var s="";for(var k=0;k<n&&t+o+k<u.length;k++){var ch=u[t+o+k];if(!ch)break;s+=String.fromCharCode(ch);}return s.trim();};
      var ifd=function(o,want){var n=r16(o);for(var k=0;k<n&&k<400;k++){var e=o+2+k*12,tag=r16(e),typ=r16(e+2),cnt=r32(e+4),vo=cnt>4?r32(e+8):e+8;
          if(want[tag]){if(typ===2)out[want[tag]]=str(vo,cnt);else if(typ===3)out[want[tag]]=r16(e+8);else if(typ===4)out[want[tag]]=r32(e+8);}}};
      ifd(r32(4),{0x010F:"make",0x0110:"model",0x0131:"software",0x0132:"date",0x8769:"_exif",0x8825:"_gps"});
      if(out._exif)ifd(out._exif,{0x9003:"taken"});out.gps=!!out._gps;delete out._exif;delete out._gps;return out;}
    if(mk===0xDA)break;p+=2+len;}}catch(e){}return out;}
function screenshotMark(u){try{if(!u)return false;var n=Math.min(u.length,96000),s="";for(var i=0;i<n;i+=8192)s+=String.fromCharCode.apply(null,u.subarray(i,Math.min(n,i+8192)));
  return /Screenshot|Bildschirmfoto|Capture d.écran/.test(s);}catch(e){return false;}}
var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
function day(s){var m=/^(\d{4}):(\d{2}):(\d{2})/.exec(String(s||""));if(!m||m[1]==="0000")return "";return (+m[3])+" "+MONTHS[(+m[2]-1)%12]+" "+m[1];}
function camera(x){var mk=String(x.make||"").trim(),md=String(x.model||"").trim();if(!md)return mk;
  if(mk&&md.toLowerCase().indexOf(mk.split(" ")[0].toLowerCase())===0)return md;return (mk?mk+" ":"")+md;}

/* ---------- its colours, named ---------- */
var NAMES=[["black",20,20,22],["charcoal",54,57,62],["dark grey",88,90,94],["grey",128,128,130],["light grey",188,190,193],["silver",214,216,219],["white",246,246,244],
  ["cream",243,234,210],["beige",222,205,170],["sand",200,176,128],["tan",176,138,92],["brown",124,82,48],["dark brown",72,46,28],["rust",168,74,38],
  ["orange",236,128,36],["peach",246,190,150],["gold",212,170,48],["yellow",246,222,60],["olive",120,120,44],["lime",168,212,70],["green",70,150,70],
  ["dark green",30,82,40],["mint",170,226,190],["teal",30,128,128],["turquoise",64,200,196],["sky blue",128,190,236],["light blue",176,208,236],["blue",44,96,200],
  ["navy",24,36,92],["slate blue",90,104,140],["lavender",190,170,226],["purple",118,64,160],["magenta",200,40,150],["pink",240,160,190],["rose",204,90,120],
  ["red",206,40,40],["dark red",120,24,30],["coral",240,120,96]];
function lab(r,g,b){function f(c){c/=255;return c>0.04045?Math.pow((c+0.055)/1.055,2.4):c/12.92;}r=f(r);g=f(g);b=f(b);
  var x=(r*0.4124+g*0.3576+b*0.1805)/0.95047,y=r*0.2126+g*0.7152+b*0.0722,z=(r*0.0193+g*0.1192+b*0.9505)/1.08883;
  function h(t){return t>0.008856?Math.cbrt(t):7.787*t+16/116;}x=h(x);y=h(y);z=h(z);return [116*y-16,500*(x-y),200*(y-z)];}
var NLAB=NAMES.map(function(n){return lab(n[1],n[2],n[3]);});
function nameOf(L){var best=0,bd=1e9;for(var i=0;i<NLAB.length;i++){var a=NLAB[i],d=(a[0]-L[0])*(a[0]-L[0])+(a[1]-L[1])*(a[1]-L[1])+(a[2]-L[2])*(a[2]-L[2]);if(d<bd){bd=d;best=i;}}return NAMES[best][0];}
function hex(c){return "#"+c.map(function(v){return ("0"+Math.max(0,Math.min(255,Math.round(v))).toString(16)).slice(-2);}).join("");}
/* a small k-means in Lab over a sample of the picture: six groups, the close ones joined, those under four in a hundred left out */
function colours(px,n){var pts=[],step=Math.max(1,Math.floor(n/3000));
  for(var i=0;i<n;i+=step){var o=i*4;if(px[o+3]<128)continue;pts.push([px[o],px[o+1],px[o+2],lab(px[o],px[o+1],px[o+2])]);}
  if(!pts.length)return [];pts.sort(function(a,b){return a[3][0]-b[3][0];});
  var K=Math.min(6,pts.length),cen=[];for(var k=0;k<K;k++)cen.push(pts[Math.floor((k+0.5)*pts.length/K)][3].slice());
  var asg=new Array(pts.length);
  for(var it=0;it<8;it++){var sum=cen.map(function(){return [0,0,0,0];});
    for(var j=0;j<pts.length;j++){var L=pts[j][3],bi=0,bd=1e9;for(var c=0;c<K;c++){var q=cen[c],d=(q[0]-L[0])*(q[0]-L[0])+(q[1]-L[1])*(q[1]-L[1])+(q[2]-L[2])*(q[2]-L[2]);if(d<bd){bd=d;bi=c;}}
      asg[j]=bi;var s=sum[bi];s[0]+=L[0];s[1]+=L[1];s[2]+=L[2];s[3]++;}
    for(c=0;c<K;c++)if(sum[c][3])cen[c]=[sum[c][0]/sum[c][3],sum[c][1]/sum[c][3],sum[c][2]/sum[c][3]];}
  var gs=cen.map(function(q){return {lab:q,rgb:[0,0,0],n:0};});
  for(j=0;j<pts.length;j++){var g=gs[asg[j]];g.n++;g.rgb[0]+=pts[j][0];g.rgb[1]+=pts[j][1];g.rgb[2]+=pts[j][2];}
  gs=gs.filter(function(g){return g.n;}).map(function(g){g.rgb=g.rgb.map(function(v){return v/g.n;});g.name=nameOf(g.lab);return g;});
  var byName={};gs.forEach(function(g){var b=byName[g.name];if(!b)byName[g.name]=g;else{var t=b.n+g.n;b.rgb=b.rgb.map(function(v,i){return (v*b.n+g.rgb[i]*g.n)/t;});b.n=t;}});
  return Object.keys(byName).map(function(k){var g=byName[k];return {name:k,share:g.n/pts.length,hex:hex(g.rgb)};})
    .filter(function(g){return g.share>=0.04;}).sort(function(a,b){return b.share-a.share;}).slice(0,5);}
/* how flat the picture is (a screen's or a drawing's even fields against a photo's grain), how much of it is near white,
   how bright and how colourful */
function measures(px,w,h){var flat=0,pairs=0,white=0,Ls=0,Cs=0,n=w*h;
  for(var y=0;y<h;y++)for(var x=0;x<w;x++){var o=(y*w+x)*4,r=px[o],g=px[o+1],b=px[o+2];
    if(r>232&&g>232&&b>232)white++;var mx=Math.max(r,g,b),mn=Math.min(r,g,b);Ls+=(mx+mn)/510;Cs+=(mx-mn)/255;
    if(x+1<w){var p=o+4;pairs++;if(Math.abs(r-px[p])<=3&&Math.abs(g-px[p+1])<=3&&Math.abs(b-px[p+2])<=3)flat++;}}
  return {flat:pairs?flat/pairs:0,white:white/n,light:Ls/n,chroma:Cs/n};}
function kindOf(m,meta,words){var nw=words?words.split(/\s+/).length:0;
  if(meta.camera)return "photo";
  if(meta.screenshot)return nw>=40&&m.white>0.55?"document":"screenshot";
  if(m.flat>0.55){if(nw>=40&&m.white>0.5)return "document";if(nw>=3||meta.lossless)return nw>=3?"screenshot":"drawing";return "drawing";}
  if(nw>=40&&m.white>0.5)return "document";
  if(m.flat<0.3)return "photo";
  return meta.lossless?(nw>=3?"screenshot":"drawing"):"photo";}
var KIND={photo:"a photo",screenshot:"a screenshot",document:"a page of text (a document, a scan or a screenshot of one)",drawing:"a drawing, a diagram or a graphic"};

/* ---------- the picture: drawn at the sizes each part reads ---------- */
function load(src){return new Promise(function(res,rej){var im=new Image();im.onload=function(){res(im);};im.onerror=function(){rej(new Error("the picture could not be opened"));};im.src=src;});}
function draw(im,w,h){var c=document.createElement("canvas");c.width=Math.max(1,w);c.height=Math.max(1,h);var x=c.getContext("2d",{willReadFrequently:true});
  x.imageSmoothingEnabled=true;try{x.imageSmoothingQuality="high";}catch(e){}x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);return c;}
function fitIn(im,L){var w=im.naturalWidth,h=im.naturalHeight,s=Math.min(1,L/Math.max(w,h));return draw(im,Math.round(w*s),Math.round(h*s));}
function forWords(im,kind){var w=im.naturalWidth,h=im.naturalHeight,L=Math.max(w,h),s=1;if(L>2400)s=2400/L;else if(kind!=="photo"&&L<1100)s=Math.min(2,1500/L);return draw(im,Math.round(w*s),Math.round(h*s));}

/* ---------- a look: every part at once, each part's trouble kept apart so the others still count ---------- */
function look(src,opt){opt=opt||{};var t0=Date.now(),probs=[];
  if(!have())return Promise.reject(new Error("this copy of Ingenium carries no picture reader"));
  busy++;clearTimeout(nap);
  /* the picture as it was chosen where there is one (its own size, its camera's notes), else the chat's smaller copy */
  var file=src.file&&typeof src.file.slice==="function"?src.file:null,fu=null,head=null;
  var opened=file?file.slice(0,262144).arrayBuffer().then(function(b){head=new Uint8Array(b);fu=URL.createObjectURL(file);return load(fu);})
    .catch(function(){file=null;return load(src.dataUrl||src.url);}):load(src.dataUrl||src.url);
  function done(){if(fu)try{URL.revokeObjectURL(fu);}catch(e){}busy--;later();}
  return opened.then(function(im){
    var u=file?head:bytesOf(src),mime=file&&file.type?file.type:(/^data:([^;,]+)/.exec(String(src.dataUrl||""))||[])[1]||"",x=exif(u);
    var meta={camera:camera(x),taken:day(x.taken||x.date),gps:!!x.gps,software:x.software||"",screenshot:/png/i.test(mime)&&screenshotMark(u),
      lossless:/png|gif|bmp/i.test(mime),mime:mime,bytes:file?file.size:(u?u.length:0),w:im.naturalWidth,h:im.naturalHeight};
    var sm=fitIn(im,200),d=sm.getContext("2d").getImageData(0,0,sm.width,sm.height).data,m=measures(d,sm.width,sm.height),pre=kindOf(m,meta,"");
    var jobs=[timed(classify(draw(im,224,224)),60000,"Recognising what it shows").catch(function(e){probs.push("what it shows: "+(e&&e.message||e));return null;})];
    jobs.push(opt.words===false||!wordsOn()?Promise.resolve(null):timed(read(forWords(im,pre),pre),90000,"Reading its words").catch(function(e){probs.push("its words: "+(e&&e.message||e));return null;}));
    var cols=colours(d,sm.width*sm.height);
    return Promise.all(jobs).then(function(r){var labels=r[0],words=r[1],kind=kindOf(m,meta,words||"");
      var sure=(labels||[]).filter(function(l){return l.p>=0.05;}).slice(0,4);
      var s={v:1,name:src.name||"",w:meta.w,h:meta.h,mime:meta.mime,bytes:meta.bytes,kind:kind,kindText:KIND[kind],camera:meta.camera,taken:meta.taken,gps:meta.gps,
        labels:labels?sure.map(function(l){return {name:l.name,p:Math.round(l.p*1000)/1000};}):null,
        colours:cols,light:Math.round(m.light*100)/100,chroma:Math.round(m.chroma*100)/100,
        words:words==null?null:words.slice(0,8000),ms:Date.now()-t0,problems:probs};
      s.line=line(s);return s;});})
  .then(function(s){done();return s;},function(e){done();throw e;});}
/* after two minutes without a look, the reader and the classifier let go of their memory */
function later(){clearTimeout(nap);nap=setTimeout(sleep,120000);}
function sleep(){if(busy)return later();try{if(TESS)TESS.terminate();}catch(e){}TESS=null;TESS_P=null;
  if(NET)NET.then(function(m){try{m.dispose();}catch(e){}},function(){});NET=null;
  Object.keys(URLS).forEach(function(k){if(k==="tf"||k==="tesseract")return;try{URL.revokeObjectURL(URLS[k]);}catch(e){}delete URLS[k];});P=null;}

/* ---------- what it saw, in words: for the card, and for a model that reads text only ---------- */
function tone(s){var t=[];if(s.chroma<0.06)t.push("in greys or black and white");else if(s.chroma>0.35)t.push("colourful");else if(s.chroma<0.14)t.push("muted");
  if(s.light<0.3)t.push("dark");else if(s.light>0.78)t.push("bright");return t.join(", ");}
function line(s){var b=[s.kind==="document"?"a page of text":KIND[s.kind]];
  if(s.labels&&s.labels.length)b.push(s.labels.slice(0,2).map(function(l){return l.name;}).join(", "));
  if(s.words!=null)b.push(s.words?s.words.split(/\s+/).length+" words":"no words");return b.join(" · ");}
function fmtB(n){try{return fmtBytes(n);}catch(e){return Math.round(n/1024)+" KB";}}
function factsText(s){var f=s.w+" × "+s.h+" pixels";var ty=(s.mime.split("/")[1]||"").replace("jpeg","JPEG").replace("png","PNG").replace("webp","WebP").replace("gif","GIF").replace("heic","HEIC");
  if(ty)f+=", "+ty;if(s.bytes)f+=", "+fmtB(s.bytes);return f;}
function takenText(s){if(!s.camera&&!s.taken)return "";return "taken"+(s.camera?" with a "+s.camera:"")+(s.taken?" on "+s.taken:"");}
function note(x){var s=x&&x.seen;if(!s||!s.v)return "";var L=[];
  L.push("[A picture is attached to this message"+(s.name?" (\""+s.name+"\")":"")+". You cannot see pictures, so Ingenium's own picture reader looked at it on this device. What it found:");
  L.push("- What it is: "+s.kindText+", "+s.w+" × "+s.h+" pixels"+(takenText(s)?", "+takenText(s):"")+".");
  if(s.labels)L.push(s.labels.length?"- What it may show (an image classifier's best guesses, with how sure it is): "+s.labels.map(function(l){return l.name+" "+pct(l.p);}).join(", ")+".":"- What it may show: nothing the image classifier recognises with confidence.");
  if(s.colours&&s.colours.length)L.push("- Main colours: "+s.colours.map(function(c){return c.name+" "+pct(c.share);}).join(", ")+(tone(s)?" ("+tone(s)+")":"")+".");
  if(s.words!=null)L.push(s.words?"- Words read in it by text recognition (they may hold mistakes):\n\"\"\"\n"+s.words.slice(0,3000)+(s.words.length>3000?"\n[…]":"")+"\n\"\"\"":"- Words: none that text recognition could read.");
  L.push("Answer from this report. Where a question needs more than it tells, say what can be told from it, and that a model that can see pictures would tell more.]");
  return L.join("\n");}
function el(tag,cls,text){var n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;}
function card(s,openIt,foot){var d=el("details","eyes-card");if(openIt)d.open=true;
  var sm=el("summary");sm.appendChild(el("span","ey-i","👁")).setAttribute("aria-hidden","true");sm.appendChild(el("b",null,"What Ingenium saw"));sm.appendChild(el("span","ey-s"," · "+s.line));d.appendChild(sm);
  var dl=el("dl","ey-b");function row(k,v){dl.appendChild(el("dt",null,k));var dd=el("dd");if(typeof v==="string")dd.textContent=v;else dd.appendChild(v);dl.appendChild(dd);return dd;}
  row("What it is",KIND[s.kind].charAt(0).toUpperCase()+KIND[s.kind].slice(1)+(takenText(s)?", "+takenText(s):"")+".");
  if(s.labels){if(s.labels.length){var lv=el("span");s.labels.forEach(function(l,i){var it=el("span","ey-col");it.textContent=l.name+" "+pct(l.p);var bar=el("span","ey-bar");bar.style.width=Math.max(4,Math.round(l.p*60))+"px";bar.setAttribute("aria-hidden","true");it.appendChild(bar);lv.appendChild(it);});row("It may show",lv);}
    else row("It may show","Nothing it recognises with confidence.");}
  if(s.colours&&s.colours.length){var cv=el("span");s.colours.forEach(function(c){var it=el("span","ey-col"),sw=el("span","ey-sw");sw.style.background=c.hex;sw.setAttribute("aria-hidden","true");it.appendChild(sw);it.appendChild(document.createTextNode(c.name+" "+pct(c.share)));cv.appendChild(it);});
    if(tone(s))cv.appendChild(el("span","ey-col","("+tone(s)+")"));row("Colours",cv);}
  if(s.words!=null){if(s.words){var wv=el("span"),pre=el("div","ey-words",s.words);pre.tabIndex=0;pre.setAttribute("role","region");pre.setAttribute("aria-label","The words read in the picture");wv.appendChild(pre);
      var cp=el("button","btn xs ghost","Copy the words");cp.type="button";cp.onclick=function(){var t=s.words;
        (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t):Promise.reject()).then(function(){cp.textContent="Copied";},function(){
          try{var ta=el("textarea");ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();cp.textContent="Copied";}catch(e){}});
        setTimeout(function(){cp.textContent="Copy the words";},1600);};wv.appendChild(cp);row("Words in it",wv);}
    else row("Words in it","None it could read.");}
  row("The file",factsText(s)+(s.gps?". It records where it was taken (the place is not passed on).":"."));
  var ft=el("div","ey-foot",foot||"Seen on this device by Ingenium's own picture reader, in "+(s.ms/1000).toFixed(1)+" seconds. Nothing was sent anywhere.");
  if(s.problems&&s.problems.length)ft.textContent+=" Not seen: "+s.problems.join("; ")+".";
  d.appendChild(dl);d.appendChild(ft);return d;}

/* ---------- the chat ---------- */
function activeModel(){try{return state.models.filter(function(x){return x.id===state.activeModelId;})[0]||null;}catch(e){return null;}}
/* "live": the loaded model reads text only; "none": there is no model to answer; false: a model will see it, or it goes
   through a connection (pictures never do), or Ingenium already looked */
function needs(rec){if(!rec||!rec.cid||rec.seen||rec.seenTried||!on())return false;if(typeof chatImages==="undefined"||!chatImages[rec.cid])return false;return wouldNeed();}
function wouldNeed(){if(!on())return false;
  try{if(chatSource()==="cloud"&&state.cloud&&state.cloud.on&&state.cloud.provider)return false;}catch(e){}
  var m=activeModel(),live=Engine.status==="ready"&&m&&Engine.modelId===m.id;
  if(live)return (Engine.adapter&&Engine.adapter.hasImageInput)?false:"live";
  var loadable=false;try{loadable=!!((typeof INB!=="undefined"&&INB&&m&&m.nativeId)||(m&&m.fileState==="ready"&&DeskAdapter.accepts(m)));}catch(e){}
  return loadable?false:"none";}
function hookSend(){var os=W.sendRec;if(typeof os!=="function"||os.__eyes)return;
  var ns=function(rec){var self=this,args=arguments,why=false;try{why=needs(rec);}catch(e){why=false;}
    if(!why)return os.apply(self,args);
    var ms=curMsgs(),wait={role:"bot",preview:true,text:"👁 Ingenium is looking at the picture…"};ms.push(wait);trimChat();saveState();renderChat();
    look(chatImages[rec.cid]).then(function(s){rec.seen=s;},function(e){rec.seenTried=true;try{console.warn("Ingenium's eyes:",e&&e.message||e);}catch(_){}})
      .then(function(){var i=ms.indexOf(wait);if(i>=0)ms.splice(i,1);
        if(why==="none"&&rec.seen){ms.push({role:"bot",preview:true,seenCard:rec.seen,text:"No model is loaded, so this is what Ingenium's own picture reader saw. To talk about it, load a model on the Models page and send it again."});
          trimChat();saveState();renderChat();if(!String(rec.text||"").trim()&&!rec.attach&&!rec.attachRef)return;}
        saveState();renderChat();os.apply(self,args);});};
  ns.__eyes=1;W.sendRec=sendRec=ns;}
function hookPaint(){var of=W.fillMsg;if(typeof of!=="function"||of.__eyes)return;
  var nf=function(d,mm){var r=of.apply(this,arguments);
    try{if(mm&&(mm.seen&&mm.seen.v||mm.seenCard)&&!d.querySelector(":scope > .eyes-card")){var s=mm.seenCard||mm.seen;
        var foot=mm.seenCard?null:"Seen on this device by Ingenium's own picture reader, and sent to the model as a description, since it reads text only. Nothing was sent anywhere else.";
        d.appendChild(card(s,!!mm.seenCard,foot));}}catch(e){}
    return r;};
  nf.__eyes=1;W.fillMsg=fillMsg=nf;}

/* ---------- Settings: the switches, and a picture to try it on ---------- */
function settingsCard(){var pg=$("page-settings");if(!pg||$("ingEyesCard"))return;
  var c=el("div","card");c.id="ingEyesCard";c.setAttribute("role","region");c.setAttribute("aria-labelledby","ingEyesH");
  var h=el("h2","sec","Ingenium's eyes");h.id="ingEyesH";c.appendChild(h);
  c.appendChild(el("p","small muted","Ingenium can look at a picture itself, on this device, with nothing fetched: what it may show, the words in it, its colours and its facts. When the model you chat with reads text only, or on a tablet or a phone, the chat sends the model what Ingenium saw and shows it to you under your message."));
  function sw(id,title,sub,get,set){var r=el("div","ey-row"),t=el("span");t.appendChild(el("b",null,title));t.appendChild(el("span","small muted",sub));r.appendChild(t);
    var lb=el("label","eswitch"),inp=el("input");inp.type="checkbox";inp.id=id;inp.setAttribute("aria-label",title);inp.checked=get();inp.disabled=!have();
    inp.onchange=function(){set(inp.checked);saveState();};lb.title=title;lb.appendChild(inp);lb.appendChild(el("span","etrack"));r.appendChild(lb);c.appendChild(r);}
  sw("eyesOn","Describe pictures for models that read text only","so a picture is never simply left unseen",function(){return state.eyes!==false;},function(v){state.eyes=v;});
  sw("eyesWords","Read the words in pictures","text recognition, in English; a few seconds a picture",function(){return state.eyesWords!==false;},function(v){state.eyesWords=v;});
  var tr=el("div","ey-try"),kb=el("button","btn small","Try it on a picture…"),fi=el("input"),st=el("span","small muted");kb.type="button";fi.type="file";fi.accept="image/*";fi.hidden=true;
  fi.setAttribute("aria-label","A picture for Ingenium to look at");st.setAttribute("role","status");st.setAttribute("aria-live","polite");
  var out=el("div","ey-out");kb.onclick=function(){fi.click();};kb.disabled=!have();
  fi.onchange=function(){var f=fi.files&&fi.files[0];fi.value="";if(!f)return;var fr=new FileReader();
    fr.onload=function(){st.textContent="Looking…";kb.disabled=true;out.textContent="";
      look({name:f.name,dataUrl:fr.result}).then(function(s){st.textContent="";out.appendChild(card(s,true));},function(e){st.textContent="It could not look at it: "+(e&&e.message||e);})
        .then(function(){kb.disabled=false;});};
    fr.readAsDataURL(f);};
  tr.appendChild(kb);tr.appendChild(fi);tr.appendChild(st);c.appendChild(tr);c.appendChild(out);
  if(!have())c.appendChild(el("p","small muted","This copy of Ingenium carries no picture reader (a lean copy, such as the one the Forge carries)."));
  else{c.appendChild(el("p","small muted ey-made","Made with TensorFlow.js, MobileNet v2 and Tesseract.js, by their authors, under the Apache License 2.0; they are not part of Ingenium's own licence."));
    var nt=$("ing-eyes-notice");if(nt){var dn=el("details","ey-notice"),ds=el("summary","small","Their notices");dn.appendChild(ds);
      var pre=el("pre","ey-words",nt.textContent.replace(/<\\\//g,"</").trim());pre.tabIndex=0;pre.setAttribute("role","region");pre.setAttribute("aria-label","The notices of the picture reader's parts");dn.appendChild(pre);c.appendChild(dn);}}
  var at=$("linkCard")||$("personaCard");if(at&&at.parentNode===pg)pg.insertBefore(c,at.nextSibling);else pg.appendChild(c);}

/* a picture chosen for a model that reads text only: the reader starts while the message is written */
function hookStage(){var og=W.stageChatImage;if(typeof og!=="function"||og.__eyes)return;
  var ng=function(){var r=og.apply(this,arguments);try{if(wouldNeed())setTimeout(function(){warm().catch(function(){});},300);}catch(e){}return r;};
  ng.__eyes=1;W.stageChatImage=stageChatImage=ng;}
/* warm: both parts loaded, and one look at an empty picture so the graphics card has its programs ready */
var WARM=null;
function warm(){if(WARM)return WARM;busy++;clearTimeout(nap);
  WARM=Promise.all([net().then(function(){var c=document.createElement("canvas");c.width=c.height=224;return classify(c);}),wordsOn()?reader():null])
    .then(function(){WARM=null;busy--;later();return true;},function(e){WARM=null;busy--;later();throw e;});
  return WARM;}
function init(){try{hookSend();}catch(e){}try{hookPaint();}catch(e){}try{hookStage();}catch(e){}try{settingsCard();}catch(e){try{console.warn("Ingenium's eyes, Settings:",e);}catch(_){}}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
document.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest('.nav-btn[data-page="settings"]');if(t)setTimeout(settingsCard,0);},true);
W.IngEyes={available:have,on:on,look:look,note:note,card:card,line:line,sleep:sleep,
  warm:warm,
  status:function(){return {pack:have(),classifier:!!NET,reader:!!TESS,backend:TF&&TF.getBackend?TF.getBackend():null};}};
})();
;try{window.__ingParts["p78"]="running";}catch(_){}
</script>
