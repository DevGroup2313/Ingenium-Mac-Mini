<style id="r421-css">
/* ============ R421 · HER SIX REQUESTS OF 28 NOVEMBER: THE ENGINE'S STOP, INGENIA ASKS FIRST, FABRICA'S SEAL, TITLE AND PANELS, THE CREST, NO RINGS (Ingenium 8.14) ============
   Her words (28 November 2026): "I want to be able to stop the model from writing straight from the Engine panel in the same location where
   I can load and unload the models. I also want you to have Ingenium ask me if I want to have the models start writing and updating
   Ingenia's apps' folders instead of automatically having the model start writing without me knowing. I want to be able to pick and choose.
   ... I also want you to make the little app logo on the second panel on the Fabrica page near the "main" button needs to be made clickale
   and animated when I click and hover it like the rest of the app's engine logo button ... I also want you to fix the "Ingenium" title next
   to it, the "g" looks clipped at the bottom and to be honest the whole Fabrica 3 panel view page looks weirdly compacted and compressed,
   please fix it and restore its original length and size. I hate that the Offline Project shield seal does not have any animations on the
   Ingenia folders page ... I want you to make the shield logo clickable and animated please. I also really hate the harsh blue circle effect
   from around Carpe Diem and the Forge's logo button animation on the Ingenia page, please remove it. I also hated that same effect but in
   purple on the Ingenium app logo button on the Ingenia page, please make the fix and take only that effect off the apps logo buttons and
   animations but keep everything else the same."
   What was found, measured on 8.13:
   - The Engine panel (r374) had Load and Unload but no way to stop the model while it wrote. Now Stop writing stands in that row, right
     after them (r374, 8.14).
   - Ingenia brought a folder up to date by itself after three quiet minutes (r390's autoTick). Now it asks: the card below lists the
     folders waiting, she ticks the ones the model may read and write into, and nothing is written before she chooses (r390, 8.14).
   - The ring: r378 lays four copies of each logo's face behind it as its edge (".rim"), each a little larger than the face. Pressed, the
     logo springs and its layers lift (r402), and those copies show all round it as a bright ring, blue for Carpe Diem and The Forge, violet
     for Ingenium (frozen frames of the spring, with and without them, showed it is they alone). They are no longer drawn; the face, its
     layers, its shadow and every movement stay as they were.
   - The crest: The Offline Project's folder showed IngSeal's crest as a still picture (no key, no sway). r378 now makes it a logo like the
     others (8.14): it sways, leans under the pointer and, on its folder's page, is a key that sinks, springs, sounds and plays r402's
     flourishes; here it also gets a light of its own that passes over the enamel when pressed.
   - Fabrica's work panel: its title was set 15 px high on a 15 px line with its overflow hidden, which cut every descender (the g of
     Ingenium). Its line is now 1.3 times its size. The seal beside it was a picture; it is now a key with the seal key's press, spring and
     flourishes and Ingenium's key sound.
   - Fabrica's panels: since 7.33 (r315) the path bar and the Next card stand inside the frame, whose height is fixed (the window's, less
     74 px), so the three panels lost their height to them (612 px of a 900 px window). The frame now grows by exactly the height of those
     two, so the panels have their original height again (814 px of the same window).
   Minimal motion keeps every movement here still, as Ingenium's other keys do. */
#page-folders .ig-ls-l.rim{display:none !important}
/* the crest, at its own width and height, with a soft shadow of its own (a flat logo has no cast) */
#page-folders .ig-ls.crest,#page-folders.fd-on .ig-ls.fd-seal.crest{width:calc(var(--S,56px) * var(--ar,.78)) !important}
#page-folders .ig-ls.crest .ig-ls-l{object-fit:contain;filter:drop-shadow(0 calc(var(--S,56px) * .025) calc(var(--S,56px) * .04) rgba(40,22,68,.26))}
body[data-theme="night"] #page-folders .ig-ls.crest .ig-ls-l{filter:drop-shadow(0 calc(var(--S,56px) * .025) calc(var(--S,56px) * .05) rgba(0,0,0,.55))}
#page-folders .ig-ls.crest.ig-key{border-radius:22% 22% 46% 46% / 14% 14% 36% 36%}
#page-folders .ig-ls.crest.down .ig-ls-l{filter:drop-shadow(0 calc(var(--S,56px) * .01) calc(var(--S,56px) * .02) rgba(40,22,68,.3))}
#page-folders .ig-ls.crest .r421-shine{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;opacity:0;z-index:4;
  -webkit-mask-image:var(--crest);mask-image:var(--crest);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;
  background:linear-gradient(112deg,rgba(255,255,255,0) 30%,rgba(255,250,236,.85) 47%,rgba(255,255,255,.95) 50%,rgba(255,250,236,.85) 53%,rgba(255,255,255,0) 70%);background-size:260% 100%;background-position:120% 0}
