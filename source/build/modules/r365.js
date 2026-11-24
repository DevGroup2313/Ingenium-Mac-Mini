<style id="r365-css">
/* ============ R365 · LECTOR READS WITH YOUR COMPUTER'S MODEL, AND KEEPS READING (Ingenium 7.73, 24 November 2026) ============
   Her words (24 November 2026): "The "Read and written by" section is really confusing when I am sharing a model, it only insists on
   showing me a limited list of models on my device and does not let me choose the stronger model from the Mac mini that I want to use to
   complete the reading so I start the reading but I have no way of knowing which model is being used to do the reading and analysis of
   the apps on the Lector page"; and "I have connected to the Mac mini many times and everytime I start the reading on Lector it gets
   stopped and it never goes through. I want the connections to be stable and consistent".
   Read in the code first: Lector reads with this device's models, or, when the chat is connected to a computer of hers, with that
   computer's model (base page, lxAsk and supUsesLink); its list ("Read and written by", r108) named only this device's models; and a
   request that failed was tried twice more, two seconds apart (r108's ask), so a computer that did not answer for a few seconds ended the
   whole reading.
   Now:
   - The list names each of her paired computers' models too, under the computer's name (On Mac mini), with this device's under On this
     device. Choosing a computer's model connects to it as Your devices does (IngLend.use, sealed as always); Lector, and the chat with it,
     use it from then on, and the list shows it as the choice. Choosing a model on this device leaves the computer.
   - Above the list, one plain line says who reads and writes now: the model and where it runs.
   - When the computer does not answer (no answer, a dropped connection, a busy or failing server), Lector does not stop: it waits and tries
     again, a little longer each time (2 seconds, growing to 30), for up to 15 minutes, looking for the computer again before each try; the
     reading panel says what it is waiting for. When her order of computers (Settings, Who serves your models) lets the first that answers
     serve, and another of her computers answers, Lector moves to it and says so. A refusal (the code, a model the computer does not have)
     still stops, with its words. Stop stops at once. */
