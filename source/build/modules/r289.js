<style id="r289-css">
/* ============ R289 · BUILD'S HEAD: THE PRISM OF YOUR PAGE (Ingenium 6.93, 12 November 2026; held for the owner's live preview) ============
   The owner's answer (12 November 2026) on what the Build page should get: "A 3D head like the rest". On the light of the first live
   previews: "I want the light passing through the prism, I want to see that beautiful 3D visual rendering of that"; "The light through the
   prism is genuinely horrible"; then, choosing: "real glowing light drawn with your computer's graphics chip (soft bloom, light pooling, a
   true spectrum)". And for every head: movement "like Home's orrery and seal", leaning toward the pointer, never freezing.
   - Build's head (modules/r284.js IngHeads): its title and words, Run your page (the page's own Run key, pressed for you) and Load a
     sample, and a line: your code on one side, your page running on the other.
   - The light is drawn by the graphics chip (WebGL), every pixel of it: a beam of white light, your code, with a soft bloom and pulses
     running along it; it bends where it enters the glass and where it leaves (Snell's law, at the faces as they stand at that moment),
     glows as it crosses, and leaves as a true spectrum, red to violet, shimmering with light running outward; light pools on the plinth
     under the glass, and the points where it enters and leaves flare. Where the web view has no WebGL, a simpler drawing stands in.
   - The glass is drawn on either side of the light (its far faces behind it, its near faces, edges and a glint over it), standing on a
     turned plinth. It never stops: it turns gently on two slow swells; under the pointer it leans toward it on a spring, and the
     spectrum swings with the glass; pressed, it knocks (it dips and springs back) and a bright pulse runs through, and your page runs.
   - Beside it, how many lines your code has and whether the page runs as you type. Minimal motion and reduced motion keep it still,
     drawn once. It is drawn only while it can be seen. */
