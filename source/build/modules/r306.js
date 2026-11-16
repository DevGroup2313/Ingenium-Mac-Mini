<style id="r306-css">
/* ============ R306 · THE TOP BAR'S SEAL TURNED BY THE GRAPHICS CHIP (Ingenium 7.17, 16 November 2026) ============
   Her words (16 November 2026): "Ingenium is still overheating and lagging and still move a bit too slowly on my devices, please fix this
   issue." And before (13 November 2026): "I want you to find a fix that keeps my animation and graphics and my devices running fast and
   smooth with no issues."
   Measured on 7.16 in WebKit, Safari's own engine, which runs Ingenium on her Mac, iPhone and iPad (scratchpad tools/wk_heat.js: the share
   of each second the page's main thread is taken, against an empty page): the top bar's seal, on every page, turns four parts inside its
   drawings (the engine, the ring, the heart, the glow), and a part that turns inside a drawing is drawn again by the processor on every
   frame, its soft light and shadows (blurs) with it. Holding those four took a plain page's work to about half (chat 491 to 279; with only
   their light and shadows taken off, 349 to 241); holding every other animation changed almost nothing, as the graphics chip moves those.
   So here each of the four is moved whole by the graphics chip instead: the ring and the engine turned, the heart beaten, the glow breathed,
   each drawn once. The engine's shadows (the one its light casts and the two beneath it) are drawn once as layers of their own, each turned
   about its own place, so they fall where they fell, as the light stands still while the engine turns. The motion is the page's own: its
   keyframes are read from the page's style sheet, its timing and easing from the browser. Measured after (WebKit, the same tool): chat 431
   to between 160 and 210, Settings 334 to between 186 and 260, the Guide 437 to between 219 and 254, Ingenia 415 to between 220 and 304,
   about what holding the parts still gave. Compared frame by frame with the seal as it was (tools/seal_cmp.js, eight moments by day and by
   night, twice the pixels): a mean difference under half a per cent; the engine is drawn a little crisper, as the graphics chip turns it
   whole where WebKit drew its light softly. Only in Safari's engine (WebKit: her Mac, iPhone and iPad), where it was measured to help; in
   Chrome's (her Windows laptop's web view, the Fire tablet), measured without a graphics chip it cost more, so there the seal is as it
   was, as it is where a browser cannot turn a drawing on its own (Safari before 14.1). */
