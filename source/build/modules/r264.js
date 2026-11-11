<style id="r264-css">
/* ============ R264 · HOME'S ORBS, AS SOLID AS THE SEAL (Ingenium 6.72, 10 November 2026) ============
   Approved on its live preview, 11 November 2026: "I approve of the preview, please commit and push it everywhere."
   Her words (10 November 2026): "I want the orbs pages circling around the engine logo to have the same feel and density and
   animation as the engine logo, I want them to be as animated and thick and 3D feeling as the logo button. I want them to feel like
   buttons with the same texture when I click on them on the Home page, it feels weird seeing them just light up and feel hollow when I
   click on them or hover over them."
   What was hollow, measured on 6.71: the seal (R104, R175, R261) is a coin. Its face stands on four rim discs and a base, and its
   ring, star and stone stand 14 to 47 pixels above it, so as it sways its edge shows and its parts slide past one another. Each orb
   was a painted ball with its mark 16 pixels above it: as it swayed it read as a flat disc, pressed it only shrank, and its room then
   opened at once, so nothing of the press was seen. Each orb is now made as the seal is made, part for part, in its own purples:
   - Its body. Seven discs in its own purples, lit on their upper side, stand behind its face (a seventh of its size deep; pressed,
     they close up) (the seal's rim, R261), so as it sways or tilts its edge shows;
     under them a base whose contact shadow lengthens as it lifts and tightens as it is pressed (the seal's base, R104).
   - Its mark stands where the seal's star stands on Home (a fifth of its size above the face, not a seventh) and is itself thick: a
     lavender and a violet copy stand under the white one, so the mark reads as a raised key, not a print.
   - At rest it sways as before; its mark lifts off the face and settles as the seal's ring does (7 seconds); and it turns as the
     engine turns, counterclockwise: its bands and spots drift across its face under a light that stays where it is, as a planet turns
     on its axis (one turn of its pattern in 60 seconds in Calm, 40 in Full). Minimal motion and the
     system's reduced motion still both, as they still the seal.
   - Under a mouse the mark rises further and the base's shadow lengthens; pressed, the mark is pushed toward the face, the orb sinks
     and its shadow tightens. On release it knocks as the seal knocks before it opens the door, with a ripple in its own purple and a
     small pop of its mark, and its room opens 280 milliseconds later, as the door opens after the seal's knock. A click that is not
     a person's (the guided tour's), Minimal motion and reduced motion open the room at once.
   No glare, no glowing edge, no ring and no moon are added (her words of 10 November: "Remove the sphere from Fabrica!", "lose that
   weird flashing effect"). Left alone, nothing on Home is rewritten: every movement is the browser's own (CSS), as R261 asks. */
#hx:not(.ox-on) .oxo-edge,#hx:not(.ox-on) .oxo-dp,#hx:not(.ox-on) .oxo-ripple{display:none}
#hx:not(.ox-on) .oxo-lift{display:contents}
/* the body: five discs in the orb's deeper purples behind its face, and its base under them */
#page-home #hx.ox-on .oxo.oxs .oxo-edge{position:absolute;inset:0;display:block;transform-style:preserve-3d;pointer-events:none}
#page-home #hx.ox-on .oxo.oxs .oxo-rim,#page-home #hx.ox-on .oxo.oxs .oxo-base{position:absolute;left:16.667%;top:16.667%;width:66.667%;height:66.667%;
  border-radius:50%;display:block;pointer-events:none}
#page-home #hx.ox-on .oxo.oxs .oxo-rim{background:linear-gradient(160deg,var(--c1) 0%,var(--c2) 42%,var(--c3) 100%);
  transform:translateZ(calc(var(--S) * -.02 * var(--k)));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
#page-home #hx.ox-on .oxo.oxs.down .oxo-rim{transform:translateZ(calc(var(--S) * -.012 * var(--k)));transition-duration:.08s}
#page-home #hx.ox-on .oxo.oxs .oxo-base{background:var(--c4);transform:translateZ(calc(var(--S) * -.15));
  box-shadow:0 0 0 calc(var(--S) * .006) rgba(42,20,80,.14),0 calc(var(--S) * .014) calc(var(--S) * .02) rgba(42,20,80,.18),0 calc(var(--S) * .035) calc(var(--S) * .05) rgba(42,20,80,.08);
  transition:box-shadow .35s cubic-bezier(.2,.8,.2,1)}
