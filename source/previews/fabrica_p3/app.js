(function(){
"use strict";
/* Fabrica, phase 3, a live preview (14 November 2026). Fabrica itself, captured from Ingenium's own page with three invented apps
   (quill-notes, harbour-garden, ledger), and the new pieces in Fabrica's own forms: Needs you, Runs (workflows on your own machines and
   on GitHub's), Machines, every device in one release, where each package is made, and Learn as you go. Every name of a person, run and
   number here is invented for the preview. */
var D=document,W=window,win=D.getElementById("win"),fitBox=D.getElementById("fit"),stage=D.getElementById("stage"),scroller=D.getElementById("pvScroll");
var V=JSON.parse(D.getElementById("pvViews").textContent),R=JSON.parse(D.getElementById("pvRight").textContent);
var fb=D.getElementById("fb"),P=fb.querySelectorAll(".f-panels > .f-pn"),L=P[0],M=P[1],RT=P[2];
function el(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function txt(e){return (e&&e.textContent||"").replace(/\s+/g," ").trim();}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function still(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
/* ---------- the window: 1440 by 900, scaled to fit, as the approved previews ---------- */
function fit(){var cs=getComputedStyle(stage),aw=stage.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
  var ah=W.innerHeight-fitBox.getBoundingClientRect().top+W.scrollY-40;var s=Math.min(1,aw/1440,Math.max(ah,520)/900);if(!(s>0))s=.5;
  win.style.transform="scale("+s+")";fitBox.style.width=Math.floor(1440*s)+"px";fitBox.style.height=Math.floor(900*s)+"px";}
W.addEventListener("resize",fit);fit();setTimeout(fit,60);
function scale(){var r=win.getBoundingClientRect();return r.width/1440||1;}
/* ---------- day and night, as the Display does ---------- */
var tk=D.getElementById("themeKey");function night(){return win.getAttribute("data-theme")==="night";}
function label(){tk.textContent=night()?"Day":"Night";}
tk.addEventListener("click",function(){var n=!night();win.setAttribute("data-theme",n?"night":"day");D.documentElement.setAttribute("data-theme",n?"dark":"light");label();});label();
/* ---------- every key sounds as Ingenium's do (r176): a short soft tock as it is pressed ---------- */
var AC=null,SND=true;D.getElementById("soundKey").addEventListener("click",function(){SND=!SND;this.textContent=SND?"Sound on":"Sound off";this.setAttribute("aria-pressed",SND?"true":"false");});
function tock(hi){if(!SND)return;try{AC=AC||new (W.AudioContext||W.webkitAudioContext)();var t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type="sine";
  o.frequency.setValueAtTime(hi?660:520,t);o.frequency.exponentialRampToValueAtTime(hi?420:340,t+.07);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.05,t+.006);
  g.gain.exponentialRampToValueAtTime(.0001,t+.09);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+.1);}catch(e){}}
win.addEventListener("pointerdown",function(e){var k=e.target.closest&&e.target.closest("button,.r172-opt,[role=tab],[role=button]");if(k&&!k.disabled)tock(k.classList.contains("pri"));},true);
var tst=D.getElementById("pvToast"),tt=0;function say(t){tst.textContent=t;tst.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){tst.classList.remove("on");},3200);}
/* the sliding thumb of every segmented row follows its pressed key, as Fabrica's own (r112 thumbs) */
function thumbs(root){[].forEach.call(root.querySelectorAll(".f-seg"),function(s){var th=s.querySelector(".f-thumb"),on=s.querySelector('button[aria-pressed="true"]:not([hidden]),button[aria-selected="true"]:not([hidden])');
  if(th&&on){th.style.width=on.offsetWidth+"px";th.style.transform="translateX("+on.offsetLeft+"px)";}});}
/* the logos lean toward the pointer and lift; pressed, they sink (r112, the same measures) */
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
fb.addEventListener("pointermove",function(e){var t=e.target&&e.target.closest?e.target.closest(".f-repo,.f-pn-h"):null,ls=t&&t.querySelector(".f-ls:not(.new):not(.flat)");
  [].forEach.call(fb.querySelectorAll(".f-ls.hov"),function(x){if(x!==ls){x.classList.remove("hov","down");x.style.removeProperty("--rx");x.style.removeProperty("--ry");}});
  if(!ls||e.pointerType==="touch")return;var r=ls.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;ls.classList.add("hov");
  ls.style.setProperty("--ry",(clamp(px,-.8,.8)*30).toFixed(1)+"deg");ls.style.setProperty("--rx",(-clamp(py,-.8,.8)*24).toFixed(1)+"deg");},{passive:true});
fb.addEventListener("pointerleave",function(){[].forEach.call(fb.querySelectorAll(".f-ls.hov"),function(x){x.classList.remove("hov","down");x.style.removeProperty("--rx");x.style.removeProperty("--ry");});});
fb.addEventListener("pointerdown",function(e){var t=e.target&&e.target.closest?e.target.closest(".f-repo"):null,ls=t&&t.querySelector(".f-ls");if(ls)ls.classList.add("down");},{passive:true});
fb.addEventListener("pointerup",function(){[].forEach.call(fb.querySelectorAll(".f-ls.down"),function(x){x.classList.remove("down");});},{passive:true});

/* ---------- a sheet, as Fabrica's own (r112 sheet: its title, its lead, its options, one main key, the ✕ in its corner) ---------- */
var SHEET=null;
function sheet(title,lead){closeSheet();var wrap=el("div","f-sheet-wrap"),s=el("div","f-sheet");wrap.appendChild(s);s.innerHTML="<h3>"+esc(title)+"</h3>"+(lead?"<p>"+esc(lead)+"</p>":"");
  var x=el("button","f-x","✕");x.type="button";x.setAttribute("aria-label","Close");x.addEventListener("click",closeSheet);s.appendChild(x);
  wrap.addEventListener("click",function(e){if(e.target===wrap)closeSheet();});fb.appendChild(wrap);SHEET={wrap:wrap,box:s};return SHEET;}
function closeSheet(){if(SHEET){SHEET.wrap.remove();SHEET=null;}}
D.addEventListener("keydown",function(e){if(e.key==="Escape")closeSheet();});
function opt(ic,title,small,on){var b=el("button","f-opt",'<span class="ic">'+ic+"</span><span><b>"+esc(title)+"</b><small>"+esc(small)+"</small></span>");b.type="button";if(on)b.addEventListener("click",on);return b;}
function endKey(sh,label,fn){var end=el("div","end"),k=el("button","f-btn pri",esc(label));k.type="button";k.addEventListener("click",fn);end.appendChild(k);sh.box.appendChild(end);return k;}
function picker(sh,items,on){var box=el("div","p3-pick"),chosen=0;items.forEach(function(it,i){var b=opt(it[0],it[1],it[2]);b.setAttribute("aria-pressed",i===0?"true":"false");if(it[3]===false){b.disabled=true;b.setAttribute("aria-pressed","false");}
    b.addEventListener("click",function(){if(b.disabled)return;chosen=i;[].forEach.call(box.children,function(c){c.setAttribute("aria-pressed",c===b?"true":"false");});if(on)on(i);});box.appendChild(b);});
  sh.box.appendChild(box);return function(){return chosen;};}

