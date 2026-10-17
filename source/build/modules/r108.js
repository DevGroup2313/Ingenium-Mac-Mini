<script>try{(window.__ingParts=window.__ingParts||{})["p40"]="started";}catch(_){}
/* R108 · LECTOR'S NEW PAGE, AND WHAT IT CAN NOW DO
   Her requests, in her words (16 October and before): three live panels side by side, "so I can see the thinking
   and writing of the model as it reads the apps", "click and review its live code in the thinking panel"; "pick two
   apps or three apps ... and have it create documents that merge and speaks of the apps that I chose"; "a master
   project dossier or master project appendix that includes all four apps"; "upload a job posting and then have the
   documents be generated for that specific role ... the same thing for academic programmes"; "written with my own
   prose"; "Word docx ... PDFs and even HTML files"; "Their seals should not however, [be] placed on my resumes or
   cover letters"; "the best model ... for each device".
   What does not change: Lector's own reading (R86): the parts sized to the model, a note kept after every part, the
   notes joined, the analysis written section by section, everything resumable after a pause or a power cut.
   What is new: a set of one to four of her apps, read one after another (a reading already finished is used again);
   the documents written for the set, section by section, each from only the parts of the analysis it needs (the old
   writer cut the analysis short and lost its last sections); the posting or the programme, her CV, her own writing
   and her past letters, kept on this device and used in every document; a check of every figure against the
   measures; each document kept (the three before it too), never written over; and saving as Word, a web page,
   Markdown and PDF. */
