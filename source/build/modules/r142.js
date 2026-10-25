<style id="r142-css">
/* ============ R142 · STORAGE, ITS LIMITS AND ITS ERRORS ============
   Settings, Storage: how much room each kind of thing takes, the limit the owner sets, calm warnings at 80 % and 95 %,
   whether the browser keeps it for good, old copies freed on their own when room runs short, Clean the library with an
   exact preview, and a log of what went. The notice below the top bar explains a full store or a damaged file. */
#stxCard{--sx-acc:var(--accent,#6a3fb5);--sx-ink1:var(--ink-1,#221a2e);--sx-ink2:var(--ink-2,#4a4358);--sx-ink3:var(--ink-3,#6c6579);--sx-hair:var(--hairline,rgba(34,26,46,.10));
  --sx-well:rgba(34,26,46,.045);--sx-wellsh:inset 0 1px 2.5px rgba(40,22,68,.10);--sx-a:var(--card-hi,#fff);--sx-b:var(--card-lo,#f6f2fa);
  --sx-slab:inset 0 1px 0 rgba(255,255,255,.85),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.09),0 3px 0 rgba(40,22,68,.04),0 6px 14px rgba(40,22,68,.07);
  --sx-pill:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1.5px 0 rgba(40,20,70,.10),0 1px 0 rgba(40,20,70,.12),0 3px 4px rgba(40,20,70,.08);
  --sx-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);
  --sx-ok:#2a6e4c;--sx-oks:rgba(47,122,85,.11);--sx-warn:#7f4c0c;--sx-warns:rgba(184,116,46,.12);--sx-full:#93301f;--sx-fulls:rgba(190,70,50,.10);
  --sx-fa:#7a52c4;--sx-fb:#5d37a1;--sx-spring:cubic-bezier(.34,1.35,.64,1)}
body[data-theme="night"] #stxCard{--sx-well:rgba(10,6,18,.35);--sx-wellsh:inset 0 1px 3px rgba(0,0,0,.45);--sx-a:#2a2239;--sx-b:#231c30;
  --sx-slab:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.55),0 3px 0 rgba(0,0,0,.25),0 6px 14px rgba(0,0,0,.35);
  --sx-pill:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -1.5px 0 rgba(0,0,0,.4),0 1px 0 rgba(0,0,0,.5),0 3px 5px rgba(0,0,0,.35);
  --sx-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);
  --sx-ok:#8fdcb0;--sx-oks:rgba(127,209,166,.13);--sx-warn:#f0c27e;--sx-warns:rgba(230,178,106,.13);--sx-full:#f4ab9b;--sx-fulls:rgba(240,120,100,.13);--sx-fa:#9a78dc;--sx-fb:#7a56c8}
#stxCard .stx-lead{margin:0 0 12px;max-width:72ch}
#stxCard .stx-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
#stxCard h3.stx-h{font-size:11.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--sx-ink3);margin:20px 0 8px;padding-bottom:6px;border-bottom:1px solid var(--sx-hair)}
#stxCard :focus-visible{outline:2px solid var(--sx-acc);outline-offset:2px}
#stxCard h2:focus{outline:none}#stxCard h2:focus-visible{outline:2px solid var(--sx-acc);outline-offset:4px;border-radius:4px}
/* the gauge: a slab with the figure, the meter in its well, and the marks at 80 % and 95 % */
#stxCard .stx-gauge{padding:14px 16px 12px;border-radius:16px;border:1px solid var(--sx-hair);background:linear-gradient(var(--sx-a),var(--sx-b));box-shadow:var(--sx-slab)}
#stxCard .stx-big{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
#stxCard .stx-big b{font-family:var(--serif,Georgia,serif);font-size:27px;line-height:1.1;font-weight:600;color:var(--sx-ink1);font-variant-numeric:tabular-nums}
#stxCard .stx-big span{color:var(--sx-ink2);font-size:14px}
#stxCard .stx-meter{position:relative;height:13px;border-radius:999px;background:var(--sx-well);box-shadow:var(--sx-wellsh);margin:11px 0 4px;overflow:hidden}
#stxCard .stx-fill{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:999px;background:linear-gradient(var(--sx-fa),var(--sx-fb));box-shadow:inset 0 1px 0 rgba(255,255,255,.28);transition:width .7s var(--sx-spring)}
#stxCard .stx-meter[data-level="1"] .stx-fill{background:linear-gradient(#cf9a4c,#a8742a)}
#stxCard .stx-meter[data-level="2"] .stx-fill{background:linear-gradient(#d4705a,#a8442f)}
#stxCard .stx-tick{position:absolute;top:2px;bottom:2px;width:2px;margin-left:-1px;border-radius:2px;background:var(--sx-ink3);opacity:.45}
#stxCard .stx-marks{position:relative;height:15px;font-size:11px;color:var(--sx-ink3)}
#stxCard .stx-marks span{position:absolute;transform:translateX(-50%);white-space:nowrap}
#stxCard .stx-state{margin:6px 0 0;font-size:13.5px;line-height:1.5;color:var(--sx-ink2)}
#stxCard .stx-warn{margin-top:12px;padding:11px 13px;border-radius:12px;border:1px solid transparent;font-size:13.5px;line-height:1.5}
#stxCard .stx-warn p{margin:0 0 9px;color:var(--sx-ink1)}
#stxCard .stx-warn[data-level="1"]{background:var(--sx-warns);border-color:rgba(184,116,46,.28)}
#stxCard .stx-warn[data-level="2"]{background:var(--sx-fulls);border-color:rgba(190,70,50,.3)}
#stxCard .stx-warn b{color:var(--sx-ink1)}
#stxCard .stx-keys{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
/* kept for good */
#stxCard .stx-persist{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:12px 0 0}
#stxCard .stx-persist p{margin:0;flex:1 1 260px;color:var(--sx-ink2)}
#stxCard .stx-pdot{width:10px;height:10px;border-radius:50%;flex:0 0 auto;background:var(--sx-ink3);box-shadow:0 0 0 3px var(--sx-well)}
#stxCard .stx-persist[data-kept="yes"] .stx-pdot{background:var(--sx-ok)}
#stxCard .stx-persist[data-kept="no"] .stx-pdot{background:#c08a3e}
/* what takes the room: one small slab for each store */
#stxCard .stx-kinds{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:8px}
#stxCard .stx-kinds li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 12px;align-items:start;padding:10px 12px;border-radius:12px;border:1px solid var(--sx-hair);background:linear-gradient(var(--sx-a),var(--sx-b));box-shadow:var(--sx-pill);min-width:0}
#stxCard .stx-kinds li.stx-wait{display:block;color:var(--sx-ink3);font-size:13px;box-shadow:none;background:var(--sx-well)}
#stxCard .stx-kinds .k-name{font-weight:600;font-size:14px;color:var(--sx-ink1);overflow-wrap:anywhere}
#stxCard .stx-kinds .k-size{font-weight:700;font-size:14px;font-variant-numeric:tabular-nums;color:var(--sx-ink1);text-align:right;white-space:nowrap}
#stxCard .stx-kinds .k-what{grid-column:1/-1;font-size:12.5px;line-height:1.4;color:var(--sx-ink3)}
#stxCard .stx-kinds .k-bar{grid-column:1/-1;height:6px;border-radius:999px;background:var(--sx-well);box-shadow:var(--sx-wellsh);overflow:hidden;margin-top:5px}
#stxCard .stx-kinds .k-bar i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(var(--sx-fa),var(--sx-fb));transition:width .6s var(--sx-spring)}
#stxCard .stx-mrow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:9px}
#stxCard .stx-mrow p{margin:0;flex:1 1 280px}
/* the limit and the old copies */
#stxCard .stx-limit label,#stxCard .stx-keepn label{display:block;font-size:13px;font-weight:600;color:var(--sx-ink2);margin-bottom:5px}
#stxCard .stx-lin{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
#stxCard .stx-lin input,#stxCard .stx-keepn input,#stxCard .stx-lin select{font:inherit;font-size:14px;padding:7px 10px;border-radius:10px;border:1px solid var(--sx-hair);background:var(--sx-well);box-shadow:var(--sx-wellsh);color:var(--sx-ink1)}
#stxCard .stx-lin input{width:8.5em}#stxCard .stx-lin select{width:auto;min-width:5.5em;flex:0 0 auto;display:inline-block}#stxCard .stx-keepn input{width:5em}
#stxCard .stx-limit p{margin:7px 0 0}
#stxCard .stx-auto{margin:2px 0 12px}
#stxCard .stx-keepn{margin:0 0 8px}
/* the library: one slab for each app, its versions newest first */
#stxCard .stx-apps{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:10px;align-items:start}
#stxCard .stx-app{padding:12px 13px;border-radius:14px;border:1px solid var(--sx-hair);background:linear-gradient(var(--sx-a),var(--sx-b));box-shadow:var(--sx-slab);min-width:0}
#stxCard .stx-app h4{margin:0 0 4px;font-family:var(--serif,Georgia,serif);font-size:15.5px;font-weight:600;color:var(--sx-ink1);display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}
#stxCard .stx-app h4 span{font-family:inherit;font-size:12.5px;font-weight:500;color:var(--sx-ink3)}
#stxCard .stx-vers{list-style:none;margin:0;padding:0}
#stxCard .stx-vers li{display:flex;align-items:center;gap:6px 9px;flex-wrap:wrap;padding:7px 0;border-top:1px solid var(--sx-hair)}
#stxCard .stx-vers .v-name{font-weight:700;color:var(--sx-ink1);font-variant-numeric:tabular-nums}
#stxCard .stx-vers .v-meta{font-size:12.5px;color:var(--sx-ink3);flex:1 1 auto}
#stxCard .stx-chip{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;border-radius:999px;padding:2px 9px;line-height:1.5;background:var(--sx-well);color:var(--sx-ink2);border:1px solid var(--sx-hair);white-space:nowrap}
#stxCard .stx-chip.ok{background:var(--sx-oks);color:var(--sx-ok);border-color:transparent}
#stxCard .stx-chip.warn{background:var(--sx-warns);color:var(--sx-warn);border-color:transparent}
#stxCard .stx-chip.mine{background:rgba(106,63,181,.10);color:var(--sx-acc);border-color:transparent}
body[data-theme="night"] #stxCard .stx-chip.mine{background:rgba(183,156,230,.14)}
#stxCard .stx-pin{border-radius:999px !important}
#stxCard .stx-pin[aria-pressed="true"]{background:linear-gradient(var(--sx-fa),var(--sx-fb)) !important;color:#fff !important;border-color:#4b2a86 !important;box-shadow:var(--sx-press) !important;transform:translateY(1px)}
#stxCard .stx-none{margin:0;color:var(--sx-ink3);font-size:13.5px}
#stxCard .stx-cleanrow{margin-top:12px}
#stxCard .stx-cleanrow .small{flex:1 1 240px}
/* the log, and what this copy carries */
#stxCard details{margin-top:14px;border:1px solid var(--sx-hair);border-radius:12px;padding:0 12px;background:var(--sx-well)}
#stxCard details summary{cursor:pointer;padding:10px 0;font-weight:600;font-size:14px;color:var(--sx-ink1);list-style-position:inside}
#stxCard details[open] summary{border-bottom:1px solid var(--sx-hair);margin-bottom:8px}
#stxCard .stx-log{margin:0 0 10px;padding:0;list-style:none}
#stxCard .stx-log>li{padding:8px 0;border-bottom:1px solid var(--sx-hair);font-size:13.5px;line-height:1.5;color:var(--sx-ink2)}
#stxCard .stx-log>li:last-child{border-bottom:0}
#stxCard .stx-log>li b{color:var(--sx-ink1)}
#stxCard .stx-log ul{margin:4px 0 0 18px;padding:0;font-size:12.5px;color:var(--sx-ink3)}
#stxCard .stx-parts{list-style:none;margin:0 0 10px;padding:0;display:grid;gap:6px}
#stxCard .stx-parts li{display:flex;gap:9px;align-items:baseline;flex-wrap:wrap;font-size:13.5px;color:var(--sx-ink2)}
#stxCard .stx-parts li b{color:var(--sx-ink1)}
/* the preview of Clean the library */
#modalBox .stx-pv{max-width:640px}
#modalBox .stx-pv h3{margin:0 0 6px}
#modalBox .stx-pv .stx-pv-lead{margin:0 0 12px;font-size:13.5px;line-height:1.55;color:var(--ink-2,#4a4358)}
#modalBox .stx-pv-list{max-height:min(46vh,420px);overflow:auto;margin:0 0 12px;padding:4px 12px;border-radius:12px;border:1px solid var(--hairline,rgba(34,26,46,.1));box-shadow:inset 0 1px 2.5px rgba(40,22,68,.08)}
#modalBox .stx-pv-list h4{margin:10px 0 4px;font-size:13px;font-weight:700;color:var(--ink-1,#221a2e);display:flex;justify-content:space-between;gap:10px}
#modalBox .stx-pv-list ul{margin:0 0 6px;padding:0 0 0 18px;font-size:13px;line-height:1.55;color:var(--ink-2,#4a4358)}
#modalBox .stx-pv-list .stx-proof{margin:2px 0 8px;font-size:12px;color:var(--ink-3,#6c6579)}
#modalBox .stx-pv-total{font-weight:700;margin:0 0 12px;color:var(--ink-1,#221a2e)}
#modalBox .stx-pv-keys{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap}
/* the notice: a slab under the top bar, never in the way of the work */
#stxNote{position:fixed;left:50%;top:calc(62px + env(safe-area-inset-top,0px));z-index:960;width:min(580px,calc(100vw - 32px));box-sizing:border-box;display:flex;gap:12px;align-items:flex-start;
  padding:13px 14px 12px;border-radius:16px;color:var(--ink-1,#221a2e);background:var(--card-hi,#fff);border:1px solid var(--hairline,rgba(34,26,46,.12));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 1px 0 rgba(40,22,68,.1),0 8px 18px rgba(40,22,68,.14),0 22px 44px rgba(40,22,68,.12);
  opacity:0;transform:translate(-50%,-10px);transition:opacity .2s ease,transform .38s cubic-bezier(.34,1.35,.64,1)}
