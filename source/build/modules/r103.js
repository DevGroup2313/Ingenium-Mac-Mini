<style id="r103-css">
/* ============ R103 · THE CHAT'S MISSING PIECES ============ */
/* the time of each conversation, at the end of its row */
.cc-row .r3-when{flex:0 0 auto;font-size:11px;line-height:1;color:var(--ink-3);margin:0 2px 0 4px;font-variant-numeric:tabular-nums;white-space:nowrap}
.cc-row.on .r3-when{color:var(--ink-2)}
/* the way to the earlier part of a long conversation */
.r3-earlier{display:flex;justify-content:center;align-items:center;gap:8px;margin:2px 0 12px;flex-wrap:wrap}
.r3-earlier button{font:600 12.5px var(--sans);color:var(--accent);background:var(--accent-softer,rgba(106,63,181,.08));border:1px solid rgba(var(--accent-line-rgb,106,63,181),.25);border-radius:999px;padding:6px 14px;cursor:pointer}
.r3-earlier button:hover{background:var(--accent-soft,rgba(106,63,181,.14))}
.r3-earlier .r3-span{font-size:11.5px;color:var(--ink-3)}
.r3-old{display:flex;flex-direction:column;gap:inherit}
.r3-old-end{display:flex;align-items:center;gap:10px;margin:4px 0 14px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
.r3-old-end::before,.r3-old-end::after{content:"";flex:1;height:1px;background:rgba(var(--accent-line-rgb,106,63,181),.22)}
#dlMenu.r3-save{min-width:220px}
#dlMenu.r3-save .chat-menu-head{white-space:nowrap}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p35"]="started";}catch(_){}
/* ============ R103 · THE CHAT'S MISSING PIECES ============
   Checked against what a chat page needs (Claude's and ChatGPT's as the measure) with the chat open in the computer app's
   engine and through every connection:
   - Saving. "Save the conversation as a file" and four other keys (the backup, the page with its engine) handed a
     made-up download to the window. The Fire and Android app has no download machinery, so nothing happened there, and
     a computer build without download support could close. Every such file now goes through the app's own Save (the
     Save dialog on a computer, the tablet's own on the Fire), as the rest of Ingenium's files already did.
   - A conversation saves as a document: Word, PDF, Markdown or plain text, each message under its author and the time
     it was written, with the model that answered. From ⋯ in the chat, or from ⋯ on any conversation in the list.
   - The list of conversations shows when each was last written in (the time today and yesterday, the day this week,
     the date before that), as each message already shows its own.
   - A long conversation keeps all of itself. After 80 messages the oldest were deleted, without a word, on every
     message sent. Now, past 100, the oldest 40 are put away on the device with the conversation's other large parts,
     and "Show the earlier messages" at the top brings them back to read and to save. What the model is sent is
     unchanged: the newest part of the conversation, as before.
   - Each reply keeps the name of the model that wrote it, for the saved document. */
var R3={keep:100,move:40};
/* ---------- files go through the app's own Save ---------- */
function r3Shell(){try{return (window.IngeniumNative&&typeof window.IngeniumNative.saveFile==="function")||(typeof INB!=="undefined"&&INB&&INB.platform==="apple")||
  (window.pywebview&&window.pywebview.api&&typeof window.pywebview.api.save_file==="function");}catch(e){return false;}}
function r3SaveLink(a){var h=String(a.href||""),name=a.getAttribute("download")||"download";
  return fetch(h).then(function(r){return r.blob();}).then(function(b){return saveFileNative(name,b.type||"application/octet-stream",b);});}
(function r3Downloads(){var oc=HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click=function(){var a=this;
    if(a.hasAttribute("download")&&/^(blob:|data:)/i.test(String(a.href||""))&&r3Shell()){r3SaveLink(a).catch(function(){try{oc.call(a);}catch(e){}});return;}
    return oc.apply(this,arguments);};
  document.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("a[download]");
    if(!a||!/^(blob:|data:)/i.test(String(a.href||""))||!r3Shell())return;e.preventDefault();r3SaveLink(a).catch(function(){});},true);})();

/* ---------- who answered ---------- */
function r3Who(){try{if(chatSource()==="cloud"&&state.cloud&&state.cloud.on&&state.cloud.provider)return state.cloud.model||state.cloud.provider;
  var m=state.models.filter(function(x){return x.id===state.activeModelId;})[0];return m?(m.customName||""):"";}catch(e){return "";}}
