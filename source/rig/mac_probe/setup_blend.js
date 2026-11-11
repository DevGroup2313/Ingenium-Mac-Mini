// The look probe's setup for the Blend page: invented models, none chosen, by night, as left alone.
// window.__probe() answers with where the movement and Ingenium's wheel are, and what the page says of them.
(function () {
  var done = false, errs = [];
  window.addEventListener('error', function (e) { errs.push(String(e.message).slice(0, 160)); });
  function rect(e) { if (!e) return null; var r = e.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) }; }
  window.__probe = function () {
    var cw = document.querySelector('#page-blend .bx-cw'), mv = document.querySelector('#page-blend .bx-move'), seat = cw && cw.querySelector('.bx-seat');
    return { ready: done, ua: navigator.userAgent.replace(/^Mozilla\/5\.0 /, ''), move: rect(mv), wheel: rect(cw), seat: rect(seat),
      seal: !!(seat && seat.querySelector('[data-ing-seal]')), hidden: document.hidden, motion: document.body.getAttribute('data-motion') || '', errs: errs.slice(0, 3) };
  };
  var t = setInterval(function () {
    if (window.__ingReady !== true) return; clearInterval(t);
    try { var k = [].slice.call(document.querySelectorAll('button')).filter(function (x) { return x.textContent.trim() === 'Enter' && x.offsetParent; })[0]; if (k) k.click(); } catch (e) {}
    try { tourEnd(); } catch (e) {}
    try {
      state.theme = 'night'; applyTheme();
      var mk = function (id, n, p) { return { id: id, customName: n, fileName: id + '.gguf', color: '#7458c6', sizeBytes: p * 0.6e9, paramB: p, type: 'GGUF', fileState: 'ready', ctx: 8192 }; };
      state.models = [mk('a', 'Lumen 1.2B Instruct', 1.2), mk('b', 'Quill 2B', 2), mk('c', 'Quill 4B Thinking', 4), mk('d', 'Quill 4B Instruct', 4), mk('e', 'Ledger 8B', 8)];
      state.activeModelId = 'b'; try { saveState(); } catch (e) {} try { renderModels(); } catch (e) {}
      go(window.__probePage || 'blend');
    } catch (e) { errs.push('setup: ' + e.message); }
    setTimeout(function () { done = true; }, 3000);
  }, 500);
})();
