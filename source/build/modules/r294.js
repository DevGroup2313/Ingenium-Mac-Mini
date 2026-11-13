<style id="r294-css">
/* ============ R294 · FABRICA'S HEADER: THE TREE OF YOUR VERSIONS (Ingenium 6.96, 13 November 2026) ============
   Her words (12 November 2026): "I also want the Fabrica page to get the same makeover as the others. I want everything inside of the 3
   panel view look but I think that it is missing its header card with the nice 3D animation. I wonder if it would also benefit from that
   as well. I am on the fence for the Build page, I just want everything to be cohesive and consistent." Then (13 November 2026): "I also
   want you to commit and push the Fabrica redesign please."
   So Fabrica opens, as Lector and Vocatio do, on their header (modules/r290.js, IngStudios.kit: the same slab on Blend's desk, eyebrow,
   Cormorant title, keys, line and hint) with the four steps under it as Lector's are (Change, Keep, Test, Ship), and its three panels kept
   as they are below them. Its instrument is
   the tree of the open app's versions, turned slowly on a plinth of spun metal: main is the trunk, each version a bead of violet glass
   along it (the newest at the top, marked with Ingenium's star), each idea a branch leaving the trunk where it parted from main, an idea
   brought in an arch that returns to the trunk at its merge, each release a collar round the trunk, and changes not kept yet a bead not
   yet set above the newest. Pointing at the tree stills it; dragging turns it; a version lifts under the pointer and says its words;
   pressing it shows what it changed (Plans, Compare). Read from the app as it is; nothing is written. By night it takes the night's
   metal and glass; Motion set to minimal, or a system that asks for less motion, holds it still. */
