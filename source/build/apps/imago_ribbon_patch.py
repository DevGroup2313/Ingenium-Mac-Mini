"""6.8.1 (28 October 2026): Imago's size list sets the size chosen.

The owner's words: "I want Tabula, Abacus, and Imago to have a full audit for bugs and functionality and then I want them all
fixed."

Pressed as a person presses it (rig/t_681_imago.js, rig/t_681_imago_wk.py), everything on Imago's Home ribbon landed and stayed
(across slides, and when Imago is opened again) but the size list: any size made the words 48 pixels high, the selected words
and the words typed after choosing it. Imago, like Tabula, asks the browser for its largest size and then turns that into the
size chosen; it looked for the largest written one way only, and Imago has the browser write styles, which writes it the
other way, so nothing was turned. Now both ways are turned, in place, and the words typed after choosing a size are turned
as they come (as Tabula's, apps/tabula_ribbon_patch.py).

patch(text) -> text."""

OLD = """function setFontSize(em){
    if(!lastField)return;
    try{document.execCommand("fontSize",false,"7");}catch(e){}
    var fs=lastField.querySelectorAll('font[size="7"]');
    for(var i=0;i<fs.length;i++){ fs[i].removeAttribute("size"); fs[i].style.fontSize=em; }
    lastField.dispatchEvent(new Event("input"));try{lastField.focus();}catch(e){}
  }"""
NEW = """var imSizeNext=null;
  function imSizeTurn(root,em){var hit=false;root.querySelectorAll('font[size="7"],span[style*="xxx-large"]').forEach(function(f){hit=true;if(f.tagName==='FONT')f.removeAttribute('size');f.style.fontSize=em;});return hit;}
  function setFontSize(em){
    if(!lastField)return;
    try{document.execCommand("fontSize",false,"7");}catch(e){}
    var s0=window.getSelection();
    imSizeNext=(imSizeTurn(lastField,em)&&s0&&!s0.isCollapsed)?null:{f:lastField,em:em};
    lastField.dispatchEvent(new Event("input"));try{lastField.focus();}catch(e){}
  }
  document.addEventListener('input',function(e){if(!imSizeNext||!e.isTrusted||!/^insert/.test(e.inputType||''))return;
    if(!imSizeTurn(imSizeNext.f,imSizeNext.em)&&e.inputType==='insertText')imSizeNext=null;},true);
  document.addEventListener('mousedown',function(e){var t=e.target;if(t&&t.nodeType===3)t=t.parentElement;if(t&&t.closest&&t.closest('#slide [contenteditable]'))imSizeNext=null;},true);
  document.addEventListener('keydown',function(e){if(/^(Arrow|Home|End|Page)/.test(e.key))imSizeNext=null;},true);"""


def patch(text):
    if "function imSizeTurn(" in text:
        return text
    n = text.count(OLD)
    if n != 1:
        raise SystemExit("imago_ribbon_patch: the size list's function: expected one, found %d" % n)
    return text.replace(OLD, NEW)
