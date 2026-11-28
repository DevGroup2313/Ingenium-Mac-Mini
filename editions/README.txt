Ingenium 8.13 (28 November 2026): the other editions
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
  435199e86f9fe5b44f8e8904bc7f7f06baa859e7553dda6a93ba7cedf7ce0f92  ingenium_full.html (47117959 bytes)
  b7d8da0b9a8134c200062a5d04393c873919dd207381a076c7dc8a04e506f6df  ingenium_gift.html (42741464 bytes)
  a74a1631d2d37a1409566409674221f3b4cab4c2bc1da1cadea1b090acd0c884  ingenium_demo.html (42741464 bytes)
