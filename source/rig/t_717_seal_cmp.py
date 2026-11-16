# python3 rig/t_717_seal_cmp.py <out dir> webkit|chromium: the pairs compared, and a sheet (as it was | rebuilt | difference x6)
import sys,glob,os
from PIL import Image, ImageChops
OUT,eng=sys.argv[1],sys.argv[2]
rows=[];report=[]
for th in ['day','night']:
    for f in sorted(glob.glob(f'{OUT}/{eng}_{th}_gc_*.png'),key=lambda x:int(x.rsplit('_',1)[1][:-4])):
        T=f.rsplit('_',1)[1][:-4]; g=Image.open(f).convert('RGB'); o=Image.open(f.replace('_gc_','_orig_')).convert('RGB')
        d=ImageChops.difference(g,o); px=list(d.getdata()); m=[max(a) for a in px]; m.sort()
        mean=sum(sum(a) for a in px)/(3*len(px)); p99=m[int(.99*len(m))]; mx=m[-1]; big=sum(1 for v in m if v>24)
        report.append(f'{th} t={T}ms: mean {mean:.2f}/255, 99th {p99}, max {mx}, pixels off by more than 24: {big} of {len(m)}')
        k=6; amp=d.point(lambda v:min(255,v*6))
        row=Image.new('RGB',(g.width*k*3+20,g.height*k),'white')
        row.paste(o.resize((o.width*k,o.height*k),Image.NEAREST),(0,0)); row.paste(g.resize((g.width*k,g.height*k),Image.NEAREST),(g.width*k+10,0)); row.paste(amp.resize((g.width*k,g.height*k),Image.NEAREST),(2*g.width*k+20,0))
        rows.append(row)
print('\n'.join(report))
sel=rows[::2][:8]
H=sum(r.height+6 for r in sel); W=max(r.width for r in sel); sheet=Image.new('RGB',(W,H),'white'); y=0
for r in sel: sheet.paste(r,(0,y)); y+=r.height+6
sheet.save(f'{OUT}/{eng}_sheet.png'); print('sheet',sheet.size)
