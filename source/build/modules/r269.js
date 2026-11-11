<style id="r269-css">
/* ============ R269 · MODELS, THE TURRET (Ingenium 6.77, 11 November 2026) ============
   Her words (11 November 2026): "The Models page needs a redesign and a major makeover to match the rest of the Ingenium's pages,
   it looks a little basic compared to the rest of the app." On the live previews: "I want Ingenium's colours preserved with the new
   designs", "I like the turret version but the colours are off", and, choosing it: "I choose the Turret, please push it everywhere."
   6.75 shipped another turret, made in another chat from the same preview (modules/r266.js). Her words on it: "I want your turret to
   replace the other chat's turret design instead. I preferred your colours and designs better." So this turret takes its place, and
   the rooms of 6.76 (modules/r267.js) stay: this module gives them what 6.75's turret gave (IngTurret: a model's lens, the model in the
   engine, load and unload; the page marked tu-on; the --tu- colours, here in this turret's palette). Her words the same day: "I want the
   "Open the Studio" button to be removed" and "I want the button to stay purple when selected": so the line Open the Studio goes where the
   turret stands, and the room shown is filled purple as the rooms draw it, not ringed as 6.75 drew it.
   So the Models page opens on a turret of lenses, as a microscope's, in Ingenium's lavender and violet (no gold):
   - each model on this device is a lens set in the turret, its glass in the model's own colour and its name beneath it; five stand
     in the turret at most (the one in the engine always among them; all of them are in Your models below); one port is empty, and
     a turret with fewer models has its other ports capped;
   - pressing a lens turns the turret until that lens stands under the engine's mark at the top, and loads the model as the engine's
     own Load key does (modules: the page's setActive and loadActiveModel); pressing it again, or the empty port, unloads it; a model
     too heavy for this device asks first, a model whose file is not linked says so, and a busy engine is never interrupted;
   - the scale round the turret is this device's memory for a model; the model in the engine fills it as far as it needs;
   - the card beside it says what is in the engine and how far a load has come;
   - every lens lifts under the pointer and sinks when pressed (r176 sounds it); the turn ticks softly, once for each port it passes;
   - by night the metal, the glass and the scale take the night's colours; below 1060 pixels the turret stands under the words, and
     below 760 it is scaled to the width; below 260 pixels the page is as it was; left alone, nothing is redrawn. */
#page-models.tr-on{--tr-page0:#fbf9fe;--tr-page1:#ece4f7;--tr-ring:rgba(106,63,181,.12);--tr-ink3:#7b7190;--tr-tag:#2e1764;--tr-tagGlow:0 0 3px rgba(255,255,255,.95),0 1px 0 rgba(255,255,255,.8);
  --tr-card:#ffffff;--tr-hair2:rgba(34,26,46,.07);--tr-bar:rgba(34,26,46,.10);
  --tr-serif:"Home Cormorant","Cormorant Garamond",Cormorant,var(--serif,Georgia),serif;--tr-sans:var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif)}
body[data-theme="night"] #page-models.tr-on{--tr-page0:#1d1529;--tr-page1:#120c1b;--tr-ring:rgba(205,184,240,.12);--tr-ink3:#9a8fb0;--tr-tag:#efe6ff;--tr-tagGlow:0 0 3px rgba(10,6,18,.95),0 1px 2px rgba(0,0,0,.7);
  --tr-card:#241b33;--tr-hair2:rgba(205,184,240,.08);--tr-bar:rgba(205,184,240,.14)}

/* the colours the rooms of 6.76 read (modules/r267.js), in this turret's palette */
#page-models{--tu-slab0:#fbf9fe;--tu-slab1:#ece4f7;--tu-card:#ffffff;--tu-card2:#f8f5fc;--tu-ink1:#231a31;--tu-ink2:#4c4360;--tu-ink3:#7b7190;--tu-acc:#6a3fb5;--tu-acc2:#5a2fa5;
  --tu-hair:rgba(34,26,46,.10);--tu-hair2:rgba(34,26,46,.06);--tu-ring:rgba(106,63,181,.12);--tu-keyShadow:rgba(40,22,68,.16);
  --tu-shadow:0 1px 0 rgba(255,255,255,.7) inset,0 14px 30px rgba(40,22,68,.10),0 2px 6px rgba(40,22,68,.06);--tu-warn:#9a5b06;--tu-warnbg:#fbf0dd}
body[data-theme="night"] #page-models{--tu-slab0:#1d1529;--tu-slab1:#120c1b;--tu-card:#241b33;--tu-card2:#191224;--tu-ink1:#ece4f8;--tu-ink2:#b9adcc;--tu-ink3:#9a8fb0;--tu-acc:#b496ff;
  --tu-acc2:#8e66e6;--tu-hair:rgba(205,184,240,.12);--tu-hair2:rgba(205,184,240,.07);--tu-ring:rgba(205,184,240,.12);--tu-keyShadow:rgba(0,0,0,.45);
  --tu-shadow:0 1px 0 rgba(255,255,255,.04) inset,0 14px 30px rgba(0,0,0,.45),0 2px 6px rgba(0,0,0,.3);--tu-warn:#f0b65c;--tu-warnbg:#3a2a12}
/* her words (11 November 2026): "I want the "Open the Studio" button to be removed since it seem superfluous from the new Models page but
   I want the button to stay purple when selected instead of just having the purple outline around the button": the line and its key
   go where the turret stands (the Studio keeps its own room key), and the room shown keeps the rooms' own purple (modules/r173.js) */
#page-models.tr-on #rmStudioHint{display:none !important}
/* her words (11 November 2026): "I want you to remove the black squares arounf the little catridges and leave the coloured catridges without
   them but make them 3D popped out animated and make them react to my mouse when I hover over them and clickable, the same as the the ones
   from inside the turret": the lenses of the rooms (Your models and Ingenium's models, modules/r267.js) stand on no dark square; each is a
   raised lens that leans toward the pointer, catches its light, lifts under it, sinks when pressed and loads its model as the turret does */
#page-models.tu-on .lu-tile .tm-stage,body[data-theme="night"] #page-models.tu-on .lu-tile .tm-stage{background:none !important;box-shadow:none !important}
#page-models.tu-on .tm-key{border-radius:50%;cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none;
  transform:perspective(600px) rotateX(var(--ly,0deg)) rotateY(var(--lx,0deg)) translateY(var(--lz,0px)) scale(var(--ls,1));
  filter:drop-shadow(0 3px 3px rgba(40,22,68,.28)) drop-shadow(0 8px 10px rgba(40,22,68,.16));
  transition:transform .4s cubic-bezier(.34,1.35,.64,1),filter .3s ease}
