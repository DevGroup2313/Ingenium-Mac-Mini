<style id="r288-css">
/* ============ R288 · FABRICA'S HEAD: THE TREE OF YOUR VERSIONS (Ingenium 6.93, 12 November 2026) ============
   Approved on its picture (12 November 2026) with the heads of the Career Studio, Lector and Focus; drawn again here from that picture
   (modules/r284.js has why). The owner's standing brief for Fabrica asks that it teach while it is used, never dumbed down, and be easier
   to find one's way in than GitHub; the tree shows the open app's history as git keeps it, in one picture.
   - Fabrica's head (modules/r284.js IngHeads): its title, its words, Keep this version (or Test this version when every change is kept,
     or New app when no app is open) and Bring one in, and a card: the app open now, its idea (branch), how many versions, ideas and
     releases, and whether a change is not kept yet. The steps, the panels and their tabs stay as they were, under it, and keep the
     window's height (--f-h follows --hd-room).
   - The tree, drawn in three dimensions on a canvas: a plinth engraved with the app's name and its count of versions; the trunk, the
     idea open now, with a bead for each version (the newest at the top, larger); a ring round the trunk where a release was tagged,
     with its name; above the newest, a bead in a dashed ring when a change is not kept yet; and the other ideas as branches: one still
     open grows out from the version it began at, with a bead for each version of its own; one brought back in loops out and returns to
     the trunk where it was merged. The tree turns slowly; pointed at, it stills, and the version under the pointer is named beside it;
     pressed, that version opens in the work with what it changed. Keyboard: the versions are keys of their own (read by a screen
     reader). Minimal motion and the system's reduced motion keep it still. Nothing is rewritten while it is left alone. */