/* ---------- the invented world of the preview ---------- */
var ICON={mac:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M9 20h6M12 16.5V20"/></svg>',
  win:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M3 9h18M8 21h8"/></svg>',
  fire:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M10.5 18h3"/></svg>',
  ios:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 5.3h3"/></svg>',
  web:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17"/></svg>',
  gh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4 0 .6-.2.6-.5v-1.7c-2.4.5-2.9-1-2.9-1-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9.1 1.3.9 1.3.9.8 1.3 2 1 2.5.7.1-.6.3-1 .6-1.2-1.9-.2-3.9-1-3.9-4.2 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.3.9a8 8 0 0 1 4.2 0c1.6-1.1 2.3-.9 2.3-.9.5 1.2.2 2.1.1 2.3.5.6.9 1.4.9 2.3 0 3.3-2 4-3.9 4.2.3.3.6.8.6 1.6v2.4c0 .3.2.6.6.5A8.5 8.5 0 0 0 12 3.5z"/></svg>',
  runs:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="5.6"/><path d="M6.7 5.6v4.8L10.4 8z"/></svg>',
  book:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 3.5h4a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 0-1.5-1.5h-4z"/><path d="M13.5 3.5h-4A1.5 1.5 0 0 0 8 5v8a1.5 1.5 0 0 1 1.5-1.5h4z"/></svg>'};
/* her machines: the MacBook Pro she is at, the Mac mini and the HP laptop (her own words name them), and GitHub's, with her sign-in */
var MACHINES=[
  {k:"here",ic:ICON.mac,name:"This MacBook Pro",sub:"macOS 15, Apple silicon · you are at it",st:"ok",stw:"Ready",
    tools:[["Python 3.12",1],["PyInstaller 6",1],["Java 17",1],["Android tools",0,"for the Fire tablet: Android Studio, or its command-line tools"],["Xcode",0,"for the iPhone and iPad: from the App Store, about 12 GB"]],
    can:"Mac app and its kit"},
  {k:"mini",ic:ICON.mac,name:"Mac mini",sub:"macOS 15, Apple silicon · on your Wi-Fi, awake",st:"ok",stw:"Ready",
    tools:[["Python 3.12",1],["PyInstaller 6",1],["Java 17",1],["Android tools 34",1],["Xcode",0,"for the iPhone and iPad: from the App Store, about 12 GB"]],
    can:"Mac app, Fire tablet APK, and the Fire tablet's test device"},
  {k:"hp",ic:ICON.win,name:"HP laptop",sub:"Windows 11 · on your Wi-Fi, asleep since 15:02",st:"warn",stw:"Asleep",sleep:true,
    tools:[["Python 3.12",1],["PyInstaller 6",1],["Inno Setup 6",1],["WebView2",1]],
    can:"Windows app and its installer; a run waits until it wakes with Ingenium open"},
  {k:"gh",ic:ICON.gh,name:"GitHub's machines",sub:"macOS 14, Windows Server 2022, Ubuntu 24.04 · with your GitHub sign-in",st:"",stw:"Off until you sign in",
    tools:[["Xcode and the iPhone simulators",1],["Android tools",1],["Windows and Inno Setup",1],["Python",1]],
    can:"every device, the iPhone and iPad included; GitHub counts the minutes of a private repository's runs"}];
var MN={here:"this MacBook Pro",mini:"Mac mini",hp:"HP laptop",gh:"GitHub's machines",ghm:"GitHub's Mac",ghw:"GitHub's Windows",ghl:"GitHub's Linux"};
/* the runs: the newest first; #14 is running now */
function log(lines){return lines.map(function(l){return typeof l==="string"?{t:l}:l;});}
var RUNS=[
  {n:14,wf:"Build every device",why:"the release v3.2, kept by you",when:"Started 3 min ago",state:"run",jobs:[
    {k:"mac",name:"Mac",on:"mini",state:"ok",time:"3 min 12 s",steps:[["Get the project at v3.2","2 s"],["Python and the build tools","4 s"],["Build the app","2 min 41 s"],["Seal it and check its seal","9 s"],["Keep what it made","3 s"]],
      log:log(["Run 14 · Build every device · Mac","Machine: Mac mini (macOS 15.1, Apple silicon), on your Wi-Fi","Version: v3.2 (4b5d06a)","▸ Get the project at v3.2","  14 files, from the repository on your drive",
        "▸ Python and the build tools","  Python 3.12.7 · pywebview 5.3 · PyInstaller 6.11 (already on this machine)","▸ Build the app","  python3 -m PyInstaller quill_notes.spec --noconfirm","  Building BUNDLE Quill Notes.app","  Building BUNDLE Quill Notes.app completed successfully.",
        "▸ Seal it and check its seal","  codesign --verify --deep --strict \"Quill Notes.app\"","  Quill Notes.app: valid on disk",{t:"  Quill Notes.app: satisfies its Designated Requirement",c:"ok"},"▸ Keep what it made","  quill-notes-mac-3.2.zip · 18.2 MB, kept with this run",{t:"✓ Done in 3 min 12 s",c:"ok"}]),
      arts:[["quill-notes-mac-3.2.zip","18.2 MB · the Mac app, for Apple silicon and Intel"]]},
    {k:"win",name:"Windows",on:"hp",state:"run",time:"running",steps:[["Get the project at v3.2","3 s"],["Python and the build tools","6 s"],["Build the program","…"],["Make the installer",""],["Install it, open it, uninstall it",""],["Keep what it made",""]],
      log:log(["Run 14 · Build every device · Windows","Machine: HP laptop (Windows 11), on your Wi-Fi","Version: v3.2 (4b5d06a)","▸ Get the project at v3.2","  14 files, from the repository on your drive","▸ Python and the build tools","  Python 3.12.7 · PyInstaller 6.11 · Inno Setup 6.3",
        "▸ Build the program","  py -m PyInstaller quill_notes.spec --noconfirm"]),
      more:log(["  Analyzing quill_notes_app.py","  Building EXE from EXE-00.toc","  Building COLLECT COLLECT-00.toc completed successfully.","▸ Make the installer","  ISCC.exe quill_notes.iss","  Successful compile: Quill Notes Setup 3.2.exe (31.0 MB)",
        "▸ Install it, open it, uninstall it","  Installed for you in %LOCALAPPDATA%\\Programs\\Quill Notes","  In the Start menu and in Settings, Apps, as Quill Notes 3.2","  Opened, and it answered its self-test","  Uninstalled: the folder, the shortcuts and its Settings entry are gone",
        "▸ Keep what it made","  Quill Notes Setup 3.2.exe · 31.0 MB, kept with this run",{t:"✓ Done in 4 min 02 s",c:"ok"}]),
      arts:[["Quill Notes Setup 3.2.exe","31.0 MB · installs for you: Start menu, desktop, and Settings, Apps to uninstall"]]},
    {k:"fire",name:"Fire tablet",on:"mini",state:"ok",time:"4 min 05 s",steps:[["Get the project at v3.2","2 s"],["Java and the Android tools","11 s"],["Build the APK with Gradle","3 min 31 s"],["Sign it and check both signatures","14 s"],["Open it on the Fire HD 10 test device","7 s"]],
      log:log(["Run 14 · Build every device · Fire tablet","Machine: Mac mini (macOS 15.1), on your Wi-Fi","▸ Java and the Android tools","  Java 17.0.13 · Android tools 34.0.0","▸ Build the APK with Gradle","  ./gradlew assembleRelease","  BUILD SUCCESSFUL in 3m 29s",
        "▸ Sign it and check both signatures","  apksigner verify --verbose quill-notes-3.2.apk","  Verified using v1 scheme (JAR signing): true","  Verified using v2 scheme (APK Signature Scheme v2): true","▸ Open it on the Fire HD 10 test device","  Installed on the emulator; it opened and answered its self-test",{t:"✓ Done in 4 min 05 s",c:"ok"}]),
      arts:[["quill-notes-3.2.apk","9.8 MB · signed with your key; it installs over 3.1"]]},
    {k:"ios",name:"iPhone and iPad",on:"ghm",state:"wait",time:"waiting",steps:[["Waits for a Mac with Xcode",""]],
      log:log(["Run 14 · Build every device · iPhone and iPad","Waiting: this job needs a Mac with Xcode. Your Mac mini has none, so it goes to GitHub's Mac when the Windows job is done.","GitHub counts these minutes against your account; the IPA it makes comes back here, unsigned, as GitHub's always are."]),arts:[]},
    {k:"rel",name:"Make the release v3.2",on:"here",state:"wait",time:"after the others",after:true,steps:[["Gather what every job made",""],["Write the notes with your model",""],["Add every file to v3.2",""]],log:log(["Waits for the four jobs above."]),arts:[]}]},
  {n:13,wf:"Test on my machines",why:"a new version on night-reader",when:"Today, 15:40",state:"bad",time:"2 min 47 s",jobs:[
    {k:"mac",name:"Mac",on:"here",state:"ok",time:"1 min 02 s",steps:[["Get the project","1 s"],["Open it and run its self-test","58 s"]],log:log(["Run 13 · Test on my machines · Mac","Machine: this MacBook Pro","▸ Open it and run its self-test","  14 of 14 passed",{t:"✓ Done in 1 min 02 s",c:"ok"}]),arts:[]},
    {k:"win",name:"Windows",on:"hp",state:"bad",time:"2 min 47 s",steps:[["Get the project","2 s"],["Build the program","1 min 50 s"],["The reader keeps night mode after a restart","41 s"]],bad:2,
      log:log(["Run 13 · Test on my machines · Windows","Machine: HP laptop (Windows 11)","▸ Build the program","  Building COLLECT COLLECT-00.toc completed successfully.","▸ The reader keeps night mode after a restart","  Night mode chosen; Quill Notes closed and opened again",
        {t:"  ✗ The theme after the restart: expected \"night\", found \"day\"",c:"bad"},{t:"    at theme (app/reader.js:3)",c:"bad"},{t:"✗ Failed after 2 min 47 s",c:"bad"}]),arts:[["test-pictures-windows.zip","1.1 MB · the window before and after the restart"]]}]},
  {n:12,wf:"Build every device",why:"the release v3.1",when:"Tuesday, 11:12",state:"ok",time:"9 min 41 s",jobs:[]},
  {n:11,wf:"Check every night",why:"every night at 2:00",when:"Today, 02:00",state:"ok",time:"38 s",jobs:[]}];
var WFS=[
  {name:"Build every device",file:".github/workflows/build.yml",when:"A release tag (v3.2), or by hand",jobs:["Mac · Mac mini","Windows · HP laptop","Fire tablet · Mac mini","iPhone and iPad · GitHub's Mac","then: the release"],last:"#14 running"},
  {name:"Test on my machines",file:".github/workflows/test.yml",when:"A new version on any idea",jobs:["Mac · this MacBook Pro","Windows · HP laptop"],last:"#13 failed"},
  {name:"Check every night",file:".github/workflows/nightly.yml",when:"Every night at 2:00",jobs:["Safety and Fabrica's checks · this MacBook Pro"],last:"#11 passed"}];

/* ---------- Learn as you go: what each room is, its names on GitHub and in git, and why it matters ---------- */
var LEARN={
  "now-changes":["Changes","What you changed since the version you kept last, file by file, before you keep it.","Your uncommitted changes (in your working copy)","git status · git diff","You read your own changes before they become part of the app's history, and put back any you do not want."],
  "now-files":["Files","Every file of the app at the version shown.","The Code tab","git ls-files","The app is a set of files; here you see them all, as they were at any version."],
  "now-code":["Code","A file's text with its line numbers, and who changed each line and when.","Code, and Blame","git blame app/reader.js","When a line misbehaves, you see the version that wrote it, and why."],
  "story-history":["History","Every version you kept, newest first, each with what it changed and why.","Commits","git log","Nothing kept is ever lost: any version can be read, compared or opened as the app was."],
  "story-compare":["Compare","Any two versions side by side: what was added and what was taken out.","Compare","git diff v3.1 v3.2","Before a release, you see exactly what changed since the last one."],
  "story-releases":["Releases","A version you named for others, with everything made from it: an app for each device, and the kits to build them.","Releases, and their assets","git tag -a v3.2","A release is what you hand over: the same version, ready for every device, with its notes."],
  "plans-ideas":["Ideas","Work tried on the side, apart from the main line, so the main line stays sound.","Branches","git switch -c night-reader","You can try anything without risk; an idea joins the main line only when it is ready."],
  "plans-issues":["Issues","Things to fix or to add, each with its conversation, people, labels and a date.","Issues","(GitHub's own; git has none)","Every task is written down where the work is, and closed by the version that does it."],
  "plans-pulls":["Pull requests","An idea asking to join the main line: its versions, its changes and its review.","Pull requests","git merge night-reader","A second look before anything reaches the main line: by you, or by your own model."],
  "plans-projects":["Projects","A board of the work: to do, in progress, done.","Projects","(GitHub's own)","You see the whole of the work at once, and what is next."],
  "plans-wiki":["Wiki","The app's notes and guides, each page with its own history.","Wiki","(a repository of pages)","What you learn while building stays with the app."],
  "care-checks":["Checks","Fabrica's five checks on every version, and Safety: no secret left in the code, the parts used and their licences.","Checks, code scanning and secret scanning","(run by Fabrica on each version)","A fault is found when it is made, not when the app is in someone's hands."],
  "care-overview":["Overview","The app's activity: versions kept, ideas, issues and releases over time.","Insights","git shortlog","You see how the work is going, across weeks."],
  "care-settings":["Settings","The app's description, its labels, and the rules before the main line.","Settings, and branch protection rules","(GitHub's own)","Rules keep the main line sound: a review, or every check passed, before anything joins it."],
  "runs-runs":["Runs","Each time a workflow ran: on which machine, every step, its whole log, and the files it made.","Actions: workflow runs","(the workflow files in .github/workflows)","The building and testing of every device happens by itself, the same way each time, and nothing of it is forgotten."],
  "runs-workflows":["Workflows","Recipes of steps a machine follows when something happens: a release tag, a new version, a time of day.","Actions: workflows","on: push · jobs: · runs-on:","The same file runs on your own machines here and on GitHub's machines, as written."],
  "runs-machines":["Machines","The computers that run your workflows and test your apps: yours, and GitHub's when you choose.","Runners: self-hosted, and GitHub-hosted","(registered with Ingenium on each computer)","Your Mac mini and HP laptop build and test for you, with every log kept, and no minutes counted."]};
var ROOMLEARN={now:"now-changes",story:"story-history",plans:"plans-ideas",care:"care-checks",runs:"runs-runs"};
var LMODE=false;
var CAPS={room:{now:["Now","GitHub: the Code tab and your uncommitted changes"],story:["Story","GitHub: Commits, Compare and Releases"],plans:["Plans","GitHub: Branches, Issues, Pull requests, Projects and the Wiki"],runs:["Runs","GitHub: Actions"],care:["Care","GitHub: Checks, Insights and Settings"]},
  part:{test:["Test","GitHub: status checks · Fabrica's five, on this device"],ship:["Ship","GitHub: a release's assets · an app for each device"],copies:["Copies","git: clone, bundle · GitHub: download, fork"],ingenium:["Ingenium","GitHub: Copilot · here your own model, offline"]},
  text:{"Keep this version":["Keep this version","git commit"],"Put back":["Put back","git restore"],"Run ▸":["Run","opens the app as it is now"],"Make the chosen":["Make the chosen","a release's assets, made here"],"Test this version":["Test this version","Fabrica's checks"],
    "Run it now":["Run it now","GitHub: Run workflow (workflow_dispatch)"],"Re-run the failed job":["Re-run the failed job","GitHub: Re-run failed jobs"],"Explain this error":["Explain this error","your own model reads the log"],"Install on this Mac":["Install on this Mac","copies the app into Applications"],
    "Send to the Fire tablet":["Send to the Fire tablet","the tablet's Ingenium installs it"],"Build on…":["Build on…","GitHub: a workflow run on a runner"],"Add to the release v3.2":["Add to the release v3.2","GitHub: upload a release asset"]}};

/* ---------- the work: rooms and their views, as captured from Fabrica itself, and the new room, Runs ---------- */
var ROOMS={now:["changes","files","code"],story:["history","compare","releases"],plans:["ideas","issues","pulls","projects","wiki"],runs:["runs","workflows","machines"],care:["checks","overview","settings"]};
var SUBN={changes:"Changes",files:"Files",code:"Code",history:"History",compare:"Compare",releases:"Releases",ideas:"Ideas",issues:"Issues",pulls:"Pull requests",projects:"Projects",wiki:"Wiki",runs:"Runs",workflows:"Workflows",machines:"Machines",checks:"Checks",overview:"Overview",settings:"Settings"};
var cur={room:"now",sub:"changes",run:14,job:"win",lopen:{}},MK="now-changes";
function key(){return cur.room+"-"+cur.sub;}
function showMid(k){MK=k;var base=V[k]||V["care-checks"];M.innerHTML=base;
  if(!still())[].forEach.call(M.querySelectorAll(".f-pn-b"),function(b){b.style.animation="none";void b.offsetWidth;b.style.animation="";});
  dressRooms();if(cur.room==="runs")paintRuns();else dressMid(k);addLearnKey();requestAnimationFrame(function(){thumbs(M);});}
/* the room key for Runs, made as the others are (r112 .fr-room), after Plans */
function dressRooms(){var bar=M.querySelector("#fbRooms");if(!bar)return;var care=bar.querySelector('.fr-room[data-room="care"]');
  bar.classList.add("p3-five");
  if(care&&!bar.querySelector('[data-room="runs"]')){var b=care.cloneNode(true);b.setAttribute("data-room","runs");b.title="Your workflows, run on your own machines or on GitHub's: every step, every log, every file they make.";
    b.innerHTML=ICON.runs+"<span>Runs</span><span class=\"fr-n\">1</span>";bar.insertBefore(b,care);}
  [].forEach.call(bar.querySelectorAll(".fr-room"),function(b){b.setAttribute("aria-pressed",b.getAttribute("data-room")===cur.room?"true":"false");});
  var seg=M.querySelector("#fbViews");if(!seg)return;
  [].forEach.call(seg.querySelectorAll("button[data-v]"),function(b){var v=b.getAttribute("data-v");var mine=ROOMS[cur.room].indexOf(v)>=0;if(mine)b.removeAttribute("hidden");else b.setAttribute("hidden","");b.setAttribute("aria-selected",v===cur.sub?"true":"false");});
  if(cur.room==="runs"){[].forEach.call(seg.querySelectorAll("button[data-v]"),function(b){b.setAttribute("hidden","");});
    ROOMS.runs.forEach(function(v){var b=seg.querySelector('button[data-v="'+v+'"]');if(!b){b=el("button",null,SUBN[v]+(v==="runs"?'<span class="n">1</span>':""));b.type="button";b.setAttribute("role","tab");b.setAttribute("data-v",v);seg.appendChild(b);}
      b.removeAttribute("hidden");b.setAttribute("aria-selected",v===cur.sub?"true":"false");});}}
function dressMid(k){if(k==="story-releases")paintReleases();}
/* Learn: a key at the end of the room's lead line opens what the room is, its names on GitHub and in git, and why it matters */
function addLearnKey(){var says=M.querySelector("#fbRoomSays");if(!says||says.querySelector(".p3-learnk"))return;var lk=LEARN[key()];if(!lk)return;
  if(cur.room==="runs")says.textContent=lk[1];
  var b=el("button","p3-learnk",ICON.book+"Learn");b.type="button";b.setAttribute("aria-expanded",cur.lopen[key()]?"true":"false");b.title="What this is, and its names on GitHub and in git";
  b.addEventListener("click",function(e){e.stopPropagation();cur.lopen[key()]=!cur.lopen[key()];showMid(key());});says.appendChild(b);
  if(cur.lopen[key()]){var c=el("div","p3-lcard");c.innerHTML="<h4>"+esc(lk[0])+"</h4><p>"+esc(lk[1])+"</p><dl><dt>On GitHub</dt><dd>"+esc(lk[2])+"</dd><dt>In git</dt><dd><code>"+esc(lk[3])+"</code></dd><dt>Why it matters</dt><dd>"+esc(lk[4])+"</dd></dl>";
    var row=el("div","f-row"),sm=el("button","f-btn sm","Show me");sm.type="button";sm.addEventListener("click",function(e){e.stopPropagation();showMe();});row.appendChild(sm);
    var gl=el("button","f-btn quiet sm","Every word, side by side");gl.type="button";gl.addEventListener("click",function(e){e.stopPropagation();glossary();});row.appendChild(gl);c.appendChild(row);
    says.parentNode.insertBefore(c,says.nextSibling);}}
/* Show me: the room's own main key glows twice, softly */
function showMe(){var k=M.querySelector("#fbWorkFoot .f-btn.pri")||M.querySelector("#fbWorkFoot .f-btn")||M.querySelector("#fbWorkBody .f-btn")||M.querySelector("#fbWorkBody button");
  if(!k){say("This room's work is in the list below it.");return;}k.classList.remove("p3-show");void k.offsetWidth;k.classList.add("p3-show");k.scrollIntoView({block:"nearest"});say("This is the room's main key: "+txt(k)+".");}
function glossary(){var sh=sheet("Fabrica's words, GitHub's and git's","Fabrica's words are plain on purpose; this is what each is called on GitHub and in git, so you can read either.");
  var g=el("div","p3-gloss");g.innerHTML='<div class="h">Fabrica</div><div class="h">GitHub</div><div class="h">git, and what it means</div>';
  [["A version","A commit","git commit: a snapshot of every file, kept with its message"],["Keep this version","Commit","git commit -m \"…\""],["An idea","A branch","git switch -c night-reader: a line of work apart from main"],["The main idea","main (the default branch)","the line every release comes from"],
   ["Bring it in","Merge a pull request","git merge night-reader"],["A release","A release (a tag)","git tag -a v3.2: a version named for others"],["A package","A release asset","a file made from the version: an app, a kit"],["A run","A workflow run","one time a workflow ran, with its log"],
   ["A workflow","A workflow (GitHub Actions)",".github/workflows/build.yml: steps a machine follows"],["A machine","A runner","the computer a workflow runs on: yours, or GitHub's"],["What a run made","Artifacts","the files a run made, kept with it"],["Put back","Restore, revert","git restore, git revert"],
   ["A copy to work apart","A fork","a whole copy, with its history"],["The rules before main","Branch protection rules","what must pass before anything joins main"],["Safety","Secret scanning, licences","read in every version: no key left in the code"]].forEach(function(r){
    g.appendChild(el("b",null,esc(r[0])));g.appendChild(el("span",null,esc(r[1])));g.appendChild(el("code",null,esc(r[2])));});
  sh.box.appendChild(g);}
/* ---------- Runs ---------- */
function paintRuns(){var wb=M.querySelector("#fbWorkBody"),foot=M.querySelector("#fbWorkFoot");if(!wb)return;wb.innerHTML="";if(foot)foot.innerHTML="";var body=el("div","p3-pad");wb.appendChild(body);
  if(cur.sub==="runs"){if(cur.open)runDetail(body,foot);else runList(body,foot);}
  else if(cur.sub==="workflows")workflows(body,foot);else machines(body,foot);}
function mark(s){return '<span class="m '+(s==="ok"?"ok":s==="bad"?"bad":s==="run"?"run":"")+'">'+(s==="ok"?"✓":s==="bad"?"!":s==="run"?"":"○")+"</span>";}
function runList(body,foot){var box=el("div","p3-rb");
  RUNS.forEach(function(r){var b=el("button","p3-run");b.type="button";var on=r.jobs.length?r.jobs.filter(function(j){return !j.after;}).map(function(j){return MN[j.on];}).filter(function(v,i,a){return a.indexOf(v)===i;}).join(" · "):"this MacBook Pro";
    b.innerHTML=mark(r.state)+"<b>"+esc(r.wf)+" · #"+r.n+"</b><small>"+esc(r.why)+" · "+esc(on)+"</small><span class=\"w\"><span class=\"f-chip"+(r.state==="ok"?" ok":"")+"\">"+(r.state==="run"?"Running":r.state==="bad"?"Failed":"Passed")+"</span>"+esc(r.state==="run"?r.when:(r.when+" · "+r.time))+"</span>"+(r.state==="run"?'<span class="p3-bar"><i style="width:'+runProgress()+'%"></i></span>':"");
    b.addEventListener("click",function(){cur.open=r.n;cur.run=r.n;cur.job=r.n===13?"win":(r.n===14?"win":"mac");if(!r.jobs.length){say("In the app: run #"+r.n+" opens with every job, step and log, kept until you remove it.");cur.open=null;return;}paintRuns();});box.appendChild(b);});
  body.appendChild(box);
  body.appendChild(el("p","f-hint","Every run is kept with its whole log and every file it made, on your drive, until you remove it: no expiry, and no minutes counted on your own machines."));
  if(foot){foot.appendChild(fkey("pri","Run a workflow",function(){runSheet(WFS[0]);}));foot.appendChild(fkey("","Machines",function(){cur.sub="machines";showMid(key());}));}}
function fkey(cls,label,fn){var b=el("button","f-btn"+(cls?" "+cls:""),esc(label));b.type="button";b.addEventListener("click",function(e){e.stopPropagation();fn();});return b;}
function runProgress(){var r=RUNS[0],done=r.jobs.filter(function(j){return j.state==="ok";}).length,tot=r.jobs.length;return Math.round(100*(done+(LIVE.i/(LIVE.max||1))*.9)/tot);}
function runDetail(body,foot){var r=RUNS.filter(function(x){return x.n===cur.open;})[0];if(!r){cur.open=null;return paintRuns();}
  var head=el("div","p3-runhead");head.innerHTML="<div><h4>"+esc(r.wf)+" · #"+r.n+"</h4><small>"+esc(r.why)+" · "+esc(r.when)+(r.time&&r.state!=="run"?" · "+esc(r.time):"")+"</small></div>";
  var hk=el("div","k");hk.appendChild(fkey("sm quiet","All runs",function(){cur.open=null;paintRuns();}));
  if(r.state==="run")hk.appendChild(fkey("sm","Stop",function(){say("In the app: the run stops after the step each machine is on; what was made so far is kept.");}));
  if(r.state==="bad")hk.appendChild(fkey("sm pri","Re-run the failed job",function(){say("Run #13's Windows job starts again on the HP laptop, from its first step.");}));
  head.appendChild(hk);body.appendChild(head);
  var jobs=el("div","p3-jobs");r.jobs.forEach(function(j){var b=el("button","p3-job"+(j.after?" after":""));b.type="button";b.setAttribute("aria-pressed",j.k===cur.job?"true":"false");
    b.innerHTML=mark(j.state)+"<b>"+esc(j.name)+"</b><small>"+esc(MN[j.on]||j.on)+" · "+esc(j.time)+"</small>";b.addEventListener("click",function(){cur.job=j.k;paintRuns();});jobs.appendChild(b);});
  body.appendChild(jobs);
  var j=r.jobs.filter(function(x){return x.k===cur.job;})[0]||r.jobs[0];
  var steps=el("div","p3-steps");j.steps.forEach(function(s,i){var st=j.state==="ok"?"ok":j.state==="bad"?(i<j.bad?"ok":i===j.bad?"bad":""):j.state==="run"?(s[1]&&s[1]!=="…"?"ok":s[1]==="…"?"run":""):"";
    var d=el("div","p3-step");d.innerHTML=mark(st)+"<span>"+esc(s[0])+"</span><time>"+esc(s[1]||"")+"</time>";steps.appendChild(d);});body.appendChild(steps);
  var lg=el("div","p3-log");lg.innerHTML='<div class="lh"><span>The whole log</span><input type="search" placeholder="Find in the log" aria-label="Find in the log"></div>';var pre=el("pre");lg.appendChild(pre);
  var lines=j.log.slice();if(j.k==="win"&&r.n===14)lines=lines.concat(j.more.slice(0,LIVE.i));
  lines.forEach(function(l,i){var s=el("span",l.c||null,"<i>"+(i+1)+"</i>"+esc(l.t));pre.appendChild(s);});body.appendChild(lg);
  var inp=lg.querySelector("input");inp.addEventListener("input",function(){var q=inp.value.trim().toLowerCase();[].forEach.call(pre.children,function(s){s.classList.toggle("hit",!!q&&s.textContent.toLowerCase().indexOf(q)>=0);});});
  requestAnimationFrame(function(){pre.scrollTop=pre.scrollHeight;});
  if(j.state==="bad"){var ex=el("div","p3-explain");ex.id="p3Explain";body.appendChild(ex);var kx=fkey("sm","Explain this error",function(){explain(ex);});ex.appendChild(el("span",null,"The step "));ex.innerHTML="<b>The reader keeps night mode after a restart: failed</b>Your own model can read the log and the code it names, on this computer, and say what went wrong.";ex.appendChild(el("div",null,"")).appendChild(kx);}
  if(j.arts&&j.arts.length){body.appendChild(el("span","f-lab","What it made"));var arts=el("div","p3-arts");j.arts.forEach(function(a){var row=el("div","p3-art","<b>"+esc(a[0])+"</b><small>"+esc(a[1])+" · kept with run #"+r.n+"</small>");var k=el("div","k");
      if(r.n===14)k.appendChild(fkey("sm","Add to the release v3.2",function(){say(a[0]+" is added to the release v3.2, under its device.");}));k.appendChild(fkey("sm quiet","Save",function(){say("In the app: "+a[0]+" is saved where you choose.");}));row.appendChild(k);arts.appendChild(row);});body.appendChild(arts);}
  if(foot){foot.appendChild(fkey("","The workflow's file",function(){say("In the app: .github/workflows/"+(r.n===13?"test":"build")+".yml opens in Code.");}));foot.appendChild(fkey("quiet","All runs",function(){cur.open=null;paintRuns();}));}}
var TYPE=0;
function explain(box){clearInterval(TYPE);box.innerHTML="<b>What went wrong, by Magister, on this computer</b>";var p=el("div");box.appendChild(p);
  var t="The test chose night, closed Quill Notes and opened it again. At the start, app/reader.js line 3 asks Windows first, and Windows was in day mode, so the saved choice was never read. Read the saved choice first and ask the system only when there is none: swap lines 2 and 3. Nothing else in the run is affected. (In this preview, an example.)";
  if(still()){p.textContent=t;return;}var i=0;TYPE=setInterval(function(){i+=4;p.textContent=t.slice(0,i);if(i>=t.length)clearInterval(TYPE);},18);}
/* the running run: the Windows job's log grows, softly, and the job finishes; then GitHub's Mac takes the iPhone and iPad job */
var LIVE={i:0,max:0,t:0};
function live(){var r=RUNS[0],j=r.jobs[1];LIVE.max=j.more.length;clearInterval(LIVE.t);if(still()){LIVE.i=LIVE.max;finishWin();return;}
  LIVE.t=setInterval(function(){if(LIVE.i>=LIVE.max){clearInterval(LIVE.t);finishWin();return;}LIVE.i++;
    if(cur.room==="runs"&&cur.sub==="runs"){if(cur.open===14&&cur.job==="win"){var pre=M.querySelector(".p3-log pre");if(pre){var l=j.more[LIVE.i-1];pre.appendChild(el("span",l.c||null,"<i>"+(pre.children.length+1)+"</i>"+esc(l.t)));pre.scrollTop=pre.scrollHeight;}
        var st=M.querySelectorAll(".p3-step");if(LIVE.i===3&&st[2])st[2].innerHTML=mark("ok")+"<span>Build the program</span><time>1 min 54 s</time>";if(LIVE.i>=3&&LIVE.i<6&&st[3])st[3].innerHTML=mark("run")+"<span>Make the installer</span><time>…</time>";}
      else if(!cur.open){var bar=M.querySelector(".p3-run .p3-bar i");if(bar)bar.style.width=runProgress()+"%";}}},1500);}
function finishWin(){var r=RUNS[0],j=r.jobs[1];j.state="ok";j.time="4 min 02 s";j.steps=[["Get the project at v3.2","3 s"],["Python and the build tools","6 s"],["Build the program","1 min 54 s"],["Make the installer","38 s"],["Install it, open it, uninstall it","1 min 08 s"],["Keep what it made","4 s"]];
  r.jobs[3].state="run";r.jobs[3].time="started on GitHub's Mac";r.jobs[3].steps=[["Get the project at v3.2","2 s"],["Xcode 16: build for the iPhone and iPad","…"],["Make the IPA (unsigned)",""],["Open it on the iPhone 16 simulator",""]];
  r.jobs[3].log=log(["Run 14 · Build every device · iPhone and iPad","Machine: GitHub's Mac (macOS 14, Xcode 16), with your sign-in","▸ Get the project at v3.2","▸ Xcode 16: build for the iPhone and iPad","  xcodebuild -scheme QuillNotes -sdk iphoneos CODE_SIGNING_ALLOWED=NO archive"]);
  if(cur.room==="runs")paintRuns();say("Windows: the installer is made, installed, opened and uninstalled on the HP laptop. The iPhone and iPad job goes to GitHub's Mac.");}
function workflows(body,foot){var box=el("div","p3-wfs");
  WFS.forEach(function(w){var c=el("div","p3-wf");c.innerHTML='<div class="top"><b>'+esc(w.name)+'</b><span class="f-chip'+(/passed/.test(w.last)?" ok":"")+'">'+esc(w.last)+"</span></div><code>"+esc(w.file)+"</code><small>When: "+esc(w.when)+"</small>";
    var on=el("div","on");w.jobs.forEach(function(x){on.appendChild(el("span","f-chip",esc(x)));});c.appendChild(on);
    var k=el("div","f-row");k.style.cssText="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px";k.appendChild(fkey("sm pri","Run it now",function(){runSheet(w);}));k.appendChild(fkey("sm quiet","Its file",function(){say("In the app: "+w.file+" opens in Code. It is a plain GitHub Actions file: GitHub runs it as written too.");}));c.appendChild(k);box.appendChild(c);});
  body.appendChild(box);body.appendChild(el("p","f-hint","The same files run on GitHub's machines when you send the repository there: Fabrica reads them as GitHub does, and runs each job on the machine you choose."));
  if(foot){foot.appendChild(fkey("pri","New workflow, from a recipe",recipes));}}
function recipes(){var sh=sheet("A new workflow","Start from a recipe; it is written as a file in .github/workflows, which you can read and change, and keep as a version.");
  var g=picker(sh,[["▣","Build every device","The Mac app, the Windows installer, the APK and the IPA, each on the machine that can make it; then the release"],["✓","Test on my machines","Open the app on each machine and run its own self-test, at every new version"],
    ["◆","Make a release when I tag","A tag such as v3.3 builds every device and makes the release, with notes by your model"],["☾","Check every night","Fabrica's checks and Safety, at 2:00, on this MacBook Pro"],["＋","Begin from nothing","An empty workflow, with a guide in its first lines"]]);
  endKey(sh,"Make it",function(){var n=["build.yml","test.yml","release.yml","nightly.yml","new.yml"][g()];closeSheet();say(".github/workflows/"+n+" is written, as a change waiting to be kept in Now, Changes.");});}
function runSheet(w){var sh=sheet("Run "+w.name,"Choose where each job runs. Your own machines count no minutes; GitHub's run with your sign-in and count the minutes of a private repository.");
  var g=picker(sh,[["▣","As the workflow says","Mac and Fire tablet on the Mac mini, Windows on the HP laptop (it waits until the laptop wakes), the iPhone on GitHub's Mac"],
    ["⌂","Only on my own machines","The iPhone and iPad job waits for a Mac with Xcode: install Xcode on the Mac mini first"],["◇","Only on GitHub's machines","Every job on GitHub; logs and files come back here"]]);
  endKey(sh,"Run it now",function(){closeSheet();RUNS.unshift({n:15,wf:w.name,why:"started by you, by hand",when:"Just now",state:"run",jobs:[]});cur.room="runs";cur.sub="runs";cur.open=null;showMid(key());say("Run #15 starts: "+["as the workflow says","on your own machines","on GitHub's machines"][g()]+".");});}
function machines(body,foot){var box=el("div","p3-mcs");
  MACHINES.forEach(function(m){var c=el("div","p3-mc"+(m.sleep?" sleep":""));c.innerHTML='<span class="ic">'+m.ic+"</span><div><b>"+esc(m.name)+"</b><small>"+esc(m.sub)+'</small></div><span class="f-chip st'+(m.st==="ok"?" ok":"")+'">'+esc(m.stw)+"</span>";
    /* what it has, two to a row; what it lacks, one to a row with how to add it */
    var tl=el("div","p3-tools"),tm=el("div","p3-tools miss");m.tools.forEach(function(t){var d=el("div","p3-tool "+(t[1]?"ok":"no"),"<i>"+(t[1]?"✓":"○")+"</i><span>"+esc(t[0])+(t[2]?": "+esc(t[2]):"")+"</span>");(t[1]?tl:tm).appendChild(d);});c.appendChild(tl);if(tm.children.length)c.appendChild(tm);
    c.appendChild(el("div","can","<b>Builds:</b> "+esc(m.can)));var k=el("div","k");
    if(m.k==="gh")k.appendChild(fkey("sm","Sign in to GitHub",function(){say("In the app: GitHub's own sign-in page opens in your browser; Fabrica keeps the key in this computer's keychain.");}));
    else{k.appendChild(fkey("sm","Check it again",function(){say(m.name+": every tool checked again just now.");}));if(m.tools.some(function(t){return !t[1];}))k.appendChild(fkey("sm quiet","How to add what is missing",function(){say(m.tools.filter(function(t){return !t[1];}).map(function(t){return t[0]+": "+t[2];}).join(". ")+".");}));}
    c.appendChild(k);box.appendChild(c);});
  body.appendChild(box);
  body.appendChild(el("span","f-lab","Test devices (phase 4)"));var td=el("div","p3-arts");
  [["Fire HD 10, an emulator","on the Mac mini · ready"],["iPhone 16 and iPad, simulators","need Xcode on a Mac, or GitHub's Mac"],["Windows 11","the HP laptop itself"],["This MacBook Pro","the Mac app, opened as you would"]].forEach(function(t){var row=el("div","p3-art","<b>"+esc(t[0])+"</b><small>"+esc(t[1])+"</small>"),k=el("div","k");k.appendChild(fkey("sm","Open v3.2 on it",function(){say("In phase 4: v3.2 opens on "+t[0].replace(/, .*$/,"")+"; its self-test runs and its pictures are kept with the run.");}));row.appendChild(k);td.appendChild(row);});
  body.appendChild(td);
  if(foot){foot.appendChild(fkey("pri","Add a machine",function(){var sh=sheet("Add a machine","On the other computer, open Ingenium, then Settings, Your devices, and turn on Lend to my devices. It shows here with its tools, checked.");sh.box.appendChild(el("p","f-hint","Your Mac mini and HP laptop pair once with the code this computer shows, as your devices do for models (6.81)."));endKey(sh,"Done",closeSheet);}));}}
/* ---------- Story, Releases: every device in one release ---------- */
function paintReleases(){var body=M.querySelector("#fbWorkBody"),foot=M.querySelector("#fbWorkFoot");if(!body)return;body.innerHTML="";var rels=el("div","p3-pad");body.appendChild(rels);
  var c=el("div","p3-rel");c.innerHTML='<div class="rh"><span class="tag">v3.2</span><h4>French for the guide</h4><span class="f-chip ok"><span class="d"></span>Latest</span></div><div class="meta">Today, 16:26 · 4b5d06a · tested on 3 machines · notes by Magister</div><ul><li>The guide in French.</li><li>The export keeps its fonts.</li><li>A reader for long notes.</li></ul>';
  var DEV=[["mac","Mac (Apple silicon and Intel)",[["Quill Notes.app","18.4 MB · made here in 6 s, sealed; also built on the Mac mini in run #14",[["Install on this Mac","install"],["Save","save"]]],["The Mac kit","7.6 MB · builds in Terminal (Build Mac App.command), on one of your machines, or on GitHub",[["Build on…","build:mac"],["Save","save"]]]]],
    ["win","Windows",[["Quill Notes Setup 3.2","31.0 MB · installs for you: Start menu, desktop, and Settings, Apps to uninstall",[["Send to the HP laptop","sendwin"],["Save","save"]]],["Quill Notes, one file","29.6 MB · opens as it is, with nothing to install",[["Save","save"]]],["The Windows kit","7.9 MB · builds in PowerShell (Build Quill Notes.ps1), on the HP laptop, or on GitHub",[["Build on…","build:win"],["Save","save"]]]]],
    ["fire","Fire tablet",[["quill-notes-3.2.apk","9.8 MB · signed here with your key; it installs over 3.1",[["Send to the Fire tablet","sendfire"],["Save","save"]]],["The Fire tablet kit","6.1 MB · builds with Gradle in Terminal, on the Mac mini, or on GitHub",[["Build on…","build:fire"],["Save","save"]]]]],
    ["ios","iPhone and iPad",[["In Ingenium on your iPhone","no signing needed: it opens inside Ingenium, offline",[["Send to the iPhone","sendios"]]],["QuillNotes-3.2.ipa","12.6 MB · unsigned: Sideloadly or AltStore signs it with your Apple ID as it installs it",[["Save","save"]]],["The Xcode project","needs Xcode on a Mac, or GitHub's Mac",[["Build on…","build:ios"]]]]],
    ["web","Web and one page",[["Quill Notes, one page (.html)","3.1 MB · the whole app in one file, for any browser",[["Save","save"]]],["Quill Notes, web app (.zip)","3.3 MB · installs from a browser and works offline",[["Save","save"]]]]]];
  DEV.forEach(function(d){var row=el("div","p3-dev");row.innerHTML='<span class="ic">'+ICON[d[0]]+"</span><b>"+esc(d[1])+"</b>";var as=el("div","p3-assets");
    d[2].forEach(function(a){var r=el("div","p3-asset","<b>"+esc(a[0])+"</b><small>"+esc(a[1])+"</small>"),k=el("div","k");a[2].forEach(function(x,i){k.appendChild(fkey(i===0&&x[1]!=="save"?"sm":"sm quiet",x[0],function(){assetAct(x[1],a[0],d[0]);}));});r.appendChild(k);as.appendChild(r);});
    row.appendChild(as);c.appendChild(row);});
  rels.appendChild(c);
  var c2=el("div","p3-rel");c2.innerHTML='<div class="rh"><span class="tag">v3.3-beta</span><h4>Print in colour</h4><span class="f-chip">A pre-release</span></div><div class="meta">Today, 16:58 · 592d236 · not tested yet</div>';
  var none=el("div","p3-asset miss","<b>Nothing made yet</b><small>Test it, then make every device here, or run Build every device on your machines</small>");var nk=el("div","k");nk.appendChild(fkey("sm","Make every device",function(){say("In the app: the Mac app, the Windows installer, the APK, the IPA and the web packages are made here, one after another, and kept under v3.3-beta.");}));none.appendChild(nk);c2.appendChild(none);rels.appendChild(c2);
  if(foot){foot.innerHTML="";foot.appendChild(fkey("pri","Make the missing ones",function(){say("Every device of v3.2 is made: nothing is missing.");}));foot.appendChild(fkey("","Mark the version kept now as a release",function(){say("In the app: the newest version is named, as a release, with its notes.");}));}}
function assetAct(what,name,dev){if(what==="save"){say("In the app: "+name+" is saved where you choose.");return;}
  if(what==="install"){var sh=sheet("Install Quill Notes on this Mac","It goes into Applications, where Launchpad and Spotlight find it, with its own icon.");picker(sh,[["▣","Into Applications","Every account on this Mac can open it"],["⌂","Into my own Applications folder","Only you; no password asked"]]);
    sh.box.appendChild(el("p","f-hint","Made on this Mac, it opens as it is. A copy that came from another computer is asked about once by macOS: Control-click it, then Open."));
    endKey(sh,"Install and open it",function(){closeSheet();say("Quill Notes 3.2 is in Applications and open, with its own icon.");});return;}
  if(what==="sendwin"){var s2=sheet("Send Quill Notes Setup 3.2 to the HP laptop","Ingenium on the laptop receives it and opens the installer for you.");s2.box.appendChild(el("p","f-hint","The laptop is asleep: it is sent when it wakes with Ingenium open. The installer is not signed with a certificate, so Windows asks once (More info, then Run anyway); after that, Quill Notes is in the Start menu and in Settings, Apps, where it can be uninstalled."));
    endKey(s2,"Send it",function(){closeSheet();say("Quill Notes Setup 3.2 waits for the HP laptop; it goes as soon as the laptop wakes.");});return;}
  if(what==="sendfire"){var s3=sheet("Send Quill Notes 3.2 to the Fire tablet","Ingenium on the tablet receives it and asks you to install it.");s3.box.appendChild(el("p","f-hint","The first time, Fire OS asks you to let Ingenium install apps (Settings, Security and privacy, Apps from unknown sources). It installs over Quill Notes 3.1, because both carry your key."));
    endKey(s3,"Send it",function(){closeSheet();say("Sent: on the Fire tablet, Ingenium asks you to install Quill Notes 3.2.");});return;}
  if(what==="sendios"){var s4=sheet("Quill Notes in Ingenium on your iPhone","Ingenium on the iPhone keeps it among your apps and opens it inside itself, offline. No Apple ID and no signing are needed, because Ingenium is already installed.");
    s4.box.appendChild(el("p","f-hint","For an app of its own on the Home Screen, save the IPA and let Sideloadly or AltStore sign it with your Apple ID (a free Apple ID's apps stop opening after seven days, until installed again)."));
    endKey(s4,"Send it to the iPhone",function(){closeSheet();say("Quill Notes 3.2 is in Ingenium on your iPhone, under Your apps.");});return;}
  if(/^build:/.test(what)){var dv=what.split(":")[1],opts={mac:[["▣","Mac mini","Ready: Python 3.12 and PyInstaller 6"],["⌂","This MacBook Pro","Ready"],["◇","GitHub's Mac","With your sign-in; GitHub counts its minutes"]],
      win:[["▣","HP laptop","Ready: Python, PyInstaller and Inno Setup; asleep, so the run waits until it wakes"],["◇","GitHub's Windows","With your sign-in"],["⌂","This MacBook Pro","A Windows program is built on Windows",false]],
      fire:[["▣","Mac mini","Ready: Java 17 and the Android tools"],["◇","GitHub's Linux","With your sign-in"],["⌂","This MacBook Pro","Needs the Android tools first",false]],
      ios:[["◇","GitHub's Mac","Xcode 16, with your sign-in"],["▣","Mac mini","Needs Xcode first, from the App Store",false],["⌂","This MacBook Pro","Needs Xcode first",false]]}[dv];
    var s5=sheet("Build "+name.replace(/^The /,"the ")+" on","The kit is built as it would be in your terminal, step by step, with its whole log kept.");var g=picker(s5,opts);
    endKey(s5,"Build it",function(){var where=opts[g()][1];closeSheet();RUNS.unshift({n:15,wf:"Build "+{mac:"the Mac app",win:"the Windows installer",fire:"the APK",ios:"the IPA"}[dv],why:"v3.2, by you",when:"Just now",state:"run",jobs:[]});
      cur.room="runs";cur.sub="runs";cur.open=null;showMid(key());say("Run #15 builds "+name+" on "+where+": its log is in Runs.");});}}
/* ---------- the clicks in the work ---------- */
M.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("button,a,[role=button]");if(!b||!M.contains(b))return;
  if(b.classList.contains("fr-room")){var rm=b.getAttribute("data-room");if(ROOMS[rm]){cur.room=rm;cur.sub=ROOMS[rm][0];cur.open=null;showMid(key());}return;}
  if(b.hasAttribute("data-v")&&b.closest("#fbViews")){var v=b.getAttribute("data-v");if(ROOMS[cur.room].indexOf(v)>=0){cur.sub=v;cur.open=null;showMid(key());}return;}
  if(b.closest(".p3-learnk,.p3-lcard,.p3-rel,.p3-rb,.p3-runhead,.p3-jobs,.p3-arts,.p3-wfs,.p3-mcs,.p3-explain")||b.closest("#fbWorkFoot")&&cur.room==="runs")return;
  if(b.closest("#fbWorkFoot")&&MK==="story-releases")return;
  var t=txt(b).replace(/\s*\d+$/,"");if(b.tagName==="BUTTON"&&!b.closest(".f-seg"))say("In the app: "+t.toLowerCase()+".");});
