# Ingenium record 00 · Read me first

The record of Ingenium's sign-in, Sign out, profiles, the whole security system, where every piece of data lives, and how the owner likes to work and how Ingenium looks: catalogued so that it can be built again, without errors, in her other apps (Carpe Diem, Lakay, Inkwell, The Forge) and in any app she makes later.

Her words (20 November 2026): "I want you to document the sign-in and sign-out functions of Ingenium and its entire security system and structure, as well as the different profiles and and data storage per profiles and everything associated with it into Ingenia's folders for Ingenium. I want the entire system and functions to be detailed and catalogued into the folders so that I can replicated them again later and add them to my other apps ... I want any local model or even frontier models that I am using to have that information available to them in the Folders from the Ingenia and be able to replicate it all with ease and efficiently with no errors or bugs."

## The files

| File | What it holds |
|---|---|
| 00 · Read me first | this page: what the record is, how to use it, how it is kept true |
| 01 · The security system at a glance | what is protected and from whom, what is not, the keys in one picture, every part and its module, a day as the system sees it |
| 02 · The sign-in and the sealed desk | the keys, the lock record, the envelopes, the sealed desk, what is sealed, every flow (on, sign in, Lock now, time away, off), the ways back in, the door's look, the interface |
| 03 · Sign out | what it does, what it newly seals (the carried apps' documents, Scriba's recordings), the start after it, by night, its tests and its two lessons |
| 04 · Profiles | the list, how each profile's stores are kept apart, switching, locking, managing, the Status panel, another person's profile |
| 05 · Where every piece of data lives | every store in the browser and on the computer's disk: what it holds, per profile or shared, sealed or not; what leaves the device |
| 06 · The other protections | Settings, Security and More protection; Ask before each export; the computer's disk; between devices; Ingenium Cloud; ownership and permissions; what is approved and not yet built; the editions |
| 07 · How the owner likes to work, and how Ingenium looks | her ways of working, the rules every part keeps, how she wants new work shown, the colours, depth, keys, cards, rows, motion, sounds, words, accessibility |
| 08 · Carrying it into another app | what to copy, in what order, what the app must provide, the names to choose, the steps, what went wrong in Ingenium, notes for each of her apps |
| 09 · Tests and checks | each test, what it checks, its count on 7.54, how to run them, checks by eye |
| 10 · Words and functions | the words used, and every function, hook, event, global and additional data string |

## How to use it

* **For the owner**: start with 01, then 08 when you begin on another app; give a model the files it needs for the step in hand.
* **For a model**: these files are in Ingenium's folder on the Ingenia page, so they go with every conversation in that folder; a long file is given as its opening and passages from across it, and the passages that match each message come with that message. Ask for the part you need by its record number and section. Quote names (functions, stores, strings) exactly as written here; where you are unsure, read the module named beside it in `source/build/modules/` before writing code. Never invent a function, a store or a string that is not named here or in the code.
* **Building it again**: follow record 08 step by step; at each step, run the matching test from record 09, changed to the new app's names; show the owner pictures one by one before anything is released (record 07, section 3).

## How it is kept true

* It was written on 20 November 2026 from Ingenium 7.54's sources, each statement checked against the module it names, and brought up to date with 7.58 on 21 November 2026 (Ingenium itself, signed and checked, in the Mac and Windows apps; record 06, section 9). Where a section says a thing is planned, it is not built.
* The same files are kept with Ingenium's sources (`source/docs/ingenium_record/` in the Ingenium-Mac-Mini repository), so a model working in any repository can be pointed to them.
* When a release changes the sign-in, the profiles, the sealing or the look, the record is brought up to date in the same release, and the folder's copies are replaced (a copy changed by the owner in her folder is kept, and the new version added beside it).
* It names no person's private data: invented people only in its examples, and no device, plan or document of the owner's beyond what Ingenium's own code already says.
