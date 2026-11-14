<style id="r295-css">
/* ============ R295 · NATURE SOUNDS, ON EVERY PAGE (Ingenium 7.00, 13 November 2026) ============
   Her words (13 November 2026), on the live preview of the Build and Focus heads: "The sounds are amazing, please push them everywhere."
   Earlier, for Focus: "I want the calm soothing sounds associated with it. Think of the "Calm" app and its sounds".
   So a key in the top bar, on every page, beside Display: Sounds. It opens a small menu in Status's own look: Quiet, Stream, Rain,
   Waterfall, Waves, Birds, Night and Wind, and the volume. Each place is made on this device the first time it is chosen (nothing is
   fetched or stored), as a seamless loop, and then only played, so it costs nearly nothing; switching fades one into the next, and it
   keeps playing from page to page until Quiet is chosen. Ingenium never starts one by itself: after a restart it is quiet, and the menu
   remembers the last place and the volume. The stones of Focus answer a touch with the sound of a stone meeting water, under Ingenium's own sound switch. */
.cl-key#natureBtn .nat-dot{display:inline-block;width:6px;height:6px;margin-left:1px;border-radius:50%;background:var(--accent,#6a3fb5);vertical-align:middle}
.cl-key#natureBtn:not(.nat-on) .nat-dot{display:none}
.pres-menu.nat-menu{min-width:270px}
.nat-menu .pres-row .nat-ico{width:22px;height:22px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;border-radius:7px;color:var(--accent,#6a3fb5);background:var(--accent-soft,rgba(106,63,181,.10))}
.nat-menu .pres-row .nat-ico svg{width:15px;height:15px}
.nat-menu .nat-vol{display:flex;align-items:center;gap:10px;padding:8px 10px 6px;font:12px/1.3 var(--sans);color:var(--ink-2)}
.nat-menu .nat-vol input{flex:1;min-width:0;accent-color:var(--accent,#6a3fb5)}
.nat-menu .pres-row .pres-tip.nat-wait{color:var(--accent,#6a3fb5)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p295"]="started";}catch(_){}
/* R295 · Nature sounds on every page: see the note at the top of its styles */
(function r295(){
"use strict";
if(window.__r295)return;window.__r295=1;
var D=document,W=window,KEY="ing.nature.v1",PREF={last:"",vol:0.85};
try{var p=JSON.parse(W.localStorage.getItem(KEY)||"{}");if(p&&typeof p==="object"){if(typeof p.last==="string")PREF.last=p.last;if(typeof p.vol==="number"&&p.vol>=0&&p.vol<=1)PREF.vol=p.vol;}}catch(e){}
function keep(){try{W.localStorage.setItem(KEY,JSON.stringify(PREF));}catch(e){}}
var WAIT="";function said(kind){WAIT="";paintKey();paintMenu();try{if(typeof W.onNature==="function")W.onNature(kind);}catch(e){}}
/* ---------- the places, made sample by sample on this device ---------- */
var Nature=(function(){var ac=null,mst=null,tb=null,mode="off",src={},buf={},vol=0.85;
  function ctx(){var C=W.AudioContext||W.webkitAudioContext;if(!C)return null;if(!ac){ac=new C();mst=ac.createGain();mst.gain.value=0.0001;var cmp=ac.createDynamicsCompressor();cmp.threshold.value=-18;cmp.ratio.value=2.5;mst.connect(cmp);cmp.connect(ac.destination);
      /* the touches' own bus: dry, and a little room */
      tb=ac.createGain();tb.gain.value=1;var cv=ac.createConvolver(),wet=ac.createGain();cv.buffer=room(ac,2.0,3.4);wet.gain.value=0.30;tb.connect(ac.destination);tb.connect(cv);cv.connect(wet);wet.connect(ac.destination);}
    if(ac.state!=="running"){try{ac.resume();}catch(e){}}return ac;}
  function room(c,sec,decay){var n=Math.floor(c.sampleRate*sec),b=c.createBuffer(2,n,c.sampleRate);for(var ch=0;ch<2;ch++){var d=b.getChannelData(ch);for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,decay)*0.5;}return b;}
  /* ---------- a small kit for making sound sample by sample ---------- */
  function rnd(seed){var s=seed>>>0||1;return function(){s^=s<<13;s^=s>>>17;s^=s<<5;return (s>>>0)/4294967296;};}
  function biq(type,f,Q,sr){var w=2*Math.PI*f/sr,cs=Math.cos(w),sn=Math.sin(w),al=sn/(2*Q),b0,b1,b2,a0=1+al,a1=-2*cs,a2=1-al;
    if(type==="lp"){b0=(1-cs)/2;b1=1-cs;b2=b0;}else if(type==="hp"){b0=(1+cs)/2;b1=-(1+cs);b2=b0;}else{b0=al;b1=0;b2=-al;}
    b0/=a0;b1/=a0;b2/=a0;a1/=a0;a2/=a0;var x1=0,x2=0,y1=0,y2=0;return function(x){var y=b0*x+b1*x1+b2*x2-a1*y1-a2*y2;x2=x1;x1=x;y2=y1;y1=y;return y;};}
  function pinkGen(r){var b0=0,b1=0,b2=0;return function(){var w=r()*2-1;b0=0.99765*b0+w*0.0990460;b1=0.96300*b1+w*0.2965164;b2=0.57000*b2+w*1.0526913;return (b0+b1+b2+w*0.1848)*0.18;};}
  function brownGen(r){var l=0;return function(){l=(l+0.02*(r()*2-1))/1.02;return l*3.5;};}
  function mk(sec){var sr=ac.sampleRate,n=Math.floor(sr*sec);return {sr:sr,n:n,L:new Float32Array(n),R:new Float32Array(n)};}
  function verb(B,wet,fb){var sc=B.sr/44100,cd=[1116,1188,1277,1356],ad=[556,441];
    function side(inp,off){var out=new Float32Array(inp.length),cs=cd.map(function(d){return {b:new Float32Array(Math.floor((d+off)*sc)),i:0,f:0};}),as=ad.map(function(d){return {b:new Float32Array(Math.floor((d+off)*sc)),i:0};});
      for(var n=0;n<inp.length;n++){var x=inp[n]*0.25,s=0;for(var c=0;c<4;c++){var C=cs[c],y=C.b[C.i];C.f=y*0.75+C.f*0.25;C.b[C.i]=x+C.f*fb;C.i=(C.i+1)%C.b.length;s+=y;}
        for(var a=0;a<2;a++){var A=as[a],bo=A.b[A.i],v=-s+bo;A.b[A.i]=s+bo*0.5;A.i=(A.i+1)%A.b.length;s=v;}out[n]=s;}return out;}
    var wl=side(B.L,0),wr=side(B.R,23);for(var n=0;n<B.n;n++){B.L[n]+=wl[n]*wet;B.R[n]+=wr[n]*wet;}}
  /* the loop's end folds into its start; the level set to a quiet, even loudness, never clipping */
  /* how loud a sound is to the ear (the weighting of ITU-R BS.1770: a high-pass near 38 Hz and a 4 dB shelf above about 1.7 kHz), so that every
     place plays at the same calm level as the stream */
  function loud(chs,sr){var A=Math.pow(10,4/40),w=2*Math.PI*1681.97/sr,cs=Math.cos(w),al=Math.sin(w)/(2*0.7072),sA=2*Math.sqrt(A)*al,a0=(A+1)-(A-1)*cs+sA,
      F=[[A*((A+1)+(A-1)*cs+sA)/a0,-2*A*((A-1)+(A+1)*cs)/a0,A*((A+1)+(A-1)*cs-sA)/a0,2*((A-1)-(A+1)*cs)/a0,((A+1)-(A-1)*cs-sA)/a0]],w2=2*Math.PI*38.13/sr,c2=Math.cos(w2),a2=Math.sin(w2)/(2*0.5003),b0=1+a2,ms=0;
    F.push([(1+c2)/2/b0,-(1+c2)/b0,(1+c2)/2/b0,-2*c2/b0,(1-a2)/b0]);
    chs.forEach(function(x){var t=[0,0,0,0,0,0,0,0],q=0;for(var i=0;i<x.length;i++){var y=x[i];for(var k=0;k<2;k++){var c=F[k],o=k*4,v=c[0]*y+c[1]*t[o]+c[2]*t[o+1]-c[3]*t[o+2]-c[4]*t[o+3];t[o+1]=t[o];t[o]=y;t[o+3]=t[o+2];t[o+2]=v;y=v;}q+=y*y;}ms+=q/x.length;});
    return 10*Math.log10(ms||1e-12)-0.691;}
  var LEVEL=-34;
  /* the loop's end folds into its start; the level set to the same calm loudness as the stream, never clipping */
  function finish(B,fade,db){var f=Math.floor(B.sr*fade),n=B.n,m=n-f,k,pk=0;for(k=0;k<f;k++){var w=k/f;B.L[k]=B.L[k]*w+B.L[m+k]*(1-w);B.R[k]=B.R[k]*w+B.R[m+k]*(1-w);}
    var L=B.L.subarray(0,m),R=B.R.subarray(0,m);for(k=0;k<m;k++)pk=Math.max(pk,Math.abs(L[k]),Math.abs(R[k]));var g=Math.pow(10,((LEVEL+db)-loud([L,R],B.sr))/20);if(pk*g>0.92)g=0.92/pk;
    var ab=ac.createBuffer(2,m,B.sr),l=ab.getChannelData(0),r=ab.getChannelData(1);for(k=0;k<m;k++){l[k]=L[k]*g;r[k]=R[k]*g;}return ab;}
  function burst(B,t0,dur,amp,pan,filt,r){var i0=Math.floor(t0*B.sr),len=Math.floor(dur*B.sr);for(var j=0;j<len&&i0+j<B.n;j++){var x=filt(r()*2-1)*amp*Math.exp(-j/(len*0.3));B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  function tone(B,t0,dur,f0,f1,amp,pan,vib,lp){var i0=Math.floor(t0*B.sr),len=Math.floor(dur*B.sr),ph=0;for(var j=0;j<len&&i0+j<B.n;j++){var u=j/len,fr=f0+(f1-f0)*(u<0.5?2*u*u:1-2*(1-u)*(1-u))+vib*Math.sin(2*Math.PI*27*j/B.sr);ph+=2*Math.PI*fr/B.sr;
      var x=(Math.sin(ph)+0.10*Math.sin(2*ph))*amp*Math.pow(Math.sin(Math.PI*u),0.7);if(lp)x=lp(x);B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
  /* ---------- the places ---------- */
  function rain(sec){var B=mk(sec),sr=B.sr,r=rnd(7),pL=pinkGen(r),pR=pinkGen(r),hL=biq("hp",320,0.7,sr),hR=biq("hp",320,0.7,sr),lL=biq("lp",3000,0.6,sr),lR=biq("lp",3000,0.6,sr),i,k;
    for(i=0;i<B.n;i++){var t=i/sr,m=0.80+0.16*Math.sin(t*2*Math.PI*0.06)+0.05*Math.sin(t*2*Math.PI*0.23+1.3);B.L[i]+=lL(hL(pL()))*0.085*m;B.R[i]+=lR(hR(pR()))*0.085*m;}
    for(k=0;k<sec*180;k++)burst(B,r()*sec,0.004+r()*0.010,Math.pow(r(),2.6)*0.11,0.15+r()*0.7,biq("bp",1200+r()*3000,1.4,sr),r);
    for(k=0;k<sec*14;k++){var t0=r()*sec,f0=900+Math.pow(r(),1.5)*1900,dur=0.03+r()*0.05,amp=0.008+Math.pow(r(),2.2)*0.04,pan=0.1+r()*0.8,i0=Math.floor(t0*sr),len=Math.floor(dur*sr),ph=0,tau=len*(0.18+r()*0.12);
      for(var j=0;j<len&&i0+j<B.n;j++){ph+=2*Math.PI*f0*(1+0.35*j/len)/sr;var x=Math.sin(ph)*amp*Math.min(1,j/(sr*0.0015))*Math.exp(-j/tau);B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
    for(k=0;k<sec*5;k++)burst(B,r()*sec,0.03+r()*0.04,0.03+Math.pow(r(),2)*0.08,r(),biq("bp",500+r()*900,1.8,sr),r);
    verb(B,0.24,0.80);var sL=biq("lp",5200,0.6,sr),sR=biq("lp",5200,0.6,sr);for(i=0;i<B.n;i++){B.L[i]=sL(B.L[i]);B.R[i]=sR(B.R[i]);}
    return finish(B,1.0,0);}
  function waterfall(sec){var B=mk(sec),sr=B.sr,r=rnd(11),pL=pinkGen(r),pR=pinkGen(r),bL=brownGen(r),bR=brownGen(r),aL=biq("lp",900,0.6,sr),aR=biq("lp",900,0.6,sr),cL=biq("bp",2200,0.5,sr),cR=biq("bp",2200,0.5,sr),hL=biq("hp",60,0.7,sr),hR=biq("hp",60,0.7,sr),i,k;
    for(i=0;i<B.n;i++){var t=i/sr,m=0.86+0.09*Math.sin(t*0.9)+0.05*Math.sin(t*2.3+1.0);B.L[i]=hL(aL(bL()*0.9+pL()*0.5))*0.55*m+cL(pL())*0.18*m;B.R[i]=hR(aR(bR()*0.9+pR()*0.5))*0.55*m+cR(pR())*0.18*m;}
    for(k=0;k<sec*140;k++){var t0=r()*sec,f0=280+r()*900,dur=0.02+r()*0.05,amp=0.02+r()*0.05,pan=r(),i0=Math.floor(t0*sr),len=Math.floor(dur*sr),ph=0;
      for(var j=0;j<len&&i0+j<B.n;j++){ph+=2*Math.PI*f0*(1+0.6*j/len)/sr;var x=Math.sin(ph)*amp*Math.min(1,j/(len*0.12))*Math.exp(-j/(len*0.4));B.L[i0+j]+=x*(1-pan);B.R[i0+j]+=x*pan;}}
    verb(B,0.25,0.82);return finish(B,1.2,0);}
  function waves(sec){var B=mk(sec),sr=B.sr,r=rnd(23),pL=pinkGen(r),pR=pinkGen(r),bL=brownGen(r),bR=brownGen(r),gL=biq("lp",160,0.6,sr),gR=biq("lp",160,0.6,sr),zL=0,zR=0,i,k,w;
    var starts=[0.4,sec/2+0.3+r()*0.8];
    for(i=0;i<B.n;i++){var t=i/sr,acc=0,br=0;for(w=0;w<2;w++){var u=t-starts[w];if(u<0)u+=sec;if(u<11.5){var a=u<2.6?Math.pow(u/2.6,2):(u<3.3?1:Math.exp(-(u-3.3)/2.6));acc+=a;br+=u<2.6?u/2.6:(u<3.3?1:Math.exp(-(u-3.3)/1.8));}}
      var fc=180+br*3400,c=1-Math.exp(-2*Math.PI*fc/sr);zL+=c*(pL()*0.8+bL()*0.4-zL);zR+=c*(pR()*0.8+bR()*0.4-zR);B.L[i]=zL*acc*0.55+gL(bL())*0.10;B.R[i]=zR*acc*0.55+gR(bR())*0.10;}
    for(w=0;w<2;w++){var s0=starts[w]+3.2;for(k=0;k<1300;k++){var tt=s0+Math.pow(r(),1.6)*7;burst(B,tt%sec,0.001+r()*0.003,0.05*Math.exp(-(tt-s0)/2.5)*Math.pow(r(),1.5),r(),biq("hp",3000+r()*5000,0.8,sr),r);}}
    verb(B,0.20,0.8);return finish(B,1.5,0);}
  function birds(sec){var B=mk(sec),sr=B.sr,r=rnd(37),pL=pinkGen(r),pR=pinkGen(r),lL=biq("lp",2500,0.5,sr),lR=biq("lp",2500,0.5,sr),hL=biq("hp",300,0.5,sr),hR=biq("hp",300,0.5,sr),i;
    for(i=0;i<B.n;i++){var t=i/sr,g=0.5+0.5*Math.sin(t*0.4)*Math.sin(t*0.13+1);B.L[i]=lL(hL(pL()))*0.022*(0.6+0.4*g);B.R[i]=lR(hR(pR()))*0.022*(0.6+0.4*g);}
    function phrase(t0,pan,far){var n=3+Math.floor(r()*5),t=t0,base=2400+r()*1600,a=far?0.05:0.12;for(var k=0;k<n;k++){var d=0.06+r()*0.10,f0=base*(0.8+r()*0.5);tone(B,t,d,f0,f0*(0.7+r()*0.7),a*(0.7+0.3*r()),pan,f0*0.01,far?biq("lp",3200,0.7,sr):null);t+=d+0.02+r()*0.06;}}
    function trill(t0,pan,far){var n=8+Math.floor(r()*10),f0=4200+r()*1200,a=far?0.04:0.09;for(var k=0;k<n;k++)tone(B,t0+k*0.045,0.022,f0,f0*0.72,a,pan,0,far?biq("lp",3600,0.7,sr):null);}
    function coo(t0,pan){tone(B,t0,0.35,520,600,0.05,pan,4,biq("lp",1400,0.7,sr));tone(B,t0+0.5,0.6,600,500,0.05,pan,4,biq("lp",1400,0.7,sr));}
    var t=0.3;while(t<sec-2){var p=r(),pan=0.15+0.7*r(),far=r()<0.45;if(p<0.55)phrase(t,pan,far);else if(p<0.85)trill(t,pan,far);else coo(t,pan);t+=1.2+r()*2.6;}
    verb(B,0.30,0.82);return finish(B,1.0,-1);}
  function night(sec){var B=mk(sec),sr=B.sr,r=rnd(53),pL=pinkGen(r),pR=pinkGen(r),lL=biq("lp",900,0.5,sr),lR=biq("lp",900,0.5,sr),i,c;
    for(i=0;i<B.n;i++){B.L[i]=lL(pL())*0.03;B.R[i]=lR(pR())*0.03;}
    for(c=0;c<5;c++){var f=4100+r()*900,pan=r(),amp=0.02+r()*0.03,per=0.42+r()*0.5,pulses=3+Math.floor(r()*2),t=r()*per;while(t<sec){for(var q=0;q<pulses;q++)tone(B,t+q*0.032,0.018,f,f,amp,pan,0,null);t+=per*(0.92+0.16*r());}}
    var tf=1.5;while(tf<sec-1){var f0=260+r()*140,pan2=r(),n=2+Math.floor(r()*3);for(var k=0;k<n;k++)tone(B,tf+k*0.16,0.09,f0,f0*1.1,0.05,pan2,0,biq("lp",700,0.8,sr));tf+=2.5+r()*4;}
    verb(B,0.28,0.84);return finish(B,1.0,-1);}
  function wind(sec){var B=mk(sec),sr=B.sr,r=rnd(61),pL=pinkGen(r),pR=pinkGen(r),bL=brownGen(r),bR=brownGen(r),zL=0,zR=0,fL=biq("hp",2500,0.7,sr),fR=biq("hp",2600,0.7,sr),i;
    for(i=0;i<B.n;i++){var t=i/sr,g=Math.max(0.15,0.55+0.30*Math.sin(t*0.35+0.5*Math.sin(t*0.11))+0.15*Math.sin(t*1.1)),fc=250+g*900,c=1-Math.exp(-2*Math.PI*fc/sr);
      zL+=c*(pL()*0.7+bL()*0.5-zL);zR+=c*(pR()*0.7+bR()*0.5-zR);var lv=Math.max(0,g-0.5)*2;B.L[i]=zL*0.6*g+fL(pL())*0.06*lv;B.R[i]=zR*0.6*g+fR(pR())*0.06*lv;}
    verb(B,0.18,0.8);return finish(B,1.5,0);}
  /* the stream, as she chose it: many small bubbles over a soft, low body of water, in a little echo (an offline rendering) */
  function stream(cb){var sr=ac.sampleRate,sec=17,O=W.OfflineAudioContext||W.webkitOfflineAudioContext;if(!O)return;var c=new O(2,Math.floor(sr*sec),sr);
    var out=c.createGain(),rv=c.createConvolver(),wet=c.createGain();rv.buffer=room(c,2.0,3.4);wet.gain.value=0.30;out.connect(c.destination);out.connect(rv);rv.connect(wet);wet.connect(c.destination);
    var nb=c.createBufferSource(),nn=Math.floor(sr*sec),b=c.createBuffer(1,nn,sr),d=b.getChannelData(0),l=0;for(var i=0;i<nn;i++){l=0.985*l+0.015*(Math.random()*2-1);d[i]=l*7;}nb.buffer=b;
    var lp=c.createBiquadFilter();lp.type="lowpass";lp.frequency.value=700;var hp=c.createBiquadFilter();hp.type="highpass";hp.frequency.value=110;var g=c.createGain();g.gain.value=0.030;nb.connect(lp);lp.connect(hp);hp.connect(g);g.connect(out);nb.start(0);
    var t=0.02;while(t<sec-0.2){t+=-Math.log(1-Math.random())/30;var big=Math.random()<0.2,f0=big?(200+Math.random()*240):(360*Math.pow(2,Math.random()*1.7)),dur=big?(0.08+Math.random()*0.08):(0.03+Math.random()*0.05);
      var o=c.createOscillator(),e=c.createGain();o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f0*(1.10+Math.random()*0.45),t+dur);e.gain.setValueAtTime(0.0001,t);e.gain.exponentialRampToValueAtTime((big?0.050:0.024)*(0.45+Math.random()*0.75),t+0.004);e.gain.exponentialRampToValueAtTime(0.0001,t+dur);
      o.connect(e);if(c.createStereoPanner){var p=c.createStereoPanner();p.pan.value=Math.random()*1.4-0.7;e.connect(p);p.connect(out);}else e.connect(out);o.start(t);o.stop(t+dur+0.02);}
    var done=function(bb){var f=Math.floor(sr*0.6),m=bb.length-f,ob=ac.createBuffer(2,m,bb.sampleRate),ch,k;for(ch=0;ch<2;ch++){var dd=bb.getChannelData(Math.min(ch,bb.numberOfChannels-1)),o=ob.getChannelData(ch);for(k=0;k<m;k++)o[k]=dd[k];for(k=0;k<f;k++){var w=k/f;o[k]=dd[k]*w+dd[m+k]*(1-w);}}
      var cl=[ob.getChannelData(0),ob.getChannelData(1)],g=Math.pow(10,(LEVEL-loud(cl,ob.sampleRate))/20),pk=0;cl.forEach(function(x){for(k=0;k<m;k++)pk=Math.max(pk,Math.abs(x[k]));});if(pk*g>0.92)g=0.92/pk;cl.forEach(function(x){for(k=0;k<m;k++)x[k]*=g;});cb(ob);};
    var pr=c.startRendering();if(pr&&pr.then)pr.then(done);else c.oncomplete=function(e){done(e.renderedBuffer);};}
  var MAKE={rain:function(){return rain(14);},waterfall:function(){return waterfall(16);},waves:function(){return waves(24);},birds:function(){return birds(22);},night:function(){return night(16);},wind:function(){return wind(18);}};
  function get(kind,cb){if(buf[kind])return cb(buf[kind]);if(kind==="stream")return stream(function(b){buf.stream=b;cb(b);});setTimeout(function(){try{buf[kind]=MAKE[kind]();cb(buf[kind]);}catch(e){W.__natureErr=String(e);}},30);}
  function fade(k){var x=src[k];if(!x||!ac)return;delete src[k];x.g.gain.setTargetAtTime(0.0001,ac.currentTime,0.6);setTimeout(function(){try{x.s.stop();}catch(e){}},3200);}
  function play(kind){var c=ctx();if(!c)return;mode=kind;Object.keys(src).forEach(function(k){if(k!==kind)fade(k);});mst.gain.cancelScheduledValues(c.currentTime);mst.gain.setTargetAtTime(vol,c.currentTime,0.6);
    get(kind,function(b){if(mode!==kind||src[kind])return;var s=c.createBufferSource();s.buffer=b;s.loop=true;var g=c.createGain();g.gain.value=0.0001;s.connect(g);g.connect(mst);s.start();g.gain.setTargetAtTime(1,c.currentTime,1.0);src[kind]={s:s,g:g};said(kind);});}
  function stop(){mode="off";Object.keys(src).forEach(fade);said("off");}
  /* a touch on a stone: the sound of a stone meeting water (made again in 7.01 from the stream's own palette: soft splash, low round plunk, small bubbles, the stream's room). Her words (13 November 2026): "they are supposed to sound like stone touching
     water or falling on water or being dropped or even being skipped on water and not this heavy woosh sound". So each sound is made only of
     what a stone in water really makes: the small slap where it meets the surface, the round note of the air it pulls under (a bubble's note
     rises as it closes, and fades), and the drops that fall back afterwards; a skipped stone is a run of light slaps, each nearer the last
     and softer, then a small plunk. No rushing noise at all. Each of the stone's ways has its own: set down, dropped in, tapped twice,
     lifted and landed, dropped in with its bubbles circling up, skipped away across the water, and skipped along the whole path. */
  var NZ=null;function nz(c){if(NZ&&NZ.sampleRate===c.sampleRate&&NZ.__c===c)return NZ;var n=Math.floor(c.sampleRate*0.5),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(var k=0;k<n;k++)d[k]=Math.random()*2-1;b.__c=c;return NZ=b;}
  function voice(c,out,t,name,pan){var R=Math.random;var lp=c.createBiquadFilter();lp.type="lowpass";lp.frequency.value=2600;lp.Q.value=0.5;lp.connect(out);
    function pn(node,p){if(c.createStereoPanner){var s=c.createStereoPanner();s.pan.value=Math.max(-1,Math.min(1,p));node.connect(s);s.connect(lp);}else node.connect(lp);}
    /* a soft splash: brown noise, low-passed, its attack gentle so it never clicks */
    function splash(t0,amp,fc,dur,p){var n=c.createBufferSource();n.buffer=brown(c);var f=c.createBiquadFilter();f.type="lowpass";f.frequency.value=fc;f.Q.value=0.4;var g=c.createGain();
      g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(amp,t0+0.008);g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);n.connect(f);f.connect(g);pn(g,p);n.start(t0,R()*0.3);n.stop(t0+dur+0.03);}
    /* the round note of the water closing over the stone: low, rising a little, fading, as the stream's big bubbles */
    function bloop(t0,f0,rise,dur,amp,p){var o=c.createOscillator(),g=c.createGain();o.type="sine";o.frequency.setValueAtTime(f0,t0);o.frequency.exponentialRampToValueAtTime(f0*rise,t0+dur);
      g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(amp,t0+0.010);g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);o.connect(g);pn(g,p);o.start(t0);o.stop(t0+dur+0.03);}
    /* small bubbles after, made as the stream's are */
    function bubbles(t0,n,amp,p){for(var k=0;k<n;k++){var tk=t0+0.07+k*0.07+R()*0.12,f=300*Math.pow(2,R()*1.2);bloop(tk,f,1.10+R()*0.22,0.045+R()*0.05,amp*(0.5+R()*0.5),p+(R()-0.5)*0.4);}}
    /* a stone dropped in: the soft splash, the low round plunk, a few bubbles rising after */
    function plunk(t0,p,k){splash(t0,0.045*k,900,0.18,p);bloop(t0+0.006,150+R()*35,1.20,0.24,0.12*k,p);bloop(t0+0.009,300+R()*50,1.16,0.12,0.028*k,p);bubbles(t0+0.05,3,0.026*k,p);}
    /* a stone set down: a quiet low blub and a bubble */
    function setDown(t0,p,k){splash(t0,0.022*k,700,0.11,p);bloop(t0+0.005,190+R()*30,1.14,0.15,0.075*k,p);bubbles(t0+0.03,1,0.018*k,p);}
    /* a stone skipped: a run of soft touches, each nearer the last and softer, then a small plunk */
    function skip(t0,p,n){var dt=0.24,a=1.0,tk=t0,pp=p;for(var k=0;k<n;k++){splash(tk,0.032*a,1100,0.08,pp);bloop(tk+0.004,280+k*16+R()*18,1.12,0.07,0.05*a,pp);tk+=dt;dt*=0.80;a*=0.80;pp+=0.16;}plunk(tk,pp,0.6);}
    if(name==="double"){setDown(t,pan,1.0);setDown(t+0.32,pan,0.8);}
    else if(name==="hop"){setDown(t,pan,0.5);plunk(t+0.45,pan,1.0);}
    else if(name==="swirl"){plunk(t,pan,0.9);bubbles(t+0.25,4,0.022,pan);}
    else if(name==="glint"){skip(t,pan-0.25,5);}
    else if(name==="chain"){skip(t,-0.62,7);}
    else if(name==="bloom"){plunk(t,pan,1.1);}
    else{plunk(t,pan,0.9);}}
  /* brown noise, made once: the soft body of a splash */
  var BN=null;function brown(c){if(BN&&BN.__c===c)return BN;var n=Math.floor(c.sampleRate*0.5),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0),l=0,m=0;for(var k=0;k<n;k++){l=0.985*l+0.015*(Math.random()*2-1);d[k]=l;m=Math.max(m,Math.abs(l));}for(k=0;k<n;k++)d[k]/=m||1;b.__c=c;return BN=b;}
  function touch(name,i){try{if(W.IngSound&&typeof IngSound.allowed==="function"&&!IngSound.allowed())return;}catch(x){}var c=ctx();if(!c)return;voice(c,tb,c.currentTime+0.01,name,i==null?0:(i-2)*0.22);}
  return {start:function(k){play(k||"stream");},stop:stop,mode:function(){return mode;},on:function(){return mode!=="off";},touch:touch,volume:function(v){vol=v;if(ac&&mst&&mode!=="off")mst.gain.setTargetAtTime(v,ac.currentTime,0.3);},
    hush:function(){},drop:function(s,i){touch("ring",i);},voice:voice};})();
Nature.volume(PREF.vol);
var PLACES=[["off","Quiet","No sound"],["stream","Stream","Small bubbles over a soft, low body of water"],["rain","Rain","Soft rain, near and far"],["waterfall","Waterfall","Falling water, deep and steady"],
  ["waves","Waves","Waves coming in on a beach"],["birds","Birds","Birdsong in the morning"],["night","Night","A summer night: crickets, and a frog now and then"],["wind","Wind","Wind in the trees"]];
var ICO={off:'<path d="M5 10v4h3l4 3.5V6.5L8 10z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',stream:'<path d="M3 9c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0"/><path d="M3 14c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0"/>',
  rain:'<path d="M7 15.5a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8a3.5 3.5 0 0 1 .5 7"/><path d="M9 18l-1 2.5M13 18l-1 2.5M17 18l-1 2.5"/>',waterfall:'<path d="M5 4h14"/><path d="M8 4v11M12 4v14M16 4v11"/><path d="M4 20c2.6-1.4 5.3-1.4 8 0s5.4 1.4 8 0"/>',
  waves:'<path d="M2.5 15c2.3 0 2.3-5 5.8-5 2.6 0 2.6 3 5.2 3 1.6 0 2.1-1.3 2.1-2.4"/><path d="M2.5 19.5c3 0 3-2 6-2s3 2 6 2 3-2 6-2"/>',birds:'<path d="M3 11c2-2 4.5-2 6.5 0 2-2 4.5-2 6.5 0"/><path d="M11 17c1.5-1.4 3.3-1.4 4.8 0 1.5-1.4 3.3-1.4 4.8 0"/>',
  night:'<path d="M18.5 14.5A7 7 0 0 1 9.5 5.5a7 7 0 1 0 9 9z"/><path d="M17 4.5v2M16 5.5h2"/>',wind:'<path d="M3 9h11a3 3 0 1 0-3-3"/><path d="M3 14h15a3 3 0 1 1-3 3"/><path d="M3 11.5h7"/>'};
function svg(k){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICO[k]||ICO.stream)+'</svg>';}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function nameOf(k){for(var i=0;i<PLACES.length;i++)if(PLACES[i][0]===k)return PLACES[i][1];return "Sounds";}
/* ---------- the key in the top bar ---------- */
var key=null,menu=null;
function paintKey(){if(!key)return;var m=Nature.mode(),on=m!=="off",t=on?nameOf(m):"Sounds",kl=key.querySelector(".kl");if(kl&&kl.textContent!==t)kl.textContent=t;
  key.classList.toggle("nat-on",on);key.setAttribute("aria-label",on?"Nature sounds: "+t+" playing":"Nature sounds");key.title=on?t+" is playing. Press to change it, or choose Quiet":"Nature sounds: a stream, rain, waves and more, made on this device";}
function place(){var tools=D.getElementById("topTools");if(!tools)return false;if(key&&key.isConnected)return true;
  key=mk("button","cl-key");key.type="button";key.id="natureBtn";key.setAttribute("aria-haspopup","menu");
  key.innerHTML='<svg class="kico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 9c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0"/><path d="M3 14.5c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0"/></svg><span class="kl">Sounds</span><span class="nat-dot" aria-hidden="true"></span>';
  var at=D.getElementById("displayBtn");if(at&&at.parentNode===tools)tools.insertBefore(key,at);else tools.appendChild(key);
  key.addEventListener("click",function(e){e.preventDefault();if(menu&&menu.isConnected)close();else open();});paintKey();return true;}
function close(){var b=D.querySelector(".pres-back.nat-back");if(b&&b.parentNode)b.parentNode.removeChild(b);menu=null;try{if(typeof W.refreshLayerState==="function")W.refreshLayerState();}catch(e){}}
function paintMenu(){if(!menu||!menu.isConnected)return;var m=Nature.mode();
  [].forEach.call(menu.querySelectorAll(".pres-row[data-k]"),function(r){var k=r.getAttribute("data-k"),on=k===m||(k==="off"&&m==="off");r.classList.toggle("on",on);r.setAttribute("aria-checked",on?"true":"false");
    var tk=r.querySelector(".pres-tick");if(on&&!tk)r.appendChild(mk("span","pres-tick","\u2713"));if(!on&&tk)r.removeChild(tk);
    var tp=r.querySelector(".pres-tip"),P=PLACES.filter(function(x){return x[0]===k;})[0],w=WAIT===k;if(tp){var s=w?"Making it on this device\u2026":P[2];if(tp.textContent!==s)tp.textContent=s;tp.classList.toggle("nat-wait",w);}});}
function choose(k){if(k==="off"){Nature.stop();WAIT="";}else{if(Nature.mode()===k)return;WAIT=k;PREF.last=k;keep();Nature.start(k);}paintKey();paintMenu();}
function open(){close();try{if(typeof W.closePresenceMenu==="function")W.closePresenceMenu();}catch(e){}
  var back=mk("div","pres-back nat-back");back.addEventListener("click",function(e){if(e.target===back)close();});
  menu=mk("div","pres-menu nat-menu");menu.setAttribute("role","menu");menu.setAttribute("aria-label","Nature sounds");
  var r=key.getBoundingClientRect();menu.style.top=Math.round(r.bottom+8)+"px";menu.style.right=Math.max(12,Math.round(W.innerWidth-r.right))+"px";
  menu.appendChild(mk("div","pres-head","Nature sounds"));
  menu.appendChild(mk("div","pres-sub","Made on this device, nothing fetched. A place keeps playing from page to page until you choose Quiet."));
  PLACES.forEach(function(P){var row=mk("button","pres-row");row.type="button";row.setAttribute("role","menuitemradio");row.setAttribute("data-k",P[0]);
    var ic=mk("span","nat-ico");ic.innerHTML=svg(P[0]);row.appendChild(ic);var col=mk("span","pres-col");col.appendChild(mk("span","pres-name",P[1]));col.appendChild(mk("span","pres-tip",P[2]));row.appendChild(col);
    row.addEventListener("pointerdown",function(){try{if(W.IngSound)IngSound.play("keys");}catch(e){}});
    row.addEventListener("click",function(){choose(P[0]);});menu.appendChild(row);
    if(P[0]==="off")menu.appendChild(mk("div","pres-rule"));});
  menu.appendChild(mk("div","pres-rule"));
  var vol=mk("label","nat-vol");vol.appendChild(mk("span",null,"Volume"));var rg=mk("input");rg.type="range";rg.min="0";rg.max="100";rg.step="1";rg.value=String(Math.round(PREF.vol*100));rg.setAttribute("aria-label","Volume of the nature sounds");
  rg.addEventListener("input",function(){PREF.vol=Math.max(0,Math.min(1,(+rg.value||0)/100));Nature.volume(PREF.vol);keep();});vol.appendChild(rg);menu.appendChild(vol);
  menu.addEventListener("keydown",function(e){if(e.key==="Escape"){e.preventDefault();close();try{key.focus();}catch(x){}}});
  back.appendChild(menu);D.body.appendChild(back);paintMenu();try{if(typeof W.refreshLayerState==="function")W.refreshLayerState();}catch(e){}
  var first=menu.querySelector(".pres-row.on")||menu.querySelector(".pres-row");if(first)try{first.focus({preventScroll:true});}catch(e){}}
function start(){if(!place())setTimeout(function(){place();},600);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
W.IngNature={start:function(k){choose(k||"stream");},stop:function(){choose("off");},mode:function(){return Nature.mode();},on:function(){return Nature.on();},touch:Nature.touch,
  volume:function(v){if(v==null)return PREF.vol;PREF.vol=Math.max(0,Math.min(1,+v||0));Nature.volume(PREF.vol);keep();},open:open,close:close,places:function(){return PLACES.map(function(p){return p[0];});},last:function(){return PREF.last;}};
try{window.__ingParts["p295"]="running";}catch(_){}
})();
</script>