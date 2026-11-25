<style id="r392-css">
/* ============ R392 · MEMORY'S HEAD: THE CONSTELLATION MIND (Ingenium 7.90, 25 November 2026) ============
   Her choice (25 November 2026), of the designs: "I choose Design B - The Constellation mind design and animation, please refine and
   elevate the design". Its preview: https://claude.ai/artifact/Kj1C1N9NmDhu3NJ3RtTLp7 (its drawing is reused here as it stands).
   Above What Ingenium knows (r390), in Settings, Your data, Memory, a head as Ingenium's pages have: the words on the left; on the right
   the mind as a constellation, each point a twinkling star and its folds faint lines of light, under a dawn sky by day and Vesta's
   northern lights by night. Her apps are its brightest stars, soft and twinkling in their own colours as Adamas's and Vesta's stars are
   (no logo, no card, no ray, no flash), named in plain words; a star with facts waiting is ringed by a faint second glow. The links are
   real: Ingenium to every app, and an app to another when one's facts name the other. Press a star: its links light and its facts open
   below. Refined from the preview: names never sit on one another; the stars nearer stand larger and clearer, those behind fade.
   Light on her devices (her rule of 25 November): it draws only while it is on screen and Ingenium is in use, at most 30 frames a
   second at a lighter resolution (r391), and holds still 30 seconds after she last touched it; Minimal motion holds it still. */
