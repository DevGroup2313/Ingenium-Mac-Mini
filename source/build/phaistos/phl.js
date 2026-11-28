/* Phaistos's layered logo (28 November 2026). Her words on the second round: "I like the Golden tripod, the Phaistos disc, the Minoan
   column, and the Carved Phi ... but they look plain and fake and does not have my apps true 3D animated popped out layered depth look
   and effect ... please redo them." So each logo is cut into layers, as her apps' seals are (Ingenium's r104): every part on its own
   layer at its own depth, a solid edge where a part has thickness, each layer casting its shadow on the ones beneath; the whole leans
   toward the pointer and sways slowly at rest, so the layers slide past one another; it lifts under the pointer and sinks when pressed.
   PHL.make(logo) gives the element; PHL.css is its look. Every layer shares one 120 by 120 drawing, so they stand in register at rest. */
(function (W) {
  "use strict";
  var D = W.document, N = 0;
  var CSS = [
    ".phl{position:relative;display:inline-block;vertical-align:middle;width:var(--S,44px);height:var(--S,44px);perspective:calc(var(--S,44px)*4);",
    "  --rx:0deg;--ry:0deg;--cdl:0px;--cds:1;-webkit-tap-highlight-color:transparent;flex:0 0 auto}",
    ".phl .phl-tilt{position:absolute;left:0;top:0;width:100%;height:100%;transform-style:preserve-3d;",
    "  transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--cdl)) scale(var(--cds));transition:transform .35s cubic-bezier(.2,.8,.2,1)}",
    ".phl .phl-idle{position:absolute;left:0;top:0;width:100%;height:100%;transform-style:preserve-3d;animation:phlSway 8s ease-in-out infinite}",
    ".phl .phl-cast{position:absolute;left:20%;right:20%;bottom:-1%;height:8%;border-radius:50%;background:rgba(48,48,40,.20);",
    "  filter:blur(calc(var(--S,44px)*.035));transform:translateZ(calc(var(--S,44px)*-.14));transition:opacity .35s ease,transform .35s ease}",
    /* each layer is drawn at twice its size and set down at half, so it stays crisp as it turns; its depth is kept in register at rest */
    ".phl .phl-layer{position:absolute;left:0;top:0;width:200%;height:200%;transform-origin:0 0;pointer-events:none;",
    "  transform:translate(calc(var(--S,44px)*.5),calc(var(--S,44px)*.5)) translateZ(calc(var(--S,44px)*var(--fz))) scale(calc(1 - var(--fz)/4)) translate(calc(var(--S,44px)*-.5),calc(var(--S,44px)*-.5)) scale(.5)}",
    ".phl .phl-layer>svg{display:block;width:100%;height:100%;overflow:visible}",
    ".phl .phl-layer.phl-lit>svg{filter:drop-shadow(calc(var(--S,44px)*var(--sx)) calc(var(--S,44px)*var(--sy)) calc(var(--S,44px)*var(--sb)) rgba(58,46,12,var(--so)))}",
    "@keyframes phlSway{0%,100%{transform:rotateY(-16deg) rotateX(4deg)}50%{transform:rotateY(16deg) rotateX(-4deg)}}",
    "@keyframes phlRise{0%{opacity:0;scale:.86}60%{opacity:1;scale:1.03}100%{opacity:1;scale:1}}",
    "@keyframes phlSeat{0%{transform:translate(calc(var(--S,44px)*.5),calc(var(--S,44px)*.5)) translateZ(0) scale(1) translate(calc(var(--S,44px)*-.5),calc(var(--S,44px)*-.5)) scale(.5)}}",
    "@keyframes phlKnock{0%{translate:0 calc(var(--S,44px)*.03)}45%{translate:0 calc(var(--S,44px)*-.035)}75%{translate:0 calc(var(--S,44px)*.008)}100%{translate:0 0}}",
    ".phl.hover{--cdl:calc(var(--S,44px)*-.03)}",
    ".phl.hover .phl-idle{animation-play-state:paused}",
    ".phl.hover .phl-cast{opacity:.7;transform:translateZ(calc(var(--S,44px)*-.14)) scale(.9)}",
    ".phl.down{--cdl:calc(var(--S,44px)*.045);--cds:.95}",
    ".phl.down .phl-tilt{transition-duration:.08s}",
    ".phl.down .phl-cast{opacity:1;transform:translateZ(calc(var(--S,44px)*-.14)) scale(1.05)}",
    ".phl.rise .phl-tilt{animation:phlRise .9s cubic-bezier(.2,.9,.25,1) both}",
    ".phl.rise .phl-layer{animation:phlSeat .9s cubic-bezier(.2,.9,.25,1) both}",
    ".phl.knock .phl-tilt{animation:phlKnock .55s cubic-bezier(.3,.7,.3,1)}",
    "@media (prefers-reduced-motion:reduce){.phl *{animation:none !important;transition:none !important}.phl .phl-idle{transform:rotateY(-10deg) rotateX(3deg)}}",
    "html body[data-motion=\"minimal\"] .phl *{animation:none !important}"
  ].join("\n");
  function uniq(svg) {
    var s = "-p" + (++N);
    return svg.replace(/id="([^"]+)"/g, function (m, i) { return 'id="' + i + s + '"'; })
              .replace(/url\(#([^)]+)\)/g, function (m, i) { return "url(#" + i + s + ")"; })
              .replace(/href="#([^"]+)"/g, function (m, i) { return 'href="#' + i + s + '"'; });
  }
  function still() { try { return W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } }
  function size(w) {
    try {
      var r = w.getBoundingClientRect(); if (r.width) w.style.setProperty("--S", r.width.toFixed(1) + "px");
    } catch (e) {}
  }
  function wire(w, host) {
    host = host || w;
    host.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse" && !still()) w.classList.add("hover"); });
    host.addEventListener("pointermove", function (e) {
      var r = w.getBoundingClientRect(); if (!r.width || e.pointerType !== "mouse" || still()) return;
      var x = Math.max(-.25, Math.min(1.25, (e.clientX - r.left) / r.width)), y = Math.max(-.25, Math.min(1.25, (e.clientY - r.top) / r.height));
      w.style.setProperty("--ry", ((x - .5) * 28).toFixed(1) + "deg"); w.style.setProperty("--rx", (-(y - .5) * 24).toFixed(1) + "deg");
    });
    host.addEventListener("pointerleave", function () { w.classList.remove("hover", "down"); w.style.setProperty("--rx", "0deg"); w.style.setProperty("--ry", "0deg"); });
    host.addEventListener("pointerdown", function () { w.classList.remove("knock"); if (!still()) w.classList.add("down"); });
    host.addEventListener("pointerup", function (e) {
      w.classList.remove("down"); if (e.pointerType !== "mouse") w.classList.remove("hover");
      if (!still()) { void w.offsetWidth; w.classList.add("knock"); clearTimeout(w.__k); w.__k = setTimeout(function () { w.classList.remove("knock"); }, 600); }
    });
    host.addEventListener("pointercancel", function () { w.classList.remove("down", "hover"); });
  }
  /* the shadow a layer casts on those beneath grows with its height above them */
  function lit(z) { var h = Math.max(0, z); return { sx: (h * .22 + .004).toFixed(4), sy: (h * .5 + .008).toFixed(4), sb: (h * .55 + .008).toFixed(4), so: Math.min(.34, .14 + h * 1.3).toFixed(3) }; }
  function make(L, opt) {
    opt = opt || {};
    var w = D.createElement("span"); w.className = "phl" + (opt.cls ? " " + opt.cls : ""); w.setAttribute("aria-hidden", "true");
    var h = '<span class="phl-tilt"><span class="phl-idle"><span class="phl-cast"></span>';
    (L.layers || []).forEach(function (ly) {
      var z = +ly.z || 0, s = lit(z), shade = ly.flat ? "" : " phl-lit";
      h += '<span class="phl-layer' + shade + '" style="--fz:' + z + ';--sx:' + s.sx + ';--sy:' + s.sy + ';--sb:' + s.sb + ';--so:' + s.so + '">' + uniq(ly.svg) + "</span>";
    });
    h += "</span></span>"; w.innerHTML = h;
    if (opt.size) w.style.setProperty("--S", opt.size + "px");
    else {
      try { if (typeof ResizeObserver === "function") new ResizeObserver(function () { size(w); }).observe(w); } catch (e) {}
      setTimeout(function () { size(w); }, 0);
    }
    if (opt.host !== false) wire(w, opt.host || w);
    if (opt.rise && !still()) { w.classList.add("rise"); setTimeout(function () { w.classList.remove("rise"); }, 950); }
    return w;
  }
  function style() { if (D.getElementById("phl-css")) return; var s = D.createElement("style"); s.id = "phl-css"; s.textContent = CSS; (D.head || D.documentElement).appendChild(s); }
  W.PHL = { css: CSS, make: make, wire: wire, style: style, uniq: uniq };
})(window);
