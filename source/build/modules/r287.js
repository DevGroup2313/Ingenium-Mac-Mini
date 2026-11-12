<style id="r287-css">
/* ============ R287 · LECTOR'S HEAD: THE DOCUMENTS OF YOUR APPS (Ingenium 6.93, 12 November 2026) ============
   The owner's words (12 November 2026), on the first try (an open book on a lectern): "The Lector page's preview is a NO, I dislike it,
   please try again." The fan of documents that followed was approved on its picture the same day; it is drawn again here from that
   picture (modules/r284.js has why).
   - Lector's head (modules/r284.js IngHeads): its title, its words, Start reading and Add your apps (the brief's own keys, pressed for
     you), and the four steps in one line. The three panels, the steps and the tabs stay as they were, under it, and keep the window's
     height (--l-h follows --hd-room).
   - The fan: the documents of the reading, as Lector names them in The document (Notes and analysis, Project dossier, Appendix, or the
     ones chosen), each a sheet of paper with its tab, its initial, its title, a few lines, its numeral and its ribbon, the one shown in
     front, the others fanned behind it, sealed with Ingenium's seal. Pointed at, a sheet lifts from the fan; pressed, it opens in The
     document. The fan sways a little when left alone; minimal motion and the system's reduced motion keep it still. */
#page-lector.hd-on #lx7{--l-h:var(--hd-room,640px) !important}
#page-lector.hd-on #lx7 .l-head > div:first-child{display:none}
#page-lector.hd-on #lx7 .l-head{justify-content:flex-end}
#page-lector .lf{position:absolute;left:0;top:0;width:520px;height:460px;perspective:1000px;perspective-origin:262px 200px;transform:scale(.86);transform-origin:262px 250px}
#page-lector .lf-cast{position:absolute;left:96px;top:372px;width:330px;height:84px;border-radius:50%;background:radial-gradient(closest-side,rgba(42,20,80,.20),rgba(42,20,80,.07) 60%,rgba(42,20,80,0));pointer-events:none}
body[data-theme="night"] #page-lector .lf-cast{background:radial-gradient(closest-side,rgba(0,0,0,.55),rgba(0,0,0,.2) 60%,rgba(0,0,0,0))}
#page-lector .lf-tilt,#page-lector .lf-sway{position:absolute;left:0;top:0;width:520px;height:460px;transform-style:preserve-3d;transform-origin:262px 250px}
#page-lector .lf-tilt{transform:rotateX(var(--lf-rx,0deg)) rotateY(var(--lf-ry,0deg));transition:transform .7s cubic-bezier(.2,.8,.2,1)}
#page-lector .lf-sway{animation:lfSway 12s ease-in-out infinite}
@keyframes lfSway{0%,100%{transform:rotateY(-12deg) rotateX(5deg)}50%{transform:rotateY(12deg) rotateX(-3deg)}}
#page-lector .lf.lf-hold .lf-sway{animation-play-state:paused}
/* a sheet: a key that is a document, standing in the fan with its own thickness */
#page-lector button.lf-card{position:absolute;left:152px;top:58px;width:216px;height:330px;margin:0;padding:0;border:0;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer;
  -webkit-tap-highlight-color:transparent;transform-style:preserve-3d;transform-origin:50% 100%;
  transform:translate3d(var(--lx,0px),var(--ly,0px),var(--lz,0px)) rotate(var(--lr,0deg)) scale(var(--ls,1));transition:transform .5s cubic-bezier(.34,1.3,.64,1)}
