<style id="r291-css">
/* ============ R291 · FOCUS'S HEADER: STEPPING STONES ACROSS STILL WATER (Ingenium 7.00, 13 November 2026) ============
   Her words (13 November 2026): "For the Focus page, I want the Stepping stones ... I want the roman numerals removed from the stepping
   stones ... I want it to look like real stones on water. I want to see the water ripple, I want the calm soothing sounds associated with
   it." On the live preview: "I love the stones of the Focus page and their animation. I think they do look rather dull and not realistic
   and 3D, I want you to deepen the design a bit more and really enhance the 3D effect to look more real and please sharpen the visuals and
   increase the contrast of the colours on Night mode and add the same nothern lights look and effect from the Build page's diamond and
   all of its glow and animation ... For the Day mode look of the stones, it just looks gray and stale ... please fix that." And: "remove the
   dark shadows around the horizon for the stones, I wanted the northern lights added and a beautiful cleary stars filled glistening sky
   and horizon for the night mode and a beautiful soft bright with a couple clouds landscape for day mode for the Focus page."
   So Focus opens, as Lector, Vocatio, Fabrica and Build do, on their header (modules/r290.js, IngStudios.kit). Its instrument is the pool:
   it fills the card to the right of the words, a window onto the water and the sky, softened into the card at its left edge only, never
   darkened at its edges. The stones are the steps of the task in hand (Work, Steps): the step in hand is the pearl stone in the light,
   the steps done the deeper violet stones behind it, the steps ahead the lavender stones beyond; the label says which step it is. The
   armillary sphere that stood here before is kept aside (build/aside/r284.js), as she asked. */