#page-models.tu-on .tm-key:hover,#page-models.tu-on .tm-key.tm-ph{--lz:-4px;--ls:1.06;filter:drop-shadow(0 6px 5px rgba(40,22,68,.30)) drop-shadow(0 14px 18px rgba(40,22,68,.20))}
#page-models.tu-on .tm-key:active,#page-models.tu-on .tm-key.tm-pd{--lz:1px;--ls:.95;filter:drop-shadow(0 1px 2px rgba(40,22,68,.3));transition-duration:.08s}
#page-models.tu-on .tm-key:focus-visible{box-shadow:0 0 0 3px var(--accent)}
body[data-theme="night"] #page-models.tu-on .tm-key{filter:drop-shadow(0 3px 3px rgba(0,0,0,.6)) drop-shadow(0 8px 10px rgba(0,0,0,.4))}
body[data-theme="night"] #page-models.tu-on .tm-key:hover,body[data-theme="night"] #page-models.tu-on .tm-key.tm-ph{filter:drop-shadow(0 6px 5px rgba(0,0,0,.6)) drop-shadow(0 14px 18px rgba(0,0,0,.45))}
body[data-motion="minimal"] #page-models.tu-on .tm-key{transition:none;transform:none !important}
@media (prefers-reduced-motion:reduce){#page-models.tu-on .tm-key{transition:none;transform:none !important}}

/* ---------- the head: the words on the left, the turret on the right ---------- */
#page-models.tr-on .tr-head{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 480px;gap:24px;align-items:center;max-width:1180px;min-height:500px;
  margin:0 auto 22px;padding:34px 30px 30px 40px;box-sizing:border-box;border-radius:30px;overflow:hidden;isolation:isolate;
  background:radial-gradient(ellipse 70% 85% at 76% 40%,var(--tr-page0) 0%,var(--tr-page1) 72%);
  box-shadow:inset 0 0 0 1px var(--tr-ring),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.08)}
body[data-theme="night"] #page-models.tr-on .tr-head{box-shadow:inset 0 0 0 1px var(--tr-ring),0 14px 28px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4)}
#page-models.tr-on.tr-stack .tr-head{grid-template-columns:minmax(0,1fr);min-height:0;padding:28px 24px 24px}
#page-models.tr-on.tr-phone .tr-head{padding:22px 18px 20px;border-radius:24px}
#page-models.tr-on .tr-words{display:flex;flex-direction:column;min-width:0}
#page-models.tr-on .tr-eyebrow{display:flex;flex-wrap:wrap;gap:6px 14px;font:600 11.5px/1.2 var(--tr-sans);letter-spacing:.28em;text-transform:uppercase;color:var(--tr-ink3)}
#page-models.tr-on .tr-eyebrow b{color:var(--accent);font-weight:600}
#page-models.tr-on .tr-words > .page-title{margin:14px 0 10px;padding:0;font:600 56px/1.02 var(--tr-serif);letter-spacing:.005em;color:var(--ink-1)}
#page-models.tr-on.tr-phone .tr-words > .page-title{font-size:44px}
#page-models.tr-on .tr-words > .lede{margin:0 0 10px;max-width:470px;font-size:14px;line-height:1.55;color:var(--ink-2)}
#page-models.tr-on .tr-how{margin:0 0 18px;max-width:470px;font-size:13.5px;line-height:1.5;color:var(--ink-2)}
#page-models.tr-on .tr-keys{display:flex;flex-wrap:wrap;gap:10px}
#page-models.tr-on .tr-now{margin-top:22px;max-width:440px;padding:14px 16px;border-radius:16px;box-sizing:border-box;background:var(--tr-card);
  box-shadow:inset 0 0 0 1px var(--tr-hair2),0 6px 16px rgba(40,22,68,.06)}
#page-models.tr-on .tr-now small{display:block;margin-bottom:8px;font:600 10.5px/1 var(--tr-sans);letter-spacing:.2em;text-transform:uppercase;color:var(--tr-ink3)}
#page-models.tr-on .tr-now .tr-name{display:block;font:600 22px/1.15 var(--tr-serif);color:var(--ink-1);overflow-wrap:anywhere}
#page-models.tr-on .tr-now .tr-says{margin:4px 0 0;font-size:13px;line-height:1.45;color:var(--ink-2)}
#page-models.tr-on .tr-bar{margin-top:10px;height:4px;border-radius:999px;background:var(--tr-bar);overflow:hidden}
#page-models.tr-on .tr-bar i{display:block;width:0;height:100%;border-radius:inherit;background:var(--accent);transition:width .2s}
#page-models.tr-on .tr-act{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
#page-models.tr-on .tr-act:empty{display:none}

/* ---------- the turret: spun metal and coated glass ---------- */
#page-models.tr-on .tr-scene{position:relative;min-width:0;display:grid;justify-items:center}
#page-models.tr-on.tr-stack .tr-scene{margin-top:10px}
#page-models.tr-on .tr-fit{position:relative;width:calc(460px * var(--tr-k,1));height:calc(460px * var(--tr-k,1))}
#page-models.tr-on .tr-turret{position:absolute;left:0;top:0;width:460px;height:460px;transform-origin:0 0;transform:scale(var(--tr-k,1))}
#page-models.tr-on .tr-base{position:absolute;left:0;top:0;width:460px;height:460px}
#page-models.tr-on .tr-index{position:absolute;left:50%;top:6px;z-index:2;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:3px;pointer-events:none}
#page-models.tr-on .tr-index b{font:600 10.5px/1 var(--tr-sans);letter-spacing:.22em;text-transform:uppercase;white-space:nowrap;color:var(--tr-ink3)}
#page-models.tr-on .tr-index path{fill:var(--accent)}
#page-models.tr-on .tr-disc{position:absolute;left:50%;top:50%;width:340px;height:340px;margin:-170px 0 0 -170px;border-radius:50%;transition:transform .9s cubic-bezier(.45,0,.2,1)}
#page-models.tr-on .tr-plate{position:absolute;left:0;top:0;width:340px;height:340px;border-radius:50%}
#page-models.tr-on .tr-port{position:absolute;left:50%;top:50%;width:122px;height:122px;margin:-61px 0 0 -61px;padding:0;border:0;border-radius:50%;background:none;color:inherit;
  font:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
#page-models.tr-on .tr-port.tr-cap{cursor:default;pointer-events:none}
#page-models.tr-on .tr-lift{position:absolute;left:0;top:0;width:122px;height:122px;transition:transform .9s cubic-bezier(.45,0,.2,1)}
#page-models.tr-on .tr-grow{position:absolute;left:0;top:0;width:122px;height:122px;border-radius:50%;transition:transform .25s cubic-bezier(.2,.8,.2,1)}
#page-models.tr-on .tr-port canvas{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
#page-models.tr-on button.tr-port:hover .tr-grow{transform:translateY(-3px) scale(1.045)}
#page-models.tr-on button.tr-port.tr-down .tr-grow{transform:translateY(1px) scale(.95);transition-duration:.06s}
#page-models.tr-on .tr-port:focus{outline:none}
#page-models.tr-on .tr-port:focus-visible .tr-grow{box-shadow:0 0 0 2.5px var(--accent)}
/* the names stand round the rim, each beside its lens and above every lens; they wait while the turret turns */
#page-models.tr-on .tr-names{position:absolute;left:0;top:0;z-index:1;width:460px;height:460px;pointer-events:none}
#page-models.tr-on .tr-tag{position:absolute;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;overflow-wrap:anywhere;transform:translateY(-50%);
  font:600 10.5px/1.2 var(--tr-sans);font-size:calc(10.5px / max(.85, var(--tr-k,1)));letter-spacing:.12em;text-transform:uppercase;color:var(--tr-tag);text-shadow:var(--tr-tagGlow);
  transition:opacity .25s ease .05s}
