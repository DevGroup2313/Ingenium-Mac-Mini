/* The Forge 644 · the page's own record of every animation frame while the Editor scrolls (read by wk_644_frames.py):
   where the preview, its frame and the box that scrolls are, the preview's height and transform, the measured height of
   the split (--forge-main-h), whether the Forge's loops are held, and every write to the style of the preview's chain. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var st = $('stage'), fr = $('frame'), sc = window.__scroller644 || $('cd-scroll');
  if (window.__rec644) window.__rec644.on = false;
  var R = window.__rec644 = { frames: [], writes: [], on: true, t0: performance.now(), heldMax: 0 };
  var root = document.documentElement;
  function snap() {
    var a = st.getBoundingClientRect(), b = fr.getBoundingClientRect(), s = sc.getBoundingClientRect();
    var held = window.__forgePreviewSteady ? window.__forgePreviewSteady.held() : -1;
    if (held > R.heldMax) R.heldMax = held;
    R.frames.push({ t: +(performance.now() - R.t0).toFixed(1), sc: sc.scrollTop, scT: s.top, top: a.top, h: a.height, l: a.left, w: a.width,
      ft: b.top, fh: b.height, tf: getComputedStyle(st).transform, mainH: root.style.getPropertyValue('--forge-main-h'), vh: innerHeight, held: held });
  }
  (function loop() { if (!R.on) return; try { snap(); } catch (e) { R.err = String(e); } requestAnimationFrame(loop); })();
  if (!window.__rec644Patched) {
    window.__rec644Patched = 1;
    var chain = new Map(); for (var n = st; n; n = n.parentElement) chain.set(n.style, n);
    var P = CSSStyleDeclaration.prototype;
    ['setProperty', 'removeProperty'].forEach(function (k) {
      var o = P[k];
      P[k] = function (a, b) {
        try { var el = chain.get(this); if (el && window.__rec644 && window.__rec644.on) window.__rec644.writes.push({ t: Math.round(performance.now() - window.__rec644.t0), el: el.id || el.tagName, a: a, b: b === undefined ? null : String(b).slice(0, 60) }); } catch (e) { }
        return o.apply(this, arguments);
      };
    });
  }
})();
