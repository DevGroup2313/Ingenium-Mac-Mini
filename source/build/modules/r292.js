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
  var W0=520,H0=424,host,cv,gl,pr,ov,og,tx2=null,DIAL=0,DIALK="",raf=0,vis=true,shown=true,ok=false,U={},q=1,lastDraw=0,slowN=0,t0=performance.now(),
      yaw=0,tx=0,tz=0,gx=0,gz=0,over=false,press=-99,mX=0,mY=0,VAR=-1;
  var CP=[0,1.62,6.9],TG=[0,0.80,0],FOV=30*Math.PI/180,PER=3.4,TT=0.46;
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
  "uniform float uT,uN,uV,uAsp,uTan,uY,uDial;uniform vec2 uPx;uniform sampler2D uTx2;uniform vec3 uCP,uDC;uniform mat3 uCM,uR;uniform vec4 uG[9];uniform float uTab;uniform vec4 uL;uniform vec2 uHT;uniform sampler2D uTx;",
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
  "vec3 stone(vec3 roW,vec3 rdW,out float hit,out float th){hit=0.0;th=1e9;vec3 ro=uR*(roW-uDC),rd=uR*rdW;",
  "  float b=dot(ro,rd),c=dot(ro,ro)-1.04,h=b*b-c;if(h<0.0)return vec3(0.0);",
  "  float tn,tf;vec3 nn,nf;cvx(ro,rd,tn,tf,nn,nf);if(!(tn<tf&&tn>0.0))return vec3(0.0);hit=1.0;th=tn;",
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
  "vec3 nCase(vec3 p){vec2 e=vec2(0.0015,0.0);return normalize(vec3(sdCase(p+e.xyy)-sdCase(p-e.xyy),sdCase(p+e.yxy)-sdCase(p-e.yxy),sdCase(p+e.yyx)-sdCase(p-e.yyx)));}",
  "float holder(vec3 ro,vec3 rd,out vec3 n,out vec3 p,out float part){float t=1e9;part=-1.0;n=vec3(0.0,1.0,0.0);p=vec3(0.0);vec3 q;float tt;",
  /* the bounding drum: where the ray enters it, the walk begins */
  "  float A=dot(rd.xz,rd.xz),B=dot(ro.xz,rd.xz),C=dot(ro.xz,ro.xz)-1.62*1.62,h=B*B-A*C;float t0=1e9,t1=-1e9;",
  "  if(h>0.0){float sq=sqrt(h);t0=(-B-sq)/A;t1=(-B+sq)/A;}else if(C<0.0){t0=-1e9;t1=1e9;}",
  "  if(abs(rd.y)>1e-6){float ya=(0.012-ro.y)/rd.y,yb=(-0.405-ro.y)/rd.y;t0=max(t0,min(ya,yb));t1=min(t1,max(ya,yb));}",
  "  if(t1>max(t0,0.0)){float tm2=max(t0,0.0);for(int i=0;i<56;i++){vec3 pp=ro+rd*tm2;float d=sdCase(pp);if(d<0.0008){t=tm2;p=pp;part=1.0;break;}tm2+=d*0.95;if(tm2>t1)break;}}",
  "  {vec3 oc=ro-vec3(0.0,-15.35,0.0);float b=dot(oc,rd),c=dot(oc,oc)-15.40*15.40,hh=b*b-c;if(hh>0.0){tt=-b-sqrt(hh);q=ro+rd*tt;if(tt>0.0&&tt<t&&q.y>=0.0&&dot(q.xz,q.xz)<1.24*1.24){t=tt;p=q;part=6.0;}}}",
  "  if(part>5.5)n=normalize(p-vec3(0.0,-15.35,0.0));else if(part>0.5)n=nCase(p);",
  "  return t;}",
  /* the compass's light (Vocatio's studio: its window, its dark horizon line, its fill), as the other session drew it for the holder */
  "float vWin(vec3 v){if(dot(v,vec3(-0.50141,-0.62174,0.60169))<0.6)return 0.0;float a=abs(dot(v,vec3(-0.76822,0.0,-0.64018))),b=abs(dot(v,vec3(0.39803,-0.78322,-0.47764)));",
  "  return (1.0-smoothstep(0.17,0.215,a))*(1.0-smoothstep(0.25,0.30,b));}",
  "vec3 vEnv(vec3 v){float up=-v.y;vec3 c;if(uN>0.5){float a=0.22+0.2*smoothstep(-0.2,0.85,up);c=vec3(a*0.92,a*0.9,a*1.22)-smoothstep(0.0,0.7,-up)*vec3(0.15,0.14,0.18);}",
  "  else{float a=0.92+0.10*smoothstep(-0.2,0.9,up);c=vec3(a*0.985,a*0.98,a)-smoothstep(-0.05,0.65,-up)*vec3(0.34,0.34,0.30);}",
  "  float hz=(1.0-smoothstep(uN>0.5?0.1:0.05,uN>0.5?0.28:0.19,abs(v.y)))*(1.0-smoothstep(0.5,0.78,v.z))*0.85;vec3 hdc=uN>0.5?vec3(0.07,0.07,0.078):vec3(0.30,0.19,0.50);c+=(hdc-c)*hz;",
  "  float cam=smoothstep(0.88,0.975,v.z)*(uN>0.5?0.8:0.55);float cd=uN>0.5?0.1:0.70;c+=(vec3(cd,cd,cd*1.06)-c)*cam;",
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
  "  else{c=mix(vec3(0.30,0.30,0.36),vec3(0.58,0.58,0.64),smoothstep(-0.6,-0.05,up));c=mix(c,vec3(1.34,1.34,1.38),smoothstep(-0.05,0.10,up));c=mix(c,vec3(0.33,0.22,0.52),dk*0.85);c+=vec3(1.0)*fl*0.8;c+=vec3(0.9,0.9,0.95)*vWin(toV(w))*0.9;}",
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
  "vec3 dialCol(vec3 p,vec3 rd,float glow){float r=length(p.xz),an=atan(p.z,p.x);vec3 up=vec3(0.0,1.0,0.0);float aa=0.002+0.0012*length(p-uCP);vec2 q=p.xz;",
  "  vec3 KL=normalize(vec3(-0.45,0.8,0.4));vec2 L=vec2(0.016,0.026);float T=uT;",
  /* the plate: violet, finely grained in overlapping circles */
  "  vec3 PE=uN>0.5?vec3(0.13,0.085,0.27):mix(vec3(0.76,0.74,0.83),lookTint(),0.14);",
  "  float stp=0.5+0.5*sin(dot(q,vec2(0.6,0.8))*34.0);vec3 col=PE*(0.84+0.24*KL.y)*(uN>0.5?1.0:0.95+0.06*stp)+hEnv(hW(reflect(rd,up)))*0.05;",
  /* the wheels, meshing, and their soft shadows on the plate */
  "  float w0=T*0.07;vec4 W[4];W[0]=vec4(0.0,0.0,0.40,48.0);W[1]=vec4(0.60,0.34,0.21,24.0);W[2]=vec4(-0.56,0.40,0.17,20.0);W[3]=vec4(-0.30,-0.62,0.25,30.0);",
  "  float RO[4];RO[0]=w0;RO[1]=-w0*0.40/0.21;RO[2]=-w0*0.40/0.17;RO[3]=-w0*0.40/0.25;",
  "  float hitW=-1.0,e=1.0,ee,shW=0.0;vec2 ed=vec2(1.0,0.0),edd;",
  "  for(int k=0;k<4;k++){float mk=wheelM(q,W[k].xy,W[k].z,W[k].w,RO[k],5.0,ee,edd);if(mk>0.5&&hitW<0.0){hitW=float(k);e=ee;ed=edd;}",
  "    for(int j=0;j<3;j++){shW=max(shW,wheelM(q-L*(0.6+0.55*float(j)),W[k].xy,W[k].z,W[k].w,RO[k],5.0,ee,edd)*(1.0-0.28*float(j)));}}",
  /* the balance, swinging like a heartbeat, and its hairspring breathing */
  "  vec2 bc=vec2(0.56,-0.52);float bA=1.15*sin(T*3.14159*0.9);vec2 bd=q-bc;float br=length(bd);float bth=atan(bd.y,bd.x)-bA;float bal=0.0,be=1.0;vec2 bdir=bd/max(br,1e-5);vec2 bed=bdir;",
  "  if(br<0.26&&br>0.225){bal=1.0;float eo=0.26-br,ei=br-0.225;be=min(eo,ei);bed=eo<ei?bdir:-bdir;}else if(br<0.225&&br>0.05){float sa=fract(bth*3.0/6.2831853+0.5)-0.5;float sdd=abs(sa)*6.2831853/3.0*br;if(sdd<0.014){bal=1.0;be=0.014-sdd;bed=vec2(-bdir.y,bdir.x)*sign(sa);}}",
  "  float hs=0.0;if(br<0.17&&br>0.06&&bal<0.5){float sp=fract((br-0.06)/0.016-(atan(bd.y,bd.x)-bA*0.35)/6.2831853);hs=1.0-smoothstep(0.0,0.18,abs(sp-0.5)*2.0-0.82);}",
  "  {float b2=length(q-L-bc);shW=max(shW,(b2<0.26&&b2>0.22)?0.8:0.0);}",
  /* the bridges above, and their shadows */
  "  vec2 bdv;float dB=bridges(q,bdv);float shB=0.0;for(int j=0;j<3;j++){vec2 tmp;shB=max(shB,(1.0-smoothstep(-0.004,0.008,bridges(q-L*(0.9+0.7*float(j)),tmp)))*(1.0-0.28*float(j)));}",
  "  float shk=uN>0.5?0.50:0.58;col*=1.0-shk*shW;col*=1.0-shk*shB;",
  "  if(hitW>=0.0||bal>0.5){float eg=hitW>=0.0?e:be;vec2 dir2=hitW>=0.0?ed:bed;float bev=1.0-smoothstep(0.0,0.011,eg);vec3 nW=normalize(up+vec3(dir2.x,0.0,dir2.y)*bev*0.95);",
  "    vec2 cc=hitW>=0.0?(hitW<0.5?W[0].xy:(hitW<1.5?W[1].xy:(hitW<2.5?W[2].xy:W[3].xy))):bc;col=metal(rd,nW,0.93*(1.0-0.45*shB));}",
  "  if(hs>0.5)col=mix(col,metal(rd,up,0.95*(1.0-0.45*shB)),0.9);",
  "  if(dB<0.0){float bev=1.0-smoothstep(0.0,0.014,-dB);vec3 nB=normalize(up+vec3(bdv.x,0.0,bdv.y)*bev*1.1);float cs=fract(dot(q,vec2(0.6,0.8))/0.11);float cg=pow(sin(cs*3.14159),2.0)*0.6;",
  "    col=metal(rd,nB,0.86+0.18*cg*(1.0-bev));}",
  "  else if(dB<0.006){col*=0.55+0.45*smoothstep(0.0,0.006,dB);}",
  /* the jewels in silver settings, the violet screws with their slots */
  "  vec2 J[5];J[0]=vec2(0.0);J[1]=vec2(-0.56,0.40);J[2]=vec2(-0.30,-0.62);J[3]=vec2(0.60,0.34);J[4]=bc;",
  "  for(int k=1;k<5;k++){vec2 dj=q-J[k];float rj=length(dj);float jr=0.022;if(rj<jr+0.014&&rj>=jr){vec2 dn=dj/max(rj,1e-5);float h=(rj-jr)/0.014;col=metal(rd,normalize(up+vec3(dn.x,0.0,dn.y)*mix(-0.7,0.7,h)),1.0);}",
  "    else if(rj<jr){vec3 nj=normalize(vec3(dj.x,sqrt(jr*jr-rj*rj)*0.6,dj.y));vec3 jc=uN>0.5?vec3(0.78,0.36,1.0):mix(vec3(0.88,0.40,1.0),lookTint()*1.6,0.5);",
  "      col=vTone(jc*(0.55+0.5*max(dot(nj,KL),0.0))+hEnv(hW(reflect(rd,nj)))*0.25+vec3(1.0,0.95,1.0)*pow(max(dot(reflect(rd,nj),normalize(vec3(-0.45,0.6,-0.6))),0.0),40.0)*(0.6+2.5*glow));}}",
  "  vec2 SC[5];SC[0]=vec2(-0.86,0.30);SC[1]=vec2(-0.20,0.62);SC[2]=vec2(0.98,-0.18);SC[3]=vec2(-0.85,-0.45);SC[4]=vec2(0.98,0.52);",
  "  for(int k=0;k<5;k++){vec2 dj=q-SC[k];float rj=length(dj);if(rj<0.024){vec3 ns=normalize(vec3(dj.x,sqrt(0.024*0.024-rj*rj)*0.9,dj.y));float sa=float(k)*0.9;vec2 sd=vec2(cos(sa),sin(sa));float slot=1.0-smoothstep(0.003,0.006,abs(dot(dj,vec2(-sd.y,sd.x))));",
  "    vec3 sc2=uN>0.5?vec3(0.40,0.24,0.80):vec3(0.46,0.28,0.90);col=vTone(sc2*(0.5+0.6*max(dot(ns,KL),0.0))+hEnv(hW(reflect(rd,ns)))*0.35)*(1.0-0.7*slot);}}",
  /* the engine seal at the heart, as Home's engine button: its silver rim in layers, its violet ring turning one way, its four-pointed star
     turning the other, its violet heart beating on Home's seven seconds; it stands off the movement and casts its shadow on it */
  "  {float rq=length(q);vec2 dn=q/max(rq,1e-4);float an2=atan(q.y,q.x);",
  "    {float rs=length(q-L*1.2);if(rs<0.19&&rq>0.172)col*=1.0-0.42*(1.0-smoothstep(0.15,0.19,rs));}",
  "    if(rq<0.172){",
  "      if(rq>0.152){float h=(rq-0.152)/0.020;float ph=mix(-1.0,1.0,h);col=metal(rd,normalize(up*cos(ph)+vec3(dn.x,0.0,dn.y)*sin(ph)),1.0);}",
  "      else if(rq>0.147){col=metal(rd,normalize(up-vec3(dn.x,0.0,dn.y)*0.5),0.62);}",
  "      else if(rq>0.121){float ra=an2+T*0.25;float tq2=fract(ra*24.0/6.2831853);float tk2=1.0-smoothstep(0.0,0.10,abs(tq2-0.5)-0.38);",
  "        float h=(rq-0.121)/0.026;vec3 ne=normalize(up+vec3(dn.x,0.0,dn.y)*0.25*(h-0.5));col=mix(enamel(rd,ne,1.0),metal(rd,ne,1.0),tk2*smoothstep(0.125,0.130,rq)*(1.0-smoothstep(0.140,0.145,rq)));}",
  "      else if(rq>0.116){col=metal(rd,normalize(up+vec3(dn.x,0.0,dn.y)*0.5),0.7);}",
  "      else{vec3 PL2=uN>0.5?vec3(0.19,0.14,0.34):vec3(0.96,0.95,0.99);float ray=0.5+0.5*cos(an2*90.0);col=PL2*(0.86+0.10*ray)+hEnv(hW(reflect(rd,up)))*0.04;",
  "        float sa2=an2-T*0.40;vec2 qs=vec2(cos(sa2),sin(sa2))*rq;float as=astar(qs,0.104);",
  "        if(as<1.0){vec2 ax=abs(qs);vec2 fn=ax.x>ax.y?vec2(0.0,sign(qs.y)):vec2(sign(qs.x),0.0);float rr2=an2-sa2;vec2 fw=vec2(cos(rr2)*fn.x-sin(rr2)*fn.y,sin(rr2)*fn.x+cos(rr2)*fn.y);",
  "          col=metal(rd,normalize(up+vec3(fw.x,0.0,fw.y)*0.55),1.0);col*=1.0-0.35*(1.0-smoothstep(0.86,1.0,as))*0.0;}",
  "        else if(as<1.12){col*=0.72;}",
  "        float tb=mod(T,7.0);float beat=exp(-pow(tb/0.09,2.0))+0.7*exp(-pow((tb-0.30)/0.09,2.0));float hr=0.020*(1.0+0.22*beat);",
  "        if(rq<hr){vec3 nh=normalize(vec3(q.x,sqrt(hr*hr-rq*rq)*0.8,q.y));vec3 hc=uN>0.5?vec3(0.62,0.36,1.0):vec3(0.48,0.26,0.86);",
  "          col=vTone(hc*(0.6+0.5*max(dot(nh,KL),0.0))*(1.0+0.6*beat)+hEnv(hW(reflect(rd,nh)))*0.25);}}}}",
  /* the scale at the edge, a raised silver flange with its cuts */
  "  float tq=an/6.2831853*120.0;float ti=floor(tq+0.5);float dq=abs(tq-ti)*6.2831853/120.0*r;float lg=mod(ti,10.0)<0.5?1.0:0.0;",
  "  if(r>1.11){float h=clamp((r-1.11)/0.10,0.0,1.0);vec2 dn=q/max(r,1e-4);col=metal(rd,normalize(up-vec3(dn.x,0.0,dn.y)*0.25),1.0);float tk=(1.0-smoothstep(0.0012,0.0012+aa,dq))*smoothstep(mix(1.17,1.15,lg)-aa,mix(1.17,1.15,lg)+aa,r);col*=1.0-0.40*tk;}",
  "  else{col*=1.0-0.35*(1.0-smoothstep(0.0,0.03,1.11-r));}",
  "  vec2 sc=p.xz-vec2(0.08,0.16);float s=exp(-dot(sc,sc)/0.30);col*=1.0-mix(0.18,0.28,uN)*s;",
  "  vec2 k0=vec2(0.30,0.42);vec2 dd=p.xz-k0;float a1=dot(dd,normalize(vec2(1.0,0.35))),w1=dot(dd,normalize(vec2(-0.35,1.0)));float g=exp(-w1*w1/0.018)*exp(-a1*a1/0.05);col+=hue(clamp(0.5+w1*2.6,0.0,1.0))*g*mix(0.22,0.45,uN)*(0.35+1.6*glow);",
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
  "  if(part>5.5){float cs=max(dot(-rd,nn),0.0);float F=0.04+0.96*pow(1.0-cs,5.0);vec3 R=reflect(rd,nn);vec3 rf=uN<0.5?vEnv(cmpR(nn))*0.95:hEnv(hW(R));",
  /* the crystal: the room and the diamond mirrored in its glass, the dial seen through it */
  "    float hh,th2;vec3 pw=hW(p+nn*0.002+HS-HPV)+HPV;vec3 sr=stone(pw,hW(R),hh,th2);if(hh>0.5)rf=mix(rf,sr,0.92);vec3 rd2=refract(rd,nn,1.0/1.5);float td=(-0.012-p.y)/min(rd2.y,-0.02);vec3 pd=p+rd2*td;",
  "    vec3 dc;if(uDial>0.5){float rr=length(pd.xz);vec2 uv=vec2(0.5)+pd.xz/2.36*vec2(1.0,-1.0);vec3 ox=texture2D(uTx2,uv).rgb;float rimw=smoothstep(1.11,1.13,rr);",
  "      vec3 rim=metal(rd2,normalize(vec3(0.0,1.0,0.0)-vec3(pd.x,0.0,pd.z)/max(rr,1e-4)*0.25),1.0);dc=mix(ox*(uN>0.5?1.0:1.02),rim,rimw);vec2 sc=pd.xz-vec2(0.08,0.16);dc*=1.0-mix(0.16,0.26,uN)*exp(-dot(sc,sc)/0.30);}",
  "    else dc=dialCol(pd,rd2,glow);col=rf*F*(uN>0.5?1.15:0.75)+dc*(1.0-F)*0.97;}",
  "  else if(part>0.5){float ao=mix(0.55,0.72,uN)+mix(0.45,0.28,uN)*caseAO(p,nn);float y=p.y;float aaf=0.0016+0.001*length(p-uCP);",
  "    float band=smoothstep(-0.165,-0.155,y)*(1.0-smoothstep(-0.105,-0.095,y))*step(1.455,r);",
  "    if(band>0.0){",
  "      float tq=an/6.2831853*72.0;float ti=floor(tq+0.5);float dq=abs(tq-ti)*6.2831853/72.0*r;float lg=mod(ti,6.0)<0.5?1.0:0.0;",
  "      float tk=(1.0-smoothstep(0.0022,0.0022+aaf,dq))*smoothstep(-0.150,-0.148,y)*(1.0-smoothstep(mix(-0.128,-0.112,lg),mix(-0.126,-0.110,lg),y));",
  "      vec3 base=mix(lookTint(),vec3(0.30,0.22,0.46),0.45)*0.80;float dl=max(dot(toV(hW(nn)),vec3(-0.50141,-0.62174,0.60169)),0.0);vec3 R=cmpR(nn);",
  "      vec3 em=uN>0.5?enamel(rd,nn,1.0):vTone(base*(0.70+0.45*dl)+vEnv(R)*(0.03+0.45*pow(1.0-clamp(toV(hW(nn)).z,0.0,1.0),5.0))+vWin(R)*vec3(0.30,0.30,0.34));",
  "      col=mix(em,silverC(rd,normalize(nn-o*0.3),1.0),tk);",
  "      float pc=0.52359878;float pk=floor(an/pc+0.5);vec2 dv=vec2((an-pk*pc)*r,y+0.130);float pd=length(dv),pr=0.021;",
  "      if(pd<pr+0.007){if(pd>=pr){float h=(pd-pr)/0.007;vec2 dn2=dv/max(pd,1e-5);col=silverC(rd,normalize(o+(tg*dn2.x+up*dn2.y)*mix(-0.8,0.8,h)),1.0);}",
  "        else{vec3 gc=gemlet(rd,o,tg,up,dv,pr,pk);col=gc.x<0.0?silverC(rd,o,1.0):vTone(gc*(0.9+0.5*glow));}}",
  "      col*=ao;}",
  "    else{float sh=1.0;vec3 nq=nn;",
  "      if(y>-0.012&&r>1.245&&r<1.435){float g=sin(r*210.0);nq=normalize(nn+vec3(o.x,0.0,o.z)*0.05*g);sh=0.96+0.04*g;}",
  "      col=silverC(rd,nq,sh)*ao;}}",
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
  "    vec3 c=mix(vec3(0.92,0.52,0.98),vec3(0.46,0.26,0.96),smoothstep(0.0,0.10,dy));c=mix(c,vec3(0.30,0.16,0.72),smoothstep(0.08,0.24,dy));col+=c*a;acc+=a;}",
  "  float ex=smoothstep(0.0,0.14,v.x)*smoothstep(1.0,0.86,v.x)*smoothstep(1.0,0.84,v.y)*smoothstep(0.34,0.56,v.y);return vec4(col*ex,clamp(acc*ex,0.0,1.0));}",
  "vec3 tm(vec3 c){return uN>0.5?1.0-exp(-c*1.06):1.0-exp(-c*1.30);}",
  "void main(){vec2 sp=(v*2.0-1.0)*vec2(uAsp,1.0)*uTan;vec3 rd=normalize(uCM*vec3(sp,-1.0)),ro=uCP;",
  "  float hs,ts;vec3 sc=stone(ro,rd,hs,ts);if(hs>0.5){vec3 acc=sc;float hh2,tt2;for(int k=0;k<3;k++){vec2 o2=k==0?vec2(-0.25,-0.25):(k==1?vec2(0.25,-0.25):vec2(-0.25,0.25));vec3 rd2=normalize(uCM*vec3(sp+(o2+vec2(0.0,0.0))*uPx-vec2(0.0,0.0),-1.0));vec3 s2=stone(ro,rd2,hh2,tt2);acc+=hh2>0.5?s2:sc;}sc=acc*0.25;}vec3 pn,pp;float part;vec3 roL=hL(ro-HPV)+HPV-HS,rdL=hL(rd);float tp=holder(roL,rdL,pn,pp,part);",
  /* the light, as her first design had it (her words, 13 November 2026: "I want the beams from my initial design back. I just didn't like how
     they were just hanging on the Diamond like strings"): a ray shoots in, runs through the stone along its inner paths and flies out in
     three fans of colour, one glancing off the holder; from a new angle each time and only now and then. The rays show only while the
     light runs along them and fade straight after, so nothing hangs on the stone. */
  "  float f=uL.z<-50.0?9.0:max(uT-uL.z,0.0)/3.4;",
  "  float sIn=clamp(f/0.03,0.0,1.0),onIn=step(f,0.035);float sOut=clamp((f-0.05)/0.045,0.0,1.0),onOut=step(0.045,f)*step(f,0.11);",
  "  float glow=exp(-max(0.0,f-0.07)*9.0)*step(0.05,f);float aft=exp(-max(0.0,f-0.09)*12.0)*step(0.03,f);float lit=glow;",
  "  float A=uL.x;vec3 dA=vec3(cos(A),0.0,sin(A)),tg=vec3(-dA.z,0.0,dA.x);vec3 E=uDC+dA*0.30+vec3(0.0,0.24,0.0),P1=uDC-dA*0.05+vec3(0.0,-0.30,0.0),P2=uDC-dA*0.34+vec3(0.0,-0.05,0.0);",
  "  vec3 col=vec3(0.0);float a=0.0;float th=1e9;",
  "  if(hs>0.5&&ts<tp){col=sc;a=1.0;th=ts;col*=1.0+mix(0.35,0.7,uN)*glow;",
  "    float s1=clamp((f-0.028)/0.012,0.0,1.0),s2=clamp((f-0.040)/0.012,0.0,1.0);float on1=step(0.026,f)*step(f,0.075),on2=step(0.038,f)*step(f,0.085);",
  "    vec3 Xi=uDC-dA*0.55+vec3(0.0,-0.42,0.0);col+=vec3(1.0,0.96,1.0)*beam(ro,rd,E,Xi,0.022,1e9,s1,0.30,0.0,1.8*on1);",
  "    col=tm(col);}",
  "  else if(tp<1e8){vec3 hc=holderCol(pp,pn,rdL,part,lit);col=uN>0.5?tm(hc):min(hc,vec3(1.0));a=1.0;th=tp;}",
  "  else{vec4 au=aurora(v);float ai=uN>0.5?0.95:0.80;col=au.rgb*ai;a=clamp(au.a*ai,0.0,1.0);",
  "    if(uN<0.5){vec2 wc=(v-vec2(0.50,0.52))*vec2(uAsp,1.0);float wg=exp(-dot(wc,wc)/0.34);vec3 wcol=mix(vec3(0.98,0.80,0.78),vec3(0.80,0.70,1.0),clamp(v.x*0.7+v.y*0.5,0.0,1.0));col+=wcol*wg*0.46;a=max(a,wg*0.46);vec2 gc=(v-vec2(0.50,0.60))*vec2(uAsp,1.0);float gg=exp(-dot(gc,gc)/0.045);col+=vec3(0.70,0.50,1.0)*gg*0.34;a=max(a,gg*0.34);",
  "      vec2 fc=(v-vec2(0.52,0.22))*vec2(uAsp,1.6);float fg=exp(-dot(fc,fc)/0.12);col+=vec3(0.78,0.62,1.0)*fg*0.34;a=max(a,fg*0.34);}",
  /* the holder's own soft shadow beneath it, so it seems to float */
  "    if(rd.y<0.0){float tf=(-0.37-ro.y)/rd.y;vec3 f=ro+rd*tf;float r=length(f.xz);float sa=mix(0.20,0.42,uN)*exp(-pow(max(r-1.30,0.0)/0.42,2.0))*smoothstep(2.6,1.8,r);vec3 scl=uN>0.5?vec3(0.0):vec3(0.20,0.15,0.34)*sa;col=col*(1.0-sa)+scl;a=a+sa*(1.0-a);}}",
  /* the ray in, the three fans out (the falling one glances off the holder), each with its pulse and a quick afterglow, then gone */
  /* her words (14 November 2026): "I want only or two rays shooting through the diamond and at diagonal or opposite angles so that it looks
     more natural and enhances the sparkles of the diamond without ruining the look"; the fans that bounced off "like a lightning bolt" are
     gone. One ray comes in on the upper diagonal, runs straight through the stone and leaves on the lower opposite diagonal, thinning and
     fading as it goes, with a thread of colour where it leaves the glass; every other time a second, fainter ray crosses it from the other
     side. Nothing hangs on the stone between pulses. */
  "  float I=mix(0.40,0.55,uN);vec3 L=vec3(0.0);float el=0.95+0.18*sin(uL.z*1.7);vec3 S0=E+normalize(dA*0.85+vec3(0.0,el,0.0)+tg*0.25)*4.6;",
  "  L+=vec3(1.0,0.98,1.0)*beam(ro,rd,S0,E,0.014,th,sIn,0.06,1.3*aft,3.4*onIn)*I;",
  "  vec3 Xo=uDC-dA*0.55+vec3(0.0,-0.42,0.0);vec3 dO=normalize(Xo-E);vec3 Xe=Xo+dO*2.8;",
  "  L+=mix(vec3(1.0,0.98,1.0),hue(0.62),0.35)*beam(ro,rd,Xo,Xe,0.012,th,sOut,0.10,1.2*aft,3.0*onOut)*I*0.85;",
  "  if(uL.w>0.5){vec3 dB=vec3(-dA.z,0.0,dA.x);vec3 E2=uDC+dB*0.30+vec3(0.0,0.26,0.0);vec3 S2=E2+normalize(dB*0.85+vec3(0.0,0.75,0.0)-tg*0.2)*4.4;vec3 X2=uDC-dB*0.52+vec3(0.0,-0.40,0.0);",
  "    L+=vec3(1.0,0.98,1.0)*beam(ro,rd,S2,E2,0.012,th,sIn,0.06,0.8*aft,2.2*onIn)*I*0.6;L+=mix(vec3(1.0,0.98,1.0),hue(0.25),0.35)*beam(ro,rd,X2,X2+normalize(X2-E2)*2.6,0.010,th,sOut,0.10,0.8*aft,2.0*onOut)*I*0.5;}",
  "  float eb=smoothstep(0.0,0.10,v.x)*smoothstep(1.0,0.90,v.x)*smoothstep(0.0,0.08,v.y)*smoothstep(1.0,0.88,v.y);vec3 Lt=tm(L)*eb;",
  "  col=col+Lt*(1.0-0.35*a);a=max(a,clamp(max(Lt.r,max(Lt.g,Lt.b))*1.15,0.0,1.0));gl_FragColor=vec4(min(col,vec3(a)),a);}"].join("\n");
  function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
  function init(){try{gl=cv.getContext("webgl",{premultipliedAlpha:true,alpha:true,antialias:false,powerPreference:"low-power"})||cv.getContext("experimental-webgl");}catch(e){gl=null;}
    if(!gl)return false;try{pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
      if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));}catch(e){W.__diamondErr=String(e);return false;}
    gl.useProgram(pr);var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    var loc=gl.getAttribLocation(pr,"p");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    ["uT","uN","uV","uAsp","uTan","uY","uPx","uDial","uCP","uDC","uCM","uR","uTab","uL","uHT"].forEach(function(n){U[n]=gl.getUniformLocation(pr,n);});U.uG=gl.getUniformLocation(pr,"uG[0]");
    var g=[];GROUPS.forEach(function(x){g.push(x[0],x[1],x[2],x[3]);});gl.uniform4fv(U.uG,new Float32Array(g));gl.uniform1f(U.uTab,HT);
    gl.uniform3fv(U.uCP,new Float32Array(CP));gl.uniformMatrix3fv(U.uCM,false,new Float32Array([CR[0],CR[1],CR[2],CU[0],CU[1],CU[2],-CF[0],-CF[1],-CF[2]]));
    gl.uniform1f(U.uTan,TAN);gl.uniform1f(U.uAsp,W0/H0);
    var tx=gl.createTexture();gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,tx);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,0]));
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(pr,"uTx"),1);
    tx2=gl.createTexture();gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,tx2);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([240,236,250,255]));
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(pr,"uTx2"),2);gl.activeTexture(gl.TEXTURE0);
    function word(){var c=D.createElement("canvas");c.width=1024;c.height=128;var x=c.getContext("2d");x.clearRect(0,0,1024,128);x.fillStyle="#fff";x.textAlign="center";x.textBaseline="middle";
      x.font='600 88px "Home Cormorant","Cormorant Garamond",Cormorant,Georgia,serif';var t="INGENIUM",sp=34,w=0,k;for(k=0;k<t.length;k++)w+=x.measureText(t[k]).width+(k?sp:0);var cx=512-w/2;
      for(k=0;k<t.length;k++){var cw=x.measureText(t[k]).width;x.fillText(t[k],cx+cw/2,68);cx+=cw+sp;}
      gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,tx);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);gl.activeTexture(gl.TEXTURE0);kick();}
    try{if(D.fonts&&D.fonts.load)D.fonts.load('600 88px "Home Cormorant"').then(word,word);else word();}catch(e){word();}

    return true;}
  function dpr(){return Math.min(2,Math.max(1,W.devicePixelRatio||1));}
  /* the compass's dial, as Vocatio draws it (modules/r290.js: its enamel picture under its engraved rings and Ingenium's Orrery), read from
     the compass itself once it has been drawn, by day and by night, and put under the glass as a picture */
  function orrery(){var nt=night(),k=nt?"n":"d";if(DIALK===k||!gl)return;var dl=D.querySelector("#page-career .skv-dial");if(!dl)return;var im=dl.querySelector("img"),sv=dl.querySelector("svg");if(!im||!sv||!im.src)return;
    var c=D.createElement("canvas"),S=1024;c.width=c.height=S;var x=c.getContext("2d"),done=0;DIALK=k;
    function put(){x.setTransform(1,0,0,1,0,0);gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,tx2);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);gl.activeTexture(gl.TEXTURE0);kick();}
    var a=new Image();a.onload=function(){x.drawImage(a,0,0,S,S);var sr=new XMLSerializer().serializeToString(sv);if(sr.indexOf("xmlns=")<0)sr=sr.replace("<svg","<svg xmlns=\"http://www.w3.org/2000/svg\"");
      var b=new Image();b.onload=function(){try{x.drawImage(b,0,0,S,S);}catch(e){}put();};b.onerror=put;b.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(sr);};a.onerror=function(){DIALK="";};a.src=im.src;}

  function size(){var d=dpr()*q;var w=Math.round(W0*d),h=Math.round(H0*d);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}var od=dpr();if(ov.width!==Math.round(W0*od)){ov.width=Math.round(W0*od);ov.height=Math.round(H0*od);}}
  /* the light's pulses: each from a new side, alternately from the right and from the left, at a new depth and height */
  var PL={a:0,e:0.2,s:-99,n:0},HV={x:0,lx:0,z:0,lz:0},LIGHT=true,NEXT=3.0;
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
  function star(x,y,r,a,nt){if(a<=0.01)return;og.save();og.globalAlpha=Math.min(1,a);og.globalCompositeOperation=nt?"lighter":"source-over";
    var gr=og.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.2,nt?"rgba(222,206,255,.8)":"rgba(255,255,255,.85)");gr.addColorStop(1,nt?"rgba(150,110,240,0)":"rgba(190,170,240,0)");
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
  function specks(t,M,DC,nt,u){var dt=lastSp<0?0:Math.min(0.1,Math.max(0,t-lastSp));lastSp=t;var rate=5.5+(u>=0&&u<1.4?10.0:0);
    for(var sp2=0;sp2<2;sp2++)if(Math.random()<rate*dt*0.5&&SPECK.length<14){var f=FAC[Math.floor(Math.random()*FAC.length)],j=[(Math.random()-0.5)*0.10,(Math.random()-0.5)*0.04,(Math.random()-0.5)*0.10];
      SPECK.push({p:[f.p[0]+j[0],f.p[1]+j[1],f.p[2]+j[2]],f:f,t0:t,life:0.14+Math.random()*0.24,r:1.8+Math.random()*3.8});}
    for(var i=SPECK.length-1;i>=0;i--){var s=SPECK[i],age=(t-s.t0)/s.life;if(age>=1||age<0){SPECK.splice(i,1);continue;}
      var P=mv(M,s.p);P=[P[0]+DC[0],P[1]+DC[1],P[2]+DC[2]];var V=nrm(sub(CP,P)),N=s.f.g<0?mv(M,[0,1,0]):mv(M,gN(s.f));var hz=nrm([N[0],0.0001,N[2]]);
      if(dot(N,V)<0.05&&dot(hz,[V[0],0,V[2]])<0.25)continue;var xy=proj(P),a=Math.pow(Math.sin(Math.PI*age),2);star(xy[0],xy[1],s.r*(0.7+0.5*a),a*(nt?0.95:0.9),nt);}}
  function sparkle(t,M,DC,nt){og.setTransform(dpr(),0,0,dpr(),0,0);og.clearRect(0,0,W0,H0);
    for(var i=0;i<SPK.length;i++){var s=SPK[i],N=mv(M,gN(s)),P=mv(M,s.p);P=[P[0]+DC[0],P[1]+DC[1],P[2]+DC[2]];var V=nrm(sub(CP,P));if(dot(N,V)<=0.05)continue;
      var nl=dot(N,KL),Rl=[2*nl*N[0]-KL[0],2*nl*N[1]-KL[1],2*nl*N[2]-KL[2]],c=dot(Rl,V);if(c<0.95)continue;var a=Math.pow((c-0.95)/0.05,2.2),xy=proj(P);star(xy[0],xy[1],5+9*a,a*0.8,nt);}
    var f=(t-PL.s)/PER;if(f>=0&&f<0.5){var A=PL.a,cA=Math.cos(A),sA=Math.sin(A),b1=A+Math.PI-0.95,b2=A+Math.PI+1.05;
      var hitA=Math.exp(-Math.pow((f-0.03)/0.014,2)),outA=Math.exp(-Math.pow((f-0.06)/0.02,2));
      var en=proj([DC[0]+cA*0.30,DC[1]+0.24,DC[2]+sA*0.30]);star(en[0],en[1],8+16*hitA,hitA,nt);
      [[-cA*0.55,-0.42,-sA*0.55]].forEach(function(e){var p=proj([DC[0]+e[0],DC[1]+e[1],DC[2]+e[2]]);star(p[0],p[1],6+12*outA,outA*0.9,nt);});
      for(var k=0;k<SPK.length;k++){var hk=Math.sin((k+1)*12.9898+PL.n*78.233)*43758.5453;hk-=Math.floor(hk);if(hk<0.45)continue;var gk=Math.exp(-Math.pow((f-0.05-hk*0.07)/0.022,2));if(gk<0.03)continue;
        var sk=SPK[k],Pk=mv(M,sk.p);Pk=[Pk[0]+DC[0],Pk[1]+DC[1],Pk[2]+DC[2]];if(dot(mv(M,gN(sk)),nrm(sub(CP,Pk)))<=0.0)continue;var xyk=proj(Pk);star(xyk[0],xyk[1],4+9*gk,gk*0.9,nt);}}
    specks(t,M,DC,nt,(t-PL.s)/TT);
    /* motes of light in the air, drifting slowly, each twinkling now and then */
    for(var j=0;j<MOTES.length;j++){var m=MOTES[j],x=40+m[0]*440,y=40+((m[1]-t*0.006*m[2])%1+1)%1*300,tw=Math.pow(0.5+0.5*Math.sin(t*1.3*m[2]+m[3]),6);
      og.globalAlpha=(nt?0.55:0.6)*(0.25+0.75*tw);og.fillStyle=nt?"rgba(226,212,255,1)":"rgba(132,96,220,1)";og.beginPath();og.arc(x,y,0.7+0.9*m[2],0,Math.PI*2);og.fill();if(tw>0.7)star(x,y,3+5*tw,(tw-0.7)*1.6,nt);}
    og.globalAlpha=1;}
  function night(){return D.body.getAttribute("data-theme")==="night";}
  function still(){return D.body.getAttribute("data-motion")==="minimal"||(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}
  function frame(ts){raf=0;if(!vis||!shown||!ok)return;var t=(ts-t0)/1000,st=still();if(AUTO){var bv=byHour();if(bv!==VAR){if(VAR>=0&&!st&&LIGHT)pulse(t);VAR=bv;}}if(!st&&LIGHT&&t>=NEXT){pulse(t);NEXT=t+16+Math.random()*12;}var busy=over||t-press<2.5||t-PL.s<1.4,gap=busy?16:33;
    if(ts-lastDraw<gap){raf=requestAnimationFrame(frame);return;}var dt=Math.min(0.1,(ts-lastDraw)/1000||0.033);
    if(lastDraw){var took=ts-lastDraw;if(took>gap*1.9)slowN++;else slowN=Math.max(0,slowN-1);if(slowN>12&&q>0.55&&!W.__keepQ){q=Math.max(0.55,q*0.8);slowN=0;size();}}
    lastDraw=ts;if(!st&&!over)yaw+=dt*(Math.PI*2/36);
    gx+=((over?mX*0.22:0)-gx)*Math.min(1,dt*6);gz+=((over?-mY*0.16:0)-gz)*Math.min(1,dt*6);tx=gz;tz=-gx*0.6;
    var tt=st?1.0:(W.__tFix!=null?W.__tFix:t);if(W.__tFix!=null&&W.__pFix){PL.a=W.__pFix[0];PL.e=W.__pFix[1];PL.s=W.__pFix[2];PL.n=W.__pFix[3]||1;}
    var M=rotM(),bob=st?0:Math.sin(tt*2*Math.PI/7)*0.035,DC=[0,1.22+bob,0],nt=night();
    gl.viewport(0,0,cv.width,cv.height);gl.uniform1f(U.uT,tt);gl.uniform1f(U.uN,nt?1:0);gl.uniform1f(U.uV,Math.max(0,VAR));gl.uniform1f(U.uY,yaw);gl.uniform3fv(U.uDC,new Float32Array(DC));
    gl.uniform4fv(U.uL,new Float32Array([PL.a,PL.e,st?-99:PL.s,PL.n%2?0:1]));
    /* the case moves as the compass does: a sway of its own, ten seconds round, and a lean toward the pointer on a spring that overshoots a
       hair and settles */
    var sw=st?0:2*Math.PI*tt/10,hx0=st?0:0.030*Math.sin(sw),hz0=st?0:0.018*Math.sin(sw+1.3),lx=over?mY*0.05:0,lz=over?-mX*0.06:0;
    HV.x+=(60*(lx-HV.lx)-11*HV.x)*dt;HV.lx+=HV.x*dt;HV.z+=(60*(lz-HV.lz)-11*HV.z)*dt;HV.lz+=HV.z*dt;
    gl.uniform2f(U.uHT,0.0,0.0);if(DIAL)orrery();gl.uniform1f(U.uDial,DIAL&&DIALK?1:0);gl.uniform2f(U.uPx,2.0*TAN*(W0/H0)/cv.width,2.0*TAN/cv.height);
    gl.uniformMatrix3fv(U.uR,false,new Float32Array([M[0][0],M[0][1],M[0][2],M[1][0],M[1][1],M[1][2],M[2][0],M[2][1],M[2][2]]));
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);sparkle(tt,M,DC,nt);if(!st||busy)raf=requestAnimationFrame(frame);}
  function kick(){if(!raf)raf=requestAnimationFrame(frame);}
  function mount(el){host=el;cv=D.createElement("canvas");cv.className="bd-cv";ov=D.createElement("canvas");ov.className="bd-cv ov";host.appendChild(cv);host.appendChild(ov);og=ov.getContext("2d");
    if(W.matchMedia&&matchMedia("(pointer: coarse)").matches)q=0.75;size();ok=init();if(!ok){host.setAttribute("data-nogl","1");return;}
    function at(e){var r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*W0,y:(e.clientY-r.top)/r.height*H0};}
    var C=proj([0,1.22,0]);
    host.addEventListener("pointermove",function(e){var p=at(e),dx=(p.x-C[0])/150,dy=(p.y-C[1])/120,on=dx*dx+dy*dy<1;if(on!==over){over=on;cv.style.cursor=on?"pointer":"default";}mX=dx;mY=dy;kick();});
    host.addEventListener("pointerleave",function(){over=false;kick();});
    /* a press sends the light through at once (Home's own click and nothing else) */
    host.addEventListener("pointerdown",function(){if(!over)return;var t=(performance.now()-t0)/1000;press=t;if(LIGHT&&t-PL.s>0.55){pulse(t);NEXT=Math.max(NEXT,t+16+Math.random()*12);}cv.classList.add("down");try{if(W.IngSound)IngSound.play("paper");}catch(x){}kick();});
    host.addEventListener("pointerup",function(){cv.classList.remove("down");});
    try{new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)kick();}).observe(host);}catch(e){}
    D.addEventListener("visibilitychange",function(){shown=!D.hidden;if(shown)kick();});kick();}
  return {mount:mount,kick:kick,theme:kick,fire:function(){},q:function(){return q;},variant:function(v){if(v==="auto"){AUTO=true;VAR=byHour();}else{AUTO=false;var i=LOOKS.indexOf(v);VAR=i<0?0:i;}var t=(performance.now()-t0)/1000;if(!still()&&LIGHT)pulse(t);kick();},light:function(on){LIGHT=!!on;if(LIGHT)NEXT=(performance.now()-t0)/1000+1.2;else PL.s=-99;kick();},look:function(){return LOOKS[VAR<0?byHour():VAR];},auto:function(){return AUTO;},dial:function(v){if(v==null)return DIAL?"orrery":"engine";DIAL=v==="orrery"?1:0;kick();}};})();

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
W.IngDiamond={on:on,variant:function(v){Diamond.variant(v);},light:function(on){Diamond.light(on);},look:function(){return Diamond.look();},auto:function(){return Diamond.auto();},dial:function(v){return Diamond.dial(v);},state:function(){return {head:!!(HD&&HD.el.isConnected),mounted:MOUNTED,q:Diamond.q(),look:Diamond.look(),auto:Diamond.auto(),err:W.__diamondErr||"",label:tag?[tag.querySelector("b").textContent,tag.querySelector("small").textContent]:null};},kick:function(){Diamond.kick();}};
try{window.__ingParts["p292"]="running";}catch(_){}
})();
</script>