#page-fabrica.hd-on #fb{--f-h:var(--hd-room,640px) !important}
#page-fabrica.hd-on #fb > .f-head > div{display:none}
#page-fabrica.hd-on #fb > .f-head{justify-content:flex-end}
#page-fabrica.hd-on > .hd-head .hd-tag{right:4px;top:10px;max-width:250px;text-align:right}
#page-fabrica.hd-on.hd-stack > .hd-head .hd-tag{text-align:center}
#page-fabrica .ft-cv{position:absolute;left:0;top:0;width:520px;height:460px;cursor:default}
#page-fabrica .ft-cv.ft-on{cursor:pointer}
#page-fabrica .ft-keys button:focus{outline:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p288"]="started";}catch(_){}
/* R288 · Fabrica's head, the tree of your versions: see the note at the top of its styles */
(function(){"use strict";
if(window.__r288)return;window.__r288=1;
var D=document,W=window,TAU=Math.PI*2,H=null;
var T={C:null,cv:null,g:null,keys:null,lede:null,data:null,sig:"",busy:false,t:0,turn:0,amp:1,hold:false,hover:null,focus:null,loop:null,pts:[],W:520,H:460,ask:0};
function $(id){return D.getElementById(id);}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function FS(){try{return (W.state&&W.state.fabrica)||{};}catch(e){return {};}}
function repo(){return W.IngRepo||null;}
function plural(n,a,b){return n+" "+(n===1?a:b);}

/* ---------- what the tree shows, read from the open app's history ---------- */
function read(){var R=repo(),id=FS().sel;if(!R||!id){T.data=null;T.sig="none";redraw();return;}
  if(T.busy)return;T.busy=true;var my=++T.ask;
  R.info(id).then(function(r){var main=r.branch||(r.branches.indexOf("main")>=0?"main":r.branches[0]);
    var others=r.branches.filter(function(b){return b!==main;}).slice(0,24);
    return Promise.all([R.log(id,{max:200}),R.status(id).then(function(s){return s;},function(){return {changes:[]};})].concat(others.map(function(b){return R.log(id,{ref:b,max:40}).then(function(l){return {name:b,log:l};},function(){return {name:b,log:[]};});})))
      .then(function(x){if(my!==T.ask)return;var all=x[0]||[],st=x[1]||{},ideas=x.slice(2),by={},i;all.forEach(function(c){by[c.oid]=c;});
        /* the trunk is the idea's own line, as git's first parents give it; a merged idea's versions stay on its branch */
        var log=[],c0=all[0];while(c0&&log.length<200){log.push(c0);c0=c0.parents.length?by[c0.parents[0]]:null;}
        var onMain={};log.forEach(function(c,j){onMain[c.oid]=j;});
        var shown=Math.min(log.length,11),tags={};log.slice(0,shown).forEach(function(c,j){var tg=c.names.filter(function(n){return r.tags.indexOf(n)>=0;});if(tg.length)tags[j]=tg[tg.length-1];});
        var br=[];ideas.forEach(function(I){var own=[],fork=-1;for(i=0;i<I.log.length;i++){var c=I.log[i];if(onMain[c.oid]!=null){fork=onMain[c.oid];break;}own.push(c);}
          if(!I.log.length)return;var head=I.log[0].oid,at=-1;
          for(i=0;i<log.length;i++){if(log[i].parents.length>1&&log[i].parents.slice(1).indexOf(head)>=0){at=i;break;}}
          if(at>=0){/* brought back in: it loops out from where it began to the version that brought it in */
            br.push({name:I.name,kind:"loop",from:Math.min(fork<0?shown-1:fork,shown-1),to:Math.min(at,shown-1),own:own.slice(0,3),count:own.length,changed:I.log[0].when||0});}
          else if(own.length||fork>=0){br.push({name:I.name,kind:"open",from:fork<0?shown-1:Math.min(fork,shown-1),own:own.slice(0,4),count:own.length,changed:own[0]?own[0].when:0});}});
        br.sort(function(a,b){return (b.changed||0)-(a.changed||0);});br=br.slice(0,4);
        T.data={id:id,name:r.name,branch:main,log:log,shown:shown,tags:tags,tagCount:r.tags.length,ideas:r.branches.length-1,branches:br,changes:(st.changes||[]).length,head:r.head};
        T.busy=false;paint();redraw();});})
  .then(null,function(e){T.busy=false;T.data=null;try{console.warn("Ingenium: the tree of versions",e&&e.message||e);}catch(_){}redraw();});}
function sigNow(){var f=FS(),id=f.sel||"";var fb=$("fb"),n=fb?fb.querySelector("#fbNChanges"):null;var br=$("fbBranchName");return [id,n?n.textContent:"",br?br.textContent:"",(W.state&&W.state.fabrica&&W.state.fabrica.sel)||""].join("|");}
function check(){var s=sigNow();if(s!==T.sig){T.sig=s;read();}}

/* ---------- the tree in three dimensions: glass, pearls and a turned plinth ---------- */
var G={cx:250,base:378,e:15*Math.PI/180,F:1150},PR=10.5,STEP=21.5,TW=21,SOCK=14;
function proj(x,y,z,turn){var c=Math.cos(turn),s=Math.sin(turn),X=x*c+z*s,Z=-x*s+z*c,ce=Math.cos(G.e),se=Math.sin(G.e),Y=y*ce+Z*se,Z2=-y*se+Z*ce,k=G.F/(G.F-Z2);return [G.cx+X*k,G.base+Y*k,Z2,k];}
/* the pearls stand one on another in the trunk, the newest on top and larger, capping it */
function pearlY(j,n){var bottom=-SOCK-PR-2;if(j===0)return bottom-(n-2)*STEP-PR-18+1;return bottom-(n-1-j)*STEP;}
var PLINTH={sig:"",cv:null};
function plinth(name,count){var d=H.dpr(),n=H.night(),sig=[d,n?1:0,name,count].join("|");if(PLINTH.sig===sig)return PLINTH.cv;PLINTH.sig=sig;
  var cv=PLINTH.cv||D.createElement("canvas");cv.width=Math.round(T.W*d);cv.height=Math.round(T.H*d);var g=cv.getContext("2d");g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,T.W,T.H);
  var bx=G.cx,by=G.base,rx=130,ry=rx*Math.sin(G.e),th=27,i;
  H.cast(g,bx+10,by+th+ry*.55,rx*1.18,ry*1.5,n?.22:.14);
  /* the band: turned metal, darker toward its foot */
  var sg=g.createLinearGradient(bx-rx,0,bx+rx,0);
  if(n){sg.addColorStop(0,"#07050c");sg.addColorStop(.22,"#211a33");sg.addColorStop(.42,"#2e2546");sg.addColorStop(.7,"#17111f");sg.addColorStop(1,"#060409");}
  else{sg.addColorStop(0,"#9c8ac2");sg.addColorStop(.22,"#d9cfee");sg.addColorStop(.42,"#efe9f8");sg.addColorStop(.7,"#c6b8e3");sg.addColorStop(1,"#8f7cb9");}
  g.beginPath();g.ellipse(bx,by,rx,ry,0,0,Math.PI);g.lineTo(bx-rx,by+th);g.ellipse(bx,by+th,rx,ry,0,Math.PI,0,true);g.closePath();g.fillStyle=sg;g.fill();
  var vg=g.createLinearGradient(0,by,0,by+th+ry);vg.addColorStop(0,"rgba(255,255,255,0)");vg.addColorStop(1,n?"rgba(0,0,0,.45)":"rgba(70,48,130,.22)");g.fillStyle=vg;g.fill();
  g.beginPath();g.ellipse(bx,by+th,rx,ry,0,0,Math.PI);g.strokeStyle=n?"rgba(0,0,0,.6)":"rgba(70,48,130,.3)";g.lineWidth=1;g.stroke();
  g.beginPath();g.ellipse(bx,by+1.2,rx-.4,ry,0,.05,Math.PI-.05);g.strokeStyle=n?"rgba(205,184,240,.16)":"rgba(255,255,255,.9)";g.lineWidth=1;g.stroke();
  /* the face: spun in fine rings under a soft light, with a ring of ticks at its rim */
  var fg=g.createRadialGradient(bx-rx*.3,by-ry*.9,rx*.05,bx,by,rx);
  if(n){fg.addColorStop(0,"#352a50");fg.addColorStop(.6,"#211932");fg.addColorStop(1,"#18122a");}else{fg.addColorStop(0,"#ffffff");fg.addColorStop(.6,"#f1edf9");fg.addColorStop(1,"#e2daf1");}
  g.beginPath();g.ellipse(bx,by,rx,ry,0,0,TAU);g.fillStyle=fg;g.fill();
  g.save();g.beginPath();g.ellipse(bx,by,rx,ry,0,0,TAU);g.clip();g.lineWidth=.7;
  for(var f=.16;f<.86;f+=.024){g.beginPath();g.ellipse(bx,by,rx*f,ry*f,0,0,TAU);g.strokeStyle=n?"rgba(205,184,240,"+(f*100%2<1?.045:.025)+")":"rgba(90,64,150,"+(f*100%2<1?.07:.035)+")";g.stroke();}
  var sw=g.createLinearGradient(bx-rx,by-ry,bx+rx*.2,by+ry);sw.addColorStop(0,n?"rgba(205,184,240,.08)":"rgba(255,255,255,.65)");sw.addColorStop(.5,"rgba(255,255,255,0)");g.fillStyle=sw;g.fillRect(bx-rx,by-ry,rx*2,ry*2);g.restore();
  for(i=0;i<120;i++){var u=i/120*TAU,lng=i%10===0,r0=lng?.875:.905,r1=.955;g.beginPath();g.moveTo(bx+Math.cos(u)*rx*r0,by+Math.sin(u)*ry*r0);g.lineTo(bx+Math.cos(u)*rx*r1,by+Math.sin(u)*ry*r1);
    g.strokeStyle=n?"rgba(205,184,240,"+(lng?.42:.24)+")":"rgba(84,60,140,"+(lng?.4:.22)+")";g.lineWidth=lng?1.1:.8;g.stroke();}
  g.beginPath();g.ellipse(bx,by,rx*.975,ry*.975,0,0,TAU);g.strokeStyle=n?"rgba(0,0,0,.4)":"rgba(90,64,150,.2)";g.lineWidth=.8;g.stroke();
  g.beginPath();g.ellipse(bx,by,rx-.6,ry-.5,0,Math.PI*1.05,Math.PI*1.95);g.strokeStyle=n?"rgba(205,184,240,.2)":"rgba(255,255,255,1)";g.lineWidth=1.2;g.stroke();
  /* the socket the trunk stands in: a glossy collar */
  var sr=24,sry=sr*Math.sin(G.e),sh=SOCK;H.cast(g,bx+3,by+2,sr*1.25,sry*1.4,n?.3:.18);
  var cg=g.createLinearGradient(bx-sr,0,bx+sr,0);if(n){cg.addColorStop(0,"#120d1d");cg.addColorStop(.3,"#5a4b82");cg.addColorStop(.55,"#3a2f58");cg.addColorStop(1,"#0e0a17");}
  else{cg.addColorStop(0,"#a796cf");cg.addColorStop(.3,"#ffffff");cg.addColorStop(.55,"#e6def4");cg.addColorStop(1,"#9a87c4");}
  g.beginPath();g.ellipse(bx,by-sh,sr*.62,sry*.62,0,0,Math.PI);g.lineTo(bx-sr,by);g.ellipse(bx,by,sr,sry,0,Math.PI,0,true);g.closePath();g.fillStyle=cg;g.fill();
  g.beginPath();g.ellipse(bx,by-sh,sr*.62,sry*.62,0,0,TAU);g.fillStyle=n?"#4a3d6c":"#f4f0fb";g.fill();g.strokeStyle=n?"rgba(205,184,240,.3)":"rgba(255,255,255,1)";g.lineWidth=.8;g.stroke();
  /* the app's name and its count, engraved on the band */
  if(name){var txt=(String(name).toUpperCase()+"  ·  "+(count==null?"":plural(count,"VERSION","VERSIONS"))).slice(0,44);g.font='600 10.5px '+(getComputedStyle(D.body).fontFamily||"sans-serif");
    g.textBaseline="middle";var sp=2.6,chars=txt.split(""),wid=0,ws=chars.map(function(c){var w=g.measureText(c).width+sp;wid+=w;return w;}),x=bx-wid/2,ty=by+ry+th*.5;g.textAlign="center";
    chars.forEach(function(c,k){var cx=x+ws[k]/2;g.fillStyle=n?"rgba(0,0,0,.6)":"rgba(255,255,255,.9)";g.fillText(c,cx,ty+.8);g.fillStyle=n?"rgba(205,184,240,.66)":"rgba(80,56,140,.62)";g.fillText(c,cx,ty);x+=ws[k];});}
  PLINTH.cv=cv;return cv;}
function pearl(g,x,y,r,P,look,lift){var rr=Math.max(3,r*(1+lift*.14)),im=H.orb(Math.round(rr*2)/2,P,look);g.drawImage(im,x-im.__s/2,y-im.__s/2-lift*3,im.__s,im.__s);}
/* the points of a branch, and places along it measured back from its end */
function along(P,dist){var acc=0;for(var i=P.length-1;i>0;i--){var a=P[i],b=P[i-1],L=Math.hypot(a[0]-b[0],a[1]-b[1]);if(acc+L>=dist){var t=(dist-acc)/L;return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t,a[3]+(b[3]-a[3])*t];}acc+=L;}return P[0];}
function draw(){var cv=T.cv;if(!cv)return;var d=H.dpr(),Wd=Math.round(T.W*d),Hd=Math.round(T.H*d);if(cv.width!==Wd||cv.height!==Hd){cv.width=Wd;cv.height=Hd;}
  var g=T.g||(T.g=cv.getContext("2d"));g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,T.W,T.H);
  var Dt=T.data,P=H.pal("fabrica"),n=H.night(),turn=T.turn,pts=[],items=[],i;
  g.drawImage(plinth(Dt?Dt.name:"",Dt?Dt.log.length:null),0,0,T.W,T.H);
  var shown=Dt?Math.max(1,Dt.shown):1,headY=pearlY(0,Math.max(2,shown)),hv=function(j){return T.hover&&T.hover.main===j?1:0;};
  if(!Dt){/* no app yet: a seed in the socket, waiting */var sp=proj(0,-SOCK-PR-3,0,0);items.push({z:0,f:function(){g.save();g.setLineDash([3.2,3.2]);g.lineWidth=1.4;g.strokeStyle=n?"rgba(205,184,240,.7)":"rgba(106,63,181,.6)";
      g.beginPath();g.arc(sp[0],sp[1],16,0,TAU);g.stroke();g.restore();pearl(g,sp[0],sp[1],9,P,null,0);}});}
  else{
    /* the trunk: its pearls, then the glass over them, then the newest on top */
    var tb=proj(0,-SOCK+2,0,turn),tt=proj(0,headY+12,0,turn);
    items.push({z:0,f:function(){for(var j=shown-1;j>=1;j--){var p=proj(0,pearlY(j,shown),0,turn);pearl(g,p[0],p[1],PR*p[3]*.98,P,null,hv(j));pts.push({x:p[0],y:p[1],r:PR*p[3]+5,ver:Dt.log[j],idea:Dt.branch,main:j});}
      H.glass(g,[tb,tt],(n?17:TW+3)*tb[3],{clear:true});var hp=proj(0,headY,0,turn);pearl(g,hp[0],hp[1],18*hp[3],P,"swirl",hv(0));pts.push({x:hp[0],y:hp[1],r:22*hp[3],ver:Dt.log[0],idea:Dt.branch,main:0});}});
    /* the releases: a ring of glass round the trunk, its name on a short leader */
    Object.keys(Dt.tags).forEach(function(k){var j=+k,y=pearlY(j,shown),R=j===0?27:19,ring=[];for(i=0;i<=48;i++){var u=i/48*TAU;ring.push(proj(Math.cos(u)*R,y+(j===0?3:0),Math.sin(u)*R,turn));}
      H.runs(ring,0,true).forEach(function(rn){items.push({z:rn.z,f:function(){H.glass(g,rn.p,4.6*rn.k,{cap:"butt"});}});});
      var lp=proj(R,y,0,0);items.push({z:60,f:function(){var x0=lp[0]+3,y0=lp[1];g.strokeStyle=n?"rgba(205,184,240,.45)":"rgba(80,56,140,.4)";g.lineWidth=.8;g.beginPath();g.moveTo(x0,y0);g.lineTo(x0+9,y0);g.stroke();
        g.font='italic 500 15px "Head Cormorant","Home Cormorant",Georgia,serif';g.textAlign="left";g.textBaseline="middle";g.fillStyle=n?"rgba(0,0,0,.5)":"rgba(255,255,255,.9)";g.fillText(Dt.tags[k],x0+13,y0+1.6);
        g.fillStyle=n?"rgba(236,228,250,.86)":"rgba(46,23,100,.82)";g.fillText(Dt.tags[k],x0+13,y0+.6);}});});
    /* a change not kept yet: a pearl in a dashed ring above the newest */
    if(Dt.changes){var cyy=headY-40,cp=proj(0,cyy,0,turn);items.push({z:2,f:function(){g.save();g.setLineDash([3,3.4]);g.lineWidth=1.3;g.strokeStyle=n?"rgba(205,184,240,.8)":"rgba(106,63,181,.7)";
      g.beginPath();g.arc(cp[0],cp[1],14*cp[3],0,TAU);g.stroke();g.restore();pearl(g,cp[0],cp[1],8.5*cp[3],P,null,0);}});}
    /* the other ideas: glass branches, their own pearls gathered at their ends */
    Dt.branches.forEach(function(B,bi){var phi=[Math.PI,.08,2.1,4.3][bi]||bi,line=[],N=40,kk;
      if(B.kind==="open"){var y0=pearlY(B.from,shown),Lr=62+6*Math.min(3,B.count||1);
        for(i=0;i<=N;i++){var t=i/N,r=8+Lr*Math.pow(t,.9),ang=phi+.32*t,y=y0-4-44*Math.pow(t,2.4);line.push(proj(Math.cos(ang)*r,y,Math.sin(ang)*r,turn));}}
      else{var ya=pearlY(B.from,shown),yb=pearlY(B.to,shown),Lm=70;
        for(i=0;i<=N;i++){var u=i/N,rm=8+Lm*Math.pow(Math.sin(Math.PI*u),.55),am=phi+.22*Math.sin(Math.PI*u),ym=ya+(yb-ya)*u;line.push(proj(Math.cos(am)*rm,ym,Math.sin(am)*rm,turn));}}
      var cnt=B.kind==="open"?Math.max(1,Math.min(3,B.own.length||1)):Math.max(1,Math.min(2,B.own.length||1)),pp=[];
      for(kk=0;kk<cnt;kk++){var pos=B.kind==="open"?along(line,8+kk*19):(function(){var m=Math.floor(N/2),u0=(m+(kk-(cnt-1)/2)*4.6)/N;var rm=8+Lm*Math.pow(Math.sin(Math.PI*u0),.55)-6,am=phi+.22*Math.sin(Math.PI*u0),ym=ya+(yb-ya)*u0;return proj(Math.cos(am)*rm,ym,Math.sin(am)*rm,turn);})();
        pp.push({p:pos,ver:B.own[kk]||null});}
      var front=line.filter(function(q){return q[2]>=0;}).length>line.length/2;
      H.runs(line,0,false).forEach(function(rn,ri,all){var mine=pp.filter(function(o){return (o.p[2]>=0)===rn.front;});
        items.push({z:rn.z,f:function(){mine.forEach(function(o){var h1=T.hover&&T.hover.ver&&o.ver&&T.hover.ver.oid===o.ver.oid?1:0;pearl(g,o.p[0],o.p[1],9.2*o.p[3],P,null,h1);pts.push({x:o.p[0],y:o.p[1],r:10*o.p[3]+4,ver:o.ver,idea:B.name});});
          H.glass(g,rn.p,(n?6.5:7.5)*rn.k,{clear:true});}});});});}
  items.sort(function(x,y){return x.z-y.z;});items.forEach(function(it){it.f();});T.pts=pts;}