#stxNote.on{opacity:1;transform:translate(-50%,0)}
#stxNote .stx-dot{width:12px;height:12px;border-radius:50%;margin-top:4px;flex:0 0 auto;background:#6a3fb5;box-shadow:0 0 0 4px rgba(106,63,181,.14)}
#stxNote.stx-warn .stx-dot{background:#b97a2c;box-shadow:0 0 0 4px rgba(184,116,46,.16)}
#stxNote.stx-full .stx-dot{background:#b4402a;box-shadow:0 0 0 4px rgba(190,70,50,.15)}
#stxNote .stx-nb{min-width:0;flex:1 1 auto}
#stxNote .stx-nb b{display:block;font-size:14.5px;margin-bottom:3px}
#stxNote .stx-nb p{margin:0 0 10px;font-size:13.5px;line-height:1.5;color:var(--ink-2,#4a4358)}
#stxNote .stx-nk{display:flex;flex-wrap:wrap;gap:8px}
#stxNote :focus-visible{outline:2px solid var(--accent,#6a3fb5);outline-offset:2px}
body[data-theme="night"] #stxNote{background:#251e33;border-color:rgba(205,184,240,.14);color:#f3eefb;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 1px 0 rgba(0,0,0,.6),0 8px 18px rgba(0,0,0,.45),0 22px 44px rgba(0,0,0,.45)}
body[data-theme="night"] #stxNote .stx-nb p{color:#d3c9e3}
body[data-theme="night"] #stxNote .stx-dot{background:#b79ce6}
/* the room line of Data on this device (R132) now lives in Storage, with more */
#stxCard~.card #r132Room{display:none}
@media (max-width:520px){#stxCard .stx-big b{font-size:23px}#stxCard .stx-gauge{padding:12px}#stxNote{top:calc(56px + env(safe-area-inset-top,0px))}}
@media (prefers-reduced-motion:reduce){#stxCard .stx-fill,#stxCard .k-bar i,#stxNote{transition:none}#stxCard .stx-pin[aria-pressed="true"]{transform:none}}
body[data-motion="minimal"] #stxCard .stx-fill,body[data-motion="minimal"] #stxCard .k-bar i,body[data-motion="minimal"] #stxNote{transition:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p63"]="started";}catch(_){}
/* ============ R142 · STORAGE, ITS LIMITS AND ITS ERRORS ============
   The owner's words (20 October 2026): "implement storage management policies to automatically evict old app versions
   when storage limits are approached. Add robust error handling for ZIP file corruption, storage quota exceeded, and
   missing dependencies. ... Add user-controlled storage limits with warnings before reaching capacity. ... Implement a
   "clean library" function to remove unused app versions and free up space."
   window.IngStore: what each store holds (measured, every store listed) and what the browser counts and offers; the limit
   the owner sets; calm warnings at 80 % and 95 % of it; persistent storage asked for and its answer kept; old copies freed
   on their own when room runs short (switchable; the newest N of each app stay, 3 unless she chooses); Clean the library,
   an exact preview and then one press; a readable log of what went.
   What may go, and only this: an app's older library versions beyond the newest N (never the newest, the only one, or
   one she marks Keep), Fabrica's older packages beyond N for each app and kind (they can be made again), and stored texts
   nothing names (proven: the chats, Lector's documents and readings, Code, Ask Lector's versions, the library, the
   recovery shelf and every other store are read first). Her chats, documents, projects, Fabrica's history, issues and
   keys are never touched.
   window.IngErr: say(e) puts an error in plain words: a full store (QuotaExceededError, caught inside every IndexedDB
   write, even the ones that swallow it), a damaged zip (not a zip, cut short, a wrong check sum, a way of packing Ingenium
   does not read: which file and what), and a missing part (this window's store, the kit store, the Android or iPhone
   shell, a file a page names that is not there). It is wired where errors reach her: Download as an app (R139 calls it),
   the toast, Fabrica's history and packages, the library, Word documents. */
(function(){"use strict";
var W=window,D=document;
if(W.IngStore&&W.IngErr)return;
function $i(i){return D.getElementById(i);}
function E(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function B(n){n=+n||0;try{if(typeof W.fmtBytes==="function")return W.fmtBytes(n);}catch(e){}var u=["B","KB","MB","GB","TB"],i=0;while(n>=1024&&i<4){n/=1024;i++;}return (n>=10?n.toFixed(0):n.toFixed(1))+" "+u[i];}
function day(t){try{return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});}catch(e){return "";}}
function dayTime(t){try{var d=new Date(t);return d.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})+", "+d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});}catch(e){return "";}}
function pc(x){return (x>0&&x<0.005)?"under 1 %":Math.round(x*100)+" %";}
function BZ(n){return n>0?B(n):"Empty";}
function B0(n){return n>0?B(n):"0 MB";}
function cap(s){s=String(s||"");return s.charAt(0).toUpperCase()+s.slice(1);}
function plural(n,one,many){return n+" "+(n===1?one:(many||one+"s"));}
function reduced(){try{return W.matchMedia("(prefers-reduced-motion: reduce)").matches||D.body.getAttribute("data-motion")==="minimal";}catch(e){return false;}}
/* the moment this window started: a stored text made since then may be named only by what this window holds in memory */
var SESSION_AT=Math.round((W.performance&&performance.timeOrigin)||Date.now());
var EVICT_AT=0.90,WARN1=0.80,WARN2=0.95,DEEP_MAX=160*1048576,MIN_AGE=60*60000;

/* ---------- the owner's settings: state.v61.storage ---------- */
var MEMS={};
function S(){var v;try{if(!state.v61||typeof state.v61!=="object")state.v61={};v=state.v61.storage;if(!v||typeof v!=="object")v=state.v61.storage={};}catch(e){v=MEMS;}
  if(typeof v.auto!=="boolean")v.auto=true;
  if(!(v.keepN>=1))v.keepN=3;
  if(!Array.isArray(v.log))v.log=[];
  if(!v.warned||typeof v.warned!=="object")v.warned={level:0,at:0};
  return v;}
function keepN(){return Math.max(1,Math.min(20,Math.round(+S().keepN||3)));}
function save(){try{if(typeof W.saveState==="function")W.saveState();}catch(e){}}

/* ================================================================================================================
   1. IngErr: errors in plain words
   ================================================================================================================ */
var Q={lastAt:0,shownAt:0,busy:false,noStore:false};
function msgOf(e){if(e==null)return "";if(typeof e==="string")return e;try{return String(e.message||e.name||e);}catch(x){return "";}}
function isFull(e){if(!e)return false;
  if(e.ingKind==="full")return true;
  var nm=e.name||"";if(nm==="QuotaExceededError"||nm==="NS_ERROR_DOM_QUOTA_REACHED")return true;
  if(typeof DOMException!=="undefined"&&e instanceof DOMException&&(e.code===22||e.code===1014))return true;
  var m=msgOf(e);
  /* the library's own words when neither store took a copy: full, when a refusal of room was just seen */
  if(/would not keep it/i.test(m))return !!(Q.lastAt&&Date.now()-Q.lastAt<20000);
  return /quota (has been |was )?(exceeded|reached)|QuotaExceeded|storage (for ingenium )?is full|store for ingenium is full|disk is full|no space left|not enough space|ENOSPC/i.test(m);}
var ZIP_RAW=[
  [/^notlib$|\bnot a zip\b|not a zip archive|is not a zip file/i,"notzip"],
  [/zip's directory is damaged|zip's list of files is broken|bad zip directory|bad zip64/i,"directory"],
  [/a file in the zip is broken|bad zip entry|^broken$/i,"entry"],
  [/packed in a way/i,"method"],
  [/this zip could not be read/i,"unread"]];
var PARTS_RAW=[
  [/keeps no store|indexedDB is not defined|window\.indexedDB|cannot keep things in its own store/i,"store"],
  [/does not carry the kit store/i,"kits"],
  [/carries no Android shell/i,"android"],
  [/carries no iPhone and iPad shell/i,"iphone"],
  [/cannot unpack a zip/i,"unzip"],
  [/no Web Crypto/i,"crypto"]];
var PART_WORDS={
  store:"This window cannot keep things in its own store: it may be a private window, or storage may be switched off for this site. What you make now lasts only while the window is open. Open Ingenium in an ordinary window, or use the Mac, Windows, Fire or iPhone app.",
  kits:"This copy of Ingenium does not carry the kit store (the phone and tablet apps leave it out), so it cannot make the Mac and Windows kits here. Make kits on a computer: in the Mac or Windows app, or with ingenium.html.",
  android:"This copy of Ingenium does not carry the Android shell, so it cannot make the Fire tablet app here. Ingenium on a computer carries it: the Mac or Windows app, or ingenium.html.",
  iphone:"This copy of Ingenium does not carry the iPhone and iPad shell, so it cannot make the iPhone and iPad app here. Ingenium on a computer carries it: the Mac or Windows app, or ingenium.html.",
  unzip:"This window cannot unpack zips. A newer browser, or the Mac or Windows app, can.",
  crypto:"This window cannot sign apps or check fingerprints, because it has no Web Crypto. Open Ingenium from its own app, or from a secure address."};
function partOf(m){for(var i=0;i<PARTS_RAW.length;i++)if(PARTS_RAW[i][0].test(m))return PARTS_RAW[i][1];return null;}
function zipRawOf(m){for(var i=0;i<ZIP_RAW.length;i++)if(ZIP_RAW[i][0].test(m))return ZIP_RAW[i][1];return null;}
function kind(e){if(!e)return "other";
  if(e.ingKind)return e.ingKind==="zip"||e.ingKind==="full"||e.ingKind==="missing"||e.ingKind==="files"?e.ingKind:(e.ingKind==="store"?"missing":"other");
  if(isFull(e))return "full";
  if(Array.isArray(e.missing)&&e.missing.length)return "files";
  var m=msgOf(e);
  if(partOf(m))return "missing";
  if(/would not keep it/i.test(m)&&!storeOk())return "missing";
  if(zipRawOf(m))return "zip";
  return "other";}
function zipWords(m,name){var k=zipRawOf(m),f=name?"“"+name+"”":"This file";
  if(k==="notzip")return f+" is not a zip file, so it cannot be opened as one.";
  if(k==="directory")return f+" is damaged: the list of the files inside it is broken. Copy or download it again.";
  if(k==="entry")return f+" is damaged: a file inside it is broken. Copy or download it again.";
  if(k==="method"){var w=/“([^”]+)”|^([^:]+): packed/.exec(m),inner=w?(w[1]||w[2]):"";return (inner?"“"+inner+"” inside "+(name?f:"the zip"):"A file inside "+(name?f:"the zip"))+" is packed in a way Ingenium does not unpack. Ingenium reads stored and deflated files; make the zip again with ordinary compression.";}
  if(k==="unread")return f+" could not be read: it may be damaged or cut short. Copy or download it again.";
  return cap(m);}
