import sys
d=sys.argv[1]
r=lambda n: open(d+'/'+n,encoding='utf-8').read()
html='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Harness</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600&display=swap">
<style>'''+r('tokens.css')+'''
body{margin:0;background:var(--bg,#f6f3fa);font-family:Inter,-apple-system,"Segoe UI",sans-serif}
#page-build{display:block;padding:24px}
</style></head><body data-theme="day" data-motion="calm">
<main><section id="page-build" class="section active"><p class="lede">Write a page and watch it run beside your code. Good for trying an idea, checking a snippet, or letting a model help you fix something. This works fully offline and does not need a model.</p>
<div class="rm-bar"></div><div class="card"><button id="runBtn">Run</button><button id="sampleBtn">Load a sample</button><textarea id="codeEditor"><!doctype html>\n<p>hi</p></textarea><input type="checkbox" id="autoRun" checked></div></section></main>
<script>var state={theme:"day",motion:"calm"};function saveState(){}function go(p){}window.go=go;function applyTheme(){document.body.setAttribute("data-theme",state.theme);}</script>
'''+r('r290.built.html')+r('r310.built.html')+r('r292.built.html')+r('r314.built.html')+'''
</body></html>'''
open(d+'/harness.html','w',encoding='utf-8').write(html); print(len(html))
