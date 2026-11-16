<style id="r306-css">
/* ============ R306 · THE SEALS TURNED BY THE GRAPHICS CHIP (Ingenium 7.17, 16 November 2026; every seal, 7.18) ============
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
   was, as it is where a browser cannot turn a drawing on its own (Safari before 14.1).
   7.18 (her words, 16 November 2026: "Yes, fix the larger seals the same way next and continue working on my requests."): every seal of
   its kind, not the top bar's alone: Home's (132 px), Concordia's (70) and Vocatio's (53) as well. Their shadows are read from each
   seal's own style (a head may set its own) and its own light filter, and drawn again when the theme changes. A press on those seals
   plays a flourish that turns or beats the same layers (r175, r262, r290): for as long as it plays, that part is handed back to its own
   drawing, exactly as before, and taken up again when it ends. */
html body .isl .isl-layer > svg.isl-gc{position:absolute !important;left:0;top:0;filter:none !important}
html body .isl .isl-star > svg.isl-gc-sh{z-index:-1}
html body .isl .isl-star > svg.isl-gcb{filter:none}
html body .isl .isl-layer > svg.isl-gc-off{display:none !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p306"]="started";}catch(_){}
(function(){"use strict";
var D=document,W=window,NS="http://www.w3.org/2000/svg",N=0,ON=true,ALL=[],KF={},ANIM=Element.prototype.animate;
function can(){try{return /^Apple/.test(navigator.vendor||"")&&!!(W.CSS&&CSS.supports&&CSS.supports("rotate","1deg")&&CSS.supports("scale","1")&&CSS.supports("translate","1px")&&
  typeof ANIM==="function"&&typeof Element.prototype.getAnimations==="function");}catch(e){return false;}}
if(!can()){try{window.__ingParts["p306"]="running";}catch(_){}return;}

/* the four parts: where each is, and what it moves */
var PARTS=[{k:"ring",sel:".isl-ring > svg .seal-counter",kind:"rotate"},{k:"star",sel:".isl-star > svg .seal-spin",kind:"rotate"},
  {k:"heart",sel:".isl-heart > svg .seal-heart",kind:"scale"},{k:"glow",sel:".isl-back > svg .s4-breath",kind:"opacity"}];

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
      else if(kind==="x"&&(mm=/^translateX\(\s*(-?[\d.]+)px\s*\)$/.exec(t)))v={x:parseFloat(mm[1])};
      else if(t==="none")v=kind==="rotate"?{rotate:"0deg"}:kind==="x"?{x:0}:{scale:"1"};}
    if(!v)return null;
    String(kr.keyText).split(",").forEach(function(x){x=x.trim();var f=x==="from"?0:x==="to"?1:parseFloat(x)/100;if(isNaN(f))return;out.push(Object.assign({offset:f},v));});}
  out.sort(function(a,b){return a.offset-b.offset;});if(out.length<2||out[0].offset>0||out[out.length-1].offset<1)return null;
  return (KF[name+kind]=out);}
function cssAnim(el){try{var l=el.getAnimations();for(var i=0;i<l.length;i++)if(typeof l[i].animationName==="string")return l[i];}catch(e){}return null;}
function el(n,at){var e=D.createElementNS(NS,n);for(var a in at)if(Object.prototype.hasOwnProperty.call(at,a))e.setAttribute(a,at[a]);return e;}
function own(svg,k){var px="isg"+(++N)+k+"_",ids=[];
  [].forEach.call(svg.querySelectorAll("[id]"),function(n){var id=n.getAttribute("id");ids.push(id);n.setAttribute("id",px+id);});
  [].forEach.call(svg.querySelectorAll("*"),function(m){[].slice.call(m.attributes).forEach(function(a){var v=a.value,w=v;
    ids.forEach(function(id){w=w.split("url(#"+id+")").join("url(#"+px+id+")");if(w==="#"+id)w="#"+px+id;});if(w!==v)m.setAttribute(a.name,w);});});
  return px;}

/* the engine's shadows, read from the seal itself: the cast of its own light filter (a blur and an offset), and the drop shadows its style
   lays under it (lengths there in px of the drawing's own box, 120 units wide); each becomes a layer turned about its own place */
