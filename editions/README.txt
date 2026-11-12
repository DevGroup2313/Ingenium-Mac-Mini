Ingenium 6.84 (12 November 2026): the other editions
====================================================

Each file is the whole app in one page: open it in a browser, or give it to Fabrica, Build or a kit to make
an installed app of it. They are built from the same sources as the master edition (source/build/editions.py
says what each holds), by:  python3 source/build/release.py edition full|gift|demo OUT

ingenium_full.html   The full edition (for a person close to you).
                     Home, Chat, Code, Folders, Focus, Models, Blend, Lector, the Career Studio, Build, Fabrica,
                     the five apps (Tabula, Abacus, Imago, Scriba, Fontes), the Guide and Settings.
                     Not in it: renaming Ingenium, the owner's key, the Author Studio, any of the owner's other
                     apps (Carpe Diem, The Forge, Inkwell) or their information, and any of the owner's personal
                     information or Lector's recipe.

ingenium_gift.html   The public editions (the public, participants, friends and family).
ingenium_demo.html   Home, Chat, Code, Folders, Focus, Models, Blend, Build, the Guide and Settings. Nothing else:
                     no five apps, no Fabrica, Lector, Career Studio or Author Studio, no renaming, no owner's key,
                     none of the owner's other apps named. The two differ only in the name each stores its data
                     under, so a gift copy and a demo copy at one address never share a store.

Every edition keeps the copyright line and the licence (LICENCE.txt).

Fingerprints (SHA-256). A copy whose fingerprint differs is not the owner's release:
  08acf55b1a8a37acbd5005d02eae430fc9b9b95a59f895a85f480b6b0961177a  ingenium_full.html (42631348 bytes)
  f5d44498bcbd2ec26f76039d47d72f07666b87db977271b780e8d4fcb2ae5069  ingenium_gift.html (39113877 bytes)
  4bedb38a6f37c652f5026b8402a7062e8d40f70a387a1cc7c03927da38e8ef32  ingenium_demo.html (39113877 bytes)
