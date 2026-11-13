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

/* ---------- drawing: back to front, as the turret's metal and glass are drawn ---------- */
function tube(g,q,w,P,kind){if(q.length<2)return;var k=0;q.forEach(function(p){k+=p.k;});k/=q.length;var ww=w*k;
  function path(dx,dy){g.beginPath();g.moveTo(q[0].x+dx,q[0].y+dy);for(var i=1;i<q.length;i++)g.lineTo(q[i].x+dx,q[i].y+dy);}
  g.lineCap="round";g.lineJoin="round";
  path(0,0);g.strokeStyle=P.lo;g.lineWidth=ww;g.stroke();
  path(ww*0.04,ww*0.06);g.strokeStyle=P.m1;g.lineWidth=ww*0.84;g.stroke();
  path(-ww*0.06,-ww*0.08);g.strokeStyle=P.m0;g.lineWidth=ww*0.56;g.stroke();
  path(-ww*0.17,-ww*0.2);g.strokeStyle=P.hi;g.globalAlpha=kind==="trunk"?0.8:0.7;g.lineWidth=Math.max(0.9,ww*0.17);g.stroke();g.globalAlpha=1;}
function bead(g,q,r,P,o){var R=r*q.k*(o.grow||1);var x=q.x,y=q.y-(o.lift||0);if(o.far)g.globalAlpha=0.82;
  g.fillStyle=P.shadow;g.beginPath();g.ellipse(x+R*0.18,y+R*0.42,R*0.95,R*0.55,0,0,TAU);g.globalAlpha=0.35;g.fill();g.globalAlpha=1;
  var gl=g.createRadialGradient(x-R*0.35,y-R*0.4,R*0.08,x,y,R);gl.addColorStop(0,rgba(P.g0,1));gl.addColorStop(.35,rgba(P.g1,1));gl.addColorStop(.75,rgba(P.g2,1));gl.addColorStop(1,rgba(P.g3,1));
  g.fillStyle=gl;g.beginPath();g.arc(x,y,R,0,TAU);g.fill();
  g.strokeStyle="rgba(255,255,255,.35)";g.lineWidth=Math.max(0.6,R*0.08);g.beginPath();g.arc(x,y,R*0.92,Math.PI*1.05,Math.PI*1.65);g.stroke();
  var hl=g.createRadialGradient(x-R*0.38,y-R*0.45,0,x-R*0.38,y-R*0.45,R*0.5);hl.addColorStop(0,"rgba(255,255,255,.9)");hl.addColorStop(1,"rgba(255,255,255,0)");
  g.fillStyle=hl;g.beginPath();g.ellipse(x-R*0.35,y-R*0.42,R*0.42,R*0.26,-0.6,0,TAU);g.fill();
  if(o.star){var s=R*0.62;g.fillStyle=P.star;g.beginPath();g.moveTo(x,y-s);g.quadraticCurveTo(x+s*0.16,y-s*0.16,x+s,y);g.quadraticCurveTo(x+s*0.16,y+s*0.16,x,y+s);
    g.quadraticCurveTo(x-s*0.16,y+s*0.16,x-s,y);g.quadraticCurveTo(x-s*0.16,y-s*0.16,x,y-s);g.closePath();g.globalAlpha=0.94;g.fill();g.globalAlpha=1;
    g.strokeStyle="rgba(255,255,255,.55)";g.lineWidth=Math.max(1,R*0.07);g.beginPath();g.arc(x,y,R*1.12,0,TAU);g.stroke();}g.globalAlpha=1;}
function collarArc(g,cx,cy,rx,ry,from,to,P,w){g.lineCap="butt";g.strokeStyle=P.lo;g.lineWidth=w+1.6;g.beginPath();g.ellipse(cx,cy,rx,ry,0,from,to);g.stroke();
  g.strokeStyle=P.m1;g.lineWidth=w;g.beginPath();g.ellipse(cx,cy,rx,ry,0,from,to);g.stroke();g.strokeStyle=P.hi;g.lineWidth=Math.max(0.8,w*0.3);g.beginPath();g.ellipse(cx,cy-w*0.25,rx,ry,0,from,to);g.stroke();}
