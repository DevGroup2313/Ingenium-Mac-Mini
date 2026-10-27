"""6.8.1 (28 October 2026): Abacus's ribbon works on the cells selected, as Excel's does.

The owner's words: "The text colours and other functions on Tabula's ribbons do not work well. I have to keep trying multiple
times for it to stick and work. I have issues with formatting a lot of times, the sections on Tabula's ribbons as well as the
other apps don't work well a lot of times. [...] I want Tabula, Abacus, and Imago to have a full audit for bugs and
functionality and then I want them all fixed."

Pressed as a person presses it (rig/t_681_abacus.js, rig/t_681_abacus_wk.py), Abacus did these to the active cell only when a
range was selected: Wrap, the number format list, the Borders and the Cell styles (and their previews).
And "Add a decimal place" always gave two places and "Remove a decimal place" none, dropping a currency or a percentage. Now:
  - each of those reaches every cell selected; the borders as Excel draws them: All on every cell, Top, Bottom, Left and
    Right on the selection's own edge, Thick round its outline, None from every cell; a border added keeps the others;
  - a decimal place is added to or taken from what each cell shows, its currency, percentage or separators kept;
  - what is done is kept at once. The workbook (its sheets) was written every four seconds, and opening Abacus again
    takes the workbook before the cell-by-cell autosave, so whatever was done in the last four seconds before Abacus
    was closed came back undone. It is now written with every change, and when the page is hidden or closed;
  - a drag across cells always selects them: it left their text selected, and the next drag that began on that text was
    taken by the browser as moving the text, so the range came out as one cell.

patch(text) -> text."""


def _one(text, old, new, what):
    n = text.count(old)
    if n != 1:
        raise SystemExit("abacus_ribbon_patch: %s: expected one of %r, found %d" % (what, old[:70], n))
    return text.replace(old, new)


# the previews and the applying of the Cell styles and Borders galleries: on every cell selected, each told where it stands
PREVIEW_OLD = """ /* ---- live preview on the selected cell, restored on leave ---- */
  function curRef(){try{return window.__abx?window.__abx.ref():null;}catch(e){return null;}}
  function snapPreview(){var r=curRef();if(!r)return;if(savedRef===r&&savedStyle)return;
    var S=window.__abx.sty();savedRef=r;savedStyle=JSON.parse(JSON.stringify(S[r]||{}));}
  function restorePreview(){try{if(savedRef!==null&&savedStyle!==null){window.__abx.sty()[savedRef]=savedStyle;window.__abx.refresh();}}catch(e){}savedRef=null;savedStyle=null;}
  function previewApply(fn){var r=curRef();if(!r)return;snapPreview();
    var S=window.__abx.sty();var st=S[r]||(S[r]={});fn(st);try{window.__abx.refresh();}catch(e){}}
  function commitApply(fn){var r=curRef();if(!r)return;var S=window.__abx.sty();
    if(savedRef===r&&savedStyle!==null){S[r]=savedStyle;} savedRef=null;savedStyle=null;
    var st=S[r]||(S[r]={});fn(st);try{window.__abx.refresh();}catch(e){}closePop();}
"""
PREVIEW_NEW = """ /* ---- live preview on the cells selected, restored on leave (6.8.1: every cell of a range) ---- */
  function curRef(){try{return window.__abx?window.__abx.ref():null;}catch(e){return null;}}
  function curRefs(){var rr=[];try{rr=window.__abGetSelRefs?window.__abGetSelRefs():[];}catch(e){}if(rr&&rr.length)return rr;var r=curRef();return r?[r]:[];}
  function edges(refs){var P=refs.map(function(r){var m=/^([A-Z]+)(\\d+)$/.exec(r),c=0;for(var i=0;i<m[1].length;i++)c=c*26+m[1].charCodeAt(i)-64;return {r:+m[2],c:c};});
    var r0=Math.min.apply(null,P.map(function(p){return p.r;})),r1=Math.max.apply(null,P.map(function(p){return p.r;})),c0=Math.min.apply(null,P.map(function(p){return p.c;})),c1=Math.max.apply(null,P.map(function(p){return p.c;}));
    return function(i){var p=P[i];return {top:p.r===r0,bottom:p.r===r1,left:p.c===c0,right:p.c===c1};};}
  var saved=null;
  function snapPreview(){if(saved)return;var S=window.__abx.sty();saved={};curRefs().forEach(function(r){saved[r]=S[r]?JSON.parse(JSON.stringify(S[r])):null;});}
  function putBack(){var S=window.__abx.sty();for(var r in saved){if(saved[r])S[r]=saved[r];else delete S[r];}}
  function restorePreview(){try{if(saved){putBack();window.__abx.refresh();}}catch(e){}saved=null;}
  function applyAll(fn){var refs=curRefs();if(!refs.length)return;var at=edges(refs),S=window.__abx.sty();refs.forEach(function(r,i){var st=S[r]||(S[r]={});fn(st,at(i));});}
  function previewApply(fn){if(!curRefs().length)return;snapPreview();applyAll(fn);try{window.__abx.refresh();}catch(e){}}
  function commitApply(fn){if(saved)putBack();saved=null;applyAll(fn);try{window.__abx.refresh();}catch(e){}closePop();}
"""
BORDER_OLD = """    var setter=function(st){['bt','br','bb','bl'].forEach(function(k){delete st[k];});
      for(var k in spec)if(spec[k])st[k]=spec[k];};"""
