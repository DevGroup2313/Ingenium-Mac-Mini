(function(){
"use strict";
var D=document,W=window,win=D.getElementById("win"),fitBox=D.getElementById("fit"),stage=D.getElementById("stage");
var V=JSON.parse(D.getElementById("pvViews").textContent),R=JSON.parse(D.getElementById("pvRight").textContent);
var fb=D.getElementById("fb"),P=fb.querySelectorAll(".f-panels > .f-pn"),L=P[0],M=P[1],RT=P[2];
function el(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function txt(e){return (e&&e.textContent||"").replace(/\s+/g," ").trim();}
function still(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
/* the window: 1440 by 900, scaled to fit, as the approved previews */
function fit(){var cs=getComputedStyle(stage),aw=stage.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
  var ah=W.innerHeight-fitBox.getBoundingClientRect().top+W.scrollY-40;var s=Math.min(1,aw/1440,Math.max(ah,520)/900);if(!(s>0))s=.5;
  win.style.transform="scale("+s+")";fitBox.style.width=Math.floor(1440*s)+"px";fitBox.style.height=Math.floor(900*s)+"px";}
W.addEventListener("resize",fit);fit();setTimeout(fit,60);
/* day and night, as the Display does */
var tk=D.getElementById("themeKey");function night(){return win.getAttribute("data-theme")==="night";}
function label(){tk.textContent=night()?"Day":"Night";}
tk.addEventListener("click",function(){var n=!night();win.setAttribute("data-theme",n?"night":"day");D.documentElement.setAttribute("data-theme",n?"dark":"light");label();});label();
/* every key sounds as Ingenium's do (r176): a short soft tock as it is pressed */
var AC=null,SND=true;D.getElementById("soundKey").addEventListener("click",function(){SND=!SND;this.textContent=SND?"Sound on":"Sound off";this.setAttribute("aria-pressed",SND?"true":"false");});
function tock(hi){if(!SND)return;try{AC=AC||new (W.AudioContext||W.webkitAudioContext)();var t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type="sine";
  o.frequency.setValueAtTime(hi?660:520,t);o.frequency.exponentialRampToValueAtTime(hi?420:340,t+.07);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.05,t+.006);
  g.gain.exponentialRampToValueAtTime(.0001,t+.09);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+.1);}catch(e){}}
win.addEventListener("pointerdown",function(e){var k=e.target.closest&&e.target.closest("button,.r172-opt,[role=tab]");if(k&&!k.disabled)tock(k.classList.contains("pri"));},true);
var tst=D.getElementById("pvToast"),tt=0;function say(t){tst.textContent=t;tst.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){tst.classList.remove("on");},2600);}
/* the sliding thumb of every segmented row follows its pressed key, as Fabrica's own (r112 thumbs) */
function thumbs(root){[].forEach.call(root.querySelectorAll(".f-seg"),function(s){var th=s.querySelector(".f-thumb"),on=s.querySelector('button[aria-pressed="true"],button[aria-selected="true"]');
  if(th&&on){th.style.width=on.offsetWidth+"px";th.style.transform="translateX("+(on.offsetLeft-(th.offsetParent===s?0:0))+"px)";}});}
/* the marks lean toward the pointer and lift; pressed, they sink (r112, the same measures) */
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
fb.addEventListener("pointermove",function(e){var t=e.target&&e.target.closest?e.target.closest(".f-repo,.f-pn-h"):null,ls=t&&t.querySelector(".f-ls:not(.new):not(.flat)");
  [].forEach.call(fb.querySelectorAll(".f-ls.hov"),function(x){if(x!==ls){x.classList.remove("hov","down");x.style.removeProperty("--rx");x.style.removeProperty("--ry");}});
  if(!ls||e.pointerType==="touch")return;var r=ls.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;ls.classList.add("hov");
  ls.style.setProperty("--ry",(clamp(px,-.8,.8)*30).toFixed(1)+"deg");ls.style.setProperty("--rx",(-clamp(py,-.8,.8)*24).toFixed(1)+"deg");},{passive:true});
