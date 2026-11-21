# Ingenium record 04 · Profiles, and what each profile keeps apart

Part of the record of Ingenium's security system, written from Ingenium 7.54's sources and brought up to 7.61 (21 November 2026). The parts: `build/boot/profiles_boot.js` (the first script in the page), `build/modules/r331.js` (local profiles, 7.44), `build/modules/r338.js` (the profile rows inside the Status panel, 7.48), `build/modules/r336.js` (another person's profile names none of her apps, 7.46), `build/build_page.py` (`_OWNER_ONLY`), `build/modules/r350.js` (the practice studio, 7.61), and on the computer apps `desktop/app_profiles_744.py`.

## 1. What she asked for

Her words (14 November 2026), on the recommendations she was given: a profile key beside Ingenium's seal, managed in Settings; the owner decides for each profile whether it needs a password, hers always while the sign-in is on, a guest's or a test's none; kept apart for each person: conversations and memory, folders and the folder search, Lector and Vocatio records and Folders' notes, Display and sound settings, connections and their keys; shared: the models. On the live preview: "I approve of the preview ... Just add it to the damn app and let's move on. Put the drop down menu of version 3 of the preview." Then (20 November 2026): "please remove the profile toggle from the side navigation bar, instead put it inside of the Status panel on the top bar since it makes the most sense and cleanly removes it from messing with the design and template of the app."

## 2. The list of profiles (localStorage `ingenium_profiles`, shared by the device)

```json
{"v":1, "cur":"owner",
 "list":[{"id":"owner","name":"<her name>","t":0,"pw":"always"},
         {"id":"p<base36 time><base36 random>","name":"Theo","t":2,"pw":"own"|"none","kind":"guest",
          "added":"2026-11-19","sealed":true}],
 "ownerName":"<her name>",
 "out":<time, only while signed out (record 03)>}
```

* `id`: "owner" for the owner; every other profile `p` and 1 to 24 lower case letters or digits (checked by the pattern `^p[a-z0-9]{1,24}$` wherever an id is read).
* `name`: up to 24 characters for a profile the owner adds; the owner's own name is taken, in this order, from her persona's name, the copy's author, or the sign-in's user name.
* `t`: which pastel tile the profile wears (an index into `TINT`).
* `pw`: the owner's is always "always" (her password, while the sign-in is on); for another profile "own" (it chooses its own password the first time it opens) or "none" (it opens without a password). Shown in words by `opens(p)`: "Always your password, while the sign-in is on"; "Sealed with its own password"; "Its own password, chosen when it first opens"; "Opens without a password".
* `sealed`: set once that profile's own sign-in is turned on.
* `cur`: the profile the page opens in.

## 3. How each profile's data is kept apart (`profiles_boot.js`)

This is the heart of it, and the part to copy first into another app. It runs before any other script reads storage.

* The owner's profile keeps every name the page has always used, so nothing of hers moved when profiles came.
* Every other profile reads and writes its own copy of every store: its localStorage keys and its IndexedDB databases carry `@` and its id (`ingenium_v4@p1abc`, `ingenium_big@p1abc`). So its desk, its sign-in (its own lock record and data key), its long texts, its keys, its apps and its Fabrica are its own from the first read.
* How: `Storage.prototype.getItem`, `setItem`, `removeItem`, `key`, `clear` and `length` are wrapped for `localStorage` and `sessionStorage`; `indexedDB.open`, `deleteDatabase` and `databases` are wrapped. Every part of the page then works unchanged: it asks for `ingenium_v4` and receives that profile's own.
* What the device shares (never renamed): localStorage `ingenium_profiles` (the list itself), `ingenium_models_shared` (the models' record), `ing.gpu.diamond` and `ing.diamond.trying` (the graphics measure), `ing.security.v1`, `ing.security.fails.v1`, `ing.security.asked.v1` (the device's security settings); IndexedDB `ingenium_files` and its older name `the_foundry_files` (the models' files and the engine), `ingenium_seal` (the device's sealed pairing), `tensorflowjs` (the training lab's models).
* In the owner's profile the other profiles' names are not listed at all (`key()`, `length` and `databases()` leave them out), so a backup or the Storage page there never sweeps them up. In another profile only its own names and the shared ones are listed.
* `clear()` empties only the profile's own names; the list of profiles and the shared names stay.
* In the practice studio (section 9) the shared names and the shared databases are read and never written, and the computer app refuses the calls that would change the device.
* On the computer apps, every call into the app waits once until the app holds this profile's files (`profile_current`, `profile_use`); in another person's profile an app older than profiles is not used at all, since its disk is the owner's.
* `window.__ingProfiles`: `reg()` and `save(o)` read and write the list raw; `shared` (the two patterns); `suffix`; `rawKeys()`; `drop(id)` removes every store of a profile (its localStorage and sessionStorage names, and its databases, including by name `ingenium_v4`, `ingenium_big`, `ingenium_apps`, `ingenium_keys`, `ingenium_repos`, `fabrica_made`, `ingenium_hub`, `ingenium_desk`, `ingenium_claude`, `ingenium_meaning`, `ingenium-buildlib` with the suffix).
* `window.__ingProfile`: `{id, name, t, pw, owner:false}` for another profile, `{id:"owner", owner:true}` for hers; `window.__ingGuest` is true in another person's profile.

## 4. Switching (`switchTo`)

Everything is saved (`saveState`, and the computer app's copy flushed), the computer app is told which profile's files to hold (`profile_use`), the list's `cur` is set, and the page starts again (`location.reload()`), so no memory of one profile is ever carried into another. A computer app older than profiles can open only the owner's profile, and says so.

## 5. Locking, and who opens how

* A profile with a sign-in locks as the sign-in does (record 02); one without opens the door Who is using Ingenium.
* A profile the owner set to "own" asks for its own password the first time it opens (`IngLock.setup`), in its own stores, so its sign-in and data key are its own; cancelled, it goes back to the door.
* The door (`#profDoor`): "Who is using Ingenium?", "Each profile opens as its owner chose.", and a raised coin for each profile with its tile, its name and how it opens. On the sign-in's card, when there are two profiles or more, a key "Someone else? Choose a profile" opens the door (`onLockDoor`).

## 6. Managing the profiles (Settings, Security: Profiles on this device)

* Only the owner adds or removes a profile, and only while her sign-in is on: adding asks for it first (the key "Turn on your sign-in", `#profLockSetup`, when it is off).
* Adding: a name (refused if empty or already used), a tile, and how it opens (its own password, or none). "<name>'s profile is ready: <name> chooses its password the first time it opens."
* Removing asks once more, then takes away everything that profile kept on the device: its stores (`drop`), its files on the computer app's disk (`profile_drop`), and its folders in the folder search (from 7.59 its own index file, `rag-<id>.sqlite3`, through `IngRag.dropProfile`; and, for a profile whose folders were never moved, the reader `p:<id>` and the folders only it could read in the shared one).
* The card also says what a profile holds and keeps apart, part by part (conversations and memory; folders and the folder search; Lector and Vocatio records, or notes in its folders; Display and sounds; connections and their keys; shared: the models).

## 7. Where the profiles are reached

* The Status panel (the first key of the top bar; `openPresenceMenu`) ends with Who is using Ingenium: each profile a row of the panel's own kind (`.pres-row`) with its round pastel tile and "In use" beside the one in use; then Lock Ingenium (`#r338Lock`), Sign out (`#r344Out`, record 03) and, in her own profile, Manage profiles (`#r338Manage`). Each row does exactly what the same row of r331's menu does. The left menu has no profile key any more (r331's `#profKey` stays in the page, out of sight, so its menu keeps working).

## 8. Another person's profile on her master copy

* It runs as the full edition (`ING_HAS` answers as the full edition does), so the Desk's five apps, Fabrica's owner functions and the rest of hers are not there.
* The owner's own modules never run in it: `build_page.py` marks as `_OWNER_ONLY` every module the full edition leaves out (except the guest-only ones), and they run in her profile only.
* `r336.js` (guest-only): the app library knows no app by name; each sentence of the page that names her apps is said as the full edition says it; what that person writes or reads of their own is never touched.
* Her ways of working (r327) and her later rules are added only in her own profile (`!window.__ingGuest`).
* The models are shared: each profile's desk lists them, and they are kept once for the device (`ingenium_models_shared`).

## 9. The practice studio (7.61)

Her words (20 November 2026): "I want a practice page built into Ingenium or a Guest page built into the app that users are able to view when they are signed out of their account and want to show the app. Basically, I want the similar option as the Lakay app's "Practice Store" or some variation of that." Approved on twelve pictures of the running app (`source/previews/practice`): "I approve of the previews, please commit and push it everywhere and continue working on my requests." The parts: `build/modules/r350.js`, and its part in `build/boot/profiles_boot.js`.

### 9.1 What it is

Ingenium itself with sample work in it, to show it or to try it, opened only where no one is signed in. It is a profile of its own kind: its id is `practice` (it fits `^p[a-z0-9]{1,24}$`, so every part that keeps profiles apart keeps it apart too, the computer app included), it is never in the list of profiles, it opens without a password, and it lasts only while its window's session lasts.

### 9.2 Where it opens

* The sign-in's card: after its note ("... Nothing in it opens without it."), a key `#ildPractice`, "Open the practice studio" (the door's own `.ild-link`, underlined).
* Who is using Ingenium (after Sign out, or from "Someone else? Choose a profile"): under the coins, a line in ink, "Showing Ingenium to someone? The practice studio has sample work to try. Nothing of anyone's is in it, and nothing stays.", and a key of the door's own kind (`#r350Open`, `.r331-k`) with the practice studio's mark, a small lilac tile with an easel.
* Nowhere else: with no sign-in there is no door, and so no key.

### 9.3 Entering (`IngPractice.enter()`)

1. What the page holds is saved (a sealed desk writes nothing). On a computer app, what an earlier visit left on its disk is dropped first (`profile_drop("practice")`).
2. Its names are cleared and its sample desk is written as `ingenium_v4@practice` (`__ingProfiles.practice.clear()`, `put()`): three invented conversations, each sample reply marked "A sample reply, written for the practice studio.", in the look of the door it was opened from (day or night).
3. The list of profiles is changed (`__ingProfiles.practice.enter()`): `back` keeps the profile in use, `backOut` keeps the signed out mark (taken off meanwhile, so nothing inside takes the practice studio for a signed out page), `cur` becomes `practice`, and `practiceFresh` asks the next start to delete its databases before anything opens them. This window's session is marked (sessionStorage `ing.practice.session@practice`).
4. The page starts again (`location.reload()`, with `__ingResetting` set so that nothing is written after), so no key and no desk of the person behind the door is in memory.

### 9.4 Inside

* At the start (`profiles_boot.js`): `cur` is `practice` and this window's session is marked, so every store the page names carries `@practice`. `window.__ingPractice` is true; `window.__ingProfile` is `{id:"practice", name:"Guest", t:5, pw:"none", owner:false, practice:true}`; `__ingGuest` is true, so it is another person's profile: on her master copy it runs as the full edition, and none of her own parts run in it (section 8).
* It opens on Ingenium's welcome door, as a new person first sees Ingenium, with the Terms asked as of any new person (r326), and the practice studio's mark in the card's top-left corner in place of the little lock.
* Home: a strip at its head (`.r350-strip`): "Welcome to the practice studio", one sentence, and two keys, Start again and Leave the practice studio. The top bar: a key of the bar's own kind (`#r350Pill`, "Practice studio", a lilac dot) before the status key; it opens the Status panel. The Status panel: in place of the profiles, Lock and Sign out, a head "Practice studio", one line, and two rows, Start again and Leave the practice studio.
* Ingenia: a sample app's folder, Tide Clock, with two files and the tides conversation in it (made at its first start with `IngFolders.make` and `ccPut`).
* Settings, Security: a line before the room's card says that this device's protection can be read but not changed there, and that there is no sign-in. `IngLock.setup` says the same instead of turning a sign-in on.

### 9.5 What it may never change (it opens without a password)

Three guards in `profiles_boot.js`, active in the practice studio only:

1. The names the device shares (`SHARED_LS`: the list of profiles, the models' record, the graphics measure, the device's security settings) are read and never written or removed: `setItem` and `removeItem` do nothing for them. Only `__ingProfiles.practice` writes the list, raw.
2. The device's shared databases (`SHARED_DB`: `ingenium_files` and its older name, `ingenium_seal`, `tensorflowjs`) are read-only: a transaction asked for as `readwrite` is opened `readonly`, so a write there fails and its part says so; `deleteDatabase` of one of them deletes only the practice studio's own name.
3. The computer app: every call that would change the device is refused before it reaches the app (`NOPR`; `__ingProfiles.practiceRefuses(name)` answers for a name): its drives and repositories (`disk_*`), its models and engine (removing, moving, installing, downloading, registering, choosing their place, the engine's choice), its sharing and pairing (the `share_*` calls that change something, `seal_answer`), its runs and their tools, its training, the folders the folder search reads, the page the app opens (`page_*`), its own sign-in key (`device_key_*`), its signatures (`self_signature_put`, `self_reveal`, `self_quit`), the Cloud (`cloud_box_set`) and the clipboard (`read_clipboard`). The refusal says "The practice studio cannot do this on this computer." Calls that only read pass.

What the guards do not do, said plainly: the practice studio, like a profile, is kept apart by the app, not by the browser. Anyone who opens the browser's own tools at an unlocked device can read every store raw, as before. What keeps the owner's work closed to them is the seal (record 02), and the practice studio never opens it.

### 9.6 Start again, Leave, and a window closed

* Start again (`IngPractice.again()`): asks once ("Start the practice studio again?"); clears its names, writes the sample desk again, marks `practiceFresh`, and starts the page again: its databases are deleted at that start, before anything opens them.
* Leave (`IngPractice.leave()`): asks once ("Leave the practice studio?"); the list goes back (`cur` becomes `back`, the signed out mark comes back from `backOut`) with `practiceDrop` set, the session mark is removed, and the page starts again. At that start, before anything else, every `@practice` name and database is taken away; then `practiceDropApp` asks r350 to drop the practice studio's files in the computer app (`profile_drop("practice")`) and its own folder search index (`IngRag.dropProfile("practice")`, one index per profile since 7.59), then `appDone()`.
* A window closed while it was open: the next start finds `cur` is `practice` with no mark of its session, so it goes back to the door it was entered from and takes everything of it away, as Leave does. A practice window still open elsewhere notices (the `storage` event, and a check every three seconds), stops writing and starts again at the door too.

### 9.7 Interface

`window.IngPractice`: `on()`, `enter()`, `leave()`, `again()`, `sample(night)`. `window.__ingProfiles.practice`: `on`, `put(name, value)`, `clear()`, `enter()`, `leave()`, `fresh()`, `appDue()`, `appDone()`; `window.__ingProfiles.practiceRefuses(name)`. `window.__ingPractice`. The list of profiles' fields while it is open or being left: `back`, `backOut`, `practiceFresh`, `practiceDrop`, `practiceDropApp`.

## 10. Tests

`rig/t_744_profiles.js` (17 checks), `rig/t_746_no_apps.js` (in her own profile, the control, 4 checks; in another person's, 22), the profile parts of `rig/t_754_sign_out.js`, and `rig/t_759_practice.js` (27 checks: the doors, entering, the sample work, nothing of hers in it, the welcome door, Home, the top bar and the Status panel, the three guards, Start again, Leave, a window closed, by night). See record 09.
