# Home's solid orbs (10 November 2026), a preview first

Her words (10 November 2026): "I want the orbs pages circling around the engine logo to have the same feel and density and animation as
the engine logo, I want them to be as animated and thick and 3D feeling as the logo button. I want them to feel like buttons with the same
texture when I click on them on the Home page, it feels weird seeing them just light up and feel hollow when I click on them or hover over
them."

What the preview shows: Home as Ingenium 6.71 draws it, with modules/r264.js running on it. Each room's orb has a body of seven discs in
its own purples behind its face, its mark standing higher and thick, its mark lifting and settling and its surface drifting at rest; under
the mouse it lifts and its mark rises; pressed, it sinks and its body closes up; released, it knocks, and the preview names the room
Ingenium would open. She approved it on 11 November 2026, and r264 rides from Ingenium 6.72.

To build it, from this folder (absolute paths for the scratch folder):

    node ../home_concepts/tools/capture_v2.js <a 6.71 or later page url> <scratch>/real2
    python3 -I tools/build_live_orbs.py <scratch> <out.html> ../../build/modules

The pictures are not kept here: they are taken again from the app each time.