fb.addEventListener("pointerleave",function(){[].forEach.call(fb.querySelectorAll(".f-ls.hov"),function(x){x.classList.remove("hov","down");x.style.removeProperty("--rx");x.style.removeProperty("--ry");});});
fb.addEventListener("pointerdown",function(e){var t=e.target&&e.target.closest?e.target.closest(".f-repo"):null,ls=t&&t.querySelector(".f-ls");if(ls)ls.classList.add("down");},{passive:true});
fb.addEventListener("pointerup",function(){[].forEach.call(fb.querySelectorAll(".f-ls.down"),function(x){x.classList.remove("down");});},{passive:true});

/* ---------- Ingenium's own list (r172), never the system's: for the branch ---------- */
var POP=null;
function closePop(){if(POP){POP.remove();POP=null;D.removeEventListener("pointerdown",outside,true);}}
function outside(e){if(POP&&!POP.contains(e.target)&&!(e.target.closest&&e.target.closest("[data-pv-branch]")))closePop();}
function openList(anchor,items,cur,onPick){closePop();var r=anchor.getBoundingClientRect(),wr=win.getBoundingClientRect(),s=wr.width/1440;
  var pop=el("div","r172-pop r172-in");pop.setAttribute("role","listbox");pop.style.position="absolute";pop.style.left=Math.round((r.left-wr.left)/s)+"px";pop.style.top=Math.round((r.bottom-wr.top)/s+6)+"px";pop.style.minWidth="220px";pop.style.zIndex="90";
  items.forEach(function(it){var o=el("div","r172-opt");o.setAttribute("role","option");o.setAttribute("aria-selected",it===cur?"true":"false");o.innerHTML="<r172-t>"+it+"</r172-t>";
    o.addEventListener("pointerenter",function(){[].forEach.call(pop.children,function(c){c.classList.remove("r172-act");});o.classList.add("r172-act");});
    o.addEventListener("click",function(){closePop();onPick(it);});pop.appendChild(o);});
  win.appendChild(pop);POP=pop;setTimeout(function(){D.addEventListener("pointerdown",outside,true);},0);}

/* ---------- the work: rooms and their views, as captured from Fabrica itself ---------- */
var ROOMS={now:["changes","files","code"],story:["history","compare","releases"],plans:["ideas","issues","pulls","projects","wiki"],care:["checks","overview","settings"]};
var SUBN={changes:"Changes",files:"Files",code:"Code",history:"History",compare:"Compare",releases:"Releases",ideas:"Ideas",issues:"Issues",pulls:"Pull requests",projects:"Projects",wiki:"Wiki",checks:"Checks",overview:"Overview",settings:"Settings"};
var cur={repo:"quill",room:"now",sub:"changes",branch:"main",merged:false,how:"Squash and merge"};
function key(){return cur.room+"-"+cur.sub;}
var MK="now-changes";
function showMid(k){MK=V[k]?k:"now-changes";M.innerHTML=V[k]||V["now-changes"];if(!still())[].forEach.call(M.querySelectorAll(".f-pn-b"),function(b){b.style.animation="none";void b.offsetWidth;b.style.animation="";});
  dressMid(k);requestAnimationFrame(function(){thumbs(M);});}