(function r108Lector(){
if(typeof lxRender!=="function"||!document.getElementById("page-lector"))return;

/* ---------------- the apps, the documents ---------------- */
var APPS={cd:{name:"Carpe Diem",abbr:"CD",color:"#1B6B93",fill:"#EAF2F7",sub:"#454549"},forge:{name:"The Forge",abbr:"Forge",color:"#17577A",fill:"#F6F0E2",sub:"#8A6A22"},
  ingenium:{name:"Ingenium",abbr:"Ingenium",color:"#6A3FB5",fill:"#F1ECFA",sub:"#4B3A6E"},inkwell:{name:"Inkwell",abbr:"Inkwell",color:"#1F4F68",fill:"#F4EFE3",sub:"#8A6526"}};
var ORDER=["cd","forge","ingenium","inkwell"];
var KINDS=[["dossier","Project dossier","The full account, section by section"],["appendix","Appendix","Measured tables and the evidence"],
  ["portfolio","Portfolio piece","Two pages for your catalogue"],["cover","Cover letter","Fitted to the posting"],["cv","CV entry","Your projects, for your CV"]];
var HOUSE={dossier:"dossier",appendix:"appendix",portfolio:"summary",cover:"cover",cv:"cv",analysis:"summary"};
function nm(k){return APPS[k]?APPS[k].name:k;}
function sorted(a){return ORDER.filter(function(k){return (a||[]).indexOf(k)>=0;});}
function listNames(ks){var n=ks.map(nm);if(n.length<2)return n[0]||"";if(n.length===2)return n[0]+" and "+n[1];return n.slice(0,-1).join(", ")+" and "+n[n.length-1];}
function setName(a){a=sorted(a);return a.length===4?"The Offline Project":listNames(a);}
function setKind(a){var n=sorted(a).length;return n===4?"all four":n===3?"a trio":n===2?"a pair":n===1?"on its own":"";}
function docLabel(kind,a,purpose){var all=sorted(a).length===4;
  return {dossier:all?"Master project dossier":"Project dossier",appendix:all?"Master appendix":"Appendix",portfolio:"Portfolio piece",
    cover:purpose==="programme"?"Cover letter for the programme":"Cover letter",cv:"CV entry",analysis:"Notes and analysis"}[kind]||kind;}
function sealed(kind){return kind==="dossier"||kind==="appendix"||kind==="portfolio";}
function author(){try{return lxhAuthor()||"";}catch(e){return "";}}
function month(){try{return lxhMonth();}catch(e){return "";}}
function today(){try{return new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}
function appOfText(t){try{var a=IngHouseDocs.apps(t);return a.length===1?a[0]:null;}catch(e){return null;}}

/* ---------------- the paper of each app (her word, 17 October): "give Inkwell's documents the Inkwell colour palette and
   design and the same for the Forge and Carpe Diem", and "the documents on the Lector page to have a dark mode look and
   not be white on dark mode". A document about one app is set in that app's own hand and colours, as its door shows
   them: Carpe Diem white with its ocean blue and gilt, The Forge cool white with its steel blue and the ember of its
   forge, Inkwell on warm laid paper in ink navy and brass, set in Cormorant as Inkwell is, Ingenium in amethyst. A
   document about two, three or all four is set as The Offline Project: vellum, ink and the master seal's gilt, each
   app's own sections in its own colour. Her CV and her letters stay plain. By night each paper is the app's own night:
   Carpe Diem's slate and sky blue, The Forge's charcoal and ember, Inkwell's midnight ink and brass, with the seals as
   each app shows them by night. Printed, a page is always the day paper. ---------------- */
var LX7_FONTS=/*R108_FONTS*/null;
var SANS='-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,Helvetica,Arial,sans-serif',TIMES='"Times New Roman",Times,serif',GEORGIA='Georgia,"Iowan Old Style","Times New Roman",serif',
  CORM='"Lector Cormorant","Cormorant Garamond",Cormorant,Garamond,Georgia,serif',CINZEL='"Lector Cinzel",Cinzel,"Trajan Pro",Optima,Georgia,serif',IOWAN='"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif';
var PT={
  neutral:{body:TIMES,disp:TIMES,caps:TIMES,h2:TIMES,fs:15,h1:24,h1w:700,h1ls:"0",capsw:600,capsls:".18em",capsfs:11.5,h2w:700,h2ls:"0",h2fs:16,
    day:{desk:"#efeaf4",bg:"#ffffff",tex:"none",ink:"#1e1828",ink2:"#454549",acc:"#2b2b33",title:"#1e1828",sub:"#454549",gold:"#8a7650",caps:"#8a7650",tint:"#f2f2f4",hair:"rgba(30,24,40,.14)",line:"rgba(30,24,40,.14)",rule:"#4a405a",code:"#f4f2f6",fill:"#8a6526",chk:"#b0302f",frame:"transparent",qbg:"transparent",qink:"#454549"},
    night:{desk:"#121016",bg:"#1e1c23",tex:"none",ink:"#ece9f1",ink2:"#b9b3c4",acc:"#e8e3ef",title:"#f4f1f8",sub:"#c9c2d4",gold:"#c9b07a",caps:"#c9b07a",tint:"rgba(255,255,255,.05)",hair:"rgba(255,255,255,.12)",line:"rgba(255,255,255,.12)",rule:"rgba(255,255,255,.42)",code:"rgba(255,255,255,.05)",fill:"#d9b77a",chk:"#e88a8a",frame:"transparent",qbg:"transparent",qink:"#b9b3c4"}},
  ingenium:{upper:1,orn:1,keys:1,body:TIMES,disp:IOWAN,caps:SANS,h2:TIMES,fs:15,h1:26,h1w:600,h1ls:".03em",capsw:700,capsls:".2em",capsfs:10.5,h2w:700,h2ls:"0",h2fs:16,
    day:{desk:"#efeaf4",bg:"#ffffff",tex:"none",ink:"#1e1828",ink2:"#4a4358",acc:"#6a3fb5",title:"#4e2c8a",sub:"#4b3a6e",gold:"#b88a3a",caps:"#6a3fb5",tint:"#f1ecfa",hair:"rgba(34,26,46,.12)",line:"rgba(106,63,181,.22)",rule:"#4a405a",code:"#f6f3fa",fill:"#8a6526",chk:"#b0302f",frame:"transparent",qbg:"#f6f2fc",qink:"#3d2f5c"},
    night:{desk:"#120e19",bg:"#221b2e",tex:"none",ink:"#ece6f6",ink2:"#c3b8d6",acc:"#c4a8f0",title:"#dccbff",sub:"#b7a5d6",gold:"#d8b46a",caps:"#c4a8f0",tint:"rgba(183,156,230,.10)",hair:"rgba(205,184,240,.13)",line:"rgba(196,168,240,.28)",rule:"rgba(205,184,240,.45)",code:"rgba(255,255,255,.05)",fill:"#e0be78",chk:"#f08f8f",frame:"transparent",qbg:"rgba(183,156,230,.08)",qink:"#d9cdee"}},
  cd:{roman:1,h3caps:1,body:GEORGIA,disp:GEORGIA,caps:SANS,h2:GEORGIA,fs:14.5,h1:27,h1w:700,h1ls:".02em",capsw:700,capsls:".22em",capsfs:10.5,h2w:700,h2ls:".01em",h2fs:16,
    day:{desk:"#f5f5f7",bg:"#ffffff",tex:"none",ink:"#1d1d1f",ink2:"#454549",acc:"#1b6b93",title:"#121218",sub:"#145671",gold:"#b88a3a",caps:"#1b6b93",tint:"#eaf2f7",hair:"rgba(27,107,147,.14)",line:"rgba(184,138,58,.55)",rule:"#1b6b93",code:"#f2f6f8",fill:"#8a6526",chk:"#b0302f",frame:"rgba(27,107,147,.40)",qbg:"#e9eff2",qink:"#173f53"},
    night:{desk:"#121013",bg:"#20262e",tex:"none",ink:"#e8e8ea",ink2:"#a9b0b8",acc:"#5baedb",title:"#f0ede6",sub:"#8fc4e6",gold:"#d9b45a",caps:"#5baedb",tint:"rgba(91,174,219,.10)",hair:"rgba(255,255,255,.10)",line:"rgba(217,180,90,.45)",rule:"rgba(91,174,219,.6)",code:"rgba(255,255,255,.05)",fill:"#e0be78",chk:"#e07a7a",frame:"rgba(91,174,219,.38)",qbg:"#1a2630",qink:"#dbe8f1"}},
  forge:{roman:1,body:GEORGIA,disp:GEORGIA,caps:SANS,h2:GEORGIA,fs:14.5,h1:27,h1w:700,h1ls:".02em",capsw:700,capsls:".22em",capsfs:10.5,h2w:700,h2ls:".01em",h2fs:16,
    day:{desk:"#e9ecef",bg:"#fbfcfd",tex:"none",ink:"#121619",ink2:"#39424c",acc:"#17577a",title:"#121619",sub:"#a55a22",gold:"#b88a3a",caps:"#1b6b93",tint:"#eef1f4",hair:"rgba(10,30,46,.13)",line:"rgba(165,90,34,.45)",rule:"#39424c",code:"#eef1f4",fill:"#8a6526",chk:"#b0302f",frame:"rgba(10,30,46,.24)",qbg:"#eef1f4",qink:"#2a333d"},
    night:{desk:"#0a0c0f",bg:"#1d232b",tex:"none",ink:"#e2e6ea",ink2:"#a3adb7",acc:"#5baedb",title:"#f0ede6",sub:"#cf8a52",gold:"#d9b45a",caps:"#5baedb",tint:"rgba(207,138,82,.10)",hair:"rgba(255,255,255,.09)",line:"rgba(207,138,82,.5)",rule:"rgba(255,255,255,.38)",code:"rgba(255,255,255,.05)",fill:"#e0be78",chk:"#e07a7a",frame:"rgba(255,255,255,.13)",qbg:"rgba(207,138,82,.08)",qink:"#ead7c6"}},
  inkwell:{body:CORM,disp:CORM,caps:CORM,h2:CORM,fs:17.5,h1:36,h1w:600,h1ls:".01em",capsw:600,capsls:".32em",capsfs:12,h2w:700,h2ls:".01em",h2fs:20,
    day:{desk:"#efe9db",bg:"#fffdf6",tex:"repeating-linear-gradient(0deg,rgba(110,90,50,.035) 0 1px,transparent 1px 5px),radial-gradient(120% 80% at 50% 0%,#fffef9 0%,#fffdf6 55%,#f8f1df 100%)",ink:"#231d15",ink2:"#5f5646",acc:"#1f4f68",title:"#1f4f68",sub:"#8a6526",gold:"#a97e2c",caps:"#8a6526",tint:"#f3ecda",hair:"#e3d9c2",line:"rgba(169,126,44,.6)",rule:"#a97e2c",code:"#f5efe0",fill:"#8a6526",chk:"#b0302f",frame:"rgba(169,126,44,.38)",qbg:"#f6efdf",qink:"#3a3020"},
    night:{desk:"#070b10",bg:"#101821",tex:"repeating-linear-gradient(0deg,rgba(255,240,200,.02) 0 1px,transparent 1px 5px),radial-gradient(120% 80% at 50% 0%,#152230 0%,#101821 60%,#0c131b 100%)",ink:"#ebe3cf",ink2:"#b3a88c",acc:"#d4bc86",title:"#ebe3cf",sub:"#c9a964",gold:"#c9a964",caps:"#c9a964",tint:"#16202b",hair:"#1f2c39",line:"rgba(201,169,100,.55)",rule:"rgba(201,169,100,.7)",code:"#0c131b",fill:"#d4bc86",chk:"#e88a8a",frame:"rgba(201,169,100,.32)",qbg:"#0c131b",qink:"#dcd2bb"}},
  family:{body:GEORGIA,disp:CINZEL,caps:CINZEL,h2:CINZEL,fs:14.5,h1:25,h1w:600,h1ls:".08em",capsw:600,capsls:".26em",capsfs:11,h2w:600,h2ls:".05em",h2fs:15,
    day:{desk:"#f6f1e6",bg:"#fffdf8",tex:"radial-gradient(120% 80% at 50% 0%,#fffefb 0%,#fffdf8 55%,#f9f3e4 100%)",ink:"#1f2a36",ink2:"#4a4a52",acc:"#23364a",title:"#1f2a36",sub:"#7a5f2e",gold:"#a8843c",caps:"#8a6a2c",tint:"#f4eedf",hair:"rgba(60,45,20,.15)",line:"rgba(168,132,60,.6)",rule:"#a8843c",code:"#f6f1e6",fill:"#8a6526",chk:"#b0302f",frame:"rgba(168,132,60,.42)",qbg:"#f6f0e2",qink:"#2c3a48"},
    night:{desk:"#0d1218",bg:"#141c25",tex:"radial-gradient(120% 80% at 50% 0%,#18222d 0%,#141c25 60%,#10171f 100%)",ink:"#f1ead8",ink2:"#cfc6b2",acc:"#e2c98f",title:"#f1ead8",sub:"#d8b46a",gold:"#d8b46a",caps:"#d8b46a",tint:"rgba(216,180,106,.10)",hair:"rgba(220,190,120,.15)",line:"rgba(216,180,106,.55)",rule:"rgba(216,180,106,.65)",code:"rgba(255,255,255,.04)",fill:"#e0c27c",chk:"#e88a8a",frame:"rgba(216,180,106,.36)",qbg:"rgba(216,180,106,.07)",qink:"#e8dfc9"}}};
/* in a document about several apps, each app's own sections in its own colour, by day and by night */
var OWN={day:{cd:"#1b6b93",forge:"#17577a",ingenium:"#6a3fb5",inkwell:"#1f4f68"},night:{cd:"#5baedb",forge:"#cf8a52",ingenium:"#c4a8f0",inkwell:"#d4bc86"}};
function roman(n){var v=[[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]],r="";v.forEach(function(p){while(n>=p[0]){r+=p[1];n-=p[0];}});return r;}
var LATIN=["IANVARII","FEBRVARII","MARTII","APRILIS","MAII","IVNII","IVLII","AVGVSTI","SEPTEMBRIS","OCTOBRIS","NOVEMBRIS","DECEMBRIS"];
/* the date as Carpe Diem and The Forge write it on their doors: XVII·OCTOBRIS·MMXXVI */
function romanDate(d){d=d||new Date();return roman(d.getDate())+"\u00b7"+LATIN[d.getMonth()]+"\u00b7"+roman(d.getFullYear());}
function themeOf(kind,apps){if(kind==="cover"||kind==="cv")return "neutral";apps=apps||[];if(apps.length>1)return "family";return PT[apps[0]]?apps[0]:"neutral";}
/* the paper's rules, for the page (night follows Ingenium's own switch) or for a saved web page (night follows the reader's device; printed, always day) */
function paperCss(forPage){var S=forPage?"#lx7 ":"",out=[];
  function vars(v){return "--p-frame:"+v.frame+";--p-qbg:"+v.qbg+";--p-qink:"+v.qink+";--p-desk:"+v.desk+";--p-bg:"+v.bg+";--p-tex:"+v.tex+";--p-ink:"+v.ink+";--p-ink2:"+v.ink2+";--p-acc:"+v.acc+";--p-title:"+v.title+";--p-sub:"+v.sub+";--p-gold:"+v.gold+";--p-caps:"+v.caps+";--p-tint:"+v.tint+";--p-hair:"+v.hair+";--p-line:"+v.line+";--p-rule:"+v.rule+";--p-code:"+v.code+";--p-fill:"+v.fill+";--p-chk:"+v.chk;}
  function own(m){return Object.keys(OWN[m]).map(function(k){return "--c-"+k+":"+OWN[m][k];}).join(";");}
  var DAYSH="0 1px 0 rgba(40,22,68,.06),0 3px 8px rgba(40,22,68,.08),0 18px 40px rgba(40,22,68,.12)",NIGHTSH="0 0 0 1px rgba(255,255,255,.05),0 1px 0 rgba(0,0,0,.45),0 4px 10px rgba(0,0,0,.38),0 20px 44px rgba(0,0,0,.5)";
  Object.keys(PT).forEach(function(k){var t=PT[k];
    out.push(S+".th-"+k+"{--p-body:"+t.body+";--p-disp:"+t.disp+";--p-capsf:"+t.caps+";--p-h2f:"+t.h2+";--p-fs:"+t.fs+"px;--p-h1:"+t.h1+"px;--p-h1w:"+t.h1w+";--p-h1ls:"+t.h1ls+";--p-capsw:"+t.capsw+";--p-capsls:"+t.capsls+";--p-capsfs:"+t.capsfs+"px;--p-h2w:"+t.h2w+";--p-h2ls:"+t.h2ls+";--p-h2fs:"+t.h2fs+"px;"+vars(t.day)+";"+own("day")+";--p-sh:"+DAYSH+"}");
    var nightRule=".th-"+k+"{"+vars(t.night)+";"+own("night")+";--p-sh:"+NIGHTSH+"}";
    if(forPage)out.push('body[data-theme="night"] #lx7 '+nightRule);else out.push("@media screen and (prefers-color-scheme:dark){"+nightRule+"}");});
  var P=S+".l-paper";
  out.push(P+"{max-width:640px;margin:0 auto;background-color:var(--p-bg);background-image:var(--p-tex);color:var(--p-ink);border-radius:3px;box-shadow:var(--p-sh);padding:46px 52px 52px;font:var(--p-fs)/1.62 var(--p-body);text-align:left}",
    P+" + .l-paper{margin-top:16px}",
    P+" .cv{display:flex;flex-direction:column;align-items:center;gap:9px;padding:10px 0 18px;border-bottom:1px solid var(--p-line);margin-bottom:24px;text-align:center}",
    P+" .cv .seals{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:2px}",
    P+" .cv .seals img,"+P+" .cv .seals .sn{width:84px;height:84px;object-fit:contain}",
    P+" .cv .seals img.master,"+P+" .cv .seals .sn.master{width:118px;height:auto}",
    P+" .cv .seals .sn{position:relative;display:inline-block}",
    P+" .cv .seals .sn img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}",
    P+" .cv h1{font:var(--p-h1w) var(--p-h1)/1.18 var(--p-disp);letter-spacing:var(--p-h1ls);margin:6px 0 0;color:var(--p-title)}",
    P+" .cv .caps{display:flex;align-items:center;gap:12px;font:var(--p-capsw) var(--p-capsfs)/1.3 var(--p-capsf);letter-spacing:var(--p-capsls);text-transform:uppercase;color:var(--p-caps);max-width:100%}",
    P+" .cv .caps i{display:block;width:44px;height:1px;background:var(--p-line);flex:0 1 44px}",
    P+" .cv .sub{font:italic var(--p-fs)/1.45 var(--p-body);color:var(--p-acc)}",
    P+" .cv .for,"+P+" .cv .by{font:calc(var(--p-fs) - 1.5px)/1.4 var(--p-body);color:var(--p-ink2)}",
    P+" h2{font:var(--p-h2w) var(--p-h2fs)/1.3 var(--p-h2f);letter-spacing:var(--p-h2ls);margin:24px 0 9px;color:var(--p-acc)}",
    P+" h2.own-cd{color:var(--c-cd)}"+P+" h2.own-forge{color:var(--c-forge)}"+P+" h2.own-ingenium{color:var(--c-ingenium)}"+P+" h2.own-inkwell{color:var(--c-inkwell)}",
    P+" h3{font:italic 700 calc(var(--p-fs) + .5px)/1.3 var(--p-body);margin:16px 0 6px;color:var(--p-sub)}",
    P+" p{margin:0 0 10px}",P+" ul,"+P+" ol{margin:0 0 10px;padding-left:22px}",P+" li{margin:0 0 4px}",P+" li::marker{color:var(--p-acc)}",
    P+" hr{border:0;border-top:1px solid var(--p-line);margin:18px 0}",
    P+" blockquote{margin:0 0 10px 18px;padding-left:12px;border-left:2px solid var(--p-line);font-style:italic;color:var(--p-ink2)}",
    P+" pre{background:var(--p-code);color:var(--p-ink);padding:8px 10px;border-radius:4px;border:1px solid var(--p-hair);font:12px/1.5 ui-monospace,\"SF Mono\",Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word}",
    P+" table{width:100%;border-collapse:collapse;font:calc(var(--p-fs) - 2px)/1.45 var(--p-body);margin:8px 0 14px;display:block;overflow-x:auto}",
    P+" th,"+P+" td{border-bottom:1px solid var(--p-hair);padding:5px 6px;text-align:left;vertical-align:top}",
    P+" th{font-weight:700;color:var(--p-acc);border-top:1.5px solid var(--p-rule);border-bottom:1.5px solid var(--p-rule);background:var(--p-tint)}",
    P+" .note{font-style:italic;font-size:calc(var(--p-fs) - 2px);color:var(--p-ink2);border-top:1px solid var(--p-line);padding-top:10px;margin-top:18px}",
    P+" .wait{color:var(--p-ink2);opacity:.8;font-style:italic;font-size:calc(var(--p-fs) - 1.5px)}",
    P+" .fill{color:var(--p-fill);font-style:italic;border-bottom:1.5px dotted var(--p-gold)}",
    P+" .chk{border-bottom:1.5px dotted var(--p-chk);cursor:help}",
    P+" .lhead{text-align:right;font:calc(var(--p-fs) - 2px)/1.5 var(--p-body);color:var(--p-ink2);margin-bottom:22px}",
    P+" .lhead b{display:block;font:700 calc(var(--p-fs) + 1px)/1.3 var(--p-disp);color:var(--p-title)}",
    P+" a{color:var(--p-acc)}",P+" [data-live] .l-caret{background:var(--p-acc)}",
    /* a fine frame inset in the page, as each door has one (Carpe Diem's blue, The Forge's steel, Inkwell's brass, the set's gilt) */
    P+"{position:relative}",P+"::before{content:\"\";position:absolute;inset:12px;border:1px solid var(--p-frame);border-radius:2px;pointer-events:none}",
    P+" blockquote{background:var(--p-qbg);color:var(--p-qink);padding:8px 12px;border-radius:0 6px 6px 0}",
    P+" .cv .tag{font:italic calc(var(--p-fs) + 1.5px)/1.4 var(--p-disp);color:var(--p-acc);margin-top:-2px}",
    P+" h2 .no{font-variant-numeric:lining-nums}",
    /* Carpe Diem: its small headings in its own spaced blue capitals */
    S+".th-cd h3{font:700 11.5px/1.4 "+SANS+";letter-spacing:.14em;text-transform:uppercase;color:var(--p-acc);margin:18px 0 7px}",
    /* Ingenium: the title in spaced capitals, as its wordmark; a four-pointed star set in the rule under the cover; each section's number on a small lilac key */
    S+".th-ingenium .cv h1{text-transform:uppercase;letter-spacing:.16em;font-size:calc(var(--p-h1) - 3px)}",
    S+".th-ingenium .cv{border-bottom:0;position:relative;padding-bottom:26px}",
    S+".th-ingenium .cv::before{content:\"\";position:absolute;bottom:0;left:12%;right:12%;height:1px;background:var(--p-line)}",
    S+".th-ingenium .cv::after{content:\"\\2726\";position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);padding:0 10px;font:15px/20px "+SANS+";color:var(--p-acc);background-color:var(--p-bg)}",
    S+".th-ingenium h2{display:flex;align-items:baseline;gap:9px}",
    S+".th-ingenium h2 .no{flex:0 0 auto;display:inline-grid;place-items:center;min-width:22px;height:22px;padding:0 5px;border-radius:6px;background:var(--p-tint);border:1px solid var(--p-line);font:700 12px/1 "+SANS+";color:var(--p-acc);transform:translateY(-2px)}",
    S+".th-ingenium h2 .dot{display:none}");
  if(forPage)out.push("#lx7 .l-desk[class*=\"th-\"]{background:var(--p-desk)}");
  else out.push("body{margin:0;background:var(--p-desk)}",".l-paper{max-width:720px;margin:28px auto;padding:56px 64px 64px}",
    "@media (max-width:760px){.l-paper{margin:0;padding:28px 20px;border-radius:0}}",
    "@media print{body{background:#fff}.l-paper{box-shadow:none;margin:0;max-width:none;padding:0;background-image:none}}","@page{size:A4;margin:25mm 25mm 22mm}");
  return out.join("\n");}
/* the faces the papers are set in (Inkwell's Cormorant, Cinzel for The Offline Project), both under the SIL Open Font Licence */
function fontCss(which){var F=LX7_FONTS||{},out=[];function face(fam,key,w,st){if(F[key])out.push('@font-face{font-family:"'+fam+'";font-style:'+st+';font-weight:'+w+';font-display:swap;src:url('+F[key]+') format("woff2")}');}
  if(!which||which==="inkwell"){face("Lector Cormorant","cormorant-500-normal",500,"normal");face("Lector Cormorant","cormorant-600-normal",600,"normal");face("Lector Cormorant","cormorant-700-normal",700,"normal");face("Lector Cormorant","cormorant-500-italic",500,"italic");}
  if(!which||which==="family")face("Lector Cinzel","cinzel-600-normal",600,"normal");
  return out.join("\n");}
function paperStyle(){if(document.getElementById("l7PaperCss"))return;var st=document.createElement("style");st.id="l7PaperCss";st.textContent=fontCss()+"\n"+paperCss(true);document.head.appendChild(st);}
/* a seal on the paper, flat: by day its picture; by night the app's own night seal, its layers laid one on another */
function paperSeal(k,mode){var L=LX7_LAYERS||{};
  if(k==="master"){var src=masterSrc(mode==="night");return '<img class="master'+(mode?" s"+mode.charAt(0):"")+'" src="'+src+'" alt="The master seal of The Offline Project">';}
  if(mode==="night"&&L[k+"N"])return '<span class="sn" role="img" aria-label="'+esc(nm(k))+'\'s seal">'+L[k+"N"].filter(function(x){return !x.side;}).map(function(x){return '<img src="'+x.src+'" alt="">';}).join("")+'</span>';
  return '<img'+(mode?' class="sd"':'')+' src="'+flatSrc(k)+'" alt="'+esc(nm(k))+'\'s seal">';}
function appOf(run){return run&&(run.app||appOfText((run.name||"")+" "+(run.file||"")))||null;}

/* ---------------- what Lector keeps ---------------- */
function L7(){var s=lxState();
  if(!s.brief||typeof s.brief!=="object")s.brief={apps:[],purpose:"portfolio",docs:{dossier:true,appendix:true,portfolio:false,cover:false,cv:false},depth:"overview",fmt:"docx",modelId:null};
  if(!Array.isArray(s.brief.apps))s.brief.apps=[];if(!s.brief.docs)s.brief.docs={dossier:true};
  if(!s.me||typeof s.me!=="object")s.me={cv:null,writing:[],letters:[],voice:true};
  if(!Array.isArray(s.me.writing))s.me.writing=[];if(!Array.isArray(s.me.letters))s.me.letters=[];
  if(!s.posts||typeof s.posts!=="object")s.posts={job:null,programme:null};
  if(!s.sets||typeof s.sets!=="object")s.sets={};
  if(!s.ui||typeof s.ui!=="object")s.ui={};
  return s;}
var saveT=0;function saveSoon(){clearTimeout(saveT);saveT=setTimeout(function(){try{saveState();}catch(e){}},400);}
function kept(k){try{var m=libState().apps[k];return m&&m.ref?m:null;}catch(e){return null;}}
function appRuns(k){return lxState().runs.filter(function(r){return r.kind==="app"&&appOf(r)===k;});}
function runFor(k,depth){var rs=appRuns(k),meta=kept(k);
  function deep(r){return depth!=="thorough"||r.depth==="thorough";}
  function same(r){return meta&&r.sha&&r.sha===meta.sha256?1:0;}
  var done=rs.filter(function(r){return r.status==="done"&&deep(r);}).sort(function(a,b){return (same(b)-same(a))||((b.finished||b.updated||0)-(a.finished||a.updated||0));});
  if(done.length)return done[0];
  var open=rs.filter(function(r){return r.status!=="done"&&r.depth===(depth||"overview")&&(!r.sha||!meta||r.sha===meta.sha256);});
  return open[0]||null;}
function setKey(apps,purpose){var p=purpose||"portfolio",post=p!=="portfolio"&&L7().posts[p]?L7().posts[p].id:"";return sorted(apps).join("+")+"|"+p+(post?"|"+post:"");}
function job(){return L7().job||null;}
var R7={running:false,parts:{},notes:{},seen:{},src:{},nl:{},ev:[],pin:null,follow:true,panel:null,live:null,doc:null,step:"",prepNote:"",docMd:{},chk:{},w:0,built:false};
function stopErr(){var e=new Error("paused");e.stopped=true;return e;}

/* ---------------- the model: Ingenium's choice for this device ---------------- */
function readyModels(){return (state.models||[]).filter(function(m){return m.fileState==="ready";});}
function modelById(id){return id?(state.models||[]).filter(function(m){return m.id===id;})[0]||null:null;}
function modelPlan(){var o={link:false,key:null,spec:null,rec:null,chosen:null,need:null,spare:null,dev:"web"};
  try{o.link=supUsesLink();}catch(e){}
  try{o.dev=lineupDevice();o.key=lineupKeyFor("magister");o.spec=o.key&&ING_LINEUP.models[o.key]||null;o.rec=o.key?lineupRec(o.key):null;o.spare=lineupUsableGB();}catch(e){}
  var b=L7().brief,c=null;
  if(b.modelId){c=modelById(b.modelId);if(c&&c.fileState!=="ready")c=null;}
  if(!c)c=o.rec;
  if(!c){try{var rid=recommendedId();c=modelById(rid);}catch(e){}if(c&&c.fileState!=="ready")c=null;}
  if(!c){var a=supModel();if(a&&a.fileState==="ready")c=a;}
  if(!c)c=readyModels()[0]||null;
  o.chosen=c;
  try{if(c===o.rec&&o.spec)o.need=lineupNeedGB(o.spec);else if(c)o.need=fitVerdict(c).need;else if(o.spec)o.need=lineupNeedGB(o.spec);}catch(e){}
  return o;}
function devName(d){return {"mac-arm":"this Mac","desktop":"this computer","android":"this tablet","ios":"this iPhone or iPad"}[d]||"this device";}
function partsOf(k,depth,m){var p=R7.prep[k];if(!p||!p.P)return null;try{return lxPartsFor(p.P,depth,m).length;}catch(e){return null;}}
R7.prep={};
/* her apps measured once each, in the background, so the brief can say how many parts a reading takes */
var prepQ=Promise.resolve();
function prepare(k){var meta=kept(k);if(!meta)return;var p=R7.prep[k];if(p&&p.sha===meta.sha256)return;R7.prep[k]={sha:meta.sha256,P:null};
  prepQ=prepQ.then(function(){if(LX.busy||R7.running)return;return libText(k).then(function(text){if(!text)return;
      return lxPrepare(meta.name||(nm(k)+".html"),text,function(){}).then(function(P){R7.prep[k]={sha:meta.sha256,P:P};paintModel();});});}).catch(function(){});}

/* ---------------- the seals on the page: each app's own layers, swaying (never on the paper) ---------------- */
function night(){return document.body.getAttribute("data-theme")==="night";}
function flatSrc(k){var s=ING_SEALS&&ING_SEALS[k];return s?"data:image/png;base64,"+s.b64:"";}
function masterSrc(n){if(n&&LX7_MASTER&&LX7_MASTER.night)return LX7_MASTER.night;return flatSrc("master");}
function sealEl(k){var L=LX7_LAYERS||{},key=night()&&L[k+"N"]?k+"N":k,ls=L[key];
  if(!ls){var im=new Image();im.src=flatSrc(k);im.alt="";im.width=56;im.height=56;return im;}
  var root=document.createElement("span");root.className="ls";root.setAttribute("aria-hidden","true");
  var tilt=document.createElement("span");tilt.className="ls-tilt";var idle=document.createElement("span");idle.className="ls-idle";
  idle.style.animationDelay=(-({cd:0,forge:1.7,ingenium:3.4,inkwell:5.1}[k]||0))+"s";
  var cast=document.createElement("i");cast.className="ls-cast";idle.appendChild(cast);
  ls.forEach(function(L1){var im=new Image();im.src=L1.src;im.alt="";im.className="ls-l"+(L1.side?" side":"");im.style.setProperty("--z",String(L1.z));idle.appendChild(im);});
  tilt.appendChild(idle);root.appendChild(tilt);return root;}

/* ---------------- the frame of the page ---------------- */
function h(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function btn(cls,label,on){var b=h("button","l-btn"+(cls?" "+cls:""));b.type="button";b.textContent=label;if(on)b.onclick=on;return b;}
function build(){var host=$("lxHost");if(!host)return null;var pg=$("page-lector");if(pg)pg.classList.add("lx7-page");
  if($("lx7")&&$("lx7").parentNode===host)return $("lx7");
  host.innerHTML='<div id="lx7">'+
   '<div class="l-head"><div><h1>Lector</h1><p>Reads your apps part by part, thinks out loud as it goes, and writes the documents you need from them. Everything stays on this device.</p></div>'+
   '<ol class="l-steps" id="l7Steps" aria-label="Where Lector is"><li data-s="choose"><i>1</i><span>Choose</span></li><li class="sep" aria-hidden="true"></li><li data-s="read"><i>2</i><span>Read</span></li><li class="sep" aria-hidden="true"></li><li data-s="write"><i>3</i><span>Write</span></li><li class="sep" aria-hidden="true"></li><li data-s="done"><i>4</i><span>Save</span></li></ol></div>'+
   '<div class="l-tabs" id="l7Tabs" role="tablist" aria-label="Lector\'s panels"><span class="l-thumb"></span><button type="button" role="tab" data-p="brief">The brief</button><button type="button" role="tab" data-p="read">Thinking <span class="d" id="l7TabLive" hidden></span></button><button type="button" role="tab" data-p="doc">The document</button></div>'+
   '<div class="l-panels" id="l7Panels">'+
    '<section class="l-pn" id="l7Brief" aria-label="The brief"><div class="l-pn-h"><h2>The brief</h2><span class="l-chip" id="l7BriefChip">Ready</span></div><div class="l-pn-b"><div class="l-bf" id="l7Bf"></div></div><div class="l-pn-f" id="l7BriefF"></div></section>'+
    '<div class="l-gut" id="l7G1" role="separator" aria-orientation="vertical" tabindex="0" title="Drag to make the brief wider or narrower · press twice to put it back"><i></i></div>'+
    '<section class="l-pn" id="l7Read" aria-label="Thinking"><div class="l-pn-h"><h2>Thinking</h2><span class="l-chip" id="l7ReadChip">Waiting</span></div>'+
     '<div class="l-rd" id="l7Rd"><div class="l-now" id="l7Now"><div class="l-now-h" id="l7NowH"></div><pre class="l-code" id="l7Code" aria-label="The part Lector is reading"></pre></div>'+
     '<div class="l-vg" id="l7Vg" role="separator" aria-orientation="horizontal" tabindex="0" title="Drag to make the code window taller or shorter · press twice to put it back"><i></i></div>'+
     '<div class="l-stream" id="l7Stream" aria-live="polite"></div></div>'+
     '<div class="l-pn-f"><div class="l-prog"><div class="lbl"><b id="l7ProgA"></b><span id="l7ProgB"></span></div><div class="l-bar" id="l7Bar"><i id="l7BarI"></i></div></div><span id="l7ReadKey"></span></div></section>'+
    '<div class="l-gut" id="l7G2" role="separator" aria-orientation="vertical" tabindex="0" title="Drag to share the room between the thinking and the document · press twice to put it back"><i></i></div>'+
    '<section class="l-pn" id="l7Doc" aria-label="The document"><div class="l-pn-h"><h2>The document</h2><span class="l-chip" id="l7DocChip"></span></div>'+
     '<div class="l-dtabs" id="l7Dtabs" role="tablist" aria-label="Documents"></div><div class="l-outline" id="l7Outline" aria-label="Sections"></div><div class="l-desk" id="l7Desk"></div>'+
     '<div class="l-pn-f"><div class="l-fmt"><span>Save as</span><div class="l-seg" id="l7Fmt"><span class="l-thumb"></span><button type="button" data-v="docx">Word</button><button type="button" data-v="pdf">PDF</button><button type="button" data-v="html">Web page</button><button type="button" data-v="md">Markdown</button></div></div>'+
     '<span style="margin-left:auto;display:flex;gap:6px;align-items:center"><button type="button" class="l-btn quiet" id="l7Copy">Copy</button><button type="button" class="l-btn pri" id="l7Save">Save</button></span></div></section>'+
   '</div></div>';
  wireFrame();return $("lx7");}

/* ---------------- painting ---------------- */
function render(){var root=build();if(!root)return;L7();paintBrief();paintSteps();paintMain();paintProgress();paintTabs();paintDoc();if(!R7.built){R7.built=true;paintStream();showSomething();}
  layoutSoon();}
function paintAll(){if(!$("lx7"))return;paintBrief();paintSteps();paintMain();paintProgress();paintTabs();paintDoc();}

/* the brief */
function sec(title){var s=h("div","l-sec");s.appendChild(h("h3",null,esc(title)));return s;}
function paintBrief(){var box=$("l7Bf");if(!box)return;var S=L7(),B=S.brief,busy=R7.running||LX.busy;
  var keepOpen={};[].forEach.call(box.querySelectorAll("details[open]"),function(d){keepOpen[d.getAttribute("data-k")]=1;});
  var scroll=box.parentNode.scrollTop;box.innerHTML="";
  if(!B.apps.length){var first=ORDER.filter(kept)[0];if(first){B.apps=[first];saveSoon();}}
  /* your apps */
  var s1=sec("Your apps"),grid=h("div","l-apps");
  ORDER.forEach(function(k){var on=B.apps.indexOf(k)>=0,meta=kept(k),run=runFor(k,B.depth);
    var b=h("button","l-app"+(meta?"":" none"));b.type="button";b.style.setProperty("--app",APPS[k].color);b.setAttribute("aria-pressed",on?"true":"false");b.setAttribute("data-k",k);
    b.appendChild(sealEl(k));b.appendChild(h("span","nm",esc(nm(k))));
    var st=!meta?"Not added yet":run&&run.status==="done"?"Read "+lxDate(run.finished||run.updated):run?"Read in part: "+(run.done||0)+" of "+(run.total||0):"Not read yet";
    b.appendChild(h("span","st",esc(st+(meta&&meta.version?" · "+meta.version:""))));
    b.onclick=function(){if(busy){ingToast("Lector is at work on a set. Pause it to change the brief.");return;}
      if(!kept(k)){ingToast(nm(k)+" is not on this device yet. Add your apps first.");return;}
      var i=B.apps.indexOf(k);if(i>=0){if(B.apps.length>1)B.apps.splice(i,1);}else B.apps.push(k);B.apps=sorted(B.apps);saveSoon();prepare(k);paintBrief();paintModel();paintTabs();paintDoc();paintMain();};
    grid.appendChild(b);});
  s1.appendChild(grid);
  var sn=h("div","l-setname");if(B.apps.length===4&&ING_SEALS.master){var mi=new Image();mi.src=masterSrc(night());mi.alt="";sn.appendChild(mi);}
  sn.appendChild(h("b",null,esc(setName(B.apps)||"Choose at least one app")));if(B.apps.length)sn.appendChild(h("span",null,"· "+esc(setKind(B.apps))));
  if(B.apps.length<4&&ORDER.filter(kept).length===4&&!busy)sn.appendChild(btn("quiet","Choose all four",function(){B.apps=ORDER.slice();saveSoon();ORDER.forEach(prepare);paintBrief();paintModel();paintTabs();paintDoc();}));
  s1.appendChild(sn);
  var row=h("div","l-keys");row.appendChild(btn("sm"+(ORDER.filter(kept).length?"":" pri"),"＋ Add your apps",function(){try{libPickFiles();}catch(e){}}));
  if(!kept("ingenium")&&location.protocol!=="file:")row.appendChild(btn("quiet","Keep this copy of Ingenium",function(){try{libKeepSelf();}catch(e){}}));
  s1.appendChild(row);
  var ln=h("p","l-libnote"+(LIB&&LIB.warn?" warn":""));ln.id="libNote";ln.setAttribute("aria-live","polite");ln.textContent=(LIB&&(LIB.busy||LIB.note))||"";ln.hidden=!(LIB&&(LIB.busy||LIB.note));s1.appendChild(ln);
  if(!ORDER.filter(kept).length)s1.appendChild(h("p","l-hint","Add your apps from the files you already have: each app's own page (.html), or the zip you install it from. Each is checked and kept on this device; nothing is sent anywhere."));
  box.appendChild(s1);
  /* what it is for */
  var s2=sec("What it is for"),pseg=h("div","l-seg");pseg.innerHTML='<span class="l-thumb"></span>';
  [["portfolio","My portfolio"],["job","A job"],["programme","A programme"]].forEach(function(p){var b=h("button");b.type="button";b.textContent=p[1];b.setAttribute("data-v",p[0]);b.setAttribute("aria-pressed",B.purpose===p[0]?"true":"false");
    b.onclick=function(){if(busy)return;B.purpose=p[0];saveSoon();paintBrief();paintDoc();paintTabs();};pseg.appendChild(b);});
  s2.appendChild(pseg);s2.appendChild(postCard(B.purpose));box.appendChild(s2);
  /* documents */
  var s3=sec("Documents"),dl=h("div","l-docs");
  KINDS.forEach(function(d){var row=h("label","l-doc"),c=document.createElement("input");c.type="checkbox";c.checked=!!B.docs[d[0]];c.disabled=busy;
    c.onchange=function(){B.docs[d[0]]=c.checked;saveSoon();paintTabs();paintDoc();paintModel();};row.appendChild(c);
    var t=h("span","t");t.textContent=docLabel(d[0],B.apps,B.purpose);t.appendChild(h("small",null,esc(d[0]==="cover"&&B.purpose==="portfolio"?"A letter of introduction, for any reader":d[2])));row.appendChild(t);
    row.appendChild(sealMark(d[0],B.apps));dl.appendChild(row);});
  s3.appendChild(dl);s3.appendChild(h("p","l-hint",B.apps.length===4?"The master seal goes on the master dossier, the master appendix and the portfolio piece. Your CV and cover letters stay plain.":"Seals go on dossiers, appendices and portfolio pieces. Your CV and cover letters stay plain."));
  box.appendChild(s3);
  /* facts and voice */
  box.appendChild(meCard());
  /* who reads and writes */
  var s5=sec("Who reads and writes"),mc=h("div","l-model");mc.id="l7Model";s5.appendChild(mc);box.appendChild(s5);paintModel();
  /* the readings kept */
  var runs=lxState().runs;if(runs.length){var d=h("details","l-more");d.setAttribute("data-k","runs");if(keepOpen.runs)d.open=true;
    d.appendChild(h("summary",null,"Readings kept ("+runs.length+")"));var sh=h("div","l-shelf");
    runs.forEach(function(r){var row=h("div","r");row.appendChild(h("span",null,esc(r.name+" · "+(r.depth==="thorough"?"every line":"overview")+" · "+lxStatusWord(r)+" · "+(r.done||0)+" of "+(r.total||0)+" parts · "+lxDate(r.created))));
      var del=btn("quiet","Delete",null);del.onclick=function(){if(R7.running||LX.busy){ingToast("Pause Lector before you delete a reading.");return;}
        if(del.dataset.armed!=="1"){del.dataset.armed="1";del.textContent="Delete? Press again";setTimeout(function(){if(del.isConnected){del.dataset.armed="";del.textContent="Delete";}},5000);return;}
        lxDelete(r.id);};row.appendChild(del);sh.appendChild(row);});
    d.appendChild(sh);var s6=h("div","l-sec");s6.appendChild(d);box.appendChild(s6);}
  var s7=h("div","l-sec");var od=h("details","l-more");od.setAttribute("data-k","doc");if(keepOpen.doc||(typeof LX_PICK!=="undefined"&&LX_PICK))od.open=true;od.appendChild(h("summary",null,"Or read a long document"));
  od.appendChild(h("p","l-hint","A thesis, an article or a report: Word, PDF or text. Lector reads all of it and writes its notes and analysis."));
  var dk=h("div","l-keys");dk.appendChild(btn("sm","Choose a document",function(){var i=document.createElement("input");i.type="file";i.accept=".docx,.pdf,.txt,.md,.html,.htm";i.onchange=function(){if(i.files&&i.files[0])lxPick(i.files[0]);};i.click();}));od.appendChild(dk);
  if(typeof LX_PICK!=="undefined"&&LX_PICK){var pk=h("div","l-card");pk.appendChild(h("b",null,esc(LX_PICK.name)));
    if(LX_PICK.state==="ready"){var n0=0;try{n0=lxPartsFor(LX_PICK.P,"overview",modelPlan().chosen).length;}catch(e){}pk.appendChild(h("span","org",esc(n0+" parts at this model's memory")));
      var kk=h("div","l-keys");kk.appendChild(btn("sm pri","Read it",beginDoc));kk.appendChild(btn("quiet","Choose another",function(){LX_PICK=null;paintBrief();}));pk.appendChild(kk);}
    else if(LX_PICK.state==="error")pk.appendChild(h("span","org",esc("It could not be opened: "+LX_PICK.err)));
    else pk.appendChild(h("span","org",esc(LX_PICK.note||"Opening…")));
    od.appendChild(pk);}
  s7.appendChild(od);box.appendChild(s7);
  box.parentNode.scrollTop=scroll;segThumbs(box);}
function sealMark(kind,apps){var m=h("span","l-mark");if(!sealed(kind)){m.className="l-mark none";m.textContent="No seal";return m;}
  if(sorted(apps).length===4&&ING_SEALS.master){var i=new Image();i.src=flatSrc("master");i.className="ms";i.alt="";i.title="The master seal";m.appendChild(i);return m;}
  sorted(apps).forEach(function(k){var i=new Image();i.src=flatSrc(k);i.alt="";i.title=nm(k)+"'s seal";m.appendChild(i);});return m;}

/* the posting or the programme */
function postCard(p){var wrap=h("div");if(p==="portfolio"){wrap.appendChild(h("p","l-hint","For your professional catalogue: written for any reader, with no posting in mind."));return wrap;}
  var P=L7().posts[p],what=p==="job"?"the posting":"the programme's call";
  if(P){var c=h("div","l-card");c.appendChild(h("b",null,esc(P.title||P.name)));if(P.org)c.appendChild(h("span","org",esc(P.org)));
    if(P.asks&&P.asks.length){var as=h("div","l-asks");P.asks.forEach(function(t){as.appendChild(h("span","l-ask",esc(t)));});c.appendChild(as);}
    var r=h("div","l-row");r.appendChild(h("span",null,esc(P.closes||(fmtBytes(P.chars||0)+" of text, kept on this device"))));var ks=h("span");
    ks.appendChild(btn("quiet","Change",function(){pickPost(p);}));ks.appendChild(btn("quiet","Remove",function(){IngBig.del(P.ref);L7().posts[p]=null;saveSoon();paintBrief();}));r.appendChild(ks);c.appendChild(r);wrap.appendChild(c);return wrap;}
  var c2=h("div","l-card");c2.appendChild(h("b",null,p==="job"?"Add the posting":"Add the programme's call"));
  c2.appendChild(h("span","org",esc("Lector draws out what they ask for and fits every document to it. A file (Word, PDF, text or a saved web page), or the text pasted in.")));
  var ks2=h("div","l-keys");ks2.appendChild(btn("sm","Choose a file",function(){pickPost(p);}));
  var ta=null;ks2.appendChild(btn("sm","Paste the text",function(){if(ta){ta.focus();return;}ta=document.createElement("textarea");ta.className="l-paste";ta.placeholder="Paste "+what+" here";c2.appendChild(ta);
    var kp=h("div","l-keys");kp.appendChild(btn("sm pri","Keep it",function(){keepPost(p,ta.value,"Pasted text");}));c2.appendChild(kp);ta.focus();}));
  c2.appendChild(ks2);wrap.appendChild(c2);return wrap;}
function pickPost(p){var i=document.createElement("input");i.type="file";i.accept=".docx,.pdf,.txt,.md,.html,.htm,.rtf";
  i.onchange=function(){var f=i.files&&i.files[0];if(!f)return;readAsText(f).then(function(t){if(/\.html?$/i.test(f.name))t=lxUnTag(t);keepPost(p,t,f.name);},function(e){ingToast("It could not be read: "+(e&&e.message||e));});};i.click();}
function keepPost(p,text,name){text=String(text||"").replace(/\r/g,"").trim();if(text.length<40){ingToast("That is too short to be "+(p==="job"?"a posting":"a programme's call")+".");return;}
  var meta=parsePost(text),ref=IngBig.newId(),old=L7().posts[p];
  IngBig.put(ref,text).then(function(){if(old&&old.ref)IngBig.del(old.ref);L7().posts[p]=Object.assign({id:"p"+Date.now().toString(36),ref:ref,name:name,chars:text.length,at:Date.now()},meta);saveState();paintBrief();});}
function parsePost(text){var L=text.split("\n").map(function(s){return s.trim();}).filter(Boolean);
  var title=(L[0]||"").replace(/^#+\s*/,"").slice(0,90),org=(L[1]&&L[1].length<110?L[1]:"").replace(/^#+\s*/,"").slice(0,90);
  var asks=L.filter(function(s){return /^([-•*·▪●◦–]|\d+[.)])\s+/.test(s);}).map(function(s){return s.replace(/^([-•*·▪●◦–]|\d+[.)])\s+/,"");}).filter(function(s){return s.length>8;})
    .slice(0,6).map(function(s){return s.length>64?s.slice(0,61).replace(/\s+\S*$/,"")+"…":s;});
  var closes=(L.filter(function(s){return /(clos(es|ing)|deadline|apply by|applications? (are )?due)/i.test(s)&&s.length<120;})[0]||"").slice(0,80);
  return {title:title,org:org,asks:asks,closes:closes};}

/* her facts and her voice */
function meCard(){var s=sec("Your facts and your voice"),M=L7().me,f=h("div","l-facts");
  function row(ic,title,sub,acts){var r=h("div","l-fact");r.appendChild(h("span","ic",ic));var t=h("div","tx");t.appendChild(h("span",null,esc(title)));t.appendChild(h("small",null,esc(sub)));
    if(acts){var a=h("div","acts");acts.forEach(function(x){a.appendChild(x);});t.appendChild(a);}r.appendChild(t);return r;}
  f.appendChild(row("✓","Your CV",M.cv?M.cv.name+" · "+fmtBytes(M.cv.chars||0)+" of text, the one source of facts about you":"Your names, dates and posts come from it; nothing about you is invented",
    [btn("quiet",M.cv?"Replace":"Add your CV",function(){addMe("cv");})].concat(M.cv?[btn("quiet","Remove",function(){IngBig.del(M.cv.ref);M.cv=null;saveSoon();paintBrief();})]:[])));
  f.appendChild(row("¶","Your own writing",M.writing.length?M.writing.length+" piece"+(M.writing.length>1?"s":"")+" of your prose, so it writes as you do":"A few pieces of your prose: essays, statements, articles",
    [btn("quiet","Add",function(){addMe("writing");})].concat(M.writing.length?[btn("quiet","Remove all",function(){M.writing.forEach(function(x){IngBig.del(x.ref);});M.writing=[];saveSoon();paintBrief();})]:[])));
  f.appendChild(row("✉","Your past cover letters",M.letters.length?M.letters.length+" letter"+(M.letters.length>1?"s":"")+", for their shape and tone":"Letters you have written before, as templates",
    [btn("quiet","Add",function(){addMe("letters");})].concat(M.letters.length?[btn("quiet","Remove all",function(){M.letters.forEach(function(x){IngBig.del(x.ref);});M.letters=[];saveSoon();paintBrief();})]:[])));
  var sw=h("label","l-sw");var c=document.createElement("input");c.type="checkbox";c.checked=M.voice!==false;c.onchange=function(){M.voice=c.checked;saveSoon();};sw.appendChild(c);sw.appendChild(document.createTextNode("Write in my own voice"));f.appendChild(sw);
  s.appendChild(f);s.appendChild(h("p","l-hint","Kept on this device. Lector never invents a fact about you: anything it cannot find in your CV is left in square brackets for you to fill."));return s;}
function addMe(which){var i=document.createElement("input");i.type="file";i.accept=".docx,.pdf,.txt,.md";i.multiple=which!=="cv";
  i.onchange=function(){var fs=[].slice.call(i.files||[]);if(!fs.length)return;var M=L7().me;
    Promise.all(fs.map(function(f){return readAsText(f).then(function(t){t=String(t||"").trim();if(!t)return null;var ref=IngBig.newId();return IngBig.put(ref,t).then(function(){return {ref:ref,name:f.name,chars:t.length,at:Date.now()};});},function(){ingToast(f.name+" could not be read.");return null;});}))
    .then(function(items){items=items.filter(Boolean);if(!items.length)return;if(which==="cv"){if(M.cv&&M.cv.ref)IngBig.del(M.cv.ref);M.cv=items[0];}else M[which]=M[which].concat(items).slice(-8);saveState();paintBrief();});};i.click();}

/* the model */
function paintModel(){var box=$("l7Model");if(!box)return;var o=modelPlan(),B=L7().brief;box.innerHTML="";
  if(o.link){box.appendChild(h("b",null,esc("Your other computer reads and writes")));box.appendChild(h("div","need",esc("Lector uses "+(state.cloud&&state.cloud.model||"its model")+" on "+(state.cloud&&state.cloud.computer||"the computer you linked")+", the stronger model, and this device only watches.")));}
  else{var c=o.chosen,isRec=c&&o.rec&&c.id===o.rec.id,name=c?c.customName:(o.spec?o.spec.name:"Magister");
    box.appendChild(h("b",null,esc((isRec?"Ingenium's choice: Magister · ":"Reading and writing: ")+name)));
    var tot=0,known=true;B.apps.forEach(function(k){var r=runFor(k,B.depth);if(r&&r.status==="done")return;var n=partsOf(k,B.depth,c);if(n==null)known=false;else tot+=n;});
    var docs=KINDS.filter(function(d){return B.docs[d[0]];}).length,line=[];
    if(o.need&&o.spare)line.push("Needs about "+o.need.toFixed(1)+" GB of the "+o.spare.toFixed(1)+" GB "+devName(o.dev)+" can spare.");
    line.push(known?(tot?"Reading "+tot+" parts":"Nothing left to read")+" and writing "+docs+" document"+(docs===1?"":"s")+".":"Measuring your apps…");
    var est=estimate(c,tot,docs);if(est)line.push(est);
    box.appendChild(h("div","need",esc(line.join(" "))));
    if(o.need&&o.spare){var m=h("div","l-meter"),i=document.createElement("i");var f=Math.min(1,o.need/o.spare);i.style.width=Math.round(f*100)+"%";if(f>.85)i.className="tight";m.appendChild(i);box.appendChild(m);}
    if(!c&&o.spec){var gk=h("div","l-keys");gk.appendChild(btn("sm pri","Get "+o.spec.name+" ("+fmtBytes(o.spec.size)+")",function(){try{lineupInstall(o.key).then(function(){paintModel();},function(e){ingToast("It could not be fetched: "+(e&&e.message||e));});ingToast("Fetching "+o.spec.name+". Lector is ready to start when it arrives.");}catch(e){go("models");}}));box.appendChild(gk);}
    else if(o.spec&&!isRec&&!B.modelId){box.appendChild(h("div","need",esc("Ingenium's choice for Lector here is "+o.spec.name+" (Magister, the strongest this device can hold). Get it on the Models page; until then Lector uses "+name+".")));}
    var det=document.createElement("details");det.appendChild(h("summary",null,"Why this model, and other choices"));
    det.appendChild(h("div",null,esc(o.spec?(o.spec.why||"")+" Lector reads best with the strongest model "+devName(o.dev)+" holds; a smaller one reads faster.":"A larger model writes a better analysis; a smaller one reads faster.")));
    var sel=document.createElement("select");sel.setAttribute("aria-label","The model Lector uses");
    var o0=document.createElement("option");o0.value="";o0.textContent="Ingenium's choice"+(o.rec?" ("+o.rec.customName+")":"");sel.appendChild(o0);
    readyModels().forEach(function(m){var op=document.createElement("option");op.value=m.id;op.textContent=m.customName;if(B.modelId===m.id)op.selected=true;sel.appendChild(op);});
    sel.onchange=function(){B.modelId=sel.value||null;saveSoon();paintModel();};det.appendChild(sel);
    var ds=h("div","l-seg");ds.innerHTML='<span class="l-thumb"></span>';[["overview","Overview"],["thorough","Every line of its code"]].forEach(function(x){var b=h("button");b.type="button";b.textContent=x[1];b.setAttribute("data-v",x[0]);b.setAttribute("aria-pressed",B.depth===x[0]?"true":"false");
      b.onclick=function(){if(R7.running)return;B.depth=x[0];saveSoon();paintModel();paintBrief();};ds.appendChild(b);});det.appendChild(ds);
    det.appendChild(h("div","need","Overview: its screens, its words, the notes in its code and how it is built. Every line: all of that and every line of its own code, for the deepest documents; this can take hours on a small model."));
    box.appendChild(det);segThumbs(box);}}
function estimate(m,parts,docs){if(!m)return "";var avg=null;if(LX.times&&LX.times.length)avg=LX.times.reduce(function(a,b){return a+b;},0)/LX.times.length;
  if(avg==null){try{var p=paceEstimate(m);if(p&&p.lo>0){var tps=(p.lo+p.hi)/2,ctx=lxCtx(m),inTok=lxBudget(ctx,700,false)/3.2;avg=700/tps+inTok/(tps*8);}}catch(e){}}
  if(avg==null)return "The time appears after the first part.";
  var secs=parts*avg+docs*10*avg*1.3;return "About "+lxDur(secs)+(LX.times&&LX.times.length?".":", as a rough guide until the first part is read.");}

/* the steps and the main key */
function phase(){var j=job();if(!j)return "choose";if(j.status==="done")return "done";if(j.status==="writing")return "write";return "read";}
function paintSteps(){var order=["choose","read","write","done"],ix=order.indexOf(phase()),box=$("l7Steps");if(!box)return;
  [].forEach.call(box.querySelectorAll("li[data-s]"),function(li){var j=order.indexOf(li.getAttribute("data-s")),cls=j<ix?"done":j===ix?"now":"";if(li.className!==cls)li.className=cls;li.querySelector("i").textContent=j<ix?"✓":String(j+1);});}
function paintMain(){var f=$("l7BriefF"),chip=$("l7BriefChip");if(!f)return;f.innerHTML="";var j=job(),B=L7().brief;
  if(R7.running){f.appendChild(btn("wide","Pause",function(){LX.stop=true;try{lxPause();}catch(e){}try{if(LX.inFlight)Engine.abort();}catch(e){}R7.step="Pausing after this moment…";paintProgress();}));chip.textContent="In use";chip.className="l-chip live";}
  else if(j&&(j.status==="paused"||j.status==="error"||j.status==="reading"||j.status==="writing")){f.appendChild(btn("pri wide next","Go on",r7Run));f.appendChild(btn("quiet","Start again",function(){L7().job=null;saveState();paintAll();}));chip.textContent=j.status==="error"?"Stopped":"Paused";chip.className="l-chip";}
  else if(j&&j.status==="done"){f.appendChild(btn("wide","Start a new set",function(){L7().job=null;saveState();R7.ev=[];paintStream();paintAll();setPanel("brief");}));chip.textContent="Used for this set";chip.className="l-chip ok";}
  else{var allRead=B.apps.length&&B.apps.every(function(k){var r=runFor(k,B.depth);return r&&r.status==="done";});
    f.appendChild(btn("pri wide next",allRead?"Write the documents":"Start reading",r7Go));chip.textContent="Ready";chip.className="l-chip";}}

/* progress */
function paintProgress(){var a=$("l7ProgA"),b=$("l7ProgB"),bar=$("l7Bar"),bi=$("l7BarI"),rc=$("l7ReadChip"),key=$("l7ReadKey");if(!a)return;var j=job();
  if(!j){a.textContent="Not started";var B=L7().brief;b.textContent=B.apps.length?setName(B.apps):"";bi.style.width="0%";bar.classList.remove("live");rc.className="l-chip";rc.textContent="Waiting";if($("l7TabLive"))$("l7TabLive").hidden=true;key.innerHTML="";return;}
  var running=R7.running,frac=0,lab="",sub="";
  if(j.status==="done"){lab="Finished · "+j.kinds.length+" document"+(j.kinds.length===1?"":"s")+" ready";sub="checked against the measures";frac=1;}
  else if(phase()==="write"){var done=j.kinds.filter(function(k){return j.made[k];}).length,live=R7.live,secFrac=live&&live.of?(live.i||0)/live.of:0;
    frac=(done+secFrac)/Math.max(1,j.kinds.length);lab=R7.step||("Writing · "+done+" of "+j.kinds.length+" documents");sub=done+" of "+j.kinds.length+" documents";}
  else{var tot=0,dn=0;(j.apps||[]).forEach(function(k){var r=runFor(k,j.depth);if(r){tot+=r.total||0;dn+=r.status==="done"?(r.total||0):(r.done||0);}});
    if(j.doc){var dr=lxRun(j.doc);if(dr){tot=dr.total||0;dn=dr.status==="done"?tot:(dr.done||0);}}
    frac=tot?dn/tot*.85:0;lab=R7.step||R7.prepNote||(running?"Reading…":"Paused");var run=LX.runId?lxRun(LX.runId):null;sub=running&&run&&run.status==="reading"?lxEta(run).replace(/^About /,"about "):(dn+" of "+tot+" parts read");}
  if(!running&&j.status!=="done"){lab=j.status==="error"?"Stopped: "+(j.err||"an error"):"Paused · "+(phase()==="write"?"writing":"reading");}
  a.textContent=lab;b.textContent=sub;bi.style.width=(Math.max(0,Math.min(1,frac))*100).toFixed(1)+"%";bar.classList.toggle("live",running);
  rc.className="l-chip"+(running?" live":j.status==="done"?" ok":"");rc.innerHTML=running?'<span class="pulse"></span>'+(phase()==="write"?"Writing":"Reading"):j.status==="done"?"✓ Done":"Paused";
  if($("l7TabLive"))$("l7TabLive").hidden=!running;
  key.innerHTML="";if(running)key.appendChild(btn("","Pause",function(){LX.stop=true;try{lxPause();}catch(e){}try{if(LX.inFlight)Engine.abort();}catch(e){}}));
  else if(j.status!=="done")key.appendChild(btn("pri","Go on",r7Run));}

/* ---------------- the thinking: the code being read, and Lector's notes as it goes ---------------- */
var KW=/\b(var|let|const|function|return|if|else|for|while|try|catch|new|this|true|false|null|async|await|of|in|typeof|class|import|export)\b/g;
function hl(line){var out="",i=0,re=/(\/\*.*?\*\/|\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(\d+(?:\.\d+)?)\b/g,m;
  while((m=re.exec(line))){out+=esc(line.slice(i,m.index)).replace(KW,'<span class="kw">$1</span>');
    if(m[1])out+='<span class="cm">'+esc(m[1])+'</span>';else if(m[2])out+='<span class="st">'+esc(m[2])+'</span>';else out+='<span class="nu">'+m[3]+'</span>';i=re.lastIndex;}
  return out+esc(line.slice(i)).replace(KW,'<span class="kw">$1</span>');}
function getParts(run){if(R7.parts[run.id])return Promise.resolve(R7.parts[run.id]);return lxJSON(run.partsRef,[]).then(function(p){R7.parts[run.id]=p;return p;});}
/* where a part's lines stand in the app's own file, by their own line numbers */
function srcOf(run){var k=appOf(run),meta=k&&kept(k);if(!k||!meta)return Promise.resolve(null);if(run.sha&&meta.sha256&&run.sha!==meta.sha256)return Promise.resolve(null);
  if(R7.src[k])return Promise.resolve(R7.src[k]);
  return libText(k).then(function(t){if(!t)return null;var nl=[],i=-1;while((i=t.indexOf("\n",i+1))>=0)nl.push(i);R7.src={};R7.src[k]={text:t,nl:nl};return R7.src[k];},function(){return null;});}
function lineAt(src,pos){var a=0,b=src.nl.length;while(a<b){var mid=(a+b)>>1;if(src.nl[mid]<pos)a=mid+1;else b=mid;}return a+1;}
function lineNums(src,lines){var out=[],last=0,global=0;
  for(var i=0;i<lines.length;i++){var s=lines[i].trim();if(s.length<6){out.push(null);continue;}var probe=s.length>120?s.slice(0,120):s;
    var p=src.text.indexOf(probe,last);if(p<0&&global<60){global++;p=src.text.indexOf(probe);}
    if(p>=0){out.push(lineAt(src,p));last=p+probe.length;}else out.push(null);}
  return out;}
function showPart(runId,i,how){var run=lxRun(runId);if(!run)return;R7.code={runId:runId,i:i,how:how};
  getParts(run).then(function(parts){var p=parts[i];if(!p||!R7.code||R7.code.runId!==runId||R7.code.i!==i)return;paintCode(run,p,i,parts.length,how,null);
    srcOf(run).then(function(src){if(!src||!R7.code||R7.code.runId!==runId||R7.code.i!==i)return;var lines=String(p.x||"").split("\n").slice(0,400);paintCode(run,p,i,parts.length,how,lineNums(src,lines));});});}
function paintCode(run,p,i,n,how,nums){var H=$("l7NowH"),code=$("l7Code");if(!H||!code)return;H.innerHTML="";
  H.appendChild(h("span",null,esc(how==="now"?"Now reading · ":"Looking back at · ")));H.appendChild(h("b",null,esc(run.name)));
  H.appendChild(h("span",null,esc(" · part "+(i+1)+" of "+n+" · "+(p.t||"")+(p.of>1?" ("+p.k+" of "+p.of+")":"")+(nums&&nums.filter(Boolean).length?" · line "+nums.filter(Boolean)[0].toLocaleString("en-GB")+" on":""))));
  if(how!=="now"&&R7.running)H.appendChild(btn("quiet","Back to now",function(){R7.pin=null;markPinned();showCurrentPart();}));
  var lines=String(p.x||"").split("\n"),more=lines.length>400;lines=lines.slice(0,400);var frag=document.createDocumentFragment();
  lines.forEach(function(l,ix){var d=h("div","ln"),num=nums&&nums[ix];d.appendChild(h("i",null,num?num.toLocaleString("en-GB"):"·"));var sp=document.createElement("span");
    var t=l.length>400?l.slice(0,400)+"…":l;sp.innerHTML=p.code?hl(t):esc(t);d.appendChild(sp);frag.appendChild(d);});
  code.innerHTML="";code.appendChild(frag);if(more)code.appendChild(h("div","empty","… and "+(String(p.x).split("\n").length-400).toLocaleString("en-GB")+" more lines in this part."));code.scrollTop=0;}
function showCurrentPart(){if(R7.pin!=null)return;var id=LX.runId;if(!id||!R7.notes[id])return;var i=R7.notes[id].findIndex(function(x){return !x;});if(i>=0)showPart(id,i,"now");}
function codeIdle(text){var H=$("l7NowH"),code=$("l7Code");if(!H)return;H.innerHTML="";H.appendChild(h("span",null,esc(text.head)));code.innerHTML='<div class="empty">'+esc(text.body)+'</div>';}

/* the stream of cards */
function addEv(ev){ev.id=(R7.evN=(R7.evN||0)+1);ev.at=Date.now();R7.ev.push(ev);if(R7.ev.length>120)R7.ev.shift();var st=$("l7Stream");if(!st)return;
  var e=st.querySelector(".l-empty");if(e)e.remove();var live=$("l7LiveCard");st.insertBefore(card(ev),live&&live.parentNode===st?live:st.querySelector(".l-jump"));
  var cards=st.querySelectorAll(".l-th:not(#l7LiveCard)");if(cards.length>120)cards[0].remove();if(R7.follow)st.scrollTop=st.scrollHeight;}
function card(ev){var c=h("div","l-th");c.tabIndex=0;c.setAttribute("role","button");c.setAttribute("data-ev",ev.id);
  var w=h("div","where"),tag={note:"Note kept",check:"Checked",step:"Lector",done:"Written",live:"Writing now"}[ev.k]||"Lector";
  w.appendChild(h("span","tag"+(ev.k==="note"?" note":ev.k==="check"?" check":ev.k==="live"?" live":""),tag));w.appendChild(h("span",null,esc((ev.app?nm(ev.app)+" · ":"")+(ev.label||""))));c.appendChild(w);
  var b=h("div","body");b.textContent=ev.text||"";c.appendChild(b);
  if(ev.runId!=null&&ev.part!=null)c.appendChild(h("div","see","Show the code it came from · part "+(ev.part+1)));
  c.onclick=function(){if(ev.runId!=null&&ev.part!=null){R7.pin=ev.id;markPinned();showPart(ev.runId,ev.part,"back");if(one())setPanel("read");}else c.classList.toggle("open");};
  c.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();c.onclick();}};
  if(R7.pin===ev.id)c.classList.add("on");return c;}
function markPinned(){[].forEach.call(document.querySelectorAll("#l7Stream .l-th"),function(c){c.classList.toggle("on",+c.getAttribute("data-ev")===R7.pin);});}
function paintStream(){var st=$("l7Stream");if(!st)return;st.innerHTML="";
  if(!R7.ev.length){var e=h("div","l-empty");var B=L7().brief;e.innerHTML="<b>Ready when you are</b>Lector will read "+esc(setName(B.apps)||"your apps")+", part by part. You can watch it here, and press any note to see the part of the app it came from.";st.appendChild(e);}
  R7.ev.forEach(function(ev){st.appendChild(card(ev));});paintLive();st.scrollTop=st.scrollHeight;}
var liveRaf=0;function paintLiveSoon(){if(liveRaf)return;liveRaf=(window.requestAnimationFrame||setTimeout)(function(){liveRaf=0;paintLive();});}
function paintLive(){var st=$("l7Stream");if(!st)return;var txt=LX.live||"",busy=R7.running&&(LX.busy||LX.writing);var c=$("l7LiveCard");
  if(!busy||!txt){if(c)c.remove();paintPaperLive();return;}
  if(!c){c=h("div","l-th");c.id="l7LiveCard";var w=h("div","where");w.appendChild(h("span","tag live","Writing now"));w.appendChild(h("span","lbl"));c.appendChild(w);var b=h("div","body");c.appendChild(b);c.classList.add("open");st.appendChild(c);}
  c.querySelector(".lbl").textContent=R7.step||"";var b2=c.querySelector(".body");b2.textContent=txt.length>3000?"…"+txt.slice(-3000):txt;var car=h("span","l-caret");b2.appendChild(car);
  if(R7.follow)st.scrollTop=st.scrollHeight;paintPaperLive();}
function watchFollow(){var st=$("l7Stream");if(!st||st.__w)return;st.__w=1;st.addEventListener("scroll",function(){var atEnd=st.scrollHeight-st.scrollTop-st.clientHeight<28;R7.follow=atEnd;
  var j=st.querySelector(".l-jump");if(!atEnd&&!j&&R7.running){j=btn("pri sm l-jump","↓ Back to now",function(){R7.follow=true;R7.pin=null;markPinned();showCurrentPart();st.scrollTop=st.scrollHeight;j.remove();});st.appendChild(j);}
  else if(atEnd&&j)j.remove();},{passive:true});}
function showSomething(){var j=job(),B=L7().brief;
  if(R7.running)return;
  var runs=(j?j.apps:B.apps).map(function(k){return runFor(k,(j||B).depth);}).filter(Boolean);
  if(j&&j.doc){var dr=lxRun(j.doc);if(dr)runs=[dr];}
  if(!runs.length){codeIdle({head:"The code Lector reads appears here",body:"As Lector reads, the part in front of it shows here, with the app's own line numbers. Press any note in the thinking to see the part it came from."});return;}
  /* after a restart: the last notes kept from these readings */
  Promise.all(runs.map(function(r){return Promise.all([getParts(r),lxJSON(r.notesRef,[])]).then(function(x){return {r:r,parts:x[0],notes:x[1]};});})).then(function(all){
    if(R7.ev.length||R7.running)return;all.forEach(function(o){var idx=[];o.notes.forEach(function(x,i){if(x)idx.push(i);});idx.slice(-6).forEach(function(i){
      R7.ev.push({id:(R7.evN=(R7.evN||0)+1),k:"note",app:appOf(o.r),label:"Part "+(i+1)+" of "+o.parts.length+(o.parts[i]?" · "+o.parts[i].t:""),text:o.notes[i],runId:o.r.id,part:i,at:0});});});
    paintStream();var last=all[all.length-1];if(last){var li=-1;last.notes.forEach(function(x,i){if(x)li=i;});if(li>=0)showPart(last.r.id,li,"back");}});}

/* ---------------- the document panel ---------------- */
function tabsList(){var j=job(),B=L7().brief,src=j&&!R7.editing?j:B;var t=["analysis"];
  if(j&&j.doc)return t;KINDS.forEach(function(d){if(j?j.kinds.indexOf(d[0])>=0:B.docs[d[0]])t.push(d[0]);});return t;}
function curKey(){var j=job();return j?j.key:setKey(L7().brief.apps,L7().brief.purpose);}
function curApps(){var j=job();return j?(j.apps||[]):L7().brief.apps;}
function curPurpose(){var j=job();return j?j.purpose:L7().brief.purpose;}
function stored(kind){var s=L7().sets[curKey()];return s&&s.docs&&s.docs[kind]||null;}
function paintTabs(){var box=$("l7Dtabs");if(!box)return;var tabs=tabsList();if(!R7.doc||tabs.indexOf(R7.doc)<0)R7.doc=tabs.length>1&&!(job()&&job().doc)?tabs[1]:tabs[0];
  box.innerHTML="";tabs.forEach(function(k){var b=h("button");b.type="button";b.setAttribute("role","tab");b.setAttribute("aria-selected",k===R7.doc?"true":"false");
    var live=R7.live&&R7.live.kind===k,done=k==="analysis"?curApps().length&&curApps().every(function(a){var r=runFor(a,(job()||L7().brief).depth);return r&&r.status==="done";}):!!stored(k);
    b.appendChild(h("span","dot"+(live?" live":done?" done":"")));b.appendChild(document.createTextNode(k==="analysis"?"Notes and analysis":docLabel(k,curApps(),curPurpose()).replace("Cover letter for the programme","Cover letter")));
    b.onclick=function(){R7.doc=k;paintTabs();paintDoc();};box.appendChild(b);});
  var dc=$("l7DocChip"),j=job();if(dc){dc.className="l-chip"+(j&&j.status==="done"?" ok":"");dc.textContent=!j?"What you will get":R7.running?(phase()==="write"?"Written as you watch":"Notes as it reads"):j.status==="done"?"Ready to save":"Kept so far";}}
var paperRaf=0;function paintPaperLive(){if(!R7.live||R7.live.kind!==R7.doc)return;if(paperRaf)return;paperRaf=(window.requestAnimationFrame||setTimeout)(function(){paperRaf=0;var p=document.querySelector("#l7Desk [data-live]");
  if(!p){paintDoc();return;}p.textContent=LX.live||"";p.appendChild(h("span","l-caret"));});}
function paintDoc(){var desk=$("l7Desk"),ol=$("l7Outline");if(!desk)return;var kind=R7.doc||"analysis",apps=sorted(curApps()),j=job();
  paperStyle();desk.className="l-desk th-"+themeOf(kind,apps);
  var keepScroll=desk.__kind===kind?desk.scrollTop:0;desk.__kind=kind;
  var meta={apps:apps,name:j&&j.doc?(lxRun(j.doc)||{}).name:setName(apps),label:docLabel(kind,apps,curPurpose()),forText:kind==="analysis"?"":forText(curPurpose())};
  if(kind==="analysis"){analysisMd(j).then(function(md){if(R7.doc!=="analysis")return;if(!md){desk.innerHTML='<div class="l-paper th-'+themeOf("analysis",apps)+'"><p class="wait">The notes and the analysis appear here as Lector reads: a note after every part, then the analysis, one section at a time.</p></div>';ol.innerHTML="";return;}
      desk.innerHTML=paper("analysis",md,meta);outline(md,null);desk.scrollTop=keepScroll;});return;}
  if(R7.live&&R7.live.kind===kind){var md=R7.docMd[kind]||"";desk.innerHTML=(sealed(kind)?"":rule(kind))+paper(kind,md,Object.assign({},meta,{live:true}));outline(md,R7.live);desk.scrollTop=desk.scrollHeight;return;}
  var s=stored(kind);
  if(!s){desk.innerHTML=(sealed(kind)?"":rule(kind))+paper(kind,"",Object.assign({},meta,{wait:true}));outline("",null);return;}
  IngBig.load(s.ref).then(function(md){if(R7.doc!==kind)return;R7.cur={kind:kind,md:md||"",meta:meta,chk:s.chk};desk.innerHTML=(sealed(kind)?"":rule(kind))+paper(kind,md||"",Object.assign({},meta,{chk:s.chk,made:s.made}));outline(md||"",null);desk.scrollTop=keepScroll;
    if(s.chk&&s.chk.unmatched&&s.chk.unmatched.length){var dc=$("l7DocChip");if(dc){dc.className="l-chip";dc.textContent=s.chk.unmatched.length+" figure"+(s.chk.unmatched.length>1?"s":"")+" to check";}}});}
function rule(kind){return '<div class="l-rule"><span class="i">○</span>'+(kind==="cover"?"No seal on cover letters: your letters stay plain, as you asked.":kind==="cv"?"No seal on your CV.":"")+'</div>';}
function forText(p){var P=p&&p!=="portfolio"&&L7().posts[p];if(!P)return "";return [P.title,P.org].filter(Boolean).join(" · ");}
function outline(md,live){var ol=$("l7Outline");if(!ol)return;ol.innerHTML="";var blocks=lxBlocks(md),n=0;if(blocks.length&&blocks[0].k==="h"&&blocks[0].lv===1)blocks.shift();
  var hs=blocks.filter(function(b){return b.k==="h"&&b.lv<=2;});
  hs.forEach(function(b,i){var st=live&&i===hs.length-1&&live.writingSection?"live":"done";var x=h("button",st);x.type="button";x.innerHTML='<span class="m">'+(st==="done"?"✓":"●")+"</span>"+esc(b.t.length>34?b.t.slice(0,32)+"…":b.t);
    x.onclick=function(){var t=$("l7Desk").querySelector('[data-h="'+i+'"]');if(t)$("l7Desk").scrollTo({top:t.offsetTop-14,behavior:"smooth"});};ol.appendChild(x);});
  if(live&&live.plan)live.plan.slice(hs.length).forEach(function(t){var x=h("button","wait");x.type="button";x.innerHTML='<span class="m">○</span>'+esc(t);ol.appendChild(x);});}
function analysisMd(j){var runs=[];if(j&&j.doc){var dr=lxRun(j.doc);if(dr)runs=[dr];}else{var B=j||L7().brief;runs=(j?j.apps:B.apps).map(function(k){return runFor(k,B.depth);}).filter(Boolean);}
  if(!runs.length)return Promise.resolve("");
  return Promise.all(runs.map(function(r){return Promise.all([lxJSON(r.analysisRef,{}),lxJSON(r.notesRef,[])]).then(function(x){return {r:r,a:x[0],notes:x[1]};});})).then(function(all){
    var out=["# Notes and analysis"];all.forEach(function(o){var r=o.r,secs=lxSections(r).filter(function(s){return o.a[s[0]];});
      out.push("## "+r.name);out.push(lxFactsText(r).replace(/^Facts measured from the file \(exact\):\n/,"").trim());
      if(secs.length)secs.forEach(function(s){out.push("### "+s[0]);out.push(o.a[s[0]]);});
      else{var kept0=o.notes.map(function(x,i){return x?{i:i,x:x}:null;}).filter(Boolean);out.push("### Notes so far ("+kept0.length+" of "+(r.total||o.notes.length)+" parts)");
        kept0.slice(-12).forEach(function(n){out.push("**Part "+(n.i+1)+"**\n\n"+n.x);});}});
    return out.join("\n\n");});}
/* the paper: as printed. Flat seals on the cover, numbered sections, the placeholders and any figure to check marked */
function inl(t,chk){var s=lxInline(t,esc);s=s.replace(/\[((?:your|to fill|the reader|the post|the years|the date)[^\]<]{0,70})\]/gi,'<span class="fill">[$1]</span>');
  if(chk&&chk.unmatched&&chk.unmatched.length)chk.unmatched.forEach(function(f){var re=new RegExp("(^|[^\\w.,])("+f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")(?![\\w])","g");
    s=s.replace(re,'$1<span class="chk" title="Not found in the measures, the analysis, your CV or the posting: check it">$2</span>');});
  return s;}
function paper(kind,md,o){var personal=kind==="cover"||kind==="cv",a=o.apps||[],th=themeOf(kind,a),mode=o.both?"both":(night()?"night":"day");
  var open='<div class="l-paper th-'+th+'">';
  var out=[],blocks=lxBlocks(md);if(blocks.length&&blocks[0].k==="h"&&blocks[0].lv===1)blocks.shift();
  var note=null;if(blocks.length>1&&blocks[blocks.length-2].k==="hr"&&blocks[blocks.length-1].k==="p"){note=blocks.pop().t;blocks.pop();}
  function seal(k){return mode==="both"?paperSeal(k,"day")+paperSeal(k,"night"):paperSeal(k,mode==="night"?"night":"");}
  if(!personal&&kind!=="analysis"){var ks=a.length===4&&ING_SEALS.master?["master"]:a;
    var T=PT[th]||{};
    out.push('<div class="cv">'+(ks.length?'<div class="seals">'+ks.map(seal).join("")+'</div>':'')+'<h1>'+esc(o.name||"")+'</h1>'+
      '<div class="caps"><i></i><span>'+esc(T.roman?romanDate(o.made?new Date(o.made):null):(o.label||""))+'</span><i></i></div>'+(T.roman&&o.label?'<div class="tag">'+esc(o.label)+'</div>':'')+
      (o.forText?'<div class="sub">Prepared for '+esc(o.forText)+'</div>':'')+(author()?'<div class="by">'+esc(author()+"  ·  "+month())+'</div>':'')+'</div>');}
  else if(kind==="analysis")out.push('<div class="cv"><h1>'+esc(o.name||"")+'</h1><div class="caps"><i></i><span>Notes and analysis</span><i></i></div></div>');
  if(kind==="cover")out.push('<div class="lhead"><b>'+esc(author()||"")+'</b>'+esc(today())+'</div>');
  if(o.wait){out.push('<p class="wait">'+(job()?"Written after the reading, section by section, as you watch.":"Written after the reading. Press Start reading in the brief.")+'</p>');return open+out.join("")+'</div>';}
  var n=0,hi=0,refs=false,lettered=blocks.some(function(b){return b.k==="h"&&b.lv===2&&/^[A-H][.)]\s/.test(b.t);}),list=null;
  function flush(){if(list){out.push("<"+list.t+">"+list.items.join("")+"</"+list.t+">");list=null;}}
  blocks.forEach(function(b){if(b.k==="ul"||b.k==="ol"){var t=b.k;if(!list||list.t!==t){flush();list={t:t,items:[]};}list.items.push("<li>"+inl(b.t,o.chk)+"</li>");return;}flush();
    if(b.k==="h"){var t2=b.t.trim();if(b.lv<=2){refs=/^(works cited|references|bibliography|sources)$/i.test(t2);if(!refs&&!lettered&&!/^(\d+|[A-H])[.)]\s/.test(t2)&&kind!=="analysis")t2=(++n)+". "+t2;
        var own=a.length>1?(IngHouseDocs.apps(t2).filter(function(k){return a.indexOf(k)>=0;})):[],nm2=/^(\d+|[A-H])([.)])\s+([\s\S]*)$/.exec(t2);
        out.push('<h2 data-h="'+(hi++)+'"'+(own.length===1?' class="own-'+own[0]+'"':'')+'>'+(nm2?'<span class="no">'+nm2[1]+'</span><span class="dot">'+nm2[2]+' </span><span>'+inl(nm2[3])+'</span>':inl(t2))+'</h2>');}
      else out.push('<h3>'+inl(t2)+'</h3>');return;}
    if(b.k==="p")out.push("<p>"+inl(b.t,o.chk)+"</p>");else if(b.k==="quote")out.push("<blockquote>"+inl(b.t,o.chk)+"</blockquote>");else if(b.k==="hr")out.push("<hr>");
    else if(b.k==="code")out.push("<pre>"+esc(b.lines.join("\n"))+"</pre>");
    else if(b.k==="table")out.push("<table>"+b.rows.map(function(r,i){return "<tr>"+r.map(function(c){return (i?"<td>":"<th>")+inl(c,o.chk)+(i?"</td>":"</th>");}).join("")+"</tr>";}).join("")+"</table>");});
  flush();
  if(o.live)out.push('<p data-live="1">'+esc(LX.live||"")+'<span class="l-caret"></span></p>');
  if(note)out.push('<p class="note">'+inl(note.replace(/^\*|\*$/g,""))+'</p>');
  return open+out.join("")+'</div>';}

