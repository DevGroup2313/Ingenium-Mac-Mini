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
/* ============ R176 · THE ANALOGUE SOUNDS, FROM THE OWNER'S OWN TEMPLATE (Ingenium 6.7, 25 October 2026) ============
   The owner's words (25 October 2026): "Ingenium is missing the analogue sounds that Carpe Diem and the Forge has, I want it
   added to Ingenium as well to further enhance the analogue and 3D sound of the app without it being too distracting. I want
   you adopt Carpe Diem's template and also have the accessible controls in the display panel to turn the sounds off."
   WHERE IT COMES FROM. The template is Carpe Diem's sound module as it ships (its pass 675, "the sounds she chose", with
   passes 678, 702, 710, 711, 713, 718 and 765 after it; The Forge carries the same block). The thirteen voices are ported
   here exactly: the same two primitives (a tone, and a grain of filtered noise), the same granular wood clouds over a low
   body that drifts down as it fades, the same numbers, so each sounds as it does in her other two apps. Every sound is made
   on the device at the moment it plays: no audio files, no bytes added for sound, nothing needed from a connection. Four
   roles, with the alternates she chose after four rounds of listening:
     notify   Desk chime   (Small bell, Water drop)
     confirm  Keep mark    (Soft click, Felt press)
     room     Day turn     (Lamp lit, Dusk fall)
     paper    Desk set     (Book close, Board lift, Shelf pass)
   WHAT CHANGED, AND WHY.
   - Its own name and its own drawer: window.IngSound, stored under ing_sound_67. It never reads or writes the other apps'
     keys, and none of their names is in its code (the gift and demo editions name none of her apps).
   - Gentler by default: the template's level was 0.55; Ingenium starts at 0.25, about 0.45 of it, so the sounds sit
     under the work rather than on it. The volume can go up to the template's full range.
   - The "3D": each sound is placed a little to the left or right by where it happened on the screen (at most 0.35 of the
     way to either side; the middle for the keyboard and for anything with no place), and a small room is around every
     sound: a short reverberation made on the device (a 0.8-second impulse of darkening noise with a few early
     reflections, from a fixed seed so the room is the same every session), mixed low, and the same in both ears, so a
     sound meant for the middle stays in the middle. Where the browser has no stereo panner (older Safari) an equal-power panner does the same,
     and where it has neither the sound plays in the middle. A sound placed to one side keeps its loudness (equal power,
     levelled to the middle), so nothing is louder or softer than in her other apps, only placed.
   - Where they sound, only where they cannot be mistaken for something else: crossing the welcome door (room); choosing a
     page from the side bar or, on a phone, the strip at the top (paper); a notice that something was saved, kept or copied
     (confirm); a reminder, a timed note or any other notice appearing (notify); and pressing the seal on Home (paper: a
     seal set down on a wooden desk). Any element can also ask for one with data-ing-sound="notify|confirm|room|paper".
   - Never two in the same breath (the template's 60 ms), and no chatter: the same kind waits a moment before it sounds
     again (a page change 150 ms, a notice 1.5 s), a notice that arrives as the door chime rings or just after a press
     stays silent, and nothing doubles the Clepsydra's own chime when a session ends.
   - Silence when it matters: never while the quiet screen is open, never while a reply is being written word by word,
     never for typing, and never in the calm look (Settings, Support), in which the focus timer's chime is already always
     off. Minimal motion leaves the sounds as they are: motion and sound are different senses, the Sound keys turn them
     off in one press, and the calm look is the switch that quiets everything at once. Off means these sounds are off:
     nothing of them plays at all, the Listen and Test keys included. The focus timer's chime keeps its own switch, and
     the words on screen say so rather than promise a silence Off does not give.
   - A browser lets no page sound before it has been touched (iPhone, iPad and Fire tablets most of all), so the sound is
     woken at the first touch or key and never before; it shares the Clepsydra's own audio, so the page holds one.
   - The controls are Ingenium's: a Sound section in the Display panel and a Sound card in Settings (On and Off, a volume
     named in words, More sound choices, Test the sounds), and a panel of choices with each role in plain words, a Listen
     key for each sound and a level for each role.
   THE SECOND LOOK (the same day), after an independent review: the room is one for both ears (it had made centred sounds
   lean to one side by chance) and comes from a fixed seed; a progress line ending in an ellipsis, Fabrica's included, no
   longer chimes; a full store or a notice that opens with No is no longer taken for a keeping; Test and Listen say when
   the volume or a level is at Silent instead of claiming to play; the four level sliders carry their role in their names;
   the words for Off no longer promise more silence than Off gives; the calm look is named as Settings names it; and a word
   said a moment ago gives way as soon as the volume, a level or On and Off change, so the note never contradicts the keys. */
/* 6.8.1 (27 October 2026): her words, "I also want for Ingenium's introduction door sound and other app sounds to be
   different from Carpe Diem and the Forge. I want Ingenium to have its own identity and its own sounds." The engine above
   stays (made on the device, placed left or right, a small room around each, the same quiet levels and the same rules for
   when a sound may play); the voices are Ingenium's own, the things of a college study (see "Ingenium's own" below):
     notify   Tuning fork   (Orrery bell, Margin note)
     confirm  Wax seal      (Escapement, Brass stamp)
     room     Library door  (Study lamp, Archive key)
     paper    Each room its own: a page turned in Lector, Guide and the apps, a card drawer in Fabrica and Models, a pen in
              Chat, a typebar in Code and Build, a brass gear in Focus and Blend, a ledger's tap at Home and in Settings
              (or one of those six for every page)
   A choice kept from before (one of Carpe Diem's names) gives way to Ingenium's own at the next start. */