#page-build.hd-on > .hd-head .hd-tag{right:6px;top:30px;max-width:200px}
#page-build.hd-on .hd-hit{left:150px;top:112px;width:220px;height:230px;border-radius:24px}
#page-build .pr-gl{mix-blend-mode:normal}
body[data-theme="night"] #page-build .pr-gl{mix-blend-mode:screen}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p289"]="started";}catch(_){}
/* R289 · Build's head, the prism of your page: see the note at the top of its styles */
(function(){"use strict";
if(window.__r289)return;window.__r289=1;
var D=document,W=window,TAU=Math.PI*2,H=null;
var B={C:null,back:null,glc:null,front:null,fb:null,ff:null,t:0,sw:0,amp:1,hold:false,hover:false,down:false,lift:0,loop:null,W:520,H:460,flare:0,tx:0,lt:null,ks:null};
var G={cx:258,cy:262,e:10*Math.PI/180,F:1200},PY=330;
function $(id){return D.getElementById(id);}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function proj(x,y,z,turn){var c=Math.cos(turn),s=Math.sin(turn),X=x*c+z*s,Z=-x*s+z*c,ce=Math.cos(G.e),se=Math.sin(G.e),Y=y*ce+Z*se,Z2=-y*se+Z*ce,k=G.F/(G.F-Z2);return [G.cx+X*k,G.cy+Y*k,Z2,k];}
function sz(cv){var d=H.dpr(),w=Math.round(B.W*d),h=Math.round(B.H*d);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}return d;}
/* ---------- the plinth, drawn once for the Display ---------- */
var PL={sig:"",cv:null};
function plinth(){var d=H.dpr(),n=H.night(),sig=d+"|"+(n?1:0);if(PL.sig===sig)return PL.cv;PL.sig=sig;var cv=PL.cv||D.createElement("canvas");cv.width=Math.round(B.W*d);cv.height=Math.round(B.H*d);
  var g=cv.getContext("2d");g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,B.W,B.H);var bx=G.cx,by=PY,rx=140,ry=rx*Math.sin(G.e)*1.35,th=22,i;
  H.cast(g,bx+8,by+th+ry*.7,rx*1.15,ry*1.7,n?.24:.16);
  var sg=g.createLinearGradient(bx-rx,0,bx+rx,0);if(n){sg.addColorStop(0,"#07050c");sg.addColorStop(.24,"#221a34");sg.addColorStop(.44,"#2f2647");sg.addColorStop(.72,"#18121f");sg.addColorStop(1,"#060409");}
  else{sg.addColorStop(0,"#9c8ac2");sg.addColorStop(.24,"#d9cfee");sg.addColorStop(.44,"#efe9f8");sg.addColorStop(.72,"#c6b8e3");sg.addColorStop(1,"#8f7cb9");}
  g.beginPath();g.ellipse(bx,by,rx,ry,0,0,Math.PI);g.lineTo(bx-rx,by+th);g.ellipse(bx,by+th,rx,ry,0,Math.PI,0,true);g.closePath();g.fillStyle=sg;g.fill();
  var vg=g.createLinearGradient(0,by,0,by+th+ry);vg.addColorStop(0,"rgba(255,255,255,0)");vg.addColorStop(1,n?"rgba(0,0,0,.45)":"rgba(70,48,130,.22)");g.fillStyle=vg;g.fill();
  var fg=g.createRadialGradient(bx-rx*.3,by-ry*.9,rx*.05,bx,by,rx);if(n){fg.addColorStop(0,"#2e2446");fg.addColorStop(.6,"#1d1630");fg.addColorStop(1,"#151025");}else{fg.addColorStop(0,"#ffffff");fg.addColorStop(.6,"#f1edf9");fg.addColorStop(1,"#e2daf1");}
  g.beginPath();g.ellipse(bx,by,rx,ry,0,0,TAU);g.fillStyle=fg;g.fill();
  g.save();g.beginPath();g.ellipse(bx,by,rx,ry,0,0,TAU);g.clip();g.lineWidth=.7;for(var f=.16;f<.9;f+=.026){g.beginPath();g.ellipse(bx,by,rx*f,ry*f,0,0,TAU);g.strokeStyle=n?"rgba(205,184,240,.04)":"rgba(90,64,150,.06)";g.stroke();}g.restore();
  for(i=0;i<96;i++){var u=i/96*TAU,lng=i%8===0;g.beginPath();g.moveTo(bx+Math.cos(u)*rx*(lng?.88:.91),by+Math.sin(u)*ry*(lng?.88:.91));g.lineTo(bx+Math.cos(u)*rx*.955,by+Math.sin(u)*ry*.955);
    g.strokeStyle=n?"rgba(205,184,240,"+(lng?.4:.22)+")":"rgba(84,60,140,"+(lng?.38:.2)+")";g.lineWidth=lng?1.1:.8;g.stroke();}
  g.beginPath();g.ellipse(bx,by,rx-.6,ry-.5,0,Math.PI*1.05,Math.PI*1.95);g.strokeStyle=n?"rgba(205,184,240,.2)":"#ffffff";g.lineWidth=1.2;g.stroke();
  g.beginPath();g.ellipse(bx,by+1.2,rx-.4,ry,0,.05,Math.PI-.05);g.strokeStyle=n?"rgba(205,184,240,.16)":"rgba(255,255,255,.9)";g.lineWidth=1;g.stroke();
  PL.cv=cv;return cv;}
/* ---------- the light's path, bent as glass bends it ---------- */
var TRI=[[0,-136],[-110,58],[110,58]],DEPTH=46,N_RED=1.48,N_VIOLET=1.56;
function norm(v){var l=Math.hypot(v[0],v[1])||1;return [v[0]/l,v[1]/l];}
function dot(a,b){return a[0]*b[0]+a[1]*b[1];}
function refract(d,nOut,eta){var ci=-dot(nOut,d),k=1-eta*eta*(1-ci*ci);if(k<0)return null;var bb=eta*ci-Math.sqrt(k);return norm([eta*d[0]+bb*nOut[0],eta*d[1]+bb*nOut[1]]);}
function hit(p,d,a,b){var ex=b[0]-a[0],ey=b[1]-a[1],den=d[0]*ey-d[1]*ex;if(Math.abs(den)<1e-6)return null;var t=((a[0]-p[0])*ey-(a[1]-p[1])*ex)/den,u=((a[0]-p[0])*d[1]-(a[1]-p[1])*d[0])/den;
  if(t<=0||u<0||u>1)return null;return {t:t,u:u,x:p[0]+d[0]*t,y:p[1]+d[1]*t};}
