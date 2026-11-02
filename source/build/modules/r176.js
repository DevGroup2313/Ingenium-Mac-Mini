<style id="r176-css">
/* ============ R176 · SOUND: THE ANALOGUE SOUNDS, AND THE KEYS TO GOVERN THEM (Ingenium 6.7, 25 October 2026) ============
   The controls: a Sound section at the foot of the Display panel, the same in a Sound card in Settings, and a small panel
   of choices. Everything here is drawn in Ingenium's own colours (its variables), by day and by night, raised like the
   panel's other keys, in the sizes of the panel's other keys. */
#dpSound .dp-row{margin-bottom:8px}
#dpSound label.dp-label{display:block}
.snd-vol{display:flex;align-items:center;gap:10px;min-width:0}
.snd-vol input[type=range],.isc-lvl input[type=range]{flex:1 1 auto;min-width:0;width:auto;height:28px;margin:0;accent-color:var(--accent);cursor:pointer;background:transparent}
.snd-word{flex:0 0 auto;min-width:54px;text-align:right;font:600 12px/1.2 var(--sans);color:var(--ink-2)}
#dpSound .seg-btn,#ingSoundCard .seg-btn,.isc-box .seg-btn{display:inline-flex;align-items:center;justify-content:center;gap:5px}
#dpSound .seg-btn svg,#ingSoundCard .btn svg{width:13px;height:13px;flex:0 0 auto}
.isc-status:empty{display:none}
#ingSoundCard .snd-lede{margin:4px 0 10px;font-size:13.5px;line-height:1.55;color:var(--ink-2);max-width:66ch}
#ingSoundCard .snd-row{display:flex;align-items:center;gap:10px 14px;flex-wrap:wrap;margin:10px 0}
#ingSoundCard .snd-lab{flex:0 0 auto;min-width:76px;font-size:13px;font-weight:600;color:var(--ink-1)}
#ingSoundCard .seg{margin-top:0}
#ingSoundCard .snd-vol{flex:1 1 220px;max-width:380px}
#ingSoundCard .snd-keys{display:flex;gap:8px;flex-wrap:wrap}
#ingSoundCard .snd-note{margin:8px 0 0;font-size:12.5px;line-height:1.45;color:var(--ink-3)}
/* the choices: one calm panel over the page */
#ingSoundChoices{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147482600;display:flex;align-items:center;justify-content:center;
  padding:calc(16px + env(safe-area-inset-top,0px)) calc(16px + env(safe-area-inset-right,0px)) calc(16px + env(safe-area-inset-bottom,0px)) calc(16px + env(safe-area-inset-left,0px));
  background:rgba(20,12,30,.42);animation:iscIn .16s ease-out}
