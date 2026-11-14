# Speed: keeping it light to run

My words: "everything feels really freaking slow when I move my mouse around" (7 November 2026); "Ingenium is running really slow and heavy on my macbook pro, everything is just really lagging, please fix that" (13 November 2026); "Please make sure that they don’t slow down the app and drain my devices" (13 November 2026).

## The rules

- **Draw only while the header is seen.** An IntersectionObserver and the page's own visibility stop the drawing; a page left or hidden draws nothing.
- **Let the browser animate what it can.** CSS animations and the Web Animations API cost far less than drawing every frame from a script (Home's orbit, Blend's wheels and sway).
- **Out of sight, cancel animations rather than pause them.** A paused animation on a hidden page still made the browser work out styles every frame: measured on Blend, 180 style passes against 20 in three seconds.
- **Thirty frames a second at rest.** Sixty only while the instrument answers the pointer, and only on a machine that keeps up.
- **Draw coarser when frames fall behind.** Build's diamond lowers its own sharpness until frames keep pace, and traces fewer samples on a sharp (Retina) screen: since 7.01 about 2.5 times less work for each frame.
- **Draw a large background at half sharpness and half the frames** (Build's sky across the card).
- **Compute once what never changes** (Blend's wheels, Vocatio's medallions, the engine logo's picture) and keep it.
- **Never rewrite the page while it is left alone.** rig/t_651_still_keys.js checks it.
- **Measure, do not guess.** Chrome's own counters (Performance.getMetrics, read through Playwright) on every page: at rest, while the header is shown, and after leaving the page. In 7.01 no header kept drawing once its page was left, and a plain page rested at about two per cent of the main thread.

## What is not yet measured

My MacBook Pro itself has not been measured: the test machine has no Mac and no Safari engine. The next step for the slowness is to ask me which pages feel slowest on it, and measure those.
