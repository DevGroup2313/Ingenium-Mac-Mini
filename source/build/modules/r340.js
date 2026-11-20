<script>try{(window.__ingParts=window.__ingParts||{})["p340"]="started";}catch(_){}
/* ============ R340 · SEALED ON THE COMPUTER'S DISK, THE PAGE'S SIDE (Ingenium 7.49, 20 November 2026) ============
   Her security request (18 November 2026): "I really want everything to be encrypted and protected"; her answer for the computer's
   disk: "All of them" sealed; her word on the live preview (https://claude.ai/artifact/H4ieskf4TqQR7DXc6YSeAQ, source/previews/security):
   "I approve of the preview, please commit and push it everywhere". The preview: "While you are signed in, the computer app holds the key
   in its memory only, and drops it when Ingenium locks. A run still runs on plain files while it runs; its files are sealed when it ends."
   - While she is signed in, the computer app is handed the disk key (IngLock.diskKey, modules/r197.js: derived from the data key, never
     the password and never the data key itself) and keeps it in memory only (desktop/app_disk_749.py: disk_key_hold); when Ingenium
     locks, it is dropped (disk_key_drop). A page opened locked drops it too, so a refresh never leaves it behind.
   - When she turns her sign-in off, everything sealed on the disk is opened again first (disk_unseal_all), as the stores are.
   - Settings, Security, The computer's disk says what is sealed and what is not yet, with Seal them now.
   - 7.50 (20 November 2026; desktop/app_disk_750.py): the records too (an app waiting for her devices, under a name that says nothing; a
     run's record once it ends) and texts for training. The room says what the computer app itself reports it seals (disk_status's kinds),
     so an app of 7.49 is never said to seal more than it does; a copy without a computer app names what this release's apps seal.
   window.IngDiskSeal: state(), describe(hasFabrica), status(), sealNow() */