function chipLike(ref,text,title){var c=ref.cloneNode(false);c.removeAttribute("id");c.className=ref.className;c.textContent=text;if(title)c.title=title;c.setAttribute("data-pv","1");return c;}
function dressMid(k){var head=M.querySelector(".f-pn-h");
  if(head){var kept=[].filter.call(head.querySelectorAll("button,span"),function(x){return /^Kept$/.test(txt(x));})[0];
    /* where it lives, under the header (the header keeps its own keys, uncrowded) */
    if(!M.querySelector(".pv-disk")){var dl=el("div","pv-disk",'<span class="pv-dot"></span><span>From <b>Studio SSD</b> · 2.1 GB, every version · no size limit</span>');head.parentNode.insertBefore(dl,head.nextSibling);}
    var br=[].filter.call(head.querySelectorAll("button,span"),function(x){return /^(main|night-reader)$/.test(txt(x));})[0];
    if(br){br.setAttribute("data-pv-branch","1");if(txt(br)!==cur.branch)[].forEach.call(br.childNodes,function(n){if(n.nodeType===3&&n.textContent.trim())n.textContent=cur.branch;});
      br.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();openList(br,["main","night-reader","print-colour","v3.2 (a tag)"],cur.branch,function(v){if(/tag/.test(v)){say("In the app: the code as it was at v3.2 opens beside today's.");return;}cur.branch=v;showMid(key());say("Now showing "+v+": read from the drive as you look.");});});}}
  if(k==="plans-pr"){var box=M.querySelector("#hPrMergeBox");if(box){var mk=box.querySelector("#hPrMerge");
      if(cur.merged){box.innerHTML='<b class="h-big">Brought into main</b>On the drive, at once ('+cur.how.toLowerCase()+'). The branch night-reader is kept until you remove it.';}
      else{var seg=el("div","f-seg");seg.setAttribute("role","group");seg.setAttribute("aria-label","How to bring it in");seg.appendChild(el("span","f-thumb"));
        ["Merge","Squash and merge","Rebase and merge"].forEach(function(h){var b=el("button",null,h);b.type="button";b.setAttribute("aria-pressed",h===cur.how?"true":"false");
          b.addEventListener("click",function(){cur.how=h;[].forEach.call(seg.querySelectorAll("button"),function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});thumbs(box);if(mk)mk.textContent=h==="Merge"?"Merge into main":h==="Squash and merge"?"Squash into main":"Rebase onto main";});seg.appendChild(b);});
        var row=mk&&mk.parentNode;if(row)box.insertBefore(seg,row);if(mk){mk.textContent=cur.how==="Merge"?"Merge into main":cur.how==="Squash and merge"?"Squash into main":"Rebase onto main";
          mk.addEventListener("click",function(e){e.preventDefault();cur.merged=true;showMid("plans-pr");say("Brought into main on this computer: "+cur.how.toLowerCase()+".");});}
        var note=el("div","f-hint pv-new","New: squash and rebase, and a rule that main needs your review first.");box.appendChild(note);}}
    var ap=[].filter.call(M.querySelectorAll("button"),function(x){return txt(x)==="Ask for changes";})[0];
    if(ap){var ai=ap.cloneNode(true);ai.textContent="Ask Ingenium to review it";ai.classList.add("pv-ask");ap.parentNode.insertBefore(ai,ap.nextSibling);
      ai.addEventListener("click",function(e){e.preventDefault();openRight("ingenium");ask("review");});}}
  if(/^plans-pr|^plans-issue$/.test(k))dressPeople(k);
  if(k==="plans-pr-files")dressLines();
  if(k==="care-settings"){dressAbout();dressRules();}
  if(k==="care-checks")dressSafety();
  if(k==="story-history"){[].forEach.call(M.querySelectorAll(".h-cmt,.f-ver,.f-vrow,[class*=ver]"),function(x){});}
  if(k==="now-files"){var rows=M.querySelectorAll(".f-file,.h-file,.f-fl,li");var last=rows[rows.length-1];if(last&&last.parentNode){var big=last.cloneNode(true);
      [].forEach.call(big.querySelectorAll("*"),function(n){if(n.children.length===0&&/\S/.test(n.textContent)&&!/^\d/.test(n.textContent.trim()))n.textContent="";});
      var tn=[].filter.call(big.querySelectorAll("*"),function(n){return n.children.length===0;})[0];if(tn)tn.textContent="models/quill-base.gguf · 1.4 GB · kept whole, read from the drive when opened";last.parentNode.appendChild(big);}}}
