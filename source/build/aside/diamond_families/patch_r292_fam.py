"""7.31: the diamond's colour families (modules/r292.js), and the northern lights in the family's colour.
Each family is Ingenium's own purple stone dressed in another colour: the four purple looks (lavender, purple, the night stone by day,
the night stone of the night theme) are drawn exactly as before, then, in the display's own colours after the tone curve, every colour of
the stone is gathered toward the family's hue (its distance from the purple's own hue times k, so the facets keep a little of their play
and white light stays white), its chroma scaled and its brightness curved, one setting for each shade. The northern lights behind the
stone (the head's sky, its glows and motes, and the lights mirrored in the holder's silver by night) are gathered the same way toward
the family's hue, their brightness kept. The clear crystal has a night of its own: a black diamond (the night room without its
violet, no violet over the stone, its fire kept; r314 deepens its body) under northern lights of every colour, spread across the sky
and drifting slowly.
With no family set, nothing changes: none of it runs.
r314 sets it: IngDiamond.family({s:[P,M,D,N], cp:bool, cn:bool, aur:[hs,hf,k,s] or "spectrum", halo:[a,b], n:{s,cn,aur}}), each shade
{h:[hs,hf,k,s], g:gamma} or null; cp: the family's pastel is the clear crystal itself; cn: the clear crystal's own night.
    python3 -I patch_r292_fam.py <r292.js or a built copy> [--capture]"""
import sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(a, b, n=1):
    global s
    c = s.count(a)
    if c != n:
        sys.exit("r292: expected %d, found %d: %r" % (n, c, a[:100]))
    s = s.replace(a, b)


if "uFh" in s:
    sys.exit("r292 already has the families")
GAT = ('"vec3 yiq(vec3 c){return vec3(dot(c,vec3(0.299,0.587,0.114)),dot(c,vec3(0.596,-0.274,-0.322)),dot(c,vec3(0.211,-0.523,0.312)));}",\n'
       '  "vec3 rgbq(vec3 q){return vec3(q.x+0.956171*q.y+0.621433*q.z,q.x-0.272689*q.y-0.646813*q.z,q.x-1.103744*q.y+1.700623*q.z);}",\n'
       '  "vec3 gat(vec3 c,vec4 h,float g){vec3 q=yiq(c);float C=length(q.yz);float a=C>1e-5?atan(q.z,q.y):h.x;float d=a-h.x;d-=6.2831853*floor((d+3.14159265)/6.2831853);float na=h.y+d*h.z;C*=h.w;return rgbq(vec3(pow(max(q.x,0.0),g),C*cos(na),C*sin(na)));}",\n'
       '  "vec3 rainbow(float h){return clamp(vec3(abs(h*6.0-3.0)-1.0,2.0-abs(h*6.0-2.0),2.0-abs(h*6.0-4.0)),0.0,1.0);}",\n'
       '  "vec3 aurx(vec3 c,float t){if(uAo<0.5)return c;if(uAo>1.5){vec3 q=yiq(c);float a=6.2831853*t,cs=cos(a),sn=sin(a);return max(rgbq(vec3(q.x,1.3*(q.y*cs-q.z*sn),1.3*(q.y*sn+q.z*cs))),0.0);}return max(gat(c,uAh,1.0),0.0);}",\n')
# the stone's shader
rep('uniform vec4 uCu,uEn;', 'uniform vec4 uCu,uEn,uFh,uAh;uniform vec2 uFm;uniform float uAo,uCl;')
rep('  "const float IOR=2.42;",\n', '  "const float IOR=2.42;",\n  ' + GAT +
    '  "vec3 fam(vec3 c){return uFm.x<0.5?c:clamp(gat(c,uFh,uFm.y),0.0,1.0);}",\n')