/* the tree stands where the other heads' instruments stand (r290's .skh-obj, 520 by 424), at 92 per cent of its 460 */
#page-fabrica.sk-on .fbt-stage{position:absolute;left:48px;top:0;width:460px;height:460px;transform-origin:0 0;transform:scale(.92);cursor:grab;touch-action:pan-y;-webkit-tap-highlight-color:transparent}
#page-fabrica.sk-on .fbt-stage.fbt-drag{cursor:grabbing}
#page-fabrica.sk-on .skh-stage{display:none}
#page-fabrica.sk-on .fbt-stage.fbt-on-bead{cursor:pointer}
#page-fabrica.sk-on .fbt-cv{position:absolute;left:0;top:0;width:460px;height:460px}
#page-fabrica.sk-on .fbt-tip{position:absolute;z-index:8;max-width:220px;padding:7px 10px;border-radius:10px;pointer-events:none;opacity:0;transform:translateY(4px);
  background:var(--sk-keyA,#fff);box-shadow:inset 0 0 0 1px var(--sk-hair),0 6px 16px rgba(40,22,68,.16);transition:opacity .15s ease,transform .15s ease;font-size:12px;line-height:1.35;color:var(--sk-ink2)}
#page-fabrica.sk-on .fbt-tip.fbt-show{opacity:1;transform:none}
#page-fabrica.sk-on .fbt-tip b{display:block;font:600 13.5px/1.25 var(--sk-serif);color:var(--sk-ink1)}
#page-fabrica.sk-on .fbt-tip code{font-size:11px;color:var(--sk-acc)}
#page-fabrica.sk-on .skh-says b.fbt-wait{font-weight:600;color:var(--sk-warn,#9a5b06)}
body[data-theme="night"] #page-fabrica.sk-on .skh-says b.fbt-wait{color:#f0b65c}
/* the panels keep the window's height under the head, as Vocatio's do; Fabrica's own title row gives way to the head (its Back to the
   work key stays, for the library of apps) and its steps to the four under the head */
#page-fabrica.sk-on #fb{--f-h:max(420px,calc(100vh - 74px)) !important}
#page-fabrica.sk-on #fb .f-head > div:not(.f-steps),#page-fabrica.sk-on #fb .f-head > .f-steps{display:none}
/* a sheet Fabrica opens (New app, Bring one in, and the others) stands in the window, wherever the page is scrolled: the head above the
   panels must never leave one opening out of sight, and the head's keys do not scroll the page (her word in 6.95 on r290's keys) */
#page-fabrica.sk-on #fb .f-sheet-wrap{position:fixed;inset:0;z-index:60;border-radius:0}
@media (prefers-reduced-motion:reduce){#page-fabrica.sk-on .fbt-tip{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p294"]="started";}catch(_){}
/* R294 · Fabrica's header, the tree of your versions: see the note at the top of its styles */
(function r294(){
"use strict";
if(window.__r294)return;window.__r294=1;
var D=document,W=window,TAU=Math.PI*2,IR=W.IngRepo;
var page=null,HD=null,cv=null,stage=null,tag=null,tip=null,says=null,row=null,ROWKEY="";
var TREE=null,SIG="",ANG=-0.6,SPIN=1,TARGET=1,LAST=0,RAF=0,HOVER=null,DRAG=null,BEADS=[],LOADING=0;
function X(){return W.fbHubHost||null;}
function KIT(){return W.IngStudios&&IngStudios.kit||null;}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function night(){try{return D.body.getAttribute("data-theme")==="night";}catch(e){return false;}}
function still(){var m="calm";try{m=D.body.getAttribute("data-motion")||"calm";}catch(e){}try{if(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return true;}catch(e){}return m==="minimal";}
function dpr(){return Math.min(2,W.devicePixelRatio||1);}
function PAL(){return night()?{m0:"#5a4a78",m1:"#2a1f3c",m2:"#8d7bb0",mL:36,mS:22,hi:"rgba(236,228,250,.55)",lo:"rgba(0,0,0,.55)",g0:[205,184,240],g1:[150,110,220],g2:[96,58,170],g3:[38,18,74],
    plate0:"#3a2d50",plate1:"#1c1428",rim:"rgba(236,228,250,.22)",shadow:"rgba(0,0,0,.55)",star:"#f7f2ff",wait:"rgba(236,228,250,.55)",ink:"rgba(236,228,250,.75)"}
  :{m0:"#efe8fa",m1:"#b9a6dc",m2:"#ffffff",mL:80,mS:30,hi:"rgba(255,255,255,.95)",lo:"rgba(46,23,100,.38)",g0:[239,230,255],g1:[167,128,232],g2:[106,63,181],g3:[45,20,92],
    plate0:"#fbf8ff",plate1:"#d9cdef",rim:"rgba(255,255,255,.9)",shadow:"rgba(46,23,100,.22)",star:"#ffffff",wait:"rgba(106,63,181,.55)",ink:"#4b2a8f"};}
function rgba(c,a){return "rgba("+c[0]+","+c[1]+","+c[2]+","+a+")";}

/* ---------- the tree, read from the app: the trunk (main's first parents), arches (ideas brought in), branches (ideas open), collars ---------- */
function mainOf(r){try{if(W.IngGuard&&IngGuard.mainOf)return IngGuard.mainOf(r,null);}catch(e){}var b=r.branches||[];return b.indexOf("main")>=0?"main":b.indexOf("master")>=0?"master":(b[0]||r.branch||"main");}
function read(r){if(!r||!r.head||!IR)return Promise.resolve({empty:true,name:r?r.name:null});var main=mainOf(r);
  return IR.log(r.id,{ref:"refs/heads/"+main,max:80}).then(function(L){var by={};L.forEach(function(c){by[c.oid]=c;});
    var trunk=[],c=L[0];while(c&&trunk.length<9){trunk.push(c);c=by[c.parents&&c.parents[0]];}trunk.reverse();
    var onTrunk={};trunk.forEach(function(x,i){onTrunk[x.oid]=i;});
    var arches=[];trunk.forEach(function(x,i){if(!x.parents||x.parents.length<2)return;var chain=[],p=by[x.parents[1]];
      while(p&&onTrunk[p.oid]==null&&chain.length<6){chain.push(p);p=by[p.parents&&p.parents[0]];}
      arches.push({at:i,from:p&&onTrunk[p.oid]!=null?onTrunk[p.oid]:-1,beads:chain.reverse()});});
    var others=(r.branches||[]).filter(function(b){return b!==main;}).slice(0,6);
    return Promise.all(others.map(function(b){return IR.log(r.id,{ref:"refs/heads/"+b,max:40}).then(function(l){var bb={};l.forEach(function(x){bb[x.oid]=x;});
        var own=[],q=l[0];while(q&&onTrunk[q.oid]==null&&!by[q.oid]&&own.length<8){own.push(q);q=bb[q.parents&&q.parents[0]];}
        if(!own.length)return null;return {name:b,from:q&&onTrunk[q.oid]!=null?onTrunk[q.oid]:-1,beads:own.reverse()};},function(){return null;});}))
      .then(function(br){return Promise.all((r.tags||[]).slice(0,12).map(function(t){return IR.resolve(r.id,"refs/tags/"+t).then(function(o){return onTrunk[o]!=null?{name:t,at:onTrunk[o]}:null;},function(){return null;});}))
        .then(function(tg){return {name:r.name,main:main,trunk:trunk,arches:arches,branches:br.filter(Boolean),tags:tg.filter(Boolean),head:r.head,branch:r.branch,detached:!!r.detached,total:L.length};});});});}

/* ---------- 3D: the tree turns about its trunk; the eye looks down a little ---------- */
var CX=230,BASEY=368,PITCH=0.3,FOC=820,H=292;
function proj(p,ang){var ca=Math.cos(ang),sa=Math.sin(ang),x=p[0]*ca-p[2]*sa,z=p[0]*sa+p[2]*ca,y=p[1];
  var cp=Math.cos(PITCH),sp=Math.sin(PITCH),y2=y*cp-z*sp,z2=y*sp+z*cp,k=FOC/(FOC+z2);return {x:CX+x*k,y:BASEY-y2*k,z:z,k:k};}/* z: the depth before the tilt, which orders what is in front */
function bez(a,b,c,d,t){var u=1-t;return [0,1,2].map(function(i){return u*u*u*a[i]+3*u*u*t*b[i]+3*u*t*t*c[i]+t*t*t*d[i];});}
function hOf(i,n){var span=Math.min(H-34,(n-1)*36);return 34+(n<=1?0:i*span/(n-1));}
function shape(T){var n=T.trunk.length,parts={tubes:[],beads:[],collars:[]},ny=hOf(n-1,n);
  /* the trunk */
  var tr=[];for(var i=0;i<n;i++)tr.push([0,hOf(i,n),0]);parts.tubes.push({pts:[[0,0,0]].concat(tr),w:17,kind:"trunk"});
  T.trunk.forEach(function(c,i){parts.beads.push({p:tr[i],r:i===n-1?23:12,c:c,head:i===n-1,kind:"main"});});
  T.tags.forEach(function(t){parts.collars.push({h:hOf(t.at,n),name:t.name});});
  /* the arches: an idea brought in leaves the trunk where it parted and returns at its merge */
  var k=0,ALL=T.arches.length+T.branches.length,az=function(){var a=-0.5+k*(TAU/Math.max(2,ALL));k++;return a;};
  T.arches.forEach(function(a){var f=a.from<0?12:hOf(a.from,n),m=hOf(a.at,n),phi=az(),R=92+Math.min(52,(m-f)*0.45),
      at=function(t){var w2=Math.sin(Math.PI*t);return [R*w2*Math.cos(phi),f+(m-f)*t,R*w2*Math.sin(phi)];},pts=[];for(var s=0;s<=32;s++)pts.push(at(s/32));
    parts.tubes.push({pts:pts,w:9.5,kind:"arch"});a.beads.forEach(function(c,j){parts.beads.push({p:at((j+1)/(a.beads.length+1)),r:11,c:c,kind:"arch"});});});
  /* the ideas still open: a branch from where it parted, up and out */
  T.branches.forEach(function(b){var f=b.from<0?20:hOf(b.from,n),phi=az(),len=Math.max(110,Math.min(H+40-f,100+b.beads.length*24)),R=92+b.beads.length*12,
      p0=[0,f,0],p1=[R*0.12*Math.cos(phi),f+len*0.42,R*0.12*Math.sin(phi)],p2=[R*0.95*Math.cos(phi),f+len*0.5,R*0.95*Math.sin(phi)],p3=[R*Math.cos(phi),f+len,R*Math.sin(phi)],pts=[];for(var s=0;s<=24;s++)pts.push(bez(p0,p1,p2,p3,s/24));
    parts.tubes.push({pts:pts,w:10,kind:"branch",name:b.name});b.beads.forEach(function(c,j){parts.beads.push({p:bez(p0,p1,p2,p3,0.25+0.75*(j+1)/b.beads.length),r:j===b.beads.length-1?14:11,c:c,kind:"branch",idea:b.name,tipOf:j===b.beads.length-1?b.name:null});});});
  return parts;}
function demo(){var t=[],now=Date.now();for(var i=0;i<7;i++)t.push({oid:"",short:"",title:"",when:now});return {demo:true,trunk:t,arches:[{at:4,from:1,beads:[{},{}]}],branches:[{name:"",from:3,beads:[{},{},{}]}],tags:[{at:2}]};}

/* ---------- 7.00: the tree she approved (13 November 2026), drawn in the light that paints Vocatio's compass ----------
   Her words: "I approve of the Fabrica tree, please push it everywhere." and "The Fabrica tree looks amazing, please add it to the app."
   And of the tree as it was: "The bug that I saw on Fabrica was the grey capsule or just the tree image itself looking faded and greyed
   out". The tree is never faded now: with no app chosen it stands as a quiet example, whole, with "THE TREE OF YOUR VERSIONS" engraved on
   its plinth. The trunk and every branch are polished silver, shaded across each rod as a turned rod is; each version a bead of glass
   drawn by the graphics chip once for each kind (main violet; an idea brought in, pearl; an idea still open, lighter violet; the newest,
   larger, with Ingenium's star inlaid), set in a fine silver bezel with four claws; each release a silver collar with its name and a small
   diamond, Build's own, set beneath it; the plinth turned silver with a violet enamel band and an engraved scale; a silver wire twisted
   up the trunk; and every seven seconds (Home's clock) a soft light rises up the trunk to the newest version. Beads, foot, plinth and
   diamonds are painted once and then only placed, and the turn is drawn at most about thirty times a second.
   7.00, her words (13 November 2026): "There is also a weird glitching movement happening up and down Fabrica's tree, the drawing seems to
   be glitching as it spins, please also fix that." Found (with the other session): the silver wire twisted round the trunk seemed to crawl
   up and down as the tree turned and flickered where its front and back met; the light rising up the trunk every seven seconds read the
   same way; the silver of each rod jumped every 3.75 degrees; the small diamonds jumped between their eight frames. Now: fine silver
   bands between the beads in place of the wire, no rising light, the rods' silver in steps of a quarter of a degree, the diamonds
   blended between frames. */
var SH=null,DEMO=null,GEMS=[];
/* the 2D drawing on the tree's canvas */
function hex(c){var h=function(v){v=Math.round(Math.max(0,Math.min(1,v))*255);return (v<16?"0":"")+v.toString(16);};return "#"+h(c[0])+h(c[1])+h(c[2]);}
var VCL=(function(){var x=-.5,y=-.62,z=.6,l=Math.sqrt(x*x+y*y+z*z);return [x/l,y/l,z/l];})();
var VCE1=(function(){var x=-VCL[2],z=VCL[0],l=Math.sqrt(x*x+z*z);return [x/l,0,z/l];})(),VCE2=[VCL[1]*VCE1[2]-VCL[2]*VCE1[1],VCL[2]*VCE1[0]-VCL[0]*VCE1[2],VCL[0]*VCE1[1]-VCL[1]*VCE1[0]];
function vcS(a,b,x){var t=(x-a)/(b-a);t=t<0?0:t>1?1:t;return t*t*(3-2*t);}
function vcWin(x,y,z){if(x*VCL[0]+y*VCL[1]+z*VCL[2]<.6)return 0;var a=Math.abs(x*VCE1[0]+y*VCE1[1]+z*VCE1[2]),b=Math.abs(x*VCE2[0]+y*VCE2[1]+z*VCE2[2]);return (1-vcS(.17,.215,a))*(1-vcS(.25,.3,b));}
function vcEnv(x,y,z,nt,o){var up=-y,r,g,b,a,f;
  if(nt){a=.22+.2*vcS(-.2,.85,up);r=a*.92;g=a*.9;b=a*1.22;f=vcS(0,.7,-up);r-=f*.15;g-=f*.14;b-=f*.18;}
  else{a=.86+.13*vcS(-.2,.9,up);r=a*.985;g=a*.98;b=a;f=vcS(-.05,.65,-up);r-=f*.4;g-=f*.4;b-=f*.36;}
  var hz=(1-vcS(.1,.28,Math.abs(y)))*(1-vcS(.5,.78,z))*.85,hd=nt?.07:.28;r+=(hd-r)*hz;g+=(hd-g)*hz;b+=(hd*1.12-b)*hz;
  var cam=vcS(.88,.975,z)*.8,cd=nt?.1:.5;r+=(cd-r)*cam;g+=(cd-g)*cam;b+=(cd*1.08-b)*cam;
  var k=vcWin(x,y,z);r+=k*1.3;g+=k*1.3;b+=k*1.34;
  var fs=vcS(.55,.72,x)*(1-vcS(.25,.5,Math.abs(y+.1)));r+=fs*(nt?.55:.6);g+=fs*(nt?.53:.6);b+=fs*(nt?.68:.64);
  o[0]=r<0?0:r;o[1]=g<0?0:g;o[2]=b<0?0:b;}
function vcTone(v){return v<.8?(v<0?0:v):.8+.2*(1-Math.exp(-(v-.8)*5));}
function vcSilver(nx,ny,nz,nt,o){var l=Math.sqrt(nx*nx+ny*ny+nz*nz);nx/=l;ny/=l;nz/=l;var d=2*nz;vcEnv(d*nx,d*ny,d*nz-1,nt,o);
  o[0]=vcTone(o[0]*.965);o[1]=vcTone(o[1]*.96);o[2]=vcTone(o[2]*.975);}
function vcEnamel(nx,ny,nz,base,nt,o){var l=Math.sqrt(nx*nx+ny*ny+nz*nz);nx/=l;ny/=l;nz/=l;var dl=nx*VCL[0]+ny*VCL[1]+nz*VCL[2],df=.62+.5*(dl<0?0:dl),d=2*nz;
  vcEnv(d*nx,d*ny,d*nz-1,nt,o);var fr=.035+.5*Math.pow(1-nz,5),k=vcWin(d*nx,d*ny,d*nz-1);
  o[0]=vcTone(base[0]*df+o[0]*fr+k*.42);o[1]=vcTone(base[1]*df+o[1]*fr+k*.42);o[2]=vcTone(base[2]*df+o[2]*fr+k*.46);}
  /* ---------- silver, shaded across a rod: the colours across its width for a rod lying along a screen direction ---------- */
  var RAMP={};function ramp(ang,nt){var b=Math.round(((ang%Math.PI)+Math.PI)%Math.PI/Math.PI*720)%720,key=(nt?"n":"d")+b;if(RAMP[key])return RAMP[key];
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
    var gs=glassSprite(kind,nt,head);if(o.far)g.globalAlpha=0.9;if(o.alpha!=null)g.globalAlpha=o.alpha;
    if(gs)g.drawImage(gs,x-R,y-R,R*2,R*2);else{var sp=sprite(Math.max(6,Math.round(r*(o.grow||1)*2)/2),kind,nt,head),s=(sp.__R/(r*(o.grow||1)))*R;g.drawImage(sp,x-s,y-s,s*2,s*2);}g.globalAlpha=1;if(kind!=="wait")setting(g,x,y,R);}
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
  var GEMS=[];function gemAt(g,x,y,size,phase){var fr=gemFrames(night());if(!fr)return;var gu=(((ANG*2.2+phase)%(Math.PI/4)+Math.PI/4)%(Math.PI/4))/(Math.PI/32),k=Math.floor(gu)%8,gf=gu-Math.floor(gu),ga=g.globalAlpha;
    g.drawImage(fr[k],x-size,y-size*0.95,size*2,size*2);g.globalAlpha=ga*gf;g.drawImage(fr[(k+1)%8],x-size,y-size*0.95,size*2,size*2);g.globalAlpha=ga;GEMS.push([x,y,size,phase]);}
  /* ---------- a silver setting round a bead: a fine bezel and four claws ---------- */
  function setting(g,x,y,R){var nt=night(),gr=g.createLinearGradient(x-R,y-R,x+R,y+R);gr.addColorStop(0,nt?"#f2eefb":"#ffffff");gr.addColorStop(0.5,nt?"#8c86a6":"#c9c4d8");gr.addColorStop(1,nt?"#3c3652":"#7d7695");
    g.strokeStyle=gr;g.lineWidth=Math.max(0.8,R*0.075);g.beginPath();g.arc(x,y,R*1.04,0,TAU);g.stroke();g.fillStyle=gr;for(var i=0;i<4;i++){var a=i*Math.PI/2+Math.PI/4;g.beginPath();g.arc(x+Math.cos(a)*R*1.02,y+Math.sin(a)*R*1.02,Math.max(0.8,R*0.09),0,TAU);g.fill();}}
  /* ---------- beads of real glass: drawn by the graphics chip once for each kind, then only placed ---------- */
  var GLS={};function glassSprite(kind,nt,head){var key=kind+(head?"h":"")+(nt?"n":"d");if(GLS[key]!==undefined)return GLS[key];GLS[key]=null;
    var d=dpr(),N=Math.round(72*d),c=D.createElement("canvas");c.width=c.height=N;var gl=null;try{gl=c.getContext("webgl",{premultipliedAlpha:true,alpha:true,preserveDrawingBuffer:true});}catch(e){}if(!gl)return null;
    var ti=kind==="arch"?[0.93,0.90,0.99]:(kind==="branch"?[0.78,0.66,0.99]:(kind==="wait"?[0.84,0.78,0.98]:[0.62,0.44,0.96])),mk2=kind==="arch"?0.5:(kind==="wait"?0.25:0.05);
    var VS="attribute vec2 p;varying vec2 v;void main(){v=p*0.5+0.5;gl_Position=vec4(p,0.0,1.0);}";
    var FS=["precision highp float;varying vec2 v;uniform float uN,uM;uniform vec3 uTi;",
      "float sbox(vec3 w,vec3 ax,vec2 hs,float sf){float d=dot(w,ax);if(d<=0.05)return 0.0;vec3 u=normalize(cross(vec3(0.0,1.0,0.0),ax)+vec3(0.0,0.0,1e-4));vec3 vv=cross(ax,u);vec2 p=vec2(dot(w,u),dot(w,vv))/d;vec2 q=1.0-smoothstep(hs*(1.0-sf),hs,abs(p));return q.x*q.y;}",
      "vec3 env(vec3 w){float up=w.y;vec3 dc=mix(vec3(0.82,0.81,0.88),vec3(1.10,1.09,1.14),smoothstep(-0.3,0.8,up));vec3 nc=mix(vec3(0.07,0.06,0.12),vec3(0.26,0.21,0.40),smoothstep(-0.3,0.8,up));vec3 c=mix(dc,nc,uN);",
      "  c*=mix(1.0,mix(0.62,0.45,uN),smoothstep(0.0,-0.5,up));c+=sbox(w,normalize(vec3(-0.55,0.62,0.56)),vec2(0.22,0.32),0.25)*mix(5.0,6.0,uN)+sbox(w,normalize(vec3(0.75,0.3,0.55)),vec2(0.06,0.35),0.3)*2.5;return c;}",
      "void main(){vec2 p=v*2.0-1.0;float r2=dot(p,p);if(r2>1.0){gl_FragColor=vec4(0.0);return;}vec3 n=vec3(p,sqrt(1.0-r2));vec3 I=vec3(0.0,0.0,-1.0);",
      "  float F=0.04+0.96*pow(1.0-n.z,5.0);vec3 col=F*env(reflect(I,n));vec3 d1=refract(I,n,1.0/1.5);float t=-2.0*dot(n,d1);vec3 ex=n+d1*t;vec3 d2=refract(d1,-ex,1.5);if(dot(d2,d2)<1e-6)d2=reflect(d1,-ex);",
      "  vec3 ab=exp(-(1.0-uTi)*t*1.35);vec3 tr=env(d2)*ab*uTi;vec3 L=normalize(vec3(-0.55,0.62,0.56));float dif=0.55+0.45*max(dot(n,L),0.0);vec3 milky=mix(vec3(0.96,0.94,1.0),uTi,0.35)*dif*mix(1.0,0.55,uN);",
      "  col+=(1.0-F)*mix(tr,milky,uM);vec2 cp=p-vec2(0.34,-0.38);col+=uTi*exp(-dot(cp,cp)/0.06)*0.62*(1.0-uM*0.5);col+=vec3(1.0)*pow(max(dot(reflect(I,n),L),0.0),160.0)*1.5;",
      "  col=1.0-exp(-col*mix(1.25,1.08,uN));float a=smoothstep(1.0,0.965,r2);gl_FragColor=vec4(col*a,a);}"].join("\n");
    function shd(t,src){var x=gl.createShader(t);gl.shaderSource(x,src);gl.compileShader(x);if(!gl.getShaderParameter(x,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(x));return x;}
    try{var pr=gl.createProgram();gl.attachShader(pr,shd(gl.VERTEX_SHADER,VS));gl.attachShader(pr,shd(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));}catch(e){W.__glassErr=String(e);return null;}
    gl.useProgram(pr);var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);var loc=gl.getAttribLocation(pr,"p");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    gl.uniform1f(gl.getUniformLocation(pr,"uN"),nt?1:0);gl.uniform1f(gl.getUniformLocation(pr,"uM"),mk2);gl.uniform3fv(gl.getUniformLocation(pr,"uTi"),new Float32Array(ti));
    gl.viewport(0,0,N,N);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);var cc=D.createElement("canvas");cc.width=cc.height=N;var x=cc.getContext("2d");x.drawImage(c,0,0);
    if(head){x.setTransform(N/2,0,0,N/2,N/2,N/2);var s2=0.58;x.fillStyle=nt?"#f4eeff":"#ffffff";x.shadowColor="rgba(30,10,70,.45)";x.shadowBlur=N*0.03;x.shadowOffsetY=N*0.01;x.beginPath();
      x.moveTo(0,-s2);x.quadraticCurveTo(s2*.16,-s2*.16,s2,0);x.quadraticCurveTo(s2*.16,s2*.16,0,s2);x.quadraticCurveTo(-s2*.16,s2*.16,-s2,0);x.quadraticCurveTo(-s2*.16,-s2*.16,0,-s2);x.fill();
      x.shadowColor="transparent";x.fillStyle=nt?"#8e6be0":"#7a50c6";x.beginPath();x.arc(0,0,s2*0.16,0,TAU);x.fill();}
    try{var ext=gl.getExtension("WEBGL_lose_context");if(ext)ext.loseContext();}catch(e){}return GLS[key]=cc;}
  /* ---------- the light of your history: every seven seconds (Home's clock) a soft light rises up the silver trunk from the root to your
     newest version, lighting each glass bead from within as it passes, and settles in the newest bead ---------- */
  var RISE=null;function rise(){return null;/* 7.00: gone; it read as a glitch running up and down the tree */if(still()||!SH)return null;var t=performance.now()/1000,f=(t%7)/2.6;if(f>1.3)return null;var hb=SH.beads.filter(function(b){return b.head;})[0];if(!hb)return null;
    return {h:Math.min(f,1)*hb.p[1],a:f<0.08?f/0.08:(f<1?1:Math.max(0,(1.3-f)/0.3)),end:f>=1?Math.min(1,(f-1)/0.1)*Math.max(0,(1.3-f)/0.3):0};}
  function riseTrunk(g,ang){var P=RISE;if(!P||P.a<=0||P.h<=0)return;var q=proj([0,P.h,0],ang),nt=night(),R=34*q.k;g.save();g.globalCompositeOperation=nt?"lighter":"screen";g.translate(q.x,q.y);g.scale(0.34,1);
    var gr=g.createRadialGradient(0,0,0,0,0,R);gr.addColorStop(0,nt?"rgba(232,220,255,"+(0.7*P.a)+")":"rgba(255,255,255,"+(0.9*P.a)+")");gr.addColorStop(0.45,nt?"rgba(170,130,250,"+(0.26*P.a)+")":"rgba(226,212,255,"+(0.34*P.a)+")");gr.addColorStop(1,"rgba(150,110,240,0)");
    g.fillStyle=gr;g.beginPath();g.arc(0,0,R,0,TAU);g.fill();g.restore();}
  function riseBead(g,q,b){var P=RISE;if(!P)return;var k=b.head?P.end:Math.exp(-Math.pow((b.p[1]-P.h)/16,2))*P.a;if(k<0.02)return;var nt=night(),R=b.r*q.k;g.save();g.globalCompositeOperation=nt?"lighter":"screen";
    var gr=g.createRadialGradient(q.x+R*0.12,q.y+R*0.22,0,q.x,q.y,R*0.95);gr.addColorStop(0,"rgba(246,238,255,"+(0.6*k)+")");gr.addColorStop(0.5,"rgba(190,150,255,"+(0.26*k)+")");gr.addColorStop(1,"rgba(150,110,240,0)");
    g.fillStyle=gr;g.beginPath();g.arc(q.x,q.y,R*0.95,0,TAU);g.fill();g.restore();}
  /* ---------- a frame: back to front, as before ---------- */
  function draw(){if(!cv)return;var d=dpr(),px=Math.round(460*d);if(cv.width!==px){cv.width=px;cv.height=px;}var g=cv.getContext("2d");if(!g)return;g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,460,460);
    var nt=night(),T=TREE||DEMO||(DEMO=demo()),S=T._shape||(T._shape=shape(T)),ang=ANG,prims=[];SH=S;BEADS=[];GEMS=[];RISE=rise();
    var halo=g.createRadialGradient(CX,200,10,CX,220,230);halo.addColorStop(0,nt?"rgba(183,156,230,.14)":"rgba(255,255,255,.7)");halo.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=halo;g.fillRect(0,0,460,460);
    var cy=BASEY+6,rx=136,ry=rx*Math.sin(PITCH)+4;var sh=g.createRadialGradient(CX,cy+30,10,CX,cy+30,rx*1.2);sh.addColorStop(0,nt?"rgba(0,0,0,.55)":"rgba(46,23,100,.22)");sh.addColorStop(1,"rgba(0,0,0,0)");
    g.fillStyle=sh;g.beginPath();g.ellipse(CX,cy+30,rx*1.2,ry*1.5,0,0,TAU);g.fill();g.drawImage(plinthImg(nt),0,0,460,460);
    /* the app's name, engraved on the band's front */
    var words=T.demo?"THE TREE OF YOUR VERSIONS":(String(T.name||"").toUpperCase()+"  ·  "+(T.total>=80?"80+":T.total)+" VERSIONS");g.save();g.font='600 9px Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';try{g.letterSpacing="2.2px";}catch(e){}
    g.textAlign="center";g.textBaseline="middle";g.fillStyle=nt?"rgba(255,255,255,.22)":"rgba(255,255,255,.9)";g.fillText(words,CX,cy+ry+12.6);g.fillStyle=nt?"rgba(236,228,250,.72)":"rgba(75,42,143,.72)";g.fillText(words,CX,cy+ry+11.8);g.restore();
    /* diamonds set round the plinth's violet band, at its front */
    g.save();g.beginPath();g.ellipse(CX,cy,rx*0.985,ry*0.985,0,0,TAU);g.clip();g.globalAlpha=nt?0.15:0.12;var pR=function(p){return proj([p[0],-p[1]*0.94,p[2]],ang);};
    S.tubes.forEach(function(t){tube(g,t.pts.map(pR),t.w,null,t.kind);});S.beads.forEach(function(b){var gs=glassSprite(b.kind,nt,!!b.head);if(!gs)return;var q=pR(b.p),R=b.r*q.k;g.drawImage(gs,q.x-R,q.y-R,R*2,R*2);});g.restore();
    var fq=proj([0,0,0],ang);g.drawImage(footImg(nt),fq.x-40,fq.y-50,80,80);
    /* fine silver bands round the trunk between its beads (a still ring cannot seem to crawl as the tree turns) */
    var mains=S.beads.filter(function(b){return b.kind==="main";}).map(function(b){return b.p[1];}).sort(function(a,b){return a-b;});
    for(var mb=1;mb<mains.length;mb++){(function(hh){var q=proj([0,hh,0],ang),rx3=10.6*q.k,ry3=rx3*Math.sin(PITCH)+0.8;
      prims.push({z:q.z+0.45,f:function(){collar(g,q.x,q.y,rx3,ry3,Math.PI,TAU,2.3);}});prims.push({z:q.z-0.45,f:function(){collar(g,q.x,q.y,rx3,ry3,0,Math.PI,2.3);}});})((mains[mb-1]+mains[mb])/2);}
    S.tubes.forEach(function(t){var q=t.pts.map(function(p){return proj(p,ang);});
      if(t.kind==="trunk"){prims.push({z:0.4,f:function(){tube(g,q,t.w,null,t.kind);riseTrunk(g,ang);}});return;}
      var run=[q[0]],back=q[0].z>0;for(var i=1;i<q.length;i++){var bk=q[i].z>0;run.push(q[i]);
        if(bk!==back||i===q.length-1){var r2=run.slice(),zz=0;r2.forEach(function(p){zz+=p.z;});zz/=r2.length;prims.push({z:back?Math.max(zz,1):Math.min(zz,-1),f:function(rr){return function(){tube(g,rr,t.w,null,t.kind);};}(r2)});run=[q[i]];back=bk;}}});
    S.collars.forEach(function(c){var q=proj([0,c.h,0],ang),rx2=21*q.k,ry2=rx2*Math.sin(PITCH)+2;
      prims.push({z:q.z+0.5,f:function(){collar(g,q.x,q.y,rx2,ry2,Math.PI,TAU,5.5);}});prims.push({z:q.z-0.5,f:function(){collar(g,q.x,q.y,rx2,ry2,0,Math.PI,5.5);
        gemAt(g,q.x,q.y+ry2+0.4,5.6*q.k,c.h*0.01);
        if(c.name){g.save();g.font='italic 600 12.5px "Home Cormorant","Cormorant Garamond",Cormorant,Georgia,serif';g.textBaseline="middle";g.fillStyle=nt?"rgba(236,228,250,.85)":"#4b2a8f";
          g.strokeStyle=nt?"rgba(236,228,250,.35)":"rgba(75,42,143,.35)";g.lineWidth=0.8;g.beginPath();g.moveTo(q.x+rx2+2,q.y);g.lineTo(q.x+rx2+12,q.y);g.stroke();g.fillText(c.name,q.x+rx2+15,q.y+0.5);g.restore();}}});});
    S.tubes.forEach(function(t){if(t.kind==="trunk")return;var e=t.kind==="arch"?t.pts[Math.floor(t.pts.length/2)]:t.pts[t.pts.length-1];if(t.kind==="branch"){var e0=t.pts[t.pts.length-2];e=[e[0]+(e[0]-e0[0])*2.2,e[1]+(e[1]-e0[1])*2.2+10,e[2]+(e[2]-e0[2])*2.2];}
      var gq=proj(e,ang);prims.push({z:gq.z-0.02,f:function(){gemAt(g,gq.x,gq.y-(t.kind==="arch"?11*gq.k:0),(t.kind==="arch"?12:13)*gq.k,t.kind==="arch"?2.1:3.3);}});});
    S.beads.forEach(function(b){var q=proj(b.p,ang),on=HOVER===b,o={grow:on?1.22:1,lift:on?3:0,far:q.z>40};BEADS.push({b:b,x:q.x,y:q.y-(on?3:0),r:b.r*q.k*(on?1.22:1)});prims.push({z:q.z-0.01,f:function(){bead(g,q,b.r,o,b.kind,!!b.head);if(b.kind==="main")riseBead(g,q,b);}});});
    if(T.waiting){var hb=S.beads.filter(function(b){return b.head;})[0];if(hb){var q=proj([0,hb.p[1]+52,0],ang),tt=(Date.now()%2400)/2400,R=11*q.k;
      prims.push({z:q.z,f:function(){var tq=proj([0,hb.p[1]+24,0],ang);g.setLineDash([2,3]);g.strokeStyle=nt?"rgba(236,228,250,.55)":"rgba(106,63,181,.55)";g.lineWidth=1.2;g.beginPath();g.moveTo(tq.x,tq.y);g.lineTo(q.x,q.y+R);g.stroke();g.setLineDash([]);
        bead(g,q,11,{alpha:0.5+0.14*Math.sin(tt*TAU)},"wait",false);g.setLineDash([3,3]);g.strokeStyle=nt?"rgba(236,228,250,.6)":"rgba(106,63,181,.55)";g.lineWidth=1.3;g.beginPath();g.arc(q.x,q.y,R*1.3,0,TAU);g.stroke();g.setLineDash([]);}});
      BEADS.push({b:{wait:true},x:q.x,y:q.y,r:R});}}
    prims.sort(function(a,b){return b.z-a.z;});prims.forEach(function(p){p.f();});}
/* ---------- motion: a slow turn, stilled under the pointer, turned by a drag ---------- */
function loop(t){RAF=0;if(!page||!page.offsetParent||D.hidden||!HD||HD.el.classList.contains("is-away"))return;if(LAST&&t-LAST<30){RAF=requestAnimationFrame(loop);return;}var dt=Math.min(64,t-(LAST||t));LAST=t;
  if(!still()){SPIN+=(TARGET-SPIN)*Math.min(1,dt/260);if(!DRAG)ANG+=SPIN*dt*TAU/52000;}
  draw();if(!still()||(TREE&&TREE.waiting))RAF=requestAnimationFrame(loop);}
function kick(){if(!RAF){LAST=0;RAF=requestAnimationFrame(loop);}}
function at(e){var r=stage.getBoundingClientRect(),k=r.width/460;return {x:(e.clientX-r.left)/k,y:(e.clientY-r.top)/k};}
function hit(p){var best=null,bd=1e9;BEADS.forEach(function(B){var d=Math.hypot(B.x-p.x,B.y-p.y);if(d<Math.max(9,B.r+4)&&d<bd){bd=d;best=B;}});return best;}
function words(b){if(b.wait)return "<b>Not kept yet</b>"+(TREE&&TREE.waiting?TREE.waiting+" change"+(TREE.waiting===1?"":"s")+" waiting: press to open them in the panels below, ready to keep":"");
  var c=b.c||{},when=c.when?new Date(c.when).toLocaleDateString("en-GB",{day:"numeric",month:"long"}):"";
  return "<b>"+esc(c.title||"A version")+"</b><code>"+esc(c.short||"")+"</code>"+(b.idea?" · on "+esc(b.idea):b.kind==="arch"?" · brought in":" · on "+esc(TREE.main))+(when?" · "+when:"");}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function showTip(B){if(!B){tip.classList.remove("fbt-show");return;}tip.innerHTML=words(B.b);var x=B.x+B.r+10,y=B.y-14;if(x>300)x=B.x-B.r-10-200;tip.style.left=Math.max(0,x)+"px";tip.style.top=Math.max(0,y)+"px";tip.classList.add("fbt-show");}
function bind(){stage.addEventListener("pointerenter",function(){TARGET=0;kick();});
  stage.addEventListener("pointerleave",function(){TARGET=1;HOVER=null;showTip(null);stage.classList.remove("fbt-on-bead");kick();});
  stage.addEventListener("pointerdown",function(e){var p=at(e);DRAG={x:p.x,a:ANG,moved:false,id:e.pointerId};try{stage.setPointerCapture(e.pointerId);}catch(_){}stage.classList.add("fbt-drag");});
  stage.addEventListener("pointermove",function(e){var p=at(e);if(DRAG){var dx=p.x-DRAG.x;if(Math.abs(dx)>3)DRAG.moved=true;if(DRAG.moved){ANG=DRAG.a+dx*0.012;HOVER=null;showTip(null);kick();return;}}
    var B=hit(p),b=B?B.b:null;if(b!==HOVER){HOVER=b;showTip(B);stage.classList.toggle("fbt-on-bead",!!b);kick();}});
  stage.addEventListener("pointerup",function(e){var d=DRAG;DRAG=null;stage.classList.remove("fbt-drag");try{stage.releasePointerCapture(e.pointerId);}catch(_){}
    if(d&&d.moved)return;var B=hit(at(e));if(B)press(B.b);});}
function press(b){var x=X();if(!x||!TREE||TREE.demo)return;if(W.IngSound&&IngSound.play)try{IngSound.play("paper");}catch(e){}
  /* 6.97: the page stays where it is. Her word (6.95): "please remove the scrolling down the page effect from it and everywhere else.
     I dislike it." Compare opens in its sheet in the window; the changes waiting open in the panels below, as the steps' keys do */
  if(b.wait){x.S.view="changes";x.paint();return;}var c=b.c||{};if(!c.oid)return;
  if(W.fbHub&&fbHub.open)fbHub.open("compare",{a:(c.parents&&c.parents[0])||"empty",b:c.oid});}

/* ---------- the header, made as Lector's and Vocatio's are ---------- */
var BRING='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="M7.5 10.5L12 15l4.5-4.5"/><path d="M5 19h14"/></svg>';
function build(){var K=KIT();page=D.getElementById("page-fabrica");var host=D.getElementById("fbHost");if(!K||!page||!host)return false;if(HD&&HD.el.isConnected)return true;
  HD=K.hero({title:"Fabrica",eyebrow:"Fabrica · the tree of your versions",
    lede:"Your workshop, on this device: each of your apps kept with every version, changed, tested and shipped from here. Every idea grows from its trunk, and nothing leaves this device unless you send it.",
    keys:[{pri:true,ico:K.ICO.plus,txt:"New app",id:"fbtGo",fn:primary},{ico:BRING,txt:"Bring one in",id:"fbtBring",fn:function(){var k=D.getElementById("fbBring");if(k)k.click();}}],
    says:" ",hint:"Point at the tree to still it; press a version to see what it changed, in the panels below."});
  stage=mk("div","fbt-stage");stage.setAttribute("role","img");cv=D.createElement("canvas");cv.className="fbt-cv";stage.appendChild(cv);tip=mk("div","fbt-tip");stage.appendChild(tip);
  HD.obj.appendChild(stage);tag=K.label(HD.obj,352,44,1,0,"","","fbt-label");says=HD.words.querySelector(".skh-says");
  host.parentNode.insertBefore(HD.el,host);bind();
  /* out of view the tree rests (r290's watch marks the head away); back in view it turns again */
  try{new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)kick();});},{threshold:0}).observe(HD.el);}catch(e){}
  return true;}