html body .isl .isl-layer > svg.isl-gc{position:absolute !important;left:0;top:0;filter:none !important}
html body .isl .isl-star > svg.isl-gc-sh{z-index:-1}
html body .isl .isl-star > svg.isl-gcb{filter:none}
html body:not([data-theme="night"]) .isl-gc .gc-n,html body[data-theme="night"] .isl-gc .gc-d{display:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p306"]="started";}catch(_){}
(function(){"use strict";
var D=document,W=window,NS="http://www.w3.org/2000/svg",N=0,ON=true,CUR=null,KF={};
function can(){try{return /^Apple/.test(navigator.vendor||"")&&!!(W.CSS&&CSS.supports&&CSS.supports("rotate","1deg")&&CSS.supports("scale","1")&&CSS.supports("translate","1px")&&
  typeof Element.prototype.animate==="function"&&typeof Element.prototype.getAnimations==="function");}catch(e){return false;}}
if(!can()){try{window.__ingParts["p306"]="running";}catch(_){}return;}

/* the four parts: where each is, what it moves, and what carries it now */
var PARTS=[{k:"ring",sel:".isl-ring > svg .seal-counter",kind:"rotate"},{k:"star",sel:".isl-star > svg .seal-spin",kind:"rotate"},
  {k:"heart",sel:".isl-heart > svg .seal-heart",kind:"scale"},{k:"glow",sel:".isl-back > svg .s4-breath",kind:"opacity"}];
/* the engine's shadows, in the drawing's own units (120 to the seal's width): the cast of its light filter (r104's sbLift), and the two
   drop shadows r104 lays under the engine by day and by night (lengths there are fractions of the seal, --S, on a drawing 2 --S wide) */
var SH=[{k:"ds2",dx:.6,dy:1.8,d:{sd:.75,c:"rgb(42,20,80)",o:.12},n:{sd:.9,c:"rgb(0,0,0)",o:.3}},
  {k:"ds1",dx:.24,dy:.72,d:{sd:.18,c:"rgb(42,20,80)",o:.24},n:{sd:.24,c:"rgb(0,0,0)",o:.5}},
  {k:"cast",dx:1.36,dy:3.23,cast:2.21}];

/* a part's keyframes, as the page's style sheet writes them */
function keyframes(name,kind){if(KF[name+kind])return KF[name+kind];var rule=null;
  try{for(var i=0;i<D.styleSheets.length;i++){var rs;try{rs=D.styleSheets[i].cssRules;}catch(e){continue;}if(!rs)continue;
    for(var j=0;j<rs.length;j++){var r=rs[j];if(r&&r.type===7&&r.name===name)rule=r;
      else if(r&&r.cssRules&&r.type===4){for(var m=0;m<r.cssRules.length;m++){var q=r.cssRules[m];if(q&&q.type===7&&q.name===name&&r.media&&W.matchMedia&&matchMedia(r.media.mediaText).matches)rule=q;}}}}}catch(e){return null;}
  if(!rule)return null;var out=[];
  for(var k=0;k<rule.cssRules.length;k++){var kr=rule.cssRules[k],v=null,st=kr.style;
    if(kind==="opacity"){var op=st.getPropertyValue("opacity");if(op!=="")v={opacity:String(parseFloat(op))};}
    else{var t=(st.getPropertyValue("transform")||"").trim(),mm;
      if(kind==="rotate"&&(mm=/^rotate\(\s*(-?[\d.]+)deg\s*\)$/.exec(t)))v={rotate:mm[1]+"deg"};
      else if(kind==="scale"&&(mm=/^scale\(\s*([\d.]+)\s*\)$/.exec(t)))v={scale:mm[1]};
      else if(t==="none")v=kind==="rotate"?{rotate:"0deg"}:{scale:"1"};}
    if(!v)return null;
    String(kr.keyText).split(",").forEach(function(s){s=s.trim();var f=s==="from"?0:s==="to"?1:parseFloat(s)/100;if(isNaN(f))return;out.push(Object.assign({offset:f},v));});}
  out.sort(function(a,b){return a.offset-b.offset;});if(out.length<2)return null;
  if(out[0].offset>0||out[out.length-1].offset<1)return null;
  return (KF[name+kind]=out);}
function cssAnim(el){try{var l=el.getAnimations();for(var i=0;i<l.length;i++)if(typeof l[i].animationName==="string")return l[i];}catch(e){}return null;}

/* the drawing copies: their names made their own, as r104 does for each layer */
function own(svg,k){var px="isg"+(++N)+k+"_",ids=[];
  [].forEach.call(svg.querySelectorAll("[id]"),function(n){var id=n.getAttribute("id");ids.push(id);n.setAttribute("id",px+id);});
  [].forEach.call(svg.querySelectorAll("*"),function(m){[].slice.call(m.attributes).forEach(function(a){var v=a.value,w=v;
    ids.forEach(function(id){w=w.split("url(#"+id+")").join("url(#"+px+id+")");if(w==="#"+id)w="#"+px+id;});if(w!==v)m.setAttribute(a.name,w);});});
  return px;}
function el(n,at){var e=D.createElementNS(NS,n);for(var a in at)if(Object.prototype.hasOwnProperty.call(at,a))e.setAttribute(a,at[a]);return e;}
function shadowSvg(spin,s){var v=el("svg",{viewBox:"0 0 120 120","class":"seal3d isl-gc isl-gc-sh","aria-hidden":"true",focusable:"false"}),defs=el("defs",{});v.appendChild(defs);
  v.style.translate=(s.dx/1.2).toFixed(4)+"% "+(s.dy/1.2).toFixed(4)+"%";var px="isg"+(++N)+s.k+"_";
  function variant(id,sd,flood,cls){var f=el("filter",{id:px+id,x:"-25%",y:"-25%",width:"150%",height:"150%","color-interpolation-filters":"sRGB"});
    f.appendChild(el("feGaussianBlur",{"in":"SourceAlpha",stdDeviation:String(sd),result:"b"}));f.appendChild(el("feFlood",flood));f.appendChild(el("feComposite",{in2:"b",operator:"in"}));defs.appendChild(f);
    var g=el("g",cls?{"class":cls,filter:"url(#"+px+id+")"}:{filter:"url(#"+px+id+")"});[].forEach.call(spin.childNodes,function(c){g.appendChild(c.cloneNode(true));});v.appendChild(g);}
  if(s.cast)variant("c",s.cast,{"class":"s4-cast"},null);
  else{variant("d",s.d.sd,{"flood-color":s.d.c,"flood-opacity":String(s.d.o)},"gc-d");variant("n",s.n.sd,{"flood-color":s.n.c,"flood-opacity":String(s.n.o)},"gc-n");}
  return v;}

/* taking the seal in hand */
function apply(w){if(!w||w.__gc||!ON)return;var st={w:w,parts:{},added:[],undo:[]},ok=true;
  PARTS.forEach(function(p){var part=w.querySelector(p.sel);if(!part)ok=false;st.parts[p.k]={p:p,el:part,A:null,M:[],hosts:[]};});
  if(!ok)return;
  var back=w.querySelector(".isl-back > svg"),star=w.querySelector(".isl-star > svg"),spin=st.parts.star.el;
  /* the glow on a drawing of its own, over the back (the strokes it lay under begin where it has faded to nothing) */
  var gl=back.cloneNode(true);[].slice.call(gl.childNodes).forEach(function(c){if(c.nodeType!==1||(c.tagName.toLowerCase()!=="defs"&&!(c.getAttribute("class")||"").match(/\bs4-breath\b/)))gl.removeChild(c);});
  var gc=gl.querySelector(".s4-breath");if(!gc)return;gc.removeAttribute("class");gl.setAttribute("class",(gl.getAttribute("class")||"")+" isl-gc");own(gl,"g");
  back.parentNode.appendChild(gl);st.added.push(gl);st.parts.glow.el.style.visibility="hidden";st.undo.push(function(){st.parts.glow.el.style.visibility="";});
  /* the engine's shadows as layers beneath it, and the engine without them */
  var fid=(/url\(#([^)]+)\)/.exec(spin.parentNode.getAttribute("filter")||"")||[])[1],fl=fid?star.querySelector("[id='"+fid+"']"):null,cn=fl?fl.querySelector("feMergeNode[in='cast']"):null;
  if(cn){var cp=cn.parentNode,cnx=cn.nextSibling;cp.removeChild(cn);st.undo.push(function(){cp.insertBefore(cn,cnx);});}
  star.classList.add("isl-gcb");st.undo.push(function(){star.classList.remove("isl-gcb");});
  var shs=SH.map(function(s){var v=shadowSvg(spin,s);star.parentNode.appendChild(v);st.added.push(v);return v;});
  st.parts.ring.hosts=[w.querySelector(".isl-ring > svg")];st.parts.star.hosts=[star].concat(shs);
  st.parts.heart.hosts=[w.querySelector(".isl-heart > svg")];st.parts.glow.hosts=[gl];
  w.__gc=st;CUR=st;check();}
/* each part's motion, carried by its new host: the same keyframes, timing and easing, from where the part stood */
function adopt(q,A){q.M.forEach(function(m){try{m.cancel();}catch(e){}});q.M=[];q.A=A;if(!A)return;
  var kf=keyframes(A.animationName,q.p.kind);if(!kf){q.A=null;return;}
  var tm=A.effect.getTiming(),ease=getComputedStyle(q.el).animationTimingFunction||"ease";ease=String(ease).split(",")[0].indexOf("(")>=0?String(ease).replace(/\),.*$/,")"):String(ease).split(",")[0].trim();
  var frames=kf.map(function(f){var o=Object.assign({},f);o.easing=ease;return o;}),ct=A.currentTime||0;
  q.dur=tm.duration;q.M=q.hosts.map(function(h){var m=h.animate(frames,{duration:tm.duration,delay:tm.delay||0,iterations:Infinity,direction:tm.direction||"normal",fill:tm.fill||"none",easing:"linear"});m.currentTime=ct;return m;});
  try{A.pause();A.currentTime=0;}catch(e){}A.__gcSrc=1;}
function check(){var st=CUR;if(!st)return;if(!st.w.isConnected){CUR=null;apply(seal());return;}
  PARTS.forEach(function(p){var q=st.parts[p.k],A=cssAnim(q.el);
    if(!A){if(q.M.length)adopt(q,null);return;}
    if(A!==q.A||A.playState==="running")adopt(q,A);
    else if(A.effect.getTiming().duration!==q.dur&&q.M.length){var f=(q.M[0].currentTime%q.dur)/q.dur;adopt(q,A);q.M.forEach(function(m){m.currentTime=f*q.dur;});}});}
/* letting go: the seal as r104 made it, its parts moving on from where they stand */
function off(){ON=false;var st=CUR;CUR=null;if(!st)return;
  PARTS.forEach(function(p){var q=st.parts[p.k],t=q.M.length?q.M[0].currentTime:null;q.M.forEach(function(m){try{m.cancel();}catch(e){}});q.M=[];
    if(q.A){try{if(t!=null)q.A.currentTime=t;q.A.play();}catch(e){}q.A.__gcSrc=0;}});
  st.added.forEach(function(v){if(v.parentNode)v.parentNode.removeChild(v);});st.undo.forEach(function(f){try{f();}catch(e){}});st.w.__gc=null;}
function seal(){return D.querySelector("#brandSealBtn .isl");}
function start(){if(!ON)return;var w=seal();if(w&&!w.__gc)apply(w);else check();}
start();[300,1500,4000].forEach(function(ms){setTimeout(start,ms);});setInterval(start,3000);
try{new MutationObserver(function(){setTimeout(start,30);}).observe(D.body,{attributes:true,attributeFilter:["data-motion","data-theme","class"]});}catch(e){}
try{var mq=W.matchMedia("(prefers-reduced-motion: reduce)");if(mq.addEventListener)mq.addEventListener("change",start);else if(mq.addListener)mq.addListener(start);}catch(e){}
try{var bb=D.getElementById("brandSealBtn");if(bb)new MutationObserver(function(){setTimeout(start,30);}).observe(bb,{childList:true,subtree:true});}catch(e){}
W.IngSealGC={on:function(){ON=true;start();},off:off,state:function(){var st=CUR;if(!st)return {on:ON,applied:false};
  var o={on:ON,applied:true};PARTS.forEach(function(p){var q=st.parts[p.k];o[p.k]={moving:q.M.length,name:q.A&&q.A.animationName,t:q.M[0]?Math.round(q.M[0].currentTime):null};});return o;}};
try{window.__ingParts["p306"]="running";}catch(_){}
})();
</script>
