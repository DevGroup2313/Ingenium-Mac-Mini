# Ingenium record 08 · Carrying the sign-in, Sign out and profiles into another app

Written so that the owner, or a model working for her, can give another of her apps (Carpe Diem, Lakay, Inkwell, The Forge, or one made later) the same sign-in, Sign out, profiles and sealing as Ingenium 7.54, without starting from nothing. Read records 02 to 07 first; this one says what to copy, in what order, what the app must provide, and what went wrong in Ingenium so that it does not go wrong again.

## 1. Before anything: what the app must be

* One page (HTML, CSS and JavaScript in the page or beside it) that keeps its data in the browser's stores (localStorage, IndexedDB), as Ingenium and her other apps do.
* Opened where WebCrypto works: in an app shell (Ingenium's Mac and Windows apps run the page in a web view and serve it from `http://127.0.0.1:<port>`), at `localhost`, or over `https`. A page opened from a file, or over plain `http` at another address, has no `crypto.subtle`: the sign-in must then say so in plain words and offer nothing it cannot do (record 02, section 6.1).
* Everything offline: no part fetches anything from outside. WebCrypto, `CompressionStream` and IndexedDB are the browser's own.

## 2. The parts, in the order they must stand in the page

| Order | Ingenium's part | What it does | Must stand |
|---|---|---|---|
| 1 | `build/boot/profiles_boot.js` | renames every store per profile (record 04, section 3) | before any script reads storage, the first script in the page |
| 2 | the app's own state loading | recognises a sealed desk, keeps it raw, starts empty (section 3) | before anything paints the desk |
| 3 | `build/modules/r197.js` | the sign-in, the keys, the seal, Lock now, the ways back in (record 02) | after the app's own code, before every part that reads a sealed store |
| 4 | `build/modules/r331.js` | the profiles: the list, the door, Settings' card (record 04) | after r197 |
| 5 | `build/modules/r338.js` | the profiles inside the app's Status panel (or its own menu) | after r331 |
| 6 | `build/modules/r344.js` | Sign out (record 03) | after r197, r331 and r338 |
| 7 | `build/modules/r341.js`, `r318.js` | Ask before each export; Settings, Security | after r197 |

In Ingenium each module is a `<style>` block and a `<script>` block, marked as started and running (`window.__ingParts["p344"]`), so a test can see that a part loaded. Keep that habit.

## 3. What the app must provide to the sign-in (the contract r197 relies on)

These are Ingenium's own names; another app either uses the same names or changes r197 where it reads them.

* `window.state`: the whole desk, one object.
* `window.KEY`: the name the desk is kept under in localStorage (Ingenium: `ingenium_v4`). Choose one name per app (for example `carpe_desk_v1`) and keep it.
* At load (Ingenium's base page, the `state=(function(){…})()` that reads the desk): if the stored desk begins with `{"ing":"locked"`, or a lock record exists, set `window.__ingLockedRaw=raw` and `window.__ingLocked=true`, and start with the app's empty defaults. Never parse the sealed desk as the app's data.
* `saveState()`: return at once while `window.__ingLocked` (or `window.__ingResetting`) is true, so an empty desk is never written over the sealed one; and when `IngLock.on()`, hand the JSON text to `IngLock.deskWrite(raw)` and return, instead of writing it yourself.
* `window.migrateFrom(obj)`: turns a desk read from the store into the current shape (r197's `adoptPlain` calls it after a sign-in, then replaces `state`'s keys with the result and repaints).
* `window.HAS_LS`, `window.SNAPRING` (the recovery shelf's names), `window.ingNoteSnapshot(raw)`, `window.ingStoreFull()`, `window.memStore`: the desk's writer uses them as the app's own save does. An app without a recovery shelf can give an empty `SNAPRING` and a `ingNoteSnapshot` that does nothing.
* `window.applyTheme()` and the body's `data-theme`: the door's night look (record 02, section 7).
* On a computer app only: `window.shellApi()` returning the shell's bridge with `save_state`, `big_put`, `big_get` (r197 wraps them so the disk copy is sealed), and `DESK_CHECKED`.
* `window.ingAsk({title, text, yes, no})` returning a promise of true or false, and `window.ingToast(text)`: the app's own question and note (Sign out uses them; without them it falls back to the browser's `confirm`).

## 4. Choosing the app's own names

Change these together, once, and write them down in the app's own README:

* the desk's key (`KEY`), the lock record's key (r197's `LSK`, Ingenium `ingenium_lock`), the profiles' list (`REG` in profiles_boot.js, Ingenium `ingenium_profiles`);
* the shared names (`SHARED_LS`, `SHARED_DB` in profiles_boot.js): what every profile of that app shares on the device (in Ingenium: the models and the device's security settings);
* the additional data strings: keep Ingenium's forms (`"desk"`, `"big:<id>"`, `"rec:<db>/<store>/<key>"`) but never let two apps share one store;
* `CARRIED` in r344, if the app carries other apps' documents (Ingenium carries the Desk's apps), or remove that part;
* the check string (`CHECK`, `"ingenium-lock-check v1"`) may stay as it is: it only proves that the right key opened.

Keep exactly as they are, since they are the security: PBKDF2-SHA-256 with at least 600,000 rounds calibrated to about 0.75 s; AES-GCM-256 with a fresh 12 byte nonce and a 128 bit tag; one random data key wrapped by each way in; the place bound as additional data; the keys only in a closure, never written anywhere; the ten words from the same fixed list of 512 (never reordered); no maker's key and no back door.

## 5. The steps, one at a time

1. Copy `profiles_boot.js` with the app's own list name; check that the owner's names are unchanged and that a second profile writes `@p…` names (Ingenium's `rig/t_744_profiles.js` does this).
2. Make the app's load and save keep the contract of section 3. Test: with a sealed desk in the store, the app starts empty and writes nothing.
3. Copy r197; change `LSK`; point the sealed stores (`RSTORES`, `BSTORES`, the long texts) at the app's own databases, or take out those it does not have. Test turning protection on, signing in, a wrong password, Lock now, the lock after time away, each way back in, and turning protection off (Ingenium's `rig/t_700_lock.js`, 58 checks).
4. Copy r331, then its place in the app's menu (r338's rows, or the app's own), then r344. Test with `rig/t_754_sign_out.js` (25 checks), changed to the app's names.
5. Then r318's room and r341, if the app saves files out of itself.
6. Make every part in the app's own look (record 07): the door, the keys, the rows, by day and by night, still with reduced motion.
7. Show the owner pictures of the running app, one by one at full size, before it is released.

## 6. What went wrong in Ingenium, so that it does not again

* **The sign-in card flashed before Who is using Ingenium** (7.54): the sign-in door is drawn as soon as r197 loads, the profiles only once r344 has loaded, seconds later on a slow device. Fixed by r197 holding the card out of sight while the profiles' list says signed out. In any app where one part's door must cover another's, decide at the first paint, from data that is already there.
* **A night door with a day card** (7.54): the page's own theme is sealed with the desk, so at a locked start the body is still in day colours; only the door knows it is night, from the desk's clear header. Everything drawn over the door must take the door's look, not the body's.
* **A violet line that could not be pressed** (7.54): violet means pressable. Words that are only read are in ink.
* **A test that waited a fixed time across a page that starts again**: wait for a mark left on the old page to be gone, then for the very element expected.
* **Tests that pass alone and miss under load**: a check that waits half a second for a list to draw, or for a card to show, misses when three heavy things run at once. Wait for the element itself; run timing-sensitive tests and the security test alone.
* **Opening a database by name makes an empty one**: ask `indexedDB.databases()` first (r344's `dbThere`).
* **Writing while a page closes**: only synchronous work finishes in `pagehide`; that is why r197 carries a plain JavaScript AES-GCM (`sealTextSync`) beside WebCrypto. A database cannot be written then at all.
* **A store refused**: every write to the lock record is checked (`writeRec` returns false; "This browser's store refused the change"), and nothing is left half done.
* **Comments in a shipped page**: Ingenium's release build takes comments out; never put meaning in a comment that the code needs.

## 7. Notes for each of her apps

These say only what is known from the sources in this repository; check each app's own sources before relying on them.

* **Carpe Diem**: a single offline page (its build scripts are kept in `source/offline_project/carpe_diem_*`); its documents are the ones Ingenium seals at Sign out under the `carpe_` and `cd_` keys when it is carried on Ingenium's Desk. Given its own sign-in, its own desk key and lock record must not be the same as those Ingenium uses for the documents it carries.
* **The Forge**: shares PermitCore with Ingenium (`thoughts/permit_core.html`, record 06 section 6), so ownership, the licence and permissions are already common; its build scripts are in `source/offline_project/forge_*`.
* **Lakay** and **Inkwell**: carried in Ingenium's app library as built pages (`source/build/apps/builtin/lakay.html.gz`, `inkwell.html.gz`, with `cd.html.gz` and `forge.html.gz`); work on each from its own sources, and keep the carried copy in step after each release.