#page-models.tr-on .tr-tag.tr-one{display:block;white-space:nowrap;text-overflow:ellipsis}
#page-models.tr-on .tr-tag.tr-e{color:var(--tr-ink3)}
#page-models.tr-on .tr-turning .tr-tag{opacity:0;transition:opacity .12s ease}
body[data-motion="minimal"] #page-models.tr-on .tr-disc,body[data-motion="minimal"] #page-models.tr-on .tr-lift,body[data-motion="minimal"] #page-models.tr-on .tr-grow,
body[data-motion="minimal"] #page-models.tr-on .tr-bar i,body[data-motion="minimal"] #page-models.tr-on .tr-tag{transition:none}
@media (prefers-reduced-motion:reduce){#page-models.tr-on .tr-disc,#page-models.tr-on .tr-lift,#page-models.tr-on .tr-grow,#page-models.tr-on .tr-bar i,#page-models.tr-on .tr-tag{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p269"]="started";}catch(_){}
/* R269 · Models, the turret: see the note at the top of its styles */
(function(){"use strict";
if(window.__r269)return;window.__r269=1;
var D=document,W=window,TAU=Math.PI*2,HOLD=5,RAD=102,LENS=112;
var SANS='Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';
var page=null,head=null,words=null,title=null,lede=null,turret=null,base=null,disc=null,plate=null,names=null,nowName=null,nowSays=null,bar=null,acts=null,NAMES=[],NAMET=0;
var on=false,booted=false,P=4,TURN=0,AT=-1,SIG="",BSIG="",ACTS="",CUR=null,NOTE=null,ASK=null,PRESSED=null,PRESSED_AT=0,PORTS=[],RQ=0;
function $(id){return D.getElementById(id);}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function setText(e,s){if(e&&e.textContent!==s)e.textContent=s;}
function setAttr(e,a,v){if(e&&e.getAttribute(a)!==v)e.setAttribute(a,v);}
function night(){try{return D.body.getAttribute("data-theme")==="night";}catch(e){return false;}}
function still(){var m="calm";try{m=D.body.getAttribute("data-motion")||"calm";}catch(e){}try{if(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)m="minimal";}catch(e){}return m==="minimal";}

/* ---------- the page's own engine and models ---------- */
function eng(){try{return typeof Engine!=="undefined"&&Engine?Engine:null;}catch(e){return null;}}
function models(){try{return ((W.state&&W.state.models)||[]).filter(function(m){return m&&m.id;});}catch(e){return [];}}
function byId(id){if(!id)return null;var a=models();for(var i=0;i<a.length;i++)if(a[i].id===id)return a[i];return null;}
function nm(m){return String((m&&(m.customName||m.name||m.fileName))||"Model");}
function st(){var e=eng();return e?String(e.status||"disconnected"):"disconnected";}
function loadedId(){var e=eng(),s=st();return e&&(s==="ready"||s==="busy")?(e.modelId||null):null;}
function loadingId(){return st()==="loading"?((W.state&&W.state.activeModelId)||null):null;}
function prog(){var e=eng(),p=e?+e.progress:0;return isFinite(p)?Math.max(0,Math.min(1,p)):0;}
function usable(){try{if(typeof lineupUsableGB==="function"){var u=+lineupUsableGB();if(u>0)return u;}}catch(e){}
  try{var m=+deviceMemGB();if(m>0)return m*0.7;}catch(e){}return null;}
function need(m){if(!m)return null;try{if(typeof lineupNeedGB==="function"){var n=+lineupNeedGB({size:m.sizeBytes||0});if(n>0)return n;}}catch(e){}
  try{var x=+estimateNeedGB(m);return x>0?x:null;}catch(e){return null;}}
function fitOf(m){try{return fitVerdict(m)||{};}catch(e){return {};}}
function size(m){try{return m&&m.sizeBytes?String(fmtBytes(m.sizeBytes)):"";}catch(e){return "";}}
function engineHere(m){try{if(typeof engineBundleInfo!=="undefined"&&engineBundleInfo&&engineBundleInfo.present)return true;}catch(e){}
  try{if(m&&typeof DeskAdapter!=="undefined"&&DeskAdapter.accepts(m))return true;}catch(e){}
  try{if(m&&m.nativeId&&typeof INB!=="undefined"&&INB)return true;}catch(e){}
  try{return typeof engineBundleInfo==="undefined";}catch(e){return true;}}
/* the models in the turret: her order, five at most, the one in the engine (or chosen) always among them */
function chosen(){var all=models(),cur=loadedId()||loadingId()||PRESSED||(W.state&&W.state.activeModelId)||null,out=all.slice(0,HOLD);
  if(cur&&all.length>HOLD&&!out.some(function(m){return m.id===cur;})){var c=byId(cur);if(c)out[HOLD-1]=c;}
  return out;}

/* ---------- colours: Ingenium's lavender and violet metal; the glass in the model's own colour ---------- */
function PAL(){return night()?{st0:"#33244f",st1:"#170d28",mL:46,mS:30,ink:"rgba(236,228,250,.88)",inkSoft:"rgba(236,228,250,.5)",acc:"#b79ce6",warn:"#f0b65c",knL:22,knS:28,hole:"#0d0618",seat:"rgba(0,0,0,.34)",dot:"rgba(236,228,250,.35)"}
  :{st0:"#fbf8ff",st1:"#dfd3f2",mL:76,mS:34,ink:"#4b2a8f",inkSoft:"rgba(75,42,143,.55)",acc:"#6a3fb5",warn:"#9a5b06",knL:44,knS:30,hole:"#1d0f38",seat:"rgba(46,23,100,.22)",dot:"rgba(46,23,100,.35)"};}
function hex(c){c=String(c||"").trim().replace("#","");if(/^[0-9a-f]{3}$/i.test(c))c=c.replace(/./g,"$&$&");if(!/^[0-9a-f]{6}$/i.test(c))c="6a3fb5";
  return [parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)];}
function mixc(a,b,t){return [0,1,2].map(function(i){return Math.round(a[i]+(b[i]-a[i])*t);});}
function tones(col){var c=hex(col);return [mixc(c,[255,255,255],.84),mixc(c,[255,255,255],.4),c,mixc(c,[0,0,0],.56)];}
function rgba(c,a){return "rgba("+c[0]+","+c[1]+","+c[2]+","+a+")";}
function spun(g,cx,cy,r0,r1,l0,sat,light){/* turned metal: fine concentric rings, and the light that runs across them */
  for(var r=Math.max(.35,r0);r<r1;r+=.7){var n=(Math.sin(r*1.9)+Math.sin(r*.41+1.1)+Math.sin(r*5.3)*.5)/2.5;g.strokeStyle="hsl(268,"+sat+"%,"+(l0+n*4)+"%)";g.lineWidth=1;g.beginPath();g.arc(cx,cy,r,0,TAU);g.stroke();}
  if(g.createConicGradient){var cg=g.createConicGradient(-2.2,cx,cy);[[0,.45],[.07,0],[.43,0],[.5,.30],[.57,0],[.93,0],[1,.45]].forEach(function(s){cg.addColorStop(s[0],"rgba(255,255,255,"+(s[1]*(light||1))+")");});
    g.save();g.beginPath();g.arc(cx,cy,r1,0,TAU);g.arc(cx,cy,r0,0,TAU,true);g.fillStyle=cg;g.fill();g.restore();}}
function bevel(g,cx,cy,r,w){var lg=g.createLinearGradient(cx-r,cy-r,cx+r,cy+r);lg.addColorStop(0,"rgba(255,255,255,.8)");lg.addColorStop(.5,"rgba(255,255,255,.05)");lg.addColorStop(1,"rgba(46,23,100,.40)");
  g.strokeStyle=lg;g.lineWidth=w;g.beginPath();g.arc(cx,cy,r,0,TAU);g.stroke();}
function dprOf(){return Math.min(2,W.devicePixelRatio||1);}
/* a lens (kind "lens"), the empty port ("empty") or a cap on an unused port ("cap") */
function drawLens(cv,S,col,tx,ty,kind){var dpr=dprOf(),px=Math.round(S*dpr);if(cv.width!==px){cv.width=px;cv.height=px;}cv.style.width=S+"px";cv.style.height=S+"px";
  var g=cv.getContext("2d");if(!g)return;g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,S,S);var c=S/2,R=S/2-2,Q=PAL(),N=90,i;
  for(i=0;i<N;i++){var a0=i*TAU/N,a1=(i+.5)*TAU/N,lit=.5+.5*Math.cos(a0+2.3);g.beginPath();g.arc(c,c,R,a0,a1);g.arc(c,c,R*.86,a1,a0,true);g.closePath();g.fillStyle="hsl(268,"+Q.knS+"%,"+(Q.knL+lit*34)+"%)";g.fill();
    g.beginPath();g.arc(c,c,R,a1,a1+TAU/N/2);g.arc(c,c,R*.86,a1+TAU/N/2,a1,true);g.closePath();g.fillStyle="hsl(268,"+(Q.knS+6)+"%,"+(Q.knL-12+lit*18)+"%)";g.fill();}
  bevel(g,c,c,R-.5,1.2);
  if(kind==="cap"){spun(g,c,c,0,R*.86,Q.mL-6,Q.mS,.8);bevel(g,c,c,R*.86,1);bevel(g,c,c,R*.42,1);g.fillStyle=Q.dot;g.beginPath();g.arc(c,c,R*.07,0,TAU);g.fill();return;}
  spun(g,c,c,R*.66,R*.86,Q.mL-4,Q.mS,.9);bevel(g,c,c,R*.86,1);bevel(g,c,c,R*.66,1);
  var T=tones(col);
  g.strokeStyle=kind==="empty"?Q.inkSoft:rgba(T[2],.9);g.lineWidth=R*.035;g.beginPath();g.arc(c,c,R*.76,0,TAU);g.stroke();
  g.fillStyle=Q.hole;g.beginPath();g.arc(c,c,R*.64,0,TAU);g.fill();
  if(kind==="empty"){spun(g,c,c,0,R*.6,Q.mL-14,Q.mS,.6);g.fillStyle=Q.dot;g.beginPath();g.arc(c,c,R*.08,0,TAU);g.fill();return;}
  /* the glass: deep at its edge, lit at its heart, with its inner elements */
  var gl=g.createRadialGradient(c-R*.12+tx*R*.1,c-R*.14+ty*R*.1,R*.05,c,c,R*.6);gl.addColorStop(0,rgba(T[1],1));gl.addColorStop(.5,rgba(T[2],1));gl.addColorStop(1,rgba(T[3],1));
  g.fillStyle=gl;g.beginPath();g.arc(c,c,R*.6,0,TAU);g.fill();
  [.5,.38,.26].forEach(function(k,j){g.strokeStyle="rgba(255,255,255,"+(.16-j*.03)+")";g.lineWidth=1;g.beginPath();g.arc(c+tx*R*.03*(j+1),c+ty*R*.03*(j+1),R*k,0,TAU);g.stroke();});
  g.save();g.beginPath();g.arc(c,c,R*.6,0,TAU);g.clip();g.globalCompositeOperation="screen";
  [[hex("#efe6ff"),-.22,-.26,.34,.16,.45],[hex("#cdb8f2"),.2,.22,.22,.1,.32],[T[0],.05,-.05,.12,.06,.26]].forEach(function(o){
    var x=c+(o[1]+tx*.12)*R,y=c+(o[2]+ty*.12)*R,rg=g.createRadialGradient(x,y,0,x,y,o[3]*R);rg.addColorStop(0,rgba(o[0],o[5]));rg.addColorStop(1,rgba(o[0],0));g.fillStyle=rg;g.beginPath();g.ellipse(x,y,o[3]*R,o[4]*R*1.6,-.6,0,TAU);g.fill();});
  g.globalCompositeOperation="source-over";
  var hx=c-R*(.26-tx*.12),hy=c-R*(.3-ty*.12),hl=g.createRadialGradient(hx,hy,0,hx,hy,R*.24);hl.addColorStop(0,"rgba(255,255,255,.8)");hl.addColorStop(1,"rgba(255,255,255,0)");
  g.fillStyle=hl;g.beginPath();g.ellipse(hx,hy,R*.24,R*.13,-.7,0,TAU);g.fill();
  g.fillStyle="rgba(255,255,255,.95)";g.beginPath();g.arc(hx-R*.05,hy-R*.02,Math.max(1.2,R*.025),0,TAU);g.fill();g.restore();
  g.strokeStyle=rgba(T[3],.9);g.lineWidth=1.5;g.beginPath();g.arc(c,c,R*.6,0,TAU);g.stroke();}
function fmtGB(x){return Math.abs(x-Math.round(x))<.05?String(Math.round(x)):x.toFixed(1);}
function labelStep(A){var c=[1,2,4,5,8,10,16,20,25,32,40,50,64,80,100,128,160,200,256,320,400,512,1024];for(var i=0;i<c.length;i++)if(A/c[i]<=6)return c[i];return 2048;}
/* how far the engine's memory is taken: by the model in it, or by the share of a load that has come in */
function fillNow(){var A=usable(),s=st(),m=null,f=0;if(s==="ready"||s==="busy")m=byId(loadedId());else if(s==="loading")m=byId(loadingId());
  if(m&&A){var n=need(m);if(n){f=n/A;if(s==="loading")f*=prog();}}return {A:A,f:f};}
function drawBase(){if(!base)return;var F=fillNow(),k=[night()?1:0,F.A?F.A.toFixed(2):"-",F.f.toFixed(3),dprOf()].join("|");if(k===BSIG)return;BSIG=k;
  var dpr=dprOf(),Wd=Math.round(460*dpr);if(base.width!==Wd){base.width=Wd;base.height=Wd;}
  var g=base.getContext("2d");if(!g)return;var c=Wd/2,s=Wd/460,Q=PAL();g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,Wd,Wd);
  var stg=g.createRadialGradient(c,c*.8,Wd*.05,c,c,Wd*.5);stg.addColorStop(0,Q.st0);stg.addColorStop(1,Q.st1);g.fillStyle=stg;g.beginPath();g.arc(c,c,Wd*.49,0,TAU);g.fill();
  spun(g,c,c,Wd*.455,Wd*.49,Q.mL-6,Q.mS,.7);bevel(g,c,c,Wd*.49,2*s);
  var a0=-Math.PI/2-1.05,a1=-Math.PI/2+1.05;g.save();g.strokeStyle=Q.inkSoft;g.lineWidth=2*s;g.beginPath();g.arc(c,c,Wd*.432,a0,a1);g.stroke();
  if(F.A){var L=labelStep(F.A),sm=L/4;
    for(var j=0;j*sm<=F.A+1e-9;j++){var gb=j*sm,a=a0+(a1-a0)*gb/F.A,isB=j%2===0,isL=j%4===0,r0=Wd*(isB?.418:.424),r1=Wd*.44;
      g.strokeStyle=isB?Q.ink:Q.inkSoft;g.lineWidth=(isB?1.6:1)*s;g.beginPath();g.moveTo(c+Math.cos(a)*r0,c+Math.sin(a)*r0);g.lineTo(c+Math.cos(a)*r1,c+Math.sin(a)*r1);g.stroke();
      if(isL){g.save();g.translate(c+Math.cos(a)*Wd*.398,c+Math.sin(a)*Wd*.398);g.rotate(a+Math.PI/2);g.fillStyle=Q.ink;g.font="600 "+(11*s)+"px "+SANS;g.textAlign="center";g.fillText(fmtGB(gb),0,4*s);g.restore();}}
    if(F.f>0){var af=a0+(a1-a0)*Math.min(1,F.f);g.strokeStyle=F.f>1?Q.warn:Q.acc;g.lineWidth=4*s;g.lineCap="round";g.beginPath();g.arc(c,c,Wd*.432,a0,af);g.stroke();}}
  g.restore();g.fillStyle=Q.inkSoft;g.font="600 "+(9.5*s)+"px "+SANS;g.textAlign="center";
  try{g.letterSpacing=(1.6*s)+"px";}catch(e){}
  g.fillText(F.A?(fmtGB(F.A)+" GB FOR A MODEL"):"MEMORY NOT REPORTED",c,c+Wd*.432);
  base.setAttribute("data-fill",F.f.toFixed(3));base.setAttribute("data-gb",F.A?F.A.toFixed(1):"");}
