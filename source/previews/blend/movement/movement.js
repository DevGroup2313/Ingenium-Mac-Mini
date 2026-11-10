<script>
(function(){
"use strict";
var D=document,W=window,win=D.getElementById("win"),fitBox=D.getElementById("fit"),stage=D.getElementById("stage");
function still(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
function fit(){var cs=getComputedStyle(stage),aw=stage.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
  var ah=W.innerHeight-fitBox.getBoundingClientRect().top+W.scrollY-56;var s=Math.min(1,aw/1440,Math.max(ah,520)/900);if(!(s>0))s=.5;
  win.style.transform="scale("+s+")";fitBox.style.width=Math.floor(1440*s)+"px";fitBox.style.height=Math.floor(900*s)+"px";}
W.addEventListener("resize",fit);fit();setTimeout(fit,60);
var key=D.getElementById("themeKey");function night(){return win.getAttribute("data-theme")==="night";}
function label(){key.textContent=night()?"Day":"Night";}
key.addEventListener("click",function(){var n=!night();win.setAttribute("data-theme",n?"night":"day");D.documentElement.setAttribute("data-theme",n?"dark":"light");label();});label();
var tst=D.getElementById("pvToast"),tt=0;function say(t){tst.textContent=t;tst.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){tst.classList.remove("on");},2100);}
function el(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function scrollTo(elm,where){var s=D.getElementById("scroll");if(!s||!elm)return;var sr=s.getBoundingClientRect(),k=sr.height/(s.offsetHeight||1)||1,er=elm.getBoundingClientRect();
  var y=(er.top-sr.top)/k+s.scrollTop;y-=where==="center"?Math.max(0,(s.clientHeight-er.height/k)/2):18;
  try{s.scrollTo({top:Math.max(0,y),behavior:still()?"auto":"smooth"});}catch(e){s.scrollTop=Math.max(0,y);}}
function lower(t){return t.charAt(0).toLowerCase()+t.slice(1);}

/* ---------- each model's colours and mark ---------- */
var TONES=[["#b9a3f2","#7458c6","#33206c"],["#a57fe8","#6a3fb5","#2e1764"],["#c48ae8","#8641b8","#3e1760"],["#9283f2","#4d3db0","#1e1660"],["#b47ad9","#7637a8","#331455"],["#a98ce8","#6648b8","#281a5e"],["#9a6be0","#5c31a4","#250f4b"]];
var MARK={velox:'<path d="M4.5 19.5l11-11"/><path d="M9.5 8.5h6v6"/><path d="M3.5 12.5h4M6.5 16.5h3"/>',
  magister:'<path d="M12 4.5v15M7.5 19.5h9M5 8h14"/><path d="M5 8l-2.6 5.5a2.6 2.6 0 0 0 5.2 0z"/><path d="M19 8l-2.6 5.5a2.6 2.6 0 0 0 5.2 0z"/><circle cx="12" cy="4.5" r="1"/>',
  scriba:'<path d="M19.5 4.5c-6 .8-10.6 5.2-12.6 11.2l-.9 3.8 3.8-.9c6-2 10.4-6.6 11.2-12.6z"/><path d="M6.9 17.1l5.6-5.6"/>',
  faber:'<path d="M13.5 6.5l4 4"/><path d="M12 8l-7.5 7.5a1.4 1.4 0 0 0 0 2l2 2a1.4 1.4 0 0 0 2 0L16 12"/><path d="M12 8l2.5-2.5a2.8 2.8 0 0 1 4 4L16 12"/>',
  cloud:'<path d="M7 18.5h10a4 4 0 0 0 .4-8 5.8 5.8 0 0 0-11.2 1.6A3.3 3.3 0 0 0 7 18.5z"/><path d="M10 14.5h4"/>'};
function markSvg(k){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+(MARK[k]||MARK.cloud)+'</svg>';}
function tone(e,x){if(!x)return e;e.style.setProperty("--t0",x.T[0]);e.style.setProperty("--t1",x.T[1]);e.style.setProperty("--t2",x.T[2]);return e;}
var NS=0;
/* Ingenium's star, in gold: its body, a bevel of light, and a pearl at its heart */
function starSvg(){var id="st"+(++NS);
  return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs><linearGradient id="'+id+'a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--g0)"/><stop offset=".5" style="stop-color:var(--g1)"/><stop offset="1" style="stop-color:var(--g3)"/></linearGradient>'+
    '<linearGradient id="'+id+'b" x1="1" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--g0)"/><stop offset="1" style="stop-color:var(--g2)"/></linearGradient>'+
    '<radialGradient id="'+id+'p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#e9def9"/><stop offset="1" stop-color="#a98fd6"/></radialGradient></defs>'+
    '<path d="M50 4 L60 40 L96 50 L60 60 L50 96 L40 60 L4 50 L40 40 Z" fill="rgba(40,22,68,.28)" transform="translate(2 4)"/>'+
    '<path d="M50 4 L60 40 L96 50 L60 60 L50 96 L40 60 L4 50 L40 40 Z" fill="url(#'+id+'a)"/>'+
    '<path d="M50 4 L60 40 L50 50 Z M96 50 L60 60 L50 50 Z M50 96 L40 60 L50 50 Z M4 50 L40 40 L50 50 Z" fill="url(#'+id+'b)" opacity=".75"/>'+
    '<circle cx="50" cy="50" r="10.5" fill="url(#'+id+'p)" stroke="rgba(90,60,20,.45)" stroke-width="1"/></svg>';}
/* a thing that answers the pointer: it tilts to follow a mouse and lifts; pressed, it sinks */
function wire(host,o){host.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"&&!still())o.classList.add("hov");});
  host.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||still())return;var r=o.getBoundingClientRect();if(!r.width)return;
    var x=Math.max(-.25,Math.min(1.25,(e.clientX-r.left)/r.width)),y=Math.max(-.25,Math.min(1.25,(e.clientY-r.top)/r.height));
    o.style.setProperty("--ry",((x-.5)*26).toFixed(1)+"deg");o.style.setProperty("--rx",(-(y-.5)*22).toFixed(1)+"deg");},{passive:true});
  host.addEventListener("pointerleave",function(){o.classList.remove("hov","dn");o.style.setProperty("--rx","0deg");o.style.setProperty("--ry","0deg");});
  host.addEventListener("pointerdown",function(){if(!still())o.classList.add("dn");});
  ["pointerup","pointercancel"].forEach(function(t){host.addEventListener(t,function(){o.classList.remove("dn");});});
  host.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&!still()){o.classList.add("dn");setTimeout(function(){o.classList.remove("dn");},140);}});}
function pop(elm){elm.classList.add("pop");
  elm.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"&&!still())elm.classList.add("ph");});
  elm.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||still())return;var r=elm.getBoundingClientRect();if(!r.width)return;
    var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5,k=Math.min(1,320/Math.max(r.width,r.height));
    elm.style.setProperty("--lx",(x*7*k).toFixed(2)+"deg");elm.style.setProperty("--ly",(-y*7*k).toFixed(2)+"deg");},{passive:true});
  elm.addEventListener("pointerleave",function(){elm.classList.remove("ph","pd");elm.style.setProperty("--lx","0deg");elm.style.setProperty("--ly","0deg");});
  elm.addEventListener("pointerdown",function(){if(!still())elm.classList.add("pd");});
  ["pointerup","pointercancel"].forEach(function(t){elm.addEventListener(t,function(){elm.classList.remove("pd");});});return elm;}

/* ---------- the pieces: a cut gem in its claws, an enamel wheel, a medallion ---------- */
function gem(x,S){var g=tone(el("span","gm"+(x?"":" ghost")),x);g.setAttribute("aria-hidden","true");if(S)g.style.setProperty("--S",S+"px");
  var h='<span class="tilt"><span class="cup"></span><span class="stone"></span>'+(x?'<span class="ico">'+markSvg(x.k)+'</span>':'');
  for(var i=0;i<6;i++)h+='<span class="prong" style="--a:'+(i*60+30)+'deg"></span>';g.innerHTML=h+'</span>';return g;}