/* ---------------- reading a set ---------------- */
function r7Go(){if(R7.running||LX.busy){ingToast("Lector is busy. Wait for it, or pause it first.");return;}
  var B=L7().brief,apps=sorted(B.apps);
  if(!apps.length){ingToast("Choose at least one of your apps first.");return;}
  var missing=apps.filter(function(k){return !kept(k);});if(missing.length){ingToast(listNames(missing)+(missing.length>1?" are":" is")+" not on this device yet. Add your apps first.");return;}
  var kinds=KINDS.map(function(d){return d[0];}).filter(function(k){return B.docs[k];});
  if(!kinds.length){ingToast("Choose at least one document in the brief.");return;}
  var o=modelPlan();if(!o.link&&!o.chosen){ingToast("No model is ready on this device yet. Ingenium's choice for Lector is "+(o.spec?o.spec.name:"Magister")+": get it in the brief, or on the Models page.");return;}
  if((kinds.indexOf("cover")>=0)&&B.purpose!=="portfolio"&&!L7().posts[B.purpose])ingToast("No "+(B.purpose==="job"?"posting":"programme's call")+" was added, so the letter is written for any reader. Add it in the brief to fit the letter to it.");
  L7().job={key:setKey(apps,B.purpose),apps:apps,purpose:B.purpose,kinds:kinds,depth:B.depth||"overview",modelId:o.chosen?o.chosen.id:null,status:"reading",at:Date.now(),made:{},err:""};
  saveState();R7.ev=[];R7.pin=null;paintStream();paintAll();if(one())setPanel("read");r7Run();}
