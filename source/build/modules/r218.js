<style id="r218-css">
/* ============ R218 · BLEND, DEEPENED: CONNECTED AND LOCAL MODELS TOGETHER, EFFORT AND ULTRA, THREE NEW WAYS, THE REASONING SHOWN (Ingenium 6.12, 4 November 2026) ============
   Her words (4 November 2026): "Please deepen and expand the 'Blend' page so that it really enhances the app and provide great and
   powerful blend of models with thorough and precise reasoning and outstanding performance. I want the Blend to get a massive upgrade
   and have its capabilities and functions deepened and expanded to better support Ingenium and all of its many pages and sections. I
   want for Ingenium to work as an ecosystem"; and (3 November) "I want to be able to select low to Max effort and Ultracode inside of
   the chats and everywhere a model can be selected to run a task or do work inside of Ingenium."
   What Blend did before 6.12: only models on this device, one after another; five ways (Pass and refine, Compare and combine, Best of
   the batch, Weigh and agree, Judge and decide); a reply of at most 1,536 tokens (3,584 with thinking); the final answer unexplained.
   Now:
   - her connected models (Claude, GPT, Gemini, Kimi, OpenRouter, Ollama) join a blend beside the models on this device; they answer at
     the same time, while the models on this device answer one after another; a request names its own connection, so the chat's model
     is never switched or counted (cloudChat reads the connection from the request: build_page.py, 6.12);
   - effort as in the chat (Auto, Low to Max) and Ultra, Blend's Ultracode: a plan first (the checklist a complete answer must meet),
     every answer written against it, then the final answer checked by another model and corrected until the check passes;
   - three new ways: Debate and settle (each model reads the others and revises), Check every claim (one writes, the others check
     each claim), Divide the work (the task in parts, one model to each); and Ingenium chooses the way when she wants it to;
   - who writes the final answer can be chosen; under the answer, how it was settled (in the writer's own words, marked so), Ingenium's
     own count of agreement when every answer is short, every check and fix, and the time each step took;
   - the models on this device are ordered so that the one already loaded answers first and the writer last: fewer loads;
   - the answer goes on to the chat, a folder, Notes, Tabula or Word; under any reply in the chat, Check with Blend sends it to be
     checked claim by claim, and the corrected answer can go back to that conversation;
   - a blend kept as a house keeps its connected models, its effort and its writer, and answers in the chat whatever the chat's
     source. */
