<style id="r175-css">
/* ============ R175 · THE SEAL ON HOME, TO PRESS FOR FUN (Ingenium 6.7, 25 October 2026) ============
   The owner's words: "I want the animated Ingenium engine logo that is next to the "Good evening," message to be clickable,
   it does not need to open anything or do anything, I just want it to be animated like the one on the introduction door
   and be clickable on the screen for my own amusement."
   The seal beside the greeting is now the door's own seal (R104's layers: the face with its rim, the ring, the star and the
   heart stone, each at its own depth), so at rest it moves as the door's does: it sways, the ring lifts and turns, the star
   turns and the stone beats. Under a mouse it tilts to follow it; pressed, it sinks. It is a real key ("Ingenium's seal.
   Press it for fun.") and each press plays a short flourish, a different one each time: the star spins, the ring pulses,
   the seal hops, wobbles or twirls, or the stone beats with a warm glow. Nothing opens, nothing is saved, no page changes.
   Minimal motion and the system's reduced motion still the seal; a press then only glows. window.IngSealPlay.press()
   plays one, so a later part can add a sound to it. */
.hx-seal .r175-seal{position:relative;display:grid;place-items:center;width:100%;height:100%;min-width:44px;min-height:44px;margin:0;padding:0;
  border:0;border-radius:50%;background:transparent;box-shadow:none;cursor:pointer;color:inherit;font:inherit;
  -webkit-tap-highlight-color:transparent;touch-action:manipulation;-webkit-user-select:none;user-select:none;isolation:isolate}
