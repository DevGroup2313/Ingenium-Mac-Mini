Ingenium 6.53 (7 November 2026): the other editions
===================================================

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
  09f9ddb2733259794750d534035af4ee35188e96a76f1067a83c9a640514f3d6  ingenium_full.html (41692394 bytes)
  97d804f1c140eee1036d800597baef04ddcec06381a447f32f1c19a154409e5b  ingenium_gift.html (38236048 bytes)
  9cdbf722a3dac913dde04fadcc0652d402a7d5dd99ec99d4480a5a0265a42708  ingenium_demo.html (38236048 bytes)