#page-lector button.lf-card.lf-l{--lx:-36px;--ly:24px;--lz:-34px;--lr:-11deg;--ls:.97}
#page-lector button.lf-card.lf-r{--lx:36px;--ly:24px;--lz:-34px;--lr:11deg;--ls:.97}
#page-lector button.lf-card.lf-f{--lz:0px}
#page-lector button.lf-card.lf-l:hover,#page-lector button.lf-card.lf-l.lf-ph{--lx:-84px;--ly:4px;--lz:-6px;--lr:-15deg;--ls:.99}
#page-lector button.lf-card.lf-r:hover,#page-lector button.lf-card.lf-r.lf-ph{--lx:84px;--ly:4px;--lz:-6px;--lr:15deg;--ls:.99}
#page-lector button.lf-card.lf-f:hover,#page-lector button.lf-card.lf-f.lf-ph{--ly:-16px;--lz:26px;--ls:1.015}
#page-lector button.lf-card.lf-down{--lz:-4px;--ls:.98;transition-duration:.08s}
#page-lector button.lf-card:focus{outline:none}
#page-lector button.lf-card:focus-visible .lf-sheet{box-shadow:0 0 0 3px var(--accent)}
#page-lector .lf-sheet,#page-lector .lf-leaf,#page-lector .lf-shade{position:absolute;left:0;top:0;width:216px;height:330px;border-radius:14px;box-sizing:border-box;display:block}
#page-lector .lf-shade{background:rgba(42,20,80,.16);filter:blur(10px);transform:translateZ(-12px) translateY(10px)}
body[data-theme="night"] #page-lector .lf-shade{background:rgba(0,0,0,.6)}
#page-lector .lf-leaf{background:linear-gradient(170deg,#eee8f8,#dcd2ee);box-shadow:inset 0 0 0 1px rgba(106,63,181,.16)}
#page-lector .lf-leaf.a{transform:translateZ(-2.6px) translate(.8px,1.4px)}#page-lector .lf-leaf.b{transform:translateZ(-5.2px) translate(1.6px,2.8px);background:linear-gradient(170deg,#e3dbf2,#cfc4e6)}
#page-lector .lf-leaf.c{transform:translateZ(-7.8px) translate(2.4px,4.2px);background:linear-gradient(170deg,#d8cfeb,#c3b6df)}
body[data-theme="night"] #page-lector .lf-leaf{background:linear-gradient(170deg,#2c2342,#211a33);box-shadow:inset 0 0 0 1px rgba(205,184,240,.10)}
body[data-theme="night"] #page-lector .lf-leaf.b,body[data-theme="night"] #page-lector .lf-leaf.c{background:linear-gradient(170deg,#221b34,#18122a)}
#page-lector .lf-sheet{overflow:hidden;padding:20px 20px 16px;background-color:#fdfcff;background-image:var(--lf-grain,none),linear-gradient(170deg,#ffffff 0%,#fbf9fe 55%,#f2edfa 100%);
  box-shadow:inset 0 0 0 1px rgba(106,63,181,.18),inset 0 0 0 7px rgba(255,255,255,.9),inset 0 0 0 8px rgba(106,63,181,.13),inset 0 -18px 30px rgba(106,63,181,.05)}
body[data-theme="night"] #page-lector .lf-sheet{background-color:#2a2140;background-image:var(--lf-grain-n,none),linear-gradient(170deg,#30264a 0%,#271e3b 55%,#1f1830 100%);
  box-shadow:inset 0 0 0 1px rgba(205,184,240,.16),inset 0 0 0 7px rgba(42,33,64,.9),inset 0 0 0 8px rgba(205,184,240,.10)}
#page-lector .lf-tab{position:absolute;left:22px;top:-30px;height:31px;max-width:150px;padding:0 14px 0 26px;box-sizing:border-box;border-radius:11px 11px 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  font:600 14px/32px var(--hd-serif);color:var(--ink-1);background:linear-gradient(#ffffff,#f8f5fd);box-shadow:inset 0 0 0 1px rgba(106,63,181,.18),inset 0 1px 0 #ffffff}
#page-lector .lf-tab::before{content:"";position:absolute;left:12px;top:13px;width:7px;height:7px;border-radius:50%;background:var(--accent)}
body[data-theme="night"] #page-lector .lf-tab{background:linear-gradient(#352a4f,#2f2546);box-shadow:inset 0 0 0 1px rgba(205,184,240,.16)}
#page-lector .lf-card:not(.lf-f) .lf-ribbon{display:none}
#page-lector .lf-ribbon{position:absolute;right:30px;top:-6px;width:16px;height:96px;transform:translateZ(3px);background:linear-gradient(90deg,#5e33b0,#9b74e6 40%,#7a4fd0 62%,#55309a);
  clip-path:polygon(0 0,100% 0,100% 100%,50% 86%,0 100%)}
