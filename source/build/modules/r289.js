<style id="r289-css">
/* ============ R289 · BUILD'S HEAD: THE PRISM OF YOUR PAGE (Ingenium 6.93, 12 November 2026; held for the owner's preview) ============
   The owner's answer (12 November 2026) on what the Build page should get: "A 3D head like the rest". A new look waits for the owner's
   preview (build/held.json) before it rides in a release.
   - Build's head (modules/r284.js IngHeads): its title and words, Run your page (the page's own Run key, pressed for you) and Load a
     sample, and a line: your code on one side, your page running on the other.
   - The prism: a block of lavender glass, three-sided, on a turned plinth. A ray of white light, the code, comes in from the left; it
     leaves the prism as a fan of Ingenium's violets, the page it becomes. The prism turns a little on its plinth when left alone;
     pointed at, it comes to rest facing you; pressed, it runs your page. Beside it, how many lines your code has and whether the
     page runs as you type. Minimal motion and the system's reduced motion keep it still. */
#page-build.hd-on > .hd-head .hd-tag{right:6px;top:30px;max-width:200px}
#page-build.hd-on .hd-hit{left:150px;top:112px;width:220px;height:230px;border-radius:24px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p289"]="started";}catch(_){}
/* R289 · Build's head, the prism of your page: see the note at the top of its styles */
(function(){"use strict";
if(window.__r289)return;window.__r289=1;
var D=document,W=window,TAU=Math.PI*2,H=null;
var B={C:null,cv:null,g:null,t:0,sw:0,amp:1,hold:false,hover:false,down:false,lift:0,loop:null,W:520,H:460};
var G={cx:258,cy:250,e:12*Math.PI/180,F:1200};
function $(id){return D.getElementById(id);}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function proj(x,y,z,turn){var c=Math.cos(turn),s=Math.sin(turn),X=x*c+z*s,Z=-x*s+z*c,ce=Math.cos(G.e),se=Math.sin(G.e),Y=y*ce+Z*se,Z2=-y*se+Z*ce,k=G.F/(G.F-Z2);return [G.cx+X*k,G.cy+Y*k,Z2,k];}
var PL={sig:"",cv:null};
function plinth(){var d=H.dpr(),n=H.night(),sig=d+"|"+(n?1:0);if(PL.sig===sig)return PL.cv;PL.sig=sig;var cv=PL.cv||D.createElement("canvas");cv.width=Math.round(B.W*d);cv.height=Math.round(B.H*d);
  var g=cv.getContext("2d");g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,B.W,B.H);var bx=G.cx,by=G.cy+70,rx=128,ry=rx*Math.sin(G.e)*1.2,th=20;
  H.cast(g,bx+8,by+th+ry*.7,rx*1.15,ry*1.7,.2);
  var sg=g.createLinearGradient(bx-rx,0,bx+rx,0);if(n){sg.addColorStop(0,"#0b0812");sg.addColorStop(.3,"#2b2240");sg.addColorStop(.62,"#1b1529");sg.addColorStop(1,"#09060e");}
  else{sg.addColorStop(0,"#a08dc9");sg.addColorStop(.3,"#ece6f8");sg.addColorStop(.64,"#cdbfe8");sg.addColorStop(1,"#9481bf");}
  g.beginPath();g.ellipse(bx,by,rx,ry,0,0,Math.PI);g.lineTo(bx-rx,by+th);g.ellipse(bx,by+th,rx,ry,0,Math.PI,0,true);g.closePath();g.fillStyle=sg;g.fill();
  var fg=g.createRadialGradient(bx-rx*.25,by-ry*.7,rx*.05,bx,by,rx);if(n){fg.addColorStop(0,"#30264a");fg.addColorStop(1,"#171126");}else{fg.addColorStop(0,"#ffffff");fg.addColorStop(1,"#dcd2ef");}
  g.beginPath();g.ellipse(bx,by,rx,ry,0,0,TAU);g.fillStyle=fg;g.fill();g.lineWidth=1.2;g.strokeStyle=n?"rgba(190,170,240,.25)":"rgba(255,255,255,.95)";g.beginPath();g.ellipse(bx,by,rx-.6,ry-.4,0,0,Math.PI);g.stroke();
  [.8,.6].forEach(function(f){g.beginPath();g.ellipse(bx,by,rx*f,ry*f,0,0,TAU);g.strokeStyle=n?"rgba(205,184,240,.08)":"rgba(90,64,150,.14)";g.lineWidth=.9;g.stroke();});
  PL.cv=cv;return cv;}
/* the prism: a triangle (apex up) drawn out in depth, standing on the plinth */
var TRI=[[0,-128],[-104,62],[104,62]],DEPTH=46;
function rays(g,a,b,turn,n){/* the white ray in, the fan of violets out, from the middle of the left face to past the right */
  var L0=proj((TRI[0][0]+TRI[1][0])/2,(TRI[0][1]+TRI[1][1])/2+6,0,turn),R0=proj((TRI[0][0]+TRI[2][0])/2,(TRI[0][1]+TRI[2][1])/2+4,0,turn);
  var src=[G.cx-262,G.cy-6];g.save();g.lineCap="round";
  var wg=g.createLinearGradient(src[0],src[1],L0[0],L0[1]);wg.addColorStop(0,"rgba(255,255,255,0)");wg.addColorStop(.35,n?"rgba(240,232,255,.75)":"rgba(255,255,255,.95)");wg.addColorStop(1,n?"rgba(240,232,255,.95)":"rgba(255,255,255,1)");
  g.strokeStyle=n?"rgba(150,120,220,.25)":"rgba(120,90,190,.18)";g.lineWidth=9;g.beginPath();g.moveTo(src[0],src[1]);g.lineTo(L0[0],L0[1]);g.stroke();
  g.strokeStyle=wg;g.lineWidth=4;g.beginPath();g.moveTo(src[0],src[1]);g.lineTo(L0[0],L0[1]);g.stroke();
  g.globalAlpha=.55;g.strokeStyle=n?"rgba(240,232,255,.6)":"rgba(255,255,255,.95)";g.lineWidth=3;g.beginPath();g.moveTo(L0[0],L0[1]);g.lineTo(R0[0],R0[1]);g.stroke();g.globalAlpha=1;
  var cols=n?["#f2eaff","#d6c2ff","#b18cf6","#9466e6","#7746cf"]:["#e9ddff","#c9b0fb","#a580ee","#8559d8","#6a3fb5"];
  cols.forEach(function(c,i){var ang=-.17+i*.085,len=150,ex=R0[0]+Math.cos(ang)*len,ey=R0[1]+Math.sin(ang)*len*1+i*2;var rg=g.createLinearGradient(R0[0],R0[1],ex,ey);
    rg.addColorStop(0,H.rgba(c,.95));rg.addColorStop(1,H.rgba(c,0));g.strokeStyle=rg;g.lineWidth=4.2;g.beginPath();g.moveTo(R0[0],R0[1]);g.lineTo(ex,ey);g.stroke();});
  g.restore();}
function face(g,P,fill,edge,glint){g.beginPath();g.moveTo(P[0][0],P[0][1]);for(var i=1;i<P.length;i++)g.lineTo(P[i][0],P[i][1]);g.closePath();g.fillStyle=fill;g.fill();
  g.lineJoin="round";g.strokeStyle=edge;g.lineWidth=1.3;g.stroke();if(glint){g.strokeStyle=glint;g.lineWidth=.8;g.stroke();}}
function draw(){var cv=B.cv;if(!cv)return;var d=H.dpr(),Wd=Math.round(B.W*d),Hd=Math.round(B.H*d);if(cv.width!==Wd||cv.height!==Hd){cv.width=Wd;cv.height=Hd;}
  var g=B.g||(B.g=cv.getContext("2d"));g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,B.W,B.H);var n=H.night(),turn=B.sw,lift=B.lift*5-(B.down?2:0);
  g.drawImage(plinth(),0,0,B.W,B.H);
  var ly=-lift;function V(i,z){return proj(TRI[i][0],TRI[i][1]+ly,z,turn);}
  var F=[V(0,DEPTH),V(1,DEPTH),V(2,DEPTH)],K=[V(0,-DEPTH),V(1,-DEPTH),V(2,-DEPTH)];
  var faces=[{p:[F[0],F[1],F[2]],kind:"tri"},{p:[K[0],K[2],K[1]],kind:"tri"},{p:[F[0],K[0],K[1],F[1]],kind:"left"},{p:[F[0],F[2],K[2],K[0]],kind:"right"},{p:[F[1],K[1],K[2],F[2]],kind:"floor"}];
  faces.forEach(function(f){f.z=f.p.reduce(function(s,q){return s+q[2];},0)/f.p.length;});faces.sort(function(a,b){return a.z-b.z;});
  /* its shadow on the plinth */
  H.cast(g,G.cx+10,G.cy+70,118,18,.16);
  var glass=n?{tri:"rgba(150,120,230,.22)",left:"rgba(190,165,255,.26)",right:"rgba(110,80,200,.30)",floor:"rgba(70,50,140,.35)",edge:"rgba(220,205,255,.75)",glint:"rgba(255,255,255,.35)"}
    :{tri:"rgba(206,190,248,.30)",left:"rgba(255,255,255,.42)",right:"rgba(160,130,230,.30)",floor:"rgba(120,90,200,.32)",edge:"rgba(110,80,190,.55)",glint:"rgba(255,255,255,.9)"};
  var half=Math.ceil(faces.length/2);
  faces.slice(0,half).forEach(function(f){face(g,f.p,glass[f.kind],glass.edge,null);});
  rays(g,null,null,turn,n);
  faces.slice(half).forEach(function(f){var fill=glass[f.kind];if(f.kind==="tri"){var tg=g.createLinearGradient(f.p[1][0],f.p[1][1],f.p[0][0],f.p[0][1]);tg.addColorStop(0,n?"rgba(120,90,210,.28)":"rgba(190,170,245,.34)");tg.addColorStop(1,n?"rgba(210,190,255,.20)":"rgba(255,255,255,.55)");fill=tg;}
    face(g,f.p,fill,glass.edge,glass.glint);});
  /* a glint along the apex edge, from the light above on the left */
  g.save();g.strokeStyle=n?"rgba(255,255,255,.55)":"rgba(255,255,255,1)";g.lineWidth=1.6;g.lineCap="round";g.beginPath();g.moveTo(F[0][0]-1,F[0][1]+2);g.lineTo(F[1][0]+8,F[1][1]-14);g.stroke();g.restore();}
