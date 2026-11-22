<style id="r359-css">
/* ============ R359 · CLEAR THE PREVIEW, AND MORE'S LIGHTER LOOK, HER STANDARD FOR SIDE MENUS (Ingenium 7.69, 22 November 2026): see the note at the top of its script.
   Her choice of the three light designs for the preview's More (22 November 2026), on its pictures: Design A, "I choose this look for the
   light redesign of the Live Preview panel's more menu". More is one raised card; its rows lie quietly in it and rise only under the
   pointer (as she chose for the Code page's start window, 7.47); a row that is on keeps its pressed seat. Every row is in view: the chat's
   menus stop at 340 pixels, which the new row would pass, leaving Close behind a scroll. */
#csMenu.cs-menu{max-height:min(480px,calc(100vh - 120px));padding:8px;border-radius:16px}
#csMenu.cs-menu .menu-btn{margin-top:2px;border:0;background:transparent;box-shadow:none;border-radius:10px;padding:9px 12px;font-weight:600}
#csMenu.cs-menu .menu-btn:hover{background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:0 1px 1px rgba(40,20,70,.08),0 4px 10px rgba(40,20,70,.10);transform:translateY(-1px);color:var(--accent-deep)}
body[data-theme="night"] #csMenu.cs-menu .menu-btn:hover{box-shadow:0 1px 1px rgba(0,0,0,.4),0 4px 10px rgba(0,0,0,.3);color:var(--accent-bright)}
#csMenu.cs-menu .menu-btn:active{transform:translateY(0);transition-duration:.04s;box-shadow:var(--seat)}
#csMenu.cs-menu .menu-btn[aria-pressed="true"]{background:var(--accent-soft);color:var(--accent-deep);box-shadow:var(--seat)}
body[data-theme="night"] #csMenu.cs-menu .menu-btn[aria-pressed="true"]{color:var(--accent-bright)}
#csMenu.cs-menu .ctx-sep{margin:6px 10px}
body[data-motion="minimal"] #csMenu.cs-menu .menu-btn:hover{transform:none}
/* Her standard for a panel's side menu from now on (22 November 2026): "I want you to give the sticky notes' side menu panel the same
   redesign look as the Live Preview panel, it should be made standard and added to my Ingenia files. I really like this look for the
   panel." (record 07, section 6). A sticky note's menu takes it now (its paper dots stay as they are; Delete note stays red), and any
   menu given the class .ing-side-menu takes it: one raised card, its rows quiet in it, each rising under the pointer. */
