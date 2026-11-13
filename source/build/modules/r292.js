<style id="r292-css">
/* ============ R292 · BUILD'S HEADER: THE DIAMOND (Ingenium 7.00, 13 November 2026) ============
   Her words (13 November 2026), on the live preview of the Build and Focus heads: "I want you to use the code and designs from this live
   preview and make the following changes and edits to Ingenium. Please redo the Day mode diamond and make it look like a proper clear
   crystal diamond reflecting light and sparkles or at least give me a lighter purple version of the Night mode diamond for the day mode
   look. I want the 4 rays to move around the crystal and not just be locked in the same position ... I want the animation of the light
   rays to be moving through the crystal really fast like a ray of light shooting through. Please remove the rays and keep the shooting
   light that passes through and its sparkling effects that illuminates the entire crystal and make it sparkle." Earlier: only Ingenium's
   own sounds (the preview's are gone), and the northern lights in violet and purple only.
   So Build opens, as Lector, Vocatio and Fabrica do, on their header (modules/r290.js, IngStudios.kit): eyebrow, title, the page's own
   words, two keys (Run your page, Load a sample), a line and a hint; the page's code and preview stay as they are below it. Its
   instrument is the diamond (see the note in the script). Nothing in the page is rewritten while it is left alone: the label beside the
   diamond changes only when the code or the Run as I type switch does. */