#page-lector .lf-ribbon::before{content:"";position:absolute;left:0;top:0;width:16px;height:7px;background:rgba(30,10,70,.35)}
body[data-theme="night"] #page-lector .lf-ribbon{background:linear-gradient(90deg,#4f2c96,#a27ef0 40%,#7a54d4 62%,#3f227e)}
#page-lector .lf-cap{float:left;margin:2px 10px 0 0;font:600 54px/.82 var(--hd-serif);color:var(--accent);text-shadow:0 1px 0 rgba(255,255,255,.8)}
body[data-theme="night"] #page-lector .lf-cap{text-shadow:none}
#page-lector .lf-ttl{display:block;padding-right:18px;font:600 21px/1.08 var(--hd-serif);color:var(--ink-1)}
#page-lector .lf-sub{display:block;clear:both;margin:6px 0 0 50px;padding-right:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font:italic 500 14px/1.2 var(--hd-serif);color:var(--hd-ink3)}
#page-lector .lf-lines{display:block;margin-top:30px}
#page-lector .lf-lines i{display:block;height:4px;margin:0 0 9px;border-radius:2px;background:rgba(106,63,181,.10)}
body[data-theme="night"] #page-lector .lf-lines i{background:rgba(205,184,240,.11)}
#page-lector .lf-lines i.gap{height:0;margin:0 0 14px;background:none}
#page-lector .lf-rule{position:absolute;left:20px;right:20px;bottom:56px;height:1px;background:rgba(106,63,181,.18)}
#page-lector .lf-num{position:absolute;left:22px;bottom:24px;font:600 19px/1 var(--hd-serif);color:var(--accent)}
#page-lector .lf-card.is-done .lf-num::after{content:"·";margin-left:6px;color:var(--hd-ink3)}
/* the seal: a coin standing proud of the fan, on discs of its own */
#page-lector .lf-seal{position:absolute;left:224px;top:352px;width:72px;height:72px;pointer-events:none;transform-style:preserve-3d;transform:translateZ(30px)}
#page-lector .lf-sidle{position:absolute;left:0;top:0;width:72px;height:72px;transform-style:preserve-3d;animation:lfSeal 7s ease-in-out infinite}
@keyframes lfSeal{0%,100%{transform:rotateY(-16deg) rotateX(5deg)}50%{transform:rotateY(16deg) rotateX(-5deg)}}
#page-lector .lf.lf-hold .lf-sidle{animation-play-state:paused}
#page-lector .lf-srim{position:absolute;left:2px;top:2px;width:68px;height:68px;border-radius:50%;transform:translateZ(var(--z));background:linear-gradient(155deg,#ffffff,#cfc6e2 50%,#9a8fb3)}
body[data-theme="night"] #page-lector .lf-srim{background:linear-gradient(155deg,#6b5d93,#2f2546 50%,#120d1c)}
#page-lector .lf-scast{position:absolute;left:12px;top:58px;width:50px;height:12px;border-radius:50%;background:rgba(42,20,80,.3);filter:blur(5px);transform:translateZ(-14px)}
#page-lector .lf-seal canvas{position:absolute;left:0;top:0;width:72px;height:72px}
#page-lector .lf-seal canvas.lf-sstar{transform:translateZ(7px)}
body[data-motion="minimal"] #page-lector .lf-sway,body[data-motion="minimal"] #page-lector .lf-sidle{animation:none}
body[data-motion="minimal"] #page-lector button.lf-card,body[data-motion="minimal"] #page-lector .lf-tilt{transition:none}
@media (prefers-reduced-motion:reduce){#page-lector .lf-sway,#page-lector .lf-sidle{animation:none}#page-lector button.lf-card,#page-lector .lf-tilt{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p287"]="started";}catch(_){}
/* R287 · Lector's head, the documents of your apps: see the note at the top of its styles */
(function(){"use strict";
if(window.__r287)return;window.__r287=1;
var D=document,W=window,TAU=Math.PI*2,H=null,ROMAN=["I","II","III","IV","V","VI","VII","VIII"];
var LF={C:null,root:null,cards:[],seal:null,sig:"",lede:null};
function $(id){return D.getElementById(id);}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
/* the documents, as The document names them (its tabs), else the three a reading begins with */
function docs(){var box=$("l7Dtabs"),out=[];if(box)[].forEach.call(box.querySelectorAll("button"),function(b,i){var t=(b.textContent||"").trim();if(t)out.push({i:i,name:t,on:b.getAttribute("aria-selected")==="true",
    done:!!b.querySelector(".dot.done"),b:b});});
  if(!out.length)out=[{i:0,name:"Notes and analysis"},{i:1,name:"Project dossier",on:true},{i:2,name:"Appendix"}];return out;}
function apps(){try{var L=W.IngLector&&IngLector.state();var a=L&&((L.job&&L.job.apps)||(L.brief&&L.brief.apps))||[];return a.length;}catch(e){return 0;}}
function three(){var d=docs(),f=0;d.forEach(function(x,i){if(x.on)f=i;});var L=d[(f-1+d.length)%d.length],R=d[(f+1)%d.length];
  if(d.length===1)return [null,d[0],null];if(d.length===2)return [null,d[f],d[1-f]];return [L,d[f],R];}
function card(){var b=mk("button","lf-card hd-key");b.type="button";
  b.innerHTML='<i class="lf-shade"></i><i class="lf-leaf c"></i><i class="lf-leaf b"></i><i class="lf-leaf a"></i><span class="lf-sheet"><span class="lf-cap"></span><span class="lf-ttl"></span><span class="lf-sub"></span>'+
    '<span class="lf-lines"><i style="width:92%"></i><i style="width:84%"></i><i style="width:88%"></i><i style="width:58%"></i><i class="gap"></i><i style="width:90%"></i><i style="width:80%"></i><i style="width:64%"></i></span>'+
    '<span class="lf-rule"></span><span class="lf-num"></span></span><span class="lf-tab"></span><span class="lf-ribbon"></span>';
  b.addEventListener("pointerdown",function(e){if(e.button!=null&&e.button!==0)return;b.classList.add("lf-down");});
  ["pointerup","pointercancel","pointerleave","blur"].forEach(function(t){b.addEventListener(t,function(){b.classList.remove("lf-down");});});
  b.addEventListener("click",function(e){e.preventDefault();openDoc(b.__d);});return b;}
function set(e,s){if(e&&e.textContent!==s)e.textContent=s;}
function fill(b,d,pos){b.__d=d;var cls="lf-card hd-key lf-"+pos+(d&&d.done?" is-done":"");if(b.className!==cls)b.className=cls;b.hidden=!d;if(!d)return;
  var n=d.name,cap=(n.replace(/^(Master|The)\s+/i,"").charAt(0)||"·").toUpperCase(),sub=apps()?"from the "+(apps()===1?"app":apps()+" apps")+" you chose":"from the apps you choose";
  set(b.querySelector(".lf-tab"),n);set(b.querySelector(".lf-cap"),cap);set(b.querySelector(".lf-ttl"),n.replace(/^(Master\s+)/,"$1"));set(b.querySelector(".lf-sub"),sub);set(b.querySelector(".lf-num"),ROMAN[d.i]||String(d.i+1));
  var lab=n+(pos==="f"?", shown in The document":"")+". Press to read it.";if(b.getAttribute("aria-label")!==lab)b.setAttribute("aria-label",lab);}
function drawSeal(){if(!LF.seal)return;var d=H.dpr(),s=72,n=H.night();
  function sz(cv){if(cv.width!==Math.round(s*d)){cv.width=Math.round(s*d);cv.height=Math.round(s*d);}var g=cv.getContext("2d");g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,s,s);return g;}
  /* its collar of turned metal and its violet face */
  var g=sz(LF.seal);var cg=g.createLinearGradient(6,6,66,66);cg.addColorStop(0,n?"#8a78bd":"#ffffff");cg.addColorStop(.5,n?"#4a3c70":"#e4dcf3");cg.addColorStop(1,n?"#1d1530":"#a896cf");
  g.beginPath();g.arc(36,36,34,0,TAU);g.fillStyle=cg;g.fill();
  for(var r=27.5;r<34;r+=.8){g.beginPath();g.arc(36,36,r,0,TAU);g.strokeStyle=(r*10%2<1)?(n?"rgba(0,0,0,.12)":"rgba(80,64,120,.06)"):(n?"rgba(220,205,255,.06)":"rgba(255,255,255,.45)");g.lineWidth=.7;g.stroke();}
  g.beginPath();g.arc(36,36,33.4,Math.PI*.75,Math.PI*1.75);g.strokeStyle=n?"rgba(220,205,255,.35)":"#ffffff";g.lineWidth=1.2;g.stroke();
  g.beginPath();g.arc(36,36,27.5,0,TAU);g.fillStyle=n?"#120c1c":"#9e8ccc";g.fill();H.orbPaint(g,36,36,26.5,H.pal("lector"),"swirl",.1);
  /* the star, raised above its face */
  g=sz(LF.sstar);g.save();g.translate(36,36);[[1.3,1.8,"rgba(20,6,48,.45)"],[.6,.9,"#cdb8ff"],[0,0,"#ffffff"]].forEach(function(l){g.save();g.translate(l[0],l[1]);g.fillStyle=l[2];g.beginPath();
    for(var i=0;i<4;i++){var a=-Math.PI/2+i*Math.PI/2,R=12,rr=3.5;g.lineTo(Math.cos(a)*R,Math.sin(a)*R);g.lineTo(Math.cos(a+Math.PI/4)*rr,Math.sin(a+Math.PI/4)*rr);}g.closePath();g.fill();g.restore();});g.restore();}
/* the paper's tooth: a small tile of grain, made once */
function grainTile(dark){var c=D.createElement("canvas");c.width=c.height=96;var g=c.getContext("2d"),im=g.createImageData(96,96),s=7;
  for(var i=0;i<im.data.length;i+=4){s=(s*1103515245+12345)&2147483647;var v=s/2147483647;im.data[i]=dark?205:90;im.data[i+1]=dark?184:64;im.data[i+2]=dark?240:150;im.data[i+3]=Math.round(v*v*(dark?20:16));}
  g.putImageData(im,0,0);try{return 'url("'+c.toDataURL("image/png")+'")';}catch(e){return "none";}}
function build(C){var root=mk("div","lf");root.setAttribute("role","group");root.setAttribute("aria-label","The documents of this reading");var tilt=mk("div","lf-tilt"),sway=mk("div","lf-sway");
  root.appendChild(mk("i","lf-cast"));LF.cards=[card(),card(),card()];sway.appendChild(LF.cards[0]);sway.appendChild(LF.cards[2]);sway.appendChild(LF.cards[1]);
  var sl=mk("div","lf-seal"),si=mk("div","lf-sidle");si.appendChild(mk("i","lf-scast"));for(var i=3;i>=1;i--){var rr=mk("i","lf-srim");rr.style.setProperty("--z",(-i*2.4).toFixed(1)+"px");si.appendChild(rr);}
  LF.seal=D.createElement("canvas");LF.sstar=D.createElement("canvas");LF.sstar.className="lf-sstar";si.appendChild(LF.seal);si.appendChild(LF.sstar);sl.appendChild(si);sway.appendChild(sl);
  tilt.appendChild(sway);root.appendChild(tilt);C.box.appendChild(root);LF.root=root;
  root.style.setProperty("--lf-grain",grainTile(false));root.style.setProperty("--lf-grain-n",grainTile(true));
  root.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||H.still())return;var r=root.getBoundingClientRect();if(!r.width)return;
    var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.setProperty("--lf-ry",(x*28).toFixed(1)+"deg");tilt.style.setProperty("--lf-rx",(-y*20).toFixed(1)+"deg");},{passive:true});
  root.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse")root.classList.add("lf-hold");});root.addEventListener("pointerleave",function(){root.classList.remove("lf-hold");tilt.style.removeProperty("--lf-ry");tilt.style.removeProperty("--lf-rx");});
  root.addEventListener("focusin",function(){root.classList.add("lf-hold");});root.addEventListener("focusout",function(){root.classList.remove("lf-hold");});
  C.hintSet(["Point at a document to lift it from the fan; press it to read it."]);drawSeal();}