/* 6.8.2 (28 October 2026): her words, "I don't like Ingenium's new sound systems, it sounds weak and mild. Its not creative
   enough, I want the entire app and software to feel alive and realistic hence the 3D animated look, right now it all
   sounds dead and weak and I HATE IT." Measured, the voices of 6.8.1 peaked at 0.006 to 0.042 of full scale at the default
   level (44 to 28 dB below it), and each was a few pure tones that died away the same way every time. Now:
     - each voice is built as the thing itself sounds: a strike or a touch first (a click of metal, the felt of a key, the
       contact of a seal), then the thing's own resonances, uneven as real ones are (a bell's partials, a fork's clang and
       its twin tine beating, the modes of oak, boxwood and brass), friction where something slides or turns (a hinge, a
       key in a lock, a drawer on its runners), paper moving through the air from one side to the other, and air;
     - no two plays are the same: every pitch, strength and decay moves a little each time, as a struck thing does;
     - fuller and nearer: the default level is 0.6 (it was 0.25; a level she set herself is kept), a warmth and presence
       shelf, a gentle compressor, a limiter and a soft edge bring the sounds forward and keep every peak below 0.95, the
       room is larger (1.3 seconds, a panelled study's early reflections), paper and air move from one side to the other
       as they cross, and a sound is placed further to the side it happened on (0.6 of the way, it was 0.35);
     - and the app's keys and cards sound as they move: a key that goes down under the finger has its own small mechanical
       press (felt, brass or boxwood), and a dialog, a panel or a card that rises onto the screen is lifted onto the desk.
       Both are among the choices, each with its own level, and Off still silences everything. */
