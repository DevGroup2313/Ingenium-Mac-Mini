<style id="r201-css">
/* ============ R201 · THE LEARNING WORKBENCH (Ingenium 6.9.x, 31 October 2026) ============
   The owner's words (31 October 2026): "I want to expand on the parameters of what Ingenium can do as a serious coding and
   creating workbench with and without AI. I want to be able to create and train all kinds of AI models, even Frontier level
   AI models inside of the app."
   The trainer on a computer (Train a small model) needs the Ingenium app for Mac or Windows. The workbench trains in this very
   page, on any device, with the TensorFlow.js that Ingenium carries for its picture reader (modules/r157.js loads it; the
   graphics chip through WebGL where there is one, the processor otherwise). Four tools, one at a time, small enough for a
   tablet with two to four gigabytes and every one of them can be paused or stopped:
     Write like my text    a character model (a small transformer) learns a text of hers letter by letter; the loss is drawn as it
                           falls, and a sample of what it writes now is shown every few steps;
     Sort my notes         a text classifier learns her labels from a few examples, says how it does on examples held back, which
                           words point to which label, and sorts the lines she has not labelled;
     Sort my pictures      an image classifier by transfer learning: the carried MobileNet v2 reads each picture, and only the last
                           step is learned, in seconds;
     Words that sit together   small word embeddings (skip-gram with negative sampling) on a text of hers, with the nearest words
                           of any word, a sum of words ("king - man + woman"), and a map.
   What is learned can be kept in this browser by name (TensorFlow.js's own IndexedDB store, "ing-lab/<tool>/<name>") and used
   again. WebGPU is probed and said, not used: this copy carries TensorFlow.js's WebGL and processor backends only. Nothing is
   sent anywhere; no picture or text of hers is kept by a tool, only what it learned. */