function gearSvg(teeth,center){var id="gr"+(++NS),pts=[],ro=49,ri=43.5,s=2*Math.PI/teeth;
  for(var i=0;i<teeth;i++){var a=i*s;[[ri,a],[ro,a+s*.22],[ro,a+s*.48],[ri,a+s*.7]].forEach(function(p){pts.push((50+p[0]*Math.cos(p[1])).toFixed(2)+","+(50+p[0]*Math.sin(p[1])).toFixed(2));});}
  var holes="",k,nh=center?6:3,rh=center?30:29;for(k=0;k<nh;k++){var b=k*2*Math.PI/nh-Math.PI/2;holes+='<circle cx="'+(50+rh*Math.cos(b)).toFixed(1)+'" cy="'+(50+rh*Math.sin(b)).toFixed(1)+'" r="'+(center?5.5:6)+'" style="fill:var(--hole)"/>';}
  return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs><radialGradient id="'+id+'e" cx=".38" cy=".32" r=".85"><stop offset="0" style="stop-color:'+(center?'var(--ctrA)':'var(--t0)')+'"/><stop offset=".55" style="stop-color:'+(center?'#6a3fb5':'var(--t1)')+'"/><stop offset="1" style="stop-color:'+(center?'var(--ctrB)':'var(--t2)')+'"/></radialGradient></defs>'+
    '<polygon points="'+pts.join(" ")+'" style="fill:'+(center?'var(--ctrTeeth)':'var(--teeth)')+';stroke:var(--teethEdge)" stroke-width=".7" stroke-linejoin="round"/>'+
    '<circle cx="50" cy="50" r="40" fill="url(#'+id+'e)"/>'+holes+
    (center?'<circle cx="50" cy="50" r="25" style="fill:var(--hubRing)"/>':'<circle cx="50" cy="50" r="20" style="fill:var(--hubRing)"/><circle cx="50" cy="50" r="16.5" fill="url(#'+id+'e)"/>')+'</svg>';}
function gear(x,D,teeth){var g=tone(el("span","gr"+(x?"":" ghost")),x);g.setAttribute("aria-hidden","true");if(D)g.style.setProperty("--D",D+"px");
  g.innerHTML='<span class="tilt"><span class="wheel">'+gearSvg(teeth||20,false)+'</span>'+(x?'<span class="ico">'+markSvg(x.k)+'</span>':'')+'</span>';if(!x)g.querySelector(".wheel").style.opacity=".35";return g;}
function medal(x,S){var m=tone(el("span","md"+(x?"":" ghost")),x);m.setAttribute("aria-hidden","true");if(S)m.style.setProperty("--S",S+"px");
  m.innerHTML='<span class="tilt"><span class="rim"></span><span class="face"></span>'+(x?'<span class="ico">'+markSvg(x.k)+'</span>':'')+'</span>';return m;}

/* ---------- the models (the houses named here are Ingenium's own; the connected ones are examples) ---------- */
var MODELS=[{id:"velox",n:"Velox",k:"velox",d:"Quick drafts · 3 GB",at:"local"},{id:"magister",n:"Magister",k:"magister",d:"Careful reasoning · 9 GB",at:"local"},
  {id:"scriba",n:"Scriba",k:"scriba",d:"Writing and editing · 5 GB",at:"local"},{id:"faber",n:"Faber",k:"faber",d:"Code · 7 GB",at:"local"},
  {id:"claude",n:"Claude",k:"cloud",d:"Connected · answers at the same time",at:"cloud"},{id:"gpt",n:"GPT",k:"cloud",d:"Connected · answers at the same time",at:"cloud"}];
MODELS.forEach(function(x,i){x.T=TONES[i%TONES.length];});
var WAYS=[["","Ingenium chooses","Ingenium picks the way from your question, and says why."],["Quick","Pass and refine","The first model drafts; each next one improves the draft."],
  ["Quick","Best of the batch","Every model answers; you keep the one you like best."],["Careful","Compare and combine","Every model answers; the writer keeps the best of each."],
  ["Careful","Weigh and agree","As Compare and combine, counting each model by its weight."],["Careful","Judge and decide","A judge scores every answer, then writes from what held up."],
  ["Deep","Debate and settle","They answer, read each other, revise, then settle."],["Deep","Check every claim","One answers; the others check each claim; it is corrected."],
  ["Deep","Divide the work","The task in parts, one to each model, then joined."]],way=3;
var chosen=[],dir="movement";
function role(x){var i=chosen.indexOf(x),w=WAYS[way][1];if(i<0)return "";
  if(w==="Pass and refine")return i===0?"drafts first":"improves the draft";
  if(w==="Judge and decide")return i===chosen.length-1?"judges and writes":"answers";
  if(w==="Check every claim")return i===0?"answers":"checks each claim";
  if(w==="Divide the work")return "part "+(i+1)+" of "+chosen.length;
  return i===chosen.length-1?"answers and writes":"answers";}
function piece(x,size){return gear(x,Math.round(size*1.15));}

/* ---------- the blend in the head: one of three directions ---------- */
var cx=D.getElementById("cx"),count=D.getElementById("bxCount"),eye=D.getElementById("bxEye"),held=null,countText="",hub=null;
/* ---------- the movement in depth: a dish at an angle, wheels with thickness under a still light, truly meshing ---------- */
var RATE=1,rampId=0;
function gearPoly(teeth){var pts=[],ro=49,ri=43.5,s=2*Math.PI/teeth;for(var i=0;i<teeth;i++){var a=i*s;[[ri,a],[ro,a+s*.22],[ro,a+s*.48],[ri,a+s*.7]].forEach(function(p){pts.push((50+p[0]*Math.cos(p[1])).toFixed(2)+","+(50+p[0]*Math.sin(p[1])).toFixed(2));});}return pts.join(" ");}
/* ---------- the movement is rendered, not drawn: metal wheels with rounded, polished edges and holes you can see through,
   lit from the top left by a light that stays where it is while the wheels turn ---------- */
var MVC={},MVLX=.62,MVLY=.78;  /* in the picture's plane, the way away from the light: down and to the right */
var MVK=(function(){var a=-.45,b=-.62,c=.64,l=Math.sqrt(a*a+b*b+c*c);return [a/l,b/l,c/l];})();  /* the key light: up, to the left and in front */
var MVP={day:{rim:"#ddd3f0",crim:"#d8cdee",side:["#9d92b8","#aaa0c4","#b8afd0"],ring:"#efe9f8",collar:"#e4dcf3",floor:"#f8f5fc",cast:"#2a1452",
    plate:"#eee8f7",bevel:"#d9cfee",e0:.97,e1:.27,ks:.6,spec:[255,255,255],dark:[30,12,62],env:1},
  night:{rim:"#5a4c80",crim:"#62558b",side:["#191329","#221a39","#2d2348"],ring:"#5a4f7a",collar:"#706598",floor:"#201830",cast:"#000000",
    plate:"#201a30",bevel:"#4b4069",e0:.9,e1:.32,ks:.4,spec:[226,214,255],dark:[0,0,0],env:.85}};
var MVGHOST="#8f86a8";
function mvNight(){var t=cx.closest("[data-theme]");return !!t&&t.getAttribute("data-theme")==="night";}
function mvPal(){return MVP[mvNight()?"night":"day"];}
function mvScale(){return Math.min(3,Math.max(1.5,(W.devicePixelRatio||1)*1.2));}
function mvCv(n){var c=D.createElement("canvas");c.width=c.height=n;c.className="mv-cv";return c;}
function mvDup(s){var c=mvCv(s.width);c.getContext("2d").drawImage(s,0,0);return c;}
function mvRgb(h){h=h.replace("#","");return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
function mvGrain(i){var s=Math.sin(i*12.9898+78.233)*43758.5453;return s-Math.floor(s);}
/* how far each point inside a shape lies from its edge, in pixels (the exact distance transform of Felzenszwalb and Huttenlocher) */
function mvEdt(ins,n){var BIG=1e12,f=new Float64Array(n),d=new Float64Array(n),v=new Int32Array(n),z=new Float64Array(n+1),g=new Float32Array(n*n),q,k,s,x,y;
  function one(){k=0;v[0]=0;z[0]=-BIG;z[1]=BIG;for(q=1;q<n;q++){s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k]);while(s<=z[k]){k--;s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k]);}k++;v[k]=q;z[k]=s;z[k+1]=BIG;}
    k=0;for(q=0;q<n;q++){while(z[k+1]<q)k++;d[q]=(q-v[k])*(q-v[k])+f[v[k]];}}
  for(x=0;x<n;x++){for(y=0;y<n;y++)f[y]=ins[y*n+x]?BIG:0;one();for(y=0;y<n;y++)g[y*n+x]=d[y];}
  for(y=0;y<n;y++){for(x=0;x<n;x++)f[x]=g[y*n+x];one();for(x=0;x<n;x++)g[y*n+x]=Math.sqrt(d[x]);}
  return g;}
