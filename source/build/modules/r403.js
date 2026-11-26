<script>try{(window.__ingParts=window.__ingParts||{})["p403"]="started";}catch(_){}
/* ============ R403 · AUTUMN WIND (Ingenium 7.98, 26 November 2026) ============
   Her words (26 November 2026): "I also want to expand the nature sounds and add one under the name "Noel" ... as well as other nature
   sounds." Of the four samples she heard the same day: "All of these sounds sound absolutely crappy except for the Autumn wind, I like that
   one you can add it to the list and redo the others."
   So Autumn wind joins Wind and fire: gusts through dry leaves, leaves skittering over the ground, crows far off. It is made on this
   device the first time it is chosen, sample by sample, with r295's kit and r363's ways (nothing is fetched or stored), and plays at the
   same calm level as the others. Noel, Snowfall and Summer night are made again (r404, held for her word on their new samples). */
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
  /* a crow far off: two to four rough caws */
  function crows(B,r,t0,pan){var n=2+Math.floor(r()*3),t=t0,lp=K.biq("lp",2200,0.7,B.sr);
    for(var k=0;k<n;k++){var c=640+r()*140,d=0.26+r()*0.12;note(B,t,d,glide(c*1.08,c*0.82,"dn"),0.03,pan,{h2:0.55,h3:0.35,at:0.08,fm:0.06,fmr:72+r()*20,lp:lp});t+=d+0.22+r()*0.2;}return t;}
  function autumn(){var sec=40,B=K.mk(sec),sr=B.sr,r=K.rnd(1249),g=drift(r,sec,0.2,sr),gust=function(i){var v=g(i);return v*v*v;};
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",420,0.6,sr),pair("hp",50,0.7,sr)],0.085,function(i){return 0.25+0.75*gust(i);});
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("hp",2200,0.7,sr),pair("lp",7500,0.6,sr)],0.03,function(i){return 0.1+0.9*gust(i);});
    /* dry leaves: many small rustles as each gust comes, and runs of leaves skittering over the ground */
    var t=0;while(t<sec){var gi=gust(Math.floor(t*sr));t+=-Math.log(1-r())/(30+420*gi);grain(B,t,0.001+r()*0.004,Math.pow(r(),2)*0.07*(0.25+gi),r(),K.biq("bp",2400+r()*5200,1.2,sr),r,0.35);}
    for(var s=0;s<5;s++){var ts=r()*(sec-2),p=r();for(var q=0;q<18;q++)grain(B,ts+q*(0.02+r()*0.03),0.003+r()*0.004,0.03*r(),p+q*0.01,K.biq("bp",1800+r()*2500,1.5,sr),r,0.35);}
    [8+r()*5,27+r()*6].forEach(function(tc){crows(B,r,tc,0.15+0.7*r());});
    K.verb(B,0.3,0.84);return K.finish(B,1.5,-1);}

  return [{k:"autumn",name:"Autumn wind",desc:"Gusts through dry leaves, leaves skittering, crows far off",group:"fire",make:autumn}];}
/*R403_DEFS_END*/
var ICONS={autumn:'<path d="M6 18c0-7 5-12 13-13-1 8-6 13-13 13z"/><path d="M6 18l7-7"/><path d="M3 21c1-1 2-1.5 3-1.5"/>'};
var tries=0;
function go(){if(!W.IngNature||typeof IngNature.extend!=="function"||!W.__r363){if(++tries<120)setTimeout(go,250);return;}
  setTimeout(function(){IngNature.extend({places:defs,icons:ICONS});},40);}
go();
try{window.__ingParts["p403"]="running";}catch(_){}
})();
</script>
