<style id="r265-css">
/* ============ R265 · A NEW APP'S LOGO, SOLID AND PRESSABLE (Ingenium 6.74, 11 November 2026) ============ */
#fb .f-new-prev .f-ls.mark.nl-on{background:none !important;box-shadow:none !important;display:block;overflow:visible;cursor:pointer;outline:none;
  perspective:calc(var(--S,92px) * 5);-webkit-tap-highlight-color:transparent;touch-action:manipulation;-webkit-user-select:none;user-select:none}
#fb .f-new-prev .f-ls.mark.nl-on:not(.turn){animation:none !important}
#fb .f-new-prev .f-ls.mark.nl-on.turn{animation:r260Turn .7s var(--f-spring,cubic-bezier(.34,1.4,.5,1)) !important}
#fb .f-new-prev .nl-tilt{position:absolute;inset:0;display:block;transform-style:preserve-3d;--rx:0deg;--ry:0deg;--lift:0px;--sc:1;
  transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--lift)) scale(var(--sc));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
#fb .f-new-prev .f-ls.mark.nl-on.nl-hov .nl-tilt{--lift:calc(var(--S,92px) * -.06);--sc:1.04}
#fb .f-new-prev .f-ls.mark.nl-on.nl-down .nl-tilt{--lift:calc(var(--S,92px) * .02);--sc:.96;transition-duration:.12s}
#fb .f-new-prev .nl-idle{position:absolute;inset:0;display:block;transform-style:preserve-3d;animation:nlSway 7s ease-in-out infinite}
@keyframes nlSway{0%,100%{transform:rotateY(-9deg) rotateX(3deg) translateY(0)}50%{transform:rotateY(9deg) rotateX(-2deg) translateY(calc(var(--S,92px) * -.04))}}
/* its body: seven discs in its own colour, deeper and darker toward the back, and its shadow on the well */
#fb .f-new-prev .nl-rim{position:absolute;inset:0;border-radius:50%;display:block;pointer-events:none;
  background-color:var(--nl2,#26626e);background-image:linear-gradient(160deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.33) 55%,rgba(0,0,0,.61) 100%);
  transform:translateZ(calc(var(--S,92px) * -.018 * var(--k)));transition:transform .2s ease,background-color .6s ease}
#fb .f-new-prev .f-ls.mark.nl-on.nl-down .nl-rim{transform:translateZ(calc(var(--S,92px) * -.009 * var(--k)))}
#fb .f-new-prev .nl-cast{position:absolute;left:10%;right:10%;bottom:-15%;height:16%;border-radius:50%;display:block;pointer-events:none;
  background:radial-gradient(closest-side,rgba(30,16,50,.34),rgba(30,16,50,0));filter:blur(2px);transform:translateZ(calc(var(--S,92px) * -.2))}
body[data-theme="night"] #fb .f-new-prev .nl-cast{background:radial-gradient(closest-side,rgba(0,0,0,.6),rgba(0,0,0,0))}
/* its face, lit from above, and its letter standing up from it, thick */
#fb .f-new-prev .nl-face{position:absolute;inset:0;border-radius:50%;display:grid;place-items:center;transform-style:preserve-3d;
  background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.42),rgba(255,255,255,0) 46%),radial-gradient(circle at 50% 118%,rgba(0,0,0,.26),rgba(0,0,0,0) 62%),var(--mc,#2f7a8a);
  box-shadow:inset 0 2px 0 rgba(255,255,255,.35),inset 0 -6px 10px rgba(0,0,0,.22),inset 0 0 0 calc(var(--S,92px) * .045) rgba(255,255,255,.12);transition:background-color .6s ease}
