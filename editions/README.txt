Ingenium 8.00 (27 November 2026): the other editions
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
  72adb94b19ff8bcba3b7ce7fa61466602bc5b94136025103d36fd433d46a91cd  ingenium_full.html (46996773 bytes)
  1a7c75a08fb7fc910ba1ae978390d430f1768e1e5b79d6e38818325b6a9adc60  ingenium_gift.html (42622699 bytes)
  639a264e2fe7795743a34a75db84f356f4c67c9bc615dc9323f8920df469a274  ingenium_demo.html (42622695 bytes)