function filesWords(list,page){list=list||[];if(!list.length)return "";
  return (page?"The page "+page:"The page")+(list.length===1?" names a file that is not in the app: "+list[0]+".":" names "+list.length+" files that are not in the app: "+list.slice(0,4).join(", ")+(list.length>4?" and "+(list.length-4)+" more":"")+".")+" Add "+(list.length===1?"it":"them")+", or take the name out of the page.";}
var FULL_WORDS="This device's storage for Ingenium is full, so this could not be kept. Your own work kept before is still there. Settings, Storage shows what takes the room and can free some.";
/* e: any error; ctx: {name: the file's name, quiet: no notice, where} -> a plain sentence */
function say(e,ctx){ctx=ctx||{};var k=kind(e),m=msgOf(e);
  try{if(k==="full"){if(!ctx.quiet)full({where:ctx.where});return FULL_WORDS;}
    if(e&&e.__r142plain)return m;
    if(k==="zip")return (e&&e.ingKind==="zip")?m:zipWords(m,ctx.name);
    if(k==="missing"){var p=partOf(m)||(e&&e.part)||"store";return PART_WORDS[p]||cap(m);}
    if(k==="files")return filesWords(e.missing,e.page);}catch(x){}
  return cap(m||"something went wrong");}
/* an error turned into one that says the same in plain words, when it is one of these kinds; any other stays as it is */
function plainErr(e,ctx){var k=kind(e);if(k==="other"||(e&&e.__r142plain))return e;
  var x=new Error(say(e,ctx));x.name=(e&&e.name)||"Error";x.ingKind=k;x.cause=e;x.__r142plain=true;if(e&&e.zip)x.zip=e.zip;return x;}
function ZipError(message,info){var e=new Error(message);e.name="ZipError";e.ingKind="zip";e.zip=info||{};e.__r142plain=true;return e;}

/* ---------- the parts a copy of Ingenium may or may not carry ---------- */
function carries(id){var e=$i(id);return !!(e&&e.firstChild&&e.firstChild.length>8);}
function storeOk(){try{return !!W.indexedDB&&!Q.noStore;}catch(e){return false;}}
function parts(){var out=[];
  out.push({id:"store",ok:storeOk(),label:"Its own store on this device",why:"keeps your work between visits"});
  out.push({id:"unzip",ok:typeof W.DecompressionStream==="function"||!!(W.IngRepo&&IngRepo.core&&IngRepo.core.inflateRaw),label:"Unpacking zips",why:"opens app zips, Word documents and your library"});
  out.push({id:"crypto",ok:!!(W.crypto&&crypto.subtle),label:"Signing and fingerprints",why:"signs Android apps and checks that what arrives is whole"});
  out.push({id:"kits",ok:!!$i("ingenium-kit-bundle"),label:"The kit store",why:"makes the Mac and Windows kits"});
  out.push({id:"android",ok:carries("ing-android-shell")||!!W.__ingAndroidShell,label:"The Android shell",why:"makes the Fire tablet app"});
  out.push({id:"iphone",ok:carries("ing-ios-shell")||!!W.__ingIosShell,label:"The iPhone and iPad shell",why:"makes the iPhone and iPad app"});
  return out;}

