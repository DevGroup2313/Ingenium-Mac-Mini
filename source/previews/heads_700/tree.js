/* =============================== FABRICA: the tree of your versions, in the compass's metal and glass ===============================
   Her tree, as modules/r294.js lays it out (the same trunk, beads, arches, branches, collars and plinth, the same turn of once in 52
   seconds), drawn again in the light that paints Vocatio's compass: the trunk and every branch polished silver, shaded across each tube
   as a turned rod is; each version a bead of violet glass with its window, its caustic glow and a pearl rim (an idea brought in, pearl
   glass; an idea still open, lighter violet; the newest, larger, with Ingenium's star inlaid); each release a silver collar with its
   name; the plinth turned silver with a violet enamel band, an engraved scale and the app's name. Beads, foot and plinth are painted
   once, pixel by pixel, and reused, so a frame only places them: it costs no more than the tree it replaces. */
var Tree=(function(){
  var host,cv,g,raf=0,vis=true,shown=true,ANG=0.6,SPIN=1,TARGET=1,DRAG=null,HOVER=null,BEADS=[],LAST=0,TAU=Math.PI*2,tipEl=null,onTip=null;
  var CX=230,BASEY=368,PITCH=0.3,FOC=820,H=292;
  function proj(p,ang){var ca=Math.cos(ang),sa=Math.sin(ang),x=p[0]*ca-p[2]*sa,z=p[0]*sa+p[2]*ca,y=p[1];
    var cp=Math.cos(PITCH),sp=Math.sin(PITCH),y2=y*cp-z*sp,z2=y*sp+z*cp,k=FOC/(FOC+z2);return {x:CX+x*k,y:BASEY-y2*k,z:z,k:k};}
  function bez(a,b,c,d,t){var u=1-t;return [0,1,2].map(function(i){return u*u*u*a[i]+3*u*u*t*b[i]+3*u*t*t*c[i]+t*t*t*d[i];});}
  function hOf(i,n){var span=Math.min(H-34,(n-1)*36);return 34+(n<=1?0:i*span/(n-1));}
  /* an invented app's story: seven versions on main, an idea brought in, an idea still open, two releases, one change not kept yet */
  var TREE={name:"Quill Notes",total:12,waiting:true,
    trunk:[{title:"The first page"},{title:"Notes kept by date"},{title:"Search"},{title:"Tags"},{title:"Brought in: export to Word"},{title:"Notes sorted by date"},{title:"Night colours"}],
    arches:[{at:4,from:1,beads:[{title:"Export to Word"},{title:"Tables in the export"}]}],
    branches:[{name:"reminders",from:3,beads:[{title:"Reminders: a date on a note"},{title:"Reminders: a gentle bell"},{title:"Reminders: snooze"}]}],
    tags:[{name:"v1.0",at:2},{name:"v1.1",at:5}]};
  function shape(T){var n=T.trunk.length,parts={tubes:[],beads:[],collars:[]};
    var tr=[];for(var i=0;i<n;i++)tr.push([0,hOf(i,n),0]);parts.tubes.push({pts:[[0,0,0]].concat(tr),w:17,kind:"trunk"});
    T.trunk.forEach(function(c,i){parts.beads.push({p:tr[i],r:i===n-1?23:12,c:c,head:i===n-1,kind:"main"});});
    T.tags.forEach(function(t){parts.collars.push({h:hOf(t.at,n),name:t.name});});
    var k=0,ALL=T.arches.length+T.branches.length,az=function(){var a=-0.5+k*(TAU/Math.max(2,ALL));k++;return a;};
    T.arches.forEach(function(a){var f=a.from<0?12:hOf(a.from,n),m=hOf(a.at,n),phi=az(),R=92+Math.min(52,(m-f)*0.45),
        at=function(t){var w2=Math.sin(Math.PI*t);return [R*w2*Math.cos(phi),f+(m-f)*t,R*w2*Math.sin(phi)];},pts=[];for(var s=0;s<=32;s++)pts.push(at(s/32));
      parts.tubes.push({pts:pts,w:9.5,kind:"arch"});a.beads.forEach(function(c,j){parts.beads.push({p:at((j+1)/(a.beads.length+1)),r:11,c:c,kind:"arch"});});});
    T.branches.forEach(function(b){var f=b.from<0?20:hOf(b.from,n),phi=az(),len=Math.max(110,Math.min(H+40-f,100+b.beads.length*24)),R=92+b.beads.length*12,
        p0=[0,f,0],p1=[R*0.12*Math.cos(phi),f+len*0.42,R*0.12*Math.sin(phi)],p2=[R*0.95*Math.cos(phi),f+len*0.5,R*0.95*Math.sin(phi)],p3=[R*Math.cos(phi),f+len,R*Math.sin(phi)],pts=[];for(var s=0;s<=24;s++)pts.push(bez(p0,p1,p2,p3,s/24));
      parts.tubes.push({pts:pts,w:10,kind:"branch",name:b.name});b.beads.forEach(function(c,j){parts.beads.push({p:bez(p0,p1,p2,p3,0.25+0.75*(j+1)/b.beads.length),r:j===b.beads.length-1?14:11,c:c,kind:"branch",idea:b.name});});});
    return parts;}
  function night(){return D.documentElement.getAttribute("data-night")==="1";}
  function still(){return D.documentElement.getAttribute("data-motion")==="minimal"||(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}
  function dpr(){return Math.min(2,Math.max(1,W.devicePixelRatio||1));}
  function hex(c){var h=function(v){v=Math.round(Math.max(0,Math.min(1,v))*255);return (v<16?"0":"")+v.toString(16);};return "#"+h(c[0])+h(c[1])+h(c[2]);}
  /* ---------- silver, shaded across a rod: the colours across its width for a rod lying along a screen direction ---------- */
  var RAMP={};function ramp(ang,nt){var b=Math.round(((ang%Math.PI)+Math.PI)%Math.PI/Math.PI*48)%48,key=(nt?"n":"d")+b;if(RAMP[key])return RAMP[key];
    var a=b/48*Math.PI,nx=-Math.sin(a),ny=Math.cos(a),o=[0,0,0],out=[];for(var i=0;i<=8;i++){var th=(i/8*2-1)*1.36;vcSilver(Math.sin(th)*nx,Math.sin(th)*ny,Math.cos(th),nt,o);
      var e=1-0.32*Math.pow(Math.abs(i/8*2-1),3),lf=nt?0.07:0;out.push(hex([o[0]*e+lf,o[1]*e+lf,o[2]*e+lf*1.3]));}return RAMP[key]=out;}
  function tube(g,q,w,P,kind){if(q.length<2)return;var k=0;q.forEach(function(p){k+=p.k;});k/=q.length;var ww=w*k,nt=night();
    g.lineCap="round";g.lineJoin="round";g.beginPath();g.moveTo(q[0].x,q[0].y);for(var i=1;i<q.length;i++)g.lineTo(q[i].x,q[i].y);
    g.strokeStyle=nt?"rgba(4,2,12,.55)":"rgba(46,23,100,.30)";g.lineWidth=ww+1.4;g.stroke();
    /* each piece of the rod, shaded across its width; the joints filled with the piece's own colours */
    for(var j=0;j<q.length-1;j++){var A=q[j],B=q[j+1],dx=B.x-A.x,dy=B.y-A.y,L=Math.sqrt(dx*dx+dy*dy);if(L<0.01)continue;var nx=-dy/L,ny=dx/L,hw=ww/2;
      var r=ramp(Math.atan2(dy,dx),nt),gr=g.createLinearGradient(A.x-nx*hw,A.y-ny*hw,A.x+nx*hw,A.y+ny*hw);for(var s=0;s<r.length;s++)gr.addColorStop(s/(r.length-1),r[s]);
      g.fillStyle=gr;g.beginPath();g.moveTo(A.x-nx*hw,A.y-ny*hw);g.lineTo(B.x-nx*hw,B.y-ny*hw);g.lineTo(B.x+nx*hw,B.y+ny*hw);g.lineTo(A.x+nx*hw,A.y+ny*hw);g.closePath();g.fill();
      if(j<q.length-2){g.beginPath();g.arc(B.x,B.y,hw*0.98,0,TAU);g.fill();}}
    if(kind!=="trunk"){var e=q[q.length-1];var cap=g.createRadialGradient(e.x-ww*0.18,e.y-ww*0.2,0,e.x,e.y,ww*0.55);cap.addColorStop(0,nt?"#e8e2f6":"#ffffff");cap.addColorStop(1,nt?"#5a5470":"#a8a2bd");g.fillStyle=cap;g.beginPath();g.arc(e.x,e.y,ww*0.5,0,TAU);g.fill();}}
  /* ---------- glass beads, painted once for each size and kind ---------- */
  var SPR={};function glass(kind,nt){if(kind==="arch")return nt?[.80,.76,.90]:[.93,.91,.97];if(kind==="branch")return nt?[.62,.48,.92]:[.70,.56,.95];if(kind==="wait")return nt?[.70,.62,.90]:[.80,.74,.95];return nt?[.44,.27,.80]:[.47,.29,.82];}
  function sprite(R,kind,nt,head){var key=kind+(head?"h":"")+(nt?"n":"d")+Math.round(R*2);if(SPR[key])return SPR[key];var d=dpr(),pad=3,S=Math.ceil((R+pad)*2*d),c=D.createElement("canvas");c.width=c.height=S;
    var x=c.getContext("2d"),im=x.createImageData(S,S),px=im.data,base=glass(kind,nt),o=[0,0,0],sv=[0,0,0];
    for(var j=0;j<S;j++)for(var i=0;i<S;i++){var A=0,r0=0,g0=0,b0=0;for(var sj=0;sj<2;sj++)for(var si=0;si<2;si++){var u=((i+(si+.5)/2)/d-pad-R)/R,v=((j+(sj+.5)/2)/d-pad-R)/R,rr=u*u+v*v;if(rr>1)continue;
        var nz=Math.sqrt(1-rr),nx=u,ny=v;
        /* the glass: its own colour lit softly, the room in its skin (more at the rim), the window, and the light gathered inside opposite the light */
        var dl=Math.max(0,nx*VCL[0]+ny*VCL[1]+nz*VCL[2]),body=0.55+0.55*dl;vcSilver(nx,ny,nz,nt,sv);var fr=0.06+0.7*Math.pow(1-nz,3);
        var cu=nx-0.34,cv2=ny-0.40,caus=Math.exp(-(cu*cu+cv2*cv2)/0.10)*0.55+Math.exp(-(cu*cu+cv2*cv2)/0.02)*0.35;
        var cr=base[0]*body*(1-fr)+sv[0]*fr+caus*(0.55+0.45*base[0]),cg=base[1]*body*(1-fr)+sv[1]*fr+caus*(0.45+0.5*base[1]),cb=base[2]*body*(1-fr)+sv[2]*fr+caus*(0.6+0.4*base[2]);
        var wdw=vcWin(2*nz*nx,2*nz*ny,2*nz*nz-1);cr+=wdw*0.9;cg+=wdw*0.9;cb+=wdw*0.95;
        var rim=1-0.35*Math.pow(1-nz,2.2);r0+=vcTone(cr*rim);g0+=vcTone(cg*rim);b0+=vcTone(cb*rim);A++;}
      if(!A)continue;var p=(j*S+i)*4;px[p]=Math.round(r0/A*255);px[p+1]=Math.round(g0/A*255);px[p+2]=Math.round(b0/A*255);px[p+3]=Math.round(A/4*255);}
    x.putImageData(im,0,0);
    /* a pearl rim along the lit side, and Ingenium's star inlaid in the newest */
    x.setTransform(d,0,0,d,0,0);x.strokeStyle=nt?"rgba(236,228,255,.55)":"rgba(255,255,255,.85)";x.lineWidth=Math.max(0.6,R*0.07);x.beginPath();x.arc(pad+R,pad+R,R*0.93,Math.PI*1.02,Math.PI*1.7);x.stroke();
    if(head){var s=R*0.6,cx=pad+R,cy=pad+R;x.fillStyle=nt?"#f4eeff":"#ffffff";x.shadowColor="rgba(30,10,70,.45)";x.shadowBlur=R*0.12;x.shadowOffsetY=R*0.04;x.beginPath();
      x.moveTo(cx,cy-s);x.quadraticCurveTo(cx+s*.16,cy-s*.16,cx+s,cy);x.quadraticCurveTo(cx+s*.16,cy+s*.16,cx,cy+s);x.quadraticCurveTo(cx-s*.16,cy+s*.16,cx-s,cy);x.quadraticCurveTo(cx-s*.16,cy-s*.16,cx,cy-s);x.fill();
      x.shadowColor="transparent";x.fillStyle=nt?"#8e6be0":"#7a50c6";x.beginPath();x.arc(cx,cy,s*0.16,0,TAU);x.fill();}
    c.__R=R+pad;return SPR[key]=c;}
  function bead(g,q,r,o,kind,head){var R=r*q.k*(o.grow||1),x=q.x,y=q.y-(o.lift||0),nt=night();
    g.save();g.globalAlpha=o.far?0.5:0.4;g.fillStyle=nt?"rgba(0,0,0,.6)":"rgba(46,23,100,.30)";g.beginPath();g.ellipse(x+R*0.2,y+R*0.5,R*0.9,R*0.45,0,0,TAU);g.fill();g.restore();
    var sp=sprite(Math.max(6,Math.round(r*(o.grow||1)*2)/2),kind,nt,head),s=(sp.__R/(r*(o.grow||1)))*R;if(o.far)g.globalAlpha=0.86;if(o.alpha!=null)g.globalAlpha=o.alpha;
    g.drawImage(sp,x-s,y-s,s*2,s*2);g.globalAlpha=1;if(kind!=="wait")setting(g,x,y,R);}
  /* ---------- a release's collar: a silver ring round the trunk ---------- */
  function collar(g,cx,cy,rx,ry,from,to,w){var nt=night();g.lineCap="butt";
    [[w+2,nt?"rgba(4,2,12,.6)":"rgba(46,23,100,.35)",0],[w,nt?"#4e4766":"#9a93b3",0.6],[w*0.62,nt?"#9d96b5":"#e6e2ef",-0.5],[Math.max(0.8,w*0.22),nt?"#f2eefb":"#ffffff",-w*0.28]].forEach(function(L){
      g.strokeStyle=L[1];g.lineWidth=L[0];g.beginPath();g.ellipse(cx,cy+L[2],rx,ry,0,from,to);g.stroke();});}
  /* ---------- the plinth and the foot, painted once ---------- */
  var PL={};function plinthImg(nt){var key=nt?"n":"d";if(PL[key])return PL[key];var d=dpr(),Wd=460,Hd=460,c=D.createElement("canvas");c.width=Wd*d;c.height=Hd*d;
    var x=c.getContext("2d"),im=x.createImageData(Wd*d,Hd*d),px=im.data,o=[0,0,0],cx=CX,cy=BASEY+6,rx=136,ry=rx*Math.sin(PITCH)+4,side=22;
    for(var j=0;j<Hd*d;j++)for(var i=0;i<Wd*d;i++){var X=(i+.5)/d,Y=(j+.5)/d,u=(X-cx)/rx,v=(Y-cy)/ry,r=Math.sqrt(u*u+v*v),hit=false;
        if(r<=1){var ph=Math.atan2(v,u),tl;var rr=r;
          if(rr>0.955)tl=-0.85*vcS(.955,1,rr);else if(rr>0.80&&rr<0.92)tl=0;else if(rr<0.32)tl=0.10*(rr/0.32);else tl=Math.sin(rr*rx*1.1)*0.035+Math.sin(rr*rx*0.33)*0.03;
          var nxw=Math.cos(ph)*-tl,nzw=Math.sin(ph)*-tl,cp=Math.cos(PITCH),sp=Math.sin(PITCH);var sx=nxw,sy=-(1*cp-nzw*sp),sz=1*sp+nzw*cp;
          if(rr>0.80&&rr<0.92){/* the violet enamel band, with its engraved scale */var base=nt?[.40,.27,.70]:[.45,.30,.78];vcEnamel(sx*0.4,sy*0.4+0.2,sz,base,nt,o);
            var q=(ph+Math.PI)/TAU*72,qi=Math.round(q),dq=Math.abs(q-qi)*TAU/72*rr*rx;if(dq<0.55&&rr>(qi%9===0?0.815:0.84)&&rr<0.905){o[0]=o[0]*0.5+0.42;o[1]=o[1]*0.5+0.4;o[2]=o[2]*0.5+0.46;}
            if(Math.abs(rr-0.80)<0.006||Math.abs(rr-0.92)<0.006){o[0]*=0.7;o[1]*=0.7;o[2]*=0.75;}}
          else{vcSilver(sx,sy,sz,nt,o);if(rr<0.32){var b=1+0.05*(1-rr/0.32);o[0]*=b;o[1]*=b;o[2]*=b;}}
          var sc=Math.exp(-(u*u+v*v*0.6)/0.05);o[0]*=1-0.35*sc;o[1]*=1-0.35*sc;o[2]*=1-0.32*sc;hit=true;}
        else{var uu=u;if(Math.abs(uu)<=1){var yTop=cy+Math.sqrt(1-uu*uu)*ry;if(Y>yTop&&Y<=yTop+side){var ph2=Math.asin(uu),hh=(Y-yTop)/side;
            var a2=ph2;if(hh<0.34){var q2=ph2*rx/2.4;q2-=Math.floor(q2);a2=ph2+(2*q2-1)*0.22;}vcSilver(Math.sin(a2),0.12,Math.cos(a2),nt,o);
            var dk=hh<0.34?0.86+0.14*Math.sin(Math.PI*((ph2*rx/2.4)%1)):1;var ft=vcS(0.75,1,hh);o[0]*=dk*(1-0.35*ft);o[1]*=dk*(1-0.35*ft);o[2]*=dk*(1-0.3*ft);hit=true;}}}
        if(!hit)continue;var p=(j*Wd*d+i)*4;px[p]=Math.round(o[0]*255);px[p+1]=Math.round(o[1]*255);px[p+2]=Math.round(o[2]*255);px[p+3]=255;}
    x.putImageData(im,0,0);return PL[key]=c;}
  var FT={};function footImg(nt){var key=nt?"n":"d";if(FT[key])return FT[key];var d=dpr(),S=80,c=D.createElement("canvas");c.width=c.height=S*d;var x=c.getContext("2d"),im=x.createImageData(S*d,S*d),px=im.data,o=[0,0,0];
    var rx=30,ry=rx*Math.sin(PITCH)+2,h=13,cx=40,cy=52;
    for(var j=0;j<S*d;j++)for(var i=0;i<S*d;i++){var X=(i+.5)/d,Y=(j+.5)/d,u=(X-cx)/(rx*0.7),v=(Y-(cy-h))/(ry*0.7),hit=false;
      if(u*u+v*v<=1){var r=Math.sqrt(u*u+v*v),ph=Math.atan2(v,u),tl=0.12+0.55*r*r;vcSilver(Math.cos(ph)*tl,Math.sin(ph)*tl*0.5-0.35,0.9,nt,o);hit=true;}
      else{var t=(Y-(cy-h))/h;if(t>=0&&t<=1){var w=rx*(0.7+0.3*t),uu=(X-cx)/w;if(Math.abs(uu)<=1){var a=Math.asin(uu);vcSilver(Math.sin(a),-0.12,Math.cos(a),nt,o);var rb=0.92+0.08*Math.sin(t*Math.PI*3);o[0]*=rb;o[1]*=rb;o[2]*=rb;hit=true;}}
        if(!hit){var u2=(X-cx)/rx,v2=(Y-cy)/ry;if(u2*u2+v2*v2<=1&&Y>cy){var a3=Math.asin(Math.max(-1,Math.min(1,u2)));vcSilver(Math.sin(a3),0.05,Math.cos(a3),nt,o);o[0]*=0.86;o[1]*=0.86;o[2]*=0.88;hit=true;}}}
      if(!hit)continue;var p=(j*S*d+i)*4;px[p]=Math.round(o[0]*255);px[p+1]=Math.round(o[1]*255);px[p+2]=Math.round(o[2]*255);px[p+3]=255;}
    x.putImageData(im,0,0);return FT[key]=c;}
  /* ---------- diamonds: Build's own round brilliant, rendered small by the graphics chip in eight steps of its turn, once ---------- */
  var GEM={},GS=48;
  function gemFrames(nt){var key=nt?"n":"d";if(GEM[key]!==undefined)return GEM[key];GEM[key]=null;var d=dpr(),N=Math.round(GS*d),c=D.createElement("canvas");c.width=c.height=N;var gl=null;
    try{gl=c.getContext("webgl",{premultipliedAlpha:true,alpha:true,antialias:false,preserveDrawingBuffer:true});}catch(e){}if(!gl)return null;
    var D2R=Math.PI/180,R0=1,G0=0.012,HT=0.31,AT=0.53;function grp(az,sl,dn,px,py,pz){var a=az*D2R,s2=sl*D2R,n=[Math.sin(s2)*Math.cos(a),(dn?-1:1)*Math.cos(s2),Math.sin(s2)*Math.sin(a)];return [n[0],n[1],n[2],n[0]*px+n[1]*py+n[2]*pz];}
    function onR(az,sl,dn,r,y){var a=az*D2R;return grp(az,sl,dn,r*Math.cos(a),y,r*Math.sin(a));}
    var GR=[onR(0,34.5,false,R0,G0),onR(22.5,21.5,false,AT,HT),onR(11.25,41,false,R0,G0),onR(33.75,41,false,R0,G0),[1,0,0,R0],[Math.cos(22.5*D2R),0,Math.sin(22.5*D2R),R0],onR(0,40.75,true,R0,-G0),onR(11.25,42,true,R0,-G0),onR(33.75,42,true,R0,-G0)];
    var VS="attribute vec2 p;varying vec2 v;void main(){v=p*0.5+0.5;gl_Position=vec4(p,0.0,1.0);}";
    var FS=["precision highp float;varying vec2 v;uniform float uN,uY;uniform vec4 uG[9];",
      "float sbox(vec3 w,vec3 ax,vec2 hs,float sf){float d=dot(w,ax);if(d<=0.05)return 0.0;vec3 u=normalize(cross(vec3(0.0,1.0,0.0),ax)+vec3(0.0,0.0,1e-4));vec3 vv=cross(ax,u);vec2 p=vec2(dot(w,u),dot(w,vv))/d;vec2 q=1.0-smoothstep(hs*(1.0-sf),hs,abs(p));return q.x*q.y;}",
      "vec3 env(vec3 w){float up=w.y;vec3 dc=mix(vec3(0.88,0.87,0.94),vec3(1.06,1.05,1.09),smoothstep(-0.25,0.85,up));vec3 nc=mix(vec3(0.05,0.04,0.09),vec3(0.20,0.16,0.33),smoothstep(-0.25,0.85,up));vec3 c=mix(dc,nc,uN);",
      "  c*=mix(1.0,mix(0.74,0.4,uN),smoothstep(0.02,-0.45,up));float dk=sbox(w,normalize(vec3(0.92,0.06,-0.30)),vec2(0.16,0.55),0.55)+sbox(w,normalize(vec3(-0.90,0.02,-0.38)),vec2(0.14,0.5),0.55);c=mix(c,vec3(0.20,0.16,0.31),clamp(dk,0.0,1.0)*(1.0-uN)*0.86);",
      "  c+=vec3(0.55,0.32,0.95)*exp(-pow((up-0.24)/0.14,2.0))*smoothstep(-0.1,0.55,-w.z)*mix(0.25,0.8,uN);",
      "  c+=sbox(w,normalize(vec3(-0.55,0.66,0.52)),vec2(0.20,0.32),0.22)*mix(7.0,8.0,uN)+sbox(w,normalize(vec3(0.05,1.0,0.12)),vec2(0.32,0.32),0.3)*3.0+sbox(w,normalize(vec3(0.78,0.30,0.55)),vec2(0.07,0.40),0.3)*4.0;return c;}",
      "void cvx(vec3 ro,vec3 rd,out float tn,out float tf,out vec3 nn,out vec3 nf){tn=-1e9;tf=1e9;nn=vec3(0.0,1.0,0.0);nf=nn;",
      "  {float dn=rd.y;float ds=0.31-ro.y;if(abs(dn)>1e-6){float t=ds/dn;if(dn<0.0){if(t>tn){tn=t;nn=vec3(0.0,1.0,0.0);}}else if(t<tf){tf=t;nf=vec3(0.0,1.0,0.0);}}else if(ds<0.0)tn=1e9;}",
      "  for(int g=0;g<9;g++){vec3 n=uG[g].xyz;float d=uG[g].w;for(int k=0;k<8;k++){float dn=dot(n,rd);float ds=d-dot(n,ro);if(abs(dn)>1e-6){float t=ds/dn;if(dn<0.0){if(t>tn){tn=t;nn=n;}}else if(t<tf){tf=t;nf=n;}}else if(ds<0.0)tn=1e9;n=vec3(0.70710678*(n.x-n.z),n.y,0.70710678*(n.x+n.z));}}}",
      "float fr(float c){return 0.17+0.83*pow(1.0-clamp(c,0.0,1.0),5.0);}",
      "void main(){float cy=cos(uY),sy=sin(uY);vec3 cp=vec3(0.0,2.45,5.48);vec3 f=normalize(-cp),r=normalize(cross(f,vec3(0.0,1.0,0.0))),u=cross(r,f);vec2 sp=(v*2.0-1.0)*0.185;vec3 rd=normalize(f+r*sp.x+u*sp.y);",
      "  vec3 ro=vec3(cy*cp.x-sy*cp.z,cp.y,sy*cp.x+cy*cp.z);rd=vec3(cy*rd.x-sy*rd.z,rd.y,sy*rd.x+cy*rd.z);",
      "  float tn,tf;vec3 nn,nf;cvx(ro,rd,tn,tf,nn,nf);if(!(tn<tf&&tn>0.0)){gl_FragColor=vec4(0.0);return;}",
      "  vec3 p=ro+rd*tn;float F=fr(-dot(rd,nn));vec3 col=F*env(reflect(rd,nn));vec3 d=refract(rd,nn,1.0/2.42);vec3 thr=vec3(1.0-F);vec3 io=vec3(2.37,2.42,2.48);",
      "  for(int k=0;k<5;k++){cvx(p+d*0.0005,d,tn,tf,nn,nf);p=p+d*tf;vec3 m=nf;vec3 oc=vec3(0.0);",
      "    vec3 t1=refract(d,-m,io.r);if(dot(t1,t1)>0.0)oc.r=(1.0-fr(dot(t1,m)))*env(t1).r;vec3 t2=refract(d,-m,io.g);if(dot(t2,t2)>0.0)oc.g=(1.0-fr(dot(t2,m)))*env(t2).g;",
      "    vec3 t3=refract(d,-m,io.b);if(dot(t3,t3)>0.0)oc.b=(1.0-fr(dot(t3,m)))*env(t3).b;col+=thr*oc;vec3 tm=refract(d,-m,2.42);thr*=(dot(tm,tm)>0.0?fr(dot(tm,m)):1.0);d=reflect(d,-m);}",
      "  col+=thr*env(d)*0.5;col=1.0-exp(-col*mix(1.34,1.06,uN));gl_FragColor=vec4(col,1.0);}"].join("\n");
    function shd(t,src){var x=gl.createShader(t);gl.shaderSource(x,src);gl.compileShader(x);if(!gl.getShaderParameter(x,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(x));return x;}
    try{var pr=gl.createProgram();gl.attachShader(pr,shd(gl.VERTEX_SHADER,VS));gl.attachShader(pr,shd(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));}catch(e){W.__gemErr=String(e);return null;}
    gl.useProgram(pr);var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);var loc=gl.getAttribLocation(pr,"p");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    var g4=[];GR.forEach(function(x){g4.push(x[0],x[1],x[2],x[3]);});gl.uniform4fv(gl.getUniformLocation(pr,"uG[0]"),new Float32Array(g4));gl.uniform1f(gl.getUniformLocation(pr,"uN"),nt?1:0);var uY=gl.getUniformLocation(pr,"uY");
    var out=[];gl.viewport(0,0,N,N);for(var f=0;f<8;f++){gl.uniform1f(uY,f/8*Math.PI/4);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);var cc=D.createElement("canvas");cc.width=cc.height=N;cc.getContext("2d").drawImage(c,0,0);out.push(cc);}
    try{var ext=gl.getExtension("WEBGL_lose_context");if(ext)ext.loseContext();}catch(e){}return GEM[key]=out;}
  var GEMS=[];function gemAt(g,x,y,size,phase){var fr=gemFrames(night());if(!fr)return;var k=Math.floor(((ANG*2.2+phase)%(Math.PI/4)+Math.PI/4)%(Math.PI/4)/(Math.PI/32))%8;
    g.drawImage(fr[k],x-size,y-size*0.95,size*2,size*2);GEMS.push([x,y,size,phase]);}
  function twinkle(g,t){var nt=night();GEMS.forEach(function(G){var a=Math.pow(0.5+0.5*Math.sin(t*1.4+G[3]*7.3),9);if(a<0.08)return;var x=G[0],y=G[1]-G[2]*0.25,r=G[2]*(1.2+1.4*a);
      g.save();g.globalAlpha=a*(nt?0.9:0.75);g.globalCompositeOperation=nt?"lighter":"source-over";var gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(0.25,nt?"rgba(214,196,255,.7)":"rgba(255,255,255,.8)");gr.addColorStop(1,"rgba(150,110,240,0)");
      g.fillStyle=gr;var k=r*0.16;g.beginPath();g.moveTo(x,y-r);g.quadraticCurveTo(x+k,y-k,x+r,y);g.quadraticCurveTo(x+k,y+k,x,y+r);g.quadraticCurveTo(x-k,y+k,x-r,y);g.quadraticCurveTo(x-k,y-k,x,y-r);g.fill();g.restore();});}
  /* ---------- a silver setting round a bead: a fine bezel and four claws ---------- */
  function setting(g,x,y,R){var nt=night(),gr=g.createLinearGradient(x-R,y-R,x+R,y+R);gr.addColorStop(0,nt?"#f2eefb":"#ffffff");gr.addColorStop(0.5,nt?"#8c86a6":"#c9c4d8");gr.addColorStop(1,nt?"#3c3652":"#7d7695");
    g.strokeStyle=gr;g.lineWidth=Math.max(1,R*0.12);g.beginPath();g.arc(x,y,R*1.04,0,TAU);g.stroke();g.fillStyle=gr;for(var i=0;i<4;i++){var a=i*Math.PI/2+Math.PI/4;g.beginPath();g.arc(x+Math.cos(a)*R*1.02,y+Math.sin(a)*R*1.02,Math.max(1,R*0.13),0,TAU);g.fill();}}
  /* ---------- a frame: back to front, as before ---------- */
  var SH=null;function draw(){if(!cv)return;var d=dpr(),px=Math.round(460*d);if(cv.width!==px){cv.width=px;cv.height=px;}g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,460,460);
    var nt=night(),T=TREE,S=SH||(SH=shape(T)),ang=ANG,prims=[];BEADS=[];GEMS=[];
    var halo=g.createRadialGradient(CX,200,10,CX,220,230);halo.addColorStop(0,nt?"rgba(183,156,230,.14)":"rgba(255,255,255,.7)");halo.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=halo;g.fillRect(0,0,460,460);
    var cy=BASEY+6,rx=136,ry=rx*Math.sin(PITCH)+4;var sh=g.createRadialGradient(CX,cy+30,10,CX,cy+30,rx*1.2);sh.addColorStop(0,nt?"rgba(0,0,0,.55)":"rgba(46,23,100,.22)");sh.addColorStop(1,"rgba(0,0,0,0)");
    g.fillStyle=sh;g.beginPath();g.ellipse(CX,cy+30,rx*1.2,ry*1.5,0,0,TAU);g.fill();g.drawImage(plinthImg(nt),0,0,460,460);
    /* the app's name, engraved on the band's front */
    var words=(T.name.toUpperCase()+"  ·  "+T.total+" VERSIONS");g.save();g.font='600 9px Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';try{g.letterSpacing="2.2px";}catch(e){}
    g.textAlign="center";g.textBaseline="middle";g.fillStyle=nt?"rgba(255,255,255,.22)":"rgba(255,255,255,.9)";g.fillText(words,CX,cy+ry+12.6);g.fillStyle=nt?"rgba(236,228,250,.72)":"rgba(75,42,143,.72)";g.fillText(words,CX,cy+ry+11.8);g.restore();
    /* diamonds set round the plinth's violet band, at its front */
    for(var pg=0;pg<9;pg++){var pa=Math.PI*(0.14+0.72*pg/8),ex=CX+Math.cos(pa)*rx*0.86,ey=cy+Math.sin(pa)*ry*0.86;gemAt(g,ex,ey,6.2,pg*0.37);}
    var fq=proj([0,0,0],ang);g.drawImage(footImg(nt),fq.x-40,fq.y-50,80,80);
    /* the silver wire: two strands twisted up the trunk, behind it and before it, with diamonds set on it */
    var top=S.beads.filter(function(b){return b.head;})[0].p[1]-20;[0,Math.PI].forEach(function(ph0,si){var pts=[];for(var yy=6;yy<=top;yy+=3)pts.push([11.5*Math.cos(yy/52*TAU+ph0),yy,11.5*Math.sin(yy/52*TAU+ph0)]);
      var q=pts.map(function(p){return proj(p,ang);});var run=[q[0]],back=q[0].z>0;for(var i2=1;i2<q.length;i2++){var bk=q[i2].z>0;run.push(q[i2]);
        if(bk!==back||i2===q.length-1){prims.push({z:back?1:0.2,f:function(rr){return function(){tube(g,rr,3.4,null,"wire");};}(run.slice())});run=[q[i2]];back=bk;}}
      for(var gi=0;gi<4;gi++){var yy2=30+gi*60+si*26;if(yy2>top)continue;var gp=[11.5*Math.cos(yy2/52*TAU+ph0),yy2,11.5*Math.sin(yy2/52*TAU+ph0)],gq=proj(gp,ang);
        prims.push({z:gq.z>0?1.05:0.15,f:function(gq2,ph){return function(){gemAt(g,gq2.x,gq2.y,7.6*gq2.k,ph);};}(gq,gi*1.7+si)});}});
    S.tubes.forEach(function(t){var q=t.pts.map(function(p){return proj(p,ang);});
      if(t.kind==="trunk"){prims.push({z:0.4,f:function(){tube(g,q,t.w,null,t.kind);}});return;}
      var run=[q[0]],back=q[0].z>0;for(var i=1;i<q.length;i++){var bk=q[i].z>0;run.push(q[i]);
        if(bk!==back||i===q.length-1){var r2=run.slice(),zz=0;r2.forEach(function(p){zz+=p.z;});zz/=r2.length;prims.push({z:back?Math.max(zz,1):Math.min(zz,-1),f:function(rr){return function(){tube(g,rr,t.w,null,t.kind);};}(r2)});run=[q[i]];back=bk;}}});
    S.collars.forEach(function(c){var q=proj([0,c.h,0],ang),rx2=21*q.k,ry2=rx2*Math.sin(PITCH)+2;
      prims.push({z:q.z+0.5,f:function(){collar(g,q.x,q.y,rx2,ry2,Math.PI,TAU,5.5);}});prims.push({z:q.z-0.5,f:function(){collar(g,q.x,q.y,rx2,ry2,0,Math.PI,5.5);
        for(var cg=0;cg<7;cg++){var ca=Math.PI*(0.14+0.72*cg/6);gemAt(g,q.x+Math.cos(ca)*rx2,q.y+Math.sin(ca)*ry2+0.5,3.9*q.k+0.6,cg*0.9+c.h*0.01);}
        if(c.name){g.save();g.font='italic 600 12.5px "Home Cormorant","Cormorant Garamond",Cormorant,Georgia,serif';g.textBaseline="middle";g.fillStyle=nt?"rgba(236,228,250,.85)":"#4b2a8f";
          g.strokeStyle=nt?"rgba(236,228,250,.35)":"rgba(75,42,143,.35)";g.lineWidth=0.8;g.beginPath();g.moveTo(q.x+rx2+2,q.y);g.lineTo(q.x+rx2+12,q.y);g.stroke();g.fillText(c.name,q.x+rx2+15,q.y+0.5);g.restore();}}});});
    S.tubes.forEach(function(t){if(t.kind==="trunk")return;var e=t.kind==="arch"?t.pts[Math.floor(t.pts.length/2)]:t.pts[t.pts.length-1];if(t.kind==="branch"){var e0=t.pts[t.pts.length-2];e=[e[0]+(e[0]-e0[0])*2.2,e[1]+(e[1]-e0[1])*2.2+10,e[2]+(e[2]-e0[2])*2.2];}
      var gq=proj(e,ang);prims.push({z:gq.z-0.02,f:function(){gemAt(g,gq.x,gq.y-(t.kind==="arch"?11*gq.k:0),(t.kind==="arch"?12:13)*gq.k,t.kind==="arch"?2.1:3.3);}});
      /* and set along the rod, between its beads */
      var n=t.pts.length;[0.18,0.40,0.62,0.84].forEach(function(f,fi){if(t.kind==="arch"&&Math.abs(f-0.5)<0.12)return;var pp=t.pts[Math.max(1,Math.min(n-2,Math.round(f*(n-1))))],mq=proj(pp,ang);
        prims.push({z:mq.z-0.015,f:function(){gemAt(g,mq.x,mq.y,6.6*mq.k,fi*1.3+(t.kind==="arch"?0.4:2.2));}});});});
    S.beads.forEach(function(b){var q=proj(b.p,ang),on=HOVER===b,o={grow:on?1.22:1,lift:on?3:0,far:q.z>40};BEADS.push({b:b,x:q.x,y:q.y-(on?3:0),r:b.r*q.k*(on?1.22:1)});prims.push({z:q.z-0.01,f:function(){bead(g,q,b.r,o,b.kind,!!b.head);}});});
    if(T.waiting){var hb=S.beads.filter(function(b){return b.head;})[0];if(hb){var q=proj([0,hb.p[1]+52,0],ang),tt=(Date.now()%2400)/2400,R=11*q.k;
      prims.push({z:q.z,f:function(){var tq=proj([0,hb.p[1]+24,0],ang);g.setLineDash([2,3]);g.strokeStyle=nt?"rgba(236,228,250,.55)":"rgba(106,63,181,.55)";g.lineWidth=1.2;g.beginPath();g.moveTo(tq.x,tq.y);g.lineTo(q.x,q.y+R);g.stroke();g.setLineDash([]);
        bead(g,q,11,{alpha:0.5+0.14*Math.sin(tt*TAU)},"wait",false);g.setLineDash([3,3]);g.strokeStyle=nt?"rgba(236,228,250,.6)":"rgba(106,63,181,.55)";g.lineWidth=1.3;g.beginPath();g.arc(q.x,q.y,R*1.3,0,TAU);g.stroke();g.setLineDash([]);}});
      BEADS.push({b:{wait:true,c:{title:"A change not kept yet"}},x:q.x,y:q.y,r:R});}}
    prims.sort(function(a,b){return b.z-a.z;});prims.forEach(function(p){p.f();});twinkle(g,performance.now()/1000);}
  function loop(t){raf=0;if(!vis||!shown)return;if(LAST&&t-LAST<30){raf=requestAnimationFrame(loop);return;}var dt=Math.min(64,t-(LAST||t));LAST=t;if(!still()){SPIN+=(TARGET-SPIN)*Math.min(1,dt/260);if(!DRAG)ANG+=SPIN*dt*TAU/52000;}draw();if(!still())raf=requestAnimationFrame(loop);}
  function kick(){if(!raf)raf=requestAnimationFrame(loop);}
  function at(e){var r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*460,y:(e.clientY-r.top)/r.height*460};}
  function hit(p){var best=null,bd=1e9;BEADS.forEach(function(B){var d=Math.hypot(B.x-p.x,B.y-p.y);if(d<Math.max(9,B.r+4)&&d<bd){bd=d;best=B;}});return best;}
  function mount(el,tip){host=el;onTip=tip;cv=D.createElement("canvas");cv.className="tree-cv";host.appendChild(cv);g=cv.getContext("2d");
    host.addEventListener("pointermove",function(e){var p=at(e);if(DRAG){ANG=DRAG.a+(p.x-DRAG.x)*0.012;kick();return;}var B=hit(p),b=B?B.b:null;if(b!==HOVER){HOVER=b;TARGET=b?0:1;cv.style.cursor=b?"pointer":"grab";if(onTip)onTip(b,B);kick();}});
    host.addEventListener("pointerleave",function(){HOVER=null;TARGET=1;if(onTip)onTip(null);kick();});
    host.addEventListener("pointerdown",function(e){var p=at(e),B=hit(p);if(B){try{IngSound.play("paper");}catch(x){}if(onTip)onTip(B.b,B,true);return;}DRAG={x:p.x,a:ANG};cv.style.cursor="grabbing";});
    W.addEventListener("pointerup",function(){if(DRAG){DRAG=null;cv.style.cursor="grab";}});
    try{new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)kick();}).observe(host);}catch(e){}
    D.addEventListener("visibilitychange",function(){shown=!D.hidden;if(shown)kick();});kick();}
  return {mount:mount,theme:function(){kick();},kick:kick,gems:function(n){return gemFrames(!!n);}};})();