function plinth(g,P){var cx=CX,cy=BASEY+6,rx=132,ry=132*Math.sin(PITCH)+4,side=20;
  var sh=g.createRadialGradient(cx,cy+side+10,10,cx,cy+side+10,rx*1.15);sh.addColorStop(0,P.shadow);sh.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=sh;g.beginPath();g.ellipse(cx,cy+side+10,rx*1.15,ry*1.4,0,0,TAU);g.fill();
  var sd=g.createLinearGradient(cx-rx,0,cx+rx,0);sd.addColorStop(0,P.m1);sd.addColorStop(.35,P.m0);sd.addColorStop(.6,P.m2);sd.addColorStop(1,P.m1);
  g.fillStyle=sd;g.beginPath();g.ellipse(cx,cy+side,rx,ry,0,0,Math.PI);g.lineTo(cx-rx,cy);g.ellipse(cx,cy,rx,ry,0,Math.PI,0,true);g.closePath();g.fill();
  g.save();g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,TAU);g.clip();var tp=g.createRadialGradient(cx-rx*0.2,cy-ry*0.6,4,cx,cy,rx);tp.addColorStop(0,P.plate0);tp.addColorStop(1,P.plate1);g.fillStyle=tp;g.fillRect(cx-rx,cy-ry,rx*2,ry*2);
  g.translate(cx,cy);g.scale(1,ry/rx);for(var r=6;r<rx;r+=1.6){var nn=(Math.sin(r*1.9)+Math.sin(r*.41+1.1))/2;g.strokeStyle="rgba("+(night()?"255,255,255,":"46,23,100,")+(0.035+nn*0.02)+")";g.lineWidth=0.8;g.beginPath();g.arc(0,0,r,0,TAU);g.stroke();}
  g.restore();g.strokeStyle=P.rim;g.lineWidth=1.4;g.beginPath();g.ellipse(cx,cy,rx-1,ry-0.5,0,Math.PI*1.02,Math.PI*1.98);g.stroke();
  var sk=g.createRadialGradient(cx,cy,2,cx,cy,rx*0.3);sk.addColorStop(0,P.shadow);sk.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=sk;g.beginPath();g.ellipse(cx,cy,rx*0.3,ry*0.3,0,0,TAU);g.fill();
  g.strokeStyle=P.lo;g.globalAlpha=0.35;g.lineWidth=1.1;g.beginPath();g.ellipse(cx,cy,rx*0.7,ry*0.7,0,0,TAU);g.stroke();g.strokeStyle=P.rim;g.globalAlpha=0.6;g.beginPath();g.ellipse(cx,cy+1,rx*0.7,ry*0.7,0,0.05,Math.PI-0.05);g.stroke();g.globalAlpha=1;
  /* engraved: a tick for each of 72 steps round the rim, longer every ninth, turning with the tree */
  for(var i=0;i<72;i++){var a=i*TAU/72+ANG,ca=Math.cos(a),sa=Math.sin(a),l=i%9===0?0.88:0.93;
    g.strokeStyle=sa>0?P.lo:P.rim;g.globalAlpha=sa>0?0.5:0.35;g.lineWidth=i%9===0?1.4:0.8;g.beginPath();g.moveTo(cx+ca*rx*l,cy+sa*ry*l);g.lineTo(cx+ca*(rx-3),cy+sa*(ry-1));g.stroke();}
  g.globalAlpha=1;
  var words=TREE&&!TREE.demo?(String(TREE.name||"").toUpperCase()+"  ·  "+(TREE.total>=80?"80+":TREE.total)+" VERSIONS"):"THE TREE OF YOUR VERSIONS";
  g.save();g.font="600 9.5px "+'Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';try{g.letterSpacing="2.2px";}catch(e){}g.textAlign="center";g.textBaseline="middle";
  g.fillStyle=P.hi;g.globalAlpha=0.7;g.fillText(words,cx,cy+ry+side*0.5+0.8);g.fillStyle=P.ink;g.globalAlpha=0.62;g.fillText(words,cx,cy+ry+side*0.5);g.restore();}
