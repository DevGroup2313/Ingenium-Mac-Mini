<style id="r208-css">
/* ============ R208 · FOLDERS: A FOLDER FOR EACH OF HER APPS (Ingenium 6.10, 3 November 2026) ============
   Her words (3 November 2026): "I want a safe way to move my data from Claude and Ollama to Ingenium so that I don't lose all of my
   work ... I want folders built in that classifies every app that I have been working on and will build in the future. I want the
   folders to document how I like to work and keep a neat filling system that recalls how I like to do different tasks so that
   everything gets done accurately and efficiently and the models don't have to start over from 0 everytime and need to load up
   everything from memory or reread all of the context again and drain tokens." Her answers: start from the apps in her profile; bring
   in Claude's chats, Claude Code's sessions on her Mac and on the web, and Ollama.
   A folder is one of Ingenium's projects (state.projects, kind "app"), so every conversation in it already carries its instructions;
   what a folder adds: How I work on it, in her own words; Where we left off, a short summary kept by Ingenium and brought up to date
   on her press from the conversations not yet read (each is read once, so tokens are spent once); the decisions so far and what is
   open next; the words that mark it (its name, and the names of its parts). A conversation in a folder starts from these, a few
   thousand words at most, instead of every conversation before it. Conversations brought in from Claude are sorted into the folders
   by the words that mark each one, and she can move any. Models are not retrained by any of this: what makes a model know her way
   of working is what it is given to read, and a folder gives it that, short. */
#page-folders .fld-wrap{max-width:1180px;margin:0 auto;display:flex;flex-direction:column;gap:18px}
#page-folders .fld-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}
#page-folders .fld-card{display:flex;flex-direction:column;gap:6px;text-align:left;padding:16px 18px;border-radius:16px;border:1px solid var(--hairline);background:var(--card);cursor:pointer;
  box-shadow:0 1px 0 rgba(40,22,68,.06),0 6px 16px rgba(40,22,68,.07);transition:transform .16s ease,box-shadow .16s ease;font:inherit;color:inherit}
