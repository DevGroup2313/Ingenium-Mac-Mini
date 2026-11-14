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
   diamond changes only when the code or the Run as I type switch does.
   14 November 2026, on her approved design (Builds_Diamond.html): "This is the design that I want for the Build page, this is the one, but
   the day mode diamonds look too dark next to the light silver holder so please deepen the silver colour and definition of the holder ...
   I want the design of the holder's surface to be more refined and better incorporate the orrery design and animation. I want every
   surface of the holder to have the animated popped out 3D layered depth look and effect and I want every surface to be animated and
   clickable"; "Remove the glass, I want the orrery design to not be hindered by it"; "I don't want it to just be weirdly purple in the
   middle"; "The day mode background in general looks too white and lifeless, please liven up the page match it to its colourful
   glistening night mode counterpart"; "I specifically said that I want the ingenium orrery design from the compass"; "the engine logo needs
   to be drawn to fit the middle of the holder not this randomised symbol". So: the holder's silver deeper by day; no crystal, the
   compass's own Orrery open in the seat with Ingenium's engine logo at its heart;
   every part of the holder alive and answering a press; the head's day sky in rose, periwinkle and lilac with pastel northern lights. */
#page-build.sk-on{--sk-ink1:#221a2e;--sk-ink2:#4a4358;--sk-ink3:#6c6579;--sk-hair:rgba(34,26,46,.10);--sk-hair2:rgba(34,26,46,.06);--sk-acc:#6a3fb5;
  --sk-hi:#ffffff;--sk-lo:#faf8fc;--sk-keyA:#ffffff;--sk-keyB:#f6f2fb;--sk-pa:#7a50c6;--sk-pb:#5d37a1;--sk-pedge:#3a2070;
  --sk-slab:inset 0 1px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.10),0 3px 0 rgba(40,22,68,.05),0 6px 12px rgba(40,22,68,.07),0 18px 36px rgba(40,22,68,.08);
  --sk-key:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.1);
  --sk-keyhi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --sk-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);
  --sk-desk:radial-gradient(ellipse 52% 58% at 90% 10%,rgba(255,186,228,.78) 0%,rgba(255,186,228,0) 72%),radial-gradient(ellipse 58% 52% at 62% 96%,rgba(168,186,255,.62) 0%,rgba(168,186,255,0) 72%),radial-gradient(ellipse 46% 60% at 6% 92%,rgba(208,182,255,.58) 0%,rgba(208,182,255,0) 72%),radial-gradient(ellipse 75% 85% at 72% 42%,#fdf8ff 0%,#f1e3fc 44%,#e2d0f8 74%,#d6c2f2 100%);--sk-ring:rgba(106,63,181,.10);--sk-line:rgba(106,63,181,.30);
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
#page-build.sk-on .bd-cv{position:absolute;left:0;top:0;width:520px;height:424px;display:block;transition:transform .55s cubic-bezier(.25,.8,.3,1);-webkit-tap-highlight-color:transparent}
#page-build.sk-on .bd-cv.ov{pointer-events:none}
#page-build.sk-on .bd-bg{position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;pointer-events:none;display:block}
#page-build.sk-on .bd-cv.down{transform:scale(.99)}
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
  var W0=520,H0=424,host,cv,gl,pr,ov,og,tx2=null,DIAL=1,DIALK="",raf=0,vis=true,shown=true,ok=false,U={},q=1,lastDraw=0,slowN=0,FIRST=-1,YV=0,AAN=1,EW=1,QT=0,QCAP=1,FAST=true,F16=16,FASTT=-99,t0=performance.now(),
      yaw=0,tx=0,tz=0,gx=0,gz=0,over=false,press=-99,mX=0,mY=0,VAR=-1;
  var CP=[0,1.62,6.9],TG=[0,0.80,0],FOV=30*Math.PI/180,PER=9.0,TT=1.2;
  function sub(a,b){return [a[0]-b[0],a[1]-b[1],a[2]-b[2]];}function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
  function nrm(a){var l=Math.sqrt(dot(a,a))||1;return [a[0]/l,a[1]/l,a[2]/l];}function crs(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
  var CF=nrm(sub(TG,CP)),CR=nrm(crs(CF,[0,1,0])),CU=crs(CR,CF),TAN=Math.tan(FOV/2);
  var R=1,G=0.012,HT=0.31,AT=0.53,D2R=Math.PI/180;
  function grp(az,slope,down,px,py,pz){var a=az*D2R,s=slope*D2R,n=[Math.sin(s)*Math.cos(a),(down?-1:1)*Math.cos(s),Math.sin(s)*Math.sin(a)];return [n[0],n[1],n[2],n[0]*px+n[1]*py+n[2]*pz];}
  function onR(az,slope,down,r,y){var a=az*D2R;return grp(az,slope,down,r*Math.cos(a),y,r*Math.sin(a));}
  var GROUPS=[onR(0,34.5,false,R,G),onR(22.5,21.5,false,AT,HT),onR(11.25,41,false,R,G),onR(33.75,41,false,R,G),[1,0,0,R],[Math.cos(22.5*D2R),0,Math.sin(22.5*D2R),R],
    onR(0,40.75,true,R,-G),onR(11.25,42,true,R,-G),onR(33.75,42,true,R,-G)];
  function rotM(){var cy=Math.cos(yaw+YF),sy=Math.sin(yaw+YF),cx=Math.cos(tx),sx=Math.sin(tx),cz=Math.cos(tz),sz=Math.sin(tz);
    var Ry=[[cy,0,sy],[0,1,0],[-sy,0,cy]],Rx=[[1,0,0],[0,cx,-sx],[0,sx,cx]],Rz=[[cz,-sz,0],[sz,cz,0],[0,0,1]];
    function mul(A,B){var C=[[0,0,0],[0,0,0],[0,0,0]];for(var i=0;i<3;i++)for(var j=0;j<3;j++)for(var k=0;k<3;k++)C[i][j]+=A[i][k]*B[k][j];return C;}return mul(Rz,mul(Rx,Ry));}
  var VS="attribute vec2 p;varying vec2 v;void main(){v=p*0.5+0.5;gl_Position=vec4(p,0.0,1.0);}";
  var FS=["precision highp float;varying vec2 v;",
  "uniform float uT,uN,uV,uAsp,uTan,uY,uDial;uniform vec2 uPx;uniform sampler2D uTx2;uniform vec3 uCP,uDC;uniform mat3 uCM,uR;uniform vec4 uG[9];uniform float uTab;uniform vec4 uL;uniform vec2 uHT;uniform sampler2D uTx;uniform vec4 uHA,uHB,uHC;uniform float uAA,uBG,uSc;uniform vec4 uHV;uniform sampler2D uTx3;uniform float uLogo;uniform vec4 uLG,uLH,uLR,uLQ;",
  "const float IOR=2.42;",
  "float sbox(vec3 w,vec3 ax,vec2 hs,float sf){float d=dot(w,ax);if(d<=0.05)return 0.0;vec3 u=normalize(cross(vec3(0.0,1.0,0.0),ax)+vec3(0.0,0.0,1e-4));vec3 vv=cross(ax,u);",
  "  vec2 p=vec2(dot(w,u),dot(w,vv))/d;vec2 q=1.0-smoothstep(hs*(1.0-sf),hs,abs(p));return q.x*q.y;}",
  "float h1(float n){return fract(sin(n)*43758.5453);}",
  "float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);float n=i.x+i.y*57.0;return mix(mix(h1(n),h1(n+1.0),f.x),mix(h1(n+57.0),h1(n+58.0),f.x),f.y);}",
  /* the day stones, after her photographs (13 November 2026): a clear brilliant on white whose facets read white, steel blue and near black,
     with single flashes of orange and blue; and a blue-violet stone. What makes a cut stone read as crystal is contrast: a white sky
     overhead, a dark floor, a ring of dark cards round the horizon with bright light between them, and small hard lights for the fire.
     The same studio serves the three day looks; only its tints change: clear (white and steel blue), lavender (blue violet), purple. */
  "vec3 studio(vec3 w,vec3 fl0,vec3 fl1,vec3 hor,vec3 sky,vec3 card,vec3 bright,vec3 key,vec3 fire){float up=w.y;float az=atan(w.x,-w.z);",
  "  vec3 c=mix(fl0,fl1,smoothstep(-0.9,-0.3,up));c=mix(c,hor,smoothstep(-0.3,-0.02,up));c=mix(c,sky,smoothstep(0.04,0.72,up));",
  "  float cards=smoothstep(0.40,0.56,abs(fract(az/6.2831853*5.0+0.13)-0.5)*2.0);float band=smoothstep(-0.34,-0.14,up)*(1.0-smoothstep(0.26,0.40,up));",
  "  c=mix(c,card,band*(1.0-cards)*0.94);c=mix(c,bright,band*smoothstep(0.55,0.95,cards)*0.40);",
  "  c=mix(c,card*0.8,0.88*sbox(w,normalize(vec3(0.0,0.12,1.0)),vec2(0.26,0.14),0.5));",
  "  c+=key*(sbox(w,normalize(vec3(-0.55,0.50,0.62)),vec2(0.14,0.22),0.4)*6.0+sbox(w,normalize(vec3(0.80,0.25,0.50)),vec2(0.05,0.30),0.4)*5.0);",
  "  c+=fire*(sbox(w,normalize(vec3(-0.25,0.80,0.55)),vec2(0.04,0.04),0.4)+sbox(w,normalize(vec3(0.45,0.72,0.52)),vec2(0.035,0.035),0.4)+sbox(w,normalize(vec3(0.62,0.40,-0.66)),vec2(0.035,0.035),0.4)+sbox(w,normalize(vec3(-0.70,0.35,-0.62)),vec2(0.04,0.04),0.4)+sbox(w,normalize(vec3(0.10,0.55,-0.83)),vec2(0.035,0.035),0.4))*22.0;",
  "  return c;}",
  "vec3 envC(vec3 w){float up=w.y;float az=atan(w.x,-w.z);vec3 c=mix(vec3(0.030,0.045,0.100),vec3(0.16,0.22,0.40),smoothstep(-0.9,-0.15,up));",
  "  c=mix(c,vec3(0.55,0.62,0.80),smoothstep(-0.15,0.10,up));c=mix(c,vec3(2.3,2.35,2.5),smoothstep(0.10,0.70,up));",
  "  float lobes=0.5+0.5*cos(az*3.0+0.6);float bandh=smoothstep(-0.35,-0.10,up)*(1.0-smoothstep(0.22,0.40,up));c=mix(c,vec3(0.025,0.035,0.085),bandh*lobes*0.88);",
  "  c=mix(c,vec3(0.02,0.03,0.07),0.85*sbox(w,normalize(vec3(0.0,0.14,1.0)),vec2(0.34,0.20),0.6));",
  "  c+=vec3(1.0)*(sbox(w,normalize(vec3(-0.55,0.55,0.60)),vec2(0.20,0.28),0.5)*4.0+sbox(w,normalize(vec3(0.80,0.30,0.45)),vec2(0.06,0.34),0.5)*3.0);",
  "  c+=vec3(1.0)*(sbox(w,normalize(vec3(-0.20,0.82,0.52)),vec2(0.05,0.05),0.5)+sbox(w,normalize(vec3(0.55,0.60,-0.55)),vec2(0.045,0.045),0.5))*8.0;return c;}",
  "vec3 envL(vec3 w){return studio(w,vec3(0.016,0.010,0.060),vec3(0.08,0.06,0.26),vec3(0.22,0.16,0.52),vec3(2.4,2.3,2.9),vec3(0.025,0.016,0.085),vec3(2.1,1.9,2.8),vec3(0.95,0.90,1.0),vec3(1.0,0.9,1.0));}",
  "vec3 envG(vec3 w){return studio(w,vec3(0.020,0.006,0.050),vec3(0.11,0.04,0.26),vec3(0.28,0.11,0.54),vec3(1.9,1.35,2.8),vec3(0.04,0.015,0.09),vec3(1.9,1.1,2.7),vec3(0.95,0.80,1.0),vec3(1.0,0.72,1.0));}",
  /* night: the violet room with the aurora in it (her approved stone) */
  "vec3 envN(vec3 w,float aw){float up=w.y;vec3 c=mix(vec3(0.035,0.028,0.07),vec3(0.17,0.13,0.29),smoothstep(-0.25,0.85,up));c*=mix(1.0,0.35,smoothstep(0.02,-0.45,up));",
  "  float az=atan(w.x,-w.z);float bk=smoothstep(-0.1,0.55,-w.z);float yc=0.24+0.07*sin(az*2.6+uT*0.12)+0.03*sin(az*6.3-uT*0.2);",
  "  float band=exp(-pow((up-yc)/0.12,2.0))*bk;float rays=0.55+0.45*sin(az*30.0+2.0*sin(az*5.0+uT*0.25));",
  "  c+=mix(vec3(0.42,0.22,0.92),vec3(0.80,0.42,0.97),0.5+0.5*sin(az*1.7+uT*0.07))*band*rays*1.7*aw;",
  "  c+=sbox(w,normalize(vec3(-0.55,0.66,0.52)),vec2(0.20,0.32),0.22)*8.0+sbox(w,normalize(vec3(0.05,1.0,0.12)),vec2(0.32,0.32),0.3)*3.4+sbox(w,normalize(vec3(0.78,0.30,0.55)),vec2(0.07,0.40),0.3)*4.6+sbox(w,normalize(vec3(-0.85,0.12,-0.5)),vec2(0.05,0.30),0.3)*3.0;return c;}",
  /* her words (14 November 2026): "The day mode crystals all look like shiny disco balls ... only the night mode diamond looks good." So
     the day stones are lit by the night stone's own room (dark, with its few lights, so most facets stay deep and only a few catch the
     light), lifted and tinted: the clear crystal neutral and a little brighter, lavender, purple; the night stone by day as it is */
  "vec3 envDay(vec3 w){vec3 n=envN(w,0.55);float l=dot(n,vec3(0.3,0.5,0.2));if(uV<0.5)return vec3(l)*vec3(0.96,0.99,1.06)*2.1+vec3(0.20,0.22,0.28);",
  "  if(uV<1.5)return mix(vec3(l),n,0.35)*vec3(1.02,0.94,1.12)*1.8+vec3(0.16,0.12,0.24);if(uV<2.5)return n*vec3(1.05,0.85,1.15)*1.45+vec3(0.06,0.03,0.11);return n*1.4+vec3(0.10,0.08,0.18);}",
  "vec3 env(vec3 w){return uN>0.5?envN(w,1.0):envDay(w);}",
  "void cvx(vec3 ro,vec3 rd,out float tn,out float tf,out vec3 nn,out vec3 nf){tn=-1e9;tf=1e9;nn=vec3(0.0,1.0,0.0);nf=nn;",
  "  {vec3 n=vec3(0.0,1.0,0.0);float dn=rd.y;float ds=uTab-ro.y;if(abs(dn)>1e-6){float t=ds/dn;if(dn<0.0){if(t>tn){tn=t;nn=n;}}else if(t<tf){tf=t;nf=n;}}else if(ds<0.0)tn=1e9;}",
  "  for(int g=0;g<9;g++){vec3 n=uG[g].xyz;float d=uG[g].w;for(int k=0;k<8;k++){float dn=dot(n,rd);float ds=d-dot(n,ro);",
  "    if(abs(dn)>1e-6){float t=ds/dn;if(dn<0.0){if(t>tn){tn=t;nn=n;}}else if(t<tf){tf=t;nf=n;}}else if(ds<0.0)tn=1e9;",
  "    n=vec3(0.70710678*(n.x-n.z),n.y,0.70710678*(n.x+n.z));}}}",
  "float fr(float c){return 0.17+0.83*pow(1.0-clamp(c,0.0,1.0),5.0);}",
  "vec3 toW(vec3 d){return d*uR;}",
  "vec3 stone(vec3 roW,vec3 rdW,out float hit,out float th){hit=0.0;th=1e9;vec3 ro=uR*(roW-uDC)/uSc,rd=uR*rdW;",
  "  float b=dot(ro,rd),c=dot(ro,ro)-1.04,h=b*b-c;if(h<0.0)return vec3(0.0);",
  "  float tn,tf;vec3 nn,nf;cvx(ro,rd,tn,tf,nn,nf);if(!(tn<tf&&tn>0.0))return vec3(0.0);hit=1.0;th=tn*uSc;",
  "  vec3 p=ro+rd*tn;float F=fr(-dot(rd,nn));vec3 col=F*env(toW(reflect(rd,nn)));vec3 d=refract(rd,nn,1.0/IOR);vec3 thr=vec3(1.0-F);",
  "  vec3 io=uN>0.5?vec3(2.37,2.42,2.48):vec3(2.355,2.42,2.505);",
  "  for(int k=0;k<6;k++){cvx(p+d*0.0005,d,tn,tf,nn,nf);p=p+d*tf;vec3 m=nf;vec3 oc=vec3(0.0);",
  "    vec3 t1=refract(d,-m,io.r);if(dot(t1,t1)>0.0)oc.r=(1.0-fr(dot(t1,m)))*env(toW(t1)).r;",
  "    vec3 t2=refract(d,-m,io.g);if(dot(t2,t2)>0.0)oc.g=(1.0-fr(dot(t2,m)))*env(toW(t2)).g;",
  "    vec3 t3=refract(d,-m,io.b);if(dot(t3,t3)>0.0)oc.b=(1.0-fr(dot(t3,m)))*env(toW(t3)).b;",
  "    col+=thr*oc;vec3 tm=refract(d,-m,IOR);float Fm=dot(tm,tm)>0.0?fr(dot(tm,m)):1.0;thr*=Fm*vec3(0.995,0.995,1.0);d=reflect(d,-m);",
  "    if(max(thr.r,max(thr.g,thr.b))<0.03)break;}",
  "  col+=thr*env(toW(d))*0.5;float l=dot(col,vec3(0.3,0.5,0.2));",
  "  if(uN>0.5||uV>2.5)col=mix(col,mix(vec3(l),vec3(0.62,0.40,1.0)*l*1.35,0.75),0.32);",
  "  else if(uV>1.5)col=mix(col,vec3(0.68,0.42,1.0)*l*1.3,0.18);",
  "  return col;}",
  /* the holder, stacked as the compass's case is, from the top: its polished face (0), a polished bevel (1), a wall of violet enamel set with
     silver pearls and four medallions (2), a rounded polished rim (3), the reeded foot (4) and the shadowed undercut (5) */
  /* the case, turned in one piece as the compass is: its profile (radius against height) a closed outline with every corner rounded, so
     light runs over it in soft gradients; the eye's ray walks the solid by its distance from the outline (sphere tracing), and the normal
     is read from that distance, so each fillet and cove shades as a turned part does. Parts, from the top: the glass seat and the polished
     face, a fillet, a lip, the narrow band of enamel in its cove, a lip, the flared rim, the rounded edge, the undercut and the foot. */
  "float sdPoly(vec2 p){vec2 V[14];V[0]=vec2(0.0,-0.02);V[1]=vec2(1.22,-0.02);V[2]=vec2(1.24,0.0);V[3]=vec2(1.44,0.0);V[4]=vec2(1.50,-0.045);V[5]=vec2(1.505,-0.085);",
  "  V[6]=vec2(1.47,-0.10);V[7]=vec2(1.47,-0.16);V[8]=vec2(1.505,-0.175);V[9]=vec2(1.56,-0.235);V[10]=vec2(1.575,-0.30);V[11]=vec2(1.51,-0.355);V[12]=vec2(1.40,-0.39);V[13]=vec2(0.0,-0.39);",
  "  float d=dot(p-V[0],p-V[0]);float sg=1.0;vec2 pv=V[13];for(int i=0;i<14;i++){vec2 vi=V[i];vec2 e=pv-vi;vec2 w=p-vi;vec2 b=w-e*clamp(dot(w,e)/dot(e,e),0.0,1.0);d=min(d,dot(b,b));",
  "    bvec3 c=bvec3(p.y>=vi.y,p.y<pv.y,e.x*w.y>e.y*w.x);if(all(c)||all(not(c)))sg=-sg;pv=vi;}return sg*sqrt(d);}",
  "float sdCase(vec3 p){return sdPoly(vec2(length(p.xz),p.y))-0.010;}",
  "vec2 polyN(vec2 p){vec2 V[14];V[0]=vec2(0.0,-0.02);V[1]=vec2(1.22,-0.02);V[2]=vec2(1.24,0.0);V[3]=vec2(1.44,0.0);V[4]=vec2(1.50,-0.045);V[5]=vec2(1.505,-0.085);",
  "  V[6]=vec2(1.47,-0.10);V[7]=vec2(1.47,-0.16);V[8]=vec2(1.505,-0.175);V[9]=vec2(1.56,-0.235);V[10]=vec2(1.575,-0.30);V[11]=vec2(1.51,-0.355);V[12]=vec2(1.40,-0.39);V[13]=vec2(0.0,-0.39);",
  "  float d=1e9;vec2 bb=vec2(0.0,1.0);float sg=1.0;vec2 pv=V[13];for(int i=0;i<14;i++){vec2 vi=V[i];vec2 e=pv-vi;vec2 w=p-vi;vec2 b=w-e*clamp(dot(w,e)/dot(e,e),0.0,1.0);float bd=dot(b,b);if(bd<d){d=bd;bb=b;}",
  "    bvec3 c=bvec3(p.y>=vi.y,p.y<pv.y,e.x*w.y>e.y*w.x);if(all(c)||all(not(c)))sg=-sg;pv=vi;}return sg*bb/max(sqrt(d),1e-6);}",
  "vec3 nCase(vec3 p){float r=length(p.xz);vec2 g=polyN(vec2(r,p.y));vec2 dr=p.xz/max(r,1e-5);return normalize(vec3(g.x*dr.x,g.y,g.x*dr.y));}",
  "float holder(vec3 ro,vec3 rd,out vec3 n,out vec3 p,out float part){float t=1e9;part=-1.0;n=vec3(0.0,1.0,0.0);p=vec3(0.0);vec3 q;float tt;",
  /* the bounding drum: where the ray enters it, the walk begins */
  "  float A=dot(rd.xz,rd.xz),B=dot(ro.xz,rd.xz),C=dot(ro.xz,ro.xz)-1.62*1.62,h=B*B-A*C;float t0=1e9,t1=-1e9;",
  "  if(h>0.0){float sq=sqrt(h);t0=(-B-sq)/A;t1=(-B+sq)/A;}else if(C<0.0){t0=-1e9;t1=1e9;}",
  "  if(abs(rd.y)>1e-6){float ya=(0.012-ro.y)/rd.y,yb=(-0.405-ro.y)/rd.y;t0=max(t0,min(ya,yb));t1=min(t1,max(ya,yb));}",
  "  bool seat=false;if(t1>max(t0,0.0)){float te=max(t0,0.0);vec3 pe=ro+rd*te;float tsx=rd.y<0.0?(-0.010-ro.y)/rd.y:-1.0;vec3 ps=ro+rd*tsx;",
  "    if(tsx>te&&pe.y>-0.0101&&dot(pe.xz,pe.xz)<1.205*1.205&&dot(ps.xz,ps.xz)<1.205*1.205){t=tsx;p=ps;part=1.0;seat=true;}",
  "    else{float tm2=te;for(int i=0;i<56;i++){vec3 pp=ro+rd*tm2;float d=sdCase(pp);if(d<0.0008){t=tm2;p=pp;part=1.0;break;}tm2+=d*0.95;if(tm2>t1)break;}}}",
  "  if(part>0.5)n=seat?vec3(0.0,1.0,0.0):nCase(p);",
  "  return t;}",
  /* the compass's light (Vocatio's studio: its window, its dark horizon line, its fill), as the other session drew it for the holder */
  "float vWin(vec3 v){if(dot(v,vec3(-0.50141,-0.62174,0.60169))<0.6)return 0.0;float a=abs(dot(v,vec3(-0.76822,0.0,-0.64018))),b=abs(dot(v,vec3(0.39803,-0.78322,-0.47764)));",
  "  return (1.0-smoothstep(0.17,0.215,a))*(1.0-smoothstep(0.25,0.30,b));}",
  "vec3 vEnv(vec3 v){float up=-v.y;vec3 c;if(uN>0.5){float a=0.22+0.2*smoothstep(-0.2,0.85,up);c=vec3(a*0.92,a*0.9,a*1.22)-smoothstep(0.0,0.7,-up)*vec3(0.15,0.14,0.18);}",
  "  else{float a=0.60+0.25*smoothstep(-0.2,0.9,up);c=vec3(a*0.975,a*0.972,a)-smoothstep(-0.05,0.65,-up)*vec3(0.36,0.36,0.31);}",
  "  float hz=(1.0-smoothstep(uN>0.5?0.1:0.05,uN>0.5?0.28:0.19,abs(v.y)))*(1.0-smoothstep(0.5,0.78,v.z))*0.85;vec3 hdc=uN>0.5?vec3(0.07,0.07,0.078):vec3(0.19,0.12,0.34);c+=(hdc-c)*hz;",
  "  float cam=smoothstep(0.88,0.975,v.z)*(uN>0.5?0.8:0.62);float cd=uN>0.5?0.1:0.42;c+=(vec3(cd,cd,cd*1.06)-c)*cam;",
  "  c+=vWin(v)*vec3(1.3,1.3,1.34);float fs=smoothstep(0.55,0.72,v.x)*(1.0-smoothstep(0.25,0.5,abs(v.y+0.1)));c+=fs*(uN>0.5?vec3(0.55,0.53,0.68):vec3(0.6,0.6,0.64));return max(c,0.0);}",
  "vec3 vTone(vec3 c){return mix(c,0.8+0.2*(1.0-exp(-(c-0.8)*5.0)),step(0.8,c));}",
  "vec3 toV(vec3 w){vec3 q=w*uCM;return vec3(q.x,-q.y,q.z);}",
  "vec3 spec(float h){return clamp(vec3(abs(h*6.0-3.0)-1.0,2.0-abs(h*6.0-2.0),2.0-abs(h*6.0-4.0)),0.0,1.0);}",
  "vec3 vio(float h){return mix(mix(vec3(0.42,0.20,0.95),vec3(0.66,0.32,0.98),smoothstep(0.0,0.5,h)),vec3(0.90,0.70,1.0),smoothstep(0.5,1.0,h));}",
  "vec3 hue(float h){vec3 s=spec(h*0.83);return (uN>0.5||uV>1.5)?mix(s,vio(h),0.5):(uV>0.5?mix(s,vio(h),0.4):s);}",
  "vec3 toH(vec3 w){return vec3(w.x,w.z,w.y);}",
  "vec3 lookTint(){if(uN>0.5)return vec3(0.36,0.22,0.66);if(uV<0.5)return vec3(0.40,0.50,0.74);if(uV<1.5)return vec3(0.50,0.38,0.84);if(uV<2.5)return vec3(0.42,0.24,0.80);return vec3(0.34,0.20,0.64);}",
  /* the holder's studio, seen in its polish: by day a bright room rising to a white ceiling, a crisp dark horizon line (the line that runs
     across the compass's silver), a window to the upper left and a strip light to the right; by night the violet room, the window dim, and
     the northern lights mirrored in the silver */
  "vec3 hEnv(vec3 w){float up=w.y;float az=atan(w.x,-w.z);float bk=smoothstep(-0.35,0.25,-w.z);vec3 c;",
  /* polished silver is all contrast: it mirrors bright strip lights and dark cards. By day white light round a dark floor, three dark cards
     high and low and a bright floor reflector; by night the violet room, lavender strip lights in the same places and the northern lights */
  "  float d1=smoothstep(0.13,0.15,up)*(1.0-smoothstep(0.20,0.22,up)),d2=smoothstep(0.34,0.36,up)*(1.0-smoothstep(0.43,0.45,up)),d3=smoothstep(0.60,0.62,up)*(1.0-smoothstep(0.70,0.72,up));float dk=max(max(d1,d2),d3)*bk;",
  "  float fl=smoothstep(-0.17,-0.14,up)*(1.0-smoothstep(-0.10,-0.07,up));",
  "  if(uN>0.5){c=mix(vec3(0.02,0.015,0.04),vec3(0.10,0.08,0.18),smoothstep(-0.6,-0.05,up));c=mix(c,vec3(0.22,0.17,0.38),smoothstep(-0.05,0.10,up));",
  "    c+=vec3(0.72,0.62,1.0)*dk*0.85+vec3(0.45,0.36,0.75)*fl*0.6;float band=exp(-pow((up-0.52-0.02*sin(az*2.6+uT*0.12))/0.05,2.0))*bk;float rays=0.55+0.45*sin(az*30.0+2.0*sin(az*5.0+uT*0.25));",
  "    c+=mix(vec3(0.42,0.22,0.92),vec3(0.80,0.42,0.97),0.5+0.5*sin(az*1.7+uT*0.07))*band*rays*0.8;}",
  "  else{c=mix(vec3(0.22,0.22,0.28),vec3(0.46,0.46,0.53),smoothstep(-0.6,-0.05,up));c=mix(c,vec3(1.08,1.08,1.13),smoothstep(-0.05,0.10,up));c=mix(c,vec3(0.24,0.15,0.40),dk*0.85);c+=vec3(1.0)*fl*0.8;c+=vec3(0.9,0.9,0.95)*vWin(toV(w))*0.9;}",
  "  c+=sbox(w,normalize(vec3(-0.50,0.50,-0.70)),vec2(0.16,0.08),0.4)*mix(2.4,0.9,uN)+sbox(w,normalize(vec3(0.86,0.30,-0.42)),vec2(0.05,0.32),0.35)*mix(1.6,0.6,uN);",
  "  return c;}",
  "const vec3 HPV=vec3(0.0,-0.12,0.0);const vec3 HS=vec3(0.0,0.0,0.0);vec3 rxv(vec3 v,float t){float c=cos(t),s=sin(t);return vec3(v.x,c*v.y-s*v.z,s*v.y+c*v.z);}",
  "vec3 rzv(vec3 v,float t){float c=cos(t),s=sin(t);return vec3(c*v.x-s*v.y,s*v.x+c*v.y,v.z);}vec3 hW(vec3 v){return rzv(rxv(v,uHT.x),uHT.y);}vec3 hL(vec3 v){return rxv(rzv(v,-uHT.y),-uHT.x);}",
  "vec3 cmpR(vec3 nn){vec3 nv=toV(hW(nn));float d=2.0*nv.z;return vec3(d*nv.x,d*nv.y,d*nv.z-1.0);}",
  "vec3 metal(vec3 rd,vec3 nn,float sh){if(uN<0.5)return vTone(vEnv(cmpR(nn))*vec3(0.965,0.96,0.975))*sh;vec3 R=hW(reflect(rd,nn));return vTone(hEnv(R)*vec3(0.965,0.96,0.985))*sh;}",
  "float lineAt(float x,float c,float w,float aa){return 1.0-smoothstep(w,w+aa,abs(x-c));}",
  "vec3 enamel(vec3 rd,vec3 nn,float k){vec3 base=lookTint();float dl=max(dot(nn,normalize(vec3(-0.45,0.8,0.4))),0.0);",
  "  float fz=0.04+0.6*pow(1.0-max(dot(-rd,nn),0.0),5.0);return vTone(base*(0.48+0.62*dl)*k+hEnv(hW(reflect(rd,nn)))*fz*mix(0.8,1.0,uN));}",
  /* a four-pointed star (the engine logo's), its sides curved in */
  "float astar(vec2 d,float s){vec2 a=abs(d)/s;return pow(a.x,0.6667)+pow(a.y,0.6667);}",
  /* under the crystal, Build's own heart (her words, 13 November 2026: "customised and curated specifically for the Build page and Ingenium's
     identity"): a vintage skeleton movement, the engine that builds. A pearl plate finished with broad watchmaker's stripes (deep violet by
     night); silver wheels with fine teeth and polished bevelled edges that mesh and turn slowly; a balance wheel with its hairspring swinging
     like a heartbeat (as Home's engine button beats); violet jewels in every bearing that glint as the light passes through the diamond; the
     engine logo's star at the heart beneath the stone; a fine scale round its edge; the stone's soft shadow and its small spectrum. */
  "float wheelM(vec2 q,vec2 c,float R,float N,float rot,float spk,out float edge,out vec2 ed){vec2 d=q-c;float rw=length(d);vec2 rad=d/max(rw,1e-5);float th=atan(d.y,d.x)-rot;edge=1.0;ed=rad;if(rw>R+0.03)return 0.0;",
  "  float tf=fract(th*N/6.2831853);float tooth=smoothstep(0.10,0.22,tf)*(1.0-smoothstep(0.52,0.64,tf));float rt=R+0.022*tooth;if(rw>rt)return 0.0;",
  "  float m=0.0;if(rw>R-0.035){m=1.0;float eo=rt-rw,ei=rw-(R-0.035);edge=min(eo,ei);ed=eo<ei?rad:-rad;}",
  "  else if(rw<0.065){m=1.0;edge=0.065-rw;ed=rad;}",
  "  else{float sa=fract(th*spk/6.2831853+0.5)-0.5;float sd=abs(sa)*6.2831853/spk*rw;float sw=0.016+0.006*(1.0-rw/R);if(sd<sw){m=1.0;edge=sw-sd;ed=vec2(-rad.y,rad.x)*sign(sa);}}",
  "  return m;}",
  "float sdCap(vec2 p,vec2 a,vec2 b,float r,out vec2 dir){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);vec2 d=pa-ba*h;float l=length(d);dir=d/max(l,1e-5);return l-r;}",
  /* the bridges: one over the third wheel, the balance cock, one over the fourth wheel, one over the second */
  "float bridges(vec2 q,out vec2 dir){float d=1e9,t;vec2 dd;dir=vec2(1.0,0.0);",
  "  t=sdCap(q,vec2(-0.86,0.30),vec2(-0.20,0.62),0.075,dd);if(t<d){d=t;dir=dd;}",
  "  t=sdCap(q,vec2(0.98,-0.18),vec2(0.56,-0.52),0.055,dd);if(t<d){d=t;dir=dd;}t=length(q-vec2(0.56,-0.52))-0.085;if(t<d){d=t;dir=normalize(q-vec2(0.56,-0.52)+1e-5);}",
  "  t=sdCap(q,vec2(-0.85,-0.45),vec2(0.05,-0.80),0.075,dd);if(t<d){d=t;dir=dd;}",
  "  t=sdCap(q,vec2(0.98,0.52),vec2(0.60,0.34),0.06,dd);if(t<d){d=t;dir=dd;}t=length(q-vec2(0.60,0.34))-0.075;if(t<d){d=t;dir=normalize(q-vec2(0.60,0.34)+1e-5);}",
  "  return d;}",
  /* the seat: Ingenium's Orrery, as Vocatio's compass draws it (its enamel dial and its engraving: Home's six rooms as raised orbs on
     engraved orbits with their wakes, the dotted paths, the constellations of the engine's stars, the scale and its pearls), the compass's
     own picture (IngStudios.kit.dial), turning slowly as the compass's dial does and spinning when pressed; the engine seal at its heart;
     the holder's chapter ring round its edge */
  /* the engine logo at the heart of the seat: its four layers, each a tile of uTx3 (the 120 box drawn 480 pixels wide, 16 pixels in from
     its tile's edge), seen through the plane at the layer's own height; turned and scaled as the logo is (uLG: the star's turn, the
     ring's turn, the heart's scale, the face's breath; uLH: the whole seal's turn and scale in a flourish, the ring's scale, the lift) */
  "const float LGR=0.385;",
  "vec2 lgR(vec2 u,float a){float c=cos(a),s=sin(a);return vec2(c*u.x+s*u.y,-s*u.x+c*u.y);}",
  "vec4 lgT(float k,vec2 P,float b){vec2 o=vec2(mod(k,2.0),floor(k*0.5));return texture2D(uTx3,(o*512.0+16.0+clamp(P,vec2(-3.5),vec2(123.5))*4.0)/1024.0,b);}",
  "vec2 lgW(vec3 p,vec3 rd,float h){vec3 ph=p+rd*(h/min(rd.y,-0.05));return ph.xz*(60.0/LGR);}",
  "vec2 lgU(vec3 p,vec3 rd,float h){return lgR(lgW(p,rd,h),uLH.x)/uLH.y;}",
  "vec3 lgLift(vec3 col,float k,vec2 u,float a,float sc){vec2 P=lgR(u,a)/sc+60.0;vec4 S=lgT(k,P,0.0);",
  "  float ca=lgT(k,lgR(u-vec2(0.8,1.9),a)/sc+60.0,2.0).a,a1=lgT(k,lgR(u-vec2(0.8,0.9),a)/sc+60.0,0.0).a,a2=lgT(k,lgR(u+vec2(0.8,0.9),a)/sc+60.0,0.0).a;",
  "  col=mix(col,uN>0.5?vec3(0.0):vec3(0.165,0.078,0.314),(uN>0.5?0.55:0.30)*ca);col=col*(1.0-S.a)+S.rgb;",
  "  col=mix(col,vec3(1.0),(uN>0.5?0.5:0.42)*S.a*max(0.0,1.0-a1));col=mix(col,uN>0.5?vec3(0.071,0.031,0.149):vec3(0.141,0.063,0.290),(uN>0.5?0.35:0.30)*S.a*max(0.0,1.0-a2));return col;}",
  "vec3 logo(vec3 col,vec3 p,vec3 rd){float hv=uLH.w;vec3 vio=uN>0.5?vec3(0.788,0.698,0.949):vec3(0.416,0.247,0.710);",
  "  float d0=length(p.xz)*(60.0/LGR);float rg=79.2*uLQ.x;if(uLQ.y>0.0&&d0<rg)col=mix(col,vio,(uN>0.5?0.36:0.34)*uLQ.y*(1.0-d0/rg));",
  "  vec2 so=vec2(1.2,2.4)+vec2(0.5,1.0)*hv*160.0;float sa=lgT(0.0,lgU(p,rd,0.0)-so+60.0,2.0+hv*30.0).a;col*=1.0-(uN>0.5?0.5:0.3)*sa/(1.0+hv*25.0);",
  "  vec2 ub=lgU(p,rd,0.004+hv);vec4 B=lgT(0.0,ub+60.0,0.0);col=col*(1.0-B.a)+B.rgb;",
  "  float db=length(ub);if(db<53.0)col=mix(col,vec3(0.769,0.690,0.933),0.22*max(0.0,1.0-db/58.3)*uLG.w);",
  "  vec2 ur=lgU(p,rd,0.007+hv);vec4 Rg=lgT(1.0,lgR(ur,uLG.y)/uLH.z+60.0,0.0);col=col*(1.0-Rg.a)+Rg.rgb;",
  "  col=lgLift(col,2.0,lgU(p,rd,0.011+hv),uLG.x,1.0);",
  "  col=lgLift(col,3.0,lgU(p,rd,0.016+hv),0.0,uLG.z);",
  "  return col;}",
  "vec3 dialCol(vec3 p,vec3 rd,float glow,vec3 go){float r=length(p.xz),an=atan(p.z,p.x);vec3 up=vec3(0.0,1.0,0.0);float aa=0.002+0.0012*length(p-uCP);vec2 q=p.xz;",
  "  vec3 KL=normalize(vec3(-0.45,0.8,0.4));vec2 L=vec2(0.016,0.026);float T=uT;float OT=uHA.x;",
  "  float da=uHC.w;float cd=cos(da),sd=sin(da);vec2 qd=vec2(cd*q.x+sd*q.y,-sd*q.x+cd*q.y);vec2 uv=vec2(0.5)+qd/2.36;",
  "  vec3 col=uDial>0.5?texture2D(uTx2,uv).rgb:(uN>0.5?vec3(0.14,0.095,0.26):vec3(0.955,0.94,0.98));",
  "  if(uDial>0.5&&uN<0.5)col=mix(col,col*col,0.4);",
  "  col=col*(uN>0.5?1.0:0.98)+hEnv(hW(reflect(rd,up)))*(uN>0.5?0.035:0.025);",
  "  if(uLogo>0.5&&r<LGR*1.45)col=logo(col,p,rd);",
  "  float fa=an+OT*0.006;float tq=fa/6.2831853*120.0;float ti=floor(tq+0.5);float dq=abs(tq-ti)*6.2831853/120.0*r;float lg=mod(ti,10.0)<0.5?1.0:0.0;",
  "  if(r>1.165){vec2 dn=q/max(r,1e-4);col=metal(rd,normalize(up-vec3(dn.x,0.0,dn.y)*0.25),1.0);float tk=(1.0-smoothstep(0.0012,0.0012+aa,dq))*smoothstep(lg>0.5?1.170:1.185,lg>0.5?1.174:1.189,r);col*=1.0-0.6*tk;}",
  "  else{col*=1.0-0.30*(1.0-smoothstep(0.0,0.025,1.165-r));}",
  "  vec2 sc=p.xz-vec2(0.08,0.16);float s=exp(-dot(sc,sc)/0.30);col*=1.0-mix(0.18,0.28,uN)*s;",
  "  vec2 k0=vec2(0.30,0.42);vec2 dd=p.xz-k0;float a1=dot(dd,normalize(vec2(1.0,0.35))),w1=dot(dd,normalize(vec2(-0.35,1.0)));float g=exp(-w1*w1/0.018)*exp(-a1*a1/0.05);col+=hue(clamp(0.5+w1*2.6,0.0,1.0))*g*mix(0.22,0.45,uN)*(0.35+1.6*glow);",
  "  if(uHV.x>0.001)col+=(uN>0.5?vec3(0.50,0.38,0.86):vec3(0.86,0.80,1.0))*uHV.x*(uN>0.5?0.10:0.07)*(1.0-smoothstep(0.85,1.2,r));",
  "  return col;}",
  /* a small brilliant set in the holder's wall, its table outward: traced in its own frame (tg across the wall, o outward, up), three bounces */
  "vec3 gemlet(vec3 rd,vec3 o,vec3 tg,vec3 up,vec2 dv,float pr,float seed){vec3 rl=vec3(dot(rd,tg),dot(rd,o),dot(rd,up));vec3 ro=vec3(dv.x/pr,0.0,dv.y/pr)-rl*3.0;",
  "  float tn,tf;vec3 nn,nf;cvx(ro,rl,tn,tf,nn,nf);if(!(tn<tf))return vec3(-1.0);vec3 p=ro+rl*tn;float F=fr(-dot(rl,nn));",
  "  vec3 R=reflect(rl,nn);vec3 col=F*hEnv(hW(tg*R.x+o*R.y+up*R.z))*1.3;vec3 d=refract(rl,nn,1.0/IOR);vec3 thr=vec3(1.0-F);",
  "  for(int k=0;k<3;k++){cvx(p+d*0.0005,d,tn,tf,nn,nf);p=p+d*tf;vec3 m=nf;vec3 t2=refract(d,-m,IOR);",
  "    if(dot(t2,t2)>0.0){vec3 wd=tg*t2.x+o*t2.y+up*t2.z;vec3 e=hEnv(hW(wd))*1.3;float hh=fract(seed*0.37+float(k)*0.29+atan(t2.z,t2.x)*0.16);col+=thr*(1.0-fr(dot(t2,m)))*mix(e,spec(hh)*dot(e,vec3(0.3,0.5,0.2))*1.8,0.5);}",
  "    float Fm=dot(t2,t2)>0.0?fr(dot(t2,m)):1.0;thr*=Fm;d=reflect(d,-m);if(max(thr.r,max(thr.g,thr.b))<0.04)break;}",
  "  col+=thr*hEnv(hW(tg*d.x+o*d.y+up*d.z))*0.6;return col;}",
  /* a hollow's shade: how far the solid is from the surface along its normal, as a turned part darkens in its coves and under its lips */
  "float caseAO(vec3 p,vec3 n){float a=0.0;a+=clamp(sdCase(p+n*0.02)/0.02,0.0,1.0)*0.5;a+=clamp(sdCase(p+n*0.05)/0.05,0.0,1.0)*0.3;a+=clamp(sdCase(p+n*0.10)/0.10,0.0,1.0)*0.2;return a;}",
  /* the case: polished silver in the compass's own light, a hair of satin, darker in its coves; the polished face engine turned in fine
     rings; the enamel band in a deep, quiet violet with a silver scale cut into it and twelve small brilliants set round it */
  "vec3 silverC(vec3 rd,vec3 nn,float sh){if(uN>0.5)return vTone(hEnv(hW(reflect(rd,nn)))*vec3(0.965,0.96,0.985))*sh;",
  "  vec3 a=vEnv(cmpR(nn)),b=vEnv(cmpR(normalize(nn+vec3(0.0,0.06,0.0)))),c=vEnv(cmpR(normalize(nn-vec3(0.0,0.06,0.0))));return vTone((a*0.5+b*0.25+c*0.25)*vec3(0.965,0.96,0.975))*sh;}",
  "vec3 holderCol(vec3 p,vec3 n,vec3 rd,float part,float glow){vec3 nn=n;vec3 col;float r=length(p.xz),an=atan(p.z,p.x);vec3 o=vec3(cos(an),0.0,sin(an)),tg=vec3(-sin(an),0.0,cos(an)),up=vec3(0.0,1.0,0.0);",
  "  float aa=0.002+0.0012*length(p-uCP);",
  /* (the crystal that once covered the Orrery is gone, and with it its sums) */
  "  if(part>0.5){float ao=1.0;float y=p.y;float aaf=0.0016+0.001*length(p-uCP);",
  "    float band=smoothstep(-0.165,-0.155,y)*(1.0-smoothstep(-0.105,-0.095,y))*step(1.455,r);if(r<1.215&&y>-0.035){col=dialCol(p,rd,glow,p-rd*0.6);band=-1.0;}else ao=mix(0.55,0.72,uN)+mix(0.45,0.28,uN)*caseAO(p,nn);",
  "    if(band>0.0){",
  "      float ab=an-uHA.z;float tq=ab/6.2831853*72.0;float ti=floor(tq+0.5);float dq=abs(tq-ti)*6.2831853/72.0*r;float lg=mod(ti,6.0)<0.5?1.0:0.0;",
  "      float tk=(1.0-smoothstep(0.0022,0.0022+aaf,dq))*smoothstep(-0.150,-0.148,y)*(1.0-smoothstep(mix(-0.128,-0.112,lg),mix(-0.126,-0.110,lg),y));",
  "      vec3 base=mix(lookTint(),vec3(0.30,0.22,0.46),0.45)*0.80;float dl=max(dot(toV(hW(nn)),vec3(-0.50141,-0.62174,0.60169)),0.0);vec3 R=cmpR(nn);",
  "      vec3 em=uN>0.5?enamel(rd,nn,1.0):vTone(base*(0.70+0.45*dl)+vEnv(R)*(0.03+0.45*pow(1.0-clamp(toV(hW(nn)).z,0.0,1.0),5.0))+vWin(R)*vec3(0.30,0.30,0.34));",
  "      col=mix(em,silverC(rd,normalize(nn-o*0.3),1.0),tk);",
  "      float pc=0.52359878;float pk=floor(ab/pc+0.5);vec2 dv=vec2((ab-pk*pc)*r,y+0.130);float pd=length(dv),pr=0.021;",
  "      float ca=uT-uHB.w;float hd2=1.5708+ca*1.35;float dA=abs(mod(pk*pc+uHA.z-hd2+3.14159,6.2831853)-3.14159);float cg=(ca>0.0&&ca<4.6)?exp(-dA*dA/0.20)*sin(3.14159*ca/4.6):0.0;col+=vec3(0.85,0.70,1.0)*cg*0.20*exp(-pd*pd/0.004);",
  "      if(pd<pr+0.007){if(pd>=pr){float h=(pd-pr)/0.007;vec2 dn2=dv/max(pd,1e-5);col=silverC(rd,normalize(o+(tg*dn2.x+up*dn2.y)*mix(-0.8,0.8,h)),1.0);}",
  "        else{vec3 gc=gemlet(rd,o,tg,up,dv,pr,pk);col=gc.x<0.0?silverC(rd,o,1.0):vTone(gc*(0.9+0.5*glow+1.1*cg)+vec3(0.85,0.70,1.0)*cg*0.22);}}",
  "      col+=vec3(0.85,0.70,1.0)*0.12*uHV.z;col*=ao;}",
  "    else if(band==0.0){float sh=1.0;vec3 nq=nn;",
    /* the bezel's turned grooves fade where a pixel spans half a groove or more (far and near, where the top is seen edge on), so they
     never break into a shimmering pattern as the holder moves */
"      if(y>-0.012&&r>1.245&&r<1.435){vec2 rv=normalize(rd.xz+vec2(1e-5,0.0));float fpr=uPx.y*length(p-uCP)*mix(1.0,1.0/max(abs(rd.y),0.1),abs(dot(normalize(o.xz+vec2(1e-5,0.0)),rv)));float gA=1.0-smoothstep(0.30,0.48,fpr*33.42);float g=sin(r*210.0)*gA;nq=normalize(nn+vec3(o.x,0.0,o.z)*0.05*g);sh=0.96+0.04*g;float bz=an-uHA.y;",
  /* the bezel's scale: 72 cuts, the long ones at the hours, and twelve raised pearls between them; it turns as a bezel does */
  "        float tq=bz/6.2831853*72.0;float ti=floor(tq+0.5);float dq=abs(tq-ti)*6.2831853/72.0*r;float lg=mod(ti,6.0)<0.5?1.0:0.0;",
  "        float tk=(1.0-smoothstep(0.0016,0.0016+aaf,dq))*smoothstep(lg>0.5?1.27:1.30,lg>0.5?1.275:1.305,r)*(1.0-smoothstep(lg>0.5?1.40:1.37,lg>0.5?1.405:1.375,r));sh*=(1.0-0.55*tk)*(1.0+0.14*uHV.y);",
  "        float pk=floor(bz/0.5235988)+0.5;float pa=pk*0.5235988+uHA.y;vec2 pc=vec2(cos(pa),sin(pa))*1.34;vec2 dq2=p.xz-pc;float pd=length(dq2);",
  "        if(pd<0.017){nq=normalize(vec3(dq2.x,sqrt(0.017*0.017-pd*pd)*0.9,dq2.y));sh=1.0;}else if(pd<0.024)sh*=0.80;}",
  "      col=silverC(rd,nq,sh)*ao*(y<-0.17?1.0+0.12*uHV.w:1.0);",
  /* a light running round the rim and the foot, now and then, and when the case is knocked */
  "      float sa=uT-uHC.y;if(sa>0.0&&sa<5.6&&y<-0.17){float ang=1.5708+sa*1.15;float dA=abs(mod(an-ang+3.14159,6.2831853)-3.14159);col+=vec3(1.0,0.97,1.0)*exp(-dA*dA/0.05)*sin(3.14159*sa/5.6)*0.26;}",
  "      }}",
  "  return col;}",
  /* a shaft of light, and a pulse running down it (her first design): sp is where the pulse is (0 to 1), sl its length */
  "float beam(vec3 ro,vec3 rd,vec3 a,vec3 b,float w,float th,float sp,float sl,float base,float pk){vec3 ba=b-a,w0=ro-a;float B=dot(rd,ba),C=dot(ba,ba),Dd=dot(rd,w0),E=dot(ba,w0),den=C-B*B;",
  "  float s=den>1e-6?clamp((E-B*Dd)/den,0.0,1.0):0.0;float t=max(dot(a+ba*s-ro,rd),0.0);vec3 q=ro+rd*t-(a+ba*s);float d2=dot(q,q);",
  "  float f=smoothstep(0.0,0.05,s)*smoothstep(1.0,0.82,s);float occ=t>th?0.12:1.0;float core=exp(-d2/(w*w))+0.22*exp(-d2/(w*w*14.0));",
  "  float pu=sl>0.0?exp(-pow((s-sp)/sl,2.0))*(1.0+3.0*exp(-d2/(w*w*0.35))):0.0;return core*f*occ*(base+pk*pu);}",
  /* a beam of light: the segment a (tail) to b (head), brighter toward the head; hd is the head's glow; sp where along the tail */
  "float comet(vec3 ro,vec3 rd,vec3 a,vec3 b,float th,out float hd,out float sp){vec3 ba=b-a,w0=ro-a;float B=dot(rd,ba),C=dot(ba,ba),Dd=dot(rd,w0),E=dot(ba,w0),den=C-B*B;",
  "  float s=den>1e-6?clamp((E-B*Dd)/den,0.0,1.0):1.0;sp=s;float t=max(dot(a+ba*s-ro,rd),0.0);vec3 q=ro+rd*t-(a+ba*s);float d2=dot(q,q);float occ=t>th?0.12:1.0;",
  "  float w=0.007+0.007*s;float core=exp(-d2/(w*w))*s*s+0.22*exp(-d2/(w*w*14.0))*s*s*s;",
  "  float tb=max(dot(b-ro,rd),0.0);vec3 qh=ro+rd*tb-b;float dh=dot(qh,qh);hd=(exp(-dh/0.0006)+0.30*exp(-dh/0.010))*(tb>th?0.12:1.0);return core*occ;}",
  /* the northern lights: curtains with a sharp lower edge and long rays, folding, drifting, brightening in waves */
  "vec4 aurora(vec2 v){vec3 col=vec3(0.0);float acc=0.0;",
  "  for(int L=0;L<3;L++){float fl=float(L);float x=v.x*(1.5+fl*0.45)+fl*3.1;",
  "    float base=0.66+fl*0.05+0.06*sin(x*1.2+uT*0.06+fl)+0.03*sin(x*3.0-uT*0.10+fl*2.0)+0.05*(vn(vec2(x*0.7,uT*0.04+fl*5.0))-0.5);",
  "    float dy=v.y-base;float ry=vn(vec2(x*16.0+uT*(0.20+fl*0.07),fl*7.0+uT*0.05));ry=pow(ry,1.6);",
  "    float wave=0.5+0.5*sin(x*2.2-uT*0.55+fl*1.7);wave=0.45+0.55*wave*wave;",
  "    float edge=smoothstep(-0.018,0.004,dy)*exp(-max(dy,0.0)/(0.09+0.03*fl));float a=edge*(0.30+0.70*ry)*wave*(0.62-fl*0.14);",
  "    vec3 c;if(uN>0.5){c=mix(vec3(0.92,0.52,0.98),vec3(0.46,0.26,0.96),smoothstep(0.0,0.10,dy));c=mix(c,vec3(0.30,0.16,0.72),smoothstep(0.08,0.24,dy));}",
  "    else{c=mix(vec3(1.0,0.56,0.88),vec3(0.64,0.44,1.0),smoothstep(0.0,0.09,dy));c=mix(c,vec3(0.50,0.58,1.0),smoothstep(0.08,0.24,dy));}col+=c*a;acc+=a;}",
  "  float ex=smoothstep(0.0,0.14,v.x)*smoothstep(1.0,0.86,v.x)*smoothstep(1.0,0.84,v.y)*smoothstep(0.34,0.56,v.y);return vec4(col*ex,clamp(acc*ex,0.0,1.0));}",
  "vec3 tm(vec3 c){return uN>0.5?1.0-exp(-c*1.06):1.0-exp(-c*1.30);}",
  "void main(){vec2 sp=(v*2.0-1.0)*vec2(uAsp,1.0)*uTan;vec3 rd=normalize(uCM*vec3(sp,-1.0)),ro=uCP;",
  "  float hs,ts;vec3 sc=stone(ro,rd,hs,ts);if(hs>0.5){vec3 acc=sc;float hh2,tt2;for(int k=0;k<3;k++){if(float(k)>=uAA)break;vec2 o2=uAA<1.5?vec2(0.5,0.5):(k==0?vec2(-0.25,-0.25):(k==1?vec2(0.25,-0.25):vec2(-0.25,0.25)));vec3 rd2=normalize(uCM*vec3(sp+(o2+vec2(0.0,0.0))*uPx-vec2(0.0,0.0),-1.0));vec3 s2=stone(ro,rd2,hh2,tt2);acc+=hh2>0.5?s2:sc;}sc=acc/(1.0+uAA);}vec3 pn,pp;float part;vec3 roL=hL(ro-HPV)+HPV-HS-vec3(0.0,uHA.w,0.0),rdL=hL(rd);float tp=holder(roL,rdL,pn,pp,part);",
  /* the light, as her first design had it (her words, 13 November 2026: "I want the beams from my initial design back. I just didn't like how
     they were just hanging on the Diamond like strings"): a ray shoots in, runs through the stone along its inner paths and flies out in
     three fans of colour, one glancing off the holder; from a new angle each time and only now and then. The rays show only while the
     light runs along them and fade straight after, so nothing hangs on the stone. */
  "  float f=uL.z<-50.0?9.0:max(uT-uL.z,0.0)/9.0;",
  "  float sIn=clamp(f/0.03,0.0,1.0),onIn=step(f,0.035);float sOut=clamp((f-0.05)/0.045,0.0,1.0),onOut=step(0.045,f)*step(f,0.11);",
  "  float glow=exp(-max(0.0,f-0.07)*9.0)*step(0.05,f);float aft=exp(-max(0.0,f-0.09)*12.0)*step(0.03,f);float lit=glow;",
  "  float A=uL.x;vec3 dA=vec3(cos(A),0.0,sin(A)),tg=vec3(-dA.z,0.0,dA.x);vec3 E=uDC+dA*0.30+vec3(0.0,0.24,0.0),P1=uDC-dA*0.05+vec3(0.0,-0.30,0.0),P2=uDC-dA*0.34+vec3(0.0,-0.05,0.0);",
  "  vec3 col=vec3(0.0);float a=0.0;float th=1e9;",
  "  if(hs>0.5&&ts<tp){col=sc;a=1.0;th=ts;col*=1.0+mix(0.22,0.46,uN)*glow;",
  "    float s1=clamp((f-0.028)/0.012,0.0,1.0),s2=clamp((f-0.040)/0.012,0.0,1.0);float on1=step(0.026,f)*step(f,0.075),on2=step(0.038,f)*step(f,0.085);",
  "    vec3 Xi=uDC-dA*0.55+vec3(0.0,-0.42,0.0);if(f<0.7)col+=vec3(1.0,0.96,1.0)*beam(ro,rd,E,Xi,0.022,1e9,s1,0.30,0.0,1.2*on1);",
  "    col=tm(col);}",
  "  else if(tp<1e8){vec3 hc=holderCol(pp,pn,rdL,part,lit);col=uN>0.5?tm(hc):min(hc,vec3(1.0));a=1.0;th=tp;}",
  "  else{if(uBG<0.5){vec4 au=aurora(v);float ai=uN>0.5?0.95:1.0;col=au.rgb*ai;a=clamp(au.a*ai,0.0,1.0);}",
  "    if(uN<0.5&&uBG<0.5){vec2 wc=(v-vec2(0.50,0.52))*vec2(uAsp,1.0);float wg=exp(-dot(wc,wc)/0.34);vec3 wcol=mix(vec3(1.0,0.70,0.86),vec3(0.70,0.60,1.0),clamp(v.x*0.8+v.y*0.3,0.0,1.0));col+=wcol*wg*0.50;a=max(a,wg*0.50);vec2 gc=(v-vec2(0.50,0.60))*vec2(uAsp,1.0);float gg=exp(-dot(gc,gc)/0.045);col+=vec3(0.70,0.50,1.0)*gg*0.34;a=max(a,gg*0.34);",
  "      vec2 fc=(v-vec2(0.52,0.22))*vec2(uAsp,1.6);float fg=exp(-dot(fc,fc)/0.12);col+=vec3(0.78,0.62,1.0)*fg*0.34;a=max(a,fg*0.34);}",
  /* the holder's own soft shadow beneath it, so it seems to float */
  "    if(rd.y<0.0){float tf=(-0.37-ro.y)/rd.y;vec3 f=ro+rd*tf;float r=length(f.xz);float sa=mix(0.20,0.42,uN)*exp(-pow(max(r-1.30,0.0)/0.42,2.0))*smoothstep(2.6,1.8,r);vec3 scl=uN>0.5?vec3(0.0):vec3(0.20,0.15,0.34)*sa;col=col*(1.0-sa)+scl;a=a+sa*(1.0-a);}}",
  /* the ray in, the three fans out (the falling one glances off the holder), each with its pulse and a quick afterglow, then gone */
  /* her words (14 November 2026): "I want only or two rays shooting through the diamond and at diagonal or opposite angles so that it looks
     more natural and enhances the sparkles of the diamond without ruining the look"; the fans that bounced off "like a lightning bolt" are
     gone. One ray comes in on the upper diagonal, runs straight through the stone and leaves on the lower opposite diagonal, thinning and
     fading as it goes, with a thread of colour where it leaves the glass; every other time a second, fainter ray crosses it from the other
     side. Nothing hangs on the stone between pulses. */
  "  float I=mix(0.30,0.44,uN);vec3 L=vec3(0.0);if(f<0.7){float el=0.95+0.18*sin(uL.z*1.7);vec3 S0=E+normalize(dA*0.85+vec3(0.0,el,0.0)+tg*0.25)*4.6;",
  "  L+=vec3(1.0,0.98,1.0)*beam(ro,rd,S0,E,0.014,th,sIn,0.06,0.9*aft,2.2*onIn)*I;",
  "  vec3 Xo=uDC-dA*0.55+vec3(0.0,-0.42,0.0);vec3 dO=normalize(Xo-E);vec3 Xe=Xo+dO*2.8;",
  "  L+=mix(vec3(1.0,0.98,1.0),hue(0.62),0.35)*beam(ro,rd,Xo,Xe,0.012,th,sOut,0.10,0.85*aft,2.0*onOut)*I*0.85;",
  "  if(uL.w>0.5){vec3 dB=vec3(-dA.z,0.0,dA.x);vec3 E2=uDC+dB*0.30+vec3(0.0,0.26,0.0);vec3 S2=E2+normalize(dB*0.85+vec3(0.0,0.75,0.0)-tg*0.2)*4.4;vec3 X2=uDC-dB*0.52+vec3(0.0,-0.40,0.0);",
  "    L+=vec3(1.0,0.98,1.0)*beam(ro,rd,S2,E2,0.012,th,sIn,0.06,0.55*aft,1.4*onIn)*I*0.6;L+=mix(vec3(1.0,0.98,1.0),hue(0.25),0.35)*beam(ro,rd,X2,X2+normalize(X2-E2)*2.6,0.010,th,sOut,0.10,0.55*aft,1.3*onOut)*I*0.5;}}",
  "  float eb=smoothstep(0.0,0.10,v.x)*smoothstep(1.0,0.90,v.x)*smoothstep(0.0,0.08,v.y)*smoothstep(1.0,0.88,v.y);vec3 Lt=tm(L)*eb;",
  "  col=col+Lt*(1.0-0.35*a);a=max(a,clamp(max(Lt.r,max(Lt.g,Lt.b))*1.15,0.0,1.0));gl_FragColor=vec4(min(col,vec3(a)),a);}"].join("\n");
  function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
  function init(){try{gl=cv.getContext("webgl",{premultipliedAlpha:true,alpha:true,antialias:false,powerPreference:"low-power"})||cv.getContext("experimental-webgl");}catch(e){gl=null;}
    if(!gl)return false;try{pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
      if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));}catch(e){W.__diamondErr=String(e);return false;}
    gl.useProgram(pr);var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    var loc=gl.getAttribLocation(pr,"p");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    ["uT","uN","uV","uAsp","uTan","uY","uPx","uDial","uCP","uDC","uCM","uR","uTab","uL","uHT","uHA","uHB","uHC","uLogo","uLG","uLH","uLR","uLQ","uAA","uHV","uBG","uSc"].forEach(function(n){U[n]=gl.getUniformLocation(pr,n);});U.uG=gl.getUniformLocation(pr,"uG[0]");
    var g=[];GROUPS.forEach(function(x){g.push(x[0],x[1],x[2],x[3]);});gl.uniform4fv(U.uG,new Float32Array(g));gl.uniform1f(U.uTab,HT);
    gl.uniform3fv(U.uCP,new Float32Array(CP));gl.uniformMatrix3fv(U.uCM,false,new Float32Array([CR[0],CR[1],CR[2],CU[0],CU[1],CU[2],-CF[0],-CF[1],-CF[2]]));
    gl.uniform1f(U.uTan,TAN);gl.uniform1f(U.uAsp,W0/H0);
    var tx=gl.createTexture();gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,tx);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,0]));
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(pr,"uTx"),1);
    tx2=gl.createTexture();gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,tx2);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([240,236,250,255]));
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(pr,"uTx2"),2);
    tx3=gl.createTexture();gl.activeTexture(gl.TEXTURE3);gl.bindTexture(gl.TEXTURE_2D,tx3);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,0]));
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(pr,"uTx3"),3);gl.activeTexture(gl.TEXTURE0);
    function word(){var c=D.createElement("canvas");c.width=1024;c.height=128;var x=c.getContext("2d");x.clearRect(0,0,1024,128);x.fillStyle="#fff";x.textAlign="center";x.textBaseline="middle";
      x.font='600 88px "Home Cormorant","Cormorant Garamond",Cormorant,Georgia,serif';var t="INGENIUM",sp=34,w=0,k;for(k=0;k<t.length;k++)w+=x.measureText(t[k]).width+(k?sp:0);var cx=512-w/2;
      for(k=0;k<t.length;k++){var cw=x.measureText(t[k]).width;x.fillText(t[k],cx+cw/2,68);cx+=cw+sp;}
      gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,tx);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);gl.activeTexture(gl.TEXTURE0);kick();}
    try{if(D.fonts&&D.fonts.load)D.fonts.load('600 88px "Home Cormorant"').then(word,word);else word();}catch(e){word();}

    return true;}
  function dpr(){return Math.min(2,Math.max(1,W.devicePixelRatio||1));}
  /* the compass's dial, as Vocatio draws it (modules/r290.js: its enamel picture under its engraved rings and Ingenium's Orrery), read from
     the compass itself once it has been drawn, by day and by night, and put under the glass as a picture */
  /* the engine logo at the heart of the seat (her words, 14 November 2026: "the engine logo needs to be drawn to fit the middle of the
     holder not this randomised symbol"): Ingenium's own seal as the app draws it, the base page's #introSeal svg.seal3d (R71, approved on
     7 October 2026) in R104's four layers, with the base page's .seal3d colours by day and by night; by night its face is a deep indigo enamel, not the charcoal (her words, 14
     November 2026: "remove the charcoal inside of the engine logo"; "I approve of the deep indigo face") */
  var LOGO={defs:'<defs><linearGradient id="sdRim" x1="0" y1="0" x2="1" y2="1"><stop class="s4-r0" offset="0"/><stop class="s4-r1" offset="0.5"/><stop class="s4-r2" offset="1"/></linearGradient><linearGradient id="sdSpec" x1="0" y1="0" x2="1" y2="1"><stop class="s4-sp" offset="0" stop-opacity="0.95"/><stop class="s4-sp" offset="0.42" stop-opacity="0"/></linearGradient><linearGradient id="sdFace" x1="0" y1="0" x2="1" y2="1"><stop class="s4-f0" offset="0"/><stop class="s4-f1" offset="1"/></linearGradient><linearGradient id="sdWell" x1="0" y1="0" x2="1" y2="1"><stop class="s4-w0" offset="0"/><stop class="s4-w0" offset="0.38" stop-opacity="0"/><stop class="s4-w1" offset="0.62" stop-opacity="0"/><stop class="s4-w1" offset="1"/></linearGradient><linearGradient id="sdFade" x1="0" y1="0" x2="1" y2="0"><stop class="s4-fd" offset="0" stop-opacity="0.55"/><stop class="s4-fd" offset="0.55" stop-opacity="0.55"/><stop class="s4-fd" offset="1" stop-opacity="0.08"/></linearGradient><radialGradient id="sdStone" cx=".36" cy=".32" r=".75"><stop class="s4-st0" offset="0"/><stop class="s4-st1" offset="1"/></radialGradient><radialGradient id="sdPearl" cx=".38" cy=".34" r=".72"><stop offset="0" stop-color="#ffffff"/><stop class="s4-pl" offset="1"/></radialGradient></defs>',
    back:'<circle cx="60" cy="60" r="56.2" fill="url(#sdFace)"/><circle cx="60" cy="60" r="54.50" fill="none" stroke="url(#sdWell)" stroke-width="1.40"/><circle cx="60" cy="60" r="56" fill="none" stroke="url(#sdRim)" stroke-width="1.40"/><circle cx="60" cy="60" r="56.50" fill="none" stroke="url(#sdSpec)" stroke-width="0.70"/>',
    ring:'<g class="seal-counter"><circle cx="60" cy="60" r="50" fill="none" stroke="url(#sdFade)" stroke-width="1.20"/></g>',
    star:'<g class="seal-spin"><g transform="rotate(0 60 60)"><path class="s4-lit" d="M60 60 L60 30 C58.25 37.5, 54.5 44.125, 49.31 49.31 Z"/><path class="s4-shade" d="M60 60 L60 30 C61.75 37.5, 65.5 44.125, 70.69 49.31 Z"/></g><g transform="rotate(90 60 60)"><path class="s4-lit" d="M60 60 L60 30 C58.25 37.5, 54.5 44.125, 49.31 49.31 Z"/><path class="s4-shade" d="M60 60 L60 30 C61.75 37.5, 65.5 44.125, 70.69 49.31 Z"/></g><g transform="rotate(180 60 60)"><path class="s4-lit" d="M60 60 L60 30 C58.25 37.5, 54.5 44.125, 49.31 49.31 Z"/><path class="s4-shade" d="M60 60 L60 30 C61.75 37.5, 65.5 44.125, 70.69 49.31 Z"/></g><g transform="rotate(270 60 60)"><path class="s4-lit" d="M60 60 L60 30 C58.25 37.5, 54.5 44.125, 49.31 49.31 Z"/><path class="s4-shade" d="M60 60 L60 30 C61.75 37.5, 65.5 44.125, 70.69 49.31 Z"/></g></g>',
    heart:'<g class="seal-heart"><circle cx="60" cy="60" r="9" fill="url(#sdStone)"/><circle cx="60" cy="60" r="5.2" fill="url(#sdPearl)"/><circle cx="58.28" cy="58.18" r="1.25" fill="#ffffff" opacity=".9"/></g>'},
    LCSS={d:'.s4-r0{stop-color:#b39bea}.s4-r1{stop-color:#6a3fb5}.s4-r2{stop-color:#472b7f}.s4-sp{stop-color:#ffffff}.s4-f0{stop-color:#ffffff}.s4-f1{stop-color:#efe8f8}.s4-w0{stop-color:#3b2066;stop-opacity:.14}.s4-w1{stop-color:#ffffff;stop-opacity:.7}.s4-fd{stop-color:#6a3fb5}.s4-lit{fill:#9275d8}.s4-shade{fill:#7853c3}.s4-st0{stop-color:#8f68d8}.s4-st1{stop-color:#4b2a86}.s4-pl{stop-color:#dccff4}',
      n:'.s4-r0{stop-color:#e2d5fa}.s4-r1{stop-color:#9a7ad8}.s4-r2{stop-color:#3d2572}.s4-sp{stop-color:#ffffff}.s4-w0{stop-color:#000000;stop-opacity:.35}.s4-w1{stop-color:#cdb8f0;stop-opacity:.45}.s4-fd{stop-color:#b79ce6}.s4-lit{fill:#a68ce6}.s4-shade{fill:#8360cf}.s4-st0{stop-color:#9f7ae6}.s4-st1{stop-color:#4b2a86}.s4-pl{stop-color:#e4d9f8}.s4-f0{stop-color:#3e2f86}.s4-f1{stop-color:#17113a}'},LOGOK="",LOGON=0,LOGOOK=0,tx3=null;
  function logoTex(){var k=night()?"n":"d";if(LOGOK===k||!gl||!tx3)return;LOGOK=k;var tok=++LOGON,c=D.createElement("canvas"),S=1024;c.width=c.height=S;var x=c.getContext("2d"),left=4;
    function put(){if(tok!==LOGON)return;gl.activeTexture(gl.TEXTURE3);gl.bindTexture(gl.TEXTURE_2D,tx3);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);
      try{gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);var an=gl.getExtension("EXT_texture_filter_anisotropic")||gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");if(an)gl.texParameterf(gl.TEXTURE_2D,an.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(16,gl.getParameter(an.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));}catch(e){}
      gl.activeTexture(gl.TEXTURE0);LOGOOK=1;kick();}
    ["back","ring","star","heart"].forEach(function(L,i){var im=new Image();im.onload=function(){try{x.drawImage(im,(i%2)*512+16,Math.floor(i/2)*512+16,480,480);}catch(e){}if(--left===0)put();};im.onerror=function(){if(--left===0)put();};
      im.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 120 120"><style>'+LCSS[k]+'<\/style>'+LOGO.defs+LOGO[L]+'<\/svg>');});}
  /* its motion, as the base page moves it (.seal-spin sealEngine, .seal-counter sealCounter, .seal-heart sealBeat, .s4-breath s4Breath,
     each keyframe eased as CSS eases it), and Home's flourishes (r290's SFL, as r175; WAAPI eases each over its whole length) */
  function bez(x1,y1,x2,y2){function B(a,b,u){return 3*a*u*(1-u)*(1-u)+3*b*u*u*(1-u)+u*u*u;}return function(x){if(x<=0)return 0;if(x>=1)return 1;var lo=0,hi=1,u=x;for(var i=0;i<24;i++){u=(lo+hi)/2;if(B(x1,x2,u)<x)lo=u;else hi=u;}return B(y1,y2,u);};}
  var EN=bez(.45,.05,.55,.95),EIO=bez(.42,0,.58,1),EO=bez(0,0,.58,1),ESP=bez(.25,.9,.3,1),ERG=bez(.3,.8,.3,1),ETW=bez(.2,.8,.25,1);
  function seg(F,x,e){if(x<=F[0][0])return F[0][1];for(var i=1;i<F.length;i++){if(x<=F[i][0]){var a=F[i-1],b=F[i],u=(x-a[0])/((b[0]-a[0])||1);return a[1]+(b[1]-a[1])*e(u);}}return F[F.length-1][1];}
  function lin(F,x){return seg(F,x,function(u){return u;});}
  var LF={n:"",d:1,t:-99,until:-99,again:false,count:0,last:"",gt:-99,gs:0,r1:-99,r2:-99,rk:0,hov:0,over:false},LORD=["spin","pulse","hop","twirl","beat"];
  function logoPlay(t){LF.count++;var nm=LF.count%7===0?"grand":(function(){var c=LORD.filter(function(n){return n!==LF.last;});return c[Math.floor(Math.random()*c.length)];})();
    LF.last=nm;LF.n=nm;LF.d=Math.random()<.5?-1:1;LF.t=t;LF.gt=t;LF.gs=(nm==="beat"||nm==="grand")?1:0;LF.r1=t;LF.r2=nm==="pulse"?t+.33:-99;LF.rk=nm==="grand"?1:0;LF.until=t+(nm==="grand"?1.95:1.7);}
  function logoPress(t){if(still()){LF.gt=t;LF.gs=0;return;}if(t<LF.until){LF.again=true;LF.gt=t;LF.gs=0;return;}logoPlay(t);}
  function logoVals(t,st,dt){var calm=D.body.getAttribute("data-motion")==="calm",Ts=calm?13:9,Tr=calm?12.8:6.4,Th=calm?5:3.2,sa=0,ra=0,hs=1,br=1,fa=0,fs=1,rs=1,lift=0;
    if(LF.again&&t>=LF.until){LF.again=false;logoPlay(t);}if(LF.n&&t-LF.t>2.4)LF.n="";
    if(!st){sa=seg([[0,0],[.22,90],[.44,180],[.66,270],[.88,360],[1,360]],(t%Ts)/Ts,EN);ra=-360*((t%Tr)/Tr);hs=seg([[0,1],[.14,1.18],[.28,1.04],[.42,1.12],[.56,1],[1,1]],(t%Th)/Th,EIO);
      br=t<.62?1:seg([[0,.7],[.5,1],[1,.7]],((t-.62)%4)/4,EIO);
      var e=t-LF.t,d=LF.d,n=LF.n;
      if(n==="spin"||n==="grand"){sa+=d*360*ESP(e/1.7);ra-=d*360*ERG(e/1.95);hs*=lin([[0,1],[.35,1.14],[1,1]],EIO(e/1.35));}
      if(n==="hop"||n==="grand")lift=Math.max(0,-lin([[0,0],[.12,.03],[.42,-.18],[.7,0],[.85,-.03],[1,0]],EIO(e/1.35)))*0.35;
      if(n==="pulse")rs=lin([[0,1],[.28,1.13],[.6,.97],[.8,1.03],[1,1]],EO(e/1.4));
      if(n==="twirl"){var tw=ETW(e/1.65);fa=d*lin([[0,0],[.45,180],[.8,360],[1,360]],tw);fs=lin([[0,1],[.45,.9],[.8,1.04],[1,1]],tw);sa-=d*180*tw;}
      if(n==="beat"){var bt=EIO(e/1.65);hs*=lin([[0,1],[.14,1.3],[.3,1.04],[.46,1.24],[.7,1],[1,1]],bt);rs=lin([[0,1],[.14,1.04],[.3,1],[.46,1.03],[1,1]],bt);}}
    LF.hov+=((LF.over&&!st?1:0)-LF.hov)*Math.min(1,dt*8);lift+=0.006*LF.hov;
    var g1=[1,0],g2=[1,0],ge=t-LF.gt,gd=st?.7:1.5,gk=EO(ge/gd),go=ge<0||ge>gd?0:lin([[0,0],[.3,LF.gs?.75:.6],[1,0]],gk),gsc=lin([[0,.82],[.3,1.04],[1,1.12]],gk);
    var R=Math.PI/180;return [[sa*R,ra*R,hs,br],[fa*R,fs,rs,lift],[g1[0],g1[1],g2[0],g2[1]],[gsc,go,0,0]];}
  /* the head's sky across the whole card (her words, 14 November 2026: "I also want the landscape of the Build page diamond to fill the card on
     both day and night mode instead of being limited to a square"): the stone's own northern lights, its day glows and its motes, on a
     canvas of their own behind the card's words and the stone, continued across the card; at half the screen's sharpness and half the
     frames (the sky is soft and slow) */
  var BG={cv:null,gl:null,U:{},card:null,n:0,ok:false,w:0,h:0,box:[36,22,520,424]};
  var BGFS=["precision highp float;varying vec2 v;",
  "uniform float uT,uN,uAsp;uniform vec2 uRes;uniform vec4 uBox;",
  "float h1(float n){return fract(sin(n)*43758.5453);}",
  "float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);float n=i.x+i.y*57.0;return mix(mix(h1(n),h1(n+1.0),f.x),mix(h1(n+57.0),h1(n+58.0),f.x),f.y);}",
  /* the stone's own northern lights (aurora() in its shader), faded at the card's edges rather than at the stone's box */
  "vec4 aurora(vec2 v,float hx){vec3 col=vec3(0.0);float acc=0.0;",
  "  for(int L=0;L<3;L++){float fl=float(L);float x=v.x*(1.5+fl*0.45)+fl*3.1;",
  "    float base=0.66+fl*0.05+0.06*sin(x*1.2+uT*0.06+fl)+0.03*sin(x*3.0-uT*0.10+fl*2.0)+0.05*(vn(vec2(x*0.7,uT*0.04+fl*5.0))-0.5);",
  "    float dy=v.y-base;float ry=vn(vec2(x*16.0+uT*(0.20+fl*0.07),fl*7.0+uT*0.05));ry=pow(ry,1.6);",
  "    float wave=0.5+0.5*sin(x*2.2-uT*0.55+fl*1.7);wave=0.45+0.55*wave*wave;",
  "    float edge=smoothstep(-0.018,0.004,dy)*exp(-max(dy,0.0)/(0.09+0.03*fl));float a=edge*(0.30+0.70*ry)*wave*(0.62-fl*0.14);",
  "    vec3 c;if(uN>0.5){c=mix(vec3(0.92,0.52,0.98),vec3(0.46,0.26,0.96),smoothstep(0.0,0.10,dy));c=mix(c,vec3(0.30,0.16,0.72),smoothstep(0.08,0.24,dy));}",
  "    else{c=mix(vec3(1.0,0.56,0.88),vec3(0.64,0.44,1.0),smoothstep(0.0,0.09,dy));c=mix(c,vec3(0.50,0.58,1.0),smoothstep(0.08,0.24,dy));}col+=c*a;acc+=a;}",
  "  float ex=hx*smoothstep(1.06,0.86,v.y)*smoothstep(0.34,0.56,v.y);return vec4(col*ex,clamp(acc*ex,0.0,1.0));}",
  "void main(){vec2 P=vec2(v.x*uRes.x,(1.0-v.y)*uRes.y);vec2 vb=vec2((P.x-uBox.x)/uBox.z,1.0-(P.y-uBox.y)/uBox.w);",
  "  float hx=smoothstep(0.0,0.04,v.x)*smoothstep(1.0,0.96,v.x)*mix(0.78,1.0,smoothstep(0.20,0.55,v.x));",
  "  vec4 au=aurora(vb,hx);float ai=uN>0.5?0.95:1.0;vec3 col=au.rgb*ai;float a=clamp(au.a*ai,0.0,1.0);",
  /* the day's soft glows behind the stone, as its canvas drew them, now free to fall away across the card */
  "  if(uN<0.5){vec2 wc=(vb-vec2(0.50,0.52))*vec2(uAsp,1.0);float wg=exp(-dot(wc,wc)/0.34);vec3 wcol=mix(vec3(1.0,0.70,0.86),vec3(0.70,0.60,1.0),clamp(vb.x*0.8+vb.y*0.3,0.0,1.0));col+=wcol*wg*0.50;a=max(a,wg*0.50);",
  "    vec2 gc=(vb-vec2(0.50,0.60))*vec2(uAsp,1.0);float gg=exp(-dot(gc,gc)/0.045);col+=vec3(0.70,0.50,1.0)*gg*0.34;a=max(a,gg*0.34);",
  "    vec2 fc=(vb-vec2(0.52,0.22))*vec2(uAsp,1.6);float fg=exp(-dot(fc,fc)/0.12);col+=vec3(0.78,0.62,1.0)*fg*0.34;a=max(a,fg*0.34);}",
  /* motes across the card: two to a column, drifting up slowly, each twinkling now and then, a four-pointed glint at its brightest */
  "  float cw=44.0;float ci=floor(P.x/cw);vec3 mc=uN>0.5?vec3(0.886,0.831,1.0):vec3(0.518,0.376,0.863);float mA=0.0,sA=0.0;",
  "  for(int i=-1;i<=1;i++){float c=ci+float(i);for(int k=0;k<2;k++){float sd=c*2.0+float(k)+0.5;if(h1(sd*1.37)>0.62)continue;",
  "    float sp=0.3+0.7*h1(sd*2.11+1.3);float mx=(c+0.15+0.7*h1(sd*3.7+2.1))*cw;float my=fract(h1(sd*5.3+0.7)-uT*0.006*sp)*uRes.y*0.86;",
  "    float tw=pow(0.5+0.5*sin(uT*0.75*sp+h1(sd*7.9)*6.2832),6.0);float rr=0.7+0.9*sp;vec2 d=P-vec2(mx,my);float dd=length(d);",
  "    mA=max(mA,(uN>0.5?0.55:0.6)*(0.25+0.75*tw)*(1.0-smoothstep(rr-0.6,rr+0.6,dd)));",
  "    if(tw>0.7){vec2 ad=abs(d);float st=exp(-ad.x*0.6)*exp(-ad.y*0.16)+exp(-ad.y*0.6)*exp(-ad.x*0.16);sA=max(sA,(tw-0.7)*1.6*st*exp(-dd*0.10));}}}",
  "  col=mix(col,mc*max(mA,a),mA);a=max(a,mA);col+=vec3(1.0,0.97,1.0)*sA*0.7;a=max(a,sA*0.7);",
  "  gl_FragColor=vec4(min(col,vec3(a)),a);}"].join("\n");
  function bgInit(card){if(!card)return;var c=D.createElement("canvas");c.className="bd-bg";c.setAttribute("aria-hidden","true");var g=null;
    try{g=c.getContext("webgl",{premultipliedAlpha:true,alpha:true,antialias:false,powerPreference:"low-power"});}catch(e){g=null;}if(!g)return;
    try{var p=g.createProgram();g.attachShader(p,sh2(g,g.VERTEX_SHADER,VS));g.attachShader(p,sh2(g,g.FRAGMENT_SHADER,BGFS));g.linkProgram(p);if(!g.getProgramParameter(p,g.LINK_STATUS))return;
      g.useProgram(p);var b=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,b);g.bufferData(g.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),g.STATIC_DRAW);var loc=g.getAttribLocation(p,"p");g.enableVertexAttribArray(loc);g.vertexAttribPointer(loc,2,g.FLOAT,false,0,0);
      ["uT","uN","uAsp","uRes","uBox"].forEach(function(n){BG.U[n]=g.getUniformLocation(p,n);});}catch(e){return;}
    card.insertBefore(c,card.firstChild);BG.cv=c;BG.gl=g;BG.card=card;BG.ok=true;bgSize();
    c.addEventListener("webglcontextlost",function(e){e.preventDefault();BG.ok=false;try{c.parentNode.removeChild(c);}catch(x){}kick();});}
  function sh2(g,type,src){var x=g.createShader(type);g.shaderSource(x,src);g.compileShader(x);if(!g.getShaderParameter(x,g.COMPILE_STATUS))throw new Error(g.getShaderInfoLog(x));return x;}
  function bgSize(){if(!BG.ok)return;var cr=BG.card.getBoundingClientRect(),hr=host.getBoundingClientRect();if(cr.width<10||cr.height<10)return;
    BG.w=cr.width;BG.h=cr.height;BG.box=[hr.left-cr.left,hr.top-cr.top,Math.max(10,hr.width),Math.max(10,hr.height)];var k=dpr()*0.5,w=Math.round(BG.w*k),h=Math.round(BG.h*k);
    if(BG.cv.width!==w||BG.cv.height!==h){BG.cv.width=w;BG.cv.height=h;}}
  function bgDraw(t,nt){if(!BG.ok)return;if(BG.n%30===0)bgSize();var g=BG.gl;g.viewport(0,0,BG.cv.width,BG.cv.height);g.uniform1f(BG.U.uT,t);g.uniform1f(BG.U.uN,nt?1:0);g.uniform1f(BG.U.uAsp,W0/H0);
    g.uniform2f(BG.U.uRes,BG.w,BG.h);g.uniform4f(BG.U.uBox,BG.box[0],BG.box[1],BG.box[2],BG.box[3]);g.drawArrays(g.TRIANGLE_STRIP,0,4);}
  /* the diamond pressed as Fabrica's balls are (her words, 14 November 2026: "I want the same sound and effect of the balls from Fabrica's
     tree to be applied to the diamond button"): it sinks while held, springs back when let go, and plays one of Home's engine button's
     flourishes. No circle round it (her words, 14 November 2026: "I want the effect where a circle is shown when I click on the diamond
     to be removed but the clicking effect should be preserved"): no ripple ring and no glow disc */
  var DDN=null,DKB=-1e9,DFL={n:"",d:1,t:-1e9,count:0,last:""},DFX={sc:1,lift:0,yaw:0},DSC=1,YF=0,DORD=["spin","pulse","hop","twirl","beat"];
  function startDFl(t){var n=DFL.count+1,nm=n%7===0?"grand":(function(){var c=DORD.filter(function(x){return x!==DFL.last;});return c[Math.floor(Math.random()*c.length)];})();
    DFL={n:nm,d:Math.random()<0.5?-1:1,t:t,count:n,last:nm};}
  function dfx(t){var f={sc:1,lift:0,yaw:0};if(still())return f;var T2=2*Math.PI;
    if(DDN!=null)f.sc*=1-0.10*Math.min(1,(t-DDN)/0.08);var ke=(t-DKB)/0.6;if(ke>=0&&ke<1)f.sc*=lin([[0,0.9],[.25,1.1],[.5,.96],[.75,1.03],[1,1]],ke);
    var e=t-DFL.t,d=DFL.d,n=DFL.n;if(e<0||e>2.2)return f;
    if(n==="spin"||n==="grand"){f.yaw+=d*T2*ESP(e/1.15);f.sc*=lin([[0,1],[.35,1.14],[1,1]],EIO(e/0.9));}
    if(n==="pulse")f.sc*=lin([[0,1],[.28,1.13],[.6,.97],[.8,1.03],[1,1]],EO(e/0.95));
    if(n==="hop"||n==="grand")f.lift=-lin([[0,0],[.12,.03],[.42,-.18],[.7,0],[.85,-.03],[1,0]],EIO(e/0.9))*1.17;
    if(n==="twirl"){var tw=ETW(e/1.1);f.yaw+=d*T2*lin([[0,0],[.45,.5],[.8,1],[1,1]],tw);f.sc*=lin([[0,1],[.45,.9],[.8,1.04],[1,1]],tw);}
    if(n==="beat")f.sc*=lin([[0,1],[.14,1.3],[.3,1.04],[.46,1.24],[.7,1],[1,1]],EIO(e/1.1));
    return f;}
  function mvS(M,p){var r=mv(M,p);return [r[0]*DSC,r[1]*DSC,r[2]*DSC];}
  function orrery(){var nt=night(),k=nt?"n":"d";if(DIALK===k||!gl)return;var K=W.IngStudios&&IngStudios.kit,src=null,sv=null;if(K&&K.dial){try{var dd=K.dial(nt);src=dd.url;sv=dd.rings;}catch(e){src=null;}}
    if(!src){var dl=D.querySelector("#page-career .skv-dial");if(!dl)return;var im=dl.querySelector("img");sv=dl.querySelector("svg");if(!im||!sv||!im.src)return;src=im.src;}
    var c=D.createElement("canvas"),S=1024;c.width=c.height=S;var x=c.getContext("2d"),done=0;DIALK=k;
    function put(){x.setTransform(1,0,0,1,0,0);gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,tx2);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);try{gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);var an=gl.getExtension("EXT_texture_filter_anisotropic")||gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");if(an)gl.texParameterf(gl.TEXTURE_2D,an.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(16,gl.getParameter(an.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));}catch(e){}gl.activeTexture(gl.TEXTURE0);kick();}
    var a=new Image();a.onload=function(){x.drawImage(a,0,0,S,S);var sr=new XMLSerializer().serializeToString(sv);if(sr.indexOf("xmlns=")<0)sr=sr.replace("<svg","<svg xmlns=\"http://www.w3.org/2000/svg\"");sr=sr.replace("<svg","<svg width=\"1024\" height=\"1024\"");
      var b=new Image();b.onload=function(){try{x.drawImage(b,0,0,S,S);}catch(e){}put();};b.onerror=put;b.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(sr);};a.onerror=function(){DIALK="";};a.src=src;}

  function size(){AAN=dpr()>=1.5?1:3;var d=dpr()*q;var w=Math.round(W0*d),h=Math.round(H0*d);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}var od=dpr();if(ov.width!==Math.round(W0*od)){ov.width=Math.round(W0*od);ov.height=Math.round(H0*od);}}
  /* the light's pulses: each from a new side, alternately from the right and from the left, at a new depth and height */
  var PL={a:0,e:0.2,s:-99,n:0},HV={x:0,lx:0,z:0,lz:0},LIGHT=true,NEXT=3.0;
  /* the holder's parts, each alive and each answering a press (her words, 14 November 2026: "I want every surface of the holder to have the
     animated popped out 3D layered depth look and effect and I want every surface to be animated and clickable"): the Orrery under the
     glass (its orbs run their orbits; pressed, they race, a ripple spreads over the glass, the seal beats and the case lifts its face to
     you), the bezel (its scale turns; pressed, it spins and settles), the band of brilliants (it turns; pressed, a light runs through its
     stones), the rim and the foot (a light runs round them now and then; pressed, the case is knocked and rings). The case leans to the
     pointer on a spring, as the compass does. Each press plays Home's own click. */
  var HO={hk:"",hv:[0,0,0,0],da:0,dav:0,ot:0,boost:0,bz:0,bzv:0,ba:0,bav:0,kn:-99,chase:-99,beat:-99,sweep:-99,tilt:0,tiltv:0,tiltT:-99,inside:false,px:0,py:0,lx:0,lxv:0,lz:0,lzv:0,nS:6,nC:9},HT2=[0.035,0,0];
  function holderTick(t,dt,st){if(!st){HO.boost*=Math.exp(-dt/1.4);HO.ot+=dt*(1+3.2*HO.boost);HO.dav*=Math.exp(-dt/2.6);HO.da+=(0.069813+HO.dav)*dt;HO.bzv*=Math.exp(-dt/2.4);HO.bz+=(0.035+HO.bzv)*dt;HO.bav*=Math.exp(-dt/2.4);HO.ba+=(-0.022+HO.bav)*dt;
      if(t>HO.nS){HO.sweep=t;HO.nS=t+16+Math.random()*8;}if(t>HO.nC){HO.chase=t;HO.nC=t+19+Math.random()*9;}}
    var tgt=(t-HO.tiltT<3.6)?0.09:0;HO.tiltv+=(16*(tgt-HO.tilt)-7.2*HO.tiltv)*dt;HO.tilt+=HO.tiltv*dt;
    var lxT=HO.inside&&!st?HO.py*0.030:0,lzT=HO.inside&&!st?-HO.px*0.040:0;HO.lxv+=(22*(lxT-HO.lx)-8.6*HO.lxv)*dt;HO.lx+=HO.lxv*dt;HO.lzv+=(22*(lzT-HO.lz)-8.6*HO.lzv)*dt;HO.lz+=HO.lzv*dt;
    var kn=t-HO.kn,bounce=(kn>0&&kn<2.8)?0.011*Math.exp(-kn*2.2)*Math.sin(kn*10.5):0,sw=st?0:2*Math.PI*t/10;
    for(var hi=0;hi<4;hi++){var hw=HO.hk===["dial","bezel","band","rim"][hi]?1:0;HO.hv[hi]+=(hw-HO.hv[hi])*Math.min(1,dt*6);}
    HT2=[0.035+HO.tilt+HO.lx+(st?0:0.008*Math.sin(sw)),HO.lz+(st?0:0.006*Math.sin(sw+1.3)),bounce];}
  function holderBusy(t){return (HO.hv[0]+HO.hv[1]+HO.hv[2]+HO.hv[3]>0.01&&HO.hv[0]+HO.hv[1]+HO.hv[2]+HO.hv[3]<0.99)||t<LF.until+0.5||t-LF.gt<1.8||(LF.hov>0.01&&LF.hov<0.99)||Math.abs(HO.dav)>0.05||HO.boost>0.05||Math.abs(HO.bzv)>0.05||Math.abs(HO.bav)>0.05||t-HO.kn<2.8||t-HO.chase<4.8||t-HO.sweep<5.8||Math.abs(HO.tiltv)>0.01||Math.abs(HO.tilt)>0.002;}
  function holdPress(k,t,x,z){if(k==="logo"){logoPress(t);return;}if(k==="dial"){HO.dav+=0.9;HO.beat=t;HO.tiltT=t;}else if(k==="bezel"){HO.bzv+=1.0;HO.sweep=t;}
    else if(k==="band"){HO.bav-=0.9;HO.chase=t;}else if(k==="rim"){HO.kn=t;HO.sweep=t;HO.chase=t+0.15;}}
  /* the diamond through the day (her words, 13 November 2026: "I want the day to start with the clear diamond, then by noon get to the light
     purple diamond and then the afternoon it will be a darker day purple diamond and then at night its the night mode diamond"): from 5:00
     the clear crystal, from 11:00 lavender, from 14:00 purple, from 18:00 the night stone; each change is marked by the light passing
     through it. The night theme always shows the night stone. */
  var AUTO=true,LOOKS=["clear","lavender","purple","night"];
  function byHour(d){var h=(d||new Date()).getHours();return h>=5&&h<11?0:(h>=11&&h<14?1:(h>=14&&h<18?2:3));}
  function pulse(t){PL.n++;var k=PL.n,side=k%2?0:Math.PI;PL.a=side+(((k*0.6180339)%1)-0.5)*1.9;PL.e=0.08+0.22*((k*0.4142136)%1);PL.s=t;}
  /* sparkles: where a crown facet sends the key light to the eye; where the light enters and leaves; a wave of glints across the facets as
     it passes, never the same ones twice running; and a few motes of light drifting in the air. All Ingenium's four-pointed star, soft. */
  var KL=nrm([-0.55,0.66,0.52]),SPK=[];(function(){var i,a;for(i=0;i<8;i++){a=i*45;SPK.push({g:0,k:i,p:[0.78*Math.cos(a*D2R),0.17,0.78*Math.sin(a*D2R)]});}
    for(i=0;i<8;i++){a=22.5+i*45;SPK.push({g:1,k:i,p:[0.60*Math.cos(a*D2R),0.27,0.60*Math.sin(a*D2R)]});}
    for(i=0;i<8;i++){a=11.25+i*45;SPK.push({g:2,k:i,p:[0.93*Math.cos(a*D2R),0.06,0.93*Math.sin(a*D2R)]});a=33.75+i*45;SPK.push({g:3,k:i,p:[0.93*Math.cos(a*D2R),0.06,0.93*Math.sin(a*D2R)]});}})();
  function gN(s){var b=GROUPS[s.g],n=[b[0],b[1],b[2]];for(var k=0;k<s.k;k++){n=[0.70710678*(n[0]-n[2]),n[1],0.70710678*(n[0]+n[2])];}return n;}
  function mv(M,p){return [M[0][0]*p[0]+M[0][1]*p[1]+M[0][2]*p[2],M[1][0]*p[0]+M[1][1]*p[1]+M[1][2]*p[2],M[2][0]*p[0]+M[2][1]*p[1]+M[2][2]*p[2]];}
  function proj(P){var v=sub(P,CP),z=dot(v,CF);var x=dot(v,CR)/z/TAN/(W0/H0),y=dot(v,CU)/z/TAN;return [(x+1)/2*W0,(1-(y+1)/2)*H0];}
  function star(x,y,r,a,nt,c){if(a<=0.01)return;og.save();og.globalAlpha=Math.min(1,a);og.globalCompositeOperation=nt?"lighter":"source-over";
    if(!nt){var hl=og.createRadialGradient(x,y,0,x,y,r*1.1);hl.addColorStop(0,"rgba(106,63,181,.40)");hl.addColorStop(.5,"rgba(122,84,204,.16)");hl.addColorStop(1,"rgba(150,120,230,0)");og.fillStyle=hl;og.beginPath();og.arc(x,y,r*1.1,0,6.2832);og.fill();}
    var tn=c==null||c<0.55?"":(c<0.7?"255,214,240":(c<0.85?"212,234,255":"232,216,255"));
    var gr=og.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.2,tn?"rgba("+tn+",.88)":(nt?"rgba(222,206,255,.8)":"rgba(255,255,255,.85)"));gr.addColorStop(1,nt?"rgba(150,110,240,0)":"rgba(190,170,240,0)");
    og.fillStyle=gr;og.beginPath();var k=r*.12;og.moveTo(x,y-r);og.quadraticCurveTo(x+k,y-k,x+r,y);og.quadraticCurveTo(x+k,y+k,x,y+r);og.quadraticCurveTo(x-k,y+k,x-r,y);og.quadraticCurveTo(x-k,y-k,x,y-r);og.fill();
    var h=og.createRadialGradient(x,y,0,x,y,r*.5);h.addColorStop(0,nt?"rgba(200,170,255,.55)":"rgba(160,130,230,.25)");h.addColorStop(1,"rgba(160,130,230,0)");og.fillStyle=h;og.beginPath();og.arc(x,y,r*.5,0,Math.PI*2);og.fill();og.restore();}
  var MOTES=[];for(var mi=0;mi<22;mi++)MOTES.push([Math.random(),Math.random(),0.3+Math.random()*0.7,Math.random()*6.28]);
  /* specks: tiny glints that now and then catch on a facet (her words: "little specs of sparkles to occasionally reflect off the diamond's
     surfaces to make it look more natural but still sparkly like a gemstone"); a few a second, a little more while the light passes */
  var FAC=[];(function(){var i,a;for(i=0;i<8;i++){a=i*45;FAC.push({g:0,k:i,p:[0.78*Math.cos(a*D2R),0.17,0.78*Math.sin(a*D2R)]});a=22.5+i*45;FAC.push({g:1,k:i,p:[0.60*Math.cos(a*D2R),0.27,0.60*Math.sin(a*D2R)]});
      a=11.25+i*45;FAC.push({g:2,k:i,p:[0.93*Math.cos(a*D2R),0.06,0.93*Math.sin(a*D2R)]});a=33.75+i*45;FAC.push({g:3,k:i,p:[0.93*Math.cos(a*D2R),0.06,0.93*Math.sin(a*D2R)]});
      a=i*45;FAC.push({g:6,k:i,p:[0.55*Math.cos(a*D2R),-0.35,0.55*Math.sin(a*D2R)]});a=11.25+i*45;FAC.push({g:7,k:i,p:[0.84*Math.cos(a*D2R),-0.12,0.84*Math.sin(a*D2R)]});a=33.75+i*45;FAC.push({g:8,k:i,p:[0.84*Math.cos(a*D2R),-0.12,0.84*Math.sin(a*D2R)]});}
    for(i=0;i<6;i++){a=i*60+15;FAC.push({g:-1,k:0,p:[0.32*Math.cos(a*D2R),0.31,0.32*Math.sin(a*D2R)]});}})();
  var SPECK=[],lastSp=-1;
  function specks(t,M,DC,nt,u){var dt=lastSp<0?0:Math.min(0.1,Math.max(0,t-lastSp));lastSp=t;var hb=over?1:0,pb=(t-press<1.6||t-DKB<1.2)?1:0,rate=8.0+(u>=0&&u<1.4?10.0:0)+hb*8.0+pb*20.0;
    for(var sp2=0;sp2<2;sp2++)if(Math.random()<rate*dt*0.5&&SPECK.length<(pb?24:18)){var f=FAC[Math.floor(Math.random()*FAC.length)],j=[(Math.random()-0.5)*0.10,(Math.random()-0.5)*0.04,(Math.random()-0.5)*0.10];
      SPECK.push({p:[f.p[0]+j[0],f.p[1]+j[1],f.p[2]+j[2]],f:f,t0:t,life:0.22+Math.random()*0.33,r:(1.8+Math.random()*3.8)*(hb||pb?1.25:1),c:Math.random()});}
    for(var i=SPECK.length-1;i>=0;i--){var s=SPECK[i],age=(t-s.t0)/s.life;if(age>=1||age<0){SPECK.splice(i,1);continue;}
      var P=mvS(M,s.p);P=[P[0]+DC[0],P[1]+DC[1],P[2]+DC[2]];var V=nrm(sub(CP,P)),N=s.f.g<0?mv(M,[0,1,0]):mv(M,gN(s.f));var hz=nrm([N[0],0.0001,N[2]]);
      if(dot(N,V)<0.05&&dot(hz,[V[0],0,V[2]])<0.25)continue;var xy=proj(P),a=Math.pow(Math.sin(Math.PI*age),2);star(xy[0],xy[1],s.r*(0.7+0.5*a),a,nt,s.c);}}
  function sparkle(t,M,DC,nt){og.setTransform(dpr(),0,0,dpr(),0,0);og.clearRect(0,0,W0,H0);
    for(var i=0;i<SPK.length;i++){var s=SPK[i],N=mv(M,gN(s)),P=mvS(M,s.p);P=[P[0]+DC[0],P[1]+DC[1],P[2]+DC[2]];var V=nrm(sub(CP,P));if(dot(N,V)<=0.05)continue;
      var nl=dot(N,KL),Rl=[2*nl*N[0]-KL[0],2*nl*N[1]-KL[1],2*nl*N[2]-KL[2]],c=dot(Rl,V);var c0=(over||t-press<1.6)?0.93:0.95;if(c<c0)continue;var a=Math.pow((c-c0)/(1-c0),2.2),xy=proj(P);star(xy[0],xy[1],(5+9*a)*(over?1.15:1),Math.min(1,a*0.95),nt);}
    var f=(t-PL.s)/PER;if(f>=0&&f<0.5){var A=PL.a,cA=Math.cos(A),sA=Math.sin(A),b1=A+Math.PI-0.95,b2=A+Math.PI+1.05;
      var hitA=Math.exp(-Math.pow((f-0.03)/0.014,2)),outA=Math.exp(-Math.pow((f-0.06)/0.02,2));
      var en=proj([DC[0]+cA*0.30,DC[1]+0.24,DC[2]+sA*0.30]);star(en[0],en[1],8+16*hitA,hitA,nt);
      [[-cA*0.55,-0.42,-sA*0.55]].forEach(function(e){var p=proj([DC[0]+e[0],DC[1]+e[1],DC[2]+e[2]]);star(p[0],p[1],6+12*outA,outA*0.9,nt);});
      for(var k=0;k<SPK.length;k++){var hk=Math.sin((k+1)*12.9898+PL.n*78.233)*43758.5453;hk-=Math.floor(hk);if(hk<0.45)continue;var gk=Math.exp(-Math.pow((f-0.05-hk*0.07)/0.022,2));if(gk<0.03)continue;
        var sk=SPK[k],Pk=mvS(M,sk.p);Pk=[Pk[0]+DC[0],Pk[1]+DC[1],Pk[2]+DC[2]];if(dot(mv(M,gN(sk)),nrm(sub(CP,Pk)))<=0.0)continue;var xyk=proj(Pk);star(xyk[0],xyk[1],4+9*gk,gk*0.9,nt);}}
    specks(t,M,DC,nt,(t-PL.s)/TT);
    /* motes of light in the air, drifting slowly, each twinkling now and then (on the card's own canvas when it has one) */
    if(!BG.ok)for(var j=0;j<MOTES.length;j++){var m=MOTES[j],x=40+m[0]*440,y=40+((m[1]-t*0.006*m[2])%1+1)%1*300,tw=Math.pow(0.5+0.5*Math.sin(t*0.75*m[2]+m[3]),6);
      og.globalAlpha=(nt?0.55:0.6)*(0.25+0.75*tw);og.fillStyle=nt?"rgba(226,212,255,1)":"rgba(132,96,220,1)";og.beginPath();og.arc(x,y,0.7+0.9*m[2],0,Math.PI*2);og.fill();if(tw>0.7)star(x,y,3+5*tw,(tw-0.7)*1.6,nt);}
    og.globalAlpha=1;}
  function night(){return D.body.getAttribute("data-theme")==="night";}
  function still(){return D.body.getAttribute("data-motion")==="minimal"||(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}
  function frame(ts){raf=0;if(!vis||!shown||!ok)return;var t=(ts-t0)/1000,st=still();if(AUTO){var bv=byHour();if(bv!==VAR){if(VAR>=0&&!st&&LIGHT)pulse(t);VAR=bv;}}if(!st&&LIGHT&&t>=NEXT){pulse(t);NEXT=t+16+Math.random()*12;}var busy=over||DDN!=null||t-DKB<0.8||t-DFL.t<2.3||t-press<3.5||Math.abs(YV)>0.05||t-PL.s<PER*0.35||holderBusy(t),gap=(over||t-press<2.5)&&FAST?16:33;
    if(ts-lastDraw<gap){raf=requestAnimationFrame(frame);return;}var dt=Math.min(0.1,(ts-lastDraw)/1000||0.033);
    if(FIRST<0)FIRST=t;if(lastDraw&&t-FIRST>2.5){var took=ts-lastDraw;if(took<700){EW=EW*0.92+Math.min(4,took/gap)*0.08;if(gap<20){F16=F16*0.9+took*0.1;if(F16>24){FAST=false;FASTT=t;}}else if(!FAST&&t-FASTT>45){FAST=true;F16=16;}
      var QMIN=Math.max(0.45,0.9/dpr());if(!W.__keepQ){if(EW>1.3&&t-QT>1.2&&q>QMIN){QCAP=q*0.95;q=Math.max(QMIN,q*0.85);QT=t;EW=1;size();}else if(EW<1.05&&t-QT>8&&q<QCAP){q=Math.min(QCAP,q*1.08);QT=t;size();}else if(EW<1.05&&t-QT>25&&QCAP<1){QCAP=Math.min(1,QCAP*1.05);QT=t;}}}}
    lastDraw=ts;if(!st){if(!over)yaw+=dt*(Math.PI*2/36);yaw+=dt*YV;}YV*=Math.exp(-dt/1.8);
    gx+=((over?mX*0.22:0)-gx)*Math.min(1,dt*2.8);gz+=((over?-mY*0.16:0)-gz)*Math.min(1,dt*2.8);tx=gz;tz=-gx*0.6;
    var tt=st?1.0:(W.__tFix!=null?W.__tFix:t);if(W.__tFix!=null&&W.__pFix){PL.a=W.__pFix[0];PL.e=W.__pFix[1];PL.s=W.__pFix[2];PL.n=W.__pFix[3]||1;}
    DFX=dfx(t);DSC=DFX.sc;YF=DFX.yaw;var M=rotM(),bob=st?0:Math.sin(tt*2*Math.PI/7)*0.035,DC=[0,1.22+bob+DFX.lift,0],nt=night();
    gl.viewport(0,0,cv.width,cv.height);gl.uniform1f(U.uT,tt);gl.uniform1f(U.uN,nt?1:0);gl.uniform1f(U.uV,Math.max(0,VAR));gl.uniform1f(U.uY,yaw);gl.uniform3fv(U.uDC,new Float32Array(DC));
    gl.uniform4fv(U.uL,new Float32Array([PL.a,PL.e,st?-99:PL.s,PL.n%2?0:1]));
    /* the case moves as the compass does: a sway of its own, ten seconds round, and a lean toward the pointer on a spring that overshoots a
       hair and settles */
    var sw=st?0:2*Math.PI*tt/10,hx0=st?0:0.030*Math.sin(sw),hz0=st?0:0.018*Math.sin(sw+1.3),lx=over?mY*0.05:0,lz=over?-mX*0.06:0;
    HV.x+=(22*(lx-HV.lx)-8.6*HV.x)*dt;HV.lx+=HV.x*dt;HV.z+=(22*(lz-HV.lz)-8.6*HV.z)*dt;HV.lz+=HV.z*dt;
    holderTick(tt,dt,st);gl.uniform2f(U.uHT,HT2[0],HT2[1]);gl.uniform4f(U.uHA,HO.ot,HO.bz,HO.ba,HT2[2]);gl.uniform4f(U.uHB,0,0,0,HO.chase);gl.uniform4f(U.uHC,HO.beat,HO.sweep,Math.min(1,HO.boost),HO.da);if(DIAL)orrery();gl.uniform1f(U.uDial,DIAL&&DIALK?1:0);logoTex();var LV=logoVals(t,st,dt);gl.uniform1f(U.uLogo,LOGOOK?1:0);gl.uniform1f(U.uAA,AAN);gl.uniform1f(U.uSc,DSC);gl.uniform1f(U.uBG,BG.ok?1:0);gl.uniform4f(U.uHV,HO.hv[0],HO.hv[1],HO.hv[2],HO.hv[3]);gl.uniform4f(U.uLG,LV[0][0],LV[0][1],LV[0][2],LV[0][3]);gl.uniform4f(U.uLH,LV[1][0],LV[1][1],LV[1][2],LV[1][3]);gl.uniform4f(U.uLR,LV[2][0],LV[2][1],LV[2][2],LV[2][3]);gl.uniform4f(U.uLQ,LV[3][0],LV[3][1],LV[3][2],LV[3][3]);gl.uniform2f(U.uPx,2.0*TAN*(W0/H0)/cv.width,2.0*TAN/cv.height);
    gl.uniformMatrix3fv(U.uR,false,new Float32Array([M[0][0],M[0][1],M[0][2],M[1][0],M[1][1],M[1][2],M[2][0],M[2][1],M[2][2]]));
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);sparkle(tt,M,DC,nt);if(BG.ok){if(st||BG.n%2===0)bgDraw(tt,nt);BG.n++;}if(!st||busy)raf=requestAnimationFrame(frame);}
  function kick(){if(!raf)raf=requestAnimationFrame(frame);}
  function mount(el){host=el;cv=D.createElement("canvas");cv.className="bd-cv";ov=D.createElement("canvas");ov.className="bd-cv ov";host.appendChild(cv);host.appendChild(ov);og=ov.getContext("2d");
    if(W.matchMedia&&matchMedia("(pointer: coarse)").matches)q=0.75;size();ok=init();if(!ok){host.setAttribute("data-nogl","1");return;}try{bgInit(host.closest?host.closest(".skh"):null);}catch(e){BG.ok=false;}
    function at(e){var r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*W0,y:(e.clientY-r.top)/r.height*H0};}
    var C=proj([0,1.22,0]);
    function hitPart(p){var sx=((p.x/W0)*2-1)*(W0/H0)*TAN,sy=((1-p.y/H0)*2-1)*TAN,d=nrm([CR[0]*sx+CU[0]*sy+CF[0],CR[1]*sx+CU[1]*sy+CF[1],CR[2]*sx+CU[2]*sy+CF[2]]);
      function rx(v,a){var c=Math.cos(a),s=Math.sin(a);return [v[0],c*v[1]-s*v[2],s*v[1]+c*v[2]];}function rz(v,a){var c=Math.cos(a),s=Math.sin(a);return [c*v[0]-s*v[1],s*v[0]+c*v[1],v[2]];}
      function hL(v){return rx(rz(v,-HT2[1]),-HT2[0]);}var o=hL([CP[0],CP[1]+0.12,CP[2]]);o=[o[0],o[1]-0.12-HT2[2],o[2]];var rd=hL(d);
      if(rd[1]<0){var t=-o[1]/rd[1],x=o[0]+rd[0]*t,z=o[2]+rd[2]*t,r=Math.sqrt(x*x+z*z);if(r<0.385*0.95)return {k:"logo",x:x,z:z};if(r<1.225)return {k:"dial",x:x,z:z};if(r<1.50)return {k:"bezel"};}
      var A=rd[0]*rd[0]+rd[2]*rd[2],B=o[0]*rd[0]+o[2]*rd[2],C2=o[0]*o[0]+o[2]*o[2]-1.53*1.53,h=B*B-A*C2;if(h<0)return null;var t2=(-B-Math.sqrt(h))/A,y=o[1]+rd[1]*t2;
      if(t2<0||y>0.01||y<-0.40)return null;return {k:y>-0.095?"bezel":(y>-0.17?"band":"rim")};}
    host.addEventListener("pointermove",function(e){var p=at(e),dx=(p.x-C[0])/150,dy=(p.y-C[1])/120,on=dx*dx+dy*dy<1;over=on;mX=dx;mY=dy;
      HO.inside=true;HO.px=(p.x/W0-0.5)*2;HO.py=(p.y/H0-0.5)*2;var hp=on?null:hitPart(p);LF.over=!!(hp&&hp.k==="logo");HO.hk=hp?hp.k:"";cv.style.cursor=(on||hp)?"pointer":"default";kick();});
    host.addEventListener("pointerleave",function(){if(DDN!=null){DDN=null;DKB=(performance.now()-t0)/1000;}over=false;HO.inside=false;LF.over=false;HO.hk="";kick();});
    /* a press sends the light through at once (Home's own click and nothing else) */
    host.addEventListener("pointerdown",function(e){var t=(performance.now()-t0)/1000;if(!over){var hp=hitPart(at(e));if(!hp)return;holdPress(hp.k,t,hp.x,hp.z);host.setAttribute("data-part",hp.k);try{if(W.IngSound)IngSound.play("paper");}catch(x){}kick();return;}press=t;if(!still()){DDN=t;if(LIGHT&&t-PL.s>PER*0.3){pulse(t);NEXT=Math.max(NEXT,t+16+Math.random()*12);}}try{if(W.IngSound&&IngSound.play)IngSound.play("paper");}catch(x){}kick();});
    host.addEventListener("pointerup",function(){if(DDN!=null){var tu=(performance.now()-t0)/1000;DDN=null;DKB=tu;startDFl(tu);kick();}});
    try{new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)kick();}).observe(host);}catch(e){}
    D.addEventListener("visibilitychange",function(){shown=!D.hidden;if(shown)kick();});kick();}
  return {mount:mount,kick:kick,theme:kick,fire:function(){},q:function(){return q;},variant:function(v){if(v==="auto"){AUTO=true;VAR=byHour();}else{AUTO=false;var i=LOOKS.indexOf(v);VAR=i<0?0:i;}var t=(performance.now()-t0)/1000;if(!still()&&LIGHT)pulse(t);kick();},light:function(on){LIGHT=!!on;if(LIGHT)NEXT=(performance.now()-t0)/1000+1.2;else PL.s=-99;kick();},look:function(){return LOOKS[VAR<0?byHour():VAR];},auto:function(){return AUTO;},dial:function(v){if(v==null)return DIAL?"orrery":"engine";DIAL=v==="orrery"?1:0;kick();},press:function(k,x,z){holdPress(k,(performance.now()-t0)/1000,x,z);kick();},holder:function(){return {ot:HO.ot,bz:HO.bz,ba:HO.ba,tilt:HT2[0],lean:HT2[1]};}};})();

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
    hint:"Point at the diamond and it turns to you. Press it, or any part of its holder, and it answers."});
  HD.hint.innerHTML="Point at the diamond and it turns to you. <b>Press it</b>, or any part of its holder (the engine logo, the Orrery, the bezel, the band of brilliants, the rim), and it answers.";
  HD.obj.setAttribute("role","img");HD.obj.setAttribute("aria-label","A diamond turning slowly over its silver holder, Ingenium's Orrery open in the holder's seat with the engine logo at its heart; the light shoots through the diamond now and then");
  tag=K.label(HD.obj,352,44,1,0,"","","bd-label");
  if(card)page.insertBefore(HD.el,card);else page.appendChild(HD.el);
  var ed=$("codeEditor"),au=$("autoRun");if(ed)ed.addEventListener("input",label);if(au)au.addEventListener("change",label);return true;}
