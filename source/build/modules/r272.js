<script>try{(window.__ingParts=window.__ingParts||{})["p272"]="started";}catch(_){}
/* ============ R272 · THE HEALTH CARD, LEFT ALONE (Ingenium 6.79, 11 November 2026) ============
   Her rule: nothing on a page is rewritten while it is left alone. Measured on 6.78 (rig/t_678_room_lenses.js): the Models page's Health
   card (the base's renderHealth, with r116's list after it) was built again from nothing every five seconds by the base's own timer,
   whatever had changed: the card and its key were replaced, a key under the pointer lost its lift, and keyboard focus inside it was lost.
   Now the card is built again only when what it says changes (the rows, the pace of replies, the advice, the model in the engine); the
   one live reading, the memory the page itself uses, has its number changed in place when it changes, and nothing else is touched. */
(function(){"use strict";var W=window,D=document;
if(typeof W.renderHealth!=="function"||W.renderHealth.__r272){try{W.__ingParts["p272"]="running";}catch(_){}return;}
var LIVE="The page itself";
function rows(){try{return W.healthRows()||[];}catch(e){return [];}}
function sign(rs){var a=[];try{a=[rs.map(function(r){return r[0]===LIVE?[r[0],"",r[2]||""]:r;}),W.perfSummary(),W.healthAdvice(),W.Engine.modelId||"",W.Engine.status];}catch(e){return String(Math.random());}return JSON.stringify(a);}
var o=W.renderHealth,n=function(){var host=D.getElementById("healthBox"),rs=rows(),sig=sign(rs);
  if(host&&host.__r272===sig&&host.firstChild){var live=rs.filter(function(r){return r[0]===LIVE;})[0];
    if(live)[].forEach.call(host.querySelectorAll(".hl-row"),function(row){var k=row.querySelector(".hl-k"),v=row.querySelector(".hl-v");if(k&&v&&k.textContent===LIVE&&v.textContent!==live[1])v.textContent=live[1];});
    return;}
  var r=o.apply(this,arguments);var h=D.getElementById("healthBox");if(h)h.__r272=sig;return r;};
try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}n.__r272=true;W.renderHealth=n;
try{window.__ingParts["p272"]="running";}catch(_){}
})();
</script>