/* ---------- Needs you, at the top of Your apps: every app's runs, dates, reviews and releases, newest first ---------- */
function dressLeft(){var list=L.querySelector("#fbRepos");if(!list||L.querySelector(".p3-needs"))return;var box=el("div","p3-needs");
  box.innerHTML='<div class="t">Needs you <span class="f-chip">5</span></div>';
  [["bad","quill-notes: a test failed","Test on my machines, #13 · Windows, on the HP laptop",function(){cur.room="runs";cur.sub="runs";cur.open=13;cur.job="win";showMid(key());}],
   ["run","quill-notes: Build every device is running","#14 · Mac and Fire tablet done; Windows building",function(){cur.room="runs";cur.sub="runs";cur.open=14;cur.job="win";showMid(key());}],
   ["due","quill-notes: v3.3 is due on Friday","2 issues of its milestone are open",function(){cur.room="plans";cur.sub="issues";cur.open=null;showMid(key());}],
   ["ok","harbour-garden: ready to ship","Tested; its Windows and Fire tablet packages are not made yet",function(){say("In the app: harbour-garden opens on Ship, its two missing packages chosen.");}],
   ["","ledger: a pull request waits for your review","Monthly totals by category",function(){say("In the app: ledger opens on that pull request, in Plans.");}]].forEach(function(n,i){var b=el("button","p3-need",'<span class="d '+n[0]+'"></span><span><b>'+esc(n[1])+"</b><small>"+esc(n[2])+"</small></span>");b.type="button";b.title=n[1]+": "+n[2];b.addEventListener("click",n[3]);if(i>2)b.classList.add("p3-hide","p3-later");box.appendChild(b);});
  /* three at once; the rest behind a key, so Your apps keeps its room */
  var more=el("button","more","2 more");more.type="button";more.addEventListener("click",function(){var shut=!!box.querySelector(".p3-later.p3-hide");[].forEach.call(box.querySelectorAll(".p3-later"),function(x){x.classList.toggle("p3-hide",!shut);});more.textContent=shut?"Fewer":"2 more";});box.appendChild(more);
  list.parentNode.insertBefore(box,list);}