function paint(){var C=LF.C;if(!C||!C.on||!LF.cards.length)return;var t=three();fill(LF.cards[0],t[0],"l");fill(LF.cards[1],t[1],"f");fill(LF.cards[2],t[2],"r");
  var go=$("l7BriefF")&&$("l7BriefF").querySelector("button.next"),k=C.keys.start;if(k){H.keyText(k,go&&go.textContent.trim()?go.textContent.trim():"Start reading");}}
function openDoc(d){if(!d)return;if(d.b&&d.b.isConnected){try{d.b.click();}catch(e){}}try{if(W.IngLector&&IngLector.setPanel)IngLector.setPanel("doc");}catch(e){}if(LF.C)LF.C.toRoom("#lx7");setTimeout(paint,40);}
function startReading(){var go=$("l7BriefF")&&$("l7BriefF").querySelector("button.next");try{if(W.IngLector&&IngLector.setPanel)IngLector.setPanel("brief");}catch(e){}if(go)go.click();if(LF.C)LF.C.toRoom("#lx7");}
function addApps(){var bf=$("l7Bf"),b=null;if(bf)[].some.call(bf.querySelectorAll("button"),function(x){if(/Add your apps/.test(x.textContent||"")){b=x;return true;}return false;});
  if(b)b.click();else{try{libPickFiles();}catch(e){}}if(LF.C)LF.C.toRoom("#lx7");}
