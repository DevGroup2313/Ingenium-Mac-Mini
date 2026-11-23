<script>try{(window.__ingParts=window.__ingParts||{})["p362"]="started";}catch(_){}
/* ============ R362 · EVERY APP INGENIUM CARRIES FOR HER HAS ITS FOLDER IN INGENIA (Ingenium 7.71, 23 November 2026) ============
   Her report (23 November 2026): the newest app of hers that Ingenium carries (since 7.65) was missing from the Ingenia page, from its
   Your apps section and from the rest of the app. The cause, traced: Ingenia (r208, r263) makes a folder for an app at three moments
   only: the first time she sets Ingenia up (the apps her profile names), when she brings in her build library (r258: one folder for
   each app it holds notes for), and when she adds one by hand. Her folders were made before 7.65 (the later ones from her build
   library), so an app carried from 7.65 never had a folder, and Ingenia's drawer, its Your apps cards and its tabs had nothing to show
   for it; its conversations waited under Not sorted yet. The app library, Lector, Fabrica, Adamas, Code and Home already had it.
   Now, in the master edition and in her own profile only (never in another person's profile, never in another edition, which carry none
   of her apps): each app this copy carries inside it (its ing-builtin-<key> copy, named by LIB_NAMES) has a folder in Ingenia, made
   once if she has none for it, named as the library names it, and then the conversations that clearly name it move into it from Not
   sorted yet (r208's own sorting, which moves only a conversation that names one app clearly). Each app is made a folder once: a
   folder she lets go is not made again (state.folders.carried). Ingenium itself and the apps she keeps already have theirs. */
(function(){"use strict";
var W=window,D=document;if(W.IngCarriedFolders)return;
if(W.__ingGuest)return;
try{if(typeof ING_EDITION==="string"&&ING_EDITION!=="master")return;}catch(e){}
function norm(s){return String(s||"").trim().toLowerCase().replace(/\s+/g," ").replace(/^the /,"");}
/* the apps this copy carries for her, in her order, by the library's own names */
var ORDER=["cd","forge","ingenium","inkwell","lakay"];
function carried(){var N=(typeof LIB_NAMES==="object"&&LIB_NAMES)||{},keys=[];
  [].forEach.call(D.querySelectorAll('script[id^="ing-builtin-"],[id^="ing-builtin-"]'),function(el){var k=el.id.replace(/^ing-builtin-/,"");
    if(/^[a-z0-9]{2,24}$/.test(k)&&N[k]&&keys.indexOf(k)<0)keys.push(k);});
  keys.sort(function(a,b){var i=ORDER.indexOf(a),j=ORDER.indexOf(b);return (i<0?99:i)-(j<0?99:j)||a.localeCompare(b);});
  return keys.map(function(k){return {key:k,name:N[k]};});}
function ready(){return W.state&&W.IngFolders&&typeof IngFolders.folders==="function"&&typeof IngFolders.make==="function";}
function mark(){var s=W.state;if(!s.folders||typeof s.folders!=="object")s.folders={how:"",ui:{}};if(!s.folders.carried||typeof s.folders.carried!=="object")s.folders.carried={};return s.folders.carried;}
var DONE=false;
function run(){if(DONE||!ready())return null;
  var fs=IngFolders.folders();
  /* Ingenia not set up yet: its first page offers the apps (her profile's); nothing is made behind her back */
  if(!fs.length)return null;
  DONE=true;
  var have={};fs.forEach(function(p){have[norm(p.name)]=1;});
  var M=mark(),made=[];
  carried().forEach(function(a){if(M[a.key])return;M[a.key]=Date.now();if(have[norm(a.name)])return;
    var p=null;try{p=IngFolders.make(a.name);}catch(e){p=null;}if(p)made.push(a.name);});
  var moved=0;
  if(made.length){try{var r=IngFolders.sortAll&&IngFolders.sortAll();moved=(r&&r.n)||0;}catch(e){}}
  try{W.saveState();}catch(e){}
  if(made.length){try{IngFolders.paint();}catch(e){}
    try{if(typeof W.ingToast==="function")W.ingToast("Ingenia has a folder for "+made.join(" and ")+" now"+(moved?", with "+moved+" conversation"+(moved===1?"":"s")+" that name"+(moved===1?"s":"")+" it":"")+".");}catch(e){}}
  return {made:made,moved:moved};}
/* once the desk is read and Ingenia is running: at start, and on the first visit to Ingenia if it was not ready before */
var tries=0;
function soon(){if(run()!==null||DONE)return;if(++tries<40)setTimeout(soon,1500);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(soon,2500);});else setTimeout(soon,2500);
W.IngCarriedFolders={run:run,carried:carried,_reset:function(){DONE=false;tries=0;}};
})();
;try{window.__ingParts["p362"]="running";}catch(_){}
</script>
