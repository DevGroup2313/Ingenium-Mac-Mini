/* Home's own click: the engine button's sound on Home ("Page set": wood and paper set down), made exactly as Ingenium makes it (r176) */
var HS=(function(){var AC=W.AudioContext||W.webkitAudioContext,live=null,E=null,OUT=null,EDGE=null,lastAt=0;
  function softEdge(){if(EDGE)return EDGE;var n=2049,k=new Float32Array(n);for(var i=0;i<n;i++){var x=i*2/(n-1)-1,a=Math.abs(x);k[i]=a<=0.8?x:(x<0?-1:1)*(0.8+0.17*Math.tanh((a-0.8)/0.17));}return (EDGE=k);}
  function engine(c){var e={c:c};e.master=c.createGain();e.master.gain.value=1;try{var edge=c.createWaveShaper();edge.curve=softEdge();edge.oversample="none";e.master.connect(edge);edge.connect(c.destination);}catch(x){e.master.connect(c.destination);}return e;}
  function ctxLive(){if(!AC)return null;if(!live){try{live=engine(new AC());}catch(x){return null;}}if(live.c.state!=="running"){try{var pr=live.c.resume();if(pr&&pr.catch)pr.catch(function(){});}catch(x){}}return live;}
  function rnd(a,b){return a+Math.random()*(b-a);}
  function tone(t,freq,a,d,peak,type,drift){var c=E&&E.c;if(!c||!OUT)return;var o=c.createOscillator(),g=c.createGain();o.type=type||"sine";o.frequency.setValueAtTime(freq,t);if(drift)o.frequency.exponentialRampToValueAtTime(freq*drift,t+a+d);
    g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(0.0002,peak),t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+a+d);o.connect(g);g.connect(OUT);o.start(t);o.stop(t+a+d+0.05);}
  function grain(t,dur,peak,freq,q){var c=E&&E.c;if(!c||!OUT)return;var n=Math.max(2,Math.floor(c.sampleRate*dur)),buf=c.createBuffer(1,n,c.sampleRate),d=buf.getChannelData(0),last=0;
    for(var i=0;i<n;i++){var w=Math.random()*2-1;last=last*0.55+w*0.45;d[i]=last;}
    var s=c.createBufferSource();s.buffer=buf;var f=c.createBiquadFilter();f.type="bandpass";f.frequency.setValueAtTime(freq,t);f.Q.setValueAtTime(q,t);
    var g=c.createGain();g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(0.0002,peak),t+dur*0.3);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);s.connect(f);f.connect(g);g.connect(OUT);s.start(t);s.stop(t+dur+0.02);}
  function cloud(t,len,count,fLo,fHi,peak,shape){for(var i=0;i<count;i++){var u=Math.random(),at=t+Math.pow(u,shape||1)*len+rnd(-0.005,0.005);var env=Math.sin(Math.PI*Math.min(1,Math.max(0,(at-t)/len)));grain(at,rnd(0.008,0.026),peak*rnd(0.35,1)*(0.35+0.65*env),rnd(fLo,fHi),rnd(1.2,4));}}
  function pageSet(t,L){cloud(t,0.09,30,440,1600,0.050*L,0.5);tone(t,70,0.010,0.40,0.120*L,"sine",0.90);tone(t,110,0.010,0.26,0.050*L,"sine",0.92);tone(t+0.01,165,0.008,0.13,0.020*L,"sine",0.92);}
  return {play:function(role){if(role!=="paper")return false;var now=Date.now();if(now-lastAt<90)return false;var e=ctxLive();if(!e)return false;try{E=e;OUT=e.master;pageSet(e.c.currentTime+0.02,0.55);}catch(x){return false;}finally{E=null;OUT=null;}lastAt=now;return true;}};})();
W.IngSound={play:function(k){return HS.play(k);}};
