<style id="r314-css">
/* ============ R314 · THE DIAMOND'S COLOURS, WITHIN REACH (Ingenium 7.29, 17 November 2026) ============
   Her words (17 November 2026): "I want a clear way to edit Adamas' diamond and change the colours as I please, I can't locate the
   settings for it. Please make it accessible and visible for me."
   Found: the diamond (modules/r292.js) changed its look by itself through the day (from 5:00 the clear crystal, from 11:00 lavender,
   from 14:00 purple, from 18:00 the night stone, and the night stone whenever the night theme is on), and its holder's centre turned
   between the engine logo and the Orrery when pressed; nothing on any page let her choose. Now:
   - a key on Adamas's head, "Diamond colours", opens a raised panel beside the diamond (under the keys on a narrow screen), so the stone
     changes in view as she chooses;
   - the stone: By the hour (as before), one of the four looks to keep, or a colour of her own (eight jewel colours or any colour, and
     how deep it is, faint to deep); the holder's enamel band: Ingenium's violet or a colour of her own; the light that passes through
     it now and then, on or off; Back to Ingenium's own;
   - the same panel in Settings, Everyday ("The diamond on Adamas"), where Find a setting finds it, with Show me on Adamas.
   Kept with Ingenium's settings (state.diamond), so backups and Ingenium Cloud carry it. With nothing chosen, the diamond is exactly as
   before. Minimal motion and reduced motion keep the panel still. */
.dmc{--dmc-hi:var(--card-hi,#ffffff);--dmc-lo:var(--card-lo,#f7f4fb);--dmc-ink1:var(--ink-1,#221a2e);--dmc-ink2:var(--ink-2,#4a4358);--dmc-ink3:var(--ink-3,#6c6579);
  --dmc-hair:var(--hairline,rgba(34,26,46,.10));--dmc-acc:var(--accent,#6a3fb5);--dmc-pa:var(--rm-pa,#7348be);--dmc-pb:var(--rm-pb,#5d37a1);--dmc-pedge:var(--rm-pedge,#4b2a86);
  --dmc-pop:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.22),0 4px 5px rgba(40,22,68,.14),0 9px 14px rgba(40,22,68,.09);
  --dmc-pophi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.24),0 6px 8px rgba(40,22,68,.17),0 13px 20px rgba(40,22,68,.11);
  --dmc-slab:inset 0 1px 0 rgba(255,255,255,.9),0 1px 0 rgba(40,22,68,.08),0 6px 14px rgba(40,22,68,.12),0 22px 44px rgba(40,22,68,.16);
  --dmc-well:inset 0 1px 2.5px rgba(40,22,68,.10);--dmc-wellbg:rgba(34,26,46,.04);
  position:relative;box-sizing:border-box;color:var(--dmc-ink1);font:500 13px/1.4 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);text-align:left}
body[data-theme="night"] .dmc{--dmc-hi:var(--card-hi,#2a2239);--dmc-lo:var(--card-lo,#231c31);--dmc-ink1:var(--ink-1,#f1ecfa);--dmc-ink2:var(--ink-2,#d3c9e3);--dmc-ink3:var(--ink-3,#a99cc1);
  --dmc-hair:var(--hairline,rgba(205,184,240,.11));--dmc-acc:var(--accent-bright,#c9b2f2);
  --dmc-pop:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5),0 9px 14px rgba(0,0,0,.36);
  --dmc-pophi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.4);
  --dmc-slab:inset 0 1px 0 rgba(255,255,255,.07),0 1px 0 rgba(0,0,0,.45),0 8px 18px rgba(0,0,0,.42),0 24px 48px rgba(0,0,0,.4);
  --dmc-well:inset 0 1px 3px rgba(0,0,0,.45);--dmc-wellbg:rgba(10,6,18,.35)}
/* in the head: a raised slab over the words' half, the diamond in full view beside it */
.skh .dmc.dmc-over{position:absolute;left:22px;top:18px;bottom:18px;width:min(540px,calc(100% - 560px));min-width:380px;z-index:9;overflow:auto;overscroll-behavior:contain;
  padding:16px 18px 14px;border-radius:20px;border:1px solid var(--dmc-hair);background:linear-gradient(180deg,var(--dmc-hi),var(--dmc-lo));box-shadow:var(--dmc-slab);
  animation:dmcRise .34s cubic-bezier(.2,.8,.2,1) both;scrollbar-width:thin}
