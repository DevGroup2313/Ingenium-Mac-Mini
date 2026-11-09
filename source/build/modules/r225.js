<style id="r225-css">
/* ============ R225 · EFFORT WHEREVER A MODEL IS CHOSEN (Ingenium 6.17, 4 November 2026) ============
   Her words (3 November 2026): "I want to be able to select low to Max effort and Ultracode inside of the chats and everywhere a model
   can be selected to run a task or do work inside of Ingenium."
   Chat, Code and Blend had it (6.11, 6.12). Measured on 6.16: Lector, the Career Studio and Folders, which share one model (the model
   Lector uses), asked it through lxAsk with thinking always off and the chat's own effort; Build's Ask a model to change this page ran
   the working loop with a fixed number of steps and the chat's thinking. Fabrica chooses no model: it hands work to Chat and Code.
   Now Lector, the Career Studio and Folders share one writing effort, beside their model on each page (one choice, as their model is
   one): Auto, Low to Max, or Ultra. Auto reads quickly (Low) and writes at High through a connection; on this device it stays quick,
   to keep long work moving. Ultra writes at Max, then has each piece checked against its own material, every name, date, number and
   claim, and corrected; a correction that loses the form asked for (its headings, its JSON) is not taken. Build has an effort of its
   own (modules/r190.js), as Chat's: Auto, Low to Max, or Ultracode. */
