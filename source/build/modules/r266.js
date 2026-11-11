<style id="r266-css">
/* ============ R266 · THE MODELS PAGE AS A TURRET OF LENSES (Ingenium 6.75, 11 November 2026) ============ */
#page-models{--tu-slab0:#fbf9fe;--tu-slab1:#ece4f7;--tu-card:#ffffff;--tu-card2:#f8f5fc;--tu-ink1:#231a31;--tu-ink2:#4c4360;--tu-ink3:#7b7190;--tu-acc:#6a3fb5;--tu-acc2:#5a2fa5;
  --tu-gold:#b88a3a;--tu-hair:rgba(34,26,46,.10);--tu-hair2:rgba(34,26,46,.06);--tu-ring:rgba(106,63,181,.12);--tu-keyA:#ffffff;--tu-keyInk:#2b2140;--tu-keyShadow:rgba(40,22,68,.16);
  --tu-shadow:0 1px 0 rgba(255,255,255,.7) inset,0 14px 30px rgba(40,22,68,.10),0 2px 6px rgba(40,22,68,.06);--tu-tagInk:#2e1764;--tu-tagGlow:0 1px 0 rgba(255,255,255,.75);
  --tu-warn:#9a5b06;--tu-warnbg:#fbf0dd}
body[data-theme="night"] #page-models{--tu-slab0:#1d1529;--tu-slab1:#130d1d;--tu-card:#1d1529;--tu-card2:#191224;--tu-ink1:#ece4f8;--tu-ink2:#b9adcc;--tu-ink3:#8a7f9e;--tu-acc:#b496ff;
  --tu-acc2:#8e66e6;--tu-gold:#d8b46a;--tu-hair:rgba(205,184,240,.12);--tu-hair2:rgba(205,184,240,.07);--tu-ring:rgba(205,184,240,.12);--tu-keyA:#2a2239;--tu-keyInk:#ece4f8;
  --tu-keyShadow:rgba(0,0,0,.45);--tu-shadow:0 1px 0 rgba(255,255,255,.04) inset,0 14px 30px rgba(0,0,0,.45),0 2px 6px rgba(0,0,0,.3);--tu-tagInk:#efe6ff;--tu-tagGlow:0 1px 2px rgba(0,0,0,.7);
  --tu-warn:#f0b65c;--tu-warnbg:#3a2a12}
/* the page's own title and words give way to the turret's head, which says the same */
#page-models.tu-on > h1.page-title,#page-models.tu-on > p.lede,#page-models.tu-on .tu-gone{display:none !important}
#page-models .tu-head{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,560px);gap:24px;align-items:center;margin:0 0 6px;padding:34px 30px 30px 40px;border-radius:30px;
  background:radial-gradient(ellipse 70% 85% at 76% 40%,var(--tu-slab0) 0%,var(--tu-slab1) 72%);box-shadow:inset 0 0 0 1px var(--tu-ring),var(--tu-shadow);overflow:hidden;isolation:isolate;color:var(--tu-ink1)}
#page-models .tu-eyebrow{display:flex;flex-wrap:wrap;gap:6px 14px;font:600 11.5px/1.2 var(--sans);letter-spacing:.28em;text-transform:uppercase;color:var(--tu-gold)}
#page-models .tu-eyebrow b{color:var(--tu-acc);font-weight:600}
#page-models .tu-head h1{margin:16px 0 10px;font:600 60px/1 "Home Cormorant","Cormorant Garamond",Cormorant,var(--x-serif,Georgia),serif;letter-spacing:.01em;color:var(--tu-ink1)}
#page-models .tu-lede{margin:0 0 18px;max-width:46ch;font-size:15px;line-height:1.5;color:var(--tu-ink2)}
#page-models .tu-keys{display:flex;flex-wrap:wrap;gap:10px}
#page-models .tu-key{display:inline-flex;align-items:center;gap:8px;height:38px;padding:0 16px;border-radius:12px;border:1px solid var(--tu-hair);cursor:pointer;background:var(--tu-keyA);color:var(--tu-keyInk);
  font:600 13.5px/1 var(--sans);box-shadow:0 2px 0 var(--tu-keyShadow),0 6px 14px rgba(40,22,68,.07);transition:transform .16s cubic-bezier(.2,.8,.2,1),box-shadow .16s;user-select:none;-webkit-tap-highlight-color:transparent}