.sn-menu.sn-menu,.ing-side-menu.ing-side-menu{padding:8px;border-radius:16px;background:var(--card-hi);border:1px solid rgba(34,26,46,.08);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 8px 20px rgba(40,20,70,.16),0 22px 44px rgba(40,20,70,.14)}
body[data-theme="night"] .sn-menu.sn-menu,body[data-theme="night"] .ing-side-menu.ing-side-menu{background:#221b2e;border-color:rgba(255,255,255,.08);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 8px 20px rgba(0,0,0,.45),0 22px 44px rgba(0,0,0,.35)}
.sn-menu.sn-menu .menu-btn.menu-btn,.ing-side-menu.ing-side-menu .menu-btn.menu-btn{display:block;width:100%;box-sizing:border-box;text-align:left;margin-top:2px;
  border:0;background:transparent;box-shadow:none;border-radius:10px;padding:9px 12px;font:600 12.5px/1.35 var(--sans);color:var(--ink-1);animation:none;
  transition:transform .2s cubic-bezier(.34,1.3,.64,1),box-shadow .2s ease,background .14s ease,color .14s ease}
.sn-menu.sn-menu .menu-btn.menu-btn:hover,.ing-side-menu.ing-side-menu .menu-btn.menu-btn:hover{background:linear-gradient(180deg,var(--card-hi),var(--card-lo));
  box-shadow:0 1px 1px rgba(40,20,70,.08),0 4px 10px rgba(40,20,70,.10);transform:translateY(-1px);color:var(--accent-deep)}
body[data-theme="night"] .sn-menu.sn-menu .menu-btn.menu-btn:hover,body[data-theme="night"] .ing-side-menu.ing-side-menu .menu-btn.menu-btn:hover{
  box-shadow:0 1px 1px rgba(0,0,0,.4),0 4px 10px rgba(0,0,0,.3);color:var(--accent-bright)}
.sn-menu.sn-menu .menu-btn.menu-btn:active,.ing-side-menu.ing-side-menu .menu-btn.menu-btn:active{transform:translateY(0);transition-duration:.04s;box-shadow:var(--seat)}
.sn-menu.sn-menu .menu-btn.menu-btn.danger,.sn-menu.sn-menu .menu-btn.menu-btn.danger:hover,
.ing-side-menu.ing-side-menu .menu-btn.menu-btn.danger,.ing-side-menu.ing-side-menu .menu-btn.menu-btn.danger:hover{color:var(--bad)}
.sn-menu.sn-menu .col-row{padding:4px 8px 8px}
body[data-motion="minimal"] .sn-menu.sn-menu .menu-btn.menu-btn:hover,body[data-motion="minimal"] .ing-side-menu.ing-side-menu .menu-btn.menu-btn:hover{transform:none}
@media (prefers-reduced-motion:reduce){.sn-menu.sn-menu .menu-btn.menu-btn,.ing-side-menu.ing-side-menu .menu-btn.menu-btn{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p359"]="started";}catch(_){}
/* ============ R359 · CLEAR THE PREVIEW (Ingenium 7.69, 22 November 2026) ============
   Her words (22 November 2026): "I also still don't have a way to clear the app from the live preview panel itself inside of Ingenium
   and I keep on having to delete the entire conversation and workarounds, I need that option added to the side menu panel of the Live
   Interactive Preview panel".
   Before: More, Close only hid the panel; the page went on being the preview's, came back when the panel opened again, and was shown
   again by itself whenever she came back to the conversation (the newest page a reply wrote) or Ingenium started again.
   Now More has Clear the preview, just above Close: the page leaves the preview and stops running (what it kept stays kept for it),
   the panel shows that it is empty, and it stays empty in this conversation, across a return to it and a new start of Ingenium, until
   she opens a page herself (a card in the chat, a file, the Code page's Run) or a reply writes a new one; a page in the conversation
   that was there before she cleared it does not come back by itself. Nothing of hers is deleted.
   Approved on its pictures (previews/stage_preview), with the look of More she chose: "I approve of the previews and I choose this look
   for the light redesign of the Live Preview panel's more menu, please commit and push them everywhere". */
(function(){"use strict";
var W=window;
function $(id){return document.getElementById(id);}
if(!$("csMenu")||!$("csClose")||typeof W.csShow!=="function"||W.__r359)return;W.__r359=1;
/* a page's fingerprint: the same page, met again, is known (FNV-1a over its text) */
function fp(s){s=String(s||"");var h=0x811c9dc5;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193);}return (h>>>0).toString(36)+"."+s.length;}
function chat(){try{return curChat();}catch(e){return null;}}
function when(m){if(!m||typeof m!=="object")return 0;return +m.done||+m.at||0;}
/* a page the preview does not bring back by itself after she cleared it: one written before, or the very page she cleared */
function held(pg){var c=chat(),m=c&&c.stageCleared;if(!m||!pg)return false;
  if(pg.msg&&typeof pg.msg==="object"){var t=when(pg.msg);return !t||t<=m.at;}
  return !!m.f&&typeof pg.html==="string"&&fp(pg.html)===m.f;}
function clear(){var c=chat(),cur=W.csCur;
  if(!cur){ingToast("The preview is already empty.");return;}
  if(c){c.stageCleared={at:Date.now(),f:typeof cur.html==="string"&&!cur.live?fp(cur.html):""};try{saveState();}catch(e){}}
  W.csCur=null;W.csStoreCur=null;try{csCur=null;csStoreCur=null;}catch(e){}
  try{if(typeof csMode!=="undefined"&&csMode==="changes")csMode="preview";}catch(e){}
  try{csRender();csPaintKey();}catch(e){}
  ingToast("The preview is clear. It stays clear in this conversation until you open a page or a reply writes a new one. Nothing was deleted.");}
/* the key, in More, just above Close */
var b=document.createElement("button");b.type="button";b.className="menu-btn";b.id="csClear";b.setAttribute("role","menuitem");
b.title="Take the page off the preview: it stops running and the panel stays empty in this conversation until you open a page again. Nothing is deleted.";
b.textContent="⊘ Clear the preview";
var close=$("csClose"),sep=close.previousElementSibling;
close.parentNode.insertBefore(b,sep&&sep.classList&&sep.classList.contains("ctx-sep")?sep:close);
b.onclick=function(){try{csMenu(false);}catch(e){}clear();};
var more=$("csMore");if(more)more.title="More for the preview: changes, roll up, float, dim, hide the chat, edit, clear, close";
/* the preview keeps to it: a page is shown again by itself only if it is new; one she opens herself clears the mark */
var oShow=W.csShow;
W.csShow=csShow=function(page,opts){opts=opts||{};var c=chat();
  if(opts.user){if(c&&c.stageCleared){delete c.stageCleared;try{saveState();}catch(e){}}}
  else if(held(page))return;
  return oShow.apply(this,arguments);};
if(typeof W.csLiveFrom==="function"){var oLive=W.csLiveFrom;
  W.csLiveFrom=csLiveFrom=function(mm){var c=chat(),m=c&&c.stageCleared;if(m&&mm&&(!when(mm)||when(mm)<=m.at)&&!(W.csCur&&W.csCur.msg===mm))return;return oLive.apply(this,arguments);};}
/* the empty panel says so */
var empty=$("csEmpty");
if(empty&&!empty.__r359){empty.__r359=1;var base=empty.innerHTML;
  var paint=function(){var c=chat();empty.innerHTML=c&&c.stageCleared&&!W.csCur?"The preview is clear.<br>A page you open, or the next one a reply writes, opens here.":base;};
  if(typeof W.csRender==="function"){var oR=W.csRender;W.csRender=csRender=function(){var r=oR.apply(this,arguments);try{paint();}catch(e){}return r;};}
  paint();}
W.IngStageClear={clear:clear,held:held};
})();
;try{window.__ingParts["p359"]="running";}catch(_){}
</script>