#page-folders .ig-ls.crest.r421-glint .r421-shine{animation:r421glint .95s cubic-bezier(.3,.6,.3,1)}
@keyframes r421glint{0%{opacity:0;background-position:120% 0}15%{opacity:1}85%{opacity:1}100%{opacity:0;background-position:-20% 0}}
body[data-motion="minimal"] #page-folders .ig-ls.crest .r421-shine{display:none}
/* Fabrica's work panel: the title whole, descenders and all */
#fb .f-pn-h h2{line-height:1.3;padding-bottom:.04em}
/* Fabrica's seal beside the title: a key, as the seal key is elsewhere */
#fb .f-ls.r421-key{cursor:pointer;border-radius:50%;outline:none;-webkit-tap-highlight-color:transparent;transition:transform .32s cubic-bezier(.3,1.5,.5,1)}
#fb .f-ls.r421-key:hover{transform:translateY(-2px) scale(1.07)}
#fb .f-ls.r421-key:focus-visible{outline:2px solid var(--f-acc,#6a3fb5);outline-offset:3px}
#fb .f-ls.r421-key.down{transform:translateY(calc(var(--S,34px) * .08)) scale(.9);transition-duration:.07s}
#fb .f-ls.r421-key.r421-up{animation:r421up .5s cubic-bezier(.3,1.4,.5,1)}
#fb .f-ls.r421-key.r421-hop{animation:r421hop .78s cubic-bezier(.3,.8,.4,1)}
#fb .f-ls.r421-key.r421-knock{animation:r421knock .52s cubic-bezier(.34,1.45,.64,1)}
#fb .f-ls.r421-key.r421-spin{animation:r421spin .9s cubic-bezier(.3,.8,.25,1)}
#fb .f-ls.r421-key.r421-wobble{animation:r421wobble .75s ease-out}
#fb .f-ls.r421-key.r421-pulse{animation:r421pulse .7s cubic-bezier(.3,1.4,.5,1)}
#fb .f-ls.r421-key.r421-lift{animation:r421lift .95s cubic-bezier(.3,.8,.3,1)}
#fb .f-ls.r421-key.r421-big{animation:r421big 1.25s cubic-bezier(.25,.8,.25,1)}
@keyframes r421up{0%{transform:translateY(calc(var(--S,34px) * .08)) scale(.9)}55%{transform:translateY(calc(var(--S,34px) * -.05)) scale(1.05)}100%{transform:none}}
@keyframes r421hop{0%{transform:translateY(calc(var(--S,34px) * .08)) scale(.9)}35%{transform:translateY(calc(var(--S,34px) * -.32)) scale(1.04,.98)}62%{transform:translateY(0) scale(1.08,.9)}80%{transform:translateY(calc(var(--S,34px) * -.06)) scale(.98,1.03)}100%{transform:none}}
@keyframes r421knock{0%{transform:scale(.9)}30%{transform:scale(1.1)}55%{transform:scale(.96)}78%{transform:scale(1.03)}100%{transform:none}}
@keyframes r421spin{0%{transform:scale(.9) rotate(0deg)}70%{transform:scale(1.06) rotate(370deg)}100%{transform:scale(1) rotate(360deg)}}
@keyframes r421wobble{0%{transform:scale(.92) rotate(0deg)}20%{transform:rotate(-12deg)}40%{transform:rotate(9deg)}60%{transform:rotate(-5deg)}80%{transform:rotate(2deg)}100%{transform:none}}
@keyframes r421pulse{0%{transform:scale(.9)}35%{transform:scale(1.16)}60%{transform:scale(.95)}82%{transform:scale(1.04)}100%{transform:none}}
@keyframes r421lift{0%{transform:scale(.9)}40%{transform:translateY(calc(var(--S,34px) * -.16)) scale(1.1)}70%{transform:translateY(calc(var(--S,34px) * -.08)) scale(1.06)}100%{transform:none}}
@keyframes r421big{0%{transform:scale(.88) rotate(0deg)}60%{transform:scale(1.14) rotate(735deg)}82%{transform:scale(.97) rotate(718deg)}100%{transform:scale(1) rotate(720deg)}}
body[data-motion="minimal"] #fb .f-ls.r421-key,body[data-motion="minimal"] #fb .f-ls.r421-key[class*="r421-"]{animation:none !important;transition:none !important}
/* Fabrica's runs (Care, its actions): with the panels at their full height they stand on show, and lift under the pointer as r315's cards do
   (her rule: "no new section, page or tab inside of Ingenium should be flat, stiff and unresponsive when I hover over it") */
