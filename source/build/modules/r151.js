<style id="r151-css">
/* R151 · the note shown while a page is still being painted after a press in the side bar */
#ing-painting{position:fixed;left:50%;top:64px;z-index:2147482000;display:flex;align-items:center;gap:9px;padding:8px 14px 8px 11px;border-radius:99px;
  transform:translate(-50%,-8px);opacity:0;pointer-events:none;font-size:13.5px;font-weight:600;color:var(--ink-1,#221a2e);
  background:var(--glass-strong,rgba(255,255,255,.92));border:1px solid var(--glass-border,rgba(34,26,46,.08));
  box-shadow:0 1px 0 rgba(255,255,255,.7) inset,0 6px 18px rgba(40,20,70,.16);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  transition:opacity .16s ease,transform .3s cubic-bezier(.34,1.35,.64,1)}
/* it fades in a little after the press, so a page that opens at once never shows it; the fade runs on the compositor and
   keeps going while the page's own work holds everything else still */
#ing-painting.on{opacity:1;transform:translate(-50%,0);transition-delay:110ms}
#ing-painting .ip-ring{width:15px;height:15px;border-radius:50%;border:2.5px solid var(--accent-soft,rgba(106,63,181,.18));border-top-color:var(--accent,#6a3fb5);animation:ipSpin .9s linear infinite;will-change:transform}
@keyframes ipSpin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){#ing-painting .ip-ring{animation-duration:3s}#ing-painting{transition:opacity .18s ease}}
/* the Refresh key turns once when pressed */
#refreshBtn.is-turning .kico{animation:ipSpin .6s cubic-bezier(.34,1.35,.64,1)}
/* 6.1, 21 October 2026. The owner's words: "I want a visible button inside of the app that says that it is to refresh the
   app, so it is accesible to any user and easy to locate." and "Put the refresh the app button inside of the display panel,
   that keeps things neater." and "match the look of the other buttons on the panel". It is the panel's first row, a key
   like its others, in words with its arrow. */
#displayPanel #refreshBtn{display:inline-flex;align-items:center;gap:5px}
#displayPanel #refreshBtn .kico{display:block;width:13px;height:13px;flex:0 0 auto}
/* the same, larger, at the top of Settings, where anyone looking for help is likely to look */
#ing-refresh-card{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
#ing-refresh-card .rc-t{flex:1 1 260px;min-width:0}
#ing-refresh-card .rc-t b{display:block;font-size:15px;margin-bottom:2px}
#ing-refresh-card .rc-k{display:inline-flex;align-items:center;gap:6px}
#ing-refresh-card .rc-k svg{width:14px;height:14px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p72"]="started";}catch(_){}
/* ============ R151 · REFRESH, AND A WORD WHILE A PAGE IS PAINTED ============
   The owner's words (20 October 2026): "I want a refresh button added to Ingenium and the Forge, that refreshed the app if
   it glitches or freezes. I also want a loading page added to the apps that informs the user that the page is still being
   painted instead of letting a user think that the app has crashed or is lagging and glitching."
   Refresh (the key in the top bar, F5, Ctrl+R, or Command+R on a Mac) saves the desk first and then starts Ingenium again,
   showing the loading page meanwhile. When a reply, a Lector piece or a package is still being made, it asks first, since
   starting again stops that work. The loading page itself is boot/splash.html, first in the body.
   A page opened for the first time can take a moment to paint (Lector, Fabrica, Code, the apps). A press on its name in
   the side bar now shows "Painting Lector…" at once, while the press is still held, so the wait reads as work and not as
   a frozen window; the note goes when the page has painted and the frames run smoothly again. */
(function(){"use strict";

/* ---------- what is still being made, in plain words, or "" ---------- */
function busyWhat(){
  try{if(document.querySelector("#page-chat .msg-live"))return "A reply is still being written.";}catch(e){}
  try{if(typeof LX!=="undefined"&&LX&&(LX.busy||LX.writing))return "Lector is still writing.";}catch(e){}
  try{if(document.querySelector("#fb .f-toast"))return "Fabrica is still making something.";}catch(e){}
  try{if(window.__ingBuilding)return "A build is still running.";}catch(e){}
  return "";}

var going=false;
function refresh(why){if(going)return Promise.resolve(false);
  var busy=busyWhat();
  var ask=busy&&typeof window.ingAsk==="function"?window.ingAsk({title:"Refresh Ingenium?",
      text:busy+" Refreshing stops it, and the part not yet finished may be lost. Everything already saved stays.",yes:"Refresh",no:"Keep waiting"}):Promise.resolve(true);
  return Promise.resolve(ask).then(function(ok){if(!ok)return false;going=true;
    var k=document.getElementById("refreshBtn");if(k)k.classList.add("is-turning");
    /* the desk is written now; the page's own leaving (pagehide) sends the copy kept on disk by the desktop app */
    try{if(typeof saveState==="function")saveState();}catch(e){}
    try{sessionStorage.setItem("ing_refresh_at",String(Date.now()));}catch(e){}
    try{if(window.__ingBoot){window.__ingBoot.look(document.body.getAttribute("data-theme")==="night");window.__ingBoot.again();}}catch(e){}
    /* a moment for the stores to finish what they were writing */
    setTimeout(function(){try{location.reload();}catch(e){location.href=location.href;}},380);
    return true;});}
window.ingRefresh=refresh;

/* F5, Ctrl+R and Command+R (with Shift too) save first instead of dropping the page at once */
window.addEventListener("keydown",function(e){var k=e.key;
  var r=(k==="F5"&&!e.altKey)||((e.ctrlKey||e.metaKey)&&!e.altKey&&(k==="r"||k==="R"));
  if(!r)return;e.preventDefault();e.stopPropagation();refresh("key");},true);

/* ---------- the same key, larger, at the top of Settings ---------- */
function refreshCard(){var pg=document.getElementById("page-settings");if(!pg||document.getElementById("ing-refresh-card"))return;
  var c=document.createElement("div");c.className="card";c.id="ing-refresh-card";c.setAttribute("role","region");c.setAttribute("aria-labelledby","ing-refresh-h");
  c.innerHTML='<div class="rc-t"><b id="ing-refresh-h">If the app glitches or stops answering</b><span class="small muted">Refresh the app: Ingenium starts again in a few seconds. Your work is saved first, and nothing is lost.</span></div>'+
    '<button type="button" class="btn rc-k"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.6 4.2v4.6H15"/></svg>Refresh the app</button>';
  c.querySelector("button").addEventListener("click",function(){refresh("settings");});
  var lede=pg.querySelector(".lede"),at=lede?lede.nextSibling:pg.firstChild;pg.insertBefore(c,at);}
try{refreshCard();}catch(e){}

/* ---------- "Painting …" while a page is painted ---------- */
var chip=null,opened={},shownAt=0,watch=0;
function chipEl(){if(chip)return chip;chip=document.createElement("div");chip.id="ing-painting";chip.setAttribute("role","status");chip.setAttribute("aria-live","polite");
  chip.innerHTML='<span class="ip-ring" aria-hidden="true"></span><span class="ip-t"></span>';document.body.appendChild(chip);return chip;}
function nameOf(p,btn){btn=btn||document.querySelector('.nav-btn[data-page="'+p+'"]');var t=btn?String(btn.textContent||"").trim():"";
  return t||p.charAt(0).toUpperCase()+p.slice(1);}
function chipOn(text){var c=chipEl();c.querySelector(".ip-t").textContent=text;if(!c.classList.contains("on"))shownAt=Date.now();c.classList.add("on");}
/* a note that was never really seen goes at once; one that was seen stays long enough to be read rather than flicker */
function chipOff(){if(!chip)return;var up=Date.now()-shownAt,wait=up<160?0:Math.max(0,520-up);setTimeout(function(){if(chip)chip.classList.remove("on");},wait);}
var raf=window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(f){return setTimeout(function(){f(Date.now());},16);};
/* the note goes once three frames in a row come within a twentieth of a second of each other, or after eight seconds */
function settle(){var my=++watch,lastT=0,smooth=0,t0=Date.now();
  (function f(){raf(function(){if(my!==watch)return;var now=Date.now();if(lastT&&now-lastT<50)smooth++;else smooth=0;lastT=now;
    if(smooth>=3||now-t0>8000){chipOff();return;}f();});})();}
/* after a slow opening with no note up: the note shows only if the page is still painting (a frame held back more than a
   tenth of a second in the next half second) */
function tail(p){var my=++watch,lastT=0,t0=Date.now();
  (function f(){raf(function(){if(my!==watch)return;var now=Date.now();
    if(lastT&&now-lastT>100){chipOn("Still painting "+nameOf(p)+"…");settle();return;}
    lastT=now;if(now-t0<600)f();});})();}
function current(){var a=document.querySelector("section.section.active[id^='page-']");return a&&a.id?a.id.replace(/^page-/,""):"";}
/* a press on a page's name: the note is shown while the press is still held, so it is painted before the page's own work */
document.addEventListener("pointerdown",function(e){var b=e.target&&e.target.closest?e.target.closest(".nav-btn[data-page]"):null;
  if(!b||e.button>0)return;var p=b.getAttribute("data-page");if(!p||p===current()||opened[p])return;
  chipOn("Painting "+nameOf(p,b)+"…");
  /* a press that never becomes a click (a drag away) takes the note with it */
  var gone=function(){document.removeEventListener("pointerup",gone,true);setTimeout(function(){if(current()!==p)chipOff();},500);};
  document.addEventListener("pointerup",gone,true);},true);
/* every way of opening a page: when it was slow (or the note is up), the note stays until the frames run smoothly again */
if(typeof window.go==="function"&&!window.go.__r151){var og=window.go;
  var ng=function(p){var t0=Date.now(),r=og.apply(this,arguments),took=Date.now()-t0;try{opened[p]=true;
      if(chip&&chip.classList.contains("on"))settle();
      else if(took>250)tail(p);}catch(e){}return r;};
  ng.__r151=true;window.go=ng;try{go=ng;}catch(e){}}
try{opened[current()]=true;}catch(e){}
})();
;try{window.__ingParts["p72"]="running";}catch(_){}
</script>
