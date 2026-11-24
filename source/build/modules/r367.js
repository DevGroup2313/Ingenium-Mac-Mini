<script>try{(window.__ingParts=window.__ingParts||{})["p367"]="started";}catch(_){}
/* ============ R367 · THE TOUR'S CARD KEEPS CLEAR OF ADAMAS'S STONE (Ingenium 7.75, 24 November 2026) ============
   Her words (24 November 2026): "The tour card is also placed directly on the diamond during the tour, which worsens the blurred
   background effect even more. Please fix this, because it ruins the entire 3D visuals of the tour page."
   The guided tour's card stands at the foot of the window, in its middle (the base page's .tour-ov). On a window shorter than the page's
   head, or with the head scrolled up, it can cover the stone and its holder. Now, whenever the card is drawn or the window changes, if
   it would cover the stone (Adamas's scene, or its still stone), the card moves to the side of the window away from the stone, beside
   the side bar; if the window is too narrow for that, it moves to the top of the window instead. A card she has dragged stays where she
   put it. Modules r292 (the stone's own fix) and the base page's tour are unchanged. */
(function r367(){
"use strict";
if(window.__r367)return;window.__r367=1;
var W=window,D=document;
function rect(e){try{return e.getBoundingClientRect();}catch(x){return null;}}
function cross(a,b){return !!(a&&b&&a.width>0&&b.width>0&&a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom);}
function stone(){var pg=D.getElementById("page-build");if(!pg||!pg.classList.contains("active"))return null;
  var c=pg.querySelector(".bd-cv:not(.ov)");if(!c)return null;var host=c.parentNode||c,r=rect(host);if(!r||r.width<40||r.height<40||r.bottom<0||r.top>innerHeight)return null;return r;}
function dragged(card){var t=card.style.transform||"";return /translate/.test(t)&&!/translate\(0(px)?, ?0(px)?\)/.test(t);}
function place(){var ov=D.querySelector(".tour-ov"),card=ov&&ov.querySelector(".tour-card");if(!ov||!card)return;
  if(dragged(card))return;
  ov.style.justifyContent="";ov.style.top="";ov.style.bottom="";ov.style.paddingLeft="";ov.style.paddingRight="";card.style.maxWidth="";ov.removeAttribute("data-r367");
  var s=stone();if(!s)return;var c=rect(card);if(!cross(c,s))return;
  var main=D.querySelector("main.main")||D.querySelector(".main"),mr=main?rect(main):null,left=mr?Math.max(16,mr.left+16):16,cw=c.width;
  var roomLeft=s.left-12-left,roomRight=innerWidth-16-(s.right+12);
  /* beside the stone, on its wider side, the card narrowed to the room there when need be (never below 300 pixels) */
  if(Math.max(roomLeft,roomRight)>=300){var L=roomLeft>=roomRight,room=L?roomLeft:roomRight;if(room<cw)card.style.maxWidth=Math.floor(room)+"px";
    if(L){ov.style.justifyContent="flex-start";ov.style.paddingLeft=left+"px";ov.setAttribute("data-r367","left");}
    else{ov.style.justifyContent="flex-end";ov.style.paddingRight="16px";ov.setAttribute("data-r367","right");}return;}
  /* a narrow window: above or below the stone, wherever it covers least */
  var h=c.height,top=60,bottomTop=innerHeight-18-h;var overTop=Math.max(0,Math.min(top+h,s.bottom)-Math.max(top,s.top)),overBot=Math.max(0,Math.min(bottomTop+h,s.bottom)-Math.max(bottomTop,s.top));
  if(overTop<overBot){ov.style.top="60px";ov.style.bottom="auto";ov.setAttribute("data-r367","top");}else ov.setAttribute("data-r367","bottom");}
var T=0;function soon(){if(T)return;T=setTimeout(function(){T=0;try{place();}catch(e){}},60);[400,1200].forEach(function(ms){setTimeout(function(){try{place();}catch(e){}},ms);});}
/* the tour keeps its card and changes what is in it at each step: any change inside the tour's frame, or a frame added, is watched */
function watch(){try{new MutationObserver(function(rs){for(var i=0;i<rs.length;i++){var r=rs[i],t=r.target;
        if(t&&t.nodeType===1&&t.closest&&t.closest(".tour-ov")){soon();return;}
        for(var j=0;j<r.addedNodes.length;j++){var n=r.addedNodes[j];if(n.nodeType===1&&(n.classList.contains("tour-ov")||n.classList.contains("tour-card")||(n.querySelector&&n.querySelector(".tour-card")))){soon();return;}}}
      }).observe(D.body,{childList:true,subtree:true});}catch(e){}
  W.addEventListener("resize",function(){if(D.querySelector(".tour-card"))soon();});W.addEventListener("scroll",function(){if(D.querySelector(".tour-card"))soon();},{passive:true});}
if(D.body)watch();else D.addEventListener("DOMContentLoaded",watch);
/* and while a tour card shows, every 0.7 seconds: the stone's scene can appear after the tour's last change */
setInterval(function(){if(D.querySelector(".tour-card"))try{place();}catch(e){}},700);
W.IngTourClear={place:place};
})();
;try{window.__ingParts["p367"]="running";}catch(_){}
</script>
