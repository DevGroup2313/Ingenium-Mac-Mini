<style id="r245-css">
/* ============ R245 · CONTEXT AND COMPACTING, SLASH COMMANDS, CONNECTORS IN CODE'S + MENU (Ingenium 6.47, 7 November 2026) ============
   Her words (6 November 2026): "I want for Ingenium's sessions to be automatically compacted like they are on Claude's code chats, the same
   for the regular chats. I want the option to have it compacted automatically or to click and compact it myself if I choose to. Please add
   that function to Ingenium. I also want the option to add connectors and slash commands in the coding chats in Ingenium. I want full parity
   with Claude's chat pages for Ingenium's chat pages please."
   Measured on 6.46 before this part:
   - a conversation longer than the model's memory lost its oldest messages quietly at each send (the window moved on, and once twenty
     messages had gone a summary of 250 words was written in the background and recalled with the newest message); nothing showed it,
     nothing could be pressed to do it, and it could not be turned off;
   - the memory key beside the message box opened Controls; Code's session column showed the share used and nothing to do about it;
   - typing "/" did nothing, except in a Code session on a GitHub repository (six commands of its own, r219);
   - Code's + menu had no Slash commands, and its Connectors key stood eleventh in the list.
   Now:
   - Context, from the memory key, /context and Code's session column: how much of the model's memory the conversation fills, part by
     part (the instructions, the summary of its earlier part, the conversation, files, the room kept for the reply), when it compacts by
     itself, Automatic on or off, and Compact now, with what to keep in focus;
   - compacting: the model in use writes a summary of everything before the newest messages (in rounds when that part is longer than it
     can read at once), and the summary takes that part's place for the model. Every message stays on the page; a line marks where it
     was compacted, with the summary to read. Automatic (on unless she turns it off) compacts before a message is sent when the
     conversation would fill more than 85 percent of the model's memory;
   - slash commands in Chat and Code: "/" in the message box opens the list (arrows, Enter or Tab, Escape); a command and what follows
     it run when sent; the + menu has Slash commands; a Code session on a GitHub repository adds its six to the same list;
   - Code's + menu opens with Add files or photos, Slash commands and Add connectors. */
.cmp-pop{position:fixed;z-index:400;width:min(390px,calc(100vw - 16px));max-height:min(580px,80vh);overflow:auto;padding:12px 14px 12px;
  background:var(--card-hi);border:1px solid var(--glass-border,var(--hairline));border-radius:14px;box-shadow:0 14px 36px rgba(40,20,70,.2)}
