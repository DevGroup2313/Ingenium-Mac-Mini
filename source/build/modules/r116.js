<style id="r116-css">
/* ============ R116 · THE MODELS, CARED FOR: QUALITY TIERS, A TRUE PACE MONITOR, HEALTH BY MODEL, A LARGER CATALOGUE ============
   Her list (17 October): "quantization tier selection (Q4_K_M/Q8_0)", "model health dashboard", "performance monitor
   (tokens/s, memory)", and "multiple strong, fast and really efficient and stable and safe local models ... the best
   models that is the most powerful and the best suited for each specific tasks and for each device".
   What R99 began (a Health card, a pace counted from characters, a catalogue with Fast/Balanced/Best) goes the whole way:
   every house offers the qualities its maker published, each with the size and SHA-256 Hugging Face listed on
   17 October 2026 (source/build/lineup_quants.json); the pace is the engine's own count where the engine gives one;
   each installed model has a health line; and the catalogue, 34 models at this stage (36 since 6.6, with the two models to train that r171 adds), is grouped by
   what fits this device. */
.lu-q{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:2px 0}
.lu-q .seg{margin:0;gap:4px}.lu-q .seg-btn{padding:4px 10px;font-size:11.5px}
.lu-q .seg-btn.have::after{content:" ●";font-size:9px;vertical-align:1px;color:#2f7a55}
.lu-q .seg-btn[disabled]{opacity:.45;cursor:not-allowed}
.lu-q-note{font-size:11.5px;color:var(--ink-3);flex:1 1 160px}
.pace-chip{display:inline-flex;align-items:center;gap:6px;font:600 11px/1 var(--sans);padding:0 10px;height:28px;border-radius:999px;border:.5px solid var(--hairline);color:var(--ink-2);background:var(--card);white-space:nowrap}
.pace-chip i{width:7px;height:7px;border-radius:50%;background:var(--ink-3);display:inline-block}
.pace-chip.live i{background:#2f7a55;animation:paceBlink 1s ease-in-out infinite}
.pace-chip.approx{color:var(--ink-3)}
@keyframes paceBlink{0%,100%{opacity:1}50%{opacity:.25}}
.hm-list{margin-top:12px;display:flex;flex-direction:column;gap:6px}
.hm-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.hm-head b{font-size:13px}
.hm-row{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:10px;padding:8px 10px;border:.5px solid var(--hairline-soft);border-radius:10px;background:var(--card)}
.hm-name{font:600 13px/1.3 var(--sans);color:var(--ink-1)}.hm-sub{font-size:11.5px;color:var(--ink-3);margin-top:2px}
.hm-tags{display:flex;flex-wrap:wrap;gap:5px;align-content:flex-start}
.hm-tag{font:600 10.5px/1 var(--sans);padding:4px 8px;border-radius:999px;background:var(--accent-soft,rgba(106,63,181,.10));color:var(--ink-2)}
.hm-tag.ok{background:rgba(47,122,85,.12);color:#2f7a55}.hm-tag.warn{background:rgba(176,128,24,.14);color:#7a5a12}.hm-tag.bad{background:rgba(160,52,40,.12);color:#8a2f25}
.hl-spark{display:inline-block;vertical-align:middle;margin-left:8px}
.hl-spark polyline{fill:none;stroke:var(--accent,#6a3fb5);stroke-width:1.5}
.hl-spark circle{fill:var(--accent,#6a3fb5)}.hl-spark circle.ap{fill:var(--card);stroke:var(--accent,#6a3fb5);stroke-width:1}
.hl-first{font-size:11.5px;color:var(--ink-3)}
.cat-tools{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:6px 0 10px}
.cat-tools input[type=search]{flex:1 1 170px;min-width:120px;padding:6px 10px;border-radius:999px;border:.5px solid var(--hairline);background:var(--card);color:var(--ink-1);font:13px var(--sans)}
.cat-group{font:600 12px/1 var(--sans);color:var(--ink-3);margin:12px 0 6px;letter-spacing:.02em;text-transform:uppercase}
.cat-tag{font:600 10px/1 var(--sans);padding:3px 7px;border-radius:999px;background:var(--accent-soft,rgba(106,63,181,.10));color:var(--accent,#6a3fb5);margin-left:4px;vertical-align:1px}
.cat-tag.code{background:rgba(47,122,85,.12);color:#22603f}/* 6.1: darker, for 4.5:1 at this size (the accessibility audit) */.cat-tag.eyes{background:rgba(24,112,160,.12);color:#1d6a93}
.cat-more{margin-top:8px}
body[data-theme="night"] .hm-tag.ok,body[data-theme="night"] .cat-tag.code{color:#8fd0a9}
body[data-theme="night"] .hm-tag.warn{color:#e2bd68}body[data-theme="night"] .hm-tag.bad{color:#e49a8e}
body[data-theme="night"] .cat-tag.eyes{color:#8cc6e6}body[data-theme="night"] .lu-q .seg-btn.have::after{color:#8fd0a9}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p47"]="started";}catch(_){}
/* R116 · the models, cared for: see the note at the top of its styles */
(function r116Models(){
"use strict";
function $(id){return document.getElementById(id);}
var LU_QUANTS=/*R116_QUANTS*/null;
/* the three qualities a house offers, in the catalogue's own words (Fast, Balanced, Best) */
var LU_Q=[{id:"Q4_K_M",label:"Fast",line:"The smallest file and the quickest replies; the usual choice."},
  {id:"Q5_K_M",label:"Balanced",line:"A little larger and slower, a little closer to the original."},
  {id:"Q8_0",label:"Best",line:"Nearly the original quality; about twice the size of Fast, and slower."}];
function quality(){if(!state.lineupQuality||typeof state.lineupQuality!=="object")state.lineupQuality={};return state.lineupQuality;}
function luVariants(key){var v=LU_QUANTS&&LU_QUANTS[key];if(!v)return null;var out=[];LU_Q.forEach(function(Q){if(v[Q.id])out.push(Object.assign({id:Q.id,label:Q.label,line:Q.line},v[Q.id]));});return out.length>1?out:null;}
function luChosen(key){var q=quality()[key]||"Q4_K_M";var v=LU_QUANTS&&LU_QUANTS[key];return v&&v[q]?q:"Q4_K_M";}
/* the house's listing takes the chosen quality's file, size and fingerprint; everything downstream (the memory
   note, the install, the fingerprint check) then speaks of that file */
function luApply(key,q){var sp=ING_LINEUP.models[key],v=LU_QUANTS&&LU_QUANTS[key];if(!sp||!v||!v[q])return false;
  if(!sp.base)sp.base={file:sp.file,size:sp.size,sha256:sp.sha256,url:sp.url};
  sp.file=v[q].file;sp.size=v[q].size;sp.sha256=v[q].sha256;sp.url=v[q].url;sp.quality=q;return true;}
function luSet(key,q){quality()[key]=q;luApply(key,q);saveState();try{renderLineup();}catch(e){}try{renderModels();}catch(e){}try{paintChatTop();}catch(e){}}
(function luStart(){if(!LU_QUANTS)return;Object.keys(LU_QUANTS).forEach(function(key){var q=quality()[key];if(q&&q!=="Q4_K_M")luApply(key,q);});})();
/* a record on this device belongs to a house whichever quality it was installed at */
function luFileKey(file){var f=String(file||"").toLowerCase();if(!f||!LU_QUANTS)return null;
  for(var key in LU_QUANTS){var v=LU_QUANTS[key];for(var q in v)if(String(v[q].file).toLowerCase()===f)return key;}return null;}
(function luKeys(){var o=lineupKeyOfRec;lineupKeyOfRec=function(m){var k=o.apply(this,arguments);if(k||!m)return k;return luFileKey(m.fileName);};window.lineupKeyOfRec=lineupKeyOfRec;
  var r=lineupRec;lineupRec=function(key){if(!key)return null;var sp=ING_LINEUP.models[key],all=state.models.filter(function(m){return lineupKeyOfRec(m)===key&&m.fileState==="ready";});
    if(!all.length)return null;if(sp){var want=String(sp.file).toLowerCase(),ex=all.filter(function(m){return String(m.fileName||"").toLowerCase()===want;})[0];if(ex)return ex;}
    return r.apply(this,arguments)||all[0];};window.lineupRec=lineupRec;})();
function luRecOf(key,q){var v=LU_QUANTS&&LU_QUANTS[key];if(!v||!v[q])return null;var f=String(v[q].file).toLowerCase();return state.models.filter(function(m){return m.fileState==="ready"&&String(m.fileName||"").toLowerCase()===f;})[0]||null;}
/* the strip on each house's tile */
function luStrip(tile,key){var sp=ING_LINEUP.models[key],vs=luVariants(key);if(!sp)return;var after=tile.querySelector(".lu-model")||tile.querySelector(".lu-line");if(!after)return;
  var box=el("div","lu-q");
  if(!vs){if(/gemma-4/.test(key))box.appendChild(el("span","lu-q-note","One form: Google trained this 4-bit file itself (quantisation-aware training), so no larger file is needed for its quality."));
    else if(/^mellum2-/.test(key))box.appendChild(el("span","lu-q-note","One form: its maker published this 4-bit file alone."));else return;after.after(box);return;}
  var q=luChosen(key),use=null;try{use=lineupUsableGB();}catch(e){}
  var seg=el("div","seg");vs.forEach(function(v){var have=!!luRecOf(key,v.id),need=lineupNeedGB({size:v.size}),fits=use==null||need<=use;
    var b=el("button","seg-btn"+(v.id===q?" active":"")+(have?" have":""),v.label);b.type="button";b.disabled=!fits&&!have;
    b.title=v.id+" · "+fmtBytes(v.size)+(have?" · installed":"")+(fits?"":" · needs about "+need.toFixed(1)+" GB of memory; this device has about "+use.toFixed(1)+" GB to spare")+"\n"+v.line;
    b.onclick=function(){if(v.id===q)return;luSet(key,v.id);};seg.appendChild(b);});
  box.appendChild(seg);
  var cur=vs.filter(function(v){return v.id===q;})[0],rec=lineupRec(key),recQ=rec?(luFileKey(rec.fileName)===key?(vs.filter(function(v){return String(v.file).toLowerCase()===String(rec.fileName||"").toLowerCase();})[0]||null):null):null;
  var note="Quality "+cur.label+" ("+cur.id+", "+fmtBytes(cur.size)+")";
  if(rec&&recQ&&recQ.id!==q)note+=". Installed here at "+recQ.label+"; the house uses that until "+cur.label+" is installed.";
  else if(rec&&recQ)note+=", installed and checked.";else note+=". The size and fingerprint are the ones Hugging Face listed on 17 October 2026.";
  box.appendChild(el("span","lu-q-note",note));
  if(rec&&recQ&&recQ.id!==q&&(INB||(deskApi()&&typeof deskApi().install_model==="function"))){var job=lineupJobs[key];
    if(!(job&&job.state==="running")){var ib=el("button","btn xs primary","Install "+cur.label+" · "+fmtBytes(cur.size));ib.onclick=function(){ib.disabled=true;lineupInstall(key).then(null,function(){});};box.appendChild(ib);}}
  after.after(box);}
(function luHook(){var o=renderLineup;renderLineup=function(){var r=o.apply(this,arguments);try{var g=$("lineupGrid");if(g)[].slice.call(g.querySelectorAll(".lu-tile[data-key]")).forEach(function(t){if(!t.querySelector(".lu-q"))luStrip(t,t.getAttribute("data-key"));});}catch(e){}return r;};window.renderLineup=renderLineup;})();
window.IngQuality={variants:luVariants,chosen:luChosen,set:luSet,table:LU_QUANTS,keyOfFile:luFileKey};

/* ---------- the pace, measured ---------- */
/* every reply is timed from its first word, and the engine's own count of tokens is used where it gives one
   (the native engines and the computer's llama.cpp both do); a count made from characters is marked approximate */
(function paceTrack(){if(typeof thinkTrack!=="function")return;var o=thinkTrack;
  thinkTrack=function(bot){var t=o.apply(this,arguments);if(!bot.at)bot.at=Date.now();
    function first(){if(!bot.firstAt)bot.firstAt=Date.now();}
    var tok=t.token,th=t.think,end=t.end;
    t.token=function(x){first();return tok.apply(this,arguments);};t.think=function(x){first();return th.apply(this,arguments);};
    t.end=function(){if(!bot.done)bot.done=Date.now();return end.apply(this,arguments);};return t;};window.thinkTrack=thinkTrack;})();
function paceFmt(t){return t>=100?String(Math.round(t)):(+t).toFixed(1);}
function adapterStats(){try{if(INB)return NativeAdapter.lastStats||null;if(typeof DeskAdapter!=="undefined")return DeskAdapter.lastStats||null;}catch(e){}return null;}
perfRecord=function(mm){try{if(!mm||mm.role!=="bot"||mm.live||mm.preview||!mm.text||mm.__perf||!mm.at||!mm.done)return;
    var L=perfState();if(L.some(function(p){return p.at===mm.done;}))return;   /* an old reply painted again is not a new measure */
    var ms=mm.done-mm.at;if(ms<300)return;
    var mid=mm.modelId||state.activeModelId,mod=state.models.filter(function(x){return x.id===mid;})[0];
    var tok=Math.max(1,Math.round(String(mm.text).length/3.6)),gen=mm.firstAt?Math.max(200,mm.done-mm.firstAt):ms,tps=tok/(gen/1000),measured=false,read=null;
    var ls=adapterStats();
    if(ls&&+ls.tokens>=1&&+ls.tokens_per_second>0&&Engine.modelId===mid&&Date.now()-mm.done<8000){tok=+ls.tokens;tps=+ls.tokens_per_second;measured=true;
      if(+ls.read_ms>0)read=Math.round(+ls.read_ms);else if(+ls.prompt_tokens>0&&+ls.prompt_per_second>0)read=Math.round(ls.prompt_tokens/ls.prompt_per_second*1000);}
    L.unshift({at:mm.done,model:mod?(mod.customName||mod.name):(mm.by||""),mid:mod?mod.id:"",tok:tok,ms:ms,tps:+tps.toFixed(2),measured:measured,first:mm.firstAt?mm.firstAt-mm.at:null,read:read,think:mm.thinkMs||0});
    if(L.length>60)L.length=60;Object.defineProperty(mm,"__perf",{value:1,enumerable:false});perfWarn(L[0]);}catch(e){}};
window.perfRecord=perfRecord;
function perfLast(mid){var L=perfState();for(var i=0;i<L.length;i++)if(!mid||L[i].mid===mid)return L[i];return null;}
/* the live chip in the chat's top bar */
var paceT=0;
function paceChip(){var c=$("paceChip");if(!c){var k=$("chatCtlBtn");if(!k||!k.parentNode)return null;c=el("span","pace-chip");c.id="paceChip";c.hidden=true;c.innerHTML="<i></i><span></span>";k.parentNode.insertBefore(c,k);}return c;}
function pacePaint(){var c=paceChip();if(!c)return;var lb=(typeof liveBot!=="undefined")?liveBot:null,s=c.querySelector("span");
  if(lb&&lb.live){c.hidden=false;c.classList.add("live");
    if(lb.firstAt){var chars=String(lb.text||"").length+String(lb.thinkTag||lb.think||"").length,sec=Math.max(.3,(Date.now()-lb.firstAt)/1000),tps=chars/3.6/sec;
      c.classList.add("approx");s.textContent="≈ "+paceFmt(tps)+" tokens/s";c.title="Writing now: about "+Math.round(chars/3.6)+" tokens in "+sec.toFixed(0)+" s (counted from characters while it writes; the engine's own count follows).";}
    else{c.classList.remove("approx");s.textContent=lb.status?"searching…":"reading…";c.title="The model is reading the conversation before its first word.";}
    return;}
  c.classList.remove("live");var p=perfLast(state.activeModelId);if(!p){c.hidden=true;return;}
  c.hidden=false;c.classList.toggle("approx",!p.measured);s.textContent=(p.measured?"":"≈ ")+paceFmt(p.tps)+" tokens/s";
  c.title=(p.measured?"The engine's own count for the last reply: ":"The last reply, counted from characters: ")+p.tok+" tokens"+(p.first!=null?", first word after "+(p.first/1000).toFixed(1)+" s":"")+(p.read?", the question read in "+(p.read/1000).toFixed(1)+" s":"")+". Models, Health, has every reply.";}
function paceLoop(){if(paceT)return;paceT=setInterval(function(){try{var on=$("page-chat")&&$("page-chat").classList.contains("active"),lb=(typeof liveBot!=="undefined")?liveBot:null;if(on||lb)pacePaint();}catch(e){}},500);}
paceLoop();
(function paceTop(){if(typeof paintChatTop!=="function")return;var o=paintChatTop;paintChatTop=function(){var r=o.apply(this,arguments);try{pacePaint();}catch(e){}return r;};window.paintChatTop=paintChatTop;})();

/* ---------- health, model by model ---------- */
function expectedSize(m){var key=lineupKeyOfRec(m);if(!key)return null;var f=String(m.fileName||"").toLowerCase(),v=LU_QUANTS&&LU_QUANTS[key];
  if(v)for(var q in v)if(String(v[q].file).toLowerCase()===f)return v[q].size;var sp=ING_LINEUP.models[key];if(sp&&(sp.base&&String(sp.base.file).toLowerCase()===f))return sp.base.size;if(sp&&String(sp.file).toLowerCase()===f)return sp.size;return null;}
function sizePair(a,b){var x=fmtBytes(a),y=fmtBytes(b);if(x!==y)return [x,y];var mb=function(n){return (n/1048576).toFixed(1)+" MB";};x=mb(a);y=mb(b);if(x!==y)return [x,y];return [a+" bytes",b+" bytes"];}
function spark(recs){var pts=recs.slice(0,24).reverse(),W=120,H=26;if(pts.length<2)return null;var max=Math.max.apply(null,pts.map(function(p){return p.tps;}))||1;
  var xs=pts.map(function(p,i){return [Math.round(4+i*(W-8)/(pts.length-1)),Math.round(H-3-(p.tps/max)*(H-6))];});
  var s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("class","hl-spark");s.setAttribute("width",W);s.setAttribute("height",H);s.setAttribute("viewBox","0 0 "+W+" "+H);
  var pl=document.createElementNS("http://www.w3.org/2000/svg","polyline");pl.setAttribute("points",xs.map(function(x){return x.join(",");}).join(" "));s.appendChild(pl);
  xs.forEach(function(x,i){var c=document.createElementNS("http://www.w3.org/2000/svg","circle");c.setAttribute("cx",x[0]);c.setAttribute("cy",x[1]);c.setAttribute("r",2);if(!pts[i].measured)c.setAttribute("class","ap");s.appendChild(c);});
  s.appendChild(document.createElementNS("http://www.w3.org/2000/svg","title")).textContent="The last "+pts.length+" replies, oldest to newest; a filled dot is the engine's own count, a hollow one is counted from characters.";return s;}
function modelHealth(m){var tags=[],use=null;try{use=lineupUsableGB();}catch(e){}var key=lineupKeyOfRec(m),sp=key&&ING_LINEUP.models[key];
  var exp=expectedSize(m);
  if(exp!=null&&m.sizeBytes){if(Math.abs(exp-m.sizeBytes)<=1024)tags.push(["ok","size matches its listing"]);else{var pr=sizePair(m.sizeBytes,exp);tags.push(["bad","its file is "+pr[0]+" but the listing says "+pr[1]+": install it again"]);}}
  if(m.builtIn||m.builtinDesk)tags.push(["ok","built into the app"]);
  else if(key&&(m.lineup||m.shellStored||m.nativeId))tags.push(["ok","fingerprint checked when installed"]);
  else if(m.fileState==="ready")tags.push(["","your own file (not checked against a listing)"]);
  if(m.fileState!=="ready")tags.push(["warn",m.fileState==="session"?"kept for this session only":"file not linked"]);
  if(m.sizeBytes&&use!=null){var need=lineupNeedGB({size:m.sizeBytes});if(need>use)tags.push(["bad","needs about "+need.toFixed(1)+" GB; this device has about "+use.toFixed(1)+" GB to spare"]);else if(need>use*0.85)tags.push(["warn","fills most of the memory a model may use"]);else tags.push(["ok","fits this device"]);}
  var p=perfLast(m.id);if(p)tags.push([p.tps<1.5?"warn":"ok",(p.measured?"":"≈ ")+paceFmt(p.tps)+" tokens/s last time"+(p.first!=null?", first word in "+(p.first/1000).toFixed(1)+" s":"")]);
  if(Engine.modelId===m.id&&Engine.status==="error"&&Engine.lastError)tags.push(["bad","last load failed: "+String(Engine.lastError).slice(0,120)]);
  else if(Engine.modelId===m.id&&(Engine.status==="ready"||Engine.status==="busy"))tags.push(["ok","loaded now"]);
  var q=m.quant||(sp&&sp.quality)||"";return {tags:tags,sub:[m.type||"GGUF",q?q.replace(/_/g," ")+(/Q8_0/.test(q)?" · Best":/Q5_K_M/.test(q)?" · Balanced":/Q4_K_M/.test(q)?" · Fast":""):"",m.paramB?m.paramB+"B":"",fmtBytes(m.sizeBytes||0),key?"house model":""].filter(Boolean).join(" · ")};}
function checkFiles(btn){btn.disabled=true;btn.textContent="Reading the files…";var p=INB?ingNativeRefresh():(typeof deskInstalled==="function"?deskInstalled():Promise.resolve());
  Promise.resolve(p).then(function(){var bad=0;state.models.forEach(function(m){var e=expectedSize(m);if(e!=null&&m.sizeBytes&&Math.abs(e-m.sizeBytes)>1024)bad++;});
    ingToast(bad?bad+" model file"+(bad===1?" does":"s do")+" not match the listing; see the lines below.":"Every installed model's file is the size its listing gives.");},
    function(e){ingToast("The files could not be read: "+(e&&e.message||e));}).then(function(){btn.disabled=false;btn.textContent="Check the files";renderHealthMore();});}
function renderHealthMore(){var host=$("healthBox");if(!host)return;var old=host.querySelector(".hm-list");if(old)old.remove();
  var box=el("div","hm-list"),head=el("div","hm-head");head.appendChild(el("b",null,"Each model"));
  var models=state.models.filter(function(m){return m.fileState==="ready"||m.nativeId||m.builtinDesk;});
  head.appendChild(el("span","small muted",models.length?models.length+" on this device":"none yet"));
  if(models.length){var ck=el("button","btn xs ghost","Check the files");ck.onclick=function(){checkFiles(ck);};head.appendChild(ck);}
  box.appendChild(head);
  models.forEach(function(m){var h=modelHealth(m),row=el("div","hm-row"),l=el("div");l.appendChild(el("div","hm-name",m.customName||m.name||m.fileName));l.appendChild(el("div","hm-sub",h.sub));
    var recs=perfState().filter(function(p){return p.mid===m.id;});var sp=spark(recs);if(sp){var sw=el("div","hm-sub");sw.appendChild(document.createTextNode("Pace, reply by reply"));sw.appendChild(sp);l.appendChild(sw);}
    row.appendChild(l);var t=el("div","hm-tags");h.tags.forEach(function(x){t.appendChild(el("span","hm-tag "+x[0],x[1]));});row.appendChild(t);box.appendChild(row);});
  /* the engine's own reading of the last reply, when it gave one */
  var ls=adapterStats();if(ls&&+ls.tokens>0){var line=[];line.push(ls.tokens+" tokens written");if(+ls.tokens_per_second>0)line.push((+ls.tokens_per_second).toFixed(1)+" a second");
    if(+ls.prompt_tokens>0)line.push(ls.prompt_tokens+" tokens read"+(+ls.read_ms>0?" in "+(ls.read_ms/1000).toFixed(1)+" s":(+ls.prompt_per_second>0?" at "+Math.round(ls.prompt_per_second)+" a second":"")));
    if(ls.from_checkpoint)line.push("from a saved checkpoint");box.appendChild(el("div","hl-first","The engine's own count of the last reply: "+line.join(" · ")+"."));}
  var adv=host.querySelector(".hl-adv");if(adv)host.insertBefore(box,adv);else host.appendChild(box);}
/* the card's advice knows about a file that is not the size its listing gives, and about a load that failed */
(function adviceMore(){if(typeof healthAdvice!=="function")return;var o=healthAdvice;healthAdvice=function(){var out=o.apply(this,arguments)||[],add=[];
    state.models.forEach(function(m){if(m.fileState!=="ready")return;var e=expectedSize(m);if(e!=null&&m.sizeBytes&&Math.abs(e-m.sizeBytes)>1024){var pr=sizePair(m.sizeBytes,e);add.push(["bad",(m.customName||m.name)+"'s file is "+pr[0]+" where its listing says "+pr[1]+": the download may have stopped short, or the file was changed. Install it again from its house, and the fingerprint will be checked."]);}});
    if(Engine.status==="error"&&Engine.lastError&&Engine.modelId){var lm=state.models.filter(function(x){return x.id===Engine.modelId;})[0];add.push(["bad",(lm?(lm.customName||lm.name):"The model")+" did not load last time: "+String(Engine.lastError).slice(0,160)]);}
    if(add.length)out=out.filter(function(a){return a[0]!=="ok";}).concat(add);return out;};window.healthAdvice=healthAdvice;})();
(function healthMoreHook(){if(typeof renderHealth!=="function")return;var o=renderHealth;renderHealth=function(){var r=o.apply(this,arguments);try{renderHealthMore();}catch(e){}return r;};window.renderHealth=renderHealth;})();

/* ---------- the catalogue: 23 more models, grouped by what fits ---------- */
/* Each repository below was read on Hugging Face on 17 October 2026: it exists, it lists Q4_K_M, Q5_K_M and Q8_0 files,
   and its licence is the one its card gives. As before, nothing is pinned here: when she installs one, this device reads
   the repository's own listing for the file, its size and its SHA-256. The "why" lines describe; they quote no scores. */
var MORE=[
  {key:"qwen3-vl-4b",name:"Qwen3-VL 4B",maker:"Qwen (Alibaba)",params:4,thinks:false,licence:"Apache 2.0",repos:["unsloth/Qwen3-VL-4B-Instruct-GGUF"],eyes:true,
   why:"Qwen's model that reads pictures as well as text: screenshots, diagrams, photographs of pages. Light enough for an 8 GB computer or a recent tablet."},
  {key:"qwen3-vl-8b",name:"Qwen3-VL 8B",maker:"Qwen (Alibaba)",params:8,thinks:false,licence:"Apache 2.0",repos:["unsloth/Qwen3-VL-8B-Instruct-GGUF"],eyes:true,
   why:"The larger picture-reading Qwen: better with small text in a picture and with what a chart or a diagram means. For 16 GB computers."},
  {key:"lfm2.5-vl-1.6b",name:"LFM2.5-VL 1.6B",maker:"Liquid AI",params:1.6,thinks:false,licence:"LFM Open License v1.0",repos:["LiquidAI/LFM2.5-VL-1.6B-GGUF"],eyes:true,
   why:"Liquid AI's small picture reader, made for phones and tablets: a photograph of a page, a chart or a label, read and described at once."},
  {key:"lfm2.5-vl-3b",name:"LFM2.5-VL 3B",maker:"Liquid AI",params:3,thinks:false,licence:"LFM Open License v1.0",repos:["LiquidAI/LFM2.5-VL-3B-GGUF"],eyes:true,
   why:"The larger Liquid picture reader: more careful with detail, still light enough for a tablet with about 6 GB of memory."},
  {key:"qwen2.5-coder-7b",name:"Qwen2.5-Coder 7B",maker:"Qwen (Alibaba)",params:7,thinks:false,licence:"Apache 2.0",repos:["unsloth/Qwen2.5-Coder-7B-Instruct-GGUF"],code:true,
   why:"Qwen's coding model of the previous generation, still a steady coder for its size: writing, explaining and fixing code on an 8 GB computer."},
  {key:"qwen2.5-coder-14b",name:"Qwen2.5-Coder 14B",maker:"Qwen (Alibaba)",params:14,thinks:false,licence:"Apache 2.0",repos:["unsloth/Qwen2.5-Coder-14B-Instruct-GGUF"],code:true,
   why:"The larger Qwen2.5 coder: stronger with whole programs and with code it has not seen before. For 16 GB computers."},
  {key:"phi-4-reasoning-plus",name:"Phi-4 reasoning plus",maker:"Microsoft",params:14,thinks:true,licence:"MIT",repos:["unsloth/Phi-4-reasoning-plus-GGUF"],
   why:"Microsoft's reasoning model: careful with mathematics, logic and step-by-step argument, and slow with it. About 8.4 GB at Fast: for 16 GB computers."},
  {key:"granite-4.0-h-tiny",name:"Granite 4.0 H Tiny",maker:"IBM",params:7,thinks:false,licence:"Apache 2.0",repos:["ibm-granite/granite-4.0-h-tiny-GGUF"],
   why:"IBM's small mixture-of-experts: 7B parameters with about 1B at work on each word, so it answers quickly and keeps a long memory. For 8 GB computers and recent tablets."},
  {key:"apertus-8b",name:"Apertus 8B",maker:"Swiss AI (ETH Zürich and EPFL)",params:8,thinks:false,licence:"Apache 2.0",repos:["unsloth/Apertus-8B-Instruct-2509-GGUF"],
   why:"Switzerland's fully open model: its training data and recipe are published, and it was trained on over a thousand languages. About 4.7 GB at Fast: for 8 GB computers."},
  {key:"gemma-3n-e4b",name:"Gemma 3n E4B",maker:"Google",params:4,thinks:false,licence:"Gemma Terms of Use",repos:["unsloth/gemma-3n-E4B-it-GGUF"],
   why:"Google's model made for phones and tablets: about 4B parameters at work, light on memory, with sound general knowledge. Text only in this file set."},
  {key:"glm-4.6v-flash",name:"GLM-4.6V Flash",maker:"Z.ai",params:9,thinks:false,licence:"MIT",repos:["unsloth/GLM-4.6V-Flash-GGUF"],eyes:true,
   why:"Z.ai's picture-reading model of about 9B parameters, under the MIT licence: pages, charts, screenshots and photographs, read and described. For 16 GB computers."},
  {key:"mistral-small-3.2-24b",name:"Mistral Small 3.2 (24B)",maker:"Mistral AI",params:24,thinks:false,licence:"Apache 2.0",repos:["unsloth/Mistral-Small-3.2-24B-Instruct-2506-GGUF"],eyes:true,
   why:"Mistral's all-round model, with pictures: strong writing in English and French, close instruction following and long work. About 13.3 GB at Fast: for a 24 GB computer or more."},
  {key:"magistral-small-2509",name:"Magistral Small (24B)",maker:"Mistral AI",params:24,thinks:true,licence:"Apache 2.0",repos:["unsloth/Magistral-Small-2509-GGUF"],eyes:true,
   why:"Mistral's reasoning model: it thinks before it answers, in English and French, and reads pictures. For a 24 GB computer or more."},
  {key:"devstral-small-2507",name:"Devstral Small (24B)",maker:"Mistral AI",params:24,thinks:false,licence:"Apache 2.0",repos:["unsloth/Devstral-Small-2507-GGUF"],code:true,
   why:"Mistral's model for software work across a whole code base, made for agents that read, change and test code. For a 24 GB computer or more."},
  {key:"gemma-3-27b",name:"Gemma 3 27B",maker:"Google",params:27,thinks:false,licence:"Gemma Terms of Use",repos:["unsloth/gemma-3-27b-it-GGUF"],eyes:true,
   why:"Google's largest Gemma 3: careful prose in many languages, and it reads pictures. About 15.4 GB at Fast: for a 24 GB computer or more."},
  {key:"qwen3.5-27b",name:"Qwen3.5 27B",maker:"Qwen (Alibaba)",params:27,thinks:true,licence:"Apache 2.0",repos:["unsloth/Qwen3.5-27B-GGUF"],eyes:true,
   why:"Qwen3.5's large dense model: for the hardest questions and long documents, and it reads pictures. About 15.6 GB at Fast: for a 24 GB computer or more."},
  {key:"qwen3-30b-a3b-2507",name:"Qwen3 30B-A3B Instruct (2507)",maker:"Qwen (Alibaba)",params:30,thinks:false,licence:"Apache 2.0",repos:["unsloth/Qwen3-30B-A3B-Instruct-2507-GGUF"],
   why:"Qwen's mixture-of-experts: 30B parameters with about 3B at work on each word, so it answers nearly as fast as a 3B model and knows far more. About 17.3 GB at Fast: for a 32 GB computer."},
  {key:"qwen3-30b-a3b-thinking-2507",name:"Qwen3 30B-A3B Thinking (2507)",maker:"Qwen (Alibaba)",params:30,thinks:true,licence:"Apache 2.0",repos:["unsloth/Qwen3-30B-A3B-Thinking-2507-GGUF"],
   why:"The same mixture-of-experts trained to reason first: long, careful answers at a quick pace for its knowledge. For a 32 GB computer."},
  {key:"qwen3.6-35b-a3b",name:"Qwen3.6 35B-A3B",maker:"Qwen (Alibaba)",params:35,thinks:true,licence:"Apache 2.0",repos:["unsloth/Qwen3.6-35B-A3B-GGUF"],eyes:true,
   why:"Qwen's newest mixture-of-experts: about 3B of its 35B parameters work on each word, and it reads pictures. About 20.6 GB at Fast: for a 32 GB computer."},
  {key:"glm-4.7-flash",name:"GLM-4.7 Flash",maker:"Z.ai",params:30,thinks:true,licence:"MIT",repos:["unsloth/GLM-4.7-Flash-GGUF"],
   why:"Z.ai's mixture-of-experts under the MIT licence: about 30B parameters with a few billion at work on each word. About 17.1 GB at Fast: for a 32 GB computer."},
  {key:"granite-4.0-h-small",name:"Granite 4.0 H Small",maker:"IBM",params:32,thinks:false,licence:"Apache 2.0",repos:["ibm-granite/granite-4.0-h-small-GGUF"],
   why:"IBM's larger Granite 4, a mixture-of-experts for long documents, tools and steady office work. About 18 GB at Fast: for a 32 GB computer."},
  {key:"qwen3-32b",name:"Qwen3 32B",maker:"Qwen (Alibaba)",params:32,thinks:true,licence:"Apache 2.0",repos:["unsloth/Qwen3-32B-GGUF"],
   why:"Qwen3's largest dense model: for the hardest questions, when a 32 GB computer and patience are at hand. About 18.4 GB at Fast."},
  {key:"seed-oss-36b",name:"Seed-OSS 36B",maker:"ByteDance Seed",params:36,thinks:true,licence:"Apache 2.0",repos:["unsloth/Seed-OSS-36B-Instruct-GGUF"],
   why:"ByteDance's open 36B model with a very long memory and thinking it can budget. About 20.3 GB at Fast: for a 32 GB computer."}];
var VISION={prefer:["mmproj-F16.gguf","mmproj-BF16.gguf","mmproj-F32.gguf"]};
(function moreIn(){if(!Array.isArray(ING_CATALOG))return;var have={};ING_CATALOG.forEach(function(e){have[e.key]=1;});
  MORE.forEach(function(e){if(have[e.key])return;if(e.eyes)e.vision={repos:e.repos.slice(),prefer:VISION.prefer.slice()};ING_CATALOG.push(e);});
  /* the lineup's own coders and picture readers carry the same marks in the catalogue's filters */
  ING_CATALOG.forEach(function(e){if(/coder|devstral|mellum/i.test(e.name))e.code=true;if(e.vision)e.eyes=true;});})();
/* a resolved model keeps its picture reader and its thinking, so a house tile can offer the projector */
(function resolveMore(){if(typeof catResolve!=="function")return;var o=catResolve;catResolve=function(e,q){return o.apply(this,arguments).then(function(spec){if(e.vision&&!spec.vision)spec.vision=e.vision;if(e.code)spec.code=true;return spec;});};window.catResolve=catResolve;})();
CAT_UI.f=CAT_UI.f||"all";CAT_UI.find=CAT_UI.find||"";CAT_UI.showBig=!!CAT_UI.showBig;
function catRow(e){var qs=catQuants(e),q=CAT_UI.q[e.key]||qs[0];if(qs.indexOf(q)<0)q=qs[0];var key=catKey(e,q),spec=catState()[key],rec=spec?lineupRec(key):null,job=lineupJobs[key];
  var canInstall=!!(INB||(deskApi()&&typeof deskApi().install_model==="function"));
  var row=el("div","cat-row"+(rec?" here":""));
  var t=el("div","cat-t");t.innerHTML="<b>"+esc(e.name)+"</b>"+(e.eyes?'<span class="cat-tag eyes">reads pictures</span>':"")+(e.code?'<span class="cat-tag code">for code</span>':"")+(e.thinks?'<span class="cat-tag">thinks first</span>':"")
    +" <span class='small muted'>"+esc(e.maker)+" · "+e.params+"B · "+esc(e.licence)+"</span><div class='small'>"+esc(e.why)+"</div>";row.appendChild(t);
  var c=el("div","cat-c");
  if(qs.length>1){var seg=el("div","seg cat-q");qs.forEach(function(id){var Q=CAT_Q.filter(function(x){return x.id===id;})[0];var b=el("button","seg-btn"+(id===q?" active":""),Q.label);b.type="button";b.title=Q.id+": "+Q.line;
      b.onclick=function(){CAT_UI.q[e.key]=id;renderCatalog();};seg.appendChild(b);});c.appendChild(seg);}
  var bytes=spec?spec.size:catEstimate(e,q),fit=catFit(bytes);
  c.appendChild(el("div","small cat-size",(spec?"":"about ")+fmtBytes(bytes)+" · "+q+" · ")).appendChild(el("span","cat-fit "+fit.cls,fit.text));
  var keys=el("div","cat-k");
  if(job&&job.state==="running"){var pct=job.total?Math.floor(100*job.received/job.total):0;keys.appendChild(el("span","small",(job.phase==="verify"?"Checking its fingerprint…":"Downloading "+pct+"%")));
    var cx=el("button","btn xs ghost","Stop");cx.onclick=function(){lineupCancel(key);};keys.appendChild(cx);}
  else if(rec){keys.appendChild(el("span","small cat-ok","Installed and checked"));
    var hs=document.createElement("select");hs.className="cat-house";hs.innerHTML='<option value="">Put it in a house…</option>'+ING_LINEUP.tiers.map(function(tr){var on=state.tierPick&&state.tierPick[tr.id]===key;return '<option value="'+tr.id+'"'+(on?" selected":"")+'>'+(on?"In ":"")+esc(tr.name)+'</option>';}).join("");
    hs.onchange=function(){if(!hs.value)return;state.tierPick=state.tierPick||{};state.tierPick[hs.value]=key;saveState();lineupTag();renderLineup();try{paintChatTop();}catch(_){}ingToast(e.name+" now serves "+(tierSpec(hs.value)||{}).name+" on this device.");};keys.appendChild(hs);}
  else if(canInstall){var ib=el("button","btn xs primary",job&&job.state==="error"?"Try again":"Install");ib.disabled=fit.cls==="no";
    ib.onclick=function(){ib.disabled=true;ib.textContent="Reading Hugging Face…";catInstall(e,q).then(null,function(err){ingToast(e.name+": "+(err&&err.message||err));renderCatalog();});};keys.appendChild(ib);
    if(job&&job.state==="error")keys.appendChild(el("span","small cat-err",job.error));}
  var pg=el("a","small","Model page");pg.href="https://huggingface.co/"+e.repos[0];pg.target="_blank";pg.rel="noopener noreferrer";keys.appendChild(pg);
  c.appendChild(keys);row.appendChild(c);return {row:row,fit:fit,rec:rec};}
function catMatch(e){var f=CAT_UI.f,q=CAT_UI.find.trim().toLowerCase();
  if(f==="eyes"&&!e.eyes)return false;if(f==="code"&&!e.code)return false;if(f==="thinks"&&!e.thinks)return false;if(f==="quick"&&e.thinks)return false;
  if(q&&(e.name+" "+e.maker+" "+e.why+" "+e.licence).toLowerCase().indexOf(q)<0)return false;return true;}
renderCatalog=function(){var host=$("catBox");if(!host){var grid=$("lineupGrid");if(!grid)return;var card=grid.closest(".card")||grid.parentNode;host=el("div","card cat-card");host.id="catBox";card.parentNode.insertBefore(host,card.nextSibling);}
  var mem=deviceMemGB();
  host.innerHTML='<h2 class="sec">More models</h2><p class="small muted" style="margin-top:0">'+ING_CATALOG.length+' strong, open models to try, to blend and to give a house, grouped by what fits this device'+(mem?' ('+Math.round(mem)+' GB)':'')+'. Choose the quality for each: <b>Fast</b> (Q4_K_M) for speed, <b>Balanced</b> (Q5_K_M), or <b>Best</b> (Q8_0) for quality. When you install one, this device reads the file\'s size and fingerprint from Hugging Face\'s own listing and refuses the file unless they match. Any installed model can serve a house, or join a Blend.</p>';
  var tools=el("div","cat-tools");var find=document.createElement("input");find.type="search";find.placeholder="Find a model: a name, a maker, a word from its description";find.value=CAT_UI.find;find.setAttribute("aria-label","Find a model");
  find.oninput=function(){CAT_UI.find=find.value;paintList();};tools.appendChild(find);
  var seg=el("div","seg");[["all","All"],["quick","Answers at once"],["thinks","Thinks first"],["code","For code"],["eyes","Reads pictures"]].forEach(function(x){var b=el("button","seg-btn"+(CAT_UI.f===x[0]?" active":""),x[1]);b.type="button";b.onclick=function(){CAT_UI.f=x[0];renderCatalog();};seg.appendChild(b);});tools.appendChild(seg);host.appendChild(tools);
  var list=el("div","cat-list");host.appendChild(list);
  function paintList(){list.innerHTML="";var fits=[],big=[],searching=!!CAT_UI.find.trim();ING_CATALOG.filter(catMatch).forEach(function(e){var r=catRow(e);(r.fit.cls==="no"&&!r.rec?big:fits).push(r.row);});
    if(!fits.length&&!big.length){list.appendChild(el("div","small muted","No model here matches."));return;}
    if(fits.length){list.appendChild(el("div","cat-group",(mem?"Fits this device":"Models")+" · "+fits.length));fits.forEach(function(r){list.appendChild(r);});}
    if(big.length){var g=el("div","cat-group","Too large for this device · "+big.length);list.appendChild(g);
      if(CAT_UI.showBig||searching||!fits.length){big.forEach(function(r){list.appendChild(r);});var less=el("button","btn xs ghost cat-more","Hide them");less.onclick=function(){CAT_UI.showBig=false;paintList();};if(fits.length&&!searching)list.appendChild(less);}
      else{var more=el("button","btn xs ghost cat-more","Show them anyway");more.title="They need more memory than this device has to spare; a computer with more memory can run them, and its models can answer here over Wi-Fi.";more.onclick=function(){CAT_UI.showBig=true;paintList();};list.appendChild(more);}}}
  paintList();};
window.renderCatalog=renderCatalog;
try{if(window.IngCatalog)IngCatalog.render=renderCatalog;}catch(e){}
try{if($("catBox"))renderCatalog();}catch(e){}
})();
;try{window.__ingParts["p47"]="running";}catch(_){}
</script>
