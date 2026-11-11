# The live preview of Fabrica's A new app panel with its logo as a key (Ingenium 6.74, modules/r265.js), from the capture of her
# real Fabrica (capture_panel.js): the page behind the panel as a picture, the panel as Ingenium drew it with the rules that draw it,
# modules/r260.js's and r265.js's own styles whole (their passing states, the turn, the knock, are not caught by a capture), r265's
# script as it is, and a few lines standing in for what r112 does on the panel (the colour row, the letter from the name, the ways).
# Nothing is made: Make it and the close key say what Ingenium would do.
#   python3 -I build_live_logo.py <capture folder> <out.html> <modules folder>
import base64, json, os, re, sys

CAP, OUT, MOD = sys.argv[1:4]
d = json.load(open(os.path.join(CAP, 'panel.json'), encoding='utf-8'))
img = {th: 'data:image/jpeg;base64,' + base64.b64encode(open(os.path.join(CAP, 'behind_%s.jpg' % th), 'rb').read()).decode() for th in ('day', 'night')}
r112 = open(os.path.join(MOD, 'r112.js'), encoding='utf-8').read()
MARKC = json.loads(re.search(r'var MARKC=(\[[^\]]+\]);', r112).group(1))
r260 = open(os.path.join(MOD, 'r260.js'), encoding='utf-8').read()
r260css = re.search(r'<style id="r260-css">(.*?)</style>', r260, re.S).group(1)
r265 = open(os.path.join(MOD, 'r265.js'), encoding='utf-8').read()
t = d['themes']['day']
rect = t['rect']
# the chain the panel stands in, neutral in its layout (its rules still give their colours and variables)
NEUTRAL = 'position:static !important;display:block !important;margin:0 !important;padding:0 !important;width:auto !important;height:auto !important;' \
          'min-height:0 !important;max-width:none !important;overflow:visible !important;transform:none !important;animation:none !important;background:none !important;box-shadow:none !important'
open_tags, close_tags = [], []
for c in t['chain'][1:]:  # the body is the preview's own
    at = ''.join(' %s="%s"' % (k, v.replace('"', '&quot;')) for k, v in c['at'].items() if k != 'style')
    open_tags.append('<%s%s style="%s">' % (c['tag'], at, NEUTRAL))
    close_tags.insert(0, '</%s>' % c['tag'])
