"""Pass 631 of the Forge: the steady preview, the 💭 and its panel, the support module and its Focus room.
usage: forge631.py IN.html OUT.html"""
import sys,re
S='/tmp/claude-0/-home-user/a024c340-a8a3-5ff0-9d28-ffbf4ac4c179/scratchpad'
CORE='/home/user/ingenium-mac-mini/source/build/thoughts/'
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
def rep(a,b,count=1):
    global s
    n=s.count(a)
    if n!=count: raise SystemExit('expected %d, found %d: %r'%(count,n,a[:100]))
    s=s.replace(a,b)
# 1. THE STEADY PREVIEW: the split's height is measured from the page, not from where it has scrolled to
rep("""    var top=main.getBoundingClientRect().top; if(top<=0||top>600) return;
    document.documentElement.style.setProperty('--forge-main-h', Math.max(420, window.innerHeight-top-12)+'px');""",
"""    /* PASS 631, THE PREVIEW THAT SHOOK WHILE THE EDITOR SCROLLED. Measured: the height below the mark was read from
       where the page had scrolled to, so every pause in a scroll gave the split a new height (709 to 769 pixels in one
       test), the sticky preview and its frame were resized, and an app running inside laid itself out again in a
       143 ms frame. The top is now read in the page's own coordinates, which scrolling never changes, and the height
       is written only when it really changes. */
    var sc=document.getElementById('cd-scroll'), off=(sc&&sc.contains(main))?(sc.scrollTop-sc.getBoundingClientRect().top):(window.pageYOffset||0);
    var top=main.getBoundingClientRect().top+off; if(top<=0||top>600) return;
    var want=Math.max(420, Math.round(window.innerHeight-top-12)), had=parseFloat(document.documentElement.style.getPropertyValue('--forge-main-h'))||0;
    if(Math.abs(want-had)>1) document.documentElement.style.setProperty('--forge-main-h', want+'px');""")
# 2. THE FOCUS ROOM: a room of its own, at the head of the day's group on the rail
rep("var ROOMS=['editor','bakery','library','files','compose','workshop','guidebook','settings','magister','curriculum','assessments','ascensus','fontes','reckoner','agenda','projects'];",
    "var ROOMS=['editor','bakery','library','files','compose','workshop','guidebook','settings','magister','curriculum','assessments','ascensus','fontes','reckoner','agenda','projects','focus'];")
rep("  if(name==='agenda'){ try{ forgeMountAgenda(); }catch(e){} } if(name==='projects'){ try{ forgeMountProjects(); }catch(e){} }",
    "  if(name==='agenda'){ try{ forgeMountAgenda(); }catch(e){} } if(name==='projects'){ try{ forgeMountProjects(); }catch(e){} } if(name==='focus'){ try{ if(window.__forgeFocusMount) window.__forgeFocusMount(); }catch(e){} }")
rep("""    <div class="room" id="room-agenda">""","""    <div class="room" id="room-focus">
      <div class="room-head"><div class="page-title"><h2 class="section-title">🧭 Focus</h2><div class="section-sub">Support that fits how you build: one step at a time, time you can see, a calm screen when you need it, and a place for every stray thought.</div></div></div>
      <div class="room-body" id="focusPages"></div>
    </div>
    <div class="room" id="room-agenda">""")
rep("    [['agenda','Agenda','\\ud83d\\udcc5'],['projects','Projects','\\ud83c\\udfaf']],",
    "    [['focus','Focus','\\ud83e\\udded'],['agenda','Agenda','\\ud83d\\udcc5'],['projects','Projects','\\ud83c\\udfaf']],   /* PASS 631: Focus heads the day's group */")
# 3. THE 💭 IN THE SIDE COLUMN: under the bell, above the moon, as in Carpe Diem
rep('var IDS=["sticky-fab","horo-fab","cd-theme-fab","reminders-fab","cd-float-fab"];','var IDS=["sticky-fab","horo-fab","cd-theme-fab","cd-thought-fab","reminders-fab","cd-float-fab"];')
rep("var ids=['cd-float-fab','reminders-fab','cd-theme-fab','horo-fab','sticky-fab'];","var ids=['cd-float-fab','reminders-fab','cd-thought-fab','cd-theme-fab','horo-fab','sticky-fab'];")
# 4. THE BUILD STAMP
m=re.search(r'CD_BUILD=\{date:"[^"]*",pass:"630",stamp:"9s62"\}',s)
if not m: raise SystemExit('no CD_BUILD 630')
s=s.replace(m.group(0),'CD_BUILD={date:"2026-10-17",pass:"631",stamp:"9s63"}')
# 5. THE MODULES, whole, at the foot of the page
tc=open(CORE+'thought_cloud.html',encoding='utf-8').read()
sc=open(CORE+'support_core.html',encoding='utf-8').read()
fs=open(S+'/fp/forge_support.html',encoding='utf-8').read()
k=s.rfind('</body>')
if k<0: raise SystemExit('no body end')
s=s[:k]+'\n<!-- PASS 631 · the thoughts panel, the support module and the Forge\'s own supports -->\n'+tc+'\n'+sc+'\n'+fs+'\n'+s[k:]
open(dst,'w',encoding='utf-8').write(s)
print('written',dst,len(s))
