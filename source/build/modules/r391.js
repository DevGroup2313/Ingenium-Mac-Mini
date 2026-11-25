<script>try{(window.__ingParts=window.__ingParts||{})["p391"]="started";}catch(_){}
/* ============ R391 · COOL RUNNING: A CEILING ON FRAMES AND ON PIXELS, FOR EVERY SCENE (Ingenium 7.89, 25 November 2026) ============
   Her words (25 November 2026): "Please make sure that you account for my devices when building the new 3D visuals. I don't want it to
   drain my devices and overheat them and have the fan running high ... I had the same issue with Adamas' 3D diamond and the rest of the
   headers' animations overheating my devices and also slowing down the entire app and lagging everything. I want it fixed in any new 3D
   design and animation so this issue does not happen again. I want this to be made standard and added as a rule for all of my apps."
   Found: r310 and r324 already rest every scene 30 seconds after the last touch (12 on a phone) and when Ingenium is not the window in
   use. What they left: while she works, each scene asks for a frame at every refresh of the screen, 120 a second on a MacBook's 120 Hz
   screen, and each scene draws at the screen's full Retina sharpness (two pixels for each point, four times the pixels).
   Now, for every scene, present and future, with no scene changed:
   - frames: requestAnimationFrame is answered at most 30 times a second (every scene and every moving part asks through it); each
     callback still receives the true time, so nothing runs faster or slower, only less often;
   - pixels: a scene's canvas reads the device's pixel ratio to size itself; it now reads at most 1.25 (a Retina screen's 2 drew 2.56
     times the pixels); the page's text, pictures and keys keep the screen's full sharpness, as the browser draws those itself;
   - IngCool.on() is the rule's switch, kept with her settings (state.cool, on unless she turns it off), so any future scene can read
     IngCool.fps and IngCool.ratio. Minimal motion and r324's rest are unchanged. */
(function r391(){"use strict";
if(window.IngCool)return;var W=window;
var FPS=30,RATIO=1.25,on=true;try{var s=JSON.parse(localStorage.getItem("ingenium_cool")||"null");if(s&&s.off)on=false;}catch(e){}
/* pixels: what scenes read to size their canvases (the browser's own drawing is not affected) */
try{var d0=Object.getOwnPropertyDescriptor(W,"devicePixelRatio")||Object.getOwnPropertyDescriptor(Object.getPrototypeOf(W),"devicePixelRatio");
  var real=function(){try{return d0&&d0.get?d0.get.call(W):1;}catch(e){return 1;}};
  Object.defineProperty(W,"devicePixelRatio",{configurable:true,get:function(){var r=real();return on?Math.min(r,RATIO):r;}});W.__ingRealRatio=real;}catch(e){}
/* frames: one shared wake, at most FPS a second, each callback given the true time */
var nRAF=W.requestAnimationFrame?W.requestAnimationFrame.bind(W):null,nCAF=W.cancelAnimationFrame?W.cancelAnimationFrame.bind(W):null;
if(nRAF){var Q=[],ids=0,pending=0,last=0,gap=1000/FPS;
  function flush(t){pending=0;if(on&&t-last<gap-2){pending=nRAF(flush);return;}last=t;var run=Q;Q=[];for(var i=0;i<run.length;i++){var c=run[i];if(c.dead)continue;try{c.f(t);}catch(e){setTimeout(function(){throw e;},0);}}}
  W.requestAnimationFrame=function(f){var c={id:++ids,f:f,dead:false};Q.push(c);if(!pending)pending=nRAF(flush);return c.id;};
  W.cancelAnimationFrame=function(id){for(var i=0;i<Q.length;i++)if(Q[i].id===id){Q[i].dead=true;break;}};}
/* the scenes that sized themselves before this part loaded size themselves again, at the new ceiling */
try{setTimeout(function(){try{W.dispatchEvent(new Event("resize"));}catch(e){}},1500);}catch(e){}
W.IngCool={fps:FPS,ratio:RATIO,on:function(){return on;},set:function(v){on=!!v;try{localStorage.setItem("ingenium_cool",JSON.stringify({off:!on}));}catch(e){}return on;}};
})();
;try{window.__ingParts["p391"]="running";}catch(_){}
</script>
