# Ingenium and The Forge: the manual screen reader protocol

The automated half of the audit is run by hand before a release (see "Before you start"); it is not part of the GitHub
builds. This protocol is the half that needs a person and a real screen reader on each device the apps ship to. It takes about 40 minutes for one app on one device.
Run it for Ingenium and for The Forge on at least one Mac, one Windows PC, the Fire tablet and an iPhone or iPad before a
release that changes how pages are drawn.

## Before you start: the automated checks

Run these first on the build you will test; a manual pass is only worth doing on a build that passes them.

    node rig/a11y/axe_walk.js <page url> <axe.min.js> <out folder> [the_forge]   # axe-core, WCAG 2.1 A and AA, every page, day and night, desk and phone
    node rig/a11y/ax_tree.js  <page url> <out folder> [the_forge]                # the accessibility tree a screen reader is given: names, roles, pictures
    node rig/a11y/orca_walk.js <page url> <out folder>                           # Orca (Linux) walks each page key by key (inside orca_env.sh)

6.2 results (22 October 2026), the last full run and the build these words were written for: axe-core, 0 rules broken on
11 pages x day/night x desk/phone; the accessibility tree, 0 problems in 44 page views (it found 16 to 27 nameless icons a
page, now hidden as decoration). Parts added since (the code editor, the model studio, Break it down and others) have not
had a full run yet, and no manual pass with a screen reader has been recorded in the table at the end yet.
Known and left for this protocol to judge: some keys repeat their words in one region with nothing to tell them apart
(for example "Use this blend" on each ready blend, "Open Lector" on each recent document). Listen for whether the card
around each one makes clear which it is.

## The screen readers, and how to start and stop each

| Device | Screen reader | Start / stop | Read the next item | Act |
|---|---|---|---|---|
| Mac mini, MacBook Pro | VoiceOver | Command + F5 | VO (Control + Option) + Right Arrow | VO + Space |
| Windows | Narrator | Windows + Control + Enter | Caps Lock + Right Arrow (scan mode) | Enter or Space |
| Windows | NVDA (free, nvaccess.org) | Control + Alt + N / Insert + Q | Down Arrow (browse mode) | Enter |
| iPhone, iPad | VoiceOver | Settings, Accessibility, Accessibility Shortcut: VoiceOver, then triple-click the side button | swipe right | double-tap |
| Fire tablet | VoiceView | Settings, Accessibility, VoiceView (or hold two fingers on the screen for 5 seconds at set-up) | swipe right | double-tap |
| Android | TalkBack | Settings, Accessibility, TalkBack | swipe right | double-tap |

Also turn on, once each, during the pass: the system's reduced motion, larger text (200 per cent), and high contrast or
increased contrast. Each app must stay usable with all three.

## What every page must do (check on each page)

1. **The page says where you are.** On arriving, the page's heading is read (Home, Chat, Code, Lector, Build, Fabrica,
   Settings, and in the Forge the room's name). The rotor or headings list (VoiceOver: VO + U; NVDA: Insert + F7) lists
   the page's headings in order, with no gaps that hide a section.
2. **Landmarks.** The rotor's landmarks list shows the main region, the navigation and the banner (top bar). In the Forge:
   the masthead, the room rail and the room.
3. **Every control is named.** Moving through the page reads every key, switch, field and tab with a name that says what
   it does, and its role ("button", "switch", "tab"). Nothing is read as "button" alone, "image" alone, or "unlabelled".
4. **State is read.** A switch says on or off; a tab says selected; a folding panel says expanded or collapsed; the
   Chapters key in the tour says it opens a list and whether it is open; the level choices say which one is checked.
5. **Order.** Tab and Shift+Tab (or swipes) go through the page in the order it is read, top to bottom, with no trap and
   nothing skipped. The side keys (bell, leaf, thought, day or night, Clepsydra, notes) are reached and read by name.
6. **Changes are announced.** A toast (a short notice at the foot of the page), a reply finishing, a backup made, a level
   changed in the tour: each is read once without moving the focus.