function mvBlur(a,n){var t=new Float32Array(a.length),o=new Float32Array(a.length),x,y,i;
  for(y=0;y<n;y++)for(x=0;x<n;x++){i=y*n+x;t[i]=(a[x>0?i-1:i]+a[i]+a[x<n-1?i+1:i])/3;}
  for(y=0;y<n;y++)for(x=0;x<n;x++){i=y*n+x;o[i]=(t[y>0?i-n:i]+t[i]+t[y<n-1?i+n:i])/3;}return o;}
/* a wheel's outline and the shape of its surface: the rim and teeth stand higher than the face, and every edge is rounded */
function mvGeo(Dp,teeth,ho){var n=Math.ceil(Dp*mvScale()/2)*2,key="g"+[n,teeth,ho.n,ho.rh,ho.hr].join(":");if(MVC[key])return MVC[key];
  var u=n/100,sil=mvCv(n),x=sil.getContext("2d"),N=n*n,k,b,i;
  x.beginPath();gearPoly(teeth).split(" ").forEach(function(p,j){var a=p.split(",");if(j)x.lineTo(a[0]*u,a[1]*u);else x.moveTo(a[0]*u,a[1]*u);});x.closePath();x.fillStyle="#000";x.fill();
  x.globalCompositeOperation="destination-out";for(k=0;k<ho.n;k++){b=k*2*Math.PI/ho.n-Math.PI/2;x.beginPath();x.arc((50+ho.rh*Math.cos(b))*u,(50+ho.rh*Math.sin(b))*u,ho.hr*u,0,7);x.fill();}
  x.globalCompositeOperation="source-over";
  var A=x.getImageData(0,0,n,n).data,al=new Float32Array(N),ins=new Uint8Array(N);for(i=0;i<N;i++){al[i]=A[i*4+3]/255;ins[i]=al[i]>=.5?1:0;}
  var dist=mvEdt(ins,n),H=new Float32Array(N),RF=40.5*u,bv=1.15*u,rec=.85*u,top=3*u,c0=n/2,xx,yy,r,t,h;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){i=yy*n+xx;if(!ins[i]){H[i]=top-rec-bv-2*u;continue;}
    r=Math.sqrt((xx+.5-c0)*(xx+.5-c0)+(yy+.5-c0)*(yy+.5-c0));
    if(r>=RF){t=1-Math.min((r-RF)/rec,1);h=top-rec*(1-Math.sqrt(Math.max(0,1-t*t)));}else h=top-rec;
    t=1-Math.min(Math.max(0,dist[i]-.5)/bv,1);H[i]=h-bv*(1-Math.sqrt(Math.max(0,1-t*t)));}
  H=mvBlur(mvBlur(H,n),n);
  var NZ=new Float32Array(N),gx,gy;NZ.fill(1);
  for(yy=1;yy<n-1;yy++)for(xx=1;xx<n-1;xx++){i=yy*n+xx;gx=(H[i+1]-H[i-1])*.5;gy=(H[i+n]-H[i-n])*.5;NZ[i]=1/Math.sqrt(gx*gx+gy*gy+1);}
  return MVC[key]={key:key,n:n,k:n/Dp,u:u,al:al,nz:NZ,sil:sil,url:null};}
/* a wheel's shadow, softened once as it is drawn (the outline itself is drawn off the canvas; only its soft shadow lands on it) */
function mvCast(g,col){var key="s"+g.key+col;if(!MVC[key]){var pad=Math.round(g.n*.08),N=g.n+2*pad,c=mvCv(N),x=c.getContext("2d");
  x.shadowColor=col;x.shadowBlur=2*2.6*g.k;x.shadowOffsetX=N*2;x.drawImage(g.sil,pad-N*2,pad);MVC[key]=c;}return mvDup(MVC[key]);}
function mvMark(k){var m=MARK[k]||MARK.cloud;return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+
  '<g transform="translate(0 .55)" stroke="rgba(20,8,40,.42)">'+m+'</g><g>'+m+'</g></svg>';}
function mvUrl(g){if(!g.url)g.url=g.sil.toDataURL("image/png");return g.url;}
function mvTint(g,col){var key="t"+g.key+col;if(!MVC[key]){var c=mvCv(g.n),x=c.getContext("2d");x.drawImage(g.sil,0,0);x.globalCompositeOperation="source-in";x.fillStyle=col;x.fillRect(0,0,g.n,g.n);MVC[key]=c;}return mvDup(MVC[key]);}
/* the turning surface: a satin metal rim and teeth, a turned face in the model's colour, each rounded edge catching the light as a fine bright line;
   the steep edges reflect the room around them, so they read as metal, not as drawn outlines */
function mvFace(g,rimHex,faceHex){var P=mvPal(),key="f"+g.key+rimHex+faceHex+(mvNight()?"n":"d");if(MVC[key])return mvDup(MVC[key]);
  var n=g.n,u=g.u,c=mvCv(n),x=c.getContext("2d"),im=x.createImageData(n,n),o=im.data,RF=40.5*u,c0=n/2,R=mvRgb(rimHex),F=mvRgb(faceHex),S=P.spec,i,j,xx,yy,r,m,a,nz,ph,dif,sp,ao,gr,k;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){i=yy*n+xx;a=g.al[i];if(a<=0)continue;
    r=Math.sqrt((xx+.5-c0)*(xx+.5-c0)+(yy+.5-c0)*(yy+.5-c0));m=Math.min(1,Math.max(0,r-RF+.5));
    nz=g.nz[i];ph=Math.acos(nz>1?1:nz);dif=P.e0-P.e1*(1-nz);
    sp=P.ks*Math.exp(-(ph-.45)*(ph-.45)/.06)*(.45+.55*m);
    ao=r<RF?1-.24*Math.exp(-(RF-r)/(1.1*u)):1;
    gr=m>.5?1+.018*(mvGrain(i)-.5):1+.03*Math.sin(r/(1.6*u)*6.2832)+.022*(mvGrain(i)-.5);
    k=dif*ao*gr;j=i*4;
    o[j]=(R[0]*m+F[0]*(1-m))*k+S[0]*sp;o[j+1]=(R[1]*m+F[1]*(1-m))*k+S[1]*sp;o[j+2]=(R[2]*m+F[2]*(1-m))*k+S[2]*sp;o[j+3]=a*255;}
  x.putImageData(im,0,0);MVC[key]=c;return mvDup(c);}
/* the light that stays where it is: brighter toward the top left, the rim's inner wall shading the face, the turned face's sheen;
   it is held still inside the turning outline, so it falls only on the metal */
function mvLight(g){var nt=mvNight(),key="l"+g.key+(nt?"n":"d");if(MVC[key])return mvDup(MVC[key]);
  var n=g.n,u=g.u,c=mvCv(n),x=c.getContext("2d"),im=x.createImageData(n,n),o=im.data,c0=n/2,RF=40.5*u,RW=50*u,i,j,xx,yy,dx,dy,r,ex,ey,s,e,lt,dk,v,q,wt,din;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){dx=xx+.5-c0;dy=yy+.5-c0;r=Math.sqrt(dx*dx+dy*dy);if(r>RW)continue;i=yy*n+xx;ex=r?dx/r:0;ey=r?dy/r:0;
    s=(dx*MVLX+dy*MVLY)/RW;e=ex*MVLX+ey*MVLY;
    lt=(nt?.08:.2)*Math.max(0,-s);dk=(nt?.3:.24)*Math.max(0,s);
    wt=Math.min(1,Math.max(0,(r-41.5*u)/(3*u)));lt+=wt*(nt?.09:.2)*Math.max(0,-e);dk+=wt*(nt?.32:.26)*Math.max(0,e);
    if(r<RF){din=RF-r;dk+=(nt?.44:.34)*Math.max(0,-e)*Math.exp(-din/(1.5*u));lt+=(nt?.16:.36)*Math.max(0,e)*Math.exp(-din/(.5*u));
      q=Math.min(1,Math.max(0,(r-.12*RW)/(.33*RW)))*Math.min(1,Math.max(0,(RF-2*u-r)/(2*u)));
      v=Math.max(0,-e);v=v*v;lt+=q*(nt?.06:.16)*v*v;v=Math.max(0,e);v=v*v;lt+=q*(nt?.03:.07)*v*v;}
    v=lt-dk;j=i*4;if(v>=0){o[j]=o[j+1]=o[j+2]=255;o[j+3]=v*255;}else{o[j]=20;o[j+1]=8;o[j+2]=40;o[j+3]=-v*255;}}
  x.putImageData(im,0,0);MVC[key]=c;return mvDup(c);}
