(function(){var D=document,W=window;
/* 7.31 (her words, 17 November 2026): "I want the light blue pastel shade that I love from Carpe Diem's sticky notes to be among the
   diamond colour choices. The current aqua colour looks still too greenish. I want that other colour added. I like want them to look
   like true gemstones and have their light pastel colours, their medium colours and their dark, and night mode dressing that is a
   variation of the current dark deep purple colour of that the current crystal has for Night mode. I want for every colour shade to come
   with their 4 variations so that the diamond has a proper night mode look to match and accompany it if I choose to change the colour
   from purple to another colour. I want you to give the diamond, the same treatment as the sticky notes in that regard." And: "I also
   want the northern lights to change colours to better complement the new diamond colours when they are selected on the page, instead
   of only using the purple hues for every shade."
   Carpe Diem's sticky notes (its STICKY_COLORS and its night papers): six named papers, each with a day colour and a deeper one of its own
   for the night, "so a note returns to its day colour the moment the light does"; the light blue is Inkwell, sky blue by day
   (#dcefff to #b6e0ff) and midnight blue by night.
   So the stone is chosen as a family and a shade. Each family is Ingenium's purple stone dressed in its colour (modules/r292.js, family()):
   its pastel is the lavender look, its medium the day purple, its deep the night stone by day, and its night the night stone of the night
   theme, each gathered to the family's hue; the night theme shows the family's night shade by itself, as a sticky note changes paper;
   the northern lights behind the stone take the family's hue. Ingenium's purple is drawn exactly as before.
   And (her words, the same day): "I also want the option to keep the clear crystal and have its own Night mode look. It should have the
   full colour spectrum for the Northern lights since that makes the most sense." So the Clear crystal family keeps the clear crystal (its
   Pastel, and By the hour's morning) and has a night of its own: by night a black diamond, colourless with its fire kept (her words: "No
   I prefer the stone as a black diamond on Night mode, it is the best look for it and its natural opposite"), under northern lights of
   every colour (r292 family() cn and "spectrum"); it was the night stone, purple, in 7.29 and 7.30. */
var FAMS=[["purple","Ingenium's purple"],["sky","Sky blue"],["sapphire","Sapphire"],["aqua","Aqua"],["emerald","Emerald"],["citrine","Citrine"],
  ["amber","Amber"],["rose","Rose"],["ruby","Ruby"],["clear","Clear crystal"],["own","Your own colour"]];
var SHADES=[["auto","By the hour"],["pastel","Pastel"],["medium","Medium"],["deep","Deep"]];
var VAR_OF={auto:"auto",pastel:"lavender",medium:"purple",deep:"night"},SIX={pastel:0,medium:1,deep:2};
/* each family's four shades (pastel, medium, deep, night): the hue each facet is gathered to, how much of its own play of colour it
   keeps, its chroma, and a brightness curve; tuned on the renderer's own frames (17 November 2026) */
var PAL={sky:[["#7cc4ff",.25,1.7,.6],["#4aa0f0",.25,1.7,.78],["#2f6fd0",.25,1.6,1.15],["#3f86e0",.25,1.5,1]],
  sapphire:[["#5a7ce8",.25,1.5,.8],["#2f5bd3",.25,1.7,1],["#2f5bd3",.25,1.7,1.2],["#2f5bd3",.25,1.5,1]],
  aqua:[["#40c8d8",.25,1.4,.65],["#2fb7c7",.25,1.6,.8],["#1f8fa0",.25,1.6,1.1],["#2fa8b8",.25,1.4,1]],
  emerald:[["#40c080",.25,1.4,.72],["#1f9d63",.25,1.8,.9],["#1f9d63",.25,1.8,1.15],["#1f9d63",.25,1.5,1]],
  citrine:[["#f0d860",.25,1.5,.45],["#e7c030",.25,2,.55],["#d89a20",.25,1.9,.8],["#d8b030",.25,1.5,1]],
  amber:[["#f0b060",.25,1.5,.55],["#e8902a",.25,2,.68],["#c86818",.25,1.9,.95],["#d88030",.25,1.5,1]],
  rose:[["#f08ab8",.25,1.5,.65],["#e8649a",.25,1.7,.82],["#c83c7c",.25,1.7,1.05],["#e0609a",.25,1.5,1]],
  ruby:[["#f06080",.25,1.5,.75],["#d81040",.25,2,.92],["#b0102e",.25,2,1.15],["#d01848",.25,1.6,1]],
  clear:[null,["#8cc8ff",.25,.1,.8],["#8cc8ff",.25,.1,1.1],null]};   /* the clear crystal's night is its own (r292 cn), not a colour */
/* the purple stone's own mean colour in its four looks (measured on the renderer's frames), and the northern lights' own hue */
var SRC=__SRC__,AURH=1.9,CLEARN_G=1.15;
/* the night looks (her words, 17 November 2026: "I like the silver diamond look on dark mode too from your previous clear Night mode look,
   please also add it as an option for Night mode look for the diamond"): the family's own night, or, whatever the stone by day, the
   black diamond or the silver diamond (the clear crystal's night lifted, as she saw it on its first picture), under northern lights in
   every colour */
var NIGHTS=[["own","Its own"],["black","Black diamond"],["silver","Silver diamond"]],NIGHT_G={black:CLEARN_G,silver:.72};
/* Carpe Diem and Inkwell are named only in the master edition (the others carry neither app: rig/t_627_editions.js) */
var MASTER=(function(){try{return typeof ING_EDITION==="undefined"||ING_EDITION==="master";}catch(e){return true;}})();
var SAYF={purple:"Ingenium's own: <b>lavender</b>, the day <b>purple</b> and the <b>night stone</b>, as it has always been.",
  sky:(MASTER?"The light <b>sky blue</b> of Carpe Diem's Inkwell sticky note":"A light <b>sky blue</b>")+", then a clear blue and a deep one; by night, <b>midnight blue</b>.",
  sapphire:"A soft cornflower, then <b>royal blue</b> and a deeper one; by night, <b>navy</b>.",
  aqua:"Aquamarine's <b>sea blue green</b>, light to deep; by night, <b>deep teal</b>.",
  emerald:"A pale green, then <b>emerald</b> and a deep one; by night, <b>forest green</b>.",
  citrine:"A pale champagne, then <b>golden yellow</b> and honey gold; by night, <b>olive bronze</b>.",
  amber:"A light honey, then <b>amber</b> and cognac; by night, <b>dark cognac</b>.",
  rose:"A pale pink, then <b>rose</b> and a deep raspberry; by night, <b>plum rose</b>.",
  ruby:"A light coral red, then <b>ruby</b> and garnet; by night, <b>dark garnet</b>.",
  clear:"The <b>clear crystal</b>, then silver smoke and graphite; by night, a <b>black diamond</b>, its fire kept, under northern lights in <b>every colour</b>.",
  own:"Any colour you pick, in the same four shades, with a night shade of its own."};
var JOLD={"#c8143c":"ruby","#e8649a":"rose","#e8962a":"amber","#e7cc3e":"citrine","#1f9d63":"emerald","#2fb7c7":"aqua","#2f5bd3":"sapphire"};
var OLD={auto:["purple","auto"],clear:["clear","pastel"],lavender:["purple","pastel"],purple:["purple","medium"],night:["purple","deep"]};
/* the band's colours (the holder's enamel), as in 7.29 */
var JEWELS=[["Ruby","#c8143c"],["Rose","#e8649a"],["Amber","#e8962a"],["Citrine","#e7cc3e"],["Emerald","#1f9d63"],["Aqua","#2fb7c7"],["Sapphire","#2f5bd3"],["Amethyst","#8e4fe0"]];
var DEF={fam:"purple",shade:"auto",own:"#7cc4ff",night:"own",band:null,light:true};
function st(){try{return typeof state!=="undefined"&&state?state:null;}catch(e){return null;}}  /* as modules/r309.js reaches it */
function hex(h){var m=/^#?([0-9a-f]{6})$/i.exec(String(h||""));return m?"#"+m[1].toLowerCase():null;}
function rgb(h){h=hex(h);return h?[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]:null;}
function isFam(k){return FAMS.some(function(F){return F[0]===k;});}
function isShade(k){return SHADES.some(function(S){return S[0]===k;});}
function get(){var s=st(),d=s&&s.diamond&&typeof s.diamond==="object"?s.diamond:{},o={fam:null,shade:null,own:null};
  if(isFam(d.fam)){o.fam=d.fam;o.shade=isShade(d.shade)?d.shade:DEF.shade;o.own=hex(d.own);}
  else if(d.look){/* as 7.29 and 7.30 kept it: a look, or a colour of her own */
    if(OLD[d.look]){o.fam=OLD[d.look][0];o.shade=OLD[d.look][1];}
    else if(d.look==="own"){var j=JOLD[hex(d.stone)];o.fam=j||"own";o.shade="auto";if(!j)o.own=hex(d.stone);}}
  o.fam=o.fam||DEF.fam;o.shade=o.shade||DEF.shade;o.own=o.own||DEF.own;o.night=NIGHTS.some(function(x){return x[0]===d.night;})?d.night:DEF.night;
  o.band=hex(d.band);o.light=d.light!==false;return o;}
function save(o){var s=st();if(!s)return;s.diamond={v:2,fam:o.fam,shade:o.shade,own:o.own,night:o.night,band:o.band||null,light:o.light!==false,at:Date.now()};
  try{if(typeof saveState==="function")saveState();}catch(e){}}
/* ---------- the colour of a family's shade: the same sums as r292's fam() and gat(), in the display's colours ---------- */
function yq(c){return [.299*c[0]+.587*c[1]+.114*c[2],.596*c[0]-.274*c[1]-.322*c[2],.211*c[0]-.523*c[1]+.312*c[2]];}
function yqh(h){return yq(rgb(h).map(function(v){return v/255;}));}
function hueOf(h){var q=yqh(h);return Math.atan2(q[2],q[1]);}
/* a colour of her own: its four shades made as the families' are, from its own hue, chroma and brightness */
function ownPal(h){var q=yqh(h),C=Math.sqrt(q[1]*q[1]+q[2]*q[2]),f=Math.max(.1,Math.min(1.2,C/.3)),yM=Math.max(.16,Math.min(.5,.55*q[0]+.07)),yP=yM+(.75-yM)*.45,yD=yM*.72;
  function g(t,i){return Math.log(t)/Math.log(yqh(SRC[i])[0]);}
  return [[h,.25,1.5*f,g(yP,0)],[h,.25,1.8*f,g(yM,1)],[h,.25,1.7*f,g(yD,2)],[h,.25,1.5*f,1]];}
function palOf(fam,own){return fam==="own"?ownPal(own):(PAL[fam]||null);}
function medOf(fam,own){return fam==="purple"?"#7a4bd6":fam==="clear"?"#b8c4d6":fam==="own"?own:PAL[fam][1][0];}
function nightOf(fam,night){return night==="black"&&fam!=="clear"||night==="silver"?{s:{h:[0,0,1,1],g:NIGHT_G[night]},cn:true,aur:"spectrum"}:null;}
function famObj(fam,own,night){var n=nightOf(fam,night);
  if(fam==="purple")return n?{s:[null,null,null,null],cp:false,aur:null,n:n}:null;var t=palOf(fam,own);if(!t)return null;
  var s=t.map(function(x,i){return x?{h:[hueOf(SRC[i]),hueOf(x[0]),x[1],x[2]],g:x[3]}:null;});
  /* the clear crystal's night: a black diamond (her words: "No I prefer the stone as a black diamond on Night mode, it is the best look for it
     and its natural opposite"): colourless, its fire kept as it is (no hue gathered), its body deepened a little */
  if(fam==="clear")s[3]={h:[0,0,1,1],g:CLEARN_G};
  var q=yqh(fam==="clear"?"#8cc8ff":medOf(fam,own)),C=Math.sqrt(q[1]*q[1]+q[2]*q[2]),m=rgb(medOf(fam,own));
  return {s:s,cp:fam==="clear",cn:fam==="clear",aur:fam==="clear"?"spectrum":[AURH,Math.atan2(q[2],q[1]),.4,Math.max(.3,Math.min(1,C/.3))],
    halo:[Math.round(m[0]*.8)+","+Math.round(m[1]*.8)+","+Math.round(m[2]*.8),m.join(",")],n:n};}
var LASTLOOK=null,LASTLIGHT=null,LASTFAM=null;
function apply(){var d=get(),G=W.IngDiamond;if(!G)return;
  try{var v=VAR_OF[d.shade];if(v!==LASTLOOK){G.variant(v);LASTLOOK=v;}}catch(e){}
  try{if(G.tint)G.tint({stone:null,band:d.band?rgb(d.band):null});}catch(e){}
  try{var fk=d.fam+"|"+(d.fam==="own"?d.own:"")+"|"+d.night;if(G.family&&fk!==LASTFAM){G.family(famObj(d.fam,d.own,d.night));LASTFAM=fk;}}catch(e){}
  try{if(d.light!==LASTLIGHT){if(LASTLIGHT!==null||!d.light)G.light(d.light);LASTLIGHT=d.light;}}catch(e){}}
function set(ch){var d=get();for(var k in ch)if(Object.prototype.hasOwnProperty.call(ch,k))d[k]=ch[k];save(d);apply();paintAll();
  try{if(W.IngSound&&(ch.fam||ch.shade||ch.night))IngSound.play("paper");}catch(e){}}
function reset(){var s=st();if(s)delete s.diamond;try{if(typeof saveState==="function")saveState();}catch(e){}apply();paintAll();}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}

/* the real stones and holders (strips of 24 frames of the WebGL diamond: Ingenium's purple stone in its five looks; one picture of the
   holder per band), filled in by the build */
var SPR=__SPR__;
/* ---------- a family's shade, drawn: the purple stone's frames gathered to the family's colour, pixel by pixel, as the renderer does ---------- */
var SKEY=["lavender","purple","night","nightT"],SRCIMG={},REC={},RECN=[],PAINTQ=0;
function paintSoon(){if(PAINTQ)return;PAINTQ=setTimeout(function(){PAINTQ=0;paintAll(true);},30);}
function srcImg(k){var im=SRCIMG[k];if(!im){im=SRCIMG[k]=new Image();im.addEventListener("load",paintSoon,{once:true});im.src=SPR.img["stone_"+k];}
  return im.complete&&im.naturalWidth?im:null;}
function c255(v){v=Math.round(v*255);return v<0?0:v>255?255:v;}
/* the silver diamond: the black diamond's frames, lifted (the same curve as the renderer's, on the curve the black one already has) */
function nightSrc(fam,own,night){if(night==="black"||(night==="own"&&fam==="clear"))return SPR.img.stone_clearN;
  if(night==="silver"){var key="silver";if(REC[key])return REC[key];var im=srcImg("clearN");if(!im)return SPR.img.stone_clearN;
    try{var c=D.createElement("canvas");c.width=im.naturalWidth;c.height=im.naturalHeight;var g=c.getContext("2d");g.drawImage(im,0,0);var id=g.getImageData(0,0,c.width,c.height),p=id.data,gm=NIGHT_G.silver/NIGHT_G.black;
      for(var j=0;j<p.length;j+=4){if(!p[j+3])continue;var r=p[j]/255,gg=p[j+1]/255,b=p[j+2]/255,Y=.299*r+.587*gg+.114*b,dY=Math.pow(Y>0?Y:0,gm)-Y;p[j]=c255(r+dY);p[j+1]=c255(gg+dY);p[j+2]=c255(b+dY);}
      g.putImageData(id,0,0);REC[key]=c.toDataURL("image/png");return REC[key];}catch(e){return SPR.img.stone_clearN;}}
  return shadeSrc(fam,own,3);}
function shadeSrc(fam,own,i){if(fam==="purple")return SPR.img["stone_"+SKEY[i]];if(fam==="clear"&&i===0)return SPR.img.stone_clear;if(fam==="clear"&&i===3)return SPR.img.stone_clearN;
  var t=palOf(fam,own),x=t&&t[i];if(!x)return SPR.img["stone_"+SKEY[i]];var key=fam+"|"+(fam==="own"?own:"")+"|"+i;if(REC[key])return REC[key];
  var im=srcImg(SKEY[i]);if(!im)return SPR.img["stone_"+SKEY[i]];
  try{var c=D.createElement("canvas");c.width=im.naturalWidth;c.height=im.naturalHeight;var g=c.getContext("2d");g.drawImage(im,0,0);var id=g.getImageData(0,0,c.width,c.height),p=id.data;
    var hs=hueOf(SRC[i]),hf=hueOf(x[0]),k=x[1],sc=x[2],gm=x[3],TAU=Math.PI*2;
    for(var j=0;j<p.length;j+=4){if(!p[j+3])continue;var r=p[j]/255,gg=p[j+1]/255,b=p[j+2]/255;
      var Y=.299*r+.587*gg+.114*b,I=.596*r-.274*gg-.322*b,Q=.211*r-.523*gg+.312*b,C=Math.sqrt(I*I+Q*Q),a=C>1e-5?Math.atan2(Q,I):hs,dd=a-hs;
      dd-=TAU*Math.floor((dd+Math.PI)/TAU);var na=hf+dd*k;C*=sc;I=C*Math.cos(na);Q=C*Math.sin(na);Y=Math.pow(Y>0?Y:0,gm);
      p[j]=c255(Y+.956171*I+.621433*Q);p[j+1]=c255(Y-.272689*I-.646813*Q);p[j+2]=c255(Y-1.103744*I+1.700623*Q);}
    g.putImageData(id,0,0);REC[key]=c.toDataURL("image/png");RECN.push(key);if(RECN.length>48)delete REC[RECN.shift()];return REC[key];}catch(e){return SPR.img["stone_"+SKEY[i]];}}
/* the stone a family shows at a shade (By the hour: its medium, turning through its four in the strip's own cycle) */
function famSrc(fam,own,shade){return shadeSrc(fam,own,shade==="auto"?1:SIX[shade]);}
function hourList(fam,own){return [function(){return SPR.img.stone_clear;}].concat([0,1,2].map(function(i){return function(){return shadeSrc(fam,own,i);};}));}
function strip(src,i){return '<span class="dmc-st" style="--i:'+(i||0)+'"><img alt="" draggable="false" src="'+src+'"></span>';}
var JFAM={ruby:"ruby",rose:"rose",amber:"amber",citrine:"citrine",emerald:"emerald",aqua:"aqua",sapphire:"sapphire",amethyst:"purple"};
function stone(key,i){var src=SPR.img["stone_"+key];if(!src){var h=hex(key);src=JFAM[key]?shadeSrc(JFAM[key],null,1):h?shadeSrc("own",h,1):SPR.img.stone_clear;}return strip(src,i);}
var JNAME={};JEWELS.forEach(function(J){JNAME[J[1]]=J[0].toLowerCase();});
function nearJ(h){var c=rgb(h),best=null,bd=1e9;JEWELS.forEach(function(J){var d=rgb(J[1]),e=(c[0]-d[0])*(c[0]-d[0])+(c[1]-d[1])*(c[1]-d[1])+(c[2]-d[2])*(c[2]-d[2]);if(e<bd){bd=e;best=J[0].toLowerCase();}});return best;}
function holderImg(band,i){var n=!band?"violet":(JNAME[band]||nearJ(band));return '<span class="dmc-hd" style="--i:'+(i||0)+'"><img alt="" draggable="false" src="'+SPR.img["band_"+n]+'"></span>';}
/* By the hour and Any colour change stone at the end of each turn */
function cycler(el,list){var img=el.querySelector(".dmc-st img");if(!img||img.__cyc)return;img.__cyc=1;var k=0;img.addEventListener("animationiteration",function(){k=(k+1)%list.length;var s=list[k]();if(s)img.src=s;});}
var ANY=["ruby","amber","citrine","emerald","sky","sapphire","rose"].map(function(f){return function(){return shadeSrc(f,null,1);};});
function gemFor(d){var g=strip(famSrc(d.fam,d.own,d.shade),0);return g;}
/* the corner key: a cut diamond in line, as the door's keys are drawn */
var KEYGEM='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4.7 3.2h6.6l3.1 3.3L8 13.6 1.6 6.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M1.6 6.5h12.8M6.2 6.5 8 13.6l1.8-7.1" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" opacity=".8"/></svg>';
function famName(f){var F=FAMS.filter(function(x){return x[0]===f;})[0];return F?F[1]:"";}
function shadeName(s){var S=SHADES.filter(function(x){return x[0]===s;})[0];return S?S[1]:"";}
function sayOf(d){var f=famName(d.fam),fl=d.fam==="own"?"your colour":d.fam==="clear"?"the clear crystal":f.toLowerCase().replace("ingenium's","Ingenium's");
  var hour=d.fam==="purple"?"From 5:00 the <b>clear crystal</b>, from 11:00 <b>lavender</b>, from 14:00 <b>purple</b>, from 18:00 the <b>night stone</b>. With the night theme on, it is always the night stone."
    :"From 5:00 the <b>clear crystal</b>, from 11:00 "+fl+"'s <b>pastel</b>, from 14:00 its <b>medium</b>, from 18:00 its <b>deep</b> shade. With the night theme on, its <b>night</b> shade.";
  var one=d.fam==="purple"?{pastel:"<b>Lavender</b> all day.",medium:"The day <b>purple</b> all day.",deep:"The <b>night stone</b> by day, all day."}[d.shade]
    :"Its <b>"+shadeName(d.shade).toLowerCase()+"</b> shade all day.";
  var nt=d.night==="silver"?" At night, whatever the hour, the <b>silver diamond</b>, under northern lights in every colour.":d.night==="black"&&d.fam!=="clear"?" At night, whatever the hour, the <b>black diamond</b>, under northern lights in every colour.":"";
  return (SAYF[d.fam]||"")+" "+(d.shade==="auto"?hour:one+" With the night theme on, its night shade shows instead"+(MASTER?", as a sticky note in Carpe Diem turns to its night paper.":"."))+nt;}

var SEQ=0,PANELS=[];
/* one panel: painted from the settings whenever anything changes, so the head's and Settings' panels agree */
function panel(where){var id="dmc"+(++SEQ),p=mk("div","dmc");p.setAttribute("role","group");p.setAttribute("aria-label","The diamond's colours");p.setAttribute("data-where",where);
  var top=mk("div","dmc-top"),setg=mk("button","dmc-setting"),tw=mk("div");setg.type="button";setg.setAttribute("aria-label","The little diamond, to press for fun");toy(setg);tw.appendChild(mk("b",null,"The diamond's colours"));
  tw.appendChild(mk("small",null,"Each choice shows on the diamond at once, and is kept with your settings and your backups."));top.appendChild(setg);top.appendChild(tw);
  if(where==="head"){var x=mk("button","dmc-x","×");x.type="button";x.setAttribute("aria-label","Close the diamond's colours");x.addEventListener("click",function(){closeHead(true);});top.appendChild(x);}
  p.appendChild(top);var sc=mk("div","dmc-scroll");p.appendChild(sc);
  /* the stone: its colour, a family of gemstones */
  var s1=mk("div","dmc-sec"),l1=mk("div","dmc-l","The stone");l1.id=id+"s";s1.appendChild(l1);var ch=mk("div","dmc-chips dmc-fams");ch.setAttribute("role","radiogroup");ch.setAttribute("aria-labelledby",l1.id);
  var fk={};FAMS.forEach(function(F,ix){var b=mk("button","dmc-c");b.type="button";b.setAttribute("role","radio");b.setAttribute("data-fam",F[0]);b.setAttribute("aria-label",F[1]);b.style.setProperty("--i",String(ix));
    var gw=mk("span","dmc-g"),g=mk("span");g.style.display="contents";gw.appendChild(g);b.appendChild(gw);b.appendChild(mk("span","dmc-n",F[1]));
    b.addEventListener("click",function(){set({fam:F[0]});toShades();});ch.appendChild(b);fk[F[0]]={b:b,g:g};});
  ch.classList.add("dmc-shelf");s1.appendChild(ch);
  /* her own colour: any colour, picked */
  var own=mk("div","dmc-own dmc-pick"),pa=mk("label","dmc-any");pa.title="Pick any colour";var pin=mk("input");pin.type="color";pin.setAttribute("aria-label","Pick any colour for the stone");
  pin.addEventListener("input",function(){set({fam:"own",own:hex(pin.value)||DEF.own});});var pw=mk("span");pw.style.display="contents";pa.appendChild(pw);pa.appendChild(pin);
  var pt=mk("div","dmc-pickt");pt.appendChild(mk("b",null,"Your colour"));var pts=mk("small");pt.appendChild(pts);own.appendChild(pa);own.appendChild(pt);s1.appendChild(own);sc.appendChild(s1);
  /* the shade: four, and the night's own */
  var s4=mk("div","dmc-sec"),l4=mk("div","dmc-l","The shade");l4.id=id+"h";s4.appendChild(l4);var ch4=mk("div","dmc-chips dmc-shades");ch4.setAttribute("role","radiogroup");ch4.setAttribute("aria-labelledby",l4.id);
  var sk={};SHADES.forEach(function(S,ix){var b=mk("button","dmc-c");b.type="button";b.setAttribute("role","radio");b.setAttribute("data-shade",S[0]);b.setAttribute("aria-label",S[1]);b.style.setProperty("--i",String(ix+2));
    var gw=mk("span","dmc-g"),g=mk("span");g.style.display="contents";gw.appendChild(g);b.appendChild(gw);b.appendChild(mk("span","dmc-n",S[1]));
    b.addEventListener("click",function(){set({shade:S[0]});});ch4.appendChild(b);sk[S[0]]={b:b,g:g};});
  ch4.classList.add("dmc-shelf");s4.appendChild(ch4);
  /* at night: its own, the black diamond or the silver diamond, each in a dark well (the night theme shows it by itself) */
  var l5=mk("div","dmc-l dmc-l2","At night");l5.id=id+"n";s4.appendChild(l5);var ch5=mk("div","dmc-chips dmc-nights");ch5.setAttribute("role","radiogroup");ch5.setAttribute("aria-labelledby",l5.id);
  var nk={};NIGHTS.forEach(function(Nn,ix){var b=mk("button","dmc-c dmc-night");b.type="button";b.setAttribute("role","radio");b.setAttribute("data-night",Nn[0]);b.setAttribute("aria-label","At night: "+Nn[1]);b.style.setProperty("--i",String(ix+7));
    var gw=mk("span","dmc-g"),g=mk("span");g.style.display="contents";gw.appendChild(g);b.appendChild(gw);var nn=mk("span","dmc-n",Nn[1]);b.appendChild(nn);
    b.addEventListener("click",function(){set({night:Nn[0]});});ch5.appendChild(b);nk[Nn[0]]={b:b,g:g,n:nn};});
  ch5.classList.add("dmc-shelf");s4.appendChild(ch5);var note=mk("p","dmc-note");s4.appendChild(note);sc.appendChild(s4);
  /* beside the diamond: a family chosen, the panel glides down until its shades are in view */
  function toShades(){if(where!=="head")return;setTimeout(function(){try{var d=ch4.getBoundingClientRect().bottom-sc.getBoundingClientRect().bottom+30;
    if(d>0)sc.scrollBy({top:d,behavior:stillNow()?"auto":"smooth"});}catch(e){}},60);}
  /* the holder's band */
  var s2=mk("div","dmc-sec"),l2=mk("div","dmc-l","The holder's band");l2.id=id+"b";s2.appendChild(l2);var ch2=mk("div","dmc-chips two");ch2.setAttribute("role","radiogroup");ch2.setAttribute("aria-labelledby",l2.id);
  var bv=mk("button","dmc-c");bv.type="button";bv.setAttribute("role","radio");bv.setAttribute("aria-label","Ingenium's violet");bv.style.setProperty("--i","1");bv.innerHTML='<span class="dmc-g">'+holderImg(null,1)+"</span>";bv.appendChild(mk("span","dmc-n","Ingenium's violet"));bv.addEventListener("click",function(){set({band:null});});
  var bo=mk("button","dmc-c");bo.type="button";bo.setAttribute("role","radio");bo.setAttribute("aria-label","Your own colour, for the band");bo.style.setProperty("--i","3");var bgw=mk("span","dmc-g"),bog=mk("span");bog.style.display="contents";bgw.appendChild(bog);bo.appendChild(bgw);bo.appendChild(mk("span","dmc-n","Your own colour"));
  bo.addEventListener("click",function(){var d=get();set({band:d.band||"#2f5bd3"});});ch2.appendChild(bv);ch2.appendChild(bo);s2.appendChild(ch2);
  var own2=mk("div","dmc-own"),sw2=swatches(id+"p",function(h){set({band:h});},"band"),swn2=mk("p","dmc-swn");own2.appendChild(sw2);own2.appendChild(swn2);s2.appendChild(own2);sc.appendChild(s2);
  /* the light */
  var s3=mk("div","dmc-sec"),l3=mk("div","dmc-l","The light");s3.appendChild(l3);var row=mk("div","dmc-row");row.appendChild(mk("span",null,"The light that shoots through it now and then"));
  var sw=mk("button","dmc-sw");sw.type="button";sw.setAttribute("role","switch");sw.setAttribute("aria-label","The light that shoots through the diamond");sw.appendChild(mk("i"));
  sw.addEventListener("click",function(){set({light:sw.getAttribute("aria-checked")!=="true"});});row.appendChild(sw);s3.appendChild(row);sc.appendChild(s3);
  /* the foot */
  var ft=mk("div","dmc-foot"),rs=mk("button","dmc-k","Back to Ingenium's own");rs.type="button";rs.addEventListener("click",reset);ft.appendChild(rs);
  if(where==="head"){var dn=mk("button","dmc-k pri","Done");dn.type="button";dn.addEventListener("click",function(){closeHead(true);});ft.appendChild(dn);}
  else{var sm=mk("button","dmc-k pri","Show me on Adamas");sm.type="button";sm.addEventListener("click",function(){showOnAdamas();});ft.appendChild(sm);}
  p.appendChild(ft);
  var P={el:p,paint:function(force){var d=get(),key=JSON.stringify(d);
    FAMS.forEach(function(F){fk[F[0]].b.setAttribute("aria-checked",String(d.fam===F[0]));});
    /* the clear crystal's own night is the black diamond: there its own is not offered twice */
    NIGHTS.forEach(function(Nn){var on=d.night===Nn[0]||(d.fam==="clear"&&d.night==="own"&&Nn[0]==="black");nk[Nn[0]].b.setAttribute("aria-checked",String(on));});nk.own.b.hidden=d.fam==="clear";SHADES.forEach(function(S){sk[S[0]].b.setAttribute("aria-checked",String(d.shade===S[0]));});
    if(P.last!==key||force){P.last=key;setg.innerHTML=gemFor(d);if(d.shade==="auto")cycler(setg,hourList(d.fam,d.own));
      FAMS.forEach(function(F){var g=fk[F[0]].g;if(F[0]==="own"&&d.fam!=="own"){g.innerHTML=strip(shadeSrc("ruby",null,1),10);cycler(g,ANY);}
        else g.innerHTML=strip(famSrc(F[0],d.own,F[0]==="clear"&&d.shade==="auto"?"pastel":d.shade),F[0]==="own"?10:FAMS.indexOf(F));});
      SHADES.forEach(function(S,ix){var g=sk[S[0]].g;g.innerHTML=strip(famSrc(d.fam,d.own,S[0]==="auto"?"auto":S[0]),ix+2);if(S[0]==="auto")cycler(g,hourList(d.fam,d.own));});
      NIGHTS.forEach(function(Nn,ix){nk[Nn[0]].g.innerHTML=strip(nightSrc(d.fam,d.own,Nn[0]),ix+7);});
      pw.innerHTML=strip(shadeSrc("own",d.own,1),11);bog.innerHTML=holderImg(d.band,3);}
    note.innerHTML=sayOf(d);own.hidden=d.fam!=="own";if(pin.value!==d.own)pin.value=d.own;pts.textContent=d.own.toUpperCase()+": press the stone to pick another";
    pa.setAttribute("aria-checked","true");
    bv.setAttribute("aria-checked",String(!d.band));bo.setAttribute("aria-checked",String(!!d.band));
    own2.hidden=!d.band;paintSw(own2,d.band,swn2,"Your band");sw.setAttribute("aria-checked",String(d.light!==false));}};
  PANELS.push(P);P.paint();return P;}
/* the little diamond at the top: a toy (see the style above) */
function stillNow(){try{return W.matchMedia("(prefers-reduced-motion: reduce)").matches||D.body.getAttribute("data-motion")==="minimal";}catch(e){return false;}}
function burst(el){var b=mk("span","dmc-burst");for(var i=0;i<8;i++){var s=mk("i"),a=(i/8)*Math.PI*2+Math.random()*.45,r=24+Math.random()*16;
    s.style.setProperty("--dx",(Math.cos(a)*r).toFixed(1)+"px");s.style.setProperty("--dy",(Math.sin(a)*r*.75).toFixed(1)+"px");s.style.animationDelay=(i*0.018).toFixed(3)+"s";b.appendChild(s);}
  el.appendChild(b);setTimeout(function(){try{b.remove();}catch(e){}},1000);}
function toy(el){function down(){el.classList.add("dmc-down");try{if(W.IngSound&&IngSound.play)IngSound.play("paper");}catch(x){}}
  function up(){if(!el.classList.contains("dmc-down"))return;el.classList.remove("dmc-down");if(stillNow())return;el.classList.add("dmc-whirl");burst(el);
    clearTimeout(el.__w);el.__w=setTimeout(function(){el.classList.remove("dmc-whirl");},1100);}
  el.addEventListener("pointerdown",function(e){if(e.button>0)return;down();});el.addEventListener("pointerup",up);
  el.addEventListener("pointerleave",function(){el.classList.remove("dmc-down");});el.addEventListener("pointercancel",function(){el.classList.remove("dmc-down");});
  el.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();if(e.repeat)return;down();setTimeout(up,110);}});
  el.addEventListener("click",function(e){e.preventDefault();});}
