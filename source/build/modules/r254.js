<style id="r254-css">
/* ============ R254 · DICTATION ON THIS DEVICE, WITH SCRIBA'S SPEECH MODELS (Ingenium 6.56, 8 November 2026) ============
   The line under the message box while Ingenium listens or writes (the microphone key itself keeps its flat outline, as she
   asked: "like they are a part of the compose box"; .cplus-btn.rec is the page's own listening look). */
#page-chat .ears-line{font:500 12px/1.45 var(--sans,system-ui);color:var(--ink-2,#555);margin:4px 2px 0;min-height:0}
#page-chat .ears-line[hidden]{display:none}
#page-chat .ears-line b{font-weight:650;color:var(--ink-1,#222)}
#ingEarsCard .ears-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:10px 0 2px}
#ingEarsCard .ears-row label{font-size:13px;color:var(--ink-1,#222)}
#ingEarsCard select{font:inherit;font-size:13px;padding:5px 8px;border-radius:8px;border:1px solid var(--hairline,#ccc);background:var(--card,#fff);color:var(--ink-1,#222)}
#ingEarsCard .ears-state{font-size:12.5px;color:var(--ink-2,#555)}
#ingEarsCard .ears-warn{font-size:12.5px;color:var(--ink-2,#555);margin:4px 0 0 26px;max-width:62ch}
/* beside Ingenium's eyes on a wide window, so Search, eyes and ears stays as short as Settings' other sections (r234) */
@media (min-width:1100px){#page-settings:not(.rm-all) .rm-panel > #ingEyesCard.dx-on,#page-settings:not(.rm-all) .rm-panel > #ingEarsCard.dx-on{display:inline-block;vertical-align:top;width:calc(50% - 8px);box-sizing:border-box}
  #page-settings:not(.rm-all) .rm-panel > #ingEyesCard.dx-on{margin-right:12px !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p254"]="started";}catch(_){}
/* ============ R254 · DICTATION ON THIS DEVICE, WITH SCRIBA'S SPEECH MODELS (Ingenium 6.56, 8 November 2026) ============
   Her words (8 November 2026): "I want for Scriba and its speech models to be wired into the Chats pages compose text box instead
   sending it outside of the app to another provider. I want everything kept in-house where possible."
   Measured on 6.55: the microphone key in the message box (Chat and Code share it) used the browser's own speech service
   (window.SpeechRecognition), which in Chrome and Edge sends the sound to Google or Microsoft, and in Safari may send it to Apple
   (modules/r180.js said so before the first use); where the browser has no such service (Firefox, the Fire tablet's web view) the
   key was hidden.
   Now the key writes with Scriba's own speech models, in a worker on this device: Moonshine base for English (word error rate
   7.4 % in Scriba's measurement on 73 LibriSpeech clips), Whisper base for French, Haitian Creole and the other languages Whisper
   knows. The sound never leaves the device. The speech engine (transformers.js 3.8.1, the version Scriba uses, with ONNX Runtime
   Web) and the model are read, in this order: from the speech/ folder beside the page (speech.json lists it; the computer apps can
   carry it, from the release "speech-vendor" that .github/workflows/speech-vendor.yml makes); from this device's own copy (the
   engine in the store Scriba keeps, "cd-scriba-1044", and the models in transformers.js's own cache, so whatever either has
   fetched serves both); or, once, from the internet (cdn.jsdelivr.net for the engine, huggingface.co for the model), kept for
   offline use from then on. Each phrase is written into the message box a moment after a pause. The browser's speech service is
   used only where she turns it on in Settings (Models and AI, Search, eyes and ears), with what it does said beside the switch. */
(function r254(){
"use strict";
if(window.__r254)return;window.__r254=1;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function el(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function S(){try{if(!state.dictate||typeof state.dictate!=="object")state.dictate={};return state.dictate;}catch(e){return {};}}
function save(){try{saveState();}catch(e){}}

/* ---------- what is used, and where it comes from ---------- */
var RT_VER="3.8.1",RT_CDN="https://cdn.jsdelivr.net/npm/@huggingface/transformers@"+RT_VER+"/dist/";
var RT_FILES=[["transformers.min.js","text/javascript"],["ort-wasm-simd-threaded.jsep.mjs","text/javascript"],["ort-wasm-simd-threaded.jsep.wasm","application/wasm"]];
/* Scriba's own store (apps/scriba.html, Carpe Diem 1044): the same names, so an engine either fetched serves both */
var CD_RT={cache:"cd-scriba-1044",key:"https://scriba.carpe-diem.invalid/",db:"cd_scriba_store",store:"files"};
var MODELS={en:["onnx-community/moonshine-base-ONNX","onnx-community/whisper-base.en","onnx-community/whisper-base"],
  other:["onnx-community/whisper-base","onnx-community/whisper-tiny"]};
/* the sizes measured on the release "speech-vendor" (source/speech/fetch_speech.mjs), for what is said before a first fetch */
var SIZE={runtime:22,en:64,other:76};
var LANGS=[["auto","Follow this device's language"],["en","English"],["fr","Français (French)"],["ht","Kreyòl ayisyen (Haitian Creole)"],["es","Español (Spanish)"]];
var LANG_NAME={en:"English",fr:"French",ht:"Haitian Creole",es:"Spanish"};
function lang(){var l=String(S().lang||"auto");if(l!=="auto"&&LANG_NAME[l])return l;
  var n="";try{n=String(state.uiLang||state.lang||navigator.language||"en").toLowerCase();}catch(e){n=String(navigator.language||"en").toLowerCase();}
  if(/^fr/.test(n))return "fr";if(/^ht/.test(n))return "ht";if(/^es/.test(n))return "es";return "en";}
function modelsFor(l){return l==="en"?MODELS.en:MODELS.other;}
function SR(){return W.SpeechRecognition||W.webkitSpeechRecognition||null;}
/* the editions without the Scriba app (gift, demo) say "Ingenium's own speech models": the same models, without a name they lack */
var SCRIBA=!!D.getElementById("ing-app-scriba");
function models(){return SCRIBA?"Scriba's speech models":"Ingenium's own speech models";}
/* the browser's service: only where she chose it, and only where the browser has one */
function browserChosen(){return S().engine==="browser"&&!!SR();}
function deviceOk(){try{return W.isSecureContext!==false&&!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)&&!!(W.AudioContext||W.webkitAudioContext)
  &&typeof WebAssembly==="object"&&typeof Worker==="function"&&typeof Blob==="function"&&!!(W.URL&&URL.createObjectURL);}catch(e){return false;}}
W.IngEarsBrowser=browserChosen;

/* ---------- the engine's three files: beside the page, this device's copy, or once from the internet ---------- */
function besideUrl(rel){try{return new URL("speech/"+rel,D.baseURI||location.href).href;}catch(e){return "";}}
/* a look into the store never makes it: only a write does (6.56: opening Settings had made an empty one, listed in Storage) */
function rtDb(mode,fn){return new Promise(function(res,rej){var rq;try{rq=indexedDB.open(CD_RT.db,1);}catch(e){rej(e);return;}
  rq.onupgradeneeded=function(ev){if(mode!=="readwrite"&&!(ev&&ev.oldVersion)){try{rq.transaction.abort();}catch(e){}return;}try{rq.result.createObjectStore(CD_RT.store);}catch(e){}};
  rq.onerror=function(){rej(rq.error||new Error("the store refused"));};
  rq.onsuccess=function(){var db=rq.result,out;try{var tx=db.transaction(CD_RT.store,mode),r2=fn(tx.objectStore(CD_RT.store));if(r2)r2.onsuccess=function(){out=r2.result;};
    tx.oncomplete=function(){try{db.close();}catch(e){}res(out);};tx.onerror=tx.onabort=function(){try{db.close();}catch(e){}rej(tx.error||new Error("store error"));};}
    catch(e){try{db.close();}catch(e2){}rej(e);}};});}
function cacheIf(name){return (typeof caches!=="undefined")?caches.has(name).then(function(h){return h?caches.open(name):null;}).catch(function(){return null;}):Promise.resolve(null);}
function rtGet(key){var viaCache=cacheIf(CD_RT.cache).then(function(c){return c?c.match(key):null;}).then(function(r){return r?r.arrayBuffer():null;});
  return viaCache.catch(function(){return null;}).then(function(b){if(b)return b;
    return rtDb("readonly",function(st){return st.get(key);}).then(function(v){return v&&v.body?v.body:null;},function(){return null;});});}
function rtPut(key,buf,type){var viaCache=(typeof caches!=="undefined")?caches.open(CD_RT.cache).then(function(c){return c.put(key,new Response(buf,{headers:{"content-type":type}}));}):Promise.reject(new Error("no cache"));
  return viaCache.catch(function(){return rtDb("readwrite",function(st){return st.put({body:buf,type:type},key);});}).catch(function(){});}
var FROM={runtime:"",models:""};
function rtFile(name,type,onFetch){var key=CD_RT.key+"runtime/"+RT_VER+"/"+name,b=besideUrl("runtime/"+name);
  return (b?fetch(b,{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error("not beside");return r.arrayBuffer();}).then(function(x){FROM.runtime="beside";return x;}):Promise.reject(new Error("no base")))
    .catch(function(){return rtGet(key).then(function(x){if(x){FROM.runtime=FROM.runtime||"device";return x;}
      if(onFetch)onFetch();
      return fetch(RT_CDN+name,{credentials:"omit"}).then(function(r){if(!r.ok)throw new Error("HTTP "+r.status+" for "+name);return r.arrayBuffer();})
        .then(function(x2){FROM.runtime="internet";return rtPut(key,x2,type).then(function(){return x2;});});});});}
var LIB=null;
function libUrls(onFetch){if(LIB)return Promise.resolve(LIB);
  return Promise.all(RT_FILES.map(function(f){return rtFile(f[0],f[1],onFetch).then(function(b){return URL.createObjectURL(new Blob([b],{type:f[1]}));});}))
    .then(function(u){LIB={module:u[0],wasm:{mjs:u[1],wasm:u[2]}};return LIB;});}
/* the models beside the page, when speech.json lists them */
var LOCAL=null;
function localModels(){if(LOCAL)return LOCAL;var u=besideUrl("speech.json");
  LOCAL=(u?fetch(u,{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error("none");return r.json();}).then(function(j){return {base:besideUrl("models/"),models:(j&&j.models)||{}};}):Promise.reject(new Error("none")))
    .catch(function(){return {base:"",models:{}};});return LOCAL;}

/* ---------- the worker: Scriba's, with the models beside the page first ---------- */
var WSRC=[
"let TF=null,pipe=null,pipeKey='',pipeId='',loading=null,loadingKey='';",
"async function lib(u){ if(TF) return TF; const t=await import(u.module); if(u.wasm) t.env.backends.onnx.wasm.wasmPaths=u.wasm; TF=t; return t; }",
"async function load(m){",
"  const key=m.models.join('|')+'|'+(m.local||'');",
"  if(pipe&&pipeKey===key) return pipe;",
"  if(pipe){ try{ await pipe.dispose(); }catch(e){} pipe=null; }",
"  const T=await lib(m.lib);",
"  if(typeof T.pipeline!=='function') throw new Error('the speech library has no pipeline function');",
"  T.env.allowRemoteModels=m.remote!==false; T.env.useBrowserCache=true;",
"  if(m.local){ T.env.allowLocalModels=true; T.env.localModelPath=m.local; } else { T.env.allowLocalModels=false; }",
"  let last=null;",
"  for(const id of m.models){",
"    try{ pipe=await T.pipeline('automatic-speech-recognition',id,{dtype:'q8',progress_callback:(p)=>postMessage({type:'progress',file:p.file||'',loaded:p.loaded||0,total:p.total||0,status:p.status||''})});",
"      pipeKey=key; pipeId=id; postMessage({type:'model',id:id}); return pipe; }",
"    catch(e){ last=e; }",
"  }",
"  throw new Error('the speech model could not be loaded ('+String(last&&last.message||last)+')');",
"}",
"onmessage=async(ev)=>{ const m=ev.data||{};",
"  try{",
"    const key=(m.models||[]).join('|')+'|'+(m.local||'');",
"    if(!loading||loadingKey!==key){ loadingKey=key; loading=load(m); }",
"    const p=await loading;",
"    if(m.type==='load'){ postMessage({type:'ready',id:m.id,model:pipeId}); return; }",
"    if(m.type==='run'){",
"      const sec=m.audio.length/16000, cap=Math.min(440,Math.ceil(sec*6.5)+12);",
"      const opts=/moonshine/.test(pipeId)?{max_new_tokens:cap}",
"        :Object.assign({max_new_tokens:cap,chunk_length_s:30,stride_length_s:5},/\\.en$/.test(pipeId)?{}:{language:m.lang||'en',task:'transcribe'});",
"      const out=await p(m.audio,opts);",
"      postMessage({type:'result',id:m.id,text:String((out&&out.text)||'').trim(),model:pipeId}); }",
"  }catch(e){ loading=null; pipe=null; postMessage({type:'error',id:m.id,message:String(e&&e.message||e)}); }",
"};"].join("\n");
var WK=null,SEQ=0,WAIT={},FILES={},MODEL_ID="",READY_KEY="",IDLE=null;
function worker(){if(WK)return WK;
  WK=new Worker(URL.createObjectURL(new Blob([WSRC],{type:"text/javascript"})),{type:"module"});
  WK.onmessage=function(ev){var m=ev.data||{};
    if(m.type==="progress"){if(m.file&&m.loaded)FILES[m.file]=m.loaded;var tot=0;for(var k in FILES)tot+=FILES[k];
      if(m.status!=="done"&&m.status!=="ready"&&tot>1048576)line("Getting the speech model ready, once: <b>"+Math.round(tot/1048576)+" MB</b>. After that it works offline, and your voice never leaves this device.",true);return;}
    if(m.type==="model"){MODEL_ID=m.id;return;}
    var w=WAIT[m.id];if(!w)return;delete WAIT[m.id];
    if(m.type==="error")w.no(new Error(m.message||"the speech model failed"));else w.ok(m);};
  WK.onerror=function(e){var err=new Error((e&&e.message)||"the speech worker stopped");Object.keys(WAIT).forEach(function(k){WAIT[k].no(err);delete WAIT[k];});
    try{WK.terminate();}catch(_){}WK=null;READY_KEY="";};
  return WK;}
function ask(msg,transfer){return new Promise(function(ok,no){var id=++SEQ;msg.id=id;WAIT[id]={ok:ok,no:no};worker().postMessage(msg,transfer||[]);});}
/* the model is let go after ten minutes unused, so its memory returns to the computer; it comes back from this device's copy */
function idle(){clearTimeout(IDLE);IDLE=setTimeout(function(){if(REC||BUSY||Q.length)return idle();if(WK){try{WK.terminate();}catch(e){}WK=null;READY_KEY="";MODEL_ID="";}},600000);}
function job(l){return Promise.all([libUrls(function(){line("Getting the speech engine, once (about "+SIZE.runtime+" MB). After that it works offline.",true);}),localModels()]).then(function(x){
  var ms=modelsFor(l),local=x[1],has=ms.some(function(id){return local.models&&local.models[id];});
  return {lib:x[0],models:ms,local:has?local.base:"",lang:l};});}
function ready(l){return job(l).then(function(j){var key=j.models.join("|")+"|"+j.local;
  if(READY_KEY===key&&WK)return j;
  return ask({type:"load",lib:j.lib,models:j.models,local:j.local,remote:true}).then(function(m){READY_KEY=key;MODEL_ID=m.model||MODEL_ID;FROM.models=j.local?"beside":"device or internet";return j;});});}
function write(f32,l){return ready(l).then(function(j){idle();return ask({type:"run",lib:j.lib,models:j.models,local:j.local,remote:true,lang:l,audio:f32},[f32.buffer]);})
  .then(function(m){return clean(m.text);});}
/* what a speech model writes for silence or noise is not words */
function clean(t){t=String(t||"").replace(/\[[^\]]{0,40}\]|\((?:silence|music|noise|inaudible|applause|laughter|blank_audio)[^)]{0,20}\)/gi," ").replace(/\s+/g," ").trim();
  if(/^[.,!?…\-–—\s]*$/.test(t))return "";return t;}

/* ---------- listening: the microphone, at 16 kHz, cut into phrases at each pause ---------- */
var REC=null,Q=[],BUSY=false,HEARD=0;
function to16k(a,rate){if(rate===16000)return a;var ratio=rate/16000,n=Math.floor(a.length/ratio),out=new Float32Array(n);
  for(var i=0;i<n;i++){var s0=Math.floor(i*ratio),s1=Math.min(a.length,Math.max(s0+1,Math.floor((i+1)*ratio))),acc=0;for(var j=s0;j<s1;j++)acc+=a[j];out[i]=acc/(s1-s0);}return out;}
/* 6.56: the browser's own resampler (a proper filter) where it has one: measured on two English recordings, the box above wrote
   "colour letter" for "cover letter" where this wrote every word right; the box stays for a browser without it */
function resample(a,rate){if(rate===16000)return Promise.resolve(a);
  try{var OC=W.OfflineAudioContext||W.webkitOfflineAudioContext;if(!OC)return Promise.resolve(to16k(a,rate));
    var oc=new OC(1,Math.max(1,Math.ceil(a.length/rate*16000)),16000),ab=oc.createBuffer(1,a.length,rate);
    if(ab.copyToChannel)ab.copyToChannel(a,0);else ab.getChannelData(0).set(a);
    var s=oc.createBufferSource();s.buffer=ab;s.connect(oc.destination);s.start(0);
    var pr=oc.startRendering();
    return (pr&&pr.then?pr:new Promise(function(res){oc.oncomplete=function(e){res(e.renderedBuffer);};}))
      .then(function(rb){return new Float32Array(rb.getChannelData(0));},function(){return to16k(a,rate);});
  }catch(e){return Promise.resolve(to16k(a,rate));}}
function join(list,len){var out=new Float32Array(len),o=0;for(var i=0;i<list.length;i++){out.set(list[i],o);o+=list[i].length;}return out;}
/* the samples kept so far, as one array (the pieces joined only when a phrase is looked at) */
function pend(){if(REC.parts.length>1){REC.buf=join(REC.parts,REC.len);REC.parts=[REC.buf];}return REC.parts[0]||new Float32Array(0);}
function rms(a,s,e){var acc=0;for(var i=s;i<e;i++)acc+=a[i]*a[i];return Math.sqrt(acc/Math.max(1,e-s));}
function cut(upto,from){var a=pend(),f=Math.max(0,from|0),u=Math.min(a.length,upto|0);
  if(u-f>REC.rate*0.35)queue(a.slice(f,u),REC.rate);
  var rest=a.slice(u);REC.parts=rest.length?[rest]:[];REC.len=rest.length;REC.scan=0;REC.voiceAt=-1;REC.lastVoice=-1;}
function tick(){if(!REC)return;var a=pend(),rate=REC.rate,fr=Math.round(rate*0.02);
  for(var s=REC.scan;s+fr<=a.length;s+=fr){var v=rms(a,s,s+fr);
    REC.floor=REC.floor?Math.min(Math.max(REC.floor*1.004,0.0008),Math.max(v,0.0008)):Math.max(v,0.0008);
    var th=Math.max(0.012,REC.floor*3.2);
    if(v>th){if(REC.voiceAt<0)REC.voiceAt=s;REC.lastVoice=s+fr;HEARD++;}
    REC.scan=s+fr;}
  if(REC.voiceAt<0){/* nothing said yet: only the last 0.6 s is kept, so the start of a phrase is never lost */
    var keep=Math.round(rate*0.6);if(a.length>keep*2){var drop=a.length-keep,r=a.slice(drop);REC.parts=[r];REC.len=r.length;REC.scan=Math.max(0,REC.scan-drop);}return;}
  var quiet=(a.length-REC.lastVoice)/rate,long=(a.length-REC.voiceAt)/rate;
  if(quiet>=0.75)cut(Math.min(a.length,REC.lastVoice+Math.round(rate*0.3)),REC.voiceAt-Math.round(rate*0.25));
  else if(long>=25){/* a long breath: cut at the quietest tenth of a second in the last three seconds */
    var best=a.length,bv=1e9,win=Math.round(rate*0.1);for(var s2=Math.max(REC.voiceAt,a.length-rate*3);s2+win<=a.length;s2+=win){var q=rms(a,s2,s2+win);if(q<bv){bv=q;best=s2+(win>>1);}}
    cut(best,REC.voiceAt-Math.round(rate*0.25));}}
function queue(a,rate){Q.push({a:a,rate:rate,l:lang()});pump();}
function pump(){if(BUSY||!Q.length)return;BUSY=true;var it=Q.shift();
  if(!READY_KEY)line(REC?"Listening. Getting the speech model ready on this device…":"Getting the speech model ready on this device…",true);
  else line(REC?"Listening. Writing down what you said…":"Writing down what you said…",true);
  resample(it.a,it.rate).then(function(f){return write(f,it.l);}).then(function(t){if(t)put(t);},function(e){line("Ingenium could not write that down: "+String(e&&e.message||e)+". "+(navigator.onLine===false?"The speech model is not on this device yet; connect to the internet once, or open Settings, Search, eyes and ears, to get it ready.":""),true);})
    .then(function(){BUSY=false;if(Q.length)pump();else if(REC)line(listenWords(),true);else if(!/could not/.test(LINE_TEXT))line("",false);});}
function put(t){var inp=$("chatInput");if(!inp)return;var v=inp.value;
  inp.value=v&&!/\s$/.test(v)?v+" "+t:(v+t);
  try{inp.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}
  try{inp.scrollTop=inp.scrollHeight;}catch(e){}}
function listenWords(){return "Listening on this device ("+LANG_NAME[lang()]+"). Each phrase appears a moment after you pause. Press the microphone again to stop.";}
var LINE_TEXT="";
function line(html,on){var ln=$("ingEarsLine");if(!ln){var bar=D.querySelector("#page-chat .composer-bar");if(!bar||!bar.parentNode)return;
    ln=el("div","ears-line");ln.id="ingEarsLine";ln.setAttribute("role","status");ln.setAttribute("aria-live","polite");bar.parentNode.insertBefore(ln,bar.nextSibling);}
  LINE_TEXT=on?String(html||""):"";ln.innerHTML=on?String(html||""):"";ln.hidden=!on||!html;}
function key(){return $("chatMicBtn");}
function startListening(){var mb=key();if(REC||!mb)return;
  line("Asking for the microphone…",true);
  navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true,channelCount:1}}).then(function(stream){
    var AC=W.AudioContext||W.webkitAudioContext,ctx=new AC();try{if(ctx.state==="suspended")ctx.resume();}catch(e){}
    var src=ctx.createMediaStreamSource(stream),proc=ctx.createScriptProcessor(4096,1,1),sink=ctx.createGain();sink.gain.value=0;
    REC={stream:stream,ctx:ctx,src:src,proc:proc,sink:sink,parts:[],len:0,rate:ctx.sampleRate,scan:0,voiceAt:-1,lastVoice:-1,floor:0,timer:0};HEARD=0;
    proc.onaudioprocess=function(e){if(!REC)return;var d=e.inputBuffer.getChannelData(0);REC.parts.push(new Float32Array(d));REC.len+=d.length;};
    src.connect(proc);proc.connect(sink);sink.connect(ctx.destination);
    REC.timer=setInterval(tick,250);
    mb.classList.add("rec");mb.setAttribute("aria-pressed","true");mb.title="Listening on this device. Press to stop.";
    line(listenWords(),true);
    /* the engine and model are made ready while she speaks, so the first phrase waits as little as it can */
    ready(lang()).then(function(){idle();if(REC&&!BUSY)line(listenWords(),true);},function(){});
  }).catch(function(err){line(micWords(err),true);stopUi();});}
