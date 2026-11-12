<style id="r289-css">
/* ============ R289 · BUILD'S HEAD: THE PRISM OF YOUR PAGE (Ingenium 6.93, 12 November 2026; held for the owner's live preview) ============
   The owner's answer (12 November 2026) on what the Build page should get: "A 3D head like the rest". On its first picture: "I do however
   like the Build page preview. I want to see it as a live interactive preview with the animation and the 3D visuals before I fully
   approve." On the first live preview: "I don't like the animation of the prism, its all very basic. I want real movement and animation
   on all of the pages. For the prism, I want the light passing through the prism, I want to see that beautiful 3D visual rendering of
   that." So the light is drawn as light, and bent as glass bends it:
   - Build's head (modules/r284.js IngHeads): its title and words, Run your page (the page's own Run key, pressed for you) and Load a
     sample, and a line: your code on one side, your page running on the other.
   - The prism: a three-sided block of glass standing on a turned plinth, turning a little to each side. A beam of white light, your
     code, comes in from the left: pulses of light run along it and motes drift in it. It bends where it enters the glass (Snell's law,
     at the face as it stands at that moment), crosses the glass glowing, and bends again where it leaves: each colour by its own
     amount, so it leaves as a fan of Ingenium's violets, your page, whose pulses run outward. As the prism turns, the faces turn, and
     the fan swings with them. Light pools on the plinth under the glass, a glint crosses its faces, and a faint reflection runs back
     inside. Pointed at, the prism comes to rest facing you; pressed, it runs your page and sends a bright pulse through.
   - Beside it, how many lines your code has and whether the page runs as you type. Minimal motion and the system's reduced motion keep
     it still, drawn once. It is drawn only while it can be seen. */
