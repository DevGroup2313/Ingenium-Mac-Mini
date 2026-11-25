<script>try{(window.__ingParts=window.__ingParts||{})["p397"]="started";}catch(_){}
/* ============ R397 · ONE MODEL, ONE TASK AT A TIME: WHO IS USING IT (Ingenium 7.94, 25 November 2026) ============
   Her words (25 November 2026): "the Vocatio page is working much better but the notifications are out of wack and keep saying the model
   is busy and can't finish when I can clearly see the model working and writing still, this needs to be fixed as well."
   Found: (1) 7.88's background step that brings an app's folder up to date after three quiet minutes (r390's autoTick) asked only whether
   Ingenia itself was busy, so during a long Vocatio reading (she watches, she does not type) it took the model between two of Vocatio's
   parts; Vocatio's next part found the model busy, waited five minutes at most, and then said "It could not be finished: busy" while the
   model went on writing the folder's summary. The memory that notes a chat (r271) asked only whether the engine was busy at that moment.
   (2) When a request ended in an error while the model went on writing (a reply from a lent model longer than the ten minutes its request
   was given, through r206), Vocatio asked again at once; the model, still writing the first, answered that it was busy, and Vocatio gave up.
   Now: window.ingModelInUse(grace, except) says who is using the model (Lector, Vocatio, Ingenia, Memory, a reply), or who did within
   the last grace milliseconds; the background steps (r390, r271) wait until nothing has used it for a while; Vocatio (r188) waits as long
   as the model is working, saying for whom, and goes on by itself when it is free; and a reply from a lent model may take 30 minutes. */
(function r397(){"use strict";
if(window.ingModelInUse)return;var W=window,LAST=0,WHO="";
function now(except){var L=[];
  try{if(W.LX&&(LX.busy||LX.inFlight))L.push("Lector");}catch(e){}
  try{if(W.IngFolders&&IngFolders.run&&IngFolders.run.busy)L.push("Ingenia, bringing an app's folder up to date");}catch(e){}
  try{if(W.IngChatMemory&&IngChatMemory.noting&&IngChatMemory.noting())L.push("Memory, noting a chat");}catch(e){}
  try{var R=W.IngCareer&&IngCareer.ui&&IngCareer.ui.RUN;if(R&&R.busy)L.push("Vocatio");}catch(e){}
  try{if(W.Engine&&Engine.status==="busy")L.push("a reply");}catch(e){}
  try{if(W._cloudAb)L.push("a reply");}catch(e){}
  L=L.filter(function(x){return x!==except;});return L[0]||"";}
setInterval(function(){var w=now();if(w){LAST=Date.now();WHO=w;}},1000);
W.ingModelInUse=function(grace,except){var w=now(except);if(w)return w;if(grace&&Date.now()-LAST<grace&&WHO!==except)return WHO||"a reply";return "";};
/* a reply from a lent model (another of her computers) is given 30 minutes rather than 10: a long document is written within it */
(function lent(){var nf=W.netFetch;if(typeof nf!=="function"||nf.__r397)return;var n=function(url,o){if(o&&o.timeout===600&&typeof o.onChunk==="function")o=Object.assign({},o,{timeout:1800});W.__r397t=o&&o.timeout;return nf.call(this,url,o);};
  n.__r397=1;W.netFetch=n;try{netFetch=n;}catch(e){}})();
})();
;try{window.__ingParts["p397"]="running";}catch(_){}
</script>
