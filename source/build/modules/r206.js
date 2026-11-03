<style id="r206-css">
/* ============ R206 · A CONNECTED MODEL'S LIMITS, KEPT (Ingenium 6.9.4, 3 November 2026) ============
   No styles of its own: the notes use the chat's own note line under a reply, and the waits use the reply's status line. */
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p206"]="started";}catch(_){}
/* ============ R206 · A CONNECTED MODEL'S LIMITS, KEPT (Ingenium 6.9.4, 3 November 2026) ============
   The owner's words (3 November 2026): "I tried to run Fable through the API key on Ingenium and the chat kept on crashing because
   it was exceeding Token limits. I want Ingenium to be strong enough to do it."
   Measured on 6.9.3 before this part:
   - for a connected model the history was fitted to the window less the Controls slider's reply (1,024 tokens, 2,560 with
     Thinking), but the request then asked for the model's whole longest reply (up to 128,000 tokens for Claude): a conversation
     filled to the window asked for 125,000 tokens more than the window held;
   - the history was counted at 3 characters a token; code, tables and French run shorter than that, so the estimate fell short
     of what the service counted;
   - a refusal for size (the conversation too long, a reply asked longer than the model gives) or for the key's tokens per minute
     ended the reply with the service's own words, and nothing was tried again.
   Now:
   - the history of a connected model is fitted to its window less the reply it will really be asked for (at most a fifth of the
     window), at 2.5 characters a token; the reply asked for is never more than the window leaves after the conversation;
   - a refusal for size, before any word of the reply has come, is answered by Ingenium itself: the oldest part of the
     conversation is left out (the newest message, the instructions and the passages recalled are kept, and a message that is
     still too long is shortened in its middle), and the request is sent again, at most four times; what the service said about
     its window, its longest reply or its own count of the conversation's tokens is kept for that model, so the next message
     fits the first time;
   - a refusal for the key's tokens per minute (429) waits a minute, saying so on the reply's status line with a countdown, and
     tries again (twice at most); when one message is larger than a minute's allowance, it is fitted to the allowance first;
     a service that is busy (529, 500, 502, 503, 504) is tried again after 8 and then 20 seconds;
   - a reply that has begun is never sent again, so no word is doubled; Stop ends any wait at once;
   - what was left out is said in one plain sentence under the reply, and a refusal that remains is said in plain words. */