#fb .h-run{transition:transform .2s cubic-bezier(.3,1.4,.5,1),box-shadow .2s ease}
#fb .h-run:hover{transform:translateY(-2px);box-shadow:var(--r315-cardhi,0 2px 0 rgba(60,40,100,.08),0 12px 24px rgba(70,44,130,.16))}
body[data-motion="minimal"] #fb .h-run:hover{transform:none}
/* Ingenia asks first: the card of the folders waiting */
#r421Ask{position:fixed;right:96px;bottom:24px;z-index:785;width:min(430px,calc(100vw - 120px));box-sizing:border-box;border-radius:16px;padding:16px 16px 14px;
  background:var(--card-hi,#ffffff);color:var(--ink-1,#221a2e);border:1px solid var(--hairline,rgba(34,26,46,.10));font:14px/1.5 var(--sans,system-ui,sans-serif);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 2px 0 rgba(40,22,68,.08),0 8px 20px rgba(40,22,68,.14),0 24px 48px rgba(40,22,68,.14);animation:r421in .38s cubic-bezier(.3,1.3,.5,1)}
body[data-theme="night"] #r421Ask{background:#221b2e;color:#f3eefb;border-color:rgba(205,184,240,.12);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 2px 0 rgba(0,0,0,.5),0 12px 28px rgba(0,0,0,.5),0 28px 56px rgba(0,0,0,.4)}
@keyframes r421in{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}
body[data-motion="minimal"] #r421Ask{animation:none}
#r421Ask .ra-h{display:flex;align-items:center;gap:10px;margin:0 0 4px}
#r421Ask .ra-h svg{width:22px;height:22px;flex:0 0 auto;color:var(--accent,#6a3fb5)}
#r421Ask h3{margin:0;flex:1 1 auto;font:600 17px/1.3 var(--serif,Georgia,serif);color:inherit}
#r421Ask .ra-x{appearance:none;border:1px solid var(--hairline,rgba(34,26,46,.12));background:linear-gradient(#ffffff,#f6f2fb);width:30px;height:30px;border-radius:50%;cursor:pointer;color:var(--ink-2,#4a4358);
  display:grid;place-items:center;box-shadow:0 1px 0 rgba(40,22,68,.18),0 3px 6px rgba(40,22,68,.12);transition:transform .2s cubic-bezier(.3,1.4,.5,1)}
#r421Ask .ra-x:hover{transform:translateY(-1px) rotate(90deg)}
body[data-theme="night"] #r421Ask .ra-x{background:linear-gradient(#352a4b,#271f37);border-color:rgba(205,184,240,.14);color:#d4cae6}
#r421Ask .ra-say{margin:0 0 10px;font-size:13px;color:var(--ink-2,#4a4358)}
body[data-theme="night"] #r421Ask .ra-say{color:#d4cae6}
#r421Ask .ra-list{list-style:none;margin:0 0 12px;padding:0;display:grid;gap:7px;max-height:min(46vh,320px);overflow:auto;scrollbar-width:none}
#r421Ask .ra-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;cursor:pointer;background:linear-gradient(#ffffff,#f9f7fc);border:1px solid var(--hairline,rgba(34,26,46,.10));
  box-shadow:0 1px 0 rgba(40,22,68,.10),0 3px 8px rgba(40,22,68,.07);transition:transform .2s cubic-bezier(.3,1.4,.5,1),box-shadow .2s}