#page-lector .r365-who{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 8px;padding:8px 12px;border-radius:12px;font-size:12.8px;line-height:1.4;color:var(--ink-2,#4a4358);
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#faf8fc));box-shadow:var(--pop);transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#page-lector .r365-who:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop))}
#page-lector .r365-who b{color:var(--ink-1,#221a2e)}
#page-lector .r365-who i{width:8px;height:8px;border-radius:50%;background:#1f9d63;box-shadow:0 0 0 3px rgba(31,157,99,.18);flex:0 0 auto}
#page-lector .r365-who.away i{background:#e8902a;box-shadow:0 0 0 3px rgba(232,144,42,.18)}
#page-lector .r365-who.here i{background:var(--accent,#6a3fb5);box-shadow:0 0 0 3px rgba(106,63,181,.16)}
body[data-motion="minimal"] #page-lector .r365-who{transition:none;transform:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p365"]="started";}catch(_){}
/* R365 · Lector reads with your computer's model, and keeps reading: see the note at the top of its styles. window.IngLectorLend */
(function r365(){
"use strict";
if(window.IngLectorLend)return;
var W=window,D=document;
function comps(){try{return (W.IngLend&&IngLend.state().computers)||[];}catch(e){return [];}}
function linked(){try{return typeof W.supUsesLink==="function"&&supUsesLink();}catch(e){return false;}}
function cur(){var c=(W.state&&state.cloud)||{};return linked()&&c.lendId?{id:c.lendId,model:c.model||"",name:c.computer||"your computer"}:null;}
function compOf(id){return comps().filter(function(c){return c.id===id;})[0]||null;}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
/* ---------- the list: this device's models, and each computer's ---------- */
function augment(sel){if(!sel||sel.__r365)return;var cs=comps().filter(function(c){return (c.models||[]).length;});sel.__r365=1;if(!cs.length)return;
  var here=[].slice.call(sel.options),g0=D.createElement("optgroup");g0.label="On this device";here.forEach(function(o){g0.appendChild(o);});sel.appendChild(g0);
  var now=cur();
  cs.forEach(function(c){var g=D.createElement("optgroup");g.label="On "+c.name+(c.status==="ok"?"":" (not answering now)")+" · the chat uses it too";
    c.models.forEach(function(m){var o=D.createElement("option");o.value="lend|"+c.id+"|"+m;o.textContent=m+" · on "+c.name;if(now&&now.id===c.id&&now.model===m)o.selected=true;g.appendChild(o);});sel.appendChild(g);});
  if(now){[].forEach.call(g0.querySelectorAll("option"),function(o){o.selected=false;});}
  var og=sel.onchange;sel.onchange=function(e){var v=sel.value||"";
    if(v.indexOf("lend|")===0){var p=v.split("|"),id=p[1],m=p.slice(2).join("|");try{IngLend.use(id,m);}catch(x){}
      /* Lector's own handler redraws its panel, with the device's choice cleared: the computer reads now */
      sel.value="";if(og){try{og.call(sel,e);}catch(x){}}setTimeout(function(){try{paintWho();}catch(x){}},120);return;}
    if(linked()){try{IngLend.useDevice();}catch(x){}}
    if(og)return og.call(this,e);};
  paintWho();}
/* ---------- one plain line: who reads and writes now ---------- */
function who(){var c=cur();if(c){var k=compOf(c.id),ok=!k||k.status==="ok"||!k.status;return {cls:ok?"":"away",html:"<b>"+esc(c.model||"Its model")+"</b> on <b>"+esc(c.name)+"</b> reads and writes"+(ok?"":", once it answers again")+"."};}
  var sel=D.getElementById("l7HowModel"),t="";if(sel&&sel.selectedIndex>=0){var o=sel.options[sel.selectedIndex];t=o?o.textContent.replace(/ · recommended$/,""):"";}
  return {cls:"here",html:"<b>"+esc(t||"Ingenium's choice")+"</b> on this device reads and writes."};}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function paintWho(){var sel=D.getElementById("l7HowModel");if(!sel)return;var lab=sel.closest("label")||sel.parentNode;if(!lab||!lab.parentNode)return;
  var w=lab.parentNode.querySelector(":scope > .r365-who");if(!w){w=mk("div","r365-who");w.setAttribute("role","status");lab.parentNode.insertBefore(w,lab);}
  var x=who(),cls="r365-who"+(x.cls?" "+x.cls:""),html="<i></i><span>"+x.html+"</span>";if(w.className!==cls)w.className=cls;if(w.__h!==html){w.__h=html;w.innerHTML=html;}}
/* ---------- keep reading: a computer that does not answer is waited for ---------- */
var LIMIT=15*60*1000;
function transient(e){if(!e)return false;var m=String(e.message||e),s=+(e.status||0);if(m==="stopped"||m==="busy")return false;
  if(s===401||s===403||s===404||s===400||s===413||s===422)return false;
  if(s>=500||s===408||s===429)return true;
  return /fetch|network|load failed|timed? ?out|timeout|connection|reset|refused|unreachable|did not answer|no answer|aborted|socket|ECONN|EPIPE|502|503|504|gateway|unavailable|offline/i.test(m);}
function stopped(run){try{return !!((run&&(run.__stopped||run.__cutNow))||(W.LX&&LX.stop));}catch(e){return false;}}  /* 7.75: __cutNow, Vocatio ending a reply that thought too long (r188), is not waited for */
function wrap(){var O=W.lxAsk;if(typeof O!=="function"||O.__r365)return;
  var n=function(run,msgs,maxTok,temp,onPiece){var self=this,a=arguments;if(!linked())return O.apply(self,a);
    var t0=Date.now(),tries=0;
    return new Promise(function(res,rej){(function attempt(){if(stopped(run)){rej(new Error("stopped"));return;}
      O.apply(self,a).then(function(t){res(t);},function(e){if(stopped(run)){rej(e);return;}
        if(!linked()||!transient(e)||Date.now()-t0>LIMIT){rej(e);return;}
        tries++;var wait=Math.min(30000,Math.round(2000*Math.pow(1.6,tries-1))),c=cur(),nm=c?c.name:"your computer";
        try{if(onPiece)onPiece("Waiting for "+nm+" to answer again (try "+tries+", in "+Math.round(wait/1000)+" seconds). Nothing is lost: the reading goes on from here.");}catch(x){}
        if(tries===1){try{W.ingToast(nm+" did not answer. Lector waits for it and goes on.");}catch(x){}}
        setTimeout(function(){if(stopped(run)){rej(new Error("stopped"));return;}var c2=cur();
          var look=c2&&W.IngLend?Promise.resolve(IngLend.check(c2.id,{find:true})).catch(function(){return false;}):Promise.resolve(true);
          look.then(function(ok){
            /* her order of computers lets the first that answers serve: another of hers may take over */
            if(!ok&&tries>=3&&W.IngServe&&IngServe.auto&&IngServe.auto()&&typeof IngServe.pick==="function"){
              return Promise.resolve(IngServe.pick()).then(function(x){if(x&&c2&&x.id!==c2.id){IngLend.use(x.id,c2.model);try{W.ingToast(c2.name+" is away: "+x.name+" reads now.");}catch(y){}try{paintWho();}catch(y){}}});}
          }).then(attempt,attempt);},wait);});})();});};
  n.__r365=1;W.lxAsk=n;try{lxAsk=n;}catch(e){}}
/* ---------- watch Lector's panel: the list is drawn again whenever it paints ---------- */
var T=0;
function scan(){T=0;var sel=D.getElementById("l7HowModel");if(sel&&!sel.__r365)augment(sel);else if(sel)paintWho();}
(function wait(n){if(W.__ingReady===true&&W.lxAsk){wrap();var pg=D.getElementById("page-lector");
    if(pg){try{new MutationObserver(function(){if(!T)T=setTimeout(scan,30);}).observe(pg,{childList:true,subtree:true});}catch(e){}}scan();
    W.addEventListener("ing-lend",function(){try{paintWho();}catch(e){}});return;}
  if(n<240)setTimeout(function(){wait(n+1);},250);})(0);
W.IngLectorLend={version:1,who:who,paint:paintWho,transient:transient,limit:function(){return LIMIT;}};
try{window.__ingParts["p365"]="running";}catch(_){}
})();
</script>