/* ---------- phase 2: people and a milestone on issues and pull requests (Ingenium's own list) ---------- */
var PEOPLE="Ada",MILE="v3.3";
function dressPeople(k){var meta=M.querySelector(".h-meta");if(!meta||M.querySelector(".pv-meta2"))return;
  var row=el("div","h-meta h-blk pv-meta2");
  var ICP='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 3.9-5.5 7-5.5s5.8 1.9 7 5.5"/></svg>',
      ICM='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 21V4"/><path d="M6 4h11l-2.5 4L17 12H6"/></svg>';
  function chip(ic,label,val,items,set){var b=el("button","f-chip pv-mk");b.type="button";b.setAttribute("data-pv-meta","1");b.title=label;b.innerHTML=ic+"<span>"+label+": <b>"+val+"</b></span>";
    b.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();openList(b,items,null,function(v){var w=v.replace(/ · .*$/,"");set(w);b.querySelector("b").textContent=w;say(label+": "+v+". Kept on this computer.");});});return b;}
  row.appendChild(chip(ICP,"People",PEOPLE,["Ada","Theo","Ada and Theo","No one"],function(v){PEOPLE=v;}));
  row.appendChild(chip(ICM,"Milestone",MILE,["v3.3 · due 1 December","v3.4 · due 15 January","No milestone"],function(v){MILE=v;}));
  meta.parentNode.insertBefore(row,meta.nextSibling);}
/* ---------- phase 2: a comment on any line of the changes, its thread, Resolve ---------- */
function esc(t){return String(t).replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];});}
function dressLines(){var pre=M.querySelector(".f-dcode");if(!pre)return;
  var head=M.querySelector(".f-diff-h");if(head&&!head.querySelector(".pv-viewed")){var v=el("label","pv-viewed",'<span>Viewed</span><span class="f-sw"><input type="checkbox" aria-label="Viewed"></span>');
    v.querySelector("input").addEventListener("change",function(){var on=this.checked;pre.classList.toggle("pv-folded",on);say(on?"Marked as viewed: it folds away until it changes again.":"Not viewed yet.");});head.appendChild(v);}
  [].forEach.call(pre.querySelectorAll(".f-dl:not(.hunk)"),function(line){if(line.querySelector(".pv-lc"))return;var n=(line.querySelector("i")||{}).textContent||"";
    var plus=el("button","pv-lc","+");plus.type="button";plus.title="Comment on line "+n;plus.setAttribute("aria-label","Comment on line "+n);line.insertBefore(plus,line.firstChild);
    plus.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();var nx=line.nextElementSibling;if(nx&&nx.classList.contains("pv-lcbox"))return;openBox(line,n);});});}
function openBox(line,n){var box=el("div","pv-lcbox");box.innerHTML='<textarea class="pv-lcta" rows="2" placeholder="A comment on line '+n+'"></textarea><div class="pv-lck"><button class="f-btn quiet sm" type="button" data-x="no">Cancel</button><button class="f-btn pri sm" type="button" data-x="go">Comment on line '+n+'</button></div>';
  line.parentNode.insertBefore(box,line.nextSibling);var ta=box.querySelector("textarea");setTimeout(function(){try{ta.focus({preventScroll:true});}catch(e){}},30);
  box.addEventListener("click",function(e){var x=e.target.closest&&e.target.closest("[data-x]");if(!x)return;e.preventDefault();e.stopPropagation();
    if(x.getAttribute("data-x")==="no"){box.remove();return;}var t=ta.value.trim()||"Could this read the system's choice once, at start?";
    var th=el("div","pv-lcbox pv-thread");th.innerHTML='<article class="h-cmt"><div class="h-cmt-h"><b>Ada</b><span>on line '+n+'</span><span>just now</span></div><div class="h-md"><p>'+esc(t)+'</p></div></article><div class="pv-lck"><button class="f-btn quiet sm" type="button" data-r="1">Resolve</button></div>';
    th.addEventListener("click",function(ev){var r=ev.target.closest&&ev.target.closest("[data-r]");if(!r)return;ev.preventDefault();ev.stopPropagation();th.classList.toggle("pv-done");r.textContent=th.classList.contains("pv-done")?"Unresolve":"Resolve";say(th.classList.contains("pv-done")?"Resolved: the thread folds away, kept with the pull request.":"Open again.");});
    box.replaceWith(th);say("Your comment is kept with the pull request, on line "+n+".");});}