function beginDoc(){if(R7.running||LX.busy||typeof LX_PICK==="undefined"||!LX_PICK||!LX_PICK.P)return;var o=modelPlan();if(!o.link&&!o.chosen){ingToast("No model is ready on this device yet.");return;}
  var m=o.chosen,P=LX_PICK.P,parts=lxPartsFor(P,"overview",m);
  var run={id:"lx_"+Date.now().toString(36),name:LX_PICK.name,file:LX_PICK.name,kind:"doc",depth:"overview",modelId:m?m.id:null,created:Date.now(),updated:Date.now(),status:"reading",done:0,total:parts.length,facts:P.facts,
    partsRef:IngBig.newId(),notesRef:IngBig.newId(),mergeRef:IngBig.newId(),analysisRef:IngBig.newId(),writings:{}};
  Promise.all([lxPutJSON(run.partsRef,parts),lxPutJSON(run.notesRef,parts.map(function(){return "";}))]).then(function(){var s=lxState();s.runs.unshift(run);s.active=run.id;LX_PICK=null;
    L7().job={key:"doc:"+run.id,apps:[],doc:run.id,purpose:"portfolio",kinds:[],depth:"overview",modelId:run.modelId,status:"reading",at:Date.now(),made:{},err:""};saveState();R7.ev=[];paintStream();R7.doc="analysis";paintAll();if(one())setPanel("read");r7Run();});}