body[data-theme="night"] #ingSoundChoices{background:rgba(9,6,15,.62)}
@keyframes iscIn{from{opacity:0}to{opacity:1}}
body[data-motion="minimal"] #ingSoundChoices{animation:none}
@media (prefers-reduced-motion:reduce){#ingSoundChoices{animation:none}}
.isc-box{position:relative;width:100%;max-width:620px;max-height:100%;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;
  background:linear-gradient(180deg,var(--card-hi),var(--card));color:var(--ink-1);border:1px solid var(--hairline);border-radius:16px;box-shadow:var(--pop-hi);padding:18px 20px 16px;font-family:var(--sans)}
body[data-theme="night"] .isc-box{background:#221b2e;border-color:rgba(255,255,255,.08)}
.isc-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
.isc-head h2{margin:0;font:700 19px/1.25 var(--serif);color:var(--ink-1)}
.isc-head h2:focus{outline:none}
.isc-head h2:focus-visible{outline:3px solid var(--accent);outline-offset:3px;border-radius:6px}
.isc-lede{margin:6px 0 2px;font-size:13.5px;line-height:1.5;color:var(--ink-2)}
.isc-status{margin:2px 0 6px;font-size:12.5px;line-height:1.45;color:var(--ink-3);min-height:1.45em}
.isc-role{margin:0;padding:12px 0 12px;border:0;border-top:1px solid var(--hairline);min-width:0}
.isc-role legend{float:left;width:100%;padding:0;margin:0 0 2px;font:700 11px/1.4 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.isc-when{clear:both;margin:0 0 9px;font-size:12.5px;line-height:1.45;color:var(--ink-3)}
.isc-opts{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px}
.isc-opt{display:flex;align-items:center;gap:6px;min-width:0}
.isc-box .isc-pill.seg-btn{position:relative;flex:1 1 auto;min-width:0;justify-content:flex-start;gap:8px;min-height:34px;padding:6px 12px;font-size:13px;line-height:1.2;text-align:left}
.isc-pill input{position:absolute;left:8px;top:50%;width:1px;height:1px;opacity:0;margin:0;pointer-events:none}
.isc-dot{flex:0 0 auto;width:14px;height:14px;border-radius:50%;border:2px solid currentColor;box-sizing:border-box}
.isc-pill.on .isc-dot{background:radial-gradient(circle,currentColor 0 3px,transparent 3.5px)}
.isc-pill:focus-within{outline:3px solid var(--accent);outline-offset:2px}
.isc-box .isc-listen.seg-btn{flex:0 0 auto;min-height:34px;padding:6px 11px}
.isc-listen svg{width:13px;height:13px;flex:0 0 auto}
.isc-lvl{display:flex;align-items:center;gap:10px;margin-top:10px}
.isc-lvl label{position:relative;flex:0 0 auto;min-width:64px;font-size:12.5px;font-weight:600;color:var(--ink-2)}
.isc-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
.isc-box .isc-x{min-width:30px;min-height:30px}
.isc-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;border-top:1px solid var(--hairline);padding-top:12px;margin-top:2px}
@media (max-width:600px){
  .isc-opts{grid-template-columns:1fr}
  .isc-box{padding:16px 14px 14px;border-radius:14px}
}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p97"]="started";}catch(_){}
/* ============ R176 · INGENIUM'S SOUNDS (6.7, 25 October 2026; their voices, 6.8.4, 28 October 2026) ============
   The owner's words (25 October 2026): "Ingenium is missing the analogue sounds that Carpe Diem and the Forge has, I want it
   added to Ingenium as well to further enhance the analogue and 3D sound of the app without it being too distracting." And
   (28 October 2026): "I actually do want the same warm upbeat welcoming sounds from Carpe Diem on Ingenium, I just don't
   want them identical but I do want them closely related, I want them very similar to Carpe Diem's in every way to stay in
   the family and keep the same feel. The sound is slightly better now but still too slow and sounds off."
   THE FAMILY. Carpe Diem's sound module (its pass 675, "the sounds she chose", and the passes after it; The Forge carries
   the same) is the recipe: the same two parts (a tone that rises in a few thousandths of a second and dies away, and a
   grain of filtered noise), the same granular wood clouds over a low body that drifts down as it fades, Carpe Diem's key
   tap, the same pace, the same levels (0.55 by default), straight to the speakers with nothing in the way. Ingenium's
   voices are its close relatives, in other keys and with small turns of their own, under Ingenium's own names (none of
   Carpe Diem's or The Forge's):
     room     First light: Carpe Diem's four rising notes at its pace, in A (A, C sharp, E, A), a fifth above the last
              (or Study lamp; Evensong, four notes falling)
     notify   Study chime: three notes rising, in G (or Hand bell; Ink drop)
     confirm  Seal mark: a fifth rising, in D (or Press click; Felt seal)
     paper    Page set: wood and paper set down (or Book shut; Lectern lift; Stacks pass)
     keys     Key press: Carpe Diem's key, a little lower (or Soft key; No sound)
     cards    Card lift: a board lifted, lighter (or Card chime; No sound)
   On the way, 6.8.2 tried struck, mechanical voices and 6.8.3 slow warm swells, with a room, filters, a compressor and
   placement to the left and right; she found the first harsh and the second slow and off. They are gone, and the code
   that served them with them.
   WHERE THEY SOUND, only where they cannot be mistaken for something else: crossing the welcome door (room); choosing a
   page, or the seal on Home (paper); a notice that something was saved, kept or copied (confirm); a reminder, a timed note
   or any other notice (notify); a raised key pressed (keys); a dialog, a panel or a card rising onto the screen (cards).
   Any element can ask for one with data-ing-sound="notify|confirm|room|paper". Never two in the same breath (60 ms); the
   same kind waits a moment before it sounds again; a notice that arrives as the door chime rings or just after a press
   stays silent; nothing doubles the Clepsydra's own chime.
   SILENCE WHEN IT MATTERS: never while the quiet screen is open, while a reply is being written word by word, for typing,
   or in the calm look. Off means off, the Listen and Test keys included; the focus timer's chime keeps its own switch. A
   browser lets no page sound before it has been touched, so the sound wakes at the first touch or key; it shares the
   Clepsydra's audio, so the page holds one.
   THE CONTROLS: a Sound section in the Display panel and a Sound card in Settings (On and Off, a volume named in words, More
   sound choices, Test the sounds), and a panel of choices with each kind in plain words, a Listen key for each sound and a
   level for each kind. Stored under ing_sound_67; it never reads or writes the other apps' keys. */
(function r176(){
"use strict";
if(window.__r176)return;window.__r176=1;
var W=window,D=document;
var KEY="ing_sound_67";
var AC=W.AudioContext||W.webkitAudioContext;
var OAC=W.OfflineAudioContext||W.webkitOfflineAudioContext;
var GAP=60;
var ROLE_GAP={notify:1500,confirm:150,room:600,paper:150,keys:35,cards:300,hover:40};
var AFTER_ROOM=1500,AFTER_ANY=450,AFTER_CHIME=2000;

/* ---------- the seven kinds and Ingenium's names, in plain words (6.8.4; touching a key, 6.8.5) ---------- */
var NAMES={firstLight:"First light",studyLamp:"Study lamp",evensong:"Evensong",
  studyChime:"Study chime",handBell:"Hand bell",inkDrop:"Ink drop",
  sealMark:"Seal mark",pressClick:"Press click",feltSeal:"Felt seal",
  pageSet:"Page set",bookShut:"Book shut",lecternLift:"Lectern lift",stacksPass:"Stacks pass",
  keyPress:"Key press",softKey:"Soft key",keysOff:"No sound",cardLift:"Card lift",cardChime:"Card chime",cardsOff:"No sound",
  keyTouch:"Key touch",lightTouch:"Light touch",touchOff:"No sound"};
var ROLES=[
  ["notify","Notices and reminders","When a reminder or a notice appears.",["studyChime","handBell","inkDrop"],"for notices and reminders"],
  ["confirm","Keeping something","When something is saved, kept or copied.",["sealMark","pressClick","feltSeal"],"for keeping something"],
  ["room","Entering Ingenium","When you go through the welcome door.",["firstLight","studyLamp","evensong"],"for entering Ingenium"],
  ["paper","Moving between pages","When you choose a page from the main menu, or press the seal on Home.",["pageSet","bookShut","lecternLift","stacksPass"],"for moving between pages"],
  ["keys","Pressing a key","When a raised key goes down under your finger or pointer.",["keyPress","softKey","keysOff"],"for pressing a key"],
  ["cards","A card opening","When a dialog, a panel or a card rises onto the screen.",["cardLift","cardChime","cardsOff"],"for a card opening"],
  ["hover","Touching a key","When the pointer comes onto a raised key, as in Carpe Diem and the Forge. A finger does not touch a key without pressing it, so a touch screen has only the press.",["keyTouch","lightTouch","touchOff"],"for touching a key"]];
var DEF={ver:4,on:true,vol:0.55,notify:"studyChime",confirm:"sealMark",room:"firstLight",paper:"pageSet",keys:"keyPress",cards:"cardLift",hover:"keyTouch",
  trim:{notify:1,confirm:1,room:1,paper:1,keys:1,cards:1,hover:1}};

function copy(o){return JSON.parse(JSON.stringify(o));}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function num(v){return typeof v==="number"&&isFinite(v);}
function roleOf(voice){for(var i=0;i<ROLES.length;i++)if(ROLES[i][3].indexOf(voice)>=0)return ROLES[i][0];return "notify";}
function isRole(r){for(var i=0;i<ROLES.length;i++)if(ROLES[i][0]===r)return true;return false;}

/* ---------- the settings: on or off, a level, and for each role its sound and its own level ---------- */
var cfg=load();
function load(){var o=copy(DEF);try{var raw=localStorage.getItem(KEY);if(!raw)return o;var v=JSON.parse(raw);if(!v||typeof v!=="object")return o;
  if(typeof v.on==="boolean")o.on=v.on;if(num(v.vol))o.vol=clamp(v.vol,0,1);
  /* a level kept from an earlier default (0.25 in 6.8.1, 0.6 in 6.8.2 and 6.8.3) becomes Carpe Diem's 0.55; a level she
     chose herself stays; a sound kept from before that is no longer offered gives way to the default */
  if(v.ver!==4&&num(v.vol)&&(Math.abs(v.vol-0.25)<0.001||Math.abs(v.vol-0.6)<0.001))o.vol=DEF.vol;
  ROLES.forEach(function(r){var k=r[0];if(typeof v[k]==="string"&&r[3].indexOf(v[k])>=0)o[k]=v[k];
    if(v.trim&&num(v.trim[k]))o.trim[k]=clamp(v.trim[k],0,1.5);});
  }catch(e){}return o;}
function save(){try{localStorage.setItem(KEY,JSON.stringify(cfg));}catch(e){}}
function lvl(role){return cfg.vol*(cfg.trim[role]==null?1:cfg.trim[role]);}

/* ---------- the audio: one context (the Clepsydra's own when it has one), a room, and a place for each sound ---------- */
var live=null,E=null,OUT=null,faded=false;
var EDGE=null;
function softEdge(){if(EDGE)return EDGE;var n=2049,k=new Float32Array(n);
  for(var i=0;i<n;i++){var x=i*2/(n-1)-1,a=Math.abs(x);k[i]=a<=0.8?x:(x<0?-1:1)*(0.8+0.17*Math.tanh((a-0.8)/0.17));}
  return (EDGE=k);}
/* as Carpe Diem's: straight to the speakers, nothing in the way, but a soft edge that touches nothing below 0.8 of their
   range, so a level turned all the way up can never reach their limit */
function engine(c){var e={c:c};e.master=c.createGain();e.master.gain.value=1;
  try{var edge=c.createWaveShaper();edge.curve=softEdge();edge.oversample="none";e.master.connect(edge);edge.connect(c.destination);}
  catch(x){e.master.connect(c.destination);}
  return e;}
function ctxLive(){if(!AC)return null;
  if(!live){var c=null;try{if(typeof W.fdAudioCtx==="function")c=W.fdAudioCtx();}catch(x){c=null;}
    if(!c){try{c=new AC();}catch(x){return null;}}
    try{live=engine(c);}catch(x){live=null;return null;}}
  if(live.c.state!=="running"){try{var pr=live.c.resume();if(pr&&pr.catch)pr.catch(function(){});}catch(x){}}
  return live;}
function restore(e){if(!faded)return;faded=false;try{var t=e.c.currentTime;e.master.gain.cancelScheduledValues(t);e.master.gain.setValueAtTime(1,t);}catch(x){}}
function hush(){stopTest();var e=live;if(!e)return;faded=true;try{var t=e.c.currentTime,g=e.master.gain;g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);g.linearRampToValueAtTime(0,t+0.08);}catch(x){}}


/* ---------- the parts: Carpe Diem's own (6.8.4) ----------
   A tone rises in a few thousandths of a second and dies away; a grain is a breath of filtered noise; a cloud is many
   grains scattered over a moment, wood and paper; a tap is a key's noise over its own low note. */
function rnd(a,b){return a+Math.random()*(b-a);}
function tone(t,freq,a,d,peak,type,drift){var c=E&&E.c;if(!c||!OUT)return;var o=c.createOscillator(),g=c.createGain();o.type=type||"sine";
  o.frequency.setValueAtTime(freq,t);if(drift)o.frequency.exponentialRampToValueAtTime(freq*drift,t+a+d);
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(0.0002,peak),t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+a+d);
  o.connect(g);g.connect(OUT);o.start(t);o.stop(t+a+d+0.05);}
function grain(t,dur,peak,freq,q){var c=E&&E.c;if(!c||!OUT)return;var n=Math.max(2,Math.floor(c.sampleRate*dur)),buf=c.createBuffer(1,n,c.sampleRate),d=buf.getChannelData(0),last=0;
  for(var i=0;i<n;i++){var w=Math.random()*2-1;last=last*0.55+w*0.45;d[i]=last;}
  var s=c.createBufferSource();s.buffer=buf;var f=c.createBiquadFilter();f.type="bandpass";f.frequency.setValueAtTime(freq,t);f.Q.setValueAtTime(q,t);
  var g=c.createGain();g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(0.0002,peak),t+dur*0.3);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  s.connect(f);f.connect(g);g.connect(OUT);s.start(t);s.stop(t+dur+0.02);}
function cloud(t,len,count,fLo,fHi,peak,shape){for(var i=0;i<count;i++){var u=Math.random(),at=t+Math.pow(u,shape||1)*len+rnd(-0.005,0.005);
  var env=Math.sin(Math.PI*Math.min(1,Math.max(0,(at-t)/len)));grain(at,rnd(0.008,0.026),peak*rnd(0.35,1)*(0.35+0.65*env),rnd(fLo,fHi),rnd(1.2,4));}}
function tap(t,peak,cut,dur){var c=E&&E.c;if(!c||!OUT)return;var n=Math.floor(c.sampleRate*dur),buf=c.createBuffer(1,n,c.sampleRate),d=buf.getChannelData(0);
  for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,3);
  var s=c.createBufferSource();s.buffer=buf;var bp=c.createBiquadFilter();bp.type="bandpass";bp.frequency.value=cut;bp.Q.value=0.9;var g=c.createGain();g.gain.value=peak;
  s.connect(bp);bp.connect(g);g.connect(OUT);s.start(t);
  var o=c.createOscillator();o.type="sine";o.frequency.value=cut*0.35;var og=c.createGain();og.gain.setValueAtTime(peak*0.7,t);og.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(og);og.connect(OUT);o.start(t);o.stop(t+dur+0.01);}
