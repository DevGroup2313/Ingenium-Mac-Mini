<script>try{(window.__ingParts=window.__ingParts||{})["p85"]="started";}catch(_){}
/* ============ R164 · A CODE EDITOR WHERE CODE IS WRITTEN (Ingenium 6.3, 23 October 2026) ============
   The owner's words: "I want them to be great platforms and workbench to do serious coding, creating and developing apps and
   softwares both with AI and without AI." Every box of code in Ingenium was a plain text box. The shared editor
   (thoughts/code_editor_core.html, from codeedit/; the Forge carries the same), written in just before this part, now stands
   in each one's place: Build's page, Build's part of a large page, and Fabrica's file. Colours for each language, line numbers,
   folding, matching brackets, find and replace (Ctrl+F, with whole words, case and patterns), go to a line (Ctrl+Alt+G), more
   than one cursor (Alt and click, or Ctrl+D), completion, and undo that remembers far back; a large page opens whole, its
   encoded data shown as short marks. The boxes stay what the rest of Ingenium reads and writes, so nothing else changes.
   And with an editor this quick, Fabrica edits a file of up to 480 MB in place (128 MB on a tablet or a phone): it stopped at
   6 MB. Measured: a 492 MB file is taken in about 20 seconds and each key is answered in about 10 ms. */
(function r164(){
"use strict";
if(!window.IngEditor){try{console.warn("R164: the shared code editor (thoughts/code_editor_core.html) is missing");}catch(e){}return;}
var SMALL=(typeof INB!=="undefined"&&INB)||(navigator.deviceMemory&&navigator.deviceMemory<=4)||/Android|iPhone|iPad|Silk|Kindle/i.test(navigator.userAgent||"");
window.ingEditMaxMB=SMALL?128:480;   /* a text a browser can hold whole stops a little past 512 MB; this leaves it room */
IngEditor.auto("#codeEditor",{lang:"html",label:"The page's code"});
IngEditor.auto("#bdText",{label:"This part of the page"});
/* Fabrica's file: its language from the file chosen beside it */
IngEditor.auto("#fbEdText",{label:"The file's text",nameFrom:function(ta){var box=ta.parentNode,s=box&&box.querySelector("select");return s?s.value:"";}});
})();
;try{window.__ingParts["p85"]="running";}catch(_){}
</script>
