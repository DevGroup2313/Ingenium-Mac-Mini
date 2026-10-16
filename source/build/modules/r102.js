<style id="r102-css">
/* ============ R102 · THE CHAT FITS THE WINDOW ============
   Measured in Chromium at eleven window sizes, in the three chat looks, with and without the conversations'
   column and the preview: in every one of the 84 states the chat page was taller than the window (by 150 to 230
   pixels), so the whole page scrolled under the hand: dragging near the chat's foot scrolled everything instead of
   resizing it, the header slid off the top and the footer came up from below. Beside the column and the preview the
   chat took half of a row that also held the column, so the preview ran under the side buttons; on a narrow screen
   the send key was pushed past the edge. Now the chat page is one frame the height of the window: the column, the
   conversation and the preview each scroll inside themselves. */
html body[data-chatmode] .main{padding-bottom:10px}
html body[data-chatmode] .foot{display:none}
html body[data-chatmode] #page-chat #chatCol .chat-wrap{height:var(--r2-h,560px) !important;min-height:0}
html body[data-chatmode] #page-chat #chatCol{min-width:0;max-width:100%;box-sizing:border-box}
html body[data-chatmode] #page-chat #chatCol .chat-card{min-width:0;box-sizing:border-box}
html body[data-chatmode] .cc-side{min-height:0;overflow:hidden}
/* the column of conversations takes the height of its row and never sets it: its own length scrolls inside it */
html body[data-chatmode]:not(.r2-over) .cc-side{contain:size;align-self:stretch}
/* the studio's column scrolls within itself on a short window, so it never makes the page taller */
html body[data-chatmode] .shell > .dock{max-height:calc(100vh - var(--r2-docktop,56px) - 8px);overflow-y:auto;overscroll-behavior:contain}
html body[data-chatmode] .cc-side .cc-list{min-height:0;overflow:auto;flex:1 1 auto}
/* beside the preview: the chat may give way, the preview keeps a working width, nothing runs past the row */
html body.cs-on[data-chatmode]:not([data-csview="float"]):not([data-csview="full"]) #page-chat #chatCol .chat-card{flex-shrink:1 !important;min-width:min(360px,46%) !important}
html body.cs-on[data-chatmode]:not([data-csview="float"]):not([data-csview="full"]) #page-chat #chatCol #csPane{min-width:min(300px,40%);flex-shrink:1}
/* the composer's keys on a narrow chat: the model's name gives way first, then Fast keeps only its mark */
html body[data-chatmode] #page-chat .composer-bar{flex-wrap:nowrap;min-width:0;gap:6px}
html body[data-chatmode] #page-chat #chatModelBtn{min-width:0;max-width:46%;flex:0 1 auto;overflow:hidden}
html body[data-chatmode] #page-chat #chatModelBtn .nm{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
html body[data-chatmode] #page-chat #chatSend{flex:0 0 auto}
html body[data-chatmode] #page-chat .chat-card.r2-tight #chatModelTier{display:none}
html body[data-chatmode] #page-chat .chat-card.r2-tight .cp-fast .nm,
html body[data-chatmode] #page-chat .chat-card.r2-tight .cp-fast span:not([class*="ico"]){display:none}
/* the chat's top row keeps one line; its keys shrink before they wrap */
html body[data-chatmode] #page-chat .chat-top{min-width:0;flex-wrap:nowrap}
html body[data-chatmode] #page-chat .chat-top .nm{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* the conversations' column over a narrow chat: inside the chat's own frame, over a dimmed chat, closed by a tap outside */
.r2-scrim{display:none}
html body.cc-side-open[data-chatmode] .r2-scrim{display:block;position:fixed;inset:0;z-index:755;background:rgba(20,12,34,.28)}
html body[data-theme="night"].cc-side-open[data-chatmode] .r2-scrim{background:rgba(0,0,0,.45)}
html body.r2-over[data-chatmode] .cc-side{top:var(--r2-ovt,50px) !important;bottom:var(--r2-ovb,8px) !important;height:auto !important;border-radius:0 16px 16px 0}
@media (prefers-reduced-motion:no-preference){html body.cc-side-open.r2-over[data-chatmode] .cc-side{animation:r2SideIn .22s cubic-bezier(.2,.8,.2,1)}}
@keyframes r2SideIn{from{transform:translateX(-24px);opacity:.4}to{transform:none;opacity:1}}
/* her ask (15 October): "For the Fire Tablet the chat panel does not need to expand to fill the page, it looks weird
   that way and the live preview and anything loaded inside of it will look distorted. Please adopt the same look of
   the Build page as a template." In the tablet apps, and on any tablet held upright, the chat page flows as Build
   does: the chat at a comfortable height of its own, the preview beside it at the same height when the screen is
   wide, and below it in the page (not a sheet over it) when the screen is upright, so what runs in it keeps its
   natural width. The page scrolls as Build does; the column of conversations still floats over the chat. */