function foot(g,P){var q=proj([0,0,0],ANG),rx=30,ry=rx*Math.sin(PITCH)+2,h=12,x=q.x,y=q.y+2;
  var sd=g.createLinearGradient(x-rx,0,x+rx,0);sd.addColorStop(0,P.m1);sd.addColorStop(.38,P.m0);sd.addColorStop(.62,P.m2);sd.addColorStop(1,P.m1);
  g.fillStyle=sd;g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI);g.lineTo(x-rx*0.7,y-h);g.ellipse(x,y-h,rx*0.7,ry*0.7,0,Math.PI,0,true);g.closePath();g.fill();
  var tp=g.createRadialGradient(x-6,y-h-3,1,x,y-h,rx*0.7);tp.addColorStop(0,P.plate0);tp.addColorStop(1,P.m1);g.fillStyle=tp;g.beginPath();g.ellipse(x,y-h,rx*0.7,ry*0.7,0,0,TAU);g.fill();
  g.strokeStyle=P.rim;g.lineWidth=1;g.beginPath();g.ellipse(x,y-h,rx*0.7-0.5,ry*0.7-0.5,0,Math.PI*1.05,Math.PI*1.95);g.stroke();}
function draw(){if(!cv)return;var d=dpr(),px=Math.round(460*d);if(cv.width!==px){cv.width=px;cv.height=px;}var g=cv.getContext("2d");if(!g)return;
  g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,460,460);var P=PAL(),T=TREE||demo(),S=T._shape||(T._shape=shape(T)),ang=ANG,prims=[];BEADS=[];
  var halo=g.createRadialGradient(CX,200,10,CX,220,230);halo.addColorStop(0,night()?"rgba(183,156,230,.16)":"rgba(255,255,255,.75)");halo.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=halo;g.fillRect(0,0,460,460);
  plinth(g,P);foot(g,P);
  S.tubes.forEach(function(t){var q=t.pts.map(function(p){return proj(p,ang);});
    if(t.kind==="trunk"){prims.push({z:0.4,f:function(){tube(g,q,t.w,P,t.kind);}});return;}
    /* a branch or an arch in runs: the part behind the trunk drawn before it, the part in front after */
    var run=[q[0]],back=q[0].z>0;for(var i=1;i<q.length;i++){var bk=q[i].z>0;run.push(q[i]);
      if(bk!==back||i===q.length-1){var r2=run.slice(),zz=0;r2.forEach(function(p){zz+=p.z;});zz/=r2.length;
        prims.push({z:back?Math.max(zz,1):Math.min(zz,-1),f:function(rr){return function(){tube(g,rr,t.w,P,t.kind);};}(r2)});run=[q[i]];back=bk;}}});
  S.collars.forEach(function(c){var q=proj([0,c.h,0],ang),rx=21*q.k,ry=rx*Math.sin(PITCH)+2;
    prims.push({z:q.z+0.5,f:function(){collarArc(g,q.x,q.y,rx,ry,Math.PI,TAU,P,5.5);}});prims.push({z:q.z-0.5,f:function(){collarArc(g,q.x,q.y,rx,ry,0,Math.PI,P,5.5);
      if(c.name){g.save();g.font="italic 600 12px "+'"Home Cormorant","Cormorant Garamond",Cormorant,Georgia,serif';g.textBaseline="middle";g.fillStyle=P.ink;g.globalAlpha=0.85;
        g.strokeStyle=P.lo;g.lineWidth=1;g.beginPath();g.moveTo(q.x+rx+2,q.y);g.lineTo(q.x+rx+12,q.y);g.stroke();g.fillText(c.name,q.x+rx+15,q.y+0.5);g.restore();}}});});
  S.beads.forEach(function(b){var q=proj(b.p,ang),on=HOVER===b,o={grow:on?1.28:1,lift:on?3:0,star:!!b.head,far:q.z>40};BEADS.push({b:b,x:q.x,y:q.y,r:b.r*q.k});prims.push({z:q.z-0.01,f:function(){bead(g,q,b.r,P,o);}});});
  if(TREE&&TREE.waiting){var hb=S.beads.filter(function(b){return b.head;})[0];if(hb){var q=proj([0,hb.p[1]+50,0],ang),t=(Date.now()%2400)/2400,R=11*q.k;
    prims.push({z:q.z,f:function(){var tq=proj([0,hb.p[1]+22,0],ang);g.setLineDash([2,3]);g.strokeStyle=P.wait;g.lineWidth=1.2;g.beginPath();g.moveTo(tq.x,tq.y);g.lineTo(q.x,q.y+R);g.stroke();
      g.globalAlpha=0.42+0.12*Math.sin(t*TAU);bead(g,q,11,P,{});g.globalAlpha=1;g.setLineDash([3,3]);g.strokeStyle=P.wait;g.lineWidth=1.4;g.beginPath();g.arc(q.x,q.y,R*1.25,0,TAU);g.stroke();g.setLineDash([]);}});
    BEADS.push({b:{wait:true},x:q.x,y:q.y,r:R});}}
  prims.sort(function(a,b){return b.z-a.z;});prims.forEach(function(p){p.f();});
  if(T.demo){g.globalCompositeOperation="destination-out";g.fillStyle="rgba(0,0,0,.45)";g.fillRect(0,0,460,460);g.globalCompositeOperation="source-over";}}

