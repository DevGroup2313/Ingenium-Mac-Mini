<style id="r241-css">
/* 6.46 · a model thinks briefly and answers; sources when she asks (modules/r241.js) */
.ing-throw{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:10px;padding-top:9px;border-top:1px solid var(--hairline,rgba(60,40,90,.12))}
.ing-throw select{font:inherit;font-size:12.5px;font-weight:600;padding:4px 9px;border-radius:9px;border:1px solid var(--hairline,rgba(60,40,90,.18));background:var(--card,#fff);color:inherit;flex:0 0 auto}
body[data-theme="night"] .ing-throw select{background:#211a2b;color:#e9e3f3;border-color:rgba(233,227,243,.18)}
.msg-src-fold{margin:8px 0 0}
.msg-src-fold>summary{cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--accent,#6a3fb5);list-style:none;padding:4px 11px;border-radius:999px;border:1px solid var(--hairline,rgba(60,40,90,.16));background:var(--card,#fff)}
.msg-src-fold>summary::-webkit-details-marker{display:none}
.msg-src-fold[open]>summary{margin-bottom:6px}
body[data-theme="night"] .msg-src-fold>summary{background:#211a2b;border-color:rgba(233,227,243,.16);color:#c9b2f2}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p241"]="started";}catch(_){}
/* ============ R241 · A MODEL THINKS BRIEFLY AND ANSWERS; SOURCES WHEN SHE ASKS (Ingenium 6.46, 6 November 2026) ============
   Her words (6 November 2026): "The models inside of the chats of Ingenium spend more time debating the prompts and saying "Wait" and
   rechecking everytime and it takes ages for them to stop "Thinking" and reply, I want that to be fixed please, right now it is tedious
   to work in the regular chatrooms with the local models, I want that process to be smoother, faster and actually efficient and
   productive." And: "I also don't want sources and citations provided to me with every reply inside of the app, I only want them
   provided when I ask for them."
   Measured: a model on this device thought for as long as it liked (nothing in Ingenium ever stopped the thinking, only the reply's
   whole length), and the standing instructions asked every model to "check your work" (Your Ingenium's careful thinking, Magister's
   layer), which a thinking model reads as a call to go back over each step. Now:
   - how long a model on this device may think is set beside Thinking (Brief, the default; Standard; Deep; No limit). When the thinking
     passes it, or goes round in circles (the same sentence a third time, or "Wait", "Hmm" and "let me check" again and again), Ingenium
     stops the thinking, and the model answers at once from its notes, in the same reply; the thoughts keep a line saying so;
   - Only when it helps (on unless she turns it off): a short, simple message is answered at once, without thinking; a question that
     needs reasoning (why, explain, compare, plan, code, figures, a file, a long message) still thinks, within the limit;
   - the standing instructions ask a model to think a question through once, decide and answer, never to go back over what is settled;
   - with Web search or Research on, the answer is written from the sources without numbers or a list in its text, and the sources
     wait under it behind a Sources key, unless her message asks for sources, citations or references: then they are cited and shown. */
(function r241(){
"use strict";
if(window.__r241)return;window.__r241=1;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function save(){try{saveState();}catch(e){}}

/* ---------- 1. how long a model on this device may think ---------- */
var LEN={brief:{tok:700,name:"Brief"},standard:{tok:1800,name:"Standard"},deep:{tok:5000,name:"Deep"},open:{tok:0,name:"No limit"}};
function lenKey(){var k="";try{k=state.thinkLen;}catch(e){}return LEN[k]?k:"brief";}
function autoOn(){try{return state.thinkAuto!==false;}catch(e){return true;}}
function budgetChars(job,adapter){var p=(job&&job.params)||{},tok=+p.thinking_budget>0?+p.thinking_budget:(lenKey()==="open"?0:LEN[lenKey()].tok);if(!(tok>0))return 0;
  /* the computer app's engine ends the thoughts at the budget itself (llama.cpp: thinking_budget_tokens, build_page.py R101): it is watched for circles, and given room past the budget */
  var native=false;try{native=typeof DeskAdapter!=="undefined"&&adapter===DeskAdapter;}catch(e){}return tok*3.5*(native?1.8:1);}
var LOOPW=/\b(?:wait|hmm+|hold on|but wait|on second thought|let me (?:re-?)?check|let me double[- ]?check|double[- ]?check|let me verify|let me reconsider|let me re-?read|re-?check)\b/gi;
function looping(t){t=String(t||"");if(t.length<500)return false;if((t.match(LOOPW)||[]).length>=5)return true;
  var seen={},again=false;t.split(/[.!?]\s+|\n+/).forEach(function(s){s=s.trim().toLowerCase();if(s.length<24||again)return;seen[s]=(seen[s]||0)+1;if(seen[s]>=3)again=true;});return again;}
function stopLine(why){return "[Ingenium stopped the thinking here"+(why==="loop"?", as it had begun going over the same ground,":", at the length set beside Thinking,")+" and the model answers now.]";}
W.ingThinkLooping=looping;   /* for the tests */
/* Engine.generate goes through here (build_page.py 6.46): a reply that thinks is watched; anything else passes as it was */
W.ingThinkBudget=function(adapter,job){var p=(job&&job.params)||{},B=budgetChars(job,adapter);
  if(!p.thinking||!adapter||typeof adapter.abort!=="function")return adapter.generate(job);if(!(B>0))B=Infinity;   /* No limit: still watched for circles */
  var thought="",raw="",tagOpen=false,channel=false,answered=false,cut=false,why="";
  var oT=job.onToken||function(){},oK=job.onThink||null;
  function check(){if(cut||answered)return;if(thought.length>B)why="limit";else if(looping(thought))why="loop";else return;cut=true;try{adapter.abort();}catch(e){}}
  var job1=Object.assign({},job,{
    onThink:function(t){if(!t)return;channel=true;thought+=t;if(oK){try{oK(t);}catch(e){}}check();},
    onToken:function(t){raw+=t;var s=raw.replace(/^\s+/,"");
      if(!channel&&/^<think>/i.test(s)){var e=s.search(/<\/think>/i);if(e<0){tagOpen=true;thought=s.slice(7);}else{tagOpen=false;if(s.slice(e+8).trim())answered=true;}}
      else if(String(t||"").trim())answered=true;
      oT(t);check();}});
  return Promise.resolve(adapter.generate(job1)).then(function(r1){if(!cut)return r1;
    var line=stopLine(why),close="";
    if(tagOpen){close="\n\n"+line+"\n</think>\n\n";oT(close);}else if(oK){try{oK("\n\n"+line);}catch(e){}}
    var notes=thought.length>7000?thought.slice(0,2000)+"\n[…]\n"+thought.slice(-4500):thought;
    var msgs=(job.messages||[]).slice(),li=-1;for(var i=msgs.length-1;i>=0;i--){if(msgs[i]&&msgs[i].role==="user"){li=i;break;}}
    var add="\n\n(Your notes from thinking about this so far:\n"+notes.trim()+"\n\nDo not think again and do not go back over these notes. Answer now, directly and completely.)";
    if(li>=0){var m=Object.assign({},msgs[li]);m.content=typeof m.content==="string"?m.content+add:(m.content||[]).concat([{type:"text",text:add}]);msgs[li]=m;}
    var job2=Object.assign({},job,{messages:msgs,params:Object.assign({},p,{thinking:false}),onThink:null,onToken:oT});
    return Promise.resolve(adapter.generate(job2)).then(function(r2){return {text:((r1&&r1.text)||"")+close+((r2&&r2.text)||""),stats:(r2&&r2.stats)||(r1&&r1.stats)||{},thinkCut:why};});});};

/* ---------- 2. only when it helps: a short, simple message is answered at once ---------- */
function lastMine(){try{var ms=curMsgs();for(var i=ms.length-1;i>=0;i--)if(ms[i].role==="me")return ms[i];}catch(e){}return null;}
function needsThought(rec){if(!rec)return true;var t=String(rec.text||"");
  if((rec.files&&rec.files.length)||rec.attach||rec.attachRef||rec.img||rec.web)return true;
  if(t.length>320)return true;
  if(/```|\b(code|debug|error|bug|function|regex|sql|javascript|python|html|css|algorithm)\b/i.test(t))return true;
  if(/\d\s*[-+*\/^=x×÷]\s*\d|\b(calculate|solve|prove|equation|probability|percentage|how many|how much)\b/i.test(t))return true;
  if(/\b(why|explain|analy[sz]e|compare|contrast|evaluate|assess|plan|design|strategy|decide|choose between|pros and cons|trade-?offs?|step by step|reason|critique|review|argue|justify|outline|structure)\b/i.test(t))return true;
  if((t.match(/\?/g)||[]).length>=2)return true;
  return false;}
W.ingNeedsThought=needsThought;   /* for the tests */
if(typeof W.replyParams==="function"){var oRP=W.replyParams;
  W.replyParams=function(m,base){var chat=false;try{chat=typeof liveBot!=="undefined"&&!!liveBot&&!!liveBot.live;}catch(e){}
    if(chat&&autoOn()&&typeof W.thinkOn==="function"&&W.thinkOn()&&!needsThought(lastMine())){var oTh=W.thinkOn;W.thinkOn=function(){return false;};
      try{var r=oRP.apply(this,arguments);if(r)r.thinking=false;try{if(liveBot)liveBot.quick=true;}catch(e){}return r;}finally{W.thinkOn=oTh;}}
    var r2=oRP.apply(this,arguments);
    /* how long: Brief keeps to about 700 tokens (1,400 at Max effort), Standard the model's own (R101: by its size and Effort), Deep twice that, No limit none */
    try{if(r2&&r2.thinking){var k=lenKey(),b=+r2.thinking_budget||0,mx=(+$("ctlEffort").value||3)>=5?2:1;
      if(k==="brief")r2.thinking_budget=b>0?Math.min(b,700*mx):700*mx;else if(k==="deep")r2.thinking_budget=b>0?b*2:LEN.deep.tok;else if(k==="open")delete r2.thinking_budget;else if(!(b>0))r2.thinking_budget=LEN.standard.tok;}}catch(e){}
    return r2;};}

/* ---------- 3. the controls, beside Thinking ---------- */
function controls(){var menu=$("effortMenu"),row=menu&&menu.querySelector(".effort-think");if(!row||$("thinkLen"))return;
  var a=D.createElement("div");a.className="ing-throw";
  a.innerHTML='<div><div style="font-weight:700;font-size:13px">How long it thinks</div><div class="small muted">A model that goes round in circles is stopped, and answers</div></div>'+
    '<select id="thinkLen" aria-label="How long a model on this device thinks">'+Object.keys(LEN).map(function(k){return '<option value="'+k+'">'+LEN[k].name+'</option>';}).join("")+'</select>';
  var b=D.createElement("div");b.className="ing-throw";
  b.innerHTML='<div><div style="font-weight:700;font-size:13px">Only when it helps</div><div class="small muted">A short, simple message is answered at once</div></div>'+
    '<label class="eswitch" title="Think only when a question needs it"><input type="checkbox" id="thinkAuto" aria-label="Think only when a question needs it"><span class="etrack"></span></label>';
  row.parentNode.insertBefore(b,row.nextSibling);row.parentNode.insertBefore(a,row.nextSibling);
  var sel=$("thinkLen"),cb=$("thinkAuto");sel.value=lenKey();cb.checked=autoOn();
  sel.addEventListener("change",function(){state.thinkLen=sel.value;save();});
  cb.addEventListener("change",function(){state.thinkAuto=!!cb.checked;save();});}
try{controls();}catch(e){}
try{var mo=new MutationObserver(function(){if(!$("thinkLen"))try{controls();}catch(e){}});var em=$("effortMenu");if(em)mo.observe(em.parentNode||em,{childList:true});}catch(e){}

/* ---------- 4. the standing instructions: think once, decide, answer ---------- */
if(typeof W.chatSystemPrompt==="function"){var oSP=W.chatSystemPrompt;
  W.chatSystemPrompt=function(){var s=oSP.apply(this,arguments);try{var cloud=chatSource()==="cloud"&&state.cloud&&state.cloud.on;
      if(!cloud&&W.thinkOn&&W.thinkOn())s=String(s||"")+"\n\nWhen you think before answering, think briefly and decisively: work out what is asked, plan the answer, then write it. Do not repeat yourself, do not start over, and do not go back to re-check what you have already settled.";}catch(e){}
    return s;};}

/* ---------- 5. sources when she asks ---------- */
var ASKS=/\b(sources?|citations?|cite|cited|citing|references?|bibliograph\w*|footnotes?|links?|urls?|where (?:did|does|do) (?:you|that|this|it) (?:get|come|find)|evidence for)\b/i;
W.ingAsksSources=function(t){return ASKS.test(String(t||""));};
/* the instruction the web search gives the model (build_page.py 6.46 calls it in place of "Cite them by number") */
W.ingCiteRule=function(rec,scholarly){var asked=!!(rec&&ASKS.test(String(rec.text||"")));try{if(rec)rec.askSrc=asked;}catch(e){}
  if(asked)return scholarly?"Cite them by number after each claim they support, like [1] or [2, 4].":"Cite them by number, like [1], after each claim they support.";
  return "Do not put numbers, citations or a list of sources in your answer: the person has not asked for them, and they are kept under your answer.";};
/* under the reply: the sources wait behind a key, unless she asked for them */
function asked(mm){if(mm&&typeof mm.askSrc==="boolean")return mm.askSrc;try{var ms=curMsgs(),i=ms.indexOf(mm);for(var j=i-1;j>=0;j--)if(ms[j].role==="me")return ASKS.test(String(ms[j].text||""));}catch(e){}return false;}
if(typeof W.fillMsg==="function"){var oFill=W.fillMsg;
  W.fillMsg=function(d,mm){var r=oFill.apply(this,arguments);
    try{if(mm&&mm.role==="bot"&&mm.sources&&mm.sources.length&&!asked(mm)){[].slice.call(d.querySelectorAll(".msg-sources")).forEach(function(box){if(box.closest(".msg-src-fold"))return;
        var det=D.createElement("details");det.className="msg-src-fold";var sm=D.createElement("summary");sm.textContent="Sources ("+mm.sources.length+")";det.appendChild(sm);
        box.parentNode.insertBefore(det,box);det.appendChild(box);});}}catch(e){}
    return r;};}
})();
;try{window.__ingParts["p241"]="running";}catch(_){}
</script>