/* ---------- phase 2: rules before main (Care, Settings) ---------- */
function dressAbout(){[].forEach.call(M.querySelectorAll("input"),function(i){var ph=i.getAttribute("placeholder")||"";if(/one line/i.test(ph)&&!i.value)i.value="A notebook for students, offline";if(/notes, offline/i.test(ph)&&!i.value)i.value="notes, offline, students";});}
function dressRules(){var star=[].filter.call(M.querySelectorAll(".fr-fold"),function(f){return /The main idea/.test(txt(f.querySelector(".fr-fh")));})[0];if(!star||M.querySelector(".pv-rules"))return;
  var f=el("div","h-box h-blk fr-fold pv-rules");f.innerHTML='<button type="button" class="fr-fh" aria-expanded="true"><b class="h-big">Rules before main</b><span class="fr-chev" aria-hidden="true">'+((star.querySelector(".fr-chev")||{}).innerHTML||"")+'</span></button><div class="fr-fb">What must be true before anything joins main. Fabrica holds to them on this computer, and GitHub does too when you send it there.</div>';
  var body=f.querySelector(".fr-fb");[["Only through a pull request","no version goes straight into main",true],["Your review first","main waits for an approval",true],["The checks pass first","Fabrica's checks, and your workflows from phase 3",false],["Kept versions stay as they are","no rewriting of main's history",true]].forEach(function(r){
    var row=el("div","pv-rule",'<div><b>'+r[0]+'</b><small>'+r[1]+'</small></div><label class="f-sw"><input type="checkbox"'+(r[2]?' checked':'')+' aria-label="'+r[0]+'"></label>');
    row.querySelector("input").addEventListener("change",function(){say(r[0]+": "+(this.checked?"on":"off")+". Kept for main.");});body.appendChild(row);});
  star.parentNode.insertBefore(f,star.nextSibling);}
/* ---------- phase 2: what is checked on every version, beside Fabrica's five ---------- */
function dressSafety(){var first=M.querySelector(".h-box");if(!first||M.querySelector(".pv-safe"))return;
  var c=el("div","h-box h-blk pv-safe");c.innerHTML='<b class="h-big">Safety, on every version</b>Read on this computer, with nothing sent anywhere.';
  [["✓","No secrets left in the code","no key, token or password found in the 6 versions"],["✓","The parts it uses, and their licences","3 parts: 2 under MIT, 1 under Apache 2.0, each kept with its notice"],["✓","Large files kept whole","models/quill-base.gguf, 1.4 GB, in every version that holds it"]].forEach(function(r){
    var row=el("div","f-ck",'<span class="m">'+r[0]+'</span><div>'+r[1]+'<small>'+r[2]+'</small></div>');row.classList.add("pv-ok");c.appendChild(row);});
  first.parentNode.insertBefore(c,first.nextSibling);}
M.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("button,a,[role=button],.h-row,.h-item");if(!b||!M.contains(b))return;
  if(b.classList.contains("fr-room")){var rm=b.getAttribute("data-room");if(ROOMS[rm]){cur.room=rm;cur.sub=ROOMS[rm][0];showMid(key());}return;}
  var t=txt(b).replace(/\s*\d+$/,"");
  for(var s in SUBN)if(SUBN[s]===t&&ROOMS[cur.room].indexOf(s)>=0){cur.sub=s;showMid(key());return;}
  if(cur.room==="plans"&&cur.sub==="pulls"&&/Night mode for the reader/.test(txt(b))){showMid("plans-pr");return;}
  /* phase 2 in the preview: the pull request's three tabs, an issue opened, and every fold of Settings opens and shuts */
  if(/^plans-pr/.test(MK)&&b.hasAttribute("data-s")){var to={conv:"plans-pr",vers:"plans-pr-versions",files:"plans-pr-files"}[b.getAttribute("data-s")];if(to){showMid(to);return;}}
  if(cur.room==="plans"&&cur.sub==="issues"&&MK!=="plans-issue"&&/Night mode flashes on start/.test(txt(b))){showMid("plans-issue");return;}
  if(/All issues/.test(t)){cur.sub="issues";showMid(key());return;}
  if(b.classList.contains("fr-fh")){var fo=b.closest(".fr-fold");if(fo){var shut=fo.classList.toggle("fr-shut");b.setAttribute("aria-expanded",shut?"false":"true");}return;}
  if(b.closest(".pv-lcbox")||b.classList.contains("pv-lc")||b.closest(".pv-safe")||b.closest(".pv-rules")||b.hasAttribute("data-pv-meta"))return;
  if(/All pull requests/.test(t)){cur.sub="pulls";showMid(key());return;}
  if(b.hasAttribute("data-pv")||b.hasAttribute("data-pv-branch")||b.classList.contains("pv-ask")||b.closest("#hPrMergeBox"))return;
  if(b.tagName==="BUTTON"&&!b.closest(".f-seg"))say("In the app: "+t.toLowerCase()+".");});

