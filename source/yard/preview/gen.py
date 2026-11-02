# the preview: the template with the seal pictures and Lector's layered seals put in
import json,os
H=os.path.dirname(os.path.abspath(__file__))
S=os.path.dirname(os.path.dirname(H))
t=open(os.path.join(H,'fabrica_template.html'),encoding='utf-8').read()
t=t.replace('__SEALS__',open(os.path.join(H,'prev_seals.json')).read())
if '__LAYERS__' in t: t=t.replace('__LAYERS__',open(os.path.join(S,'build','lx_layers.json')).read())
open(os.path.join(H,'fabrica_preview.html'),'w',encoding='utf-8').write(t)
print('preview', len(t))