function step(dt){var goal=(B.hold||H.still())?0:1;B.amp+=(goal-B.amp)*Math.min(1,dt/450);if(Math.abs(goal-B.amp)<.002)B.amp=goal;if(!B.hold&&!H.still())B.t+=dt*(H.motion()==="full"?1.3:1);
  B.sw=B.amp*(18*Math.PI/180)*Math.sin(B.t/16000*TAU);var lg=B.hover?1:0;B.lift+=(lg-B.lift)*Math.min(1,dt/140);if(Math.abs(lg-B.lift)<.01)B.lift=lg;draw();
  return !(B.amp===0&&goal===0&&B.lift===lg);}
function run(){var C=B.C;if(!C||!C.shown){if(B.loop)B.loop.stop();return;}if(!B.loop)B.loop=H.Loop(step);B.loop.start();}
function lines(){var e=$("codeEditor");var v=e?String(e.value||""):"";return v?v.split("\n").length:0;}
function paint(){var C=B.C;if(!C||!C.on)return;var n=lines(),auto=$("autoRun");C.tagSet(n?n+(n===1?" line":" lines"):"An empty page",auto&&auto.checked?"runs as you type":"runs when you press Run");}
function runPage(){var r=$("runBtn");if(r)r.click();if(B.C)B.C.toRoom("#buildGrid");}
function sample(){var s=$("sampleBtn");if(s)s.click();if(B.C)B.C.toRoom("#buildGrid");}
function start(){H=W.IngHeads;if(!H||!$("page-build")){if((B.tries=(B.tries||0)+1)<240)setTimeout(start,500);return;}
  B.C=H.mount({page:"page-build",label:"Build",eyebrow:"Build · the prism of your page",cls:"hd-build",
    keys:[{name:"run",id:"hdBuildRun",text:"Run your page",icon:"run",primary:true,click:runPage},{name:"sample",id:"hdBuildSample",text:"Load a sample",icon:"open",click:sample}],
    line:"Your code on one side, your page running on the other: try an idea, check a snippet, or let a model help you fix it.",
    scene:function(C){var cv=mk("canvas","hd-cv");cv.setAttribute("aria-hidden","true");C.box.appendChild(cv);B.cv=cv;
      var hit=mk("button","hd-hit hd-key");hit.type="button";hit.id="hdBuildPrism";hit.setAttribute("aria-label","Run your page");C.box.appendChild(hit);
      hit.addEventListener("pointerenter",function(e){if(e.pointerType!=="touch"){B.hover=true;run();}});hit.addEventListener("pointerleave",function(){B.hover=false;B.down=false;run();});
      hit.addEventListener("pointerdown",function(){B.down=true;run();});["pointerup","pointercancel"].forEach(function(t){hit.addEventListener(t,function(){B.down=false;run();});});
      hit.addEventListener("click",function(e){e.preventDefault();runPage();});hit.addEventListener("focus",function(){B.hold=true;run();});hit.addEventListener("blur",function(){B.hold=false;run();});
      C.scene.addEventListener("pointerenter",function(e){if(e.pointerType!=="touch"){B.hold=true;run();}});C.scene.addEventListener("pointerleave",function(){if(D.activeElement!==hit){B.hold=false;run();}});
      C.hintSet(["Point at the prism to still it; press it to run your page."]);},
    paint:function(){paint();draw();},theme:function(){PL.sig="";draw();run();},shown:function(C,sh){if(sh){paint();draw();}run();},resize:function(){PL.sig="";draw();}});
  var ed=$("codeEditor");if(ed)ed.addEventListener("input",function(){clearTimeout(B.q);B.q=setTimeout(paint,400);});var au=$("autoRun");if(au)au.addEventListener("change",paint);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
W.IngHeads&&(W.IngHeads.build={state:function(){var C=B.C;return {on:!!(C&&C.on),running:!!(B.loop&&B.loop.running()),sway:B.sw,tag:C&&C.tagB?[C.tagB.textContent,C.tagS.textContent]:null};},draw:draw});
try{window.__ingParts["p289"]="running";}catch(_){}
})();
</script>
