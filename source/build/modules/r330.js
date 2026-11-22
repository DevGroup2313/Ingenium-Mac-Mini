<style id="r330-css">
/* ============ R330 · FABRICA'S NEXT PASS (Ingenium 7.43, 18 November 2026) ============
   Her words (18 November 2026): pull requests and reviews, issues and a board, checks on every version, releases with notes, "and please
   offer me more recommendations"; for the apps made in Fabrica, "their Terms and Conditions should also be editable and customisable so
   they can fit each app", her master copy only. Her approval of the live preview (https://claude.ai/artifact/2aHjSvn6yc7JSusyQn3aqo,
   source/previews/fabrica_next): "I approve of the Fabrica Next Pass preview, please commit and push it everywhere."
   Measured before building: reviews that ask for changes (r141) and Rules before main (r285) were there already, off until turned on.
   What this part adds:
   - Her apps, in her master copy: the checks run on every version kept, and main waits for the checks and her approval, from the start
     (a repository whose rules she has never set; once she sets them, hers stand).
   - Offline and in-house, beside Safety in Care, Checks (every copy with Fabrica): each address outside the app that its pages, scripts or
     styles would load or call (scripts, styles, fonts, pictures, fetch, sockets, imports), by file and line; plain links are not counted.
   - Your ways of working, measured (her master copy): the version runs in a quiet window of its own and her rules that can be measured
     are measured there: keys and cards that answer the pointer, no scroll bar in view, no long wide buttons, no purple shade under the
     pointer, a night look drawn, still when motion is reduced, a ring for the keyboard. The others (refined, understated) stay for her.
     Measured from the app's own styles: the check does not move a pointer.
   - Release notes kept with each release (a note on the version, yours to edit; Draft with my model asks the model in Lector's place, as
     r280 does) and, with the release's terms, inside its web app package (r111's or r178's: the finished zip is opened, given NOTES.txt,
     TERMS.txt, PRIVACY.txt, and closed again).
   - This app's terms (her master copy, Care, Settings): its name, owner, contact and what it keeps; the Terms of use and the Privacy notice
     in sections, every one hers to rewrite; Ask on first open puts a sheet in its web app (I agree or Decline, kept on that device).
     A starting point, not legal advice: the card says a lawyer should read them before the app is sold or shared widely. */
