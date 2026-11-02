<style id="r168-css">
/* ============ R168 · BREAK IT DOWN ALWAYS GIVES STEPS (Ingenium 6.4, 24 October 2026) ============ */
.fx-busy-think{font-size:12.5px;line-height:1.5;color:var(--ink-3);font-style:italic;margin:6px 0 0;max-height:4.6em;overflow:hidden;white-space:pre-wrap}
.fx-busy-think:empty{display:none}
.fx-note-calm{font-size:13px;line-height:1.55;color:var(--ink-2);background:var(--accent-softer,rgba(120,90,200,.06));border:1px solid var(--hairline);border-radius:12px;padding:9px 12px;margin:0 0 10px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p89"]="started";}catch(_){}
/* R168 · BREAK IT DOWN ALWAYS GIVES STEPS (Ingenium 6.4). The owner's words (24 October 2026): "The break it down into steps
   do not really work on Ingenium, the model never writes anything and an error message populates". Asked of the real models
   through the app's own engine (Ingenium-HPWindows tools/steps_probe.py), Velox and Scriba wrote good lists, but a model that
   thinks before it answers (most of the lineup, and the Fire tablet's Scriba, which thinks even when asked not to) spent the
   420 words it was given on its thoughts. Its thoughts went nowhere, so nothing showed while it worked, and the page then said
   the answer could not be read; a model not ready, or busy, ended the same way, on an error.
   Now: the thoughts show while they come, under the answer's box, softly; a model that thinks has room to finish; its
   thoughts never count as its answer; a list written only in its thoughts is taken from there; and when no model is ready,
   or it gives no list, the steps are made from the words of the task (the support module's own, the Forge's too), with one
   calm line that says so. Stop leaves the task as it was, with its words still in the box; Use my words instead, beside it,
   stops the model and gives the steps made from the words at once, so a slow device never keeps anyone waiting. */
(function(){
if(typeof supAsk!=="function"||typeof taskBreak!=="function")return;
/* a model's text with its thoughts taken out: thoughts in <think> tags, closed or not, and before a lone </think> */
function split(raw){raw=String(raw||"");var think="",ans=raw;
  ans=ans.replace(/<think>([\s\S]*?)<\/think>/g,function(m,t){think+=t;return "";});
  var o=ans.indexOf("<think>");if(o>=0){think+=ans.slice(o+7);ans=ans.slice(0,o);}
  var c=ans.indexOf("</think>");if(c>=0){think+=ans.slice(0,c);ans=ans.slice(c+8);}
  return {answer:ans.trim(),think:think.trim()};}
function thinks(m){try{var k=lineupKeyOfRec(m);if(k&&ING_LINEUP.models[k])return !!ING_LINEUP.models[k].thinks;}catch(e){}
  return /think|reason|\br1\b|qwq|qwen3|gemma-?4|mellum/i.test(String((m&&m.fileName)||""));}
supAsk=function(prompt,maxTok,onPiece,onThought){var thought="",raw="";
  function piece(t){raw=t;var sp=split(t);if(sp.think&&onThought)try{onThought((thought?thought+"\n":"")+sp.think);}catch(e){}
    if(onPiece&&(sp.answer||!sp.think))onPiece(sp.answer);}
  function done(txt){var sp=split(txt!=null?txt:raw);supAsk.thought=(thought+(sp.think?"\n"+sp.think:"")).trim();return sp.answer;}
  supAsk.thought="";
  if(supUsesLink()){var out0="",keepT=state.thinking,ab=netAbortable();_cloudAb=ab;state.thinking=false;
    var sys0=[ingCoreLayer(true),ingRulesLayer(),ingSupportLayer(true)].filter(Boolean).join("\n\n");
    return ensureCloudModel().then(function(){return cloudChat([{role:"system",content:sys0},{role:"user",content:prompt}],function(t){out0+=t;piece(out0);},
        function(t){thought+=t;if(onThought)try{onThought(thought);}catch(e){}},ab);})
      .then(function(){state.thinking=keepT;_cloudAb=null;return done(out0);},function(e){state.thinking=keepT;_cloudAb=null;throw e;});}
  var m=supModel();
  if(!m||m.fileState!=="ready")return Promise.reject(new Error("Choose a model on this device first (Models, or the model key beside the chat's send arrow)."));
  if(Engine.status==="busy")return Promise.reject(new Error("The model is busy with a reply. Try again when it has finished."));
  var room=(maxTok||500)+(thinks(m)?1600:300);
  return ingEnsureLoaded(m).then(function(){var out="",sys=[ingCoreLayer(false),ingRulesLayer(),ingSupportLayer(false)].filter(Boolean).join("\n\n");
    var params=Object.assign({},modelSampling(m,4,false)||EFFORT_MAP[4]||EFFORT_MAP[3],{max_tokens:room,ctx:4096,thinking:false});
    Engine.setStatus("busy");
    return Engine.generate({messages:[{role:"system",content:sys},{role:"user",content:prompt}],params:params,
        onToken:function(t){out+=t;piece(out);},onThink:function(t){thought+=t;if(onThought)try{onThought(thought);}catch(e){}}})
      .then(function(res){Engine.setStatus("ready");return done(out||(res&&res.text)||"");},
        function(e){Engine.setStatus("ready");throw e;});});};
window.supAsk=supAsk;
/* a list in the answer: numbered or bulleted lines only, so a question or a paragraph is never taken for steps */
function listOf(txt){var out=[];String(txt||"").split(/\r?\n/).forEach(function(l){
    var m=/^\s*(?:\d+[.)]|[-*•]|step\s+\d+[:.)]?)\s+(.+?)\s*$/i.exec(l);if(!m)return;
    var t=m[1].replace(/\*\*|__/g,"").replace(/^\[\s?\]\s*/,"").trim();if(t&&t.length>1)out.push(t.slice(0,240));});
  return out.slice(0,10);}
/* the last list a model wrote in its thoughts (its drafts come first) */
function lastListOf(th){var blocks=String(th||"").split(/\n\s*\n/),best=[];blocks.forEach(function(b){var l=listOf(b);if(l.length>=3)best=l;});return best;}
function offline(title){try{return window.SupportCore.steps(title)||[];}catch(e){return [];}}
var CALM=null;
function why(e){var m=String((e&&e.message)||e||"");
  if(/^Choose a model/.test(m))return "No model is ready on this device, so these steps come from the words of your task. To have a model write them, choose one in Models.";
  if(/busy/i.test(m))return "The model is busy with a reply, so these steps come from the words of your task. You can ask again when it has finished.";
  return "The model could not answer ("+m.replace(/\.$/,"").slice(0,140)+"), so these steps come from the words of your task.";}
var oRender=fxRenderSteps;
fxRenderSteps=function(msg){var r=oRender.apply(this,arguments);try{var h=$("fxSteps");if(!h)return r;
    if(fxBusy){var box=$("fxBusyText");if(box&&!$("fxBusyThink")){var th=el("div","fx-busy-think");th.id="fxBusyThink";th.setAttribute("aria-hidden","true");box.parentNode.insertBefore(th,box.nextSibling);}
      var stop=[].slice.call(h.querySelectorAll(".fx-busy button")).filter(function(b){return b.textContent.trim()==="Stop";})[0];
      if(stop&&!h.querySelector(".fx-words")){var wk=fxBtn(fxBusy.what==="task"?"Use my words instead":"Split it simply instead","ghost fx-words",function(){if(!fxBusy)return;fxBusy.words=true;try{if(supUsesLink())cloudAbort();else Engine.abort();}catch(e){}});
        wk.title="Stop the model, and make the steps from the words of the task now";stop.parentNode.insertBefore(wk,stop.nextSibling);}
      fxPaintBusy();return r;}
    if(CALM&&!msg){var n=el("div","fx-note-calm",CALM);n.setAttribute("role","status");h.insertBefore(n,h.firstChild);CALM=null;}
    var ta=$("fxTaskIn");if(ta&&fxRenderSteps.keep){ta.value=fxRenderSteps.keep;fxRenderSteps.keep="";}
    var sel=h.querySelector(".fx-task-top select");if(sel&&!sel.getAttribute("aria-label"))sel.setAttribute("aria-label","Your tasks");}catch(e){}return r;};
window.fxRenderSteps=fxRenderSteps;
fxPaintBusy=function(){var b=document.getElementById("fxBusyText");if(!b||!fxBusy)return;
  b.textContent=fxBusy.text||(fxBusy.think?"Thinking first…":"…");
  var t=document.getElementById("fxBusyThink");if(t){var s=String(fxBusy.think||"").replace(/\s+/g," ").trim();t.textContent=s?"…"+s.slice(-220):"";}};
window.fxPaintBusy=fxPaintBusy;
function stopped(){return !!(fxBusy&&fxBusy.stop);}
document.addEventListener("click",function(e){var b=e.target&&e.target.closest&&e.target.closest(".fx-busy button");if(b&&fxBusy&&!b.classList.contains("fx-words"))fxBusy.stop=true;},true);
function words(){return !!(fxBusy&&fxBusy.words);}
function ask(prompt,max,title){return supAsk(prompt,max,function(t){if(fxBusy){fxBusy.text=t;fxPaintBusy();}},function(t){if(fxBusy){fxBusy.think=t;fxPaintBusy();}});}
taskBreak=function(title){title=String(title||"").trim();if(!title)return;
  fxBusy={what:"task",title:title,text:"",think:""};fxRenderSteps();
  var prompt="Break this task into small, concrete steps for me.\n\nTask: "+title+"\n\nRules:\n- Between 3 and 8 steps.\n- Each step is one action I can picture myself doing, and starts with a verb.\n- The first step takes less than five minutes.\n- Plain words. No advice, no explanations, no headings.\n\nWrite only the numbered list.";
  function finish(steps,note){fxBusy=null;if(!steps||steps.length<2){steps=offline(title);note=note||"These steps come from the words of your task.";}
    CALM=note||null;taskNew(title,steps);fxRender();}
  var asked="These steps come from the words of your task, as you asked. Change any of them in All steps.";
  ask(prompt,420,title).then(function(txt){if(words())return finish(null,asked);if(stopped()){fxBusy=null;fxRenderSteps.keep=title;fxRenderSteps("Stopped. Nothing was changed.");return;}
      var steps=listOf(txt);if(steps.length<2)steps=lastListOf(supAsk.thought);
      if(steps.length>=2)return finish(steps,null);
      finish(null,supModelName()+" did not write a list this time, so these steps come from the words of your task. Change any of them in All steps.");},
    function(e){if(words())return finish(null,asked);if(stopped()){fxBusy=null;fxRenderSteps.keep=title;fxRenderSteps("Stopped. Nothing was changed.");return;}finish(null,why(e));});};
window.taskBreak=taskBreak;
taskBreakStep=function(t,i){var st=t.steps[i];if(!st)return;fxBusy={what:"step",title:st.t,text:"",think:""};fxRenderSteps();
  var prompt="This step is too big for me to start: \""+st.t+"\" (part of the task \""+t.title+"\").\n\nBreak it into 2 to 5 smaller steps. Each starts with a verb, the first takes less than two minutes, plain words.\n\nWrite only the numbered list.";
  function put(subs,note){fxBusy=null;if(!subs||subs.length<2){subs=["Get ready for: "+st.t,"Do the first two minutes of it","Look at what is left, and choose the next bit"];}
    t.steps.splice.apply(t.steps,[i,1].concat(subs.map(function(x){return {t:x,done:false,sub:true};})));saveState();CALM=note||null;fxRender();}
  ask(prompt,300,st.t).then(function(txt){if(words())return put(null,"The step is split in the simplest way, as you asked. Change any part in All steps.");if(stopped()){fxBusy=null;fxRenderSteps("Stopped. Nothing was changed.");return;}
      var subs=listOf(txt);if(subs.length<2)subs=lastListOf(supAsk.thought);
      put(subs.length>=2?subs:null,subs.length>=2?null:supModelName()+" did not write a list this time, so the step is split in the simplest way. Change any part in All steps.");},
    function(e){if(words())return put(null,"The step is split in the simplest way, as you asked. Change any part in All steps.");if(stopped()){fxBusy=null;fxRenderSteps("Stopped. Nothing was changed.");return;}put(null,why(e).replace("these steps come from the words of your task","the step is split in the simplest way"));});};
window.taskBreakStep=taskBreakStep;
window.__ingStepsFix={split:split,listOf:listOf,lastListOf:lastListOf,thinks:thinks};
})();
;try{window.__ingParts["p89"]="running";}catch(_){}
</script>