#page-focus.sk-on > .page-title,#page-focus.sk-on > .lede{display:none !important}
#page-focus.sk-on .skh-stage{display:none}
#page-focus.sk-on .skh{margin-bottom:14px}
#page-focus.sk-on .skh-obj.fc-pool{left:440px;right:0;top:0;bottom:0;width:auto;height:auto;transform:none;z-index:2;overflow:hidden;touch-action:manipulation}
#page-focus.sk-on .fc-cv{position:absolute;left:0;top:0;width:100%;height:100%;display:block}
#page-focus.sk-on .fc-label{position:absolute;left:auto;right:30px;bottom:24px;top:auto;z-index:7;transform:none;text-align:right;pointer-events:none}
#page-focus.sk-on .fc-label b{font-size:20px;text-shadow:0 1px 2px rgba(255,255,255,.75)}
#page-focus.sk-on .fc-label small{font-size:11px;letter-spacing:.04em;text-shadow:0 1px 2px rgba(255,255,255,.75)}
body[data-theme="night"] #page-focus.sk-on .fc-label b,body[data-theme="night"] #page-focus.sk-on .fc-label small{text-shadow:0 1px 3px rgba(4,2,12,.7)}
body[data-theme="night"] #page-focus.sk-on .fc-label small{color:#cdb8f6}
@media (max-width:1180px){#page-focus.sk-on .skh-obj.fc-pool{left:400px;transform:none}}
@media (max-width:980px){#page-focus.sk-on .skh-obj.fc-pool{left:350px;transform:none}}
/* a phone or a narrow window: the pool under the words, the card's width and a little taller than half of it */
@media (max-width:760px){#page-focus.sk-on .skh-obj.fc-pool{display:block !important;position:relative;left:auto;right:auto;top:auto;bottom:auto;width:auto;height:270px;margin:14px -18px 0;border-radius:0}
  #page-focus.sk-on .fc-label{right:18px;bottom:14px}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p291"]="started";}catch(_){}
/* R291 · Focus's header, the stepping stones: see the note at the top of its styles */
(function r291(){
"use strict";
if(window.__r291)return;window.__r291=1;
var D=document,W=window;
/* ---------- the stones: stepping stones across still water ----------
   After her photographs: smooth river stones crossing a calm pool toward the far shore, each resting on the water with most of it above,
   wet and dark where the water laps it, mirrored in the water with the sky; rings spread from the stone in hand. Drawn by the graphics
   chip: each stone is traced as a smooth pebble, the water's surface is shaped by its swell and by every ring, and its mirror is traced
   again so the stones and the sky show in it. By night the sky is clear, deep violet and full of stars, with the northern lights over the
   far shore; by day it is soft and bright, lavender overhead and pearl at the horizon, with a few clouds. The steps done are the deeper
   violet stones behind; the step in hand is pearl and catches the light; the steps ahead are lavender slate. A stone pressed answers in
   one of its ways, with soft water (r295). It draws only while in view and while the window is shown, thirty frames a second at rest. */
var Stones=(function(){
  var W0=520,H0=424,OX=0,host,cv,gl,pr,U={},raf=0,vis=true,shown=true,ok=false,q=1,lastDraw=0,slowN=0,t0=performance.now(),cur=0,N=5,cnt=5,overI=-1,
      lift=[0,0,0,0,0],dip=[0,0,0,0,0],rips=[],lastRing=-9;
  var CP=[0.12,1.12,5.7],TG=[0.32,0.55,-1.0],FOV=31*Math.PI/180;
  function sub(a,b){return [a[0]-b[0],a[1]-b[1],a[2]-b[2]];}function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
  function nrm(a){var l=Math.sqrt(dot(a,a))||1;return [a[0]/l,a[1]/l,a[2]/l];}function crs(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
  var CF=nrm(sub(TG,CP)),CR=nrm(crs(CF,[0,1,0])),CU=crs(CR,CF),TAN=Math.tan(FOV/2);
  /* the path: x, z, the stone's half length, half width, half height, its turn; each rests with its centre a half height above the water */
  var S=[[-0.50,1.62,0.35,0.265,0.118,0.35],[0.02,0.36,0.33,0.25,0.112,-0.25],[0.52,-0.96,0.32,0.24,0.108,0.55],[0.94,-2.34,0.31,0.235,0.105,-0.1],[1.24,-3.75,0.30,0.23,0.102,0.4]],REST=0.5;
  var VS="attribute vec2 p;varying vec2 v;void main(){v=p*0.5+0.5;gl_Position=vec4(p,0.0,1.0);}";
  var FS=["precision highp float;varying vec2 v;",
  "uniform float uT,uN,uAsp,uTan,uOx;uniform vec3 uCP;uniform mat3 uCM;uniform vec4 uS[5];uniform vec4 uS2[5];uniform vec4 uRp[6];uniform vec4 uSw;uniform vec4 uGl;uniform float uCur,uOver;",
  "float h1(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}",
  "float vn(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);",
  "  return mix(mix(mix(h1(i),h1(i+vec3(1,0,0)),f.x),mix(h1(i+vec3(0,1,0)),h1(i+vec3(1,1,0)),f.x),f.y),mix(mix(h1(i+vec3(0,0,1)),h1(i+vec3(1,0,1)),f.x),mix(h1(i+vec3(0,1,1)),h1(i+vec3(1,1,1)),f.x),f.y),f.z);}",
  /* 7.00, her words (13 November 2026): "I wanted the northern lights added and a beautiful cleary stars filled glistening sky and horizon for
     the night mode and a beautiful soft bright with a couple clouds landscape for day mode". The sky: by night deep violet, clear, full of
     twinkling stars, Build's northern lights over the far shore; by day soft and bright, lavender overhead and pearl at the horizon, a few
     clouds; a low, hazy far shore. The water mirrors all of it. */
  "float hn(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}",
  "float vn2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hn(i),hn(i+vec2(1.0,0.0)),f.x),mix(hn(i+vec2(0.0,1.0)),hn(i+vec2(1.0,1.0)),f.x),f.y);}",
  "float fbm(vec2 p){float s=0.0,a=0.5;for(int i=0;i<4;i++){s+=a*vn2(p);p=p*2.03+vec2(1.7,9.2);a*=0.5;}return s;}",
  "float hills(float az){float a=az+0.35;return 0.004+0.034*pow(vn2(vec2(a*1.7,1.0)),1.6)+0.016*vn2(vec2(a*4.8,3.0))+0.007*vn2(vec2(a*13.0,5.0))+0.003*vn2(vec2(a*31.0,7.0));}",
  "float stars(vec3 w){vec2 p=vec2(atan(w.x,-w.z)*70.0,asin(clamp(w.y,-1.0,1.0))*70.0);vec2 c=floor(p);vec2 f=fract(p)-0.5;float h=hn(c);if(h<0.84)return 0.0;",
  "  vec2 o=vec2(hn(c+3.1),hn(c+7.7))-0.5;float d=length(f-o*0.7);float tw=0.55+0.45*sin(uT*(0.8+h*3.0)+h*40.0);return smoothstep(0.10,0.0,d)*tw*(0.35+0.65*(h-0.84)/0.16);}",
  "vec3 auroraSky(vec3 w){float az=atan(w.x,-w.z);float el=asin(clamp(w.y,-1.0,1.0));vec3 col=vec3(0.0);",
  "  for(int L=0;L<3;L++){float fl=float(L);float x=az*(1.3+fl*0.35)+fl*3.1;",
  "    float base=0.06+fl*0.035+0.04*sin(x*1.2+uT*0.06+fl)+0.022*sin(x*3.0-uT*0.10+fl*2.0)+0.035*(vn2(vec2(x*0.7,uT*0.04+fl*5.0))-0.5);",
  "    float dy=el-base;float ry=vn2(vec2(x*16.0+uT*(0.20+fl*0.07),fl*7.0+uT*0.05));ry=pow(ry,1.6);",
  "    float wave=0.5+0.5*sin(x*2.2-uT*0.55+fl*1.7);wave=0.45+0.55*wave*wave;",
  "    float edge=smoothstep(-0.010,0.003,dy)*exp(-max(dy,0.0)/(0.075+0.03*fl));float a=edge*(0.30+0.70*ry)*wave*(0.66-fl*0.14);",
  "    vec3 c=mix(vec3(0.96,0.58,1.0),vec3(0.52,0.30,0.98),smoothstep(0.0,0.07,dy));c=mix(c,vec3(0.32,0.16,0.76),smoothstep(0.06,0.20,dy));col+=c*a;}",
  "  return col;}",
  "vec3 skyBase(float up){vec3 c;if(uN>0.5){c=mix(vec3(0.22,0.13,0.44),vec3(0.03,0.02,0.09),pow(max(up,0.0),0.40));c+=vec3(0.36,0.18,0.62)*exp(-max(up,0.0)*12.0)*0.55;}",
  "  else{c=mix(vec3(1.0,0.975,1.0),vec3(0.50,0.58,1.0),smoothstep(0.0,0.24,max(up,0.0)))*1.28;c+=vec3(1.0,0.86,0.95)*exp(-max(up,0.0)*14.0)*0.18;}return c;}",
  "vec3 fogC(){return skyBase(0.07);}",
  "vec3 sky(vec3 w){float up=w.y;float el=asin(clamp(up,-1.0,1.0));float az=atan(w.x,-w.z);vec3 c=skyBase(up);",
  "  if(uN>0.5){c+=auroraSky(w)*1.65;c+=vec3(0.95,0.92,1.0)*stars(w)*smoothstep(0.035,0.12,up)*1.6;}",
  "  else{vec3 L=normalize(vec3(-0.5,0.35,-0.8));float s=max(dot(w,L),0.0);c+=vec3(1.0,0.97,0.92)*(pow(s,24.0)*0.5+pow(s,4.0)*0.14);",
  "    if(up>0.0){vec2 cp=w.xz/(up+0.10)*0.85+vec2(uT*0.006,0.0);float cl=fbm(cp*0.9);float m=smoothstep(0.46,0.66,cl)*smoothstep(0.0,0.08,up);",
  "      float lit=smoothstep(0.46,0.72,cl+0.08*vn2(cp*3.1));vec3 cc=mix(vec3(0.93,0.91,1.0)*1.32,vec3(1.0,0.995,1.0)*1.62,lit);c=mix(c,cc,m*0.95);}}",
  "  float hh=hills(az);if(el<hh&&el>-0.03){float k=clamp(el/max(hh,0.001),0.0,1.0);vec3 hc=uN>0.5?mix(vec3(0.17,0.10,0.33),vec3(0.11,0.07,0.23),k):mix(skyBase(0.0)*0.97,vec3(0.70,0.70,0.95)*1.18,0.35+0.4*k);",
  "    float hz=smoothstep(hh,hh-0.005,el);c=mix(c,hc,(uN>0.5?0.94:0.85)*hz);}",
  "  return c;}",
  /* each stone: a smooth pebble, an ellipsoid turned and set in the water */
  "float mist(vec3 p){vec2 q=p.xz*vec2(0.85,0.55)+vec2(uT*0.045,uT*0.011);float m=vn(vec3(q,uT*0.02))*0.65+vn(vec3(q*2.3,uT*0.035+5.0))*0.35;return smoothstep(0.36,0.84,m)*exp(-max(p.y,0.0)*10.0);}",
  "vec3 mistC(){return mix(vec3(0.98,0.96,1.0),vec3(0.36,0.24,0.58),uN);}",
  "vec3 rL(vec3 d,float ang){float c=cos(ang),s=sin(ang);return vec3(c*d.x+s*d.z,d.y,-s*d.x+c*d.z);}",
  "vec3 rW(vec3 d,float ang){float c=cos(ang),s=sin(ang);return vec3(c*d.x-s*d.z,d.y,s*d.x+c*d.z);}",
  "float hitS(vec3 ro,vec3 rd,vec4 a,vec4 b,out vec3 nW,out vec3 pl){vec3 R=vec3(a.z,b.y,a.w);vec3 o=rL(ro-vec3(a.x,b.x,a.y),b.z)/R,d=rL(rd,b.z)/R;",
  "  float A=dot(d,d),B=dot(o,d),C=dot(o,o)-1.0,h=B*B-A*C;if(h<0.0)return 1e9;float t=(-B-sqrt(h))/A;if(t<0.0)return 1e9;vec3 pu=o+d*t;pl=pu*R;",
  "  vec3 nl=pu/R;nW=normalize(rW(nl,b.z));return t;}",
  "float hitStones(vec3 ro,vec3 rd,out vec3 n,out vec3 pl,out float id){float tb=1e9;id=-1.0;n=vec3(0.0,1.0,0.0);pl=vec3(0.0);",
  "  for(int i=0;i<5;i++){vec3 nn,pp;float t=hitS(ro,rd,uS[i],uS2[i],nn,pp);if(t<tb){vec3 pw=ro+rd*t;if(pw.y>-0.02){tb=t;n=nn;pl=pp;id=float(i);}}}return tb;}",
  "vec3 shadeStone(vec3 p,vec3 n,vec3 pl,float id,vec3 rd,float refl){",
  "  float g=vn(pl*9.0+id*7.0)*0.6+vn(pl*23.0+id*3.0)*0.4;n=normalize(n+(vec3(vn(pl*6.0+1.0),vn(pl*6.0+2.0),vn(pl*6.0+3.0))-0.5)*0.22);",
  "  float k=id<uCur-0.5?0.0:(abs(id-uCur)<0.5?1.0:2.0);",
  "  vec3 al=k<0.5?mix(vec3(0.50,0.38,0.80),vec3(0.38,0.24,0.68),uN):(k<1.5?mix(vec3(0.93,0.90,0.99),vec3(0.84,0.78,0.99),uN):mix(vec3(0.70,0.62,0.92),vec3(0.32,0.29,0.46),uN));",
  "  al*=0.80+0.40*g;al+=vec3(0.035)*step(0.80,vn(pl*88.0+id))-vec3(0.03)*step(0.82,vn(pl*67.0+id*5.0));",
  "  float wet=1.0-smoothstep(0.0,0.028,p.y);al*=1.0-0.42*wet;",
  "  vec3 L=normalize(vec3(-0.5,0.62,0.35));float di=max(dot(n,L),0.0);vec3 amb=mix(vec3(0.42,0.40,0.52),vec3(0.16,0.12,0.30),uN);float ao=0.50+0.50*smoothstep(-0.65,0.45,n.y);",
  "  vec3 c=al*(amb+di*mix(vec3(1.0,0.98,0.96)*1.02,vec3(0.86,0.70,1.0)*0.95,uN))*ao;float rim=pow(1.0-max(dot(-rd,n),0.0),3.0);c+=mix(vec3(0.95,0.92,1.0)*0.22,vec3(0.70,0.42,1.0)*0.55,uN)*rim*smoothstep(-0.2,0.6,n.y);",
  "  vec3 r=reflect(rd,n);float fz=0.04+0.96*pow(1.0-max(dot(-rd,n),0.0),5.0);float gl=mix(0.45,0.95,wet);",
  "  c+=sky(r)*fz*gl*1.3+pow(max(dot(r,L),0.0),mix(40.0,110.0,wet))*mix(0.45,0.85,wet)*mix(vec3(1.0),vec3(0.88,0.80,1.0),uN);",
  "  if(k>0.5&&k<1.5){c+=mix(vec3(0.10,0.09,0.14),vec3(0.20,0.15,0.34),uN)*pow(1.0-max(dot(-rd,n),0.0),2.0)*1.4;}",
  "  return c*refl;}",
  /* the water's surface: a slow swell, the lapping round each stone, and the rings */
  "float wh(vec2 p){float h=0.006*sin(p.x*2.1+uT*0.6)+0.005*sin(p.y*2.7-uT*0.5+p.x*0.6)+0.0035*sin((p.x+p.y)*4.3+uT*0.9);",
  "  h+=0.0016*sin(dot(p,vec2(9.0,4.0))+uT*1.6)+0.0013*sin(dot(p,vec2(-5.0,8.5))+uT*1.25)+0.0009*sin(dot(p,vec2(13.0,-6.0))+uT*2.1);",
  "  for(int i=0;i<5;i++){if(uS2[i].x<-1.0)continue;vec2 c=uS[i].xy;float yk=uS2[i].x/uS2[i].y;float wl=sqrt(max(0.05,1.0-yk*yk));float rr=length((p-c)/vec2(uS[i].z,uS[i].w))/wl;float r=length(p-c);",
  "    h+=0.005*sin(r*34.0-uT*2.2+float(i))*exp(-max(0.0,rr-1.0)*1.6)*step(1.0,rr);}",
  "  for(int j=0;j<6;j++){vec4 R=uRp[j];float age=uT-R.z;if(age>0.0&&age<6.0){float r=length(p-R.xy);float rad=age*0.55;",
  "    h+=R.w*exp(-pow((r-rad)/0.13,2.0))*sin((r-rad)*28.0)*exp(-age*0.5)*smoothstep(0.0,0.3,age);}}",
  "  {float age=uT-uSw.z;if(age>0.0&&age<7.0){vec2 d=p-uSw.xy;float r=length(d);h+=uSw.w*exp(-age*0.45)*sin(r*20.0-age*2.6+atan(d.y,d.x)*3.0)*exp(-max(0.0,r-0.32)*1.3)*smoothstep(0.0,0.4,age)*smoothstep(0.2,0.4,r);}}",
  "  return h;}",
  "vec3 tm(vec3 c){return 1.0-exp(-c*mix(1.75,1.38,uN));}",
  "void main(){vec2 sp=(v*2.0-1.0)*vec2(uAsp,1.0)*uTan+vec2(uOx,0.0);vec3 rd=normalize(uCM*vec3(sp,-1.0)),ro=uCP;",
  "  vec3 n,pl;float id;float ts=hitStones(ro,rd,n,pl,id);float tw=rd.y<0.0?-ro.y/rd.y:1e9;vec3 col;float a=1.0;",
  "  if(ts<tw){vec3 p=ro+rd*ts;col=shadeStone(p,n,pl,id,rd,1.0);float dist=ts;col=mix(col,mistC(),mist(p)*mix(0.03,0.16,smoothstep(1.0,5.0,dist)));col=mix(col,fogC(),1.0-exp(-max(0.0,dist-5.0)*0.10));}",
  "  else if(tw<1e8){vec3 p=ro+rd*tw;float e=0.012;float hx=wh(p.xz+vec2(e,0.0))-wh(p.xz-vec2(e,0.0)),hz=wh(p.xz+vec2(0.0,e))-wh(p.xz-vec2(0.0,e));",
  "    vec3 wn=normalize(vec3(-hx/(2.0*e),1.0,-hz/(2.0*e)));vec3 r=reflect(rd,wn);",
  "    vec3 n2,pl2;float id2;float t2=hitStones(p+wn*0.002,r,n2,pl2,id2);vec3 rc=t2<1e8?shadeStone(p+r*t2,n2,pl2,id2,r,0.9):sky(r);",
  "    float F=0.02+0.98*pow(1.0-max(dot(-rd,wn),0.0),5.0);vec3 deep=mix(vec3(0.50,0.48,0.76),vec3(0.03,0.025,0.08),uN);",
  "    float ao=1.0;for(int i=0;i<5;i++){if(uS2[i].x<-1.0)continue;float yk=uS2[i].x/uS2[i].y;float wl=sqrt(max(0.05,1.0-yk*yk));float rr=length((p.xz-uS[i].xy)/vec2(uS[i].z,uS[i].w));ao*=mix(0.5,1.0,smoothstep(wl,wl+0.5,rr));}",
  "    col=mix(deep*ao,rc,clamp(F*2.4+mix(0.42,0.12,uN),0.0,1.0))*mix(1.0,ao,0.5);",
  "    vec3 L=normalize(vec3(-0.5,0.35,-0.8));col+=pow(max(dot(r,L),0.0),140.0)*mix(vec3(1.0),vec3(0.85,0.78,1.0),uN)*1.4;",
  "    {float age=uT-uGl.z;if(age>0.0&&age<3.0){vec2 d=p.xz-uGl.xy;float rr=length(d);float g=exp(-pow((rr-0.3-age*0.85)/0.05,2.0))*exp(-age*0.9)*(0.55+0.45*sin(atan(d.y,d.x)*18.0+age*3.0));col+=mix(vec3(1.0,0.98,0.95),vec3(0.86,0.78,1.0),uN)*g*0.55;}}",
  "    float dist=tw;col=mix(col,mistC(),mist(p)*mix(0.03,0.16,smoothstep(1.0,5.0,dist)));float fog=1.0-exp(-max(0.0,dist-3.0)*0.085);col=mix(col,fogC(),fog);",
  "    a=1.0;}",
  "  else{col=sky(rd);a=1.0;}",
  "  col=tm(col);float fe=smoothstep(0.0,0.26,v.x);gl_FragColor=vec4(col*fe,fe);}"].join("\n");
  function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
  function init(){try{gl=cv.getContext("webgl",{premultipliedAlpha:true,alpha:true,antialias:false,powerPreference:"low-power"})||cv.getContext("experimental-webgl");}catch(e){gl=null;}if(!gl)return false;
    try{pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));}catch(e){W.__stonesErr=String(e);return false;}
    gl.useProgram(pr);var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    var loc=gl.getAttribLocation(pr,"p");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    ["uT","uN","uAsp","uTan","uOx","uCP","uCM","uCur","uOver","uSw","uGl"].forEach(function(n){U[n]=gl.getUniformLocation(pr,n);});U.uS=gl.getUniformLocation(pr,"uS[0]");U.uS2=gl.getUniformLocation(pr,"uS2[0]");U.uRp=gl.getUniformLocation(pr,"uRp[0]");
    gl.uniform3fv(U.uCP,new Float32Array(CP));gl.uniformMatrix3fv(U.uCM,false,new Float32Array([CR[0],CR[1],CR[2],CU[0],CU[1],CU[2],-CF[0],-CF[1],-CF[2]]));gl.uniform1f(U.uTan,TAN);gl.uniform1f(U.uAsp,W0/H0);gl.uniform1f(U.uOx,OX);return true;}
  function measure(){if(!host)return false;var w=Math.max(200,host.clientWidth||520),h=Math.max(160,host.clientHeight||424);if(w===W0&&h===H0)return false;W0=w;H0=h;OX=-0.24*(W0/H0)*TAN;
    if(gl){gl.uniform1f(U.uAsp,W0/H0);gl.uniform1f(U.uOx,OX);}return true;}
  function size(){var d=Math.min(Math.min(2,Math.max(1,W.devicePixelRatio||1)),Math.sqrt(900000/(W0*H0)))*q;var w=Math.round(W0*d),h=Math.round(H0*d);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}}
  function proj(P){var vv=sub(P,CP),z=dot(vv,CF);var x=(dot(vv,CR)/z-OX)/TAN/(W0/H0),y=dot(vv,CU)/z/TAN;return [(x+1)/2*W0,(1-(y+1)/2)*H0,z];}
  function night(){return D.body.getAttribute("data-theme")==="night";}
  function still(){return D.body.getAttribute("data-motion")==="minimal"||(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}
  function ring(i,amp,t){rips.push([S[i][0],S[i][1],t,amp]);if(rips.length>6)rips.shift();}
  /* a stone pressed answers in one of its ways, as Home's engine button does (never the same twice running; every seventh, the whole path) */
  var FL=["ring","double","hop","swirl","glint","bloom"],lastF="",count=0,hop=[-9,-9,-9,-9,-9],SW=[0,0,-99,0],GL=[0,0,-99,0];
  function now(){return (performance.now()-t0)/1000;}
  function flourish(i){var t=now();count++;var name=count%7===0?"chain":(function(){var c=FL.filter(function(n){return n!==lastF;});return c[Math.floor(Math.random()*c.length)];})();lastF=name;
    if(name==="ring"){dip[i]=0.02;ring(i,0.014,t);}
    else if(name==="double"){dip[i]=0.016;ring(i,0.011,t);setTimeout(function(){ring(i,0.009,now());},300);}
    else if(name==="hop"){hop[i]=t;setTimeout(function(){ring(i,0.016,now());},430);}
    else if(name==="swirl"){dip[i]=0.01;SW=[S[i][0],S[i][1],t,0.009];}
    else if(name==="glint"){GL=[S[i][0],S[i][1],t,1];ring(i,0.007,t);}
    else if(name==="bloom"){dip[i]=0.032;ring(i,0.012,t);setTimeout(function(){ring(i,0.006,now());},180);}
    else{for(var k=0;k<cnt;k++)(function(k){setTimeout(function(){dip[k]=0.018;ring(k,0.010,now());},Math.abs(k-i)*320);})(k);}
    try{if(W.IngNature)W.IngNature.touch(name,i);}catch(x){}host.setAttribute("data-flourish",name);kick();}
  function frame(ts){raf=0;if(!vis||!shown||!ok)return;var t=(ts-t0)/1000,st=still(),gap=(overI>=0||t-Math.max(SW[2],GL[2],Math.max.apply(null,hop))<3)?16:33;if(ts-lastDraw<gap){raf=requestAnimationFrame(frame);return;}
    if(lastDraw){if(ts-lastDraw>gap*1.9)slowN++;else slowN=Math.max(0,slowN-1);if(slowN>12&&q>0.7&&!W.__keepQ){q=Math.max(0.7,q*0.85);slowN=0;size();}}lastDraw=ts;
    /* the step in hand sends out a ring every seven seconds, Home's clock */
    if(!st&&t-lastRing>7){lastRing=t;ring(Math.max(0,Math.min(cnt-1,cur)),0.013,t);}
    var a=[],b=[],r=[];for(var i=0;i<N;i++){lift[i]+=((i===overI?0.016:0)-lift[i])*0.18;dip[i]*=0.88;var hp=t-hop[i],hl=hp>0&&hp<0.45?0.05*Math.sin(Math.PI*hp/0.45):0;var bob=st?0:Math.sin(t*2*Math.PI/7+i*0.9)*0.004;
      a.push(S[i][0],S[i][1],S[i][2],S[i][3]);b.push(i<cnt?S[i][4]*REST+lift[i]-dip[i]+bob+hl:-9,S[i][4],S[i][5],0);}
    for(var j=0;j<6;j++){var R=rips[j];if(R)r.push(R[0],R[1],R[2],R[3]);else r.push(0,0,-99,0);}
    gl.viewport(0,0,cv.width,cv.height);gl.uniform1f(U.uT,st?2.0:t);gl.uniform1f(U.uN,night()?1:0);gl.uniform1f(U.uCur,cur);gl.uniform1f(U.uOver,overI);
    gl.uniform4fv(U.uS,new Float32Array(a));gl.uniform4fv(U.uS2,new Float32Array(b));gl.uniform4fv(U.uRp,new Float32Array(r));gl.uniform4fv(U.uSw,new Float32Array(SW));gl.uniform4fv(U.uGl,new Float32Array(GL));gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    if(!st||overI>=0||dip.some(function(x){return x>0.002;}))raf=requestAnimationFrame(frame);}
  function kick(){if(!raf)raf=requestAnimationFrame(frame);}
  function hit(p){for(var i=0;i<cnt;i++){var my=S[i][4]*(REST+0.3),c=proj([S[i][0],my,S[i][1]]),e=proj([S[i][0]+S[i][2],my,S[i][1]]),rw=Math.abs(e[0]-c[0])*1.05+6,rh=rw*0.52;
      var u=(p.x-c[0])/rw,vv=(p.y-c[1])/rh;if(u*u+vv*vv<1)return i;}return -1;}
  function mount(el){host=el;cv=D.createElement("canvas");cv.className="fc-cv";host.appendChild(cv);if(W.matchMedia&&matchMedia("(pointer: coarse)").matches)q=0.75;measure();size();ok=init();if(!ok){host.setAttribute("data-nogl","1");return;}
    W.addEventListener("resize",function(){if(measure()){size();kick();}});
    function at(e){var r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*W0,y:(e.clientY-r.top)/r.height*H0};}
    host.addEventListener("pointermove",function(e){var i=hit(at(e));if(i!==overI){overI=i;cv.style.cursor=i>=0?"pointer":"default";kick();}});
    host.addEventListener("pointerleave",function(){overI=-1;kick();});
    host.addEventListener("pointerdown",function(e){var i=hit(at(e));if(i<0)return;if(e.pointerType!=="mouse"){overI=i;setTimeout(function(){overI=-1;kick();},420);}flourish(i);});
    try{new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)kick();}).observe(host);}catch(e){}
    D.addEventListener("visibilitychange",function(){shown=!D.hidden;if(shown)kick();});kick();}
  return {mount:mount,theme:kick,kick:kick,resize:function(){if(measure()){size();}kick();},q:function(){return q;},
    setSteps:function(n,c){n=Math.max(1,Math.min(N,n|0));if(n===cnt&&c===cur)return;cnt=n;cur=c;kick();},state:function(){return {cnt:cnt,cur:cur,w:W0,h:H0,q:q,ok:ok};}};})();