/* ---------- your repositories: on this computer, and in this window ---------- */
function dressNews(){var list=L.querySelector(".f-repos");if(!list||L.querySelector(".pv-newsrow"))return;
  var k=el("button","pv-newsrow");k.type="button";k.setAttribute("data-pv","1");k.title="What changed while you were away";
  k.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg><span><b>3 new</b> while you were away</span><i aria-hidden="true">›</i>';
  k.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();openList(k,["#3 Night mode flashes on start · Ada wrote","#4 Night mode for the reader · its checks passed","v3.2 · kept as a release"],null,function(v){
    k.classList.add("pv-read");k.querySelector("span").innerHTML="<b>All read</b>";
    if(/^#3/.test(v)){cur.room="plans";cur.sub="issues";showMid("plans-issue");}else if(/^#4/.test(v)){cur.room="plans";cur.sub="pulls";showMid("plans-pr");}else{cur.room="story";cur.sub="releases";showMid("story-releases");}
    say("Opened from what is new for you.");});});
  list.parentNode.insertBefore(k,list);}
function dressLeft(){dressNews();var list=L.querySelector(".f-repos");if(!list)return;var tiles=[].slice.call(list.querySelectorAll(".f-repo"));
  var by={};tiles.forEach(function(t){by[txt(t.querySelector(".nm"))]=t;});

  function sec(title,sub){var s=el("div","pv-sec","<b>"+title+"</b><span>"+sub+"</span>");return s;}
  function st(t,words){var s=t.querySelector(".stl span:last-child");if(s)s.textContent=words;}
  list.innerHTML="";list.appendChild(sec("On this computer · 2","Studio SSD · 1.8 TB free · no size limit"));
  var g1=el("div","f-repos pv-grid");["quill-notes","ledger"].forEach(function(n){if(by[n]){g1.appendChild(by[n]);}});list.appendChild(g1);
  st(by["quill-notes"],"2.1 GB · kept");st(by["ledger"],"1.2 GB · kept");
  list.appendChild(sec("In this window","small apps made in Fabrica"));var g2=el("div","f-repos pv-grid");if(by["harbour-garden"])g2.appendChild(by["harbour-garden"]);list.appendChild(g2);
  tiles.forEach(function(t){t.setAttribute("aria-pressed",txt(t.querySelector(".nm"))==="quill-notes"?"true":"false");
    t.addEventListener("click",function(){var n=txt(t.querySelector(".nm"));if(n!=="quill-notes"){say("In the app: "+n+" opens the same way, read from "+(n==="ledger"?"the drive":"this window")+".");}});});
  var foot=L.querySelector(".f-pn-f");if(foot){var any=foot.querySelector("button");if(any){var add=any.cloneNode(true);add.textContent="Add one from this computer";add.removeAttribute("id");
      add.addEventListener("click",function(){say("In the app: choose any folder that holds a git repository, on any drive.");});foot.insertBefore(add,foot.firstChild);}}}

