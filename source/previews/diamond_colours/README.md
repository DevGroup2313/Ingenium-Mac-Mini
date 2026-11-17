# The diamond's colours, within reach (17 November 2026), a preview first

Her words (17 November 2026): "I want a clear way to edit Adamas' diamond and change the colours as I please, I can't locate the
settings for it. Please make it accessible and visible for me."

Drawn from Ingenium itself (a test build of the 7.29 sources, the head's name set to Adamas as the release build sets it): the
Diamond colours key on Adamas's head, its panel beside the diamond, four test colours (Ruby deep, Emerald with a Sapphire band, Aqua
faint, Rose by night with an Amber band), Settings' tile "The diamond on Adamas", and the default diamond held still from 7.28's
sources and the new ones (no pixel differs, by night or by day).

Her word while it was made: "You changed the strip around the diamond holder on Adamas, please revert it back." It had not changed:
the gold strip was the test choice of an Amber band; the preview shows the default diamond unchanged, pixel for pixel.

Published: https://claude.ai/artifact/TXUHDygwqMQWmnFCkLvb9v (private). Approved (her words, 17 November 2026: "I approve of the preview,
please commit and push it everywhere and continue working on my requests."); built into Ingenium 7.29 (build/modules/r314.js,
build/modules/r292.js).

To make it again (S is a scratch folder; the test page served at a local address):
    node tools/diamond_shots.js <page url> <S>/dshots 2
    node tools/same_default.js <7.28 page url> <S>/before_night.png night   (and day; then the new page; compare the pictures)
    template.html is filled with the pictures (WebP data URLs) into diamond_colours.html