function outward(a,b,c){var n=norm([b[1]-a[1],-(b[0]-a[0])]),m=[(a[0]+b[0])/2-c[0],(a[1]+b[1])/2-c[1]];return dot(n,m)>0?n:[-n[0],-n[1]];}
function path(M){var S=[G.cx-292,G.cy+64],u=.52,P1=[M[0][0]+(M[1][0]-M[0][0])*u,M[0][1]+(M[1][1]-M[0][1])*u],din=norm([P1[0]-S[0],P1[1]-S[1]]);
  var n1=outward(M[0],M[1],M[2]),n2=outward(M[0],M[2],M[1]),tin=refract(din,n1,1/1.52)||din,h2=hit(P1,tin,M[0],M[2])||hit(P1,tin,M[1],M[2]),P2=h2?[h2.x,h2.y]:[M[2][0]-20,M[2][1]-60];
  var r=refract(tin,[-n2[0],-n2[1]],N_RED),v=refract(tin,[-n2[0],-n2[1]],N_VIOLET)||r;r=r||v||[1,0];v=v||r;
  /* the true spread of glass is a few degrees; opened about its middle so the eye sees the colours, each keeping its side */
  var ar=Math.atan2(r[1],r[0]),av=Math.atan2(v[1],v[0]),mid=(ar+av)/2,half=Math.max(.15,Math.abs(av-ar)*3.4)/2,sgn=av>=ar?1:-1;
  return {S:S,P1:P1,P2:P2,din:din,tin:tin,red:mid-sgn*half,violet:mid+sgn*half};}
