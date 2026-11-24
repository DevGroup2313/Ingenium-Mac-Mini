<script>try{(window.__ingParts=window.__ingParts||{})["p373"]="started";}catch(_){}
/* ============ R373 · A PAGE'S MODEL NO LONGER REPLACES THE ONE SHE CHOSE (Ingenium 7.76, 24 November 2026) ============
   Her words (24 November 2026): "Right now, I am only able to pick and choose the models from the Chat pages and the Lector page only and
   the chosen model there always takes precedence and replaces any new model that I load from the Home page, the chat pages and the
   Mentes page, it always reverts to the chosen model from the Lector page. Please fix this really annoying and continuing issue".
   Read in the code first: Lector, Vocatio, Ingenia and Fabrica write with the model chosen in Lector's Read and written by (IngLector.plan,
   r108); to load it, they call the page's one loading helper, ingEnsureLoaded, which first made that model the whole app's choice
   (setActive: the top bar, Home, the chat), and did so again before every part of a reading. So a model she loaded from Home, the chat or
   Mentes was replaced by Lector's at Lector's (or Vocatio's) next step, and stayed replaced.
   Now the helper loads the model a page needs without touching her choice: the top bar, Home and the chat keep the model she chose, and
   the chat loads it again when she next writes, if a page had loaded another meanwhile.
   Her next words (the same evening): "Instead of each page getting its own models controls, I think it should all be folded into and
   added to the Engine button and give it its own panel when you click on it and it operates for the entire app". That panel, one model
   for the whole app, is shown first as a live preview; this part, which changes no look, comes now. */
(function r373(){
"use strict";
if(window.__r373)return;window.__r373=1;
var W=window;
function ensure(m){
  if(!m)return Promise.reject(new Error("no model"));
  if(Engine.modelId===m.id&&(Engine.status==="ready"||Engine.status==="busy"))return Promise.resolve();
  return new Promise(function(res,rej){var done=false;
    function finish(ok,e){if(done)return;done=true;try{Engine.off("status",watch);}catch(_){}ok?res():rej(e);}
    function watch(s){if(s==="ready"&&Engine.modelId===m.id)finish(true);else if(s==="error")finish(false,new Error(Engine.lastError||"the model could not be loaded"));}
    function go(){
      /* another model is being loaded: this one follows once it is in */
      if(Engine.status==="loading"){setTimeout(function(){if(!done)go();},400);return;}
      if(Engine.modelId===m.id&&(Engine.status==="ready"||Engine.status==="busy")){finish(true);return;}
      var first=Engine.modelId?Engine.unload():Promise.resolve();
      Promise.resolve(first).then(function(){return Engine.load(m);}).then(function(){try{renderEngineCtl();renderModels();}catch(_){}
          if(Engine.modelId===m.id)finish(true);},
        function(e){finish(false,e instanceof Error?e:new Error(String(e&&e.message||e||"the model could not be loaded")));});}
    Engine.on("status",watch);go();});}
try{ingEnsureLoaded=ensure;}catch(e){}W.ingEnsureLoaded=ensure;
W.IngKeepChoice={ensure:ensure};
})();
;try{window.__ingParts["p373"]="running";}catch(_){}
</script>
