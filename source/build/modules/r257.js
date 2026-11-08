<style id="r257-css">
/* ============ R257 · THE CHAT ANSWERS FROM YOUR FOLDERS (Ingenium 6.59, 8 November 2026) ============ */
.msg .md a.rag-cite{color:var(--accent-deep);font-weight:650;text-decoration:none;white-space:nowrap}
.msg .md a.rag-cite:hover,.msg .md a.rag-cite:focus-visible{text-decoration:underline}
.msg .rag-sources li{margin:1px 0;overflow-wrap:anywhere}
.msg .rag-sources .rag-where{color:var(--ink-3)}
.msg .rag-note{display:block;margin:7px 0 0;font-size:12px;line-height:1.45;color:var(--ink-3)}
.msg .rag-flag ul{margin:4px 0 0;padding-left:18px}
#modalBox.rag-view{max-width:780px}
#modalBox .rag-vmeta{margin:0 0 6px;overflow-wrap:anywhere}
#modalBox .rag-vnote{margin:0 0 8px;min-height:1.4em;color:var(--ink-2)}
#modalBox .rag-vread{margin:0 0 10px;padding:10px 12px;border:1px dashed var(--hairline);border-radius:10px;font-size:13px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--ink-1)}
#modalBox .rag-vread b{display:block;font:700 10.5px/1.5 var(--sans);letter-spacing:.05em;text-transform:uppercase;color:var(--ink-3);margin-bottom:3px}
#modalBox .rag-vtext{white-space:pre-wrap;overflow-wrap:anywhere;font:13px/1.6 var(--sans);color:var(--ink-1);max-height:56vh;overflow:auto;border:1px solid var(--hairline);border-radius:10px;padding:12px 14px;background:var(--bg)}
#modalBox .rag-vtext mark{background:rgba(255,206,84,.42);color:inherit;border-radius:3px;padding:1px 0}
body[data-theme="night"] #modalBox .rag-vtext mark{background:rgba(255,196,70,.26)}
#modalBox .rag-vtext .rag-vcut{display:block;color:var(--ink-3);font-size:12px;font-style:italic;margin:2px 0}
#modalBox .rag-vacts{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:12px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p257"]="started";}catch(_){}
/* ============ R257 · THE CHAT ANSWERS FROM YOUR FOLDERS (Ingenium 6.59, 8 November 2026) ============
   Her task (31 October 2026, sent again on 8 November 2026): "Add an opt-in RAG mode to the existing chat app. When the mode is
   enabled, every chat turn retrieves context from user-selected local folders. Retrieval is filtered by the current user's folder
   permissions, and the answer cites its sources." Phase 3: "Add the RAG toggle, call retrieve(), inject the context, and render
   citations", with her grounding contract: "If retrieve() returns zero chunks, do not call the LLM. Return the constant NOT_FOUND",
   otherwise her system prompt, word for word (rag/prompt.js), and "Render each [n] as a clickable link. It opens the source file ...
   and, where possible, highlights the section (character offsets for text and Markdown, page number for PDF)."
   Desktop only (the Mac and Windows apps, where the folder search is: window.IngRag, from rag/ beside the page). Here:
   1. THE SWITCH. "Your folders" in the chat's + menu, first of the ways of looking things up (before Research and Web search), and a chip above the message box while it is on (its ✕ turns
      it off). Turning it on turns Web search and Research off: an answer from her folders uses nothing else. Not offered in Code
      conversations, nor where the folder search is not (a browser, the Fire tablet, the iPhone): there the switch does not show.
   2. A TURN. Her message is marked when it is sent (rec.ragAsk). In the chat's own preparation step (chatPrepare), before any model is
      asked, IngRag.retrieve(her words, "me", {k: 5}) runs (the folder permissions inside both searches, rag/retriever.js); zero
      passages: the reply is NOT_FOUND and no model is called (a note says why when no folder has been read). Otherwise the chat's
      model, whichever it is (a model on this computer, one lent by another, or a connection such as Claude), reads exactly two
      messages: her system prompt with the passages numbered [1] to [n], and her question (chatHistory; passages that do not fit the
      model's memory are left out from the worst, and the reply says so). Nothing else goes with it: not the earlier conversation, not
      memory, not the web, not the working loop's tools. A message that carries a file or a picture is answered without the folders,
      with a note. The passages are kept with the reply (bot.rag), so its sources stay readable on every device.
   3. THE REPLY. When it is written: a reply that is the NOT_FOUND sentence becomes exactly NOT_FOUND; otherwise every sentence is
      checked for a citation that points to a passage given (rag/prompt.js, checkGrounded), and the sentences without one are named
      under the reply. Each [n] is a link, and the passages are listed under the reply ("From your folders").
   4. THE VIEWER. A link opens the source: the passage as it was read at once, then the file itself, read again through the app
      (IngRag.openSource: only a folder she may read), with the passage marked where it is (its character offsets; a PDF's page), or
      found again if the file changed. Elsewhere than the computer that read it, the passage as it was read. */
