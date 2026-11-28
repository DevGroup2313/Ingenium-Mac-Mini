Ingenium 8.11 (28 November 2026): the other editions
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
  6ba828ba394adfd02a9af7a0f2103e92a7869275769bf738c6ea9170e3d1f87a  ingenium_full.html (47112552 bytes)
  689fe89d56248cac754e68bf8ba73cd21b601b5f8bc8127678a1dc767d65d166  ingenium_gift.html (42736010 bytes)
  0bf70af5b860ec36526b0c8f97b576c9903327b1fcfa6653e65ca27ba835b84f  ingenium_demo.html (42736010 bytes)
