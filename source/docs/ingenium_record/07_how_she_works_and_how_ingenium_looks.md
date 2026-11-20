# Ingenium record 07 · How the owner likes to work, and how Ingenium looks

Part of the record, written from Ingenium 7.54's sources (20 November 2026). The rules here are the owner's, for Ingenium and for every app she makes. Her own words are quoted where the code keeps them; each rule names the module that carries or measures it, so that it can be checked.

## 1. Her ways of working (`r327.js`, "Your ways of working", 7.41)

Her words (18 November 2026): "please add this to my rules on how I like to work inside of Ingenia and also as a main rule on how I like to work for all of my apps everywhere. I like softwares that look and feel alive. I love the animated popped out 3D look and effect. I want refined, elegant and understated designs. I like the mechanical analogue feel and sounds on my applications and the lighter, weighted and defined look of the pages and their cards and tabs. I like soft pastel colours for Day mode and dark academia Oxbridge colours for Night mode. AuDHD accessibility is always at the root of everything and I prefer everything offline and in-house. The list is will continue to grow, I want to be able to manually add them myself."

The list as Ingenium keeps it in her master copy (`var HERS`, then `var LATER`):

1. Software that looks and feels alive
2. The animated, popped-out 3D look and effect
3. Refined, elegant and understated design
4. A mechanical, analogue feel and sounds
5. Lighter, weighted and defined pages, cards and tabs
6. Soft pastel colours by day; dark academia, Oxbridge colours by night
7. AuDHD accessibility at the root of everything
8. Offline and in-house first
9. App logos truly 3D and clickable, like the engine logo (from Fabrica, 18 November 2026)
10. Purple words that can be pressed are underlined (added 20 November 2026)

