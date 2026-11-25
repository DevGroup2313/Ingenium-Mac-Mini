<style id="r379-css">
/* ============ R379 · THE GUIDED TOUR, STAGE 4: AN AI OF HER OWN, BUILT (Ingenium 7.80, 25 November 2026) ============
   Her request (24 November 2026): "I want live demonstrations added to the Guided Tour to showcase all of Ingenium's pages ...
   specifically curated to showcase each page being used to complete a specific task". The last page without one was the models' page.
   Its task: an AI of her own, built through the page's own builder (Build your own AI), step by step as she would build one: its name,
   symbol, colour and purpose; its base model (the builder's own suggestion); how it works; an example that teaches it; its knowledge
   and settings left as they are; then Try it and save, which shows what the model will be told, and saves it into Your own AIs. The
   builder's own Save is pressed; only the conversation it would open next is not opened, so the tour stays on the page. The AI is the
   tour's own (a garden helper for houseplants) and is removed when the tour ends, with nothing else changed. */
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p379"]="started";}catch(_){}
/* R379 · the guided tour, stage 4: see the note at the top of its styles. window.IngTour379: {added(), clear()} */
(function r379(){"use strict";
if(window.IngTour379)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function touring(){return D.body.classList.contains("touring")||!!$("ingTour");}
function lively(){try{return typeof tourLively==="function"?tourLively():true;}catch(e){return true;}}
function later(fn,ms){try{return tourLater(fn,ms);}catch(e){return setTimeout(fn,ms);}}
function every(fn,ms){var iv=setInterval(function(){try{fn();}catch(e){clearInterval(iv);}},ms);try{tourTimers.push(iv);}catch(e){}return iv;}
function play(total,ms,tick,end){if(!lively()||total<=0){tick(total);if(end)end();return;}var t0=Date.now(),last=-1;
  every(function(){var n=Math.min(total,Math.floor((Date.now()-t0)/ms)+1);if(n!==last){last=n;tick(n);}if(n>=total){if(end)end();throw 0;}},Math.max(16,Math.min(ms,60)));}
function save(){try{saveState();}catch(e){}}
var NAME="Garden helper";
var FIELDS0=[["Name","name",NAME],["Symbol","emoji","🌿"],["What it is for","purpose","Help me look after my houseplants: when to water each one, how much light it wants, and what yellow or brown leaves mean."]];
var FIELDS2=[["Role","role","A patient gardener who knows houseplants well"],["How it works","method","First ask which plant and where it stands. Then give one clear step to take today, and one sign to watch for this week."],["Tone","tone","Calm and plain"]];
var EXQ="My basil's lower leaves are turning yellow. What should I do?";
var EXA="Yellow lower leaves on basil most often mean too much water. Let the top two centimetres of soil dry before you water again, and empty the saucer under the pot. Watch the new leaves this week: if they stay green, that was the cause.";
function ok(){return !!($("page-models")&&typeof W.openAIBuilder==="function"&&$("aiCard"));}
function builder(){return D.querySelector(".aib-box");}
function fieldIn(label){var b=builder();if(!b)return null;var ls=b.querySelectorAll("#aibBody label.field");for(var i=0;i<ls.length;i++){var s=ls[i].querySelector("span");if(s&&s.textContent.trim()===label)return ls[i].querySelector("input,textarea");}return null;}
function type(el,text,ms,end){if(!el){if(end)end();return;}el.value="";try{el.focus({preventScroll:true});}catch(e){}
  play(text.length,ms,function(n){el.value=text.slice(0,n);try{el.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}},end);}
function chain(steps){var i=0;(function next(){if(i>=steps.length)return;var s=steps[i++];try{s(function(){later(next,lively()?450:1);});}catch(e){try{console.warn("Ingenium tour (r379):",e);}catch(_){}}})();}
function nextKey(done){var k=builder()&&builder().querySelector("#aibNext");if(k)k.click();if(done)done();}
/* the builder's own Save opens a conversation with the new AI; during the tour that step is held, and the AI is marked as the tour's */
var holding=false;
(function wrapStart(){var o=W.aiStartChat;if(typeof o!=="function"||o.__r379)return;
  var n=function(ai){if(holding&&ai&&ai.name===NAME){holding=false;var a=(state.ownAIs||[]).filter(function(x){return x.id===ai.id;})[0];if(a){a.__tour=true;save();}try{renderOwnAIs();}catch(e){}
      try{tourRing("#aiList .ai-row:last-child",6);}catch(e){}return;}return o.apply(this,arguments);};n.__r379=1;W.aiStartChat=aiStartChat=n;})();
function demo(){if(!ok())return;try{if(W.IngRooms&&typeof IngRooms.reveal==="function")IngRooms.reveal($("aiCard"));}catch(e){}
  drop();try{closeModal();}catch(e){}
  later(function(){try{openAIBuilder();}catch(e){return;}var t=lively()?26:1;
    chain([
      function(d){type(fieldIn("Name"),FIELDS0[0][2],t,d);},
      function(d){var e=fieldIn("Symbol");if(e){e.value=FIELDS0[1][2];e.dispatchEvent(new Event("input",{bubbles:true}));}
        /* its colour: Jade, from the builder's own swatches */
        var sw=builder()&&[].filter.call(builder().querySelectorAll(".aib-sw .sn-dot"),function(x){return /jade/i.test(x.title);})[0];if(sw)sw.click();d();},
      function(d){type(fieldIn("What it is for"),FIELDS0[2][2],lively()?14:1,d);},
      function(d){nextKey(function(){later(d,lively()?1600:1);});},          /* the base model: the builder's own suggestion */
      function(d){nextKey(d);},
      function(d){type(fieldIn("Role"),FIELDS2[0][2],t,d);},
      function(d){type(fieldIn("How it works"),FIELDS2[1][2],lively()?12:1,d);},
      function(d){type(fieldIn("Tone"),FIELDS2[2][2],t,d);},
      function(d){nextKey(d);},
      function(d){var b=builder(),add=b&&[].filter.call(b.querySelectorAll("#aibBody button"),function(x){return x.textContent.trim()==="Add an example";})[0];if(add)add.click();
        later(function(){var ta=builder()&&builder().querySelectorAll(".aib-excard textarea");if(!ta||ta.length<2){d();return;}type(ta[ta.length-2],EXQ,lively()?18:1,function(){type(ta[ta.length-1],EXA,lively()?10:1,d);});},lively()?300:1);},
      function(d){nextKey(d);},                                               /* knowledge: no files */
      function(d){nextKey(d);},                                               /* settings, as they are */
      function(d){nextKey(function(){later(d,lively()?2600:1);});},          /* Try it and save: what the model will be told */
      function(d){holding=true;nextKey(d);}]);},lively()?600:1);}
function drop(){var mine=(state.ownAIs||[]).filter(function(a){return a&&(a.__tour||(a.name===NAME&&a.__r379));});
  var any=(state.ownAIs||[]).some(function(a){return a&&a.__tour;});
  if(any){var ids={};(state.ownAIs||[]).forEach(function(a){if(a&&a.__tour)ids[a.id]=1;});state.ownAIs=state.ownAIs.filter(function(a){return !(a&&a.__tour);});
    (state.chats||[]).forEach(function(c){if(c&&ids[c.aiId])delete c.aiId;});save();try{renderOwnAIs();}catch(e){}try{paintChips();}catch(e){}}
  return any||mine.length>0;}

/* ================= the card ================= */
var S={own:{r379:1,levels:["new","some"],go:function(){try{go("models");}catch(e){}try{if(W.IngRooms&&IngRooms.reveal)IngRooms.reveal($("aiCard"));}catch(e){}},ring:"#aiCard",demo:"r379Own",
  t:"🌿 An AI of your own, built",
  b:"Watch: the builder makes a garden helper for houseplants, step by step: its name, symbol, colour and what it is for; the base model the builder suggests for it on this device; how it works; an example that teaches it the answers you want; then Try it and save, which shows exactly what the model will be told, and keeps it in Your own AIs, ready to chat with. It is the tour's own example and is removed when the tour ends."}};
function bare(t){return String(t||"").replace(/^[^A-Za-z]+/,"").trim();}
function apply(){if(touring()||!Array.isArray(W.ING_TOUR)||ING_TOUR.indexOf(S.own)>=0||!ok())return;
  var at=-1;ING_TOUR.forEach(function(s,i){if(s.sub==="Your own AIs")at=i;});if(at<0)return;S.own.chap=ING_TOUR[at].chap;ING_TOUR.splice(at+1,0,S.own);try{tourPaintEntry();}catch(e){}}
(function wrapDemo(){var o=W.tourDemoRun;if(typeof o!=="function"||o.__r379)return;
  var n=function(name){if(name==="r379Own"){try{demo();}catch(e){}return;}return o.apply(this,arguments);};n.__r379=1;W.tourDemoRun=tourDemoRun=n;})();
(function wrapClear(){var o=W.tourDemoClear;if(typeof o!=="function"||o.__r379)return;
  var n=function(){var r=o.apply(this,arguments);holding=false;try{drop();}catch(e){}return r;};n.__r379=1;W.tourDemoClear=tourDemoClear=n;})();
function boot(){try{if(!touring())drop();}catch(e){}try{apply();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function wait(){var n=0;(function w(){if(W.__ingReady===true){boot();setTimeout(boot,2500);setTimeout(boot,6000);return;}if(++n<400)setTimeout(w,500);})();})();
W.IngTour379={added:function(){return ING_TOUR.indexOf(S.own)>=0?[S.own.chap+": "+bare(S.own.t)]:[];},clear:drop};
})();
;try{window.__ingParts["p379"]="running";}catch(_){}
</script>
