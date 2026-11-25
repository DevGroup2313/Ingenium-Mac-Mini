<style id="r389-css">
/* ============ R389 · AN APP IN A REPLY SHOWS AS THE APP, NOT AS ITS CODE (Ingenium 7.87, 25 November 2026) ============
   Her words (25 November 2026): "I don't like how the entire code for the HTML apps that I made inside of the chat pages show instead of
   the compressed way the HMTL file is shown on Claude chats. I don't want to see the entire code of the HTML all laid out, it makes it
   really hard to navigate the chats ... I prefer to see the app instead of the raw code, please fix this issue in both chat pages."
   Traced on 7.86 (rig/t_787_fold.js): a reply carrying an app already showed the app's card (R82) and r101 already marked the app's code
   as folded (pre.r1-folded, "Show code (N lines)"), but the chat's own rule for code in a message (.msg .md pre code{display:block}) is
   more specific than the fold's (pre.r1-folded>code{display:none}), so the whole code stayed laid out, 3,893 pixels for 205 lines, in
   Chat and in Code alike (one page, #page-chat). Two more cases showed it too: a reply cut off before its closing fence (no card, no
   fold), and a reply still being written (the code grew in the chat while the stage beside it showed the page as it was written).
   Now the fold wins; a reply cut off inside an app is still read as that app (its card, the stage, the fold); and while an app is being
   written its code waits folded under one line that counts it, the stage beside the chat drawing it as it comes. Show code opens it in
   the reply, as before, and Copy and Save stay on the bar. */
.msg .md pre.r1-folded>code,.msg pre.r1-folded>code,.msg .md pre.r389-live>code,.msg pre.r389-live>code{display:none}
.msg pre.r389-live{padding-bottom:0}
.msg pre.r389-live .md-bar .r389-n{font:600 12px/1 var(--sans,system-ui,sans-serif);color:var(--ink-3);margin-left:8px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p389"]="started";}catch(_){}
(function r389(){"use strict";
if(window.__r389)return;window.__r389=1;var W=window;
/* a reply cut off inside its app is still that app: an html (or svg) fence that never closed, of twenty lines or more of markup */
var CUT=/```(?:html|xhtml|svg|xml)[^\n]*\n([\s\S]*)$/i;
function cutApp(text){var m=CUT.exec(String(text||""));if(!m)return null;var body=m[1];if(/\n\s*```\s*(\n|$)/.test(body))return null;
  if(body.split("\n").length<20||!/<(!doctype|html|head|body|div|main|section|script|style|svg)\b/i.test(body))return null;return body.trim();}
if(typeof W.chatArtifactOf==="function"&&!W.chatArtifactOf.__r389){var ca=W.chatArtifactOf;
  var nca=function(text){var r=ca.apply(this,arguments);if(r)return r;try{return cutApp(text);}catch(e){return null;}};nca.__r389=1;W.chatArtifactOf=nca;try{chatArtifactOf=nca;}catch(e){}}
function isApp(pre){var bar=pre.querySelector(".md-bar"),code=pre.querySelector("code");if(!bar||!code)return false;var lang=((bar.querySelector("span")||{}).textContent||"").trim().toLowerCase();
  var t=String(code.textContent||"");return /^(html|xhtml|svg|xml)$/.test(lang)||/^\s*(<!doctype html|<html[\s>])/i.test(t);}
/* while an app is being written, its code waits folded under one line that counts it */
if(typeof W.fillMsg==="function"&&!W.fillMsg.__r389){var fm=W.fillMsg;
  var nfm=function(d,mm,keep){var r=fm.apply(this,arguments);try{if(!mm||mm.role!=="bot"||!mm.live||!d)return r;
      d.querySelectorAll("pre").forEach(function(pre){if(!isApp(pre))return;var code=pre.querySelector("code"),n=String(code.textContent||"").split("\n").length;if(n<26)return;
        pre.classList.add("r389-live");var bar=pre.querySelector(".md-bar"),c=bar.querySelector(".r389-n");if(!c){c=document.createElement("span");c.className="r389-n";bar.insertBefore(c,bar.firstChild.nextSibling);}
        c.textContent="Writing the app: "+n.toLocaleString()+" lines so far";c.title="The app is drawn in the stage beside the chat as it is written";});}catch(e){}return r;};
  nfm.__r389=1;W.fillMsg=nfm;try{fillMsg=nfm;}catch(e){}}
W.IngAppFold={cutApp:cutApp,isApp:isApp};
})();
;try{window.__ingParts["p389"]="running";}catch(_){}
</script>