function ensureRun(k,j){var f=runFor(k,j.depth);
  /* a reading left half-way keeps going from where it stopped, unless its parts were lost (a store cleared): then it starts again */
  if(f&&f.status!=="done")return lxJSON(f.partsRef,[]).then(function(p){if(p&&p.length)return f;
    var s=lxState();s.runs=s.runs.filter(function(r){return r.id!==f.id;});if(s.active===f.id)s.active=null;saveState();return ensureRun(k,j);});
  if(f)return Promise.resolve(f);
  addEv({k:"step",app:k,label:"Measuring",text:"Measuring "+nm(k)+" before it is read: its size, the words on its screens, the sentences it says, the notes in its code and how it is built. This takes a moment and needs no model."});
  return libText(k).then(function(text){if(!text)throw new Error(nm(k)+" is no longer on this device. Add it again (Your apps).");var meta=kept(k);
    return lxPrepare(meta.name||(nm(k)+".html"),text,function(s){R7.prepNote=nm(k)+": "+s;paintProgress();}).then(function(P){R7.prepNote="";
      var m=modelById(j.modelId),parts=lxPartsFor(P,j.depth,m);
      var run={id:"lx_"+Date.now().toString(36),name:nm(k),app:k,sha:meta.sha256||"",version:meta.version||"",file:meta.name||"",kind:"app",depth:j.depth,modelId:m?m.id:null,created:Date.now(),updated:Date.now(),
        status:"reading",done:0,total:parts.length,facts:P.facts,partsRef:IngBig.newId(),notesRef:IngBig.newId(),mergeRef:IngBig.newId(),analysisRef:IngBig.newId(),writings:{}};
      R7.src={};var nl=[],i=-1;while((i=text.indexOf("\n",i+1))>=0)nl.push(i);R7.src[k]={text:text,nl:nl};R7.parts[run.id]=parts;
      return Promise.all([lxPutJSON(run.partsRef,parts),lxPutJSON(run.notesRef,parts.map(function(){return "";}))]).then(function(){var s=lxState();s.runs.unshift(run);s.active=run.id;saveState();return run;});});});}