7. **Dialogs.** A dialog (the tour's Chapters list, a question such as "Run it here?", the backup's restore summary)
   takes the focus when it opens, keeps it inside while open, closes with Escape (or the two-finger scrub on iPhone,
   iPad and Fire), and gives the focus back to the key that opened it.

## The journeys (do each once per app per device)

Write the result in the table at the end: Pass, Fail (with what was heard), or Not on this device.

### Ingenium
1. **Start.** Open the app. The loading page is read ("Painting Ingenium"), then the door; Enter opens Home. Home reads
   "Good evening" (or the time of day), then Your next step, its two keys side by side and the guide key below.
2. **Chat.** Go to Chat. Find the message box (it says "The message box"), type a short question, send it with Enter. The
   reply is announced when it is complete. The + key opens its menu; arrow keys move in it; Escape closes it and returns
   to the + key.
3. **An app in the stage.** Add a small HTML file with the + key. Its chip is read with its name and size and a Remove key.
   Open it in the stage; the stage's keys are named (Preview, Code, Changes, More). Remove the chip: the stage closes and
   the focus is not lost.
4. **Lector.** Open Lector. The four steps (Choose, Read, Write, Save) are read as a list with the current one marked.
   Choose a document kind, start a reading; the progress is announced; the finished document can be read paragraph by
   paragraph; Save names its formats.
5. **Fabrica.** Open Fabrica; the app list, the work tabs and the ship cards are named; a ship card says whether it is chosen.
6. **The guided tour.** Start the tour from Home. The level question is read with its three choices. Choose one; the card
   is read (chapter, title, text); Next, Back, End the tour and the Chapters key are named. Open Chapters: a dialog, the
   current chapter focused; choose another; the list closes and the new card is read.
7. **Help.** Press F1: help for the page opens and is read. Shift+F1 on the message box explains it. What is this? then a
   press on a key explains that key without doing it.
8. **The Quiet Screen.** Press the leaf. "Quiet screen, dialog" and "Nothing needs doing right now" are read; Tab stays on
   its keys; Escape closes it and the focus returns to the leaf.
9. **Settings.** Every switch is read with its words and state. Backup and moving: the three tabs are tabs; a backup with
   the keys asks for a password twice and says plainly when they differ or are too short.
10. **Night.** Switch to night with the moon key (it is named "Day or night"); repeat step 1's Home check.

### The Forge
1. **Start.** The loading page, then the door: its keys are named; Open the Editor enters.
2. **The Editor.** The room's heading is read; the surface choice (Editor, Bakery, Compose) is read as a group with the
   current one selected; Editing names the app being edited; the live preview has a name.
3. **Files and Fabrica.** Each room's heading is read on arrival; its main lists and keys are named.
4. **Focus.** The cards (Now, Steps, Time, the Inbox, Calm) are headings; the Quiet screen key in Now opens the Quiet
   Screen, as in Ingenium (step 8 above, the leaf in the side column too).
5. **Reminders.** Set a reminder one minute ahead; when it comes, it is read once, and its keys are named.
6. **The tour.** As Ingenium's step 6, in the Forge's own tour.

## The record

Copy this table for each run.

| App and version | Device and system | Screen reader and version | Tester | Date |
|---|---|---|---|---|
|  |  |  |  |  |

| # | Journey or check | Result | What was heard, if it failed |
|---|---|---|---|
| 1 | Start |  |  |
| 2 | Chat |  |  |
| 3 | An app in the stage |  |  |
| 4 | Lector |  |  |
| 5 | Fabrica |  |  |
| 6 | Guided tour |  |  |
| 7 | Help |  |  |
| 8 | Quiet Screen |  |  |
| 9 | Settings |  |  |
| 10 | Night |  |  |
| P1–P7 | The page checks, on each page visited |  |  |
| M | Reduced motion, 200 per cent text, high contrast |  |  |

A failure is anything that leaves a person who cannot see the screen unable to know where they are, what a control does,
what just changed, or how to get back. Each failure goes back to the audit's module (`build/modules/r152.js` for
Ingenium, the pass's own blocks for the Forge) with what was heard, and the automated checks are run again after the fix.