(function r340(){"use strict";
if(window.IngDiskSeal)return;
var W=window,D=document;
function api(){try{var a=W.pywebview&&W.pywebview.api;return a&&typeof a.disk_key_hold==="function"?a:null;}catch(e){return null;}}
function L(){return W.IngLock||null;}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function warn(e){try{console.warn("r340",e);}catch(_){}}
var ST={held:false,files:0,sealed:0,lib:true,asked:0},BUSY=false;
function repaint(){try{if(W.IngSecurity&&IngSecurity.paint)IngSecurity.paint();}catch(e){}}
/* the computer app's own count, asked at most every four seconds and only where there is a computer app; the room is painted again only
   when the answer changed (the room asks for its words as it paints, so asking and painting must never feed each other) */
function sig(x){return [x.held,x.files,x.sealed,x.lib,(x.kinds||[]).join(",")].join("/");}
function status(){var a=api();if(!a)return Promise.resolve(ST);ST.asked=Date.now();
  return Promise.resolve(a.disk_status()).then(function(s){if(s&&s.ok){var was=sig(ST);s.asked=ST.asked;ST=s;ST.changed=was!==sig(ST);}return ST;},function(){return ST;});}
function hold(){var a=api(),l=L();if(!a||!l||!l.diskKey||!l.active||!l.active())return Promise.resolve(false);
  if(l.locked&&l.locked())return drop();
  return l.diskKey().then(function(k){return Promise.resolve(a.disk_key_hold(k.b64,k.kid));}).then(function(s){if(s&&s.ok)ST=s;repaint();return true;},function(e){warn(e);return false;});}
function drop(){var a=api();if(!a)return Promise.resolve(false);
  return Promise.resolve(a.disk_key_drop()).then(function(s){if(s&&s.ok)ST=s;repaint();return true;},function(){return false;});}
/* the sign-in turned off: everything sealed on the disk opened again, while the computer app still holds the key */
function unsealAll(){var a=api();if(!a)return Promise.resolve(false);
  return Promise.resolve(a.disk_unseal_all()).then(function(){return drop();},function(e){warn(e);return drop();});}
W.addEventListener("ing-keys",function(e){var held=!!(e&&e.detail&&e.detail.held),l=L();
  if(held){hold();return;}
  if(l&&l.active&&!l.active())unsealAll();else drop();});
function state(){var a=api(),l=L();if(!a)return "off";if(!l||!l.active||!l.active())return "off";return "on";}
function sealNow(btn){var a=api();if(!a||BUSY)return;BUSY=true;if(btn)btn.disabled=true;
  Promise.resolve(a.disk_seal_now()).then(function(s){BUSY=false;if(s&&s.ok){ST=s;try{W.ingToast&&ingToast(s.now?(s.now===1?"One file sealed just now.":s.now+" files sealed just now."):"Everything was sealed already.");}catch(e){}}
    else{try{W.ingToast&&ingToast((s&&s.error)||"It could not be sealed now.");}catch(e){}}repaint();},function(e){BUSY=false;warn(e);repaint();});}
/* 7.50: in the middle of a sentence the first letter is lowered, never a name's (7.49 wrote "fabrica's runs") */
function mid(x){return /^Fabrica/.test(x)?x:x.charAt(0).toLowerCase()+x.slice(1);}
function describe(fab){var a=api(),l=L(),on=!!(l&&l.active&&l.active());
  if(a&&Date.now()-ST.asked>4000)status().then(function(x){if(x&&x.changed){x.changed=false;repaint();}});
  var tr=!a||(ST.kinds||[]).indexOf("training")>=0;   /* 7.50: what this computer app says it seals */
  var what=fab?(tr?"Fabrica's runs with their records and logs, the apps waiting for your devices, and texts for training":"Fabrica's runs and their logs, and the apps waiting for your devices")
    :(tr?"Texts for training":"");   /* 7.50: an edition without Fabrica sends no app to the devices (r316 is Fabrica's), so it names none */
  var later=fab?(tr?"Fabrica apps kept on a drive, and the folder search's index":"Fabrica apps kept on a drive, the folder search's index and texts for training")
    :(tr?"the folder search's index":"the folder search's index and texts for training");
  var h="";
  if(!a)h='<p>This copy runs without a computer app, so nothing of it is kept in files on a computer\'s disk. In the Mac and Windows apps, '+esc(mid(what))+' are sealed with your password.</p>';
  else if(!on)h='<p>Off: the computer app\'s own files are plain, as they always were.'+(what?' Turn on your sign-in (This device) and '+esc(mid(what))+' are sealed with its password.':'')+'</p>';
  else if(!what)h='<p>On. This computer app seals none of its own files yet.</p>';
  else h='<p>On. '+esc(what)+': sealed with the same password. '+(ST.held?'The computer app holds the key in its memory only while you are signed in, and drops it when Ingenium locks.':'Locked now: they open when you sign in.')
    +(tr?(fab?' A run or a training still works on plain files while it runs; they are sealed when it ends.</p>':' A training still reads its text plain while it trains; it is sealed when it ends.</p>')
      :' A run still runs on plain files while it runs; its log and its files are sealed when it ends.</p>')
    +'<p>'+(ST.files?(ST.sealed===ST.files?(ST.files===1?"Its one file is sealed.":"All "+ST.files+" of its files are sealed."):ST.sealed+" of "+ST.files+" files sealed."):"Nothing of these is on the disk yet.")+'</p>'
    +'<div class="sc-keys"><button type="button" class="sc-key pri" data-a="disk-seal"'+(ST.held?'':' disabled')+'>Seal them now</button></div>';
  h+='<p class="sc-fine">Not sealed yet, the next stage: '+esc(later)+'. Kept readable on purpose: '+(fab?'an app you serve for the Home Screen (Safari has to read it), and your model files':'your model files')+'.</p>';
  return h;}
D.addEventListener("click",function(e){var b=e.target&&e.target.closest&&e.target.closest('#secCard [data-a="disk-seal"]');if(b){e.preventDefault();sealNow(b);}});
/* at start: signed in, the key is handed over; opened locked, any key the app still held is dropped */
function boot(){var l=L();if(!api()||!l)return;if(l.active&&l.active()&&!(l.locked&&l.locked()))hold();else drop();status().then(function(x){if(x&&x.changed){x.changed=false;repaint();}});}
(function wait(){var n=0;(function t(){if(W.__ingReady===true&&W.IngLock){setTimeout(boot,400);return;}if(++n<400)setTimeout(t,500);})();})();
W.IngDiskSeal={state:state,describe:describe,status:status,sealNow:function(){sealNow(null);},_hold:hold,_drop:drop};
})();
;try{window.__ingParts["p340"]="running";}catch(_){}
</script>
