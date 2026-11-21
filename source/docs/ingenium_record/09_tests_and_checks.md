# Ingenium record 09 · Tests and checks

Part of the record, written from Ingenium 7.54's sources and brought up to 7.61 (21 November 2026). Every test is in `source/rig/`, runs in Chromium through Playwright (the computer app's own tests in Python), and uses invented people, documents and recordings only. Each prints `PASS` or `FAIL` for each check, then "N passed, M failed". The numbers below are those of the release page of the release that last ran each test (7.59's unless the column says otherwise), served on its own port and checked by its SHA-256 before the tests.

## 1. The tests of the security system

| Test | What it checks | Count |
|---|---|---|
| `t_700_lock.js <page url> <out>` | the sign-in (record 02): the welcome door's offer; turning protection on (name, password, the phrase shown once, two words asked back); the desk and the long texts sealed (the desk an envelope with a clear header, the long texts envelopes, no "role":"me" and no plain text anywhere); the plain JavaScript AES-GCM giving the very bytes WebCrypto gives; a wrong password and a wrong name; the right password; Lock now; the lock after time away; the ways back in; turning protection off | 58/58 |
| `t_754_sign_out.js <page url> <out>` | Sign out (record 03), section 8 of that record | 25/25 |
| `t_744_profiles.js <page url> <out>` | the profiles (record 04): the owner's key and menu; Profiles on this device; adding needs the owner's sign-in; a profile without a password has its own desk, the full edition, none of her apps or rules, its own store names; back to the owner asks her password; a profile with its own password; Lock Ingenium offers Someone else; removing a profile takes its stores | 17/17 |
| `t_746_no_apps.js <page url> <out> [owner/guest]` | none of her apps in another person's profile ("guest") or in an edition other than the master; "owner" is the control | 4/4 owner, 22/22 guest; 22/22 full, 19/19 gift, 19/19 demo |
| `t_736_security.js <page url> <out>` | Settings, Security (record 06, section 1): the room, the true states, the first start's question, Offline only, and the other switches. Run it alone, with nothing heavy at the same time | 14/14 |
| `t_751_export_ask.js <page url>` | Ask before each export (record 06, section 2) | 19/19 |
| `t_749_disk_page.js <page url>` | the disk key's hand-over and drop (record 06, section 3), with a stand-in computer app that records each call | 15/15 |
| `t_750_disk_page.js <master url> [<gift url>]` | what the room says the computer app seals | 8/8; 12/12 with the gift edition |
| `t_736_leak_hunt.js` | a survey: a real computer app runs, protection is turned on as the owner would, a mark is written into every kind of thing she makes, then every store is read raw (localStorage, sessionStorage, every IndexedDB database, Cache Storage, the private file system, and the disk), so anything still readable without her password is found | run when the sealing changes |
| `t_758_self_check.py` and `t_758_self_page.js` (with `t_758_run_self.py`) | Ingenium itself, signed and checked (record 06, section 9): the app's side with a test key (signed, changed, a stamped build, another version or edition, other keys and changed signatures refused, her own page never refused, the app's own address, the bridge); the page signs in the browser, the app checks in Python, Node checks again apart from both | 7.58 |
| `t_759_rag_seal.js <server url> <out>` | the folder search's index (record 06, section 10), on the store alone: the move out of the shared index, each profile's own, the seal, read raw, no key, another key, a changed byte, opened again and sealed again in place, a sealed shared index left alone, a removed profile's index | 7.59 |
| `t_759_rag_page.js <page server url> <out>` | the same on the page, with the folder bridge standing in: plain without a sign-in, sealed when it is turned on, open again after Lock now, opened again when it is turned off, and what Settings, Security says | 7.59 |
| `t_754_ways_rule.js <master url>` | her tenth rule added once to her ways of working, in her own profile only | 7/7 |
| `t_755_record.js <master url>` | this record in Ingenium's folder: every file the very text of its source, nothing added twice, carried by a conversation in that folder, her changes kept, sealed with her sign-in, nothing of it in another person's profile | 10/10 |
| `t_758_self_check.py` | Ingenium itself, the computer app's side, with a test key: signed, changed, a stamped build, another version or edition, other keys and changed signatures refused, her own page never refused, the bridge | 57/57 on 7.58 |
| `t_758_self_page.js` with `t_758_run_self.py` | the page signs in the browser, the computer app checks it in Python, Node checks it again apart from both | 24/24 on 7.58 |
| `t_759_practice.js <page url>` | the practice studio (record 04, section 9): the doors, entering, the sample work, nothing of hers in it, the welcome door, Home, the top bar and the Status panel, the three guards with a stand-in computer app, Start again, Leave, a window closed, by night | 27/27 |
| `t_759_peek.js <page url>` | see the password as it is typed (record 02, section 7): the key in each field, shown and hidden, the focus and the caret kept (the sign-in still opens ready to type), marked secret, never spell-checked, no purple shading, a password field again when sent, a field added later, by night | 15/15 |

## 2. The tests of the editions (before any push)

| Test | What it checks | Count |
|---|---|---|
| `t_627_editions.js <out> master=<url> full=<url> gift=<url> demo=<url>` | each edition's pages carry what that edition should, and nothing else | 26/26 |
| `t_745_owner_free.js full=<file> gift=<file> demo=<file>` | the whole text of each edition, not only its pages: nothing of hers (her plans, her ways of working, her devices, the master's own parts) | 21/21 |
| `t_745_to_full.js <folder url> <out>` | a computer moved from the master edition to the full edition keeps all of its owner's work: the full edition, served from the same address, asks once to bring the master's work in (`r332.js`), then opens with the same password, every conversation, note and name there and sealed | 15/15 |

## 3. How to run them as Ingenium's releases do

1. Build the page (`python3 source/build/release.py page`) and serve it on a port of its own (`python3 -m http.server <port> --bind 127.0.0.1 --directory <folder>`).
2. Check that the server serves the very page under test: `curl -s http://127.0.0.1:<port>/ingenium.html | sha256sum` must equal `sha256sum ingenium.html`.
3. Run the tests one or two at a time; run `t_736_security.js` and the tests that time a door or a list alone. A check that fails only when several heavy things run at once is run again alone before anything is changed; a check that fails alone is a fault to fix.
4. Build the editions (`release.py editions`) and run their tests before pushing any page.

## 4. Checks by eye, for a person

* Turn the sign-in on, Lock now, sign in again: the desk is as it was.
* Sign out by day and by night: the page starts at Who is using Ingenium, headed Signed out in ink, with no flash of the sign-in card, and in the night colours by night.
* Open each way back in once, and put the recovery key file and the ten words away from the device.
* In Settings, Security, every protection's state reads true.
* Signed out: Open the practice studio from the door, try a room, Leave: the door comes back as it was, and nothing of the visit is left.
* On the sign-in, type the password, press the eye: the text shows; press it again: it hides.