/* ---------- Test and ship: one part at a time, as the app shows it; Ship says where each package is made ---------- */
var part="test",WHERE="here";
function showRight(p){part=p;RT.innerHTML=R.Test;[].forEach.call(RT.querySelectorAll(".fr-part"),function(b){var on=b.getAttribute("data-part")===p;b.setAttribute("aria-selected",on?"true":"false");b.tabIndex=on?0:-1;});
  [].forEach.call(RT.querySelectorAll('[id^="fbPartSec_"]'),function(s){s.classList.toggle("fr-off",s.id!=="fbPartSec_"+p);});
  if(p==="ship")dressShip();requestAnimationFrame(function(){thumbs(RT);});}
var MCH={apk:["Mac mini","GitHub's Linux"],ipa:["GitHub's Mac"],mac:["Mac mini","this MacBook Pro","GitHub's Mac"],win:["HP laptop","GitHub's Windows"],web:["made here only"],page:["made here only"],kits:["made here only"]};
function dressShip(){var sec=RT.querySelector("#fbPartSec_ship");if(!sec)return;var tg=sec.querySelector("#fbTargets");if(!tg)return;
  var w=el("div","p3-where"),seg=el("div","f-seg");seg.setAttribute("role","group");seg.setAttribute("aria-label","Where each package is made");seg.appendChild(el("span","f-thumb"));
  [["here","Here, in seconds"],["machine","On a machine, from its kit"]].forEach(function(x){var b=el("button",null,x[1]);b.type="button";b.setAttribute("aria-pressed",x[0]===WHERE?"true":"false");b.addEventListener("click",function(){WHERE=x[0];showRight("ship");});seg.appendChild(b);});
  w.appendChild(seg);w.appendChild(el("p","f-hint",WHERE==="here"?"Made on this computer with no tools: Ingenium carries the part of each app that needs a compiler, made once on GitHub's machines.":"Built from the app's own kit by your machines, as your terminal would build it, with the whole log kept in Runs."));tg.parentNode.insertBefore(w,tg);
  [].forEach.call(tg.querySelectorAll(".f-tg"),function(c){var k=c.getAttribute("data-k"),sm=c.querySelector("small");
    if(k==="win"&&sm)sm.textContent="Installs for you: the Start menu, the desktop, and Settings, Apps to uninstall it. Or one file that opens as it is.";
    if(WHERE==="machine"&&MCH[k]){var mc=el("div","p3-mchips");MCH[k].forEach(function(m){mc.appendChild(el("span","f-chip",esc(m)));});sm.parentNode.insertBefore(mc,sm.nextSibling);}});
  var mk=sec.querySelector("#fbMakeAll");if(mk&&WHERE==="machine")mk.textContent="Build the chosen on your machines";
  requestAnimationFrame(function(){thumbs(RT);});}