function redraw(){draw();run();}
function step(dt){var sp=H.motion()==="full"?1.33:1,goal=(T.hold||H.still())?0:1;T.amp+=(goal-T.amp)*Math.min(1,dt/500);if(Math.abs(goal-T.amp)<.002)T.amp=goal;
  T.turn+=dt/60000*TAU*sp*T.amp;draw();return !(T.amp===0&&goal===0);}
function run(){var C=T.C;if(!C||!C.shown||H.still()){if(T.loop)T.loop.stop();return;}if(!T.loop)T.loop=H.Loop(step);T.loop.start();}

/* ---------- the words beside it ---------- */
function ago(ms){if(!ms)return "";var s=(Date.now()-ms)/1000;if(s<90)return "just now";var m=s/60;if(m<60)return Math.round(m)+" minutes ago";var h=m/60;if(h<36)return Math.round(h)+" hours ago";return Math.round(h/24)+" days ago";}
function tagFor(v,idea){var Dt=T.data;if(!v)return null;return [v.title,v.short+" · "+(Dt&&v.oid===Dt.log[0].oid?"the newest on "+idea:(idea===(Dt&&Dt.branch)?"on "+idea:"on the idea "+idea))+(v.when?" · "+ago(v.when):"")];}
function paint(){var C=T.C;if(!C||!C.on)return;var Dt=T.data,k1=C.keys.keep,k2=C.keys.bring;
  if(!C.card)return;var card=C.card,sig=JSON.stringify([Dt&&Dt.name,Dt&&Dt.branch,Dt&&Dt.log.length,Dt&&Dt.ideas,Dt&&Dt.tagCount,Dt&&Dt.changes]);
  if(card.__s!==sig){card.__s=sig;card.textContent="";card.appendChild(mk("small",null,Dt?"Open now":"No app open"));card.appendChild(mk("b",null,Dt?Dt.name:"Your apps grow here"));
    card.appendChild(mk("p",null,Dt?[Dt.branch,(Dt.log.length>=200?"200 or more versions":plural(Dt.log.length,"version","versions")),plural(Dt.ideas,"idea","ideas"),plural(Dt.tagCount,"release","releases")].join(" · "):"Bring one in, or start a new one: each version you keep grows on its trunk."));
    if(Dt)card.appendChild(mk("p",Dt.changes?"hd-warn":null,Dt.changes?plural(Dt.changes,"change","changes")+" not kept yet":"Every change is kept"));}
  if(k1){H.keyText(k1,!Dt?"New app":Dt.changes?"Keep this version":"Test this version");H.keyIcon(k1,!Dt?"plus":Dt.changes?"keep":"run");}
  var hv=T.hover||T.focus,tg=hv?tagFor(hv.ver,hv.idea):null;
  if(!tg&&Dt&&Dt.log[0])tg=[Dt.log[0].title,Dt.log[0].short+" · the newest on "+Dt.branch];
  if(tg)C.tagSet(tg[0],tg[1]);else C.tagSet("","");
  C.hintSet(Dt?["Point at the tree to still it; press a version to see what it changed."]:["Each version you keep grows on its trunk; each idea, a branch."]);
  keysForVersions();}