function micWords(err){var n=err&&err.name||"";
  if(n==="NotAllowedError"||n==="SecurityError")return "The microphone was not allowed. Allow it for Ingenium (your browser's or your computer's settings for this app), then press the microphone again.";
  if(n==="NotFoundError"||n==="OverconstrainedError")return "No microphone was found on this device.";
  return "The microphone could not be opened: "+String(err&&err.message||err||"unknown")+".";}
function stopListening(){var r=REC;if(!r)return;clearInterval(r.timer);
  try{tick();}catch(e){}
  var a=pend();if(r.voiceAt>=0)cut(a.length,r.voiceAt-Math.round(r.rate*0.25));
  REC=null;
  try{r.proc.disconnect();r.src.disconnect();r.sink.disconnect();}catch(e){}
  try{r.stream.getTracks().forEach(function(t){t.stop();});}catch(e){}
  try{r.ctx.close();}catch(e){}
  stopUi();
  if(!BUSY&&!Q.length)line(HEARD?"":"Nothing was heard. Check that the right microphone is chosen on this device, then try again.",!HEARD);}
function stopUi(){var mb=key();if(!mb)return;mb.classList.remove("rec");mb.setAttribute("aria-pressed","false");mb.title=keyTitle();}
function keyTitle(){return browserChosen()?"Dictate with your browser's speech service (it may send the sound to Google, Microsoft or Apple; Settings, Search, eyes and ears)"
  :"Dictate: Ingenium writes what you say on this device, with "+models()+". Your voice is never sent away.";}