#page-build.hd-on > .hd-head .hd-tag{right:6px;top:30px;max-width:200px}
#page-build.hd-on .hd-hit{left:150px;top:112px;width:220px;height:230px;border-radius:24px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p289"]="started";}catch(_){}
/* R289 · Build's head, the prism of your page: see the note at the top of its styles */
(function(){"use strict";
if(window.__r289)return;window.__r289=1;
var D=document,W=window,TAU=Math.PI*2,H=null;
var B={C:null,cv:null,g:null,t:0,sw:0,amp:1,hold:false,hover:false,down:false,lift:0,loop:null,W:520,H:460,flare:0,motes:null};
var G={cx:258,cy:262,e:10*Math.PI/180,F:1200};
function $(id){return D.getElementById(id);}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function proj(x,y,z,turn){var c=Math.cos(turn),s=Math.sin(turn),X=x*c+z*s,Z=-x*s+z*c,ce=Math.cos(G.e),se=Math.sin(G.e),Y=y*ce+Z*se,Z2=-y*se+Z*ce,k=G.F/(G.F-Z2);return [G.cx+X*k,G.cy+Y*k,Z2,k];}
/* ---------- the plinth, drawn once for the Display ---------- */
var PL={sig:"",cv:null},PY=330;
function plinth(){var d=H.dpr(),n=H.night(),sig=d+"|"+(n?1:0);if(PL.sig===sig)return PL.cv;PL.sig=sig;var cv=PL.cv||D.createElement("canvas");cv.width=Math.round(B.W*d);cv.height=Math.round(B.H*d);
  var g=cv.getContext("2d");g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,B.W,B.H);var bx=G.cx,by=PY,rx=132,ry=rx*Math.sin(G.e)*1.35,th=22,i;
  H.cast(g,bx+8,by+th+ry*.7,rx*1.15,ry*1.7,n?.24:.16);
  var sg=g.createLinearGradient(bx-rx,0,bx+rx,0);if(n){sg.addColorStop(0,"#07050c");sg.addColorStop(.24,"#221a34");sg.addColorStop(.44,"#2f2647");sg.addColorStop(.72,"#18121f");sg.addColorStop(1,"#060409");}
  else{sg.addColorStop(0,"#9c8ac2");sg.addColorStop(.24,"#d9cfee");sg.addColorStop(.44,"#efe9f8");sg.addColorStop(.72,"#c6b8e3");sg.addColorStop(1,"#8f7cb9");}
  g.beginPath();g.ellipse(bx,by,rx,ry,0,0,Math.PI);g.lineTo(bx-rx,by+th);g.ellipse(bx,by+th,rx,ry,0,Math.PI,0,true);g.closePath();g.fillStyle=sg;g.fill();
  var vg=g.createLinearGradient(0,by,0,by+th+ry);vg.addColorStop(0,"rgba(255,255,255,0)");vg.addColorStop(1,n?"rgba(0,0,0,.45)":"rgba(70,48,130,.22)");g.fillStyle=vg;g.fill();
  var fg=g.createRadialGradient(bx-rx*.3,by-ry*.9,rx*.05,bx,by,rx);if(n){fg.addColorStop(0,"#352a50");fg.addColorStop(.6,"#211932");fg.addColorStop(1,"#18122a");}else{fg.addColorStop(0,"#ffffff");fg.addColorStop(.6,"#f1edf9");fg.addColorStop(1,"#e2daf1");}
  g.beginPath();g.ellipse(bx,by,rx,ry,0,0,TAU);g.fillStyle=fg;g.fill();
  g.save();g.beginPath();g.ellipse(bx,by,rx,ry,0,0,TAU);g.clip();g.lineWidth=.7;for(var f=.16;f<.9;f+=.026){g.beginPath();g.ellipse(bx,by,rx*f,ry*f,0,0,TAU);g.strokeStyle=n?"rgba(205,184,240,.04)":"rgba(90,64,150,.06)";g.stroke();}g.restore();
  for(i=0;i<96;i++){var u=i/96*TAU,lng=i%8===0;g.beginPath();g.moveTo(bx+Math.cos(u)*rx*(lng?.88:.91),by+Math.sin(u)*ry*(lng?.88:.91));g.lineTo(bx+Math.cos(u)*rx*.955,by+Math.sin(u)*ry*.955);
    g.strokeStyle=n?"rgba(205,184,240,"+(lng?.4:.22)+")":"rgba(84,60,140,"+(lng?.38:.2)+")";g.lineWidth=lng?1.1:.8;g.stroke();}
  g.beginPath();g.ellipse(bx,by,rx-.6,ry-.5,0,Math.PI*1.05,Math.PI*1.95);g.strokeStyle=n?"rgba(205,184,240,.2)":"#ffffff";g.lineWidth=1.2;g.stroke();
  g.beginPath();g.ellipse(bx,by+1.2,rx-.4,ry,0,.05,Math.PI-.05);g.strokeStyle=n?"rgba(205,184,240,.16)":"rgba(255,255,255,.9)";g.lineWidth=1;g.stroke();
  PL.cv=cv;return cv;}
/* ---------- light, bent as glass bends it ---------- */
var TRI=[[0,-136],[-110,58],[110,58]],DEPTH=46;
/* the fan's colours: white at the top to Ingenium's deepest violet, each with its own index of refraction (spread wider than glass's own few
   degrees, so the eye sees the fan) */
var SPEC=[["#ffffff",1.40],["#f1e8ff",1.43],["#ddc9ff",1.46],["#c3a3f8",1.49],["#a57fec",1.52],["#8a5fdb",1.55],["#6e44bd",1.58]];
function norm(v){var l=Math.hypot(v[0],v[1])||1;return [v[0]/l,v[1]/l];}
function dot(a,b){return a[0]*b[0]+a[1]*b[1];}
function refract(d,nOut,eta){/* d: the ray's direction; nOut: the face's normal on the side the ray comes from */var ci=-dot(nOut,d),k=1-eta*eta*(1-ci*ci);if(k<0)return null;var a=eta,bb=eta*ci-Math.sqrt(k);return norm([a*d[0]+bb*nOut[0],a*d[1]+bb*nOut[1]]);}
function hit(p,d,a,b){/* where the ray from p along d meets the segment a b, as a share along a b, or null */var ex=b[0]-a[0],ey=b[1]-a[1],den=d[0]*ey-d[1]*ex;if(Math.abs(den)<1e-6)return null;
  var t=((a[0]-p[0])*ey-(a[1]-p[1])*ex)/den,u=((a[0]-p[0])*d[1]-(a[1]-p[1])*d[0])/den;if(t<=0||u<0||u>1)return null;return {t:t,u:u,x:p[0]+d[0]*t,y:p[1]+d[1]*t};}
function outward(a,b,c){/* the normal of the face a b that points away from the third corner c */var nx=b[1]-a[1],ny=-(b[0]-a[0]),n=norm([nx,ny]),m=[(a[0]+b[0])/2-c[0],(a[1]+b[1])/2-c[1]];return dot(n,m)>0?n:[-n[0],-n[1]];}
function glow(g,x,y,r,col,a){var gg=g.createRadialGradient(x,y,0,x,y,r);gg.addColorStop(0,H.rgba(col,a));gg.addColorStop(1,H.rgba(col,0));g.fillStyle=gg;g.beginPath();g.arc(x,y,r,0,TAU);g.fill();}
function streak(g,x,y,dx,dy,len,w,col,a){/* a pulse of light: a short bright streak along its ray */g.save();g.translate(x,y);g.rotate(Math.atan2(dy,dx));var sg=g.createLinearGradient(-len,0,len*.4,0);
  sg.addColorStop(0,H.rgba(col,0));sg.addColorStop(.7,H.rgba(col,a));sg.addColorStop(1,H.rgba(col,0));g.fillStyle=sg;g.beginPath();g.ellipse(-len*.3,0,len*.7,w,0,0,TAU);g.fill();g.restore();}
function face(g,P,fill){g.beginPath();g.moveTo(P[0][0],P[0][1]);for(var i=1;i<P.length;i++)g.lineTo(P[i][0],P[i][1]);g.closePath();g.fillStyle=fill;g.fill();}
function edge(g,a,b,col,w){g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.strokeStyle=col;g.lineWidth=w;g.lineCap="round";g.stroke();}
function draw(){var cv=B.cv;if(!cv)return;var d=H.dpr(),Wd=Math.round(B.W*d),Hd=Math.round(B.H*d);if(cv.width!==Wd||cv.height!==Hd){cv.width=Wd;cv.height=Hd;}
  var g=B.g||(B.g=cv.getContext("2d"));g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,B.W,B.H);
  var n=H.night(),turn=B.sw,T=B.t/1000,lift=B.lift*5-(B.down?2:0),boost=1+B.flare*.9,add=n?"lighter":"source-over";
  g.drawImage(plinth(),0,0,B.W,B.H);
  function V(i,z){return proj(TRI[i][0],TRI[i][1]-lift,z,turn);}
  var F=[V(0,DEPTH),V(1,DEPTH),V(2,DEPTH)],K=[V(0,-DEPTH),V(1,-DEPTH),V(2,-DEPTH)],M=[V(0,0),V(1,0),V(2,0)];
  /* the light's path through the middle of the glass, as it stands now */
  var S=[G.cx-290,G.cy+70],entryU=.52,P1=[M[0][0]+(M[1][0]-M[0][0])*entryU,M[0][1]+(M[1][1]-M[0][1])*entryU],din=norm([P1[0]-S[0],P1[1]-S[1]]);
  var n1=outward(M[0],M[1],M[2]),n2=outward(M[0],M[2],M[1]),tin=refract(din,n1,1/1.5)||din;
  var h2=hit(P1,tin,M[0],M[2])||hit(P1,tin,M[1],M[2]),P2=h2?[h2.x,h2.y]:[M[2][0]-20,M[2][1]-60];
  var fan=SPEC.map(function(s){var o=refract(tin,[-n2[0],-n2[1]],s[1]);return o?{col:s[0],dir:o}:null;}).filter(Boolean);
  /* the fan opened wider about its middle colour, for the eye: each colour keeps its order and its side, and the whole still follows the glass */
  if(fan.length>2){var mid=Math.atan2(fan[Math.floor(fan.length/2)].dir[1],fan[Math.floor(fan.length/2)].dir[0]);fan.forEach(function(f){var a=Math.atan2(f.dir[1],f.dir[0]),dd=a-mid;
    while(dd>Math.PI)dd-=TAU;while(dd<-Math.PI)dd+=TAU;a=mid+dd*2.6;f.dir=[Math.cos(a),Math.sin(a)];});}
  /* the shadow of the glass, and the light it gathers onto the plinth */
  H.cast(g,G.cx+14,PY+4,124,16,n?.3:.14);
  g.save();g.globalCompositeOperation=add;var cx0=(M[1][0]+M[2][0])/2+18,shim=.75+.25*Math.sin(T*2.1);
  [["#a07aea",58,.22],["#d9c3ff",34,.26],["#ffffff",16,.32]].forEach(function(c){g.save();g.translate(cx0,PY+2);g.scale(1,.28);glow(g,0,0,c[1]*1.6,c[0],c[2]*shim*boost*(n?.9:.75));g.restore();});g.restore();
  /* the faces, far ones first */
  var faces=[{p:[F[0],F[1],F[2]],k:"tri"},{p:[K[0],K[2],K[1]],k:"tri"},{p:[F[0],K[0],K[1],F[1]],k:"left"},{p:[F[0],F[2],K[2],K[0]],k:"right"},{p:[F[1],K[1],K[2],F[2]],k:"floor"}];
  faces.forEach(function(f){f.z=f.p.reduce(function(s,q){return s+q[2];},0)/f.p.length;});faces.sort(function(a,b){return a.z-b.z;});
  var tint=n?{tri:"rgba(150,120,230,.16)",left:"rgba(190,165,255,.20)",right:"rgba(110,80,200,.24)",floor:"rgba(70,50,140,.32)"}:{tri:"rgba(206,190,248,.22)",left:"rgba(255,255,255,.36)",right:"rgba(170,140,235,.24)",floor:"rgba(120,90,200,.28)"};
  var half=3;faces.slice(0,half).forEach(function(f){face(g,f.p,tint[f.k]);});
  /* the white beam coming in: its glow, its core, pulses running along it and motes drifting in it */
  g.save();g.globalCompositeOperation=add;g.lineCap="round";
  var bl=Math.hypot(P1[0]-S[0],P1[1]-S[1]);
  var bg=g.createLinearGradient(S[0],S[1],P1[0],P1[1]);bg.addColorStop(0,"rgba(255,255,255,0)");bg.addColorStop(.3,n?"rgba(200,180,255,.20)":"rgba(120,86,210,.20)");bg.addColorStop(1,n?"rgba(220,205,255,.32)":"rgba(120,86,210,.34)");
  g.strokeStyle=bg;g.lineWidth=13;g.beginPath();g.moveTo(S[0],S[1]);g.lineTo(P1[0],P1[1]);g.stroke();
  var cg=g.createLinearGradient(S[0],S[1],P1[0],P1[1]);cg.addColorStop(0,"rgba(255,255,255,0)");cg.addColorStop(.25,n?"rgba(255,255,255,.75)":"rgba(255,255,255,.95)");cg.addColorStop(1,"#ffffff");
  g.strokeStyle=cg;g.lineWidth=3.2*boost;g.beginPath();g.moveTo(S[0],S[1]);g.lineTo(P1[0],P1[1]);g.stroke();
  if(!n){g.globalCompositeOperation="source-over";[2.4,-2.4].forEach(function(o){g.strokeStyle="rgba(106,63,181,.30)";g.lineWidth=.8;g.beginPath();g.moveTo(S[0]+din[0]*bl*.18-din[1]*o,S[1]+din[1]*bl*.18+din[0]*o);g.lineTo(P1[0]-din[1]*o,P1[1]+din[0]*o);g.stroke();});g.globalCompositeOperation=add;}
  for(var k=0;k<4;k++){var s=((T*.42+k/4)%1);if(s<.12)continue;var px=S[0]+din[0]*bl*s,py=S[1]+din[1]*bl*s;streak(g,px,py,din[0],din[1],22,2.6,n?"#ffffff":"#ffffff",(n?.85:1)*Math.min(1,(s-.12)*4)*boost);
    if(!n)streak(g,px,py+.6,din[0],din[1],22,3.4,"#8a5fd6",.18);}
  if(!B.motes){var R=1;B.motes=[];for(var q=0;q<22;q++){R=(R*16807)%2147483647;var a=R/2147483647;R=(R*16807)%2147483647;var b2=R/2147483647;R=(R*16807)%2147483647;B.motes.push([a,b2-.5,R/2147483647]);}}
  B.motes.forEach(function(m){var s=(m[0]+T*.03*(1+m[2]))%1,px=S[0]+din[0]*bl*s-din[1]*m[1]*12,py=S[1]+din[1]*bl*s+din[0]*m[1]*12,tw=.5+.5*Math.sin(T*3+m[2]*20);
    g.fillStyle=n?"rgba(240,232,255,"+(.55*tw)+")":"rgba(106,63,181,"+(.4*tw)+")";g.beginPath();g.arc(px,py,.6+m[2]*.9,0,TAU);g.fill();});
  /* through the glass: the beam bent, glowing, a little wider as it goes; and a faint reflection running back inside */
  var ig=g.createLinearGradient(P1[0],P1[1],P2[0],P2[1]);ig.addColorStop(0,n?"rgba(255,255,255,.75)":"rgba(255,255,255,.95)");ig.addColorStop(1,n?"rgba(205,180,255,.7)":"rgba(220,200,255,.95)");
  g.strokeStyle=n?"rgba(170,140,255,.22)":"rgba(140,110,220,.20)";g.lineWidth=11;g.beginPath();g.moveTo(P1[0],P1[1]);g.lineTo(P2[0],P2[1]);g.stroke();
  g.strokeStyle=ig;g.lineWidth=3*boost;g.beginPath();g.moveTo(P1[0],P1[1]);g.lineTo(P2[0],P2[1]);g.stroke();
  var il=Math.hypot(P2[0]-P1[0],P2[1]-P1[1]);for(k=0;k<2;k++){var si=((T*.3+k/2)%1);streak(g,P1[0]+tin[0]*il*si,P1[1]+tin[1]*il*si,tin[0],tin[1],16,2.4,"#ffffff",.8*boost);}
  var dn=dot(tin,n2),rr=norm([tin[0]-2*dn*n2[0],tin[1]-2*dn*n2[1]]),h3=hit(P2,rr,M[0],M[1])||hit(P2,rr,M[1],M[2]);
  if(h3){g.strokeStyle=n?"rgba(200,180,255,.14)":"rgba(140,110,220,.14)";g.lineWidth=1.3;g.beginPath();g.moveTo(P2[0],P2[1]);g.lineTo(h3.x,h3.y);g.stroke();}
  glow(g,P1[0],P1[1],16,n?"#ffffff":"#ffffff",(n?.55:.8)*boost);glow(g,P2[0],P2[1],20,n?"#e8dcff":"#ffffff",(n?.6:.85)*boost);
  /* the fan leaving the glass: each colour on its own way, its pulses running outward, shimmering */
  if(fan.length>1){var fa=fan[0].dir,fb=fan[fan.length-1].dir,LL=230,cone=g.createRadialGradient(P2[0],P2[1],0,P2[0],P2[1],LL);cone.addColorStop(0,n?"rgba(205,180,255,.26)":"rgba(150,110,230,.22)");cone.addColorStop(1,"rgba(150,110,230,0)");
    g.fillStyle=cone;g.beginPath();g.moveTo(P2[0],P2[1]);g.lineTo(P2[0]+fa[0]*LL,P2[1]+fa[1]*LL);g.lineTo(P2[0]+fb[0]*LL,P2[1]+fb[1]*LL);g.closePath();g.fill();}
  fan.forEach(function(f,i){var L=212,ex=P2[0]+f.dir[0]*L,ey=P2[1]+f.dir[1]*L,sh=.8+.2*Math.sin(T*2.6+i*.9);
    var rg=g.createLinearGradient(P2[0],P2[1],ex,ey);rg.addColorStop(0,H.rgba(f.col,(n?.85:.95)*sh));rg.addColorStop(.55,H.rgba(f.col,(n?.4:.55)*sh));rg.addColorStop(1,H.rgba(f.col,0));
    g.strokeStyle=rg;g.lineWidth=(i===0||i===SPEC.length-1?3.2:4.2)*boost;g.beginPath();g.moveTo(P2[0],P2[1]);g.lineTo(ex,ey);g.stroke();
    if(!n&&i<2){g.globalCompositeOperation="source-over";g.strokeStyle="rgba(120,90,200,.18)";g.lineWidth=.8;g.beginPath();g.moveTo(P2[0],P2[1]+2.5);g.lineTo(P2[0]+f.dir[0]*L*.7,P2[1]+f.dir[1]*L*.7+2.5);g.stroke();g.globalCompositeOperation=add;}
    for(var k2=0;k2<2;k2++){var so=((T*.5+k2/2+i*.07)%1);streak(g,P2[0]+f.dir[0]*L*so,P2[1]+f.dir[1]*L*so,f.dir[0],f.dir[1],18,2.2,f.col,(1-so)*(n?.9:1)*boost);}});
  g.restore();
  /* the near faces over the light: glass with a sheen, edges catching the light, a glint that crosses as it turns */
  faces.slice(half).forEach(function(f){var fill=tint[f.k];if(f.k==="tri"){var tg=g.createLinearGradient(f.p[1][0],f.p[1][1],f.p[0][0],f.p[0][1]);tg.addColorStop(0,n?"rgba(120,90,210,.22)":"rgba(190,170,245,.28)");tg.addColorStop(1,n?"rgba(210,190,255,.16)":"rgba(255,255,255,.48)");fill=tg;}face(g,f.p,fill);});
  var eo=n?"rgba(225,212,255,.78)":"rgba(255,255,255,1)",ei=n?"rgba(120,90,210,.6)":"rgba(110,80,190,.55)";
  [[F[0],F[1]],[F[0],F[2]],[F[1],F[2]],[F[0],K[0]],[F[1],K[1]],[F[2],K[2]],[K[0],K[1]],[K[0],K[2]],[K[1],K[2]]].forEach(function(e,i){var near=i<6;edge(g,e[0],e[1],near?ei:H.rgba(n?"#8a6fd0":"#9a86c8",.35),near?2.2:1.1);if(near)edge(g,[e[0][0]-.6,e[0][1]-.6],[e[1][0]-.6,e[1][1]-.6],eo,.9);});
  var gl=.5+.5*Math.sin(turn*3.2+T*.4),ga=[F[1][0]+(F[0][0]-F[1][0])*gl,F[1][1]+(F[0][1]-F[1][1])*gl];g.save();g.globalCompositeOperation=n?"lighter":"source-over";
  g.beginPath();g.moveTo(F[0][0],F[0][1]);g.lineTo(F[1][0],F[1][1]);g.lineTo(F[2][0],F[2][1]);g.closePath();g.clip();
  g.translate(ga[0]+18,ga[1]+8);g.rotate(Math.atan2(F[0][1]-F[1][1],F[0][0]-F[1][0]));g.scale(1,.16);var sg2=g.createRadialGradient(0,0,0,0,0,58);
  sg2.addColorStop(0,n?"rgba(255,255,255,.42)":"rgba(255,255,255,.9)");sg2.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=sg2;g.beginPath();g.arc(0,0,58,0,TAU);g.fill();g.restore();}