#fb .f-new-prev .nl-stand{display:block;transform-style:preserve-3d;transform:translateZ(0);transition:transform .3s cubic-bezier(.2,.8,.2,1)}
#fb .f-new-prev .f-ls.mark.nl-on.nl-hov .nl-stand{transform:translateZ(calc(var(--S,92px) * .07))}
#fb .f-new-prev .f-ls.mark.nl-on.nl-down .nl-stand{transform:translateZ(calc(var(--S,92px) * -.07));transition-duration:.12s}
#fb .f-new-prev .nl-lift{display:block;transform-style:preserve-3d;animation:nlLift 7s ease-in-out infinite}
@keyframes nlLift{0%,100%{transform:translateZ(calc(var(--S,92px) * .1))}50%{transform:translateZ(calc(var(--S,92px) * .15))}}
#fb .f-new-prev .nl-ch{display:block;line-height:1;color:#fff;
  text-shadow:0 1px 0 var(--nl2,#26626e),0 2px 0 var(--nl2,#26626e),0 3px 0 var(--nl3,#173d45),0 4px 0 var(--nl3,#173d45),0 7px 10px rgba(0,0,0,.3);
  transition:text-shadow .6s ease}
#fb .f-new-prev .nl-shine{position:absolute;inset:0;border-radius:50%;display:block;pointer-events:none;
  background:linear-gradient(115deg,rgba(255,255,255,0) 38%,rgba(255,255,255,.26) 50%,rgba(255,255,255,0) 62%);background-size:260% 100%;background-position:120% 0;
  transform:translateZ(calc(var(--S,92px) * .02));animation:nlShine 6.5s ease-in-out infinite}
@keyframes nlShine{0%,55%{background-position:120% 0}85%,100%{background-position:-20% 0}}
/* a picture of her own on its face */
#fb .f-new-prev .nl-pic{position:absolute;inset:0;width:100%;height:100%;max-width:none;border-radius:50%;object-fit:cover;display:block;pointer-events:none;
  transform:translateZ(calc(var(--S,92px) * .012))}
#fb .f-new-prev .nl-pic[hidden]{display:none !important}
#fb .f-new-prev .f-ls.mark.nl-has-pic .nl-stand{display:none}
/* pressed: it knocks, with a ripple */
#fb .f-new-prev .nl-ripple{position:absolute;inset:-7%;border-radius:50%;display:block;pointer-events:none;opacity:0;border:2px solid var(--nl1,#58a0ad);transform:translateZ(1px);transition:border-color .6s ease}
#fb .f-new-prev .f-ls.mark.nl-on.knock .nl-tilt{animation:nlKnock .55s cubic-bezier(.3,.7,.3,1)}
#fb .f-new-prev .f-ls.mark.nl-on.knock .nl-ripple{animation:nlRipple .6s ease-out}
@keyframes nlKnock{0%{translate:0 calc(var(--S,92px) * .03)}45%{translate:0 calc(var(--S,92px) * -.05)}75%{translate:0 calc(var(--S,92px) * .01)}100%{translate:0 0}}
@keyframes nlRipple{0%{opacity:.75;scale:.86}100%{opacity:0;scale:1.36}}
#fb .f-new-prev .f-ls.mark.nl-on:focus-visible .nl-face{box-shadow:inset 0 2px 0 rgba(255,255,255,.35),inset 0 -6px 10px rgba(0,0,0,.22),0 0 0 3px var(--f-accs,rgba(107,79,160,.45))}
#fb .f-new-prev .f-ls.mark.nl-on.nl-drop .nl-face{outline:2px dashed var(--nl1,#58a0ad);outline-offset:5px}
#fb .f-new .f-sw button{animation:nlBob 4.8s ease-in-out infinite;animation-delay:calc(var(--nl-i,0) * -.8s)}
@keyframes nlBob{0%,100%{translate:0 0}50%{translate:0 -2px}}
#fb .f-new .f-sw button.nl-pop{animation:nlPop .34s cubic-bezier(.3,1.5,.5,1),nlBob 4.8s ease-in-out .34s infinite}
@keyframes nlPop{0%{scale:1.28}100%{scale:1}}
#fb .f-new .f-way{--wrx:0deg;--wry:0deg;--wly:0px;transform:perspective(700px) rotateX(var(--wrx)) rotateY(var(--wry)) translateY(var(--wly));
  transition:transform .22s cubic-bezier(.2,.8,.2,1),box-shadow .2s ease,border-color .2s ease}