/* the head's keys do not scroll the page, as r290's do not (her word in 6.95); a sheet they open stands in the window (above) */
function primary(){var k=D.getElementById("fbNew");if(k)k.click();}
/* the four steps, as Fabrica's own (Change, Keep, Test, Ship) stand now */
var STEPS=[["Change","its files"],["Keep","a version"],["Test","its checks"],["Ship","to your devices"]];
function paintSteps(){var K=KIT(),host=D.getElementById("fbHost");if(!K||!HD||!host)return;var li=[].slice.call(D.querySelectorAll("#fbSteps li[data-s]")),now=-1,done=[];
  li.forEach(function(e,i){if(e.classList.contains("now"))now=i;if(e.classList.contains("done"))done.push(i);});
  var key=now+"|"+done.join(",");if(key===ROWKEY&&row&&row.isConnected)return;ROWKEY=key;
  if(row&&row.parentNode)row.parentNode.removeChild(row);
  row=K.steps(STEPS.map(function(s,i){return {name:s[0],sub:s[1],now:i===now,done:done.indexOf(i)>=0||(now>=0&&i<now)};}),function(i){var x=X();if(!x)return;
    if(i<2){x.S.view="changes";x.paint();}else if(x.one&&x.one()&&x.setPanel)x.setPanel("ship");});
  host.parentNode.insertBefore(row,host);}