function keysForVersions(){var box=T.keys,Dt=T.data;if(!box)return;var sig=Dt?Dt.id+"|"+Dt.log.slice(0,Dt.shown).map(function(c){return c.oid;}).join(","):"";if(box.__s===sig)return;box.__s=sig;box.textContent="";
  if(!Dt)return;Dt.log.slice(0,Dt.shown).forEach(function(v,j){var b=mk("button","hd-key",v.title+", "+v.short);b.type="button";
    b.addEventListener("focus",function(){T.focus={ver:v,idea:Dt.branch,main:j};T.hold=true;T.hover={ver:v,idea:Dt.branch,main:j};paint();redraw();});
    b.addEventListener("blur",function(){T.focus=null;T.hover=null;T.hold=false;paint();redraw();});
    b.addEventListener("click",function(e){e.preventDefault();openVersion(v);});box.appendChild(b);});}
/* ---------- what a press does ---------- */
function toWork(){var t=D.querySelector('#fbTabs button[data-p="work"]');if(t&&t.offsetParent)t.click();}
function openVersion(v){if(!v)return;var hist=D.querySelector('#fbViews button[data-v="history"]');toWork();if(hist)hist.click();if(T.C)T.C.toRoom("#fb");var tries=0;
  (function find(){var row=null;[].some.call(D.querySelectorAll("#fbWorkBody .f-cm, #fb .f-cm"),function(e){var id=e.querySelector(".id");if(id&&id.textContent.trim()===v.short){row=e;return true;}return false;});
    if(!row){if(++tries<20)setTimeout(find,150);return;}if(row.getAttribute("aria-expanded")!=="true")row.click();
    setTimeout(function(){var see=[].filter.call(row.querySelectorAll("button"),function(x){return /See the changes/.test(x.textContent||"");})[0];if(see)see.click();},80);})();}
