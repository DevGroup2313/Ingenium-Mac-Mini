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
     document. The fan never stops moving (three slow swells on three axes, none in step), leans toward the pointer as Home's orbs do,
     the ribbon stirs and the sheets behind breathe open and closed; on the foot of the sheet in front lies Ingenium's seal in violet
     sealing wax, the ribbon's two tails coming out from under it, to press for the pleasure of it (it opens nothing), with Home's
     clicks and flourishes (the owner's words of 12 November 2026: "I want real movement and animation on all of the pages"; "I just
     want to use it as a fidget button"; of 13 November: "I like the seal as wax seal pressed for Lector"). Every swell keeps one
     period (twelve seconds: the turn and the nod a quarter apart, so the fan rolls round smoothly; the rise, the ribbon and its tails
     twice in it), as the owner found the swells out of step ("everything just moves at a weird rythm"). Minimal motion and reduced
     motion keep it still. */
#page-lector.hd-on #lx7{--l-h:var(--hd-room,640px) !important}
#page-lector.hd-on #lx7 .l-head > div:first-child{display:none}
#page-lector.hd-on #lx7 .l-head{justify-content:flex-end}
#page-lector .lf{position:absolute;left:0;top:0;width:520px;height:460px;perspective:1000px;perspective-origin:262px 200px;transform:scale(.86);transform-origin:262px 250px}
#page-lector .lf-cast{position:absolute;left:96px;top:372px;width:330px;height:84px;border-radius:50%;background:radial-gradient(closest-side,rgba(42,20,80,.20),rgba(42,20,80,.07) 60%,rgba(42,20,80,0));pointer-events:none}
body[data-theme="night"] #page-lector .lf-cast{background:radial-gradient(closest-side,rgba(0,0,0,.55),rgba(0,0,0,.2) 60%,rgba(0,0,0,0))}
#page-lector .lf-tilt,#page-lector .lf-sway,#page-lector .lf-sx,#page-lector .lf-sy{position:absolute;left:0;top:0;width:520px;height:460px;transform-style:preserve-3d;transform-origin:262px 250px}
/* it leans toward the pointer as Home's orbs do (the same quick, soft settling), and never stops moving: the turn and the nod share one
   twelve-second period a quarter apart (so the fan rolls round and never halts at a turn), the rise goes twice in it */
#page-lector .lf-tilt{transform:rotateX(var(--lf-rx,0deg)) rotateY(var(--lf-ry,0deg));transition:transform .45s cubic-bezier(.2,.8,.2,1)}
#page-lector .lf-sway{animation:lfYaw 6s cubic-bezier(.37,0,.63,1) infinite alternate}
#page-lector .lf-sx{animation:lfPitch 6s cubic-bezier(.37,0,.63,1) -3s infinite alternate}
#page-lector .lf-sy{animation:lfFloat 3s cubic-bezier(.37,0,.63,1) -1.5s infinite alternate}
@keyframes lfYaw{from{transform:rotateY(-7deg)}to{transform:rotateY(7deg)}}
@keyframes lfPitch{from{transform:rotateX(3deg)}to{transform:rotateX(-2.4deg)}}
@keyframes lfFloat{from{transform:translateY(2px)}to{transform:translateY(-4px)}}
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
/* Ingenium's seal in sealing wax on the foot of the sheet in front (modules/r284.js IngHeads.sealKey with wax): Home's seal key, its
   clicks and its flourishes, for the pleasure of pressing it, as the owner asked ("I just want to use it as a fidget button on the page
   for my amusement, I like the clicking and the animation that goes with it matching that of the one from the Home page"); it opens
   nothing. It lies on the paper and rises and sinks with the sheet; the ribbon's two tails come out from under it */
#page-lector .lf-seal{position:absolute;left:216px;top:334px;width:88px;height:88px;transform-style:preserve-3d;transform:translate3d(0,0,2px);transition:transform .5s cubic-bezier(.34,1.3,.64,1)}
#page-lector .lf-seal.lf-up{transform:translate3d(0,-16px,28px)}
#page-lector .lf-seal.lf-dn{transform:translate3d(0,0,-2px);transition-duration:.08s}
#page-lector .lf-seal .hd-seal{position:absolute;left:0;top:0;width:88px;height:88px;transform:translateZ(1px)}
#page-lector .lf-tails{position:absolute;left:0;top:0;width:88px;height:88px;transform-style:preserve-3d;pointer-events:none}
#page-lector .lf-tails i{position:absolute;left:37px;top:46px;width:15px;height:66px;transform-origin:50% 0;background:linear-gradient(90deg,#5e33b0,#9b74e6 40%,#7a4fd0 62%,#55309a);
  clip-path:polygon(0 0,100% 0,100% 100%,50% 86%,0 100%);box-shadow:inset 0 -1px 0 rgba(30,10,70,.25)}