var V={
  /* entering Ingenium: Carpe Diem's four rising notes at its pace, in A, with a fifth above the last */
  firstLight:function(t,L){[440,554.37,659.25,880].forEach(function(f,i){tone(t+i*0.11,f,0.006,1.0,0.13*L);});tone(t+0.33,1318.51,0.006,0.8,0.035*L);},
  studyLamp:function(t,L){tone(t,180,0.02,0.7,0.16*L);grain(t,0.5,0.05*L,330,0.7);tone(t+0.08,720,0.01,0.5,0.07*L);},
  evensong:function(t,L){[659.25,554.37,440,329.63].forEach(function(f,i){tone(t+i*0.13,f,0.006,1.1,0.13*L);});},
  /* notices and reminders */
  studyChime:function(t,L){[784,987.77,1174.66].forEach(function(f,i){tone(t+i*0.07,f,0.004,0.9,0.16*L);});},
  handBell:function(t,L){tone(t,1174.66,0.003,0.85,0.20*L);tone(t,1762,0.003,0.55,0.09*L);tone(t,2349.32,0.003,0.35,0.05*L);},
  inkDrop:function(t,L){tone(t,1350,0.003,0.16,0.20*L,"sine",0.42);},
  /* keeping something */
  sealMark:function(t,L){tone(t,587.33,0.003,0.10,0.16*L);tone(t+0.075,880,0.003,0.16,0.14*L);},
  pressClick:function(t,L){grain(t,0.022,0.09*L,1750,2.5);tone(t,1300,0.001,0.02,0.07*L);},
  feltSeal:function(t,L){grain(t,0.07,0.10*L,460,1);tone(t,262,0.004,0.07,0.14*L);},
  /* moving between pages: wood and paper */
  pageSet:function(t,L){cloud(t,0.09,30,440,1600,0.050*L,0.5);tone(t,70,0.010,0.40,0.120*L,"sine",0.90);tone(t,110,0.010,0.26,0.050*L,"sine",0.92);tone(t+0.01,165,0.008,0.13,0.020*L,"sine",0.92);},
  bookShut:function(t,L){cloud(t,0.16,44,760,2700,0.055*L,0.6);tone(t+0.05,78,0.012,0.46,0.115*L,"sine",0.88);tone(t+0.05,150,0.012,0.30,0.055*L,"sine",0.90);tone(t+0.06,212,0.010,0.16,0.022*L,"sine",0.92);},
  lecternLift:function(t,L){cloud(t,0.07,14,540,1500,0.026*L,0.6);tone(t,95,0.014,0.30,0.105*L,"sine",0.90);tone(t,144,0.012,0.20,0.044*L,"sine",0.91);tone(t+0.01,192,0.008,0.10,0.016*L,"sine",0.92);},
  stacksPass:function(t,L){var at=t;for(var i=0;i<3;i++){cloud(at,0.06,11,410,1350,0.024*L,0.6);tone(at,rnd(72,98),0.012,rnd(0.20,0.30),0.062*L,"sine",0.89);tone(at+0.01,rnd(128,160),0.008,0.12,0.020*L,"sine",0.91);at+=rnd(0.105,0.150);}},
  /* pressing a key: Carpe Diem's key, a little lower */
  keyPress:function(t,L){tap(t,0.29*L,740,0.055);},
  softKey:function(t,L){tap(t,0.20*L,600,0.06);},
  keysOff:function(){},
  /* a card opening: a board lifted, lighter; or two small notes */
  cardLift:function(t,L){cloud(t,0.07,12,560,1500,0.022*L,0.6);tone(t,100,0.014,0.26,0.090*L,"sine",0.90);tone(t,150,0.012,0.18,0.038*L,"sine",0.91);},
  cardChime:function(t,L){tone(t,659.25,0.003,0.12,0.10*L);tone(t+0.06,987.77,0.003,0.18,0.08*L);},
  cardsOff:function(){},
  /* touching a key: Carpe Diem's own tick as the pointer arrives (its clack at 0.045, 1500 Hz, 20 ms), at its level */
  keyTouch:function(t,L){tap(t,0.082*L,1500,0.02);},
  lightTouch:function(t,L){tap(t,0.059*L,1500,0.02);},
  touchOff:function(){}
};

