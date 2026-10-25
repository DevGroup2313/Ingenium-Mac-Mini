<script>try{(window.__ingParts=window.__ingParts||{})["p100"]="started";}catch(_){}
/* R179 · 6.7 (security audit, 25 October 2026): the stage keeps each page's store under an identity the page cannot choose.
   Before this, the store was keyed by the page's file name or its <title>, so a downloaded file called index.html, or a
   reply with the same title as an earlier page, was handed the other page's saved data (window.__ING_STAGE_SEED). Here the
   store is keyed by something Ingenium holds and a page cannot pick to match another's: the stored page's own id (a file or
   app opened from the library, Code or Fabrica), the message a reply belongs to, or, failing those, a fingerprint of the
   page's own bytes. A page can only ever reach a store its own identity names. */
(function(){"use strict";
if(window.__ingR179)return;window.__ingR179=1;
function hash(s){s=String(s||"");var h1=0x811c9dc5>>>0,h2=0x1000193>>>0;for(var i=0;i<s.length;i++){var c=s.charCodeAt(i);h1=(h1^c)>>>0;h1=(h1*0x01000193)>>>0;h2=((h2<<5)+h2+c)>>>0;}return s.length.toString(36)+"-"+h1.toString(36)+h2.toString(36);}
if(typeof csStoreKey!=="function")return;
/* a later function declaration replaces the global binding the base page made */
csStoreKey=function(pg){
  if(!pg||typeof pg!=="object")return "h:0";
  /* a stored page: a file or app opened from the library, Code or Fabrica keeps the id its bytes live under */
  if(pg.ref)return "ref:"+String(pg.ref).slice(0,120);
  if(pg.fileId)return "fid:"+String(pg.fileId).slice(0,120);
  /* a page a model wrote in a reply, or a document, sheet or deck: the message it belongs to, so each keeps its own store */
  if(pg.msg&&(pg.msg.id!=null)&&(pg.kind==="reply"||pg.kind==="doc"||pg.kind==="sheet"||pg.kind==="deck"))return "msg:"+String(pg.msg.id).slice(0,80)+":"+(pg.docIndex||0);
  /* anything else (a file dropped onto the chat, a page opened by name): its store id comes from its own bytes, so it can
     never be the id of a different page */
  return "h:"+hash(pg.html);};
window.csStoreKey=csStoreKey;

/* 6.7 (secrets-crypto-data 4): the one-press "Export a backup" wrote the whole desk, connection keys and tokens in plain
   text with it. The two chosen export paths already keep keys out unless the owner asks (Settings, Choose what to export,
   with its own switch; and Backup and moving, where keys are locked with a password). This makes the plain one-press export
   match them: a connection's key, token or password is left out of it. The owner's deliberate key-carrying paths are
   unchanged. (On the desktop apps, writing desk/state.json and the exports with 0600, and the owner keychain, are desktop
   matters left to the coordinator; see for_coordinator.md.) */
if(typeof exportApp==="function"){
  var SECRETRE=/^(key|apiKey|api_key|token|accessToken|refreshToken|hfToken|ghToken|braveKey|secret|clientSecret|password|passphrase)$/i;
  function stripKeys(o,parent,pkey){if(!o||typeof o!=="object")return o;
    if(Array.isArray(o))return o.map(function(v){return stripKeys(v,o);});
    var out={};Object.keys(o).forEach(function(k){var v=o[k];
      var isSecret=SECRETRE.test(k)&&typeof v==="string"&&v||(k==="key"&&typeof v==="string"&&v&&o&&("provider" in o||"base" in o||"endpoint" in o));
      if(isSecret)return;out[k]=(v&&typeof v==="object")?stripKeys(v,o,k):v;});return out;}
  exportApp=function(){try{var clean=stripKeys(JSON.parse(JSON.stringify(state,typeof deskReplacer==="function"?deskReplacer:undefined)));
      var blob=new Blob([JSON.stringify(clean)],{type:"application/json"});
      var name=(state.appName||"Ingenium").replace(/\s+/g,"-")+"-backup.json";
      if(typeof saveFileNative==="function"){saveFileNative(name,"application/json",new TextEncoder().encode(JSON.stringify(clean)));return;}
      var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},1000);
    }catch(e){try{alert("Export failed: "+e.message);}catch(_){}}};
  window.exportApp=exportApp;
  /* the Settings button was bound to the old function at the page's first load, so point it at this one */
  function rebind(){try{var exBtn=document.getElementById("exportApp");if(exBtn)exBtn.onclick=exportApp;}catch(e){}}
  rebind();if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",rebind);
}
})();
;try{window.__ingParts["p100"]="running";}catch(_){}
</script>
