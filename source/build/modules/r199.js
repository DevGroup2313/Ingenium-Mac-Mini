<style id="r199-css">
/* ============ R199 · THE STUDIO'S ROOMS, AND WHAT CAN BE TRAINED HERE (Ingenium 6.9.x, 31 October 2026) ============
   The owner's words (31 October 2026): "I want to expand on the parameters of what Ingenium can do as a serious coding and
   creating workbench with and without AI. I want to be able to create and train all kinds of AI models, even Frontier level
   AI models inside of the app."
   The Studio (the Models page's room since 6.7, modules/r173.js) held three cards in one column. It now has rooms of its
   own, shown one at a time as the page's rooms are, under the Studio's tab: Make (Your own AIs, Convert a model), Data
   (datasets from her own work, modules/r200.js), Train (what this device can train, the trainer for a computer, the
   learning workbench for every device, modules/r201.js), Measure (what the figures say and do not say) and Elsewhere
   (training that needs another machine). The cards are moved, never copied: every id and handler stays, and a card that
   comes later is filed by its id, then by the words of its heading. Anything that scrolls to, focuses or rings a card in a
   closed room opens that room first, as r173 does for the page's rooms.
   "What can be trained here" is the Studio's truth card. It reads this device's memory and cores (the computer app's own
   facts through its bridge; a browser's or a phone's hint otherwise) and says, in plain words with the arithmetic and its
   sources, what training can happen here: small models from zero as lessons; training further of a model she has, up to
   what the memory rule allows (parameters x 16 bytes + 0.6 GB, within 70% of the memory; measured only at 135 million);
   LoRA on 1-8B models, which needs a graphics chip or a rented machine and is not here yet; and why frontier-scale training
   (hundreds of billions of parameters, trillions of tokens, tens of thousands of graphics chips, millions of dollars)
   cannot happen on any of her devices or at a price anyone at home could pay. The figures: Meta's report on Llama 3.1
   (3.8 x 10^25 operations, 15.6 trillion tokens, up to 16,384 H100s), DeepSeek's report on V3 (2.788 million H800 hours,
   about US$5.6 million for the final run), Hoffmann et al. 2022 (about 20 tokens a parameter), llama.cpp's own note on its
   trainer, and Ingenium's own measurements (source/rig/train_sizes.txt). There is no "frontier" key anywhere. */
#page-models .st-bar{margin:2px 0 14px;padding:12px 14px 10px;border:1px solid var(--hairline);border-radius:14px;background:var(--rm-wellbg,rgba(34,26,46,.035));box-shadow:var(--rm-well,inset 0 1px 2.5px rgba(40,22,68,.09))}
#page-models .st-lab{display:block;margin:0 2px 8px;font:600 11.5px/1.3 var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
#page-models .st-tabs{display:flex;flex-wrap:wrap;gap:7px;min-width:0}
#page-models .st-tab{position:relative;display:inline-flex;align-items:center;gap:7px;min-height:36px;margin:0;padding:6px 14px 6px 11px;border-radius:999px;border:1px solid var(--hairline);
  background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop);color:var(--ink-2);font:600 13px/1.25 var(--sans);cursor:pointer;white-space:nowrap;
  -webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:transform .16s var(--spring),box-shadow .16s ease,color .15s ease,border-color .15s ease}
