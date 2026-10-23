<style id="r161-css">
/* ============ R161 · A QUICKER START ON A COMPUTER ============
   The owner's words (23 October 2026): "I want both Ingenium and the Forge to be expanded to run faster on the mac mini."
   Ingenium's page is about 54 MB, and the web view read all of it before the first key could be pressed; 43 MB of it are
   carried for later: the apps kept in the library (Carpe Diem, the Forge, Inkwell), the page's own engine, the picture
   reader and the kit store. The computer apps now open the page without them (desktop/app_quick_62.py): each is an empty
   block naming where it is, and is fetched from the app, once, the first time it is used. Everything that reads one waits
   for it first; a copy of the page made from the page itself waits for all of them. A page opened any other way carries
   everything, as before, and this part does nothing. */
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p82"]="started";}catch(_){}
/* R161 · a quicker start on a computer: see the note at the top of its styles */
(function(){"use strict";
if(window.__r161)return;window.__r161=1;
var W=window;
function el(id){return document.getElementById(id);}
/* the fetching itself is defined ahead of everything (build_page.py, R161): ingFill, ingFillAll, ingDeferredLeft */
if(typeof W.ingDeferredLeft!=="function"||!ingDeferredLeft()){W.IngQuick={on:false};return;}
/* a copy of the page made from the page itself (the engine baked in) waits for every block */
(function(){var b=el("engineBake");if(!b||typeof b.onclick!=="function")return;var o=b.onclick;
  b.onclick=function(){var self=this,args=arguments;if(!ingDeferredLeft())return o.apply(self,args);
    try{ingToast("Gathering every part of Ingenium first…");}catch(e){}
    ingFillAll().then(function(){o.apply(self,args);},function(e){try{ingToast("A part of Ingenium could not be fetched: "+(e&&e.message||e));}catch(_){}});};})();
W.IngQuick={on:true,left:W.ingDeferredLeft,fill:W.ingFill,fillAll:W.ingFillAll};
})();
;try{window.__ingParts["p82"]="running";}catch(_){}
</script>