function readRun(run){if(run.status==="done")return Promise.resolve();
  if(job()&&job().modelId&&!run.modelId)run.modelId=job().modelId;
  return new Promise(function(res,rej){lxStart(run.id);var waited=0;
    var t=setInterval(function(){waited++;if(LX.busy&&LX.runId===run.id)return;if(run.status==="done"){clearInterval(t);res();return;}
      if(LX.yielded===run.id&&!LX.stop)return;  /* paused for a message in the chat: it carries on by itself */
      if(LX.busy)return;clearInterval(t);rej(run.status==="error"?new Error(run.err||"stopped by an error"):stopErr());},700);});}
function r7Run(){var j=job();if(!j||R7.running)return;if(LX.busy){ingToast("Lector is busy. Wait a moment.");return;}
  R7.running=true;LX.stop=false;j.err="";if(j.status!=="writing")j.status="reading";saveState();paintAll();watchFollow();
  var i=0,apps=j.doc?[]:j.apps;
  function nextApp(){if(LX.stop)return Promise.reject(stopErr());if(j.doc){var dr=lxRun(j.doc);return dr?readRun(dr):Promise.reject(new Error("That reading is no longer kept."));}
    if(i>=apps.length)return Promise.resolve();var k=apps[i++];
    return ensureRun(k,j).then(function(run){if(run.status==="done"){if(!R7.ev.some(function(e){return e.k==="step"&&e.app===k;}))addEv({k:"step",app:k,label:"Read before",text:nm(k)+" was read in full on "+lxDate(run.finished||run.updated)+(run.depth==="thorough"?", every line of its code":"")+". Lector uses that reading."});return nextApp();}
      return readRun(run).then(function(){addEv({k:"done",app:k,label:"Read in full",text:"All "+(run.total||0)+" parts of "+run.name+" are read, the notes joined and the analysis written."});paintBrief();return nextApp();});});}
  var p=j.status==="writing"?Promise.resolve():nextApp();
  p.then(function(){if(LX.stop)throw stopErr();if(j.doc)return;j.status="writing";saveState();paintAll();return writeAll(j);})
   .then(function(){if(LX.stop)throw stopErr();j.status="done";j.finished=Date.now();R7.step="";
     addEv({k:"done",label:"Finished",text:j.doc?"The analysis is written.":"Every document is written and checked: "+j.kinds.map(function(k){return docLabel(k,j.apps,j.purpose);}).join(", ")+". Choose one in the document panel and press Save."});
     ingToast(j.doc?"Lector has finished the analysis.":"Lector has finished. Your documents are ready to save.");if(one())setPanel("doc");})
   .catch(function(e){if(e&&e.stopped||LX.stop)j.status="paused";else{j.status="error";j.err=String(e&&e.message||e);addEv({k:"step",label:"Stopped",text:"Lector stopped: "+j.err+" Press Go on to try again from where it stopped."});}})
   .then(function(){R7.running=false;R7.live=null;R7.step="";LX.writing=null;if(LX.busy&&!LX.runId)LX.busy=false;saveState();paintAll();paintLive();paintBrief();
     try{if(R7.pin==null){var last=null;R7.ev.forEach(function(e){if(e.k==="note")last=e;});if(last)showPart(last.runId,last.part,"back");}}catch(e){}});}

/* ---------------- writing for the set ---------------- */
var A_IN="In brief",A_PUR="Purpose and the person it serves",A_DOES="What it does",A_FOC="Design for focus and well-being",A_BUILT="How it is built",A_RES="Research and scholarly value",A_SK="Skills it shows",A_MADE="How it was made",A_LIM="Limits and next steps";
var PLAN={dossier:[["Title and summary","Begin with one title line in bold; then a summary of about 150 words.",[A_IN,A_PUR,A_SK],230],
    ["Context and motivation","Why the work began and the gap it answers.",[A_PUR,A_IN],280],["Aims","What the work sets out to do.",[A_PUR,A_DOES],220],
    ["Design and methods","How it was designed and made: the approach, the choices and the iterations.",[A_MADE,A_FOC],320],
    ["What it does","Its features, grouped by area.",[A_DOES],340],["Accessibility and AuDHD-informed design","How it supports focus, calm, executive function and different ways of working.",[A_FOC],300],
    ["Technical implementation","Architecture, technologies, devices, offline work and data.",[A_BUILT],320],["Evaluation and evidence","What shows that it works: testing, revisions, use.",[A_MADE,A_LIM],260],
    ["Contribution and significance","What it adds to research, practice or teaching.",[A_RES,A_SK],280],["Limitations and future work","Honest limits and the next steps.",[A_LIM],220]],
  portfolio:[["What it is","",[A_IN,A_DOES],180],["What it shows of my work","",[A_SK,A_RES],180],["How it was made","",[A_MADE,A_BUILT],160],["Where it goes next","",[A_LIM],120]]};
