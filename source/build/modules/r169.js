<style id="r169-css">
/* ============ R169 · SAFE GRAPHICS ON A WINDOWS PC (Ingenium 6.4, 24 October 2026) ============
   With safe graphics (desktop/app_win_64.py: the window is drawn without the graphics chip's help, after a start that did not
   finish, or on AMD Radeon graphics), the app's address carries softgpu=1 and the page sheds its dearest paint: the frosted
   glass behind bars and panels, which the processor would otherwise redraw on every frame. Colours, shapes, shadows and
   the keys' raised look stay. */
html[data-softgpu] *,html[data-softgpu] *::before,html[data-softgpu] *::after{backdrop-filter:none !important;-webkit-backdrop-filter:none !important;will-change:auto !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p90"]="started";}catch(_){}
/* R169 · SAFE GRAPHICS ON A WINDOWS PC: the page is told by the app (softgpu=1 in its address) and says so on <html> */
(function(){try{if(/[?&]softgpu=1\b/.test(location.search))document.documentElement.setAttribute("data-softgpu","");}catch(e){}})();
;try{window.__ingParts["p90"]="running";}catch(_){}
</script>
