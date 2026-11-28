Ingenium 8.06 (28 November 2026): the other editions
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
  760e8111ea5ba0674ce426462282de3840fc205587d7b6642fd0ee5c228e5f5c  ingenium_full.html (47020808 bytes)
  760eb4555d1bd7ecb7c29644aaea13b72e565d46a28b0f0e8deef32d162ebdb8  ingenium_gift.html (42644188 bytes)
  f716e375ed5dfbd7deb58582b4a2fa4e5a12f7cb779ff082f282b6f01a237db0  ingenium_demo.html (42644196 bytes)