function keepOrTest(){var Dt=T.data;if(!Dt){var nw=$("fbNew")||$("fbLibNew");if(nw)nw.click();return;}
  if(Dt.changes){toWork();var ch=D.querySelector('#fbViews button[data-v="changes"]');if(ch)ch.click();if(T.C)T.C.toRoom("#fb");
    setTimeout(function(){var m=$("fbMsg"),k=$("fbKeep");if(m&&m.value.trim()&&k){k.click();}else if(m){m.focus();}},120);return;}
  var tb=D.querySelector('#fbTabs button[data-p="ship"]');if(tb&&tb.offsetParent)tb.click();var t=$("fbTest");if(T.C)T.C.toRoom("#fb");if(t&&!t.disabled)setTimeout(function(){t.click();},120);}
function bring(){var b=$("fbBring")||$("fbLibBring");if(b)b.click();if(T.C)T.C.toRoom("#fb");}
/* ---------- the pointer on the tree ---------- */
function at(e){var r=T.cv.getBoundingClientRect();if(!r.width)return null;var x=(e.clientX-r.left)*T.W/r.width,y=(e.clientY-r.top)*T.H/r.height,best=null,bd=1e9;
  T.pts.forEach(function(p){var dd=Math.hypot(p.x-x,p.y-y);if(dd<p.r&&dd<bd){bd=dd;best=p;}});return best;}