.wef{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin:10px 0 0}
.wef label{display:inline-flex;align-items:center;gap:8px;font:600 12.5px/1 var(--sans,system-ui,sans-serif);color:var(--ink-2,#4a4358)}
.wef select{font:600 12.5px/1.2 var(--sans,system-ui,sans-serif);color:var(--ink-1,#221a2e);padding:6px 10px;border-radius:10px;border:1px solid var(--hairline,rgba(34,26,46,.14));
  background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f6f2fb));box-shadow:var(--pop,0 1px 2px rgba(40,22,68,.12));max-width:100%}
.wef .wef-say{flex:1 1 220px;min-width:0;font-size:12px;line-height:1.45;color:var(--ink-3,#6c6579)}
#lx7 .wef label{color:var(--l-ink2,#4a4358)}#lx7 .wef .wef-say{color:var(--l-ink3,var(--l-ink2,#6c6579))}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p225"]="started";}catch(_){}
/* R225 · effort wherever a model is chosen: see the note at the top of its styles. window.IngWriteEffort */
(function r225(){"use strict";
if(window.IngWriteEffort)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
var OPTS=[["auto","Auto"],["1","Low"],["2","Medium"],["3","High"],["4","Extra"],["5","Max"],["ultra","Ultra"]];
var FALL=[null,{name:"Low",room:2048,mul:0,line:"Quick replies. It thinks little or not at all."},{name:"Medium",room:4096,mul:0.5,line:"Everyday work. It thinks briefly before it answers."},
  {name:"High",room:8192,mul:1,line:"Careful work. It thinks before it answers. The usual choice."},{name:"Extra",room:16384,mul:2,line:"Hard problems. It thinks longer and may write longer replies."},
  {name:"Max",room:32768,mul:4,line:"The most thinking and the longest replies the model allows. The slowest."}];
function LV(){return (W.IngEffort&&IngEffort.levels)||FALL;}
function get(){var v=W.state&&state.wEff;return v==="auto"||v==="ultra"||/^[1-5]$/.test(String(v))?String(v):"auto";}
function set(v){state.wEff=String(v);try{saveState();}catch(e){}paintAll();}
function says(v){if(v==="auto")return "Auto: reading quickly (Low); writing at High through a connection, and quickly on this device. Shared by Lector, the Career Studio and Folders.";
  if(v==="ultra")return "Ultra: Max, then each piece written is checked against its own material, every name, date, number and claim, and corrected. About twice the time.";
  var L=LV()[+v];return (L?L.line+" ":"")+"Shared by Lector, the Career Studio and Folders.";}

/* ================= 1. which effort a request is given ================= */
var READ=/^You are Lector, a careful reader|^You read and advise on this device for the applicant/;
function sysOf(msgs){var m=msgs&&msgs[0];return m&&m.role==="system"?String(m.content||""):"";}
function reading(msgs){return READ.test(sysOf(msgs));}
function linked(){try{return !!((typeof supUsesLink==="function"&&supUsesLink())||(typeof lxUsesCloud==="function"&&lxUsesCloud()));}catch(e){return false;}}
function levelFor(msgs,link){var v=get();if(v==="ultra")return {lv:5,ultra:true};if(v!=="auto")return {lv:+v};
  if(reading(msgs))return {lv:1,auto:true,why:"reading"};
  return link?{lv:3,auto:true,why:"writing, through a connection"}:{lv:1,auto:true,why:"on this device, kept quick"};}
var STATS={asked:0,checks:0,changed:0,kept:0,last:null};

/* ================= 2. the effort, put on the request where lxAsk makes it (build_page.py, 6.17), under every wrapper ================= */
function room(E){var L=LV()[E.lv]||FALL[3],base=0;try{base=typeof replyTokens==="function"?+replyTokens():0;}catch(e){}if(!base){try{base=+$("ctlTokens").value||0;}catch(e){}}return Math.max(base||1024,L.room||0);}
function onCloud(ab,msgs){if(!ab)return;var E=levelFor(msgs,true);ab.effort=E.lv;ab.think=E.lv>=2;ab.maxTok=room(E);
  STATS.last={lv:E.lv,ultra:!!E.ultra,auto:!!E.auto,why:E.why||"",reading:reading(msgs),link:true,think:ab.think,maxTok:ab.maxTok,at:Date.now()};}
function onLocal(params,m,msgs){if(!params)return;var E=levelFor(msgs,false),think=E.lv>=2,L=LV()[E.lv]||FALL[1],pb=+(m&&m.paramB)||0;
  var bud=think?Math.round((pb&&pb<=4.5?1536:pb&&pb<=10?3072:6144)*(+L.mul||0)):0;
  if(think){var temp=params.temperature;try{var ts=modelSampling(m,3,true);if(ts)Object.assign(params,ts);}catch(e){}params.temperature=temp;params.thinking=true;if(bud>0){params.thinking_budget=bud;params.max_tokens=(+params.max_tokens||1024)+bud;}}
  STATS.last={lv:E.lv,ultra:!!E.ultra,auto:!!E.auto,why:E.why||"",reading:reading(msgs),link:false,think:think,budget:bud,at:Date.now()};}
/* Ultra: the piece written, checked against its own material and corrected, through the same wrappers; a correction that loses the
   form asked for (its headings, its JSON) or most of its length is not taken */
var CHECK="Now check what you wrote against the material in my message above, statement by statement: every name, date, number, title, place, claim and quotation must be shown by that material. Correct or remove anything it does not show, and change nothing else. Reply with the corrected text only, in exactly the form and about the length asked for before, with no note about the check.";
function shapeOk(draft,fixed){var d=String(draft||"").trim(),f=String(fixed||"").trim();if(!f||f.length<d.length*0.5)return false;
  if(/^[\[{]/.test(d)){var dj=true;try{JSON.parse(d);}catch(e){dj=false;}if(dj){try{JSON.parse(f);}catch(e){return false;}}}
  var marks=d.match(/^[A-Z][A-Z \-]{2,40}:/gm)||[];for(var i=0;i<marks.length;i++)if(f.indexOf(marks[i])<0)return false;
  return true;}
(function wrapAsk(){var prev=W.lxAsk;if(typeof prev!=="function"||prev.__r225)return;
  var n=function(run,msgs,maxTok,temp,onPiece){var self=this,args=arguments;STATS.asked++;
    if(get()!=="ultra"||reading(msgs)||!Array.isArray(msgs))return prev.apply(self,args);
    return prev.apply(self,args).then(function(draft){var d=String(draft==null?"":draft);if(d.trim().length<40)return draft;STATS.checks++;
      var m2=msgs.concat([{role:"assistant",content:d},{role:"user",content:CHECK}]);
      return prev.call(self,run,m2,maxTok,temp,onPiece).then(function(fixed){var ok=shapeOk(d,fixed);if(ok&&String(fixed).trim()!==d.trim())STATS.changed++;if(!ok)STATS.kept++;
          if(!ok&&onPiece)try{onPiece(d);}catch(_){}return ok?fixed:draft;},
        function(e){var msg=String(e&&e.message||e);if(/stop|abort/i.test(msg))throw e;STATS.kept++;return draft;});});};
  try{Object.keys(prev).forEach(function(k){n[k]=prev[k];});}catch(e){}n.__r225=1;W.lxAsk=lxAsk=n;})();

/* ================= 3. the choice, beside the model, on each page that uses it ================= */
function control(where){var w=mk("div","wef");w.setAttribute("data-wef",where);var lab=mk("label"),sp=mk("span",null,"Effort");lab.appendChild(sp);
  var sel=D.createElement("select");sel.setAttribute("aria-label","Writing effort, shared by Lector, the Career Studio and Folders");
  OPTS.forEach(function(o){var op=D.createElement("option");op.value=o[0];op.textContent=o[1];sel.appendChild(op);});sel.value=get();
  sel.onchange=function(){set(sel.value);};lab.appendChild(sel);w.appendChild(lab);w.appendChild(mk("span","wef-say",says(get())));return w;}
function paintAll(){var v=get();[].forEach.call(D.querySelectorAll(".wef"),function(w){var s=w.querySelector("select");if(s&&s.value!==v)s.value=v;var t=w.querySelector(".wef-say");if(t)t.textContent=says(v);});}
function place(){if(typeof W.lxAsk!=="function")return;
  var lm=$("l7Model");if(lm&&!lm.querySelector(".wef"))lm.appendChild(control("lector"));
  var cs=$("cs");if(cs&&!cs.querySelector(".wef")){var note=[].filter.call(cs.querySelectorAll(".c-note"),function(n){return /Nothing is searched online unless you press for it\./.test(n.textContent);})[0];
    if(note&&note.parentNode){var cc=control("career");if(note.classList.contains("c-pad"))cc.classList.add("c-pad");cc.style.marginTop="2px";note.parentNode.insertBefore(cc,note.nextSibling);}}
  var fp=$("page-folders");if(fp){var wl=[].filter.call(fp.querySelectorAll(".card"),function(c){var h=c.querySelector("h2,h3");return h&&/^Where we left off/.test(h.textContent.trim());})[0];
    if(wl&&!wl.querySelector(".wef")){var row=wl.querySelector(".fld-row");(row||wl).appendChild(control("folders"));}}}
var pend=0;function soon(){if(pend)return;pend=requestAnimationFrame(function(){pend=0;try{place();}catch(e){}});}
var MOS=[];function watch(){["lx7","cs","page-folders"].forEach(function(id){var el=$(id);if(!el||el.__r225)return;el.__r225=1;try{var mo=new MutationObserver(soon);mo.observe(el,{childList:true,subtree:true});MOS.push(mo);}catch(e){}});soon();}

/* ================= 4. the Guide says where effort is chosen now ================= */
function guide(){var c=$("guideEffortCard");if(!c||c.querySelector("[data-r225]"))return;var dl=c.querySelector("dl")||c.appendChild(mk("dl"));
  var dt=mk("dt",null,"Beyond Chat and Code");dt.setAttribute("data-r225","1");dl.appendChild(dt);
  dl.appendChild(mk("dd",null,"Blend has its own effort, in its steps. Build has its own, beside How should it work: Auto, Low to Max, or Ultracode. Lector, the Career Studio and Folders share one writing effort, beside their model, as they share the model: Auto reads quickly and writes at High through a connection (quickly on this device); Ultra writes at Max and then checks each piece against its own material, and corrects it. Fabrica chooses no model: it hands work to Chat and Code."));}

function boot(){try{watch();}catch(e){}try{guide();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function later(){var n=0;(function wait(){if(W.__ingReady===true){boot();setTimeout(boot,2500);return;}if(++n<400)setTimeout(wait,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r225)return;var ng=function(p){var r=og.apply(this,arguments);try{if(/^(lector|career|folders)$/.test(p))watch();if(p==="guide")guide();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r225=true;W.go=go=ng;})();
W.IngWriteEffort={get:get,set:set,levelFor:levelFor,onCloud:onCloud,onLocal:onLocal,stats:STATS,shapeOk:shapeOk,check:CHECK,place:place};
})();
;try{window.__ingParts["p225"]="running";}catch(_){}
</script>
