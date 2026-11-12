<style id="r284-css">
/* ============ R284 · THE STUDIOS' HEADS, AND FOCUS'S ARMILLARY (Ingenium 6.93, 12 November 2026) ============
   The owner's words (12 November 2026): "I want to redesign the Focus, Lector page and the Career Studio to match the rest of the app and
   overall enhance their designs but I do like their 3 panel views so I want that preserved please"; "I want regal and elevated to match
   these pages. I want them refined, elevated and elegant while being 3D. I want them theme related without being on the nose. I want them
   to look like they belong inside of Ingenium, like they are built-in and not just a random page next to these pages."
   The heads were drawn in an earlier session and approved on its pictures (the four chosen on 12 November 2026: the tree of versions,
   the fan of documents, the armillary sphere and the dial of the path); that session's sources were lost when it ended, so these are
   drawn again from the approved pictures, in the turret's slab (modules/r269.js), with the orbs drawn as Home's are (modules/r261.js).
   This module holds what every head shares, and the head of the hours of the day (the Focus page):
   - IngHeads.mount: the slab, its eyebrow, the page's own title and lede moved into it, its keys, a line under them, the hint at its
     foot and a label at the top of the scene; the scene beside the words from 900 pixels (scaled to a little under half the slab),
     under them below that, and gone below 260 (the page as it was). The page's own title and lede go back where they were when it leaves.
   - --hd-room: a room that fills the window (three panels) keeps the window's height under its head (each room's module says which
     of its variables takes it), so a short scroll shows the whole room as before; its own steps and tabs stay where they are.
   - IngHeads.orb: an orb painted as Home's are (the same body, surface, side away from the light, edge and one soft highlight), by
     day in Ingenium's violets, by night in the page's own purple.
   - IngHeads.loop: a scene drawn on a canvas runs only while its page is shown, the window is visible, the head is on screen and
     motion is allowed; left alone, nothing in the page is rewritten (the canvas draws; no element changes).
   - Focus: an armillary sphere on its stand. Its meridian ring holds the day's sphere, which wears Focus's mark; a ring of hours with
     its small moon goes round it, and a band crosses it. The owner's words on its first live movement (12 November 2026): "For the
     Focus page, I want to see movement and the sphere spinning." So the sphere turns on its axis as a globe does (its meridians and
     markings run across its face under a still light), the ring carries its twelve hours round, the band turns about the upright as a
     gyroscope's does and carries its ticks the other way, the moon goes round, and the whole sways; pointed at, it comes to rest
     facing you; pressed, it opens Today. Beside it, the time and what the hour is good for. Its keys begin the routine the hour suits, and
     open your routines. Minimal motion and the system's reduced motion keep it still. */
.hd-on{--hd-page0:#fdfcff;--hd-page1:#efe9f8;--hd-ring:rgba(106,63,181,.12);--hd-ink3:#7b7190;--hd-tag:#2e1764;--hd-card:#ffffff;--hd-hair2:rgba(34,26,46,.07);
  --hd-serif:"Head Cormorant","Home Cormorant","Cormorant Garamond",Cormorant,var(--serif,Georgia),serif;--hd-sans:var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif)}
body[data-theme="night"] .hd-on{--hd-page0:#1d1529;--hd-page1:#120c1b;--hd-ring:rgba(205,184,240,.12);--hd-ink3:#9a8fb0;--hd-tag:#efe6ff;--hd-card:#241b33;--hd-hair2:rgba(205,184,240,.08)}
.hd-on > .hd-head{position:relative;display:grid;grid-template-columns:minmax(0,1fr) var(--hd-col,520px);grid-column-gap:20px;align-items:stretch;max-width:1180px;min-height:calc(410px * var(--hd-k,1) + 60px);
  margin:0 auto 22px;padding:34px 24px 26px 40px;box-sizing:border-box;border-radius:30px;overflow:hidden;isolation:isolate;
  background:radial-gradient(ellipse 72% 90% at 74% 45%,var(--hd-page0) 0%,var(--hd-page1) 76%);
  box-shadow:inset 0 0 0 1px var(--hd-ring),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.08)}
body[data-theme="night"] .hd-on > .hd-head{box-shadow:inset 0 0 0 1px var(--hd-ring),0 14px 28px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4)}
.hd-on.hd-stack > .hd-head{grid-template-columns:minmax(0,1fr);min-height:0;padding:28px 24px 24px}
.hd-on.hd-phone > .hd-head{padding:22px 18px 20px;border-radius:24px}
.hd-on .hd-words{display:flex;flex-direction:column;min-width:0}
.hd-on .hd-eyebrow{display:flex;flex-wrap:wrap;font:600 11.5px/1.2 var(--hd-sans);letter-spacing:.28em;text-transform:uppercase;color:var(--hd-ink3)}
.hd-on .hd-eyebrow b{margin-right:14px;color:var(--accent);font-weight:600}
.hd-on .hd-words > .page-title,.hd-on .hd-words > .hd-title{margin:14px 0 10px;padding:0;font:600 56px/1.02 var(--hd-serif);letter-spacing:.005em;color:var(--ink-1);border:0}
.hd-on.hd-phone .hd-words > .page-title,.hd-on.hd-phone .hd-words > .hd-title{font-size:44px}
.hd-on .hd-words > .lede,.hd-on .hd-words > .hd-lede{margin:0 0 18px;max-width:480px;font-size:14.5px;line-height:1.6;color:var(--ink-2)}
.hd-on .hd-keys{display:flex;flex-wrap:wrap;align-items:center;margin:0 0 4px}
.hd-on .hd-keys > *{margin:0 10px 10px 0}
.hd-on .hd-keys .btn{display:inline-flex;align-items:center}
.hd-on .hd-keys .btn svg{width:16px;height:16px;margin-right:8px;flex:none}
.hd-on .hd-line{margin:2px 0 0;max-width:470px;font-size:13.5px;line-height:1.55;color:var(--ink-2)}
.hd-on .hd-hint{margin:auto 0 0;padding-top:22px;max-width:520px;font:italic 500 17px/1.35 var(--hd-serif);color:var(--hd-ink3)}
.hd-on .hd-hint b{font-style:normal;font-weight:600;color:var(--ink-1)}
.hd-on.hd-stack .hd-hint{margin-top:14px;padding-top:0}
.hd-on .hd-card{margin:14px 0 0;max-width:440px;padding:14px 16px;border-radius:16px;box-sizing:border-box;background:var(--hd-card);
  box-shadow:inset 0 0 0 1px var(--hd-hair2),0 6px 16px rgba(40,22,68,.06)}
