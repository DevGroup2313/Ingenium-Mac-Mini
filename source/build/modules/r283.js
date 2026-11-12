<style id="r283-css">
/* ============ R283 · YOUR COUNSELLOR: ONE PATH THROUGH THE CAREER STUDIO (Ingenium 6.90, 12 November 2026) ============
   Her words (12 November 2026): "the current set up of the Career and Lector page are still not quite well curated enough and
   customised for me. Both pages are still not streamlined and integrated well enough to help me navigate my applications process
   ... It creates more work and is not really AuDHD accessible"; "I don't want to have to input my information for my profile from
   scratch on my master version, its really tedious"; "I am still unclear on what exactly I am looking for so I would like for
   Ingenium to provide that inside of the app and be my in-app recruiter/mentor/counselor/headhunter. I want that to be replicable for
   a second user profile and so forth."
   Measured on 6.89: the mentor's seven steps asked for a press at every turn (Add, Add, Add; eight boxes to type in; Keep or Drop one
   entry at a time; Find them; Show me paths), and the same findings lived again in Your profile and Your edge. Now the room is one
   path of five stages, each one card, in the studio's own faces (r188's panels, keys, chips, entries and steps):
   1. What you have: one key (or a drop) takes everything at once and sorts it: a CV, a LinkedIn export, letters, a profile file.
   2. Your record: read once, and every entry and skill found is kept at once, marked found and where it came from; she checks later.
   3. What you want: eight questions answered by tapping chips (words of her own optional), and her two aims as cards.
   4. Where you could go: her positioning, what transfers, blind spots, the paths that fit, and the aims' steps, run in one chain.
   5. This week: three things at a time, each with its minutes, Do it for me where the model can, Done when it is.
   Nothing is removed: Today, Applications, People, Your profile, Your edge, Goals and plan and Learn stay; the counsellor fills them.
   Another profile begins the same path (Begin another profile). In Lector, Suggestions now shows beside the document (no page change).
   Her answers to the questionnaire of 12 November 2026 shape it: the studio opens on Today's whole picture (applications, the
   counsellor, the profile), not on the counsellor; entries found are shown one at a time to keep or drop (her choice), with Keep all
   the rest; her profile file (.json) and her zip of documents go in the same drop; the CV is trusted first; the paths come as a
   recommendation with its reason and one alternative; the counsellor speaks frankly and says when a plan is weak; the model is named
   before each run with a key to switch; a second profile is a copy of hers to change, or someone else's.
   Nothing leaves the device unless a connected model is chosen, and the card says so each time. */
#cs .cn-prog{font-size:12px;color:var(--c-ink3);display:flex;align-items:center;gap:8px}
#cs .cn-prog i{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--c-hair);box-shadow:var(--c-well)}
#cs .cn-prog i.on{background:var(--c-ok);box-shadow:none}#cs .cn-prog i.now{background:linear-gradient(var(--c-pa),var(--c-pb));box-shadow:0 1px 0 var(--c-pledge)}
#cs .cn-lede{padding:14px 16px 0}
#cs .cn-lede h3{font:600 20px/1.3 var(--c-serif);margin:0 0 4px;color:var(--c-ink1)}
#cs .cn-lede p{margin:0;font-size:13.5px;line-height:1.55;color:var(--c-ink2);max-width:62ch}
#cs .cn-drop{margin:12px 16px 4px;border:1.5px dashed var(--c-ring);border-radius:16px;padding:20px 18px;text-align:center;background:linear-gradient(180deg,var(--c-accs),rgba(106,63,181,0) 90%);display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;
  transition:transform .16s var(--c-spring),box-shadow .16s ease}
#cs .cn-drop:hover,#cs .cn-drop.is-over{transform:translateY(-2px);box-shadow:var(--c-pophi)}
#cs .cn-drop b{font:600 15px/1.3 var(--c-serif)}#cs .cn-drop small{color:var(--c-ink3);font-size:12.5px;max-width:52ch;line-height:1.45}
#cs .cn-drop .c-btn{margin-top:4px}
#cs .cn-chips{display:flex;flex-wrap:wrap;gap:8px;padding:2px 0}
#cs .cn-chips .c-pill{transition:transform .16s var(--c-spring),box-shadow .16s ease}
#cs .cn-chips .c-pill:hover{transform:translateY(-2px);box-shadow:var(--c-pop)}#cs .cn-chips .c-pill:active{transform:translateY(1px);box-shadow:var(--c-press)}
#cs .cn-own{margin-top:6px}#cs .cn-own .c-ta{min-height:64px}
#cs .cn-aims{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;padding:4px 0 2px}
#cs .cn-aim{text-align:left;cursor:pointer;display:flex;flex-direction:column;gap:6px;border:1px solid var(--c-hair);border-radius:14px;padding:12px 14px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill);color:var(--c-ink1);font:inherit;
  transition:transform .16s var(--c-spring),box-shadow .16s ease}
#cs .cn-aim:hover{transform:translateY(-2px);box-shadow:var(--c-pop)}#cs .cn-aim:active{transform:translateY(1px);box-shadow:var(--c-press)}
#cs .cn-aim[aria-pressed="true"]{border-color:var(--c-ring);box-shadow:var(--c-pop),inset 3px 0 0 var(--c-acc);background:linear-gradient(var(--c-accs),transparent),linear-gradient(var(--c-a),var(--c-b))}
#cs .cn-aim b{font:600 15px/1.3 var(--c-serif)}#cs .cn-aim small{color:var(--c-ink3);font-size:12.5px;line-height:1.45}
#cs .cn-aim .cn-tick{align-self:flex-start;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--c-ink3)}
#cs .cn-aim[aria-pressed="true"] .cn-tick{color:var(--c-ok)}
#cs .cn-aimf{display:grid;grid-template-columns:1fr 1fr;gap:8px 12px;padding:4px 0 0}
#cs .cn-aimf .field{margin:0}
#cs .cn-counts{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 6px}
#cs .cn-rec{display:flex;flex-direction:column;padding:4px 16px 12px}
#cs .cn-row{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-top:1px solid var(--c-hair2)}
#cs .cn-row:first-child{border-top:0}
#cs .cn-row .tx{flex:1 1 auto;min-width:0}#cs .cn-row .tx b{display:block;font-size:14px;line-height:1.35}#cs .cn-row .tx small{display:block;color:var(--c-ink3);font-size:12.5px;line-height:1.45}
#cs .cn-row .tx .cn-ev{color:var(--c-ink2);white-space:pre-line}
#cs .cn-row .c-keys{display:flex;gap:6px;flex:0 0 auto;flex-wrap:wrap;justify-content:flex-end}
#cs .cn-row.is-found .tx b::after{content:"found";font:700 10px/1 var(--c-sans);letter-spacing:.06em;text-transform:uppercase;color:var(--c-acc);background:var(--c-accs);border-radius:999px;padding:3px 7px;margin-left:8px;vertical-align:middle}
#cs .cn-sec{font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c-ink3);margin:10px 0 2px;display:flex;align-items:center;gap:10px}
#cs .cn-sec .c-btn{margin-left:auto}
#cs .cn-min{font-size:11.5px;font-weight:700;color:var(--c-acc);background:var(--c-accs);border-radius:999px;padding:3px 8px;white-space:nowrap;flex:0 0 auto;align-self:center}
#cs .cn-week .cn-row.is-done .tx b{text-decoration:line-through;color:var(--c-ink3)}
#cs .cn-week .cn-row .c-check{flex:0 0 auto;margin-top:2px}
#cs .cn-pos{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;padding:0 16px 8px}
#cs .cn-pos .c-entry small{color:var(--c-ink3);font-size:11.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
#cs .cn-pos .c-entry p{margin:0;font:500 14px/1.45 var(--c-serif)}
#cs .cn-where{font-size:12.5px;color:var(--c-ink3);display:flex;align-items:center;gap:6px}
#cs .cn-where i{width:8px;height:8px;border-radius:50%;background:var(--c-ok);flex:0 0 auto}#cs .cn-where.away i{background:var(--c-warn)}
#cs .cn-model{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center}
#cs .cn-pic{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}
#cs .cn-pic .c-item{position:relative;padding-right:52px}#cs .cn-pc-k{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:12px;font-weight:700;color:var(--c-acc)}
#cs .cn-away{border:1px solid var(--c-hair);border-radius:12px;padding:10px 12px;background:linear-gradient(var(--c-accs),transparent),linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill)}
#cs .cn-away b{font:600 13.5px/1.3 var(--c-serif)}#cs .cn-away ul{margin:4px 0 0;padding-left:18px;font-size:13px;color:var(--c-ink2)}#cs .cn-away li{margin:2px 0}
#cs .cn-two{display:flex;gap:4px;justify-content:center;flex-wrap:wrap}
#cs .c-list .cn-foot > .c-note{text-align:center}
#cs .c-list .cn-foot{display:flex;flex-direction:column;gap:8px;width:100%}
#cs .c-list .cn-foot > .c-btn{width:100%;justify-content:center}
#cs .cn-done{color:var(--c-ok);font-weight:600}
#cs.c-one .cn-aims{grid-template-columns:1fr}#cs.c-one .cn-aimf{grid-template-columns:1fr}
/* in Lector: the studio's suggestions beside the document, in Lector's own faces */
#lx7 .cn-lxpane{position:absolute;right:12px;top:12px;width:min(380px,calc(100% - 24px));max-height:calc(100% - 24px);display:flex;flex-direction:column;border:1px solid var(--l-hair);border-radius:14px;background:var(--l-card);box-shadow:var(--l-slabhi);z-index:5;overflow:hidden;
  animation:cnRise .4s var(--l-spring,cubic-bezier(.34,1.35,.64,1)) backwards}