/* ---------- the header, made as the other studios' are ---------- */
var page=null,HD=null,tag=null,MOUNTED=false,LAST="",OBS=null;
var SUN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/></svg>';
function KIT(){return W.IngStudios&&IngStudios.kit||null;}
function $(id){return D.getElementById(id);}
function setText(e,s){if(e&&e.textContent!==s)e.textContent=s;}
function short(s,n){s=String(s==null?"":s).replace(/\s+/g," ").trim();if(s.length<=n)return s;var t=s.slice(0,n-1),sp=t.lastIndexOf(" ");return (sp>n*0.6?t.slice(0,sp):t)+"\u2026";}
/* the task in hand, read from the page as it is (Work, Steps); nothing is written */
function now(){var t=null,i=-1;try{if(typeof W.taskCur==="function")t=W.taskCur();if(t&&typeof W.taskNext==="function")i=W.taskNext(t);}catch(e){t=null;}
  var n=t&&Array.isArray(t.steps)?t.steps.length:0;return {t:t,n:n,i:i};}
function paint(){if(!tag)return;var s=now(),cnt=5,cur=0,b="One step at a time",sm="Nothing planned yet";
  if(s.n&&s.i<0){cnt=Math.min(5,s.n);cur=99;b="Every step done";sm=short(s.t.title||"Your task",40);}
  else if(s.n){var s0=Math.max(0,Math.min(s.i-1,s.n-5));cnt=Math.min(5,s.n-s0);cur=s.i-s0;b="Step "+(s.i+1)+" of "+s.n;sm=short((s.t.steps[s.i]||{}).t||"",44);}
  Stones.setSteps(cnt,cur);if(b+"|"+sm===LAST)return;LAST=b+"|"+sm;setText(tag.querySelector("b"),b);setText(tag.querySelector("small"),sm);
  HD.obj.setAttribute("aria-label","Stepping stones across still water. "+b+(sm?": "+sm:"")+".");}