#page-lector .lf-tails i.a{transform:rotate(26deg)}#page-lector .lf-tails i.b{transform:rotate(-19deg);height:60px}
body[data-theme="night"] #page-lector .lf-tails i{background:linear-gradient(90deg,#4f2c96,#a27ef0 40%,#7a54d4 62%,#3f227e)}
/* the ribbon stirs, and the sheets behind breathe open and closed (where the web view knows rotate; elsewhere they stand still) */
#page-lector .lf-card.lf-f .lf-ribbon{transform-origin:50% 0;animation:lfRib 6s ease-in-out infinite}
#page-lector .lf-tails i.a{animation:lfTailA 6s ease-in-out -1.5s infinite}#page-lector .lf-tails i.b{animation:lfTailB 6s ease-in-out -1.5s infinite}
@keyframes lfTailA{0%,100%{transform:rotate(24deg)}50%{transform:rotate(28.5deg)}}
@keyframes lfTailB{0%,100%{transform:rotate(-21deg)}50%{transform:rotate(-17deg)}}
@keyframes lfRib{0%,100%{transform:translateZ(3px) rotate(-2deg)}50%{transform:translateZ(3px) rotate(2.6deg)}}
#page-lector button.lf-card.lf-l{animation:lfOpenL 12s ease-in-out infinite}
#page-lector button.lf-card.lf-r{animation:lfOpenR 12s ease-in-out infinite}
@keyframes lfOpenL{0%,100%{rotate:0deg}50%{rotate:-3deg}}
@keyframes lfOpenR{0%,100%{rotate:0deg}50%{rotate:3deg}}
body[data-motion="minimal"] #page-lector .lf-sway,body[data-motion="minimal"] #page-lector .lf-sx,body[data-motion="minimal"] #page-lector .lf-sy,
body[data-motion="minimal"] #page-lector .lf-ribbon,body[data-motion="minimal"] #page-lector .lf-tails i,body[data-motion="minimal"] #page-lector button.lf-card{animation:none}
body[data-motion="minimal"] #page-lector button.lf-card,body[data-motion="minimal"] #page-lector .lf-tilt,body[data-motion="minimal"] #page-lector .lf-seal{transition:none}
@media (prefers-reduced-motion:reduce){#page-lector .lf-sway,#page-lector .lf-sx,#page-lector .lf-sy,#page-lector .lf-ribbon,#page-lector .lf-tails i,#page-lector button.lf-card{animation:none}#page-lector button.lf-card,#page-lector .lf-tilt,#page-lector .lf-seal{transition:none}}
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
function fill(b,d,pos){b.__d=d;var cls="lf-card hd-key lf-"+pos+(d&&d.done?" is-done":"")+(b.classList.contains("lf-ph")?" lf-ph":"");if(b.className!==cls)b.className=cls;b.hidden=!d;if(!d)return;
  var n=d.name,cap=(n.replace(/^(Master|The)\s+/i,"").charAt(0)||"·").toUpperCase(),sub=apps()?"from the "+(apps()===1?"app":apps()+" apps")+" you chose":"from the apps you choose";
  set(b.querySelector(".lf-tab"),n);set(b.querySelector(".lf-cap"),cap);set(b.querySelector(".lf-ttl"),n.replace(/^(Master\s+)/,"$1"));set(b.querySelector(".lf-sub"),sub);set(b.querySelector(".lf-num"),ROMAN[d.i]||String(d.i+1));
  var lab=n+(pos==="f"?", shown in The document":"")+". Press to read it.";if(b.getAttribute("aria-label")!==lab)b.setAttribute("aria-label",lab);}
/* the paper's tooth: a small tile of grain, made once */
function grainTile(dark){var c=D.createElement("canvas");c.width=c.height=96;var g=c.getContext("2d"),im=g.createImageData(96,96),s=7;
  for(var i=0;i<im.data.length;i+=4){s=(s*1103515245+12345)&2147483647;var v=s/2147483647;im.data[i]=dark?205:90;im.data[i+1]=dark?184:64;im.data[i+2]=dark?240:150;im.data[i+3]=Math.round(v*v*(dark?20:16));}
  g.putImageData(im,0,0);try{return 'url("'+c.toDataURL("image/png")+'")';}catch(e){return "none";}}
function build(C){var root=mk("div","lf");root.setAttribute("role","group");root.setAttribute("aria-label","The documents of this reading");
  var tilt=mk("div","lf-tilt"),sway=mk("div","lf-sway"),sx=mk("div","lf-sx"),sy=mk("div","lf-sy");
  root.appendChild(mk("i","lf-cast"));LF.cards=[card(),card(),card()];sy.appendChild(LF.cards[0]);sy.appendChild(LF.cards[2]);sy.appendChild(LF.cards[1]);
  var sl=mk("div","lf-seal"),tails=mk("i","lf-tails"),key=H.sealKey({label:"Ingenium's seal. Press it for fun.",size:84,sound:"lector",wax:true,lean:.55});
  tails.setAttribute("aria-hidden","true");tails.appendChild(mk("i","a"));tails.appendChild(mk("i","b"));sl.appendChild(tails);sl.appendChild(key.box);sy.appendChild(sl);LF.key=key;LF.seal=sl;
  /* the seal lies on the sheet in front: it rises with it under the pointer and sinks with it when pressed, and pointing at the seal
     lifts the sheet too, so the two never part */
  var front=LF.cards[1],onS=false,onF=false;function up(){sl.classList.toggle("lf-up",onS||onF);front.classList.toggle("lf-ph",onS&&!onF);}
  front.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"){onF=true;up();}});front.addEventListener("pointerleave",function(){onF=false;up();});
  key.box.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"){onS=true;up();}});key.box.addEventListener("pointerleave",function(){onS=false;up();});
  front.addEventListener("pointerdown",function(){sl.classList.add("lf-dn");});["pointerup","pointercancel","pointerleave"].forEach(function(t){front.addEventListener(t,function(){sl.classList.remove("lf-dn");});});
  sx.appendChild(sy);sway.appendChild(sx);tilt.appendChild(sway);root.appendChild(tilt);C.box.appendChild(root);LF.root=root;
  root.style.setProperty("--lf-grain",grainTile(false));root.style.setProperty("--lf-grain-n",grainTile(true));
  root.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||H.still())return;var r=root.getBoundingClientRect();if(!r.width)return;
    var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.setProperty("--lf-ry",(x*24).toFixed(1)+"deg");tilt.style.setProperty("--lf-rx",(-y*16).toFixed(1)+"deg");},{passive:true});
  root.addEventListener("pointerleave",function(){tilt.style.removeProperty("--lf-ry");tilt.style.removeProperty("--lf-rx");});
  C.hintSet(["Point at a document to lift it from the fan; press it to read it."]);}
function paint(){var C=LF.C;if(!C||!C.on||!LF.cards.length)return;var t=three();fill(LF.cards[0],t[0],"l");fill(LF.cards[1],t[1],"f");fill(LF.cards[2],t[2],"r");
  var go=$("l7BriefF")&&$("l7BriefF").querySelector("button.next"),k=C.keys.start;if(k){H.keyText(k,go&&go.textContent.trim()?go.textContent.trim():"Start reading");}}
function openDoc(d){if(!d)return;var box=$("l7Dtabs"),tab=null;/* The document draws its tabs again on each change: find this one by its name now */
  if(box)[].some.call(box.querySelectorAll("button"),function(x){if((x.textContent||"").trim()===d.name){tab=x;return true;}return false;});if(tab){try{tab.click();}catch(e){}}try{if(W.IngLector&&IngLector.setPanel)IngLector.setPanel("doc");}catch(e){}if(LF.C)LF.C.toRoom("#lx7");setTimeout(paint,40);}
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
    paint:function(){paint();},shown:function(C,sh){if(sh)paint();}});
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
