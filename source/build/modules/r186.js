<style id="r186-css">
/* ============ R186 · WHERE YOUR MODELS ARE KEPT: THE COMPUTER, OR AN EXTERNAL DRIVE (Ingenium 6.8.2) ============
   The owner's words (27 October 2026): "models should be allowed to use storage from external hard drives as well as the
   machine they are working on." In the computer apps (Mac and Windows; desktop/app_drives_682.py), a card in Your models
   says where the models are kept and how much room each place has, chooses a folder on a drive for the models Ingenium
   writes, and moves a model either way. A model on a drive that is not connected is listed as such; a file linked where it
   lies stays there. The phone and tablet apps keep models in their own storage, and do not show the card. */
#mdPlaceCard .mp-places{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px;margin:8px 0 10px}
#mdPlaceCard .mp-place{border:1px solid var(--line,rgba(0,0,0,.12));border-radius:10px;padding:9px 11px;background:var(--paper-2,transparent)}
#mdPlaceCard .mp-place b{display:block;font-weight:600}
#mdPlaceCard .mp-place small{display:block;color:var(--ink-3);font-size:12px;line-height:1.45}
#mdPlaceCard .mp-place.on{box-shadow:inset 0 0 0 2px var(--accent,#6A3FB5)}
#mdPlaceCard .mp-keys{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 10px}
#mdPlaceCard .mp-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:7px 0;border-top:1px solid var(--line,rgba(0,0,0,.08))}
#mdPlaceCard .mp-row .nm{flex:1 1 200px;min-width:0}
#mdPlaceCard .mp-row .nm b{font-weight:600;overflow-wrap:anywhere}
#mdPlaceCard .mp-row .nm small{display:block;color:var(--ink-3);font-size:12px}
#mdPlaceCard .mp-bar{flex:1 1 160px;height:6px;border-radius:3px;background:var(--line,rgba(0,0,0,.1));overflow:hidden}
#mdPlaceCard .mp-bar i{display:block;height:100%;background:var(--accent,#6A3FB5);width:0}
#mdPlaceCard .mp-say{min-height:1.4em;color:var(--ink-2);font-size:12.5px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p106"]="started";}catch(_){}
(function r186Places(){"use strict";
function api(){try{var a=typeof shellApi==="function"?shellApi():(window.pywebview&&window.pywebview.api);return a&&typeof a.model_places==="function"?a:null;}catch(e){return null;}}
function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function size(n){try{return fmtBytes(n);}catch(e){return Math.round(n/1073741824)+" GB";}}
function nameOf(m){try{var x=(state.models||[]).filter(function(y){return y.id===m.id;})[0];if(x)return x.customName||x.name||m.file;}catch(e){}return m.name||m.file||m.id;}
var P=null,busy=false,timer=null,say="";
function card(){var c=document.getElementById("mdPlaceCard");if(c)return c;var after=document.getElementById("yourModelsCard");if(!after||!api())return null;
  c=document.createElement("div");c.className="card";c.id="mdPlaceCard";
  c.innerHTML='<h2 class="sec">Where your models are kept</h2><p class="small muted" style="margin-top:0">On this computer, or in a folder on an external drive. New models go to the place marked; each model can be moved, and a file you linked where it lies stays there.</p><div id="mdPlaceBody"></div><p class="mp-say" id="mdPlaceSay" role="status" aria-live="polite"></p>';
  after.parentNode.insertBefore(c,after.nextSibling);return c;}
function place(p,label,on,away){var d=document.createElement("div");d.className="mp-place"+(on?" on":"");
  d.innerHTML="<b>"+esc(label)+(on?" · new models go here":"")+"</b><small>"+esc(away?"Not connected. Its models wait until it is.":(p.total?size(p.free)+" free of "+size(p.total):"Its room could not be read."))+"</small>";return d;}
function key(text,cls,fn,title){var b=document.createElement("button");b.className="btn "+(cls||"ghost");b.type="button";b.textContent=text;if(title)b.title=title;b.onclick=fn;return b;}
function paint(){var c=card();if(!c||!P)return;var body=document.getElementById("mdPlaceBody");body.innerHTML="";
  var g=document.createElement("div");g.className="mp-places";
  g.appendChild(place(P.computer,"This computer",P.writes_to==="computer",false));
  if(P.drive)g.appendChild(place(P.drive,P.drive.label||"The drive",P.writes_to==="drive",!P.drive.connected));
  body.appendChild(g);
  var k=document.createElement("div");k.className="mp-keys";
  k.appendChild(key(P.drive?"Choose another drive…":"Choose a drive…","primary",choose,"Choose a folder on an external drive for the models Ingenium writes"));
  if(P.drive)k.appendChild(key("Keep new models on this computer","ghost",reset));
  body.appendChild(k);
  (P.models||[]).forEach(function(m){var r=document.createElement("div");r.className="mp-row";r.setAttribute("data-model",m.id);
    var nm=document.createElement("div");nm.className="nm";
    var where=m.where==="computer"?"On this computer":m.where==="drive"?"On "+(m.drive||"the drive"):m.where==="away"?"On "+(m.drive||"a drive")+", not connected":"Linked where it lies"+(m.drive?" ("+m.drive+")":"");
    nm.innerHTML="<b>"+esc(nameOf(m))+"</b><small>"+esc(where+(m.size?" · "+size(m.size):""))+"</small>";r.appendChild(nm);
    var mv=(P.moves||{})[m.id];
    if(mv&&mv.state==="running"){var bar=document.createElement("div");bar.className="mp-bar";bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Moving "+nameOf(m));
      var pct=mv.total?Math.round(mv.done*100/mv.total):0;bar.setAttribute("aria-valuenow",String(pct));bar.innerHTML='<i style="width:'+pct+'%"></i>';r.appendChild(bar);}
    else if(m.where==="computer"&&P.drive&&P.drive.connected)r.appendChild(key("Move to "+(P.drive.label||"the drive"),"ghost",function(){move(m,"drive");}));
    else if(m.where==="drive")r.appendChild(key("Move to this computer","ghost",function(){move(m,"computer");}));
    body.appendChild(r);});
  if(!(P.models||[]).length){var e=document.createElement("p");e.className="small muted";e.textContent="No models are kept yet.";body.appendChild(e);}
  var s=document.getElementById("mdPlaceSay");if(s)s.textContent=say;}
function load(){var a=api();if(!a)return Promise.resolve();return Promise.resolve(a.model_places()).then(function(p){P=p||P;paint();
  var running=P&&P.moves&&Object.keys(P.moves).some(function(k){return P.moves[k].state==="running";});clearTimeout(timer);if(running)timer=setTimeout(load,600);
  Object.keys((P&&P.moves)||{}).forEach(function(k){var mv=P.moves[k];if(mv.state==="error"&&!mv.told){mv.told=1;say="The move stopped: "+mv.error+".";}});paint();},function(){});}
function after(r){if(!r)return;if(r.error){say=r.error;}else if(r.cancelled){say="";}if(r.computer)P=r;paint();}
function choose(){var a=api();if(!a||busy)return;busy=true;say="Choose a folder on the drive in the window that opens.";paint();
  Promise.resolve(a.choose_model_place()).then(function(r){busy=false;if(r&&r.ok)say="New models now go to "+((r.drive&&r.drive.label)||"the drive")+", in its Ingenium models folder.";after(r);},function(){busy=false;say="The folder could not be chosen.";paint();});}
function reset(){var a=api();if(!a)return;Promise.resolve(a.reset_model_place()).then(function(r){say="New models go to this computer again. Models already on the drive stay there until you move them.";after(r);});}
function move(m,to){var a=api();if(!a)return;say="Moving "+nameOf(m)+(to==="drive"?" to the drive.":" to this computer.");paint();
  Promise.resolve(a.move_model(m.id,to)).then(function(r){if(r&&r.error){say=r.error;paint();return;}load();});}
window.ingModelPlaces={load:load,state:function(){return P;}};
function onPage(){var pg=document.getElementById("page-models");return pg&&(pg.classList.contains("active")||pg.offsetParent!==null);}
document.addEventListener("click",function(e){var t=e.target&&e.target.closest?e.target.closest('[data-page="models"],[data-go="models"]'):null;if(t)setTimeout(load,200);},true);
/* the card is drawn and read again each time the Models page is opened */
var tries=0;(function first(){if(typeof window.go==="function"&&!window.go.__r186){var g=window.go;window.go=function(n){var r=g.apply(this,arguments);try{if(n==="models"&&api()){card();load();}}catch(e){}return r;};window.go.__r186=1;}
  if(api()){card();if(onPage())load();return;}if(++tries<40)setTimeout(first,500);})();
})();
try{window.__ingParts["p106"]="running";}catch(_){}
</script>