#fb .r330-box .r330-rows{display:flex;flex-direction:column;gap:6px;margin-top:8px}
#fb .r330-way{display:grid;grid-template-columns:auto minmax(0,1fr);gap:2px 8px;align-items:center;font-size:12.6px;color:var(--f-ink2);padding:6px 8px;border-radius:10px;transition:transform .3s var(--f-spring,cubic-bezier(.2,.9,.25,1.2)),background .2s}
#fb .r330-way:hover{transform:translateX(3px);background:var(--f-wellbg)}
#fb .r330-way em{grid-column:2;font-style:normal;font:11.8px/1.3 var(--f-mono,ui-monospace,monospace);color:var(--f-ink3);overflow-wrap:anywhere}
#fb .r330-tag{font:700 10.5px/1 var(--f-sans);padding:4px 8px;border-radius:999px;white-space:nowrap}
#fb .r330-tag.ok{background:rgba(31,157,99,.14);color:#1a7f50}#fb .r330-tag.look{background:rgba(232,144,42,.16);color:#b4600f}#fb .r330-tag.off{background:var(--f-wellbg);color:var(--f-ink3)}
body[data-theme="night"] #fb .r330-tag.ok{background:rgba(64,192,128,.15);color:#6fd8a2}body[data-theme="night"] #fb .r330-tag.look{background:rgba(240,176,96,.15);color:#f0b060}
#fb .r330-list{margin:6px 0 0;padding-left:18px;font:12px/1.5 var(--f-mono,ui-monospace,monospace);color:var(--f-ink2)}
#fb .r330-list li{overflow-wrap:anywhere}
#fb .r330-notes{margin-top:8px;border-radius:12px;border:1px solid var(--f-hair);background:var(--f-wellbg);padding:2px 12px}
#fb .r330-notes summary{cursor:pointer;list-style:none;font:600 12.8px/2.4 var(--f-sans);color:var(--f-ink1);display:flex;justify-content:space-between}
#fb .r330-notes summary::-webkit-details-marker{display:none}
#fb .r330-notes summary::after{content:"Open";color:var(--f-acc);font-size:12px}#fb .r330-notes[open] summary::after{content:"Fold"}
#fb .r330-notes textarea,#fb .r330-terms textarea{width:100%;min-height:110px;resize:vertical;box-sizing:border-box;border-radius:10px;border:1px solid var(--f-hair);background:var(--f-hi,#fff);color:var(--f-ink1);font:13px/1.5 var(--f-sans);padding:8px 10px;box-shadow:var(--f-well)}
#fb .r330-terms .r330-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:8px}
#fb .r330-terms label.r330-f{display:flex;flex-direction:column;gap:4px;font:600 12.4px var(--f-sans);color:var(--f-ink1)}
#fb .r330-terms label.r330-f input{border-radius:10px;border:1px solid var(--f-hair);background:var(--f-wellbg);box-shadow:var(--f-well);color:var(--f-ink1);font:13px/1.4 var(--f-sans);padding:7px 10px}
#fb .r330-terms details.r330-sec{margin-top:8px;border-radius:12px;border:1px solid var(--f-hair);background:var(--f-hi,#fff);box-shadow:var(--f-pill);padding:6px 12px;transition:transform .3s var(--f-spring,cubic-bezier(.2,.9,.25,1.2))}
#fb .r330-terms details.r330-sec:hover{transform:translateX(3px)}
#fb .r330-terms details.r330-sec summary{cursor:pointer;list-style:none;font:600 12.8px/2 var(--f-sans);color:var(--f-ink1);display:flex;justify-content:space-between;gap:10px}
#fb .r330-terms details.r330-sec summary::-webkit-details-marker{display:none}
#fb .r330-terms details.r330-sec summary::after{content:"Edit";color:var(--f-acc);font-size:12px}#fb .r330-terms details.r330-sec[open] summary::after{content:"Fold"}
#fb .r330-terms h4{margin:12px 0 0;font:600 15px/1.3 var(--f-serif,Georgia,serif);color:var(--f-ink1)}
@media (max-width:700px){#fb .r330-terms .r330-fields{grid-template-columns:1fr}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p330"]="started";}catch(_){}
/* R330 · Fabrica's next pass: see the note at the top of its styles. window.IngFabNext */
(function r330(){
"use strict";
if(window.IngFabNext)return;
var W=window,D=document,te=new TextEncoder(),td=new TextDecoder();
function master(){try{return ING_EDITION==="master";}catch(e){return false;}}
function el(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function X(){return W.fbHubHost||null;}function H(){return W.fbHub||null;}
function toast(m){var x=X();if(x&&x.toast)x.toast(m);else try{W.ingToast(m);}catch(e){}}
function fail(e){var x=X();if(x&&x.fail)x.fail(e);else toast(String(e&&e.message||e));}
function keep(rec){var h=H();return h&&h.keep?Promise.resolve(h.keep(rec)):Promise.resolve();}
function live(id){var h=H();return h&&h.live?Promise.resolve(h.live(id)).catch(function(){return null;}):Promise.resolve(null);}
function btn(cls,t,fn){var b=el("button","f-btn"+(cls?" "+cls:""));b.type="button";b.textContent=t;b.addEventListener("click",function(e){fn.call(b,e,b);});return b;}
function row(state,mark,title,small){var e=el("div","f-ck "+state);e.innerHTML='<span class="m">'+mark+"</span><div>"+esc(title)+"<small>"+esc(small)+"</small></div>";return e;}
function plural(n,one,many){return n+" "+(n===1?one:(many||one+"s"));}

/* ================= 1. her apps: checks on every version, and main waits, from the start ================= */
/* once for each app (rec.r330): its record is normalised with auto false whether or not she chose it, so "never set" cannot be told
   from "off"; after this once, what she sets stands */
function defaults(rec){if(!rec||!master()||rec.r330)return rec;rec.r330=1;rec.auto=true;var rs=rec.rules;if(!rs||!(rs.pr||rs.review||rs.checks||rs.keep))rec.rules=Object.assign({},rs||{},{review:true,checks:true});
  setTimeout(function(){keep(rec).catch(function(){});},0);return rec;}

/* ================= 2. offline and in-house ================= */
var TXT=/\.(html?|m?js|cjs|css|svg|json|webmanifest)$/i;
var PATS=[["a script",/<script\b[^>]*\bsrc\s*=\s*["']?((?:https?:)?\/\/[^"'\s>]+)/gi],["a style or font",/<link\b[^>]*\bhref\s*=\s*["']?((?:https?:)?\/\/[^"'\s>]+)/gi],
  ["a picture or media",/<(?:img|audio|video|source|iframe|embed)\b[^>]*\bsrc\s*=\s*["']?((?:https?:)?\/\/[^"'\s>]+)/gi],["an import",/@import\s+(?:url\()?\s*["']?((?:https?:)?\/\/[^"')\s;]+)/gi],
  ["a file in its styles",/url\(\s*["']?((?:https?:)?\/\/[^"')\s]+)/gi],["a call",/\bfetch\s*\(\s*["'`]((?:https?:)?\/\/[^"'`\s]+)/gi],["a socket",/new\s+WebSocket\s*\(\s*["'`](wss?:\/\/[^"'`\s]+)/gi],
  ["a call",/\.open\s*\(\s*["'`][A-Z]+["'`]\s*,\s*["'`]((?:https?:)?\/\/[^"'`\s]+)/gi],["a module",/\bimport\b[^"'`;]*?\bfrom\s*["'`]((?:https?:)?\/\/[^"'`\s]+)/gi],["a module",/\bimport\s*\(\s*["'`]((?:https?:)?\/\/[^"'`\s]+)/gi]];
var LOCAL=/^(?:https?:)?\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/|$)/i,SAFEHOST=/^(?:https?:)?\/\/(?:www\.w3\.org)\//i;
var OFF=new Map();
function offline(r,again){var key=r.id+"|"+r.head;if(!again&&OFF.has(key))return OFF.get(key);
  var job=(again?Promise.resolve(null):IngRepo.notes(r.id,r.head).then(function(n){return n&&n.offline&&n.offline.v===1?n.offline:null;},function(){return null;})).then(function(had){if(had)return had;
    return IngRepo.files(r.id,r.head).then(function(list){var res={v:1,head:r.head,read:0,skipped:0,found:[],at:Date.now()},chain=Promise.resolve();
      list.filter(function(f){return TXT.test(f.path)&&!/(^|\/)(node_modules|\.git)\//.test(f.path);}).slice(0,600).forEach(function(f){chain=chain.then(function(){if(f.size>2097152){res.skipped++;return;}
        return IngRepo.read(r.id,f.path,r.head).then(function(b){if(!b)return;res.read++;var t=td.decode(b);PATS.forEach(function(p){p[1].lastIndex=0;var m;while((m=p[1].exec(t))){var u=m[1];if(LOCAL.test(u)||SAFEHOST.test(u))continue;
          var line=t.slice(0,m.index).split("\n").length;if(res.found.length<200)res.found.push({kind:p[0],url:u.slice(0,200),path:f.path,line:line});}});},function(){res.skipped++;});});});
      return chain.then(function(){return IngRepo.setNote(r.id,r.head,"offline",res).then(function(){return res;},function(){return res;});});});});
  OFF.set(key,job);job.catch(function(){OFF.delete(key);});return job;}
function hostOf(u){var m=/^(?:[a-z]+:)?\/\/([^\/?#:]+)/i.exec(u);return m?m[1].toLowerCase():u;}
function offlineBox(r,w){if(!r||!r.head)return;var box=el("div","h-box h-blk r330-box");box.id="hOffline";box.innerHTML='<b class="h-big">Offline and in-house</b>What this version would load or call from outside itself, read on this computer.';
  var rows=el("div","r330-rows");rows.appendChild(row("run","…","Reading its pages, scripts and styles…",""));box.appendChild(rows);
  var keys=el("div","f-row"),again=btn("sm","Read it again",function(){again.disabled=true;paint(true);});keys.appendChild(again);box.appendChild(keys);w.appendChild(box);
  function paint(fresh){offline(r,fresh).then(function(res){if(!box.isConnected)return;rows.innerHTML="";again.disabled=false;var f=res.found;
      if(!f.length){rows.appendChild(row("ok","✓","Offline and in-house","nothing loaded or called from outside the app, in "+plural(res.read,"file")+" read"+(res.skipped?" ("+res.skipped+" too large to read)":"")+"; plain links are not counted"));return;}
      var hosts={};f.forEach(function(x){var h=hostOf(x.url);(hosts[h]=hosts[h]||[]).push(x);});var hs=Object.keys(hosts);
      rows.appendChild(row("warn","!",plural(f.length,"place")+" reach outside the app, to "+plural(hs.length,"address","addresses"),"It would not work fully with no connection. Keep these files inside the app instead."));
      var ul=el("ul","r330-list");hs.slice(0,8).forEach(function(h){var xs=hosts[h];var li=el("li");li.textContent=h+": "+xs.slice(0,3).map(function(x){return x.kind+" in "+x.path+", line "+x.line;}).join("; ")+(xs.length>3?"; and "+(xs.length-3)+" more":"");ul.appendChild(li);});
      if(hs.length>8){var li2=el("li");li2.textContent="and "+(hs.length-8)+" more addresses";ul.appendChild(li2);}rows.appendChild(ul);},
    function(e){if(!box.isConnected)return;rows.innerHTML="";again.disabled=false;rows.appendChild(row("warn","!","It could not be read",String(e&&e.message||e)));});}
  paint(false);}

/* ================= 3. her ways of working, measured (her master copy) ================= */
/* runs inside the app's quiet window (sandboxed: no access to Ingenium), and posts what it measured */
var PROBE=function(nonce){function send(o){try{parent.postMessage({ingWays:nonce,res:o},"*");}catch(e){}}
  function rulesOf(){var out=[];function walk(list,media){for(var i=0;i<list.length;i++){var r=list[i];try{if(r.cssRules&&r.media){walk(r.cssRules,(media?media+" ":"")+r.media.mediaText);}else if(r.cssRules&&r.conditionText!==undefined){walk(r.cssRules,media);}else if(r.selectorText){out.push({sel:r.selectorText,st:r.style,media:media||""});}}catch(e){}}}
    for(var s=0;s<document.styleSheets.length;s++){try{walk(document.styleSheets[s].cssRules,"");}catch(e){}}return out;}
  function hue(c){var m=/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/.exec(c||"");if(!m)return null;var r=m[1]/255,g=m[2]/255,b=m[3]/255,a=m[4]==null?1:+m[4];if(a<0.04)return null;
    var mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn,h=0,l=(mx+mn)/2,s=d===0?0:d/(1-Math.abs(2*l-1));if(d){h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360;}return {h:h,s:s,l:l};}
  function lum(c){var m=/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/.exec(c||"");if(!m)return null;return [m[1],m[2],m[3]].map(function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}).reduce(function(a,v,i){return a+v*[0.2126,0.7152,0.0722][i];},0);}
  function bgOf(e){while(e){var c=getComputedStyle(e).backgroundColor;if(c&&!/rgba\(0, 0, 0, 0\)|transparent/.test(c))return c;e=e.parentElement;}return "rgb(255, 255, 255)";}
  function shown(e){var r=e.getBoundingClientRect();return r.width>2&&r.height>2&&getComputedStyle(e).visibility!=="hidden";}
  setTimeout(function(){try{var R=rulesOf(),hov=R.filter(function(r){return /:hover/.test(r.sel);});
    var lifts=hov.filter(function(r){return r.st.transform&&r.st.transform!=="none"||r.st.translate||/\d/.test(r.st.boxShadow||"")||r.st.top;}).map(function(r){return r.sel.split(",").filter(function(s){return /:hover/.test(s);}).map(function(s){return s.replace(/:hover/g,"").trim()||"*";});});
    var bases=[].concat.apply([],lifts);
    var keys=[].slice.call(document.querySelectorAll('button,[role="button"],input[type="button"],input[type="submit"],summary,a.btn,a.button,.btn,.button,.card')).filter(shown);
    var still=keys.filter(function(e){return !bases.some(function(b){try{return e.matches(b)||!!e.closest(b);}catch(x){return false;}});});
    var wide=keys.filter(function(e){if(e.matches(".card")&&!e.matches("button,[role=button],.btn,.button"))return false;var r=e.getBoundingClientRect();return r.width>320&&r.width/r.height>6;}).map(function(e){return {t:(e.textContent||"").trim().slice(0,40),w:Math.round(e.getBoundingClientRect().width)};});
    var hideBars=R.some(function(r){return /::-webkit-scrollbar/.test(r.sel)&&(r.st.display==="none"||r.st.width==="0px"||r.st.width==="0");});
    var bars=[].slice.call(document.querySelectorAll("*")).concat([document.documentElement]).filter(function(e){var c=getComputedStyle(e),o=c.overflowY+" "+c.overflowX;if(!/auto|scroll/.test(o)&&e!==document.documentElement)return false;
      var over=e.scrollHeight>e.clientHeight+1||e.scrollWidth>e.clientWidth+1;if(!over)return false;return !(c.scrollbarWidth==="none"||hideBars);}).length;
    var purple=hov.filter(function(r){var c=r.st.backgroundColor||"";if(!c&&r.st.background){var m=/rgba?\([^)]*\)|#[0-9a-f]{3,8}/i.exec(r.st.background);c=m?m[0]:"";}if(/^#/.test(c)){var d=document.createElement("i");d.style.color=c;document.body.appendChild(d);c=getComputedStyle(d).color;d.remove();}
      var h=hue(c);return h&&h.h>=250&&h.h<=310&&h.s>0.18;}).map(function(r){return r.sel.slice(0,60);});
    var night=R.some(function(r){return /prefers-color-scheme:\s*dark/.test(r.media)||/data-theme|\.dark\b|\.night\b|night/i.test(r.sel);});
    var calm=R.some(function(r){return /prefers-reduced-motion/.test(r.media);}),moving=0;try{moving=document.getAnimations().filter(function(a){return a.playState==="running";}).length;}catch(e){}
    var ring=R.some(function(r){return /:focus(-visible)?/.test(r.sel)&&(r.st.outline||r.st.outlineStyle||r.st.boxShadow);});
    var b=document.body,fg=getComputedStyle(b).color,bg=bgOf(b),L1=lum(fg),L2=lum(bg),con=(L1!=null&&L2!=null)?(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05):null;
    send({keys:keys.length,still:still.length,stillSome:still.slice(0,3).map(function(e){return (e.textContent||e.className||e.tagName).toString().trim().slice(0,30);}),wide:wide,bars:bars,purple:purple,night:night,calm:calm,moving:moving,ring:ring,contrast:con?Math.round(con*10)/10:null});}
  catch(e){send({error:String(e&&e.message||e)});}},1200);};
function measure(r){if(typeof IngShip==="undefined"||!IngShip.onePage)return Promise.reject(new Error("Fabrica's checks are not part of this copy"));
  return IngShip.onePage(r.id,{ref:r.head,quiet:true}).then(function(p){return new Promise(function(res){var nonce="w"+Math.random().toString(36).slice(2),fr=D.createElement("iframe"),done=false;
    var probe="<scr"+"ipt>("+PROBE.toString()+")("+JSON.stringify(nonce)+");<\/script>",html=/<\/body>/i.test(p.html)?p.html.replace(/<\/body>(?![\s\S]*<\/body>)/i,probe+"</body>"):p.html+probe;
    fr.setAttribute("sandbox","allow-scripts");fr.setAttribute("aria-hidden","true");fr.tabIndex=-1;fr.title="A quiet window for a check";fr.style.cssText="position:fixed;left:-12000px;top:0;width:1280px;height:800px;border:0;opacity:0;pointer-events:none";
    function on(e){var d=e.data;if(!d||d.ingWays!==nonce||e.source!==fr.contentWindow)return;finish(d.res);}
    function finish(x){if(done)return;done=true;W.removeEventListener("message",on);try{fr.remove();}catch(e){}res(x||{error:"the app did not answer within ten seconds"});}
    W.addEventListener("message",on);fr.srcdoc=W.IngStageKit?IngStageKit.wrap(html,{}):html;D.body.appendChild(fr);setTimeout(function(){finish(null);},10000);});});}
var WAYS=new Map();
function ways(r,again){var key=r.id+"|"+r.head;if(!again&&WAYS.has(key))return WAYS.get(key);
  var job=(again?Promise.resolve(null):IngRepo.notes(r.id,r.head).then(function(n){return n&&n.ways&&n.ways.v===1?n.ways:null;},function(){return null;})).then(function(had){if(had)return had;
    return measure(r).then(function(m){var res={v:1,head:r.head,m:m,at:Date.now()};return IngRepo.setNote(r.id,r.head,"ways",res).then(function(){return res;},function(){return res;});});});
  WAYS.set(key,job);job.catch(function(){WAYS.delete(key);});return job;}
function waysRows(m){var out=[];
  out.push([m.keys?(m.still===0?"ok":"look"):"off","Every key and card answers the pointer",m.keys?(m.keys-m.still)+" of "+m.keys+(m.still?" (still: "+m.stillSome.join(", ")+")":""):"no keys found"]);
  out.push([m.bars?"look":"ok","No scroll bar in view",m.bars?m.bars+" seen":"0 seen"]);
  out.push([m.wide.length?"look":"ok","No long wide buttons",m.wide.length?m.wide.slice(0,2).map(function(x){return '"'+x.t+'", '+x.w+" px wide";}).join("; "):"none"]);
  out.push([m.purple.length?"look":"ok","No purple shade under the pointer",m.purple.length?m.purple.length+": "+m.purple.slice(0,2).join("; "):"0 seen"]);
  out.push([m.night?"ok":"look","A night look as well as a day look",m.night?"drawn"+(m.contrast?"; day text contrast "+m.contrast:""):"no night styles found"]);
  out.push([m.calm||!m.moving?"ok":"look","Still when motion is reduced",m.calm?"it keeps to the setting":m.moving?m.moving+" moving, with no rule for the setting":"nothing moves"]);
  out.push([m.ring?"ok":"look","Keys answer the keyboard, with a ring you can see",m.ring?"a focus ring is drawn":"no focus ring found"]);return out;}
function waysBox(r,w){if(!master()||!r||!r.head)return;var box=el("div","h-box h-blk r330-box");box.id="hWays";
  box.innerHTML='<b class="h-big">Your ways of working, measured</b>Your rules that can be measured, in this version as it runs in a quiet window. Refined and understated stay for you, and your model, to judge.';
  var rows=el("div","r330-rows");box.appendChild(rows);var keys=el("div","f-row");var go=btn("sm","Measure this version",function(){go.disabled=true;paint(true);});keys.appendChild(go);box.appendChild(keys);w.appendChild(box);
  function paint(fresh){rows.innerHTML="";rows.appendChild(row("run","…",fresh?"Measuring… it runs for a few seconds":"Reading…",""));
    (fresh?ways(r,true):IngRepo.notes(r.id,r.head).then(function(n){return n&&n.ways&&n.ways.v===1?n.ways:null;},function(){return null;})).then(function(res){if(!box.isConnected)return;rows.innerHTML="";go.disabled=false;
      if(!res){rows.appendChild(row("","○","Not measured yet","Measure this version runs it for a few seconds, on this computer."));return;}
      if(res.m&&res.m.error){rows.appendChild(row("warn","!","It could not be measured",res.m.error));return;}
      var rs=waysRows(res.m),kept=rs.filter(function(x){return x[0]==="ok";}).length;rows.appendChild(row(kept===rs.length?"ok":"warn",kept===rs.length?"✓":"~",kept+" of "+rs.length+" kept","measured "+new Date(res.at).toLocaleString()));
      rs.forEach(function(x){var e=el("div","r330-way");e.innerHTML='<span class="r330-tag '+x[0]+'">'+(x[0]==="ok"?"Kept":x[0]==="look"?"Look":"None")+"</span><span>"+esc(x[1])+"</span><em>"+esc(x[2])+"</em>";rows.appendChild(e);});},
      function(e){if(!box.isConnected)return;rows.innerHTML="";go.disabled=false;rows.appendChild(row("warn","!","It could not be measured",String(e&&e.message||e)));});}
  paint(false);}
function checks(r,rec,w){try{offlineBox(r,w);}catch(e){}try{waysBox(r,w);}catch(e){}}

/* ================= 4. release notes, kept with the release ================= */
function notesText(id,commit){return IngRepo.notes(id,commit).then(function(n){return n&&n.relNotes&&n.relNotes.text||"";},function(){return "";});}
function relNotes(r,c,card){var d=D.createElement("details");d.className="r330-notes";var s=el("summary",null,"Release notes");d.appendChild(s);var ta=D.createElement("textarea");ta.setAttribute("aria-label","Release notes for "+(c.title||c.short));d.appendChild(ta);
  var ks=el("div","f-row");ks.style.margin="8px 0 10px";var sv=btn("sm pri","Keep the notes",function(){sv.disabled=true;IngRepo.setNote(r.id,c.oid,"relNotes",{text:ta.value,at:Date.now()}).then(function(){sv.disabled=false;toast("The notes are kept with this release; they travel inside its web app.");},function(e){sv.disabled=false;fail(e);});});
  ks.appendChild(sv);ks.appendChild(btn("sm","Draft with my model",function(){try{if(W.IngFabAsk&&IngFabAsk.notes){IngFabAsk.notes();return;}}catch(e){}toast("Draft them in Ask your model, Release notes, then paste them here.");}));d.appendChild(ks);
  notesText(r.id,c.oid).then(function(t){ta.value=t;if(t)s.textContent="Release notes ("+t.split("\n").filter(Boolean).length+" lines)";});card.appendChild(d);}

/* ================= 5. this app's terms (her master copy) ================= */
var TT=[["What {app} is","{app} is an app made by {owner}. It runs on your device."],["Your use of it","You may use {app} for your own purposes. You may not sell copies of it, or pass it off as your own."],
  ["Your work is yours","What you make or keep in {app} belongs to you."],["No warranty","{app} is given as it is, without any promise that it will suit every purpose or never fail. Keep your own copies of anything that matters."],
  ["Limits","As far as the law allows, {owner} is not liable for any loss that comes from using {app}."],["Changes to these terms","These terms may change with a new version of {app}; the version you use says which terms apply."],
  ["Contact","Questions about these terms: {contact}."]];
var PP=[["What {app} keeps, and where","{keeps}"],["What it sends","{app} sends nothing about you to {owner} or anyone else."],["Your choices","You can remove everything {app} keeps by clearing its data on your device."],
  ["Children","{app} is not made for children under 13 to use without a parent or guardian."],["Contact","Questions about your privacy: {contact}."]];
function T0(r){return {v:1,app:r.name||"This app",owner:"its maker",contact:"the address its maker gives",keeps:"Everything you make in it stays on your device.",ask:false,terms:TT.map(function(x){return {t:x[0],b:x[1]};}),privacy:PP.map(function(x){return {t:x[0],b:x[1]};})};}
function fill(s,t){return String(s).replace(/\{(app|owner|contact|keeps)\}/g,function(_,k){return t[k]||"";});}
function textOf(t,which){var list=which==="privacy"?t.privacy:t.terms;return t.app+": "+(which==="privacy"?"Privacy notice":"Terms of use")+"\n\n"+list.map(function(s,i){return (i+1)+". "+fill(s.t,t)+"\n"+fill(s.b,t);}).join("\n\n")+"\n";}
function termsBox(r,rec,w){if(!master()||!rec)return;var t=rec.appTerms||T0(r);var box=el("div","h-box h-blk r330-terms");box.id="hTerms";
  box.innerHTML='<b class="h-big">This app\'s terms</b>Its own Terms of use and Privacy notice, every section yours to rewrite. They travel inside its web app as TERMS.txt and PRIVACY.txt. A starting point, not legal advice: a lawyer should read them before you sell or share it widely.';
  var fs=el("div","r330-fields");[["app","The app's name"],["owner","Its owner"],["contact","Contact for questions"],["keeps","What it keeps"]].forEach(function(f){var l=el("label","r330-f");l.appendChild(D.createTextNode(f[1]));var i=D.createElement("input");i.value=t[f[0]]||"";i.setAttribute("data-k",f[0]);i.addEventListener("input",function(){t[f[0]]=i.value;});l.appendChild(i);fs.appendChild(l);});box.appendChild(fs);
  [["terms","Terms of use"],["privacy","Privacy notice"]].forEach(function(g){box.appendChild(el("h4",null,esc(g[1])));t[g[0]].forEach(function(s,i){var d=D.createElement("details");d.className="r330-sec";d.appendChild(el("summary",null,esc((i+1)+". "+fill(s.t,t))));
    var ta=D.createElement("textarea");ta.value=s.b;ta.setAttribute("aria-label",g[1]+", section "+(i+1));ta.addEventListener("input",function(){s.b=ta.value;});d.appendChild(ta);box.appendChild(d);});});
  var ask=el("label","f-sw");ask.style.marginTop="10px";ask.innerHTML='<input type="checkbox" id="hTermsAsk"'+(t.ask?" checked":"")+'>Ask on first open: I agree or Decline';ask.querySelector("input").onchange=function(){t.ask=this.checked;};box.appendChild(ask);
  var ks=el("div","f-row");ks.appendChild(btn("pri","Keep these terms",function(e,b){rec.appTerms=t;t.at=Date.now();b.disabled=true;keep(rec).then(function(){b.disabled=false;toast("Kept: "+t.app+"'s terms travel inside its next web app.");},function(er){b.disabled=false;fail(er);});}));
  ks.appendChild(btn("","Start again from Ingenium's",function(){rec.appTerms=T0(r);keep(rec).then(function(){var x=X();if(x&&x.paintWork)x.paintWork();});}));box.appendChild(ks);w.appendChild(box);}
/* the sheet an app shows on its first open, when its owner asks for it (kept on that device) */
function gate(t){var data=JSON.stringify({app:t.app,terms:textOf(t,"terms"),privacy:textOf(t,"privacy"),k:"terms-agreed-"+String(t.app).replace(/\W+/g,"-").toLowerCase()+"-"+(t.at||0)}).replace(/</g,"\\u003c");
  return '<scr'+'ipt>(function(T){try{if(localStorage.getItem(T.k))return;}catch(e){}function go(){var v=document.createElement("div");v.setAttribute("role","dialog");v.setAttribute("aria-modal","true");v.setAttribute("aria-label",T.app+": terms");'+
    'v.style.cssText="position:fixed;inset:0;z-index:2147483647;background:rgba(20,14,30,.55);display:grid;place-items:center;padding:16px;font:14px/1.5 system-ui,sans-serif";'+
    'var c=document.createElement("div");c.style.cssText="max-width:640px;width:100%;max-height:86vh;display:flex;flex-direction:column;gap:10px;background:#fff;color:#221a2e;border-radius:18px;padding:18px;box-shadow:0 20px 60px rgba(0,0,0,.35)";'+
    'var h=document.createElement("b");h.textContent="Before you use "+T.app;h.style.fontSize="18px";var p=document.createElement("pre");p.textContent=T.terms+"\\n"+T.privacy;p.style.cssText="white-space:pre-wrap;overflow:auto;flex:1;margin:0;font:13px/1.5 system-ui,sans-serif;scrollbar-width:none";'+
    'var row=document.createElement("div");row.style.cssText="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap";function k(t,pri,f){var b=document.createElement("button");b.textContent=t;b.style.cssText="min-height:36px;padding:0 16px;border-radius:10px;border:1px solid rgba(34,26,46,.15);font:600 13px system-ui;cursor:pointer;"+(pri?"background:#5d37a1;color:#fff":"background:#f6f3fa;color:#221a2e");b.onclick=f;row.appendChild(b);}'+
    'k("Decline",0,function(){p.textContent=T.app+" stays closed until you agree. You can read the terms again.";row.innerHTML="";k("Read the terms again",0,function(){v.remove();go();});});k("I agree",1,function(){try{localStorage.setItem(T.k,String(Date.now()));}catch(e){}v.remove();});'+
    'c.appendChild(h);c.appendChild(p);c.appendChild(row);v.appendChild(c);document.body.appendChild(v);}if(document.body)go();else document.addEventListener("DOMContentLoaded",go);})('+data+');<\/script>';}
/* what each web app package carries besides the app: its notes, its terms, and (when asked) the sheet on first open */
function extra(id,commit){return Promise.all([live(id),notesText(id,commit)]).then(function(z){var rec=z[0],notes=z[1],files=[],body="";
  if(notes)files.push({name:"NOTES.txt",data:notes.replace(/\r?\n/g,"\n")+"\n"});
  if(master()&&rec&&rec.appTerms){var t=rec.appTerms;files.push({name:"TERMS.txt",data:textOf(t,"terms")});files.push({name:"PRIVACY.txt",data:textOf(t,"privacy")});if(t.ask)body=gate(t);}
  return {files:files,body:body};});}
W.IngShipExtra=extra;
/* every web app package, however it was made (r111's own, or r178's from her apps' family): opened, given its notes and terms (and the
   sheet in its main page when asked), and closed again. When this app's own terms are kept they also stand in a kit's general TERMS.md,
   so a package never carries two sets of terms. */
function addTo(res,id){if(!res||!res.bytes||!W.IngRepo||!IngRepo.core||!IngRepo.core.unzip)return Promise.resolve(res);
  return extra(id,res.commit).then(function(x){if(!x||(!x.files.length&&!x.body))return res;var C=IngRepo.core,z=C.unzip(res.bytes),es=z.entries||[];
    var top=(function(){var f=es.map(function(e){return e.name;}).filter(function(n){return n.indexOf("/")>0;});if(!f.length)return "";var t=f[0].split("/")[0]+"/";return f.every(function(n){return n.indexOf(t)===0;})?t:"";})();
    var pages=es.filter(function(e){return /\.html?$/i.test(e.name)&&e.name.slice(top.length).indexOf("/")<0;}),main=pages.filter(function(e){return /(^|\/)index\.html?$/i.test(e.name);})[0]||pages[0];
    var own=master()&&x.files.some(function(f){return f.name==="TERMS.txt";}),termsTxt=own?x.files.filter(function(f){return f.name==="TERMS.txt";})[0].data:null;
    var out=[],chain=Promise.resolve();
    es.forEach(function(e){chain=chain.then(function(){return C.unzipData(res.bytes,e).then(function(d){var name=e.name;
      if(x.files.some(function(f){return top+f.name===name;}))return;   /* written below */
      if(own&&/(^|\/)TERMS\.md$/i.test(name)){out.push({name:name,data:te.encode(termsTxt)});return;}
      if(x.body&&main&&e===main){var h=td.decode(d);h=/<\/body>/i.test(h)?h.replace(/<\/body>(?![\s\S]*<\/body>)/i,x.body+"\n</body>"):h+x.body;out.push({name:name,data:te.encode(h),mode:e.mode});return;}
      out.push({name:name,data:d,mode:e.mode});});});});
    return chain.then(function(){x.files.forEach(function(f){out.push({name:top+f.name,data:typeof f.data==="string"?te.encode(f.data):f.data});});
      return C.zip(out,{comment:z.comment||res.commit});}).then(function(b){var r2={};Object.keys(res).forEach(function(k){r2[k]=res[k];});r2.bytes=b;r2.files=out.length;r2.carries=x.files.map(function(f){return f.name;});return r2;});})
    .catch(function(e){try{console.warn("Fabrica: the notes and terms could not be added",e);}catch(_){}return res;});}
(function wrap(n){if(W.IngShip&&typeof IngShip.webApp==="function"&&IngShip.webApp.__r178!==undefined||n>40){if(W.IngShip&&typeof IngShip.webApp==="function"&&!IngShip.webApp.__r330){var base=IngShip.webApp;
    var w=function(id){var self=this,a=arguments;return Promise.resolve(base.apply(self,a)).then(function(res){return addTo(res,id);});};Object.keys(base).forEach(function(k){w[k]=base[k];});w.__r330=true;IngShip.webApp=w;}return;}
  setTimeout(function(){wrap(n+1);},250);})(0);
W.IngFabNext={version:1,defaults:defaults,checks:checks,offline:offline,ways:ways,measure:measure,relNotes:relNotes,terms:termsBox,extra:extra,textOf:textOf,blank:T0,_rows:waysRows};
try{window.__ingParts["p330"]="running";}catch(_){}
})();
</script>
