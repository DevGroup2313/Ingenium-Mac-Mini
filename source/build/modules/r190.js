<style id="r190-css">
/* ============ R190 · THE WORKING LOOP: A MODEL SEARCHES, READS, EDITS AND RUNS THE APP ITSELF, IN THE WAY SHE CHOOSES (Ingenium 6.8.11) ============
   The owner's words (28 October 2026): "I want to be able to edit my apps right on the code chat or the main chat page as
   well as the Build page with the local models [...] the models are not able to follow my instructions as you do here and
   help me edit and make changes to any of my apps inside of Ingenium but it was created for that purpose [...] I want the
   models to be aware of what I need them to do and make surgical edits and help me improve my apps." And, the same day: "I
   want to be able to automate where I want and also meticulously review and do on my own at my own pace", in a workspace
   "that gives you the ressources and assistance when you need it and also the guidance when you need it and allows you to
   learn and do it yourself"; asked how, she chose a switch on each task.
   Until now a model had one attempt: it was handed the passages Ingenium guessed would matter, and had to write every
   change as an edit block in one reply, copying lines it might never have been shown. A model that works well on code
   works the other way: it looks for the code itself, reads the exact lines, changes them, runs the app, reads its errors
   and tries again. Now every model works so, in Code, in a chat with files and on the Build page, with six tools:
     list_files · search · read · edit · write_file · run_app
   - Connected models take the tools in their service's own form: Claude (Anthropic), Kimi (Moonshot or OpenRouter),
     OpenAI, LM Studio, Gemini and others of that form, and Ollama on this computer, on the network or in its cloud.
   - The models on this device take them as written tags (<tool_call>), the form Qwen's models and most small models
     learn; the results are kept short so they fit a small model's memory. A model of 1 to 4 billion parameters still
     errs often in a large app: the review card (below) is there so nothing it gets wrong is kept without her seeing it.
   - Each task has its way, chosen on a key beside the model's name (her last choice is the next task's):
       Do it for me          it finds, changes and checks the app on its own; every change is kept and can be undone
       Step by step with me  it shows each change, lines before and after, with its reason, and waits: make it, skip it
                             (with a word on why or what instead), make all the rest, or stop here
       Guide me, I do it     it reads and shows her where and what to change, and why, one step at a time; it changes
                             nothing, and reads the file again to check her change when she says it is done
   Each step is shown under the reply in plain words, and every change is kept as a version (Code), a changed file (Chat)
   or with its Undo key (Build). Plan first (Code) still reads only and plans. A service or model that refuses tools
   answers as before, in one reply. Ingenium speaks to each service through the same network path as every connection
   (netFetch: in the computer and phone apps through the app itself, so no site refuses it). */