/* ---------- the key: this device's model unless she chose the browser's service ---------- */
function wire(){var mb=key();if(!mb||mb.__r254)return;mb.__r254=1;
  if(deviceOk()||SR())mb.hidden=false;
  mb.title=keyTitle();mb.setAttribute("aria-pressed","false");
  /* heard before the page's own listener (R50), which now acts only for the browser's service */
  mb.addEventListener("click",function(e){if(browserChosen())return;e.stopImmediatePropagation();e.preventDefault();
    if(!deviceOk()){line(W.isSecureContext===false?"Dictation needs Ingenium opened from the app or from a file on this device (this address is not a private one)."
      :"This browser cannot run the speech model on this device.",true);return;}
    if(REC)stopListening();else startListening();},true);}

/* ---------- Settings: Models and AI, Search, eyes and ears ---------- */
function status(cb){Promise.all([localModels(),rtGet(CD_RT.key+"runtime/"+RT_VER+"/"+RT_FILES[2][0])]).then(function(x){
  var beside=Object.keys(x[0].models||{}).length>0,engine=!!x[1];
  var models=cacheIf("transformers-cache").then(function(c){return c?c.keys():[];}).then(function(ks){
      var ids=modelsFor(lang());return ks.some(function(rq){return ids.some(function(id){return String(rq.url||"").indexOf(id+"/")>=0&&/\.onnx$/.test(String(rq.url||""));});});}).catch(function(){return false;});
  return models.then(function(m){cb({beside:beside,engine:engine||beside,model:m||beside});});}).catch(function(){cb({beside:false,engine:false,model:false});});}