function sysW(){var me=author()||"the owner";return "You are Lector, writing on the owner's own device for "+me+", who designed and built these apps alone. Write in British English, in the first person as her, in clear, exact prose of the standard expected in an Oxford or Cambridge doctoral application: precise, measured, specific and unhurried, never promotional. Use only what the material given shows: the measured facts, the analysis, her CV and the posting. Never invent a fact, a number, a name, a date, a post, a qualification or a quotation. Where a fact about her is needed and is not in the material, write a short placeholder in square brackets, such as [your current role]. Keep every figure exactly as given. Do not use these words: leverage, seamless, robust, cutting-edge, passionate, delve, tapestry, showcase, innovative, empower, harness, unlock, journey, testament, realm. Do not repeat the heading you are given, and add no headings of your own unless asked.";}
function cut(t,n){t=String(t||"");if(n<=0)return "";if(t.length<=n)return t;var c=t.slice(0,n),p=Math.max(c.lastIndexOf(". "),c.lastIndexOf("\n"));return (p>n*0.6?c.slice(0,p+1):c)+" […]";}
function factsShort(r){var f=r.facts||{};return "- "+r.name+(r.version?" (version "+r.version+")":"")+": "+fmtBytes(f.chars||0)+" in one file; "+fmtBytes(f.jsChars||0)+" of its own scripts; "+(f.functions||0)+" named functions; "+(f.headings||0)+" headings on its screens; "+(f.sayings||0)+" sentences in English"+(f.sayingsFr?" and "+f.sayingsFr+" in French":"")+"; "+(f.comments||0)+" notes left in its code"+(f.passes?"; "+f.passes+" numbered passes ("+f.passFirst+" to "+f.passLast+")":"")+".";}
function gather(j){var runs=j.apps.map(function(k){return runFor(k,j.depth);}).filter(Boolean),M=L7().me,P=j.purpose!=="portfolio"?L7().posts[j.purpose]:null;
  return Promise.all([Promise.all(runs.map(function(r){return lxJSON(r.analysisRef,{});})),M.cv?IngBig.load(M.cv.ref):null,
      Promise.all(M.writing.map(function(x){return IngBig.load(x.ref);})),Promise.all(M.letters.map(function(x){return IngBig.load(x.ref);})),P?IngBig.load(P.ref):null])
    .then(function(r){return {runs:runs,an:r[0],cv:r[1]||"",writing:(r[2]||[]).filter(Boolean),letters:(r[3]||[]).filter(Boolean),voice:M.voice!==false,post:P?Object.assign({},P,{text:r[4]||""}):null,apps:j.apps,purpose:j.purpose};});}
