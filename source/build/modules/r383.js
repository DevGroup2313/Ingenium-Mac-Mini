<style id="r383-css">
/* ============ R383 · VOCATIO: PRACTISE, DEEPENED (Ingenium 7.84, 25 November 2026) ============
   Her approval of the live preview (https://claude.ai/artifact/G3YPubJyRy9pe9DphJH62R, 25 November 2026): "I approve of the previews but
   I want the "Your submission pack" cards to also have the animated effect and lift of hover and I want the same effect for the "Against
   the posting's criteria" section as well". Recommendation 10 of 24 November, before her Cambridge deadline of 8 December. In an
   application's 5 Practise, Interview questions (r188's stepPractise calls IngPractise.paint), beside what was there (the question, the
   mock run on the Clepsydra, the answer, Look at it with me):
   - Answer aloud: Scriba's own ears (r254's capture, copied as it stands: the microphone with echo cancelling, noise suppression and
     automatic gain; the sound kept on this device and written down by Scriba's in-house model, IngEars.write), with a level that moves
     as she speaks; what she said is added to her answer. Typing stays as before.
   - A clock for the answer: an analogue dial of one, two or three minutes, which starts as she starts to speak (or with its own key).
   - Against the posting's criteria: the answer read against each criterion of the reading (o.read.r.crit) by the model: met, partly or
     not yet, the sentence of her answer it rests on, quoted, and one thing to add. Each line lifts under the pointer (her change).
   - Her best answers: kept with the question, the time taken and how many criteria they met, three for each question, newest first.
   Vocatio's own tokens (#cs, r188), by day and by night; every key raised, lifting under the pointer and sinking when pressed. */
#cs .vq-row{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin:8px 0 10px}
#cs .vq-dial{width:118px;height:118px;flex:0 0 auto}
#cs .vq-dial .face{fill:var(--c-card);stroke:var(--c-hair);stroke-width:2}
#cs .vq-dial .tk{stroke:var(--c-ink3);stroke-width:1.2}
#cs .vq-dial .arc{fill:none;stroke:var(--c-acc);stroke-width:4.5;stroke-linecap:round;transition:stroke-dashoffset .5s linear}
#cs .vq-dial text{fill:var(--c-ink1);font:600 19px Inter,system-ui,sans-serif;font-variant-numeric:tabular-nums}
#cs .vq-dial .lb{fill:var(--c-ink3);font:600 7.5px Inter,system-ui,sans-serif;letter-spacing:.14em}
#cs .vq-ctl{display:grid;gap:8px;justify-items:start;min-width:0;flex:1 1 240px}
#cs .vq-ctl .c-btn{justify-self:start}
#cs .vq-keys{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
#cs .vq-len{display:inline-grid;grid-template-columns:repeat(3,auto);gap:2px;background:var(--c-wellbg);border-radius:10px;padding:3px;box-shadow:var(--c-well)}
#cs .vq-len button{appearance:none;border:0;background:none;color:var(--c-ink3);font:600 12px/1 Inter,system-ui,sans-serif;padding:7px 9px;border-radius:7px;cursor:pointer;transition:transform .18s,box-shadow .18s,color .18s}
#cs .vq-len button:hover{transform:translateY(-1px);color:var(--c-ink1)}
#cs .vq-len button[aria-checked="true"]{background:linear-gradient(var(--c-a),var(--c-b));color:var(--c-ink1);box-shadow:var(--c-pop)}
#cs .vq-lvl{display:flex;gap:3px;align-items:flex-end;height:24px}
#cs .vq-lvl i{width:5px;height:5px;border-radius:3px;background:var(--c-acc);opacity:.25;transition:height .1s,opacity .1s}
#cs .vq-lvl.on i{opacity:.85}
#cs .vq-say{font-size:12.5px;color:var(--c-ink3);margin:0}
#cs .c-btn.vq-rec{background:linear-gradient(#c45762,#a8323e);color:#fff;border-color:#7d1f29}
#cs .vq-h{margin:14px 0 6px;font-family:"Cormorant Garamond",Georgia,serif;font-size:19px;font-weight:600;color:var(--c-ink1)}
#cs .vq-cr,#cs .vq-best{display:grid;gap:8px;margin:0;padding:0;list-style:none}
/* each criterion's line lifts under the pointer (her change) */
#cs .vq-cr li,#cs .vq-best li{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:start;border:1px solid var(--c-hair);border-radius:12px;background:linear-gradient(var(--c-a),var(--c-b));padding:10px 12px;
  box-shadow:var(--c-pill,var(--c-pop));transition:transform .2s cubic-bezier(.2,.9,.3,1.3),box-shadow .2s}
