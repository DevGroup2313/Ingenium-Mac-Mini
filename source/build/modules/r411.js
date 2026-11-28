<script>try{(window.__ingParts=window.__ingParts||{})["p411"]="started";}catch(_){}
/* ============ R411 · NATURE SOUNDS: WINTER, AND MORE (Ingenium 8.08 and 8.09, 28 November 2026) ============
   Her words (28 November 2026): "there are some sounds missing from Ingenium. I want more winter sounds added to the nature sounds of
   Ingenium, I want to hear some snow sounds as well. I want more nature sounds added to the app in general to the app." Six samples were
   made to the measure of the ones she loves (Forest, Brook, Pond at dusk, Autumn wind, Noel). Her words on them: "For the Winter Sounds, I
   like Snowy pines and Winter cabin, I hate the Fresh snow one. I like the Rain on a tent one but it could be improved to sound more
   natural right now it sounds like something is drowning." (8.08: Snowy pines and Winter cabin.) Then: "All of the Winter Sounds sound
   primitive and a bit worse please redo it."; "I like the Night woods sound from the preview, please add it to the app"; and of the last
   samples (source/previews/winter_sounds): "I approve of the previews, please commit and push it everywhere". So, in 8.09:
     Winter: Snowy pines made again (the pines' soughing rises a little in pitch as the wind rises and drifts across the trees; snow lets go
       of a branch, which springs back with a soft rustle, falls without a sound, lands with a muffled thump, and fine powder sifts after
       it; a woodpecker drums far off), Winter cabin made again (the fire's flames flickering, Campfire's crackles and pops, sap hissing now
       and then, a log settling; outside, the wind through the walls with a soft howl that rises and falls in pitch; fine snow at the
       window in the gusts), both in a smooth, dense space (eight delay lines mixed, each a little darker on every pass) in place of the
       small echo's metallic ring;
     Night: Night woods (a night breeze in the trees, a stream far off, an owl now and then);
     Rain: Rain on a tent made again (no drop rings a note now, the low falling notes that drowned it are gone: soft, dry taps on the
       canvas with the cloth's small thump, the rain outside as Light rain's, a few drops from the tent's edge, heavier drops from the trees);
     Water: Lake shore (small waves lapping on a pebble shore: each meets the stones, washes up and draws back over them).
   8.10: her words on the 8.09 pair: "The Lake shore splash sounds horrible"; "the Rain on a tent sound too harsh and fake, it sounds like
   popcorn or kringling sound"; then, on their next samples: "The rain on a tent sounds amazing, please reduce the crackling effect on it a
   little bit because it sounds like static"; "I don't like sharp the wave sounds, please make it sound more like proper waves on a shore";
   and: "It sounds much better now, please add it to the app and push it everywhere!" So Lake shore's waves are long and slow, gathering low,
   breaking softly into a rolling wash, drawing back in a long quiet hiss; Rain on a tent is a dense, soft pitter-patter of rounded taps on
   the cloth, heavier drops as soft thumps.
   Each is made on this device the first time it is chosen, sample by sample, with r295's kit (nothing is fetched or stored), in about
   two seconds. */