function card(){var pg=$("page-settings");if(!pg||$("ingEarsCard"))return;
  var c=el("div","card");c.id="ingEarsCard";c.setAttribute("role","region");c.setAttribute("aria-labelledby","ingEarsH");
  var h=el("h2","sec","Dictation: Ingenium's ears");h.id="ingEarsH";c.appendChild(h);
  c.appendChild(el("p","small muted","The microphone key in the message box writes what you say with "+models()+", here on this device. Your voice is never sent away. "+
    "The first time, the speech engine (about "+SIZE.runtime+" MB) and the model for your language (about "+SIZE.en+" MB for English, "+SIZE.other+" MB for French, Haitian Creole and Spanish) are fetched once and kept; from then on it works offline."));
  var r1=el("div","ears-row"),lb=el("label",null,"Language you speak"),sel=el("select");sel.id="earsLang";lb.htmlFor="earsLang";
  LANGS.forEach(function(o){var op=el("option",null,o[1]);op.value=o[0];sel.appendChild(op);});sel.value=S().lang||"auto";
  sel.onchange=function(){S().lang=sel.value;save();paintState();};r1.appendChild(lb);r1.appendChild(sel);c.appendChild(r1);
  var r2=el("div","ears-row"),get=el("button","btn small","Get it ready now"),st=el("span","ears-state");get.type="button";st.setAttribute("role","status");st.setAttribute("aria-live","polite");
  get.title="Fetch the speech engine and the model for your language now, while you are online, so dictation works later without the internet";
  get.onclick=function(){if(!deviceOk()){st.textContent="This browser cannot run the speech model on this device.";return;}get.disabled=true;st.textContent="Getting it ready…";
    var t=setInterval(function(){var tot=0;for(var k in FILES)tot+=FILES[k];if(tot>1048576)st.textContent="Getting it ready: "+Math.round(tot/1048576)+" MB…";},500);
    ready(lang()).then(function(){idle();st.textContent="Ready on this device ("+LANG_NAME[lang()]+"): it works offline now.";},function(e){st.textContent="It could not be made ready: "+String(e&&e.message||e);})
      .then(function(){clearInterval(t);get.disabled=false;});};
  r2.appendChild(get);r2.appendChild(st);c.appendChild(r2);
  function paintState(){status(function(s){if(get.disabled)return;st.textContent=s.engine&&s.model?"Ready on this device ("+LANG_NAME[lang()]+")"+(s.beside?", carried by the app":"")+": it works offline."
    :(s.engine?"The engine is here; the model for "+LANG_NAME[lang()]+" is fetched the first time you dictate.":"Not fetched yet: it is fetched the first time you dictate, or now with Get it ready now.");});}
  paintState();
  if(SR()){var r3=el("div","ears-row"),sw=el("label","eswitch"),inp=el("input"),tl=el("label",null,"Use my browser's speech service instead");inp.type="checkbox";inp.id="earsBrowser";tl.htmlFor="earsBrowser";
    inp.checked=S().engine==="browser";inp.setAttribute("aria-label","Use my browser's speech service instead");
    inp.onchange=function(){S().engine=inp.checked?"browser":"device";save();if(REC)stopListening();var mb=key();if(mb)mb.title=keyTitle();};
    sw.appendChild(inp);sw.appendChild(el("span","etrack"));r3.appendChild(sw);r3.appendChild(tl);c.appendChild(r3);
    c.appendChild(el("p","ears-warn","Off unless you turn it on. Your browser's service sends the sound away to be written down: Chrome and Edge send it to Google or Microsoft, and Safari may send it to Apple."));}
  var at=$("ingEyesCard")||$("linkCard")||$("personaCard");if(at&&at.parentNode===pg)pg.insertBefore(c,at.nextSibling);else pg.appendChild(c);
}

function init(){try{wire();}catch(e){}try{card();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",init);else init();
D.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest('.nav-btn[data-page="settings"]');if(t)setTimeout(card,0);},true);
W.IngEars={deviceOk:deviceOk,browserChosen:browserChosen,lang:lang,ready:ready,write:write,start:startListening,stop:stopListening,
  listening:function(){return !!REC;},busy:function(){return BUSY||Q.length>0;},from:function(){return {runtime:FROM.runtime,models:FROM.models,model:MODEL_ID};},
  status:function(){return new Promise(function(r){status(r);});},clean:clean,to16k:to16k,resample:resample};
})();
;try{window.__ingParts["p254"]="running";}catch(_){}
</script>