/* R107 (16 October), her report from the Fire tablet with two pictures: the composer sat in the middle of the screen with
   the lower part left empty when the preview was hidden, and with it open the page still did not fill the screen. The
   tablet's chat now fills the screen down to its foot, as on a computer; with the preview open on an upright tablet the
   preview sits under the chat (as Build's and the Forge's Editor's previews do) and the two share the screen, the chat's
   grip moving the line between them; on a tablet held sideways they stand side by side, the full height. */
/* the room the narrow-screen sheet keeps under the page is not wanted here: on a tablet the preview is under the chat, never a sheet */
html body.r2-flow[data-chatmode] .main{padding-bottom:10px !important}
html body.r2-flow[data-chatmode] .foot{display:none}
html body.r2-flow.cs-on[data-chatmode]:not([data-csview="float"]):not([data-csview="full"]) #page-chat #chatCol{align-items:stretch}
html body.r2-flow.r2-up.cs-on[data-chatmode] #page-chat #chatCol{display:block !important}
html body.r2-flow.r2-up.cs-on[data-chatmode] #page-chat #chatCol .chat-card{max-width:none !important;min-width:0 !important;width:100%}
html body.r2-flow.r2-up.cs-on[data-chatmode] .cs-handle{display:none !important}
html body.r2-flow.r2-up.cs-on[data-chatmode]:not([data-csview="full"]):not([data-csview="float"]) #csPane{position:relative !important;left:auto !important;right:auto !important;top:auto !important;bottom:auto !important;
  width:100% !important;min-width:0 !important;height:var(--r2-ph,420px) !important;margin-top:14px;box-sizing:border-box;z-index:auto;border-radius:16px;box-shadow:none}
html body.r2-flow.r2-up.cs-on[data-chatmode] #csSheetGrip{display:none !important}
/* up to 900 points wide the conversations' column opens over the chat from ☰, as on a narrower window: beside the
   studio's column and the side buttons it left the chat about 250 points */