function clean(t,title){t=String(t||"").replace(/<think>[\s\S]*?<\/think>/g,"").trim();var L=t.split("\n");
  while(L.length&&(/^#{1,6}\s/.test(L[0])||(title&&L[0].replace(/[*#:]/g,"").trim().toLowerCase()===String(title).toLowerCase())))L.shift();
  return L.join("\n").trim();}
function ask(build,max,temp){var scale=1,tries=0,busyN=0;
  return new Promise(function(res,rej){(function go1(){if(LX.stop){rej(stopErr());return;}var msgs=build(scale);LX.live="";paintLiveSoon();
    lxAsk({modelId:job()&&job().modelId},msgs,max,temp,function(t){LX.live=t;paintLiveSoon();}).then(function(t){res(t);},function(e){var m=String(e&&e.message||e);
      if(LX.stop){rej(stopErr());return;}
      if(m==="busy"&&busyN++<400){setTimeout(go1,1500);return;}
      if(lxIsCtxError(e)&&scale>0.3){scale*=0.7;setTimeout(go1,300);return;}
      if(++tries<=2){setTimeout(go1,2000);return;}rej(e);});})();});}
function room(){var m=modelById(job()&&job().modelId);var ctx=lxCtx(m);return lxBudget(ctx,LX_OUT_SECTION,false);}
function material(G,keys,cap){var per=Math.floor(cap/Math.max(1,G.runs.length));
  return G.runs.map(function(r,i){var a=G.an[i]||{};var t=keys.filter(function(k){return a[k];}).map(function(k){return "("+k+") "+a[k];}).join("\n\n");return "### "+r.name+"\n"+cut(t,per);}).join("\n\n");}
function context(G,scale,o){var R=room()*scale,parts=[];var many=G.runs.length>1;
  parts.push("FACTS MEASURED FROM THE FILES (exact):\n"+(many?G.runs.map(factsShort).join("\n"):lxFactsText(G.runs[0])));
  if(o.keys)parts.push("ANALYSIS"+(many?" (each app in turn)":"")+":\n"+material(G,o.keys,Math.floor(R*(o.anShare||0.5))));
  if(G.post&&o.post)parts.push((G.purpose==="programme"?"THE PROGRAMME'S CALL":"THE POSTING")+" (fit what you write to what it asks for, where the material allows; never claim what it does not show):\n"+cut(G.post.text,Math.floor(R*(o.postShare||0.1))));
  if(o.cv&&G.cv)parts.push("HER CV (the only source of facts about her: names, dates, posts, qualifications):\n"+cut(G.cv,Math.floor(R*(o.cvShare||0.12))));
  if(o.voice&&G.voice&&G.writing.length)parts.push("HER OWN WRITING (match its voice, rhythm and vocabulary; do not copy its content):\n"+cut(G.writing.join("\n\n---\n\n"),Math.floor(R*0.08)));
  if(o.letters&&G.letters.length)parts.push("HER PAST COVER LETTERS (for their shape and tone only; their facts may be out of date):\n"+cut(G.letters.join("\n\n---\n\n"),Math.floor(R*0.1)));
  return parts.join("\n\n");}
function about(G){var n=G.runs.length;return n===4?"the four apps of The Offline Project ("+listNames(G.apps)+"), as one body of work":n>1?listNames(G.apps)+", together, as one body of work":G.runs[0].name;}
function forLine(G){if(!G.post)return G.purpose==="programme"?" for a doctoral or academic application":G.purpose==="job"?" for a job application":" for my professional portfolio";
  return " for "+(G.purpose==="programme"?"an application to ":"an application for ")+[G.post.title,G.post.org].filter(Boolean).join(" · ");}
function sectionMsgs(G,kind,s,scale){var many=G.runs.length>1,t=s[0];if(many&&t==="What it does")t="What the apps do";
  var u="Write the section \""+t+"\" of a "+docLabel(kind,G.apps,G.purpose).toLowerCase()+" about "+about(G)+forLine(G)+". "+(s[1]||"")+
    (many&&s[0]==="What it does"?" Give each app its own paragraph, beginning with its name in bold.":"")+(many&&s[0]!=="What it does"?" Write about the apps together, naming each where it matters.":"")+
    " Use only what the material shows; where it says nothing on a point, leave the point out rather than guess. About "+s[3]+" words, in paragraphs.\n\n"+
    context(G,scale,{keys:s[2],anShare:0.52,post:true,postShare:0.1,cv:/Title|Contribution|Context/.test(s[0]),cvShare:0.08,voice:true});
  return [{role:"system",content:sysW()},{role:"user",content:u}];}
function setLive(kind,plan,i,label){R7.live={kind:kind,plan:plan,i:i,of:plan?plan.length:1,writingSection:true};R7.step=label;paintProgress();paintLive();if(R7.doc===kind)paintDoc();else paintTabs();}
function writeAll(j){var kinds=j.kinds.filter(function(k){return !j.made[k];}),i=0;
  return gather(j).then(function(G){if(!G.runs.length)throw new Error("None of the apps in this set has been read in full yet.");
    function next(){if(LX.stop)return Promise.reject(stopErr());if(i>=kinds.length)return Promise.resolve();var kind=kinds[i++];
      LX.busy=true;LX.runId=null;LX.writing=kind;R7.docMd[kind]="# "+setName(G.apps)+" · "+docLabel(kind,G.apps,G.purpose)+"\n\n";
      addEv({k:"step",label:docLabel(kind,G.apps,G.purpose),text:"Writing the "+docLabel(kind,G.apps,G.purpose).toLowerCase()+" for "+setName(G.apps)+(G.post?", fitted to "+(G.post.title||"the posting"):"")+(G.voice&&G.writing.length?", in your own voice":"")+"."});
      R7.doc=kind;
      return writeDoc(kind,G).then(function(md){return keepDoc(j,kind,md,G);}).then(function(){j.made[kind]=true;LX.writing=null;R7.live=null;saveState();paintAll();return next();},
        function(e){LX.writing=null;LX.busy=false;R7.live=null;throw e;});}
    return next().then(function(){LX.busy=false;LX.writing=null;});});}
function writeDoc(kind,G){var label=docLabel(kind,G.apps,G.purpose),head="# "+setName(G.apps)+" · "+label+"\n\n",pieces=[];
  function put(md){R7.docMd[kind]=head+pieces.concat(md?[md]:[]).join("\n\n");}
  if(kind==="dossier"||kind==="portfolio"){var plan=PLAN[kind],k=0,titles=plan.map(function(s){return G.runs.length>1&&s[0]==="What it does"?"What the apps do":s[0];});
    return (function next(){if(LX.stop)return Promise.reject(stopErr());if(k>=plan.length)return Promise.resolve();var s=plan[k++],t=titles[k-1];setLive(kind,titles,k-1,"Writing the "+label.toLowerCase()+" · "+t+" ("+k+" of "+plan.length+")");
      return ask(function(sc){return sectionMsgs(G,kind,s,sc);},LX_OUT_SECTION,0.45).then(function(x){var body=clean(x,t);pieces.push("## "+t+"\n"+body);put();
        addEv({k:"done",label:label+" · "+t,text:body.length>420?body.slice(0,420)+"…":body});return next();});})()
      .then(function(){if(kind==="dossier")pieces.push(references(G));return finish();});}
  if(kind==="appendix"){setLive(kind,["Introduction","A. Measures","B. Technologies","C. Features","D. Design for focus and well-being","E. Development history","F. Web addresses"],0,"Writing the "+label.toLowerCase()+" · its introduction");
    return ask(function(sc){return [{role:"system",content:sysW()},{role:"user",content:"Write a short introduction, about 90 words, to the technical appendix of "+about(G)+forLine(G)+". Say what the tables that follow show: measures taken from the files themselves, the technologies found in the code, and passages from the analysis. No headings.\n\n"+context(G,sc,{})}];},300,0.3)
      .then(function(intro){pieces.push(clean(intro));tables(G).forEach(function(t){pieces.push(t);});put();return finish();});}
  if(kind==="cover"){setLive(kind,["The letter"],0,"Writing the "+label.toLowerCase());
    var to=G.post?(G.purpose==="programme"?"an application to this programme: ":"the post of ")+[G.post.title,G.post.org].filter(Boolean).join(", "):"any reader of my portfolio, introducing my work (use placeholders such as [the post] and [the organisation] where a letter names them)";
    return ask(function(sc){return [{role:"system",content:sysW()},{role:"user",content:"Write a cover letter, for "+to+". Four or five paragraphs. Begin with \"Dear [the reader's name],\" unless the posting names the reader. The opening says what I am applying for and why in one or two sentences. The middle paragraphs set my work on "+about(G)+" against what the "+(G.purpose==="programme"?"programme":"post")+" asks for, with concrete details from the material. The closing is brief and courteous. End with \"Yours sincerely,\" and my name on its own line. Names, posts and dates come only from my CV; leave anything else in square brackets. No headings, no address block.\n\n"+
      context(G,sc,{keys:[A_IN,A_SK,A_DOES,A_RES],anShare:0.36,post:true,postShare:0.2,cv:true,cvShare:0.16,voice:true,letters:true})}];},1200,0.5)
      .then(function(x){pieces.push(clean(x));put();return finish();});}
  if(kind==="cv"){setLive(kind,["Projects"],0,"Writing the "+label.toLowerCase());
    return ask(function(sc){return [{role:"system",content:sysW()},{role:"user",content:"Write the Projects section of my CV for "+about(G)+forLine(G)+". For each app: a title line in bold (its name, what it is in a few words, and [the years] unless my CV gives them), then 3 to 5 bullet points, each starting with a strong verb, naming concrete features or results and using the exact figures given. After the apps, one line beginning \"Skills:\" with the skills they show together. Match the style of my CV where it is given. No other headings.\n\n"+
      context(G,sc,{keys:[A_IN,A_DOES,A_SK,A_BUILT],anShare:0.5,post:true,postShare:0.08,cv:true,cvShare:0.14})}];},1100,0.4)
      .then(function(x){pieces.push("## Projects\n"+clean(x,"Projects"));put();return finish();});}
  return Promise.reject(new Error("Lector does not know how to write that document."));
  function finish(){var md=head+pieces.join("\n\n")+"\n\n---\n*Drafted by "+lxModelName({modelId:job()&&job().modelId})+" in Ingenium's Lector on "+lxDate()+", from full readings of "+listNames(G.apps)+". The measures are exact; check every other statement before you use it.*";R7.docMd[kind]=md;return md;}}
function references(G){var a=author(),parts=a.trim().split(/\s+/),sur=parts.pop()||a,ini=parts.map(function(p){return p.charAt(0).toUpperCase()+".";}).join(" ");
  return "## References\n"+G.runs.map(function(r){var meta=kept(appOf(r))||{};var y=(meta.date&&String(meta.date).slice(0,4))||String(new Date().getFullYear());
    return (a?sur+", "+ini+" ":"")+"("+y+") *"+r.name+"*"+(r.version||meta.version?", version "+(r.version||meta.version):"")+" [software]. Offline application, kept on the owner's devices.";}).join("\n\n");}
function tables(G){var out=[],runs=G.runs,many=runs.length>1,F=runs.map(function(r){return r.facts||{};});
  function row(lbl,fn){return [lbl].concat(F.map(fn));}
  var head=["Measure"].concat(runs.map(function(r){return r.name;}));
  var rows=[head,row("Version",function(f,i){return String(runs[i].version||(kept(appOf(runs[i]))||{}).version||"–");}),row("Size of the file",function(f){return fmtBytes(f.chars||0);}),
    row("Embedded pictures and files",function(f){return (f.mediaN||0)+" ("+fmtBytes(f.mediaBytes||0)+")";}),row("Its own scripts",function(f){return fmtBytes(f.jsChars||0)+" in "+(f.scripts||0)+" blocks";}),
    row("Its own styles",function(f){return fmtBytes(f.cssChars||0);}),row("Named functions",function(f){return String(f.functions||0);}),row("Headings on its screens",function(f){return String(f.headings||0);}),
    row("Buttons (about)",function(f){return String(f.controls||0);}),row("Sentences it says, English",function(f){return String(f.sayings||0);}),row("Sentences it says, French",function(f){return String(f.sayingsFr||0);}),
    row("Notes left in its code",function(f){return String(f.comments||0);}),row("Numbered passes recorded",function(f){return f.passes?f.passes+(f.passFirst?" ("+f.passFirst+" to "+f.passLast+")":""):"0";}),
    row("Theme variables, animations, screen rules",function(f){return (f.cssVars||0)+", "+(f.keyframes||0)+", "+(f.mediaQueries||0);})];
  out.push("## A. Measures of the files\n"+lxTable(rows));
  var tech={};F.forEach(function(f,i){(f.inventory||[]).forEach(function(r){tech[r[0]]=tech[r[0]]||runs.map(function(){return 0;});tech[r[0]][i]=r[1];});});
  var tk=Object.keys(tech);if(tk.length)out.push("## B. Technologies found in the code\n"+lxTable([["Technology"].concat(runs.map(function(r){return r.name;}))].concat(tk.map(function(k){return [k].concat(tech[k].map(String));}))));
  [["C. Features",A_DOES],["D. Design for focus and well-being",A_FOC],["E. Development history",A_MADE]].forEach(function(p){var parts=[];runs.forEach(function(r,i){var a=G.an[i]||{};if(a[p[1]])parts.push((many?"### "+r.name+"\n":"")+a[p[1]]);});if(parts.length)out.push("## "+p[0]+"\n"+parts.join("\n\n"));});
  var doms=[];runs.forEach(function(r,i){var d=F[i].domains||[];if(d.length)doms.push((many?"### "+r.name+"\n":"")+d.map(function(x){return "- "+x[0]+" ("+x[1]+")";}).join("\n"));});if(doms.length)out.push("## F. Web addresses named in the code\n"+doms.join("\n\n"));
  return out;}
/* every figure in the document, looked for in what it was written from */
function check(md,G){var src=[];G.runs.forEach(function(r,i){src.push(lxFactsText(r),factsShort(r),JSON.stringify(r.facts||{}),JSON.stringify(G.an[i]||{}),String(r.version||""));});src.push(G.cv||"",G.post&&G.post.text||"");
  var hay=src.join("\n").replace(/(\d),(\d{3})/g,"$1$2");var body=md.split("\n---\n")[0];var seen={},figures=0,unmatched=[];
  var re=/(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?/g,m;
  body.split("\n").forEach(function(line){if(/^\|/.test(line.trim()))return;var l=line.replace(/^#+\s*\d+[.)]\s*/,"").replace(/^\s*\d+[.)]\s+/,"");
    while((m=re.exec(l))){var f=m[0],n=f.replace(/,/g,"");if(+n<=12&&!/\./.test(n))continue;if(seen[f])continue;seen[f]=1;figures++;if(hay.indexOf(n)<0)unmatched.push(f);}});
  var fills=(body.match(/\[(?:your|to fill|the reader|the post|the years|the date|the organisation)[^\]]*\]/gi)||[]).length;
  return {figures:figures,unmatched:unmatched.slice(0,24),fills:fills};}
function keepDoc(j,kind,md,G){var key=j.key,S=L7().sets[key]=L7().sets[key]||{apps:j.apps.slice(),purpose:j.purpose,docs:{},older:{}};S.docs=S.docs||{};S.older=S.older||{};
  var chk=check(md,G),ref=IngBig.newId();
  addEv({k:"check",label:docLabel(kind,G.apps,G.purpose),text:(chk.figures?(chk.unmatched.length?chk.unmatched.length+" of "+chk.figures+" figures were not found in the measures, the analysis, your CV or the posting, and are marked for you to check: "+chk.unmatched.slice(0,6).join(", ")+(chk.unmatched.length>6?"…":"")+".":"Every figure ("+chk.figures+") was found in the measures, the analysis, your CV or the posting."):"No figures to check.")+
    (chk.fills?" "+chk.fills+" place"+(chk.fills>1?"s are":" is")+" left for you to fill, in square brackets.":"")+(sealed(kind)?" "+(G.runs.length===4?"The master seal is on its cover.":"Its seal"+(G.runs.length>1?"s are":" is")+" on its cover."):" No seal, as you asked.")});
  return IngBig.put(ref,md).then(function(){var old=S.docs[kind];if(old){S.older[kind]=[old].concat(S.older[kind]||[]);while(S.older[kind].length>3){var x=S.older[kind].pop();if(x&&x.ref)IngBig.del(x.ref);}}
    S.docs[kind]={ref:ref,made:Date.now(),model:lxModelName({modelId:j.modelId}),title:setName(j.apps)+" · "+docLabel(kind,j.apps,j.purpose),chk:chk};saveState();});}

/* ---------------- saving ---------------- */
function curDoc(){var kind=R7.doc||"analysis";if(kind==="analysis")return analysisMd(job()).then(function(md){return md?{kind:kind,md:md}:null;});
  var s=stored(kind);if(!s)return Promise.resolve(null);return IngBig.load(s.ref).then(function(md){return md?{kind:kind,md:md,chk:s.chk}:null;});}
function save(){curDoc().then(function(d){if(!d){ingToast("There is nothing to save yet: this document is written after the reading.");return;}
  var apps=sorted(curApps()),j=job(),name=j&&j.doc?(lxRun(j.doc)||{}).name:setName(apps),label=docLabel(d.kind,apps,curPurpose()),title=name+" · "+label,file=lxFileName(title),fmt=L7().brief.fmt||"docx";
  var meta={kind:HOUSE[d.kind]||"dossier",apps:apps,subtitle:label,name:sealed(d.kind)||d.kind==="analysis"?name:undefined,forText:d.kind==="analysis"?"":forText(curPurpose()),master:apps.length===4&&sealed(d.kind)};
  if(d.kind==="cover"||d.kind==="cv")meta.name=undefined;
  if(fmt==="docx"){var bytes=IngHouseDocs.docx(title,d.md,meta);saveFileNative(file+".docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document",bytes);}
  else if(fmt==="md"){lxSaveMd(title,d.md);}
  else if(fmt==="html"){saveFileNative(file+".html","text/html",htmlDoc(d.kind,d.md,{apps:apps,name:name,label:label,forText:meta.forText,title:title}));}
  else if(fmt==="pdf"){if(window.LxPdf&&typeof LxPdf.make==="function"){LxPdf.make(title,d.md,{kind:meta.kind,apps:apps,name:sealed(d.kind)?name:(d.kind==="analysis"?name:""),subtitle:label,forText:meta.forText,author:author(),month:month(),
      seals:sealed(d.kind)?(apps.length===4&&ING_SEALS.master?[{key:"master",src:flatSrc("master")}]:apps.map(function(k){return {key:k,src:flatSrc(k)};})):[]}).then(function(u8){saveFileNative(file+".pdf","application/pdf",u8);},function(e){ingToast("The PDF could not be made: "+(e&&e.message||e));});}
    else ingToast("PDF is not available in this copy of Ingenium. Save it as Word, and open it in Pages or Word to keep a PDF.");}});}
function htmlDoc(kind,md,o){var th=themeOf(kind,o.apps),css=fontCss(th==="inkwell"?"inkwell":th==="family"?"family":"none")+"\n"+paperCss(false)+
  "\n.l-paper .cv .seals .sn{display:none}@media screen and (prefers-color-scheme:dark){.l-paper .cv .seals .sd{display:none}.l-paper .cv .seals .sn{display:inline-block}}@media print{.l-paper .cv .seals .sn{display:none !important}.l-paper .cv .seals .sd{display:inline-block !important}}";
  return '<!doctype html>\n<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="generator" content="Ingenium Lector"><title>'+esc(o.title)+'</title><style>'+css+'</style></head><body class="th-'+th+'">'+paper(kind,md,Object.assign({},o,{both:true}))+'</body></html>';}

/* ---------------- layout: the height of the window, the panels, the grips, the tabs ---------------- */
function one(){var r=$("lx7");return !!(r&&r.classList.contains("l-one"));}
function setPanel(p){R7.panel=p;var tabs=$("l7Tabs");if(tabs)[].forEach.call(tabs.querySelectorAll("button"),function(b){b.setAttribute("aria-selected",b.getAttribute("data-p")===p?"true":"false");});
  ["Brief","Read","Doc"].forEach(function(n,i){var e=$("l7"+n);if(e)e.classList.toggle("show",["brief","read","doc"][i]===p);});segThumbs($("lx7"));}
function fit(){var root=$("lx7");if(!root||!root.offsetParent)return;var r=root.getBoundingClientRect(),se=document.scrollingElement||document.documentElement,top=r.top+(se?se.scrollTop:0);
  var hgt=Math.max(420,Math.floor(window.innerHeight-top-12));root.style.setProperty("--l-h",hgt+"px");
  var w=r.width,isOne=w<900,isPhone=w<540;if(root.classList.contains("l-one")!==isOne||root.classList.contains("l-phone")!==isPhone){root.classList.toggle("l-one",isOne);root.classList.toggle("l-phone",isPhone);
    if(isOne)setPanel(R7.panel||(R7.running?"read":job()&&job().status==="done"?"doc":"brief"));}
  applySizes();segThumbs(root);}
var fitT=0;function layoutSoon(){clearTimeout(fitT);fitT=setTimeout(fit,30);}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function applySizes(){var P=$("l7Panels");if(!P)return;var U=L7().ui;if(one()){P.style.removeProperty("--w1");P.style.removeProperty("--w2");}
  else{var W=P.getBoundingClientRect().width;if(U.w1)P.style.setProperty("--w1",clamp(U.w1,230,Math.max(230,Math.min(560,W-32-240-280)))+"px");else P.style.removeProperty("--w1");
    if(U.w2)P.style.setProperty("--w2",clamp(U.w2,240,Math.max(240,W-32-280-(U.w1||300)))+"px");else P.style.removeProperty("--w2");}
  var now=$("l7Now");if(now){if(U.now){var rd=$("l7Rd").getBoundingClientRect().height;now.style.height=clamp(U.now,90,Math.max(90,rd-150))+"px";now.style.maxHeight="none";}else{now.style.removeProperty("height");now.style.removeProperty("max-height");}}}
function dragger(el,axis,move){if(!el||el.__d)return;el.__d=1;
  el.addEventListener("pointerdown",function(e){if(e.button!==0)return;e.preventDefault();try{el.setPointerCapture(e.pointerId);}catch(_){}el.classList.add("drag");document.body.classList.add("l7-resizing",axis==="x"?"col":"row");
    function mv(ev){move(axis==="x"?ev.clientX:ev.clientY);applySizes();}
    function up(){el.classList.remove("drag");document.body.classList.remove("l7-resizing","col","row");el.removeEventListener("pointermove",mv);el.removeEventListener("pointerup",up);el.removeEventListener("pointercancel",up);saveSoon();}
    el.addEventListener("pointermove",mv);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);});
  el.addEventListener("keydown",function(e){var d=(e.key==="ArrowLeft"||e.key==="ArrowUp")?-24:(e.key==="ArrowRight"||e.key==="ArrowDown")?24:0;if(!d)return;e.preventDefault();var r=el.getBoundingClientRect();move((axis==="x"?r.left+r.width/2:r.top+r.height/2)+d);applySizes();saveSoon();});}
function segThumbs(root){if(!root)return;[].forEach.call(root.querySelectorAll(".l-seg,.l-tabs"),function(seg){var th=seg.querySelector(".l-thumb");if(!th)return;
  var on=seg.querySelector('button[aria-pressed="true"],button[aria-selected="true"]');if(!on||!on.offsetWidth){th.style.width="0";return;}
  th.style.width=on.offsetWidth+"px";th.style.transform="translateX("+(on.offsetLeft-3)+"px)";});}
function wireFrame(){var U=L7().ui;
  dragger($("l7G1"),"x",function(x){U.w1=Math.round(x-$("l7Brief").getBoundingClientRect().left);});
  dragger($("l7G2"),"x",function(x){U.w2=Math.round(x-$("l7Read").getBoundingClientRect().left-8);});
  dragger($("l7Vg"),"y",function(y){U.now=Math.round(y-$("l7Now").getBoundingClientRect().top-7);});
  [["l7G1","w1"],["l7G2","w2"],["l7Vg","now"]].forEach(function(p){$(p[0]).addEventListener("dblclick",function(){delete U[p[1]];applySizes();saveSoon();});});
  [].forEach.call($("l7Tabs").querySelectorAll("button"),function(b){b.onclick=function(){setPanel(b.getAttribute("data-p"));};});
  var fmt=$("l7Fmt");[].forEach.call(fmt.querySelectorAll("button"),function(b){b.setAttribute("aria-pressed",(L7().brief.fmt||"docx")===b.getAttribute("data-v")?"true":"false");
    b.onclick=function(){L7().brief.fmt=b.getAttribute("data-v");[].forEach.call(fmt.querySelectorAll("button"),function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});segThumbs(fmt.parentNode);saveSoon();};});
  $("l7Save").onclick=save;$("l7Copy").onclick=function(){curDoc().then(function(d){if(d)lxCopy(d.md);else ingToast("There is nothing to copy yet.");});};
  /* the mouse wheel moves the rows that scroll sideways, since no bar shows */
  [].forEach.call($("lx7").querySelectorAll(".l-outline,.l-dtabs"),function(box){box.addEventListener("wheel",function(e){if(Math.abs(e.deltaX)>Math.abs(e.deltaY)||box.scrollWidth<=box.clientWidth+1)return;box.scrollLeft+=e.deltaY;e.preventDefault();},{passive:false});});
  /* the seals turn toward the pointer, lift, and sink when pressed */
  var root=$("lx7");root.addEventListener("pointermove",function(e){var t=e.target&&e.target.closest?e.target.closest(".l-app"):null,ls=t&&t.querySelector(".ls");
    [].forEach.call(root.querySelectorAll(".ls.hov"),function(x){if(x!==ls){x.classList.remove("hov","down");x.style.removeProperty("--rx");x.style.removeProperty("--ry");}});
    if(!ls||e.pointerType==="touch")return;var r=ls.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;ls.classList.add("hov");
    ls.style.setProperty("--ry",(clamp(px,-.8,.8)*30).toFixed(1)+"deg");ls.style.setProperty("--rx",(-clamp(py,-.8,.8)*24).toFixed(1)+"deg");},{passive:true});
  root.addEventListener("pointerdown",function(e){var t=e.target&&e.target.closest?e.target.closest(".l-app"):null,ls=t&&t.querySelector(".ls");if(ls)ls.classList.add("down");},{passive:true});
  root.addEventListener("pointerup",function(){[].forEach.call(root.querySelectorAll(".ls.down"),function(x){x.classList.remove("down");});},{passive:true});
  if(typeof ResizeObserver==="function"){var ro=new ResizeObserver(layoutSoon);ro.observe(root);}
  watchFollow();}
window.addEventListener("resize",layoutSoon);
/* the theme changes the seals' faces */
try{new MutationObserver(function(){if($("lx7")&&$("page-lector").classList.contains("active")){paintBrief();paintDoc();}}).observe(document.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}

/* ---------------- Lector's own reading, drawn here ---------------- */
/* R86 took a "build" from any text that followed CD-BUILD-MARKER, and in Ingenium that is Lector's own pattern
   (\s*([^): a build that is not a plain name or number is left out of every fact sheet and document */
var oFT=lxFactsText;lxFactsText=function(run){try{var f=run&&run.facts;if(f&&f.build&&!/^[\w .:\/()+-]{1,40}$/.test(f.build))f.build="";}catch(e){}return oFT.apply(this,arguments);};window.lxFactsText=lxFactsText;
var oRP=lxReadParts;lxReadParts=function(run,parts,notes){try{R7.parts[run.id]=parts;R7.notes[run.id]=notes;R7.seen[run.id]=notes.map(Boolean);var have=notes.filter(Boolean).length;
    addEv({k:"step",app:appOf(run),label:"Reading",text:"Reading "+run.name+(run.kind==="app"?(run.depth==="thorough"?", every line of its code":", an overview"):"")+": "+parts.length+" parts"+(have?", "+have+" read before":"")+". A note is kept after every part."});
    showCurrentPart();}catch(e){}return oRP.apply(this,arguments);};
window.lxReadParts=lxReadParts;
var oPJ=lxPutJSON;lxPutJSON=function(ref,v){try{if(Array.isArray(v)){var run=lxState().runs.filter(function(r){return r.notesRef===ref;})[0];
    if(run){var seen=R7.seen[run.id]||[];v.forEach(function(x,i){if(x&&!seen[i]){seen[i]=true;var ps=R7.parts[run.id];
      addEv({k:"note",app:appOf(run),label:"Part "+(i+1)+" of "+v.length+(ps&&ps[i]?" · "+ps[i].t+(ps[i].of>1?" ("+ps[i].k+" of "+ps[i].of+")":""):""),text:x,runId:run.id,part:i});}});R7.seen[run.id]=seen;R7.notes[run.id]=v;}}}catch(e){}
  return oPJ.apply(this,arguments);};
window.lxPutJSON=lxPutJSON;
var oSS=lxSetStep;lxSetStep=function(t){R7.step=t;var r=oSS.apply(this,arguments);try{if(/^Reading part/.test(t))showCurrentPart();if(/^Joining|^Writing the analysis/.test(t)&&R7.pin==null)codeIdle({head:t,body:/^Joining/.test(t)?"Lector is joining its notes into one account, keeping every distinct fact, name, number and quotation.":"Lector is writing the analysis, one section at a time, from its notes and the measures of the file."});}catch(e){}return r;};
window.lxSetStep=lxSetStep;
lxPaintLive=function(){paintLiveSoon();};window.lxPaintLive=lxPaintLive;
lxPaintRun=function(){paintProgress();};window.lxPaintRun=lxPaintRun;
lxRender=function(){try{if(!$("page-lector").classList.contains("active")&&$("lx7")){paintBrief();return;}render();}catch(e){try{console.error("R108",e);}catch(_){}}};window.lxRender=lxRender;
/* while Lector writes, a message in the chat waits, as before; a reading gives way to it and carries on by itself */
try{var og=go;go=function(p){var r=og.apply(this,arguments);try{document.body.classList.toggle("lx7-on",p==="lector");if(p==="lector"){layoutSoon();setTimeout(fit,120);}}catch(e){}return r;};window.go=go;}catch(e){}
/* a set left under way when the app closed waits, paused, for Go on */
(function(){try{var j=L7().job;if(j&&(j.status==="reading"||j.status==="writing"))j.status=j.status==="writing"?"writing":"paused";}catch(e){}})();
ORDER.forEach(function(k){if(L7().brief.apps.indexOf(k)>=0)prepare(k);});
window.IngLector={render:render,state:L7,go:r7Go,run:r7Run,R7:R7,paper:paper,htmlDoc:htmlDoc,check:check,writeDoc:writeDoc,gather:gather,setKey:setKey,runFor:runFor,fit:fit,setPanel:setPanel,tables:tables,parsePost:parsePost};
try{if($("page-lector").classList.contains("active")){document.body.classList.add("lx7-on");render();}}catch(e){}
})();
;try{window.__ingParts["p40"]="running";}catch(_){}
</script>
