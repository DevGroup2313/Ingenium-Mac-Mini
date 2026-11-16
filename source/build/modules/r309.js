<style id="r309-css">
/* ============ R309 · THE PUBLISHING NAME (Ingenium 7.25 and 7.26, 16 November 2026) ============
   Her requests of 16 November 2026, in her words in source/README.md (7.25, 7.26): her own name built in only in the master edition,
   which she can change; every other edition starts with none; and (7.26) Fabrica asks every time, in every edition, never assuming,
   with the name already in its field and a choice not to be asked again.
   One publishing name, kept with Ingenium's own settings (state.publisher: name, decided, quiet; saved and backed up with them). The
   master edition starts with the owner's name; the other editions with none (editions.py takes the built-in name out of this module).
   Before Fabrica makes anything that carries the name (a Mac app, a Windows app, a web app, build kits: r112 makeOne, once for a whole
   Make the chosen or Make the missing ones), it asks under what name, with the name kept so far in the field: Use this name, No name,
   or the sheet closed, which makes nothing. "Don't ask me again" there stops the asking; Change in the Ship part edits the name and
   the same choice, so the asking can be turned on again. The makers read it (r170 ownerLine: a Mac app's rights line, a Windows program's company and its
   installer's publisher; r178 ownerName: the build kits). With no name, a Mac app and a Windows app name no one; a build kit's
   licence, which needs a name, takes the app's own. */
.r309-line{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:12px 0 2px;font-size:13.5px}
.r309-line .r309-who b{font-weight:600}
.r309-line .r309-who small{display:block;opacity:.75;font-size:12.5px}
.r309-quiet{margin:4px 0 2px}
#fb .r309-quiet[aria-pressed="false"] .ic{color:transparent}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p309"]="started";}catch(_){}
(function(){"use strict";
var W=window,D=document;if(W.IngPublisher)return;
var BUILT_IN="Yannie D. Forest";
/* what a make carries the name in: the Mac and Windows apps, the web app's licence, the build kits */
var CARRIES={mac:1,win:1,web:1,kits:1,kit:1};
function master(){try{return typeof ING_EDITION!=="undefined"&&ING_EDITION==="master";}catch(e){return false;}}
function st(){try{return typeof state!=="undefined"&&state?state:null;}catch(e){return null;}}
function clean(n){return String(n==null?"":n).replace(/[\u0000-\u001f\u007f]+/g," ").replace(/\s+/g," ").trim().slice(0,80);}
/* what is kept, else what the edition starts with: the owner's name in the master edition, nothing chosen in the others */
function rec(){var s=st(),r=s&&s.publisher;if(r&&typeof r==="object"&&r.decided)return r;
  return master()&&BUILT_IN?{name:BUILT_IN,decided:true,builtIn:true}:{name:"",decided:false};}
function name(){return clean(rec().name);}
function decided(){return !!rec().decided;}
function quiet(){var r=rec();return !!(r.decided&&r.quiet);}
function set(n,q){var s=st(),v=clean(n);if(s){s.publisher={name:v,decided:true,quiet:q===undefined?quiet():!!q,at:Date.now()};try{if(typeof saveState==="function")saveState();}catch(e){}}paintLine();return v;}
function X(){return W.fbHubHost||null;}
/* the sheet, in Fabrica's own look. o.make: an app about to be made (its title), o.then after a choice, o.cancel when it is closed
   unanswered (nothing is made then). Without o.make it only edits the name. */
function sheet(o){o=o||{};var x=X();if(!x||!x.sheet){if(o.then)o.then();return null;}
  var mk=!!o.make,answered=false,q=quiet();
  var sh=x.sheet(mk?"Under what name do you publish "+o.make+"?":"Your publishing name",mk?
    "It is about to be made. A Mac app's rights line, a Windows app's publisher and its installer, a web app's licence and the build kits carry the name. Use it as it is, type another, or choose no name.":
    "The apps you make from now on carry it; those made before keep the name they were made with.");
  sh.box.setAttribute("data-r309",mk?"make":"edit");
  var l=x.h("label","f-field"),i=x.h("input");i.type="text";i.value=name();i.maxLength=80;i.placeholder="Your name, or your studio's";i.setAttribute("autocomplete","name");i.id="r309Name";
  l.appendChild(x.h("span",null,"Publishing name"));l.appendChild(i);l.appendChild(x.h("small",null,"Shown as © "+new Date().getFullYear()+" and the name on a Mac, and as the publisher on Windows."));sh.box.appendChild(l);
  /* not asked again: Fabrica then uses the name kept, until Change in the Ship part */
  var t=x.h("button","f-opt r309-quiet");t.type="button";t.id="r309Quiet";
  t.innerHTML='<span class="ic">✓</span><span><b>Don’t ask me again</b><small>Fabrica then uses this name each time, without asking. Change, in the Ship part, lets you untick it.</small></span>';
  var paintT=function(){t.setAttribute("aria-pressed",q?"true":"false");};paintT();t.onclick=function(){q=!q;paintT();};sh.box.appendChild(t);
  var c0=sh.close;sh.close=function(){c0();if(!answered&&o.cancel)o.cancel();};
  var done=function(v,msg){answered=true;set(v,q);sh.close();try{x.toast(msg);}catch(e){}if(o.then)o.then();};
  var end=x.h("div","end");
  var none=x.btn("","No name",function(){done("",mk?"Made with no publishing name.":"The apps you make here carry no publishing name.");});none.id="r309None";end.appendChild(none);
  var ok=x.btn("pri",mk?"Use this name":"Save",function(){var v=clean(i.value);if(!v){i.focus();return;}done(v,mk?"Published as "+v+".":"The apps you make here are published as "+v+".");});ok.id="r309Save";
  end.appendChild(ok);sh.box.appendChild(end);i.onkeydown=function(e){if(e.key==="Enter")ok.click();};setTimeout(function(){try{i.focus();i.select();}catch(e){}},60);
  return sh;}
/* before a make: asked every time, unless "Don't ask me again" was chosen; closed unanswered, nothing is made */
function confirm(what,title,then,cancel){if(what&&!CARRIES[what]){then();return;}
  if(quiet()){then();return;}
  if(D.querySelector('[data-r309="make"]')){if(cancel)cancel();return;}
  sheet({make:clean(title)||"this app",then:then,cancel:cancel});}
/* the line in Fabrica's Ship part: the name, whether it is asked, and a key to change it */
function paintLine(){var x=X(),pk=D.getElementById("fbPkg");if(!x||!pk||!pk.parentNode)return;
  var L=D.getElementById("r309Line");if(!L){L=D.createElement("div");L.id="r309Line";L.className="r309-line";pk.parentNode.insertBefore(L,pk.nextSibling);}
  var n=name(),dec=decided(),qu=quiet();
  L.innerHTML='<span class="r309-who">'+(dec&&n?"Published as <b>"+x.esc(n)+"</b>":dec?"Published with <b>no name</b>":"No publishing name chosen yet")+
    "<small>"+(qu?"Not asked again: Fabrica uses it each time.":"Asked each time an app is made.")+"</small></span>";
  var k=x.btn("sm","Change",function(){sheet({});});k.id="r309Change";L.appendChild(k);}
function hook(){var L=W.fbAfterPaint=W.fbAfterPaint||[];L.push(paintLine);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",hook);else hook();
W.IngPublisher={name:name,decided:decided,quiet:quiet,set:set,confirm:confirm,carries:function(w){return !!CARRIES[w];},
  edit:function(){return sheet({});},builtIn:function(){return master()?BUILT_IN:"";}};
try{window.__ingParts["p309"]="running";}catch(_){}
})();
</script>
