<script>try{(window.__ingParts=window.__ingParts||{})["p332"]="started";}catch(_){}
/* ============ R332 · FROM THE MASTER EDITION TO THE FULL EDITION (Ingenium 7.45, 19 November 2026) ============
   Her words (19 November 2026): "I don't want my data and my past chats to be lost when I replace my master edition of Ingenium with the
   new Full edition on my HP laptop, that would be really bad if I lost all of that data. I need you to ensure that this does NOT happen
   please. Please allow for my data to be transferred to this new one and then you can seal everything and keep everything after so that I
   have all of my chats and all of my work inside of Ingenium preserved on the new edition." And: "I will only have one edition per device".
   Why it is needed: since 6.8.1 every edition but the master keeps its stores under a prefix of its own (storage_shim.py), so a demo
   opened at her address never reads her work; the full edition therefore opened empty beside her work, which stayed where it was.
   What it does, in the full edition only, never in a profile other than the owner's: when this device holds the master edition's work at
   this address (the computer apps serve every edition from one address) and this copy has no work of its own, it asks once, on the
   Security room's own first-start sheet (r318's look, keys and sounds, nothing new): Bring it in, or Start empty. Bring it in sets the flag
   "ing.carry.v1" to "adopt" and opens Ingenium again; from then on the full edition reads and writes the master's stores themselves
   (storage_shim.py), so every conversation, memory, folder, record, key, app and long text is there as it was, nothing copied and nothing
   left behind; what was sealed stays sealed with the same password. If it was not sealed, the Security room's Protect your work first
   asks at the next start, as she asked ("then you can seal everything"). Start empty keeps the master's work untouched and out of sight. */
(function(){"use strict";
var W=window,D=document,S=W.__ingOwnStore,FLAG="ing.carry.v1";
function ed(){try{return typeof ING_EDITION==="string"?ING_EDITION:"master";}catch(e){return "master";}}
function $(i){return D.getElementById(i);}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);else if(typeof W.toast==="function")W.toast(m);}catch(e){}}
function flag(){try{var t=S.rawGet(S.P+FLAG);return t?JSON.parse(t):null;}catch(e){return null;}}
function setFlag(o){try{S.rawSet(S.P+FLAG,JSON.stringify(o));return true;}catch(e){return false;}}
/* the master's work at this address: its desk, and whether its sign-in seals it */
function master(){var o={here:false,sealed:false,chats:null};if(!S)return o;
  try{var t=S.rawGet("ingenium_v4"),l=S.rawGet("ingenium_lock");o.sealed=l!=null;o.here=t!=null||o.sealed;
    if(t){try{var st=JSON.parse(t);if(st&&Object.prototype.toString.call(st.chats)==="[object Array]")o.chats=st.chats.length;}catch(e){}}}catch(e){}
  return o;}
/* this copy has no work of its own: fresh when it opened, or every conversation it holds is one of the master's */
function ownEmpty(){if(S.fresh)return true;
  try{var t=localStorage.getItem("ingenium_v4");if(!t)return true;var st=JSON.parse(t),m=S.rawGet("ingenium_v4")||"";
    return (st.chats||[]).every(function(c){return c&&c.id&&m.indexOf('"'+c.id+'"')>=0;});}catch(e){return false;}}
function wanted(){if(ed()!=="full"||!S||S.adopted||W.__ingGuest)return false;if(flag())return false;return master().here&&ownEmpty();}
function adopt(){var m=master();
  if(!setFlag({how:"adopt",from:"master",at:new Date().toISOString(),sealed:m.sealed,shown:false}))return false;
  /* her work not yet sealed: the Security room's first-start ask comes at the next start ("then you can seal everything") */
  if(!m.sealed){try{S.rawRemove("ing.security.asked.v1");}catch(e){}}
  try{if(typeof W.saveState==="function")W.saveState();}catch(e){}
  setTimeout(function(){try{location.reload();}catch(e){}},250);return true;}
function apart(){setFlag({how:"apart",at:new Date().toISOString()});}
function ask(){if(!wanted()||$("secAsk"))return false;var m=master();
  var what=m.sealed?"It is sealed with your password, and stays sealed: you sign in with the same password.":(m.chats!=null?m.chats+(m.chats===1?" conversation":" conversations")+", with everything else you made.":"Your conversations, with everything else you made.");
  var w=D.createElement("div");w.id="secAsk";w.className="r332";w.setAttribute("role","dialog");w.setAttribute("aria-modal","true");w.setAttribute("aria-labelledby","carryH");
  w.innerHTML='<div class="sa-card"><div class="eye">Your work on this device</div><h2 id="carryH">Bring in your work from Ingenium</h2>'
    +'<p>This device holds your work from the master edition. '+what+'</p>'
    +'<p>The full edition can take it as its own, just as it is: conversations and memory, folders, records, keys, apps and long texts. Nothing is copied or changed.</p>'
    +'<div class="sa-keys"><button type="button" class="sc-key quiet" id="carryNo">Start empty</button><button type="button" class="sc-key pri" id="carryYes">Bring it in</button></div></div>';
  D.body.appendChild(w);
  $("carryNo").onclick=function(){apart();w.remove();toast("This copy starts empty. Your work from the master edition stays on this device, untouched.");};
  $("carryYes").onclick=function(){var b=$("carryYes");b.disabled=true;b.textContent="Bringing it in";if(!adopt()){b.disabled=false;b.textContent="Bring it in";toast("Your work could not be brought in on this device.");}};
  setTimeout(function(){try{$("carryYes").focus();}catch(e){}},60);return true;}
/* after it opens again on her work, once */
function welcome(){var f=flag();if(!f||f.how!=="adopt"||f.shown||!S||!S.adopted)return;f.shown=true;setFlag(f);
  var n=0;(function look(){if(n++>300)return;var busy=W.__ingReady!==true||!!($("ingLockDoor")&&!$("ingLockDoor").hidden);
    if(busy){setTimeout(look,1000);return;}toast("Your work from the master edition is here, as it was.");})();}
function start(){if(!D.body){setTimeout(start,50);return;}if(!ask())welcome();}
if(ed()==="full")start();
W.IngCarry={wanted:wanted,ask:ask,adopt:adopt,apart:apart,master:master,flag:flag};
try{window.__ingParts["p332"]="running";}catch(_){}
})();
</script>