(function r3HookMsg(){var o=fillMsg;fillMsg=function(d,mm,keep){try{if(mm&&mm.role==="bot"&&mm.live&&!mm.by&&!mm.preview){var w=r3Who();if(w)mm.by=w;}}catch(e){}
  return o.apply(this,arguments);};window.fillMsg=fillMsg;})();

/* ---------- the time of each conversation in the list ---------- */
function r3When(t){var d=new Date(t),now=new Date(),d0=new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
  try{if(t>=d0-864e5)return d.toLocaleTimeString(undefined,{hour:"2-digit",minute:"2-digit"});
    if(t>=d0-6*864e5)return d.toLocaleDateString(undefined,{weekday:"short"});
    var o={day:"numeric",month:"short"};if(d.getFullYear()!==now.getFullYear())o.year="numeric";return d.toLocaleDateString(undefined,o);}
  catch(e){return d.toDateString();}}
(function r3HookRow(){if(typeof ccRow!=="function")return;var o=ccRow;
  ccRow=function(c){var r=o.apply(this,arguments);try{var t=ccWhen(c);if(t>1e12){var s=el("time","r3-when",r3When(t));
      try{s.setAttribute("datetime",new Date(t).toISOString());}catch(e){}s.title="Last written in "+cpTime(t,true);
      r.insertBefore(s,r.querySelector(".cc-more"));}}catch(e){}return r;};window.ccRow=ccRow;})();

/* ---------- a long conversation keeps all of itself ---------- */
function r3Refs(raw){var keep={},re=/"(big_[a-z0-9]{7,})"/g,m;while((m=re.exec(raw)))keep[m[1]]=1;return Object.keys(keep);}
trimChat=function(){var c=curChat(),ms=c.messages;if(ms.length<=R3.keep)return;
  var n=ms.length-(R3.keep-R3.move),out=[];
  for(var i=0;i<n;i++){if(ms[i].live)break;out.push(ms[i]);}
  if(!out.length)return;ms.splice(0,out.length);
  var raw="[]";try{raw=JSON.stringify(out,typeof deskReplacer==="function"?deskReplacer:null);}catch(e){}
  var id=IngBig.newId();IngBig.put(id,raw);
  var ts=out.map(function(x){return x.at||x.done||0;}).filter(Boolean);
  (c.earlier=c.earlier||[]).push({ref:id,n:out.length,from:ts.length?Math.min.apply(null,ts):0,to:ts.length?Math.max.apply(null,ts):0,keep:r3Refs(raw)});
  r3SetOld(c,null);};
window.trimChat=trimChat;
function r3OldCount(c){return (c.earlier||[]).reduce(function(a,x){return a+(x.n||0);},0);}
function r3SetOld(c,v){try{Object.defineProperty(c,"__old",{value:v,enumerable:false,writable:true,configurable:true});}catch(e){}}
function r3LoadOld(c){if(c.__old)return Promise.resolve(c.__old);
  return Promise.all((c.earlier||[]).map(function(x){return IngBig.load(x.ref).then(function(t){try{return JSON.parse(t||"[]");}catch(e){return [];}});}))
    .then(function(parts){var all=[];parts.forEach(function(p){all=all.concat(p||[]);});r3SetOld(c,all);return all;});}
(function r3HookRender(){var o=renderChat;
  renderChat=function(){var r=o.apply(this,arguments);try{r3PaintOld();}catch(e){}return r;};window.renderChat=renderChat;})();
function r3PaintOld(){var sc=$("chatScroll"),c=curChat();if(!sc)return;var n=r3OldCount(c);if(!n)return;
  var bar=el("div","r3-earlier"),open=!!c.__oldShown;
  var b=el("button",null,open?"Hide the earlier messages":"Show the "+n.toLocaleString()+" earlier message"+(n===1?"":"s"));b.type="button";bar.appendChild(b);
  var e0=(c.earlier[0]||{}).from;if(e0&&!open)bar.appendChild(el("span","r3-span","from "+cpTime(e0,true)));
  sc.insertBefore(bar,sc.firstChild);
  b.onclick=function(){if(open){r3Shown(c,false);renderChat();return;}
    b.disabled=true;b.textContent="Bringing them back…";
    r3LoadOld(c).then(function(){r3Shown(c,true);var top=sc.scrollHeight-sc.scrollTop;renderChat();sc.scrollTop=sc.scrollHeight-top;},
      function(){b.disabled=false;b.textContent="They could not be read on this device";});};
  if(open&&c.__old){var box=el("div","r3-old");c.__old.forEach(function(mm){try{box.appendChild(msgNode(mm));}catch(e){}});
    box.appendChild(el("div","r3-old-end","The conversation continues"));sc.insertBefore(box,bar.nextSibling);}}
