<style id="r311-css">
/* ============ R311 · ADAMAS: THE CODE AND ITS PAGE GIVEN THE WINDOW'S HEIGHT, THE KITS IN A TAB OF THEIR OWN (Ingenium 7.27, 17 November 2026) ============
   Her words (17 November 2026): "Why is everything so squished together on the Adamas page in Ingenium, the code panel and the live
   preview panel look compacted in and it looks ugly, please fix it"; then "I just want Adamas code panel and its live preview panel to be
   restored to their original sides and not be compacted and squished in. I am not interested in changing its look for a new design";
   then "I want you to split the Adamas page into tabs and have the download as an app feature be in a different tab".
   Measured (Chrome, the released pages of 3.4, 7.04 to 7.26, at 1280 by 800 and 1000 by 625): the two panels have kept the same widths
   since 3.4 (at 1280, the code 395 points, its page 536; the code takes 42 per cent of the row, as the base page set it), side by side
   above a window 920 points wide. What filled them since is height: the line numbers, the code's two rows of keys (Find, Glossa, Calm,
   Lima) and Glossa's box, the preview's second row of keys and its console, all inside the same row of at least 480 points.
   - Their sides and widths stay as they were. The row they share now reaches the foot of the window (at least 480 points, as before),
     so the code shows more lines and the page runs in a taller frame; where the preview is closed, the row is left as it was.
   - The tabs (modules/r173.js, CONF.build): "Your page" (the code, the preview and Ask a model) and "Download as an app" (the build
     kits), in the same tabs as Settings, Mentes and the Guide; Adamas's head stays above them (modules/r292.js).
   - The kits' list: each device's name ran into its file's name ("Fire tabletIngenium-Fire-Tablet-Kit.zip"); a small space parts them.
   - The kits' choice "The app in the editor above" names the tab the editor is now in; when something picks that choice (Chat's "Make it
     an app" does, before it opens Adamas), Adamas opens on the kits' tab, where the next step is. */
@media (min-width:921px){body:not([data-buildview="closed"]) #page-build .build-grid{min-height:max(480px,calc(100vh - 150px))}}
.ship-row .ship-zip{margin-left:8px}
</style>
<script>
/* R311 (7.27): the kits' choice names where the editor is; picking it brings the kits' tab forward */
(function(){var D=document,W=window;
  function fix(){var r=D.querySelector('input[name="kitWhat"][value="editor"]'),b=r&&r.parentNode&&r.parentNode.querySelector("b");if(b&&/the editor above/.test(b.textContent))b.textContent="The app in Your page";}
  try{fix();}catch(e){}if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){try{fix();}catch(e){}});
  D.addEventListener("change",function(e){var t=e.target;if(!t||t.name!=="kitWhat")return;
    try{if(W.IngRooms&&W.IngRooms.current("build")!=="apps")W.IngRooms.open("build","apps");}catch(x){}},true);})();
</script>
