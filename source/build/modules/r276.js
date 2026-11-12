<style id="r276-css">
/* ============ R276 · FABRICA BRINGS EVERYTHING FROM GITHUB (Ingenium 6.83, 11 November 2026) ============
   Her words (11 November 2026): "I want to transfer all of my data and contents from GitHub directly to Ingenium and continue working
   from there without missing a beat, this is really important to me." On its preview (https://claude.ai/artifact/4E99gkSPJ11A6fHH2nk4Va):
   "I like the preview please push it everywhere but make sure that all of the apps logos are showing instead of the coloured letters".
   A sheet over Fabrica in four steps, as approved: sign in once (GitHub's own page and a code, or a key; r114's sign-in), choose what
   comes and the drive it goes to, bring it (the computer app's engine, desktop/app_hub_683.py, in the background, with pause and stop),
   and see it checked against GitHub. Each repository wears its app's own logo: the four apps' seals (r140), Lakay's Spiral and the
   master logo from the page's own pictures, or the logo found in the repository's own files; never a coloured letter. A repository
   whose history is up to 500 MB opens in Fabrica with its versions, branches, tags, issues, pull requests and comments; every one is
   on the drive in git's own format, which any git program opens. Drawn only with Fabrica's tokens (--f-*). */
#fb .hb-wrap{position:absolute;inset:0;z-index:40;display:flex;justify-content:center;align-items:flex-start;overflow:auto;padding:14px;border-radius:14px;
  background:rgba(17,13,24,.38);animation:fbRise .2s ease;overscroll-behavior:contain}
