<style id="r354-css">
/* ============ R354 · OPENS ONLY WITH YOUR OWNER KEY (Ingenium 7.63, 21 November 2026) ============
   The Security room's promise (modules/r318.js, approved on the live preview of 18 November 2026): "For an app meant for you alone:
   it opens fully only on a device that holds your owner key, as the master edition does." Her words on the list (21 November 2026):
   "Please continue working on my requests."
   - Package details (Fabrica, Ship), the master edition: Opens only with your owner key, off for every app until she turns it on for
     one. On, it keeps Signed with your owner key on too, since the door is only as good as the signature that carries it.
   - Every package made from the app's page then carries a door, the page's first script (written in before r349 signs the page): on a
     device where the app was opened by its owner, with the owner key's file and its password, once, or with a permission the owner
     signed (PermitCore's own: it names one person, allows its use, has its dates, and can be withdrawn), the app starts as it is.
     Anywhere else nothing of the app runs: the door stops the page there and draws itself in its place. The opening is kept in the
     app's own storage, signed by the owner key, and checked again at every start; the key is used once and never kept.
   - Said plainly in the room: it keeps out a person without the key or a permission; the shells and the web app refuse a copy whose
     door was taken out (the page is signed); a page opened straight from its file in a browser is not checked, and someone who takes
     the app apart on a device where it is open can always read it.
   - A page whose own security policy runs only its own scripts cannot carry the door: Fabrica says so, and makes nothing rather than
     a package that would open for anyone.
   window.IngOwnerOnly: wanted(id), door(html, ctx), blocked(html), packageRow(box, r, pref, signRow), well(chip) */
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p354"]="started";}catch(_){}
/* R354 · opens only with your owner key: see the note at the top of its styles */
(function r354(){
"use strict";
var W=window,D=document;
if(W.IngOwnerOnly||!W.IngAppSign)return;
function edition(){try{return typeof ING_EDITION==="string"?ING_EDITION:"master";}catch(e){return "master";}}
function master(){return edition()==="master";}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function ship(){try{var f=W.fbHubHost&&fbHubHost.FBS?fbHubHost.FBS():null;return (f&&f.ship)||{};}catch(e){return {};}}
function wanted(id){return master()&&!!(ship()[id]||{}).ownerOnly;}
function keys(){try{return ((W.IngPermit&&IngPermit.keys)||[]).filter(function(k){return k&&k.kid&&k.jwk;}).map(function(k){return {kid:k.kid,x:k.jwk.x,y:k.jwk.y};});}catch(e){return [];}}
function withdrawn(){try{var w=W.IngPermit&&IngPermit.withdrawn;return Array.isArray(w)?w.slice():(w&&Array.isArray(w.withdrawn)?w.withdrawn.slice():[]);}catch(e){return [];}}
/* a page whose own policy runs only its own scripts: the door could not run there */
function blocked(html){var head=String(html).slice(0,1<<20),m=/<meta[^>]+http-equiv\s*=\s*["']?content-security-policy["']?[^>]*>/i.exec(head);if(!m)return false;
  var c=/content\s*=\s*("([^"]*)"|'([^']*)')/i.exec(m[0]),pol=c?(c[2]!=null?c[2]:c[3]):"",sc=/(?:^|;)\s*script-src\s+([^;]*)/i.exec(pol)||/(?:^|;)\s*default-src\s+([^;]*)/i.exec(pol);
  return !!(sc&&!/'unsafe-inline'/i.test(sc[1]));}
/* the door: the page's first script, with what it checks against written in */
function doorSrc(){var e=D.getElementById("r354-door");return e?e.textContent:"";}   /* read when a package is made: the module runs before the page reaches it */
function door(html,ctx){var DOOR=doorSrc();if(!DOOR)throw new Error("this build of Ingenium carries no door");if(blocked(html))throw new Error((ctx.name||"This app")+"'s page runs only its own scripts (its security policy), so it cannot carry the door: nothing was made. Turn off Opens only with your owner key for it, in Package details.");
  var cfg={app:String(ctx.app||"app").toLowerCase(),name:String(ctx.name||"This app"),keys:keys(),withdrawn:withdrawn()};   /* as permissions name apps: in small letters */
  var tag='<script>window.__ingDoorCfg='+JSON.stringify(cfg).replace(/</g,"\\u003c")+';\n'+DOOR.replace(/<\/script/gi,"<\\/script")+'<\/script>';
  if(/<head(\s[^>]*)?>/i.test(html))return html.replace(/<head(\s[^>]*)?>/i,function(m){return m+"\n"+tag;});
  if(/<html(\s[^>]*)?>/i.test(html))return html.replace(/<html(\s[^>]*)?>/i,function(m){return m+"\n<head>"+tag+"</head>";});
  return tag+"\n"+html;}
/* ---------- Package details: the switch, under Signed with your owner key ---------- */
function packageRow(box,r,pref,signRow){if(!master())return null;var on=pref.ownerOnly===true;
  var b=D.createElement("button");b.type="button";b.className="r349-row";b.setAttribute("role","switch");b.setAttribute("aria-checked",String(on));
  b.innerHTML='<span class="t"><b>Opens only with your owner key</b><small>For an app meant for you alone: every package opens only where you open it once with your owner key, or for someone you give a permission to use it. It keeps your signature on, which carries its door.</small></span><span class="tr"></span>';
  b.onclick=function(){on=!on;b.setAttribute("aria-checked",String(on));
    if(on&&signRow&&!signRow.on()){var s=box.querySelector('.r349-row[aria-checked="false"]');if(s&&s!==b)s.click();}};
  box.appendChild(b);return {on:function(){return on;}};}
/* ---------- the Security room ---------- */
function well(chip){var n=0;try{var s=ship();Object.keys(s).forEach(function(k){if(s[k]&&s[k].ownerOnly)n++;});}catch(e){}
  if(!master())return '<div class="sc-well"><div class="sc-wh"><b>Opens only with your owner key</b>'+chip("soon")+'</div><p>For an app meant for its owner alone: the owner\'s own copy of Ingenium makes it so; here, an app made that way opens with a permission from its owner.</p></div>';
  return '<div class="sc-well"><div class="sc-wh"><b>Opens only with your owner key</b>'+chip(n?"on":"off")+'</div><p>'+esc(n?"On for "+n+(n===1?" app":" apps")+": every package of "+(n===1?"it":"each")+" opens only where you open it once with your owner key, or for someone you give a permission to use it."
      :"For an app meant for you alone: turned on in its Package details, every package opens only where you open it once with your owner key, or for someone you give a permission to use it.")
    +'</p><p class="sc-fine">It keeps out a person without your key or your permission. The apps refuse a copy whose door was taken out, since the page is signed; a page opened straight from its file in a browser is not checked, and someone who takes the app apart on a device where it is open can always read it.</p></div>';}
W.IngOwnerOnly={wanted:wanted,door:door,blocked:blocked,packageRow:packageRow,well:well};
})();
;try{window.__ingParts["p354"]="running";}catch(_){}
</script>
<script type="text/x-ingenium-door" id="r354-door">/* Ingenium 7.63 · OPENS ONLY WITH YOUR OWNER KEY: the door at the head of a page Fabrica ships for its owner alone.
   It is the page's first script, and it is signed with the page (r349), so the shells and the web app refuse a copy without it.
   On a device where the app was opened by its owner (with the owner key's file and its password, once) or with a permission the
   owner signed ("use", in its dates, not withdrawn), the app starts as it is; anywhere else nothing of the app runs: the parser is
   stopped here, and the door is drawn in its place. The opening is kept in this app's own storage, signed by the owner key, and
   checked again at every start; the key itself is used once and never kept. Nothing leaves the device. CFG is written in by Fabrica:
   {app, name, keys:[{kid,x,y}], withdrawn:[n...]} */
