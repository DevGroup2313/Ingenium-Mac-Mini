"""Fabrica's plan, stage 1: the live preview, made of Ingenium itself (capture_stage1.js took each step out of the running 7.46 page).

Each step is the real top bar, the real page and the real sheet over it, with the style rules, tokens and keyframes that draw them, in a
window scaled to the screen. Ingenium's own sound engine (build/modules/r176.js) and its seal (r104, r306) run in it, as in the approved
profiles preview, so keys sound and the seal turns as in the app. Pressing the key a step is about goes to the next step, as in the app;
any other key says, gently, that it is shown here and not run.
    python3 -I build_stage1.py <capture folder> <profiles preview html, for its three scripts> <out.html>"""
import json
import re
import sys
import html as H

cap, prof, out = sys.argv[1], sys.argv[2], sys.argv[3]
P = json.load(open(cap + "/parts.json", encoding="utf-8"))
S = P["scenes"]
ORDER = ["a-start", "b-pick", "c-branch", "d-session", "e-review", "f-pr", "g-session-pr", "h-fabrica", "i-chat-plus", "j-chat-repo"]
TITLES = {
    "a-start": ("Code", "Start from one of your apps"),
    "b-pick": ("A repository", "Fabrica's apps, or GitHub"),
    "c-branch": ("Its branches", "The session begins from the one you choose"),
    "d-session": ("The session", "Its own branch; Review and keep counts the changes"),
    "e-review": ("Review and keep", "Each file, its lines, the branch of its own"),
    "f-pr": ("Create pull request", "It waits in Fabrica for your yes"),
    "g-session-pr": ("Followed", "The session shows its pull request"),
    "h-fabrica": ("In Fabrica", "The pull request, under your Rules before main"),
    "i-chat-plus": ("Chat", "A repository, in the + menu"),
    "j-chat-repo": ("Chat reads it", "Its files, read by the model; Continue in Code"),
}
# the key each step is about: pressing it goes on, as it does in Ingenium
NEXT = {
    "a-start": '#modalBox [data-a="fabrica"]', "b-pick": "#r333List .cc-prow", "c-branch": "#r333Br .cc-prow",
    "d-session": "#r333Top", "e-review": "#r333Go", "f-pr": "#r333G2", "g-session-pr": "#r333Top",
    "h-fabrica": None, "i-chat-plus": ".r333-pm", "j-chat-repo": None,
}

prof_s = open(prof, encoding="utf-8").read()
scripts = re.findall(r"<script>(.*?)</script>", prof_s, re.S)
pick = lambda mark: [x for x in scripts if mark in x[:400]][0]
theme_js = pick("the bar's day and night")
sound_js = pick("Ingenium's own sound engine")
seal_js = pick("Ingenium's own seal, cut into its layers")
webkit_js = pick("in Safari's engine")
# r176's keys widened to this preview's keys (its own list stays, these come first)
sound_js, n = re.subn(r"KEYSEL='", "KEYSEL='.cc-prow,.cc-card,.pm-item,.ghx-keys .btn,.ghx-files .btn,#r333Top,.r333-tabs .btn,.pv-step,.pv-k,", sound_js, count=1)
assert n == 1, "r176's KEYSEL"

css = "\n".join(P["rules"]) + "\n" + "\n".join(P["frames"])
scenes_js = json.dumps({k: {"top": S[k]["top"], "page": S[k]["page"], "modal": S[k]["modal"], "note": S[k]["note"], "bodyClass": S[k]["bodyClass"],
                            "attrs": S[k]["bodyAttrs"], "htmlClass": S[k]["htmlClass"]} for k in ORDER})
steps = "".join('<button type="button" class="pv-step" data-i="%d"><b>%d</b><span>%s</span></button>' % (i, i + 1, H.escape(TITLES[k][0])) for i, k in enumerate(ORDER))