#fb .f-new .f-way:hover{--wly:-3px}
#fb .f-new .f-way:active{--wly:1px;transition-duration:.07s}
#fb .f-new .f-way[aria-pressed="true"]{--wly:1px}
#fb .f-new .f-way[aria-pressed="true"] b::after{display:inline-block;animation:nlTick .34s cubic-bezier(.3,1.6,.5,1)}
@keyframes nlTick{0%{transform:scale(.2) rotate(-30deg);opacity:0}100%{transform:none;opacity:1}}
#fb .f-new .f-in{transition:transform .2s cubic-bezier(.2,.8,.2,1),box-shadow .2s ease}
#fb .f-new .f-in:focus{transform:translateY(-1px)}
#fb .f-new .f-new-foot .f-btn.nl-pop{animation:nlPop .34s cubic-bezier(.3,1.5,.5,1)}
#fb .f-new-prev .nl-keys{display:flex;justify-content:center;margin:6px 0 0}
#fb .f-new-prev .nl-keys .f-btn{font-size:12.5px;padding:5px 12px;min-height:0}
#fb .f-new[data-way="files"] .f-new-prev .nl-keys{display:none}
/* minimal motion, the calm days and the device's reduced motion: it stands still, and still answers a press */
body[data-motion="minimal"] #fb .f-new-prev .nl-idle,body[data-motion="minimal"] #fb .f-new-prev .nl-lift,body[data-motion="minimal"] #fb .f-new-prev .nl-shine,
body[data-calm="1"] #fb .f-new-prev .nl-idle,body[data-calm="1"] #fb .f-new-prev .nl-lift,body[data-calm="1"] #fb .f-new-prev .nl-shine{animation:none !important}
body[data-motion="minimal"] #fb .f-new-prev .f-ls.mark.nl-on.knock .nl-tilt,body[data-motion="minimal"] #fb .f-new-prev .f-ls.mark.nl-on.knock .nl-ripple,
body[data-calm="1"] #fb .f-new-prev .f-ls.mark.nl-on.knock .nl-tilt,body[data-calm="1"] #fb .f-new-prev .f-ls.mark.nl-on.knock .nl-ripple{animation:none !important}
body[data-motion="minimal"] #fb .f-new .f-sw button,body[data-motion="minimal"] #fb .f-new .f-way b::after,body[data-motion="minimal"] #fb .f-new .f-btn,
body[data-calm="1"] #fb .f-new .f-sw button,body[data-calm="1"] #fb .f-new .f-way b::after,body[data-calm="1"] #fb .f-new .f-btn{animation:none !important}
body[data-motion="minimal"] #fb .f-new .f-way,body[data-calm="1"] #fb .f-new .f-way{--wrx:0deg !important;--wry:0deg !important}
@media (prefers-reduced-motion:reduce){#fb .f-new-prev .nl-idle,#fb .f-new-prev .nl-lift,#fb .f-new-prev .nl-shine,#fb .f-new-prev .f-ls.mark.nl-on.knock .nl-tilt,
  #fb .f-new-prev .f-ls.mark.nl-on.knock .nl-ripple,#fb .f-new .f-sw button,#fb .f-new .f-way b::after,#fb .f-new .f-btn{animation:none !important}#fb .f-new-prev .nl-tilt{transition:none}
  #fb .f-new .f-way{--wrx:0deg !important;--wry:0deg !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p265"]="started";}catch(_){}
/* ============ R265 · A NEW APP'S LOGO, SOLID AND PRESSABLE (Ingenium 6.74, 11 November 2026) ============
   Her words (11 November 2026), on Fabrica's A new app panel: "Please change "seal" to "logo" because not every app will have an seal
   themed logo. I also want you to make the app's logo animated and clickable on the popped out panel page, it needs to be interactive
   and clickable like the rest of the page." Asked what a press should do, she chose both ways offered: "Knock, then next colour" and
   "Bring in a picture".
   - The logo (modules/r112.js draws it, a coin since 6.66, r260) is made solid as Home's orbs are (r264): a body of seven discs in its
     own colour behind its face, its letter standing up from the face and thick, a cast shadow; at rest it sways, its letter lifts and
     settles and a sheen crosses it. It leans toward the pointer, lifts under it and sinks when pressed; a press (pointer, finger, Enter
     or Space) knocks it, with a ripple, and turns it to the next of its six colours (the colour row follows, by its own keys). It is a
     key: it sounds as Fabrica's keys do (r176), and says which colour it wears.
   - "Use a picture" under it (or a picture dropped on it): her own picture becomes the logo, on its face; a press still knocks it and
     changes its colour, which shows through a picture's clear parts and stays the app's colour. "Use its letter" takes it away.
     The picture is cut to a square from its middle (512 pixels); when the app is made, r112 writes the logo, the picture on a disc of
     its colour, into the app's page as its icon (a picture written into the page, which the installers read) and as icon.png beside
     it, so Fabrica's cards (r239), its icon and its installers wear it. Nothing caps a picture's size.
   - Minimal motion, the calm days and the device's reduced motion keep it still; a press still changes its colour.
   - Its states are nl-hov and nl-down: Fabrica's own pointer code (r112) clears hov and down from every logo but the card's.
   - She approved the preview (11 November 2026): "I approve of the preview, push it everywhere but the clicking does feel heavy and not
     everything is fully animated", then: "I think its my laptop lagging, please disregard the request about the heavy clicks." So the
     press is as she approved it, and the rest of the panel moves too: the colours bob out of step and the one chosen pops; the ways
     lean toward the pointer, lift, sink and tick when chosen; the fields rise when written in; Make it pops when it is ready.
   - Her words on the release (11 November 2026): "the colour of the letter switches too fast and looks off". The face faded to its new
     colour over .35 s while the letter's raised sides and the body changed at once; now the face, the letter's sides, the body and the
     ripple change together over .6 s, while the coin turns (the body's shading is a fixed shade over its colour, so the colour fades). */
(function r265(){
"use strict";
if(window.IngNewLogo)return;
var W=window,D=document,N_DISCS=7,SIZE=512;
function el(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function still(){try{if(W.IngFabricaDepth&&typeof IngFabricaDepth.still==="function")return !!IngFabricaDepth.still();}catch(e){}
  try{var b=D.body;return b.getAttribute("data-motion")==="minimal"||b.getAttribute("data-calm")==="1"||W.matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
function say(m){try{if(typeof W.ingToast==="function")W.ingToast(m);}catch(e){}}
/* its shades, from its colour: the lit edge, the body and the depths */
function rgb(c){var m=/^#?([0-9a-f]{6})$/i.exec(String(c||"").trim());if(!m)return [47,122,138];var n=parseInt(m[1],16);return [n>>16&255,n>>8&255,n&255];}
function mix(a,b,t){return "rgb("+a.map(function(v,i){return Math.round(v+(b[i]-v)*t);}).join(",")+")";}
function colourOf(mk){return String(mk.style.getPropertyValue("--mc")||"#2f7a8a").trim();}
function shade(mk){var mc=colourOf(mk);if(mk.__mc===mc)return;mk.__mc=mc;var c=rgb(mc),K=[0,0,0],Wh=[255,255,255];
  mk.style.setProperty("--nl1",mix(c,Wh,.22));mk.style.setProperty("--nl2",mix(c,K,.28));mk.style.setProperty("--nl3",mix(c,K,.52));mk.style.setProperty("--nl4",mix(c,K,.72));}
function swatches(mk){var sh=mk.closest(".f-sheet")||mk.closest(".f-new")||D;return [].slice.call(sh.querySelectorAll(".f-sw button"));}
function label(mk){var bs=swatches(mk),i=-1;bs.forEach(function(b,j){if(b.getAttribute("aria-pressed")==="true")i=j;});
  mk.setAttribute("aria-label",(mk.__pic?"Its logo, your picture":"Its logo, the letter "+String((mk.querySelector(".nl-ch")||{}).textContent||"").trim())+
    (i>=0?", in colour "+(i+1)+" of "+bs.length:"")+". Press it for the next colour.");}
function nextColour(mk){var bs=swatches(mk);if(!bs.length)return;var i=-1;bs.forEach(function(b,j){if(b.getAttribute("aria-pressed")==="true")i=j;});
  bs[(i+1)%bs.length].click();shade(mk);label(mk);}
function knock(mk){if(still())return;mk.classList.remove("knock");void mk.offsetWidth;mk.classList.add("knock");clearTimeout(mk.__kt);mk.__kt=setTimeout(function(){mk.classList.remove("knock");},640);}
function turn(mk){if(still())return;mk.classList.remove("turn");void mk.offsetWidth;mk.classList.add("turn");clearTimeout(mk.__turnT);mk.__turnT=setTimeout(function(){mk.classList.remove("turn");},760);}
function press(mk){knock(mk);clearTimeout(mk.__ct);mk.__ct=setTimeout(function(){nextColour(mk);},still()?0:170);}
function pop(e){if(!e||still())return;e.classList.remove("nl-pop");void e.offsetWidth;e.classList.add("nl-pop");clearTimeout(e.__pt);e.__pt=setTimeout(function(){e.classList.remove("nl-pop");},400);}
/* the ways lean toward the pointer, as Fabrica's library cards do (r260) */
function leanWay(w,e){if(still()){w.style.setProperty("--wrx","0deg");w.style.setProperty("--wry","0deg");return;}var r=w.getBoundingClientRect();if(!r.width)return;
  var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;w.style.setProperty("--wry",(Math.max(-.5,Math.min(.5,x))*7).toFixed(2)+"deg");w.style.setProperty("--wrx",(-Math.max(-.5,Math.min(.5,y))*9).toFixed(2)+"deg");}
function panel(mk){var nw=mk.closest(".f-new");if(!nw||nw.__r265)return;nw.__r265=1;
  [].forEach.call(nw.querySelectorAll(".f-sw button"),function(b,i){b.style.setProperty("--nl-i",String(i));});
  try{new MutationObserver(function(ms){ms.forEach(function(m){if(m.target.getAttribute&&m.target.getAttribute("aria-pressed")==="true"&&m.oldValue!=="true")pop(m.target);});})
    .observe(nw.querySelector(".f-sw")||nw,{subtree:true,attributes:true,attributeFilter:["aria-pressed"],attributeOldValue:true});}catch(e){}
  [].forEach.call(nw.querySelectorAll(".f-way"),function(w){w.addEventListener("pointermove",function(e){leanWay(w,e);});
    w.addEventListener("pointerleave",function(){w.style.setProperty("--wrx","0deg");w.style.setProperty("--wry","0deg");});});
  var go=[].slice.call(nw.querySelectorAll(".f-new-foot .f-btn")).pop();
  if(go)try{new MutationObserver(function(ms){ms.forEach(function(m){if(m.oldValue!==null&&!go.disabled)pop(go);});}).observe(go,{attributes:true,attributeFilter:["disabled"],attributeOldValue:true});}catch(e){}}
/* a picture: the square from its middle, 512 pixels, its clear parts kept */
function square(src){return new Promise(function(res,rej){var im=new Image();
  im.onload=function(){var w=im.naturalWidth||im.width||0,h=im.naturalHeight||im.height||0,c=el("canvas"),x;c.width=SIZE;c.height=SIZE;x=c.getContext("2d");
    x.imageSmoothingEnabled=true;try{x.imageSmoothingQuality="high";}catch(e){}
    if(!w||!h)x.drawImage(im,0,0,SIZE,SIZE);else{var s=Math.max(SIZE/w,SIZE/h),dw=w*s,dh=h*s;x.drawImage(im,(SIZE-dw)/2,(SIZE-dh)/2,dw,dh);}
    try{res(c.toDataURL("image/png"));}catch(e){rej(new Error("this picture could not be drawn"));}};
  im.onerror=function(){rej(new Error("this picture could not be read"));};im.src=src;});}
function isPicture(f){return !!f&&(/^image\/(png|jpe?g|webp|gif|svg\+xml)$/i.test(f.type||"")||/\.(png|jpe?g|webp|gif|svg)$/i.test(f.name||""));}
function usePicture(mk,f){if(!isPicture(f)){say("Choose a picture for its logo: a PNG, JPEG, WebP, GIF or SVG file.");return Promise.resolve(false);}
  return new Promise(function(res,rej){var fr=new FileReader();fr.onload=function(){res(String(fr.result||""));};fr.onerror=function(){rej(fr.error||new Error("this picture could not be read"));};fr.readAsDataURL(f);})
    .then(square).then(function(png){setPicture(mk,png);return true;},function(e){say("This picture could not be used: "+(e&&e.message||e)+".");return false;});}
function setPicture(mk,png){var pic=mk.querySelector(".nl-pic"),k=mk.__key;mk.__pic=png||null;
  if(png){pic.src=png;pic.hidden=false;mk.classList.add("nl-has-pic");if(k)k.textContent="Use its letter";}
  else{pic.removeAttribute("src");pic.hidden=true;mk.classList.remove("nl-has-pic");if(k)k.textContent="Use a picture";}
  label(mk);turn(mk);}
function pick(mk){var i=el("input");i.type="file";i.accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,.png,.jpg,.jpeg,.webp,.gif,.svg";i.style.display="none";D.body.appendChild(i);
  i.addEventListener("change",function(){var f=i.files&&i.files[0];i.remove();if(f)usePicture(mk,f);});i.click();}
/* the logo the app is made with: her picture on a disc of its colour, round (null when it wears its letter) */
function compose(mk){if(!mk||!mk.__pic)return Promise.resolve(null);
  return new Promise(function(res,rej){var im=new Image();im.onload=function(){var c=el("canvas"),x;c.width=SIZE;c.height=SIZE;x=c.getContext("2d");
      x.save();x.beginPath();x.arc(SIZE/2,SIZE/2,SIZE/2,0,Math.PI*2);x.closePath();x.clip();x.fillStyle=colourOf(mk);x.fillRect(0,0,SIZE,SIZE);x.drawImage(im,0,0,SIZE,SIZE);x.restore();
      try{res(c.toDataURL("image/png"));}catch(e){rej(e);}};
    im.onerror=function(){rej(new Error("its picture could not be drawn"));};im.src=mk.__pic;});}
function lean(mk,e){var t=mk.querySelector(".nl-tilt");if(!t)return;if(still()){t.style.setProperty("--rx","0deg");t.style.setProperty("--ry","0deg");return;}
  var r=mk.getBoundingClientRect();if(!r.width)return;var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  t.style.setProperty("--ry",(Math.max(-.5,Math.min(.5,x))*30).toFixed(1)+"deg");t.style.setProperty("--rx",(-Math.max(-.5,Math.min(.5,y))*30).toFixed(1)+"deg");}
function rest(mk){var t=mk.querySelector(".nl-tilt");mk.classList.remove("nl-hov","nl-down");if(t){t.style.setProperty("--rx","0deg");t.style.setProperty("--ry","0deg");}}
function make(mk){if(mk.__r265)return;mk.__r265=1;
  var ch=mk.querySelector(":scope > span");
  mk.classList.add("nl-on");mk.setAttribute("role","button");mk.tabIndex=0;mk.removeAttribute("aria-hidden");
  var tilt=el("span","nl-tilt"),idle=el("span","nl-idle"),face=el("span","nl-face"),stand=el("span","nl-stand"),lift=el("span","nl-lift"),pic=el("img","nl-pic");
  idle.appendChild(el("i","nl-cast"));for(var k=N_DISCS;k>=1;k--){var d=el("i","nl-rim");d.style.setProperty("--k",String(k));idle.appendChild(d);}
  if(ch){ch.classList.add("nl-ch");lift.appendChild(ch);}stand.appendChild(lift);face.appendChild(stand);
  pic.alt="";pic.hidden=true;face.appendChild(pic);face.appendChild(el("i","nl-shine"));idle.appendChild(face);idle.appendChild(el("i","nl-ripple"));
  tilt.appendChild(idle);mk.appendChild(tilt);
  /* under it: the key for a picture of her own, and the words for both */
  var prev=mk.closest(".f-new-prev"),note=prev&&prev.querySelector("small"),keys=el("div","nl-keys"),key=el("button","f-btn sm nl-pic-k","Use a picture");
  key.type="button";key.addEventListener("click",function(){if(mk.__pic)setPicture(mk,null);else pick(mk);});keys.appendChild(key);mk.__key=key;
  if(prev){if(note)prev.insertBefore(keys,note);else prev.appendChild(keys);}
  if(note&&!/Press it for the next colour/.test(note.textContent))note.textContent=note.textContent.replace(/\s*$/,"")+" Press it for the next colour, or use a picture of your own.";
  shade(mk);label(mk);panel(mk);
  try{new MutationObserver(function(){shade(mk);label(mk);}).observe(mk,{attributes:true,attributeFilter:["style"]});}catch(e){}
  try{var sw=prev&&prev.parentNode&&prev.parentNode.querySelector(".f-sw");if(sw)new MutationObserver(function(){label(mk);}).observe(sw,{subtree:true,attributes:true,attributeFilter:["aria-pressed"]});}catch(e){}
  try{new MutationObserver(function(){label(mk);}).observe(ch||mk,{childList:true,characterData:true,subtree:true});}catch(e){}
  mk.addEventListener("pointerenter",function(e){mk.classList.add("nl-hov");lean(mk,e);});
  mk.addEventListener("pointermove",function(e){lean(mk,e);});
  mk.addEventListener("pointerleave",function(){rest(mk);});
  mk.addEventListener("pointerdown",function(e){if(e.button>0)return;mk.classList.add("nl-down");});
  mk.addEventListener("pointerup",function(){mk.classList.remove("nl-down");});
  mk.addEventListener("pointercancel",function(){rest(mk);});
  mk.addEventListener("click",function(e){e.preventDefault();press(mk);});
  mk.addEventListener("keydown",function(e){if(e.key!=="Enter"&&e.key!==" "&&e.key!=="Spacebar")return;e.preventDefault();e.stopPropagation();
    try{if(W.IngSound&&IngSound.play)IngSound.play("keys",{});}catch(x){}press(mk);});
  mk.addEventListener("dragover",function(e){var dt=e.dataTransfer;if(!dt||[].indexOf.call(dt.types||[],"Files")<0)return;e.preventDefault();mk.classList.add("nl-drop");});
  mk.addEventListener("dragleave",function(){mk.classList.remove("nl-drop");});
  mk.addEventListener("drop",function(e){mk.classList.remove("nl-drop");var f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];if(!f)return;e.preventDefault();usePicture(mk,f);});}
function all(){try{[].forEach.call(D.querySelectorAll("#fb .f-new-prev .f-ls.mark"),make);}catch(e){}}
var tries=0;
function boot(){var fb=D.getElementById("fb");if(!fb){if(++tries<200)setTimeout(boot,700);return;}if(fb.__r265)return;fb.__r265=1;all();
  try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){if(ms[i].addedNodes&&ms[i].addedNodes.length){all();return;}}}).observe(fb,{childList:true,subtree:true});}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngNewLogo={compose:compose,picture:function(mk){return mk&&mk.__pic||null;},use:usePicture,set:setPicture,press:press,square:square,
  state:function(){var mk=D.querySelector("#fb .f-new-prev .f-ls.mark");return mk?{on:!!mk.__r265,colour:colourOf(mk),picture:!!mk.__pic,label:mk.getAttribute("aria-label"),
    discs:mk.querySelectorAll(".nl-rim").length,role:mk.getAttribute("role"),still:still()}:null;}};
try{window.__ingParts["p265"]="running";}catch(_){}
})();
</script>
