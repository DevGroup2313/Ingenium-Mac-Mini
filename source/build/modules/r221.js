<style id="r221-css">
/* ============ R221 · CODE, CLOSER STILL: POINTING AT FILES WITH @, EACH SESSION'S STATE, LINKS UNDER A REPLY (Ingenium 6.14, 4 November 2026) ============
   Her words (4 November 2026): "I still want full parity with Claude's Code chat, right now its close but not quite there. I want you
   to close that gap and give me full parity ... and so much more."
   - @ in the message box, in a Code session or a chat with files, lists the app's files as she types (as Claude's sessions do);
     Enter, Tab or a press puts @path in the message, and the model is told, for that message, to read the files she pointed at
     before it answers.
   - The list of a Code app's sessions says each one's state: working (a reply being written), waits for you (a change to review),
     and its pull request (open, merged or closed) when the app is a GitHub repository.
   - A step under a reply that pushed a commit or opened a pull request carries its link. */
.atm-menu{position:fixed;z-index:660;min-width:260px;max-width:min(460px,calc(100vw - 20px));max-height:min(320px,50vh);overflow:auto;padding:6px;border-radius:12px;background:var(--surface,#fff);border:1px solid var(--hairline,rgba(34,26,46,.12));box-shadow:0 2px 0 rgba(40,22,68,.08),0 12px 30px rgba(40,22,68,.18)}
.atm-menu[hidden]{display:none}
.atm-h{padding:4px 10px 4px;font:700 11px/1.2 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
.atm-opt{display:flex;gap:10px;align-items:baseline;width:100%;text-align:left;border:0;background:transparent;border-radius:9px;padding:6px 10px;cursor:pointer;color:var(--ink-1);font:600 12.5px/1.35 var(--mono,ui-monospace,monospace)}
.atm-opt small{font:400 11.5px/1.3 var(--sans);color:var(--ink-3);margin-left:auto;white-space:nowrap}
.atm-opt[aria-selected="true"],.atm-opt:hover{background:var(--accent-softer,rgba(106,63,181,.08))}
.cc-row .cc-st{flex:0 0 auto;align-self:center;font:600 10.5px/1 var(--sans);padding:3px 7px;border-radius:999px;margin:0 4px;background:var(--accent-soft,rgba(106,63,181,.10));color:var(--ink-2);white-space:nowrap}
.cc-row .cc-st.work{background:rgba(47,94,160,.12);color:#2f5ea0}.cc-row .cc-st.you{background:rgba(184,116,46,.15);color:#8a5a1a}
.cc-row .cc-st.ok{background:rgba(47,122,85,.14);color:#2f7a55}.cc-row .cc-st.bad{background:rgba(180,72,60,.12);color:#b4483c}
body[data-theme="night"] .cc-row .cc-st.work{color:#9cc0f0}body[data-theme="night"] .cc-row .cc-st.you{color:#f0c27a}body[data-theme="night"] .cc-row .cc-st.ok{color:#8fd0a9}body[data-theme="night"] .cc-row .cc-st.bad{color:#f0a097}
.ag-steps li a.stp-link{margin-left:6px;color:var(--accent,#6a3fb5);font-weight:600;text-decoration:underline;text-underline-offset:2px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p221"]="started";}catch(_){}
/* R221 · Code, closer still: see the note at the top of its styles. window.IngAtMention: files(), mentioned(text), paintStates() */
(function r221(){"use strict";
if(window.IngAtMention)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function cur(){try{return curChat();}catch(e){return null;}}
function isCode(c){try{return ccIsCode(c);}catch(e){return false;}}

/* ================= 1. @: the files of the app, or of the conversation ================= */
function files(){var c=cur();if(!c)return [];
  if(isCode(c)){var pr=null;try{pr=ccProj();}catch(e){}return pr?(pr.files||[]).map(function(f){return {name:f.name,size:f.size||0};}):[];}
  try{return (edChatFiles()||[]).map(function(n){return {name:typeof n==="string"?n:(n&&n.name)||"",size:0};}).filter(function(x){return x.name;});}catch(e){return [];}}
function size(n){try{return fmtBytes(n);}catch(e){return n?n+" B":"";}}
var menu=null,sel=0,hits=[],at=null;
function q(){var inp=$("chatInput");if(!inp)return null;var v=inp.value,p=inp.selectionStart==null?v.length:inp.selectionStart,before=v.slice(0,p),m=/(^|\s)@([^\s@]{0,80})$/.exec(before);
  return m?{start:p-m[2].length-1,end:p,word:m[2]}:null;}
function score(name,w){var n=name.toLowerCase(),x=w.toLowerCase();if(!x)return 1;var base=n.split("/").pop();if(base.indexOf(x)===0)return 4;if(base.indexOf(x)>=0)return 3;if(n.indexOf(x)>=0)return 2;
  var i=0;for(var k=0;k<n.length&&i<x.length;k++)if(n[k]===x[i])i++;return i===x.length?1:0;}
function paint(){var inp=$("chatInput");at=q();var L=at?files():[];
  hits=at?L.map(function(f){return {f:f,s:score(f.name,at.word)};}).filter(function(x){return x.s>0;}).sort(function(a,b){return b.s-a.s||a.f.name.length-b.f.name.length;}).slice(0,12):[];
  if(!at||!hits.length){if(menu)menu.hidden=true;return;}
  if(!menu){menu=mk("div","atm-menu");menu.id="atmMenu";menu.setAttribute("role","listbox");menu.setAttribute("aria-label","Files to point at");menu.hidden=true;D.body.appendChild(menu);}
  if(sel>=hits.length)sel=0;menu.innerHTML="";menu.appendChild(mk("div","atm-h","Point the model at a file"));
  hits.forEach(function(h,i){var b=mk("button","atm-opt");b.type="button";b.setAttribute("role","option");b.setAttribute("aria-selected",String(i===sel));b.appendChild(D.createTextNode(h.f.name));if(h.f.size)b.appendChild(mk("small",null,size(h.f.size)));
    b.onmousedown=function(e){e.preventDefault();choose(i);};menu.appendChild(b);});
  menu.hidden=false;try{var r=inp.getBoundingClientRect(),hh=menu.offsetHeight||200;menu.style.left=Math.round(Math.max(8,Math.min(r.left,innerWidth-(menu.offsetWidth||300)-8)))+"px";menu.style.top=Math.round(Math.max(8,r.top-hh-8))+"px";}catch(e){}}
function choose(i){var inp=$("chatInput"),h=hits[i];if(!inp||!h||!at)return;var v=inp.value,ins="@"+h.f.name+" ";inp.value=v.slice(0,at.start)+ins+v.slice(at.end);var p=at.start+ins.length;
  try{inp.setSelectionRange(p,p);}catch(e){}if(menu)menu.hidden=true;at=null;try{inp.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}try{inp.focus();}catch(e){}}
D.addEventListener("keydown",function(e){var inp=$("chatInput");if(!inp||e.target!==inp||!menu||menu.hidden||!hits.length)return;
  if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();e.stopImmediatePropagation();sel=(sel+(e.key==="ArrowDown"?1:hits.length-1))%hits.length;paint();}
  else if(e.key==="Enter"||e.key==="Tab"){e.preventDefault();e.stopImmediatePropagation();choose(sel);}
  else if(e.key==="Escape"){e.preventDefault();e.stopImmediatePropagation();menu.hidden=true;}},true);
D.addEventListener("input",function(e){if(e.target&&e.target.id==="chatInput"){sel=0;paint();}},true);
D.addEventListener("click",function(e){if(menu&&!menu.hidden&&!(e.target.closest&&e.target.closest("#atmMenu")))menu.hidden=true;},true);
/* the files she pointed at in her newest message, as the app names them */
function mentioned(text){var L=files(),out=[];String(text||"").replace(/(^|\s)@([^\s@]{1,200})/g,function(all,sp,w){var n=w.replace(/[.,;:!?)]+$/,"");var f=L.filter(function(x){return x.name===n;})[0]||L.filter(function(x){return x.name.split("/").pop()===n;})[0];
    if(f&&out.indexOf(f.name)<0)out.push(f.name);return all;});return out;}
(function wrapSys(){var o=W.chatSystemPrompt;if(typeof o!=="function")return;W.chatSystemPrompt=chatSystemPrompt=function(){var s=o.apply(this,arguments);try{var c=cur(),ms=(c&&c.messages)||[],u=null;
    for(var i=ms.length-1;i>=0;i--)if(ms[i].role==="me"){u=ms[i];break;}var L=u?mentioned(u.text):[];if(!L.length)return s;
    var t="In her newest message she points at "+(L.length===1?"this file":"these files")+" with @: "+L.join(", ")+". Read "+(L.length===1?"it":"them")+" (with the read tool) before you answer or change anything.";
    return s?s+"\n\n"+t:t;}catch(e){return s;}};})();

/* ================= 2. each session's state, in the Code list ================= */
function stateOf(c){var ms=(c&&c.messages)||[],last=ms[ms.length-1];
  try{if(W.liveBot&&ms.indexOf(W.liveBot)>=0){var b=W.liveBot;if(b.ask&&!b.ask.done)return {t:"waits for you",k:"you",why:"A change waits for your review"};return {t:"working",k:"work",why:"A reply is being written"};}}catch(e){}
  try{var pr=(state.projects||[]).filter(function(p){return p.id===c.projectId;})[0],G=pr&&pr.gh;if(G&&G.pr){var st=G.pr.state;return {t:"PR #"+G.pr.number+(st==="merged"?" merged":st==="closed"?" closed":""),k:st==="merged"?"ok":st==="closed"?"bad":"",why:"Pull request #"+G.pr.number+" on GitHub is "+st};}}catch(e){}
  return null;}
(function wrapRow(){var o=W.ccRow;if(typeof o!=="function")return;W.ccRow=ccRow=function(c){var r=o.apply(this,arguments);try{if(isCode(c)){var s=stateOf(c);if(s&&r){var b=mk("span","cc-st"+(s.k?" "+s.k:""),s.t);b.title=s.why;b.setAttribute("aria-label",s.why);
      var more=r.querySelector(".cc-more");if(more)r.insertBefore(b,more);else r.appendChild(b);}}}catch(e){}return r;};})();
var lastSig="";
function paintStates(){try{if(!(W.CC&&CC.mode==="code"))return;var c=cur(),sig=[(W.liveBot?1:0),(W.liveBot&&W.liveBot.ask&&!W.liveBot.ask.done)?1:0,c&&c.id].join("|");
    (state.projects||[]).forEach(function(p){if(p.gh&&p.gh.pr)sig+="|"+p.id+":"+p.gh.pr.state;});if(sig===lastSig)return;lastSig=sig;ccPaintSide();}catch(e){}}
setInterval(function(){if(!D.hidden)paintStates();},1200);

/* ================= 3. a step that pushed or opened a pull request carries its link ================= */
/* the working loop draws its steps after the rest of the reply (modules/r190.js wraps fillMsg when the page has loaded, outside this
   one), so the links are added just after the reply is drawn */
function links(d,mm){try{if(!(mm&&mm.role==="bot"&&mm.steps&&mm.steps.some(function(s){return s&&s.url;})))return;
    var lis=d.querySelectorAll(".ag-steps li");mm.steps.forEach(function(s,i){var li=lis[i];if(!li||!s||!s.url||li.querySelector("a.stp-link"))return;if(!/^https:\/\/github\.com\//.test(s.url))return;
      var a=mk("a","stp-link",s.linkText||"open on GitHub");a.href=s.url;a.target="_blank";a.rel="noopener noreferrer";li.appendChild(a);});}catch(e){}}
(function wrapFill(){var o=W.fillMsg;if(typeof o!=="function")return;var n=function(d,mm){var r=o.apply(this,arguments);if(mm&&mm.steps&&mm.steps.length)Promise.resolve().then(function(){links(d,mm);});return r;};
  try{Object.keys(o).forEach(function(k){if(n[k]===undefined)n[k]=o[k];});}catch(e){}n.__r221=1;W.fillMsg=fillMsg=n;})();

W.IngAtMention={files:files,mentioned:mentioned,paintStates:paintStates,stateOf:stateOf,paint:paint};
})();
;try{window.__ingParts["p221"]="running";}catch(_){}
</script>
