# Ingenium record 03 · Sign out

Part of the record of Ingenium's security system, written from Ingenium 7.54's sources and brought up to 7.61 (21 November 2026). The module is `build/modules/r344.js`; the two hooks it uses are in `build/modules/r197.js` (record 02).

## 1. What she asked for

Her words (20 November 2026): "I want to be able to log out of Ingenium and not only be able to login. I want to be able to sign out of my profile and out of the app and have my data and chats and evrything else sealed until I login again into Igenium."

Approved on eight pictures of the running app, one by one at full size (`source/previews/sign_out`), after the fourth was fixed at her word ("There is something wrong with this screenshot, please fix it"), with: "I do approve of the other screenshots of the previews, please commit and push it everywhere and continue working on my requests." Released in 7.54.

## 2. Where Sign out stands

* The Status panel (the presence menu from the top bar): a row "Sign out" (`#r344Out`) right after Lock Ingenium (`#r338Lock`), of the panel's own kind: the row copies Lock Ingenium's class, so it looks and moves exactly as that row does.
* Settings, Security, Sealed on this device: a key "Sign out" beside the Lock now key (`[data-a="lock"]` in `#secCard`).
* Settings, Your data, the sign-in's own card (`#ingLockCard`): a key "Sign out" beside Lock now.
* Each key copies the class of the Lock now key beside it, without its `pri` (main key) class, so it is a quiet key of that card's own kind. The keys are put in place by a MutationObserver on the page, at most twice a second, so cards drawn later get theirs too.

## 3. What it does (`go()`)

