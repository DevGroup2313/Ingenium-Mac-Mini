<style id="r309-css">
/* ============ R309 · THE PUBLISHING NAME (Ingenium 7.25, 16 November 2026) ============
   Her request of 16 November 2026, in her words in source/README.md (7.25): her own name built in only in the master edition, which she
   can change; every other edition starts with none, and Ingenium asks under what name, if any, the apps made in it are published, keeps
   the answer and lets it be changed.
   One publishing name, kept with Ingenium's own settings (state.publisher, saved and backed up with them). The master edition starts
   with the owner's name until it is changed; every other edition starts with none (editions.py takes the built-in name out of this
   module), and Fabrica asks, the first time it opens there, under what name its apps are published, or none, and keeps the answer.
   Fabrica's Ship room shows the name with a key to change it. The makers read it (r170 ownerLine: a Mac app's rights line, a Windows
   program's company and its installer's publisher; r178 ownerName: the build kits). With no name, a Mac app and a Windows app name no
   one; a build kit's licence, which needs a name, takes the app's own. Before a name is chosen in an edition that asks, the makers do
   as they did before 7.25 (the person's name from Settings, else the app's). */
.r309-line{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:12px 0 2px;font-size:13.5px}
.r309-line .r309-who b{font-weight:600}
.r309-line .r309-who small{display:block;opacity:.75;font-size:12.5px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p309"]="started";}catch(_){}
(function(){"use strict";
var W=window,D=document;if(W.IngPublisher)return;
var BUILT_IN="Yannie D. Forest";
function master(){try{return typeof ING_EDITION!=="undefined"&&ING_EDITION==="master";}catch(e){return false;}}
function st(){try{return typeof state!=="undefined"&&state?state:null;}catch(e){return null;}}
function clean(n){return String(n==null?"":n).replace(/[\u0000-\u001f\u007f]+/g," ").replace(/\s+/g," ").trim().slice(0,80);}
/* what is kept, else what the edition starts with: the owner's name in the master edition, nothing chosen in the others */
function rec(){var s=st(),r=s&&s.publisher;if(r&&typeof r==="object"&&r.decided)return r;
  return master()&&BUILT_IN?{name:BUILT_IN,decided:true,builtIn:true}:{name:"",decided:false};}
function name(){return clean(rec().name);}
function decided(){return !!rec().decided;}
function set(n){var s=st(),v=clean(n);if(s){s.publisher={name:v,decided:true,at:Date.now()};try{if(typeof saveState==="function")saveState();}catch(e){}}paintLine();return v;}
function X(){return W.fbHubHost||null;}
/* the sheet, in Fabrica's own look: the name typed and saved, or none */
function sheet(first,then){var x=X();if(!x||!x.sheet){if(then)then();return null;}
  var sh=x.sheet(first?"Under what name do you publish?":"Your publishing name",first?
    "The apps you make here carry it: as a Mac app's rights line, as a Windows app's publisher and in its installer, and in the build kits. Type your name or your studio's and save it, or choose no name. You can change it later, here in Fabrica.":
    "The apps you make from now on carry it. Those made before keep the name they were made with.");
  sh.box.setAttribute("data-r309",first?"ask":"edit");
  var l=x.h("label","f-field"),i=x.h("input");i.type="text";i.value=name();i.maxLength=80;i.placeholder="Your name, or your studio's";i.setAttribute("autocomplete","name");i.id="r309Name";
  l.appendChild(x.h("span",null,"Publishing name"));l.appendChild(i);l.appendChild(x.h("small",null,"Shown as © "+new Date().getFullYear()+" and the name on a Mac, and as the publisher on Windows."));sh.box.appendChild(l);
  var end=x.h("div","end"),done=function(msg){sh.close();try{x.toast(msg);}catch(e){}if(then)then();};
  var none=x.btn("","No name",function(){set("");done("The apps you make here carry no publishing name. You can add one in Fabrica's Ship room.");});none.id="r309None";end.appendChild(none);
  var ok=x.btn("pri","Save",function(){var v=clean(i.value);if(!v){i.focus();return;}set(v);done("The apps you make here are published as "+v+".");});ok.id="r309Save";
  end.appendChild(ok);sh.box.appendChild(end);i.onkeydown=function(e){if(e.key==="Enter")ok.click();};setTimeout(function(){try{i.focus();i.select();}catch(e){}},60);
  return sh;}
/* the line in Fabrica's Ship room: the name, and a key to change it */
function paintLine(){var x=X(),pk=D.getElementById("fbPkg");if(!x||!pk||!pk.parentNode)return;
  var L=D.getElementById("r309Line");if(!L){L=D.createElement("div");L.id="r309Line";L.className="r309-line";pk.parentNode.insertBefore(L,pk.nextSibling);}
  var n=name(),dec=decided();
  L.innerHTML='<span class="r309-who">'+(dec&&n?"Published as <b>"+x.esc(n)+"</b>":dec?"Published with <b>no name</b>":"No publishing name chosen yet")+
    "<small>"+(dec&&n?"A Mac app's rights line, a Windows app's publisher, the build kits.":dec?"A Mac app and a Windows app name no one.":"Choose one, or no name, before you make the apps.")+"</small></span>";
  var k=x.btn("sm",dec?"Change":"Choose",function(){sheet(!decided());});k.id="r309Change";L.appendChild(k);}
/* Fabrica asks once, the first time it opens in an edition with no name chosen; a sheet closed without an answer asks again next time */
var asked=false;
function onPage(){if(decided())return;var p=D.getElementById("page-fabrica");if(!p||!p.classList.contains("active")){asked=false;return;}
  if(asked)return;asked=true;setTimeout(function(){if(!decided()&&!D.querySelector('[data-r309="ask"]'))sheet(true);},700);}
function hook(){var L=W.fbAfterPaint=W.fbAfterPaint||[];L.push(paintLine);L.push(onPage);
  var tries=0,watch=function(){var pg=D.getElementById("page-fabrica");if(pg){try{new MutationObserver(onPage).observe(pg,{attributes:true,attributeFilter:["class"]});}catch(e){}onPage();return;}
    if(++tries<120)setTimeout(watch,500);};watch();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",hook);else hook();
W.IngPublisher={name:name,decided:decided,set:set,edit:function(){return sheet(!decided());},builtIn:function(){return master()?BUILT_IN:"";}};
try{window.__ingParts["p309"]="running";}catch(_){}
})();
</script>