/* what polished metal shows where it faces this way: a bright ceiling, a darker floor, and the key light up and to the left */
function mvEnv(nx,ny,nz){var rx=2*nz*nx,ry=2*nz*ny,rz=2*nz*nz-1,k=Math.max(0,rx*MVK[0]+ry*MVK[1]+rz*MVK[2]),k2=k*k,k6=k2*k2*k2;
  return {d:(.6-.3*ry+.12*rz+.3*k6)/.74,s:Math.pow(k,40)};}
/* a polished ring standing on a face, domed across its width */
function mvRingPx(q,ex,ey,hs,base,P){var b=1-q*q,h=Math.sqrt(b>1e-3?b:1e-3),dh=-q/h*hs,nx=-dh*ex,ny=-dh*ey,l=Math.sqrt(nx*nx+ny*ny+1),E;nx/=l;ny/=l;E=mvEnv(nx,ny,1/l);
  var d=E.d*P.env,s=E.s*1.15;return [base[0]*d+P.spec[0]*s,base[1]*d+P.spec[1]*s,base[2]*d+P.spec[2]*s];}
/* a hub that does not need to turn, so it takes the light exactly: a polished ring, an enamel centre in the ring's shadow, the ring's shadow on the face;
   for Ingenium's wheel, the collar and the glazed enamel dial that hold the seal */
function mvSetting(Dp,frac,r1u,r2u,ringHex,innerHex,key,dial){var P=mvPal(),nt=mvNight(),n=Math.ceil(Dp*frac*mvScale()/2)*2;key+=n+ringHex+innerHex+(nt?"n":"d");if(MVC[key])return mvDup(MVC[key]);
  var u=n/(frac*100),c=mvCv(n),x=c.getContext("2d"),im=x.createImageData(n,n),o=im.data,c0=n/2,G=mvRgb(ringHex),F=mvRgb(innerHex),K=P.dark,
    r1=r1u*u,r2=r2u*u,rm=(r1+r2)/2,hw=(r2-r1)/2,RO=n/2,i,j,xx,yy,dx,dy,r,ex,ey,e,rg,en,cov,k,lit,sh,a,gl,din,gx,gy;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){dx=xx+.5-c0;dy=yy+.5-c0;r=Math.sqrt(dx*dx+dy*dy);if(r>RO)continue;i=yy*n+xx;j=i*4;ex=r?dx/r:0;ey=r?dy/r:0;e=ex*MVLX+ey*MVLY;
    if(r>r2+.5){a=(nt?.6:.4)*Math.max(0,e)*Math.exp(-(r-r2)/(1.2*u))+(nt?.25:.12)*Math.exp(-(r-r2)/(.5*u));o[j]=K[0];o[j+1]=K[1];o[j+2]=K[2];o[j+3]=Math.min(1,a)*255;continue;}
    rg=mvRingPx(Math.max(-1,Math.min(1,(r-rm)/hw)),ex,ey,.6,G,P);
    din=Math.max(0,r1-r);sh=(nt?.55:.42)*Math.max(0,-e)*Math.exp(-din/(1.7*u))+(nt?.2:.14)*Math.exp(-din/(.6*u));lit=(nt?.1:.3)*Math.max(0,e)*Math.exp(-din/(.45*u));
    k=(1-sh)*(1-(dial?.05:.08)*(r/r1)*(r/r1));gx=dx/r1+.38;gy=dy/r1+.45;gl=dial?(nt?.05:.16)*Math.exp(-(gx*gx+gy*gy)/.09):0;
    en=[F[0]*k+255*(lit+gl),F[1]*k+255*(lit+gl),F[2]*k+255*(lit+gl)];
    cov=Math.min(1,Math.max(0,r-r1+.5));a=Math.min(1,Math.max(0,r2+.5-r));
    o[j]=rg[0]*cov+en[0]*(1-cov);o[j+1]=rg[1]*cov+en[1]*(1-cov);o[j+2]=rg[2]*cov+en[2]*(1-cov);o[j+3]=255*(cov<1?1:a);}
  x.putImageData(im,0,0);MVC[key]=c;return mvDup(c);}
function mvHub(Dp,faceHex){return mvSetting(Dp,.46,16.5,20.2,mvPal().ring,faceHex,"h",false);}
function mvChaton(Dp){var P=mvPal();return mvSetting(Dp,.64,25,29.6,P.collar,P.floor,"c",true);}
/* the plate the wheels turn above: a fine frosted grain, the light across it from the top left, and a polished chamfer round its edge */
function mvPlate(size){var P=mvPal(),nt=mvNight(),s=mvScale(),n=Math.ceil(size*s/2)*2,key="p"+n+(nt?"n":"d");if(MVC[key])return mvDup(MVC[key]);
  var c=mvCv(n),x=c.getContext("2d"),R=n/2,bw=7*s,gr,t,tx,im,o,i,v,B=mvRgb(P.bevel),NS=360,k,a0,E,col;
  x.save();x.beginPath();x.arc(R,R,R-.5,0,7);x.clip();x.fillStyle=P.plate;x.fillRect(0,0,n,n);
  t=mvCv(96);tx=t.getContext("2d");im=tx.createImageData(96,96);o=im.data;for(i=0;i<96*96;i++){v=mvGrain(i*7.31+3);o[i*4]=o[i*4+1]=o[i*4+2]=v>.5?255:0;o[i*4+3]=Math.abs(v-.5)*(nt?24:34);}tx.putImageData(im,0,0);
  x.fillStyle=x.createPattern(t,"repeat");x.fillRect(0,0,n,n);
  gr=x.createRadialGradient(R*.62,R*.5,R*.05,R*.9,R*.85,R*1.25);gr.addColorStop(0,nt?"rgba(255,255,255,.07)":"rgba(255,255,255,.55)");gr.addColorStop(.6,"rgba(255,255,255,0)");gr.addColorStop(1,nt?"rgba(0,0,0,.3)":"rgba(60,40,100,.1)");
  x.fillStyle=gr;x.fillRect(0,0,n,n);
  x.lineWidth=bw+1;for(k=0;k<NS;k++){a0=k/NS*2*Math.PI;E=mvEnv(Math.cos(a0)*.7,Math.sin(a0)*.7,.714);
    col="rgb("+[0,1,2].map(function(q){return Math.min(255,Math.round(B[q]*E.d*P.env+P.spec[q]*E.s*.9));}).join(",")+")";
    x.strokeStyle=col;x.beginPath();x.arc(R,R,R-bw/2,a0-.004,a0+2*Math.PI/NS+.004);x.stroke();}
  x.lineWidth=1.1*s;x.strokeStyle=nt?"rgba(0,0,0,.5)":"rgba(70,50,110,.22)";x.beginPath();x.arc(R,R,R-bw-2.6*s,0,7);x.stroke();
  x.strokeStyle=nt?"rgba(255,255,255,.07)":"rgba(255,255,255,.8)";x.beginPath();x.arc(R,R,R-bw-1.5*s,0,7);x.stroke();
  x.restore();MVC[key]=c;return mvDup(c);}