#fb .hb{width:min(1080px,100%);background:var(--f-card);border-radius:20px;box-shadow:var(--f-slabhi);border:1px solid var(--f-hair2);animation:fbRise3 .45s var(--f-spring)}
#fb .hb-hd{display:flex;align-items:center;gap:10px;padding:14px 18px 10px;border-bottom:1px solid var(--f-hair2);flex-wrap:wrap}
#fb .hb-hd h3{font:600 20px/1.2 var(--f-serif);margin:0;flex:1 1 220px;min-width:0;color:var(--f-ink1)}
#fb .hb-chip{font:600 11.5px/1 var(--f-sans);padding:6px 10px;border-radius:999px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);color:var(--f-acc);white-space:nowrap}
#fb .hb-chip.ok{color:var(--f-ok)}
#fb .hb-bd{padding:14px 18px 18px;display:flex;flex-direction:column;gap:12px}
#fb .hb-steps{display:flex;gap:8px;flex-wrap:wrap}
#fb .hb-step{display:inline-flex;align-items:center;gap:8px;font:600 13px var(--f-sans);color:var(--f-ink2);padding:7px 12px 7px 8px;border-radius:999px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);border:1px solid var(--f-hair2)}
#fb .hb-step i{font-style:normal;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font:700 11.5px var(--f-sans);background:var(--f-wellbg);box-shadow:var(--f-well);color:var(--f-ink2)}
#fb .hb-step.now{color:#fff;background:linear-gradient(var(--f-pa),var(--f-pb));box-shadow:var(--f-psh);border-color:transparent}
#fb .hb-step.now i{background:rgba(255,255,255,.22);box-shadow:none;color:#fff}
#fb .hb-step.done i{background:var(--f-ok);color:#fff;box-shadow:none}
#fb .hb h4{font:600 19px/1.25 var(--f-serif);margin:2px 0 0;color:var(--f-ink1)}
#fb .hb p{margin:0;color:var(--f-ink2);max-width:72ch;font-size:13.5px;line-height:1.55}
#fb .hb .hb-small{font-size:12.5px;color:var(--f-ink3)}
#fb .hb-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
#fb .hb-well{border-radius:14px;background:var(--f-wellbg);box-shadow:var(--f-well);padding:11px 14px;font:12.5px/1.45 var(--f-mono);color:var(--f-ink2);overflow-wrap:anywhere}
#fb .hb-tiles{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
#fb .hb-tile{font:700 24px/1 var(--f-mono);width:42px;height:52px;display:grid;place-items:center;border-radius:11px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);color:var(--f-ink1);animation:hbRise .6s var(--f-spring) both}
#fb .hb-tile.gap{width:14px;box-shadow:none;background:none;color:var(--f-ink3)}
@keyframes hbRise{from{transform:translateY(8px)}to{transform:none}}
#fb .hb-what{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:9px}
#fb .hb-opt{display:flex;gap:10px;align-items:flex-start;text-align:left;padding:10px 12px;border-radius:13px;border:1px solid var(--f-hair2);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);cursor:pointer;font:inherit;color:var(--f-ink1);transition:transform .2s var(--f-spring),box-shadow .2s ease}
#fb .hb-opt:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .hb-opt:active{transform:translateY(1px);box-shadow:var(--f-press)}
#fb .hb-opt.fixed{cursor:default}#fb .hb-opt.fixed:hover,#fb .hb-opt.fixed:active{transform:none;box-shadow:var(--f-pop)}
#fb .hb-box{flex:0 0 20px;height:20px;border-radius:6px;background:var(--f-wellbg);box-shadow:var(--f-well);display:grid;place-items:center;margin-top:1px}
#fb [aria-checked="true"] > .hb-box{background:linear-gradient(var(--f-pa),var(--f-pb));box-shadow:0 1px 0 var(--f-pledge)}
#fb .hb-box svg{width:13px;height:13px;opacity:0;color:#fff}#fb [aria-checked="true"] > .hb-box svg{opacity:1}
#fb .hb-opt b{display:block;font-size:13.5px}#fb .hb-opt span.s{display:block;font-size:12px;color:var(--f-ink3);margin-top:1px}
#fb .hb-tbl{overflow-x:auto;border-radius:14px;box-shadow:var(--f-well);background:var(--f-wellbg)}
#fb .hb-tbl table{border-collapse:collapse;width:100%;min-width:560px;font-size:12.5px;font-variant-numeric:tabular-nums}
#fb .hb-tbl th,#fb .hb-tbl td{padding:7px 10px;text-align:right;border-bottom:1px solid var(--f-hair2);white-space:nowrap;color:var(--f-ink2)}
#fb .hb-tbl th{font:600 11px var(--f-sans);letter-spacing:.08em;text-transform:uppercase;color:var(--f-ink3)}
#fb .hb-tbl th:first-child,#fb .hb-tbl td:first-child{text-align:left}
#fb .hb-tbl tr:last-child td{border-bottom:0}#fb .hb-tbl tfoot td{font-weight:700;color:var(--f-ink1)}
#fb .hb-pick{display:inline-flex;align-items:center;gap:9px;cursor:pointer;background:none;border:0;font:600 12.5px var(--f-mono);color:var(--f-ink1);padding:0;text-align:left}
#fb .hb-pick .hb-box{flex:0 0 18px;height:18px;border-radius:5px;margin:0}
#fb .hb-logo{flex:0 0 auto;display:inline-block;border-radius:50%;object-fit:contain;filter:drop-shadow(0 1px 2px rgba(40,22,68,.25))}
body[data-theme="night"] #fb .hb-logo{filter:drop-shadow(0 1px 3px rgba(0,0,0,.5))}
#fb .hb-emblem{display:inline-grid;place-items:center;width:var(--s,28px);height:var(--s,28px);border-radius:50%;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);color:var(--f-acc)}
#fb .hb-emblem svg{width:55%;height:55%}
#fb .hb-lock{font:600 10.5px var(--f-sans);padding:2px 7px;border-radius:99px;background:var(--f-accs);color:var(--f-acc);margin-left:6px}
#fb .hb-lock.pub{background:var(--f-oks);color:var(--f-ok)}
#fb .hb-dest{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:9px}
#fb .hb-drive{display:flex;gap:10px;align-items:center;text-align:left;padding:11px 12px;border-radius:13px;border:1px solid var(--f-hair2);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);cursor:pointer;font:inherit;color:var(--f-ink1);transition:transform .2s var(--f-spring),box-shadow .2s ease}
#fb .hb-drive:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}#fb .hb-drive:active{transform:translateY(1px);box-shadow:var(--f-press)}
#fb .hb-drive[aria-pressed="true"]{color:#fff;background:linear-gradient(var(--f-pa),var(--f-pb));box-shadow:var(--f-psh);border-color:transparent}
#fb .hb-drive[aria-pressed="true"] span.s{color:rgba(255,255,255,.85)}
#fb .hb-drive svg{width:26px;height:26px;flex:0 0 auto}#fb .hb-drive b{display:block;font-size:13.5px}#fb .hb-drive span.s{display:block;font-size:12px;color:var(--f-ink3);overflow-wrap:anywhere}
#fb .hb-prog{display:flex;flex-direction:column;gap:10px}
#fb .hb-pr{display:grid;grid-template-columns:28px minmax(110px,220px) minmax(0,1fr) 54px;gap:10px;align-items:center}
#fb .hb-pr .nm{font:600 12.5px var(--f-mono);overflow-wrap:anywhere;min-width:0;color:var(--f-ink1)}
#fb .hb-bar{height:12px;border-radius:99px;background:var(--f-wellbg);box-shadow:var(--f-well);overflow:hidden;display:flex}
#fb .hb-bar i{display:block;height:100%;transition:width .35s ease}
#fb .hb-bar i.s0{background:var(--f-acc)}#fb .hb-bar i.s1{background:color-mix(in srgb,var(--f-acc) 70%,var(--f-ok))}
#fb .hb-bar i.s2{background:color-mix(in srgb,var(--f-acc) 40%,var(--f-ok))}#fb .hb-bar i.s3{background:var(--f-ok)}
#fb .hb-pct{font:600 12px var(--f-mono);text-align:right;color:var(--f-ink2)}
#fb .hb-pr.bad .hb-pct{color:var(--f-warn)}
#fb .hb-checks{display:flex;flex-direction:column;gap:8px}
#fb .hb-ck{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:4px 10px;align-items:center;padding:10px 12px;border-radius:13px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill)}
#fb .hb-ck b{font:600 13.5px var(--f-sans);color:var(--f-ink1)}#fb .hb-ck span.s{grid-column:2/-1;font-size:12.5px;color:var(--f-ink3)}
#fb .hb-done{padding:14px 16px;border-radius:16px;background:var(--f-oks);box-shadow:var(--f-well);color:var(--f-ink1)}
#fb .hb-done b{font:600 17px var(--f-serif)}
#fb .hb-warn{padding:11px 14px;border-radius:13px;background:var(--f-warns);color:var(--f-ink1);box-shadow:var(--f-well);font-size:13px}
#fb .hb-busy{display:inline-block;width:14px;height:14px;border-radius:50%;border:2px solid var(--f-accs);border-top-color:var(--f-acc);animation:hbSpin 1s linear infinite;vertical-align:-2px;margin-right:6px}
@keyframes hbSpin{to{transform:rotate(360deg)}}
@media (max-width:640px){#fb .hb-pr{grid-template-columns:28px minmax(0,1fr) 48px}#fb .hb-pr .hb-bar{grid-column:1/-1;order:3}#fb .hb-wrap{padding:6px}}
@media (prefers-reduced-motion:reduce){#fb .hb,#fb .hb-tile,#fb .hb-busy{animation:none}#fb .hb-opt,#fb .hb-drive{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p276"]="started";}catch(_){}
/* ============ R276 · FABRICA BRINGS EVERYTHING FROM GITHUB (Ingenium 6.83) ============
   window.IngHubBring {open, close, logo, famKey, record, openRepo, state}: see the stylesheet above for what it is and why. */
(function r276(){
"use strict";
if(window.IngHubBring)return;
var W=window,D=document,LIMIT=500*1048576;
var TICK='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5l3 3 6-7"/></svg>';
var SPARK='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l1.9 6.2 6.6 1.3-6.6 1.3L12 21.5l-1.9-6.2L3.5 14l6.6-1.3z"/></svg>';
function mk(t,c,html){var e=D.createElement(t);if(c)e.className=c;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function X(){return W.fbHubHost||null;}
function A(){try{var a=typeof W.shellApi==="function"?W.shellApi():null;return a&&typeof a.hub_scan==="function"?a:null;}catch(e){return null;}}
function GHs(){if(!W.state.github||typeof W.state.github!=="object")W.state.github={};return W.state.github;}
function gb(n){n=+n||0;return n>=1e9?(n/1e9).toFixed(1)+" GB":n>=1e6?(n/1e6).toFixed(1)+" MB":Math.max(1,Math.round(n/1e3))+" KB";}
function fmt(n){return (+n||0).toLocaleString("en-GB");}
function key(cls,text,fn){var b=mk("button",cls||"f-btn");b.type="button";b.textContent=text;if(fn)b.onclick=fn;return b;}

/* ---------- each repository's own logo: never a coloured letter ---------- */
function famKey(name){var n=String(name||"").toLowerCase();
  if(/carpe[-_ ]?diem/.test(n))return "cd";if(/forge/.test(n))return "forge";if(/ingenium/.test(n))return "ingenium";if(/ink[-_ ]?well|inwell/.test(n))return "inkwell";
  if(/lakay/.test(n))return "lakay";if(/offline[-_ ]?(pro|project)/.test(n))return "master";return null;}
function flat(k){try{var s=W.ING_SEALS&&ING_SEALS[k];return s&&s.b64?"data:image/png;base64,"+s.b64:"";}catch(e){return "";}}
function logo(r,size){size=size||28;var k=famKey(r&&(r.name||r.full)),src="";
  if(k&&k!=="lakay"&&k!=="master"&&W.IngSeal&&typeof IngSeal.el==="function"){try{var e=IngSeal.el([k],{size:size,alt:""});if(e){e.classList.add("hb-logo");e.style.width=e.style.height=size+"px";return e;}}catch(x){}}
  if(k)src=flat(k);if(!src&&r&&r.icon&&/^data:image\/(png|jpeg|webp);base64,/.test(r.icon))src=r.icon;
  if(src){var im=new Image();im.src=src;im.alt="";im.className="hb-logo";im.style.width=im.style.height=size+"px";im.draggable=false;return im;}
  var em=mk("span","hb-logo hb-emblem",SPARK);em.style.setProperty("--s",size+"px");em.setAttribute("aria-hidden","true");return em;}

/* ---------- state ---------- */
var S={open:false,wrap:null,step:1,what:{issues:true,releases:true,wiki:true,actions:true},skip:{},places:null,brought:null,st:null,timer:null,sig:"",dev:null,ctl:null,say:"",seen:false};
function job(){return S.st&&S.st.job||null;}
function scan(){return S.st&&S.st.scan||null;}
function running(){var j=job();return !!(j&&(j.state==="running"||j.state==="paused"));}
function stepNow(){if(!GHs().token)return 1;var j=job();if(running())return 3;if(j&&S.seen&&/^done|stopped/.test(j.state))return 4;return 2;}

function poll(){var a=A();if(!a)return;Promise.resolve(a.hub_status()).then(function(st){S.st=st;var j=st&&st.job;
    if(j&&/^done/.test(j.state)&&S.seen==="bringing"){S.seen=true;refreshBrought();}
    if(S.open)paint();else if(!running()&&!(st.scan&&st.scan.state==="scanning")){clearInterval(S.timer);S.timer=null;}},function(){});}
function startPoll(){if(!S.timer)S.timer=setInterval(poll,700);poll();}
function refreshPlaces(){var a=A();if(!a)return Promise.resolve();return Promise.resolve(a.hub_places()).then(function(p){S.places=p;if(S.open)paint(true);},function(){});}
function refreshBrought(){var a=A();if(!a)return Promise.resolve();return Promise.resolve(a.hub_brought()).then(function(b){S.brought=b;if(S.open)paint(true);},function(){});}
function startScan(){var a=A(),t=GHs().token;if(!a||!t)return;S.say="";Promise.resolve(a.hub_scan(t)).then(function(r){if(r&&r.ok===false)S.say=r.error||"";startPoll();},function(e){S.say=String(e&&e.message||e);paint(true);});}

/* ---------- the sheet ---------- */
function open(){var fb=D.getElementById("fb");if(!fb)return false;close(true);S.open=true;S.sig="";
  S.wrap=mk("div","hb-wrap");S.wrap.setAttribute("role","dialog");S.wrap.setAttribute("aria-label","Bring everything from GitHub");
  S.wrap.addEventListener("click",function(e){if(e.target===S.wrap)close();});fb.appendChild(S.wrap);
  if(A()){refreshPlaces();refreshBrought();startPoll();var sc=scan();if(GHs().token&&(!sc||(sc.state!=="scanning"&&sc.state!=="done")))startScan();}
  paint(true);return true;}
function close(quiet){if(S.ctl){S.ctl.stop=true;if(S.ctl.timer)clearTimeout(S.ctl.timer);S.ctl=null;}if(S.wrap){S.wrap.remove();S.wrap=null;}S.open=false;
  if(!quiet&&S.seen===true&&!running())S.seen=false;}
function paint(force){if(!S.wrap)return;var step=stepNow(),sg=JSON.stringify([step,S.st,S.places&&S.places.place,S.brought&&S.brought.repos&&S.brought.repos.length,S.say,S.skip,S.what,!!S.dev,GHs().login]);
  if(!force&&sg===S.sig)return;S.sig=sg;var keepY=S.wrap.scrollTop;S.wrap.innerHTML="";
  var hb=mk("section","hb"),hd=mk("div","hb-hd");hd.appendChild(mk("h3",null,"Bring everything from GitHub"));
  var j=job(),chip=mk("span","hb-chip"+(step===4?" ok":""));chip.textContent=!A()?"On a computer":step===1?"Not signed in":step===3?(j&&j.state==="paused"?"Paused":"Bringing"):step===4?"Everything here":"Signed in as "+(GHs().login||"you");
  hd.appendChild(chip);hd.appendChild(key("f-btn","Close",function(){close();}));hb.appendChild(hd);
  var bd=mk("div","hb-bd");hb.appendChild(bd);
  var steps=mk("div","hb-steps");["Sign in once","Choose","Bring","Checked"].forEach(function(t,i){var n=i+1,e=mk("span","hb-step"+(n===step?" now":(n<step?" done":"")));e.innerHTML="<i>"+(n<step?TICK:n)+"</i>"+esc(t);steps.appendChild(e);});bd.appendChild(steps);
  if(!A())paintNoComputer(bd);else [null,paint1,paint2,paint3,paint4][step](bd);
  S.wrap.appendChild(hb);S.wrap.scrollTop=keepY;}

function paintNoComputer(bd){bd.appendChild(mk("h4",null,"This runs in Ingenium's Mac and Windows apps"));
  bd.appendChild(mk("p",null,"Bringing everything from GitHub writes your repositories, with their whole history, to a drive you choose, with no limit but its free space. Open Fabrica in Ingenium on your Mac mini or your HP laptop to do it. On a tablet or phone, Fabrica keeps the apps you bring in one at a time."));}

/* 1. sign in once */
function paint1(bd){var G=W.fbGitHub;bd.appendChild(mk("h4",null,"Sign in to GitHub once"));
  bd.appendChild(mk("p",null,"Fabrica asks GitHub for a code. Type it on GitHub's page, on any device, and Fabrica can read every repository you own, private ones too. It only reads: nothing on GitHub is changed. Your sign-in stays on this computer."));
  if(S.dev){var t=mk("div","hb-tiles");String(S.dev.user_code||"").split("").forEach(function(ch,i){var x=mk("span","hb-tile"+(ch==="-"?" gap":""));x.textContent=ch;x.style.animationDelay=(i*45)+"ms";t.appendChild(x);});bd.appendChild(t);}
  var row=mk("div","hb-row");
  if(G&&typeof G.canDevice==="function"&&G.canDevice()){
    if(!S.dev)row.appendChild(key("f-btn pri","Sign in with GitHub",function(){signDevice();}));
    else{row.appendChild(key("f-btn pri","Open GitHub's page",function(){G.openOut(S.dev.verification_uri||"https://github.com/login/device");}));
      row.appendChild(key("f-btn","Copy the code",function(b){try{navigator.clipboard.writeText(S.dev.user_code).then(function(){X()&&X().toast("Copied.");},function(){});}catch(e){}}));}}
  bd.appendChild(row);
  var w=mk("div","hb-well");w.id="hbWait";w.textContent=S.say||(S.dev?"Waiting for you on GitHub…":"Or sign in with a key: a fine-grained token that can read your repositories' contents, issues, pull requests and actions.");bd.appendChild(w);
  var r2=mk("div","hb-row"),inp=mk("input","f-find");inp.type="password";inp.placeholder="Paste a key (github_pat_…)";inp.setAttribute("aria-label","A GitHub key");inp.id="hbKey";inp.style.minWidth="260px";
  r2.appendChild(inp);r2.appendChild(key("f-btn","Sign in with the key",function(){var v=inp.value.trim();if(!v){inp.focus();return;}
    S.say="Checking the key with GitHub…";paint(true);Promise.resolve(G.signIn(v)).then(function(){GHs().via="token";signedIn();},function(e){S.say=String(e&&e.message||e);paint(true);});}));
  bd.appendChild(r2);}
function signDevice(){var G=W.fbGitHub;S.ctl={};S.say="Asking GitHub for a code…";paint(true);
  G.deviceStart().then(function(d){S.dev=d;S.say="Waiting for you on GitHub…";paint(true);G.openOut(d.verification_uri||"https://github.com/login/device");
      return G.devicePoll(d,function(ms){var w=D.getElementById("hbWait");if(w)w.textContent="Waiting for you on GitHub… "+Math.floor(ms/60000)+":"+String(Math.round(ms/1000)%60).padStart(2,"0")+" left";},S.ctl);})
    .then(function(d){return G.signIn(d.access_token).then(function(){GHs().via="device";signedIn();});})
    .then(null,function(e){if(e&&e.code==="stopped")return;S.dev=null;S.say=String(e&&e.message||e);paint(true);});}
function signedIn(){S.dev=null;S.say="";try{W.saveState&&saveState();}catch(e){}paint(true);startScan();}

/* 2. choose */
var WHAT=[["history","Every version, branch and tag","The whole history, in git's own format",1],["issues","Issues and pull requests","With every comment, review, label and milestone"],
  ["releases","Releases and their files","Each file checked by its fingerprint"],["wiki","Wiki pages","With their own history"],["actions","Workflows and their runs","The run records GitHub still keeps"]];
function sizeOf(r){return (+r.kb||0)*1024+(S.what.releases?(+r.release_bytes||0):0);}
function chosen(){var sc=scan();return ((sc&&sc.repos)||[]).filter(function(r){return !S.skip[r.full];});}
function paint2(bd){var sc=scan()||{};
  bd.appendChild(mk("h4",null,"What comes, and where it goes"));
  if(sc.state!=="done"){var w=mk("div","hb-well");w.innerHTML=sc.state==="failed"?esc(sc.error||"GitHub could not be read."):'<span class="hb-busy"></span>'+esc(sc.wait||sc.line||"Asking GitHub for your repositories")+(sc.total?" ("+(sc.done||0)+" of "+sc.total+")":"");bd.appendChild(w);
    var rr=mk("div","hb-row");if(sc.state==="failed")rr.appendChild(key("f-btn","Read them again",startScan));rr.appendChild(key("f-btn","Sign out of GitHub",function(){W.fbGitHub.signOut();paint(true);}));bd.appendChild(rr);
    if(!(sc.repos||[]).length)return;}
  bd.appendChild(mk("p",null,"All of your repositories are chosen. Leave out any you do not want. Nothing has a size limit except the free space on the drive you choose. GitHub stays as your backup: nothing there is changed or deleted."));
  var wh=mk("div","hb-what");WHAT.forEach(function(o){var on=o[3]?true:!!S.what[o[0]],b=mk("button","hb-opt"+(o[3]?" fixed":""));b.type="button";b.setAttribute("role","checkbox");b.setAttribute("aria-checked",String(on));
    b.innerHTML='<span class="hb-box">'+TICK+'</span><span><b>'+esc(o[1])+'</b><span class="s">'+esc(o[2])+(o[3]?" (always)":"")+"</span></span>";if(!o[3])b.onclick=function(){S.what[o[0]]=!S.what[o[0]];paint(true);};wh.appendChild(b);});bd.appendChild(wh);
  var tb=mk("div","hb-tbl"),t=mk("table");t.innerHTML="<thead><tr><th>Repository</th><th>Versions</th><th>Branches, tags</th><th>Issues, pulls</th><th>Releases</th><th>Size</th></tr></thead>";
  var body=mk("tbody");(sc.repos||[]).forEach(function(r){var tr=mk("tr"),td=mk("td"),pk=mk("button","hb-pick");pk.type="button";pk.setAttribute("role","checkbox");pk.setAttribute("aria-checked",String(!S.skip[r.full]));
    pk.innerHTML='<span class="hb-box">'+TICK+"</span>";pk.appendChild(logo(r,24));pk.appendChild(D.createTextNode(r.name));pk.onclick=function(){S.skip[r.full]=!S.skip[r.full];paint(true);};
    td.appendChild(pk);var lk=mk("span","hb-lock"+(r.private?"":" pub"));lk.textContent=r.private?"Private":"Public";td.appendChild(lk);tr.appendChild(td);
    [fmt(r.versions),r.branches+", "+r.tags,S.what.issues?r.issues+", "+r.pulls:"·",S.what.releases?r.releases:"·",gb(sizeOf(r))].forEach(function(v){var c=mk("td");c.textContent=v;tr.appendChild(c);});body.appendChild(tr);});
  t.appendChild(body);var ch=chosen(),tot=ch.reduce(function(a,r){return a+sizeOf(r);},0),tf=mk("tfoot");
  tf.innerHTML="<tr><td>"+ch.length+" of "+(sc.repos||[]).length+" chosen</td><td>"+fmt(ch.reduce(function(a,r){return a+(+r.versions||0);},0))+'</td><td colspan="3"></td><td>'+esc(gb(tot))+"</td></tr>";t.appendChild(tf);tb.appendChild(t);bd.appendChild(tb);
  var P=S.places||{},ds=mk("div","hb-dest");((P.places)||[]).forEach(function(pl){var b=mk("button","hb-drive");b.type="button";b.setAttribute("aria-pressed",String(P.place===pl.folder));
    b.innerHTML=(pl.kind==="computer"?'<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="4" y="5" width="18" height="12" rx="2"/><path d="M2 20h22"/></svg>':'<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="8" width="20" height="10" rx="3"/><circle cx="18" cy="13" r="1.4" fill="currentColor"/></svg>')
      +"<span><b>"+esc(pl.label)+'</b><span class="s">'+(pl.free!=null?esc(gb(pl.free))+" free":"")+"</span></span>";
    b.onclick=function(){Promise.resolve(A().hub_set_place(pl.folder)).then(function(r){if(r&&r.ok===false){S.say=r.error;paint(true);}S.places=r&&r.ok?r:S.places;paint(true);});};ds.appendChild(b);});
  var other=mk("button","hb-drive");other.type="button";var inList=((P.places)||[]).some(function(pl){return pl.folder===P.place;});other.setAttribute("aria-pressed",String(!!P.place&&!inList));
  other.innerHTML='<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 8h7l2 2h11v10H3z"/></svg><span><b>'+(inList||!P.place?"Choose a folder":"This folder")+'</b><span class="s">'+esc(inList||!P.place?"On any drive":P.place)+"</span></span>";
  other.onclick=function(){Promise.resolve(A().hub_choose_place()).then(function(r){if(r&&r.ok)S.places=r;else if(r&&r.error)S.say=r.error;paint(true);});};ds.appendChild(other);bd.appendChild(ds);
  if(S.brought&&S.brought.repos&&S.brought.repos.length)bd.appendChild(mk("p","hb-small",esc(S.brought.repos.length+" of them "+(S.brought.repos.length===1?"is":"are")+" here already, on "+S.brought.place+". Bringing them again brings only what is new.")));
  if(S.say)bd.appendChild(mk("div","hb-warn",esc(S.say)));
  var row=mk("div","hb-row"),go=key("f-btn pri","Bring everything ("+gb(tot)+")",function(){bring(ch);});go.id="hbGo";go.disabled=!ch.length||sc.state!=="done";row.appendChild(go);
  row.appendChild(mk("span","hb-small","You can keep working while it comes in. Large histories take hours on a home connection; pause or stop it at any time, and bring them again to carry on from where it stopped."));bd.appendChild(row);}
function bring(list){var a=A();S.say="";Promise.resolve(a.hub_bring(GHs().token,{repos:list,what:S.what})).then(function(r){if(!r||r.ok===false){S.say=(r&&r.error)||"Bringing could not start.";paint(true);return;}S.seen="bringing";startPoll();},function(e){S.say=String(e&&e.message||e);paint(true);});}

/* 3. bring */
var CUT=[52,58,74,95,100];
function paint3(bd){var j=job()||{repos:[]},sc=scan()||{},by={};((sc.repos)||[]).forEach(function(r){by[r.full]=r;});
  bd.appendChild(mk("h4",null,j.state==="paused"?"Paused":"Bringing everything"));
  bd.appendChild(mk("p","hb-small","Into "+(j.place||"")+". Versions first, then issues and pull requests, releases and their files, the wiki and the workflows; then each repository is checked against GitHub."));
  var g=mk("div","hb-prog");(j.repos||[]).forEach(function(x){var row=mk("div","hb-pr"+(x.stage==="failed"?" bad":""));row.appendChild(logo(by[x.full]||{full:x.full,name:x.full.split("/")[1]},26));
    var nm=mk("span","nm");nm.textContent=x.full.split("/")[1];row.appendChild(nm);var bar=mk("span","hb-bar"),from=0,p=+x.pct||0;
    [52,74,95,100].forEach(function(c,k){var w=Math.max(0,Math.min(p,c)-from);var i=mk("i","s"+k);i.style.width=w+"%";bar.appendChild(i);from=c;});row.appendChild(bar);
    var pc=mk("span","hb-pct");pc.textContent=x.stage==="failed"?"Not brought":x.stage==="waiting"?"Waiting":Math.floor(p)+"%";row.appendChild(pc);g.appendChild(row);});bd.appendChild(g);
  var cur=(j.repos||[]).filter(function(x){return x.line;})[0],w=mk("div","hb-well");w.textContent=j.wait||(cur?cur.full.split("/")[1]+": "+cur.line:"…");bd.appendChild(w);
  (j.repos||[]).filter(function(x){return x.error;}).forEach(function(x){bd.appendChild(mk("div","hb-warn",esc(x.full+": "+x.error)));});
  var row=mk("div","hb-row");row.appendChild(key("f-btn",j.state==="paused"?"Carry on":"Pause",function(){Promise.resolve(A().hub_pause(j.state!=="paused")).then(poll);}));
  row.appendChild(key("f-btn","Stop",function(){Promise.resolve(A().hub_stop()).then(poll);}));bd.appendChild(row);}

/* 4. checked */
function paint4(bd){var j=job()||{repos:[]},sc=scan()||{},by={},br={};((sc.repos)||[]).forEach(function(r){by[r.full]=r;});((S.brought&&S.brought.repos)||[]).forEach(function(r){br[r.full]=r;});
  var good=(j.repos||[]).filter(function(x){return x.stage==="done";}),bytes=(j.repos||[]).reduce(function(a,x){return a+(by[x.full]?sizeOf(by[x.full]):0);},0);
  bd.appendChild(mk("h4",null,j.state==="stopped"?"Stopped: what came in is kept":"Everything is here, and checked against GitHub"));
  var dc=mk("div","hb-done");dc.innerHTML="<b>"+good.length+" of "+(j.repos||[]).length+" repositories, about "+esc(gb(bytes))+", on "+esc(j.place||"")+".</b><br>GitHub stays as your backup. Nothing on it was changed or deleted. Each repository is a folder any git program opens.";bd.appendChild(dc);
  var ck=mk("div","hb-checks");(j.repos||[]).forEach(function(x){var r=by[x.full]||{full:x.full,name:x.full.split("/")[1]},c=x.counts||{},k=x.check||{},e=mk("div","hb-ck");e.appendChild(logo(r,26));
    var t=mk("b");t.textContent=r.name+(x.stage==="done"?"":x.stage==="failed"?": not brought":": differs from GitHub");e.appendChild(t);
    var acts=mk("span","hb-row");if(x.stage==="done"||x.stage==="differs"){var ob=key("f-btn","Open in Fabrica",function(){openRepo(x.full,r.name,r.description||"",ob);});acts.appendChild(ob);}e.appendChild(acts);
    var s=mk("span","s"),bits=[];if(c.refs!=null)bits.push((k.refs_match?"every branch and tag matches GitHub: ":"branches and tags differ: ")+c.branches+" branches, "+c.tags+" tags, "+(c.pull_refs||0)+" pull requests' versions");
    if(c.issues!=null)bits.push((c.issues||0)+" issues and "+(c.pulls||0)+" pull requests");if(c.release_files!=null)bits.push((c.release_files_ok||0)+" of "+c.release_files+" release files checked by fingerprint");
    if(c.wiki_refs)bits.push("the wiki");if(c.runs!=null)bits.push((c.runs||0)+" workflow runs");s.textContent=x.error||bits.join(" · ");e.appendChild(s);ck.appendChild(e);});bd.appendChild(ck);
  bd.appendChild(mk("p","hb-small","Fabrica opens a repository with up to 500 MB of history on this computer, with its issues, pull requests and comments; a larger one is whole on the drive, and opening it in Fabrica there is the next step."));
  if(S.say)bd.appendChild(mk("div","hb-warn",esc(S.say)));
  var row=mk("div","hb-row");row.appendChild(key("f-btn","Bring what changed since",function(){S.seen=false;S.sig="";startScan();paint(true);}));row.appendChild(key("f-btn pri","Done",function(){close();}));bd.appendChild(row);}

/* ---------- opening a brought repository in Fabrica: its history from the drive, its issues and pull requests from their records ---------- */
function b64u8(t){var s=atob(t),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u;}
function join(parts,n){var u=new Uint8Array(n),at=0;parts.forEach(function(p){u.set(p,at);at+=p.length;});return u;}
function record(full){var a=A();function J(n){return Promise.resolve(a.hub_hub_json(full,n)).then(function(x){return x&&x.ok?x.data:null;},function(){return null;});}
  return Promise.all([J("issues"),J("comments"),J("pulls"),J("reviews"),J("labels"),J("repo")]).then(function(x){var iss=x[0]||[],com=x[1]||[],pul=x[2]||[],rev=x[3]||{},lab=x[4]||[],repo=x[5]||{};
    var byN={},prs={};com.forEach(function(c){var m=/\/issues\/(\d+)$/.exec(c.issue_url||"");if(m)(byN[m[1]]=byN[m[1]]||[]).push({at:Date.parse(c.created_at)||0,by:(c.user&&c.user.login)||"",body:c.body||""});});
    pul.forEach(function(p){prs[p.number]=p;});
    var rec={v:1,next:1,issues:[],pulls:[],labels:lab.map(function(l){return {name:l.name,color:"#"+String(l.color||"8a8296").replace(/^#/,""),desc:l.description||""};}),
      about:{desc:repo.description||"",site:repo.homepage||"",topics:Array.isArray(repo.topics)?repo.topics:[]},defBranch:repo.default_branch||""};
    iss.forEach(function(i){var it={n:i.number,kind:i.pull_request?"pr":"issue",title:i.title||"",body:i.body||"",state:i.state==="closed"?"closed":"open",
        labels:(i.labels||[]).map(function(l){return typeof l==="string"?l:l.name;}),created:Date.parse(i.created_at)||0,updated:Date.parse(i.updated_at)||0,by:(i.user&&i.user.login)||"",comments:(byN[i.number]||[]).slice(),events:[],refs:[]};
      if(i.closed_at)it.closedAt=Date.parse(i.closed_at);
      if(it.kind==="pr"){var p=prs[i.number]||{};it.from=(p.head&&p.head.ref)||"";it.to=(p.base&&p.base.ref)||"";if(p.merged_at)it.merged={at:Date.parse(p.merged_at)};
        (rev[String(i.number)]||[]).forEach(function(r){if(r.body||r.state)it.comments.push({at:Date.parse(r.submitted_at)||it.updated,by:(r.user&&r.user.login)||"",body:(r.state?"Review: "+String(r.state).toLowerCase().replace(/_/g," ")+(r.body?"\n\n":""):"")+(r.body||"")});});
        it.comments.sort(function(a,b){return a.at-b.at;});rec.pulls.push(it);}else rec.issues.push(it);
      rec.next=Math.max(rec.next,(+i.number||0)+1);});
    return rec;});}
var APPKEY={cd:"cd",forge:"forge",ingenium:"ingenium",inkwell:"inkwell"};
function openRepo(full,name,desc,btn){var a=A(),H=X();if(!a||!H||!W.IngRepo)return Promise.resolve(false);if(btn){btn.disabled=true;btn.textContent="Opening…";}S.say="";
  return Promise.resolve(a.hub_git_files(full)).then(function(r){if(!r||!r.ok)throw new Error((r&&r.error)||"That repository is not on the drive now.");
      if(r.bytes>LIMIT)throw new Error(name+"'s history is "+gb(r.bytes)+". Fabrica opens up to 500 MB on this computer for now; the whole of it is on the drive, and any git program opens it there.");
      var sizes={},names=r.files.map(function(f){sizes[f.name]=f.size;return f.name;});
      function get(n){var size=sizes[n]||0,parts=[],off=0;return (function next(){if(off>=size)return Promise.resolve(join(parts,size));
        return Promise.resolve(a.hub_git_read(full,n,off,8388608)).then(function(x){if(!x||!x.ok)throw new Error((x&&x.error)||"a file could not be read");var u=b64u8(x.b64);if(!u.length)throw new Error("a file ended early");parts.push(u);off+=u.length;return next();});})();}
      var k=famKey(name);return IngRepo.fromGitDir(get,names,{name:name,app:APPKEY[k]||null,desc:desc||""});})
    .then(function(res){return record(full).then(function(rec){if(rec&&W.fbHub&&typeof fbHub.importAll==="function"){rec.id=res.id;rec.name=name;
        return Promise.resolve(fbHub.importAll({kind:"ingenium-hub",apps:[rec]})).then(function(){res.attached=rec.issues.length+rec.pulls.length;return res;},function(e){res.note=String(e&&e.message||e);return res;});}return res;});})
    .then(function(res){H.FBS().sel=res.id;H.saveSoon();return Promise.resolve(H.refresh()).then(function(){H.paint();close();
      H.toast(res.note?name+" is open in Fabrica with its whole history, but its issues could not be attached ("+res.note+"). They are kept on the drive.":name+" is open in Fabrica, with its whole history"+(res.attached?", its issues and its pull requests":"")+".");return res;});})
    .catch(function(e){if(btn){btn.disabled=false;btn.textContent="Open in Fabrica";}S.say=String(e&&e.message||e);paint(true);return false;});}

/* ---------- the key beside Bring one in ---------- */
function addKey(){var b=D.getElementById("fbBring");if(!b||D.getElementById("fbHubBring"))return;var k=key("f-btn","Everything from GitHub",function(){open();});k.id="fbHubBring";
  k.title="Bring every repository, with its whole history, issues, pull requests and releases, onto this computer";b.parentNode.insertBefore(k,b.nextSibling);}
function boot(){addKey();var fb=D.getElementById("fb");if(fb&&!fb.__hbObs){fb.__hbObs=true;try{new MutationObserver(function(){if(!D.getElementById("fbHubBring"))addKey();}).observe(fb,{childList:true,subtree:true});}catch(e){}}
  if(!fb)setTimeout(boot,800);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
/* bringing goes on in the background with Fabrica closed; its state is read again when the sheet opens */
W.IngHubBring={open:open,close:close,logo:logo,famKey:famKey,record:record,openRepo:openRepo,state:function(){return {step:stepNow(),open:S.open,st:S.st,places:S.places,brought:S.brought};}};
try{window.__ingParts["p276"]="running";}catch(_){}
})();
</script>