@keyframes cnRise{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
#lx7 .cn-lxpane .hd{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--l-hair2);background:linear-gradient(var(--l-a),var(--l-b))}
#lx7 .cn-lxpane .hd b{font:600 14px/1.2 var(--l-serif);letter-spacing:.04em;flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#lx7 .cn-lxpane .bd{overflow:auto;padding:8px 12px 12px;font-size:13px;line-height:1.5;color:var(--l-ink1);display:flex;flex-direction:column;gap:6px}
#lx7 .cn-lxpane .bd h4{margin:8px 0 2px;font:700 11px/1.2 var(--l-sans);letter-spacing:.08em;text-transform:uppercase;color:var(--l-ink3)}
#lx7 .cn-lxpane .bd li{margin:0 0 4px 16px}#lx7 .cn-lxpane .bd li small{display:block;color:var(--l-ink3);font-size:12px}
#lx7 .cn-lxpane .bd .live{color:var(--l-ink3);white-space:pre-wrap;max-height:10em;overflow:auto;font-size:12.5px}
#lx7 .cn-lxpane .ft{display:flex;gap:8px;padding:8px 12px;border-top:1px solid var(--l-hair2);flex-wrap:wrap}
body[data-motion="minimal"] #lx7 .cn-lxpane,body[data-calm="1"] #lx7 .cn-lxpane{animation:none}
@media (prefers-reduced-motion:reduce){#lx7 .cn-lxpane,#cs .cn-aim,#cs .cn-drop,#cs .cn-chips .c-pill{animation:none !important;transition:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p283"]="started";}catch(_){}
(function r283(){"use strict";
var W=window,D=document;if(W.IngCounsel||!W.IngCareer||!IngCareer.ui)return;
var U=IngCareer.ui,h=U.h,esc=U.esc,cbtn=U.cbtn,item=U.item,panel=U.panel,chip=U.chip,say=U.say,save=U.save,uid=U.uid,dayStr=U.dayStr,CS=IngCareer.state,RUN=U.RUN;
function render(){try{IngCareer.render();}catch(e){}}
function go1(stage){var c=CN();c.stage=stage;U.show("work");save();U.jump();render();}
var STAGES=[["have","What you have","Your CV, LinkedIn export, letters, a profile file: all at once"],["record","Your record","Every entry and skill found, kept and marked, for you to check"],
  ["want","What you want","Eight questions answered by tapping, and your two aims"],["go","Where you could go","Your edge, your blind spots, the paths that fit, the aims' steps"],["week","This week","Three things at a time, with their minutes"]];
/* ---------------- what it keeps: in the profile's own mentor record (CS().mentor), so earlier answers carry over ---------------- */
function CN(){var S=CS(),m=U.MT();if(!m.cn||typeof m.cn!=="object")m.cn={};var c=m.cn;if(!c.aims||typeof c.aims!=="object")c.aims={};
  if(!c.aims.dphil||typeof c.aims.dphil!=="object")c.aims.dphil={on:false,where:"",prog:"",field:"",when:""};
  if(!c.aims.work||typeof c.aims.work!=="object")c.aims.work={on:false,kinds:[],remote:"",hours:[]};if(!Array.isArray(c.aims.work.kinds))c.aims.work.kinds=[];if(!Array.isArray(c.aims.work.hours))c.aims.work.hours=[];
  if(!c.chips||typeof c.chips!=="object")c.chips={};if(!c.done||typeof c.done!=="object")c.done={};if(typeof c.qi!=="number")c.qi=0;
  if(!c.week||typeof c.week!=="object")c.week={at:0,items:[]};if(!Array.isArray(c.week.items))c.week.items=[];return c;}
function M(){return U.lectorMe();}
function P(){return CS().profile;}
function runs(){return U.isMe()?U.appReadings():[];}
function haveAny(){var p=P(),m=M();return !!(m.cv||p.linkedin||p.files.length||runs().length||p.items.length);}
function foundN(){return P().items.filter(function(it){return it.found;}).length;}
function stDone(k){var c=CN(),S=CS(),E=U.EDGE();
  if(k==="have")return c.done.have||0;
  if(k==="record")return c.done.record&&!(P().suggested||[]).length?c.done.record:0;
  if(k==="want")return c.done.want||0;
  if(k==="go")return (E.tr&&E.bl&&E.ed&&S.paths&&S.paths.list&&S.paths.list.length)?Math.max(E.tr.at||0,E.bl.at||0,E.ed.at||0,S.paths.at||0):0;
  if(k==="week")return c.week.at||0;return 0;}
function nextStage(){for(var i=0;i<STAGES.length;i++)if(!stDone(STAGES[i][0]))return STAGES[i][0];return "week";}
function curStage(){var c=CN(),k=c.stage;if(!STAGES.some(function(s){return s[0]===k;}))k=nextStage();return k;}
function doneN(){return STAGES.filter(function(s){return stDone(s[0]);}).length;}
/* ---------------- the model's whereabouts, said on every card that uses it ---------------- */
function whereRow(){var box=h("div","cn-model c-pad"),r=h("div","cn-where"),away=false;try{away=U.leaves();}catch(e){}
  if(away)r.classList.add("away");r.appendChild(h("i"));r.appendChild(h("span",null,esc(U.modelReady()?("With "+(U.modelName()||"your model")+", "+U.whereLine()+(away?": what it reads is sent to it, without your contact details, referees or pay figures.":". Nothing leaves this device.")):"No model is ready yet: get one on the Models page, or choose your connected model.")));box.appendChild(r);
  var k=null;try{k=U.cloudKey();}catch(e){}if(k){k.classList.add("sm");box.appendChild(k);}return box;}
/* ---------------- 1. What you have: everything at once, sorted ---------------- */
var ACCEPT=".docx,.pdf,.txt,.md,.rtf,.html,.htm,.zip,.csv,.json";
function looksCv(name,text){if(/\b(cv|r[eé]sum[eé]|curriculum)\b/i.test(name))return true;var t=String(text||"").slice(0,6000);
  return /curriculum vitae|\bcv\b/i.test(t)||(/education/i.test(t)&&/(experience|employment|work history|posts?)/i.test(t)&&/(skills|languages|publications|referees?|references)/i.test(t));}
function keepCv(f,t){var m=M(),ref=IngBig.newId();return Promise.resolve(IngBig.put(ref,t)).then(function(){if(m.cv&&m.cv.ref){try{IngBig.del(m.cv.ref);}catch(e){}}m.cv={ref:ref,name:f.name,chars:t.length,at:Date.now()};P().at=Date.now();});}
function keepDoc(f,t){var p=P(),ref=IngBig.newId();return Promise.resolve(IngBig.put(ref,t)).then(function(){p.files.push({id:uid("f"),name:f.name,ref:ref,chars:t.length,at:Date.now(),use:true});p.at=Date.now();});}
function unzipAll(buf){var u8=new Uint8Array(buf),dv=new DataView(buf),i=u8.length-22,dec=new TextDecoder(),out=[];
  while(i>=0&&dv.getUint32(i,true)!==0x06054b50)i--;if(i<0)return Promise.reject(new Error("not a .zip file"));
  if(typeof DecompressionStream==="undefined")return Promise.reject(new Error("this window cannot open .zip files; add the files inside it instead"));
  var n=dv.getUint16(i+10,true),p=dv.getUint32(i+16,true),q=Promise.resolve();
  for(var k=0;k<n;k++){(function(meth,csz,name,lo){if(!/\/$/.test(name)&&csz<64*1024*1024)q=q.then(function(){var lnl=dv.getUint16(lo+26,true),lxl=dv.getUint16(lo+28,true),st=lo+30+lnl+lxl,data=u8.subarray(st,st+csz);
      return (meth===0?Promise.resolve(data):new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer().then(function(b){return new Uint8Array(b);})).then(function(x){out.push({name:name,bytes:x});},function(){});});})
      (dv.getUint16(p+10,true),dv.getUint32(p+20,true),dec.decode(u8.subarray(p+46,p+46+dv.getUint16(p+28,true))),dv.getUint32(p+42,true));
    p+=46+dv.getUint16(p+28,true)+dv.getUint16(p+30,true)+dv.getUint16(p+32,true);}
  return q.then(function(){return out;});}
function takeFiles(fs){fs=[].slice.call(fs||[]);if(!fs.length)return Promise.resolve();var got={cv:0,docs:0,li:0,pack:0,skipped:[]},li=[],rest=[],packs=[];
  var zips=[];fs.forEach(function(f){if(/\.zip$/i.test(f.name))zips.push(f);else if(/\.csv$/i.test(f.name))li.push(f);else if(/\.json$/i.test(f.name))packs.push(f);else rest.push(f);});
  var q=Promise.resolve(),hasCv=!!M().cv,texts=[];
  /* a zip is LinkedIn's export when it holds its .csv files; else it is a folder of documents (her zip of her documents and portfolio), each sorted as if dropped alone */
  zips.forEach(function(z){q=q.then(function(){return z.arrayBuffer().then(unzipAll).then(function(ents){var csv=ents.filter(function(e){return /\.csv$/i.test(e.name);}),docs=ents.filter(function(e){return /\.(docx|pdf|txt|md|rtf|html?|json)$/i.test(e.name)&&!/(^|\/)(__MACOSX|\.)/.test(e.name);});
      if(csv.length&&csv.some(function(e){return /positions|education|skills|profile/i.test(e.name);}))li.push(z);
      docs.forEach(function(e){var nm=e.name.replace(/^.*\//,"");try{var f=new File([e.bytes],nm);}catch(x){var f=new Blob([e.bytes]);f.name=nm;}if(/\.json$/i.test(nm))packs.push(f);else rest.push(f);});
      if(!csv.length&&!docs.length)got.skipped.push(z.name+" (nothing readable in it)");},function(e){got.skipped.push(z.name+" ("+(e&&e.message||e)+")");});});});
  q=q.then(function(){var q1=Promise.resolve();
  rest.forEach(function(f){q1=q1.then(function(){return U.readFile(f).then(function(t){if(t.length<40){got.skipped.push(f.name);return;}texts.push({f:f,t:t});},function(e){got.skipped.push(f.name+" ("+(e&&e.message||e)+")");});});});return q1;});
  q=q.then(function(){/* the CV: the one named so, else the first that reads as one; the rest are documents */
    var cvi=-1;texts.forEach(function(x,i){if(cvi<0&&/\b(cv|r[eé]sum[eé]|curriculum)\b/i.test(x.f.name))cvi=i;});if(cvi<0)texts.forEach(function(x,i){if(cvi<0&&looksCv(x.f.name,x.t))cvi=i;});
    var q2=Promise.resolve();texts.forEach(function(x,i){q2=q2.then(function(){if(i===cvi&&(!hasCv||texts.length===1||/\b(cv|r[eé]sum[eé]|curriculum)\b/i.test(x.f.name))){got.cv++;return keepCv(x.f,x.t);}got.docs++;return keepDoc(x.f,x.t);});});return q2;});
  if(li.length)q=q.then(function(){return U.importLinkedIn(li).then(function(){got.li=li.length;},function(e){got.skipped.push(li.map(function(f){return f.name;}).join(", ")+" ("+(e&&e.message||e)+")");});});
  packs.forEach(function(f){q=q.then(function(){return Promise.resolve(U.readAsText(f)).then(function(t){var d=U.packRead(t);got.pack++;U.packOpen(d);},function(e){got.skipped.push(f.name+" ("+(e&&e.message||e)+")");});});});
  return q.then(function(){var c=CN();if(got.cv||got.docs||got.li||got.pack){c.stage="have";c.done.have=c.done.have||Date.now();}save();render();
    var bits=[];if(got.cv)bits.push("your CV");if(got.docs)bits.push(got.docs+" document"+(got.docs===1?"":"s"));if(got.li)bits.push("your LinkedIn export");if(got.pack)bits.push("a profile file");
    say((bits.length?"Kept: "+bits.join(", ")+". ":"")+(got.skipped.length?"Not read: "+got.skipped.join("; ")+".":"")+(bits.length&&!got.skipped.length?" Nothing leaves this device.":""));});}
function cHave(){var p=P(),m=M(),me=U.isMe(),R=panel("csWork","1. What you have",{chip:chip("Step 1 of 5","")}),rs=runs();
  var L=h("div","cn-lede");L.appendChild(h("h3",null,esc(me?"Give me what you have, in any order.":"Give me what they have, in any order.")));
  L.appendChild(h("p",null,esc("A CV, a LinkedIn export, cover letters, a portfolio, a statement, a profile file from another device: all at once. I sort them, and you never type your profile from scratch. Nothing leaves this device.")));R.body.appendChild(L);
  var drop=h("div","cn-drop");drop.setAttribute("role","button");drop.tabIndex=0;drop.setAttribute("aria-label","Add what you have: choose files, or drop them here");
  drop.appendChild(h("b",null,esc("Drop your files here")));drop.appendChild(h("small",null,esc("Word, PDF or text; a zip of your documents; LinkedIn's .zip or its .csv files; your Ingenium profile file (.json). Several at once. Your CV is trusted first.")));
  var k=cbtn("pri","Add what you have",function(b,e){if(e)e.stopPropagation();U.pickFile(ACCEPT,true,function(fs){takeFiles(fs);});});k.id="cnAdd";drop.appendChild(k);
  drop.addEventListener("click",function(e){if(e.target===k||k.contains(e.target))return;U.pickFile(ACCEPT,true,function(fs){takeFiles(fs);});});
  drop.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();k.click();}});
  drop.addEventListener("dragover",function(e){e.preventDefault();drop.classList.add("is-over");});drop.addEventListener("dragleave",function(){drop.classList.remove("is-over");});
  drop.addEventListener("drop",function(e){e.preventDefault();drop.classList.remove("is-over");try{takeFiles(e.dataTransfer.files);}catch(x){}});R.body.appendChild(drop);
  var list=h("div","c-srcs");
  function row(ok,title,sub,keys){var r=h("div","c-src"),tx=h("div","tx");tx.appendChild(h("b",null,esc((ok?"✓ ":"")+title)));tx.appendChild(h("small",null,esc(sub)));r.appendChild(tx);if(keys&&keys.length){var kk=h("div","c-keys");keys.forEach(function(x){kk.appendChild(x);});r.appendChild(kk);}list.appendChild(r);}
  row(!!m.cv,me?"Your CV":"Their CV",m.cv?m.cv.name+", kept "+dayStr(m.cv.at||Date.now())+".":"Not here yet. It is the one source of names, dates and posts.",[cbtn("sm",m.cv?"Replace":"Add",U.addCv)]);
  row(!!p.linkedin,"LinkedIn export",p.linkedin?"Read "+dayStr(p.linkedin.at)+(p.linkedin.n?": "+p.linkedin.n+" entries":"")+".":"The .zip LinkedIn sends when you ask for a copy of your data. Not needed if your CV is complete.",[cbtn("sm",p.linkedin?"Read it again":"Add",function(){U.pickFile(".zip,.csv",true,function(fs){takeFiles(fs);});})]);
  row(p.files.length>0,"Documents",p.files.length?p.files.length+" kept: "+p.files.slice(0,3).map(function(f){return f.name;}).join(", ")+(p.files.length>3?" and more":"")+".":"Cover letters, a portfolio, a statement, a proposal: anything about your work.",[cbtn("sm","Add",U.addDocs)]);
  if(me)row(rs.length>0,"Lector's readings of your apps",rs.length?rs.map(function(x){return x.name+(x.version?" "+x.version:"");}).join(", ")+".":"None yet. Read your apps in Lector, and what each shows of your skills joins your record by itself.",rs.length?[]:[cbtn("sm","Open Lector",function(){go("lector");})]);
  row(p.items.length>0,"Entries already in your profile",p.items.length?p.items.length+" entr"+(p.items.length===1?"y":"ies")+(foundN()?", "+foundN()+" found and not yet checked":"")+".":"None yet: the next step finds them in what you give.",[cbtn("sm","Open your profile",function(){CS().ui.room="profile";CS().ui.ppart="entries";U.show("work");save();render();})]);
  R.body.appendChild(list);
  R.foot.appendChild(cbtn("quiet","I would rather type them",function(){CS().ui.room="profile";CS().ui.ppart="entries";CS().ui.editing="new";U.show("work");save();render();}));
  R.foot.appendChild(h("span","c-grow"));
  var nx=cbtn("pri","Next: build my record",function(){if(!haveAny()){say("Add your CV, a document or your LinkedIn export first: your record is built from them.");return;}var c=CN();c.done.have=c.done.have||Date.now();go1("record");});
  if(!haveAny())nx.title="Add something first";R.foot.appendChild(nx);return R;}
/* ---------------- 2. Your record: read once, everything kept and marked ---------------- */
function keepAllFound(){var p=P(),sg=p.suggested||[],n=0;sg.forEach(function(x){var nw=Object.assign({},x,{id:uid("it"),src:x.src==="linkedin-new"?"linkedin":"found",from0:x.src==="linkedin-new"?"linkedin":"read",found:Date.now(),at:Date.now()});delete nw.note;
    if(x.src==="linkedin-new"&&x.was){var ex=p.items.filter(function(y){return y.id===x.was;})[0];if(ex){Object.assign(ex,{title:x.title,place:x.place,from:x.from,to:x.to,text:x.text,at:Date.now(),found:Date.now()});delete ex.gone;n++;return;}}
    delete nw.was;p.items.push(nw);n++;});p.suggested=[];p.at=Date.now();return n;}
function buildRecord(){if(U.busyNow()||U.needModel())return Promise.resolve();if(!haveAny()){say("Add your CV, a document or your LinkedIn export first.");return Promise.resolve();}
  U.setStop(false);var c=CN();c.chain=true;save();
  return U.readSources().then(function(){var n=(P().suggested||[]).length;c.done.record=Date.now();c.chain=false;c.stage="record";save();render();say(n?n+" entr"+(n===1?"y":"ies")+" and skill"+(n===1?"":"s")+" found. Keep or drop each one; Keep all the rest takes the remainder at once, marked found.":"Nothing new was found beyond what your record holds.");},
    function(e){c.chain=false;save();render();var m=String(e&&e.message||e);if(m!=="stopped")say("It could not be finished: "+m);});}
function secName(k){return (U.SECTS.filter(function(x){return x[0]===k;})[0]||["","Other"])[1].replace(/, with evidence$/,"");}
function keepOne(x){var p=P(),nw=Object.assign({},x,{id:uid("it"),src:x.src==="linkedin-new"?"linkedin":"me",at:Date.now()});delete nw.note;
  if(x.src==="linkedin-new"&&x.was){var ex=p.items.filter(function(y){return y.id===x.was;})[0];if(ex){Object.assign(ex,{title:x.title,place:x.place,from:x.from,to:x.to,text:x.text,at:Date.now()});delete ex.gone;return;}}delete nw.was;p.items.push(nw);}
function cReview(R){var p=P(),sg=p.suggested||[],it=sg[0],c=h("div","c-col c-pad");
  c.appendChild(h("span","c-k",esc(sg.length===1?"The last one to look at":"1 of "+sg.length+" to look at")));
  var card=h("div","c-entry");card.appendChild(h("span","c-sec",esc(secName(it.sec))));card.appendChild(h("b",null,esc(it.title)));
  var meta=[it.place,[it.from,it.to].filter(Boolean).join(" to "),it.src==="linkedin-new"?(it.note||"From your LinkedIn export"):"Found in your sources"].filter(Boolean).join(" · ");card.appendChild(h("small",null,esc(meta)));if(it.text)card.appendChild(h("p",null,esc(it.text)));c.appendChild(card);
  c.appendChild(h("p","c-note",esc("Keep it if it is right (you can change it later), or drop it. Enter keeps. Nothing enters your record by itself.")));R.body.appendChild(c);
  R.foot.appendChild(cbtn("quiet","Keep all the rest",function(){var n=keepAllFound();p.at=Date.now();save();render();say(n+" kept, each marked found: check them in this card or in Your profile when you like.");}));R.foot.appendChild(h("span","c-grow"));
  R.foot.appendChild(cbtn("","Drop",function(){p.suggested=sg.slice(1);save();render();}));
  var k=cbtn("pri","Keep",function(){keepOne(it);p.suggested=sg.slice(1);p.at=Date.now();save();render();});k.id="cnKeep";R.foot.appendChild(k);
  setTimeout(function(){try{k.focus();}catch(e){}},30);return R;}
function cRecord(){var p=P(),c=CN(),R=panel("csWork","2. Your record",{chip:chip("Step 2 of 5","")}),L=h("div","cn-lede"),n=p.items.length,nf=foundN();
  if((p.suggested||[]).length)return cReview(R);
  if(!c.done.record&&!n){L.appendChild(h("h3",null,esc("I read what you gave, once, and keep everything I find.")));
    L.appendChild(h("p",null,esc("Your studies, posts, research, teaching, projects, languages, awards and referees, and your skills with their evidence, from your CV first. Each is shown to you once, to keep or drop; Keep all the rest takes what is left at once, marked found for you to check later. Nothing is invented, and nothing is lost.")));R.body.appendChild(L);
    R.body.appendChild(whereRow());
    R.foot.appendChild(cbtn("quiet","Back",function(){go1("have");}));R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("pri","Build my record",function(){buildRecord();}));return R;}
  L.appendChild(h("h3",null,esc(n+" entr"+(n===1?"y":"ies")+" in your record"+(nf?", "+nf+" found and not yet checked":", all checked")+".")));
  L.appendChild(h("p",null,esc(nf?"Each one marked found was kept with Keep all the rest, from your CV, your documents, your LinkedIn export or Lector's readings. Looks right keeps it as yours; Change opens it; Remove drops it. A whole section at once: Looks right, all.":"Everything here is yours, kept one by one. Read my sources again whenever you add something new.")));R.body.appendChild(L);
  var counts=h("div","cn-counts");U.SECTS.forEach(function(s){var k=p.items.filter(function(it){return it.sec===s[0];}).length;if(k)counts.appendChild(chip(secName(s[0])+" "+k,""));});R.body.appendChild(counts);
  var rec=h("div","cn-rec");
  U.SECTS.forEach(function(s){var its=p.items.filter(function(it){return it.sec===s[0];});if(!its.length)return;var hd=h("div","cn-sec",esc(secName(s[0])));
    if(its.some(function(it){return it.found;}))hd.appendChild(cbtn("sm quiet","Looks right, all",function(){its.forEach(function(it){if(it.found){delete it.found;if(it.src==="found")it.src="me";}});p.at=Date.now();save();render();}));rec.appendChild(hd);
    its.forEach(function(it){var r=h("div","cn-row"+(it.found?" is-found":"")),tx=h("div","tx");tx.appendChild(h("b",null,esc(it.title)));
      var meta=[it.place,[it.from,it.to].filter(Boolean).join(" to "),it.src==="linkedin"?"from LinkedIn":""].filter(Boolean).join(" · ");if(meta)tx.appendChild(h("small",null,esc(meta)));
      if(it.text)tx.appendChild(h("small","cn-ev",esc(String(it.text).slice(0,300))));r.appendChild(tx);var kk=h("div","c-keys");
      if(it.found)kk.appendChild(cbtn("sm pri","Looks right",function(){delete it.found;if(it.src==="found")it.src="me";p.at=Date.now();save();render();}));
      kk.appendChild(cbtn("sm","Change",function(){CS().ui.room="profile";CS().ui.ppart="entries";CS().ui.editing=it.id;U.show("work");save();render();}));
      kk.appendChild(cbtn("sm quiet","Remove",function(){p.items=p.items.filter(function(x){return x.id!==it.id;});p.at=Date.now();save();render();}));r.appendChild(kk);rec.appendChild(r);});});
  R.body.appendChild(rec);
  R.foot.appendChild(cbtn("quiet","Read my sources again",function(){buildRecord();}));R.foot.appendChild(h("span","c-grow"));
  if(!c.done.record)R.foot.appendChild(cbtn("","Find more in my sources",function(){buildRecord();}));
  R.foot.appendChild(cbtn("pri","Next: what you want",function(){var c2=CN();c2.done.record=c2.done.record||Date.now();go1("want");}));return R;}
/* ---------------- 3. What you want: chips to tap, and the two aims ---------------- */
var CHIPS={enjoy:["Building something from start to finish","Writing","Researching","Explaining and teaching","Designing how people learn","Editing and shaping others' work","Organising a long project","Solving a hard problem alone","Making something people use"],
  asked:["Fixing or building technology","Writing or editing their text","Explaining something difficult","Planning and organising","Advice on studying","Designing a course or a lesson","Research and finding sources"],
  drawn:["Learning design and instructional design","Education technology","Large technology companies","Publishing and editorial","Research posts","Teaching","Product and user experience","Technical writing","Writing for a living","A doctorate"],
  change:["People learn more easily","Knowledge reaches more people","Tools that work for neurodivergent people","Better writing in the world","Research that is used","Students get real support"],
  need:["Pay that gives security","A permanent post","Flexible hours","Working from anywhere","Time and leave to study","Long, immersive projects","Few meetings, asynchronous work","Clear expectations","Room to be creative"],
  avoid:["Commuting","Fixed hours","Open-plan offices","Many small tasks","Constant meetings","Sales targets","Repetitive work","Being managed closely"],
  where:["Remotely, from anywhere","Remotely, within one country","Near a university","In a city","Hybrid would do for the right role"],
  when:["Within three months","Within six months","Within a year","When the doctorate is settled","The next intake","The intake after next"]};
function chipsRow(key,vals,on,onChange){var row=h("div","cn-chips");vals.forEach(function(v){var b=h("button","c-pill");b.type="button";b.textContent=v;b.setAttribute("aria-pressed",on.indexOf(v)>=0?"true":"false");
    b.addEventListener("click",function(){var i=on.indexOf(v);if(i>=0)on.splice(i,1);else on.push(v);b.setAttribute("aria-pressed",i>=0?"false":"true");onChange();});row.appendChild(b);});return row;}
function answerOf(key){var c=CN(),m=U.MT(),ch=(c.chips[key]||[]).slice(),own=String(m.ans[key]||"").trim();return ch.concat(own?[own]:[]).join(", ");}
function aimsCard(){var c=CN(),A=c.aims,box=h("div","c-col");box.appendChild(h("div","c-label",esc("Your aims: tap the ones that are yours")));var g=h("div","cn-aims");
  function aim(key,title,sub){var b=h("button","cn-aim");b.type="button";b.setAttribute("aria-pressed",A[key].on?"true":"false");b.appendChild(h("span","cn-tick",esc(A[key].on?"✓ An aim":"Not an aim")));b.appendChild(h("b",null,esc(title)));b.appendChild(h("small",null,esc(sub)));
    b.addEventListener("click",function(){A[key].on=!A[key].on;save();render();});return b;}
  g.appendChild(aim("dphil","A fully funded doctorate","A DPhil or PhD place with its funding, and the steps to find out what each route asks."));
  g.appendChild(aim("work","Work that fits around it","The kind of work, and its shape: remote, flexible, permanent, beside your studies."));box.appendChild(g);
  if(A.dphil.on){var f=h("div","cn-aimf"),wh=U.input("text",A.dphil.where,"The university"),pr=U.input("text",A.dphil.prog,"DPhil, PhD or EdD"),fd=U.input("text",A.dphil.field,"The field or department"),wn=U.input("text",A.dphil.when,"The intake you aim for");
    [["where",wh],["prog",pr],["field",fd],["when",wn]].forEach(function(x){x[1].addEventListener("change",function(){A.dphil[x[0]]=x[1].value.trim();save();});});
    f.appendChild(U.field("Where",wh));f.appendChild(U.field("The degree",pr));f.appendChild(U.field("The field",fd));f.appendChild(U.field("Beginning",wn));box.appendChild(f);}
  if(A.work.on){box.appendChild(h("div","c-label",esc("The work: tap what fits")));box.appendChild(chipsRow("kinds",["Learning design","Instructional design","Education technology","Large technology companies","Publishing and editorial","Technical writing","Research","Teaching","Building apps and products","Product design"],A.work.kinds,save));
    box.appendChild(h("div","c-label",esc("Its shape")));box.appendChild(chipsRow("hours",["Fully remote, from anywhere","Flexible hours","Permanent","Part time beside the doctorate","Project by project","Asynchronous, few meetings"],A.work.hours,save));}
  return box;}
function aimGoals(){var S=CS(),A=CN().aims,made=0;
  function has(re){return S.goals.some(function(g){return re.test(g.text);});}
  if(A.dphil.on&&!has(/doctorate|dphil|phd/i)){var t="A fully funded "+(A.dphil.prog||"doctorate")+(A.dphil.where?" at "+(/^university of /i.test(A.dphil.where)?"the ":"")+A.dphil.where.replace(/^the /i,""):"")+(A.dphil.field?", in "+A.dphil.field:"");
    S.goals.unshift({id:uid("g"),text:t,kind:"academic",by:A.dphil.when||"",at:Date.now(),steps:[],aim:"dphil"});made++;}
  if(A.work.on&&!has(/remote|learning design|work that fits/i)){var k=A.work.kinds.length?A.work.kinds.slice(0,3).join(", "):"learning design or similar",sh=A.work.hours.length?" ("+A.work.hours.slice(0,2).join(", ").toLowerCase()+")":"";
    S.goals.push({id:uid("g"),text:"Work in "+k+sh,kind:"career",by:"",at:Date.now(),steps:[],aim:"work"});made++;}
  return made;}
function cWant(){var c=CN(),m=U.MT(),T=U.TALK,R=panel("csWork","3. What you want",{chip:chip("Step 3 of 5","")});
  if(!m.talkSeeded){["need","avoid","where","when"].forEach(function(k){if(!m.ans[k]&&String(P().wants[k]||"").trim())m.ans[k]=String(P().wants[k]).trim();});m.talkSeeded=true;}
  var i=Math.max(0,Math.min(T.length,c.qi)),col=h("div","c-col c-pad");
  if(i===0){var L=h("div","cn-lede");L.style.padding="0";L.appendChild(h("h3",null,esc("Tap what is true. Words of your own are welcome, never required.")));L.appendChild(h("p",null,esc("Eight short questions, one at a time, then your two aims. Saved as you tap; stop and come back whenever you like. Your answers become What you are looking for in Your profile, where you can change them.")));col.appendChild(L);}
  if(i<T.length){var q=T[i],on=c.chips[q[0]]=c.chips[q[0]]||[];col.appendChild(h("span","c-k",esc("Question "+(i+1)+" of "+T.length)));col.appendChild(h("h3","c-today-step",esc(q[1])));if(q[2])col.appendChild(h("p","c-note",esc(q[2])));
    col.appendChild(chipsRow(q[0],CHIPS[q[0]]||[],on,save));
    var own=h("div","cn-own"),t=h("textarea","c-ta");t.id="cnOwn";t.placeholder="In your own words, if you like";t.value=m.ans[q[0]]||"";t.setAttribute("aria-label",q[1]+", in your own words");var tm=null;
    t.addEventListener("input",function(){m.ans[q[0]]=t.value;clearTimeout(tm);tm=setTimeout(save,500);});own.appendChild(t);col.appendChild(own);R.body.appendChild(col);
    if(i>0)R.foot.appendChild(cbtn("quiet","Back",function(){c.qi=i-1;save();render();}));else R.foot.appendChild(cbtn("quiet","Back",function(){go1("record");}));
    R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("","Skip",function(){c.qi=i+1;save();render();}));R.foot.appendChild(cbtn("pri","Next",function(){c.qi=i+1;save();render();}));return R;}
  col.appendChild(h("span","c-k",esc("Last: your aims")));col.appendChild(aimsCard());
  var pr=P().prefs;if(!pr.tone)pr.tone="frank";col.appendChild(h("div","c-label",esc("How your counsellor speaks")));
  col.appendChild(U.seg([["frank","Frank, like a good recruiter"],["warm","Warm and encouraging"],["measured","Measured, like a supervisor"]],pr.tone,function(v){pr.tone=v;save();render();},"How your counsellor speaks"));
  col.appendChild(h("p","c-note",esc(pr.tone==="frank"?"It says plainly when a plan or a document is weak, and why, then what would mend it.":pr.tone==="warm"?"It names what is strong first, and still says what is weak and how to mend it.":"Exact and even, with the evidence for every judgement.")));R.body.appendChild(col);
  R.foot.appendChild(cbtn("quiet","Back",function(){c.qi=T.length-1;save();render();}));R.foot.appendChild(h("span","c-grow"));
  R.foot.appendChild(cbtn("pri","Finish: that is what I want",function(){var p=P(),a=m.ans;U.TALK.forEach(function(q){var v=answerOf(q[0]);if(v)a[q[0]]=v;});U.talkApply();
    /* the chips' own words stay the chips (the talk keeps what she typed under them) */
    U.TALK.forEach(function(q){var own=String(m.ans[q[0]]||"");var ch=(c.chips[q[0]]||[]);ch.forEach(function(v){own=own.replace(v+", ","").replace(", "+v,"").replace(v,"");});m.ans[q[0]]=own.trim();});
    var made=aimGoals();m.done.talk=Date.now();c.done.want=Date.now();c.qi=0;save();
    say("Thank you. That is in Your profile, What you are looking for"+(made?", and your aim"+(made===1?" is":"s are")+" in Goals and plan":"")+".");go1("go");
    if(U.modelReady()&&!stDone("go"))runGo();}));return R;}
/* ---------------- 4. Where you could go: one chain ---------------- */
function aimGoalSteps(){var S=CS(),q=Promise.resolve();S.goals.filter(function(g){return g.aim&&!g.steps.length&&!(g.suggested||[]).length;}).forEach(function(g){q=q.then(function(){return U.runOne(function(){U.goalSteps(g);}).then(function(){if(g.suggested&&g.suggested.length&&!g.steps.length){g.steps=g.suggested.slice(0,7).map(function(s){return {id:uid("st"),text:s.text,by:s.by||"",why:s.why||"",done:false};});g.suggested=[];save();}});});});return q;}
function runGo(){if(U.busyNow()||U.needModel())return Promise.resolve();var c=CN(),S=CS();U.setStop(false);c.chain=true;save();
  var q=U.edgeAll(false);
  if(!(S.paths&&S.paths.list&&S.paths.list.length)){q=q.then(function(){if(!U.wantsText()&&!S.goals.length){say("The paths start from what you want: step 3.");return;}return U.runOne(IngCareer.paths);});}
  q=q.then(aimGoalSteps);
  return q.then(function(){c.chain=false;save();render();say("Your counsellor has thought it through. The paths are here and in Goals and plan.");},
    function(e){c.chain=false;save();render();var m=String(e&&e.message||e);if(m!=="stopped")say("It could not be finished: "+m);});}
function cGo(){var S=CS(),E=U.EDGE(),c=CN(),R=panel("csWork","4. Where you could go",{chip:chip("Step 4 of 5","")}),any=false;
  var L=h("div","cn-lede");
  if(!stDone("go")){L.appendChild(h("h3",null,esc("Your edge, your blind spots, and the paths that fit.")));L.appendChild(h("p",null,esc("From your record and what you want, in one run: how to present yourself as a professional and as an academic; what transfers from one setting to another; what a reader will miss or ask; two to four paths that fit, each with a first step; and the steps towards your aims. Only what your sources show; nothing invented, nothing searched online.")));R.body.appendChild(L);
    R.body.appendChild(whereRow());}
  else{L.appendChild(h("h3",null,esc("Here is where you could go.")));L.appendChild(h("p",null,esc("The first path is the one your counsellor recommends, with its reason; the second is the alternative to weigh against it. A point about the world (what a field asks for, how it hires, a deadline) is for you to check before you rely on it. Everything about you rests on your record.")));R.body.appendChild(L);}
  var pos=E.ed&&E.ed.pos||{};if(pos.pro||pos.acad||pos.bridge){any=true;R.body.appendChild(h("div","c-label c-pad",esc("How to present yourself")));var pg=h("div","cn-pos");
    [["pro","As a professional"],["acad","As an academic"],["bridge","The bridge"]].forEach(function(x){if(!pos[x[0]])return;var e=h("div","c-entry");e.appendChild(h("small",null,esc(x[1])));e.appendChild(h("p",null,esc(pos[x[0]])));var k=h("div","c-keys");k.appendChild(cbtn("sm","Copy",function(){U.copyText(pos[x[0]]);}));e.appendChild(k);pg.appendChild(e);});R.body.appendChild(pg);}
  var tr=U.mList("What transfers",E.tr&&E.tr.list.slice(0,4),function(x){return esc(x.skill)+(x.line?"<small>"+esc(x.line)+"</small>":x.evidence?"<small>"+esc(x.evidence)+"</small>":"");});if(tr){any=true;R.body.appendChild(tr);}
  var bl=U.mList("Your blind spots",E.bl&&E.bl.list.filter(function(x){return !x.done;}).slice(0,4),function(x){return esc(x.what)+(x.fix?"<small>"+esc("What to do: "+x.fix)+"</small>":"");});if(bl){any=true;R.body.appendChild(bl);}
  var ed=U.mList("What sets you apart",E.ed&&E.ed.list.slice(0,3),function(x){return esc(x.what)+(x.say?"<small>"+esc(x.say)+"</small>":"");});if(ed){any=true;R.body.appendChild(ed);}
  var Pa=S.paths;if(Pa&&Pa.list&&Pa.list.length){any=true;R.body.appendChild(h("div","c-label c-pad",esc("Paths that fit")));var grid=h("div","c-entries");
    Pa.list.forEach(function(x,i){var e=h("div","c-entry c-path"+(x.kept?" is-kept":""));if(i<2)e.appendChild(chip(i===0?"Recommended":"The alternative",i===0?"c-ok":""));e.appendChild(h("b",null,esc(x.path)));[["fits",i===0?"Why it comes first":"Why it fits"],["first","This week"]].forEach(function(f){if(x[f[0]])e.appendChild(h("p",null,"<span class=\"c-k\">"+f[1]+"</span> "+esc(x[f[0]])));});
      var k=h("div","c-keys");k.appendChild(cbtn("sm"+(x.kept?"":" pri"),x.kept?"A goal now":"Make it a goal",function(){if(x.kept)return;var steps=[];if(x.first)steps.push({id:uid("st"),text:x.first,by:"in a week",done:false});
        String(x.months||"").split(/;\s*|\.\s+(?=[A-Z])/).map(function(s){return s.trim().replace(/\.$/,"");}).filter(function(s){return s.length>3;}).slice(0,4).forEach(function(s){steps.push({id:uid("st"),text:s,by:"in three months",done:false});});
        S.goals.unshift({id:uid("g"),text:x.path,kind:/phd|dphil|doctor|master|programme|fellow|study/i.test(x.path)?"academic":"career",by:"",at:Date.now(),steps:steps});x.kept=true;save();render();say("It is a goal now, with its steps.");}));
      k.appendChild(cbtn("sm quiet","More",function(){S.ui.room="goals";S.ui.gsel="paths";U.show("work");save();render();}));e.appendChild(k);grid.appendChild(e);});R.body.appendChild(grid);
    if(Pa.find&&Pa.find.some(function(f){return !f.done;})){var fl=U.mList("Before you choose: find out",Pa.find.filter(function(f){return !f.done;}).slice(0,4),function(f){return esc(f.q)+(f.how?"<small>"+esc("How: "+f.how)+"</small>":"");});if(fl)R.body.appendChild(fl);}}
  var aims=S.goals.filter(function(g){return g.aim;});if(aims.length){R.body.appendChild(h("div","c-label c-pad",esc("Your aims, with their steps")));aims.forEach(function(g){var done=g.steps.filter(function(s){return s.done;}).length;
    R.body.appendChild(item(g.text,g.steps.length?done+" of "+g.steps.length+" steps done · the next: "+(g.steps.filter(function(s){return !s.done;})[0]||{text:"all done"}).text:"No steps yet: the counsellor adds them in this stage",false,function(){S.ui.room="goals";S.ui.gsel=g.id;U.show("work");save();render();}));});}
  if(any)R.body.appendChild(h("p","c-note c-pad",esc("Found with "+(U.modelName()||"your model")+" from your record and what you said. See it all in Your edge and Goals and plan.")));
  R.foot.appendChild(cbtn("quiet","Back",function(){go1("want");}));if(any)R.foot.appendChild(cbtn("quiet","See it all in Your edge",function(){S.ui.room="edge";S.ui.show="list";save();render();}));R.foot.appendChild(h("span","c-grow"));
  if(!stDone("go"))R.foot.appendChild(cbtn("pri",any?"Finish this stage":"Think it through for me",function(){runGo();}));
  else{R.foot.appendChild(cbtn("","Think it through again",function(){var E2=U.EDGE();E2.tr=E2.bl=E2.ed=null;S.paths=null;save();runGo();}));R.foot.appendChild(cbtn("pri","Next: this week",function(){buildWeek();go1("week");}));}
  return R;}
/* ---------------- 5. This week: three things at a time ---------------- */
function buildWeek(){var S=CS(),E=U.EDGE(),c=CN(),items=[],seen={};
  function add(text,mins,kind,ref,why){var k=String(text).toLowerCase().trim();if(!text||seen[k])return;seen[k]=1;items.push({id:uid("wk"),text:String(text).slice(0,200),mins:mins,kind:kind,ref:ref||"",why:why||"",done:false});}
  var cv=U.cvDoc();if(cv&&!E.docs[cv.id])add("Let me look at your CV with you",5,"cvlook",cv.id,"Suggestions on it, never a rewrite: what could do more, what your record adds, what a reader will ask.");
  if(!cv)add("Add your CV",5,"addcv","","The one source of names, dates and posts; everything else rests on it.");
  var rs=runs();if(U.isMe()&&!rs.length)add("Read one of your apps in Lector",15,"lector","","What building it shows of your skills joins your record by itself.");
  rs.forEach(function(r){if(!(E.apps||{})[r.name])add("Let Lector's reading of "+r.name+" add to your record",5,"apps",r.id,"What it shows that your CV and profile do not show yet.");});
  S.goals.filter(function(g){return g.aim;}).forEach(function(g){var st=g.steps.filter(function(s){return !s.done;})[0];if(st)add(st.text,20,"step",g.id+"|"+st.id,st.why||("Towards: "+g.text));});
  (S.paths&&S.paths.list||[]).slice(0,2).forEach(function(p){if(p.first)add(p.first,25,"first",p.id,"A first step towards: "+p.path);});
  (E.bl&&E.bl.list||[]).filter(function(b){return !b.done&&b.fix;}).slice(0,2).forEach(function(b){add(b.fix,20,"fix",b.id,"A blind spot: "+b.what);});
  (S.paths&&S.paths.find||[]).filter(function(f){return !f.done;}).slice(0,2).forEach(function(f){add(f.q,15,"find",f.id,f.how?"How: "+f.how:"Find out before you choose.");});
  if(cv&&E.docs[cv.id]&&E.docs[cv.id].fb&&E.docs[cv.id].fb.NEXT)E.docs[cv.id].fb.NEXT.slice(0,1).forEach(function(p){add(p[0],25,"doc",cv.id,"The first thing to do to your CV.");});
  if(!S.opps.length)add("Bring one posting, programme or grant to Applications",10,"opp","","The studio reads it against your record and says how you fit, then one step a day.");
  var old=c.week.items||[];old.forEach(function(o){if(o.done){var m=items.filter(function(x){return x.text===o.text;})[0];if(m)m.done=true;}});
  c.week={at:Date.now(),items:items.slice(0,9)};save();}
function doItem(it){var S=CS(),E=U.EDGE();
  if(it.kind==="cvlook"||it.kind==="doc"){var d=U.edgeDocs().filter(function(x){return x.id===it.ref;})[0];if(d){if(it.kind==="cvlook"){U.docAdvise(d);it.done=true;save();}else{S.ui.room="edge";S.ui.esel="d:"+d.id;U.show("work");save();render();}}return;}
  if(it.kind==="addcv"){U.addCv();return;}if(it.kind==="lector"){go("lector");return;}
  if(it.kind==="apps"){var r=runs().filter(function(x){return x.id===it.ref;})[0];if(r){if(U.busyNow()||U.needModel())return;U.begin(null,"Spotting what "+r.name+" adds to your record");U.appSkills(r).then(function(){it.done=true;save();U.end();},U.failed);}return;}
  if(it.kind==="step"){var ids=it.ref.split("|"),g=S.goals.filter(function(x){return x.id===ids[0];})[0];if(g){S.ui.room="goals";S.ui.gsel=g.id;U.show("work");save();render();}return;}
  if(it.kind==="first"){S.ui.room="goals";S.ui.gsel="paths";U.show("work");save();render();return;}
  if(it.kind==="fix"){S.ui.room="edge";S.ui.esel="bl";U.show("work");save();render();return;}
  if(it.kind==="find"){S.ui.room="goals";S.ui.gsel="paths";U.show("work");save();render();return;}
  if(it.kind==="opp"){S.ui.room="apps";S.ui.open="new";U.show("work");save();render();return;}}
function markDone(it,v){var S=CS(),E=U.EDGE();it.done=v;
  if(it.kind==="step"){var ids=it.ref.split("|"),g=S.goals.filter(function(x){return x.id===ids[0];})[0],st=g&&g.steps.filter(function(s){return s.id===ids[1];})[0];if(st)st.done=v;}
  if(it.kind==="fix"&&E.bl){var b=E.bl.list.filter(function(x){return x.id===it.ref;})[0];if(b)b.done=v;}
  if(it.kind==="find"&&S.paths){var f=(S.paths.find||[]).filter(function(x){return x.id===it.ref;})[0];if(f)f.done=v;}save();render();}
function cWeek(){var S=CS(),c=CN(),R=panel("csWork","5. This week",{chip:chip("Step 5 of 5","")}),low=U.lowDay();if(!c.week.at||!c.week.items.length)buildWeek();
  var its=c.week.items,open=its.filter(function(x){return !x.done;}),SH=low?1:3,L=h("div","cn-lede");
  L.appendChild(h("h3",null,esc(open.length?(low?"A low-energy day: one small thing is enough.":"Three things, one at a time."):"Everything for this week is done.")));
  L.appendChild(h("p",null,esc("Each says why and about how long. Do it for me runs it where the model can; otherwise it takes you to the place. Done when it is done; the next takes its place. Today, beside this room, keeps one step a day for your applications.")));R.body.appendChild(L);
  var box=h("div","cn-rec cn-week");open.slice(0,SH).forEach(function(it){box.appendChild(weekRow(it));});
  if(open.length>SH){var f=U.fold("cn-week-later","Later this week ("+(open.length-SH)+")");open.slice(SH).forEach(function(it){f.appendChild(weekRow(it));});box.appendChild(f);}
  var dn=its.filter(function(x){return x.done;});if(dn.length){var fd=U.fold("cn-week-done","Done ("+dn.length+")");dn.forEach(function(it){fd.appendChild(weekRow(it));});box.appendChild(fd);}
  R.body.appendChild(box);
  var docs=U.edgeDocs().filter(function(d){return !/^o:/.test(d.id);}),E=U.EDGE();if(docs.length){R.body.appendChild(h("div","c-label c-pad",esc("Your documents, with suggestions")));var dl=h("div","cn-rec");
    docs.forEach(function(d){var r=h("div","cn-row"),tx=h("div","tx"),a=E.docs[d.id];tx.appendChild(h("b",null,esc(d.name)));tx.appendChild(h("small",null,esc(a?"Looked at "+dayStr(a.at)+": "+Object.keys(a.fb||{}).filter(function(k){return k!=="RAW";}).reduce(function(n,k){return n+(a.fb[k]||[]).length;},0)+" suggestions, in Your edge.":d.sub)));r.appendChild(tx);
      var kk=h("div","c-keys");kk.appendChild(cbtn("sm"+(a?"":" pri"),a?"Read them":"Look at it with me",function(){if(a){S.ui.room="edge";S.ui.esel="d:"+d.id;U.show("work");save();render();}else U.docAdvise(d);}));r.appendChild(kk);dl.appendChild(r);});R.body.appendChild(dl);}
  R.body.appendChild(h("p","c-note c-pad",esc("Made "+dayStr(c.week.at)+" from your aims, the paths, your blind spots and your documents. Make the week again after a change.")));
  R.foot.appendChild(cbtn("quiet","Back",function(){go1("go");}));R.foot.appendChild(cbtn("quiet","Make the week again",function(){buildWeek();render();}));R.foot.appendChild(h("span","c-grow"));
  R.foot.appendChild(cbtn("","Copy the summary",function(){U.copyText(summaryText());}));
  R.foot.appendChild(cbtn("pri","Open Today",function(){S.ui.room="today";S.ui.show="list";save();render();}));return R;}
function weekRow(it){var r=h("div","cn-row"+(it.done?" is-done":"")),sw=h("label","c-check"),cb=h("input");cb.type="checkbox";cb.checked=!!it.done;cb.setAttribute("aria-label","Done: "+it.text);cb.addEventListener("change",function(){markDone(it,cb.checked);});sw.appendChild(cb);r.appendChild(sw);
  var tx=h("div","tx");tx.appendChild(h("b",null,esc(it.text)));if(it.why)tx.appendChild(h("small",null,esc(it.why)));r.appendChild(tx);r.appendChild(h("span","cn-min",esc("about "+it.mins+" min")));
  if(!it.done){var kk=h("div","c-keys");kk.appendChild(cbtn("sm"+(it.kind==="cvlook"||it.kind==="apps"?" pri":""),it.kind==="cvlook"||it.kind==="apps"?"Do it for me":"Go there",function(){doItem(it);}));r.appendChild(kk);}return r;}
function summaryText(){var S=CS(),E=U.EDGE(),c=CN(),L=["Your counsellor's summary, "+dayStr(Date.now())],pos=E.ed&&E.ed.pos||{};
  if(pos.pro||pos.acad||pos.bridge){L.push("","How to present yourself:");["pro","acad","bridge"].forEach(function(k){if(pos[k])L.push("- "+pos[k]);});}
  function block(t,list,f){if(!list||!list.length)return;L.push("",t+":");list.forEach(function(x){L.push("- "+f(x));});}
  block("This week",c.week.items.filter(function(x){return !x.done;}),function(x){return x.text+" (about "+x.mins+" min)";});
  block("What transfers",E.tr&&E.tr.list.slice(0,5),function(x){return x.skill+(x.line?": "+x.line:"");});
  block("Blind spots",E.bl&&E.bl.list.filter(function(x){return !x.done;}).slice(0,5),function(x){return x.what+(x.fix?": "+x.fix:"");});
  block("Paths that fit",S.paths&&S.paths.list,function(p){return p.path+(p.fits?": "+p.fits:"");});
  block("Your aims",S.goals.filter(function(g){return g.aim;}),function(g){return g.text+(g.steps.length?" ("+g.steps.filter(function(s){return s.done;}).length+" of "+g.steps.length+" steps done)":"");});return L.join("\n");}
/* ---------------- the whole path at once ---------------- */
function letWork(){if(U.busyNow()||U.needModel())return;var c=CN();U.setStop(false);var q=Promise.resolve();
  if(!stDone("record")&&haveAny())q=q.then(function(){return U.readSources().then(function(){keepAllFound();c.done.record=Date.now();c.done.have=c.done.have||Date.now();save();});});
  if(!stDone("go")&&(U.wantsText()||CS().goals.length))q=q.then(function(){return U.edgeAll(false).then(function(){var S=CS();if(!(S.paths&&S.paths.list&&S.paths.list.length))return U.runOne(IngCareer.paths);}).then(aimGoalSteps);});
  var cv=U.cvDoc();if(cv&&!U.EDGE().docs[cv.id])q=q.then(function(){return U.runOne(function(){U.docAdvise(cv);});});
  c.chain=true;save();q.then(function(){c.chain=false;buildWeek();c.stage=nextStage();save();render();say(stDone("want")?"Your counsellor has done what it could. This week is ready.":"Your record is built. Next: what you want, which only you can say.");},
    function(e){c.chain=false;save();render();var m=String(e&&e.message||e);if(m!=="stopped")say("It could not be finished: "+m);else say("Stopped. Whatever was finished is kept.");});}
/* ---------------- the room ---------------- */
function paint(par){var S=CS(),c=CN(),cur=curStage(),nx=nextStage(),L=panel("csList","Your counsellor"),me=U.isMe();
  var pr=h("div","cn-prog c-pad");STAGES.forEach(function(s){var i=h("i");if(stDone(s[0]))i.className="on";else if(s[0]===cur)i.className="now";pr.appendChild(i);});pr.appendChild(h("span",null,esc(doneN()+" of 5 done"+(me?"":" · "+U.personLabel(S)))));L.body.appendChild(pr);
  STAGES.forEach(function(s,i){var d=stDone(s[0]),sub=d?"Done "+dayStr(d):(s[0]===nx?"Next: "+s[2]:s[2]);L.body.appendChild(item((i+1)+". "+s[1],sub,cur===s[0],function(){go1(s[0]);},s[0]===nx&&!d?"c-new":""));});
  var ft=h("div","cn-foot");
  if(RUN.busy||c.chain)ft.appendChild(cbtn("pri","Stop",U.stopNow,"Stops after the step running; what was finished is kept"));
  else ft.appendChild(cbtn("pri","Let the counsellor work",letWork,"Reads your sources, finds your edge and paths, looks at your CV: everything the model can do, one after another"));
  ft.appendChild(h("span","c-note",esc("Begin another profile:")));var pk=h("div","cn-two");pk.appendChild(cbtn("quiet sm","Another side of me",function(){if(!me){say("Begin it from your own profile: choose yours in Profile first.");return;}IngCareer.newPerson("me","","").then(function(){var m=U.MT();m.cn=null;CS().ui.room="mentor";CS().ui.show="work";save();render();say("A copy of your profile, to change as you like: its counsellor starts from the beginning, with everything carried over.");});},"A copy of your profile, entries, documents and CV, to change: the academic and the professional kept apart, nothing mixed"));
  pk.appendChild(cbtn("quiet sm","Someone else",function(){IngCareer.newPerson("other","","").then(function(){var m=U.MT();m.cn=null;CS().ui.room="mentor";CS().ui.show="work";save();render();say("A new profile. Its counsellor starts from the beginning: give it what they have.");});},"Another person you help: a profile of their own, nothing of yours in it"));ft.appendChild(pk);
  L.foot.appendChild(ft);
  if(RUN.busy){U.two(L,U.livePanel(),par);return;}
  var R=({have:cHave,record:cRecord,want:cWant,go:cGo,week:cWeek}[cur]||cHave)();
  R.head.insertBefore(cbtn("quiet c-back","‹ Your counsellor",function(){U.show("list");save();render();}),R.head.firstChild);U.two(L,R,par);}
/* the whole picture on Today (her answer: "The whole picture: applications, mentor, profile"), and what changed while she was away */
function picture(par,S){var E=U.EDGE(),c=CN(),p=P(),now=Date.now(),seen=S.ui.seenAt||0,box=h("div","cn-pic");
  var open=S.opps.filter(function(o){return !U.FINISHED[o.stage];}),soon=[];open.forEach(function(o){(U.datesOf(o)||[]).forEach(function(d){var n=U.daysTo(d.at);if(n!=null&&n>=0&&n<=7)soon.push(o);});});
  function card(title,sub,key,fn){var b=item(title,sub,false,fn,"cn-pc");b.appendChild(h("span","cn-pc-k",esc(key)));return b;}
  var nx=nextStage(),st=STAGES.filter(function(x){return x[0]===nx;})[0],wkOpen=c.week.items.filter(function(x){return !x.done;});
  box.appendChild(card("Applications",open.length?open.length+" open"+(soon.length?", "+soon.length+" closing within a week":"")+(open.some(function(o){return U.nextOf(o);})?" · a step waits on the left":""):"None yet: bring a posting, a programme's call or a grant","Open",function(){S.ui.room="apps";S.ui.show="list";save();render();}));
  box.appendChild(card("Your counsellor",doneN()===5?(wkOpen.length?"This week: "+wkOpen[0].text+" (about "+wkOpen[0].mins+" min)":"All five stages done; the week's list is done"):doneN()+" of 5 stages done · next: "+st[1],"Open",function(){S.ui.room="mentor";S.ui.show="work";save();render();}));
  var m=M(),srcs=[m.cv?"your CV":"",p.linkedin?"LinkedIn":"",p.files.length?p.files.length+" document"+(p.files.length===1?"":"s"):"",runs().length?runs().length+" app"+(runs().length===1?"":"s")+" read":""].filter(Boolean);
  box.appendChild(card("Your profile",(p.items.length?p.items.length+" entr"+(p.items.length===1?"y":"ies")+(foundN()?" ("+foundN()+" to check)":""):"No entries yet")+(srcs.length?" · from "+srcs.join(", "):" · no sources yet"),"Open",function(){S.ui.room="profile";S.ui.show="list";save();render();}));
  par.appendChild(h("div","c-label",esc("The whole picture")));par.appendChild(box);
  if(seen&&now-seen>6*3600*1000){var ago=Math.round((now-seen)/3600000),lines=[];
    S.opps.forEach(function(o){(U.datesOf(o)||[]).forEach(function(d){var n=U.daysTo(d.at);if(n!=null&&n<0&&new Date(d.at+"T12:00:00").getTime()>seen)lines.push((o.title||"An application")+": its date ("+d.label.toLowerCase()+") passed.");else if(n!=null&&n>=0&&n<=3)lines.push((o.title||"An application")+" "+d.label.toLowerCase()+" in "+n+" day"+(n===1?"":"s")+".");});});
    runs().forEach(function(r){if((r.finished||r.updated||0)>seen)lines.push("Lector finished reading "+r.name+(r.version?" "+r.version:"")+(E.apps&&E.apps[r.name]?": "+E.apps[r.name].list.length+" things it adds to your record.":"."));});
    STAGES.forEach(function(x){var d=stDone(x[0]);if(d&&d>seen)lines.push("Your counsellor: "+x[1]+" done.");});
    if(lines.length||ago>=24){var w=h("div","cn-away");w.appendChild(h("b",null,esc("While you were away ("+(ago>=48?Math.round(ago/24)+" days":ago+" hours")+")")));var ul=h("ul");(lines.length?lines:["Nothing changed. Your place is kept."]).slice(0,5).forEach(function(l){ul.appendChild(h("li",null,esc(l)));});w.appendChild(ul);par.appendChild(w);}}
  S.ui.seenAt=now;}
function todayText(){var nx=nextStage(),c=CN();if(doneN()===5){var open=c.week.items.filter(function(x){return !x.done;});return open.length?"Your counsellor, this week: "+open[0].text+" (about "+open[0].mins+" min).":"Your counsellor: this week's list is done.";}
  var s=STAGES.filter(function(x){return x[0]===nx;})[0];return "Your counsellor's next stage: "+s[1]+". "+s[2]+".";}
/* ---------------- in Lector: the studio's suggestions beside the document ---------------- */
function lectorAdvise(){var k=D.getElementById("l7Advise");if(!k||k.__cn)return;k.__cn=true;var orig=k.onclick;
  k.onclick=function(){if(!(W.IngLector&&W.IngCareer&&IngCareer.adviseDoc)){if(orig)orig.apply(this,arguments);return;}
    var cur=null;try{cur=IngLector.curDoc?IngLector.curDoc():null;}catch(e){}
    if(!cur){/* Lector's own way: it knows the document shown */if(orig)orig.apply(this,arguments);return;}
    Promise.resolve(cur).then(function(d){if(!d||!d.md||d.md.trim().length<80){ingToast("There is nothing to look at yet: this document is written after the reading.");return;}
      var name=({cv:"CV entry",cover:"Cover letter",portfolio:"Portfolio piece",dossier:"Dossier",appendix:"Appendix",analysis:"Notes and analysis",functions:"Every function"}[d.kind]||"This document"),E=U.EDGE(),ref=IngBig.newId(),it={id:uid("in"),name:name.slice(0,160),kind:{cv:"cv",cover:"cover",portfolio:"portfolio"}[d.kind]||"",ref:ref,from:"lector",at:Date.now()};
      return Promise.resolve(IngBig.put(ref,d.md)).then(function(){var old=E.inbox.filter(function(x){return x.name===it.name&&x.from===it.from;});old.forEach(function(x){try{IngBig.del(x.ref);}catch(e){}delete E.docs["i:"+x.id];});
        E.inbox=[it].concat(E.inbox.filter(function(x){return old.indexOf(x)<0;}));save();var dd=U.edgeDocs().filter(function(x){return x.id==="i:"+it.id;})[0];if(!dd)return;
        if(U.busyNow()||U.needModel())return;U.docAdvise(dd);lxPane(dd,it);});});};}
function lxPane(d,it){var host=D.getElementById("l7Doc");if(!host)return;var old=host.querySelector(".cn-lxpane");if(old)old.parentNode.removeChild(old);
  if(getComputedStyle(host).position==="static")host.style.position="relative";
  var p=h("div","cn-lxpane"),hd=h("div","hd");hd.appendChild(h("b",null,esc("Suggestions · "+it.name)));var x=cbtn("sm quiet","Close",function(){p.parentNode&&p.parentNode.removeChild(p);});x.className="l-btn quiet";hd.appendChild(x);p.appendChild(hd);
  var bd=h("div","bd");bd.appendChild(h("p",null,esc("Looking at it with you, from your record"+(U.wantsText()?" and your targets":"")+". It is never rewritten.")));var live=h("div","live");bd.appendChild(live);p.appendChild(bd);
  var ft=h("div","ft");var ok=cbtn("","Open in the Career Studio",function(){CS().ui.room="edge";CS().ui.esel="d:"+d.id;U.show("work");save();go("career");render();});ok.className="l-btn";ft.appendChild(ok);p.appendChild(ft);host.appendChild(p);
  var t=setInterval(function(){if(!p.isConnected){clearInterval(t);return;}if(RUN.busy){live.textContent=(RUN.think?RUN.think.slice(-600)+"\n":"")+(RUN.live||"…");return;}clearInterval(t);
    var a=U.EDGE().docs[d.id];live.textContent="";if(!a){bd.appendChild(h("p",null,esc("Nothing came back. Try again, or look in the Career Studio, Your edge.")));return;}
    bd.innerHTML="";U.ADV_TAGS.forEach(function(tg){var rows=a.fb[tg[0]];if(!rows||!rows.length)return;bd.appendChild(h("h4",null,esc(tg[1])));var ul=h("ul");rows.forEach(function(r){var li=h("li");li.appendChild(D.createTextNode(r[0]));if(r[1])li.appendChild(h("small",null,esc(r.slice(1).join(" · "))));ul.appendChild(li);});bd.appendChild(ul);});
    if(a.fb.RAW)bd.appendChild(h("p",null,esc(a.fb.RAW[0][0])));bd.appendChild(h("p",null,esc("Looked at with "+(a.model||"your model")+". Suggestions only: the document is yours.")));},700);}
var ogo=W.go;if(typeof ogo==="function"){W.go=function(p){var r=ogo.apply(this,arguments);try{if(p==="lector")setTimeout(lectorAdvise,50);}catch(e){}return r;};}
try{lectorAdvise();}catch(e){}
W.IngCounsel={picture:picture,paint:paint,stages:STAGES,state:CN,next:nextStage,done:stDone,go:go1,take:takeFiles,build:buildRecord,runGo:runGo,week:buildWeek,letWork:letWork,todayText:todayText,summary:summaryText,chips:CHIPS,keepAll:keepAllFound,looksCv:looksCv};
/* the room's tab takes the counsellor's name (r188 names it Your mentor while this part is held out of a build) */
try{var tb=D.querySelector('#cs .rm-tabs [data-room="mentor"] span');if(tb)tb.textContent="Your counsellor";var tbb=tb&&tb.parentNode;if(tbb)tbb.title="Your counsellor";}catch(e){}
try{if(CS().ui.room==="mentor"&&D.getElementById("page-career")&&D.getElementById("page-career").classList.contains("active"))render();}catch(e){}
try{window.__ingParts["p283"]="running";}catch(_){}
})();
</script>