/* ---------- the zip, checked: which file, and what is wrong with it ---------- */
var CRC_T=null;
function crc32(u8){var t=CRC_T,c,i,k;if(!t){t=CRC_T=new Int32Array(256);for(i=0;i<256;i++){c=i;for(k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[i]=c;}}
  c=-1;for(i=0;i<u8.length;i++)c=t[(c^u8[i])&255]^(c>>>8);return (c^-1)>>>0;}
var METHODS={1:"Shrink",2:"Reduce",3:"Reduce",4:"Reduce",5:"Reduce",6:"Implode",9:"Deflate64",10:"PKWARE Implode",12:"bzip2",14:"LZMA",18:"IBM TERSE",19:"LZ77",93:"Zstandard",94:"MP3",95:"XZ",96:"JPEG",97:"WavPack",98:"PPMd",99:"AES encryption"};
function methName(m){return (METHODS[m]||"an unknown method")+" (method "+m+")";}
function looksLike(u8){if(!u8||!u8.length)return "an empty file";var h=u8.subarray(0,Math.min(u8.length,512)),s="";try{s=new TextDecoder().decode(h).replace(/^﻿/,"").trim().slice(0,200);}catch(e){}
  var b=function(a){for(var i=0;i<a.length;i++)if(h[i]!==a[i])return false;return true;};
  if(/^<!doctype html|^<html[\s>]|^<head[\s>]|^<body[\s>]/i.test(s))return "a web page";
  if(/^<\?xml/i.test(s))return "an XML file";
  if(b([0x25,0x50,0x44,0x46]))return "a PDF";
  if(b([0x1f,0x8b]))return "a gzip file";
  if(b([0x52,0x61,0x72,0x21]))return "a RAR archive";
  if(b([0x37,0x7a,0xbc,0xaf]))return "a 7-Zip archive";
  if(b([0x89,0x50,0x4e,0x47]))return "a PNG picture";
  if(b([0xff,0xd8,0xff]))return "a JPEG picture";
  if(/^#\s*v[23] git bundle/.test(s))return "a git bundle";
  if(/^[\[{]/.test(s))return "a JSON file";
  var txt=0;for(var i=0;i<h.length;i++){var c=h[i];if(c===9||c===10||c===13||(c>=32&&c<127)||c>=0xc2)txt++;}
  if(h.length&&txt/h.length>0.95)return "plain text";
  return "something else: it does not begin the way a zip does";}
/* how many files at the start of a zip are whole, for a zip whose end is missing */
function wholeAtStart(u8,dv){var p=0,n=0;while(p+30<=u8.length&&dv.getUint32(p,true)===0x04034b50){var fl=dv.getUint16(p+6,true),csz=dv.getUint32(p+18,true),nl=dv.getUint16(p+26,true),xl=dv.getUint16(p+28,true);
    if(fl&8)break;var end=p+30+nl+xl+csz;if(end>u8.length)break;n++;p=end;}return n;}
function unpack(c,meth,usz){if(meth===0)return Promise.resolve(c);
  function viaJS(){if(W.IngRepo&&IngRepo.core&&typeof IngRepo.core.inflateRaw==="function"){var r=IngRepo.core.inflateRaw(c,0,usz);return r&&r.data?r.data:r;}throw new Error("cannot unpack");}
  try{if(typeof W.DecompressionStream==="function"){return new Response(new Blob([c]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer().then(function(b){return new Uint8Array(b);});}}catch(e){}
  return new Promise(function(res){res(viaJS());});}
/* u8: the zip's bytes; name: its file name; opt.deep (default true): unpack each file and compare its check sum
   -> {ok, name, files, problems:[{file, kind, what}], message} */
function zipCheck(u8,name,opt){opt=opt||{};name=String(name||"this file");
  return Promise.resolve().then(function(){if(!(u8 instanceof Uint8Array))u8=new Uint8Array(u8&&u8.buffer?u8.buffer:u8);
    var n=u8.length,probs=[],ents=[];
    function P(file,k,what){probs.push({file:file,kind:k,what:what});}
    function fin(){var r={ok:!probs.length,name:name,files:ents.filter(function(x){return !x.dir;}).length,problems:probs,message:""};if(probs.length)r.message=zipMessage(name,probs);return r;}
    if(n<4||!(u8[0]===0x50&&u8[1]===0x4b&&(u8[2]===3||u8[2]===5||u8[2]===7||u8[2]===0x30))){P(null,"notzip",looksLike(u8));return fin();}
    var dv=new DataView(u8.buffer,u8.byteOffset,u8.byteLength),eo=-1,i;
    for(i=n-22;i>=Math.max(0,n-65557);i--){if(dv.getUint32(i,true)===0x06054b50){eo=i;break;}}
    if(eo<0){var w=wholeAtStart(u8,dv);P(null,"short","it is cut short: it ends after "+B(n)+", before the list of its files"+(w?" (the first "+plural(w,"file")+" in it "+(w===1?"is":"are")+" whole)":""));return fin();}
    var cnt=dv.getUint16(eo+10,true),cdSize=dv.getUint32(eo+12,true),cdo=dv.getUint32(eo+16,true);
    if((cdo===0xffffffff||cnt===0xffff||cdSize===0xffffffff)&&eo>=20&&dv.getUint32(eo-20,true)===0x07064b50&&typeof dv.getBigUint64==="function"){
      var z=Number(dv.getBigUint64(eo-20+8,true));if(z+56<=n&&dv.getUint32(z,true)===0x06064b50){cnt=Number(dv.getBigUint64(z+32,true));cdSize=Number(dv.getBigUint64(z+40,true));cdo=Number(dv.getBigUint64(z+48,true));}}
    if(cdo>n||cdo+cdSize>n){P(null,"short","it is cut short: the list of its files points past its end");return fin();}
    var p=cdo,dec=new TextDecoder();
    for(var k=0;k<cnt;k++){if(p+46>n||dv.getUint32(p,true)!==0x02014b50){P(null,"directory","the list of the files inside it is broken after "+k+" of "+cnt+" files");break;}
      var fl=dv.getUint16(p+8,true),meth=dv.getUint16(p+10,true),crc=dv.getUint32(p+16,true),csz=dv.getUint32(p+20,true),usz=dv.getUint32(p+24,true),nl=dv.getUint16(p+28,true),xl=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),lho=dv.getUint32(p+42,true);
      var nm=dec.decode(u8.subarray(p+46,Math.min(n,p+46+nl)));
      if((csz===0xffffffff||usz===0xffffffff||lho===0xffffffff)&&typeof dv.getBigUint64==="function"){var xp=p+46+nl,xe=Math.min(n,xp+xl);while(xp+4<=xe){var id=dv.getUint16(xp,true),sz=dv.getUint16(xp+2,true),q=xp+4;
        if(id===1){if(usz===0xffffffff&&q+8<=xe){usz=Number(dv.getBigUint64(q,true));q+=8;}if(csz===0xffffffff&&q+8<=xe){csz=Number(dv.getBigUint64(q,true));q+=8;}if(lho===0xffffffff&&q+8<=xe){lho=Number(dv.getBigUint64(q,true));}}xp+=4+sz;}}
      ents.push({name:nm,flags:fl,meth:meth,crc:crc,csz:csz,usz:usz,lho:lho,dir:/\/$/.test(nm)&&!usz});p+=46+nl+xl+cl;}
    ents.forEach(function(e){if(e.dir)return;
      if(e.lho+30>n){P(e.name,"short","it is missing: the zip is cut short before it");e.bad=1;return;}
      if(dv.getUint32(e.lho,true)!==0x04034b50){P(e.name,"damaged","where it should begin, the zip holds something else");e.bad=1;return;}
      var s=e.lho+30+dv.getUint16(e.lho+26,true)+dv.getUint16(e.lho+28,true);e.start=s;
      if(s+e.csz>n){P(e.name,"short","it is cut short: the zip ends "+B(s+e.csz-n)+" before its end");e.bad=1;return;}
      if(e.flags&1){P(e.name,"locked","it is locked with a password, and Ingenium opens only zips without one");e.bad=1;return;}
      if(e.meth!==0&&e.meth!==8){P(e.name,"method","it is packed with "+methName(e.meth)+", which Ingenium does not unpack (it reads stored and deflated files)");e.bad=1;return;}});
    if(opt.deep===false)return fin();
    var chain=Promise.resolve();
    ents.forEach(function(e){if(e.dir||e.bad)return;chain=chain.then(function(){return unpack(u8.subarray(e.start,e.start+e.csz),e.meth,e.usz).then(function(d){
        if(d.length!==e.usz){P(e.name,"damaged","it unpacks to "+B(d.length)+" where it should be "+B(e.usz));return;}
        if(crc32(d)!==e.crc)P(e.name,"crc","what it holds does not match its check sum (CRC), so it changed after it was packed");},
      function(){P(e.name,"damaged","its packed data is broken and cannot be unpacked");});});});
    return chain.then(fin);});}
function zipMessage(name,probs){var f="“"+name+"”",a=probs[0],more=probs.length-1,again=" Copy or download it again.";
  if(a.kind==="notzip")return f+" is not a zip: it is "+a.what+".";
  if(!a.file){return f+" is "+(a.kind==="short"?"incomplete: ":"damaged: ")+a.what+"."+again;}
  var tail=more?" "+cap(plural(more,"more file"))+" inside "+(more===1?"has":"have")+" a problem too.":"";
  if(a.kind==="method"||a.kind==="locked")return "“"+a.file+"” inside "+f+": "+a.what+"."+tail+(a.kind==="method"?" Make the zip again with ordinary compression.":"");
  return f+" is damaged: “"+a.file+"” inside it: "+a.what+"."+tail+again;}

/* ---------- the notice under the top bar ---------- */
var NOTE={t:0,back:null};
function closeNote(){var n=$i("stxNote");if(!n)return;clearTimeout(NOTE.t);n.classList.remove("on");var b=NOTE.back;NOTE.back=null;
  setTimeout(function(){try{n.remove();}catch(e){}},reduced()?0:260);
  try{if(b&&n.contains(D.activeElement)&&D.contains(b))b.focus();}catch(e){}}
/* o: {kind: "full"|"warn"|"info", title, text, keys: [[label, fn, primary]], stay} */
function notice(o){o=o||{};var old=$i("stxNote");if(old)old.remove();clearTimeout(NOTE.t);
  var n=E("div","stx-"+(o.kind||"info"));n.id="stxNote";n.setAttribute("role",o.kind==="full"?"alert":"status");
  var dot=E("span","stx-dot");dot.setAttribute("aria-hidden","true");n.appendChild(dot);
  var body=E("div","stx-nb");body.appendChild(E("b",null,o.title||""));body.appendChild(E("p",null,o.text||""));
  var ks=E("div","stx-nk");
  (o.keys||[]).forEach(function(k){var b=E("button","btn small"+(k[2]?" primary":" ghost"),k[0]);b.type="button";b.onclick=function(){closeNote();try{k[1]();}catch(e){}};ks.appendChild(b);});
  var c=E("button","btn small ghost","Close");c.type="button";c.onclick=closeNote;ks.appendChild(c);
  body.appendChild(ks);n.appendChild(body);
  n.addEventListener("keydown",function(e){if(e.key==="Escape"){e.stopPropagation();closeNote();}});
  NOTE.back=D.activeElement;D.body.appendChild(n);
  var show=function(){n.classList.add("on");};if(reduced())show();else (W.requestAnimationFrame||setTimeout)(show);
  if(o.kind==="info"&&!o.stay)NOTE.t=setTimeout(closeNote,16000);
  return n;}

/* a full store: explained at once; when she lets Ingenium free room on its own, old copies go first */
function full(o){o=o||{};Q.lastAt=Date.now();var now=Date.now();
  if(Q.busy||(Q.shownAt&&now-Q.shownAt<15000&&!o.force))return;Q.shownAt=now;
  var s=S(),keys=[["Open Storage",openStorage,true]];
  function tell(ev){var freed=ev&&ev.items&&ev.items.length;
    notice({kind:"full",title:"This device's storage for Ingenium is full",
      text:"Something could not be kept just now, because the room Ingenium has here is used up. "
        +(freed?"Ingenium removed "+plural(ev.items.length,"old copy","old copies")+" to free "+B(ev.bytes)+": older versions of apps in your library beyond the newest "+keepN()+" of each, older packages, or stored texts nothing used (Settings, Storage lists them). Your own work stays. Try once more."
          :"Nothing kept before was removed. "+(s.auto?"There are no old copies left to remove. Settings, Storage shows what takes the room.":"Settings, Storage shows what takes the room, and Clean the library frees old copies.")),keys:keys});}
  if(s.auto&&storeOk()){Q.busy=true;evict("full").then(function(ev){Q.busy=false;tell(ev);},function(){Q.busy=false;tell(null);});}
  else{addLog({at:now,why:"full",items:[],bytes:0});tell(null);}}

/* ================================================================================================================
   2. IngStore: the stores, measured
   ================================================================================================================ */
var KNOWN=["ingenium_apps","ingenium_big","ingenium_files","ingenium_keys","ingenium_repos","fabrica_made","ingenium_hub","ingenium_desk","the_foundry_files"];
var LABELS={
  ingenium_apps:["Your app library","The pages of your apps, with their newest versions; older ones may be freed when room runs short"],
  ingenium_big:["Long texts","Files and pages your chats, Lector, Code and Build hold"],
  ingenium_files:["Files and the engine","The engine, links to your files, and files you added"],
  ingenium_keys:["Signing keys","The keys your Android apps are signed with"],
  ingenium_repos:["Fabrica's history","Every version of the apps you make in Fabrica"],
  fabrica_made:["Fabrica's packages","Apps and kits Fabrica made, kept to save again"],
  ingenium_hub:["Fabrica's issues and pull requests","What you wrote about your apps in Fabrica"],
  ingenium_desk:["The desk's larger copy","Your desk, when the small store is too full for it"],
  the_foundry_files:["An older store","Left from an earlier version; carried over and then let go"]};
function labelOf(name){return LABELS[name]||["Another store: "+name,"Kept by a part of Ingenium or an app it opened"];}
function utf8Len(s){var n=0,L=s.length,c,i;for(i=0;i<L;i++){c=s.charCodeAt(i);if(c<0x80)n++;else if(c<0x800)n+=2;else if(c>=0xD800&&c<0xDC00&&i+1<L){n+=4;i++;}else n+=3;}return n;}
function sizeOf(v,d){d=d||0;if(v==null)return 1;var t=typeof v;
  if(t==="string")return utf8Len(v);if(t==="number")return 8;if(t==="boolean")return 1;
  try{if(v instanceof ArrayBuffer)return v.byteLength;if(ArrayBuffer.isView(v))return v.byteLength;if(typeof Blob!=="undefined"&&v instanceof Blob)return v.size;}catch(e){}
  if(t!=="object"||d>8)return 16;var n=2,k;
  if(Array.isArray(v)){for(k=0;k<v.length;k++)n+=sizeOf(v[k],d+1)+1;return n;}
  for(k in v)if(Object.prototype.hasOwnProperty.call(v,k))n+=k.length+2+sizeOf(v[k],d+1);return n;}
function dbNames(){if(!storeOk())return Promise.resolve([]);
  try{if(typeof indexedDB.databases==="function")return indexedDB.databases().then(function(l){return (l||[]).map(function(x){return x&&x.name;}).filter(Boolean);},function(){return KNOWN.slice();});}catch(e){}
  return Promise.resolve(KNOWN.slice());}
/* a store that exists is opened as it is; one that does not exist is never made by looking for it */
function openExisting(name){return new Promise(function(res){var rq;try{rq=indexedDB.open(name);}catch(e){res(null);return;}
  var fresh=false;
  rq.onupgradeneeded=function(){fresh=true;try{rq.transaction.abort();}catch(e){}};
  rq.onsuccess=function(){var d=rq.result;if(fresh){try{d.close();}catch(e){}res(null);return;}d.onversionchange=function(){try{d.close();}catch(e){}};res(d);};
  rq.onerror=function(ev){try{if(ev&&ev.preventDefault)ev.preventDefault();}catch(e){}var er=rq.error;if(er&&!fresh&&(er.name==="InvalidStateError"||er.name==="SecurityError"))Q.noStore=true;res(null);};
  rq.onblocked=function(){};});}
function txDone(t){return new Promise(function(res,rej){t.oncomplete=function(){res(true);};t.onerror=function(){rej(t.error);};t.onabort=function(){rej(t.error||new Error("aborted"));};});}
function walk(d,sn,onEach){return new Promise(function(res){var n=0,b=0;try{var t=d.transaction(sn,"readonly"),rq=t.objectStore(sn).openCursor();
    rq.onsuccess=function(){var c=rq.result;if(!c)return;var sz=sizeOf(c.value)+sizeOf(c.key);n++;b+=sz;if(onEach){try{onEach(c.key,c.value,sz);}catch(e){}}c.continue();};
    t.oncomplete=function(){res({n:n,bytes:b});};t.onabort=t.onerror=function(){res({n:n,bytes:b,err:true});};}catch(e){res({n:0,bytes:0,err:true});}});}
function getAll(d,sn,what){return new Promise(function(res){try{if(!d.objectStoreNames.contains(sn)){res([]);return;}var t=d.transaction(sn,"readonly"),s=t.objectStore(sn),r=what==="keys"?s.getAllKeys():s.getAll();
  t.oncomplete=function(){res(r.result||[]);};t.onabort=t.onerror=function(){res([]);};}catch(e){res([]);}});}
function lsSize(){var n=0,c=0;try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i),v=localStorage.getItem(k)||"";n+=(k.length+v.length)*2;c++;}}catch(e){}return {bytes:n,n:c};}
function estimate(){try{if(navigator.storage&&navigator.storage.estimate)return navigator.storage.estimate().then(function(e){return {usage:e.usage||0,quota:e.quota||0,details:e.usageDetails||null};},function(){return null;});}catch(e){}return Promise.resolve(null);}
var M={last:null,busy:null};
function measure(){if(M.busy)return M.busy;
  M.busy=dbNames().then(function(names){var out=[];
      return names.reduce(function(p,name){return p.then(function(){return openExisting(name).then(function(d){if(!d)return;var tot={db:name,n:0,bytes:0};
        return [].slice.call(d.objectStoreNames).reduce(function(q,sn){return q.then(function(){return walk(d,sn).then(function(r){tot.n+=r.n;tot.bytes+=r.bytes;});});},Promise.resolve())
          .then(function(){try{d.close();}catch(e){}out.push(tot);});});});},Promise.resolve()).then(function(){return out;});})
    .then(function(dbs){return estimate().then(function(est){var ls=lsSize(),total=ls.bytes;dbs.forEach(function(x){total+=x.bytes;});
      var r={at:Date.now(),dbs:dbs,ls:ls,est:est,total:total};M.last=r;
      var s=S();s.measured={at:r.at,total:total,usage:est?est.usage:null};return r;});})
    .then(function(r){M.busy=null;return r;},function(e){M.busy=null;throw e;});
  return M.busy;}
function effLimit(quota){var L=+S().limit>0?+S().limit:0;if(L&&quota)return Math.min(L,quota);return L||quota||0;}
function status(){return estimate().then(function(est){var usage=est?est.usage:(M.last?M.last.total:null),quota=est?est.quota:0,lim=effLimit(quota);
  var pct=(usage!=null&&lim>0)?usage/lim:null,level=pct==null?0:(pct>=WARN2?2:(pct>=WARN1?1:0));
  return {usage:usage,quota:quota,limit:+S().limit>0?+S().limit:null,eff:lim,pct:pct,level:level,mine:+S().limit>0&&(!quota||+S().limit<=quota)};});}
function persisted(){try{if(navigator.storage&&navigator.storage.persisted)return navigator.storage.persisted().then(function(p){return !!p;},function(){return null;});}catch(e){}return Promise.resolve(null);}
function askPersist(){try{if(!navigator.storage||!navigator.storage.persist)return Promise.resolve(null);
  return navigator.storage.persist().then(function(p){S().persist={at:Date.now(),granted:!!p};save();return !!p;},function(){return null;});}catch(e){return Promise.resolve(null);}}

/* ---------- the app library's versions: newest first ---------- */
function libOk(){return typeof W.libState==="function"&&(typeof W.libOn!=="function"||W.libOn());}
function strip(v){var x=Object.assign({},v);delete x.earlier;delete x.older;return x;}
function chainOf(rec){if(!rec||!rec.ref)return [];var out=[rec];if(rec.earlier&&rec.earlier.ref)out.push(rec.earlier);if(Array.isArray(rec.older))rec.older.forEach(function(v){if(v&&v.ref)out.push(v);});return out;}
function setChain(rec,list){list=list.map(strip);if(list.length)rec.earlier=list[0];else delete rec.earlier;if(list.length>1)rec.older=list.slice(1);else delete rec.older;}
function appName(k){try{if(W.LIB_NAMES&&LIB_NAMES[k])return LIB_NAMES[k];}catch(e){}return k;}
function libApps(){if(!libOk())return [];var A={};try{A=W.libState().apps||{};}catch(e){}
  return Object.keys(A).filter(function(k){return A[k]&&A[k].ref;}).map(function(k){return {key:k,name:appName(k),rec:A[k],chain:chainOf(A[k])};});}
function verLabel(app,v){return app.name+(v.version?" "+v.version:"")+(v.version?"":" (kept "+day(v.at)+")");}

/* A newer copy keeps the ones before it (R91 kept one only): the newest N stay whatever happens, and the older ones go
   only when room runs short, or when she cleans the library. The same bytes are never kept twice. */
function wireLibrary(){if(typeof W.libKeep!=="function"||typeof W.libState!=="function"||typeof W.libPut!=="function"||W.libKeep.__r142)return;
  var nk=function(key,meta,u8,text){var L=W.libState(),cur=L.apps[key];
    /* 6.7 (rig/idb): the same fingerprint is the same copy only while its bytes are still in the store; when they were lost
       (IngBuiltin.seed finds a copy so), they are written again under the same name */
    if(cur&&cur.sha256===meta.sha256)return (typeof W.libTx==="function"?W.libTx("readonly",function(s){return s.count(cur.ref);}).then(function(n){return n>0;},function(){return true;}):Promise.resolve(true)).then(function(here){
      if(here)return "same";return W.libPut(cur.ref,u8,text).catch(function(e){throw plainErr(e);}).then(function(){paintSoon();return "kept";});});
    var id=W.IngBig.newId();
    return W.libPut(id,u8,text).catch(function(e){throw plainErr(e);}).then(function(){var m=Object.assign({},meta,{ref:id,at:Date.now()});
      if(cur){var ch=chainOf(cur),dup=ch.filter(function(v){return v.sha256&&v.sha256===meta.sha256;});
        ch=ch.filter(function(v){return !(v.sha256&&v.sha256===meta.sha256);});
        dup.forEach(function(v){if(v.pin)m.pin=true;if(v.ref&&v.ref!==id&&countIn(JSON.stringify(W.state||{}),v.ref)<=1)libBlobDel([v.ref]);});
        setChain(m,ch);}
      L.apps[key]=m;save();soon();paintSoon();return "kept";});};
  nk.__r142=true;W.libKeep=nk;}
function countIn(hay,needle){if(!needle)return 0;var n=0,i=0;while((i=hay.indexOf(needle,i))>=0){n++;i+=needle.length;}return n;}
function shell(){try{var a=(typeof W.shellApi==="function")?W.shellApi():null;return a&&typeof a.big_del==="function"?a:null;}catch(e){return null;}}
function delKeys(dbn,sn,keys){if(!keys.length)return Promise.resolve(0);return openExisting(dbn).then(function(d){if(!d)return 0;
  var stores=(Array.isArray(sn)?sn:[sn]).filter(function(x){return d.objectStoreNames.contains(x);});if(!stores.length){d.close();return 0;}
  var t=d.transaction(stores,"readwrite");keys.forEach(function(k){stores.forEach(function(x){t.objectStore(x).delete(k);});});
  return txDone(t).then(function(){d.close();return keys.length;},function(e){try{d.close();}catch(_){}throw e;});});}
function libBlobDel(ids){var a=shell();ids.forEach(function(id){if(a){try{Promise.resolve(a.big_del(id)).catch(function(){});}catch(e){}}});return delKeys("ingenium_apps","b",ids).catch(function(){return 0;});}

/* ---------- the proof: everything that names a stored text, place by place ---------- */
var BIG_RE=/big_[a-z0-9]{7,}/g;
var PLACES={chats:"your chats",lectorDocs:"Lector's documents",lectorRuns:"Lector's readings",askVers:"Ask Lector's versions",code:"Code's sessions and projects",build:"the Build page",
  library:"the app library",desk:"the rest of your desk",staged:"files waiting to be sent",shelf:"the recovery shelf and desks set aside",stores:"Fabrica and Ingenium's other stores"};
/* the stores whose contents are bytes (pages, git objects, packages, the engine), not records that could name a text */
var SKIP={ingenium_big:{t:1},ingenium_apps:{b:1},ingenium_repos:{o:1},fabrica_made:{bytes:1},ingenium_files:{engine:1,files:1,handles:1},ingenium_keys:{k:1}};
function refIndex(){var live={},by={};
  function add(id,place){var L=live[id]||(live[id]=[]);if(L.indexOf(place)<0){L.push(place);by[place]=(by[place]||0)+1;}}
  function scan(text,place){if(!text)return;var m;BIG_RE.lastIndex=0;while((m=BIG_RE.exec(text)))add(m[0],place);}
  function js(v){try{return JSON.stringify(v);}catch(e){return "";}}
  function visit(v,place,d){if(v==null||d>12)return;var t=typeof v;if(t==="string"){if(v.indexOf("big_")>=0)scan(v,place);return;}
    if(t!=="object")return;try{if(ArrayBuffer.isView(v)||v instanceof ArrayBuffer||(typeof Blob!=="undefined"&&v instanceof Blob))return;}catch(e){}
    if(Array.isArray(v)){for(var i=0;i<v.length;i++)visit(v[i],place,d+1);return;}for(var k in v)if(Object.prototype.hasOwnProperty.call(v,k))visit(v[k],place,d+1);}
  var st=W.state||{},lx=st.lector||{};
  scan(js(st.chats),"chats");
  scan(js({sets:(function(){var o={};Object.keys(lx.sets||{}).forEach(function(k){var x=lx.sets[k]||{};o[k]={docs:x.docs};});return o;})(),posts:lx.posts,me:lx.me,brief:lx.brief,recipe:st.recipe,writings:lx.writings}),"lectorDocs");
  scan(js(lx.runs),"lectorRuns");
  scan(js((function(){var o={};Object.keys(lx.sets||{}).forEach(function(k){var x=lx.sets[k]||{};o[k]={older:x.older,asks:x.asks};});return [o,lx.asks,lx.reqs];})()),"askVers");
  scan(js([st.projects,st.cc]),"code");
  scan(js([st.buildDoc,st.stageStores,st.build]),"build");
  scan(js(st.appLib),"library");
  scan(js(st),"desk");
  try{(W.stagedFiles||[]).forEach(function(f){if(f&&f.ref)add(f.ref,"staged");if(f&&f.page)add(f.page,"staged");});}catch(e){}
  try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i),v=localStorage.getItem(k);if(v&&v.indexOf("big_")>=0)scan(v,"shelf");}}catch(e){}
  return dbNames().then(function(names){return names.reduce(function(p,name){if(name==="ingenium_big")return p;return p.then(function(){return openExisting(name).then(function(d){if(!d)return;
      var sns=[].slice.call(d.objectStoreNames).filter(function(sn){return !(SKIP[name]&&SKIP[name][sn]);});
      var place=name==="ingenium_desk"?"shelf":"stores";
      return sns.reduce(function(q,sn){return q.then(function(){return walk(d,sn,function(key,val){visit(val,place,0);});});},Promise.resolve()).then(function(){try{d.close();}catch(e){}});});});},Promise.resolve());})
    .then(function(){return {live:live,by:by,at:Date.now()};});}
