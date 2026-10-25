<script>try{(window.__ingParts=window.__ingParts||{})["p100"]="started";}catch(_){}
/* R179 · 6.7 (security audit, 25 October 2026): the stage keeps each page's store where no other page can reach it.
   Before this, the store was keyed by the page's file name or its <title>, across the whole desk: a downloaded file called
   index.html, or a reply titled like an earlier page in another conversation, was handed that page's saved data
   (window.__ING_STAGE_SEED). Now the key says where the page comes from, as Ingenium knows it, so a page can only ever
   reach the store of the place it was opened from:
   - a file of a Code app (its preview, one of its pages, a changed file in its session): the app's id and the file's name,
     so every edit and every new version of the app keeps its data;
   - a page written in a reply (or a document, sheet or deck), and a file attached to a message or changed in a conversation:
     that conversation and the page's title or file name, so a later version in the same conversation keeps the data, and
     a page of the same name in another conversation starts with its own;
   - anything that names no source (Fabrica's run, until its module names its app): its file name, as in 6.6.
   What a page kept under 6.6's name is copied over once to the new place, for pages that were already there before this
   way of keying first ran on this device (a reply written then, a Code app made then). A page written or attached later
   never takes it over. */
(function(){"use strict";
if(window.__ingR179)return;window.__ingR179=1;
if(typeof csStoreKey==="function"&&typeof csStoreLoad==="function"){
function clip(s,n){return String(s==null?"":s).slice(0,n||120);}
/* when this way of keying first ran here: kept in this browser's small store, never taken from a desk or a backup's desk,
   and never later than now (a value from the future is not believed) */
var SINCE="ing_stage_keys_at";
function since(){var now=Date.now(),v=0;try{v=parseInt(localStorage.getItem(SINCE)||"0",10)||0;}catch(e){}
  if(!(v>0)||v>now){v=now;try{localStorage.setItem(SINCE,String(v));}catch(e){}}return v;}
function chatBorn(id){var m=/^c([0-9a-z]{6,})/.exec(String(id||""));if(!m)return 0;var n=parseInt(m[1].slice(0,8),36);return n>1e12&&n<4e12?n:0;}
/* 6.6's key for the same page */
function oldKey(pg){return pg.storeKey||((pg.kind==="file"?"file:":"page:")+clip(pg.name||"page"));}
/* when the page's record was made, as far as Ingenium knows it (0: unknown, so nothing is taken over) */
function bornOf(pg){if(pg.born>0)return +pg.born;if(pg.kind==="file")return 0;var m=pg.msg;
  var t=m&&typeof m==="object"?(+m.done||+m.at||0):0;return t>0?t:chatBorn(pg.chat);}
/* the page the last key was made for (csRender and the large-page path ask for a key, then load its store) */
var lastKey=null,lastPg=null;
csStoreKey=function(pg){if(!pg||typeof pg!=="object")return "page:page";var k;
  if(pg.storeKey)k=clip(pg.storeKey,240);
  else if(pg.sid)k=clip(pg.sid,240);
  else if(pg.kind==="file")k=pg.ref?"chat:"+clip(pg.chat,40)+":file:"+clip(pg.name||"page"):"file:"+clip(pg.name||"page");
  else k="chat:"+clip(pg.chat,40)+":page:"+clip(pg.name||"page");
  lastKey=k;lastPg=pg;return k;};
window.csStoreKey=csStoreKey;
var baseLoad=csStoreLoad;
csStoreLoad=function(key){var pg=key===lastKey?lastPg:null;lastKey=lastPg=null;
  try{state.stageStores=state.stageStores||{};var S=state.stageStores;
    if(pg&&!S[key]){var old=oldKey(pg),born=bornOf(pg);
      if(old!==key&&S[old]&&!pg.ref&&born>0&&born<since()){var from=S[old];
        return IngBig.load(from).then(function(t){if(t==null)return {};
          if(!S[key]){var id=IngBig.newId();S[key]=id;try{IngBig.put(id,t);}catch(e){}try{saveState();}catch(e){}}
          try{var o=JSON.parse(t||"{}");return o&&typeof o==="object"?o:{};}catch(e){return {};}},function(){return {};});}}}catch(e){}
  return baseLoad.apply(this,arguments);};
window.csStoreLoad=csStoreLoad;
try{since();}catch(e){}
}

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
