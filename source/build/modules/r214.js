<style id="r214-css">
/* ============ R214 · TWO ENGINES ON A COMPUTER (Ingenium 6.10.5); its look redrawn in 7.72 ============
   7.72, her words (24 November 2026): "The Engine tab on the Mentes page look really dull and plain. "The engines on this computer" section
   is really flat, stiff and rigid and has no 3D design and animation. It looks nothing like the rest of the app ... It needs that popped
   out 3D animated look and effect and a slight redesign to match the rest of the tabs on the Mentes page." So: the two engines as raised
   plates, each with its cog (turning a little under the pointer) and the one running now marked; the three choices as raised cards that
   lift under the pointer and sink when pressed, the chosen one ringed with a filled dot; the kinds only the newer engine loads as chips.
   The choices and what they do are unchanged. */
#engPairCard{transition:transform .35s cubic-bezier(.2,.9,.25,1.2),box-shadow .25s}
#engPairCard:hover{transform:translateY(-2px)}
#engPairCard .ep-line{font-size:13px;line-height:1.55;color:var(--ink-2);margin:0 0 8px}
#engPairCard .ep-line b{color:var(--ink-1)}
#engPairCard .ep-engs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:10px 0 12px}
#engPairCard .ep-eng{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 12px;align-items:center;padding:14px 16px;border-radius:16px;
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#faf8fc));box-shadow:var(--pop);transition:transform .32s cubic-bezier(.34,1.35,.64,1),box-shadow .22s}
#engPairCard .ep-eng:hover{transform:translateY(-3px);box-shadow:var(--pop-hi,var(--pop))}
#engPairCard .ep-eng::after{content:"";position:absolute;left:0;right:0;bottom:-7px;height:7px}
#engPairCard .ep-eng.off{opacity:.78}
#engPairCard .ep-ico{grid-row:1 / span 3;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;color:var(--accent,#6a3fb5);
  background:radial-gradient(circle at 35% 30%,var(--card-hi,#fff),var(--card-lo,#f3eff9) 70%);box-shadow:var(--pop),inset 0 -2px 3px rgba(40,22,68,.10)}
#engPairCard .ep-ico svg{width:24px;height:24px;transition:transform .9s cubic-bezier(.34,1.35,.64,1)}
#engPairCard .ep-eng:hover .ep-ico svg{transform:rotate(60deg)}
#engPairCard .ep-eng b{font:600 16px/1.2 var(--serif,"Home Cormorant","Cormorant Garamond",Georgia,serif);color:var(--ink-1)}
#engPairCard .ep-eng .ep-v{font-size:12.5px;color:var(--ink-2);overflow-wrap:anywhere}
#engPairCard .ep-eng .ep-k{font-size:12px;color:var(--ink-3)}
#engPairCard .ep-run{position:absolute;top:10px;right:12px;font:700 10.5px/1 var(--sans,system-ui);letter-spacing:.06em;text-transform:uppercase;padding:5px 9px;border-radius:999px;
  color:#1a7f50;background:rgba(31,157,99,.14);display:inline-flex;align-items:center;gap:6px}
#engPairCard .ep-run i{width:7px;height:7px;border-radius:50%;background:currentColor;box-shadow:0 0 0 3px rgba(31,157,99,.18)}
#engPairCard .ep-chips{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 12px}
#engPairCard .ep-chip{font:600 11.5px/1 var(--sans,system-ui);padding:6px 10px;border-radius:999px;background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#faf8fc));
  box-shadow:var(--pop);color:var(--ink-2);transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#engPairCard .ep-chip:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop))}
#engPairCard .ep-opts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:4px 0 10px}
#engPairCard .ep-opt{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 10px;align-items:start;padding:12px 14px;border-radius:14px;cursor:pointer;
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#faf8fc));box-shadow:var(--pop);transition:transform .32s cubic-bezier(.34,1.35,.64,1),box-shadow .22s}
#engPairCard .ep-opt:hover{transform:translateY(-3px);box-shadow:var(--pop-hi,var(--pop))}
#engPairCard .ep-opt:active{transform:translateY(1px);transition-duration:.08s}
#engPairCard .ep-opt::after{content:"";position:absolute;left:0;right:0;bottom:-7px;height:7px}
#engPairCard .ep-opt input{position:absolute;opacity:0;width:1px;height:1px;margin:0;pointer-events:none}
#engPairCard .ep-dot{margin-top:2px;width:16px;height:16px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#ece6f5);box-shadow:inset 0 1px 2px rgba(40,22,68,.25),0 1px 0 rgba(255,255,255,.8)}
#engPairCard .ep-opt.on{box-shadow:0 0 0 2px var(--accent,#6a3fb5),var(--pop)}
#engPairCard .ep-opt.on .ep-dot{background:radial-gradient(circle at 35% 30%,#a98be2,#5d37a1);box-shadow:inset 0 0 0 3px #fff,0 1px 2px rgba(52,24,100,.35)}
#engPairCard .ep-opt b{display:block;font-size:13.5px;color:var(--ink-1)}
#engPairCard .ep-opt span.ep-t{display:block;font-size:12.5px;line-height:1.5;color:var(--ink-3)}
#engPairCard .ep-opt:focus-within{outline:3px solid var(--accent,#6a3fb5);outline-offset:2px}
#engPairCard .ep-now{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ink-2);margin-top:2px;padding:6px 12px;border-radius:999px;background:var(--accent-softer,rgba(106,63,181,.08))}
body[data-theme="night"] #engPairCard .ep-dot{background:radial-gradient(circle at 35% 30%,#3a3050,#251e33);box-shadow:inset 0 1px 2px rgba(0,0,0,.6)}
body[data-theme="night"] #engPairCard .ep-opt.on .ep-dot{box-shadow:inset 0 0 0 3px #201a2b,0 1px 2px rgba(0,0,0,.5)}
body[data-theme="night"] #engPairCard .ep-run{color:#6fd8a2;background:rgba(64,192,128,.15)}
@media (max-width:760px){#engPairCard .ep-engs,#engPairCard .ep-opts{grid-template-columns:minmax(0,1fr)}}
body[data-motion="minimal"] #engPairCard,body[data-motion="minimal"] #engPairCard *{transition:none!important;transform:none!important}
@media (prefers-reduced-motion:reduce){#engPairCard,#engPairCard *{transition:none!important;transform:none!important}}
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
var W=window;
function api(){try{var a=typeof deskApi==="function"?deskApi():null;return a&&typeof a.engine_choice==="function"?a:null;}catch(e){return null;}}
function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
var NAMES={lfm3:"LFM3",deepseek41:"DeepSeek V4.1","mistral-large4":"Mistral Large 4"};
function card(){var c=document.getElementById("engPairCard");if(c)return c;var sec=document.getElementById("page-models");if(!sec||!api())return null;
  c=document.createElement("div");c.className="card";c.id="engPairCard";c.innerHTML='<h2 class="sec">The engines on this computer</h2><div id="engPairBody" class="small"></div>';
  sec.appendChild(c);return c;}
var OPTS=[["auto","Automatic (recommended)","Every model runs on the proven engine, except a kind of model only the newer engine can load."],
  ["newer","The newer engine where it can","Every model the newer engine can load runs on it."],
  ["proven","The proven engine only","As before: the newer engine is never used."]];
var COG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M21.2 12h-2.6M5.4 12H2.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3 5.5 5.5"/><circle cx="12" cy="12" r="6.6"/></svg>';
function plate(t,P,on,off,note){return '<div class="ep-eng'+(off?' off':'')+'">'+'<span class="ep-ico">'+COG+'</span><b>'+esc(t)+'</b>'+
  '<span class="ep-v">'+esc(off?note:(P.version||"llama.cpp"))+'</span><span class="ep-k">'+(off?'&nbsp;':(P.kinds?esc(P.kinds+" kinds of model"):"&nbsp;"))+'</span>'+
  (on?'<span class="ep-run"><i></i>Runs now</span>':'')+'</div>';}
function paint(r){var c=card();if(!c)return;var b=c.querySelector("#engPairBody");if(!b)return;r=r||{};var P=r.proven||{},N=r.newer||{};
  var h="";
  if(!N.available){
    h+='<div class="ep-engs">'+plate("The proven engine",P,r.running==="proven",false)+plate("The newer engine",N,false,true,"Not in this copy: a copy built with a newer engine offers the choice here.")+'</div>';
    b.innerHTML=h;return;}
  h+='<div class="ep-engs">'+plate("The proven engine",P,r.running==="proven",false)+plate("The newer engine",N,r.running==="newer",false)+'</div>';
  h+='<p class="ep-line">The newer engine was put in this copy only after its own build\'s self-test answered with it.</p>';
  var only=(N.only||[]).map(function(k){return NAMES[k]||k;});
  if(only.length)h+='<p class="ep-line"><b>Only the newer engine can load:</b></p><div class="ep-chips">'+only.slice(0,12).map(function(x){return '<span class="ep-chip">'+esc(x)+'</span>';}).join("")+(only.length>12?'<span class="ep-chip">and '+(only.length-12)+' more</span>':'')+'</div>';
  h+='<div class="ep-opts" role="radiogroup" aria-label="Which engine runs your models">';
  OPTS.forEach(function(o){var on=(r.choice||"auto")===o[0];
    h+='<label class="ep-opt'+(on?' on':'')+'"><input type="radio" name="engPairChoice" value="'+o[0]+'"'+(on?' checked':'')+'><span class="ep-dot" aria-hidden="true"></span><span><b>'+esc(o[1])+'</b><span class="ep-t">'+esc(o[2])+'</span></span></label>';});
  h+='</div><p class="ep-line">Whichever you choose, if the newer engine cannot load a model, the proven engine loads it at once. A change applies the next time a model loads.</p>';
  h+='<div class="ep-now">'+(r.running==="newer"?"Now: the newer engine runs the loaded model.":r.running==="proven"?"Now: the proven engine runs the loaded model.":"No model is loaded now.")+'</div>';
  b.innerHTML=h;
  [].forEach.call(b.querySelectorAll('input[name="engPairChoice"]'),function(i){i.addEventListener("change",function(){var a=api();if(!a)return;try{if(W.IngSound&&IngSound.play)IngSound.play("keys");}catch(e){}
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