body[data-theme="night"] #page-home #hx.ox-on .oxo.oxs .oxo-base{
  box-shadow:0 0 0 calc(var(--S) * .006) rgba(0,0,0,.3),0 calc(var(--S) * .014) calc(var(--S) * .02) rgba(0,0,0,.36),0 calc(var(--S) * .035) calc(var(--S) * .05) rgba(0,0,0,.18)}
#page-home #hx.ox-on .oxo.oxs.hover .oxo-base{
  box-shadow:0 0 0 calc(var(--S) * .006) rgba(42,20,80,.16),0 calc(var(--S) * .024) calc(var(--S) * .03) rgba(42,20,80,.17),0 calc(var(--S) * .06) calc(var(--S) * .08) rgba(42,20,80,.08)}
body[data-theme="night"] #page-home #hx.ox-on .oxo.oxs.hover .oxo-base{
  box-shadow:0 0 0 calc(var(--S) * .006) rgba(0,0,0,.32),0 calc(var(--S) * .024) calc(var(--S) * .03) rgba(0,0,0,.36),0 calc(var(--S) * .06) calc(var(--S) * .08) rgba(0,0,0,.18)}
#page-home #hx.ox-on .oxo.oxs.down .oxo-base{transition-duration:.08s;
  box-shadow:0 0 0 calc(var(--S) * .006) rgba(42,20,80,.16),0 calc(var(--S) * .006) calc(var(--S) * .01) rgba(42,20,80,.22)}
body[data-theme="night"] #page-home #hx.ox-on .oxo.oxs.down .oxo-base{
  box-shadow:0 0 0 calc(var(--S) * .006) rgba(0,0,0,.32),0 calc(var(--S) * .006) calc(var(--S) * .01) rgba(0,0,0,.44)}
/* the face in three parts: the ball, its surface (which turns), and its light and shade (which do not) */
#page-home #hx.ox-on .hx-head .oxo.oxs .oxo-ball > svg{position:absolute;left:0;top:0}
#page-home #hx.ox-on .hx-head .oxo.oxs .oxo-ball > svg.oxo-shade{filter:none}
#page-home #hx.ox-on .hx-head .oxo.oxs .oxo-ball > svg.oxo-surf{filter:none}
#page-home #hx.ox-on .oxo.oxs .oxo-drift{animation:oxsTurn 60s steps(600) infinite;animation-delay:var(--od3,0s)}
body[data-motion="full"] #page-home #hx.ox-on .oxo.oxs .oxo-drift{animation-duration:40s}
@keyframes oxsTurn{from{transform:translateX(-80px)}to{transform:translateX(0)}}
/* the mark: where the seal's star stands, thick, lifting and settling as the seal's ring does */
#page-home #hx.ox-on .oxo.oxs .oxo-mark{--fz:.2;--fk:.95;transform-style:preserve-3d;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
#page-home #hx.ox-on .oxo.oxs.hover .oxo-mark{--fz:.25}
#page-home #hx.ox-on .oxo.oxs.down .oxo-mark{--fz:.11;transition-duration:.08s}
#page-home #hx.ox-on .oxo.oxs .oxo-lift{position:absolute;inset:0;display:block;transform-style:preserve-3d;transform-origin:50% 50%;
  animation:oxsLift 7s ease-in-out infinite;animation-delay:var(--od,0s)}
@keyframes oxsLift{0%,50%,100%{transform:translateZ(0)}25%,75%{transform:translateZ(calc(var(--S) * .05))}}
#page-home #hx.ox-on .oxo.oxs.hover .oxo-lift,#page-home #hx.ox-on .oxo.oxs.down .oxo-lift{animation-play-state:paused}
#page-home #hx.ox-on .oxo.oxs .oxo-ico{transform:translateZ(0);filter:drop-shadow(0 calc(var(--S) * .006) calc(var(--S) * .006) rgba(42,20,80,.24))}
body[data-theme="night"] #page-home #hx.ox-on .oxo.oxs .oxo-ico{filter:drop-shadow(0 calc(var(--S) * .006) calc(var(--S) * .008) rgba(0,0,0,.42))}
#page-home #hx.ox-on .oxo.oxs .oxo-dp{position:absolute;left:50%;top:50%;width:60px;height:60px;margin:-30px 0 0 -30px;display:block;pointer-events:none}
#page-home #hx.ox-on .hx-head .oxo.oxs .oxo-dp svg{display:block;width:60px;height:60px;stroke-width:1.9}
#page-home #hx.ox-on .oxo.oxs .oxo-dp1{color:#e2d7f7;transform:translateZ(calc(var(--S) * -.025))}
#page-home #hx.ox-on .oxo.oxs .oxo-dp2{color:#b39de4;transform:translateZ(calc(var(--S) * -.05));
  filter:drop-shadow(calc(var(--S) * .016) calc(var(--S) * .05) calc(var(--S) * .04) rgba(42,20,80,.3))}
