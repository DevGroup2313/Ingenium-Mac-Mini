<script>try{(window.__ingParts=window.__ingParts||{})["p86"]="started";}catch(_){}
/* ============ R165 · ROOM FOR MORE: THE LIMITS, MUCH HIGHER (Ingenium 6.3, 23 October 2026) ============
   The owner's words: "I need Fabrica's file size limit to be significantly raised [...] the rest of the app need their
   capacities and limits massively increased." Measured before this part: a browser holds one text of a little over 512 MB at
   most; the editor (R164) takes 492 MB in about 20 seconds and answers each key in about 10 ms; Fabrica opened, changed and
   saved a 400 MB file whole. So every limit below that stood far lower is raised (a tablet or a phone keeps a smaller share of
   each, for its smaller memory):
   - Fabrica: a file edited in place 480 MB (it was 6 MB); a file shown line by line in Changes and Compare up to 64 MB, in
     a version's history 48 MB (both versions together were held to 8 and 6 MB), in Blame 32 MB (3 MB), in the app's search
     64 MB a file and 20,000 files (8 MB and 2,000); a picture or file written into one page 128 MB (24 MB); a text file read
     whole 480 MB (40 MB);
   - Chat: a file attached 480 MB (400 MB); a project's or a personal AI's file 8 million characters (1 million);
   - a personal AI: 48 examples, 30 files, 600 lessons, 8 of them for each conversation (12, 6, 60 and 4);
   - writing: every box of words holds ten times as much (a remembered item, a parked thought, a task and its steps, About you,
     the rules every answer follows, a message to answer); 2,000 thoughts parked, 400 tasks (200 and 40);
   - and in the parts beside this one: a model trained for it may be given up to 1,048,576 tokens of memory (262,144), a reply
     131,072 (65,536); a page's own store 480 MB (256 MB); a backup restored, a chat export read, up to 480 MB a file.
   6.7 (the claims audit): these are the limits set, not all measured. What was measured: Chat, Code and Build with apps of
   107 and 240 MB (rig/t_62_capacity.js, with a stand-in model that answers at once) and Fabrica with a 400 MB file, all in
   Chromium on Linux; not yet in the Mac app's WebKit view, on a tablet or a phone, or with a real model answering. */
(function r165(){
"use strict";
var SMALL=(typeof INB!=="undefined"&&INB)||(navigator.deviceMemory&&navigator.deviceMemory<=4)||/Android|iPhone|iPad|Silk|Kindle/i.test(navigator.userAgent||"");
window.ingFabMB=SMALL?{diff:24,compare:16,history:12,blame:8,search:16,files:5000,inline:32,text:128}
                     :{diff:96,compare:64,history:48,blame:32,search:64,files:20000,inline:128,text:480};
try{if(typeof CHAT_FILE_MAX_MB==="number")CHAT_FILE_MAX_MB=Math.max(CHAT_FILE_MAX_MB,SMALL?200:480);}catch(e){}
try{if(typeof FILE_MAX_CHARS==="number")FILE_MAX_CHARS=Math.max(FILE_MAX_CHARS,SMALL?2000000:8000000);}catch(e){}
try{AI_MAX_EXAMPLES=Math.max(AI_MAX_EXAMPLES,48);AI_MAX_FILES=Math.max(AI_MAX_FILES,30);AI_MAX_LESSONS=Math.max(AI_MAX_LESSONS,600);AI_LESSONS_PER_CHAT=Math.max(AI_LESSONS_PER_CHAT,8);}catch(e){}
/* every box of words (a limit of 200 characters or more) holds ten times as much; names and identifiers keep theirs */
function roomy(root){try{(root.querySelectorAll?root.querySelectorAll("input[maxlength],textarea[maxlength]"):[]).forEach(raise);if(root.matches&&root.matches("input[maxlength],textarea[maxlength]"))raise(root);}catch(e){}}
function raise(f){if(f.__roomy)return;var n=f.maxLength;if(n>=200&&n<=20000){f.maxLength=n*10;f.__roomy=1;}}
roomy(document);
try{new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)roomy(n);});});}).observe(document.documentElement,{childList:true,subtree:true});}catch(e){}
})();
;try{window.__ingParts["p86"]="running";}catch(_){}
</script>
