<script>try{(window.__ingParts=window.__ingParts||{})["p403"]="started";}catch(_){}
/* ============ R403 · NOEL, AND MORE NATURE SOUNDS (Ingenium 7.97, 26 November 2026) ============
   Her words (26 November 2026): "I also want to expand the nature sounds and add one under the name "Noel", I want a sound matched
   specifically for that name, jsut like the Forest sound was for my name and also has the nature sounds of a forest in the morning. I want a
   sound that matches the name Noel added in as well as other nature sounds."
   The name: Noël is the French word for Christmas, from the Latin natalis (dies), the day of birth. So Noel is a Christmas morning out in
   the snow: a robin singing through the frost (the robin sings all winter, and is the bird of the Christmas card), a soft wind in the
   pines, snow slipping from a branch now and then, and a peal of church bells far off across the fields, everything a little hushed, as
   snow makes it. And three more places beside the eighteen there are:
     Winter: Noel; Snowfall (snow falling at night: a hush, a slow wind in bare trees, a branch creaking, a tawny owl far off);
     Night: Summer night (crickets in the grass, a warm breeze, an owl far off);
     Wind and fire: Autumn wind (gusts through dry leaves, leaves skittering over the ground, crows far off).
   Each is made on this device the first time it is chosen, sample by sample, with r295's kit and r363's ways (nothing is fetched or
   stored), and plays at the same calm level as the others. Winter is a group of its own, between Night and Wind and fire. */
