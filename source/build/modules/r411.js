<script>try{(window.__ingParts=window.__ingParts||{})["p411"]="started";}catch(_){}
/* ============ R411 · WINTER: SNOWY PINES AND WINTER CABIN (Ingenium 8.08, 28 November 2026) ============
   Her words (28 November 2026): "there are some sounds missing from Ingenium. I want more winter sounds added to the nature sounds of
   Ingenium, I want to hear some snow sounds as well. I want more nature sounds added to the app in general to the app." Six samples were
   made to the measure of the ones she loves (Forest, Brook, Pond at dusk, Autumn wind, Noel: no hiss and no steady wash of noise; one bed
   that moves gently and falls nearly still between its swells; a few soft, far, real things in it; little above 4 kHz; the same calm
   level as the others). Her word on hearing them (28 November 2026): "For the Winter Sounds, I like Snowy pines and Winter cabin, I hate
   the Fresh snow one. I like the Rain on a tent one but it could be improved to sound more natural right now it sounds like something is
   drowning." So these two join Winter, beside Noel:
     Snowy pines (a soft wind in snowy pines, falling nearly still between its gusts; snow slipping from a branch and landing below, a
       little powder sifting after it; crows far off once), Winter cabin (a fire in the hearth, softer than Campfire and in a room; the wind
       outside, through the walls; fine snow brushing the window as it rises).
   Fresh snow is not kept; Rain on a tent is being made again; Lake shore and Night woods wait for her word.
   Each is made on this device the first time it is chosen, sample by sample, with r295's kit (nothing is fetched or stored). */
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
  /* crows far off, as r403 calls them in Autumn wind, which she loves */
  function crows(B,r,t0,pan){var n=2+Math.floor(r()*3),t=t0,lp=K.biq("lp",2000,0.7,B.sr);
    for(var k=0;k<n;k++){var c=640+r()*140,d=0.26+r()*0.12;note(B,t,d,glide(c*1.08,c*0.82,"dn"),0.022,pan,{h2:0.55,h3:0.35,at:0.08,fm:0.06,fmr:72+r()*20,lp:lp});t+=d+0.22+r()*0.2;}return t;}
  /* snow slipping from a branch: the clump sliding off the needles, landing in the snow below, a little powder sifting after it */
  function fall(B,r,t,pan,a){var sr=B.sr;a=a||1;
    swell(B,t,0.32+r()*0.22,0.09*a,pan,K.biq("bp",800+r()*600,0.7,sr),r,0.45);
    thud(B,t+0.34+r()*0.18,0.16+r()*0.08,0.8*a,pan,K.biq("lp",190+r()*110,0.8,sr),r);
    var n=50+Math.floor(r()*70);for(var k=0;k<n;k++){var u=r();grain(B,t+0.12+u*(0.9+r()*0.6),0.001+r()*0.003,0.022*a*Math.pow(1-u,1.5)*Math.pow(r(),1.5),pan+(r()-0.5)*0.2,K.biq("bp",1500+r()*2000,1.0,sr),r,0.35);}}

  /* ----- Snowy pines: a soft wind in snowy pines; snow slipping from the branches ----- */
  function pines(){var sec=50,B=K.mk(sec),sr=B.sr,r=K.rnd(3301),g=drift(r,sec,0.11,sr),gust=function(i){var v=g(i);return v*v;};
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",360,0.6,sr),pair("hp",45,0.7,sr)],0.075,function(i){return 0.22+0.78*gust(i);});
    /* the needles' sigh, low and soft: snow takes the hiss out of a wood */
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("bp",820,0.55,sr),pair("lp",2400,0.6,sr)],0.024,function(i){return 0.06+0.94*gust(i);});
    var t=3+r()*3;while(t<sec-3){fall(B,r,t,0.15+0.7*r(),0.8+0.4*r());t+=7+r()*8;}
    crows(B,r,19+r()*10,0.2+0.6*r());
    K.verb(B,0.30,0.84);return K.finish(B,1.5,-3);}

  /* ----- Winter cabin: a fire in the hearth, the wind outside, fine snow brushing the window ----- */
  function cabin(){var sec=40,B=K.mk(sec),sr=B.sr,r=K.rnd(4409),g=drift(r,sec,0.3,sr),w=drift(r,sec,0.09,sr),gust=function(i){var v=w(i);return v*v;},k;
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",200,0.6,sr),pair("hp",30,0.7,sr)],0.085,function(i){return 0.25+0.75*gust(i);});
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",170,0.6,sr),pair("hp",35,0.7,sr)],0.055,function(i){return 0.7+0.3*g(i);});
    /* the fire's crackles, fewer and softer than Campfire's, in a room */
    var t=0;while(t<sec){t+=-Math.log(1-r())/6;var run=1+Math.floor(Math.pow(r(),2)*6),p=0.42+r()*0.16;
      for(var q=0;q<run;q++)grain(B,t+q*(0.006+r()*0.03),0.0006+r()*0.0016,Math.pow(r(),2.4)*0.36,p+(r()-0.5)*0.06,K.biq("hp",1300+r()*1500,0.7,sr),r,0.35);}
    for(k=0;k<sec*0.9;k++)grain(B,r()*sec,0.012+r()*0.02,0.08+r()*0.12,0.4+r()*0.2,K.biq("bp",380+r()*600,1.4,sr),r,0.3);
    /* a log settling now and then */
    [10+r()*5,28+r()*5].forEach(function(tl){thud(B,tl,0.2,0.32,0.5,K.biq("lp",240,0.8,sr),r);for(var q2=0;q2<12;q2++)grain(B,tl+0.06+q2*(0.02+r()*0.05),0.0008+r()*0.0015,0.2*Math.pow(r(),1.5),0.45+r()*0.1,K.biq("hp",1500+r()*1500,0.7,sr),r,0.35);});
    /* fine snow brushing the window as the wind rises */
    var ts=0;while(ts<sec){var gi=gust(Math.floor(ts*sr));ts+=-Math.log(1-r())/(1.5+30*gi*gi);grain(B,ts,0.0008+r()*0.0015,0.005*gi*Math.pow(r(),1.4),0.8+r()*0.15,K.biq("bp",2600+r()*2000,1.4,sr),r,0.35);}
    K.verb(B,0.12,0.74);return K.finish(B,1.2,-2);}

  return [
    {k:"pines",name:"Snowy pines",desc:"A soft wind in snowy pines, snow slipping from the branches now and then",group:"winter",make:pines},
    {k:"cabin",name:"Winter cabin",desc:"A fire in the hearth, the wind outside, fine snow brushing the window",group:"winter",make:cabin}];}