#knHead{position:relative;min-height:400px;border-radius:28px;overflow:hidden;margin:0 0 16px;isolation:isolate;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 3px 0 rgba(96,62,150,.14),0 18px 40px rgba(60,34,110,.16)}
#knHead canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab}
#knHead .kh-fade{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(236,226,250,.94) 0%,rgba(236,226,250,.66) 30%,rgba(236,226,250,0) 52%)}
body[data-theme="night"] #knHead .kh-fade{background:linear-gradient(90deg,rgba(17,11,32,.95) 0%,rgba(17,11,32,.6) 30%,rgba(17,11,32,0) 52%)}
#knHead .kh-words{position:relative;z-index:2;padding:28px clamp(18px,3vw,34px);display:grid;gap:10px;max-width:min(520px,50%);pointer-events:none}
#knHead .kh-words *{pointer-events:auto}
#knHead .kh-eye{font:600 11px/1 var(--sans,system-ui,sans-serif);letter-spacing:.24em;text-transform:uppercase;color:var(--gold,#a87a2c)}
#knHead h2{margin:0;font:600 clamp(30px,3.4vw,40px)/1.05 var(--display,"Cormorant Garamond",Georgia,serif);color:var(--ink-1)}
#knHead p{margin:0;color:var(--ink-2);font-size:14px;line-height:1.55}
#knHead .kh-keys{display:flex;flex-wrap:wrap;gap:10px}
#knHead .kh-say{position:absolute;right:22px;bottom:16px;z-index:2;text-align:right;pointer-events:none;font:600 12px/1.4 var(--sans,system-ui,sans-serif);color:var(--ink-3)}
@media (max-width:860px){#knHead{min-height:560px}#knHead .kh-words{max-width:none}#knHead .kh-fade{background:linear-gradient(180deg,rgba(236,226,250,.95) 0%,rgba(236,226,250,.7) 42%,rgba(236,226,250,0) 64%)}
  body[data-theme="night"] #knHead .kh-fade{background:linear-gradient(180deg,rgba(17,11,32,.95) 0%,rgba(17,11,32,.65) 42%,rgba(17,11,32,0) 64%)}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p392"]="started";}catch(_){}
(function r392(){"use strict";
if(window.IngMindHead)return;var W=window,D=document;
function night(){return D.body.getAttribute("data-theme")==="night";}
function still(){try{return D.body.getAttribute("data-motion")==="minimal"||matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
function rgba(hex,a){var n=parseInt(hex.slice(1),16);return "rgba("+(n>>16)+","+((n>>8)&255)+","+(n&255)+","+a+")";}
/* each app's colour: soft, by its place among her folders (no app is named here) */
var PAL=[["#7a52c7","#d2b8ff"],["#5c9bd6","#a9d0f5"],["#3c8c86","#8fdcd3"],["#4a63a6","#aab9ef"],["#b38a4e","#efd29e"],["#6f79dc","#b7bdff"],["#b0578f","#f0b3d8"],["#5d8a4e","#b9e3a6"]];
function shape(x,y,z){var fold=1+0.07*Math.sin(9*Math.atan2(y,z)+4*x)*Math.sin(7*y+3*z+2)+0.03*Math.sin(17*z+5*y);if(y<0.05&&Math.abs(x)>0.45&&z>-0.3)fold*=1+0.12*(Math.abs(x)-0.45)*(0.05-y)*2.2;
  var px=x*0.92*fold+(x>0?0.035:-0.035),py=y*0.78*fold,pz=z*1.18*fold;if(py<-0.36)py=-0.36+(py+0.36)*0.45;return [px,py+0.08,pz];}
function cloud(n,seed){var P=[],g=Math.PI*(3-Math.sqrt(5));for(var i=0;i<n;i++){var y=1-(i/(n-1))*2,r=Math.sqrt(1-y*y),t=g*i+seed;if(Math.abs(Math.cos(t)*r)<0.05)continue;P.push({p:shape(Math.cos(t)*r,y,Math.sin(t)*r),h:Math.random(),ph:Math.random()*6.28});}
  for(var j=0;j<n*0.13;j++){var a=Math.random()*6.28,b=Math.acos(2*Math.random()-1),st=1+0.05*Math.sin(28*Math.cos(b));P.push({p:[Math.sin(b)*Math.cos(a)*0.5*st,-0.42+Math.cos(b)*0.2*st,-0.72+Math.sin(b)*Math.sin(a)*0.34*st],h:Math.random(),ph:Math.random()*6.28});}
  for(var s=0;s<n*0.03;s++){var hh=Math.random(),an=Math.random()*6.28;P.push({p:[Math.cos(an)*0.1,-0.35-hh*0.55,-0.32+Math.sin(an)*0.1-hh*0.1],h:Math.random(),ph:Math.random()*6.28});}return P;}

function star(g,x,y,s,hex,t,ph,nt,sel,hov){var br=still?0.9:0.74+0.26*Math.sin(t*0.0011+ph),sp=still?0:Math.pow(Math.max(Math.sin(t*0.0007+ph*1.7),0),8),b=Math.min(1.2,br+0.3*sp)*(sel?1.12:1)*(hov?1.08:1);
  g.save();g.globalCompositeOperation=nt?"lighter":"source-over";
  var h=g.createRadialGradient(x,y,0,x,y,s*2.6);h.addColorStop(0,rgba(hex,(nt?0.5:0.55)*b));h.addColorStop(0.4,rgba(hex,(nt?0.18:0.22)*b));h.addColorStop(1,rgba(hex,0));g.fillStyle=h;g.beginPath();g.arc(x,y,s*2.6,0,6.29);g.fill();
  var c=g.createRadialGradient(x,y,0,x,y,s);c.addColorStop(0,"rgba(255,255,255,"+Math.min(1,0.95*b)+")");c.addColorStop(0.35,rgba(hex,Math.min(1,0.95*b)));c.addColorStop(1,rgba(hex,0));g.fillStyle=c;g.beginPath();g.arc(x,y,s,0,6.29);g.fill();
  var cr=0.2*b;["h","v"].forEach(function(o){var L=s*2.4,w=s*0.16,gg=o==="h"?g.createLinearGradient(x-L,y,x+L,y):g.createLinearGradient(x,y-L,x,y+L);gg.addColorStop(0,"rgba(255,255,255,0)");gg.addColorStop(0.5,"rgba(255,255,255,"+cr+")");gg.addColorStop(1,"rgba(255,255,255,0)");
    g.fillStyle=gg;g.beginPath();if(o==="h")g.ellipse(x,y,L,w,0,0,6.29);else g.ellipse(x,y,w,L,0,0,6.29);g.fill();});
  g.restore();}

function sparkles(n){var S=[];var T=["255,255,255","219,209,255","204,229,255","255,219,242"];for(var i=0;i<n;i++)S.push({x:Math.random(),y:Math.random(),r:0.6+Math.random()*1.4,ph:Math.random()*6.28,sw:0.4+Math.random()*1.2,c:T[i%4]});return S;}

function cloud(n,seed){var P=[],g=Math.PI*(3-Math.sqrt(5));for(var i=0;i<n;i++){var y=1-(i/(n-1))*2,r=Math.sqrt(1-y*y),t=g*i+seed;if(Math.abs(Math.cos(t)*r)<0.05)continue;P.push({p:shape(Math.cos(t)*r,y,Math.sin(t)*r),h:Math.random(),ph:Math.random()*6.28});}
  for(var j=0;j<n*0.13;j++){var a=Math.random()*6.28,b=Math.acos(2*Math.random()-1),st=1+0.05*Math.sin(28*Math.cos(b));P.push({p:[Math.sin(b)*Math.cos(a)*0.5*st,-0.42+Math.cos(b)*0.2*st,-0.72+Math.sin(b)*Math.sin(a)*0.34*st],h:Math.random(),ph:Math.random()*6.28});}
  for(var s=0;s<n*0.03;s++){var hh=Math.random(),an=Math.random()*6.28;P.push({p:[Math.cos(an)*0.1,-0.35-hh*0.55,-0.32+Math.sin(an)*0.1-hh*0.1],h:Math.random(),ph:Math.random()*6.28});}return P;}
function surf(d){var l=Math.hypot(d[0],d[1],d[2]),q=shape(d[0]/l,d[1]/l,d[2]/l);return [q[0]*1.05,q[1]*1.05,q[2]*1.05];}
/* the apps' places on the mind: spread over its surface by the golden angle, the first (Ingenium's own folder, when it is there) at the front */
function places(n){var out=[],g=Math.PI*(3-Math.sqrt(5));for(var i=0;i<n;i++){var y=0.75-1.2*(i+0.5)/Math.max(1,n),r=Math.sqrt(Math.max(0,1-y*y)),t=g*i+0.4;out.push(surf([Math.cos(t)*r,y,Math.sin(t)*r+0.25]));}return out;}
var SIG="",P=null,PAIRS=[],AIR=null,cv=null,g=null,host=null,W0=0,H0=0,ang=0.6,tilt=-0.16,drag=null,hov=null,sel=null,raf=0,lastDraw=0,lastUse=0,vis=false,hits=[],model=null,RATIO=1;
function apps(){try{return W.IngFolders&&IngFolders.folders?IngFolders.folders():[];}catch(e){return [];}}
function build(){var A=apps();if(!A.length)return null;var K=W.IngKnow?IngKnow:null,pl=places(A.length);
  var nodes=A.map(function(p,i){var ab=K?K.appKey(p.name):"",F=K?K.of(ab):[];return {p:p,name:p.name,ab:ab,pos:pl[i],c:PAL[i%PAL.length],ph:i*1.13,wait:F.filter(function(f){return f.st==="waiting";}).length,facts:F};});
  var hub=nodes.filter(function(n){return /^ingenium$/i.test(n.name);})[0]||null,links=[];
  nodes.forEach(function(n){if(hub&&n!==hub)links.push([hub,n]);nodes.forEach(function(m){if(m===n||m===hub||n===hub)return;var nm=m.name.toLowerCase();if(n.facts.some(function(f){return String(f.t).toLowerCase().indexOf(nm)>=0;})&&!links.some(function(L){return (L[0]===n&&L[1]===m)||(L[0]===m&&L[1]===n);}))links.push([n,m]);});});
  if(!hub)for(var i=1;i<nodes.length;i++)if(!links.some(function(L){return L[0]===nodes[i]||L[1]===nodes[i];}))links.push([nodes[i-1],nodes[i]]);
  return {nodes:nodes,links:links};}
function size(){if(!cv)return;var r=cv.getBoundingClientRect();W0=r.width;H0=r.height;RATIO=Math.min(1.25,W.devicePixelRatio||1);cv.width=Math.max(1,Math.round(W0*RATIO));cv.height=Math.max(1,Math.round(H0*RATIO));g.setTransform(RATIO,0,0,RATIO,0,0);}
function cam(){var wide=W0>860;return {cx:wide?W0*0.7:W0*0.5,cy:wide?H0*0.52:H0*0.68,sc:Math.min(wide?W0*0.24:W0*0.36,H0*0.42)};}
function proj(p,C){var ca=Math.cos(ang),sa=Math.sin(ang),x=p[0]*ca+p[2]*sa,z=-p[0]*sa+p[2]*ca,y=p[1];var ct=Math.cos(tilt),st=Math.sin(tilt),y2=y*ct-z*st,z2=y*st+z*ct;var f=3.4/(3.4-z2);return {x:C.cx+x*C.sc*f,y:C.cy-y2*C.sc*f,z:z2,k:f};}
function arc(a,b,t){var m=[(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2],l=Math.hypot(m[0],m[1],m[2])||1,lf=1.08/l,c=[m[0]*lf,m[1]*lf,m[2]*lf],u=1-t;return [u*u*a[0]+2*u*t*c[0]+t*t*b[0],u*u*a[1]+2*u*t*c[1]+t*t*b[1],u*u*a[2]+2*u*t*c[2]+t*t*b[2]];}
function draw(T){if(!g||!W0)return;var C=cam(),nt=night(),st=still();g.clearRect(0,0,W0,H0);
  var sky=g.createLinearGradient(0,0,0,H0);if(nt){sky.addColorStop(0,"#120c22");sky.addColorStop(1,"#2a1d45");}else{sky.addColorStop(0,"#e9def9");sky.addColorStop(1,"#f8eef6");}g.fillStyle=sky;g.fillRect(0,0,W0,H0);
  if(nt){g.save();g.globalCompositeOperation="lighter";[[0.5,"rgba(90,220,190,.11)"],[0.68,"rgba(160,110,255,.13)"]].forEach(function(A,i){var gx=W0*A[0]+(st?0:Math.sin(T*0.00025+i)*30),gr=g.createRadialGradient(gx,H0*0.2,10,gx,H0*0.2,W0*0.26);gr.addColorStop(0,A[1]);gr.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=gr;g.fillRect(0,0,W0,H0);});g.restore();}
  var glow=g.createRadialGradient(C.cx,C.cy,C.sc*0.1,C.cx,C.cy,C.sc*1.5);glow.addColorStop(0,nt?"rgba(150,110,240,.24)":"rgba(255,255,255,.7)");glow.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=glow;g.fillRect(0,0,W0,H0);
  g.save();if(nt)g.globalCompositeOperation="lighter";AIR.forEach(function(s){var tw=st?0.25:Math.pow(Math.max(Math.sin(T*0.0012*s.sw+s.ph),0),6);if(tw<0.02)return;var x=((s.x+ang*0.02)%1+1)%1*W0,y=s.y*H0,r=s.r*(1+tw);var gr=g.createRadialGradient(x,y,0,x,y,r*3);gr.addColorStop(0,"rgba("+s.c+","+(nt?0.9:0.7)*tw+")");gr.addColorStop(1,"rgba("+s.c+",0)");g.fillStyle=gr;g.beginPath();g.arc(x,y,r*3,0,6.29);g.fill();});g.restore();
  var pts=P.map(function(o){var q=proj(o.p,C);q.h=o.h;q.ph=o.ph;return q;});
  g.save();if(nt)g.globalCompositeOperation="lighter";g.lineWidth=0.7;PAIRS.forEach(function(pr){var a=pts[pr[0]],b=pts[pr[1]],al=Math.max(0.05,Math.min(0.5,(a.z+1.2)/2.6));g.strokeStyle=nt?"rgba(200,180,255,"+al*0.5+")":"rgba(106,63,181,"+al*0.38+")";g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();});
  pts.forEach(function(q){var al=Math.max(0.06,Math.min(1,(q.z+1.25)/2.4)),tw=st?0.8:0.55+0.45*Math.sin(T*0.0016*(0.8+q.h*3)+q.ph*7),r=(0.6+q.k*1.1)*tw;g.fillStyle=nt?"rgba(240,232,255,"+(al*0.85)+")":"rgba(90,60,160,"+(al*0.55)+")";g.beginPath();g.arc(q.x,q.y,r,0,6.29);g.fill();});g.restore();
  if(!model)return;var M=model;
  M.links.forEach(function(L,li){var on=sel&&(sel===L[0].ab||sel===L[1].ab);g.beginPath();for(var s=0;s<=28;s++){var q=proj(arc(L[0].pos,L[1].pos,s/28),C);if(!s)g.moveTo(q.x,q.y);else g.lineTo(q.x,q.y);}
    g.lineWidth=on?1.5:0.85;g.strokeStyle=on?(nt?"rgba(205,185,255,.72)":"rgba(106,63,181,.55)"):(nt?"rgba(195,168,239,.2)":"rgba(106,63,181,.14)");g.stroke();
    if(on||li%2===0){var t=st?0.5:((T*(on?0.0004:0.00018)+li*0.13)%1),q3=proj(arc(L[0].pos,L[1].pos,t),C),gr=g.createRadialGradient(q3.x,q3.y,0,q3.x,q3.y,6*q3.k);gr.addColorStop(0,nt?"rgba(255,245,255,.8)":"rgba(255,255,255,.88)");gr.addColorStop(0.45,nt?"rgba(195,168,239,.45)":"rgba(150,110,225,.4)");gr.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=gr;g.beginPath();g.arc(q3.x,q3.y,6*q3.k,0,6.29);g.fill();}});
  /* the apps' stars, back to front; names placed so that none sits on another */
  hits=[];var order=M.nodes.map(function(n){return {n:n,q:proj(n.pos,C)};}).sort(function(a,b){return a.q.z-b.q.z;}),placed=[];
  order.slice().reverse().forEach(function(o){var q=o.q,s=(nt?9:11)*q.k,y=q.y+s*1.5+2,x=q.x,w=Math.max(40,o.n.name.length*7.2*Math.min(1.2,q.k));for(var tries=0;tries<4;tries++){var clash=placed.some(function(b){return Math.abs(b.x-x)<(b.w+w)/2+4&&Math.abs(b.y-y)<17;});if(!clash)break;y=tries%2?q.y-s*1.5-18:y+16;}placed.push({x:x,y:y,w:w});o.ly=y;});
  order.forEach(function(o){var q=o.q,back=q.z<0,s=(nt?9:11)*q.k,n=o.n;g.save();g.globalAlpha=back?0.5:1;
    if(n.wait){var rr=s*3.2,gw=g.createRadialGradient(q.x,q.y,s*1.8,q.x,q.y,rr);gw.addColorStop(0,"rgba(232,170,80,0)");gw.addColorStop(0.7,nt?"rgba(240,190,110,.22)":"rgba(220,150,60,.18)");gw.addColorStop(1,"rgba(232,170,80,0)");g.fillStyle=gw;g.beginPath();g.arc(q.x,q.y,rr,0,6.29);g.fill();}
    star(g,q.x,q.y,s,n.c[nt?1:0],T,n.ph,nt,sel===n.ab,hov===n.ab);
    g.font="600 "+Math.round(14*Math.min(1.2,q.k))+'px "Cormorant Garamond",Georgia,serif';g.textAlign="center";g.textBaseline="top";g.shadowColor=nt?"rgba(18,12,34,.9)":"rgba(250,246,255,.95)";g.shadowBlur=6;
    g.fillStyle=nt?"#efe9f6":"#2a2140";g.fillText(n.name,q.x,o.ly);g.restore();hits.push({ab:n.ab,x:q.x,y:q.y,r:Math.max(14,s*2)});});}
function live(){return vis&&!D.hidden&&!still()&&performance.now()-lastUse<30000&&(!W.IngPace||!IngPace.idle());}
function loop(now){raf=0;if(!live()){draw(now);return;}if(now-lastDraw>=31){lastDraw=now;if(!drag)ang+=0.0032;draw(now);}raf=requestAnimationFrame(loop);}
function wake(){lastUse=performance.now();if(!raf)raf=requestAnimationFrame(loop);}
function hitAt(x,y){for(var i=hits.length-1;i>=0;i--){var h=hits[i];if(Math.hypot(h.x-x,h.y-y)<h.r)return h.ab;}return null;}
function chips(){var A=apps(),K=W.IngKnow?IngKnow.store():{facts:[]},kept=(K.facts||[]).filter(function(f){return f.st==="kept";}).length,wt=(K.facts||[]).filter(function(f){return f.st==="waiting";}).length;
  var c=host&&host.querySelector(".kh-chips");if(!c)return;c.innerHTML="";var a=D.createElement("span");a.className="kn-chip";a.textContent=A.length+" app"+(A.length===1?"":"s")+" · "+kept+" fact"+(kept===1?"":"s");c.appendChild(a);var b=D.createElement("span");b.className="kn-chip"+(wt?" warn":"");b.textContent=wt?wt+" wait for you":"Nothing waits";c.appendChild(b);}
function mount(){var room=D.getElementById("knRoom");if(!room||!room.parentNode)return false;host=D.getElementById("knHead");
  if(!host){host=D.createElement("section");host.id="knHead";host.setAttribute("aria-label","What Ingenium knows, as a constellation");
    host.innerHTML='<div class="kh-fade"></div><div class="kh-words"><div class="kh-eye">Memory</div><h2>What Ingenium knows</h2><p>Your apps are the brightest stars of the mind, each in its own colour; the lines of light between them are what links them. Press a star to read what Ingenium knows about it.</p><div class="kn-chips kh-chips"></div><div class="kh-keys"></div></div><div class="kh-say">Drag to turn it; press a star</div>';
    var keys=host.querySelector(".kh-keys");[["Waiting for you",function(){var w=D.querySelector("#knRoom .kn-row.wait");if(w)w.scrollIntoView({block:"center",behavior:"smooth"});},true],["Find a fact",function(){var f=D.getElementById("knFind");if(f){f.scrollIntoView({block:"center",behavior:"smooth"});setTimeout(function(){try{f.focus({preventScroll:true});}catch(e){}},400);}}]].forEach(function(k){var b=D.createElement("button");b.type="button";b.className="btn small"+(k[2]?" primary":"");b.textContent=k[0];b.onclick=k[1];keys.appendChild(b);});
    cv=D.createElement("canvas");cv.setAttribute("aria-hidden","true");host.insertBefore(cv,host.firstChild);g=cv.getContext("2d");
    cv.addEventListener("pointerdown",function(e){wake();drag={x:e.clientX,a:ang,moved:false};try{cv.setPointerCapture(e.pointerId);}catch(_){}});
    cv.addEventListener("pointermove",function(e){wake();var r=cv.getBoundingClientRect();if(drag){var dx=e.clientX-drag.x;if(Math.abs(dx)>3)drag.moved=true;if(drag.moved)ang=drag.a+dx*0.008;}var h=hitAt(e.clientX-r.left,e.clientY-r.top);if(h!==hov){hov=h;cv.style.cursor=h?"pointer":"";}});
    cv.addEventListener("pointerup",function(e){var r=cv.getBoundingClientRect(),moved=drag&&drag.moved;drag=null;if(moved)return;var h=hitAt(e.clientX-r.left,e.clientY-r.top);if(h){sel=h;try{IngKnow.open(h);}catch(_){}}wake();});
    cv.addEventListener("pointerleave",function(){hov=null;});
    try{new ResizeObserver(function(){size();draw(performance.now());}).observe(host);}catch(e){}
    try{new IntersectionObserver(function(es){vis=es[0].isIntersecting&&es[0].intersectionRatio>0.3;if(vis)wake();},{threshold:[0,0.3,0.6,1]}).observe(host);}catch(e){vis=true;}
    D.addEventListener("visibilitychange",function(){if(!D.hidden&&vis)wake();});
    try{new MutationObserver(function(){draw(performance.now());}).observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}}
  if(host.nextSibling!==room)room.parentNode.insertBefore(host,room);
  if(!P){P=cloud(900,1.3);AIR=sparkles(60);for(var i=0;i<P.length;i++){var best=[];for(var j=0;j<P.length;j++){if(i===j)continue;var a=P[i].p,b=P[j].p;best.push([(a[0]-b[0])*(a[0]-b[0])+(a[1]-b[1])*(a[1]-b[1])+(a[2]-b[2])*(a[2]-b[2]),j]);}best.sort(function(x,y){return x[0]-y[0];});for(var q=0;q<2;q++)if(i<best[q][1]&&best[q][0]<0.03)PAIRS.push([i,best[q][1]]);}}
  model=build();chips();size();draw(performance.now());wake();return true;}
(function start(){var n=0;(function w(){if(W.__ingReady===true){setInterval(function(){try{var r=D.getElementById("knRoom");if(r&&(!host||host.nextSibling!==r||!host.isConnected))mount();else if(host&&host.isConnected){var m2=build(),sg=m2?m2.nodes.map(function(n){return n.name+":"+n.wait;}).join("|")+"#"+m2.links.length:"";if(sg!==SIG){SIG=sg;model=m2;chips();if(!raf)draw(performance.now());}}}catch(e){}},2000);return;}if(++n<400)setTimeout(w,500);})();})();
W.IngMindHead={mount:mount,model:function(){return model;},live:live,wake:wake,frames:function(){return lastDraw;}};
})();
;try{window.__ingParts["p392"]="running";}catch(_){}
</script>