rep('"vec3 hue(float h){vec3 s=spec(h*0.83);', '"vec3 hue0(float h){vec3 s=spec(h*0.83);if(uCl>0.5)return s;')
rep('"vec3 toH(vec3 w){', '"vec3 hue(float h){return fam(hue0(h));}",\n  "vec3 toH(vec3 w){')
rep('col=tm(col);}', 'col=fam(tm(col));}')
rep('c+=mix(vec3(0.42,0.22,0.92),vec3(0.80,0.42,0.97),0.5+0.5*sin(az*1.7+uT*0.07))*band*rays*0.8;}',
    'c+=aurx(mix(vec3(0.42,0.22,0.92),vec3(0.80,0.42,0.97),0.5+0.5*sin(az*1.7+uT*0.07)),az*0.159+0.5)*band*rays*0.8;}')
rep('col=col*(1.0-sa)+scl;a=a+sa*(1.0-a);}}', 'col=col*(1.0-sa)+scl;a=a+sa*(1.0-a);}col=aurx(col,v.x+uT*0.004);}')
# the clear crystal's own night: the night room without its violet, the lights in every colour, no violet over the stone
rep('vec3 c=uCu.a>0.0?mix(vec3(0.045', 'vec3 c=(uCu.a>0.0||uCl>0.5)?mix(vec3(0.045')
rep(':mix(vec3(0.42,0.22,0.92),vec3(0.80,0.42,0.97),0.5+0.5*sin(az*1.7+uT*0.07)))*band*rays*1.7*aw;',
    ':(uCl>0.5?mix(rainbow(fract(az*0.159+0.5+uT*0.004)),vec3(1.0),0.2):mix(vec3(0.42,0.22,0.92),vec3(0.80,0.42,0.97),0.5+0.5*sin(az*1.7+uT*0.07))))*band*rays*1.7*aw;')
rep('else if(uN>0.5||uV>2.5)col=mix(col,mix(vec3(l),vec3(0.62,0.40,1.0)*l*1.35,0.75),0.32);', 'else if(uCl<0.5&&(uN>0.5||uV>2.5))col=mix(col,mix(vec3(l),vec3(0.62,0.40,1.0)*l*1.35,0.75),0.32);')
rep('else if(uV>1.5)col=mix(col,vec3(0.68,0.42,1.0)*l*1.3,0.18);', 'else if(uCl<0.5&&uV>1.5)col=mix(col,vec3(0.68,0.42,1.0)*l*1.3,0.18);')
rep('"uT","uN","uV","uCu","uEn",', '"uT","uN","uV","uCu","uEn","uFh","uFm","uAh","uAo","uCl",')
rep('gl.uniform1f(U.uV,CU4[3]>0?0:Math.max(0,VAR));', 'gl.uniform1f(U.uV,CU4[3]>0?0:vNow());')
rep('gl.uniform4fv(U.uEn,new Float32Array(EN4));',
    'gl.uniform4fv(U.uEn,new Float32Array(EN4));var fm=famNow(nt),au=aurNow(nt);gl.uniform2fv(U.uFm,new Float32Array(fm?[1,fm.g]:[0,1]));gl.uniform4fv(U.uFh,new Float32Array(fm?fm.h:[0,0,1,1]));gl.uniform1f(U.uAo,au?(au==="spectrum"?2:1):0);gl.uniform4fv(U.uAh,new Float32Array(au&&au!=="spectrum"?au:[0,0,1,1]));gl.uniform1f(U.uCl,clNow(nt)?1:0);')
# the sky's own canvas
rep('"uniform float uT,uN,uAsp;uniform vec2 uRes;uniform vec4 uBox;",',
    '"uniform float uT,uN,uAsp;uniform vec2 uRes;uniform vec4 uBox;uniform vec4 uAh;uniform float uAo;",\n  ' + GAT.rstrip('\n').rstrip(',') + ',')
rep('"  gl_FragColor=vec4(min(col,vec3(a)),a);}"].join("\\n");', '"  col=aurx(col,v.x*0.85+uT*0.004);gl_FragColor=vec4(min(col,vec3(a)),a);}"].join("\\n");')
rep('["uT","uN","uAsp","uRes","uBox"].forEach(function(n){BG.U[n]=g.getUniformLocation(p,n);});',
    '["uT","uN","uAsp","uRes","uBox","uAh","uAo"].forEach(function(n){BG.U[n]=g.getUniformLocation(p,n);});')