function shadowsOf(star,fl){var out=[],W0=star.parentNode&&star.parentNode.offsetWidth||0;
  if(fl){var b=null,o=null;[].forEach.call(fl.children,function(c){var t=c.tagName.toLowerCase();if(t==="fegaussianblur"&&c.getAttribute("in")==="SourceAlpha"&&!b&&c.getAttribute("result")==="b")b=c;
      if(t==="feoffset"&&c.getAttribute("in")==="b"&&!o)o=c;});
    if(b&&o)out.push({k:"cast",sd:parseFloat(b.getAttribute("stdDeviation"))||0,dx:parseFloat(o.getAttribute("dx"))||0,dy:parseFloat(o.getAttribute("dy"))||0,cast:true});}
  var f=String(getComputedStyle(star).filter||""),re=/drop-shadow\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g,m,ds=[];
  while((m=re.exec(f))){var body=m[1],col=(/(rgba?\([^)]*\)|#[0-9a-fA-F]{3,8}|\b[a-z]+\b(?!\())/.exec(body.replace(/-?[\d.]+px/g,""))||[])[1],
      px=(body.match(/-?[\d.]+px/g)||[]).map(parseFloat);if(px.length<2||!W0)continue;var u=120/W0;
    ds.push({k:"ds",dx:px[0]*u,dy:px[1]*u,sd:(px[2]||0)*u/2,color:col||"rgba(0,0,0,.3)"});}
  return ds.reverse().concat(out);}   /* the last drop shadow lies lowest, the cast just under the engine */
function shadowSvg(spin,s){var v=el("svg",{viewBox:"0 0 120 120","class":"seal3d isl-gc isl-gc-sh","aria-hidden":"true",focusable:"false"}),defs=el("defs",{});v.appendChild(defs);
  v.style.translate=(s.dx/1.2).toFixed(4)+"% "+(s.dy/1.2).toFixed(4)+"%";var px="isg"+(++N)+s.k+"_",f=el("filter",{id:px+"f",x:"-25%",y:"-25%",width:"150%",height:"150%","color-interpolation-filters":"sRGB"});
  f.appendChild(el("feGaussianBlur",{"in":"SourceAlpha",stdDeviation:String(Math.max(0,s.sd)),result:"b"}));
  f.appendChild(el("feFlood",s.cast?{"class":"s4-cast"}:{"flood-color":s.color}));f.appendChild(el("feComposite",{in2:"b",operator:"in"}));defs.appendChild(f);
  var g=el("g",{filter:"url(#"+px+"f)"});[].forEach.call(spin.childNodes,function(c){g.appendChild(c.cloneNode(true));});v.appendChild(g);return v;}

/* a seal taken in hand: each part dressed for the graphics chip (or undressed: as r104 drew it), and its motion carried, or handed back */
/* a seal copied from one already taken in hand (r175, r262 and r290 copy the door's seal to make their own) carries its layers: they go,
   and its engine's light filter gets its cast back, so every seal starts as r104 drew it */
function clean(w){[].forEach.call(w.querySelectorAll("svg.isl-gc"),function(v){if(v.parentNode)v.parentNode.removeChild(v);});
  [].forEach.call(w.querySelectorAll(".isl-star > svg.isl-gcb"),function(v){v.classList.remove("isl-gcb");});
  [].forEach.call(w.querySelectorAll(".isl-star > svg filter"),function(f){var m=f.querySelector("feMerge"),c=f.querySelector("[result='cast']");
    if(m&&c&&!m.querySelector("feMergeNode[in='cast']")){var n=D.createElementNS(NS,"feMergeNode");n.setAttribute("in","cast");m.insertBefore(n,m.firstChild);}});
  [].forEach.call(w.querySelectorAll(".isl-back > svg .s4-breath"),function(c){if(c.style.visibility==="hidden")c.style.visibility="";});}
function make(w){clean(w);var st={w:w,parts:{}},ok=true;
  PARTS.forEach(function(p){var e=w.querySelector(p.sel);if(!e&&p.k!=="glow")ok=false;st.parts[p.k]={p:p,el:e,A:null,M:[],hosts:[],fl:0,dressed:false,st:st};});
  if(!ok)return null;var P=st.parts;
  P.ring.hosts=[w.querySelector(".isl-ring > svg")];P.heart.hosts=[w.querySelector(".isl-heart > svg")];
  var star=w.querySelector(".isl-star > svg"),spin=P.star.el,fid=(/url\(#([^)]+)\)/.exec(spin.parentNode.getAttribute("filter")||"")||[])[1];
  P.star.svg=star;P.star.fl=0;P.star.filter=fid?star.querySelector("[id='"+fid+"']"):null;P.star.hosts=[star];P.star.shadows=[];
  if(P.glow.el){var back=w.querySelector(".isl-back > svg"),gl=back.cloneNode(true);
    [].slice.call(gl.childNodes).forEach(function(c){if(c.nodeType!==1||(c.tagName.toLowerCase()!=="defs"&&!(c.getAttribute("class")||"").match(/\bs4-breath\b/)))gl.removeChild(c);});
    var gc=gl.querySelector(".s4-breath");if(gc){gc.removeAttribute("class");gl.setAttribute("class",(gl.getAttribute("class")||"")+" isl-gc isl-gc-off");own(gl,"g");back.parentNode.appendChild(gl);P.glow.hosts=[gl];P.glow.gl=gl;}
    else P.glow.el=null;}
  PARTS.forEach(function(p){P[p.k].hosts.forEach(function(h){watchHost(h,P[p.k]);});});
  return st;}
function shadowsBuild(q){var star=q.svg;q.shadows.forEach(function(v){if(v.parentNode)v.parentNode.removeChild(v);});q.shadows=[];
  var was=star.classList.contains("isl-gcb");if(was)star.classList.remove("isl-gcb");var list=shadowsOf(star,q.filter);if(was)star.classList.add("isl-gcb");
  q.shadows=list.map(function(s){var v=shadowSvg(q.el,s);star.parentNode.appendChild(v);return v;});q.hosts=[star].concat(q.shadows);
  q.built=(star.parentNode&&star.parentNode.offsetWidth)>0;}   /* read on a hidden page (no size), its drop shadows are read again once it is shown */
function reshadow(q){var t=q.M.length?q.M[0].currentTime:null,A=q.A;shadowsBuild(q);if(A){carry(q,A);if(t!=null)q.M.forEach(function(m){m.currentTime=t;});}}
function dress(q){if(q.dressed)return;q.dressed=true;
  if(q.p.k==="star"){shadowsBuild(q);var cn=q.filter?q.filter.querySelector("feMergeNode[in='cast']"):null;if(cn){q.cn=cn;q.cnp=cn.parentNode;q.cnx=cn.nextSibling;cn.parentNode.removeChild(cn);}q.svg.classList.add("isl-gcb");}
  if(q.p.k==="glow"&&q.gl){q.el.style.visibility="hidden";q.gl.classList.remove("isl-gc-off");}}
function undress(q){if(!q.dressed)return;q.dressed=false;
  if(q.p.k==="star"){q.shadows.forEach(function(v){if(v.parentNode)v.parentNode.removeChild(v);});q.shadows=[];q.hosts=[q.svg];
    if(q.cn){try{q.cnp.insertBefore(q.cn,q.cnx&&q.cnx.parentNode===q.cnp?q.cnx:null);}catch(e){}q.cn=null;}q.svg.classList.remove("isl-gcb");}
  if(q.p.k==="glow"&&q.gl){q.el.style.visibility="";q.gl.classList.add("isl-gc-off");}}
/* its motion carried by its new hosts: the same keyframes, timing and easing, from where it stood */
function carry(q,A){drop(q,false);q.A=A;if(!A)return;var kf=keyframes(A.animationName,q.p.kind);if(!kf){q.A=null;return;}
  var tm=A.effect.getTiming(),ease=String(getComputedStyle(q.el).animationTimingFunction||"ease");ease=ease.indexOf("(")>=0&&ease.indexOf("(")<ease.indexOf(",")?ease.replace(/\),.*$/,")"):ease.split(",")[0].trim();
  var frames=kf.map(function(f){var o=Object.assign({},f);o.easing=ease;return o;}),ct=A.currentTime||0;q.dur=tm.duration;
  q.M=q.hosts.map(function(h){var m=ANIM.call(h,frames,{duration:tm.duration,delay:tm.delay||0,iterations:Infinity,direction:tm.direction||"normal",fill:tm.fill||"none",easing:"linear"});m.currentTime=ct;m.__gc=1;return m;});
  try{A.pause();A.currentTime=0;}catch(e){}A.__gcSrc=1;}
function drop(q,giveBack){var t=q.M.length?q.M[0].currentTime:null;q.M.forEach(function(m){try{m.cancel();}catch(e){}});q.M=[];
  if(giveBack&&q.A){try{if(t!=null)q.A.currentTime=t;q.A.play();}catch(e){}q.A.__gcSrc=0;q.A=null;}}
/* a flourish on a part's layer (a press): the part goes back to its own drawing while it plays */
function watchHost(h,q){if(h.__gcw)return;h.__gcw=1;
  h.animate=function(){if(q.st.on){q.fl++;if(q.fl===1){drop(q,true);undress(q);}}
    var a=ANIM.apply(h,arguments),done=false,end=function(){if(done)return;done=true;q.fl=Math.max(0,q.fl-1);if(!q.fl&&q.st.on&&ON){dress(q);check(q.st);}};
    try{a.finished.then(end,end);}catch(e){setTimeout(end,3000);}return a;};}
function check(st){if(!st.on)return;
  PARTS.forEach(function(p){var q=st.parts[p.k];if(!q.el||q.fl)return;if(!q.dressed)dress(q);
    if(p.k==="star"&&!q.built&&q.svg.parentNode&&q.svg.parentNode.offsetWidth>0)reshadow(q);var A=cssAnim(q.el);
    if(!A){if(q.M.length)drop(q,false);q.A=null;if(q.gl)q.gl.style.opacity=getComputedStyle(q.el).opacity;return;}
    if(q.gl)q.gl.style.opacity="";
    if(A!==q.A||A.playState==="running")carry(q,A);
    else if(A.effect.getTiming().duration!==q.dur&&q.M.length){var f=(q.M[0].currentTime%q.dur)/q.dur;carry(q,A);q.M.forEach(function(m){m.currentTime=f*q.dur;});}});}
/* Home's orbs (7.18): each orb's bands slide behind a round cut and a soft round mask inside its drawing (r261's oxsTurn). The cut and
   the mask go to a wrapper of their own (CSS clip-path and mask-image, read from the drawing: the circle, and the mask's gradient as
   alpha, its luminance), the bands to a drawing of their own slid by the graphics chip, the same steps. Only that plain case is taken:
   a circle cut, a mask of one circle filled with a gradient centred on it; anything else is left as it is. */
var DR=[];
function lum(c){var m=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(c||"").trim());if(!m)return /^white$/i.test(String(c).trim())?1:null;var h=m[1];if(h.length===3)h=h.replace(/./g,"$&$&");
  var r=parseInt(h.slice(0,2),16)/255,g=parseInt(h.slice(2,4),16)/255,b=parseInt(h.slice(4,6),16)/255;return .2125*r+.7154*g+.0721*b;}
function driftMake(d){var svg=d.ownerSVGElement,grp=d.parentNode;if(!svg||!grp||grp.nodeType!==1)return null;
  var id=function(a){return (/url\(#([^)]+)\)/.exec(grp.getAttribute(a)||"")||[])[1];},cp=id("clip-path")&&svg.querySelector("[id='"+id("clip-path")+"']"),mk=id("mask")&&svg.querySelector("[id='"+id("mask")+"']");
  if(!cp||!mk||cp.children.length!==1||mk.children.length!==1)return null;var cc=cp.children[0],mc=mk.children[0];
  if(cc.tagName.toLowerCase()!=="circle"||mc.tagName.toLowerCase()!=="circle")return null;
  var gid=(/url\(#([^)]+)\)/.exec(mc.getAttribute("fill")||"")||[])[1],gr=gid&&svg.querySelector("[id='"+gid+"']");if(!gr||gr.tagName.toLowerCase()!=="radialgradient")return null;
  if(gr.getAttribute("gradientUnits")==="userSpaceOnUse"||gr.getAttribute("fx")||gr.getAttribute("fy"))return null;
  var num=function(e,a,dflt){var v=e.getAttribute(a);return v==null||v===""?dflt:parseFloat(v);};
  if(num(gr,"cx",.5)!==.5||num(gr,"cy",.5)!==.5||num(gr,"r",.5)!==.5)return null;
  var C={x:num(cc,"cx",0),y:num(cc,"cy",0),r:num(cc,"r",0)},MC={x:num(mc,"cx",0),y:num(mc,"cy",0),r:num(mc,"r",0)};if(C.x!==MC.x||C.y!==MC.y||C.r!==MC.r||!C.r)return null;
  var vb=(svg.getAttribute("viewBox")||"").split(/[\s,]+/).map(parseFloat);if(vb.length!==4||vb[0]||vb[1]||vb[2]!==vb[3])return null;
  var stops=[];[].forEach.call(gr.querySelectorAll("stop"),function(st){var l=lum(st.getAttribute("stop-color")||"#000"),o=num(st,"stop-opacity",1),off=num(st,"offset",0);if(l==null)stops=null;if(stops)stops.push([off,l*o]);});
  if(!stops||!stops.length)return null;
  var V=vb[2],pc=function(v){return (v/V*100).toFixed(4)+"%";},grad="radial-gradient(ellipse "+pc(C.r)+" "+pc(C.r)+" at "+pc(C.x)+" "+pc(C.y)+","+stops.map(function(s){return "rgba(0,0,0,"+s[1].toFixed(4)+") "+(s[0]*100).toFixed(2)+"%";}).join(",")+")";
  var wrap=D.createElement("span");wrap.className="isl-gc-orb";wrap.setAttribute("aria-hidden","true");
  wrap.style.cssText="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;clip-path:circle("+pc(C.r)+" at "+pc(C.x)+" "+pc(C.y)+");-webkit-clip-path:circle("+pc(C.r)+" at "+pc(C.x)+" "+pc(C.y)+");-webkit-mask-image:"+grad+";mask-image:"+grad;
  var inner=svg.cloneNode(true);inner.removeAttribute("class");inner.style.cssText="position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;display:block";
  var ig=inner.querySelector("g[clip-path]"),idr=inner.querySelector(".oxo-drift");if(!ig||!idr)return null;ig.removeAttribute("clip-path");ig.removeAttribute("mask");idr.removeAttribute("class");own(inner,"o");
  wrap.appendChild(inner);return {d:d,svg:svg,wrap:inner&&wrap,inner:inner,V:V,A:null,M:null,on:false};}
function driftFits(o){try{var b=o.svg.parentNode,cs=getComputedStyle(o.svg);return b&&b.offsetWidth>0&&Math.abs(parseFloat(cs.width)-b.offsetWidth)<1.5&&Math.abs(parseFloat(cs.height)-b.offsetHeight)<1.5&&cs.position==="absolute"&&parseFloat(cs.left)===0&&parseFloat(cs.top)===0;}catch(e){return false;}}
function driftCheck(o){var A=cssAnim(o.d);
  if(!A){if(o.M){try{o.M.cancel();}catch(e){}o.M=null;}o.A=null;return;}
  if(!o.on){if(!driftFits(o))return;o.svg.after(o.wrap);o.wrap.style.opacity=getComputedStyle(o.svg).opacity;o.svg.style.visibility="hidden";o.on=true;}
  if(A===o.A&&A.playState!=="running"&&o.M&&A.effect.getTiming().duration===o.dur)return;
  var kf=keyframes(A.animationName,"x");if(!kf){driftOff(o);return;}
  var tm=A.effect.getTiming(),ease=String(getComputedStyle(o.d).animationTimingFunction||"linear"),ct=o.M?o.M.currentTime:(A.currentTime||0);
  if(A!==o.A||A.playState==="running")ct=A.currentTime||0;else if(o.M&&o.dur)ct=(o.M.currentTime%o.dur)/o.dur*tm.duration;
  if(o.M){try{o.M.cancel();}catch(e){}}
  var frames=kf.map(function(f){return {offset:f.offset,translate:(f.x/o.V*100).toFixed(4)+"% 0",easing:ease};});
  o.M=ANIM.call(o.inner,frames,{duration:tm.duration,delay:tm.delay||0,iterations:Infinity,direction:tm.direction||"normal",fill:tm.fill||"none",easing:"linear"});o.M.currentTime=ct;o.M.__gc=1;
  o.A=A;o.dur=tm.duration;try{A.pause();A.currentTime=0;}catch(e){}A.__gcSrc=1;}
function driftOff(o){var t=o.M?o.M.currentTime:null;if(o.M){try{o.M.cancel();}catch(e){}o.M=null;}if(o.on){if(o.wrap.parentNode)o.wrap.parentNode.removeChild(o.wrap);o.svg.style.visibility="";o.on=false;}
  if(o.A){try{if(t!=null)o.A.currentTime=t;o.A.play();}catch(e){}o.A.__gcSrc=0;o.A=null;}}
function drifts(){DR=DR.filter(function(o){if(o.svg.isConnected)return true;driftOff(o);o.d.__gc=null;return false;});
  [].forEach.call(D.querySelectorAll("svg .oxo-drift"),function(d){if(d.__gc)return;var o=driftMake(d);d.__gc=o||1;if(o)DR.push(o);});DR.forEach(driftCheck);}
function apply(w){if(!w||w.__gc||!ON)return;var st=make(w);if(!st)return;st.on=true;w.__gc=st;ALL.push(st);check(st);}
function release(st){st.on=false;PARTS.forEach(function(p){var q=st.parts[p.k];if(!q.el)return;drop(q,true);undress(q);});}
/* letting go of every seal (tests): each as r104 made it, its parts moving on from where they stand */
function off(){ON=false;ALL.forEach(release);DR.forEach(driftOff);}
function start(){if(!ON)return;ALL=ALL.filter(function(st){if(st.w.isConnected)return true;release(st);st.w.__gc=null;return false;});
  [].forEach.call(D.querySelectorAll(".isl"),function(w){if(!w.__gc)apply(w);});ALL.forEach(check);drifts();}
function theme(){ALL.forEach(function(st){var q=st.parts.star;if(st.on&&q.dressed&&!q.fl)reshadow(q);});}
start();[300,1500,4000,9000].forEach(function(ms){setTimeout(start,ms);});setInterval(start,3000);
try{new MutationObserver(function(ms){var th=ms.some(function(m){return m.attributeName==="data-theme";});setTimeout(function(){if(th)theme();start();},40);}).observe(D.body,{attributes:true,attributeFilter:["data-motion","data-theme","class"]});}catch(e){}
/* a part's own animation started or stopped (a head turned on or off, a page shown or hidden): taken in hand at once, so a part never
   turns twice over */
["animationstart","animationcancel"].forEach(function(t){D.addEventListener(t,function(e){var x=e.target;try{if(x&&x.ownerSVGElement&&x.closest&&(x.closest(".isl")||x.classList.contains("oxo-drift")))setTimeout(start,0);}catch(_){}},true);});
try{var mq=W.matchMedia("(prefers-reduced-motion: reduce)");if(mq.addEventListener)mq.addEventListener("change",start);else if(mq.addListener)mq.addListener(start);}catch(e){}
var og=W.go;if(typeof og==="function"&&!og.__r306){var g=function(){var r=og.apply(this,arguments);try{setTimeout(start,80);setTimeout(start,1300);}catch(x){}return r;};
  try{Object.keys(og).forEach(function(k){g[k]=og[k];});}catch(x){}g.__r306=1;W.go=g;}
W.IngSealGC={on:function(){if(ON)return;ON=true;ALL.forEach(function(st){st.on=true;check(st);});start();},off:off,
  drifts:function(){return DR.map(function(o){return {on:o.on,moving:!!o.M,name:o.A&&o.A.animationName,t:o.M?Math.round(o.M.currentTime):null};});},
  state:function(sel){var st=null;ALL.forEach(function(s){if(!st&&s.w.matches&&s.w.matches(sel||"#brandSealBtn .isl"))st=s;});if(!st)return {on:ON,applied:false,seals:ALL.length};
    var o={on:ON,applied:st.on,seals:ALL.length};PARTS.forEach(function(p){var q=st.parts[p.k];o[p.k]={moving:q.M.length,name:q.A&&q.A.animationName,t:q.M[0]?Math.round(q.M[0].currentTime):null,flourish:q.fl};});return o;}};
try{window.__ingParts["p306"]="running";}catch(_){}
})();
</script>