.ag-steps{margin:2px 0 10px;padding:8px 11px;border-left:2px solid var(--accent,#6a3fb5);border-radius:0 9px 9px 0;background:var(--accent-softer,rgba(106,63,181,.06));
  font:12.5px/1.5 var(--sans,system-ui,sans-serif);color:var(--ink-2,#4a4358);list-style:none}
.ag-steps li{display:flex;gap:7px;align-items:baseline;margin:0;padding:1px 0}
.ag-steps li .ag-i{flex:0 0 auto;width:14px;text-align:center;color:var(--accent,#6a3fb5);font-weight:700}
.ag-steps li.bad{color:#9a5a12}
.ag-steps li.bad .ag-i{color:#9a5a12}
.ag-steps li.you{color:var(--ink-3,#6c6579)}
.ag-steps summary{cursor:pointer;color:var(--accent,#6a3fb5);font-weight:600;list-style:none}
.ag-steps summary::-webkit-details-marker{display:none}
body[data-theme="night"] .ag-steps li.bad,body[data-theme="night"] .ag-steps li.bad .ag-i{color:#e0b07a}
/* the way, beside the model's name */
.ag-way-wrap{position:relative;display:inline-flex;align-items:center;flex:0 0 auto}
.ag-way-key{white-space:nowrap;flex:0 0 auto}
.ag-way-wrap[hidden]{display:none}
.ag-way-key .ag-way-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--accent,#6a3fb5);margin-right:6px;flex:0 0 auto}
.ag-way-key[data-way="auto"] .ag-way-dot{background:#2f7a55}
.ag-way-key[data-way="guide"] .ag-way-dot{background:#b8791f}
.ag-way-menu{position:fixed;z-index:60;width:min(340px,86vw);padding:6px;border-radius:14px;background:var(--surface,#fff);
  border:1px solid var(--hairline,rgba(34,26,46,.12));box-shadow:0 2px 0 rgba(40,22,68,.08),0 12px 30px rgba(40,22,68,.18)}
.ag-way-menu[hidden]{display:none}
.ag-way-menu .ag-way-h{padding:6px 10px 4px;font:700 11px/1.2 var(--sans,system-ui,sans-serif);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3,#6c6579)}
.ag-way-menu button{display:block;width:100%;text-align:left;border:0;background:transparent;border-radius:10px;padding:8px 10px;margin:1px 0;cursor:pointer;color:var(--ink-1,#221a2e);
  font:600 13px/1.35 var(--sans,system-ui,sans-serif)}
.ag-way-menu button small{display:block;font-weight:400;color:var(--ink-3,#6c6579);font-size:12px;line-height:1.4;margin-top:2px}
.ag-way-menu button:hover{background:var(--accent-softer,rgba(106,63,181,.06))}
.ag-way-menu button[aria-checked="true"]{background:var(--accent-softer,rgba(106,63,181,.08));box-shadow:inset 0 0 0 1px var(--accent,#6a3fb5)}
.ag-way-menu button:focus-visible{outline:2px solid var(--accent,#6a3fb5);outline-offset:1px}
body[data-theme="night"] .ag-way-menu{background:#241d31;border-color:rgba(205,184,240,.14);box-shadow:0 2px 0 rgba(0,0,0,.5),0 12px 30px rgba(0,0,0,.5)}
body[data-theme="night"] .ag-way-menu button{color:#f3eefb}
body[data-theme="night"] .ag-way-menu button small{color:#a99cc1}
/* a change to review */
.ag-ask{margin:4px 0 12px;padding:12px 13px;border-radius:12px;border:1px solid var(--accent,#6a3fb5);background:var(--surface,#fff);
  box-shadow:0 2px 0 rgba(40,22,68,.10),0 8px 18px rgba(40,22,68,.10);font:13px/1.45 var(--sans,system-ui,sans-serif);color:var(--ink-1,#221a2e)}
.ag-ask h4{margin:0 0 3px;font:700 14px/1.35 var(--sans,system-ui,sans-serif);color:var(--ink-1,#221a2e)}
.ag-ask .ag-ask-p{margin:0 0 8px;font-size:12.5px;color:var(--ink-2,#4a4358)}
.ag-diff{margin:0 0 9px;max-height:320px;overflow:auto;border-radius:8px;border:1px solid var(--hairline,rgba(34,26,46,.12));background:rgba(34,26,46,.025);
  font:12px/1.55 ui-monospace,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace}
.ag-diff div{display:flex;padding:0 8px 0 0;white-space:pre-wrap;word-break:break-word}
.ag-diff .n{flex:0 0 auto;min-width:3.4em;padding:0 8px 0 6px;text-align:right;color:var(--ink-3,#6c6579);user-select:none}
.ag-diff .m{flex:0 0 auto;width:1.2em;font-weight:700;user-select:none}
.ag-diff .t{flex:1 1 auto;min-width:0}
.ag-diff .del{background:rgba(184,67,63,.10)}.ag-diff .del .m{color:#a8423e}
.ag-diff .add{background:rgba(47,122,85,.12)}.ag-diff .add .m{color:#2f7a55}
.ag-diff .gap{color:var(--ink-3,#6c6579);font-style:italic;padding-left:12px}
.ag-ask textarea{display:block;width:100%;box-sizing:border-box;min-height:38px;resize:vertical;margin:0 0 9px;padding:7px 9px;border-radius:9px;
  border:1px solid var(--hairline,rgba(34,26,46,.14));background:transparent;color:var(--ink-1,#221a2e);font:13px/1.4 var(--sans,system-ui,sans-serif)}
.ag-ask .ag-keys{display:flex;flex-wrap:wrap;gap:7px;align-items:center}
.ag-ask .ag-keys .ag-go{background:linear-gradient(#7348be,#5d37a1);color:#fff;border-color:#4b2a86}
.ag-ask .ag-keys .ag-go:hover{filter:brightness(1.06)}
body[data-theme="night"] .ag-ask{background:#241d31;border-color:#b79ce6;color:#f3eefb;box-shadow:0 2px 0 rgba(0,0,0,.5),0 8px 18px rgba(0,0,0,.4)}
body[data-theme="night"] .ag-ask h4{color:#f3eefb}
body[data-theme="night"] .ag-ask .ag-ask-p{color:#d3c9e3}
body[data-theme="night"] .ag-diff{background:rgba(255,255,255,.03);border-color:rgba(205,184,240,.14)}
body[data-theme="night"] .ag-diff .del{background:rgba(239,154,149,.12)}body[data-theme="night"] .ag-diff .del .m{color:#ef9a95}
body[data-theme="night"] .ag-diff .add{background:rgba(127,209,166,.12)}body[data-theme="night"] .ag-diff .add .m{color:#7fd1a6}
body[data-theme="night"] .ag-ask textarea{color:#f3eefb;border-color:rgba(205,184,240,.18)}
/* Build: ask a model to change the page */
#agBuild{margin:14px 0 0;padding:14px 16px;border-radius:14px;border:1px solid var(--hairline,rgba(34,26,46,.10));background:var(--surface,#fff);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 1px 0 rgba(40,22,68,.10),0 6px 12px rgba(40,22,68,.07);font:13.5px/1.5 var(--sans,system-ui,sans-serif);color:var(--ink-1,#221a2e)}
#agBuild .agb-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 12px;margin:0 0 8px}
#agBuild .agb-head b{font:700 15px/1.3 var(--serif,"Iowan Old Style",Georgia,serif)}
#agBuild .agb-who{font-size:12px;color:var(--ink-3,#6c6579)}
#agBuild .agb-eff{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin:0 0 10px}
#agBuild .agb-effl{display:inline-flex;align-items:center;gap:8px;font:600 12.5px/1 var(--sans,system-ui,sans-serif);color:var(--ink-2,#4a4358)}
#agBuild .agb-effsel{font:600 12.5px/1.2 var(--sans,system-ui,sans-serif);color:var(--ink-1,#221a2e);padding:6px 10px;border-radius:10px;border:1px solid var(--hairline,rgba(34,26,46,.14));background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f6f2fb));box-shadow:var(--pop,0 1px 2px rgba(40,22,68,.12))}
#agBuild .agb-effsay{flex:1 1 220px;min-width:0;font-size:12px;line-height:1.45;color:var(--ink-3,#6c6579)}
#agBuild .eff-says{font-size:12px;color:var(--ink-3,#6c6579);margin:0 0 6px}
#agBuild .agb-ways{display:inline-flex;flex-wrap:wrap;gap:3px;padding:3px;border-radius:11px;background:rgba(34,26,46,.035);border:1px solid var(--hairline,rgba(34,26,46,.08))}
#agBuild .agb-ways button{border:0;background:transparent;color:var(--ink-2,#4a4358);font:600 12.5px/1 var(--sans,system-ui,sans-serif);padding:7px 11px;border-radius:8px;cursor:pointer}
#agBuild .agb-ways button[aria-checked="true"]{background:linear-gradient(#ffffff,#f6f2fb);color:var(--ink-1,#221a2e);box-shadow:inset 0 0 0 1px var(--accent,#6a3fb5),0 1px 2px rgba(40,22,68,.12)}
#agBuild .agb-ways button:focus-visible{outline:2px solid var(--accent,#6a3fb5);outline-offset:1px}
#agBuild .agb-say{margin:6px 0 10px;font-size:12.5px;color:var(--ink-2,#4a4358)}
#agBuild .agb-row{display:flex;gap:8px;align-items:flex-end}
#agBuild textarea.agb-in{flex:1 1 auto;min-height:44px;max-height:180px;resize:vertical;padding:8px 10px;border-radius:10px;border:1px solid var(--hairline,rgba(34,26,46,.14));
  background:transparent;color:var(--ink-1,#221a2e);font:13.5px/1.45 var(--sans,system-ui,sans-serif)}
#agBuild .agb-out{margin-top:10px}
#agBuild .agb-out:empty{display:none}
#agBuild .agb-reply p{margin:0 0 8px}
#agBuild .agb-after{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
#agBuild .agb-after[hidden]{display:none}
body[data-theme="night"] #agBuild{background:#201a2b;border-color:rgba(205,184,240,.11);color:#f3eefb;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 1px 0 rgba(0,0,0,.6),0 6px 12px rgba(0,0,0,.35)}
body[data-theme="night"] #agBuild .agb-ways button{color:#d3c9e3}
body[data-theme="night"] #agBuild .agb-ways button[aria-checked="true"]{background:linear-gradient(#2a2239,#251e33);color:#f3eefb;box-shadow:inset 0 0 0 1px #b79ce6}
body[data-theme="night"] #agBuild textarea.agb-in{color:#f3eefb;border-color:rgba(205,184,240,.18)}
body[data-theme="night"] #agBuild .agb-say{color:#d3c9e3}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p190"]="started";}catch(_){}
(function(){"use strict";
if(window.IngAgent)return;
/* the connections that take tools; another Ingenium lending its model does not (its server has no tool form) */
var TOOLS_OK={"anthropic":1,"openai":1,"moonshot":1,"openrouter":1,"lmstudio":1,"gemini":1,"openai-compat":1,"ollama-local":1,"ollama-lan":1,"ollama-cloud":1};
var NO_TOOLS={};  /* provider|model pairs that refused tools in this session: they answer in one reply */

/* ---------- the three ways ---------- */
var WAYS={auto:{key:"For me",name:"Do it for me",say:"It finds the code, changes it and checks the app on its own. Every change is kept and can be undone."},
  step:{key:"With me",name:"Step by step with me",say:"It shows you each change, the lines before and after and why, and waits for you to make it or skip it."},
  guide:{key:"Guide me",name:"Guide me, I do it",say:"It reads the code and shows you where and what to change, and why, one step at a time, so you make each change yourself. It changes nothing."}};
var ORDER=["auto","step","guide"];
function agentOn(){return !(state.agent&&state.agent.off);}
function lastWay(){var w=state.agent&&state.agent.way;return WAYS[w]?w:"step";}
function wayOf(c){c=c||curChat();var w=c&&c.way;return WAYS[w]?w:lastWay();}
function setWay(w,c){if(!WAYS[w])return;c=c||curChat();if(c)c.way=w;state.agent=state.agent||{};state.agent.way=w;saveState();paintWay();}

/* ---------- the tools ---------- */
var TOOLS=[
  {name:"list_files",description:"List the files of the app or conversation being worked on, with their sizes and numbers of lines. Use it first if you do not know the file names.",
    input_schema:{type:"object",properties:{},required:[]}},
  {name:"search",description:"Search every file (or one file) for a word, a phrase or a regular expression. Returns each matching line with its file and line number. Use it to find where something is before reading or changing it.",
    input_schema:{type:"object",properties:{pattern:{type:"string",description:"The text to look for, or a JavaScript regular expression when regex is true."},
      regex:{type:"boolean",description:"Treat pattern as a regular expression. Default false."},file:{type:"string",description:"Only this file. Default: every file."},
      case_sensitive:{type:"boolean",description:"Match capitals exactly. Default false."}},required:["pattern"]}},
  {name:"read",description:"Read lines of a file, with their line numbers. At most 400 lines at a time. Read the code around a place before you change it.",
    input_schema:{type:"object",properties:{file:{type:"string"},start_line:{type:"integer",description:"The first line to read, counting from 1."},end_line:{type:"integer",description:"The last line to read."}},required:["file","start_line","end_line"]}},
  {name:"edit",description:"Change a file: old_text is replaced by new_text. old_text must be copied exactly from the file as read (without the line numbers), spaces included, and must occur once, unless replace_all is true. Keep each change small and precise; make several edits for several places.",
    input_schema:{type:"object",properties:{file:{type:"string"},old_text:{type:"string",description:"The exact text now in the file."},new_text:{type:"string",description:"The text that takes its place."},
      replace_all:{type:"boolean",description:"Replace every occurrence. Default false."}},required:["file","old_text","new_text"]}},
  {name:"write_file",description:"Create a new file with this content, or replace a small file (under 200 KB) whole. For a large file, use edit.",
    input_schema:{type:"object",properties:{file:{type:"string"},content:{type:"string"}},required:["file","content"]}},
  {name:"run_app",description:"Run the app's page as it is now, with the changes made so far, and report the errors it shows. Use it after changing a page or its scripts, then fix what it reports.",
    input_schema:{type:"object",properties:{},required:[]}}];
var READ_ONLY={list_files:1,search:1,read:1,update_plan:1};
/* 6.11 (4 November 2026): the plan, kept as a list she sees checked off, and a check run inside the app as it runs (Ultracode) */
var PLAN_TOOL={name:"update_plan",description:"Keep the plan of this task: a list of small tasks in order, each with its status (pending, in_progress or completed). Send the whole list each time a status changes. Make it at the start of any task of more than two steps; mark a task in_progress when you begin it (one at a time) and completed only when it is done and checked. The person sees the list beside the conversation, each completed task checked off.",
  input_schema:{type:"object",properties:{tasks:{type:"array",description:"The whole plan, in order.",items:{type:"object",properties:{task:{type:"string",description:"What this step does, in a few plain words."},
    status:{type:"string",enum:["pending","in_progress","completed"]},check:{type:"string",description:"Optional: the name of the run_check that proves it done."}},required:["task","status"]}}},required:["tasks"]}};
var CHECK_TOOL={name:"run_check",description:"Run a check inside the app as it runs now, with every change made so far (the app is run again first if it changed). The code is the body of an async JavaScript function run in the app's own page: it may use document and window, click and type, and await; it must return true when the check passes. Anything else it returns (false, or a sentence saying what is wrong) is a failure, and so is an error it throws. Example: document.getElementById('add').click(); return document.getElementById('n').textContent === '1';",
  input_schema:{type:"object",properties:{name:{type:"string",description:"What it checks, in a few plain words."},code:{type:"string",description:"The body of an async JavaScript function, run in the app's page; return true when it passes."}},required:["name","code"]}};
var EXTRA=[PLAN_TOOL,CHECK_TOOL];
function toolDef(n){if(WHEN[n]&&!safeWhen(n))return null;return TOOLS.concat(EXTRA).filter(function(t){return t.name===n;})[0]||null;}
function toolsFor(ro,x){x=x||{};var L=TOOLS.filter(function(t){return (!ro||READ_ONLY[t.name])&&(!WHEN[t.name]||safeWhen(t.name));});
  if(x.ws&&x.ws.connectorsOnly)return L.filter(function(t){return !!WHEN[t.name];});
  if(x.plan)L=L.concat([PLAN_TOOL]);if(x.check&&!ro)L=L.concat([CHECK_TOOL]);return L;}
/* 6.13: tools another part of Ingenium lends the loop (modules/r219.js: the GitHub repository a Code session works on). Each has its
   definition, its handler, whether it only reads, and when it is offered; a tool not offered now is refused as any unknown one */
var HANDLERS={},WHEN={};
function safeWhen(n){try{return !!WHEN[n]();}catch(e){return false;}}
function addTool(def,handler,o){o=o||{};if(!def||!def.name||typeof handler!=="function")return false;
  TOOLS=TOOLS.filter(function(t){return t.name!==def.name;});TOOLS.push(def);HANDLERS[def.name]=handler;if(o.ro)READ_ONLY[def.name]=1;else delete READ_ONLY[def.name];
  if(typeof o.when==="function")WHEN[def.name]=o.when;else delete WHEN[def.name];try{IngAgent.tools=TOOLS;}catch(e){}return true;}

/* ---------- the files worked on ---------- */
function wsFor(bot){var c=curChat();
  if(typeof ccIsCode==="function"&&ccIsCode(c)){var pr=ccProj();if(!pr)return Promise.resolve(null);
    return ccLoadAll(pr).then(function(){var mf=ccMain(pr);
      var files=(pr.files||[]).filter(function(f){return typeof f.text==="string";}).map(function(f){return {name:f.name,text:f.text,orig:f.text,kind:edKind(f.name),main:f===mf,edits:[]};});
      return files.length?{code:true,pr:pr,chatId:c.id,files:files,where:"chat"}:null;});}
  var names=(typeof edChatFiles==="function")?edChatFiles():[];
  /* 6.14: no files, but a connector switched on for this conversation (modules/r220.js): the loop runs with the connectors' tools only */
  if(!names.length){var cx=false;try{cx=!!(window.IngConnectors&&IngConnectors.activeFor(c));}catch(e){}return Promise.resolve(cx?{code:false,chatId:c.id,files:[],where:"chat",connectorsOnly:true}:null);}
  return Promise.all(names.map(function(n){return Promise.resolve(edSource(n,bot)).then(function(s){
      return s&&typeof s.text==="string"&&s.kind!=="doc"?{name:s.name,text:s.text,orig:s.text,kind:s.kind,edits:[]}:null;},function(){return null;});}))
    .then(function(L){L=L.filter(Boolean);return L.length?{code:false,chatId:c.id,files:L,where:"chat"}:null;});}
function wsFile(ws,name){var b=edBase(name);return ws.files.filter(function(f){return edBase(f.name)===b;})[0]||(ws.files.length===1&&!name?ws.files[0]:null);}
function idx(f){if(f._L&&f._Lt===f.text)return f._L;var t=f.text,a=[0];for(var i=t.indexOf("\n");i>=0;i=t.indexOf("\n",i+1))a.push(i+1);if(a.length>1&&a[a.length-1]===t.length)a.pop();f._L=a;f._Lt=t;f._lo=null;return a;}
function lineOf(f,pos){var a=idx(f),lo=0,hi=a.length-1;while(lo<hi){var m=(lo+hi+1)>>1;if(a[m]<=pos)lo=m;else hi=m-1;}return lo+1;}
function lineText(f,n){var a=idx(f),s=a[n-1],e=n<a.length?a[n]-1:f.text.length;return f.text.slice(s,e).replace(/\r?\n?$/,"");}
function dataLike(s){return s.length>2000&&/[A-Za-z0-9+\/=]{800,}/.test(s);}
function shortLine(s){if(s.length<=2000)return s;return s.slice(0,300)+" …["+(dataLike(s)?"data, ":"")+"this line goes on for "+(s.length-300)+" more characters]";}
function cap(s,max){s=String(s);return s.length>max?s.slice(0,max)+"\n…[cut here: ask for less at a time]":s;}
function nameList(ws){return ws.files.map(function(f){return "\""+f.name+"\"";}).join(", ");}

/* ---------- each tool (o.small: a model on this device, whose memory is short) ---------- */
function T_list(ws){return ws.files.map(function(f){return f.name+" · "+idx(f).length+" lines, "+Math.round(f.text.length/1024)+" KB"+(f.main?" (the app's main page: it runs)":"")+(f.isNew?" (new)":"");}).join("\n");}
function T_search(ws,a,o){var pat=String(a.pattern||"");if(!pat)throw new Error("the pattern is empty");
  var files=a.file?[wsFile(ws,a.file)]:ws.files;if(a.file&&!files[0])throw new Error("there is no file \""+a.file+"\" here; the files are "+nameList(ws));
  var re=null;if(a.regex){try{re=new RegExp(pat,a.case_sensitive?"g":"gi");}catch(e){throw new Error("that is not a valid regular expression: "+e.message);}}
  var out=[],total=0,LIM=o.small?20:60,W=o.small?90:140;
  files.forEach(function(f){var t=f.text,hay=t,needle=pat;
    if(!re&&!a.case_sensitive){if(!f._lo||f._lot!==t){f._lo=t.toLowerCase();f._lot=t;}hay=f._lo;needle=pat.toLowerCase();}
    var seen={};
    var hit=function(pos,len){var n=lineOf(f,pos);if(seen[n])return;seen[n]=1;total++;if(out.length>=LIM)return;
      var L=lineText(f,n),ls=idx(f)[n-1],at=pos-ls,ex=L.length<=2*W+40?L.trim():(at>W?"…":"")+L.slice(Math.max(0,at-W),at+len+W).trim()+(at+len+W<L.length?"…":"");
      out.push(f.name+":"+n+": "+ex);};
    if(re){re.lastIndex=0;var m,k=0;while((m=re.exec(t))&&k<5000){hit(m.index,m[0].length||1);if(!m[0].length)re.lastIndex++;k++;}}
    else{var i=hay.indexOf(needle),k2=0;while(i>=0&&k2<5000){hit(i,needle.length);i=hay.indexOf(needle,i+Math.max(1,needle.length));k2++;}}});
  if(!total)return {text:"No line matches \""+pat+"\""+(a.file?" in "+a.file:"")+".",n:0};
  return {text:out.join("\n")+(total>out.length?"\n…and "+(total-out.length)+" more lines. Search for something more particular.":""),n:total};}
function T_read(ws,a,o){var f=wsFile(ws,a.file);if(!f)throw new Error("there is no file \""+a.file+"\" here; the files are "+nameList(ws));
  var MAXL=o.small?80:400,L=idx(f).length,s=Math.max(1,Math.floor(+a.start_line||1)),e=Math.min(L,Math.floor(+a.end_line||s+MAXL/2-1));if(e<s)e=Math.min(L,s+MAXL/2-1);if(e-s>MAXL-1)e=s+MAXL-1;
  if(s>L)throw new Error(f.name+" has "+L+" lines");
  var out=[];for(var n=s;n<=e;n++)out.push(n+"\t"+shortLine(lineText(f,n)));
  return {text:out.join("\n")+(e<L?"\n…("+f.name+" has "+L+" lines)":""),file:f.name,s:s,e:e};}
function countAll(t,s){var n=0,i=t.indexOf(s);while(i>=0&&n<1000){n++;i=t.indexOf(s,i+Math.max(1,s.length));}return n;}
function T_edit(ws,a){var f=wsFile(ws,a.file);if(!f)throw new Error("there is no file \""+a.file+"\" here; the files are "+nameList(ws)+". To make a new file, use write_file");
  var old=String(a.old_text),nw=String(a.new_text);if(!old)throw new Error("old_text is empty; to make a new file, use write_file");if(old===nw)throw new Error("old_text and new_text are the same");
  var t=f.text,n=countAll(t,old),loose=false,at,len;
  if(n===0){var r=edFind(t,old);if(!r){var first=old.split("\n").map(function(x){return x.trim();}).filter(Boolean)[0]||"",hints=[];
        if(first){var i=t.indexOf(first),k=0;while(i>=0&&k<5){hints.push(lineOf(f,i));k++;i=t.indexOf(first,i+first.length);}}
        throw new Error("old_text is not in "+f.name+" as it is now."+(hints.length?" Its first line is at line "+hints.join(", ")+": read there and copy the text exactly.":" Search for a distinctive part of it, read there, and copy the text exactly."));}
    loose=true;at=r.s;len=r.e-r.s;n=1;}
  if(n>1&&!a.replace_all){var lines=[],i2=t.indexOf(old);while(i2>=0&&lines.length<8){lines.push(lineOf(f,i2));i2=t.indexOf(old,i2+old.length);}
    throw new Error("old_text occurs "+n+" times in "+f.name+" (lines "+lines.join(", ")+(n>8?", …":"")+"). Include more of the lines around the one you mean, or set replace_all to change every one.");}
  var line,was=old;
  if(a.replace_all&&!loose&&n>1){line=lineOf(f,t.indexOf(old));f.text=t.split(old).join(nw);}
  else{if(!loose){at=t.indexOf(old);len=old.length;}else was=t.slice(at,at+len);line=lineOf(f,at);f.text=t.slice(0,at)+nw+t.slice(at+len);}
  f.edits.push({find:was.slice(0,4000),repl:nw.slice(0,4000)});
  var ol=was.split("\n").length,nl=nw.split("\n").length,show=[],L=idx(f).length;
  for(var m=Math.max(1,line-2);m<=Math.min(L,line+nl+1);m++)show.push(m+"\t"+shortLine(lineText(f,m)));
  return {text:"Changed "+f.name+" at line "+line+(a.replace_all&&n>1?" and "+(n-1)+" more places":"")+": "+ol+" line"+(ol===1?"":"s")+" became "+nl+"."+(loose?" (Found after allowing for differences in spacing.)":"")+" It now reads:\n"+show.join("\n"),
    file:f.name,line:line,before:was,after:nw,more:a.replace_all&&n>1?n-1:0};}
function T_write(ws,a){var name=String(a.file||"").trim();if(!name)throw new Error("the file needs a name");var f=wsFile(ws,name),txt=String(a.content==null?"":a.content);
  if(f&&f.text.length>200*1024)throw new Error(f.name+" is "+Math.round(f.text.length/1024)+" KB: change it with edit, not by writing it whole");
  var made=!f;if(made){f={name:name,text:"",orig:"",kind:edKind(name),edits:[],isNew:true};ws.files.push(f);}
  var before=f.text;f.edits.push({find:before.slice(0,4000),repl:txt.slice(0,4000)});f.text=txt;
  return {text:(made?"Made ":"Wrote ")+f.name+": "+idx(f).length+" lines.",file:f.name,line:1,before:before,after:txt,made:made};}
function pageOf(ws){var m=ws.files.filter(function(f){return f.main;})[0]||ws.files.filter(function(f){return /\.html?$/i.test(f.name);})[0];if(!m)return null;
  var h=m.text;
  h=h.replace(/<script\b([^>]*)\bsrc=["']([^"':]+)["']([^>]*)>\s*<\/script>/gi,function(all,x,src,y){var f=wsFile(ws,src);return f&&f!==m?"<script"+x+y+">\n"+f.text.replace(/<\/script/gi,"<\\/script")+"\n<\/script>":all;});
  h=h.replace(/<link\b([^>]*)\bhref=["']([^"':]+\.css)["']([^>]*)>/gi,function(all,x,href){var f=wsFile(ws,href);return f?"<style>\n"+f.text+"\n</style>":all;});
  return {html:h,name:m.name};}
function errorsIn(pane){if(!pane)return [];return [].slice.call(pane.querySelectorAll(".cerr")).map(function(x){return x.textContent.replace(/^✕\s*/,"");}).slice(-12);}
function ranText(es){return {text:es.length?"The app ran and shows "+es.length+" error"+(es.length===1?"":"s")+":\n"+es.map(function(x){return "- "+x;}).join("\n"):"The app ran and shows no errors.",errs:es.length};}
function T_plan(ws,a){var L=a.tasks;if(!Array.isArray(L))throw new Error("tasks must be a list");if(!L.length)throw new Error("the plan is empty");if(L.length>80)throw new Error("the plan has more than 80 tasks: group them");
  var MAP={pending:"todo",in_progress:"doing",completed:"done",done:"done",todo:"todo",doing:"doing"};
  var tasks=L.map(function(x,i){if(!x||typeof x!=="object")throw new Error("task "+(i+1)+" is not an object");var t=String(x.task||x.title||x.content||"").replace(/\s+/g," ").trim();if(!t)throw new Error("task "+(i+1)+" has no words");
    var st=MAP[String(x.status||"pending").toLowerCase()];if(!st)throw new Error("task "+(i+1)+" has the status \""+x.status+"\"; use pending, in_progress or completed");
    var o={t:t.length>200?t.slice(0,197)+"\u2026":t,s:st};if(x.check)o.check=String(x.check).slice(0,120);return o;});
  var done=tasks.filter(function(x){return x.s==="done";}).length,now=tasks.filter(function(x){return x.s==="doing";})[0];
  ws.plan={tasks:tasks,at:Date.now()};
  return {text:"Plan kept: "+done+" of "+tasks.length+" completed."+(now?" Now: "+now.t+".":"")+(tasks.filter(function(x){return x.s==="doing";}).length>1?" (Keep one task in_progress at a time.)":""),
    say:"Plan: "+done+" of "+tasks.length+" done"+(now?" · now: "+(now.t.length>60?now.t.slice(0,57)+"\u2026":now.t):"")};}
var CHK={};
window.addEventListener("message",function(e){var d=e.data;if(!d||typeof d!=="object"||!d.__ingCheckRes)return;var w=CHK[d.__ingCheckRes];if(!w)return;
  if(w.frame&&e.source!==w.frame.contentWindow)return;delete CHK[d.__ingCheckRes];clearTimeout(w.t);w.res(d);});
function stageCheck(ws,code){var fr=document.getElementById(ws.where==="build"?"previewFrame":"csFrame");
  if(!fr||!fr.contentWindow)return Promise.resolve({pass:false,error:"the app is not running in the preview"});
  var id="k"+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
  return new Promise(function(res){var w={frame:fr,res:res,t:setTimeout(function(){delete CHK[id];res({pass:false,error:"the check gave no answer within 8 seconds (it may wait for something that never happens, or the page did not load)"});},8000)};CHK[id]=w;
    try{fr.contentWindow.postMessage({__ingCheck:id,code:String(code)},"*");}catch(e){clearTimeout(w.t);delete CHK[id];res({pass:false,error:String(e&&e.message||e)});}});}
function T_check(ws,a){var code=String(a.code||"");if(!code.trim())throw new Error("the check's code is empty");
  var name=String(a.name||"a check").slice(0,120),first=ws.dirty||!ws.ranOnce?T_run(ws):Promise.resolve(null);
  return first.then(function(rr){if(rr&&rr.errs<0)return {pass:false,text:"The app could not be run here, so the check could not run: "+rr.text};
    if(rr){ws.dirty=false;ws.ranOnce=true;ws.lastRun={errs:rr.errs};}
    return stageCheck(ws,code).then(function(r){ws.checks=ws.checks||{};ws.checks[name]=!!r.pass;
      var said=r.error?"It threw an error: "+r.error:(r.value!==undefined?"It returned: "+r.value:"");
      return {pass:!!r.pass,text:(r.pass?"PASSED: ":"FAILED: ")+name+(said?"\n"+said:"")+(rr&&rr.errs>0?"\n(The app was run again first and shows "+rr.errs+" error"+(rr.errs===1?"":"s")+": "+rr.text.split("\n").slice(1,4).join(" ")+")":"")};});});}
function canRun(ws){return !!(ws&&(ws.run||pageOf(ws)));}
function T_run(ws){
  if(ws.run)return ws.run();
  var p=pageOf(ws);if(!p)return Promise.resolve({text:"There is no page (.html) here to run.",errs:-1});
  try{csShow({kind:"file",html:p.html,name:p.name},{user:true});}catch(e){return Promise.resolve({text:"The page could not be run here: "+(e&&e.message||e),errs:-1});}
  var wait=p.html.length>3e6?9000:p.html.length>3e5?4500:2600;
  return new Promise(function(res){setTimeout(function(){var es=[];try{es=mkStageErrors();}catch(e){}res(ranText(es));},wait);});}
/* the input as the tool's schema asks: a missing or mistyped field is answered as an error, never run */
function checkInput(t,a){if(!a||typeof a!=="object"||Array.isArray(a))return "the input is not an object";
  var sc=t.input_schema,p=sc.properties||{};for(var i=0;i<(sc.required||[]).length;i++){var k=sc.required[i];if(a[k]===undefined||a[k]===null)return "\""+k+"\" is missing";}
  for(var key in a){if(!p[key])continue;var ty=p[key].type,v=a[key];
    if(ty==="string"&&typeof v!=="string")return "\""+key+"\" must be text";if(ty==="boolean"&&typeof v!=="boolean")return "\""+key+"\" must be true or false";
    if(ty==="integer"&&!(typeof v==="number"&&isFinite(v))&&!(typeof v==="string"&&/^\d+$/.test(v)))return "\""+key+"\" must be a whole number";}
  return "";}
function q(s){s=String(s||"");return "“"+(s.length>60?s.slice(0,57)+"…":s)+"”";}
function exec(ws,name,a,o){var t=toolDef(name);
  if(!t||(o.ro&&!READ_ONLY[name]))return Promise.resolve({text:"There is no tool \""+name+"\""+(o.ro&&t?" now: this task only reads (the person "+(o.way==="guide"?"makes the changes":"has asked for a plan first")+")":"")+".",err:true,
    step:{i:"!",t:o.ro&&t?"Tried to "+name.replace("_"," ")+", which this way does not allow":"Asked for a tool it does not have ("+name+")",bad:true}});
  var why=checkInput(t,a);if(why)return Promise.resolve({text:"The input to "+name+" is not right: "+why+". Send it again.",err:true,step:{i:"!",t:"Sent "+name+" an input it could not use",bad:true}});
  try{
    if(HANDLERS[name])return Promise.resolve(HANDLERS[name](ws,a,o)).then(function(r){r=r||{};if(typeof r==="string")r={text:r};if(!r.step)r.step={i:"•",t:name.replace(/_/g," ")};return r;},
      function(e){var m=e&&e.message||String(e);return {text:"That did not work: "+m,err:true,step:{i:"!",t:"Could not "+name.replace(/_/g," ")+": "+m.slice(0,120),bad:true}};});
    if(name==="list_files")return Promise.resolve({text:T_list(ws),step:{i:"≡",t:"Looked at the files"}});
    if(name==="search"){var r=T_search(ws,a,o);return Promise.resolve({text:r.text,step:{i:"⌕",t:"Searched for "+q(a.pattern)+(a.file?" in "+a.file:"")+" · "+(r.n?r.n+" place"+(r.n===1?"":"s"):"not found")}});}
    if(name==="read"){var r2=T_read(ws,a,o);return Promise.resolve({text:r2.text,step:{i:"¶",t:"Read "+r2.file+", lines "+r2.s+"–"+r2.e}});}
    if(name==="edit"){var r3=T_edit(ws,a);r3.changed=true;r3.step={i:"✎",t:"Changed "+r3.file+" at line "+r3.line+(r3.more?" and "+r3.more+" more places":"")};return Promise.resolve(r3);}
    if(name==="write_file"){var r4=T_write(ws,a);r4.changed=true;r4.step={i:"✎",t:r4.text.replace(/:.*$/,"")};return Promise.resolve(r4);}
    if(name==="run_app")return T_run(ws).then(function(r5){ws.lastRun={errs:r5.errs};if(r5.errs>=0){ws.dirty=false;ws.ranOnce=true;}return {text:r5.text,step:{i:"▶",t:r5.errs<0?"Could not run the app here":"Ran the app · "+(r5.errs?r5.errs+" error"+(r5.errs===1?"":"s"):"no errors"),bad:r5.errs>0}};});
    if(name==="update_plan"){var r6=T_plan(ws,a);return Promise.resolve({text:r6.text,plan:true,step:{i:"☑",t:r6.say}});}
    if(name==="run_check")return T_check(ws,a).then(function(r7){return {text:r7.text,step:{i:r7.pass?"✓":"✗",t:"Checked "+q(a.name)+" · "+(r7.pass?"passed":"failed"),bad:!r7.pass}};});
  }catch(e){var m=e&&e.message||String(e);return Promise.resolve({text:"That did not work: "+m,err:true,step:{i:"!",t:(name==="edit"?"Could not change "+(a.file||"the file"):"Could not "+name.replace("_"," "))+": "+m.split(". ")[0],bad:true}});}
  return Promise.resolve({text:"Unknown tool.",err:true});}

/* ---------- what the model is told ---------- */
function note(ws,way,plan,x){x=x||{};
  if(ws.connectorsOnly){var cn="";try{cn=window.IngConnectors?IngConnectors.namesFor(curChat()).join(", "):"";}catch(e){}
    return ["You can use the person's connectors"+(cn?" ("+cn+")":"")+": tools that reach outside services for them. Use one when it helps to answer, and say which you used and what it returned.",
      "Never invent what a tool returned. If a tool fails or is not allowed, say so plainly and answer as well as you can without it.",
      "A tool that changes something (sends, creates, deletes, books) asks the person first; ask in words before you use one when the request is not clear."].join("\n");}var what=ws.where==="build"?"page open in Build (one file holding its HTML, CSS and JavaScript)":ws.code?"app":"files";
  var l=["You are working on the person's "+what+" with tools, the way a careful senior engineer pairs with its author. Use the tools; do not write edit blocks or whole files in your reply, and ignore anything above that asks for edit blocks.",
    "Files: "+nameList(ws)+". Large files are mostly data the app carries; search finds the code in them.",
    "Never guess at code you have not read. Keep the author's names, style and comments. Change only what was asked. Use plain words and explain a technical term the first time you use it. If the request is unclear, ask one short question before changing anything."];
  if(way==="guide")l.push("The person wants to make each change themselves, to learn. You may only read (list_files, search, read). Find and read the exact code, then guide them one small step at a time: name the file and the line number, quote the exact text to find, give the exact text to put in its place in a code block, and say in plain words what it does and why. Give one or two steps, then ask them to make the change and tell you when it is done; when they do, read the file again and tell them plainly whether it is right, and how to fix it if not. Never say you have changed anything.");
  else if(plan)l.push("Plan first is on: read only. Find and read the code, then give a short numbered plan (which file, what, why) and ask whether to go ahead. Do not change anything yet.");
  else{l.push("Work in this order: understand the request; find the code with search (and list_files); read the exact lines around it; change only what is needed with edit, copying old_text exactly from what you read (without the line numbers); for a page, run_app and fix any error it reports; then end with two or three plain sentences saying what you changed and how to see it.");
    if(way==="step")l.push("The person reviews every change before it is made, at their own pace. Before each edit, say in one plain sentence what it changes and why. Make one change per edit, so each can be judged on its own. If they skip a change, do not make it again: follow what they said, or ask what they would prefer.");}
  if(x.plan&&!x.ultra)l.push("For a task of more than two steps, keep a plan with update_plan: small tasks in order, one in_progress at a time, each marked completed when it is done. The person sees it as a checklist. A one-step task needs no plan.");
  if(x.ultra&&!plan&&way!=="guide")l.push(["Ultracode is on: the person wants this done thoroughly and checked, at the highest effort. Work in four phases, and show each:",
    "1. Plan. Read what you need first. Then record the plan with update_plan: small tasks in order, each one checkable"+(x.check?", and for each the check that will prove it done (a run_check)":"")+".",
    "2. Build. Work through the tasks in order. Mark a task in_progress when you begin it, and completed only when its check passes. Before each change, say in one plain sentence what it changes and why.",
    "3. Check. "+(x.check?"After changing a page or its scripts, run_app and read its errors; then run_check for each task's check. A check is the body of an async JavaScript function run in the app's page, returning true when it passes: make it test what the person asked for (press the button, then read the result), not merely that an element exists.":"Read the changed code again and compare it with what was asked; run_app where there is a page."),
    "4. Fix. When a check fails or the app shows an error, read the error, find its cause in the code, fix the cause (not the check), and check again. Repeat until every check passes and the app shows no errors. If three different fixes for the same failure do not work, stop and say plainly what fails and why.",
    "Justify each decision briefly. When a choice depends on documentation or a source, name it, or say you have no verified source. End with: what was built, each check and its result, and anything left undone."].join("\n"));
  return l.join("\n");}
/* for a model on this device: the tools as written tags, in the form Qwen's models and most small models learn */
function schemaSig(sc){try{var p=(sc&&sc.properties)||{},o={};Object.keys(p).slice(0,8).forEach(function(k){var t=p[k]&&p[k].type;o[k]=t==="number"||t==="integer"?0:t==="boolean"?false:t==="array"?[]:t==="object"?{}:(p[k]&&p[k].description?String(p[k].description).slice(0,40):"…");});return JSON.stringify(o);}catch(e){return "{}";}}
function localNote(tools){var sig={list_files:"{}",search:"{\"pattern\": \"text to find\"}  (optional: \"file\": \"name\")",read:"{\"file\": \"name\", \"start_line\": 1, \"end_line\": 60}",
    edit:"{\"file\": \"name\", \"old_text\": \"exact text now in the file\", \"new_text\": \"what replaces it\"}",write_file:"{\"file\": \"name\", \"content\": \"the whole new file\"}",run_app:"{}",
    update_plan:"{\"tasks\": [{\"task\": \"what to do\", \"status\": \"pending\"}]}",run_check:"{\"name\": \"what it checks\", \"code\": \"return document.title === 'My app';\"}"};
  return ["# Tools","To use a tool, write exactly this, then stop and wait:","<tool_call>","{\"name\": \"search\", \"arguments\": {\"pattern\": \"greet\"}}","</tool_call>",
    "The result comes back between <tool_response> and </tool_response>. Use one tool at a time. The tools:"].concat(tools.map(function(t){return "- "+t.name+" "+(sig[t.name]||schemaSig(t.input_schema))+": "+String(t.description||"").split(". ")[0]+".";}))
    .concat(["When you have finished, answer in plain words without a tool call."]).join("\n");}

/* ---------- the services, each in its own request form ---------- */
function plainMsgs(messages){var sys="",msgs=[];
  messages.forEach(function(m){if(m.role==="system")sys+=(sys?"\n\n":"")+m.content;else msgs.push({role:m.role,content:typeof m.content==="string"?m.content:(m.content||[]).filter(function(p){return p.type==="text";}).map(function(p){return p.text;}).join("\n")});});
  return {sys:sys,msgs:msgs};}
function failText(r,t){var e=null;try{e=JSON.parse(t);}catch(_){}var m=(e&&e.error&&(e.error.message||e.error))||(e&&e.message)||String(t||"").slice(0,200);
  return "HTTP "+r.status+" "+(typeof m==="string"?m:JSON.stringify(m)).slice(0,240);}
function base(){var c=state.cloud||{};return ((c.base||cloudDefaultBase(c.provider))||"").replace(/\/+$/,"");}
/* Claude, through Anthropic's Messages API: tools, streamed; thinking blocks passed back unchanged, history only appended to */
function anthropicTurn(S,onToken,onThink){var c=state.cloud,mid=String(c.model||"").toLowerCase();
  var modern=/^claude-(fable|mythos|opus-5|sonnet-5|haiku-5|opus-4-[678]|sonnet-4-6)/.test(mid),noXhigh=/^claude-(opus-4-6|sonnet-4-6)/.test(mid),fb=/^claude-(fable-5|opus-5|sonnet-5-5)/.test(mid);
  var EFF={1:"low",2:"medium",3:"high",4:"xhigh",5:"max"},eff=(S.effort&&S.effort.claude)||EFF[(+$("ctlEffort").value)||3]||"high";if(noXhigh&&eff==="xhigh")eff="high";
  var mt=(+$("ctlTokens").value)||0,body={model:c.model,max_tokens:modern?Math.max(mt,S.effort&&S.effort.lv>=5?64000:32000):Math.max(mt,4096),messages:S.msgs,stream:true,
    tools:S.tools.map(function(t){return {name:t.name,description:t.description,input_schema:t.input_schema,eager_input_streaming:true};})};
  if(S.sys)body.system=S.sys;
  if(modern){body.cache_control={type:"ephemeral"};if(S.think)body.thinking={type:"adaptive",display:"summarized"};body.output_config={effort:eff};}
  var hd={"content-type":"application/json","x-api-key":c.key||"","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"};
  if(fb&&S.fallback!==false){body.fallbacks="default";hd["anthropic-beta"]="server-side-fallback-2026-07-01";}
  var B=[],stop="",cat="",err=null,fell=null;
  var feed=lineFeeder(function(line){if(line.indexOf("data:")!==0)return;var d;try{d=JSON.parse(line.slice(5));}catch(_){return;}
    if(d.type==="content_block_start"&&d.content_block){var cb=JSON.parse(JSON.stringify(d.content_block));if(cb.type==="tool_use"){cb._json="";cb.input={};}if(cb.type==="text")cb.text=cb.text||"";if(cb.type==="thinking"){cb.thinking=cb.thinking||"";cb.signature=cb.signature||"";}if(cb.type==="fallback")fell={from:(cb.from&&cb.from.model)||mid,to:(cb.to&&cb.to.model)||""};B[d.index]=cb;}
    else if(d.type==="content_block_delta"&&d.delta&&B[d.index]){var b=B[d.index],dl=d.delta;
      if(dl.type==="text_delta"&&dl.text){b.text+=dl.text;onToken(dl.text);}
      else if(dl.type==="thinking_delta"&&dl.thinking){b.thinking+=dl.thinking;onThink(dl.thinking);}
      else if(dl.type==="signature_delta"&&dl.signature)b.signature=(b.signature||"")+dl.signature;
      else if(dl.type==="input_json_delta"&&typeof dl.partial_json==="string")b._json+=dl.partial_json;}
    else if(d.type==="message_delta"&&d.delta){if(d.delta.stop_reason)stop=d.delta.stop_reason;var sd=d.delta.stop_details||d.stop_details;if(sd&&sd.category)cat=sd.category;}
    else if(d.type==="error")err=(d.error&&d.error.message)||"the connection reported an error";});
  return netFetch(base()+"/v1/messages",{method:"POST",abort:S.ab,headers:hd,body:JSON.stringify(body),onChunk:feed,timeout:900}).then(function(r){
    if(!r.ok)return r.text().then(function(t){var e=new Error(failText(r,t));e.status=r.status;throw e;});
    if(err)throw new Error(err);
    B=B.filter(Boolean);
    /* after a fallback, what the declining model began before the last switch is not passed back (Anthropic's rule) */
    var last=-1;B.forEach(function(b,i){if(b.type==="fallback")last=i;});
    var keep=B.filter(function(b,i){return !(i<last&&/^(thinking|redacted_thinking|tool_use|server_tool_use)$/.test(b.type));});
    var calls=[];keep.forEach(function(b){if(b.type!=="tool_use")return;var input=null,bad="";try{input=b._json?JSON.parse(b._json):{};}catch(e){bad=b._json;}b.input=input||{};calls.push({id:b.id,name:b.name,input:input,bad:bad});delete b._json;});
    var content=keep.filter(function(b){return b.type!=="fallback"&&!(b.type==="text"&&!b.text);});
    return {calls:calls,stop:stop,cat:cat,fell:fell,
      nudge:content.some(function(b){return b.type==="text";})?function(t){S.msgs.push({role:"assistant",content:content});S.msgs.push({role:"user",content:t});}:null,
      push:function(results){S.msgs.push({role:"assistant",content:content});
        S.msgs.push({role:"user",content:results.map(function(r){var o={type:"tool_result",tool_use_id:r.id,content:r.text};if(r.err)o.is_error=true;return o;})});}};});}
/* OpenAI's chat completions form: Kimi (Moonshot), OpenRouter, OpenAI, LM Studio, Gemini, others */
function openaiTurn(S,onToken,onThink){var c=state.cloud,ob=base()||cloudDefaultBase("openai");
  var h={"content-type":"application/json"};if(c.key)h["Authorization"]="Bearer "+c.key;if(c.provider==="openrouter")h["X-Title"]="Ingenium";
  var body={model:c.model,messages:S.msgs,stream:true,tool_choice:"auto",tools:S.tools.map(function(t){return {type:"function",function:{name:t.name,description:t.description,parameters:t.input_schema}};})};
  var capT=Math.max((+$("ctlTokens").value)||0,cxLocal(c.provider,ob)?8192:16000);if(c.provider==="openai")body.max_completion_tokens=capT;else body.max_tokens=capT;
  if(S.effort&&!S.noReason){try{if(window.IngEffort)IngEffort.openaiBody(body,c.provider,c.model,S.effort.lv);}catch(_){}}
  var text="",reason="",calls=[],stop="",err=null;
  var feed=lineFeeder(function(line){if(line.indexOf("data:")!==0)return;var t=line.slice(5).trim();if(!t||t==="[DONE]")return;var d;try{d=JSON.parse(t);}catch(_){return;}
    if(d.error){err=d.error.message||"the connection reported an error";return;}
    var ch=d.choices&&d.choices[0];if(!ch)return;if(ch.finish_reason)stop=ch.finish_reason;var dl=ch.delta;if(!dl)return;
    if(dl.reasoning_content){reason+=dl.reasoning_content;onThink(dl.reasoning_content);}else if(typeof dl.reasoning==="string"&&dl.reasoning)onThink(dl.reasoning);
    if(dl.content){text+=dl.content;onToken(dl.content);}
    (dl.tool_calls||[]).forEach(function(tc){var i=tc.index!=null?tc.index:calls.length;var k=calls[i]||(calls[i]={id:"",name:"",args:""});
      if(tc.id)k.id=tc.id;if(tc.function){if(tc.function.name)k.name+=tc.function.name;if(tc.function.arguments)k.args+=tc.function.arguments;}});});
  return netFetch(ob+"/chat/completions",{method:"POST",abort:S.ab,headers:h,body:JSON.stringify(body),onChunk:feed}).then(function(r){
    if(!r.ok)return r.text().then(function(t){var e=new Error(failText(r,t));e.status=r.status;throw e;});
    if(err)throw new Error(err);
    calls=calls.filter(Boolean).map(function(k,i){var input=null,bad="";try{input=k.args?JSON.parse(k.args):{};}catch(e){bad=k.args;}return {id:k.id||("call_"+i+"_"+Date.now().toString(36)),name:k.name,input:input,bad:bad,raw:k.args};});
    return {calls:calls,stop:stop==="tool_calls"&&calls.length?"tool_use":stop==="length"?"max_tokens":stop,
      nudge:function(t){var am={role:"assistant",content:text||""};if(c.provider==="moonshot"&&reason)am.reasoning_content=reason;S.msgs.push(am);S.msgs.push({role:"user",content:t});},
      push:function(results){var am={role:"assistant",content:text||null,tool_calls:calls.map(function(k){return {id:k.id,type:"function",function:{name:k.name,arguments:k.raw||"{}"}};})};
        if(c.provider==="moonshot"&&reason)am.reasoning_content=reason;S.msgs.push(am);
        results.forEach(function(r){S.msgs.push({role:"tool",tool_call_id:r.id,content:r.text});});}};});}
/* Ollama's own chat form: on this computer, another one on the network, or Ollama's cloud */
function ollamaTurn(S,onToken,onThink){var c=state.cloud,h={"content-type":"application/json"};if(c.key)h["Authorization"]="Bearer "+c.key;
  var body={model:c.model,messages:S.msgs,stream:true,tools:S.tools.map(function(t){return {type:"function",function:{name:t.name,description:t.description,parameters:t.input_schema}};}),
    options:{num_predict:Math.max((+$("ctlTokens").value)||0,8192)}};if(S.think)body.think=(S.effort&&window.IngEffort)?IngEffort.ollamaThink(c.model,S.effort.lv):true;
  var text="",think="",calls=[],err=null,done="";
  var feed=lineFeeder(function(line){if(!line.trim())return;var d;try{d=JSON.parse(line);}catch(_){return;}
    if(d.error){err=d.error;return;}var m=d.message||{};
    if(m.thinking){think+=m.thinking;onThink(m.thinking);}if(m.content){text+=m.content;onToken(m.content);}
    (m.tool_calls||[]).forEach(function(tc){var f=tc.function||{},a=f.arguments,inp=a;if(typeof a==="string"){try{inp=JSON.parse(a);}catch(e){inp=null;}}
      calls.push({id:"call_"+calls.length,name:f.name,input:inp,bad:inp?"":String(a||""),raw:typeof a==="string"?a:JSON.stringify(a||{})});});
    if(d.done)done=d.done_reason||"stop";});
  return netFetch(base()+"/api/chat",{method:"POST",abort:S.ab,headers:h,body:JSON.stringify(body),onChunk:feed}).then(function(r){
    if(!r.ok)return r.text().then(function(t){var e=new Error(failText(r,t));e.status=r.status;throw e;});
    if(err)throw new Error(err);
    return {calls:calls,stop:calls.length?"tool_use":done==="length"?"max_tokens":done,
      nudge:function(t){var am={role:"assistant",content:text};if(think)am.thinking=think;S.msgs.push(am);S.msgs.push({role:"user",content:t});},
      push:function(results){var am={role:"assistant",content:text,tool_calls:calls.map(function(k){return {function:{name:k.name,arguments:k.input||{}}};})};if(think)am.thinking=think;S.msgs.push(am);
        results.forEach(function(r,i){S.msgs.push({role:"tool",content:r.text,tool_name:calls[i]&&calls[i].name});});}};});}
function family(p){return p==="anthropic"?"anthropic":/^ollama/.test(p)?"ollama":"openai";}
function turnFor(p){var f=family(p);return f==="anthropic"?anthropicTurn:f==="ollama"?ollamaTurn:openaiTurn;}
/* a model on this device: one reply at a time from the engine; its tool calls are read from the tags it writes */
var EG=null,LSTOP=0;
var TAGS=["<tool_call>","<think>"];
function held(s){var m=/<[a-z_\/]*$/i.exec(s);if(m&&TAGS.some(function(t){return t.indexOf(m[0].toLowerCase())===0;}))return s.slice(0,m.index);return s;}
function visibleOf(raw){var s=raw.replace(/<think>[\s\S]*?<\/think>/gi,"").replace(/<think>[\s\S]*$/i,"");
  s=s.replace(/<tool_call>[\s\S]*?<\/tool_call>/gi,"").replace(/<tool_call>[\s\S]*$/i,"");return held(s);}
function thinkingOf(raw){var out="",re=/<think>([\s\S]*?)(<\/think>|$)/gi,m;while((m=re.exec(raw))){out+=m[1];if(!m[2])break;}return out;}
function argsOf(o){var a=o.arguments!=null?o.arguments:o.parameters!=null?o.parameters:o.args!=null?o.args:o.input;if(typeof a==="string"){try{a=JSON.parse(a);}catch(e){return null;}}return a&&typeof a==="object"?a:{};}
function parseCalls(body){var calls=[],re=/<tool_call>\s*([\s\S]*?)\s*(?:<\/tool_call>|$)/gi,m;
  while((m=re.exec(body))){var js=m[1].trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");if(!js)continue;var o=null;try{o=JSON.parse(js);}catch(e){}
    if(o&&typeof o==="object"){var fn=o.function&&typeof o.function==="object"?o.function:null,nm=o.name||o.tool||(fn&&fn.name)||(typeof o.function==="string"?o.function:"");
      calls.push({id:"local_"+calls.length,name:String(nm||""),input:argsOf(fn&&fn.arguments!=null?fn:o),bad:""});}
    else calls.push({id:"local_"+calls.length,name:"",input:null,bad:js});}
  if(!calls.length){var f=/```(?:json)?\s*(\{[\s\S]*?\})\s*```/g,k;while((k=f.exec(body))){var o2=null;try{o2=JSON.parse(k[1]);}catch(e){}
    if(o2&&o2.name&&toolDef(o2.name))calls.push({id:"local_"+calls.length,name:o2.name,input:argsOf(o2),bad:""});}}
  calls.forEach(function(c){if(!c.bad&&c.input===null)c.bad="(the arguments were not JSON)";});
  return calls;}
function localTurn(S,onToken,onThink){var raw="",shown=0,thought=0;
  /* the oldest results give way first when the model's memory would overflow */
  var room=S.room||12000,size=function(){return S.msgs.reduce(function(a,m){return a+String(m.content||"").length;},0);};
  for(var i=0;i<S.msgs.length-2&&size()>room;i++){var m=S.msgs[i];if(m.role==="user"&&/^<tool_response>/.test(m.content||"")&&!m._cut){m.content="<tool_response>\n[an earlier result, left out to make room]\n</tool_response>";m._cut=1;}}
  var job={messages:S.msgs.map(function(m){return {role:m.role,content:m.content};}),params:S.params,
    onToken:function(t){raw+=t;var v=visibleOf(raw);if(v.length>shown){onToken(v.slice(shown));shown=v.length;}var th=thinkingOf(raw);if(th.length>thought){onThink(th.slice(thought));thought=th.length;}},
    onThink:function(t){onThink(t);}};
  return EG.call(Engine,job).then(function(){
    var body=raw.replace(/<think>[\s\S]*?<\/think>/gi,"").replace(/^[\s\S]*?<\/think>/i,"").trim(),calls=parseCalls(body);
    if(!calls.length){var tail=visibleOf(body+"\n");if(tail.length>shown)onToken(tail.slice(shown));}
    return {calls:calls,stop:calls.length?"tool_use":"end_turn",
      nudge:function(t){S.msgs.push({role:"assistant",content:body});S.msgs.push({role:"user",content:t});},
      push:function(results){S.msgs.push({role:"assistant",content:body});
        S.msgs.push({role:"user",content:results.map(function(r){return "<tool_response>\n"+r.text+"\n</tool_response>";}).join("\n")});}};});}

/* what is left, for Ultracode: tasks not completed, errors at the last run, a change not yet run, checks that failed */
function unfinished(ws){var out=[],p=ws.plan,changed=ws.files.some(function(f){return f.isNew||f.text!==f.orig;});
  if(!p){if(changed)return {short:"no plan was recorded",long:"there is no plan yet: record it with update_plan, with each task's status, and check each task."};}
  else{var open=p.tasks.filter(function(t){return t.s!=="done";});if(open.length)out.push(open.length+" task"+(open.length===1?" is":"s are")+" not completed ("+open.slice(0,3).map(function(t){return "“"+t.t+"”";}).join(", ")+(open.length>3?", …":"")+")");}
  if(ws.lastRun&&ws.lastRun.errs>0)out.push("the app showed "+ws.lastRun.errs+" error"+(ws.lastRun.errs===1?"":"s")+" when it last ran");
  if(ws.dirty&&changed&&canRun(ws))out.push("the app has not been run since the last change");
  var bad=Object.keys(ws.checks||{}).filter(function(k){return !ws.checks[k];});if(bad.length)out.push(bad.length+" check"+(bad.length===1?"":"s")+" failed ("+bad.slice(0,3).map(function(k){return "“"+k+"”";}).join(", ")+")");
  return out.length?{short:out[0],long:out.join("; ")+"."}:null;}
/* ---------- the loop, the same for every model and every place ----------
   cfg: {turn, S, ws, way, plan, small, limit, stopped(), ui:{token(t), think(t), step(s), ask(info)->Promise<{act,note}>}, commit()->Promise<n>} */
function loop(cfg){var ws=cfg.ws,ui=cfg.ui,used=0,nudges=0,all="",gap=false,first=true,fellNote="",way=cfg.way,ro=way==="guide"||!!cfg.plan,halt=false,MAX=cfg.small?3500:24000;
  var tok=function(t){if(gap&&all){ui.token("\n\n");all+="\n\n";}gap=false;all+=t;ui.token(t);};
  function finish(extra){return cfg.commit().then(function(n){if(extra)tok(extra);if(fellNote){tok(fellNote);fellNote="";}
      if(!all.trim())tok(n?"Done: the changes are kept, and can be undone.":"Done.");return {text:all,changed:n,used:used};});}
  function oneCall(k,results){if(cfg.stopped()||halt)return Promise.resolve();used++;
    if(k.bad){ui.step({i:"!",t:"Sent "+(k.name||"a tool")+" an input that was not complete",bad:true});
      results.push({id:k.id,text:JSON.stringify({INVALID_JSON:String(k.bad).slice(0,2000)})+" The tool call was not valid JSON. Send it again, as valid JSON.",err:true});return Promise.resolve();}
    var tgt=(k.name==="edit"||k.name==="write_file")&&k.input?wsFile(ws,k.input.file):null,snap=tgt?{text:tgt.text,n:tgt.edits.length}:null,nf=ws.files.length;
    return exec(ws,k.name,k.input||{},{ro:ro,small:cfg.small,way:way}).then(function(r){
      if(r.changed)ws.dirty=true;if(r.plan&&ws.plan&&ui.plan)ui.plan(ws.plan);
      if(!(r.changed&&way==="step")){if(r.step)ui.step(r.step);results.push({id:k.id,text:cap(r.text,MAX),err:!!r.err});return;}
      return ui.ask({file:r.file,line:r.line,before:r.before,after:r.after,made:!!r.made,more:r.more||0}).then(function(d){
        if(d.act==="make"||d.act==="all"){if(d.act==="all")way="auto";ui.step(r.step);
          results.push({id:k.id,text:cap(r.text+(d.note?"\nThe person added: “"+d.note+"”":""),MAX)});return;}
        /* skipped, or stopped: the file is as it was */
        if(tgt){tgt.text=snap.text;tgt.edits.length=snap.n;}else ws.files.length=nf;
        ui.step({i:"–",t:"You skipped the change to "+r.file+" at line "+r.line+(d.note?": “"+(d.note.length>70?d.note.slice(0,67)+"…":d.note)+"”":""),you:true});
        if(d.act==="stop")halt=true;
        results.push({id:k.id,text:"The person chose not to make this change"+(d.note?". They said: “"+d.note+"”":"")+". "+(d.act==="stop"?"They asked to stop here.":"Do not make it again; follow what they said, or ask what they would prefer.")});});});}
  function step(){if(cfg.stopped())return finish("");
    return cfg.turn(cfg.S,tok,ui.think).then(function(T){first=false;gap=true;
      if(T.fell&&T.fell.to&&!fellNote)fellNote="\n\n_"+T.fell.from+" declined part of this request, so Anthropic's "+T.fell.to+" carried on with it._";
      if(T.stop==="refusal")return finish("\n\n_The model declined this request"+(T.cat?" (its safeguards marked it “"+String(T.cat).replace(/_/g," ")+"”)":"")+". Changes made before it stopped are kept. Rephrase it, or choose another model._");
      if(!T.calls.length){if(T.stop==="max_tokens")return finish("\n\n_The reply reached its length limit and stopped here. Ask it to continue._");
        if(cfg.ultra&&!ro&&nudges<3&&T.nudge&&!cfg.stopped()&&used<cfg.limit){var why=unfinished(ws);
          if(why){nudges++;ui.step({i:"↻",t:"Ultracode: "+why.short+", so it carries on"});T.nudge("Ultracode is on, and the work is not finished: "+why.long+" Carry on: fix it and check again. If it truly cannot be done, say plainly what fails and why.");return step();}}
        return finish("");}
      if(T.stop==="max_tokens"){T.push(T.calls.map(function(k){return {id:k.id,text:"Your reply was cut off at the length limit before this call was complete, so it was not run. Make smaller changes, one at a time.",err:true};}));return step();}
      var results=[],seq=Promise.resolve();
      T.calls.forEach(function(k){seq=seq.then(function(){return oneCall(k,results);});});
      return seq.then(function(){
        if(halt)return finish("\n\n_Stopped here, as you asked. "+(ws.files.some(function(f){return f.isNew||f.text!==f.orig;})?"The changes you made are kept.":"Nothing was changed.")+"_");
        if(cfg.stopped())return finish("");
        if(used>=cfg.limit)return finish("\n\n_It took "+used+" steps and was stopped there, so it does not run on without end. The changes so far are kept; say what is left, and it carries on._");
        T.push(results);return step();});});}
  return step().catch(function(e){if(e&&typeof e==="object")e.fresh=first&&!all;throw e;});}

/* ---------- in a conversation (Chat and Code) ---------- */
function setHidden(o,k,v){try{Object.defineProperty(o,k,{value:v,enumerable:false,configurable:true,writable:true});}catch(e){o[k]=v;}}
function paintLive(bot){try{if(typeof renderChatLive==="function")renderChatLive(bot);else renderChat();}catch(e){}}
function chatUI(bot,onToken,onThink,stopped){return {token:onToken,think:onThink,
  step:function(s){(bot.steps=bot.steps||[]).push(s);paintLive(bot);},
  plan:function(p){bot.plan={tasks:p.tasks.map(function(x){return Object.assign({},x);}),at:p.at};paintLive(bot);try{if(window.IngR215)IngR215.planChanged(bot);}catch(e){}},
  ask:function(info){return new Promise(function(res){var a={info:info,note:"",done:false};
    var t=setInterval(function(){if(stopped())fin("stop");},400);
    function fin(act){if(a.done)return;a.done=true;clearInterval(t);setHidden(bot,"ask",null);paintLive(bot);res({act:act,note:String(a.note||"").trim()});}
    a.answer=fin;setHidden(bot,"ask",a);paintLive(bot);});}};}
function commitChat(ws,bot){var changed=ws.files.filter(function(f){return f.isNew||f.text!==f.orig;});if(!changed.length)return Promise.resolve(0);
  var made=changed.map(function(f){return {file:f.name,kind:f.kind||edKind(f.name),ok:Math.max(1,f.edits.length),bad:[],loose:0,pairs:f.edits.slice(0,60),chars:f.text.length,ref:IngBig.newId(),_t:f.text};});
  return Promise.all(made.map(function(m){return IngBig.put(m.ref,m._t);})).then(function(){
    if(ws.code&&ws.pr){var pr=ws.pr;
      made.forEach(function(e){var f=ccFile(pr,e.file);if(!f||edBase(f.name)!==edBase(e.file)){f={name:e.file,ref:null,size:0};pr.files=(pr.files||[]).concat([f]);}
        var prev=f.ref||null;f.ref=e.ref;f.size=e.chars;ccSetText(f,e._t);
        (pr.versions=pr.versions||[]).push({at:Date.now(),file:f.name,prev:prev,next:e.ref,n:e.ok,chat:ws.chatId});});
      try{ccPrune(pr);}catch(e){}pr.updated=Date.now();}
    made.forEach(function(m){delete m._t;});bot.edits=(bot.edits||[]).concat(made);
    changed.forEach(function(f){f.orig=f.text;f.isNew=false;f.edits=[];});
    saveState();if(ws.code&&ws.pr){try{ccPaintSide();ccPaintHead();}catch(e){}setTimeout(function(){try{ccShowPreview(ws.pr);}catch(e){}},40);}
    return made.length;});}
var ORIG=null;
function effortFor(cloud,ws){try{return window.IngEffort?IngEffort.forRun({cloud:cloud,provider:cloud?(state.cloud||{}).provider:"",code:!!ws.code,where:ws.where}):null;}catch(e){return null;}}
function cloudRun(messages,onToken,onThink,ab,bot,ws){var c=state.cloud,fam=family(c.provider),way=ws.connectorsOnly?"auto":wayOf(),plan=!!(ws.code&&state.cc&&state.cc.plan);
  var E=effortFor(true,ws),ultra=!!(E&&E.ultra)&&way!=="guide",ro=way==="guide"||plan,chk=ultra&&canRun(ws);
  var P=plainMsgs(messages),S={tools:toolsFor(ro,{plan:true,check:chk,ws:ws}),think:thinkOn()&&!(E&&E.lv<=1&&fam!=="anthropic"),fallback:true,ab:ab,effort:E};
  var sys=(P.sys?P.sys+"\n\n":"")+note(ws,way,plan,{plan:true,ultra:ultra,check:chk});
  if(fam==="anthropic"){S.sys=sys;S.msgs=P.msgs;}else{S.msgs=[{role:"system",content:sys}].concat(P.msgs);}
  var stopped=function(){return !!(ab&&ab.aborted);};
  bot.way=way;
  var cfg={turn:turnFor(c.provider),S:S,ws:ws,way:way,plan:plan,small:false,ultra:ultra,limit:E?(fam==="ollama"?Math.ceil(E.steps/2):E.steps):(fam==="ollama"?30:60),stopped:stopped,
    ui:chatUI(bot,onToken,onThink,stopped),commit:function(){return commitChat(ws,bot);}};
  function go(){return loop(cfg).then(function(r){return r.text;}).catch(function(e){var m=String(e&&e.message||e),fresh=!!(e&&e.fresh);
    if(fresh&&S.think&&/thinking|budget|adaptive|display|\bthink\b/i.test(m)){S.think=false;return go();}
    if(fresh&&S.effort&&!S.noReason&&/reasoning/i.test(m)&&fam==="openai"){S.noReason=true;try{IngEffort.refused(c.provider,c.model);}catch(_){}return go();}
    /* a service or model without tools: once, at the first request, it answers as before */
    if(fresh&&/\b(tool|tools|function[ _-]?call|tool_choice|does not support)\b/i.test(m)&&!/rate|quota|overload/i.test(m)){NO_TOOLS[c.provider+"|"+c.model]=1;delete bot.way;return ORIG(messages,onToken,onThink,ab);}
    if(fresh&&/fallback/i.test(m)&&fam==="anthropic"&&S.fallback){S.fallback=false;return go();}
    return commitChat(ws,bot).then(function(n){if(n)e.message=m+" (the "+n+" changed file"+(n===1?" is":"s are")+" kept below)";throw e;});});}
  return go();}
/* the files a model on this device can read through the tools are not repeated in full: its memory is short */
function slimFiles(text){return String(text||"").replace(/<file name="([^"]*)">\n([\s\S]*?)\n<\/file>/g,function(all,n,body){
  return body.length<1500?all:"<file name=\""+n+"\">\n["+body.split("\n").length+" lines: read them with the tools]\n</file>";});}
function roomOf(){var room=12000;try{room=Math.max(6000,Math.floor(chatBudget()*0.9));}catch(e){}return room;}
function localRun(job,bot,ws){var way=ws.connectorsOnly?"auto":wayOf(),plan=!!(ws.code&&state.cc&&state.cc.plan),E=effortFor(false,ws),ultra=!!(E&&E.ultra)&&way!=="guide",chk=ultra&&canRun(ws),tools=toolsFor(way==="guide"||plan,{plan:ultra,check:chk,ws:ws});
  var msgs=job.messages.map(function(m){return {role:m.role,content:typeof m.content==="string"?slimFiles(m.content):(m.content||[]).filter(function(p){return p.type==="text";}).map(function(p){return slimFiles(p.text);}).join("\n")};});
  var add=note(ws,way,plan,{plan:ultra,ultra:ultra,check:chk})+"\n\n"+localNote(tools);
  if(msgs[0]&&msgs[0].role==="system")msgs[0].content+="\n\n"+add;else msgs.unshift({role:"system",content:add});
  var stop0=LSTOP,stopped=function(){return LSTOP!==stop0;};
  var onToken=job.onToken||function(){},onThink=job.onThink||function(){};
  bot.way=way;
  return loop({turn:localTurn,S:{msgs:msgs,params:job.params,room:roomOf()},ws:ws,way:way,plan:plan,small:true,ultra:ultra,limit:E?E.lsteps:16,stopped:stopped,
    ui:chatUI(bot,onToken,onThink,stopped),commit:function(){return commitChat(ws,bot);}}).then(function(r){return r.text;})
    .catch(function(e){return commitChat(ws,bot).then(function(){throw e;});});}

/* ---------- the way, beside the model's name ---------- */
var wayWrap=null,wayKey=null,wayMenu=null;
function hasWork(){var c=curChat();if(!c)return false;if(typeof ccIsCode==="function"&&ccIsCode(c))return !!ccProj();try{return edChatFiles().length>0;}catch(e){return false;}}
function placeWay(){try{var k=wayKey.getBoundingClientRect(),c=(wayKey.closest(".composer")||wayKey.parentNode).getBoundingClientRect(),w=wayMenu.offsetWidth||340;
  var left=Math.max(c.left,Math.min(k.right-w,window.innerWidth-w-8));if(left+w>window.innerWidth-8)left=Math.max(8,window.innerWidth-w-8);
  wayMenu.style.left=Math.round(left)+"px";wayMenu.style.bottom=Math.round(window.innerHeight-k.top+8)+"px";}catch(e){}}
window.addEventListener("resize",function(){if(wayMenu&&!wayMenu.hidden)placeWay();});
function closeWay(){if(!wayMenu||wayMenu.hidden)return;wayMenu.hidden=true;wayKey.setAttribute("aria-expanded","false");}
function buildWay(){if(wayWrap)return true;var bar=document.querySelector("#page-chat .composer-bar")||document.querySelector(".composer-bar");if(!bar)return false;
  wayWrap=document.createElement("span");wayWrap.className="ag-way-wrap";wayWrap.hidden=true;
  wayKey=document.createElement("button");wayKey.type="button";wayKey.className="chat-top-key ag-way-key";wayKey.id="agWayBtn";wayKey.setAttribute("aria-haspopup","true");wayKey.setAttribute("aria-expanded","false");
  wayMenu=document.createElement("div");wayMenu.className="ag-way-menu";wayMenu.id="agWayMenu";wayMenu.setAttribute("role","menu");wayMenu.hidden=true;
  var h=document.createElement("div");h.className="ag-way-h";h.textContent="How should it work on this task?";wayMenu.appendChild(h);
  ORDER.forEach(function(w){var b=document.createElement("button");b.type="button";b.setAttribute("role","menuitemradio");b.setAttribute("data-way",w);
    b.appendChild(document.createTextNode(WAYS[w].name));var s=document.createElement("small");s.textContent=WAYS[w].say;b.appendChild(s);
    b.onclick=function(){setWay(w);closeWay();try{wayKey.focus();}catch(e){}};wayMenu.appendChild(b);});
  wayKey.onclick=function(e){e.stopPropagation();var open=wayMenu.hidden;wayMenu.hidden=!open;wayKey.setAttribute("aria-expanded",open?"true":"false");
    if(open){placeWay();var on=wayMenu.querySelector('[aria-checked="true"]');try{(on||wayMenu.querySelector("button")).focus();}catch(e2){}}};
  wayMenu.addEventListener("keydown",function(e){var bs=[].slice.call(wayMenu.querySelectorAll("button")),i=bs.indexOf(document.activeElement);
    if(e.key==="Escape"){e.preventDefault();closeWay();wayKey.focus();}else if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();var n=bs[(i+(e.key==="ArrowDown"?1:bs.length-1))%bs.length];if(n)n.focus();}});
  document.addEventListener("click",function(e){if(wayWrap&&!wayWrap.contains(e.target))closeWay();});
  wayWrap.appendChild(wayKey);wayWrap.appendChild(wayMenu);
  var model=bar.querySelector("#chatModelBtn");if(model&&model.parentNode===bar)bar.insertBefore(wayWrap,model);else bar.appendChild(wayWrap);
  return true;}
function paintWay(){try{if(!buildWay())return;var show=hasWork()&&agentOn();wayWrap.hidden=!show;if(!show){closeWay();return;}
  var w=wayOf();if(wayKey.getAttribute("data-way")!==w||!wayKey.firstChild){wayKey.setAttribute("data-way",w);wayKey.innerHTML="";var dot=document.createElement("span");dot.className="ag-way-dot";dot.setAttribute("aria-hidden","true");
    wayKey.appendChild(dot);wayKey.appendChild(document.createTextNode(WAYS[w].key));}
  wayKey.title="How the model works on this task: "+WAYS[w].name+". "+WAYS[w].say+" Press to choose another way.";wayKey.setAttribute("aria-label","Way of working: "+WAYS[w].name+". Press to choose.");
  [].forEach.call(wayMenu.querySelectorAll("button[data-way]"),function(b){b.setAttribute("aria-checked",b.getAttribute("data-way")===w?"true":"false");});}catch(e){}}

/* ---------- a change to review ---------- */
function diffEl(info){var box=document.createElement("div");box.className="ag-diff";box.setAttribute("aria-label","The lines before and after");
  var A=info.made?[]:String(info.before==null?"":info.before).split("\n"),B=String(info.after==null?"":info.after).split("\n");
  var p=0;while(p<A.length&&p<B.length&&A[p]===B[p])p++;var s=0;while(s<A.length-p&&s<B.length-p&&A[A.length-1-s]===B[B.length-1-s])s++;
  var rows=0,cut=0,line0=info.line||1;
  function row(cls,n,m,t){if(rows>=90){cut++;return;}rows++;var d=document.createElement("div");if(cls)d.className=cls;
    var a=document.createElement("span");a.className="n";a.textContent=n==null?"":String(n);var b=document.createElement("span");b.className="m";b.textContent=m;
    var c=document.createElement("span");c.className="t";t=String(t);c.textContent=t.length>400?t.slice(0,400)+" …":t;d.appendChild(a);d.appendChild(b);d.appendChild(c);box.appendChild(d);}
  function gap(n,what){var d=document.createElement("div");d.className="gap";d.textContent="⋯ "+n+" line"+(n===1?"":"s")+" "+what;box.appendChild(d);}
  if(p>2)gap(p-2,"as they were");for(var i=Math.max(0,p-2);i<p;i++)row("",line0+i," ",A[i]);
  for(var j=p;j<A.length-s;j++)row("del",line0+j,"−",A[j]);
  for(var k=p;k<B.length-s;k++)row("add",line0+k,"+",B[k]);
  var ctx=Math.min(2,s);for(var x=0;x<ctx;x++)row("",line0+(B.length-s)+x," ",B[B.length-s+x]);if(s>2)gap(s-2,"as they were");
  if(cut)gap(cut,"more, not shown here");
  return box;}
function askCard(a){if(a.el)return a.el;var i=a.info,box=document.createElement("div");box.className="ag-ask";box.setAttribute("role","group");box.setAttribute("aria-label","A change to review");
  var h=document.createElement("h4");h.textContent=i.made?"Make the new file "+i.file+"?":"Change "+i.file+" at line "+i.line+(i.more?" (and "+i.more+" more places)":"")+"?";
  var p=document.createElement("p");p.className="ag-ask-p";p.textContent=i.made?"Nothing is made until you choose. These are the new file's lines.":"Nothing changes until you choose. The lines marked − go; the lines marked + take their place.";
  var ta=document.createElement("textarea");ta.placeholder="Anything to tell it? (optional: why, or what you would like instead)";ta.setAttribute("aria-label","A note for the model (optional)");ta.value=a.note||"";ta.oninput=function(){a.note=ta.value;};
  var keys=document.createElement("div");keys.className="ag-keys";
  function key(label,act,cls,title){var b=document.createElement("button");b.type="button";b.className="msg-act"+(cls?" "+cls:"");b.textContent=label;b.title=title;b.setAttribute("data-act",act);b.onclick=function(){if(a.answer)a.answer(act);};keys.appendChild(b);return b;}
  key(i.made?"Make the file":"Make this change","make","ag-go","Make this change and let the model go on");
  key("Skip it","skip","","Leave the file as it is; the model is told, with your note");
  key("Make all the rest","all","","Make this change and the ones after it in this reply without asking");
  key("Stop here","stop","","Stop now; the changes you made so far are kept");
  box.appendChild(h);box.appendChild(p);box.appendChild(diffEl(i));box.appendChild(ta);box.appendChild(keys);a.el=box;return box;}

/* ---------- Build: ask a model to change the page ---------- */
var BS={el:null,busy:false,ab:null,stop:0,before:null,hist:[]};
var BEFF=[["auto","Auto"],["1","Low"],["2","Medium"],["3","High"],["4","Extra"],["5","Max"],["ultra","Ultracode"]];
function buildEffOf(){var v=state.agent&&state.agent.buildEff;return v==="auto"||v==="ultra"||/^[1-5]$/.test(String(v))?String(v):"auto";}
function buildEffSay(v){var L=window.IngEffort&&IngEffort.levels;if(v==="auto")return "Chosen for each request, from what it asks: never Max.";
  if(v==="ultra")return "Max effort, with a plan: it builds, runs checks in the page as it runs, and fixes what fails, until every check passes.";
  return L&&L[+v]?L[+v].line:"";}
function buildEffort(req,mo){var v=buildEffOf(),o={cloud:mo.kind==="cloud",provider:(state.cloud||{}).provider};
  try{if(!window.IngEffort||!IngEffort.forLevel)return null;
    if(v==="ultra")return IngEffort.forLevel(5,Object.assign(o,{ultra:true}));
    if(v==="auto"){var pk=IngEffort.pick(req,{code:true})||{};return IngEffort.forLevel(Math.max(1,Math.min(4,+pk.lv||3)),Object.assign(o,{auto:true,why:pk.why||""}));}
    return IngEffort.forLevel(+v,o);}catch(e){return null;}}
function buildWayOf(){var w=state.agent&&state.agent.buildWay;return WAYS[w]?w:lastWay();}
function buildText(){try{if(window.IngBuild&&typeof IngBuild.text==="function")return IngBuild.text();}catch(e){}var ce=$("codeEditor");return ce?ce.value:"";}
function buildSet(t){var d=state.buildDoc||{};
  if(window.IngBuild&&typeof IngBuild.large==="function"&&IngBuild.large()){IngBuild.open({name:d.name||"page.html",title:d.title||"",repo:d.repo,path:d.path,text:t});try{window.runBuild();}catch(e){}return;}
  var ce=$("codeEditor");if(!ce)return;ce.value=t;try{ce.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}try{window.runBuild();}catch(e){}}
function buildModel(){var cl=state.cloud||{};
  if(state.chatSource==="cloud"&&cl.on&&cl.provider&&cl.model&&TOOLS_OK[cl.provider]&&!NO_TOOLS[cl.provider+"|"+cl.model])return {kind:"cloud",name:cl.model+" (your connection)"};
  var m=(state.models||[]).filter(function(x){return x.id===state.activeModelId;})[0];
  if(m&&typeof Engine!=="undefined"&&Engine.status==="ready"&&Engine.modelId===m.id)return {kind:"local",name:(m.customName||"the model")+" (on this device)",m:m};
  return null;}
function buildPaint(){if(!BS.el)return;var w=buildWayOf(),mo=buildModel();
  [].forEach.call(BS.el.querySelectorAll(".agb-ways button"),function(b){var on=b.getAttribute("data-way")===w;b.setAttribute("aria-checked",on?"true":"false");b.tabIndex=on?0:-1;});
  BS.el.querySelector(".agb-say").textContent=WAYS[w].say;
  BS.el.querySelector(".agb-who").textContent=mo?"It uses "+mo.name+", as Chat does.":"No model is ready: connect one (Settings) or load one on the Models page. Chat's choice is used here.";
  BS.el.querySelector(".agb-go").hidden=BS.busy;BS.el.querySelector(".agb-stop").hidden=!BS.busy;
  var es=BS.el.querySelector(".agb-effsel"),ev=buildEffOf();if(es){es.value=ev;es.disabled=BS.busy;}var esy=BS.el.querySelector(".agb-effsay");if(esy)esy.textContent=buildEffSay(ev);}
function buildMake(){if(BS.el)return true;var grid=$("buildGrid");if(!grid||!grid.parentNode)return false;
  var s=document.createElement("section");s.id="agBuild";s.setAttribute("aria-label","Ask a model to change this page");
  s.innerHTML='<div class="agb-head"><b>Ask a model to change this page</b><span class="agb-who"></span></div>'+
    '<div class="agb-ways" role="radiogroup" aria-label="How should it work on this task?"></div><p class="agb-say"></p>'+
    '<div class="agb-eff"><label class="agb-effl"><span>Effort</span><select class="agb-effsel" aria-label="Effort for Build\'s requests"></select></label><span class="agb-effsay"></span></div>'+
    '<div class="agb-row"><textarea class="agb-in" rows="2" placeholder="Describe a change, a feature or a bug. Enter sends; Shift+Enter breaks a line." aria-label="What should change in this page?"></textarea>'+
    '<button type="button" class="btn primary small agb-go">Ask</button><button type="button" class="btn small agb-stop" hidden>Stop</button></div>'+
    '<div class="agb-out" aria-live="polite"></div><div class="agb-after" hidden><button type="button" class="btn small agb-undo">Undo these changes</button></div>';
  var ways=s.querySelector(".agb-ways");
  function pick(w){state.agent=state.agent||{};state.agent.buildWay=w;saveState();buildPaint();}
  ORDER.forEach(function(w){var b=document.createElement("button");b.type="button";b.setAttribute("role","radio");b.setAttribute("data-way",w);b.textContent=WAYS[w].name;b.title=WAYS[w].say;
    b.onclick=function(){pick(w);};ways.appendChild(b);});
  ways.addEventListener("keydown",function(e){if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;e.preventDefault();var i=ORDER.indexOf(buildWayOf()),n=ORDER[(i+(e.key==="ArrowRight"?1:2))%3];
    pick(n);var b=ways.querySelector('[data-way="'+n+'"]');if(b)b.focus();});
  /* 6.17: Build's own effort, as Chat's: Auto, Low to Max, or Ultracode (her words, 3 November 2026: "I want to be able to select low
     to Max effort and Ultracode inside of the chats and everywhere a model can be selected to run a task or do work inside of Ingenium") */
  var es=s.querySelector(".agb-effsel");BEFF.forEach(function(o){var op=document.createElement("option");op.value=String(o[0]);op.textContent=o[1];es.appendChild(op);});
  es.onchange=function(){state.agent=state.agent||{};state.agent.buildEff=es.value;saveState();buildPaint();};
  var inp=s.querySelector(".agb-in");inp.addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing){e.preventDefault();buildAsk();}});
  s.querySelector(".agb-go").onclick=buildAsk;
  s.querySelector(".agb-stop").onclick=function(){BS.stop++;try{if(BS.ab)BS.ab.abort();}catch(e){}try{if(buildModel()&&buildModel().kind==="local")Engine.abort();}catch(e){}};
  s.querySelector(".agb-undo").onclick=function(){if(BS.before==null)return;buildSet(BS.before);BS.before=null;s.querySelector(".agb-after").hidden=true;try{ingToast("The page is back as it was before your request.");}catch(e){}};
  grid.parentNode.insertBefore(s,grid.nextSibling);BS.el=s;buildPaint();return true;}
function buildAsk(){if(BS.busy||!BS.el)return;var inp=BS.el.querySelector(".agb-in"),req=inp.value.trim();if(!req){inp.focus();return;}
  var mo=buildModel();if(!mo){buildPaint();try{ingToast("No model is ready: connect one, or load one on the Models page.");}catch(e){}return;}
  var text=buildText();if(!text.trim()){try{ingToast("The page is empty: write or open a page first.");}catch(e){}return;}
  var d=state.buildDoc||{},fname=(d.name&&/\.html?$/i.test(d.name)?d.name:"page.html");
  var ws={where:"build",files:[{name:fname,text:text,orig:text,kind:"page",main:true,edits:[]}],
    run:function(){var f=ws.files[0];if(f.text!==buildText())buildSet(f.text);else{try{window.runBuild();}catch(e){}}
      return new Promise(function(res){setTimeout(function(){res(ranText(errorsIn($("consolePane"))));},f.text.length>3e5?4500:2600);});}};
  var way=buildWayOf(),out=BS.el.querySelector(".agb-out");out.innerHTML="";
  var stepsEl=document.createElement("ul");stepsEl.className="ag-steps";stepsEl.hidden=true;var askEl=document.createElement("div");var reply=document.createElement("div");reply.className="agb-reply";
  out.appendChild(stepsEl);out.appendChild(askEl);out.appendChild(reply);
  var said="",paint=function(){if(typeof chatMd==="function"){try{reply.innerHTML=chatMd(said);return;}catch(e){}}reply.textContent=said;};
  var stop0=BS.stop,ab=mo.kind==="cloud"&&typeof netAbortable==="function"?netAbortable():null,l0=LSTOP;BS.ab=ab;
  var stopped=function(){return BS.stop!==stop0||!!(ab&&ab.aborted)||(mo.kind==="local"&&LSTOP!==l0);};
  var ui={token:function(t){said+=t;paint();},think:function(){},
    step:function(s){stepsEl.hidden=false;var li=document.createElement("li");if(s.bad)li.className="bad";else if(s.you)li.className="you";var i=document.createElement("span");i.className="ag-i";i.textContent=s.i||"·";li.appendChild(i);li.appendChild(document.createTextNode(s.t));stepsEl.appendChild(li);},
    ask:function(info){return new Promise(function(res){var a={info:info,note:"",done:false};var t=setInterval(function(){if(stopped())a.answer("stop");},400);
      a.answer=function(act){if(a.done)return;a.done=true;clearInterval(t);askEl.innerHTML="";res({act:act,note:String(a.note||"").trim()});};askEl.appendChild(askCard(a));});}};
  BS.before=text;BS.busy=true;buildPaint();inp.value="";
  var E=buildEffort(req,mo),ultra=!!(E&&E.ultra)&&way!=="guide",chk=ultra&&canRun(ws);
  if(E&&(E.auto||E.ultra)){var es0=document.createElement("div");es0.className="eff-says";var L0=(window.IngEffort&&IngEffort.levels&&IngEffort.levels[E.lv])||{name:"High"};
    es0.textContent=E.ultra?"Ultracode, at Max effort.":"Auto chose "+L0.name+" effort"+(E.why?": "+E.why+".":".");out.insertBefore(es0,out.firstChild);}
  var sys=note(ws,way,false,{plan:ultra,ultra:ultra,check:chk}),turns=BS.hist.slice(-6).concat([{role:"user",content:req}]);
  /* 6.18: How I work, on every app (Folders) goes with Build's requests too */
  try{var hw=String((state.folders&&state.folders.how)||"").trim();if(hw)sys+="\n\nHow I work, on every app (in my own words):\n"+hw.slice(0,4000);}catch(e){}
  var cfg={ws:ws,way:way,plan:false,stopped:stopped,ui:ui,ultra:ultra,
    commit:function(){var f=ws.files[0];if(f.text===f.orig)return Promise.resolve(0);if(f.text!==buildText())buildSet(f.text);f.orig=f.text;return Promise.resolve(1);}};
  if(mo.kind==="cloud"){var fam=family(state.cloud.provider);cfg.turn=turnFor(state.cloud.provider);cfg.small=false;cfg.limit=E?(fam==="ollama"?Math.ceil(E.steps/2):E.steps):(fam==="ollama"?30:60);
    cfg.S={tools:toolsFor(way==="guide",{plan:ultra,check:chk,ws:ws}),think:thinkOn()&&!(E&&E.lv<=1&&fam!=="anthropic"),fallback:true,ab:ab,effort:E};if(fam==="anthropic"){cfg.S.sys=sys;cfg.S.msgs=turns;}else cfg.S.msgs=[{role:"system",content:sys}].concat(turns);}
  else{var params={};try{params=replyParams(mo.m,{max_tokens:Math.max(replyTokens(),4096),ctx:+$("ctlCtx").value,thinking:!!(E&&E.lv>=2&&thinkOn())});}catch(e){}
    cfg.turn=localTurn;cfg.small=true;cfg.limit=E?E.lsteps:16;cfg.S={msgs:[{role:"system",content:sys+"\n\n"+localNote(toolsFor(way==="guide",{plan:ultra,check:chk,ws:ws}))}].concat(turns),params:params,room:roomOf()};}
  if(mo.kind==="local"){try{Engine.setStatus("busy");}catch(e){}}
  var ended=false;
  loop(cfg).then(function(r){BS.hist.push({role:"user",content:req});BS.hist.push({role:"assistant",content:r.text.slice(0,4000)});
      BS.el.querySelector(".agb-after").hidden=!r.changed;if(!r.changed)BS.before=null;},
    function(e){said+=(said?"\n\n":"")+"_It stopped: "+String(e&&e.message||e)+"_";paint();var f=ws.files[0];if(f.text!==f.orig){buildSet(f.text);BS.el.querySelector(".agb-after").hidden=false;}else BS.before=null;})
    .then(function(){if(ended)return;ended=true;BS.busy=false;BS.ab=null;if(mo.kind==="local"){try{Engine.setStatus(Engine.modelId?"ready":"disconnected");}catch(e){}}buildPaint();});}

/* ---------- the hooks ---------- */
function applies(messages){var c=state.cloud||{};if(!messages||messages.__ingChat!==true||!agentOn())return false;
  if(!TOOLS_OK[c.provider]||!c.model||NO_TOOLS[c.provider+"|"+c.model])return false;return typeof liveBot!=="undefined"&&!!liveBot;}
function stepsBox(mm){var box,list;
  if(mm.steps.length>8&&!mm.live){box=document.createElement("details");box.className="ag-steps";var su=document.createElement("summary");su.textContent=mm.steps.length+" steps: searched, read, changed and ran";box.appendChild(su);
    list=document.createElement("ul");list.style.cssText="margin:6px 0 0;padding:0";box.appendChild(list);}
  else{box=list=document.createElement("ul");box.className="ag-steps";}
  mm.steps.forEach(function(s){var li=document.createElement("li");if(s.bad)li.className="bad";else if(s.you)li.className="you";var i=document.createElement("span");i.className="ag-i";i.textContent=s.i||"·";
    li.appendChild(i);li.appendChild(document.createTextNode(s.t));list.appendChild(li);});
  return box;}
function hook(){
  if(typeof window.chatHistory==="function"&&!window.chatHistory.__r190){var oh=window.chatHistory;
    window.chatHistory=function(){var h=oh.apply(this,arguments);try{if(h&&typeof h==="object")Object.defineProperty(h,"__ingChat",{value:true,enumerable:false,configurable:true});}catch(e){}return h;};window.chatHistory.__r190=1;}
  if(typeof window.cloudChat==="function"&&!window.cloudChat.__r190){ORIG=window.cloudChat;
    window.cloudChat=function(messages,onToken,onThink,ab){if(!applies(messages))return ORIG.apply(this,arguments);
      var bot=liveBot;onToken=onToken||function(){};onThink=onThink||function(){};
      return wsFor(bot).then(function(ws){if(!ws)return ORIG(messages,onToken,onThink,ab);return cloudRun(messages,onToken,onThink,ab,bot,ws);});};
    window.cloudChat.__r190=1;}
  if(typeof Engine!=="undefined"&&Engine&&typeof Engine.generate==="function"&&!Engine.generate.__r190){EG=Engine.generate;
    Engine.generate=function(job){var self=this;if(!job||!job.messages||job.messages.__ingChat!==true||!agentOn()||typeof liveBot==="undefined"||!liveBot)return EG.apply(self,arguments);
      var bot=liveBot;return wsFor(bot).then(function(ws){if(!ws)return EG.call(self,job);return localRun(job,bot,ws);});};
    Engine.generate.__r190=1;
    if(typeof Engine.abort==="function"&&!Engine.abort.__r190){var oa=Engine.abort;Engine.abort=function(){LSTOP++;return oa.apply(this,arguments);};Engine.abort.__r190=1;}}
  if(typeof window.fillMsg==="function"&&!window.fillMsg.__r190){var of=window.fillMsg;
    window.fillMsg=function(d,mm,keep){of.apply(this,arguments);try{if(!mm||mm.role!=="bot")return;var a=mm.ask,has=mm.steps&&mm.steps.length;if(!has&&!a)return;
        var old=d.querySelector(":scope > .ag-steps");if(old)old.remove();
        if(has){var box=stepsBox(mm),body=d.querySelector(".msg-body,.bubble,.md")||d.firstChild;if(body&&body.parentNode===d)d.insertBefore(box,body);else d.insertBefore(box,d.firstChild);}
        if(a&&!a.done)d.appendChild(askCard(a));}catch(e){}};
    window.fillMsg.__r190=1;}
  if(typeof window.renderChat==="function"&&!window.renderChat.__r190){var orc=window.renderChat;window.renderChat=function(){var r=orc.apply(this,arguments);paintWay();return r;};window.renderChat.__r190=1;}
  if(typeof window.go==="function"&&!window.go.__r190){var og=window.go;window.go=function(){var r=og.apply(this,arguments);paintWay();try{if(arguments[0]==="build"){buildMake();buildPaint();}}catch(e){}return r;};window.go.__r190=1;}
  paintWay();try{buildMake();}catch(e){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",hook);else hook();
window.addEventListener("load",function(){hook();setTimeout(hook,1500);});
window.IngAgent={tools:TOOLS,extra:EXTRA,addTool:addTool,toolsFor:toolsFor,unfinished:unfinished,loop:loop,stageCheck:stageCheck,applies:applies,wsFor:wsFor,exec:function(ws,n,a,o){return exec(ws,n,a,o||{});},note:note,parseCalls:parseCalls,visibleOf:visibleOf,
  way:wayOf,setWay:setWay,build:{ask:buildAsk,paint:buildPaint,state:BS},
  setOn:function(v){state.agent=state.agent||{};state.agent.off=!v;saveState();paintWay();},isOn:agentOn};
})();
;try{window.__ingParts["p190"]="running";}catch(_){}
</script>
