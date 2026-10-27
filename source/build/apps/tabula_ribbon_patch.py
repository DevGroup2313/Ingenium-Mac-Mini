"""6.8.1 (27 October 2026): what Tabula's ribbon gives, it gives at the first try, and it stays.

The owner's words: "The text colours and other functions on Tabula's ribbons do not work well. I have to keep trying multiple
times for it to stick and work."

Found by pressing the ribbon as a person does, with real presses of the pointer and keys, in Safari's engine (WebKit) and in
Chromium's (rig/t_681_ribbon_wk.py, rig/t_681_ribbon.js). These failed:
  - A colour or a highlight chosen from its palette, with nothing selected, did not reach the words typed next. The palette
    put the selection back as it closed, after the colour was given, and a selection put back forgets the colour waiting for
    the next words. It now closes first, then gives the colour. And Automatic and No colour, chosen with the caret in
    coloured or highlighted words, kept the words typed next in that colour. They now reach the words typed next as they
    reach selected words: the browser gives the words a stand-in colour (which splits them off from the coloured run and
    keeps their bold, italic and the rest), and the stand-in is taken away as they are typed, so they take the ink and the
    paper around them, by day and by night, as in Word.
  - A size made words 48 pixels high, whatever size was chosen: in Safari's engine always, in Chromium's when nothing was
    selected. Tabula sets a size by asking for the browser's largest and then turning that into the size chosen, but it
    looked for the largest written one way only, and only at the moment of choosing; Safari's engine writes it another
    way, and words typed afterwards were not there yet. It now turns both ways, in place (the caret stays where it is,
    and the words keep their own colour), and turns the words typed after it as they come.
  - The Styles pane and the Comments pane ran the whole height of the window, over the right end of the ribbon and over
    Tabula's own Guide and Close: with either open, those keys could not be pressed. Each now sits between the ribbon and
    the status bar, as Word's do (and below the row of Write, Documents and the rest, which stays with the ribbon as the
    page scrolls), and the page makes room for the Styles pane as it did for the comments. Inside an app that keeps keys
    of its own along the window's right edge (Ingenium's side keys), each pane keeps its rows clear of them.
  - Read mode had one way out, its own Exit reading key; Escape now leaves it too, as in Word.
  - Grow Font and Shrink Font worked once. After the first press the words were no longer selected, so a second press had
    nothing to grow. The words stay selected now, and each press grows them again.

patch(text) -> text."""
def _one(text, old, new, what):
    n = text.count(old)
    if n != 1:
        raise SystemExit("tabula_ribbon_patch: %s: expected one of %r, found %d" % (what, old[:70], n))
    return text.replace(old, new)


# the palette closes before its colour is given
PAL_OLD = "b.addEventListener('click',function(){lpColorClear();var c=b.getAttribute('data-c');exec(cmd,c);var el=$g(bar);if(el)el.style.background=c;closePop();});"
PAL_NEW = "b.addEventListener('click',function(){lpColorClear();var c=b.getAttribute('data-c');closePop();exec(cmd,c);var el=$g(bar);if(el)el.style.background=c;});"
# Automatic and No colour: the palette closes first too; with nothing selected, the stand-in colour they give the next words is
# taken away as those words are typed (in place, so the caret and Undo are untouched)
FOOT_OLD = "f.addEventListener('click',function(){footAct();closePop();});"
FOOT_NEW = "f.addEventListener('click',function(){closePop();footAct();});"
UNC_OLD = "function cdUnColor(cmd){ed.focus();restoreSel();var m=cmd==='foreColor';"
UNC_NEW = ("var cdUnNext=false;function cdUnMark(){var hit=false;ed.querySelectorAll('font[color],[style*=\"rgb(1, 2, 3)\"]').forEach(function(n){"
           "if(n.tagName==='FONT'){var c=(n.getAttribute('color')||'').toLowerCase();if(c==='#010203'||c==='rgb(1, 2, 3)'){n.removeAttribute('color');hit=true;}}"
           "if(n.style.color==='rgb(1, 2, 3)'){n.style.color='';hit=true;}if(n.style.backgroundColor==='rgb(1, 2, 3)'){n.style.backgroundColor='';hit=true;}"
           "if(n.hasAttribute('style')&&!n.getAttribute('style').trim())n.removeAttribute('style');});return hit;}"
           "ed.addEventListener('input',function(e){if(cdUnNext&&e.isTrusted&&/^insert/.test(e.inputType||'')&&!cdUnMark()&&e.inputType==='insertText')cdUnNext=false;});"
           "ed.addEventListener('mousedown',function(){cdUnNext=false;});"
           "ed.addEventListener('keydown',function(e){if(/^(Arrow|Home|End|Page)/.test(e.key))cdUnNext=false;});"
           "function cdUnColor(cmd){ed.focus();restoreSel();var m=cmd==='foreColor';"
           "try{var s0=window.getSelection();cdUnNext=!!(s0.rangeCount&&s0.getRangeAt(0).collapsed);}catch(e){}")
# a size, chosen with words selected or before typing them
SIZE_OLD = ("$('sizeSel').addEventListener('change',function(){var pt=this.value;run('fontSize','7');editor.querySelectorAll('font[size=\"7\"]')"
            ".forEach(function(f){var sp=document.createElement('span');sp.style.fontSize=pt+'pt';while(f.firstChild)sp.appendChild(f.firstChild);f.parentNode.replaceChild(sp,f);});});")