(function(){"use strict";
var W=window;if(W.__r403)return;W.__r403=1;
/*R403_DEFS_START*/
function defs(K){
  var PI2=2*Math.PI;
  function note(B,t0,dur,f,amp,pan,o){o=o||{};var i0=Math.floor(t0*B.sr),len=Math.floor(dur*B.sr),ph=0,h2=o.h2==null?0.12:o.h2,h3=o.h3||0,at=o.at||0.18,lp=o.lp||null,fm=o.fm||0,fmr=o.fmr||0,am=o.am||0,amr=o.amr||0;
    for(var j=0;j<len&&i0+j<B.n;j++){if(i0+j<0)continue;var u=j/len,fr=f(u)*(1+fm*Math.sin(PI2*fmr*j/B.sr));ph+=PI2*fr/B.sr;
      var e=u<at?Math.sin(Math.PI/2*u/at):Math.pow(Math.cos(Math.PI/2*(u-at)/(1-at)),1.4);if(am)e*=1-am*(0.5+0.5*Math.sin(PI2*amr*j/B.sr));
      var x=(Math.sin(ph)+h2*Math.sin(2*ph)+h3*Math.sin(3*ph))*amp*e;if(lp)x=lp(x);B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  function glide(a,b,shape){return function(u){var s=shape==="up"?u*u:shape==="dn"?1-(1-u)*(1-u):shape==="arc"?Math.sin(Math.PI*u):u;return a+(b-a)*s;};}
  function grain(B,t0,dur,amp,pan,filt,r,tau){var i0=Math.floor(t0*B.sr),len=Math.max(1,Math.floor(dur*B.sr)),tt=len*(tau||0.3);
    for(var j=0;j<len&&i0+j<B.n;j++){var x=filt(r()*2-1)*amp*Math.min(1,j/(B.sr*0.0004))*Math.exp(-j/tt);B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  function drift(r,sec,rate,sr){var pts=[],n=Math.ceil(sec*rate)+2,k;for(k=0;k<n;k++)pts.push(r());pts[n-1]=pts[0];pts[n-2]=pts[1];
    return function(i){var x=i/sr*rate,a=Math.floor(x),f=x-a,p=pts[a%n],q=pts[(a+1)%n];return p+(q-p)*(0.5-0.5*Math.cos(Math.PI*f));};}
  function bed(B,gen,filts,amp,mod){for(var i=0;i<B.n;i++){var m=mod?mod(i):1,xl=gen[0](),xr=gen[1]();for(var f=0;f<filts.length;f++){xl=filts[f][0](xl);xr=filts[f][1](xr);}B.L[i]+=xl*amp*m;B.R[i]+=xr*amp*m;}}
  function pair(type,f,Q,sr){return [K.biq(type,f,Q,sr),K.biq(type,f,Q,sr)];}
  /* the whole place heard through snow: the highs softened */
  function hush(B,f){var l=K.biq("lp",f,0.6,B.sr),r=K.biq("lp",f,0.6,B.sr);for(var i=0;i<B.n;i++){B.L[i]=l(B.L[i]);B.R[i]=r(B.R[i]);}}
  /* a robin's winter song: thin, wistful phrases, rising and falling */
  function robin(B,r,t0,pan,far){var n=6+Math.floor(r()*6),t=t0,a=far?0.03:0.075,lp=far?K.biq("lp",3600,0.7,B.sr):null;
    for(var k=0;k<n;k++){var d=0.06+r()*0.16,c=2400+r()*2200,sh=r(),f=sh<0.35?glide(c*0.8,c*1.22,"up"):sh<0.7?glide(c*1.25,c*0.82,"dn"):glide(c*0.88,c*1.3,"arc");
      note(B,t,d,f,a*(0.65+0.35*r()),pan,{h2:0.12,fm:0.04,fmr:38+r()*30,lp:lp});t+=d+0.03+r()*0.09;}return t;}
  /* a church bell far off: its partials (hum, prime, tierce, quint, nominal), each dying away at its own pace */
  function bell(B,t0,f,amp,pan){var P=[[0.5,1.0,4.2],[1.0,0.9,3.0],[1.19,0.55,2.2],[1.5,0.35,1.8],[2.0,0.6,1.4],[2.52,0.18,0.9],[3.0,0.12,0.7]],i0=Math.floor(t0*B.sr),len=Math.floor(5*B.sr),ph=P.map(function(){return 0;});
    for(var j=0;j<len&&i0+j<B.n;j++){var x=0,tt=j/B.sr;for(var p=0;p<P.length;p++){ph[p]+=PI2*f*P[p][0]/B.sr;x+=Math.sin(ph[p])*P[p][1]*Math.exp(-tt/P[p][2]);}
      x*=amp*Math.min(1,j/(B.sr*0.003));B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  /* snow slipping from a branch: a soft, low fall, a few crystals after it */
  function flump(B,r,t0,pan){var sr=B.sr,lp=K.biq("lp",420,0.7,sr),i0=Math.floor(t0*sr),len=Math.floor(0.55*sr),br=K.brownGen(r);
    for(var j=0;j<len&&i0+j<B.n;j++){var u=j/len,x=lp(br())*0.5*Math.sin(Math.PI*Math.min(1,u*4))*Math.exp(-u*3.2);B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}
    for(var k=0;k<14;k++)grain(B,t0+0.05+r()*0.6,0.002+r()*0.004,0.012*r(),pan+(r()-0.5)*0.2,K.biq("hp",4200+r()*2500,0.7,sr),r,0.4);}
  /* a tawny owl far off: hoo, a pause, then hu-hu-hoooo with its quaver */
  function owl(B,r,t0,pan){var lp=K.biq("lp",900,0.7,B.sr),a=0.05;
    note(B,t0,0.55,glide(410,430,"arc"),a,pan,{h2:0.06,at:0.25,lp:lp});
    var t=t0+3.1+r()*0.8;note(B,t,0.16,glide(390,420,"up"),a*0.7,pan,{h2:0.05,at:0.3,lp:lp});note(B,t+0.24,0.16,glide(395,420,"up"),a*0.7,pan,{h2:0.05,at:0.3,lp:lp});
    note(B,t+0.5,1.25,glide(430,395,"dn"),a,pan,{h2:0.06,at:0.12,lp:lp,am:0.55,amr:13});return t+1.9;}
  /* a crow far off: two to four rough caws */
  function crows(B,r,t0,pan){var n=2+Math.floor(r()*3),t=t0,lp=K.biq("lp",2200,0.7,B.sr);
    for(var k=0;k<n;k++){var c=640+r()*140,d=0.26+r()*0.12;note(B,t,d,glide(c*1.08,c*0.82,"dn"),0.03,pan,{h2:0.55,h3:0.35,at:0.08,fm:0.06,fmr:72+r()*20,lp:lp});t+=d+0.22+r()*0.2;}return t;}
  /* a field cricket: chirps of three or four pulses, over and over, each cricket at its own pitch and pace */
  function cricket(B,r,sec,f0,rate,pan,amp){var t=r()*0.5,lp=K.biq("bp",f0,3,B.sr);
    while(t<sec){var np=3+Math.floor(r()*2);for(var q=0;q<np;q++){var i0=Math.floor((t+q*0.032)*B.sr),len=Math.floor(0.018*B.sr),ph=0;
        for(var j=0;j<len&&i0+j<B.n;j++){ph+=PI2*f0*(1+0.004*Math.sin(PI2*90*j/B.sr))/B.sr;var x=Math.sin(ph)*amp*Math.sin(Math.PI*j/len);B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
      t+=1/rate*(0.85+0.3*r());}}

  /* ----- Noel: a Christmas morning in the snow ----- */
  function noel(){var sec=48,B=K.mk(sec),sr=B.sr,r=K.rnd(1225),k,g=drift(r,sec,0.09,sr),gust=function(i){var v=g(i);return v*v;};
    /* wind in the pines: a low breath and a soft hiss of needles, rising and falling */
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",300,0.6,sr),pair("hp",45,0.7,sr)],0.06,function(i){return 0.3+0.7*gust(i);});
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",1500,0.7,sr),pair("lp",5200,0.6,sr)],0.022,function(i){return 0.15+0.85*gust(i);});
    /* the robin, near and then from another tree; a second, far off, answers */
    var tb=2.5;while(tb<sec-4){var near=r()<0.6;tb=robin(B,r,tb,near?0.3+0.4*r():0.1+0.8*r(),!near)+3.5+r()*5;}
    /* snow slipping from a branch */
    [11+r()*4,33+r()*5].forEach(function(td){flump(B,r,td,0.2+0.6*r());});
    /* the bells across the fields: a peal of five, rung down three times, then quiet */
    var notes=[784,698,659,587,523],t0=17+r()*2;for(var round=0;round<3;round++)for(k=0;k<5;k++)bell(B,t0+round*2.6+k*0.5+(r()-0.5)*0.03,notes[k],0.012,0.62+0.12*(k/4-0.5));
    hush(B,6000);K.verb(B,0.38,0.86);return K.finish(B,1.6,-1);}
  /* ----- Snowfall: snow falling at night ----- */
  function snowfall(){var sec=44,B=K.mk(sec),sr=B.sr,r=K.rnd(1231),g=drift(r,sec,0.06,sr),gust=function(i){var v=g(i);return v*v;};
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",240,0.6,sr),pair("hp",40,0.7,sr)],0.07,function(i){return 0.25+0.75*gust(i);});
    /* the snow itself: the faintest, finest hiss */
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",3500,0.7,sr),pair("lp",7000,0.6,sr)],0.010,function(i){return 0.7+0.3*gust(i);});
    /* a bare branch creaking in the wind, now and then */
    [7+r()*4,29+r()*6].forEach(function(tc){var f0=180+r()*90;note(B,tc,0.9+r()*0.6,glide(f0,f0*(0.85+r()*0.25),"arc"),0.012,0.2+0.6*r(),{h2:0.5,h3:0.3,at:0.3,fm:0.03,fmr:31,lp:K.biq("lp",1200,0.7,sr)});});
    owl(B,r,14+r()*3,0.25+0.5*r());
    hush(B,5200);K.verb(B,0.45,0.88);return K.finish(B,1.8,-1);}
  /* ----- Summer night: crickets in the grass ----- */
  function summernight(){var sec=36,B=K.mk(sec),sr=B.sr,r=K.rnd(1237),g=drift(r,sec,0.1,sr);
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",260,0.6,sr),pair("hp",45,0.7,sr)],0.035,function(i){return 0.4+0.6*g(i);});
    [[4600,2.6,0.25,0.018],[4300,2.2,0.7,0.014],[4900,3.0,0.5,0.008],[4150,1.9,0.15,0.006],[4750,2.4,0.85,0.007]].forEach(function(c){cricket(B,r,sec,c[0],c[1],c[2],c[3]);});
    owl(B,r,20+r()*4,0.2+0.6*r());
    K.verb(B,0.28,0.82);return K.finish(B,1.4,-1);}
  /* ----- Autumn wind: gusts through dry leaves ----- */
  function autumn(){var sec=40,B=K.mk(sec),sr=B.sr,r=K.rnd(1249),g=drift(r,sec,0.2,sr),gust=function(i){var v=g(i);return v*v*v;};
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",420,0.6,sr),pair("hp",50,0.7,sr)],0.085,function(i){return 0.25+0.75*gust(i);});
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",2200,0.7,sr),pair("lp",7500,0.6,sr)],0.03,function(i){return 0.1+0.9*gust(i);});
    /* dry leaves: many small rustles as each gust comes, and runs of leaves skittering over the ground */
    var t=0;while(t<sec){var gi=gust(Math.floor(t*sr));t+=-Math.log(1-r())/(30+420*gi);grain(B,t,0.001+r()*0.004,Math.pow(r(),2)*0.07*(0.25+gi),r(),K.biq("bp",2400+r()*5200,1.2,sr),r,0.35);}
    for(var s=0;s<5;s++){var ts=r()*(sec-2),p=r();for(var q=0;q<18;q++)grain(B,ts+q*(0.02+r()*0.03),0.003+r()*0.004,0.03*r(),p+q*0.01,K.biq("bp",1800+r()*2500,1.5,sr),r,0.35);}
    [8+r()*5,27+r()*6].forEach(function(tc){crows(B,r,tc,0.15+0.7*r());});
    K.verb(B,0.3,0.84);return K.finish(B,1.5,-1);}

  return [
    {k:"noel",name:"Noel",desc:"A Christmas morning in the snow: a robin singing, wind in the pines, bells far off",group:"winter",make:noel},
    {k:"snowfall",name:"Snowfall",desc:"Snow falling at night: a hush, a slow wind, a tawny owl far off",group:"winter",make:snowfall},
    {k:"summernight",name:"Summer night",desc:"Crickets in the grass, a warm breeze, an owl far off",group:"night",make:summernight},
    {k:"autumn",name:"Autumn wind",desc:"Gusts through dry leaves, leaves skittering, crows far off",group:"fire",make:autumn}];}
/*R403_DEFS_END*/
var ICONS={
  noel:'<path d="M12 3l1.6 3.4 3.7.4-2.8 2.5.8 3.7L12 11.2 8.7 13l.8-3.7L6.7 6.8l3.7-.4z"/><path d="M5 21c1.2-2.4 2.6-3.6 4.2-3.6M19 21c-1.2-2.4-2.6-3.6-4.2-3.6"/><path d="M12 14v7"/>',
  snowfall:'<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="M10 4.5l2 1.5 2-1.5M10 19.5l2-1.5 2 1.5"/>',
  summernight:'<path d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5z"/><path d="M4 20c1.5-2 2.5-4 2.5-6M8 20c0-2 .8-3.5 2-4.5"/>',
  autumn:'<path d="M6 18c0-7 5-12 13-13-1 8-6 13-13 13z"/><path d="M6 18l7-7"/><path d="M3 21c1-1 2-1.5 3-1.5"/>'};
var GROUPS=[["water","Water"],["rain","Rain"],["day","Day"],["night","Night"],["winter","Winter"],["fire","Wind and fire"]];
var tries=0;
function go(){if(!W.IngNature||typeof IngNature.extend!=="function"||!W.__r363){if(++tries<120)setTimeout(go,250);return;}
  setTimeout(function(){IngNature.extend({places:defs,icons:ICONS,groups:GROUPS});},50);}
go();
try{window.__ingParts["p403"]="running";}catch(_){}
})();
</script>
