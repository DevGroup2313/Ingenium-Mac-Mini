# A new app's logo (11 November 2026), a preview first

Her words (11 November 2026), on Fabrica's A new app panel: "Please change "seal" to "logo" because not every app will have an seal
themed logo. I also want you to make the app's logo animated and clickable on the popped out panel page, it needs to be interactive and
clickable like the rest of the page." Her choices: "Logo everywhere", and a press that knocks the logo and turns it to its next colour,
with a picture of her own as the logo.

What the preview shows: Fabrica with its A new app panel open, as Ingenium draws it, with modules/r265.js running on it. The logo is a
key: a body of seven discs in its colour, its letter standing up and thick; it sways, leans toward the pointer, lifts, sinks, knocks
and turns to its next colour; "Use a picture" puts a picture of your own on it. Make it and the close key only say what Ingenium would
do. She approved it on 11 November 2026 ("I approve of the preview, push it everywhere"), asking that the rest of the panel move too,
and r265 rides from Ingenium 6.74.

To build it, from this folder (absolute paths for the scratch folder):

    node tools/capture_panel.js <a 6.74 or later page url> <scratch>/newlogo
    python3 -I tools/build_live_logo.py <scratch>/newlogo <out.html> ../../build/modules

The pictures are not kept here: they are taken again from the app each time.
