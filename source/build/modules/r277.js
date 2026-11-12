<style id="r277-css">
/* ============ R277 · EVERY APP WEARS ITS OWN LOGO, NEVER A LETTER (Ingenium 6.83, 12 November 2026) ============
   Her words (12 November 2026): "I want the Lakay and Offline Project app folders and any future apps folders to show their logo icon
   and not have some randomised letter stand-in when they clearly have a logo. I thought that this was already resolved. I want that
   made into the standard. I am tired of asking for it."
   So an app's logo is found in one place, for every part that shows one (Folders first: its drawer, its cards and an opened folder):
   - Carpe Diem, The Forge, Ingenium and Inkwell: their seals (r140's IngSeal), by day and by night, as before;
   - The Offline Project: its master logo, the crest of the four (IngSeal "master"), by day and by night;
   - Lakay: its Spiral, its own pictures by day and by night (apps/lakay_mark.json, carried as ING_SEALS.lakay and lakayN);
   - any other app, and every app to come: the logo in its own page, found in Fabrica (an app of the same name), in the app library,
     or in a repository brought from GitHub (r276), and kept once found;
   - while it is looked for, or when an app has no logo anywhere, a quiet raised disc: never a letter. */
.ing-logo-wait{display:inline-block;flex:0 0 auto;width:var(--s,28px);height:var(--s,28px);border-radius:50%;box-sizing:border-box;
  background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.95),rgba(236,229,246,.95) 55%,rgba(214,201,236,.95));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9),inset 0 -2px 3px rgba(60,30,110,.12),0 1px 2px rgba(40,22,68,.22);border:1px solid rgba(106,63,181,.18)}
