<style id="r215-css">
/* ============ R215 · THE CODE SESSION AS IN CLAUDE: EFFORT, AUTO AND ULTRACODE BESIDE THE MODEL, THE PLAN CHECKED OFF, A WORKING CLOCK, A QUEUE (Ingenium 6.11, 4 November 2026) ============
   Her words (3 November 2026): "I want Ingenium's Coding chat to have full parity with Claude's Coding chat. I want the same layout
   and behaviour during the sessions. I want to see the plan laid out with the completed Tasks checked off the scrollable list";
   earlier the same day: "I want to be able to select low to Max effort and Ultracode inside of the chats ... I want the varying
   effort levels of the models and Ultracode to be briefly explained accurately in a preview popup when I hover over it ... and for
   a guide that clearly explains"; "I want Ultracode to be at the highest effort, Code plans first, writes the app, runs its checks,
   reads the errors and fixes them, repeating until the checks pass, showing each step"; and "I want the 'Auto' function to be added
   and for the effort level and Token level to be better regulated". The working loop's side (the plan and the check, Ultracode's
   last word) is in modules/r190.js; the base page's requests take the effort through IngEffort (build_page.py, 6.11). */
.eff-wrap{position:relative;display:inline-flex;flex:0 0 auto}
.eff-key{white-space:nowrap;gap:5px}
.eff-key .eff-gem{display:inline-block;width:9px;height:9px;transform:rotate(45deg);border-radius:2px;background:linear-gradient(135deg,#9b6ff0,#5d37a1);box-shadow:0 0 0 1px rgba(255,255,255,.5) inset;flex:0 0 auto}
.eff-key .eff-sub{font-weight:500;color:var(--ink-3);margin-left:1px}
.eff-key.ultra{border-color:var(--accent);color:var(--accent)}
.eff-key .eff-short{display:none}
.eff-menu{position:fixed;z-index:640;width:min(330px,calc(100vw - 20px));max-height:min(560px,calc(100vh - 90px));overflow:auto;padding:6px;border-radius:14px;
  background:var(--surface,#fff);border:1px solid var(--hairline,rgba(34,26,46,.12));box-shadow:0 2px 0 rgba(40,22,68,.08),0 14px 34px rgba(40,22,68,.20);
  transform-origin:bottom right;animation:effUp .16s cubic-bezier(.34,1.3,.64,1)}
@keyframes effUp{from{opacity:0;transform:translateY(6px) scale(.97)}to{opacity:1;transform:none}}
body[data-motion="minimal"] .eff-menu,body.calm .eff-menu{animation:none}
.eff-menu[hidden]{display:none}
.eff-h{padding:6px 10px 2px;font:700 11px/1.2 var(--sans,system-ui,sans-serif);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
.eff-note{padding:0 10px 6px;font:12px/1.45 var(--sans,system-ui,sans-serif);color:var(--ink-3)}
.eff-opt{display:flex;gap:9px;align-items:flex-start;width:100%;text-align:left;border:0;background:transparent;border-radius:10px;padding:7px 10px;margin:1px 0;cursor:pointer;color:var(--ink-1);font:600 13px/1.35 var(--sans,system-ui,sans-serif)}
.eff-opt small{display:block;font-weight:400;color:var(--ink-3);font-size:12px;line-height:1.4;margin-top:1px}
.eff-opt .eff-dot{flex:0 0 auto;width:14px;height:14px;margin-top:1px;border-radius:50%;border:1.5px solid var(--hairline-strong,rgba(34,26,46,.3));box-sizing:border-box}
.eff-opt[aria-checked="true"]{background:var(--accent-softer,rgba(106,63,181,.08))}
.eff-opt[aria-checked="true"] .eff-dot{border:4px solid var(--accent,#6a3fb5)}
.eff-opt:hover,.eff-opt:focus-visible{background:var(--accent-softer,rgba(106,63,181,.07));outline:none}
.eff-opt:focus-visible{box-shadow:inset 0 0 0 2px var(--accent,#6a3fb5)}
.eff-opt[aria-disabled="true"]{opacity:.55;cursor:default}
.eff-sw{flex:0 0 auto;margin-left:auto;width:30px;height:18px;border-radius:9px;background:var(--hairline,rgba(34,26,46,.18));position:relative;transition:background .15s ease;margin-top:1px}
.eff-sw::after{content:"";position:absolute;left:2px;top:2px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s ease}
.eff-opt[aria-checked="true"] .eff-sw{background:var(--accent,#6a3fb5)}
.eff-opt[aria-checked="true"] .eff-sw::after{transform:translateX(12px)}
.eff-opt.eff-row[aria-checked="true"]{background:transparent}
.eff-sep{height:1px;margin:5px 8px;background:var(--hairline,rgba(34,26,46,.12))}
.eff-foot{padding:6px 10px 4px;font:12px/1.45 var(--sans,system-ui,sans-serif);color:var(--ink-3)}
.eff-foot button{border:0;background:none;padding:0;color:var(--accent,#6a3fb5);font:inherit;font-weight:600;cursor:pointer;text-decoration:underline;text-underline-offset:2px}
.eff-pop{position:fixed;z-index:650;width:min(300px,calc(100vw - 20px));padding:11px 13px;border-radius:12px;background:var(--surface,#fff);border:1px solid var(--accent-soft,rgba(106,63,181,.35));
  box-shadow:0 2px 0 rgba(40,22,68,.08),0 12px 28px rgba(40,22,68,.18);font:12.5px/1.5 var(--sans,system-ui,sans-serif);color:var(--ink-2);pointer-events:none;
  animation:effUp .14s ease-out}
.eff-pop[hidden]{display:none}
.eff-pop b{display:block;color:var(--ink-1);font-size:13px;margin-bottom:3px}
.eff-pop p{margin:0 0 5px}.eff-pop p:last-child{margin:0}
body[data-theme="night"] .eff-menu,body[data-theme="night"] .eff-pop{background:#241d31;border-color:rgba(205,184,240,.16);box-shadow:0 2px 0 rgba(0,0,0,.5),0 14px 34px rgba(0,0,0,.5)}
body[data-theme="night"] .eff-opt{color:#f3eefb}
.eff-says{margin:6px 0 0;font:12px/1.45 var(--sans,system-ui,sans-serif);color:var(--ink-3)}
/* the plan, in a reply */
.pl-card{margin:2px 0 10px;padding:9px 12px 8px;border:1px solid var(--hairline,rgba(34,26,46,.12));border-radius:12px;background:var(--card-hi,rgba(255,255,255,.6));
  font:13px/1.45 var(--sans,system-ui,sans-serif);color:var(--ink-2)}
.pl-head{display:flex;align-items:baseline;gap:8px;margin-bottom:4px}
.pl-head .pl-title{font-weight:700;color:var(--ink-1)}
.pl-head .pl-count{color:var(--ink-3);font-size:12px}
.pl-head .pl-open{margin-left:auto;border:0;background:none;color:var(--accent,#6a3fb5);font:600 12px/1 var(--sans,system-ui,sans-serif);cursor:pointer;padding:2px 0}
.pl-list{list-style:none;margin:0;padding:0}
.pl-list li{display:flex;gap:8px;align-items:flex-start;padding:2px 0}
.pl-mk{flex:0 0 16px;height:16px;margin-top:1px;border-radius:50%;box-sizing:border-box;border:1.5px dashed var(--ink-3,#6c6579);display:inline-flex;align-items:center;justify-content:center;font-size:10px;line-height:1}
.pl-list li.done .pl-mk{border:0;background:var(--accent,#6a3fb5);color:#fff}
.pl-list li.done .pl-t{color:var(--ink-3);text-decoration:line-through;text-decoration-thickness:1px}
.pl-list li.doing .pl-mk{border:1.5px solid var(--accent,#6a3fb5);background:radial-gradient(circle,var(--accent,#6a3fb5) 0 3px,transparent 3.5px)}
.pl-list li.doing .pl-t{color:var(--ink-1);font-weight:600}
.pl-more{border:0;background:none;padding:2px 0 2px 24px;color:var(--ink-3);font:12px/1.4 var(--sans,system-ui,sans-serif);cursor:pointer}
.pl-more:hover{color:var(--accent,#6a3fb5)}
/* the column beside the conversation: the plan and the session */
#ccPanel{display:none}
body.ccp-on #page-chat #ccPanel{display:flex;flex-direction:column;flex:0 0 var(--ccp-w,300px);width:var(--ccp-w,300px);min-width:0;box-sizing:border-box;margin:0 0 0 12px;padding:12px 12px 10px;
  max-height:max(460px,calc(100vh - 200px));overflow:hidden;align-self:stretch}
body.ccp-on:not(.cs-on) #page-chat .chat-col{max-width:none;display:flex;align-items:stretch}
body.ccp-on:not(.cs-on) #page-chat .chat-card{flex:1 1 auto;min-width:0}
body.ccp-on.cs-on:not(.ccp-over) #page-chat .chat-card{max-width:calc(100% - 352px - var(--ccp-w,300px))}
#ccPanel .ccp-top{display:flex;align-items:center;gap:6px;margin-bottom:6px}
#ccPanel .ccp-top h2{margin:0;flex:1;font:700 13px/1.3 var(--sans,system-ui,sans-serif);color:var(--ink-1)}
#ccPanel .ccp-body{overflow:auto;flex:1 1 auto;min-height:0;scrollbar-width:none;-ms-overflow-style:none}
/* 6.15, her words (4 November 2026): "please hide the scroll bar from the Plan and session panel on the Coding chat page. I want the
   scrollability kept but I want the scroll bar hidden to match the rest of the app." It scrolls as before, by wheel, touch and keys. */
#ccPanel .ccp-body::-webkit-scrollbar{display:none;width:0;height:0}
#ccPanel .ccp-sec{margin:0 0 14px}
#ccPanel .ccp-h{display:flex;align-items:baseline;gap:6px;margin:0 0 6px;font:700 11px/1.2 var(--sans,system-ui,sans-serif);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
#ccPanel .ccp-h span{margin-left:auto;text-transform:none;letter-spacing:0;font-weight:600}
#ccPanel .ccp-plan{max-height:46vh;overflow:auto;scrollbar-width:thin}
#ccPanel .ccp-row{display:flex;align-items:center;gap:8px;padding:4px 0;font:13px/1.4 var(--sans,system-ui,sans-serif);color:var(--ink-2);min-width:0}
#ccPanel .ccp-row .nm{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#ccPanel .ccp-row .ad{color:#2f7a55;font-variant-numeric:tabular-nums}
#ccPanel .ccp-row .rm{color:#a8423e;font-variant-numeric:tabular-nums}
#ccPanel button.ccp-row{width:100%;border:0;background:none;text-align:left;cursor:pointer;border-radius:8px;padding:4px 6px;margin:0 -6px;width:calc(100% + 12px)}
#ccPanel button.ccp-row:hover{background:var(--accent-softer,rgba(106,63,181,.06))}
#ccPanel .ccp-bar{height:5px;border-radius:3px;background:var(--hairline,rgba(34,26,46,.14));overflow:hidden;margin-top:4px}
#ccPanel .ccp-bar b{display:block;height:100%;background:var(--accent,#6a3fb5);border-radius:3px}
#ccPanel .ccp-keys{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
#ccPanel .ccp-empty{font:12.5px/1.45 var(--sans,system-ui,sans-serif);color:var(--ink-3)}
#ccPanel .ccp-sec+.ccp-sec{border-top:1px solid var(--hairline,rgba(34,26,46,.10));padding-top:10px}
#ccPanel .ccp-hd{display:flex;align-items:center;gap:6px;width:100%;margin:0 0 6px;padding:0;border:0;background:none;text-align:left;color:var(--ink-1);font:600 13px/1.3 var(--sans,system-ui,sans-serif)}
#ccPanel button.ccp-hd{cursor:pointer}
#ccPanel .ccp-hd .tw{font-size:10px;color:var(--ink-3);transition:transform .15s ease;display:inline-block}
#ccPanel .ccp-hd[aria-expanded="true"] .tw{transform:rotate(90deg)}
#ccPanel .ccp-hd .sum{margin-left:auto;display:inline-flex;align-items:center;gap:6px;font-weight:600;font-size:12px;color:var(--ink-3);font-variant-numeric:tabular-nums}
#ccPanel .ccp-hd .mini{display:inline-block;width:26px;height:6px;border-radius:3px;background:var(--hairline,rgba(34,26,46,.16));overflow:hidden}
#ccPanel .ccp-hd .mini b{display:block;height:100%;background:var(--accent,#6a3fb5)}
#ccPanel .ccp-gear{margin-left:auto;border:0;background:none;color:var(--ink-3);cursor:pointer;padding:2px 4px;border-radius:6px;display:inline-flex}
#ccPanel .ccp-gear:hover{color:var(--accent,#6a3fb5);background:var(--accent-softer,rgba(106,63,181,.06))}
#ccPanel .ccp-ic{flex:0 0 16px;width:16px;text-align:center;color:var(--ink-3);font:600 11px/1 ui-monospace,Menlo,Consolas,monospace}
#ccPanel .ccp-more{border:0;background:none;padding:2px 0;color:var(--ink-3);font:12.5px/1.4 var(--sans,system-ui,sans-serif);cursor:pointer}
#ccPanel .ccp-more:hover{color:var(--accent,#6a3fb5)}
#ccPanel .ccp-row .tm{flex:0 0 auto;color:var(--ink-3);font-variant-numeric:tabular-nums;font-size:12px}
#ccPanel .ccp-row .stop{flex:0 0 auto;width:20px;height:20px;border-radius:5px;border:1px solid var(--hairline,rgba(34,26,46,.18));background:var(--card-hi,#fff);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0}
#ccPanel .ccp-row .stop::before{content:"";width:8px;height:8px;border-radius:1.5px;background:var(--ink-2,#4a4358)}
#ccPanel .ccp-row .stop:hover::before{background:var(--bad,#a8423e)}
#ccPanel .ccp-row .spin{flex:0 0 auto;width:12px;height:12px;border-radius:50%;border:2px solid var(--accent-soft,rgba(106,63,181,.3));border-top-color:var(--accent,#6a3fb5);animation:ccpSpin 1s linear infinite}
@keyframes ccpSpin{to{transform:rotate(360deg)}}
body[data-motion="minimal"] #ccPanel .ccp-row .spin,body.calm #ccPanel .ccp-row .spin{animation:none}
body.ccp-on.ccp-over #page-chat #ccPanel{position:fixed;right:10px;top:var(--ccp-top,70px);bottom:10px;z-index:600;max-height:none;margin:0;width:min(360px,calc(100vw - 20px));
  box-shadow:0 2px 0 rgba(40,22,68,.08),0 16px 40px rgba(40,22,68,.24);animation:effUp .16s ease-out}
/* the keys for the column, in the top row */
.ccp-keys-top{display:inline-flex;gap:6px;flex:0 0 auto}
.ccp-keys-top[hidden]{display:none}
.ccp-keys-top .chat-top-key.on{border-color:var(--accent);color:var(--accent);background:var(--accent-softer,rgba(106,63,181,.07))}
.ccp-keys-top .chat-top-key .n{font:700 11px/1 var(--sans,system-ui,sans-serif);margin-left:3px;font-variant-numeric:tabular-nums}
/* the title keeps room for its words; a narrow card shows the keys as their marks */
html body #page-chat #ccTitle{min-width:110px;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:left}
#page-chat .chat-card.cc-tight #paceChip{display:none !important}
#page-chat .chat-card.cc-tight .ccp-keys-top .lbl{display:none}
#page-chat .chat-card.cc-tight #chatCtlBtn .nm{display:none}
#page-chat .chat-card.cc-tight #ccCodeBar .cc-errs:not(.on){display:none}
/* the working clock */
.cc-work{display:flex;align-items:center;gap:8px;margin:0 0 6px;padding:5px 10px;border-radius:10px;background:var(--accent-softer,rgba(106,63,181,.06));font:12.5px/1.35 var(--sans,system-ui,sans-serif);color:var(--ink-2);min-width:0}
.cc-work[hidden]{display:none}
.cc-work .cw-dot{flex:0 0 auto;width:8px;height:8px;border-radius:50%;background:var(--accent,#6a3fb5);animation:cwPulse 1.4s ease-in-out infinite}
@keyframes cwPulse{0%,100%{opacity:.35}50%{opacity:1}}
body[data-motion="minimal"] .cc-work .cw-dot,body.calm .cc-work .cw-dot{animation:none}
.cc-work .cw-what{font-weight:600;color:var(--ink-1);flex:0 0 auto}
.cc-work .cw-time{font-variant-numeric:tabular-nums;color:var(--ink-3);flex:0 0 auto}
.cc-work .cw-step{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink-3)}
.cc-work .cw-stop{flex:0 0 auto}
/* the queue */
.cc-queue{display:flex;flex-direction:column;gap:4px;margin:0 0 6px}
.cc-queue[hidden]{display:none}
.cc-queue .cq-h{font:700 11px/1.2 var(--sans,system-ui,sans-serif);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
.cc-queue .cq-item{display:flex;align-items:center;gap:8px;padding:5px 6px 5px 10px;border:1px dashed var(--accent-soft,rgba(106,63,181,.4));border-radius:10px;font:12.5px/1.35 var(--sans,system-ui,sans-serif);color:var(--ink-2)}
.cc-queue .cq-item span{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cc-queue .cq-item button{flex:0 0 auto;border:0;background:none;color:var(--ink-3);cursor:pointer;font-size:13px;padding:2px 6px;border-radius:6px}
.cc-queue .cq-item button:hover{color:var(--bad,#a8423e);background:rgba(168,66,62,.08)}
/* the left column's two keys (her picture of 4 November): a quiet row of small keys, as long as their words */
html body .cc-proj-acts{display:flex;gap:6px;margin:-2px 0 10px;flex-wrap:wrap;justify-content:flex-start}
html body .cc-proj-acts .btn{flex:0 0 auto !important;width:auto !important;min-width:0;padding:3px 9px;font-size:11.5px;min-height:24px}
.ing-ask .ing-ask-in{display:block;width:100%;box-sizing:border-box;margin:0 0 14px;padding:9px 11px;border-radius:10px;border:1px solid var(--hairline-strong,rgba(34,26,46,.22));background:var(--card,#fff);color:var(--ink-1);font:14px/1.4 var(--sans,system-ui,sans-serif);box-shadow:inset 0 1px 2px rgba(40,22,68,.06)}
.ing-ask .ing-ask-in:focus{outline:none;border-color:var(--accent,#6a3fb5);box-shadow:0 0 0 3px var(--accent-softer,rgba(106,63,181,.14))}
body[data-theme="night"] .ing-ask .ing-ask-in{background:#1d1728;border-color:rgba(205,184,240,.22);color:#f3eefb}
#page-chat .composer.cb-tight .composer-bar{gap:6px}
#page-chat .composer.cb-tight .composer-bar .ing-mem-pill{display:none !important}
#page-chat .composer.cb-tight .composer-bar .eff-key{padding:4px 8px;min-height:28px}
#page-chat .composer.cb-tight .composer-bar .eff-key .chev,#page-chat .composer.cb-tight .composer-bar .eff-key .eff-sub,#page-chat .composer.cb-tight .composer-bar .eff-key .eff-full{display:none}
#page-chat .composer.cb-tight .composer-bar .eff-key .eff-short{display:inline}
#page-chat .composer.cb-tight .composer-bar .chat-top-key.model{min-width:92px;flex:0 1 auto}
#page-chat .composer.cb-tight .composer-bar .chat-top-key.model .nm{max-width:96px}
#page-chat .composer.cb-tight .composer-bar .ag-way-key{padding-left:8px;padding-right:8px}
#page-chat .composer.cb-wrap .composer-bar{flex-wrap:wrap;row-gap:6px;justify-content:flex-end}
/* a narrow conversation: its title keeps its words on a line of its own, and the keys go on the next */
#page-chat .chat-card.r215-tight .chat-top{flex-wrap:wrap;row-gap:6px}
#page-chat .chat-card.r215-tight #ccTitle{flex:1 1 calc(100% - 60px);min-width:0}
#page-chat .chat-card.r215-tight #paceChip{display:none !important}
#page-chat .chat-card.r215-tight .ccp-keys-top .lbl{display:none}
#page-chat .chat-card.r215-tight #chatCtlBtn .nm{display:none}
#page-chat .chat-card.r215-tight #ccCodeBar .cc-errs:not(.on){display:none}
@media (max-width:560px){
  #page-chat .composer-bar{gap:6px}
  #page-chat .composer-bar .ing-mem-pill{display:none !important}
  #page-chat .composer-bar .eff-key{padding:4px 8px;min-height:28px}
  #page-chat .composer-bar .eff-key .chev,#page-chat .composer-bar .eff-key .eff-sub,#page-chat .composer-bar .eff-key .eff-full{display:none}
  #page-chat .composer-bar .eff-key .eff-short{display:inline}
  #page-chat .composer-bar .chat-top-key.model .nm{max-width:78px}
  #page-chat .composer-bar .ag-way-key{padding-left:8px;padding-right:8px}}
@media (max-width:820px){body.ccp-on #page-chat #ccPanel{position:fixed;left:8px;right:8px;top:auto;bottom:8px;width:auto;max-height:70vh;z-index:600;margin:0}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p215"]="started";}catch(_){}
(function r215(){
"use strict";
if(window.__r215)return;window.__r215=1;
var W=window;
function $id(i){return document.getElementById(i);}
function mk(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function cur(){try{return curChat();}catch(e){return null;}}
function isCode(c){try{return typeof ccIsCode==="function"&&ccIsCode(c);}catch(e){return false;}}
function fmt(n){try{return (+n).toLocaleString("en-GB");}catch(e){return String(n);}}

/* ================= 1. effort: what each level means, for every kind of model ================= */
var LV=[null,
  {n:1,key:"low",name:"Low",room:2048,steps:20,lsteps:8,mul:0,line:"Quick replies. It thinks little or not at all."},
  {n:2,key:"medium",name:"Medium",room:4096,steps:40,lsteps:12,mul:0.5,line:"Everyday work. It thinks briefly before it answers."},
  {n:3,key:"high",name:"High",room:8192,steps:60,lsteps:16,mul:1,line:"Careful work. It thinks before it answers. The usual choice."},
  {n:4,key:"extra",name:"Extra",room:16384,steps:90,lsteps:24,mul:2,line:"Hard problems. It thinks longer and may write longer replies."},
  {n:5,key:"max",name:"Max",room:32768,steps:120,lsteps:32,mul:4,line:"The most thinking and the longest replies the model allows. The slowest."}];
var ULTRA={steps:200,lsteps:48,nudges:3};
var CLAUDE={1:"low",2:"medium",3:"high",4:"xhigh",5:"max"};
var REFUSED={};
function est(){if(!state.effort||typeof state.effort!=="object")state.effort={};return state.effort;}
function setLv(){var v=0;try{v=+$id("ctlEffort").value;}catch(e){}return v>=1&&v<=5?v:3;}
function levelNow(){return setLv();}
function isAuto(){return !!est().auto;}
function replyAuto(){var e=est();if(e.replyAuto===undefined){var hand=false;try{hand=(state.models||[]).some(function(m){return m&&+m.tokens>0&&+m.tokens!==1024;});}catch(_){}e.replyAuto=!hand;}return e.replyAuto!==false;}
function ultraOn(c){c=c||cur();return !!(c&&c.ultra);}
function ultraCan(c){c=c||cur();if(!c)return {ok:false,why:"Open a Code session, or a chat with files, to use Ultracode."};
  if(isCode(c)){if(!(typeof ccProj==="function"&&ccProj()))return {ok:false,why:"Choose an app for this session first."};}
  else{var n=0;try{n=edChatFiles().length;}catch(e){}if(!n)return {ok:false,why:"Ultracode works on code: open Code, or attach the files to this chat."};}
  var way="";try{way=IngAgent.way(c);}catch(e){}if(way==="guide")return {ok:false,why:"With Guide me, you make each change yourself, so Ultracode has nothing to build. Choose For me or With me."};
  try{if(IngAgent&&!IngAgent.isOn())return {ok:false,why:"The working loop is off (Settings): Ultracode needs it."};}catch(e){}
  return {ok:true,why:""};}
function provider(){try{return chatSource()==="cloud"&&state.cloud&&state.cloud.on?(state.cloud.provider||""):"";}catch(e){return "";}}
function modelId(){try{return provider()?String(state.cloud.model||""):"";}catch(e){return "";}}
function ctxNow(){try{var A=Engine.adapter;
    if(A===DeskAdapter&&DeskAdapter.loaded&&+DeskAdapter.loaded.ctx>0)return +DeskAdapter.loaded.ctx;
    if(typeof NativeAdapter!=="undefined"&&A===NativeAdapter&&NativeAdapter.loaded&&+NativeAdapter.loaded.n_ctx>0)return +NativeAdapter.loaded.n_ctx;}catch(e){}
  try{return +$id("ctlCtx").value||8192;}catch(e){return 8192;}}
function replyRoom(lv,cloud){var r=LV[lv].room;if(cloud)return r;return Math.min(r,Math.max(1024,Math.floor(ctxNow()/4)));}
function reasonOf(lv){return lv<=1?"low":lv===2?"medium":"high";}
function reasoningModel(p,m){m=String(m||"").toLowerCase();
  if(p==="openai")return /^(o\d|gpt-5)/.test(m);
  if(p==="gemini")return /gemini-(2\.5|[3-9])/.test(m);
  if(p==="openrouter")return true;
  return false;}
/* the request's own effort field, where the service documents one; a service that refused it is not asked again this session */
function openaiBody(body,p,m,lv){lv=lv||levelNow();if(REFUSED[p+"|"+m]||!reasoningModel(p,m))return body;var r=reasonOf(lv);
  if(p==="openrouter")body.reasoning={effort:r};else body.reasoning_effort=r;return body;}
function ollamaThink(m,lv){lv=lv||levelNow();if(/gpt-oss/i.test(String(m||"")))return ["low","low","medium","high","high","high"][lv];return true;}
function claudeKey(){var lv=levelNow();return CLAUDE[lv]||"high";}
function thinkMul(eff){var l=LV[+eff]||LV[3];return l.mul;}
function forRun(o){o=o||{};var c=cur(),ul=ultraOn(c),lv=ul?5:levelNow(),L=LV[lv];
  var sv=o.cloud?(o.provider||provider()):"";
  return {lv:lv,ultra:ul,auto:isAuto(),why:(W.IngEffort.last&&W.IngEffort.last.why)||"",steps:ul?ULTRA.steps:L.steps,lsteps:ul?ULTRA.lsteps:L.lsteps,
    claude:CLAUDE[lv],reason:reasoningModel(sv,o.cloud?modelId():"")?reasonOf(lv):null};}

/* Auto: Ingenium reads the message before it is sent; the rules are stated in the Guide and under each reply */
var DEEP=/\b(thorough(ly)?|in[- ]depth|carefully|rigorou?s(ly)?|comprehensive(ly)?|step[- ]by[- ]step|audit|research|prove|proof|derive|evaluate|critique|review|analy[sz]e|compare)\b/i;
var WORK=/\b(fix|build|make|create|write|draft|change|edit|add|remove|rename|refactor|implement|debug|rewrite|translate|summari[sz]e|plan|design|convert|generate|update|improve)\b/i;
var CODEY=/```|\b(function|const|let|var|def|class|import|return)\b|<\/?[a-z][a-z0-9-]*[\s>]|[{};]\s*$/m;
function pick(text,info){info=info||{};var t=String(text||""),words=(t.match(/\S+/g)||[]).length,files=!!info.files,code=!!info.code||CODEY.test(t);
  if(info.ultra)return {lv:5,why:"Ultracode is on"};
  if(DEEP.test(t)&&(words>=15||files||code))return {lv:4,why:"a careful request (a review, an audit, research or a proof)"};
  if(code||files)return words>=150?{lv:4,why:"a long piece of work on code or files"}:{lv:3,why:info.code?"work in a Code session":files?"a message with files":"a message with code"};
  if(words>=150)return {lv:4,why:"a long brief"};
  if(words<=12&&!WORK.test(t))return {lv:1,why:"a short question"};
  if(words>=60||WORK.test(t))return {lv:3,why:"a request for work"};
  return {lv:2,why:"an everyday question"};}
function busy(){try{return Engine.status==="busy"||!!W.liveBot;}catch(e){return false;}}
/* before a message goes: Auto's choice, Ultracode's Max, and the longest reply that follows the effort */
var restoreTo=null;
function beforeSend(rec){var c=cur();if(!c)return;var e=$id("ctlEffort"),t=$id("ctlTokens");if(!e)return;
  var manual=setLv(),ul=ultraOn(c),lv=manual,why="";
  if(ul){lv=5;why="Ultracode is on";}
  else if(isAuto()){var p=pick(rec&&rec.text,{files:!!(rec&&(rec.files&&rec.files.length||rec.attach||rec.attachRef)),code:isCode(c)});lv=p.lv;why=p.why;}
  if(lv!==manual&&!(isAuto()&&!ul)){restoreTo=manual;}
  e.value=String(lv);
  if(t&&replyAuto()){var room=replyRoom(lv,!!provider());var mx=+t.max||16384;t.value=String(Math.min(mx,room));}
  W.IngEffort.last={lv:lv,auto:isAuto()&&!ul,ultra:ul,why:why,chat:c.id,at:Date.now()};
  try{paintKey();}catch(_){}}
function afterSend(){var b=W.liveBot,L=W.IngEffort.last;if(b&&L&&!b.eff&&Date.now()-L.at<60000){b.eff={lv:L.lv,auto:L.auto,ultra:L.ultra,why:L.why};}}
function settle(){if(restoreTo!=null&&!busy()){var e=$id("ctlEffort");if(e)e.value=String(restoreTo);restoreTo=null;try{paintKey();}catch(_){}}}

/* ================= 2. the effort key, beside the model's name ================= */
var key=null,menu=null,pop=null,wrap=null;
function ensureKey(){if(wrap&&document.body.contains(wrap))return true;var bar=document.querySelector("#page-chat .composer-bar");if(!bar)return false;
  wrap=mk("span","eff-wrap");key=mk("button","chat-top-key eff-key");key.type="button";key.id="effKey";key.setAttribute("aria-haspopup","true");key.setAttribute("aria-expanded","false");
  wrap.appendChild(key);var send=$id("chatSend");if(send&&send.parentNode===bar)bar.insertBefore(wrap,send);else bar.appendChild(wrap);
  key.addEventListener("click",function(e){e.stopPropagation();if(menu&&!menu.hidden)closeMenu();else openMenu();});
  key.addEventListener("mouseenter",function(){showPop(key,"key");});key.addEventListener("mouseleave",hidePop);
  key.addEventListener("focus",function(){if(!menu||menu.hidden)showPop(key,"key");});key.addEventListener("blur",hidePop);
  return true;}
function paintKey(){if(!ensureKey())return;setTimeout(function(){try{fit();}catch(e){}},0);var c=cur(),ul=ultraOn(c),lv=setLv(),L=W.IngEffort.last,au=isAuto();
  key.innerHTML="";key.classList.toggle("ultra",ul);
  if(ul){key.appendChild(mk("span","eff-gem"));key.appendChild(mk("span","eff-full","Ultracode"));key.appendChild(mk("span","eff-short","Ultra"));}
  else if(au){key.appendChild(document.createTextNode("Auto"));var sub=L&&c&&L.chat===c.id&&L.auto?LV[L.lv].name:"";if(sub)key.appendChild(mk("span","eff-sub","· "+sub));}
  else key.appendChild(document.createTextNode(LV[lv].name));
  key.appendChild(mk("span","chev","▾"));
  var what=ul?"Ultracode: plan, build, check and fix until the checks pass, at Max effort":au?"Auto: Ingenium chooses the effort for each message":"Effort: "+LV[lv].name;
  key.setAttribute("aria-label",what+". Press to choose.");key.removeAttribute("title");}
function placeMenu(){try{var k=key.getBoundingClientRect(),w=menu.offsetWidth||330,left=Math.max(8,Math.min(k.right-w,innerWidth-w-8));
  menu.style.left=Math.round(left)+"px";menu.style.bottom=Math.round(innerHeight-k.top+8)+"px";menu.style.top="auto";}catch(e){}}
function opt(role,lab,line,checked,on,disabled,why){var b=mk("button","eff-opt"+(role==="menuitemcheckbox"?" eff-row":""));b.type="button";b.setAttribute("role",role);b.setAttribute("aria-checked",checked?"true":"false");
  if(role==="menuitemradio")b.appendChild(mk("span","eff-dot"));var tx=mk("span");tx.appendChild(document.createTextNode(lab));tx.appendChild(mk("small",null,line));b.appendChild(tx);
  if(role==="menuitemcheckbox")b.appendChild(mk("span","eff-sw"));
  if(disabled){b.setAttribute("aria-disabled","true");}
  b.addEventListener("click",function(e){e.stopPropagation();if(disabled){try{ingToast(why);}catch(_){}return;}on();});return b;}
function buildMenu(){if(!menu){menu=mk("div","eff-menu");menu.id="effMenu";menu.setAttribute("role","menu");menu.setAttribute("aria-label","Effort");menu.hidden=true;document.body.appendChild(menu);
    menu.addEventListener("click",function(e){e.stopPropagation();});
    menu.addEventListener("keydown",function(e){var bs=[].slice.call(menu.querySelectorAll(".eff-opt,.eff-foot button")),i=bs.indexOf(document.activeElement);
      if(e.key==="Escape"){e.preventDefault();closeMenu();try{key.focus();}catch(_){}}
      else if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();var n=bs[(i+(e.key==="ArrowDown"?1:bs.length-1)+bs.length)%bs.length];if(n)n.focus();}});
    document.addEventListener("click",function(){closeMenu();});
    window.addEventListener("resize",function(){if(menu&&!menu.hidden)placeMenu();});}
  menu.innerHTML="";var c=cur(),lv=setLv(),au=isAuto(),ul=ultraOn(c),can=ultraCan(c);
  menu.appendChild(mk("div","eff-h","Effort"));
  menu.appendChild(mk("div","eff-note","How much the model thinks, how long it may write, and how many steps it may take on a task."));
  var A=opt("menuitemradio","Auto","Ingenium chooses for each message, and says what it chose.",au&&!ul,function(){est().auto=true;save();});A.setAttribute("data-k","auto");menu.appendChild(A);
  for(var i=1;i<=5;i++)(function(i){var b=opt("menuitemradio",LV[i].name,LV[i].line,!au&&!ul&&lv===i,function(){est().auto=false;var e=$id("ctlEffort");e.value=String(i);try{e.dispatchEvent(new Event("input"));}catch(_){}restoreTo=null;save();});
    b.setAttribute("data-k",String(i));menu.appendChild(b);})(i);
  menu.appendChild(mk("div","eff-sep"));
  var U=opt("menuitemcheckbox","Ultracode","Plans, builds, runs checks and fixes until they pass, at Max effort.",ul,function(){if(!c)return;c.ultra=!c.ultra;if(isCode(c))ccStateSafe().ultra=c.ultra;save();},!can.ok&&!ul,can.why);
  U.setAttribute("data-k","ultra");menu.appendChild(U);
  var T=opt("menuitemcheckbox","Thinking","Show the model's reasoning before its answer.",thinkOnSafe(),function(){state.thinking=!thinkOnSafe();var tt=$id("thinkToggle");if(tt)tt.checked=state.thinking;try{saveState();paintChips();paintPlus();}catch(_){}buildMenu();placeMenu();});
  T.setAttribute("data-k","think");menu.appendChild(T);
  var f=mk("div","eff-foot"),cl=!!provider();
  f.appendChild(document.createTextNode(replyAuto()?"Longest reply follows the effort: up to "+fmt(replyRoom(ul?5:(au?((W.IngEffort.last&&W.IngEffort.last.lv)||3):lv),cl))+" tokens. ":"Longest reply set by hand in Controls: "+fmt(+$id("ctlTokens").value||1024)+" tokens. "));
  var sw=mk("button",null,replyAuto()?"Set it by hand":"Let it follow the effort");sw.type="button";
  sw.onclick=function(){if(replyAuto()){est().replyAuto=false;closeMenu();var k=$id("chatCtlBtn");if(k&&k.getAttribute("aria-expanded")!=="true")k.click();setTimeout(function(){var t=$id("ctlTokens");if(t)try{t.focus();}catch(_){}},300);}else{est().replyAuto=true;}try{saveState();}catch(_){}buildMenu();placeMenu();};
  f.appendChild(sw);f.appendChild(document.createTextNode(" · "));
  var g=mk("button",null,"About effort, Auto and Ultracode");g.type="button";g.onclick=function(){closeMenu();openGuide();};f.appendChild(g);menu.appendChild(f);
  [].forEach.call(menu.querySelectorAll(".eff-opt"),function(b){b.addEventListener("mouseenter",function(){showPop(b,b.getAttribute("data-k"));});b.addEventListener("mouseleave",hidePop);
    b.addEventListener("focus",function(){showPop(b,b.getAttribute("data-k"));});b.addEventListener("blur",hidePop);});}
function save(){try{saveState();}catch(e){}buildMenu();placeMenu();paintKey();try{paintPanel();}catch(e){}}
function ccStateSafe(){try{return ccState();}catch(e){return {};}}
function thinkOnSafe(){try{return thinkOn();}catch(e){return state.thinking!==false;}}
function openMenu(){if(!ensureKey())return;buildMenu();menu.hidden=false;key.setAttribute("aria-expanded","true");hidePop();placeMenu();
  var on=menu.querySelector('.eff-opt[role="menuitemradio"][aria-checked="true"]')||menu.querySelector(".eff-opt");try{on.focus({preventScroll:true});}catch(e){}}
function closeMenu(){if(!menu||menu.hidden)return;menu.hidden=true;key.setAttribute("aria-expanded","false");hidePop();}

/* the explanation beside a choice: what it does with the model now chosen, said from the same numbers the app uses */
function serviceName(){var p=provider();if(!p)return "";return ({anthropic:"Claude",openai:"OpenAI",openrouter:"OpenRouter",gemini:"Gemini",moonshot:"Kimi (Moonshot)",lmstudio:"LM Studio","ollama-local":"Ollama","ollama-lan":"Ollama","ollama-cloud":"Ollama's cloud","openai-compat":"the connected service",ingenium:"your other Ingenium"})[p]||"the connected service";}
function popFor(k){var p=provider(),m=modelId(),cl=!!p,out={t:"",ps:[]};
  if(k==="auto"){out.t="Auto";out.ps=["Ingenium reads each message before it goes. A short question goes at Low; an everyday question at Medium; a request to make, change or fix something, a message with files or code, or any work in a Code session, at High; a long, careful brief at Extra.",
      "It never chooses Max: that is yours to choose. Under each reply it says what it chose, and why."];return out;}
  if(k==="ultra"){out.t="Ultracode";out.ps=["At Max effort, in four phases you can watch: it plans (the plan shows as a checklist, each task checked off when done), builds, runs checks inside the app as it runs (pressing its buttons and reading what they show), and fixes what fails.",
      "It carries on until every check passes and the app shows no errors. If one failure resists three different fixes, it stops and says why. A connected model does this far better than a small model on this device."];return out;}
  if(k==="think"){out.t="Thinking";out.ps=["On, the model's reasoning shows before its answer (tap Thinking on a reply). Off, Claude's newest models still think but do not show it; other models answer straight away."];return out;}
  var lv=k==="key"?(ultraOn()?5:setLv()):+k;if(!(lv>=1&&lv<=5))return null;var L=LV[lv];out.t=L.name+(k==="key"?" (now)":"");
  var how="";
  if(p==="anthropic"){var x=CLAUDE[lv];if(x==="xhigh"&&/^claude-(opus-4-6|sonnet-4-6)/.test(m))x="high";how="Claude is sent Anthropic's own effort setting, “"+x+"”: Claude decides how much to think within it."+(lv>=5?" Its reply may run to 64,000 tokens.":"");}
  else if(cl&&reasoningModel(p,m)&&!REFUSED[p+"|"+m])how=serviceName()+" is sent the reasoning effort “"+reasonOf(lv)+"”."+(p==="openrouter"?" OpenRouter passes it to the models that take one.":"");
  else if(/^ollama/.test(p))how=(lv<=1?"It answers without thinking.":"It thinks first, when Thinking is on.")+(/gpt-oss/i.test(m)?" gpt-oss is told “"+ollamaThink(m,lv)+"”.":"");
  else if(cl)how=serviceName()+" takes no effort setting: the reply's length and the steps on a task change.";
  else how=lv<=1?"The model on this device answers without thinking.":"The model on this device may think for "+(L.mul===0.5?"half the usual time":L.mul===1?"its usual time":L.mul===2?"twice the usual time":"four times the usual time")+", never more than half its memory.";
  out.ps=[L.line,how,(replyAuto()?"Its reply may run to "+fmt(replyRoom(lv,cl))+" tokens"+(cl?"":" (on this device, at most a quarter of its memory)")+". ":"")+"On a task with files it may take up to "+fmt(cl?L.steps:L.lsteps)+" steps."];
  return out;}
function showPop(anchor,k){var o=popFor(k);if(!o)return;if(!pop){pop=mk("div","eff-pop");pop.id="effPop";pop.setAttribute("role","tooltip");pop.hidden=true;document.body.appendChild(pop);}
  pop.innerHTML="";pop.appendChild(mk("b",null,o.t));o.ps.forEach(function(s){pop.appendChild(mk("p",null,s));});pop.hidden=false;
  try{var r=anchor.getBoundingClientRect(),w=pop.offsetWidth||300,h=pop.offsetHeight||120,mr=menu&&!menu.hidden?menu.getBoundingClientRect():null;
    var left=mr?(mr.left-w-10>=8?mr.left-w-10:Math.min(innerWidth-w-8,mr.right+10)):Math.max(8,Math.min(r.right-w,innerWidth-w-8));
    var top=mr?Math.max(8,Math.min(r.top,innerHeight-h-8)):Math.max(8,r.top-h-10);
    if(mr&&left+w>innerWidth-8){left=Math.max(8,mr.left);top=Math.max(8,mr.top-h-8);}
    pop.style.left=Math.round(left)+"px";pop.style.top=Math.round(top)+"px";}catch(e){}
  anchor.setAttribute("aria-describedby","effPop");}
function hidePop(){if(pop)pop.hidden=true;}

/* ================= 3. the plan: in the reply, and in the column beside the conversation ================= */
function planOf(c){c=c||cur();var ms=(c&&c.messages)||[];for(var i=ms.length-1;i>=0;i--)if(ms[i].role==="bot"&&ms[i].plan&&ms[i].plan.tasks&&ms[i].plan.tasks.length)return {plan:ms[i].plan,msg:ms[i]};return null;}
function counts(p){var d=0,n=p.tasks.length;p.tasks.forEach(function(t){if(t.s==="done")d++;});return {d:d,n:n};}
function li(t){var l=mk("li",t.s);var m=mk("span","pl-mk");m.setAttribute("aria-hidden","true");if(t.s==="done")m.textContent="✓";l.appendChild(m);
  var s=mk("span","pl-t",t.t);l.appendChild(s);l.setAttribute("aria-label",(t.s==="done"?"Done: ":t.s==="doing"?"Now: ":"To do: ")+t.t);if(t.check)l.title="Checked by: "+t.check;return l;}
function planList(p,full){var ul=mk("ul","pl-list"),tasks=p.tasks,box=document.createDocumentFragment();
  if(full||tasks.length<=8){tasks.forEach(function(t){ul.appendChild(li(t));});box.appendChild(ul);return box;}
  var first=0;while(first<tasks.length&&tasks[first].s==="done")first++;
  var hideBefore=Math.max(0,first-2),shownEnd=Math.min(tasks.length,Math.max(first+4,hideBefore+6)),after=tasks.length-shownEnd;
  if(hideBefore>0){var a=mk("button","pl-more",hideBefore+" earlier step"+(hideBefore===1?"":"s")+" done");a.type="button";a.onclick=function(e){e.stopPropagation();var host=a.parentNode;host.innerHTML="";host.appendChild(planList(p,true));};box.appendChild(a);}
  tasks.slice(hideBefore,shownEnd).forEach(function(t){ul.appendChild(li(t));});box.appendChild(ul);
  if(after>0){var b=mk("button","pl-more",after+" more to go");b.type="button";b.onclick=function(e){e.stopPropagation();var host=b.parentNode;host.innerHTML="";host.appendChild(planList(p,true));};box.appendChild(b);}
  return box;}
function planCard(mm){var p=mm.plan,k=counts(p),card=mk("div","pl-card");card.setAttribute("role","group");card.setAttribute("aria-label","Plan: "+k.d+" of "+k.n+" done");
  var h=mk("div","pl-head");h.appendChild(mk("span","pl-title","Plan"));h.appendChild(mk("span","pl-count",k.d+" of "+k.n+" done"));
  var o=mk("button","pl-open","In the panel");o.type="button";o.title="Show the plan in the column beside the conversation";o.onclick=function(e){e.stopPropagation();panelOpen("plan",true);};h.appendChild(o);
  card.appendChild(h);var body=mk("div","pl-body");body.appendChild(planList(p,false));card.appendChild(body);return card;}
function effSays(mm){var e=mm.eff;if(!e||!(e.auto||e.ultra))return null;var L=LV[e.lv];if(!L)return null;
  return mk("div","eff-says",e.ultra?"Ultracode, at Max effort.":"Auto chose "+L.name+" effort"+(e.why?": "+e.why+".":"."));}

/* the column */
var PANEL={plan:false,session:false};
function panelHost(){var p=$id("ccPanel");if(p)return p;var col=$id("chatCol"),card=col&&col.querySelector(".chat-card");if(!col||!card)return null;
  p=mk("aside","card");p.id="ccPanel";p.setAttribute("aria-label","Plan and session");card.parentNode.insertBefore(p,card.nextSibling);return p;}
function panelOpen(which,on){PANEL[which]=on===undefined?!PANEL[which]:!!on;var cs=ccStateSafe();cs.panel={plan:PANEL.plan,session:PANEL.session};try{saveState();}catch(e){}paintPanel();paintTopKeys();
  if(PANEL[which]){var h=panelHost();if(h){var sec=h.querySelector('[data-sec="'+which+'"]');if(sec)try{sec.scrollIntoView({block:"nearest"});}catch(e){}}}}
var panelT=null;function soonPanel(){clearTimeout(panelT);panelT=setTimeout(function(){try{paintPanel();}catch(e){}},120);}
function onChatPage(){var s=$id("page-chat");return !!(s&&s.classList.contains("active"));}
function over(){if((innerWidth||1200)<1100)return true;var col=$id("chatCol");if(!col)return false;var cw=col.getBoundingClientRect().width,b=document.body;
  var stage=b.classList.contains("cs-on")&&!/^(float|full)$/.test(b.getAttribute("data-csview")||"")&&b.getAttribute("data-cschat")!=="hidden";
  return cw<(stage?480+12+420:480)+12+300;}
function paintPanel(){var h=panelHost();if(!h)return;var c=cur(),code=isCode(c),show=onChatPage()&&(PANEL.plan||PANEL.session)&&!!c&&(code||!!planOf(c));
  document.body.classList.toggle("ccp-on",show);document.body.classList.toggle("ccp-over",show&&over());
  if(show&&over()){try{var tb=document.querySelector(".topbar"),t=tb?Math.round(tb.getBoundingClientRect().bottom)+8:70;document.body.style.setProperty("--ccp-top",t+"px");}catch(e){}}
  if(!show){h.innerHTML="";return;}
  h.innerHTML="";var top=mk("div","ccp-top");top.appendChild(mk("h2",null,PANEL.plan&&PANEL.session?"Plan and session":PANEL.plan?"Plan":"Session"));
  var x=mk("button","chat-top-key sq","✕");x.type="button";x.title="Close this column";x.setAttribute("aria-label","Close the plan and session column");x.onclick=function(){PANEL.plan=PANEL.session=false;ccStateSafe().panel={plan:false,session:false};try{saveState();}catch(e){}paintPanel();paintTopKeys();};
  top.appendChild(x);h.appendChild(top);var body=mk("div","ccp-body");h.appendChild(body);
  if(PANEL.plan){var sec=mk("section","ccp-sec");sec.setAttribute("data-sec","plan");var P=planOf(c);
    var hh=mk("div","ccp-h","Tasks");if(P){var k=counts(P.plan);hh.appendChild(mk("span",null,k.d+" of "+k.n+" done"));}sec.appendChild(hh);
    if(P){var lst=mk("div","ccp-plan");lst.appendChild(planList(P.plan,true));sec.appendChild(lst);}
    else sec.appendChild(mk("div","ccp-empty",ultraOn(c)?"The plan appears here as soon as the model records it: with Ultracode it always does.":"When a task takes more than two steps, the model keeps a plan, and it appears here, each task checked off as it is done. With Ultracode on, every task has one."));
    body.appendChild(sec);}
  if(PANEL.session&&code){paintSession(body,c);}}
var OPEN={context:false,changes:true,outputsAll:false};
function sec(body,key,title,opts){opts=opts||{};var S=mk("section","ccp-sec");S.setAttribute("data-sec",key);var hd;
  if(opts.fold){hd=mk("button","ccp-hd");hd.type="button";hd.setAttribute("aria-expanded",OPEN[key]?"true":"false");hd.appendChild(document.createTextNode(title+" "));hd.appendChild(mk("span","tw","▶"));
    hd.onclick=function(){OPEN[key]=!OPEN[key];paintPanel();};}
  else{hd=mk("div","ccp-hd",title);}
  if(opts.sum)hd.appendChild(opts.sum);if(opts.gear)hd.appendChild(opts.gear);S.appendChild(hd);var inner=mk("div","ccp-in");if(opts.fold&&!OPEN[key])inner.hidden=true;S.appendChild(inner);body.appendChild(S);return inner;}
function row(icon,text,title){var r=mk("div","ccp-row");r.appendChild(mk("span","ccp-ic",icon));var n=mk("span","nm",text);if(title)n.title=title;r.appendChild(n);return r;}
function paintSession(body,c){var pr=null;try{pr=ccProj();}catch(e){}
  /* Environment: where the files are, and where the model runs; the gear opens Controls (the engine and the connection) */
  var gear=mk("button","ccp-gear");gear.type="button";gear.title=W.IngEnv?"Edit the environment: network access, secrets, the setup script and its variables (6.16)":"Where the model runs: the engine and the connection (Controls)";gear.setAttribute("aria-label",W.IngEnv?"Edit the environment":"Open Controls");
  gear.innerHTML=svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>');
  /* 6.16, her words (4 November 2026): "When I click on the Settings button for the Environment section ... it just opens up the
     Controls panel, it does not open the settings for the editing the Environment unlike Claude's coding chat settings". The gear opens
     the environment (modules/r223.js); the engine and the connection are that dialog's last row, and still in Controls. */
  gear.onclick=function(){if(W.IngEnv&&IngEnv.open){IngEnv.open(c&&c.id);return;}var k=$id("chatCtlBtn");if(k&&k.getAttribute("aria-expanded")!=="true")k.click();};
  var env=sec(body,"session","Environment",{gear:gear});
  try{if(W.IngEnv&&IngEnv.row)env.appendChild(IngEnv.row(c));}catch(e){}
  var cl=!!provider(),mname="";try{if(cl)mname=String(state.cloud.model||"");else{var m=state.models.filter(function(x){return x.id===state.activeModelId;})[0];mname=m?m.customName:"";}}catch(e){}
  env.appendChild(row("⌂","Ingenium, on this device","The app's files are kept here, on this device; every change is kept as a version you can undo."));
  env.appendChild(row("</>",pr?pr.name+" · "+(pr.files||[]).length+" file"+((pr.files||[]).length===1?"":"s"):"No app chosen yet",pr?"The app this session works on":"Choose an app at the top of the left column"));
  env.appendChild(row("◉",mname?(cl?serviceName()+": "+mname:mname+" (on this device)"):"No model chosen",cl?"The model answers through your connection":"The model runs on this device"));
  /* Context: how much of the model's memory the session uses */
  var pill=$id("ingMemPill"),pc=0,line="Measured after the next reply.";
  if(pill){var bb=pill.querySelector("b");pc=bb?parseFloat(bb.style.width)||0:0;line=(pill.getAttribute("aria-label")||"").replace(/^Memory:\s*/,"")||line;}
  var sum=mk("span","sum");sum.appendChild(document.createTextNode(Math.round(pc)+"%"));var mini=mk("span","mini"),mb=mk("b");mb.style.width=Math.min(100,pc)+"%";mini.appendChild(mb);sum.appendChild(mini);
  var cx=sec(body,"context","Context",{fold:true,sum:sum});var cr=mk("div","ccp-row");var cn=mk("span","nm",line);cn.style.whiteSpace="normal";cr.appendChild(cn);cx.appendChild(cr);
  var bar=mk("div","ccp-bar"),b2=mk("b");b2.style.width=Math.min(100,pc)+"%";bar.appendChild(b2);cx.appendChild(bar);
  /* Outputs: the files this session made or changed */
  var out=sec(body,"outputs","Outputs"),seen={},files=[];
  (c.messages||[]).forEach(function(m){(m.edits||[]).forEach(function(e){if(e&&e.file&&!seen[e.file]){seen[e.file]=1;files.push(e.file);}});});files.reverse();
  if(!files.length)out.appendChild(mk("div","ccp-empty","Files this session makes or changes appear here."));
  files.slice(0,OPEN.outputsAll?files.length:5).forEach(function(n){var b3=mk("button","ccp-row");b3.type="button";b3.appendChild(mk("span","ccp-ic","</>"));b3.appendChild(mk("span","nm",n));b3.title="Open "+n;
    b3.onclick=function(){try{edOpen({file:n});}catch(e){try{ccShowPreview();}catch(_){}}};out.appendChild(b3);});
  if(files.length>5){var more=mk("button","ccp-more",OPEN.outputsAll?"Show fewer":"Show more ("+(files.length-5)+")");more.type="button";more.onclick=function(){OPEN.outputsAll=!OPEN.outputsAll;paintPanel();};out.appendChild(more);}
  /* Changes: the lines this session added and removed, file by file */
  var csum=mk("span","sum","…");var ch=sec(body,"changes","Changes",{fold:true,sum:csum});var list=mk("div");ch.appendChild(list);
  if(pr)sessionChanges(pr,c).then(function(rows){list.innerHTML="";if(!rows.length){csum.textContent="none yet";list.appendChild(mk("div","ccp-empty","No changes in this session yet."));return;}
      var A=0,D=0,big=false;rows.forEach(function(x){var rw=mk("div","ccp-row");rw.appendChild(mk("span","ccp-ic","±"));rw.appendChild(mk("span","nm",x.file));if(x.big){big=true;rw.appendChild(mk("span",null,"changed"));}else{rw.appendChild(mk("span","ad","+"+fmt(x.add)));rw.appendChild(mk("span","rm","−"+fmt(x.del)));A+=x.add;D+=x.del;}list.appendChild(rw);});
      csum.innerHTML="";csum.appendChild(mk("span","ad","+"+fmt(A)));csum.appendChild(mk("span","rm","−"+fmt(D)));if(big)csum.appendChild(document.createTextNode(" and more"));},function(){csum.textContent="";});
  else csum.textContent="";
  var keys=mk("div","ccp-keys"),u=mk("button","btn xs ghost","Undo last change");u.type="button";u.onclick=function(){try{ccUndo();}catch(e){}setTimeout(paintPanel,300);};
  var d=mk("button","btn xs ghost","Download the app");d.type="button";d.onclick=function(){try{ccDownload(pr);}catch(e){}};if(pr){keys.appendChild(u);keys.appendChild(d);}ch.appendChild(keys);
  /* Background tasks: what runs while she works */
  var jb=sec(body,"jobs","Background tasks"),jbox=mk("div","ccp-jobs");jb.appendChild(jbox);paintJobs(jbox,jobsNow());}
/* this session's changes, file by file: the text before its first change against the text now (lines added and removed) */
function lineDiff(a,b){var A=String(a).split("\n"),B=String(b).split("\n"),p=0;while(p<A.length&&p<B.length&&A[p]===B[p])p++;var s=0;while(s<A.length-p&&s<B.length-p&&A[A.length-1-s]===B[B.length-1-s])s++;
  A=A.slice(p,A.length-s);B=B.slice(p,B.length-s);if(!A.length||!B.length)return {add:B.length,del:A.length};
  if(A.length*B.length>4e6){var cnt={};A.forEach(function(x){cnt[x]=(cnt[x]||0)+1;});var add=0;B.forEach(function(x){if(cnt[x])cnt[x]--;else add++;});var del=0;for(var k in cnt)del+=cnt[k];return {add:add,del:del};}
  var n=A.length,m=B.length,prev=new Int32Array(m+1),row=new Int32Array(m+1);for(var i=1;i<=n;i++){for(var j=1;j<=m;j++)row[j]=A[i-1]===B[j-1]?prev[j-1]+1:Math.max(prev[j],row[j-1]);var t=prev;prev=row;row=t;}
  var l=prev[m];return {add:m-l,del:n-l};}
var CHG={key:"",p:null};
function sessionChanges(pr,c){var k=c.id+":"+(pr.versions||[]).filter(function(v){return v.chat===c.id;}).length+":"+(pr.updated||0);if(CHG.key===k&&CHG.p)return CHG.p;CHG.key=k;CHG.p=sessionChanges0(pr,c);return CHG.p;}
function sessionChanges0(pr,c){var by={};(pr.versions||[]).forEach(function(v){if(v.chat!==c.id)return;if(!by[v.file])by[v.file]={first:v};});
  var names=Object.keys(by);if(!names.length)return Promise.resolve([]);
  return Promise.all(names.map(function(n){var v=by[n].first,f=null;try{f=ccFile(pr,n);}catch(e){}
    var before=v.lost?Promise.resolve(null):v.prev?IngBig.load(v.prev):Promise.resolve(""),now=f?ccLoad(f):Promise.resolve("");
    return Promise.all([before,now]).then(function(x){var a=x[0],b=x[1];if(a==null||b==null)return {file:n,big:true};if(a.length>3e6||b.length>3e6)return {file:n,big:true};var d=lineDiff(a,b);return {file:n,add:d.add,del:d.del};},function(){return {file:n,big:true};});}));}

/* the keys in the top row */
var topKeys=null;
function svg(p){return '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>';}
function ensureTopKeys(){if(topKeys&&document.body.contains(topKeys))return true;var top=document.querySelector("#page-chat .chat-top"),anchor=$id("chatCtlBtn");if(!top||!anchor)return false;
  topKeys=mk("span","ccp-keys-top");topKeys.id="ccpKeys";
  var a=mk("button","chat-top-key");a.type="button";a.id="ccpPlanKey";a.innerHTML=svg('<path d="M9 6h11M9 12h11M9 18h11"/><path d="M3.5 6l1.5 1.5L7.5 5"/><path d="M3.5 12l1.5 1.5L7.5 11"/><circle cx="5" cy="18" r="1.4"/>')+'<span class="lbl">Plan</span><span class="n"></span>';
  a.title="The plan: its tasks, each checked off when done";a.onclick=function(){panelOpen("plan");};
  var b=mk("button","chat-top-key");b.type="button";b.id="ccpSessKey";b.innerHTML=svg('<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M15 4v16"/>')+'<span class="lbl">Session</span>';
  b.title="The session: where it works, how much memory it uses, the files it made and the lines it changed";b.onclick=function(){panelOpen("session");};
  topKeys.appendChild(a);topKeys.appendChild(b);top.insertBefore(topKeys,anchor);return true;}
function paintTopKeys(){if(!ensureTopKeys())return;var c=cur(),code=isCode(c)&&W.CC&&CC.mode==="code",P=planOf(c);
  topKeys.hidden=!(code||(W.CC&&CC.mode==="chat"&&P));
  var a=$id("ccpPlanKey"),b=$id("ccpSessKey");a.classList.toggle("on",PANEL.plan);a.setAttribute("aria-pressed",PANEL.plan?"true":"false");
  b.classList.toggle("on",PANEL.session);b.setAttribute("aria-pressed",PANEL.session?"true":"false");b.hidden=!code;
  var n=a.querySelector(".n");if(P){var k=counts(P.plan);n.textContent=k.d+"/"+k.n;}else n.textContent="";}
function planChanged(bot){try{var c=cur();if(!c)return;var cs=ccStateSafe();
    if(!PANEL.plan&&!(cs.panel&&cs.panel.closedPlan)&&!over()&&(isCode(c)||ultraOn(c))){PANEL.plan=true;cs.panel={plan:true,session:PANEL.session};}
    paintPanel();paintTopKeys();}catch(e){}}

/* ================= 3b. background tasks: work that runs while she does other things ================= */
/* IngJobs.start({id, title, kind, stop}) / update(id, {step}) / end(id): any part of the app may list its long work here.
   Two kinds are read from the page itself: the reply being written (in any conversation), and models being installed. */
var JOBS={},SEEN={};
function jobsNow(){var L=[],now=Date.now();
  try{var b=W.liveBot;if(busy()&&b){var ch=null;(state.chats||[]).some(function(c){if((c.messages||[]).indexOf(b)>=0){ch=c;return true;}return false;});
      var u="";if(ch){for(var i=ch.messages.length-1;i>=0;i--)if(ch.messages[i].role==="me"){u=String(ch.messages[i].text||"");break;}}
      var st=b.steps&&b.steps.length?b.steps[b.steps.length-1].t:"";
      L.push({id:"reply",kind:"reply",title:(u?"“"+(u.length>60?u.slice(0,57)+"…":u)+"”":"A reply")+(ch&&ch!==cur()?" (another conversation)":""),step:st,t0:t0||now,stop:function(){try{chatStop();}catch(e){}}});}}catch(e){}
  try{if(typeof lineupJobs!=="undefined"&&lineupJobs)Object.keys(lineupJobs).forEach(function(k){var j=lineupJobs[k];if(!j||j.state!=="running")return;if(!SEEN["i:"+k])SEEN["i:"+k]=now;
      var sp=(W.ING_LINEUP&&ING_LINEUP.models[k])||{},pc=j.total?Math.min(100,Math.round(100*(+j.received||0)/j.total)):0;
      L.push({id:"i:"+k,kind:"install",title:"Installing "+(sp.name||k),step:pc+"%"+(j.phase?" · "+j.phase:""),t0:SEEN["i:"+k],stop:function(){try{lineupCancel(k);}catch(e){}}});});}catch(e){}
  Object.keys(JOBS).forEach(function(id){var j=JOBS[id];L.push({id:id,kind:j.kind||"task",title:j.title,step:j.step||"",t0:j.t0,stop:j.stop||null});});
  return L;}
var IngJobs={start:function(o){if(!o||!o.id)return;JOBS[o.id]={title:String(o.title||"A task"),kind:o.kind||"task",step:o.step||"",t0:Date.now(),stop:typeof o.stop==="function"?o.stop:null};soonPanel();},
  update:function(id,o){var j=JOBS[id];if(!j)return;if(o&&o.step!=null)j.step=String(o.step);if(o&&o.title)j.title=String(o.title);},
  end:function(id){delete JOBS[id];soonPanel();},list:jobsNow};
var jobTick=null;
function tickJobs(){var h=$id("ccPanel");if(!h||!document.body.classList.contains("ccp-on")){clearInterval(jobTick);jobTick=null;return;}
  var L=jobsNow(),box=h.querySelector('[data-sec="jobs"] .ccp-jobs');if(!box)return;var ids=L.map(function(j){return j.id;}).join("|");
  if(box.getAttribute("data-ids")!==ids){paintJobs(box,L);return;}
  L.forEach(function(j){var r=box.querySelector('[data-job="'+j.id.replace(/"/g,"")+'"]');if(!r)return;var tm=r.querySelector(".tm");if(tm)tm.textContent=clock((Date.now()-j.t0)/1000);var sp=r.querySelector(".st");if(sp)sp.textContent=j.step?" · "+j.step:"";});}
function paintJobs(box,L){box.innerHTML="";box.setAttribute("data-ids",L.map(function(j){return j.id;}).join("|"));var c=cur(),Q=(c&&c.queue)||[];
  if(!L.length&&!Q.length){box.appendChild(mk("div","ccp-empty","Nothing is running. A reply being written, a model being installed, and messages waiting their turn show here."));return;}
  L.forEach(function(j){var r=mk("div","ccp-row");r.setAttribute("data-job",j.id.replace(/"/g,""));r.appendChild(mk("span","spin"));var nm=mk("span","nm");nm.appendChild(document.createTextNode(j.title));nm.appendChild(mk("span","st",j.step?" · "+j.step:""));
    nm.title=j.title+(j.step?" · "+j.step:"");r.appendChild(nm);r.appendChild(mk("span","tm",clock((Date.now()-j.t0)/1000)));
    if(j.stop){var x=mk("button","stop");x.type="button";x.title="Stop it";x.setAttribute("aria-label","Stop: "+j.title);x.onclick=function(){j.stop();setTimeout(function(){soonPanel();},200);};r.appendChild(x);}box.appendChild(r);});
  Q.forEach(function(q,i){var r=mk("div","ccp-row");r.appendChild(mk("span","ccp-ic","⏳"));var nm=mk("span","nm","Queued: “"+(q.text.length>60?q.text.slice(0,57)+"…":q.text)+"”");nm.title=q.text;r.appendChild(nm);
    var x=mk("button","stop");x.type="button";x.title="Take it off the queue";x.setAttribute("aria-label","Take off the queue: "+q.text.slice(0,60));x.onclick=function(){c.queue.splice(i,1);try{saveState();}catch(e){}paintQueue();soonPanel();};r.appendChild(x);box.appendChild(r);});
  if(!jobTick&&L.length)jobTick=setInterval(tickJobs,1000);}

/* ================= 4. the working clock, above the message box ================= */
var work=null,t0=0,tick=null;
function ensureWork(){if(work&&document.body.contains(work))return true;var comp=document.querySelector("#page-chat .composer");if(!comp)return false;
  work=mk("div","cc-work");work.id="ccWork";work.hidden=true;work.setAttribute("role","status");work.setAttribute("aria-live","off");
  work.innerHTML='<span class="cw-dot" aria-hidden="true"></span><span class="cw-what">Working</span><span class="cw-time"></span><span class="cw-step"></span>';
  var st=mk("button","btn xs ghost cw-stop","Stop");st.type="button";st.title="Stop this reply (what it changed so far is kept)";st.onclick=function(){try{chatStop();}catch(e){}};work.appendChild(st);
  comp.insertBefore(work,comp.firstChild);return true;}
function clock(s){s=Math.max(0,Math.round(s));var m=Math.floor(s/60),r=s%60;return m?m+"m "+(r<10?"0":"")+r+"s":r+"s";}
function paintWork(){if(!ensureWork())return;var b=W.liveBot,on=busy()&&!!b&&!!cur()&&(cur().messages||[]).indexOf(b)>=0;work.hidden=!on;if(!on)return;
  var st=b.steps&&b.steps.length?b.steps[b.steps.length-1].t:"",what=b.ask&&!b.ask.done?"Waiting for you":(b.status==="thinking"||(!b.text&&!st))?"Thinking":st?"Working":"Writing";
  work.querySelector(".cw-what").textContent=what;work.querySelector(".cw-time").textContent=clock((Date.now()-t0)/1000);work.querySelector(".cw-step").textContent=st?"· "+st:"";}
function startWork(){t0=Date.now();clearInterval(tick);tick=setInterval(paintWork,1000);paintWork();}
function stopWork(){clearInterval(tick);tick=null;paintWork();}

/* ================= 5. the queue: a message written while a reply is made waits for its end ================= */
var qbox=null;
function ensureQueue(){if(qbox&&document.body.contains(qbox))return true;var comp=document.querySelector("#page-chat .composer"),inp=$id("chatInput");if(!comp||!inp)return false;
  qbox=mk("div","cc-queue");qbox.id="ccQueue";qbox.hidden=true;comp.insertBefore(qbox,inp.parentNode===comp?inp:comp.firstChild);return true;}
function paintQueue(){if(!ensureQueue())return;var c=cur(),Q=(c&&c.queue)||[];qbox.hidden=!Q.length;qbox.innerHTML="";if(!Q.length)return;
  qbox.appendChild(mk("div","cq-h","Queued: sent when the reply ends"));
  Q.forEach(function(q,i){var it=mk("div","cq-item");it.appendChild(mk("span",null,q.text));var x=mk("button",null,"✕");x.type="button";x.title="Take this message off the queue (it goes back into the box)";x.setAttribute("aria-label","Take off the queue: "+q.text.slice(0,60));
    x.onclick=function(){c.queue.splice(i,1);var inp=$id("chatInput");if(inp&&!inp.value.trim()){inp.value=q.text;try{inp.dispatchEvent(new Event("input",{bubbles:true}));}catch(_){}}try{saveState();}catch(_){}paintQueue();};it.appendChild(x);qbox.appendChild(it);});}
function queueFromInput(){var inp=$id("chatInput"),c=cur();if(!inp||!c)return false;var t=inp.value.trim();if(!t)return false;
  var staged=false;try{staged=(typeof stagedFiles!=="undefined"&&stagedFiles.length)||(typeof stagedImage!=="undefined"&&!!stagedImage);}catch(e){}
  if(staged){try{ingToast("A message with files or a picture is sent when this reply ends: press Enter again then.");}catch(e){}return false;}
  (c.queue=c.queue||[]).push({text:t,at:Date.now()});inp.value="";inp.style.height="";try{saveState();}catch(e){}paintQueue();
  try{ingToast("Queued: it is sent when this reply ends.");}catch(e){}return true;}
var qTimer=null;
function drain(){clearTimeout(qTimer);qTimer=setTimeout(function(){if(busy()||!onChatPage())return;var c=cur();if(!c||!c.queue||!c.queue.length)return;
    var inp=$id("chatInput");if(!inp)return;if(inp.value.trim())return;   /* she is writing: her words first, the queue waits */
    var q=c.queue.shift();try{saveState();}catch(e){}paintQueue();inp.value=q.text;try{sendChat();}catch(e){}},700);}
function placeholder(){var inp=$id("chatInput");if(!inp)return;if(busy()){if(!inp.__r215ph){inp.__r215ph=inp.placeholder;inp.placeholder="The reply is being written. Enter queues your message for when it ends.";}}
  else if(inp.__r215ph){inp.placeholder=inp.__r215ph;inp.__r215ph=null;}}

/* ================= 6. checks run inside the app as it runs (Ultracode's run_check) ================= */
var CHECK_JS='<scr'+'ipt>(function(){window.addEventListener("message",function(e){var d=e.data;if(!d||typeof d!=="object"||!d.__ingCheck||e.source!==window.parent)return;var id=d.__ingCheck;'+
  'function send(r){try{r.__ingCheckRes=id;window.parent.postMessage(r,"*");}catch(_){}}'+
  'try{var f=new Function("return (async function(){\\n"+String(d.code||"")+"\\n})()");Promise.resolve(f()).then(function(v){var s;try{s=typeof v==="string"?v:JSON.stringify(v);}catch(_){s=String(v);}'+
  'send({pass:v===true,value:String(s===undefined?"undefined":s).slice(0,600)});},function(err){send({pass:false,error:String(err&&err.message||err).slice(0,600)});});}'+
  'catch(err){send({pass:false,error:String(err&&err.message||err).slice(0,600)});}});})();<\/scr'+'ipt>';
function wrapStage(){if(typeof W.ingStageDoc!=="function"||W.ingStageDoc.__r215)return;var o=W.ingStageDoc;
  W.ingStageDoc=function(html){var out=o.apply(this,arguments),m=/^(﻿?\s*<!doctype[^>]*>)/i.exec(out);return m?m[1]+CHECK_JS+out.slice(m[1].length):CHECK_JS+out;};keepMarks(W.ingStageDoc,o);W.ingStageDoc.__r215=1;
  try{ingStageDoc=W.ingStageDoc;}catch(e){}}

/* ================= 7. the Guide: effort, Auto and Ultracode, and the Code session ================= */
function guideCard(){var g=$id("page-guide");if(!g||$id("guideEffortCard"))return;var card=mk("div","card");card.id="guideEffortCard";
  var h=mk("h2","sec","Effort, Auto and Ultracode");card.appendChild(h);
  card.appendChild(mk("p",null,"The key beside the model's name, under the message box, sets how hard the model works on each message. It means the same on every kind of model: how much it thinks, how long its reply may be, and how many steps it may take on a task with files. It does not change how a model on this device chooses its words: that stays at its maker's settings."));
  var rows=[["1","Low to Max.",LV.slice(1).map(function(L){return L.name+": "+L.line.replace(/\.$/,"")+" (replies up to "+fmt(L.room)+" tokens; up to "+L.steps+" steps with a connected model, "+L.lsteps+" with one on this device)";}).join(". ")+"."],
    ["2","What each model is told.","Claude is sent Anthropic's own effort setting (low, medium, high, xhigh for Extra, max); Claude decides how much to think within it. OpenAI's reasoning models and Gemini's are sent a reasoning effort (low, medium or high), and OpenRouter passes one on; a service that refuses it is asked again without it, once. Ollama thinks from Medium up, and gpt-oss is told low, medium or high. A model on this device thinks not at all at Low, half its usual time at Medium, its usual time at High, twice as long at Extra and four times as long at Max, never more than half its memory. Other services take no effort setting: only the reply's length and the steps change."],
    ["3","Auto.","Ingenium reads each message before it goes. A short question goes at Low; an everyday question at Medium; a request to make, change or fix something, a message with files or code, or work in a Code session, at High; a long, careful brief (or one that asks for a thorough review, an audit, a proof or research) at Extra. It never chooses Max. Under each reply it says what it chose and why."],
    ["4","Ultracode.","For Code, and for a chat with files: Max effort, in four phases you can watch. It plans (the plan appears as a checklist beside the conversation, each task checked off when done), builds, checks, and fixes. Its checks run inside your app as it runs: small scripts that press its buttons and read what they show, each passing only when it returns true; you can read each one in the steps under the reply. It carries on until every check passes and the app shows no errors; if one failure resists three different fixes, it stops and says plainly what fails and why. Ingenium itself checks before it lets it finish: unfinished tasks, errors at the last run, a change not yet run, or a failed check send it back to work, up to three times."],
    ["5","Ultracode with your way of working.","For me: it does all of it and every change is kept as a version you can undo. With me: it shows each change before it is made, and waits. Guide me: you make each change yourself, so Ultracode has nothing to build and stays off. With Plan first on as well, it plans and waits for your go-ahead before building."],
    ["6","Honest limits.","A check is only as good as what it tests: read the checks in the steps. A small model on this device often struggles with Ultracode's long tasks; a connected model (Claude, GPT, Kimi and others) does them far better. Higher effort costs more time, and with a paid service more money."],
    ["7","The Code session.","Plan shows the tasks, checked off as they are done, in a column beside the conversation; Session shows where the work happens, how much of the model's memory it uses, the files it made and the lines it changed. While a reply is written, a clock above the message box shows how long it has worked and its latest step, with a key to stop it. Enter then queues your next message: it is sent when the reply ends (the ✕ beside it takes it back)."]];
  rows.forEach(function(r){var t=mk("div","tip");t.appendChild(mk("span","tip-mark",r[0]));var d=mk("div");d.appendChild(mk("b",null,r[1]+" "));d.appendChild(document.createTextNode(r[2]));t.appendChild(d);card.appendChild(t);});
  var tour=$id("guideTourCard"),next=tour?tour.nextElementSibling:null;if(next&&next.parentNode===g)g.insertBefore(card,next.nextElementSibling);else g.appendChild(card);}
function openGuide(){try{go("guide");}catch(e){}setTimeout(function(){var c=$id("guideEffortCard");if(c)try{c.scrollIntoView({behavior:"smooth",block:"start"});}catch(e){c.scrollIntoView();}},250);}

/* ================= 7b. widths: the message box's row and the top row adapt to the room they have ================= */
var RO=null;
function fit(){var comp=document.querySelector("#page-chat .composer"),card=document.querySelector("#page-chat .chat-card");
  if(comp){var w=comp.getBoundingClientRect().width;if(w>0){comp.classList.toggle("cb-tight",w<600);comp.classList.remove("cb-wrap");var bar=comp.querySelector(".composer-bar");if(bar&&bar.scrollWidth>bar.clientWidth+1)comp.classList.add("cb-wrap");}}
  if(card){var cw=card.getBoundingClientRect().width;if(cw>0)card.classList.toggle("r215-tight",cw<620);}}
function watchFit(){if(RO||typeof ResizeObserver==="undefined")return;var comp=document.querySelector("#page-chat .composer"),card=document.querySelector("#page-chat .chat-card");if(!comp||!card)return;
  RO=new ResizeObserver(function(){try{fit();}catch(e){}});RO.observe(comp);RO.observe(card);}

/* ================= 7c. a name asked in Ingenium's own dialog, not the browser's grey one (her picture of 4 November) ================= */
/* ingPrompt({title, text, value, yes, placeholder}) -> a promise of the words written, or null */
function ingPrompt(o){o=o||{};return new Promise(function(res){var done=false;function end(v){if(done)return;done=true;try{closeModal();}catch(e){}res(v);}
  var box;try{box=modalOpen('<div class="ing-ask"><h3></h3><p></p><input type="text" class="ing-ask-in" maxlength="200"><div class="ing-ask-keys"></div></div>');}catch(e){res(null);return;}
  box.querySelector("h3").textContent=o.title||"";var pp=box.querySelector("p");if(o.text)pp.textContent=o.text;else pp.remove();
  var inp=box.querySelector("input");inp.value=o.value==null?"":String(o.value);if(o.placeholder)inp.placeholder=o.placeholder;inp.setAttribute("aria-label",o.title||"Name");
  var k=box.querySelector(".ing-ask-keys"),no=mk("button","btn ghost",o.no||"Cancel");no.type="button";no.onclick=function(){end(null);};
  var yes=mk("button","btn primary",o.yes||"Keep it");yes.type="button";yes.onclick=function(){var v=inp.value.trim();if(!v&&!o.empty){try{inp.focus();}catch(e){}return;}end(v);};
  inp.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();yes.click();}else if(e.key==="Escape"){e.preventDefault();end(null);}});
  k.appendChild(no);k.appendChild(yes);setTimeout(function(){try{inp.focus();inp.select();}catch(e){}},60);
  try{var root=$id("modalRoot"),mo=new MutationObserver(function(){if(!root.classList.contains("open")||!box.contains(yes)){mo.disconnect();end(null);}});mo.observe(root,{attributes:true,attributeFilter:["class"],childList:true,subtree:true});}catch(e){}});}
W.ingPrompt=ingPrompt;

/* ================= 8. joined to the page ================= */
/* a wrapper keeps the marks earlier parts left on what it wraps (r190 looks for its own, and would otherwise wrap again) */
function keepMarks(n,o){try{Object.keys(o).forEach(function(k){if(/^__r\d+$/.test(k)&&n[k]===undefined)n[k]=o[k];});}catch(e){}return n;}
function hook(){
  if(typeof W.sendRec==="function"&&!W.sendRec.__r215){var os=W.sendRec;W.sendRec=function(rec){try{beforeSend(rec);}catch(e){}var r=os.apply(this,arguments);try{afterSend();}catch(e){}return r;};keepMarks(W.sendRec,os);W.sendRec.__r215=1;try{sendRec=W.sendRec;}catch(e){}}
  if(typeof W.fillMsg==="function"&&!W.fillMsg.__r215){var of=W.fillMsg;W.fillMsg=function(d,mm){of.apply(this,arguments);try{if(!mm||mm.role!=="bot")return;
        var old=d.querySelector(":scope > .pl-card");if(old)old.remove();var os2=d.querySelector(":scope > .eff-says");if(os2)os2.remove();
        if(mm.plan&&mm.plan.tasks&&mm.plan.tasks.length){var card=planCard(mm),steps=d.querySelector(":scope > .ag-steps"),body=d.querySelector(".msg-body,.bubble,.md");
          if(steps)d.insertBefore(card,steps);else if(body&&body.parentNode===d)d.insertBefore(card,body);else d.insertBefore(card,d.firstChild);}
        var s=effSays(mm);if(s&&!mm.live)d.appendChild(s);}catch(e){}};keepMarks(W.fillMsg,of);W.fillMsg.__r215=1;}
  if(typeof W.renderChat==="function"&&!W.renderChat.__r215){var orc=W.renderChat;W.renderChat=function(){var r=orc.apply(this,arguments);try{paintKey();paintTopKeys();paintQueue();paintWork();soonPanel();}catch(e){}return r;};keepMarks(W.renderChat,orc);W.renderChat.__r215=1;}
  if(typeof W.go==="function"&&!W.go.__r215){var og=W.go;W.go=function(){var r=og.apply(this,arguments);try{closeMenu();paintTopKeys();paintPanel();}catch(e){}return r;};keepMarks(W.go,og);W.go.__r215=1;}
  if(typeof Engine!=="undefined"&&Engine&&typeof Engine.on==="function"&&!Engine.__r215){Engine.__r215=1;var was="";
    Engine.on("status",function(s){try{if(s==="busy"&&was!=="busy"){afterSend();startWork();}if(s!=="busy"&&was==="busy"){stopWork();settle();drain();}was=s;placeholder();paintKey();soonPanel();}catch(e){}});}
  var tk=$id("ctlTokens");if(tk&&!tk.__r215){tk.__r215=1;tk.addEventListener("input",function(e){if(e.isTrusted){est().replyAuto=false;try{saveState();}catch(_){}}});}
  var inp=$id("chatInput");if(inp&&!inp.__r215){inp.__r215=1;
    inp.addEventListener("keydown",function(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing)return;if(!(e.metaKey||e.ctrlKey))return;
      e.preventDefault();e.stopImmediatePropagation();if(busy())queueFromInput();else{try{sendChat();}catch(_){}}},true);}
  wrapStage();ensureKey();paintKey();ensureTopKeys();paintTopKeys();ensureWork();ensureQueue();paintQueue();guideCard();watchFit();try{fit();}catch(e){}
  try{var cs=ccStateSafe();if(cs.panel){PANEL.plan=!!cs.panel.plan;PANEL.session=!!cs.panel.session;}}catch(e){}paintPanel();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",hook);else hook();
window.addEventListener("load",function(){hook();setTimeout(hook,1500);});
window.addEventListener("resize",function(){try{paintPanel();}catch(e){}});

W.IngEffort={levels:LV,ultra:ULTRA,levelNow:levelNow,isAuto:isAuto,ultraOn:ultraOn,ultraCan:ultraCan,pick:pick,forRun:forRun,claudeKey:claudeKey,openaiBody:openaiBody,
  ollamaThink:ollamaThink,thinkMul:thinkMul,ctxNow:ctxNow,replyRoom:replyRoom,refused:function(p,m){REFUSED[p+"|"+m]=1;},last:null,beforeSend:beforeSend,popFor:popFor};
W.IngJobs=IngJobs;
W.IngR215={planChanged:planChanged,jobs:jobsNow,queueFromInput:queueFromInput,drain:drain,paintKey:paintKey,openMenu:openMenu,closeMenu:closeMenu,panel:panelOpen,paintPanel:paintPanel,
  planCard:planCard,planOf:planOf,lineDiff:lineDiff,sessionChanges:sessionChanges,hook:hook,PANEL:PANEL,showPop:showPop};
})();
;try{window.__ingParts["p215"]="running";}catch(_){}
</script>