#page-folders .fld-card:hover{transform:translateY(-2px);box-shadow:0 2px 0 rgba(40,22,68,.08),0 10px 22px rgba(40,22,68,.10)}
#page-folders .fld-card:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
/* 6.40 (one scale, her note of 6 November 2026: the newer pages' fonts and sizes to match the rest of the app): a folder's name in its card at a card heading's size (16.5px, the app's serif), the new folder's card at the text's size, a folder's own title below the page's (21px, not 26px above the page title's 25px) */
#page-folders .fld-card .fld-name{display:flex;align-items:center;gap:10px;font:600 16.5px/1.25 var(--serif);letter-spacing:.03em;color:var(--ink-1)}
#page-folders .fld-card .fld-name svg{flex:0 0 auto;width:22px;height:22px;color:var(--accent)}
#page-folders .fld-card .fld-meta{font-size:12.5px;color:var(--ink-3);line-height:1.5}
#page-folders .fld-card .fld-parts{font-size:12px;color:var(--ink-2)}
#page-folders .fld-new{border-style:dashed;background:transparent;box-shadow:none;align-items:center;justify-content:center;color:var(--accent);font-weight:600;font-size:13.5px;min-height:96px}
#page-folders .fld-row{display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center}
#page-folders .fld-ways{display:grid;gap:10px;margin-top:6px}
#page-folders .fld-way{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 14px;align-items:center;padding:12px 14px;border:1px solid var(--hairline);border-radius:12px;background:var(--bg)}
#page-folders .fld-way b{font-size:14px;color:var(--ink-1)}
#page-folders .fld-way p{grid-column:1;margin:0;font-size:12.5px;line-height:1.5;color:var(--ink-3)}
#page-folders .fld-way .fld-acts{grid-column:2;grid-row:1 / span 2;display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
#page-folders .fld-way code{font:12px ui-monospace,"SF Mono",Menlo,Consolas,monospace;background:var(--card);border:1px solid var(--hairline);border-radius:6px;padding:1px 5px}
#page-folders textarea.fld-ta{width:100%;box-sizing:border-box;min-height:110px;font:14px/1.55 var(--sans);padding:10px 12px;border-radius:10px;border:1px solid var(--hairline);background:var(--bg);color:var(--ink-1);resize:vertical}
#page-folders .fld-brief{white-space:pre-wrap;font-size:14px;line-height:1.6;color:var(--ink-1);padding:12px 14px;border-radius:12px;background:var(--bg);border:1px solid var(--hairline)}
#page-folders .fld-list{list-style:none;margin:6px 0 0;padding:0;display:flex;flex-direction:column;gap:6px}
#page-folders .fld-list li{display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--hairline);border-radius:10px;background:var(--bg);font-size:13.5px}
#page-folders .fld-list li .fld-t{flex:1 1 auto;min-width:0}
#page-folders .fld-list li .fld-t b{display:block;font-weight:600;color:var(--ink-1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#page-folders .fld-list li .fld-t small{color:var(--ink-3)}
#page-folders .fld-list li select{font:inherit;font-size:12.5px;padding:4px 6px;border-radius:8px;border:1px solid var(--hairline);background:var(--card);color:var(--ink-1);max-width:170px}
#page-folders .fld-tag{font:700 10px/1.6 var(--sans);letter-spacing:.05em;text-transform:uppercase;color:var(--accent);border:1px solid var(--hairline);border-radius:999px;padding:0 7px;white-space:nowrap}
#page-folders .fld-chips{display:flex;flex-wrap:wrap;gap:6px}
#page-folders .fld-chip{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;padding:3px 6px 3px 10px;border-radius:999px;border:1px solid var(--hairline);background:var(--bg);color:var(--ink-1)}
#page-folders .fld-chip button{border:0;background:none;color:var(--ink-3);cursor:pointer;font-size:13px;line-height:1;padding:2px 4px;border-radius:50%}
#page-folders .fld-chip button:hover{color:var(--ink-1)}
#page-folders .fld-pick{display:flex;flex-direction:column;gap:6px;margin:8px 0}
#page-folders .fld-pick label{display:flex;align-items:center;gap:10px;font-size:14px}
#page-folders .fld-pick small{color:var(--ink-3)}
#page-folders .fld-status{display:flex;align-items:center;gap:9px;font-size:13px;color:var(--ink-2)}
#page-folders .fld-spin{width:14px;height:14px;border-radius:50%;border:2px solid var(--accent-soft,rgba(106,63,181,.18));border-top-color:var(--accent);animation:fldSpin .9s linear infinite}
@keyframes fldSpin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){#page-folders .fld-spin{animation:none}#page-folders .fld-card{transition:none}}
#page-folders .fld-sugg li{background:var(--card)}
#page-folders .fld-back{margin:0 0 4px}
#page-folders .fld-h{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
#page-folders .fld-h h2{margin:0;font:600 21px/1.2 var(--serif);letter-spacing:.035em;color:var(--ink-1)}
#page-folders .fld-crumb{display:flex;align-items:center;gap:8px;margin:0 0 -8px;font-size:13.5px;color:var(--ink-3)}
#page-folders .fld-crumbk{display:inline-flex;align-items:center;gap:6px;background:none;border:0;padding:3px 6px 3px 2px;margin:0;font:600 13.5px/1.2 var(--sans);color:var(--accent);cursor:pointer;border-radius:6px}
#page-folders .fld-crumbk:before{content:"";width:7px;height:7px;border-left:1.6px solid currentColor;border-bottom:1.6px solid currentColor;transform:rotate(45deg);margin-right:1px}
#page-folders .fld-crumbk:hover{text-decoration:underline;text-underline-offset:3px}
#page-folders .fld-crumbk:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
#page-folders .fld-sep{color:var(--ink-3);opacity:.7}
#page-folders .fld-here{color:var(--ink-2);font-weight:500}
#page-folders .fld-way code{white-space:nowrap}
#page-folders .fld-row input[type=text],#page-folders .fld-h input[type=text]{flex:1 1 260px;min-width:0;font:inherit;font-size:14px;padding:8px 11px;border-radius:10px;border:1px solid var(--hairline);background:var(--bg);color:var(--ink-1)}
#page-folders .fld-row input[type=text]:focus-visible,#page-folders .fld-h input[type=text]:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
@media (max-width:700px){#page-folders .fld-way{grid-template-columns:1fr}#page-folders .fld-way .fld-acts{grid-column:1;grid-row:auto;justify-content:flex-start}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p208"]="started";}catch(_){}
(function r208(){"use strict";
if(window.IngFolders)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function h(t,c,html){var e=D.createElement(t);if(c)e.className=c;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function say(t){try{W.ingToast(t);}catch(e){}}
function save(){try{W.saveState();}catch(e){}}
function day(t){try{return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}
function uid(p){return p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
function key(cls,txt,fn,title){var b=h("button","btn"+(cls?" "+cls:""));b.type="button";b.textContent=txt;if(title)b.title=title;b.addEventListener("click",function(e){e.preventDefault();fn(b,e);});return b;}
var FOLDER_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.2h7a2 2 0 0 1 2 2v7.8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/><path d="M3.5 10.5h17"/></svg>';
var CAP={how:4000,brief:6000,item:300,ctx:12000};

/* ---------- the folders, kept as Ingenium's projects of kind "app" ---------- */
function F(){var s=W.state;if(!s.folders||typeof s.folders!=="object")s.folders={how:"",ui:{}};if(!s.folders.ui)s.folders.ui={};return s.folders;}
function projects(){var s=W.state;if(!Array.isArray(s.projects))s.projects=[];return s.projects;}
function folders(){return projects().filter(function(p){return p&&p.kind==="app"&&p.app;});}
function folderById(id){return folders().filter(function(p){return p.id===id;})[0]||null;}
function chats(){return (W.state.chats||[]).filter(function(c){return c&&c.id;});}
function inFolder(p){return chats().filter(function(c){return c.projectId===p.id;});}
function unsorted(){var ids={};projects().forEach(function(p){ids[p.id]=1;});return chats().filter(function(c){return !c.projectId||!ids[c.projectId];}).filter(function(c){return (c.messages&&c.messages.length)||c.imported;});}
function makeFolder(name,parts){name=String(name||"").trim().slice(0,80);if(!name)return null;var ex=folders().filter(function(p){return p.name.toLowerCase()===name.toLowerCase();})[0];if(ex)return ex;
  var p={id:"pj"+uid(""),name:name,instructions:"",files:[],kind:"app",app:{words:[name].concat((parts||[]).filter(Boolean)),how:"",brief:"",briefAt:0,model:"",read:{},decisions:[],open:[],sugg:[],made:Date.now()}};
  projects().push(p);save();return p;}
/* the apps her profile names: the Career Studio's entries of projects (their place, "Carpe Diem and The Forge"), and the apps Lector has read */
function profileApps(){var out=[],seen={};function add(n,why){n=String(n||"").replace(/\s+/g," ").trim().replace(/^the\s+(?=[A-Z])/,"The ");if(!n||n.length>60||/^\[|\]$/.test(n))return;var k=n.toLowerCase();if(seen[k])return;seen[k]=1;out.push({name:n,why:why});}
  try{var r=W.state.career,P=r&&r.people&&r.people.filter(function(x){return x.id===r.cur;})[0];P=P&&P.profile;
    (P&&P.items||[]).forEach(function(it){if(it.sec!=="project")return;String(it.place||"").split(/\s*,\s*|\s+and\s+|\s*&\s*/).forEach(function(n){add(n,"In your profile: "+(it.title||"a project")+(it.from?", "+it.from+(it.to?" to "+it.to:""):""));});});}catch(e){}
  try{(W.lxState&&W.lxState().runs||[]).forEach(function(rn){if(rn.kind==="app"&&rn.name)add(rn.name,"Read by Lector");});}catch(e){}
  return out;}

/* ---------- sorting: each conversation goes to the folder whose words it uses most, clearly ---------- */
function textOf(c){var t=[c.title||""];if(c.imported){t.push(c.imported.preview||"",c.imported.brief||"");}
  (c.messages||[]).slice(0,8).forEach(function(m){t.push(String(m.text||"").slice(0,1500));});return t.join("\n");}
function countWord(text,w){w=String(w||"").trim();if(w.length<3)return 0;var re=new RegExp("(^|[^A-Za-z0-9])"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?![A-Za-z0-9])","g"),n=0;while(re.exec(text))n++;return n;}
function scoreFor(c,p){var title=String(c.title||""),body=textOf(c),s=0;(p.app.words||[]).forEach(function(w){s+=3*countWord(title,w)+countWord(body,w);});return s;}
function sortAll(opt){opt=opt||{};var fs=folders(),n=0,by={};if(!fs.length)return {n:0,by:by};
  unsorted().forEach(function(c){var best=null,bs=0,second=0;fs.forEach(function(p){var s=scoreFor(c,p);if(s>bs){second=bs;bs=s;best=p;}else if(s>second)second=s;});
    if(best&&bs>=2&&bs>=second*1.5){c.projectId=best.id;c.sortedBy="folders";n++;by[best.name]=(by[best.name]||0)+1;}});
  if(n)save();return {n:n,by:by};}
function sortWords(r){var ks=Object.keys(r.by);return r.n?r.n+" conversation"+(r.n===1?"":"s")+" sorted: "+ks.map(function(k){return k+" "+r.by[k];}).join(", ")+".":"No conversation could be sorted by its words: move them by hand under Not sorted yet.";}

/* ---------- what a conversation in a folder starts from: short, never every conversation before it ---------- */
function clip(t,n){t=String(t||"").trim();return t.length>n?t.slice(0,n).replace(/\s+\S*$/,"")+" …":t;}
function contextFor(p){if(!p||p.kind!=="app"||!p.app)return "";var a=p.app,G=F(),parts=[];
  if((G.how||"").trim())parts.push("How I work, on every app (in my own words):\n"+clip(G.how,CAP.how));
  if((a.how||"").trim())parts.push("How I work on "+p.name+" (in my own words):\n"+clip(a.how,CAP.how));
  if((a.brief||"").trim())parts.push("Where we left off on "+p.name+" (a summary of the earlier conversations, kept by Ingenium"+(a.briefAt?", brought up to date "+day(a.briefAt):"")+"; ask me before relying on any detail it does not give):\n"+clip(a.brief,CAP.brief));
  if(a.decisions&&a.decisions.length)parts.push("Decisions so far on "+p.name+":\n"+a.decisions.slice(0,20).map(function(x){return "- "+clip(x,CAP.item);}).join("\n"));
  if(a.open&&a.open.length)parts.push("Open next on "+p.name+":\n"+a.open.slice(0,12).map(function(x){return "- "+clip(x,CAP.item);}).join("\n"));
  var out=parts.join("\n\n");return out?clip("THIS CONVERSATION IS IN MY FOLDER FOR "+p.name.toUpperCase()+".\n\n"+out,CAP.ctx):"";}
function wrapPrompt(){if(typeof W.chatSystemPrompt!=="function"||W.chatSystemPrompt.__r208)return;var o=W.chatSystemPrompt;
  W.chatSystemPrompt=function(budget){var r=o.apply(this,arguments);try{var p=typeof W.chatProject==="function"?W.chatProject():null,ctx=contextFor(p);if(!ctx)ctx=everyApp();if(ctx)r=(r?r+"\n\n":"")+ctx;}catch(e){}return r;};W.chatSystemPrompt.__r208=1;}
/* 6.18: How I work, on every app goes with every Code session too, not only those in a folder, so every app she builds follows it (her
   words, 4 November 2026: "add that to the folders inside Ingenium as well for all future apps") */
function everyApp(){try{var c=typeof W.curChat==="function"?W.curChat():null;if(!c||typeof W.ccIsCode!=="function"||!W.ccIsCode(c))return "";var h=(F().how||"").trim();return h?"How I work, on every app (in my own words):\n"+clip(h,CAP.how):"";}catch(e){return "";}}

/* ---------- Where we left off: brought up to date from the conversations not read yet, each read once ---------- */
var RUN={busy:false,what:"",of:null};
function stamp(c){return c.imported?(c.imported.updated||c.imported.at||c.made||0):(c.updated||c.made||(c.messages&&c.messages.length?(c.messages[c.messages.length-1].at||c.messages.length):0));}
function unread(p){var R=p.app.read||{};return inFolder(p).filter(function(c){var s=stamp(c);return R[c.id]===undefined||R[c.id]!==s;});}
function msgsOf(c){if(c.imported&&!c.imported.adopted&&c.imported.ref&&W.IngBig)return Promise.resolve(W.IngBig.load(c.imported.ref)).then(function(t){var a=[];try{a=JSON.parse(t||"[]");}catch(e){}return a.concat((c.messages||[]).filter(function(m){return !m.imported;}));},function(){return c.messages||[];});
  return Promise.resolve(c.messages||[]);}
function convText(c,ms,room){var lines=[];ms.forEach(function(m){var t=String(m.text||"").trim();if(!t)return;lines.push((m.role==="me"?"Me":"Assistant")+": "+t);});
  var all=lines.join("\n"),head="### "+(c.title||"A conversation")+(c.imported?" (from "+c.imported.from+(c.imported.created?", "+day(c.imported.created):"")+")":c.made?" ("+day(c.made)+")":"");
  if(all.length<=room)return head+"\n"+all;var a=Math.floor(room*0.35),b=room-a;return head+"\n"+all.slice(0,a)+"\n[… the middle of this conversation is left out …]\n"+all.slice(all.length-b);}
function room(){var ctx=8192;try{var o=W.IngLector&&W.IngLector.plan?W.IngLector.plan():null,m=o&&o.chosen;if(m||(o&&o.cloud))ctx=W.lxCtx(m)||ctx;}catch(e){}return Math.max(9000,(ctx-3000)*3);}  /* 6.44: no cap of its own (400,000 characters before): the model's memory is the limit */
function modelReady(){try{var o=W.IngLector&&W.IngLector.plan?W.IngLector.plan():null;return !!(o&&(o.link||o.chosen||o.cloud));}catch(e){return false;}}
function modelName(){try{var o=W.IngLector.plan();if(o&&(o.cloud||o.link)&&typeof W.lxCloudName==="function")return W.lxCloudName();if(o&&o.chosen)return o.chosen.customName||o.chosen.name||"your model";}catch(e){}return "your model";}
function ask(msgs,max){var o=null;try{o=W.IngLector.plan();}catch(e){}if(typeof W.lxAsk!=="function")return Promise.reject(new Error("no model can be asked from here"));
  return W.lxAsk({modelId:o&&o.chosen?o.chosen.id:null},msgs,max,0.2,function(){});}
function sysText(){return "You keep the working notes of one of my apps, for me and for the models that help me with it. You write only what the conversations and the notes say: never a version, a date, a decision, a file or a feature they do not give. Where they disagree, the later conversation wins. Plain English, short sentences, no jargon. My preferences are quoted in my own words.";}
function userText(p,batch,last){var a=p.app;
  return "THE APP: "+p.name+"\n\nTHE SUMMARY SO FAR:\n"+(a.brief||"(none yet)")+"\n\nTHE DECISIONS SO FAR:\n"+((a.decisions||[]).map(function(x){return "- "+x;}).join("\n")||"(none yet)")+"\n\nOPEN SO FAR:\n"+((a.open||[]).map(function(x){return "- "+x;}).join("\n")||"(none yet)")+
    "\n\nHOW I WORK, AS I HAVE WRITTEN IT:\n"+(a.how||"(nothing yet)")+"\n\nNEW CONVERSATIONS:\n"+batch+
    "\n\nBring the notes up to date with the new conversations. Answer in exactly this form, and nothing else:\nSUMMARY:\n(the whole summary, updated: what the app is, what has been done, and where it stands now; at most 350 words)\n"+
    "DECISION: a decision still standing, and its reason (one to a line, every decision still standing, at most 20)\nOPEN: something still to do (at most 12)\nHOW: a preference of mine about how I like to work that is not yet in HOW I WORK, quoted or closely in my words (only new ones, at most 6)"+(last?"":"\n(More conversations follow after these: keep what will still matter.)");}
function parseNotes(t){var out={summary:"",decisions:[],open:[],how:[]},mode="",buf=[];
  String(t||"").replace(/<think>[\s\S]*?<\/think>/g,"").split("\n").forEach(function(line){var L=line.replace(/\*\*/g,"").trim(),m=/^(SUMMARY|DECISION|OPEN|HOW):\s*(.*)$/i.exec(L.replace(/^[-*•]\s*/,""));
    if(m){var k=m[1].toUpperCase(),v=m[2].trim();if(k==="SUMMARY"){mode="s";if(v)buf.push(v);return;}mode="";if(!v)return;if(k==="DECISION")out.decisions.push(v);else if(k==="OPEN")out.open.push(v);else if(k==="HOW")out.how.push(v.replace(/^["“]|["”]$/g,""));return;}
    if(mode==="s")buf.push(line.replace(/\s+$/,""));});
  out.summary=buf.join("\n").replace(/\n{3,}/g,"\n\n").trim();out.decisions=out.decisions.slice(0,20);out.open=out.open.slice(0,12);out.how=out.how.slice(0,6);return out;}
function bringUp(p){if(RUN.busy){say("Ingenium is already bringing a folder up to date.");return Promise.resolve(null);}
  if(!modelReady()){say("A model is needed to bring the summary up to date: get one on the Models page, or choose your connected model in Lector or Vocatio.");return Promise.resolve(null);}
  var todo=unread(p);if(!todo.length){say("Nothing new to read: the summary is up to date.");return Promise.resolve(null);}
  RUN.busy=true;RUN.of=p.id;RUN.what="Reading "+todo.length+" conversation"+(todo.length===1?"":"s")+"…";paint();
  var R=room(),per=Math.max(2400,Math.floor(R*0.7/Math.min(todo.length,6))),batches=[],cur=[],size=0,kept=0;
  return Promise.all(todo.map(function(c){return msgsOf(c).then(function(ms){return {c:c,t:convText(c,ms,per)};});})).then(function(xs){
      xs.forEach(function(x){if(size+x.t.length>R*0.7&&cur.length){batches.push(cur);cur=[];size=0;}cur.push(x);size+=x.t.length;});if(cur.length)batches.push(cur);
      var q=Promise.resolve();batches.forEach(function(b,i){q=q.then(function(){RUN.what="Reading part "+(i+1)+" of "+batches.length+" ("+b.length+" conversation"+(b.length===1?"":"s")+")…";paint();
        return ask([{role:"system",content:sysText()},{role:"user",content:userText(p,b.map(function(x){return x.t;}).join("\n\n"),i===batches.length-1)}],1800).then(function(t){var n=parseNotes(t);
          if(!n.summary)throw new Error("the model's answer could not be read as notes; try again, or choose a larger model");
          var a=p.app;a.brief=n.summary.slice(0,CAP.brief);if(n.decisions.length)a.decisions=n.decisions;if(n.open.length||i===batches.length-1)a.open=n.open;
          n.how.forEach(function(x){if(x&&(a.how||"").toLowerCase().indexOf(x.toLowerCase().slice(0,40))<0&&!(a.sugg||[]).some(function(s){return s.toLowerCase()===x.toLowerCase();}))(a.sugg=a.sugg||[]).push(x.slice(0,CAP.item));});
          b.forEach(function(x){a.read[x.c.id]=stamp(x.c);kept++;});a.briefAt=Date.now();a.model=modelName();save();});});});
      return q;})
    .then(function(){RUN.busy=false;RUN.what="";paint();say("The summary of "+p.name+" is up to date: "+kept+" conversation"+(kept===1?"":"s")+" read, once.");return p;},
      function(e){RUN.busy=false;RUN.what="";paint();say("It could not be finished: "+(e&&e.message||e)+(kept?" ("+kept+" conversation"+(kept===1?"":"s")+" were read and kept.)":""));return null;});}

/* ---------- bringing her work in ---------- */
function onImported(){var r=sortAll();if(r.n)say(sortWords(r));paint();}
/* brought in from here, the page stays here, and shows where each conversation went */
function chooseImport(){W.__ingImportStay=true;if(typeof W.ingImportChoose==="function")W.ingImportChoose();else say("This page cannot read exports.");}
function pasteImport(){W.__ingImportStay=true;if(typeof W.ingImportPaste==="function")W.ingImportPaste();else say("This page cannot read pasted conversations.");}
function shellApi(){try{var a=W.pywebview&&W.pywebview.api;return a&&typeof a.claude_sessions==="function"?a:null;}catch(e){return null;}}
/* Claude Code's sessions kept on this computer (~/.claude/projects): read on her press, here only, through the app's own bridge */
function readThisMac(){var a=shellApi();if(!a){say("Only the Ingenium app on a computer can read Claude Code's sessions by itself. Here, choose the .jsonl files in the .claude/projects folder.");chooseImport();return;}
  RUN.busy=true;RUN.what="Looking for Claude Code's sessions on this computer…";paint();
  Promise.resolve(a.claude_sessions()).then(function(L){L=L&&L.files||[];if(!L.length)throw new Error("no Claude Code sessions were found in .claude/projects on this computer");
      RUN.what="Reading "+L.length+" session"+(L.length===1?"":"s")+"…";paint();var files=[],q=Promise.resolve();
      L.forEach(function(f,i){q=q.then(function(){return readAll(a,f).then(function(t){files.push(new File([t],f.name.replace(/[\\\/]/g,"_"),{type:"application/x-ndjson"}));if(i%5===4){RUN.what="Read "+(i+1)+" of "+L.length+"…";paint();}});});});
      return q.then(function(){return files;});})
    .then(function(files){RUN.busy=false;RUN.what="";paint();W.__ingImportStay=true;if(typeof W.ingImportStart==="function")W.ingImportStart(files);},function(e){RUN.busy=false;RUN.what="";paint();say("They could not be read: "+(e&&e.message||e));});}
function readAll(a,f){var parts=[],off=0,CH=4*1048576;function step(){return Promise.resolve(a.claude_session_read(f.rel,off,CH)).then(function(r){if(!r||r.error)throw new Error((r&&r.error)||"a session could not be read");parts.push(r.text||"");off+=r.length||0;if(r.more&&off<(f.size||0)+CH)return step();return parts.join("");});}return step();}
/* Ollama: a model's Modelfile (ollama show --modelfile NAME) holds its instructions; they become a way of working */
function readModelfile(t){t=String(t||"");var name=(/^#\s*FROM\s+(\S+)/mi.exec(t)||/^FROM\s+(\S+)/mi.exec(t)||[])[1]||"";var sys="",m=/^SYSTEM\s+"""([\s\S]*?)"""/mi.exec(t)||/^SYSTEM\s+"([\s\S]*?)"\s*$/mi.exec(t)||/^SYSTEM\s+(.+)$/mi.exec(t);if(m)sys=m[1].trim();
  var params=[];t.replace(/^PARAMETER\s+(\S+)\s+(.+)$/gmi,function(_,k,v){params.push(k+" "+v.trim());return "";});return {from:name,system:sys,params:params};}
function ollamaBox(){var box=W.modalOpen?W.modalOpen('<h3>An Ollama model\'s instructions</h3><p class="small muted">A model you made in Ollama keeps its instructions in its Modelfile. In a terminal, <code>ollama show --modelfile</code> followed by the model\'s name prints it. Paste it here: its instructions become a way of working, which any conversation can switch on with the + key, and a folder can carry.</p>'
    +'<label class="field"><span>Name it</span><input type="text" id="fldOlName" placeholder="e.g. My Ingenium helper"></label><label class="field"><span>The Modelfile</span><textarea id="fldOlText" rows="9" style="width:100%;box-sizing:border-box;font:12.5px/1.45 ui-monospace,Menlo,Consolas,monospace"></textarea></label>'
    +'<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;flex-wrap:wrap"><button class="btn ghost" id="fldOlNo">Cancel</button><button class="btn primary" id="fldOlGo">Keep it as a way of working</button></div>'):null;if(!box)return;
  box.querySelector("#fldOlNo").onclick=function(){try{W.closeModal();}catch(e){}};
  box.querySelector("#fldOlGo").onclick=function(){var t=box.querySelector("#fldOlText").value,m=readModelfile(t),nm=box.querySelector("#fldOlName").value.trim()||(m.from?"From Ollama: "+m.from:"From Ollama");
    if(!m.system){say("No SYSTEM instructions were found in what was pasted: paste the whole Modelfile.");return;}
    W.state.skills=W.state.skills||[];var sk={id:"sk"+uid(""),name:nm.slice(0,60),instructions:(m.system+(m.params.length?"\n\n(Ollama's settings for it: "+m.params.join("; ")+".)":"")).slice(0,6000),from:"ollama"};W.state.skills.push(sk);save();
    try{W.closeModal();}catch(e){}say("Kept as a way of working: "+sk.name+". Switch it on in any conversation with the + key.");paint();};}

/* ---------- the page ---------- */
function install(){if($("page-folders"))return;var main=D.querySelector("main.main")||D.querySelector(".main");if(!main)return;
  var sec=h("section","section");sec.id="page-folders";
  sec.innerHTML='<h1 class="page-title">Folders</h1><p class="lede">A folder for each of your apps: how you like to work on it, where you left off, and its conversations. A conversation in a folder starts from these few lines, so a model need not read everything again.</p><div class="fld-wrap" id="fldBody"></div>';
  var after=$("page-code")||$("page-chat");if(after&&after.parentNode===main)main.insertBefore(sec,after.nextSibling);else main.appendChild(sec);
  var nb=D.querySelector('.nav-btn[data-page="code"]')||D.querySelector('.nav-btn[data-page="chat"]');
  if(nb&&!D.querySelector('.nav-btn[data-page="folders"]')){var b=h("button","nav-btn");b.type="button";b.setAttribute("data-page","folders");b.setAttribute("onclick","go('folders')");b.title="Folders";
    b.innerHTML=FOLDER_SVG.replace('aria-hidden="true"','')+"Folders";nb.parentNode.insertBefore(b,nb.nextSibling);}
  if(W.PAGES&&W.PAGES.indexOf("folders")<0)W.PAGES.push("folders");}
function card(title,lede){var c=h("div","card");if(title)c.appendChild(h("h2","sec",esc(title)));if(lede)c.appendChild(h("p","small muted",esc(lede)));return c;}
function paint(){var host=$("fldBody");if(!host)return;var G=F(),open=G.ui.open?folderById(G.ui.open):null;host.innerHTML="";
  if(open)folderView(open,host);else homeView(host);}
function status(host){if(!RUN.busy)return;host.appendChild(h("p","fld-status",'<i class="fld-spin" aria-hidden="true"></i>'+esc(RUN.what)));}
function homeView(host){var fs=folders();status(host);
  if(!fs.length){var c=card("Your apps","Ingenium starts from the apps your profile names. Untick any that should have no folder, add any that is missing, then make them. You can add a folder for a new app at any time.");
    var list=profileApps(),pick=h("div","fld-pick"),boxes=[];
    if(!list.length)pick.appendChild(h("p","small muted",esc("Your profile names no apps yet (Vocatio's entries of projects). Name them here.")));
    list.forEach(function(x){var l=h("label"),cb=h("input");cb.type="checkbox";cb.checked=true;l.appendChild(cb);l.appendChild(h("span",null,"<b>"+esc(x.name)+"</b> <small>"+esc(x.why)+"</small>"));pick.appendChild(l);boxes.push([cb,x.name]);});
    c.appendChild(pick);var more=h("input");more.type="text";more.placeholder="Another app's name";more.setAttribute("aria-label","Another app's name");more.className="fld-more";
    var row=h("div","fld-row");row.appendChild(more);row.appendChild(key("","Add it",function(){var v=more.value.trim();if(!v)return;var l=h("label"),cb=h("input");cb.type="checkbox";cb.checked=true;l.appendChild(cb);l.appendChild(h("span",null,"<b>"+esc(v)+"</b> <small>Added by you</small>"));pick.appendChild(l);boxes.push([cb,v]);more.value="";}));c.appendChild(row);
    var go=h("div","fld-row");go.style.marginTop="12px";go.appendChild(key("primary","Make these folders",function(){var made=0;boxes.forEach(function(b){if(b[0].checked&&makeFolder(b[1]))made++;});if(!made){say("Tick at least one app.");return;}var r=sortAll();say(made+" folder"+(made===1?"":"s")+" made. "+sortWords(r));paint();}));c.appendChild(go);host.appendChild(c);}
  else{var g=card("Your apps",null),grid=h("div","fld-grid");
    fs.forEach(function(p){var n=inFolder(p).length,u=unread(p).length,b=h("button","fld-card");b.type="button";
      b.innerHTML='<span class="fld-name">'+FOLDER_SVG+esc(p.name)+'</span><span class="fld-meta">'+n+" conversation"+(n===1?"":"s")+" · "+(p.app.briefAt?"summary of "+day(p.app.briefAt)+(u?", "+u+" not read yet":""):"no summary yet")+'</span>'+((p.app.words||[]).length>1?'<span class="fld-parts">'+esc(p.app.words.slice(1).join(", "))+'</span>':'');
      b.addEventListener("click",function(){F().ui.open=p.id;save();paint();scrollTop();});grid.appendChild(b);});
    var nb=h("button","fld-card fld-new");nb.type="button";nb.textContent="+ A folder for another app";nb.addEventListener("click",function(){F().ui.adding=true;paint();var i=$("fldAddName");if(i)i.focus();});grid.appendChild(nb);
    g.appendChild(grid);
    if(F().ui.adding){var ar=h("div","fld-row"),ai=h("input");ai.type="text";ai.id="fldAddName";ai.placeholder="The app's name";ai.setAttribute("aria-label","The new app's name");ar.style.marginTop="12px";ar.appendChild(ai);
      var mk=function(){var v=ai.value.trim();if(!v){ai.focus();return;}if(makeFolder(v)){F().ui.adding=false;var r=sortAll();say("Folder made for "+v+". "+(r.n?sortWords(r):""));paint();}};
      ai.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();mk();}if(e.key==="Escape"){F().ui.adding=false;paint();}});
      ar.appendChild(key("primary","Make the folder",mk));ar.appendChild(key("ghost","Cancel",function(){F().ui.adding=false;paint();}));g.appendChild(ar);}
    host.appendChild(g);
    var un=unsorted();if(un.length){var u=card("Not sorted yet ("+un.length+")","Conversations whose words did not clearly name one of your apps. Move each where it belongs, or leave it here.");u.appendChild(convList(un,null));host.appendChild(u);}}
  /* 6.65: her build library (modules/r258.js), after her apps */
  try{if(W.IngBuildLib)W.IngBuildLib.home(host,{card:card});}catch(e){}
  host.appendChild(bringCard());
  var hw=card("How I work, on every app","In your own words: how you like to work, what you expect of a model, what you never want. It goes with every conversation in a folder, before the folder's own notes.");
  var ta=h("textarea","fld-ta");ta.id="fldHowAll";ta.value=F().how||"";ta.setAttribute("aria-label","How I work, on every app");ta.placeholder="For example: one step at a time; plan first, then build, then check; plain words, no jargon; never invent a source.";
  ta.addEventListener("change",function(){F().how=ta.value.slice(0,CAP.how);save();say("Kept: it goes with every conversation in a folder.");});hw.appendChild(ta);host.appendChild(hw);}
function bringCard(){var c=card("Bring in your work","Each is read on this device and nothing is sent anywhere. What comes in is sorted into your folders by the words that name your apps, and you can move any of it.");
  var ways=h("div","fld-ways");
  function way(title,text,keys){var w=h("div","fld-way");w.appendChild(h("b",null,esc(title)));w.appendChild(h("p",null,text));var a=h("div","fld-acts");keys.forEach(function(k){a.appendChild(k);});w.appendChild(a);ways.appendChild(w);}
  way("Claude, on claude.ai","In Claude's settings, under Privacy, ask for your data. Claude sends a link to a .zip: bring that .zip here, as it came. Your chats come in, and your Claude projects become Ingenium projects with their instructions and files.",[key("primary","Bring in the .zip",chooseImport)]);
  /* 6.31, her request: Folders should bring in work from ChatGPT, DeepSeek, LM Studio and the other assistants too, not only from
     Claude and Ollama. The shared import (r160, thoughts/chat_import_core.html) reads them; the key is the same one */
  way("ChatGPT, Gemini, Grok, DeepSeek, Le Chat, Copilot and LM Studio","Bring the export each one gives you, as it came: ChatGPT's .zip (its Settings, Data controls), Gemini's Google Takeout, the files Grok, DeepSeek, Le Chat or Copilot give you, or LM Studio's chat files (the conversations folder of .lmstudio in your home folder; on a Mac, Command, Shift and full stop show hidden folders in the file chooser). Each conversation comes in with its own date, and is sorted into your folders.",[key("primary","Bring in an export",chooseImport)]);
  way("Claude Code, on this computer",shellApi()?"Claude Code keeps each session in the .claude folder of your home folder. Ingenium reads them there, on your press, and only them.":"Claude Code keeps each session as a .jsonl file in the .claude/projects folder of your home folder. In the Ingenium app on your computer this is one press; here, choose the files.",[key("primary",shellApi()?"Read the sessions on this computer":"Choose the session files",shellApi()?readThisMac:chooseImport)]);
  way("Claude Code, on the web","There is no export for these yet. Open the session on claude.ai, copy its conversation, and paste it here. On your Mac, <code>claude --teleport</code> also brings a session down to this computer, to be read with the rest.",[key("","Paste a conversation",pasteImport)]);
  /* 6.39, her answer of 6 November 2026 ("I want its README, its files, and its issues"): a GitHub repository, into a folder (modules/r238.js) */
  if(W.IngFolderRepo)way("A GitHub repository","Its README joins a folder's files and goes with every conversation in it; its text files and its issues, with their comments, are kept in the folder for you to show or use in a conversation. This one uses the internet, on your press only: a public repository needs nothing more, a private one the token Add from GitHub keeps.",[key("primary","Bring in a repository",function(){W.IngFolderRepo.open();})]);
  way("Ollama","A model you made in Ollama keeps its instructions in its Modelfile: paste it, and they become a way of working. A conversation in Ollama's own app can be copied and pasted here too.",[key("","Paste a Modelfile",ollamaBox),key("","Paste a conversation",pasteImport)]);
  c.appendChild(ways);if(folders().length){var r=h("div","fld-row");r.style.marginTop="10px";r.appendChild(key("ghost","Sort into folders again",function(){var x=sortAll();say(sortWords(x));paint();},"Sorts every conversation not yet in a folder"));c.appendChild(r);}return c;}
function convList(list,p){var ul=h("ul","fld-list");list.slice().sort(function(a,b){return stamp(b)-stamp(a);}).slice(0,300).forEach(function(c){var li=h("li"),t=h("div","fld-t");
    t.appendChild(h("b",null,esc(c.title||"A conversation")));var when=c.imported?(c.imported.updated||c.imported.created):c.made;t.appendChild(h("small",null,esc([when?day(when):"",c.imported?"from "+c.imported.from:"",c.sortedBy==="folders"?"sorted by its words":""].filter(Boolean).join(" · "))));li.appendChild(t);
    if(c.imported)li.appendChild(h("span","fld-tag","Carried over"));
    var sel=h("select");sel.setAttribute("aria-label","Move it to a folder");sel.appendChild(new Option(p?"Move to…":"Put it in…",""));folders().forEach(function(f){if(!p||f.id!==p.id)sel.appendChild(new Option(f.name,f.id));});if(p)sel.appendChild(new Option("Not sorted yet","-"));
    sel.addEventListener("change",function(){var v=sel.value;if(!v)return;if(v==="-")delete c.projectId;else c.projectId=v;c.sortedBy="her";save();paint();});li.appendChild(sel);
    li.appendChild(key("small","Open",function(){try{W.openChat(c);}catch(e){W.state.activeChat=c.id;save();W.go("chat");}}));ul.appendChild(li);});return ul;}
function folderView(p,host){var a=p.app;
  /* 6.10, her words (3 November 2026): "I dislike the long raised Folders bar at the top of the page, please redesign that button
     properly". The way back is a quiet path above the folder's name, Folders › Quill, as a book's running head would give it */
  var crumb=h("nav","fld-crumb");crumb.setAttribute("aria-label","Where you are");var ck=h("button","fld-crumbk","Folders");ck.type="button";ck.title="Back to all your folders";
  ck.addEventListener("click",function(){F().ui.open=null;save();paint();scrollTop();});crumb.appendChild(ck);crumb.appendChild(h("span","fld-sep","›"));crumb.lastChild.setAttribute("aria-hidden","true");
  crumb.appendChild(h("span","fld-here",esc(p.name)));crumb.lastChild.setAttribute("aria-current","page");host.appendChild(crumb);
  var hd=h("div","fld-h");
  if(F().ui.renaming===p.id){var ri=h("input");ri.type="text";ri.value=p.name;ri.id="fldRename";ri.setAttribute("aria-label","The folder's new name");var keep=function(){var v=ri.value.trim();if(v){p.name=v.slice(0,80);if(p.app.words&&p.app.words[0]!==p.name&&p.app.words.indexOf(p.name)<0)p.app.words.unshift(p.name);}F().ui.renaming=null;save();paint();};
    ri.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();keep();}if(e.key==="Escape"){F().ui.renaming=null;paint();}});hd.appendChild(ri);hd.appendChild(key("primary small","Keep the name",keep));hd.appendChild(key("ghost small","Cancel",function(){F().ui.renaming=null;paint();}));setTimeout(function(){try{ri.focus();ri.select();}catch(e){}},30);}
  else{hd.appendChild(h("h2",null,esc(p.name)));hd.appendChild(key("ghost small","Rename",function(){F().ui.renaming=p.id;paint();}));hd.appendChild(key("primary","Start a conversation in this folder",function(){startIn(p);}));}
  host.appendChild(hd);status(host);
  /* where we left off */
  var u=unread(p),wl=card("Where we left off",a.briefAt?"Brought up to date "+day(a.briefAt)+(a.model?" with "+((W.ingPrettyModels||String)(a.model)):"")+". "+(u.length?u.length+" conversation"+(u.length===1?"":"s")+" not read yet.":"Every conversation in this folder is read."):"No summary yet. Ingenium reads the conversations in this folder once, and writes where things stand: what is done, the decisions, and what is open.");
  if(a.brief)wl.appendChild(h("div","fld-brief",esc(a.brief)));
  var r=h("div","fld-row");r.style.marginTop="10px";var up=key(u.length?"primary":"",u.length?"Bring it up to date ("+u.length+")":"Up to date",function(){bringUp(p);},"Reads only the conversations not read yet, once");if(!u.length||RUN.busy)up.disabled=true;r.appendChild(up);wl.appendChild(r);host.appendChild(wl);
  if(a.sugg&&a.sugg.length){var sg=card("Seen in the conversations: how you like to work","Keep the ones that are right, in How I work on "+p.name+"; drop the rest."),ul=h("ul","fld-list fld-sugg");
    a.sugg.forEach(function(s,i){var li=h("li");li.appendChild(h("div","fld-t","<b>"+esc(s)+"</b>"));li.appendChild(key("small","Keep",function(){a.how=((a.how||"").trim()+"\n- "+s).trim().slice(0,CAP.how);a.sugg.splice(i,1);save();paint();}));li.appendChild(key("small ghost","Drop",function(){a.sugg.splice(i,1);save();paint();}));ul.appendChild(li);});sg.appendChild(ul);host.appendChild(sg);}
  /* how I work here */
  var hw=card("How I work on "+p.name,"In your own words. It goes with every conversation in this folder, after How I work on every app.");var ta=h("textarea","fld-ta");ta.value=a.how||"";ta.setAttribute("aria-label","How I work on "+p.name);
  ta.addEventListener("change",function(){a.how=ta.value.slice(0,CAP.how);save();say("Kept for every conversation in "+p.name+".");});hw.appendChild(ta);host.appendChild(hw);
  /* 6.65: how this app was built, from her build library (modules/r258.js) */
  try{if(W.IngBuildLib)W.IngBuildLib.folder(p,host,{card:card});}catch(e){}
  /* decisions and what is open */
  var dc=card("Decisions, and what is open","Kept by Ingenium when the summary is brought up to date; change or remove any.");
  [["Decisions so far","decisions"],["Open next","open"]].forEach(function(x){dc.appendChild(h("h3","small",esc(x[0])));var ul=h("ul","fld-list");(a[x[1]]||[]).forEach(function(s,i){var li=h("li");li.appendChild(h("div","fld-t",esc(s)));li.appendChild(key("small ghost","Remove",function(){a[x[1]].splice(i,1);save();paint();}));ul.appendChild(li);});
    if(!(a[x[1]]||[]).length)ul.appendChild(h("li",null,'<span class="small muted">None yet.</span>'));dc.appendChild(ul);
    var row=h("div","fld-row"),inp=h("input");inp.type="text";inp.placeholder="Add one";inp.setAttribute("aria-label","Add to "+x[0]);row.appendChild(inp);row.appendChild(key("small","Add",function(){var v=inp.value.trim();if(!v)return;(a[x[1]]=a[x[1]]||[]).push(v.slice(0,CAP.item));save();paint();}));row.style.margin="6px 0 10px";dc.appendChild(row);});
  host.appendChild(dc);
  /* its conversations */
  var cv=inFolder(p),cc=card("Conversations ("+cv.length+")",cv.length?"Open one to carry on: it starts from this folder's notes.":"None yet. Bring in your work on the Folders page, or start one here.");if(cv.length)cc.appendChild(convList(cv,p));host.appendChild(cc);
  /* 6.39: a GitHub repository in this folder, its README, files and issues (modules/r238.js) */
  try{if(W.IngFolderRepo&&typeof W.IngFolderRepo.card==="function")W.IngFolderRepo.card(p,host);}catch(e){try{console.warn("R238 card",e);}catch(_){}}
  /* the words that mark it, and its files */
  var wd=card("The words that mark it","A conversation that uses these words most is sorted into this folder: its name, and the names of its parts.");var chips=h("div","fld-chips");
  (a.words||[]).forEach(function(w,i){var c=h("span","fld-chip");c.appendChild(h("span",null,esc(w)));if(i>0||a.words.length>1){var x=h("button",null,"✕");x.type="button";x.title="Remove "+w;x.onclick=function(){a.words.splice(i,1);save();paint();};c.appendChild(x);}chips.appendChild(c);});wd.appendChild(chips);
  var wr=h("div","fld-row"),wi=h("input");wi.type="text";wi.placeholder="Another word, e.g. a part's name";wi.setAttribute("aria-label","Another word that marks this folder");wr.appendChild(wi);wr.appendChild(key("small","Add",function(){var v=wi.value.trim();if(!v)return;a.words=(a.words||[]).concat([v.slice(0,40)]);save();var r2=sortAll();if(r2.n)say(sortWords(r2));paint();}));wr.style.marginTop="8px";wd.appendChild(wr);
  wd.appendChild(h("p","small muted",esc((p.files||[]).length+" file"+((p.files||[]).length===1?"":"s")+" go with its conversations. ")));var fr=h("div","fld-row");fr.appendChild(key("small","Its files and instructions",function(){try{W.openProject(p.id);}catch(e){say("The project's window could not be opened.");}}));
  wd.appendChild(fr);host.appendChild(wd);}
function startIn(p){try{W.go("chat");var b=$("chatNew");if(b)b.click();var c=W.curChat();c.projectId=p.id;save();if(typeof W.paintChips==="function")W.paintChips();say("A new conversation in "+p.name+": it starts from the folder's notes.");}catch(e){say("A conversation could not be started: "+(e&&e.message||e));}}
function scrollTop(){try{var s=$("page-folders");if(s&&s.scrollIntoView)s.scrollIntoView({block:"start"});var m=D.querySelector(".main");if(m)m.scrollTop=0;W.scrollTo(0,0);}catch(e){}}

/* ---------- wiring ---------- */
function start(){install();wrapPrompt();
  var g=W.go;if(typeof g==="function"&&!g.__r208){W.go=function(pg){var r=g.apply(this,arguments);try{if(pg==="folders")paint();}catch(e){}return r;};W.go.__r208=1;try{go=W.go;}catch(e){}}
  W.addEventListener("ing-imported",function(){setTimeout(onImported,200);});
  try{if($("page-folders")&&$("page-folders").classList.contains("active"))paint();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
W.addEventListener("load",function(){wrapPrompt();});
W.IngFolders={everyApp:everyApp,folders:folders,make:makeFolder,sortAll:sortAll,contextFor:contextFor,bringUp:bringUp,parseNotes:parseNotes,profileApps:profileApps,readModelfile:readModelfile,paint:paint,unread:unread,run:RUN};
})();
;try{window.__ingParts["p208"]="running";}catch(_){}
</script>