/* when an id was made: "big_" + the time in base 36 + six random letters; null when it does not say */
function idTime(id){id=String(id||"");if(!/^big_[a-z0-9]{7,}$/.test(id))return null;var ts=parseInt(id.slice(4,-6),36);
  return (ts>1500000000000&&ts<Date.now()+86400000)?ts:null;}
function oldEnough(id){var ts=idTime(id);return ts!=null&&ts<SESSION_AT-10*60000&&ts<Date.now()-MIN_AGE;}

/* ---------- what may go: the exact list ---------- */
function repoNames(){try{if(W.IngRepo&&typeof IngRepo.list==="function")return Promise.race([IngRepo.list().then(function(l){var o={};(l||[]).forEach(function(r){o[r.id]=r.name;});return o;}),new Promise(function(res){setTimeout(function(){res({});},4000);})]).catch(function(){return {};});}catch(e){}return Promise.resolve({});}
var KIND_WORDS={web:"web app",onePage:"one page",kits:"kits",apk:"Fire tablet app",ipa:"iPhone and iPad app",mac:"Mac app",win:"Windows app"};
/* the places that hold the desk itself, or copies of it: they name every library version, and that is no use of it */
var DESKCOPY=["library","desk","shelf"];
function plan(){var N=keepN(),items=[],kept={newest:0,pinned:0,inN:0,used:0,packages:0,young:0};
  return refIndex().then(function(idx){var jsLib="",jsAll="";try{jsLib=JSON.stringify(W.state.appLib||{});jsAll=JSON.stringify(W.state);}catch(e){}
    /* 1. the library: beyond the newest N, not marked Keep, named by nothing but its own place */
    libApps().forEach(function(app){app.chain.forEach(function(v,i){
      if(i===0){kept.newest++;return;}if(v.pin){kept.pinned++;return;}if(i<N){kept.inN++;return;}
      var pl=idx.live[v.ref]||[];if(pl.some(function(x){return DESKCOPY.indexOf(x)<0;})||countIn(jsLib,v.ref)>1||countIn(jsAll,v.ref)>countIn(jsLib,v.ref)){kept.used++;return;}
      items.push({kind:"library",app:app.key,ref:v.ref,sha:v.sha256||"",label:verLabel(app,v),bytes:+v.size||0,at:v.at||0});});});
    /* 2. Fabrica's packages: the newest N versions of each app and kind stay */
    return openExisting("fabrica_made").then(function(d){if(!d)return [];return getAll(d,"meta").then(function(a){try{d.close();}catch(e){}return a;});}).then(function(meta){
      if(!meta.length)return;return repoNames().then(function(names){var groups={};
        meta.forEach(function(m){if(!m||!m.key)return;var g=(m.repo||"")+"|"+(m.kind||"");(groups[g]=groups[g]||[]).push(m);});
        Object.keys(groups).forEach(function(g){var list=groups[g],at={};list.forEach(function(m){at[m.commit]=Math.max(at[m.commit]||0,m.at||0);});
          var commits=Object.keys(at).sort(function(a,b){return at[b]-at[a];});
          list.forEach(function(m){if(commits.indexOf(m.commit)<N){kept.packages++;return;}
            items.push({kind:"package",key:m.key,label:(names[m.repo]||"An app")+" · "+(KIND_WORDS[m.kind]||m.kind||"package")+" · "+m.name,bytes:+m.size||0,at:m.at||0});});});});})
    .then(function(){
    /* 3. stored texts nothing names: in the long-text store and in the library's store */
      return [["ingenium_big","t","orphan"],["ingenium_apps","b","orphan-lib"]].reduce(function(p,x){return p.then(function(){return openExisting(x[0]).then(function(d){if(!d)return;
        return getAll(d,x[1],"keys").then(function(keys){var cand=keys.filter(function(k){if(typeof k!=="string")return false;if(idx.live[k])return false;if(!oldEnough(k)){if(idTime(k)!=null)kept.young++;return false;}return true;});
          if(!cand.length){d.close();return;}
          return new Promise(function(res){var t=d.transaction(x[1],"readonly"),s=t.objectStore(x[1]),sizes={};cand.forEach(function(k){var r=s.get(k);r.onsuccess=function(){sizes[k]=sizeOf(r.result);};});
            t.oncomplete=function(){d.close();cand.forEach(function(k){items.push({kind:x[2],id:k,label:(x[2]==="orphan"?"A stored text":"A stored app page")+" from "+day(idTime(k)),bytes:sizes[k]||0,at:idTime(k)});});res();};
            t.onerror=t.onabort=function(){try{d.close();}catch(e){}res();};});});});});},Promise.resolve());})
    .then(function(){var total=0;items.forEach(function(it){total+=it.bytes;});
      return {at:Date.now(),keepN:N,items:items,bytes:total,kept:kept,proof:{by:idx.by,names:Object.keys(idx.live).length}};});});}
