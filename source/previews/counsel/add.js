(function(){
var ORDER=["have0","have","record0","record","want","aims","go","week"],NEXT={have:"record0",record0:"record",record:"want",want:"aims",aims:"go",go:"week"},PREV={record0:"have",record:"have",want:"record",aims:"want",go:"aims",week:"go"};
var RAIL={0:"have",1:"record",2:"want",3:"go",4:"week"};
var cur="have",th="day",main=document.getElementById("pvMain"),win=document.getElementById("win"),toastEl=document.getElementById("pvToast"),tt=null;
function toast(t){toastEl.textContent=t;toastEl.hidden=false;clearTimeout(tt);tt=setTimeout(function(){toastEl.hidden=true;},3200);}
function pics(){[].forEach.call(win.querySelectorAll("img[data-day]"),function(im){im.src=im.getAttribute("data-"+th);});}
function show(key){if(!SHOTS[key+"_"+th])return;cur=key;main.innerHTML=SHOTS[key+"_"+th];var cs=main.querySelector("#cs");if(cs&&HS[key+"_"+th])cs.style.setProperty("--c-h",HS[key+"_"+th]);
  [].forEach.call(document.querySelectorAll(".pv-k[data-s]"),function(b){b.classList.toggle("on",b.getAttribute("data-s")===key);});wire();main.scrollTop=0;try{location.hash=key;}catch(e){}}
function textOf(b){return (b.textContent||"").trim();}
function wire(){
  [].forEach.call(main.querySelectorAll(".c-list .c-item"),function(b,i){b.addEventListener("click",function(e){e.preventDefault();var k=RAIL[i];if(k)show(k==="have"?"have":k);});});
  [].forEach.call(main.querySelectorAll(".c-pn-f .c-btn, .cn-drop .c-btn, .c-src .c-btn, .cn-row .c-btn, .cn-sec .c-btn, .c-entry .c-btn, .c-list .cn-foot .c-btn, .c-pn-h .c-btn"),function(b){b.addEventListener("click",function(e){e.preventDefault();var t=textOf(b);
    if(/^Next/.test(t)){if(NEXT[cur])show(NEXT[cur]);return;}if(t==="Back"){if(PREV[cur])show(PREV[cur]);return;}
    if(/^Build my record|^Find more|^Read my sources/.test(t)){show("record");toast("In the app: the model reads your sources once, with its reasoning in view, and every entry and skill found is kept at once, marked found.");return;}
    if(t==="Looks right"){var r=b.closest(".cn-row");if(r){r.classList.remove("is-found");b.parentNode.removeChild(b);}return;}
    if(/^Looks right, all/.test(t)){var sec=b.closest(".cn-sec"),n=sec&&sec.nextElementSibling;while(n&&n.classList.contains("cn-row")){n.classList.remove("is-found");var k=n.querySelector(".c-btn");if(k&&textOf(k)==="Looks right")k.parentNode.removeChild(k);n=n.nextElementSibling;}b.parentNode.removeChild(b);return;}
    if(t==="Remove"){var r2=b.closest(".cn-row");if(r2)r2.parentNode.removeChild(r2);return;}
    if(/^Finish/.test(t)){show("go");toast("In the app: the answers go to Your profile, the two aims become goals, and stage 4 runs by itself (Stop stops it).");return;}
    if(/^Think it through/.test(t)){toast("In the app: what transfers, blind spots, what sets you apart, the paths and the aims' steps, in one run, with the model's reasoning in view.");return;}
    if(/^Let the counsellor work/.test(t)){toast("In the app: reads your sources, finds your edge and the paths, looks at your CV: every stage the model can do, one after another. Stop stops it; what was finished is kept.");return;}
    if(/^Begin another profile/.test(t)){toast("In the app: a new profile beside yours, with its own counsellor at stage 1. Nothing mixed.");return;}
    if(/^Do it for me/.test(t)){toast("In the app: the model looks at the document with you (never rewriting it), and the item is done.");return;}
    if(/^Go there|^Read them|^Look at it with me|^Open Today|^Open your profile|^Open Lector|^See it all|^More$|^A goal now|^Make it a goal|^Copy/.test(t)){toast("In the app this opens that place: "+t+".");return;}
    if(/^Add|^Replace|^Read it again|^Drop your files/.test(t)){toast("In the app: the system's file picker; several files at once, sorted by what they are.");return;}
    if(/^Skip$/.test(t)){toast("Skip leaves the question unanswered; the next one comes.");return;}
    if(/^I would rather type/.test(t)){toast("In the app: Your profile, Your entries, with an empty entry to fill.");return;}
    toast("In the app: "+t+".");});});
  [].forEach.call(main.querySelectorAll(".cn-chips .c-pill"),function(b){b.addEventListener("click",function(e){e.preventDefault();b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")==="true"?"false":"true");});});
  [].forEach.call(main.querySelectorAll(".cn-aim"),function(b){b.addEventListener("click",function(e){e.preventDefault();var on=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",on?"true":"false");var t=b.querySelector(".cn-tick");if(t)t.textContent=on?"✓ An aim":"Not an aim";});});
  [].forEach.call(main.querySelectorAll(".cn-drop"),function(d){d.addEventListener("click",function(e){if(e.target.closest(".c-btn"))return;toast("In the app: drop files here, or press the key: several at once, sorted by what they are.");});});
  [].forEach.call(main.querySelectorAll(".rm-tab"),function(b){b.addEventListener("click",function(e){e.preventDefault();var r=b.getAttribute("data-room");if(r==="mentor")return;toast("In the app this opens "+textOf(b)+", unchanged. This preview shows the counsellor's room.");});});
  [].forEach.call(main.querySelectorAll("input[type=checkbox]"),function(c){c.addEventListener("change",function(){var r=c.closest(".cn-row");if(r)r.classList.toggle("is-done",c.checked);});});
  [].forEach.call(main.querySelectorAll("select, input[type=text], textarea"),function(x){x.addEventListener("keydown",function(e){e.stopPropagation();});});
  [].forEach.call(main.querySelectorAll("a[href]"),function(a){a.addEventListener("click",function(e){e.preventDefault();});});}
[].forEach.call(document.querySelectorAll(".pv-k[data-s]"),function(b){b.addEventListener("click",function(){show(b.getAttribute("data-s"));});});
[].forEach.call(document.querySelectorAll(".pv-k[data-th]"),function(b){b.addEventListener("click",function(){th=b.getAttribute("data-th");[].forEach.call(document.querySelectorAll(".pv-k[data-th]"),function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});
  document.body.setAttribute("data-theme",th);pics();show(cur);});});
function fit(){var st=document.getElementById("pvStage"),w=st.clientWidth,k=Math.min(1,w/1440);win.style.transform="scale("+k+")";st.style.height=Math.round(900*k)+"px";}
window.addEventListener("resize",fit);
document.body.setAttribute("data-theme","day");pics();var h=(location.hash||"").replace(/^#/,"");show(ORDER.indexOf(h)>=0?h:"have");fit();
window.addEventListener("hashchange",function(){var k=(location.hash||"").replace(/^#/,"");if(ORDER.indexOf(k)>=0&&k!==cur)show(k);});
})();