(function r176(){
"use strict";
if(window.__r176)return;window.__r176=1;
var W=window,D=document;
var KEY="ing_sound_67";
var AC=W.AudioContext||W.webkitAudioContext;
var OAC=W.OfflineAudioContext||W.webkitOfflineAudioContext;
var GAP=60;
var ROLE_GAP={notify:1500,confirm:150,room:600,paper:150,keys:35,cards:300};
var AFTER_ROOM=1500,AFTER_ANY=450,AFTER_CHIME=2000;
var PAN_MAX=0.6,ROOM_SEND=0.22,ROOM_LEN=1.3,ROOM_SEED=0x1C67;

/* ---------- the six roles and Ingenium's names, in plain words (6.8.1; the keys and the cards, 6.8.2) ---------- */
var NAMES={tuningFork:"Tuning fork",orreryBell:"Orrery bell",marginNote:"Margin note",
  waxSeal:"Wax seal",escapement:"Escapement",brassStamp:"Brass stamp",
  libraryDoor:"Library door",studyLamp:"Study lamp",archiveKey:"Archive key",
  byRoom:"Each room its own",vellumTurn:"Vellum turn",cardDrawer:"Card drawer",ledgerTap:"Ledger tap",nibStroke:"Pen on paper",typebar:"Typebar",gearTurn:"Brass gear",
  feltKey:"Felt key",brassButton:"Brass button",boxwoodKey:"Boxwood key",cardLift:"Card lifted",folioOpen:"Leather folio",slateSlide:"Slate slid"};
var ROLES=[
  ["notify","Notices and reminders","When a reminder or a notice appears.",["tuningFork","orreryBell","marginNote"],"for notices and reminders"],
  ["confirm","Keeping something","When something is saved, kept or copied.",["waxSeal","escapement","brassStamp"],"for keeping something"],
  ["room","Entering Ingenium","When you go through the welcome door.",["libraryDoor","studyLamp","archiveKey"],"for entering Ingenium"],
  ["paper","Moving between pages","When you choose a page from the main menu, or press the seal on Home. At first, each room has its own.",["byRoom","vellumTurn","cardDrawer","ledgerTap","nibStroke","typebar","gearTurn"],"for moving between pages"],
  ["keys","Pressing a key","When a raised key goes down under your finger or pointer.",["feltKey","brassButton","boxwoodKey"],"for pressing a key"],
  ["cards","A card opening","When a dialog, a panel or a card rises onto the screen.",["cardLift","folioOpen","slateSlide"],"for a card opening"]];
var DEF={ver:2,on:true,vol:0.6,notify:"tuningFork",confirm:"waxSeal",room:"libraryDoor",paper:"byRoom",keys:"feltKey",cards:"cardLift",
  trim:{notify:1,confirm:1,room:1,paper:1,keys:1,cards:1}};

function copy(o){return JSON.parse(JSON.stringify(o));}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function num(v){return typeof v==="number"&&isFinite(v);}
function roleOf(voice){for(var i=0;i<ROLES.length;i++)if(ROLES[i][3].indexOf(voice)>=0)return ROLES[i][0];return "notify";}
function isRole(r){for(var i=0;i<ROLES.length;i++)if(ROLES[i][0]===r)return true;return false;}

/* ---------- the settings: on or off, a level, and for each role its sound and its own level ---------- */
var cfg=load();
function load(){var o=copy(DEF);try{var raw=localStorage.getItem(KEY);if(!raw)return o;var v=JSON.parse(raw);if(!v||typeof v!=="object")return o;
  if(typeof v.on==="boolean")o.on=v.on;if(num(v.vol))o.vol=clamp(v.vol,0,1);
  /* 6.8.2: the default of 6.8.1 (0.25) was too quiet; kept unchanged it becomes the new default, a level she chose stays */
  if(v.ver!==2&&num(v.vol)&&Math.abs(v.vol-0.25)<0.001)o.vol=DEF.vol;
  ROLES.forEach(function(r){var k=r[0];if(typeof v[k]==="string"&&r[3].indexOf(v[k])>=0)o[k]=v[k];
    if(v.trim&&num(v.trim[k]))o.trim[k]=clamp(v.trim[k],0,1.5);});
  }catch(e){}return o;}
function save(){try{localStorage.setItem(KEY,JSON.stringify(cfg));}catch(e){}}
function lvl(role){return cfg.vol*(cfg.trim[role]==null?1:cfg.trim[role]);}

/* ---------- the audio: one context (the Clepsydra's own when it has one), a room, and a place for each sound ---------- */
var live=null,E=null,OUT=null,faded=false;
/* the room's noise comes from a fixed seed (a small mulberry32), so the room is the same in every session and takes no
   numbers from Math.random, which the voices' own grains use */
function seeded(a){a=a|0;return function(){var t=a=(a+0x6D2B79F5)|0;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
/* The same room in both ears. A room drawn apart for each ear made a sound meant for the middle lean to one side, by
   chance and for the whole session: by up to 2 or 3 dB on the tonal sounds, because each ear heard the sound and its
   room meet differently (a copy of one room delayed a little for the other ear leaned as much). So the room is one, the
   same on both sides, a centred sound stays exactly in the middle, and placing a sound is left to the panner alone. */
function impulse(c){var sr=c.sampleRate,n=Math.max(2,Math.floor(sr*ROOM_LEN)),b=c.createBuffer(2,n,sr),pre=Math.floor(sr*0.009),R=seeded(ROOM_SEED),d=new Float32Array(n),lp=0;
  for(var i=pre;i<n;i++){var t=(i-pre)/sr,k=0.30+0.55*Math.min(1,t/ROOM_LEN);lp=lp*k+(R()*2-1)*(1-k);d[i]=lp*Math.exp(-t*4.6);}
  /* early reflections: a panelled study's walls, its shelves and the desk */
  [[0.004,0.60],[0.007,0.45],[0.011,0.36],[0.017,0.28],[0.023,0.22],[0.031,0.17],[0.043,0.12]].forEach(function(r){var at=pre+Math.floor(sr*r[0]);if(at<n)d[at]+=r[1];});
  /* levelled to carry the sound's own energy, so ROOM_SEND alone says how much room is heard */
  var en=0;for(var j=0;j<n;j++)en+=d[j]*d[j];var sc=en>0?1/Math.sqrt(en):0;for(var q=0;q<n;q++)d[q]*=sc;
  /* one room for both ears, as the second look of 6.7 found: a room drawn apart for each ear (even through all-pass
     sections, tried in 6.8.2) makes a held note lean to one side, by up to 5 dB on the tuning fork; the space comes from
     the room's size and from the sounds that move and are placed */
  for(var ch=0;ch<2;ch++)b.getChannelData(ch).set(d);
  return b;}
var EDGE=null;
function softEdge(){if(EDGE)return EDGE;var n=2049,k=new Float32Array(n);
  for(var i=0;i<n;i++){var x=i*2/(n-1)-1,a=Math.abs(x);k[i]=a<=0.8?x:(x<0?-1:1)*(0.8+0.17*Math.tanh((a-0.8)/0.17));}
  return (EDGE=k);}
function engine(c,noRoom){var e={c:c};e.master=c.createGain();e.master.gain.value=1;e.room=null;
  /* 6.8.2: warmth and presence, then a gentle compressor: the sounds come forward and full, and none passes the speakers' limit */
  try{var lo=c.createBiquadFilter();lo.type="lowshelf";lo.frequency.value=150;lo.gain.value=3;
    var hi=c.createBiquadFilter();hi.type="highshelf";hi.frequency.value=5200;hi.gain.value=2;
    var cp=c.createDynamicsCompressor();cp.threshold.value=-18;cp.knee.value=14;cp.ratio.value=3.2;cp.attack.value=0.002;cp.release.value=0.16;
    var up=c.createGain();up.gain.value=1.25;
    /* and a limiter last: nothing ever reaches the speakers' limit, at any volume or level */
    var lim=c.createDynamicsCompressor();lim.threshold.value=-3;lim.knee.value=0;lim.ratio.value=20;lim.attack.value=0.001;lim.release.value=0.06;
    /* and after it a soft edge: what the limiter lets through in its first instant (up to 0.99 of the range, measured at
       the loudest) is rounded off above 0.8, so no peak passes 0.95; below 0.8 nothing is touched */
    var edge=c.createWaveShaper();edge.curve=softEdge();edge.oversample="none";   /* "2x" filters its own output and overshot to 0.956 */
    e.master.connect(lo);lo.connect(hi);hi.connect(cp);cp.connect(up);up.connect(lim);lim.connect(edge);edge.connect(c.destination);}
  catch(x){e.master.connect(c.destination);}
  if(!noRoom){try{var cv=c.createConvolver();cv.normalize=false;cv.buffer=impulse(c);var wet=c.createGain();wet.gain.value=ROOM_SEND;cv.connect(wet);wet.connect(e.master);e.room=cv;}catch(x){e.room=null;}}
  return e;}
function panner(c,pan){
  try{if(typeof c.createStereoPanner==="function"){var s=c.createStereoPanner();s.pan.value=pan;return s;}}catch(e){}
  try{if(typeof c.createPanner==="function"){var p=c.createPanner();p.panningModel="equalpower";p.distanceModel="linear";p.refDistance=1;p.maxDistance=10000;p.rolloffFactor=0;
    var x=Math.sin(pan*Math.PI/2),z=-Math.cos(pan*Math.PI/2);
    if(p.positionX){p.positionX.value=x;p.positionY.value=0;p.positionZ.value=z;}else if(typeof p.setPosition==="function")p.setPosition(x,0,z);
    return p;}}catch(e){}
  return null;}
/* each sound's own way out: placed (equal power, levelled to the middle), and a little of it into the room */
function route(e,pan){var c=e.c,inp=c.createGain();inp.gain.value=1;var p=pan?panner(c,pan):null;
  if(p){var lev=c.createGain();lev.gain.value=Math.SQRT2;inp.connect(p);p.connect(lev);lev.connect(e.master);}else inp.connect(e.master);
  if(e.room)inp.connect(e.room);
  return inp;}
function ctxLive(){if(!AC)return null;
  if(!live){var c=null;try{if(typeof W.fdAudioCtx==="function")c=W.fdAudioCtx();}catch(x){c=null;}
    if(!c){try{c=new AC();}catch(x){return null;}}
    try{live=engine(c);}catch(x){live=null;return null;}}
  if(live.c.state!=="running"){try{var pr=live.c.resume();if(pr&&pr.catch)pr.catch(function(){});}catch(x){}}
  return live;}
function restore(e){if(!faded)return;faded=false;try{var t=e.c.currentTime;e.master.gain.cancelScheduledValues(t);e.master.gain.setValueAtTime(1,t);}catch(x){}}
function hush(){stopTest();var e=live;if(!e)return;faded=true;try{var t=e.c.currentTime,g=e.master.gain;g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);g.linearRampToValueAtTime(0,t+0.08);}catch(x){}}

/* ---------- the two primitives everything is built from (the template's, exactly; only the way out is Ingenium's) ---------- */
function rnd(a,b){return a+Math.random()*(b-a);}
function tone(t,freq,a,d,peak,type,drift){var c=E&&E.c;if(!c||!OUT)return;
  var o=c.createOscillator(),g=c.createGain();
  o.type=type||"sine";
  o.frequency.setValueAtTime(freq,t);
  if(drift)o.frequency.exponentialRampToValueAtTime(freq*drift,t+a+d);
  g.gain.setValueAtTime(0.0001,t);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002,peak),t+a);
  g.gain.exponentialRampToValueAtTime(0.0001,t+a+d);
  o.connect(g);g.connect(OUT);o.start(t);o.stop(t+a+d+0.05);}
function grain(t,dur,peak,freq,q){var c=E&&E.c;if(!c||!OUT)return;
  var n=Math.max(2,Math.floor(c.sampleRate*dur));
  var buf=c.createBuffer(1,n,c.sampleRate),d=buf.getChannelData(0),last=0;
  for(var i=0;i<n;i++){var w=Math.random()*2-1;last=last*0.55+w*0.45;d[i]=last;}
  var s=c.createBufferSource();s.buffer=buf;
  var f=c.createBiquadFilter();f.type="bandpass";
  f.frequency.setValueAtTime(freq,t);f.Q.setValueAtTime(q,t);
  var g=c.createGain();
  g.gain.setValueAtTime(0.0001,t);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002,peak),t+dur*0.3);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  s.connect(f);f.connect(g);g.connect(OUT);s.start(t);s.stop(t+dur+0.02);}