/* ---------- when a sound may play at all ---------- */
var gestured=false,gestureAt=0;
function woke(){if(gestured)return true;try{return !!(navigator.userActivation&&navigator.userActivation.hasBeenActive);}catch(e){return false;}}
/* the calm look (Settings, Support): "No moving parts, fewer things on screen", and the focus timer's chime is always off
   in it, so these rest too */
function calm(){try{if(W.state&&W.state.support&&W.state.support.calm)return true;}catch(e){}
  try{return !!(D.body&&D.body.getAttribute("data-calm")==="1");}catch(e){return false;}}
function shown(el){try{return !!el&&!el.hidden&&el.getClientRects().length>0&&getComputedStyle(el).visibility!=="hidden";}catch(e){return false;}}
function quiet(){try{if(W.IngQuiet&&typeof W.IngQuiet.isOpen==="function"&&W.IngQuiet.isOpen())return true;}catch(e){}
  return shown(D.getElementById("quietScreen"))||shown(D.getElementById("ingQuiet"));}
function writing(){try{return !!D.querySelector(".msg.msg-live");}catch(e){return false;}}
function allowed(){return cfg.on&&woke()&&!calm()&&!quiet()&&!writing();}
function recent(ms){return gestureAt&&Date.now()-gestureAt<ms;}

/* ---------- playing ---------- */
var lastAt=0,lastRole={},roomAt=0,chimeAt=0,last=null,played=0,hist=[];
function sound(voice,L){var e=ctxLive();if(!e||!V[voice])return false;
  try{restore(e);E=e;OUT=e.master;V[voice](e.c.currentTime+0.02,L==null?1:L);}catch(x){return false;}finally{E=null;OUT=null;}
  played++;last={voice:voice,role:roleOf(voice),level:L,at:Date.now()};hist.push(last);if(hist.length>24)hist.shift();return true;}
function play(role,o){o=o||{};if(!isRole(role)||!allowed())return false;
  var now=Date.now();
  if(o.auto&&(now-lastAt<AFTER_ANY||now-roomAt<AFTER_ROOM||now-chimeAt<AFTER_CHIME))return false;
  if(now-lastAt<GAP)return false;
  if(now-(lastRole[role]||0)<(ROLE_GAP[role]||0))return false;
  var L=lvl(role);if(!(L>0))return false;
  var ok=sound(cfg[role]||DEF[role],L);
  if(ok){lastAt=now;lastRole[role]=now;if(role==="room")roomAt=now;}
  return ok;}
function voice(name,o){o=o||{};if(!V[name]||!allowed())return false;var now=Date.now();if(now-lastAt<GAP)return false;
  var L=num(o.level)?o.level:lvl(roleOf(name));if(!(L>0))return false;
  var ok=sound(name,L);if(ok)lastAt=now;return ok;}

/* Test the sounds: the four, one after another, from a little left to a little right */
var testT=[];
function stopTest(){testT.forEach(function(t){clearTimeout(t);});testT=[];}
/* why a key that should sound cannot, in plain words (null when it can) */
var WORDS=["no","one","two","three","four","five","six"];
function why(role){if(!cfg.on)return "Sounds are off. Turn them on to hear them.";
  if(calm())return "The calm look is on, so the sounds are resting.";
  if(!(cfg.vol>0))return "The volume is at Silent. Turn it up to hear the sounds.";
  if(role&&!(lvl(role)>0))return "This kind of sound is set to Silent. Turn its level up to hear it.";
  return null;}
function test(){stopTest();
  var r=why(null);if(r){say(r);return false;}
  if(quiet()||writing())return false;
  var all=["keys","paper","cards","confirm","notify","room"],seq=all.filter(function(s){return lvl(s)>0;}),N=all.length;
  if(!seq.length){say("Each kind of sound is set to Silent. Turn a level up in More sound choices.");return false;}
  say(seq.length===N?"Playing the "+WORDS[N]+" sounds, one after another.":"Playing "+WORDS[seq.length]+" of the "+WORDS[N]+" sounds. The "+(N-seq.length===1?"other is":"others are")+" set to Silent.");
  seq.forEach(function(s,i){testT.push(setTimeout(function(){if(!allowed())return;var L=lvl(s);if(L>0&&sound(cfg[s],L))lastAt=Date.now();},i*750));});
  testT.push(setTimeout(function(){say(null);},seq.length*750+900));
  return true;}

/* ---------- rendering a voice away from the speakers, to check it (OfflineAudioContext) ---------- */
function render(name,o){o=o||{};return new Promise(function(res){
  if(!OAC||!V[name]){res(null);return;}
  var sr=44100,len=Math.ceil(sr*(num(o.seconds)?o.seconds:2.6)),c;
  try{c=new OAC(2,len,sr);}catch(x){res(null);return;}
  var e=engine(c),L=num(o.level)?o.level:lvl(roleOf(name));
  try{E=e;OUT=e.master;V[name](0.02,L);}catch(x){E=null;OUT=null;res(null);return;}finally{E=null;OUT=null;}
  function done(buf){var r={buf:o.keep?buf:undefined,length:buf.length,sampleRate:buf.sampleRate,peak:0,peakL:0,peakR:0,rms:0,tail:0},s=0,n=0,ts=0,tn=0,from=Math.floor(sr*(num(o.tailFrom)?o.tailFrom:1.4));
    for(var ch=0;ch<buf.numberOfChannels;ch++){var d=buf.getChannelData(ch),pk=0,es=0;
      for(var i=0;i<d.length;i++){var a=d[i]<0?-d[i]:d[i];if(a>pk)pk=a;es+=d[i]*d[i];if(i>=from){ts+=d[i]*d[i];tn++;}}
      s+=es;n+=d.length;if(ch===0){r.peakL=pk;r.energyL=es;}else{r.peakR=pk;r.energyR=es;}if(pk>r.peak)r.peak=pk;}
    r.rms=Math.sqrt(s/Math.max(1,n));r.tail=Math.sqrt(ts/Math.max(1,tn));
    /* 6.8.2: how loud it is to the ear: the loudest 50 milliseconds (a click and a held note compared fairly) */
    var w=Math.max(1,Math.floor(sr*0.05)),L0=buf.getChannelData(0),R0=buf.numberOfChannels>1?buf.getChannelData(1):L0,best=0;
    for(var st=0;st+w<=buf.length;st+=Math.floor(w/2)){var acc=0;for(var q=st;q<st+w;q++){var mm=(L0[q]+R0[q])*0.5;acc+=mm*mm;}var lv=Math.sqrt(acc/w);if(lv>best)best=lv;}
    r.loud=best;res(r);}
  try{var pr=c.startRendering();if(pr&&typeof pr.then==="function")pr.then(done,function(){res(null);});else c.oncomplete=function(ev){done(ev.renderedBuffer);};}catch(x){res(null);}});}