#page-build.sk-on{--sk-ink1:#221a2e;--sk-ink2:#4a4358;--sk-ink3:#6c6579;--sk-hair:rgba(34,26,46,.10);--sk-hair2:rgba(34,26,46,.06);--sk-acc:#6a3fb5;
  --sk-hi:#ffffff;--sk-lo:#faf8fc;--sk-keyA:#ffffff;--sk-keyB:#f6f2fb;--sk-pa:#7a50c6;--sk-pb:#5d37a1;--sk-pedge:#3a2070;
  --sk-slab:inset 0 1px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.10),0 3px 0 rgba(40,22,68,.05),0 6px 12px rgba(40,22,68,.07),0 18px 36px rgba(40,22,68,.08);
  --sk-key:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.1);
  --sk-keyhi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --sk-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);
  --sk-desk:radial-gradient(ellipse 75% 85% at 72% 42%,#fdfbff 0%,#f4eff9 52%,#e9e1f4 100%);--sk-ring:rgba(106,63,181,.10);--sk-line:rgba(106,63,181,.30);
  --sk-edge0:#d8cdee;--sk-edge1:#c4b5e3;--sk-under:rgba(40,22,68,.2);--sk-under2:rgba(40,22,68,.12);--sk-under3:rgba(40,22,68,.04);
  --sk-serif:"Home Cormorant","Cormorant Garamond",Cormorant,"Iowan Old Style",Palatino,Georgia,serif;
  --sk-paper:#fdfbf8;--sk-paper2:#f3eef8;--sk-rule:rgba(106,63,181,.08);--sk-tab:#fbf9fd;--sk-paperink:#2f2640;
  --sk-band0:#f4effb;--sk-band1:#c9b6ee;--sk-band2:#9068d6;--sk-stem0:#efe9f8;--sk-stem1:#b8afd0;--sk-bez-ink:rgba(70,44,120,.3);--sk-pearl:#dccff4;--sk-frame:rgba(106,63,181,.16);--sk-txt:rgba(34,26,46,.09)}
body[data-theme="night"] #page-build.sk-on{--sk-ink1:#f3eefb;--sk-ink2:#d3c9e3;--sk-ink3:#a99cc1;--sk-hair:rgba(205,184,240,.12);--sk-hair2:rgba(205,184,240,.07);--sk-acc:#b79ce6;
  --sk-hi:#211a2d;--sk-lo:#1b1526;--sk-keyA:#2a2239;--sk-keyB:#231c31;--sk-pedge:#170b30;
  --sk-slab:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 3px 0 rgba(0,0,0,.28),0 6px 12px rgba(0,0,0,.35),0 18px 36px rgba(0,0,0,.4);
  --sk-key:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5),0 9px 14px rgba(0,0,0,.36);
  --sk-keyhi:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.38);
  --sk-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);
  --sk-desk:radial-gradient(ellipse 75% 85% at 72% 42%,#241a37 0%,#171025 52%,#0d0916 100%);--sk-ring:rgba(205,184,240,.10);--sk-line:rgba(196,176,238,.30);
  --sk-edge0:#120d20;--sk-edge1:#0c0816;--sk-under:rgba(0,0,0,.6);--sk-under2:rgba(0,0,0,.36);--sk-under3:rgba(0,0,0,.1);
  --sk-paper:#2a2238;--sk-paper2:#221b2f;--sk-rule:rgba(205,184,240,.08);--sk-tab:#2f2640;--sk-paperink:#ece4f8;
  --sk-band0:#6f5d9c;--sk-band1:#4f3d7f;--sk-band2:#8d6ad6;--sk-stem0:#5a4c80;--sk-stem1:#221a39;--sk-bez-ink:rgba(10,4,26,.55);--sk-pearl:#e4d9f8;--sk-frame:rgba(205,184,240,.14);--sk-txt:rgba(236,228,248,.09)}
#page-build.sk-on > .page-title,#page-build.sk-on > .lede{display:none !important}
#page-build.sk-on .skh-stage{display:none}
#page-build.sk-on .bd-cv{position:absolute;left:0;top:0;width:520px;height:424px;display:block;transition:transform .3s cubic-bezier(.34,1.35,.64,1);-webkit-tap-highlight-color:transparent}
#page-build.sk-on .bd-cv.ov{pointer-events:none}
#page-build.sk-on .bd-cv.down{transform:scale(.985)}
#page-build.sk-on .skh{margin-bottom:14px}
body[data-motion="minimal"] #page-build.sk-on .bd-cv{transition:none}
@media (prefers-reduced-motion:reduce){#page-build.sk-on .bd-cv{transition:none}}
/* a phone or a narrow window: the diamond under the words, scaled to the width there is (modules/r296.js) */
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p292"]="started";}catch(_){}
/* R292 · Build's header, the diamond: see the note at the top of its styles */
(function r292(){
"use strict";
if(window.__r292)return;window.__r292=1;
var D=document,W=window;
/* ---------- the diamond: a round brilliant, light shooting through it, under the northern lights ----------
   Drawn by the graphics chip (WebGL 1): the stone is traced as it is, a convex solid of 73 facets; each ray that meets it reflects by
   Fresnel's law, refracts in at diamond's index, bounces inside and refracts out in three wavelengths, which is a diamond's fire. By day
   the room is a lighter violet with deep panels and strong lights, so the stone reads as clear crystal touched with Ingenium's violets; by
   night it is the deep violet room with the aurora in it. Every few seconds a light shoots through the stone in under half a second, each
   time from a new side: it strikes the crown, lights the whole stone from within, sets its facets sparkling, and leaves in three thin
   streaks; no ray stands in the air. A press sends one at once. Behind: the northern lights in violet and purple only. It draws only while
   in view and while the window is shown, thirty frames a second at rest, at a lower resolution on a slower device. */
var Diamond=(function(){
  var W0=520,H0=424,host,cv,gl,pr,ov,og,raf=0,vis=true,shown=true,ok=false,U={},q=1,lastDraw=0,slowN=0,t0=performance.now(),
      yaw=0,tx=0,tz=0,gx=0,gz=0,over=false,press=-99,mX=0,mY=0;
  var CP=[0,1.62,6.9],TG=[0,0.80,0],FOV=30*Math.PI/180,PER=3.4;
  function sub(a,b){return [a[0]-b[0],a[1]-b[1],a[2]-b[2]];}function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
  function nrm(a){var l=Math.sqrt(dot(a,a))||1;return [a[0]/l,a[1]/l,a[2]/l];}function crs(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
  var CF=nrm(sub(TG,CP)),CR=nrm(crs(CF,[0,1,0])),CU=crs(CR,CF),TAN=Math.tan(FOV/2);
  var R=1,G=0.012,HT=0.31,AT=0.53,D2R=Math.PI/180;
  function grp(az,slope,down,px,py,pz){var a=az*D2R,s=slope*D2R,n=[Math.sin(s)*Math.cos(a),(down?-1:1)*Math.cos(s),Math.sin(s)*Math.sin(a)];return [n[0],n[1],n[2],n[0]*px+n[1]*py+n[2]*pz];}
  function onR(az,slope,down,r,y){var a=az*D2R;return grp(az,slope,down,r*Math.cos(a),y,r*Math.sin(a));}
  var GROUPS=[onR(0,34.5,false,R,G),onR(22.5,21.5,false,AT,HT),onR(11.25,41,false,R,G),onR(33.75,41,false,R,G),[1,0,0,R],[Math.cos(22.5*D2R),0,Math.sin(22.5*D2R),R],
    onR(0,40.75,true,R,-G),onR(11.25,42,true,R,-G),onR(33.75,42,true,R,-G)];
  function rotM(){var cy=Math.cos(yaw),sy=Math.sin(yaw),cx=Math.cos(tx),sx=Math.sin(tx),cz=Math.cos(tz),sz=Math.sin(tz);
    var Ry=[[cy,0,sy],[0,1,0],[-sy,0,cy]],Rx=[[1,0,0],[0,cx,-sx],[0,sx,cx]],Rz=[[cz,-sz,0],[sz,cz,0],[0,0,1]];
    function mul(A,B){var C=[[0,0,0],[0,0,0],[0,0,0]];for(var i=0;i<3;i++)for(var j=0;j<3;j++)for(var k=0;k<3;k++)C[i][j]+=A[i][k]*B[k][j];return C;}return mul(Rz,mul(Rx,Ry));}
  var VS="attribute vec2 p;varying vec2 v;void main(){v=p*0.5+0.5;gl_Position=vec4(p,0.0,1.0);}";
  var FS=["precision highp float;varying vec2 v;",
  "uniform float uT,uN,uP,uAsp,uTan,uY,uF,uLv,uMv;uniform vec3 uCP,uDC,uA;uniform mat3 uCM,uR;uniform vec4 uG[9];uniform float uTab;",
  "const float IOR=2.42;",
  "float sbox(vec3 w,vec3 ax,vec2 hs,float sf){float d=dot(w,ax);if(d<=0.05)return 0.0;vec3 u=normalize(cross(vec3(0.0,1.0,0.0),ax)+vec3(0.0,0.0,1e-4));vec3 vv=cross(ax,u);",
  "  vec2 p=vec2(dot(w,u),dot(w,vv))/d;vec2 q=1.0-smoothstep(hs*(1.0-sf),hs,abs(p));return q.x*q.y;}",
  "float h1(float n){return fract(sin(n)*43758.5453);}",
  "float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);float n=i.x+i.y*57.0;return mix(mix(h1(n),h1(n+1.0),f.x),mix(h1(n+57.0),h1(n+58.0),f.x),f.y);}",
  /* the day: a white studio with a few deep panels; the night: the violet room with the aurora in it */
  /* clear crystal by day, after her picture of the clear diamond on white: white light above, a ring of dark cards round the horizon with
     white between them (so the facets near the girdle read black and white, as a real stone's do), a cool steel-blue floor, the dark card
     behind the eye, crisp key lights */
  "vec3 envC(vec3 w){float up=w.y;float az=atan(w.x,-w.z);vec3 c=mix(vec3(1.9,1.92,2.0),vec3(3.0,3.0,3.1),smoothstep(0.0,0.7,up));",
  "  float ring=1.0-smoothstep(0.16,0.30,abs(up-0.02));float cards=1.0-smoothstep(0.05,0.12,abs(fract(az/6.2832*6.0+0.1)-0.5)-0.16);c=mix(c,vec3(0.03,0.04,0.10),ring*cards*0.95);",
  "  c=mix(c,mix(vec3(0.55,0.68,1.0)*1.6,vec3(0.10,0.14,0.30),smoothstep(-0.2,-0.9,up)),smoothstep(0.02,-0.25,up));",
  "  c=mix(c,vec3(0.02,0.03,0.07),sbox(w,normalize(vec3(0.0,0.30,1.0)),vec2(0.16,0.12),0.15)*0.95);",
  "  c+=sbox(w,normalize(vec3(-0.55,0.66,0.52)),vec2(0.18,0.30),0.12)*14.0+sbox(w,normalize(vec3(0.05,1.0,0.12)),vec2(0.30,0.30),0.15)*6.0+sbox(w,normalize(vec3(0.78,0.30,0.55)),vec2(0.06,0.40),0.12)*8.0+sbox(w,normalize(vec3(-0.85,0.12,-0.5)),vec2(0.05,0.30),0.12)*5.0;return c;}",
  /* purple by day: the night's violet room made lighter, with the night's bright lights (her words: "a lighter purple version of the Night
     mode diamond for the day mode look") */
  "vec3 envV(vec3 w){float up=w.y;vec3 c=mix(vec3(0.30,0.18,0.56),vec3(0.94,0.80,1.24),smoothstep(-0.25,0.85,up));c*=mix(1.0,0.58,smoothstep(0.02,-0.45,up));",
  "  float dk=sbox(w,normalize(vec3(0.97,0.05,-0.22)),vec2(0.17,0.75),0.5)+sbox(w,normalize(vec3(-0.94,0.0,-0.34)),vec2(0.15,0.7),0.5)",
  "    +sbox(w,normalize(vec3(0.30,0.12,-0.95)),vec2(0.15,0.30),0.5)+sbox(w,normalize(vec3(-0.30,0.10,-0.95)),vec2(0.13,0.25),0.5)+0.9*sbox(w,normalize(vec3(0.0,0.30,1.0)),vec2(0.12,0.10),0.5);",
  "  c=mix(c,vec3(0.09,0.04,0.22),clamp(dk,0.0,1.0)*0.9);",
  "  float az=atan(w.x,-w.z);float bk=smoothstep(-0.1,0.55,-w.z);float yc=0.24+0.07*sin(az*2.6+uT*0.12)+0.03*sin(az*6.3-uT*0.2);",
  "  float band=exp(-pow((up-yc)/0.12,2.0))*bk;float rays=0.55+0.45*sin(az*30.0+2.0*sin(az*5.0+uT*0.25));",
  "  c+=mix(vec3(0.56,0.32,1.0),vec3(0.92,0.56,1.0),0.5+0.5*sin(az*1.7+uT*0.07))*band*rays*1.2;",
  "  c+=sbox(w,normalize(vec3(-0.55,0.66,0.52)),vec2(0.20,0.32),0.22)*9.0+sbox(w,normalize(vec3(0.05,1.0,0.12)),vec2(0.32,0.32),0.3)*4.2+sbox(w,normalize(vec3(0.78,0.30,0.55)),vec2(0.07,0.40),0.3)*5.5+sbox(w,normalize(vec3(-0.85,0.12,-0.5)),vec2(0.05,0.30),0.3)*3.6;return c;}",
  "vec3 envD(vec3 w){return uLv<0.5?envC(w):envV(w);}",
  "vec3 envP(vec3 w){float up=w.y;vec3 c=mix(vec3(0.80,0.74,0.94),vec3(1.03,0.99,1.08),smoothstep(-0.25,0.85,up));c*=mix(1.0,0.72,smoothstep(0.02,-0.45,up));",
  "  c+=sbox(w,normalize(vec3(-0.55,0.66,0.52)),vec2(0.20,0.32),0.22)*6.0+sbox(w,normalize(vec3(0.05,1.0,0.12)),vec2(0.32,0.32),0.3)*2.6+sbox(w,normalize(vec3(0.78,0.30,0.55)),vec2(0.07,0.40),0.3)*3.2;return c;}",
  "vec3 envN(vec3 w,float aw){float up=w.y;vec3 c=mix(vec3(0.035,0.028,0.07),vec3(0.17,0.13,0.29),smoothstep(-0.25,0.85,up));c*=mix(1.0,0.35,smoothstep(0.02,-0.45,up));",
  "  float az=atan(w.x,-w.z);float bk=smoothstep(-0.1,0.55,-w.z);float yc=0.24+0.07*sin(az*2.6+uT*0.12)+0.03*sin(az*6.3-uT*0.2);",
  "  float band=exp(-pow((up-yc)/0.12,2.0))*bk;float rays=0.55+0.45*sin(az*30.0+2.0*sin(az*5.0+uT*0.25));",
  "  c+=mix(vec3(0.42,0.22,0.92),vec3(0.80,0.42,0.97),0.5+0.5*sin(az*1.7+uT*0.07))*band*rays*1.7*aw;",
  "  c+=sbox(w,normalize(vec3(-0.55,0.66,0.52)),vec2(0.20,0.32),0.22)*8.0+sbox(w,normalize(vec3(0.05,1.0,0.12)),vec2(0.32,0.32),0.3)*3.4+sbox(w,normalize(vec3(0.78,0.30,0.55)),vec2(0.07,0.40),0.3)*4.6+sbox(w,normalize(vec3(-0.85,0.12,-0.5)),vec2(0.05,0.30),0.3)*3.0;return c;}",
  "vec3 env(vec3 w){return uN>0.5?envN(w,1.0):envD(w);}",
  "void cvx(vec3 ro,vec3 rd,out float tn,out float tf,out vec3 nn,out vec3 nf){tn=-1e9;tf=1e9;nn=vec3(0.0,1.0,0.0);nf=nn;",
  "  {vec3 n=vec3(0.0,1.0,0.0);float dn=rd.y;float ds=uTab-ro.y;if(abs(dn)>1e-6){float t=ds/dn;if(dn<0.0){if(t>tn){tn=t;nn=n;}}else if(t<tf){tf=t;nf=n;}}else if(ds<0.0)tn=1e9;}",
  "  for(int g=0;g<9;g++){vec3 n=uG[g].xyz;float d=uG[g].w;for(int k=0;k<8;k++){float dn=dot(n,rd);float ds=d-dot(n,ro);",
  "    if(abs(dn)>1e-6){float t=ds/dn;if(dn<0.0){if(t>tn){tn=t;nn=n;}}else if(t<tf){tf=t;nf=n;}}else if(ds<0.0)tn=1e9;",
  "    n=vec3(0.70710678*(n.x-n.z),n.y,0.70710678*(n.x+n.z));}}}",
  "float fr(float c){return 0.17+0.83*pow(1.0-clamp(c,0.0,1.0),5.0);}",
  "vec3 toW(vec3 d){return d*uR;}",
  "vec3 stone(vec3 roW,vec3 rdW,out float hit,out float th){hit=0.0;th=1e9;vec3 ro=uR*(roW-uDC),rd=uR*rdW;",
  "  float b=dot(ro,rd),c=dot(ro,ro)-1.04,h=b*b-c;if(h<0.0)return vec3(0.0);",
  "  float tn,tf;vec3 nn,nf;cvx(ro,rd,tn,tf,nn,nf);if(!(tn<tf&&tn>0.0))return vec3(0.0);hit=1.0;th=tn;",
  "  vec3 p=ro+rd*tn;float F=fr(-dot(rd,nn));vec3 col=F*env(toW(reflect(rd,nn)));vec3 d=refract(rd,nn,1.0/IOR);vec3 thr=vec3(1.0-F);",
  "  vec3 io=uN>0.5?vec3(2.37,2.42,2.48):(uLv<0.5?vec3(2.395,2.42,2.455):vec3(2.33,2.42,2.53));",
  "  for(int k=0;k<6;k++){cvx(p+d*0.0005,d,tn,tf,nn,nf);p=p+d*tf;vec3 m=nf;vec3 oc=vec3(0.0);",
  "    vec3 t1=refract(d,-m,io.r);if(dot(t1,t1)>0.0)oc.r=(1.0-fr(dot(t1,m)))*env(toW(t1)).r;",
  "    vec3 t2=refract(d,-m,io.g);if(dot(t2,t2)>0.0)oc.g=(1.0-fr(dot(t2,m)))*env(toW(t2)).g;",
  "    vec3 t3=refract(d,-m,io.b);if(dot(t3,t3)>0.0)oc.b=(1.0-fr(dot(t3,m)))*env(toW(t3)).b;",
  "    col+=thr*oc;vec3 tm=refract(d,-m,IOR);float Fm=dot(tm,tm)>0.0?fr(dot(tm,m)):1.0;thr*=Fm*(uN>0.5?vec3(0.99,0.99,1.0):vec3(0.995,0.995,1.0));d=reflect(d,-m);",
  "    if(max(thr.r,max(thr.g,thr.b))<0.03)break;}",
  "  col+=thr*env(toW(d))*0.5;",
  /* by night the fire is the spectrum and Ingenium's violets together */
  "  if(uN>0.5){float l=dot(col,vec3(0.3,0.5,0.2));col=mix(col,mix(vec3(l),vec3(0.62,0.40,1.0)*l*1.35,0.75),0.32);}else if(uLv>0.5){float l=dot(col,vec3(0.3,0.5,0.2));col=mix(col,vec3(0.78,0.60,1.0)*l*1.25,0.28*(1.0-smoothstep(1.2,2.6,l)));}",
  "  return col;}",
  "float plinth(vec3 ro,vec3 rd,out vec3 n,out vec3 p,out float side){float Rp=1.8,H=0.24,t=1e9;side=0.0;n=vec3(0.0,1.0,0.0);p=vec3(0.0);",
  "  if(rd.y<0.0){float tt=-ro.y/rd.y;vec3 q=ro+rd*tt;if(dot(q.xz,q.xz)<Rp*Rp){t=tt;p=q;}}",
  "  float a=dot(rd.xz,rd.xz),b=dot(ro.xz,rd.xz),c=dot(ro.xz,ro.xz)-Rp*Rp,h=b*b-a*c;",
  "  if(h>0.0){float tt=(-b-sqrt(h))/a;vec3 q=ro+rd*tt;if(tt>0.0&&tt<t&&q.y<=0.0&&q.y>=-H){t=tt;p=q;n=normalize(vec3(q.x,0.0,q.z));side=1.0;}}return t;}",
  "vec3 spec(float h){return clamp(vec3(abs(h*6.0-3.0)-1.0,2.0-abs(h*6.0-2.0),2.0-abs(h*6.0-4.0)),0.0,1.0);}",
  "vec3 vio(float h){return mix(mix(vec3(0.42,0.20,0.95),vec3(0.66,0.32,0.98),smoothstep(0.0,0.5,h)),vec3(0.90,0.70,1.0),smoothstep(0.5,1.0,h));}",
  "vec3 hue(float h){vec3 s=spec(h*0.83);return uN>0.5?mix(s,vio(h),0.5):s;}",
  "float lightAz(){return uMv*(0.85*sin(uT*0.105)+0.45*sin(uT*0.043+1.0));}",
  "vec3 rotA(vec3 p,float az){vec3 q=p-uDC;float c=cos(az),s=sin(az);return uDC+vec3(c*q.x-s*q.z,q.y,s*q.x+c*q.z);}",
  "vec3 rotV(vec3 d,float az){float c=cos(az),s=sin(az);return vec3(c*d.x-s*d.z,d.y,s*d.x+c*d.z);}",
  "vec2 kp(){vec2 k=vec2(0.80+0.20*sin(uY+0.6),0.50+0.12*cos(uY*1.3));float az=lightAz(),c=cos(az),s=sin(az);return vec2(c*k.x-s*k.y,s*k.x+c*k.y);}",
  /* 7.00, her words (13 November 2026): "I want the silver holder of the diamond to be refined and sharpened, I want it to look like proper
     metal silver and match the compass look, it needs to look refined as well." So the holder is polished silver in the very light that
     paints Vocatio's compass (modules/r290.js and the tree's plinth, r294: the same studio, its window, its dark horizon line and its fill),
     seen from where the eye is: a domed boss at the heart, engine-turned rings, a band of violet enamel with a silver scale inlaid (72
     marks, every sixth longer), fine grooves, a polished bevel at the rim and a finely milled edge. */
  "float vWin(vec3 v){if(dot(v,vec3(-0.50141,-0.62174,0.60169))<0.6)return 0.0;float a=abs(dot(v,vec3(-0.76822,0.0,-0.64018))),b=abs(dot(v,vec3(0.39803,-0.78322,-0.47764)));",
  "  return (1.0-smoothstep(0.17,0.215,a))*(1.0-smoothstep(0.25,0.30,b));}",
  "vec3 vEnv(vec3 v){float up=-v.y;vec3 c;if(uN>0.5){float a=0.22+0.2*smoothstep(-0.2,0.85,up);c=vec3(a*0.92,a*0.9,a*1.22)-smoothstep(0.0,0.7,-up)*vec3(0.15,0.14,0.18);}",
  "  else{float a=0.86+0.13*smoothstep(-0.2,0.9,up);c=vec3(a*0.985,a*0.98,a)-smoothstep(-0.05,0.65,-up)*vec3(0.4,0.4,0.36);}",
  "  float hz=(1.0-smoothstep(0.1,0.28,abs(v.y)))*(1.0-smoothstep(0.5,0.78,v.z))*0.85;float hd=uN>0.5?0.07:0.28;c+=(vec3(hd,hd,hd*1.12)-c)*hz;",
  "  float cam=smoothstep(0.88,0.975,v.z)*0.8;float cd=uN>0.5?0.1:0.5;c+=(vec3(cd,cd,cd*1.08)-c)*cam;",
  "  c+=vWin(v)*vec3(1.3,1.3,1.34);float fs=smoothstep(0.55,0.72,v.x)*(1.0-smoothstep(0.25,0.5,abs(v.y+0.1)));c+=fs*(uN>0.5?vec3(0.55,0.53,0.68):vec3(0.6,0.6,0.64));return max(c,0.0);}",
  "vec3 vTone(vec3 c){return mix(c,0.8+0.2*(1.0-exp(-(c-0.8)*5.0)),step(0.8,c));}",
  "vec3 toV(vec3 w){vec3 q=w*uCM;return vec3(q.x,-q.y,q.z);}",
  "vec3 plinthCol(vec3 p,vec3 n,vec3 rd,float side,float glow){vec3 nn=n;float sh=1.0,en=0.0,tk=0.0;",
  "  if(side<0.5){float r=length(p.xz);vec2 dr=p.xz/max(r,1e-4);float tl,aa=0.004;",
  "    if(r>1.73)tl=-0.9*smoothstep(1.73,1.80,r);else if(r<0.55)tl=0.07*(r/0.55);else if(r>1.42&&r<1.64)tl=0.0;else tl=0.0035*sin(r*140.0)+0.004*sin(r*41.0);",
  "    nn=normalize(vec3(-dr.x*tl,1.0,-dr.y*tl));float an=atan(p.z,p.x);float qq=an/6.2831853*72.0;float qi=floor(qq+0.5);float dq=abs(qq-qi)*6.2831853/72.0*r;float lg=mod(qi,6.0)<0.5?1.0:0.0;",
  "    en=smoothstep(1.42-aa,1.42+aa,r)*(1.0-smoothstep(1.64-aa,1.64+aa,r));float t0=mix(1.52,1.45,lg);",
  "    tk=(1.0-smoothstep(0.005,0.009,dq))*smoothstep(t0-aa,t0+aa,r)*(1.0-smoothstep(1.615-aa,1.615+aa,r));",
  "    if(r>0.57&&r<1.39)sh*=0.955+0.045*sin(r*150.0);sh*=1.0-0.5*(1.0-smoothstep(0.0,0.006,abs(r-1.665)))-0.45*(1.0-smoothstep(0.0,0.005,abs(r-1.40)))-0.35*(1.0-smoothstep(0.0,0.004,abs(r-0.55)));}",
  "  else{float an=atan(p.z,p.x);if(p.y>-0.08){float k=sin(an*170.0);nn=normalize(n+vec3(-sin(an),0.0,cos(an))*0.36*k);sh*=0.92+0.08*k;}sh*=mix(1.0,0.62,smoothstep(-0.12,-0.27,p.y));}",
  "  vec3 R=toV(reflect(rd,nn));vec3 col=vTone(vEnv(R)*vec3(0.965,0.96,0.975))*sh;",
  "  if(en>0.0){vec3 nV=toV(nn);vec3 base=uN>0.5?vec3(0.40,0.27,0.70):vec3(0.42,0.26,0.78);float dl=dot(nV,vec3(-0.50141,-0.62174,0.60169));",
  "    vec3 em=vTone(base*(0.62+0.5*max(dl,0.0))+vEnv(R)*(0.035+0.5*pow(1.0-clamp(nV.z,0.0,1.0),5.0))*mix(0.5,1.0,uN)+vWin(R)*vec3(0.42,0.42,0.46));col=mix(col,em,en*(1.0-tk));}",
  "  if(side<0.5){vec2 sc=p.xz-vec2(0.08,0.16);float s=exp(-dot(sc,sc)/0.42);col*=1.0-mix(0.30,0.40,uN)*s;",
  "    vec2 k0=kp();vec2 dd=p.xz-k0;float ln=dot(dd,normalize(vec2(1.0,0.35)));float wd=dot(dd,normalize(vec2(-0.35,1.0)));",
  "    float g=exp(-wd*wd/0.022)*exp(-ln*ln/0.07);float hh=clamp(0.5+wd*2.4,0.0,1.0);col+=hue(hh)*g*mix(0.40,0.80,uN)*(0.35+1.4*glow);}",
  "  return col;}",
  /* a shaft of light, and a pulse running down it: sp is where the pulse is (0 to 1), sl its length */
  "float beam(vec3 ro,vec3 rd,vec3 a,vec3 b,float w,float th,float sp,float sl,float base,float pk){vec3 ba=b-a,w0=ro-a;float B=dot(rd,ba),C=dot(ba,ba),Dd=dot(rd,w0),E=dot(ba,w0),den=C-B*B;",
  "  float s=den>1e-6?clamp((E-B*Dd)/den,0.0,1.0):0.0;float t=max(dot(a+ba*s-ro,rd),0.0);vec3 q=ro+rd*t-(a+ba*s);float d2=dot(q,q);",
  "  float f=smoothstep(0.0,0.05,s)*smoothstep(1.0,0.82,s);float occ=t>th?0.12:1.0;float core=exp(-d2/(w*w))+0.22*exp(-d2/(w*w*14.0));",
  "  float pu=sl>0.0?exp(-pow((s-sp)/sl,2.0))*(1.0+3.0*exp(-d2/(w*w*0.35))):0.0;return core*f*occ*(base+pk*pu);}",
  /* the northern lights: curtains with a sharp lower edge and long rays, folding, drifting, brightening in waves */
  "vec4 aurora(vec2 v){vec3 col=vec3(0.0);float acc=0.0;",
  "  for(int L=0;L<3;L++){float fl=float(L);float x=v.x*(1.5+fl*0.45)+fl*3.1;",
  "    float base=0.66+fl*0.05+0.06*sin(x*1.2+uT*0.06+fl)+0.03*sin(x*3.0-uT*0.10+fl*2.0)+0.05*(vn(vec2(x*0.7,uT*0.04+fl*5.0))-0.5);",
  "    float dy=v.y-base;float ry=vn(vec2(x*16.0+uT*(0.20+fl*0.07),fl*7.0+uT*0.05));ry=pow(ry,1.6);",
  "    float wave=0.5+0.5*sin(x*2.2-uT*0.55+fl*1.7);wave=0.45+0.55*wave*wave;",
  "    float edge=smoothstep(-0.018,0.004,dy)*exp(-max(dy,0.0)/(0.09+0.03*fl));float a=edge*(0.30+0.70*ry)*wave*(0.62-fl*0.14);",
  "    vec3 c=mix(vec3(0.92,0.52,0.98),vec3(0.46,0.26,0.96),smoothstep(0.0,0.10,dy));c=mix(c,vec3(0.30,0.16,0.72),smoothstep(0.08,0.24,dy));col+=c*a;acc+=a;}",
  "  float ex=smoothstep(0.0,0.14,v.x)*smoothstep(1.0,0.86,v.x)*smoothstep(1.0,0.84,v.y)*smoothstep(0.34,0.56,v.y);return vec4(col*ex,clamp(acc*ex,0.0,1.0));}",
  "vec4 bokeh(vec2 v){vec3 col=vec3(0.0);float a=0.0;for(int i=0;i<12;i++){float fi=float(i);vec2 c=vec2(0.06+0.88*h1(fi*3.13+0.7),0.30+0.66*h1(fi*7.71+1.3));",
  "    c+=vec2(0.012*sin(uT*0.07+fi*2.0),0.015*sin(uT*0.09+fi));float r=0.022+0.035*h1(fi*1.37+2.0);float d=length((v-c)*vec2(uAsp,1.0));",
  "    float disc=smoothstep(r,r*0.86,d)*(0.55+0.45*smoothstep(r*0.4,r,d));float hb=h1(fi*9.1);vec3 bc=uN>0.5?mix(vec3(0.98,0.84,1.0),vec3(0.66,0.50,1.0),hb):(hb<0.34?vec3(1.0,0.74,0.88):(hb<0.67?vec3(0.78,0.66,1.0):vec3(0.66,0.82,1.0)));float k=disc*(0.35+0.65*h1(fi*4.4));col+=bc*k;a+=k;}",
  "  return vec4(col,a);}",
  "vec3 tm(vec3 c){return uN>0.5?1.0-exp(-c*1.06):1.0-exp(-c*1.30);}",
  "void main(){vec2 sp=(v*2.0-1.0)*vec2(uAsp,1.0)*uTan;vec3 rd=normalize(uCM*vec3(sp,-1.0)),ro=uCP;",
  "  float hs,ts;vec3 sc=stone(ro,rd,hs,ts);vec3 pn,pp;float side;float tp=plinth(ro,rd,pn,pp,side);",
  /* the light's clock: a pulse every few seconds, or at once when pressed */
  "  float cyc=floor(uT/3.4);float f=fract(uT/3.4);float fp=(uT-uP)/3.4;if(fp>=0.0&&fp<0.7)f=min(f,fp);f=min(f*mix(1.0,1.35,uMv),1.0);float laz=lightAz();float bs=0.0;",
  "  float sIn=clamp(f/0.09,0.0,1.0),onIn=step(f,0.10);float sOut=clamp((f-0.17)/0.16,0.0,1.0),onOut=step(0.16,f)*step(f,0.36);",
  "  float glow=exp(-max(0.0,f-0.17)*7.0)*step(0.16,f);",
  "  vec3 col=vec3(0.0);float a=0.0;float th=1e9;",
  "  if(hs>0.5&&ts<tp){col=sc;a=1.0;th=ts;",
  /* the pulse's path inside the stone, seen through it as it runs */
  "    vec3 E=rotA(uDC+vec3(-0.30,0.24,0.25),laz),P1=rotA(uDC+vec3(0.05,-0.30,0.12),laz),P2=rotA(uDC+vec3(0.34,-0.05,0.0),laz);float s1=clamp((f-0.09)/0.04,0.0,1.0),s2=clamp((f-0.12)/0.04,0.0,1.0);",
  "    float on1=step(0.085,f)*step(f,0.16),on2=step(0.115,f)*step(f,0.19);",
  "    col+=vec3(1.0,0.96,1.0)*beam(ro,rd,E,P1,0.020,1e9,s1,0.25,0.0,1.6*on1)+hue(0.35)*beam(ro,rd,P1,P2,0.020,1e9,s2,0.25,0.0,1.4*on2);",
  "    col=tm(col);}",
  "  else if(tp<1e8){col=plinthCol(pp,pn,rd,side,glow);a=1.0;th=tp;}",
  "  else{vec4 au=aurora(v);float ai=uN>0.5?0.95:0.45;col=au.rgb*ai;a=clamp(au.a*ai,0.0,1.0);",
  "    vec2 hc=(v-vec2(0.5,0.62))*vec2(uAsp,1.0);float halo=exp(-dot(hc,hc)/0.05)*mix(0.08,0.26,uN);col+=vec3(0.55,0.36,0.95)*halo;a=max(a,halo);}",
  /* the ray in, the three fans out (the falling one glances off the plinth), each with its pulse */
  "  float I=mix(0.36,0.52,uN);vec3 E=rotA(uDC+vec3(-0.30,0.24,0.25),laz);vec3 L=vec3(0.0);float sw=sin(uT*0.37)*0.4+sin(uT*0.17+1.3)*0.25;",
  "  vec3 S0=rotA(vec3(-3.3+0.4*sw,3.85-0.35*sw,1.0+0.2*sw),laz);L+=vec3(1.0,0.98,1.0)*beam(ro,rd,S0,E,0.014,th,sIn,0.10,bs,2.8*onIn)*I;",
  "  float eb=smoothstep(0.0,0.10,v.x)*smoothstep(1.0,0.90,v.x)*smoothstep(0.0,0.08,v.y)*smoothstep(1.0,0.88,v.y);vec3 Lt=tm(L)*eb;",
  "  col=col+Lt*(1.0-0.35*a);a=max(a,clamp(max(Lt.r,max(Lt.g,Lt.b))*1.15,0.0,1.0));gl_FragColor=vec4(min(col,vec3(a)),a);}"].join("\n");
  function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
  function init(){try{gl=cv.getContext("webgl",{premultipliedAlpha:true,alpha:true,antialias:false,powerPreference:"low-power"})||cv.getContext("experimental-webgl");}catch(e){gl=null;}
    if(!gl)return false;try{pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
      if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));}catch(e){W.__diamondErr=String(e);return false;}
    gl.useProgram(pr);var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    var loc=gl.getAttribLocation(pr,"p");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    ["uT","uN","uP","uAsp","uTan","uY","uF","uLv","uMv","uCP","uDC","uCM","uR","uTab","uA"].forEach(function(n){U[n]=gl.getUniformLocation(pr,n);});U.uG=gl.getUniformLocation(pr,"uG[0]");
    var g=[];GROUPS.forEach(function(x){g.push(x[0],x[1],x[2],x[3]);});gl.uniform4fv(U.uG,new Float32Array(g));gl.uniform1f(U.uTab,HT);
    gl.uniform3fv(U.uCP,new Float32Array(CP));gl.uniformMatrix3fv(U.uCM,false,new Float32Array([CR[0],CR[1],CR[2],CU[0],CU[1],CU[2],-CF[0],-CF[1],-CF[2]]));
    gl.uniform1f(U.uTan,TAN);gl.uniform1f(U.uAsp,W0/H0);return true;}
  function dpr(){return Math.min(2,Math.max(1,W.devicePixelRatio||1));}
  function size(){var d=dpr()*q;var w=Math.round(W0*d),h=Math.round(H0*d);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}var od=dpr();if(ov.width!==Math.round(W0*od)){ov.width=Math.round(W0*od);ov.height=Math.round(H0*od);}}
  /* sparkles: where a crown facet sends the key light to the eye, where the pulse strikes the crown and where it leaves; and a few motes of
     light drifting in the air about the stone. All Ingenium's four-pointed star, soft. */
  var KL=nrm([-0.55,0.66,0.52]),SPK=[];(function(){var i,a;for(i=0;i<8;i++){a=i*45;SPK.push({g:0,k:i,p:[0.78*Math.cos(a*D2R),0.17,0.78*Math.sin(a*D2R)]});}
    for(i=0;i<8;i++){a=22.5+i*45;SPK.push({g:1,k:i,p:[0.60*Math.cos(a*D2R),0.27,0.60*Math.sin(a*D2R)]});}
    for(i=0;i<8;i++){a=11.25+i*45;SPK.push({g:2,k:i,p:[0.93*Math.cos(a*D2R),0.06,0.93*Math.sin(a*D2R)]});a=33.75+i*45;SPK.push({g:3,k:i,p:[0.93*Math.cos(a*D2R),0.06,0.93*Math.sin(a*D2R)]});}})();
  function gN(s){var b=GROUPS[s.g],n=[b[0],b[1],b[2]];for(var k=0;k<s.k;k++){n=[0.70710678*(n[0]-n[2]),n[1],0.70710678*(n[0]+n[2])];}return n;}
  function mv(M,p){return [M[0][0]*p[0]+M[0][1]*p[1]+M[0][2]*p[2],M[1][0]*p[0]+M[1][1]*p[1]+M[1][2]*p[2],M[2][0]*p[0]+M[2][1]*p[1]+M[2][2]*p[2]];}
  function proj(P){var v=sub(P,CP),z=dot(v,CF);var x=dot(v,CR)/z/TAN/(W0/H0),y=dot(v,CU)/z/TAN;return [(x+1)/2*W0,(1-(y+1)/2)*H0];}
  function star(x,y,r,a,nt){if(a<=0.01)return;og.save();og.globalAlpha=Math.min(1,a);og.globalCompositeOperation=nt?"lighter":"source-over";
    var gr=og.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.2,nt?"rgba(222,206,255,.8)":"rgba(255,255,255,.85)");gr.addColorStop(1,nt?"rgba(150,110,240,0)":"rgba(190,170,240,0)");
    og.fillStyle=gr;og.beginPath();var k=r*.12;og.moveTo(x,y-r);og.quadraticCurveTo(x+k,y-k,x+r,y);og.quadraticCurveTo(x+k,y+k,x,y+r);og.quadraticCurveTo(x-k,y+k,x-r,y);og.quadraticCurveTo(x-k,y-k,x,y-r);og.fill();
    var h=og.createRadialGradient(x,y,0,x,y,r*.5);h.addColorStop(0,nt?"rgba(200,170,255,.55)":"rgba(160,130,230,.25)");h.addColorStop(1,"rgba(160,130,230,0)");og.fillStyle=h;og.beginPath();og.arc(x,y,r*.5,0,Math.PI*2);og.fill();og.restore();}
  var MOTES=[];for(var mi=0;mi<22;mi++)MOTES.push([Math.random(),Math.random(),0.3+Math.random()*0.7,Math.random()*6.28]);
  function rotXZ(p,az){var c=Math.cos(az),s=Math.sin(az);return [c*p[0]-s*p[2],p[1],s*p[0]+c*p[2]];}
  function lightAz(t){return MV*(0.85*Math.sin(t*0.105)+0.45*Math.sin(t*0.043+1.0));}
  function sparkle(t,M,DC,nt){og.setTransform(dpr(),0,0,dpr(),0,0);og.clearRect(0,0,W0,H0);
    for(var i=0;i<SPK.length;i++){var s=SPK[i],N=mv(M,gN(s)),P=mv(M,s.p);P=[P[0]+DC[0],P[1]+DC[1],P[2]+DC[2]];var V=nrm(sub(CP,P));if(dot(N,V)<=0.05)continue;
      var nl=dot(N,KL),Rl=[2*nl*N[0]-KL[0],2*nl*N[1]-KL[1],2*nl*N[2]-KL[2]],c=dot(Rl,V);if(c<0.95)continue;var a=Math.pow((c-0.95)/0.05,2.2),xy=proj(P);star(xy[0],xy[1],5+9*a,a*0.8,nt);}
    /* the pulse: a flash where it strikes the crown, and where each fan leaves */
    var f=(t/PER)%1,fp=(t-press)/PER;if(fp>=0&&fp<0.7)f=Math.min(f,fp);f=Math.min(1,f*(MV?SP:1));var az=lightAz(t);
    var hitA=Math.exp(-Math.pow((f-0.095)/0.025,2)),outA=Math.exp(-Math.pow((f-0.175)/0.03,2));
    var e0=rotXZ([-0.30,0.24,0.25],az),en=proj([DC[0]+e0[0],DC[1]+e0[1],DC[2]+e0[2]]);star(en[0],en[1],8+16*hitA,(MV?0.0:0.25)+(MV?1.0:0.75)*hitA,nt);
    [[0.36,-0.40,0.22],[0.80,0.06,0.18],[-0.78,-0.02,0.30]].forEach(function(e){var r=rotXZ(e,az),p=proj([DC[0]+r[0],DC[1]+r[1],DC[2]+r[2]]);star(p[0],p[1],6+12*outA,outA*0.9,nt);});
    /* the whole stone sparkles as the light passes through it: facets flash, never the same ones twice running */
    {var cyc=Math.floor(t/PER),fl=Math.exp(-Math.pow((f-0.14)/0.08,2));if(fl>0.02)for(var k=0;k<SPK.length;k++){var hk=Math.sin((k+1)*12.9898+cyc*78.233)*43758.5453;hk-=Math.floor(hk);if(hk<0.6)continue;
      var sk=SPK[k],Pk=mv(M,sk.p);Pk=[Pk[0]+DC[0],Pk[1]+DC[1],Pk[2]+DC[2]];var Nk=mv(M,gN(sk));if(dot(Nk,nrm(sub(CP,Pk)))<=0.0)continue;var xyk=proj(Pk),ak=fl*Math.exp(-Math.pow((f-0.10-hk*0.12)/0.05,2));star(xyk[0],xyk[1],4+9*ak,ak,nt);}}
    /* motes of light in the air, drifting slowly, each twinkling now and then */
    for(var j=0;j<MOTES.length;j++){var m=MOTES[j],x=40+m[0]*440,y=40+((m[1]-t*0.006*m[2])%1+1)%1*300,tw=Math.pow(0.5+0.5*Math.sin(t*1.3*m[2]+m[3]),6);
      og.globalAlpha=(nt?0.55:0.5)*(0.25+0.75*tw);og.fillStyle=nt?"rgba(226,212,255,1)":"rgba(150,120,225,1)";og.beginPath();og.arc(x,y,0.7+0.9*m[2],0,Math.PI*2);og.fill();if(tw>0.7)star(x,y,3+5*tw,(tw-0.7)*1.6,nt);}
    og.globalAlpha=1;}
  function night(){return D.body.getAttribute("data-theme")==="night";}
  function still(){return D.body.getAttribute("data-motion")==="minimal"||(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}
  /* the light, as it was in her preview, every animation kept, with the four still rays gone. Her words (13 November 2026): "revert the
     Build page's light animation back"; "Just remove the 4 still light rays that look like strings holding the diamond but keep all of
     the animations." (MV 1, kept for a later choice and off: the paths turning slowly round the stone, the light a third faster.) */
  var MV=0,SP=1.35,LV=1;
  function frame(ts){raf=0;if(!vis||!shown||!ok)return;var t=(ts-t0)/1000,busy=over||t-press<2.5,gap=busy?16:33;
    if(ts-lastDraw<gap){raf=requestAnimationFrame(frame);return;}var dt=Math.min(0.1,(ts-lastDraw)/1000||0.033);
    if(lastDraw){var took=ts-lastDraw;if(took>gap*1.9)slowN++;else slowN=Math.max(0,slowN-1);if(slowN>12&&q>0.7&&!W.__keepQ){q=Math.max(0.7,q*0.85);slowN=0;size();}}
    lastDraw=ts;var st=still();if(!st&&!over)yaw+=dt*(Math.PI*2/36);
    gx+=((over?mX*0.22:0)-gx)*Math.min(1,dt*6);gz+=((over?-mY*0.16:0)-gz)*Math.min(1,dt*6);tx=gz;tz=-gx*0.6;
    var M=rotM(),bob=st?0:Math.sin(t*2*Math.PI/7)*0.035,DC=[0,1.22+bob,0],nt=night(),tt=st?1.0:t;
    gl.viewport(0,0,cv.width,cv.height);gl.uniform1f(U.uT,tt);gl.uniform1f(U.uN,nt?1:0);gl.uniform1f(U.uP,press);gl.uniform1f(U.uY,yaw);gl.uniform3fv(U.uDC,new Float32Array(DC));
    gl.uniform1f(U.uLv,LV);gl.uniform1f(U.uMv,MV);gl.uniform1f(U.uF,9);gl.uniform3fv(U.uA,new Float32Array([0,1,0]));
    gl.uniformMatrix3fv(U.uR,false,new Float32Array([M[0][0],M[0][1],M[0][2],M[1][0],M[1][1],M[1][2],M[2][0],M[2][1],M[2][2]]));
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);sparkle(tt,M,DC,nt);if(!st||busy)raf=requestAnimationFrame(frame);}
  function kick(){if(!raf)raf=requestAnimationFrame(frame);}
  function mount(el){host=el;cv=D.createElement("canvas");cv.className="bd-cv";ov=D.createElement("canvas");ov.className="bd-cv ov";host.appendChild(cv);host.appendChild(ov);og=ov.getContext("2d");
    if(W.matchMedia&&matchMedia("(pointer: coarse)").matches)q=0.75;size();ok=init();if(!ok){host.setAttribute("data-nogl","1");return;}
    function at(e){var r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*W0,y:(e.clientY-r.top)/r.height*H0};}
    var C=proj([0,1.22,0]);
    host.addEventListener("pointermove",function(e){var p=at(e),dx=(p.x-C[0])/150,dy=(p.y-C[1])/120,on=dx*dx+dy*dy<1;if(on!==over){over=on;cv.style.cursor=on?"pointer":"default";}mX=dx;mY=dy;kick();});
    host.addEventListener("pointerleave",function(){over=false;kick();});
    host.addEventListener("pointerdown",function(e){var p=at(e),dx=(p.x-C[0])/150,dy=(p.y-C[1])/120;over=dx*dx+dy*dy<1;mX=dx;mY=dy;if(!over)return;press=(performance.now()-t0)/1000;cv.classList.add("down");try{if(W.IngSound)IngSound.play("paper");}catch(x){}kick();});
    host.addEventListener("pointerup",function(e){cv.classList.remove("down");if(e.pointerType!=="mouse"){over=false;kick();}});
    host.addEventListener("pointercancel",function(){cv.classList.remove("down");over=false;kick();});
    try{new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)kick();}).observe(host);}catch(e){}
    D.addEventListener("visibilitychange",function(){shown=!D.hidden;if(shown)kick();});kick();}
  return {mount:mount,kick:kick,theme:kick,fire:function(){},q:function(){return q;},shade:function(v){if(v==null)return LV;LV=Math.max(0,Math.min(1,+v||0));kick();},light:function(v){if(v==null)return MV;MV=v?1:0;kick();}};})();



