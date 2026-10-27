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
  - its dialogs (a rule for highlighting, a PivotTable, a validation rule) close with Escape and apply with Enter, as
    Excel's do; they could be closed only with their own keys;
  - a drag across cells always selects them: it left their text selected, and the next drag that began on that text was
    taken by the browser as moving the text, so the range came out as one cell.
And its grid now answers the keys Excel's does (rig/t_681_abacus_keys.js, rig/t_681_abacus_keys_wk.py). What was typed in a
cell chosen was added to what it held ("Item" and 1 made "Item1"); the arrows moved the caret, never from cell to cell; Ctrl+X,
Ctrl+C and Ctrl+V were kept from the browser, so nothing went to the clipboard or came from it, and Cut, Copy and Paste took
one cell only. Now:
  - what is typed in a cell chosen takes its place, even after a second press on it; a double press, or F2, edits it in
    place (the caret where it was pressed, or at the end); Escape gives back what was there;
  - the arrows go from cell to cell (and move the caret while editing in place); with Shift they widen the selection;
    Shift+Enter goes up a row;
  - Cut, Copy and Paste, from the keys and from the ribbon, take every cell selected, with its look and number format; a
    formula's references follow it, as Excel's do ($ keeps one fixed); one cell pasted on a range fills it; the cells go to
    the clipboard as columns, as shown, and columns copied in another program arrive in columns.

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
/* Abacus's own dialogs (a rule for highlighting, a PivotTable, a validation rule) answer the keys Excel's do: Escape cancels,
   Enter applies */
window.addEventListener('keydown',function(e){var d=document.querySelectorAll('.ab-dlg');if(!d.length)return;var top=d[d.length-1];
  if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();top.remove();}
  else if(e.key==='Enter'&&!e.shiftKey&&!(e.target&&e.target.tagName==='TEXTAREA')){var ok=[].slice.call(top.querySelectorAll('button')).reverse().filter(function(b){return /^(Apply|OK|Insert|Make|Add|Save|Done|Create)$/i.test(b.textContent.trim());})[0];
    if(ok){e.preventDefault();e.stopImmediatePropagation();ok.click();}}},true);
