<script>try{(window.__ingParts=window.__ingParts||{})["p273"]="started";}catch(_){}
/* ============ R273 · A MODEL IS NEVER KEPT WAITING BEHIND A READ-AHEAD (Ingenium 6.80, 11 November 2026) ============
   Found on the Fire and Android build of 6.79 (run 43056507079, the emulator's log): the page begins to read the chat's
   opening ahead 0.7 s after a model is ready (ingReadAhead), and the phone and tablet apps do the engine's work one piece
   at a time (Bridge.java, one engine thread). Engine.unload did not stop that reading, so a change of model waited for
   the whole of it: 465 s on that emulator, where the reading takes about as long (468 s), and the self-test ran out of
   time. On a slow tablet the same wait would follow any change of model made soon after one was loaded.
   Now a read-ahead still running is stopped before the model is unloaded. The reading is only a head start, kept by the
   model that made it, so nothing is lost: the next model reads for itself. */
(function(){"use strict";var W=window,E=W.Engine;
function done(){try{W.__ingParts["p273"]="running";}catch(_){}}
if(!E||typeof E.unload!=="function"||E.unload.__r273){done();return;}
var o=E.unload,n=function(){
  try{if(this._prefilling&&this.adapter&&typeof this.adapter.abort==="function"){this.adapter.abort();W.__ingReadAheadStopped=(W.__ingReadAheadStopped||0)+1;}}catch(e){}
  return o.apply(this,arguments);};
n.__r273=true;E.unload=n;done();
})();
</script>
