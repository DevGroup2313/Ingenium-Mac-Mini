<style id="r159-css">
/* ============ R159 · A LONG MEMORY: MORE CONTEXT, MORE TOKENS, NOTHING FORGOTTEN ============
   The owner's words (23 October 2026): "I want for context and tokens to be massively increased inside of Ingenium. I want to
   be able to import my exported data from other chats into the app and continue working on my projects smoothly." Measured
   on 6.2 before this part:
   - a model on this computer was given at most 32,768 tokens of memory (the slider stopped there, and so did the automatic
     choice), though the computer apps' engine takes 262,144; a reply was held to 16,384 tokens;
   - a connected model was given 100,000 tokens whatever its own window (Claude's is 200,000, Gemini's a million), and
     Ollama none at all: it fell back to its own few thousand and silently dropped the start of every long conversation;
   - however large the memory, a conversation kept only its last 16 to 24 messages;
   - what the window left behind was simply gone.
   Now:
   - on a computer the memory is sized to the model and the machine up to 131,072 tokens by itself (the engine keeps its
     memory in eight bits past 32,768, which halves what it needs), and up to 262,144 by hand; a reply may run to 65,536;
   - a connected model is given its own window (Settings in Controls: Auto, or a size of her choosing), and Ollama is told;
   - a conversation keeps every message its memory holds;
   - when a conversation is longer than any memory, the newest message carries a brief of all that came before and the
     earlier passages that match it, found on the device; everything before the newest message stays as it was, so the
     engine reuses what it has already read. */