window.addEventListener('change',function(e){var t=e.target;if(!t||t.id!=='numFmt'||!ax())return;var R=refs();if(!R.length)return;var F=ax().fmt();
  R.forEach(function(r){if(t.value)F[r]=t.value;else delete F[r];});e.stopImmediatePropagation();ax().refresh();},true);
})();</script>
"""

# the keys of Excel's grid: a cell chosen is replaced by what is typed, edited in place after a second press, a double press
# or F2; the arrows go from cell to cell, with Shift they widen the selection; Cut, Copy and Paste take every cell selected,
# from the ribbon or the keys, and pass columns to and from other programs, a formula's references following it
SHOW_OLD = "window.__abx={ref:function(){return sel;},"
SHOW_NEW = "window.__abx={show:function(r){return display(r);},ref:function(){return sel;},"
SETSEL_OLD = "window.__abSelBounds=function(){return (A&&B&&A!==B)?{a:A,b:B}:null;};"
SETSEL_NEW = SETSEL_OLD + "window.__abSetSel=function(a,b){A=a;B=b;paint();};"
# Ctrl+X, Ctrl+C and Ctrl+V were taken from the browser, so nothing reached the clipboard or came from it: one cell was kept
# inside Abacus. They are given back, and the clipboard's own events (below) do the rest
CLIPKEYS_OLD = """document.addEventListener('keydown',function(e){
    if(!(e.ctrlKey||e.metaKey))return;var k=(e.key||'').toLowerCase();
    var tag=(e.target&&e.target.tagName)||'';
    if(tag==='INPUT'||tag==='TEXTAREA')return;
    if(k==='x'){e.preventDefault();grab(true);}
    else if(k==='c'){e.preventDefault();grab(false);}
    else if(k==='v'){e.preventDefault();paste.click();}
  });"""
CLIPKEYS_NEW = "/* Ctrl+X, Ctrl+C and Ctrl+V: the clipboard's own events (apps/abacus_ribbon_patch.py) */"
KEYS = r"""<script id="abacus-keys-681">(function(){
function ax(){return window.__abx;}
var FR=window.__APP_LANG__==='fr';
function cn(n){var s='';while(n>0){var m=(n-1)%26;s=String.fromCharCode(65+m)+s;n=Math.floor((n-1)/26);}return s;}
function nc(s){var n=0;s=s.toUpperCase();for(var i=0;i<s.length;i++)n=n*26+(s.charCodeAt(i)-64);return n;}
function rc(ref){var m=/^([A-Z]+)(\d+)$/.exec(ref||'');return m?{c:nc(m[1]),r:+m[2]}:null;}
function td(r){return document.querySelector('#grid td[data-ref="'+r+'"]');}
function cellOf(n){if(n&&n.nodeType===3)n=n.parentElement;return n&&n.closest?n.closest('#grid td[data-ref]'):null;}
function refs(){var rr=[];try{rr=window.__abGetSelRefs?window.__abGetSelRefs():[];}catch(e){}if(rr&&rr.length)return rr;var r=ax()&&ax().ref?ax().ref():null;return r?[r]:[];}
function sel1(r){try{if(window.__abSetSel)window.__abSetSel(r,r);}catch(e){}}
function say(t){var s=document.getElementById('status');if(s)s.textContent=t;}
function fbar(v){var f=document.getElementById('finput');if(f)f.value=v;}
function selectAll(el){try{var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);}catch(e){}}
function caretEnd(el){try{var r=document.createRange();r.selectNodeContents(el);r.collapse(false);var s=getSelection();s.removeAllRanges();s.addRange(r);}catch(e){}}
/* ready: the cell is chosen, and what is typed takes its place; enter: typing has begun, the arrows end it and move on;
   edit (a double press, or F2): the caret is in the cell's own text, and the arrows move it there */
var mode='ready',orig='',mouseAt=0,focusing=false;
document.addEventListener('mousedown',function(e){focusing=false;var t=cellOf(e.target);if(!t)return;mouseAt=Date.now();
  /* a press on the cell already chosen leaves it chosen, its text selected (Safari would put the caret there afterwards) */
  if(t===document.activeElement&&mode==='ready'&&e.button===0&&!e.shiftKey&&e.detail<2)e.preventDefault();},true);
document.addEventListener('focusin',function(e){var t=cellOf(e.target);if(!t||t!==e.target)return;mode='ready';var D=ax()?ax().data():{};orig=String(D[t.getAttribute('data-ref')]==null?'':D[t.getAttribute('data-ref')]);
  if(Date.now()-mouseAt<500){focusing=true;return;}sel1(t.getAttribute('data-ref'));setTimeout(function(){if(document.activeElement===t&&mode==='ready')selectAll(t);},0);},true);
document.addEventListener('click',function(e){var t=cellOf(e.target);if(!t||document.activeElement!==t)return;
  if(focusing||mode==='ready'){focusing=false;if(e.detail<2)selectAll(t);return;}if(mode==='enter')mode='edit';},true);
document.addEventListener('dblclick',function(e){var t=cellOf(e.target);if(!t)return;mode='edit';
  try{var r=document.caretRangeFromPoint?document.caretRangeFromPoint(e.clientX,e.clientY):null;if(!r&&document.caretPositionFromPoint){var cp=document.caretPositionFromPoint(e.clientX,e.clientY);if(cp){r=document.createRange();r.setStart(cp.offsetNode,cp.offset);}}
    if(r&&t.contains(r.startContainer)){r.collapse(true);var s=getSelection();s.removeAllRanges();s.addRange(r);}else caretEnd(t);}catch(x){caretEnd(t);}},true);
document.addEventListener('input',function(e){if(cellOf(e.target)&&mode==='ready')mode='enter';},true);
function go(from,dr,dc){var p=rc(from);if(!p)return;var n=td(cn(Math.max(1,p.c+dc))+Math.max(1,p.r+dr));var t=td(from);if(!n||n===t)return;if(t)t.blur();n.focus();sel1(n.getAttribute('data-ref'));}
function widen(r,dr,dc){var b=window.__abSelBounds&&window.__abSelBounds(),a=b?b.a:r,e=rc(b?b.b:r);var n=cn(Math.max(1,e.c+dc))+Math.max(1,e.r+dr);if(td(n)&&window.__abSetSel)window.__abSetSel(a,n);}
window.addEventListener('keydown',function(e){var t=cellOf(document.activeElement);if(!t||e.isComposing||document.querySelector('.ab-dlg'))return;var r=t.getAttribute('data-ref'),k=e.key;
  if(k==='F2'){e.preventDefault();mode='edit';caretEnd(t);return;}
  if(k==='Escape'){if(mode!=='ready'||t.textContent!==orig){e.preventDefault();t.textContent=orig;fbar(orig);mode='ready';selectAll(t);}return;}
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  var mv={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]}[k];
  if(mv&&mode!=='edit'){e.preventDefault();e.stopImmediatePropagation();if(e.shiftKey)widen(r,mv[0],mv[1]);else go(r,mv[0],mv[1]);return;}
  if(k==='Enter'&&e.shiftKey){e.preventDefault();e.stopImmediatePropagation();go(r,-1,0);}
},true);
/* Cut, Copy and Paste */
var clip=null;
function bounds(R){var b={r0:1e9,c0:1e9,r1:0,c1:0};R.forEach(function(x){var p=rc(x);if(!p)return;b.r0=Math.min(b.r0,p.r);b.c0=Math.min(b.c0,p.c);b.r1=Math.max(b.r1,p.r);b.c1=Math.max(b.c1,p.c);});return b;}
function q(s){s=String(s==null?'':s);return /[\t\n"]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;}
function take(R,cut){var X=ax(),D=X.data(),S=X.sty(),F=X.fmt(),b=bounds(R),rows=[],cells=[];
  for(var r=b.r0;r<=b.r1;r++){var tr=[],cr=[];for(var c=b.c0;c<=b.c1;c++){var ref=cn(c)+r;tr.push(q(X.show?X.show(ref):(D[ref]||'')));
    cr.push({v:D[ref],s:S[ref]?JSON.parse(JSON.stringify(S[ref])):null,f:F[ref]||''});}rows.push(tr.join('\t'));cells.push(cr);}
  return {r0:b.r0,c0:b.c0,cells:cells,tsv:rows.join('\n'),cut:!!cut,name:cn(b.c0)+b.r0+((b.r1>b.r0||b.c1>b.c0)?':'+cn(b.c1)+b.r1:'')};}
function shift(v,dr,dc){if(typeof v!=='string'||v.charAt(0)!=='='||(!dr&&!dc))return v;
  return v.split(/("(?:[^"]|"")*")/).map(function(seg,i){if(i%2)return seg;
    return seg.replace(/(^|[^A-Za-z0-9_.$"])(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![A-Za-z0-9_(])/g,function(m,pre,fc,col,fr,row){
      var c=fc?nc(col):nc(col)+dc,r=fr?+row:+row+dr;if(c<1||r<1)return pre+'#REF!';return pre+fc+cn(c)+fr+r;});}).join('');}
function parse(t){t=String(t).replace(/\r\n?/g,'\n').replace(/\n$/,'');var rows=[],row=[],cur='',i=0,inq=false;
  for(;i<t.length;i++){var ch=t.charAt(i);if(inq){if(ch==='"'&&t.charAt(i+1)==='"'){cur+='"';i++;}else if(ch==='"')inq=false;else cur+=ch;}
    else if(ch==='"'&&cur==='')inq=true;else if(ch==='\t'){row.push(cur);cur='';}else if(ch==='\n'){row.push(cur);rows.push(row);row=[];cur='';}else cur+=ch;}
  row.push(cur);rows.push(row);return rows;}
function after(){var X=ax();X.refresh();var t=cellOf(document.activeElement);if(t){var D=X.data(),r=t.getAttribute('data-ref'),v=D[r]==null?'':String(D[r]);t.textContent=v;orig=v;fbar(v);mode='ready';selectAll(t);}}
function put(c,R){var X=ax(),D=X.data(),S=X.sty(),F=X.fmt(),b=bounds(R),n=0;
  function one(cell,ref,dr,dc){if(!td(ref))return;var v=c.cut?cell.v:shift(cell.v,dr,dc);if(v==null||v==='')delete D[ref];else D[ref]=v;
    if(cell.s)S[ref]=JSON.parse(JSON.stringify(cell.s));else delete S[ref];if(cell.f)F[ref]=cell.f;else delete F[ref];n++;}
  if(c.cells.length===1&&c.cells[0].length===1&&R.length>1)R.forEach(function(ref){var p=rc(ref);one(c.cells[0][0],ref,p.r-c.r0,p.c-c.c0);});
  else c.cells.forEach(function(row,i){row.forEach(function(cell,j){one(cell,cn(b.c0+j)+(b.r0+i),b.r0-c.r0,b.c0-c.c0);});});
  if(c.cut)clip=null;after();say((FR?'Collé dans ':'Pasted into ')+n+(FR?' cellule':' cell')+(n===1?'':'s'));}
function putText(t,R){var rows=parse(t),X=ax(),D=X.data(),b=bounds(R),n=0;
  if(rows.length===1&&rows[0].length===1){R.forEach(function(ref){if(rows[0][0]==='')delete D[ref];else D[ref]=rows[0][0];n++;});}
  else rows.forEach(function(row,i){row.forEach(function(v,j){var ref=cn(b.c0+j)+(b.r0+i);if(!td(ref))return;if(v==='')delete D[ref];else D[ref]=v;n++;});});
  after();say((FR?'Collé dans ':'Pasted into ')+n+(FR?' cellule':' cell')+(n===1?'':'s'));}
function same(a,b){var f=function(s){return String(s||'').replace(/\r\n?/g,'\n').replace(/\n$/,'');};return f(a)===f(b);}
function give(cut,R){var c=take(R,cut);clip=c;if(cut){var X=ax(),D=X.data(),S=X.sty(),F=X.fmt();R.forEach(function(r){delete D[r];delete S[r];delete F[r];});after();}
  say((cut?(FR?'Coupé ':'Cut '):(FR?'Copié ':'Copied '))+c.name);return c;}
function busy(){var a=document.activeElement;return a&&!cellOf(a)&&(a.tagName==='INPUT'||a.tagName==='TEXTAREA'||a.tagName==='SELECT'||a.isContentEditable);}
function mine(){if(busy()||!ax())return false;var t=cellOf(document.activeElement);if(t)return refs().length>1||mode==='ready';return !!(window.__abSelBounds&&window.__abSelBounds());}
document.addEventListener('copy',function(e){if(!mine()||!e.clipboardData)return;var c=give(false,refs());e.clipboardData.setData('text/plain',c.tsv);e.preventDefault();},true);
document.addEventListener('cut',function(e){if(!mine()||!e.clipboardData)return;var c=give(true,refs());e.clipboardData.setData('text/plain',c.tsv);e.preventDefault();},true);
document.addEventListener('paste',function(e){if(busy()||!ax()||!e.clipboardData)return;var t=e.clipboardData.getData('text/plain')||'',many=/[\t\n]/.test(String(t).replace(/\r?\n$/,''));
  var on=cellOf(document.activeElement);if(on?(!many&&mode!=='ready'&&refs().length<2):!(window.__abSelBounds&&window.__abSelBounds()))return;
  e.preventDefault();if(clip&&same(clip.tsv,t))put(clip,refs());else putText(t,refs());},true);
window.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('#abCut,#abCopy,#abPaste'):null;if(!b||!ax())return;
  e.preventDefault();e.stopImmediatePropagation();var R=refs();if(!R.length)return;
  if(b.id!=='abPaste'){var c=give(b.id==='abCut',R);try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(c.tsv).catch(function(){});}catch(x){}return;}
  if(clip){put(clip,R);return;}
  try{navigator.clipboard.readText().then(function(t){if(t)putText(t,R);},function(){say(FR?'Pour coller depuis un autre programme : Ctrl+V':'To paste from another program, press Ctrl+V');});}
  catch(x){say(FR?'Pour coller depuis un autre programme : Ctrl+V':'To paste from another program, press Ctrl+V');}},true);
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
    text = _one(text, SHOW_OLD, SHOW_NEW, "the cells' shown values")
    text = _one(text, SETSEL_OLD, SETSEL_NEW, "the range selection")
    text = _one(text, CLIPKEYS_OLD, CLIPKEYS_NEW, "the clipboard keys")
    i = text.rfind("</body>")
    if i < 0:
        raise SystemExit("abacus_ribbon_patch: no </body>")
    return text[:i] + RANGE + KEYS + text[i:]