function itemId(it){return it.kind+"|"+(it.ref||it.key||it.id);}
var EV={busy:null,lastAt:0};
/* removes what a plan lists, each checked again first: what has come into use since is left where it is */
function clean(p,why){if(EV.busy)return EV.busy.then(function(){return clean(p,why);});
  EV.busy=plan().then(function(now){var ok={};now.items.forEach(function(it){ok[itemId(it)]=it;});
      var todo=(p&&p.items?p.items:now.items).filter(function(it){return ok[itemId(it)];}),skipped=(p&&p.items?p.items.length:0)-todo.length;
      var lib=todo.filter(function(x){return x.kind==="library";}),pk=todo.filter(function(x){return x.kind==="package";}),
          ob=todo.filter(function(x){return x.kind==="orphan";}),ol=todo.filter(function(x){return x.kind==="orphan-lib";}),done=[];
      /* the library first: the record changes, then its page goes */
      if(lib.length){var A=W.libState().apps;lib.forEach(function(it){var rec=A[it.app];if(!rec)return;var ch=chainOf(rec),i=-1;
          ch.forEach(function(v,j){if(j>0&&v.ref===it.ref)i=j;});if(i<1)return;ch.splice(i,1);setChain(rec,ch.slice(1));done.push(it);});save();}
      return (lib.length?libBlobDel(done.filter(function(x){return x.kind==="library";}).map(function(x){return x.ref;})):Promise.resolve())
        .then(function(){return delKeys("fabrica_made",["meta","bytes"],pk.map(function(x){return x.key;})).then(function(){done=done.concat(pk);},function(){});})
        .then(function(){var a=shell();ob.forEach(function(x){try{if(W.IngBig)IngBig.del(x.id);}catch(e){}});
          return delKeys("ingenium_big","t",ob.map(function(x){return x.id;})).then(function(){done=done.concat(ob);},function(){});})
        .then(function(){return libBlobDel(ol.map(function(x){return x.id;})).then(function(){done=done.concat(ol);});})
        .then(function(){var bytes=0;done.forEach(function(x){bytes+=x.bytes;});var ev={at:Date.now(),why:why||"clean",items:done.map(function(x){return {k:x.kind,label:x.label,bytes:x.bytes};}),bytes:bytes,skipped:skipped};
          if(done.length||why!=="limit")addLog(ev);if(why!=="clean")EV.lastAt=Date.now();return ev;});})
    .then(function(ev){EV.busy=null;paintSoon();try{refreshLibCard();}catch(e){}return ev;},function(e){EV.busy=null;throw e;});
  return EV.busy;}
function evict(why){return plan().then(function(p){if(!p.items.length){if(why==="full")addLog({at:Date.now(),why:"full",items:[],bytes:0});EV.lastAt=Date.now();return {items:[],bytes:0};}return clean(p,why);});}
function addLog(ev){var s=S();s.log.unshift({at:ev.at,why:ev.why,bytes:ev.bytes||0,skipped:ev.skipped||0,items:(ev.items||[]).slice(0,40),more:Math.max(0,(ev.items||[]).length-40)});
  if(s.log.length>60)s.log.length=60;save();paintLog();}
function refreshLibCard(){var c=$i("libCard");if(c&&typeof W.libCardHtml==="function"){var n=D.createElement("div");n.innerHTML=W.libCardHtml();if(n.firstChild){c.replaceWith(n.firstChild);if(typeof W.libWire==="function")W.libWire();}}}

/* ---------- checking the room: after writes, now and then, and when Storage is open ---------- */
var CK={busy:null,last:null,t:0};
function check(){if(CK.busy)return CK.busy;
  CK.busy=status().then(function(st){CK.last=st;var s=S();
      var go=s.auto&&st.pct!=null&&st.pct>=EVICT_AT&&!EV.busy&&(!EV.lastAt||Date.now()-EV.lastAt>10*60000)&&storeOk();
      if(!go)return st;
      return evict("limit").then(function(ev){return status().then(function(st2){if(ev&&ev.items&&ev.items.length){st2.freed=ev;settle(st2,st.usage-ev.bytes);}return st2;});});})
    .then(function(st){CK.last=st;warn(st);paintGauge();return st;})
    .then(function(r){CK.busy=null;return r;},function(){CK.busy=null;return null;});
  return CK.busy;}
/* the browser's count lags behind what was just removed (its files are tidied later): what is left is what was there less what went */
function settle(st,left){if(st.usage==null||!(left>=0)||st.usage<=left)return st;st.usage=left;st.pct=st.eff>0?left/st.eff:null;st.level=st.pct==null?0:(st.pct>=WARN2?2:(st.pct>=WARN1?1:0));return st;}
function warn(st){var s=S(),w=s.warned;if(!st)return;
  if(st.freed){var ev=st.freed,still=st.pct!=null&&st.level>0;s.warned={level:st.level,at:Date.now()};save();
    notice({kind:still?"warn":"info",title:"Room was running short",
      text:"Ingenium removed "+plural(ev.items.length,"old copy","old copies")+" on its own and freed "+B(ev.bytes)+". Your newest "+keepN()+" versions of each app, and everything you made, stay."
        +(still?" It is still at "+pc(st.pct)+" of "+(st.mine?"your limit":"its room")+": Clean the library, or raise your limit.":"")+" Settings, Storage lists what went.",keys:[["Open Storage",openStorage,true]]});return;}
  if(st.pct==null)return;
  if(st.level<w.level){s.warned={level:st.level,at:Date.now()};save();return;}
  if(st.level>w.level){s.warned={level:st.level,at:Date.now()};save();
    var of=st.mine?"the limit you set":"the room the browser gives it";
    notice({kind:"warn",title:st.level===2?"Storage is nearly full":"Storage is getting full",
      text:st.level===2?"Ingenium has used "+pc(st.pct)+" of "+of+" ("+B(st.usage)+" of "+B(st.eff)+"). Soon new things may not be kept. Clean the library frees old copies, or you can raise your limit."
        :"Ingenium has used "+pc(st.pct)+" of "+of+" ("+B(st.usage)+" of "+B(st.eff)+"). Nothing needs doing yet. When you like, Clean the library frees old copies.",
      keys:[["Open Storage",openStorage,true]]});}}
function soon(){clearTimeout(CK.t);CK.t=setTimeout(function(){if(!EV.busy)check();},6000);}

/* ================================================================================================================
   3. Where errors reach her: every IndexedDB write, the toast, the library, Fabrica, Word documents, the packages
   ================================================================================================================ */
(function hookWrites(){try{var P=W.IDBDatabase&&IDBDatabase.prototype;if(!P||!P.transaction||P.transaction.__r142)return;var o=P.transaction;
  var n=function(stores,mode){var t=o.apply(this,arguments);
    try{if(mode==="readwrite"){var dbn=this.name;
      t.addEventListener("abort",function(){var er=t.error;if(er&&isFull(er)){Q.lastAt=Date.now();Q.lastDb=dbn;full({where:dbn});}});
      t.addEventListener("complete",function(){if(!EV.busy)soon();});}}catch(e){}
    return t;};
  n.__r142=true;P.transaction=n;}catch(e){}})();
W.addEventListener("unhandledrejection",function(e){try{var r=e&&e.reason;if(r&&isFull(r))full({where:"background"});}catch(_){}});
function wrapApi(obj){if(!obj||obj.__r142)return;Object.keys(obj).forEach(function(k){var f=obj[k];if(typeof f!=="function"||f.__r142)return;
    var w=function(){var r=f.apply(this,arguments);if(r&&typeof r.then==="function")return r.then(null,function(e){var k2=kind(e);throw (k2==="full"||k2==="missing")?plainErr(e):e;});return r;};
    w.__r142=true;w.__orig=f;Object.keys(f).forEach(function(p){try{w[p]=f[p];}catch(x){}});try{obj[k]=w;}catch(x){}});
  try{Object.defineProperty(obj,"__r142",{value:true});}catch(e){}}
function wire(){
  /* the toast: a full store becomes the notice with its key, and a zip's raw words become plain ones */
  if(typeof W.ingToast==="function"&&!W.ingToast.__r142){var ot=W.ingToast;
    var nt=function(t){try{var s=String(t==null?"":t);
        if(/QuotaExceeded|quota (has been |was )?exceeded|store for Ingenium is full|storage is full|no space left/i.test(s)){full({text:s});return;}
        s=s.replace(/the zip's directory is damaged|the zip's list of files is broken/gi,"the list of the files inside the zip is broken").replace(/a file in the zip is broken/gi,"a file inside the zip is damaged");
        return ot.call(this,s);}catch(e){return ot.apply(this,arguments);}};
    nt.__r142=true;W.ingToast=nt;}
  wireLibrary();
  /* the library: a zip is checked before its pages are read, so a damaged one says which file and what */
  if(typeof W.libFromZip==="function"&&!W.libFromZip.__r142){var oz=W.libFromZip;
    var nz=function(u8,name,depth){var self=this,args=arguments;
      return zipCheck(u8,name,{deep:u8&&u8.length<=DEEP_MAX}).then(function(r){if(!r.ok)throw ZipError(r.message,r);return oz.apply(self,args);});};
    nz.__r142=true;W.libFromZip=nz;}
  if(typeof W.libPut==="function"&&!W.libPut.__r142){var op=W.libPut;var np=function(){return op.apply(this,arguments).catch(function(e){throw plainErr(e);});};np.__r142=true;W.libPut=np;}
  /* Word documents are zips too */
  if(typeof W.docxText==="function"&&!W.docxText.__r142){var od=W.docxText;
    var ndx=function(f){var args=arguments,self=this;return od.apply(self,args).catch(function(e){if(!f||typeof f.arrayBuffer!=="function")throw e;
      return f.arrayBuffer().then(function(ab){return zipCheck(new Uint8Array(ab),f.name,{deep:ab.byteLength<=DEEP_MAX});}).then(function(r){if(!r.ok)throw ZipError(r.message,r);throw e;},function(x){throw (x&&x.ingKind)?x:e;});});};
    ndx.__r142=true;W.docxText=ndx;}
  /* Fabrica: a zip brought in is checked first; a full store and a missing part are said plainly */
  if(W.IngRepo){["fromZip","importAny"].forEach(function(fn){var o=IngRepo[fn];if(typeof o!=="function"||o.__r142z)return;
      var w=function(u8,opt){var self=this,args=arguments,b=null;try{b=u8 instanceof Uint8Array?u8:(u8 instanceof ArrayBuffer?new Uint8Array(u8):null);}catch(e){}
        if(!b||b.length<4||!(b[0]===0x50&&b[1]===0x4b))return o.apply(self,args);
        var nm=(opt&&opt.name?String(opt.name):"the zip");if(!/\.zip$/i.test(nm)&&nm!=="the zip")nm+=".zip";
        return zipCheck(b,nm,{deep:b.length<=DEEP_MAX}).then(function(r){if(!r.ok)throw ZipError(r.message,r);return o.apply(self,args);});};
      w.__r142z=true;IngRepo[fn]=w;});
    wrapApi(IngRepo);}
  ["IngApk","IngIpa","fbHub","IngBuild"].forEach(function(k){try{if(W[k]&&typeof W[k]==="object")wrapApi(W[k]);}catch(e){}});
  /* a page that names a file that is not there: said once for each version made */
  if(W.IngShip&&typeof IngShip.onePage==="function"&&!IngShip.onePage.__r142){var o1=IngShip.onePage,said={};
    var n1=function(id){return o1.apply(this,arguments).then(function(r){try{if(r&&r.missing&&r.missing.length){var k=id+"|"+r.commit;if(!said[k]){said[k]=1;
        if(typeof W.ingToast==="function")W.ingToast(filesWords(r.missing,r.page)+" It was made without "+(r.missing.length===1?"it":"them")+".");}}}catch(e){}return r;});};
    n1.__r142=true;IngShip.onePage=n1;wrapApi(IngShip);}}

/* ================================================================================================================
   4. Settings, Storage
   ================================================================================================================ */
function openStorage(){try{if(typeof W.go==="function")W.go("settings");}catch(e){}
  setTimeout(function(){ensureCard();var c=$i("stxCard"),h=$i("stxH");if(!c)return;
    try{c.scrollIntoView({block:"start",behavior:reduced()?"auto":"smooth"});}catch(e){c.scrollIntoView();}
    try{h.focus({preventScroll:true});}catch(e){try{h.focus();}catch(_){}}openedSettings();},60);}