/* ---------- the light, drawn by the graphics chip ---------- */
var FS=["#ifdef GL_FRAGMENT_PRECISION_HIGH","precision highp float;","#else","precision mediump float;","#endif",
"uniform vec2 uRes;uniform float uDpr;uniform vec2 uS;uniform vec2 uP1;uniform vec2 uP2;uniform vec2 uA;uniform vec2 uB;uniform vec2 uC;",
"uniform float uRed;uniform float uViolet;uniform float uTime;uniform float uFlare;uniform float uDay;uniform vec4 uPool;",
"float seg(vec2 p,vec2 a,vec2 b,out float h){vec2 pa=p-a,ba=b-a;h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);return length(pa-ba*h);}",
"float side(vec2 p,vec2 a,vec2 b){return (b.x-a.x)*(p.y-a.y)-(b.y-a.y)*(p.x-a.x);}",
/* the visible spectrum, 400 to 700 nanometres, in the classic piecewise approximation, softened at its two ends */
"vec3 spectral(float w){vec3 c=vec3(0.0);",
" if(w<440.0){c=vec3(-(w-440.0)/60.0,0.0,1.0);}else if(w<490.0){c=vec3(0.0,(w-440.0)/50.0,1.0);}else if(w<510.0){c=vec3(0.0,1.0,-(w-510.0)/20.0);}",
" else if(w<580.0){c=vec3((w-510.0)/70.0,1.0,0.0);}else if(w<645.0){c=vec3(1.0,-(w-645.0)/65.0,0.0);}else{c=vec3(1.0,0.0,0.0);}",
" float f=w<420.0?0.35+0.65*(w-380.0)/40.0:(w>650.0?0.35+0.65*(700.0-w)/50.0:1.0);return clamp(c,0.0,1.0)*f;}",
"void main(){vec2 p=vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y)/uDpr;vec3 acc=vec3(0.0);float h;vec3 white=vec3(1.0,0.985,0.97);float fl=1.0+uFlare;",
/* the beam coming in: a fine bright core, a soft bloom, a wide faint haze; pulses of light running along it */
" float L1=length(uP1-uS);float d=seg(p,uS,uP1,h);float fi=smoothstep(0.0,0.24,h);",
" float pulse=0.6+0.4*pow(0.5+0.5*sin((h*L1-uTime*190.0)/24.0),6.0);",
" acc+=white*fi*(exp(-d*d/1.4)*1.7+exp(-d/4.0)*0.5*pulse+exp(-d/18.0)*0.11)*fl;",
/* through the glass: only inside its faces */
" float e1=side(p,uA,uB),e2=side(p,uB,uC),e3=side(p,uC,uA);float inside=((e1<=0.0&&e2<=0.0&&e3<=0.0)||(e1>=0.0&&e2>=0.0&&e3>=0.0))?1.0:0.0;",
" float d2=seg(p,uP1,uP2,h);acc+=vec3(1.0,0.97,1.0)*inside*(exp(-d2*d2/2.2)*1.35+exp(-d2/6.0)*0.4*(0.8+0.2*sin(uTime*3.1+h*11.0))+exp(-d2/30.0)*0.12)*fl;",
/* the spectrum leaving the glass: each angle its own wavelength, red the least bent, violet the most; light running outward */
" vec2 v=p-uP2;float r=length(v);float ang=atan(v.y,v.x);float t=(ang-uRed)/(uViolet-uRed);",
" float mask=smoothstep(-0.07,0.05,t)*(1.0-smoothstep(0.95,1.07,t))*(1.0-inside);",
" float w=mix(690.0,405.0,clamp(t,0.0,1.0));float fall=exp(-r/230.0)*smoothstep(0.0,8.0,r);",
" float rays=0.84+0.16*sin(t*64.0+uTime*1.3)*sin(r*0.045-uTime*2.2);float run=0.72+0.28*pow(0.5+0.5*sin((r-uTime*130.0)/28.0),3.0);",
" vec3 sp=spectral(w);acc+=sp*mask*fall*rays*run*1.35*(1.0+0.7*uFlare);",
" acc+=white*mask*exp(-r/38.0)*0.35;",
/* where it enters and leaves, the glass flares */
" acc+=white*(exp(-length(p-uP1)/8.0)*0.6+exp(-length(p-uP2)/11.0)*0.85)*fl;",
/* light pooling on the plinth: a caustic gathered under the glass, and the spectrum spread on the plinth's face beside it */
" vec2 q=(p-uPool.xy)/uPool.zw;float on=1.0-smoothstep(0.88,1.0,length(q));",
" vec2 c1=(p-(uPool.xy+vec2(-18.0,-2.0)))/vec2(uPool.z*0.42,uPool.w*0.55);acc+=vec3(0.95,0.9,1.0)*on*exp(-dot(c1,c1)*1.6)*0.55*(0.85+0.15*sin(uTime*2.0))*fl;",
" vec2 c2=(p-(uPool.xy+vec2(uPool.z*0.42,4.0)))/vec2(uPool.z*0.38,uPool.w*0.5);float tw=clamp(0.5+(p.x-(uPool.x+uPool.z*0.42))/(uPool.z*0.76),0.0,1.0);",
" acc+=spectral(mix(680.0,410.0,tw))*on*exp(-dot(c2,c2)*1.4)*0.75*(0.8+0.2*sin(uTime*1.7+tw*9.0))*(1.0+0.6*uFlare);",
/* a soft tone curve, so bright light rolls off as light does; by day the white is laid in lavender so it reads on a light page */
" vec3 col=1.0-exp(-acc*1.15);float mx=max(col.r,max(col.g,col.b));float wh=min(col.r,min(col.g,col.b))/max(0.001,mx);",
" col=mix(col,col*vec3(0.62,0.48,0.96),uDay*smoothstep(0.55,0.95,wh));col=mix(col,col*0.86,uDay*(1.0-wh));",
" mx=max(col.r,max(col.g,col.b));float a=clamp(mx,0.0,1.0);gl_FragColor=vec4(col,a);}"].join("\n");
var GL={gl:null,u:{},failed:false,lost:false};
function glInit(cv){if(GL.gl||GL.failed)return !!GL.gl;try{var gl=cv.getContext("webgl",{alpha:true,premultipliedAlpha:true,antialias:false,depth:false,stencil:false})||cv.getContext("experimental-webgl");
    if(!gl){GL.failed=true;return false;}
    var sh=function(t,src){var s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s)||"shader");return s;};
    var pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,"attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}"));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
    if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr)||"link");
    var buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);gl.useProgram(pr);
    var loc=gl.getAttribLocation(pr,"a");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    ["uRes","uDpr","uS","uP1","uP2","uA","uB","uC","uRed","uViolet","uTime","uFlare","uDay","uPool"].forEach(function(n){GL.u[n]=gl.getUniformLocation(pr,n);});GL.gl=gl;return true;}
  catch(e){GL.failed=true;try{console.warn("Ingenium: Build's light falls back to a simpler drawing",e&&e.message||e);}catch(_){}return false;}}
