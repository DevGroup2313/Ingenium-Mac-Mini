<style id="r195-css">
/* ============ R195 · A LONGER MEMORY, SEEN (Ingenium 6.9.1, 30 October 2026) ============
   The owner's words (30 October 2026): "I want for context and tokens to be massively increased inside of Ingenium."
   Measured on 6.9 before this part:
   - the page's own engine loaded 8,192 tokens of memory whatever the slider said, and the slider reached 32,768: what was
     sent could be four times what the engine held, and the engine refused it instead of the page trimming it;
   - a document asked of a server on this computer or in the home (Ollama, LM Studio) with Thinking off was held to the
     slider's 1,024 tokens; a personal AI's length cut a document to 1,024 as well; on the computer engine a long think
     could use up the whole reply;
   - a connected model's window and its longest reply came from guesses over its name: 200,000 for every current model of
     a service whose own list says a million; replies held to 32,000 where 128,000 are taken;
   - nothing showed how much of the memory a conversation used, and nothing wrote a summary of what the window left behind:
     the brief of what came before was the same 16,000 characters whether the memory was 8,192 tokens or a million.
   Now:
   - the page's own engine says what memory it loaded, and the conversation is fitted to that; its slider reaches 32,768
     only where the fast engine runs on a computer with 8 GB or more, otherwise it stops at the real cap;
   - a document or an app gets its room on every engine, Thinking on or off, personal AI or not; a thinking budget on the
     computer engine comes on top of the reply, never out of it;
   - a connected model's window and longest reply are read from the service's own list of models when it gives them,
     and a long reply is given the time it needs; the reading page's parts follow the connection's window when it is known;
   - under the Context window slider a line says how much of the memory the last reply used, how many messages are in the
     window and how many were recalled, with the fit of the chosen window on this device; a small pill beside the model
     key says the same in short, and opens Controls;
   - when a conversation outgrows its memory, a short summary is written in the background (names, decisions, open tasks,
     file names) and travels with the newest message beside the passages recalled; a large memory recalls more;
   - the computer app chooses up to 262,144 tokens by itself for a model trained for it, reading the model's header first. */
#ctlMemUse{margin:6px 0 2px;font-size:12px;line-height:1.45;color:var(--ink-2)}
#ctlCtxFit{display:block;margin-top:4px;font-size:11.5px;line-height:1.4;color:var(--ink-2)}
#ctlCtxFit.ok{color:var(--ok)}
#ctlCtxFit.heavy{color:var(--warn)}
.ing-mem-pill{display:inline-flex;align-items:center;gap:6px;min-height:24px;padding:2px 9px;border-radius:999px;border:1px solid var(--hairline);
  background:var(--card-hi);font:700 11px/1 var(--sans);color:var(--ink-2);font-variant-numeric:tabular-nums;white-space:nowrap;cursor:pointer}