/* ---------- the words the keys show ---------- */
function pct(v){return Math.round(v*100);}
function volWord(v){var p=pct(v);return p<=0?"Silent":p<15?"Quiet":p<35?"Gentle":p<65?"Clear":"Full";}
function volText(v){return volWord(v)+", "+pct(v)+" percent";}
function trimWord(v){var p=pct(v);return p<=0?"Silent":p<80?"Softer":p<=120?"Same":"Louder";}
function trimText(v){var p=pct(v);return (p<=0?"Silent":p<80?"Softer than the others":p<=120?"The same as the others":"Louder than the others")+", "+p+" percent";}
/* Off is these sounds. The focus timer rings a chime of its own, with its own switch, so the words never claim more
   silence than Off gives */
function idle(only){if(!cfg.on)return "Sounds are off. The focus timer's chime has its own switch.";
  if(calm())return "The calm look is on, so the sounds are resting.";
  if(!(cfg.vol>0))return "The volume is at Silent. Turn it up to hear the sounds.";
  return only?"":"Sounds made on this device, as each thing happens.";}
var sayT=0,saying="";
function note(n){var t=saying||idle(n.getAttribute("data-snd-note")==="only");if(n.textContent!==t)n.textContent=t;}
function say(t){clearTimeout(sayT);saying=t||"";qa("[data-snd-note]").forEach(note);
  if(saying)sayT=setTimeout(function(){saying="";qa("[data-snd-note]").forEach(note);},5000);}

/* ---------- helpers ---------- */
function $(id){return D.getElementById(id);}
function qa(s,root){try{return Array.prototype.slice.call((root||D).querySelectorAll(s));}catch(e){return [];}}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
var SPEAKER='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6"/><path d="M18.3 6.5a7.6 7.6 0 0 1 0 11"/></svg>';

/* ---------- the settings change, and every key shows it ---------- */
function set(p){if(!p||typeof p!=="object")return config();
  if("on" in p){cfg.on=!!p.on;if(!cfg.on)hush();}
  if("vol" in p&&num(+p.vol))cfg.vol=clamp(+p.vol,0,1);
  ROLES.forEach(function(r){var k=r[0];if(typeof p[k]==="string"&&r[3].indexOf(p[k])>=0)cfg[k]=p[k];
    if(p.trim&&typeof p.trim==="object"&&p.trim[k]!=null&&p.trim[k]!==""&&num(+p.trim[k]))cfg.trim[k]=clamp(+p.trim[k],0,1.5);});
  /* a word said a moment ago ("The volume is at Silent") must not outlast the change that answers it: on, the volume or a
     level moved, the notes go back to what is true now (a key that speaks after it changes something says its word after) */
  if("on" in p||"vol" in p||p.trim){clearTimeout(sayT);saying="";}
  save();paint();return config();}
function config(){return copy(cfg);}
function paint(){
  qa("[data-snd-on]").forEach(function(b){var on=(b.getAttribute("data-snd-on")==="1")===cfg.on;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on?"true":"false");});
  qa("[data-snd-vol]").forEach(function(r){var v=pct(cfg.vol);if(+r.value!==v)r.value=String(v);r.setAttribute("aria-valuetext",volText(cfg.vol));});
  qa("[data-snd-word]").forEach(function(s){s.textContent=volWord(cfg.vol);});
  qa("[data-snd-note]").forEach(note);
  paintChoices();}

/* one set of keys, in the Display panel or in Settings */
function bind(root){
  qa("[data-snd-on]",root).forEach(function(b){b.addEventListener("click",function(e){var on=b.getAttribute("data-snd-on")==="1";var was=cfg.on;set({on:on});
    if(on&&!was)play("confirm",{event:e});say(null);});});
  qa("[data-snd-vol]",root).forEach(function(r){
    r.addEventListener("input",function(){set({vol:(+r.value)/100});});
    r.addEventListener("change",function(){set({vol:(+r.value)/100});play("confirm",{});});});
  qa("[data-snd-more]",root).forEach(function(b){b.addEventListener("click",function(){openChoices(b);});});
  qa("[data-snd-test]",root).forEach(function(b){b.addEventListener("click",function(){test();});});}

/* the Display panel's own section, at its foot after Feel; the panel may be built again when it opens, so it is looked
   for each time */
function ensureDisplay(){var p=$("displayPanel");if(!p||$("dpSound"))return;
  var sec=mk("div","dp-sec","Sound");sec.id="dpSoundSec";
  var w=mk("div");w.id="dpSound";
  w.innerHTML='<div class="dp-row"><div class="dp-label" id="dpSndOnL">Sounds</div><div class="seg" role="group" aria-labelledby="dpSndOnL" id="dpSndOn">'
    +'<button type="button" class="seg-btn" data-snd-on="1" aria-pressed="false">On</button><button type="button" class="seg-btn" data-snd-on="0" aria-pressed="false">Off</button></div></div>'
    +'<div class="dp-row"><label class="dp-label" for="dpSndVol">Volume</label><div class="snd-vol"><input type="range" id="dpSndVol" data-snd-vol min="0" max="100" step="5" value="60">'
    +'<span class="snd-word" aria-hidden="true" data-snd-word></span></div></div>'
    +'<div class="dp-row"><div class="seg"><button type="button" class="seg-btn" id="dpSndMore" data-snd-more aria-haspopup="dialog">More sound choices</button>'
    +'<button type="button" class="seg-btn" id="dpSndTest" data-snd-test>'+SPEAKER+'Test the sounds</button></div>'
    +'<div class="dp-note" id="dpSndNote" role="status" aria-live="polite" data-snd-note></div></div>';
  p.appendChild(sec);p.appendChild(w);bind(w);paint();}

/* the same in Settings, a card of its own beside Look and feel */
function ensureCard(){var pg=$("page-settings");if(!pg||$("ingSoundCard"))return;
  var card=mk("div","card");card.id="ingSoundCard";
  card.innerHTML='<h2 class="sec" id="ingSoundH">Sound</h2>'
    +'<p class="snd-lede">Small, warm sounds: entering Ingenium, moving between pages, touching and pressing a key, a card opening, keeping something, and a reminder. Each one is made on this device as it plays, so nothing is downloaded.</p>'
    +'<div class="snd-row"><span class="snd-lab" id="setSndOnL">Sounds</span><div class="seg" role="group" aria-labelledby="setSndOnL" id="setSndOn">'
    +'<button type="button" class="seg-btn" data-snd-on="1" aria-pressed="false">On</button><button type="button" class="seg-btn" data-snd-on="0" aria-pressed="false">Off</button></div></div>'
    +'<div class="snd-row"><label class="snd-lab" for="setSndVol">Volume</label><div class="snd-vol"><input type="range" id="setSndVol" data-snd-vol min="0" max="100" step="5" value="60">'
    +'<span class="snd-word" aria-hidden="true" data-snd-word></span></div></div>'
    +'<div class="snd-row snd-keys"><button type="button" class="btn" id="setSndMore" data-snd-more aria-haspopup="dialog">More sound choices</button>'
    +'<button type="button" class="btn" id="setSndTest" data-snd-test>Test the sounds</button></div>'
    +'<p class="snd-note" id="setSndNote" role="status" aria-live="polite" data-snd-note></p>';
  var after=null;qa("#page-settings h2.sec").some(function(h){if(/^\s*Look and feel\s*$/i.test(h.textContent||"")){after=h.closest(".card");return !!after;}return false;});
  if(after&&after.parentNode)after.parentNode.insertBefore(card,after.nextSibling);
  else{var bk=$("bkCard");if(bk&&bk.parentNode)bk.parentNode.insertBefore(card,bk);else pg.appendChild(card);}
  bind(card);paint();}