function plural(n,a,b){return n+" "+(n===1?a:(b||a+"s"));}
function setText(e,s){if(e&&e.textContent!==s)e.textContent=s;}
function words2(r,T,wait){if(!HD)return;var K=KIT(),go=D.getElementById("fbtGo");
  if(!r){says.textContent="No app chosen yet: choose one in Your apps below, or start a new one, and its versions grow here.";
    setTag("Your apps","choose one below");stage.setAttribute("aria-label","The tree of versions, waiting for an app");if(go&&go.lastChild)go.lastChild.textContent="New app";return;}
  var ideas=(r.branches||[]).length-1,tags=(r.tags||[]).length;
  says.innerHTML="";says.appendChild(D.createTextNode(r.name+" · "+(r.detached?"an older version":(r.branch||"main"))+" · "+(T&&T.total?(T.total>=80?"80 and more versions":plural(T.total,"version")):"no version kept yet")+
    (ideas>0?" · "+plural(ideas,"idea"):"")+(tags?" · "+plural(tags,"release"):"")+(wait?". ":".")));
  if(wait){var w=mk("b","fbt-wait",plural(wait,"change")+" not kept yet.");says.appendChild(w);}
  var top=T&&T.trunk&&T.trunk.length?T.trunk[T.trunk.length-1]:null;setTag(top?(top.title||"The newest version"):r.name,top?(top.short+" · the newest on "+(T.main||"main")):"no version kept yet");
  HD.hint.innerHTML="Point at the tree to still it; <b>press a version</b> to see what it changed, in the panels below.";stage.setAttribute("aria-label","The tree of "+r.name+"'s versions");
}
function setTag(a,b){if(!tag)return;var x=tag.querySelector("b"),y=tag.querySelector("small");a=String(a||"");if(a.length>24)a=a.slice(0,23).replace(/\s+\S*$/,"")+"…";setText(x,a);setText(y,b);}
function refresh(){var x=X();if(!x||!HD)return;paintSteps();var r=x.cur&&x.cur(),st=null;try{st=r&&x.statusOf?x.statusOf(r):null;}catch(e){}
  var wait=st&&st.changes?st.changes.length:0,sig=r?[r.id,r.head,(r.branches||[]).join(","),(r.tags||[]).join(","),wait,night()?1:0].join("|"):"none|"+(night()?1:0);
  if(sig===SIG)return;SIG=sig;words2(r,TREE&&r&&TREE.id===r.id?TREE:null,wait);
  if(!r){TREE=null;draw();kick();return;}var my=++LOADING;
  read(r).then(function(T){if(my!==LOADING)return;T.id=r.id;T.waiting=wait;TREE=T.empty?null:T;words2(r,TREE,wait);draw();kick();},function(){});}