page = """<title>Fabrica Stage One</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
""" + css + """
/* the preview's own frame, in Ingenium's tokens: a guide above the window, its steps raised and alive */
/* one look, Ingenium's own by day (the app's tokens, captured with its parts), so the page sets its own ground and colours */
:root{color-scheme:light}
html,body{margin:0;background:var(--bg,#f4f1f8)}
.pv{max-width:1400px;margin:0 auto;padding-block:16px 40px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));box-sizing:border-box;font:14px/1.5 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);color:var(--ink-1,#221a2e)}
.pv h1{font:600 26px/1.2 "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;margin:4px 0 4px}
.pv .pv-lede{margin:0 0 12px;color:var(--ink-2,#4b3a6e);max-width:860px}
.pv-steps{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 10px}
.pv-step{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(34,26,46,.10);border-radius:12px;padding:7px 12px;cursor:pointer;font:600 12.5px/1.2 inherit;color:inherit;
  background:linear-gradient(180deg,#ffffff,#f6f2fb);box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  transition:transform .22s cubic-bezier(.34,1.45,.64,1),box-shadow .22s ease}
.pv-step b{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#f3f0f6;color:#4b3a6e;font-size:11px;box-shadow:inset 0 -1px 0 rgba(40,22,68,.12)}
.pv-step:hover{transform:translateY(-3px) rotate(-.4deg);box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12)}
.pv-step:active{transform:translateY(1px) scale(.98)}
.pv-step[aria-current="step"]{background:linear-gradient(180deg,#7348be,#5d37a1);border-color:#4b2a86;color:#fff}
.pv-step[aria-current="step"] b{background:rgba(255,255,255,.22);color:#fff}
.pv-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 12px}
.pv-note{flex:1 1 320px;margin:0;font-size:13.5px;color:var(--ink-2,#4b3a6e)}
.pv-k{border:1px solid #4b2a86;border-radius:10px;padding:8px 14px;font:600 13px/1 inherit;cursor:pointer;color:#fff;background:linear-gradient(180deg,#7348be,#5d37a1);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26),0 8px 14px rgba(52,24,100,.12);transition:transform .2s cubic-bezier(.34,1.45,.64,1)}
.pv-k.q{background:linear-gradient(180deg,#ffffff,#f6f2fb);color:#221a2e;border-color:rgba(34,26,46,.12);box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16)}
.pv-k:hover{transform:translateY(-3px)}.pv-k:active{transform:translateY(1px) scale(.98)}
.pv-frame{position:relative;width:100%;overflow:hidden;border-radius:18px;box-shadow:0 2px 0 rgba(40,22,68,.10),0 18px 40px -12px rgba(40,22,68,.30)}
.pv-win{position:absolute;left:0;top:0;width:1360px;height:860px;transform-origin:0 0;overflow:hidden;background:var(--bg,#f4f1f8)}
.pv-win .pv-page{position:absolute;left:0;right:0;top:0;bottom:0;overflow:auto;scrollbar-width:none}
.pv-win .pv-page::-webkit-scrollbar{display:none}
.pv-toast{position:absolute;left:50%;bottom:22px;transform:translateX(-50%) translateY(12px);opacity:0;transition:opacity .25s,transform .25s;z-index:2147483000;
  background:#2b2238;color:#fff;border-radius:12px;padding:9px 14px;font:13px/1.4 inherit;pointer-events:none}
.pv-toast.on{opacity:1;transform:translateX(-50%) translateY(0)}
/* the key a step is about is marked for the preview's own script only: no outline, no tint (her words: no purple shading) */
body[data-motion="minimal"] .pv-step,body[data-motion="minimal"] .pv-k{animation:none!important;transition:none!important}
@media (prefers-reduced-motion:reduce){.pv-step,.pv-k{transition:none}.pv-step:hover,.pv-k:hover{transform:none}}
@media (max-width:640px){.pv h1{font-size:21px}.pv-step span{display:none}}
</style>
<div class="pv">
  <h1>Fabrica, stage 1: one way of working on a repository</h1>
  <p class="pv-lede">Ingenium 7.46, as built and tested (17 checks pass). Every step below is Ingenium itself, taken out of the running app with an invented app, tide-clock. Press the key a step is about to go on, as you would in the app, or choose a step.</p>
  <div class="pv-steps" role="tablist" aria-label="The steps">""" + steps + """</div>
  <div class="pv-bar"><p class="pv-note" id="pvNote" role="status"></p><button type="button" class="pv-k q" id="pvPrev">Back</button><button type="button" class="pv-k" id="pvNext">Next</button></div>
  <div class="pv-frame" id="pvFrame"><div class="pv-win" id="pvWin"></div></div>
</div>
<script>""" + theme_js + """</script>
<script>""" + sound_js + """</script>
<script>
(function(){"use strict";
var SC=""" + scenes_js + """,ORDER=""" + json.dumps(ORDER) + """,TITLES=""" + json.dumps(TITLES) + """,NEXT=""" + json.dumps(NEXT) + """;
var D=document,win=D.getElementById("pvWin"),frame=D.getElementById("pvFrame"),note=D.getElementById("pvNote"),at=0,toastT=null;
function snd(r){try{if(window.IngSound)IngSound.play(r);}catch(e){}}
function fit(){var w=frame.clientWidth,s=Math.min(1,w/1360);win.style.transform="scale("+s+")";frame.style.height=Math.round(860*s)+"px";}
function toast(t){var x=win.querySelector(".pv-toast");if(!x){x=D.createElement("div");x.className="pv-toast";win.appendChild(x);}x.textContent=t;x.classList.add("on");clearTimeout(toastT);toastT=setTimeout(function(){x.classList.remove("on");},2200);}
function show(i,quiet){at=Math.max(0,Math.min(ORDER.length-1,i));var k=ORDER[at],s=SC[k];
  D.body.className=s.bodyClass||"";(s.attrs||[]).forEach(function(a){if(a[0]!=="data-motion")D.body.setAttribute(a[0],a[1]);});D.body.setAttribute("data-theme","day");
  /* the top bar once, so its seal keeps its own script (r104, r306); the page and the sheet over it change with each step */
  if(!win.querySelector(".pv-page"))win.innerHTML='<div class="pv-page"><div class="pv-top">'+SC[ORDER[0]].top+'</div><div class="pv-body"></div></div><div class="pv-modal"></div>';
  win.querySelector(".pv-body").innerHTML=s.page;win.querySelector(".pv-modal").innerHTML=s.modal||"";win.querySelector(".pv-page").scrollTop=0;
  [].forEach.call(D.querySelectorAll(".pv-step"),function(b,j){if(j===at)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");});
  note.textContent=(at+1)+" of "+ORDER.length+" · "+TITLES[k][1]+". "+s.note+".";
  D.getElementById("pvPrev").disabled=at===0;D.getElementById("pvNext").textContent=at===ORDER.length-1?"From the start":"Next";
  var sel=NEXT[k],t=null;if(sel){var all=[].slice.call(win.querySelectorAll(sel));t=k==="b-pick"?all.filter(function(x){return /tide-clock/.test(x.textContent);})[0]:k==="c-branch"?all.filter(function(x){return /^main/.test(x.textContent.trim());})[0]:all[0];}
  if(t)t.classList.add("pv-next");
  if(k==="h-fabrica"){var pg=win.querySelector(".pv-page"),pr=[].filter.call(win.querySelectorAll("#fb h2,#fb h3,#fb .h-title,#fb b"),function(x){return /Half-hour tides|half-hour/i.test(x.textContent);})[0];if(pr&&pg)pg.scrollTop=Math.max(0,pr.getBoundingClientRect().top-pg.getBoundingClientRect().top-120);}
  if(!quiet)snd(s.modal?"cards":"keys");}
win.addEventListener("click",function(e){var b=e.target.closest("button,a,[role=button],.cc-prow,.cc-card,.pm-item");if(!b)return;e.preventDefault();e.stopPropagation();
  if(b.classList.contains("pv-next")){snd("keys");show(at+1);return;}
  snd("keys");toast("Shown here, not run: in Ingenium this key does its work.");},true);
win.addEventListener("submit",function(e){e.preventDefault();},true);
[].forEach.call(D.querySelectorAll(".pv-step"),function(b){b.onclick=function(){show(+b.getAttribute("data-i"));};});
D.getElementById("pvPrev").onclick=function(){show(at-1);};D.getElementById("pvNext").onclick=function(){show(at===ORDER.length-1?0:at+1);};
D.addEventListener("keydown",function(e){if(e.key==="ArrowRight")show(at+1);if(e.key==="ArrowLeft")show(at-1);});
window.addEventListener("resize",fit);fit();show(0,true);})();
</script>
<script>""" + seal_js + """</script>
<script>""" + webkit_js + """</script>
"""
open(out, "w", encoding="utf-8").write(page)
print("wrote", out, len(page), "bytes", len(P["rules"]), "rules")