/* ---------- test and ship, and a fourth part: Ingenium, beyond GitHub ---------- */
var part="test";
function showRight(p){RT.innerHTML=R[p==="ingenium"?"Test":p.charAt(0).toUpperCase()+p.slice(1)]||R.Test;dressRight(p);
  /* a part opens at its top, its tabs in view */
  RT.scrollTop=0;[].forEach.call(RT.querySelectorAll(".f-pn-b,.fr-tabs,[class*=scroll]"),function(x){x.scrollTop=0;});requestAnimationFrame(function(){thumbs(RT);RT.scrollTop=0;});}
function openRight(p){part=p;showRight(p);}
function dressRight(p){var tabs=RT.querySelector('[role="tablist"],.f-seg');var copies=RT.querySelector("#fbPart_copies");
  if(copies&&!RT.querySelector("#fbPart_ingenium")){var ing=copies.cloneNode(true);ing.id="fbPart_ingenium";ing.setAttribute("data-part","ingenium");ing.textContent="Ingenium";copies.parentNode.insertBefore(ing,copies.nextSibling);}
  [].forEach.call(RT.querySelectorAll(".fr-part"),function(b){var on=b.getAttribute("data-part")===p;b.setAttribute("aria-selected",on?"true":"false");b.tabIndex=on?0:-1;
    b.onclick=function(e){e.preventDefault();openRight(b.getAttribute("data-part"));};});
  if(p==="ingenium"){[].forEach.call(RT.querySelectorAll('[id^="fbPartSec_"]'),function(s){s.hidden=true;});var host=RT.querySelector('[id^="fbPartSec_"]');host=host?host.parentNode:RT.querySelector(".f-pn-b")||RT;
    var box=el("div","pv-ing");box.innerHTML='<div class="pv-ing-h"><b>Beyond GitHub, with Ingenium</b><span class="f-chip">Offline</span></div>'+
      '<p class="f-hint">Your model on this Mac, Magister, reads the repository and answers here. Nothing is sent anywhere.</p>';
    var ICON={explain:'<circle cx="10.5" cy="10.5" r="5.5"/><path d="M14.6 14.6L19 19M8 10.5h5"/>',review:'<path d="M6 3.5h8l4 4v13H6z"/><path d="M9 13.5l2 2 4-4.5"/>',
      notes:'<path d="M8 7h9M8 12h9M8 17h6"/><circle cx="5" cy="7" r=".9" fill="currentColor"/><circle cx="5" cy="12" r=".9" fill="currentColor"/><circle cx="5" cy="17" r=".9" fill="currentColor"/>',
      message:'<path d="M5 6.5h14v9H10l-4 3v-3H5z"/><path d="M8.5 10h7M8.5 12.8h4.5"/>',time:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.8 1.8"/>',
      copy:'<rect x="4" y="5" width="16" height="6" rx="2"/><rect x="4" y="13" width="16" height="6" rx="2"/><path d="M7.5 8h.01M7.5 16h.01"/>',folder:'<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>'};
    function tile(k,title,line,fn){var t=el("div","f-tg");t.setAttribute("role","button");t.tabIndex=0;t.setAttribute("aria-pressed","false");
      t.innerHTML='<div class="top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICON[k]+"</svg><b>"+title+"</b></div><small>"+line+"</small>";
      function go(){[].forEach.call(t.parentNode.children,function(x){x.setAttribute("aria-pressed",x===t?"true":"false");});fn();}
      t.addEventListener("click",go);t.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}});return t;}
    box.appendChild(el("div","pv-sub","Ask your model"));
    var keys=el("div","f-targets pv-tiles");[["explain","Explain","the newest version, in plain words"],["review","Review","the open pull request, line by line"],["notes","Release notes","from the versions since v3.2"],["message","A message","for the changes you are keeping"]].forEach(function(a){
      keys.appendChild(tile(a[0],a[1],a[2],function(){ask(a[0]);}));});box.appendChild(keys);
    box.appendChild(el("div","pv-ans","<p class=\"f-hint\">Press a key above: the answer is written here.</p>"));
    var f=el("form","pv-find");f.innerHTML='<input type="search" placeholder="Find in every repository" aria-label="Find in every repository, by words or by meaning"><button class="f-btn" type="submit">Find</button>';
    f.addEventListener("submit",function(e){e.preventDefault();var q=f.querySelector("input").value.trim();var hits=box.querySelector(".pv-hits");hits.innerHTML="";if(!q){hits.appendChild(el("p","f-hint","Type a word, or what you mean."));return;}
      [["quill-notes","app/reader.js · line 3","return matchMedia(\"(prefers-color-scheme: dark)\").matches?\"night\":\"day\";"],["harbour-garden","garden.html · line 812","function theme(){ return state.theme || \"day\"; }"],["ledger","docs/backup.md · line 12","A second copy of the accounts on another drive, checked each week."]].forEach(function(h){
        hits.appendChild(el("div","pv-hit","<b>"+h[0]+"</b> · "+h[1]+"<code>"+h[2].replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];})+"</code>"));});say("3 found in 3 repositories, by what they mean.");});
    box.appendChild(f);box.appendChild(el("div","pv-hits"));
    box.appendChild(el("div","pv-sub","Beyond GitHub"));
    var more=el("div","f-targets pv-tiles");[["time","Any version, live","the app as it was on any day, in its own window"],["copy","A second copy","on another drive, checked every Sunday"],["folder","Its folder","in Folders: its conversations and notes"]].forEach(function(m){
      more.appendChild(tile(m[0],m[1],m[2],function(){say("In the app: "+m[1].toLowerCase()+", "+m[2]+".");}));});
    box.appendChild(more);host.appendChild(box);}
  /* the footer's key belongs to Test, Ship and Copies: the Ingenium part has none */
  var ft=RT.querySelector(".f-pn-f");if(ft)ft.hidden=(p==="ingenium");}