/* the keys never move the page (her word, 6.95); what they open is said when it is out of sight */
function said(el,words){try{var r=el&&el.getBoundingClientRect();if(r&&(r.top>W.innerHeight-60||r.bottom<60)&&typeof W.ingToast==="function")W.ingToast(words);}catch(e){}}
function today(){try{if(W.IngFocusParts)W.IngFocusParts.show("today",true);}catch(e){}said(page&&page.querySelector(".fx-grid"),"Today is open, below the stones.");}
function routines(){try{if(W.IngFocusParts)W.IngFocusParts.show("today",true);}catch(e){}said($("fxRoutinesHost")||(page&&page.querySelector(".fx-grid")),"Your routines are open, below the stones.");}
function build(){var K=KIT();page=$("page-focus");if(!K||!page)return false;if(HD&&HD.el.isConnected)return true;
  var ld=page.querySelector(":scope > .lede"),at=page.querySelector(":scope > .fxp-bar")||page.querySelector(":scope > .fx-grid");
  var lede=(ld&&ld.textContent.trim())||"Support that fits how you work: one step at a time, time you can see, a calm screen when you need it, and clear words. Change any of it, or switch it off, here or in Settings, under Support.";
  HD=K.hero({title:"Focus",eyebrow:"Focus \u00b7 one step at a time",lede:lede,
    keys:[{pri:true,ico:SUN,txt:"Open Today",id:"fcToday",fn:today},{ico:K.ICO.rout,txt:"Your routines",id:"fcRoutines",fn:routines}],
    says:"Time you can see, the day's steps one at a time, and a calm sound when you need it.",
    hint:"The stone in the light is your step; the darker ones behind are done. Press a stone and the water answers."});
  HD.hint.innerHTML="The stone in the light is your step; the darker ones behind are done. <b>Press a stone</b> and the water answers, a little differently each time.";
  HD.obj.classList.add("fc-pool");HD.obj.setAttribute("role","img");HD.obj.setAttribute("aria-label","Stepping stones across still water");
  tag=K.label(HD.obj,0,0,0,1,"","","fc-label");tag.style.left="";tag.style.top="";tag.classList.remove("at-b");
  if(at)page.insertBefore(HD.el,at);else page.appendChild(HD.el);return true;}