.cmp-pop[hidden]{display:none}
.cmp-h{display:flex;align-items:center;gap:8px;margin:0 0 8px}
.cmp-h b{font-size:14.5px;color:var(--ink-1)}
.cmp-h .cmp-x{margin-left:auto;border:0;background:transparent;font-size:18px;line-height:1;cursor:pointer;color:var(--ink-3);padding:2px 6px;border-radius:7px}
.cmp-h .cmp-x:hover{background:var(--accent-softer);color:var(--ink-1)}
.cmp-bar{display:flex;height:9px;border-radius:999px;background:rgba(var(--accent-line-rgb),.12);overflow:hidden;margin:2px 0 6px}
.cmp-bar i{display:block;height:100%;min-width:0}
.cmp-bar .k-sys,.cmp-row .k-sys{background:rgba(var(--accent-line-rgb),.38)}
.cmp-bar .k-earlier,.cmp-row .k-earlier{background:rgba(201,161,74,.85)}
.cmp-bar .k-msgs,.cmp-row .k-msgs{background:var(--accent)}
.cmp-bar .k-files,.cmp-row .k-files{background:var(--ok,#2f7a55)}
.cmp-bar .k-reply,.cmp-row .k-reply{background:repeating-linear-gradient(45deg,rgba(var(--accent-line-rgb),.32) 0 3px,transparent 3px 6px)}
.cmp-sum{font-size:12.5px;color:var(--ink-2);margin:0 0 8px;line-height:1.45}
.cmp-sum b{color:var(--ink-1)}
.cmp-row{display:flex;align-items:center;gap:8px;font-size:12.5px;padding:2px 0;color:var(--ink-2)}
.cmp-row .sw{width:10px;height:10px;border-radius:3px;flex:0 0 auto}
.cmp-row .v{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--ink-1);font-weight:600}
.cmp-row .s{font-size:11px;color:var(--ink-3)}
.cmp-auto{display:flex;align-items:center;gap:10px;margin:10px 0 6px;padding-top:10px;border-top:.5px solid var(--hairline);font-size:12.5px;color:var(--ink-2);line-height:1.4}
.cmp-auto .t{flex:1 1 auto}
.cmp-go{display:flex;gap:6px;margin:8px 0 2px;flex-wrap:wrap}
.cmp-go input{flex:1 1 160px;min-width:0;font-size:12.5px !important;padding:6px 9px !important;min-height:32px}
.cmp-note{font-size:12px;color:var(--ink-3);margin:6px 0 0;line-height:1.45}
.cmp-note.warn{color:var(--warn,#a35a00)}
.cmp-last{font-size:12px;color:var(--ink-3);margin-top:8px;line-height:1.45}
.cmp-last button{border:0;background:none;color:var(--accent);font-weight:700;cursor:pointer;padding:0;font-size:12px}
.cmp-foot{display:flex;gap:10px;margin-top:10px;font-size:12px}
.cmp-foot button{border:0;background:none;color:var(--accent);font-weight:700;cursor:pointer;padding:0}
/* the line in the conversation where it was compacted */
#chatScroll .cmp-div{margin:16px 4px;color:var(--ink-3);font-size:12px}
#chatScroll .cmp-div .cmp-line{display:flex;align-items:center;gap:10px}
#chatScroll .cmp-div .cmp-line::before,#chatScroll .cmp-div .cmp-line::after{content:"";flex:1 1 auto;border-top:1px dashed rgba(var(--accent-line-rgb),.5)}
#chatScroll .cmp-div summary{cursor:pointer;list-style:none;text-align:center;color:var(--accent);font-weight:700;margin-top:4px}
#chatScroll .cmp-div summary::-webkit-details-marker{display:none}
#chatScroll .cmp-div .cmp-text{white-space:pre-wrap;margin:8px auto 0;max-width:640px;padding:10px 12px;border-radius:10px;background:var(--accent-softer);color:var(--ink-2);font-size:12.5px;line-height:1.5}
#chatScroll .cmp-working{display:flex;align-items:center;gap:10px;justify-content:center;margin:12px 0;color:var(--ink-2);font-size:12.5px}
#chatScroll .cmp-working i{width:8px;height:8px;border-radius:50%;background:var(--accent);animation:cmpPulse 1s ease-in-out infinite}
@keyframes cmpPulse{0%,100%{opacity:.25}50%{opacity:1}}
@media (prefers-reduced-motion: reduce){#chatScroll .cmp-working i{animation:none}}
/* Code's session column */
#ccPanel .cmp-keys{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:8px}
#ccPanel .cmp-keys .btn{font-size:12px;padding:4px 10px;min-height:28px}
#ccPanel .cmp-keys label{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--ink-2)}
/* the slash commands' list */
.sl-menu{position:fixed;z-index:420;width:min(440px,calc(100vw - 16px));max-height:min(360px,55vh);overflow:auto;padding:6px;background:var(--card-hi);
  border:1px solid var(--glass-border,var(--hairline));border-radius:12px;box-shadow:0 12px 30px rgba(40,20,70,.18)}
.sl-menu[hidden]{display:none}
.sl-cap{font:800 10.5px/1 var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--ink-3);padding:6px 8px 4px}
.sl-item{display:flex;align-items:baseline;gap:10px;width:100%;text-align:left;padding:6px 8px;border-radius:8px;border:1px solid transparent;background:transparent;cursor:pointer;color:var(--ink-1)}
.sl-item b{font:700 12.5px/1.3 var(--mono,ui-monospace,monospace);white-space:nowrap}
.sl-item i{font-style:normal;font-size:11px;color:var(--ink-3);white-space:nowrap}
.sl-item span{font-size:12px;color:var(--ink-2);line-height:1.35}
.sl-item[aria-selected="true"],.sl-item:hover{background:var(--accent-softer);border-color:rgba(var(--accent-line-rgb),.35)}
.sl-help dl{display:grid;grid-template-columns:auto 1fr;gap:6px 12px;margin:8px 0 0;font-size:12.5px}
.sl-help dt{font-family:var(--mono,ui-monospace,monospace);font-weight:700;color:var(--ink-1);white-space:nowrap}
.sl-help dd{margin:0;color:var(--ink-2)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p245"]="started";}catch(_){}
(function(){"use strict";
if(window.IngCompact)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function btn(c,t,fn,title){var b=mk("button",c,t);b.type="button";if(title)b.title=title;b.addEventListener("click",function(e){e.stopPropagation();fn(e,b);});return b;}
function toast(t){try{ingToast(t);}catch(e){}}
function warn(e){try{console.warn("Ingenium compact:",e);}catch(_){}}
function cur(){try{return curChat();}catch(e){return null;}}
function isCloud(){try{return chatSource()==="cloud"&&!!(state.cloud&&state.cloud.on&&state.cloud.provider);}catch(e){return false;}}
function cpt(){return isCloud()?2.5:3;}
function win(){try{if(W.IngMem&&IngMem.window){var w=+IngMem.window();if(w>0)return w;}}catch(e){}try{return +$("ctlCtx").value||8192;}catch(e){return 8192;}}
function allOf(c){return ((c&&c.messages)||[]).filter(function(x){return !x.preview&&!x.live&&(x.text||x.attach||x.attachRef||x.cid||x.seen);});}
function archived(c){return ((c&&c.earlier)||[]).reduce(function(a,x){return a+(+x.n||0);},0);}
function startOf(all){for(var i=all.length-1;i>=0;i--)if(all[i].winStart)return i;return 0;}
function autoOn(){try{return state.compactAuto!==false;}catch(e){return true;}}
var THR=0.85;
function N(n){return Math.round(n||0).toLocaleString();}
function code(){return D.body.getAttribute("data-chatmode")==="code";}
function live(){try{return typeof liveBot!=="undefined"&&!!liveBot;}catch(e){return false;}}
function localReady(){try{return Engine.status==="ready"&&!!Engine.modelId&&!!Engine.adapter;}catch(e){return false;}}
function canAsk(){return isCloud()||localReady();}

/* ---------- 1. what fills the model's memory, part by part ---------- */
function msgChars(x){return String(x.text||"").length+12;}
function fileChars(x){return (x.attach?String(x.attach).length:0)+(+x.attachChars||0);}
function parts(){var c=cur(),all=allOf(c),st=startOf(all),w=win(),r=cpt();
  var sys=0;try{sys=String(chatSystemPrompt(chatBudget())||"").length;}catch(e){}
  var m=0,f=0;all.slice(st).forEach(function(x){m+=msgChars(x);f+=fileChars(x);});
  var old=archived(c)+st,e=0;
  if(old>0){var tg=16000;try{tg=W.IngMem&&IngMem.target?+IngMem.target(chatBudget())||16000:16000;}catch(_){}
    e=Math.min(tg,Math.max(String((c&&c.summary)||"").length+900,Math.floor(tg*0.5)));}
  var rep=4096;try{rep=replyTokens();}catch(_){}rep=Math.min(rep,Math.floor(w*0.2));
  var P={sys:Math.ceil(sys/r),earlier:Math.ceil(e/r),msgs:Math.ceil(m/r),files:Math.ceil(f/r),reply:rep,win:w,n:all.length-st,old:old};
  P.used=P.sys+P.earlier+P.msgs+P.files;P.total=P.used+P.reply;P.pc=Math.min(100,Math.round(P.total*100/Math.max(1,w)));return P;}
function measured(){try{var u=W.IngMem&&IngMem.use&&IngMem.use.last,c=cur();if(u&&c&&u.chat===c.id)return u;}catch(e){}return null;}

/* ---------- 2. compacting ---------- */
var BUSY=false,ABORT=null;
var SYS="You compact a long conversation for the assistant that will go on with it, so that nothing it needs is lost. Write a summary in plain English: what was asked and why; what was decided, made or changed (files, code and documents, by name); facts, names, figures and dates as they were given; what is still open, and the next step; and anything the person asked to remember or to keep in mind. Use short paragraphs or lists. Add nothing the conversation does not say. Write only the summary.";
function lineOf(x,cap){var t=String(x.text||"").replace(/\s+\n/g,"\n").trim();cap=cap||4000;if(t.length>cap)t=t.slice(0,Math.floor(cap*0.62))+" […] "+t.slice(t.length-Math.floor(cap*0.35));
  if(x.files&&x.files.length)t+=" [files: "+x.files.map(function(f){return f.name;}).join(", ")+"]";
  if(x.edits&&x.edits.length){var seen={},fs=[];x.edits.forEach(function(e){if(e&&e.file&&!seen[e.file]){seen[e.file]=1;fs.push(e.file);}});if(fs.length)t+=" [changed: "+fs.join(", ")+"]";}
  return "["+(x.role==="me"?"Them":"Assistant")+"] "+t;}
function words(){return Math.max(250,Math.min(1500,Math.floor(win()*0.03)));}
function clean(t){t=String(t||"").replace(/<think>[\s\S]*?<\/think>/gi,"").replace(/^[\s\S]*<\/think>/i,"").replace(/^\s*(?:updated |running )?summary\s*:?\s*\n/i,"").trim();return t;}
function ask(msgs,maxTok){
  if(isCloud()){var keep=state.thinking,ab=netAbortable(),out="";W._cloudAb=ab;ABORT=ab;state.thinking=false;
    return Promise.resolve().then(function(){return typeof ensureCloudModel==="function"?ensureCloudModel():null;})
      .then(function(){return cloudChat(msgs,function(t){out+=t;},function(){},ab);})
      .then(function(){state.thinking=keep;if(W._cloudAb===ab)W._cloudAb=null;ABORT=null;if(ab.aborted)throw new Error("stopped");return out;},
        function(e){state.thinking=keep;if(W._cloudAb===ab)W._cloudAb=null;ABORT=null;throw e;});}
  var out="",params={temperature:0.3,top_p:0.9};
  try{var m=state.models.filter(function(x){return x.id===Engine.modelId;})[0];if(m&&typeof modelSampling==="function"){var b=modelSampling(m,2,false);if(b)params=Object.assign({},b);}}catch(e){}
  params=Object.assign(params,{max_tokens:maxTok||1200,thinking:false});ABORT={abort:function(){try{Engine.adapter.abort();}catch(e){}this.aborted=true;}};var ab2=ABORT;
  Engine.setStatus("busy");
  return Promise.resolve(Engine.generate({messages:msgs,params:params,onToken:function(t){out+=t;},onThink:function(){}})).then(function(res){if(Engine.status==="busy")Engine.setStatus("ready");ABORT=null;if(ab2.aborted)throw new Error("stopped");return out||(res&&res.text)||"";},
    function(e){if(Engine.status==="busy")Engine.setStatus("ready");ABORT=null;throw e;});}
/* the part to summarise, in rounds that fit the model's memory beside the summary so far */
function rounds(prev,fresh){var room=Math.max(3000,Math.min(400000,Math.floor((win()*cpt()-String(prev||"").length-4000)*0.55))),cap=4000,chunks;
  for(var k=0;k<4;k++){chunks=[];var c=[],len=0;fresh.forEach(function(x){var l=lineOf(x,cap);if(len+l.length>room&&c.length){chunks.push(c);c=[];len=0;}c.push(l);len+=l.length+1;});if(c.length)chunks.push(c);
    if(chunks.length<=16)break;cap=Math.max(600,Math.floor(cap/2));}
  return chunks;}
function summarise(prev,fresh,focus,say){var ch=rounds(prev,fresh),wd=words(),p=Promise.resolve(String(prev||""));
  ch.forEach(function(lines,i){p=p.then(function(s){if(say)say(ch.length>1?"the model is writing the summary, part "+(i+1)+" of "+ch.length:"the model is writing the summary");
    var u=(s?"The summary of the conversation so far:\n"+s+"\n\n":"")+"The next part of the conversation, in order:\n"+lines.join("\n")+"\n\n"+(focus?"Keep in focus above all: "+focus+"\n\n":"")+"Write the "+(s?"updated ":"")+"summary, at most "+wd+" words.";
    return ask([{role:"system",content:SYS},{role:"user",content:u}],Math.round(wd*1.7)+200).then(function(t){t=clean(t);if(t.length<40)throw new Error("the summary came back empty");return t;});});});
  return p;}
function loadOld(c){try{if(c&&c.earlier&&c.earlier.length&&!c.__old&&W.IngR103&&IngR103.loadOld)return IngR103.loadOld(c).then(function(){return c.__old||[];});}catch(e){}return Promise.resolve((c&&c.__old)||[]);}
/* the newest messages stay as they are: a quarter of the memory at most, the last exchange at least, twelve at most */
function keepFrom(all){var w=win(),r=cpt(),t=0,k=0;for(var i=all.length-1;i>=0;i--){var add=(msgChars(all[i])+fileChars(all[i]))/r;if(k>=2&&(t+add>w*0.25||k>=12))break;t+=add;k++;}
  var cut=all.length-k;while(cut>0&&cut<all.length&&all[cut].role!=="me")cut++;if(cut>=all.length)cut=all.length-Math.min(2,all.length);return Math.max(0,cut);}
function waitFree(ms){var t0=Date.now();return new Promise(function(res){(function go(){var s=W.IngMem&&IngMem.state;if((!s||!s.busy)&&!(Engine.status==="busy"&&!isCloud())||Date.now()-t0>ms)return res();setTimeout(go,300);})();});}
function compact(opts){opts=opts||{};var c=cur();
  if(BUSY)return Promise.reject(new Error("It is compacting already."));
  if(!c)return Promise.reject(new Error("No conversation is open."));
  if(!opts.auto&&live())return Promise.reject(new Error("Wait for the reply to finish, then compact."));
  if(!canAsk())return Promise.reject(new Error(isCloud()?"The connection is not ready.":"Compacting needs the model on this device loaded: open Controls and press Load, or choose a connection."));
  BUSY=true;var row=null,stopSay=function(){};
  function say(t){try{if(!row){var sc=$("chatScroll");if(!sc)return;row=mk("div","cmp-working");row.appendChild(mk("i"));row.appendChild(mk("span"));sc.appendChild(row);sc.scrollTop=sc.scrollHeight;}row.lastChild.textContent="Compacting the conversation"+(opts.auto?" to make room":"")+": "+t+"…";}catch(e){}}
  say("getting ready");paintAll();
  return waitFree(30000).then(function(){return loadOld(c);}).then(function(old){
      var all=allOf(c),cut=keepFrom(all);if(opts.except){var ix=all.indexOf(opts.except);if(ix>=0&&cut>ix)cut=ix;}
      if(cut<=0&&!old.length)throw new Error("There is nothing to compact yet: the conversation is short.");
      if(cut<=0)cut=Math.min(1,all.length-1);
      var before=old.concat(all.slice(0,cut)),done=Math.min(+c.summaryN||0,before.length),prev=done>0?String(c.summary||""):"",fresh=before.slice(done);
      var p0=parts();
      if(!fresh.length&&prev&&!opts.focus){fresh=before.slice(Math.max(0,before.length-1));}
      return summarise(fresh.length?prev:"",fresh.length?fresh:before,opts.focus||"",say).then(function(sum){
        if(c!==cur()&&!opts.auto){/* she moved to another conversation: the summary is still that conversation's */}
        c.summary=sum;c.summaryN=before.length;c.summaryAt=Date.now();
        allOf(c).forEach(function(x){delete x.winStart;delete x.compactStart;});
        var b=all[cut];if(b){b.winStart=true;b.compactStart=Date.now();}
        var p1=parts();
        var rec={at:Date.now(),n:before.length,before:p0.used,after:p1.used,auto:!!opts.auto,focus:opts.focus||""};(c.compacts=c.compacts||[]).push(rec);if(c.compacts.length>20)c.compacts.splice(0,c.compacts.length-20);
        try{saveState();}catch(e){}return rec;});})
    .then(function(rec){BUSY=false;if(row)row.remove();try{renderChat();}catch(e){}paintAll();
        toast((rec.auto?"Compacted to make room: ":"Compacted: ")+rec.n+" earlier message"+(rec.n===1?" is":"s are")+" now a summary (about "+N(rec.before)+" tokens down to "+N(rec.after)+").");return rec;},
      function(e){BUSY=false;if(row)row.remove();paintAll();throw e;});}
function compactNow(focus){return compact({focus:focus||""}).catch(function(e){if(!/stopped/.test(String(e&&e.message)))toast(String(e&&e.message||e));});}
/* before a message is sent: compacted first when the conversation would fill more than 85 percent of the model's memory */
function wantAuto(){if(!autoOn()||BUSY||!canAsk())return false;var P=parts();return P.total>P.win*THR&&P.n>4;}

/* ---------- 3. the line in the conversation where it was compacted ---------- */
function divider(){try{var sc=$("chatScroll"),c=cur();if(!sc||!c)return;var ms=(c.messages||[]),b=null;for(var i=0;i<ms.length;i++)if(ms[i].compactStart){b=ms[i];break;}
    var old=sc.querySelector(".cmp-div");if(old)old.remove();if(!b||typeof chatNodeOf==="undefined"||!chatNodeOf)return;var nd=chatNodeOf.get(b);if(!nd||nd.parentNode!==sc)return;
    var rec=(c.compacts||[]).slice(-1)[0]||{},d=mk("div","cmp-div");d.setAttribute("role","note");
    d.appendChild(mk("div","cmp-line",(rec.auto?"Compacted automatically":"Compacted")+(rec.n?" · "+rec.n+" earlier message"+(rec.n===1?"":"s")+" summarised":"")+(rec.before?" · about "+N(rec.before)+" → "+N(rec.after)+" tokens":"")));
    var det=mk("details");det.appendChild(mk("summary",null,"Show the summary the model reads in their place"));det.appendChild(mk("div","cmp-text",String(c.summary||"")));d.appendChild(det);
    sc.insertBefore(d,nd);}catch(e){warn(e);}}

/* ---------- 4. Context: the panel ---------- */
var POP=null,FOCUS="";
function bar(P){var b=mk("div","cmp-bar");b.setAttribute("role","img");b.setAttribute("aria-label",P.pc+" percent of the model's memory");
  [["sys",P.sys],["earlier",P.earlier],["msgs",P.msgs],["files",P.files],["reply",P.reply]].forEach(function(x){if(!(x[1]>0))return;var i=mk("i","k-"+x[0]);i.style.width=Math.min(100,x[1]*100/Math.max(1,P.win))+"%";b.appendChild(i);});return b;}
function prow(k,name,v,sub){var r=mk("div","cmp-row");r.appendChild(mk("span","sw k-"+k));var t=mk("span",null,name);r.appendChild(t);if(sub)r.appendChild(mk("span","s",sub));r.appendChild(mk("span","v",N(v)));return r;}
function fill(box,compactView){box.innerHTML="";var P=parts(),c=cur(),cl=isCloud();
  var h=mk("div","cmp-h");h.appendChild(mk("b",null,"Context"));if(!compactView)h.appendChild(btn("cmp-x","×",function(){closePop();},"Close"));box.appendChild(h);
  var s=mk("p","cmp-sum");s.appendChild(mk("b",null,P.pc+"%"));s.appendChild(D.createTextNode(" of the model's memory: about "+N(P.total)+" of "+N(P.win)+" tokens"+(P.old?", with "+N(P.old)+" earlier message"+(P.old===1?"":"s")+" in a summary":"")+"."));box.appendChild(s);
  box.appendChild(bar(P));
  box.appendChild(prow("sys","Instructions",P.sys));
  if(P.earlier)box.appendChild(prow("earlier","The earlier part, summarised",P.earlier));
  box.appendChild(prow("msgs","The conversation",P.msgs,P.n+" message"+(P.n===1?"":"s")));
  if(P.files)box.appendChild(prow("files","Files and documents",P.files));
  box.appendChild(prow("reply","Room kept for the reply",P.reply));
  var u=measured();if(u)box.appendChild(mk("p","cmp-note","The last reply: the model read "+N(u.inTok)+" tokens and wrote "+N(u.outTok)+" ("+(u.how||"its own count")+")."));
  var left=Math.max(0,Math.round(THR*100-P.pc));
  var a=mk("div","cmp-auto");var t=mk("span","t",autoOn()?(left>0?"Compacts by itself at "+Math.round(THR*100)+"%: "+left+"% left.":"Compacts by itself before the next message is sent."):"Compacting by itself is off: the oldest messages leave the model's memory as it fills, as before.");a.appendChild(t);
  var sw=mk("label","eswitch");sw.title="Compact by itself";var cb=mk("input");cb.type="checkbox";cb.checked=autoOn();cb.setAttribute("aria-label","Compact by itself");cb.addEventListener("change",function(){state.compactAuto=!!cb.checked;try{saveState();}catch(e){}paintAll();});
  sw.appendChild(cb);sw.appendChild(mk("span","etrack"));a.appendChild(mk("span",null,"Automatic"));a.appendChild(sw);box.appendChild(a);
  var go=mk("div","cmp-go");var fi=mk("input");fi.type="text";fi.placeholder="What to keep in focus (optional)";fi.value=FOCUS;fi.setAttribute("aria-label","What to keep in focus");fi.oninput=function(){FOCUS=fi.value;};
  fi.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();run();}});
  var gb=btn("btn small primary",BUSY?"Compacting…":"Compact now",function(){run();},"A summary takes the place of the conversation's earlier part, for the model");gb.disabled=BUSY||!canAsk();gb.id=compactView?"":"cmpGo";
  function run(){var f=FOCUS;FOCUS="";if(!compactView)closePop();compactNow(f);}
  go.appendChild(fi);go.appendChild(gb);box.appendChild(go);
  if(!canAsk())box.appendChild(mk("p","cmp-note warn",cl?"The connection is not ready.":"Compacting needs the model on this device loaded (Controls, Load), or a connection."));
  var last=(c&&c.compacts||[]).slice(-1)[0];
  if(last){var l=mk("div","cmp-last");l.appendChild(D.createTextNode("Last compacted "+when(last.at)+(last.auto?", by itself":", by you")+": "+last.n+" message"+(last.n===1?"":"s")+", about "+N(last.before)+" → "+N(last.after)+" tokens"+(last.focus?", keeping in focus: "+last.focus:"")+". "));
    l.appendChild(btn("","Show the summary",function(){closePop();var d=D.querySelector("#chatScroll .cmp-div details");if(d){d.open=true;try{d.scrollIntoView({block:"center",behavior:"smooth"});}catch(e){}}}));box.appendChild(l);}
  if(!compactView){var ft=mk("div","cmp-foot");ft.appendChild(btn("","Memory and reply length: Controls",function(){closePop();try{var k=$("chatCtlBtn");if(k&&k.getAttribute("aria-expanded")!=="true")k.click();}catch(e){}}));box.appendChild(ft);}}
function when(t){try{var d=new Date(t),n=new Date();return (d.toDateString()===n.toDateString()?"today":d.toLocaleDateString())+" at "+d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});}catch(e){return "";}}
function anchor(){return $("ingMemPill")||$("chatModelBtn")||$("chatInput");}
function openPop(){if(!POP){POP=mk("div","cmp-pop");POP.id="cmpPop";POP.setAttribute("role","dialog");POP.setAttribute("aria-label","Context");POP.hidden=true;D.body.appendChild(POP);
    D.addEventListener("click",function(e){if(!POP||POP.hidden)return;var t=e.target;if(t&&t.closest&&(t.closest("#cmpPop")||t.closest("#ingMemPill")))return;closePop();},true);
    D.addEventListener("keydown",function(e){if(e.key==="Escape"&&POP&&!POP.hidden){closePop();try{anchor().focus();}catch(_){}}});
    W.addEventListener("resize",function(){if(POP&&!POP.hidden)place();});}
  fill(POP,false);POP.hidden=false;place();var f=POP.querySelector(".cmp-go input");if(f)try{f.focus({preventScroll:true});}catch(e){}}
function place(){var a=anchor();if(!a||!POP)return;var r=a.getBoundingClientRect(),w=POP.offsetWidth||380,h=POP.offsetHeight||420;
  var top=r.top-h-8;if(top<8)top=Math.min(W.innerHeight-h-8,r.bottom+8);POP.style.top=Math.round(Math.max(8,top))+"px";POP.style.left=Math.round(Math.max(8,Math.min(W.innerWidth-w-8,r.right-w)))+"px";}
function closePop(){if(POP)POP.hidden=true;}
function togglePop(){if(POP&&!POP.hidden)closePop();else openPop();}
/* Code's session column: Compact now and Automatic beside its Context bar */
function panelKeys(){var h=$("ccPanel");if(!h)return;var sec=h.querySelector('section[data-sec="context"]');if(!sec||sec.querySelector(".cmp-keys"))return;
  var inner=sec.querySelector(".ccp-in")||sec;var k=mk("div","cmp-keys");
  var go=btn("btn small",BUSY?"Compacting…":"Compact now",function(){compactNow("");},"A summary takes the place of the session's earlier part, for the model");go.disabled=BUSY||!canAsk();k.appendChild(go);
  var lab=mk("label");var cb=mk("input");cb.type="checkbox";cb.checked=autoOn();cb.addEventListener("change",function(){state.compactAuto=!!cb.checked;try{saveState();}catch(e){}paintAll();});lab.appendChild(cb);lab.appendChild(D.createTextNode("Automatic"));k.appendChild(lab);
  k.appendChild(btn("btn small ghost","Details",function(){openPop();}));inner.appendChild(k);}
function watchPanel(){var h=$("ccPanel");if(!h||h.__cmp)return;h.__cmp=1;try{new MutationObserver(function(){panelKeys();}).observe(h,{childList:true,subtree:true});}catch(e){}panelKeys();}
function paintAll(){try{if(POP&&!POP.hidden)fill(POP,false);}catch(e){}try{var h=$("ccPanel"),k=h&&h.querySelector(".cmp-keys");if(k){k.remove();panelKeys();}}catch(e){}}

/* ---------- 5. slash commands ---------- */
function setInput(v){var i=$("chatInput");if(!i)return;i.value=v;try{i.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}try{i.focus();i.setSelectionRange(v.length,v.length);}catch(e){}}
function sendText(t){var i=$("chatInput");if(!i)return;i.value=t;try{i.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}try{ORIG_SEND.call(W);}catch(e){warn(e);}}
function keyOf(id){var k=$(id);if(k)k.click();return !!k;}
var EFF={low:1,medium:2,high:3,extra:4,max:5};
function setEffort(a){a=String(a||"").trim().toLowerCase();var n=EFF[a]||+a;var sel=$("ctlEffort");
  if(!(n>=1&&n<=5)||!sel){toast("Effort: low, medium, high, extra or max. Example: /effort extra");return;}
  sel.value=String(n);try{sel.dispatchEvent(new Event("input",{bubbles:true}));sel.dispatchEvent(new Event("change",{bubbles:true}));}catch(e){}
  toast("Effort: "+["","Low","Medium","High","Extra","Max"][n]+".");}
function setThink(a){a=String(a||"").trim().toLowerCase().replace(/\s+/g," ");
  if(a==="on"||a==="off"){state.thinking=a==="on";try{saveState();}catch(e){}try{paintChips();}catch(e){}try{renderEngineCtl();}catch(e){}toast("Thinking "+a+".");return;}
  var L={brief:"brief",standard:"standard",deep:"deep","no limit":"open",open:"open",nolimit:"open"}[a];
  if(L){state.thinkLen=L;state.thinking=true;try{saveState();}catch(e){}var s=$("thinkLen");if(s)s.value=L;toast("Thinking on, "+{brief:"Brief",standard:"Standard",deep:"Deep",open:"No limit"}[L]+".");return;}
  toast("Thinking: on, off, brief, standard, deep or no limit. Example: /think deep");}
function once(flag,a){var q=String(a||"").trim();if(!q){toast("Write your question after it. Example: /"+(flag==="research"?"research":"web")+" what changed in 2025?");return;}
  var k=flag==="research"?"research":"webSearch",was=!!state[k];state[k]=true;try{sendText(q);}finally{state[k]=was;try{saveState();}catch(e){}try{paintChips();}catch(e){}}}
function openPlusView(v){try{var b=$("chatImgBtn");if(b)b.click();setTimeout(function(){try{paintPlus(v);}catch(e){}},30);}catch(e){}}
var CMD=[
  {c:"/compact",a:"what to keep in focus",d:"Compact the conversation: a summary takes the place of its earlier part",run:function(a){compactNow(a);}},
  {c:"/context",d:"What fills the model's memory, part by part",run:function(){openPop();}},
  {c:"/clear",d:"Start afresh in a new conversation (this one stays in the list)",run:function(){keyOf("chatNew");}},
  {c:"/model",d:"Choose who answers: this device or a service you connected",run:function(){setTimeout(function(){keyOf("chatModelBtn");},0);}},
  {c:"/connect",d:"Connect a service: Claude, OpenAI, Gemini, Ollama and others",run:function(){if(W.IngWho&&IngWho.open)IngWho.open();}},
  {c:"/connectors",d:"Turn connectors on or off here, or add one",run:function(){openPlusView("connectors");}},
  {c:"/effort",a:"low, medium, high, extra or max",d:"How hard the model works",run:function(a){setEffort(a);}},
  {c:"/think",a:"on, off, brief, standard, deep or no limit",d:"Thinking, and how long",run:function(a){setThink(a);}},
  {c:"/fast",d:"Answers at once, without thinking first (again to turn it off)",run:function(){if(!keyOf("cpFast"))toast("Fast is beside the message box.");}},
  {c:"/research",a:"your question",need:1,d:"Research: searches, reads the best pages and answers",run:function(a){once("research",a);}},
  {c:"/web",a:"your question",need:1,d:"Looks this question up on the web",run:function(a){once("web",a);}},
  {c:"/remember",a:"what to remember",need:1,d:"Keeps something for every conversation",run:function(a){var t=String(a||"").trim();if(!t){toast("Write what to remember after it.");return;}sendText("Remember that "+t);}},
  {c:"/help",d:"What each command does",run:function(){help();}}];
var CODE_CMD=[
  {c:"/plan",d:"The session's plan, its steps checked off",run:function(){if(!keyOf("ccpPlanKey"))toast("The plan is in a Code session.");}},
  {c:"/session",d:"The session's column: environment, context, outputs and changes",run:function(){if(!keyOf("ccpSessKey"))toast("The session's column is in a Code session.");}}];
function list(){var L=CMD.slice();if(code()){L=L.concat(CODE_CMD);try{var pr=typeof ccProj==="function"?ccProj():null;if(pr&&pr.gh&&W.IngGitHubCode&&IngGitHubCode.commands)IngGitHubCode.commands.forEach(function(g){if(g&&g.c&&!L.some(function(x){return x.c===g.c;}))L.push({c:g.c,d:g.d,gh:g,grp:"GitHub"});});}catch(e){}}return L;}
function find(word){word=String(word||"").toLowerCase();return list().filter(function(x){return x.c===word;})[0]||null;}
function exec(cmd,arg){try{var inp=$("chatInput");if(inp){inp.value="";inp.style.height="";try{inp.dispatchEvent(new Event("input",{bubbles:true}));}catch(_){}}
    if(cmd.gh){var pr=typeof ccProj==="function"?ccProj():null;if(!pr||!pr.gh)return;if(cmd.gh.send){sendText(cmd.gh.send(pr)+(arg?"\n\n"+arg:""));return;}if(cmd.gh.run)cmd.gh.run(pr);return;}
    cmd.run(arg||"");}catch(e){warn(e);toast(String(e&&e.message||e));}}
var SL={box:null,items:[],sel:0};
function parse(v){var m=/^\/([a-z]*)(\s[\s\S]*)?$/i.exec(String(v||""));if(!m)return null;return {word:"/"+m[1].toLowerCase(),arg:m[2]!=null?m[2].trim():null,raw:m[2]!=null};}
function paintList(){var inp=$("chatInput"),p=inp?parse(inp.value):null;
  if(!p||p.raw||D.activeElement!==inp){hideList();return;}
  SL.items=list().filter(function(x){return x.c.indexOf(p.word)===0;});if(!SL.items.length){hideList();return;}
  if(!SL.box){SL.box=mk("div","sl-menu");SL.box.id="slMenu";SL.box.setAttribute("role","listbox");SL.box.setAttribute("aria-label","Slash commands");SL.box.hidden=true;D.body.appendChild(SL.box);}
  if(SL.sel>=SL.items.length)SL.sel=0;SL.box.innerHTML="";SL.box.appendChild(mk("div","sl-cap","Commands"+(code()?" · Code":"")));var grp="";
  SL.items.forEach(function(x,i){if(x.grp&&x.grp!==grp){grp=x.grp;SL.box.appendChild(mk("div","sl-cap",x.grp));}
    var b=mk("button","sl-item");b.type="button";b.setAttribute("role","option");b.setAttribute("aria-selected",String(i===SL.sel));b.setAttribute("data-c",x.c);
    b.appendChild(mk("b",null,x.c));if(x.a)b.appendChild(mk("i",null,x.a));b.appendChild(mk("span",null,x.d));
    b.addEventListener("mousedown",function(e){e.preventDefault();choose(x);});SL.box.appendChild(b);});
  SL.box.hidden=false;try{var host=inp.closest(".chat-input-box,.cbox,.chat-compose,.composer")||inp,r=host.getBoundingClientRect(),h=SL.box.offsetHeight||240,w=SL.box.offsetWidth||420;
    SL.box.style.left=Math.round(Math.max(8,Math.min(r.left,W.innerWidth-w-8)))+"px";SL.box.style.top=Math.round(Math.max(8,r.top-h-8))+"px";}catch(e){}
  var on=SL.box.querySelector('[aria-selected="true"]');if(on)try{on.scrollIntoView({block:"nearest"});}catch(e){}}
function hideList(){if(SL.box)SL.box.hidden=true;}
function choose(x){if(x.a){setInput(x.c+" ");hideList();if(!x.need&&x.c==="/compact"){/* Enter again runs it without a focus */}return;}hideList();exec(x,"");}
function onKey(e){var inp=$("chatInput");if(!inp||e.target!==inp)return;
  var open=SL.box&&!SL.box.hidden&&SL.items.length;
  if(open){if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();e.stopImmediatePropagation();SL.sel=(SL.sel+(e.key==="ArrowDown"?1:SL.items.length-1))%SL.items.length;paintList();return;}
    if(e.key==="Tab"||(e.key==="Enter"&&!e.shiftKey)){e.preventDefault();e.stopImmediatePropagation();var x=SL.items[SL.sel];var p=parse(inp.value);
      if(e.key==="Enter"&&p&&p.word===x.c&&!x.need){hideList();exec(x,"");return;}choose(x);return;}
    if(e.key==="Escape"){e.preventDefault();e.stopImmediatePropagation();hideList();return;}}
  if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing){var q=parse(inp.value);if(q){var c=find(q.word);if(c){e.preventDefault();e.stopImmediatePropagation();hideList();exec(c,q.arg||"");}}}}