function wheel3d(x,Dp,teeth,center,ghost){var w=el("div","mv-w enter"+(center?" mv-cw":"")+(ghost?" ghost":""));w.style.setProperty("--D",Dp+"px");tone(w,x);
  var P=mvPal(),g=mvGeo(Dp,teeth,center?{n:6,rh:35,hr:3.3}:{n:3,rh:29.5,hr:6}),face=center?"#6a3fb5":(x?x.T[1]:MVGHOST),tilt=el("div","mv-tilt"),s,url;
  var spin=function(cls,kid){var e=el("div","mv-spin"+(cls?" "+cls:""));if(kid)e.appendChild(kid);return e;};
  var cast=el("div","mv-cast");cast.appendChild(spin("",mvCast(g,P.cast)));w.appendChild(cast);w.appendChild(tilt);
  P.side.forEach(function(col,k){var l=el("div","mv-l mv-rim r"+(k+1));l.appendChild(spin("",mvTint(g,col)));tilt.appendChild(l);});
  var f=el("div","mv-l mv-face");s=spin("mv-mask",mvFace(g,center?P.crim:P.rim,face));url='url("'+mvUrl(g)+'")';s.style.webkitMaskImage=url;s.style.maskImage=url;
  s.appendChild(spin("mv-unspin",mvLight(g)));f.appendChild(s);tilt.appendChild(f);
  var hb=el("div","mv-hub"+(center?" mv-chaton":""));hb.appendChild(center?mvChaton(Dp):mvHub(Dp,face));tilt.appendChild(hb);
  if(x)tilt.appendChild(el("span","mv-mark",mvMark(x.k)));
  if(center)tilt.appendChild(el("div","mv-seat"));
  return w;}
/* the whole movement sways a little, as the seal does on Home, and comes back to face her whenever she points at it */
var SWAY=null,SWBACK=null;
function swayOn(sw){SWAY=SWBACK=null;if(still()||!sw.animate)return;
  SWAY=sw.animate([{transform:"rotateY(-9deg) rotateX(3.5deg)"},{transform:"rotateY(9deg) rotateX(-3.5deg)"}],{duration:5500,iterations:Infinity,direction:"alternate",easing:"ease-in-out"});
  try{SWAY.currentTime=2750;}catch(e){}}
function rest(on){if(!SWAY)return;var sw=SWAY.effect&&SWAY.effect.target;if(!sw)return;
  if(on){if(SWBACK){if(SWBACK.playbackRate<0)SWBACK.reverse();return;}var m=getComputedStyle(sw).transform;SWAY.pause();
    SWBACK=sw.animate([{transform:m&&m!=="none"?m:"none"},{transform:"none"}],{duration:900,easing:"cubic-bezier(.2,.8,.2,1)",fill:"both"});}
  else if(SWBACK){var b=SWBACK;if(b.playbackRate>0)b.reverse();b.onfinish=function(){if(b!==SWBACK||b.playbackRate>0)return;b.cancel();SWBACK=null;try{SWAY.play();}catch(e){}};}}
/* every turning layer of a wheel gets the same start and pace */
function spinSet(w,p,dir,r0){[].forEach.call(w.querySelectorAll(".mv-spin"),function(s){s.style.setProperty("--p",p);if(dir)s.style.setProperty("--dir",dir);if(r0)s.style.setProperty("--r0",r0);});}
function spins(){var a=[];[].forEach.call(cx.querySelectorAll(".mv-spin"),function(s){try{s.getAnimations().forEach(function(x){a.push(x);});}catch(e){}});return a;}
/* the movement slows to a stop and gathers speed again, rather than jumping */
function ramp(to,ms,then){if(still()){RATE=to;spins().forEach(function(a){try{a.playbackRate=to;}catch(e){}});return;}var from=RATE,t0=performance.now(),id=++rampId;
  (function step(now){if(id!==rampId)return;var k=Math.min(1,(now-t0)/ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;RATE=from+(to-from)*e;
    spins().forEach(function(a){try{a.playbackRate=RATE;}catch(x){}});if(k<1)requestAnimationFrame(step);else if(then)then();})(t0);}
/* every wheel counts from the same moment, so the teeth keep meshing */
function syncWheels(){var all=spins();if(!all.length)return;var t=all[0].currentTime||0;all.forEach(function(a){try{a.currentTime=t;a.playbackRate=RATE;}catch(e){}});}
/* a wheel tilts to follow a mouse, as the seal and the keys do */
function wireTilt(hit,w){hit.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||still())return;var r=w.getBoundingClientRect();if(!r.width)return;
    var X=Math.max(-.25,Math.min(1.25,(e.clientX-r.left)/r.width)),Y=Math.max(-.25,Math.min(1.25,(e.clientY-r.top)/r.height));
    w.style.setProperty("--ry",((X-.5)*30).toFixed(1)+"deg");w.style.setProperty("--rx",(-(Y-.5)*26).toFixed(1)+"deg");},{passive:true});
  hit.addEventListener("pointerleave",function(){w.style.setProperty("--rx","0deg");w.style.setProperty("--ry","0deg");});}