function glLight(Pth,M,T){var gl=GL.gl,cv=B.glc,d=sz(cv),u=GL.u;gl.viewport(0,0,cv.width,cv.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform2f(u.uRes,cv.width,cv.height);gl.uniform1f(u.uDpr,d);gl.uniform2f(u.uS,Pth.S[0],Pth.S[1]);gl.uniform2f(u.uP1,Pth.P1[0],Pth.P1[1]);gl.uniform2f(u.uP2,Pth.P2[0],Pth.P2[1]);
  gl.uniform2f(u.uA,M[0][0],M[0][1]);gl.uniform2f(u.uB,M[1][0],M[1][1]);gl.uniform2f(u.uC,M[2][0],M[2][1]);gl.uniform1f(u.uRed,Pth.red);gl.uniform1f(u.uViolet,Pth.violet);
  gl.uniform1f(u.uTime,T);gl.uniform1f(u.uFlare,B.flare);gl.uniform1f(u.uDay,H.night()?0:1);gl.uniform4f(u.uPool,G.cx,PY,140,140*Math.sin(G.e)*1.35);gl.drawArrays(gl.TRIANGLES,0,3);}
/* where there is no WebGL: the beam and the fan, drawn simply */
function flatLight(Pth){var g=B.glc.__g||(B.glc.__g=B.glc.getContext("2d"));if(!g)return;var d=sz(B.glc);g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,B.W,B.H);
  g.lineCap="round";g.strokeStyle=H.night()?"rgba(255,255,255,.9)":"rgba(120,90,200,.8)";g.lineWidth=3;g.beginPath();g.moveTo(Pth.S[0],Pth.S[1]);g.lineTo(Pth.P1[0],Pth.P1[1]);g.lineTo(Pth.P2[0],Pth.P2[1]);g.stroke();
  ["#ff3b3b","#ff9f2e","#ffe23d","#4bd463","#3e8bff","#5a4bff","#9a4bff"].forEach(function(c,i,a){var an=Pth.red+(Pth.violet-Pth.red)*i/(a.length-1),ex=Pth.P2[0]+Math.cos(an)*220,ey=Pth.P2[1]+Math.sin(an)*220;
    var gr=g.createLinearGradient(Pth.P2[0],Pth.P2[1],ex,ey);gr.addColorStop(0,c);gr.addColorStop(1,"rgba(0,0,0,0)");g.strokeStyle=gr;g.lineWidth=4;g.beginPath();g.moveTo(Pth.P2[0],Pth.P2[1]);g.lineTo(ex,ey);g.stroke();});}
