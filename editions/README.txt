Ingenium 7.67 (22 November 2026): the other editions
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
  5de1ff3b86b932dbc3302c6c9c94f1cb2a7c787da2b7737ef906f6b3b5863dbf  ingenium_full.html (43609094 bytes)
  dfb3ce9ad9615501c17a3e342b279e3e6c9a4a062ee49e36e288f36f4791213e  ingenium_gift.html (41916758 bytes)
  89e79030d58671ac6bdaf37e34319b227286871f14e03968eaad52eb4f8bef5f  ingenium_demo.html (41916758 bytes)
