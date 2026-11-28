Ingenium 8.05 (27 November 2026): the other editions
====================================================

Each file is the whole app in one page: open it in a browser, or give it to Fabrica, Build or a kit to make
an installed app of it. They are built from the same sources as the master edition (source/build/editions.py
says what each holds), by:  python3 source/build/release.py edition full|gift|demo OUT

ingenium_full.html   The full edition (for a person close to you).
                     Home, Chat, Code, Folders, Memoria, Focus, Models, Blend, Lector, the Career Studio, Build,
                     Fabrica, the five apps (Tabula, Abacus, Imago, Scriba, Fontes), the Guide, Custodia and Settings.
                     Not in it: renaming Ingenium, the owner's key, the Author Studio, any of the owner's other
                     apps (Carpe Diem, The Forge, Inkwell) or their information, and any of the owner's personal
                     information or Lector's recipe.

ingenium_gift.html   The public editions (the public, participants, friends and family).
ingenium_demo.html   Home, Chat, Code, Folders, Memoria, Focus, Models, Blend, Build, the Guide, Custodia and Settings.
                     Nothing else: no five apps, no Fabrica, Lector, Career Studio or Author Studio, no renaming, no
                     owner's key, none of the owner's other apps named. The two differ only in the name each stores
                     its data under, so a gift copy and a demo copy at one address never share a store.

Every edition keeps the copyright line and the licence (LICENCE.txt).

Fingerprints (SHA-256). A copy whose fingerprint differs is not the owner's release:
  d8629ce13de4e66d184ce0e3d31ab3325c059a02d120c44fd0bbccef9085afc6  ingenium_full.html (47020808 bytes)
  3588690bc367ccb3a1f782f854a18b935d91f02c2ef1b63d8abc18db05ef7eb0  ingenium_gift.html (42644730 bytes)
  008d4d86ccba8a139ffb2bfe9f485ab11acbf4b5115258ced9d87865656e7f47  ingenium_demo.html (42644730 bytes)
