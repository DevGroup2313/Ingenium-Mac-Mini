<style id="r160-css">
/* ============ R160 · YOUR CHATS FROM ANY ASSISTANT, CARRIED OVER ============
   The owner's words (23 October 2026): "I want to be able to import my exported data from other chats into the app and
   continue working on my projects smoothly. It needs to be a smooth handoff from any frontier provider."
   Ingenium reads the export each assistant gives (the zip as it comes, or the file inside it), on the device:
   - ChatGPT (conversations.json, the branch that was being followed, its projects, its code and its attached text files);
   - Claude (conversations.json and projects.json: each project's instructions and documents become an Ingenium project);
   - Gemini (Google Takeout, My Activity: the prompts and replies, gathered into conversations by when they were written);
   - Grok, DeepSeek, Le Chat, Microsoft Copilot (its CSV), and any transcript: Markdown, text, JSON messages, JSON lines.
   A large export is read a piece at a time from the disk (a zip of gigabytes, a conversations.json of hundreds of
   megabytes), never whole. Each conversation keeps its own date and title, is listed with the others, and opens when
   it is chosen; its words wait in the device's store until then, so the desk stays light. At the top of each one a brief
   says where it came from and where it ended. When the conversation is continued here, it becomes one of hers, and a
   model reads as much of it as its memory holds, with the brief and the earlier passages that matter (modules/r159.js). */
