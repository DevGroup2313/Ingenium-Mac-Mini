/* =============================== MODELS' TURRET and BLEND'S MOVEMENT, in the compass's metal ===============================
   One small renderer on the graphics chip (WebGL 1), two instruments, each seen face on as Vocatio's compass is, leaning a little and
   swaying on Home's seven seconds, lit by the same studio as Build's diamond. Shapes are traced as distance fields (so edges are true and
   every part casts its soft shadow); metals are polished, turned or milled; glass is coated. Two finishes: silver and charcoal, or the
   purple metal of today. Home's own engine button stands at the heart of each (a real button over the drawing, as in the compass).
   Turret: a rope-milled bezel, an engraved memory scale, a turret plate in guilloche turning to bring a cartridge under the violet index,
   five lens cartridges standing out of it, each lens turning its rings slowly. Movement: three gears in mesh with spokes, a silver bridge,
   violet screws, diamond jewels in their bearings; pressing winds it. Drawn only while in view and while the window is shown, thirty
   frames a second at rest, at a lower resolution on a slower device. */
function Instrument(kind){
  var W0=520,H0=424,host,cv,gl,pr,U={},raf=0,vis=true,shown=true,ok=false,q=1,last=0,slowN=0,t0=performance.now(),finish=1,
      tur=Math.PI/2,turGoal=Math.PI/2,turV=0,sel=0,over=false,mX=0,mY=0,gx=0,gy=0,wind=0,speed=1;
  var VS="attribute vec2 p;varying vec2 v;void main(){v=p*0.5+0.5;gl_Position=vec4(p,0.0,1.0);}";
  var FS=["precision highp float;varying vec2 v;",
  "uniform float uT,uN,uF,uK,uAsp,uTur,uSel,uRX,uRY,uWind,uG1;",
  "#define PI 3.14159265",
  "float sbox(vec3 w,vec3 ax,vec2 hs,float sf){float d=dot(w,ax);if(d<=0.05)return 0.0;vec3 u=normalize(cross(vec3(0.0,1.0,0.0),ax)+vec3(0.0,0.0,1e-4));vec3 vv=cross(ax,u);vec2 p=vec2(dot(w,u),dot(w,vv))/d;vec2 q=1.0-smoothstep(hs*(1.0-sf),hs,abs(p));return q.x*q.y;}",
  /* the studio: the diamond's, seen by a dial facing the eye (z toward the viewer) */
  "vec3 env(vec3 w){float up=w.y;vec3 dc=mix(vec3(0.80,0.79,0.86),vec3(1.0,0.99,1.03),smoothstep(-0.4,0.8,up));vec3 nc=mix(vec3(0.09,0.075,0.15),vec3(0.30,0.25,0.46),smoothstep(-0.4,0.8,up));vec3 c=mix(dc,nc,uN);",
  "  c*=mix(1.0,mix(0.62,0.45,uN),smoothstep(0.0,-0.6,up));",
  "  c=mix(c,vec3(0.18,0.15,0.27),clamp(sbox(w,normalize(vec3(0.95,0.0,0.3)),vec2(0.18,0.6),0.6)+sbox(w,normalize(vec3(-0.9,-0.1,0.4)),vec2(0.15,0.55),0.6),0.0,1.0)*(1.0-uN)*0.7);",
  "  c+=sbox(w,normalize(vec3(-0.55,0.62,0.56)),vec2(0.22,0.34),0.25)*mix(4.2,5.5,uN)+sbox(w,normalize(vec3(0.1,0.9,0.4)),vec2(0.4,0.2),0.4)*mix(1.6,2.2,uN)+sbox(w,normalize(vec3(0.8,0.25,0.55)),vec2(0.06,0.4),0.3)*mix(2.4,3.2,uN);",
  "  c+=vec3(0.50,0.30,0.95)*exp(-pow((up-0.18)/0.18,2.0))*smoothstep(0.0,0.6,-w.z)*mix(0.10,0.5,uN);return c;}",
  "mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}",
  "float sdCyl(vec3 p,float r,float h){vec2 d=vec2(length(p.xy)-r,abs(p.z)-h);return min(max(d.x,d.y),0.0)+length(max(d,0.0));}",
  "float smin(float a,float b,float k){float h=clamp(0.5+0.5*(b-a)/k,0.0,1.0);return mix(b,a,h)-k*h*(1.0-h);}",
  /* the scene: returns the distance and the part (in m) */
  "vec2 turret(vec3 p){float d,m;",
  "  float r=length(p.xy),a=atan(p.y,p.x);",
  "  d=sdCyl(p-vec3(0.0,0.0,-0.07),1.0,0.07)-0.012;m=1.0;",                                  /* the case */
  "  float bz=sdCyl(p-vec3(0.0,0.0,0.015),0.99,0.022)-0.016;bz=max(bz,-(r-0.89));if(bz<d){d=bz;m=2.0;}", /* the rope-milled bezel */
  "  float sc=max(sdCyl(p-vec3(0.0,0.0,0.012),0.875,0.012),-(r-0.735))-0.004;if(sc<d){d=sc;m=3.0;}",               /* the scale ring */
  "  vec3 q=p;q.xy=rot(-uTur)*q.xy;float pl=sdCyl(q-vec3(0.0,0.0,0.02),0.715,0.016)-0.006;if(pl<d){d=pl;m=4.0;}",   /* the turret plate */
  "  float best=1e9;float ang=PI/2.5;for(int i=0;i<5;i++){vec2 c=vec2(cos(float(i)*ang+PI*0.5),sin(float(i)*ang+PI*0.5))*0.455;vec3 cp=q-vec3(c,0.105);",
  "    float body=sdCyl(cp,0.128,0.068)-0.012;float lens=max(length(cp-vec3(0.0,0.0,0.035))-0.102,cp.z-0.085);body=min(body,lens);if(body<best){best=body;}}",
  "  if(best<d){d=best;m=5.0;}",
  "  float hub=sdCyl(p-vec3(0.0,0.0,0.07),0.17,0.03)-0.012;if(hub<d){d=hub;m=7.0;}",
  "  vec2 ip=p.xy-vec2(0.0,0.935);float idx=max(max(abs(ip.x)*1.4+ip.y*0.7-0.045,-ip.y-0.03),abs(p.z-0.05)-0.012);if(idx<d){d=idx;m=8.0;}",
  "  return vec2(d,m);}",
  "float gear(vec3 p,float R,float N,float z,float h,float sp){float r=length(p.xy),a=atan(p.y,p.x);float t=clamp(sin(N*a)*2.2,-1.0,1.0);float g=(r-(R+0.022*t))*0.75;",
  "  g=max(g,abs(p.z-z)-h);float hole=max(max(r-R*0.80,R*0.30-r),-(abs(sin(a*sp*0.5))-0.42)*r*0.9);return max(g,-max(hole,abs(p.z-z)-h*2.0));}",
  "vec2 movement(vec3 p){float d,m;float r=length(p.xy);",
  "  d=sdCyl(p-vec3(0.0,0.0,-0.07),1.0,0.07)-0.012;m=1.0;",
  "  float bz=max(sdCyl(p-vec3(0.0,0.0,0.015),0.99,0.022)-0.016,-(r-0.89));if(bz<d){d=bz;m=2.0;}",
  "  float pl=sdCyl(p-vec3(0.0,0.0,0.0),0.89,0.01);if(pl<d){d=pl;m=4.0;}",
  "  float a1=uG1;vec3 q=p;q.xy=rot(-a1)*q.xy;float g1=gear(q,0.40,36.0,0.05,0.028,6.0);if(g1<d){d=g1;m=9.0;}",
  "  vec3 qa=p-vec3(-0.585,0.0,0.0);qa.xy=rot(a1*2.0+PI/18.0)*qa.xy;float g2=gear(qa,0.19,18.0,0.045,0.024,4.0);if(g2<d){d=g2;m=9.0;}",
  "  vec3 qb=p-vec3(0.585,0.0,0.0);qb.xy=rot(a1*2.0+PI/18.0)*qb.xy;float g3=gear(qb,0.19,18.0,0.045,0.024,4.0);if(g3<d){d=g3;m=9.0;}",
  /* the bridge: a silver arc over the gears, with its screws, and the diamond jewels at each arbor */
  "  vec2 bp=p.xy-vec2(0.0,-0.30);float arc=abs(length(bp)-0.64)-0.055;arc=max(arc,-(p.y+0.02));float br=max(arc,abs(p.z-0.11)-0.014)-0.006;if(br<d){d=br;m=10.0;}",
  "  for(int i=0;i<2;i++){vec3 sp=p-vec3(i==0?-0.585:0.585,0.0,0.13);float scr=sdCyl(sp,0.035,0.012)-0.006;if(scr<d){d=scr;m=12.0;}}",
  "  for(int i=0;i<3;i++){vec3 jp=p-vec3(i==0?0.0:(i==1?-0.585:0.585),0.0,i==0?0.11:0.155);float jw=length(jp)-(i==0?0.0:0.022);if(i>0&&jw<d){d=jw;m=11.0;}}",
  "  float hub=sdCyl(p-vec3(0.0,0.0,0.085),0.155,0.02)-0.01;if(hub<d){d=hub;m=7.0;}",
  "  return vec2(d,m);}",
  "vec2 map(vec3 p){p.yz=rot(uRX)*p.yz;p.xz=rot(uRY)*p.xz;return uK<0.5?turret(p):movement(p);}",
  "vec3 nrm(vec3 p){vec2 e=vec2(0.0012,0.0);return normalize(vec3(map(p+e.xyy).x-map(p-e.xyy).x,map(p+e.yxy).x-map(p-e.yxy).x,map(p+e.yyx).x-map(p-e.yyx).x));}",
  "float shadow(vec3 ro,vec3 rd){float res=1.0,t=0.01;for(int i=0;i<18;i++){float h=map(ro+rd*t).x;res=min(res,10.0*h/t);t+=clamp(h,0.01,0.08);if(res<0.02||t>1.2)break;}return clamp(res,0.0,1.0);}",
  "float ao(vec3 p,vec3 n){float o=0.0,s=1.0;for(int i=1;i<5;i++){float h=0.012*float(i);o+=(h-map(p+n*h).x)*s;s*=0.6;}return clamp(1.0-o*9.0,0.0,1.0);}",
  "vec3 metal(vec3 base,vec3 n,vec3 rd,float rough){vec3 r=reflect(rd,n);vec3 e=mix(env(r),env(normalize(n+r)),rough);float f=0.04+0.96*pow(1.0-max(dot(-rd,n),0.0),5.0);return e*mix(base,vec3(1.0),f*0.5);}",
  "vec3 shade(vec3 p,vec3 rd,float m){vec3 n=nrm(p);vec3 L=normalize(vec3(-0.55,0.62,0.56));float sh=shadow(p+n*0.004,L),oc=ao(p,n);",
  "  vec3 lp=p;lp.yz=rot(uRX)*lp.yz;lp.xz=rot(uRY)*lp.xz;float r=length(lp.xy),a=atan(lp.y,lp.x);",
  "  vec3 silver=mix(vec3(0.93,0.92,0.97),vec3(0.80,0.77,0.92),uN*0.4),violetM=mix(vec3(0.66,0.52,0.96),vec3(0.56,0.42,0.90),uN),fin=mix(silver,violetM,uF);",
  "  vec3 charcoal=mix(vec3(0.30,0.30,0.35),vec3(0.17,0.16,0.21),uN),plateC=mix(charcoal,mix(vec3(0.44,0.30,0.80),vec3(0.30,0.19,0.62),uN),uF);",
  "  vec3 c;",
  "  if(m<1.5){c=metal(fin*0.95,n,rd,0.16);}",
  "  else if(m<2.5){float ph=a*110.0+r*60.0;vec3 tg=vec3(-sin(a),cos(a),0.0);vec3 bn=normalize(n+tg*0.14*sin(ph));c=metal(fin,bn,rd,0.14)*(0.94+0.06*cos(ph));}",
  "  else if(m<3.5){c=metal(fin*0.97,n,rd,0.12);float tq=a/(2.0*PI)*60.0;float ti=floor(tq+0.5);float dq=abs(tq-ti)*2.0*PI/60.0*r;float lg=mod(ti,5.0)<0.5?1.0:0.0;",
  "    if(dq<0.0035&&r>mix(0.80,0.765,lg)&&r<0.86)c*=0.45;if(abs(r-0.745)<0.0025||abs(r-0.865)<0.002)c*=0.6;}",
  "  else if(m<4.5){vec2 qq=rot(uK<0.5?-uTur:0.0)*lp.xy;float rr=length(qq),aa=atan(qq.y,qq.x);float gu=0.5+0.5*sin(rr*160.0+sin(aa*12.0)*2.2);",
  "    vec3 bn=normalize(n+vec3(cos(aa),sin(aa),0.0)*0.16*(gu-0.5));c=mix(plateC*0.45,metal(plateC*1.15,bn,rd,0.18),0.8)*(0.88+0.18*gu);if(uK>0.5){vec2 cell=fract(lp.xy*11.0)-0.5;float pr2=0.5+0.5*sin(length(cell)*44.0);c=metal(mix(vec3(0.86,0.85,0.90),plateC*1.3,0.55+0.45*uF),normalize(n+vec3(cell*0.25*(pr2-0.5),0.0)),rd,0.2)*(0.9+0.12*pr2);}if(uK<0.5&&rr>0.69){vec3 en=mix(vec3(0.42,0.24,0.86),vec3(0.52,0.34,0.94),uN);c=en*(0.55+0.5*max(dot(n,normalize(vec3(-0.55,0.62,0.56))),0.0))+env(reflect(rd,n))*0.18;}}",
  "  else if(m<5.5){vec2 qq=rot(-uTur)*lp.xy;float ang=PI/2.5;float best=9.0;vec2 cc=vec2(0.0);float bi=0.0;for(int i=0;i<5;i++){vec2 c2=vec2(cos(float(i)*ang+PI*0.5),sin(float(i)*ang+PI*0.5))*0.455;float dd=length(qq-c2);if(dd<best){best=dd;cc=c2;bi=float(i);}}",
  "    float zl=lp.z;if(best<0.104&&zl>0.13){float lr=best/0.10;vec3 rr2=reflect(rd,n);vec3 coat=mix(vec3(0.42,0.28,0.85),vec3(0.70,0.55,1.0),0.5+0.5*sin(lr*18.0-uT*0.6*(1.0+bi*0.2)));",
  "      float fr2=0.06+0.94*pow(1.0-max(dot(-rd,n),0.0),4.0);c=env(rr2)*fr2*0.9+coat*mix(0.16,0.24,uN)*(1.0-lr*0.6)+mix(vec3(0.04,0.03,0.08),vec3(0.06,0.04,0.11),uN);",
  "      float ir=atan(lp.y-cc.y,lp.x-cc.x)+uT*0.15*(1.0+bi*0.1);float bl=smoothstep(0.30,0.34,lr+0.04*sin(ir*6.0));c*=mix(0.55,1.0,bl);",
  "      for(int k=0;k<3;k++){float rk=0.30+0.22*float(k);c+=mix(vec3(0.80,0.72,1.0),vec3(0.95,0.92,1.0),float(k)/2.0)*smoothstep(0.035,0.0,abs(lr-rk))*0.16;}",
  "      c+=vec3(1.0)*pow(max(dot(rr2,normalize(vec3(-0.55,0.62,0.56))),0.0),220.0)*1.4;",
  "      c+=vec3(0.75,0.65,1.0)*smoothstep(0.03,0.0,abs(lr-0.55-0.05*sin(uT*0.5+bi)))*0.10;if(abs(bi-uSel)<0.5)c+=vec3(0.55,0.40,0.95)*0.10*(0.6+0.4*sin(uT*2.0));}",
  "    else{float kn=0.5+0.5*sin(atan(lp.y-cc.y,lp.x-cc.x)*60.0);c=metal(fin*(zl<0.10&&zl>0.06?0.88+0.12*kn:1.0),n,rd,zl<0.10&&zl>0.06?0.22:0.08);}}",
  "  else if(m<7.5){c=metal(fin,n,rd,0.12);}",
  "  else if(m<8.5){c=mix(vec3(0.40,0.24,0.80),vec3(0.62,0.45,0.98),max(n.y,0.0))*0.9+env(reflect(rd,n))*0.15;}",
  "  else if(m<9.5){vec3 gm=mix(vec3(0.95,0.94,0.98),vec3(0.70,0.56,0.98),uF);float cs=0.5+0.5*sin(r*300.0+sin(a*3.0));vec3 bn=normalize(n+vec3(cos(a),sin(a),0.0)*0.05*(cs-0.5));c=metal(gm*(0.92+0.10*cs),bn,rd,0.10);}",
  "  else if(m<10.5){float pg=0.5+0.5*sin(lp.x*90.0+lp.y*10.0);vec3 bn=normalize(n+vec3(0.12*(pg-0.5),0.0,0.0));c=metal(fin*(0.94+0.08*pg),bn,rd,0.08);}",
  "  else if(m<11.5){vec3 rr2=reflect(rd,n);float fz=floor(atan(n.y,n.x)*8.0/PI);c=env(rr2)*(0.9+0.4*fract(sin(fz*91.7)*43758.5))+vec3(1.0)*pow(max(dot(rr2,L),0.0),80.0)*2.5;}",
  "  else{c=metal(mix(vec3(0.38,0.24,0.78),vec3(0.50,0.36,0.92),uN),n,rd,0.1);}",
  "  float di=max(dot(n,L),0.0);c*=mix(0.72,1.0,sh*di+0.4)*mix(0.62,1.0,oc);return c;}",
  "vec3 tm(vec3 c){return 1.0-exp(-c*mix(1.25,1.1,uN));}",
  "void main(){vec2 sp=(v*2.0-1.0)*vec2(uAsp,1.0);vec3 ro=vec3(0.0,0.42,3.25);vec3 ta=vec3(0.0,0.0,0.0);vec3 f=normalize(ta-ro),r=normalize(cross(f,vec3(0.0,1.0,0.0))),u=cross(r,f);",
  "  vec3 rd=normalize(f+(r*sp.x+u*sp.y)*0.36);float t=2.2;float hit=0.0;vec2 h;",
  "  for(int i=0;i<90;i++){h=map(ro+rd*t);if(h.x<0.0009){hit=1.0;break;}t+=h.x*0.9;if(t>4.6)break;}",
  "  if(hit<0.5){/* the instrument's soft shadow on the desk */float sh2=exp(-pow(length((v-vec2(0.52,0.43))*vec2(uAsp,1.0)*vec2(1.0,1.3)),2.0)/0.11);gl_FragColor=vec4(0.0,0.0,0.0,sh2*mix(0.16,0.42,uN));return;}",
  "  vec3 p=ro+rd*t;vec3 c=tm(shade(p,rd,h.y));gl_FragColor=vec4(c,1.0);}"].join("\n");
  function shd(t,src){var s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
  function init(){try{gl=cv.getContext("webgl",{premultipliedAlpha:true,alpha:true,antialias:false,powerPreference:"low-power"});}catch(e){gl=null;}if(!gl)return false;
    try{pr=gl.createProgram();gl.attachShader(pr,shd(gl.VERTEX_SHADER,VS));gl.attachShader(pr,shd(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));}catch(e){W.__instrErr=String(e);return false;}
    gl.useProgram(pr);var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);var loc=gl.getAttribLocation(pr,"p");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    ["uT","uN","uF","uK","uAsp","uTur","uSel","uRX","uRY","uWind","uG1"].forEach(function(n){U[n]=gl.getUniformLocation(pr,n);});gl.uniform1f(U.uAsp,W0/H0);gl.uniform1f(U.uK,kind==="movement"?1:0);return true;}
  function size(){var d=Math.min(2,Math.max(1,W.devicePixelRatio||1))*q;var w=Math.round(W0*d),h=Math.round(H0*d);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}}
  function night(){return D.documentElement.getAttribute("data-night")==="1";}
  function still(){return D.documentElement.getAttribute("data-motion")==="minimal"||(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}
  var G1=0;
  function frame(ts){raf=0;if(!vis||!shown||!ok)return;var busy=over||Math.abs(turGoal-tur)>0.002||wind>0.01,gap=busy?24:(kind==="movement"?50:100);if(ts-last<gap){raf=requestAnimationFrame(frame);return;}
    var dt=Math.min(0.1,(ts-last)/1000||0.033);if(last){if(ts-last>gap*1.9)slowN++;else slowN=Math.max(0,slowN-1);if(slowN>12&&q>0.5){q=Math.max(0.5,q*0.8);slowN=0;size();}}last=ts;
    var t=(ts-t0)/1000,st=still();
    /* the turret turns to the chosen cartridge on a spring, as the compass's ring does */
    var acc=(turGoal-tur)*46-turV*10.4;turV+=acc*dt;tur+=turV*dt;
    /* the movement runs, faster for a moment when wound */
    wind*=Math.pow(0.35,dt);if(!st)G1+=dt*(0.18+wind*2.4);
    gx+=((over?mX:0)-gx)*Math.min(1,dt*5);gy+=((over?mY:0)-gy)*Math.min(1,dt*5);
    var sw=st?0:Math.sin(t*2*Math.PI/7);
    gl.viewport(0,0,cv.width,cv.height);gl.uniform1f(U.uT,st?2.0:t);gl.uniform1f(U.uN,night()?1:0);gl.uniform1f(U.uF,finish);gl.uniform1f(U.uTur,tur-Math.PI/2);gl.uniform1f(U.uSel,sel);
    gl.uniform1f(U.uRX,-0.34+gy*0.10+sw*0.012);gl.uniform1f(U.uRY,gx*0.14+sw*0.03);gl.uniform1f(U.uG1,G1);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    if(!st||busy)raf=requestAnimationFrame(frame);}
  function kick(){if(!raf)raf=requestAnimationFrame(frame);}
  function mount(el){host=el;cv=D.createElement("canvas");cv.className="obj-cv";host.insertBefore(cv,host.firstChild);if(W.matchMedia&&matchMedia("(pointer: coarse)").matches)q=0.7;size();ok=init();if(!ok){host.setAttribute("data-nogl","1");return;}
    function at(e){var r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*W0,y:(e.clientY-r.top)/r.height*H0};}
    host.addEventListener("pointermove",function(e){var p=at(e),dx=(p.x-W0*0.52)/200,dy=(p.y-H0*0.48)/180,on=dx*dx+dy*dy<1;over=on;mX=dx;mY=dy;kick();});
    host.addEventListener("pointerleave",function(){over=false;kick();});
    host.addEventListener("pointerdown",function(e){if(e.target.closest&&e.target.closest(".r175-seal"))return;var p=at(e),dx=(p.x-W0*0.52)/200,dy=(p.y-H0*0.48)/180;if(dx*dx+dy*dy>1)return;
      if(kind==="turret"){var a=Math.atan2(-dy,dx),k=Math.round(((Math.PI/2-a+tur-Math.PI/2)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)/(2*Math.PI/5))%5;choose(k);}else{wind=1;}try{IngSound.play("paper");}catch(x){}kick();});
    try{new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)kick();}).observe(host);}catch(e){}D.addEventListener("visibilitychange",function(){shown=!D.hidden;if(shown)kick();});kick();}
  function choose(k){sel=k;var g=Math.PI/2+k*2*Math.PI/5;while(g-turGoal>Math.PI)g-=2*Math.PI;while(g-turGoal<-Math.PI)g+=2*Math.PI;turGoal=g;if(W.onTurret)W.onTurret(k);kick();}
  return {mount:mount,kick:kick,finish:function(v){finish=v;kick();},choose:choose,wind:function(){wind=1;kick();}};}