#page-models .st-tab[hidden]{display:none !important}
#page-models .st-tab svg{flex:0 0 auto;width:15px;height:15px;color:var(--accent)}
#page-models .st-tab:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop));color:var(--ink-1)}
#page-models .st-tab:active{transform:translateY(1px);transition-duration:.06s}
#page-models .st-tab[aria-selected="true"]{color:#fff;background:linear-gradient(180deg,var(--rm-pa,#7348be),var(--rm-pb,#5d37a1));border-color:var(--rm-pedge,#4b2a86);box-shadow:var(--rm-psh);text-shadow:0 1px 1px rgba(30,10,60,.32);transform:none}
#page-models .st-tab[aria-selected="true"] svg{color:#fff}
#page-models .st-tab:focus-visible{outline:2.5px solid var(--rm-focus,var(--accent));outline-offset:3px}
#page-models .st-says{margin:10px 2px 0;font-size:13px;line-height:1.5;color:var(--ink-2);max-width:72ch}
#page-models .st-room[hidden]{display:none !important}
#page-models .st-room > .card{scroll-margin-top:84px}
body:not([data-motion="minimal"]) #page-models .st-room.st-in{animation:rmIn .26s var(--spring) both}
/* the truth card */
#ingTruthCard .tr-dev{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 14px;margin:0 0 12px;font-size:13.5px;line-height:1.5;color:var(--ink-1)}
#ingTruthCard .tr-dev b{font-weight:650}
#ingTruthCard .tr-bands{list-style:none;margin:0;padding:0;display:grid;gap:10px}
#ingTruthCard .tr-band{display:grid;grid-template-columns:118px minmax(0,1fr);gap:4px 14px;padding:12px 14px;border:1px solid var(--hairline);border-radius:12px;background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop)}
#ingTruthCard .tr-band .tr-tag{font:700 11px/1.4 var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--accent);align-self:start;padding-top:3px}
#ingTruthCard .tr-band .tr-tag.no{color:var(--ink-3)}
#ingTruthCard .tr-band b{display:block;font:650 14px/1.35 var(--sans);color:var(--ink-1);margin-bottom:3px}
#ingTruthCard .tr-band p{margin:0;font-size:13px;line-height:1.55;color:var(--ink-2)}
#ingTruthCard .tr-band p + p{margin-top:5px}
#ingTruthCard .tr-sum{margin:12px 2px 0;font-size:13px;line-height:1.55;color:var(--ink-2)}
#ingTruthCard details.tr-math{margin-top:12px}
#ingTruthCard details.tr-math > summary{cursor:pointer;font:600 13px/1.4 var(--sans);color:var(--ink-1);padding:4px 2px}
#ingTruthCard .tr-math dl{margin:8px 0 0;display:grid;grid-template-columns:minmax(120px,max-content) minmax(0,1fr);gap:6px 14px;font-size:12.5px;line-height:1.5}
#ingTruthCard .tr-math dt{font-weight:650;color:var(--ink-1)}
#ingTruthCard .tr-math dd{margin:0;color:var(--ink-2)}
#ingTruthCard .tr-src{margin:10px 2px 0;font-size:12px;line-height:1.55;color:var(--ink-3)}
#ingTruthCard .tr-src li{margin:3px 0}
@media (max-width:600px){#ingTruthCard .tr-band{grid-template-columns:minmax(0,1fr)}#ingTruthCard .tr-math dl{grid-template-columns:minmax(0,1fr)}#ingTruthCard .tr-math dd{margin-bottom:4px}}
/* Measure and Elsewhere */
#ingMeasureCard .ms-list,#ingElsewhereCard .ew-list{margin:6px 0 0;padding-left:18px;font-size:13px;line-height:1.55;color:var(--ink-2)}
#ingMeasureCard .ms-list li,#ingElsewhereCard .ew-list li{margin:5px 0}
#ingMeasureCard .ms-list b,#ingElsewhereCard .ew-list b{color:var(--ink-1)}
#ingMeasureCard .ms-acts,#ingElsewhereCard .ew-acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
#ingMeasureCard .ms-run{margin-top:14px;padding:12px 14px;border:1px solid var(--hairline);border-radius:12px;background:var(--rm-wellbg,rgba(34,26,46,.035))}
#ingMeasureCard .ms-run h3{margin:0 0 6px;font:650 14px/1.35 var(--sans);color:var(--ink-1)}
#ingMeasureCard .ms-run label.field{margin:8px 0 0}
#ingMeasureCard .ms-run select{max-width:100%}
#ingMeasureCard .ms-paste{width:100%;box-sizing:border-box;margin-top:8px;padding:8px 10px;border-radius:10px;border:1px solid var(--hairline);background:var(--card);color:inherit;font:13px/1.5 var(--sans)}
#ingMeasureCard .ms-out{margin-top:8px;min-height:18px;line-height:1.5;color:var(--ink-1)}
#ingMeasureCard .ms-out.bad{color:var(--danger,#b3261e)}
/* (the way back to Ingenium's choice is styled in modules/r105.js: text only since 6.9.2, purple and bold since 6.9.3) */
@media (prefers-reduced-motion:reduce){#page-models .st-tab{transition:none !important}#page-models .st-room.st-in{animation:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p199"]="started";}catch(_){}
/* R199 · the Studio's rooms and its truth card: see the note at the top of its styles.
   window.IngStudio: open(room, remember), current(), rooms(), fileCard(el), device(), bands(), refresh(). */
(function r199(){"use strict";
if(window.IngStudio)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function att(e,o){for(var k in o)if(Object.prototype.hasOwnProperty.call(o,k))e.setAttribute(k,o[k]);return e;}
function warn(e){try{console.warn("Ingenium studio:",e&&e.message||e);}catch(_){}}
function lively(){try{if(D.body&&D.body.getAttribute("data-motion")==="minimal")return false;return !(W.matchMedia&&W.matchMedia("(prefers-reduced-motion: reduce)").matches);}catch(e){return false;}}
function svg(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>';}
var IC={make:svg('<path d="M4 20h16"/><path d="M14.5 4.5l5 5L9 20H4v-5z"/>'),
  data:svg('<rect x="3.5" y="4" width="17" height="5" rx="1.5"/><path d="M5 9v9.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V9"/><path d="M10 13h4"/>'),
  train:svg('<path d="M4 18L10 11l4 4 6-8"/><path d="M4 21h16"/>'),
  measure:svg('<path d="M4 20V8M4 20h16"/><path d="M8 16v-4M12 16V9M16 16v-6"/>'),
  elsewhere:svg('<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c3 2.6 3 14.4 0 17M12 3.5c-3 2.6-3 14.4 0 17"/>')};

/* ---------- the rooms ---------- */
var ROOMS=[
  {k:"make",t:"Make",says:"Make an AI of your own without training: a name and instructions on any model you have, or a model's file converted so the engine can run it.",
    ids:["aiCard","convCard"],words:/own ai|your own|convert|instructions/},
  {k:"data",t:"Data",says:"Datasets from your own work: your chats, documents, notes and pages, reviewed by you before any training.",
    ids:["ingDataCard"],words:/dataset|data from|your text|corpus/},
  {k:"train",t:"Train",says:"Training here: what this device can manage, said plainly; the trainer on a computer; the learning workbench on every device.",
    ids:["ingTruthCard","trainCard","ingLabCard"],words:/train|lesson|workbench|learn/},
  {k:"measure",t:"Measure",says:"How well a model learned: the figures that can be measured here, and what they do not say.",
    ids:["ingMeasureCard"],words:/measure|how good|how well|perplex|test/},
  {k:"elsewhere",t:"Elsewhere",says:"Training that needs another machine (a graphics chip, a rented computer), and how a model made elsewhere comes in.",
    ids:["ingElsewhereCard"],words:/elsewhere|rented|graphics|another machine/}];
var KEY="ing.studio.v1",PREF={};
try{var raw=W.localStorage.getItem(KEY);PREF=raw?JSON.parse(raw):{};}catch(e){PREF={};}
if(!PREF||typeof PREF!=="object")PREF={};
function keep(){try{W.localStorage.setItem(KEY,JSON.stringify(PREF));}catch(e){}}
var S=null;  /* the Studio as built: {panel, bar, tabs, rooms (panels), says, cur} */
var MINE=/(^|\s)(st-bar|st-room|rm-bar|rm-panel|rm-hint|rm-roomh|rm-steps|rm-stepnav)(\s|$)/;
function isCard(e){if(!e||e.nodeType!==1)return false;if(/^(H1|STYLE|SCRIPT|TEMPLATE|LINK|META|INPUT|NOSCRIPT|P)$/.test(e.tagName))return false;
  var c=typeof e.className==="string"?e.className:"";if(MINE.test(c))return false;
  return e.classList.contains("card")||!!e.querySelector("h2,h3");}
function headText(c){var h=c.querySelector("h2,h3,[id$='-h'],b,strong");return h?String(h.textContent||"").replace(/\s+/g," ").trim().toLowerCase():"";}
function roomFor(c){var h=headText(c),i,j;
  for(i=0;i<ROOMS.length;i++)for(j=0;j<ROOMS[i].ids.length;j++)if(c.id===ROOMS[i].ids[j])return {k:ROOMS[i].k,rank:j};
  for(i=0;i<ROOMS.length;i++)if(ROOMS[i].words.test(h))return {k:ROOMS[i].k,rank:200};
  return {k:"make",rank:300};}
function fileCard(c){if(!S||!isCard(c))return false;var r=roomFor(c),p=S.rooms[r.k];if(!p)return false;c.__stRank=r.rank;
  if(c.parentNode===p){return false;}
  var before=null,kids=p.children;for(var i=0;i<kids.length;i++){var e=kids[i];if(!isCard(e)||e===c)continue;var rk=e.__stRank==null?roomFor(e).rank:e.__stRank;if(rk>r.rank){before=e;break;}}
  p.insertBefore(c,before);return true;}
function fileAll(){if(!S)return;[].slice.call(S.panel.children).forEach(function(e){if(isCard(e))fileCard(e);});
  ROOMS.forEach(function(rm){[].slice.call(S.rooms[rm.k].children).forEach(function(e){if(isCard(e)&&roomFor(e).k!==rm.k)fileCard(e);});});
  shown();}
function has(k){var p=S.rooms[k];if(!p)return false;for(var i=0;i<p.children.length;i++){var e=p.children[i];if(isCard(e)&&!e.hidden){var d="";try{d=getComputedStyle(e).display;}catch(_){}if(d!=="none")return true;}}return false;}
function first(){for(var i=0;i<ROOMS.length;i++)if(!S.tabs[ROOMS[i].k].hidden)return ROOMS[i].k;return null;}
function shown(){var changed=false;ROOMS.forEach(function(rm){var on=has(rm.k),t=S.tabs[rm.k];if(t.hidden===on){t.hidden=!on;changed=true;}});
  if(!S.cur||S.tabs[S.cur].hidden)show(first(),{});
  /* the room chosen last, once its card has arrived (a card made by a later part), unless she chose one in this session */
  else if(changed&&!S.picked&&PREF.room&&S.tabs[PREF.room]&&!S.tabs[PREF.room].hidden&&S.cur!==PREF.room)show(PREF.room,{});}
function show(k,o){o=o||{};if(!S)return;if(!k||!S.tabs[k]||S.tabs[k].hidden)k=first();if(!k)return;var was=S.cur;S.cur=k;S.panel.setAttribute("data-st-room",k);
  ROOMS.forEach(function(rm){var on=rm.k===k,t=S.tabs[rm.k],p=S.rooms[rm.k];t.setAttribute("aria-selected",on?"true":"false");t.tabIndex=on?0:-1;
    if(p.hidden===on)p.hidden=!on;
    if(on&&was&&was!==k&&lively()){p.classList.remove("st-in");void p.offsetWidth;p.classList.add("st-in");}});
  var rm=ROOMS.filter(function(r){return r.k===k;})[0];if(rm&&S.says.textContent!==rm.says)S.says.textContent=rm.says;
  if(o.keep){PREF.room=k;S.picked=true;keep();}
  if(o.focus){try{S.tabs[k].focus();}catch(e){}}
  if(was!==k){try{W.dispatchEvent(new Event("resize"));}catch(e){}}}
function tabKeys(e){var k=e.key;if(k!=="ArrowLeft"&&k!=="ArrowRight"&&k!=="Home"&&k!=="End")return;
  var bs=ROOMS.map(function(rm){return S.tabs[rm.k];}).filter(function(b){return !b.hidden;}),i=bs.indexOf(D.activeElement);if(i<0)return;
  e.preventDefault();var j=k==="Home"?0:k==="End"?bs.length-1:(i+(k==="ArrowRight"?1:-1)+bs.length)%bs.length;
  show(bs[j].getAttribute("data-st"),{keep:true,focus:true});}
function build(){if(S)return S;var panel=$("rmP-models-studio");if(!panel)return null;
  S={panel:panel,tabs:{},rooms:{},cur:null};
  var bar=mk("div","st-bar");bar.id="stBar";bar.appendChild(att(mk("span","st-lab","The Studio's rooms"),{id:"stLab"}));
  var tl=att(mk("div","st-tabs"),{role:"tablist","aria-label":"The Studio's rooms"});tl.id="stTabs";
  var says=att(mk("p","st-says"),{id:"stSays","aria-live":"polite"});S.says=says;
  ROOMS.forEach(function(rm){var t=att(mk("button","st-tab"),{type:"button",role:"tab",id:"stT-"+rm.k,"aria-selected":"false","data-st":rm.k,"aria-controls":"stP-"+rm.k});
    t.tabIndex=-1;t.innerHTML=IC[rm.k]||"";t.appendChild(mk("span",null,rm.t));t.title=rm.says;
    t.addEventListener("click",function(){show(rm.k,{keep:true});});tl.appendChild(t);S.tabs[rm.k]=t;});
  tl.addEventListener("keydown",tabKeys);bar.appendChild(tl);bar.appendChild(says);
  /* the bar after r173's own room heading (shown only when every setting is shown at once; here, nothing) */
  var hd=panel.querySelector(":scope > .rm-roomh");panel.insertBefore(bar,hd?hd.nextSibling:panel.firstChild);S.bar=bar;
  ROOMS.forEach(function(rm){var p=att(mk("div","st-room"),{role:"tabpanel",id:"stP-"+rm.k,"aria-labelledby":"stT-"+rm.k,"aria-describedby":"stSays","data-st":rm.k});p.hidden=true;
    panel.appendChild(p);S.rooms[rm.k]=p;});
  fileAll();
  var want=PREF.room;show(want&&S.tabs[want]&&!S.tabs[want].hidden?want:first(),{});
  var T=0;function soon(){if(T)return;T=setTimeout(function(){T=0;try{fileAll();}catch(e){warn(e);}},0);}
  try{var mo=new MutationObserver(soon);mo.observe(panel,{childList:true});ROOMS.forEach(function(rm){mo.observe(S.rooms[rm.k],{childList:true,attributes:true,attributeFilter:["hidden"]});});}catch(e){}
  return S;}
/* a card in a closed room: its room opens first (quietly), as r173 does for the page's rooms */
function roomOf(el){if(!S||!el||el.nodeType!==1||!el.closest)return null;var p=el.closest(".st-room");return p&&p.parentNode===S.panel?p.getAttribute("data-st"):null;}
function autoReveal(el){var k=roomOf(el);if(k&&k!==S.cur&&!S.tabs[k].hidden)show(k,{});return k;}
(function wrap(){try{var EP=Element.prototype,oS=EP.scrollIntoView;if(!oS.__r199){var nS=function(){try{autoReveal(this);}catch(e){}return oS.apply(this,arguments);};nS.__r199=1;EP.scrollIntoView=nS;}
  var oIf=EP.scrollIntoViewIfNeeded;if(typeof oIf==="function"&&!oIf.__r199){var nI=function(){try{autoReveal(this);}catch(e){}return oIf.apply(this,arguments);};nI.__r199=1;EP.scrollIntoViewIfNeeded=nI;}
  var HP=HTMLElement.prototype,oF=HP.focus;if(!oF.__r199){var nF=function(){try{if(this.isConnected)autoReveal(this);}catch(e){}return oF.apply(this,arguments);};nF.__r199=1;HP.focus=nF;}}catch(e){warn(e);}})();
function wrapRooms(){var R=W.IngRooms;if(!R||R.__r199)return;R.__r199=1;var oR=R.reveal;
  R.reveal=function(el,o){try{if(S)autoReveal(el);}catch(e){}return oR.apply(this,arguments);};}
function helpHook(){if(D.__r199help)return;D.__r199help=1;
  D.addEventListener("click",function(e){try{var b=e.target&&e.target.closest&&e.target.closest("#ihPanel button");if(!b||!b.querySelector(".ih-show")||!S)return;
    var H=W.IngHelp;if(!H||!H.pages)return;var lab=b.getAttribute("aria-label")||"",ks=[H.page&&H.page()].concat(Object.keys(H.pages));
    for(var j=0;j<ks.length;j++){var pg=H.pages[ks[j]];if(!pg||!pg.dos)continue;for(var i=0;i<pg.dos.length;i++)if(lab.indexOf(pg.dos[i][0]+".")===0){
      String(pg.dos[i][2]||"").split(/\s*,\s*/).some(function(q){var n=null;try{n=D.querySelector(q);}catch(_){}if(n&&roomOf(n)){autoReveal(n);return true;}return false;});return;}}}catch(err){}},true);}
function wrapTour(){var o=W.tourRing;if(typeof o!=="function"||o.__r199)return;
  var n=function(sel){try{var s=Array.isArray(sel)?sel:[sel];for(var i=0;i<s.length;i++){var e=null;try{e=D.querySelector(s[i]);}catch(_){}if(e&&roomOf(e)){autoReveal(e);break;}}}catch(e){}return o.apply(this,arguments);};
  n.__r199=1;try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}W.tourRing=n;}

/* ---------- what can be trained here ---------- */
function api(){try{return typeof trainApi==="function"?trainApi():null;}catch(e){return null;}}
function phone(){try{return !!(typeof INB!=="undefined"&&INB)||/Android|iPhone|iPad|iPod|Silk|Kindle/i.test(navigator.userAgent||"");}catch(e){return false;}}
function device(){var mem=null,cores=null,from="browser";
  try{if(W.__INGENIUM_DEVICE&&W.__INGENIUM_DEVICE.ramGB){mem=+W.__INGENIUM_DEVICE.ramGB;cores=+W.__INGENIUM_DEVICE.cores||null;from="app";}}catch(e){}
  if(mem==null){try{if(typeof deviceMemGB==="function")mem=deviceMemGB();}catch(e){}}
  if(cores==null){try{if(typeof deviceCores==="function")cores=deviceCores();}catch(e){}}
  if(mem==null){try{var m=navigator.deviceMemory;if(typeof m==="number"&&m>0)mem=m;}catch(e){}}
  if(cores==null){try{var c=navigator.hardwareConcurrency;if(typeof c==="number"&&c>0)cores=c;}catch(e){}}
  var kind=api()?"computer":phone()?"phone":"browser";
  return {memGB:mem,cores:cores,from:from,kind:kind,trainer:!!api()};}
/* the trainer's own rule (ingenium_app.py _train_need_gb): parameters x 16 bytes + 0.6 GB, and it fits within 70% of the memory */
function fitsParams(memGB){if(!(memGB>0))return null;return Math.max(0,(memGB*0.7-0.6)/16e-9);}
function millions(n){if(n==null)return "";if(n>=1e9)return (n/1e9).toFixed(1).replace(/\.0$/,"")+" billion";var m=n/1e6;return (m>=100?Math.round(m/10)*10:Math.round(m)).toLocaleString("en-GB")+" million";}
var PACE=6*134515008*57000/996;   /* operations a second, from the one measured pass of SmolLM2 135M (train_sizes.txt part 4): about 4.6 x 10^10 */
var LLAMA={params:405e9,flops:3.8e25,tokens:15.6e12,gpus:16384},DS={total:671e9,active:37e9,tokens:14.8e12,hours:2.788e6,usd:5.6e6};
function sci(x){var e=Math.floor(Math.log10(x)),m=x/Math.pow(10,e);return (Math.round(m*10)/10)+" × 10^"+e;}
function years(s){return s/31557600;}
function bands(dv){dv=dv||device();var mem=dv.memGB,fit=fitsParams(mem),out=[];
  var small={k:"small",tag:"Here",t:"Small models from zero, as lessons",
    p:["A model of 1.3 to 41 million numbers, trained on your own text from random numbers, learns its words, its punctuation and short phrases. Measured here: the tiny model, eight passes over 150,000 characters, in 140 seconds; its held-back loss ended at 5.85 against 7.62 for guessing at random. It shows how a model learns. It does not converse."+
      (dv.kind==="computer"?" The Trainer tab does this with llama.cpp's trainer on this computer; the Workbench tab also trains small models in this page.":" The Workbench tab trains a character model in this very page, on this device.")]};
  out.push(small);
  var further={k:"further",tag:dv.kind==="computer"?"On this computer":"On a computer",t:"Training further a model you have",
    p:[]};
  if(dv.kind==="computer"){
    if(fit!=null)further.p.push("With "+mem+" GB of memory, the trainer's rule (each number needs 16 bytes while it trains, plus 0.6 GB, within 70% of the memory) allows a model of up to about "+millions(fit)+" numbers"+(fit<1.3e8?" (less than the smallest open model offered for training, SmolLM2 135M)":fit<4e8?": SmolLM2 135M fits; 360M does not":fit<1e9?": SmolLM2 135M and 360M fit; a model of about 1 billion does not":"")+".");
    else further.p.push("The trainer's rule: each number needs 16 bytes while it trains, plus 0.6 GB, within 70% of the memory; this app has not read the memory yet.");
    further.p.push("Measured only at 135 million (SmolLM2 135M, one pass over 120,000 characters: 996 seconds on 3 threads; held-out perplexity 23.13 to 21.68, and it still answered in chat). Not measured above 135 million: llama.cpp's own note says a 1B model needs about 24 GB. Only Llama-shaped models in 32, 16 or 8 bits can be trained; it runs on the processor, not the graphics chip. It learns your text's manner; it adds no reliable facts.");}
  else further.p.push("llama.cpp's trainer runs in the Ingenium app on a Mac or Windows computer. On a 16 GB computer its rule allows a model of up to about 660 million numbers; measured only at 135 million (SmolLM2 135M). Not on this "+(dv.kind==="phone"?"phone or tablet":"browser")+".");
  out.push(further);
  out.push({k:"lora",tag:"Not yet",t:"LoRA on models of 1 to 8 billion",
    p:["LoRA trains a small set of extra numbers beside a model left as it is, so a 1-8B model can learn your manner. It needs a graphics chip the trainer can use, or a rented machine; Ingenium's trainer uses the processor only, and nothing in Ingenium trains, applies or merges a LoRA yet. Planned for later; no date is promised."]});
  var yrs=years(LLAMA.flops/PACE),tb=LLAMA.params*16/1e12,opt135=6*134515008*20*134515008,opt41=6*40.6e6*20*40.6e6;
  out.push({k:"frontier",tag:"Not at home",t:"Frontier-scale training",
    p:["A frontier model has hundreds of billions of numbers and reads trillions of pieces of text on tens of thousands of graphics chips, for millions of dollars. Meta reports that Llama 3.1 405B took "+sci(LLAMA.flops)+" operations over 15.6 trillion tokens on up to 16,384 H100 chips. This trainer manages about "+sci(PACE)+" operations a second, so that run would take it about "+Math.round(yrs/1e6)+" million years, and the model's training state alone (16 bytes a number) would need about "+tb.toFixed(1)+" TB of memory"+(mem?", against "+mem+" GB here":"")+". DeepSeek reports V3 (671 billion numbers, 37 billion at work on each word) took 2.788 million H800 hours, about US$5.6 million for the final run alone.",
      "Even a well-proportioned 135-million model from zero (about 20 pieces of text a number) is about "+sci(opt135)+" operations and 10 GB of text: a year and a half here. The Large size here (41 million) would want about "+Math.round(years(opt41/PACE)*365)+" days and 3 GB of text. This is not a shortcoming of your computer: no device at home, and no rented machine at a price a person could reasonably pay, trains a model at frontier scale. What home training teaches is manner and form; what a model should know of your sources is better given to it as sources (your files, your Fontes, your notes beside the chat)."]});
  return out;}
function card(){var c=$("ingTruthCard");if(c)return c;c=att(mk("div","card"),{id:"ingTruthCard",role:"region","aria-labelledby":"ingTruthH"});
  var h=mk("h2","sec","What can be trained here");h.id="ingTruthH";c.appendChild(h);
  c.appendChild(mk("p","small muted","Plain words about what this device can and cannot train, with the arithmetic and where its figures come from. Nothing here is a limit Ingenium chose: it is what the hardware and the trainer allow."));
  c.appendChild(att(mk("div","tr-dev"),{id:"ingTruthDev"}));c.appendChild(att(mk("ul","tr-bands"),{id:"ingTruthBands","aria-label":"What can be trained, band by band"}));
  var d=mk("details","tr-math"),sm=mk("summary",null,"The arithmetic, and where the figures come from");d.appendChild(sm);d.appendChild(att(mk("dl"),{id:"ingTruthMath"}));
  var src=mk("ol","tr-src");src.id="ingTruthSrc";d.appendChild(src);c.appendChild(d);
  return c;}
function paint(){var c=card(),dv=device(),dev=c.querySelector("#ingTruthDev"),ul=c.querySelector("#ingTruthBands"),dl=c.querySelector("#ingTruthMath"),src=c.querySelector("#ingTruthSrc");
  dev.innerHTML="";var where=dv.kind==="computer"?"This computer":dv.kind==="phone"?"This phone or tablet":"This browser";
  var b=mk("b",null,where+": ");dev.appendChild(b);
  var memT=dv.memGB?(dv.from==="app"?dv.memGB+" GB of memory":"about "+dv.memGB+" GB of memory (a browser's hint: browsers round it and name at most 8)"):(dv.kind==="browser"||dv.kind==="phone"?"memory not reported by this browser":"memory not read yet");
  dev.appendChild(mk("span",null,memT+(dv.cores?", "+dv.cores+" processor core"+(dv.cores===1?"":"s"):"")+"."+(dv.kind==="computer"?(dv.trainer?" The trainer (llama-finetune) is here.":" The trainer is not in this copy."):"")));
  ul.innerHTML="";bands(dv).forEach(function(bd){var li=mk("li","tr-band");li.setAttribute("data-band",bd.k);li.appendChild(mk("span","tr-tag"+(/^Not/.test(bd.tag)?" no":""),bd.tag));var body=mk("div");body.appendChild(mk("b",null,bd.t));bd.p.forEach(function(t){body.appendChild(mk("p",null,t));});li.appendChild(body);ul.appendChild(li);});
  var fit=fitsParams(dv.memGB);dl.innerHTML="";
  [["The memory rule","parameters × 16 bytes (the weight, its gradient and the optimiser's two moments, 4 bytes each) + 0.6 GB, and it fits within 70% of the memory (ingenium_app.py, _train_need_gb)."+(fit!=null?" Here: (0.7 × "+dv.memGB+" GB − 0.6 GB) ÷ 16 bytes = about "+millions(fit)+" numbers.":" With 16 GB: about 660 million; 24 GB: about 1 billion; 32 GB: about 1.4 billion.")],
   ["This trainer's pace","6 operations a number a token, over 134.5 million numbers and about 57,000 token positions (120,000 characters at about 4.2 a token, read twice, as llama.cpp reads the text in windows that overlap by half) in 996 seconds: about "+sci(PACE)+" operations a second."],
   ["Llama 3.1 405B",sci(LLAMA.flops)+" operations ÷ "+sci(PACE)+" a second = about "+Math.round(years(LLAMA.flops/PACE)/1e6)+" million years here. 405 billion × 16 bytes = about "+(LLAMA.params*16/1e12).toFixed(1)+" TB of training state."],
   ["DeepSeek-V3","2.788 million H800 hours; at the US$2 an hour of its own report, about US$5.6 million for the final run alone, not counting the earlier runs and research."],
   ["A well-proportioned 135M from zero","about 20 pieces of text a number (Hoffmann et al. 2022): 2.7 billion tokens; 6 × 134.5M × 2.7 billion = about "+sci(6*134515008*20*134515008)+" operations, about "+(years(6*134515008*20*134515008/PACE)).toFixed(1)+" years here; about 10 GB of text."],
   ["The Large size here (41M)","20 × 40.6 million = 812 million tokens; "+sci(6*40.6e6*20*40.6e6)+" operations, about "+Math.round(years(6*40.6e6*20*40.6e6/PACE)*365)+" days here; about 3 GB of text, where the trainer today takes up to 8 MB in one piece (more with the app's newer side)."]
  ].forEach(function(r){dl.appendChild(mk("dt",null,r[0]));dl.appendChild(mk("dd",null,r[1]));});
  src.innerHTML="";["Ingenium's own measurements, source/rig/train_sizes.txt: Tiny, 8 passes on 150,000 characters, 140 s, held-back loss 5.85 against 7.62 at random; SmolLM2 135M, one pass over 120,000 characters, 996 s on 3 threads, held-out perplexity 23.13 to 21.68 at a learning rate of 1e-6 (at 1e-5 it rose to 27.8 and the model lost its chat).",
    "Meta, The Llama 3 Herd of Models (2024): Llama 3.1 405B, 15.6 trillion tokens, 3.8 × 10^25 operations, up to 16,384 H100 graphics chips.",
    "DeepSeek, DeepSeek-V3 Technical Report (December 2024): 671 billion parameters with 37 billion active, 14.8 trillion tokens, 2.788 million H800 hours, about US$5.6 million at US$2 an hour.",
    "Hoffmann et al., Training Compute-Optimal Large Language Models (2022): about 20 tokens a parameter for a well-proportioned model.",
    "llama.cpp, examples/training (its README): the trainer is “technically functional (for FP32 models and limited hardware setups) but the code is very much WIP”; Llama 3.2 1B “seems to work with 24 GB”."].forEach(function(t){src.appendChild(mk("li",null,t));});
  c.appendChild(mk("p","tr-sum","The figures are read again each time this page opens. Where one is an estimate, the words say so."));
  var sums=c.querySelectorAll(".tr-sum");for(var i=0;i<sums.length-1;i++)sums[i].remove();
  return c;}

/* ---------- Measure and Elsewhere ---------- */
function measureCard(){var c=$("ingMeasureCard");if(c)return c;c=att(mk("div","card"),{id:"ingMeasureCard",role:"region","aria-labelledby":"ingMeasureH"});
  var h=mk("h2","sec","Measure what was trained");h.id="ingMeasureH";c.appendChild(h);
  c.appendChild(mk("p","small muted","What can be measured on this device, and what the figures do not say."));
  var ul=mk("ul","ms-list");ul.id="ingMeasureList";c.appendChild(ul);
  var acts=mk("div","ms-acts"),k1=att(mk("button","btn small","Health: how fast each model runs"),{type:"button"});
  k1.onclick=function(){try{W.IngRooms&&IngRooms.open("models","yours",true);}catch(e){}var hb=$("healthBox");if(hb)try{hb.scrollIntoView({block:"start"});}catch(e){}};
  acts.appendChild(k1);c.appendChild(acts);return c;}
function msRows(c,ppl){var ul=c.querySelector("#ingMeasureList");
  ul.innerHTML="";
  var rows=[["The held-back loss","Train a small model keeps a part of your text aside and measures the model on it after each pass (the chart's second line). If that line stops falling, more passes no longer help; if it rises while the first falls, the model is memorising. It belongs to the model and the text it was trained on: two models trained on different texts cannot be compared by it."],
    ["The workbench's held-back figures","Each tool in the learning workbench keeps part of what it is given aside and says how it does on that: the end of the text (a tenth) for the character model, a tenth of the notes, a fifth of the pictures, a twentieth of the word pairs. A loss for the character model and the word map, an accuracy for a sorter. Six examples give a rough figure; sixty give a fair one."],
    ["Perplexity",ppl?"The computer app can measure a model's perplexity on a held-back text (llama-perplexity): how surprised it is by text it never trained on, a lower figure being better. A dataset's held-back part is the text to use.":"Perplexity on a held-back text (how surprised a model is by text it never trained on) needs llama.cpp's llama-perplexity, which this copy does not carry; Ingenium's own checks measure it when a build is tested. It is not offered here until the app carries the tool."],
    ["What they do not say","A lower loss is not quality, and no figure here says whether an answer is true. A model trained from zero does not converse. The surest measure is your own: ask the model what you would ask it, and read."]];
  rows.forEach(function(r){var li=mk("li");li.appendChild(mk("b",null,r[0]+". "));li.appendChild(D.createTextNode(r[1]));ul.appendChild(li);});
  return c;}
/* perplexity, where the computer app carries llama-perplexity (train_available says so): a model, a held-back text, a figure */
var MS={timer:0};
function msPut(a,t){var i=0,first=true,CH=1024*1024;function next(){if(i>=t.length)return Promise.resolve();var part=t.slice(i,i+CH);i+=CH;
  return Promise.resolve(a.train_text_put(part,first)).then(function(r){first=false;if(!r||!r.ok)throw new Error((r&&r.error)||"The text could not be handed to the app.");return next();});}return next();}
function msRun(c,a){var box=c.querySelector("#msRun");if(box)return box;box=att(mk("div","ms-run"),{id:"msRun"});
  box.appendChild(mk("h3",null,"Measure a model on a held-back text"));
  var sel=att(mk("select"),{id:"msModel","aria-label":"The model to measure"}),txt=att(mk("select"),{id:"msText","aria-label":"The text to measure it on"}),paste=att(mk("textarea","ms-paste"),{id:"msPaste",rows:4,"aria-label":"A text to measure on","placeholder":"Paste a text the model never learned from (about 1,500 characters or more)."}),
    go=att(mk("button","btn small primary","Measure"),{type:"button",id:"msGo"}),stop=att(mk("button","btn small ghost","Stop"),{type:"button",id:"msStop"}),out=att(mk("div","ms-out small"),{id:"msOut",role:"status","aria-live":"polite"});
  stop.hidden=true;paste.hidden=true;
  function fill(){sel.innerHTML="";var ms=[];try{ms=((W.state&&state.models)||[]).filter(function(m){return m&&m.fileState==="ready";});}catch(e){}
    if(!ms.length){sel.appendChild(att(mk("option",null,"No model is on this computer yet"),{value:""}));}
    else ms.forEach(function(m){sel.appendChild(att(mk("option",null,m.customName||m.fileName||m.id),{value:m.id}));});
    txt.innerHTML="";txt.appendChild(att(mk("option",null,"A text I paste"),{value:"paste"}));
    if(W.IngData&&IngData.list)IngData.list().then(function(l){l.filter(function(x){return x.heldN>0;}).forEach(function(x){txt.insertBefore(att(mk("option",null,"The held-back part of \u201c"+x.name+"\u201d ("+x.heldN+" pieces)"),{value:x.id}),txt.firstChild);});txt.selectedIndex=0;paste.hidden=txt.value!=="paste";},function(){});}
  txt.onchange=function(){paste.hidden=txt.value!=="paste";};
  function say(t,bad){out.textContent=t||"";out.className="ms-out small"+(bad?" bad":"");}
  function idle(){go.disabled=false;stop.hidden=true;if(MS.timer){clearInterval(MS.timer);MS.timer=0;}}
  function poll(){if(MS.timer)clearInterval(MS.timer);MS.timer=setInterval(function(){Promise.resolve(a.train_perplexity_status()).then(function(st){if(!st)return;
      if(st.state==="running"){say("Measuring\u2026 "+Math.round(st.elapsed||0)+" s so far. A larger model takes longer.");return;}
      idle();if(st.state==="done"){say("Perplexity "+(+st.ppl).toFixed(2)+(st.err!=null?" (\u00b1 "+(+st.err).toFixed(2)+")":"")+" on "+(+st.chars).toLocaleString("en-GB")+" characters"+(st.seconds?", in "+st.seconds+" s":"")+". Lower is better. It compares only models measured on this same text, models with the same kind of vocabulary, and it does not say whether an answer is true.");}
      else if(st.state==="cancelled")say("Stopped. Nothing was measured.");else say(st.error||"The measurement stopped.",true);},function(e){idle();say(String(e&&e.message||e),true);});},1000);}
  go.onclick=function(){if(!sel.value){say("Choose a model first.",true);return;}go.disabled=true;say("Getting the text ready\u2026");
    var get=txt.value==="paste"?Promise.resolve(paste.value):(W.IngData?IngData.text(txt.value,{split:"held"}):Promise.reject(new Error("The datasets are not here.")));
    get.then(function(t){t=String(t||"");if(t.length<1500)throw new Error("It needs about 1,500 characters of text or more (this has "+t.length.toLocaleString("en-GB")+").");
      if(typeof a.train_text_put!=="function")throw new Error("This copy of the computer app is older and cannot take the text; update the app.");return msPut(a,t);})
      .then(function(){return a.train_perplexity(sel.value);}).then(function(r){if(!r||!r.ok)throw new Error((r&&r.error)||"It could not start.");stop.hidden=false;say("Measuring\u2026");poll();})
      .catch(function(e){idle();say(String(e&&e.message||e),true);});};
  stop.onclick=function(){Promise.resolve(a.train_perplexity_cancel()).then(function(){say("Stopping\u2026");},function(){});};
  var row=mk("div","ms-acts");row.appendChild(go);row.appendChild(stop);
  [mk("label","field"),mk("label","field")].forEach(function(l,i){l.appendChild(mk("span",null,i?"The text":"The model"));l.appendChild(i?txt:sel);box.appendChild(l);});
  box.appendChild(paste);box.appendChild(row);box.appendChild(out);fill();
  var acts=c.querySelector(".ms-acts");c.insertBefore(box,acts||null);box.__fill=fill;return box;}
function paintMeasure(){var c=measureCard(),a=api();msRows(c,false);var run=c.querySelector("#msRun");
  if(!a||typeof a.train_perplexity!=="function"||typeof a.train_available!=="function"){if(run)run.remove();return c;}
  Promise.resolve(a.train_available()).then(function(av){if(av&&av.perplexity){msRows(c,true);var b=msRun(c,a);if(b.__fill)b.__fill();}else{var r2=c.querySelector("#msRun");if(r2)r2.remove();}},function(){});
  return c;}
function elsewhereCard(){var c=$("ingElsewhereCard");if(c)return c;c=att(mk("div","card"),{id:"ingElsewhereCard",role:"region","aria-labelledby":"ingElsewhereH"});
  var h=mk("h2","sec","Training elsewhere");h.id="ingElsewhereH";c.appendChild(h);
  c.appendChild(mk("p","small muted","What needs another machine, what Ingenium does not do yet, and how a model made elsewhere comes in."));
  var ul=mk("ul","ew-list");
  [["A graphics chip","Ingenium's trainer runs on the processor, so LoRA on a model of 1 to 8 billion numbers (the way most people adapt a capable model at home) is not possible here yet. A workshop for the Mac's own graphics chip, and a kit for a rented machine, are planned; nothing here promises a date."],
   ["Your text stays here","Nothing in Ingenium sends your text to another machine unless you set up a connection and choose to send it. A dataset's export is a file you hold."],
   ["A model made elsewhere","Convert its files to a GGUF (Convert a model, in Make), then add that file in Your models. The installer takes files from Hugging Face by address and fingerprint; a file of your own comes in through Add a model."],
   ["Frontier scale","Not on any device at home, and not for rent at a price a person could reasonably pay: What can be trained here, in Train, has the arithmetic."]].forEach(function(r){var li=mk("li");li.appendChild(mk("b",null,r[0]+". "));li.appendChild(D.createTextNode(r[1]));ul.appendChild(li);});
  c.appendChild(ul);
  var acts=mk("div","ew-acts"),k1=att(mk("button","btn small","Convert a model"),{type:"button"}),k2=att(mk("button","btn small ghost","Add a model"),{type:"button"}),k3=att(mk("button","btn small ghost","What can be trained here"),{type:"button"});
  k1.onclick=function(){show("make",{keep:true});var e=$("convCard");if(e)try{e.scrollIntoView({block:"start"});}catch(_){}};
  k2.onclick=function(){try{W.IngRooms&&IngRooms.open("models","yours",true);}catch(e){}var e2=$("dropzone");if(e2)try{e2.scrollIntoView({block:"center"});}catch(_){}};
  k3.onclick=function(){show("train",{keep:true});var e=$("ingTruthCard");if(e)try{e.scrollIntoView({block:"start"});}catch(_){}};
  acts.appendChild(k1);acts.appendChild(k2);acts.appendChild(k3);c.appendChild(acts);return c;}

/* ---------- putting it together ---------- */
var built=false;
function setup(){if(!$("rmP-models-studio"))return false;build();if(!S)return false;
  var tc=paint(),mc=paintMeasure(),ec=elsewhereCard();
  [tc,mc,ec].forEach(function(c){if(!c.parentNode||!c.closest(".st-room"))S.panel.appendChild(c);});
  fileAll();wrapRooms();wrapTour();helpHook();helpEntries();built=true;return true;}
function helpEntries(){try{var H=W.IngHelp,P=H&&H.pages&&H.pages.models;if(!P||!P.dos||P.dos.__truth)return;
  P.dos.push(["See what can be trained here","What this device can and cannot train, with the arithmetic and where its figures come from.","#ingTruthCard"]);P.dos.__truth=1;
  if(Array.isArray(H.map))H.map.push(["#ingTruthCard","What can be trained here","What this device can and cannot train, band by band, with the arithmetic and where each figure comes from."]);}catch(e){warn(e);}}
function arrive(){try{if(!built)setup();else{paint();paintMeasure();fileAll();}helpEntries();}catch(e){warn(e);}}
function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r199)return;
  var ng=function(p){var r=og.apply(this,arguments);try{if(p==="models")setTimeout(arrive,0);}catch(e){warn(e);}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r199=true;W.go=ng;}
function boot(){try{setup();}catch(e){warn(e);}wrapGo();}
boot();
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);
(function later(){var n=0;(function wait(){if(W.__ingReady===true){boot();try{if(S)fileAll();}catch(e){}return;}if(++n<400)setTimeout(wait,500);})();})();
/* the computer app's facts arrive a moment after the page: the card is painted again when they do */
(function watchDevice(){var n=0;(function wait(){if(++n>40)return;if(W.__INGENIUM_DEVICE){try{if(built)paint();}catch(e){}return;}setTimeout(wait,500);})();})();

W.IngStudio={version:1,
  open:function(k,remember){if(!S&&!setup())return false;try{if(W.IngRooms)IngRooms.open("models","studio",!!remember);}catch(e){}if(!S.tabs[k]||S.tabs[k].hidden)return false;show(k,{keep:!!remember});return true;},
  current:function(){return S?S.cur:null;},
  rooms:function(){return S?ROOMS.map(function(rm){return {key:rm.k,name:rm.t,says:rm.says,shown:!S.tabs[rm.k].hidden};}):[];},
  roomOf:roomOf,fileCard:function(el){return fileCard(el);},device:device,bands:bands,fits:fitsParams,pace:PACE,
  refresh:function(){arrive();}};
})();
;try{window.__ingParts["p199"]="running";}catch(_){}
</script>
