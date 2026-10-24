"""Ingenium 6.5: Train a small model from zero trains every weight, in four sizes (patch for ingenium_app.py, Mac and
Windows; applied after app_win_64.py).

The owner's words (23 October 2026): "I want Ingenium to be able to create and train frontier level models inside of the
app." What a computer at home can train grows: beside Tiny (1.3 million numbers) and Small (6 million), Medium (16
million) and Large (41 million). And every weight now learns: llama.cpp rounds a context up to 256 tokens, so the trainer's
128-token batches were smaller than its context, and llama.cpp then trains no K or V projection ("n_ubatch (128) != n_ctx
(256), the K and V projections will not receive gradients"); deeper models stopped on an assertion for the same reason.
The batch is now the context, 256 tokens. Measured on 150,000 characters, Tiny, eight passes: the held-back loss ended at
5.85 against 6.05 before, in about half as long again (source/rig/train_sizes.txt has the figures for each size).

    python3 build/desktop/app_train_65.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if "TRAIN_LR_MORE" in s:
    print("already patched", p)
    sys.exit(0)


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


rep('''TRAIN_SIZES = {  # name: (layers, width, heads, feed-forward width)
    "tiny": (4, 128, 4, 352),
    "small": (6, 256, 8, 704),
}''', '''TRAIN_SIZES = {  # name: (layers, width, heads, feed-forward width)
    "tiny": (4, 128, 4, 352),
    "small": (6, 256, 8, 704),
    # 6.5 (app_train_65.py): for a strong computer and much more text (about 16 and 41 million numbers)
    "medium": (8, 384, 6, 1024),
    "large": (12, 512, 8, 1408),
}''')
rep('''TRAIN_VOCAB = 2048
''', '''TRAIN_VOCAB = 2048
# 6.5: the learning rate at the start and at the end, for a training from zero and for one that goes on (the trainer starts
# its optimiser afresh, so that one starts gently); measured for each size on 150,000 characters (source/rig/train_sizes.txt)
TRAIN_LR = {"tiny": (1e-4, 1e-5), "small": (6e-5, 6e-6), "medium": (4e-5, 4e-6), "large": (3e-5, 3e-6)}
TRAIN_LR_MORE = {"tiny": (3e-5, 3e-6), "small": (2e-5, 2e-6), "medium": (1.5e-5, 1.5e-6), "large": (1e-5, 1e-6)}
# the batch is the context: llama.cpp rounds a context up to 256 tokens, and trains no K or V projection when a batch is smaller
TRAIN_CTX = 256
''')
rep('''            lr0, lr1 = (2e-5, 2e-6) if size == "small" else (3e-5, 3e-6)''',
    '''            lr0, lr1 = TRAIN_LR_MORE.get(size, TRAIN_LR_MORE["tiny"])''')
rep('''            lr0, lr1 = (6e-5, 6e-6) if size == "small" else (1e-4, 1e-5)''',
    '''            lr0, lr1 = TRAIN_LR.get(size, TRAIN_LR["tiny"])''')
rep('''"-c", "128", "-b", "128", "-ub", "128",''', '''"-c", str(TRAIN_CTX), "-b", str(TRAIN_CTX), "-ub", str(TRAIN_CTX),''')
open(p, "w", encoding="utf-8", newline="").write(s)
print("patched", p)