function ensureCard(){if($i("stxCard"))return $i("stxCard");var page=$i("page-settings");if(!page)return null;
  var c=D.createElement("section");c.className="card stx-card";c.id="stxCard";c.setAttribute("aria-labelledby","stxH");
  c.innerHTML='<h2 class="sec" id="stxH" tabindex="-1">Storage</h2>'
    +'<p class="small muted stx-lead">What Ingenium keeps on this device, how much room it takes, and how much it may take. Old copies can go; your own work always stays.</p>'
    +'<div class="stx-gauge"><div class="stx-big"><b id="stxUsed">…</b><span id="stxOf"></span></div>'
    +'<span class="stx-sr" id="stxMeterL">Room used, of your limit</span>'
    +'<div class="stx-meter" id="stxMeter" role="meter" aria-labelledby="stxMeterL" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-level="0"><i class="stx-fill" id="stxFill"></i><i class="stx-tick" style="left:80%"></i><i class="stx-tick" style="left:95%"></i></div>'
    +'<div class="stx-marks" aria-hidden="true"><span style="left:80%">80&nbsp;%</span><span style="left:95%">95&nbsp;%</span></div>'
    +'<p class="stx-state" id="stxState" aria-live="polite"></p>'
    +'<div class="stx-warn" id="stxWarn" data-level="0" hidden><p id="stxWarnT"></p><div class="stx-keys"><button type="button" class="btn small primary" id="stxWarnClean">Clean the library…</button><button type="button" class="btn small ghost" id="stxWarnLimit">Change my limit</button></div></div></div>'
    +'<div class="stx-persist" id="stxPersistRow" data-kept=""><span class="stx-pdot" aria-hidden="true"></span><p id="stxPersist" class="small">Asking the browser…</p><button type="button" class="btn small ghost" id="stxPersistAsk" hidden>Ask the browser to keep it</button></div>'
    +'<h3 class="stx-h">What takes the room</h3>'
    +'<ul class="stx-kinds" id="stxKinds"><li class="stx-wait">Measuring…</li></ul>'
    +'<div class="stx-mrow"><p class="small muted" id="stxMeasured"></p><button type="button" class="btn small ghost" id="stxMeasure">Measure again</button></div>'
    +'<h3 class="stx-h">Your limit</h3>'
    +'<div class="stx-limit"><label for="stxLimit">The most room Ingenium may take here</label><div class="stx-lin"><input type="number" id="stxLimit" min="0" step="any" inputmode="decimal" placeholder="None">'
    +'<select id="stxUnit" aria-label="Unit of the limit"><option value="1048576">MB</option><option value="1073741824">GB</option></select>'
    +'<button type="button" class="btn small ghost" id="stxLimitClear">No limit of my own</button></div><p class="small muted" id="stxLimitNote"></p></div>'
    +'<h3 class="stx-h">Old copies</h3>'
    +'<div class="sch-set stx-auto"><label class="eswitch"><input type="checkbox" id="stxAuto" aria-labelledby="stxAutoL"><span class="etrack"></span></label><div><b id="stxAutoL">Free room on its own when it runs short</b><div class="small muted">At 90&nbsp;% of your limit, or when the store is full, old copies go first.</div></div></div>'
    +'<div class="stx-keepn"><label for="stxKeep">Versions kept of each app, whatever happens</label><input type="number" id="stxKeep" min="1" max="20" step="1" inputmode="numeric"></div>'
    +'<p class="small muted">What may go, and only this: an app\'s older versions beyond the newest you keep (never its newest, its only one, or one you mark Keep always), Fabrica\'s older packages (they can be made again), and stored texts that nothing uses. Your chats, documents, projects, Fabrica\'s history, issues and keys are never removed.</p>'
    +'<h3 class="stx-h">Your app library</h3>'
    +'<div class="stx-apps" id="stxApps"></div>'
    +'<div class="stx-keys stx-cleanrow"><button type="button" class="btn primary" id="stxClean">Clean the library…</button><span class="small muted" id="stxCleanNote">You see exactly what would go before anything does.</span></div>'
    +'<details id="stxLogBox"><summary>What was removed, and when <span id="stxLogN"></span></summary><ol class="stx-log" id="stxLog"></ol></details>'
    +'<details id="stxPartsBox"><summary>What this copy of Ingenium carries</summary><ul class="stx-parts" id="stxParts"></ul></details>';
  var ex=$i("exportApp"),anchor=ex&&ex.closest?ex.closest(".card"):null;
  if(anchor&&anchor.parentNode===page)page.insertBefore(c,anchor);else page.appendChild(c);
  wireCard();return c;}
function wireCard(){var s=S();
  var lim=$i("stxLimit"),unit=$i("stxUnit");
  function showLimit(){var L=+S().limit>0?+S().limit:0;if(!L){lim.value="";return;}var g=L>=1073741824&&L%104857600===0;unit.value=g?"1073741824":"1048576";lim.value=String(+(L/+unit.value).toFixed(2));}
  showLimit();
  function setLimit(){var v=parseFloat(String(lim.value).replace(",","."));var s2=S();
    if(!(v>0)){s2.limit=null;}else s2.limit=Math.round(v*(+unit.value));s2.warned={level:0,at:0};save();paintSoon();check();}
  lim.addEventListener("change",setLimit);unit.addEventListener("change",function(){if(lim.value)setLimit();});
  $i("stxLimitClear").onclick=function(){lim.value="";setLimit();};
  var au=$i("stxAuto");au.checked=!!s.auto;au.onchange=function(){S().auto=au.checked;save();paintSoon();if(au.checked)check();};
  var kn=$i("stxKeep");kn.value=String(keepN());kn.addEventListener("change",function(){var v=Math.round(+kn.value);if(!(v>=1))v=1;if(v>20)v=20;kn.value=String(v);S().keepN=v;save();paintApps();});
  $i("stxMeasure").onclick=function(){var b=$i("stxMeasure");b.disabled=true;measure().then(function(){b.disabled=false;status().then(function(st){CK.last=st;paintAll();});},function(){b.disabled=false;});};
  $i("stxClean").onclick=function(){previewClean($i("stxClean"));};
  $i("stxWarnClean").onclick=function(){previewClean($i("stxWarnClean"));};
  $i("stxWarnLimit").onclick=function(){try{lim.focus();lim.select();}catch(e){}};
  $i("stxPersistAsk").onclick=function(){var b=$i("stxPersistAsk");b.disabled=true;askPersist().then(function(){b.disabled=false;paintPersist();});};
  $i("stxApps").addEventListener("click",function(e){var b=e.target&&e.target.closest?e.target.closest("button[data-pin]"):null;if(!b)return;
    var on=b.getAttribute("aria-pressed")!=="true";pin(b.getAttribute("data-app"),b.getAttribute("data-pin"),on);
    var again=D.querySelector('#stxApps button[data-pin="'+b.getAttribute("data-pin")+'"]');if(again)again.focus();});
  /* the stores are measured only when this part of Settings is in sight: nothing heavy at start */
  try{var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting&&(!M.last||Date.now()-M.last.at>300000))measure().then(function(){paintKinds();paintGauge();},function(){});});});io.observe($i("stxKinds"));}
  catch(e){setTimeout(function(){measure().then(function(){paintKinds();paintGauge();},function(){});},400);}}
function pin(appKey,ref,on){if(!libOk())return false;var rec=W.libState().apps[appKey];if(!rec)return false;var hit=false;
  chainOf(rec).forEach(function(v){if(v.ref===ref){if(on)v.pin=true;else delete v.pin;hit=true;}});if(hit){save();paintApps();}return hit;}
var PT=0;function paintSoon(){clearTimeout(PT);PT=setTimeout(paintAll,90);}
function paintAll(){if(!$i("stxCard"))return;paintGauge();paintKinds();paintApps();paintLog();paintParts();paintPersist();
  var n=$i("stxLimitNote");if(n){var st=CK.last,L=+S().limit>0?+S().limit:0;
    n.textContent="Warnings come at 80 % and 95 % of it."+(st&&st.quota?(L>st.quota?" Your limit is more than the browser gives Ingenium here ("+B(st.quota)+"), so the browser's room is the one that counts.":(L?"":" Without one of your own, the limit is the room the browser gives Ingenium here: "+B(st.quota)+".")):"");}}
function paintGauge(){if(!$i("stxCard"))return;var st=CK.last;
  if(!st){status().then(function(x){CK.last=x;paintGauge();});return;}
  var used=$i("stxUsed"),of=$i("stxOf"),m=$i("stxMeter"),f=$i("stxFill"),t=$i("stxState"),w=$i("stxWarn");
  if(st.usage==null){used.textContent="Not known";of.textContent="this browser does not say how much room Ingenium takes";m.setAttribute("aria-valuenow","0");m.setAttribute("aria-valuetext","not known");f.style.width="0";t.textContent="";w.hidden=true;return;}
  used.textContent=B0(st.usage);of.textContent=st.eff?"of "+B(st.eff)+(st.mine?", the limit you set":", the room the browser gives Ingenium here"):"used";
  var p=st.pct==null?0:Math.max(0,Math.min(1,st.pct));m.setAttribute("data-level",String(st.level));m.setAttribute("aria-valuenow",String(Math.round(p*100)));
  m.setAttribute("aria-valuetext",pc(p)+" of "+(st.mine?"your limit":"the room the browser gives")+" ("+B(st.usage)+" of "+B(st.eff)+")");f.style.width=Math.max(st.usage>0?1:0,p*100)+"%";
  t.textContent=st.level===0?"Plenty of room"+(st.pct!=null?": "+pc(st.pct)+" used.":".")+(S().auto?" Old copies go on their own if it runs short.":""):"";
  w.hidden=st.level===0;w.setAttribute("data-level",String(st.level));
  if(st.level>0)$i("stxWarnT").innerHTML=st.level===2?"<b>Nearly full: "+pc(st.pct)+".</b> Soon new things may not be kept. Clean the library frees old copies, or you can raise your limit."
    :"<b>Getting full: "+pc(st.pct)+".</b> Nothing needs doing yet. When you like, Clean the library frees old copies"+(S().auto?", and at 90 % old copies go on their own.":".");}
