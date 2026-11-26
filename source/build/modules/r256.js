<script>try{(window.__ingParts=window.__ingParts||{})["p256"]="started";}catch(_){}
/* ============ R256 · THE SCREEN STAYS ON WHILE INGENIUM IS WORKING (Ingenium 6.58, 8 November 2026) ============
   Her words (8 November 2026): "I want for Ingenium to still be able to continue running and working in the background even if the
   screen of the devices go to sleep. I want for the device that is lending its models to a weaker device's screen to stay awake so
   that there is no interruption of the connection between the devices".
   Measured: the computer that lends its models already stays awake while it lends (R74, _share_keep_awake: caffeinate -i on the Mac,
   SetThreadExecutionState on Windows; the screen may turn off and the work goes on), and since 6.57 the computer that keeps the Cloud
   too. What could still stop work was the other side: a device whose screen goes to sleep while a reply is being written (above all
   the Fire tablet or a phone borrowing a computer's model), which the system may pause, ending the reply.
   Now, while Ingenium is working on this device (a reply being written, Lector or the Career Studio writing, Blend, dictation, the
   Cloud sending or bringing in, a model being converted), the page asks the screen to stay on (the Screen Wake Lock of Chrome, Edge,
   Safari 16.4 and later, and Android's web view), and lets it go as soon as the work ends. A screen locked by hand is never kept on,
   and a page out of sight cannot hold the lock: the browser releases it, and it is asked for again when the page is seen. Where the
   browser has no wake lock, nothing changes. Settings, Models and AI, Your devices: Keep the screen on while Ingenium works.
   7.95 (26 November 2026), her words: "I want Ingenium to keep my device screen awake when it is running a task or a model is writing
   and working on something and when the device is lending a model." Measured on 7.94: the Mac app's window offers no wake lock, so there
   the switch stood disabled and nothing was held; nor did the Fire, iPhone and iPad apps hold the screen by themselves. Now the page also
   asks the app it runs in: the Mac and Windows apps (keep_awake: the computer and its screen, and out of App Nap on the Mac, desktop/
   app_awake_795.py), the Fire and Android app (keepAwake: FLAG_KEEP_SCREEN_ON) and the iPhone and iPad app (keepAwake: the idle timer
   off). It renews the hold every minute while it works and lets it go when the work ends; the switch works wherever either way exists.
   With the switch off the screen may sleep, and the computer apps still keep the computer itself awake while they work. */