(function(){"use strict";
if(window.__r206)return;window.__r206=1;
var W=window;
var CPT=2.5;   /* characters a token, for a connected model: shorter than the 3 the page counts, as code and French run shorter */
/* the service's own count, when a refusal has told it (characters a token for this model, between 0.8 and 2.5) */
function cpt(){try{var c=state.cloud||{},i=(c.info||{})[c.model]||{};var v=+i.cpt;return v>0?Math.max(0.8,Math.min(CPT,v)):CPT;}catch(e){return CPT;}}
function learnCpt(sentChars,tokens){try{if(!(sentChars>0&&tokens>0))return;var i=info();if(!i)return;var v=Math.max(0.8,Math.min(CPT,(sentChars/tokens)*0.95));
  if(!(+i.cpt>0)||v<+i.cpt){i.cpt=Math.round(v*100)/100;saveState();}}catch(e){}}
function wrap(o,f){try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}return f;}
function isCloud(){try{return chatSource()==="cloud"&&!!(state.cloud&&state.cloud.on&&state.cloud.provider);}catch(e){return false;}}
function win(){try{return typeof ingCloudWindow==="function"?(+ingCloudWindow()||0):0;}catch(e){return 0;}}
function info(){try{var c=state.cloud||{};if(!c.model)return null;c.info=c.info||{};return c.info[c.model]=c.info[c.model]||{};}catch(e){return null;}}
function knownOut(){var i=info();return i&&+i.out>0?+i.out:0;}
function num(s){return +String(s||"").replace(/[,\s_]/g,"")||0;}
function sizeOf(m){try{return typeof m.content==="string"?m.content.length:(m.content||[]).reduce(function(a,p){return a+(p&&typeof p.text==="string"?p.text.length:(p&&p.type==="text"?0:1200));},0);}catch(e){return 0;}}
function chars(msgs){return msgs.reduce(function(a,m){return a+sizeOf(m)+12;},0);}
function estTok(msgs){return Math.ceil(chars(msgs)/cpt());}
function provName(){var p="";try{p=(state.cloud||{}).provider||"";}catch(e){}
  return {anthropic:"Anthropic",openai:"OpenAI",openrouter:"OpenRouter",gemini:"Google",moonshot:"Moonshot","ollama-cloud":"Ollama"}[p]||"The service";}
function modelName(){try{return (state.cloud||{}).model||"this model";}catch(e){return "this model";}}

/* ---------- 1. the reply a connected model is asked for, kept inside its window ---------- */
/* the room kept for the reply: the reply the request will ask for (the model's longest when known, 128,000 for a window of
   400,000 or more, 32,000 otherwise), never less than the slider's, and never more than a fifth of the window */
function reserveFor(w){var want=4096;try{want=replyTokens();}catch(e){}
  var cap=knownOut()||(w>=400000?128000:32000);want=Math.max(want,cap);
  return Math.max(1024,Math.min(want,Math.floor(w*0.2)));}
W.ingCloudReserve=reserveFor;
if(typeof W.chatBudget==="function"){var oBud=W.chatBudget;
  W.chatBudget=wrap(oBud,function(){var b=oBud.apply(this,arguments);
    try{if(isCloud()){var w=win();if(w>0){var mine=Math.max(1500,Math.floor((w-reserveFor(w)-1024)*cpt()));if(mine<b)b=mine;}}}catch(e){}
    return b;});}
/* what the request in flight holds (set by the wrapper below while cloudChat builds its request) */
var NOW={inTok:0,capOnce:0};
if(typeof W.ingReplyCap==="function"){var oCap=W.ingReplyCap;
  W.ingReplyCap=wrap(oCap,function(maxTok,modern){var r=oCap.apply(this,arguments);
    try{if(NOW.capOnce>0)r=Math.min(r,NOW.capOnce);
      var w=win();if(w>0&&NOW.inTok>0){var room=w-NOW.inTok-1024;if(room<r)r=Math.max(1024,Math.floor(room/256)*256);}}catch(e){}
    return r;});}

/* ---------- 2. a conversation fitted to a number of characters ---------- */
function cutText(t,room,why){t=String(t||"");if(t.length<=room)return t;room=Math.max(400,room);
  var head=Math.floor(room*0.6),tail=Math.max(0,room-head-120);
  return t.slice(0,head)+"\n\n[… "+(t.length-head-tail).toLocaleString()+" characters left out here "+why+" …]\n\n"+(tail?t.slice(t.length-tail):"");}
function cutMsg(m,room,why){var c=Object.assign({},m);
  if(typeof c.content==="string")c.content=cutText(c.content,room,why);
  else if(Array.isArray(c.content)){var tx=c.content.filter(function(p){return p&&typeof p.text==="string";}),all=tx.reduce(function(a,p){return a+p.text.length;},0)||1;
    c.content=c.content.map(function(p){return (p&&typeof p.text==="string")?Object.assign({},p,{text:cutText(p.text,Math.floor(room*p.text.length/all),why)}):p;});}
  return c;}
/* a copy keeps the chat's own mark (r190's agent and the summaries know the chat's history by it) */
function keepMark(from,to){try{if(from&&from.__ingChat===true&&to&&to.__ingChat!==true)Object.defineProperty(to,"__ingChat",{value:true,enumerable:false,configurable:true});}catch(e){}return to;}
/* the oldest messages go first; the instructions (system), the newest message and the first message's role (user) are kept */
function fit(msgs,target,why){var sys=msgs.filter(function(m){return m.role==="system";}),rest=msgs.filter(function(m){return m.role!=="system";});
  var dropped=0,total=chars(msgs);if(total<=target)return {msgs:msgs,dropped:0,cut:false};
  while(rest.length>1&&total>target){total-=sizeOf(rest[0])+12;rest.shift();dropped++;
    while(rest.length>1&&rest[0].role!=="user"){total-=sizeOf(rest[0])+12;rest.shift();dropped++;}}
  var cut=false;
  if(total>target&&rest.length){var last=rest[rest.length-1],others=total-sizeOf(last);
    var room=Math.max(2000,target-others);if(sizeOf(last)>room){rest[rest.length-1]=cutMsg(last,room,why);cut=true;total=chars(sys.concat(rest));}}
  if(total>target&&sys.length){var sroom=Math.max(2000,target-chars(rest));sys=sys.map(function(s){return cutMsg(s,Math.floor(sroom/sys.length),why);});cut=true;}
  if(dropped&&sys.length){sys[0]=Object.assign({},sys[0]);if(typeof sys[0].content==="string")sys[0].content+="\n\n(The oldest "+dropped+" message"+(dropped===1?" of this conversation was":"s of this conversation were")+" left out "+why+".)";}
  return {msgs:keepMark(msgs,sys.concat(rest)),dropped:dropped,cut:cut};}
W.ingFitMessages=function(msgs,target){return fit(msgs,target,"to fit the model's memory").msgs;};   /* for the tests */

/* ---------- 3. what a refusal was about ---------- */
function kind(e){var m=String(e&&e.message||e||""),code=+((/HTTP (\d{3})/.exec(m)||[])[1])||0,x;
  if(/^Stopped\.?$/.test(m))return null;
  if(code===429||/rate.?limit/i.test(m)){var pm=/([\d,]+)\s+(?:input\s+|output\s+)?tokens?\s+per\s+minute/i.exec(m),af=/(?:retry|try again)[^\d]{0,24}(\d+)\s*(?:s\b|sec)/i.exec(m);
    return {type:"rate",perMin:pm?num(pm[1]):0,after:af?Math.min(120,+af[1]):0,daily:/per day|daily/i.test(m)};}
  if(code===529||/overloaded/i.test(m)||code===500||code===502||code===503||code===504)return {type:"busy"};
  if((x=/(\d[\d,]*)\s*\+\s*(\d[\d,]*)\s*>\s*(\d[\d,]*)/.exec(m))&&/token|context|limit/i.test(m))return {type:"sum",input:num(x[1]),out:num(x[2]),win:num(x[3])};
  if(/max_tokens|max_completion_tokens|maximum output|output tokens/i.test(m)&&!/prompt|input|context length/i.test(m)){
    x=/(\d[\d,]*)\s*>\s*(\d[\d,]*)/.exec(m)||/(?:at most|maximum(?: of| is)?|up to|limit(?: of| is)?)[^\d]{0,24}(\d[\d,]*)/i.exec(m);
    if(x)return {type:"maxtok",max:num(x[2]||x[1])};}
  if(code===413||/prompt is too long|too many (?:input )?tokens|maximum context length|context (?:length|window|limit)|request_too_large|input is too long|exceeds? the (?:model'?s? )?(?:maximum|context|token)|too large for the model/i.test(m)){
    var lim=0,act=0;
    if((x=/(\d[\d,]*)\s*tokens?\s*>\s*(\d[\d,]*)/i.exec(m))){act=num(x[1]);lim=num(x[2]);}
    else if((x=/maximum context length is (\d[\d,]*)[\s\S]*?(\d[\d,]*)\s*tokens/i.exec(m))){lim=num(x[1]);act=num(x[2]);}
    return {type:"long",limit:lim,actual:act};}
  return null;}
W.ingLimitKind=kind;   /* for the tests */
function plain(e,k){var raw=String(e&&e.message||e||"").replace(/[.\s]+$/,""),who=provName(),m=modelName(),t;
  if(k.type==="rate")t=k.daily?who+" has reached the daily limit set for your API key. It opens again tomorrow, or a higher limit can be set on "+who+"'s own website":
    who+" refused because your API key reached its limit of tokens a minute, and Ingenium waited and tried twice. Wait a minute and send again; a new conversation sends less each time";
  else if(k.type==="busy")t=who+" is very busy at the moment, and Ingenium tried twice. Send again in a minute";
  else t="This conversation is longer than "+m+" can read at once, even with its oldest part left out. A new conversation, or asking for a summary to carry over, fixes it";
  var x=new Error(t+" (its words: "+raw.replace(/^HTTP /,"")+")");x.r206=1;return x;}

/* ---------- 4. the waits, said on the reply's status line ---------- */
function say(text){try{if(typeof liveBot!=="undefined"&&liveBot){liveBot.status=text;if(typeof renderChatLive==="function")renderChatLive(liveBot);}}catch(e){}}
function note(text){try{if(typeof liveBot!=="undefined"&&liveBot&&text&&String(liveBot.note||"").indexOf(text)<0)liveBot.note=(liveBot.note?liveBot.note+" ":"")+text;}catch(e){}}
W.ingLimitWaitScale=1;   /* the tests make the waits short */
function wait(secs,why,ab){return new Promise(function(res,rej){var left=Math.max(1,Math.round(secs)),scale=+W.ingLimitWaitScale||1;
  function tick(){if(ab&&ab.aborted){rej(new Error("Stopped."));return;}
    if(left<=0){say("Sending again…");res();return;}
    say(why+" Trying again in "+left+" second"+(left===1?"":"s")+". Stop ends the wait.");left--;setTimeout(tick,1000*scale);}
  tick();});}

/* ---------- 5. cloudChat, kept within the model's limits ---------- */
if(typeof W.cloudChat==="function"){var ORIG=W.cloudChat;
  W.cloudChat=wrap(ORIG,function(messages,onToken,onThink,ab){var self=this,args=arguments,begun=false,tries=0,waits=0,msgs=keepMark(messages,(messages||[]).slice()),told="";
    var w=win();
    /* 6.9.5: Lector and the Career Studio (lxAsk, which marks its request with LX.cloudAb) read in parts they size themselves: their
       text is never cut here; a refusal for size goes back to them as a context error, and they read again in smaller parts */
    var parts=false;try{parts=!!(ab&&typeof LX!=="undefined"&&LX&&LX.cloudAb===ab);}catch(e){}
    function tell(r,why){if(r.dropped||r.cut){var t=r.dropped?("The oldest "+r.dropped+" message"+(r.dropped===1?" was":"s were")+" left out of what "+modelName()+" read for this reply"+why+"."):("Part of a long message was left out of what "+modelName()+" read for this reply"+why+".");
        if(r.dropped&&r.cut)t=t.replace(/\.$/," (and part of a long message).");told=t;}}
    /* before the first send: a request built elsewhere (Lector, the studio, a summary) fitted to the window as well */
    try{if(w>0&&!parts){var room=(w-reserveFor(w)-1024)*cpt();if(chars(msgs)>room){var r0=fit(msgs,Math.floor(room),"to fit the model's memory");msgs=r0.msgs;tell(r0,", to fit its memory");}}}catch(e){}
    var oT=function(t){if(!begun){begun=true;if(told)note(told);}return onToken?onToken.apply(this,arguments):undefined;};
    var oK=function(t){begun=true;return onThink?onThink.apply(this,arguments):undefined;};
    function go(){NOW.inTok=estTok(msgs);
      var a=[msgs,oT,oK,ab];for(var i=4;i<args.length;i++)a.push(args[i]);
      var p;try{p=Promise.resolve(ORIG.apply(self,a));}catch(e){p=Promise.reject(e);}
      return p.then(function(r){NOW.inTok=0;NOW.capOnce=0;if(told&&!begun)note(told);return r;},function(e){NOW.inTok=0;NOW.capOnce=0;return handle(e);});}
    function handle(e){var k=kind(e);
      if(!k||begun||(ab&&ab.aborted))throw e;
      if(++tries>4)throw plain(e,k);
      var inf=info();
      if(k.type==="rate"&&k.perMin>0&&inf&&(!(+inf.perMin>0)||+inf.perMin!==k.perMin)){inf.perMin=k.perMin;try{saveState();}catch(_){}}
      if(parts){var raw=String(e&&e.message||e||"").replace(/^HTTP /,"");
        if(k.type==="long"||k.type==="sum"){if(k.type==="sum"&&k.input>0)learnCpt(chars(msgs),k.input);if(k.type==="long"&&k.actual>0)learnCpt(chars(msgs),k.actual);
          if(k.type==="long"&&inf&&k.limit>0&&(!(+inf.ctx>0)||+inf.ctx>k.limit)){inf.ctx=k.limit;try{saveState();}catch(_){}}
          if(k.type==="sum"&&k.win-k.input>=6144){NOW.capOnce=k.win-k.input-2048;return go();}
          throw new Error("the part is too long for the model's context ("+raw+")");}
        if(k.type==="rate"&&k.perMin>0&&estTok(msgs)>k.perMin*0.9)throw new Error("the part is too long for the context your API key allows each minute ("+raw+")");}
      if(k.type==="sum"){learnCpt(chars(msgs),k.input);
        if(inf&&k.win>0&&(!(+inf.ctx>0)||+inf.ctx>k.win)){inf.ctx=k.win;try{saveState();}catch(_){}}
        if(k.win-k.input>=6144){NOW.capOnce=k.win-k.input-2048;return goKeep();}
        var r1=fit(msgs,Math.floor(chars(msgs)*Math.max(0.3,(k.win-reserveFor(k.win)-2048)/Math.max(1,k.input))),"to fit the model's memory");
        if(!r1.dropped&&!r1.cut)throw plain(e,{type:"long"});msgs=r1.msgs;tell(r1,", to fit its memory");return goKeep();}
      if(k.type==="maxtok"){if(inf&&k.max>0&&(!(+inf.out>0)||+inf.out>k.max)){inf.out=k.max;try{saveState();}catch(_){}}
        NOW.capOnce=k.max>0?k.max:4096;return goKeep();}
      if(k.type==="long"){if(k.actual>0)learnCpt(chars(msgs),k.actual);
        if(inf&&k.limit>0&&(!(+inf.ctx>0)||+inf.ctx>k.limit)){inf.ctx=k.limit;try{saveState();}catch(_){}}
        var ratio=(k.limit>0&&k.actual>k.limit)?(k.limit/k.actual)*0.85:0.6;
        var r2=fit(msgs,Math.floor(chars(msgs)*ratio),"to fit the model's memory");
        if(!r2.dropped&&!r2.cut)throw plain(e,k);msgs=r2.msgs;tell(r2,", to fit its memory");return goKeep();}
      if(k.type==="rate"){if(k.daily||waits>=2)throw plain(e,k);waits++;
        if(k.perMin>0&&estTok(msgs)>k.perMin*0.9){var r3=fit(msgs,Math.floor(k.perMin*0.75*cpt()),"to stay within your key's tokens a minute");msgs=r3.msgs;tell(r3,", to stay within your API key's limit of tokens a minute");}
        return wait(k.after||60,provName()+" asked Ingenium to slow down: your API key reached its limit of tokens a minute.",ab).then(go);}
      if(k.type==="busy"){if(waits>=2)throw plain(e,k);waits++;
        return wait(waits===1?8:20,provName()+" is busy at the moment.",ab).then(go);}
      throw e;}
    function goKeep(){say("Fitting the conversation to "+modelName()+"'s limits and sending again…");return go();}
    return go();});
  W.cloudChat.__r206=1;}
})();
;try{window.__ingParts["p206"]="running";}catch(_){}
</script>