#r421Ask .ra-row:hover{transform:translateY(-2px);box-shadow:0 2px 0 rgba(40,22,68,.12),0 8px 16px rgba(40,22,68,.12)}
body[data-theme="night"] #r421Ask .ra-row{background:linear-gradient(#2a2239,#251e33);border-color:rgba(205,184,240,.11);box-shadow:0 1px 0 rgba(0,0,0,.45),0 4px 10px rgba(0,0,0,.3)}
#r421Ask .ra-row input{width:18px;height:18px;margin:0;flex:0 0 auto;accent-color:var(--accent,#6a3fb5);cursor:pointer}
#r421Ask .ra-logo{width:26px;height:26px;flex:0 0 auto;display:grid;place-items:center;overflow:visible}
#r421Ask .ra-logo img,#r421Ask .ra-logo svg{max-width:26px;max-height:26px}
#r421Ask .ra-nm{flex:1 1 auto;min-width:0;display:flex;flex-direction:column}
#r421Ask .ra-nm b{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#r421Ask .ra-nm small{font-size:12px;color:var(--ink-3,#6c6579)}
body[data-theme="night"] #r421Ask .ra-nm small{color:#a99cc1}
#r421Ask .ra-st{font:600 11.5px/1 var(--sans,system-ui,sans-serif);color:var(--ink-3,#6c6579);white-space:nowrap}
#r421Ask .ra-st.on{color:var(--accent,#6a3fb5)}#r421Ask .ra-st.ok{color:#2f7a55}#r421Ask .ra-st.no{color:#a3283e}
body[data-theme="night"] #r421Ask .ra-st.ok{color:#7fd1a6}body[data-theme="night"] #r421Ask .ra-st.no{color:#f2a0ae}
#r421Ask .ra-keys{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
#r421Ask .ra-keys .btn{font-size:12.5px}
#r421Ask .ra-off{appearance:none;border:0;background:none;padding:4px 2px;margin-left:auto;font:600 12px/1.2 var(--sans,system-ui,sans-serif);color:var(--ink-3,#6c6579);cursor:pointer;text-decoration:underline;text-underline-offset:3px}
#r421Ask .ra-foot{margin:10px 0 0;font-size:11.5px;color:var(--ink-3,#6c6579)}
@media (max-width:720px){#r421Ask{left:12px;right:12px;bottom:12px;width:auto}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p421"]="started";}catch(_){}
(function r421(){"use strict";
if(window.IngAskUp)return;var W=window,D=document;
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function minimal(){try{return D.body.getAttribute("data-motion")==="minimal";}catch(e){return false;}}
function sound(){try{if(W.IngSound&&typeof IngSound.play==="function")IngSound.play("keys");}catch(e){}}
function save(){try{saveState();}catch(e){}}

/* ---------- Ingenia asks first: which folders the model may bring up to date ---------- */
var AU={el:null,running:false};
function store(){try{return W.IngKnow&&IngKnow.store?IngKnow.store():null;}catch(e){return null;}}
function unread(p){try{return IngFolders.unread(p).length;}catch(e){return 0;}}
function locked(){try{return !!(W.IngLock&&typeof IngLock.locked==="function"&&IngLock.locked());}catch(e){return false;}}
function logo(name){var w=mk("span","ra-logo");try{if(W.IngAppLogo&&typeof IngAppLogo.el==="function"){var e=IngAppLogo.el(name,26);if(e){e.removeAttribute&&e.removeAttribute("id");w.appendChild(e);return w;}}}catch(x){}
  w.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h7l2 2h9v10H3z"/></svg>';return w;}
function key(t,cls,f){var b=mk("button","btn"+(cls?" "+cls:""),t);b.type="button";b.onclick=function(e){e.stopPropagation();f(b);};return b;}
function close(){if(AU.el){AU.el.remove();AU.el=null;}}
/* "Not now": a folder is not offered again until more of its conversations wait, or half a day has passed */
function later(list){var k=store();if(!k)return;k.askedUp=k.askedUp||{};list.forEach(function(p){k.askedUp[p.id]={n:unread(p),at:Date.now()};});save();}
function fresh(list){var k=store();if(!k)return [];var a=k.askedUp||{};return list.filter(function(p){var n=unread(p),was=a[p.id];return n>0&&!(was&&n<=was.n&&Date.now()-was.at<12*3600000);});}
function offer(list){if(AU.el||AU.running||locked())return;var show=fresh(list||[]);if(!show.length)return;draw(show);}
function draw(list){close();var c=mk("section");c.id="r421Ask";c.setAttribute("role","dialog");c.setAttribute("aria-labelledby","r421AskT");
  var h=mk("div","ra-h");h.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h7l2 2h9v10H3z"/><path d="M12 12v5M9.5 14.5h5"/></svg>';
  var t=mk("h3",null,"Bring your folders up to date?");t.id="r421AskT";h.appendChild(t);
  var x=mk("button","ra-x");x.type="button";x.setAttribute("aria-label","Not now");x.innerHTML='<svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  x.onclick=function(){if(!AU.running)later(list);close();};h.appendChild(x);c.appendChild(h);
  var say=mk("p","ra-say",(list.length===1?"This folder has":"These folders have")+" conversations Ingenium has not read yet. Tick the ones the model may read and write into; nothing is written until you choose.");c.appendChild(say);
  var ul=mk("ul","ra-list"),boxes=[];
  list.forEach(function(p){var n=unread(p),li=mk("li"),row=mk("label","ra-row"),cb=D.createElement("input");cb.type="checkbox";cb.checked=true;cb.setAttribute("aria-label",p.name);
    var nm=mk("span","ra-nm");nm.appendChild(mk("b",null,p.name));nm.appendChild(mk("small",null,n+" conversation"+(n===1?"":"s")+" not read yet"));
    var st=mk("span","ra-st","");row.appendChild(cb);row.appendChild(logo(p.name));row.appendChild(nm);row.appendChild(st);li.appendChild(row);ul.appendChild(li);
    boxes.push({p:p,cb:cb,st:st});cb.addEventListener("change",paintGo);});
  c.appendChild(ul);
  var ks=mk("div","ra-keys"),go=key("","primary",function(){run(boxes.filter(function(b){return b.cb.checked;}),ks,boxes,list);}),nl=key("Not now","",function(){later(list);close();}),
    off=mk("button","ra-off","Don't offer again");off.type="button";off.title="Turns off the offer; Memoria, How it is kept, turns it back on";
  off.onclick=function(){var k=store();if(k){k.opts=k.opts||{};k.opts.auto=false;save();}try{if(W.IngKnow&&IngKnow.paint)IngKnow.paint();}catch(e){}close();};
  function paintGo(){var n=boxes.filter(function(b){return b.cb.checked;}).length;go.textContent=n?("Bring "+(n===1?"it":n===boxes.length&&n>1?"all "+n:n)+" up to date"):"Choose a folder";go.disabled=!n;}
  paintGo();ks.appendChild(go);ks.appendChild(nl);ks.appendChild(off);c.appendChild(ks);
  c.appendChild(mk("p","ra-foot","Each folder keeps its notes as they were, with Undo. You can also bring one up to date from its own page in Ingenia."));
  c.addEventListener("keydown",function(e){if(e.key==="Escape"&&!AU.running){e.preventDefault();later(list);close();}});
  D.body.appendChild(c);AU.el=c;}
function run(chosen,ks,boxes,list){if(!chosen.length||AU.running)return;AU.running=true;
  boxes.forEach(function(b){b.cb.disabled=true;if(!b.cb.checked)b.st.textContent="Left as it is";});
  ks.innerHTML="";var stop=key("Stop","",function(){AU.stopped=true;try{if(typeof W.IngStopWriting==="function")W.IngStopWriting();else Engine.abort();}catch(e){}stop.disabled=true;stop.textContent="Stopping…";});ks.appendChild(stop);
  AU.stopped=false;var i=0,done=0;
  (function next(){if(i>=chosen.length||AU.stopped){finish();return;}var b=chosen[i++];b.st.className="ra-st on";b.st.textContent="Reading…";
    var pr;try{pr=W.IngKnow&&typeof IngKnow.upOne==="function"?IngKnow.upOne(b.p):Promise.reject(new Error("no reader"));}catch(e){pr=Promise.reject(e);}
    Promise.resolve(pr).then(function(r){if(r){done++;b.st.className="ra-st ok";b.st.textContent="Up to date";}else{b.st.className="ra-st no";b.st.textContent=AU.stopped?"Stopped":"Not this time";}next();},
      function(){b.st.className="ra-st no";b.st.textContent=AU.stopped?"Stopped":"Could not finish";next();});})();
  function finish(){AU.running=false;chosen.forEach(function(b){if(/Reading/.test(b.st.textContent)){b.st.className="ra-st no";b.st.textContent="Stopped";}});
    later(list.filter(function(p){return !chosen.some(function(b){return b.p===p;});}));
    ks.innerHTML="";ks.appendChild(key("Close","primary",function(){close();}));
    var say=AU.el&&AU.el.querySelector(".ra-say");if(say)say.textContent=done?(done===1?"One folder is up to date. Its notes as they were are kept, with Undo, on its page.":done+" folders are up to date. Their notes as they were are kept, with Undo, on their pages."):"Nothing was written.";
    try{if(W.IngFolders&&IngFolders.paint)IngFolders.paint();}catch(e){}}}
W.IngAskUp={offer:offer,close:close,draw:draw};

/* ---------- the crest's own light, at each press of the key on its folder's page ---------- */
function crestKey(t){var k=t&&t.closest?t.closest("#page-folders .ig-ls.crest.ig-key"):null;return k;}
function shine(k){if(!k||minimal())return;var s=k.querySelector(":scope .r421-shine");if(!s){var im=k.querySelector(".ig-ls-l");if(!im)return;s=mk("i","r421-shine");k.style.setProperty("--crest",'url("'+im.getAttribute("src")+'")');(k.querySelector(".ig-ls-idle")||k).appendChild(s);}
  k.classList.remove("r421-glint");void k.offsetWidth;k.classList.add("r421-glint");clearTimeout(k.__r421);k.__r421=setTimeout(function(){k.classList.remove("r421-glint");},1000);}
function crestAt(e){var pg=D.getElementById("page-folders");if(!pg)return null;var ks=pg.querySelectorAll(".ig-ls.crest.ig-key");for(var i=0;i<ks.length;i++){var r=ks[i].getBoundingClientRect();if(r.width&&e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom)return ks[i];}return null;}
var CDOWN=null;
D.addEventListener("pointerdown",function(e){CDOWN=crestAt(e);},{passive:true,capture:true});
D.addEventListener("pointerup",function(){var k=CDOWN;CDOWN=null;if(k)setTimeout(function(){shine(k.isConnected?k:D.querySelector("#page-folders .ig-ls.crest.ig-key"));},60);},{passive:true,capture:true});
D.addEventListener("keydown",function(e){var k=crestKey(e.target);if(k&&(e.key==="Enter"||e.key===" ")&&!e.repeat)setTimeout(function(){shine(k);},160);},true);

/* ---------- Fabrica's seal beside the title: a key ---------- */
var FL=["hop","knock","spin","wobble","pulse","lift"],FLAST="",FCLS=["down","r421-up","r421-hop","r421-knock","r421-spin","r421-wobble","r421-pulse","r421-lift","r421-big"];
function fseal(){var s=D.getElementById("fbWhSeal");if(!s||!s.classList||!s.classList.contains("f-ls"))return null;
  if(!s.__r421){s.__r421=1;s.classList.add("r421-key");s.setAttribute("role","button");s.removeAttribute("aria-hidden");s.tabIndex=0;}
  var nm=((D.getElementById("fbWhName")||{}).textContent||"").trim()||"The app",lab=nm+"'s logo";if(s.getAttribute("aria-label")!==lab){s.setAttribute("aria-label",lab);s.title=lab+": press it";}return s;}
function fclear(s){FCLS.forEach(function(c){s.classList.remove(c);});}
function fplay(s,held){if(!s)return;fclear(s);sound();if(minimal())return;void s.offsetWidth;var n=held?"big":FL[Math.floor(Math.random()*FL.length)];if(n===FLAST&&!held)n=FL[(FL.indexOf(n)+1)%FL.length];FLAST=n;
  s.classList.add("r421-"+n);clearTimeout(s.__r421t);s.__r421t=setTimeout(function(){fclear(s);},n==="big"?1300:1000);}
var FDOWN=null,FAT=0;
D.addEventListener("pointerdown",function(e){var s=e.target&&e.target.closest?e.target.closest("#fbWhSeal"):null;if(!s)return;s=fseal()||s;FDOWN=s;FAT=Date.now();fclear(s);s.classList.add("down");},{passive:true,capture:true});
D.addEventListener("pointerup",function(){var s=FDOWN;FDOWN=null;if(!s)return;s.classList.remove("down");fplay(s.isConnected?s:fseal(),Date.now()-FAT>600);},{passive:true,capture:true});
D.addEventListener("pointercancel",function(){if(FDOWN)FDOWN.classList.remove("down");FDOWN=null;},{passive:true,capture:true});
D.addEventListener("keydown",function(e){var s=e.target;if(!s||s.id!=="fbWhSeal")return;if((e.key==="Enter"||e.key===" ")&&!e.repeat){e.preventDefault();s.classList.add("down");setTimeout(function(){s.classList.remove("down");fplay(s,false);},120);}},true);

/* ---------- Fabrica's panels at their own height again: the frame grows by its path bar and Next card ---------- */
var FR=0;
function fit(){FR=0;var fb=D.getElementById("fb"),pn=D.getElementById("fbPanels"),pg=D.getElementById("page-fabrica");if(!fb||!pn||!pg)return;
  var shown=pg.classList.contains("active")&&getComputedStyle(pn).display!=="none",extra=0;
  /* what now stands between the frame's top and the panels, beyond its own head as before 7.33: that much is given back to the frame */
  if(shown&&[].some.call(fb.children,function(e){return (e.classList.contains("r315-path")||e.classList.contains("r315-next"))&&getComputedStyle(e).display!=="none";})){
    var gap=parseFloat(getComputedStyle(fb).rowGap)||12,hd=fb.querySelector(":scope > .f-head"),own=hd&&getComputedStyle(hd).display!=="none"?hd.offsetHeight+gap:0;
    extra=Math.max(0,Math.round(pn.getBoundingClientRect().top-fb.getBoundingClientRect().top-own));}
  if(!extra){if(fb.style.getPropertyValue("--f-h"))fb.style.removeProperty("--f-h");return;}
  var base=pg.classList.contains("sk-on")?Math.max(420,W.innerHeight-74):640,want=Math.round(base+extra)+"px";
  if(fb.style.getPropertyValue("--f-h")!==want)fb.style.setProperty("--f-h",want,"important");}
function soon(){if(FR)return;var f=function(){fit();fseal();};FR=W.requestAnimationFrame?W.requestAnimationFrame(f):setTimeout(f,16);}
var RO=null;
function watch(){var fb=D.getElementById("fb"),pg=D.getElementById("page-fabrica");if(!fb||!pg||fb.__r421)return !!(fb&&fb.__r421);fb.__r421=1;
  try{new MutationObserver(soon).observe(fb,{childList:true,subtree:true});}catch(e){}
  try{new MutationObserver(soon).observe(pg,{attributes:true,attributeFilter:["class"]});}catch(e){}
  try{new MutationObserver(soon).observe(fb,{attributes:true,attributeFilter:["class"]});}catch(e){}
  try{if(W.ResizeObserver){RO=new ResizeObserver(soon);[].forEach.call(fb.children,function(e){if(e.classList.contains("r315-path")||e.classList.contains("r315-next"))RO.observe(e);});
      new MutationObserver(function(){[].forEach.call(fb.children,function(e){if((e.classList.contains("r315-path")||e.classList.contains("r315-next"))&&!e.__r421o){e.__r421o=1;RO.observe(e);}});}).observe(fb,{childList:true});}}catch(e){}
  W.addEventListener("resize",soon);soon();return true;}
(function start(){var n=0;(function w(){if(watch())return;if(++n<480)setTimeout(w,500);})();})();
try{window.__ingParts["p421"]="running";}catch(_){}
})();
</script>