rep('g.uniform4f(BG.U.uBox,BG.box[0],BG.box[1],BG.box[2],BG.box[3]);',
    'g.uniform4f(BG.U.uBox,BG.box[0],BG.box[1],BG.box[2],BG.box[3]);var au=aurNow(nt);g.uniform1f(BG.U.uAo,au?(au==="spectrum"?2:1):0);g.uniform4fv(BG.U.uAh,new Float32Array(au&&au!=="spectrum"?au:[0,0,1,1]));')
rep('  function byHour(d){',
    '''  /* 7.31 (her words, 17 November 2026: "I want for every colour shade to come with their 4 variations so that the diamond has a proper
     night mode look to match and accompany it if I choose to change the colour from purple to another colour. I want you to give the
     diamond, the same treatment as the sticky notes"; and "I also want the northern lights to change colours to better complement the
     new diamond colours when they are selected on the page, instead of only using the purple hues for every shade"): a family dresses
     the four purple looks in its colour, a shade for each, and the night theme shows its night shade; the northern lights take its hue.
     And (her words, the same day): "I also want the option to keep the clear crystal and have its own Night mode look. It should have the
     full colour spectrum for the Northern lights since that makes the most sense", then "No I prefer the stone as a black diamond on
     Night mode, it is the best look for it and its natural opposite": the clear crystal's own night (cn), a black diamond, its lights
     in every colour ("spectrum").
     Set by modules/r314.js; with none, every look and the sky are as before. */
  var FAM=null;
  function sh1(x){return x&&x.h&&x.h.length===4?{h:x.h.slice(),g:+x.g||1}:null;}
  function au1(a){return a==="spectrum"?"spectrum":a&&a.length===4?a.slice():null;}
  function family(o){if(!o||!o.s||o.s.length<4){FAM=null;}else{FAM={cp:!!o.cp,cn:!!o.cn,aur:au1(o.aur),s:o.s.map(sh1),
      /* a night look of its own choosing (her words: "I like the silver diamond look on dark mode too ... please also add it as an option
         for Night mode look for the diamond"): the black or the silver diamond by night, whatever the stone by day */
      n:o.n?{s:sh1(o.n.s),cn:!!o.n.cn,aur:au1(o.n.aur)}:null};}
    if(!(CU4[3]>0))HALO=FAM&&o.halo&&o.halo.length===2?o.halo.slice():["106,63,181","122,84,204"];kick();}
  function vNow(){var v=Math.max(0,VAR);return FAM&&FAM.cp&&v===1?0:v;}
  function famNow(nt){if(!FAM||CU4[3]>0)return null;if(nt)return FAM.n?FAM.n.s:FAM.s[3];var v=vNow();return v?FAM.s[v-1]:null;}
  function aurNow(nt){return FAM&&!(CU4[3]>0)?(nt&&FAM.n?FAM.n.aur:FAM.aur):null;}
  function clNow(nt){return !!(FAM&&nt&&!(CU4[3]>0)&&(FAM.n?FAM.n.cn:FAM.cn));}
  function byHour(d){''')
rep('return {mount:mount,kick:kick,theme:kick,tint:tint,', 'return {mount:mount,kick:kick,theme:kick,tint:tint,family:family,fam:function(){return FAM?JSON.parse(JSON.stringify(FAM)):null;},')
rep('W.IngDiamond={on:on,variant:function(v){Diamond.variant(v);},tint:function(o){Diamond.tint(o);},',
    'W.IngDiamond={on:on,variant:function(v){Diamond.variant(v);},tint:function(o){Diamond.tint(o);},family:function(o){Diamond.family(o);},fam:function(){return Diamond.fam();},')
if "--capture" in sys.argv:
    rep('YV*=Math.exp(-dt/1.8);', 'YV*=Math.exp(-dt/1.8);if(W.__yawFix!=null)yaw=W.__yawFix;')
open(p, "w", encoding="utf-8").write(s)
print("r292 families in", p)