/* ---------- More sound choices: each role in plain words, its sounds with a Listen key each, its own level ---------- */
var opener=null;
function openChoices(from){if($("ingSoundChoices")){var h0=$("iscTitle");if(h0)h0.focus();return;}
  opener=from||D.activeElement||null;
  var back=mk("div");back.id="ingSoundChoices";
  var box=mk("div","isc-box");box.setAttribute("role","dialog");box.setAttribute("aria-modal","true");box.setAttribute("aria-labelledby","iscTitle");box.setAttribute("aria-describedby","iscLede");
  var head=mk("div","isc-head"),h=mk("h2",null,"Sound choices");h.id="iscTitle";h.tabIndex=-1;
  var x=mk("button","cl-chev isc-x","×");x.type="button";x.setAttribute("aria-label","Close sound choices");x.addEventListener("click",closeChoices);
  head.appendChild(h);head.appendChild(x);box.appendChild(head);
  var lede=mk("p","isc-lede","Six kinds of sound. Choose one for each, and how loud it is. Listen plays it once.");lede.id="iscLede";box.appendChild(lede);
  var st=mk("p","isc-status");st.setAttribute("role","status");st.setAttribute("aria-live","polite");st.setAttribute("data-snd-note","only");box.appendChild(st);
  ROLES.forEach(function(r){var k=r[0];
    var fs=mk("fieldset","isc-role");fs.setAttribute("data-role",k);
    var lg=mk("legend",null,r[1]);fs.appendChild(lg);
    var wh=mk("p","isc-when",r[2]);wh.id="iscW-"+k;fs.appendChild(wh);
    var opts=mk("div","isc-opts");
    r[3].forEach(function(v){var row=mk("div","isc-opt");
      var lab=mk("label","seg-btn isc-pill");lab.setAttribute("data-voice",v);
      var inp=mk("input");inp.type="radio";inp.name="isc-"+k;inp.value=v;inp.id="isc-"+v;inp.setAttribute("aria-describedby","iscW-"+k);
      inp.addEventListener("change",function(){if(!inp.checked)return;var o={};o[k]=v;set(o);var w=why(k);if(w)say(w);else voice(v,{});});
      lab.appendChild(inp);lab.appendChild(mk("span","isc-dot"));lab.appendChild(mk("span",null,NAMES[v]));
      var ls=mk("button","seg-btn isc-listen");ls.type="button";ls.setAttribute("data-listen",v);ls.setAttribute("aria-label","Listen to "+NAMES[v]);ls.innerHTML=SPEAKER+"<span>Listen</span>";
      ls.addEventListener("click",function(e){var w=why(k);if(w){say(w);return;}voice(v,{event:e,level:lvl(k)});});
      row.appendChild(lab);row.appendChild(ls);opts.appendChild(row);});
    fs.appendChild(opts);
    /* each level is named for its role, so a screen reader's list of controls tells the four apart */
    var lv=mk("div","isc-lvl"),ll=mk("label",null,"Its level");ll.htmlFor="iscL-"+k;ll.appendChild(mk("span","isc-sr"," "+r[4]));
    var rg=mk("input");rg.type="range";rg.id="iscL-"+k;rg.min="0";rg.max="150";rg.step="10";rg.setAttribute("data-trim",k);
    rg.addEventListener("input",function(){var o={trim:{}};o.trim[k]=(+rg.value)/100;set(o);});
    rg.addEventListener("change",function(){var o={trim:{}};o.trim[k]=(+rg.value)/100;set(o);voice(cfg[k],{});});
    var wd=mk("span","snd-word");wd.setAttribute("aria-hidden","true");wd.setAttribute("data-trim-word",k);
    lv.appendChild(ll);lv.appendChild(rg);lv.appendChild(wd);fs.appendChild(lv);
    box.appendChild(fs);});
  var foot=mk("div","isc-foot");
  var rs=mk("button","seg-btn","Back to the first choices");rs.type="button";rs.addEventListener("click",function(){var o={trim:{}};ROLES.forEach(function(r){o[r[0]]=DEF[r[0]];o.trim[r[0]]=1;});set(o);say("Back to the first choices.");});
  var dn=mk("button","btn primary","Done");dn.type="button";dn.addEventListener("click",closeChoices);
  foot.appendChild(rs);foot.appendChild(dn);box.appendChild(foot);
  back.appendChild(box);
  /* a press inside stays inside: the Display panel under it stays open */
  back.addEventListener("click",function(e){if(e.target===back)closeChoices();e.stopPropagation();});
  D.body.appendChild(back);D.addEventListener("keydown",keys,true);
  paint();setTimeout(function(){try{h.focus();}catch(e){}},30);}
function paintChoices(){var b=$("ingSoundChoices");if(!b)return;
  ROLES.forEach(function(r){var k=r[0];
    qa('input[name="isc-'+k+'"]',b).forEach(function(i){var on=i.value===cfg[k];if(i.checked!==on)i.checked=on;var l=i.closest("label");if(l)l.classList.toggle("on",on);});
    qa('[data-trim="'+k+'"]',b).forEach(function(g){var v=pct(cfg.trim[k]);if(+g.value!==v)g.value=String(v);g.setAttribute("aria-valuetext",trimText(cfg.trim[k]));});
    qa('[data-trim-word="'+k+'"]',b).forEach(function(s){s.textContent=trimWord(cfg.trim[k]);});});}
function focusables(root){return qa('button,input,[href],select,textarea,[tabindex]:not([tabindex="-1"])',root).filter(function(e){return !e.disabled&&e.getClientRects().length>0&&!(e.type==="radio"&&!e.checked&&qa('input[name="'+e.name+'"]:checked',root).length);});}
function keys(e){var b=$("ingSoundChoices");if(!b){D.removeEventListener("keydown",keys,true);return;}
  if(e.key==="Escape"||e.key==="Esc"){e.preventDefault();e.stopPropagation();closeChoices();return;}
  if(e.key==="Tab"){var f=focusables(b.querySelector(".isc-box"));if(!f.length)return;var first=f[0],lastF=f[f.length-1],a=D.activeElement;
    if(e.shiftKey&&(a===first||a===$("iscTitle")||!b.contains(a))){e.preventDefault();lastF.focus();}
    else if(!e.shiftKey&&(a===lastF||!b.contains(a))){e.preventDefault();first.focus();}}}