/* ---------- the glass, on either side of the light ---------- */
function face(g,P,fill){g.beginPath();g.moveTo(P[0][0],P[0][1]);for(var i=1;i<P.length;i++)g.lineTo(P[i][0],P[i][1]);g.closePath();g.fillStyle=fill;g.fill();}
function edge(g,a,b,col,w){g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.strokeStyle=col;g.lineWidth=w;g.lineCap="round";g.stroke();}
function draw(){if(!B.back)return;var n=H.night(),T=B.t/1000,turn=B.sw,dy=-B.lift*5+B.ks.x;
  function V(i,z){return proj(TRI[i][0],TRI[i][1]+dy,z,turn);}
  var F=[V(0,DEPTH),V(1,DEPTH),V(2,DEPTH)],K=[V(0,-DEPTH),V(1,-DEPTH),V(2,-DEPTH)],M=[V(0,0),V(1,0),V(2,0)],Pth=path(M);
  var faces=[{p:[F[0],F[1],F[2]],k:"tri"},{p:[K[0],K[2],K[1]],k:"tri"},{p:[F[0],K[0],K[1],F[1]],k:"left"},{p:[F[0],F[2],K[2],K[0]],k:"right"},{p:[F[1],K[1],K[2],F[2]],k:"floor"}];
  faces.forEach(function(f){f.z=f.p.reduce(function(s,q){return s+q[2];},0)/f.p.length;});faces.sort(function(a,b){return a.z-b.z;});
  var tint=n?{tri:"rgba(150,120,230,.13)",left:"rgba(190,165,255,.16)",right:"rgba(110,80,200,.20)",floor:"rgba(70,50,140,.30)"}:{tri:"rgba(206,190,248,.20)",left:"rgba(255,255,255,.32)",right:"rgba(170,140,235,.20)",floor:"rgba(120,90,200,.24)"};
  /* behind the light: the plinth, the glass's shadow and its far faces */
  var d=sz(B.back),g=B.fb||(B.fb=B.back.getContext("2d"));g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,B.W,B.H);g.drawImage(plinth(),0,0,B.W,B.H);H.cast(g,G.cx+14,PY+4,128,16,n?.3:.14);
  faces.slice(0,3).forEach(function(f){face(g,f.p,tint[f.k]);});
  /* the light */
  if(GL.gl&&!GL.lost)glLight(Pth,M,T);else flatLight(Pth);
  /* over the light: the near faces, the edges catching the light, a glint crossing as the glass turns */
  d=sz(B.front);g=B.ff||(B.ff=B.front.getContext("2d"));g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,B.W,B.H);
  faces.slice(3).forEach(function(f){var fill=tint[f.k];if(f.k==="tri"){var tg=g.createLinearGradient(f.p[1][0],f.p[1][1],f.p[0][0],f.p[0][1]);tg.addColorStop(0,n?"rgba(120,90,210,.18)":"rgba(190,170,245,.22)");tg.addColorStop(1,n?"rgba(210,190,255,.12)":"rgba(255,255,255,.42)");fill=tg;}face(g,f.p,fill);});
  var eo=n?"rgba(225,212,255,.8)":"rgba(255,255,255,1)",ei=n?"rgba(120,90,210,.6)":"rgba(110,80,190,.5)";
  [[F[0],F[1]],[F[0],F[2]],[F[1],F[2]],[F[0],K[0]],[F[1],K[1]],[F[2],K[2]],[K[0],K[1]],[K[0],K[2]],[K[1],K[2]]].forEach(function(e,i){var near=i<6;edge(g,e[0],e[1],near?ei:H.rgba(n?"#8a6fd0":"#9a86c8",.3),near?2.2:1.1);if(near)edge(g,[e[0][0]-.6,e[0][1]-.6],[e[1][0]-.6,e[1][1]-.6],eo,.9);});
  var gp=.5+.5*Math.sin(turn*3.2+T*.35),ga=[F[1][0]+(F[0][0]-F[1][0])*gp,F[1][1]+(F[0][1]-F[1][1])*gp];g.save();g.beginPath();g.moveTo(F[0][0],F[0][1]);g.lineTo(F[1][0],F[1][1]);g.lineTo(F[2][0],F[2][1]);g.closePath();g.clip();
  g.translate(ga[0]+18,ga[1]+8);g.rotate(Math.atan2(F[0][1]-F[1][1],F[0][0]-F[1][0]));g.scale(1,.16);var sg2=g.createRadialGradient(0,0,0,0,0,58);
  sg2.addColorStop(0,n?"rgba(255,255,255,.4)":"rgba(255,255,255,.9)");sg2.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=sg2;g.beginPath();g.arc(0,0,58,0,TAU);g.fill();g.restore();
  B.path=Pth;}
/* ---------- its movement: two slow swells, a lean toward the pointer on a spring, a knock when pressed ---------- */
function step(dt){if(H.still()){B.sw=0;B.flare=0;B.lift=B.hover?1:0;B.ks.x=0;draw();return false;}
  var goal=B.hold?.4:1;B.amp+=(goal-B.amp)*Math.min(1,dt/500);B.t+=dt*(H.motion()==="full"?1.3:1);var T=B.t/1000;
  var amb=B.amp*((16*Math.sin(T/17*TAU)+6*Math.sin(T/6.7*TAU+1))*Math.PI/180);B.sw=amb+B.lt.to(B.tx*34*Math.PI/180,dt);B.ks.to(0,dt);
  if(B.flare>0)B.flare=Math.max(0,B.flare-dt/1100);var lg=B.hover?1:0;B.lift+=(lg-B.lift)*Math.min(1,dt/110);draw();return true;}