(function(){"use strict";
var W=window;if(W.__r411)return;W.__r411=1;
/*R411_DEFS_START*/
function defs(K){
  var PI2=2*Math.PI;
  function note(B,t0,dur,f,amp,pan,o){o=o||{};var i0=Math.floor(t0*B.sr),len=Math.floor(dur*B.sr),ph=0,h2=o.h2==null?0.12:o.h2,h3=o.h3||0,at=o.at||0.18,lp=o.lp||null,fm=o.fm||0,fmr=o.fmr||0;
    for(var j=0;j<len&&i0+j<B.n;j++){if(i0+j<0)continue;var u=j/len,fr=f(u)*(1+fm*Math.sin(PI2*fmr*j/B.sr));ph+=PI2*fr/B.sr;
      var e=u<at?Math.sin(Math.PI/2*u/at):Math.pow(Math.cos(Math.PI/2*(u-at)/(1-at)),1.4);
      var x=(Math.sin(ph)+h2*Math.sin(2*ph)+h3*Math.sin(3*ph))*amp*e;if(lp)x=lp(x);B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  function glide(a,b,shape){return function(u){var s=shape==="up"?u*u:shape==="dn"?1-(1-u)*(1-u):shape==="arc"?Math.sin(Math.PI*u):u;return a+(b-a)*s;};}
  function grain(B,t0,dur,amp,pan,filt,r,tau){var i0=Math.floor(t0*B.sr),len=Math.max(1,Math.floor(dur*B.sr)),tt=len*(tau||0.3);if(pan<0)pan=0;if(pan>1)pan=1;
    for(var j=0;j<len&&i0+j<B.n;j++){if(i0+j<0)continue;var x=filt(r()*2-1)*amp*Math.min(1,j/(B.sr*0.0004))*Math.exp(-j/tt);B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  function ping(B,t0,f0,rise,tau,amp,pan){var i0=Math.floor(t0*B.sr),len=Math.floor(tau*5*B.sr),ph=0;if(pan<0)pan=0;if(pan>1)pan=1;
    for(var j=0;j<len&&i0+j<B.n;j++){var u=j/len;ph+=PI2*f0*(1+(rise-1)*u)/B.sr;var x=Math.sin(ph)*amp*Math.min(1,j/(B.sr*0.001))*Math.exp(-j/(tau*B.sr));B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  function drift(r,sec,rate,sr){var pts=[],n=Math.ceil(sec*rate)+2,k;for(k=0;k<n;k++)pts.push(r());pts[n-1]=pts[0];pts[n-2]=pts[1];
    return function(i){var x=i/sr*rate,a=Math.floor(x),f=x-a,p=pts[a%n],q=pts[(a+1)%n];return p+(q-p)*(0.5-0.5*Math.cos(Math.PI*f));};}
  function bed(B,gen,filts,amp,mod){for(var i=0;i<B.n;i++){var m=mod?mod(i):1,xl=gen[0](),xr=gen[1]();for(var f=0;f<filts.length;f++){xl=filts[f][0](xl);xr=filts[f][1](xr);}B.L[i]+=xl*amp*m;B.R[i]+=xr*amp*m;}}
  function pair(type,f,Q,sr){return [K.biq(type,f,Q,sr),K.biq(type,f,Q,sr)];}
  /* a swell of filtered noise: quick to rise (att, a share of its length), slow to die away; a wave meeting stones, snow sliding */
  function swell(B,t0,dur,amp,pan,filt,r,att){var i0=Math.floor(t0*B.sr),len=Math.max(1,Math.floor(dur*B.sr)),A=att||0.2;if(pan<0)pan=0;if(pan>1)pan=1;
    for(var j=0;j<len&&i0+j<B.n;j++){if(i0+j<0)continue;var u=j/len,e=u<A?Math.sin(Math.PI/2*u/A):Math.pow(Math.cos(Math.PI/2*(u-A)/(1-A)),1.6);var x=filt(r()*2-1)*amp*e;B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  /* a soft low thud, felt more than heard: snow packing down, a clump landing, a log settling */
  function thud(B,t0,dur,amp,pan,filt,r){var i0=Math.floor(t0*B.sr),len=Math.max(1,Math.floor(dur*B.sr));if(pan<0)pan=0;if(pan>1)pan=1;
    for(var j=0;j<len&&i0+j<B.n;j++){if(i0+j<0)continue;var u=j/len,e=Math.sin(Math.PI/2*Math.min(1,u*5))*Math.pow(1-u,2.2);var x=filt(r()*2-1)*amp*e;B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  /* a slow curve worked out once every 16 samples, read in between along a straight line: the same curve, at a fraction of the cost */
  function slow(fn,B){var M=(B.n>>4)+2,T=new Float32Array(M);for(var k=0;k<M;k++)T[k]=fn(Math.min(B.n-1,k<<4));return function(i){var k=i>>4;return T[k]+(T[k+1]-T[k])*(i&15)*0.0625;};}
  /* a band of noise whose middle moves (a state-variable filter): wind that rises in pitch as it rises in strength */
  function svf(){var lo=0,bd=0;return function(x,f,q){var hi=x-lo-bd*q;bd+=f*hi;lo+=f*bd;return bd;};}
  function svk(fc,sr){return 2*Math.sin(Math.PI*Math.min(fc,sr/6)/sr);}
  /* a muffled low thump: quick to land, soon gone */
  function pumf(B,t0,amp,pan,fc,tau,r){var sr=B.sr,i0=Math.floor(t0*sr),len=Math.floor(tau*6*sr),lp=K.biq("lp",fc,0.7,sr),lp2=K.biq("lp",fc,0.7,sr);if(pan<0)pan=0;if(pan>1)pan=1;
    for(var j=0;j<len&&i0+j<B.n;j++){if(i0+j<0)continue;var e=Math.min(1,j/(sr*0.006))*Math.exp(-j/(tau*sr)),x=lp2(lp(r()*2-1))*amp*e;B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  /* a smooth, dense room or wood (eight delay lines mixed, each a little darker on every pass), in place of the small echo's metallic ring */
  function room(B,wet,t60,damp,size,pre){var sr=B.sr,base=[1051,1171,1289,1427,1559,1693,1811,1949],Ls=base.map(function(b){return Math.max(64,Math.floor(b*size*sr/44100));}),
      G=Ls.map(function(l){return Math.pow(10,-3*l/(sr*t60));}),dm=1-damp,s=1/Math.sqrt(8),hw=wet*0.5,
      b0=new Float32Array(Ls[0]),b1=new Float32Array(Ls[1]),b2=new Float32Array(Ls[2]),b3=new Float32Array(Ls[3]),b4=new Float32Array(Ls[4]),b5=new Float32Array(Ls[5]),b6=new Float32Array(Ls[6]),b7=new Float32Array(Ls[7]),
      n0=Ls[0],n1=Ls[1],n2=Ls[2],n3=Ls[3],n4=Ls[4],n5=Ls[5],n6=Ls[6],n7=Ls[7],g0=G[0],g1=G[1],g2=G[2],g3=G[3],g4=G[4],g5=G[5],g6=G[6],g7=G[7],
      i0=0,i1=0,i2=0,i3=0,i4=0,i5=0,i6=0,i7=0,l0=0,l1=0,l2=0,l3=0,l4=0,l5=0,l6=0,l7=0,pd=Math.max(1,Math.floor((pre||0.015)*sr)),pb=new Float32Array(pd),pi=0,BL=B.L,BR=B.R,N=B.n;
    for(var n=0;n<N;n++){var d=pb[pi]*0.35;pb[pi]=(BL[n]+BR[n])*0.5;if(++pi>=pd)pi=0;
      var v0=b0[i0],v1=b1[i1],v2=b2[i2],v3=b3[i3],v4=b4[i4],v5=b5[i5],v6=b6[i6],v7=b7[i7];
      l0=v0*dm+l0*damp;l1=v1*dm+l1*damp;l2=v2*dm+l2*damp;l3=v3*dm+l3*damp;l4=v4*dm+l4*damp;l5=v5*dm+l5*damp;l6=v6*dm+l6*damp;l7=v7*dm+l7*damp;
      var x0=l0*g0,x1=l1*g1,x2=l2*g2,x3=l3*g3,x4=l4*g4,x5=l5*g5,x6=l6*g6,x7=l7*g7;
      var a0=x0+x1,a1=x0-x1,a2=x2+x3,a3=x2-x3,a4=x4+x5,a5=x4-x5,a6=x6+x7,a7=x6-x7,c0=a0+a2,c1=a1+a3,c2=a0-a2,c3=a1-a3,c4=a4+a6,c5=a5+a7,c6=a4-a6,c7=a5-a7;
      b0[i0]=(c0+c4)*s+d;b1[i1]=(c1+c5)*s-d;b2[i2]=(c2+c6)*s+d;b3[i3]=(c3+c7)*s-d;b4[i4]=(c0-c4)*s-d;b5[i5]=(c1-c5)*s+d;b6[i6]=(c2-c6)*s-d;b7[i7]=(c3-c7)*s+d;
      if(++i0>=n0)i0=0;if(++i1>=n1)i1=0;if(++i2>=n2)i2=0;if(++i3>=n3)i3=0;if(++i4>=n4)i4=0;if(++i5>=n5)i5=0;if(++i6>=n6)i6=0;if(++i7>=n7)i7=0;
      BL[n]+=(v0+v2+v4+v6)*hw;BR[n]+=(v1+v3+v5+v7)*hw;}}
  /* a woodpecker far off, drumming, as Forest's (which she loves), softer */
  function woodpecker(B,r,td,p,a){var sr=B.sr,n=14+Math.floor(r()*7),rate=15+r()*5;for(var q=0;q<n;q++){var A=a*(1-q/n*0.5);grain(B,td+q/rate,0.006,A,p,K.biq("bp",900+r()*200,2.2,sr),r,0.4);ping(B,td+q/rate,620+r()*80,0.97,0.006,A*0.35,p);}}

  /* ----- Snowy pines, made again. Her word on the first: "All of the Winter Sounds sound primitive and a bit worse please redo it." So:
     the pines' soughing rises a little in pitch as the wind rises and drifts across the trees, over the wood's low hush, falling nearly
     still between gusts; snow lets go of a branch (the branch springs back with a soft rustle), falls without a sound, lands with a
     muffled thump, and fine powder sifts down after it; a woodpecker drums far off; all of it in a wide, soft wood ----- */
  function clump(B,r,t,pan,a,far){var sr=B.sr,k,lpF=K.biq("lp",far?2600:4200,0.7,sr);
    swell(B,t,0.28+r()*0.12,0.022*a,pan+(r()-0.5)*0.1,function(x){return lpF(x);},r,0.15);   /* the branch springs back: needles brushing */
    var tl=t+0.38+r()*0.42;                                                                 /* the clump falls without a sound */
    pumf(B,tl,0.55*a,pan,far?150:200,0.07,r);                                                /* and lands in the snow below */
    grain(B,tl,0.05,0.05*a,pan,K.biq("bp",800+r()*400,0.8,sr),r,0.35);
    for(k=0;k<10;k++)grain(B,tl+r()*0.06,0.001+r()*0.002,0.018*a*r(),pan+(r()-0.5)*0.15,K.biq("bp",1200+r()*1300,1.2,sr),r,0.35);
    var n=70+Math.floor(r()*60);for(k=0;k<n;k++){var u=Math.pow(r(),1.6);grain(B,t+0.05+u*(1.4+r()*0.8),0.001+r()*0.0025,0.007*a*Math.pow(1-u,1.2)*(0.4+0.6*r()),pan+(r()-0.5)*0.3,function(x){return lpF(x);},r,0.35);}}
  function pines(){var sec=56,B=K.mk(sec),sr=B.sr,r=K.rnd(9101),g=drift(r,sec,0.09,sr),g2=drift(r,sec,0.23,sr),pd=drift(r,sec,0.05,sr),
      gust=slow(function(i){var v=g(i);return v*v*(0.85+0.15*g2(i));},B),pan=slow(pd,B),i,k;
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",300,0.6,sr),pair("hp",40,0.7,sr)],0.05,function(i){return 0.4+0.6*gust(i);});
    var fa=svf(),fb=svf(),fc2=K.biq("lp",3000,0.6,sr),fd=K.biq("lp",3000,0.6,sr),fcc=0;
    var kA=0,kB=0,qq=1/0.85;for(i=0;i<B.n;i++){var w=gust(i);if((i&31)===0){fcc=620+760*w;kA=svk(fcc,sr);kB=svk(fcc*1.06,sr);}var p=0.3+0.4*pan(i),A=0.05*(0.13+0.87*w);
      var xl=fc2(fa(r()*2-1,kA,qq))*A,xr=fd(fb(r()*2-1,kB,qq))*A;B.L[i]+=xl*(1.25-p);B.R[i]+=xr*(0.25+p);}
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("bp",2300,0.6,sr),pair("lp",4500,0.6,sr)],0.010,function(i){var w=gust(i);return w*w;});
    var t=4+r()*3;while(t<sec-4){var far=r()<0.4;clump(B,r,t,0.15+0.7*r(),far?0.55:0.85+0.3*r(),far);t+=8+r()*9;}
    woodpecker(B,r,20+r()*8,0.2+0.6*r(),0.035);
    room(B,0.34,2.6,0.45,1.0,0.02);return K.finish(B,2.0,-3);}

  /* ----- Winter cabin, made again: the fire in the hearth, its flames flickering, Campfire's crackles and pops, sap hissing now and then,
     a log settling; outside, the wind through the walls with a soft howl that rises and falls in pitch; fine snow at the window in the
     gusts; all of it in a small wooden room ----- */
  function cabin(){var sec=48,B=K.mk(sec),sr=B.sr,r=K.rnd(4421),w=drift(r,sec,0.08,sr),w2=drift(r,sec,0.21,sr),fl=drift(r,sec,6,sr),fl2=drift(r,sec,2.2,sr),
      gust=slow(function(i){var v=w(i);return v*v*(0.8+0.2*w2(i));},B),fz=slow(function(i){return 0.35+0.65*Math.pow(fl(i),1.5)*(0.6+0.4*fl2(i));},B),i,k;
    /* outside, through the walls: a low body and a soft howl */
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",170,0.6,sr),pair("hp",30,0.7,sr)],0.05,function(i){return 0.25+0.75*gust(i);});
    var ha=svf(),hl=K.biq("lp",900,0.6,sr),fcc=0;
    var kH=0,qh=1/3.2;for(i=0;i<B.n;i++){var gw=gust(i);if((i&31)===0)kH=svk(240+300*gw,sr);var x=hl(ha(r()*2-1,kH,qh))*0.05*Math.pow(gw,1.6);B.L[i]+=x*0.7;B.R[i]+=x*0.3;}
    /* the fire: a soft roar, and the flames lapping, flickering */
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",150,0.6,sr),pair("hp",35,0.7,sr)],0.035,null);
    var fA=K.biq("bp",520,0.7,sr),fB=K.biq("bp",540,0.7,sr),fl3=K.biq("lp",1400,0.6,sr),fl4=K.biq("lp",1400,0.6,sr);
    for(i=0;i<B.n;i++){var m=fz(i);B.L[i]+=fl3(fA(r()*2-1))*0.05*m*0.45;B.R[i]+=fl4(fB(r()*2-1))*0.05*m*0.55;}
    /* Campfire's crackles and pops, as she loves them, a little softer, in the room */
    var t=0;while(t<sec){t+=-Math.log(1-r())/7;var run=1+Math.floor(Math.pow(r(),2)*7),p=0.48+r()*0.16;
      for(var q=0;q<run;q++)grain(B,t+q*(0.006+r()*0.03),0.0006+r()*0.0016,Math.pow(r(),2.4)*0.38,p+(r()-0.5)*0.06,K.biq("hp",1300+r()*1600,0.7,sr),r,0.35);}
    for(k=0;k<sec*1.0;k++)grain(B,r()*sec,0.012+r()*0.02,0.08+r()*0.13,0.45+r()*0.2,K.biq("bp",380+r()*620,1.4,sr),r,0.3);
    /* sap hissing, now and then */
    for(k=0;k<3;k++){var th=4+r()*(sec-10);swell(B,th,0.9+r()*0.8,0.0042,0.55,K.biq("bp",3200+r()*1500,2,sr),r,0.3);}
    /* a log settling */
    [12+r()*6,31+r()*6].forEach(function(tl){pumf(B,tl,0.3,0.55,230,0.09,r);for(var q2=0;q2<14;q2++)grain(B,tl+0.05+q2*(0.02+r()*0.05),0.0008+r()*0.0015,0.22*Math.pow(r(),1.5),0.5+r()*0.12,K.biq("hp",1500+r()*1500,0.7,sr),r,0.35);});
    /* fine snow at the window in the gusts */
    var ts=0;while(ts<sec){var gi=gust(Math.floor(ts*sr));ts+=-Math.log(1-r())/(1.2+26*gi*gi);grain(B,ts,0.0008+r()*0.0015,0.004*gi*Math.pow(r(),1.4),0.12+r()*0.12,K.biq("bp",2600+r()*1800,1.4,sr),r,0.35);}
    room(B,0.2,0.75,0.5,0.42,0.008);var zl=K.biq("lp",11000,0.6,sr),zr=K.biq("lp",11000,0.6,sr);for(i=0;i<B.n;i++){B.L[i]=zl(B.L[i]);B.R[i]=zr(B.R[i]);}return K.finish(B,1.5,-2);}

  /* a soft grain: it rises over att seconds instead of clicking on, then dies away; drops that blend, never pop */
  function soft(B,t0,dur,amp,pan,filt,r,att){var sr=B.sr,i0=Math.floor(t0*sr),len=Math.max(2,Math.floor(dur*sr)),A=Math.max(1,Math.floor((att||0.002)*sr)),tt=(len-A)*0.35;if(pan<0)pan=0;if(pan>1)pan=1;
    for(var j=0;j<len&&i0+j<B.n;j++){if(i0+j<0)continue;var e=j<A?Math.sin(Math.PI/2*j/A):Math.exp(-(j-A)/tt);var x=filt(r()*2-1)*amp*e;B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  /* ----- Lake shore, made a third time. Her word: "it sounds better but I don't like sharp the wave sounds, please make it sound more like
     proper waves on a shore". So each wave is long and slow: it gathers as a low swell, breaks softly into a rolling wash that rises and
     falls over two or three seconds, and draws back over the pebbles in a long, quiet hiss; waves overlap as they do on a shore ----- */
  function wave(B,r,t,pan,a){var sr=B.sr,d=2.4+r()*1.2;
    var l1=K.biq("lp",320+r()*80,0.7,sr),l2=K.biq("lp",360,0.7,sr);swell(B,t,d,0.12*a,pan,function(x){return l2(l1(x));},r,0.5);
    var b1=K.biq("bp",700+r()*250,0.5,sr),b2=K.biq("lp",1600,0.6,sr);swell(B,t+d*0.35,d*1.1,0.042*a,pan+0.05,function(x){return b2(b1(x));},r,0.45);
    var f1=K.biq("bp",1600+r()*600,0.5,sr),f2=K.biq("lp",4000,0.6,sr);swell(B,t+d*0.7,2.2+r()*1.0,0.019*a,pan-0.05,function(x){return f2(f1(x));},r,0.35);}
  function lake(){var sec=48,B=K.mk(sec),sr=B.sr,r=K.rnd(5557),g=drift(r,sec,0.1,sr);
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",260,0.6,sr),pair("hp",35,0.7,sr)],0.045,function(i){return 0.7+0.3*g(i);});
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("bp",500,0.5,sr),pair("lp",1200,0.6,sr)],0.005,function(i){return 0.4+0.6*g(i);});
    var t=0.8;while(t<sec-3.5){wave(B,r,t,0.3+0.4*r(),0.75+0.25*r());t+=3.6+r()*2.6;}
    room(B,0.3,2.0,0.6,1.0,0.025);return K.finish(B,2.0,-2);}
  /* ----- Rain on a tent, made a third time. Her word: "too harsh and fake, it sounds like popcorn or kringling sound". So the patter is many
     times denser and each drop far softer: a dull, rounded tap that rises instead of clicking on, so the drops blend into one pitter-patter on
     the cloth; heavier drops from the trees fall as soft thumps; the rain outside as Light rain's, low; a small, close space ----- */
  function tent(){var sec=30,B=K.mk(sec),sr=B.sr,r=K.rnd(6637),g=drift(r,sec,0.15,sr),k;
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",500,0.7,sr),pair("lp",2800,0.6,sr)],0.0075,function(i){return 0.75+0.25*g(i);});
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",180,0.6,sr),pair("hp",35,0.7,sr)],0.02,null);
    for(k=0;k<sec*140;k++){var a=0.4+0.6*Math.pow(r(),1.3),f=420+r()*480;soft(B,r()*sec,0.009+r()*0.011,0.05*a,0.1+r()*0.8,K.biq("lp",f,0.7,sr),r,0.0025+r()*0.0025);}
    var tb=3+r()*3;while(tb<sec-2){var n=3+Math.floor(r()*5);for(var q=0;q<n;q++)pumf(B,tb+r()*1.4,0.12+r()*0.08,0.2+r()*0.6,260+r()*80,0.03,r);tb+=7+r()*7;}
    room(B,0.16,0.5,0.55,0.35,0.004);return K.finish(B,1.0,-2);}
  /* ----- Night woods: a night breeze in the trees, a stream far off, an owl now and then ----- */
  function owl(B,r,t0,pan){var lp=K.biq("lp",850,0.7,B.sr),f=300+r()*30,seq=[[0,0.42],[0.62,0.16],[0.82,0.30],[1.5,0.34],[2.12,0.36]];
    seq.forEach(function(s,k){note(B,t0+s[0],s[1],glide(f*(k===1?1.06:1),f*0.93,"dn"),0.034*(k===1?0.8:1),pan,{h2:0.08,h3:0.02,at:0.25,lp:lp});});}
  function nightwoods(){var sec=48,B=K.mk(sec),sr=B.sr,r=K.rnd(7703),g=drift(r,sec,0.1,sr),gust=function(i){var v=g(i);return v*v;};
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",340,0.6,sr),pair("hp",40,0.7,sr)],0.06,function(i){return 0.3+0.7*gust(i);});
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("bp",880,0.55,sr),pair("lp",2400,0.6,sr)],0.013,function(i){return 0.1+0.9*gust(i);});
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("bp",700,0.6,sr),pair("lp",1500,0.6,sr)],0.009,null);
    var t=0;while(t<sec){t+=-Math.log(1-r())/6;ping(B,t,380*Math.pow(2,r()*1.3),1.2+r()*0.3,0.006+r()*0.01,0.003+r()*0.005,0.7+0.2*r());}
    var to=4+r()*3;while(to<sec-4){owl(B,r,to,0.2+0.25*r());to+=13+r()*7;}
    K.verb(B,0.32,0.86);return K.finish(B,1.5,-2);}

  return [
    {k:"pines",name:"Snowy pines",desc:"A soft wind in snowy pines, snow slipping from the branches now and then",group:"winter",make:pines},
    {k:"cabin",name:"Winter cabin",desc:"A fire in the hearth, the wind outside, fine snow brushing the window",group:"winter",make:cabin},
    {k:"lake",name:"Lake shore",desc:"Small waves lapping on a pebble shore",group:"water",make:lake},
    {k:"tent",name:"Rain on a tent",desc:"Soft rain on a tent, heavier drops falling from the trees",group:"rain",make:tent},
    {k:"nightwoods",name:"Night woods",desc:"A night breeze in the trees, a stream far off, an owl now and then",group:"night",make:nightwoods}];}
/*R411_DEFS_END*/
var ICONS={
  pines:'<path d="M8 3l3.6 6H9.8l3 5H3.2l3-5H4.4z"/><path d="M8 14v4"/><path d="M17 7l2.8 4.6h-1.4l2.4 4H13.2l2.4-4h-1.4z"/><path d="M17 15.6V19"/><path d="M3 21h18"/>',
  cabin:'<path d="M3.5 11L12 4.5l8.5 6.5"/><path d="M5.5 9.6V20h13V9.6"/><path d="M10 20v-4.5h4V20"/><path d="M16 6.3V3.5h2v4.3"/><circle cx="20.5" cy="14" r=".6"/><circle cx="3" cy="15.5" r=".6"/>',
  lake:'<path d="M2.5 13c2.3-1.5 4.7-1.5 7 0s4.7 1.5 7 0 3.5-1.2 5-.7"/><circle cx="6" cy="18" r="1.2"/><circle cx="10.5" cy="18.6" r="1"/><circle cx="15" cy="17.8" r="1.3"/><circle cx="19" cy="18.6" r=".9"/><path d="M5 8.5c1.5-1 3-1 4.5 0"/>',
  tent:'<path d="M12 4L3 19h18z"/><path d="M12 4v15"/><path d="M12 19l-3-5"/><path d="M5 5.5l-.8 1.8M8.5 3l-.8 1.8M19 4.5l-.8 1.8M16 2.5l-.8 1.8"/>',
  nightwoods:'<path d="M17.8 9.2A4.2 4.2 0 0 1 12.6 4a4.2 4.2 0 1 0 5.2 5.2z"/><path d="M6.5 9l3 5H7.9l2.4 4H2.7l2.4-4H3.5z"/><path d="M6.5 18v2.5"/><path d="M13 20.5h8"/>'
};
var GROUPS=[["water","Water"],["rain","Rain"],["day","Day"],["night","Night"],["winter","Winter"],["fire","Wind and fire"]];
var tries=0;
function go(){if(!W.IngNature||typeof IngNature.extend!=="function"||!W.__r363||!W.__r403||!W.__r404){if(++tries<160)setTimeout(go,250);return;}
  setTimeout(function(){IngNature.extend({places:defs,icons:ICONS,groups:GROUPS});},160);}
go();
try{window.__ingParts["p411"]="running";}catch(_){}
})();
</script>
