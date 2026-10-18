/* PASS 1052 · THE FRENCH LAYER, at the owner's word: "the Author Studio and the mini Forge do not translate to French;
   make Carpe Diem fully bilingual". Both were written in English only. This layer gives them their French without
   touching how they work: while the app is in French it puts each English line of their pages into French on the
   screen, and the moment the app returns to English it puts every line back exactly as it was. It translates only
   what is drawn (text, and the placeholder, title and label of a field), never what is typed into a field, never code,
   and never the page shown inside a preview. Its words come from three places, in this order: its own dictionary,
   the app's French for its curriculum and tour, and the app's own French dictionary. */
(function (W) {
  'use strict';
  if (W.CDFR) return;
  var DAYS = { Monday: 'lundi', Tuesday: 'mardi', Wednesday: 'mercredi', Thursday: 'jeudi', Friday: 'vendredi', Saturday: 'samedi', Sunday: 'dimanche' };
  var MONTHS = { January: 'janvier', February: 'février', March: 'mars', April: 'avril', May: 'mai', June: 'juin', July: 'juillet', August: 'août', September: 'septembre', October: 'octobre', November: 'novembre', December: 'décembre' };
  function pl(n, one, many) { return n + ' ' + (+n === 1 ? one : many); }
  function make(opt) {
    var D = opt.dict || {}, P = opt.patterns || [], ATTR = ['placeholder', 'title', 'aria-label'];
    var langFn = opt.lang || function () { try { return W.state && W.state.lang; } catch (e) { return 'en'; } };
    var extra = null;
    function fr() { try { return langFn() === 'fr'; } catch (e) { return false; } }
    /* the app's own French for what it already knows: its terms and modules, and its tour cards */
    function known() {
      if (extra) return extra;
      extra = {};
      try { if (opt.known) opt.known(extra); } catch (e) {}
      return extra;
    }
    function norm(t) { return String(t).replace(/\s+/g, ' ').trim(); }
    var cache = {};
    function look(k, depth) {
      if (!k) return null;
      if (Object.prototype.hasOwnProperty.call(cache, k)) return cache[k];
      var r = find(k, depth || 0);
      cache[k] = r; return r;
    }
    function find(k, depth) {
      if (Object.prototype.hasOwnProperty.call(D, k)) return D[k];
      var x = known(); if (Object.prototype.hasOwnProperty.call(x, k)) return x[k];
      for (var i = 0; i < P.length; i++) { var m = k.match(P[i][0]); if (m) { var v = typeof P[i][1] === 'function' ? P[i][1](m, sub) : k.replace(P[i][0], P[i][1]); if (v != null) return v; } }
      var m2 = k.match(/^(\w+), (\w+) (\d{1,2}), (\d{4})$/);
      if (m2 && DAYS[m2[1]] && MONTHS[m2[2]]) return DAYS[m2[1]] + ' ' + m2[3] + ' ' + MONTHS[m2[2]] + ' ' + m2[4];
      try { if (typeof W.trd === 'function') { var t = W.trd(k); if (t && t !== k) return t; } } catch (e) {}
      if (depth > 2) return null;
      /* a label built of parts, such as "A Day · 🌅 Morning · The Threshold": each run of parts is looked up, longest first */
      if (k.indexOf(' · ') > 0) {
        var parts = k.split(' · '), out = [], any = false, i0 = 0;
        while (i0 < parts.length) {
          var hit = null, j;
          for (j = parts.length; j > i0; j--) { var s = parts.slice(i0, j).join(' · '); if (j - i0 < parts.length) { hit = look(s, depth + 1); if (hit != null) break; } }
          if (hit != null) { out.push(hit); any = true; i0 = j; }
          else { out.push(parts[i0]); i0++; }
        }
        if (any) return out.join(' · ');
      }
      /* a preview cut short with an ellipsis: the French of the line it begins, cut to the same length */
      if (/…$/.test(k) && k.length > 30) {
        var pre = k.slice(0, -1).trim(), keys = Object.keys(D);
        for (var q = 0; q < keys.length; q++) if (keys[q].length > pre.length && keys[q].indexOf(pre) === 0) {
          var fv = D[keys[q]], cut = Math.min(fv.length, Math.round(pre.length * 1.12)), sp = fv.lastIndexOf(' ', cut);
          return fv.slice(0, sp > cut * 0.7 ? sp : cut).replace(/[\s,;:.]+$/, '') + '…';
        }
      }
      /* an emoji or a mark before the words */
      var m3 = k.match(/^([^\sA-Za-z0-9À-ÿ]{1,4})\s+(.+)$/);
      if (m3) { var r3 = look(m3[2], depth + 1); if (r3 != null) return m3[1] + ' ' + r3; }
      return null;
    }
    function sub(s) { var v = look(norm(s), 1); return v == null ? s : v; }
    function skip(el) { return !el || (el.closest && el.closest('textarea,input,select,script,style,code,pre,iframe,svg,[contenteditable="true"],[contenteditable=""],[data-cdfr-off]')); }
    function skipOuter(el) { var p = el.parentElement; return !!(p && p.closest && p.closest('script,style,code,pre,iframe,svg,[contenteditable="true"],[contenteditable=""],[data-cdfr-off]')); }
    function doText(n) {
      var cur = n.nodeValue;
      if (n.__frOut != null && cur === n.__frOut) return;
      var k = norm(cur); if (!k || !/[A-Za-z]/.test(k)) { n.__frOut = null; return; }
      var f = look(k);
      if (f == null) { n.__frIn = null; n.__frOut = null; return; }
      var v = cur.match(/^\s*/)[0] + f + cur.match(/\s*$/)[0];
      n.__frIn = cur; n.__frOut = v; if (cur !== v) n.nodeValue = v;
    }
    function undoText(n) { if (n.__frIn != null && n.nodeValue === n.__frOut) n.nodeValue = n.__frIn; n.__frIn = null; n.__frOut = null; }
    function doAttrs(el, on) {
      var A = el.__frA || (el.__frA = {});
      for (var i = 0; i < ATTR.length; i++) {
        var a = ATTR[i], cur = el.getAttribute(a); if (cur == null) continue;
        var rec = A[a];
        if (!on) { if (rec && cur === rec[1]) el.setAttribute(a, rec[0]); A[a] = null; continue; }
        if (rec && cur === rec[1]) continue;
        var f = look(norm(cur));
        if (f != null) { A[a] = [cur, f]; if (cur !== f) el.setAttribute(a, f); } else A[a] = null;
      }
    }
    function scan(root, on) {
      if (!root) return;
      var start = root.nodeType === 3 ? root.parentNode : root;
      if (root.nodeType === 3) { if (!skip(start)) { if (on) doText(root); else undoText(root); } return; }
      if (root.nodeType === 1 && /^(INPUT|TEXTAREA|SELECT)$/.test(root.tagName)) { if (!skipOuter(root)) doAttrs(root, on); return; }
      if (root.nodeType !== 1 || skip(root)) return;
      /* a field's own placeholder, title and label are translated; what is inside it never is */
      var FIELD = /^(INPUT|TEXTAREA|SELECT|BUTTON)$/;
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, { acceptNode: function (n) {
        if (n.nodeType !== 1) return NodeFilter.FILTER_ACCEPT;
        if (/^(INPUT|TEXTAREA|SELECT)$/.test(n.tagName)) { if (!skipOuter(n)) doAttrs(n, on); return NodeFilter.FILTER_REJECT; }
        return skip(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } }), n = root;
      do { if (n.nodeType === 3) { if (on) doText(n); else undoText(n); } else if (n.nodeType === 1 && n.hasAttribute && (n.hasAttribute('title') || n.hasAttribute('placeholder') || n.hasAttribute('aria-label'))) doAttrs(n, on); } while ((n = w.nextNode()));
    }
    var roots = [], obs = [], queue = [], timer = 0, last = null;
    function flush() { timer = 0; var q = queue; queue = []; var on = fr(); if (!on) return; for (var i = 0; i < q.length; i++) { if (q[i].isConnected) scan(q[i], true); } }
    function watch(el) {
      if (!el || el.__frWatched) return; el.__frWatched = 1; roots.push(el);
      var o = new MutationObserver(function (ms) {
        if (!fr()) return;
        for (var i = 0; i < ms.length; i++) { var m = ms[i];
          if (m.type === 'childList') { for (var j = 0; j < m.addedNodes.length; j++) queue.push(m.addedNodes[j]); }
          else if (m.type === 'characterData') queue.push(m.target);
          else if (m.type === 'attributes') queue.push(m.target);
        }
        if (!timer) timer = setTimeout(flush, 30);
      });
      o.observe(el, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTR });
      obs.push(o);
      if (fr()) scan(el, true);
    }
    function all(on) { for (var i = 0; i < roots.length; i++) if (roots[i].isConnected) scan(roots[i], on); }
    function tick() {
      try { (opt.roots ? opt.roots() : []).forEach(watch); } catch (e) {}
      var now = fr();
      if (now !== last) { last = now; if (!now) cache = {}; all(now); }
    }
    /* the native questions (confirm, prompt, alert) speak French too, where their words are known */
    if (opt.dialogs && !W.__cdfrDialogs) {
      W.__cdfrDialogs = 1;
      ['confirm', 'prompt', 'alert'].forEach(function (k) {
        var f = W[k]; if (typeof f !== 'function') return;
        W[k] = function (msg) { var a = [].slice.call(arguments); try { if (fr() && typeof msg === 'string') { var t = look(norm(msg)); if (t != null) a[0] = t; } } catch (e) {} return f.apply(W, a); };
      });
    }
    setInterval(tick, 700); setTimeout(tick, 0);
    return { look: function (s) { return look(norm(s)); }, scan: function (el) { scan(el, fr()); }, tick: tick, words: function () { return Object.keys(D).length; }, roots: function () { return roots; } };
  }
  W.CDFR = { make: make, pl: pl };
})(window);
