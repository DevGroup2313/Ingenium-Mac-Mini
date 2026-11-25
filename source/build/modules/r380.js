<style id="r380-css">
/* ============ R380 · ONE COLOUR FOR EACH MODEL, EVERYWHERE (Ingenium 7.81, 25 November 2026) ============
   Her words (25 November 2026): "I want the models colour bubbles to remain consistent throughout the app and actually have a system and
   still keep the full option to customise and change them as I please within the app"; on the preview: "I approve of the previews ...
   For the models colours, I agree with your recommendations."
   What was found: the same model's bubble meant two things. In the top bar, the side list and Mentes's list it said whether the model fits
   this device (ingFitColor: green, amber, red); in Chat's menu, Concordia and Mentes's lenses it was the model's own colour, given in the
   order the models were added; the Engine panel coloured its orbs by fit too.
   The system, as previewed and approved:
   - A model's bubble is its own colour, in every place, by day and by night. Its colour comes from its family (Qwen sapphire, LFM
     aquamarine, Gemma garnet, Llama antique gold, Phi jade, Mistral amber, DeepSeek indigo, SmolLM olive, Granite slate, a model trained
     in Mentes amethyst, any other rose quartz) and its shade from its size, lighter for a smaller model and deeper for a larger one; a
     thinking model stands a step apart from its instruct twin. By night each colour is a little brighter.
   - Whether it fits this device is a small plate beside it where that matters (Mentes's list; the Engine panel says it in words), never a
     change of its colour. The model running now wears a soft halo in its own colour.
   - Hers to change: pressing a model's bubble on Mentes or in the Engine panel opens a chooser (sixteen jewel colours, or any colour at
     all, or its family's colour again). Her choice is kept for that model in every place, over restarts and updates (the model's kept settings,
     ING_PREF_FIELDS, carry its colour; colorOwn and colorSys join them). A colour she picks in a model's Edit sheet counts as hers too.
   - Her answer to "your present colours": every model takes its family's colour once, now; any she changes afterwards stays hers. */
.ing-mc{position:relative;display:inline-block;border-radius:50%;flex:0 0 auto}
.model-pill .swatch,.model-row .swatch,#activeModelPill .swatch{position:relative;overflow:visible}
.model-pill .swatch::before,.model-row .swatch::before,#activeModelPill .swatch::before{content:"";position:absolute;inset:0;border-radius:50%;pointer-events:none;
  background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.9) 0 12%,rgba(255,255,255,.3) 24%,rgba(255,255,255,0) 50%),radial-gradient(circle at 62% 76%,rgba(0,0,0,.22),rgba(0,0,0,0) 62%);
  box-shadow:0 -1px 2px rgba(0,0,0,.25) inset,0 1px 2px rgba(30,15,60,.32)}
.model-pill.running .swatch::after,.model-row.running .swatch::after,#activeModelPill .swatch.ing-running::after,#ingEngine .orb.run::after{content:"";position:absolute;inset:-4px;border-radius:50%;
  border:2px solid var(--mc,currentColor);opacity:.55;animation:ingHalo 2.4s ease-in-out infinite;pointer-events:none}