body[data-theme="night"] .ing-logo-wait{background:radial-gradient(circle at 35% 30%,#3a2f52,#2a2140 60%,#1d1629);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 3px rgba(0,0,0,.4),0 1px 3px rgba(0,0,0,.5);border-color:rgba(205,184,240,.16)}
img.ing-logo{display:inline-block;flex:0 0 auto;object-fit:contain;border-radius:50%}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p277"]="started";}catch(_){}
/* ============ R277 · EVERY APP WEARS ITS OWN LOGO (Ingenium 6.83): see the stylesheet above ============
   window.IngAppLogo {key(name), el(name, size), find(name), src(name), known} */
(function r277(){
"use strict";
if(window.IngAppLogo)return;
var W=window,D=document,FIND={},MAXKEEP=180000;
function norm(n){return String(n||"").trim().toLowerCase().replace(/[-_]+/g," ").replace(/\s+/g," ").replace(/^the /,"");}
function key(name){var n=norm(name);if(n==="carpe diem")return "cd";if(n==="forge")return "forge";if(n==="ingenium")return "ingenium";if(n==="inkwell")return "inkwell";
  if(n==="lakay")return "lakay";if(/^offline (project|pro)$/.test(n))return "master";return null;}
function night(){try{return D.body.getAttribute("data-theme")==="night";}catch(e){return false;}}
function flat(k){try{var s=W.ING_SEALS&&ING_SEALS[k];return s&&s.b64?"data:image/png;base64,"+s.b64:"";}catch(e){return "";}}
function kept(){var s=W.state;if(!s||typeof s!=="object")return {};if(!s.appLogos||typeof s.appLogos!=="object")s.appLogos={};return s.appLogos;}
function lakaySrc(){return flat(night()&&W.ING_SEALS&&ING_SEALS.lakayN?"lakayN":"lakay");}
function src(name){var k=key(name);if(k==="lakay")return lakaySrc();var o=kept()[norm(name)];return o&&o.src||"";}
function img(s,size,which){var im=new Image();im.src=s;im.alt="";im.className="ing-logo";im.draggable=false;im.decoding="async";if(size){im.style.width=im.style.height=Math.round(size)+"px";}
  if(which)im.setAttribute("data-applogo",which);return im;}
function wait(size,name){var d=D.createElement("span");d.className="ing-logo-wait";d.style.setProperty("--s",Math.round(size||28)+"px");d.style.width=d.style.height=Math.round(size||28)+"px";d.setAttribute("data-applogo-wait",norm(name));d.setAttribute("aria-hidden","true");return d;}
/* the element for an app's logo, now: its own picture when it is known, else a quiet disc that becomes its logo once found */
function el(name,size){var k=key(name);
  if(k&&k!=="lakay"&&W.IngSeal&&typeof IngSeal.el==="function"){try{var e=IngSeal.el([k],{size:size,alt:""});if(e){e.style.width=Math.round(size)+"px";return e;}}catch(x){}}
  if(k==="lakay"&&lakaySrc())return img(lakaySrc(),size,"lakay");
  if(k==="master"&&flat("master"))return img(flat("master"),size);
  var s=src(name);if(s)return img(s,size);
  var d=wait(size,name);find(name).then(function(found){if(!found)return;[].forEach.call(D.querySelectorAll('[data-applogo-wait="'+norm(name).replace(/"/g,"")+'"]'),function(w){
    var sz=parseFloat(w.style.getPropertyValue("--s"))||size,im=img(found,sz);im.className=w.className.replace("ing-logo-wait","ing-logo");w.replaceWith(im);});});return d;}
/* where an app keeps its logo: its page in Fabrica, its page in the app library, the repository brought from GitHub */
function iconOf(html){try{return W.IngApk&&typeof IngApk.iconSource==="function"?IngApk.iconSource(html):null;}catch(e){return null;}}
function fromFabrica(name){if(!W.IngRepo||typeof IngRepo.list!=="function")return Promise.resolve(null);
  return Promise.resolve(IngRepo.list()).then(function(rs){var r=(rs||[]).filter(function(x){return norm(x.name)===norm(name);})[0];if(!r)return null;
    return Promise.resolve(IngRepo.files(r.id)).then(function(fs){var paths=(fs||[]).map(function(f){return typeof f==="string"?f:f.path;}).filter(Boolean);
      var html=paths.filter(function(p){return /(^|\/)index\.html?$/i.test(p);})[0]||paths.filter(function(p){return /\.html?$/i.test(p);})[0];
      var pic=paths.filter(function(p){return /(^|\/)((app[-_ ]?)?icon|logo|apple-touch-icon)[^/]*\.png$/i.test(p);})[0];
      return (html?Promise.resolve(IngRepo.readText(r.id,html)).then(iconOf,function(){return null;}):Promise.resolve(null)).then(function(s){if(s||!pic)return s;
        return Promise.resolve(IngRepo.read(r.id,pic)).then(function(b){if(!b||!b.length)return null;var t="",u=b instanceof Uint8Array?b:new Uint8Array(b);for(var i=0;i<u.length;i+=32768)t+=String.fromCharCode.apply(null,u.subarray(i,i+32768));return "data:image/png;base64,"+btoa(t);},function(){return null;});});});},function(){return null;});}
function fromLibrary(name){try{if(typeof W.libState!=="function"||typeof W.libText!=="function")return Promise.resolve(null);var apps=libState().apps||{},k=null;
    Object.keys(apps).forEach(function(x){var m=apps[x]||{};if(!k&&(norm(m.title)===norm(name)||norm(m.name)===norm(name)||norm(x)===norm(name)))k=x;});
    if(!k)return Promise.resolve(null);return Promise.resolve(libText(k)).then(function(t){return t?iconOf(t):null;},function(){return null;});}catch(e){return Promise.resolve(null);}}
function fromGitHub(name){try{var a=typeof W.shellApi==="function"?W.shellApi():null;if(!a||typeof a.hub_brought!=="function")return Promise.resolve(null);
    return Promise.resolve(a.hub_brought()).then(function(b){var r=((b&&b.repos)||[]).filter(function(x){return norm(x.name)===norm(name)&&x.icon;})[0];return r?r.icon:null;},function(){return null;});}catch(e){return Promise.resolve(null);}}
function find(name){var n=norm(name);if(!n)return Promise.resolve(null);var known=src(name);if(known)return Promise.resolve(known);
  if(FIND[n])return FIND[n];
  FIND[n]=fromFabrica(name).then(function(s){return s||fromLibrary(name);}).then(function(s){return s||fromGitHub(name);}).then(function(s){
    if(s&&/^data:image\/(png|jpeg|webp);base64,/.test(s)){if(s.length<=MAXKEEP){kept()[n]={src:s,at:Date.now()};try{W.saveState&&saveState();}catch(e){}}return s;}
    delete FIND[n];return null;});
  return FIND[n];}
/* by night Lakay wears its night picture, and back by day */
function retheme(){[].forEach.call(D.querySelectorAll('img[data-applogo="lakay"]'),function(im){var s=lakaySrc();if(s&&im.src!==s)im.src=s;});}
function boot(){try{new MutationObserver(retheme).observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}}
if(D.body)boot();else D.addEventListener("DOMContentLoaded",boot);
W.IngAppLogo={key:key,el:el,find:find,src:src,norm:norm};
try{window.__ingParts["p277"]="running";}catch(_){}
})();
</script>