@media (max-width:1180px){.skh .dmc.dmc-over{width:min(500px,calc(100% - 450px))}}
.skh .dmc.dmc-flow{position:relative;margin:14px 0 4px;padding:14px 14px 12px;border-radius:18px;border:1px solid var(--dmc-hair);background:linear-gradient(180deg,var(--dmc-hi),var(--dmc-lo));
  box-shadow:var(--dmc-slab);pointer-events:auto;animation:dmcRise .34s cubic-bezier(.2,.8,.2,1) both}
.skh .dmc *{pointer-events:auto}
@keyframes dmcRise{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
.skh.dmc-open .skh-hint{opacity:.0;transition:opacity .2s}
.dmc:focus{outline:none}
.dmc-top{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:center;margin:0 0 10px}
.dmc-top b{display:block;font:600 19px/1.15 var(--serif,"Iowan Old Style",Palatino,Georgia,serif);color:var(--dmc-ink1)}
.dmc-top small{display:block;margin-top:2px;font-size:12px;line-height:1.4;color:var(--dmc-ink3)}
.dmc-x{width:32px;height:32px;border-radius:10px;border:1px solid var(--dmc-hair);background:linear-gradient(180deg,var(--dmc-hi),var(--dmc-lo));box-shadow:var(--dmc-pop);color:var(--dmc-ink2);
  font:600 17px/1 var(--sans,sans-serif);cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s}
.dmc-x:hover{transform:translateY(-2px);box-shadow:var(--dmc-pophi)}
.dmc-sec{margin:0;padding:10px 0 8px;border-top:1px solid var(--dmc-hair)}
.dmc-l{margin:0 0 8px;font:600 10.5px/1 var(--sans,sans-serif);letter-spacing:.2em;text-transform:uppercase;color:var(--dmc-ink3)}
.dmc-chips{display:flex;flex-wrap:wrap;gap:7px}
.dmc-c{display:inline-flex;align-items:center;gap:7px;min-height:32px;margin:0;padding:5px 11px 5px 8px;border-radius:11px;border:1px solid var(--dmc-hair);
  background:linear-gradient(180deg,var(--dmc-hi),var(--dmc-lo));box-shadow:var(--dmc-pop);color:var(--dmc-ink2);font:600 12.5px/1.2 var(--sans,sans-serif);cursor:pointer;white-space:nowrap;
  transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s,color .15s}
.dmc-c:hover{transform:translateY(-2px);box-shadow:var(--dmc-pophi);color:var(--dmc-ink1)}
.dmc-c:active{transform:translateY(1px);transition-duration:.06s}
.dmc-c[aria-checked="true"]{color:#fff;background:linear-gradient(180deg,var(--dmc-pa),var(--dmc-pb));border-color:var(--dmc-pedge);text-shadow:0 1px 1px rgba(30,10,60,.32);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26),0 8px 14px rgba(52,24,100,.12);transform:none}
.dmc-c:focus-visible,.dmc-s:focus-visible,.dmc-x:focus-visible,.dmc-k:focus-visible,.dmc-any:focus-within{outline:2.5px solid var(--dmc-acc);outline-offset:3px}
/* a little jewel for each look: a cut stone, lit from the top left */
.dmc-j{position:relative;flex:0 0 auto;width:15px;height:15px;transform:rotate(45deg);border-radius:3px;box-shadow:0 1px 0 rgba(30,10,60,.35),0 2px 4px rgba(30,10,60,.25),inset 0 0 0 1px rgba(255,255,255,.35)}
.dmc-j::after{content:"";position:absolute;left:2px;top:2px;width:5px;height:5px;border-radius:1px;background:rgba(255,255,255,.75);filter:blur(.3px)}
.dmc-j.j-auto{background:conic-gradient(from 225deg,#eef3ff 0 25%,#c8b6f2 0 50%,#7c50d2 0 75%,#3a2570 0)}
.dmc-j.j-clear{background:radial-gradient(circle at 30% 30%,#ffffff,#dfe8f8 55%,#a9bad8)}
.dmc-j.j-lavender{background:radial-gradient(circle at 30% 30%,#f2ecff,#c7b3f3 55%,#9277d6)}
.dmc-j.j-purple{background:radial-gradient(circle at 30% 30%,#d9c5ff,#8a5ae0 55%,#5a2fb0)}
.dmc-j.j-night{background:radial-gradient(circle at 30% 30%,#9d86e0,#4a2f92 55%,#1c1240)}
.dmc-j.j-own{background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.85),var(--dmc-own,#c8143c) 52%,var(--dmc-own,#c8143c))}
.dmc-j.j-violet{background:radial-gradient(circle at 30% 30%,#c8b0f7,#6a3fb5 55%,#43207f)}
.dmc-c[aria-checked="true"] .dmc-j{box-shadow:0 0 0 1.5px rgba(255,255,255,.75),0 2px 6px rgba(10,0,30,.45)}
.dmc-note{margin:8px 0 0;font-size:12px;line-height:1.45;color:var(--dmc-ink3)}
.dmc-note b{color:var(--dmc-ink2);font-weight:600}
/* her own colour: eight jewels, any colour, how deep */
.dmc-own{margin:10px 0 0;padding:10px 10px 8px;border-radius:14px;background:var(--dmc-wellbg);box-shadow:var(--dmc-well)}
.dmc-own[hidden]{display:none}
.dmc-sw8{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.dmc-s{position:relative;width:30px;height:30px;padding:0;border:0;border-radius:50%;cursor:pointer;background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.9) 0,rgba(255,255,255,0) 32%),radial-gradient(circle at 50% 60%,var(--c) 0,var(--c) 58%,rgba(0,0,0,.35) 100%);
  box-shadow:0 2px 0 rgba(30,10,60,.3),0 4px 8px rgba(30,10,60,.22),inset 0 -2px 3px rgba(0,0,0,.25);transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s}
.dmc-s:hover{transform:translateY(-2px) scale(1.06)}
.dmc-s[aria-checked="true"]{box-shadow:0 0 0 2.5px var(--dmc-hi),0 0 0 4.5px var(--dmc-acc),0 4px 10px rgba(30,10,60,.3)}
.dmc-any{position:relative;display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 10px 0 4px;border-radius:15px;border:1px dashed var(--dmc-hair);color:var(--dmc-ink2);font:600 12px/1 var(--sans,sans-serif);cursor:pointer;
  background:linear-gradient(180deg,var(--dmc-hi),var(--dmc-lo));box-shadow:var(--dmc-pop)}
.dmc-any i{width:22px;height:22px;border-radius:50%;background:conic-gradient(#e0245e,#f39c12,#f1d43a,#2ecc71,#1abc9c,#3498db,#8e44ad,#e0245e);box-shadow:inset 0 0 0 2px rgba(255,255,255,.6)}
.dmc-any input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;border:0;padding:0}
.dmc-any[aria-checked="true"]{border-style:solid;border-color:var(--dmc-acc)}
.dmc-depth{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:center;margin:10px 2px 0;font-size:12px;color:var(--dmc-ink3)}
.dmc-depth input[type=range]{width:100%;accent-color:var(--dmc-pa)}
.dmc-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.dmc-row span{font-size:12.5px;color:var(--dmc-ink2)}
.dmc-foot{display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;align-items:center;margin-top:10px;padding-top:10px;border-top:1px solid var(--dmc-hair)}
.skh .dmc.dmc-over .dmc-foot{position:sticky;bottom:-14px;margin:10px -18px -14px;padding:10px 18px 12px;background:linear-gradient(180deg,var(--dmc-lo),var(--dmc-lo));border-radius:0 0 20px 20px;z-index:2}
.dmc-k{min-height:32px;padding:6px 14px;border-radius:11px;border:1px solid var(--dmc-hair);background:linear-gradient(180deg,var(--dmc-hi),var(--dmc-lo));box-shadow:var(--dmc-pop);
  color:var(--dmc-ink2);font:600 12.5px/1.2 var(--sans,sans-serif);cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s}
.dmc-k:hover{transform:translateY(-2px);box-shadow:var(--dmc-pophi)}
.dmc-k.pri{color:#fff;background:linear-gradient(180deg,var(--dmc-pa),var(--dmc-pb));border-color:var(--dmc-pedge);text-shadow:0 1px 1px rgba(30,10,60,.32)}
/* in Settings: the panel sits flat inside its card (the card is the raised part) */
#dmcCard .dmc{margin-top:4px}
#dmcCard .dmc-top{display:none}
#dmcCard .dmc-sec:first-of-type{border-top:0;padding-top:2px}
@media (prefers-reduced-motion:reduce){.dmc,.dmc *{animation:none !important;transition:none !important}}
body[data-motion="minimal"] .dmc,body[data-motion="minimal"] .dmc *{animation:none !important;transition:none !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p314"]="started";}catch(_){}
/* R314 (7.29): the diamond's colours, chosen on Adamas's head and in Settings, kept with Ingenium's settings */
(function(){var D=document,W=window;
var LOOKS=[["auto","By the hour","j-auto"],["clear","Clear crystal","j-clear"],["lavender","Lavender","j-lavender"],["purple","Purple","j-purple"],["night","Night stone","j-night"],["own","Your own colour","j-own"]];
var JEWELS=[["Ruby","#c8143c"],["Rose","#e8649a"],["Amber","#e8962a"],["Citrine","#e7cc3e"],["Emerald","#1f9d63"],["Aqua","#2fb7c7"],["Sapphire","#2f5bd3"],["Amethyst","#8e4fe0"]];
var DEF={look:"auto",stone:"#c8143c",depth:0.6,band:null,light:true};
var SAY={auto:"From 5:00 the <b>clear crystal</b>, from 11:00 <b>lavender</b>, from 14:00 <b>purple</b>, from 18:00 the <b>night stone</b>. With the night theme on, it is always the night stone.",
  clear:"The clear crystal, white with a touch of steel blue, all day. With the night theme on, the night stone shows instead.",
  lavender:"Lavender, a light blue violet, all day. With the night theme on, the night stone shows instead.",
  purple:"The deeper day purple, all day. With the night theme on, the night stone shows instead.",
  night:"The night stone, deep violet, by day as by night.",
  own:"Your colour, lit as the clear crystal is by day and as the night stone is by night. Deep makes it a coloured gem; faint keeps it close to clear."};
function st(){try{return typeof state!=="undefined"&&state?state:null;}catch(e){return null;}}  /* as modules/r309.js reaches it */
function hex(h){var m=/^#?([0-9a-f]{6})$/i.exec(String(h||""));return m?"#"+m[1].toLowerCase():null;}
function rgb(h){h=hex(h);return h?[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]:null;}
function get(){var s=st(),d=s&&s.diamond&&typeof s.diamond==="object"?s.diamond:{},o={};
  o.look=LOOKS.some(function(l){return l[0]===d.look;})?d.look:DEF.look;o.stone=hex(d.stone)||DEF.stone;
  o.depth=typeof d.depth==="number"&&isFinite(d.depth)?Math.max(0.1,Math.min(1,d.depth)):DEF.depth;o.band=hex(d.band);o.light=d.light!==false;return o;}
function save(o){var s=st();if(!s)return;s.diamond={look:o.look,stone:o.stone,depth:Math.round(o.depth*100)/100,band:o.band||null,light:o.light!==false,at:Date.now()};
  try{if(typeof saveState==="function")saveState();}catch(e){}}
var LASTLOOK=null,LASTLIGHT=null;
function apply(){var d=get(),G=W.IngDiamond;if(!G)return;
  try{var v=d.look==="own"?"auto":d.look;if(v!==LASTLOOK){G.variant(v);LASTLOOK=v;}}catch(e){}
  try{if(G.tint)G.tint({stone:d.look==="own"?rgb(d.stone).concat([d.depth]):null,band:d.band?rgb(d.band):null});}catch(e){}
  try{if(d.light!==LASTLIGHT){if(LASTLIGHT!==null||!d.light)G.light(d.light);LASTLIGHT=d.light;}}catch(e){}}
function set(ch){var d=get();for(var k in ch)if(Object.prototype.hasOwnProperty.call(ch,k))d[k]=ch[k];save(d);apply();paintAll();
  try{if(W.IngSound&&ch.look)IngSound.play("paper");}catch(e){}}
function reset(){var s=st();if(s)delete s.diamond;try{if(typeof saveState==="function")saveState();}catch(e){}apply();paintAll();}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
var SEQ=0,PANELS=[];
/* one panel: its parts are painted from the settings whenever anything changes, so the head's and Settings' panels agree */
function panel(where){var id="dmc"+(++SEQ),p=mk("div","dmc");p.setAttribute("role","group");p.setAttribute("aria-label","The diamond's colours");p.setAttribute("data-where",where);
  var top=mk("div","dmc-top"),gem=mk("span","dmc-j j-auto"),tw=mk("div");tw.appendChild(mk("b",null,"The diamond's colours"));
  tw.appendChild(mk("small",null,"Each choice shows on the diamond at once, and is kept with your settings and your backups."));top.appendChild(gem);top.appendChild(tw);
  if(where==="head"){var x=mk("button","dmc-x","×");x.type="button";x.setAttribute("aria-label","Close the diamond's colours");x.addEventListener("click",function(){closeHead(true);});top.appendChild(x);}
  p.appendChild(top);
  /* the stone */
  var s1=mk("div","dmc-sec"),l1=mk("div","dmc-l","The stone");l1.id=id+"s";s1.appendChild(l1);var ch=mk("div","dmc-chips");ch.setAttribute("role","radiogroup");ch.setAttribute("aria-labelledby",l1.id);
  var lk={};LOOKS.forEach(function(L){var b=mk("button","dmc-c");b.type="button";b.setAttribute("role","radio");b.setAttribute("data-look",L[0]);var j=mk("span","dmc-j "+L[2]);b.appendChild(j);b.appendChild(D.createTextNode(L[1]));
    b.addEventListener("click",function(){set({look:L[0]});});ch.appendChild(b);lk[L[0]]=b;});
  s1.appendChild(ch);var note=mk("p","dmc-note");s1.appendChild(note);
  var own=mk("div","dmc-own");own.appendChild(swatches(id+"o",function(h){set({look:"own",stone:h});},"stone"));
  var dp=mk("label","dmc-depth");dp.appendChild(mk("span",null,"Faint"));var rg=mk("input");rg.type="range";rg.min="0.1";rg.max="1";rg.step="0.05";rg.setAttribute("aria-label","How deep your colour is, faint to deep");
  rg.addEventListener("input",function(){set({look:"own",depth:+rg.value});});dp.appendChild(rg);dp.appendChild(mk("span",null,"Deep"));own.appendChild(dp);s1.appendChild(own);p.appendChild(s1);
  /* the holder's band */
  var s2=mk("div","dmc-sec"),l2=mk("div","dmc-l","The holder's band");l2.id=id+"b";s2.appendChild(l2);var ch2=mk("div","dmc-chips");ch2.setAttribute("role","radiogroup");ch2.setAttribute("aria-labelledby",l2.id);
  var bv=mk("button","dmc-c");bv.type="button";bv.setAttribute("role","radio");bv.appendChild(mk("span","dmc-j j-violet"));bv.appendChild(D.createTextNode("Ingenium's violet"));bv.addEventListener("click",function(){set({band:null});});
  var bo=mk("button","dmc-c");bo.type="button";bo.setAttribute("role","radio");var boj=mk("span","dmc-j j-own");bo.appendChild(boj);bo.appendChild(D.createTextNode("Your own colour"));
  bo.addEventListener("click",function(){var d=get();set({band:d.band||d.stone||"#2f5bd3"});});ch2.appendChild(bv);ch2.appendChild(bo);s2.appendChild(ch2);
  var own2=mk("div","dmc-own");own2.appendChild(swatches(id+"p",function(h){set({band:h});},"band"));s2.appendChild(own2);p.appendChild(s2);
  /* the light */
  var s3=mk("div","dmc-sec"),row=mk("div","dmc-row");row.appendChild(mk("span",null,"The light that shoots through it now and then"));
  var sw=mk("label","eswitch"),cb=mk("input");cb.type="checkbox";cb.setAttribute("aria-label","The light that shoots through the diamond");sw.appendChild(cb);sw.appendChild(mk("span","etrack"));
  cb.addEventListener("change",function(){set({light:cb.checked});});row.appendChild(sw);s3.appendChild(row);p.appendChild(s3);
  /* the foot */
  var ft=mk("div","dmc-foot"),rs=mk("button","dmc-k","Back to Ingenium's own");rs.type="button";rs.addEventListener("click",reset);ft.appendChild(rs);
  if(where==="head"){var dn=mk("button","dmc-k pri","Done");dn.type="button";dn.addEventListener("click",function(){closeHead(true);});ft.appendChild(dn);}
  else{var sm=mk("button","dmc-k pri","Show me on Adamas");sm.type="button";sm.addEventListener("click",function(){showOnAdamas();});ft.appendChild(sm);}
  p.appendChild(ft);
  var P={el:p,paint:function(){var d=get();LOOKS.forEach(function(L){lk[L[0]].setAttribute("aria-checked",String(d.look===L[0]));});
    gem.className="dmc-j "+(LOOKS.filter(function(L){return L[0]===d.look;})[0]||LOOKS[0])[2];p.style.setProperty("--dmc-own",d.stone);
    note.innerHTML=SAY[d.look]||"";own.hidden=d.look!=="own";if(String(rg.value)!==String(d.depth))rg.value=String(d.depth);
    paintSw(own,d.look==="own"?d.stone:null);bv.setAttribute("aria-checked",String(!d.band));bo.setAttribute("aria-checked",String(!!d.band));boj.style.setProperty("--dmc-own",d.band||d.stone);
    own2.hidden=!d.band;paintSw(own2,d.band);cb.checked=d.light!==false;}};
  PANELS.push(P);P.paint();return P;}
function swatches(id,pick,what){var w=mk("div","dmc-sw8");w.setAttribute("role","radiogroup");w.setAttribute("aria-label",what==="band"?"The band's colour":"The stone's colour");
  JEWELS.forEach(function(J){var b=mk("button","dmc-s");b.type="button";b.setAttribute("role","radio");b.setAttribute("aria-label",J[0]);b.title=J[0];b.style.setProperty("--c",J[1]);b.setAttribute("data-hex",J[1]);
    b.addEventListener("click",function(){pick(J[1]);});w.appendChild(b);});
  var a=mk("label","dmc-any");a.setAttribute("role","radio");a.appendChild(mk("i"));a.appendChild(D.createTextNode("Any colour"));var inp=mk("input");inp.type="color";inp.setAttribute("aria-label","Any colour");
  inp.addEventListener("input",function(){pick(hex(inp.value)||"#c8143c");});a.appendChild(inp);w.appendChild(a);return w;}
function paintSw(box,h){var any=true;[].forEach.call(box.querySelectorAll(".dmc-s"),function(b){var on=!!h&&b.getAttribute("data-hex")===h;b.setAttribute("aria-checked",String(on));if(on)any=false;});
  var a=box.querySelector(".dmc-any");if(a){a.setAttribute("aria-checked",String(!!h&&any));var i=a.querySelector("input");if(h&&i&&i.value!==h)i.value=h;var dot=a.querySelector("i");if(dot)dot.style.background=h&&any?h:"";}}
function paintAll(){PANELS=PANELS.filter(function(P){return P.el.isConnected||P.keep;});PANELS.forEach(function(P){try{P.paint();}catch(e){}});
  try{if(W.IngSettingsRaised&&D.getElementById("dmcCard")&&D.getElementById("dmcCard").offsetParent)W.IngSettingsRaised.paint();}catch(e){}}

/* ---------- Adamas's head: the key and its panel ---------- */
var GEM='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 4h11l4 5.5L12 21 2.5 9.5z"/><path d="M2.5 9.5h19M9 4l-2.5 5.5L12 21l5.5-11.5L15 4"/></svg>';
var HP=null,KEY=null;
function head(){var p=D.getElementById("page-build");return p?p.querySelector(":scope > .skh"):null;}
function addKey(){var h=head();if(!h)return false;var keys=h.querySelector(".skh-keys");if(!keys)return false;if(keys.querySelector("#bdColours"))return true;
  var b=mk("button","skh-k");b.type="button";b.id="bdColours";b.innerHTML=GEM;b.appendChild(D.createTextNode("Diamond colours"));b.setAttribute("aria-expanded","false");b.setAttribute("aria-haspopup","true");
  b.title="Choose the diamond's colours: by the hour, one of its looks, or a colour of your own";b.addEventListener("click",function(e){e.preventDefault();if(HP)closeHead(true);else openHead();});keys.appendChild(b);KEY=b;return true;}
function narrow(h){try{return h.classList.contains("skh-narrow")||W.matchMedia("(max-width:760px)").matches||h.getBoundingClientRect().width<940;}catch(e){return false;}}
function openHead(){var h=head();if(!h)return null;if(!addKey())return null;if(HP)return HP;HP=panel("head");
  if(narrow(h)){HP.el.classList.add("dmc-flow");var k=h.querySelector(".skh-keys");k.parentNode.insertBefore(HP.el,k.nextSibling);}else{HP.el.classList.add("dmc-over");h.appendChild(HP.el);}
  h.classList.add("dmc-open");if(KEY)KEY.setAttribute("aria-expanded","true");
  HP.el.setAttribute("tabindex","-1");try{HP.el.focus({preventScroll:true});}catch(e){}
  return HP;}
function closeHead(back){if(!HP)return;var h=head();try{HP.el.remove();}catch(e){}HP=null;if(h)h.classList.remove("dmc-open");if(KEY){KEY.setAttribute("aria-expanded","false");if(back)try{KEY.focus({preventScroll:true});}catch(e){}}paintAll();}
D.addEventListener("keydown",function(e){if(e.key==="Escape"&&HP&&HP.el.contains(D.activeElement)){e.preventDefault();closeHead(true);}});
function showOnAdamas(){try{if(typeof W.go==="function")W.go("build");}catch(e){}
  setTimeout(function(){try{if(W.IngRooms)IngRooms.open("build","page");}catch(e){}var h=head();if(h){try{h.scrollIntoView({block:"start",behavior:"smooth"});}catch(e){}}openHead();},120);}

/* ---------- Settings, Everyday: "The diamond on Adamas" ---------- */
function card(){if(D.getElementById("dmcCard"))return D.getElementById("dmcCard");var pg=D.getElementById("page-settings");if(!pg)return null;
  var c=mk("section","card");c.id="dmcCard";c.setAttribute("aria-labelledby","dmcCardH");var h2=mk("h2","sec");h2.id="dmcCardH";var ic=mk("span","st-ic");ic.setAttribute("aria-hidden","true");ic.innerHTML=GEM;h2.appendChild(ic);h2.appendChild(D.createTextNode("The diamond on Adamas"));c.appendChild(h2);
  c.appendChild(mk("p","small muted","The diamond at the head of Adamas: its colour through the day, one look to keep, or a colour of your own; the holder's band; the light that passes through it. The same choices are on Adamas, under its Diamond colours key."));
  var P=panel("settings");P.keep=true;c.appendChild(P.el);
  var place=null;try{place=pg.querySelector("#rmP-settings-everyday");}catch(e){}
  if(place)place.appendChild(c);else pg.appendChild(c);return c;}

function boot(){try{card();}catch(e){}try{apply();}catch(e){}}
var og=W.go;if(typeof og==="function")W.go=function(p){var r=og.apply(this,arguments);try{if(p==="build")setTimeout(function(){addKey();apply();},30);else if(HP)closeHead(false);}catch(e){}return r;};
function watchHead(){var pg=D.getElementById("page-build");if(!pg||pg.__dmcW)return;pg.__dmcW=1;try{new MutationObserver(function(){if(head()&&!D.getElementById("bdColours")){addKey();apply();}}).observe(pg,{childList:true});}catch(e){}if(head())addKey();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(function(){boot();watchHead();},0);});else setTimeout(function(){boot();watchHead();},0);
/* the settings may arrive later (a backup brought in, Ingenium Cloud): painted and applied again when Settings or Adamas is opened */
D.addEventListener("visibilitychange",function(){if(!D.hidden){try{apply();paintAll();}catch(e){}}});
/* the line a tile in Settings shows for it (modules/r313.js) */
function says(){var d=get(),nm=function(h){var j=JEWELS.filter(function(J){return J[1]===h;})[0];return j?j[0]:"a colour of your own";};
  var a=d.look==="own"?"Your colour: "+nm(d.stone)+(d.depth>=0.75?", deep":d.depth<=0.35?", faint":""):(LOOKS.filter(function(L){return L[0]===d.look;})[0]||LOOKS[0])[1];
  return [a,"band: "+(d.band?nm(d.band):"Ingenium's violet"),"light "+(d.light?"on":"off")].join(" \u00b7 ");}
W.IngDiamondColours={says:says,get:get,set:set,reset:reset,open:openHead,close:function(){closeHead(false);},show:showOnAdamas,looks:function(){return LOOKS.map(function(l){return {key:l[0],name:l[1]};});},
  jewels:function(){return JEWELS.map(function(j){return {name:j[0],hex:j[1]};});},apply:apply,card:card};
})();
;try{window.__ingParts["p314"]="running";}catch(_){}
</script>
