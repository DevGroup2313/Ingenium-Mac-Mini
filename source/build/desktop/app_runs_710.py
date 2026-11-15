"""7.11 (15 November 2026): a run's record is read and written one at a time, and waits a moment when Windows holds the file.

Found on GitHub's Windows machine, in the self-test of the 7.10 build (run 43665002267): the self-test's run ended "bad" with its second
job's second step still "queued", where it should have been "skipped". A run's record (runs/<id>/run.json) is put in place by
_runs_write with os.replace, while the page, and the self-test, read it with _runs_read every 0.3 s from other threads. On Windows a
file that another handle holds open cannot be replaced (PermissionError, "Access is denied"); the exception left the job's step loop at
once (its later steps never marked), the job was set "bad", and a run that was good could end bad at random on the HP laptop. The same
self-test passed on 7.08 and 7.09 by timing alone. Now one lock (_runs_io, the mark) holds every read and write of a run's record in
this app, and a replace or a read that meets PermissionError tries again for up to two seconds, as a scanner such as Windows Defender
can hold a new file for a moment too.
usage: python3 app_runs_710.py path/to/ingenium_app.py   (after app_runs_708.py)"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_runs_io" in s:
    print("already patched", p)
    sys.exit(0)
if "_runs_new" not in s:
    sys.exit("%s: app_runs_708.py must be applied first" % p)
rep('''def _runs_read(rid):
    with open(_runs_rec_path(rid), encoding="utf-8") as fh:
        return json.load(fh)


def _runs_write(rec):
    f = _runs_rec_path(rec["id"])
    tmp = f + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(rec, fh, ensure_ascii=False, indent=1)
    os.replace(tmp, f)
''', '''# 7.11 (app_runs_710.py): a run's record is read and written one at a time in this app, and a step that meets PermissionError (on
# Windows, a file held open elsewhere cannot be replaced) tries again for up to two seconds; before, a read during a write could end a
# job at once, its later steps left "queued", and a good run could end bad at random
_runs_io = threading.Lock()


def _runs_retry(fn):
    t_end = time.time() + 2.0
    while True:
        try:
            return fn()
        except PermissionError:
            if time.time() > t_end:
                raise
            time.sleep(0.025)


def _runs_read(rid):
    def go():
        with open(_runs_rec_path(rid), encoding="utf-8") as fh:
            return json.load(fh)
    with _runs_io:
        return _runs_retry(go)


def _runs_write(rec):
    f = _runs_rec_path(rec["id"])
    tmp = f + ".tmp"
    with _runs_io:
        with open(tmp, "w", encoding="utf-8") as fh:
            json.dump(rec, fh, ensure_ascii=False, indent=1)
        _runs_retry(lambda: os.replace(tmp, f))
''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