function watchSteps(){if(OBS)return;var h=$("fxSteps")||$("fxStepsCard");if(!h||typeof MutationObserver!=="function")return;
  OBS=new MutationObserver(function(){paint();});OBS.observe(h,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["class","aria-checked","checked"]});}
function on(){page=$("page-focus");if(!page||!KIT())return;page.classList.add("sk-on");if(!build())return;
  if(!MOUNTED){MOUNTED=true;Stones.mount(HD.obj);}watchSteps();paint();Stones.resize();}
var og=W.go;if(typeof og==="function")W.go=function(p){var r=og.apply(this,arguments);try{if(p==="focus")setTimeout(on,0);}catch(e){}return r;};
function first(){try{var p=$("page-focus");if(p&&p.classList.contains("active"))on();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(first,0);});else setTimeout(first,0);
try{new MutationObserver(function(){if(MOUNTED)Stones.kick();}).observe(D.body,{attributes:true,attributeFilter:["data-theme","data-motion"]});}catch(e){}
W.IngStones={on:on,paint:paint,state:function(){var s=MOUNTED?Stones.state():null;return {head:!!(HD&&HD.el.isConnected),mounted:MOUNTED,stones:s,label:tag?[tag.querySelector("b").textContent,tag.querySelector("small").textContent]:null};},kick:function(){Stones.kick();}};
try{window.__ingParts["p291"]="running";}catch(_){}
})();
</script>