BORDER_NEW = """    var name=BORDERS[+t.getAttribute('data-i')][0];
    var setter=function(st,at){at=at||{top:true,bottom:true,left:true,right:true};
      if(name==='None'){['bt','br','bb','bl'].forEach(function(k){delete st[k];});return;}
      if(name==='All'){for(var k in spec)st[k]=spec[k];return;}
      if(spec.bt&&at.top)st.bt=spec.bt;if(spec.bb&&at.bottom)st.bb=spec.bb;if(spec.bl&&at.left)st.bl=spec.bl;if(spec.br&&at.right)st.br=spec.br;};"""
# numbers shown to a chosen number of places, keeping what they are
FMT_OLD = "function fmtVal(v,f){if(v===true)return 'TRUE';if(v===false)return 'FALSE';if(typeof v==='string')return v;if(typeof v!=='number'||!isFinite(v))return String(v);"
FMT_NEW = (FMT_OLD + "var __k=/^(currency|percent|fixed|comma):(\\d+)$/.exec(f||'');if(__k){var __n=+__k[2];if(__k[1]==='currency')return __APPFR?(v.toFixed(__n)+' \\u20ac'):('$'+v.toFixed(__n));"
           "if(__k[1]==='percent')return (v*100).toFixed(__n)+'%';if(__k[1]==='fixed')return v.toFixed(__n);"
           "return v.toLocaleString(__APPFR?'fr-FR':'en-US',{minimumFractionDigits:__n,maximumFractionDigits:__n});}")
