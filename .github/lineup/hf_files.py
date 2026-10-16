#!/usr/bin/env python3
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
#
# Reads, from Hugging Face, what Ingenium needs to offer a model for one-tap
# install: each GGUF file's exact name, size and SHA-256, the model's licence
# and when it was made. Run by .github/workflows/lineup-sources.yml (GitHub's
# machines reach Hugging Face) and printed to the job's log, from which the
# lineup in ingenium.html (ING_LINEUP) is written. Lines in candidates.txt:
#   search <author> [words]   the author's newest models (names and dates)
#   repo <owner/name>         every .gguf file in it, with size and SHA-256
import json, re, sys, urllib.request, urllib.parse

API = "https://huggingface.co/api/"
CODEY = re.compile(r"(?i)cod|devstral|mellum|gpt-oss|qwen3\.[5-9]|gemma-?4|phi-?[45]|granite|lfm2|glm|seed|nemotron|deepseek|kimi|olmo|smol|hermes|mistral|ministral|magistral")


def get(path):
    req = urllib.request.Request(API + path, headers={"User-Agent": "ingenium-lineup/1"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def search(author, words):
    q = {"sort": "createdAt", "direction": "-1", "limit": "60"}
    if author != "*":
        q["author"] = author
    if words:
        q["search"] = words
    try:
        for m in get("models?" + urllib.parse.urlencode(q)):
            mid = m.get("id", "")
            if words or CODEY.search(mid):
                print("S %s created=%s likes=%s dl=%s" % (mid, (m.get("createdAt") or "")[:10], m.get("likes"), m.get("downloads")))
    except Exception as e:
        print("S %s ERROR %s" % (author, e))


def repo(name):
    try:
        info = get("models/" + name)
    except Exception as e:
        print("R %s ERROR %s" % (name, e))
        return
    card = info.get("cardData") or {}
    gg = info.get("gguf") or {}
    print("R %s created=%s licence=%s base=%s arch=%s ctx=%s params=%s gated=%s" % (name, (info.get("createdAt") or "")[:10], card.get("license"),
          card.get("base_model"), gg.get("architecture"), gg.get("context_length"), gg.get("total"), info.get("gated")))
    try:
        files = get("models/%s/tree/main?recursive=true" % name)
    except Exception as e:
        print("R %s TREE-ERROR %s" % (name, e))
        return
    for f in files:
        p = f.get("path", "")
        if not p.endswith(".gguf"):
            continue
        lfs = f.get("lfs") or {}
        print("F %s %s %s %s" % (name, p, lfs.get("size", f.get("size")), lfs.get("oid", "")))


def head(url):
    """whether a file downloads without signing in (a gated model answers 401 or 403)"""
    try:
        req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "ingenium-lineup/1"})
        with urllib.request.urlopen(req, timeout=60) as r:
            print("H %s %s %s" % (url, r.status, r.headers.get("Content-Length") or r.headers.get("X-Linked-Size")))
    except Exception as e:
        print("H %s ERROR %s" % (url, e))


def card(name):
    """the maker's own scores for code, as its model card gives them"""
    try:
        req = urllib.request.Request("https://huggingface.co/%s/raw/main/README.md" % name, headers={"User-Agent": "ingenium-lineup/1"})
        text = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "replace")
    except Exception as e:
        print("C %s ERROR %s" % (name, e))
        return
    n = 0
    for ln in text.splitlines():
        if re.search(r"(?i)livecodebench|humaneval|swe-?bench|aider|mbpp|bigcodebench|terminal-?bench|codeforces|parameters|context length|active", ln) and len(ln) < 600:
            print("C %s | %s" % (name, ln.strip()))
            n += 1
            if n >= 40:
                break


for line in open(sys.argv[1] if len(sys.argv) > 1 else "candidates.txt", encoding="utf-8"):
    w = line.split()
    if not w or w[0].startswith("#"):
        continue
    if w[0] == "search":
        search(w[1], " ".join(w[2:]))
    elif w[0] == "repo":
        repo(w[1])
    elif w[0] == "card":
        card(w[1])
    elif w[0] == "head":
        head(w[1])
