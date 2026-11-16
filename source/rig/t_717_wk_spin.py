# python3 rig/t_717_wk_spin.py <frames.json> <sheet.png>: each ball's colour in each frame (a reading under 0.35 is looked at by eye: the point can fall on the rim)
import sys, json, colorsys
from PIL import Image
fr=json.load(open(sys.argv[1])); out=sys.argv[2]
tiles=[]; missing=0; tot=0
for k,f in enumerate(fr):
    im=Image.open(f['f']).convert('RGB'); row=[]
    for j,p in enumerate(f['pos']):
        if p['cap']: continue
        tot+=1; x,y=int(p['x']),int(p['y']); r=int(p['w']*.18)
        px=[im.getpixel((x+dx,y+dy)) for dx in range(-r,r+1,3) for dy in range(-r,r+1,3)]
        sat=sum(colorsys.rgb_to_hsv(*[c/255 for c in q])[1] for q in px)/len(px)
        if sat<.35: missing+=1; print('frame',k,'ball',j,'saturation %.2f'%sat)
    xs=[p['x'] for p in f['pos']]; ys=[p['y'] for p in f['pos']]
    c=im.crop((int(min(xs))-70,int(min(ys))-70,int(max(xs))+70,int(max(ys))+70)).resize((200,200)); tiles.append(c)
W=Image.new('RGB',(205*min(5,len(tiles)),205*((len(tiles)+4)//5)),'white')
for i,t in enumerate(tiles): W.paste(t,((i%5)*205,(i//5)*205))
W.save(out); print('balls checked',tot,'faint or missing',missing)
