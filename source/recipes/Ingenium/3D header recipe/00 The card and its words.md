# The card and its words

Every studio's header is the same card, made by the shared kit (IngStudios.kit.hero in modules/r290.js) and measured from Blend's header (modules/r262.js). Vocatio, Lector, Fabrica, Focus and Build all use it; Home, Blend, Folders and Models have their own heads made in the same language.

## Its parts

- The card is a section with the class `skh`, 470 pixels tall, on the page's desk. The page is marked `sk-on` while its header is shown.
- The words stand in `.skh-words`: 40 pixels from the left, 34 from the top, 470 pixels wide.
- The instrument stands in `.skh-obj`: 520 by 424 pixels, 36 pixels from the right and 22 from the top, on Blend's stage (the same perspective and sway, held still when out of sight).
- The eyebrow: INGENIUM, then the page's own line in small capitals, for example "BUILD · CODE IN, A PAGE OUT", "FOCUS · ONE STEP AT A TIME", "FABRICA · THE TREE OF YOUR VERSIONS".
- The title in Home's Cormorant at 48 pixels.
- A line or two of what the page does.
- Two raised keys: the first filled violet, the second white. Each lifts under the pointer and sinks when pressed.
- A line of help under the keys, and an italic hint at the foot that says what the instrument does when pointed at and pressed.
- Below the card, the page's own panels, drawn as Blend's panels and as tall as the window.

## Its colours and depth by day

The kit's tokens (custom properties named `--sk-...`):

| Token | Value | Use |
|---|---|---|
| --sk-ink1, --sk-ink2, --sk-ink3 | #221a2e, #4a4358, #6c6579 | the title, the words, the quiet lines |
| --sk-acc | #6a3fb5 | Ingenium's violet |
| --sk-keyA, --sk-keyB | #ffffff, #f6f2fb | the white key's face |
| --sk-pa, --sk-pb, --sk-pedge | #7a50c6, #5d37a1, #3a2070 | the filled key and its edge |
| --sk-desk | a soft radial wash from #fdfbff to #e9e1f4 | the desk under the card |
| --sk-slab, --sk-key, --sk-keyhi, --sk-press | layered shadows | the card's slab, a key at rest, a key lifted, a key pressed |

By night every token takes its night value, so nothing on the card is simply darkened.

## Rules for the card

- A key acts where it stands and never moves the page (from 6.95 and 6.97).
- Nothing on the card is rewritten while the page is left alone.
- Below 760 pixels the instrument stands under the words (modules/r296.js); see "Phones and tablets".
- The card keeps the app's own key surfaces: no new gloss, glow or gradient on keys.
