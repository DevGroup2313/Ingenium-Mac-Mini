<script>try{(window.__ingParts=window.__ingParts||{})["p336"]="started";}catch(_){}
/* ============ R336 · ANOTHER PERSON'S PROFILE NAMES NONE OF HER APPS (Ingenium 7.46, 19 November 2026) ============
   Her words (19 November 2026): "I do not want any of my apps built-in any editions outside of the master edition. Ingenium itself is not
   exempt from that ... They should be starting the app fresh as a new user and none of my apps (Ingenium included) should be coming up on
   there unless I upload them on there. If they aren't me then Ingenium or any of them should [not] show up on the "Your apps" section in
   Fabrica ... the same for the chat pages and any other pages with that issue on Ingenium."
   Another person's profile on her master copy runs as the full edition (7.44, R331), but it is her own page, which names her apps where
   the full edition's page does not (build/editions.py takes those words out of it). So, in that profile only:
   1. the app library knows no app by name, as the full edition's (LIB_KEYS emptied): a page that person adds, whatever app it is, is kept
      as any other app (modules/r240.js), and nothing is kept for them on first start (modules/r120.js);
   2. each sentence of the page that names her apps is said as the full edition says it (the same words as build/editions.py), wherever and
      whenever it is drawn, in the text and in the titles, labels and placeholders. What that person writes or reads of their own (their
      conversations, what they type, a file or code they open) is never touched.
   Lector's list (r108), Home's plaque (r147), the chat's + menu (build_page.py), Folders' Your apps (r208) and What is new (r222) do the
   same in their own code. In her own profile, and in every other edition, this part does nothing.
   7.52 (her answer, 20 November 2026: "Yes for the mini app question"): the five apps of the Desk (Tabula, Abacus, Imago, Scriba,
   Fontes) are hers too, so this profile, the full edition, has none of them: r231 takes their keys, pages, routes and tour steps away
   here as in the other editions, r147 draws Home's instruments alone, Lector and Vocatio draw no Open in Tabula; and here the Desk's
   sentences are said as the other editions say them (build/editions.py, _no_desk), and the keys that send something to those apps, and
   the Guide's tip on them, are taken away. Ingenium's own reference database (Fontes, the chat's My sources) and its model house
   (Scriba) stay: they are not the apps of those names. */