#page-models .tu-key:hover{transform:translateY(-2px);box-shadow:0 4px 0 var(--tu-keyShadow),0 10px 20px rgba(40,22,68,.10)}
#page-models .tu-key:active{transform:translateY(1px);box-shadow:0 0 0 var(--tu-keyShadow);transition-duration:.06s}
#page-models .tu-key.primary{background:var(--tu-acc2);border-color:transparent;color:#fff;box-shadow:0 2px 0 #3c1d78,0 6px 14px rgba(60,29,120,.22)}
#page-models .tu-key.small{height:30px;padding:0 12px;font-size:12.5px;border-radius:10px}
#page-models .tu-now{margin-top:22px;padding:14px 16px;border-radius:16px;background:var(--tu-card);box-shadow:inset 0 0 0 1px var(--tu-hair2),0 6px 16px rgba(40,22,68,.06);max-width:440px}
#page-models .tu-now small{display:block;font:600 10.5px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--tu-ink3);margin-bottom:8px}
#page-models .tu-now b{display:block;font:600 22px/1.15 "Home Cormorant","Cormorant Garamond",Cormorant,var(--x-serif,Georgia),serif;color:var(--tu-ink1)}
#page-models .tu-now p{margin:4px 0 0;color:var(--tu-ink2);font-size:13px;line-height:1.45}
#page-models .tu-now .tu-act{margin-top:10px}
#page-models .tu-now.warn{background:var(--tu-warnbg)}#page-models .tu-now.warn p{color:var(--tu-warn)}
#page-models .tu-bar{margin-top:10px;height:4px;border-radius:999px;background:var(--tu-hair);overflow:hidden;position:relative}
#page-models .tu-bar i{display:block;height:100%;width:0;background:var(--tu-acc);transition:width .3s ease}
#page-models .tu-bar.busy i{width:34%;position:absolute;left:-34%;animation:tuBusy 1.3s ease-in-out infinite}
@keyframes tuBusy{0%{left:-34%}100%{left:100%}}
#page-models .tu-scene{position:relative;min-width:0;display:grid;place-items:center}
/* the turret, in Ingenium's lavender and violet: spun metal, coated glass */
#page-models .tu-turret{position:relative;width:460px;height:460px;transform-origin:50% 0}
#page-models .tu-turret canvas.tu-base{position:absolute;inset:0;width:100%;height:100%}
#page-models .tu-disc{position:absolute;left:50%;top:50%;width:340px;height:340px;margin:-170px 0 0 -170px;border-radius:50%;transition:transform .9s cubic-bezier(.45,0,.2,1)}
#page-models .tu-disc canvas.tu-plate{position:absolute;inset:0;width:100%;height:100%;border-radius:50%}
#page-models .tu-port{position:absolute;left:50%;top:50%;border:0;padding:0;background:none;border-radius:50%;cursor:pointer;-webkit-tap-highlight-color:transparent}
#page-models .tu-port.blank{cursor:default;pointer-events:none}
#page-models .tu-port canvas{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
#page-models .tu-port .tu-lift{position:absolute;inset:0;transition:transform .9s cubic-bezier(.45,0,.2,1)}
#page-models .tu-port .tu-grow{position:absolute;inset:0;transition:transform .25s cubic-bezier(.2,.8,.2,1)}
#page-models .tu-port:hover .tu-grow{transform:scale(1.045)}#page-models .tu-port.down .tu-grow{transform:scale(.95)}
#page-models .tu-port:focus-visible{outline:2.5px solid var(--tu-acc);outline-offset:2px}
#page-models .tu-tags{position:absolute;inset:0;z-index:3;pointer-events:none}
#page-models .tu-tagw{position:absolute;left:50%;top:50%;width:0;height:0}
#page-models .tu-tagr{position:absolute;left:0;top:0;width:0;height:0;transition:transform .9s cubic-bezier(.45,0,.2,1)}
#page-models .tu-tag{position:absolute;left:0;transform:translateX(-50%);white-space:nowrap;font:600 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;
  color:var(--tu-tagInk);text-shadow:var(--tu-tagGlow);pointer-events:none}
