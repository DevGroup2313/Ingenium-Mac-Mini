"""The owner's licence, version 3 (25 October 2026), for each of the owner's apps, from one text.

    python3 -I make_licence.py            writes LICENCE_ingenium.txt and LICENCE_forge.txt beside this file
    python3 -I make_licence.py check      fails if either file differs from what this script writes

The owner's words (24 October 2026): "The license and permission needs to be better written and better formatted and made
airtight." and earlier: "The app is my sole original work and only I am able to do distribute, sell, edit, remove or basically
do anything with it, no one else has that right and should not ever have access unless I grant them limited permission that I
can discontinue at any time. I want that made explicit for all of my apps."

The text is plain, so it reads the same in a repository, a text editor and inside the apps. Its shape is regular, so the apps can
lay it out as a document (modules/r177.js in Ingenium): a title block; IN PLAIN WORDS with bullet lines; PART headings; numbered
section headings in capitals ("4. NO RIGHT IS GIVEN"); clauses numbered "4.1"; lists lettered "(a)"; wrapped lines indented under
their first line. Lines are at most 76 characters."""
import os, sys, textwrap

HERE = os.path.dirname(os.path.abspath(__file__))
OWNER = "Yannie D. Forest"
VERSION, DATE = "3", "25 October 2026"

APPS = {
    "ingenium": {"name": "Ingenium", "file": "LICENCE_ingenium.txt",
                 "parts": "its guide, tour and help"},
    "forge": {"name": "The Forge", "file": "LICENCE_forge.txt",
              "parts": "its guidebook, lessons and tour"},
}

