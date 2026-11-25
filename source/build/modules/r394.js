<style id="r394-css">
/* ============ R394 · INGENIUM CLOUD: WHAT TWO DEVICES BOTH CHANGED, KEPT FOR HER TO CHOOSE (Ingenium 7.92, 25 November 2026) ============
   Stage 2 of the recommendations she approved (25 November 2026), for Ingenium Cloud: "Each device shows its last sync, what is waiting,
   and any conflicts side by side, so you choose which version to keep."
   Found (r255, r143): what Cloud brings in is merged as a backup's Merge does: each conversation, folder and record by its own date, the
   newer wins (mergeVal: stampDeep). A conversation or an app's notes she had changed on this device since it last brought work in, then
   changed elsewhere later, was replaced without a word. Each device's last snapshot (its name, platform, version and when) was already
   listed in the Cloud card.
   Now: before any merge (Cloud, or a backup merged in), the conversations and the apps' folders are looked at; after it, any of them that
   she had changed here since the last time work came in, and that the merge replaced with a different copy, is kept aside as hers, on this
   device (in its larger store, not sent anywhere). The Cloud card shows each such one side by side, her copy and the copy brought in,
   with Keep mine (hers comes back, as it was) and Keep the one brought in. The card also says when this device last sent and last
   brought in work. */
#clConf{display:grid;gap:10px;margin-top:12px}
#clConf .cf-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px;background:var(--card-hi,rgba(255,255,255,.6));border:1px solid var(--hairline,rgba(106,63,181,.16));border-radius:14px;padding:12px;
  box-shadow:0 2px 0 rgba(96,62,150,.14),0 6px 14px rgba(60,34,110,.08);transition:transform .2s cubic-bezier(.2,.9,.3,1.3),box-shadow .2s}
