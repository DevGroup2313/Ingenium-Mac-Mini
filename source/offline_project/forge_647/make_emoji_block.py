"""Writes blocks/forge_emoji_win10.html: the Forge's side menu and side keys on Windows 10 with Microsoft's flat Fluent drawings
(build/emoji, MIT), as Ingenium's side keys have them (modules/r182.js).
usage: make_emoji_block.py"""
import base64, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
EMOJI = os.path.join(HERE, "..", "..", "build", "emoji")
MAP = {"✍": "writing_hand", "\U0001f5c4": "file_cabinet", "\U0001f5c3": "card_file_box", "\U0001f9f0": "toolbox",
       "\U0001f9ed": "compass", "\U0001f4c5": "calendar", "\U0001f3af": "bullseye", "\U0001f393": "graduation_cap",
       "\U0001f9ee": "abacus", "⚙": "gear",
       # the side keys, the same seven as Ingenium's (modules/r182.js)
       "\U0001f5d2": "spiral_notepad", "⏳": "hourglass_not_done", "\U0001f319": "crescent_moon", "☀": "sun",
       "\U0001f4ad": "thought_balloon", "\U0001f33f": "herb", "\U0001f514": "bell"}
pics = {k: "data:image/svg+xml;base64," + base64.b64encode(open(os.path.join(EMOJI, v + "_flat.svg"), "rb").read()).decode("ascii")
        for k, v in MAP.items()}
T = r'''<style id="forge-emo-css">
/* The Forge 647 (25 October 2026): the side menu and the side keys on Windows 10. The owner's words: "Windows 10 side emoji buttons have this
   harsh black outline over them that I detest and want removed, I want the emoji buttons to look the same way they look on
   Windows 11." On Windows 10 (and older), and only there, each room's emoji in the side menu, and each side key's (the notes,
   the thought, the leaf, the moon or the sun, the bell, the hourglass), is Microsoft's own flat Fluent drawing of it (MIT licence, THIRD_PARTY_NOTICES.txt), as Ingenium's side keys have them. The button keeps its name for screen
   readers; the picture says nothing. */
html.forge-emoji-pics img.forge-emo{display:inline-block;width:1em;height:1em;vertical-align:-0.125em;margin:0;border:0;pointer-events:none;-webkit-user-drag:none;user-select:none}
</style>
<script>
(function(){"use strict";
if(window.__forgeEmo)return;window.__forgeEmo=1;
var D=document,SEL=".nav-btn .rg,#sticky-fab>span,#cd-thought-fab .cd-thought-glyph,#forge-quiet-fab .forge-quiet-glyph,#cd-theme-fab>span,#reminders-fab .rem-fab-bell,#horo-fab>span";
var PIC=__PICS__;
function norm(t){return String(t||"").replace(/️/g,"").trim();}
function dress(span){var t=norm(span.textContent),src=PIC[t];if(!src)return;
  if(span.__fe===t&&span.querySelector("img.forge-emo"))return;span.__fe=t;span.setAttribute("data-emoji",t);
  var im=new Image();im.alt="";im.className="forge-emo";im.draggable=false;im.src=src;span.textContent="";span.appendChild(im);}
function all(){[].forEach.call(D.querySelectorAll(SEL),function(s){if(!s.querySelector("img.forge-emo")||norm(s.textContent))dress(s);});}
function windowsBefore11(){var ua=navigator.userAgent||"";if(!/Windows NT/.test(ua))return Promise.resolve(false);
  if(!/Windows NT 10\.0/.test(ua))return Promise.resolve(true);
  var d=navigator.userAgentData;if(!d||d.platform!=="Windows"||typeof d.getHighEntropyValues!=="function")return Promise.resolve(false);
  return d.getHighEntropyValues(["platformVersion"]).then(function(h){var major=parseInt(String(h&&h.platformVersion||"").split(".")[0],10);
    return isFinite(major)&&major<13;},function(){return false;});}
window.ForgeEmojiPics={on:false,_:{windowsBefore11:windowsBefore11,pics:PIC,all:all}};
windowsBefore11().then(function(yes){if(!yes)return;D.documentElement.classList.add("forge-emoji-pics");all();
  var q=0;try{new MutationObserver(function(){if(!q)q=requestAnimationFrame(function(){q=0;all();});}).observe(D.body,{childList:true,subtree:true,characterData:true});}catch(e){setInterval(all,2000);}
  window.ForgeEmojiPics.on=true;}).catch(function(){});
})();
</script>'''
open(os.path.join(HERE, "blocks", "forge_emoji_win10.html"), "w", encoding="utf-8").write(T.replace("__PICS__", json.dumps(pics, ensure_ascii=False)))
print("blocks/forge_emoji_win10.html:", len(pics), "pictures")
