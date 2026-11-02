"""Pass 1052 of Carpe Diem: the Focus page on the bar, the thoughts panel, one support module, the steady mini Forge.
usage: cd1052.py REPO_DIR OUT.html   (reads REPO_DIR/index.html; writes OUT.html)"""
import sys,re,base64,gzip
S='/tmp/claude-0/-home-user/a024c340-a8a3-5ff0-9d28-ffbf4ac4c179/scratchpad'
CORE='/home/user/ingenium-mac-mini/source/build/thoughts/'
repo,dst=sys.argv[1],sys.argv[2]
s=open(repo+'/index.html',encoding='utf-8').read()
def rep(a,b,count=1,first=False):
    global s
    n=s.count(a)
    if (first and n<1) or (not first and n!=count): raise SystemExit('expected %d, found %d: %r'%(count,n,a[:100]))
    s=s.replace(a,b,1) if first else s.replace(a,b)
# 1. THE FOCUS PAGE ON THE BAR, after Home
rep('["home", "schedule", "curriculum", "books", "assessments", "ascent", "applications"].forEach(s => {\n    $("#section-" + s).classList.toggle("hidden", s !== id);',
    '["home", "focus", "schedule", "curriculum", "books", "assessments", "ascent", "applications"].forEach(s => {\n    const __sec = $("#section-" + s); if (__sec) __sec.classList.toggle("hidden", s !== id);')
rep('const EN_NAV = { home: "Home", ','const EN_NAV = { home: "Home", focus: "Focus", ')
rep('"nav.home": "Accueil",','"nav.focus": "Concentration",\n  "nav.home": "Accueil",',first=True)
rep('<button class="nav-btn active" data-section="home">Home</button>','<button class="nav-btn active" data-section="home">Home</button>\n    <button class="nav-btn" data-section="focus">Focus</button>')
rep('<section id="section-schedule" class="section hidden">','<section id="section-focus" class="section hidden">\n  <div id="cd-focus-page"></div>\n</section>\n\n\n<section id="section-schedule" class="section hidden">')
# 2. THE OLD SUPPORT MODULE HANDS ITS PARTS TO THE ONE MODULE (its data, its switches and its Display rows stay)
a=s.find('<script id="cd-audhd-1047">'); b=s.find('</script>',a)
if a<0: raise SystemExit('no cd-audhd-1047')
m=s[a:b]
def mrep(x,y):
    global m
    if m.count(x)!=1: raise SystemExit('module anchor %d: %r'%(m.count(x),x[:80]))
    m=m.replace(x,y)
mrep("function on(k) { var s = S(); return typeof s[k] === 'boolean' ? s[k] : DEF[k]; }",
     "/* PASS 1052: the Routines switch keeps its own key; the routines themselves live under s.routines, and a switch\n     written over them once lost every routine the owner had rewritten */\n  function on(k) { var s = S(), kk = k === 'routines' ? 'routinesOn' : k; return typeof s[kk] === 'boolean' ? s[kk] : DEF[k]; }")
mrep("S()[r[0]] = o[0]; save(); applyAll();","S()[r[0] === 'routines' ? 'routinesOn' : r[0]] = o[0]; save(); applyAll();")
mrep("function capture(prefill, after) {","function capture(prefill, after) {\n    if (window.__cdTC) { if (on('inbox')) window.__cdTC.open(prefill || undefined); return; }   /* PASS 1052: the thoughts panel */")
mrep("function openInbox() {","function openInbox() {\n    if (window.__cdTC) { window.__cdTC.inbox(); return; }")
mrep("function openFocus() {","function openFocus() {\n    if (window.__cdSC) { window.__cdSC.openFocus(); return; }")
mrep("function closeFocus() {","function closeFocus() {\n    if (window.__cdSC) { try { window.__cdSC.closeFocus(); } catch (e) {} }")
mrep("function justStart() {","function justStart() {\n    if (window.__cdSC) { window.__cdSC.justStart(); return; }")
mrep("function runRoutine(r) {","function runRoutine(r) {\n    if (window.__cdSC) { window.__cdSC.runRoutine(r && r.id ? r.id : r); return; }")
mrep("function editRoutines() {","function editRoutines() {\n    if (window.__cdSC) { window.__cdSC.editRoutines(); return; }")
mrep("function openSteps(n) {","function openSteps(n) {\n    if (window.__cdSC) { window.__cdSC.fromPlan(n); try { showSection('focus'); } catch (e) {} return; }")
mrep("function placeOverview(force) {","function placeOverview(force) {\n    /* PASS 1052, at the owner's word: the supports have a page of their own on the bar, so nothing of them is\n       drawn on the Overview, where they could be forgotten */\n    var gone = document.getElementById('cd-sup-ov'); if (gone && gone.parentNode) gone.parentNode.removeChild(gone);\n    if (window.__cdSC) return;")
mrep("if (b.getAttribute('title') !== title && b.__cdTitle == null)","if (!window.__cdTC && b.getAttribute('title') !== title && b.__cdTitle == null)")
s=s[:a]+m+s[b:]
# 2b. THE MINI FORGE'S OWN LABELS ACCEPT THEIR FRENCH: the edition lock wrote its English words back on every pass,
#     so a label put into French would have flickered back; it now takes the French rendering as the same words
rep('<script id="cd-mini-forge-lock-1048">\n', '<script id="cd-mini-forge-lock-1048">\n/* CARPE DIEM PASS 1052: the same words in French count as the same words */\nfunction __cdSame(c, e) { try { return c === e || !!(window.__cdMiniForgeFr && window.__cdMiniForgeFr.look(e) === c); } catch (x) { return c === e; } }\n')
rep("if (i && i.textContent !== DESC[id]) i.textContent = DESC[id]","if (i && !__cdSame(i.textContent, DESC[id])) i.textContent = DESC[id]")
rep("if (p0 && p0.textContent !== TXT) p0.textContent = TXT","if (p0 && !__cdSame(p0.textContent, TXT)) p0.textContent = TXT")
rep("if (t && t.textContent !== '✅ Apply to this app') t.textContent = '✅ Apply to this app'","if (t && !__cdSame(t.textContent, '✅ Apply to this app')) t.textContent = '✅ Apply to this app'")
# 3. THE TOUR FOLLOWS THE SUPPORTS TO THEIR PAGE
a=s.find('<script id="cd-audhd-tour">'); b=s.find('</script>',a)
s=s[:a]+open(S+'/fp/cd_tour_1052.js',encoding='utf-8').read().rstrip()+'\n'+s[b:]
# 4. THE STEADY MINI FORGE: the same root fix as the Forge's own pass 631, inside the copy Carpe Diem carries
tag='<script id="cd-forge-pack" type="text/plain">'
a=s.find(tag); b=s.find('</script>',a)
raw=gzip.decompress(base64.b64decode(s[a+len(tag):b].strip())).decode('utf-8')
old="""    var top=main.getBoundingClientRect().top; if(top<=0||top>600) return;
    document.documentElement.style.setProperty('--forge-main-h', Math.max(420, window.innerHeight-top-12)+'px');"""