#clConf .cf-row:hover{transform:translateY(-2px);box-shadow:0 4px 0 rgba(96,62,150,.14),0 10px 18px rgba(60,34,110,.14)}
#clConf .cf-h{grid-column:1 / -1;display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;align-items:center}
#clConf .cf-h b{font-weight:600;color:var(--ink-1)}
#clConf .cf-side{display:grid;gap:4px;font-size:13px;color:var(--ink-2);background:rgba(106,63,181,.05);border-radius:10px;padding:8px 10px}
#clConf .cf-side small{color:var(--ink-3);font-size:12px}
#clConf .cf-side q{display:block;font-style:normal;color:var(--ink-2);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
#clConf .cf-acts{grid-column:1 / -1;display:flex;flex-wrap:wrap;gap:8px}
#clTimes{font-size:12.5px;color:var(--ink-3);margin-top:6px}
@media (max-width:640px){#clConf .cf-row{grid-template-columns:minmax(0,1fr)}}
body[data-motion="minimal"] #clConf .cf-row{transition:none}body[data-motion="minimal"] #clConf .cf-row:hover{transform:none}
@media (prefers-reduced-motion:reduce){#clConf .cf-row{transition:none}#clConf .cf-row:hover{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p394"]="started";}catch(_){}
(function r394(){"use strict";
if(window.IngConflicts)return;var W=window,D=document,DB="ingenium_conflicts",ST="c";
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function key(t,f,pri){var b=mk("button","btn small"+(pri?" primary":""),t);b.type="button";b.onclick=function(e){e.stopPropagation();f(b);};return b;}
function when(t){if(!t)return "never";try{return new Date(t).toLocaleString("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});}catch(e){return "";}}
var dbp=null;function db(){if(dbp)return dbp;dbp=new Promise(function(res,rej){var r=indexedDB.open(DB,1);r.onupgradeneeded=function(){if(!r.result.objectStoreNames.contains(ST))r.result.createObjectStore(ST,{keyPath:"id"});};r.onsuccess=function(){res(r.result);};r.onerror=function(){rej(r.error);};});return dbp;}
function tx(mode,f){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction(ST,mode),s=t.objectStore(ST),out=f(s);t.oncomplete=function(){res(out&&out.result!==undefined?out.result:out);};t.onerror=function(){rej(t.error);};});});}
function list(){return tx("readonly",function(s){return s.getAll();}).then(function(L){return (L||[]).sort(function(a,b){return b.at-a.at;});});}
/* since when a change here counts as hers: the last time work came in or went out (or Cloud was joined); with none, the last seven days */
function lastIn(){var t=0;try{var c=W.IngCloud&&IngCloud.settings?IngCloud.settings():null;if(c)t=Math.max(c.lastPull||0,c.lastPush||0,c.joined||0);}catch(e){}return t||Date.now()-7*864e5;}
function stamp(x){if(!x)return 0;var t=x.updated||x.made||0,m=x.messages;if(m&&m.length){var l=m[m.length-1];t=Math.max(t,l.at||0);}if(x.app)t=Math.max(t,x.app.briefAt||0);return t||0;}
function sig(x){try{return JSON.stringify(x.kind==="app"?[x.name,x.app&&x.app.brief,x.app&&x.app.decisions,x.app&&x.app.open]:[x.title,(x.messages||[]).length,(x.messages||[]).map(function(m){return (m.text||"").length;})]);}catch(e){return "";}}
function look(){var out={};(W.state.chats||[]).forEach(function(c){if(c&&c.id)out["chat:"+c.id]=JSON.parse(JSON.stringify(c));});(W.state.projects||[]).forEach(function(p){if(p&&p.id&&p.kind==="app")out["app:"+p.id]=JSON.parse(JSON.stringify(p));});return out;}
/* after a merge: hers, changed here since work last came in and replaced by a different copy, kept aside */
function compare(before,since,from){var after=look(),found=[];Object.keys(before).forEach(function(k){var a=before[k],b=after[k];if(!b)return;if(sig(a)===sig(b))return;if(stamp(a)<=since)return;
    found.push({id:"cf"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),key:k,kind:k.split(":")[0],title:a.kind==="app"?a.name:(a.title||"A conversation"),at:Date.now(),from:from||"another device",mine:a,theirs:b});});
  if(!found.length)return Promise.resolve(0);return tx("readwrite",function(s){found.forEach(function(f){s.put(f);});}).then(function(){paint();return found.length;});}
function wrap(){var B=W.IngBackup;if(!B||B.__r394)return;var oa=B.apply;if(typeof oa!=="function")return;
  B.apply=function(b,o){if(!(o&&o.mode==="merge"))return oa.apply(this,arguments);var before=look(),since=lastIn(),m=b&&b.manifest||{},from=(m.platform&&m.platform.label)||m.device||"";
    return oa.apply(this,arguments).then(function(r){return compare(before,since,from).then(function(n){if(n&&r&&typeof r==="object")r.keptAside=n;return r;},function(){return r;});});};B.__r394=1;}
/* her choice */
function keepMine(f){var k=f.key.split(":"),id=k.slice(1).join(":"),arr=k[0]==="chat"?(W.state.chats=W.state.chats||[]):(W.state.projects=W.state.projects||[]);var i=arr.findIndex(function(x){return x&&x.id===id;});
  var mine=JSON.parse(JSON.stringify(f.mine));mine.updated=Date.now();if(i>=0)arr[i]=mine;else arr.push(mine);try{saveState();}catch(e){}try{renderChat();}catch(e){}try{W.IngFolders.paint();}catch(e){}return drop(f);}
function drop(f){return tx("readwrite",function(s){s.delete(f.id);}).then(paint);}
function side(lbl,x,kind){var d=mk("div","cf-side");d.appendChild(mk("b",null,lbl));if(kind==="chat"){var m=x.messages||[],l=m[m.length-1];d.appendChild(mk("small",null,m.length+" message"+(m.length===1?"":"s")+" · last "+when(stamp(x))));if(l)d.appendChild(mk("q",null,String(l.text||"").slice(0,220)));}
  else{d.appendChild(mk("small",null,"Notes of "+when(x.app&&x.app.briefAt)+" · "+((x.app&&x.app.decisions)||[]).length+" decisions"));if(x.app&&x.app.brief)d.appendChild(mk("q",null,String(x.app.brief).slice(0,220)));}return d;}
function paint(){var card=D.getElementById("cloudCard");if(!card)return;var box=D.getElementById("clConf");if(!box){box=mk("div");box.id="clConf";card.appendChild(box);}
  var tm=D.getElementById("clTimes");if(!tm){tm=mk("div");tm.id="clTimes";box.parentNode.insertBefore(tm,box);}var c={};try{c=IngCloud.settings();}catch(e){}tm.textContent="This device last sent its work "+when(c.lastPush)+", and last brought work in "+when(c.lastPull)+".";
  list().then(function(L){box.innerHTML="";if(!L.length)return;box.appendChild(mk("h4",null,L.length+" changed on two devices, kept for you to choose"));
    L.forEach(function(f){var r=mk("div","cf-row"),h=mk("div","cf-h");h.appendChild(mk("b",null,(f.kind==="app"?f.title+"'s folder notes":"“"+f.title+"”")));h.appendChild(mk("small",null,"Brought in "+when(f.at)+(f.from?" from "+f.from:"")));r.appendChild(h);
      r.appendChild(side("Yours, on this device",f.mine,f.kind));r.appendChild(side("Brought in, now in place",f.theirs,f.kind));var a=mk("div","cf-acts");a.appendChild(key("Keep mine",function(){keepMine(f);},true));a.appendChild(key("Keep the one brought in",function(){drop(f);}));r.appendChild(a);box.appendChild(r);});});}
(function start(){var n=0;(function w(){if(W.__ingReady===true&&W.state){wrap();setInterval(function(){try{wrap();var c=D.getElementById("cloudCard");if(c&&!D.getElementById("clTimes"))paint();}catch(e){}},2000);return;}if(++n<400)setTimeout(w,500);})();})();
W.IngConflicts={list:list,keepMine:keepMine,drop:drop,paint:paint,compare:compare,look:look};
})();
;try{window.__ingParts["p394"]="running";}catch(_){}
</script>
