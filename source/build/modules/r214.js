<style id="r214-css">
/* ============ R214 · TWO ENGINES ON A COMPUTER (Ingenium 6.10.5) ============ */
#engPairCard .ep-line{font-size:13px;line-height:1.55;color:var(--ink-2);margin:0 0 8px}
#engPairCard .ep-line b{color:var(--ink-1)}
#engPairCard .ep-opts{display:grid;gap:8px;margin:10px 0 6px}
#engPairCard .ep-opt{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border:1px solid var(--hairline);border-radius:12px;background:var(--card);cursor:pointer}
#engPairCard .ep-opt input{margin-top:3px;accent-color:var(--accent)}
#engPairCard .ep-opt b{display:block;font-size:13.5px;color:var(--ink-1)}
#engPairCard .ep-opt span{display:block;font-size:12.5px;line-height:1.5;color:var(--ink-3)}
#engPairCard .ep-opt.on{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent) inset}
#engPairCard .ep-now{font-size:12.5px;color:var(--ink-3);margin-top:6px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p214"]="started";}catch(_){}
/* ============ R214 · TWO ENGINES ON A COMPUTER (Ingenium 6.10.5, 4 November 2026) ============
   Her words (3 November 2026): "I don't want to lose my reliable llama cpp engine, I want the option of a newer engine where it tested
   and proven to work and work well but I still want the llama engine kept optional or in some cases as a backup or default, depending
   on what works best. I want you to help me weight it out and decide on the best way to implement this".
   The computer app's side is desktop/app_engine2_6105.py: a copy may carry a newer llama.cpp beside the proven one, put in only when
   its cloud build's own self-test answered with it. This card, in the Models page's Engine room, says which engines this copy has,
   which kinds of model only the newer one can load, which engine runs the model now, and holds her choice: automatic (the default:
   the proven engine, and the newer one only for a kind only it can load), the newer engine where it can, or the proven engine only.
   Whatever she chooses, a model the newer engine cannot load goes to the proven engine at once. */
(function r214(){
"use strict";
if(window.__r214)return;window.__r214=1;
function api(){try{var a=typeof deskApi==="function"?deskApi():null;return a&&typeof a.engine_choice==="function"?a:null;}catch(e){return null;}}
function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
var NAMES={lfm3:"LFM3",deepseek41:"DeepSeek V4.1","mistral-large4":"Mistral Large 4"};
function card(){var c=document.getElementById("engPairCard");if(c)return c;var sec=document.getElementById("page-models");if(!sec||!api())return null;
  c=document.createElement("div");c.className="card";c.id="engPairCard";c.innerHTML='<h2 class="sec">The engines on this computer</h2><div id="engPairBody" class="small"></div>';
  sec.appendChild(c);return c;}
var OPTS=[["auto","Automatic (recommended)","Every model runs on the proven engine, except a kind of model only the newer engine can load."],
  ["newer","The newer engine where it can","Every model the newer engine can load runs on it."],
  ["proven","The proven engine only","As before: the newer engine is never used."]];
function paint(r){var c=card();if(!c)return;var b=c.querySelector("#engPairBody");if(!b)return;r=r||{};var P=r.proven||{},N=r.newer||{};
  var h="";
  if(!N.available){
    h+='<p class="ep-line">This copy carries the proven engine only: <b>'+esc(P.version||"llama.cpp")+'</b>'+(P.kinds?', which can load '+P.kinds+' kinds of model':'')+'. A copy built with a newer engine offers the choice here.</p>';
    b.innerHTML=h;return;}
  h+='<p class="ep-line"><b>Proven:</b> '+esc(P.version)+(P.kinds?', which can load '+P.kinds+' kinds of model':'')+'. <b>Newer:</b> '+esc(N.version)+(N.kinds?', '+N.kinds+' kinds':'')
    +'. The newer engine was put in this copy only after its own build\'s self-test answered with it.</p>';
  var only=(N.only||[]).map(function(k){return NAMES[k]||k;});
  if(only.length)h+='<p class="ep-line">Only the newer engine can load: '+esc(only.slice(0,10).join(", "))+(only.length>10?' and '+(only.length-10)+' more':'')+'.</p>';
  h+='<div class="ep-opts" role="radiogroup" aria-label="Which engine runs your models">';
  OPTS.forEach(function(o){var on=(r.choice||"auto")===o[0];
    h+='<label class="ep-opt'+(on?' on':'')+'"><input type="radio" name="engPairChoice" value="'+o[0]+'"'+(on?' checked':'')+'><div><b>'+esc(o[1])+'</b><span>'+esc(o[2])+'</span></div></label>';});
  h+='</div><p class="ep-line">Whichever you choose, if the newer engine cannot load a model, the proven engine loads it at once. A change applies the next time a model loads.</p>';
  h+='<div class="ep-now">'+(r.running==="newer"?"Now: the newer engine runs the loaded model.":r.running==="proven"?"Now: the proven engine runs the loaded model.":"No model is loaded now.")+'</div>';
  b.innerHTML=h;
  [].forEach.call(b.querySelectorAll('input[name="engPairChoice"]'),function(i){i.addEventListener("change",function(){var a=api();if(!a)return;
    Promise.resolve(a.engine_choice_set(i.value)).then(function(res){if(res&&res.ok===false){try{ingSay(res.error||"The choice could not be kept.");}catch(e){}}refresh();},function(){refresh();});});});}
function refresh(){var a=api();if(!a)return;try{Promise.resolve(a.engine_choice()).then(paint,function(){});}catch(e){}}
(function hook(){if(typeof window.go!=="function")return;var o=window.go;
  window.go=function(p){var r=o.apply(this,arguments);if(p==="models")setTimeout(refresh,200);return r;};
  try{go=window.go;}catch(e){}})();
setTimeout(function(){if(api()){card();refresh();}},1500);
window.IngR214={refresh:refresh,paint:paint};
})();
;try{window.__ingParts["p214"]="running";}catch(_){}
</script>
