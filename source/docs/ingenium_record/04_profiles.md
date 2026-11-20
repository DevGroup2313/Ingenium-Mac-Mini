# Ingenium record 04 · Profiles, and what each profile keeps apart

Part of the record of Ingenium's security system, written from Ingenium 7.54's sources (20 November 2026). The parts: `build/boot/profiles_boot.js` (the first script in the page), `build/modules/r331.js` (local profiles, 7.44), `build/modules/r338.js` (the profile rows inside the Status panel, 7.48), `build/modules/r336.js` (another person's profile names none of her apps, 7.46), `build/build_page.py` (`_OWNER_ONLY`), and on the computer apps `desktop/app_profiles_744.py`.

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
* Removing asks once more, then takes away everything that profile kept on the device: its stores (`drop`), its files on the computer app's disk (`profile_drop`), and its folders in the folder search (the reader `p:<id>` and the folders only it could read).
* The card also says what a profile holds and keeps apart, part by part (conversations and memory; folders and the folder search; Lector and Vocatio records, or notes in its folders; Display and sounds; connections and their keys; shared: the models).

## 7. Where the profiles are reached

* The Status panel (the first key of the top bar; `openPresenceMenu`) ends with Who is using Ingenium: each profile a row of the panel's own kind (`.pres-row`) with its round pastel tile and "In use" beside the one in use; then Lock Ingenium (`#r338Lock`), Sign out (`#r344Out`, record 03) and, in her own profile, Manage profiles (`#r338Manage`). Each row does exactly what the same row of r331's menu does. The left menu has no profile key any more (r331's `#profKey` stays in the page, out of sight, so its menu keeps working).

## 8. Another person's profile on her master copy

* It runs as the full edition (`ING_HAS` answers as the full edition does), so the Desk's five apps, Fabrica's owner functions and the rest of hers are not there.
* The owner's own modules never run in it: `build_page.py` marks as `_OWNER_ONLY` every module the full edition leaves out (except the guest-only ones), and they run in her profile only.
* `r336.js` (guest-only): the app library knows no app by name; each sentence of the page that names her apps is said as the full edition says it; what that person writes or reads of their own is never touched.
* Her ways of working (r327) and her later rules are added only in her own profile (`!window.__ingGuest`).
* The models are shared: each profile's desk lists them, and they are kept once for the device (`ingenium_models_shared`).

## 9. Tests

`rig/t_744_profiles.js` (17 checks), `rig/t_746_no_apps.js` (in her own profile, the control, 4 checks; in another person's, 22), and the profile parts of `rig/t_754_sign_out.js`. See record 10.