function closeChoices(){var b=$("ingSoundChoices");if(b&&b.parentNode)b.parentNode.removeChild(b);D.removeEventListener("keydown",keys,true);
  var to=opener;opener=null;
  if(!(to&&D.contains(to)&&to.getClientRects().length))to=$("displayBtn");
  try{if(to)to.focus();}catch(e){}}

/* ---------- where they sound ---------- */
var KEPT=/^(saved|kept|copied|added|remembered|restored|stored|installed|exported|imported|downloaded|done|undone|moved|renamed|pinned|sent|backed up|put away)\b|^\d+ [a-z ]{1,24}?\b(added|exported|imported|saved|kept|copied)\b|\b(is|are|was|were|has been|have been)( now)? (saved|kept|stored|added|installed|copied|backed up)\b|\bkept in\b/i;
/* a warning, a refusal or a limit is never taken for a keeping: a store that is full ("so your desk is kept in the app's
   copy on disk"), a notice that opens with No or Not ("No posting was added"), "the last one chosen was kept" */
var NOT=/could not|couldn['’]t|cannot|can['’]t|did not|didn['’]t|not (saved|kept|added|copied)|failed|error|no longer|nothing to|\bfull\b|quota|out of space|no room|^(no|not)\b|\bthe last one\b/i;
function kept(s){return KEPT.test(s)&&!NOT.test(s);}
/* a line that ends in an ellipsis is work in progress ("Reading the file…", "Opening it in Build…"), not a notice: it
   stays silent, and the notice that follows it sounds */
function progress(s){return /(…|\.\.\.)\s*$/.test(s);}
function notice(text,el){var s=String(text==null?"":text).trim();if(!s||progress(s))return false;var role=kept(s)?"confirm":"notify";
  return play(role,{auto:true,recent:role==="confirm",el:el||null});}
function current(){var s=D.querySelector(".main > section.active, main > section.active");if(s&&s.id)return s.id.replace(/^page-/,"");
  var b=D.querySelector(".dock .nav-btn.active");return b?(b.getAttribute("data-page")||""):"";}

function wake(e){if(e&&e.isTrusted===false)return;gestured=true;gestureAt=Date.now();
  if(!cfg.on)return;
  var lv=ctxLive();
  /* older Safari wakes only for a sound actually started inside the touch: one silent sample, once */
  if(lv&&!W.AudioContext&&W.webkitAudioContext&&!wake.done){try{var c=lv.c,b=c.createBuffer(1,1,22050),s=c.createBufferSource();s.buffer=b;s.connect(c.destination);(s.start||s.noteOn).call(s,0);wake.done=1;}catch(x){}}}
["pointerdown","keydown","click"].forEach(function(t){D.addEventListener(t,wake,true);});
try{D.addEventListener("touchend",wake,{capture:true,passive:true});}catch(e){D.addEventListener("touchend",wake,true);}

var doorAt=0;
D.addEventListener("click",function(e){if(!e.isTrusted)return;var t=e.target;if(!t||!t.closest)return;
  try{
    if(t.closest("#displayBtn")){ensureDisplay();setTimeout(function(){ensureDisplay();paint();},0);return;}
    if(t.closest("#ingSoundChoices,#dpSound,#ingSoundCard"))return;
    var tag=t.closest("[data-ing-sound]");
    if(tag){var r=tag.getAttribute("data-ing-sound");if(isRole(r))play(r,{event:e});return;}
    var door=$("introDoor");
    if(door&&!door.hidden&&t.closest("#introEnter,#introSeal")){if(play("room",{event:e}))doorAt=Date.now();return;}
    var nb=t.closest(".nav-btn");
    if(nb&&nb.closest(".dock")){var pg=nb.getAttribute("data-page");if(pg&&pg!==current())play("paper",{event:e,page:pg});return;}
    if(t.closest("#hxSeal,[data-ing-seal]"))play("paper",{event:e});
  }catch(x){}},true);
/* the seal on Home, pressed from the keyboard while it holds the focus (a button gives a click of its own) */
D.addEventListener("keydown",function(e){if(!e.isTrusted||(e.key!=="Enter"&&e.key!==" "))return;var t=e.target;
  if(t&&(t.id==="hxSeal"||(t.hasAttribute&&t.hasAttribute("data-ing-seal")))&&t.tagName!=="BUTTON")play("paper",{});},true);

/* 6.8.2: a raised key going down sounds as it moves (pointer or Enter and Space on it); never for typing, never inside the
   sound choices (Listen must be heard alone), never at the welcome door (it has its own). It never holds back the other
   sounds: a key's press is not counted as the last sound. */
var KEYSEL='.btn,.seg-btn,.tc-key,.nav-btn,.hx-key,.f-btn,.cl-chev,.cl-key,[role="tab"],.ib-key,.chip,.menu-btn,.rail-btn,.chat-top-key,.effort-opt,.bk-key,.l-btn,.cs-key,.quick,.src-btn,.cplus-btn,.stage-pill,.fo-k,.rc-k,'+
  '.hx-app,.c-btn,.c-item,.c-opp,.c-howk,.c-seg button,.ib-act',keyAt=0;   /* 6.8.5: the apps on Home, the Career Studio's keys, the Inbox's */
function keyDown(k,e){if(!k||k.disabled||k.getAttribute("aria-disabled")==="true"||!allowed())return false;
  if(k.closest("#ingSoundChoices,#introDoor,[data-snd-test],[data-snd-on]"))return false;
  var now=Date.now();if(now-keyAt<(ROLE_GAP.keys||35))return false;var L=lvl("keys");if(!(L>0))return false;keyAt=now;
  return sound(cfg.keys||DEF.keys,L);}
D.addEventListener("pointerdown",function(e){if(!e.isTrusted||(e.button!=null&&e.button!==0))return;var t=e.target;if(!t||!t.closest)return;
  try{keyDown(t.closest(KEYSEL),e);}catch(x){}},true);
D.addEventListener("keydown",function(e){if(!e.isTrusted||e.repeat||(e.key!=="Enter"&&e.key!==" "))return;var t=e.target;
  try{if(t&&t.matches&&t.tagName==="BUTTON"&&t.matches(KEYSEL))keyDown(t,null);}catch(x){}},true);
/* 6.8.5: as in Carpe Diem and the Forge, a raised key ticks faintly as the pointer comes onto it (a mouse or a pen; a touch
   is a press). The same key does not tick twice in a row, as in Carpe Diem; never inside the sound choices or at the door. */
var HOVERSEL=KEYSEL+',.tabula-btn,.abacus-btn,.imago-btn,.scriba-btn,.scriba-app-btn,.fontes-btn',hoverAt=0,lastHover=null;
function hoverOn(k){if(!k||k.disabled||k.getAttribute("aria-disabled")==="true"||!allowed())return false;
  if(k.closest("#ingSoundChoices,#introDoor,[data-snd-test],[data-snd-on]"))return false;
  var now=Date.now();if(now-hoverAt<(ROLE_GAP.hover||40))return false;var L=lvl("hover");if(!(L>0))return false;hoverAt=now;
  return sound(cfg.hover||DEF.hover,L);}
D.addEventListener("pointerover",function(e){if(!e.isTrusted||e.pointerType==="touch")return;var t=e.target;if(!t||!t.closest)return;
  try{var k=t.closest(HOVERSEL);if(!k||k===lastHover)return;lastHover=k;hoverOn(k);}catch(x){}},true);
/* 6.8.2: a dialog, a panel or the tour's card rising onto the screen is lifted onto the desk (the notices and reminders keep
   their own sound) */
var cardAt=0;
function cardUp(el){if(!allowed())return false;var now=Date.now();if(now-cardAt<(ROLE_GAP.cards||300)||now-roomAt<1200)return false;
  var L=lvl("cards");if(!(L>0))return false;cardAt=now;return sound(cfg.cards||DEF.cards,L);}
/* the cards that are kept in the page and only shown (the Display panel, the help, the reminders, the bell, the
   presentation menu): heard as they rise, whether shown with hidden taken away or with their arrival drawn (r184's rcIn) */
var CARDSEL="#displayPanel,#ihPanel,#remPanel,#bellPanel,#schedaePanel,#tourMenu,.pres-menu,.tour-card,#ing-export-choice,.isc-box";
function isCard(n){try{return !!(n&&n.nodeType===1&&n.matches&&n.matches(CARDSEL));}catch(e){return false;}}
D.addEventListener("animationstart",function(e){if(e.animationName==="rcIn"&&isCard(e.target))cardUp(e.target);},true);
function watchShown(){try{new MutationObserver(function(ms){ms.forEach(function(m){var n=m.target;if(isCard(n)&&!n.hidden&&m.oldValue!==null)cardUp(n);});})
  .observe(D.body,{attributes:true,attributeFilter:["hidden"],attributeOldValue:true,subtree:true});}catch(e){}}
function watchModal(){var m=$("modalRoot");if(!m||m.__r176c)return;m.__r176c=1;var was=m.classList.contains("open");
  try{new MutationObserver(function(){var now=m.classList.contains("open");if(now&&!was)cardUp($("modalBox")||m);was=now;}).observe(m,{attributes:true,attributeFilter:["class"]});}catch(e){}}
/* the welcome door: however it is crossed (Enter, its seal, the tour, Escape, a press beside the card) */
function watchDoor(){var d=$("introDoor");if(!d||d.__r176)return;d.__r176=1;var was=!d.hidden;
  try{new MutationObserver(function(){var now=!d.hidden;if(was&&!now&&Date.now()-doorAt>1200&&recent(1500))play("room",{});was=now;})
    .observe(d,{attributes:true,attributeFilter:["hidden"]});}catch(e){}}
/* the notices at the foot of the page: Ingenium's own (ingToast) */
function wrapToast(){var o=W.ingToast;if(typeof o!=="function"||o.__r176)return;
  var w=function(t){var r=o.apply(this,arguments);try{notice(t,$("ingToast"));}catch(e){}return r;};
  Object.keys(o).forEach(function(p){try{w[p]=o[p];}catch(e){}});w.__r176=1;try{W.ingToast=w;}catch(e){}}
/* the Clepsydra rings its own chime when a session ends: nothing of ours rings over it */
function wrapChime(){var f=W.pomoChime;if(typeof f!=="function"||f.__r176)return;
  var w=function(){try{var s=W.state;if(s&&s.clep&&s.clep.sound&&!(s.support&&s.support.calm))chimeAt=Date.now();}catch(e){}return f.apply(this,arguments);};
  w.__r176=1;try{W.pomoChime=w;}catch(e){}}
/* the seal on Home, when it has its own press (IngSealPlay): it sounds with it, only after a real press */
function wrapSeal(){var f=W.IngSealPlay;if(typeof f!=="function"||f.__r176)return;
  var w=function(){var r=f.apply(this,arguments);try{if(recent(1200))play("paper",{el:$("hxSeal")});}catch(e){}return r;};
  try{Object.keys(f).forEach(function(k){w[k]=f[k];});}catch(e){}w.__r176=1;try{W.IngSealPlay=w;}catch(e){}}
/* the reminders and timed notes: the support module's cards, its two-minute word, the thought cloud's reminder, Custodia */
function watchSup(){var h=$("supNotice");if(!h||h.__r176)return;h.__r176=1;
  try{new MutationObserver(function(ms){ms.forEach(function(m){Array.prototype.forEach.call(m.addedNodes,function(n){if(n.nodeType===1)play("notify",{auto:true,el:n});});});})
    .observe(h,{childList:true});}catch(e){}}
function watchScToast(){var s=$("sc-toast");if(!s||s.__r176)return;s.__r176=1;var was=s.classList.contains("show");
  try{new MutationObserver(function(){var now=s.classList.contains("show");if(now&&!was)play("notify",{auto:true,el:s});was=now;}).observe(s,{attributes:true,attributeFilter:["class"]});}catch(e){}}
/* Fabrica's own notices, in its own corner (its progress lines share the look and end in an ellipsis: notice() lets
   them pass in silence) */
function watchFb(){var f=$("fb");if(!f||f.__r176)return;f.__r176=1;
  try{new MutationObserver(function(ms){ms.forEach(function(m){Array.prototype.forEach.call(m.addedNodes,function(n){if(n.nodeType===1&&n.classList&&n.classList.contains("f-toast"))notice(n.textContent,n);});});})
    .observe(f,{childList:true});}catch(e){}}
function bodyWatch(){try{new MutationObserver(function(ms){ms.forEach(function(m){Array.prototype.forEach.call(m.addedNodes,function(n){if(n.nodeType!==1)return;
    if(n.id==="displayPanel"){ensureDisplay();cardUp(n);}
    else if(n.id==="ihPanel"||(n.classList&&n.classList.contains("tour-card")))cardUp(n);
    else if(n.id==="sc-toast")watchScToast();
    else if(n.id==="custodiaOverlay")play("notify",{auto:true,el:n.querySelector(".cust-card")||n});
    else if(n.classList&&n.classList.contains("tc-nudge"))play("notify",{auto:true,el:n.querySelector(".tc-body")||n});});});})
  .observe(D.body,{childList:true});}catch(e){}}

function sweep(){try{ensureDisplay();ensureCard();watchDoor();watchModal();watchSup();watchScToast();watchFb();wrapToast();wrapChime();wrapSeal();}catch(e){try{console.warn("Ingenium sound:",e&&e.message||e);}catch(_){}}}
function init(){sweep();bodyWatch();watchShown();setInterval(sweep,1500);
  /* the calm look may change in Settings: the notes say so */
  try{new MutationObserver(function(){paint();}).observe(D.body,{attributes:true,attributeFilter:["data-calm"]});}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",init);else init();

W.IngSound={version:176,
  play:function(role,o){return play(role,o);},
  voice:function(name,o){return voice(name,o);},
  config:config,set:set,test:test,stop:hush,render:render,
  choices:function(){openChoices(D.activeElement);},close:closeChoices,
  notice:function(t){return notice(t,null);},
  last:function(){return last?copy(last):null;},count:function(){return played;},history:function(){return copy(hist);},
  allowed:allowed,
  roles:ROLES.map(function(r){return {id:r[0],name:r[1],when:r[2],voices:r[3].slice()};}),
  names:copy(NAMES),defaults:copy(DEF)};
})();
;try{window.__ingParts["p97"]="running";}catch(_){}
</script>
