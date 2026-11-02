# Ingenium 6.7.1 · the stored work is kept (build/desktop/app_care_671.py), on Linux with a home of its own: a run whose page
# came up does not count against the work however it ended; two starts whose page never came up move the work aside, whole,
# under a name of its own, and the person is told; not again within the hour; a folder kept before is never touched; a
# clean exit does not count; off Windows nothing is listened to.
#   python3 -I rig/t_671_app_care.py <repo>/ingenium_app.py
import os, sys, time, importlib.util, tempfile, glob, threading
home = tempfile.mkdtemp(); os.environ["HOME"] = home; os.environ["XDG_DATA_HOME"] = os.path.join(home, "share")
spec = importlib.util.spec_from_file_location("ia", sys.argv[1]); ia = importlib.util.module_from_spec(spec); spec.loader.exec_module(ia)
told = []; ia.tell_user = lambda t, title=None: told.append(t)
logs = []; ia.log_problem = lambda m, *a: logs.append(m)
ok = lambda c, m: print(("PASS " if c else "FAIL ") + m) or (c or sys.exit(1))
store = ia.storage_dir(); open(os.path.join(store, "work.txt"), "w").write("my notes")
# a run whose page came up and was then ended any way (no clean exit): not counted
for i in range(3):
    ia._begin_session(); n = ia._begin_start(); ia._start_ok()
ok(ia._begin_start() == 0, "three runs whose page came up, each ended badly: no start counted against the work")
ia._start_ok()
# two starts whose page never came up
ia._begin_start(); ia._begin_start(); n = ia._begin_start()
ok(n == 2, "two starts whose page never came up are counted (%d)" % n)
ia._move_store_aside(n); time.sleep(0.3)
kept = glob.glob(store.rstrip("/") + ".kept-*")
ok(len(kept) == 1 and open(os.path.join(kept[0], "work.txt")).read() == "my notes" and not os.path.exists(store), "the work is moved aside whole, under a name of its own")
ok(told and kept[0] in told[0] and "Nothing was deleted" in told[0], "the person is told where it is")
# again within the hour: left where it is
store2 = ia.storage_dir(); open(os.path.join(store2, "new.txt"), "w").write("x")
os.utime(kept[0], (time.time() - 86400, time.time() - 86400))  # the folder's own time says nothing of when it was moved
ia._move_store_aside(3)
ok(os.path.exists(os.path.join(store2, "new.txt")) and len(glob.glob(store.rstrip("/") + ".kept-*")) == 1, "not moved again within the hour")
# an older kept folder (from 6.7, storage.crashed-2) is never touched
cr = store.rstrip("/") + ".crashed-2"; os.makedirs(cr); open(os.path.join(cr, "old.txt"), "w").write("old")
os.rename(kept[0], store.rstrip("/") + ".kept-" + time.strftime("%Y-%m-%d-%H%M%S", time.localtime(time.time() - 7200)))
ia._move_store_aside(2)
ok(os.path.exists(os.path.join(cr, "old.txt")) and len(glob.glob(store.rstrip("/") + ".kept-*")) == 2, "a later move keeps both earlier folders")
# a clean exit clears the start mark
ia._begin_start(); ia._end_session()
ok(ia._begin_start() == 0, "a clean exit does not count")
ia._care_attach(object()); ok(not ia._CARE["attached"], "off Windows nothing is listened to")
print("all passed")