1. Without a sign-in nothing can be sealed, so it says so, and never pretends: a question (Ingenium's own `ingAsk`) titled "Sign out needs your sign-in": "Signing out seals everything of yours with your password, so that nothing can be read until you sign in again. Your sign-in is off, so nothing can be sealed yet. Turn it on first: a name and a password, and ten recovery words." Keys: Turn on my sign-in (opens `IngLock.setup`), Not now (nothing changes).
2. With a sign-in: the profiles' list (localStorage `ingenium_profiles`, shared by the device) is marked signed out (`out` set to the time). If the browser's store refuses, nothing happens and a note says so. From 7.61, a copy whose list was never written (a full or gift copy with one profile; the master writes it at once, with the owner's name) starts one here, as r331 does: before, Sign out did nothing on such a copy and said the store had refused.
3. `IngLock.lockNow("signout")`: the lock saves, calls `window.__ingBeforeLock`, drops the keys, shows "Signed out. Everything of yours is sealed until you sign in again." and starts the page again (record 02, section 6.4). If the lock does not go on, the mark is taken off again.

## 4. What is sealed, newly, by Sign out and by every lock

Before 7.54 the lock left plain the documents of the apps carried on the Desk (Tabula, Abacus, Imago, Scriba, Fontes) and Scriba's recordings. Now, in the owner's own profile only (the Desk's apps are hers alone from 7.52):

* The documents: every localStorage key that begins with `tabula_`, `abacus_`, `scriba_`, `fontes_`, `carpe_` or `cd_` (`CARRIED`). Each value is sealed in place with `IngLock.sealTextSync(value, "carried " + key)`, so it reads `ING1.…`. This happens in `window.__ingBeforeLock` (each lock and Sign out) and on `pagehide` (the page closing while signed in), since a synchronous seal is the only one that finishes while a page closes.
* Scriba's recordings: the IndexedDB database `scriba_db`, store `recordings` (records `{id, name, ts, dur, blob}`). Each record is replaced by `{id, __ing:"sealed", env}`, where `env` seals JSON `{meta, type, bytes}` (the record's fields, the blob's type and its bytes in base64) with additional data `"scriba recording " + id`. Only at a lock or a Sign out, not as a page closes (a database cannot be written while a page closes).
* The database is never opened by name unless `indexedDB.databases()` lists it: opening a database that is not there would make an empty one.
* Things that are not hers to seal (`cd_scriba_store`, the cache `cd-scriba-1044`: the engine's files) are untouched.

At the sign-in (`window.__ingAfterOpen`, called by r197 after the desk is opened and before the door goes): the documents are opened in place, then the recordings, each back to its own record with its sound as a `Blob` byte for byte; then the signed out mark is taken off. A value that cannot be opened is kept aside under `ing_carried_sealed:<its key>`, never lost, and the app starts without it.

## 5. The start after Sign out

* r197 paints the sign-in door as soon as its part of the page loads. If the profiles' list says signed out, the sign-in's card waits out of sight (`#ingLockDoor.ild-wait .ild-card{visibility:hidden}`), so it never shows for a moment before the profiles. Should nothing take over within 12 seconds, it shows. (Measured on a loaded machine before this was added: the sign-in card showed for about 2.5 seconds before the profiles covered it.)
* r344, once its part has loaded, shows Who is using Ingenium (r331's door, `IngProfiles.door()`), headed by a line in plain ink, not violet, since it is not pressed: "Signed out. Everything is sealed until its profile signs in again." (`.r344-door-out`, colour `var(--p3-ink2)`). The sign-in's card stays out of sight beneath (`#ingLockDoor.r344-under .ild-card{visibility:hidden}`).
* Choosing her own profile hides the profiles and shows her sign-in, without starting the page again. Choosing another profile opens that one as it opens (r331's `switchTo`).
* From 7.61, under the coins: a line in ink and the door's own key, Open the practice studio (record 04, section 9). The signed out mark is kept aside while the practice studio is open (`backOut`) and put back when it is left, so the page returns to this door, still headed Signed out.
* By night: the page's own look is sealed with the desk, so only the sign-in door knows it is night (r197's `night()` reads the desk's clear header). While that door stands by night, the profiles door (`#profDoor.r344-night`) and the "Someone else? Choose a profile" key on the sign-in's card (inside `#ingLockDoor.ild-night`) take the night colours that r331 gives the page by night: the same values, set on those two elements, so a night door never holds a day card.

## 6. Hooks and interface

* `window.__ingBeforeLock(why)`: seals the documents (at once) and the recordings (a promise); r197 waits for it before the keys go.
* `window.__ingAfterOpen()`: opens them again, then clears the signed out mark.
* `window.IngSignOut`: `go()`, `signedOut()`, `_seal()`, `_open()` (the last two for tests).
* The window event `ing-keys` with `held` true clears the signed out mark.

## 6b. The Terms while sealed (7.61)

In the full, gift and demo editions a new copy is asked to agree to the Terms (r326). Its agreement is kept in the desk, so it is sealed with it: while the desk is sealed (`__ingLocked`), nothing is asked. Before 7.61 the sheet opened behind the sign-in door after Lock now or Sign out, and asked again once the desk had opened.

## 7. Two lessons from its preview, kept for every later one

* A picture of a state must be reached the way the owner would reach it, never forced. The first night picture had been made by switching to Night on a page already signed out, which gave a night card on a day door that no one ever sees; taken the real way (signed in, Night chosen, signed out) it showed the opposite fault, which was then fixed.
* A step that starts the page again (Lock now, Sign out: r197 reloads 350 ms after sealing) must be waited for by a mark left on the old page (`window.__pvOld`), never by a fixed pause; and a door that a later part puts up must be waited for by its own element.

## 8. Tests

`rig/t_754_sign_out.js`, 25 checks (on 7.54's release page): the row's place in the Status panel; the question without a sign-in, and Not now; the keys beside Lock now in Settings; Sign out: the door headed Signed out, the card out of sight, the line in ink, and, watched frame by frame from the page's first frame, the sign-in card never shown before the profiles; the documents and the recording sealed in the store, their words nowhere in clear; her own profile: her sign-in without a reload; everything opened again as it was, the recording byte for byte; Lock now seals them too; a page closed while signed in leaves the documents sealed; four checks by night; another profile chosen from the door opens as it opens; no error on the page.
