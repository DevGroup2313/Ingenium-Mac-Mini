<style id="r297-css">
/* ============ R297 · INGENIUM'S OWN RULES, IN INGENIUM'S FOLDER (Ingenium 7.07, 14 November 2026) ============
   Her words (14 November 2026): "I don't want Fabrica or any other page inside of Ingenium to be limited to only tabs and just one page,
   Fabrica can have other pages apart from the main page to further develop it and achieve full parity with Github if necessary, please
   add that rule to the app and its folders. You don't have to squish everything into one page, we can create more space, pages, tabs and
   sections as needed as long as it does not ruin the design and template of the app and can be done tastefully to further enhance the
   app and its capabilities."
   So Ingenium's folder on the Folders page holds Ingenium's own rules, built in: a card among its papers, each rule a slip as the build
   library's notes are (modules/r258.js, dressed by r263), which opens her own words when pressed; and every conversation in that folder
   carries them to the model, after How I work on Ingenium (the chat's system prompt, as modules/r208.js gives a folder's notes). The
   master edition's alone (build/editions.py): they are her rules for building Ingenium. The same rule is kept with the sources
   (source/README.md, Ingenium's own rules) for whoever builds Ingenium next. */
#page-folders .r297-rules{list-style:none;margin:8px 0 0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);gap:12px}
#page-folders .r297-rules .bl-row{display:block;width:100%;text-align:left}
#page-folders .r297-rules .bl-row b{display:block}
#page-folders .r297-rules .bl-row small{display:block;white-space:normal;font-size:13px;line-height:1.55;color:var(--ink-2);margin-top:4px}
#page-folders .r297-rules .r297-words{display:block;margin-top:8px;padding-top:8px;border-top:1px solid var(--hairline);font:italic 13px/1.55 var(--serif,Georgia,serif);color:var(--ink-2)}
#page-folders .r297-rules .r297-words[hidden]{display:none}
#page-folders .r297-rules .r297-when{display:block;margin-top:4px;font:600 10.5px/1.4 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p297"]="started";}catch(_){}
/* R297 · Ingenium's own rules, in Ingenium's folder: see the note at the top of its styles */
(function r297(){
"use strict";
if(window.__r297)return;window.__r297=1;
var D=document,W=window;
/* the rules, each with her own words and the day she gave it */
var RULES=[{name:"Pages may grow",
  rule:"Fabrica, and every other page of Ingenium, is never limited to one page and its tabs. A page may have pages of its own beyond its main one, and more tabs and sections, wherever the work needs the room, as Fabrica does to reach full parity with GitHub. Nothing is squeezed onto one page. Each new page, tab or section keeps the app's design and template, and is made tastefully, to enhance the app and what it can do.",
  words:"I don't want Fabrica or any other page inside of Ingenium to be limited to only tabs and just one page, Fabrica can have other pages apart from the main page to further develop it and achieve full parity with Github if necessary, please add that rule to the app and its folders. You don't have to squish everything into one page, we can create more space, pages, tabs and sections as needed as long as it does not ruin the design and template of the app and can be done tastefully to further enhance the app and its capabilities.",
  day:"14 November 2026"},
  /* 7.08: her words on the Folders previews (14 November 2026) */
  {name:"No flat or plain surfaces",
  rule:"Every surface of Ingenium is raised, layered or sunk with care, never flat or plain: every card, note, sheet, key and field has its depth (its edge, its light and its shadow, by day and by night), and every key lifts, sinks and sounds. A new page, card or sheet is made so from the start, and a flat one found is raised. Raised does not mean heavier or thicker: it keeps the app's own measured surfaces.",
  words:"Please make sure that there aren't any flat and plain surfaces on Ingenium as you continue working.",
  day:"14 November 2026"}];
function master(){try{return typeof ING_EDITION==="undefined"||ING_EDITION==="master";}catch(e){return true;}}
function isIngenium(p){return !!(p&&p.kind==="app"&&/^\s*ingenium\b/i.test(String(p.name||"")));}
function el(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.textContent=h;return e;}
/* the card among the folder's papers, placed where the build library's is, before How it was built */
function card(p,host,U){if(!U||typeof U.card!=="function")return;var c=U.card("Ingenium's own rules","Built in at your word. They go with every conversation in this folder, after How I work on "+p.name+".");
  c.classList.add("r297-card");var ul=el("ul","r297-rules");
  RULES.forEach(function(r,i){var li=el("li"),b=D.createElement("button");b.type="button";b.className="bl-row r297-rule";b.setAttribute("aria-expanded","false");
    b.appendChild(el("b",null,r.name));b.appendChild(el("small",null,r.rule));var w=el("span","r297-words","Your words: “"+r.words+"”");w.hidden=true;b.appendChild(w);b.appendChild(el("span","r297-when",r.day));
    b.title="Press to read your own words";
    b.addEventListener("click",function(){var open=b.getAttribute("aria-expanded")!=="true";b.setAttribute("aria-expanded",open?"true":"false");w.hidden=!open;b.title=open?"Press to fold your words away":"Press to read your own words";});
    li.appendChild(b);ul.appendChild(li);});
  c.appendChild(ul);host.appendChild(c);}
function hookFolder(){var BL=W.IngBuildLib;if(!BL||typeof BL.folder!=="function"||BL.folder.__r297)return false;var of=BL.folder;
  BL.folder=function(p,host,U){try{if(master()&&isIngenium(p))card(p,host,U);}catch(e){try{console.warn("Ingenium's own rules",e&&e.message||e);}catch(_){}}return of.apply(this,arguments);};
  BL.folder.__r297=1;return true;}
/* the model reads them with every conversation in Ingenium's folder; the wrapper keeps the mark r208 sets on its own, so whichever wraps
   first, the folder's notes and these rules both go */
function rulesText(){return "INGENIUM'S OWN RULES (built into Ingenium at my word; keep every one when working on Ingenium):\n"+RULES.map(function(r){return "- "+r.name+": "+r.rule;}).join("\n");}
function hookPrompt(){var o=W.chatSystemPrompt;if(typeof o!=="function"||o.__r297)return false;
  var w=function(){var r=o.apply(this,arguments);try{var p=typeof W.chatProject==="function"?W.chatProject():null;if(master()&&isIngenium(p))r=(r?r+"\n\n":"")+rulesText();}catch(e){}return r;};
  w.__r297=1;if(o.__r208)w.__r208=1;W.chatSystemPrompt=w;return true;}
function start(){hookFolder();hookPrompt();}
start();if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(start,0);});else setTimeout(start,0);
W.IngOwnRules={rules:function(){return RULES.map(function(r){return {name:r.name,rule:r.rule,day:r.day};});},text:rulesText,isIngenium:isIngenium};
try{window.__ingParts["p297"]="running";}catch(_){}
})();
</script>