/*R411_DEFS_END*/
var ICONS={
  pines:'<path d="M8 3l3.6 6H9.8l3 5H3.2l3-5H4.4z"/><path d="M8 14v4"/><path d="M17 7l2.8 4.6h-1.4l2.4 4H13.2l2.4-4h-1.4z"/><path d="M17 15.6V19"/><path d="M3 21h18"/>',
  cabin:'<path d="M3.5 11L12 4.5l8.5 6.5"/><path d="M5.5 9.6V20h13V9.6"/><path d="M10 20v-4.5h4V20"/><path d="M16 6.3V3.5h2v4.3"/><circle cx="20.5" cy="14" r=".6"/><circle cx="3" cy="15.5" r=".6"/>',
};
var GROUPS=[["water","Water"],["rain","Rain"],["day","Day"],["night","Night"],["winter","Winter"],["fire","Wind and fire"]];
var tries=0;
function go(){if(!W.IngNature||typeof IngNature.extend!=="function"||!W.__r363||!W.__r403||!W.__r404){if(++tries<160)setTimeout(go,250);return;}
  setTimeout(function(){IngNature.extend({places:defs,icons:ICONS,groups:GROUPS});},160);}
go();
try{window.__ingParts["p411"]="running";}catch(_){}
})();
</script>