function drawPlate(){if(!plate)return;var dpr=dprOf(),Wd=Math.round(340*dpr);if(plate.width!==Wd){plate.width=Wd;plate.height=Wd;}
  var g=plate.getContext("2d");if(!g)return;var c=Wd/2,s=Wd/340,Q=PAL(),i;g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,Wd,Wd);
  spun(g,c,c,Wd*.06,Wd*.5,Q.mL,Q.mS,1);bevel(g,c,c,Wd*.497,3*s);
  for(i=0;i<P;i++){var a=-Math.PI/2+i*TAU/P,x=c+Math.cos(a)*RAD*s,y=c+Math.sin(a)*RAD*s;g.fillStyle=Q.seat;g.beginPath();g.arc(x+1.5*s,y+2.5*s,Wd*.19,0,TAU);g.fill();}
  spun(g,c,c,0,Wd*.09,Q.mL+4,Q.mS,1);bevel(g,c,c,Wd*.09,2*s);
  for(i=0;i<3;i++){var b=i*TAU/3+.3,sx=c+Math.cos(b)*Wd*.05,sy=c+Math.sin(b)*Wd*.05;g.fillStyle="hsl(268,24%,"+(Q.mL-24)+"%)";g.beginPath();g.arc(sx,sy,Wd*.011,0,TAU);g.fill();
    g.strokeStyle="hsl(268,30%,"+(Q.mL-44)+"%)";g.lineWidth=2*s;g.beginPath();g.moveTo(sx-Wd*.008,sy);g.lineTo(sx+Wd*.008,sy);g.stroke();}}