SIZE_NEW = ("var cdSizeNext=null;function cdSizeTurn(pt){var hit=false;editor.querySelectorAll('font[size=\"7\"],span[style*=\"xxx-large\"]').forEach(function(f){hit=true;"
            "if(f.tagName==='FONT')f.removeAttribute('size');f.style.fontSize=pt+'pt';});return hit;}"
            "$('sizeSel').addEventListener('change',function(){var pt=this.value;run('fontSize','7');cdSizeNext=cdSizeTurn(pt)&&!window.getSelection().isCollapsed?null:pt;});"
            "editor.addEventListener('input',function(e){if(cdSizeNext&&e.isTrusted&&/^insert/.test(e.inputType||'')&&!cdSizeTurn(cdSizeNext)&&e.inputType==='insertText')cdSizeNext=null;});"
            "editor.addEventListener('mousedown',function(){cdSizeNext=null;});"
            "editor.addEventListener('keydown',function(e){if(/^(Arrow|Home|End|Page)/.test(e.key))cdSizeNext=null;});")
# Grow Font and Shrink Font: the words stay selected
BUMP_OLD = "var sp=document.createElement('span');sp.style.fontSize=Math.max(8,cur+d)+'px';try{sp.appendChild(r.extractContents());r.insertNode(sp);}catch(e){}editor.focus();layout();}"
BUMP_NEW = ("var sp=document.createElement('span');sp.style.fontSize=Math.max(8,cur+d)+'px';try{sp.appendChild(r.extractContents());r.insertNode(sp);}catch(e){}editor.focus();"
            "try{var r2=document.createRange();r2.selectNodeContents(sp);s.removeAllRanges();s.addRange(r2);}catch(e){}layout();}")


# the side panes under the ribbon and above the status bar, measured from the page itself; the page makes room for the styles
PANES = ("<style id=\"tabula-panes-681\">.sty-pane,#cd-cm-pane{top:var(--cd-pane-top,0px)!important;bottom:var(--cd-pane-bottom,0px)!important}"
         "body.cd-sty-open .canvas{padding-right:248px}html.cd-hosted .sty-pane{width:292px!important;padding-right:56px;box-sizing:border-box}"
         "html.cd-hosted body.cd-sty-open .canvas{padding-right:304px}html.cd-hosted #cd-cm-pane{width:356px!important;padding-right:56px!important;box-sizing:border-box}"
         "html.cd-hosted body.cd-cm-open .canvas{padding-right:368px}</style>\n"
         "<script id=\"tabula-panes-681-js\">(function(){if(window.parent!==window)document.documentElement.classList.add('cd-hosted');var last='';function place(){var sb=document.querySelector('.statusbar'),R=document.documentElement,t=0;"
         "['.titlebar','.ribtabs','.ribbon','.tabs'].forEach(function(q){var e=document.querySelector(q),r=e&&e.getBoundingClientRect();if(r&&r.height&&r.bottom>t&&r.bottom<window.innerHeight/2)t=r.bottom;});"
         "var sr=sb&&sb.getBoundingClientRect(),b=sr&&sr.height?Math.max(0,Math.round(window.innerHeight-sr.top)):0,k=Math.round(t)+'/'+b;"
         "if(k!==last){last=k;R.style.setProperty('--cd-pane-top',Math.round(t)+'px');R.style.setProperty('--cd-pane-bottom',b+'px');}"
         "var p=document.getElementById('stylesPane');document.body.classList.toggle('cd-sty-open',!!(p&&p.classList.contains('open')));}"
         "var p=document.getElementById('stylesPane');if(p)new MutationObserver(place).observe(p,{attributes:true,attributeFilter:['class']});"
         "new MutationObserver(function(){place();}).observe(document.body,{attributes:true,attributeFilter:['class']});"
         "var mo=new MutationObserver(function(){place();});['.titlebar','.ribtabs','.ribbon','.tabs','.statusbar'].forEach(function(q){var e=document.querySelector(q);if(e)mo.observe(e,{attributes:true,attributeFilter:['style','class']});});"
         "var q=0;window.addEventListener('scroll',function(){if(!q)q=requestAnimationFrame(function(){q=0;place();});},{passive:true});"
         "window.addEventListener('keydown',function(e){if(e.key==='Escape'&&!e.defaultPrevented&&document.body.classList.contains('read')){var x=document.getElementById('exitRead');if(x)x.click();else document.body.classList.remove('read');}});"
         "window.addEventListener('resize',place);setTimeout(place,300);setTimeout(place,1500);place();})();</script>\n")


def patch(text):
    if PAL_NEW in text:
        return text
    for old, new, what in ((PAL_OLD, PAL_NEW, "palette"), (FOOT_OLD, FOOT_NEW, "palette foot"), (UNC_OLD, UNC_NEW, "no colour"),
                           (SIZE_OLD, SIZE_NEW, "size list"), (BUMP_OLD, BUMP_NEW, "grow and shrink")):
        text = _one(text, old, new, what)
    i = text.rfind("</body>")
    if i < 0:
        raise SystemExit("tabula_ribbon_patch: no </body>")
    return text[:i] + PANES + text[i:]
