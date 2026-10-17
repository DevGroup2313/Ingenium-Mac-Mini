<style id="r119-css">
/* ============ R119 · THE INBOX: CARPE DIEM'S 💭, IN INGENIUM'S COLOURS ============
   Her word (17 October): "I also want for Ingenium to get Carpe Diem's version of the 'Thoughts' bubble feature and all of
   its capabilities but on Ingenium's palette." Carpe Diem's Inbox (its PASS 1047 and 1048, build 1051) comes across whole:
   Ctrl and the full stop from anywhere, in the apps' frames too; the 💭 in the side column; the quill line, which grows
   with the writing like a sticky note, can be dragged anywhere and keeps its place; Keep, and the words drift letter by
   letter into the 💭; minimised, the line folds into the 💭 with its words and the 💭 brings it back; the Inbox, where
   each thought is sent where it belongs (a note, Tabula, or done) or all are let go; and "A thought came in" in the
   quiet room. Ingenium adds its own places (steps on the Focus page, the chat, a reminder) and, with a model, a
   suggestion of where each thought belongs. The parked thoughts she already has are the Inbox's first contents.
   Carpe Diem's quill wears near-white paper with a fine gold edge and blue keys; here the paper is lavender-white, the
   edge Ingenium's gold, the keys Ingenium's purple; by night, Ingenium's plum. */
#ing-capture.ing-quill{position:fixed;left:50%;top:72px;transform:translateX(-50%);z-index:2147482995;width:min(620px,92vw);box-sizing:border-box;
  display:flex;align-items:flex-start;gap:9px;padding:9px 10px 9px 16px;border-radius:27px;border:0;
  cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;
  background:linear-gradient(180deg,#fffeff 0%,#faf7fd 60%,#f4effa 100%);
  box-shadow:inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -2px 0 rgba(34,26,46,.05),
    0 0 0 1px rgba(184,138,58,.26),0 3px 0 rgba(34,26,46,.10),
    0 6px 10px rgba(34,26,46,.10),0 16px 32px rgba(34,26,46,.13),0 30px 64px rgba(34,26,46,.15)}
body[data-theme="night"] #ing-capture.ing-quill{
  background:linear-gradient(180deg,#312840 0%,#272034 55%,#201a2b 100%);
  box-shadow:inset 0 1.5px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.35),
    0 0 0 1px rgba(214,178,98,.28),0 3px 0 rgba(0,0,0,.55),
    0 6px 10px rgba(0,0,0,.4),0 16px 32px rgba(0,0,0,.45),0 30px 64px rgba(0,0,0,.55)}
#ing-capture.ing-quill.ing-cap-drag{cursor:grabbing}
#ing-capture.ing-quill.ing-cap-gone{display:none !important}
#ing-capture.ing-quill.ing-cap-tall{border-radius:22px}
.ing-cap-glyph{font-size:21px;line-height:1;flex:none;margin-top:6px;animation:ingCapBreathe 3.2s ease-in-out infinite}
@keyframes ingCapBreathe{50%{transform:scale(1.12) translateY(-1px)}}
.ing-cap-field{position:relative;flex:1;min-width:0}
#ing-capture-in{display:block;width:100%;box-sizing:border-box;border:0;outline:none;background:transparent;padding:7px 0 8px;margin:0;cursor:text;touch-action:auto;user-select:text;-webkit-user-select:text;
  resize:none;overflow-y:hidden;min-height:36px;white-space:pre-wrap;overflow-wrap:anywhere;box-shadow:none;
  font:italic 17px/1.35 var(--serif,Georgia,serif);color:#221a2e;scrollbar-width:none;-ms-overflow-style:none}
