"""Writes Carpe Diem 1052 into a website repository: the page, the dark icons, the keeper (sw.js), BUILD_INFO and README."""
import sys,os,shutil,re
S='/tmp/claude-0/-home-user/a024c340-a8a3-5ff0-9d28-ffbf4ac4c179/scratchpad/'
repo,page,kind=sys.argv[1],sys.argv[2],sys.argv[3]   # kind: committee | sample
def edit(p,pairs):
    b=open(p,'rb').read(); crlf=b'\r\n' in b; s=b.decode('utf-8')
    for a,c in pairs:
        if crlf: c=c.replace('\r\n','\n').replace('\n','\r\n'); a=a.replace('\r\n','\n').replace('\n','\r\n')
        if s.count(a)<1: raise SystemExit('not found in %s: %r'%(p,a[:80]))
        s=s.replace(a,c,1)
    open(p,'wb').write(s.encode('utf-8'))
shutil.copyfile(page,os.path.join(repo,'index.html'))
os.makedirs(os.path.join(repo,'icons'),exist_ok=True)
up=S+'up/pw/Carpe Diem 1051 - public sample, website/icons/'
for f in os.listdir(up):
    d=os.path.join(repo,'icons',f)
    if not os.path.exists(d): shutil.copyfile(up+f,d)
for f in ['icon-dark-32.png','icon-dark-180.png','icon-dark-192.png','icon-dark-512.png']: shutil.copyfile(S+'darkicons/'+f,os.path.join(repo,'icons',f))
shutil.copyfile(S+'darkicons/favicon-dark.ico',os.path.join(repo,'favicon-dark.ico'))
# the keeper: a new name, and the night icons kept for offline use
sw=os.path.join(repo,'sw.js'); t=open(sw,encoding='utf-8').read()
t=re.sub(r'const CACHE = "(carpe-diem-demo-[a-z]+)-v\d+";',lambda m:'const CACHE = "%s-v202610181052";'%m.group(1),t,count=1)
extra=', "favicon-dark.ico", "./icons/icon-dark-32.png", "./icons/icon-dark-180.png", "./icons/icon-dark-192.png", "./icons/icon-dark-512.png", "favicon.ico?v=1052", "favicon-dark.ico?v=1052", "./icons/icon-32.png?v=1052", "./icons/icon-dark-32.png?v=1052", "./icons/icon-192.png?v=1052", "./icons/icon-dark-192.png?v=1052", "./icons/icon-512.png?v=1052", "./icons/icon-dark-512.png?v=1052", "./icons/apple-touch-icon.png?v=1052", "./icons/icon-dark-180.png?v=1052"'
k=t.find('"./icons/apple-touch-icon.png?v=1050"')
if k<0: raise SystemExit('sw assets anchor missing')
k2=k+len('"./icons/apple-touch-icon.png?v=1050"'); t=t[:k2]+extra+t[k2:]
open(sw,'w',encoding='utf-8').write(t)
edit(os.path.join(repo,'BUILD_INFO.txt'),[('Build: 2026-10-12','Build: 2026-10-18'),('Pass: 1051','Pass: 1052'),('Stamp: 528171051','Stamp: 528171052')])
ed={'committee':('Committee demo','KEEPS the Backup button, so a committee member can export and import their visit. The public sample hides it.'),'sample':('Public sample','HIDES the Backup button, as the public sample should. The committee demo keeps it.')}[kind]
NEW=('**Build 1052, 18 October 2026.** The About panel ends with "1052 · 528171052 · %s". It %s\n\n'
'**New in build 1052.** The supports have a page of their own, **Focus** (Concentration in French), on the bar beside Home,\n'
'laid out as Ingenium\'s Focus page is: Now, Steps (a task in small steps, one at a time, with a two-minute Just start),\n'
'Time (the hour, the bar of the time left, and the Clepsydra), the Inbox, Calm (with a still, dim quiet screen and\n'
'low-energy days), Routines, Today asks of you, and a switch for each support. Nothing of them sits on the Overview any\n'
'more, where it could be forgotten. The 💭 beside the bell opens a light raised thoughts panel, dragged and resized from\n'
'any edge: − puts the words away and the 💭 keeps them, with a count of what waits and gentle reminders that take turns\n'
'between the parts of your life; ✕ asks before it lets anything go. The guided tour walks the new page. The Author\n'
'Studio, the mini Forge\'s rooms and Guidebook, and the chapters of the Guidebook that had no French now read in French\n'
'when the app is in French (the mini Forge\'s code lessons keep their English for now). The mini Forge\'s live preview no\n'
'longer shakes while its Editor scrolls. The tab icon is the dark navy and gold seal whenever the app or the device is\n'
'dark: where the page is a website it now names real icon files (favicon-dark.ico and icons/icon-dark-*.png, new in\n'
'this folder), chosen before the browser reads any icon, which Safari needs. Upload the whole folder, every file.\n\n') % ed
rd=os.path.join(repo,'README.md'); r=open(rd,encoding='utf-8').read()
m=re.search(r'\*\*Build 1051, 12 October 2026\.\*\*[^\n]*\n\n',r)
if not m: raise SystemExit('README anchor missing')
r=r[:m.start()]+NEW+'**Earlier, in build 1051.**'+r[m.end():].replace('**New in build 1051.**','',1)
open(rd,'w',encoding='utf-8').write(r)
print('written',repo)