.hx-seal .r175-seal:hover,.hx-seal .r175-seal:active{background:transparent;box-shadow:none;transform:none}
.hx-seal .r175-seal:focus{outline:none}
.hx-seal .r175-seal:focus-visible{outline:2.5px solid var(--accent,#6a3fb5);outline-offset:5px}
body[data-theme="night"] .hx-seal .r175-seal:focus-visible{outline-color:var(--accent-bright,#c9b2f2)}
.hx-seal .r175-fx{position:relative;z-index:1;display:block;width:100%;height:100%;pointer-events:none}
.hx-seal .r175-fx > .isl{margin:0 auto}
.hx-seal .r175-fx > .ing-crest{display:block;margin:0 auto}
.hx-seal .r175-seal .isl-layer > svg{transform-origin:50% 50%}
.hx-seal .r175-glow,.hx-seal .r175-ripple{position:absolute;border-radius:50%;pointer-events:none;opacity:0}
.hx-seal .r175-glow{inset:-16%;z-index:0;--r175-c:rgba(106,63,181,.34);background:radial-gradient(closest-side,var(--r175-c),rgba(106,63,181,0) 100%)}
body[data-theme="night"] .hx-seal .r175-glow{--r175-c:rgba(201,178,242,.36)}
.hx-seal .r175-glow.gold{--r175-c:rgba(198,150,60,.40)}
body[data-theme="night"] .hx-seal .r175-glow.gold{--r175-c:rgba(232,196,120,.38)}
.hx-seal .r175-ripple{inset:3%;z-index:2;border:2px solid var(--accent,#6a3fb5)}
body[data-theme="night"] .hx-seal .r175-ripple{border-color:var(--accent-bright,#c9b2f2)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p96"]="started";}catch(_){}
/* R175 · the seal on Home, to press for fun: see the note at the top of its styles */
(function(){"use strict";
if(window.__r175)return;window.__r175=1;
var D=document,N=0,KEY=null,busy=false,again=false,last="",count=0,running=[],ends=[];
var NAME="Ingenium's seal. Press it for fun.";
function $(id){return D.getElementById(id);}
function still(){try{if(D.body.getAttribute("data-motion")==="minimal")return true;}catch(e){}
  try{return matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}

/* the door's seal, its ids named afresh so this copy borrows none of the door's gradients */
function doorSeal(){var d=$("introSeal"),s=d&&d.querySelector(".isl");if(s)return s;var h=$("brandSealBtn");return h?h.querySelector(".isl"):null;}
function copySeal(){var s=doorSeal();if(!s)return null;
  var c=s.cloneNode(true),k="r175s"+(++N)+"_";
  c.className="isl isl-home";c.removeAttribute("style");c.setAttribute("aria-hidden","true");
  var h=c.outerHTML;
  [].forEach.call(c.querySelectorAll("[id]"),function(n){var id=n.getAttribute("id"),q=id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    h=h.replace(new RegExp('id="'+q+'"',"g"),'id="'+k+id+'"').replace(new RegExp("url\\(#"+q+"\\)","g"),"url(#"+k+id+")").replace(new RegExp('href="#'+q+'"',"g"),'href="#'+k+id+'"');});
  var w=D.createElement("div");w.innerHTML=h;var out=w.firstElementChild;
  [].forEach.call(out.querySelectorAll(".isl-tilt,.isl-idle"),function(n){n.removeAttribute("style");});
  return out;}

function size(){if(!KEY)return;var isl=KEY.querySelector(".isl");if(!isl)return;var s=KEY.getBoundingClientRect().width;
  if(s>0&&Math.abs(s-(isl.__S||0))>.5){isl.__S=s;isl.style.setProperty("--S",s+"px");}}

/* ---------- the flourishes ---------- */
/* each movement's end is taken as it starts: a glow cut short by the next one ends there and then */
function anim(el,frames,o){if(!el||!el.animate)return null;try{var a=el.animate(frames,o);running.push(a);ends.push(a.finished.then(function(){},function(){}));return a;}catch(e){return null;}}
function parts(){var isl=KEY.querySelector(".isl");return {fx:KEY.querySelector(".r175-fx"),glow:KEY.querySelector(".r175-glow"),ripple:KEY.querySelector(".r175-ripple"),
  tilt:isl&&isl.querySelector(".isl-tilt"),cast:isl&&isl.querySelector(".isl-cast"),
  ring:isl&&isl.querySelector(".isl-ring > svg"),star:isl&&isl.querySelector(".isl-star > svg"),heart:isl&&isl.querySelector(".isl-heart > svg"),isl:isl};}
function glow(P,gold,strong){if(!P.glow)return;P.glow.classList.toggle("gold",!!gold);
  try{P.glow.getAnimations().forEach(function(a){a.cancel();});}catch(e){}
  anim(P.glow,[{opacity:0,scale:.82},{opacity:strong?1:.85,scale:1.04,offset:.3},{opacity:0,scale:1.12}],{duration:still()?700:1000,easing:"ease-out"});}
var SPRING="cubic-bezier(.2,.8,.25,1)";
var FL={
  spin:function(P,d){anim(P.star,[{rotate:"0deg"},{rotate:(d*360)+"deg"}],{duration:1150,easing:"cubic-bezier(.25,.9,.3,1)"});
    anim(P.ring,[{rotate:"0deg"},{rotate:(-d*360)+"deg"}],{duration:1300,easing:"cubic-bezier(.3,.8,.3,1)"});
    anim(P.heart,[{scale:1},{scale:1.14,offset:.35},{scale:1}],{duration:900,easing:"ease-in-out"});glow(P,false);},
  pulse:function(P){anim(P.ring,[{scale:1},{scale:1.13,offset:.28},{scale:.97,offset:.6},{scale:1.03,offset:.8},{scale:1}],{duration:950,easing:"ease-out"});
    anim(P.ripple,[{opacity:.6,scale:.86},{opacity:0,scale:1.55}],{duration:950,easing:"ease-out"});
    anim(P.ripple,[{opacity:0,scale:.86},{opacity:.4,scale:.9,offset:.25},{opacity:0,scale:1.4}],{duration:950,delay:220,easing:"ease-out"});glow(P,false);},
  hop:function(P){anim(P.fx,[{transform:"translateY(0) scale(1,1)"},{transform:"translateY(3%) scale(1.06,.92)",offset:.12},{transform:"translateY(-18%) scale(.97,1.04)",offset:.42},
      {transform:"translateY(0) scale(1.05,.94)",offset:.7},{transform:"translateY(-3%) scale(1,1)",offset:.85},{transform:"translateY(0) scale(1,1)"}],{duration:900,easing:"ease-in-out"});
    anim(P.cast,[{opacity:1},{opacity:.35,offset:.42},{opacity:1,offset:.7},{opacity:1}],{duration:900,easing:"ease-in-out"});glow(P,false);},
  wobble:function(P,d){anim(P.tilt,[{rotate:"y 0deg"},{rotate:"y "+(d*30)+"deg",offset:.2},{rotate:"y "+(-d*20)+"deg",offset:.45},{rotate:"y "+(d*11)+"deg",offset:.68},{rotate:"y "+(-d*4)+"deg",offset:.86},{rotate:"y 0deg"}],{duration:1250,easing:"ease-in-out"});
    glow(P,false);},
  twirl:function(P,d){anim(P.fx,[{transform:"rotate(0deg) scale(1)"},{transform:"rotate("+(d*180)+"deg) scale(.9)",offset:.45},{transform:"rotate("+(d*360)+"deg) scale(1.04)",offset:.8},{transform:"rotate("+(d*360)+"deg) scale(1)"}],{duration:1100,easing:SPRING});
    anim(P.star,[{rotate:"0deg"},{rotate:(-d*180)+"deg"}],{duration:1100,easing:SPRING});glow(P,false);},
  beat:function(P){anim(P.heart,[{scale:1},{scale:1.3,offset:.14},{scale:1.04,offset:.3},{scale:1.24,offset:.46},{scale:1,offset:.7},{scale:1}],{duration:1100,easing:"ease-in-out"});
    anim(P.ring,[{scale:1},{scale:1.04,offset:.14},{scale:1,offset:.3},{scale:1.03,offset:.46},{scale:1}],{duration:1100,easing:"ease-in-out"});glow(P,true,true);},
  /* every seventh press: the star, the ring and a hop together */
  grand:function(P,d){FL.spin(P,d);FL.hop(P);anim(P.ripple,[{opacity:.65,scale:.86},{opacity:0,scale:1.7}],{duration:1100,easing:"ease-out"});glow(P,true,true);}
};
var ORDER=["spin","pulse","hop","wobble","twirl","beat"];
function pick(){count++;if(count%7===0)return "grand";var c=ORDER.filter(function(n){return n!==last;});return c[Math.floor(Math.random()*c.length)];}
function play(){if(!KEY)return "";var P=parts();
  if(still()){glow(P,false);return "glow";}
  busy=true;running=[];ends=[];var name=pick(),d=Math.random()<.5?-1:1;last=name;
  try{FL[name](P,d);}catch(e){}
  KEY.setAttribute("data-flourish",name);
  var mine=ends.slice();
  function done(){busy=false;if(KEY&&KEY.getAttribute("data-flourish")===name)KEY.removeAttribute("data-flourish");if(again){again=false;play();}}
  if(!mine.length)done();else Promise.all(mine).then(done);
  return name;}
function press(){if(!KEY||!KEY.isConnected)mount();if(!KEY)return "";
  try{D.dispatchEvent(new CustomEvent("ing-seal-press",{detail:{busy:busy}}));}catch(e){}
  if(busy){again=true;glow(parts(),false);return "again";}
  return play();}

/* ---------- the pointer: it tilts to follow a mouse, lifts under it and sinks when pressed (as the door's does) ---------- */
function wire(k){
  function isl(){return k.querySelector(".isl");}
  k.addEventListener("pointerenter",function(e){var s=isl();if(s&&e.pointerType==="mouse"&&!still())s.classList.add("hover");});
  k.addEventListener("pointermove",function(e){var s=isl();if(!s)return;var r=s.getBoundingClientRect();if(!r.width)return;
    var x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    s.style.setProperty("--gx",(x*100).toFixed(1)+"%");s.style.setProperty("--gy",(y*100).toFixed(1)+"%");
    if(e.pointerType==="mouse"&&!still()){x=Math.max(-.25,Math.min(1.25,x));y=Math.max(-.25,Math.min(1.25,y));
      s.style.setProperty("--ry",((x-.5)*28).toFixed(1)+"deg");s.style.setProperty("--rx",(-(y-.5)*24).toFixed(1)+"deg");}},{passive:true});
  k.addEventListener("pointerleave",function(){var s=isl();if(!s)return;s.classList.remove("hover","down");s.style.setProperty("--rx","0deg");s.style.setProperty("--ry","0deg");});
  k.addEventListener("pointerdown",function(){var s=isl();if(s&&!still())s.classList.add("down");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){k.addEventListener(t,function(e){var s=isl();if(!s)return;s.classList.remove("down");if(e.pointerType!=="mouse")s.classList.remove("hover");},{passive:true});});
  k.addEventListener("click",function(e){e.preventDefault();try{(window.IngSealPlay&&IngSealPlay.press||press)();}catch(x){press();}});}

/* ---------- the key, in Home's head ---------- */
function mount(){try{
  var box=$("hxSeal");if(!box)return;
  var have=box.querySelector(".r175-seal");if(have){KEY=have;
    /* Home drew its own still crest after us: it goes, the door's seal stays */
    [].slice.call(box.children).forEach(function(c){if(c!==have)c.remove();});return;}
  var k=D.createElement("button");k.type="button";k.className="r175-seal";k.id="hxSealKey";k.setAttribute("aria-label",NAME);
  var g=D.createElement("span");g.className="r175-glow";g.setAttribute("aria-hidden","true");
  var rp=D.createElement("span");rp.className="r175-ripple";rp.setAttribute("aria-hidden","true");
  var fx=D.createElement("span");fx.className="r175-fx";
  var seal=copySeal();
  if(seal){fx.appendChild(seal);while(box.firstChild)box.removeChild(box.firstChild);}
  else{/* no door seal in this copy: Home's own crest is pressed instead (the flourishes that move the whole seal still play) */
    while(box.firstChild){var c=box.firstChild;box.removeChild(c);if(c.nodeType===1){c.setAttribute("aria-hidden","true");c.removeAttribute("role");}fx.appendChild(c);}}
  k.appendChild(g);k.appendChild(fx);k.appendChild(rp);box.appendChild(k);KEY=k;wire(k);
  var s0=box.getBoundingClientRect().width||76;if(seal){seal.__S=s0;seal.style.setProperty("--S",s0+"px");}
  try{new ResizeObserver(function(){size();}).observe(k);}catch(e){}
  size();
}catch(e){try{console.warn("Ingenium: the seal on Home",e&&e.message||e);}catch(_){}}}

window.IngSealPlay={press:press,el:function(){return KEY;},last:function(){return last;}};
mount();
/* Home may draw its crest after this part has run, or be drawn again: looked at again, cheaply */
try{var hb=$("hxSeal");if(hb)new MutationObserver(function(){if(!KEY||!KEY.isConnected||hb.children.length!==1)mount();}).observe(hb,{childList:true});}catch(e){}
setInterval(function(){var b=$("hxSeal");if(b&&(!KEY||!KEY.isConnected||KEY.parentNode!==b||b.children.length!==1))mount();},2000);
})();
;try{window.__ingParts["p96"]="running";}catch(_){}
</script>