function start(){H=W.IngHeads;if(!H||!$("page-lector")){if((LF.tries=(LF.tries||0)+1)<240)setTimeout(start,500);return;}
  LF.C=H.mount({page:"page-lector",label:"Lector",eyebrow:"Lector · the documents of your apps",cls:"hd-lector",tag:false,
    ok:function(p){return !!p.querySelector("#lx7");},
    title:function(p){return p.querySelector(":scope > .page-title");},
    lede:function(){if(!LF.lede)LF.lede=mk("p","hd-lede","Reads your apps part by part, thinks out loud as it goes, and writes the documents you need from them. It works on this device, or with your other computer's model when you have linked one.");return LF.lede;},
    before:function(p){return p.querySelector("#lxHost")||p.firstElementChild;},
    keys:[{name:"start",id:"hdLectorStart",text:"Start reading",icon:"book",primary:true,click:startReading},{name:"add",id:"hdLectorAdd",text:"Add your apps",icon:"plus",click:addApps}],
    line:"In four steps: choose your apps, read them part by part, write the documents, then save them as Word, PDF or a web page.",
    scene:function(C){build(C);},
    paint:function(){paint();},theme:function(){drawSeal();},shown:function(C,sh){if(sh)paint();}});
  /* The document's tabs and the brief painting again (a reading begun, a document chosen or written): the fan follows */
  function watch(){var t=$("l7Dtabs"),f=$("l7BriefF");if(!t||!f){setTimeout(watch,800);return;}
    try{var mo=new MutationObserver(function(){if(LF.C&&LF.C.on){clearTimeout(LF.q);LF.q=setTimeout(paint,60);}});mo.observe(t,{childList:true,subtree:true,attributes:true,attributeFilter:["aria-selected","class"]});mo.observe(f,{childList:true,subtree:true,characterData:true});}catch(e){}paint();}
  watch();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
W.IngHeads&&(W.IngHeads.lector={state:function(){var C=LF.C;return {on:!!(C&&C.on),cards:LF.cards.map(function(b){return {pos:(/lf-([lfr])\b/.exec(b.className)||[])[1],name:b.__d?b.__d.name:null,hidden:b.hidden};}),
  start:C&&C.keys.start?C.keys.start.textContent:"",height:(function(){var r=$("lx7");return r?r.getBoundingClientRect().height:0;})()};},paint:paint});
try{window.__ingParts["p287"]="running";}catch(_){}
})();
</script>
