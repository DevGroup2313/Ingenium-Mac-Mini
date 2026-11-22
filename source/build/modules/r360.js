<style id="r360-css">
/* ============ R360 · ASKING AND OFFERING, WITH ACCEPT (Ingenium 7.70, 22 November 2026; held until her word on its pictures) ============
   Her words (22 November 2026): "Currently when one Ingenium (A - Request Sender) sends a request to another Ingenium (B - Request
   Receiver) there's no significant visual confirmation that either machine has connected successfully. Pop-up notifications must appear for
   each step displayed below: When A sends a request to B, B must show a pop-up displaying what that request is for (request to lend A's
   models or for A to use B's models), with an accept or decline." With the answers for each scenario, and hers to the questions that day:
   Accept replaces the code, the code staying as an option ("in case it fails"); B's pop-up after accepting an offer names A ("A's models are
   now available for you to use"); A is told when B accepts, too.
   Each step is a sheet of sealed pairing's own kind (r319: raised, rising in, lifting under the pointer, still in Minimal):
   - A asks to use B's models: on A, Asked B, with the four words and Stop asking (or Type its code instead); on B, A asks to use your
     models, the same four words, Accept and Decline; then on B, "Your models can now be used by A. Go to the Mentes page to track A's
     usage." or "You declined A's request."; on A, "B accepted: you can now use B's models." or "B declined your request."
   - A offers to lend B its models (Offer my models, beside each device in Your devices on A): on B, A offers to lend you its models, Accept
     and Decline; then on B, "A's models are now available for you to use." or "You declined A's request."; on A, "B accepted: your models
     are now lent to B. Go to the Mentes page to track B's usage." or "B declined your request."
   The computer's side is build/desktop/app_ask_770.py (POST /ingenium/ask, its state, a declined offer, hello's offers, share_asks,
   share_offer); r319 and r274 carry the hooks, which do nothing without this part. Sealed always: only a device that seals may ask without
   the code; one that cannot types the code, as before. */
