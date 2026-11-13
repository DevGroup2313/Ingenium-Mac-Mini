/* =============================== BUILD: a round brilliant over a turned silver plinth, a ray of light through it ===============================
   Drawn by the graphics chip (WebGL 1, so the older web views draw it too): the stone is traced as it is, a convex solid of 73 facets
   (the table, 8 bezels, 8 stars, 16 upper girdle facets, 16 girdle flats, 8 pavilion mains, 16 lower girdle facets); each ray that meets
   it is reflected by Fresnel's law, refracted in at diamond's index (2.42), bounced inside up to six times and refracted out in three
   wavelengths at slightly different indices, which is where a diamond's fire comes from. The studio it mirrors has four soft lights and,
   behind it, an aurora in Ingenium's violets only. The plinth is turned silver, as the compass case: concentric turnings, an engraved
   scale of 72 cuts, a milled edge. A white ray enters the crown and leaves as a fan (the spectrum, or violets only), lighting the plinth.
   Sparkles are Ingenium's four-pointed star, where a facet sends the key light to the eye. It costs little: drawn only while in view and
   while the window is shown, thirty frames a second at rest (sixty under the hand), at a lower resolution if the device is slow. */
var Build=(function(){
  var W0=520,H0=424,host,cv,gl,pr,ov,og,raf=0,vis=true,shown=true,ok=false,U={},q=1,lastDraw=0,slowN=0,fastN=0,t0=performance.now(),
      yaw=0,tx=0,tz=0,gx=0,gz=0,over=false,press=-99,fire=0,mX=0,mY=0;
  /* the camera, shared by the shader and the sparkles */
  var CP=[0,1.62,6.9],TG=[0,0.80,0],FOV=30*Math.PI/180;
  function sub(a,b){return [a[0]-b[0],a[1]-b[1],a[2]-b[2]];}function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
  function nrm(a){var l=Math.sqrt(dot(a,a))||1;return [a[0]/l,a[1]/l,a[2]/l];}function crs(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
  var CF=nrm(sub(TG,CP)),CR=nrm(crs(CF,[0,1,0])),CU=crs(CR,CF),TAN=Math.tan(FOV/2);
  /* the facets, in eight-fold groups: each a base normal (its azimuth and slope) and its distance from the centre */
  var R=1,G=0.012,HT=0.31,AT=0.53,D2R=Math.PI/180;
  function grp(az,slope,down,px,py,pz){var a=az*D2R,s=slope*D2R,n=[Math.sin(s)*Math.cos(a),(down?-1:1)*Math.cos(s),Math.sin(s)*Math.sin(a)];return [n[0],n[1],n[2],n[0]*px+n[1]*py+n[2]*pz];}
  function onR(az,slope,down,r,y){var a=az*D2R;return grp(az,slope,down,r*Math.cos(a),y,r*Math.sin(a));}
  var GROUPS=[onR(0,34.5,false,R,G),                        /* bezels */
    onR(22.5,21.5,false,AT/Math.cos(0)*1.0,HT),                 /* stars, through the table's edge */
    onR(11.25,41,false,R,G),onR(33.75,41,false,R,G),            /* upper girdle facets */
    [1,0,0,R*1.0],[Math.cos(22.5*D2R),0,Math.sin(22.5*D2R),R*1.0], /* the girdle's sixteen flats */
    onR(0,40.75,true,R,-G),                                     /* pavilion mains */
    onR(11.25,42,true,R,-G),onR(33.75,42,true,R,-G)];           /* lower girdle facets */
  /* the stone's own rotation: a slow turn (once in 36 s) and a lean toward the hand */
  function rotM(){var cy=Math.cos(yaw),sy=Math.sin(yaw),cx=Math.cos(tx),sx=Math.sin(tx),cz=Math.cos(tz),sz=Math.sin(tz);
    /* local -> world: Rz * Rx * Ry */
    var Ry=[[cy,0,sy],[0,1,0],[-sy,0,cy]],Rx=[[1,0,0],[0,cx,-sx],[0,sx,cx]],Rz=[[cz,-sz,0],[sz,cz,0],[0,0,1]];
    function mul(A,B){var C=[[0,0,0],[0,0,0],[0,0,0]];for(var i=0;i<3;i++)for(var j=0;j<3;j++)for(var k=0;k<3;k++)C[i][j]+=A[i][k]*B[k][j];return C;}
    return mul(Rz,mul(Rx,Ry));}
  var VS="attribute vec2 p;varying vec2 v;void main(){v=p*0.5+0.5;gl_Position=vec4(p,0.0,1.0);}";
  var FS=["precision highp float;varying vec2 v;",
  "uniform float uT,uN,uF,uP,uAsp,uTan,uY;uniform vec3 uCP,uDC;uniform mat3 uCM,uR;uniform vec4 uG[9];uniform float uTab;",
  "const float IOR=2.42;",
  "float sbox(vec3 w,vec3 ax,vec2 hs,float sf){float d=dot(w,ax);if(d<=0.05)return 0.0;vec3 u=normalize(cross(vec3(0.0,1.0,0.0),ax)+vec3(0.0,0.0,1e-4));vec3 vv=cross(ax,u);",
  "  vec2 p=vec2(dot(w,u),dot(w,vv))/d;vec2 q=1.0-smoothstep(hs*(1.0-sf),hs,abs(p));return q.x*q.y;}",
  /* the studio the stone sees */
  "vec3 envA(vec3 w,float aw){float up=w.y;vec3 dc=mix(vec3(0.88,0.87,0.94),vec3(1.06,1.05,1.09),smoothstep(-0.25,0.85,up));",
  "  vec3 nc=mix(vec3(0.035,0.028,0.07),vec3(0.17,0.13,0.29),smoothstep(-0.25,0.85,up));vec3 c=mix(dc,nc,uN);",
  "  c*=mix(1.0,mix(0.74,0.35,uN),smoothstep(0.02,-0.45,up));",
  "  float dk=sbox(w,normalize(vec3(0.92,0.06,-0.30)),vec2(0.16,0.55),0.55)+sbox(w,normalize(vec3(-0.90,0.02,-0.38)),vec2(0.14,0.5),0.55)+sbox(w,normalize(vec3(0.10,-0.28,-0.95)),vec2(0.35,0.10),0.6)+0.8*sbox(w,normalize(vec3(0.0,0.35,1.0)),vec2(0.07,0.07),0.5);",
  "  c=mix(c,vec3(0.20,0.16,0.31),clamp(dk,0.0,1.0)*(1.0-uN)*0.86);",
  "  float az=atan(w.x,-w.z);float bk=smoothstep(-0.1,0.55,-w.z);float yc=0.24+0.07*sin(az*2.6+uT*0.12)+0.03*sin(az*6.3-uT*0.2);",
  "  float band=exp(-pow((up-yc)/0.12,2.0))*bk;float rays=0.55+0.45*sin(az*30.0+2.0*sin(az*5.0+uT*0.25));",
  "  vec3 au=mix(vec3(0.42,0.22,0.92),vec3(0.80,0.42,0.97),0.5+0.5*sin(az*1.7+uT*0.07));c+=au*band*rays*mix(0.5,1.7,uN)*aw;",
  "  c+=sbox(w,normalize(vec3(-0.55,0.66,0.52)),vec2(0.20,0.32),0.22)*mix(7.0,8.0,uN);",
  "  c+=sbox(w,normalize(vec3(0.05,1.0,0.12)),vec2(0.32,0.32),0.3)*mix(2.6,3.4,uN);",
  "  c+=sbox(w,normalize(vec3(0.78,0.30,0.55)),vec2(0.07,0.40),0.3)*mix(3.2,4.6,uN);",
  "  c+=sbox(w,normalize(vec3(-0.85,0.12,-0.5)),vec2(0.05,0.30),0.3)*mix(1.8,3.0,uN);return c;}",
  "vec3 env(vec3 w){return envA(w,1.0);}",
  /* a ray against the convex stone: where it enters (the latest plane it crosses inward) and where it leaves (the first outward) */
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
  "  vec3 io=uF<0.5?vec3(2.37,2.42,2.48):vec3(2.405,2.42,2.44);",
  "  for(int k=0;k<6;k++){cvx(p+d*0.0005,d,tn,tf,nn,nf);p=p+d*tf;vec3 m=nf;vec3 oc=vec3(0.0);",
  "    vec3 t1=refract(d,-m,io.r);if(dot(t1,t1)>0.0)oc.r=(1.0-fr(dot(t1,m)))*env(toW(t1)).r;",
  "    vec3 t2=refract(d,-m,io.g);if(dot(t2,t2)>0.0)oc.g=(1.0-fr(dot(t2,m)))*env(toW(t2)).g;",
  "    vec3 t3=refract(d,-m,io.b);if(dot(t3,t3)>0.0)oc.b=(1.0-fr(dot(t3,m)))*env(toW(t3)).b;",
  "    col+=thr*oc;vec3 tm=refract(d,-m,IOR);float Fm=dot(tm,tm)>0.0?fr(dot(tm,m)):1.0;thr*=Fm*vec3(0.985,0.985,0.995);d=reflect(d,-m);",
  "    if(max(thr.r,max(thr.g,thr.b))<0.03)break;}",
  "  col+=thr*env(toW(d))*0.5;return col;}",
  /* the turned plinth */
  "float plinth(vec3 ro,vec3 rd,out vec3 n,out vec3 p,out float side){float Rp=1.8,H=0.24,t=1e9;side=0.0;n=vec3(0.0,1.0,0.0);p=vec3(0.0);",
  "  if(rd.y<0.0){float tt=-ro.y/rd.y;vec3 q=ro+rd*tt;if(dot(q.xz,q.xz)<Rp*Rp){t=tt;p=q;}}",
  "  float a=dot(rd.xz,rd.xz),b=dot(ro.xz,rd.xz),c=dot(ro.xz,ro.xz)-Rp*Rp,h=b*b-a*c;",
  "  if(h>0.0){float tt=(-b-sqrt(h))/a;vec3 q=ro+rd*tt;if(tt>0.0&&tt<t&&q.y<=0.0&&q.y>=-H){t=tt;p=q;n=normalize(vec3(q.x,0.0,q.z));side=1.0;}}return t;}",
  "vec2 kp(){return vec2(0.80+0.20*sin(uY*1.0+0.6),0.50+0.12*cos(uY*1.3));}",
  "float flash(float g){return 0.30+0.70*pow(0.5+0.5*sin(uY*8.0+g*2.4),3.0);}",
  "vec3 spec(float h){return clamp(vec3(abs(h*6.0-3.0)-1.0,2.0-abs(h*6.0-2.0),2.0-abs(h*6.0-4.0)),0.0,1.0);}",
  "vec3 vio(float h){return mix(mix(vec3(0.42,0.20,0.95),vec3(0.66,0.32,0.98),smoothstep(0.0,0.5,h)),vec3(0.90,0.70,1.0),smoothstep(0.5,1.0,h));}",
  "vec3 hue(float h){return uF<0.5?spec(h*0.83):vio(h);}",
  "vec3 plinthCol(vec3 p,vec3 n,vec3 rd,float side,vec3 cs){vec3 nn=n;float sh=1.0;",
  "  if(side<0.5){float r=length(p.xz);vec2 dr=p.xz/max(r,1e-4);float tl;",
  "    if(r>1.73)tl=-0.9*smoothstep(1.73,1.80,r);else if(r<0.55)tl=0.06*(r/0.55);else tl=0.0045*sin(r*96.0)+0.0055*sin(r*33.0);",
  "    nn=normalize(vec3(-dr.x*tl,1.0,-dr.y*tl));",
  "    float an=atan(p.z,p.x);float qq=an/6.2831853*72.0;float qi=floor(qq+0.5);float dq=abs(qq-qi)*6.2831853/72.0*r;float lg=mod(qi,6.0)<0.5?1.0:0.0;",
  "    if(r>mix(1.53,1.46,lg)&&r<1.64&&dq<0.008)sh*=0.52;if(abs(r-1.665)<0.005||abs(r-1.40)<0.004)sh*=0.72;}",
  "  else{float an=atan(p.z,p.x);if(p.y>-0.08){float k=sin(an*170.0);nn=normalize(n+vec3(-sin(an),0.0,cos(an))*0.32*k);sh*=0.9+0.1*k;}sh*=mix(1.0,0.66,smoothstep(-0.12,-0.27,p.y));}",
  "  vec3 tn=mix(vec3(0.94,0.93,0.98),vec3(0.80,0.78,0.90),uN*0.5);vec3 col=(envA(reflect(rd,nn),0.25)+mix(vec3(0.04),vec3(0.20,0.17,0.30),uN))*tn*sh;",
  "  if(side<0.5){vec2 sc=p.xz-vec2(0.08,0.16);float s=exp(-dot(sc,sc)/0.42);col*=1.0-mix(0.26,0.40,uN)*s;",
  /* the light the stone throws on the plinth: a small fan of colour where the ray comes down */
  "    vec2 k0=kp();vec2 dd=p.xz-k0;float ln=dot(dd,normalize(vec2(1.0,0.35)));float wd=dot(dd,normalize(vec2(-0.35,1.0)));",
  "    float g=exp(-wd*wd/0.022)*exp(-ln*ln/0.07);float hh=clamp(0.5+wd*2.4,0.0,1.0);col+=hue(hh)*g*mix(0.45,0.85,uN)*(0.35+0.65*flash(0.0))*(0.7+0.8*exp(-max(0.0,uT-uP)*1.3)*step(uP,uT));}",
  "  return col;}",
  /* a shaft of light: how near the eye's ray passes to a segment */
  "float shaft(vec3 ro,vec3 rd,vec3 a,vec3 b,float w,float th){vec3 ba=b-a,w0=ro-a;float B=dot(rd,ba),C=dot(ba,ba),Dd=dot(rd,w0),E=dot(ba,w0),den=C-B*B;",
  "  float s=den>1e-6?clamp((E-B*Dd)/den,0.0,1.0):0.0;float t=max(dot(a+ba*s-ro,rd),0.0);vec3 q=ro+rd*t-(a+ba*s);float d2=dot(q,q);",
  "  float f=smoothstep(0.0,0.08,s)*smoothstep(1.0,0.8,s);float occ=t>th?0.18:1.0;return (exp(-d2/(w*w))+0.25*exp(-d2/(w*w*16.0)))*f*occ;}",
  "vec3 tm(vec3 c){return 1.0-exp(-c*mix(1.34,1.06,uN));}",
  "void main(){vec2 sp=(v*2.0-1.0)*vec2(uAsp,1.0)*uTan;vec3 rd=normalize(uCM*vec3(sp,-1.0)),ro=uCP;",
  "  float hs,ts;vec3 sc=stone(ro,rd,hs,ts);vec3 pn,pp;float side;float tp=plinth(ro,rd,pn,pp,side);",
  "  vec3 col=vec3(0.0);float a=0.0;float th=1e9;",
  "  if(hs>0.5&&ts<tp){col=tm(sc);a=1.0;th=ts;}else if(tp<1e8){col=tm(plinthCol(pp,pn,rd,side,sc));a=1.0;th=tp;}",
  "  else{float ex=smoothstep(0.0,0.14,v.x)*smoothstep(1.0,0.86,v.x)*smoothstep(0.30,0.55,v.y)*smoothstep(1.0,0.80,v.y);",
  "    float xx=v.x*7.0;float yc=0.80+0.05*sin(xx*0.9+uT*0.10)+0.025*sin(xx*2.3-uT*0.17);float band=exp(-pow((v.y-yc)/0.07,2.0));",
  "    float drape=exp(-pow(max(0.0,v.y-yc)/0.16,2.0))*step(yc,v.y)*0.0+exp(-pow((v.y-yc-0.06)/0.10,2.0))*0.6;",
  "    float rays=0.5+0.5*sin(xx*9.0+2.5*sin(xx*1.3+uT*0.21)+uT*0.05);rays=0.45+0.55*rays*rays;",
  "    vec3 au=mix(vec3(0.42,0.22,0.92),vec3(0.80,0.42,0.97),0.5+0.5*sin(xx*0.6+uT*0.08));",
  "    float A=(band+drape)*rays*ex*mix(0.34,0.62,uN);col=au*A;a=A;",
  "    vec2 hc=(v-vec2(0.5,0.62))*vec2(uAsp,1.0);float halo=exp(-dot(hc,hc)/0.05)*mix(0.10,0.30,uN);col+=vec3(0.55,0.36,0.95)*halo;a=max(a,halo);}",
  /* the ray of light: in at the crown, drifting and shimmering; out as three fans that turn with the stone and flash as its facets come round */
  "  float pz=exp(-max(0.0,uT-uP)*1.3)*step(uP,uT);float I=mix(0.46,0.62,uN)+0.9*pz;",
  "  float sw=sin(uT*0.37)*0.55+sin(uT*0.17+1.3)*0.35;vec3 E=uDC+vec3(-0.30,0.24,0.25);vec3 L=vec3(0.0);",
  "  vec3 S0=vec3(-3.3+0.5*sw,3.85-0.45*sw,1.0+0.3*sw);float shim=0.80+0.20*sin(uT*1.7)*sin(uT*0.9+1.0);",
  "  L+=vec3(1.0,0.98,1.0)*shaft(ro,rd,S0,E,0.015,th)*I*shim;",
  "  vec3 X0=uDC+vec3(0.36,-0.40,0.22);vec2 k0=kp();vec3 P0=vec3(k0.x,0.0,k0.y);float f0=flash(0.0);",
  "  for(int i=0;i<5;i++){float h=float(i)/4.0;vec3 e1=P0+vec3(0.08*(h-0.5),0.0,0.07*(h-0.5));L+=hue(h)*shaft(ro,rd,X0,e1,0.012,th)*I*0.75*f0;",
  "    vec3 rf=reflect(normalize(e1-X0),vec3(0.0,1.0,0.0));L+=hue(h)*shaft(ro,rd,e1,e1+rf*1.15,0.010,th)*I*0.22*f0;}",
  "  for(int g=1;g<3;g++){float fg=float(g);vec3 X=uDC+(g==1?vec3(0.80,0.06,0.18):vec3(-0.78,-0.02,0.30));",
  "    float az=(g==1?0.30:2.85)+0.38*sin(uY+fg*2.0)+0.10*sin(uT*0.31+fg);float el=(g==1?0.34:0.13)+0.05*sin(uT*0.23+fg*1.7);float fl=flash(fg);float k=g==1?0.55:0.40;",
  "    for(int i=0;i<5;i++){float h=float(i)/4.0;float a2=az+(h-0.5)*0.07;vec3 dir=normalize(vec3(cos(a2),el+(h-0.5)*0.03,0.35*sin(a2)+0.15));",
  "      L+=hue(h)*shaft(ro,rd,X,X+dir*3.4,0.013+0.003*fg,th)*I*k*fl;}}",
  "  float eb=smoothstep(0.0,0.10,v.x)*smoothstep(1.0,0.90,v.x)*smoothstep(0.0,0.08,v.y)*smoothstep(1.0,0.88,v.y);vec3 Lt=tm(L*0.9)*eb;col=col+Lt*(1.0-0.35*a);a=max(a,clamp(max(Lt.r,max(Lt.g,Lt.b))*1.15,0.0,1.0));",
  "  gl_FragColor=vec4(min(col,vec3(a)),a);}"].join("\n");
  function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){throw new Error(gl.getShaderInfoLog(s));}return s;}
  function init(){try{gl=cv.getContext("webgl",{premultipliedAlpha:true,alpha:true,antialias:false,powerPreference:"low-power"})||cv.getContext("experimental-webgl");}catch(e){gl=null;}
    if(!gl)return false;try{pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
      if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));}catch(e){W.__diamondErr=String(e);return false;}
    gl.useProgram(pr);var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    var loc=gl.getAttribLocation(pr,"p");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    ["uT","uN","uF","uP","uAsp","uTan","uCP","uDC","uCM","uR","uTab","uY"].forEach(function(n){U[n]=gl.getUniformLocation(pr,n);});U.uG=gl.getUniformLocation(pr,"uG[0]");
    var g=[];GROUPS.forEach(function(x){g.push(x[0],x[1],x[2],x[3]);});gl.uniform4fv(U.uG,new Float32Array(g));gl.uniform1f(U.uTab,HT);
    gl.uniform3fv(U.uCP,new Float32Array(CP));gl.uniformMatrix3fv(U.uCM,false,new Float32Array([CR[0],CR[1],CR[2],CU[0],CU[1],CU[2],-CF[0],-CF[1],-CF[2]]));
    gl.uniform1f(U.uTan,TAN);gl.uniform1f(U.uAsp,W0/H0);return true;}
  function size(){var d=Math.min(2,Math.max(1,W.devicePixelRatio||1))*q;var w=Math.round(W0*d),h=Math.round(H0*d);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}
    var od=Math.min(2,Math.max(1,W.devicePixelRatio||1));if(ov.width!==Math.round(W0*od)){ov.width=Math.round(W0*od);ov.height=Math.round(H0*od);}}
  /* the sparkles: Ingenium's four-pointed star where a crown facet sends the key light to the eye */
  var KL=nrm([-0.55,0.66,0.52]),SPK=[];(function(){var i,a;for(i=0;i<8;i++){a=i*45;SPK.push({g:0,k:i,p:[0.78*Math.cos(a*D2R),0.17,0.78*Math.sin(a*D2R)]});}
    for(i=0;i<8;i++){a=22.5+i*45;SPK.push({g:1,k:i,p:[0.60*Math.cos(a*D2R),0.27,0.60*Math.sin(a*D2R)]});}
    for(i=0;i<8;i++){a=11.25+i*45;SPK.push({g:2,k:i,p:[0.93*Math.cos(a*D2R),0.06,0.93*Math.sin(a*D2R)]});a=33.75+i*45;SPK.push({g:3,k:i,p:[0.93*Math.cos(a*D2R),0.06,0.93*Math.sin(a*D2R)]});}
    SPK.push({g:-1,k:0,p:[0,HT,0]});})();
  function gN(s){if(s.g<0)return [0,1,0];var b=GROUPS[s.g],n=[b[0],b[1],b[2]];for(var k=0;k<s.k;k++){n=[0.70710678*(n[0]-n[2]),n[1],0.70710678*(n[0]+n[2])];}return n;}
  function mv(M,p){return [M[0][0]*p[0]+M[0][1]*p[1]+M[0][2]*p[2],M[1][0]*p[0]+M[1][1]*p[1]+M[1][2]*p[2],M[2][0]*p[0]+M[2][1]*p[1]+M[2][2]*p[2]];}
  function proj(P){var v=sub(P,CP),z=dot(v,CF);var x=dot(v,CR)/z/TAN/(W0/H0),y=dot(v,CU)/z/TAN;return [(x+1)/2*W0,(1-(y+1)/2)*H0];}
  function star(x,y,r,a,nt){og.save();og.globalAlpha=Math.min(1,a);og.globalCompositeOperation=nt?"lighter":"source-over";
    var gr=og.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.22,nt?"rgba(214,196,255,.75)":"rgba(255,255,255,.8)");gr.addColorStop(1,nt?"rgba(150,110,240,0)":"rgba(170,140,235,0)");
    og.fillStyle=gr;og.beginPath();var k=r*.16;og.moveTo(x,y-r);og.quadraticCurveTo(x+k,y-k,x+r,y);og.quadraticCurveTo(x+k,y+k,x,y+r);og.quadraticCurveTo(x-k,y+k,x-r,y);og.quadraticCurveTo(x-k,y-k,x,y-r);og.fill();
    var h=og.createRadialGradient(x,y,0,x,y,r*.55);h.addColorStop(0,nt?"rgba(190,160,255,.55)":"rgba(140,100,220,.30)");h.addColorStop(1,"rgba(140,100,220,0)");og.fillStyle=h;og.beginPath();og.arc(x,y,r*.55,0,Math.PI*2);og.fill();og.restore();}
  function sparkle(t,M,DC,nt){var d=Math.min(2,Math.max(1,W.devicePixelRatio||1));og.setTransform(d,0,0,d,0,0);og.clearRect(0,0,W0,H0);
    for(var i=0;i<SPK.length;i++){var s=SPK[i],N=mv(M,gN(s)),P=mv(M,s.p);P=[P[0]+DC[0],P[1]+DC[1],P[2]+DC[2]];var V=nrm(sub(CP,P));if(dot(N,V)<=0.05)continue;
      var nl=dot(N,KL),Rl=[2*nl*N[0]-KL[0],2*nl*N[1]-KL[1],2*nl*N[2]-KL[2]],c=dot(Rl,V);if(c<0.93)continue;var a=Math.pow((c-0.93)/0.07,2.2);var xy=proj(P);
      star(xy[0],xy[1],5+10*a,a*(nt?.85:.75),nt);}
    var fl=function(g){return 0.30+0.70*Math.pow(0.5+0.5*Math.sin(yaw*8+g*2.4),3);},ex=[[0.36,-0.40,0.22,0],[0.80,0.06,0.18,1],[-0.78,-0.02,0.30,2]];
    var sh=0.80+0.20*Math.sin(t*1.7)*Math.sin(t*0.9+1.0),en=proj([DC[0]-0.30,DC[1]+0.24,DC[2]+0.25]);star(en[0],en[1],6+4*sh,(nt?0.55:0.45)*sh,nt);
    ex.forEach(function(e){var f=fl(e[3]);if(f<0.55)return;var q=proj([DC[0]+e[0],DC[1]+e[1],DC[2]+e[2]]);star(q[0],q[1],4+7*f,(f-0.5)*(nt?1.1:0.9),nt);});
    /* a few motes of the aurora, drifting */
    if(nt){for(var j=0;j<14;j++){var ph=(t*0.03+j*0.137)%1,x=60+((j*97)%400),y=30+((j*53)%110)-ph*20,al=Math.sin(ph*Math.PI)*0.6;og.fillStyle="rgba(205,180,255,"+al.toFixed(3)+")";og.beginPath();og.arc(x,y,0.9+((j*7)%3)*0.4,0,Math.PI*2);og.fill();}}}
  function night(){return D.documentElement.getAttribute("data-night")==="1";}
  function still(){return D.documentElement.getAttribute("data-motion")==="minimal"||(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}
  function frame(ts){raf=0;if(!vis||!shown||!ok)return;var t=(ts-t0)/1000,busy=over||t-press<2.5,gap=busy?14:30;
    if(ts-lastDraw<gap){raf=requestAnimationFrame(frame);return;}var dt=Math.min(0.1,(ts-lastDraw)/1000||0.033);
    /* a slow device draws at a lower resolution; a quick one goes back up */
    if(lastDraw){var took=ts-lastDraw;if(took>gap*1.9)slowN++;else slowN=Math.max(0,slowN-1);if(slowN>12&&q>0.55){q=Math.max(0.55,q*0.8);slowN=0;size();}}
    lastDraw=ts;var st=still();if(!st&&!over)yaw+=dt*(Math.PI*2/36);
    gx+=((over?mX*0.22:0)-gx)*Math.min(1,dt*6);gz+=((over?-mY*0.16:0)-gz)*Math.min(1,dt*6);tx=gz;tz=-gx*0.6;
    var M=rotM(),bob=st?0:Math.sin(t*2*Math.PI/7)*0.035,DC=[0,1.22+bob,0],nt=night();
    gl.viewport(0,0,cv.width,cv.height);gl.uniform1f(U.uT,st?3.0:t);gl.uniform1f(U.uN,nt?1:0);gl.uniform1f(U.uF,fire);gl.uniform1f(U.uP,press);gl.uniform1f(U.uY,yaw);
    gl.uniform3fv(U.uDC,new Float32Array(DC));
    /* world -> local is the transpose of local -> world; given column-major, M's rows are passed as columns */
    gl.uniformMatrix3fv(U.uR,false,new Float32Array([M[0][0],M[0][1],M[0][2],M[1][0],M[1][1],M[1][2],M[2][0],M[2][1],M[2][2]]));
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);sparkle(t,M,DC,nt);
    if(!st||busy)raf=requestAnimationFrame(frame);}
  function kick(){if(!raf)raf=requestAnimationFrame(frame);}
  function mount(el){host=el;cv=D.createElement("canvas");cv.className="obj-cv";ov=D.createElement("canvas");ov.className="obj-cv ov";host.appendChild(cv);host.appendChild(ov);og=ov.getContext("2d");
    if(W.matchMedia&&matchMedia("(pointer: coarse)").matches)q=0.75;size();ok=init();if(!ok){host.setAttribute("data-nogl","1");return;}
    function at(e){var r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*W0,y:(e.clientY-r.top)/r.height*H0};}
    var C=proj([0,1.22,0]);
    host.addEventListener("pointermove",function(e){var p=at(e),dx=(p.x-C[0])/150,dy=(p.y-C[1])/120,on=dx*dx+dy*dy<1;if(on!==over){over=on;cv.style.cursor=on?"pointer":"default";}mX=dx;mY=dy;kick();});
    host.addEventListener("pointerleave",function(){over=false;kick();});
    host.addEventListener("pointerdown",function(e){if(!over)return;press=(performance.now()-t0)/1000;cv.classList.add("down");try{if(W.IngSound)IngSound.play("paper");}catch(x){}kick();});
    host.addEventListener("pointerup",function(){cv.classList.remove("down");});
    try{new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)kick();}).observe(host);}catch(e){}
    D.addEventListener("visibilitychange",function(){shown=!D.hidden;if(shown)kick();});kick();}
  return {mount:mount,kick:kick,theme:kick,fire:function(v){fire=v?1:0;kick();},q:function(){return q;},dbg:function(){return {C:proj([0,1.22,0]),over:over,mX:mX,mY:mY,press:press};}};})();