function paintPersist(){var row=$i("stxPersistRow");if(!row)return;
  persisted().then(function(p){var t=$i("stxPersist"),k=$i("stxPersistAsk"),s=S(),a=s.persist;
    var onDisk=false;try{var api=(typeof W.shellApi==="function")?W.shellApi():null;onDisk=!!(api&&(typeof api.save_state==="function"||typeof api.big_put==="function"));}catch(e){}
    row.setAttribute("data-kept",p?"yes":(p===false?"no":""));
    if(p)t.textContent="Kept for good: the browser has agreed not to clear Ingenium's data to make room."+(onDisk?" This app keeps a copy on disk as well.":"");
    else if(p===false)t.textContent="Not kept for good yet: if the disk runs very short, the browser may clear Ingenium's data."+(a?" Asked on "+day(a.at)+"; the answer was "+(a.granted?"yes":"no")+".":"")+(onDisk?" This app keeps a copy on disk as well.":"");
    else t.textContent="This browser does not say whether it keeps Ingenium's data for good."+(onDisk?" This app keeps a copy on disk as well.":"");
    k.hidden=!!p||p===null;k.textContent=a?"Ask the browser again":"Ask the browser to keep it";
    /* asked once when Storage is first opened; Firefox asks the person, so there only the key asks */
    if(p===false&&!a&&!/Firefox\//.test(navigator.userAgent||"")){askPersist().then(function(){paintPersist();});}});}
function paintKinds(){var ul=$i("stxKinds");if(!ul)return;var r=M.last;if(!r){return;}
  var rows=r.dbs.map(function(x){var L=labelOf(x.db);return {name:L[0],what:L[1],bytes:x.bytes,n:x.n,db:x.db};});
  var dk="Your settings, chats and notes: this browser's small store, about 5 MB";try{if(W.__r132&&W.__r132.inBig&&W.__r132.inBig())dk+="; the desk itself is kept in the larger store now";}catch(e){}
  rows.push({name:"The desk",what:dk,bytes:r.ls.bytes,n:r.ls.n,db:"localStorage"});
  rows.sort(function(a,b){return b.bytes-a.bytes;});var max=rows.reduce(function(a,x){return Math.max(a,x.bytes);},1);
  ul.innerHTML="";rows.forEach(function(x){var li=E("li");li.setAttribute("data-db",x.db);li.appendChild(E("span","k-name",x.name));li.appendChild(E("span","k-size",BZ(x.bytes)));
    li.appendChild(E("span","k-what",x.what+" · "+plural(x.n,"entry","entries")));var bar=E("span","k-bar");bar.setAttribute("aria-hidden","true");var i=E("i");i.style.width=Math.max(x.bytes>0?1:0,Math.round(x.bytes/max*100))+"%";bar.appendChild(i);li.appendChild(bar);ul.appendChild(li);});
  var ms=$i("stxMeasured");if(ms)ms.textContent="Measured "+dayTime(r.at)+": "+B(r.total)+" in these stores."+(r.est?" The browser counts "+B0(r.est.usage)+" for Ingenium in all, and gives it up to "+B(r.est.quota)+" here.":"");}
function paintApps(){var box=$i("stxApps");if(!box)return;var apps=libApps(),N=keepN();box.innerHTML="";
  if(!libOk()){box.appendChild(E("p","stx-none","This edition keeps no app library."));return;}
  if(!apps.length){box.appendChild(E("p","stx-none","No apps in the library yet. Lector's Your apps card adds them."));return;}
  apps.forEach(function(app){var d=E("div","stx-app"),h=E("h4",null,app.name),tot=0;app.chain.forEach(function(v){tot+=+v.size||0;});
    h.appendChild(E("span",null,plural(app.chain.length,"version")+" · "+B(tot)));d.appendChild(h);var ul=E("ul","stx-vers");
    app.chain.forEach(function(v,i){var li=E("li");li.appendChild(E("span","v-name",v.version||"Unnamed"));li.appendChild(E("span","v-meta",B(v.size||0)+" · kept "+day(v.at)));
      var chip;if(i===0)chip=E("span","stx-chip ok",app.chain.length===1?"Newest and only":"Newest");else if(v.pin)chip=E("span","stx-chip mine","Kept by you");else if(i<N)chip=E("span","stx-chip","Among your newest "+N);else chip=E("span","stx-chip warn","Goes when room runs short");
      li.appendChild(chip);
      if(i>0){var b=E("button","btn small ghost stx-pin","Keep always");b.type="button";b.setAttribute("aria-pressed",v.pin?"true":"false");b.setAttribute("data-pin",v.ref);b.setAttribute("data-app",app.key);
        b.setAttribute("aria-label","Keep always: "+app.name+" "+(v.version||day(v.at)));li.appendChild(b);}
      ul.appendChild(li);});d.appendChild(ul);box.appendChild(d);});}
var WHY={limit:"Room was running short, so old copies went on their own",clean:"You cleaned the library",full:"The store was full"};
function paintLog(){var ol=$i("stxLog");if(!ol)return;var L=S().log;$i("stxLogN").textContent="("+L.length+")";ol.innerHTML="";
  if(!L.length){ol.appendChild(E("li",null,"Nothing has been removed yet."));return;}
  L.forEach(function(ev){var li=E("li");li.appendChild(E("b",null,dayTime(ev.at)));
    li.appendChild(D.createTextNode(" · "+(WHY[ev.why]||ev.why)+" · "+(ev.items&&ev.items.length?plural(ev.items.length+(ev.more||0),"copy","copies")+" removed, "+B(ev.bytes)+" freed":"nothing old was left to remove")+(ev.skipped?" ("+plural(ev.skipped,"item")+" had come into use and stayed)":"")+"."));
    if(ev.items&&ev.items.length){var ul=E("ul");ev.items.slice(0,12).forEach(function(x){ul.appendChild(E("li",null,x.label+" · "+B(x.bytes)));});
      var more=ev.items.length-12+(ev.more||0);if(more>0)ul.appendChild(E("li",null,"and "+more+" more"));li.appendChild(ul);}
    ol.appendChild(li);});}
function paintParts(){var ul=$i("stxParts");if(!ul)return;ul.innerHTML="";parts().forEach(function(p){var li=E("li");
  li.appendChild(E("span","stx-chip "+(p.ok?"ok":"warn"),p.ok?"Here":"Not in this copy"));li.appendChild(E("b",null,p.label));li.appendChild(D.createTextNode(" · "+p.why));ul.appendChild(li);});}

/* ---------- Clean the library: the exact list, then one press ---------- */
var GROUPS=[["library","Older app versions"],["package","Older Fabrica packages"],["orphan","Stored texts nothing uses"],["orphan-lib","Stored app pages nothing uses"]];
function proofLine(p){var by=p.proof&&p.proof.by||{},seen=Object.keys(PLACES).filter(function(k){return by[k];}).map(function(k){return PLACES[k];});
  return "Checked first against your chats, Lector's documents and readings, Code, Ask Lector's versions, the app library, the recovery shelf and every other store"+(seen.length?" (which name "+plural(p.proof.names,"stored text")+")":"")+": nothing names these.";}
function modalA11y(box,labelId,back){box.setAttribute("role","dialog");box.setAttribute("aria-modal","true");box.setAttribute("aria-labelledby",labelId);
  var root=$i("modalRoot");try{var mo=new MutationObserver(function(){if(!root.classList.contains("open")||!$i(labelId)){mo.disconnect();box.removeAttribute("role");box.removeAttribute("aria-modal");box.removeAttribute("aria-labelledby");
      if(back&&D.contains(back)&&(!D.activeElement||D.activeElement===D.body||!D.activeElement.offsetParent))try{back.focus();}catch(e){}}});
    mo.observe(root,{attributes:true,attributeFilter:["class"],childList:true,subtree:true});}catch(e){}}
function previewClean(back){if(typeof W.modalOpen!=="function")return Promise.resolve(null);
  var box=W.modalOpen('<div class="stx-pv"><h3 id="stxPvH">Clean the library</h3><p class="stx-pv-lead">Looking for old copies…</p></div>');modalA11y(box,"stxPvH",back);
  return plan().then(function(p){if(!$i("stxPvH"))return p;var pv=box.querySelector(".stx-pv");
    pv.innerHTML='<h3 id="stxPvH">Clean the library</h3>';
    if(!p.items.length){pv.appendChild(E("p","stx-pv-lead","Nothing to clean. Every copy kept is your newest, among your newest "+p.keepN+", one you keep always, or in use."));
      var k0=E("div","stx-pv-keys"),c0=E("button","btn primary","Close");c0.type="button";c0.onclick=function(){W.closeModal();};k0.appendChild(c0);pv.appendChild(k0);setTimeout(function(){c0.focus();},40);return p;}
    pv.appendChild(E("p","stx-pv-lead","Exactly these "+plural(p.items.length,"copy","copies")+" would go. Your own work stays: chats, documents, projects, Fabrica's history, your newest "+p.keepN+" versions of each app and the ones you keep always."));
    var list=E("div","stx-pv-list");list.setAttribute("tabindex","0");list.setAttribute("role","region");list.setAttribute("aria-label","What would go");
    GROUPS.forEach(function(g){var its=p.items.filter(function(x){return x.kind===g[0];});if(!its.length)return;var b=0;its.forEach(function(x){b+=x.bytes;});
      var h=E("h4");h.appendChild(E("span",null,g[1]+" ("+its.length+")"));h.appendChild(E("span",null,B(b)));list.appendChild(h);
      var ul=E("ul");its.forEach(function(x){ul.appendChild(E("li",null,x.label+" · "+B(x.bytes)));});list.appendChild(ul);
      if(g[0]==="orphan"||g[0]==="orphan-lib")list.appendChild(E("p","stx-proof",proofLine(p)));});
    pv.appendChild(list);pv.appendChild(E("p","stx-pv-total","Frees "+B(p.bytes)+"."));
    var keys=E("div","stx-pv-keys"),no=E("button","btn ghost","Not now"),yes=E("button","btn primary","Remove these · "+B(p.bytes));no.type=yes.type="button";
    no.onclick=function(){W.closeModal();};
    yes.onclick=function(){yes.disabled=no.disabled=true;yes.textContent="Removing…";
      clean(p,"clean").then(function(ev){if(!$i("stxPvH"))return;pv.innerHTML='<h3 id="stxPvH">Clean the library</h3>';
        var t="Done. "+(ev.items.length?"Removed "+plural(ev.items.length,"copy","copies")+" and freed "+B(ev.bytes)+".":"Nothing was removed.")+(ev.skipped?" "+cap(plural(ev.skipped,"item"))+" had come into use since and stayed.":"")+" The list is in What was removed, and when.";
        var r=E("p","stx-pv-lead",t);r.id="stxPvDone";r.setAttribute("role","status");pv.appendChild(r);var k=E("div","stx-pv-keys"),c=E("button","btn primary","Close");c.type="button";c.onclick=function(){W.closeModal();};k.appendChild(c);pv.appendChild(k);setTimeout(function(){c.focus();},40);
        measure().then(function(){paintKinds();},function(){});check();},
      function(e){yes.disabled=no.disabled=false;yes.textContent="Remove these · "+B(p.bytes);try{W.ingToast(say(e));}catch(_){}});};
    keys.appendChild(no);keys.appendChild(yes);pv.appendChild(keys);setTimeout(function(){no.focus();},40);return p;});}

function openedSettings(){if(!ensureCard())return;var s=S(),au=$i("stxAuto"),kn=$i("stxKeep");if(au)au.checked=!!s.auto;if(kn&&D.activeElement!==kn)kn.value=String(keepN());
  status().then(function(st){CK.last=st;paintAll();});}

/* ---------- the start: light. Wrapping here; measuring only when Storage is open; the first look at the room later ---------- */
try{wire();}catch(e){try{console.warn("R142 wire",e);}catch(_){}}
try{if(typeof W.go==="function"&&!W.go.__r142){var og=W.go,ng=function(p){var r=og.apply(this,arguments);try{if(p==="settings")setTimeout(openedSettings,0);}catch(e){}return r;};
  ng.__r142=true;Object.keys(og).forEach(function(k){ng[k]=og[k];});W.go=ng;}}catch(e){}
try{var ps=$i("page-settings");if(ps&&ps.classList.contains("active"))setTimeout(openedSettings,0);}catch(e){}
/* the base's sweep of the long-text store (R81) keeps what the recovery shelf and the other stores still name */
try{if(W.IngBig&&typeof IngBig.gc==="function"&&!IngBig.gc.__r142){var ogc=IngBig.gc;var ngc=function(live){live=live||{};
    return refIndex().then(function(idx){Object.keys(idx.live).forEach(function(k){live[k]=1;});return ogc.call(IngBig,live);},function(){return ogc.call(IngBig,live);});};
  ngc.__r142=true;IngBig.gc=ngc;}}catch(e){}
setTimeout(function(){check();},25000);
setInterval(function(){if(!D.hidden)check();},15*60000);

W.IngStore={measure:measure,status:status,check:check,plan:plan,clean:clean,evict:evict,refs:refIndex,
  versions:function(k){var a=libApps().filter(function(x){return x.key===k;})[0];return a?a.chain.map(strip):[];},pin:pin,
  settings:function(){return S();},
  set:function(o){o=o||{};var s=S();if("limit" in o)s.limit=o.limit>0?Math.round(+o.limit):null;if("auto" in o)s.auto=!!o.auto;if("keepN" in o)s.keepN=Math.max(1,Math.min(20,Math.round(+o.keepN||3)));
    if("limit" in o)s.warned={level:0,at:0};save();try{wireCardValues();}catch(e){}paintSoon();return s;},
  open:openStorage,preview:previewClean,log:function(){return S().log.slice();},persist:askPersist,persisted:persisted,effLimit:effLimit,
  _:{sizeOf:sizeOf,idTime:idTime,oldEnough:oldEnough,SESSION_AT:SESSION_AT,EVICT_AT:EVICT_AT,last:function(){return {measure:M.last,status:CK.last};}}};
function wireCardValues(){var s=S(),lim=$i("stxLimit"),unit=$i("stxUnit"),au=$i("stxAuto"),kn=$i("stxKeep");if(!lim)return;
  var L=+s.limit>0?+s.limit:0;if(!L)lim.value="";else{var g=L>=1073741824&&L%104857600===0;unit.value=g?"1073741824":"1048576";lim.value=String(+(L/+unit.value).toFixed(2));}
  au.checked=!!s.auto;kn.value=String(keepN());}
W.IngErr={say:say,kind:kind,isFull:isFull,full:full,zip:zipCheck,ZipError:ZipError,parts:parts,missing:function(id){return PART_WORDS[id]||"";},plain:plainErr,notice:notice,closeNotice:closeNote,crc32:crc32};
})();
;try{window.__ingParts["p63"]="running";}catch(_){}
</script>
