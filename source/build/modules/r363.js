<script>try{(window.__ingParts=window.__ingParts||{})["p363"]="started";}catch(_){}
/* ============ R363 · MORE NATURE SOUNDS (Ingenium 7.71, 23 November 2026; held until her word on what she hears) ============
   Her words (23 November 2026): "I want to expand the nature sounds system in Ingenium, I want more nature sounds added into the app. I
   want more day sounds like morning birds chirping, waterfalls, also light rain, heavy rain with thunder, and so much more, these sounds
   help calm my nervous system and are very soothing while I work, I want more choices added to Ingenium please."
   So ten more places beside the eight of 7.00 (r295), each made on this device the first time it is chosen, sample by sample, with
   r295's own kit (its filters, its noises, its tones and bursts, its little echo, its seamless loop and its calm, even loudness), so
   nothing is fetched or stored and each plays at the same level as the stream:
     Water: Brook (a brook babbling over stones), Cascade (a small waterfall close by, bright and splashing);
     Rain: Light rain (a light rain on leaves), Rainy window (rain on a window, heard from inside), Thunderstorm (heavy rain, with
       thunder rolling in the distance and once nearer);
     Day: Morning birds (a dawn chorus: robins, a blackbird, a chickadee, finches and a dove far off), Forest (leaves in a breeze,
       birds far off, a woodpecker now and then), Meadow (a summer meadow: grasshoppers, bees passing, a lark high above);
     Night: Pond at dusk (peepers, tree frogs and a bullfrog at a pond as evening falls);
     Wind and fire: Campfire (a fire crackling softly).
   The places are shown in five small groups (Water, Rain, Day, Night, Wind and fire) wherever they are chosen: the Display panel and
   Settings, Sound. Ingenium never starts one by itself, as before. */