# The text. {A} is the app's name; {O} the owner's. A line starting "# " is a PART heading, "## " a section heading,
# "* " a plain-words bullet, "N.N " a clause, "(x) " a list item; anything else is a paragraph.
TEXT = """
* {A} belongs to {O} alone. Only the owner may use, copy, share, sell, change or remove any part of it.
* Anyone else needs a permission from the owner first. Seeing the code, holding a copy, or paying for one gives no right.
* A permission is valid only if it is a file signed with the owner's key, or a written message from the owner.
* A permission names one person, allows only what it says, and cannot be passed on.
* The owner may withdraw a permission at any time, for any reason. It also ends at once if its terms are broken.
* When a permission ends, stop using {A} and delete every copy, backups included.
* A copy the owner gave you as a gift comes with a permission to use it. If anyone else gave you a copy and you hold no permission, do not open it: delete it, or ask the owner. Deleting a copy never needs a permission.
* What you make with {A}, such as your own writing and apps, is yours.
* A copy that is not one of the owner's releases, or that has been changed, is not genuine. It may be harmful: do not run it.
* To ask for a permission, write to the owner. Say who you are, which app you mean, and what you would like to do with it.

# PART A. WORDS USED IN THIS NOTICE

## 1. WHAT THE WORDS MEAN
In this notice:
(a) "The owner" means {O}, and the owner's heirs and successors.
(b) "{A}" means the software called {A}, and everything that forms part of it or comes with it. This includes its source code and compiled code; its page; every app, installer and package made of it for any device; {P}; its other text; its sounds, pictures, icons, seal, name and visual design; the settings and data the owner made for it; and every version, edition, update, translation and part of any of these, released or not.
(c) "A copy" means any reproduction of {A} or of any part of it, in any form or medium, whole or in part, exact or changed. This includes a copy kept only in memory, in a cache, in a backup, or in a fork of a repository.
(d) "A derived work" means anything made from {A}, based on it, adapted or translated from it, or that contains any part of it. Section 3.6 says what is not a derived work.
(e) "Use" means to run, open, load, install, display or operate {A}, or any part of it, on any device. Reading this notice, checking whether a copy is genuine (section 9), and deleting a copy are not use.
(f) "Distribute" means to give, send, share, publish, post, upload, host, stream, sell, rent, lend, license or otherwise make {A} or a copy available to anyone, by any means, for payment or free, in public or in private.
(g) "A permission" means a permission given by the owner as section 6 sets out, or one of the limited permissions in section 6.8. "The holder" means the person a permission names.
(h) "The work of others" means the software, fonts and models made by other people that {A} carries, listed in THIRD_PARTY_NOTICES.txt.

## 2. HOW TO READ THIS NOTICE
(a) "Including" means "including, without limit".
(b) The headings and IN PLAIN WORDS help the reader. They do not narrow the terms. If they ever differ from the terms, the terms apply.
(c) The singular includes the plural, and the plural the singular.
(d) Where this notice says the owner "may" do something, the owner decides alone, for any reason or for none.

# PART B. OWNERSHIP

## 3. THE OWNER OWNS {AU}
3.1 {A} is the sole original work of the owner. The owner conceived, wrote, designed and built it, and owns it outright.
3.2 The owner holds every right in {A}, in every country, now and in the future. This includes copyright, rights in designs, database rights, rights in its name, seal and other marks, rights in confidential information, moral rights, and every other right of any kind, registered or not, that exists now or arises later.
3.3 Moral rights are an author's personal rights in their own work. The owner asserts the right to be identified as the author of {A}. The owner also objects to any distortion of {A}, or other treatment of it, that the owner has not made or approved.
3.4 The name {A}, its seal, the crest of The Offline Project, and the names and seals of the owner's other apps are the owner's marks. No one may use them, or anything likely to be mistaken for them, without a permission.
3.5 The work of others is not the owner's. Section 13 deals with it.
3.6 What a person makes with {A}, such as their own writing, documents, data and apps, is not {A}. It is not a derived work only because {A} helped to make it, or because it carries parts of {A} that {A} put there itself. It belongs to the person who made it, who may keep it after their permission ends. Any part of {A} that it carries, such as code, templates, sounds, pictures or the shell inside an app package, stays the owner's. Section 6.8 says how that part may go with the person's work.

# PART C. NO RIGHTS FOR ANYONE ELSE

## 4. NO RIGHT IS GIVEN
4.1 This notice gives no right to anyone, except the limited permissions in section 6.8. Every other right in {A} is reserved to the owner.
4.2 No right of any kind comes from any of these:
(a) {A}'s code being readable, visible or published;
(b) a repository being public;
(c) holding, receiving, buying or downloading a copy, or a copy being given by someone other than the owner;
(d) the owner knowing of a use and saying nothing;
(e) any conduct, custom or earlier dealing;
(f) anything else at all, except a permission.
4.3 A permission is the only licence anyone can have in {A}. No permission can be implied. No one gains one from anything the owner does, says or leaves undone, even if they relied on it. In legal terms, no licence arises by implication, by conduct or by estoppel.
4.4 Where any of the owner's repositories is public, a service's own terms may let its users view or copy what is kept there (for example, GitHub's terms let its users view and fork a public repository on GitHub itself). This notice does not take away what those terms give. Those terms give only what they say, only within that service, and only through its own features. They give no right to use, run, install, change or distribute {A} anywhere else. A fork or copy made that way is still bound by this notice in full. This is the only exception to section 4.2.

## 5. WHAT NO ONE ELSE MAY DO
5.1 No one but the owner may do any of these things without a permission that expressly allows it:
(a) use {A};
(b) make a copy, keep a copy, or download one to keep;
(c) distribute {A} or a copy of it, in whole or in part;
(d) change, edit, adapt, translate, extend or combine {A}, or make a derived work;
(e) take any part out of {A}, or delete or disable any of its features, in a copy that is then used or distributed;
(f) reverse engineer, decompile, disassemble or take apart any compiled form of {A}, except where the law allows it without permission and that right cannot be excluded;
(g) remove, hide, alter or work around this notice, the copyright line, the build stamp, the fingerprints, the seal, the edition, or the holder's name or permission number written into a copy (section 9 explains these marks);
(h) remove, disable, bypass, weaken or defeat any technical measure in {A}, including its permission checks, signatures, fingerprints and licence card, or make, share or use any tool, code or instructions for doing so;
(i) present a copy, changed or not, as the owner's release, or present {A} or any part of it as the work of anyone but the owner;
(j) add any software, code or content to {A} and pass it on, or release any software under {A}'s name or marks, or in any way that suggests it comes from the owner or has the owner's approval;
(k) use {A}, or any part of it, to develop, train, tune, test or evaluate any artificial intelligence or machine learning system, or put it in any dataset;
(l) mine, scrape, harvest or analyse {A} by automated means. This includes text and data mining, which means using software to copy and study content in bulk. The owner expressly reserves this right, and does not allow it. This does not cover what a device or service does on its own to keep its users safe, such as a virus check;
(m) use {A} in or for any product, service, business or other commercial purpose;
(n) use {A} for anything unlawful, or to harm any person, device or system;
(o) help, allow or encourage anyone else to do any of these things.
5.2 For anyone but the owner, anything that a permission does not expressly allow is forbidden.

# PART D. PERMISSIONS

## 6. HOW A PERMISSION IS GIVEN
6.1 Only the owner can give a permission. No one else can give, extend, renew or change one: not a holder, a seller, a host, an employer, or anyone who says they act for the owner without the owner's own written word.
6.2 Apart from the limited permissions in section 6.8, a permission must be in writing, and is valid only if it is one of these:
(a) a permission file signed with one of the owner's keys, whether it is given to the holder or written into a copy made for them. It is valid only if its signature is genuine and nothing in it has changed since it was signed. A file signed with a key that was lost, stolen or used without the owner's consent is not a permission. What a copy of {A} shows does not decide whether a permission is valid; or
(b) a letter or message from the owner that names the holder, the apps it covers and what is allowed, and says when it begins and when it ends, if it has an end.
6.3 Every permission:
(a) names the person it is given to, and covers that person alone;
(b) allows only what it names, for the apps it names, and nothing more. A permission to use or install an app also allows the copies this needs on the holder's own devices, such as a copy in memory, but no others;
(c) begins on its start date, and ends on its end date if it has one;
(d) is personal to its holder. The permission itself cannot be given, sold, lent, shared or passed on in any way, and its holder cannot grant anyone else a permission under it. In legal terms, it cannot be transferred, assigned or sublicensed. A holder may pass on copies only as section 6.6 allows;
(e) leaves the owner free to do anything with {A}, and to give, refuse or withdraw any other permission;
(f) can be withdrawn by the owner at any time, for any reason or none. It ends as soon as the owner tells the holder, by any means, or as soon as the owner publishes, or gives the holder, a signed list of withdrawn permissions that names it, whichever comes first. {A} works without a connection, so it may still show a permission as valid after it has ended. That does not keep the permission alive. If the law that applies does not allow a permission to be withdrawn at once, it ends after the shortest notice that law allows;
(g) ends at once, without notice, if its holder breaks it or this notice, or disputes the owner's rights in {A}.
6.4 Paying for anything, including a copy, a service or a permission, does not change these terms, unless a written agreement signed by the owner says so in express words.
6.5 The owner may refuse any request for a permission, and need not give a reason.
6.6 A permission can allow any of these things, and each means only what is written here:
(a) "use it": to use {A};
(b) "install it on their own devices": to install {A} on devices the holder owns or controls;
(c) "change it, for their own use": to change {A} for the holder's own use. A changed copy may not be passed on to anyone;
(d) "make install packages of it": to make install packages of {A} for the holder's own devices. A package may be passed on only as (e) or (f) allows;
(e) "give a copy to someone named in a permission of their own": to give an unchanged copy, without charge, to a person who holds a permission of their own that allows them to use it;
(f) "sell it": to sell unchanged copies, on terms the owner sets in writing, only to persons who hold a permission of their own that allows them to use it.
6.7 A copy passed on under a permission carries no right with it. The person who receives it may do only what their own permission allows. Selling a copy never sells {A}, or any right in it.
6.8 This notice itself gives these limited permissions, and no others. Section 6.2 does not apply to them, and section 6.3 does, except that they name no one. The owner may withdraw any of them at any time, for everyone or for one person, by telling them, by changing this notice, or, for (b), by taking the page down.
(a) A person to whom the owner gives a copy as a gift may use it, and install it on their own devices, unless the owner says otherwise when giving it. A permission file that comes with the copy takes the place of this permission.
(b) Anyone may use a copy that the owner offers on the owner's own web pages for the public to try, there and while the owner offers it. They may not keep, change or pass on a copy, beyond what their browser keeps by itself to show the page.
(c) A person who may use {A} may pass on, inside a work of their own as section 3.6 describes, the parts of {A} that {A} itself puts there. Those parts may not be taken out, used on their own, or used to make anything that does the work of {A}.

## 7. WHEN A PERMISSION ENDS
7.1 When a permission ends, for any reason, its holder must at once stop all use of {A}, delete or destroy every copy and every derived work they hold or control, backups included, and confirm this to the owner in writing if the owner asks. Section 3.6 says what the holder keeps.
7.2 The end of a permission does not end the holder's duties under this notice, or any claim the owner has.
7.3 Nothing done under a permission gives its holder any further right or claim. Any change, improvement or derived work a holder makes belongs to the owner from the moment it is made, and the holder will sign anything the owner reasonably asks to confirm this. If the law does not let it pass to the owner in this way, the holder gives the owner a free, permanent, worldwide and exclusive right to it, which cannot be withdrawn, and will not use it or pass it on except as a permission allows. As far as the law allows, the holder will not assert any moral right in it against the owner or anyone the owner allows. Section 3.6 says what is not a derived work.
7.4 When a permission ends, permissions the owner has given to other people do not end with it. A person who received a copy from the holder may go on only as their own permission allows. The holder must at once stop offering, giving or selling copies.

## 8. SUGGESTIONS AND CONTRIBUTIONS
8.1 Anyone who sends the owner a suggestion, report, idea or change for {A} agrees that the owner may use it freely, in any way, without payment, credit or any other duty.
8.2 Sending it gives the sender no right in {A}.

# PART E. GENUINE COPIES AND THE OWNER'S PROTECTION

## 9. GENUINE COPIES
9.1 Only the owner releases {A}. A copy is genuine only if it is one of the owner's releases and has not been changed. Being genuine says only where a copy came from. It gives no right to use it; only a permission does.
9.2 Each release names its version and edition, and lists its SHA-256 fingerprints in BUILD_INFO.txt. A copy whose fingerprint differs is not genuine.
9.3 A copy that is not genuine may contain harmful software. Do not run it. The owner is not responsible for any copy that is not genuine, or for anything it does.
9.4 Each build carries its build stamp, and a copy made for a holder may carry the holder's name and the permission's number. This is stated here openly. Removing or changing these marks breaks this notice.

## 10. THE OWNER'S REMEDIES
10.1 Doing any of the things in section 5 without a permission, or beyond what a permission allows, breaks this notice and infringes the owner's rights. The owner may take any action the law allows, in any country, including asking a court to stop it at once, and claiming damages, profits and costs.
10.2 These remedies add to one another, and to any other remedy the law gives.
10.3 If the owner does not act on a breach at once, or at all, the owner keeps every right to act on it, and on any other breach, later.

# PART F. GENERAL TERMS

## 11. NO WARRANTY
{A} is provided as it is, with all its faults, and without any promise or warranty of any kind, to the fullest extent the law allows. Keep your own backups.

## 12. NO LIABILITY
To the fullest extent the law allows, the owner is not liable for any loss or damage of any kind that comes from {A}, from its use, or from not being able to use it. This does not limit any liability that the law does not allow to be limited, such as for death or personal injury caused by negligence, or for fraud.

## 13. THE WORK OF OTHERS
13.1 {A} carries software, fonts and models made by others, listed in THIRD_PARTY_NOTICES.txt, each under its own licence. Those licences apply to those parts alone, and nothing in this notice takes away a right they give.
13.2 Those parts give no right in {A} itself. Everything in {A} that is not listed there is the owner's.

## 14. THE OWNER'S OTHER APPS
14.1 Some editions of {A} carry copies of other apps made by the owner. Each belongs to the owner alone. Where it carries a notice of its own, that notice applies to it. Where two of the owner's notices differ, the stricter one applies.
14.2 Where any app made by the owner carries no notice of its own, this notice applies to it as if its name stood in place of {A}.

## 15. WHERE THIS NOTICE APPLIES
15.1 This notice applies to {A} wherever it is found: in its repositories, on any website or service, on any device, in every build, edition and package of it, in every copy and every derived work, and to everyone who has, sees or uses any of them.
15.2 Every permission is given on the terms of this notice, which form part of it. Anyone who uses {A} accepts these terms. Anyone who does not accept them has no permission, and must not use {A}.

## 16. CHANGES TO THIS NOTICE
16.1 The owner may change this notice at any time. A new version applies from the moment it is published with {A} or given to a holder. A holder who does not accept a new version must stop using {A}, and their permission then ends.
16.2 No change can give anyone a right that the owner has not written into a permission.

## 17. IF A PART CANNOT BE ENFORCED
If a court finds that any part of this notice cannot be enforced, that part still applies as far as the law allows, and the rest of the notice applies in full.

## 18. THE LAW
18.1 Nothing in this notice limits a right that the law gives you and that cannot be limited by agreement.
18.2 This notice, and every permission, is governed by the law of the country where the owner lived on the date of this version, and the courts of that country may decide any dispute about it. A claim that the owner's rights have been infringed may also be brought under the law of any country where the infringement happens. The owner may also bring a claim in any other court that can hear it.

## 19. WHAT CONTINUES
When a permission ends, only that permission ends. Every part of this notice still applies to its former holder, and to everyone else.
"""