/* ---------- the ports ---------- */
function sig(){var ms=chosen();return [night()?1:0,dprOf(),ms.length,ms.map(function(m){return m.id+"\u0001"+nm(m)+"\u0001"+(m.color||"")+"\u0001"+(m.sizeBytes||0);}).join("\u0002")].join("|");}
function rebuild(){var ms=chosen();P=Math.max(5,Math.min(HOLD+1,ms.length+1));
  PORTS.forEach(function(p){if(p.el.parentNode)p.el.parentNode.removeChild(p.el);});PORTS=[];drawPlate();
  for(var i=0;i<P;i++){var kind=i<ms.length?"lens":(i===P-1?"empty":"cap");PORTS.push(port(i,kind,kind==="lens"?ms[i]:null));}
  while(names.firstChild)names.removeChild(names.firstChild);NAMES=[];
  for(var s=0;s<P;s++){var tg=mk("span","tr-tag");place(tg,s);names.appendChild(tg);NAMES.push(tg);}
  AT=-1;BSIG="";}
/* a name's place: above or below its lens when the lens is at the top or the bottom (one line), else beside it, clear of its rim,
   reaching to the turret's edge (two short lines at most) */
function place(tg,s){var f=(-90+s*360/P)*Math.PI/180,c=Math.cos(f),cx=230+RAD*c,cy=230+RAD*Math.sin(f),ly=230+168*Math.sin(f),l,w,a;
  if(Math.abs(c)<.35){w=124;l=230+168*c-w/2;a="center";tg.classList.add("tr-one");}
  else{var dy=ly-cy,half=Math.sqrt(Math.max(0,62*62-dy*dy));
    if(c>0){l=Math.min(cx+half+4,392);w=456-l;a="left";}else{var r=Math.max(cx-half-4,68);w=r-4;l=4;a="right";}}
  tg.style.left=l.toFixed(1)+"px";tg.style.top=ly.toFixed(1)+"px";tg.style.width=w.toFixed(1)+"px";tg.style.textAlign=a;}
/* the place s round the rim (0 at the top, under the engine's mark) names the port turned to it */
function nameAll(){var at=AT<0?P-1:AT;for(var s=0;s<NAMES.length;s++){var p=PORTS[(s+at)%P],tg=NAMES[s];setText(tg,!p||p.kind==="cap"?"":(p.kind==="empty"?"Empty":nm(p.m)));
  var e=!!p&&p.kind==="empty";if(tg.classList.contains("tr-e")!==e)tg.classList.toggle("tr-e",e);}}
function port(i,kind,m){var a=-Math.PI/2+i*TAU/P,x=Math.cos(a)*RAD,y=Math.sin(a)*RAD;
  var el=mk(kind==="cap"?"span":"button","tr-port tr-"+kind),lift=mk("span","tr-lift"),grow=mk("span","tr-grow"),cv=D.createElement("canvas");
  el.style.transform="translate("+x.toFixed(2)+"px,"+y.toFixed(2)+"px)";lift.style.transform="rotate("+(-TURN).toFixed(3)+"deg)";
  grow.appendChild(cv);lift.appendChild(grow);el.appendChild(lift);
  var p={el:el,lift:lift,cv:cv,i:i,kind:kind,m:m,col:m?m.color:null,tx:0,ty:0};
  if(kind==="cap"){el.setAttribute("aria-hidden","true");drawLens(cv,Math.round(LENS*.8),null,0,0,"cap");disc.appendChild(el);return p;}
  el.type="button";if(m)el.setAttribute("data-model",m.id);drawLens(cv,LENS,p.col,0,0,kind);
  if(kind==="lens"){var raf=0;
    el.addEventListener("pointermove",function(e){if(e.pointerType==="touch")return;var r=el.getBoundingClientRect();if(!r.width)return;
      p.tx=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1));p.ty=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1));
      if(!raf)raf=requestAnimationFrame(function(){raf=0;drawLens(cv,LENS,p.col,p.tx,p.ty,"lens");});});
    el.addEventListener("pointerleave",function(){if(p.tx||p.ty){p.tx=0;p.ty=0;drawLens(cv,LENS,p.col,0,0,"lens");}});}
  el.addEventListener("pointerdown",function(e){if(e.button!=null&&e.button!==0)return;el.classList.add("tr-down");});
  ["pointerup","pointercancel","pointerleave","blur"].forEach(function(t){el.addEventListener(t,function(){el.classList.remove("tr-down");});});
  el.addEventListener("click",function(e){e.preventDefault();if(kind==="empty")pressEmpty();else press(byId(m.id)||m);});
  disc.appendChild(el);return p;}