(function r256(){
"use strict";
if(window.__r256)return;window.__r256=1;
var W=window,D=document,LOCK=null,ASK=false,T=null;
function on(){try{return state.keepAwake!==false;}catch(e){return true;}}
function web(){return !!(navigator.wakeLock&&typeof navigator.wakeLock.request==="function");}
/* 7.95: the app it runs in: the computer apps' bridge, the Fire app's and the iPhone app's */
function shellKeep(){try{var a=typeof shellApi==="function"?shellApi():(W.pywebview&&W.pywebview.api);return a&&typeof a.keep_awake==="function"?a:null;}catch(e){return null;}}
function droid(){try{return W.IngeniumNative&&typeof W.IngeniumNative.call==="function"?W.IngeniumNative:null;}catch(e){return null;}}
function ios(){try{return W.webkit&&W.webkit.messageHandlers&&W.webkit.messageHandlers.ingenium?W.webkit.messageHandlers.ingenium:null;}catch(e){return null;}}
function native(){return !!(shellKeep()||droid()||ios());}
function can(){return web()||native();}
var NAT={on:false,at:0};
function tell(on,screen){NAT.on=on;NAT.at=Date.now();
  try{var a=shellKeep();if(a){Promise.resolve(a.keep_awake(on,screen)).catch(function(){});return;}}catch(e){}
  var m=JSON.stringify({callId:"",method:"keepAwake",args:{on:!!(on&&screen)}});
  try{var d=droid();if(d){d.call(m);return;}}catch(e){}
  try{var i=ios();if(i)i.postMessage(m);}catch(e){}}
/* what counts as working, each read where it is kept */
function working(){var w=[];
  try{if(typeof Engine!=="undefined"&&Engine&&Engine.status==="busy")w.push("a reply");}catch(e){}
  try{if(typeof LX!=="undefined"&&LX&&LX.busy)w.push("Lector");}catch(e){}
  try{if(W.IngCareer&&IngCareer.run&&IngCareer.run.busy)w.push("Vocatio");}catch(e){}
  try{var bs=D.getElementById("blendStop");if(bs&&!bs.hidden&&bs.getClientRects().length)w.push("Blend");}catch(e){}
  try{if(W.IngEars&&(IngEars.listening()||IngEars.busy()))w.push("dictation");}catch(e){}
  try{if(W.IngCloud&&typeof IngCloud.busy==="function"&&IngCloud.busy())w.push("the Cloud");}catch(e){}
  try{if(typeof convState!=="undefined"&&convState&&convState.busy)w.push("a model being converted");}catch(e){}
  return w;}
function take(){if(LOCK||ASK||!web()||D.visibilityState!=="visible")return;ASK=true;
  navigator.wakeLock.request("screen").then(function(l){ASK=false;LOCK=l;try{l.addEventListener("release",function(){if(LOCK===l)LOCK=null;});}catch(e){}},function(){ASK=false;});}
function give(){var l=LOCK;LOCK=null;if(l){try{l.release();}catch(e){}}}
function tick(){var all=working(),w=on()?all:[];if(w.length)take();else give();W.IngAwake.now=w;
  /* the app it runs in: held while anything works (the screen only when the switch is on), renewed each minute, let go at the end */
  if(native()){var want=all.length>0;if(want&&(!NAT.on||Date.now()-NAT.at>60000))tell(true,on());else if(!want&&NAT.on)tell(false,on());}}
W.IngAwake={can:can,working:working,held:function(){return !!LOCK||NAT.on;},native:native,now:[]};
T=setInterval(tick,1500);
D.addEventListener("visibilitychange",function(){if(D.visibilityState==="visible")tick();});
/* the switch: Settings, Models and AI, Your devices */
function card(){var pg=D.getElementById("page-settings");if(!pg||D.getElementById("awakeCard"))return;
  var c=D.createElement("div");c.className="card";c.id="awakeCard";c.setAttribute("role","region");c.setAttribute("aria-labelledby","awakeH");
  var h=D.createElement("h2");h.className="sec";h.id="awakeH";h.textContent="Keep working";c.appendChild(h);
  var p=D.createElement("p");p.className="small muted";var studios=[D.getElementById("page-lector")?"Lector":"",D.getElementById("page-career")?"Vocatio":""].filter(Boolean).join(" or ");
  /* named as this edition has them: the public editions have neither Lector nor the Career Studio */
  p.textContent="While Ingenium is working here (a reply being written, "+(studios?studios+" writing, ":"")+"Blend, dictation, the Cloud), the screen stays on, so a tablet or phone borrowing another computer's model does not stop halfway. It goes back to normal as soon as the work ends. A computer that lends its models or keeps your Cloud already stays awake by itself (its screen may still turn off)."+(can()?"":" This browser cannot keep the screen on: keep it awake in the device's own settings while a long reply is written.");c.appendChild(p);
  var r=D.createElement("div");r.className="ey-row";var t=D.createElement("span"),b=D.createElement("b");b.textContent="Keep the screen on while Ingenium works";t.appendChild(b);r.appendChild(t);
  var lb=D.createElement("label");lb.className="eswitch";var inp=D.createElement("input");inp.type="checkbox";inp.id="awakeOn";inp.checked=on();inp.disabled=!can();inp.setAttribute("aria-label","Keep the screen on while Ingenium works");
  inp.onchange=function(){try{state.keepAwake=inp.checked;saveState();}catch(e){}if(NAT.on)tell(true,inp.checked);tick();};lb.appendChild(inp);var tr=D.createElement("span");tr.className="etrack";lb.appendChild(tr);r.appendChild(lb);c.appendChild(r);
  var at=D.getElementById("linkCard");if(at&&at.parentNode===pg)pg.insertBefore(c,at.nextSibling);else pg.appendChild(c);}
function init(){try{card();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",init);else init();
D.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest('.nav-btn[data-page="settings"]');if(t)setTimeout(card,0);},true);
})();
;try{window.__ingParts["p256"]="running";}catch(_){}
</script>