var TYPE=0;
function ask(k){var box=RT.querySelector(".pv-ans");if(!box)return;clearInterval(TYPE);
  var T={explain:["What the newest version changes",["“Night mode reads the system's choice first.” The reader asks the system whether it is night before it uses its own default, and keeps your choice once you make one.","It touches one function in app/reader.js: three lines in, one out. Nothing you saved is affected."]],
    review:["A review of #4, Night mode for the reader",["It does what it says, and the checks passed.","One thing to look at: line 3 asks the system each time a page is drawn; reading it once at start, and again when the system changes, would be lighter.","A test to add: you chose day while the system is at night."]],
    notes:["Version 3.3: the notes",["Night mode follows your system, and keeps your own choice.","The export keeps its fonts.","The guide is in French too."]],
    message:["A message for your changes",["Night mode reads the system's choice first","The reader asks whether it is night before using its default, and keeps your own choice once made."]]}[k];
  box.innerHTML="<b class=\"h-big\">"+T[0]+"</b>";var ul=el("ul");box.appendChild(ul);box.appendChild(el("p","f-hint","An example of what your model would write. Nothing is sent anywhere."));
  var items=T[1].slice(),li=null,i=0,j=0;if(still()){items.forEach(function(t){ul.appendChild(el("li",null,t));});return;}
  TYPE=setInterval(function(){if(i>=items.length){clearInterval(TYPE);return;}if(!li){li=el("li");ul.appendChild(li);}j+=3;li.textContent=items[i].slice(0,j);if(j>=items[i].length){i++;j=0;li=null;}},16);}

/* the steps at the top (Change, Keep, Test, Ship) answer as in the app */
[].forEach.call(fb.querySelectorAll(".f-steps button"),function(b){b.addEventListener("click",function(){say("In the app: "+txt(b).replace(/^\d\s*/,"").toLowerCase()+".");});});
D.getElementById("againKey").addEventListener("click",function(){cur={repo:"quill",room:"now",sub:"changes",branch:"main",merged:false,how:"Squash and merge"};showMid("now-changes");openRight("test");});
dressLeft();showMid("now-changes");openRight("test");
W.addEventListener("load",function(){thumbs(fb);});
})();