body_at = ''.join(' %s="%s"' % (k, v.replace('"', '&quot;')) for k, v in t['chain'][0]['at'].items() if k not in ('style', 'class'))
html = t['html']
# the panel as r112 draws it, before r265 makes its logo a key (r265 runs again here, as it does in Ingenium)
html = html.replace('class="f-sheet-wrap"', 'class="f-sheet-wrap" id="pvWrap"', 1)
css = '\n'.join(d['css'])
s_shim = '''/* what r112 does on the panel, standing in here: the colour row, the letter from the name, the ways, and the coin's turn on a change (r260) */
(function(){var D=document,MARKC=''' + json.dumps(MARKC) + ''',mk=D.querySelector("#fb .f-new-prev .f-ls.mark"),mch=mk.querySelector(":scope > span"),grid=D.querySelector("#fb .f-new");
  var inp=D.querySelector("#fb .f-sheet input.f-in"),desc=D.querySelector("#fb .f-sheet textarea.f-in"),go=[].slice.call(D.querySelectorAll("#fb .f-sheet .f-btn")).filter(function(b){return /^Make/.test(b.textContent.trim());})[0];
  var way=grid.getAttribute("data-way")||"describe",IDS=["describe","page","files","code"];
  function turn(){mk.classList.remove("turn");void mk.offsetWidth;mk.classList.add("turn");clearTimeout(mk.__pt);mk.__pt=setTimeout(function(){mk.classList.remove("turn");},760);}
  var sws=[].slice.call(D.querySelectorAll("#fb .f-sw button"));
  sws.forEach(function(b,i){b.onclick=function(){if(mk.style.getPropertyValue("--mc").trim()!==MARKC[i]){mk.style.setProperty("--mc",MARKC[i]);turn();}
    sws.forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});};});
  function label(){var v=inp.value.trim(),c=(v.charAt(0)||"A").toUpperCase();if(mch.textContent!==c){mch.textContent=c;turn();}
    if(go){go.textContent=way==="files"?(v?"Choose the files for "+v:"Choose its files"):(v?"Make "+v:"Make it");go.disabled=!v&&way!=="files";}}
  inp.addEventListener("input",label);
  [].forEach.call(D.querySelectorAll("#fb .f-way"),function(b,i){b.onclick=function(){way=IDS[i]||"describe";grid.setAttribute("data-way",way);
    [].forEach.call(D.querySelectorAll("#fb .f-way"),function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});if(desc)desc.hidden=way!=="describe";label();};});
  if(go)go.onclick=function(){var n=inp.value.trim()||"the app";window.ingToast("In Ingenium, Fabrica would now make "+n+" with this logo: on its page, as its app icon and in its installers.");};
  var x=D.querySelector("#fb .f-x");if(x)x.onclick=function(){window.ingToast("In Ingenium, this closes the panel.");};
  label();
})();
'''
body_attrs = {k: v for k, v in t['chain'][0]['at'].items() if k not in ('style', 'class')}
page = '''<title>New App Logo</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
''' + css + '''
</style>
<style id="r260-css">''' + r260css + '''</style>
<style>
/* the preview's own frame: a bar, the page fitted to the window, and a note for what Ingenium would do */
:root{--pv-bg:#f2eef7;--pv-fg:#1f1828;--pv-bar:#ffffff;--pv-line:#ddd4e8;--pv-key:#f1ecf7;--pv-keyon:#2a2135;--pv-keyonfg:#ffffff;--pv-note:#2a2135;--pv-notefg:#f6f2fb}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--pv-bg:#141019;--pv-fg:#efe9f7;--pv-bar:#1d1726;--pv-line:#352b44;--pv-key:#2b2238;--pv-keyon:#efe9f7;--pv-keyonfg:#1d1726;--pv-note:#efe9f7;--pv-notefg:#1d1726;color-scheme:dark}}
:root[data-theme="dark"]{--pv-bg:#141019;--pv-fg:#efe9f7;--pv-bar:#1d1726;--pv-line:#352b44;--pv-key:#2b2238;--pv-keyon:#efe9f7;--pv-keyonfg:#1d1726;--pv-note:#efe9f7;--pv-notefg:#1d1726;color-scheme:dark}
html body{background:var(--pv-bg) !important;color:var(--pv-fg);margin:0;overflow-x:hidden}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:60;background:var(--pv-bar)}
#pvBar{position:sticky;top:env(safe-area-inset-top,0px);z-index:50;display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;justify-content:space-between;
  padding-block:10px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));
  background:var(--pv-bar);color:var(--pv-fg);font:14px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;border-bottom:1px solid var(--pv-line)}
#pvBar .pv-say{min-width:0;flex:1 1 320px}
#pvBar b{font-weight:600}
#pvBar .pv-keys{display:flex;gap:8px}
#pvBar button{font:inherit;color:var(--pv-fg);background:var(--pv-key);border:1px solid var(--pv-line);border-radius:999px;padding:5px 14px;cursor:pointer}
#pvBar button[aria-pressed="true"]{background:var(--pv-keyon);color:var(--pv-keyonfg);border-color:var(--pv-keyon)}
#pvBar button:focus-visible{outline:2px solid var(--pv-fg);outline-offset:2px}
#pvFit{position:relative;overflow:hidden;padding-block:12px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
#pvStage{position:absolute;top:12px;width:1440px;height:900px;transform-origin:0 0;background-size:1440px 900px;background-repeat:no-repeat;border-radius:10px;overflow:hidden;box-shadow:0 0 0 1px var(--pv-line)}
#pvWrap{position:absolute !important;left:''' + str(round(rect['x'], 2)) + '''px !important;top:''' + str(round(rect['y'], 2)) + '''px !important;width:''' + str(round(rect['w'], 2)) + '''px !important;height:''' + str(round(rect['h'], 2)) + '''px !important;inset:auto;z-index:5}
#pvSay{position:fixed;left:50%;bottom:calc(22px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:60;max-width:min(560px,calc(100vw - 32px));padding:10px 16px;border-radius:12px;
  background:var(--pv-note);color:var(--pv-notefg);font:14px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.3);opacity:0;transition:opacity .25s ease;pointer-events:none}
#pvSay.on{opacity:1}
</style>
<div id="pvBar"><span class="pv-say"><b>Ingenium 6.74, as released:</b> Fabrica's A new app panel. Point at the logo, press it, or use a picture of your own.</span>
<span class="pv-keys"><button type="button" id="pvDay" data-th="day" aria-pressed="true">Day</button><button type="button" id="pvNight" data-th="night" aria-pressed="false">Night</button></span></div>
<div id="pvFit"><div id="pvStage">''' + ''.join(open_tags) + html + ''.join(close_tags) + '''</div></div>
<div id="pvSay" role="status" aria-live="polite"></div>
<script>
/* the body as Ingenium's (its settings as attributes); the panel as r112 drew it, before r265 makes its logo a key; the page fitted */
(function(){var D=document,IMG=''' + json.dumps(img) + ''',AT=''' + json.dumps(body_attrs) + ''';
  Object.keys(AT).forEach(function(k){D.body.setAttribute(k,AT[k]);});D.body.classList.add("fb-on");
  var mk=D.querySelector("#fb .f-new-prev .f-ls.mark"),ch=mk.querySelector(".nl-ch"),letter=ch?ch.textContent:"A";
  mk.className="f-ls mark";["role","tabindex","aria-label"].forEach(function(a){mk.removeAttribute(a);});
  ["--nl1","--nl2","--nl3","--nl4"].forEach(function(v){mk.style.removeProperty(v);});mk.innerHTML="<span>"+letter+"</span>";
  var k=D.querySelector("#fb .nl-keys");if(k)k.remove();var sm=D.querySelector("#fb .f-new-prev small");if(sm)sm.textContent=sm.textContent.replace(/ Press it for the next colour, or use a picture of your own\\.$/,"");
  var stage=D.getElementById("pvStage"),fit=D.getElementById("pvFit");
  function size(){var cs=getComputedStyle(fit),pl=parseFloat(cs.paddingLeft)||16,pr=parseFloat(cs.paddingRight)||16,w=fit.clientWidth-pl-pr,s=Math.min(1,Math.max(.2,w/1440));
    stage.style.left=pl+"px";stage.style.transform="scale("+s+")";fit.style.height=Math.round(900*s+24)+"px";}
  addEventListener("resize",size);size();
  function theme(th){D.body.setAttribute("data-theme",th);stage.style.backgroundImage="url("+IMG[th]+")";
    [].forEach.call(D.querySelectorAll("#pvBar [data-th]"),function(b){b.setAttribute("aria-pressed",b.getAttribute("data-th")===th?"true":"false");});}
  [].forEach.call(D.querySelectorAll("#pvBar [data-th]"),function(b){b.onclick=function(){theme(b.getAttribute("data-th"));};});
  var dark=false;try{var r=D.documentElement.getAttribute("data-theme");dark=r==="dark"||(r!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);}catch(e){}
  theme(dark?"night":"day");
  var st=null;window.ingToast=function(m){var s=D.getElementById("pvSay");s.textContent=m;s.classList.add("on");clearTimeout(st);st=setTimeout(function(){s.classList.remove("on");},4200);};
})();
''' + s_shim + '''
</script>
''' + r265 + '''
'''
open(OUT, 'w', encoding='utf-8').write(page)
print('wrote', OUT, len(page.encode('utf-8')), 'bytes')