/* ---------- motion: a slow turn, stilled under the pointer, turned by a drag ---------- */
function loop(t){RAF=0;if(!page||!page.offsetParent||D.hidden||!HD||HD.el.classList.contains("is-away"))return;var dt=Math.min(64,t-(LAST||t));LAST=t;
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
function press(b){var x=X();if(!x||!TREE||TREE.demo)return;if(W.IngSound&&IngSound.play)try{IngSound.play("keyTouch");}catch(e){}
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
  HD.hint.innerHTML="Point at the tree to still it; <b>press a version</b> to see what it changed.";stage.setAttribute("aria-label","The tree of "+r.name+"'s versions");
}
function setTag(a,b){if(!tag)return;var x=tag.querySelector("b"),y=tag.querySelector("small");a=String(a||"");if(a.length>24)a=a.slice(0,23).replace(/\s+\S*$/,"")+"…";setText(x,a);setText(y,b);}
function refresh(){var x=X();if(!x||!HD)return;paintSteps();var r=x.cur&&x.cur(),st=null;try{st=r&&x.statusOf?x.statusOf(r):null;}catch(e){}
  var wait=st&&st.changes?st.changes.length:0,sig=r?[r.id,r.head,(r.branches||[]).join(","),(r.tags||[]).join(","),wait,night()?1:0].join("|"):"none|"+(night()?1:0);
  if(sig===SIG)return;SIG=sig;words2(r,TREE&&r&&TREE.id===r.id?TREE:null,wait);
  if(!r){TREE=null;draw();kick();return;}var my=++LOADING;
  read(r).then(function(T){if(my!==LOADING)return;T.id=r.id;T.waiting=wait;TREE=T.empty?null:T;words2(r,TREE,wait);draw();kick();},function(){});}
function on(){page=D.getElementById("page-fabrica");if(!page||!KIT())return;page.classList.add("sk-on");if(!build())return;SIG="";ROWKEY="";refresh();kick();}
var og=W.go;if(typeof og==="function")W.go=function(p){var r=og.apply(this,arguments);try{if(p==="fabrica")setTimeout(on,0);}catch(e){}return r;};
/* Fabrica paints often: the head follows what it shows, read again only when the app, its versions or its changes move */
(function(){var x=X();if(!x||!x.paint)return;var op=x.paint;x.paint=function(){var r=op.apply(this,arguments);try{if(HD&&page&&page.offsetParent)refresh();}catch(e){}return r;};})();
try{new MutationObserver(function(){SIG="";refresh();draw();}).observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}
/* the sheets now stand in the window, so a press begun inside one and let go outside it would land on its backdrop and close it: a press
   that begins inside a sheet never closes it; one that begins on the backdrop still does, as before */
(function(){var inSheet=false;
  D.addEventListener("pointerdown",function(e){var t=e.target;inSheet=!!(t&&t.closest&&t.closest("#page-fabrica.sk-on #fb .f-sheet"));},true);
  D.addEventListener("click",function(e){var t=e.target;if(inSheet&&t&&t.classList&&t.classList.contains("f-sheet-wrap")&&t.closest("#page-fabrica.sk-on")){e.stopPropagation();}inSheet=false;},true);})();
W.IngTree={on:on,refresh:function(){SIG="";refresh();},state:function(){return {tree:TREE?{trunk:TREE.trunk.length,arches:TREE.arches.length,branches:TREE.branches.length,tags:TREE.tags.length,waiting:TREE.waiting}:null,angle:ANG,beads:BEADS.length,head:!!(HD&&HD.el.isConnected)};},draw:draw};
try{window.__ingParts["p294"]="running";}catch(_){}
})();
</script>