#ing-capture-in::-webkit-scrollbar{display:none;width:0;height:0}
body[data-theme="night"] #ing-capture-in{color:#efe9f6}
#ing-capture-in::placeholder{color:rgba(96,84,112,.62)}
body[data-theme="night"] #ing-capture-in::placeholder{color:rgba(214,204,232,.5)}
.ing-cap-ink{position:absolute;left:0;bottom:2px;height:2px;width:0;border-radius:2px;background:linear-gradient(90deg,#b88a3a,rgba(202,162,74,.35));transition:width .25s ease,opacity .2s}
body[data-theme="night"] .ing-cap-ink{background:linear-gradient(90deg,#e3bd69,rgba(227,189,105,.35))}
/* the four keys are raised and move as Ingenium's do: a lit lip, a foot of their own depth and graded casts; under the
   pointer they rise with a little spring, and pressed they sink onto their foot */
html body #ing-capture.ing-quill .ing-cap-keep,html body #ing-capture.ing-quill .ing-cap-box{flex:none;cursor:pointer;padding:8px 15px;border-radius:999px;
  font:600 13px var(--sans,system-ui,sans-serif);white-space:nowrap;min-height:0}
html body #ing-capture.ing-quill .ing-cap-x,html body #ing-capture.ing-quill .ing-cap-min{flex:none;width:34px;height:34px;border-radius:50%;padding:0;cursor:pointer;
  font-size:15px;line-height:32px;text-align:center;min-height:0}
html body #ing-capture.ing-quill .ing-cap-min{font-size:20px;font-weight:600}
html body #ing-capture.ing-quill :is(.ing-cap-keep,.ing-cap-box,.ing-cap-x,.ing-cap-min){position:relative;
  transform:translateY(0);transition:transform .18s cubic-bezier(.34,1.56,.64,1),box-shadow .18s ease,filter .18s ease,color .14s ease}
html body #ing-capture.ing-quill :is(.ing-cap-keep,.ing-cap-box,.ing-cap-x,.ing-cap-min):hover{transform:translateY(-2px)}
html body #ing-capture.ing-quill :is(.ing-cap-keep,.ing-cap-box,.ing-cap-x,.ing-cap-min):active{transform:translateY(2px);transition-duration:.07s}
/* by day */
html body #ing-capture.ing-quill .ing-cap-keep{color:#fff;border:1px solid rgba(58,28,106,.6);text-shadow:0 1px 0 rgba(40,16,80,.35);
  background:linear-gradient(180deg,#8d66d8 0%,#6a3fb5 58%,#5a339b 100%);
  box-shadow:inset 0 1.5px 0 rgba(255,255,255,.42),inset 0 -2px 0 rgba(30,10,60,.25),0 3px 0 #43267a,0 5px 8px rgba(34,26,46,.24),0 10px 18px rgba(34,26,46,.12)}
html body #ing-capture.ing-quill .ing-cap-keep:hover{box-shadow:inset 0 1.5px 0 rgba(255,255,255,.48),inset 0 -2px 0 rgba(30,10,60,.25),0 5px 0 #43267a,0 9px 14px rgba(34,26,46,.26),0 16px 26px rgba(34,26,46,.14);filter:brightness(1.05)}
html body #ing-capture.ing-quill .ing-cap-keep:active{box-shadow:inset 0 1px 3px rgba(30,10,60,.4),0 1px 0 #43267a,0 2px 3px rgba(34,26,46,.2)}
html body #ing-capture.ing-quill :is(.ing-cap-box,.ing-cap-x,.ing-cap-min){color:#6a3fb5;border:1px solid rgba(184,138,58,.28);
  background:linear-gradient(180deg,#ffffff 0%,#f5f1fa 100%);
  box-shadow:inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -2px 0 rgba(34,26,46,.08),0 3px 0 rgba(34,26,46,.20),0 5px 8px rgba(34,26,46,.15),0 10px 18px rgba(34,26,46,.08)}
html body #ing-capture.ing-quill :is(.ing-cap-box,.ing-cap-x,.ing-cap-min):hover{color:#55309a;
  box-shadow:inset 0 1.5px 0 #ffffff,inset 0 -2px 0 rgba(34,26,46,.08),0 5px 0 rgba(34,26,46,.18),0 9px 14px rgba(34,26,46,.17),0 16px 26px rgba(34,26,46,.10)}
html body #ing-capture.ing-quill :is(.ing-cap-box,.ing-cap-x,.ing-cap-min):active{box-shadow:inset 0 1px 3px rgba(34,26,46,.18),0 1px 0 rgba(34,26,46,.22),0 2px 3px rgba(34,26,46,.10)}
/* by night */
html body[data-theme="night"] #ing-capture.ing-quill .ing-cap-keep{border-color:rgba(0,0,0,.55);background:linear-gradient(180deg,#a685e6 0%,#8662cf 60%,#6d4cb4 100%);
  box-shadow:inset 0 1.5px 0 rgba(255,255,255,.25),inset 0 -2px 0 rgba(0,0,0,.3),0 3px 0 #3a2766,0 5px 8px rgba(0,0,0,.45),0 10px 18px rgba(0,0,0,.3)}
html body[data-theme="night"] #ing-capture.ing-quill .ing-cap-keep:hover{box-shadow:inset 0 1.5px 0 rgba(255,255,255,.3),inset 0 -2px 0 rgba(0,0,0,.3),0 5px 0 #3a2766,0 9px 14px rgba(0,0,0,.5),0 16px 26px rgba(0,0,0,.32)}
html body[data-theme="night"] #ing-capture.ing-quill .ing-cap-keep:active{box-shadow:inset 0 1px 3px rgba(0,0,0,.5),0 1px 0 #3a2766,0 2px 3px rgba(0,0,0,.4)}
html body[data-theme="night"] #ing-capture.ing-quill :is(.ing-cap-box,.ing-cap-x,.ing-cap-min){color:#e6dcf6;border-color:rgba(214,178,98,.26);
  background:linear-gradient(180deg,#3f3552 0%,#2f273e 100%);
  box-shadow:inset 0 1.5px 0 rgba(255,255,255,.10),inset 0 -2px 0 rgba(0,0,0,.3),0 3px 0 rgba(0,0,0,.6),0 5px 8px rgba(0,0,0,.4),0 10px 18px rgba(0,0,0,.25)}
html body[data-theme="night"] #ing-capture.ing-quill :is(.ing-cap-box,.ing-cap-x,.ing-cap-min):hover{color:#f6f0ff;
  box-shadow:inset 0 1.5px 0 rgba(255,255,255,.13),inset 0 -2px 0 rgba(0,0,0,.3),0 5px 0 rgba(0,0,0,.6),0 9px 14px rgba(0,0,0,.45),0 16px 26px rgba(0,0,0,.28)}
html body[data-theme="night"] #ing-capture.ing-quill :is(.ing-cap-box,.ing-cap-x,.ing-cap-min):active{box-shadow:inset 0 1px 3px rgba(0,0,0,.55),0 1px 0 rgba(0,0,0,.6),0 2px 3px rgba(0,0,0,.35)}
body[data-calm="1"] #ing-capture.ing-quill :is(.ing-cap-keep,.ing-cap-box,.ing-cap-x,.ing-cap-min),
body[data-motion="minimal"] #ing-capture.ing-quill :is(.ing-cap-keep,.ing-cap-box,.ing-cap-x,.ing-cap-min){transition:none}
.ing-cap-mote{position:fixed;z-index:2147482996;pointer-events:none;white-space:pre;color:#b88a3a}
body[data-theme="night"] .ing-cap-mote{color:#e3bd69}
body[data-calm="1"] .ing-cap-glyph,body[data-motion="minimal"] .ing-cap-glyph{animation:none}
@media (prefers-reduced-motion: reduce){.ing-cap-glyph{animation:none}.ing-cap-ink{transition:none}}
@media (max-width:520px){#ing-capture.ing-quill{flex-wrap:wrap;border-radius:18px;padding:10px 12px}.ing-cap-field{flex-basis:calc(100% - 40px)}}
/* the Inbox */
.ib-list{display:flex;flex-direction:column;gap:9px;max-height:min(58vh,520px);overflow:auto;padding:2px 2px 4px;margin:8px 0 4px}
.ib-item{padding:10px 12px;border-radius:12px;background:var(--card-hi,#fff);border:.5px solid var(--hairline-soft,rgba(0,0,0,.06));box-shadow:var(--pop,0 1px 0 rgba(34,26,46,.06))}
.ib-t{font-size:14px;line-height:1.5;color:var(--ink-1);white-space:pre-wrap;overflow-wrap:anywhere}
.ib-w{font-size:11px;color:var(--ink-3);margin-top:2px}
.ib-acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.ib-sug{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:7px;font-size:12px;color:var(--ink-2)}
.ib-sug b{font-weight:600;color:var(--accent)}
.ib-foot{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px}
.ib-foot .ib-sp{flex:1}
.ib-foot .ib-grp{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.ib-foot .btn{white-space:nowrap}
.ib-foot .ib-grp.ib-end{margin-left:auto}
.ib-sug .ib-sw{flex:1 1 auto;min-width:0}
.ib-empty{padding:16px 4px;text-align:center;font-family:var(--serif,Georgia,serif);font-size:17px;color:var(--ink-2)}
.qs-cap{margin-top:12px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p50"]="started";}catch(_){}
/* R119 · the Inbox: see the note at the top of its styles */
(function r119Inbox(){
"use strict";
function $(id){return document.getElementById(id);}
function list(){if(!Array.isArray(state.parked))state.parked=[];return state.parked;}
function save(){try{saveState();}catch(e){}}
function h(tag,attrs,kids){var n=document.createElement(tag);if(attrs)for(var k in attrs){var v=attrs[k];if(v==null)continue;
    if(k==="class")n.className=v;else if(k==="text")n.textContent=v;else if(k==="onclick")n.addEventListener("click",v);else n.setAttribute(k,v);}
  (kids||[]).forEach(function(c){if(c)n.appendChild(c);});return n;}
function stillMotion(){try{return document.body.getAttribute("data-motion")==="minimal"||document.body.getAttribute("data-calm")==="1"||(typeof sup==="function"&&sup("calm"))||window.matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
function fab(){return $("fabPark");}
function toast(t){try{ingToast(t);}catch(e){}}
function refresh(){try{fxRenderPark();}catch(e){}try{fxRenderNow();}catch(e){}markBar();}
function ago(at){try{return supAgo(Date.now()-at)+" ago";}catch(e){return "";}}

/* ================= THE QUILL LINE ================= */
function capture(prefill,after){
  var old=$("ing-capture");
  if(old){if(old.__ingRestore&&old.classList.contains("ing-cap-gone"))old.__ingRestore();else{var i0=old.querySelector("textarea");if(i0)i0.focus();}return;}
  /* it grows with the writing, a line at a time, up to a comfortable height, and then scrolls with no bar in view;
     Enter starts a new line, Keep (or Ctrl and Enter) keeps it, Esc closes it */
  var inp=h("textarea",{id:"ing-capture-in",rows:"1",autocomplete:"off",spellcheck:"true",placeholder:"A thought, a task, a worry: let it go","aria-label":"Catch a thought",maxlength:"2000"});
  if(prefill)inp.value=prefill;
  var n=list().length,ink=h("i",{class:"ing-cap-ink"});
  var pane=h("div",{id:"ing-capture",class:"ing-quill",role:"dialog","aria-label":"Catch a thought"},[
    h("span",{class:"ing-cap-glyph","aria-hidden":"true",text:"💭"}),
    h("div",{class:"ing-cap-field"},[inp,ink]),
    h("button",{type:"button",class:"ing-cap-keep",text:"Keep",onclick:function(){keep();}}),
    h("button",{type:"button",class:"ing-cap-box",id:"ing-cap-open",title:"Open the Inbox",text:"Inbox"+(n?" · "+n:""),onclick:function(){shut(true);openInbox();}}),
    h("button",{type:"button",class:"ing-cap-min",title:"Minimise the thought panel","aria-label":"Minimise the thought panel",text:"−",onclick:function(){tuck();}}),
    h("button",{type:"button",class:"ing-cap-x",title:"Close the thought panel","aria-label":"Close the thought panel",text:"✕",onclick:function(){shut();}})]);
  /* the panel stands where it is put: placed by its left and top so its own motions may use transform; dragged by any
     part that is not the line or a key; it keeps its place for the next time */
  var POS="ing_thought_pos_v1";
  function place(x,y){var w=pane.offsetWidth||320,hh=pane.offsetHeight||54;
    x=Math.max(4,Math.min(window.innerWidth-w-4,x));y=Math.max(4,Math.min(window.innerHeight-hh-4,y));
    pane.style.left=Math.round(x)+"px";pane.style.top=Math.round(y)+"px";pane.style.transform="none";}
  function seat(){var p=null;try{p=JSON.parse(localStorage.getItem(POS)||"null");}catch(e){}
    if(p&&typeof p.x==="number"&&typeof p.y==="number")place(p.x,p.y);else place((window.innerWidth-pane.offsetWidth)/2,72);}
  pane.addEventListener("pointerdown",function(e){
    if(e.target.closest&&e.target.closest("textarea,input,button"))return;
    if(e.pointerType==="mouse"&&e.button!==0)return;
    var r=pane.getBoundingClientRect(),x0=e.clientX,y0=e.clientY,moved=false,pid=e.pointerId;
    function mv(ev){if(ev.pointerId!==pid)return;var dx=ev.clientX-x0,dy=ev.clientY-y0;
      if(!moved&&Math.abs(dx)+Math.abs(dy)<4)return;if(!moved){moved=true;pane.classList.add("ing-cap-drag");}
      ev.preventDefault();place(r.left+dx,r.top+dy);}
    function up(ev){if(ev.pointerId!==pid)return;
      document.removeEventListener("pointermove",mv,true);document.removeEventListener("pointerup",up,true);document.removeEventListener("pointercancel",up,true);
      pane.classList.remove("ing-cap-drag");
      if(moved){try{var q=pane.getBoundingClientRect();localStorage.setItem(POS,JSON.stringify({x:Math.round(q.left),y:Math.round(q.top)}));}catch(x){}}}
    /* followed on the whole page, so a quick hand that leaves the panel's edge does not drop it */
    document.addEventListener("pointermove",mv,true);document.addEventListener("pointerup",up,true);document.addEventListener("pointercancel",up,true);});
  function towardFab(){var f=fab();if(!f||!f.getBoundingClientRect().width)return null;
    var a=f.getBoundingClientRect(),b=pane.getBoundingClientRect();
    return "translate("+Math.round(a.left+a.width/2-(b.left+b.width/2))+"px,"+Math.round(a.top+a.height/2-(b.top+b.height/2))+"px) scale(.12)";}
  var going=false;
  function tuck(){if(going)return;var to=towardFab();
    var gone=function(){pane.classList.add("ing-cap-gone");pane.style.opacity="";markBar();};
    if(stillMotion()||!pane.animate||!to){gone();return;}
    going=true;
    pane.animate([{opacity:1,transform:"none"},{opacity:0,transform:to}],{duration:380,easing:"cubic-bezier(.5,0,.75,.2)",fill:"forwards"})
      .finished.catch(function(){}).then(function(){going=false;gone();try{pane.getAnimations().forEach(function(a){a.cancel();});}catch(e){}});}
  pane.__ingRestore=function(){pane.classList.remove("ing-cap-gone");markBar();grow();
    place(parseFloat(pane.style.left)||0,parseFloat(pane.style.top)||0);
    var from=towardFab();
    if(!stillMotion()&&pane.animate&&from)pane.animate([{opacity:0,transform:from},{opacity:1,transform:"translateY(2px) scale(1.02)",offset:.7},{opacity:1,transform:"none"}],{duration:460,easing:"cubic-bezier(.2,.8,.3,1)"});
    setTimeout(function(){inp.focus();},30);};
  function grow(){ink.style.width=Math.min(100,inp.value.length*2.2)+"%";
    /* the note's height follows its words; past the room below it, it scrolls */
    inp.style.height="auto";var top=pane.getBoundingClientRect().top||72;
    var room=Math.max(90,Math.min(window.innerHeight*.6,window.innerHeight-top-90)),want=Math.min(inp.scrollHeight,room);
    inp.style.height=want+"px";inp.style.overflowY=inp.scrollHeight>room+1?"auto":"hidden";pane.classList.toggle("ing-cap-tall",want>40);}
  inp.addEventListener("input",grow);
  function keep(){var v=inp.value.trim();if(!v){shut();return;}if(going)return;going=true;
    list().unshift({id:uid(),t:v.slice(0,2000),at:Date.now()});if(list().length>300)list().length=300;save();
    var f=fab();
    var done=function(){remove();refresh();bump();toast("Kept in the Inbox. Back to what you were doing.");};
    if(stillMotion()||!f||!f.getBoundingClientRect().width||!document.body.animate){done();return;}
    /* the words drift to the 💭, letter by letter */
    var fr0=f.getBoundingClientRect(),ir=inp.getBoundingClientRect(),tx=fr0.left+fr0.width/2,ty=fr0.top+fr0.height/2;
    var cs=getComputedStyle(inp),meas=document.createElement("canvas").getContext("2d");meas.font=cs.fontStyle+" "+cs.fontSize+" "+cs.fontFamily;
    var lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.35,padL=parseFloat(cs.paddingLeft)||0,padT=parseFloat(cs.paddingTop)||0;
    var x=ir.left+padL,y=ir.top+padT-inp.scrollTop,jobs=[];
    inp.style.color="transparent";ink.style.opacity="0";
    v.slice(0,160).split("").forEach(function(ch,i){
      if(ch==="\n"){x=ir.left+padL;y+=lh;return;}
      var w=meas.measureText(ch).width;
      if(x+w>ir.right-2){x=ir.left+padL;y+=lh;}
      if(y<ir.top-lh||y>ir.bottom){x+=w;return;}   /* only the letters in view drift */
      var m=h("span",{class:"ing-cap-mote",text:ch});m.style.left=x+"px";m.style.top=y+"px";m.style.font=meas.font;document.body.appendChild(m);
      var ex=tx-x,ey=ty-y;
      jobs.push(m.animate([{transform:"none",opacity:1},{transform:"translate("+ex*.4+"px,"+(ey*.2-18-(i%5)*4)+"px) rotate("+(i%2?12:-12)+"deg)",opacity:.9,offset:.5},
          {transform:"translate("+ex+"px,"+ey+"px) scale(.3)",opacity:0}],{duration:760,delay:i*16,easing:"cubic-bezier(.4,0,.3,1)",fill:"forwards"})
        .finished.catch(function(){}).then(function(){if(m.parentNode)m.parentNode.removeChild(m);}));
      x+=w;});
    pane.animate([{opacity:1},{opacity:0,transform:"scaleX(.94)"}],{duration:420,delay:140,fill:"forwards"});
    Promise.all(jobs).then(done);
    setTimeout(function(){if(pane.parentNode)done();},3500);}   /* never left half-way */
  function remove(){if(pane.parentNode)pane.parentNode.removeChild(pane);try{markBar();}catch(e){}
    [].slice.call(document.querySelectorAll(".ing-cap-mote")).forEach(function(m){m.parentNode.removeChild(m);});if(after)try{after();}catch(e){}}
  function shut(now){if(going)return;if(now||stillMotion()||!pane.animate){remove();return;}going=true;
    pane.animate([{opacity:1,transform:"none"},{opacity:0,transform:"translateY(-14px) scale(.97)"}],{duration:220,easing:"ease-in",fill:"forwards"}).finished.catch(function(){}).then(remove);}
  inp.addEventListener("keydown",function(e){if(e.key==="Enter"&&(e.ctrlKey||e.metaKey)){e.preventDefault();keep();}else if(e.key==="Escape"){e.preventDefault();e.stopPropagation();shut();}});
  document.body.appendChild(pane);seat();grow();
  if(!stillMotion()&&pane.animate)pane.animate([{opacity:0,transform:"translateY(-18px) scale(.86,.7)"},{opacity:1,transform:"translateY(3px) scale(1.03,1.06)",offset:.62},{opacity:1,transform:"translateY(-1px) scale(.99,.98)",offset:.82},{opacity:1,transform:"none"}],{duration:560,easing:"cubic-bezier(.2,.8,.3,1)"});
  setTimeout(function(){inp.focus();},20);}
function bump(){var f=fab();if(!f||stillMotion()||!f.animate)return;f.animate([{transform:"scale(1)"},{transform:"scale(1.25)",offset:.4},{transform:"scale(1)"}],{duration:480,easing:"cubic-bezier(.3,1.6,.5,1)"});}

/* ================= WHERE A THOUGHT GOES ================= */
function take(id){state.parked=list().filter(function(x){return x.id!==id;});save();}
var PLACES={
  note:{label:"🗒️ To a note",word:"a note",run:function(it){try{var nn=newStickyNote();nn.text=esc(it.t).replace(/\n/g,"<br>");save();renderStickyPins();updateNotesCount();}catch(e){}take(it.id);toast("Pinned as a Schedae note.");}},
  tabula:{label:"📝 To Tabula",word:"Tabula",run:function(it){take(it.id);try{closeModal();}catch(e){}
    try{localStorage.setItem("tabula_incoming",JSON.stringify({title:"From the Inbox",html:"<h1>From the Inbox</h1><p>"+esc(it.t).replace(/\n/g,"<br>")+"</p>"}));}catch(e){}
    go("tabula");toast("Sent to Tabula.");}},
  task:{label:"🪜 Steps",word:"a task with steps",run:function(it){take(it.id);try{closeModal();}catch(e){}go("focus");try{taskBreak(it.t);}catch(e){}}},
  chat:{label:"💬 To the chat",word:"the chat",run:function(it){take(it.id);try{closeModal();}catch(e){}go("chat");var ci=$("chatInput");if(ci){ci.value=it.t;try{ci.dispatchEvent(new Event("input"));}catch(e){}ci.focus();}}},
  reminder:{label:"🔔 A reminder",word:"a reminder",run:function(it){state.reminders=state.reminders||[];state.reminders.push({text:it.t.slice(0,300)});take(it.id);try{bellRefresh();}catch(e){}toast("Kept with your reminders (the bell).");}},
  done:{label:"✓ Done",word:"done",ghost:true,run:function(it){take(it.id);}}};
var ORDER=["note","tabula","task","chat","reminder","done"];
function actsFor(it,after){var a=h("div",{class:"ib-acts"});
  ORDER.forEach(function(k){var P=PLACES[k];a.appendChild(h("button",{type:"button",class:"btn xs"+(P.ghost?" ghost":""),text:P.label,onclick:function(){P.run(it);if(after)after();refresh();}}));});return a;}

/* ================= THE INBOX ================= */
var SUG={};
function openInbox(){
  var box=modalOpen('<h3>💭 The Inbox</h3><p class="small muted" style="margin-top:0">Everything you caught, newest first. Send each one where it belongs, or let it go.</p><div class="ib-list" id="ibList"></div><div class="ib-foot" id="ibFoot"></div>');
  function draw(){var L=box.querySelector("#ibList"),F=box.querySelector("#ibFoot");if(!L)return;L.innerHTML="";F.innerHTML="";var items=list();
    if(!items.length)L.appendChild(h("div",{class:"ib-empty",text:"The Inbox is empty. A clear head."}));
    items.forEach(function(it){var row=h("div",{class:"ib-item","data-id":it.id},[h("div",{class:"ib-t",text:it.t}),h("div",{class:"ib-w",text:ago(it.at)})]);
      var s=SUG[it.id];if(s&&PLACES[s.to]){var sg=h("div",{class:"ib-sug"}),sw=h("span",{class:"ib-sw"});sw.appendChild(document.createTextNode("Ingenium suggests "));sw.appendChild(h("b",{text:PLACES[s.to].word}));
        if(s.why)sw.appendChild(document.createTextNode(": "+s.why));sg.appendChild(sw);sg.appendChild(h("button",{type:"button",class:"btn xs primary",text:"Do it",onclick:function(){PLACES[s.to].run(it);delete SUG[it.id];refresh();draw();}}));row.appendChild(sg);}
      row.appendChild(actsFor(it,draw));L.appendChild(row);});
    var G1=h("span",{class:"ib-grp"}),G2=h("span",{class:"ib-grp ib-end"});F.appendChild(G1);F.appendChild(G2);
    G1.appendChild(h("button",{type:"button",class:"btn primary small",text:"+ Catch another",onclick:function(){closeModal();capture();}}));
    if(items.length)G1.appendChild(h("button",{type:"button",class:"btn small",id:"ibSuggest",text:"✨ Suggest where each goes",title:"Your model on this device reads the thoughts and suggests a place for each; nothing moves until you press Do it",onclick:function(){suggest(this,draw);}}));
    if(items.length>1)G2.appendChild(h("button",{type:"button",class:"btn ghost small",text:"Let them all go",onclick:function(){if(confirm("Clear every thought from the Inbox?")){state.parked=[];SUG={};save();refresh();draw();}}}));
    G2.appendChild(h("button",{type:"button",class:"btn ghost small",text:"Close",onclick:closeModal}));}
  draw();box.__ibDraw=draw;return box;}
/* the model on this device suggests a place for each thought; nothing moves until she presses Do it */
function suggest(btn,redraw){var items=list().slice(0,20);if(!items.length)return;btn.disabled=true;var t0=btn.textContent;btn.textContent="Reading your thoughts…";
  var prompt="These are thoughts I caught while working. For each one, say where it belongs, choosing exactly one word:\n"
    +"task (something to do, best broken into small steps), note (something to keep and look at again), reminder (something to remember at a time or a day), "
    +"chat (a question I want to think through with you), tabula (writing I want to develop into a page), done (no longer needed).\n"
    +"Answer with one line per thought and nothing else, in exactly this form: 3: task, a few words of reason.\n\n"
    +items.map(function(it,i){return (i+1)+". "+it.t.replace(/\s+/g," ").slice(0,300);}).join("\n");
  supAsk(prompt,40+items.length*30).then(function(txt){var got=0;String(txt||"").split(/\n+/).forEach(function(line){
      var m=/^\s*\**\s*(\d+)\s*\**\s*[:.)\-]\s*\**\s*(task|note|reminder|chat|tabula|done)\b\**\s*[,;:—–-]?\s*(.*)$/i.exec(line);if(!m)return;
      var it=items[+m[1]-1];if(!it)return;SUG[it.id]={to:m[2].toLowerCase(),why:m[3].replace(/\s*\.$/,"").slice(0,140)};got++;});
    btn.disabled=false;btn.textContent=t0;redraw();toast(got?"Ingenium suggested a place for "+got+" thought"+(got===1?"":"s")+". Nothing has moved: press Do it where you agree.":"The model's answer could not be read as places. Sort them by hand, or try again.");},
    function(e){btn.disabled=false;btn.textContent=t0;toast(e&&e.message?e.message:String(e));});}

/* ================= THE 💭 IN THE SIDE COLUMN ================= */
function markBar(){var b=fab();if(!b)return;var n=list().length,waits=!!document.querySelector("#ing-capture.ing-cap-gone");
  var title=(waits?"Bring back your thought":"Catch a thought")+(n?" ("+n+" in the Inbox)":"");if(b.getAttribute("title")!==title){b.setAttribute("title",title);b.setAttribute("aria-label",title);}
  var ob=$("ing-cap-open");if(ob)ob.textContent="Inbox"+(n?" · "+n:"");}
function wireFab(){var b=fab();if(!b||b.__ingCap)return;b.__ingCap=1;b.onclick=function(e){if(e)e.preventDefault();capture();};markBar();}
/* Ctrl and the full stop, from anywhere: the page and the frames of the apps inside it */
function keyCatch(doc){if(!doc||doc.__ingCap)return;doc.__ingCap=1;
  doc.addEventListener("keydown",function(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&(e.key==="."||e.code==="Period")){e.preventDefault();e.stopPropagation();capture();}},true);}
function framesCatch(){[].slice.call(document.querySelectorAll("iframe")).forEach(function(f){try{if(f.contentDocument&&f.contentDocument.body)keyCatch(f.contentDocument);}catch(e){}});}

/* ================= THE FOCUS PAGE, THE QUIET SCREEN, HOME ================= */
fxRenderPark=function(){var hst=$("fxParkList");if(!hst)return;hst.innerHTML="";var ps=list();
  var head=h("div",{class:"ib-foot",style:"margin:4px 0 8px"},[h("button",{type:"button",class:"btn small primary",text:"💭 Catch a thought",onclick:function(){capture();}}),
    ps.length?h("button",{type:"button",class:"btn small",text:"Open the Inbox · "+ps.length,onclick:openInbox}):null]);hst.appendChild(head);
  if(!ps.length){hst.appendChild(h("div",{class:"small muted",text:"The Inbox is empty. A clear head."}));return;}
  ps.slice(0,30).forEach(function(it){var r=h("div",{class:"ib-item"},[h("div",{class:"ib-t",text:it.t}),h("div",{class:"ib-w",text:ago(it.at)})]);r.appendChild(actsFor(it,null));hst.appendChild(r);});
  if(ps.length>30)hst.appendChild(h("div",{class:"small muted",text:"And "+(ps.length-30)+" more in the Inbox."}));};
window.fxRenderPark=fxRenderPark;
function quietKey(){var q=$("quietScreen");if(!q||q.querySelector(".qs-cap"))return;var inner=q.querySelector(".qs-inner")||q;
  inner.appendChild(h("div",{class:"qs-cap"},[h("button",{type:"button",class:"btn ghost small",id:"qsCatch",text:"💭 A thought came in",onclick:function(){capture();}})]));}
/* the words about the 💭, across the guide and the tour */
function words(){try{ING_TOUR.forEach(function(s){
    if(s.sub==="Parked thoughts"){s.sub="The Inbox";s.t="💭 The Inbox";s.b="When a thought arrives in the middle of work, catch it and let it go: press Ctrl and the full stop anywhere in the app, or the 💭 at the side, and write it in one line. It waits in the Inbox until you sort it: to a note, to Tabula, into steps, to the chat, to a reminder, or done.";}
    if(/Park, quiet, and out of the way/.test(s.t||"")){s.t="💭 Catch, quiet, and out of the way";s.b="The thought bubble catches a stray thought (Ctrl and the full stop do the same from anywhere); the leaf opens the quiet screen. The small arrow above them lays all the side buttons down when you want a clearer page, and brings them back.";}});}catch(e){}}
(function hooks(){if(typeof parkOpen==="function"){parkOpen=capture;window.parkOpen=capture;}
  wireFab();quietKey();words();keyCatch(document);framesCatch();
  setInterval(function(){try{framesCatch();wireFab();markBar();}catch(e){}},2000);
  if(typeof saveState==="function"&&!saveState.__ingInbox){var _ss=saveState;saveState=function(){var r=_ss.apply(this,arguments);try{markBar();}catch(e){}return r;};saveState.__ingInbox=1;window.saveState=saveState;}
  document.addEventListener("load",function(e){if(e.target&&e.target.tagName==="IFRAME")setTimeout(framesCatch,50);},true);
  try{fxRenderPark();}catch(e){}})();
window.IngInbox={capture:capture,open:openInbox,places:PLACES,list:list,suggest:suggest,markBar:markBar,keyCatch:keyCatch};
})();
;try{window.__ingParts["p50"]="running";}catch(_){}
</script>