.imp-card{margin:2px 0 12px;padding:12px 14px;border:1px solid var(--hairline);border-radius:12px;background:var(--card);font:500 12.5px/1.5 var(--sans);color:var(--ink-2)}
.imp-card b{color:var(--ink-1)}
.imp-card .imp-h{display:flex;align-items:center;gap:8px;font-weight:650;color:var(--ink-1);margin-bottom:4px}
.imp-card .imp-tag{font:700 10.5px/1.6 var(--sans);letter-spacing:.05em;text-transform:uppercase;color:var(--accent);background:var(--bg);border:1px solid var(--hairline);border-radius:999px;padding:0 8px}
.imp-card .imp-b{white-space:pre-wrap;margin-top:6px;max-height:260px;overflow:auto}
#ingImportCard .imp-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:10px}
#ingImportCard .imp-list{margin-top:10px;display:grid;gap:6px}
#ingImportCard .imp-item{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap;font-size:12.5px}
.imp-dlg .imp-sum{font-size:13px;margin:4px 0 10px}
.imp-dlg .imp-convs{max-height:min(50vh,420px);overflow:auto;border:1px solid var(--hairline);border-radius:10px;padding:4px 8px;background:var(--card)}
.imp-dlg .imp-c{display:flex;gap:8px;align-items:flex-start;padding:5px 2px;border-bottom:1px solid var(--hairline);font-size:12.5px}
.imp-dlg .imp-c:last-child{border-bottom:0}
.imp-dlg .imp-c small{color:var(--ink-3)}
.imp-dlg .imp-acts{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:12px}
.imp-dlg .imp-opts{display:grid;gap:4px;margin:10px 0 0;font-size:12.5px}
.cc-row .cc-imp{font:700 9.5px/1.5 var(--sans);letter-spacing:.04em;color:var(--accent);margin-left:6px;text-transform:uppercase}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p81"]="started";}catch(_){}
/* R160 · your chats from any assistant, carried over: see the note at the top of its styles */
(function(){"use strict";
if(window.__r160)return;window.__r160=1;
var W=window;
function $(id){return document.getElementById(id);}
function el(tag,cls,text){var n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;}
function toast(t){try{ingToast(t);}catch(e){}}
var tick=typeof MessageChannel==="function"?(function(){var ch=new MessageChannel(),q=[];ch.port1.onmessage=function(){var f=q.shift();if(f)f();};return function(f){q.push(f);ch.port2.postMessage(0);};})():function(f){setTimeout(f,0);};
function breathe(){return new Promise(function(r){tick(r);});}

/* sections 1 to 4 (the zip, the JSON read a conversation at a time, the formats, reading what was chosen) and the handoff
   brief are shared with the Forge: thoughts/chat_import_core.html, written in just before this module */
var C=W.ChatImportCore;if(!C){try{console.warn("Ingenium: the shared import of chats is missing");}catch(e){}return;}
W.ingImportRead=C.read;var brief=C.brief;
/* ---------- 5. into Ingenium ---------- */
var day=C.day;
function idFor(t){return "c"+Math.max(1e12,Math.min(4e12,t||Date.now())).toString(36)+"i"+Math.random().toString(36).slice(2,7);}
function asMsg(m){var x={role:m.role==="user"?"me":"bot",text:String(m.text||""),imported:1};if(m.at){x.at=m.at;x.done=m.at;}if(m.think)x.think=String(m.think);
  var withText=(m.files||[]).filter(function(f){return f.text;}),names=(m.files||[]).map(function(f){return f.name;});
  if(names.length)x.files=(m.files||[]).map(function(f){return {name:f.name,chars:(f.text||"").length};});
  if(withText.length){var blk=withText.map(function(f){return "<file name=\""+String(f.name).replace(/"/g,"'")+"\">\n"+String(f.text).slice(0,FILE_MAX_CHARS)+"\n</file>";}).join("\n\n");
    if(blk.length>BIG_AT){x.attachRef=IngBig.newId();x.attachChars=blk.length;x.__blk=blk;}else x.attach=blk;}
  var missing=(m.files||[]).filter(function(f){return !f.text;}).map(function(f){return f.name;});
  if(missing.length&&x.role==="me")x.text+=(x.text?"\n\n":"")+"[attached in "+"the original: "+missing.join(", ")+"]";
  return x;}
/* imported conversations wait in the store until they are opened; the desk keeps their titles and briefs */
function hide(c,arr){try{Object.defineProperty(c,"messages",{value:arr,enumerable:false,writable:true,configurable:true});}catch(e){c.messages=arr;}}
function cold(id,text){try{if(typeof IngBig.cold==="function")return IngBig.cold(id,text);}catch(e){}return IngBig.put(id,text);}
W.ingImportApply=function(found,opt){opt=opt||{};state.chats=state.chats||[];state.projects=state.projects||[];
  var have={};state.chats.forEach(function(c){if(c.imported&&c.imported.id)have[c.imported.from+"|"+c.imported.id]=c;});
  var pmap={},made={chats:0,projects:0,again:0,messages:0};
  if(opt.projects!==false)found.projects.forEach(function(p){var ex=state.projects.filter(function(x){return x.imported&&x.imported.key===p.key;})[0];if(ex){pmap[p.key]=ex.id;return;}
    var pr={id:"p"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),name:p.name,instructions:p.instructions||"",files:(p.files||[]).map(function(f){return {name:f.name,text:String(f.text||"").slice(0,FILE_MAX_CHARS)};}),
      imported:{from:found.source||"another assistant",key:p.key,at:Date.now()}};state.projects.push(pr);pmap[p.key]=pr.id;made.projects++;});
  /* ChatGPT's projects are known only by their mark: one Ingenium project for each, named after its first conversation */
  found.conversations.forEach(function(c){if(c.project&&!pmap[c.project]&&/^g-p-/.test(c.project)&&opt.projects!==false){
    var pr={id:"p"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),name:(found.source||"ChatGPT")+" project: "+c.title.slice(0,40),instructions:"",files:[],imported:{from:found.source,key:c.project,at:Date.now()}};
    state.projects.push(pr);pmap[c.project]=pr.id;made.projects++;}});
  var pick=opt.only?function(c){return opt.only.indexOf(c)>=0;}:function(){return true;};
  var writes=[];
  found.conversations.filter(pick).forEach(function(c){var key=(c.source||found.source)+"|"+c.id;if(c.id&&have[key]&&!opt.again){made.again++;return;}
    var msgs=c.messages.map(asMsg);msgs.forEach(function(x){if(x.__blk){writes.push([x.attachRef,x.__blk]);delete x.__blk;}});
    var ref=IngBig.newId(),json=JSON.stringify(msgs);writes.push([ref,json]);
    var ch={id:idFor(c.updated||c.created),title:c.title,made:c.updated||c.created||Date.now(),
      imported:{from:c.source||found.source||"another assistant",id:c.id||"",at:Date.now(),created:c.created||0,updated:c.updated||0,model:c.model||"",count:msgs.length,ref:ref,
        preview:String((c.messages.filter(function(m){return m.role==="user";})[0]||{}).text||"").replace(/\s+/g," ").slice(0,200),brief:brief(c)}};
    if(c.project&&pmap[c.project])ch.projectId=pmap[c.project];
    hide(ch,[]);state.chats.push(ch);made.chats++;made.messages+=msgs.length;});
  return writes.reduce(function(p,w,i){return p.then(function(){return cold(w[0],w[1]);}).then(function(){if(i%40===39)return breathe();});},Promise.resolve())
    .then(function(){saveState();try{ccPaintSide();}catch(e){}try{renderChat();}catch(e){}return made;});};

/* ---------- 6. an imported conversation, opened ---------- */
var LOADING={};
function hydrate(c){if(!c||!c.imported||c.imported.adopted||c.__hyd||LOADING[c.id])return null;LOADING[c.id]=1;
  return IngBig.load(c.imported.ref).then(function(t){var arr=[];try{arr=JSON.parse(t||"[]");}catch(e){}
      var add=(c.messages||[]).filter(function(x){return !x.imported;});hide(c,arr.concat(add));
      try{Object.defineProperty(c,"__hyd",{value:sig(c),enumerable:false,writable:true,configurable:true});}catch(e){c.__hyd=sig(c);}
      delete LOADING[c.id];if(curChat()===c)renderChat();return c;},function(){delete LOADING[c.id];});}
function sig(c){var m=c.messages||[],l=m[m.length-1]||{};return m.length+"|"+String(l.text||"").length+"|"+(l.role||"")+"|"+(l.edits?l.edits.length:0);}
/* continued, changed or added to: it becomes one of hers, kept on the desk like any other */
function adopt(){(state.chats||[]).forEach(function(c){if(!c.imported||c.imported.adopted||!c.__hyd)return;if(sig(c)===c.__hyd)return;
  var m=c.messages;try{delete c.messages;}catch(e){}c.messages=m;c.imported.adopted=Date.now();});}
if(typeof W.saveState==="function"){var oSave=W.saveState;W.saveState=saveState=function(){try{adopt();}catch(e){}return oSave.apply(this,arguments);};}
/* the brief at the top of the conversation, and its words fetched when it is first shown */
if(typeof W.renderChat==="function"){var oRender=W.renderChat;
  W.renderChat=renderChat=function(){var c=null;try{c=curChat();if(c&&c.imported&&!c.imported.adopted&&!c.__hyd)hydrate(c);}catch(e){}
    var r=oRender.apply(this,arguments);try{paintBrief(c);}catch(e){}return r;};}
function paintBrief(c){var sc=$("chatScroll")||document.querySelector(".chat-scroll");if(!sc)return;var old=sc.querySelector(".imp-card");
  if(!c||!c.imported){if(old)old.remove();return;}
  if(old&&old.getAttribute("data-c")===c.id)return;if(old)old.remove();
  var d=el("div","imp-card");d.setAttribute("data-c",c.id);d.setAttribute("role","note");
  var h=el("div","imp-h");h.appendChild(el("span","imp-tag","Carried over"));h.appendChild(el("span",null,"From "+c.imported.from+(c.imported.created?" · "+day(c.imported.created):"")));d.appendChild(h);
  d.appendChild(el("div","imp-b",c.imported.brief||""));
  d.appendChild(el("div","small muted",(c.__hyd||c.imported.adopted)?"Write below to carry on here: the model reads as much of this conversation as its memory holds, with this brief and the earlier passages that matter.":"Opening its "+c.imported.count+" messages…"));
  sc.insertBefore(d,sc.firstChild);}

/* ---------- 7. where to bring them in: Settings, and the list of conversations ---------- */
function chooseFiles(){var inp=el("input");inp.type="file";inp.multiple=true;inp.accept=".zip,.json,.jsonl,.md,.markdown,.txt,.csv,.html,.htm";inp.style.display="none";document.body.appendChild(inp);
  inp.onchange=function(){var fs=[].slice.call(inp.files||[]);inp.remove();if(fs.length)start(fs);};inp.click();}
function start(fs){var dlg=openDlg("Reading your export…");var st=dlg.querySelector(".imp-sum");
  W.ingImportRead(fs,function(found){st.textContent="Read so far: "+found.conversations.length+" conversations…";}).then(function(found){showFound(dlg,found);},
    function(e){st.textContent="It could not be read: "+(e&&e.message||e);});}
function openDlg(title){try{var box=$("modalBox");box.innerHTML="";var w=el("div","imp-dlg");w.appendChild(el("h3",null,title));w.appendChild(el("div","imp-sum",""));box.appendChild(w);openModal();return w;}
  catch(e){var w2=el("div","imp-dlg");return w2;}}
function showFound(dlg,found){dlg.querySelector("h3").textContent="Bring your chats from "+found.source;var n=found.conversations.length,m=0;found.conversations.forEach(function(c){m+=c.messages.length;});
  var first=found.conversations.reduce(function(a,c){return Math.min(a,c.created||a);},Date.now()),last=found.conversations.reduce(function(a,c){return Math.max(a,c.updated||0);},0);
  dlg.querySelector(".imp-sum").textContent=n?(n+" conversation"+(n===1?"":"s")+", "+m.toLocaleString()+" messages"+(found.projects.length?", "+found.projects.length+" project"+(found.projects.length===1?"":"s"):"")+(last?", "+day(first)+" to "+day(last):"")+"."):"Nothing that looks like a conversation was found in it.";
  if(!n)return;
  var list=el("div","imp-convs");var picks=[];
  found.conversations.slice(0,1500).forEach(function(c){var r=el("label","imp-c"),cb=el("input");cb.type="checkbox";cb.checked=true;cb.setAttribute("aria-label",c.title);r.appendChild(cb);
    var t=el("span");t.appendChild(el("b",null,c.title));t.appendChild(el("br"));t.appendChild(el("small",null,c.messages.length+" messages"+(c.updated?" · "+day(c.updated):"")+(c.source&&c.source!==found.source?" · "+c.source:"")));r.appendChild(t);list.appendChild(r);picks.push([cb,c]);});
  dlg.appendChild(list);
  if(found.conversations.length>1500)dlg.appendChild(el("div","small muted","The 1,500 newest are listed; Bring all brings every one."));
  var opts=el("div","imp-opts"),pj=el("label"),pjc=el("input");pjc.type="checkbox";pjc.checked=true;pj.appendChild(pjc);pj.appendChild(document.createTextNode(" Bring its projects as Ingenium projects (their instructions and files)"));if(found.projects.length||found.conversations.some(function(c){return c.project;}))opts.appendChild(pj);
  dlg.appendChild(opts);
  var acts=el("div","imp-acts"),no=el("button","btn ghost","Cancel"),some=el("button","btn","Bring the ones ticked"),all=el("button","btn primary","Bring all");[no,some,all].forEach(function(b){b.type="button";acts.appendChild(b);});
  dlg.appendChild(acts);
  no.onclick=function(){try{closeModal();}catch(e){}};
  function go(only){[no,some,all].forEach(function(b){b.disabled=true;});dlg.querySelector(".imp-sum").textContent="Bringing them in…";
    W.ingImportApply(found,{only:only,projects:pjc.checked}).then(function(made){try{closeModal();}catch(e){}
      toast(made.chats+" conversation"+(made.chats===1?"":"s")+" from "+found.source+" are in your list"+(made.projects?", and "+made.projects+" project"+(made.projects===1?"":"s"):"")+(made.again?" ("+made.again+" already here were left as they are)":"")+".");
      try{go_chat();}catch(e){}},function(e){dlg.querySelector(".imp-sum").textContent="They could not all be brought in: "+(e&&e.message||e);});}
  some.onclick=function(){go(picks.filter(function(p){return p[0].checked;}).map(function(p){return p[1];}));};all.onclick=function(){go(null);};}
function go_chat(){if(typeof go==="function")go("chat");}
function settingsCard(){var pg=$("page-settings");if(!pg||$("ingImportCard"))return;
  var c=el("div","card");c.id="ingImportCard";c.setAttribute("role","region");c.setAttribute("aria-labelledby","ingImportH");
  var h=el("h2","sec","Bring your chats from other assistants");h.id="ingImportH";c.appendChild(h);
  c.appendChild(el("p","small muted","Choose the export your assistant gave you, as it came (the zip, or a file inside it). Ingenium reads exports from ChatGPT and Claude (with its projects), Gemini's Google Takeout, Grok, DeepSeek, Le Chat and Copilot laid out as they were in October 2026, and plain transcripts. Each layout was tested on sample files made in that layout, not on real exports. It is read here, on this device; nothing is sent anywhere. Each conversation joins your list with its own date (Gemini's are gathered from the times of its prompts), and carries on here where it ended."));
  var row=el("div","imp-row"),b=el("button","btn","Choose your export…");b.type="button";b.onclick=chooseFiles;row.appendChild(b);c.appendChild(row);
  var lst=el("div","imp-list");c.appendChild(lst);
  function paint(){lst.innerHTML="";var by={};(state.chats||[]).forEach(function(x){if(x.imported){by[x.imported.from]=(by[x.imported.from]||0)+1;}});
    Object.keys(by).forEach(function(k){var it=el("div","imp-item");it.appendChild(el("b",null,k));it.appendChild(el("span","small muted",by[k]+" conversation"+(by[k]===1?"":"s")+" carried over"));lst.appendChild(it);});}
  paint();c.__paint=paint;
  var at=$("ingEyesCard")||$("linkCard");if(at&&at.parentNode===pg)pg.insertBefore(c,at.nextSibling);else pg.appendChild(c);}
/* the list of conversations: the key to bring more, and a mark on each carried over */
if(typeof W.ccPaintSide==="function"){var oSide=W.ccPaintSide;W.ccPaintSide=ccPaintSide=function(){var r=oSide.apply(this,arguments);try{sideKey();}catch(e){}return r;};}
function sideKey(){var list=document.querySelector(".cc-list");if(!list||CC.mode!=="chat")return;var h=list.parentNode;if(!h||h.querySelector(".cc-import"))return;
  var b=el("button","cc-mini cc-import","⇪ Bring chats from another assistant");b.type="button";b.title="Import the export of ChatGPT, Claude, Gemini, Grok, DeepSeek, Le Chat, Copilot or a transcript";b.onclick=chooseFiles;
  b.style.cssText="width:100%;margin:6px 0 2px;text-align:left";h.appendChild(b);}
if(typeof W.ccRow==="function"){var oRow=W.ccRow;W.ccRow=ccRow=function(c){var r=oRow.apply(this,arguments);try{if(c&&c.imported&&r&&!r.querySelector(".cc-imp")){var m=el("span","cc-imp",c.imported.from);r.appendChild(m);}}catch(e){}return r;};}

/* imported conversations not yet opened keep an empty list of messages that the desk does not write */
function init(){(state.chats||[]).forEach(function(c){if(c.imported&&!c.imported.adopted)hide(c,(c.messages&&c.messages.length?c.messages:[]));});
  try{settingsCard();}catch(e){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
/* Settings shows what was carried over, from where, each time it is opened */
function shown(){settingsCard();var c=$("ingImportCard");if(c&&c.__paint)c.__paint();}
document.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest('.nav-btn[data-page="settings"]');if(t)setTimeout(shown,0);},true);
if(typeof W.go==="function"){var oGo=W.go;W.go=go=function(pg){var r=oGo.apply(this,arguments);if(pg==="settings")setTimeout(function(){try{shown();}catch(e){}},0);return r;};}
W.IngImport={read:W.ingImportRead,apply:W.ingImportApply,brief:brief,hydrate:hydrate,parsers:C.parsers,Zip:C.Zip};
})();
;try{window.__ingParts["p81"]="running";}catch(_){}
</script>