"These rules should only apply to me and my way of working and should not be made universal for other users. They should have the option to come up with their own rules and input them in Ingenium." So the list is kept with the device's data (`state.ways`), seeded with hers in her master copy only; every other copy starts empty and its owner writes their own. It is given to every model after Ingenium's own instructions, and to a model working on her apps (a Code session, Fabrica's work).

## 2. The rules every part must keep

Each of these was given by the owner, often more than once. A new part keeps them from the start; a part found breaking one is put right.

1. **Nothing flat, stiff or unresponsive.** Every surface is raised, layered or sunk with care, never flat or plain: every card, note, sheet, key and field has its depth (its edge, its light and its shadow, by day and by night), and every key lifts, sinks and sounds (`r297.js`, "No flat or plain surfaces", her words 14 November 2026: "Please make sure that there aren't any flat and plain surfaces on Ingenium as you continue working."). A section, row or card answers the pointer: it rises toward it and sinks when pressed. With Minimal motion or the system's reduced motion, everything is still.
2. **Parts keep their own look at rest, and only move under the pointer.** A part is never restyled when she did not ask for it; asked to make something answer the pointer, change only its motion, never its colours or form. (Code's start window, 7.47, at her word: "I only want the area to be raised when I hover over it, it can be flat on rest mode.")
3. **No scroll bar in view, and everything still scrolls.** "Her rule for Ingenium and every app" (`r170.js`): `html,body,*{scrollbar-width:none;-ms-overflow-style:none}*::-webkit-scrollbar{display:none;width:0;height:0}`.
4. **No long wide buttons.** A key is as wide as its words and its padding; it never stretches across a card.
5. **No purple shading over a key under the pointer** (`r314.js`, her words: "I don't want any purple shading over the button when I hover over it"). A key under the pointer lifts and brightens; it is not tinted.
6. **No film behind a panel or a popup** (`r334.js`, her words 19 November 2026: "Please remove the weird film that covers the background when a panel or popup is opened, I don't like how it looks."). The layer that catches a press outside a sheet stays, transparent; the sheet keeps its own look. The sign-in door and the welcome door's frosted glass are doors, not films.
7. **Purple words that can be pressed are underlined** (`r343.js`, 7.53): a thin line in the word's own colour, three pixels below it (`text-decoration-thickness:1px; text-underline-offset:3px`), by day and by night. A word in violet that cannot be pressed is not violet at all: it is in ink (the Signed out line, record 03).
8. **Pages may grow.** No page is squeezed into one page and its tabs; a page may have pages of its own, more tabs and sections, wherever the work needs the room, "as long as it does not ruin the design and template of the app and can be done tastefully" (`r297.js`, "Pages may grow").
9. **A night look is drawn for everything**, and a ring shows the keyboard's focus.
10. **No gold.** The colours stay Ingenium's; a preview's rings are drawn in Ingenium's violet (`#6a3fb5`), never gold.
11. **Offline and in-house.** Nothing is fetched from outside unless she allows it; Fabrica's Checks name every address outside an app that its pages would load or call (`r330.js`).

`r330.js` measures, in Fabrica, the rules that can be measured, from an app's own styles: keys and cards that answer the pointer, no scroll bar in view, no long wide buttons, no purple shade under the pointer, a night look drawn, still when motion is reduced, a ring for the keyboard. The others (refined, understated) stay for her eye.

## 3. How she wants to be shown new work

* A preview before anything new is built: a live preview, or pictures of the running app, and nothing is built until she says yes.
* Pictures one by one, at full size: each step its own picture, sent on its own, with a violet number, its title and one sentence above it (her words, 20 November 2026: "I can't see anything in these previews. You piled everything together into one tiny image, how am I supposed to see it???"). The new part is ringed in Ingenium's violet.
* A preview uses Ingenium's real parts (its real seal, top bar, keys and sounds), never a drawing of them.
* A picture of a state is reached the way she would reach it, never forced (record 03, section 7).
* When she asks for one thing, change only that.

## 4. The colours (the base page's tokens)

| Token | Day | Night |
|---|---|---|
| `--accent` (Ingenium's violet) | `#6a3fb5` | `#b79ce6` |
| `--accent-deep` | `#4e2c8a` | `#8a63d2` |
| `--accent-bright` | `#8a63d2` | `#cdb8f0` |
| `--accent-soft` | `rgba(106,63,181,.14)` | `rgba(183,156,230,.16)` |
| `--bg` | `#f5f3f7` | `#16131c` |
| `--card` | `#faf8fc` | `#211a2b` |
| `--card-hi` / `--card-lo` | `#ffffff` / `#eee8f4` | `#271f33` / `#1a1422` |
| `--ink-1` (titles) | `#221a2e` | `#efe9f6` |
| `--ink-2` | `#4a4358` | `#cfc6dc` |
| `--ink-3` (quiet words) | `#6c6579` | `#a79bbb` |
| `--ink-body` | `#2b2438` | `#e6def0` |
| `--hairline` | `rgba(34,26,46,.10)` | `rgba(255,255,255,.09)` |
| `--ok`, `--warn`, `--bad` | `#3f8f5e`, `#b8791f`, `#b8433f` | |

Night is set by `body[data-theme="night"]`, with `color-scheme:dark`. Typefaces: `--serif` ("Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia) for headings and titles, and the newer parts' "Cormorant Garamond" first (`--p3-serif`); `--sans` (the system's own: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto) for text; `--mono` for code. Corners: `--radius` 12px; in the parts named in this record, cards 14 to 20px, keys 9 to 12px, pills and tags 999px.

## 5. Depth: how a raised thing is drawn

The base page's raised look (`--pop`, and `--pop-hi` under the pointer), by day:

```css
--pop: inset 0 1px 0 rgba(255,255,255,.8), inset 0 -1.5px 0 rgba(40,20,70,.08),
       0 2.5px 0 rgba(40,20,70,.13), 0 7px 13px rgba(40,20,70,.12), 0 15px 26px rgba(40,20,70,.09);
--pop-hi: inset 0 1px 0 rgba(255,255,255,.9), 0 4px 0 rgba(40,20,70,.12),
          0 10px 17px rgba(40,20,70,.16), 0 20px 36px rgba(40,20,70,.12);
```

and by night the same layers in black (`rgba(0,0,0,.30)` to `.48`) with a faint light edge (`rgba(255,255,255,.12)`). The recipe: a light inner edge on top, a darker inner edge below, a short hard shadow just under the part (its wall), then two soft shadows, wider and fainter. The shadows' colour is the family's own purple ink (`40,20,70` or `40,22,68`), never grey or black by day.

The newer parts (profiles, Sign out, the ways of working) use the same recipe through the `--p3-` tokens (`r331.js`): `--p3-card`, `--p3-ink1`, `--p3-ink2`, `--p3-ink3`, `--p3-acc`, `--p3-line`, `--p3-key-bg`, `--p3-key-sh` (a key at rest), `--p3-key-hi` (under the pointer), `--p3-card-sh`, `--p3-card-hi`, `--p3-pri-bg` (the main key's violet), with a night set on `body[data-theme="night"]`.

## 6. A key, a card, a row

* **A key at rest**: its own face (a gentle gradient), its wall below (the short hard shadow) and its soft shadows: `--p3-key-sh`.
* **Under the pointer**: it rises 2 pixels (`transform:translateY(-2px)`) and its shadows deepen (`--p3-key-hi`); no tint.
* **Pressed**: it sinks 1 pixel (`translateY(1px)`) back into its shadow.
* **The keyboard's focus**: a ring, `outline:3px solid` the accent, `outline-offset:2px`.
* **The main key** (the one that does what the card is for) is violet (`linear-gradient(#7348be,#5d37a1)` by day) with white words.
* **The sign-in door's keys** are the one exception: a key there never moves under the pointer ("it would flicker when the pointer rests on its lower edge"); it brightens, and sinks into its shadow when pressed.
* **A card**: raised (`--p3-card-sh`), rising under the pointer (`--p3-card-hi`), corners 14 to 20px.
* **A row** in a list or a panel: of the list's own kind, answering the pointer as its neighbours do. A new row added to an existing list copies its neighbours' class, so it is drawn and moves exactly as they are (Sign out copies Lock Ingenium's).
* **Tiles and coins** (a profile's): soft pastel by day, deeper by night, raised, turning a little under the pointer (`rotate(-6deg) scale(1.06)`), with a small spring when pressed.
* **Motion**: springs, never linear (`--spring:cubic-bezier(.34,1.3,.64,1)`, `--p3-spring:cubic-bezier(.2,.9,.25,1.2)`, `--p3-bounce:cubic-bezier(.34,1.35,.64,1)`); a part rising in takes about a third to half a second. `body[data-motion="minimal"]` and `@media (prefers-reduced-motion:reduce)` take every animation and transition away.
* **Sounds**: Ingenium's own analogue sounds play on its keys (`r176.js`, `IngSound.play(name)`, for example "confirm"); they follow the sound settings.

## 7. Words

* Plain words, in full sentences; no dashes used as punctuation; one idea at a time.
* Say the true state: On, Off, or Not yet with the release it is planned for. Never pretend that something is done or protected when it is not (Sign out without a sign-in says nothing can be sealed yet).
* After a refusal, say that nothing was changed: "That is not the password. Nothing was changed."
* A question has two clear keys: what it will do ("Turn on my sign-in", "Turn it off") and a way out ("Not now", "Cancel"). What destroys is marked as such and asks once more.
* Her own words are quoted exactly, with the day she said them, wherever a part was made at her word.

## 8. AuDHD accessibility at the root

* One step at a time: a card with several steps shows one open at a time (Ingenium Cloud's three numbered steps), and long pages fold into rooms and cards that open on a press.
* Predictable places: a part is reached where it belongs (Sign out beside Lock now, and after Lock Ingenium in the Status panel), and the same row does the same thing wherever it appears.
* Nothing moves unless asked: Minimal motion and reduced motion make everything still; nothing flashes (record 03, section 5: the sign-in card never shows for a moment before the profiles).
* Every key has a name for screen readers (`aria-label`, `title`), dialogs are marked (`role="dialog"`, `aria-modal`), and the keyboard's focus always shows.