#ingEngine .orb{position:relative}
@keyframes ingHalo{0%,100%{transform:scale(.9);opacity:.25}50%{transform:scale(1.15);opacity:.75}}
body[data-motion="minimal"] .model-pill.running .swatch::after,body[data-motion="minimal"] .model-row.running .swatch::after,body[data-motion="minimal"] #activeModelPill .swatch.ing-running::after,body[data-motion="minimal"] #ingEngine .orb.run::after{animation:none;opacity:.55}
@media (prefers-reduced-motion:reduce){.model-pill.running .swatch::after,.model-row.running .swatch::after,#activeModelPill .swatch.ing-running::after,#ingEngine .orb.run::after{animation:none}}
/* the bubbles she can press: lift under the pointer, sink when pressed */
.model-row .swatch,#ingEngine .orb[data-mid]{cursor:pointer;transition:transform .3s cubic-bezier(.3,1.7,.5,1),box-shadow .3s}
.model-row .swatch:hover,#ingEngine .orb[data-mid]:hover{transform:scale(1.3) translateY(-1px)}
.model-row .swatch:active,#ingEngine .orb[data-mid]:active{transform:scale(1.02)}
/* the fit, as a plate beside the model (Mentes's list) */
.ing-fitplate{display:inline-block;margin-left:8px;padding:2px 8px;border-radius:8px;font:700 11px/1.4 var(--sans,system-ui,sans-serif);border:1px solid var(--hairline,rgba(106,63,181,.18));
  background:var(--card,#fff);box-shadow:0 2px 0 rgba(96,62,150,.16);vertical-align:middle}
.ing-fitplate.ok{color:var(--ok,#2e8a57)}.ing-fitplate.heavy{color:var(--bad,#b8433f)}.ing-fitplate.unknown{color:var(--warn,#a8701a)}
/* the chooser */
#ingColourPop{position:fixed;z-index:9600;width:314px;padding:16px;border-radius:18px;background:var(--card,#fffdfb);color:var(--ink-1,#2a2140);border:1px solid var(--hairline,rgba(106,63,181,.18));
  box-shadow:0 1px 0 rgba(255,255,255,.8) inset,0 6px 0 rgba(96,62,150,.16),0 24px 48px rgba(40,20,80,.32);font:14px/1.45 var(--sans,system-ui,sans-serif)}
body[data-theme="night"] #ingColourPop{box-shadow:0 1px 0 rgba(255,255,255,.06) inset,0 6px 0 rgba(0,0,0,.45),0 24px 48px rgba(0,0,0,.55)}
#ingColourPop h5{margin:0 0 4px;font:600 15px/1.3 var(--sans,system-ui,sans-serif)}
#ingColourPop .say{font-size:12.5px;color:var(--ink-2,#4b4163);margin:0}
#ingColourPop .sw{display:grid;grid-template-columns:repeat(8,1fr);gap:9px;margin:12px 0}
#ingColourPop .jw{--c:#6a3fb5;width:24px;height:24px;border-radius:50%;border:0;padding:0;cursor:pointer;
  background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.95) 0 10%,rgba(255,255,255,.35) 22%,rgba(255,255,255,0) 48%),radial-gradient(circle at 60% 75%,rgba(0,0,0,.25),rgba(0,0,0,0) 60%),var(--c);
  box-shadow:0 1px 0 rgba(255,255,255,.6) inset,0 -2px 3px rgba(0,0,0,.28) inset,0 2px 3px rgba(30,15,60,.35);transition:transform .3s cubic-bezier(.3,1.7,.5,1)}
#ingColourPop .jw:hover{transform:scale(1.25) translateY(-1px)}
#ingColourPop .jw:active{transform:scale(1.02)}
#ingColourPop .jw.sel{box-shadow:0 0 0 3px var(--card,#fff),0 0 0 5px var(--ink-1,#2a2140)}
#ingColourPop label{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--ink-2,#4b4163)}
#ingColourPop input[type=color]{width:44px;height:30px;border:1px solid var(--hairline,rgba(106,63,181,.18));border-radius:8px;background:none;padding:2px;cursor:pointer;box-shadow:0 2px 0 rgba(96,62,150,.16)}
#ingColourPop .row{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p380"]="started";}catch(_){}
/* R380 · one colour for each model, everywhere: see the note at the top of its styles. window.IngModelColour: {of(m), system(m), choose(m,anchor), paint()} */
(function r380(){"use strict";
if(window.IngModelColour)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function night(){return D.body.getAttribute("data-theme")==="night";}
var FAM=[["Qwen","Sapphire","#3f6bb8",/qwen/i],["LFM","Aquamarine","#23899a",/lfm|liquid/i],["Gemma","Garnet","#b8433f",/gemma/i],["Llama","Antique gold","#b88a3a",/llama/i],
  ["Phi","Jade","#3f8f6a",/\bphi[-_ ]?\d|\bphi\b/i],["Mistral","Amber","#c27a2c",/mistral|ministral|mixtral/i],["DeepSeek","Indigo","#4b52b5",/deepseek/i],["SmolLM","Olive","#6a8a3f",/smol/i],
  ["Granite","Slate","#5f6f86",/granite/i]];
var OWN=["Trained in Mentes","Amethyst","#6a3fb5"],OTHER=["Any other","Rose quartz","#b65f86"];
var JEWELS=["#3f6bb8","#23899a","#b8433f","#b88a3a","#3f8f6a","#c27a2c","#4b52b5","#6a8a3f","#5f6f86","#6a3fb5","#b65f86","#8a63d2","#2f5ea0","#9c3d6b","#7d6a2f","#3a7d8c"];
function words(m){return [m.customName,m.name,m.fileName,m.repo,m.family].filter(Boolean).join(" ");}
function famOf(m){if(m&&(m.trained||m.ownTrained||m.fromScratch))return OWN;var w=words(m||{});for(var i=0;i<FAM.length;i++)if(FAM[i][3].test(w))return FAM[i];return OTHER;}
function sizeOf(m){var b=+m.paramB;if(b>0)return b;var x=/(\d+(?:\.\d+)?)\s*b\b/i.exec(words(m));return x?+x[1]:null;}
function thinks(m){return /think|reason|\br1\b/i.test(words(m));}
function hexToHsl(h){var r=parseInt(h.slice(1,3),16)/255,g=parseInt(h.slice(3,5),16)/255,b=parseInt(h.slice(5,7),16)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,s=0,hh=0;
  if(mx!==mn){var d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);hh=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;hh*=60;}return [hh,s*100,l*100];}
function hslToHex(h,s,l){h=((h%360)+360)%360/360;s=Math.max(0,Math.min(100,s))/100;l=Math.max(0,Math.min(100,l))/100;
  function f(p,q,t){if(t<0)t+=1;if(t>1)t-=1;return t<1/6?p+(q-p)*6*t:t<.5?q:t<2/3?p+(q-p)*(2/3-t)*6:p;}
  var q=l<.5?l*(1+s):l+s-l*s,p=2*l-q;return "#"+[f(p,q,h+1/3),f(p,q,h),f(p,q,h-1/3)].map(function(v){return ("0"+Math.round(v*255).toString(16)).slice(-2);}).join("");}
function okHex(c){return typeof c==="string"&&/^#[0-9a-f]{6}$/i.test(c);}
/* the system's colour for a model, by day: its family's hue, its size's shade, a thinking model a step apart */
function system(m){var c=hexToHsl(famOf(m)[2]),b=sizeOf(m),dl=b==null?0:b<=1.5?12:b<=3?5:b<=5?-1:b<=9?-7:-12;return hslToHex(c[0]+(thinks(m)?-14:0),c[1],c[2]+dl);}
function byNight(hex){var c=hexToHsl(hex);return hslToHex(c[0],c[1]+6,c[2]+12);}
/* a model's own colour now: hers when she chose one, else the system's; by night a little brighter */
function keep(m){try{if(typeof ingModelPrefsKeep==="function")ingModelPrefsKeep(m);}catch(e){}}
function settle(m){if(!m)return;var sys=system(m),ch=false;
  /* a colour she picked in the model's Edit sheet since the system last set one: hers */
  if(!m.colorOwn&&okHex(m.colorSys)&&okHex(m.color)&&m.color.toLowerCase()!==m.colorSys.toLowerCase()){m.colorOwn=true;ch=true;}
  if(m.colorSys!==sys){m.colorSys=sys;ch=true;}
  if(!m.colorOwn&&m.color!==sys){m.color=sys;ch=true;}
  if(ch)keep(m);return ch;}
function of(m){if(!m)return "var(--ink-3)";settle(m);var c=m.colorOwn&&okHex(m.color)?m.color:m.colorSys;return night()?byNight(c):c;}
/* once: every model takes its family's colour (her answer); any she changes afterwards stays hers */
function migrate(){if(!W.state||!Array.isArray(state.models))return;var did=false;
  try{if(typeof ING_PREF_FIELDS!=="undefined"&&Array.isArray(ING_PREF_FIELDS)){if(ING_PREF_FIELDS.indexOf("colorOwn")<0)ING_PREF_FIELDS.push("colorOwn");if(ING_PREF_FIELDS.indexOf("colorSys")<0)ING_PREF_FIELDS.push("colorSys");}}catch(e){}
  if(!state.modelColours){state.models.forEach(function(m){delete m.colorOwn;m.colorSys=system(m);m.color=m.colorSys;keep(m);});state.modelColours=1;did=true;}
  state.models.forEach(function(m){if(settle(m))did=true;});
  if(did)try{saveState();}catch(e){}}
/* the places that drew a model's bubble by its fit now draw its own colour (the top bar, the side list, Mentes's list) */
(function wrapFit(){if(typeof W.ingFitColor!=="function"||W.ingFitColor.__r380)return;var n=function(m){return of(m);};n.__r380=1;W.ingFitColor=ingFitColor=n;})();
function fitOf(m){try{return fitVerdict(m).level;}catch(e){return "unknown";}}
var FITWORD={ok:"Fits",heavy:"Too heavy here",unknown:"Fit not known"};
/* Mentes's list: the fit as a plate beside each model, the halo's colour, and the bubble pressable */
function dressList(){var list=$("modelList");if(!list)return;var rows=list.querySelectorAll(".model-row"),ms=state.models||[];
  [].forEach.call(rows,function(r,i){var m=ms[i];if(!m)return;var sw=r.querySelector(".swatch");if(sw){sw.setAttribute("data-mid",m.id);sw.title="Press to change "+(m.customName||"its")+"'s colour";sw.setAttribute("role","button");sw.tabIndex=0;sw.style.setProperty("--mc",of(m));}
    var nm=r.querySelector(".mname");if(nm&&!nm.querySelector(".ing-fitplate")){var lv=fitOf(m),p=D.createElement("span");p.className="ing-fitplate "+lv;p.textContent=FITWORD[lv]||FITWORD.unknown;nm.appendChild(p);}});}
function paintPill(){var ps=D.querySelector("#activeModelPill .swatch");if(!ps)return;var m=(state.models||[]).filter(function(x){return x.id===state.activeModelId;})[0];if(m){ps.style.background=of(m);ps.style.setProperty("--mc",of(m));}}
/* the side list, and the top bar's key with it: each drawn again whenever the side list is */
function dressDock(){[].forEach.call(D.querySelectorAll("#dockModels .model-pill .swatch"),function(sw){sw.style.setProperty("--mc",sw.style.background||"currentColor");});paintPill();}
function paint(){try{renderDockModels();}catch(e){}try{var pg=$("page-models");if(pg&&pg.classList.contains("active"))renderModels();else dressList();}catch(e){}paintPill();dressDock();
  try{if(W.IngEnginePanel&&IngEnginePanel.isOpen())IngEnginePanel.paint();}catch(e){}
  try{var bp=$("page-blend");if(bp&&bp.classList.contains("active")&&typeof renderBlend==="function")renderBlend();}catch(e){}}
(function wrapRenders(){[["renderModels",dressList],["renderDockModels",dressDock]].forEach(function(x){var o=W[x[0]];if(typeof o!=="function"||o.__r380)return;
  var n=function(){var r=o.apply(this,arguments);try{x[1]();}catch(e){}return r;};n.__r380=1;W[x[0]]=n;try{if(x[0]==="renderModels")renderModels=n;else renderDockModels=n;}catch(e){}});})();
/* the chooser */
var pop=null,popM=null;
function close(){if(pop){pop.remove();pop=null;popM=null;D.removeEventListener("pointerdown",outside,true);}}
function outside(e){if(pop&&!pop.contains(e.target)&&!(e.target.closest&&e.target.closest("[data-mid]")))close();}
function choose(m,anchor){close();if(!m)return;popM=m;pop=D.createElement("div");pop.id="ingColourPop";pop.setAttribute("role","dialog");pop.setAttribute("aria-label",(m.customName||"The model")+"'s colour");
  var f=famOf(m),own=m.colorOwn&&okHex(m.color);
  var h='<h5></h5><p class="say"></p><div class="sw">';JEWELS.forEach(function(c){h+='<button type="button" class="jw'+(own&&m.color.toLowerCase()===c?" sel":"")+'" data-c="'+c+'" style="--c:'+(night()?byNight(c):c)+'" title="'+c+'" aria-label="The colour '+c+'"></button>';});
  h+='</div><label>Any colour <input type="color" value="'+(okHex(m.color)?m.color:"#6a3fb5")+'"></label><div class="row"><button type="button" class="btn small" data-fam="1">Its family\'s colour</button><button type="button" class="btn small primary" data-done="1">Done</button></div>';
  pop.innerHTML=h;pop.querySelector("h5").textContent=m.customName||m.name||"Model";
  pop.querySelector(".say").textContent=own?"Your own colour, kept in every place.":"Its family's colour: "+f[1]+" ("+f[0]+"), in the shade of its size.";
  D.body.appendChild(pop);var r=anchor?anchor.getBoundingClientRect():{left:innerWidth/2,bottom:innerHeight/2,top:innerHeight/2};
  var x=Math.min(innerWidth-330,Math.max(8,r.left-140)),y=r.bottom+12;if(y+270>innerHeight)y=Math.max(8,r.top-282);pop.style.left=x+"px";pop.style.top=y+"px";
  function set(c,mine){m.color=c;m.colorOwn=!!mine;if(!mine)m.color=system(m);m.colorSys=system(m);keep(m);try{saveState();}catch(e){}paint();}
  [].forEach.call(pop.querySelectorAll(".jw"),function(b){b.onclick=function(){set(b.getAttribute("data-c"),true);choose(m,anchorOf(m)||anchor);};});
  pop.querySelector("input[type=color]").oninput=function(e){set(e.target.value,true);};
  pop.querySelector("[data-fam]").onclick=function(){set(null,false);choose(m,anchorOf(m)||anchor);};
  pop.querySelector("[data-done]").onclick=close;
  setTimeout(function(){D.addEventListener("pointerdown",outside,true);},0);
  try{if(W.IngSound&&IngSound.play)IngSound.play("paper");}catch(e){}}
function anchorOf(m){return D.querySelector('[data-mid="'+m.id+'"]');}
function modelById(id){return (state.models||[]).filter(function(x){return x.id===id;})[0]||null;}
D.addEventListener("click",function(e){var t=e.target&&e.target.closest?e.target.closest(".model-row .swatch[data-mid],#ingEngine .orb[data-mid]"):null;if(!t)return;
  e.preventDefault();e.stopPropagation();var m=modelById(t.getAttribute("data-mid"));if(m)choose(m,t);},true);
D.addEventListener("keydown",function(e){if(e.key==="Escape"&&pop){close();return;}var t=e.target;if(!(t&&t.matches&&t.matches(".model-row .swatch[data-mid]")))return;if(e.key==="Enter"||e.key===" "){e.preventDefault();var m=modelById(t.getAttribute("data-mid"));if(m)choose(m,t);}});
/* by night, every bubble its night shade */
try{new MutationObserver(function(){paint();if(pop&&popM){var m=popM;choose(m,anchorOf(m));}}).observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}
function boot(){try{migrate();paint();}catch(e){try{console.warn("Ingenium colours:",e);}catch(_){}}}
(function wait(){var n=0;(function w(){if(W.__ingReady===true&&W.state){boot();setTimeout(boot,3000);return;}if(++n<400)setTimeout(w,500);})();})();
W.IngModelColour={of:of,system:system,family:function(m){return famOf(m).slice(0,3);},choose:choose,paint:paint,migrate:migrate};
})();
;try{window.__ingParts["p380"]="running";}catch(_){}
</script>