#ingLabCard .lb-engine{margin:10px 0 0;padding:8px 11px;border:1px solid var(--hairline);border-radius:10px;background:var(--rm-wellbg,rgba(34,26,46,.035));font-size:12.5px;line-height:1.5;color:var(--ink-2)}
#ingLabCard .lb-engine label{display:inline-flex;align-items:center;gap:6px;margin-top:4px;cursor:pointer}
#ingLabCard .lb-tabs{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0 4px}
#ingLabCard .lb-tab{min-height:34px;margin:0;padding:6px 14px;border-radius:999px;border:1px solid var(--hairline);background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop);color:var(--ink-2);font:600 13px/1.25 var(--sans);cursor:pointer;white-space:nowrap;touch-action:manipulation}
#ingLabCard .lb-tab:hover{color:var(--ink-1)}
#ingLabCard .lb-tab[aria-selected="true"]{color:#fff;background:linear-gradient(180deg,var(--rm-pa,#7348be),var(--rm-pb,#5d37a1));border-color:var(--rm-pedge,#4b2a86);box-shadow:var(--rm-psh);text-shadow:0 1px 1px rgba(30,10,60,.32)}
#ingLabCard .lb-tab:focus-visible{outline:2.5px solid var(--rm-focus,var(--accent));outline-offset:3px}
#ingLabCard .lb-says{margin:8px 2px 0;font-size:13px;line-height:1.5;color:var(--ink-2);max-width:74ch}
#ingLabCard .lb-panel[hidden]{display:none !important}
#ingLabCard .lb-sec{margin:16px 0 0;padding-top:12px;border-top:1px solid var(--hairline)}
#ingLabCard .lb-sec:first-child{border-top:0;padding-top:0}
#ingLabCard .lb-sec > h3{margin:0 0 4px;font:650 14px/1.35 var(--sans);color:var(--ink-1)}
#ingLabCard .lb-sec > p.lb-why{margin:0 0 8px;font-size:12.5px;line-height:1.5;color:var(--ink-2);max-width:74ch}
#ingLabCard .lb-text{width:100%;box-sizing:border-box;min-height:128px;padding:9px 11px;border-radius:10px;border:1px solid var(--hairline);background:var(--card);color:inherit;font:13px/1.5 var(--sans);resize:vertical}
#ingLabCard .lb-keys{display:flex;flex-wrap:wrap;gap:6px 8px;align-items:center;margin-top:8px}
#ingLabCard .lb-keys select{max-width:240px}
#ingLabCard .lb-count{margin-top:6px}
#ingLabCard .lb-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:2px 16px}
#ingLabCard .lb-grid input[type=number],#ingLabCard .lb-grid select{max-width:240px}
#ingLabCard .lb-engine details{margin-top:4px}
#ingLabCard .lb-engine summary{cursor:pointer;font-weight:600;color:var(--ink-1)}
#ingLabCard .lb-help{display:block;margin-top:3px;font-size:11.5px;line-height:1.45}
#ingLabCard details.lb-more{margin-top:10px}
#ingLabCard details.lb-more > summary{cursor:pointer;font:600 12.5px/1.4 var(--sans);color:var(--ink-1);padding:3px 2px}
#ingLabCard .lb-run{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0 6px}
#ingLabCard .lb-status{min-height:18px;font-size:13px;line-height:1.5;color:var(--ink-1)}
#ingLabCard .lb-status.bad{color:var(--danger,#b3261e)}
#ingLabCard .lb-bar{height:8px;border-radius:5px;background:var(--input-bg-hi,rgba(0,0,0,.07));overflow:hidden;margin:6px 0 4px}
#ingLabCard .lb-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--fill-hi,#8a63d2),var(--fill-lo,#5d37a1));transition:width .25s ease}
#ingLabCard .lb-stats{font-size:12.5px;color:var(--ink-2);min-height:18px}
#ingLabCard .lb-sample{white-space:pre-wrap;margin-top:8px;padding:10px 12px;border-radius:10px;background:var(--input-bg,rgba(0,0,0,.04));min-height:44px;font:13.5px/1.55 var(--sans);overflow-wrap:anywhere;max-height:240px;overflow:auto}
#ingLabCard .lb-sample small{display:block;margin-bottom:4px;color:var(--ink-3);font:600 11px/1.4 var(--sans);letter-spacing:.05em;text-transform:uppercase}
#ingLabCard .lb-try{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end}
#ingLabCard .lb-try label.field{margin:0;flex:1 1 220px}
#ingLabCard .lb-try input[type=text],#ingLabCard .lb-name{width:100%;box-sizing:border-box}
#ingLabCard .lb-rows{display:grid;gap:6px;margin-top:8px}
#ingLabCard .lb-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;padding:8px 11px;border:1px solid var(--hairline);border-radius:10px;background:var(--card)}
#ingLabCard .lb-row > span{flex:1 1 200px;min-width:0;font-size:13px;color:var(--ink-2);overflow-wrap:anywhere}
#ingLabCard .lb-row > span b{color:var(--ink-1)}
#ingLabCard .lb-bars{display:grid;gap:5px;margin-top:8px}
#ingLabCard .lb-bar2{display:grid;grid-template-columns:minmax(80px,170px) minmax(0,1fr) 52px;gap:8px;align-items:center;font-size:12.5px;color:var(--ink-2)}
#ingLabCard .lb-bar2 b{font-weight:600;color:var(--ink-1);overflow-wrap:anywhere}
#ingLabCard .lb-bar2 .tr{height:9px;border-radius:5px;background:var(--input-bg-hi,rgba(0,0,0,.07));overflow:hidden}
#ingLabCard .lb-bar2 .tr i{display:block;height:100%;background:var(--accent);opacity:.8}
#ingLabCard .lb-bar2 em{font-style:normal;text-align:right}
#ingLabCard .lb-cats{display:grid;gap:10px;margin-top:6px}
#ingLabCard .lb-cat{padding:10px 12px;border:1px solid var(--hairline);border-radius:12px;background:var(--card)}
#ingLabCard .lb-cat-h{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
#ingLabCard .lb-cat-h input[type=text]{flex:1 1 160px;min-width:0}
#ingLabCard .lb-thumbs{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
#ingLabCard .lb-thumbs img{width:48px;height:48px;object-fit:cover;border-radius:7px;border:1px solid var(--hairline)}
#ingLabCard .lb-map{margin-top:8px;max-width:520px}
#ingLabCard .lb-map svg{width:100%;height:auto;display:block;border:1px solid var(--hairline);border-radius:10px;background:var(--card)}
#ingLabCard .lb-map text{font:10.5px var(--sans);fill:var(--ink-2)}
#ingLabCard .lb-map circle{fill:var(--accent);opacity:.75}
#ingLabCard .lb-table{width:100%;border-collapse:collapse;margin-top:8px;font-size:12.5px}
#ingLabCard .lb-table td,#ingLabCard .lb-table th{padding:5px 8px;border-bottom:1px solid var(--hairline);text-align:left;vertical-align:top}
#ingLabCard .lb-table th{font-weight:650;color:var(--ink-1)}
#ingLabCard .lb-note{margin-top:8px;font-size:12.5px;line-height:1.5;color:var(--ink-2);max-width:74ch}
#ingLabCard .lb-saved .lb-none{font-size:12.5px;color:var(--ink-3)}
@media (max-width:600px){#ingLabCard .lb-bar2{grid-template-columns:minmax(70px,110px) minmax(0,1fr) 46px}#ingLabCard .lb-tab{white-space:normal}}
@media (prefers-reduced-motion:reduce){#ingLabCard .lb-bar i{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p201"]="started";}catch(_){}
/* R201 · the learning workbench: see the note at the top of its styles.
   window.IngLab: open(tool, {text, name}), current(), tools(), engine, chars, notes, pictures, words, saved(), remove(url), stopAll(). */
(function r201(){"use strict";
if(window.IngLab)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function h(tag,a,kids){var e=D.createElement(tag);if(typeof a==="string")e.className=a;else if(a)for(var k in a){var v=a[k];if(v==null||v===false)continue;
    if(k==="class")e.className=v;else if(k==="text")e.textContent=v;else if(k==="html")e.innerHTML=v;else if(k.slice(0,2)==="on")e[k]=v;else e.setAttribute(k,v===true?"":String(v));}
  if(typeof kids==="string")kids=[kids];(kids||[]).forEach(function(c){if(c==null||c===false)return;e.appendChild(typeof c==="string"?D.createTextNode(c):c);});return e;}
function warn(e){try{console.warn("Ingenium workbench:",e&&e.message||e);}catch(_){}}
function n0(x){try{return Number(x||0).toLocaleString("en-GB");}catch(e){return String(x||0);}}
function toast(t){try{ingToast(t);}catch(e){}}
function ask(title,text,yes,danger){try{if(typeof W.ingAsk==="function")return Promise.resolve(W.ingAsk({title:title,text:text,yes:yes||"Yes",no:"Keep it",danger:!!danger}));}catch(e){}return Promise.resolve(W.confirm(title+"\n\n"+text));}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function pct(x){return Math.round(x*100)+"%";}
function clock(ms){var s=Math.max(0,Math.round(ms/1000));if(s<60)return s+" s";var m=Math.floor(s/60);if(m<60)return m+" min"+(s%60?" "+(s%60)+" s":"");return Math.floor(m/60)+" h "+(m%60)+" min";}
function btn(txt,fn,cls,id){var b=h("button",{type:"button","class":"btn small"+(cls?" "+cls:""),text:txt,id:id});if(fn)b.onclick=fn;return b;}
function numOf(el,min,max,def){var v=parseFloat(el&&el.value);if(!(v===v))v=def;return Math.max(min,Math.min(max,v));}
function rng(seed){var a=(seed>>>0)||1;return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function hashStr(s){var x=2166136261;s=String(s);for(var i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619);}return x>>>0;}
function clean(t){return String(t==null?"":t).replace(/\r\n?/g,"\n").replace(/ /g," ");}
function plainOf(html){try{return clean(new DOMParser().parseFromString(String(html||""),"text/html").body.textContent||"");}catch(e){return clean(String(html||"").replace(/<[^>]*>/g," "));}}
/* a pause that lets the page breathe between two steps: a message, not a timer, so a page in the background goes on */
var MC=null,MQ=[];
function tick(){return new Promise(function(res){
  if(!D.hidden){setTimeout(res,0);return;}
  if(MC===null){try{MC=new MessageChannel();MC.port1.onmessage=function(){var f=MQ.shift();if(f)f();};}catch(e){MC=false;}}
  if(MC){MQ.push(res);MC.port2.postMessage(0);}else setTimeout(res,0);});}
var KEY="ing.lab.v1",PREF={};
try{PREF=JSON.parse(W.localStorage.getItem(KEY)||"{}")||{};}catch(e){PREF={};}
if(!PREF||typeof PREF!=="object")PREF={};
function keep(){try{W.localStorage.setItem(KEY,JSON.stringify(PREF));}catch(e){}}

/* ---------- the engine: TensorFlow.js, from the copy Ingenium's eyes carries ---------- */
var TF=null,TFP=null,BACK0=null,SID=0,RUN=null;
function eyes(){var E=W.IngEyes;return E&&typeof E.tf==="function"&&(typeof E.available!=="function"||E.available())?E:null;}
function carried(){return !!(eyes()||W.tf);}
function loadTF(){if(TF)return Promise.resolve(TF);if(TFP)return TFP;
  var E=eyes();
  if(E)TFP=Promise.resolve().then(function(){return E.tf();});
  else if(W.tf)TFP=Promise.resolve(W.tf.ready()).then(function(){return W.tf;});
  else return Promise.reject(new Error("This copy of Ingenium carries no TensorFlow.js (a lean copy, such as the one the Forge carries), so the learning workbench cannot work here."));
  TFP=TFP.then(function(t){TF=t;BACK0=t.getBackend();try{engineLine();}catch(e){}return t;},function(e){TFP=null;throw e;});return TFP;}
function backendWanted(){return PREF.gpu===false?"cpu":"webgl";}
function useBackend(){return loadTF().then(function(tf){var want=backendWanted();if(tf.getBackend()===want)return want;
  return Promise.resolve(tf.setBackend(want)).then(function(ok){return ok?ok:tf.setBackend("cpu");}).then(function(){return tf.ready();}).then(function(){try{engineLine();}catch(e){}return tf.getBackend();});});}
function restoreBackend(){try{if(TF&&BACK0&&TF.getBackend()!==BACK0)Promise.resolve(TF.setBackend(BACK0)).catch(function(){});}catch(e){}}
function memInfo(){try{var m=TF?TF.memory():null;return m?{tensors:m.numTensors,bytes:m.numBytes}:null;}catch(e){return null;}}
function dev(){var d=null;try{d=W.IngStudio&&IngStudio.device?IngStudio.device():null;}catch(e){}
  var mem=d&&d.memGB!=null?d.memGB:null;if(mem==null){try{mem=navigator.deviceMemory||null;}catch(e){}}
  var phone=!!(d&&d.kind==="phone");if(!d){try{phone=/Android|iPhone|iPad|iPod|Silk|Kindle/i.test(navigator.userAgent||"");}catch(e){}}
  return {memGB:mem,cores:d&&d.cores||(navigator.hardwareConcurrency||null),phone:phone,small:phone||(mem!=null&&mem<=4)};}
function webgpu(){try{return !!(navigator.gpu);}catch(e){return false;}}
function failWith(run,e){run.state="error";run.msg=String(e&&e.message||e);try{run.onTick();}catch(_){}
  /* a graphics chip that fails: the next lesson uses the processor, and says so */
  if(TF&&TF.getBackend&&TF.getBackend()==="webgl"&&PREF.gpu!==false){PREF.gpu=false;keep();run.msg+=" The graphics chip may be the cause, so the next lesson uses the processor only; the key at the top of the workbench puts it back.";try{run.onTick();}catch(_){}}
  RUN=null;restoreBackend();throw new Error(run.msg);}
function beginRun(kind,label,steps,onTick){if(RUN)throw new Error("A lesson is running just now ("+RUN.label+"). Stop it first, or wait until it is done.");
  RUN={kind:kind,label:label,state:"preparing",step:0,steps:steps,paused:false,stop:false,wake:null,hist:[],ms:[],msg:"Getting ready…",onTick:onTick||function(){},t0:Date.now(),
    pause:function(){if(this.state==="running"){this.paused=true;}},resume:function(){this.paused=false;if(this.wake){var w=this.wake;this.wake=null;w();}},
    cancel:function(){this.stop=true;this.paused=false;if(this.wake){var w=this.wake;this.wake=null;w();}}};
  return RUN;}
async function gate(run){var was=false;while(run.paused&&!run.stop){was=true;run.state="paused";run.msg="Paused at "+(run.kind==="chars"||run.kind==="words"?"step ":"round ")+n0(run.step)+". Carry on, or Stop to keep what it has learned so far.";try{run.onTick();}catch(e){}await new Promise(function(r){run.wake=r;});}
  if(was&&!run.stop){run.state="running";run.msg="Learning…";}else if(run.state==="paused")run.state="running";}
function pace(run){if(!run.ms.length)return null;var s=0;run.ms.forEach(function(x){s+=x;});return s/run.ms.length;}
function eta(run){var p=pace(run);if(p==null||run.step<3)return null;return p*(run.steps-run.step);}

/* ---------- saving and using again, by name: TensorFlow.js's own IndexedDB store ---------- */
var BASE="indexeddb://ing-lab/";
function savedUrl(kind,name){return BASE+kind+"/"+name;}
function cleanName(n){return String(n||"").replace(/[\u0000-\u001f\/\\]+/g," ").replace(/\s+/g," ").trim().slice(0,48);}
async function saveModel(kind,name,tensors,meta){name=cleanName(name);if(!name)throw new Error("Give it a name first.");
  var tf=await loadTF(),enc=await tf.io.encodeWeights(tensors),hs=tf.io.getSaveHandlers(savedUrl(kind,name));
  if(!hs.length)throw new Error("This browser keeps no larger store here (a private window, or storage switched off).");
  meta=Object.assign({},meta,{kind:kind,name:name,saved:Date.now()});
  await hs[0].save({modelTopology:{ingenium:"lab",kind:kind},weightSpecs:enc.specs,weightData:enc.data,format:"ingenium-lab",generatedBy:"Ingenium",userDefinedMetadata:meta});return name;}
async function loadModel(kind,name){var tf=await loadTF(),hs=tf.io.getLoadHandlers(savedUrl(kind,name));
  if(!hs.length)throw new Error("This browser keeps no larger store here.");var a=await hs[0].load();
  if(!a||!a.weightData)throw new Error("That saved model could not be read.");return {meta:a.userDefinedMetadata||{},tensors:tf.io.decodeWeights(a.weightData,a.weightSpecs)};}
/* the list is read from TensorFlow.js's own store without loading TensorFlow.js (it is only opened when it is already there) */
function savedRow(path,info){var u="indexeddb://"+path;if(u.indexOf(BASE)!==0)return null;var rest=u.slice(BASE.length),i=rest.indexOf("/");if(i<0)return null;
  return {url:u,kind:rest.slice(0,i),name:rest.slice(i+1),bytes:info&&info.weightDataBytes||0,saved:info&&info.dateSaved?+new Date(info.dateSaved):0};}
function idbList(){return new Promise(function(res){
  try{if(!W.indexedDB||typeof indexedDB.databases!=="function"){res(null);return;}
    indexedDB.databases().then(function(ds){if(!ds.some(function(d){return d.name==="tensorflowjs";})){res([]);return;}
      var rq=indexedDB.open("tensorflowjs");rq.onerror=function(){res([]);};rq.onupgradeneeded=function(){try{rq.transaction.abort();}catch(e){}res([]);};
      rq.onsuccess=function(){var db=rq.result;try{if(!db.objectStoreNames.contains("model_info_store")){db.close();res([]);return;}
        var r=db.transaction("model_info_store","readonly").objectStore("model_info_store").getAll();
        r.onsuccess=function(){var out=[];(r.result||[]).forEach(function(x){if(x&&typeof x.modelPath==="string"&&x.modelPath.indexOf("ing-lab/")===0){var o=savedRow(x.modelPath,x.modelArtifactsInfo);if(o)out.push(o);}});db.close();res(out);};
        r.onerror=function(){db.close();res([]);};}catch(e){try{db.close();}catch(_){}res([]);}};},function(){res([]);});
  }catch(e){res([]);}});}
async function listSaved(){try{var out=await idbList();
    if(out===null){var tf=await loadTF(),m=await tf.io.listModels();out=[];Object.keys(m).forEach(function(u){if(u.indexOf(BASE)!==0)return;var o=savedRow(u.slice("indexeddb://".length),m[u]);if(o)out.push(o);});}
    return out.sort(function(a,b){return b.saved-a.saved;});}catch(e){return [];}}
async function removeSaved(url){var tf=await loadTF();await tf.io.removeModel(url);return true;}
function variableOf(t,name){var v=TF.tidy(function(){return TF.variable(t,true,name);});try{t.dispose();}catch(e){}return v;}
function dropVars(m){if(!m)return;(m.vars||[]).forEach(function(v){try{v.dispose();}catch(e){}});m.vars=[];m.dead=true;}
function thin(h,n){n=n||160;if(!h||h.length<=n)return h||[];var o=[],k=h.length/n;for(var i=0;i<n;i++)o.push(h[Math.floor(i*k)]);o[o.length-1]=h[h.length-1];return o;}

/* ---------- the loss, drawn (the trainer's own chart classes) ---------- */
function chartSvg(hist,o){o=o||{};if(!hist||!hist.length)return "";var Wd=420,Ht=150,L=34,R=12,T=18,B=24,vals=[];
  hist.forEach(function(p){if(p.loss!=null)vals.push(p.loss);if(p.val!=null)vals.push(p.val);});if(o.rand!=null)vals.push(o.rand);if(!vals.length)return "";
  var mx=Math.max.apply(null,vals)+0.1,mn=Math.min.apply(null,vals)-0.1;if(mx-mn<0.25){mx+=0.12;mn-=0.12;}
  var x0=hist[0].s,x1=hist[hist.length-1].s;
  function x(s){return x1===x0?(L+Wd-R)/2:L+(Wd-L-R)*(s-x0)/(x1-x0);}function y(v){return T+(Ht-T-B)*(mx-v)/(mx-mn);}
  function path(key,cls){var pts=hist.filter(function(p){return p[key]!=null;});if(!pts.length)return "";
    return '<path d="'+pts.map(function(p,i){return (i?"L":"M")+x(p.s).toFixed(1)+","+y(p[key]).toFixed(1);}).join(" ")+'" class="'+cls+'"/>';}
  return '<svg class="tr-chart" viewBox="0 0 '+Wd+' '+Ht+'" role="img" aria-label="'+esc(o.label||"The loss as it learns")+'">'
    +'<line x1="'+L+'" y1="'+(Ht-B)+'" x2="'+(Wd-R)+'" y2="'+(Ht-B)+'" class="tr-axis"/><line x1="'+L+'" y1="'+T+'" x2="'+L+'" y2="'+(Ht-B)+'" class="tr-axis"/>'
    +'<text x="'+(L-5)+'" y="'+(T+4)+'" text-anchor="end" class="tr-lab">'+mx.toFixed(1)+'</text><text x="'+(L-5)+'" y="'+(Ht-B)+'" text-anchor="end" class="tr-lab">'+mn.toFixed(1)+'</text>'
    +(o.rand!=null?'<line x1="'+L+'" y1="'+y(o.rand).toFixed(1)+'" x2="'+(Wd-R)+'" y2="'+y(o.rand).toFixed(1)+'" class="tr-rand"/><text x="'+(Wd-R)+'" y="'+(y(o.rand)-4).toFixed(1)+'" text-anchor="end" class="tr-lab">guessing at random</text>':"")
    +path("loss","tr-train")+path("val","tr-val")
    +'<text x="'+x(x0).toFixed(1)+'" y="'+(Ht-8)+'" text-anchor="middle" class="tr-lab">'+x0+'</text>'+(x1>x0?'<text x="'+x(x1).toFixed(1)+'" y="'+(Ht-8)+'" text-anchor="middle" class="tr-lab">'+x1+'</text>':"")
    +'<text x="'+((L+Wd-R)/2)+'" y="'+(Ht-8)+'" text-anchor="middle" class="tr-lab">'+esc(o.xlab||"steps")+'</text><text x="'+L+'" y="11" class="tr-lab">loss (lower is better)</text></svg>';}
function chartKey(){return '<span class="tr-key"></span> on what it learns from · <span class="tr-key tr-val-k"></span> on what it never learns from';}

/* ======================================================================================
   THE CHARACTER MODEL: a small transformer that reads a text of hers letter by letter
   ====================================================================================== */
var SIZES={
  tiny:{name:"Tiny",d:32,L:2,H:2,T:48,B:12,steps:400,lr:4e-3,about:"about 30 thousand numbers",says:"A quick look, a minute or two on a graphics chip. It learns spellings and punctuation."},
  small:{name:"Small",d:64,L:3,H:4,T:64,B:16,steps:800,lr:3e-3,about:"about 160 thousand numbers",says:"A fair try, some minutes. It learns whole words and short phrases."},
  medium:{name:"Medium",d:96,L:4,H:4,T:96,B:24,steps:1500,lr:2e-3,about:"about 460 thousand numbers",says:"Wants a graphics chip or patience, many minutes. It picks up longer phrases."},
  large:{name:"Large",d:128,L:6,H:8,T:128,B:32,steps:3000,lr:1.5e-3,about:"about 1.2 million numbers",says:"The most this page can train: a graphics chip and the better part of an hour. A steadier rhythm and longer phrases."}};
var MINCH=500,MAXV=128;
function charVocab(text,max){var cnt={},i,c;for(i=0;i<text.length;i++){c=text.charCodeAt(i);if(c>=0xD800&&c<=0xDFFF)continue;cnt[text[i]]=(cnt[text[i]]||0)+1;}
  var ks=Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a]||(a<b?-1:1);}).slice(0,max);ks.sort();return ks;}
function encode(text,index){var out=new Uint8Array(text.length),n=0;for(var i=0;i<text.length;i++){var k=index[text[i]];if(k!==undefined)out[n++]=k;}return out.subarray(0,n);}
function newLM(cfg,V,seed){var sid=++SID,w={},vars=[],d=cfg.d,L=cfg.L,n=0;
  function mkv(name,shape,std){n++;var vv=TF.tidy(function(){var t=std===0?TF.zeros(shape):std===1?TF.ones(shape):TF.randomNormal(shape,0,std,"float32",(seed||7)+n*7919);return TF.variable(t,true,"lab"+sid+"/"+name);});w[name]=vv;vars.push(vv);return vv;}
  mkv("emb",[V,d],0.08);mkv("pos",[cfg.T,d],0.02);
  for(var l=0;l<L;l++){var p="l"+l+".";mkv(p+"g1",[d],1);mkv(p+"b1",[d],0);mkv(p+"qkv",[d,3*d],0.5/Math.sqrt(d));mkv(p+"qkvb",[3*d],0);
    mkv(p+"o",[d,d],0.5/Math.sqrt(d)/Math.sqrt(2*L));mkv(p+"ob",[d],0);mkv(p+"g2",[d],1);mkv(p+"b2",[d],0);
    mkv(p+"f1",[d,4*d],0.5/Math.sqrt(d));mkv(p+"f1b",[4*d],0);mkv(p+"f2",[4*d,d],0.5/Math.sqrt(4*d)/Math.sqrt(2*L));mkv(p+"f2b",[d],0);}
  mkv("gf",[d],1);mkv("bf",[d],0);mkv("ob",[V],0);
  var np=0;vars.forEach(function(v){np+=v.size;});return {cfg:cfg,V:V,w:w,vars:vars,params:np,sid:sid};}
function lnorm(x,g,b){var m=x.mean(-1,true),xc=x.sub(m),v=xc.square().mean(-1,true);return xc.mul(TF.rsqrt(v.add(1e-5))).mul(g).add(b);}
var MASKS={};
function maskOf(T){var m=MASKS[T];if(!m){m=new Float32Array(T*T);for(var i=0;i<T;i++)for(var j=i+1;j<T;j++)m[i*T+j]=-1e9;MASKS[T]=m;}return TF.tensor2d(m,[T,T]);}
function fwd(M,ids,B,T){var cfg=M.cfg,d=cfg.d,H=cfg.H,dh=d/H,w=M.w,V=M.V;
  var x=TF.gather(w.emb,ids.flatten()).reshape([B,T,d]).add(w.pos.slice([0,0],[T,d])),mask=maskOf(T),sc=1/Math.sqrt(dh);
  for(var l=0;l<cfg.L;l++){var p="l"+l+".";
    var hh=lnorm(x,w[p+"g1"],w[p+"b1"]).reshape([B*T,d]);
    var qkv=hh.matMul(w[p+"qkv"]).add(w[p+"qkvb"]).reshape([B,T,3,H,dh]).transpose([2,0,3,1,4]);
    var q=qkv.gather(0).reshape([B,H,T,dh]),k=qkv.gather(1).reshape([B,H,T,dh]),v=qkv.gather(2).reshape([B,H,T,dh]);
    var a=TF.softmax(q.matMul(k,false,true).mul(sc).add(mask));
    var o=a.matMul(v).transpose([0,2,1,3]).reshape([B*T,d]).matMul(w[p+"o"]).add(w[p+"ob"]).reshape([B,T,d]);
    x=x.add(o);
    var h2=lnorm(x,w[p+"g2"],w[p+"b2"]).reshape([B*T,d]),f=h2.matMul(w[p+"f1"]).add(w[p+"f1b"]);f=f.mul(TF.sigmoid(f.mul(1.702)));
    x=x.add(f.matMul(w[p+"f2"]).add(w[p+"f2b"]).reshape([B,T,d]));}
  return lnorm(x,w.gf,w.bf).reshape([B*T,d]).matMul(w.emb,false,true).add(w.ob);}
function lossOf(M,xb,yb,B,T){return TF.losses.softmaxCrossEntropy(TF.oneHot(yb,M.V),fwd(M,xb,B,T));}
function trainStep(M,opt,xb,yb,B,T,lr){opt.learningRate=lr;
  return TF.tidy(function(){var r=TF.variableGrads(function(){return lossOf(M,xb,yb,B,T);},M.vars),g=r.grads,ns=Object.keys(g);
    var gn=TF.addN(ns.map(function(n){return g[n].square().sum();})).sqrt(),sc=TF.minimum(1,TF.div(1,gn.add(1e-6))),cg={};
    ns.forEach(function(n){cg[n]=g[n].mul(sc);});opt.applyGradients(cg);return r.value;});}
function schedule(i,n,lr){var w=Math.max(5,Math.round(n*0.05));if(i<w)return lr*(0.1+0.9*(i+1)/w);var p=(i-w)/Math.max(1,n-w);return lr*(0.1+0.9*0.5*(1+Math.cos(Math.PI*p)));}
function batchOf(data,B,T,rand){var xs=new Int32Array(B*T),ys=new Int32Array(B*T),span=data.length-T-1;
  for(var b=0;b<B;b++){var off=Math.floor(rand()*span);for(var j=0;j<T;j++){xs[b*T+j]=data[off+j];ys[b*T+j]=data[off+j+1];}}
  return [TF.tensor2d(xs,[B,T],"int32"),TF.tensor1d(ys,"int32")];}
async function evalLoss(M,held,rand){if(!held)return null;var cfg=M.cfg,B=Math.min(cfg.B,8),T=cfg.T,tot=0,nb=3;
  for(var k=0;k<nb;k++){var xy=batchOf(held,B,T,rand),l=TF.tidy(function(){return lossOf(M,xy[0],xy[1],B,T);}),v=await l.data();tot+=v[0];l.dispose();xy[0].dispose();xy[1].dispose();}
  return tot/nb;}
function pickTop(pr,topk,rand){var ix=[],i;for(i=0;i<pr.length;i++)ix.push(i);ix.sort(function(a,b){return pr[b]-pr[a];});ix=ix.slice(0,Math.max(1,topk));
  var s=0;ix.forEach(function(j){s+=pr[j];});var r=rand()*s;for(i=0;i<ix.length;i++){r-=pr[ix[i]];if(r<=0)return ix[i];}return ix[ix.length-1];}
async function sampleChars(CM,prompt,n,temp,seed){var cfg=CM.cfg,V=CM.V,T=cfg.T,rand=rng(seed||((Date.now()&0xffffff)+1)),ids=[],i;
  prompt=String(prompt||"");for(i=0;i<prompt.length;i++){var k=CM.index[prompt[i]];if(k!==undefined)ids.push(k);}
  if(!ids.length)ids.push(CM.index["\n"]!==undefined?CM.index["\n"]:0);
  var out=[],t=Math.max(0.2,temp||0.8),pad=CM.index["\n"]!==undefined?CM.index["\n"]:CM.index[" "]!==undefined?CM.index[" "]:0;
  for(i=0;i<n;i++){var ctx=ids.slice(-T);while(ctx.length<T)ctx.unshift(pad);   /* a whole window every time: a graphics chip then makes its programs once */
    var p=TF.tidy(function(){var x=TF.tensor2d(ctx,[1,T],"int32"),lg=fwd(CM.M,x,1,T);return TF.softmax(lg.slice([T-1,0],[1,V]).reshape([V]).div(t));});
    var pr=await p.data();p.dispose();var j=pickTop(pr,Math.min(40,V),rand);ids.push(j);out.push(CM.vocab[j]);if(i%24===23)await tick();}
  return out.join("");}
var CS=null;   /* the character model in hand */
async function startChars(o){o=o||{};var size=SIZES[o.size]||SIZES.tiny,text=clean(o.text||"");
  if(text.length<MINCH)throw new Error("Add at least "+MINCH+" characters of text first ("+n0(text.length)+" so far); 20,000 or more is better.");
  var steps=Math.max(1,Math.min(100000,Math.round(+o.steps||size.steps))),cont=!!(o.keep&&CS&&CS.M&&!CS.M.dead);
  var cfg=cont?CS.cfg:{d:size.d,L:size.L,H:size.H,T:Math.round(+o.ctx||size.T),B:Math.round(+o.batch||size.B)};if(cont&&o.batch)cfg=Object.assign({},cfg,{B:Math.round(+o.batch)});
  var run=beginRun("chars","Write like my text",steps,o.onTick),lrBase=(+o.lr||size.lr)*(+o.lrMul||1),rand=rng(o.seed||12345),sampleEvery=Math.max(5,+o.sampleEvery||Math.round(steps/12)),evalEvery=Math.max(5,Math.round(steps/30));
  try{
    await loadTF();var bk=await useBackend();run.backend=bk;
    var vocab,index={},i;if(cont){vocab=CS.vocab;index=CS.index;}else{vocab=charVocab(text,MAXV);for(i=0;i<vocab.length;i++)index[vocab[i]]=i;}
    var ids=encode(text,index),nHeld=Math.floor(ids.length*0.1),held=nHeld>=cfg.T+2?ids.subarray(ids.length-nHeld):null,train=held?ids.subarray(0,ids.length-nHeld):ids;
    if(train.length<cfg.T+2)throw new Error("The text is too short for a model that reads "+cfg.T+" letters at once. Add more, or choose a smaller size.");
    var M,step0=0,hist0=[];if(cont){M=CS.M;step0=CS.step||0;hist0=(CS.hist||[]).slice();}else{if(CS)dropVars(CS.M);CS=null;M=newLM(cfg,vocab.length,o.seed);}
    var opt=TF.train.adam(lrBase,0.9,0.98,1e-8),k=Math.max(1,Math.ceil(steps/120)),acc=[];run.hist=hist0;run.state="running";run.msg="Learning…";
    var CM={M:M,V:vocab.length,vocab:vocab,index:index,cfg:cfg,step:step0,hist:run.hist,sample:"",params:M.params,textName:o.name||"",backend:bk,loss:null,val:null,rand:Math.log(vocab.length),run:run};CS=CM;
    var mem0=memInfo();
    while(run.step<run.steps&&!run.stop){
      await gate(run);if(run.stop)break;
      var t0=performance.now(),xy=batchOf(train,cfg.B,cfg.T,rand),l=trainStep(M,opt,xy[0],xy[1],cfg.B,cfg.T,schedule(run.step,run.steps,lrBase)),v=await l.data();l.dispose();xy[0].dispose();xy[1].dispose();
      if(!(v[0]===v[0])||!isFinite(v[0]))throw new Error("The loss went wrong (it is not a number). A gentler speed or a smaller size avoids this.");
      run.step++;CM.step=step0+run.step;acc.push(v[0]);CM.loss=v[0];run.ms.push(performance.now()-t0);if(run.ms.length>12)run.ms.shift();
      if(run.step%k===0||run.step===run.steps){var m=0;acc.forEach(function(x){m+=x;});m/=acc.length;acc=[];run.hist.push({s:CM.step,loss:m,val:null});CM.loss=m;}
      if(held&&(run.step%evalEvery===0||run.step===run.steps)){var ev=await evalLoss(M,held,rand);CM.val=ev;if(run.hist.length)run.hist[run.hist.length-1].val=ev;else run.hist.push({s:CM.step,loss:v[0],val:ev});}
      if(run.step%sampleEvery===0&&run.step<run.steps){run.msg="Writing a sample…";CM.sample=await sampleChars(CM,"",o.sampleLen||140,0.8,rand()*1e6|0);run.msg="Learning…";}
      try{run.onTick();}catch(e){}
      await tick();}
    var stopped=run.stop;
    if(run.hist.length&&acc.length){var m2=0;acc.forEach(function(x){m2+=x;});run.hist.push({s:CM.step,loss:m2/acc.length,val:CM.val});CM.loss=m2/acc.length;}
    run.msg="Writing a last sample…";try{run.onTick();}catch(e){}
    CM.sample=await sampleChars(CM,"",o.sampleLen||140,0.8,rand()*1e6|0);
    try{opt.dispose();}catch(e){}
    run.state=stopped?"stopped":"done";run.msg=stopped?"Stopped at step "+run.step+" of "+run.steps+". What it has learned so far is kept; you can write with it, save it, or carry on.":"Done: "+n0(run.step)+" steps.";
    var out={state:run.state,steps:run.step,loss:CM.loss,val:CM.val,hist:run.hist.slice(),sample:CM.sample,params:M.params,vocab:vocab.length,backend:bk,first:run.hist.length?run.hist[0].loss:null,ms:pace(run),memBefore:mem0,memAfter:memInfo()};
    try{run.onTick();}catch(e){}RUN=null;restoreBackend();return out;
  }catch(e){return failWith(run,e);}}
async function writeChars(prompt,n,temp,seed){if(!CS||!CS.M||CS.M.dead)throw new Error("There is no model to write with yet: train one, or use a saved one.");
  await useBackend();try{return await sampleChars(CS,prompt,n||200,temp||0.8,seed);}finally{restoreBackend();}}
function saveChars(name){if(!CS||!CS.M||CS.M.dead)return Promise.reject(new Error("There is nothing to keep yet: train a model first."));
  var t={};Object.keys(CS.M.w).forEach(function(k){t[k]=CS.M.w[k];});
  return saveModel("chars",name,t,{cfg:CS.cfg,vocab:CS.vocab,step:CS.step,hist:thin(CS.hist),loss:CS.loss,val:CS.val,params:CS.params,textName:CS.textName,sample:CS.sample});}
async function loadChars(name){var r=await loadModel("chars",name),m=r.meta;await useBackend();var cfg=m.cfg,sid=++SID,w={},vars=[];
  Object.keys(r.tensors).forEach(function(k){var v=variableOf(r.tensors[k],"lab"+sid+"/"+k);w[k]=v;vars.push(v);});
  if(CS)dropVars(CS.M);var np=0;vars.forEach(function(v){np+=v.size;});var index={};m.vocab.forEach(function(c,i){index[c]=i;});
  CS={M:{cfg:cfg,V:m.vocab.length,w:w,vars:vars,params:np,sid:sid},V:m.vocab.length,vocab:m.vocab,index:index,cfg:cfg,step:m.step||0,hist:m.hist||[],sample:m.sample||"",params:np,textName:m.textName||"",backend:TF.getBackend(),loss:m.loss,val:m.val,rand:Math.log(m.vocab.length),saved:name};
  restoreBackend();return {name:name,step:CS.step,params:np,vocab:m.vocab.length,cfg:cfg,loss:m.loss,val:m.val};}

/* ======================================================================================
   SORT MY NOTES: a text classifier that learns her labels
   ====================================================================================== */
var TOKEN=null,TRIM=null;try{TOKEN=new RegExp("[\\p{L}\\p{N}]+(?:['’][\\p{L}]+)?","gu");TRIM=new RegExp("^[^\\p{L}\\p{N}]+|[^\\p{L}\\p{N}]+$","gu");}catch(e){TOKEN=/[A-Za-z0-9À-ɏ]+(?:['’][A-Za-z]+)?/g;TRIM=/^\W+|\W+$/g;}
function words(t){TOKEN.lastIndex=0;return (String(t).toLowerCase().match(TOKEN)||[]).filter(function(x){return x.length>1||/\d/.test(x);});}
function featsOf(t){var w=words(t),f=w.slice();for(var i=0;i+1<w.length;i++)f.push(w[i]+" "+w[i+1]);return f;}
function parseExamples(text){var ex=[],un=[];String(text||"").split(/\r?\n/).forEach(function(l){l=l.trim();if(!l)return;
  var m=/^\?\s*[:|\t]\s*(.+)$/.exec(l);if(m){un.push(m[1].trim());return;}
  m=/^([^:|\t]{1,32}?)\s*[:|\t]\s*(.{3,})$/.exec(l);
  if(m&&m[1].trim()&&m[1].trim().split(/\s+/).length<=3){ex.push({label:m[1].trim(),text:m[2].trim()});return;}
  un.push(l);});return {examples:ex,unlabelled:un};}
function vecOf(feats,vi,idf){var V=idf.length,x=new Float32Array(V),seen={},nrm=0,i;for(i=0;i<feats.length;i++){var j=vi[feats[i]];if(j!==undefined&&!seen[j]){seen[j]=1;x[j]=idf[j];nrm+=idf[j]*idf[j];}}
  if(nrm>0){nrm=1/Math.sqrt(nrm);for(i=0;i<V;i++)if(x[i])x[i]*=nrm;}return x;}
function softmaxJS(z){var m=-1e30,i;for(i=0;i<z.length;i++)if(z[i]>m)m=z[i];var s=0,o=new Float32Array(z.length);for(i=0;i<z.length;i++){o[i]=Math.exp(z[i]-m);s+=o[i];}for(i=0;i<z.length;i++)o[i]/=s;return o;}
function logitsOf(NM,x){var K=NM.K,V=NM.V,z=new Float32Array(K),i,k;for(k=0;k<K;k++)z[k]=NM.b[k];for(i=0;i<V;i++){var xi=x[i];if(xi){var r=i*K;for(k=0;k<K;k++)z[k]+=xi*NM.Wt[r+k];}}return z;}
function holdOut(rows,labelOf,frac,keyOf){var n=rows.length,target=n>=5?Math.max(1,Math.round(n*frac)):0,held=[],cnt={};rows.forEach(function(r){var l=labelOf(r);cnt[l]=(cnt[l]||0)+1;});
  if(!target)return {train:rows.slice(),held:[]};
  var order=rows.map(function(r,i){return {i:i,h:hashStr(keyOf(r,i))};}).sort(function(a,b){return a.h-b.h;}),pick={};
  for(var j=0;j<order.length&&held.length<target;j++){var r=rows[order[j].i],l=labelOf(r);if(cnt[l]>=3){cnt[l]--;pick[order[j].i]=1;held.push(r);}}
  return {train:rows.filter(function(r,i){return !pick[i];}),held:held};}
var NMODEL=null;
async function trainHead(X,Y,N,V,K,epochs,lr,rand,onEpoch,run,Xv,Yv,nv){   /* a softmax layer on features: used by the notes and the pictures */
  var Wv=variableOf(TF.zeros([V,K]),"lab"+(++SID)+"/hW"),bv=variableOf(TF.zeros([K]),"lab"+SID+"/hb"),opt=TF.train.adam(lr),Xt=TF.tensor2d(X,[N,V]),Yt=TF.tensor2d(Y,[N,K]),Xvt=nv?TF.tensor2d(Xv,[nv,V]):null,Yvt=nv?TF.tensor2d(Yv,[nv,K]):null;
  var bs=Math.min(N,128),idx=[],i;for(i=0;i<N;i++)idx.push(i);var hist=[];
  function lossFn(x,y){var lg=x.matMul(Wv).add(bv);return TF.losses.softmaxCrossEntropy(y,lg).add(Wv.square().sum().mul(1e-4));}
  try{for(var e=0;e<epochs&&!run.stop;e++){await gate(run);if(run.stop)break;var t0=performance.now(),tot=0,nb=0;
      for(i=N-1;i>0;i--){var j=Math.floor(rand()*(i+1)),t=idx[i];idx[i]=idx[j];idx[j]=t;}
      for(var s=0;s<N;s+=bs){var part=idx.slice(s,s+bs),l;
        if(part.length===N){l=TF.tidy(function(){return opt.minimize(function(){return lossFn(Xt,Yt);},true,[Wv,bv]);});}
        else{var it=TF.tensor1d(part,"int32");l=TF.tidy(function(){return opt.minimize(function(){return lossFn(Xt.gather(it),Yt.gather(it));},true,[Wv,bv]);});it.dispose();}
        tot+=(await l.data())[0];nb++;l.dispose();}
      var lv=nv?TF.tidy(function(){return lossFn(Xvt,Yvt);}):null,vv=lv?(await lv.data())[0]:null;if(lv)lv.dispose();
      run.step=e+1;run.ms.push(performance.now()-t0);if(run.ms.length>12)run.ms.shift();hist.push({s:e+1,loss:tot/nb,val:vv});run.hist=hist;
      try{run.onTick();}catch(er){}if(e%4===3)await tick();}
    var Wd=await Wv.data(),bd=await bv.data();return {W:Float32Array.from(Wd),b:Float32Array.from(bd),hist:hist};
  }finally{[Xt,Yt,Xvt,Yvt].forEach(function(t){if(t)try{t.dispose();}catch(e){}});try{opt.dispose();}catch(e){}Wv.dispose();bv.dispose();}}
async function trainNotes(o){o=o||{};var P=parseExamples(o.text),ex=P.examples;
  var labels=[],li={};ex.forEach(function(r){var k=r.label.toLowerCase();if(li[k]===undefined){li[k]=labels.length;labels.push(r.label);}});
  if(labels.length<2)throw new Error("Give examples under at least two labels, one a line, like  history: The treaty ended the war.  (you have "+labels.length+").");
  if(labels.length>24)throw new Error("Give examples under at most 24 labels (you have "+labels.length+").");
  if(ex.length<4)throw new Error("Give at least four labelled examples (you have "+ex.length+"); a dozen is better.");
  ex=ex.slice(0,2000);var epochs=Math.max(5,Math.min(1000,Math.round(+o.epochs||120))),run=beginRun("notes","Sort my notes",epochs,o.onTick),rand=rng(o.seed||4242);
  try{await loadTF();var bk=await useBackend();run.backend=bk;run.state="running";run.msg="Learning…";
    var sp=holdOut(ex,function(r){return r.label.toLowerCase();},0.1,function(r,i){return r.text+"|"+i;}),tr=sp.train,hd=sp.held,df={},i,k;
    tr.forEach(function(r){var seen={};featsOf(r.text).forEach(function(f){if(!seen[f]){seen[f]=1;df[f]=(df[f]||0)+1;}});});
    var vocab=Object.keys(df).sort(function(a,b){return df[b]-df[a]||(a<b?-1:1);}).slice(0,2500),vi={};vocab.forEach(function(f,j){vi[f]=j;});
    if(vocab.length<3)throw new Error("Those examples hold too few words to learn from.");
    var N=tr.length,V=vocab.length,K=labels.length,idf=new Float32Array(V);vocab.forEach(function(f,j){idf[j]=Math.log((1+N)/(1+df[f]))+1;});
    function build(rows){var X=new Float32Array(rows.length*V),Y=new Float32Array(rows.length*K);rows.forEach(function(r,n){X.set(vecOf(featsOf(r.text),vi,idf),n*V);Y[n*K+li[r.label.toLowerCase()]]=1;});return [X,Y];}
    var a=build(tr),b=hd.length?build(hd):[null,null];
    var res=await trainHead(a[0],a[1],N,V,K,epochs,0.12,rand,null,run,b[0],b[1],hd.length),stopped=run.stop;
    var NM={labels:labels,vocab:vocab,idf:idf,V:V,K:K,Wt:res.W,b:res.b,hist:res.hist,nTrain:N,nHeld:hd.length,epochs:run.step};
    function acc(rows){if(!rows.length)return null;var good=0;rows.forEach(function(r){var p=predictNM(NM,r.text);if(p[0].label.toLowerCase()===r.label.toLowerCase())good++;});return {right:good,of:rows.length,p:good/rows.length};}
    NM.accTrain=acc(tr);NM.accHeld=acc(hd);NM.counts=labels.map(function(l){return {label:l,n:ex.filter(function(r){return r.label.toLowerCase()===l.toLowerCase();}).length};});
    NM.top=labels.map(function(l,kk){var sc=[];for(var j=0;j<V;j++)sc.push([vocab[j],NM.Wt[j*K+kk]]);sc.sort(function(x,y){return y[1]-x[1];});return {label:l,words:sc.slice(0,6).filter(function(x){return x[1]>0;}).map(function(x){return x[0];})};});
    NM.unlabelled=P.unlabelled.length;NMODEL=NM;run.state=stopped?"stopped":"done";run.msg=stopped?"Stopped after "+run.step+" rounds.":"Done: "+run.step+" rounds.";try{run.onTick();}catch(e){}RUN=null;restoreBackend();
    return {state:run.state,labels:labels,accTrain:NM.accTrain,accHeld:NM.accHeld,nTrain:N,nHeld:hd.length,words:V,hist:res.hist,first:res.hist.length?res.hist[0].loss:null,last:res.hist.length?res.hist[res.hist.length-1].loss:null,backend:bk};
  }catch(e){return failWith(run,e);}}
function predictNM(NM,text){var x=vecOf(featsOf(text),(NM.vi=NM.vi||(function(){var o={};NM.vocab.forEach(function(f,j){o[f]=j;});return o;})()),NM.idf),p=softmaxJS(logitsOf(NM,x)),out=[];
  for(var k=0;k<NM.K;k++)out.push({label:NM.labels[k],p:p[k]});return out.sort(function(a,b){return b.p-a.p;});}
function saveNotes(name){if(!NMODEL)return Promise.reject(new Error("There is nothing to keep yet: train the sorter first."));var N=NMODEL;
  var t={W:TF?TF.tensor2d(N.Wt,[N.V,N.K]):null,b:TF.tensor1d(N.b),idf:TF.tensor1d(N.idf)};
  return saveModel("notes",name,t,{labels:N.labels,vocab:N.vocab,V:N.V,K:N.K,accHeld:N.accHeld,accTrain:N.accTrain,nTrain:N.nTrain,nHeld:N.nHeld,top:N.top,counts:N.counts}).then(function(n){Object.keys(t).forEach(function(k){t[k].dispose();});return n;},function(e){Object.keys(t).forEach(function(k){t[k].dispose();});throw e;});}
async function loadNotes(name){var r=await loadModel("notes",name),m=r.meta,t=r.tensors,NM={labels:m.labels,vocab:m.vocab,V:m.V,K:m.K,Wt:Float32Array.from(await t.W.data()),b:Float32Array.from(await t.b.data()),idf:Float32Array.from(await t.idf.data()),
    accHeld:m.accHeld,accTrain:m.accTrain,nTrain:m.nTrain,nHeld:m.nHeld,top:m.top,counts:m.counts,hist:[],saved:name};Object.keys(t).forEach(function(k){t[k].dispose();});NMODEL=NM;return {name:name,labels:NM.labels,words:NM.V};}
function sortRest(text){if(!NMODEL)throw new Error("Train the sorter first.");var P=parseExamples(text);return P.unlabelled.map(function(t){var p=predictNM(NMODEL,t);return {text:t,label:p[0].label,p:p[0].p};});}

/* ======================================================================================
   SORT MY PICTURES: transfer learning on the carried MobileNet v2
   ====================================================================================== */
var FEAT_NODE="module_apply_default/MobilenetV2/Logits/AvgPool",PICS=[],PMODEL=null;
function loadImage(file){return new Promise(function(res,rej){var u=URL.createObjectURL(file),im=new Image();im.onload=function(){URL.revokeObjectURL(u);res(im);};im.onerror=function(){URL.revokeObjectURL(u);rej(new Error("“"+(file.name||"that file")+"” could not be opened as a picture"));};im.src=u;});}
function squareOf(im,size){var c=D.createElement("canvas");c.width=c.height=size;var x=c.getContext("2d"),w=im.naturalWidth||im.width,hh=im.naturalHeight||im.height,s=Math.min(w,hh);x.fillStyle="#fff";x.fillRect(0,0,size,size);x.drawImage(im,(w-s)/2,(hh-s)/2,s,s,0,0,size,size);return c;}
async function featuresOf(file){var E=eyes();if(!E||typeof E.net!=="function")throw new Error("This copy of Ingenium carries no picture reader (MobileNet), so pictures cannot be sorted here.");
  var im=await loadImage(file),c=squareOf(im,224),th=squareOf(im,56).toDataURL("image/jpeg",0.7);E.hold();
  try{var model=await E.net(),tf=await loadTF(),f=tf.tidy(function(){var x=tf.browser.fromPixels(c).toFloat().div(127.5).sub(1).expandDims(0),o;
      try{o=model.execute(x,FEAT_NODE);}catch(e){o=model.predict(x);}return o.reshape([-1]);});
    var d=Float32Array.from(await f.data());f.dispose();var n=0;for(var i=0;i<d.length;i++)n+=d[i]*d[i];n=1/Math.sqrt(n||1);for(i=0;i<d.length;i++)d[i]*=n;return {feat:d,thumb:th};}
  finally{E.release();}}
async function addPictures(ci,files,onStep){var cat=PICS[ci];if(!cat)throw new Error("There is no such category.");var list=[].slice.call(files||[]),added=0,bad=[];
  for(var i=0;i<list.length;i++){if(cat.items.length>=60){bad.push("a category holds at most 60 pictures");break;}
    try{if(onStep)onStep(i+1,list.length);var r=await featuresOf(list[i]);cat.items.push({feat:r.feat,thumb:r.thumb,name:list[i].name||"picture"});added++;}catch(e){bad.push(String(e&&e.message||e));}
    await tick();}
  return {added:added,problems:bad};}
async function trainPictures(o){o=o||{};var cats=PICS.filter(function(c){return c.items.length;});
  if(cats.length<2)throw new Error("Add pictures to at least two categories first (you have "+cats.length+").");
  cats.forEach(function(c){if(!c.name.trim())throw new Error("Every category needs a name.");});
  if(cats.some(function(c){return c.items.length<2;}))throw new Error("Each category needs at least two pictures; five or more is better.");
  var epochs=Math.max(10,Math.min(1000,Math.round(+o.epochs||150))),run=beginRun("pictures","Sort my pictures",epochs,o.onTick),rand=rng(o.seed||99);
  try{await loadTF();var bk=await useBackend();run.backend=bk;run.state="running";run.msg="Learning…";
    var rows=[];cats.forEach(function(c,k){c.items.forEach(function(it,i){rows.push({k:k,f:it.feat,key:c.name+"|"+it.name+"|"+i});});});
    var sp=rows.length>=10?holdOut(rows,function(r){return r.k;},0.2,function(r){return r.key;}):{train:rows,held:[]},K=cats.length,V=rows[0].f.length;
    function build(rs){var X=new Float32Array(rs.length*V),Y=new Float32Array(rs.length*K);rs.forEach(function(r,n){X.set(r.f,n*V);Y[n*K+r.k]=1;});return [X,Y];}
    var a=build(sp.train),b=sp.held.length?build(sp.held):[null,null];
    var res=await trainHead(a[0],a[1],sp.train.length,V,K,epochs,0.05,rand,null,run,b[0],b[1],sp.held.length),stopped=run.stop;
    var PM={labels:cats.map(function(c){return c.name.trim();}),V:V,K:K,Wt:res.W,b:res.b,nTrain:sp.train.length,nHeld:sp.held.length,hist:res.hist};
    function acc(rs){if(!rs.length)return null;var good=0;rs.forEach(function(r){var z=logitsOf(PM,r.f),best=0;for(var k=1;k<K;k++)if(z[k]>z[best])best=k;if(best===r.k)good++;});return {right:good,of:rs.length,p:good/rs.length};}
    PM.accTrain=acc(sp.train);PM.accHeld=acc(sp.held);PMODEL=PM;run.state=stopped?"stopped":"done";run.msg=stopped?"Stopped after "+run.step+" rounds.":"Done: "+run.step+" rounds.";try{run.onTick();}catch(e){}RUN=null;restoreBackend();
    return {state:run.state,labels:PM.labels,accTrain:PM.accTrain,accHeld:PM.accHeld,nTrain:PM.nTrain,nHeld:PM.nHeld,hist:res.hist,first:res.hist.length?res.hist[0].loss:null,last:res.hist.length?res.hist[res.hist.length-1].loss:null,backend:bk};
  }catch(e){return failWith(run,e);}}
async function predictPicture(file){if(!PMODEL)throw new Error("Train the sorter first, or use a saved one.");var r=await featuresOf(file),z=logitsOf(PMODEL,r.feat),p=softmaxJS(z),out=[];
  for(var k=0;k<PMODEL.K;k++)out.push({label:PMODEL.labels[k],p:p[k]});out.sort(function(a,b){return b.p-a.p;});return {guess:out,thumb:r.thumb};}
function savePictures(name){if(!PMODEL)return Promise.reject(new Error("There is nothing to keep yet: train the sorter first."));var N=PMODEL,t={W:TF.tensor2d(N.Wt,[N.V,N.K]),b:TF.tensor1d(N.b)};
  return saveModel("pictures",name,t,{labels:N.labels,V:N.V,K:N.K,node:FEAT_NODE,norm:"pm1-l2",accHeld:N.accHeld,accTrain:N.accTrain,nTrain:N.nTrain,nHeld:N.nHeld}).then(function(n){Object.keys(t).forEach(function(k){t[k].dispose();});return n;},function(e){Object.keys(t).forEach(function(k){t[k].dispose();});throw e;});}
async function loadPictures(name){var r=await loadModel("pictures",name),m=r.meta,t=r.tensors;PMODEL={labels:m.labels,V:m.V,K:m.K,Wt:Float32Array.from(await t.W.data()),b:Float32Array.from(await t.b.data()),accHeld:m.accHeld,accTrain:m.accTrain,nTrain:m.nTrain,nHeld:m.nHeld,hist:[],saved:name};
  Object.keys(t).forEach(function(k){t[k].dispose();});return {name:name,labels:PMODEL.labels};}

/* ======================================================================================
   WORDS THAT SIT TOGETHER: word embeddings by skip-gram with negative sampling
   ====================================================================================== */
var WSIZES={small:{d:16,name:"Small",says:"16 numbers a word"},medium:{d:32,name:"Medium",says:"32 numbers a word"},large:{d:48,name:"Large",says:"48 numbers a word"}},WMODEL=null;
function sampleWordsText(){var r=rng(2024),pick=function(a){return a[Math.floor(r()*a.length)];},out=[];
  var court=["king","queen","prince","princess","lord","lady"],beasts=["dog","cat","horse","bird","fox","wolf"],places=["castle","village","river","forest","city","hill"];
  var courtDo=["rules the","speaks to the court in the","wears a crown in the","sits on the throne of the","gives a feast in the"],beastDo=["runs across the","sleeps beside the","hunts near the","follows the path to the","hides in the"],placeDo=["stands on the","lies beyond the","is quiet after the","is old and grey like the"];
  for(var i=0;i<1100;i++){var g=Math.floor(r()*3);
    if(g===0)out.push("the "+pick(court)+" "+pick(courtDo)+" "+pick(places)+".");
    else if(g===1)out.push("the "+pick(beasts)+" "+pick(beastDo)+" "+pick(places)+".");
    else out.push("the "+pick(places)+" "+pick(placeDo)+" "+pick(places)+".");}
  return out.join(" ");}
async function trainWords(o){o=o||{};var text=clean(o.text||""),ws=words(text);
  if(ws.length<400)throw new Error("Add at least 400 words of text first ("+n0(ws.length)+" so far); a few thousand is better.");
  var sz=WSIZES[o.size]||WSIZES.small,D_=sz.d,steps=Math.max(10,Math.min(20000,Math.round(+o.steps||600))),win=Math.max(1,Math.min(8,Math.round(+o.window||3))),maxV=Math.max(100,Math.min(5000,Math.round(+o.vocab||2000))),B=256,Kn=5;
  var run=beginRun("words","Words that sit together",steps,o.onTick),rand=rng(o.seed||777);
  try{await loadTF();var bk=await useBackend();run.backend=bk;run.state="running";run.msg="Learning…";
    var cnt={};ws.forEach(function(w){cnt[w]=(cnt[w]||0)+1;});
    var minC=ws.length<5000?2:3,vocab=Object.keys(cnt).filter(function(w){return cnt[w]>=minC;}).sort(function(a,b){return cnt[b]-cnt[a]||(a<b?-1:1);}).slice(0,maxV);
    if(vocab.length<30)throw new Error("That text has too few different words to learn from ("+vocab.length+").");
    var vi={};vocab.forEach(function(w,i){vi[w]=i;});var V=vocab.length,ids=[];ws.forEach(function(w){var j=vi[w];if(j!==undefined)ids.push(j);});
    var N=ids.length,nHeld=Math.floor(N*0.05),train=ids.slice(0,N-nHeld),hd=ids.slice(N-nHeld),tot=0;vocab.forEach(function(w){tot+=cnt[w];});
    var keepP=vocab.map(function(w){var f=cnt[w]/tot,t=0.004;return Math.min(1,Math.sqrt(t/f)+t/f);});
    var tab=new Int32Array(60000),cum=0,pw=vocab.map(function(w){return Math.pow(cnt[w],0.75);}),sw=0;pw.forEach(function(x){sw+=x;});
    var pos=0;for(var j=0;j<V;j++){cum+=pw[j]/sw;var to=Math.min(tab.length,Math.round(cum*tab.length));while(pos<to)tab[pos++]=j;}while(pos<tab.length)tab[pos++]=V-1;
    function pairs(src,n){var c=new Int32Array(n),x=new Int32Array(n),ng=new Int32Array(n*Kn),m=0,guard=0;
      while(m<n&&guard++<n*50){var p=Math.floor(rand()*src.length),w=src[p];if(rand()>keepP[w])continue;var off=1+Math.floor(rand()*win),q=rand()<0.5?p-off:p+off;if(q<0||q>=src.length)continue;
        c[m]=w;x[m]=src[q];for(var k=0;k<Kn;k++)ng[m*Kn+k]=tab[Math.floor(rand()*tab.length)];m++;}
      return {c:c.subarray(0,m),x:x.subarray(0,m),n:ng.subarray(0,m*Kn),m:m};}
    var sid=++SID,Win=TF.tidy(function(){return TF.variable(TF.randomNormal([V,D_],0,0.1,"float32",o.seed||31),true,"lab"+sid+"/in");}),Wout=TF.tidy(function(){return TF.variable(TF.zeros([V,D_]),true,"lab"+sid+"/out");}),opt=TF.train.adam(0.02),acc=[],kk=Math.max(1,Math.ceil(steps/120));
    var hp=hd.length>50?pairs(hd,400):null;
    try{
      while(run.step<run.steps&&!run.stop){await gate(run);if(run.stop)break;var t0=performance.now(),pr=pairs(train,B);if(pr.m<8)throw new Error("That text gave too few pairs of words to learn from.");
        var ct=TF.tensor1d(pr.c,"int32"),xt=TF.tensor1d(pr.x,"int32"),nt=TF.tensor1d(pr.n,"int32"),m=pr.m;
        var l=TF.tidy(function(){var r=TF.variableGrads(function(){var u=TF.gather(Win,ct),vp=TF.gather(Wout,xt),vn=TF.gather(Wout,nt).reshape([m,Kn,D_]);
            var ps=u.mul(vp).sum(1),ns=u.expandDims(1).mul(vn).sum(2);return TF.softplus(ps.neg()).mean().add(TF.softplus(ns).sum(1).mean());},[Win,Wout]);opt.applyGradients(r.grads);return r.value;});
        var v=await l.data();l.dispose();ct.dispose();xt.dispose();nt.dispose();
        if(!(v[0]===v[0])||!isFinite(v[0]))throw new Error("The loss went wrong (it is not a number).");
        run.step++;acc.push(v[0]);run.ms.push(performance.now()-t0);if(run.ms.length>12)run.ms.shift();
        if(run.step%kk===0||run.step===run.steps){var s=0;acc.forEach(function(x){s+=x;});s/=acc.length;acc=[];var val=null;
          if(hp&&(run.step%(kk*6)===0||run.step===run.steps)){var ht=TF.tensor1d(hp.c,"int32"),hx=TF.tensor1d(hp.x,"int32"),hn=TF.tensor1d(hp.n.filter(function(_,i){return i%Kn===0;}),"int32"),
              good=TF.tidy(function(){var u=TF.gather(Win,ht),pp=u.mul(TF.gather(Wout,hx)).sum(1),nn=u.mul(TF.gather(Wout,hn)).sum(1);return pp.greater(nn).toFloat().mean();});
            val=(await good.data())[0];good.dispose();ht.dispose();hx.dispose();hn.dispose();}
          run.hist.push({s:run.step,loss:s,val:null,rank:val});}
        try{run.onTick();}catch(e){}await tick();}
      var E=await Win.data(),stopped=run.stop,Ef=Float32Array.from(E);
      for(var a=0;a<V;a++){var nrm=0,b;for(b=0;b<D_;b++)nrm+=Ef[a*D_+b]*Ef[a*D_+b];nrm=1/Math.sqrt(nrm||1);for(b=0;b<D_;b++)Ef[a*D_+b]*=nrm;}
      var lastRank=null;run.hist.forEach(function(p){if(p.rank!=null)lastRank=p.rank;});
      WMODEL={vocab:vocab,counts:vocab.map(function(w){return cnt[w];}),E:Ef,V:V,D:D_,vi:vi,steps:run.step,hist:run.hist.slice(),rank:lastRank,textWords:ws.length};
      run.state=stopped?"stopped":"done";run.msg=stopped?"Stopped at step "+run.step+" of "+run.steps+". What it has learned is kept.":"Done: "+n0(run.step)+" steps.";try{run.onTick();}catch(e){}
    }finally{try{opt.dispose();}catch(e){}Win.dispose();Wout.dispose();}
    RUN=null;restoreBackend();
    return {state:run.state,steps:run.step,vocab:V,dims:D_,hist:run.hist.slice(),first:run.hist.length?run.hist[0].loss:null,last:run.hist.length?run.hist[run.hist.length-1].loss:null,rank:WMODEL.rank,backend:bk,words:ws.length};
  }catch(e){return failWith(run,e);}}
function nearest(vecs,exclude,k){var M=WMODEL,V=M.V,D_=M.D,sc=[],i,b;for(i=0;i<V;i++){if(exclude[i])continue;var s=0;for(b=0;b<D_;b++)s+=M.E[i*D_+b]*vecs[b];sc.push([i,s]);}
  sc.sort(function(a,c){return c[1]-a[1];});return sc.slice(0,k||10).map(function(x){return {word:M.vocab[x[0]],sim:x[1],count:M.counts[x[0]]};});}
function lookWord(expr,k){if(!WMODEL)throw new Error("Train the word map first, or use a saved one.");var M=WMODEL,parts=String(expr||"").toLowerCase().match(/[+\-]?\s*[^\s+\-]+/g)||[],vec=new Float32Array(M.D),ex={},miss=[],used=0;
  parts.forEach(function(p){var sign=/^-/.test(p)?-1:1,w=p.replace(/^[+\-]\s*/,"").replace(TRIM,""),j=M.vi?M.vi[w]:undefined;
    if(j===undefined){if(w)miss.push(w);return;}used++;ex[j]=1;for(var b=0;b<M.D;b++)vec[b]+=sign*M.E[j*M.D+b];});
  if(!used)return {near:[],missing:miss};var n=0,b2;for(b2=0;b2<M.D;b2++)n+=vec[b2]*vec[b2];n=1/Math.sqrt(n||1);for(b2=0;b2<M.D;b2++)vec[b2]*=n;
  return {near:nearest(vec,ex,k||10),missing:miss};}
function mapWords(n){if(!WMODEL)throw new Error("Train the word map first, or use a saved one.");var M=WMODEL,D_=M.D,top=Math.min(n||70,M.V),X=[],i,b;
  for(i=0;i<top;i++)X.push(Array.prototype.slice.call(M.E,i*D_,(i+1)*D_));
  var mean=new Array(D_).fill(0);X.forEach(function(r){for(b=0;b<D_;b++)mean[b]+=r[b]/top;});X=X.map(function(r){return r.map(function(v,j){return v-mean[j];});});
  function comp(skip){var v=[];for(b=0;b<D_;b++)v.push(Math.sin(b*7.1+(skip?3:1)));for(var it=0;it<40;it++){var w=new Array(D_).fill(0);
      X.forEach(function(r){var d=0;for(b=0;b<D_;b++)d+=r[b]*v[b];for(b=0;b<D_;b++)w[b]+=r[b]*d;});
      if(skip){var dd=0;for(b=0;b<D_;b++)dd+=w[b]*skip[b];for(b=0;b<D_;b++)w[b]-=dd*skip[b];}
      var nn=0;for(b=0;b<D_;b++)nn+=w[b]*w[b];nn=1/Math.sqrt(nn||1);v=w.map(function(x){return x*nn;});}return v;}
  var c1=comp(null),c2=comp(c1);return X.map(function(r,j){var x=0,y=0;for(b=0;b<D_;b++){x+=r[b]*c1[b];y+=r[b]*c2[b];}return {word:M.vocab[j],x:x,y:y};});}
function saveWords(name){if(!WMODEL)return Promise.reject(new Error("There is nothing to keep yet: train the word map first."));var M=WMODEL,t={E:TF.tensor2d(M.E,[M.V,M.D])};
  return saveModel("words",name,t,{vocab:M.vocab,counts:M.counts,V:M.V,D:M.D,steps:M.steps,hist:thin(M.hist),rank:M.rank,textWords:M.textWords}).then(function(n){t.E.dispose();return n;},function(e){t.E.dispose();throw e;});}
async function loadWords(name){var r=await loadModel("words",name),m=r.meta,vi={};m.vocab.forEach(function(w,i){vi[w]=i;});
  WMODEL={vocab:m.vocab,counts:m.counts,E:Float32Array.from(await r.tensors.E.data()),V:m.V,D:m.D,vi:vi,steps:m.steps,hist:m.hist||[],rank:m.rank,textWords:m.textWords,saved:name};r.tensors.E.dispose();return {name:name,vocab:m.V,dims:m.D};}

/* ======================================================================================
   THE CARD
   ====================================================================================== */
var SAMPLE_AUSTEN="It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.\n\nHowever little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.\n\n“My dear Mr. Bennet,” said his lady to him one day, “have you heard that Netherfield Park is let at last?”\n\nMr. Bennet replied that he had not.\n\n“But it is,” returned she; “for Mrs. Long has just been here, and she told me all about it.”\n\nMr. Bennet made no answer.\n\n“Do you not want to know who has taken it?” cried his wife impatiently.\n\n“You want to tell me, and I have no objection to hearing it.”\n\nThis was invitation enough.\n";
var SAMPLE_NOTES="history: The Peace of Westphalia in 1648 ended the Thirty Years War and set the treaty terms for the German states.\nhistory: The printing press spread pamphlets and changed how rulers and reformers reached their readers in the sixteenth century.\nhistory: The archive holds the letters of a merchant who traded across the Baltic after the war.\ncooking: Fry the onions in butter until soft, then add the garlic and stir in the tomatoes.\ncooking: Bake the bread in a hot oven until the crust is golden and the loaf sounds hollow.\ncooking: Whisk the eggs with sugar, fold in the flour and pour the batter into the buttered tin.\nhistory: The treaty text was copied by clerks and sent to every court in the empire.\ncooking: Simmer the stock with the carrots and leeks, season with salt and serve with warm bread.\n?: The chapter on the war needs a better opening paragraph before Friday.\n?: Buy butter, flour and tomatoes on the way home.\n";
var TOOLS=[
  {k:"chars",t:"Write like my text",says:"Teach a tiny model to write in the manner of a text of yours, letter by letter, and watch it learn. It learns your text's habits: spellings, punctuation, short phrases. It does not understand the text, and it will not answer questions; that is what a model this small can do, and it is how every language model begins."},
  {k:"notes",t:"Sort my notes",says:"Show it a few of your notes under labels of your own, and it learns to sort the rest. It learns from the words you use. Six examples give a rough result; sixty give a fair one; it never reads anything you have not given it."},
  {k:"pictures",t:"Sort my pictures",says:"Show it pictures sorted into categories of your own, and it learns to sort new ones. It borrows the eyes of the picture reader Ingenium already carries (MobileNet v2) and learns only the last step, which takes seconds. The pictures are not kept; only what it learned."},
  {k:"words",t:"Words that sit together",says:"Teach it which words keep company in a text of yours. Each word becomes a short list of numbers, and words used in the same places end up near one another. Look up a word to see its neighbours, add and subtract words, or draw a map."}];
var UI={tool:null,panels:{},tabs:{},built:false},ST={chars:{size:"tiny"},notes:{},pictures:{},words:{size:"small"}};
function sect(title,why,kids,id){var s=h("div",{class:"lb-sec",id:id});s.appendChild(h("h3",{text:title}));if(why)s.appendChild(h("p",{class:"lb-why",text:why}));(kids||[]).forEach(function(k){if(k)s.appendChild(k);});return s;}
function knob(label,help,control){var l=h("label","field");l.appendChild(h("span",{text:label}));l.appendChild(control);if(help)l.appendChild(h("small","muted lb-help",null)).textContent=help;return l;}
function seg(id,items,cur,onPick){var s=h("div",{class:"seg",id:id,role:"group"}),bs=[];
  items.forEach(function(it){var b=h("button",{type:"button","class":"seg-btn"+(it.k===cur?" active":""),text:it.t,title:it.title||"","data-k":it.k,"aria-pressed":it.k===cur?"true":"false"});
    if(it.off){b.disabled=true;b.title=it.off;}
    b.onclick=function(){if(b.disabled)return;bs.forEach(function(x){var on=x===b;x.classList.toggle("active",on);x.setAttribute("aria-pressed",on?"true":"false");});onPick(it.k);};bs.push(b);s.appendChild(b);});return s;}
/* a text of hers: pasted, a file, the Tabula page, a dataset, or a sample */
function textBox(id,o){var st={full:null,name:""},CAP=dev().small?1000000:4000000;
  var ta=h("textarea",{"class":"lb-text",id:id,rows:7,placeholder:o.placeholder,"aria-label":o.label||"Your text",spellcheck:"false"}),info=h("div",{"class":"small muted lb-count",id:id+"Count",role:"status"}),keys=h("div","lb-keys");
  var fi=h("input",{type:"file",accept:".txt,.md,.markdown,.text,.csv,.json,.html,.htm,.xml,text/plain",hidden:true,"aria-label":"Choose a text file"}),listeners=[];
  function get(){return st.full!=null?st.full:clean(ta.value);}
  function paint(){var t=get(),n=t.length;if(!n){info.textContent=o.empty||"";return;}
    var line=n0(n)+" characters"+(o.words?", about "+n0(words(t).length)+" words":"")+(st.name?" · from “"+st.name+"”":"");
    if(st.full!=null)line+=" · only the start is shown here; all of it is used";
    line+=n<o.min?" · too little: at least "+n0(o.min)+" are needed":n<o.good?" · it works; "+n0(o.good)+" or more teaches more":" · plenty";info.textContent=line;listeners.forEach(function(f){try{f(t,st.name);}catch(e){}});}
  function set(t,name){t=clean(t);if(t.length>CAP){t=t.slice(0,CAP);toast("That text is longer than this device is asked to train on, so the first "+n0(CAP)+" characters are used.");}
    st.name=name||"";if(t.length>150000){st.full=t;ta.value=t.slice(0,3000)+"\n…";ta.readOnly=true;}else{st.full=null;ta.readOnly=false;ta.value=t;}paint();}
  ta.oninput=function(){st.full=null;ta.readOnly=false;st.name="";paint();};
  fi.onchange=function(){var f=fi.files&&fi.files[0];fi.value="";if(!f)return;f.text().then(function(t){set(/\.html?$/i.test(f.name)?plainOf(t):t,f.name.replace(/\.[^.]+$/,""));},function(){toast("That file could not be read as text.");});};
  keys.appendChild(btn("Choose a text file…",function(){fi.click();},"ghost"));keys.appendChild(fi);
  keys.appendChild(btn("My Tabula page",function(){var t="";try{t=plainOf(state.tabulaDoc&&state.tabulaDoc.body||"");}catch(e){}if(t.trim().length<20){toast("The Tabula page has no text yet.");return;}set(t,(state.tabulaDoc&&state.tabulaDoc.title)||"The Tabula page");},"ghost"));
  var ds=h("select",{"aria-label":"A dataset from the Data room","class":"lb-ds",hidden:true});
  function fillDs(){if(!W.IngData||typeof IngData.list!=="function")return;IngData.list().then(function(l){ds.innerHTML="";ds.appendChild(h("option",{value:"",text:"A dataset from the Data room…"}));l.forEach(function(s){ds.appendChild(h("option",{value:s.id,text:s.name+" ("+n0(s.chars)+" characters)"}));});ds.hidden=!l.length;},function(){});}
  ds.onchange=function(){var id=ds.value;if(!id)return;IngData.text(id,{split:"train"}).then(function(t){var nm=ds.options[ds.selectedIndex].text.replace(/ \(.*$/,"");set(t,nm);ds.value="";},function(e){toast(String(e&&e.message||e));});};
  ds.onfocus=ds.onmousedown=fillDs;keys.appendChild(ds);fillDs();
  keys.appendChild(btn("Try a sample",function(){set(o.sample(),o.sampleName);},"ghost"));
  keys.appendChild(btn("Clear",function(){st.full=null;ta.readOnly=false;ta.value="";st.name="";paint();},"ghost"));
  var el=h("div","lb-src",[ta,keys,info]);paint();
  return {el:el,get:get,set:set,name:function(){return st.name;},ta:ta,onChange:function(f){listeners.push(f);},refresh:fillDs};}
/* the run bar: start, pause, stop, the status line, the bar, the numbers */
function runBar(p,o){var go=btn(o.go||"Start",null,"primary",p+"Go"),pa=btn("Pause",null,"ghost",p+"Pause"),stop=btn("Stop",null,"ghost",p+"Stop"),
    status=h("div",{"class":"lb-status",id:p+"Status",role:"status","aria-live":"polite"}),bar=h("div",{"class":"lb-bar",role:"progressbar","aria-label":"Progress","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":0,id:p+"Bar"},[h("i")]),stats=h("div",{"class":"lb-stats",id:p+"Stats"}),
    chart=h("div",{"class":"tr-chartbox",id:p+"Chart"}),row=h("div","lb-run",[go,pa,stop]);pa.hidden=stop.hidden=true;
  var lastKey="",lastAt=0;
  function paint(run,hist,randv,say){
    var live=run&&(run.state==="running"||run.state==="paused"||run.state==="preparing");go.disabled=!!live;pa.hidden=stop.hidden=!live;pa.textContent=run&&run.state==="paused"?"Carry on":"Pause";
    if(run){var f=run.steps?Math.min(1,run.step/run.steps):0;bar.firstChild.style.width=(f*100).toFixed(1)+"%";bar.setAttribute("aria-valuenow",String(Math.round(f*100)));}
    var txt=say||(run?run.msg:"");if(run&&run.state==="running"&&run.step>0&&!say){var e=eta(run);txt=(o.unit||"Step")+" "+n0(run.step)+" of "+n0(run.steps)+(e!=null?" · about "+clock(e)+" left":"")+(run.backend?" · on the "+(run.backend==="webgl"?"graphics chip":"processor"):"");}
    var key=run?run.state:"",now=Date.now();if(say||key!==lastKey||now-lastAt>1500){status.textContent=txt;lastKey=key;lastAt=now;}
    status.className="lb-status"+(run&&run.state==="error"?" bad":"");
    if(hist&&hist.length){chart.innerHTML=chartSvg(hist,{rand:randv,xlab:o.xlab||"steps",label:o.chartLabel});if(!chart.querySelector(".small")){var lg=h("div","small muted");lg.innerHTML=chartKey();chart.appendChild(lg);}}}
  return {row:row,go:go,pa:pa,stop:stop,status:status,bar:bar,stats:stats,chart:chart,paint:paint,els:[row,status,bar,stats,chart]};}
function savedBox(kind,id,onUse){var box=h("div",{"class":"lb-saved",id:id}),rows=h("div","lb-rows");box.appendChild(h("small",{"class":"muted",text:""}));box.appendChild(rows);
  function paint(){listSaved().then(function(l){l=l.filter(function(x){return x.kind===kind;});rows.innerHTML="";
    if(!l.length){rows.appendChild(h("div",{"class":"lb-none",text:"Nothing kept yet. What you keep stays in this browser, on this device."}));return;}
    l.forEach(function(x){var r=h("div","lb-row"),sp=h("span");sp.appendChild(h("b",{text:x.name}));sp.appendChild(D.createTextNode(" · "+(x.bytes>=1048576?(x.bytes/1048576).toFixed(1)+" MB":Math.max(1,Math.round(x.bytes/1024))+" KB")+(x.saved?" · kept "+new Date(x.saved).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}):"")));
      r.appendChild(sp);r.appendChild(btn("Use",function(){onUse(x.name);},"primary"));
      r.appendChild(btn("Let it go",function(){ask("Let go of “"+x.name+"”?","It is removed from this device, and cannot be got back. You can train it again.","Let it go",true).then(function(yes){if(yes)removeSaved(x.url).then(paint,function(e){toast(String(e&&e.message||e));});});},"ghost danger"));rows.appendChild(r);});});}
  paint();return {el:box,paint:paint};}
function keepRow(kind,idp,save,saved){var nm=h("input",{type:"text","class":"lb-name",id:idp+"Name",maxlength:48,placeholder:"A name, such as “My letters, small”","aria-label":"A name to keep it under"}),say=h("div",{"class":"small muted",id:idp+"KeepSay",role:"status"}),
    go=btn("Keep it",null,"primary",idp+"Save");
  go.onclick=function(){var name=cleanName(nm.value);if(!name){say.textContent="Give it a name first.";return;}
    listSaved().then(function(l){var dup=l.some(function(x){return x.kind===kind&&x.name===name;});return (dup?ask("Replace “"+name+"”?","There is already a saved model with that name. Replacing it keeps only the new one.","Replace it",true):Promise.resolve(true)).then(function(yes){if(!yes)return null;return save(name).then(function(n){say.textContent="Kept as “"+n+"”, in this browser.";saved.paint();});});}).catch(function(e){say.textContent=String(e&&e.message||e);});};
  var row=h("div","lb-try",[h("label","field",[h("span",{text:"Keep what it learned, under a name"}),nm]),go]);
  return {el:h("div",null,[row,say]),nm:nm,go:go,say:say};}
function bars(rows){var box=h("div","lb-bars");rows.forEach(function(r){box.appendChild(h("div","lb-bar2",[h("b",{text:r.label}),h("span",{"class":"tr"},[h("i",{style:"width:"+Math.round(r.p*100)+"%"})]),h("em",{text:pct(r.p)})]));});return box;}

/* ----- Write like my text ----- */
function buildChars(){var P=h("div",{"class":"lb-panel",role:"tabpanel",id:"labP-chars","aria-labelledby":"labT-chars"}),S=ST.chars,d=dev();
  var tb=textBox("labCharsText",{placeholder:"Paste a few pages of your own writing here, or use one of the keys below.",min:MINCH,good:20000,sample:function(){return SAMPLE_AUSTEN;},sampleName:"a sample (Jane Austen, 1813)",empty:"Nothing yet. At least "+MINCH+" characters are needed; 20,000 or more teaches more."});S.box=tb;
  P.appendChild(sect("1. Your text","The model learns only from this text: its letters, spellings, punctuation and rhythm. A few pages is a start; a whole book is better. A tenth of the end of it is held back, so the model can be measured on text it never learns from.",[tb.el]));
  var sizes=["tiny","small","medium","large"].map(function(k){var z=SIZES[k],off=(k==="medium"&&d.small)||(k==="large"&&(d.small||(d.memGB!=null&&d.memGB<8)))?"This size wants more memory than this device has to spare.":"";return {k:k,t:z.name,title:"About "+z.about.replace(/^about /,"")+". "+z.says,off:off};});
  var sizeSay=h("div",{"class":"small muted lb-count",id:"labCharsSizeSay"}),steps=h("input",{type:"number",min:10,max:100000,step:10,id:"labCharsSteps","aria-label":"Steps"}),
      ctx=h("select",{id:"labCharsCtx"}),batch=h("input",{type:"number",min:2,max:64,id:"labCharsBatch"}),speed=h("select",{id:"labCharsSpeed"}),gpu=h("input",{type:"checkbox",id:"labCharsGpu","aria-label":"Use the graphics chip when there is one"}),cont=h("input",{type:"checkbox",id:"labCharsKeep"});
  [[0.5,"gentler"],[1,"usual"],[2,"quicker"]].forEach(function(o){speed.appendChild(h("option",{value:o[0],text:o[1]}));});speed.value="1";
  [32,48,64,96,128].forEach(function(n){ctx.appendChild(h("option",{value:n,text:n+" letters"}));});
  function applySize(){var z=SIZES[S.size];sizeSay.textContent=z.name+": "+z.about+". "+z.says;steps.value=z.steps;ctx.value=String(z.T);batch.value=z.B;}
  var segEl=seg("labCharsSize",sizes,S.size,function(k){S.size=k;PREF.size=k;keep();applySize();});
  P.appendChild(sect("2. How big, and for how long","A larger model has more numbers to adjust, so it can learn more, but each step takes longer. A step shows it a small handful of passages from your text and corrects its guesses a little.",[segEl,sizeSay,
    h("div","lb-grid",[knob("Steps","How many times it is corrected. More steps teach more, up to a point.",steps)]),
    h("details","lb-more",[h("summary",{text:"Settings, if you want them"}),h("div","lb-grid",[
      knob("How far back it reads","How many letters it sees at once. More lets it follow longer phrases and takes longer.",ctx),
      knob("Passages at a time","How many passages it learns from in each step. More is steadier and slower.",batch),
      knob("How big each correction is","Gentler is slower and safer; quicker can overshoot, and the loss then rises.",speed)]),
      h("label","lb-check",[gpu,D.createTextNode(" Use the graphics chip when there is one (otherwise the processor)")]),
      h("label","lb-check",[cont,D.createTextNode(" Carry on training the model I have, instead of a new one (the same letters and size)")]),h("div",{"class":"small muted",id:"labCharsEnv"})])]));
  var rb=runBar("labChars",{go:"Start the lesson",unit:"Step",xlab:"steps"}),sample=h("div",{"class":"lb-sample",id:"labCharsSample","aria-live":"off"},[h("small",{text:"What it writes now"}),h("span",{text:"Nothing yet: a sample appears every few steps."})]);S.rb=rb;
  P.appendChild(sect("3. Learn","Start, and watch the loss fall: it is how surprised the model is by the next letter, lower being better. The dotted line is guessing at random. You can pause or stop whenever you like; what it has learned so far is kept.",rb.els.concat([sample])));
  var pr=h("input",{type:"text",id:"labCharsPrompt","aria-label":"Begin with",placeholder:"e.g. It is a truth",maxlength:120}),temp=h("select",{id:"labCharsTemp"}),out=h("div",{"class":"lb-sample",id:"labCharsOut"},[h("small",{text:"What it writes"}),h("span",{text:"Press Write."})]);
  [[0.5,"careful"],[0.8,"usual"],[1.1,"adventurous"]].forEach(function(o){temp.appendChild(h("option",{value:o[0],text:o[1]}));});temp.value="0.8";
  var wr=btn("Write",null,"primary","labCharsWrite");
  wr.onclick=function(){wr.disabled=true;out.lastChild.textContent="Writing…";writeChars(pr.value,240,+temp.value).then(function(t){out.innerHTML="";out.appendChild(h("small",{text:"What it writes"}));out.appendChild(h("span",{text:pr.value+t}));},function(e){out.lastChild.textContent=String(e&&e.message||e);}).then(function(){wr.disabled=false;});};
  P.appendChild(sect("4. Try it","Begin a sentence and the model continues it, one letter at a time, choosing what your text made likely. Expect your text's common words and punctuation, and short phrases after more steps. It does not follow instructions or answer questions.",[h("div","lb-try",[h("label","field",[h("span",{text:"Begin with"}),pr]),h("label","field",[h("span",{text:"How adventurous"}),temp]),wr]),out]));
  var saved=savedBox("chars","labCharsSaved",function(n){var s=S.rb.status;s.textContent="Opening “"+n+"”…";loadChars(n).then(function(r){cont.checked=true;S.rb.paint(null,CS.hist,CS.rand,"“"+n+"” is open: "+n0(r.step)+" steps of learning, "+n0(r.params)+" numbers. Write with it, or carry on training it.");S.sampleBox.lastChild.textContent=CS.sample||"";
      S.sampleBox.firstChild.textContent="What it wrote when it was kept";},function(e){s.textContent=String(e&&e.message||e);});});S.saved=saved;S.sampleBox=sample;
  var kr=keepRow("chars","labChars",saveChars,saved);
  P.appendChild(sect("5. Keep it","A model you keep stays in this browser, on this device, under the name you give; open it again later to write with it or to train it further.",[kr.el,h("h3",{text:"Kept on this device",style:"margin-top:14px"}),saved.el]));
  applySize();gpu.checked=PREF.gpu!==false;gpu.onchange=function(){PREF.gpu=gpu.checked;keep();var g2=$("labGpu");if(g2)g2.checked=gpu.checked;};
  rb.go.onclick=function(){var run;startChars({text:tb.get(),name:tb.name(),size:S.size,steps:numOf(steps,10,100000,SIZES[S.size].steps),ctx:+ctx.value,batch:numOf(batch,2,64,SIZES[S.size].B),lrMul:+speed.value,keep:cont.checked,
      onTick:function(){var r=RUN;if(!r)return;rb.paint(r,r.hist,CS&&CS.rand);if(CS&&CS.sample){sample.lastChild.textContent=CS.sample;sample.firstChild.textContent="What it writes now (step "+n0(CS.step)+")";}
        rb.stats.textContent=(CS&&CS.loss!=null?"loss now "+CS.loss.toFixed(2):"")+(CS&&CS.val!=null?" · held back "+CS.val.toFixed(2):"")+(CS?" · "+n0(CS.params)+" numbers":"");}}).then(function(r){
      rb.paint({state:r.state,step:r.steps,steps:r.steps,msg:(r.state==="stopped"?"Stopped at step "+n0(r.steps)+". What it has learned so far is kept; write with it, keep it, or carry on.":"Done: "+n0(r.steps)+" steps, the loss from "+(r.first!=null?r.first.toFixed(2):"?")+" to "+(r.loss!=null?r.loss.toFixed(2):"?")+(r.val!=null?", "+r.val.toFixed(2)+" on the part held back":"")+"."),backend:r.backend},r.hist,CS&&CS.rand);
      sample.lastChild.textContent=r.sample;sample.firstChild.textContent="What it writes now (step "+n0(CS.step)+")";rb.stats.textContent="loss "+(r.loss!=null?r.loss.toFixed(2):"?")+(r.val!=null?" · held back "+r.val.toFixed(2):"")+" · "+n0(r.params)+" numbers · "+(r.ms?(1000/r.ms).toFixed(1)+" steps a second":"");},function(e){rb.status.textContent=String(e&&e.message||e);rb.status.className="lb-status bad";rb.paint(null);});};
  rb.pa.onclick=function(){if(!RUN||RUN.kind!=="chars")return;if(RUN.paused)RUN.resume();else RUN.pause();setTimeout(function(){rb.paint(RUN);},0);};
  rb.stop.onclick=function(){if(RUN&&RUN.kind==="chars")RUN.cancel();};
  P.__refresh=function(){tb.refresh();saved.paint();var e=$("labCharsEnv");if(e)e.textContent="This device: "+(dev().memGB?dev().memGB+" GB of memory":"memory not reported")+(dev().cores?", "+dev().cores+" processor cores":"")+(dev().small?". Small devices are offered the two smaller sizes.":".");};
  return P;}

/* ----- Sort my notes ----- */
function buildNotes(){var P=h("div",{"class":"lb-panel",role:"tabpanel",id:"labP-notes","aria-labelledby":"labT-notes"}),S=ST.notes;
  var ta=h("textarea",{"class":"lb-text",id:"labNotesText",rows:9,"aria-label":"Examples, one a line",spellcheck:"false",placeholder:"history: The treaty ended the war.\ncooking: Fry the onions in butter.\n?: a note you have not labelled yet"}),info=h("div",{"class":"small muted lb-count",id:"labNotesCount",role:"status"});
  function count(){var p=parseExamples(ta.value),c={},ord=[];p.examples.forEach(function(r){var k=r.label.toLowerCase();if(!c[k]){c[k]={label:r.label,n:0};ord.push(k);}c[k].n++;});
    info.textContent=p.examples.length?n0(p.examples.length)+" examples under "+ord.length+" label"+(ord.length===1?"":"s")+": "+ord.map(function(k){return c[k].label+" ("+c[k].n+")";}).join(", ")+(p.unlabelled.length?" · "+n0(p.unlabelled.length)+" line"+(p.unlabelled.length===1?"":"s")+" with no label, to be sorted afterwards":"")+(ord.length<2||p.examples.length<4?" · at least two labels and four examples are needed":""):(p.unlabelled.length?n0(p.unlabelled.length)+" lines, none labelled yet.":"Nothing yet.");}
  ta.oninput=count;S.ta=ta;
  var keys=h("div","lb-keys",[btn("Bring in my sticky notes",function(){var ns=[];try{ns=(state.notes||[]).map(function(n){return plainOf(n.text||"").replace(/\s+/g," ").trim();}).filter(function(t){return t.length>=3;});}catch(e){}
      if(!ns.length){toast("There are no sticky notes with words in them.");return;}ta.value=(ta.value.trim()?ta.value.replace(/\s+$/,"")+"\n":"")+ns.map(function(t){return "?: "+t;}).join("\n")+"\n";count();toast(n0(ns.length)+" notes added as lines with no label. Put a label in front of some of them, like  ideas: …  to teach the sorter.");},"ghost"),
    btn("Try a sample",function(){ta.value=SAMPLE_NOTES;count();},"ghost"),btn("Clear",function(){ta.value="";count();},"ghost")]);
  P.appendChild(sect("1. Your examples","Write one example a line: a label, a colon, then the note, like  history: The treaty ended the war.  A line that begins with ?: has no label yet: it is not learned from, and the sorter labels it afterwards. At least two labels and four examples are needed; a dozen or more is better.",[ta,keys,info]));
  var epochs=h("input",{type:"number",min:5,max:1000,value:120,id:"labNotesRounds","aria-label":"Rounds"});
  P.appendChild(sect("2. How long","A round shows it every example once. A small set learns in a few seconds.",[h("div","lb-grid",[knob("Rounds","More rounds fit the examples more closely; past a point that only memorises them.",epochs)])]));
  var rb=runBar("labNotes",{go:"Learn to sort",unit:"Round",xlab:"rounds"});S.rb=rb;var res=h("div",{id:"labNotesResult","class":"lb-note"});
  P.appendChild(sect("3. Learn","A tenth or so of the examples is held back and not learned from; how it does on those is the fair figure. With only a few examples it is a rough one.",rb.els.concat([res])));
  var tin=h("input",{type:"text",id:"labNotesTry","aria-label":"A note to sort",placeholder:"Type a note and see where it goes"}),tout=h("div",{id:"labNotesOut"}),tgo=btn("Sort it",null,"primary","labNotesTryGo"),sort=btn("Sort the lines with no label",null,"ghost","labNotesSort"),sorted=h("div",{id:"labNotesSorted"});
  tgo.onclick=function(){if(!NMODEL){tout.textContent="Train the sorter first, or use a saved one.";return;}tout.innerHTML="";tout.appendChild(bars(predictNM(NMODEL,tin.value).slice(0,4)));};tin.onkeydown=function(e){if(e.key==="Enter"){e.preventDefault();tgo.onclick();}};
  sort.onclick=function(){sorted.innerHTML="";var rs;try{rs=sortRest(ta.value);}catch(e){sorted.textContent=String(e&&e.message||e);return;}if(!rs.length){sorted.appendChild(h("div",{"class":"small muted",text:"There are no lines without a label in the box above. Add some with ?: in front, or bring in your sticky notes."}));return;}
    var t=h("table","lb-table",[h("tr",null,[h("th",{text:"Note"}),h("th",{text:"Goes under"}),h("th",{text:"How sure"})])]);rs.forEach(function(r){t.appendChild(h("tr",null,[h("td",{text:r.text}),h("td",{text:r.label}),h("td",{text:pct(r.p)})]));});sorted.appendChild(t);};
  P.appendChild(sect("4. Try it","Type a note and see which label it goes under, and how sure the sorter is. How sure is not how right: a sorter can be sure and wrong.",[h("div","lb-try",[h("label","field",[h("span",{text:"A note"}),tin]),tgo,sort]),tout,sorted]));
  var saved=savedBox("notes","labNotesSaved",function(n){rb.status.textContent="Opening “"+n+"”…";loadNotes(n).then(function(r){rb.status.textContent="“"+n+"” is open: labels "+r.labels.join(", ")+".";showResult();},function(e){rb.status.textContent=String(e&&e.message||e);});});
  var kr=keepRow("notes","labNotes",saveNotes,saved);
  P.appendChild(sect("5. Keep it","The sorter's words and weights are kept in this browser under the name you give. Your notes themselves are not kept by the workbench.",[kr.el,h("h3",{text:"Kept on this device",style:"margin-top:14px"}),saved.el]));
  function showResult(){res.innerHTML="";if(!NMODEL)return;var N=NMODEL;
    res.appendChild(h("p",{text:(N.accTrain?"On the examples it learned from: "+N.accTrain.right+" of "+N.accTrain.of+" right. ":"")+(N.accHeld?"On the "+N.accHeld.of+" held back: "+N.accHeld.right+" right ("+pct(N.accHeld.p)+")"+(N.accHeld.of<10?", a rough figure from so few":"")+".":"No examples could be held back from so few, so there is no fair figure yet.")}));
    if(N.top&&N.top.length){var ul=h("ul");N.top.forEach(function(t){if(t.words.length)ul.appendChild(h("li",null,[h("b",{text:t.label}),": words that point to it: "+t.words.join(", ")]));});res.appendChild(h("p",{text:"What it learned to look for:"}));res.appendChild(ul);}
    res.appendChild(h("p",{"class":"small muted",text:"It learns the words your examples use. A note in other words, or about something your examples never mention, may go under the wrong label."}));}
  rb.go.onclick=function(){res.innerHTML="";trainNotes({text:ta.value,epochs:numOf(epochs,5,1000,120),onTick:function(){var r=RUN;if(r)rb.paint(r,r.hist,null);}}).then(function(r){
      rb.paint({state:r.state,step:r.hist.length,steps:r.hist.length,msg:(r.state==="stopped"?"Stopped. ":"Done. ")+"The loss went from "+(r.first!=null?r.first.toFixed(2):"?")+" to "+(r.last!=null?r.last.toFixed(2):"?")+".",backend:r.backend},r.hist,null);showResult();},function(e){rb.status.textContent=String(e&&e.message||e);rb.status.className="lb-status bad";rb.paint(null);});};
  rb.pa.onclick=function(){if(!RUN||RUN.kind!=="notes")return;if(RUN.paused)RUN.resume();else RUN.pause();setTimeout(function(){rb.paint(RUN);},0);};rb.stop.onclick=function(){if(RUN&&RUN.kind==="notes")RUN.cancel();};
  count();P.__refresh=function(){saved.paint();};return P;}

/* ----- Sort my pictures ----- */
function buildPictures(){var P=h("div",{"class":"lb-panel",role:"tabpanel",id:"labP-pictures","aria-labelledby":"labT-pictures"}),S=ST.pictures,list=h("div",{"class":"lb-cats",id:"labPicCats"});
  function newCat(name){if(PICS.length>=12){toast("Twelve categories are the most it takes.");return;}PICS.push({name:name||"",items:[]});paintCats();}
  function paintCats(){list.innerHTML="";PICS.forEach(function(c,ci){var nm=h("input",{type:"text",value:c.name,maxlength:40,placeholder:"Category "+(ci+1)+" (a name, such as “portraits”)","aria-label":"Name of category "+(ci+1),"class":"lb-catname"}),
        fi=h("input",{type:"file",accept:"image/*",multiple:true,hidden:true,"aria-label":"Pictures for category "+(ci+1)}),th=h("div","lb-thumbs"),say=h("div",{"class":"small muted"});
      nm.oninput=function(){c.name=nm.value;};
      function thumbs(){th.innerHTML="";c.items.forEach(function(it){th.appendChild(h("img",{src:it.thumb,alt:"",title:it.name}));});say.textContent=c.items.length?n0(c.items.length)+" picture"+(c.items.length===1?"":"s"):"No pictures yet.";}
      fi.onchange=function(){var fs=fi.files;if(!fs||!fs.length)return;say.textContent="Looking at the pictures…";addPictures(ci,fs,function(i,n){say.textContent="Looking at picture "+i+" of "+n+"…";}).then(function(r){thumbs();if(r.problems.length)say.textContent+=" · not added: "+r.problems.slice(0,2).join("; ");},function(e){say.textContent=String(e&&e.message||e);});fi.value="";};
      var add=btn("Add pictures",function(){fi.click();},"ghost"),rm=btn("Remove the category",function(){PICS.splice(ci,1);paintCats();},"ghost danger");
      list.appendChild(h("div","lb-cat",[h("div","lb-cat-h",[nm,add,fi,rm]),th,say]));thumbs();});}
  while(PICS.length<2)PICS.push({name:"",items:[]});paintCats();S.paint=paintCats;
  P.appendChild(sect("1. Your categories","Name each category and add pictures to it. Two categories and a few pictures each is enough to begin; five or more of each is better. Each picture is looked at on this device, once, and only what the picture reader makes of it is kept while you work, not the picture.",[list,h("div","lb-keys",[btn("Add a category",function(){newCat("");},"ghost","labPicAdd")])]));
  var epochs=h("input",{type:"number",min:10,max:1000,value:150,id:"labPicRounds","aria-label":"Rounds"});
  P.appendChild(sect("2. How long","Only the last step is learned, on top of what the picture reader already knows, so this takes seconds.",[h("div","lb-grid",[knob("Rounds","More rounds fit your pictures more closely.",epochs)])]));
  var rb=runBar("labPic",{go:"Learn to sort",unit:"Round",xlab:"rounds"});S.rb=rb;var res=h("div",{id:"labPicResult","class":"lb-note"});
  P.appendChild(sect("3. Learn","A fifth of the pictures is held back when there are ten or more; how it does on those is the fair figure.",rb.els.concat([res])));
  var fi2=h("input",{type:"file",accept:"image/*",id:"labPicTry","aria-label":"A picture to sort",hidden:true}),pk=btn("Choose a picture\u2026",function(){fi2.click();},"ghost","labPicTryKey"),out=h("div",{id:"labPicOut"}),img=h("img",{alt:"",style:"width:96px;height:96px;object-fit:cover;border-radius:10px;border:1px solid var(--hairline);margin-top:8px",hidden:true});
  fi2.onchange=function(){var f=fi2.files&&fi2.files[0];fi2.value="";if(!f)return;out.textContent="Looking…";predictPicture(f).then(function(r){img.src=r.thumb;img.hidden=false;out.innerHTML="";out.appendChild(bars(r.guess.slice(0,4)));},function(e){out.textContent=String(e&&e.message||e);});};
  P.appendChild(sect("4. Try it","Choose a picture to sort. How sure is not how right: a sorter can be sure and wrong, above all about a picture unlike the ones it was shown.",[h("div","lb-keys",[pk,fi2]),img,out]));
  var saved=savedBox("pictures","labPicSaved",function(n){rb.status.textContent="Opening “"+n+"”…";loadPictures(n).then(function(r){rb.status.textContent="“"+n+"” is open: categories "+r.labels.join(", ")+".";showResult();},function(e){rb.status.textContent=String(e&&e.message||e);});});
  var kr=keepRow("pictures","labPic",savePictures,saved);
  P.appendChild(sect("5. Keep it","What the sorter learned is kept in this browser under the name you give: a small set of numbers, none of your pictures.",[kr.el,h("h3",{text:"Kept on this device",style:"margin-top:14px"}),saved.el]));
  function showResult(){res.innerHTML="";if(!PMODEL)return;var N=PMODEL;res.appendChild(h("p",{text:(N.accTrain?"On the pictures it learned from: "+N.accTrain.right+" of "+N.accTrain.of+" right. ":"")+(N.accHeld?"On the "+N.accHeld.of+" held back: "+N.accHeld.right+" right ("+pct(N.accHeld.p)+").":"No pictures could be held back from so few, so there is no fair figure yet.")}));}
  rb.go.onclick=function(){res.innerHTML="";trainPictures({epochs:numOf(epochs,10,1000,150),onTick:function(){var r=RUN;if(r)rb.paint(r,r.hist,null);}}).then(function(r){
      rb.paint({state:r.state,step:r.hist.length,steps:r.hist.length,msg:(r.state==="stopped"?"Stopped. ":"Done. ")+"The loss went from "+(r.first!=null?r.first.toFixed(2):"?")+" to "+(r.last!=null?r.last.toFixed(2):"?")+".",backend:r.backend},r.hist,null);showResult();},function(e){rb.status.textContent=String(e&&e.message||e);rb.status.className="lb-status bad";rb.paint(null);});};
  rb.pa.onclick=function(){if(!RUN||RUN.kind!=="pictures")return;if(RUN.paused)RUN.resume();else RUN.pause();setTimeout(function(){rb.paint(RUN);},0);};rb.stop.onclick=function(){if(RUN&&RUN.kind==="pictures")RUN.cancel();};
  P.__refresh=function(){saved.paint();};return P;}

/* ----- Words that sit together ----- */
function buildWords(){var P=h("div",{"class":"lb-panel",role:"tabpanel",id:"labP-words","aria-labelledby":"labT-words"}),S=ST.words;
  var tb=textBox("labWordsText",{placeholder:"Paste a few thousand words of your own writing here, or use one of the keys below.",min:400,good:5000,words:true,sample:sampleWordsText,sampleName:"a made-up sample about kings, dogs and rivers",empty:"Nothing yet. At least 400 words are needed; a few thousand is better."});S.box=tb;
  P.appendChild(sect("1. Your text","The map learns from the words that stand near one another in this text. It learns your text's company of words, not what the words mean.",[tb.el]));
  var sizes=["small","medium","large"].map(function(k){return {k:k,t:WSIZES[k].name,title:WSIZES[k].says};}),steps=h("input",{type:"number",min:10,max:20000,value:600,id:"labWordsSteps","aria-label":"Steps"}),win=h("select",{id:"labWordsWin"}),vocab=h("select",{id:"labWordsVocab"});
  [2,3,4,6].forEach(function(n){win.appendChild(h("option",{value:n,text:n+" words each side"}));});win.value="3";[1000,2000,4000].forEach(function(n){vocab.appendChild(h("option",{value:n,text:"the "+n0(n)+" most used"}));});vocab.value="2000";
  P.appendChild(sect("2. How big, and for how long","Each word becomes a short list of numbers. Longer lists can hold more, and take longer to learn.",[seg("labWordsSize",sizes,S.size,function(k){S.size=k;}),
    h("div","lb-grid",[knob("Steps","How many handfuls of word pairs it learns from.",steps)]),
    h("details","lb-more",[h("summary",{text:"Settings, if you want them"}),h("div","lb-grid",[knob("How near counts as together","A word keeps company with the words this close to it.",win),knob("Words it learns","The most used words of your text; the rarest are left out.",vocab)])])]));
  var rb=runBar("labWords",{go:"Learn the words",unit:"Step",xlab:"steps"});S.rb=rb;var res=h("div",{id:"labWordsResult","class":"lb-note"});
  P.appendChild(sect("3. Learn","The loss is how well it tells a word's real neighbours from words picked at random, lower being better. A twentieth of your text is held back to check it.",rb.els.concat([res])));
  var q=h("input",{type:"text",id:"labWordsLook","aria-label":"A word, or a sum of words",placeholder:"king   or   king - man + woman"}),out=h("div",{id:"labWordsOut"}),go=btn("Look",null,"primary","labWordsFind"),map=h("div",{"class":"lb-map",id:"labWordsMap"}),mg=btn("Draw a map",null,"ghost","labWordsMapGo");
  go.onclick=function(){out.innerHTML="";if(!WMODEL){out.textContent="Train the word map first, or use a saved one.";return;}var r;try{r=lookWord(q.value,10);}catch(e){out.textContent=String(e&&e.message||e);return;}
    if(!r.near.length){out.textContent=r.missing.length?"It does not know "+r.missing.map(function(w){return "“"+w+"”";}).join(", ")+": it is not among the words it learned.":"Type a word.";return;}
    out.appendChild(bars(r.near.map(function(x){return {label:x.word,p:Math.max(0,x.sim)};})));
    if(r.missing.length)out.appendChild(h("div",{"class":"small muted",text:"Not known, and left out: "+r.missing.join(", ")+"."}));};q.onkeydown=function(e){if(e.key==="Enter"){e.preventDefault();go.onclick();}};
  mg.onclick=function(){map.innerHTML="";var pts;try{pts=mapWords(70);}catch(e){map.textContent=String(e&&e.message||e);return;}
    var xs=pts.map(function(p){return p.x;}),ys=pts.map(function(p){return p.y;}),x0=Math.min.apply(null,xs),x1=Math.max.apply(null,xs),y0=Math.min.apply(null,ys),y1=Math.max.apply(null,ys),Wd=520,Ht=380;
    var svg='<svg viewBox="0 0 '+Wd+' '+Ht+'" role="img" aria-label="A map of the most used words: words used in the same places are drawn near one another">';
    pts.forEach(function(p){var X=20+(Wd-40)*(p.x-x0)/((x1-x0)||1),Y=20+(Ht-40)*(p.y-y0)/((y1-y0)||1);svg+='<circle cx="'+X.toFixed(1)+'" cy="'+Y.toFixed(1)+'" r="3.2"/><text x="'+(X+5).toFixed(1)+'" y="'+(Y+3).toFixed(1)+'">'+esc(p.word)+'</text>';});
    map.innerHTML=svg+'</svg>';map.appendChild(h("div",{"class":"small muted",text:"The 70 most used words, flattened to two directions. Flattening loses a great deal: near on the map is a hint, not a measure."}));};
  P.appendChild(sect("4. Explore","Type a word to see the words nearest it. Add and subtract words to follow a pattern, like  king - man + woman. How near is a number from 0 to 1; 1 is the same word.",[h("div","lb-try",[h("label","field",[h("span",{text:"A word, or a sum of words"}),q]),go,mg]),out,map]));
  var saved=savedBox("words","labWordsSaved",function(n){rb.status.textContent="Opening “"+n+"”…";loadWords(n).then(function(r){rb.status.textContent="“"+n+"” is open: "+n0(r.vocab)+" words of "+r.dims+" numbers each.";},function(e){rb.status.textContent=String(e&&e.message||e);});});
  var kr=keepRow("words","labWords",saveWords,saved);
  P.appendChild(sect("5. Keep it","The numbers of each word are kept in this browser under the name you give. Your text is not kept by the workbench.",[kr.el,h("h3",{text:"Kept on this device",style:"margin-top:14px"}),saved.el]));
  function showResult(r){res.innerHTML="";if(!WMODEL)return;res.appendChild(h("p",{text:n0(WMODEL.V)+" words, "+WMODEL.D+" numbers each, from "+n0(WMODEL.textWords)+" words of text."+(WMODEL.rank!=null?" Held back: it ranks a real neighbour above a random word in "+pct(WMODEL.rank)+" of the pairs it never learned from (guessing would be 50%).":"")}));}
  rb.go.onclick=function(){res.innerHTML="";trainWords({text:tb.get(),size:S.size,steps:numOf(steps,10,20000,600),window:+win.value,vocab:+vocab.value,onTick:function(){var r=RUN;if(r)rb.paint(r,r.hist,null);}}).then(function(r){
      rb.paint({state:r.state,step:r.steps,steps:r.steps,msg:(r.state==="stopped"?"Stopped at step "+n0(r.steps)+". ":"Done: "+n0(r.steps)+" steps. ")+"The loss went from "+(r.first!=null?r.first.toFixed(2):"?")+" to "+(r.last!=null?r.last.toFixed(2):"?")+".",backend:r.backend},r.hist,null);showResult();},function(e){rb.status.textContent=String(e&&e.message||e);rb.status.className="lb-status bad";rb.paint(null);});};
  rb.pa.onclick=function(){if(!RUN||RUN.kind!=="words")return;if(RUN.paused)RUN.resume();else RUN.pause();setTimeout(function(){rb.paint(RUN);},0);};rb.stop.onclick=function(){if(RUN&&RUN.kind==="words")RUN.cancel();};
  P.__refresh=function(){tb.refresh();saved.paint();};return P;}

var BUILD={chars:buildChars,notes:buildNotes,pictures:buildPictures,words:buildWords};
function showTool(k,remember){if(!UI.tabs[k])k="chars";UI.tool=k;if(!UI.panels[k]){UI.panels[k]=BUILD[k]();UI.host.appendChild(UI.panels[k]);UI.tabs[k].setAttribute("aria-controls","labP-"+k);}
  TOOLS.forEach(function(t){var on=t.k===k;UI.tabs[t.k].setAttribute("aria-selected",on?"true":"false");UI.tabs[t.k].tabIndex=on?0:-1;if(UI.panels[t.k])UI.panels[t.k].hidden=!on;});
  var t=TOOLS.filter(function(x){return x.k===k;})[0];UI.says.textContent=t.says;if(remember){PREF.tool=k;keep();}try{if(UI.panels[k].__refresh)UI.panels[k].__refresh();}catch(e){warn(e);}}
function engineLine(){var e=$("labEngine");if(!e)return;var d=dev(),b=TF?TF.getBackend():null,gp=webgpu();e.innerHTML="";
  if(!carried()){e.appendChild(D.createTextNode("This copy of Ingenium carries no TensorFlow.js (a lean copy, such as the one the Forge carries), so the workbench cannot train here."));return;}
  e.appendChild(D.createTextNode("Everything here runs in this page, on this device. Nothing is sent anywhere."));
  var more=h("details",null,[h("summary",{text:"About this engine"}),h("p",{"class":"small",style:"margin:6px 0 0",text:"The learning uses TensorFlow.js"+(TF?" "+(TF.version_core||""):"")+", which Ingenium carries for its picture reader. It loads when you start a lesson."+(b?" Now it is using the "+(b==="webgl"?"graphics chip (WebGL)":"processor")+".":"")+" This device: "+(d.memGB?d.memGB+" GB of memory":"memory not reported")+(d.cores?", "+d.cores+" processor cores":"")+". "+(gp?"WebGPU is present here, but this copy carries TensorFlow.js's WebGL and processor backends only, so it is not used.":"WebGPU is not present here; it would not be used in this copy in any case.")})]);
  e.appendChild(more);
  var gpu=h("input",{type:"checkbox",id:"labGpu","aria-label":"Use the graphics chip when there is one"});gpu.checked=PREF.gpu!==false;gpu.onchange=function(){PREF.gpu=gpu.checked;keep();var g1=$("labCharsGpu");if(g1)g1.checked=gpu.checked;};
  e.appendChild(h("label",null,[gpu,D.createTextNode(" Use the graphics chip when there is one (otherwise the processor)")]));}
function card(){var c=$("ingLabCard");if(c)return c;c=h("div","card",null);c.id="ingLabCard";c.setAttribute("role","region");c.setAttribute("aria-labelledby","ingLabH");
  c.appendChild(h("h2",{"class":"sec",id:"ingLabH",text:"The learning workbench"}));
  c.appendChild(h("p","small muted","Make a small model learn, here in this page, on any device, and watch it. These are lessons in how models learn, not rivals to the models you chat with: they are far smaller, and they learn manner, not knowledge. Each tool runs one lesson at a time, can be paused or stopped, and keeps nothing unless you keep it."));
  var eng=h("div",{"class":"lb-engine",id:"labEngine"});c.appendChild(eng);
  var tl=h("div",{"class":"lb-tabs",role:"tablist","aria-label":"The workbench's tools",id:"labTabs"});UI.tabs={};
  TOOLS.forEach(function(t){var b=h("button",{type:"button","class":"lb-tab",role:"tab",id:"labT-"+t.k,"aria-selected":"false",text:t.t,"data-tool":t.k});b.tabIndex=-1;b.onclick=function(){showTool(t.k,true);};UI.tabs[t.k]=b;tl.appendChild(b);});
  tl.addEventListener("keydown",function(e){var k=e.key;if(k!=="ArrowLeft"&&k!=="ArrowRight"&&k!=="Home"&&k!=="End")return;var bs=TOOLS.map(function(t){return UI.tabs[t.k];}),i=bs.indexOf(D.activeElement);if(i<0)return;e.preventDefault();
    var j=k==="Home"?0:k==="End"?bs.length-1:(i+(k==="ArrowRight"?1:-1)+bs.length)%bs.length;showTool(TOOLS[j].k,true);bs[j].focus();});
  c.appendChild(tl);UI.says=h("p",{"class":"lb-says",id:"labSays","aria-live":"polite"});c.appendChild(UI.says);UI.host=h("div",{id:"labPanels"});c.appendChild(UI.host);
  var host=$("rmP-models-studio")||$("page-models");if(host){var tc=$("trainCard");if(tc&&tc.parentNode===host&&tc.nextSibling)host.insertBefore(c,tc.nextSibling);else host.appendChild(c);}
  try{if(W.IngStudio)IngStudio.fileCard(c);}catch(e){}
  return c;}
/* Help lists the workbench and says what it is; the trainer's card, where the computer app's trainer is not, points to it */
function helpEntries(){try{var H=W.IngHelp,P=H&&H.pages&&H.pages.models;if(!P||!P.dos||P.dos.__lab)return;
  P.dos.push(["Train a small model in the page","Four small lessons for any device: write like your text, sort your notes or pictures, find words that sit together.","#ingLabCard"]);P.dos.__lab=1;
  if(Array.isArray(H.map))H.map.push(["#ingLabCard","The learning workbench","Small models that learn in this page, on any device: write like a text of yours, sort your notes or your pictures, find the words that sit together. Each lesson can be paused or stopped, and nothing is kept unless you keep it."]);}catch(e){warn(e);}}
function trainHint(){var host=$("trainBody");if(!host||host.querySelector(".lb-hint"))return;var has=false;try{has=typeof trainApi==="function"&&!!trainApi();}catch(e){}if(has)return;
  var d=h("div","small muted lb-hint",[D.createTextNode("Smaller lessons run in this page, on any device: the learning workbench, below. "),btn("Open the learning workbench",function(){open(UI.tool||"chars");},"ghost")]);d.style.marginTop="10px";host.appendChild(d);}
function hookTrain(){var o=W.renderTrainCard;if(typeof o!=="function"||o.__r201)return;var n=function(){var r=o.apply(this,arguments);try{trainHint();}catch(e){}return r;};n.__r201=1;W.renderTrainCard=n;try{renderTrainCard=n;}catch(e){}}
function setup(){if(UI.built)return true;if(!$("page-models"))return false;card();engineLine();showTool(PREF.tool&&UI.tabs[PREF.tool]?PREF.tool:"chars",false);helpEntries();hookTrain();UI.built=true;try{trainHint();}catch(e){}return true;}
function open(kind,o){o=o||{};if(!setup())return false;try{if(W.IngRooms)IngRooms.open("models","studio",false);if(W.IngStudio)IngStudio.open("train",false);}catch(e){}
  showTool(UI.tabs[kind]?kind:"chars",false);var st=ST[UI.tool];
  if(o.text!=null&&st&&st.box){st.box.set(String(o.text),o.name||"");}
  try{var c=$("ingLabCard");if(c&&c.scrollIntoView)c.scrollIntoView({block:"start"});}catch(e){}return true;}
function current(){var k=UI.tool,st=ST[k]||{},box=st.box;return {kind:k,chars:box?box.get().length:0,name:box?box.name():"",running:RUN?RUN.kind:null,model:k==="chars"?!!(CS&&CS.M&&!CS.M.dead):k==="notes"?!!NMODEL:k==="pictures"?!!PMODEL:!!WMODEL};}
function stopAll(){if(RUN)RUN.cancel();}
function lateInit(){try{setup();}catch(e){warn(e);}}
lateInit();if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",lateInit);
(function later(){var n=0;(function wait(){if(W.__ingReady===true){lateInit();return;}if(++n<400)setTimeout(wait,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r201){return;}var ng=function(p){var r=og.apply(this,arguments);try{if(p==="models")setTimeout(function(){try{if(setup()){engineLine();var pn=UI.panels[UI.tool];if(pn&&pn.__refresh)pn.__refresh();}}catch(e){warn(e);}},0);}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r201=true;W.go=ng;try{go=ng;}catch(e){}})();

W.IngLab={version:1,open:open,current:current,tools:function(){return TOOLS.map(function(t){return {key:t.k,name:t.t,says:t.says};});},stopAll:stopAll,
  sizes:SIZES,sampleText:function(){return SAMPLE_AUSTEN;},sampleNotes:function(){return SAMPLE_NOTES;},sampleWords:sampleWordsText,
  engine:{load:loadTF,carried:carried,backend:function(){return TF?TF.getBackend():null;},memory:memInfo,prefer:function(gpu){PREF.gpu=!!gpu;keep();},webgpu:webgpu,use:useBackend},
  run:function(){return RUN?{kind:RUN.kind,state:RUN.state,step:RUN.step,steps:RUN.steps,paused:RUN.paused,msg:RUN.msg,backend:RUN.backend,ms:pace(RUN)}:null;},pause:function(){if(RUN)RUN.pause();},resume:function(){if(RUN)RUN.resume();},stop:stopAll,
  chars:{start:startChars,write:writeChars,save:saveChars,load:loadChars,state:function(){return CS?{step:CS.step,loss:CS.loss,val:CS.val,sample:CS.sample,params:CS.params,vocab:CS.V,cfg:CS.cfg,backend:CS.backend,hist:CS.hist.slice(),dead:!!CS.M.dead}:null;},forget:function(){if(CS)dropVars(CS.M);CS=null;},
    weights:function(){if(!CS)return null;var o={};Object.keys(CS.M.w).forEach(function(k){o[k]=CS.M.w[k].dataSync().slice(0,4);});return o;}},
  notes:{parse:parseExamples,train:trainNotes,predict:function(t){if(!NMODEL)throw new Error("Train the sorter first.");return predictNM(NMODEL,t);},sortRest:sortRest,save:saveNotes,load:loadNotes,model:function(){return NMODEL;},forget:function(){NMODEL=null;}},
  pictures:{categories:function(){return PICS;},add:addPictures,train:trainPictures,predict:predictPicture,save:savePictures,load:loadPictures,model:function(){return PMODEL;},forget:function(){PMODEL=null;},reset:function(){PICS.length=0;PICS.push({name:"",items:[]},{name:"",items:[]});if(ST.pictures.paint)ST.pictures.paint();}},
  words:{train:trainWords,look:lookWord,map:mapWords,save:saveWords,load:loadWords,model:function(){return WMODEL;},forget:function(){WMODEL=null;}},
  saved:listSaved,remove:removeSaved,parseExamples:parseExamples};
})();
;try{window.__ingParts["p201"]="running";}catch(_){}
</script>