def render(app):
    a = APPS[app]
    A, AU = a["name"], a["name"].upper()
    lines = []
    out = lambda s="": lines.append(s.rstrip())

    def wrap(text, first, rest):
        for i, l in enumerate(textwrap.wrap(text, 76, initial_indent=first, subsequent_indent=rest, break_long_words=False, break_on_hyphens=False)):
            out(l)

    rule = "=" * 76
    out(AU)
    out("Copyright (c) 2026 %s. All rights reserved." % OWNER)
    out()
    out(rule)
    out("OWNERSHIP, LICENCE AND PERMISSIONS")
    out("Version %s, %s. This notice replaces every earlier notice." % (VERSION, DATE))
    out(rule)
    out()
    out("IN PLAIN WORDS")
    out()
    started_bullets = False
    for raw in TEXT.strip("\n").split("\n"):
        s = raw.replace("{A}", A).replace("{AU}", AU).replace("{O}", OWNER).replace("{P}", a["parts"])
        if not s.strip():
            continue
        if s.startswith("* "):
            started_bullets = True
            wrap(s[2:], "  • ", "    ")
            continue
        if started_bullets:
            out()
            wrap("This summary helps you read the terms. If it and the terms below ever differ, the terms below apply.", "", "")
            started_bullets = False
        if s.startswith("# "):
            out(); out(rule); out(s[2:]); out(rule)
        elif s.startswith("## "):
            out(); out(s[3:]); out()
        elif s[:1].isdigit() and "." in s[:6] and s.split(" ", 1)[0].replace(".", "").isdigit():
            num, body = s.split(" ", 1)
            if lines and lines[-1]:
                out()
            wrap(body, num + " ", " " * (len(num) + 1))
            out()
        elif s.startswith("("):
            tag, body = s.split(" ", 1)
            wrap(body, "  " + tag + " ", " " * (len(tag) + 3))
        else:
            wrap(s, "", "")
            out()
    out()
    out(rule)
    out("To ask for a permission, write to the owner. Only the owner can give one.")
    out(rule)
    text = "\n".join(lines)
    while "\n\n\n" in text:
        text = text.replace("\n\n\n", "\n\n")
    for bad in ("—", "–", " - "):
        assert bad not in text, "a dash in the licence: %r" % bad
    assert "Lector" not in text
    assert max(len(l) for l in text.split("\n")) <= 76
    return text.rstrip("\n") + "\n"


if __name__ == "__main__":
    check = sys.argv[1:] == ["check"]
    bad = 0
    for app, a in APPS.items():
        p, t = os.path.join(HERE, a["file"]), render(app)
        if check:
            if open(p, encoding="utf-8").read() != t:
                print("differs:", p); bad = 1
        else:
            open(p, "w", encoding="utf-8").write(t); print("wrote", p, len(t), "characters")
    sys.exit(bad)