RT.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("button,[role=button]");if(!b||!RT.contains(b))return;
  if(b.classList.contains("fr-part")){showRight(b.getAttribute("data-part"));return;}
  if(b.closest(".p3-where"))return;
  if(b.id==="fbMakeAll"){if(WHERE==="machine"){cur.room="runs";cur.sub="runs";cur.open=14;cur.job="win";showMid(key());say("Build every device runs on your machines: run #14, in Runs.");}else say("In the app: the chosen packages are made here, one after another, and kept under Releases.");return;}
  if(b.classList.contains("f-tg")){b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")==="true"?"false":"true");return;}
  var t=txt(b);if(t)say("In the app: "+t.toLowerCase()+".");});
L.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("button");if(!b||!L.contains(b)||b.closest(".p3-needs"))return;
  if(b.classList.contains("f-repo")){if(/quill-notes/.test(txt(b))){cur.room="now";cur.sub="changes";cur.open=null;showMid(key());return;}say("In the app: "+txt(b).split(" ")[0]+" opens, and the tree above grows its versions.");return;}
  say("In the app: "+txt(b).toLowerCase()+".");});
/* ---------- Learning mode: point at any key in Fabrica and its names on GitHub and in git show beside it ---------- */
var cap=el("div","p3-cap");win.appendChild(cap);
function capFor(b){if(b.classList.contains("fr-room"))return CAPS.room[b.getAttribute("data-room")];if(b.classList.contains("fr-part"))return CAPS.part[b.getAttribute("data-part")];
  if(b.hasAttribute("data-v")){var lk=LEARN[cur.room+"-"+b.getAttribute("data-v")];if(lk)return [lk[0],"GitHub: "+lk[2]];}
  var t=txt(b).replace(/\s*\d+$/,"");return CAPS.text[t]||null;}
