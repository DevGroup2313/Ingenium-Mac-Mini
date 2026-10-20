<style id="r137-css">
/* ============ R137 · INGENIUM 6.0: THE WHOLE WINDOW, THE APPS FOLDED AWAY, EVERY DIVIDER IN SIGHT ============
   The owner's words (20 October 2026): "There is also a resising issue for Ingenium on the Mac mini, it does not expand and
   stays lock in this compact view ... I have big curved screen desktop display"; "I also want the apps section (Tabula,
   Abacus, Imago, Scriba and Fontes) to be collapsible from view the same way it is on the Forge's navigation bar"; "I want
   to be able to resize the panels in the same way ... for the Lector and Fabrica pages as well. I just want the option to
   resize every section to my liking inside of the app."
   Measured at 3440 by 1440 (a curved desktop display): every page stood in a column of 1,680 pixels (Chat 1,440) with some
   900 pixels empty on each side. Now each page takes the window's whole width; Display can centre it again. The dividers
   (Chat and Code beside the stage, Lector's three panels, Fabrica's three, Build's two) were there, as faint hairlines:
   each is now a raised grip that grows under the pointer. */
html body:not(.ing-centred) .main > .section{max-width:none}
html body:not(.ing-centred):not(.cs-on) .main > #page-chat,html body:not(.ing-centred).cs-on[data-csview="float"] .main > #page-chat{max-width:none}
html body:not(.ing-centred) .shell{max-width:none}
/* a long line of text still reads at a comfortable measure, wherever the page is wide */
html body:not(.ing-centred) .main > .section > .lede{max-width:96ch}