function portOf(id){for(var i=0;i<PORTS.length;i++)if(PORTS[i].m&&PORTS[i].m.id===id)return i;return -1;}
function target(){var id=loadedId()||loadingId()||PRESSED,i=id?portOf(id):-1;return i>=0?i:P-1;}
/* the turn: the shortest way round, a soft tick for each port it passes (her own touch sound, as r176 keeps it) */
function ticks(n){var I=W.IngSound;if(!I||typeof I.voice!=="function")return;var v="keyTouch";try{var c=typeof I.config==="function"?I.config():null;if(c&&c.hover)v=c.hover;}catch(e){}
  if(v==="touchOff")return;if(still())n=1;n=Math.max(1,Math.min(n,5));var gap=Math.max(110,Math.round(780/n));
  for(var k=0;k<n;k++)setTimeout(function(){try{I.voice(v);}catch(e){}},90+k*gap);}
function turnTo(i,sound){if(!disc)return;var step=360/P,d=((-i*step-TURN)%360+540)%360-180,steps=Math.round(Math.abs(d)/step);AT=i;if(Math.abs(d)<.01){nameAll();return;}
  TURN+=d;var tf="rotate("+TURN.toFixed(3)+"deg)",tb="rotate("+(-TURN).toFixed(3)+"deg)";disc.style.transform=tf;PORTS.forEach(function(p){p.lift.style.transform=tb;});
  if(sound&&steps)ticks(steps);
  clearTimeout(NAMET);if(still()||!head.offsetParent){nameAll();return;}
  turret.classList.add("tr-turning");NAMET=setTimeout(function(){nameAll();turret.classList.remove("tr-turning");},900);}

/* ---------- loading and unloading, as the engine's own keys do ---------- */
function note(n){NOTE=n;paint();}
function room(k,el){try{if(W.IngRooms&&typeof IngRooms.open==="function")IngRooms.open("models",k);}catch(e){}
  setTimeout(function(){var t=el||$("rmBar-models");if(!t)return;try{t.scrollIntoView({block:"start",behavior:still()?"auto":"smooth"});}catch(e){try{t.scrollIntoView();}catch(_){}}},60);}
function addFile(){var dz=$("dropzone");if(dz){try{dz.click();return;}catch(e){}}room("yours");}
function busyNote(){var e=eng();if(st()==="loading")return {name:"The engine is loading a model",says:"Let it finish first; then press the lens you want.",pc:Math.round(prog()*100)};
  return {name:"The engine is writing",says:"Let it finish, or stop it first; then press the lens you want.",pc:100,acts:[["Stop",function(){try{if(e)e.abort();}catch(x){}}]]};}
/* what stands in the way of loading a model now, if anything (the turret's card and the top bar's menu, modules/r270.js, say the same) */
function verdict(m){var e=eng(),s=st(),b;
  if(!e)return {kind:"engine",name:"The engine is not ready yet",says:"Open the Engine room to see why.",acts:[["Show the engine",function(){room("engine");}]]};
  if(s==="loading"||s==="busy"){b=busyNote();b.kind="busy";return b;}
  if(m.type==="Ollama index")return {kind:"ollama",name:nm(m)+" is Ollama's list, not a model",says:"Link the real model from Ollama on this computer, in Your models below.",acts:[["Show Your models",function(){room("yours",$("yourModelsCard"));}]]};
  if(m.fileState!=="ready")return {kind:"relink",name:"The file for "+nm(m)+" is not linked",says:"This session cannot reach its file. Relink it on its card in Your models below, then press its lens again.",acts:[["Show its card",function(){room("yours",$("yourModelsCard"));}]]};
  if(!engineHere(m))return {kind:"engine",name:"There is no engine here yet",says:"Add the engine once in the Engine room; then press the lens again.",acts:[["Show the engine",function(){room("engine");}]]};
  var f=fitOf(m);if(f.level==="heavy")return {kind:"heavy",name:nm(m)+" may be too heavy here",says:String(f.text||"It may need more memory than this device has for a model."),
    acts:[["Load it anyway",function(){var x=byId(m.id);if(x)load(x);}],["Not now",function(){ASK=null;note(null);}]]};
  return null;}
function press(m){if(!m)return;var e=eng(),s=st();
  if(e&&s==="ready"&&e.modelId===m.id){unload();return;}
  var v=verdict(m);
  if(v&&v.kind==="heavy"){if(ASK===m.id){load(m);return;}ASK=m.id;note(v);return;}
  if(v){note(v);return;}
  load(m);}
function load(m){ASK=null;NOTE=null;PRESSED=m.id;PRESSED_AT=Date.now();
  try{setActive(m.id,{fromUser:true});}catch(e){}
  var i=portOf(m.id);if(i<0){SIG="";paint();i=portOf(m.id);}if(i>=0)turnTo(i,true);
  try{loadActiveModel();}catch(e){PRESSED=null;note({name:"The engine could not start",says:String(e&&e.message||e).slice(0,220)});return;}
  /* a load that never began (the engine said nothing) lets the turret come back */
  setTimeout(function(){if(PRESSED===m.id&&st()!=="loading"&&!loadedId()&&Date.now()-PRESSED_AT>=3900){PRESSED=null;paint();}},4000);
  paint();}
function unload(){var e=eng(),s=st();if(!e)return;if(s==="loading"||s==="busy"){note(busyNote());return;}
  if(!e.modelId){note({name:"Nothing is in the engine",says:"There is nothing to unload. Press a model's lens to load it."});return;}
  NOTE=null;ASK=null;PRESSED=null;turnTo(P-1,true);
  Promise.resolve().then(function(){return e.unload();}).then(function(){try{renderEngineCtl();}catch(x){}try{renderModels();}catch(x){}paint();},
    function(err){note({name:"The engine did not let go",says:String(err&&err.message||err).slice(0,220)});});}
function pressEmpty(){var s=st();if(s==="ready"||s==="busy"||s==="loading"){unload();return;}
  note({name:"Nothing is in the engine",says:"The empty port stands under the engine already. Press a model's lens to load it."});}
function onStatus(s){NOTE=null;ASK=null;var e=eng();
  if(s==="ready"&&PRESSED&&e&&e.modelId===PRESSED){PRESSED=null;try{if(W.IngSound&&typeof IngSound.play==="function")IngSound.play("confirm");}catch(x){}}
  else if(s==="error")PRESSED=null;
  if(on)schedule();}

/* ---------- what the card says ---------- */
function card(){var e=eng(),s=st(),ld=byId(loadedId()),lg=byId(loadingId()),A=usable();
  if(!models().length)return {name:"No model yet",says:"Get one of Ingenium's models, or add a model file you already have. Then press its lens to load it.",pc:0};
  if(s==="loading")return {name:"Loading "+(lg?nm(lg):"a model"),says:"Reading it into memory · "+Math.round(prog()*100)+"%",pc:Math.round(prog()*100)};
  if(s==="busy")return {name:(ld?nm(ld):"The model")+" is writing",says:"It is answering now. Let it finish, or stop it.",pc:100,acts:[["Stop",function(){try{if(e)e.abort();}catch(x){}}]]};
  if(s==="ready"){var n=need(ld);return {name:(ld?nm(ld):"A model")+" is in the engine",says:(n&&A?"It uses about "+fmtGB(n)+" of "+fmtGB(A)+" GB. ":"")+"Chat, Blend and Lector use it now. Press its lens again, or the empty port, to unload it.",pc:100};}
  if(s==="error"){var t=e&&typeof e.lastError==="string"&&e.lastError?e.lastError:"It could not load the model.";return {name:"The engine stopped",says:t.slice(0,220),pc:0};}
  return {name:"Nothing in the engine",says:"Press a model's lens. The turret turns it to the engine and loads it, ready for Chat, Blend and Lector.",pc:0};}