function sweep(t,dur,f0,f1,peak,q){var c=E&&E.c;if(!c||!OUT)return;
  var n=Math.max(2,Math.floor(c.sampleRate*dur));
  var buf=c.createBuffer(1,n,c.sampleRate),d=buf.getChannelData(0),last=0;
  for(var i=0;i<n;i++){var w=Math.random()*2-1;last=last*0.5+w*0.5;d[i]=last;}
  var s=c.createBufferSource();s.buffer=buf;
  var f=c.createBiquadFilter();f.type="bandpass";
  f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+dur);f.Q.setValueAtTime(q||1,t);
  var g=c.createGain();
  g.gain.setValueAtTime(0.0001,t);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002,peak),t+dur*0.35);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  s.connect(f);f.connect(g);g.connect(OUT);s.start(t);s.stop(t+dur+0.02);}
function click(t,freq,peak){grain(t,0.006,peak,freq,4);tone(t,freq*0.8,0.0005,0.014,peak*0.45,"triangle");}
function cloud(t,len,count,fLo,fHi,peak,shape){
  for(var i=0;i<count;i++){
    var u=Math.random(),at=t+Math.pow(u,shape||1)*len+rnd(-0.005,0.005);
    var env=Math.sin(Math.PI*Math.min(1,Math.max(0,(at-t)/len)));
    grain(at,rnd(0.008,0.026),peak*rnd(0.35,1)*(0.35+0.65*env),rnd(fLo,fHi),rnd(1.2,4));}}

/* ---------- Ingenium's own (6.8.1) ----------
   Her words (27 October 2026): "I want Ingenium to have its own identity and its own sounds, I want them curated and customised
   specifically to Ingenium and its rooms and identity. I want to play on the theme and keep things light and subtle. I want
   the sounds to match the look and feel of the app and preserve the mechanical analogue 3D look and feel of the app without
   making it feel childlike and amateurish. Ingenium must above all maintain Oxbridge DPhil standards and remain scholarly at
   its core." So none of Carpe Diem's or The Forge's: the things of a college study. A tuning fork, an orrery's small bell, a
   note in the margin; a wax seal pressed, a clock's escapement, a brass stamp; a library door on its latch, a study lamp, an
   archive key; and for the rooms, a vellum page, a card-catalogue drawer, a ledger's tap, a pen, a typebar, a brass gear.
   Made of the same two things as before (a tone, a grain of filtered noise), at the same quiet levels, short, never a tune. */
var ROOMV={home:"ledgerTap",settings:"ledgerTap",guide:"vellumTurn",lector:"vellumTurn",career:"vellumTurn",tabula:"vellumTurn",abacus:"vellumTurn",
  slides:"vellumTurn",imago:"vellumTurn",scriba:"vellumTurn",fontes:"vellumTurn",fabrica:"cardDrawer",models:"cardDrawer",chat:"nibStroke",
  code:"typebar",build:"typebar",focus:"gearTurn",blend:"gearTurn"};
var goingTo="";
/* ---------- 6.8.2: the parts the living voices are made of ----------
   A struck thing is a touch and then its own resonances, each dying away at its own pace (t60: the time to fall 60 dB);
   paper and air are noise shaped by a filter; friction is noise that sticks and slips. Every part moves a little at every
   play. The noise is one buffer per audio context, read from a different place each time. */
var NZ=null;
function nz(c){if(NZ&&NZ.c===c)return NZ.b;var n=Math.floor(c.sampleRate*3),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);
  for(var i=0;i<n;i++)d[i]=Math.random()*2-1;NZ={c:c,b:b};return b;}
function vary(x,a){return x*(1+(Math.random()*2-1)*(a==null?0.02:a));}
function decay(g,t,a,peak,t60){g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(Math.max(0,peak),t+a);g.gain.setTargetAtTime(0,t+a,Math.max(0.001,t60/6.9));}
function noiseSrc(c,t,len){var s=c.createBufferSource(),b=nz(c);s.buffer=b;s.start(t,Math.random()*Math.max(0,b.duration-len-0.1),len+0.05);return s;}
/* a partial that rings and dies away as a struck thing does */
function ring(t,f,peak,t60,o){var c=E&&E.c;if(!c||!OUT)return;o=o||{};var a=o.a||0.0015,end=t+a+t60*1.25+0.05;
  var os=c.createOscillator(),g=c.createGain();os.type=o.type||"sine";os.frequency.setValueAtTime(f,t);
  if(o.glide)os.frequency.exponentialRampToValueAtTime(f*o.glide,t+(o.glideT||t60*0.5));
  decay(g,t,a,peak,t60);os.connect(g);var out=g;
  if(o.trem){var tg=c.createGain(),lf=c.createOscillator(),lg=c.createGain();tg.gain.value=1-o.trem[1];lf.frequency.value=o.trem[0];lg.gain.value=o.trem[1];
    lf.connect(lg);lg.connect(tg.gain);g.connect(tg);out=tg;lf.start(t);lf.stop(end);}
  out.connect(OUT);os.start(t);os.stop(end);}
