<script>try{(window.__ingParts=window.__ingParts||{})["p341"]="started";}catch(_){}
/* ============ R341 · ASK BEFORE EACH EXPORT (Ingenium 7.51, 20 November 2026) ============
   Her security request (18 November 2026): "I really want everything to be encrypted and protected"; her word on the live preview
   (https://claude.ai/artifact/H4ieskf4TqQR7DXc6YSeAQ, source/previews/security): "I approve of the preview, please commit and push it
   everywhere"; and (20 November 2026): "I approve of everything, please commit and push it everywhere and continue working on my
   requests." The preview, More protection: "Ask before each export. A plain copy (a backup without its seal, a plain export of an app)
   asks for your password first." (a switch, off as the preview shows it; modules/r318.js draws it).
   - Every file Ingenium saves out of itself goes through window.saveFileNative (the base's own, queued one at a time by r137): this
     part stands in front of it. With the switch on and her sign-in on, a file that leaves unsealed waits for her password
     (IngLock.confirm, modules/r197.js): the right password lets it go; Cancel, Escape or the page locking keeps it here, and says so.
   - What is sealed already leaves without the question: a backup sealed whole (it begins "INGENIUM SEALED BACKUP 1", r143), and the
     recovery key file, which r197 saves only after her password has just been asked.
   - Files asked for while the question is open share its one answer (a part that saves two files at once asks once); the next export
     asks again.
   window.IngExportAsk: on(), sealed(data) */
(function r341(){"use strict";
var W=window;if(W.IngExportAsk)return;
var HEAD="INGENIUM SEALED BACKUP 1\n";
function on(){try{var l=W.IngLock,s=W.IngSecurity;return !!(l&&l.active&&l.active()&&!(l.locked&&l.locked())&&typeof l.confirm==="function"&&s&&s.cfg&&s.cfg().export);}catch(e){return false;}}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);}catch(e){}}
/* the first bytes of what is saved: a string, bytes, a buffer or a Blob */
function head(data,n){try{
  if(typeof data==="string")return Promise.resolve(data.slice(0,n));
  if(data&&typeof Blob!=="undefined"&&data instanceof Blob)return data.slice(0,n).arrayBuffer().then(function(b){return dec(new Uint8Array(b));});
  if(data&&(data instanceof ArrayBuffer))return Promise.resolve(dec(new Uint8Array(data,0,Math.min(n,data.byteLength))));
  if(data&&ArrayBuffer.isView(data))return Promise.resolve(dec(new Uint8Array(data.buffer,data.byteOffset,Math.min(n,data.byteLength))));}catch(e){}
  return Promise.resolve("");}
function dec(u){var s="";for(var i=0;i<u.length;i++)s+=String.fromCharCode(u[i]);return s;}
function sealed(data){return head(data,200).then(function(h){return h.indexOf(HEAD)===0||/^\s*\{\s*"kind"\s*:\s*"ingenium-recovery-key"/.test(h);});}
var PEND=null;
function ask(name){if(PEND)return PEND;
  PEND=W.IngLock.confirm("Export a plain copy","“"+String(name||"This file").slice(0,120)+"” leaves Ingenium unsealed: whoever has the file can read it. Your password first.","Export it")
    .then(function(ok){PEND=null;return ok;},function(){PEND=null;return false;});
  return PEND;}
function wrap(){var orig=W.saveFileNative;if(typeof orig!=="function"||orig.__askExport)return false;
  var g=function(name,mime,data){var self=this,args=arguments;
    if(!on())return orig.apply(self,args);
    return sealed(data).then(function(s){if(s)return orig.apply(self,args);
      return ask(name).then(function(ok){if(!ok){toast("Not saved: Ingenium asks for your password before a plain copy leaves it (Settings, Security).");return null;}
        return orig.apply(self,args);});});};
  g.__askExport=true;g.__queued=!!orig.__queued;W.saveFileNative=g;return true;}
wrap();
W.IngExportAsk={on:on,sealed:sealed,_wrap:wrap};
})();
;try{window.__ingParts["p341"]="running";}catch(_){}
</script>
