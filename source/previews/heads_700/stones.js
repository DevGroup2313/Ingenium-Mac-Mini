/* =============================== FOCUS: stepping stones across still water ===============================
   After her photographs: smooth river stones crossing a calm pool toward the far bank, each half in the water, wet and dark where the
   water laps it, matte where it is dry, mirrored in the water with the sky; rings spread from the stone in hand, the water swells a little,
   the far water fades into mist and soft points of light. Drawn by the graphics chip: each stone is traced as a smooth, slightly uneven
   pebble, the water's surface is shaped by its swell and by every ring, and its mirror is traced again so the stones and the light show
   in it. Done steps are the darker, violet-washed stones behind; the step in hand catches the light; the steps ahead are plain slate.
   No numerals. The sound of water is its own key (Ingenium's sounds otherwise); a stone pressed dips with a drop and a ring. */
var Focus=(function(){
  var W0=520,H0=424,host,cv,gl,pr,U={},raf=0,vis=true,shown=true,ok=false,q=1,lastDraw=0,slowN=0,t0=performance.now(),cur=1,N=5,overI=-1,
      lift=[0,0,0,0,0],dip=[0,0,0,0,0],rips=[],lastRing=-9;
  var CP=[0.12,1.12,5.7],TG=[0.32,0.0,-1.0],FOV=31*Math.PI/180;
  function sub(a,b){return [a[0]-b[0],a[1]-b[1],a[2]-b[2]];}function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
  function nrm(a){var l=Math.sqrt(dot(a,a))||1;return [a[0]/l,a[1]/l,a[2]/l];}function crs(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
  var CF=nrm(sub(TG,CP)),CR=nrm(crs(CF,[0,1,0])),CU=crs(CR,CF),TAN=Math.tan(FOV/2);
  /* the path: x, z, the stone's half length, half width, its height out of the water, its turn */
  var S=[[-0.50,1.62,0.40,0.30,0.100,0.35],[0.02,0.36,0.37,0.28,0.095,-0.25],[0.52,-0.96,0.36,0.27,0.092,0.55],[0.94,-2.34,0.35,0.26,0.090,-0.1],[1.24,-3.75,0.34,0.26,0.088,0.4]];
  var VS="attribute vec2 p;varying vec2 v;void main(){v=p*0.5+0.5;gl_Position=vec4(p,0.0,1.0);}";
  var FS=["precision highp float;varying vec2 v;",
  "uniform float uT,uN,uAsp,uTan;uniform vec3 uCP;uniform mat3 uCM;uniform vec4 uS[5];uniform vec4 uS2[5];uniform vec4 uRp[6];uniform float uCur,uOver;",
  "float h1(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}",
  "float vn(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);",
  "  return mix(mix(mix(h1(i),h1(i+vec3(1,0,0)),f.x),mix(h1(i+vec3(0,1,0)),h1(i+vec3(1,1,0)),f.x),f.y),mix(mix(h1(i+vec3(0,0,1)),h1(i+vec3(1,0,1)),f.x),mix(h1(i+vec3(0,1,1)),h1(i+vec3(1,1,1)),f.x),f.y),f.z);}",
  /* the sky over the pool: dusk violet by night, pearl by day, a soft light up to the left */
  "vec3 sky(vec3 w){float up=max(w.y,0.0);vec3 dn=mix(vec3(0.44,0.33,0.74),vec3(0.05,0.04,0.12),pow(up,0.45));vec3 dd=mix(vec3(0.80,0.75,0.95),vec3(0.995,0.99,1.0),pow(up,0.5));",
  "  vec3 c=mix(dd,dn,uN);vec3 L=normalize(vec3(-0.5,0.35,-0.8));float s=max(dot(w,L),0.0);c+=mix(vec3(1.0,0.97,0.94)*0.35,vec3(0.80,0.70,1.0)*0.55,uN)*pow(s,24.0);",
  "  c+=mix(vec3(0.20),vec3(0.20,0.14,0.36),uN)*pow(s,4.0);c+=mix(vec3(0.10,0.06,0.20),vec3(0.16,0.10,0.34),uN)*exp(-up*9.0);return c;}",
  /* each stone: a smooth pebble, an ellipsoid turned and set in the water */
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
  "  vec3 al=k<0.5?mix(vec3(0.33,0.31,0.40),vec3(0.27,0.24,0.36),uN):(k<1.5?mix(vec3(0.64,0.63,0.70),vec3(0.54,0.51,0.66),uN):mix(vec3(0.44,0.45,0.51),vec3(0.30,0.30,0.38),uN));",
  "  al*=0.80+0.40*g;al+=vec3(0.06)*step(0.82,vn(pl*42.0+id))-vec3(0.05)*step(0.84,vn(pl*31.0+id*5.0));",
  "  float wet=1.0-smoothstep(0.0,0.06,p.y);al*=1.0-0.42*wet;",
  "  vec3 L=normalize(vec3(-0.5,0.62,0.35));float di=max(dot(n,L),0.0);vec3 amb=mix(vec3(0.46,0.45,0.53),vec3(0.24,0.20,0.38),uN);",
  "  vec3 c=al*(amb+di*mix(vec3(1.0,0.98,0.96)*0.95,vec3(0.78,0.70,0.98)*0.75,uN));",
  "  vec3 r=reflect(rd,n);float fz=0.04+0.96*pow(1.0-max(dot(-rd,n),0.0),5.0);float gl=mix(0.45,0.95,wet);",
  "  c+=sky(r)*fz*gl*1.3+pow(max(dot(r,L),0.0),mix(40.0,110.0,wet))*mix(0.45,0.85,wet)*mix(vec3(1.0),vec3(0.88,0.80,1.0),uN);",
  "  if(k>0.5&&k<1.5){c+=mix(vec3(0.10,0.09,0.14),vec3(0.20,0.15,0.34),uN)*pow(1.0-max(dot(-rd,n),0.0),2.0)*1.4;}",
  "  if(abs(id-uOver)<0.5)c*=1.12;return c*refl;}",
  /* the water's surface: a slow swell, the lapping round each stone, and the rings */
  "float wh(vec2 p){float h=0.006*sin(p.x*2.1+uT*0.6)+0.005*sin(p.y*2.7-uT*0.5+p.x*0.6)+0.0035*sin((p.x+p.y)*4.3+uT*0.9);",
  "  h+=0.0016*sin(dot(p,vec2(9.0,4.0))+uT*1.6)+0.0013*sin(dot(p,vec2(-5.0,8.5))+uT*1.25)+0.0009*sin(dot(p,vec2(13.0,-6.0))+uT*2.1);",
  "  for(int i=0;i<5;i++){vec2 c=uS[i].xy;float rr=length((p-c)/vec2(uS[i].z,uS[i].w));float r=length(p-c);",
  "    h+=0.005*sin(r*34.0-uT*2.2+float(i))*exp(-max(0.0,rr-1.0)*1.6)*step(1.0,rr);}",
  "  for(int j=0;j<6;j++){vec4 R=uRp[j];float age=uT-R.z;if(age>0.0&&age<6.0){float r=length(p-R.xy);float rad=age*0.55;",
  "    h+=R.w*exp(-pow((r-rad)/0.13,2.0))*sin((r-rad)*28.0)*exp(-age*0.5)*smoothstep(0.0,0.3,age);}}return h;}",
  "vec3 tm(vec3 c){return 1.0-exp(-c*1.15);}",
  "void main(){vec2 sp=(v*2.0-1.0)*vec2(uAsp,1.0)*uTan;vec3 rd=normalize(uCM*vec3(sp,-1.0)),ro=uCP;",
  "  vec3 n,pl;float id;float ts=hitStones(ro,rd,n,pl,id);float tw=rd.y<0.0?-ro.y/rd.y:1e9;vec3 col;float a=1.0;",
  "  if(ts<tw){vec3 p=ro+rd*ts;col=shadeStone(p,n,pl,id,rd,1.0);float dist=ts;col=mix(col,mix(vec3(0.84,0.82,0.92),vec3(0.12,0.09,0.20),uN),1.0-exp(-max(0.0,dist-5.0)*0.10));}",
  "  else if(tw<1e8){vec3 p=ro+rd*tw;float e=0.012;float hx=wh(p.xz+vec2(e,0.0))-wh(p.xz-vec2(e,0.0)),hz=wh(p.xz+vec2(0.0,e))-wh(p.xz-vec2(0.0,e));",
  "    vec3 wn=normalize(vec3(-hx/(2.0*e),1.0,-hz/(2.0*e)));vec3 r=reflect(rd,wn);",
  "    vec3 n2,pl2;float id2;float t2=hitStones(p+wn*0.002,r,n2,pl2,id2);vec3 rc=t2<1e8?shadeStone(p+r*t2,n2,pl2,id2,r,0.9):sky(r);",
  "    float F=0.02+0.98*pow(1.0-max(dot(-rd,wn),0.0),5.0);vec3 deep=mix(vec3(0.56,0.55,0.70),vec3(0.03,0.025,0.07),uN);",
  "    float ao=1.0;for(int i=0;i<5;i++){float rr=length((p.xz-uS[i].xy)/vec2(uS[i].z,uS[i].w));ao*=mix(0.55,1.0,smoothstep(1.0,1.45,rr));}",
  "    col=mix(deep*ao,rc,clamp(F*2.4+0.12,0.0,1.0))*mix(1.0,ao,0.5);",
  "    vec3 L=normalize(vec3(-0.5,0.35,-0.8));col+=pow(max(dot(r,L),0.0),140.0)*mix(vec3(1.0),vec3(0.85,0.78,1.0),uN)*1.4;",
  "    float dist=tw;float fog=1.0-exp(-max(0.0,dist-3.0)*0.085);col=mix(col,mix(vec3(0.93,0.91,0.98),vec3(0.16,0.12,0.28),uN),fog);",
  "    a=1.0-smoothstep(6.5,12.5,dist);}",
  "  else{col=vec3(0.0);a=0.0;}",
  /* soft points of light far over the water */
  "  vec2 uv=v*vec2(uAsp,1.0);float bk=0.0;for(int i=0;i<7;i++){float fi=float(i);vec2 c=vec2(0.25+fi*0.17,0.72+0.08*sin(fi*2.3)+0.01*sin(uT*0.2+fi));c.x*=uAsp*0.82;",
  "    float d=length(uv-c);bk+=smoothstep(0.045+0.015*sin(fi),0.03,d)*(0.35+0.25*sin(fi*1.7));}",
  "  vec3 bc=mix(vec3(0.80,0.72,0.98),vec3(0.62,0.46,0.98),uN);float ba=bk*mix(0.10,0.22,uN)*smoothstep(0.55,0.7,v.y);",
  "  col=tm(col)*a;col=col*(1.0-ba)+bc*ba;a=max(a,ba);",
  "  vec2 pe=(v-vec2(0.52,0.42))*vec2(1.0,1.28);float ex=smoothstep(0.62,0.40,length(pe))*smoothstep(1.0,0.74,v.y);gl_FragColor=vec4(col*ex,a*ex);}"].join("\n");
  function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
  function init(){try{gl=cv.getContext("webgl",{premultipliedAlpha:true,alpha:true,antialias:false,powerPreference:"low-power"})||cv.getContext("experimental-webgl");}catch(e){gl=null;}if(!gl)return false;
    try{pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));}catch(e){W.__stonesErr=String(e);return false;}
    gl.useProgram(pr);var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    var loc=gl.getAttribLocation(pr,"p");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    ["uT","uN","uAsp","uTan","uCP","uCM","uCur","uOver"].forEach(function(n){U[n]=gl.getUniformLocation(pr,n);});U.uS=gl.getUniformLocation(pr,"uS[0]");U.uS2=gl.getUniformLocation(pr,"uS2[0]");U.uRp=gl.getUniformLocation(pr,"uRp[0]");
    gl.uniform3fv(U.uCP,new Float32Array(CP));gl.uniformMatrix3fv(U.uCM,false,new Float32Array([CR[0],CR[1],CR[2],CU[0],CU[1],CU[2],-CF[0],-CF[1],-CF[2]]));gl.uniform1f(U.uTan,TAN);gl.uniform1f(U.uAsp,W0/H0);return true;}
  function size(){var d=Math.min(2,Math.max(1,W.devicePixelRatio||1))*q;var w=Math.round(W0*d),h=Math.round(H0*d);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}}
  function proj(P){var vv=sub(P,CP),z=dot(vv,CF);var x=dot(vv,CR)/z/TAN/(W0/H0),y=dot(vv,CU)/z/TAN;return [(x+1)/2*W0,(1-(y+1)/2)*H0,z];}
  function night(){return D.documentElement.getAttribute("data-night")==="1";}
  function still(){return D.documentElement.getAttribute("data-motion")==="minimal"||(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}
  function ring(i,amp,t){rips.push([S[i][0],S[i][1],t,amp]);if(rips.length>6)rips.shift();}
  function frame(ts){raf=0;if(!vis||!shown||!ok)return;var t=(ts-t0)/1000,st=still(),gap=overI>=0?16:33;if(ts-lastDraw<gap){raf=requestAnimationFrame(frame);return;}
    if(lastDraw){if(ts-lastDraw>gap*1.9)slowN++;else slowN=Math.max(0,slowN-1);if(slowN>12&&q>0.55){q=Math.max(0.55,q*0.8);slowN=0;size();}}lastDraw=ts;
    /* the step in hand sends out a ring every seven seconds, Home's clock */
    if(!st&&t-lastRing>7){lastRing=t;ring(cur,0.013,t);}
    var a=[],b=[],r=[];for(var i=0;i<N;i++){lift[i]+=((i===overI?0.016:0)-lift[i])*0.18;dip[i]*=0.88;var bob=st?0:Math.sin(t*2*Math.PI/7+i*0.9)*0.004;
      a.push(S[i][0],S[i][1],S[i][2],S[i][3]);b.push(S[i][4]*(-0.35)+lift[i]-dip[i]+bob,S[i][4]*1.35,S[i][5],0);}
    for(var j=0;j<6;j++){var R=rips[j];if(R)r.push(R[0],R[1],R[2],R[3]);else r.push(0,0,-99,0);}
    gl.viewport(0,0,cv.width,cv.height);gl.uniform1f(U.uT,st?2.0:t);gl.uniform1f(U.uN,night()?1:0);gl.uniform1f(U.uCur,cur);gl.uniform1f(U.uOver,overI);
    gl.uniform4fv(U.uS,new Float32Array(a));gl.uniform4fv(U.uS2,new Float32Array(b));gl.uniform4fv(U.uRp,new Float32Array(r));gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    if(!st||overI>=0||dip.some(function(x){return x>0.002;}))raf=requestAnimationFrame(frame);}
  function kick(){if(!raf)raf=requestAnimationFrame(frame);}
  function hit(p){for(var i=0;i<N;i++){var c=proj([S[i][0],S[i][4]*0.5,S[i][1]]),e=proj([S[i][0]+S[i][2],S[i][4]*0.5,S[i][1]]),rw=Math.abs(e[0]-c[0])*1.05+6,rh=rw*0.42;
      var u=(p.x-c[0])/rw,vv=(p.y-c[1])/rh;if(u*u+vv*vv<1)return i;}return -1;}
  function mount(el,onStep){host=el;cv=D.createElement("canvas");cv.className="obj-cv";host.appendChild(cv);if(W.matchMedia&&matchMedia("(pointer: coarse)").matches)q=0.75;size();ok=init();if(!ok){host.setAttribute("data-nogl","1");return;}
    function at(e){var r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*W0,y:(e.clientY-r.top)/r.height*H0};}
    host.addEventListener("pointermove",function(e){var i=hit(at(e));if(i!==overI){overI=i;cv.style.cursor=i>=0?"pointer":"default";kick();}});
    host.addEventListener("pointerleave",function(){overI=-1;kick();});
    host.addEventListener("pointerdown",function(e){var i=hit(at(e));if(i<0)return;var t=(performance.now()-t0)/1000;dip[i]=0.026;ring(i,0.014,t);try{Water.drop(1,i);}catch(x){}if(onStep)onStep(i);kick();});
    try{new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)kick();else Water.hush();}).observe(host);}catch(e){}
    D.addEventListener("visibilitychange",function(){shown=!D.hidden;if(shown)kick();else Water.hush();});kick();}
  return {mount:mount,theme:kick,kick:kick,setCur:function(i){cur=i;kick();},cur:function(){return cur;}};})();