.ing-mem-pill i{display:inline-block;width:34px;height:5px;border-radius:3px;background:var(--hairline);overflow:hidden;position:relative}
.ing-mem-pill i b{position:absolute;left:0;top:0;bottom:0;background:var(--accent);border-radius:3px}
.ing-mem-pill.full i b{background:var(--warn)}
@media (max-width:360px){.ing-mem-pill{display:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p195"]="started";}catch(_){}
/* R195 · a longer memory, seen: see the note at the top of its styles */
(function(){"use strict";
if(window.__r195)return;window.__r195=1;
var W=window;
function $(id){return document.getElementById(id);}
function K(n){return n>=1000000?(n/1000000)+"M":n>=1024?Math.round(n/1024)+"K":String(n);}
/* a wrapper keeps the marks other parts left on the function it wraps (r190 marks its own) */
function wrap(o,f){try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}return f;}
function model(id){try{return state.models.filter(function(x){return x.id===id;})[0]||null;}catch(e){return null;}}
function activeModel(){return model(state.activeModelId);}
function loadedModel(){return model(Engine.modelId);}
function isCloud(){try{return chatSource()==="cloud"&&!!(state.cloud&&state.cloud.on&&state.cloud.provider);}catch(e){return false;}}
function where(m){if(!m)return "page";try{if(typeof INB!=="undefined"&&INB&&m.nativeId)return "native";if(DeskAdapter.accepts(m)||m.shellStored)return "desk";}catch(e){}return "page";}
function warn(e){try{console.warn("Ingenium memory (r195):",e);}catch(_){}}
function sizeOf(m){try{return typeof m.content==="string"?m.content.length:(m.content||[]).reduce(function(a,p){return a+(p&&p.text?p.text.length:1200);},0);}catch(e){return 0;}}

/* ---------- 1. the page's own engine: the memory it really loaded ---------- */
/* the fast engine (memory64 and JSPI, see ingNeedsCompat) on a computer with 8 GB or more may be given up to 32,768 tokens;
   anywhere else the page's engine stops at 8,192, which is what it loaded until now whatever the slider said */
function pageMax(){try{if(typeof ingNeedsCompat==="function"&&!ingNeedsCompat()&&(deviceMemGB()||0)>=8)return 32768;}catch(e){}return 8192;}
W.ingPageCtxMax=pageMax;
if(typeof W.ingCtxMax==="function"){var oMax=W.ingCtxMax;
  W.ingCtxMax=wrap(oMax,function(m){var r=oMax.apply(this,arguments);try{if(where(m)==="page")return Math.min(r,pageMax());}catch(e){}return r;});}
function wasmCtx(){try{if(typeof WllamaAdapter!=="undefined"&&Engine.adapter===WllamaAdapter&&WllamaAdapter.loaded&&+WllamaAdapter.loaded.ctx>0)return +WllamaAdapter.loaded.ctx;}catch(e){}return 0;}
/* the history is fitted to the memory the engine holds, never to a slider above it (the same sum as the page's chatBudget) */
if(typeof W.chatBudget==="function"){var oBud=W.chatBudget;
  W.chatBudget=wrap(oBud,function(){var ctx=0;try{if(!isCloud())ctx=wasmCtx();}catch(e){}
    if(ctx)return Math.max(1500,(ctx-Math.min(replyTokens(),Math.floor(ctx*0.5))-256)*3);
    return oBud.apply(this,arguments);});}
if(typeof WllamaAdapter!=="undefined"&&WllamaAdapter&&typeof WllamaAdapter.dispose==="function"){var oDis=WllamaAdapter.dispose;
  WllamaAdapter.dispose=wrap(oDis,function(){try{WllamaAdapter.loaded=null;}catch(e){}return oDis.apply(this,arguments);});}

/* ---------- 2. a connected model's window and longest reply, from the service's own list ---------- */
function cloudInfo(){try{var c=state.cloud||{};return (c.info||{})[c.model]||null;}catch(e){return null;}}
/* the list a connection answers with: each model's window (max_input_tokens, context_length, max_model_len) and longest
   reply (max_tokens, max_completion_tokens), kept by id beside what r74 keeps for a lender */
function keepInfo(d){try{var list=(d&&d.data)||[];if(!Array.isArray(list)||!list.length)return 0;var n=0;
    state.cloud=state.cloud||{};var info=state.cloud.info=state.cloud.info||{};
    list.forEach(function(x){if(!x)return;var id=x.id||x.name;if(!id)return;var tp=x.top_provider||{};
      var ctx=+x.max_input_tokens||+x.context_length||+tp.context_length||+x.max_model_len||0,out=+x.max_tokens||+tp.max_completion_tokens||+x.max_output_tokens||0;
      if(!ctx&&!out)return;var k=info[id]=info[id]||{};if(ctx)k.ctx=ctx;if(out)k.out=out;n++;});
    if(n){try{saveState();}catch(e){}paintAll();}return n;}catch(e){return 0;}}
if(typeof W.cxFetch==="function"){var oCx=W.cxFetch;
  W.cxFetch=wrap(oCx,function(url,opts){var p=oCx.apply(this,arguments);
    try{var get=!(opts&&opts.method)||String(opts.method).toUpperCase()==="GET";
      if(get&&/\/models(\?|$)/.test(String(url||""))&&p&&typeof p.then==="function")p=p.then(function(r){try{if(r&&r.ok&&typeof r.json==="function")r.json().then(keepInfo,function(){});}catch(e){}return r;});}catch(e){}
    return p;});}
/* the version in a model's id (4.6, 5.1), its date left out; 0 when there is none */
function idVersion(id){var s=String(id||"").toLowerCase().replace(/-\d{8}$/,""),m=/(?:^|-)(\d{1,2})(?:-(\d{1,2}))?(?=-|$|\[)/.exec(s);return m?+m[1]+(+m[2]||0)/10:0;}
if(typeof W.ingCloudWindow==="function"){var oWin=W.ingCloudWindow;
  W.ingCloudWindow=wrap(oWin,function(){try{var c=state.cloud||{};if(+c.window>0)return +c.window;
      var inf=cloudInfo();if(inf&&+inf.ctx>0)return +inf.ctx;
      /* the first service's current models (a version of 4.6 or later in the id) hold a million tokens; its list says so once read */
      if(c.provider==="anthropic"&&idVersion(c.model)>=4.6)return 1000000;}catch(e){}
    return oWin.apply(this,arguments);});}
/* the slider's reach: a connection's longest reply, when its list says it */
if(typeof W.ingReplyMax==="function"){var oRep=W.ingReplyMax;
  W.ingReplyMax=wrap(oRep,function(m){var r=oRep.apply(this,arguments);try{if(isCloud()){var inf=cloudInfo();if(inf&&+inf.out>0)return Math.max(16384,Math.min(r,Math.floor(+inf.out/128)*128));}}catch(e){}return r;});}
/* the room a connected reply is given (the chat's cloudChat asks these two; the R195 edits in build_page.py name them):
   at least the slider, the whole of the model's own longest reply when the list gave it, 32,000 as before when it did not */
W.ingReplyCap=function(maxTok,modern){maxTok=+maxTok||1024;var inf=cloudInfo(),out=(inf&&+inf.out>0)?+inf.out:0;
  var want=modern?Math.max(maxTok,out||32000):Math.max(maxTok,4096);
  if(out)want=Math.min(want,out);else if(modern)want=Math.min(want,128000);
  return want;};
W.ingRemoteCap=function(cap){cap=+cap||0;var inf=cloudInfo(),out=(inf&&+inf.out>0)?+inf.out:0;return out?out:Math.max(cap,16000);};
/* the services that count tokens in their stream are asked to (the last chunk then carries usage) */
var USAGE_OK={openai:1,openrouter:1,moonshot:1,lmstudio:1,ingenium:1};
W.ingUsageAsk=function(ocb,prov){try{if(ocb&&ocb.stream&&USAGE_OK[prov]&&!ocb.stream_options)ocb.stream_options={include_usage:true};}catch(e){}return ocb;};

/* ---------- 3. a long reply is given its time, and the counts the services give are read ---------- */
var USE={last:null,win:null,quiet:false,pendIn:0};
function seen(inTok,outTok,how){if(USE.quiet)return;if(!(inTok>0)&&!(outTok>0))return;var c=null;try{c=curChat();}catch(e){}
  USE.last={inTok:Math.round(inTok||0),outTok:Math.round(outTok||0),how:how,at:Date.now(),chat:c?c.id:null};paintAll();}
function usageLine(kind,line){var d,u;
  if(kind==="o"){if(!line.trim())return;try{d=JSON.parse(line);}catch(e){return;}
    if(d&&d.done&&(+d.prompt_eval_count||+d.eval_count))seen(+d.prompt_eval_count||0,+d.eval_count||0,"the server's own count");return;}
  if(line.indexOf("data:")!==0)return;var s=line.slice(5).trim();if(!s||s==="[DONE]")return;try{d=JSON.parse(s);}catch(e){return;}if(!d)return;
  if(kind==="a"){
    if(d.type==="message_start"&&d.message&&(u=d.message.usage))USE.pendIn=(+u.input_tokens||0)+(+u.cache_read_input_tokens||0)+(+u.cache_creation_input_tokens||0);
    else if(d.type==="message_delta"&&(u=d.usage)){var inn=(+u.input_tokens||0)+(+u.cache_read_input_tokens||0)+(+u.cache_creation_input_tokens||0);if(inn)USE.pendIn=inn;seen(USE.pendIn,+u.output_tokens||0,"the service's own count");}
    return;}
  if(d.usage&&(+d.usage.prompt_tokens||+d.usage.completion_tokens))seen(+d.usage.prompt_tokens||0,+d.usage.completion_tokens||0,"the service's own count");}
function reader(kind,inner){var buf="";return function(t){try{buf+=String(t);var i;while((i=buf.indexOf("\n"))>=0){var line=buf.slice(0,i).replace(/\r$/,"");buf=buf.slice(i+1);usageLine(kind,line);}}catch(e){}return inner(t);};}
var CHAT_URL=/\/v1\/messages(\?|$)|\/chat\/completions(\?|$)|\/api\/chat(\?|$)/;
if(typeof W.netFetch==="function"){var oNet=W.netFetch;
  W.netFetch=wrap(oNet,function(url,o){o=o||{};
    try{var u=String(url||"");if(CHAT_URL.test(u)&&String(o.method||"GET").toUpperCase()==="POST"){
        var body=o.body==null?"":String(o.body),mt=0,m,re=/"(?:max_tokens|max_completion_tokens|num_predict)"\s*:\s*(\d+)/g;while((m=re.exec(body)))mt=Math.max(mt,+m[1]);
        var o2=Object.assign({},o);
        /* a reply of more than 32,000 tokens can take half an hour to write: the request is given that long (the apps' relay honours it) */
        if(mt>32000&&(+o2.timeout||0)<1800)o2.timeout=1800;
        if(typeof o2.onChunk==="function")o2.onChunk=reader(/\/v1\/messages/.test(u)?"a":/\/api\/chat/.test(u)?"o":"c",o2.onChunk);
        o=o2;}}catch(e){}
    return oNet.call(this,url,o);});}
/* the engines on the device: the computer engine counts (usage in its last chunk, or its timings), the others are estimated */
if(W.Engine&&typeof Engine.generate==="function"){var oGen=Engine.generate;
  Engine.generate=wrap(oGen,function(job){var est=0;try{est=Math.round((job&&job.messages||[]).reduce(function(a,m){return a+sizeOf(m);},0)/3);}catch(e){}
    var p=oGen.apply(this,arguments);
    if(p&&typeof p.then==="function")p=p.then(function(res){try{afterLocal(res,est);}catch(e){}return res;});
    return p;});}
function afterLocal(res,est){var st=(res&&res.stats)||{},u=st.usage||null;
  var inTok=u?(+u.prompt_tokens||0):0,outTok=u?(+u.completion_tokens||0):0,how="the engine's own count";
  if(!inTok&&+st.prompt_tokens>0)inTok=+st.prompt_tokens+(+st.cache_tokens||0);
  if(!outTok&&+st.tokens>0)outTok=+st.tokens;
  if(!inTok){inTok=est;how="an estimate (about three characters a token)";}
  if(!outTok)outTok=Math.round(String((res&&res.text)||"").length/3);
  seen(inTok,outTok,how);}

/* ---------- 4. the memory meter: a line under the slider, the fit beside it, a pill beside the model key ---------- */
function windowNow(){try{if(isCloud())return ingCloudWindow();var A=Engine.adapter;
    if(A===DeskAdapter&&DeskAdapter.loaded&&+DeskAdapter.loaded.ctx>0)return +DeskAdapter.loaded.ctx;
    if(A===NativeAdapter&&NativeAdapter.loaded&&+NativeAdapter.loaded.n_ctx>0)return +NativeAdapter.loaded.n_ctx;
    var w=wasmCtx();if(w)return w;}catch(e){}
  try{return +$("ctlCtx").value||4096;}catch(e){return 4096;}}
function noteWindow(msgs){var c=null;try{c=curChat();}catch(e){}var ex=0;try{ex=(ingAIExampleMsgs(chatAI(),true,chatBudget())||[]).length;}catch(e){}
  var n=0,chars=0;msgs.forEach(function(m){chars+=sizeOf(m);if(m.role!=="system")n++;});n=Math.max(0,n-ex);
  USE.win={n:n,recalled:msgs.recalled||0,chars:chars,chat:c?c.id:null,at:Date.now()};}
function current(){var c=null;try{c=curChat();}catch(e){}var id=c?c.id:null;
  return {u:(USE.last&&USE.last.chat===id)?USE.last:null,w:(USE.win&&USE.win.chat===id)?USE.win:null};}
function usedNow(cur){return cur.u?cur.u.inTok+cur.u.outTok:(cur.w?Math.round(cur.w.chars/3):0);}
function memLine(){var cur=current(),w=cur.w,win=windowNow(),used=usedNow(cur);
  var s=used?"Memory in use: "+used.toLocaleString()+" of "+win.toLocaleString()+" tokens ("+Math.min(999,Math.round(used*100/Math.max(1,win)))+"%)":"Memory in use: not measured yet, of "+win.toLocaleString()+" tokens";
  if(w)s+=" · "+w.n.toLocaleString()+" message"+(w.n===1?"":"s")+" in the window"+(w.recalled?" · "+w.recalled.toLocaleString()+" recalled":"");
  return s;}
function memHow(){var cur=current();return cur.u?cur.u.how:(cur.w?"an estimate (about three characters a token)":"measured after the next reply");}
function ensureMeter(){var c=$("ctlCtx"),lab=c&&c.closest?c.closest("label"):null;
  if(lab&&!$("ctlCtxFit")){var f=document.createElement("span");f.id="ctlCtxFit";f.className="small";lab.appendChild(f);}
  if(lab&&!$("ctlMemUse")){var d=document.createElement("div");d.id="ctlMemUse";d.className="small";d.setAttribute("aria-live","polite");var after=$("ctlCloudRow")||lab;after.parentNode.insertBefore(d,after.nextSibling);}
  var mb=$("chatModelBtn");if(mb&&mb.parentNode&&!$("ingMemPill")){var p=document.createElement("button");p.type="button";p.id="ingMemPill";p.className="ing-mem-pill";
    p.innerHTML='<i><b style="width:0"></b></i><span></span>';
    p.addEventListener("click",function(){try{var k=$("chatCtlBtn");if(k&&k.getAttribute("aria-expanded")!=="true")k.click();}catch(e){}});
    mb.parentNode.insertBefore(p,mb);}}
/* the fit of the window on the slider, before it is loaded: the same verdict Model settings gives */
function paintFit(){var el=$("ctlCtxFit");if(!el)return;var m=activeModel();
  if(!m||isCloud()||!(m.sizeBytes>0)||typeof fitVerdict!=="function"){el.textContent="";el.className="small";return;}
  try{var v=fitVerdict(Object.assign({},m,{ctx:+$("ctlCtx").value||m.ctx||8192}));
    /* a device that does not say its memory (a phone's browser) gets no verdict here: Model settings already says why */
    if(!v||v.level==="unknown"){el.textContent="";el.className="small";return;}
    el.textContent=v.text||"";el.className="small "+(v.level||"");}catch(e){el.textContent="";}}
function paintAll(){try{ensureMeter();var line=memLine(),how=memHow(),d=$("ctlMemUse");if(d){d.textContent=line;d.title=how;}
    var p=$("ingMemPill");if(p){var cur=current(),win=windowNow(),used=usedNow(cur),pc=Math.min(100,Math.round(used*100/Math.max(1,win)));
      p.querySelector("span").textContent=used?K(used)+" of "+K(win):"memory "+K(win);p.querySelector("b").style.width=pc+"%";p.classList.toggle("full",pc>=90);
      p.title=line+". "+how.charAt(0).toUpperCase()+how.slice(1)+". Opens Controls.";p.setAttribute("aria-label","Memory: "+line);}
    paintFit();}catch(e){}}
if(typeof W.paintChatCtl==="function"){var oPaint=W.paintChatCtl;W.paintChatCtl=wrap(oPaint,function(){var r=oPaint.apply(this,arguments);try{paintAll();}catch(e){}return r;});}
if(typeof W.paintChatTop==="function"){var oTop=W.paintChatTop;W.paintChatTop=wrap(oTop,function(){var r=oTop.apply(this,arguments);try{paintAll();}catch(e){}return r;});}
document.addEventListener("click",function(e){if(e.target&&e.target.closest&&e.target.closest("#chatCtlBtn"))setTimeout(function(){try{paintAll();}catch(_){}},0);},true);

/* ---------- 5. more recalled where the memory is large, and the summary's share of the brief ---------- */
function textOf(m){if(typeof m.content==="string")return m.content;var tp=(m.content||[]).filter(function(p){return p&&p.type==="text";})[0];return tp?String(tp.text||""):"";}
function setText(m,t){if(typeof m.content==="string"){m.content=t;return;}var tp=(m.content||[]).filter(function(p){return p&&p.type==="text";})[0];if(tp)tp.text=t;else if(Array.isArray(m.content))m.content.push({type:"text",text:t});}
function day(t){try{if(!t)return "";var d=new Date(t);return isNaN(d)?"":d.toISOString().slice(0,10);}catch(e){return "";}}
function line1(t){t=String(t||"").replace(/```[\s\S]*?```/g,"[code]").replace(/\s+/g," ").trim();return t.length>140?t.slice(0,137)+"…":t;}
/* r159's brief, with the written summary given 60% of the room (it had 40%) */
function brief(c,earlier,room){var L=[],me=earlier.filter(function(x){return x.role==="me"&&String(x.text||"").trim();});
  var a=day(earlier[0]&&(earlier[0].at||earlier[0].done)),b=day(earlier[earlier.length-1]&&(earlier[earlier.length-1].at||earlier[earlier.length-1].done));
  if(c&&c.imported)L.push("This conversation was carried over from "+(c.imported.from||"another assistant")+(c.imported.at?" ("+day(c.imported.at)+")":"")+"."+(c.imported.brief?" "+c.imported.brief:""));
  if(c&&c.summary)L.push("A summary of it so far: "+String(c.summary).slice(0,Math.floor(room*0.6)));
  if(me.length){var first=String(me[0].text).replace(/\s+/g," ").trim();L.push("It began with this request: \""+(first.length>500?first.slice(0,497)+"…":first)+"\"");}
  if(me.length>2){var k=Math.min(14,me.length-1),pts=[];for(var i=1;i<=k;i++){var j=Math.round(i*(me.length-1)/k);var s=line1(me[j].text);if(s&&pts.indexOf(s)<0)pts.push(s);}
    L.push("What was asked along the way, in order:\n"+pts.map(function(s){return "- "+s;}).join("\n"));}
  var out="["+earlier.length+" earlier messages"+(a?", from "+a+(b&&b!==a?" to "+b:""):"")+", are not shown in full: the conversation is longer than the model's memory.]\n"+L.join("\n");
  return out.length>room?out.slice(0,room-1)+"…":out;}
/* the room recalled: about a quarter of the memory, and no longer 16,000 characters at most whatever the memory (a window
   of 200,000 tokens recalls about 48,000 characters) */
function recallTarget(budget){return Math.min(Math.floor(budget*0.28),Math.max(16000,Math.floor(budget*0.08)));}
function allOf(c){return ((c&&c.messages)||[]).filter(function(x){return !x.preview&&!x.live&&(x.text||x.attach||x.attachRef||x.cid||x.seen);});}
/* after r159's recall: the block it wrote is found again exactly, then written anew with the larger room and the summary's share */
function recallMore(msgs){var ri=msgs&&msgs.recallInfo;if(!ri||ri.more||!W.IngMemory)return;
  var c=curChat(),all=allOf(c),old=(c&&c.__old)||[],budget=ri.budget,target=recallTarget(budget);
  if(target<=ri.room+500&&!(c&&c.summary))return;
  var lu=null;for(var k=msgs.length-1;k>=0;k--)if(msgs[k].role==="user"){lu=msgs[k];break;}if(!lu)return;
  var newest=null;for(var n=all.length-1;n>=0;n--)if(all[n].role==="me"){newest=all[n];break;}var q=newest?newest.text:"";
  var e0=old.concat(all.slice(0,Math.min(all.length,ri.st+ri.dropped)));if(!e0.length)return;
  var br0=IngMemory.brief(c,e0,Math.min(4000,Math.floor(ri.room*0.4))),ps0=IngMemory.passages(c,e0,q,ri.room-br0.length-40);
  var block0="[Earlier in this conversation]\n"+br0+(ps0?"\n\n"+ps0:""),content=textOf(lu);
  if(content.indexOf(block0+"\n\n")!==0)return;var orig=content.slice(block0.length+2);
  var used=ri.used,dropped=ri.dropped,ex=0;try{ex=(ingAIExampleMsgs(chatAI(),true,budget)||[]).length;}catch(e){}
  var h0=(msgs[0]&&msgs[0].role==="system"?1:0)+ex;
  while(budget-used-300<target&&msgs.length-h0>4){used-=sizeOf(msgs.splice(h0,1)[0]);dropped++;}
  while(msgs.length-h0>1&&msgs[h0].role==="assistant"){used-=sizeOf(msgs.splice(h0,1)[0]);dropped++;}
  var earlier=old.concat(all.slice(0,Math.min(all.length,ri.st+dropped))),room=Math.min(target,budget-used-300);if(room<700||!earlier.length)return;
  var br=brief(c,earlier,Math.min(4000,Math.floor(room*0.4))),ps=IngMemory.passages(c,earlier,q,room-br.length-40);
  setText(lu,"[Earlier in this conversation]\n"+br+(ps?"\n\n"+ps:"")+"\n\n"+orig);
  msgs.recalled=earlier.length;msgs.recallInfo=Object.assign({},ri,{dropped:dropped,room:room,used:used,target:target,passages:ps.length,more:1});}

/* ---------- 6. the rolling summary, written in the background ---------- */
var SUM={busy:false,want:false,timer:null,stopped:false,failedAt:0};
var SUM_SYS="You keep the running summary of a long conversation for the assistant that will go on with it. Write plain English in short lines, at most 250 words. Keep every name, decision, open task and file name the conversation holds; drop what is settled and small. Add nothing the conversation does not say. Write only the summary, with no heading and no remarks about it.";
function soon(){SUM.want=true;if(SUM.timer)return;SUM.timer=setTimeout(function(){SUM.timer=null;tryRun();},1500);}
/* never while a reply is live or a model is loading; a model on the device only when it is already loaded and resting
   (a phone or tablet is never made to load one for this) */
function idle(){try{if(typeof liveBot!=="undefined"&&liveBot)return false;if(isCloud())return !W._cloudAb;
    return Engine.status==="ready"&&!!Engine.modelId&&!!loadedModel();}catch(e){return false;}}
function archived(c){return ((c&&c.earlier)||[]).reduce(function(a,x){return a+(+x.n||0);},0);}
function loadOld(c){try{if(c.earlier&&c.earlier.length&&!c.__old&&W.IngR103&&IngR103.loadOld)return IngR103.loadOld(c);}catch(e){}return Promise.resolve(c.__old||[]);}
/* what came before the window: the messages kept apart (r103) and those before the window's start */
function beforeWindow(c){var old=(c&&c.__old)||[],all=allOf(c),st=0;for(var i=all.length-1;i>=0;i--)if(all[i].winStart){st=i;break;}return old.concat(all.slice(0,st));}
function lineOf(x){var t=String(x.text||"").replace(/\s+/g," ").trim();if(t.length>1200)t=t.slice(0,600)+" […] "+t.slice(t.length-580);
  if(x.files&&x.files.length)t+=" [files: "+x.files.map(function(f){return f.name;}).join(", ")+"]";
  return "["+(x.role==="me"?"Them":"Assistant")+(day(x.at||x.done)?", "+day(x.at||x.done):"")+"] "+t;}
function clean(t){t=String(t||"").replace(/<think>[\s\S]*?<\/think>/gi,"").replace(/^[\s\S]*<\/think>/i,"").replace(/^\s*(?:updated |running )?summary\s*:?\s*\n/i,"").trim();
  if(t.length>4000){var cut=t.lastIndexOf(". ",4000);t=t.slice(0,cut>2500?cut+1:4000);}return t;}
function askLocal(msgs){var m=loadedModel(),base=null;try{base=(typeof modelSampling==="function"&&modelSampling(m,2,false))||null;}catch(e){}
  var params=Object.assign({},base||(typeof EFFORT_MAP!=="undefined"&&(EFFORT_MAP[2]||EFFORT_MAP[3]))||{temperature:0.6,top_p:0.9},{max_tokens:600,thinking:false}),out="";
  Engine.setStatus("busy");
  return Engine.generate({messages:msgs,params:params,onToken:function(t){out+=t;},onThink:function(){}})
    .then(function(res){if(Engine.status==="busy")Engine.setStatus("ready");if(SUM.stopped)throw new Error("stopped");return out||(res&&res.text)||"";},
      function(e){if(Engine.status==="busy")Engine.setStatus("ready");throw e;});}
function askCloud(msgs){var keep=state.thinking,ab=netAbortable(),out="";W._cloudAb=ab;state.thinking=false;
  return Promise.resolve().then(function(){return typeof ensureCloudModel==="function"?ensureCloudModel():null;})
    .then(function(){return cloudChat(msgs,function(t){out+=t;},function(){},ab);})
    .then(function(){state.thinking=keep;if(W._cloudAb===ab)W._cloudAb=null;if(ab.aborted||SUM.stopped)throw new Error("stopped");return out;},
      function(e){state.thinking=keep;if(W._cloudAb===ab)W._cloudAb=null;throw e;});}
/* the newly covered messages, in chunks that fit 40% of the memory beside the summary so far; at most four rounds a run */
function summarise(c,fresh,done){var budget=1500;try{budget=chatBudget();}catch(e){}
  var sum=String(c.summary||""),room=Math.max(2500,Math.floor(budget*0.4)-sum.length-900),chunks=[],cur=[],len=0;
  fresh.forEach(function(x){var l=lineOf(x);if(len+l.length>room&&cur.length){chunks.push(cur);cur=[];len=0;}cur.push(l);len+=l.length+1;});
  if(cur.length)chunks.push(cur);chunks=chunks.slice(0,4);
  var covered=done,p=Promise.resolve(sum);
  chunks.forEach(function(ch){p=p.then(function(s){
    var u="The summary so far:\n"+(s||"(nothing yet: this is the start of the conversation)")+"\n\nThe next messages, in order:\n"+ch.join("\n")+"\n\nWrite the updated summary, at most 250 words.";
    var msgs=[{role:"system",content:SUM_SYS},{role:"user",content:u}];
    return (isCloud()?askCloud(msgs):askLocal(msgs)).then(function(t){t=clean(t);if(t.length<40)throw new Error("the summary came back empty");
      covered+=ch.length;c.summary=t;c.summaryN=covered;c.summaryAt=Date.now();try{saveState();}catch(e){}return t;});});});
  return p.then(function(){return covered<done+fresh.length;});}
function tryRun(){if(SUM.busy||!SUM.want)return;if(Date.now()-SUM.failedAt<600000)return;if(!idle())return;
  var c=null;try{c=curChat();}catch(e){}if(!c)return;
  SUM.want=false;SUM.busy=true;SUM.stopped=false;USE.quiet=true;
  loadOld(c).then(function(){var before=beforeWindow(c),done=Math.min(+c.summaryN||0,before.length);
      if(before.length<20||before.length-done<20)return false;
      return summarise(c,before.slice(done),done);})
    .then(function(more){SUM.busy=false;USE.quiet=false;if(more)soon();},
      function(e){SUM.busy=false;USE.quiet=false;if(!/stopped/.test(String(e&&e.message)))SUM.failedAt=Date.now();warn(e);});}
if(typeof W.trimChat==="function"){var oTrim=W.trimChat;
  W.trimChat=wrap(oTrim,function(){var c=null,n0=0;try{c=curChat();n0=archived(c);}catch(e){}var r=oTrim.apply(this,arguments);try{if(c&&archived(c)>n0)soon();}catch(e){}return r;});}
if(typeof W.chatHistory==="function"){var oHist=W.chatHistory;
  W.chatHistory=wrap(oHist,function(){var msgs=oHist.apply(this,arguments);try{recallMore(msgs);}catch(e){warn(e);}try{noteWindow(msgs);if(msgs&&msgs.recallInfo)soon();}catch(e){}return msgs;});}
if(typeof W.chatStop==="function"){var oStop=W.chatStop;W.chatStop=wrap(oStop,function(){if(SUM.busy)SUM.stopped=true;return oStop.apply(this,arguments);});}
try{Engine.on("status",function(s){try{paintAll();}catch(e){}if(s==="ready"&&SUM.want)soon();});}catch(e){}

/* ---------- 7. the computer app: the memory chosen by itself reaches 262,144, the model's header read first ---------- */
if(typeof W.r1AutoCtx==="function"){var oAuto=W.r1AutoCtx;
  W.r1AutoCtx=wrap(oAuto,function(m,A){try{if(m&&A===DeskAdapter){var ram=deviceMemGB(),top=(+m.ctxLen>0)?+m.ctxLen:131072;
        /* the same rule as r101 (70% of the memory), two steps further for a model trained for them */
        if(ram&&top>131072){var usable=ram*0.7,steps=[262144,196608,131072,98304,65536,49152,32768,24576,16384,12288,8192];
          for(var i=0;i<steps.length;i++){var c=Math.min(steps[i],top);if(estimateNeedGB(Object.assign({},m,{ctx:c}))<=usable)return c;}
          return Math.min(top,8192);}}}catch(e){}
    return oAuto.apply(this,arguments);});}
if(typeof DeskAdapter!=="undefined"&&DeskAdapter&&typeof DeskAdapter.load==="function"){var oLoad=DeskAdapter.load;
  DeskAdapter.load=wrap(oLoad,function(job){var self=this,args=arguments,m=job&&job.model,f=null;
    try{f=(m&&!(+m.ctxLen>0)&&!m.ctxUser&&typeof fileHandles!=="undefined"&&fileHandles[m.id]&&typeof ggufInspect==="function")?fileHandles[m.id]:null;}catch(e){f=null;}
    if(!f)return oLoad.apply(this,arguments);
    /* the trained length is in the file's header: read before the memory is chosen, so a model trained for more is given more */
    return Promise.resolve().then(function(){return ggufInspect(f);})
      .then(function(info){try{if(info&&info.ok){if(info.ctxLen)m.ctxLen=info.ctxLen;if(info.arch&&!m.arch)m.arch=info.arch;if(info.layers&&!m.layers)m.layers=info.layers;saveState();}}catch(e){}},function(){})
      .then(function(){return oLoad.apply(self,args);});});}

/* ---------- 8. a thinking budget comes on top of the reply; a personal AI's length is a floor ---------- */
if(typeof W.replyParams==="function"){var oRP=W.replyParams;
  W.replyParams=wrap(oRP,function(m,base){var p=oRP.apply(this,arguments);
    try{if(p&&p.thinking&&+p.thinking_budget>0){var want=(+$("ctlTokens").value||1024)+(+p.thinking_budget)+512;if(!(+p.max_tokens>=want))p.max_tokens=want;}}catch(e){}
    return p;});}
if(typeof W.aiApplyParams==="function"){var oAI=W.aiApplyParams;
  W.aiApplyParams=wrap(oAI,function(p,ai){var was=(p&&+p.max_tokens)||0,r=oAI.apply(this,arguments);try{if(r&&was&&+r.max_tokens<was)r.max_tokens=was;}catch(e){}return r;});}

/* ---------- 9. the reading page's parts follow the connection's window, when the connection says it ---------- */
if(typeof W.lxCtx==="function"){var oLx=W.lxCtx;
  W.lxCtx=wrap(oLx,function(m){try{
      if(typeof supUsesLink==="function"&&supUsesLink()){var inf=cloudInfo();if(inf&&+inf.ctx>0)return Math.min(+inf.ctx,262144);return oLx.apply(this,arguments);}
      var w=wasmCtx();if(w&&m&&Engine.modelId===m.id)return w;}catch(e){}
    return oLx.apply(this,arguments);});}

W.IngMem={line:memLine,window:windowNow,use:USE,paint:paintAll,keepInfo:keepInfo,version:idVersion,target:recallTarget,brief:brief,pageMax:pageMax,state:SUM,
  summarise:function(){SUM.want=true;SUM.failedAt=0;tryRun();}};
try{if(W.IngMemory&&typeof IngMemory.paint==="function")IngMemory.paint();}catch(e){}
try{paintAll();}catch(e){}
})();
;try{window.__ingParts["p195"]="running";}catch(_){}
</script>