body[data-theme="night"] #page-home #hx.ox-on .oxo.oxs .oxo-dp1{color:#cdbff0}
body[data-theme="night"] #page-home #hx.ox-on .oxo.oxs .oxo-dp2{color:var(--c1);filter:drop-shadow(calc(var(--S) * .016) calc(var(--S) * .045) calc(var(--S) * .045) rgba(0,0,0,.5))}
/* the knock, as the seal knocks before it opens the door (R104), with a ripple in the orb's own purple and a pop of its mark */
#page-home #hx.ox-on .oxo.oxs .oxo-ripple{position:absolute;left:16.667%;top:16.667%;width:66.667%;height:66.667%;box-sizing:border-box;border-radius:50%;
  display:block;pointer-events:none;opacity:0;border:calc(var(--S) * .02) solid var(--c1);transform:translateZ(calc(var(--S) * .004))}
#page-home #hx.ox-on .oxo.oxs.knock .oxo-ripple{animation:oxsRipple .6s ease-out}
@keyframes oxsRipple{0%{opacity:.55;scale:.92}100%{opacity:0;scale:1.5}}
#page-home #hx.ox-on .oxo.oxs.knock .oxo-tilt{animation:oxsKnock .55s cubic-bezier(.3,.7,.3,1)}
@keyframes oxsKnock{0%{translate:0 calc(var(--S) * .03)}45%{translate:0 calc(var(--S) * -.035)}75%{translate:0 calc(var(--S) * .008)}100%{translate:0 0}}
#page-home #hx.ox-on .oxo.oxs.knock .oxo-lift{animation:oxsLift 7s ease-in-out var(--od,0s) infinite,oxsPop .5s cubic-bezier(.2,.8,.25,1);animation-play-state:paused,running}
@keyframes oxsPop{0%{scale:1}35%{scale:1.14}70%{scale:.98}100%{scale:1}}
/* Minimal motion and the system's reduced motion still the orbs as they still the seal */
body[data-motion="minimal"] #page-home #hx.ox-on .oxo.oxs :is(.oxo-drift,.oxo-lift,.oxo-ripple,.oxo-tilt){animation:none}
body[data-motion="minimal"] #page-home #hx.ox-on .oxo.oxs .oxo-mark{transition:none}
@media (prefers-reduced-motion:reduce){#page-home #hx.ox-on .oxo.oxs :is(.oxo-drift,.oxo-lift,.oxo-ripple,.oxo-tilt){animation:none}
  #page-home #hx.ox-on .oxo.oxs .oxo-mark{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p264"]="started";}catch(_){}
/* R264 · Home's orbs, as solid as the seal: see the note at the top of its styles */
(function(){"use strict";
if(window.__r264)return;window.__r264=1;
var D=document,W=window,N=0,BEAT=280;
function $(id){return D.getElementById(id);}
function motion(){var m="calm";try{m=D.body.getAttribute("data-motion")||"calm";}catch(e){}
  try{if(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)m="minimal";}catch(e){}return m;}
function still(){return motion()==="minimal";}
function orrery(){var h=$("hx");return !!(h&&h.classList.contains("ox-on"));}
function homeShown(){var h=$("page-home");return !!(h&&h.offsetParent);}

/* a copy of an orb's ball keeping some of its parts, its gradients and clip named afresh so no copy borrows another's */
function part(svg,keep,cls){var c=svg.cloneNode(true);
  [].slice.call(c.children).forEach(function(n,i){if(String(n.tagName).toLowerCase()==="defs")return;if(keep.indexOf(i)<0)c.removeChild(n);});
  var h=c.outerHTML,k="oxq"+(++N)+"_";
  [].forEach.call(c.querySelectorAll("[id]"),function(n){var id=n.getAttribute("id"),q=id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    h=h.replace(new RegExp('id="'+q+'"',"g"),'id="'+k+id+'"').replace(new RegExp("url\\(#"+q+"\\)","g"),"url(#"+k+id+")");});
  var t=D.createElement("div");t.innerHTML=h;var out=t.firstElementChild;out.setAttribute("class",cls);return out;}
/* R261 draws the ball in one picture: its defs, the ball, its surface (clipped), the side away from the light, its edge and its
   highlight. The surface goes into a picture of its own so it can turn under the light; anything else is left as it is */
function split(ball){var sv=ball.querySelector("svg");if(!sv||ball.querySelector(".oxo-surf"))return false;var kids=[].slice.call(sv.children);
  if(kids.length!==6||String(kids[0].tagName).toLowerCase()!=="defs"||!kids[2].getAttribute("clip-path"))return false;
  var body=part(sv,[1],"oxo-body"),surf=part(sv,[2],"oxo-surf"),shade=part(sv,[3,4,5],"oxo-shade");
  /* the surface's pattern, twice, one turn apart (80 of the picture's 120 units), drifting behind the ball's own round clip */
  [].slice.call(surf.querySelectorAll("[clip-path]")).forEach(function(g){var NS="http://www.w3.org/2000/svg",d=D.createElementNS(NS,"g"),twin=D.createElementNS(NS,"g");
    d.setAttribute("class","oxo-drift");twin.setAttribute("transform","translate(80 0)");
    while(g.firstChild){var n=g.firstChild;twin.appendChild(n.cloneNode(true));d.appendChild(n);}
    d.appendChild(twin);g.appendChild(d);});
  ball.replaceChild(body,sv);ball.appendChild(surf);ball.appendChild(shade);return true;}
function edge(){var e=D.createElement("span");e.className="oxo-edge";e.setAttribute("aria-hidden","true");
  var h='<i class="oxo-base"></i>';for(var k=7;k>=1;k--)h+='<i class="oxo-rim" style="--k:'+k+'"></i>';e.innerHTML=h;return e;}
function thick(o){var m=o.querySelector(".oxo-mark"),ico=m&&m.querySelector(".oxo-ico");if(!m||!ico||m.querySelector(".oxo-lift"))return;
  var lift=D.createElement("span");lift.className="oxo-lift";m.insertBefore(lift,ico);lift.appendChild(ico);
  var sv=ico.querySelector("svg");if(!sv)return;
  ["oxo-dp oxo-dp1","oxo-dp oxo-dp2"].forEach(function(cls){var d=D.createElement("span");d.className=cls;d.setAttribute("aria-hidden","true");
    var c=sv.cloneNode(true);c.removeAttribute("id");c.setAttribute("aria-hidden","true");c.setAttribute("focusable","false");d.appendChild(c);lift.appendChild(d);});}
function knock(o){if(still())return;o.classList.remove("knock");void o.offsetWidth;o.classList.add("knock");
  clearTimeout(o.__oxsK);o.__oxsK=setTimeout(function(){o.classList.remove("knock");},700);}
/* the room opens after the knock, as the door opens after the seal's; a click that is not a person's opens it at once */
function wire(k,o){if(k.__oxs)return;var orig=k.onclick;if(typeof orig!=="function")return;k.__oxs=1;
  k.onclick=function(e){var self=this,args=arguments;
    if(!e||!e.isTrusted||!orrery()||still()||!k.closest(".hx-head"))return orig.apply(self,args);
    if(k.__oxsBusy)return;k.__oxsBusy=true;knock(o);
    setTimeout(function(){k.__oxsBusy=false;if(homeShown())orig.apply(self,args);},BEAT);};}
function upgrade(o,i){if(o.classList.contains("oxs"))return;var idle=o.querySelector(".oxo-idle"),ball=o.querySelector(".oxo-ball");if(!idle||!ball)return;
  try{split(ball);}catch(e){}
  var cast=idle.querySelector(".oxo-cast");idle.insertBefore(edge(),cast?cast.nextSibling:idle.firstChild);
  thick(o);
  var r=D.createElement("i");r.className="oxo-ripple";r.setAttribute("aria-hidden","true");idle.appendChild(r);
  o.style.setProperty("--od3",(-i*7.3).toFixed(1)+"s");o.classList.add("oxs");
  var k=o.closest(".hx-key");if(k)wire(k,o);}
function all(){var list=D.querySelectorAll("#hx .hx-key .oxo:not(.oxs)");if(!list.length)return;
  var keys=[].slice.call(D.querySelectorAll("#hx .hx-key"));
  [].forEach.call(list,function(o){try{upgrade(o,Math.max(0,keys.indexOf(o.closest(".hx-key"))));}catch(e){try{console.warn("Ingenium: an orb on Home",e&&e.message||e);}catch(_){}}});}
function boot(){all();setInterval(all,1500);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngOrbs={refresh:all,beat:BEAT,state:function(){var o=[].slice.call(D.querySelectorAll("#hx .hx-key .oxo"));
  return {orbs:o.length,solid:o.filter(function(x){return x.classList.contains("oxs");}).length,motion:motion(),orrery:orrery()};}};
try{window.__ingParts["p264"]="running";}catch(_){}
})();
</script>
