Ingenium 7.41 (18 November 2026): the other editions
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
  9687e0637feec8170a9f671479ef90e2c8f416df7d1de3f0fcc3de00eb60edd4  ingenium_full.html (45112018 bytes)
  d3c77f61c6c92e64c36ad1c4a49193a26a7961aea163f38077fe1c0d7dc1370a  ingenium_gift.html (41130901 bytes)
  7a6917b59b244ebd6a182513bef3fefe17827c735c55b159ddeeec55a0b7aee6  ingenium_demo.html (41130901 bytes)
