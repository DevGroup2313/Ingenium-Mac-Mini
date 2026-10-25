<script>try{(window.__ingParts=window.__ingParts||{})["p92"]="started";}catch(_){}
/* ============ R171 · A SMALL OPEN MODEL TO TRAIN FURTHER (Ingenium 6.6, 24 October 2026) ============
   The owner's words (23 October 2026): "I want Ingenium to be able to create and train frontier level models inside of the
   app." Train a small model (Models page) can now start from a model the person has (build_page.py 6.6, and
   desktop/app_studio_65.py on the computer's side), and llama.cpp's trainer takes one in 16 or 8 bits. More models offers the
   two that suit it best: SmolLM2 135M and 360M Instruct, made by Hugging Face's own team (Apache 2.0), small enough to
   train on a computer at home. Each comes in the new quality For training (F16: 16-bit numbers, converted from the model's own BF16 release, which the
   app then widens exactly to 32 bits) or Best (Q8_0). Their files, sizes and fingerprints were read from Hugging Face by
   .github/workflows/lineup-sources.yml (round 5): SmolLM2-135M-Instruct-f16.gguf 270,885,952 bytes, f535f83e...; the 360M
   file 725,553,792 bytes, 7d23be40...; as for every model in More models, the device reads the listing again when it
   installs one and keeps the file only when its fingerprint matches. */
(function r171(){
"use strict";
if(typeof CAT_Q==="undefined"||!Array.isArray(ING_CATALOG))return;
if(!CAT_Q.some(function(q){return q.id==="F16";}))
  CAT_Q.push({id:"F16",label:"For training",bpw:16,line:"Its numbers in 16 bits (F16): the file to train further on your own text, in Train a small model (Models page). A model released in BF16, as SmolLM2 is, is converted to F16 for this file."});
var TRAIN=[
  {key:"smollm2-135m-instruct",name:"SmolLM2 135M Instruct",maker:"Hugging Face",params:0.135,thinks:false,licence:"Apache 2.0",repos:["bartowski/SmolLM2-135M-Instruct-GGUF"],quants:["F16","Q8_0"],train:true,known:{F16:270885952},
   why:"A very small model made by Hugging Face's own team, to train further on your own writing: in Train a small model, start from it to teach it your text's way of writing. In Ingenium's own test, one pass on a novel helped it read the rest of the novel, and it still answered in chat. Training it needs about 3 GB of memory. Too small for everyday answers."},
  {key:"smollm2-360m-instruct",name:"SmolLM2 360M Instruct",maker:"Hugging Face",params:0.362,thinks:false,licence:"Apache 2.0",repos:["bartowski/SmolLM2-360M-Instruct-GGUF","HuggingFaceTB/SmolLM2-360M-Instruct-GGUF"],quants:["F16","Q8_0"],train:true,known:{F16:725553792},
   why:"Its larger sibling, with nearly three times the numbers. Training it needs about 6.5 GB of memory and, by Ingenium's estimate, about three times as long; how well it keeps what it knew has not yet been measured. To train further on your own writing, in Train a small model."}];
var have={};ING_CATALOG.forEach(function(e){have[e.key]=1;});
TRAIN.forEach(function(e){if(!have[e.key])ING_CATALOG.push(e);});
/* 6.7: a file whose size is known shows that size, not an estimate */
if(typeof catEstimate==="function"){var est0=catEstimate;window.catEstimate=catEstimate=function(e,q){return (e&&e.known&&e.known[q])||est0.apply(this,arguments);};}
})();
;try{window.__ingParts["p92"]="running";}catch(_){}
</script>