/* a struck thing's modes, [ratio, share, t60]: none sounds twice the same */
function modes(t,f0,list,peak,o){o=o||{};var j=o.jit==null?0.01:o.jit;
  list.forEach(function(m){ring(t+Math.random()*0.0012,vary(f0*m[0],j),peak*m[1]*vary(1,0.15),vary(m[2],0.12),{a:o.a||0.0012});});}
/* noise through a filter: a contact, a puff of air, a scrape */
function hiss(t,dur,peak,type,f,q,o){var c=E&&E.c;if(!c||!OUT)return;o=o||{};
  var s=noiseSrc(c,t,dur*1.6+0.02),fl=c.createBiquadFilter();fl.type=type||"bandpass";fl.frequency.setValueAtTime(f,t);fl.Q.setValueAtTime(q==null?0.8:q,t);
  if(o.to)fl.frequency.exponentialRampToValueAtTime(o.to,t+dur);
  var g=c.createGain();
  if(o.swell){g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+dur*o.swell);g.gain.setTargetAtTime(0,t+dur*o.swell,Math.max(0.002,dur*(1-o.swell)/3));}
  else decay(g,t,o.a||0.0008,peak,dur);
  s.connect(fl);fl.connect(g);g.connect(OUT);}
/* a low knock with weight: wood or leather meeting the desk */
function thump(t,f,peak,t60,o){o=o||{};ring(t,vary(f,0.03),peak,t60,{a:0.002,glide:o.drop||0.82,glideT:t60*0.7});
  ring(t,vary(f*2.31,0.03),peak*0.32,t60*0.45,{a:0.0015});
  hiss(t,Math.min(0.05,t60*0.4),peak*0.55,"lowpass",vary(f*6,0.1),0.7);}
/* paper through the air, from one side to the other */
function rustle(t,dur,peak,f0,f1,p0,p1){var c=E&&E.c;if(!c||!OUT)return;
  var s=noiseSrc(c,t,dur+0.05),hp=c.createBiquadFilter();hp.type="highpass";hp.frequency.value=500;
  var fl=c.createBiquadFilter();fl.type="bandpass";fl.frequency.setValueAtTime(f0,t);fl.frequency.exponentialRampToValueAtTime(f1,t+dur);fl.Q.value=0.9;
  var g=c.createGain(),n=48,cv=new Float32Array(n);
  for(var i=0;i<n;i++){var x=i/(n-1),e=Math.sin(Math.PI*Math.pow(x,0.8));cv[i]=peak*e*(0.35+0.65*Math.pow(Math.random(),1.6));}
  cv[0]=0;cv[n-1]=0;g.gain.setValueAtTime(0,t);
  try{g.gain.setValueCurveAtTime(cv,t+0.001,dur);}catch(x){g.gain.linearRampToValueAtTime(peak,t+dur/2);g.gain.linearRampToValueAtTime(0,t+dur);}
  s.connect(hp);hp.connect(fl);fl.connect(g);var pn=null;
  try{if(typeof c.createStereoPanner==="function"&&(p0||p1)){pn=c.createStereoPanner();pn.pan.setValueAtTime(p0||0,t);pn.pan.linearRampToValueAtTime(p1||0,t+dur);}}catch(x){pn=null;}
  if(pn){g.connect(pn);pn.connect(OUT);}else g.connect(OUT);}
/* friction that sticks and slips: a hinge, a key in its lock, a drawer on its runners */
function creak(t,dur,peak,f,o){var c=E&&E.c;if(!c||!OUT)return;o=o||{};
  var s=noiseSrc(c,t,dur+0.05),fl=c.createBiquadFilter();fl.type="bandpass";fl.Q.value=o.q||22;
  var n=Math.max(8,Math.round(dur*90)),fc=new Float32Array(n),gc=new Float32Array(n),w=0,rate=o.rate||38;
  for(var i=0;i<n;i++){var x=i/(n-1);w+=(Math.random()*2-1)*0.05;w*=0.9;fc[i]=Math.max(40,f*(1+(o.rise==null?0.18:o.rise)*x+w));
    var pu=0.5+0.5*Math.sin(2*Math.PI*rate*x*dur+Math.random()*0.6);gc[i]=peak*Math.sin(Math.PI*Math.min(1,x*1.15))*(0.25+0.75*pu*pu);}
  gc[0]=0;gc[n-1]=0;try{fl.frequency.setValueCurveAtTime(fc,t,dur);}catch(x){fl.frequency.value=f;}
  var g=c.createGain();g.gain.setValueAtTime(0,t);
  try{g.gain.setValueCurveAtTime(gc,t+0.001,dur);}catch(x){g.gain.linearRampToValueAtTime(peak,t+dur/2);g.gain.linearRampToValueAtTime(0,t+dur);}
  s.connect(fl);fl.connect(g);g.connect(OUT);}
/* small hard ticks scattered in time: wax cracking, a lamp's chain, cards settling */
function crackle(t,dur,count,peak,fLo,fHi){for(var i=0;i<count;i++)hiss(t+Math.random()*dur,vary(0.0025,0.5),peak*vary(0.7,0.4),"bandpass",fLo+Math.random()*(fHi-fLo),2.5);}
/* a small metal part: a latch, a key's bit, a clock's pallet (the modes of a small bar) */
function tick(t,f,peak,t60){hiss(t,0.004,peak*0.9,"highpass",vary(f*0.8,0.1),0.7);
  modes(t,f,[[1,1,t60],[2.76,0.55,t60*0.6],[5.4,0.3,t60*0.35],[8.93,0.15,t60*0.2]],peak*0.6,{jit:0.02});}