function labels(){var ld=loadedId(),lm=byId(ld);PORTS.forEach(function(p){if(p.kind==="cap")return;var el=p.el;
  if(p.kind==="empty"){setAttr(el,"aria-label",lm?"The empty port: press to unload "+nm(lm):"The empty port: nothing is in the engine");return;}
  var inE=!!(p.m&&p.m.id===ld),z=size(p.m);setAttr(el,"aria-pressed",inE?"true":"false");
  setAttr(el,"aria-label",inE?nm(p.m)+", in the engine: press to unload it":nm(p.m)+(z?", "+z:"")+": press to load it into the engine");});}
function schedule(){if(RQ)return;try{RQ=requestAnimationFrame(function(){RQ=0;paint();});}catch(e){RQ=0;paint();}}
function paint(){if(!on||!head)return;var s=sig();if(s!==SIG){SIG=s;rebuild();}
  var t=target();if(t!==AT)turnTo(t,false);
  var c=NOTE||card();CUR=c;setText(nowName,c.name);setText(nowSays,c.says||"");var w=Math.max(0,Math.min(100,c.pc||0))+"%";if(bar.style.width!==w)bar.style.width=w;
  var ak=(c.acts||[]).map(function(a){return a[0];}).join("\u0001");
  if(ak!==ACTS){ACTS=ak;while(acts.firstChild)acts.removeChild(acts.firstChild);
    (c.acts||[]).forEach(function(a,ix){var b=mk("button","btn small"+(ix===0?" primary":""),a[0]);b.type="button";
      b.addEventListener("click",function(ev){ev.preventDefault();var x=CUR&&CUR.acts&&CUR.acts[ix];if(x)x[1]();});acts.appendChild(b);});}
  labels();drawBase();if(!ARMQ&&page&&page.__tmk)ARMQ=requestAnimationFrame(armRooms);}

/* ---------- the head, mounted on the page ---------- */
function build(){if(head)return;
  head=mk("section","tr-head tu-head");head.setAttribute("aria-label","Models");
  words=mk("div","tr-words");var eb=mk("div","tr-eyebrow");eb.appendChild(mk("b",null,"Ingenium"));eb.appendChild(mk("span",null,"Models · the turret"));eb.setAttribute("aria-hidden","true");words.appendChild(eb);
  words.appendChild(mk("p","tr-how","Press a model's lens: the turret turns it to the engine and loads it. Press it again, or the empty port, to unload it."));
  var keys=mk("div","tr-keys"),kg=mk("button","btn primary","Get one of Ingenium's models"),ka=mk("button","btn","Add a model file");kg.type="button";ka.type="button";kg.id="trGet";ka.id="trAdd";
  kg.addEventListener("click",function(e){e.preventDefault();room("get");});ka.addEventListener("click",function(e){e.preventDefault();addFile();});
  keys.appendChild(kg);keys.appendChild(ka);words.appendChild(keys);
  var now=mk("div","tr-now");now.id="trNow";now.setAttribute("aria-live","polite");now.appendChild(mk("small",null,"In the engine"));
  nowName=mk("b","tr-name","");nowSays=mk("p","tr-says","");var bw=mk("div","tr-bar");bar=mk("i");bw.appendChild(bar);acts=mk("div","tr-act");
  now.appendChild(nowName);now.appendChild(nowSays);now.appendChild(bw);now.appendChild(acts);words.appendChild(now);
  var scene=mk("div","tr-scene"),fit=mk("div","tr-fit");turret=mk("div","tr-turret");turret.id="trTurret";turret.setAttribute("role","group");turret.setAttribute("aria-label","The turret of your models");
  base=D.createElement("canvas");base.className="tr-base";base.setAttribute("aria-hidden","true");
  disc=mk("div","tr-disc");plate=D.createElement("canvas");plate.className="tr-plate";plate.setAttribute("aria-hidden","true");disc.appendChild(plate);
  var idx=mk("div","tr-index");idx.setAttribute("aria-hidden","true");idx.appendChild(mk("b",null,"Into the engine"));
  idx.insertAdjacentHTML("beforeend",'<svg width="18" height="12" viewBox="0 0 18 12" focusable="false"><path d="M1 1 L17 1 L9 11 Z"/></svg>');
  names=mk("div","tr-names");names.setAttribute("aria-hidden","true");
  turret.appendChild(base);turret.appendChild(disc);turret.appendChild(names);turret.appendChild(idx);fit.appendChild(turret);scene.appendChild(fit);
  head.appendChild(words);head.appendChild(scene);}
function enter(){build();title=page.querySelector(":scope > .page-title");lede=page.querySelector(":scope > .lede");
  page.insertBefore(head,title||page.firstChild);var how=words.querySelector(".tr-how");if(title)words.insertBefore(title,how);if(lede)words.insertBefore(lede,how);
  page.classList.add("tr-on","tu-on");on=true;wireRooms();SIG="";BSIG="";AT=-1;ACTS="\u0002";paint();}
function leave(){on=false;page.classList.remove("tr-on","tu-on","tr-stack","tr-phone");page.style.removeProperty("--tr-k");
  if(head&&head.parentNode){if(title)page.insertBefore(title,head);if(lede)page.insertBefore(lede,head);head.parentNode.removeChild(head);}}
function layout(w){var set=function(c,v){if(page.classList.contains(c)!==v)page.classList.toggle(c,v);};set("tr-stack",w<1060);set("tr-phone",w<760);
  var k="";if(w<1060){var cs=null;try{cs=getComputedStyle(page);}catch(e){}var pad=cs?(parseFloat(cs.paddingLeft)||0)+(parseFloat(cs.paddingRight)||0):0,inner=w-pad-(w<760?36:48),kk=Math.max(.3,Math.min(1,inner/460));k=kk<1?kk.toFixed(3):"";}
  if(page.style.getPropertyValue("--tr-k")!==k){if(k)page.style.setProperty("--tr-k",k);else page.style.removeProperty("--tr-k");}}
function mount(){try{page=$("page-models");if(!page)return;var w=page.clientWidth;if(!w)return;
    if(w>=260){layout(w);if(!on)enter();}else if(on)leave();}catch(e){try{console.warn("Ingenium: the Models turret",e&&e.message||e);}catch(_){}}}