function r3Shown(c,v){try{Object.defineProperty(c,"__oldShown",{value:v,enumerable:false,writable:true,configurable:true});}catch(e){}}

/* ---------- a conversation saved as a document ---------- */
function r3FileName(c){return String(chatTitle(c)||"Conversation").replace(/[\\\/:*?"<>|]+/g," ").replace(/\s+/g," ").trim().slice(0,80)||"Conversation";}
function r3Md(c,old){var all=(old||[]).concat(c.messages||[]).filter(function(x){return x&&!x.preview&&!x.live&&(x.text||x.files||x.img);});
  var ts=all.map(function(x){return x.at||x.done||0;}).filter(Boolean),L=["# "+chatTitle(c),""];
  var sub=all.length+" message"+(all.length===1?"":"s");
  if(ts.length)sub+=", "+cpTime(Math.min.apply(null,ts),true)+(ts.length>1?" to "+cpTime(Math.max.apply(null,ts),true):"");
  L.push("*"+sub+". Saved from Ingenium.*","");
  all.forEach(function(x){var t=x.role==="me"?x.at:(x.done||x.at),who=x.role==="me"?"You":(x.by||"Ingenium");
    L.push("### "+who+(t?" · "+cpTime(t,true):""),"");
    if(x.files&&x.files.length)L.push("*Attached: "+x.files.map(function(f){return f.name;}).join(", ")+"*","");
    if(x.img)L.push("*A picture was attached.*","");
    var body=String(x.text||"").replace(/^(#{1,3})\s/gm,"#### ").trim();if(body)L.push(body,"");});
  return L.join("\n");}
function r3Save(c,fmt){return r3LoadOld(c).catch(function(){return [];}).then(function(old){
  var md=r3Md(c,old),title=r3FileName(c),doc={title:title,md:md};
  if(fmt==="docx")return mkSaveWord(doc);
  if(fmt==="pdf")return mkSavePdf(doc);
  if(fmt==="md")return saveFileNative(title+".md","text/markdown",md);
  var txt=md.replace(/^#{1,6}\s+/gm,"").replace(/^\*(.*)\*$/gm,"$1").replace(/\*\*(.+?)\*\*/g,"$1");
  return saveFileNative(title+".txt","text/plain",txt);});}
function r3SaveMenu(anchor,c){try{closeChatMenus();}catch(e){}var old=$("dlMenu");if(old)old.remove();
  var m=el("div","chat-menu r3-save");m.id="dlMenu";m.appendChild(el("div","chat-menu-head","Save the conversation as"));
  [["Word document (.docx)","docx"],["PDF","pdf"],["Markdown (.md)","md"],["Plain text (.txt)","txt"]].forEach(function(o){
    var b=el("button","menu-btn",o[0]);b.type="button";b.onclick=function(ev){ev.stopPropagation();m.remove();
      r3Save(c,o[1]).catch(function(e){try{ingToast("It could not be saved: "+(e&&e.message||e));}catch(_){}});};m.appendChild(b);});
  document.body.appendChild(m);var r=anchor.getBoundingClientRect(),w=m.offsetWidth||230,h=m.offsetHeight||170;
  m.style.position="fixed";m.style.left=Math.max(8,Math.min(r.right-w,(window.innerWidth||360)-w-8))+"px";
  m.style.top=(r.bottom+h+8<(window.innerHeight||600)?r.bottom+4:Math.max(8,r.top-h-4))+"px";m.hidden=false;
  setTimeout(function(){document.addEventListener("pointerdown",function f(ev){if(!m.contains(ev.target)){m.remove();document.removeEventListener("pointerdown",f,true);}},true);},0);}
(function r3Keys(){var dl=$("chatDl");if(dl){dl.textContent="Save the conversation as a document";
    dl.onclick=function(){var a=$("chatMoreBtn")||dl;r3SaveMenu(a,curChat());};}
  if(typeof ccRowMenu==="function"){var o=ccRowMenu;ccRowMenu=function(c,anchor){var r=o.apply(this,arguments);
      try{var m=$("ccMenu");if(m){var del=m.querySelector(".danger");var b=el("button","menu-btn","Save as a document");b.type="button";
        b.onclick=function(){m.remove();r3SaveMenu(anchor,c);};m.insertBefore(b,del||null);}}catch(e){}return r;};window.ccRowMenu=ccRowMenu;}})();
window.IngR103={md:r3Md,save:r3Save,loadOld:r3LoadOld,when:r3When,keep:R3};
;try{window.__ingParts["p35"]="running";}catch(_){}
</script>
