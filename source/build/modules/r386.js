<style id="r386-css">
/* ============ R386 · INGENIA TO THE LEFT, AND WHAT AN APP IS, AS SHE SAYS IT (Ingenium 7.86, 25 November 2026) ============
   Her words (25 November 2026): "The 'Your apps' card and basically every content of the tabs on the Ingenia page is set to the middle of
   the page but the tab navigation bar is set to the far left so it's all looks bad. I want the contents of the tabs pages moved to the far
   left as well to match the tabs navigation bar." On a wide screen Ingenia's head (.fd-head) and the room under the tabs (.fld-wrap) stood
   in a column 1,180 pixels wide set in the middle (r263, r208); they now start at the left, where the tabs start, and take the width there
   is, as the rest of Ingenium does on her 34-inch display. */
#page-folders .fd-head,#page-folders .fld-wrap{max-width:none !important;margin-left:0 !important;margin-right:0 !important}
/* her words (25 November 2026), of Vesta's and Ingenia's 3D headers on her display: "I want both pages' 3D headers to adjust for the pages".
   On a wide screen the drawer of apps grows with the head, as Vesta's stones do (r291's view comes closer as its head widens) */
@media (min-width:2200px){#page-folders .fd-head .fd-drawer{transform:scale(1.2);transform-origin:100% 50%;margin-block:34px}}
@media (min-width:2900px){#page-folders .fd-head .fd-drawer{transform:scale(1.4);transform-origin:100% 50%;margin-block:76px}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p386"]="started";}catch(_){}
/* R386, part two. Her words (25 November 2026), of one of her apps' folders, which a model's summary had called a Windows app: "It is
   an app for all devices, this needs to be corrected as well."
   What an app is, as she says it, is kept as facts of that app (state.appFacts, by the app's name) and comes first whenever Ingenia brings
   a folder's notes up to date (modules/r208.js reads IngAppFacts.block): the model is told the facts stand above anything else and never
   to name a system the facts do not name. Her own apps' facts are given on her master copy only (modules/r387.js), as an
   edition names none of her apps; a summary written before a fact, in words the fact corrects, is corrected in place, once, and says so. window.IngAppFacts: {of(name), add(name, text), block(name), fix(folder)} */
(function r386(){"use strict";
if(window.IngAppFacts)return;
var W=window;
/* the facts and corrections an edition carries are given by seed() (her master copy: modules/r387.js); no app is named here */
var SEED={},FIX={};
function key(n){return String(n||"").trim().toLowerCase().replace(/\s+/g," ");}
function st(){try{if(!state.appFacts||typeof state.appFacts!=="object")state.appFacts={};var F=state.appFacts;
    Object.keys(SEED).forEach(function(k){F[k]=F[k]||[];SEED[k].forEach(function(s){if(!F[k].some(function(x){return x.t===s.t;}))F[k].push(Object.assign({src:"her"},s));});});return F;}catch(e){return {};}}
function of(n){var F=st();return (F[key(n)]||[]).slice();}
function add(n,t){t=String(t||"").trim();if(!t)return false;var F=st(),k=key(n);F[k]=F[k]||[];if(F[k].some(function(x){return x.t===t;}))return false;F[k].push({t:t,src:"her",at:new Date().toISOString().slice(0,10)});try{saveState();}catch(e){}return true;}
function block(n){var L=of(n);if(!L.length)return "";return "WHAT THE APP IS, AS I HAVE SAID IT (true above everything else here; never name a system, device or platform these facts do not name):\n"+L.map(function(x){return "- "+x.t;}).join("\n");}
function fix(p){try{if(!p||!p.app)return false;var k=key(p.name),R=FIX[k];if(!R||!p.app.brief)return false;var b=p.app.brief,n=b;R.forEach(function(r){n=n.replace(r[0],r[1]);});
    if(n===b)return false;p.app.brief=n;p.app.fixedAt=Date.now();p.app.fixNote=FIX[k].note||"Corrected at your word.";return true;}catch(e){return false;}}
/* seed(name, facts [{t, her, at}], fixes [[RegExp, words]], note): facts she gave, and the words of a summary they correct */
function seed(n,facts,fixes,note){var k=key(n);SEED[k]=(SEED[k]||[]).concat(facts||[]);if(fixes){FIX[k]=fixes.slice();FIX[k].note=note||"";}st();}
W.IngAppFacts={of:of,add:add,block:block,fix:fix,key:key,seed:seed};
})();
;try{window.__ingParts["p386"]="running";}catch(_){}
</script>