/* the Apps group in the side rail folds away, as in the Forge ("APPS ▾") */
.dock .grp-label.ing-fold{display:flex;align-items:center;gap:6px;cursor:pointer;-webkit-user-select:none;user-select:none;border-radius:8px;transition:color .2s,background .2s}
.dock .grp-label.ing-fold:hover{color:var(--accent,#6a3fb5)}
.dock .grp-label.ing-fold:focus-visible{outline:2px solid var(--accent,#6a3fb5);outline-offset:2px}
.dock .grp-label.ing-fold .chev{display:inline-block;font-size:10px;transition:transform .3s cubic-bezier(.34,1.35,.64,1)}
.dock.apps-folded .grp-label.ing-fold .chev{transform:rotate(-90deg)}
.dock .nav-btn.ing-folded{display:none !important}
.dock .nav-btn.ing-unfold{animation:ingUnfold .32s cubic-bezier(.34,1.35,.64,1) backwards}
@keyframes ingUnfold{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}

/* every divider, a grip in sight */
#csHandle::before,#buildHandle::before{content:"";position:absolute;left:50%;top:50%;width:5px;height:46px;margin:-23px 0 0 -2.5px;border-radius:999px;background:rgba(106,63,181,.28);box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 1px 0 rgba(40,22,68,.18);transition:height .25s cubic-bezier(.34,1.35,.64,1),margin .25s cubic-bezier(.34,1.35,.64,1),background .2s}
#csHandle,#buildHandle{position:relative}
#csHandle:hover::before,#buildHandle:hover::before,#csHandle:focus-visible::before,#buildHandle:focus-visible::before{height:80px;margin-top:-40px;background:linear-gradient(#7348be,#5d37a1)}
body[data-theme="night"] #csHandle::before,body[data-theme="night"] #buildHandle::before{background:rgba(183,156,230,.35)}
#lx7 .l-gut i{background:rgba(106,63,181,.3) !important;width:5px;height:56px}
body[data-theme="night"] #lx7 .l-gut i{background:rgba(183,156,230,.35) !important}

/* a question asked in the page itself (the computer's own confirm box is not shown by every app window) */
.ing-ask{max-width:460px}
.ing-ask h3{margin:0 0 6px}
.ing-ask p{margin:0 0 14px;color:var(--ink-2);line-height:1.55}
.ing-ask .ing-ask-keys{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.btn.ing-danger{background:linear-gradient(#c65050,#a83a3a) !important;border-color:#8a2c2c !important;color:#fff !important}

/* Code: the app's own keys, under its name in the left column */
.cc-proj-acts{display:flex;gap:6px;margin:-2px 0 10px;flex-wrap:wrap}
.cc-proj-acts .btn{flex:1 1 auto}
.cc-prow-wrap{display:flex;align-items:stretch;gap:6px}
.cc-prow-wrap .cc-prow{flex:1 1 auto;min-width:0}
.cc-prow-wrap .cc-prow-x{flex:0 0 auto;align-self:center}
@media (prefers-reduced-motion:reduce){.dock .nav-btn.ing-unfold{animation:none}.dock .grp-label.ing-fold .chev{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p58"]="started";}catch(_){}
/* R137 · INGENIUM 6.0: THE FRAME. See the note at the top of its styles for the owner's words. What it does:
   1. the whole width of the window, unless Display says Centred;
   2. the Apps group of the side rail folds away, and stays as it was left;
   3. one save at a time: every save waits for the one before it to close its dialog (five saved at once crossed names and
      contents in the Forge's packages: pywebview's dialog keeps the place chosen in one slot);
   4. a question asked in the page itself (ingAsk), where an app window shows no confirm box of its own;
   5. Code opens as Chat opens (the side rail stays; the same divider), its app can be closed or removed, and a preview
      closed stays closed until Run;
   6. a page brought into Chat is read whole by the model's passage search (it was cut at four million characters). */
(function r137(){
"use strict";
function $(id){return document.getElementById(id);}
function E(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function S6(){if(!state.v6||typeof state.v6!=="object")state.v6={};return state.v6;}
function keep(){try{saveState();}catch(e){}}

/* ---------- 1. the whole window ---------- */
function applyWidth(){document.body.classList.toggle("ing-centred",S6().width==="centred");try{if(typeof csApplyWidth==="function")csApplyWidth();}catch(e){}}
applyWidth();
(function(){var p=$("displayPanel");if(!p||$("dpWidth"))return;var r=E("div","dp-row");r.innerHTML='<div class="dp-label">Width</div><div class="seg" id="dpWidth"><button type="button" class="seg-btn" data-v="whole">The whole window</button><button type="button" class="seg-btn" data-v="centred">Centred</button></div>';
  var after=$("dpChat")?$("dpChat").closest(".dp-row"):null;if(after&&after.parentNode)after.parentNode.insertBefore(r,after.nextSibling);else p.appendChild(r);
  function tick(){r.querySelectorAll(".seg-btn").forEach(function(x){x.classList.toggle("on",x.getAttribute("data-v")===(S6().width==="centred"?"centred":"whole"));});}
  r.querySelectorAll(".seg-btn").forEach(function(x){x.onclick=function(){S6().width=x.getAttribute("data-v");keep();applyWidth();tick();};});tick();})();

/* ---------- 2. the Apps group folds away ---------- */
function appsLabel(){var ls=document.querySelectorAll(".dock .grp-label");for(var i=0;i<ls.length;i++){if(/^\s*apps\s*$/i.test(ls[i].getAttribute("data-label")||ls[i].textContent))return ls[i];}return null;}
function appsItems(lab){var out=[],n=lab?lab.nextElementSibling:null;while(n&&!n.classList.contains("grp-label")){if(n.classList.contains("nav-btn"))out.push(n);n=n.nextElementSibling;}return out;}
function paintFold(anim){var lab=appsLabel();if(!lab)return;var folded=!!S6().appsFolded,dock=lab.closest(".dock");if(dock)dock.classList.toggle("apps-folded",folded);
  lab.setAttribute("aria-expanded",folded?"false":"true");
  appsItems(lab).forEach(function(b,i){b.classList.toggle("ing-folded",folded);b.classList.remove("ing-unfold");if(!folded&&anim){void b.offsetWidth;b.classList.add("ing-unfold");b.style.animationDelay=(i*0.035)+"s";}});}
function wireFold(){var lab=appsLabel();if(!lab||lab.classList.contains("ing-fold"))return;
  lab.setAttribute("data-label",lab.textContent.trim());lab.classList.add("ing-fold");lab.setAttribute("role","button");lab.tabIndex=0;lab.title="Fold the apps away, or show them again";
  lab.innerHTML="";lab.appendChild(E("span",null,lab.getAttribute("data-label")));lab.appendChild(E("span","chev","▾"));
  function toggle(){S6().appsFolded=!S6().appsFolded;keep();paintFold(true);}
  lab.onclick=toggle;lab.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle();}};paintFold(false);}
wireFold();setTimeout(function(){wireFold();paintFold(false);},400);
/* the apps added after this part ran (Imago, Scriba, Fontes) fold with the others */
try{var dk=document.querySelector(".dock");if(dk)new MutationObserver(function(){if(S6().appsFolded)paintFold(false);}).observe(dk,{childList:true});}catch(e){}
/* the page an app is on is never hidden: going to it shows the group */
try{var og=go;go=function(p){var r=og.apply(this,arguments);try{var lab=appsLabel();if(lab&&S6().appsFolded&&appsItems(lab).some(function(b){return b.getAttribute("data-page")===p;})){S6().appsFolded=false;keep();paintFold(true);}}catch(e){}return r;};window.go=go;}catch(e){}

/* ---------- 3. one save at a time ---------- */
(function(){var o=window.saveFileNative;if(typeof o!=="function"||o.__queued)return;var tail=Promise.resolve();
  var q=function(name,mime,data){var self=this,args=arguments,p=tail.then(function(){return o.apply(self,args);});
    tail=p.then(function(){},function(){}).then(function(){return new Promise(function(res){setTimeout(res,150);});});return p;};
  q.__queued=true;window.saveFileNative=q;})();

/* ---------- 4. a question in the page ---------- */
/* ingAsk({title, text, yes, no, danger}) -> a promise of true or false */
window.ingAsk=function(o){return new Promise(function(res){var done=false;function end(v){if(done)return;done=true;try{closeModal();}catch(e){}res(v);}
  var box;try{box=modalOpen('<div class="ing-ask"><h3></h3><p></p><div class="ing-ask-keys"></div></div>');}catch(e){res(window.confirm(o.text||o.title));return;}
  box.querySelector("h3").textContent=o.title||"";box.querySelector("p").textContent=o.text||"";var k=box.querySelector(".ing-ask-keys");
  var no=E("button","btn ghost",o.no||"Keep it");no.type="button";no.onclick=function(){end(false);};var yes=E("button","btn primary"+(o.danger?" ing-danger":""),o.yes||"Yes");yes.type="button";yes.onclick=function(){end(true);};
  k.appendChild(no);k.appendChild(yes);setTimeout(function(){try{yes.focus();}catch(e){}},60);
  /* closed another way (Escape, a press beside it, another question): the answer is no */
  try{var root=$("modalRoot"),mo=new MutationObserver(function(){if(!root.classList.contains("open")||!box.contains(yes)){mo.disconnect();end(false);}});mo.observe(root,{attributes:true,attributeFilter:["class"],childList:true,subtree:true});}catch(e){}});};

/* ---------- 5. Code ---------- */
if(typeof ccEnter==="function"){
  /* it opens as Chat opens: the side rail stays (Code folded it away, so its chat spread across the whole window) */
  var oEnter=ccEnter;ccEnter=function(mode){var r=oEnter.apply(this,arguments);try{if(mode==="code"&&CC.navAuto){CC.navAuto=false;if(!state.navCollapsed)document.body.classList.remove("nav-collapsed");try{csApplyWidth();}catch(e){}}}catch(e){}return r;};window.ccEnter=ccEnter;
  /* a preview closed in Code stays closed: coming back to Code, opening a session or the app's name brought it back each time */
  function pvOff(){var cs=ccState();if(!cs.pvOff)cs.pvOff={};return cs.pvOff;}
  var oShow=ccShowPreview,wanted=false;ccShowPreview=function(pr){pr=pr||ccProj();if(pr&&pvOff()[pr.id]&&!wanted)return;if(pr&&wanted){delete pvOff()[pr.id];keep();}wanted=false;return oShow.apply(this,arguments);};window.ccShowPreview=ccShowPreview;
  var oOpen=csOpen;csOpen=function(on,user){var r=oOpen.apply(this,arguments);try{if(!on&&user&&CC.mode==="code"){var pr=ccProj();if(pr){pvOff()[pr.id]=true;keep();}}}catch(e){}return r;};window.csOpen=csOpen;
  document.addEventListener("click",function(e){var b=e.target&&e.target.closest?e.target.closest("#ccCodeBar .chat-top-key,#csShow,.cc-file.cc-mainf"):null;if(b)wanted=true;},true);
  try{var oProc=edProcess;edProcess=function(){wanted=true;var r=oProc.apply(this,arguments);return r;};window.edProcess=edProcess;}catch(e){}
  /* its app can be closed (the session keeps no app) or removed from Code (its files and sessions here go; the app itself stays) */
  window.ccCloseApp=function(){var c=curChat();if(!c||!ccIsCode(c))return;var pr=ccProj();delete c.projectId;var cs=ccState();cs.project=null;keep();
    try{csOpen(false);}catch(e){}renderChat();ccPaintSide();ccPaintHead();ingToast((pr?pr.name+" is closed":"Closed")+". Choose an app, or start a new one, when you want.");};
  window.ccRemoveApp=function(pr){if(!pr)return;ingAsk({title:"Remove "+pr.name+" from Code?",text:"Its files here and its "+((state.chats||[]).filter(function(c){return ccIsCode(c)&&c.projectId===pr.id;}).length)+" session(s) leave Code. The app itself is not touched: Fabrica, your app library and your devices keep theirs.",yes:"Remove it",danger:true}).then(function(ok){if(!ok)return;
      var refs={};(pr.files||[]).forEach(function(f){if(f.ref)refs[f.ref]=1;});(pr.versions||[]).forEach(function(v){if(v.prev)refs[v.prev]=1;if(v.next)refs[v.next]=1;});
      state.projects=(state.projects||[]).filter(function(p){return p!==pr;});
      var gone=(state.chats||[]).filter(function(c){return ccIsCode(c)&&c.projectId===pr.id;}).map(function(c){return c.id;});
      state.chats=(state.chats||[]).filter(function(c){return gone.indexOf(c.id)<0;});
      var cs=ccState();if(cs.project===pr.id)cs.project=null;if(gone.indexOf(cs.activeCode)>=0)cs.activeCode=null;if(gone.indexOf(state.activeChat)>=0)state.activeChat=null;if(cs.pvOff)delete cs.pvOff[pr.id];
      try{var fb=state.fabrica;if(fb&&fb.linksBack&&fb.linksBack[pr.id]){var rid=fb.linksBack[pr.id];delete fb.linksBack[pr.id];if(fb.links&&fb.links[rid]===pr.id)delete fb.links[rid];}}catch(e){}
      Object.keys(refs).forEach(function(r){try{if(!ccRefUsed(r))IngBig.del(r);}catch(e){}});
      keep();try{csOpen(false);}catch(e){}if(CC.mode==="code")ccEnter("code");ingToast(pr.name+" is no longer in Code.");});};
  if(typeof ccPaintCodeSide==="function"){var oSide=ccPaintCodeSide;ccPaintCodeSide=function(h){var r=oSide.apply(this,arguments);try{var pr=ccProj()||ccProjects().filter(function(p){return p.id===ccState().project;})[0],pb=h.querySelector(".cc-proj");
      if(pr&&pb&&!h.querySelector(".cc-proj-acts")){var a=E("div","cc-proj-acts"),c1=E("button","btn xs ghost","Close this app"),c2=E("button","btn xs ghost","Remove from Code");c1.type=c2.type="button";
        c1.title="This session keeps no app; the app stays in Code for later";c2.title="Its files and sessions leave Code; the app itself is not touched";c1.onclick=window.ccCloseApp;c2.onclick=function(){ccRemoveApp(pr);};a.appendChild(c1);a.appendChild(c2);pb.parentNode.insertBefore(a,pb.nextSibling);}}catch(e){}return r;};window.ccPaintCodeSide=ccPaintCodeSide;}
  if(typeof ccWelcome==="function"){var oWel=ccWelcome;ccWelcome=function(){var r=oWel.apply(this,arguments);try{document.querySelectorAll("#modalBox .cc-prow[data-p]").forEach(function(row){var pr=projById(row.getAttribute("data-p"));if(!pr||row.parentNode.classList.contains("cc-prow-wrap"))return;
        var w=E("div","cc-prow-wrap"),x=E("button","btn xs ghost cc-prow-x","Remove");x.type="button";x.title="Remove "+pr.name+" from Code";x.onclick=function(ev){ev.stopPropagation();closeModal();ccRemoveApp(pr);};
        row.parentNode.insertBefore(w,row);w.appendChild(row);w.appendChild(x);});}catch(e){}return r;};window.ccWelcome=ccWelcome;}
}

/* ---------- 6. a page in Chat is read whole ---------- */
try{if(typeof CHAT_FILE_MAX_CHARS==="number"&&CHAT_FILE_MAX_CHARS<64*1048576)CHAT_FILE_MAX_CHARS=64*1048576;}catch(e){}

window.Ing6={paintFold:paintFold,applyWidth:applyWidth};
})();
;try{window.__ingParts["p58"]="running";}catch(_){}
</script>
