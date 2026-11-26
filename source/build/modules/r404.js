<script>try{(window.__ingParts=window.__ingParts||{})["p404"]="started";}catch(_){}
/* ============ R404 · NOEL, MADE AGAIN (Ingenium 7.98, 26 November 2026; held for her word) ============
   Her words on the first samples (26 November 2026): "The Noel sound is not soothing at all, its just a collection of random sounds, its not
   a nature sound to match the rest and what's up with that random piano? I hate it. This is NOT what I asked for, try again! Snowfall just
   sounds like white noise, I hate it too. Summer night also sounds too fast and rushed, I hate it. All of these sounds sound absolutely
   crappy except for the Autumn wind".
   Measured against the sounds she loves (Forest, Brook, Pond at dusk, Autumn wind): the first Noel was far more tonal than any of them (its
   church bells, the "piano") and swung about 18 dB between its quiet and its loud, twice Forest's; the first Snowfall was a dark hiss that
   did not move; the first Summer night put about half its energy above 4 kHz, in quick three and four pulse chirps. So, made again, each
   to the measure of the ones she loves: one continuous, gently moving bed, with few, soft, far things in it, and no instrument-like tone:
     Winter: Noel (a winter brook at dawn; the name, Noel, is Christmas, Noël, so a winter's morning. Made a second time on her word
       "Noel still has a lot of white noise and just sounds loud and annoying as hell": no wind and no hiss at all; Brook's own water,
       lower and without its bright glints; the robins, chickadee and finch of Morning birds, fewer and further apart; 3 dB quieter than
       the other places) and Snowfall (snow falling in a still wood at
       night: a slow breeze that rises and settles through the branches, snow whispering on the dry leaves, a tawny owl far away);
     Snowfall and Summer night were made a second time and refused again (26 November 2026): "Summer night is just loud unnatural
       cackling sound with a drowning white noise sound, it sounds even worse! Snowfall sounds about the same". They are withdrawn.
   Each is made on this device the first time it is chosen, sample by sample, with r295's kit (nothing is fetched or stored), and plays at
   the same calm level as the others. Winter is a group of its own, between Night and Wind and fire. */
