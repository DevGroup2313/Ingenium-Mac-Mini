<style id="r345-css">
/* ============ R345 · THE RECORD OF INGENIUM'S SECURITY, PROFILES AND DESIGN, IN INGENIUM'S FOLDER (Ingenium 7.55, 20 November 2026) ============
   Her words (20 November 2026): "I want you to document the sign-in and sign-out functions of Ingenium and its entire security system and
   structure, as well as the different profiles and and data storage per profiles and everything associated with it into Ingenia's folders
   for Ingenium. I want the entire system and functions to be detailed and catalogued into the folders so that I can replicated them again
   later and add them to my other apps ... I want any local model or even frontier models that I am using to have that information
   available to them in the Folders from the Ingenia and be able to replicate it all with ease and efficiently with no errors or bugs."
   The record is written with the sources (source/docs/ingenium_record/, eleven Markdown files); build_page.py writes them in here
   (/*R345_RECORD*/). In her master copy, in her own profile, once her desk is open, they are put into Ingenium's folder on the Ingenia page
   (the folder r297 knows, a name beginning "Ingenium"; made if there is none) as that folder's files, the way the app keeps every folder's
   files (each text in the larger store, ccPut; sealed there while her sign-in is on). So every conversation in that folder carries them as
   a folder's files go: a long file as its opening and passages from across it, and with each message the passages that match it.
   Kept true: a file is replaced when the record changes, unless she changed her copy in the folder (hers stays, the new one is put beside
   it, dated); a file she removed is put back only when the record itself changes. Nothing of this is in another edition (build/editions.py)
   or in another person's profile (build_page.py's _OWNER_ONLY). No new part is drawn: the files are listed where a folder's files are.
   window.IngRecord: files(), place() (a promise of how many files were put in or replaced) */
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p345"]="started";}catch(_){}
(function r345(){"use strict";
var W=window,D=document;if(W.IngRecord)return;
var RECORD=/*R345_RECORD*/null;
function warn(e){try{console.warn("r345",e&&e.message||e);}catch(_){}}
function master(){try{return typeof ING_EDITION==="undefined"||ING_EDITION==="master";}catch(e){return true;}}
function mine(){return !W.__ingGuest;}
function files(){return Array.isArray(RECORD)?RECORD.filter(function(f){return f&&typeof f.name==="string"&&typeof f.text==="string";}):[];}
/* a short fingerprint of a text (FNV-1a, 32 bits, twice with two seeds), enough to know whether a copy is the one put in */
function sum(t){function f(s,h){for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return ("0000000"+h.toString(16)).slice(-8);}t=String(t||"");return f(t,2166136261)+f(t,374761393)+t.length.toString(36);}
function isIngenium(p){return !!(p&&p.kind==="app"&&/^\s*ingenium\b/i.test(String(p.name||"")));}
function folder(){var F=W.IngFolders;if(!F||typeof F.folders!=="function")return null;
  var f=null;try{f=F.folders().filter(isIngenium)[0]||null;}catch(e){}if(f)return f;
  try{return typeof F.make==="function"?F.make("Ingenium"):null;}catch(e){warn(e);return null;}}
function open(){try{var L=W.IngLock;if(L&&L.active&&L.active()&&(!L.locked||L.locked()))return false;}catch(e){return false;}
  return !W.__ingLocked&&!!W.state;}
function book(){var s=W.state;if(!s)return null;if(!s.__r345||typeof s.__r345!=="object")s.__r345={files:{}};if(!s.__r345.files)s.__r345.files={};return s.__r345;}
function put(f,text){if(typeof W.ccPut==="function")return Promise.resolve(W.ccPut(f,text));f.text=text;return Promise.resolve();}
function load(f){if(typeof W.ccLoad==="function")return Promise.resolve(W.ccLoad(f)).catch(function(){return null;});return Promise.resolve(typeof f.text==="string"?f.text:null);}
function day(){try{return new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}
var BUSY=null;
function place(){if(BUSY)return BUSY;var list=files();
  if(!list.length||!master()||!mine()||!open())return Promise.resolve(0);
  var p=folder();if(!p)return Promise.resolve(0);if(!Array.isArray(p.files))p.files=[];
  var B=book(),n=0,added=0;
  BUSY=list.reduce(function(q,r){return q.then(function(){var want=sum(r.text),had=B.files[r.name]||null,f=null;
      for(var i=0;i<p.files.length;i++)if(p.files[i]&&p.files[i].name===r.name){f=p.files[i];break;}
      if(!f){if(had&&had===want)return;   /* she removed it, and the record has not changed since: it stays out */
        var x={name:r.name,ref:null,size:0};p.files.push(x);return put(x,r.text).then(function(){B.files[r.name]=want;n++;added++;});}
      return load(f).then(function(t){var now=t==null?null:sum(t);if(now===want){B.files[r.name]=want;return;}
        if(now===had||t==null)return put(f,r.text).then(function(){B.files[r.name]=want;n++;});
        /* she changed her copy: hers stays; the record's new text goes beside it, dated */
        var nm=r.name.replace(/\.md$/i,"")+" (record of "+day()+").md",y=null;
        for(var j=0;j<p.files.length;j++)if(p.files[j]&&p.files[j].name===nm){y=p.files[j];break;}
        if(!y){y={name:nm,ref:null,size:0};p.files.push(y);}
        return put(y,r.text).then(function(){B.files[r.name]=want;n++;added++;});});});},Promise.resolve())
    .then(function(){if(n){try{if(typeof W.saveState==="function")W.saveState();}catch(e){}
        if(added)try{if(typeof W.ingToast==="function")W.ingToast("The record of Ingenium's security, profiles and design is in Ingenium's folder on the Ingenia page: "+list.length+" files, for you and your models.");}catch(e){}}
      BUSY=null;return n;},function(e){warn(e);BUSY=null;return 0;});
  return BUSY;}
/* once the desk is open: at the start, and after a sign-in (the window event ing-keys, then the desk is adopted) */
function later(ms){setTimeout(function(){place();},ms);}
function start(){var tries=0;(function t(){if(W.__ingReady===true&&open()&&W.IngFolders){place();return;}if(++tries<120)setTimeout(t,1000);})();}
try{W.addEventListener("ing-keys",function(e){if(e&&e.detail&&e.detail.held)later(4000);});}catch(e){}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(start,1500);});else setTimeout(start,1500);
W.IngRecord={files:function(){return files().map(function(f){return {name:f.name,chars:f.text.length};});},place:place};
})();
;try{window.__ingParts["p345"]="running";}catch(_){}
</script>
