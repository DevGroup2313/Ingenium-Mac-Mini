// The app icon: the layered seal standing still and facing, drawn by Chromium from the page's own CSS and SVG
const fs = require('fs');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const P = process.env.S + '/';
(async () => {
  const mod = fs.readFileSync(P + 'build/modules/r104.js', 'utf8');
  const islcss = mod.slice(0, mod.indexOf('</style>') + 8);
  const sealcss = fs.readFileSync(P + 'preview/seal_page.css', 'utf8');
  const svg = fs.readFileSync(P + 'preview/seal_head.svg', 'utf8');
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  for (const night of [false, true]) {
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:transparent}
${sealcss}
.isl.still .isl-idle,.isl.still .isl-ring>svg{animation:none !important}
.isl.still .seal-spin,.isl.still .seal-heart,.isl.still .seal-counter,.isl.still .s4-breath{animation:none !important}
.isl.still .isl-cast{display:none}
#h{position:absolute;left:37px;top:30px}
</style>${islcss}</head><body${night ? ' data-theme="night"' : ''} data-motion="full"><div id="h"></div><script>
var SVG=${JSON.stringify(svg)},N=0;
function where(n){var c=n.getAttribute("class")||"";if(n.tagName==="defs")return "all";if(/\\bseal-counter\\b/.test(c))return "ring";
  if(n.querySelector(".seal-spin"))return "star";if(n.querySelector(".seal-heart"))return "heart";return "back";}
function layer(svg,L){var c=svg.cloneNode(true);Array.prototype.slice.call(c.children).forEach(function(n){var w=where(n);if(w!=="all"&&w!==L)c.removeChild(n);});
  c.classList.remove("seal");var h=c.outerHTML,k="i"+(++N)+"_";Array.prototype.slice.call(c.querySelectorAll("[id]")).forEach(function(n){var id=n.id;h=h.split('id="'+id+'"').join('id="'+k+id+'"').split("url(#"+id+")").join("url(#"+k+id+")");});return h;}
var d=document.createElement("div");d.innerHTML=SVG;var svg=d.firstElementChild,w=document.createElement("span");w.className="isl still";w.style.setProperty("--S","950px");
w.innerHTML='<span class="isl-tilt"><span class="isl-idle"><span class="isl-cast"></span><span class="isl-edge"><i class="isl-base"></i></span>'+["back","ring","star","heart"].map(function(L){return '<span class="isl-layer isl-'+L+'">'+layer(svg,L)+'</span>';}).join("")+'</span></span>';
document.getElementById("h").appendChild(w);
</script></body></html>`;
    await page.setContent(html, { waitUntil: 'load' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: P + 'icon/new/seal1024_' + (night ? 'night' : 'day') + '.png', omitBackground: true });
    await page.close();
  }
  await browser.close();
})();
