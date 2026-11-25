<style id="r395-css">
/* ============ R395 · SCHEDULED BACKUPS, INTO A FOLDER SHE CHOOSES (Ingenium 7.93, 25 November 2026) ============
   Stage 2 of the recommendations she approved (25 November 2026): "Automatic backups on a schedule, daily or weekly, keeping the last
   few". On a computer (the Ingenium app for Mac or Windows; its side is desktop/app_backup_793.py), under the backup's card: the folder
   she chooses (any folder: her Documents, a drive, a folder her own cloud service keeps in step), how often (every day, every Sunday, or
   by hand), how many to keep (the last 3, 7 or 14; older ones of Ingenium's own are removed, nothing else in the folder is touched), and
   Back up now. A backup is the same whole file Back up makes (modules/r143.js), every part with its fingerprint; it is made while she is
   not typing, and written in pieces that take the backup's name only once whole. Each device keeps its own schedule. A phone, a tablet
   or a browser says that the computer app makes them. */
#sbCard{display:grid;gap:12px}
#sbCard .sb-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
#sbCard .sb-row>span{font-size:13px;color:var(--ink-2);min-width:7.5em}
#sbCard .sb-folder{font:600 13px/1.4 var(--sans,system-ui,sans-serif);color:var(--ink-1);word-break:break-all}
#sbCard .sb-status{font-size:13px;color:var(--ink-2)}
#sbCard .sb-files{list-style:none;margin:0;padding:0;display:grid;gap:6px}
#sbCard .sb-files li{display:flex;justify-content:space-between;gap:10px;font-size:12.5px;color:var(--ink-2);padding:6px 10px;border-radius:10px;transition:background .2s,transform .2s cubic-bezier(.2,.9,.3,1.3)}
#sbCard .sb-files li:hover{background:rgba(106,63,181,.06);transform:translateX(3px)}
#sbCard .btn.on{background:var(--accent);color:#fff;border-color:transparent}
body[data-motion="minimal"] #sbCard .sb-files li{transition:none}body[data-motion="minimal"] #sbCard .sb-files li:hover{transform:none}
@media (prefers-reduced-motion:reduce){#sbCard .sb-files li{transition:none}#sbCard .sb-files li:hover{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p395"]="started";}catch(_){}
(function r395(){"use strict";
if(window.IngSchedule)return;var W=window,D=document,LS="ingenium_backup_schedule",PIECE=1536*1024;
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function key(t,f,cls){var b=mk("button","btn small"+(cls?" "+cls:""),t);b.type="button";b.onclick=function(e){e.stopPropagation();f(b);};return b;}
function when(t){if(!t)return "never";try{return new Date(t).toLocaleString("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});}catch(e){return "";}}
function mb(n){return n>=1048576?(n/1048576).toFixed(1)+" MB":Math.max(1,Math.round(n/1024))+" KB";}
function api(){try{var a=typeof W.deskApi==="function"?W.deskApi():null;return a&&typeof a.backup_write==="function"?a:null;}catch(e){return null;}}
function cfg(){var c={};try{c=JSON.parse(localStorage.getItem(LS)||"{}")||{};}catch(e){}if(!c.every)c.every="day";if(!c.keep)c.keep=7;return c;}
function put(c){try{localStorage.setItem(LS,JSON.stringify(c));}catch(e){}}
function stampName(){var d=new Date(),z=function(n){return (n<10?"0":"")+n;};return "Ingenium backup "+d.getFullYear()+"-"+z(d.getMonth()+1)+"-"+z(d.getDate())+" "+z(d.getHours())+"-"+z(d.getMinutes())+".zip";}
function b64(buf){var u=new Uint8Array(buf),s="",C=0x8000;for(var i=0;i<u.length;i+=C)s+=String.fromCharCode.apply(null,u.subarray(i,i+C));return btoa(s);}
var RUN=null;
/* one backup: made as Back up makes it, written in pieces, the oldest of Ingenium's own removed beyond the last few */
function run(why){if(RUN)return RUN;var a=api(),c=cfg();if(!a)return Promise.resolve({ok:false,error:"Only the Ingenium app on a computer makes scheduled backups."});if(!c.folder)return Promise.resolve({ok:false,error:"Choose the folder first."});
  var name=stampName();say("Making the backup…");
  RUN=Promise.resolve(W.IngBackup.make({})).then(function(made){var blob=made&&made.blob;if(!blob)throw new Error("the backup could not be made");if(made.sealed)name=name.replace(/\.zip$/,".ingenium");
      var n=Math.max(1,Math.ceil(blob.size/PIECE)),i=0;
      function next(){if(i>=n)return Promise.resolve(a.backup_write(c.folder,name,"",false,true));var s=blob.slice(i*PIECE,(i+1)*PIECE);
        return s.arrayBuffer().then(function(buf){say("Writing the backup: "+Math.round((i+1)/n*100)+"%");return a.backup_write(c.folder,name,b64(buf),i===0,false);}).then(function(r){if(!r||!r.ok)throw new Error(r&&r.error||"it could not be written");i++;return next();});}
      return next();})
    .then(function(r){if(!r||!r.ok)throw new Error(r&&r.error||"it could not be written");return Promise.resolve(a.backup_files(c.folder)).then(function(L){var files=(L&&L.files)||[],old=files.slice(c.keep||7);
      return old.reduce(function(pr,f){return pr.then(function(){return a.backup_remove(c.folder,f.name);});},Promise.resolve()).then(function(){return r;});});})
    .then(function(r){var c2=cfg();c2.last={at:Date.now(),name:name,size:r.size||0,ok:true,why:why||"by hand"};put(c2);RUN=null;paint();return {ok:true,name:name};},
      function(e){var c2=cfg();c2.last={at:Date.now(),ok:false,error:String(e&&e.message||e),why:why||"by hand"};put(c2);RUN=null;paint();return {ok:false,error:String(e&&e.message||e)};});
  return RUN;}
/* due: every day, once a day; every Sunday, once on a Sunday; never while she types, never twice at once */
function due(c,now){c=c||cfg();now=now||new Date();if(!c.folder||c.every==="hand")return false;var l=c.last&&c.last.ok?new Date(c.last.at):null;
  if(c.every==="day")return !l||l.toDateString()!==now.toDateString();if(c.every==="sunday")return now.getDay()===0&&(!l||l.toDateString()!==now.toDateString());return false;}
function tick(){try{if(!api()||RUN)return;if(W.IngPace&&IngPace.typing&&IngPace.typing())return;if(due())run("on schedule");}catch(e){}}
/* the card */
var STATUS="";function say(t){STATUS=t;var s=D.getElementById("sbStatus");if(s)s.textContent=t;}
function card(){var anchor=D.getElementById("rpCard")||D.getElementById("bkCard");if(!anchor||!anchor.parentNode)return null;var c=D.getElementById("sbCard");if(c&&c.previousSibling===anchor)return c;if(!c){c=mk("section","card");c.id="sbCard";c.setAttribute("aria-label","Scheduled backups");}anchor.parentNode.insertBefore(c,anchor.nextSibling);return c;}
function paint(){var c=card();if(!c)return;var a=api(),k=cfg();c.innerHTML="";c.appendChild(mk("h3",null,"Scheduled backups"));
  if(!a){c.appendChild(mk("p","small muted","The Ingenium app on your Mac or Windows computer makes these: a whole backup on a schedule, into a folder you choose, keeping the last few. Here, Back up above makes one by hand."));return;}
  c.appendChild(mk("p","small muted","A whole backup, as Back up makes it, into a folder you choose: your Documents, a drive, or a folder your own cloud service keeps in step. Made while you are not typing; only Ingenium's own backups in that folder are ever removed."));
  var r1=mk("div","sb-row");r1.appendChild(mk("span",null,"The folder"));r1.appendChild(mk("b","sb-folder",k.folder||"None chosen yet"));r1.appendChild(key(k.folder?"Change":"Choose a folder",function(){Promise.resolve(a.backup_choose_place()).then(function(r){if(r&&r.ok&&r.folder){var c2=cfg();c2.folder=r.folder;put(c2);paint();}});},k.folder?"":"primary"));c.appendChild(r1);
  var r2=mk("div","sb-row");r2.appendChild(mk("span",null,"How often"));[["day","Every day"],["sunday","Every Sunday"],["hand","By hand"]].forEach(function(o){r2.appendChild(key(o[1],function(){var c2=cfg();c2.every=o[0];put(c2);paint();},k.every===o[0]?"on":""));});c.appendChild(r2);
  var r3=mk("div","sb-row");r3.appendChild(mk("span",null,"Keep"));[3,7,14].forEach(function(n){r3.appendChild(key("The last "+n,function(){var c2=cfg();c2.keep=n;put(c2);paint();},k.keep===n?"on":""));});c.appendChild(r3);
  var r4=mk("div","sb-row");r4.appendChild(key("Back up now",function(b){b.disabled=true;run("by hand");},"primary"));var st=mk("span","sb-status");st.id="sbStatus";
  st.textContent=RUN?STATUS:(k.last?(k.last.ok?"Last backup "+when(k.last.at)+" ("+k.last.why+"): "+k.last.name+(k.last.size?", "+mb(k.last.size):"")+".":"The last try, "+when(k.last.at)+", did not finish: "+k.last.error):"No scheduled backup yet.")+(k.folder&&k.every!=="hand"?" Next: "+(k.every==="day"?"today, if not made yet, then each day":"on Sunday")+".":"");r4.appendChild(st);c.appendChild(r4);
  if(k.folder)Promise.resolve(a.backup_files(k.folder)).then(function(L){if(!L||!L.ok||!L.files.length)return;var ul=mk("ul","sb-files");L.files.slice(0,6).forEach(function(f){var li=mk("li");li.appendChild(mk("span",null,f.name));li.appendChild(mk("span",null,mb(f.size)+" · "+when(f.at)));ul.appendChild(li);});c.appendChild(ul);},function(){});}
(function start(){var n=0;(function w(){if(W.__ingReady===true&&W.state){setTimeout(tick,60000);setInterval(tick,15*60000);setInterval(function(){try{var c=D.getElementById("sbCard"),a=D.getElementById("rpCard")||D.getElementById("bkCard");if(a&&(!c||c.previousSibling!==a||!c.firstChild))paint();}catch(e){}},2000);return;}if(++n<400)setTimeout(w,500);})();})();
W.IngSchedule={run:run,due:due,tick:tick,cfg:cfg,put:put,paint:paint,name:stampName};
})();
;try{window.__ingParts["p395"]="running";}catch(_){}
</script>