#cs .vq-cr li:hover,#cs .vq-best li:hover{transform:translateY(-2px);box-shadow:var(--c-pophi)}
#cs .vq-best li{grid-template-columns:minmax(0,1fr)}
#cs .vq-cr b,#cs .vq-best b{color:var(--c-ink1);font-weight:600}
#cs .vq-cr .q{font-size:12.5px;color:var(--c-ink2);margin-top:3px}
#cs .vq-cr .add{font-size:12.5px;color:var(--c-ink3);margin-top:2px}
#cs .vq-chip{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;border-radius:999px;padding:5px 9px;white-space:nowrap;background:var(--c-accs);color:var(--c-acc)}
#cs .vq-chip i{width:7px;height:7px;border-radius:50%;background:currentColor;display:block}
#cs .vq-chip.ok{background:var(--c-oks);color:var(--c-ok)}#cs .vq-chip.warn{background:var(--c-warns);color:var(--c-warn)}#cs .vq-chip.bad{background:var(--c-bads);color:var(--c-bad)}
#cs .vq-best .m{font-size:12px;color:var(--c-ink3)}
#cs .vq-best .t{font-size:13px;color:var(--c-ink2);margin-top:4px;white-space:pre-wrap}
@media (prefers-reduced-motion:reduce){#cs .vq-cr li,#cs .vq-best li,#cs .vq-len button{transition:none}#cs .vq-cr li:hover,#cs .vq-best li:hover{transform:none}}
body[data-motion="minimal"] #cs .vq-cr li:hover,body[data-motion="minimal"] #cs .vq-best li:hover{transform:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p383"]="started";}catch(_){}
/* R383 · Vocatio's Practise, deepened: see the note at the top of its styles. window.IngPractise: {paint, parse, dial} */
(function(){"use strict";var W=window,D=document;
function h(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function snd(){try{if(W.IngSound&&IngSound.play)IngSound.play("keys");}catch(e){}}
function say(t){try{ingToast(t);}catch(e){}}
var LEN=120,REC=null,CLOCK=null;/* one recording and one clock at a time */
/* ---------- the dial ---------- */
var C=2*Math.PI*48;
function dial(){var s='<svg class="vq-dial" viewBox="0 0 118 118" role="img" aria-label="The time for this answer"><circle class="face" cx="59" cy="59" r="56"/>';
  for(var i=0;i<60;i++){var a=i/60*2*Math.PI,r1=i%5?50:46;s+='<line class="tk" x1="'+(59+r1*Math.sin(a)).toFixed(1)+'" y1="'+(59-r1*Math.cos(a)).toFixed(1)+'" x2="'+(59+54*Math.sin(a)).toFixed(1)+'" y2="'+(59-54*Math.cos(a)).toFixed(1)+'"/>';}
  return s+'<circle class="arc" cx="59" cy="59" r="48" transform="rotate(-90 59 59)" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="0"/><text x="59" y="64" text-anchor="middle">2:00</text><text class="lb" x="59" y="80" text-anchor="middle">TO ANSWER</text></svg>';}
function fmt(s){s=Math.max(0,Math.round(s));return Math.floor(s/60)+":"+(s%60<10?"0":"")+(s%60);}
function show(svg,left){if(!svg)return;var t=svg.querySelector("text"),a=svg.querySelector(".arc");if(t)t.textContent=fmt(left);if(a)a.setAttribute("stroke-dashoffset",(C*(1-Math.max(0,left)/LEN)).toFixed(1));}
function startClock(svg,onEnd){stopClock();var t0=Date.now();CLOCK={t0:t0,svg:svg,iv:setInterval(function(){var left=LEN-(Date.now()-t0)/1000;show(CLOCK&&CLOCK.svg,left);if(left<=0){var cb=onEnd;stopClock();if(cb)cb();}},250)};show(svg,LEN);}
function stopClock(){if(!CLOCK)return 0;clearInterval(CLOCK.iv);var secs=Math.round((Date.now()-CLOCK.t0)/1000);CLOCK=null;return secs;}
/* ---------- the voice: r254's capture, copied as it stands ---------- */
function listen(lvl,done){var E=W.IngEars;if(!E||!E.deviceOk||!E.deviceOk()){say("Scriba's ears are not on this device: write your answer instead.");return false;}
  navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true,channelCount:1}}).then(function(stream){
    var AC=W.AudioContext||W.webkitAudioContext,ctx=new AC();try{if(ctx.state==="suspended")ctx.resume();}catch(e){}
    var src=ctx.createMediaStreamSource(stream),proc=ctx.createScriptProcessor(4096,1,1),sink=ctx.createGain();sink.gain.value=0;
    REC={stream:stream,ctx:ctx,src:src,proc:proc,sink:sink,parts:[],len:0,rate:ctx.sampleRate,lvl:lvl,done:done};
    proc.onaudioprocess=function(e){if(!REC)return;var d=e.inputBuffer.getChannelData(0);REC.parts.push(new Float32Array(d));REC.len+=d.length;
      var sum=0;for(var i=0;i<d.length;i+=8)sum+=d[i]*d[i];var rms=Math.sqrt(sum/(d.length/8));
      if(REC.lvl)[].forEach.call(REC.lvl.children,function(b,k){b.style.height=(5+Math.min(19,rms*400*(0.6+0.8*Math.abs(Math.sin(k*1.7+Date.now()/180)))))+"px";});};
    src.connect(proc);proc.connect(sink);sink.connect(ctx.destination);if(lvl)lvl.classList.add("on");
    try{E.ready(E.lang()).then(function(){},function(){});}catch(e){}
  }).catch(function(err){var n=err&&err.name||"";say(n==="NotAllowedError"||n==="SecurityError"?"The microphone was not allowed. Allow it for Ingenium, then press Answer aloud again.":n==="NotFoundError"?"No microphone was found on this device.":"The microphone could not be opened: "+String(err&&err.message||err||"unknown")+".");if(done)done(null);});
  return true;}
function unlisten(){var r=REC;if(!r)return Promise.resolve("");REC=null;
  try{r.proc.disconnect();r.src.disconnect();r.sink.disconnect();}catch(e){}try{r.stream.getTracks().forEach(function(t){t.stop();});}catch(e){}try{r.ctx.close();}catch(e){}
  if(r.lvl){r.lvl.classList.remove("on");[].forEach.call(r.lvl.children,function(b){b.style.height="5px";});}
  if(!r.len)return Promise.resolve("");var a=new Float32Array(r.len),o=0;r.parts.forEach(function(p){a.set(p,o);o+=p.length;});var E=W.IngEars;
  return Promise.resolve(E.resample?E.resample(a,r.rate):a).then(function(f){return E.write(f,E.lang());}).then(function(t){return String(t||"").trim();});}
/* ---------- against the criteria ---------- */
function crits(o){var r=o.read&&o.read.r;return r&&Array.isArray(r.crit)?r.crit:[];}
function msgs(o,q,answer,A){var cr=crits(o);return [{role:"system",content:A.sys("You are now an interview panel reading one answer against the post's criteria. You read only the answer you are given and never invent what it does not say.")},
  {role:"user",content:"THE QUESTION: "+q.q+"\n\nTHE ANSWER, as the candidate gave it:\n"+answer+"\n\nTHE CRITERIA:\n"+cr.map(function(c,i){return (i+1)+". "+c.text+(c.ess?" (essential)":" (desirable)");}).join("\n")+
    "\n\nFor each criterion, write one line, in this form and nothing else:\n<number> | MET or PARTLY or NOT YET | the sentence of the answer it rests on, copied exactly in quotation marks, or NONE | one short thing to add, in plain words\nWrite a line for every criterion, in order. Judge only from the answer."}];}
function parse(t,n){var out=[];String(t||"").replace(/<think>[\s\S]*?<\/think>/gi,"").split(/\n+/).forEach(function(line){var m=/^\s*(\d+)\s*[|.)]\s*(MET|PARTLY|NOT YET|NOT)\s*\|\s*(.*?)\s*\|\s*(.*)$/i.exec(line);if(!m)return;var i=+m[1]-1;if(i<0||i>=n)return;
    var v=/^MET$/i.test(m[2])?"met":/^PARTLY$/i.test(m[2])?"partly":"no",qt=m[3].replace(/^["“']+|["”']+$/g,"").trim();if(/^none$/i.test(qt))qt="";out[i]={i:i,v:v,quote:qt.slice(0,300),add:m[4].trim().slice(0,240)};});
  return out.filter(Boolean);}
/* a quoted sentence counts only if it is in her answer (a model may not put words in her mouth) */
function honest(list,answer){var A0=String(answer||"").replace(/\s+/g," ").toLowerCase();return list.map(function(x){var q0=x.quote.replace(/\s+/g," ").toLowerCase();if(q0&&A0.indexOf(q0)<0){x.quote="";if(x.v==="met")x.v="partly";}return x;});}
function paint(o,q,ctx,A){if(!o||!q||!ctx||!ctx.pane||!ctx.ta)return;var pane=ctx.pane,ta=ctx.ta;
  /* the clock and the voice, above the answer */
  var row=h("div","vq-row"),dw=h("div");dw.innerHTML=dial();var svg=dw.firstChild;row.appendChild(svg);var ctl=h("div","vq-ctl"),keys=h("div","vq-keys"),lvl=h("div","vq-lvl");for(var i=0;i<12;i++)lvl.appendChild(h("i"));
  var len=h("div","vq-len");len.setAttribute("role","radiogroup");len.setAttribute("aria-label","The time for this answer");[[60,"1 min"],[120,"2 min"],[180,"3 min"]].forEach(function(x){var b=h("button",null,x[1]);b.type="button";b.setAttribute("role","radio");b.setAttribute("aria-checked",String(LEN===x[0]));
    b.addEventListener("click",function(){LEN=x[0];[].forEach.call(len.children,function(c){c.setAttribute("aria-checked",String(c===b));});if(!CLOCK)show(svg,LEN);snd();});len.appendChild(b);});
  var note=h("p","vq-say","Your voice stays on this device: Scriba's own model writes down what you say, and it is added to your answer.");
  var rec=A.button("pri","Answer aloud",function(){if(REC){finish();return;}if(listen(lvl,function(){reset();}))begun();}),clk=A.button("","Start the clock",function(){if(CLOCK){q.secs=stopClock();clk.textContent="Start the clock";A.save();return;}startClock(svg,function(){clk.textContent="Start the clock";});clk.textContent="Stop the clock";});
  function begun(){rec.textContent="Stop and write it down";rec.classList.add("vq-rec");startClock(svg,function(){finish();});note.textContent="Listening on this device. Press Stop and write it down when you have finished.";}
  function reset(){rec.textContent="Answer aloud";rec.classList.remove("vq-rec");note.textContent="Your voice stays on this device: Scriba's own model writes down what you say, and it is added to your answer.";}
  function finish(){var secs=stopClock();q.secs=secs;reset();note.textContent="Writing down what you said…";unlisten().then(function(t){if(!t){note.textContent="Nothing was heard. Check that the right microphone is chosen on this device, then try again.";return;}
      ta.value=(ta.value.trim()?ta.value.trim()+"\n\n":"")+t;q.answer=ta.value;A.save();note.textContent="Written down: "+t.split(/\s+/).length+" words, in "+fmt(secs)+".";},function(e){note.textContent="It could not be written down: "+String(e&&e.message||e)+". Write it instead.";});}
  keys.appendChild(rec);keys.appendChild(clk);keys.appendChild(len);ctl.appendChild(keys);ctl.appendChild(lvl);ctl.appendChild(note);row.appendChild(ctl);pane.insertBefore(row,ta);show(svg,LEN);
  ta.addEventListener("input",function(){q.answer=ta.value;});
  /* against the posting's criteria, and her best answers, after the answer */
  var cr=crits(o);if(cr.length){pane.appendChild(h("h4","vq-h","Against the posting's criteria"));var ul=h("ul","vq-cr");
    if(q.crit&&q.crit.length)q.crit.forEach(function(x){var c=cr[x.i];if(!c)return;var li=h("li"),ch=h("span","vq-chip "+(x.v==="met"?"ok":x.v==="partly"?"warn":"bad"));ch.appendChild(h("i"));ch.appendChild(D.createTextNode(x.v==="met"?"Met":x.v==="partly"?"Partly":"Not yet"));li.appendChild(ch);
      var d=h("div");d.appendChild(h("b",null,c.text));if(x.quote)d.appendChild(h("div","q","“"+x.quote+"”"));if(x.add)d.appendChild(h("div","add",x.add));li.appendChild(d);ul.appendChild(li);});
    else{var li0=h("li"),ch0=h("span","vq-chip");ch0.appendChild(h("i"));ch0.appendChild(D.createTextNode("Waiting"));li0.appendChild(ch0);li0.appendChild(h("div",null,"Answer first; then each of the "+cr.length+" criteria is read against what you said, with the sentence it rests on."));ul.appendChild(li0);}
    pane.appendChild(ul);}
  if(q.best&&q.best.length){pane.appendChild(h("h4","vq-h","Your best answers"));var bl=h("ul","vq-best");q.best.forEach(function(b){var li=h("li"),d=h("div");d.appendChild(h("div","m",new Date(b.at).toLocaleDateString("en-GB",{day:"numeric",month:"long"})+(b.secs?" · "+fmt(b.secs):"")+(b.met!=null&&cr.length?" · meets "+b.met+" of "+cr.length+" criteria":"")));d.appendChild(h("div","t",b.answer));li.appendChild(d);bl.appendChild(li);});pane.appendChild(bl);}
  if(cr.length)ctx.foot.insertBefore(A.button("","Read it against the criteria",function(){var t=ta.value.trim();if(t.length<20){say("Write or say a few sentences first: the panel reads what you answer.");return;}if(A.busyNow()||A.needModel())return;
      q.answer=t;A.save();A.begin(o,"Reading your answer against the criteria");A.ask(function(){return msgs(o,q,t,A);},900,0.2).then(function(out){q.crit=honest(parse(out,cr.length),t);q.critAt=Date.now();if(!q.crit.length)say("The model did not answer in the form asked: try again.");A.save();A.end();},A.failed);}),ctx.foot.lastChild);
  ctx.foot.insertBefore(A.button("","Keep as a best answer",function(){var t=ta.value.trim();if(t.length<20){say("Write or say your answer first.");return;}if(!Array.isArray(q.best))q.best=[];
      q.best.unshift({answer:t,at:Date.now(),secs:q.secs||0,met:q.crit&&q.crit.length?q.crit.filter(function(x){return x.v==="met";}).length:null});q.best=q.best.slice(0,3);A.save();A.render();say("Kept with your best answers, on this device.");}),ctx.foot.lastChild);}
W.IngPractise={version:1,paint:paint,parse:parse,honest:honest,dial:dial,listening:function(){return !!REC;}};
try{window.__ingParts["p383"]="running";}catch(_){}
})();
</script>