@media (min-width:821px) and (max-width:900px){
  .cc-side{position:fixed;left:0;top:50px;bottom:0;z-index:760;width:min(84vw,300px);max-height:none;border-radius:0 16px 16px 0;background:var(--card-hi);box-shadow:0 10px 40px rgba(0,0,0,.18)}
  body:not(.cc-side-open) .cc-side{display:none}
  body.cc-side-off.cc-side-open .cc-side{display:flex}
  .cc-title{max-width:none;flex:1 1 auto;min-width:0}
  body[data-chatmode="chat"] #page-chat .chat-top,body[data-chatmode="code"] #page-chat .chat-top{flex-wrap:nowrap}}
/* the column over the chat, whenever the measured row cannot hold it (the same rule the ☰ key follows) */
html body.r2-over[data-chatmode] .cc-side{position:fixed;left:0;z-index:760;width:min(84vw,300px);max-height:none;contain:none;border-radius:0 16px 16px 0;background:var(--card-hi);box-shadow:0 10px 40px rgba(0,0,0,.18)}
html body.r2-over[data-chatmode]:not(.cc-side-open) .cc-side{display:none}
html body.r2-over.cc-side-off.cc-side-open[data-chatmode] .cc-side{display:flex}
/* her idea (15 October): "make the conversations list pop out as a side square panel popup instead so that it does not
   have to compete with the chat panel for space; it can hover over the chat panel when open and then get folded out of
   view again". In Chat the list is that panel: a card that floats over the chat's left side, inside the chat's frame,
   opened by ☰ and folded away by ‹, by a tap beside it, by Esc, or by choosing a conversation. */
html body[data-chatmode].r2-over .cc-side{left:var(--r2-ovl,12px) !important;top:var(--r2-ovt,60px) !important;bottom:auto !important;
  height:min(620px,calc(100vh - var(--r2-ovt,60px) - var(--r2-ovb,12px))) !important;
  width:min(330px,calc(100vw - 32px)) !important;border-radius:18px !important;border:.5px solid var(--hairline);
  box-shadow:0 2px 6px rgba(28,18,48,.10),0 18px 48px rgba(28,18,48,.24) !important;padding:12px}
html body[data-theme="night"][data-chatmode].r2-over .cc-side{box-shadow:0 2px 6px rgba(0,0,0,.4),0 18px 48px rgba(0,0,0,.55) !important;border-color:rgba(183,156,230,.22)}
html body.cc-side-open[data-chatmode] .r2-scrim{background:rgba(20,12,34,.16)}
@media (prefers-reduced-motion:no-preference){html body.cc-side-open[data-chatmode].r2-over .cc-side{animation:r2Pop .2s cubic-bezier(.2,.8,.2,1)}}
@keyframes r2Pop{from{transform:translateX(-14px) scale(.98);opacity:0}to{transform:none;opacity:1}}
/* R105 (16 October), her word: "the chat page looks great now, please give the Code chat page the same look and fix the
   bug that is on the panel since it has the same issue". In Code the sessions-and-files column took 244 points of the
   row, so the chat was left about 480 (its name cut short, Plan first, Run and No errors broken over two lines). It is
   the same floating panel as in Chat now, opened by ☰; and the code keys keep one line each. */
html body[data-chatmode="code"] #ccCodeBar button,html body[data-chatmode="code"] #ccCodeBar .chat-top-key{white-space:nowrap;flex:0 0 auto}
html body[data-chatmode="code"] #ccCodeBar{flex-wrap:nowrap;min-width:0}
html body[data-chatmode="code"] #page-chat .chat-top{flex-wrap:nowrap}
html body[data-chatmode="code"] .chat-card.r2-tight #ccCodeBar .cc-errs:disabled{display:none}
/* the door's own key: open straight to the app from now on (off unless she switches it on) */
.intro-straight{display:flex;align-items:center;justify-content:center;gap:10px;margin:14px auto 0;font-size:12.5px;color:var(--ink-2);cursor:pointer;user-select:none;width:fit-content}
.intro-straight .eswitch{flex:0 0 auto}
.intro-straight:focus-within{outline:2px solid var(--accent);outline-offset:4px;border-radius:8px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p34"]="started";}catch(_){}
/* ============ R102 · THE CHAT FITS THE WINDOW, AND THE DOOR OPENS EVERY TIME ============
   Her report (15 October): on the Fire tablet the chat page was distorted with the conversations' list open ("the
   panel extends well beyond the typing area and the buttons are all out of whack"), and "the Chat panel is
   resizeable and I want it to remain that way but there is a bug … it expands weirdly and distorts the entire panel
   and the rest of the page". And: "I want Ingenium to open on the introduction door the same way that the other
   apps open … with the same little toggle … to open straight to the app, but I want to always open on the door."
   - The chat is the height the window leaves it, measured: what stands above it, the card's own foot below it, and
     on a narrow screen the preview's sheet. Its grip still makes it shorter, and longer again up to the window,
     never past it; a double press fits it again. A height kept from before is held to the window.
   - The conversations' column over a narrow chat sits inside the chat's frame, over a dimmed chat that closes it.
   - The door opens every time, unless "Open straight to the app from now on" is switched on there. */
var R2={h:0,fit:0,raf:0};
function r2Chat(){var p=$("page-chat");return !!(p&&document.body.getAttribute("data-chatmode")&&p.offsetParent!==null);}
function r2Saved(){try{var h=+localStorage.getItem("ingenium_chat_h")||0;return h>=320?h:0;}catch(e){return 0;}}
/* the tablet apps, and a tablet held upright: Build's flowing page rather than a frame the size of the window */
function r2Flow(){var w=window.innerWidth||1200,h=window.innerHeight||800,lo=Math.min(w,h),hi=Math.max(w,h);
  var app=!!(window.IngeniumNative||/\bKF[A-Z]{2,5}\b|\bSilk\//.test(navigator.userAgent||""));
  if(app&&lo>=560&&hi<=1600)return true;
  return h>w&&w>=621&&w<=1100;}
function r2Fit(){R2.raf=0;var flow=r2Flow(),up=(window.innerHeight||800)>(window.innerWidth||1200);
  document.body.classList.toggle("r2-flow",flow);document.body.classList.toggle("r2-up",flow&&up);
  if(!r2Chat())return;
  var wrap=document.querySelector("#page-chat .chat-wrap"),card=document.querySelector("#page-chat .chat-card");if(!wrap||!card)return;
  var root=document.documentElement,vh=window.innerHeight||800,sy=window.scrollY||0;
  var wr=wrap.getBoundingClientRect(),cr=card.getBoundingClientRect(),top=wr.top+sy,below=Math.max(0,cr.bottom-wr.bottom);
  /* a narrow screen stacks the preview under the chat as a sheet: the chat leaves it room */
  var pane=$("csPane"),sheet=0;
  if(pane&&document.body.classList.contains("cs-on")){var pc=getComputedStyle(pane);if(pc.position==="fixed"&&pc.display!=="none"&&document.body.getAttribute("data-csview")!=="full"&&document.body.getAttribute("data-csview")!=="float"&&document.body.getAttribute("data-cschat")!=="hidden"){var pr=pane.getBoundingClientRect();sheet=Math.max(0,vh-pr.top)+6;}}
  var fit=Math.max(240,Math.floor(vh-top-below-sheet-12));
  /* on a tablet (R107): the chat fills the screen; an upright tablet with the preview open shares the screen between the
     chat above and the preview under it, half each to begin with, the grip moving the line */
  var stack=false,avail=fit;
  if(flow&&up&&pane&&document.body.classList.contains("cs-on")){var v2=document.body.getAttribute("data-csview");
    stack=v2!=="float"&&v2!=="full"&&document.body.getAttribute("data-cschat")!=="hidden"&&getComputedStyle(pane).display!=="none";}
  if(stack){var pTop=0;try{pTop=parseFloat(getComputedStyle(pane).marginTop)||14;}catch(e){pTop=14;}
    avail=Math.max(560,Math.floor(vh-top-below-12-pTop));fit=Math.max(240,avail-260);}
  R2.fit=fit;R2.stack=stack;
  var want=stack?(R2.h||Math.round(avail*0.52)):(R2.h||(flow?0:r2Saved())||fit),h=Math.max(240,Math.min(want,fit));
  root.style.setProperty("--r2-h",h+"px");
  if(stack)root.style.setProperty("--r2-ph",Math.max(260,avail-h)+"px");
  var dock=document.querySelector(".shell > .dock");if(dock)root.style.setProperty("--r2-docktop",Math.max(0,Math.round(dock.getBoundingClientRect().top+sy))+"px");
  /* what still reaches past the window inside the chat's own frame (fonts, a wrapped line) comes off the chat */
  var col=$("chatCol");if(col&&sy<1){var over=Math.round(col.getBoundingClientRect().bottom+10-vh);if(over>1){
    if(stack){var ph=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--r2-ph"))||0,take=Math.min(over,Math.max(0,ph-260));
      root.style.setProperty("--r2-ph",(ph-take)+"px");over-=take;}
    if(over>1){h=Math.max(240,h-over);root.style.setProperty("--r2-h",h+"px");}}}
  card.classList.toggle("r2-tight",cr.width<520);
  /* the column over a narrow chat keeps to the chat's frame */
  var over2=false;try{over2=ccSideOver();}catch(e){}document.body.classList.toggle("r2-over",over2);
  if(over2){var c2=card.getBoundingClientRect(),tp=card.querySelector(".chat-top"),tb=tp?tp.getBoundingClientRect().bottom:c2.top;
    var chat=CC&&(CC.mode==="chat"||CC.mode==="code");root.style.setProperty("--r2-ovt",Math.max(44,Math.round(chat?tb+6:c2.top))+"px");root.style.setProperty("--r2-ovb",Math.max(6,Math.round(vh-c2.bottom+(chat?10:0)))+"px");
    root.style.setProperty("--r2-ovl",Math.max(6,Math.round(c2.left+(chat?10:0)))+"px");}}
function r2Soon(){if(R2.raf)return;R2.raf=(window.requestAnimationFrame||function(f){return setTimeout(f,16);})(function(){r2Fit();setTimeout(r2Fit,60);});}
/* the grip: shorter, or longer up to the window */
window.r2Grip=function(h,keep){h=Math.max(240,Math.min(R2.fit||h,Math.round(h)));R2.h=h;document.documentElement.style.setProperty("--r2-h",h+"px");
  /* on a tablet the preview under the chat takes what the chat gives up (R107); a computer keeps its own height */
  if(R2.stack)r2Soon();
  if(keep&&!document.body.classList.contains("r2-flow")){try{localStorage.setItem("ingenium_chat_h",String(h));}catch(e){}}};
(function r2Wire(){
  var of=chatFit;chatFit=function(){try{of.apply(this,arguments);}catch(e){}r2Soon();};window.chatFit=chatFit;
  window.addEventListener("resize",r2Soon);window.addEventListener("orientationchange",function(){setTimeout(r2Soon,250);});
  try{if(window.visualViewport)visualViewport.addEventListener("resize",r2Soon);}catch(e){}
  var og=go;go=function(){var r=og.apply(this,arguments);r2Soon();return r;};window.go=go;
  ["csOpen","csClose","ccPaintSide","ccPaintHead","renderChat","chatWide","csSetWidth","csApplyWidth"].forEach(function(n){var f=window[n];if(typeof f!=="function")return;
    window[n]=function(){var r=f.apply(this,arguments);r2Soon();return r;};});
  try{if(typeof ResizeObserver==="function"){var ro=new ResizeObserver(r2Soon);["chatCol","csPane"].forEach(function(id){var e=$(id);if(e)ro.observe(e);});
    var top=document.querySelector(".topbar");if(top)ro.observe(top);}}catch(e){}
  try{if(document.fonts&&document.fonts.ready)document.fonts.ready.then(r2Soon);}catch(e){}
  /* the grip's double press fits the window again */
  document.addEventListener("dblclick",function(e){if(e.target&&e.target.classList&&e.target.classList.contains("chat-grip")){R2.h=0;r2Soon();}},true);
  /* ‹ in the floating panel folds it away */
  document.addEventListener("click",function(e){var h=e.target&&e.target.closest?e.target.closest(".cc-hide"):null;if(!h||!document.body.classList.contains("r2-over"))return;
    e.stopPropagation();e.preventDefault();document.body.classList.remove("cc-side-open");},true);
  /* opening it again repaints it where the chat is now */
  var mo=new MutationObserver(function(){if(document.body.classList.contains("cc-side-open"))r2Soon();});mo.observe(document.body,{attributes:true,attributeFilter:["class"]});
  /* the scrim over a narrow chat closes the column */
  var s=el("div","r2-scrim");s.id="r2Scrim";s.addEventListener("click",function(){document.body.classList.remove("cc-side-open");});document.body.appendChild(s);
  r2Soon();setTimeout(r2Soon,400);setTimeout(r2Soon,1500);})();

/* ---------- the door, every time ---------- */
function r2Straight(){try{return !!(state&&state.doorStraight)||localStorage.getItem("ingenium_door_straight")==="1";}catch(e){return !!(state&&state.doorStraight);}}
function r2SetStraight(on){try{state.doorStraight=!!on;saveState();}catch(e){}try{localStorage.setItem("ingenium_door_straight",on?"1":"0");}catch(e){}}
(function r2Door(){var card=document.querySelector("#introDoor .intro-card"),enter=$("introEnter");if(!card||!enter||$("introStraight"))return;
  var lab=el("label","intro-straight");lab.id="introStraightRow";lab.title="When this is on, Ingenium opens on your desk instead of on this door. The seal in the top bar still opens the door.";
  lab.innerHTML='<span class="eswitch"><input type="checkbox" id="introStraight"'+(r2Straight()?" checked":"")+'><span class="etrack"></span></span><span>Open straight to the app from now on</span>';
  enter.parentNode.insertBefore(lab,enter.nextSibling);
  $("introStraight").addEventListener("change",function(){r2SetStraight(this.checked);});
  /* every start: the door, unless she chose to go straight in (the desk on disk may say so a moment later) */
  var touched=false;["pointerdown","keydown"].forEach(function(ev){document.addEventListener(ev,function(){touched=true;},{capture:true,once:true});});
  var door=$("introDoor");
  if(!r2Straight()&&door&&door.hasAttribute("hidden"))showIntro();
  var t0=Date.now();(function settle(){if(Date.now()-t0>8000)return;var d=$("introDoor");
    if(d&&!d.hasAttribute("hidden")&&r2Straight()&&!touched){hideIntro();return;}
    var c=$("introStraight");if(c&&c.checked!==r2Straight())c.checked=r2Straight();setTimeout(settle,500);})();})();
/* the conversations' column goes over the chat up to 900 points wide */
/* and wherever the row cannot hold the column, a working chat (360) and, when it is open, a working preview (300) */
(function r2Over(){if(typeof ccSideOver!=="function")return;var o=ccSideOver;
  ccSideOver=function(){if(typeof CC!=="undefined"&&CC&&(CC.mode==="chat"||CC.mode==="code"))return true;if((window.innerWidth||1200)<=900)return true;
    try{var col=$("chatCol"),w=col?col.getBoundingClientRect().width:0,v=document.body.getAttribute("data-csview"),st=document.body.classList.contains("cs-on")&&v!=="float"&&v!=="full"&&document.body.getAttribute("data-cschat")!=="hidden";
      if(w>0&&w<(st?262+14+360+12+300:262+14+420))return true;}catch(e){}
    return o.apply(this,arguments);};window.ccSideOver=ccSideOver;})();
window.IngR102={fit:r2Fit,straight:r2Straight};
;try{window.__ingParts["p34"]="running";}catch(_){}
</script>