function on(){page=D.getElementById("page-fabrica");if(!page||!KIT())return;page.classList.add("sk-on");if(!build())return;SIG="";ROWKEY="";refresh();kick();try{if(W.IngHeadsFit)W.IngHeadsFit();}catch(e){}}
var og=W.go;if(typeof og==="function")W.go=function(p){var r=og.apply(this,arguments);try{if(p==="fabrica")setTimeout(on,0);}catch(e){}return r;};
/* Fabrica paints often: the head follows what it shows, read again only when the app, its versions or its changes move */
(function(){var x=X();if(!x||!x.paint)return;var op=x.paint;x.paint=function(){var r=op.apply(this,arguments);try{if(HD&&page&&page.offsetParent)refresh();}catch(e){}return r;};})();
try{new MutationObserver(function(){SIG="";refresh();draw();kick();}).observe(D.body,{attributes:true,attributeFilter:["data-theme","data-motion"]});}catch(e){}
/* the sheets now stand in the window, so a press begun inside one and let go outside it would land on its backdrop and close it: a press
   that begins inside a sheet never closes it; one that begins on the backdrop still does, as before */
(function(){var inSheet=false;
  D.addEventListener("pointerdown",function(e){var t=e.target;inSheet=!!(t&&t.closest&&t.closest("#page-fabrica.sk-on #fb .f-sheet"));},true);
  D.addEventListener("click",function(e){var t=e.target;if(inSheet&&t&&t.classList&&t.classList.contains("f-sheet-wrap")&&t.closest("#page-fabrica.sk-on")){e.stopPropagation();}inSheet=false;},true);})();
W.IngTree={on:on,refresh:function(){SIG="";refresh();},state:function(){return {tree:TREE?{trunk:TREE.trunk.length,arches:TREE.arches.length,branches:TREE.branches.length,tags:TREE.tags.length,waiting:TREE.waiting}:null,angle:ANG,beads:BEADS.length,head:!!(HD&&HD.el.isConnected)};},draw:draw};
try{window.__ingParts["p294"]="running";}catch(_){}
})();
</script>
