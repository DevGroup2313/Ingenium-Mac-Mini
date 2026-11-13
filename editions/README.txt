Ingenium 6.96 (13 November 2026): the other editions
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
  5c9d0bcdc83322a737adc1e1db8a5a9d0c3b05f94be25c52ba6f2d178ffb4f86  ingenium_full.html (43131225 bytes)
  c6a5559de7a6c99e3ffd1eab4ef3ef193583a1e2418853f07474b045f6cf71a4  ingenium_gift.html (39372929 bytes)
  7fb1e7789c8599759fb4f68941e18cffac3f15f8380e50692e89d535b10576e9  ingenium_demo.html (39372937 bytes)