(function(){"use strict";
var CFG=window.__ingDoorCfg||{app:"app",name:"This app",keys:[],withdrawn:[]};
var W=window,D=document,TE=new TextEncoder(),TD=new TextDecoder(),KEY="ingenium-door:"+CFG.app,DEV="ingenium-device";
var EC={name:"ECDSA",namedCurve:"P-256"},SIG={name:"ECDSA",hash:"SHA-256"};
var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
function b64u(u8){var s="";for(var i=0;i<u8.length;i++)s+=String.fromCharCode(u8[i]);return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
function unb64u(s){s=String(s||"").replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
function canon(v){if(v===null||typeof v!=="object")return JSON.stringify(v);if(Array.isArray(v))return "["+v.map(canon).join(",")+"]";
  return "{"+Object.keys(v).sort().filter(function(k){return v[k]!==undefined;}).map(function(k){return JSON.stringify(k)+":"+canon(v[k]);}).join(",")+"}";}
function day(d){d=d||new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);}
function said(iso){var m=/^(\d{4})-(\d\d)-(\d\d)/.exec(iso||"");return m?(+m[3])+" "+MONTHS[+m[2]-1]+" "+m[1]:"";}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function get(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function put(k,v){try{localStorage.setItem(k,v);return true;}catch(e){return false;}}
function drop(k){try{localStorage.removeItem(k);}catch(e){}}
function device(){var d=get(DEV);if(!d){d=b64u(crypto.getRandomValues(new Uint8Array(16)));put(DEV,d);}return d;}
function ownerKey(kid){return (CFG.keys||[]).filter(function(k){return k.kid===kid;})[0]||null;}
function verify(body,sig,kid){var k=ownerKey(kid);if(!k||typeof sig!=="string")return Promise.resolve(false);
  return crypto.subtle.importKey("jwk",{kty:"EC",crv:"P-256",x:k.x,y:k.y,ext:true},EC,false,["verify"])
    .then(function(key){return crypto.subtle.verify(SIG,key,unb64u(sig),TE.encode(canon(body)));}).then(null,function(){return false;});}
/* a permission, as PermitCore checks it (thoughts/permit_core.html, checkPermit): the owner's signature, not withdrawn, in its dates,
   for this app, allowing its use */
function permitState(file){var p=file&&file.permit;
  if(!file||file.kind!=="offline-project-permission"||!p||typeof file.sig!=="string")return Promise.resolve({state:"unreadable",why:"This is not a permission file."});
  return verify(p,file.sig,file.kid).then(function(ok){var t=day();
    if(!ok)return {state:"foreign",p:p,why:"It is not signed by this app's owner, or it was changed."};
    if((CFG.withdrawn||[]).indexOf(p.n)>=0)return {state:"withdrawn",p:p,why:"Its owner has withdrawn it."};
    if(p.from&&t<p.from)return {state:"notyet",p:p,why:"It begins on "+said(p.from)+"."};
    if(p.until&&t>p.until)return {state:"ended",p:p,why:"It ended on "+said(p.until)+". Ask its owner for a new one."};
    if(!Array.isArray(p.apps)||p.apps.indexOf(CFG.app)<0)return {state:"otherapp",p:p,why:"It is for another app, not for "+CFG.name+"."};
    if(!Array.isArray(p.allows)||p.allows.indexOf("use")<0)return {state:"nouse",p:p,why:"It does not allow its holder to use "+CFG.name+"."};
    return {state:"valid",p:p,why:esc(p.holder||"Its holder")+" may use "+esc(CFG.name)+(p.until?" until "+said(p.until):"")+"."};});}
/* what this device keeps: the owner's opening of the app here, or a permission */
function holds(kept){if(!kept||typeof kept!=="object")return Promise.resolve(false);
  if(kept.kind==="ingenium-app-opened"){var b=kept.body||{};
    if(b.kind!=="ingenium-app-opened"||b.v!==1||b.app!==CFG.app||b.device!==get(DEV))return Promise.resolve(false);
    return verify(b,kept.sig,kept.kid);}
  if(kept.kind==="offline-project-permission")return permitState(kept).then(function(r){return r.state==="valid";});
  return Promise.resolve(false);}

/* ---------- at the start: the app as it is, or the door ---------- */
var kept=null;try{kept=JSON.parse(get(KEY)||"null");}catch(e){kept=null;}
if(kept){   /* opened here before: the app starts, and the opening is checked again; one that does not hold closes it */
  holds(kept).then(function(ok){if(!ok){drop(KEY);location.reload();}});return;}
try{W.stop();}catch(e){}   /* nothing of the app is read beyond this script, so none of it runs */
W.__ingDoor=true;

var CSS=":root{color-scheme:light;--bg1:#efe8fb;--bg2:#d9ccf3;--card:#fff;--card2:#faf8fd;--ink1:#221a2e;--ink2:#4a4358;--ink3:#6c6480;--line:rgba(34,26,46,.1);--vio:#6a3fb5;--well:rgba(34,26,46,.04);--field:#fff;--ok:#1a7f50;--okbg:rgba(31,157,99,.13);--bad:#b8433f;--badbg:rgba(200,20,60,.1)}"
 +"@media (prefers-color-scheme:dark){:root{color-scheme:dark;--bg1:#1b1326;--bg2:#2a1d3d;--card:#2a2138;--card2:#241c31;--ink1:#f1ecf8;--ink2:#cfc6de;--ink3:#a69cb8;--line:rgba(255,255,255,.1);--vio:#b79ce6;--well:rgba(10,6,18,.35);--field:#1d1729;--ok:#6fd8a2;--okbg:rgba(64,192,128,.15);--bad:#f08a8a;--badbg:rgba(240,120,120,.14)}}"
 +"*{box-sizing:border-box}html,body{margin:0;height:100%}body{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:28px 16px;background:linear-gradient(160deg,var(--bg1),var(--bg2));color:var(--ink2);font:15px/1.6 -apple-system,BlinkMacSystemFont,\"Segoe UI\",system-ui,sans-serif;overflow:auto;scrollbar-width:none}body::-webkit-scrollbar{display:none}"
 +".card{width:min(540px,100%);background:linear-gradient(180deg,var(--card),var(--card2));border:1px solid var(--line);border-radius:22px;padding:28px 30px 24px;box-shadow:0 1px 1px rgba(40,20,70,.18),0 4px 8px rgba(40,20,70,.12),0 14px 30px rgba(40,20,70,.14),0 30px 60px rgba(40,20,70,.12);animation:rise .5s cubic-bezier(.2,.8,.2,1) both;transition:transform .3s cubic-bezier(.2,.9,.25,1.2)}"
 +".card:hover{transform:translateY(-3px)}@keyframes rise{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}"
 +".seal{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;color:#fff;background:radial-gradient(circle at 35% 30%,#9a74df,#6a3fb5 55%,#3a2070);box-shadow:inset 0 2px 1px rgba(255,255,255,.35),inset 0 -4px 8px rgba(20,8,40,.45),0 3px 5px rgba(40,20,70,.3),0 10px 22px rgba(52,24,100,.28);margin-bottom:12px}.seal svg{width:30px;height:30px}"
 +".eye{font:600 11.5px/1.3 -apple-system,BlinkMacSystemFont,\"Segoe UI\",system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--vio);margin:0}h1{font:700 26px/1.25 Georgia,\"Times New Roman\",serif;color:var(--ink1);margin:6px 0 8px}p{margin:6px 0}"
 +".well{background:var(--well);border:1px solid var(--line);border-radius:14px;padding:12px 16px;margin:14px 0;box-shadow:inset 0 1px 3px rgba(40,20,70,.08)}.nm{font:700 14px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--ink1);word-break:break-all}"
 +".keys{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:10px;margin-top:16px}"
 +".k{display:inline-flex;align-items:center;gap:8px;border:1px solid transparent;font:600 14px/1.2 -apple-system,BlinkMacSystemFont,\"Segoe UI\",system-ui,sans-serif;padding:10px 16px;border-radius:12px;cursor:pointer;white-space:nowrap;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s}"
 +".k.pri{background:linear-gradient(180deg,#7348be,#5d37a1);border-color:#4b2a86;color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26),0 8px 14px rgba(52,24,100,.12)}"
 +".k.pri:hover{transform:translateY(-3px);box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 2px 0 #3a2070,0 7px 12px rgba(52,24,100,.3),0 14px 22px rgba(52,24,100,.16)}.k:active{transform:translateY(1px)}"
 +".k.sec{background:linear-gradient(180deg,var(--card),var(--card2));border-color:var(--line);color:var(--ink1);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),0 1px 1px rgba(40,20,70,.2),0 3px 6px rgba(40,20,70,.12)}.k.sec:hover{transform:translateY(-3px);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),0 3px 4px rgba(40,20,70,.2),0 9px 16px rgba(40,20,70,.16)}"
 +".k.q{background:none;color:var(--vio);text-decoration:underline;text-underline-offset:3px;padding:10px 6px}.k.q:hover{transform:translateY(-2px)}"
 +".k[disabled]{opacity:.55;cursor:default;transform:none!important}.k:focus-visible{outline:2px solid var(--vio);outline-offset:2px}"
 +"label{display:flex;flex-direction:column;gap:6px;font:600 13px/1.3 -apple-system,BlinkMacSystemFont,\"Segoe UI\",system-ui,sans-serif;color:var(--ink1);margin:12px 0 0}"
 +".pw{position:relative}.pw input{width:100%;font:15px/1.3 -apple-system,BlinkMacSystemFont,\"Segoe UI\",system-ui,sans-serif;padding:11px 46px 11px 12px;border-radius:11px;border:1px solid var(--line);background:var(--field);color:var(--ink1);box-shadow:inset 0 2px 4px rgba(40,22,68,.1);outline:none}"
 +".pw input:focus{box-shadow:inset 0 2px 4px rgba(40,22,68,.1),0 0 0 3px rgba(106,63,181,.28)}"
 +".peek{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:34px;height:30px;border:0;border-radius:9px;background:transparent;color:var(--ink3);cursor:pointer;display:grid;place-items:center;transition:color .15s,box-shadow .18s}"
 +".peek:hover{color:var(--ink1);box-shadow:inset 0 1px 0 rgba(255,255,255,.6),0 1px 0 rgba(40,22,68,.1),0 2px 5px rgba(40,22,68,.12)}.peek svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}"
 +".file{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.file .nm{font-size:13px}"
 +".chip{display:inline-flex;align-items:center;font:600 12px/1 -apple-system,BlinkMacSystemFont,\"Segoe UI\",system-ui,sans-serif;padding:6px 11px;border-radius:999px;background:var(--okbg);color:var(--ok);box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 1px 2px rgba(40,22,68,.12)}.chip.bad{background:var(--badbg);color:var(--bad)}"
 +".say{min-height:1.4em;font-size:13.5px;margin:10px 0 0}.say.bad{color:var(--bad)}.fine{font-size:12.5px;color:var(--ink3);margin-top:14px}"
 +"@media (prefers-reduced-motion:reduce){.card,.k,.peek{animation:none;transition:none}.card:hover,.k:hover{transform:none}}";
var SEAL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9"/><path d="M17 6l3 3"/><path d="M14.5 8.5l2.5 2.5"/></svg>';
var EYE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></svg>';
var SHUT='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/><path d="M4.5 19.5L19.5 4.5"/></svg>';
function paint(inner){D.documentElement.innerHTML='<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(CFG.name)+'</title><style>'+CSS+'</style></head>'
  +'<body><main class="card" role="dialog" aria-labelledby="dh"><div class="seal">'+SEAL+'</div>'+inner+'</main></body>';}
function start(){paint('<p class="eye">For its owner alone</p><h1 id="dh">'+esc(CFG.name)+' opens for its owner</h1>'
  +'<p>Its owner opens it on this device once, with their owner key. Anyone else needs a permission from its owner to use it.</p>'
  +'<div class="keys"><button class="k q" type="button" id="dPermit">Use a permission</button><button class="k pri" type="button" id="dKey">Open it with my owner key</button></div>'
  +'<p class="fine">Nothing leaves this device.</p>');
  D.getElementById("dKey").onclick=withKey;D.getElementById("dPermit").onclick=withPermit;setTimeout(function(){try{D.getElementById("dKey").focus();}catch(e){}},60);}
function pick(accept,fn){var i=D.createElement("input");i.type="file";i.accept=accept;i.style.display="none";D.body.appendChild(i);
  i.onchange=function(){var f=i.files&&i.files[0];i.remove();if(!f)return;f.text().then(function(t){var j=null;try{j=JSON.parse(t);}catch(e){}fn(j,f.name);});};i.click();}
/* the owner key: its file, and its password, opened here (PBKDF2, then AES-GCM, as PermitCore keeps it), used once to sign this
   device's opening, and dropped */
function withKey(){var sealed=null;
  paint('<p class="eye">For its owner alone</p><h1 id="dh">Open '+esc(CFG.name)+' with your owner key</h1>'
    +'<div class="well"><div class="file"><button class="k sec" type="button" id="dFile">Choose your owner key file</button><span class="nm" id="dFileName">No file chosen yet</span></div></div>'
    +'<label for="dPw">Its password<span class="pw"><input type="password" id="dPw" autocomplete="off" spellcheck="false"><button class="peek" type="button" id="dPeek" aria-label="Show the password" aria-pressed="false">'+EYE+'</button></span></label>'
    +'<p class="say" id="dSay" aria-live="polite"></p>'
    +'<div class="keys"><button class="k q" type="button" id="dBack">Back</button><button class="k pri" type="button" id="dOpen" disabled>Open it</button></div>'
    +'<p class="fine">The key is used once, here, and is not kept.</p>');
  var pw=D.getElementById("dPw"),say=D.getElementById("dSay"),open=D.getElementById("dOpen"),peek=D.getElementById("dPeek");
  function sayIt(t,bad){say.textContent=t;say.className="say"+(bad?" bad":"");}
  function ready(){open.disabled=!(sealed&&pw.value);}
  peek.onmousedown=function(e){e.preventDefault();};peek.onclick=function(){var shown=pw.type==="password";pw.type=shown?"text":"password";peek.innerHTML=shown?SHUT:EYE;
    peek.setAttribute("aria-label",shown?"Hide the password":"Show the password");peek.setAttribute("aria-pressed",String(shown));pw.focus();};
  pw.oninput=ready;D.getElementById("dBack").onclick=start;
  D.getElementById("dFile").onclick=function(){pick(".ingkey,application/json",function(j){
    if(!j||j.kind!=="offline-project-owner-key"||!j.enc){sealed=null;D.getElementById("dFileName").textContent="No file chosen yet";sayIt("This is not an owner key's file.",true);ready();return;}
    if(!ownerKey(j.kid)){sealed=null;sayIt("This key is not the owner key of "+CFG.name+".",true);ready();return;}
    sealed=j;D.getElementById("dFileName").textContent="Owner key"+(j.made?", made "+said(j.made):"");sayIt("");ready();pw.focus();});};
  open.onclick=function(){if(!sealed||!pw.value)return;var e=sealed.enc,v=pw.value;open.disabled=true;sayIt("Opening your key…");
    crypto.subtle.importKey("raw",TE.encode(v),"PBKDF2",false,["deriveKey"]).then(function(base){
      return crypto.subtle.deriveKey({name:"PBKDF2",hash:"SHA-256",salt:unb64u(e.salt),iterations:e.iter},base,{name:"AES-GCM",length:256},false,["decrypt"]);})
    .then(function(k){return crypto.subtle.decrypt({name:"AES-GCM",iv:unb64u(e.iv)},k,unb64u(e.ct));})
    .then(function(pt){return crypto.subtle.importKey("jwk",JSON.parse(TD.decode(pt)),EC,false,["sign"]);},function(){throw new Error("That password does not open the key.");})
    .then(function(key){var body={kind:"ingenium-app-opened",v:1,app:CFG.app,device:device(),made:new Date().toISOString()};
      return crypto.subtle.sign(SIG,key,TE.encode(canon(body))).then(function(s){
        if(!put(KEY,JSON.stringify({kind:"ingenium-app-opened",body:body,kid:sealed.kid,sig:b64u(new Uint8Array(s))})))throw new Error("This device keeps nothing for this app (its storage is closed), so it cannot stay open.");
        pw.value="";v="";sayIt("Opened. This device keeps "+CFG.name+" open from now on.");setTimeout(function(){location.reload();},700);});})
    .then(null,function(err){v="";sayIt((err&&err.message)||"It could not be opened.",true);open.disabled=false;pw.select();});};}
/* a permission from the owner: its file, checked here, kept, and checked again at every start */
function withPermit(){var file=null;
  paint('<p class="eye">For its owner alone</p><h1 id="dh">Use a permission to open '+esc(CFG.name)+'</h1>'
    +'<div class="well"><div class="file"><button class="k sec" type="button" id="dFile">Choose the permission file</button><span class="nm" id="dFileName">No file chosen yet</span></div><div id="dState"></div></div>'
    +'<div class="keys"><button class="k q" type="button" id="dBack">Back</button><button class="k pri" type="button" id="dOpen" disabled>Open it</button></div>'
    +'<p class="fine">Its owner gives a permission for one person, for a time, and can withdraw it.</p>');
  var open=D.getElementById("dOpen"),st=D.getElementById("dState");D.getElementById("dBack").onclick=start;
  D.getElementById("dFile").onclick=function(){pick(".ingperm,application/json",function(j,name){D.getElementById("dFileName").textContent=name||"";
    permitState(j).then(function(r){file=r.state==="valid"?j:null;open.disabled=!file;if(r.p&&r.p.n)D.getElementById("dFileName").textContent="Permission "+r.p.n;
      var chip={valid:"Valid",ended:"Ended",withdrawn:"Withdrawn",notyet:"Not yet",otherapp:"Another app's",nouse:"Not for use",foreign:"Not the owner's",unreadable:"Not a permission"}[r.state]||"Not valid";
      st.innerHTML='<p style="margin-top:12px"><span class="chip'+(r.state==="valid"?"":" bad")+'">'+chip+'</span></p><p>'+(r.state==="valid"?r.why:esc(r.why))+'</p>';
      if(file)open.focus();});});};
  open.onclick=function(){if(!file)return;if(!put(KEY,JSON.stringify(file))){open.disabled=true;return;}location.reload();};}
if(D.readyState==="loading"&&!D.documentElement)D.addEventListener("DOMContentLoaded",start);else start();
})();
</script>