(function r336(){"use strict";
var W=window,D=document;
if(!W.__ingGuest)return;
try{if(typeof LIB_KEYS!=="undefined"&&Object.prototype.toString.call(LIB_KEYS)==="[object Array]")LIB_KEYS.length=0;}catch(e){}
/* the full edition's own words (build/editions.py: _blank, _open_words), each in place of the master's */
var SAY=[
  ["Carpe Diem's own apps open on the Desk; the instruments open over this page.","These apps open on the Desk; the instruments open over this page."],
  ["Your own studio for local AI models, in the family of Carpe Diem and The Forge. It runs","Your own studio for local AI models. It runs"],
  ["One page (.html), with its scripts and styles inside it: Carpe Diem, The Forge, Inkwell or Ingenium.","One page (.html), with its scripts and styles inside it."],
  ["Carpe Diem, My Notes…","My Notes, Garden Planner…"],
  ["A package of The Forge or Ingenium installs over one built online from its project when","A package installs over one built online from its project when"],
  [": the same Tabula as in Carpe Diem, with",", with"],
  [": the same Abacus as in Carpe Diem, with",", with"],
  ["whole: the same app as in Carpe Diem, with","whole, with"],
  [" is part of Carpe Diem, not of Ingenium."," is not part of this Ingenium."],
  [" Carpe Diem and the Forge carry the same supports, in their own colours.",""],
  ["The apps, as in Carpe Diem","The apps"],
  ["are Carpe Diem's own apps, whole.","are apps of their own, whole."],
  ["Build, Blend, and Carpe Diem's five apps.","Build, Blend, and the five apps."],
  ["Build, Blend and Carpe Diem's five apps turn answers","Build, Blend and the five apps turn answers"],
  ["Out of session, as in Carpe Diem. Starting Clepsydra","Out of session. Starting Clepsydra"],
  ["its app's own seal (Carpe Diem, The Forge, Ingenium and Inkwell carry theirs, by day and by night as your Display is; any other app has a coin with its first letter)",
   "its app's own seal (Ingenium carries its own, by day and by night as your Display is; any other app has a coin with its first letter)"],
  ["the master logo of the Offline Project, each app's logo on a document","each app's logo on a document"],
  ["Your apps, Ingenium itself, an app in Fabrica, or a page from this device","Your apps, an app in Fabrica, or a page from this device"],
  ["Your apps, Ingenium itself, an app in Fabrica, or a sample.","Your apps, an app in Fabrica, or a sample."],
  ["Opens your apps, Ingenium itself, an app in Fabrica, or a file.","Opens your apps, an app in Fabrica, or a file."],
  /* 7.52: the Desk's sentences, as every other edition says them (build/editions.py, _no_desk) */
  ["Sort it later: to a note, to Tabula, into steps, to the chat, to a reminder, or done.","Sort it later: to a note, into steps, to the chat, to a reminder, or done."],
  ["goes where it belongs: to a note, to Tabula, into steps, to the chat, to a reminder, or done.","goes where it belongs: to a note, into steps, to the chat, to a reminder, or done."],
  ["pin one to the page, search the rest, and send any of them into Tabula when a thought is ready to become writing.","pin one to the page, and search the rest."],
  ["Notes, Tabula, a Word file, or the clipboard","Notes, a Word file, or the clipboard"],
  ["or the speech model the first time you dictate or record (Scriba's, fetched once and kept).","or the speech model the first time you dictate (fetched once and kept)."],
  ["your notes on sources, the Tabula page, your sticky notes and your project files","your notes on sources, your sticky notes and your project files"],
  ["and its errands: send it to Tabula when a thought is ready to become writing. The row beneath","and its errands. The row beneath"],
  [", and can be sent into Tabula when it is ready to become writing.","."],
  ["and Lector's Suggestions, Copy and Open in Tabula are keys now.","and Lector's Suggestions and Copy are keys now."],
  ["writes what you say with Scriba's own speech models","writes what you say with Ingenium's own speech models"]];
var ANY=/Carpe Diem|The Forge|the Forge|Inkwell|Offline Project|Ingenium itself|Ingenium\.|Tabula|Scriba's/;
/* never what the person writes or reads of their own */
var MINE="textarea,input,select,[contenteditable],.msg,.md,pre,code,iframe,script,style";
var ATTRS=["title","aria-label","placeholder","alt"];
function say(v){var t=v;for(var i=0;i<SAY.length;i++)if(t.indexOf(SAY[i][0])>=0)t=t.split(SAY[i][0]).join(SAY[i][1]);return t;}
function own(e){try{return !!(e&&e.closest&&e.closest(MINE));}catch(x){return true;}}
function text(n){var v=n.nodeValue;if(!v||!ANY.test(v))return;var p=n.parentElement;if(!p||own(p))return;var t=say(v);if(t!==v)n.nodeValue=t;}
function attrs(e){if(own(e))return;for(var i=0;i<ATTRS.length;i++){var v=e.getAttribute(ATTRS[i]);if(v&&ANY.test(v)){var t=say(v);if(t!==v)e.setAttribute(ATTRS[i],t);}}}
/* 7.52: the keys that send something to the Desk's apps (a note's menu, Schedae, the Inbox, Blend, the workbench) and the Guide's tip on
   the five apps (its mark "T" stands right before the word, so the tip's text reads "TTabula is..."); never in what the person writes
   or reads of their own */
var DESKKEY=/^(?:📝\s*)?(?:Send to Tabula|To Tabula|My Tabula page|Tabula)$/;
function deskless(){try{return typeof ING_HAS==="function"&&!ING_HAS("desk");}catch(e){return false;}}
function drop(root){if(!root||root.nodeType!==1||!deskless())return;var q=[],gone=[];
  try{if(root.matches&&root.matches("button,.tip"))q.push(root);[].push.apply(q,root.querySelectorAll("button,.tip"));}catch(e){return;}
  q.forEach(function(e){if(own(e))return;var t=(e.textContent||"").replace(/\s+/g," ").trim();
    if(e.classList.contains("tip")){if(/Tabula is the writing tablet/.test(t))gone.push(e);}else if(DESKKEY.test(t))gone.push(e);});
  gone.forEach(function(e){try{e.remove();}catch(x){}});}
function sweep(root){if(!root)return;
  if(root.nodeType===3){text(root);return;}
  if(root.nodeType!==1||own(root))return;
  drop(root);if(!root.isConnected)return;
  attrs(root);
  var w=D.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode:function(n){return n.nodeType===1&&own(n)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}}),n;
  while((n=w.nextNode())){if(n.nodeType===3)text(n);else attrs(n);}}
var mo=null;
function watch(){if(mo||!D.body)return;sweep(D.body);
  mo=new MutationObserver(function(rs){for(var i=0;i<rs.length;i++){var r=rs[i];
    if(r.type==="characterData")text(r.target);
    else if(r.type==="attributes")attrs(r.target);
    else for(var j=0;j<r.addedNodes.length;j++)sweep(r.addedNodes[j]);}});
  mo.observe(D.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTRS});}
if(D.body)watch();else D.addEventListener("DOMContentLoaded",watch);
/* What is new (r222) asks this of each line, in that profile only */
var HERS=/\b(Carpe Diem|The Forge|the Forge|Inkwell|Lakay|Clavis|Offline Project)\b/;
W.IngNotHers={say:say,sweep:sweep,hers:function(t){return HERS.test(String(t||""));}};
})();
;try{window.__ingParts["p336"]="running";}catch(_){}
</script>