fb.addEventListener("pointerover",function(e){if(!LMODE)return;var b=e.target.closest&&e.target.closest("button,[role=tab],[role=button]");if(!b){cap.classList.remove("on");return;}var c=capFor(b);if(!c){cap.classList.remove("on");return;}
  var r=b.getBoundingClientRect(),wr=win.getBoundingClientRect(),s=scale();cap.innerHTML=esc(c[0])+"<span>"+esc(c[1])+"</span>";cap.style.left=Math.round((r.left-wr.left)/s)+"px";cap.style.top=Math.round((r.bottom-wr.top)/s+6)+"px";cap.classList.add("on");});
fb.addEventListener("pointerout",function(e){if(!e.relatedTarget||!fb.contains(e.relatedTarget))cap.classList.remove("on");});
var lmk=D.getElementById("learnKey");lmk.addEventListener("click",function(){LMODE=!LMODE;lmk.setAttribute("aria-pressed",LMODE?"true":"false");lmk.textContent=LMODE?"Learning mode on":"Learning mode";if(!LMODE)cap.classList.remove("on");else say("Learning mode: point at any key in Fabrica to see its names on GitHub and in git.");});
/* ---------- the tour keys above the window ---------- */
function go(room,sub,open,job){cur.room=room;cur.sub=sub;cur.open=open||null;if(job)cur.job=job;showMid(key());if(scroller)scroller.scrollTop=PANELS;}
[].forEach.call(D.querySelectorAll("[data-go]"),function(b){b.addEventListener("click",function(){var g=b.getAttribute("data-go").split(",");if(g[0]==="ship"){showRight("ship");if(scroller)scroller.scrollTop=PANELS;return;}go(g[0],g[1],g[2]?+g[2]:null,g[3]);});});
D.getElementById("againKey").addEventListener("click",function(){cur={room:"now",sub:"changes",run:14,job:"win",lopen:{}};WHERE="here";showMid("now-changes");showRight("test");if(scroller)scroller.scrollTop=PANELS;});
var PANELS=+(scroller&&scroller.getAttribute("data-panels"))||560;
dressLeft();showMid("now-changes");showRight("test");live();
if(scroller)scroller.scrollTop=PANELS;
W.addEventListener("load",function(){thumbs(fb);if(scroller)scroller.scrollTop=PANELS;});
W.__p3={state:function(){return {room:cur.room,sub:cur.sub,open:cur.open||null,job:cur.job,part:part,where:WHERE,lmode:LMODE,live:LIVE.i+"/"+LIVE.max,sheet:!!SHEET};},go:go,showRight:showRight};
})();