(function r257(){
"use strict";
if(window.__r257)return;window.__r257=1;
var W=window,D=document;
var NOT_FOUND="I could not find that in the selected folders.";   /* rag/prompt.js, NOT_FOUND */
var USER="me";   /* the one user now (rag/main.js PRINCIPAL); the tests ask as their second user with IngRagChat._as */
var ICON='<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v2.5"/><path d="M3 7v10a2 2 0 0 0 2 2h6.5"/><circle cx="16.5" cy="15.5" r="3.5"/><path d="M19.1 18.1L21.5 20.5"/>';
function $(id){return D.getElementById(id);}
function mk(tag,cls,text){var n=D.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;}
function R(){var r=W.IngRag;try{return r&&typeof r.retrieve==="function"&&r.prompt&&r.available()?r:null;}catch(e){return null;}}
function on(){try{return !!(state.rag&&state.rag.on);}catch(e){return false;}}
function codeChat(){try{var c=curChat();return !!(c&&(c.kind==="code"||(typeof ccIsCode==="function"&&ccIsCode(c))));}catch(e){return false;}}
function usable(){return on()&&!!R()&&!codeChat();}
function plain(e){return String((e&&(e.plain||e.message))||e||"something went wrong").replace(/\s+$/,"");}
function keepMarks(n,o){try{Object.keys(o).forEach(function(k){if(/^__r\d+$/.test(k)&&n[k]===undefined)n[k]=o[k];});}catch(e){}return n;}
function cloudName(){try{var c=state.cloud||{};if(chatSource()==="cloud"&&c.on&&c.provider&&c.provider!=="ingenium")return c.model||c.provider;}catch(e){}return "";}
function toast(t){try{ingToast(t);}catch(e){}}

/* ---------------------------------------------------------------- 1. the switch */
function setOn(v){try{if(!state.rag||typeof state.rag!=="object")state.rag={};state.rag.on=!!v;}catch(e){return;}
  var off=[];if(v){if(state.webSearch){state.webSearch=false;off.push("Web search");}if(state.research){state.research=false;off.push("Research");}}
  try{saveState();}catch(e){}try{paintChips();}catch(e){}
  var cn=cloudName();
  toast(v?("Replies now come only from your folders, each with its sources."+(off.length?" "+off.join(" and ")+(off.length>1?" are":" is")+" off meanwhile.":"")+(cn?" This conversation uses "+cn+": the passages found go there with your question.":"")):"Replies no longer come from your folders.");}
function plusItem(){var m=$("chatPlusMenu");if(!m||m.querySelector("[data-rag-item]")||typeof pmItem!=="function")return;
  try{if(typeof PM_ICONS==="object"&&PM_ICONS&&!PM_ICONS.ragf)PM_ICONS.ragf=ICON;}catch(e){}
  var b=pmItem(m,"ragf","Your folders","Answers only from your folders, with sources",function(){setOn(!on());try{paintPlus();}catch(_){}},pmSwitch(on()));
  b.setAttribute("data-rag-item","1");
  var items=[].slice.call(m.querySelectorAll(".pm-item")),first=null;
  items.forEach(function(x){var t=x.querySelector(".pm-txt");if(!t)return;var s=t.textContent||"";
    if(!first&&/^(Research|Web search)/.test(s))first=x;
    if(/^(Web search|Research)/.test(s)&&!x.__r257){x.__r257=1;var f=x.onclick;x.onclick=function(e){if(f)f.call(this,e);
      if((state.webSearch||state.research)&&on()){try{state.rag.on=false;saveState();paintChips();paintPlus();}catch(_){}toast("Your folders are off while the web is used.");}};}});
  /* first of the ways of looking things up: Your folders, then Research, Web search and its scholarly sources */
  if(first&&first!==b)m.insertBefore(b,first);}
function chip(){var box=$("chatChips");if(!box||!usable()||box.querySelector(".rag-chip"))return;
  var cn=cloudName(),c=mk("span","cchip acc rag-chip");
  c.title="Each reply comes only from the folders you added in Settings (Models and AI, Folders for the chat), with its sources. Nothing is looked up on the web meanwhile."+(cn?" This conversation uses "+cn+": the passages found go there with your question.":" The passages found stay on this computer.");
  c.appendChild(mk("span","nm","📂 Your folders"));
  var x=mk("button","cx","✕");x.type="button";x.title="Stop answering from your folders";x.setAttribute("aria-label","Stop answering from your folders");
  x.onclick=function(e){e.stopPropagation();setOn(false);try{paintPlus();}catch(_){}};c.appendChild(x);
  box.insertBefore(c,box.firstChild);}

/* ---------------------------------------------------------------- 2. a turn */
function decide(rec){if(!rec||rec.role!=="me")return;
  if(!usable()){delete rec.ragAsk;delete rec.ragSkip;return;}
  if(rec.cid||(rec.files&&rec.files.length)){rec.ragAsk=false;rec.ragSkip="attach";return;}
  if(!String(rec.text||"").trim())return;
  rec.ragAsk=true;delete rec.ragSkip;delete rec.web;delete rec.webs;}
function budget(){try{return chatBudget();}catch(e){return 0;}}
function slim(p){return {id:p.id,fid:p.folderId,folder:p.folderName||"",file:p.filePath||"",chunk:p.chunkIndex,heading:p.headingPath||"",page:p.page==null?null:p.page,
  start:p.charStart,end:p.charEnd,text:String(p.text||""),score:Math.round((+p.score||0)*1e5)/1e5};}
function whyNone(r,bot){return Promise.resolve().then(function(){return r.folders();}).then(function(fs){var n=0;(fs||[]).forEach(function(f){n+=(+f.passages||0);});
    if(!fs||!fs.length)bot.rag.why="none";else if(!n)bot.rag.why="unread";},function(){});}
function prepareWrap(o){return function(rec,bot){var self=this,args=arguments;
  if(!rec||!bot||rec.ragAsk!==true||bot.__ragPrep){
    if(rec&&bot&&rec.ragSkip==="attach"&&!bot.note)bot.note="Answered without your folders: this message carried a file or a picture, and the folder search reads only your words.";
    return o.apply(self,args);}
  try{Object.defineProperty(bot,"__ragPrep",{value:1,enumerable:false,configurable:true});}catch(e){}
  var r=R(),q=String(rec.text||"").trim();
  if(!r){bot.note="The folder search is not open here, so this reply did not use your folders.";return o.apply(self,args);}
  bot.status="Looking in your folders…";try{renderChatLive(bot);}catch(e){}
  return Promise.resolve(o.apply(self,args)).then(function(){
    if(!bot.live)return null;
    return r.retrieve(q,USER,{k:5}).then(function(res){
      if(!bot.live)return null;
      var g=r.prompt.ground(res,q,budget());
      bot.rag={v:1,q:q,at:Date.now(),found:res.passages.length,given:g.passages.length,dropped:g.dropped,ms:Math.round(res.ms||0),passages:g.passages.map(slim)};
      if(res.reason)bot.rag.reason=res.reason;
      if(g.notFound){bot.status="";bot.text=NOT_FOUND;bot.rag.notFound=true;bot.rag.called=false;delete bot.live;return whyNone(r,bot).then(function(){return null;});}
      bot.rag.called=true;bot.status="";try{renderChatLive(bot);}catch(e){}
      return null;},
    function(e){if(!bot.live)return null;bot.status="";bot.rag={v:1,q:q,at:Date.now(),error:plain(e),called:false};
      bot.text="The folder search could not run: "+plain(e)+" Nothing was sent to the model.";delete bot.live;return null;});});};}
function historyWrap(o){return function(){var b=null;try{b=liveBot;}catch(e){b=null;}
  if(b&&b.live&&b.rag&&b.rag.called&&b.rag.passages&&b.rag.passages.length){var r=R();
    if(r){var msgs=[{role:"system",content:r.prompt.systemPrompt(b.rag.passages,b.rag.q)},{role:"user",content:b.rag.q}];
      /* the working loop (r190) runs only on a conversation it marks; this one may not be marked */
      try{Object.defineProperty(msgs,"__ingChat",{value:false,enumerable:false,configurable:false,writable:false});}catch(e){}
      return msgs;}}
  return o.apply(this,arguments);};}
function contextWrap(o){return function(bot){var t=o.apply(this,arguments);
  try{if(bot&&bot.rag&&bot.rag.passages)t+="\n"+bot.rag.passages.map(function(p){return p.folder+"/"+p.file+(p.page!=null?" page "+p.page+" p. "+p.page:"")+"\n"+p.text;}).join("\n");}catch(e){}
  return t;};}

/* ---------------------------------------------------------------- 3. the reply */
function finish(m){var g=m.rag;g.done=1;if(g.error||g.called===false)return;
  var r=R(),P=r&&r.prompt,t=String(m.text||"");if(!P||!t.trim())return;
  if(P.isNotFound(t)){m.text=NOT_FOUND;g.notFound=true;return;}
  var c=P.checkGrounded(t,(g.passages||[]).length);g.ok=c.ok;g.flagged=c.flagged.slice(0,12);g.badRefs=c.badRefs;g.cited=c.cited;}
function finishAll(){var ch=false;try{curMsgs().forEach(function(m){if(m&&m.role==="bot"&&m.rag&&!m.live&&!m.rag.done){finish(m);ch=true;}});}catch(e){}
  if(ch){try{saveState();}catch(e){}}}
function pathOf(p){return (p.folder?p.folder+"/":"")+(p.file||"");}
function where(p){var w=[];if(p.heading)w.push(p.heading);if(p.page!=null)w.push("page "+p.page);return w.join(" · ");}
function citeLink(n,mm,label){var a=mk("a","rag-cite",label);a.href="#";a.setAttribute("data-rag-n",String(n));
  var p=mm.rag.passages[n-1];a.title="Source "+n+": "+pathOf(p)+(where(p)?" · "+where(p):"")+". Opens the passage in its file.";
  a.onclick=function(e){e.preventDefault();e.stopPropagation();view(mm,n-1,a);};return a;}
var MARK=/\[(\d{1,3}(?:\s*[,;–-]\s*\d{1,3})*)\](?!\()/g;
function linkify(md,mm){if(md.querySelector("a.rag-cite"))return;var count=mm.rag.passages.length,nodes=[];
  var tw=D.createTreeWalker(md,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode;while(p&&p!==md){if(/^(CODE|PRE|A|KBD|SCRIPT|STYLE)$/.test(p.nodeName))return NodeFilter.FILTER_REJECT;p=p.parentNode;}
    return /\[\d/.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;}});
  while(tw.nextNode())nodes.push(tw.currentNode);
  nodes.forEach(function(tn){var s=tn.nodeValue,last=0,frag=D.createDocumentFragment(),m,any=false;MARK.lastIndex=0;
    while((m=MARK.exec(s))){var parts=m[1].split(/(\s*[,;–-]\s*)/),okAll=parts.every(function(x,i){return i%2===1||(+x>=1&&+x<=count);});
      if(!okAll)continue;any=true;frag.appendChild(D.createTextNode(s.slice(last,m.index)));
      if(parts.length===1)frag.appendChild(citeLink(+parts[0],mm,"["+parts[0]+"]"));
      else{frag.appendChild(D.createTextNode("["));parts.forEach(function(x,i){if(i%2===1)frag.appendChild(D.createTextNode(x));else frag.appendChild(citeLink(+x,mm,x));});frag.appendChild(D.createTextNode("]"));}
      last=m.index+m[0].length;}
    if(!any)return;frag.appendChild(D.createTextNode(s.slice(last)));tn.parentNode.replaceChild(frag,tn);});}
function beforeActs(d,n){var a=d.querySelector(":scope > .msg-acts");if(a)d.insertBefore(n,a);else d.appendChild(n);}
function paint(d,mm){
  if(mm.role==="me"){if(mm.ragAsk===true&&!d.querySelector(":scope > .rag-tag")){var tg=mk("span","web-tag rag-tag","📂 your folders");d.insertBefore(tg,d.firstChild);}return;}
  if(mm.role!=="bot"||!mm.rag||mm.live)return;
  var g=mm.rag,ps=g.passages||[];
  [].slice.call(d.querySelectorAll(":scope > .rag-sources, :scope > .rag-note, :scope > .rag-flag")).forEach(function(x){x.remove();});
  var md=d.querySelector(":scope > .md");if(md&&ps.length)linkify(md,mm);
  if(ps.length){var so=mk("div","msg-sources rag-sources");so.appendChild(mk("b",null,g.notFound?"Looked at in your folders":"From your folders"));var ol=mk("ol");
    ps.forEach(function(p,i){var li=mk("li"),a=mk("a",null,pathOf(p));a.href="#";a.setAttribute("data-rag-n",String(i+1));a.title="Open this passage in its file";
      a.onclick=function(e){e.preventDefault();view(mm,i,a);};li.appendChild(a);var w=where(p);if(w)li.appendChild(mk("span","rag-where"," · "+w));ol.appendChild(li);});
    so.appendChild(ol);beforeActs(d,so);}
  var notes=[];
  if(g.notFound&&!g.called){if(g.why==="none")notes.push("No folder has been added to the folder search yet: Settings, Models and AI, Folders for the chat.");
    else if(g.why==="unread")notes.push("Your folders have not been read yet: Settings, Models and AI, Folders for the chat, Read it now.");
    else notes.push("Nothing in your folders matched, so no model was asked.");}
  if(g.dropped>0)notes.push("The model's memory took "+g.given+" of the "+g.found+" passages found; the others were left out.");
  notes.forEach(function(t){beforeActs(d,mk("span","rag-note",t));});
  if(!g.notFound&&g.done&&((g.flagged&&g.flagged.length)||(g.badRefs&&g.badRefs.length))){var f=mk("div","msg-unchecked rag-flag");f.setAttribute("role","note");f.appendChild(mk("span","mu-mark","!"));
    var body=mk("span");var nf=(g.flagged||[]).length;
    body.appendChild(D.createTextNode((nf?("Check "+(nf===1?"this sentence":"these "+nf+" sentences")+": "+(nf===1?"it names":"they name")+" no passage of your folders."):"")+((g.badRefs||[]).length?(nf?" ":"")+"The reply cites "+g.badRefs.map(function(n){return "["+n+"]";}).join(", ")+", which "+(g.badRefs.length===1?"is":"are")+" not among the passages it was given.":"")));
    if(nf){var ul=mk("ul");g.flagged.forEach(function(s){ul.appendChild(mk("li",null,"“"+(s.length>220?s.slice(0,218)+"…":s)+"”"));});body.appendChild(ul);}
    f.appendChild(body);beforeActs(d,f);}}

/* ---------------------------------------------------------------- 4. the viewer */
var opener=null;
function fileName(p){var f=String(p.file||"");return f.split("/").pop()||f;}
function view(mm,i,from){var ps=(mm.rag&&mm.rag.passages)||[],p=ps[i],box=$("modalBox");if(!p||!box)return;opener=from||D.activeElement;
  box.innerHTML="";box.classList.add("rag-view");
  var wrap=mk("div","rag-viewer");wrap.setAttribute("role","document");
  var h=mk("h3",null,"["+(i+1)+"] "+fileName(p));h.id="ragVTitle";wrap.appendChild(h);
  var meta=[p.folder,p.file&&p.file.indexOf("/")>=0?p.file:"",p.heading,p.page!=null?"page "+p.page:"",p.chunk==null?"":"passage "+(p.chunk+1)+" of the file"].filter(Boolean).join(" · ");
  wrap.appendChild(mk("p","small muted rag-vmeta",meta));
  var note=mk("p","small rag-vnote","");note.setAttribute("role","status");note.setAttribute("aria-live","polite");wrap.appendChild(note);
  var read=mk("div","rag-vread");read.appendChild(mk("b",null,"The passage as it was read"));read.appendChild(D.createTextNode(p.text));wrap.appendChild(read);
  var body=mk("div","rag-vtext");body.tabIndex=0;body.setAttribute("role","region");body.setAttribute("aria-label","The file's text, with the passage marked");body.hidden=true;wrap.appendChild(body);
  var acts=mk("div","rag-vacts");
  function key(t,cls,fn){var b=mk("button","btn small"+(cls?" "+cls:""),t);b.type="button";b.onclick=fn;acts.appendChild(b);return b;}
  if(i>0)key("‹ Source "+i,"ghost",function(){view(mm,i-1,opener);});
  if(i<ps.length-1)key("Source "+(i+2)+" ›","ghost",function(){view(mm,i+1,opener);});
  var cl=key("Close","primary",function(){closeModal();});
  wrap.appendChild(acts);box.appendChild(wrap);
  try{openModal();}catch(e){}
  setTimeout(function(){try{cl.focus({preventScroll:true});}catch(_){}},30);
  var r=R();
  if(!r){note.textContent="The file itself is on the computer that read it. This is the passage as it was read.";return;}
  note.textContent="Opening the file…";
  r.openSource({fid:p.fid,file:p.file,page:p.page,start:p.start,end:p.end,text:p.text},USER).then(function(v){
    if(!wrap.isConnected)return;
    var pg=v.ext==="pdf"&&v.page!=null?"Page "+v.page+(v.pages?" of "+v.pages:"")+". ":"";
    if(v.status==="exact"){note.textContent=pg+"The passage is marked in the file.";read.hidden=true;}
    else if(v.status==="moved"){note.textContent=pg+"The file has changed since it was read; the same words were found in a new place and are marked. Reading the folder again brings the search up to date.";read.hidden=true;}
    else note.textContent=pg+"The file has changed since it was read, and these words are not in it any more. Above, the passage as it was read; below, the file as it is now.";
    body.innerHTML="";
    if(v.cutBefore)body.appendChild(mk("span","rag-vcut","… the file goes on above"));
    body.appendChild(D.createTextNode(v.before||""));
    var mark=null;if(v.mark){mark=mk("mark",null,v.mark);body.appendChild(mark);}
    body.appendChild(D.createTextNode(v.after||""));
    if(v.cutAfter)body.appendChild(mk("span","rag-vcut","… the file goes on below"));
    body.hidden=false;
    if(mark){try{body.scrollTop=Math.max(0,mark.offsetTop-body.offsetTop-Math.round(body.clientHeight/3));}catch(_){}}},
  function(e){if(!wrap.isConnected)return;note.textContent="The file could not be opened ("+plain(e)+"). This is the passage as it was read.";});}
/* the shared window goes back to its own width, and the focus to the citation, when the viewer closes */
(function(){var box=$("modalBox"),root=$("modalRoot");if(!box||!root||typeof MutationObserver!=="function")return;
  new MutationObserver(function(){if(!box.querySelector(".rag-viewer"))box.classList.remove("rag-view");}).observe(box,{childList:true});
  new MutationObserver(function(){if(!root.classList.contains("open")&&box.querySelector(".rag-viewer")){box.classList.remove("rag-view");var o=opener;opener=null;box.innerHTML="";
      if(o&&o.isConnected&&o.focus){try{o.focus({preventScroll:true});}catch(_){}}}}).observe(root,{attributes:true,attributeFilter:["class"]});})();

/* ---------------------------------------------------------------- joined to the chat */
function wrap(name,make){var o=W[name];if(typeof o!=="function"||o.__r257)return;var n=keepMarks(make(o),o);n.__r257=1;W[name]=n;}
function hook(){
  wrap("sendRec",function(o){return function(rec){try{decide(rec);}catch(e){}return o.apply(this,arguments);};});
  wrap("chatPrepare",prepareWrap);
  wrap("chatHistory",historyWrap);
  wrap("ingChatContextText",contextWrap);
  wrap("renderChat",function(o){return function(){try{finishAll();}catch(e){}return o.apply(this,arguments);};});
  wrap("fillMsg",function(o){return function(d,mm){var r=o.apply(this,arguments);try{if(d&&mm)paint(d,mm);}catch(e){try{console.warn("Ingenium folders in the chat:",e);}catch(_){}}return r;};});
  wrap("paintPlus",function(o){return function(view){var r=o.apply(this,arguments);try{if(!view&&R()&&!codeChat())plusItem();}catch(e){}return r;};});
  wrap("paintChips",function(o){return function(){var r=o.apply(this,arguments);try{chip();}catch(e){}return r;};});}
hook();
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",hook);
W.addEventListener("load",function(){hook();setTimeout(hook,1600);setTimeout(hook,2400);});
/* the folder search arrives a moment after the page (r202 imports it): the chip shows then */
(function wait(n){if(R()){try{if(on())paintChips();}catch(e){}return;}if(n>0)setTimeout(function(){wait(n-1);},600);})(60);
W.IngRagChat={NOT_FOUND:NOT_FOUND,on:on,usable:usable,setOn:setOn,decide:decide,view:view,finish:finish,
  _as:function(n){USER=n?String(n):"me";return USER;}};
})();
;try{window.__ingParts["p257"]="running";}catch(_){}
</script>