function nameOf(h){var j=JEWELS.filter(function(J){return J[1]===h;})[0];return j?j[0]:"a colour of your own ("+h+")";}
function swatches(id,pick,what){var w=mk("div","dmc-sw8");w.setAttribute("role","radiogroup");w.setAttribute("aria-label",what==="band"?"The band's colour":"The stone's colour");
  JEWELS.forEach(function(J,ix){var b=mk("button","dmc-s");b.type="button";b.setAttribute("role","radio");b.setAttribute("aria-label",J[0]);b.title=J[0];b.setAttribute("data-hex",J[1]);b.style.setProperty("--i",String(ix));b.innerHTML=stone(J[0].toLowerCase(),ix);
    b.addEventListener("click",function(){pick(J[1]);});w.appendChild(b);});
  var a=mk("label","dmc-any");a.setAttribute("role","radio");a.title="Any colour";a.style.setProperty("--i","8");a.innerHTML=stone("ruby",8);cycler(a,ANY);var inp=mk("input");inp.type="color";inp.setAttribute("aria-label","Any colour");
  inp.addEventListener("input",function(){pick(hex(inp.value)||"#c8143c");});a.appendChild(inp);w.appendChild(a);return w;}
function paintSw(box,h,say,lab){var any=true;[].forEach.call(box.querySelectorAll(".dmc-s"),function(b){var on=!!h&&b.getAttribute("data-hex")===h;b.setAttribute("aria-checked",String(on));if(on)any=false;
    if(b.__src!==1){var im=b.querySelector("img");var J=b.getAttribute("aria-label").toLowerCase();var s=JFAM[J]?shadeSrc(JFAM[J],null,1):null;if(im&&s){im.src=s;if(REC[JFAM[J]+"||1"]||JFAM[J]==="purple")b.__src=1;}}});
  var a=box.querySelector(".dmc-any");if(a){a.setAttribute("aria-checked",String(!!h&&any));var i=a.querySelector("input");if(h&&i&&i.value!==h)i.value=h;
    var want=h&&any?"o:"+h:"any";if(a.__g!==want){a.__g=want;var keep=i;a.innerHTML=h&&any?stone(h,8):stone("ruby",8);if(!(h&&any))cycler(a,ANY);a.appendChild(keep);}}
  if(say)say.innerHTML=h?lab+": <b>"+nameOf(h)+"</b>":"";}
function paintAll(force){PANELS=PANELS.filter(function(P){return P.el.isConnected||P.keep;});PANELS.forEach(function(P){try{P.paint(force);}catch(e){}});
  try{if(W.IngSettingsRaised&&D.getElementById("dmcCard")&&D.getElementById("dmcCard").offsetParent)W.IngSettingsRaised.paint();}catch(e){}}
__REST__