#ctlCloudRow[hidden]{display:none}
#ctlCloudRow select{margin-top:4px;width:100%}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p80"]="started";}catch(_){}
/* R159 · a long memory: see the note at the top of its styles */
(function(){"use strict";
if(window.__r159)return;window.__r159=1;
var W=window;
function $(id){return document.getElementById(id);}
function K(n){return n>=1000000?(n/1000000)+"M":n>=1024?Math.round(n/1024)+"K":String(n);}
function activeModel(){try{return state.models.filter(function(x){return x.id===state.activeModelId;})[0]||null;}catch(e){return null;}}

/* ---------- 1. the most memory a model may be given, by where it runs ---------- */
function where(m){if(!m)return "page";try{if(typeof INB!=="undefined"&&INB&&m.nativeId)return "native";if(DeskAdapter.accepts(m)||m.shellStored)return "desk";}catch(e){}return "page";}
W.ingCtxMax=function(m){var w=where(m),train=(m&&+m.ctxLen>0)?+m.ctxLen:0;
  if(w==="native")return (typeof nativeInfo!=="undefined"&&nativeInfo&&nativeInfo.maxCtx)||8192;
  if(w==="desk")return Math.max(32768,Math.min(262144,train||262144));
  return 32768;};
W.ingReplyMax=function(m){var w=where(m);try{if(chatSource()==="cloud"&&state.cloud&&state.cloud.on)return 65536;}catch(e){}return w==="desk"?65536:w==="native"?8192:16384;};
/* past 32,768 the computer apps' engine keeps its memory in eight bits (desktop/app_ctx_62.py): half the room */
if(typeof W.estimateNeedGB==="function"){var oNeed=W.estimateNeedGB;
  W.estimateNeedGB=estimateNeedGB=function(m){var g=oNeed.apply(this,arguments);try{if(m&&+m.ctx>32768&&where(m)==="desk"){var ps=m.paramB?Math.max(0.5,m.paramB/7):1;g-=((+m.ctx)/1024)*0.12*ps*0.5;}}catch(e){}return g;};}

/* ---------- 2. a connected model's own window ---------- */
W.ingCloudWindow=function(){var c=state.cloud||{},p=c.provider||"",m=String(c.model||"").toLowerCase(),pick=+c.window||0,max=128000;
  if(p==="anthropic")max=/(^|[-\[_])1m\b|\[1m\]/.test(m)?1000000:200000;
  else if(p==="openai")max=/gpt-4\.1/.test(m)?1000000:/gpt-5|\bo3\b|\bo4/.test(m)?400000:/gpt-4o|4-turbo/.test(m)?128000:200000;
  else if(p==="gemini")max=1000000;
  else if(p==="moonshot")max=256000;
  else if(p==="openrouter")max=/gemini/.test(m)?1000000:/claude/.test(m)?200000:/gpt-4\.1|llama-4/.test(m)?1000000:/gpt-5/.test(m)?400000:/kimi|qwen3|deepseek/.test(m)?131072:128000;
  else if(p==="ollama-cloud")max=131072;
  else if(p==="ingenium"){var inf=(c.info||{})[c.model]||{};max=+inf.ctx||32768;}
  else max=32768;   /* a server on this computer or in the home holds what its machine holds: chosen by hand when more is wanted */
  return pick||max;};

/* ---------- 3. Controls: the sliders reach as far as the model goes, and a connected model's memory ---------- */
function paintLimits(){var m=activeModel(),c=$("ctlCtx"),t=$("ctlTokens");
  if(c){var mx=ingCtxMax(m);if(+c.max!==mx){c.max=String(mx);if(+c.value>mx)c.value=String(mx);}}
  if(t){var rx=ingReplyMax(m);if(+t.max!==rx){t.max=String(rx);if(+t.value>rx)t.value=String(rx);}}
  var vc=$("valCtx");if(vc&&c)vc.textContent=(+c.value).toLocaleString()+" ("+K(+c.value)+")";
  var row=$("ctlCloudRow");if(row){var cl=false;try{cl=chatSource()==="cloud"&&state.cloud&&state.cloud.on;}catch(e){}row.hidden=!cl;
    var sel=$("ctlCloudCtx");if(sel){var pv=String(+((state.cloud||{}).window)||0);if(sel.value!==pv)sel.value=pv;
      var auto=sel.querySelector('option[value="0"]');if(auto){var cw=(state.cloud||{}).window;state.cloud.window=0;auto.textContent="Auto: the model's own window ("+K(ingCloudWindow())+")";state.cloud.window=cw;}}}}
function cloudRow(){if($("ctlCloudRow")||!$("ctlCtx"))return;var lab=$("ctlCtx").closest("label");if(!lab)return;
  var row=document.createElement("label");row.className="field";row.id="ctlCloudRow";row.hidden=true;
  row.innerHTML='<span>Memory for a connected model (tokens)</span><select id="ctlCloudCtx"><option value="0">Auto</option><option value="32768">32K</option><option value="65536">64K</option>'+
    '<option value="131072">128K</option><option value="200000">200K</option><option value="262144">256K</option><option value="400000">400K</option><option value="1000000">1M</option></select>'+
    '<span class="small muted">The whole of it is used only when the conversation needs it. A server on this computer or in your home holds what its machine holds.</span>';
  lab.parentNode.insertBefore(row,lab.nextSibling);
  $("ctlCloudCtx").addEventListener("change",function(){state.cloud=state.cloud||{};state.cloud.window=+this.value||0;saveState();paintLimits();});}
if(typeof W.paintChatCtl==="function"){var oPaint=W.paintChatCtl;W.paintChatCtl=paintChatCtl=function(){var r=oPaint.apply(this,arguments);try{paintLimits();}catch(e){}return r;};}
try{cloudRow();paintLimits();}catch(e){}
document.addEventListener("click",function(e){if(e.target&&e.target.closest&&e.target.closest("#chatCtlBtn"))setTimeout(function(){try{paintLimits();}catch(_){}},0);},true);

/* ---------- 4. what came before the window: a brief, and the passages that match the newest message ---------- */
function body(x){var t=String(x.text||"");if(x.seen&&x.seen.v&&W.IngEyes)t="[a picture: "+(x.seen.line||"")+"] "+t;if(x.files&&x.files.length)t+="\n[files: "+x.files.map(function(f){return f.name;}).join(", ")+"]";return t;}
function who(x){return x.role==="me"?"Them":"Assistant";}
function day(t){try{if(!t)return "";var d=new Date(t);return isNaN(d)?"":d.toISOString().slice(0,10);}catch(e){return "";}}
function line1(t){t=String(t||"").replace(/```[\s\S]*?```/g,"[code]").replace(/\s+/g," ").trim();return t.length>140?t.slice(0,137)+"…":t;}
/* written on the device, from the conversation itself: how it began, the arc of what was asked, how it was carried over */
function brief(c,earlier,room){var L=[],me=earlier.filter(function(x){return x.role==="me"&&String(x.text||"").trim();});
  var a=day(earlier[0]&&(earlier[0].at||earlier[0].done)),b=day(earlier[earlier.length-1]&&(earlier[earlier.length-1].at||earlier[earlier.length-1].done));
  if(c&&c.imported)L.push("This conversation was carried over from "+(c.imported.from||"another assistant")+(c.imported.at?" ("+day(c.imported.at)+")":"")+"."+(c.imported.brief?" "+c.imported.brief:""));
  if(c&&c.summary)L.push("A summary of it so far: "+String(c.summary).slice(0,Math.floor(room*0.4)));
  if(me.length){var first=String(me[0].text).replace(/\s+/g," ").trim();L.push("It began with this request: \""+(first.length>500?first.slice(0,497)+"…":first)+"\"");}
  if(me.length>2){var k=Math.min(14,me.length-1),pts=[];for(var i=1;i<=k;i++){var j=Math.round(i*(me.length-1)/k);var s=line1(me[j].text);if(s&&pts.indexOf(s)<0)pts.push(s);}
    L.push("What was asked along the way, in order:\n"+pts.map(function(s){return "- "+s;}).join("\n"));}
  var out="["+earlier.length+" earlier messages"+(a?", from "+a+(b&&b!==a?" to "+b:""):"")+", are not shown in full: the conversation is longer than the model's memory.]\n"+L.join("\n");
  return out.length>room?out.slice(0,room-1)+"…":out;}
var MIDX=new Map();
function chunksOf(earlier){var out=[];earlier.forEach(function(x,xi){var t=body(x);if(!t.trim())return;var head="["+who(x)+(day(x.at||x.done)?", "+day(x.at||x.done):"")+"]\n";
  for(var i=0;i<t.length;i+=800)out.push({x:xi,text:head+t.slice(i,i+800)});});return out;}
function memIndex(c,earlier){var last=earlier[earlier.length-1]||{},key=(c&&c.id)+":"+earlier.length+":"+(last.at||last.done||"")+":"+String(last.text||"").length;
  var ix=MIDX.get(key);if(ix)return ix;
  var ch=chunksOf(earlier),df=new Map(),total=0;
  ch.forEach(function(c1){var terms=docTerms(c1.text),tf=new Map();terms.forEach(function(w){tf.set(w,(tf.get(w)||0)+1);});tf.forEach(function(_,w){df.set(w,(df.get(w)||0)+1);});c1.tf=tf;c1.len=terms.length||1;total+=c1.len;});
  ix={chunks:ch,df:df,total:total};MIDX.set(key,ix);if(MIDX.size>6)MIDX.delete(MIDX.keys().next().value);return ix;}
function passages(c,earlier,query,room){if(room<500)return "";var q=docTerms(query);if(!q.length)return "";var ix=memIndex(c,earlier),N=ix.chunks.length;if(!N)return "";
  var avg=ix.total/N||1,uq=[];q.forEach(function(w){if(uq.indexOf(w)<0)uq.push(w);});
  ix.chunks.forEach(function(ch){var sc=0;uq.forEach(function(w){var f=ch.tf.get(w);if(!f)return;var d=ix.df.get(w);sc+=Math.log(1+(N-d+0.5)/(d+0.5))*f*2.2/(f+1.2*(0.25+0.75*ch.len/avg));});ch.score=sc;});
  var best=ix.chunks.filter(function(ch){return ch.score>0;}).sort(function(a,b){return b.score-a.score;});if(!best.length)return "";
  var top=best[0].score,keep=[],used=0;for(var i=0;i<best.length&&i<2000;i++){var ch=best[i];if(ch.score<top*0.2)break;if(used+ch.text.length>room)continue;keep.push(ch);used+=ch.text.length;}
  keep.sort(function(a,b){return a.x-b.x;});
  return "[Passages from those earlier messages that bear on the newest one:]\n"+keep.map(function(ch){return ch.text.trim();}).join("\n…\n");}
function size(m){return typeof m.content==="string"?m.content.length:(m.content||[]).reduce(function(a,p){return a+(p.text?p.text.length:1200);},0);}
function recall(msgs){var c=curChat(),all=curMsgs().filter(function(x){return !x.preview&&!x.live&&(x.text||x.attach||x.attachRef||x.cid||x.seen);});
  var st=-1;for(var i=0;i<all.length;i++)if(all[i].winStart){st=i;break;}
  /* what a long conversation keeps apart (modules/r103.js moves its oldest messages to the store), read before the reply */
  var old=(c&&c.__old)||[];if(st<0)st=0;if(st===0&&!old.length)return;
  var budget=chatBudget(),used=msgs.reduce(function(a,m){return a+size(m);},0);
  /* room for what is recalled: the oldest messages of the window give way (the newest four always stay) until about a
     quarter of the memory is free; what gives way is recalled with the rest */
  var target=Math.min(Math.floor(budget*0.28),16000),ex=0,dropped=0;try{ex=(ingAIExampleMsgs(chatAI(),true,budget)||[]).length;}catch(e){}
  var h0=(msgs[0]&&msgs[0].role==="system"?1:0)+ex;
  while(budget-used-300<target&&msgs.length-h0>4){used-=size(msgs.splice(h0,1)[0]);dropped++;}
  while(msgs.length-h0>1&&msgs[h0].role==="assistant"){used-=size(msgs.splice(h0,1)[0]);dropped++;}
  var earlier=old.concat(all.slice(0,Math.min(all.length,st+dropped)));if(!earlier.length)return;
  var room=Math.min(target,budget-used-300);if(room<700)return;
  var lu=null;for(var k=msgs.length-1;k>=0;k--)if(msgs[k].role==="user"){lu=msgs[k];break;}if(!lu)return;
  var newest=null;for(var n=all.length-1;n>=0;n--)if(all[n].role==="me"){newest=all[n];break;}
  var br=brief(c,earlier,Math.min(4000,Math.floor(room*0.4))),ps=passages(c,earlier,newest?newest.text:"",room-br.length-40);
  var block="[Earlier in this conversation]\n"+br+(ps?"\n\n"+ps:"");
  if(typeof lu.content==="string")lu.content=block+"\n\n"+lu.content;
  else if(Array.isArray(lu.content)){var tp=lu.content.filter(function(p){return p.type==="text";})[0];if(tp)tp.text=block+"\n\n"+tp.text;else lu.content.push({type:"text",text:block});}
  msgs.recalled=earlier.length;msgs.recallInfo={st:st,dropped:dropped,all:all.length,room:room,used:used,budget:budget,passages:ps.length};}
/* before a reply: the messages a long conversation keeps apart are read back, so the memory can draw on all of them */
if(typeof W.chatPrepare==="function"){var oPrep=W.chatPrepare;
  W.chatPrepare=chatPrepare=function(){var self=this,args=arguments,c=null;try{c=curChat();}catch(e){}
    var p=(c&&c.earlier&&c.earlier.length&&!c.__old&&W.IngR103&&IngR103.loadOld)?IngR103.loadOld(c).catch(function(){}):Promise.resolve();
    return p.then(function(){return oPrep.apply(self,args);});};}
if(typeof W.chatHistory==="function"){var oHist=W.chatHistory;
  W.chatHistory=chatHistory=function(){var msgs=oHist.apply(this,arguments);try{recall(msgs);}catch(e){try{console.warn("Ingenium memory:",e);}catch(_){}}return msgs;};}

W.IngMemory={brief:brief,passages:passages,cloudWindow:W.ingCloudWindow,ctxMax:W.ingCtxMax,replyMax:W.ingReplyMax,paint:paintLimits};
})();
;try{window.__ingParts["p80"]="running";}catch(_){}
</script>