function boot(){if(booted)return;page=$("page-models");var e=eng();if(!page||!e||typeof e.on!=="function"||!W.state){setTimeout(boot,700);return;}booted=true;
  e.on("status",onStatus);
  /* only a change of width matters, answered in the next frame, so the turret's own height never loops the observer */
  var lastW=-1,rq=0,onSize=function(){rq=0;var w=page?page.clientWidth:0;if(w===lastW)return;lastW=w;mount();};
  try{new ResizeObserver(function(){if(!rq)rq=requestAnimationFrame(onSize);}).observe(page);}catch(x){W.addEventListener("resize",mount);}
  /* day and night: the metal, the glass and the scale are drawn again in the Display's colours */
  try{new MutationObserver(function(){if(on){SIG="";BSIG="";schedule();}}).observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(x){}
  /* the page drawing its models again (added, renamed, recoloured, removed, chosen): the turret follows */
  var ml=$("modelList");if(ml){try{new MutationObserver(function(){if(on)schedule();}).observe(ml,{childList:true});}catch(x){}}
  mount();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngModelsTurret={state:function(){return {on:on,ports:PORTS.map(function(p){return {i:p.i,kind:p.kind,id:p.m?p.m.id:null,name:p.m?nm(p.m):"",pressed:p.el.getAttribute("aria-pressed"),label:p.el.getAttribute("aria-label")};}),
    names:NAMES.map(function(t){return t.textContent;}),count:P,turn:TURN,at:AT,target:target(),card:{name:nowName?nowName.textContent:"",says:nowSays?nowSays.textContent:"",acts:acts?[].slice.call(acts.querySelectorAll("button")).map(function(b){return b.textContent;}):[]},
    fill:base?base.getAttribute("data-fill"):null,gb:base?base.getAttribute("data-gb"):null,stack:!!(page&&page.classList.contains("tr-stack")),phone:!!(page&&page.classList.contains("tr-phone")),
    k:page?page.style.getPropertyValue("--tr-k"):"",night:night()};},
  refresh:function(){SIG="";BSIG="";paint();},press:function(id){var m=byId(id);if(m)press(m);},empty:function(){pressEmpty();}};
/* ---------- the lenses of the rooms (modules/r267.js draws them through IngTurret.lens): keys that follow the pointer and load ---------- */
var HOUSE={velox:"#7458c6",scriba:"#6a3fb5",magister:"#8641b8",faber:"#4d3db0"},ARMQ=0;
function houseOf(el){var t=el.closest&&el.closest(".lu-tile");if(!t)return "";var m=/\blu-(velox|scriba|magister|faber)\b/.exec(t.className);return m?m[1]:"";}
function houseRec(h){try{return typeof lineupRec==="function"&&typeof lineupKeyFor==="function"?lineupRec(lineupKeyFor(h)):null;}catch(e){return null;}}
function armRooms(){ARMQ=0;if(!page)return;
  [].forEach.call(page.querySelectorAll("#modelList > .model-row > .tm-ic"),function(ic){var rows=[].slice.call(ic.parentNode.parentNode.children).filter(function(x){return x.classList.contains("model-row");}),
      m=models()[rows.indexOf(ic.parentNode)];if(!m)return;arm(ic,m.id,m.color||"#6a3fb5",nm(m));});
  [].forEach.call(page.querySelectorAll("#lineupGrid .lu-tile > .tm-stage"),function(st){var h=houseOf(st);if(!h)return;var r=houseRec(h);
      arm(st,r?r.id:"",HOUSE[h]||"#6a3fb5",(r?nm(r):h.charAt(0).toUpperCase()+h.slice(1)),h);});}
function arm(el,id,col,name,house){var cv=el.querySelector("canvas");if(!cv)return;
  if(el.getAttribute("data-model")!==id)el.setAttribute("data-model",id);if(el.getAttribute("data-col")!==col)el.setAttribute("data-col",col);if(house&&el.getAttribute("data-house")!==house)el.setAttribute("data-house",house);
  if(!el.classList.contains("tm-key")){el.classList.add("tm-key");el.setAttribute("role","button");el.setAttribute("tabindex","0");el.removeAttribute("aria-hidden");}
  var lab=!id?name+": not on this device yet; press to find its Install key":(id===loadedId()?name+", in the engine: press to unload it":name+": press to load it into the engine");
  if(el.getAttribute("aria-label")!==lab)el.setAttribute("aria-label",lab);}
function pressRoom(el){var id=el.getAttribute("data-model");
  if(!id){/* not on this device yet: its own key gets it, so nothing large starts unasked */var t=el.closest(".lu-tile"),k=t&&(t.querySelector(".btn.primary")||t.querySelector(".btn"));
    if(k){try{k.scrollIntoView({block:"nearest",behavior:still()?"auto":"smooth"});}catch(e){}try{k.focus();}catch(e){}}
    try{ingToast((el.getAttribute("aria-label")||"").split(":")[0]+" is not on this device yet. Its key below gets it.");}catch(e){}return;}
  var m=byId(id);if(!m)return;press(m);
  /* the turret turns and its card says what the engine does, as the rows' Load key shows it (modules/r267.js) */
  try{head.scrollIntoView({block:"start",behavior:still()?"auto":"smooth"});}catch(e){}}
function wireRooms(){if(!page||page.__tmk)return;page.__tmk=1;var cur=null,raf=0,pt={x:0,y:0};
  function draw(el,tx,ty){var cv=el.querySelector("canvas");if(!cv)return;var S=parseFloat(cv.style.width)||cv.clientWidth||56;drawLens(cv,S,el.getAttribute("data-col")||"#6a3fb5",tx,ty,"lens");}
  function off(el){if(!el)return;el.classList.remove("tm-ph","tm-pd");el.style.removeProperty("--lx");el.style.removeProperty("--ly");draw(el,0,0);}
  page.addEventListener("pointerover",function(e){if(e.pointerType==="touch")return;var k=e.target.closest&&e.target.closest(".tm-key");if(k===cur)return;off(cur);cur=k;if(k)k.classList.add("tm-ph");},{passive:true});
  page.addEventListener("pointermove",function(e){if(!cur||e.pointerType==="touch")return;var r=cur.getBoundingClientRect();if(!r.width)return;
    pt.x=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1));pt.y=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1));
    if(!still()){cur.style.setProperty("--lx",(pt.x*9).toFixed(2)+"deg");cur.style.setProperty("--ly",(-pt.y*9).toFixed(2)+"deg");}
    if(!raf){var el=cur;raf=requestAnimationFrame(function(){raf=0;if(el===cur)draw(el,pt.x,pt.y);});}},{passive:true});
  page.addEventListener("pointerout",function(e){if(!cur)return;var to=e.relatedTarget;if(to&&cur.contains(to))return;off(cur);cur=null;},{passive:true});
  page.addEventListener("pointerdown",function(e){var k=e.target.closest&&e.target.closest(".tm-key");if(k)k.classList.add("tm-pd");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(n){page.addEventListener(n,function(){[].forEach.call(page.querySelectorAll(".tm-pd"),function(x){x.classList.remove("tm-pd");});},{passive:true});});
  page.addEventListener("click",function(e){var k=e.target.closest&&e.target.closest(".tm-key");if(!k)return;e.preventDefault();pressRoom(k);});
  page.addEventListener("keydown",function(e){var k=e.target.closest&&e.target.closest(".tm-key");if(!k||(e.key!=="Enter"&&e.key!==" "))return;e.preventDefault();pressRoom(k);});
  /* the rooms draw their lists again whenever the engine or the models change: the lenses are made keys again, once, after */
  try{new MutationObserver(function(){if(!ARMQ)ARMQ=requestAnimationFrame(armRooms);}).observe(page,{childList:true,subtree:true});}catch(x){}
  armRooms();}

/* what 6.75's turret gave the rooms of 6.76 (modules/r267.js): a model's lens, the model in the engine, load and unload */
W.IngTurret={state:function(){return {loaded:loadedId(),at:AT,turn:TURN,ports:P,models:PORTS.filter(function(p){return !!p.m;}).map(function(p){return p.m.id;}),card:nowName?nowName.textContent:"",avail:usable()};},
  rebuild:function(){SIG="";BSIG="";paint();},press:function(id){var m=byId(id);if(m)press(m);},unload:function(){unload();},
  lens:function(cv,S,m,empty,tx,ty){drawLens(cv,S,(m&&m.color)||"#6a3fb5",+tx||0,+ty||0,empty?"empty":"lens");return cv;},loaded:function(){return loadedId();},
  /* 6.78 (modules/r270.js): what stands in the way of loading a model (null when nothing does), and loading it as the turret does */
  check:function(id){var m=byId(id);return m?verdict(m):{kind:"none",name:"That model is not on this device",says:""};},load:function(id){var m=byId(id);if(m)load(m);}};
try{window.__ingParts["p269"]="running";}catch(_){}
})();
</script>
