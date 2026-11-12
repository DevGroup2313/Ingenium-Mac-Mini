<style id="r286-css">
/* ============ R286 · THE CAREER STUDIO'S HEAD: THE DIAL OF YOUR PATH (Ingenium 6.93, 12 November 2026) ============
   The owner's words (12 November 2026): "As for the compas for the Career Studio, I think that the dial turns is a good direction but you
   need to refine it and fully commit so that it looks really nice and sleek and 3D animated but customise it to the app and the page, the
   same way the Folders, Blend and Models pages are." The dial was approved on its picture the same day (with the counsellor's five
   stages on it, modules/r283.js, which rides from this release); it is drawn again here from that picture (modules/r284.js has why).
   On the first drawing: "they look ugly and childlike and amateurish"; "I want real texture and 3D animation and styling. I want the
   sleek, elegant and refined animated popped out 3D look and effect of Ingenium to be reflected in these designs."
   So the dial is made as the seal and Home's orbs are made (modules/r104.js, r261.js, r264.js): of parts standing at their own depths,
   so as it sways its edge shows and its parts slide past one another, and every part that is a key lifts, sinks and sounds.
   - Its body: six discs behind the bezel give it its thickness; a soft cast lies on the slab under it.
   - The face, sunk below the chapter ring: silver engraved with a guilloché rosette, and the compass rose.
   - The chapter ring above it, lavender with a fine grain, and its ticks (they turn with the stages).
   - The bezel standing above the ring: turned metal with a brushed grain, polished at its edges.
   - The boss at the centre: a collar on walls of its own, the face it holds, the seal's star raised on it and its pin above that.
   - The needle above everything, pointing at your bearing: the stage open in the counsellor, else the next one to do.
   - The five stages stand on the ring as Home's orbs: each a ball on four discs of its own purple, its numeral raised above its face,
     a small mark when it is done, swaying as Home's orbs sway. Pressing one turns the dial until it stands under the needle (a soft
     tick for each stage it passes) and opens it in the counsellor.
   - The dial sways slowly; under a mouse it comes to lean toward it and keeps still. Minimal motion and the system's reduced motion
     keep it still. Nothing is rewritten while it is left alone: every movement is the browser's own.
   - The studio's head (modules/r284.js IngHeads): its title, its words, Your counsellor and Bring one in, the profile's chooser (the
     studio's own select, moved here and back), and the counsellor's five stages named in one line. The three panels and their tabs
     stay as they were, under it, and keep the window's height (--c-h follows --hd-room). */
#page-career.hd-on #cs{--c-h:var(--hd-room,640px) !important}
#page-career.hd-on #cs .c-head > div:first-child{display:none}
#page-career.hd-on #cs .c-head .rm-tabs{margin-left:0;justify-content:flex-start}
#page-career.hd-on .hd-who{display:flex;align-items:center;margin:2px 0 10px}
#page-career.hd-on .hd-who > span{margin-right:14px;font:600 11.5px/1 var(--hd-sans);letter-spacing:.24em;text-transform:uppercase;color:var(--hd-ink3)}
#page-career.hd-on .hd-who select{-webkit-appearance:none;appearance:none;height:38px;max-width:260px;padding:0 40px 0 16px;border:0;border-radius:12px;cursor:pointer;
  font:600 14px/38px var(--hd-sans);color:var(--ink-1);text-overflow:ellipsis;background-color:var(--hd-card);
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236a3fb5' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 9l7 7 7-7'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 14px center;
  box-shadow:inset 0 0 0 1px rgba(34,26,46,.08),0 1px 0 rgba(255,255,255,.9) inset,0 3px 0 #e2d9f1,0 6px 14px rgba(40,22,68,.10);transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s ease}
#page-career.hd-on .hd-who select:hover{transform:translateY(-2px)}
#page-career.hd-on .hd-who select:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
body[data-theme="night"] #page-career.hd-on .hd-who select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23c4a8ff' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 9l7 7 7-7'/%3E%3C/svg%3E");
  box-shadow:inset 0 0 0 1px rgba(205,184,240,.12),0 3px 0 #120c1b,0 6px 14px rgba(0,0,0,.4)}