/* air moving: the room as a door opens, a lamp's warmth, a card lifted */
function air(t,dur,peak,f){hiss(t,dur,peak,"lowpass",f||700,0.5,{swell:0.45});}

/* ---------- the voices (6.8.2: each built as the thing itself sounds) ---------- */
var BELL=[[0.5,0.35,1.6],[1,1,1.9],[1.183,0.55,1.4],[1.506,0.45,1.0],[2,0.62,0.9],[2.514,0.32,0.6],[2.662,0.28,0.55],[3.011,0.18,0.4]];
var BOXWOOD=[[1,1,0.55],[3.93,0.36,0.12],[9.24,0.12,0.05]];
var V={
  /* notices: a fork struck and held over the desk, an orrery's small bell, a note on a boxwood bar */
  tuningFork:function(t,L){var f=vary(440,0.004);
    tick(t,vary(2750,0.02),0.18*L,0.10);                                        /* the strike on the tine: the fork's clang */
    ring(t,f,0.42*L,2.4,{a:0.004,trem:[vary(3.1,0.1),0.10]});                     /* its note, beating a little with the desk */
    ring(t+0.0007,f*1.0026,0.16*L,2.2,{a:0.004});                                /* the twin tine */
    ring(t,f*2,0.05*L,0.9,{a:0.003});ring(t,f*3,0.018*L,0.4,{a:0.003});         /* what the desk adds to it */
    thump(t+0.012,vary(210,0.05),0.16*L,0.12);},                                  /* and the desk answering the touch */
  orreryBell:function(t,L){var f=vary(1240,0.01);
    hiss(t,0.003,0.35*L,"highpass",3500,0.7);modes(t,f,BELL,0.30*L,{jit:0.004});
    hiss(t+0.17,0.002,0.12*L,"highpass",3500,0.7);modes(t+0.17,f,BELL,0.09*L,{jit:0.004});},   /* the clapper falls back once */
  marginNote:function(t,L){hiss(t,0.004,0.22*L,"lowpass",2600,0.7);modes(t,vary(784,0.004),BOXWOOD,0.40*L);
    hiss(t+0.15,0.004,0.24*L,"lowpass",2800,0.7);modes(t+0.15,vary(1047,0.004),BOXWOOD,0.42*L);},
  /* keeping something: a brass seal into warm wax, a clock's escapement, a brass stamp */
  waxSeal:function(t,L){hiss(t,0.10,0.42*L,"lowpass",1400,0.9,{to:260});                 /* the seal sinks into the wax */
    thump(t+0.012,vary(118,0.04),0.50*L,0.20);                                           /* the desk under the paper */
    modes(t+0.012,vary(240,0.04),[[1,1,0.09],[2.3,0.5,0.06],[4.1,0.3,0.04]],0.20*L);     /* its wood */
    tick(t+0.014,vary(2900,0.03),0.12*L,0.14);                                           /* the brass handle */
    crackle(t+0.03,0.09,7,0.10*L,1800,5200);},                                           /* the wax cracks as it sets */
  escapement:function(t,L){var C=[[1,1,0.05],[1.53,0.6,0.04],[2.18,0.4,0.03]];
    tick(t,vary(2500,0.02),0.38*L,0.07);modes(t,vary(460,0.02),C,0.14*L);                 /* tick: the pallet, the case answers */
    tick(t+0.12,vary(2050,0.02),0.34*L,0.08);modes(t+0.12,vary(410,0.02),C,0.13*L);},     /* tock */
  brassStamp:function(t,L){tick(t,vary(3300,0.02),0.12*L,0.08);                          /* the mount's spring */
    thump(t+0.006,vary(96,0.04),0.55*L,0.22);hiss(t+0.006,0.035,0.30*L,"bandpass",1500,0.8);   /* onto paper and desk */
    modes(t+0.008,vary(1568,0.01),[[1,1,0.35],[2.76,0.5,0.2],[5.4,0.25,0.1]],0.07*L);},        /* its brass rings */
  /* entering Ingenium */
  libraryDoor:function(t,L){tick(t,vary(3200,0.02),0.30*L,0.10);                         /* the thumb latch lifts */
    tick(t+0.07,vary(2300,0.02),0.36*L,0.14);                                              /* the bolt leaves its keeper */
    creak(t+0.11,0.42,0.16*L,vary(430,0.05),{rise:0.35,rate:34,q:20});                    /* the hinge turns */
    air(t+0.12,0.75,0.20*L,520);                                                           /* the library's air moves */
    thump(t+0.62,vary(72,0.04),0.50*L,0.40,{drop:0.85});                                   /* the door rests on its stop */
    modes(t+0.62,vary(150,0.04),[[1,1,0.25],[1.9,0.45,0.15],[3.3,0.25,0.09]],0.20*L);},     /* and the oak hums */
  studyLamp:function(t,L){crackle(t,0.05,5,0.14*L,3000,6500);                             /* the pull chain's beads */
    tick(t+0.06,vary(2300,0.02),0.36*L,0.12);thump(t+0.06,vary(180,0.04),0.18*L,0.08);     /* the switch in its brass */
    ring(t+0.09,vary(100,0.01),0.12*L,1.4,{a:0.25,trem:[vary(5.2,0.1),0.18]});ring(t+0.09,200,0.04*L,1.0,{a:0.25});   /* the filament warms */
    air(t+0.08,0.9,0.10*L,1600);},                                                          /* and the light fills the room */
  archiveKey:function(t,L){creak(t,0.20,0.10*L,vary(2600,0.05),{rise:0.1,rate:55,q:9});   /* the key slides into the lock */
    [0.22,0.29,0.35].forEach(function(d,i){tick(t+d,vary(2100+i*240,0.02),0.30*L,0.09);}); /* three tumblers lift */
    thump(t+0.44,vary(78,0.04),0.48*L,0.30);tick(t+0.44,vary(1400,0.02),0.26*L,0.20);     /* the bolt is thrown */
    air(t+0.46,0.5,0.10*L,420);},                                                           /* the archive opens */
  /* moving between pages: each room its own */
  byRoom:function(t,L){var v=ROOMV[goingTo||current()]||"ledgerTap";V[v](t,L*(GAIN[v]||1));},
  vellumTurn:function(t,L){var side=Math.random()<0.5?-1:1;
    rustle(t,0.30,0.30*L,900,3200,-0.45*side,0.45*side);                                    /* the page lifts and crosses */
    crackle(t+0.03,0.22,6,0.06*L,2500,6000);
    hiss(t+0.29,0.06,0.20*L,"lowpass",900,0.7);thump(t+0.30,vary(140,0.05),0.10*L,0.08);},   /* and settles */
  cardDrawer:function(t,L){creak(t,0.20,0.20*L,vary(260,0.05),{rise:0.25,rate:60,q:5});      /* the drawer on its runners */
    thump(t+0.21,vary(110,0.04),0.48*L,0.18);modes(t+0.21,vary(300,0.04),[[1,1,0.10],[2.2,0.5,0.06],[3.9,0.25,0.04]],0.22*L);   /* stops */
    crackle(t+0.22,0.08,8,0.07*L,1500,4500);},                                               /* its cards settle */
  ledgerTap:function(t,L){hiss(t,0.05,0.30*L,"lowpass",700,0.7);thump(t,vary(92,0.04),0.52*L,0.20);   /* the leather boards meet */
    rustle(t,0.09,0.10*L,1500,2600,0,0);},                                                     /* its pages breathe out */
  nibStroke:function(t,L){var pn=Math.random()<0.5?-0.15:0.15;
    rustle(t,0.13,0.20*L,3200,4200,-pn,pn);rustle(t+0.15,0.09,0.16*L,3600,3000,pn,-pn);       /* two strokes of the nib */
    tick(t+0.25,vary(4800,0.03),0.10*L,0.03);thump(t+0.25,vary(200,0.05),0.06*L,0.05);},      /* its tap */
  typebar:function(t,L){thump(t,vary(160,0.05),0.14*L,0.05);                                  /* the key goes down */
    tick(t+0.035,vary(2700,0.03),0.36*L,0.08);thump(t+0.035,vary(120,0.05),0.42*L,0.14);     /* the typebar meets the platen */
    hiss(t+0.035,0.03,0.18*L,"bandpass",1100,1.2);tick(t+0.09,vary(3900,0.03),0.08*L,0.04);},  /* the carriage steps on */
  gearTurn:function(t,L){[0,0.055,0.10].forEach(function(d,i){tick(t+d,vary(2200-i*90,0.02),0.26*L,0.10);});   /* the ratchet's pawl */
    ring(t+0.10,vary(1318,0.01),0.06*L,0.35);thump(t+0.12,vary(84,0.05),0.26*L,0.18);},       /* the gear's own weight */
  /* pressing a key */
  feltKey:function(t,L){thump(t,vary(170,0.06),0.30*L,0.06);hiss(t,0.012,0.16*L,"lowpass",1800,0.8);tick(t+0.004,vary(3800,0.05),0.05*L,0.02);},
  brassButton:function(t,L){tick(t,vary(3300,0.04),0.24*L,0.06);thump(t,vary(220,0.06),0.14*L,0.04);},
  boxwoodKey:function(t,L){hiss(t,0.005,0.18*L,"lowpass",2600,0.7);modes(t,vary(520,0.03),[[1,1,0.07],[2.8,0.5,0.04],[5.6,0.2,0.02]],0.26*L);},
  /* a card opening: lifted onto the desk, a leather folio opened, a slate slid across */
  cardLift:function(t,L){var pn=Math.random()<0.5?-0.2:0.2;air(t,0.16,0.18*L,1400);rustle(t+0.02,0.12,0.12*L,1600,2800,-pn,pn);
    thump(t+0.15,vary(150,0.05),0.20*L,0.07);hiss(t+0.15,0.03,0.08*L,"lowpass",1200,0.7);},
  folioOpen:function(t,L){creak(t,0.10,0.06*L,vary(700,0.05),{rise:0.2,rate:40,q:6});air(t+0.02,0.20,0.16*L,900);thump(t+0.18,vary(110,0.05),0.24*L,0.10);},
  slateSlide:function(t,L){creak(t,0.14,0.10*L,vary(1300,0.05),{rise:-0.1,rate:70,q:4});thump(t+0.14,vary(130,0.05),0.22*L,0.09);tick(t+0.14,vary(2600,0.04),0.06*L,0.04);}
};
/* each voice's own level, set by measuring them all (rig/t_682_sounds.js) so that each kind has the presence it needs */
var GAIN={"tuningFork":0.353,"orreryBell":0.426,"marginNote":0.336,"waxSeal":0.442,"escapement":1.052,"brassStamp":0.456,"libraryDoor":0.271,"studyLamp":0.919,"archiveKey":0.325,"vellumTurn":1.644,"cardDrawer":0.215,"ledgerTap":0.453,"nibStroke":2.559,"typebar":0.363,"gearTurn":0.403,"feltKey":0.905,"brassButton":1.489,"boxwoodKey":0.817,"cardLift":0.549,"folioOpen":0.36,"slateSlide":0.453};