.sl-sheet .ak-out{display:grid;justify-items:start;gap:10px}
.sl-sheet .ak-out .sl-chip{margin-top:-2px}
.sl-sheet .ak-small{font-size:12.5px;color:var(--mr-ink3,#73698a)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p360"]="started";}catch(_){}
(function(){"use strict";
var W=window,D=document;if(W.IngAsk)return;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function shell(){try{var a=W.pywebview&&W.pywebview.api;return a&&typeof a.share_status==="function"?a:null;}catch(e){return null;}}
function toast(t){try{(W.ingToast||W.toast)(t);}catch(e){}}
function toMentes(){try{go("models");}catch(e){}try{if(W.IngLendMeter&&IngLendMeter.show)IngLendMeter.show();}catch(e){}}
/* a sheet of r319's kind, for the steps this part adds (r319's own veil when it hands one over) */
function sheet(id,html,keys,k){var x;
  if(k&&k.veil)x=k.veil(id);
  else{var old=D.getElementById(id);if(old)old.remove();var v=D.createElement("div");v.className="sl-veil";v.id=id;var sh=D.createElement("div");sh.className="sl-sheet";
    sh.setAttribute("role","dialog");sh.setAttribute("aria-modal","true");v.appendChild(sh);D.body.appendChild(v);x={v:v,sh:sh};}
  x.sh.innerHTML=html+'<div class="sl-row ak-keys"></div>';var row=x.sh.querySelector(".ak-keys");
  (keys||[]).forEach(function(q){var b=D.createElement("button");b.type="button";b.className="sl-key"+(q.pri?" pri":"");b.textContent=q.t;
    b.onclick=function(){if(q.keep!==true)x.v.remove();if(q.fn)q.fn(b);};row.appendChild(b);});
  try{row.firstChild.focus();}catch(e){}return x;}
function head(eye,chip,cls){return '<div class="sl-tagline"><span class="sl-eye">'+esc(eye)+'</span>'+(chip?'<span class="sl-chip '+(cls||"sky")+'">'+esc(chip)+'</span>':"")+'</div>';}
function wordsOf(w,k){if(!w||!w.length)return "";if(k&&k.words)return k.words(w);return '<div class="sl-words">'+w.map(function(x,i){return '<span class="sl-word"><i>'+(i+1)+'</i>'+esc(x)+'</span>';}).join("")+'</div>';}
function done(nm,text,chip,keys,k){return sheet("akDone",head("Your devices",chip||"",chip?"ok":"")+'<h2>'+esc(text)+'</h2>',keys||[{t:"Close",pri:true}],k);}

/* ---------- on B, the computer: a device asks to use its models (r319 hands each waiting ask here) ---------- */
function computer(a,k){var nm=a.name||"A device",plain=!(a.words&&a.words.length),x;
  x=sheet("sealAsk",head("Your devices","Waiting for you")+'<h2>'+esc(nm)+' asks to use your models</h2>'
    +(plain?'<p>It cannot seal what it sends (its Ingenium is older, or it does not allow it). Accepted, the code alone guards what passes between them, as before 7.37.</p>'
      :'<p>Accept to let '+esc(nm)+' use your models. First check that it shows these same four words, in this order:</p>'+wordsOf(a.words,k)),
    [{t:"Accept",pri:true,keep:true,fn:function(b){answer(true,b);}},{t:"Decline",keep:true,fn:function(b){answer(false,b);}}],k);
  function answer(yes,b){if(k.busy())return;k.busy(true);
    Promise.resolve().then(function(){return k.api.seal_answer(a.rid,yes);}).then(function(r){k.busy(false);x.v.remove();
      if(r&&r.ok===false){toast(r.error||"That device is no longer waiting.");k.done();return;}
      if(yes)done(nm,"Your models can now be used by "+nm+".","Sealed end to end",[{t:"Go to Mentes",pri:true,fn:toMentes},{t:"Close"}],k)
        .sh.querySelector("h2").insertAdjacentHTML("afterend",'<p>Go to the Mentes page to track '+esc(nm)+'’s usage.</p>');
      else done(nm,"You declined "+nm+"’s request.","",null,k);
      k.done();},function(){k.busy(false);});}
  return true;}

/* ---------- on A, the device: its ask (or its acceptance of an offer) and the answer ---------- */
var TOCODE=null;
function device(name,w,stop,k){var mode=k&&k.ask||"",x;
  function waiting(){var keys=[{t:mode==="offer"?"Stop":"Stop asking",fn:function(){stop();}}];
    if(mode==="use"&&TOCODE){var tc=TOCODE;keys.push({t:"Type its code instead",fn:function(){stop();tc();}});}
    x=sheet("sealPair",head("Your devices",mode==="offer"?"Accepting":"Asked","sky")+'<h2>'+(mode==="offer"?"Accepting "+esc(name)+"’s offer":"Asked "+esc(name)+" to use its models")+'</h2>'
      +(w?'<p>'+(mode==="offer"?"Pairing, sealed end to end. ":"Waiting for "+esc(name)+" to accept. ")+esc(name)+' shows four words: check they are these, in this order.</p>'+wordsOf(w,k)
        :'<p>This device cannot seal what it sends, so '+esc(name)+' asks whether to allow it with the code alone.</p>'),keys,k);}
  waiting();
  return {say:function(kind,text){try{x.v.remove();}catch(e){}
    if(kind==="ok"){if(mode==="offer")done(name,name+"’s models are now available for you to use.","Sealed end to end",null,k);
      else done(name,name+" accepted: you can now use "+name+"’s models.","Sealed end to end",null,k);
      try{if(W.IngLend&&IngLend.repaint)IngLend.repaint();}catch(e){}return;}
    if(kind==="plain"){done(name,"Paired, unsealed","",null,k).sh.querySelector("h2").insertAdjacentHTML("afterend",'<p>'+esc(text)+'</p>');return;}
    if(/refused/.test(String(text||"")))done(name,name+" declined your request.","",null,k);
    else done(name,"Not paired","",null,k).sh.querySelector("h2").insertAdjacentHTML("afterend",'<p>'+esc(text)+'</p>');}};}

/* a computer found on the network, pressed: ask it (the code stays the other way) */
function found(x,toCode,after){if(!W.IngLend||!IngLend.ask){toCode();return;}
  TOCODE=toCode;IngLend.ask(x.address,"use").then(function(){TOCODE=null;if(after)after();},function(e){TOCODE=null;var m=String(e&&e.message||e);
    if(/Stopped|stopped/.test(m))return;if(/code/.test(m)){toast(m);toCode();return;}if(!/declined|refused|five minutes/.test(m))toast(m);});}

/* ---------- on A, the computer that lends: Offer my models, beside each device that is not using them now ---------- */
function devRow(row,d,key){var api=shell();if(!api||typeof api.share_offer!=="function"||d.sealed)return;
  var on=OFFERS.indexOf(d.id)>=0;
  row.appendChild(key(on?"Offered":"Offer my models",on?"":"mr-primary",function(){Promise.resolve().then(function(){return api.share_offer(d.id,!on);}).then(function(r){
      if(r&&r.ok===false){toast(r.error||"The offer could not be made.");return;}OFFERS=(r&&r.offers)||[];
      toast(on?"The offer to "+(d.name||"that device")+" is withdrawn.":"Offered to "+(d.name||"that device")+". It is asked as soon as its Ingenium looks for this computer, while it is open.");
      try{if(W.IngLend&&IngLend.repaint)IngLend.repaint();}catch(e){}});},on?"Withdraw the offer":"Offer this computer's models to "+(d.name||"this device")));}
/* and to a device nearby, new to this computer: any device of hers that looks for computers in the next ten minutes is asked */
function lenderKeys(u,key){var api=shell();if(!api||typeof api.share_offer!=="function")return;var on=OFFERS.indexOf("*")>=0;
  var r=D.createElement("div");r.className="ld-row";
  r.appendChild(key(on?"Offered to a device nearby":"Offer my models to a device nearby",on?"":"mr-primary",function(){Promise.resolve().then(function(){return api.share_offer("*",!on);}).then(function(x){
      if(x&&x.ok===false){toast(x.error||"The offer could not be made.");return;}OFFERS=(x&&x.offers)||[];
      toast(on?"The offer is withdrawn.":"Offered for ten minutes: a device of yours that looks for this computer now is asked whether to use its models.");
      try{if(W.IngLend&&IngLend.repaint)IngLend.repaint();}catch(e){}});},on?"Withdraw the offer":"Ask a device nearby whether it wants to use this computer's models"));
  u.appendChild(r);}
/* the answers to her offers, as they come (each once) */
var OFFERS=[],ATIMER=0;
function lenderPoll(){var api=shell();clearTimeout(ATIMER);if(!api||typeof api.share_asks!=="function")return;
  Promise.resolve().then(function(){return api.share_asks();}).then(function(r){if(!r)return;OFFERS=r.offers||[];
    (r.answers||[]).forEach(function(x){if(x.mode!=="offer")return;var nm=x.name||"A device";
      if(x.answer==="accepted"){var s=done(nm,nm+" accepted: your models are now lent to "+nm+".","Sealed end to end",[{t:"Go to Mentes",pri:true,fn:toMentes},{t:"Close"}]);
        s.sh.querySelector("h2").insertAdjacentHTML("afterend",'<p>Go to the Mentes page to track '+esc(nm)+'’s usage.</p>');}
      else done(nm,nm+" declined your request.");});},function(){})
    .then(function(){ATIMER=setTimeout(lenderPoll,D.hidden?8000:3000);});}

/* ---------- on B, a device: a computer offers it its models ---------- */
var SEEN={},OTIMER=0;
function offerSheet(h,addr){var nm=h.computer||"Your computer";SEEN[h.id||addr]=1;
  sheet("akOffer",head("Your devices","Waiting for you")+'<h2>'+esc(nm)+' offers to lend you its models</h2><p>Accept to use '+esc(nm)+'’s models from this '+esc(((W.IngLend&&IngLend.me&&IngLend.me().kind)||"device"))+'. It is sealed end to end: you compare four words next.</p>',
    [{t:"Accept",pri:true,fn:function(){IngLend.ask(addr,"offer").catch(function(e){var m=String(e&&e.message||e);if(!/declined|refused|Stopped/.test(m))toast(m);});}},
     {t:"Decline",fn:function(){var me=IngLend.me?IngLend.me():{};
       Promise.resolve().then(function(){return W.netFetch(String(addr).replace(/\/+$/,"")+"/ingenium/ask/decline",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:me.id,kind:me.kind,name:me.name}),timeout:10});})
         .catch(function(){}).then(function(){done(nm,"You declined "+nm+"’s request.");});}}]);}
function baseOf(a){a=String(a||"");if(!/^https?:\/\//.test(a))a="http://"+a;if(!/:\d+$/.test(a.replace(/\/+$/,"")))a=a.replace(/\/+$/,"")+":17860";return a.replace(/\/+$/,"");}
function offerPoll(){clearTimeout(OTIMER);if(!W.IngLend||!IngLend.hello||!IngLend.state){OTIMER=setTimeout(offerPoll,30000);return;}
  var me=IngLend.me?IngLend.me():{},st=IngLend.state()||{},cand=[];
  (st.computers||[]).forEach(function(c){if(c.base)cand.push({addr:c.base,id:c.id,known:true});});
  (IngLend.found?IngLend.found():[]).forEach(function(x){if(x&&x.address)cand.push({addr:baseOf(x.address),id:x.id,known:false});});
  var ask=cand.filter(function(c,i){return !SEEN[c.id||c.addr]&&cand.findIndex(function(o){return (o.id||o.addr)===(c.id||c.addr);})===i;}).slice(0,6);
  Promise.all(ask.map(function(c){return IngLend.hello(c.addr).then(function(h){
      if(!h||D.getElementById("akOffer")||D.getElementById("sealPair"))return;var of=h.offers||[];
      if(of.indexOf(me.id)>=0||(of.indexOf("*")>=0&&!c.known))offerSheet(h,c.addr);},function(){});}))
    .then(function(){OTIMER=setTimeout(offerPoll,D.hidden?60000:20000);});}

W.IngAsk={computer:computer,device:device,found:found,devRow:devRow,lenderKeys:lenderKeys,_lenderPoll:lenderPoll,_offerPoll:offerPoll,_seen:SEEN};
setTimeout(function wait(){if(W.__ingReady===true){lenderPoll();offerPoll();}else setTimeout(wait,1200);},1500);
})();
;try{window.__ingParts["p360"]="running";}catch(_){}
</script>
