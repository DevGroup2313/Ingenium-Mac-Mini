# Cuts the frames cap_all.js took into one strip per stone (24 frames, the stone alone, 104 by 60) and one picture per band
# (the holder, 132 wide), WebP with their transparency, written as stones.json {frames, fw, fh, bw, bh, img}.
#   python3 -I cut.py <folder holding raw/ from cap_all.js>
import sys, glob, os, io, base64, json
from PIL import Image
G=sys.argv[1]; raw=G+'/raw'
def bbox_rows(im, y0, y1):
    a=im.getchannel('A').crop((0,y0,im.width,y1)); b=a.point(lambda v:255 if v>10 else 0).getbbox()
    return None if not b else (b[0],b[1]+y0,b[2],b[3]+y0)
im=Image.open(raw+'/stone_clear_00.png'); A=im.getchannel('A')
rows=[sum(1 for x in range(0,im.width,2) if A.getpixel((x,y))>10) for y in range(im.height)]
top=next(y for y in range(60,im.height) if rows[y]>0); gap=next(y for y in range(top,im.height) if rows[y]==0); hol=next(y for y in range(gap,im.height) if rows[y]>0)
U=None
for f in sorted(glob.glob(raw+'/stone_*.png')):
    b=bbox_rows(Image.open(f),60,gap); U=b if U is None else (min(U[0],b[0]),min(U[1],b[1]),max(U[2],b[2]),max(U[3],b[3]))
U=(U[0]-4,U[1]-4,U[2]+4,min(U[3]+1,gap))
H=60; W=round((U[2]-U[0])*H/(U[3]-U[1])); out={}
for n in sorted(set(os.path.basename(f).split('_')[1] for f in glob.glob(raw+'/stone_*.png'))):
    fr=sorted(glob.glob(raw+'/stone_%s_*.png'%n)); strip=Image.new('RGBA',(W*len(fr),H),(0,0,0,0))
    for i,f in enumerate(fr): strip.paste(Image.open(f).crop(U).resize((W,H),Image.LANCZOS),(i*W,0))
    b=io.BytesIO(); strip.save(b,'WEBP',quality=82,alpha_quality=90,method=6); out['stone_'+n]='data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
HB=None
for f in sorted(glob.glob(raw+'/band_*.png')):
    b=bbox_rows(Image.open(f),hol,Image.open(f).height); HB=b if HB is None else (min(HB[0],b[0]),min(HB[1],b[1]),max(HB[2],b[2]),max(HB[3],b[3]))
HB=(HB[0]-3,HB[1]-2,HB[2]+3,min(HB[3]+3,im.height)); BW=132; BH=round((HB[3]-HB[1])*BW/(HB[2]-HB[0]))
for f in sorted(glob.glob(raw+'/band_*.png')):
    n=os.path.basename(f)[5:-4]; h=Image.open(f).crop(HB).resize((BW,BH),Image.LANCZOS)
    b=io.BytesIO(); h.save(b,'WEBP',quality=84,alpha_quality=92,method=6); out['band_'+n]='data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
json.dump({'frames':24,'fw':W,'fh':H,'bw':BW,'bh':BH,'img':out},open(G+'/stones.json','w'))