/* ---------- when a sound may play at all ---------- */
var gestured=false,gestureAt=0,lastPointer=null,lastKeyAt=0;
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

/* where on the screen it happened: left is below zero, right above, the middle for the keyboard */
function panOf(o){o=o||{};if(num(o.pan))return clamp(o.pan,-PAN_MAX,PAN_MAX);
  var w=W.innerWidth||D.documentElement.clientWidth||0,x=null,ev=o.event;
  if(ev&&ev.detail!==0&&num(ev.clientX)&&!(ev.clientX===0&&ev.clientY===0))x=ev.clientX;
  else if(!ev&&o.recent&&lastPointer&&Date.now()-lastPointer.at<900&&lastPointer.at>lastKeyAt)x=lastPointer.x;
  else if(!ev&&o.el&&o.el.getBoundingClientRect){var r=o.el.getBoundingClientRect();if(r.width||r.height)x=r.left+r.width/2;}
  if(x==null||!w)return 0;
  return Math.round(clamp((x/w)*2-1,-1,1)*PAN_MAX*1000)/1000;}

/* ---------- playing ---------- */
var lastAt=0,lastRole={},roomAt=0,chimeAt=0,last=null,played=0,hist=[];
function sound(voice,L,pan){var e=ctxLive();if(!e||!V[voice])return false;
  try{restore(e);E=e;OUT=route(e,pan||0);V[voice](e.c.currentTime+0.02,(L==null?1:L)*(GAIN[voice]||1));}catch(x){return false;}finally{E=null;OUT=null;}
  played++;last={voice:voice,role:roleOf(voice),pan:pan||0,level:L,at:Date.now()};hist.push(last);if(hist.length>24)hist.shift();return true;}
