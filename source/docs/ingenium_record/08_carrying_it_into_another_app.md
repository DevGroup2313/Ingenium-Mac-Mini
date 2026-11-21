# Ingenium record 08 · Carrying the sign-in, Sign out and profiles into another app

Written so that the owner, or a model working for her, can give another of her apps (Carpe Diem, Lakay, Inkwell, The Forge, or one made later) the same sign-in, Sign out, profiles, practice studio and sealing as Ingenium 7.61, without starting from nothing. Read records 02 to 07 first; this one says what to copy, in what order, what the app must provide, and what went wrong in Ingenium so that it does not go wrong again.

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
| 8 | `build/modules/r350.js`, with its part in `profiles_boot.js` | the practice studio: the app shown while no one is signed in, with sample work, and its guards (record 04, section 9) | after r331, r338 and r344 |
| 9 | `build/modules/r351.js` | see the password as it is typed: a key in every password field (record 02, section 7) | anywhere after the fields' own parts; it finds every field, then and later |

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
7. If the app is to be shown while no one is signed in: the practice studio. Copy its part of `profiles_boot.js` (the practice id, the window's session mark, the three guards, `__ingProfiles.practice`), then r350 with the app's own sample work, invented and naming no one, and its own words. Test it with `rig/t_759_practice.js` (27 checks), changed to the app's names.
8. Show the owner pictures of the running app, one by one at full size, before it is released.

## 6. What went wrong in Ingenium, so that it does not again

* **The sign-in card flashed before Who is using Ingenium** (7.54): the sign-in door is drawn as soon as r197 loads, the profiles only once r344 has loaded, seconds later on a slow device. Fixed by r197 holding the card out of sight while the profiles' list says signed out. In any app where one part's door must cover another's, decide at the first paint, from data that is already there.
* **A night door with a day card** (7.54): the page's own theme is sealed with the desk, so at a locked start the body is still in day colours; only the door knows it is night, from the desk's clear header. Everything drawn over the door must take the door's look, not the body's.
* **A violet line that could not be pressed** (7.54): violet means pressable. Words that are only read are in ink.
* **A test that waited a fixed time across a page that starts again**: wait for a mark left on the old page to be gone, then for the very element expected.
* **Tests that pass alone and miss under load**: a check that waits half a second for a list to draw, or for a card to show, misses when three heavy things run at once. Wait for the element itself; run timing-sensitive tests and the security test alone.
* **Opening a database by name makes an empty one**: ask `indexedDB.databases()` first (r344's `dbThere`).
* **Writing while a page closes**: only synchronous work finishes in `pagehide`; that is why r197 carries a plain JavaScript AES-GCM (`sealTextSync`) beside WebCrypto. A database cannot be written then at all.
* **A store refused**: every write to the lock record is checked (`writeRec` returns false; "This browser's store refused the change"), and nothing is left half done.
* **Two parts of the computer app took the same names** (7.49 to 7.57): the disk seal defined `_DISK`, `_disk_status` and `_disk_write`, names the drive's repositories already used, and being set later it won, so every drive repository failed until 7.57 renamed the seal's. Give each part's names its own prefix, and scan for any function defined twice.
* **A build that renames words also renames them in quoted text**: Ingenium's build changes a page's old names to their new ones (Adamas's old name, for one) wherever they stand, and it changed one quoted label inside this record (7.55). Quote what the screen shows, and test the shipped page, not only the sources.
* **Comments in a shipped page**: Ingenium's release build takes comments out; never put meaning in a comment that the code needs.
* **A door anyone can open** (the practice studio, 7.61): whatever it can reach, anyone can. Before it shipped, three guards were put in the first script: what the device shares is read and never written, its shared databases are read-only, and the computer app refuses every call that would change the device. Decide such guards at the storage and bridge level, where every part passes, not part by part.
* **A session's end is the window's** (7.61): a mode that must not outlive its visit is tied to sessionStorage, which a new window does not have; the next start ends it and takes it away. A second window still open in that mode notices (the `storage` event, and a check every three seconds) and leaves too.
* **A name taken twice** (7.57): a patch added a part whose names were already used by another part of the computer app, and the later one won. Search for every name a patch adds before adding it.

## 7. What each of her apps already has (checked in the builds Ingenium carries, 20 November 2026)

Read from the copies Ingenium carries in `source/build/apps/builtin/` (`cd.html.gz`, `lakay.html.gz`, `inkwell.html.gz`, `forge.html.gz`). Each app's own repository is the authority: check its newest sources before changing anything, since a later build may differ.

* **Carpe Diem** (the carried build is 1091): it already has a sign-in of its own since its build 1086, "the sign-in, as Ingenium has it, in Carpe Diem's own look" (`cd-lock-1086-core` and `cd-lock-1086-door`). Its lock record is localStorage `cd_lock_v1`; its check string `carpe-diem-lock-check v1`; every value it keeps in the browser's store is sealed with AES-256-GCM under a data key that is itself sealed twice, under a key from the password and one from the recovery phrase (PBKDF2 with SHA-256); the phrase has ten words (`N_WORDS = 10`); a plain JavaScript AES-GCM (`cdGcm`) seals at once; its rooms share the window's keys through sessionStorage `cd_lock_s`; it has Lock now. Not found in it: Sign out as Ingenium has it, profiles, the recovery key file, the hint, the practice studio. So for Carpe Diem the work is to add what it lacks around its own lock, keeping `cd_lock_v1` and its data key as they are, never to put Ingenium's r197 beside it. Ingenium's Sign out seals the `carpe_` and `cd_` names when Carpe Diem is carried on the Desk (record 03), so its lock record is sealed there too and opened again at the sign-in.
* **Lakay** (the carried build is 17): it already has its own sign-in for the store's books (IndexedDB `emporium`), a Master Key of 13 groups made when the store is set up, people with roles (the owner and staff with presets), Sign out, and its practice store, which Ingenium's practice studio follows: a second database (`emporium-practice`) with sample goods and sample sales that opens with no sign-in, its store key sealed by a key kept on that device only, offered on the door ("Open the practice store"), with Start the practice store again and Leave the practice store. So for Lakay the work is to bring its look and words into her family's rules (record 07), not to replace its books or its keys.
* **Inkwell**: no sign-in and no sealing were found in its carried build (it keeps its work in localStorage and IndexedDB). It is the app that would take Ingenium's parts most directly: profiles_boot.js first, then r197, r331, r344 and r350, in the order of section 2, with Inkwell's own names (section 4).
* **The Forge**: no sign-in was found in its carried build; the cryptography in it is PermitCore's (the owner key, wrapped with PBKDF2 and AES-256-GCM), shared with Ingenium (record 06, section 6). Its work would follow Inkwell's path.
* For any app: the practice studio needs the app's stores renamed per profile first (profiles_boot.js), since its whole safety rests on its own `@practice` names and the three guards there.

### What the earlier notes said, kept for reference

These say only what is known from the sources in this repository; check each app's own sources before relying on them.

* **Carpe Diem**: a single offline page (its build scripts are kept in `source/offline_project/carpe_diem_*`); its documents are the ones Ingenium seals at Sign out under the `carpe_` and `cd_` keys when it is carried on Ingenium's Desk. Given its own sign-in, its own desk key and lock record must not be the same as those Ingenium uses for the documents it carries.
* **The Forge**: shares PermitCore with Ingenium (`thoughts/permit_core.html`, record 06 section 6), so ownership, the licence and permissions are already common; its build scripts are in `source/offline_project/forge_*`.
* **Lakay** and **Inkwell**: carried in Ingenium's app library as built pages (`source/build/apps/builtin/lakay.html.gz`, `inkwell.html.gz`, with `cd.html.gz` and `forge.html.gz`); work on each from its own sources, and keep the carried copy in step after each release.