/* the send key too: a command sent runs; anything else is sent as before */
var ORIG_SEND=null;
function wrapSend(){var o=W.sendChat;if(typeof o!=="function"||o.__r245)return;ORIG_SEND=o;
  var f=function(){var inp=$("chatInput"),q=inp?parse(String(inp.value||"").trim()):null;if(q){var c=find(q.word);if(c){hideList();exec(c,q.arg||"");return;}}return o.apply(this,arguments);};
  try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}f.__r245=1;W.sendChat=f;try{sendChat=f;}catch(e){}}
function help(){var box=$("modalBox");if(!box)return;box.classList.remove("pomo-card");box.innerHTML="";var w=mk("div","sl-help");w.appendChild(mk("h3",null,"Slash commands"));
  w.appendChild(mk("p","small muted","Type / at the start of the message box for the list: arrows to move, Enter or Tab to choose, Escape to close. A command with words after it uses them."));
  var dl=mk("dl");list().forEach(function(x){dl.appendChild(mk("dt",null,x.c+(x.a?" …":"")));dl.appendChild(mk("dd",null,x.d+(x.a?" ("+x.a+")":"")));});w.appendChild(dl);
  var f=mk("div");f.style.cssText="display:flex;justify-content:flex-end;margin-top:14px";f.appendChild(btn("btn primary small","Close",function(){closeModal();}));w.appendChild(f);box.appendChild(w);try{openModal();}catch(e){}}