#page-career.hd-on > .hd-head .hd-tag{left:calc(50% + 28px);right:auto;top:22px;max-width:230px}
#page-career.hd-on.hd-stack > .hd-head .hd-tag{left:auto}
/* ---------- the dial, in parts at their own depths ---------- */
#page-career .dl{position:absolute;left:0;top:0;width:520px;height:460px;perspective:950px;perspective-origin:250px 220px;transform:scale(.86);transform-origin:250px 240px}
#page-career .dl *{box-sizing:border-box}
#page-career .dl-tilt,#page-career .dl-sway,#page-career .dl-ring,#page-career .dl-boss{position:absolute;left:0;top:0;width:520px;height:460px;transform-style:preserve-3d;transform-origin:250px 236px}
#page-career .dl-tilt{transform:rotateX(var(--dl-rx,0deg)) rotateY(var(--dl-ry,0deg));transition:transform .7s cubic-bezier(.2,.8,.2,1)}
#page-career .dl-sway{animation:dlSway 11s ease-in-out infinite}
@keyframes dlSway{0%,100%{transform:rotateY(-11deg) rotateX(6deg)}50%{transform:rotateY(11deg) rotateX(-4deg)}}
#page-career .dl.dl-hold .dl-sway{animation-play-state:paused}
#page-career .dl canvas,#page-career .dl i{position:absolute;display:block;pointer-events:none}
#page-career .dl-l{left:0;top:0;width:520px;height:460px}
#page-career .dl-cast{left:52px;top:330px;width:430px;height:140px;border-radius:50%;background:radial-gradient(closest-side,rgba(42,20,80,.22),rgba(42,20,80,.08) 62%,rgba(42,20,80,0))}
body[data-theme="night"] #page-career .dl-cast{background:radial-gradient(closest-side,rgba(0,0,0,.55),rgba(0,0,0,.2) 60%,rgba(0,0,0,0))}
#page-career .dl-rim{left:45px;top:31px;width:410px;height:410px;border-radius:50%;transform:translateZ(var(--z));
  background:linear-gradient(155deg,#f4f1f9 0%,#d7cfe6 40%,#a99ebf 75%,#8a7fa3 100%);box-shadow:inset 0 0 0 1px rgba(80,60,120,.18)}
body[data-theme="night"] #page-career .dl-rim{background:linear-gradient(155deg,#4d4170 0%,#2a2140 45%,#140e20 100%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.5)}
#page-career .dl-face{transform:translateZ(-7px)}
#page-career .dl-band{transform:translateZ(0)}
#page-career .dl-ring{transform:translateZ(3px) rotate(var(--dl-a,0deg));transition:transform 1.1s cubic-bezier(.45,0,.2,1)}
#page-career .dl-ticks{left:45px;top:31px;width:410px;height:410px}
#page-career .dl-bezel{transform:translateZ(9px)}
#page-career .dl-boss{transform:translateZ(12px)}
#page-career .dl-bwall{left:190px;top:176px;width:120px;height:120px;border-radius:50%;transform:translateZ(var(--z));
  background:linear-gradient(155deg,#ffffff 0%,#ddd6ea 45%,#a69cba 100%);box-shadow:inset 0 0 0 1px rgba(80,60,120,.16)}
body[data-theme="night"] #page-career .dl-bwall{background:linear-gradient(155deg,#5a4c82,#2a2140 50%,#120d1c);box-shadow:inset 0 0 0 1px rgba(0,0,0,.5)}
#page-career .dl-collar{transform:translateZ(14px)}
#page-career .dl-bface{transform:translateZ(10px)}
#page-career .dl-star{transform:translateZ(22px)}
#page-career .dl-pin{left:244.5px;top:230.5px;width:11px;height:11px;border-radius:50%;transform:translateZ(30px);
  background:radial-gradient(circle at 36% 32%,#ffffff 0%,#efe8ff 45%,#b7a3e6 100%);box-shadow:0 1px 2px rgba(40,22,68,.35),inset 0 0 0 .5px rgba(46,23,100,.3)}
#page-career .dl-needle{left:236px;top:1px;width:28px;height:50px;transform:translateZ(40px)}
#page-career .dl-needle svg{display:block;filter:drop-shadow(0 4px 3px rgba(40,22,68,.32))}
body[data-theme="night"] #page-career .dl-needle svg{filter:drop-shadow(0 4px 3px rgba(0,0,0,.6))}
/* a stage: Home's orb on the ring, kept upright as the ring turns */
#page-career .dl-at{position:absolute;left:218px;top:204px;width:64px;height:64px;transform-style:preserve-3d;pointer-events:none}
#page-career .dl-up{position:absolute;left:0;top:0;width:64px;height:64px;transform-style:preserve-3d;transform:translateZ(14px) rotate(calc(-1 * var(--dl-a,0deg)));transition:transform 1.1s cubic-bezier(.45,0,.2,1)}
#page-career button.dl-coin{position:absolute;left:0;top:0;width:64px;height:64px;margin:0;padding:0;border:0;border-radius:50%;background:none;color:inherit;font:inherit;cursor:pointer;
  pointer-events:auto;-webkit-tap-highlight-color:transparent;transform-style:preserve-3d}
#page-career .dl-c3d{position:absolute;left:0;top:0;width:64px;height:64px;transform-style:preserve-3d;transition:transform .38s cubic-bezier(.34,1.4,.64,1);
  transform:translateZ(var(--cz,0px)) translateY(var(--cl,0px)) scale(var(--cs,1))}
#page-career .dl-cidle{position:absolute;left:0;top:0;width:64px;height:64px;transform-style:preserve-3d;animation:dlCoin 7s ease-in-out infinite;animation-delay:var(--cd,0s)}
@keyframes dlCoin{0%,100%{transform:rotateY(-18deg) rotateX(5deg)}50%{transform:rotateY(18deg) rotateX(-5deg)}}
#page-career .dl.dl-hold .dl-cidle{animation-play-state:paused}
#page-career .dl-crim{left:5px;top:5px;width:54px;height:54px;border-radius:50%;transform:translateZ(var(--z));background:linear-gradient(160deg,var(--c1) 0%,var(--c2) 45%,var(--c3) 100%)}
#page-career .dl-ccast{left:13px;top:52px;width:38px;height:10px;border-radius:50%;background:rgba(42,20,80,.28);filter:blur(4px);transform:translateZ(-12px);transition:opacity .38s ease,transform .38s ease}
body[data-theme="night"] #page-career .dl-ccast{background:rgba(0,0,0,.6)}
#page-career .dl-ball{left:0;top:0;width:64px;height:64px}
#page-career .dl-num{position:absolute;left:0;top:0;width:64px;height:64px;display:flex;align-items:center;justify-content:center;transform:translateZ(10px);pointer-events:none;
  font:600 21px/1 var(--hd-serif);letter-spacing:.04em;color:#ece2ff;text-shadow:0 -1px 0 rgba(255,255,255,.3),0 1px 0 rgba(36,14,84,.6),0 2px 3px rgba(26,8,64,.3)}
#page-career .dl-done{position:absolute;right:0;top:-1px;width:21px;height:21px;border-radius:50%;display:none;align-items:center;justify-content:center;transform:translateZ(16px);
  background:linear-gradient(160deg,#f2ecff,#cbbcef);box-shadow:0 0 0 2px #ffffff,0 2px 5px rgba(40,22,68,.3)}
#page-career .dl-done svg{width:12px;height:12px}
body[data-theme="night"] #page-career .dl-done{background:linear-gradient(160deg,#5b4590,#3a2a62);box-shadow:0 0 0 2px #241b36,0 2px 5px rgba(0,0,0,.5)}
#page-career .dl-coin.is-done .dl-done{display:flex}
#page-career button.dl-coin:hover .dl-c3d,#page-career button.dl-coin.dl-ph .dl-c3d{--cz:10px;--cl:-3px;--cs:1.07}
#page-career button.dl-coin:hover .dl-ccast{opacity:.5;transform:translateZ(-12px) scale(1.2)}
#page-career button.dl-coin.dl-down .dl-c3d{--cz:-3px;--cl:1px;--cs:.95;transition-duration:.07s}
#page-career button.dl-coin:focus{outline:none}
#page-career button.dl-coin:focus-visible .dl-ball{border-radius:50%;box-shadow:0 0 0 3px var(--accent)}
#page-career .dl-turning button.dl-coin{pointer-events:none}
body[data-motion="minimal"] #page-career .dl-sway,body[data-motion="minimal"] #page-career .dl-cidle{animation:none}
body[data-motion="minimal"] #page-career .dl-ring,body[data-motion="minimal"] #page-career .dl-up,body[data-motion="minimal"] #page-career .dl-tilt,body[data-motion="minimal"] #page-career .dl-c3d{transition:none}
@media (prefers-reduced-motion:reduce){#page-career .dl-sway,#page-career .dl-cidle{animation:none}#page-career .dl-ring,#page-career .dl-up,#page-career .dl-tilt,#page-career .dl-c3d{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p286"]="started";}catch(_){}
/* R286 · the Career Studio's head, the dial of your path: see the note at the top of its styles */
(function(){"use strict";
if(window.__r286)return;window.__r286=1;
var D=document,W=window,TAU=Math.PI*2,H=null;
/* the measures of the approved picture, for a dial of radius 205: the bezel 205 to 189, the track of ticks 189 to 179, the chapter
   ring 179 to 130, a fine track 130 to 122, the face inside it; the boss 60 across its collar; the stages 29 in radius, 157 out */
var CX=250,CY=236,RO=205,RB=189,RT=179,RI=130,RF=122,RC=157,ROMAN=["I","II","III","IV","V"];
var DL={C:null,root:null,tilt:null,ring:null,cv:{},coins:[],turn:0,at:-1,lede:null,who:null,whoHome:null,tickT:[]};
function $(id){return D.getElementById(id);}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function CO(){return W.IngCounsel||null;}
function stages(){var c=CO();return (c&&c.stages)||[["have","What you have"],["record","Your record"],["want","What you want"],["go","Where you could go"],["week","This week"]];}
function isDone(k){var c=CO();try{return !!(c&&c.done(k));}catch(e){return false;}}
function nextK(){var c=CO();try{return c?c.next():"have";}catch(e){return "have";}}
function openK(){var c=CO();try{var s=c&&c.state&&c.state();return s&&s.stage||"";}catch(e){return "";}}
function bearing(){var S=stages(),o=openK(),n=nextK(),i;for(i=0;i<S.length;i++)if(S[i][0]===o)return i;for(i=0;i<S.length;i++)if(S[i][0]===n)return i;return 0;}
/* a fixed sequence of small numbers, so a texture is the same at every drawing */
function rnd(seed){var s=seed>>>0||1;return function(){s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;};}

/* ---------- each part drawn once for its size and the Display ---------- */
function size(cv,w,h){var d=H.dpr();if(cv.width!==Math.round(w*d)||cv.height!==Math.round(h*d)){cv.width=Math.round(w*d);cv.height=Math.round(h*d);}var g=cv.getContext("2d");g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,w,h);return g;}
function annulus(g,r0,r1){g.beginPath();g.arc(CX,CY,r1,0,TAU);g.arc(CX,CY,r0,0,TAU,true);}
function circle(g,r,c,w){g.beginPath();g.arc(CX,CY,r,0,TAU);g.strokeStyle=c;g.lineWidth=w;g.stroke();}
function sheen(g,r0,r1,a){var sg=g.createRadialGradient(CX,CY,r0,CX,CY,r1);sg.addColorStop(0,"rgba(255,255,255,0)");sg.addColorStop(.5,"rgba(255,255,255,"+a+")");sg.addColorStop(1,"rgba(255,255,255,0)");annulus(g,r0,r1);g.fillStyle=sg;g.fill("evenodd");}
function grain(g,r0,r1,n,dark,light,seed){/* turned metal: fine concentric lines, each a little lighter or darker than the last */
  var R=rnd(seed),step=Math.max(.45,(r1-r0)/Math.max(8,n));g.save();g.lineWidth=step*.9;
  for(var r=r0+step/2;r<r1;r+=step){g.beginPath();g.arc(CX,CY,r,0,TAU);g.strokeStyle=R()<.5?dark:light;g.globalAlpha=.35+R()*.65;g.stroke();}g.globalAlpha=1;g.restore();}
function star(g,x,y,R,light,dark){/* the seal's star: four points, each in a light and a dark half, lit from above on the left */
  var inner=R*.3;for(var i=0;i<4;i++){var a=-Math.PI/2+i*Math.PI/2,a1=a-Math.PI/4,a2=a+Math.PI/4,px=x+Math.cos(a)*R,py=y+Math.sin(a)*R;
    var l1=[x+Math.cos(a1)*inner,y+Math.sin(a1)*inner],l2=[x+Math.cos(a2)*inner,y+Math.sin(a2)*inner];
    g.beginPath();g.moveTo(x,y);g.lineTo(l1[0],l1[1]);g.quadraticCurveTo(x+Math.cos(a-.12)*R*.55,y+Math.sin(a-.12)*R*.55,px,py);g.closePath();g.fillStyle=(i===0||i===3)?light:dark;g.fill();
    g.beginPath();g.moveTo(x,y);g.lineTo(l2[0],l2[1]);g.quadraticCurveTo(x+Math.cos(a+.12)*R*.55,y+Math.sin(a+.12)*R*.55,px,py);g.closePath();g.fillStyle=(i===0||i===3)?dark:light;g.fill();}}
/* the face, sunk below the ring: silver, a guilloché rosette, the compass rose (drawn out under the ring, so no gap shows as it leans) */
function drawFace(){var g=size(DL.cv.face,520,460),n=H.night(),R=RT,i;
  var fc=g.createRadialGradient(CX-RF*.4,CY-RF*.45,RF*.1,CX,CY,R);
  if(n){fc.addColorStop(0,"#2d2444");fc.addColorStop(.7,"#1a1427");fc.addColorStop(1,"#120d1c");}else{fc.addColorStop(0,"#ffffff");fc.addColorStop(.7,"#efebf5");fc.addColorStop(1,"#e2dcec");}
  g.beginPath();g.arc(CX,CY,R,0,TAU);g.fillStyle=fc;g.fill();
  g.save();g.beginPath();g.arc(CX,CY,RF,0,TAU);g.clip();g.lineWidth=.55;
  for(i=0;i<72;i++){var a=i/72*TAU;g.beginPath();g.arc(CX+Math.cos(a)*30,CY+Math.sin(a)*30,RF*.74,0,TAU);g.strokeStyle=n?"rgba(205,184,240,.05)":"rgba(90,70,140,.06)";g.stroke();}
  for(i=0;i<48;i++){var b=i/48*TAU;g.beginPath();g.arc(CX+Math.cos(b)*12,CY+Math.sin(b)*12,30,0,TAU);g.strokeStyle=n?"rgba(205,184,240,.05)":"rgba(90,70,140,.06)";g.stroke();}
  var sw=g.createLinearGradient(CX-RF,CY-RF,CX+RF,CY+RF);sw.addColorStop(0,n?"rgba(205,184,240,.06)":"rgba(255,255,255,.55)");sw.addColorStop(.5,"rgba(255,255,255,0)");sw.addColorStop(1,n?"rgba(0,0,0,.25)":"rgba(90,70,140,.07)");
  g.fillStyle=sw;g.fillRect(CX-RF,CY-RF,RF*2,RF*2);g.restore();
  /* the inner wall where the face meets the ring: a shadow cast by the ring, from the light above on the left */
  var wl=g.createRadialGradient(CX+4,CY+5,RF-10,CX+4,CY+5,RF+2);wl.addColorStop(0,"rgba(0,0,0,0)");wl.addColorStop(1,n?"rgba(0,0,0,.45)":"rgba(60,40,110,.18)");g.beginPath();g.arc(CX,CY,RF,0,TAU);g.fillStyle=wl;g.fill();
  var rl=n?"#5f4f8e":"#d3c7ee",rd=n?"#3d3064":"#b3a3dc";
  for(var q=0;q<8;q++){var long=q%2===0,L=long?RF*.9:RF*.5,wv=long?6:3.6,ang=-Math.PI/2+q*Math.PI/4,tx=CX+Math.cos(ang)*L,ty=CY+Math.sin(ang)*L,nx=-Math.sin(ang),ny=Math.cos(ang),bx=CX+Math.cos(ang)*44,by=CY+Math.sin(ang)*44;
    g.globalAlpha=long?1:.6;g.beginPath();g.moveTo(bx+nx*wv,by+ny*wv);g.lineTo(tx,ty);g.lineTo(bx,by);g.closePath();g.fillStyle=(q<3||q===7)?rl:rd;g.fill();
    g.beginPath();g.moveTo(bx-nx*wv,by-ny*wv);g.lineTo(tx,ty);g.lineTo(bx,by);g.closePath();g.fillStyle=(q<3||q===7)?rd:rl;g.fill();g.globalAlpha=1;}}
/* the chapter ring and its fine tracks: lavender with a tooth, raised over the face */
function drawBand(){var g=size(DL.cv.band,520,460),n=H.night();
  var band=g.createLinearGradient(CX-RT,CY-RT,CX+RT,CY+RT);
  if(n){band.addColorStop(0,"#3c305c");band.addColorStop(.55,"#2a2142");band.addColorStop(1,"#1d162e");}else{band.addColorStop(0,"#f3eefb");band.addColorStop(.55,"#e4dbf3");band.addColorStop(1,"#d3c8e8");}
  annulus(g,RF,RB+3);g.fillStyle=band;g.fill("evenodd");sheen(g,RI,RT,n?.05:.4);
  grain(g,RI,RT,70,n?"rgba(0,0,0,.08)":"rgba(90,64,150,.035)",n?"rgba(205,184,240,.04)":"rgba(255,255,255,.3)",17);
  /* the track of ticks, a little sunk, under the bezel's inner edge */
  var tk=g.createLinearGradient(CX-RT,CY-RT,CX+RT,CY+RT);if(n){tk.addColorStop(0,"#251c3a");tk.addColorStop(1,"#141020");}else{tk.addColorStop(0,"#f3f0f9");tk.addColorStop(1,"#ddd6ea");}
  annulus(g,RT,RB+3);g.fillStyle=tk;g.fill("evenodd");circle(g,RT,n?"rgba(205,184,240,.2)":"rgba(255,255,255,.95)",1);circle(g,RT-1.4,n?"rgba(0,0,0,.4)":"rgba(106,63,181,.2)",1);
  circle(g,RI,n?"#0c0815":"#6b58a0",1.3);
  var ft=g.createLinearGradient(CX-RI,CY-RI,CX+RI,CY+RI);if(n){ft.addColorStop(0,"#2c2343");ft.addColorStop(1,"#171223");}else{ft.addColorStop(0,"#ffffff");ft.addColorStop(1,"#e7e1f1");}
  annulus(g,RF,RI-.7);g.fillStyle=ft;g.fill("evenodd");circle(g,RF,n?"rgba(205,184,240,.24)":"rgba(110,90,160,.42)",.9);}
/* the bezel: turned metal with a brushed grain, polished on its rounded top, standing above the ring */
function drawBezel(){var g=size(DL.cv.bezel,520,460),n=H.night();
  var bz=g.createLinearGradient(CX-RO*.8,CY-RO*.9,CX+RO*.7,CY+RO);
  if(n){bz.addColorStop(0,"#76689c");bz.addColorStop(.42,"#3b3159");bz.addColorStop(1,"#15101f");}else{bz.addColorStop(0,"#ffffff");bz.addColorStop(.38,"#ece7f4");bz.addColorStop(.72,"#c8bfd8");bz.addColorStop(1,"#a097b3");}
  annulus(g,RB,RO);g.fillStyle=bz;g.fill("evenodd");
  grain(g,RB,RO,26,n?"rgba(0,0,0,.16)":"rgba(80,64,120,.06)",n?"rgba(220,205,255,.07)":"rgba(255,255,255,.45)",5);
  sheen(g,RB,RO,n?.14:.6);
  g.beginPath();g.arc(CX,CY,RO-.7,Math.PI*.75,Math.PI*1.75);g.strokeStyle=n?"rgba(220,205,255,.4)":"#ffffff";g.lineWidth=1.4;g.stroke();
  g.beginPath();g.arc(CX,CY,RB+.6,-Math.PI*.25,Math.PI*.75);g.strokeStyle=n?"rgba(220,205,255,.18)":"rgba(255,255,255,.9)";g.lineWidth=1;g.stroke();
  circle(g,RO-.4,n?"rgba(0,0,0,.55)":"rgba(110,96,150,.35)",.8);circle(g,RB,n?"rgba(0,0,0,.65)":"rgba(100,86,140,.45)",1);}
function drawTicks(){var g=size(DL.cv.ticks,410,410),n=H.night(),c=205,i;
  for(i=0;i<60;i++){var a=i/60*TAU,major=i%12===0,mid=i%3===0,L=major?8:mid?6:3.5;
    g.beginPath();g.moveTo(c+Math.cos(a)*(RB-1),c+Math.sin(a)*(RB-1));g.lineTo(c+Math.cos(a)*(RB-1-L),c+Math.sin(a)*(RB-1-L));
    g.strokeStyle=n?(major?"rgba(220,205,250,.7)":"rgba(205,184,240,.34)"):(major?"rgba(78,58,128,.62)":"rgba(110,90,160,.4)");g.lineWidth=major?1.5:1;g.stroke();}
  for(i=0;i<5;i++){var b=-Math.PI/2+i*TAU/5+TAU/10;g.beginPath();g.arc(c+Math.cos(b)*(RI+RT)/2,c+Math.sin(b)*(RI+RT)/2,1.8,0,TAU);g.fillStyle=n?"rgba(205,184,240,.35)":"rgba(106,63,181,.28)";g.fill();}}
function drawBoss(){var n=H.night(),RC0=60,RC1=48;
  var g=size(DL.cv.collar,520,460);var cg=g.createLinearGradient(CX-RC0,CY-RC0,CX+RC0*.8,CY+RC0);
  if(n){cg.addColorStop(0,"#7a6ca3");cg.addColorStop(.45,"#3a3058");cg.addColorStop(1,"#120d1c");}else{cg.addColorStop(0,"#ffffff");cg.addColorStop(.45,"#ebe6f3");cg.addColorStop(1,"#a49ab6");}
  annulus(g,RC1,RC0);g.fillStyle=cg;g.fill("evenodd");grain(g,RC1,RC0,18,n?"rgba(0,0,0,.16)":"rgba(80,64,120,.06)",n?"rgba(220,205,255,.07)":"rgba(255,255,255,.45)",29);sheen(g,RC1,RC0,n?.12:.65);
  g.beginPath();g.arc(CX,CY,RC0-.6,Math.PI*.75,Math.PI*1.75);g.strokeStyle=n?"rgba(220,205,255,.32)":"#ffffff";g.lineWidth=1.2;g.stroke();circle(g,RC1,n?"rgba(0,0,0,.6)":"rgba(100,86,140,.4)",1);
  g=size(DL.cv.bface,520,460);var fg=g.createRadialGradient(CX-12,CY-14,4,CX,CY,RC1);if(n){fg.addColorStop(0,"#30274a");fg.addColorStop(1,"#1a1328");}else{fg.addColorStop(0,"#ffffff");fg.addColorStop(1,"#ece8f4");}
  g.beginPath();g.arc(CX,CY,RC1+1,0,TAU);g.fillStyle=fg;g.fill();
  var wl=g.createRadialGradient(CX+3,CY+4,RC1-8,CX+3,CY+4,RC1+1);wl.addColorStop(0,"rgba(0,0,0,0)");wl.addColorStop(1,n?"rgba(0,0,0,.45)":"rgba(60,40,110,.2)");g.fillStyle=wl;g.fill();
  circle(g,37,n?"rgba(180,150,255,.5)":"rgba(122,79,208,.55)",1);
  g=size(DL.cv.star,520,460);g.save();g.translate(1.6,2.8);star(g,CX,CY,27,"rgba(20,6,48,.24)","rgba(20,6,48,.24)");g.restore();star(g,CX,CY,27,n?"#b496ff":"#8f66da",n?"#6b44bd":"#5b33ab");}
function needleSvg(){var n=H.night();return '<svg viewBox="0 0 28 50" width="28" height="50" aria-hidden="true" focusable="false"><defs>'+
  '<radialGradient id="dlNb" cx=".38" cy=".35" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="'+(n?"#c9b2ff":"#b79cf0")+'"/><stop offset="1" stop-color="'+(n?"#5b37a8":"#6a3fb5")+'"/></radialGradient></defs>'+
  '<path d="M14 49 L3.5 17 L14 11 Z" fill="'+(n?"#a27ef0":"#8a5fd6")+'"/><path d="M14 49 L24.5 17 L14 11 Z" fill="'+(n?"#5b37a8":"#4f2696")+'"/>'+
  '<path d="M14 11 L3.5 17 L14 20.5 L24.5 17 Z" fill="'+(n?"#d6c4ff":"#c4adf2")+'"/><path d="M14 49 L9 31 L14 21 Z" fill="rgba(255,255,255,.18)"/><circle cx="14" cy="8" r="6.6" fill="url(#dlNb)"/></svg>';}
function drawCoins(){var P=H.pal("career");DL.coins.forEach(function(c){var g=size(c.cv,64,64);H.orbPaint(g,32,32,29,P,["bands","faint","aurora","bands","faint"][c.i],c.i*.17);
  c.rims.forEach(function(r){r.style.setProperty("--c1",P.c1);r.style.setProperty("--c2",P.c2);r.style.setProperty("--c3",P.c4);});});}
function drawAll(){if(!DL.cv.face)return;drawFace();drawBand();drawBezel();drawTicks();drawBoss();drawCoins();if(DL.needle)DL.needle.innerHTML=needleSvg();}

/* ---------- the parts, put together ---------- */
function cvs(name,cls){var c=D.createElement("canvas");c.className=cls;DL.cv[name]=c;return c;}
function build(C){var root=mk("div","dl");root.setAttribute("role","group");root.setAttribute("aria-label","The dial of your path: your counsellor's five stages");
  var tilt=mk("div","dl-tilt"),sway=mk("div","dl-sway"),i;root.appendChild(mk("i","dl-cast"));
  for(i=6;i>=1;i--){var rim=mk("i","dl-rim");rim.style.setProperty("--z",(-9-i*3.2).toFixed(1)+"px");sway.appendChild(rim);}
  sway.appendChild(cvs("face","dl-l dl-face"));sway.appendChild(cvs("band","dl-l dl-band"));
  var rg=mk("div","dl-ring");var tk=cvs("ticks","dl-ticks");rg.appendChild(tk);
  stages().forEach(function(st,k){var a=k*72*Math.PI/180,at=mk("div","dl-at");at.style.transform="translate("+(Math.sin(a)*RC).toFixed(2)+"px,"+(-Math.cos(a)*RC).toFixed(2)+"px)";
    var up=mk("div","dl-up"),b=mk("button","dl-coin hd-key");b.type="button";b.setAttribute("data-stage",st[0]);
    var c3=mk("span","dl-c3d"),idle=mk("span","dl-cidle");idle.style.setProperty("--cd",(-k*1.4).toFixed(1)+"s");idle.appendChild(mk("i","dl-ccast"));var rims=[];
    for(var j=4;j>=1;j--){var cr=mk("i","dl-crim");cr.style.setProperty("--z",(-j*2.2).toFixed(1)+"px");idle.appendChild(cr);rims.push(cr);}
    var cv=D.createElement("canvas");cv.className="dl-ball";idle.appendChild(cv);idle.appendChild(mk("span","dl-num",ROMAN[k]));
    var done=mk("span","dl-done");done.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="#6a3fb5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.2 4.2L19 7"/></svg>';idle.appendChild(done);
    c3.appendChild(idle);b.appendChild(c3);up.appendChild(b);at.appendChild(up);rg.appendChild(at);
    b.addEventListener("pointerdown",function(e){if(e.button!=null&&e.button!==0)return;b.classList.add("dl-down");});
    ["pointerup","pointercancel","pointerleave","blur"].forEach(function(t){b.addEventListener(t,function(){b.classList.remove("dl-down");});});
    b.addEventListener("click",function(e){e.preventDefault();press(k);});
    DL.coins.push({i:k,k:st[0],b:b,cv:cv,rims:rims});});
  sway.appendChild(rg);sway.appendChild(cvs("bezel","dl-l dl-bezel"));
  var boss=mk("div","dl-boss");for(i=3;i>=0;i--){var w=mk("i","dl-bwall");w.style.setProperty("--z",(i*3.2).toFixed(1)+"px");boss.appendChild(w);}
  boss.appendChild(cvs("bface","dl-l dl-bface"));boss.appendChild(cvs("collar","dl-l dl-collar"));boss.appendChild(cvs("star","dl-l dl-star"));boss.appendChild(mk("i","dl-pin"));sway.appendChild(boss);
  DL.needle=mk("i","dl-needle");sway.appendChild(DL.needle);
  tilt.appendChild(sway);root.appendChild(tilt);DL.root=root;DL.tilt=tilt;DL.ring=rg;C.box.appendChild(root);
  /* under a mouse it leans toward it and keeps still; it comes back to its sway when the mouse leaves */
  root.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||H.still())return;var r=root.getBoundingClientRect();if(!r.width)return;
    var x=(e.clientX-r.left)/r.width-.48,y=(e.clientY-r.top)/r.height-.51;tilt.style.setProperty("--dl-ry",(x*30).toFixed(1)+"deg");tilt.style.setProperty("--dl-rx",(-y*24).toFixed(1)+"deg");},{passive:true});
  root.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse")root.classList.add("dl-hold");});
  root.addEventListener("pointerleave",function(){root.classList.remove("dl-hold");tilt.style.removeProperty("--dl-ry");tilt.style.removeProperty("--dl-rx");});
  root.addEventListener("focusin",function(){root.classList.add("dl-hold");});root.addEventListener("focusout",function(){root.classList.remove("dl-hold");});
  drawAll();}
function turnTo(i,sound){var step=72,goal=-i*step,d=((goal-DL.turn)%360+540)%360-180,n=Math.round(Math.abs(d)/step);if(Math.abs(d)<.01){DL.at=i;return;}
  DL.turn+=d;DL.at=i;DL.root.style.setProperty("--dl-a",DL.turn+"deg");
  DL.tickT.forEach(clearTimeout);DL.tickT=[];if(sound&&!H.still())for(var k=0;k<n;k++)DL.tickT.push(setTimeout(function(){H.sound("hover");},120+k*(820/Math.max(1,n))));
  DL.root.classList.add("dl-turning");clearTimeout(DL.tt);DL.tt=setTimeout(function(){DL.root.classList.remove("dl-turning");},H.still()?0:1100);}
function press(i){var S=stages(),k=S[i][0];turnTo(i,true);paint();var c=CO();setTimeout(function(){try{if(c)c.go(k);}catch(e){}if(DL.C)DL.C.toRoom("#cs");paint();},H.still()?0:700);}
function paint(){var C=DL.C;if(!C||!C.on||!DL.ring)return;var S=stages(),b=bearing(),st=S[b],k=st[0],dn=isDone(k),open=openK()===k;
  if(DL.at!==b)turnTo(b,false);
  DL.coins.forEach(function(c){var d=isDone(c.k),now=c.i===b;if(c.b.classList.contains("is-done")!==d)c.b.classList.toggle("is-done",d);if(c.b.classList.contains("is-now")!==now)c.b.classList.toggle("is-now",now);
    var lab=ROMAN[c.i]+", "+S[c.i][1]+(d?", done":now?", your bearing":"");if(c.b.getAttribute("aria-label")!==lab)c.b.setAttribute("aria-label",lab);});
  C.tagSet(ROMAN[b]+" · "+st[1],dn?"done":(open||k===nextK())?"in hand":"next");
  C.hintSet(["Your bearing: ",[ROMAN[b]+" · "+st[1]],". Press a stage to turn the dial to it."]);}
/* ---------- the studio's keys ---------- */
function counsellor(){var c=CO(),S=stages();try{if(c){c.go(S[bearing()][0]);}else{var st=W.IngCareer&&IngCareer.state();if(st){st.ui.room="mentor";st.ui.show="list";IngCareer.render();}}}catch(e){}
  if(DL.C)DL.C.toRoom("#cs");setTimeout(paint,40);}
function bringOne(){try{var st=W.IngCareer&&IngCareer.state();if(st){st.ui.room="apps";st.ui.open="new";st.ui.show="work";try{saveState();}catch(e){}IngCareer.render();}}catch(e){}if(DL.C)DL.C.toRoom("#cs");}
function start(){H=W.IngHeads;if(!H||!$("page-career")){if((DL.tries=(DL.tries||0)+1)<240)setTimeout(start,500);return;}
  DL.C=H.mount({page:"page-career",label:"Career Studio",eyebrow:"Career Studio · the dial of your path",cls:"hd-career",
    ok:function(p){return !!p.querySelector("#cs");},
    title:function(p){return p.querySelector(":scope > .page-title");},
    lede:function(){if(!DL.lede)DL.lede=mk("p","hd-lede","Your profile, the posts, programmes and grants you are weighing, and what you send. Everything stays on this device.");return DL.lede;},
    before:function(p){return p.querySelector("#cs")||p.firstElementChild;},
    keys:[{name:"counsel",id:"hdCareerCounsel",text:"Your counsellor",icon:"compass",primary:true,click:counsellor},{name:"bring",id:"hdCareerBring",text:"Bring one in",icon:"plus",click:bringOne}],
    line:"Your counsellor's stages, one after another: what you have, your record, what you want, where you could go, and this week.",
    scene:function(C){build(C);},
    enter:function(C){var who=D.querySelector("#cs label.c-who");if(who&&!DL.who){DL.who=mk("div","hd-who");DL.who.appendChild(mk("span",null,"Profile"));}
      if(who&&DL.who){var sel=who.querySelector("select");if(sel){DL.whoHome=who;DL.who.appendChild(sel);C.words.insertBefore(DL.who,C.line||null);}}paint();},
    leave:function(){if(DL.whoHome&&DL.who){var sel=DL.who.querySelector("select");if(sel)DL.whoHome.appendChild(sel);if(DL.who.parentNode)DL.who.parentNode.removeChild(DL.who);}},
    paint:function(){paint();},theme:function(){drawAll();},shown:function(C,sh){if(sh)paint();},resize:function(){}});
  /* the counsellor and the studio painting again: the dial follows (a change of stage, a stage done, another profile) */
  var host=$("csHost");if(host){try{new MutationObserver(function(){if(DL.C&&DL.C.on){clearTimeout(DL.pq);DL.pq=setTimeout(paint,80);}}).observe(host,{childList:true});}catch(e){}}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
W.IngHeads&&(W.IngHeads.career={state:function(){var C=DL.C;return {on:!!(C&&C.on),turn:DL.turn,at:DL.at,bearing:bearing(),tag:C&&C.tagB?[C.tagB.textContent,C.tagS.textContent]:null,
  coins:DL.coins.map(function(c){return {k:c.k,label:c.b.getAttribute("aria-label"),done:c.b.classList.contains("is-done"),now:c.b.classList.contains("is-now")};}),
  who:!!(DL.who&&DL.who.querySelector("select")),height:(function(){var cs=$("cs");return cs?cs.getBoundingClientRect().height:0;})()};},press:press,paint:paint});
try{window.__ingParts["p286"]="running";}catch(_){}
})();
</script>