/* the seal and its wheel move as one: pointing at the seal tilts and lifts the whole wheel; pressing it sinks the wheel */
function bindSeal(){if(!SEALKEY||SEALKEY.__mv)return;SEALKEY.__mv=1;var k=SEALKEY.querySelector(".r175-seal");if(!k)return;var cwv=function(){return cx.querySelector(".mv-cw");};
  k.addEventListener("pointermove",function(e){var c=cwv();if(!c||e.pointerType!=="mouse"||still())return;var r=c.getBoundingClientRect();if(!r.width)return;var X=(e.clientX-r.left)/r.width,Y=(e.clientY-r.top)/r.height;
    c.style.setProperty("--ry",((X-.5)*30).toFixed(1)+"deg");c.style.setProperty("--rx",(-(Y-.5)*26).toFixed(1)+"deg");c.classList.add("hov");},{passive:true});
  k.addEventListener("pointerenter",function(){rest(true);});
  k.addEventListener("pointerleave",function(){rest(false);var c=cwv();if(!c)return;c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg");c.classList.remove("hov","dn");});
  k.addEventListener("pointerdown",function(){var c=cwv();if(c&&!still())c.classList.add("dn");});
  ["pointerup","pointercancel"].forEach(function(t){k.addEventListener(t,function(){var c=cwv();if(c)c.classList.remove("dn");});});}
function hook3d(hit,w,x,i,lb){hit.addEventListener("pointerenter",function(e){if(!still())w.classList.add("hov");});hit.addEventListener("pointerleave",function(){w.classList.remove("hov","dn");});
  hit.addEventListener("pointerdown",function(){if(!still())w.classList.add("dn");});["pointerup","pointercancel"].forEach(function(t){hit.addEventListener(t,function(){w.classList.remove("dn");});});
  hit.addEventListener("focus",function(){w.classList.add("hov");});hit.addEventListener("blur",function(){w.classList.remove("hov");});hook(hit,x,i,lb);}
var SEALKEY=D.getElementById("mvSeal");  /* the one live seal key, kept and set back into its hub each time the movement is drawn */
var SEAL='<span class="seal"><img class="only-day" alt="" src="{{SEAL_ING}}"><img class="only-night" alt="" src="{{SEAL_INGN}}"></span>';
var DIRS={
  movement:{eye:"Blend · the movement of your models",word:function(n){return n+" wheels in the movement";},noun:"wheel",
    build:function(list){var n=Math.max(2,list.length),C=[260,214],a0=n===2?180:-90,Dm=n>4?70:84,Tm=Math.round(32*Dm/132),Pc=60,Pm=Pc*Tm/32,R=132*.4625+Dm*.4625,s1=360/32,s2=360/Tm;
      cx.innerHTML="";cx.onpointermove=null;cx.onpointerleave=null;var stg=el("div","mv-stage3"),sw=el("div","mv-sway");stg.appendChild(sw);cx.appendChild(stg);
      sw.appendChild(el("i","mv-under"));var pl=el("div","mv-plate",'<i style="--z:12"></i><i style="--z:8"></i><i style="--z:4"></i>');pl.appendChild(mvPlate(340));pl.setAttribute("aria-hidden","true");sw.appendChild(pl);
      var cw=wheel3d(null,132,32,true,false);cw.style.left=C[0]+"px";cw.style.top=C[1]+"px";spinSet(cw,Pc+"s");sw.appendChild(cw);
      if(SEALKEY){cw.querySelector(".mv-seat").appendChild(SEALKEY);SEALKEY.hidden=false;bindSeal();}hub=SEALKEY;
      for(var i=0;i<n;i++){var th=a0+i*360/n,a=th*Math.PI/180,x=list[i],gx=C[0]+R*Math.cos(a),gy=C[1]+R*Math.sin(a);
        var w=wheel3d(x,Dm,Tm,false,!x);w.style.left=gx.toFixed(1)+"px";w.style.top=gy.toFixed(1)+"px";w.style.animationDelay=(.06+i*.07)+"s";
        /* its teeth set into the gaps of Ingenium's wheel where they meet */
        var pc=(((th/s1)%1)+1)%1,r2=th+180-s2*((((.2-pc)%1)+1)%1);spinSet(w,Pm.toFixed(3)+"s","reverse",r2.toFixed(2)+"deg");
        var hit=el("button","mv-hit");hit.type="button";w.querySelector(".mv-tilt").appendChild(hit);sw.appendChild(w);wireTilt(hit,w);
        var lb=el("div","mv-label lbl",x?'<span class="nm">'+x.n+'</span><span class="rl">'+role(x)+'</span>':'<span class="ghostname">a model</span>'),L=204;
        var ca=Math.cos(a),sa=Math.sin(a),side=ca>.25?"r":ca<-.25?"l":sa<0?"t":"b";lb.classList.add("at-"+side);L=184;
        lb.style.left=(C[0]+L*ca).toFixed(1)+"px";lb.style.top=(C[1]+(side==="t"?-178:side==="b"?178:L*sa)).toFixed(1)+"px";cx.appendChild(lb);hook3d(hit,w,x,i,lb);}
      syncWheels();swayOn(sw);},
    emblem:function(){var s=el("span","emb");s.innerHTML=gearSvg(32,true)+SEAL;return s;}}
};
/* every piece in the blend: pointed at, the blend rests and names it; pressed, step I opens at its row */
function hook(b,x,i,lb){b.__x=x;b.__i=i;b.__lb=lb;
  if(x){b.setAttribute("aria-label",x.n+": "+(role(x)||"in the blend")+". Press to see it in step one.");
    b.addEventListener("pointerenter",function(){near(b,true);});b.addEventListener("pointerleave",function(){near(b,false);});
    b.addEventListener("focus",function(){near(b,true);});b.addEventListener("blur",function(){near(b,false);});
    b.addEventListener("click",function(){tab(false);show(1);var row=x.row;row.classList.add("seen");scrollTo(row,"center");setTimeout(function(){row.classList.remove("seen");},1600);});}
  else{b.setAttribute("aria-label","Choose a model for the blend");b.addEventListener("click",function(){tab(false);show(1);});}}
function near(b,v){if(v){if(held&&held!==b)near(held,false);held=b;cx.classList.add("hold");ramp(0,650);rest(true);if(b.__lb)b.__lb.classList.add("near");var x=b.__x;
    if(x)count.innerHTML="<b>"+x.n+"</b>, "+(x.at==="cloud"?"connected":"on this device")+": "+lower(x.d.replace(/^Connected · /,""))+". In this blend it "+(role(x)||"answers")+". Press it to see it in step I.";}
  else{if(b.__lb)b.__lb.classList.remove("near");if(held===b){held=null;cx.classList.remove("hold");count.textContent=countText;ramp(1,900);rest(false);}}}
function draw(){held=null;cx.classList.remove("hold");var d=DIRS[dir];eye.textContent=d.eye;d.build(chosen.slice());
  var n=chosen.length;countText=n<2?(n?"One more model, and the blend can begin.":"Choose two or more models."):d.word(n)+", brought together as "+lower(WAYS[way][1])+". Point at one to see what it does.";
  count.textContent=countText;note();}
/* the presses of Ingenium's piece in each direction */
function chime(){if(still()){say("Ingenium's star holds the setting together.");return;}
  [].forEach.call(cx.querySelectorAll(".st-gem .gm:not(.ghost)"),function(g,i){setTimeout(function(){g.classList.add("hov","glint");setTimeout(function(){g.classList.remove("hov","glint");},520);},i*140);});
  var sw=cx.querySelector(".st-sweep");if(sw&&sw.animate)sw.animate([{backgroundPosition:"135% 0"},{backgroundPosition:"-35% 0"}],{duration:900,easing:"ease-in-out"});}
/* day and night: the movement is rendered again in the new light */
(function(){var host=cx.closest("[data-theme]");if(!host||!W.MutationObserver)return;var last=mvNight();
  new MutationObserver(function(){var nt=mvNight();if(nt!==last){last=nt;draw();}}).observe(host,{attributes:true,attributeFilter:["data-theme"]});})();
function wind(){if(still()){say("Ingenium's seal drives the movement.");return;}ramp(4,380,function(){ramp(1,1500);});}
function conduct(bt){if(still()){say("The baton keeps the voices together.");return;}
  if(bt.animate)bt.animate([{transform:"rotate(0deg)"},{transform:"rotate(-24deg)",offset:.22},{transform:"rotate(-6deg)",offset:.45},{transform:"rotate(-18deg)",offset:.66},{transform:"rotate(-2deg)",offset:.86},{transform:"rotate(0deg)"}],{duration:1300,easing:"ease-in-out"});
  [].forEach.call(cx.querySelectorAll(".sc-notes"),function(nt,i){if(nt.animate)nt.animate([{transform:"translateY(0)"},{transform:"translateY(-5px)",offset:.3},{transform:"translateY(0)",offset:.6},{transform:"translateY(-2px)",offset:.8},{transform:"translateY(0)"}],{duration:900,delay:i*90,easing:"ease-out"});});}

/* the engine: Ingenium's own seal key, as on Home (R175): it tilts to follow a mouse, sinks when pressed, and every press plays a flourish */
var KEY=D.getElementById("hxSealKey"),busy=false,again=false,lastF="",count7=0,ends=[];
function anim(e,frames,o){if(!e||!e.animate)return null;try{var a=e.animate(frames,o);ends.push(a.finished.then(function(){},function(){}));return a;}catch(x){return null;}}
function parts(){var isl=KEY.querySelector(".isl");return {fx:KEY.querySelector(".r175-fx"),glow:KEY.querySelector(".r175-glow"),ripple:KEY.querySelector(".r175-ripple"),
  tilt:isl&&isl.querySelector(".isl-tilt"),cast:isl&&isl.querySelector(".isl-cast"),ring:isl&&isl.querySelector(".isl-ring > svg"),star:isl&&isl.querySelector(".isl-star > svg"),heart:isl&&isl.querySelector(".isl-heart > svg")};}
function glow(P,gold,strong){if(!P.glow)return;P.glow.classList.toggle("gold",!!gold);try{P.glow.getAnimations().forEach(function(a){a.cancel();});}catch(e){}
  anim(P.glow,[{opacity:0,scale:.82},{opacity:strong?1:.85,scale:1.04,offset:.3},{opacity:0,scale:1.12}],{duration:still()?700:1000,easing:"ease-out"});}
var SPRING="cubic-bezier(.2,.8,.25,1)";
var FL={spin:function(P,d){anim(P.star,[{rotate:"0deg"},{rotate:(d*360)+"deg"}],{duration:1150,easing:"cubic-bezier(.25,.9,.3,1)"});anim(P.ring,[{rotate:"0deg"},{rotate:(-d*360)+"deg"}],{duration:1300,easing:"cubic-bezier(.3,.8,.3,1)"});
    anim(P.heart,[{scale:1},{scale:1.14,offset:.35},{scale:1}],{duration:900,easing:"ease-in-out"});glow(P,false);},
  pulse:function(P){anim(P.ring,[{scale:1},{scale:1.13,offset:.28},{scale:.97,offset:.6},{scale:1.03,offset:.8},{scale:1}],{duration:950,easing:"ease-out"});anim(P.ripple,[{opacity:.6,scale:.86},{opacity:0,scale:1.55}],{duration:950,easing:"ease-out"});glow(P,false);},
  hop:function(P){anim(P.fx,[{transform:"translateY(0) scale(1,1)"},{transform:"translateY(3%) scale(1.06,.92)",offset:.12},{transform:"translateY(-18%) scale(.97,1.04)",offset:.42},{transform:"translateY(0) scale(1.05,.94)",offset:.7},{transform:"translateY(-3%) scale(1,1)",offset:.85},{transform:"translateY(0) scale(1,1)"}],{duration:900,easing:"ease-in-out"});
    anim(P.cast,[{opacity:1},{opacity:.35,offset:.42},{opacity:1,offset:.7},{opacity:1}],{duration:900,easing:"ease-in-out"});glow(P,false);},
  wobble:function(P,d){anim(P.tilt,[{rotate:"y 0deg"},{rotate:"y "+(d*30)+"deg",offset:.2},{rotate:"y "+(-d*20)+"deg",offset:.45},{rotate:"y "+(d*11)+"deg",offset:.68},{rotate:"y "+(-d*4)+"deg",offset:.86},{rotate:"y 0deg"}],{duration:1250,easing:"ease-in-out"});glow(P,false);},
  twirl:function(P,d){anim(P.fx,[{transform:"rotate(0deg) scale(1)"},{transform:"rotate("+(d*180)+"deg) scale(.9)",offset:.45},{transform:"rotate("+(d*360)+"deg) scale(1.04)",offset:.8},{transform:"rotate("+(d*360)+"deg) scale(1)"}],{duration:1100,easing:SPRING});anim(P.star,[{rotate:"0deg"},{rotate:(-d*180)+"deg"}],{duration:1100,easing:SPRING});glow(P,false);},
  beat:function(P){anim(P.heart,[{scale:1},{scale:1.3,offset:.14},{scale:1.04,offset:.3},{scale:1.24,offset:.46},{scale:1,offset:.7},{scale:1}],{duration:1100,easing:"ease-in-out"});anim(P.ring,[{scale:1},{scale:1.04,offset:.14},{scale:1,offset:.3},{scale:1.03,offset:.46},{scale:1}],{duration:1100,easing:"ease-in-out"});glow(P,true,true);},
  grand:function(P,d){FL.spin(P,d);FL.hop(P);anim(P.ripple,[{opacity:.65,scale:.86},{opacity:0,scale:1.7}],{duration:1100,easing:"ease-out"});glow(P,true,true);}};
var ORDER=["spin","pulse","hop","wobble","twirl","beat"];
function pick(){count7++;if(count7%7===0)return "grand";var c=ORDER.filter(function(n){return n!==lastF;});return c[Math.floor(Math.random()*c.length)];}
function play(){var P=parts();if(still()){glow(P,false);return;}busy=true;ends=[];var name=pick(),d=Math.random()<.5?-1:1;lastF=name;try{FL[name](P,d);}catch(e){}
  var mine=ends.slice();function fin(){busy=false;if(again){again=false;play();}}if(!mine.length)fin();else Promise.all(mine).then(fin);}
if(KEY){var isl=function(){return KEY.querySelector(".isl");};
  KEY.addEventListener("pointerenter",function(e){var q=isl();if(q&&e.pointerType==="mouse"&&!still())q.classList.add("hover");});
  KEY.addEventListener("pointermove",function(e){var q=isl();if(!q)return;var r=q.getBoundingClientRect();if(!r.width)return;var x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    q.style.setProperty("--gx",(x*100).toFixed(1)+"%");q.style.setProperty("--gy",(y*100).toFixed(1)+"%");
    if(e.pointerType==="mouse"&&!still()){x=Math.max(-.25,Math.min(1.25,x));y=Math.max(-.25,Math.min(1.25,y));q.style.setProperty("--ry",((x-.5)*28).toFixed(1)+"deg");q.style.setProperty("--rx",(-(y-.5)*24).toFixed(1)+"deg");}},{passive:true});
  KEY.addEventListener("pointerleave",function(){var q=isl();if(!q)return;q.classList.remove("hover","down");q.style.setProperty("--rx","0deg");q.style.setProperty("--ry","0deg");});
  KEY.addEventListener("pointerdown",function(){var q=isl();if(q&&!still())q.classList.add("down");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){KEY.addEventListener(t,function(e){var q=isl();if(!q)return;q.classList.remove("down");if(e.pointerType!=="mouse")q.classList.remove("hover");},{passive:true});});
  KEY.addEventListener("click",function(e){e.preventDefault();wind();if(busy){again=true;glow(parts(),false);return;}play();});
  var edge=KEY.querySelector(".isl-edge");if(edge&&!edge.querySelector(".mv-rim"))for(var k=4;k>=1;k--){var ri=el("i","mv-rim");ri.style.setProperty("--k",String(k));edge.insertBefore(ri,edge.firstChild);}
  try{new ResizeObserver(function(){var q=isl();if(q)q.style.setProperty("--S",KEY.offsetWidth+"px");}).observe(KEY);}catch(e){}}

/* ---------- step I: the models, each with its piece ---------- */
function modelRow(x){var b=el("button","bx-model");b.type="button";b.setAttribute("aria-pressed","false");var slot=el("span","slot");b.appendChild(slot);
  b.appendChild(el("span","t","<b>"+x.n+"</b><small>"+x.d+"</small>"));
  b.appendChild(el("span","bx-check",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'));
  pop(b);b.addEventListener("click",function(){var k=chosen.indexOf(x);if(k<0)chosen.push(x);else chosen.splice(k,1);b.setAttribute("aria-pressed",k<0?"true":"false");draw();});
  x.row=b;x.slot=slot;return b;}
function paintRows(){MODELS.forEach(function(x){x.slot.innerHTML="";var p=piece(x,40);x.slot.appendChild(p);if(!x.row.__w){x.row.__w=1;}x.row.__p=p;});}
MODELS.forEach(function(x){(x.at==="local"?D.getElementById("bxLocal"):D.getElementById("bxCloud")).appendChild(modelRow(x));});
MODELS.forEach(function(x){x.row.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"&&!still()&&x.row.__p)x.row.__p.classList.add("hov");});
  x.row.addEventListener("pointerleave",function(){if(x.row.__p)x.row.__p.classList.remove("hov","dn");});
  x.row.addEventListener("pointerdown",function(){if(x.row.__p&&!still())x.row.__p.classList.add("dn");});x.row.addEventListener("pointerup",function(){if(x.row.__p)x.row.__p.classList.remove("dn");});});

/* ---------- the steps ---------- */
var STEPS=[["I","Choose","the models"],["II","Combine","how they work together"],["III","Ask","your question"],["IV","Answers","as they are written"]],cur=1,done={};
var stepsNav=D.getElementById("bxSteps");
STEPS.forEach(function(s,i){var b=el("button","stg");b.type="button";b.innerHTML='<span class="rn">'+s[0]+'</span><span class="tl"><b>'+s[1]+'</b><small>'+s[2]+'</small></span>'+
    '<span class="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>';
  b.setAttribute("aria-label","Step "+(i+1)+": "+s[1]);b.addEventListener("click",function(){show(i+1);});stepsNav.appendChild(b);});
function show(n){if(n>cur)for(var k=cur;k<n;k++)done[k]=1;cur=n;
  [].forEach.call(stepsNav.children,function(b,i){if(i+1===cur)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");b.classList.toggle("done",!!done[i+1]&&i+1!==cur);});
  [].forEach.call(D.querySelectorAll(".bx-pane"),function(p){p.classList.toggle("on",+p.getAttribute("data-step")===cur);});}
[].forEach.call(D.querySelectorAll("[data-go]"),function(b){b.addEventListener("click",function(){show(+b.getAttribute("data-go"));});});
show(1);

/* ---------- the ways ---------- */
var waysBox=D.getElementById("bxWays"),lastG=null;
WAYS.forEach(function(w,i){if(w[0]&&w[0]!==lastG){lastG=w[0];waysBox.appendChild(el("div","bx-grp",w[0]));}
  var b=el("button","bx-way","<b>"+w[1]+"</b><span>"+w[2]+"</span>");b.type="button";b.setAttribute("aria-pressed",i===way?"true":"false");
  pop(b);b.addEventListener("click",function(){way=i;[].forEach.call(waysBox.querySelectorAll(".bx-way"),function(x){x.setAttribute("aria-pressed","false");});b.setAttribute("aria-pressed","true");draw();});waysBox.appendChild(b);});
var eff=D.getElementById("bxEffort");["Auto","Low","Medium","High","Max","Ultra"].forEach(function(t,i){var b=el("button","bx-key",t);b.type="button";b.setAttribute("aria-selected",i===0?"true":"false");
  b.addEventListener("click",function(){[].forEach.call(eff.children,function(x){x.setAttribute("aria-selected","false");});b.setAttribute("aria-selected","true");});eff.appendChild(b);});

/* ---------- ask and run (the answers are made up for the preview) ---------- */
var noteEl=D.getElementById("bxNote");function note(){noteEl.textContent=chosen.length<2?"Choose at least two models: on this device, connected, or both.":"Ready: "+chosen.map(function(x){return x.n;}).join(", ")+" · "+WAYS[way][1]+".";}
var out=D.getElementById("bxOut"),running=false;
var THINK={velox:"Read the three openings once. The second starts in a scene; the first starts with history; the third with an image. Chose the one that reaches its claim soonest.",
  magister:"Compared each opening on three things: how soon the claim appears, how specific it is, and what the reader sees. The second wins the first two; the third wins the last.",
  scriba:"Read each aloud for rhythm and length. The second runs three beats; cutting its last clause makes two, which suits an opening.",
  faber:"Looked at structure only: which opening names the thesis in its first paragraph. Only the second does.",
  claude:"Weighed the openings and proposed a joined version that keeps the strongest part of each.",gpt:"Judged the specificity of each claim and the setup for the evidence."};
var SAY={velox:"The second opening is the strongest: it starts in the scene and earns its claim by the third sentence. The first explains too much too soon.",
  magister:"Weighing the three: the second has the clearest line of argument; the third has the best image. Keep the second's order and borrow the third's image for the first line.",
  scriba:"Read aloud, the second opening has the best rhythm. Trim its last clause and the paragraph lands in two beats instead of three.",
  faber:"As a structure, the second is the only one whose first paragraph names what the essay will prove; the others leave the claim for later.",
  claude:"The second opening is strongest. A joined version: begin with the third's image, then the second's claim, and drop the first's history.",
  gpt:"I would keep the second. Its claim is specific and arguable, and it sets up the evidence that follows."};
function typeInto(p,text,ms,fin){var i=0;p.classList.add("caret");(function step(){if(!p.isConnected)return;i=Math.min(text.length,i+(still()?text.length:3));p.textContent=text.slice(0,i);
  if(i<text.length)setTimeout(step,ms);else{p.classList.remove("caret");fin&&fin();}})();}
function run(){if(running)return;if(chosen.length<2){say("Choose at least two models first.");show(1);return;}running=true;show(4);
  out.innerHTML="";var list=chosen.slice(),i=0;
  (function next(){if(i>=list.length){finish(list);return;}var x=list[i++];var a=el("div","bx-ans");var s=piece(x,38);s.classList.add("turn");a.appendChild(s);wire(a,s);pop(a);a.setAttribute("role","button");a.tabIndex=0;
    var t=el("div","t",'<div class="who">'+x.n+' <small>'+(x.at==="cloud"?"connected":"on this device")+' · writing</small></div>');var p=el("p");t.appendChild(p);a.appendChild(t);out.appendChild(a);
    typeInto(p,SAY[x.id]||"An answer.",22,function(){s.classList.remove("turn");t.querySelector("small").textContent=(x.at==="cloud"?"connected":"on this device")+" · done";
      var mo=el("span","more","Show its thinking");t.appendChild(mo);var th=el("div","think",THINK[x.id]||"It read the question, weighed the three openings and wrote its answer.");t.appendChild(th);
      var tog=function(){var o2=a.classList.toggle("open");mo.textContent=o2?"Hide its thinking":"Show its thinking";};a.addEventListener("click",tog);a.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();tog();}});next();});})();}
function finish(list){var f=pop(el("div","bx-final"));var h=el("h3");h.appendChild(DIRS[dir].emblem());h.appendChild(D.createTextNode("The blended answer"));f.appendChild(h);
  var p=el("p");f.appendChild(p);f.appendChild(el("p","how",WAYS[way][1]+" · written by "+(list[1]?list[1].n:list[0].n)+" · "+list.length+" models"));
  var acts=el("div","bx-acts");[["Send to the chat",1],["Copy",0],["Save as a Word file",0]].forEach(function(k){var b=el("button","bx-key"+(k[1]?" pri":""),k[0]);b.type="button";b.addEventListener("click",function(){say("In Ingenium: "+k[0].toLowerCase()+".");});acts.appendChild(b);});
  f.appendChild(acts);out.appendChild(f);
  typeInto(p,"Keep the second opening as your spine. Open with the third's image, follow with the second's claim in its own words, and let the first's history wait for the second paragraph, where it supports the claim instead of delaying it.",18,function(){running=false;});}
D.getElementById("bxRun").addEventListener("click",run);
D.getElementById("bxSave").addEventListener("click",function(){say("In Ingenium this saves the blend as a house for the chat.");});
D.getElementById("bxAgain").addEventListener("click",function(){show(3);D.getElementById("bxTask").focus();});

/* ---------- ready-made blends ---------- */
var READY=[["Second opinion","Two models answer; the larger judges both, rates them, and writes the answer that held up.","Judge and decide",["scriba","magister"],5],
  ["Scholar's desk","For essays and arguments: both think first, the larger counts for three, and one careful answer is written.","Compare and combine · thinking first",["magister","scriba"],3],
  ["Careful code","Faber drafts the code; Magister reads it and improves it. The improved draft is the answer.","Pass and refine · thinking first",["faber","magister"],1],
  ["Quick draft, careful edit","Velox drafts at once; Magister improves the draft.","Pass and refine",["velox","magister"],1],
  ["Best of three","Three answers side by side; you keep the one you like best.","Best of the batch",["velox","scriba","magister"],2]];
var rp=D.getElementById("bxReadyPane");
function paintReady(){rp.innerHTML="";READY.forEach(function(r){var c=pop(el("div","bx-card"));c.appendChild(el("h4",null,r[0]));var ms=r[3].map(function(id){return MODELS.filter(function(m){return m.id===id;})[0];});
  var ps=el("div","pieces");ms.forEach(function(x){var s=piece(x,38);ps.appendChild(s);wire(c,s);});c.appendChild(ps);
  c.appendChild(el("p",null,r[1]));c.appendChild(el("div","meta",r[2]));var b=el("button","bx-key pri","Use this blend");b.type="button";
  b.addEventListener("click",function(){chosen=ms.slice();MODELS.forEach(function(x){x.row.setAttribute("aria-pressed",chosen.indexOf(x)>=0?"true":"false");});
    way=r[4];[].forEach.call(waysBox.querySelectorAll(".bx-way"),function(x,i){x.setAttribute("aria-pressed",i===way?"true":"false");});draw();tab(false);done[1]=done[2]=1;show(3);say("Set: "+r[0]+". Write the question and run it.");});
  c.appendChild(b);rp.appendChild(c);});}
var tNew=D.getElementById("tabNew"),tReady=D.getElementById("tabReady");
function tab(ready){tNew.setAttribute("aria-selected",ready?"false":"true");tReady.setAttribute("aria-selected",ready?"true":"false");D.getElementById("bxNewPane").hidden=ready;stepsNav.hidden=ready;rp.hidden=!ready;}
tNew.addEventListener("click",function(){tab(false);});tReady.addEventListener("click",function(){tab(true);});

/* ---------- the three directions, chosen above the window ---------- */
function setDir(d){dir=d;[].forEach.call(D.querySelectorAll(".dirs button"),function(b){b.setAttribute("aria-pressed",b.getAttribute("data-dir")===d?"true":"false");});
  draw();paintRows();paintReady();var f=out.querySelector(".bx-final h3 .emb");if(f)f.parentNode.replaceChild(DIRS[dir].emblem(),f);
  [].forEach.call(out.querySelectorAll(".bx-ans"),function(a){var old=a.firstChild,x=MODELS.filter(function(m){return a.querySelector(".who").textContent.indexOf(m.n)===0;})[0];if(x&&old){var s=piece(x,38);a.replaceChild(s,old);}});}
[].forEach.call(D.querySelectorAll(".dirs button"),function(b){b.addEventListener("click",function(){setDir(b.getAttribute("data-dir"));});});
/* two models to begin with, so the blend is seen working */
chosen=[MODELS[1],MODELS[2]];MODELS.forEach(function(x){x.row.setAttribute("aria-pressed",chosen.indexOf(x)>=0?"true":"false");});setDir("movement");
W.__blend3={state:function(){return {dir:dir,pieces:[].map.call(cx.querySelectorAll("[aria-label]"),function(b){return b.getAttribute("aria-label").split(":")[0];}),held:held&&held.__x?held.__x.n:null,way:WAYS[way][1],step:cur,running:running};},set:setDir};
})();
</script>