function run(){var C=B.C;if(!C||!C.shown){if(B.loop)B.loop.stop();return;}if(H.still()){if(B.loop)B.loop.stop();draw();return;}if(!B.loop)B.loop=H.Loop(step);B.loop.start();}
function lines(){var e=$("codeEditor");var v=e?String(e.value||""):"";return v?v.split("\n").length:0;}
function paint(){var C=B.C;if(!C||!C.on)return;var n=lines(),auto=$("autoRun");C.tagSet(n?n+(n===1?" line":" lines"):"An empty page",auto&&auto.checked?"runs as you type":"runs when you press Run");}
function runPage(){var r=$("runBtn");if(!H.still()){B.flare=1;B.ks.v=95;}run();setTimeout(function(){if(r)r.click();if(B.C)B.C.toRoom("#buildGrid");},H.still()?0:280);}
function sample(){var s=$("sampleBtn");if(s)s.click();if(B.C)B.C.toRoom("#buildGrid");}
function start(){H=W.IngHeads;if(!H||!$("page-build")){if((B.tries=(B.tries||0)+1)<240)setTimeout(start,500);return;}B.lt=H.Spring(60,11);B.ks=H.Spring(300,12);
  B.C=H.mount({page:"page-build",label:"Build",eyebrow:"Build · the prism of your page",cls:"hd-build",
    keys:[{name:"run",id:"hdBuildRun",text:"Run your page",icon:"run",primary:true,click:runPage},{name:"sample",id:"hdBuildSample",text:"Load a sample",icon:"open",click:sample}],
    line:"Your code on one side, your page running on the other: try an idea, check a snippet, or let a model help you fix it.",
    scene:function(C){B.back=mk("canvas","hd-cv");B.glc=mk("canvas","hd-cv pr-gl");B.front=mk("canvas","hd-cv");[B.back,B.glc,B.front].forEach(function(c){c.setAttribute("aria-hidden","true");C.box.appendChild(c);});
      sz(B.glc);glInit(B.glc);
      B.glc.addEventListener("webglcontextlost",function(e){e.preventDefault();GL.lost=true;});B.glc.addEventListener("webglcontextrestored",function(){GL.gl=null;GL.failed=false;GL.lost=false;glInit(B.glc);draw();});
      var hit=mk("button","hd-hit hd-key");hit.type="button";hit.id="hdBuildPrism";hit.setAttribute("aria-label","Run your page");C.box.appendChild(hit);
      hit.addEventListener("pointerenter",function(e){if(e.pointerType!=="touch"){B.hover=true;run();}});hit.addEventListener("pointerleave",function(){B.hover=false;B.down=false;run();});
      hit.addEventListener("pointerdown",function(){B.down=true;run();});["pointerup","pointercancel"].forEach(function(t){hit.addEventListener(t,function(){B.down=false;run();});});
      hit.addEventListener("click",function(e){e.preventDefault();runPage();});hit.addEventListener("focus",function(){B.hold=true;run();});hit.addEventListener("blur",function(){B.hold=false;run();});
      C.scene.addEventListener("pointerenter",function(e){if(e.pointerType!=="touch"){B.hold=true;run();}});
      C.scene.addEventListener("pointermove",function(e){if(e.pointerType==="touch")return;var r=C.box.getBoundingClientRect();if(!r.width)return;B.tx=Math.max(-1,Math.min(1,(e.clientX-(r.left+r.width*G.cx/520))/(r.width*.4)));},{passive:true});
      C.scene.addEventListener("pointerleave",function(){B.tx=0;if(D.activeElement!==hit){B.hold=false;run();}});
      C.hintSet(["Point at the prism and it turns to you; press it to run your page."]);},
    paint:function(){paint();draw();},theme:function(){PL.sig="";draw();run();},shown:function(C,sh){if(sh){paint();draw();}run();},resize:function(){PL.sig="";draw();}});
  var ed=$("codeEditor");if(ed)ed.addEventListener("input",function(){clearTimeout(B.q);B.q=setTimeout(paint,400);});var au=$("autoRun");if(au)au.addEventListener("change",paint);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
W.IngHeads&&(W.IngHeads.build={state:function(){var C=B.C;return {on:!!(C&&C.on),running:!!(B.loop&&B.loop.running()),webgl:!!(GL.gl&&!GL.lost),sway:B.sw,flare:B.flare,
  path:B.path?{P1:B.path.P1,P2:B.path.P2,red:B.path.red,violet:B.path.violet}:null,tag:C&&C.tagB?[C.tagB.textContent,C.tagS.textContent]:null};},draw:draw});
try{window.__ingParts["p289"]="running";}catch(_){}
})();
</script>