/* ---------- 6. the + menu: Slash commands; in Code, Add connectors near the top ---------- */
function wrapPlus(){var o=W.paintPlus;if(typeof o!=="function"||o.__r245)return;
  try{if(typeof PM_ICONS==="object"&&!PM_ICONS.slash)PM_ICONS.slash='<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M14.5 8l-5 8"/>';}catch(e){}
  var f=function(view){var r=o.apply(this,arguments);try{var m=$("chatPlusMenu");if(view||!m||m.querySelector('.pm-item[data-k="slash"]'))return r;
      var first=m.querySelector('.pm-item[data-k="file"]');var holder=mk("div");
      var it=pmItem(holder,"slash","Slash commands","Type / in the message box: compact, context, model, effort and more",function(){try{closePlus();}catch(e){}setInput("/");setTimeout(paintList,0);});
      if(first&&first.parentNode)first.parentNode.insertBefore(it,first.nextSibling);else m.insertBefore(it,m.firstChild);
      if(code()){var cx=m.querySelector('.pm-item[data-k="connectors"]');if(cx){it.parentNode.insertBefore(cx,it.nextSibling);var tx=cx.querySelector(".pm-txt");if(tx&&tx.firstChild&&tx.firstChild.nodeType===3)tx.firstChild.textContent="Add connectors";}}}catch(e){warn(e);}
    return r;};
  try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}f.__r245=1;W.paintPlus=f;try{paintPlus=f;}catch(e){}}