# the keys that reached the active cell only, for every cell selected; the decimal places, one at a time
RANGE = r"""<script id="abacus-ribbon-681">(function(){
function ax(){return window.__abx;}
function refs(){var rr=[];try{rr=window.__abGetSelRefs?window.__abGetSelRefs():[];}catch(e){}if(rr&&rr.length)return rr;var r=ax()&&ax().ref?ax().ref():null;return r?[r]:[];}
function shown(r){var td=document.querySelector('#grid td[data-ref="'+r+'"]');return td?td.textContent:'';}
function places(f,r){var k=/^(currency|percent|fixed|comma):(\d+)$/.exec(f||'');if(k)return [k[1],+k[2]];
  if(f==='currency')return ['currency',2];if(f==='percent')return ['percent',1];if(f==='number')return ['fixed',0];if(f==='number2')return ['fixed',2];if(f==='comma')return ['comma',2];
  if(f&&f.indexOf('custom:')===0)return ['custom',((/\.(0+)/.exec(f)||[0,''])[1]).length];if(f==='date'||f==='datelong')return null;
  var t=shown(r).replace(/[^0-9.\-]/g,'');if(!t||isNaN(parseFloat(t)))return null;var i=t.indexOf('.');return ['fixed',i<0?0:t.length-i-1];}
function step(f,r,d){var k=places(f,r);if(!k)return f;var n=Math.max(0,Math.min(10,k[1]+d));
  if(k[0]==='custom'){var p=f.slice(7);if(/\.0+/.test(p))p=n?p.replace(/\.0+/,'.'+new Array(n+1).join('0')):p.replace(/\.0+/,'');else if(n)p=p.replace(/([0#])(?!.*[0#])/,'$1.'+new Array(n+1).join('0'));return 'custom:'+p;}
  return k[0]+':'+n;}
function done(e){e.preventDefault();e.stopImmediatePropagation();ax().refresh();}
window.addEventListener('click',function(e){var t=e.target&&e.target.closest?e.target.closest('button'):null;if(!t||!t.id||!ax())return;var R=refs();if(!R.length)return;var F,S;
  if(t.id==='abDec'||t.id==='abInc'){F=ax().fmt();R.forEach(function(r){var v=step(F[r]||'',r,t.id==='abDec'?1:-1);if(v)F[r]=v;});done(e);}
  else if(t.id==='abWrap'){S=ax().sty();var a=S[R[0]]||{},want=!a.wrap;R.forEach(function(r){(S[r]||(S[r]={})).wrap=want;});done(e);}
},true);
/* dragging across cells selects cells: the browser's own drag of selected text never starts in the grid, and the text
   selection a drag leaves across cells is let go once it reaches another cell */
function inGrid(n){if(n&&n.nodeType===3)n=n.parentElement;return !!(n&&n.closest&&n.closest('#grid'));}
window.addEventListener('dragstart',function(e){if(inGrid(e.target))e.preventDefault();},true);
var downTd=null;
window.addEventListener('mousedown',function(e){var n=e.target;if(n&&n.nodeType===3)n=n.parentElement;downTd=n&&n.closest?n.closest('#grid td[data-ref]'):null;},true);
window.addEventListener('mouseover',function(e){if(!downTd||!(e.buttons&1))return;var n=e.target;if(n&&n.nodeType===3)n=n.parentElement;var td=n&&n.closest?n.closest('#grid td[data-ref]'):null;
  if(td&&td!==downTd){try{var s=getSelection();if(s&&s.rangeCount&&!s.isCollapsed)s.removeAllRanges();}catch(x){}}},true);
window.addEventListener('mouseup',function(){downTd=null;},true);
window.addEventListener('change',function(e){var t=e.target;if(!t||t.id!=='numFmt'||!ax())return;var R=refs();if(!R.length)return;var F=ax().fmt();
  R.forEach(function(r){if(t.value)F[r]=t.value;else delete F[r];});e.stopImmediatePropagation();ax().refresh();},true);
})();</script>
"""


# the workbook written with every change (through the autosave every change goes through), and when the page is put away
KEEP = [("  setInterval(persist,4000);\n",
         "  setInterval(persist,4000);\n  var soon=0;window.__abPersist=persist;window.__abPersistSoon=function(){clearTimeout(soon);soon=setTimeout(persist,300);};\n"
         "  window.addEventListener('pagehide',function(){persist();});document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')persist();});\n", "workbook"),
        ("function autosave(){if(window.__abBooted)window.__abDirty=1;abHistPush();",
         "function autosave(){if(window.__abBooted)window.__abDirty=1;abHistPush();try{if(window.__abPersistSoon)window.__abPersistSoon();}catch(e){}", "autosave"),
        ("function __abFlushNow(){try{", "function __abFlushNow(){try{if(window.__abPersist)window.__abPersist();}catch(e){}try{", "flush")]


def patch(text):
    if 'id="abacus-ribbon-681"' in text:
        return text
    for old, new, what in KEEP:
        text = _one(text, old, new, what)
    text = _one(text, PREVIEW_OLD, PREVIEW_NEW, "previews")
    text = _one(text, "  var openPop=null, savedStyle=null, savedRef=null;\n", "  var openPop=null;\n", "preview state")
    text = _one(text, BORDER_OLD, BORDER_NEW, "borders")
    text = _one(text, FMT_OLD, FMT_NEW, "number formats")
    i = text.rfind("</body>")
    if i < 0:
        raise SystemExit("abacus_ribbon_patch: no </body>")
    return text[:i] + RANGE + text[i:]