function step(dt){if(H.still()){B.amp=0;B.sw=0;B.flare=0;B.lift=B.hover?1:0;draw();return false;}
  var goal=B.hold?0:1;B.amp+=(goal-B.amp)*Math.min(1,dt/450);if(Math.abs(goal-B.amp)<.002)B.amp=goal;B.t+=dt*(H.motion()==="full"?1.3:1);
  B.sw=B.amp*(24*Math.PI/180)*Math.sin(B.t/15000*TAU);if(B.flare>0)B.flare=Math.max(0,B.flare-dt/900);var lg=B.hover?1:0;B.lift+=(lg-B.lift)*Math.min(1,dt/140);if(Math.abs(lg-B.lift)<.01)B.lift=lg;draw();return true;}
function run(){var C=B.C;if(!C||!C.shown){if(B.loop)B.loop.stop();return;}if(H.still()){if(B.loop)B.loop.stop();draw();return;}if(!B.loop)B.loop=H.Loop(step);B.loop.start();}
function lines(){var e=$("codeEditor");var v=e?String(e.value||""):"";return v?v.split("\n").length:0;}
function paint(){var C=B.C;if(!C||!C.on)return;var n=lines(),auto=$("autoRun");C.tagSet(n?n+(n===1?" line":" lines"):"An empty page",auto&&auto.checked?"runs as you type":"runs when you press Run");}
function runPage(){var r=$("runBtn");B.flare=1;run();if(r)r.click();if(B.C)B.C.toRoom("#buildGrid");}
function sample(){var s=$("sampleBtn");if(s)s.click();if(B.C)B.C.toRoom("#buildGrid");}
function start(){H=W.IngHeads;if(!H||!$("page-build")){if((B.tries=(B.tries||0)+1)<240)setTimeout(start,500);return;}
  B.C=H.mount({page:"page-build",label:"Build",eyebrow:"Build · the prism of your page",cls:"hd-build",
    keys:[{name:"run",id:"hdBuildRun",text:"Run your page",icon:"run",primary:true,click:runPage},{name:"sample",id:"hdBuildSample",text:"Load a sample",icon:"open",click:sample}],
    line:"Your code on one side, your page running on the other: try an idea, check a snippet, or let a model help you fix it.",
    scene:function(C){var cv=mk("canvas","hd-cv");cv.setAttribute("aria-hidden","true");C.box.appendChild(cv);B.cv=cv;
      var hit=mk("button","hd-hit hd-key");hit.type="button";hit.id="hdBuildPrism";hit.setAttribute("aria-label","Run your page");C.box.appendChild(hit);
      hit.addEventListener("pointerenter",function(e){if(e.pointerType!=="touch"){B.hover=true;run();}});hit.addEventListener("pointerleave",function(){B.hover=false;B.down=false;run();});
      hit.addEventListener("pointerdown",function(){B.down=true;run();});["pointerup","pointercancel"].forEach(function(t){hit.addEventListener(t,function(){B.down=false;run();});});
      hit.addEventListener("click",function(e){e.preventDefault();runPage();});hit.addEventListener("focus",function(){B.hold=true;run();});hit.addEventListener("blur",function(){B.hold=false;run();});
      C.scene.addEventListener("pointerenter",function(e){if(e.pointerType!=="touch"){B.hold=true;run();}});C.scene.addEventListener("pointerleave",function(){if(D.activeElement!==hit){B.hold=false;run();}});
      C.hintSet(["Point at the prism to still it; press it to run your page."]);},
    paint:function(){paint();draw();},theme:function(){PL.sig="";draw();run();},shown:function(C,sh){if(sh){paint();draw();}run();},resize:function(){PL.sig="";draw();}});
  var ed=$("codeEditor");if(ed)ed.addEventListener("input",function(){clearTimeout(B.q);B.q=setTimeout(paint,400);});var au=$("autoRun");if(au)au.addEventListener("change",paint);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
W.IngHeads&&(W.IngHeads.build={state:function(){var C=B.C;return {on:!!(C&&C.on),running:!!(B.loop&&B.loop.running()),sway:B.sw,flare:B.flare,tag:C&&C.tagB?[C.tagB.textContent,C.tagS.textContent]:null};},draw:draw});
try{window.__ingParts["p289"]="running";}catch(_){}
})();
</script>