/* the sound of the water, made here so nothing is fetched. A stream: many small bubbles, as water makes running over stones, over a
   soft, low body of water, in a little room's echo. Soft rain: single drops on leaves and water, a few rounder drops, a faint wash.
   Each is made once, as a seamless loop of a quarter of a minute (an offline rendering), and then only played: it costs nearly nothing.
   A stone pressed answers with a drop. Quiet unless asked for, and hushed when Focus is out of view. */
var Water=(function(){var ac=null,mst=null,mode="off",src={},buf={},busy={};
  function ctx(){var C=W.AudioContext||W.webkitAudioContext;if(!C)return null;if(!ac){ac=new C();mst=ac.createGain();mst.gain.value=0.0001;var cmp=ac.createDynamicsCompressor();cmp.threshold.value=-20;cmp.ratio.value=3;mst.connect(cmp);cmp.connect(ac.destination);}
    if(ac.state!=="running"){try{ac.resume();}catch(e){}}return ac;}
  function OAC(len,sr){var O=W.OfflineAudioContext||W.webkitOfflineAudioContext;try{return O?new O(2,len,sr):null;}catch(e){return null;}}
  function noise(c,sec,pink){var n=Math.floor(c.sampleRate*sec),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0),l=0;for(var i=0;i<n;i++){var w=Math.random()*2-1;if(pink){l=0.985*l+0.015*w;d[i]=l*7;}else d[i]=w;}return b;}
  function room(c,sec,decay){var n=Math.floor(c.sampleRate*sec),b=c.createBuffer(2,n,c.sampleRate);for(var ch=0;ch<2;ch++){var d=b.getChannelData(ch);for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,decay)*0.6;}return b;}
  function bubble(c,out,t,f0,dur,amp,pan,rise){var o=c.createOscillator(),g=c.createGain();o.type="sine";o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f0*rise,t+dur);
    g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(amp,t+0.004);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);o.connect(g);
    if(c.createStereoPanner){var p=c.createStereoPanner();p.pan.value=pan;g.connect(p);p.connect(out);}else g.connect(out);o.start(t);o.stop(t+dur+0.02);}
  function bus(c,wetv,rsec,rdec){var out=c.createGain(),rv=c.createConvolver(),wet=c.createGain();rv.buffer=room(c,rsec,rdec);wet.gain.value=wetv;out.connect(c.destination);out.connect(rv);rv.connect(wet);wet.connect(c.destination);return out;}
  function stream(c,sec){var out=bus(c,0.30,2.0,3.4);
    var nb=c.createBufferSource();nb.buffer=noise(c,sec,true);var lp=c.createBiquadFilter();lp.type="lowpass";lp.frequency.value=700;var hp=c.createBiquadFilter();hp.type="highpass";hp.frequency.value=110;var g=c.createGain();g.gain.value=0.030;
    nb.connect(lp);lp.connect(hp);hp.connect(g);g.connect(out);nb.start(0);
    var t=0.02;while(t<sec-0.2){t+=-Math.log(1-Math.random())/30;var big=Math.random()<0.2,f0=big?(200+Math.random()*240):(360*Math.pow(2,Math.random()*1.7)),dur=big?(0.08+Math.random()*0.08):(0.03+Math.random()*0.05);
      bubble(c,out,t,f0,dur,(big?0.050:0.024)*(0.45+Math.random()*0.75),Math.random()*1.4-0.7,1.10+Math.random()*0.45);}}
  function rain(c,sec){var out=bus(c,0.36,2.4,2.8);
    var nb=c.createBufferSource();nb.buffer=noise(c,sec,true);var bp=c.createBiquadFilter();bp.type="bandpass";bp.frequency.value=1400;bp.Q.value=0.4;var g=c.createGain();g.gain.value=0.022;nb.connect(bp);bp.connect(g);g.connect(out);nb.start(0);
    var tick=noise(c,0.03,false),t=0.01;while(t<sec-0.1){t+=-Math.log(1-Math.random())/48;var s=c.createBufferSource();s.buffer=tick;var f=c.createBiquadFilter();f.type="bandpass";f.frequency.value=1500+Math.random()*3800;f.Q.value=1.6+Math.random()*2.4;
      var e=c.createGain(),a=0.010+Math.random()*0.026;e.gain.setValueAtTime(0.0001,t);e.gain.exponentialRampToValueAtTime(a,t+0.002);e.gain.exponentialRampToValueAtTime(0.0001,t+0.014+Math.random()*0.022);s.connect(f);f.connect(e);
      if(c.createStereoPanner){var p=c.createStereoPanner();p.pan.value=Math.random()*1.6-0.8;e.connect(p);p.connect(out);}else e.connect(out);s.start(t);s.stop(t+0.04);
      if(Math.random()<0.07)bubble(c,out,t+0.004,700+Math.random()*900,0.05+Math.random()*0.05,0.016*(0.5+Math.random()),Math.random()*1.2-0.6,1.35);}}
  function make(kind,cb){if(buf[kind])return cb(buf[kind]);if(busy[kind]){busy[kind].push(cb);return;}var c0=ctx();if(!c0)return;busy[kind]=[cb];var sr=c0.sampleRate||44100,sec=kind==="stream"?17:14,oc=OAC(Math.floor(sr*sec),sr);if(!oc){busy[kind]=null;return;}
    (kind==="stream"?stream:rain)(oc,sec);
    var done=function(b){var f=Math.floor(sr*0.6);for(var ch=0;ch<2;ch++){var d=b.getChannelData(ch);for(var k=0;k<f;k++){var w=k/f;d[k]=d[k]*w+d[b.length-f+k]*(1-w);}}buf[kind]=b;var q=busy[kind];busy[kind]=null;q.forEach(function(fn){fn(b);});};
    try{var pr=oc.startRendering();if(pr&&pr.then)pr.then(done);else oc.oncomplete=function(e){done(e.renderedBuffer);};}catch(e){busy[kind]=null;}}
  function fade(k){var x=src[k];if(!x||!ac)return;delete src[k];x.g.gain.setTargetAtTime(0.0001,ac.currentTime,0.5);setTimeout(function(){try{x.s.stop();}catch(e){}},2600);}
  function play(kind){var c=ctx();if(!c)return;mode=kind;Object.keys(src).forEach(function(k){if(k!==kind)fade(k);});mst.gain.cancelScheduledValues(c.currentTime);mst.gain.setTargetAtTime(0.9,c.currentTime,0.6);
    make(kind,function(b){if(mode!==kind||src[kind])return;var s=c.createBufferSource();s.buffer=b;s.loop=true;s.loopStart=0.6;s.loopEnd=b.duration;var g=c.createGain();g.gain.value=0.0001;s.connect(g);g.connect(mst);s.start();g.gain.setTargetAtTime(1,c.currentTime,0.9);src[kind]={s:s,g:g};});}
  function stop(){mode="off";Object.keys(src).forEach(fade);}
  function drop(strength,i){var c=ctx();if(!c)return;var t=c.currentTime+0.01,out=c.createGain();out.gain.value=1;out.connect(mode!=="off"?mst:c.destination);
    bubble(c,out,t,290+Math.random()*110,0.12,0.10*strength,(i==null?0:(i-2)*0.25),1.85);bubble(c,out,t+0.05,850+Math.random()*300,0.05,0.035*strength,(i==null?0:(i-2)*0.25),1.4);
    setTimeout(function(){try{out.disconnect();}catch(e){}},900);}
  return {start:function(k){play(k||"stream");},stop:stop,hush:function(){if(mode!=="off"){W.__waterWas=mode;stop();}},on:function(){return mode!=="off";},mode:function(){return mode;},drop:drop};})();
