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
function showMid(k){M.innerHTML=V[k]||V["now-changes"];if(!still())[].forEach.call(M.querySelectorAll(".f-pn-b"),function(b){b.style.animation="none";void b.offsetWidth;b.style.animation="";});
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
  if(k==="story-history"){[].forEach.call(M.querySelectorAll(".h-cmt,.f-ver,.f-vrow,[class*=ver]"),function(x){});}
  if(k==="now-files"){var rows=M.querySelectorAll(".f-file,.h-file,.f-fl,li");var last=rows[rows.length-1];if(last&&last.parentNode){var big=last.cloneNode(true);
      [].forEach.call(big.querySelectorAll("*"),function(n){if(n.children.length===0&&/\S/.test(n.textContent)&&!/^\d/.test(n.textContent.trim()))n.textContent="";});
      var tn=[].filter.call(big.querySelectorAll("*"),function(n){return n.children.length===0;})[0];if(tn)tn.textContent="models/quill-base.gguf · 1.4 GB · kept whole, read from the drive when opened";last.parentNode.appendChild(big);}}}
M.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("button,a,[role=button],.h-row,.h-item");if(!b||!M.contains(b))return;
  if(b.classList.contains("fr-room")){var rm=b.getAttribute("data-room");if(ROOMS[rm]){cur.room=rm;cur.sub=ROOMS[rm][0];showMid(key());}return;}
  var t=txt(b).replace(/\s*\d+$/,"");
  for(var s in SUBN)if(SUBN[s]===t&&ROOMS[cur.room].indexOf(s)>=0){cur.sub=s;showMid(key());return;}
  if(cur.room==="plans"&&cur.sub==="pulls"&&/Night mode for the reader/.test(txt(b))){showMid("plans-pr");return;}
  if(/All pull requests/.test(t)){cur.sub="pulls";showMid(key());return;}
  if(b.hasAttribute("data-pv")||b.hasAttribute("data-pv-branch")||b.classList.contains("pv-ask")||b.closest("#hPrMergeBox"))return;
  if(b.tagName==="BUTTON"&&!b.closest(".f-seg"))say("In the app: "+t.toLowerCase()+".");});

/* ---------- your repositories: on this computer, and in this window ---------- */
function dressLeft(){var list=L.querySelector(".f-repos");if(!list)return;var tiles=[].slice.call(list.querySelectorAll(".f-repo"));
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
function showRight(p){RT.innerHTML=R[p==="ingenium"?"Test":p.charAt(0).toUpperCase()+p.slice(1)]||R.Test;dressRight(p);requestAnimationFrame(function(){thumbs(RT);});}
function openRight(p){part=p;showRight(p);}
function dressRight(p){var tabs=RT.querySelector('[role="tablist"],.f-seg');var copies=RT.querySelector("#fbPart_copies");
  if(copies&&!RT.querySelector("#fbPart_ingenium")){var ing=copies.cloneNode(true);ing.id="fbPart_ingenium";ing.setAttribute("data-part","ingenium");ing.textContent="Ingenium";copies.parentNode.insertBefore(ing,copies.nextSibling);}
  [].forEach.call(RT.querySelectorAll(".fr-part"),function(b){var on=b.getAttribute("data-part")===p;b.setAttribute("aria-selected",on?"true":"false");b.tabIndex=on?0:-1;
    b.onclick=function(e){e.preventDefault();openRight(b.getAttribute("data-part"));};});
  if(p==="ingenium"){[].forEach.call(RT.querySelectorAll('[id^="fbPartSec_"]'),function(s){s.hidden=true;});var host=RT.querySelector('[id^="fbPartSec_"]');host=host?host.parentNode:RT.querySelector(".f-pn-b")||RT;
    var box=el("div","pv-ing");box.innerHTML='<div class="pv-ing-h"><b>Beyond GitHub, with Ingenium</b><span class="f-chip">Offline</span></div>'+
      '<p class="f-hint">Your model on this Mac, Magister, reads the repository and answers here. Nothing is sent anywhere.</p>';
    var keys=el("div","pv-asks");[["explain","Explain the newest version"],["review","Review the open pull request"],["notes","Write the release notes"],["message","Write the message for my changes"]].forEach(function(a){
      var b=el("button","f-btn",a[1]);b.type="button";b.addEventListener("click",function(){ask(a[0]);});keys.appendChild(b);});box.appendChild(keys);
    box.appendChild(el("div","pv-ans","<p class=\"f-hint\">Press a key above: the answer is written here.</p>"));
    var f=el("form","pv-find");f.innerHTML='<input type="search" placeholder="Find in every repository, by words or by meaning" aria-label="Find in every repository"><button class="f-btn" type="submit">Find</button>';
    f.addEventListener("submit",function(e){e.preventDefault();var q=f.querySelector("input").value.trim();var hits=box.querySelector(".pv-hits");hits.innerHTML="";if(!q){hits.appendChild(el("p","f-hint","Type a word, or what you mean."));return;}
      [["quill-notes","app/reader.js · line 3","return matchMedia(\"(prefers-color-scheme: dark)\").matches?\"night\":\"day\";"],["harbour-garden","garden.html · line 812","function theme(){ return state.theme || \"day\"; }"],["ledger","docs/backup.md · line 12","A second copy of the accounts on another drive, checked each week."]].forEach(function(h){
        hits.appendChild(el("div","pv-hit","<b>"+h[0]+"</b> · "+h[1]+"<code>"+h[2].replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];})+"</code>"));});say("3 found in 3 repositories, by what they mean.");});
    box.appendChild(f);box.appendChild(el("div","pv-hits"));
    var more=el("div","pv-more");[["Open any version as the app itself","The app as it was on any day, running in a window of its own, beside today's."],["A second copy on another drive","Kept in step and checked every Sunday: one broken drive loses nothing."],["Its folder in Folders","Its conversations, where you left off and how it was built, one press away."]].forEach(function(m){
      var b=el("button","f-ck pv-ck",'<span class="m">✦</span><div>'+m[0]+"<small>"+m[1]+"</small></div>");b.type="button";b.addEventListener("click",function(){say("In the app: "+m[0].toLowerCase()+".");});more.appendChild(b);});
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