(function(){"use strict";
var W=window;if(W.__r363)return;W.__r363=1;
/* ---------- the places, made with r295's kit (K): mk, rnd, biq, pinkGen, brownGen, verb, finish, burst, tone ---------- */
/*R363_DEFS_START*/
function defs(K){
  var PI2=2*Math.PI;
  /* a voiced note: its pitch follows f(u) over its length, a bell-shaped swell, a touch of its second and third partials */
  function note(B,t0,dur,f,amp,pan,o){o=o||{};var i0=Math.floor(t0*B.sr),len=Math.floor(dur*B.sr),ph=0,h2=o.h2==null?0.12:o.h2,h3=o.h3||0,at=o.at||0.18,lp=o.lp||null,fm=o.fm||0,fmr=o.fmr||0;
    for(var j=0;j<len&&i0+j<B.n;j++){if(i0+j<0)continue;var u=j/len,fr=f(u)*(1+fm*Math.sin(PI2*fmr*j/B.sr));ph+=PI2*fr/B.sr;
      var e=u<at?Math.sin(Math.PI/2*u/at):Math.pow(Math.cos(Math.PI/2*(u-at)/(1-at)),1.4);
      var x=(Math.sin(ph)+h2*Math.sin(2*ph)+h3*Math.sin(3*ph))*amp*e;if(lp)x=lp(x);B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  function glide(a,b,shape){return function(u){var s=shape==="up"?u*u:shape==="dn"?1-(1-u)*(1-u):shape==="arc"?Math.sin(Math.PI*u):u;return a+(b-a)*s;};}
  /* a filtered noise grain, its decay set by tau (a share of its length) */
  function grain(B,t0,dur,amp,pan,filt,r,tau){var i0=Math.floor(t0*B.sr),len=Math.max(1,Math.floor(dur*B.sr)),tt=len*(tau||0.3);
    for(var j=0;j<len&&i0+j<B.n;j++){var x=filt(r()*2-1)*amp*Math.min(1,j/(B.sr*0.0004))*Math.exp(-j/tt);B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  /* a small resonant ping: a drop on water or glass */
  function ping(B,t0,f0,rise,tau,amp,pan){var i0=Math.floor(t0*B.sr),len=Math.floor(tau*5*B.sr),ph=0;
    for(var j=0;j<len&&i0+j<B.n;j++){var u=j/len;ph+=PI2*f0*(1+(rise-1)*u)/B.sr;var x=Math.sin(ph)*amp*Math.min(1,j/(B.sr*0.001))*Math.exp(-j/(tau*B.sr));B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  /* a slow random line, smooth: for gusts and swells */
  function drift(r,sec,rate,sr){var pts=[],n=Math.ceil(sec*rate)+2,k;for(k=0;k<n;k++)pts.push(r());pts[n-1]=pts[0];pts[n-2]=pts[1];
    return function(i){var x=i/sr*rate,a=Math.floor(x),f=x-a,p=pts[a%n],q=pts[(a+1)%n];return p+(q-p)*(0.5-0.5*Math.cos(Math.PI*f));};}
  function bed(B,gen,filts,amp,mod){var sr=B.sr;for(var i=0;i<B.n;i++){var m=mod?mod(i):1,xl=gen[0](),xr=gen[1]();for(var f=0;f<filts.length;f++){xl=filts[f][0](xl);xr=filts[f][1](xr);}B.L[i]+=xl*amp*m;B.R[i]+=xr*amp*m;}}
  function pair(type,f,Q,sr){return [K.biq(type,f,Q,sr),K.biq(type,f,Q,sr)];}

  /* ----- birds, each with its own way of singing ----- */
  function robin(B,r,t0,pan,far){var n=5+Math.floor(r()*5),t=t0,a=far?0.035:0.085,lp=far?K.biq("lp",3400,0.7,B.sr):null;
    for(var k=0;k<n;k++){var d=0.07+r()*0.14,c=2300+r()*1500,sh=r(),f=sh<0.35?glide(c*0.82,c*1.18,"up"):sh<0.7?glide(c*1.2,c*0.85,"dn"):glide(c*0.9,c*1.25,"arc");
      note(B,t,d,f,a*(0.7+0.3*r()),pan,{h2:0.15,fm:0.035,fmr:42+r()*25,lp:lp});t+=d+0.035+r()*0.07;}return t;}
  function blackbird(B,r,t0,pan,far){var n=4+Math.floor(r()*4),t=t0,a=far?0.03:0.075,lp=K.biq("lp",far?2600:4200,0.7,B.sr);
    for(var k=0;k<n;k++){var d=0.12+r()*0.20,c=1500+r()*1200,f=r()<0.5?glide(c,c*(0.86+r()*0.3),"arc"):glide(c*0.92,c*1.12,"dn");
      note(B,t,d,f,a*(0.75+0.25*r()),pan,{h2:0.05,fm:0.012,fmr:6.5,at:0.25,lp:lp});t+=d+0.05+r()*0.08;}
    var m=3+Math.floor(r()*3);for(k=0;k<m;k++){var c2=4300+r()*1600;note(B,t,0.03,glide(c2,c2*0.8,"dn"),a*0.45,pan,{h2:0.1,lp:lp});t+=0.045;}return t;}
  function chickadee(B,r,t0,pan,far){var a=far?0.03:0.065,lp=far?K.biq("lp",4200,0.7,B.sr):null;
    note(B,t0,0.36,glide(3980,3900,"dn"),a,pan,{h2:0.04,at:0.12,lp:lp});note(B,t0+0.5,0.42,glide(3420,3300,"dn"),a*0.9,pan,{h2:0.04,at:0.12,lp:lp,fm:0.01,fmr:9});return t0+1.0;}
  function finch(B,r,t0,pan,far){var n=12+Math.floor(r()*9),gap=0.045+r()*0.02,a=far?0.028:0.06,f0=5200+r()*900,lp=far?K.biq("lp",4600,0.7,B.sr):null,t=t0;
    for(var k=0;k<n;k++){note(B,t,0.028,glide(f0,f0*0.7,"dn"),a*(0.6+0.4*Math.sin(Math.PI*k/n)),pan,{h2:0.1,at:0.1,lp:lp});t+=gap;}
    var c=3600+r()*600;note(B,t+0.04,0.11,glide(c,c*1.3,"up"),a,pan,{h2:0.12,lp:lp});return t+0.2;}
  function dove(B,r,t0,pan){var lp=K.biq("lp",1100,0.7,B.sr),a=0.05;
    note(B,t0,0.38,glide(560,640,"arc"),a,pan,{h2:0.02,at:0.3,lp:lp});note(B,t0+0.55,0.7,glide(650,540,"dn"),a*1.1,pan,{h2:0.02,at:0.2,lp:lp});
    note(B,t0+1.45,0.45,glide(560,520,"dn"),a*0.8,pan,{h2:0.02,at:0.3,lp:lp});note(B,t0+2.05,0.45,glide(560,520,"dn"),a*0.75,pan,{h2:0.02,at:0.3,lp:lp});return t0+2.6;}
  function lark(B,r,t0,len,pan){var t=t0,lp=K.biq("lp",6200,0.7,B.sr);while(t<t0+len){var d=0.03+r()*0.05,c=3600+r()*2600;note(B,t,d,glide(c,c*(0.75+r()*0.55),r()<0.5?"up":"dn"),0.014,pan,{h2:0.08,lp:lp});t+=d+0.01+r()*0.03;}}
  function farChorus(B,r,sec,rate,amp){var lp=K.biq("lp",3000,0.7,B.sr),t=0;while(t<sec){t+=-Math.log(1-r())/rate;var c=2600+r()*2600,d=0.03+r()*0.07;note(B,t,d,glide(c,c*(0.8+r()*0.4),"arc"),amp*(0.4+0.6*r()),0.1+0.8*r(),{h2:0.05,lp:lp});}}

  function dawn(){var sec=44,B=K.mk(sec),sr=B.sr,r=K.rnd(71);
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",250,0.6,sr),pair("lp",1600,0.6,sr)],0.014,drift(r,sec,0.12,sr));
    farChorus(B,r,sec,5,0.012);
    var singers=[robin,robin,blackbird,chickadee,finch,finch],pans=[0.22,0.78,0.38,0.66,0.12,0.9],next=[0.4,2.1,5.0,8.5,3.2,11.0];
    for(var s=0;s<singers.length;s++){var t=next[s];while(t<sec-2.5){var far=r()<0.35,end=singers[s](B,r,t,pans[s]+(r()-0.5)*0.12,far);t=end+(singers[s]===chickadee?6+r()*7:2.6+r()*4.5);}}
    var td=12+r()*6;while(td<sec-3){dove(B,r,td,0.55+r()*0.3);td+=16+r()*10;}
    K.verb(B,0.30,0.84);return K.finish(B,1.2,-1);}

  /* ----- rain ----- */
  function lightrain(){var sec=22,B=K.mk(sec),sr=B.sr,r=K.rnd(83),k;
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",600,0.7,sr),pair("lp",6000,0.6,sr)],0.030,drift(r,sec,0.2,sr));
    for(k=0;k<sec*34;k++)grain(B,r()*sec,0.002+r()*0.005,Math.pow(r(),2.4)*0.10,0.1+r()*0.8,K.biq("bp",1800+r()*4800,1.2,sr),r,0.3);
    for(k=0;k<sec*3;k++)ping(B,r()*sec,2100+r()*1900,1.25,0.008+r()*0.008,0.008+r()*0.02,0.1+r()*0.8);
    for(k=0;k<sec*0.6;k++){var t0=r()*sec,p=0.15+r()*0.7;grain(B,t0,0.012,0.05+r()*0.04,p,K.biq("bp",1100+r()*600,1.4,sr),r,0.35);ping(B,t0+0.004,520+r()*260,1.6,0.012,0.03,p);}
    K.verb(B,0.20,0.80);var sL=K.biq("lp",7000,0.6,sr),sR=K.biq("lp",7000,0.6,sr);for(var i=0;i<B.n;i++){B.L[i]=sL(B.L[i]);B.R[i]=sR(B.R[i]);}
    return K.finish(B,1.0,-2);}
  function window_(){var sec=26,B=K.mk(sec),sr=B.sr,r=K.rnd(89),k;
    /* outside: the rain, muffled by the glass */
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",140,0.7,sr),pair("lp",1300,0.6,sr)],0.11,drift(r,sec,0.15,sr));
    /* on the glass: small bright taps, some ringing a little */
    for(k=0;k<sec*16;k++)grain(B,r()*sec,0.003+r()*0.006,Math.pow(r(),2.2)*0.09,0.1+r()*0.8,K.biq("bp",2600+r()*3000,3.5,sr),r,0.45);
    for(k=0;k<sec*2;k++){var t0=r()*sec,p=0.1+r()*0.8;grain(B,t0,0.01,0.07+r()*0.05,p,K.biq("bp",1500+r()*900,2.5,sr),r,0.4);ping(B,t0+0.002,3200+r()*1600,1.0,0.006,0.012,p);}
    /* now and then a little runnel down the pane */
    for(k=0;k<4;k++){var ts=r()*(sec-6),dur=3+r()*3,p0=0.2+r()*0.6,t=ts;while(t<ts+dur){grain(B,t,0.002,0.012+r()*0.012,p0,K.biq("bp",3500+r()*2000,4,sr),r,0.5);t+=0.02+r()*0.03;}}
    K.verb(B,0.10,0.70);return K.finish(B,1.0,-1);}
  function thunder(B,r,t0,near){var sr=B.sr,D=near?9+r()*3:7+r()*4,i0=Math.floor(t0*sr),len=Math.floor(D*sr),b=K.brownGen(r),b2=K.brownGen(r),z1=0,z2=0,subs=[],k;
    var n=near?6:4;for(k=0;k<n;k++)subs.push({at:(k===0?0:r()*D*0.6)*sr,a:(k===0?1:0.4+r()*0.6),rise:(0.12+r()*0.5)*sr,dec:(1.2+r()*2.2)*sr});
    var A=near?0.85:0.5,pan=0.3+r()*0.4;
    for(var j=0;j<len&&i0+j<B.n;j++){var e=0;for(k=0;k<subs.length;k++){var u=j-subs[k].at;if(u<0)continue;e+=subs[k].a*(u<subs[k].rise?Math.pow(u/subs[k].rise,2):Math.exp(-(u-subs[k].rise)/subs[k].dec));}
      var fc=(near?1100:600)*Math.exp(-j/(sr*2.2))+110,c=1-Math.exp(-PI2*fc/sr);z1+=c*(b()-z1);z2+=c*(b2()-z2);var x=Math.tanh(e*0.9)*A;
      B.L[i0+j]+=z1*x*(1.15-pan);B.R[i0+j]+=z2*x*(0.15+pan);}
    if(near){grain(B,t0,0.16,0.55,pan,K.biq("bp",1900,0.6,sr),r,0.25);grain(B,t0+0.07,0.12,0.35,pan,K.biq("bp",1300,0.7,sr),r,0.3);}}
  function storm(){var sec=52,B=K.mk(sec),sr=B.sr,r=K.rnd(97),k,g=drift(r,sec,0.18,sr);
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",180,0.7,sr),pair("lp",8000,0.6,sr)],0.16,function(i){return 0.78+0.22*g(i);});
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",3500,0.7,sr)],0.035,function(i){return 0.7+0.3*g(i);});
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",320,0.6,sr)],0.07,function(i){return 0.6+0.4*g(i);});
    for(k=0;k<sec*320;k++)grain(B,r()*sec,0.002+r()*0.006,Math.pow(r(),2.6)*0.12,0.05+r()*0.9,K.biq("bp",1400+r()*5000,1.2,sr),r,0.3);
    for(k=0;k<sec*26;k++)grain(B,r()*sec,0.02+r()*0.04,0.03+Math.pow(r(),2)*0.07,r(),K.biq("bp",450+r()*900,1.6,sr),r,0.3);
    thunder(B,r,7+r()*3,false);thunder(B,r,27+r()*4,true);thunder(B,r,41+r()*2,false);
    K.verb(B,0.26,0.84);return K.finish(B,2.0,1);}

  /* ----- water ----- */
  function brook(){var sec=20,B=K.mk(sec),sr=B.sr,r=K.rnd(101),k,g=drift(r,sec,1.6,sr),g2=drift(r,sec,0.9,sr);
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("bp",1100,0.55,sr)],0.06,function(i){return 0.55+0.45*g(i);});
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",420,0.6,sr),pair("hp",70,0.7,sr)],0.06,function(i){return 0.7+0.3*g2(i);});
    var t=0;while(t<sec){t+=-Math.log(1-r())/75;var f0=420*Math.pow(2,r()*2.2),d=0.012+r()*0.04;ping(B,t,f0,1.25+r()*0.45,d/3,(0.010+Math.pow(r(),1.6)*0.045),0.1+r()*0.8);}
    for(k=0;k<sec*40;k++)grain(B,r()*sec,0.002+r()*0.004,Math.pow(r(),2.5)*0.04,r(),K.biq("bp",2500+r()*3500,1.0,sr),r,0.3);
    K.verb(B,0.22,0.80);return K.finish(B,1.0,0);}
  function cascade(){var sec=18,B=K.mk(sec),sr=B.sr,r=K.rnd(107),k,g=drift(r,sec,0.5,sr);
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",380,0.7,sr),pair("lp",9000,0.6,sr)],0.17,function(i){return 0.85+0.15*g(i);});
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",4200,0.7,sr)],0.05,null);
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("bp",380,0.7,sr)],0.30,function(i){return 0.8+0.2*g(i);});
    for(k=0;k<sec*220;k++)grain(B,r()*sec,0.002+r()*0.008,Math.pow(r(),2.2)*0.07,r(),K.biq("bp",900+r()*4500,1.1,sr),r,0.3);
    var t=0;while(t<sec){t+=-Math.log(1-r())/45;ping(B,t,300+r()*700,1.4+r()*0.4,0.008+r()*0.012,0.01+r()*0.03,r());}
    K.verb(B,0.28,0.82);return K.finish(B,1.2,0);}

  /* ----- day ----- */
  function forest(){var sec=40,B=K.mk(sec),sr=B.sr,r=K.rnd(113),k,g=drift(r,sec,0.13,sr),gust=function(i){var v=g(i);return v*v;};
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",380,0.6,sr),pair("hp",50,0.7,sr)],0.07,function(i){return 0.35+0.65*gust(i);});
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",2600,0.7,sr),pair("lp",8500,0.6,sr)],0.028,function(i){return 0.12+0.88*gust(i);});
    /* the leaves: small dry touches, more of them as the breeze rises */
    var t=0;while(t<sec){var gi=gust(Math.floor(t*sr));t+=-Math.log(1-r())/(20+260*gi);grain(B,t,0.001+r()*0.003,Math.pow(r(),2)*0.05*(0.3+gi),r(),K.biq("bp",2800+r()*4500,1.3,sr),r,0.35);}
    var tb=1.5;while(tb<sec-3){var f=r();if(f<0.45)robin(B,r,tb,0.15+0.7*r(),true);else if(f<0.75)blackbird(B,r,tb,0.15+0.7*r(),true);else chickadee(B,r,tb,0.15+0.7*r(),true);tb+=4+r()*6;}
    /* a woodpecker far off: one drum, then another a little later */
    [9+r()*4,26+r()*5].forEach(function(td){var n=14+Math.floor(r()*7),rate=15+r()*5,p=0.2+r()*0.6;for(var q=0;q<n;q++){var a=0.06*(1-q/n*0.5);
      grain(B,td+q/rate,0.006,a,p,K.biq("bp",900+r()*200,2.2,sr),r,0.4);ping(B,td+q/rate,620+r()*80,0.97,0.006,a*0.35,p);}});
    K.verb(B,0.32,0.84);return K.finish(B,1.5,-1);}
  function meadow(){var sec=36,B=K.mk(sec),sr=B.sr,r=K.rnd(127),k;
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",200,0.6,sr),pair("lp",1500,0.6,sr)],0.022,drift(r,sec,0.1,sr));
    /* grasshoppers: trains of dry pulses, high */
    for(var gh=0;gh<3;gh++){var p=0.15+gh*0.35+(r()-0.5)*0.1,t=r()*3,amp=0.016+r()*0.012,fc=6800+r()*1800,rate=30+r()*25;
      while(t<sec){var L=1+r()*2.5,e=t+L;while(t<e){grain(B,t,0.005,amp,p,K.biq("bp",fc,3,sr),r,0.4);t+=1/rate;}t+=1.2+r()*3.5;}}
    /* bees passing: a warm buzz that comes, crosses and goes */
    for(var bz=0;bz<3;bz++){var t0=2+bz*sec/3+r()*4,D=3.5+r()*2.5,f0=185+r()*45,dir=r()<0.5,i0=Math.floor(t0*sr),len=Math.floor(D*sr),ph=0,lp=K.biq("lp",1500,0.7,sr),lp2=K.biq("lp",1500,0.7,sr);
      for(var j=0;j<len&&i0+j<B.n;j++){var u=j/len,fr=f0*(1+0.035*Math.cos(Math.PI*u))+3*Math.sin(PI2*2.3*j/sr);ph+=PI2*fr/sr;var x=0;for(var h=1;h<=9;h++)x+=Math.sin(h*ph)/h;
        x*=0.03*Math.pow(Math.sin(Math.PI*u),2);var pn=dir?u:1-u;B.L[i0+j]+=lp(x*(1-pn));B.R[i0+j]+=lp2(x*pn);}}
    /* a lark high above, singing on and on, then resting */
    lark(B,r,4,9+r()*3,0.6);lark(B,r,22,8+r()*3,0.45);
    K.verb(B,0.14,0.78);return K.finish(B,1.2,-1);}

  /* ----- night ----- */
  function pond(){var sec=32,B=K.mk(sec),sr=B.sr,r=K.rnd(131),k;
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("lp",800,0.5,sr)],0.022,null);
    /* far crickets */
    for(var c=0;c<3;c++){var f=4300+r()*700,pn=r(),amp=0.008+r()*0.008,per=0.5+r()*0.4,t=r()*per;while(t<sec){for(var q=0;q<3;q++)K.tone(B,t+q*0.03,0.016,f,f,amp,pn,0,null);t+=per*(0.9+0.2*r());}}
    /* spring peepers: rising whistles, each its own pace */
    for(var pp=0;pp<6;pp++){var pn2=0.1+r()*0.8,far=r()<0.5,a=far?0.012:0.028,per2=0.8+r()*0.7,t2=r()*per2,lp=far?K.biq("lp",3000,0.7,sr):null;
      while(t2<sec){var f1=2650+r()*250;note(B,t2,0.11,glide(f1,f1*1.14,"up"),a,pn2,{h2:0.06,at:0.4,lp:lp});t2+=per2*(0.85+0.3*r());}}
    /* tree frogs: a two-part ribbit now and then */
    var tr=1.2;while(tr<sec-1){var pn3=0.15+r()*0.7;for(var rb=0;rb<2;rb++){var t3=tr+rb*0.2,i0=Math.floor(t3*sr),len=Math.floor(0.12*sr),ph=0;
        for(var j=0;j<len&&i0+j<B.n;j++){var u=j/len;ph+=PI2*(1600+300*u)/sr;var x=Math.sin(ph)*(0.5+0.5*Math.sign(Math.sin(PI2*90*j/sr)))*0.03*Math.sin(Math.PI*u);B.L[i0+j]+=x*(1-pn3);B.R[i0+j]+=x*pn3;}}
      tr+=2.2+r()*3.5;}
    /* a bullfrog, deep, every so often */
    var tb=5+r()*3;while(tb<sec-2){var pb=0.3+r()*0.4,n=2+Math.floor(r()*2);for(var bb=0;bb<n;bb++){var t4=tb+bb*1.0,i1=Math.floor(t4*sr),len2=Math.floor((0.55+r()*0.25)*sr),ph2=0,lpb=K.biq("lp",520,0.9,sr),f0=112+r()*20;
        for(var j2=0;j2<len2&&i1+j2<B.n;j2++){var u2=j2/len2;ph2+=PI2*f0*(1+0.06*Math.sin(Math.PI*u2))/sr;var x2=0;for(var h=1;h<=10;h++)x2+=Math.sin(h*ph2)*(h<4?1:0.6/h);
          x2=lpb(x2*0.045*Math.pow(Math.sin(Math.PI*u2),0.6));B.L[i1+j2]+=x2*(1-pb);B.R[i1+j2]+=x2*pb;}}
      tb+=9+r()*6;}
    for(k=0;k<sec*0.5;k++)ping(B,r()*sec,380+r()*300,1.5,0.014,0.012,r());
    K.verb(B,0.30,0.84);return K.finish(B,1.0,-1);}

  /* ----- fire ----- */
  function campfire(){var sec=26,B=K.mk(sec),sr=B.sr,r=K.rnd(137),k,g=drift(r,sec,0.35,sr);
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",190,0.6,sr),pair("hp",35,0.7,sr)],0.12,function(i){return 0.7+0.3*g(i);});
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",2600,0.7,sr)],0.010,function(i){return 0.6+0.4*g(i);});
    /* crackles: small sharp snaps, often in little runs */
    var t=0;while(t<sec){t+=-Math.log(1-r())/9;var run=1+Math.floor(Math.pow(r(),2)*8),p=0.32+r()*0.36;for(var q=0;q<run;q++){var tq=t+q*(0.006+r()*0.03);
        grain(B,tq,0.0006+r()*0.0018,Math.pow(r(),2.4)*0.6,p+(r()-0.5)*0.08,K.biq("hp",1400+r()*2000,0.7,sr),r,0.35);}}
    /* pops: rounder, now and then */
    for(k=0;k<sec*1.2;k++){var tp=r()*sec;grain(B,tp,0.012+r()*0.02,0.10+r()*0.16,0.35+r()*0.3,K.biq("bp",420+r()*700,1.4,sr),r,0.3);}
    K.verb(B,0.08,0.70);return K.finish(B,1.0,-1);}

  return [
    {k:"brook",name:"Brook",desc:"A brook babbling over stones",group:"water",make:brook},
    {k:"cascade",name:"Cascade",desc:"A small waterfall close by, bright and splashing",group:"water",make:cascade},
    {k:"lightrain",name:"Light rain",desc:"A light, gentle rain on leaves",group:"rain",make:lightrain},
    {k:"window",name:"Rainy window",desc:"Rain on a window, heard from inside",group:"rain",make:window_},
    {k:"storm",name:"Thunderstorm",desc:"Heavy rain, with thunder rolling far off and once nearer",group:"rain",make:storm},
    {k:"dawn",name:"Morning birds",desc:"A dawn chorus: robins, a blackbird, a chickadee and finches, a dove far off",group:"day",make:dawn},
    {k:"forest",name:"Forest",desc:"Leaves in a breeze, birds far off, a woodpecker now and then",group:"day",make:forest},
    {k:"meadow",name:"Meadow",desc:"A summer meadow: grasshoppers, bees passing, a lark high above",group:"day",make:meadow},
    {k:"pond",name:"Pond at dusk",desc:"Peepers, tree frogs and a bullfrog at a pond as evening falls",group:"night",make:pond},
    {k:"campfire",name:"Campfire",desc:"A fire crackling softly",group:"fire",make:campfire}];}
/*R363_DEFS_END*/
var ICONS={brook:'<path d="M3 8c2-1.4 4-1.4 6 0s4 1.4 6 0 4-1.4 6 0"/><circle cx="7" cy="14" r="1.6"/><circle cx="13" cy="16" r="2"/><circle cx="18" cy="13.5" r="1.3"/>',
  cascade:'<path d="M4 4h7"/><path d="M6 4v6M9 4v8"/><path d="M11 10h9"/><path d="M14 10v6M17 10v8"/><path d="M3 20c2.6-1.2 5.3-1.2 8 0s5.4 1.2 8 0"/>',
  lightrain:'<path d="M7 14.5a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 7a3.5 3.5 0 0 1 .5 7"/><path d="M10 18l-.5 1.5M15 18l-.5 1.5"/>',
  window:'<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M12 3.5v17M4 12h16"/><path d="M7.5 6.5v2M16 14.5v2.5M9 15v1.5"/>',
  storm:'<path d="M7 14a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 6.5a3.5 3.5 0 0 1 .5 7"/><path d="M12.5 12l-2 4h3l-2 4.5"/><path d="M7 17l-1 2.5M17.5 17l-1 2.5"/>',
  dawn:'<path d="M3 18h18"/><path d="M7.5 18a4.5 4.5 0 0 1 9 0"/><path d="M12 8.5v2M6.5 11l1.3 1.3M17.5 11l-1.3 1.3"/><path d="M13 5c1-1 2.3-1 3.3 0 1-1 2.3-1 3.3 0"/>',
  forest:'<path d="M8 3l4.5 7h-2.5l3.5 5.5h-11L6 10H3.5z" transform="translate(1 0)"/><path d="M9 15.5V21"/><path d="M17 8l3.5 6h-7z"/><path d="M17 14v7"/>',
  meadow:'<path d="M3 20c2-4 3-7 3-11M7 20c0-3 1.5-6 4-8M12 20c0-4 2-7 5-9M17 20c0-2.5 1-4.5 3-6"/><circle cx="18" cy="6" r="1.4"/>',
  pond:'<path d="M3 17c2.3 1.6 15.7 1.6 18 0"/><path d="M5 14c1.5-1 2.8-1 4 0"/><circle cx="14.5" cy="11" r="3"/><circle cx="13.5" cy="10.3" r=".5" fill="currentColor"/><path d="M12 13.5c1.5.8 3.5.8 5 0"/>',
  campfire:'<path d="M12 3c2.5 3 4.5 5 4.5 8a4.5 4.5 0 0 1-9 0c0-2 1.2-3.5 2.2-4.7.3 1.6.8 2.4 1.6 2.9C11.3 7 11.4 5 12 3z"/><path d="M5 20l14-3M5 17l14 3"/>'};
var GROUPS=[["water","Water"],["rain","Rain"],["day","Day"],["night","Night"],["fire","Wind and fire"]];
var THEIRS={stream:"water",waterfall:"water",waves:"water",rain:"rain",birds:"day",night:"night",wind:"fire"};
var tries=0;
function go(){if(!W.IngNature||typeof IngNature.extend!=="function"){if(++tries<80)setTimeout(go,250);return;}
  IngNature.extend({places:defs,icons:ICONS,groups:GROUPS,assign:THEIRS});}
go();
})();
;try{window.__ingParts["p363"]="running";}catch(_){}
</script>