#page-blend .bl-think{display:none}
#page-blend .blx-cxh{margin:10px 0 4px;font:700 11px/1.2 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
#page-blend .bl-model.blx-cx .blx-ms{max-width:190px;margin-left:auto;font-size:12px;padding:3px 6px}
#page-blend .bl-model.blx-cx .blx-ms + .bl-w{margin-left:6px}
#page-blend .blx-none{font-size:12.5px;line-height:1.5;color:var(--ink-3);margin:4px 0 2px}
#page-blend .blx-none button{border:0;background:none;padding:0;color:var(--accent);font:inherit;font-weight:600;cursor:pointer;text-decoration:underline;text-underline-offset:2px}
#page-blend .blx-grp{margin:10px 0 4px;font:700 11px/1.2 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
#page-blend .blx-grp:first-child{margin-top:2px}
#page-blend .blx-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;margin:12px 0 4px}
#page-blend .blx-row > label{font:600 13px/1.3 var(--sans);color:var(--ink-1)}
#page-blend #blxWriterRow{display:block}
#page-blend #blxWriterRow > label{display:block;margin:0 0 5px}
#page-blend #blxWriterRow select{width:100%;max-width:440px;box-sizing:border-box}
#page-blend .blx-effkey{display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
#page-blend .blx-effkey .eff-gem{display:inline-block;width:9px;height:9px;transform:rotate(45deg);border-radius:2px;background:linear-gradient(135deg,#9b6ff0,#5d37a1);box-shadow:0 0 0 1px rgba(255,255,255,.5) inset}
#page-blend .blx-effkey.ultra{border-color:var(--accent);color:var(--accent)}
#page-blend .blx-effline{flex:1 1 220px;font-size:12px;line-height:1.45;color:var(--ink-3)}
#page-blend .blx-est{margin:8px 0 2px;font-size:12.5px;line-height:1.5;color:var(--ink-2)}
#page-blend .blx-seed{margin:8px 0 2px;padding:9px 11px;border-radius:10px;border:1px solid var(--accent-soft,rgba(106,63,181,.35));background:var(--accent-softer,rgba(106,63,181,.06));font-size:12.5px;line-height:1.5;color:var(--ink-2)}
#page-blend .blx-seed b{color:var(--ink-1)}
#page-blend .blx-seed button{margin-left:6px}
.blx-sec{margin:16px 0 6px;font:700 11px/1.2 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
.blx-sec:first-of-type{margin-top:8px}
.blx-plan{list-style:none;margin:6px 0 2px;padding:0;display:grid;gap:4px}
.blx-plan li{display:flex;gap:8px;align-items:flex-start;font-size:13px;line-height:1.45;color:var(--ink-2)}
.blx-plan li i{flex:0 0 auto;width:16px;height:16px;margin-top:1px;border-radius:5px;border:1.5px solid var(--hairline-strong,rgba(34,26,46,.3));box-sizing:border-box;display:grid;place-items:center;font:700 11px/1 var(--sans);font-style:normal;color:#fff}
.blx-plan li.done i{background:var(--ok,#2f7a55);border-color:var(--ok,#2f7a55)}
.blx-plan li.miss i{border-color:#b4483c}
.blx-plan li.done{color:var(--ink-1)}
.blx-chg{margin:4px 0 6px;font-size:12.5px;line-height:1.45;color:var(--ink-2)}
.blx-chg b{color:var(--ink-1)}
.blx-finds{list-style:none;margin:6px 0 2px;padding:0;display:grid;gap:5px}
.blx-finds li{font-size:12.5px;line-height:1.45;color:var(--ink-2);padding-left:10px;border-left:3px solid var(--hairline)}
.blx-finds li.wrong{border-left-color:#b4483c}.blx-finds li.missing{border-left-color:#b8862f}.blx-finds li.unsure{border-left-color:var(--ink-3)}
.blx-finds li b{color:var(--ink-1)}
.blx-ok{display:inline-flex;align-items:center;gap:6px;font:600 12px/1.3 var(--sans);padding:4px 9px;border-radius:999px;background:rgba(47,122,85,.13);color:#2f7a55}
.blx-bad{display:inline-flex;align-items:center;gap:6px;font:600 12px/1.3 var(--sans);padding:4px 9px;border-radius:999px;background:rgba(180,72,60,.12);color:#b4483c}
body[data-theme="night"] .blx-ok{color:#8fd0a9}body[data-theme="night"] .blx-bad{color:#f0a097}
.blx-acc{margin:8px 0 2px;border-top:.5px solid var(--hairline);padding-top:8px}
.blx-acc summary{cursor:pointer;font:600 12.5px/1.4 var(--sans);color:var(--ink-1)}
.blx-acc ul{margin:6px 0 2px;padding-left:18px;font-size:12.5px;line-height:1.5;color:var(--ink-2)}
.blx-acc li{margin:2px 0}
.blx-acc .blx-k{font-weight:700;color:var(--ink-1)}
.blx-who{font-size:12px;line-height:1.45;color:var(--ink-3);margin:4px 0 0}
.blx-agree{margin:8px 0 2px;font-size:12.5px;line-height:1.5;color:var(--ink-2)}
.blx-time{margin:12px 0 2px}
.blx-time summary{cursor:pointer;font:600 12.5px/1.4 var(--sans);color:var(--ink-2)}
.blx-time ol{margin:6px 0 2px;padding-left:20px;font-size:12px;line-height:1.55;color:var(--ink-3)}
.blx-strip{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 8px}
.blx-strip span{font:600 11px/1 var(--sans);padding:4px 8px;border-radius:999px;background:var(--accent-soft,rgba(106,63,181,.10));color:var(--ink-2)}
.blx-strip span.cx{background:rgba(47,94,160,.12)}
.bl-card.blx-small .bl-body{font-size:13px}
.bl-card .blx-src{font-size:11.5px;color:var(--ink-3);margin-left:4px}
.blx-guide{margin-top:14px}
.blx-guide h3{margin:0 0 6px}
.blx-guide dl{margin:6px 0 0;display:grid;grid-template-columns:minmax(120px,170px) 1fr;gap:6px 14px;font-size:13px;line-height:1.5}
.blx-guide dt{font-weight:700;color:var(--ink-1)}
.blx-guide dd{margin:0;color:var(--ink-2)}
@media (max-width:640px){.blx-guide dl{grid-template-columns:1fr}.blx-guide dd{margin-bottom:6px}#page-blend .bl-model.blx-cx .blx-ms{max-width:140px}}
.msg-act.blx-chk{white-space:nowrap}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p218"]="started";}catch(_){}
/* R218 · Blend, deepened: see the note at the top of its styles.
   window.IngBlend: run(spec), parts(), effort(), strategies, prompts, parse, agree(texts), account(text), checkReply(chatId, msgIndex) */
(function r218(){"use strict";
if(window.IngBlend)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function warn(e){try{console.warn("Ingenium Blend:",e&&e.message||e);}catch(_){}}
function save(){try{saveState();}catch(e){}}
function toast(t){try{ingToast(t);}catch(e){}}
function md(t){try{return chatMd(String(t||""));}catch(e){var d=mk("div");d.textContent=String(t||"");return d.innerHTML;}}
function took(ms){var s=Math.round((+ms||0)/1000);return s<60?s+" s":Math.floor(s/60)+" min "+(s%60)+" s";}
function words(t){return (String(t||"").match(/\S+/g)||[]).length;}
function clip(t,n){t=String(t||"");return t.length>n?t.slice(0,n)+"\n[… "+(t.length-n).toLocaleString("en-GB")+" more characters left out to fit the model's memory]":t;}
if(typeof W.STRATS==="undefined"||typeof W.blState!=="function"||typeof W.BL==="undefined"){return;}

/* ================= 1. the levels of effort, as the chat has them (modules/r215.js), and Ultra ================= */
var LV=(W.IngEffort&&IngEffort.levels)||[null,
  {n:1,key:"low",name:"Low",room:2048,mul:0},{n:2,key:"medium",name:"Medium",room:4096,mul:0.5},{n:3,key:"high",name:"High",room:8192,mul:1},
  {n:4,key:"extra",name:"Extra",room:16384,mul:2},{n:5,key:"max",name:"Max",room:32768,mul:4}];
var CHECKS={1:0,2:0,3:0,4:1,5:2,ultra:3};
var EFFLINE={
  auto:"Ingenium reads the question and chooses Low, Medium, High or Extra, and says under the answer what it chose and why. It never chooses Max or Ultra: those are yours to choose.",
  1:"Each model answers without thinking, briefly. Nothing checks the final answer. The quickest blend.",
  2:"Each model thinks briefly before it answers. Nothing checks the final answer.",
  3:"Each model thinks before it answers, with room for a full answer. The usual choice.",
  4:"Each model thinks longer and may write more. Then another model checks the final answer, claim by claim, and it is corrected if the check finds a problem.",
  5:"The most thinking and room each model allows. The final answer is checked and corrected up to two times.",
  ultra:"Blend's Ultracode, at Max effort: a plan first (the checklist a complete answer must meet, shown and ticked off), every answer written against it, then the final answer checked by another model and corrected until the check passes (up to three times), each step shown. The slowest blend."};
var EFFSHORT={auto:"Ingenium chooses Low to Extra for each question, and says why.",1:"Quick: no thinking, and nothing checks the answer.",2:"Each model thinks briefly first.",
  3:"Each model thinks first, with room for a full answer. The usual choice.",4:"Each thinks longer; another model then checks the answer, and it is corrected if needed.",
  5:"The most thinking; the answer is checked and corrected up to twice.",ultra:"A plan first, then answers, checks and fixes until the check passes. The slowest."};
function effOf(b){var e=b&&b.eff;if(e==="auto"||e==="ultra")return e;e=+e;if(e>=1&&e<=5)return e;
  if(b&&b.think===true)return 3;if(b&&b.think===false&&b.eff===undefined&&b.made)return 2;return "auto";}
function effName(e){return e==="auto"?"Auto":e==="ultra"?"Ultra":(LV[+e]||LV[3]).name;}
function autoEff(task){try{if(W.IngEffort&&IngEffort.pick){var p=IngEffort.pick(task,{});return {lv:Math.min(4,Math.max(1,+p.lv||3)),why:p.why||""};}}catch(e){}
  var w=words(task);return w<=12?{lv:1,why:"a short question"}:w>=150?{lv:4,why:"a long brief"}:{lv:3,why:"a request for work"};}
function resolveEff(e,task){if(e==="ultra")return {lv:5,ultra:true,auto:false,why:"Ultra is on"};
  if(e==="auto"){var a=autoEff(task);return {lv:a.lv,ultra:false,auto:true,why:a.why};}
  return {lv:+e||3,ultra:false,auto:false,why:""};}
function nChecks(E){return E.ultra?CHECKS.ultra:(CHECKS[E.lv]||0);}

/* ================= 2. the ways of blending: the five there were, three new ones, and Ingenium's choice ================= */
function addStrat(s){if(!STRATS.some(function(x){return x.id===s.id;}))STRATS.push(s);}
addStrat({id:"debate",name:"Debate and settle",desc:"Every model answers; then each reads the others' answers and revises its own, saying what it changed and why; then the writer settles the revised answers into one, with where they agreed and how each disagreement was settled."});
addStrat({id:"verify",name:"Check every claim",desc:"The writer answers; every other model checks that answer claim by claim (wrong, missing or unsure, with the reason and the fix); the writer then corrects it, accepting or rejecting each finding with its reason."});
addStrat({id:"split",name:"Divide the work",desc:"The writer divides the task into parts and gives each to the model best suited to it; each writes its part; the writer joins them into one answer, filling gaps and settling contradictions."});
var AUTO_S={id:"auto",name:"Ingenium chooses",desc:"Ingenium reads the question and chooses the way: Check every claim for code; Debate and settle for a question that weighs options; Divide the work for a long task in several parts (with three models or more); Compare and combine otherwise. It says under the answer what it chose and why."};
var SHORT={auto:"Ingenium picks the way from your question, and says why.",refine:"One drafts; each next model improves the draft.",vote:"Every model answers; you keep the one you like best.",
  synth:"Every model answers; the writer keeps the best of each.",weigh:"As Compare and combine, counting each model by its weight.",judge:"A judge scores every answer, then writes from what held up.",
  debate:"They answer, read each other, revise, then settle.",verify:"One answers; the others check each claim; it is corrected.",split:"The task in parts, one to each model, then joined."};
var GROUPS=[{t:null,ids:["auto"]},{t:"Quick",ids:["refine","vote"]},{t:"Careful",ids:["synth","weigh","judge"]},{t:"Deep",ids:["debate","verify","split"]}];
function stratById(id){if(id==="auto")return AUTO_S;return STRATS.filter(function(x){return x.id===id;})[0]||null;}
function stratName(id){var s=stratById(id);return s?s.name:"";}
var CODE_IN=/```|\b(function|const|let|var|def|class|import|return)\b[^\n]*[({=:]|[{};]\s*$|<\/?[a-z][a-z0-9-]*[\s>]/m;
var CODE_ASK=/\b(fix|debug|write|implement|refactor|review|optimi[sz]e|test|port|convert)\b[\s\S]{0,80}\b(code|function|bug|script|program|class|method|query|regex|sql|component|endpoint|api)\b/i;
var WEIGH=/\b(should (i|we)|which (is|of|one)|better|best|compare|comparison|versus|vs\.?|pros and cons|evaluate|decide|recommend|choose between)\b/i;
function autoStrat(task,n){var t=String(task||""),w=words(t);
  /* code in the message, or a request to write or mend code: one writes, the others check; a question that weighs options (even about
     programming languages) is a debate */
  if(CODE_IN.test(t)||(CODE_ASK.test(t)&&!WEIGH.test(t)))return {id:"verify",why:"a task about code: one model writes it and the others check it"};
  if(WEIGH.test(t))return {id:"debate",why:"a question that weighs options: the models answer, read each other, then settle"};
  if(n>=3&&(w>=80||/(\n\s*(?:[-*•]|\d+[.)])\s+\S[^\n]*){3,}/.test(t)))return {id:"split",why:"a long task in several parts: each model takes a part"};
  return {id:"synth",why:w<=25?"a short question: the answers are compared and the best of each kept":"the answers are compared and the best of each kept"};}

/* ================= 3. who takes part: the models on this device and the connected ones ================= */
var FRONTIER={anthropic:1,openai:1,gemini:1,openrouter:1,moonshot:1,"ollama-cloud":1};
function kept(){try{return W.IngConnections?IngConnections.kept().filter(function(k){return k&&k.provider&&k.provider!=="ingenium"&&((k.models&&k.models.length)||k.model);}):[];}catch(e){return [];}}
function keptById(id){return kept().filter(function(k){return k.id===id;})[0]||null;}
function svc(k){try{return IngConnections.label(k);}catch(e){return k?String(k.provider):"";}}
function nice(m){try{return W.ingModelLabel?ingModelLabel(m):String(m);}catch(e){return String(m||"");}}
function lname(m){return m?(m.customName||m.name||"Model"):"Model";}
function bst(){var b=blState();if(!Array.isArray(b.cx))b.cx=[];if(!b.weights)b.weights={};if(b.eff===undefined)b.eff="auto";if(!b.writer)b.writer="auto";return b;}
function wOf(o,pid){var w=o&&o.weights&&+o.weights[pid];return w>=1&&w<=5?w:1;}
function cxPid(conn,model){return "cx:"+conn+"|"+model;}
function partsOf(spec){var out=[];
  (spec.ids||[]).forEach(function(id){var m=(state.models||[]).filter(function(x){return x.id===id;})[0];if(!m)return;
    out.push({pid:m.id,kind:"local",m:m,name:lname(m),color:m.color||"",ok:blCanRun(m),size:blSize(m),sub:"on this device"});});
  (spec.cx||[]).forEach(function(x){if(!x||!x.conn||!x.model)return;var k=keptById(x.conn);
    out.push({pid:cxPid(x.conn,x.model),kind:"cloud",k:k,model:x.model,name:nice(x.model),color:"",ok:!!k,size:0,sub:k?svc(k):"a connection no longer kept",frontier:!!(k&&FRONTIER[k.provider])});});
  out.forEach(function(p){p.weight=wOf(spec,p.pid);});return out;}
function rank(parts){return parts.slice().sort(function(a,b){return (b.weight-a.weight)||((b.frontier?1:0)-(a.frontier?1:0))||((b.kind==="cloud"?1:0)-(a.kind==="cloud"?1:0))||(b.size-a.size);});}
function writerOf(parts,want){if(want&&want!=="auto"){var w=parts.filter(function(p){return p.pid===want;})[0];if(w)return w;}return rank(parts)[0]||null;}
function checkerOf(parts,writer){var others=rank(parts.filter(function(p){return p!==writer;}));return others[0]||writer;}

/* ================= 4. asking one model: on this device (one at a time) or through its connection (at the same time) ================= */
var LQ=Promise.resolve();
function localQ(fn){var p=LQ.then(fn,fn);LQ=p.then(null,function(){});return p;}
function stopErr(){var e=new Error("Stopped.");e.stopped=true;return e;}
var ABS=[];
function locCtx(m){var cx=0;try{if(Engine.modelId===m.id&&W.IngEffort)cx=+IngEffort.ctxNow()||0;}catch(e){}return cx>0?cx:Math.max(8192,+m.ctx||0);}
function roomFor(p,E){var r=(LV[E.lv]||LV[3]).room;if(p.kind==="cloud")return r;return Math.max(1024,Math.min(r,Math.floor(locCtx(p.m)/4)));}
function thinkFor(E){return E.lv>=2;}
function budgetFor(p,E){var pb=+(p.m&&p.m.paramB)||0,b=pb&&pb<=4.5?1536:pb&&pb<=10?3072:6144,mul=(LV[E.lv]||LV[3]).mul;if(!(mul>0))return 0;
  return Math.max(512,Math.min(Math.round(b*mul),Math.floor(locCtx(p.m)/2)));}
function charRoom(p,E,n){/* how much of the others' words a prompt may carry, by the reader's memory */
  if(p.kind==="cloud")return Math.max(4000,Math.floor(120000/Math.max(1,n)));
  var cx=locCtx(p.m),room=roomFor(p,E)+(thinkFor(E)?budgetFor(p,E):0);return Math.max(1200,Math.floor(((cx-room-1200)*3)/Math.max(1,n)));}
/* the answer and its thinking, read from the stream as R99's Blend read them */
function feed(s,raw){var mt=/<\/think>/i.exec(raw);
  if(/^\s*<think>/i.test(raw)){var bd=raw.replace(/^\s*<think>/i,""),e=bd.search(/<\/think>/i);if(e<0){s.think=bd;s.text="";}else{s.think=bd.slice(0,e);s.text=bd.slice(e+8).replace(/^\s+/,"");}return null;}
  if(mt){s.think=(s.think||"")+raw.slice(0,mt.index);s.text=raw.slice(mt.index+8).replace(/^\s+/,"");return s.text;}
  s.text=raw;return null;}
function askLocal(r,s,p,messages,E,live){var t0=Date.now(),raw="",m=p.m,think=thinkFor(E);
  return localQ(function(){if(BL.stop)throw stopErr();s.state="loading";live();
    var before=(Engine.modelId===m.id&&Engine.status==="ready")?Promise.resolve():Engine.unload().then(function(){if(BL.stop)throw stopErr();return Engine.load(m);});
    return before.then(function(){if(BL.stop)throw stopErr();t0=Date.now();
      Engine.setStatus("busy");s.state=think?"thinking":"writing";live();
      var ms=null;try{ms=modelSampling(m,3,think);}catch(e){}
      var params=Object.assign({},ms||EFFORT_MAP[3],{max_tokens:roomFor(p,E),ctx:Math.max(8192,+m.ctx||8192),thinking:think});
      if(think){var bg=budgetFor(p,E);if(bg>0)params.thinking_budget=bg;}
      return Engine.generate({messages:messages,params:params,
        onThink:function(t){if(!t)return;s.think=(s.think||"")+t;live();},
        onToken:function(t){raw+=t;var nr=feed(s,raw);if(nr!=null)raw=nr;if(s.text)s.state="writing";live();}});})
    .then(function(){s.ms=Date.now()-t0;s.text=String(s.text||"").trim();
      if(!s.text)throw new Error(s.think?"The model spent all its room thinking and wrote no answer. Choose a lower effort and run it again.":"The model wrote nothing.");
      s.state="done";try{Engine.setStatus("ready");}catch(_){}live();return s.text;})
    .catch(function(e){s.ms=Date.now()-t0;var stopped=BL.stop||e&&e.stopped||/stop|abort/i.test(String(e&&e.message));s.state=stopped?"stopped":"failed";
      s.err=stopped?"Stopped.":"It could not answer: "+(e&&e.message?e.message:e);try{if(Engine.status==="busy")Engine.setStatus(Engine.modelId?"ready":"disconnected");}catch(_){}live();throw e;});});}
function maxFrom(msg){var m=/(?:at most|maximum(?: value)?(?: is| of)?|up to|less than or equal to|<=)\s*(\d[\d,]{2,})/i.exec(msg)||/(\d[\d,]{2,})\s*(?:completion |output )?tokens? (?:is|are) the maximum/i.exec(msg);return m?+String(m[1]).replace(/,/g,""):0;}
function askCloud(r,s,p,messages,E,live,room){var t0=Date.now(),raw="",k=p.k;
  if(!k)return Promise.reject(new Error("This connection is no longer kept on this device (Settings, Connect)."));
  var ab=netAbortable();ab.conn={provider:k.provider,base:k.base||"",key:k.key||"",model:p.model,models:(k.models||[]).slice(0,50),on:true};
  ab.maxTok=room||roomFor(p,E);ab.think=thinkFor(E);ab.effort=E.lv;ab.quiet=true;ABS.push(ab);
  s.state=ab.think?"thinking":"writing";live();
  return Promise.resolve().then(function(){if(BL.stop)throw stopErr();
      return cloudChat(messages,function(t){raw+=t;var nr=feed(s,raw);if(nr!=null)raw=nr;if(s.text)s.state="writing";live();},function(t){if(!t)return;s.think=(s.think||"")+t;live();},ab);})
    .then(function(){ABS=ABS.filter(function(x){return x!==ab;});s.ms=Date.now()-t0;s.text=String(s.text||"").trim();
      if(!s.text)throw new Error(s.think?"It spent its room thinking and wrote no answer.":"It wrote nothing.");s.state="done";live();return s.text;},
    function(e){ABS=ABS.filter(function(x){return x!==ab;});var msg=String(e&&e.message||e);
      /* a reply longer than the model takes: once more, within the limit the service named (or 4,096 tokens) */
      if(!BL.stop&&!ab.aborted&&!raw&&!room&&/max_tokens|max_completion_tokens|maximum.{0,30}tokens|too many tokens|tokens? .{0,20}(limit|exceed)/i.test(msg)){
        var lim=maxFrom(msg);s.think="";return askCloud(r,s,p,messages,E,live,lim>0?Math.max(1024,Math.min(lim,ab.maxTok-1)):4096);}
      s.ms=Date.now()-t0;var stopped=BL.stop||ab.aborted||/abort/i.test(msg);s.state=stopped?"stopped":"failed";
      s.err=stopped?"Stopped.":"It could not answer: "+msg;live();throw e;});}
function ask(r,s,p,messages,E,live){return p.kind==="cloud"?askCloud(r,s,p,messages,E,live):askLocal(r,s,p,messages,E,live);}

/* ================= 5. the words each model is given ================= */
function sysFor(cloud){var parts=[];
  try{[ingCoreLayer(cloud),ingRulesLayer(),ingPersonLayer(cloud),(typeof ingSupportLayer==="function")?ingSupportLayer(cloud):""].forEach(function(x){if(x)parts.push(x);});}catch(e){}
  parts.push("You are one of several models answering the same question in Ingenium's Blend; the answers will be compared, checked and brought together. Be accurate and complete; say plainly when you are unsure or when something cannot be known; do not pad.");
  try{if((state.sysPrompt||"").trim())parts.push(state.sysPrompt.trim());}catch(e){}
  return parts.join("\n\n");}
var SETTLE="HOW IT WAS SETTLED";
var P={
  answer:function(task,plan){return plan&&plan.length?task+"\n\nA complete answer must meet this checklist; meet every line of it:\n"+plan.map(function(x,i){return (i+1)+". "+x.t;}).join("\n"):task;},
  plan:function(task){return "Before anyone answers, write the checklist a complete and correct answer to the question below must meet: the parts it must cover, the facts it must get right, and the standard it must reach. Write 3 to 8 lines, each beginning with \"- \", and nothing else.\n\nQuestion:\n"+task;},
  refine:function(task,draft){return "Below is a question and a draft answer written by another model. Write a better answer: correct anything wrong, fill what is missing, keep what is right, and keep it as concise as the question allows.\nBegin with one line that starts \"Changed:\" and says in one sentence what you improved and why (or \"Changed: nothing\" and why). Then give the improved answer in full, with no other remarks about the draft.\n\nQuestion:\n"+task+"\n\nDraft:\n"+draft;},
  revise:function(task,mine,others){return "You answered the question below, and other models answered it too. Read their answers critically, then write your final answer.\n- Where another answer shows that yours was wrong or incomplete, correct yours.\n- Where yours is right and another answer is wrong, keep yours.\n- Do not agree only because others do: follow the evidence and the reasoning.\nBegin with one line that starts \"Changed:\" and says in one sentence what you changed and why (or \"Changed: nothing\" and why). Then give your final answer in full.\n\nQuestion:\n"+task+"\n\nYour answer:\n"+mine+"\n\nThe other answers:\n\n"+others.map(function(o,i){return "Answer "+String.fromCharCode(65+i)+":\n"+o;}).join("\n\n---\n\n");},
  combine:function(task,list,weighed,kind){var intro=kind==="debate"?"Several models answered the question below, then read each other's answers and revised their own. Their revised answers follow.":"Several models answered the question below. Their answers follow.";
    var how=kind==="weigh"?"Keep every point the answers agree on. Where they disagree, count each side by the total weight of the models that hold it, and follow the greater weight unless the other side is plainly better supported by evidence; then follow the evidence and say so.":"Keep what is correct and useful in each; where they disagree, decide which is right and why"+(weighed?", giving more trust to answers with greater weight":"")+"; leave out anything wrong or unsupported.";
    return intro+(weighed?" Each has a weight from 1 to 5 for how much it should count.":"")+"\n\nWrite the single best answer to the question. "+how+" In the answer itself do not mention the models, the answers or the weights: just answer.\n\nAfter the answer, write a line that says only "+SETTLE+", and under it at most eight short lines in these forms:\nAgreed: a point the answers share\nDiffered: the point | kept: what you kept | because: the reason\nLeft out: a claim you dropped | because: the reason\n\nQuestion:\n"+task+"\n\n"+list.map(function(a,i){return "Answer "+(i+1)+(weighed?" (weight "+a.w+" of 5)":"")+":\n"+a.t;}).join("\n\n---\n\n");},
  judge:function(task,list){return "You are the judge of several answers to the same question. First score each answer, one line per answer, in exactly this form and nothing else on the line:\nAnswer 1: accuracy 4/5, completeness 3/5, clarity 5/5. Reason: one sentence saying what is right, missing or wrong.\nScore accuracy by whether the claims are true and supported; completeness by whether the question is answered in full; clarity by whether a careful reader follows it at once. Be strict: a confident claim that is wrong costs accuracy; padding and promotional words cost clarity.\nThen write a line that says only THE ANSWER: and, below it, the single best answer to the question: keep what the better answers got right, drop what was wrong or unsupported, and keep it as long as the question needs and no longer. Do not mention the answers, the models or the scores in it.\n\nQuestion:\n"+task+"\n\n"+list.map(function(a,i){return "Answer "+(i+1)+":\n"+a.t;}).join("\n\n---\n\n");},
  check:function(task,answer,plan){return "Check the answer below to the question, claim by claim. Be strict and fair: report only real problems, and do not report a matter of taste.\nFor each problem write one line in exactly one of these forms:\nWRONG: the claim | WHY: the reason | FIX: the correction\nMISSING: what is missing | WHY: why the question needs it\nUNSURE: the claim | WHY: what would settle it\n"+(plan&&plan.length?"Then write one line that begins CHECKLIST: and gives each checklist line's number with met or not met, for example: CHECKLIST: 1 met, 2 not met, 3 met\n":"")+"If you find no problem"+(plan&&plan.length?" and every checklist line is met":"")+", write only: ALL CORRECT"+(plan&&plan.length?" (and the CHECKLIST line)":"")+"\nWrite nothing else.\n\nQuestion:\n"+task+(plan&&plan.length?"\n\nThe checklist the answer must meet:\n"+plan.map(function(x,i){return (i+1)+". "+x.t;}).join("\n"):"")+"\n\nAnswer:\n"+answer;},
  fix:function(task,answer,finds){return "Your answer to the question below was checked by other models. Their findings follow. Accept a finding only when it is right; reject it when it is wrong. Then write the corrected answer in full.\nAfter the answer, write a line that says only "+SETTLE+", and under it one line per finding in this form:\nAccepted: the finding | because: the reason   (or)   Rejected: the finding | because: the reason\n\nQuestion:\n"+task+"\n\nYour answer:\n"+answer+"\n\nThe findings:\n"+finds.map(function(f,i){return (i+1)+". "+f;}).join("\n");},
  split:function(task,ws){return "Divide the task below into at most "+ws.length+" parts that different writers can write separately and that together answer it in full. The writers are:\n"+ws.map(function(w,i){return (i+1)+". "+w;}).join("\n")+"\nGive each part to the writer best suited to it, one part to each writer where you can.\nWrite one line per part, in exactly this form, and nothing else:\nPART 1 | WRITER 2 | what this part must contain\n\nTask:\n"+task;},
  part:function(task,n,of,what){return "You are writing one part of a larger answer.\n\nThe whole task:\n"+task+"\n\nYour part (part "+n+" of "+of+"):\n"+what+"\n\nWrite only your part, complete and ready to be joined to the others. Do not write the other parts, and do not introduce or sum up the whole.";},
  assemble:function(task,list){return "Join the parts below into one complete answer to the task: keep their substance, remove repetition, make the terms and the style consistent, fill any gap between them, and correct anything wrong.\nAfter the answer, write a line that says only "+SETTLE+", and under it one short line per change you made in joining (a gap filled, a contradiction settled, a repetition removed), at most eight lines.\n\nTask:\n"+task+"\n\n"+list.map(function(a,i){return "Part "+(i+1)+":\n"+a;}).join("\n\n---\n\n");}};

/* ================= 6. reading what the models wrote ================= */
function account(text){var t=String(text||""),re=new RegExp("^\\s*[#*_ ]*"+SETTLE.replace(/ /g,"\\s+")+"[*_ ]*:?\\s*$","im"),m=re.exec(t);
  if(!m){var m2=new RegExp("\\n\\s*[#*_ ]*"+SETTLE.replace(/ /g,"\\s+")+"[*_ ]*:?","i").exec(t);if(!m2)return {answer:t.trim(),items:[]};m=m2;}
  var ans=t.slice(0,m.index).replace(/\n\s*(?:-{3,}|\*{3,})\s*$/,"").trim(),rest=t.slice(m.index+m[0].length),items=[];
  rest.split(/\n+/).forEach(function(line){var l=line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/,"").replace(/\*\*/g,"").trim();if(!l)return;
    var k=/^(Agreed|Differed|Left out|Accepted|Rejected|Joined|Filled|Removed|Settled)\s*:\s*/i.exec(l);items.push({k:k?k[1].toLowerCase():"",t:k?l.slice(k[0].length):l});});
  return {answer:ans||t.trim(),items:items.slice(0,16)};}
function cutAtSettle(t){var i=String(t||"").search(new RegExp("\\n\\s*[#*_ ]*"+SETTLE.replace(/ /g,"\\s+"),"i"));return i>=0?String(t).slice(0,i).trim():String(t||"");}
function changed(text){var t=String(text||"").replace(/^\s+/,""),m=/^\**\s*Changed\s*:\s*\**\s*([^\n]*)\n?/i.exec(t);if(!m)return {line:"",text:t.trim()};return {line:m[1].replace(/\*\*/g,"").trim(),text:t.slice(m[0].length).trim()};}
function parsePlan(text){var out=[];String(text||"").split(/\n+/).forEach(function(l){var m=/^\s*(?:[-*•]|\d+[.)])\s+(.+)$/.exec(l);if(m&&out.length<8)out.push({t:m[1].replace(/\*\*/g,"").trim(),met:null});});
  if(!out.length)String(text||"").split(/\n+/).forEach(function(l){l=l.trim();if(l&&out.length<8&&l.length>6)out.push({t:l,met:null});});return out;}
function parseCheck(text){var s=String(text||"").trim(),items=[];
  s.split(/\n+/).forEach(function(line){var m=/^\s*(?:[-*•]|\d+[.)])?\s*\**(WRONG|MISSING|UNSURE)\**\s*:\s*(.+)$/i.exec(line);if(!m)return;
    var bits=m[2].split(/\s*\|\s*/),o={kind:m[1].toLowerCase(),text:bits[0].replace(/\*\*/g,"").trim(),why:"",fix:""};
    bits.slice(1).forEach(function(b){var q=/^\**(WHY|FIX)\**\s*:\s*(.*)$/i.exec(b);if(q)o[q[1].toLowerCase()]=q[2].trim();});items.push(o);});
  var met=null,cl=/CHECKLIST\s*:\s*(.*)$/im.exec(s);if(cl){met={};cl[1].replace(/(\d+)\s*(?:[:=-]\s*)?(not met|unmet|met)/gi,function(_,n,w){met[+n]=!/not|unmet/i.test(w);return _;});}
  var all=/\bALL CORRECT\b/i.test(s)&&!items.length;
  if(all&&met&&Object.keys(met).some(function(n){return met[n]===false;}))all=false;
  return {ok:all,items:items,met:met,raw:s,read:all||items.length>0};}
function findLine(f){return (f.kind==="wrong"?"Wrong: ":f.kind==="missing"?"Missing: ":"Unsure: ")+f.text+(f.why?" (why: "+f.why+")":"")+(f.fix?" Fix: "+f.fix:"");}
function parseJudge(text,n){var scores={},t=String(text||""),re=/^\s*\**Answer\s+(\d+)\s*\**\s*:(.*)$/gim,m;
  function num(rest,key){var x=new RegExp(key+"\\s*:?\\s*(\\d)(?:\\s*\\/\\s*5)?","i").exec(rest);return x?+x[1]:null;}
  while((m=re.exec(t))){var i=+m[1]-1,rest=m[2];if(i<0||i>=n)continue;var acc=num(rest,"accuracy"),comp=num(rest,"completeness"),clar=num(rest,"clarity");if(acc==null||comp==null||clar==null)continue;
    var w=/Reason\s*:\s*(.*)$/i.exec(rest);scores[i]={acc:acc,comp:comp,clar:clar,why:w?w[1].trim().replace(/\s*\.$/,""):""};}
  var k=t.search(/THE ANSWER\s*:/i),final=k>=0?t.slice(k).replace(/^THE ANSWER\s*:\s*/i,"").trim():"";
  if(!final)final=t.replace(/^\s*\**Answer\s+\d+\s*\**\s*:[^\n]*\n?/gim,"").trim();
  return {scores:scores,final:final};}
function parseSplit(text,n){var out=[];String(text||"").split(/\n+/).forEach(function(l){var m=/PART\s*(\d+)\s*\|\s*WRITER\s*(\d+)\s*\|\s*(.+)$/i.exec(l.replace(/\*\*/g,""));
  if(m&&out.length<n)out.push({n:+m[1],w:Math.max(1,Math.min(n,+m[2]))-1,what:m[3].trim()});});return out;}
/* Ingenium's own count, only where every answer is short enough to compare word for word */
function norm(t){return String(t||"").replace(/[`*_#>]/g," ").replace(/<[^>]+>/g," ").toLowerCase().replace(/(\d),(\d{3})\b/g,"$1$2").replace(/[^a-z0-9À-ɏ.\s-]/g," ").replace(/\.(?!\d)/g," ")
  .replace(/^\s*(the answer is|answer|it is|it's|this is)\s*:?\s*/,"").replace(/\b(the|a|an)\b/g," ").replace(/\s+/g," ").trim();}
function agree(texts){var L=(texts||[]).map(function(t){return String(t||"").trim();}).filter(Boolean);if(L.length<2)return null;
  if(L.some(function(t){return words(t)>12||/\n\s*\n/.test(t);}))return null;
  var g={},best=null;L.forEach(function(t){var k=norm(t);if(!k)return;g[k]=g[k]||{n:0,t:t};g[k].n++;if(!best||g[k].n>best.n)best=g[k];});
  if(!best)return null;return {n:best.n,of:L.length,value:best.t.replace(/\s+/g," ").slice(0,120),groups:Object.keys(g).length};}

/* ================= 7. the run ================= */
function step(r,k,p,extra){var s=Object.assign({id:r.steps.length,k:k,pid:p?p.pid:"",name:p?p.name:"",color:p?p.color:"",kind:p?p.kind:"",state:"waiting",text:"",think:""},extra||{});r.steps.push(s);return s;}
function scheduled(parts,writer,last){var cur="";try{cur=Engine.modelId||"";}catch(e){}
  var loc=parts.filter(function(p){return p.kind==="local";}),cl=parts.filter(function(p){return p.kind!=="local";});
  loc.sort(function(a,b){var ka=(a.m&&a.m.id===cur)?0:(a===writer||a===last)?2:1,kb=(b.m&&b.m.id===cur)?0:(b===writer||b===last)?2:1;return ka-kb;});
  return cl.concat(loc);}
function good(steps){return steps.filter(function(s){return s.state==="done"&&s.text;});}
function runCore(r,ctx){var E=ctx.E,parts=ctx.parts,writer=ctx.writer,live=ctx.live,task=r.task;
  function M(p,prompt,first){return ctx.msgs(p,prompt,!!first);}
  function partOf(pid){return parts.filter(function(p){return p.pid===pid;})[0]||null;}
  function answers(list,promptFor,k,extra){return Promise.all(scheduled(list,writer).map(function(p){var s=step(r,k||"answer",p,extra?extra(p):null);
      var pr=promptFor(p);return ask(r,s,p,M(p,pr.text,pr.first),E,live).then(function(){save();return s;},function(e){if(BL.stop)throw e;save();return s;});}))
    .then(function(){return r.steps.filter(function(s){return s.k===(k||"answer");});});}
  function writeBy(p,k,prompt,extra,fallback){var s=step(r,k,p,extra);
    return ask(r,s,p,M(p,prompt,false),E,live).then(function(t){return {s:s,t:t,p:p};},function(e){if(BL.stop)throw e;
      var alt=fallback&&rank(parts.filter(function(x){return x!==p&&x.ok;}))[0];if(!alt)throw e;
      r.notes.push(p.name+" could not write this step, so "+alt.name+" wrote it.");return writeBy(alt,k,prompt,extra,false);});}
  function plan(){if(!E.ultra)return Promise.resolve();var s=step(r,"plan",writer);
    return ask(r,s,writer,M(writer,P.plan(task),false),E,live).then(function(t){r.plan=parsePlan(t);s.text=r.plan.map(function(x){return "- "+x.t;}).join("\n");},function(e){if(BL.stop)throw e;r.notes.push("The plan could not be written, so the models answered without one.");});}
  function q(){return P.answer(task,r.plan);}
  function finalFrom(res,kind){var a=account(res.t);r.final={text:a.answer,by:res.p.name,pid:res.p.pid,step:res.s.id};r.account=(r.account||[]).concat(a.items.map(function(x){x.from=kind;return x;}));return r.final;}
  function combine(list,kind){if(!list.length)throw new Error("No model gave an answer.");
    if(list.length===1){r.final={text:list[0].text,by:list[0].name,pid:list[0].pid,step:list[0].id};r.notes.push("Only one model answered, so its answer is the blend's answer.");return Promise.resolve();}
    var weighed=r.strategy==="weigh"||list.some(function(s){return wOf(r,s.pid)>1;});
    var room=charRoom(writer,E,list.length);
    var L=list.map(function(s){return {t:clip(s.text,room),w:wOf(r,s.pid)};});
    return writeBy(writer,"combine",P.combine(task,L,weighed,kind==="debate"?"debate":r.strategy),null,true).then(function(res){finalFrom(res,"combine");});}
  function judge(list){if(list.length<2)return combine(list);var room=charRoom(writer,E,list.length);
    return writeBy(writer,"judge",P.judge(task,list.map(function(s){return {t:clip(s.text,room)};})),null,true).then(function(res){var pj=parseJudge(res.t,list.length);
      r.scores={};list.forEach(function(s,i){if(pj.scores[i])r.scores[s.id]=pj.scores[i];});
      var best=-1,bi=null;Object.keys(r.scores).forEach(function(id){var v=r.scores[id];var tt=v.acc+v.comp+v.clar;if(tt>best){best=tt;bi=id;}});if(bi!=null)r.scores[bi].best=true;
      r.final={text:pj.final||res.t,by:res.p.name,pid:res.p.pid,step:res.s.id,judged:true};
      if(!Object.keys(r.scores).length)r.notes.push("The judge did not score the answers in the form asked; its whole reply is kept as the answer.");});}
  function refine(){var order=scheduled(parts,writer,writer).filter(function(p){return p!==writer;}).concat(parts.indexOf(writer)>=0?[writer]:[]);var i=0,last=null;
    function next(){if(BL.stop)return Promise.reject(stopErr());if(i>=order.length)return Promise.resolve();var p=order[i++],s=step(r,i===1?"answer":"draft",p);
      var pr=last?P.refine(task,clip(last.text,charRoom(p,E,1))):q();
      return ask(r,s,p,M(p,pr,!last),E,live).then(function(){if(last){var c=changed(s.text);s.changed=c.line;s.text=c.text;if(c.line)(r.account=r.account||[]).push({k:"changed",t:p.name+": "+c.line,from:"refine"});}last=s;save();return next();},
        function(e){if(BL.stop)throw e;save();return next();});}
    return next().then(function(){if(!last)throw new Error("No model gave an answer.");r.final={text:last.text,by:last.name,pid:last.pid,step:last.id};});}
  function revise(list){var others=function(s){return list.filter(function(x){return x!==s;});};
    return Promise.all(scheduled(list.map(function(s){return partOf(s.pid);}).filter(Boolean),writer).map(function(p){var mine=list.filter(function(s){return s.pid===p.pid;})[0];
        var room=charRoom(p,E,list.length);var s=step(r,"revise",p);
        return ask(r,s,p,M(p,P.revise(task,clip(mine.text,room),others(mine).map(function(o){return clip(o.text,room);})),false),E,live).then(function(){var c=changed(s.text);s.changed=c.line;s.text=c.text;save();return s;},function(e){if(BL.stop)throw e;save();return null;});}))
      .then(function(){var rev=r.steps.filter(function(s){return s.k==="revise";});
        /* a model that could not revise keeps its first answer */
        return list.map(function(a){var v=rev.filter(function(s){return s.pid===a.pid&&s.state==="done"&&s.text;})[0];return v||a;});});}
  function checks(answer,from,list){var room;return Promise.all(scheduled(list,writer).map(function(p){room=charRoom(p,E,1);var s=step(r,"check",p,{of:from});
      return ask(r,s,p,M(p,P.check(task,clip(answer,room),null),false),E,live).then(function(){s.check=parseCheck(s.text);save();return s;},function(e){if(BL.stop)throw e;save();return s;});}))
    .then(function(){return r.steps.filter(function(s){return s.k==="check"&&s.state==="done";});});}
  function findings(list){var out=[];list.forEach(function(s){var c=s.check||parseCheck(s.text);if(c.ok)return;
      if(c.items.length)c.items.forEach(function(f){out.push(findLine(f)+" (from "+s.name+")");});else if(s.text)out.push("From "+s.name+": "+s.text.slice(0,1200));});return out;}
  function verify(){var seeded=!!r.seed,first;
    if(seeded){first={text:r.seed.text,name:r.seed.by||"the chat's reply",pid:"seed",id:-1};}
    var start=seeded?Promise.resolve(first):(function(){var s=step(r,"answer",writer);return ask(r,s,writer,M(writer,q(),true),E,live).then(function(){save();return s;});})();
    return start.then(function(a){first=a;var list=seeded?parts:parts.filter(function(p){return p!==writer;});
        if(!list.length){r.notes.push("Only one model is in this blend, so no other model checked it.");r.final={text:a.text,by:a.name,pid:a.pid,step:a.id};return null;}
        return checks(a.text,a.id,list);})
      .then(function(cs){if(!cs)return;var f=findings(cs);
        if(!cs.length){r.final={text:first.text,by:first.name,pid:first.pid,step:first.id};r.notes.push("No check could be made, so the answer stands unchecked.");return;}
        if(!f.length){r.final={text:first.text,by:first.name,pid:first.pid,step:first.id};(r.account=r.account||[]).push({k:"agreed",t:"Every model that checked it found it correct ("+cs.map(function(s){return s.name;}).join(", ")+").",from:"verify"});return;}
        return writeBy(writer,"fix",P.fix(task,clip(first.text,charRoom(writer,E,2)),f),{findings:f.length},true).then(function(res){finalFrom(res,"verify");});});}
  function split(){var n=parts.length,ws=parts.map(function(p){return p.name+(p.kind==="cloud"?" ("+p.sub+")":" (on this device)");});
    return writeBy(writer,"divide",P.split(task,ws),null,true).then(function(res){var L=parseSplit(res.t,n);
      if(L.length<2){r.notes.push("The division into parts could not be read, so every model answered in full and the answers were combined.");r.strategyUsed="synth";
        return answers(parts,function(){return {text:q(),first:true};}).then(function(list){return combine(good(list));});}
      res.s.parts=L;
      var jobs=L.map(function(x,i){var p=parts[x.w]||parts[i%n];return {p:p,x:x,i:i};});
      var byP={};jobs.forEach(function(j){(byP[j.p.pid]=byP[j.p.pid]||[]).push(j);});
      var order=scheduled(parts.filter(function(p){return byP[p.pid];}),writer);
      /* the writer's own part first while it is loaded, its joining last */
      var wp=order.indexOf(writer);if(wp>0&&writer.kind==="local"){order.splice(wp,1);order.unshift(writer);}
      return Promise.all(order.map(function(p){return byP[p.pid].reduce(function(pr,j){return pr.then(function(){var s=step(r,"part",j.p,{part:j.i+1,of:L.length,what:j.x.what});
          return ask(r,s,j.p,M(j.p,P.part(task,j.i+1,L.length,j.x.what),false),E,live).then(function(){save();},function(e){if(BL.stop)throw e;save();});});},Promise.resolve());}))
      .then(function(){var ps=r.steps.filter(function(s){return s.k==="part";}).sort(function(a,b){return a.part-b.part;});var done=good(ps);
        if(!done.length)throw new Error("No part was written.");
        if(done.length<ps.length)r.notes.push((ps.length-done.length)+" of the "+ps.length+" parts could not be written; the answer is joined from the rest.");
        var room=charRoom(writer,E,done.length);
        return writeBy(writer,"assemble",P.assemble(task,done.map(function(s){return clip(s.text,room);})),null,true).then(function(res2){finalFrom(res2,"split");});});});}
  /* the final answer, checked by another model, and corrected, as many times as the effort allows */
  function checkLoop(){var rounds=nChecks(E);if(!rounds||!r.final||r.strategy==="vote")return Promise.resolve();var checker=checkerOf(parts,writerNow());
    var i=0;
    function writerNow(){return parts.filter(function(p){return p.pid===(r.final&&r.final.pid);})[0]||writer;}
    function once(){if(BL.stop)return Promise.reject(stopErr());if(i>=rounds)return Promise.resolve();i++;
      var s=step(r,"verify",checker,{round:i});var room=charRoom(checker,E,1);
      return ask(r,s,checker,M(checker,P.check(task,clip(r.final.text,room),E.ultra?r.plan:null),false),E,live).then(function(){var c=s.check=parseCheck(s.text);save();
          if(c.met&&r.plan)r.plan.forEach(function(x,k){if(c.met[k+1]!=null)x.met=c.met[k+1];});
          if(c.ok){r.passed=true;if(r.plan)r.plan.forEach(function(x){if(x.met==null)x.met=true;});return;}
          if(!c.read&&!s.text){r.notes.push("The check gave no reading.");return;}
          var f=c.items.length?c.items.map(findLine):[s.text.slice(0,1500)];
          var w=writerNow();
          return writeBy(w,"fix",P.fix(task,clip(r.final.text,charRoom(w,E,2)),f),{round:i,findings:f.length},false).then(function(res){var before=r.final.text,a=account(res.t);
            r.final={text:a.answer,by:res.p.name,pid:res.p.pid,step:res.s.id};r.account=(r.account||[]).concat(a.items.map(function(x){x.from="check "+i;return x;}));
            var acc=a.items.filter(function(x){return x.k==="accepted";}).length,rej=a.items.filter(function(x){return x.k==="rejected";}).length;
            if(rej&&!acc&&a.answer.trim()===before.trim()){r.notes.push("The writer rejected every finding of check "+i+", with its reasons (below); the check was not repeated.");return;}
            return once();});},
        function(e){if(BL.stop)throw e;r.notes.push("The check could not be made: "+(e&&e.message||e));});}
    return once().then(function(){if(!r.passed&&i>=rounds&&!BL.stop)r.notes.push(rounds===1?"The check found problems; they were corrected once, as this effort allows.":"The check still found problems after "+rounds+" rounds of corrections; the last check is shown.");});}
  var run;
  switch(r.strategy){
    case "refine":run=plan().then(refine);break;
    case "vote":run=plan().then(function(){return answers(parts,function(){return {text:q(),first:true};});}).then(function(list){var g=good(list);if(!g.length)throw new Error("No model gave an answer.");r.agree=agree(g.map(function(s){return s.text;}));});break;
    case "judge":run=plan().then(function(){return answers(parts,function(){return {text:q(),first:true};});}).then(function(list){return judge(good(list));});break;
    case "debate":run=plan().then(function(){return answers(parts,function(){return {text:q(),first:true};});}).then(function(list){var g=good(list);r.agree=agree(g.map(function(s){return s.text;}));
      if(g.length<2)return combine(g);return revise(g).then(function(rev){var ag=agree(rev.map(function(s){return s.text;}));if(ag)r.agree2=ag;return combine(rev,"debate");});});break;
    case "verify":run=plan().then(verify);break;
    case "split":run=(parts.length<2?plan().then(function(){return answers(parts,function(){return {text:q(),first:true};});}).then(function(list){return combine(good(list));}):plan().then(split));break;
    default:run=plan().then(function(){return answers(parts,function(){return {text:q(),first:true};});}).then(function(list){var g=good(list);r.agree=agree(g.map(function(s){return s.text;}));return combine(g);});}
  return run.then(checkLoop);}

/* one run, from start to end: the page's and the chat's */
function begin(spec){var b=bst();
  var parts=partsOf(spec).filter(function(p){return p.ok;});
  var E=resolveEff(spec.eff===undefined?"auto":spec.eff,spec.task);
  var sid=spec.strategy||"synth",sw="";if(sid==="auto"){var a=autoStrat(spec.task,parts.length);sid=a.id;sw=a.why;}
  if(spec.seed)sid="verify";
  var writer=writerOf(parts,spec.writer);
  var r={v:2,id:"b"+Date.now().toString(36),at:Date.now(),task:spec.task,strategy:sid,chose:sw,eff:{lv:E.lv,ultra:E.ultra,auto:E.auto,why:E.why},effSet:spec.eff,writer:writer?writer.pid:"",writerName:writer?writer.name:"",
    weights:Object.assign({},spec.weights||{}),status:"running",house:spec.house||"",seed:spec.seed||null,notes:[],steps:[],
    parts:parts.map(function(p){return {pid:p.pid,name:p.name,kind:p.kind,color:p.color,weight:p.weight,sub:p.sub};})};
  return {r:r,parts:parts,writer:writer,E:E};}
function finish(r){r.done=Date.now();BL.run=null;BL.stop=false;ABS=[];
  r.steps.forEach(function(s){if(s.think&&s.think.length>6000)s.think=s.think.slice(0,6000)+" …";if(s.state==="waiting"||s.state==="loading"||s.state==="thinking"||s.state==="writing")s.state=r.status==="stopped"?"stopped":"failed";});
  var keepIt=false;try{keepIt=Engine.modelId&&Engine.modelId===state.activeModelId;}catch(e){}
  var used=r.parts.some(function(p){return p.kind==="local";});
  if(used)(keepIt?Promise.resolve(Engine.setStatus("ready")):Engine.unload()).then(null,function(){}).then(function(){try{renderEngineCtl();renderModels();}catch(e){}});
  var b=blState();b.runs=(b.runs||[]).slice(0,8);save();}

/* ================= 8. drawing a run: every step, the answer, how it was reached ================= */
var STATE_NAMES={waiting:"Waiting",loading:"Loading the model",thinking:"Thinking",writing:"Writing",done:"Done",failed:"Failed",stopped:"Stopped"};
var KIND_NAMES={plan:"The plan",answer:"Answer",draft:"Improves the draft before",revise:"Revised after reading the others",check:"Checks the answer",combine:"Brings the answers together",judge:"Judges the answers",divide:"Divides the work",part:"Writes a part",assemble:"Joins the parts",verify:"Checks the final answer",fix:"Corrects the answer"};
function stepCard(r,s){var c=mk("div","bl-card"+(s.state==="failed"?" bad":"")+(/check|verify|divide|plan/.test(s.k)?" blx-small":""));c.setAttribute("data-ix",String(s.id));
  var h=mk("div","bl-card-h"),sw=mk("span","bl-sw");sw.style.background=s.kind==="cloud"?"#2f5ea0":(s.color||"var(--ink-3)");h.appendChild(sw);h.appendChild(mk("b",null,s.name||"Model"));
  if(s.kind==="cloud")h.appendChild(mk("span","blx-src","connected"));
  var st=mk("span","bl-st bl-st-"+s.state,STATE_NAMES[s.state]||s.state);if(s.ms&&s.state==="done")st.textContent="Done in "+took(s.ms);h.appendChild(st);
  var what=KIND_NAMES[s.k]||"";if(s.k==="part")what="Writes part "+s.part+" of "+s.of;if(s.k==="verify")what="Checks the final answer"+(s.round>1?" (round "+s.round+")":"");if(s.k==="fix"&&s.round)what="Corrects the answer after check "+s.round;
  if(what&&s.k!=="answer")h.appendChild(mk("span","small muted"," · "+what));c.appendChild(h);
  if(s.k==="part"&&s.what)c.appendChild(mk("div","blx-chg","Its part: "+s.what));
  if(s.changed){var ch=mk("div","blx-chg");ch.appendChild(mk("b",null,"Changed: "));ch.appendChild(D.createTextNode(s.changed));c.appendChild(ch);}
  var sc=r.scores&&r.scores[s.id];if(sc){var row=mk("div","bl-score"+(sc.best?" best":""));["Accuracy "+sc.acc+"/5","Completeness "+sc.comp+"/5","Clarity "+sc.clar+"/5"].forEach(function(t){row.appendChild(mk("span",sc.best?"best":"",t));});
    if(sc.best)row.appendChild(mk("span","best","the judge's choice"));if(sc.why)row.appendChild(mk("div","bl-why","The judge: "+sc.why+"."));c.appendChild(row);}
  if(s.think){var d=mk("details","bl-think");if(s.state==="thinking")d.open=true;d.appendChild(mk("summary",null,"Thinking"));var tb=mk("div","bl-think-b");tb.textContent=s.think;d.appendChild(tb);c.appendChild(d);}
  if((s.k==="check"||s.k==="verify")&&s.state==="done"){var k=s.check||parseCheck(s.text);
    if(k.ok)c.appendChild(mk("div","blx-ok","✓ Found no problem"));
    else if(k.items.length){c.appendChild(mk("div","blx-bad",k.items.length+" finding"+(k.items.length===1?"":"s")));var ul=mk("ul","blx-finds");
      k.items.forEach(function(f){var li=mk("li",f.kind);li.appendChild(mk("b",null,f.kind==="wrong"?"Wrong: ":f.kind==="missing"?"Missing: ":"Unsure: "));li.appendChild(D.createTextNode(f.text+(f.why?" (why: "+f.why+")":"")+(f.fix?" Fix: "+f.fix:"")));ul.appendChild(li);});c.appendChild(ul);}
    else{var bd=mk("div","md bl-body");bd.innerHTML=md(s.text);c.appendChild(bd);}
    return c;}
  if(s.k==="divide"&&s.state==="done"&&s.parts){var ol=mk("ol","blx-plan");s.parts.forEach(function(x){var li=mk("li");li.appendChild(mk("i",null,String(x.n)));li.appendChild(D.createTextNode(x.what+" · "+((r.parts[x.w]||{}).name||"")));ol.appendChild(li);});c.appendChild(ol);return c;}
  var body=mk("div","md bl-body");var txt=s.k==="combine"||s.k==="fix"||s.k==="assemble"?cutAtSettle(s.text):s.text;
  if(txt)body.innerHTML=md(txt);else if(s.err)body.textContent=s.err;else body.innerHTML='<span class="muted small">'+(s.state==="waiting"?"Its turn comes after the steps before it.":"…")+'</span>';c.appendChild(body);
  if(s.text&&s.state==="done"&&s.k!=="plan"){var acts=mk("div","bl-acts2");acts.appendChild(blKey("Copy",function(btn){supCopy(txt,btn);}));
    if(r.strategy==="vote"&&r.status!=="running"&&s.k==="answer")acts.appendChild(blKey(r.final&&r.final.step===s.id?"Kept":"Keep this one",function(){r.final={text:s.text,by:s.name,pid:s.pid,step:s.id};save();blShow(r);}));
    c.appendChild(acts);}
  return c;}
function sec(out,t){out.appendChild(mk("div","blx-sec",t));}
function finalCard(r){var f=r.final,live=null;
  if(!f){var cs=r.steps.filter(function(s){return /combine|judge|assemble|fix/.test(s.k)&&(s.state==="writing"||s.state==="thinking"||s.state==="loading");}).pop();if(!cs)return null;live=cs;}
  var c=mk("div","bl-card bl-final"),h=mk("div","bl-card-h");
  h.appendChild(mk("b",null,r.strategy==="vote"?"The answer you kept":r.strategy==="judge"?"The judged answer":r.strategy==="refine"?"The refined answer":r.strategy==="verify"?(r.seed?"The checked answer":"The checked answer"):r.strategy==="split"?"The joined answer":"The blended answer"));
  var by=f?f.by:(live&&live.name);if(by)h.appendChild(mk("span","small muted"," · written by "+by));c.appendChild(h);
  if(live&&live.think){var d=mk("details","bl-think");d.open=true;d.appendChild(mk("summary",null,"Thinking"));var tb=mk("div","bl-think-b");tb.textContent=live.think;d.appendChild(tb);c.appendChild(d);}
  var body=mk("div","md bl-body");var t=f?f.text:cutAtSettle(live.text);body.innerHTML=t?md(t):'<span class="muted small">Bringing the answers together…</span>';c.appendChild(body);
  if(!f)return c;
  /* the checks of the final answer */
  var vs=r.steps.filter(function(s){return s.k==="verify"&&s.state==="done";});
  if(vs.length){var last=vs[vs.length-1],k=last.check||parseCheck(last.text);
    var fixedAfter=r.steps.some(function(x){return x.k==="fix"&&x.id>last.id&&x.state==="done";});
    c.appendChild(mk("div",r.passed?"blx-ok":"blx-bad",r.passed?"✓ Checked by "+last.name+(vs.length>1?" after "+(vs.length-1)+" correction"+(vs.length>2?"s":""):"")+": no problem found":fixedAfter?"Checked by "+last.name+": "+(k.items.length||"some")+" finding"+(k.items.length===1?"":"s")+"; the answer was corrected for "+(k.items.length===1?"it":"them")+" and not checked again at this effort":"Checked by "+last.name+": "+(k.items.length||"some")+" finding"+(k.items.length===1?"":"s")+" remain, listed in the steps above"));}
  if(r.agree||r.agree2){var A=r.agree2||r.agree,ag=mk("div","blx-agree");
    ag.textContent=(A.n===A.of?"Ingenium's own count: all "+A.of+" answers agree":"Ingenium's own count: "+A.n+" of "+A.of+" answers agree")+" (“"+A.value+"”)"+(r.agree2&&r.agree&&r.agree.n!==r.agree2.n?"; before they read each other, "+r.agree.n+" of "+r.agree.of+" did.":".");c.appendChild(ag);}
  var items=(r.account||[]);
  if(items.length){var dd=mk("details","blx-acc");dd.open=items.length<=6;dd.appendChild(mk("summary",null,"How it was settled"));var ul=mk("ul");
    items.forEach(function(x){var li=mk("li");if(x.k){li.appendChild(mk("span","blx-k",x.k.charAt(0).toUpperCase()+x.k.slice(1)+": "));}li.appendChild(D.createTextNode(x.t));ul.appendChild(li);});dd.appendChild(ul);
    dd.appendChild(mk("p","blx-who","In the words of the model that wrote each step; Ingenium has not checked these against sources."));c.appendChild(dd);}
  if(r.notes&&r.notes.length){r.notes.forEach(function(n){c.appendChild(mk("p","blx-who",n));});}
  var acts=mk("div","bl-acts2");
  if(r.seed&&r.seed.chat)acts.appendChild(blKey("Send back to the conversation",function(){backToChat(r);}));
  acts.appendChild(blKey("Open in the chat",function(){toChat(r);}));
  acts.appendChild(blKey("Copy",function(btn){supCopy(f.text,btn);}));
  acts.appendChild(blKey("Into a folder",function(){toFolder(r);}));
  acts.appendChild(blKey("Notes",function(){toNote(r);}));
  acts.appendChild(blKey("Tabula",function(){toTabula(r);}));
  acts.appendChild(blKey("Word",function(){try{lxSaveWord(String(r.task||"Blend").slice(0,60),f.text);}catch(e){toast("The Word file could not be made: "+(e&&e.message||e));}}));
  c.appendChild(acts);return c;}
function show2(r){var out=$("blendOut");if(!out)return;out.innerHTML="";
  var head=mk("div","bl-head");head.appendChild(mk("div","bl-q",r.seed?"Checking a reply: "+r.task:r.task));
  var E=r.eff||{lv:3},en=E.ultra?"Ultra":(LV[E.lv]||LV[3]).name;
  head.appendChild(mk("div","small muted",stratName(r.strategy)+(r.chose?" (Ingenium chose it: "+r.chose+")":"")+" · "+en+" effort"+(E.auto?" (Auto: "+E.why+")":"")+" · "+cpTimeSafe(r.at)+(r.status==="stopped"?" · stopped":"")+(r.done&&r.status!=="running"?" · took "+took(r.done-r.at):"")));
  var strip=mk("div","blx-strip");(r.parts||[]).forEach(function(p){strip.appendChild(mk("span",p.kind==="cloud"?"cx":"",p.name+(p.weight>1?" ×"+p.weight:"")+(p.pid===r.writer?" · writes":"")));});head.appendChild(strip);out.appendChild(head);
  if(r.plan&&r.plan.length){sec(out,"The plan");var ol=mk("ol","blx-plan");r.plan.forEach(function(x){var li=mk("li",x.met===true?"done":x.met===false?"miss":"");li.appendChild(mk("i",null,x.met===true?"✓":""));li.appendChild(D.createTextNode(x.t));ol.appendChild(li);});out.appendChild(ol);}
  if(r.seed){sec(out,"The reply being checked");var sc=mk("div","bl-card");var hh=mk("div","bl-card-h");hh.appendChild(mk("b",null,r.seed.by||"The chat's reply"));sc.appendChild(hh);var sb=mk("div","md bl-body");sb.innerHTML=md(r.seed.text);sc.appendChild(sb);out.appendChild(sc);}
  var groups=[["answer","Answers"],["draft","Drafts, each improving the one before"],["revise","After reading each other"],["divide","The division of the work"],["part","The parts"],["check","The checks"],["judge",null],["combine",null],["assemble",null],["verify","Checks of the final answer"],["fix",null]];
  var shownFinalSteps={};if(r.final&&r.final.step!=null)shownFinalSteps[r.final.step]=1;
  groups.forEach(function(g){var L=r.steps.filter(function(s){return s.k===g[0];});if(!L.length)return;if(g[0]==="part")L=L.slice().sort(function(a,b){return a.part-b.part;});
    if(g[0]==="combine"||g[0]==="assemble"||g[0]==="judge"||g[0]==="fix"){L=L.filter(function(s){return !shownFinalSteps[s.id]&&s.state!=="writing"&&s.state!=="thinking"&&s.state!=="loading";});if(!L.length)return;sec(out,g[0]==="fix"?"Earlier corrections":"Writing the answer");}
    else sec(out,g[1]);
    L.forEach(function(s){if(s.k==="plan")return;out.appendChild(stepCard(r,s));});});
  if(r.strategy==="vote"&&!r.final&&r.status!=="running"&&r.steps.some(function(s){return s.state==="done";}))out.appendChild(mk("p","small muted bl-pickhint","Keep the answer you like best with the key under it; it then becomes this blend's answer."));
  var fc=finalCard(r);if(fc){sec(out,"The answer");out.appendChild(fc);}
  if(r.error){var e=mk("p","bl-note bad",r.error);out.appendChild(e);}
  if(r.steps.length){var tl=mk("details","blx-time");tl.appendChild(mk("summary",null,"Every step, in order ("+r.steps.length+")"));var ol2=mk("ol");
    r.steps.forEach(function(s){ol2.appendChild(mk("li",null,(KIND_NAMES[s.k]||s.k)+(s.k==="part"?" "+s.part:"")+": "+s.name+(s.kind==="cloud"?" (connected)":" (on this device)")+" · "+(STATE_NAMES[s.state]||s.state)+(s.ms?" · "+took(s.ms):"")));});tl.appendChild(ol2);out.appendChild(tl);}}
var _raf=0;
function liveFor(r){return function(){if(_raf)return;_raf=(W.requestAnimationFrame||function(f){return setTimeout(f,16);})(function(){_raf=0;if(!r)return;var out=$("blendOut");if(!out||!out.isConnected)return;
    var showing=out.getAttribute("data-run");if(showing&&showing!==r.id)return;
    var keep={};out.querySelectorAll(".bl-think-b").forEach(function(t){var c=t.closest(".bl-card");if(c)keep[c.getAttribute("data-ix")||"f"]={top:t.scrollTop,follow:t.scrollHeight-t.scrollTop-t.clientHeight<24};});
    var y=out.scrollTop,follow=out.scrollHeight-out.scrollTop-out.clientHeight<60;show2(r);out.setAttribute("data-run",r.id);
    out.querySelectorAll(".bl-think-b").forEach(function(t){var c=t.closest(".bl-card"),k=keep[c&&c.getAttribute("data-ix")||"f"];t.scrollTop=(!k||k.follow)?t.scrollHeight:k.top;});
    out.scrollTop=follow?out.scrollHeight:y;});};}
(function wrapShow(){var o=W.blShow;W.blShow=blShow=function(r){var out=$("blendOut");if(r&&r.v===2){show2(r);if(out)out.setAttribute("data-run",r.id);return;}if(out)out.removeAttribute("data-run");
    if(!r&&out){out.innerHTML='<div class="bl-empty"><b>The answers appear here.</b><br>Choose two or more models (on this device, connected, or both), how they work together and the effort; then write the question and press Run blend. The models on this device answer one after another; your connected models answer at the same time. Each answer appears here as it is written, then the final answer, with how it was reached.</div>';return;}
    return o.apply(this,arguments);};})();

/* ================= 9. where the answer goes: the chat, a folder, Notes, Tabula, Word ================= */
function msgsOf(r){return [{role:"me",text:r.task,at:r.at},{role:"bot",text:r.final.text,at:r.at,done:r.done||Date.now(),note:noteOf(r)}];}
function noteOf(r){return "Blended by "+(r.house?r.house+" from ":"")+(r.parts||[]).map(function(p){return p.name+(p.weight>1?" (×"+p.weight+")":"");}).join(", ")+" · "+stratName(r.strategy)+" · "+((r.eff&&r.eff.ultra)?"Ultra":(LV[(r.eff&&r.eff.lv)||3]||LV[3]).name)+" effort"+(r.passed?" · checked: no problem found":"")+". Every step is on the Blend page.";}
/* the Chat page opens on the conversation it last showed (R112), so it is told which one first, as R131 tells it */
function openConv(c){state.activeChat=c.id;try{if(typeof ccState==="function"){var cs=ccState();if(c.kind==="code")cs.activeCode=c.id;else cs.activeChat=c.id;}}catch(e){}save();try{go(c.kind==="code"?"code":"chat");}catch(e){}try{renderChat();}catch(e){}}
function toChat(r){if(!r.final)return;var c={id:"c"+Date.now().toString(36),title:("Blend: "+String(r.task||"")).slice(0,60),messages:msgsOf(r)};state.chats=state.chats||[];state.chats.push(c);openConv(c);}
/* an earlier blend's Open in the chat (R99) went to the Chat page's last conversation, not the new one */
W.blToChat=blToChat=function(r){if(!r||!r.final)return;if(r.v===2){toChat(r);return;}var c={id:"c"+Date.now().toString(36),title:("Blend: "+String(r.task||"")).slice(0,60),messages:[
    {role:"me",text:r.task,at:r.at},{role:"bot",text:r.final.text,at:r.at,done:r.done||Date.now(),note:"Blended from "+(r.answers||[]).map(function(a){return a.name;}).join(", ")+" ("+stratName(r.strategy)+")."}]};
  state.chats=state.chats||[];state.chats.push(c);openConv(c);};
function toFolder(r){if(!r.final)return;var F=[];try{F=W.IngFolders?IngFolders.folders():[];}catch(e){}
  if(!F.length){toast("There are no folders yet: make one on the Folders page, then press this again.");return;}
  var opts=F.map(function(f){return '<option value="'+esc(f.id)+'">'+esc(f.name||"Folder")+'</option>';}).join("");
  var box=modalOpen('<h3>Into a folder</h3><p class="small muted" style="margin-top:0">The question and the blended answer become a conversation in the folder, with the folder\'s way of working.</p><label class="field"><span>Folder</span><select id="blxFolder">'+opts+'</select></label><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px"><button class="btn ghost" id="blxFNo" type="button">Cancel</button><button class="btn primary" id="blxFOk" type="button">Put it there</button></div>');
  box.querySelector("#blxFNo").onclick=closeModal;
  box.querySelector("#blxFOk").onclick=function(){var id=box.querySelector("#blxFolder").value,f=F.filter(function(x){return String(x.id)===id;})[0];closeModal();if(!f)return;
    var c={id:"c"+Date.now().toString(36),title:("Blend: "+String(r.task||"")).slice(0,60),projectId:f.id,messages:msgsOf(r)};state.chats=state.chats||[];state.chats.push(c);save();
    try{if(W.IngFolders&&IngFolders.paint)IngFolders.paint();}catch(e){}toast("Put in "+(f.name||"the folder")+" as a conversation.");};}
function toNote(r){if(!r.final)return;try{var n=newStickyNote();n.text="<p><b>"+esc(String(r.task||"").slice(0,140))+"</b></p>"+sanitizeHtml(md(r.final.text));save();renderStickyPins();updateNotesCount();toast("Kept as a note.");}catch(e){toast("The note could not be made: "+(e&&e.message||e));}}
function toTabula(r){if(!r.final)return;try{if(!state.tabulaDoc||typeof state.tabulaDoc!=="object")state.tabulaDoc={title:"Untitled page",body:""};
  if(!state.tabulaDoc.title||state.tabulaDoc.title==="Untitled page")state.tabulaDoc.title=String(r.task||"Blend").slice(0,80);
  state.tabulaDoc.body=(state.tabulaDoc.body||"")+"<h2>"+esc(String(r.task||"").slice(0,200))+"</h2>"+sanitizeHtml(md(r.final.text))+"<hr>";save();
  if(!go._tabulaBuilt){var h=$("tabulaHost");if(h){buildTabula(h);go._tabulaBuilt=true;}}go("tabula");}catch(e){toast("Tabula could not take it: "+(e&&e.message||e));}}
function backToChat(r){var sd=r.seed;if(!sd||!r.final)return;var c=(state.chats||[]).filter(function(x){return x.id===sd.chat;})[0];if(!c){toast("That conversation is no longer here.");return;}
  c.messages.push({role:"bot",text:r.final.text,at:Date.now(),done:Date.now(),note:"Checked with Blend by "+(r.parts||[]).map(function(p){return p.name;}).join(", ")+" ("+(r.passed?"no problem found in the end":"the findings and corrections are on the Blend page")+")."});
  openConv(c);}

/* ================= 10. the Blend page: who takes part, effort and Ultra, the ways, the writer, the estimate ================= */
var effMenu=null,effPop=null;
function effLineFor(e){var b=bst();var line=EFFLINE[e];var lv=e==="ultra"?5:e==="auto"?null:+e;
  if(lv){var room=LV[lv].room;line+=" A connected model may write up to "+room.toLocaleString("en-GB")+" tokens; a model on this device up to a quarter of its memory"+(lv>=2?"; from Medium up each one thinks first":"")+".";}
  return line;}
function paintEffKey(){var k=$("blxEffKey");if(!k)return;var e=effOf(bst());k.innerHTML="";k.classList.toggle("ultra",e==="ultra");
  if(e==="ultra")k.appendChild(mk("span","eff-gem"));k.appendChild(D.createTextNode(effName(e)));k.appendChild(mk("span","chev","▾"));
  k.setAttribute("aria-label","Effort: "+effName(e)+". "+EFFSHORT[e]+" Press to choose.");var l=$("blxEffLine");if(l)l.textContent=EFFSHORT[e];paintEst();}
function closeEff(){if(effMenu&&!effMenu.hidden){effMenu.hidden=true;var k=$("blxEffKey");if(k)k.setAttribute("aria-expanded","false");}if(effPop)effPop.hidden=true;}
function showPop(anchor,e){if(!effPop){effPop=mk("div","eff-pop");effPop.id="blxEffPop";effPop.setAttribute("role","tooltip");effPop.hidden=true;D.body.appendChild(effPop);}
  effPop.innerHTML="";effPop.appendChild(mk("b",null,effName(e)));effPop.appendChild(mk("p",null,effLineFor(e)));effPop.hidden=false;
  try{var a=anchor.getBoundingClientRect(),w=effPop.offsetWidth||300,h=effPop.offsetHeight||120;var left=a.right+10;if(left+w>innerWidth-8)left=Math.max(8,a.left-w-10);
    var top=Math.max(8,Math.min(a.top,innerHeight-h-8));effPop.style.left=Math.round(left)+"px";effPop.style.top=Math.round(top)+"px";}catch(_){}}
function openEff(){var k=$("blxEffKey");if(!k)return;if(!effMenu){effMenu=mk("div","eff-menu");effMenu.id="blxEffMenu";effMenu.setAttribute("role","menu");effMenu.setAttribute("aria-label","Blend's effort");effMenu.hidden=true;D.body.appendChild(effMenu);
    effMenu.addEventListener("click",function(e){e.stopPropagation();});D.addEventListener("click",closeEff);
    effMenu.addEventListener("keydown",function(e){var bs=[].slice.call(effMenu.querySelectorAll(".eff-opt")),i=bs.indexOf(D.activeElement);
      if(e.key==="Escape"){e.preventDefault();closeEff();try{k.focus();}catch(_){}}else if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();var n=bs[(i+(e.key==="ArrowDown"?1:bs.length-1)+bs.length)%bs.length];if(n)n.focus();}});}
  effMenu.innerHTML="";var cur=effOf(bst());effMenu.appendChild(mk("div","eff-h","Blend's effort"));effMenu.appendChild(mk("div","eff-note","How hard each model works, and how many times the final answer is checked."));
  ["auto",1,2,3,4,5,"sep","ultra"].forEach(function(e){if(e==="sep"){effMenu.appendChild(mk("div","eff-sep"));return;}
    var b=mk("button","eff-opt");b.type="button";b.setAttribute("role","menuitemradio");b.setAttribute("aria-checked",String(cur===e));b.appendChild(mk("span","eff-dot"));
    var tx=mk("span");tx.appendChild(D.createTextNode(effName(e)));tx.appendChild(mk("small",null,{auto:"Ingenium chooses for each question.",1:"Quick, no thinking.",2:"Thinks briefly.",3:"Thinks; the usual choice.",4:"Thinks longer; the answer is checked once.",5:"The most; checked up to twice.",ultra:"Plans, answers, checks and fixes until the check passes."}[e]));b.appendChild(tx);
    b.addEventListener("click",function(ev){ev.stopPropagation();var bb=bst();bb.eff=e;save();closeEff();paintEffKey();});
    b.addEventListener("mouseenter",function(){showPop(b,e);});b.addEventListener("mouseleave",function(){if(effPop)effPop.hidden=true;});b.addEventListener("focus",function(){showPop(b,e);});b.addEventListener("blur",function(){if(effPop)effPop.hidden=true;});
    effMenu.appendChild(b);});
  var f=mk("div","eff-foot");var g=mk("button",null,"About Blend, effort and Ultra");g.type="button";g.onclick=function(){closeEff();openGuide();};f.appendChild(g);effMenu.appendChild(f);
  effMenu.hidden=false;k.setAttribute("aria-expanded","true");
  try{var a=k.getBoundingClientRect(),w=effMenu.offsetWidth||330,h=effMenu.offsetHeight||420;var left=Math.max(8,Math.min(a.left,innerWidth-w-8)),top=a.bottom+6;if(top+h>innerHeight-8)top=Math.max(8,a.top-h-6);
    effMenu.style.left=Math.round(left)+"px";effMenu.style.top=Math.round(top)+"px";effMenu.style.bottom="auto";}catch(_){}
  var on=effMenu.querySelector('.eff-opt[aria-checked="true"]')||effMenu.querySelector(".eff-opt");try{on.focus({preventScroll:true});}catch(_){}}
function paintCx(pick){var b=bst();var old=pick.querySelectorAll(".blx-cx,.blx-cxh,.blx-none");[].forEach.call(old,function(x){x.remove();});
  var L=kept();
  if(state.models.length<2&&pick.className!=="bl-pick"){pick.className="bl-pick";pick.textContent="";
    (state.models||[]).forEach(function(m){var ok=blCanRun(m),lab=mk("label","bl-model"+(ok?"":" off"));var cb=mk("input");cb.type="checkbox";cb.checked=b.ids.indexOf(m.id)>=0;cb.disabled=!ok&&!cb.checked;
      cb.onchange=function(){if(cb.checked){if(b.ids.indexOf(m.id)<0)b.ids.push(m.id);}else b.ids=b.ids.filter(function(x){return x!==m.id;});save();blPaintNote();paintWriter();paintEst();};
      var sw=mk("span","bl-sw");sw.style.background=m.color||"var(--ink-3)";lab.appendChild(cb);lab.appendChild(sw);lab.appendChild(mk("span","bl-mn",lname(m)));lab.appendChild(mk("span","small muted",(m.paramB?m.paramB+"B":"")+(ok?"":" · not ready on this device")));pick.appendChild(lab);});}
  pick.appendChild(mk("div","blx-cxh","Your connected models"));
  if(!L.length){var n=mk("div","blx-none");n.appendChild(D.createTextNode("Connect Claude, GPT, Gemini, Kimi, OpenRouter or Ollama in Settings, and their models can join a blend beside the ones on this device. "));
    var k=mk("button",null,"Open Connect");k.type="button";k.onclick=function(){try{if(typeof openConnections==="function"){openConnections();return;}}catch(e){}try{go("settings");}catch(e){}};n.appendChild(k);pick.appendChild(n);return;}
  L.forEach(function(k){var mine=b.cx.filter(function(x){return x.conn===k.id;})[0],model=(mine&&mine.model)||k.model||(k.models||[])[0]||"";
    var lab=mk("label","bl-model blx-cx");var cb=mk("input");cb.type="checkbox";cb.checked=!!mine;
    var sw=mk("span","bl-sw");sw.style.background="#2f5ea0";var nm=mk("span","bl-mn",nice(model));var sub=mk("span","small muted",svc(k));
    var sel=null;if((k.models||[]).length>1){sel=mk("select","blx-ms");sel.setAttribute("aria-label","Which of "+svc(k)+"'s models");(k.models||[]).slice(0,200).forEach(function(id){var o=mk("option",null,nice(id));o.value=id;sel.appendChild(o);});sel.value=model;
      sel.onclick=function(e){e.stopPropagation();};sel.onchange=function(){var x=b.cx.filter(function(y){return y.conn===k.id;})[0];if(x){var oldPid=cxPid(k.id,x.model);x.model=sel.value;if(b.weights[oldPid]){b.weights[cxPid(k.id,x.model)]=b.weights[oldPid];delete b.weights[oldPid];}}nm.textContent=nice(sel.value);model=sel.value;save();paintWriter();};}
    var ws=mk("select","bl-w");ws.title="Weight: how much this model counts when answers are weighed";[1,2,3,4,5].forEach(function(nn){var o=mk("option",null,"×"+nn);o.value=nn;ws.appendChild(o);});ws.value=String(wOf(b,cxPid(k.id,model)));
    ws.onclick=function(e){e.stopPropagation();};ws.onchange=function(){b.weights[cxPid(k.id,model)]=+ws.value;save();paintWriter();};
    cb.onchange=function(){b.cx=b.cx.filter(function(x){return x.conn!==k.id;});if(cb.checked)b.cx.push({conn:k.id,model:model});save();blPaintNote();paintWriter();paintEst();};
    lab.appendChild(cb);lab.appendChild(sw);lab.appendChild(nm);lab.appendChild(sub);if(sel)lab.appendChild(sel);lab.appendChild(ws);pick.appendChild(lab);});}
function paintStrats(){var host=$("blendStrats");if(!host)return;var b=bst();host.innerHTML="";
  GROUPS.forEach(function(g){if(g.t)host.appendChild(mk("div","blx-grp",g.t));
    g.ids.forEach(function(id){var st=stratById(id);if(!st)return;var lab=mk("label","blend-strat"+(b.strategy===id?" on":""));
      var rb=mk("input");rb.type="radio";rb.name="blendStrat";rb.checked=b.strategy===id;
      rb.onchange=function(){b.strategy=id;save();paintStrats();paintWriter();paintEst();try{var n=$("blendStrats").querySelector('input[name="blendStrat"]:checked');if(n)n.focus({preventScroll:true});}catch(_){}};
      var on=b.strategy===id;lab.appendChild(rb);var t=mk("span");t.innerHTML="<b style='color:var(--ink-1)'>"+esc(st.name)+"</b><br><span class='small muted'>"+esc(on?st.desc:(SHORT[id]||st.desc))+"</span>";lab.appendChild(t);host.appendChild(lab);});});}
function paintRows(){var host=$("blendStrats");if(!host)return;var row=$("blxEffRow");
  if(!row){row=mk("div","blx-row");row.id="blxEffRow";var l=mk("label",null,"Effort");l.setAttribute("for","blxEffKey");row.appendChild(l);
    var k=mk("button","btn small ghost blx-effkey");k.type="button";k.id="blxEffKey";k.setAttribute("aria-haspopup","true");k.setAttribute("aria-expanded","false");
    k.addEventListener("click",function(e){e.stopPropagation();if(effMenu&&!effMenu.hidden)closeEff();else openEff();});
    k.addEventListener("mouseenter",function(){if(!effMenu||effMenu.hidden)showPop(k,effOf(bst()));});k.addEventListener("mouseleave",function(){if(effPop)effPop.hidden=true;});
    row.appendChild(k);var ln=mk("span","blx-effline");ln.id="blxEffLine";row.appendChild(ln);host.parentNode.insertBefore(row,host.nextSibling);
    var wr=mk("div","blx-row");wr.id="blxWriterRow";var wl=mk("label",null,"Who writes the final answer");wl.setAttribute("for","blWriter");wr.appendChild(wl);var ws=mk("select");ws.id="blWriter";wr.appendChild(ws);
    ws.onchange=function(){bst().writer=ws.value;save();paintEst();};row.parentNode.insertBefore(wr,row.nextSibling);}
  paintEffKey();paintWriter();}
function chosenParts(){var b=bst();return partsOf({ids:b.ids,cx:b.cx,weights:b.weights});}
function paintWriter(){var ws=$("blWriter");if(!ws)return;var b=bst(),ps=chosenParts().filter(function(p){return p.ok;});var w=writerOf(ps,"auto");
  ws.innerHTML="";var o=mk("option",null,"Ingenium chooses"+(w?" ("+w.name+" now)":""));o.value="auto";ws.appendChild(o);
  ps.forEach(function(p){var x=mk("option",null,p.name+(p.kind==="cloud"?" · "+p.sub:" · on this device"));x.value=p.pid;ws.appendChild(x);});
  ws.value=ps.some(function(p){return p.pid===b.writer;})?b.writer:"auto";
  ws.title="Ingenium chooses: the model with the greatest weight; at equal weight a connected model of Claude, GPT, Gemini, Kimi or OpenRouter before one on this device, then the largest.";
  var row=$("blxWriterRow");if(row)row.hidden=b.strategy==="vote";}
function paintEst(){var host=$("blxEst"),acts=D.querySelector("#page-blend .bl-acts");if(!acts)return;if(!host){host=mk("div","blx-est");host.id="blxEst";host.setAttribute("aria-live","polite");acts.parentNode.insertBefore(host,acts);}
  var b=bst(),ps=chosenParts().filter(function(p){return p.ok;});if(ps.length<2){host.textContent="";paintSeed();return;}
  var loc=ps.filter(function(p){return p.kind==="local";}).length,cl=ps.length-loc,e=effOf(b),task=($("blendTask")||{}).value||"",E=resolveEff(e,task);
  var sid=b.strategy||"synth",why="";if(sid==="auto"){var a=autoStrat(task,ps.length);sid=a.id;why=a.why;}if(bst().seed)sid="verify";
  var n=ps.length,calls={refine:n,vote:n,synth:n+1,weigh:n+1,judge:n+1,debate:2*n+1,verify:bst().seed?n+1:n+1,split:n+2}[sid]||n+1;if(E.ultra)calls++;var ck=sid==="vote"?0:nChecks(E);
  var t=calls+" steps to write"+(loc&&cl?": the "+loc+" model"+(loc>1?"s":"")+" on this device one after another, the "+cl+" connected at the same time":loc?", one after another on this device":", by your connected models, at the same time where they can")+".";
  if(ck)t+=" Then the final answer is checked"+(ck>1?" and corrected up to "+ck+" times":" and corrected once if needed")+".";
  if(bst().seed)t+=" A reply from the chat is checked, so the way is Check every claim.";else if(b.strategy==="auto")t+=" Ingenium would choose "+stratName(sid)+": "+why+".";
  if(e==="auto")t+=" Auto would choose "+(LV[E.lv]||LV[3]).name+" effort"+(E.why?" ("+E.why+")":"")+".";
  host.textContent=t;paintSeed();}
function paintSeed(){var b=bst(),host=$("blxSeed"),acts=D.querySelector("#page-blend .bl-acts");if(!acts)return;
  if(!b.seed){if(host)host.remove();return;}
  if(!host){host=mk("div","blx-seed");host.id="blxSeed";acts.parentNode.insertBefore(host,acts);}
  host.innerHTML="";host.appendChild(mk("b",null,"A reply from the chat will be checked, claim by claim. "));host.appendChild(D.createTextNode("It came from "+(b.seed.by||"the chat")+": “"+String(b.seed.text||"").replace(/\s+/g," ").slice(0,140)+(String(b.seed.text||"").length>140?"…":"")+"”. Every model chosen above checks it, and the writer corrects it."));
  var x=blKey("Do not check it",function(){delete bst().seed;save();paintSeed();paintEst();});host.appendChild(x);}
(function wrapRender(){var o=W.renderBlend;W.renderBlend=renderBlend=function(){var r=o.apply(this,arguments);try{var pick=$("blendPick");if(pick)paintCx(pick);paintStrats();paintRows();paintEst();
    var sv=$("blendSave");if(sv)sv.onclick=function(){saveHouse();};
    var tk=$("blendTask");if(tk&&!tk.__blx){tk.__blx=1;tk.addEventListener("input",function(){clearTimeout(tk.__t);tk.__t=setTimeout(paintEst,250);});}
    patchHouses();}catch(e){warn(e);}return r;};})();
(function wrapNote(){var o=W.blPaintNote;if(typeof o!=="function")return;var n=function(msg,kind){var r=o.apply(this,arguments);try{if(!msg&&!(BL.run&&BL.run.status==="running")){var ps=chosenParts().filter(function(p){return p.ok;}),el2=$("blendNote");
      if(el2){var loc=ps.filter(function(p){return p.kind==="local";}).length;el2.textContent=ps.length>=2?ps.length+" models chosen"+(loc&&loc<ps.length?" ("+loc+" on this device, "+(ps.length-loc)+" connected)":"")+".":"Choose at least two models: on this device, connected, or both.";}}}catch(e){}return r;};
  if(o.__r173)n.__r173=true;W.blPaintNote=blPaintNote=n;})();

/* the run, from the page */
function pageRun(){var b=bst();
  if(BL.run&&BL.run.status==="running"){blPaintNote("A blend is running: its answers are on the right. Stop it first to start another.","bad");return;}
  var task=($("blendTask").value||"").trim(),ps=chosenParts(),ready=ps.filter(function(p){return p.ok;});
  if(ps.length<2){blPaintNote("Choose two or more models above.","bad");return;}
  if(ready.length<2){blPaintNote("At least two of the chosen models must be ready: on this device (the Models page) or connected (Settings, Connect).","bad");return;}
  if(!task){blPaintNote("Write the question first.","bad");$("blendTask").focus();return;}
  var anyLocal=ready.some(function(p){return p.kind==="local";});
  if(anyLocal&&(W.liveBot||Engine.status==="busy"||Engine.status==="loading")){blPaintNote("The engine on this device is busy (a chat reply or Lector). Let it finish, then run the blend; or blend only connected models.","bad");return;}
  try{if(anyLocal&&W.Lector&&Lector.LX&&Lector.LX.busy){blPaintNote("Lector is using the engine. Let it finish or stop it on the Lector page first.","bad");return;}}catch(e){}
  var seed=b.seed||null;
  var g=begin({task:task,ids:b.ids,cx:b.cx,weights:b.weights,eff:effOf(b),strategy:b.strategy,writer:b.writer,seed:seed});
  if(seed){g.r.seed=seed;delete b.seed;}
  var r=g.r;BL.run=r;BL.stop=false;b.runs.unshift(r);b.runs=b.runs.slice(0,8);b.draft="";save();blPaintNote();var live=liveFor(r);show2(r);var out=$("blendOut");if(out)out.setAttribute("data-run",r.id);
  var cloudSys=sysFor(true),localSys=sysFor(false);
  var ctx={E:g.E,parts:g.parts,writer:g.writer,live:live,msgs:function(p,prompt){var L=[{role:"system",content:p.kind==="cloud"?cloudSys:localSys},{role:"user",content:prompt}];return L;}};
  runCore(r,ctx).then(function(){r.status="done";},function(e){r.status=BL.stop?"stopped":"done";if(!BL.stop&&!r.final&&r.strategy!=="vote")r.error=String(e&&e.message||e);})
    .then(function(){finish(r);show2(r);try{paintSeed();paintEst();}catch(_){}
      blPaintNote(r.status==="stopped"?"Stopped. What was written is kept below.":(r.error?r.error:(r.strategy==="vote"?"Done. Keep the answer you like best.":"Done. The answer is at the foot of the results, with how it was reached.")),r.error?"bad":"");try{blPaintEarlier();}catch(_){}});}
W.blendRun=blendRun=pageRun;
W.blendStop=blendStop=function(){if(!BL.run)return;BL.stop=true;try{Engine.abort();}catch(e){}ABS.forEach(function(a){try{a.abort();}catch(e){}});blPaintNote("Stopping…");};
(function rebind(){var k=$("blendRun"),s=$("blendStop");if(k)k.onclick=pageRun;if(s)s.onclick=W.blendStop;})();

/* ================= 11. houses: a blend kept, with its connected models, effort and writer, answering in the chat ================= */
function saveHouse(edit){var b=bst(),ps=chosenParts();var h=edit&&edit.id?edit:null;
  if(!h&&ps.length<2){blPaintNote("Choose two or more models above, then save them as a house.","bad");return;}
  var box=modalOpen('<h3>'+(h?"Rename this blend":"Save this blend as a house")+'</h3><p class="small muted" style="margin-top:0">'+(h?"":"It keeps the models (on this device and connected), the way they are brought together, their weights, the effort and who writes. You then choose it in the chat like Velox or Scriba.")+'</p>'
    +'<label class="field"><span>Name</span><input type="text" id="bhName" maxlength="40" placeholder="Thesis reader"></label>'
    +'<label class="field"><span>What it is for <span class="muted small">(shown under its name)</span></span><input type="text" id="bhFor" maxlength="120" placeholder="Close reading of a chapter, with sources"></label>'
    +'<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px"><button class="btn ghost" id="bhCancel" type="button">Cancel</button><button class="btn primary" id="bhOk" type="button">Save</button></div>');
  var nm=box.querySelector("#bhName"),fr=box.querySelector("#bhFor");if(h){nm.value=h.name;fr.value=h.purpose||"";}
  box.querySelector("#bhCancel").onclick=closeModal;
  box.querySelector("#bhOk").onclick=function(){var name=nm.value.trim();if(!name){nm.focus();return;}
    if(h){h.name=name;h.purpose=fr.value.trim();}
    else{var w={};ps.forEach(function(p){w[p.pid]=wOf(b,p.pid);});
      bhList().push({id:"bh"+Date.now().toString(36),name:name,purpose:fr.value.trim(),ids:b.ids.slice(),cx:b.cx.map(function(x){return {conn:x.conn,model:x.model};}),strategy:b.strategy==="vote"?"weigh":b.strategy,eff:effOf(b),writer:b.writer||"auto",think:effOf(b)!==1,weights:w,made:Date.now(),v:2});}
    save();closeModal();try{bhPaintList();}catch(e){}patchHouses();toast(h?"Renamed.":("Saved. Choose "+name+" in the chat's model menu, under Your blends."));};
  setTimeout(function(){nm.focus();},30);}
W.bhSaveDialog=bhSaveDialog=saveHouse;
function houseParts(h){return partsOf({ids:h.ids||[],cx:h.cx||[],weights:h.weights||{}});}
function patchHouses(){var host=$("bhList");if(!host)return;var L=bhList(),rows=host.querySelectorAll(".bh-row");
  [].forEach.call(rows,function(row,i){var h=L[i];if(!h)return;var ps=houseParts(h);
    var sub=row.querySelector(".bh-t .small");if(sub&&!sub.__blx){sub.__blx=1;sub.textContent=(h.purpose?h.purpose+" · ":"")+stratName(h.strategy)+" · "+effName(effOf(h))+" effort · "+ps.map(function(p){return p.name+(p.weight>1?" ×"+p.weight:"");}).join(", ");}
    [].forEach.call(row.querySelectorAll("button"),function(k){var t=k.textContent.trim();
      if(t==="Load here")k.onclick=function(){var b=bst();b.ids=(h.ids||[]).slice();b.cx=(h.cx||[]).map(function(x){return {conn:x.conn,model:x.model};});b.strategy=h.strategy;b.eff=effOf(h);b.writer=h.writer||"auto";b.weights=Object.assign({},h.weights||{});save();renderBlend();};
      if(t==="Rename")k.onclick=function(){saveHouse(h);};});});}
(function wrapMenu(){var o=W.paintModelMenu;if(typeof o!=="function")return;W.paintModelMenu=paintModelMenu=function(){var r=o.apply(this,arguments);try{var m=$("chatModelMenu");if(!m)return r;
    [].forEach.call(m.querySelectorAll("[data-blend]"),function(b){var h=bhById(b.getAttribute("data-blend"));if(!h)return;var tg=b.querySelector(".tier-tag");if(tg){var n=(h.ids||[]).length+(h.cx||[]).length;tg.textContent=n+" models";}});}catch(e){}return r;};})();
/* a house answering in the chat */
function bhRun2(h,rec){var parts=houseParts(h),ready=parts.filter(function(p){return p.ok;});
  var bot={role:"bot",text:"",live:true,at:Date.now()};curMsgs().push(bot);trimChat();save();renderChat();
  function end(msg){bot.text=msg;delete bot.live;if(W.liveBot===bot)W.liveBot=null;try{liveBot=W.liveBot;}catch(_){}save();renderChat();}
  if(ready.length<2){end("The blend "+h.name+" needs two of its models ready (on this device, or connected); "+(ready.length?"only "+ready[0].name+" is.":"none is.")+" Install them on the Models page, connect them in Settings, or choose another model.");return;}
  if(BL.run&&BL.run.status==="running"){end("A blend is already running on the Blend page. Let it finish or stop it, then send again.");return;}
  var anyLocal=ready.some(function(p){return p.kind==="local";});
  if(anyLocal&&(Engine.status==="busy"||Engine.status==="loading")){end("The engine on this device is busy. Let it finish, then send again.");return;}
  try{liveBot=bot;}catch(_){}W.liveBot=bot;
  var g=begin({task:rec.text||"(the attached files)",ids:h.ids||[],cx:h.cx||[],weights:h.weights||{},eff:effOf(h),strategy:h.strategy==="vote"?"weigh":h.strategy,writer:h.writer||"auto",house:h.name});
  var r=g.r;BL.run=r;BL.stop=false;blState().runs.unshift(r);blState().runs=blState().runs.slice(0,8);
  function stat(t){bot.status="⚗ "+h.name+": "+t;try{renderChatLive(bot);}catch(_){}}
  var hist=null,cloudSys=sysFor(true);
  function swapLast(L,content){var out=L.slice();for(var i=out.length-1;i>=0;i--)if(out[i].role==="user"){out[i]=Object.assign({},out[i],{content:content});break;}return out;}
  function forCloud(L){/* her own details reach a connected model only when she allows it (Settings, Your Ingenium) */return [{role:"system",content:cloudSys}].concat(L.filter(function(m){return m.role!=="system";}));}
  var pageLive=liveFor(r);
  var live=function(){pageLive();var s=r.steps[r.steps.length-1];if(!s)return;var what=(KIND_NAMES[s.k]||"")+(s.k==="answer"?"":"");
    if(/combine|judge|assemble|fix/.test(s.k)&&s.text&&!r.final){bot.text=cutAtSettle(s.k==="judge"?(parseJudge(s.text,99).final||""):s.text);bot.status="";try{renderChatLive(bot);}catch(_){}}
    else stat(s.name+": "+(s.k==="answer"?"answering":what.toLowerCase())+"…");};
  var ctx={E:g.E,parts:g.parts,writer:g.writer,live:live,msgs:function(p,prompt,first){var L=first?(r.plan&&r.plan.length?swapLast(hist,prompt):hist):swapLast(hist,prompt);return p.kind==="cloud"?forCloud(L):L;}};
  chatPrepare(rec,bot).then(function(prep){if(prep&&prep.sources)bot.sources=prep.sources;bot.status="";hist=chatHistory(false,prep);if(hist.cut)bot.note=cutNote();
      /* the plan (Ultra) and the first answers carry the question as she wrote it; the later steps their own words */
      var lastU="";for(var k=hist.length-1;k>=0;k--)if(hist[k].role==="user"){lastU=hist[k].content;break;}r.task=typeof lastU==="string"?lastU:(rec.text||r.task);
      return runCore(r,ctx);})
    .then(function(){r.status="done";if(!r.final)throw new Error("No model in the blend gave an answer.");bot.text=r.final.text;},
      function(e){r.status=(BL.stop||!bot.live)?"stopped":"done";if(!bot.text||!r.final)bot.text=(BL.stop||!bot.live)?"Stopped.":"The blend could not answer: "+(e&&e.message||e);})
    .then(function(){finish(r);bot.status="";if(r.final)bot.text=r.final.text;bot.note=noteOf(r);bot.blendRun=r.id;
      delete bot.live;bot.done=Date.now();if(W.liveBot===bot)W.liveBot=null;try{if(liveBot===bot)liveBot=null;}catch(_){}
      save();renderChat();try{blPaintEarlier();}catch(e){}});}
W.bhRun=bhRun=bhRun2;try{if(W.IngBlendHouses)IngBlendHouses.run=bhRun2;}catch(e){}
/* a house answers whatever the chat's source: the older rule let it answer only when the chat was on the models of this device */
(function wrapSend(){var o=W.sendRec;if(typeof o!=="function")return;var n=function(rec){try{var c=curChat(),h=c&&c.blendHouseId&&bhById(c.blendHouseId);
    if(h&&chatSource()==="cloud"&&state.cloud&&state.cloud.on&&state.cloud.provider)return bhRun2(h,rec);}catch(e){warn(e);}return o.apply(this,arguments);};
  Object.keys(o).forEach(function(k){if(!(k in n))n[k]=o[k];});W.sendRec=sendRec=n;})();

/* ================= 12. the chat: Check with Blend, under any reply ================= */
function checkReply(chatId,ix){var c=(state.chats||[]).filter(function(x){return x.id===chatId;})[0];if(!c)return;var mm=c.messages[ix];if(!mm||mm.role!=="bot"||!mm.text)return;
  var q="";for(var i=ix-1;i>=0;i--){if(c.messages[i].role==="me"){q=c.messages[i].text||"";break;}}
  var by="the chat's reply";try{if(mm.cx&&mm.cx.model)by=nice(mm.cx.model);else if(mm.model)by=mm.model;}catch(e){}
  var b=bst();b.seed={text:mm.text,by:by,chat:c.id,ix:ix};$("blendTask")&&($("blendTask").value=q||"(the reply's question was not found)");b.draft=q;b.strategy=b.strategy||"synth";save();
  go("blend");try{if(W.IngRooms)IngRooms.open("blend","new");}catch(e){}try{renderBlend();}catch(e){}
  var ps=chosenParts().filter(function(p){return p.ok;});
  toast(ps.length>=1?"The reply is set to be checked. Choose the models that check it, then press Run blend.":"Choose the models that check the reply, then press Run blend.");}
(function wrapFill(){var o=W.fillMsg;if(typeof o!=="function")return;var n=function(d,mm){var r=o.apply(this,arguments);try{
    if(mm&&mm.role==="bot"&&mm.text&&!mm.live&&!mm.preview&&!mm.blendRun){var acts=d.querySelector(".msg-acts");if(acts&&!acts.querySelector(".blx-chk")){
      var k=mk("button","msg-act blx-chk","Check with Blend");k.type="button";k.title="Send this reply to Blend: the models you choose check it claim by claim, and the corrected answer can come back here";
      k.onclick=function(){var c=curChat();if(!c)return;var ix=c.messages.indexOf(mm);if(ix<0)return;checkReply(c.id,ix);};acts.appendChild(k);}}}catch(e){}return r;};
  try{Object.keys(o).forEach(function(k){if(n[k]===undefined)n[k]=o[k];});}catch(e){}n.__r218=1;W.fillMsg=fillMsg=n;})();

/* ================= 13. the Guide: Blend, its ways, effort and Ultra ================= */
function openGuide(){try{go("guide");}catch(e){}setTimeout(function(){var g=$("blxGuide");if(g){try{g.scrollIntoView({block:"start",behavior:"smooth"});}catch(_){g.scrollIntoView();}}},120);}
function guideCard(){var page=$("page-guide");if(!page||$("blxGuide"))return;var c=mk("div","card blx-guide");c.id="blxGuide";
  c.innerHTML='<h3>Blend: several models, one answer</h3><p class="small muted" style="margin-top:0">Blend asks two or more models the same question and brings their answers together. The models on this device answer one after another; your connected models (Claude, GPT, Gemini, Kimi, OpenRouter, Ollama) answer at the same time.</p>';
  var dl=mk("dl");function row(t,d){dl.appendChild(mk("dt",null,t));dl.appendChild(mk("dd",null,d));}
  row("Ingenium chooses",AUTO_S.desc);STRATS.forEach(function(s){row(s.name,s.desc);});
  row("Effort","How hard each model works. "+EFFLINE[1]+" Medium: "+EFFLINE[2]+" High: "+EFFLINE[3]+" Extra: "+EFFLINE[4]+" Max: "+EFFLINE[5]);
  row("Auto",EFFLINE.auto);row("Ultra",EFFLINE.ultra);
  row("Who writes","The model that writes the final answer (and, for Check every claim and Divide the work, the first answer or the plan). Ingenium chooses the model with the greatest weight; at equal weight a connected model of Claude, GPT, Gemini, Kimi or OpenRouter before one on this device, then the largest. You can choose it yourself.");
  row("How it was settled","Under the answer: what the answers agreed on, how each disagreement was settled, what was left out, and which findings of a check were accepted or rejected. These are the writing model's own words, not checked against sources. Where every answer is short (a name, a number, a yes or no), Ingenium counts itself how many agree.");
  row("Check with Blend","Under any reply in the chat. The reply goes to Blend; the models you choose check it claim by claim; the writer corrects it; and the corrected answer can go back to that conversation.");
  row("Where it goes","The chat, a folder (as a conversation with the folder's way of working), Notes, Tabula, a Word file, or the clipboard. A blend kept as a house answers in the chat like any model.");
  c.appendChild(dl);var anchor=$("guideEffortCard")||page.querySelector(".card:last-of-type");if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(c,anchor.nextSibling);else page.appendChild(c);}

/* ================= 14. start ================= */
function boot(){try{guideCard();}catch(e){warn(e);}try{if($("blendPick"))renderBlend();}catch(e){warn(e);}
  try{var b=blState();(b.runs||[]).forEach(function(x){if(x&&x.v===2&&x.status==="running"){x.status="stopped";(x.steps||[]).forEach(function(s){if(/waiting|loading|thinking|writing/.test(s.state))s.state="stopped";});}});}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function later(){var n=0;(function wait(){if(W.__ingReady===true){boot();return;}if(++n<400)setTimeout(wait,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r218)return;var ng=function(p){var r=og.apply(this,arguments);try{if(p==="guide")guideCard();if(p==="blend"){paintEst();paintSeed();}}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r218=true;W.go=go=ng;})();

W.IngBlend={version:1,run:function(spec){var g=begin(spec);return g;},parts:chosenParts,effort:function(){return effOf(bst());},strategies:function(){return [AUTO_S].concat(STRATS);},
  prompts:P,parse:{account:account,check:parseCheck,plan:parsePlan,judge:parseJudge,split:parseSplit,changed:changed},agree:agree,account:account,autoStrategy:autoStrat,autoEffort:autoEff,
  checkReply:checkReply,openConv:openConv,writerOf:writerOf,checkerOf:checkerOf,rank:rank,sysFor:sysFor,show:show2,levels:LV};
})();
;try{window.__ingParts["p218"]="running";}catch(_){}
</script>