new="""    /* CARPE DIEM PASS 1052, THE PREVIEW THAT SHOOK WHILE THE EDITOR SCROLLED: the height below the mark was read from
       where the page had scrolled to, so each pause in a scroll resized the sticky preview and the app inside it. The
       top is now read in the page's own coordinates, and the height is written only when it really changes. */
    var sc=document.getElementById('cd-scroll'), off=(sc&&sc.contains(main))?(sc.scrollTop-sc.getBoundingClientRect().top):(window.pageYOffset||0);
    var top=main.getBoundingClientRect().top+off; if(top<=0||top>600) return;
    var want=Math.max(420, Math.round(window.innerHeight-top-12)), had=parseFloat(document.documentElement.style.getPropertyValue('--forge-main-h'))||0;
    if(Math.abs(want-had)>1) document.documentElement.style.setProperty('--forge-main-h', want+'px');"""
if raw.count(old)!=1: raise SystemExit('mini forge measure not found')
raw=raw.replace(old,new)
fx=S+'/fp/minforge_fr.py'
import os
if os.path.exists(fx):
    ns={}; exec(open(fx,encoding='utf-8').read(),ns); raw=ns['patch'](raw)
enc=base64.b64encode(gzip.compress(raw.encode('utf-8'),9,mtime=0)).decode('ascii')
s=s[:a+len(tag)]+enc+s[b:]
# 4b. THE NIGHT ICON IN SAFARI: real files where the page is a website, chosen before any icon is read
ICON=open(S+'/fp/cd_icon_1052.js',encoding='utf-8').read().rstrip()
k=s.find('<script id="cd-icon-early-1051">'); k2=s.find('</script>',k)+len('</script>')
if k<0: raise SystemExit('no early icon script')
s=s[:k2]+'\n'+ICON+s[k2:]
rep("""      icons.push({ el: l, light: l.getAttribute('data-cd-light') || l.getAttribute('href'), dark: big ? DARK512 : DARK180 });""",
    """      icons.push({ el: l, light: l.getAttribute('data-cd-light') || l.getAttribute('href'), dark: l.getAttribute('data-cd-dark') || (big ? DARK512 : DARK180) });""")
rep("""    var icos = head ? head.querySelectorAll('link[rel~="icon"][href$=".ico"]') : [];""",
    """    var icos = head ? head.querySelectorAll('link[rel~="icon"][data-cd-ico], link[rel~="icon"][href$=".ico"]') : [];""")
rep("""    for (var j = 0; j < icos.length; j++) icons.push({ el: icos[j], light: icos[j].getAttribute('data-cd-light') || icos[j].getAttribute('href'), dark: d192 });""",
    """    for (var j = 0; j < icos.length; j++) icons.push({ el: icos[j], light: icos[j].getAttribute('data-cd-light') || icos[j].getAttribute('href'), dark: icos[j].getAttribute('data-cd-dark') || d192 });""")
# 5. THE BUILD STAMP
m2=re.search(r'CD_BUILD=\{date:"2026-10-12",pass:"1051",stamp:"528171051"',s)
if not m2: raise SystemExit('no CD_BUILD 1051')
s=s.replace(m2.group(0),'CD_BUILD={date:"2026-10-18",pass:"1052",stamp:"528171052"')
# 6. THE MODULES, whole, at the foot of the page
parts=[open(CORE+'thought_cloud.html',encoding='utf-8').read(),open(CORE+'support_core.html',encoding='utf-8').read(),open(S+'/fp/cd_support.html',encoding='utf-8').read()]
fs=S+'/fp/cd_studio_fr.html'
if os.path.exists(fs): parts.append(open(fs,encoding='utf-8').read())
k=s.rfind('</body>')
s=s[:k]+'\n<!-- PASS 1052 · the thoughts panel, the support module and Carpe Diem\'s own supports -->\n'+'\n'.join(parts)+'\n'+s[k:]
# 7. THE PAGE'S PHOTOGRAPH OF ITSELF, taken again, so a copy, a room window and Edit this app all carry 1052
sys.path.insert(0,S+'/fp'); import selfsrc
s=selfsrc.rephoto(s)
open(dst,'w',encoding='utf-8').write(s)
print('written',dst,len(s))
