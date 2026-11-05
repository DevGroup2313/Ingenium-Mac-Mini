<style id="r229-css">
/* ============ R229 · A MODEL INSTALLED ONCE (Ingenium 6.23, 5 November 2026) ============
   Her words (5 November 2026): "there are a lot of duplicate models downloaded on the Models page of Ingenium, the app does not seem to
   register when a model has been installed twice". A lineup model was installed again whenever Get was pressed again (lineupInstall
   never asked whether it was here), and a file brought in again became a second card; other routes matched only by the card's own id.
   Now: a lineup model already here is not fetched again, and a file already here (the same name and size) is not added again; each says
   so. Models already installed more than once are listed at the top of Your models, with one key that keeps one of each (the one in use,
   or the one built in, or the first) and removes the others through removeModel, which frees their stored copies and never touches a
   linked file. Nothing is removed before she says so. */
#ingDupCard{margin:0 0 12px;padding:12px 14px;border-radius:14px;border:1px solid rgba(184,121,31,.35);background:linear-gradient(180deg,rgba(255,248,236,.96),rgba(253,243,226,.96));box-shadow:0 1px 0 rgba(255,255,255,.7) inset,0 2px 0 rgba(40,20,70,.08),0 6px 14px rgba(40,20,70,.08)}
#ingDupCard h4{margin:0 0 4px;font-size:14px;color:#7a4e12}
#ingDupCard p{margin:0 0 8px;font-size:13px;line-height:1.5;color:var(--ink-2,#4a4358)}
#ingDupCard ul{margin:0 0 10px 18px;padding:0;font-size:13px;line-height:1.5}
#ingDupCard .row{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
body[data-theme="night"] #ingDupCard{background:linear-gradient(180deg,#2a2233,#241d2c);border-color:rgba(229,181,106,.35)}
body[data-theme="night"] #ingDupCard h4{color:#e5b56a}
body[data-theme="night"] #ingDupCard p{color:#d3c9e3}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p229"]="started";}catch(_){}
(function r229(){"use strict";
var W=window,D=document;
function say(t){try{(W.ingSay||W.ingToast||function(){})(t);}catch(e){}}
function models(){try{return (W.state&&Array.isArray(state.models))?state.models:[];}catch(e){return [];}}
/* what makes two cards the same model: the lineup model they are, or the same file name and size */
function keyOf(m){if(!m)return "";var lk=null;try{if(typeof lineupKeyOfRec==="function")lk=lineupKeyOfRec(m);}catch(e){}
  if(lk)return "lineup:"+lk+(m.nativeId?"|native":"");
  var f=String(m.fileName||"").toLowerCase().trim(),s=+m.sizeBytes||0;if(!f||!s)return "";return "file:"+f+"|"+s+(m.nativeId?"|native":"");}
function groups(){var g={};models().forEach(function(m){if(m.fileState!=="ready")return;var k=keyOf(m);if(!k)return;(g[k]=g[k]||[]).push(m);});
  return Object.keys(g).filter(function(k){return g[k].length>1;}).map(function(k){return g[k];});}
function keeper(list){var act=null;try{act=state.activeModelId;}catch(e){}
  return list.filter(function(m){return m.id===act;})[0]||list.filter(function(m){return m.builtinDesk||m.builtIn;})[0]||list.filter(function(m){return m.stored||m.shellStored;})[0]||list[0];}
function plan(){return groups().map(function(list){var k=keeper(list);return {keep:k,drop:list.filter(function(m){return m!==k;})};});}
function nameOf(m){return String(m.customName||m.fileName||"a model");}
function gb(b){return b>0?(b/1073741824).toFixed(1)+" GB":"";}
function clean(){var P=plan();if(!P.length)return 0;var n=0;
  P.forEach(function(p){p.drop.forEach(function(m){try{if(typeof removeModel==="function"){removeModel(m.id);n++;}}catch(e){}});});
  try{saveState();}catch(e){}try{renderModels();}catch(e){}
  say(n?"Removed "+n+" extra cop"+(n===1?"y":"ies")+"; one of each model stays.":"Nothing was removed.");return n;}
function confirmClean(){var P=plan();if(!P.length)return;var n=P.reduce(function(t,p){return t+p.drop.length;},0),bytes=0;
  P.forEach(function(p){p.drop.forEach(function(m){if(m.stored||m.shellStored)bytes+=(+m.sizeBytes||0);});});
  var msg="Remove "+n+" extra cop"+(n===1?"y":"ies")+"? One of each model stays"+(bytes?", and about "+gb(bytes)+" of storage comes back":"")+". A file linked from elsewhere (an Ollama model or a drive) is only unlisted, never deleted.";
  var go=function(ok){if(ok)clean();};
  try{if(typeof W.ingConfirm==="function"){W.ingConfirm("Remove the extra copies?",null,{text:msg,yes:"Remove the extra copies",no:"Keep them"}).then(go);return;}}catch(e){}
  go(W.confirm(msg));}
function card(){var list=D.getElementById("modelList");if(!list||!list.parentNode)return;var old=D.getElementById("ingDupCard");var P=plan();
  if(!P.length){if(old)old.remove();return;}
  var c=old||D.createElement("div");c.id="ingDupCard";c.setAttribute("role","region");c.setAttribute("aria-label","Models installed more than once");
  var items=P.map(function(p){return "<li><b>"+esc(nameOf(p.keep))+"</b>: "+(p.drop.length+1)+" copies"+(p.keep.sizeBytes?", "+gb(+p.keep.sizeBytes)+" each":"")+"</li>";}).join("");
  c.innerHTML="<h4>Some models are installed more than once</h4><p>Each copy below is the same model. One of each is enough: keep it and remove the rest.</p><ul>"+items+"</ul><div class=\"row\"><button type=\"button\" class=\"btn small\" id=\"ingDupGo\">Keep one of each</button></div>";
  if(!old)list.parentNode.insertBefore(c,list);
  D.getElementById("ingDupGo").onclick=confirmClean;}
function esc(s){return String(s).replace(/[&<>"]/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[ch];});}
/* a lineup model already here is not fetched again */
function wrapInstall(){var o=W.lineupInstall;if(typeof o!=="function"||o.__r229)return;
  var n=function(key,quiet){var have=null;try{have=lineupRec(key);}catch(e){}
    if(have){var sp=null;try{sp=ING_LINEUP.models[key];}catch(e){}if(!quiet)say((sp&&sp.name||nameOf(have))+" is already installed here, checked against its fingerprint; it was not downloaded again.");return Promise.resolve(have);}
    return o.apply(this,arguments);};n.__r229=true;W.lineupInstall=n;}
/* a file already here (the same name and size) is not added again */
function wrapAdd(){var o=W.addEntries;if(typeof o!=="function"||o.__r229)return;
  var n=function(entries){if(!entries||!entries.length)return o.apply(this,arguments);var kept=[],same=[];
    entries.forEach(function(en){var f=en&&en.file;if(!f){kept.push(en);return;}var nm=String(f.name||"").toLowerCase(),sz=+f.size||0;
      var have=models().filter(function(m){return String(m.fileName||"").toLowerCase()===nm&&(+m.sizeBytes||0)===sz&&sz>0&&m.fileState==="ready";})[0];
      if(have)same.push(nameOf(have));else kept.push(en);});
    if(same.length)say((same.length===1?same[0]+" is":same.length+" models are")+" already installed here; "+(same.length===1?"it was":"they were")+" not added again.");
    if(kept.length)return o.call(this,kept);};
  n.__r229=true;W.addEntries=n;}
function wrapRender(){var o=W.renderModels;if(typeof o!=="function"||o.__r229)return;
  var n=function(){var r=o.apply(this,arguments);try{card();}catch(e){}return r;};n.__r229=true;W.renderModels=n;}
function all(){wrapInstall();wrapAdd();wrapRender();try{card();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",all);else all();
W.IngModelDupes={groups:groups,plan:plan,clean:clean,keyOf:keyOf,card:card};
})();
;try{window.__ingParts["p229"]="running";}catch(_){}
</script>