function on(){page=$("page-build");if(!page||!KIT())return;page.classList.add("sk-on");if(!build())return;
  if(!MOUNTED){MOUNTED=true;Diamond.mount(HD.obj);}label();try{if(W.IngHeadsFit)W.IngHeadsFit();}catch(e){}Diamond.kick();}
var og=W.go;if(typeof og==="function")W.go=function(p){var r=og.apply(this,arguments);try{if(p==="build")setTimeout(on,0);}catch(e){}return r;};
function first(){try{var p=$("page-build");if(p&&p.classList.contains("active"))on();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(first,0);});else setTimeout(first,0);
try{new MutationObserver(function(){if(MOUNTED)Diamond.kick();}).observe(D.body,{attributes:true,attributeFilter:["data-theme","data-motion"]});}catch(e){}
W.IngDiamond={on:on,variant:function(v){Diamond.variant(v);},light:function(on){Diamond.light(on);},look:function(){return Diamond.look();},auto:function(){return Diamond.auto();},dial:function(v){return Diamond.dial(v);},state:function(){return {head:!!(HD&&HD.el.isConnected),mounted:MOUNTED,q:Diamond.q(),look:Diamond.look(),auto:Diamond.auto(),err:W.__diamondErr||"",label:tag?[tag.querySelector("b").textContent,tag.querySelector("small").textContent]:null};},kick:function(){Diamond.kick();}};
try{window.__ingParts["p292"]="running";}catch(_){}
})();
</script>