<script id="cd-icon-early-1052">
/* PASS 1052 · THE NIGHT ICON IN SAFARI, at the owner's word. The likely root of it: Safari passes over an icon written
   inside the page (a data address), which is how both of the page's pictures were given, and falls back to the
   favicon.ico beside the page, which is the white and gold seal; so by night its tab stayed light. Where the page is
   served from a website, every icon now names a real file, a day picture and a night picture, each at an address of
   its own, and the right one is chosen here, while the page is still loading and before any browser reads an icon.
   The app's own day or night wins, and the device's is used when the app has not said. A copy opened as a single
   file keeps its pictures inside it, as before. */
(function () { try {
  if (!/^https?:$/.test(location.protocol)) return;
  var dark = window.__cdIconEarly === 'dark', V = '?v=1052';
  function set(l, day, night) { l.setAttribute('data-cd-light', day + V); l.setAttribute('data-cd-dark', night + V); l.removeAttribute('media'); l.setAttribute('href', (dark ? night : day) + V); }
  var by = function (id) { return document.getElementById(id); };
  var a = by('cd-fav-light'); if (a) set(a, 'icons/icon-32.png', 'icons/icon-dark-32.png');
  var b = by('cd-fav-light-192'); if (b) set(b, 'icons/icon-192.png', 'icons/icon-dark-192.png');
  [].forEach.call(document.querySelectorAll('link[rel~="icon"][sizes="512x512"]'), function (l) { set(l, 'icons/icon-512.png', 'icons/icon-dark-512.png'); });
  [].forEach.call(document.querySelectorAll('link[rel="apple-touch-icon"]'), function (l) { set(l, 'icons/apple-touch-icon.png', 'icons/icon-dark-180.png'); });
  [].forEach.call(document.querySelectorAll('link[rel~="icon"][data-cd-light*=".ico"], link[rel~="icon"][href*=".ico"]'), function (l) { set(l, 'favicon.ico', 'favicon-dark.ico'); l.setAttribute('data-cd-ico', '1'); });
} catch (e) {} })();
</script>
