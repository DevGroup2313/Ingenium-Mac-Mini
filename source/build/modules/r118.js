<style id="r118-css">
/* ============ R118 · TABULA AND ABACUS, WHOLE ============
   Her word (17 October): "I want you to add the full version of Tabula and Abacus apps to Ingenium when my previous
   requests are all completed." The full versions are her own single-page apps, the very files Carpe Diem carries
   (source/build/apps/tabula.html and abacus.html, taken from carpe_diem.html on 17 October 2026). They ride inside the
   page as base64 text and open, whole, in a frame on their pages. Ingenium is their host the way Carpe Diem is:
   it saves the files they make, follows their theme, hands them a document or a table, and answers their requests
   to open one another. The small tablet and grid that stood here before hand their contents over once. */
.ing-app-card{padding:10px 10px 8px!important}
.ing-app-card .hero{display:none}
.ing-app-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 2px 8px}
.ing-app-bar b{font:600 14px/1.2 var(--serif,Georgia,serif);color:var(--ink-1)}
.ing-app-bar .small{flex:1 1 220px}
.ing-app-frame{display:block;width:100%;border:.5px solid var(--hairline);border-radius:12px;background:#fff;height:calc(100vh - 170px);min-height:520px;box-shadow:var(--pop)}
body[data-theme="night"] .ing-app-frame{background:#141210}
@media (max-width:760px){.ing-app-frame{height:calc(100vh - 128px);min-height:440px;border-radius:10px}.ing-app-card{padding:6px 4px 4px!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p49"]="started";}catch(_){}
/* R118 · Tabula and Abacus, whole: see the note at the top of its styles */
(function r118Apps(){
"use strict";
function $(id){return document.getElementById(id);}
var DARK=/*R118_DARK*/null;
/* Carpe Diem's own preparation of the two apps (from __cdPrepSrc, taken by apps/extract_from_carpe_diem.py) */
/*R118_CDPREP*/
var cdPrep=(typeof ingCdPrep==="function")?ingCdPrep:function(w,h){return h;};
var NAMES={tabula:"Tabula",abacus:"Abacus"},frames={},pendingCsv=null,pendingLite=null;
function decode(id){var n=$(id);if(!n)return null;try{var b=atob(n.textContent.trim()),u8=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u8[i]=b.charCodeAt(i);return new TextDecoder().decode(u8);}catch(e){return null;}}
function night(){return document.body.getAttribute("data-theme")==="night";}
/* the app's page, prepared for this host: no Close key (the page is its window), English, Carpe Diem's own night
   dress for it, a theme bridge, and for Abacus the same hand-to-host saving Tabula already has */
function prep(which){var html=decode("ing-app-"+which);if(!html)return null;var dark=(DARK&&DARK[which])||"";try{html=cdPrep(which,html);}catch(e){}
  var head='<script>window.__CD_NOCLOSE=1;window.__APP_LANG__="en";window.__ING_HOST=1;<\/script>';
  var bridge='<style id="ing-dark">'+dark+'</style><script>(function(){var W='+JSON.stringify(which)+';function ap(d){document.documentElement.classList.toggle("cd-dark",!!d);}'
    +'function post(){try{parent.postMessage({kind:"cd-theme-state",which:W,dark:document.documentElement.classList.contains("cd-dark")},"*");}catch(e){}}'
    +'function init(){ap('+(night()?"true":"false")+');post();}'
    +'window.addEventListener("message",function(ev){var m=ev&&ev.data;if(!m)return;if(m.kind==="cd-theme-apply"){ap(m.dark);post();}});'
    +'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();})();<\/script>';
  /* Abacus's script is one closure: the host reaches its CSV import, its book and its saving through hooks written
     into the script itself (function declarations are hoisted, so the hooks may stand before the functions) */
  if(which==="abacus"){
    html=html.replace("function importCSV(text){","window.__ingImportCSV=function(t){importCSV(t);};window.__ingBook=function(){return {data:data,COLS:COLS,ROWS:ROWS,title:(document.getElementById(\"docTitle\")||{}).value||\"\"};};window.__ingSaveFile=function(n,m,c){saveFile(n,m,c);};function importCSV(text){");
    html=html.replace("function saveFile(name,mime,content){","function saveFile(name,mime,content){try{if(window.parent&&window.parent!==window){var __p=(content instanceof Uint8Array)?content.buffer.slice(content.byteOffset,content.byteOffset+content.byteLength):(content instanceof ArrayBuffer?content:new TextEncoder().encode(String(content)).buffer);window.parent.postMessage({kind:\"carpe-save\",name:name,mime:mime,bytes:__p},\"*\");return;}}catch(e){}");}
  html=html.replace("<head>","<head>"+head);var bi=html.lastIndexOf("</body>");html=bi>=0?html.slice(0,bi)+bridge+html.slice(bi):html+bridge;return html;}
function hashOf(s){s=String(s||"");var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return s.length+":"+h;}
/* the small tablet's page goes to the whole Tabula once; Lector's documents go the same way, each time */
function handTabula(){try{var d=state.tabulaDoc;if(!d||!d.body||!String(d.body).trim())return false;var h=hashOf(d.body);if(d.handed===h)return false;
    localStorage.setItem("tabula_incoming",JSON.stringify({title:d.title||"",html:String(d.body)}));d.handed=h;saveState();return true;}catch(e){return false;}}
function abacusLiteCsv(){try{var a=state.abacus;if(!a||!a.cells||!Object.keys(a.cells).length||a.handed)return null;if(localStorage.getItem("abacus_auto_v1_en"))return null;var csv=typeof abacusCsv==="function"?abacusCsv():null;return csv&&/[^,\r\n]/.test(csv)?csv:null;}catch(e){return null;}}
/* the small grid's cells are read before the whole app starts (it autosaves its own book within moments of starting) */
function handAbacus(ifr){try{var w=ifr.contentWindow;if(!w||typeof w.__ingImportCSV!=="function")return false;var csv=pendingCsv,fromLite=false;
    if(csv==null&&pendingLite!=null){csv=pendingLite;fromLite=true;}pendingLite=null;if(csv==null)return false;pendingCsv=null;
    w.__ingImportCSV(csv);try{var t=w.document.getElementById("docTitle");if(t&&(!t.value||/^(Untitled|Workbook|Sans titre)$/i.test(t.value)))t.value=fromLite?"From the small grid":"From Ingenium";}catch(e){}
    if(fromLite){state.abacus.handed=true;saveState();}return true;}catch(e){return false;}}
function themeTo(ifr){try{ifr.contentWindow.postMessage({kind:"cd-theme-apply",dark:night(),user:true},"*");}catch(e){}}
function mount(which,host){host.innerHTML="";var card=host.closest(".card");if(card)card.classList.add("ing-app-card");
  var html=prep(which);
  var bar=el("div","ing-app-bar");bar.appendChild(el("b",null,NAMES[which]));
  bar.appendChild(el("span","small muted",which==="tabula"?"Your writing tablet, whole: the same Tabula as in Carpe Diem, with its documents, footnotes, letterheads, signatures and exports. Everything stays on this device.":"The reckoning grid, whole: the same Abacus as in Carpe Diem, with its workbooks, formulas, formats and CSV in and out. Everything stays on this device."));
  var win=el("button","btn xs ghost","Open in its own window");win.type="button";win.title="The same app, in a window of its own beside Ingenium";
  win.onclick=function(){try{var w=window.open("","_blank");if(!w){ingToast("The browser did not allow a new window.");return;}w.document.open();w.document.write(prep(which));w.document.close();}catch(e){ingToast("A new window could not be opened here.");}};bar.appendChild(win);
  var rl=el("button","btn xs ghost","Reload");rl.type="button";rl.title="Start the app afresh; its saved work stays";rl.onclick=function(){mount(which,host);};bar.appendChild(rl);
  host.appendChild(bar);
  if(!html){host.appendChild(el("div","small muted","The whole "+NAMES[which]+" is not inside this copy of the page."));return;}
  if(which==="tabula")handTabula();if(which==="abacus")pendingLite=pendingCsv==null?abacusLiteCsv():null;
  var ifr=document.createElement("iframe");ifr.className="ing-app-frame";ifr.id="ingApp-"+which;ifr.setAttribute("title",NAMES[which]);ifr.setAttribute("loading","eager");
  ifr.addEventListener("load",function(){themeTo(ifr);if(which==="abacus")setTimeout(function(){handAbacus(ifr);},60);});
  ifr.srcdoc=html;host.appendChild(ifr);frames[which]=ifr;setTimeout(function(){fit(ifr);},0);}
/* the frame reaches from where it starts to the foot of the window, so the apps' own status lines are in view */
function fit(ifr){try{if(!ifr||!ifr.isConnected||!ifr.offsetParent)return;var top=ifr.getBoundingClientRect().top+(window.scrollY||window.pageYOffset||0);
  var min=window.innerWidth<=760?440:520;ifr.style.height=Math.max(min,Math.round(window.innerHeight-top-12))+"px";}catch(e){}}
window.addEventListener("resize",function(){for(var k in frames)fit(frames[k]);});
(function onGo(){if(typeof go!=="function")return;var o=go;go=function(page){var r=o.apply(this,arguments);try{if(frames[page])setTimeout(function(){fit(frames[page]);},30);}catch(e){}return r;};window.go=go;})();
buildTabula=function(host){mount("tabula",host);};buildAbacus=function(host){mount("abacus",host);};
window.buildTabula=buildTabula;window.buildAbacus=buildAbacus;
/* a table sent to Abacus from elsewhere (the sheets in a reply) goes into the whole app */
(function csvIn(){if(typeof abacusImportCsv!=="function")return;var o=abacusImportCsv;abacusImportCsv=function(text){pendingCsv=String(text==null?"":text);try{return o.apply(this,arguments);}catch(e){}};window.abacusImportCsv=abacusImportCsv;})();
/* the host's duties: the files the apps make, their theme, and their requests to open one another */
window.addEventListener("message",function(ev){var d=ev&&ev.data;if(!d||typeof d.kind!=="string")return;
  var mine=false;for(var k in frames){if(frames[k]&&frames[k].contentWindow===ev.source)mine=true;}if(!mine)return;
  if(d.kind==="carpe-save"&&d.name){try{var u8=d.bytes instanceof Uint8Array?d.bytes:new Uint8Array(d.bytes||[]);saveFileNative(String(d.name),String(d.mime||"application/octet-stream"),u8);}catch(e){ingToast("The file could not be saved: "+(e&&e.message||e));}return;}
  if(d.kind==="carpe-print"){try{ev.source.postMessage({kind:"carpe-print-reply",ok:false},"*");}catch(e){}return;}
  if(d.kind==="carpe-open"){if(d.which==="tabula"||d.which==="abacus")go(d.which);else ingToast((d.which==="slides"?"Imago (slides)":"That app")+" is part of Carpe Diem, not of Ingenium.");return;}
  if(d.kind==="carpe-close"){go("home");return;}
  if(d.kind==="carpe-new-window"){var which=d.which==="abacus"?"abacus":"tabula";try{var w=window.open("","_blank");if(w){w.document.open();w.document.write(prep(which));w.document.close();}}catch(e){}return;}});
(function theme(){if(typeof applyTheme!=="function")return;var o=applyTheme;applyTheme=function(){var r=o.apply(this,arguments);try{for(var k in frames)if(frames[k])themeTo(frames[k]);}catch(e){}return r;};window.applyTheme=applyTheme;})();
/* the pages' words, and the tour's */
(function words(){var lt=document.querySelector("#page-tabula .lede"),la=document.querySelector("#page-abacus .lede");
  if(lt)lt.textContent="Your writing tablet, whole: the same Tabula as in Carpe Diem, with its documents, footnotes, letterheads, signatures and exports, kept on this device.";
  if(la)la.textContent="The reckoning grid, whole: the same Abacus as in Carpe Diem, with its workbooks, formulas, formats and CSV in and out, kept on this device.";
  try{ING_TOUR.forEach(function(s){if(s.sub==="Tabula and Abacus"){s.b="Tabula is the writing tablet, whole: the same app as in Carpe Diem, with its documents, footnotes, letterheads, signatures and exports. Abacus, below it in the list, is the reckoning grid, whole: workbooks, formulas, formats and CSV in and out. Both keep your work on this device, and either opens in a window of its own.";}});}catch(e){}})();
window.IngApps2={prep:prep,frames:frames,hand:{tabula:handTabula,abacus:handAbacus},decode:decode};
})();
;try{window.__ingParts["p49"]="running";}catch(_){}
</script>