.hd-on .hd-card small{display:block;margin-bottom:8px;font:600 10.5px/1 var(--hd-sans);letter-spacing:.2em;text-transform:uppercase;color:var(--hd-ink3)}
.hd-on .hd-card b{display:block;font:600 22px/1.15 var(--hd-serif);color:var(--ink-1);overflow-wrap:anywhere}
.hd-on .hd-card p{margin:5px 0 0;font-size:13px;line-height:1.45;color:var(--ink-2)}
.hd-on .hd-card p.hd-warn{font-weight:600;color:#9a5b06}
body[data-theme="night"] .hd-on .hd-card p.hd-warn{color:#f0b65c}
/* the scene: a box of 520 by 460 drawn once at its size and scaled with the page */
.hd-on .hd-scene{position:relative;min-width:0;display:flex;justify-content:center;align-items:center}
.hd-on.hd-stack .hd-scene{margin-top:12px}
.hd-on .hd-fit{position:relative;width:calc(520px * var(--hd-k,1));height:calc(460px * var(--hd-k,1))}
.hd-on .hd-box{position:absolute;left:0;top:0;width:520px;height:460px;transform-origin:0 0;transform:scale(var(--hd-k,1))}
.hd-on .hd-box > canvas.hd-cv{position:absolute;left:0;top:0;width:520px;height:460px}
.hd-on .hd-tag{position:absolute;right:6px;top:22px;z-index:3;max-width:190px;text-align:left;pointer-events:none}
.hd-on .hd-tag b{display:block;font:600 19px/1.2 var(--hd-serif);color:var(--hd-tag)}
.hd-on .hd-tag span{display:block;margin-top:3px;font:600 12.5px/1.35 var(--hd-sans);color:var(--accent)}
.hd-on.hd-stack .hd-tag{position:static;max-width:none;margin:0 0 8px;text-align:center}
.hd-on.hd-stack .hd-scene{flex-direction:column}
/* a press on the scene: a key of its own, seen only by its focus ring */
.hd-on .hd-hit{position:absolute;z-index:2;margin:0;padding:0;border:0;border-radius:50%;background:transparent;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent;box-shadow:none}
.hd-on .hd-hit:focus{outline:none}
.hd-on .hd-hit:focus-visible{box-shadow:0 0 0 2.5px var(--accent)}
.hd-sr{position:absolute !important;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
/* the hours of the day */
#page-focus.hd-on > .hd-head .hd-tag{right:0;top:58px;max-width:170px}
#page-focus.hd-on .hd-hit{left:144px;top:108px;width:136px;height:136px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p284"]="started";}catch(_){}
/* R284 · the studios' heads, and Focus's armillary: see the note at the top of its styles */
(function(){"use strict";
if(window.__r284)return;window.__r284=1;
var D=document,W=window,TAU=Math.PI*2;
function $(id){return D.getElementById(id);}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function setText(e,s){if(e&&e.textContent!==s)e.textContent=s;}
function night(){try{return D.body.getAttribute("data-theme")==="night";}catch(e){return false;}}
function motion(){var m="calm";try{m=D.body.getAttribute("data-motion")||"calm";}catch(e){}try{if(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)m="minimal";}catch(e){}return m;}
function still(){return motion()==="minimal";}
function dpr(){return Math.min(2,W.devicePixelRatio||1);}
function clamp(v,a,b){return v<a?a:v>b?b:v;}
function hex(c){c=String(c||"").replace("#","");if(c.length===3)c=c.replace(/./g,"$&$&");return [parseInt(c.slice(0,2),16)||0,parseInt(c.slice(2,4),16)||0,parseInt(c.slice(4,6),16)||0];}
function mix(a,b,t){var A=hex(a),B=hex(b);return "#"+A.map(function(v,i){var n=Math.round(v+(B[i]-v)*t);return (n<16?"0":"")+n.toString(16);}).join("");}
function rgba(c,a){var A=hex(c);return "rgba("+A[0]+","+A[1]+","+A[2]+","+a+")";}

/* ---------- Ingenium's own Cormorant, upright and italic, from the faces the page carries ---------- */
(function(){try{var F=W.LX7_FONTS||null;if(!F||$("r284-font"))return;var css="",u=F["cormorant-600-normal"],i=F["cormorant-500-italic"];
  if(u)css+='@font-face{font-family:"Head Cormorant";font-style:normal;font-weight:600;font-display:swap;src:url('+u+') format("woff2")}';
  if(i)css+='@font-face{font-family:"Head Cormorant";font-style:italic;font-weight:500;font-display:swap;src:url('+i+') format("woff2")}';
  if(!css)return;var st=mk("style");st.id="r284-font";st.textContent=css;D.head.appendChild(st);}catch(e){}})();

/* ---------- the keys' small pictures ---------- */
var ICONS={
  book:'<path d="M3.5 5.5c2.6-1 5.4-1 8.5.8 3.1-1.8 5.9-1.8 8.5-.8v12.8c-2.6-1-5.4-1-8.5.8-3.1-1.8-5.9-1.8-8.5-.8z"/><path d="M12 6.3v12.8"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  play:'<circle cx="12" cy="12" r="8.5"/><path d="M10.3 8.9l4.6 3.1-4.6 3.1z"/>',
  lines:'<path d="M5 7.5h14M5 12h14M5 16.5h9"/>',
  compass:'<circle cx="12" cy="12" r="8.5"/><path d="M14.9 9.1l-1.9 4-4 1.9 1.9-4z"/>',
  keep:'<path d="M5 12.5l4.2 4.2L19 7"/>',
  run:'<path d="M8 5.5l11 6.5-11 6.5z"/>',
  open:'<path d="M4.5 7.5h6l1.6 2h7.4v8.5h-15z"/>',
  branch:'<circle cx="7" cy="6" r="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="8" r="2"/><path d="M7 8v8M17 10c0 4-10 2-10 6"/>'};
function icon(n){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+(ICONS[n]||"")+'</svg>';}
function key(o){var b=mk("button","btn"+(o.primary?" primary":""));b.type="button";if(o.id)b.id=o.id;if(o.icon)b.innerHTML=icon(o.icon);b.appendChild(mk("span",null,o.text||""));
  if(o.title)b.title=o.title;b.addEventListener("click",function(e){e.preventDefault();try{o.click&&o.click(b);}catch(x){try{console.warn("Ingenium: a head's key",x&&x.message||x);}catch(_){}}});return b;}
function keyText(b,s){if(!b)return;var sp=b.querySelector("span");setText(sp||b,s);}
function keyIcon(b,n){if(!b)return;var sv=b.querySelector("svg"),cur=b.getAttribute("data-ic");if(cur===n)return;b.setAttribute("data-ic",n);
  var t=D.createElement("span");t.innerHTML=icon(n);var nv=t.firstChild;if(sv)b.replaceChild(nv,sv);else b.insertBefore(nv,b.firstChild);}

/* ---------- the orbs, painted as Home's are (modules/r261.js sphere(), on a canvas) ---------- */
var LOOK={chat:["#a57fe8","#6a3fb5","#2e1764"],code:["#9283f2","#4d3db0","#1e1660"],build:["#c48ae8","#8641b8","#3e1760"],
  fabrica:["#b47ad9","#7637a8","#331455"],lector:["#b9a3f2","#7458c6","#33206c"],focus:["#9a6be0","#5c31a4","#250f4b"],career:["#a88ae6","#6b44bd","#2c1760"]};
function pal(room,dark){var n=dark==null?night():dark;
  if(!n)return {c0:"#c9b6ee",c1:"#9068d6",c2:"#6a3fb5",c3:"#55309a",c4:"#3d2275",csh:"#2a1260",ct1:.2,ct2:.4,ce1:.1,ce2:.26};
  var T=LOOK[room]||LOOK.chat;return {c0:mix(T[0],"#ffffff",.5),c1:T[0],c2:T[1],c3:T[2],c4:mix(T[2],"#000000",.42),csh:"#0b0220",ct1:.32,ct2:.6,ce1:.2,ce2:.42};}
/* the surfaces of Home's orbs, in the 120 box of r261 (a ball of radius 40 at 60, 60) */
function wave(g,y,c,o,w,d){g.beginPath();g.moveTo(20,y);g.quadraticCurveTo(30,y+(d==null?-2.6:d),40,y);g.quadraticCurveTo(50,y-(d==null?-2.6:d),60,y);g.quadraticCurveTo(70,y+(d==null?-2.6:d),80,y);
  g.quadraticCurveTo(90,y-(d==null?-2.6:d),100,y);g.strokeStyle=rgba(c,o);g.lineWidth=w;g.stroke();}
function ell(g,x,y,rx,ry,c,o){g.beginPath();g.ellipse(x,y,rx,ry,0,0,TAU);g.fillStyle=rgba(c,o);g.fill();}
function surface(g,k){
  if(k==="bands"){wave(g,33,"#ffffff",.13,3.4);wave(g,44,"#1a0840",.15,4.4);wave(g,56,"#ffffff",.10,3);wave(g,68,"#1a0840",.13,5);wave(g,80,"#ffffff",.12,3.6);wave(g,90,"#1a0840",.12,3);}
  else if(k==="aurora"){ell(g,60,27,22,7.5,"#efe3ff",.24);ell(g,60,27,12,3.8,"#ffffff",.24);wave(g,38,"#e6d6ff",.14,3,4);}
  else if(k==="swirl"){g.lineCap="round";g.beginPath();g.moveTo(16,44);g.bezierCurveTo(34,30,50,54,72,40);g.bezierCurveTo(86,34,94,44,100,42);g.strokeStyle="rgba(255,255,255,.17)";g.lineWidth=4;g.stroke();
    g.beginPath();g.moveTo(20,72);g.bezierCurveTo(40,86,56,60,78,76);g.bezierCurveTo(88,80,94,78,100,76);g.strokeStyle="rgba(255,255,255,.11)";g.lineWidth=5;g.stroke();}
  else if(k==="dapple"){g.beginPath();g.arc(38,44,6,0,TAU);g.fillStyle="rgba(255,255,255,.08)";g.fill();g.beginPath();g.arc(70,62,8,0,TAU);g.fillStyle="rgba(26,8,64,.12)";g.fill();
    g.beginPath();g.arc(50,80,5,0,TAU);g.fillStyle="rgba(255,255,255,.07)";g.fill();g.beginPath();g.arc(86,36,4,0,TAU);g.fillStyle="rgba(26,8,64,.10)";g.fill();}
  else if(k==="faint"){wave(g,52,"#ffffff",.09,5,-3);wave(g,74,"#1a0840",.12,4,3);}
  else if(k==="storm"){wave(g,48,"#ffffff",.12,3,-5);wave(g,79,"#1a0840",.16,4,5);ell(g,72,66,10,5.4,"#ffffff",.24);ell(g,72,66,4.8,2.4,"#1a0840",.28);}}
/* paint an orb of radius r at x, y: its body, its surface (moved by drift, a share of its width), the side away from the light, its
   edge and its one soft highlight; lit from above on the left */
function orbPaint(g,x,y,r,P,look,drift){var k=r/40,A=44*Math.PI/180,ca=Math.cos(A),sa=Math.sin(A);
  function pt(px,py){var dx=px-60,dy=py-60;return [x+(dx*ca-dy*sa)*k,y+(dx*sa+dy*ca)*k];}
  var c=pt(48.8,60),f=pt(36,60),gr=g.createRadialGradient(f[0],f[1],0,c[0],c[1],59.2*k);
  gr.addColorStop(0,P.c0);gr.addColorStop(.16,P.c1);gr.addColorStop(.52,P.c2);gr.addColorStop(.86,P.c3);gr.addColorStop(1,P.c4);
  g.save();g.beginPath();g.arc(x,y,r,0,TAU);g.fillStyle=gr;g.fill();g.clip();
  if(look){g.save();g.translate(x-60*k,y-60*k);g.scale(k,k);var d=((drift||0)%1+1)%1*80;g.translate(-d,0);surface(g,look);g.translate(80,0);surface(g,look);g.restore();}
  var p1=pt(18,60),p2=pt(102,60),tg=g.createLinearGradient(p1[0],p1[1],p2[0],p2[1]);tg.addColorStop(0,rgba(P.csh,0));tg.addColorStop(.4,rgba(P.csh,0));tg.addColorStop(.76,rgba(P.csh,P.ct1));tg.addColorStop(1,rgba(P.csh,P.ct2));
  g.fillStyle=tg;g.fillRect(x-r,y-r,2*r,2*r);
  var eg=g.createRadialGradient(x,y,0,x,y,r);eg.addColorStop(0,rgba(P.csh,0));eg.addColorStop(.7,rgba(P.csh,0));eg.addColorStop(.93,rgba(P.csh,P.ce1));eg.addColorStop(1,rgba(P.csh,P.ce2));
  g.fillStyle=eg;g.fillRect(x-r,y-r,2*r,2*r);g.restore();
  var h=pt(41,60);g.save();g.translate(h[0],h[1]);g.rotate(A);g.scale(9.5*k,13.5*k);var hg=g.createRadialGradient(0,0,0,0,0,1);
  hg.addColorStop(0,"rgba(255,255,255,.85)");hg.addColorStop(.4,"rgba(255,255,255,.32)");hg.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=hg;g.beginPath();g.arc(0,0,1,0,TAU);g.fill();g.restore();}
/* an orb kept as a picture of its own, drawn once for its size, look and colours */
var ORBS={};
function orb(r,P,look){var d=dpr(),key=[r,d,look||"",P.c0,P.c2,P.c4,P.csh].join("|");if(ORBS[key])return ORBS[key];
  var s=Math.ceil(r*2+4),cv=D.createElement("canvas");cv.width=Math.round(s*d);cv.height=Math.round(s*d);var g=cv.getContext("2d");g.scale(d,d);orbPaint(g,s/2,s/2,r,P,look,0);
  cv.__s=s;ORBS[key]=cv;var ks=Object.keys(ORBS);if(ks.length>160)delete ORBS[ks[0]];return cv;}
/* a soft cast under a thing that stands, darker by night */
function cast(g,x,y,rx,ry,a){g.save();g.translate(x,y);g.scale(1,ry/rx);var cg=g.createRadialGradient(0,0,0,0,0,rx);var n=night();
  cg.addColorStop(0,n?"rgba(0,0,0,"+(a*1.6)+")":"rgba(42,20,80,"+a+")");cg.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=cg;g.beginPath();g.arc(0,0,rx,0,TAU);g.fill();g.restore();}
/* a tube from a to b, lit from above on the left: an edge, its body and a line of light */
var LIGHT=[-.55,-.83];
function tube(g,ax,ay,bx,by,w,M,t){t=t==null?1:t;g.lineCap="round";
  g.strokeStyle=M.dark;g.lineWidth=w;g.beginPath();g.moveTo(ax,ay);g.lineTo(bx,by);g.stroke();
  var o=w*.1;g.strokeStyle=M.mid;g.lineWidth=w*.66;g.beginPath();g.moveTo(ax+LIGHT[0]*o,ay+LIGHT[1]*o);g.lineTo(bx+LIGHT[0]*o,by+LIGHT[1]*o);g.stroke();
  if(t>0){var o2=w*.22;g.globalAlpha=t;g.strokeStyle=M.light;g.lineWidth=Math.max(.6,w*.22);g.beginPath();g.moveTo(ax+LIGHT[0]*o2,ay+LIGHT[1]*o2);g.lineTo(bx+LIGHT[0]*o2,by+LIGHT[1]*o2);g.stroke();g.globalAlpha=1;}}
/* a tube along a line of points, in one stroke, so a ring reads as one piece of metal */
function line(g,P){g.beginPath();g.moveTo(P[0][0],P[0][1]);for(var i=1;i<P.length;i++)g.lineTo(P[i][0],P[i][1]);}
function tubePath(g,P,w,M,t){if(!P||P.length<2)return;t=t==null?1:t;g.lineCap="round";g.lineJoin="round";
  line(g,P);g.strokeStyle=M.dark;g.lineWidth=w;g.stroke();
  g.save();g.translate(LIGHT[0]*w*.1,LIGHT[1]*w*.1);line(g,P);g.strokeStyle=M.mid;g.lineWidth=w*.66;g.stroke();g.restore();
  if(t>0){g.save();g.translate(LIGHT[0]*w*.22,LIGHT[1]*w*.22);line(g,P);g.globalAlpha=t;g.strokeStyle=M.light;g.lineWidth=Math.max(.6,w*.22);g.stroke();g.restore();}}
/* a tube of glass along a line of points: an edge, a body that lets what is inside show through, a bright line where the light
   from above on the left falls, and a faint one where it comes back on the far side; lighter by day, deeper by night */
function glass(g,P,w,o){if(!P||P.length<2)return;o=o||{};var n=o.night==null?night():o.night,L=LIGHT;g.lineCap=o.cap||"round";g.lineJoin="round";
  var Ls=o.clear?(n?[[1,0,"rgba(18,10,40,.42)"],[.9,.03,"rgba(150,130,215,.13)"],[.3,.2,"rgba(205,190,250,.42)"],[.1,.27,"rgba(240,232,255,.85)"]]
                   :[[1,0,"rgba(112,82,188,.30)"],[.9,.02,"rgba(244,239,253,.16)"],[.3,.2,"rgba(255,255,255,.72)"],[.1,.27,"rgba(255,255,255,1)"]])
        :n?[[1,0,"rgba(10,5,22,.86)"],[.86,.03,"rgba(84,66,138,.80)"],[.62,.09,"rgba(118,98,178,.50)"],[.3,.21,"rgba(200,186,246,.48)"],[.11,.27,"rgba(240,232,255,.85)"]]
           :[[1,0,"rgba(112,82,188,.46)"],[.88,.02,"rgba(228,219,249,.66)"],[.64,.07,"rgba(248,245,255,.45)"],[.32,.19,"rgba(255,255,255,.80)"],[.12,.26,"rgba(255,255,255,1)"]];
  if(o.alpha!=null)g.globalAlpha=o.alpha;
  Ls.forEach(function(l){g.save();g.translate(L[0]*w*l[1],L[1]*w*l[1]);line(g,P);g.strokeStyle=l[2];g.lineWidth=Math.max(.5,w*l[0]);g.stroke();g.restore();});
  g.save();g.translate(-L[0]*w*.3,-L[1]*w*.3);line(g,P);g.strokeStyle=n?"rgba(190,170,250,.22)":"rgba(255,255,255,.42)";g.lineWidth=Math.max(.4,w*.07);g.stroke();g.restore();g.globalAlpha=1;}
/* a ring's points (each [x, y, depth, scale]) cut into runs in front of and behind a depth, so each run is drawn whole in its place */
function runs(pts,zs,closed){var out=[],cur=null;
  for(var i=0;i<pts.length-1;i++){var a=pts[i],b=pts[i+1],z=(a[2]+b[2])/2,front=z>=zs;
    if(!cur||cur.front!==front){cur={front:front,p:[a],zs:0,n:0,ks:0};out.push(cur);}cur.p.push(b);cur.zs+=z;cur.n++;cur.ks+=(a[3]+b[3])/2;}
  if(closed&&out.length>1&&out[0].front===out[out.length-1].front){var f=out.shift(),l=out[out.length-1];l.p=l.p.concat(f.p.slice(1));l.zs+=f.zs;l.n+=f.n;l.ks+=f.ks;}
  out.forEach(function(r){r.z=r.zs/r.n;r.k=r.ks/r.n;});return out;}
/* the metals of the heads, by day and by night */
function metal(kind){var n=night();
  if(kind==="band")return n?{dark:"#2a1260",mid:"#7c4fd4",light:"#d2bcff"}:{dark:"#4a2690",mid:"#8a5fd6",light:"#efe4ff"};
  if(kind==="fine")return n?{dark:"#251c40",mid:"#6a5a98",light:"#b6a7e2"}:{dark:"#7a66b0",mid:"#b5a3e0",light:"#f6f2ff"};
  return n?{dark:"#221a3c",mid:"#5f4f90",light:"#a898d8"}:{dark:"#6c58a6",mid:"#ab98da",light:"#f3eeff"};}

/* ---------- the frame loop: only while it can be seen ---------- */
/* a scene is drawn at the screen's own rate while it can be seen (the owner's words on thirty a second: "stiff and rigid"); fps can cap it */
function Loop(draw,fps){var raf=0,tmo=0,on=false,last=0,gap=fps?1000/fps:0;
  /* between two drawn frames it waits on a timer, so the browser is asked for no frame it does not draw */
  function next(){var wait=last?Math.max(0,gap-(performance.now()-last)-4):0;if(wait>1)tmo=setTimeout(function(){tmo=0;if(on)raf=requestAnimationFrame(tick);},wait);else raf=requestAnimationFrame(tick);}
  function tick(t){raf=0;if(!on)return;var dt=last?Math.min(80,t-last):33;last=t;var more=true;try{more=draw(dt,t)!==false;}catch(e){on=false;try{console.warn("Ingenium: a head's scene",e&&e.message||e);}catch(_){}return;}
    if(!more){on=false;last=0;return;}next();}
  return {start:function(){if(on)return;on=true;last=0;raf=requestAnimationFrame(tick);},stop:function(){on=false;last=0;if(raf){cancelAnimationFrame(raf);raf=0;}if(tmo){clearTimeout(tmo);tmo=0;}},running:function(){return on;}};}

/* ---------- a sound for a scene's own parts, as the keys sound (modules/r176.js) ---------- */
function sound(kind){var I=W.IngSound;if(!I||typeof I.voice!=="function")return;try{var c=typeof I.config==="function"?I.config():null,v=kind==="press"?(c&&c.press)||"keyPress":(c&&c.hover)||"keyTouch";I.voice(v);}catch(e){}}

/* ---------- a room that fills the window keeps the window's height under its head ---------- */
function roomHeight(page){var m=D.querySelector("main.main"),top=0;try{top=m?Math.max(0,m.getBoundingClientRect().top):0;}catch(e){}
  return Math.max(440,Math.floor(W.innerHeight-top-24));}

/* ---------- a head on a page ---------- */
var HEADS=[];
function mount(cfg){var C={cfg:cfg,on:false,page:null,head:null,words:null,scene:null,box:null,tag:null,tagB:null,tagS:null,hint:null,keys:{},title:null,lede:null,
    visible:false,shown:false,k:1,listeners:[]};
  function page(){return $(cfg.page);}
  function build(){if(C.head)return;var h=mk("section","hd-head "+(cfg.cls||""));h.setAttribute("aria-label",cfg.label||"");
    var w=mk("div","hd-words"),eb=mk("div","hd-eyebrow");eb.setAttribute("aria-hidden","true");eb.appendChild(mk("b",null,"Ingenium"));eb.appendChild(mk("span",null,cfg.eyebrow||""));w.appendChild(eb);
    C.anchor=mk("span","hd-anchor");C.anchor.hidden=true;w.appendChild(C.anchor);
    var ks=mk("div","hd-keys");(cfg.keys||[]).forEach(function(o){var b=key(o);C.keys[o.name||o.id||o.text]=b;ks.appendChild(b);});w.appendChild(ks);C.keysBox=ks;
    if(cfg.line){C.line=mk("p","hd-line",cfg.line);w.appendChild(C.line);}
    if(cfg.card){C.card=mk("div","hd-card");C.card.setAttribute("aria-live","polite");w.appendChild(C.card);}
    C.hint=mk("p","hd-hint");w.appendChild(C.hint);
    var sc=mk("div","hd-scene"),fit=mk("div","hd-fit"),box=mk("div","hd-box");fit.appendChild(box);
    if(cfg.tag!==false){C.tag=mk("div","hd-tag");C.tag.setAttribute("aria-live","polite");C.tagB=mk("b");C.tagS=mk("span");C.tag.appendChild(C.tagB);C.tag.appendChild(C.tagS);sc.appendChild(C.tag);}
    sc.appendChild(fit);h.appendChild(w);h.appendChild(sc);C.head=h;C.words=w;C.scene=sc;C.box=box;if(C.io)C.io.observe(sc);
    try{cfg.scene&&cfg.scene(C);}catch(e){try{console.warn("Ingenium: a head's scene",e&&e.message||e);}catch(_){}}}
  function enter(){var p=page();build();C.page=p;
    C.title=cfg.title?cfg.title(p):p.querySelector(":scope > .page-title");C.lede=cfg.lede?cfg.lede(p):p.querySelector(":scope > .lede");
    C.tHome=C.title?{p:C.title.parentNode,n:C.title.nextSibling}:null;C.lHome=C.lede?{p:C.lede.parentNode,n:C.lede.nextSibling}:null;
    var first=cfg.before?cfg.before(p):p.firstElementChild;p.insertBefore(C.head,first||null);
    if(C.title){C.title.classList.add("hd-title");C.words.insertBefore(C.title,C.anchor);}
    if(C.lede){C.lede.classList.add("hd-lede");C.words.insertBefore(C.lede,C.anchor);}
    p.classList.add("hd-on");C.on=true;try{cfg.enter&&cfg.enter(C);}catch(e){}paint();}
  function leave(){var p=C.page||page();C.on=false;if(p)p.classList.remove("hd-on","hd-stack","hd-phone");if(p){p.style.removeProperty("--hd-k");p.style.removeProperty("--hd-col");p.style.removeProperty("--hd-room");}
    try{cfg.leave&&cfg.leave(C);}catch(e){}
    if(C.title){C.title.classList.remove("hd-title");if(C.tHome&&C.tHome.p)C.tHome.p.insertBefore(C.title,C.tHome.n&&C.tHome.n.parentNode===C.tHome.p?C.tHome.n:null);}
    if(C.lede){C.lede.classList.remove("hd-lede");if(C.lHome&&C.lHome.p)C.lHome.p.insertBefore(C.lede,C.lHome.n&&C.lHome.n.parentNode===C.lHome.p?C.lHome.n:null);}
    if(C.head&&C.head.parentNode)C.head.parentNode.removeChild(C.head);vis();}
  /* beside the words from 900 pixels, the scene's column a little under half the slab (520 at most, 340 at least) and the scene
     scaled to it; under the words below 900, scaled to the width */
  function layout(w){var p=C.page,set=function(c,v){if(p.classList.contains(c)!==v)p.classList.toggle(c,v);},stack=w<900;set("hd-stack",stack);set("hd-phone",w<760);
    var cs=null;try{cs=getComputedStyle(p);}catch(e){}var pad=cs?(parseFloat(cs.paddingLeft)||0)+(parseFloat(cs.paddingRight)||0):0,k="",col="";
    if(!stack){var inner=Math.min(w-pad,1180)-64,cw=Math.max(340,Math.min(520,Math.round(inner*.47)));if(cw<520){col=cw+"px";k=(cw/520).toFixed(3);}}
    else{var kk=Math.max(.3,Math.min(1,(w-pad-(w<760?36:48))/520));k=kk<1?kk.toFixed(3):"";}
    if(p.style.getPropertyValue("--hd-k")!==k){if(k)p.style.setProperty("--hd-k",k);else p.style.removeProperty("--hd-k");}
    if(p.style.getPropertyValue("--hd-col")!==col){if(col)p.style.setProperty("--hd-col",col);else p.style.removeProperty("--hd-col");}C.k=k?+k:1;
    roomVar();try{cfg.layout&&cfg.layout(C,w);}catch(e){}}
  function roomVar(){var p=C.page;if(!p)return;var v=C.on?roomHeight(p)+"px":"";if(p.style.getPropertyValue("--hd-room")!==v){if(v)p.style.setProperty("--hd-room",v);else p.style.removeProperty("--hd-room");}}
  function mountNow(){try{var p=page();if(!p)return;if(cfg.ok&&!cfg.ok(p)){if(C.on)leave();return;}var w=p.clientWidth;if(!w)return;
      if(w>=260){if(!C.on)enter();layout(w);}else if(C.on)leave();vis();}catch(e){try{console.warn("Ingenium: a head",cfg.page,e&&e.message||e);}catch(_){}}}
  /* shown: the page is the one in front, the window is visible and the head is on screen */
  function vis(){var p=C.page||page(),sh=!!(C.on&&p&&p.classList.contains("active")&&!D.hidden&&C.visible);if(sh!==C.shown){C.shown=sh;try{cfg.shown&&cfg.shown(C,sh);}catch(e){}}}
  function paint(){if(!C.on)return;try{cfg.paint&&cfg.paint(C);}catch(e){try{console.warn("Ingenium: a head's words",e&&e.message||e);}catch(_){}}}
  C.paint=paint;C.vis=vis;C.mount=mountNow;
  C.tagSet=function(b,s){setText(C.tagB,b||"");setText(C.tagS,s||"");if(C.tag)C.tag.hidden=!(b||s);};
  C.hintSet=function(parts){/* parts: [text, bold?] */var sig=JSON.stringify(parts);if(C.hint.__s===sig)return;C.hint.__s=sig;C.hint.textContent="";
    parts.forEach(function(x){if(typeof x==="string")C.hint.appendChild(D.createTextNode(x));else C.hint.appendChild(mk("b",null,x[0]));});};
  C.toRoom=function(sel){try{var r=typeof sel==="string"?D.querySelector(sel):sel;if(!r)return;var m=D.querySelector("main.main");
      if(m&&m.scrollHeight>m.clientHeight+4){var top=r.getBoundingClientRect().top-m.getBoundingClientRect().top+m.scrollTop-8;m.scrollTo?m.scrollTo({top:top,behavior:still()?"auto":"smooth"}):m.scrollTop=top;}
      else if(r.scrollIntoView)r.scrollIntoView({block:"start",behavior:still()?"auto":"smooth"});}catch(e){}};
  function boot(){var p=page();if(!p){if((C.tries=(C.tries||0)+1)<240)setTimeout(boot,500);return;}
    try{C.io=new IntersectionObserver(function(es){es.forEach(function(e){C.visible=e.isIntersecting;});vis();},{threshold:[0,.01]});}catch(x){C.io=null;C.visible=true;}
    var lastW=-1,rq=0,onSize=function(){rq=0;var w=p.clientWidth;if(w===lastW&&C.on)return;lastW=w;mountNow();try{cfg.resize&&C.on&&cfg.resize(C);}catch(e){}};
    try{new ResizeObserver(function(){if(!rq)rq=requestAnimationFrame(onSize);}).observe(p);}catch(x){W.addEventListener("resize",mountNow);}
    W.addEventListener("resize",function(){if(C.on){roomVar();try{cfg.resize&&cfg.resize(C);}catch(e){}}});
    try{new MutationObserver(function(){vis();if(C.on&&p.classList.contains("active")){roomVar();paint();}}).observe(p,{attributes:true,attributeFilter:["class"]});}catch(x){}
    try{new MutationObserver(function(){if(C.on){try{cfg.theme&&cfg.theme(C);}catch(e){}paint();}}).observe(D.body,{attributes:true,attributeFilter:["data-theme","data-motion"]});}catch(x){}
    D.addEventListener("visibilitychange",vis);
    mountNow();}
  if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
  HEADS.push(C);return C;}

/* a spring, for a scene that leans toward the pointer and comes back: a little give, a little overshoot, as Ingenium's keys have */
function Spring(k,c){return {x:0,v:0,to:function(t,dt){var s=Math.min(.05,dt/1000),n=Math.max(1,Math.ceil(s/.008)),h=s/n;for(var i=0;i<n;i++){var a=k*(t-this.x)-c*this.v;this.v+=a*h;this.x+=this.v*h;}
    if(Math.abs(t-this.x)<1e-4&&Math.abs(this.v)<1e-4){this.x=t;this.v=0;}return this.x;},rest:function(t){return Math.abs(t-this.x)<1e-3&&Math.abs(this.v)<1e-3;}};}

/* ---------- Ingenium's own seal key, for any head that wants the engine's button (as Home's, r175, and Blend's, r262, are made) ---------- */
var SKN=0;
function doorSeal(){var d=$("introSeal"),s=d&&d.querySelector(".isl");if(s)return s;var h=$("brandSealBtn");return h?h.querySelector(".isl"):null;}
function copySeal(){var s=doorSeal();if(!s)return null;var c=s.cloneNode(true),k="r284s"+(++SKN)+"_";c.className="isl isl-home";c.removeAttribute("style");c.setAttribute("aria-hidden","true");
  var h=c.outerHTML;[].forEach.call(c.querySelectorAll("[id]"),function(n){var id=n.getAttribute("id"),q=id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    h=h.replace(new RegExp('id="'+q+'"',"g"),'id="'+k+id+'"').replace(new RegExp("url\\(#"+q+"\\)","g"),"url(#"+k+id+")").replace(new RegExp('href="#'+q+'"',"g"),'href="#'+k+id+'"');});
  var w=mk("div");w.innerHTML=h;var out=w.firstElementChild;[].forEach.call(out.querySelectorAll(".isl-tilt,.isl-idle"),function(n){n.removeAttribute("style");});return out;}
/* its flourishes, the seal's own (R175): the star spins, the ring pulses, the seal hops, wobbles or twirls, the stone beats */
function sealKey(o){o=o||{};var box=mk("div","hx-seal hd-seal");box.setAttribute("data-ing-seal",o.sound||"heads");
  var k=mk("button","r175-seal hd-key");k.type="button";k.setAttribute("aria-label",o.label||"Ingenium's seal");
  var gl=mk("span","r175-glow"),rp=mk("span","r175-ripple"),fx=mk("span","r175-fx");gl.setAttribute("aria-hidden","true");rp.setAttribute("aria-hidden","true");
  var seal=copySeal();if(seal){seal.style.setProperty("--S",(o.size||72)+"px");fx.appendChild(seal);}k.appendChild(gl);k.appendChild(fx);k.appendChild(rp);box.appendChild(k);
  var busy=false,again=false,last="",n7=0,ends=[];
  function isl(){return k.querySelector(".isl");}
  function anim(e,f,op){if(!e||!e.animate)return null;try{var a=e.animate(f,op);ends.push(a.finished.then(function(){},function(){}));return a;}catch(x){return null;}}
  function P(){var s=isl();return {fx:fx,glow:gl,ripple:rp,tilt:s&&s.querySelector(".isl-tilt"),cast:s&&s.querySelector(".isl-cast"),ring:s&&s.querySelector(".isl-ring > svg"),star:s&&s.querySelector(".isl-star > svg"),heart:s&&s.querySelector(".isl-heart > svg")};}
  function glow(p,strong){try{p.glow.getAnimations().forEach(function(a){a.cancel();});}catch(e){}anim(p.glow,[{opacity:0,scale:.82},{opacity:strong?1:.85,scale:1.04,offset:.3},{opacity:0,scale:1.12}],{duration:still()?700:1000,easing:"ease-out"});}
  var SP="cubic-bezier(.2,.8,.25,1)",FL={
    spin:function(p,d){anim(p.star,[{rotate:"0deg"},{rotate:(d*360)+"deg"}],{duration:1150,easing:"cubic-bezier(.25,.9,.3,1)"});anim(p.ring,[{rotate:"0deg"},{rotate:(-d*360)+"deg"}],{duration:1300,easing:"cubic-bezier(.3,.8,.3,1)"});
      anim(p.heart,[{scale:1},{scale:1.14,offset:.35},{scale:1}],{duration:900,easing:"ease-in-out"});glow(p);},
    pulse:function(p){anim(p.ring,[{scale:1},{scale:1.13,offset:.28},{scale:.97,offset:.6},{scale:1.03,offset:.8},{scale:1}],{duration:950,easing:"ease-out"});
      anim(p.ripple,[{opacity:.6,scale:.86},{opacity:0,scale:1.55}],{duration:950,easing:"ease-out"});glow(p);},
    hop:function(p){anim(p.fx,[{transform:"translateY(0) scale(1,1)"},{transform:"translateY(3%) scale(1.06,.92)",offset:.12},{transform:"translateY(-18%) scale(.97,1.04)",offset:.42},
        {transform:"translateY(0) scale(1.05,.94)",offset:.7},{transform:"translateY(-3%) scale(1,1)",offset:.85},{transform:"translateY(0) scale(1,1)"}],{duration:900,easing:"ease-in-out"});glow(p);},
    wobble:function(p,d){anim(p.tilt,[{rotate:"y 0deg"},{rotate:"y "+(d*30)+"deg",offset:.2},{rotate:"y "+(-d*20)+"deg",offset:.45},{rotate:"y "+(d*11)+"deg",offset:.68},{rotate:"y "+(-d*4)+"deg",offset:.86},{rotate:"y 0deg"}],{duration:1250,easing:"ease-in-out"});glow(p);},
    twirl:function(p,d){anim(p.fx,[{transform:"rotate(0deg) scale(1)"},{transform:"rotate("+(d*180)+"deg) scale(.9)",offset:.45},{transform:"rotate("+(d*360)+"deg) scale(1.04)",offset:.8},{transform:"rotate("+(d*360)+"deg) scale(1)"}],{duration:1100,easing:SP});
      anim(p.star,[{rotate:"0deg"},{rotate:(-d*180)+"deg"}],{duration:1100,easing:SP});glow(p);},
    beat:function(p){anim(p.heart,[{scale:1},{scale:1.3,offset:.14},{scale:1.04,offset:.3},{scale:1.24,offset:.46},{scale:1,offset:.7},{scale:1}],{duration:1100,easing:"ease-in-out"});
      anim(p.ring,[{scale:1},{scale:1.04,offset:.14},{scale:1,offset:.3},{scale:1.03,offset:.46},{scale:1}],{duration:1100,easing:"ease-in-out"});glow(p,true);},
    grand:function(p,d){FL.spin(p,d);FL.hop(p);anim(p.ripple,[{opacity:.65,scale:.86},{opacity:0,scale:1.7}],{duration:1100,easing:"ease-out"});glow(p,true);}},ORDER=["spin","pulse","hop","wobble","twirl","beat"];
  function play(){var p=P();if(still()){glow(p);return;}busy=true;ends=[];n7++;var name=n7%7===0?"grand":ORDER.filter(function(x){return x!==last;})[Math.floor(Math.random()*5)],d=Math.random()<.5?-1:1;last=name;
    try{FL[name](p,d);}catch(e){}var mine=ends.slice();function fin(){busy=false;if(again){again=false;play();}}if(!mine.length)fin();else Promise.all(mine).then(fin);}
  k.addEventListener("pointerenter",function(e){var s=isl();if(s&&e.pointerType==="mouse"&&!still())s.classList.add("hover");});
  k.addEventListener("pointermove",function(e){var s=isl();if(!s||e.pointerType!=="mouse"||still())return;var r=s.getBoundingClientRect();if(!r.width)return;
    var x=clamp((e.clientX-r.left)/r.width,-.25,1.25),y=clamp((e.clientY-r.top)/r.height,-.25,1.25);s.style.setProperty("--ry",((x-.5)*28).toFixed(1)+"deg");s.style.setProperty("--rx",(-(y-.5)*24).toFixed(1)+"deg");},{passive:true});
  k.addEventListener("pointerleave",function(){var s=isl();if(!s)return;s.classList.remove("hover","down");s.style.setProperty("--rx","0deg");s.style.setProperty("--ry","0deg");});
  k.addEventListener("pointerdown",function(){var s=isl();if(s&&!still())s.classList.add("down");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){k.addEventListener(t,function(e){var s=isl();if(!s)return;s.classList.remove("down");if(e.pointerType!=="mouse")s.classList.remove("hover");},{passive:true});});
  k.addEventListener("click",function(e){e.preventDefault();if(busy){again=true;glow(P());}else play();if(o.press)setTimeout(function(){try{o.press();}catch(x){}},still()?0:280);});
  return {box:box,key:k,play:play};}

W.IngHeads={mount:mount,Spring:Spring,sealKey:sealKey,roomHeight:roomHeight,orb:orb,orbPaint:orbPaint,pal:pal,LOOK:LOOK,cast:cast,tube:tube,tubePath:tubePath,glass:glass,runs:runs,metal:metal,Loop:Loop,sound:sound,icon:icon,key:key,keyText:keyText,keyIcon:keyIcon,
  night:night,motion:motion,still:still,dpr:dpr,mix:mix,rgba:rgba,clamp:clamp,heads:function(){return HEADS;}};

/* ================= Focus: the armillary sphere of the hours ================= */
var SC=function(){try{return W.IngSupport&&W.IngSupport.sc||null;}catch(e){return null;}};
function routine(){var s=SC();try{return s&&s.on("routines")&&!s.lowToday()?s.suggestedRoutine():null;}catch(e){return null;}}
function rname(rt){var s=SC();try{return String(s.rName(rt)).replace(/^\S+\s/,"");}catch(e){return String(rt&&rt.name||"your routine");}}
function lower(s){s=String(s||"");return s.charAt(0).toLowerCase()+s.slice(1);}
function clock(){var d=new Date(),h=d.getHours(),m=d.getMinutes(),pm=h>=12,hh=h%12||12;
  var t=(hh<10?"0":"")+hh+":"+(m<10?"0":"")+m+" "+(pm?"PM":"AM");try{if(typeof fmtTime==="function"){var f=fmtTime(d);if(f)t=String(f);}}catch(e){}return t;}
function partOfDay(){var h=new Date().getHours();return h<5?"the quiet hours":h<12?"the morning ahead":h<17?"the afternoon's work":h<21?"the evening":"the end of the day";}
var FX={tx:0,ty:0,lt:Spring(70,12),le:Spring(70,12),ks:Spring(320,13),rip:0,C:null,cv:null,g:null,t:0,sw:0,amp:1,hold:false,hover:false,down:false,lift:0,loop:null,W:520,H:460,clockT:0,sig:""};
function fxGeom(){return {cx:212,cy:176,R:142,e:(9*Math.PI/180)+FX.le.x,F:900};}
/* a point of the sphere's world (x right, y down, z toward you), turned by the sway about the upright axis, seen from a little above */
function fxProj(G,x,y,z,turn){var c=Math.cos(turn),s=Math.sin(turn),X=x*c+z*s,Z=-x*s+z*c,ce=Math.cos(G.e),se=Math.sin(G.e),Y=y*ce+Z*se,Z2=-y*se+Z*ce,k=G.F/(G.F-Z2*G.R);
  return [G.cx+X*G.R*k,G.cy+Y*G.R*k,Z2,k];}
/* a ring: a circle of radius r about the centre, in a plane given by its tilt about x (a) and then about z (b) */
function fxRing(G,r,a,b,turn,n,off){var out=[],ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);n=n||64;off=off||[0,0,0];
  for(var i=0;i<=n;i++){var u=i/n*TAU,x=r*Math.cos(u),z=r*Math.sin(u),y=0;var y1=y*ca-z*sa,z1=y*sa+z*ca;var x2=x*cb-y1*sb,y2=x*sb+y1*cb;out.push(fxProj(G,x2+off[0],y2+off[1],z1+off[2],turn));}return out;}
var BASE={sig:"",cv:null};
function fxBase(G){var d=dpr(),n=night(),sig=[d,n?1:0].join("|");if(BASE.sig===sig)return BASE.cv;BASE.sig=sig;
  var cv=BASE.cv||D.createElement("canvas");cv.width=Math.round(FX.W*d);cv.height=Math.round(FX.H*d);var g=cv.getContext("2d");g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,FX.W,FX.H);
  var bx=G.cx,by=G.cy+G.R*1.63,rx=G.R*.74,ry=G.R*.74*Math.sin(G.e)*1.55,th=G.R*.085;
  cast(g,bx,by+th+ry*.55,rx*1.25,ry*1.5,.20);
  /* the plinth's side: a band lit from the left */
  var sg=g.createLinearGradient(bx-rx,0,bx+rx,0);
  if(n){sg.addColorStop(0,"#0c0814");sg.addColorStop(.28,"#2a2140");sg.addColorStop(.6,"#1c152c");sg.addColorStop(1,"#0a0711");}else{sg.addColorStop(0,"#a491cc");sg.addColorStop(.28,"#e7e0f4");sg.addColorStop(.62,"#c7b9e3");sg.addColorStop(1,"#9583bd");}
  g.beginPath();g.ellipse(bx,by,rx,ry,0,0,Math.PI);g.lineTo(bx-rx,by+th);g.ellipse(bx,by+th,rx,ry,0,Math.PI,0,true);g.closePath();g.fillStyle=sg;g.fill();
  /* its face, a shallow dish with a rim */
  var fg=g.createRadialGradient(bx-rx*.3,by-ry*.6,rx*.05,bx,by,rx);
  if(n){fg.addColorStop(0,"#2e2446");fg.addColorStop(.7,"#1d1630");fg.addColorStop(1,"#151021");}else{fg.addColorStop(0,"#ffffff");fg.addColorStop(.65,"#ece6f7");fg.addColorStop(1,"#d9cfee");}
  g.beginPath();g.ellipse(bx,by,rx,ry,0,0,TAU);g.fillStyle=fg;g.fill();
  g.lineWidth=1.2;g.strokeStyle=n?"rgba(190,170,240,.22)":"rgba(255,255,255,.95)";g.beginPath();g.ellipse(bx,by,rx-.6,ry-.4,0,0,Math.PI);g.stroke();
  g.strokeStyle=n?"rgba(0,0,0,.45)":"rgba(90,64,150,.22)";g.beginPath();g.ellipse(bx,by,rx*.84,ry*.84,0,0,TAU);g.stroke();
  g.strokeStyle=n?"rgba(205,184,240,.10)":"rgba(255,255,255,.8)";g.beginPath();g.ellipse(bx,by+1,rx*.84,ry*.84,0,0,Math.PI);g.stroke();
  /* the stem's foot */
  var fx=rx*.17,fy=ry*.17;g.beginPath();g.ellipse(bx,by,fx,fy,0,0,TAU);g.fillStyle=n?"#3b2f5e":"#cbbde9";g.fill();
  g.strokeStyle=n?"rgba(0,0,0,.4)":"rgba(90,64,150,.3)";g.lineWidth=1;g.stroke();
  BASE.cv=cv;return cv;}
/* the sphere of the day turns on its axis under a light that stays where it is: its meridians and its markings run across its face
   and foreshorten toward its rim, as a globe's do; its axis leans toward you a little */
var SPOTS=[[.5,0,.16,1],[-.2,.9,.22,0],[.15,2.1,.13,1],[-.55,2.9,.18,0],[.62,3.8,.12,0],[-.05,4.6,.2,1],[.35,5.4,.15,0],[-.4,1.6,.11,1]];
function globe(g,x,y,r,P,spin){var k=r/40,A=44*Math.PI/180,ca=Math.cos(A),sa=Math.sin(A),n=night(),i,j;
  function pt(px,py){var dx=px-60,dy=py-60;return [x+(dx*ca-dy*sa)*k,y+(dx*sa+dy*ca)*k];}
  var c=pt(48.8,60),f=pt(36,60),gr=g.createRadialGradient(f[0],f[1],0,c[0],c[1],59.2*k);
  gr.addColorStop(0,P.c0);gr.addColorStop(.16,P.c1);gr.addColorStop(.52,P.c2);gr.addColorStop(.86,P.c3);gr.addColorStop(1,P.c4);
  g.save();g.beginPath();g.arc(x,y,r,0,TAU);g.fillStyle=gr;g.fill();g.clip();
  var tl=20*Math.PI/180,ct=Math.cos(tl),st=Math.sin(tl);
  function P3(lat,lon){var cl=Math.cos(lat),X=r*cl*Math.sin(lon),Y0=-r*Math.sin(lat),Z0=r*cl*Math.cos(lon);return [x+X,y+Y0*ct-Z0*st,(Y0*st+Z0*ct)/r];}
  SPOTS.forEach(function(S){var p=P3(S[0],S[1]+spin);if(p[2]<=0)return;var rr=S[2]*r,fx=Math.max(.15,Math.sqrt(Math.max(0,1-Math.pow((p[0]-x)/r,2)))),a=Math.min(1,p[2]*1.6);
    g.save();g.translate(p[0],p[1]);g.scale(fx,1);var sg=g.createRadialGradient(0,0,0,0,0,rr);sg.addColorStop(0,S[3]?"rgba(255,255,255,"+(.22*a)+")":"rgba(26,8,64,"+(.26*a)+")");sg.addColorStop(1,"rgba(255,255,255,0)");
    g.fillStyle=sg;g.beginPath();g.arc(0,0,rr,0,TAU);g.fill();g.restore();});
  g.lineWidth=Math.max(.6,r*.012);g.lineCap="round";
  /* each line drawn in one stroke, as bright as its nearest part faces you */
  for(i=0;i<10;i++){var lon=i*TAU/10+spin,prev=null,face=0,open=false;g.beginPath();for(j=-12;j<=12;j++){var q=P3(j/12*Math.PI*.5,lon);if(q[2]>0){if(!open){g.moveTo(q[0],q[1]);open=true;}else g.lineTo(q[0],q[1]);if(q[2]>face)face=q[2];}else open=false;}
    if(face>0){g.strokeStyle=n?"rgba(236,226,255,"+(.2*face)+")":"rgba(255,255,255,"+(.26*face)+")";g.stroke();}}
  [[0,.2],[.5,.12],[-.5,.12]].forEach(function(L){var open=false;g.beginPath();for(j=0;j<=36;j++){var q=P3(L[0],j/36*TAU);if(q[2]>0){if(!open){g.moveTo(q[0],q[1]);open=true;}else g.lineTo(q[0],q[1]);}else open=false;}
    g.strokeStyle=n?"rgba(236,226,255,"+L[1]+")":"rgba(255,255,255,"+(L[1]*1.2)+")";g.stroke();});
  var p1=pt(18,60),p2=pt(102,60),tg=g.createLinearGradient(p1[0],p1[1],p2[0],p2[1]);tg.addColorStop(0,rgba(P.csh,0));tg.addColorStop(.4,rgba(P.csh,0));tg.addColorStop(.76,rgba(P.csh,P.ct1));tg.addColorStop(1,rgba(P.csh,P.ct2));
  g.fillStyle=tg;g.fillRect(x-r,y-r,2*r,2*r);var eg=g.createRadialGradient(x,y,0,x,y,r);eg.addColorStop(0,rgba(P.csh,0));eg.addColorStop(.7,rgba(P.csh,0));eg.addColorStop(.93,rgba(P.csh,P.ce1));eg.addColorStop(1,rgba(P.csh,P.ce2));
  g.fillStyle=eg;g.fillRect(x-r,y-r,2*r,2*r);ell(g,x,y-r*.66,r*.5,r*.17,"#efe3ff",.18);g.restore();
  var h=pt(41,60);g.save();g.translate(h[0],h[1]);g.rotate(A);g.scale(9.5*k,13.5*k);var hg=g.createRadialGradient(0,0,0,0,0,1);
  hg.addColorStop(0,"rgba(255,255,255,.85)");hg.addColorStop(.4,"rgba(255,255,255,.32)");hg.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=hg;g.beginPath();g.arc(0,0,1,0,TAU);g.fill();g.restore();}
function fxMark(g,x,y,m,a){/* Focus's mark: two rings and a point, standing above the face (a violet and a lavender copy under the white one) */
  var L=[[1.25,1.7,night()?"rgba(20,6,48,.55)":"rgba(46,23,100,.45)"],[.6,.85,"#cdb8ff"],[0,0,"#ffffff"]];
  g.save();g.globalAlpha=a==null?1:a;L.forEach(function(l){var ox=l[0]*m*.06,oy=l[1]*m*.06;g.strokeStyle=l[2];g.fillStyle=l[2];g.lineWidth=m*.085;
    g.beginPath();g.arc(x+ox,y+oy,m*.42,0,TAU);g.stroke();g.beginPath();g.arc(x+ox,y+oy,m*.235,0,TAU);g.stroke();g.beginPath();g.arc(x+ox,y+oy,m*.085,0,TAU);g.fill();});g.restore();}
function fxDraw(){var C=FX.C,cv=FX.cv;if(!cv)return;var d=dpr(),Wd=Math.round(FX.W*d),Hd=Math.round(FX.H*d);if(cv.width!==Wd||cv.height!==Hd){cv.width=Wd;cv.height=Hd;}
  var g=FX.g||(FX.g=cv.getContext("2d"));g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,FX.W,FX.H);
  var G=fxGeom(),turn=FX.sw,P=pal("focus"),M=metal(),Mf=metal("fine"),Mb=metal("band"),n=night();
  g.drawImage(fxBase(G),0,0,FX.W,FX.H);
  /* the stem, from the knot under the meridian to the plinth */
  var s0=fxProj(G,0,1.13,0,0),s1=fxProj(G,0,1.6,0,0);tubePath(g,[s0,s1],G.R*.048,M,.9);
  /* everything that turns, sorted far to near */
  var items=[],ballZ=fxProj(G,0,0,0,turn)[2];
  function addRing(pts,w,Mx,tone){runs(pts,ballZ,true).forEach(function(r){items.push({z:r.z,f:function(){tubePath(g,r.p,w*r.k,Mx,tone);}});});}
  addRing(fxRing(G,1,Math.PI/2,0,turn,96),G.R*.062,M,1);                              /* the meridian, upright, facing you */
  addRing(fxRing(G,.085,Math.PI/2,0,turn,28,[0,1.05,0]),G.R*.04,M,.9);             /* the knot that holds it on the stem */
  var tilt=-7*Math.PI/180;addRing(fxRing(G,1.02,tilt,3*Math.PI/180,turn,96),G.R*.03,Mf,.95);   /* the ring of the hours, nearly level */
  var prec=turn+FX.t/48000*TAU;addRing(fxRing(G,.93,8*Math.PI/180,-26*Math.PI/180,prec,96),G.R*.046,Mb,1);   /* the band that crosses it, turning about the upright */
  /* the marks they carry round: twelve hours on the ring, and the band's fine ticks the other way */
  function onRing(rad,a,b,tn,u){var ca2=Math.cos(a),sa2=Math.sin(a),cb2=Math.cos(b),sb2=Math.sin(b),x0=rad*Math.cos(u),z0=rad*Math.sin(u),y1=-z0*sa2,z1=z0*ca2;return fxProj(G,x0*cb2-y1*sb2,x0*sb2+y1*cb2,z1,tn);}
  var hr=FX.t/30000*TAU;for(var hh=0;hh<12;hh++){(function(hh){var p=onRing(1.02,tilt,3*Math.PI/180,turn,hh/12*TAU+hr);items.push({z:p[2]+.001,f:function(){var big=hh%3===0,rr=(big?3.2:2.1)*p[3];
    var hg=g.createRadialGradient(p[0]-rr*.3,p[1]-rr*.3,0,p[0],p[1],rr);hg.addColorStop(0,"#ffffff");hg.addColorStop(1,night()?"#9a7ad8":"#8a5fd6");g.fillStyle=hg;g.beginPath();g.arc(p[0],p[1],rr,0,TAU);g.fill();}});})(hh);}
  var br=-FX.t/40000*TAU;for(var bt=0;bt<24;bt++){(function(bt){var u=bt/24*TAU+br,p=onRing(.93,8*Math.PI/180,-26*Math.PI/180,prec,u),q=onRing(.93,8*Math.PI/180,-26*Math.PI/180,prec,u+.02);
    items.push({z:p[2]+.002,f:function(){g.strokeStyle=night()?"rgba(240,230,255,.75)":"rgba(255,255,255,.95)";g.lineWidth=1.4*p[3];g.lineCap="round";g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(q[0],q[1]);g.stroke();}});})(bt);}
  /* the moon on the ring of the hours */
  var mu=FX.t/12000*TAU,ca=Math.cos(tilt),sa=Math.sin(tilt),mx=1.02*Math.cos(mu+2.4),mz=1.02*Math.sin(mu+2.4),my=-mz*sa,mz1=mz*ca,cb=Math.cos(3*Math.PI/180),sb=Math.sin(3*Math.PI/180);
  var mp=fxProj(G,mx*cb-my*sb,mx*sb+my*cb,mz1,turn);items.push({z:mp[2],f:function(){var r=G.R*.075*mp[3],im=orb(Math.round(r),P,"faint");g.drawImage(im,mp[0]-im.__s/2,mp[1]-im.__s/2,im.__s,im.__s);}});
  /* the sphere of the day, with its mark standing above its face */
  items.push({z:ballZ,f:function(){var r=G.R*.43,lift=FX.lift,bx=G.cx,by=G.cy-lift*4;r*=1+lift*.03+FX.ks.x*.05-(FX.down?.02:0);
    cast(g,bx+r*.1,G.cy+r*1.02,r*.7*(1-lift*.08),r*.16,.12+lift*.03);globe(g,bx,by,r,P,FX.t/14000*TAU);
    /* the knock's ripple, in the sphere's purple, as Home's orbs knock before their room opens */
    if(FX.rip){var kk=(performance.now()-FX.rip)/760;if(kk<1){g.save();g.strokeStyle=night()?"rgba(201,178,242,"+(.6*(1-kk))+")":"rgba(106,63,181,"+(.5*(1-kk))+")";g.lineWidth=2.6*(1-kk)+.4;
      g.beginPath();g.arc(bx,by,r*(1.04+.85*kk),0,TAU);g.stroke();g.restore();}else FX.rip=0;}
    var par=Math.sin(turn)*r*.2;fxMark(g,bx+par,by,r*.92,1);}});
  items.sort(function(a,b){return a.z-b.z;});items.forEach(function(it){it.f();});}
/* it never stops while it can be seen: the sphere turns, the rings and the moon go round, the whole sways on two slow swells; under the
   pointer it leans toward it on a spring (its sway quietened, not stopped), and comes back when the pointer leaves */
function fxStep(dt){if(still()){FX.amp=0;FX.sw=0;FX.lift=FX.hover?1:0;FX.le.x=0;fxDraw();return false;}
  var sp=motion()==="full"?1.35:1,goal=FX.hold?.35:1;FX.t+=dt*sp;
  FX.amp+=(goal-FX.amp)*Math.min(1,dt/500);var T=FX.t/1000;
  var amb=FX.amp*((10*Math.sin(T/19*TAU)+4*Math.sin(T/7.3*TAU+1.3))*Math.PI/180);
  FX.sw=amb+FX.lt.to(FX.tx*30*Math.PI/180,dt);FX.le.to(FX.ty*7*Math.PI/180,dt);FX.ks.to(0,dt);
  var lg=FX.hover?1:0;FX.lift+=(lg-FX.lift)*Math.min(1,dt/110);
  fxDraw();return true;}
function fxRun(){if(!FX.C||!FX.C.shown){if(FX.loop)FX.loop.stop();return;}if(still()){if(FX.loop)FX.loop.stop();fxDraw();return;}if(!FX.loop)FX.loop=Loop(fxStep);FX.loop.start();}
function fxTick(){/* the time beside the sphere, and what the hour is good for: once a minute, only when it changes */
  var C=FX.C;if(!C||!C.on)return;var rt=routine(),t=clock(),s=rt?"a good moment for "+lower(rname(rt)):partOfDay();C.tagSet(t,s);
  var b=C.keys.begin;if(b){keyText(b,rt?"Begin "+lower(rname(rt)):"Open Today");keyIcon(b,rt?"play":"open");}}
function fxToday(){try{if(W.IngFocusParts)W.IngFocusParts.show("today",true);}catch(e){}var C=FX.C;if(C)C.toRoom("#page-focus .fxp-bar");}
function fxRoutines(){try{if(W.IngFocusParts)W.IngFocusParts.show("today",true);}catch(e){}var C=FX.C;setTimeout(function(){if(C)C.toRoom("#fxRoutinesHost");},60);}
function fxBegin(){var rt=routine(),s=SC();if(rt&&s){try{s.runRoutine(rt);return;}catch(e){}}fxToday();}
FX.C=mount({page:"page-focus",label:"Focus",eyebrow:"Focus · the hours of your day",cls:"hd-focus",
  ok:function(p){return !!p;},
  keys:[{name:"begin",id:"hdFocusBegin",text:"Open Today",icon:"open",primary:true,click:fxBegin},{name:"routines",id:"hdFocusRoutines",text:"Your routines",icon:"lines",click:fxRoutines}],
  line:"The hours of today, your morning and your evening, and the step in front of you: all in one place, on this device.",
  scene:function(C){var cv=mk("canvas","hd-cv");cv.setAttribute("aria-hidden","true");C.box.appendChild(cv);FX.cv=cv;
    var hit=mk("button","hd-hit hd-key");hit.type="button";hit.id="hdFocusSphere";hit.setAttribute("aria-label","Open Today");C.box.appendChild(hit);
    hit.addEventListener("pointerenter",function(e){if(e.pointerType!=="touch"){FX.hover=true;fxRun();}});
    hit.addEventListener("pointerleave",function(){FX.hover=false;FX.down=false;fxRun();});
    hit.addEventListener("pointerdown",function(){FX.down=true;fxRun();});["pointerup","pointercancel"].forEach(function(t){hit.addEventListener(t,function(){FX.down=false;fxRun();});});
    hit.addEventListener("click",function(e){e.preventDefault();if(!still()){FX.ks.v=-9;FX.rip=performance.now();fxRun();}setTimeout(fxToday,still()?0:280);});
    hit.addEventListener("focus",function(){FX.hold=true;fxRun();});hit.addEventListener("blur",function(){FX.hold=false;fxRun();});
    C.scene.addEventListener("pointerenter",function(e){if(e.pointerType!=="touch"){FX.hold=true;fxRun();}});
    C.scene.addEventListener("pointermove",function(e){if(e.pointerType==="touch")return;var r=C.box.getBoundingClientRect();if(!r.width)return;
      FX.tx=clamp((e.clientX-(r.left+r.width*212/520))/(r.width*.42),-1,1);FX.ty=clamp((e.clientY-(r.top+r.height*176/460))/(r.height*.5),-1,1);},{passive:true});
    C.scene.addEventListener("pointerleave",function(){FX.tx=0;FX.ty=0;if(D.activeElement!==hit){FX.hold=false;fxRun();}});
    C.hintSet(["Point at the sphere to still it; press it to open Today."]);},
  enter:function(C){fxTick();if(!FX.clockT)FX.clockT=setInterval(function(){if(FX.C&&FX.C.shown)fxTick();},20000);},
  leave:function(){if(FX.loop)FX.loop.stop();},
  paint:function(){fxTick();fxDraw();},
  theme:function(){BASE.sig="";fxDraw();fxRun();},
  shown:function(C,sh){if(sh){fxTick();fxDraw();}fxRun();},
  resize:function(){BASE.sig="";fxDraw();}});
W.IngHeads.focus={state:function(){return {on:!!(FX.C&&FX.C.on),shown:!!(FX.C&&FX.C.shown),running:!!(FX.loop&&FX.loop.running()),t:FX.t,sway:FX.sw,amp:FX.amp,hold:FX.hold,
  tag:FX.C&&FX.C.tagB?[FX.C.tagB.textContent,FX.C.tagS.textContent]:null,begin:FX.C&&FX.C.keys.begin?FX.C.keys.begin.textContent:""};},draw:fxDraw};
try{window.__ingParts["p284"]="running";}catch(_){}
})();
</script>
