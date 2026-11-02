<style id="r164-css">
/* R164 · the code editor in Ingenium's own colours and its raised, three-dimensional look (the owner: "I want for the colour
   palette and 3D animated popped out look and effect of Ingenium to be added to any new page or section of Ingenium [...]
   Nothing should look white and dull"). Its keys are Ingenium's own buttons (btn small, primary when on); the code sits on
   Ingenium's lavender card in a well, the gutter and the line being worked on in a wash of its violet, the helps on cards with a
   violet edge and serif headings. By night every colour follows Ingenium's night palette. Each colour of code keeps 4.5 to 1. */
.ic-ingenium .ic-host{background:linear-gradient(180deg,rgba(106,63,181,.05),rgba(106,63,181,0) 140px),var(--card,#faf8fc);box-shadow:var(--well,inset 0 1px 2.5px rgba(40,22,68,.08))}
.ic-ingenium .ic-host .cm-gutters{background:linear-gradient(90deg,rgba(106,63,181,.11),rgba(106,63,181,.035));border-right:1px solid rgba(106,63,181,.22);color:var(--ink-3,#6c6579)}
.ic-ingenium .ic-host .cm-activeLine{background:rgba(106,63,181,.075)}
.ic-ingenium .ic-host .cm-activeLineGutter{background:rgba(106,63,181,.17);color:var(--accent,#6a3fb5);font-weight:650}
.ic-ingenium .ic-host .cm-selectionBackground{background:rgba(106,63,181,.18) !important}
.ic-ingenium .ic-host .cm-focused .cm-selectionBackground{background:rgba(106,63,181,.30) !important}
.ic-ingenium .ic-host .cm-editor.cm-focused{outline:2px solid rgba(106,63,181,.55)}
.ic-ingenium .ic-host .cm-matchingBracket{background:rgba(201,151,40,.22);outline:1px solid rgba(160,110,20,.6)}
.ic-ingenium .ic-bar{background:linear-gradient(180deg,var(--card-hi,#fff),var(--card,#faf8fc));border-top:1px solid var(--hairline,rgba(34,26,46,.1));box-shadow:inset 0 1px 0 rgba(255,255,255,.75);color:var(--ink-2,#4a4358);padding:7px 10px;gap:8px}
.ic-ingenium .ic-bar select{font:600 12px var(--sans);color:var(--ink-1,#221a2e);border:1px solid rgba(106,63,181,.25);border-radius:9px;padding:4px 8px;background:linear-gradient(180deg,var(--card-hi,#fff),var(--card,#faf8fc));box-shadow:0 1px 0 rgba(40,22,68,.10),0 3px 6px rgba(40,22,68,.07)}
.ic-ingenium .ic-glossa,.ic-ingenium .ic-tidy{background:linear-gradient(180deg,rgba(106,63,181,.09),rgba(106,63,181,.025) 70%),var(--card,#faf8fc);border-top:1px solid rgba(106,63,181,.20);box-shadow:inset 4px 0 0 var(--accent,#6a3fb5),inset 0 1px 0 rgba(255,255,255,.7);color:var(--ink-1,#221a2e);padding:10px 14px 10px 16px}
.ic-ingenium .ic-gh{font:600 15.5px/1.3 var(--serif);color:var(--accent,#6a3fb5);letter-spacing:.01em;margin-bottom:6px}
.ic-ingenium .ic-gr b,.ic-ingenium .ic-ta2{color:var(--ink-2,#4a4358)}
.ic-ingenium .ic-tt{font-family:var(--serif);font-size:14px;color:var(--ink-1,#221a2e)}
.ic-ingenium .ic-tg{border-top-color:rgba(106,63,181,.18)}
.ic-ingenium .ic-mark{background:rgba(106,63,181,.11);color:var(--ink-2,#4a4358)}
.ic-ingenium .tok-keyword,.ic-ingenium .tok-controlKeyword{color:#6a3fb5}
.ic-ingenium .tok-string,.ic-ingenium .tok-string2{color:#0d6a58}
.ic-ingenium .tok-number,.ic-ingenium .tok-atom,.ic-ingenium .tok-bool,.ic-ingenium .tok-literal{color:#a14d00}
.ic-ingenium .tok-typeName,.ic-ingenium .tok-className,.ic-ingenium .tok-namespace,.ic-ingenium .tok-definition,.ic-ingenium .tok-variableName.tok-definition{color:#3b4aa0}
.ic-ingenium .tok-propertyName{color:#8b2f6f}
.ic-ingenium .tok-comment{color:var(--ink-3,#6c6579)}
.ic-ingenium.ic-dark .tok-keyword,.ic-ingenium.ic-dark .tok-controlKeyword{color:#c9a8ff}
.ic-ingenium.ic-dark .tok-string,.ic-ingenium.ic-dark .tok-string2{color:#86e0c8}
.ic-ingenium.ic-dark .tok-number,.ic-ingenium.ic-dark .tok-atom,.ic-ingenium.ic-dark .tok-bool,.ic-ingenium.ic-dark .tok-literal{color:#f3bf73}
.ic-ingenium.ic-dark .tok-typeName,.ic-ingenium.ic-dark .tok-className,.ic-ingenium.ic-dark .tok-namespace,.ic-ingenium.ic-dark .tok-definition{color:#a9b6ff}
.ic-ingenium.ic-dark .tok-propertyName{color:#f0a6d8}
.ic-ingenium.ic-dark .tok-comment{color:#aba3bb}
.ic-ingenium.ic-dark .ic-host{background:linear-gradient(180deg,rgba(170,130,255,.07),rgba(170,130,255,0) 140px),var(--card)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p85"]="started";}catch(_){}
/* ============ R164 · A CODE EDITOR WHERE CODE IS WRITTEN (Ingenium 6.3, 23 October 2026) ============
   The owner's words: "I want them to be great platforms and workbench to do serious coding, creating and developing apps and
   softwares both with AI and without AI." Every box of code in Ingenium was a plain text box. The shared editor
   (thoughts/code_editor_core.html, from codeedit/; the Forge carries the same), written in just before this part, now stands
   in each one's place: Build's page, Build's part of a large page, and Fabrica's file. Colours for each language, line numbers,
   folding, matching brackets, find and replace (Ctrl+F, with whole words, case and patterns), go to a line (Ctrl+Alt+G), more
   than one cursor (Alt and click, or Ctrl+D), completion, and undo that remembers far back; a large page opens whole, its
   encoded data shown as short marks. The boxes stay what the rest of Ingenium reads and writes, so nothing else changes.
   Under each editor, three helps for reading and learning (codeedit/learn.js): Glossa says where the cursor is, what the word
   under it means and what its line does, in plain words, and can put a question about the line in the chat; Calm softens
   the colours, gives the lines more room and keeps only the part being worked on in full colour; Lima (the file that
   polishes, as in Horace's "limae labor") shows what the
   code does not need (notes no one reads, empty lines, spaces, styles and functions nothing uses) and removes only what is
   chosen, all of it put back by one Undo.
   And with an editor this quick, Fabrica edits a file of up to 480 MB in place (128 MB on a tablet or a phone): it stopped at
   6 MB. Measured: a 492 MB file is taken in about 20 seconds and each key is answered in about 10 ms. */
(function r164(){
"use strict";
if(!window.IngEditor){try{console.warn("R164: the shared code editor (thoughts/code_editor_core.html) is missing");}catch(e){}return;}
var SMALL=(typeof INB!=="undefined"&&INB)||(navigator.deviceMemory&&navigator.deviceMemory<=4)||/Android|iPhone|iPad|Silk|Kindle/i.test(navigator.userAgent||"");
IngEditor.theme={wrap:"ic-ingenium",btn:"btn small",on:"primary"};   /* Ingenium's own buttons, and its colours (above) */
window.ingEditMaxMB=SMALL?128:480;   /* a text a browser can hold whole stops a little past 512 MB; this leaves it room */
IngEditor.auto("#codeEditor",{lang:"html",label:"The page's code"});
IngEditor.auto("#bdText",{label:"This part of the page"});
/* Glossa's "Ask about this line": the question waits in the chat's box, ready to send, never sent by itself */
IngEditor.ask=function(x){try{go("chat");}catch(e){}
  var q="Please explain this line of code to me in plain words. I am a humanities scholar learning to code, so please define any technical word you use, and say what would change if I edited it.\n\n"
    +(x.where?"Where it is: "+x.where+"\n":"")+(x.lang?"Language: "+x.lang+"\n":"")+"Line "+x.number+":\n```\n"+x.line+"\n```";
  setTimeout(function(){var ci=document.getElementById("chatInput");if(!ci)return;ci.value=q;try{ci.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}ci.focus();},250);};
/* Fabrica's file: its language from the file chosen beside it */
IngEditor.auto("#fbEdText",{label:"The file's text",nameFrom:function(ta){var box=ta.parentNode,s=box&&box.querySelector("select");return s?s.value:"";}});
})();
;try{window.__ingParts["p85"]="running";}catch(_){}
</script>