/* ---------- 7. hooks ---------- */
function wrapSendRec(){var o=W.sendRec;if(typeof o!=="function"||o.__r245)return;
  var f=function(rec){var self=this,a=arguments;var go=function(){return o.apply(self,a);};
    if(!wantAuto())return go();
    return compact({auto:true,except:rec}).then(go,function(e){if(!/stopped/.test(String(e&&e.message)))warn(e);return go();});};
  try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}f.__r245=1;W.sendRec=f;try{sendRec=f;}catch(e){}}
function wrapRender(){var o=W.renderChat;if(typeof o!=="function"||o.__r245)return;var f=function(){var r=o.apply(this,arguments);divider();return r;};
  try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}f.__r245=1;W.renderChat=f;try{renderChat=f;}catch(e){}}
function wrapStop(){var o=W.chatStop;if(typeof o!=="function"||o.__r245)return;var f=function(){if(BUSY&&ABORT){try{ABORT.abort();}catch(e){}}return o.apply(this,arguments);};f.__r245=1;W.chatStop=f;}
function pill(){var p=$("ingMemPill");if(!p||p.__r245)return;p.__r245=1;
  p.addEventListener("click",function(e){e.stopImmediatePropagation();e.preventDefault();togglePop();},true);
  p.setAttribute("aria-haspopup","dialog");var t=p.title||"";if(/Opens Controls\.?$/.test(t))p.title=t.replace(/Opens Controls\.?$/,"Opens Context: what fills it, and Compact now.");}