#page-models .tu-index{position:absolute;left:50%;top:4px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:3px;pointer-events:none}
#page-models .tu-index b{font:600 10.5px/1 var(--sans);letter-spacing:.22em;color:var(--tu-ink3);text-transform:uppercase}
#page-models .tu-more{margin:4px 0 0;text-align:center;font-size:12px;color:var(--tu-ink3)}
/* the rooms below, as the design draws them: the room shown is ringed, not filled */
#page-models.tu-on .rm-tab{min-height:42px;padding:0 15px 0 12px;border-radius:13px;font-size:13.5px}
#page-models.tu-on .rm-tab[aria-selected="true"]{color:var(--tu-ink1);background:var(--tu-card);border-color:transparent;text-shadow:none;box-shadow:inset 0 0 0 1.5px var(--tu-acc),0 2px 0 var(--tu-keyShadow)}
#page-models.tu-on .rm-tab[aria-selected="true"] svg{color:var(--tu-acc)}
@media (max-width:1060px){#page-models .tu-head{grid-template-columns:minmax(0,1fr);padding:26px 18px 22px}#page-models .tu-head h1{font-size:48px}}
@media (max-width:560px){#page-models .tu-head{padding:22px 14px 18px;border-radius:24px}#page-models .tu-head h1{font-size:42px}}
@media (prefers-reduced-motion:reduce){#page-models .tu-disc,#page-models .tu-port .tu-lift,#page-models .tu-tagr{transition:none}#page-models .tu-bar.busy i{animation:none;left:0;width:100%;opacity:.5}
  #page-models .tu-key{transition:none}#page-models .tu-key:hover{transform:none}}
body[data-motion="minimal"] #page-models .tu-disc,body[data-motion="minimal"] #page-models .tu-port .tu-lift,body[data-motion="minimal"] #page-models .tu-tagr{transition:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p266"]="started";}catch(_){}
/* ============ R266 · THE MODELS PAGE AS A TURRET OF LENSES (Ingenium 6.75, 11 November 2026) ============
   Her words (11 November 2026): "The Models page needs a redesign and a major makeover to match the rest of the Ingenium's pages, it
   looks a little basic compared to the rest of the app"; then "I need you to push build 6.75 and 6.76 with the models page new turet
   redesign", with her preview Ingenium_Models_Designs.html, design I · The turret ("A turret of lenses, like a microscope's: one turn
   loads a model, one turn unloads it").
   The head of the Models page is the turret, drawn as her preview draws it (its canvases of spun metal and coated glass, in Ingenium's
   lavender and violet): one port for each of her models on this device and one empty port. Pressing a model turns the turret until it
   stands in the engine's light path and loads it (setActive and loadActiveModel, the page's own); the empty port, or pressing the loaded
   one again, unloads it (Engine.unload). The scale round the turret is this device's memory for a model (lineupUsableGB), the arc the
   memory the loaded model takes (lineupNeedGB). The In the engine card says what the engine is doing, from the engine's own status. A
   model likely too heavy here says so before it is loaded, with Load it anyway. Get one of Ingenium's models opens that room; Add a model
   file opens Your models. The rooms below keep everything they did. Sounds are Ingenium's (r176): a key, and a detent for each step the
   turret turns. Minimal motion and reduced motion turn it at once. */
(function r266(){
"use strict";
if(window.IngTurret)return;
var W=window,D=document,TAU=Math.PI*2;
function $id(i){return D.getElementById(i);}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function night(){return D.body.getAttribute("data-theme")==="night";}
function still(){try{return D.body.getAttribute("data-motion")==="minimal"||W.matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
function sound(role){try{if(W.IngSound&&IngSound.play)IngSound.play(role,{});}catch(e){}}
function detents(n){if(still())return;var gap=Math.min(90,900/Math.max(1,n));for(var i=0;i<n;i++)setTimeout(function(){try{if(W.IngSound&&IngSound.voice)IngSound.voice("keyTouch",{});}catch(e){}},i*gap);}
/* ---------- her models, and what this device can hold ---------- */
function avail(){var u=null;try{u=typeof lineupUsableGB==="function"?lineupUsableGB():null;}catch(e){}return u&&u>0?u:null;}
function needOf(m){try{if(typeof lineupNeedGB==="function")return lineupNeedGB({size:m.sizeBytes||0});}catch(e){}try{if(typeof estimateNeedGB==="function")return estimateNeedGB(m);}catch(e){}return (m.sizeBytes||0)/1e9*1.2;}
function nameOf(m){return String(m.customName||m.name||"A model");}
function gbOf(m){return ((m.sizeBytes||0)/1e9).toFixed(1);}
function models(){var s=W.state&&state.models||[];return s.filter(function(m){return m&&(m.fileState==="ready"||m.nativeId||m.builtinDesk||m.builtIn);});}
function loadedId(){try{return (Engine.status==="ready"||Engine.status==="busy")?Engine.modelId:null;}catch(e){return null;}}
/* each model's glass in its own colour, deep at its edge and lit at its heart */
var HUES={velox:"#7458c6",scriba:"#6a3fb5",magister:"#8641b8",faber:"#4d3db0"};
function rgbOf(h){h=String(h||"").replace("#","");if(h.length===3)h=h.replace(/(.)/g,"$1$1");var n=parseInt(h,16);if(!/^[0-9a-f]{6}$/i.test(h))n=0x6a3fb5;return [n>>16&255,n>>8&255,n&255];}
function mixRGB(a,b,t){return a.map(function(v,i){return Math.round(v+(b[i]-v)*t);});}
function paletteOf(m){var base=m&&m.color;if(!base){var t=null;try{t=typeof modelTier==="function"?modelTier(m):null;}catch(e){}base=(t&&HUES[t.id])||"#6a3fb5";}
  var c=rgbOf(base),Wh=[255,255,255],K=[0,0,0];return [mixRGB(c,Wh,.86),mixRGB(c,Wh,.42),c,mixRGB(c,K,.55)];}
function rgba(c,a){return "rgba("+c[0]+","+c[1]+","+c[2]+","+a+")";}
/* ---------- the drawing: spun metal and coated glass, as her preview draws them ---------- */
function PAL(){return night()?{st0:"#33244f",st1:"#170d28",mL:46,mS:30,ink:"rgba(236,228,250,.88)",inkSoft:"rgba(236,228,250,.5)",acc:"#b79ce6",knL:22,knS:28}
  :{st0:"#fbf8ff",st1:"#dfd3f2",mL:76,mS:34,ink:"#4b2a8f",inkSoft:"rgba(75,42,143,.55)",acc:"#6a3fb5",knL:44,knS:30};}
function spun(g,cx,cy,r0,r1,l0,s,light){for(var r=r0;r<r1;r+=.7){var n=(Math.sin(r*1.9)+Math.sin(r*.41+1.1)+Math.sin(r*5.3)*.5)/2.5,l=l0+n*4;g.strokeStyle="hsl(268,"+s+"%,"+l+"%)";g.lineWidth=1;g.beginPath();g.arc(cx,cy,r,0,TAU);g.stroke();}
  if(g.createConicGradient){var cg=g.createConicGradient(-2.2,cx,cy);[[0,.45],[.07,0],[.43,0],[.5,.30],[.57,0],[.93,0],[1,.45]].forEach(function(p){cg.addColorStop(p[0],"rgba(255,255,255,"+(p[1]*(light||1))+")");});
    g.save();g.beginPath();g.arc(cx,cy,r1,0,TAU);g.arc(cx,cy,r0,0,TAU,true);g.fillStyle=cg;g.fill();g.restore();}}
function bevel(g,cx,cy,r,w){var lg=g.createLinearGradient(cx-r,cy-r,cx+r,cy+r);lg.addColorStop(0,"rgba(255,255,255,.8)");lg.addColorStop(.5,"rgba(255,255,255,.05)");lg.addColorStop(1,"rgba(46,23,100,.40)");
  g.strokeStyle=lg;g.lineWidth=w;g.beginPath();g.arc(cx,cy,r,0,TAU);g.stroke();}
function drawLens(cv,S,P,tx,ty,empty){var dpr=Math.min(2,W.devicePixelRatio||1);cv.width=S*dpr;cv.height=S*dpr;cv.style.width=S+"px";cv.style.height=S+"px";
  var g=cv.getContext("2d");g.setTransform(dpr,0,0,dpr,0,0);var c=S/2,R=S/2-2,Q=PAL(),N=90,i;
  for(i=0;i<N;i++){var a0=i*TAU/N,a1=(i+.5)*TAU/N,lit=.5+.5*Math.cos(a0+2.3);g.beginPath();g.arc(c,c,R,a0,a1);g.arc(c,c,R*.86,a1,a0,true);g.closePath();g.fillStyle="hsl(268,"+Q.knS+"%,"+(Q.knL+lit*34)+"%)";g.fill();
    g.beginPath();g.arc(c,c,R,a1,a1+TAU/N/2);g.arc(c,c,R*.86,a1+TAU/N/2,a1,true);g.closePath();g.fillStyle="hsl(268,"+(Q.knS+6)+"%,"+(Q.knL-12+lit*18)+"%)";g.fill();}
  bevel(g,c,c,R-.5,1.2);spun(g,c,c,R*.66,R*.86,Q.mL-4,Q.mS,.9);bevel(g,c,c,R*.86,1);bevel(g,c,c,R*.66,1);
  g.strokeStyle=rgba(P[2],.9);g.lineWidth=R*.035;g.beginPath();g.arc(c,c,R*.76,0,TAU);g.stroke();
  g.fillStyle="#1d0f38";g.beginPath();g.arc(c,c,R*.64,0,TAU);g.fill();
  if(empty){spun(g,c,c,0,R*.6,Q.mL-14,Q.mS,.6);g.fillStyle="rgba(46,23,100,.35)";g.beginPath();g.arc(c,c,R*.08,0,TAU);g.fill();return;}
  var gl=g.createRadialGradient(c-R*.12+tx*R*.1,c-R*.14+ty*R*.1,R*.05,c,c,R*.6);gl.addColorStop(0,rgba(P[1],1));gl.addColorStop(.5,rgba(P[2],1));gl.addColorStop(1,rgba(P[3],1));
  g.fillStyle=gl;g.beginPath();g.arc(c,c,R*.6,0,TAU);g.fill();
  [.5,.38,.26].forEach(function(k,j){g.strokeStyle="rgba(255,255,255,"+(.16-j*.03)+")";g.lineWidth=1;g.beginPath();g.arc(c+tx*R*.03*(j+1),c+ty*R*.03*(j+1),R*k,0,TAU);g.stroke();});
  g.save();g.beginPath();g.arc(c,c,R*.6,0,TAU);g.clip();g.globalCompositeOperation="screen";
  [[rgbOf("#efe6ff"),-.22,-.26,.34,.16,.45],[rgbOf("#cdb8f2"),.2,.22,.22,.1,.32],[P[0],.05,-.05,.12,.06,.26]].forEach(function(q){
    var x=c+(q[1]+tx*.12)*R,y=c+(q[2]+ty*.12)*R,rg=g.createRadialGradient(x,y,0,x,y,q[3]*R);rg.addColorStop(0,rgba(q[0],q[5]));rg.addColorStop(1,rgba(q[0],0));g.fillStyle=rg;g.beginPath();g.ellipse(x,y,q[3]*R,q[4]*R*1.6,-.6,0,TAU);g.fill();});
  g.globalCompositeOperation="source-over";
  var hx=c-R*(.26-tx*.12),hy=c-R*(.3-ty*.12),hl=g.createRadialGradient(hx,hy,0,hx,hy,R*.24);hl.addColorStop(0,"rgba(255,255,255,.8)");hl.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=hl;g.beginPath();g.ellipse(hx,hy,R*.24,R*.13,-.7,0,TAU);g.fill();
  g.fillStyle="rgba(255,255,255,.95)";g.beginPath();g.arc(hx-R*.05,hy-R*.02,Math.max(1.2,R*.025),0,TAU);g.fill();g.restore();
  g.strokeStyle=rgba(P[3],.9);g.lineWidth=1.5;g.beginPath();g.arc(c,c,R*.6,0,TAU);g.stroke();}
function drawBase(T){var cv=T.base,g=cv.getContext("2d"),Wd=cv.width,c=Wd/2,s=Wd/460,Q=PAL(),AV=avail()||0;g.clearRect(0,0,Wd,Wd);
  var st=g.createRadialGradient(c,c*.8,Wd*.05,c,c,Wd*.5);st.addColorStop(0,Q.st0);st.addColorStop(1,Q.st1);g.fillStyle=st;g.beginPath();g.arc(c,c,Wd*.49,0,TAU);g.fill();
  spun(g,c,c,Wd*.455,Wd*.49,Q.mL-6,Q.mS,.7);bevel(g,c,c,Wd*.49,2*s);
  var a0=-Math.PI/2-1.05,a1=-Math.PI/2+1.05;g.save();g.strokeStyle=Q.inkSoft;g.lineWidth=2*s;g.beginPath();g.arc(c,c,Wd*.432,a0,a1);g.stroke();
  if(AV>0){var step=AV>24?2:.5;for(var gb=0;gb<=AV+.001;gb+=step){var a=a0+(a1-a0)*gb/AV,big=Math.abs(gb-Math.round(gb))<.01,r0=Wd*(big?.418:.424),r1=Wd*.44;g.strokeStyle=big?Q.ink:Q.inkSoft;g.lineWidth=(big?1.6:1)*s;
      g.beginPath();g.moveTo(c+Math.cos(a)*r0,c+Math.sin(a)*r0);g.lineTo(c+Math.cos(a)*r1,c+Math.sin(a)*r1);g.stroke();
      var every=AV>24?8:AV>12?4:2;if(big&&Math.round(gb)%every===0){g.save();g.translate(c+Math.cos(a)*Wd*.398,c+Math.sin(a)*Wd*.398);g.rotate(a+Math.PI/2);g.fillStyle=Q.ink;g.font="600 "+(11*s)+"px Inter,sans-serif";g.textAlign="center";g.fillText(String(Math.round(gb)),0,4*s);g.restore();}}
    var lm=T.byId[loadedId()];if(lm){var af=a0+(a1-a0)*Math.min(1,needOf(lm.m)/AV);g.strokeStyle=Q.acc;g.lineWidth=4*s;g.lineCap="round";g.beginPath();g.arc(c,c,Wd*.432,a0,af);g.stroke();}}
  g.restore();g.fillStyle=Q.inkSoft;g.font="600 "+(9.5*s)+"px Inter,sans-serif";g.textAlign="center";g.fillText(AV>0?"GB OF "+AV.toFixed(1):"MEMORY NOT REPORTED",c,c-Wd*.358);}
function drawPlate(T){var cv=T.plate,g=cv.getContext("2d"),Wd=cv.width,c=Wd/2,Q=PAL(),i;g.clearRect(0,0,Wd,Wd);
  spun(g,c,c,Wd*.06,Wd*.5,Q.mL,Q.mS,1);bevel(g,c,c,Wd*.497,3);
  for(i=0;i<T.ports;i++){var a=-Math.PI/2+i*TAU/T.ports,x=c+Math.cos(a)*Wd*.3,y=c+Math.sin(a)*Wd*.3;g.fillStyle="rgba(46,23,100,.22)";g.beginPath();g.arc(x+3,y+5,Wd*.19*T.k,0,TAU);g.fill();}
  spun(g,c,c,0,Wd*.09,Q.mL+4,Q.mS,1);bevel(g,c,c,Wd*.09,2);for(i=0;i<3;i++){var b=i*TAU/3+.3,bx=c+Math.cos(b)*Wd*.05,by=c+Math.sin(b)*Wd*.05;g.fillStyle="hsl(268,24%,"+(Q.mL-24)+"%)";g.beginPath();g.arc(bx,by,Wd*.011,0,TAU);g.fill();
    g.strokeStyle="hsl(268,30%,"+(Q.mL-44)+"%)";g.lineWidth=2;g.beginPath();g.moveTo(bx-Wd*.008,by);g.lineTo(bx+Wd*.008,by);g.stroke();}}
/* ---------- the turret ---------- */
var T=null,BUSY=false,HEAVY=null;
function turnTo(i,withSound){if(!T)return;var target=-i*360/T.ports,d=((target-T.turn)%360+540)%360-180,steps=Math.round(Math.abs(d)/(360/T.ports));T.turn+=d;
  T.disc.style.transform="rotate("+T.turn+"deg)";T.list.forEach(function(p){p.lift.style.transform="rotate("+(-T.turn)+"deg)";if(p.tagr)p.tagr.style.transform="rotate("+(-T.turn)+"deg)";});if(withSound&&steps)detents(steps*3);}
function portOf(id){var p=T&&T.byId[id];return p?p.i:(T?T.emptyAt:0);}
function build(){if(!T)return;var ms=models(),shown=ms.slice(0,7),n=Math.max(6,shown.length+1);T.ports=n;T.k=n>6?6/n:1;T.list=[];T.byId={};
  [].forEach.call(T.disc.querySelectorAll(".tu-port,.tu-tags"),function(p){p.remove();});var tags=mk("div","tu-tags");
  var S=Math.round(112*T.k),B=Math.round(122*T.k),R=102;
  for(var i=0;i<n;i++)(function(i){var m=i<shown.length?shown[i]:null,empty=i===shown.length,a=-Math.PI/2+i*TAU/n,x=Math.cos(a)*R,y=Math.sin(a)*R;
    var b=mk(m||empty?"button":"span","tu-port"+(m||empty?"":" blank"));if(m||empty)b.type="button";b.style.width=B+"px";b.style.height=B+"px";b.style.margin=(-B/2)+"px 0 0 "+(-B/2)+"px";
    b.style.transform="translate("+x+"px,"+y+"px)";var lift=mk("span","tu-lift"),grow=mk("span","tu-grow"),cv=mk("canvas");
    var P=m?paletteOf(m):paletteOf(null);drawLens(cv,S,P,0,0,!m);grow.appendChild(cv);lift.appendChild(grow);b.appendChild(lift);
    var tagr=null;if(m||empty){var tagw=mk("span","tu-tagw");tagw.style.transform="translate("+x+"px,"+y+"px)";tagr=mk("span","tu-tagr");var tag=mk("span","tu-tag",empty?"empty":nameOf(m));
      tag.style.top=(B/2+2)+"px";tagr.appendChild(tag);tagw.appendChild(tagr);tags.appendChild(tagw);
      b.setAttribute("aria-label",empty?"The empty port: turn it into the light path to unload the model":nameOf(m)+", "+gbOf(m)+" GB: turn it into the engine");
      var o={tx:0,ty:0},raf=0;
      if(m){b.addEventListener("pointermove",function(e){if(e.pointerType==="touch"||still())return;var r=b.getBoundingClientRect();o.tx=(e.clientX-r.left)/r.width*2-1;o.ty=(e.clientY-r.top)/r.height*2-1;
          if(!raf)raf=requestAnimationFrame(function(){raf=0;drawLens(cv,S,P,o.tx,o.ty,false);});});
        b.addEventListener("pointerleave",function(){drawLens(cv,S,P,0,0,false);});}
      b.addEventListener("pointerdown",function(){b.classList.add("down");});["pointerup","pointercancel","pointerleave"].forEach(function(t){b.addEventListener(t,function(){b.classList.remove("down");});});
      b.addEventListener("click",function(){if(empty)unload();else press(m);});}
    else b.setAttribute("aria-hidden","true");
    var rec={b:b,i:i,lift:lift,tagr:tagr,m:m};T.list.push(rec);if(m)T.byId[m.id]=rec;if(empty)T.emptyAt=i;T.disc.appendChild(b);})(i);
  T.disc.appendChild(tags);T.more.textContent=ms.length>shown.length?(ms.length-shown.length)+" more in Your models, below":"";
  drawPlate(T);turnTo(portOf(loadedId()),false);drawBase(T);T.sig=sigOf();}
function sigOf(){return models().map(function(m){return m.id+":"+(m.customName||"")+":"+(m.color||"")+":"+(m.sizeBytes||0);}).join("|")+"#"+night()+"#"+(avail()||0);}
/* ---------- what the engine is doing ---------- */
function card(state0){if(!T)return;var c=T.now,s=state0||{};c.className="tu-now"+(s.warn?" warn":"");T.nowName.textContent=s.name||"";T.nowSays.textContent=s.says||"";
  T.bar.className="tu-bar"+(s.busy?" busy":"");T.barFill.style.width=s.busy?"":(s.pc||0)+"%";T.act.innerHTML="";T.act.hidden=!s.act;if(s.act)T.act.appendChild(s.act);}
function paint(){if(!T)return;var st="",id=loadedId(),AV=avail();try{st=Engine.status;}catch(e){}
  if(HEAVY){return;}
  if(st==="loading"){var lm=T.byId[Engine.modelId]||T.byId[W.state&&state.activeModelId];card({name:"Loading "+(lm?nameOf(lm.m):"a model"),says:"Reading "+(lm?gbOf(lm.m)+" GB":"it")+" into memory…",busy:true});return;}
  if(id){var r=T.byId[id],m=r?r.m:(state.models||[]).filter(function(x){return x.id===id;})[0];if(m){var need=needOf(m);
      card({name:nameOf(m)+" is loaded and ready",says:"Uses about "+need.toFixed(1)+(AV?" of "+AV.toFixed(1):"")+" GB. Chat, Blend and Lector use it now.",pc:AV?Math.min(100,need/AV*100):100});return;}}
  if(st==="error"){var why="";try{why=String(Engine.lastError||"");}catch(e){}card({name:"The model could not be loaded",says:why||"The engine refused it. The Health card in Your models says more.",warn:true});return;}
  card({name:"Nothing in the engine",says:"Its memory was let go. Press a model to load one.",pc:0});}
function press(m){if(BUSY)return;if(loadedId()===m.id){unload();return;}
  var AV=avail(),need=needOf(m);
  if(AV&&need>AV&&HEAVY!==m.id){HEAVY=m.id;var k=mk("button","tu-key small","Load it anyway");k.type="button";k.addEventListener("click",function(){HEAVY=null;load(m);});
    card({name:nameOf(m)+" is likely too heavy here",says:"It needs about "+need.toFixed(1)+" GB; this device has about "+AV.toFixed(1)+" GB for a model. Keep it for a stronger computer, or try it.",warn:true,act:k});return;}
  HEAVY=null;load(m);}
function load(m){BUSY=true;turnTo(portOf(m.id),true);card({name:"Loading "+nameOf(m),says:"Reading "+gbOf(m)+" GB into memory…",busy:true});
  setTimeout(function(){try{setActive(m.id,{fromUser:true});}catch(e){}try{loadActiveModel();}catch(e){}BUSY=false;},still()?0:900);}
function unload(){if(BUSY)return;HEAVY=null;turnTo(T.emptyAt,true);var p;try{p=Engine.modelId?Engine.unload():Promise.resolve();}catch(e){p=Promise.resolve();}
  Promise.resolve(p).then(null,function(){}).then(function(){try{renderEngineCtl();}catch(e){}try{renderModels();}catch(e){}paint();drawBase(T);});}
function onStatus(){if(!T)return;var id=loadedId();if(!HEAVY){turnTo(portOf(id),false);}drawBase(T);paint();
  try{var st=Engine.status;if(st==="ready"&&id&&T.lastLoaded!==id){T.lastLoaded=id;sound("confirm");}if(!id)T.lastLoaded=null;}catch(e){}}
/* ---------- the head, on the Models page ---------- */
function room(re){var tabs=[].slice.call(D.querySelectorAll("#page-models .rm-tab"));var t=tabs.filter(function(x){return re.test(x.textContent);})[0];if(t){t.click();var bar=t.closest(".rm-bar")||t;
  try{bar.scrollIntoView({behavior:still()?"auto":"smooth",block:"start"});}catch(e){}}}
function fit(){if(!T)return;var w=T.scene.clientWidth,k=Math.min(1,Math.max(.4,(w-8)/460));T.turret.style.transform="scale("+k.toFixed(3)+")";T.turret.style.marginBottom=((k-1)*460)+"px";}
function make(){var pg=$id("page-models");if(!pg||T)return;
  var head=mk("section","tu-head");head.setAttribute("aria-label","Models");
  var words=mk("div","tu-words"),eb=mk("div","tu-eyebrow");eb.appendChild(mk("b",null,"Ingenium"));eb.appendChild(mk("span",null,"Models · the turret"));words.appendChild(eb);
  words.appendChild(mk("h1",null,"Models"));
  words.appendChild(mk("p","tu-lede","Your models stand in a turret of lenses. Press one and the turret turns it into the engine's light path: it is loaded. Turn to the empty port, or press it again, to unload. The scale round the turret shows the memory it takes."));
  var keys=mk("div","tu-keys"),k1=mk("button","tu-key primary","Get one of Ingenium's models"),k2=mk("button","tu-key","Add a model file");k1.type=k2.type="button";
  k1.addEventListener("click",function(){room(/Ingenium.s models/);});k2.addEventListener("click",function(){room(/^\s*Your models/);});keys.appendChild(k1);keys.appendChild(k2);words.appendChild(keys);
  var now=mk("div","tu-now");now.setAttribute("aria-live","polite");now.appendChild(mk("small",null,"In the engine"));var nn=mk("b"),ns=mk("p"),act=mk("div","tu-act"),bar=mk("div","tu-bar"),bf=mk("i");
  bar.appendChild(bf);now.appendChild(nn);now.appendChild(ns);now.appendChild(act);now.appendChild(bar);words.appendChild(now);head.appendChild(words);
  var scene=mk("div","tu-scene"),tur=mk("div","tu-turret"),base=mk("canvas","tu-base");base.width=920;base.height=920;tur.appendChild(base);
  var idx=mk("div","tu-index");idx.appendChild(mk("b",null,"Into the engine"));idx.insertAdjacentHTML("beforeend",'<svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><path d="M1 1 L17 1 L9 11 Z" fill="currentColor"/></svg>');
  idx.style.color="var(--tu-acc)";tur.appendChild(idx);var disc=mk("div","tu-disc"),plate=mk("canvas","tu-plate");plate.width=680;plate.height=680;disc.appendChild(plate);tur.appendChild(disc);scene.appendChild(tur);
  var more=mk("p","tu-more");scene.appendChild(more);head.appendChild(scene);
  var title=pg.querySelector(":scope > h1.page-title");pg.insertBefore(head,title?title.nextSibling:pg.firstChild);
  /* the line that offered the Studio: the Studio is a room below */
  [].forEach.call(pg.querySelectorAll(":scope > *"),function(e){if(e!==head&&/Make and train your own models in the Studio/.test(e.textContent||"")&&(e.textContent||"").length<200)e.classList.add("tu-gone");});
  T={head:head,scene:scene,turret:tur,base:base,disc:disc,plate:plate,more:more,now:now,nowName:nn,nowSays:ns,act:act,bar:bar,barFill:bf,turn:0,ports:6,k:1,list:[],byId:{},emptyAt:0,sig:""};
  pg.classList.add("tu-on");build();paint();fit();
  try{Engine.on("status",onStatus);}catch(e){}
  W.addEventListener("resize",fit);
  try{new MutationObserver(function(){if(T&&sigOf()!==T.sig){build();paint();}}).observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}
  setInterval(function(){try{if(T&&pg.classList.contains("active")&&sigOf()!==T.sig){build();paint();fit();}}catch(e){}},2000);}
var tries=0;
function boot(){if(!$id("page-models")||typeof Engine==="undefined"||!W.state){if(++tries<200)setTimeout(boot,500);return;}make();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngTurret={state:function(){return T?{ports:T.ports,models:T.list.filter(function(p){return p.m;}).map(function(p){return p.m.id;}),empty:T.emptyAt,turn:T.turn,
    at:Math.round(((-T.turn/(360/T.ports))%T.ports+T.ports)%T.ports),loaded:loadedId(),card:T.nowName.textContent,avail:avail()}:null;},
  rebuild:function(){build();paint();fit();},press:function(id){var r=T&&T.byId[id];if(r)press(r.m);},unload:function(){unload();}};
try{window.__ingParts["p266"]="running";}catch(_){}
})();
</script>
