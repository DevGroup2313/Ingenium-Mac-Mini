# Your counsellor: one path through the Career Studio (12 November 2026), a preview first

Drawn from the Career Studio itself, as previews/fabrica_p2 was drawn from Fabrica (her 6.84 rule: measure the app first): the real
#page-career of a test build with modules/r283.js, filled with an invented person (Rosalind Okafor, as rig/t_690_counsel.js invents
her) and a stand-in model, captured at each stage of the path by day and by night with every style rule, keyframe and token that draws
it, inside the app's own frame (pictures of the running page).

To build it (S a scratch folder; a test build served at a local address):
    node tools/capture_frame.js <page url> <S>/cncap/frame career
    node tools/capture_counsel.js <page url> <S>/cncap
    python3 -I build.py <S>/cncap <out.html>