(function(){"use strict";
var W=window;if(W.__r404)return;W.__r404=1;
/*R404_DEFS_START*/
function defs(K){
  var PI2=2*Math.PI;
  function note(B,t0,dur,f,amp,pan,o){o=o||{};var i0=Math.floor(t0*B.sr),len=Math.floor(dur*B.sr),ph=0,h2=o.h2==null?0.12:o.h2,h3=o.h3||0,at=o.at||0.18,lp=o.lp||null,fm=o.fm||0,fmr=o.fmr||0,am=o.am||0,amr=o.amr||0;
    for(var j=0;j<len&&i0+j<B.n;j++){if(i0+j<0)continue;var u=j/len,fr=f(u)*(1+fm*Math.sin(PI2*fmr*j/B.sr));ph+=PI2*fr/B.sr;
      var e=u<at?Math.sin(Math.PI/2*u/at):Math.pow(Math.cos(Math.PI/2*(u-at)/(1-at)),1.4);if(am)e*=1-am*(0.5+0.5*Math.sin(PI2*amr*j/B.sr));
      var x=(Math.sin(ph)+h2*Math.sin(2*ph)+h3*Math.sin(3*ph))*amp*e;if(lp)x=lp(x);B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  function glide(a,b,shape){return function(u){var s=shape==="up"?u*u:shape==="dn"?1-(1-u)*(1-u):shape==="arc"?Math.sin(Math.PI*u):u;return a+(b-a)*s;};}
  function grain(B,t0,dur,amp,pan,filt,r,tau){var i0=Math.floor(t0*B.sr),len=Math.max(1,Math.floor(dur*B.sr)),tt=len*(tau||0.3);
    for(var j=0;j<len&&i0+j<B.n;j++){var x=filt(r()*2-1)*amp*Math.min(1,j/(B.sr*0.0004))*Math.exp(-j/tt);B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  function ping(B,t0,f0,rise,tau,amp,pan){var i0=Math.floor(t0*B.sr),len=Math.floor(tau*5*B.sr),ph=0;
    for(var j=0;j<len&&i0+j<B.n;j++){var u=j/len;ph+=PI2*f0*(1+(rise-1)*u)/B.sr;var x=Math.sin(ph)*amp*Math.min(1,j/(B.sr*0.002))*Math.exp(-j/(tau*B.sr));B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  function drift(r,sec,rate,sr){var pts=[],n=Math.ceil(sec*rate)+2,k;for(k=0;k<n;k++)pts.push(r());pts[n-1]=pts[0];pts[n-2]=pts[1];
    return function(i){var x=i/sr*rate,a=Math.floor(x),f=x-a,p=pts[a%n],q=pts[(a+1)%n];return p+(q-p)*(0.5-0.5*Math.cos(Math.PI*f));};}
  function bed(B,gen,filts,amp,mod){for(var i=0;i<B.n;i++){var m=mod?mod(i):1,xl=gen[0](),xr=gen[1]();for(var f=0;f<filts.length;f++){xl=filts[f][0](xl);xr=filts[f][1](xr);}B.L[i]+=xl*amp*m;B.R[i]+=xr*amp*m;}}
  function pair(type,f,Q,sr){return [K.biq(type,f,Q,sr),K.biq(type,f,Q,sr)];}
  /* ----- Noel: a winter brook at dawn, made of what she loves (Brook's water, Morning birds' singers), softer and quieter ----- */
  /* the birds as r363 sings them in Morning birds, which she loves */
  function robin(B,r,t0,pan,far){var n=5+Math.floor(r()*5),t=t0,a=far?0.035:0.085,lp=far?K.biq("lp",3400,0.7,B.sr):null;
    for(var k=0;k<n;k++){var d=0.07+r()*0.14,c=2300+r()*1500,sh=r(),f=sh<0.35?glide(c*0.82,c*1.18,"up"):sh<0.7?glide(c*1.2,c*0.85,"dn"):glide(c*0.9,c*1.25,"arc");
      note(B,t,d,f,a*(0.7+0.3*r()),pan,{h2:0.15,fm:0.035,fmr:42+r()*25,lp:lp});t+=d+0.035+r()*0.07;}return t;}
  function chickadee(B,r,t0,pan,far){var a=far?0.03:0.065,lp=far?K.biq("lp",4200,0.7,B.sr):null;
    note(B,t0,0.36,glide(3980,3900,"dn"),a,pan,{h2:0.04,at:0.12,lp:lp});note(B,t0+0.5,0.42,glide(3420,3300,"dn"),a*0.9,pan,{h2:0.04,at:0.12,lp:lp,fm:0.01,fmr:9});return t0+1.0;}
  function finch(B,r,t0,pan,far){var n=12+Math.floor(r()*9),gap=0.045+r()*0.02,a=far?0.028:0.06,f0=5200+r()*900,lp=far?K.biq("lp",4600,0.7,B.sr):null,t=t0;
    for(var k=0;k<n;k++){note(B,t,0.028,glide(f0,f0*0.7,"dn"),a*(0.6+0.4*Math.sin(Math.PI*k/n)),pan,{h2:0.1,at:0.1,lp:lp});t+=gap;}
    var c=3600+r()*600;note(B,t+0.04,0.11,glide(c,c*1.3,"up"),a,pan,{h2:0.12,lp:lp});return t+0.2;}
  function noel(){var sec=48,B=K.mk(sec),sr=B.sr,r=K.rnd(2541),k,g=drift(r,sec,0.6,sr),g2=drift(r,sec,0.25,sr);
    /* the brook: Brook's own water, lower and gentler, without its bright glints and with no wind over it */
    bed(B,[K.pinkGen(r),K.pinkGen(r)],[pair("bp",900,0.6,sr),pair("lp",2400,0.6,sr)],0.035,function(i){return 0.6+0.4*g(i);});
    bed(B,[K.brownGen(r),K.brownGen(r)],[pair("lp",380,0.6,sr),pair("hp",60,0.7,sr)],0.06,function(i){return 0.75+0.25*g2(i);});
    var t=0;while(t<sec){t+=-Math.log(1-r())/28;var f0=380*Math.pow(2,r()*1.8),d=0.015+r()*0.04;ping(B,t,f0,1.2+r()*0.35,d/3,(0.008+Math.pow(r(),1.6)*0.03),0.15+r()*0.7);}
    for(k=0;k<sec*6;k++)grain(B,r()*sec,0.002+r()*0.003,Math.pow(r(),2.5)*0.018,r(),K.biq("bp",2400+r()*2400,1.0,sr),r,0.3);
    /* a winter morning's singers, as in Morning birds but fewer and further apart: two robins, a chickadee, a finch far off */
    var singers=[robin,robin,chickadee,finch],pans=[0.25,0.75,0.6,0.15],next=[1.5,6.5,12,20];
    for(var s=0;s<singers.length;s++){var tb=next[s];while(tb<sec-2.5){var far=r()<0.6||singers[s]===finch,end=singers[s](B,r,tb,pans[s]+(r()-0.5)*0.12,far);tb=end+(singers[s]===robin?6+r()*5:10+r()*8);}}
    K.verb(B,0.26,0.82);return K.finish(B,1.2,-4);}
  return [
    {k:"noel",name:"Noel",desc:"A winter brook at dawn: soft water over stones, robins and a chickadee in the frost",group:"winter",make:noel}];}
/*R404_DEFS_END*/
var ICONS={
  noel:'<path d="M12 2.5l4.6 7.2h-2.6l3.8 6H6.2l3.8-6H7.4z"/><path d="M12 15.7V21"/><path d="M4 21h16"/><circle cx="5" cy="6" r=".7"/><circle cx="19" cy="5" r=".7"/><circle cx="18" cy="11" r=".6"/>'
};
var GROUPS=[["water","Water"],["rain","Rain"],["day","Day"],["night","Night"],["winter","Winter"],["fire","Wind and fire"]];
var tries=0;
function go(){if(!W.IngNature||typeof IngNature.extend!=="function"||!W.__r363||!W.__r403){if(++tries<120)setTimeout(go,250);return;}
  setTimeout(function(){IngNature.extend({places:defs,icons:ICONS,groups:GROUPS});},80);}
go();
try{window.__ingParts["p404"]="running";}catch(_){}
})();
</script>