function hook(){wrapSend();wrapSendRec();wrapRender();wrapStop();wrapPlus();pill();watchPanel();
  var inp=$("chatInput");if(inp&&!inp.__r245){inp.__r245=1;inp.addEventListener("input",paintList);inp.addEventListener("focus",paintList);inp.addEventListener("blur",function(){setTimeout(hideList,120);});}}
D.addEventListener("keydown",onKey,true);
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",hook);else hook();
W.addEventListener("load",function(){hook();setTimeout(hook,1600);});
/* the memory key's title is written again as the meter paints: it keeps saying what it opens */
setInterval(function(){try{pill();var p=$("ingMemPill");if(p&&/Opens Controls\.?$/.test(p.title||""))p.title=p.title.replace(/Opens Controls\.?$/,"Opens Context: what fills it, and Compact now.");watchPanel();}catch(e){}},2000);
W.IngCompact={parts:parts,compact:compact,now:compactNow,open:openPop,close:closePop,auto:autoOn,wantAuto:wantAuto,keepFrom:keepFrom,threshold:function(){return THR;}};
W.IngSlash={list:list,run:function(word,arg){var c=find(word);if(c)exec(c,arg||"");return !!c;},help:help};
})();
;try{window.__ingParts["p245"]="running";}catch(_){}
</script>