function play(role,o){o=o||{};if(!isRole(role)||!allowed())return false;
  var now=Date.now();
  if(o.auto&&(now-lastAt<AFTER_ANY||now-roomAt<AFTER_ROOM||now-chimeAt<AFTER_CHIME))return false;
  if(now-lastAt<GAP)return false;
  if(now-(lastRole[role]||0)<(ROLE_GAP[role]||0))return false;
  var L=lvl(role);if(!(L>0))return false;
  goingTo=o.page||"";
  var ok=sound(cfg[role]||DEF[role],L,panOf(o));goingTo="";
  if(ok){lastAt=now;lastRole[role]=now;if(role==="room")roomAt=now;}
  return ok;}
function voice(name,o){o=o||{};if(!V[name]||!allowed())return false;var now=Date.now();if(now-lastAt<GAP)return false;
  var L=num(o.level)?o.level:lvl(roleOf(name));if(!(L>0))return false;
  var ok=sound(name,L,panOf(o));if(ok)lastAt=now;return ok;}

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
  var all=[["keys",-0.5],["paper",-0.3],["cards",-0.1],["confirm",0.1],["notify",0.3],["room",0.5]],seq=all.filter(function(s){return lvl(s[0])>0;}),N=all.length;
  if(!seq.length){say("Each kind of sound is set to Silent. Turn a level up in More sound choices.");return false;}
  say(seq.length===N?"Playing the "+WORDS[N]+" sounds, one after another.":"Playing "+WORDS[seq.length]+" of the "+WORDS[N]+" sounds. The "+(N-seq.length===1?"other is":"others are")+" set to Silent.");
  seq.forEach(function(s,i){testT.push(setTimeout(function(){if(!allowed())return;var L=lvl(s[0]);if(L>0&&sound(cfg[s[0]],L,s[1]))lastAt=Date.now();},i*750));});
  testT.push(setTimeout(function(){say(null);},seq.length*750+900));
  return true;}

/* ---------- rendering a voice away from the speakers, to check it (OfflineAudioContext) ---------- */
function render(name,o){o=o||{};return new Promise(function(res){
  if(!OAC||!V[name]){res(null);return;}
  var sr=44100,len=Math.ceil(sr*(num(o.seconds)?o.seconds:2.6)),c;
  try{c=new OAC(2,len,sr);}catch(x){res(null);return;}
  var e=engine(c,!!o.dry),L=num(o.level)?o.level:lvl(roleOf(name));
  try{E=e;OUT=route(e,num(o.pan)?o.pan:0);V[name](0.02,L*(GAIN[name]||1));}catch(x){E=null;OUT=null;res(null);return;}finally{E=null;OUT=null;}
  function done(buf){var r={length:buf.length,sampleRate:buf.sampleRate,peak:0,peakL:0,peakR:0,rms:0,tail:0},s=0,n=0,ts=0,tn=0,from=Math.floor(sr*(num(o.tailFrom)?o.tailFrom:1.4));
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
    +'<p class="snd-lede">Sounds that make the app feel alive: entering, moving between pages, pressing a key, a card opening, keeping something, and a reminder. Each one is made on this device as it plays, so nothing is downloaded.</p>'
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
  if(e&&e.type==="pointerdown"&&num(e.clientX))lastPointer={x:e.clientX,y:e.clientY,at:gestureAt};
  if(e&&e.type==="keydown")lastKeyAt=gestureAt;
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
var KEYSEL='.btn,.seg-btn,.tc-key,.nav-btn,.hx-key,.f-btn,.cl-chev,.cl-key,[role="tab"],.ib-key,.chip,.menu-btn,.rail-btn,.chat-top-key,.effort-opt,.bk-key,.l-btn,.cs-key,.quick,.src-btn,.cplus-btn,.stage-pill,.fo-k,.rc-k',keyAt=0;
function keyDown(k,e){if(!k||k.disabled||k.getAttribute("aria-disabled")==="true"||!allowed())return false;
  if(k.closest("#ingSoundChoices,#introDoor,[data-snd-test],[data-snd-on]"))return false;
  var now=Date.now();if(now-keyAt<(ROLE_GAP.keys||35))return false;var L=lvl("keys");if(!(L>0))return false;keyAt=now;
  return sound(cfg.keys||DEF.keys,L,panOf(e?{event:e}:{el:k}));}
D.addEventListener("pointerdown",function(e){if(!e.isTrusted||(e.button!=null&&e.button!==0))return;var t=e.target;if(!t||!t.closest)return;
  try{keyDown(t.closest(KEYSEL),e);}catch(x){}},true);
D.addEventListener("keydown",function(e){if(!e.isTrusted||e.repeat||(e.key!=="Enter"&&e.key!==" "))return;var t=e.target;
  try{if(t&&t.matches&&t.tagName==="BUTTON"&&t.matches(KEYSEL))keyDown(t,null);}catch(x){}},true);
/* 6.8.2: a dialog, a panel or the tour's card rising onto the screen is lifted onto the desk (the notices and reminders keep
   their own sound) */
var cardAt=0;
function cardUp(el){if(!allowed())return false;var now=Date.now();if(now-cardAt<(ROLE_GAP.cards||300)||now-roomAt<1200)return false;
  var L=lvl("cards");if(!(L>0))return false;cardAt=now;return sound(cfg.cards||DEF.cards,L,panOf({el:el}));}
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
