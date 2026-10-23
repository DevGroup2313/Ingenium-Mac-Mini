<script>try{(window.__ingParts=window.__ingParts||{})["p83"]="started";}catch(_){}
/* ============ R162 · OWNERSHIP, LICENCE AND PERMISSIONS (Ingenium 6.2, 23 October 2026) ============
   The owner's words: "The app is my sole original work and only I am able to do distribute, sell, edit, remove or basically do
   anything with it, no one else has that right and should not ever have access unless I grant them limited persmission that I
   can discontinue at any time. I want that made explicit for all of my apps."
   Ingenium's part of the shared PermitCore (thoughts/permit_core.html, written in just before this module, the same file The
   Forge carries): a card in Settings with the licence (version 2) whole, this copy's edition and build, the permissions kept on
   this device, and, in the master edition, the owner's key, the permissions given and withdrawn.
   build_page.py writes in the licence (licence/LICENCE_ingenium.txt) and, through security/permits.py, the owner's public keys,
   the owner's latest list of withdrawn permissions and, for a copy made for one person, the permission it is given with.
   Outside the master edition, what only the owner may do with Ingenium itself waits for a permission that allows it: opening
   Ingenium itself in Code and Build (edit), and making its install packages (package). */
(function r162Permits(){
var W=window,D=document;
if(!W.PermitCore)return;
var LICENCE=/*PERMIT_LICENCE*/"",KEYS=/*PERMIT_KEYS*/[],WITHDRAWN=/*PERMIT_WITHDRAWN*/null,GIVEN=/*PERMIT_GIVEN*/null,OWNER=/*OWNER_NAME*/"";
var ED=typeof ING_EDITION==="string"?ING_EDITION:"master";
function build(){try{return typeof ingBuild==="function"?ingBuild():"";}catch(e){return "";}}
var P=PermitCore.create({app:"ingenium",appName:"Ingenium",ownerName:OWNER,version:typeof ING_VERSION==="string"?ING_VERSION:"",edition:ED,stamp:build(),
  licence:LICENCE,keys:KEYS,withdrawn:WITHDRAWN,given:GIVEN,owner:ED==="master",id:"ingPermitCard",onChange:function(){try{gate();}catch(e){}},
  load:function(){return state.permits;},save:function(s){state.permits=s;try{saveState();}catch(e){}},
  toast:function(t){try{(W.ingToast||W.toast)(t);}catch(e){}},
  saveFile:function(n,m,t){return typeof saveFileNative==="function"?Promise.resolve(saveFileNative(n,m,t)):null;},
  cls:{card:"card",h:"sec",btn:"btn small",pri:"btn small primary",note:"small muted"}});
W.IngPermit=P;

/* the card, in Settings, after the others */
function card(){var pg=D.getElementById("page-settings");if(!pg)return;var c=D.getElementById("ingPermitCard");
  if(c&&c.parentNode===pg){P.card(pg);return;}P.card(pg);}
/* what only the owner may do with Ingenium itself: in another edition, only by a permission that allows it */
function gate(){if(ED==="master")return;
  var kit=D.querySelector('input[name="kitWhat"][value="self"]');
  if(kit&&!P.allows("package")){var lab=kit.closest("label");var ed=D.querySelector('input[name="kitWhat"][value="editor"]');
    if(kit.checked&&ed){ed.checked=true;try{ed.dispatchEvent(new Event("change",{bubbles:true}));}catch(e){}}
    if(lab){lab.hidden=true;lab.setAttribute("data-permit","package");}}
  else if(kit&&P.allows("package")){var l2=kit.closest("label");if(l2)l2.hidden=false;}}
if(W.IngApps&&typeof IngApps.list==="function"){var oList=IngApps.list;IngApps.list=function(){var L=oList.apply(this,arguments);
  if(ED!=="master"&&!P.allows("edit"))L=L.filter(function(a){return a.key!=="ingenium-self"&&a.key!=="ingenium";});return L;};}  /* this copy, and the one the library keeps */
if(typeof W.kitWhat==="function"){var oWhat=W.kitWhat;W.kitWhat=kitWhat=function(){var v=oWhat.apply(this,arguments);return v==="self"&&ED!=="master"&&!P.allows("package")?"editor":v;};}
P.ready().then(function(){gate();},function(){});
if(typeof W.go==="function"){var oGo=W.go;W.go=go=function(pg){var r=oGo.apply(this,arguments);if(pg==="settings")setTimeout(function(){try{card();}catch(e){}},0);
  setTimeout(function(){try{gate();}catch(e){}},0);return r;};}
function init(){try{card();}catch(e){}try{gate();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",init);else init();
})();
;try{window.__ingParts["p83"]="running";}catch(_){}
</script>