function wire(){var cv=T.cv;
  cv.addEventListener("pointermove",function(e){if(e.pointerType==="touch")return;var p=at(e),cur=T.hover;var same=(p&&cur&&p.ver&&cur.ver&&p.ver.oid===cur.ver.oid)||(!p&&!cur);
    if(!same){T.hover=p&&p.ver?{ver:p.ver,idea:p.idea,main:p.main}:null;cv.classList.toggle("ft-on",!!T.hover);if(T.hover)H.sound("hover");paint();draw();}},{passive:true});
  cv.addEventListener("pointerenter",function(e){if(e.pointerType!=="touch"){T.hold=true;run();}});
  cv.addEventListener("pointerleave",function(){T.hold=!!T.focus;if(T.hover){T.hover=null;cv.classList.remove("ft-on");paint();draw();}run();});
  cv.addEventListener("click",function(e){var p=at(e);if(p&&p.ver){H.sound("press");openVersion(p.ver);}});}
function start(){H=W.IngHeads;if(!H||!$("page-fabrica")){if((T.tries=(T.tries||0)+1)<240)setTimeout(start,500);return;}
  T.C=H.mount({page:"page-fabrica",label:"Fabrica",eyebrow:"Fabrica · the tree of your versions",cls:"hd-fabrica",card:true,
    ok:function(p){return !!p.querySelector("#fb");},
    title:function(p){return p.querySelector(":scope > .page-title");},
    lede:function(){if(!T.lede)T.lede=mk("p","hd-lede","Your workshop, on this device: each of your apps kept with every version, changed, tested and shipped from here. Every idea grows from its trunk, and nothing leaves this device unless you send it.");return T.lede;},
    before:function(p){return p.querySelector("#fbHost")||p.firstElementChild;},
    keys:[{name:"keep",id:"hdFabricaKeep",text:"Keep this version",icon:"keep",primary:true,click:keepOrTest},{name:"bring",id:"hdFabricaBring",text:"Bring one in",click:bring}],
    scene:function(C){var cv=D.createElement("canvas");cv.className="ft-cv";cv.setAttribute("role","img");cv.setAttribute("aria-label","The tree of this app's versions");C.box.appendChild(cv);T.cv=cv;
      var ks=mk("div","ft-keys hd-sr");ks.setAttribute("role","group");ks.setAttribute("aria-label","The versions on the tree");C.box.appendChild(ks);T.keys=ks;wire();},
    enter:function(){T.sig="";check();},
    paint:function(){check();paint();},theme:function(){PLINTH.sig="";redraw();},shown:function(C,sh){if(sh){check();draw();}run();},resize:function(){PLINTH.sig="";draw();}});
  /* Fabrica painting again (an app chosen, a version kept, a change made, an idea switched): the tree reads the history again */
  function watch(){var fb=$("fb");if(!fb){setTimeout(watch,800);return;}try{new MutationObserver(function(){if(T.C&&T.C.on){clearTimeout(T.q);T.q=setTimeout(check,250);}}).observe(fb,{childList:true,subtree:true,characterData:true});}catch(e){}check();}
  watch();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
W.IngHeads&&(W.IngHeads.fabrica={state:function(){var C=T.C,Dt=T.data;return {on:!!(C&&C.on),running:!!(T.loop&&T.loop.running()),turn:T.turn,hold:T.hold,
  data:Dt?{name:Dt.name,branch:Dt.branch,versions:Dt.log.length,shown:Dt.shown,tags:Dt.tags,ideas:Dt.ideas,branches:Dt.branches.map(function(b){return {name:b.name,kind:b.kind,from:b.from,to:b.to,own:b.own?b.own.length:0};}),changes:Dt.changes}:null,
  tag:C&&C.tagB?[C.tagB.textContent,C.tagS.textContent]:null,card:C&&C.card?C.card.textContent:"",keep:C&&C.keys.keep?C.keys.keep.textContent:"",points:T.pts.length,
  height:(function(){var r=$("fb");return r?r.getBoundingClientRect().height:0;})()};},read:read,draw:draw,open:openVersion});
try{window.__ingParts["p288"]="running";}catch(_){}
})();
</script>