/* ---------- the header, made as Lector's, Vocatio's and Fabrica's are ---------- */
var page=null,HD=null,tag=null,MOUNTED=false,LAST="";
function KIT(){return W.IngStudios&&IngStudios.kit||null;}
function $(id){return D.getElementById(id);}
function click(id){var b=$(id);if(b)b.click();}
function lines(){var e=$("codeEditor");if(!e)return 0;var v=String(e.value||"");return v?v.split("\n").length:0;}
function setText(e,s){if(e&&e.textContent!==s)e.textContent=s;}
function label(){if(!tag)return;var n=lines(),a=$("autoRun"),auto=!a||a.checked;
  var k=n?(n===1?"1 line":n+" lines"):"No code yet",s=n?(auto?"runs as you type":"runs when you press Run"):"write, or load a sample";
  if(k+s===LAST)return;LAST=k+s;setText(tag.querySelector("b"),k);setText(tag.querySelector("small"),s);}
function build(){var K=KIT();page=$("page-build");if(!K||!page)return false;if(HD&&HD.el.isConnected)return true;
  var card=page.querySelector(":scope > .card")||null,ld=page.querySelector(":scope > .lede");
  var lede=(ld&&ld.textContent.trim())||"Write a page and watch it run beside your code. Good for trying an idea, checking a snippet, or letting a model help you fix something. This works fully offline and does not need a model.";
  HD=K.hero({title:"Build",eyebrow:"Build · code in, a page out",lede:lede,
    keys:[{pri:true,ico:K.ICO.begin,txt:"Run your page",id:"bdRun",fn:function(){click("runBtn");}},{ico:K.ICO.plus,txt:"Load a sample",id:"bdSample",fn:function(){click("sampleBtn");setTimeout(label,0);}}],
    says:"Your code on one side, your page running on the other: try an idea, check a snippet, or let a model help you fix it.",
    hint:"Point at the diamond and it turns to you; press it and the light shoots through it."});
  HD.hint.innerHTML="Point at the diamond and it turns to you; <b>press it</b> and the light shoots through it.";
  HD.obj.setAttribute("role","img");HD.obj.setAttribute("aria-label","A diamond turning slowly, the light shooting through it now and then");
  tag=K.label(HD.obj,352,44,1,0,"","","bd-label");
  if(card)page.insertBefore(HD.el,card);else page.appendChild(HD.el);
  var ed=$("codeEditor"),au=$("autoRun");if(ed)ed.addEventListener("input",label);if(au)au.addEventListener("change",label);return true;}
function on(){page=$("page-build");if(!page||!KIT())return;page.classList.add("sk-on");if(!build())return;
  if(!MOUNTED){MOUNTED=true;Diamond.mount(HD.obj);}label();try{if(W.IngHeadsFit)W.IngHeadsFit();}catch(e){}Diamond.kick();}
var og=W.go;if(typeof og==="function")W.go=function(p){var r=og.apply(this,arguments);try{if(p==="build")setTimeout(on,0);}catch(e){}return r;};
function first(){try{var p=$("page-build");if(p&&p.classList.contains("active"))on();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(first,0);});else setTimeout(first,0);
try{new MutationObserver(function(){if(MOUNTED)Diamond.kick();}).observe(D.body,{attributes:true,attributeFilter:["data-theme","data-motion"]});}catch(e){}
W.IngDiamond={on:on,shade:function(v){return Diamond.shade(v);},state:function(){return {head:!!(HD&&HD.el.isConnected),mounted:MOUNTED,q:Diamond.q(),shade:Diamond.shade(),label:tag?[tag.querySelector("b").textContent,tag.querySelector("small").textContent]:null};},kick:function(){Diamond.kick();}};
try{window.__ingParts["p292"]="running";}catch(_){}
})();
</script>