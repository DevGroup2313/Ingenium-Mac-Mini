# python3 -I rig/t_797_app.py <a patched ingenium_app.py> [models|quit|closed]   (HOME and APPDATA set to a scratch folder)
# Ingenium 7.97 (app_quit_models_797.py): the patched computer app finds a model's file again, and always quits. Run with HOME set to a scratch folder.
import importlib.util, json, os, sys, subprocess, time, threading
here = os.path.dirname(os.path.abspath(__file__)); app = sys.argv[1]
mode = sys.argv[2] if len(sys.argv) > 2 else "models"
spec = importlib.util.spec_from_file_location("ingapp", app); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
ok = lambda c, t: print(("PASS " if c else "FAIL ") + t) or c
if mode == "models":
    root = os.path.dirname(app); md = os.path.join(root, "models"); os.makedirs(md, exist_ok=True)
    with open(os.path.join(md, "Tiny-Q4_K_M.gguf"), "wb") as fh: fh.write(b"GGUF" + b"\0" * 2000)
    json.dump({"models": [{"file": "Tiny-Q4_K_M.gguf", "name": "Tiny", "size": 2004}]}, open(os.path.join(md, "builtin.json"), "w"))
    r1 = ok(m._model_path_for("builtin-Tiny-Q4_K_M.gguf") == os.path.join(md, "Tiny-Q4_K_M.gguf"), "a built-in model asked for before the list of built-in models is found")
    d = m._models_dir(); f = d / "l0123456789ab.gguf"; f.write_bytes(b"GGUF" + b"\0" * 100)
    ip = m._models_index_path(); ip.write_text(json.dumps({"lineup-mellum2.1-12b-thinking": {"path": "/no/such/drive/l0123456789ab.gguf", "external": False, "meta": {"sha256": "0123456789ab" + "0" * 52}}}))
    m._MODEL_PATHS.clear(); m._MODEL_AWAY.clear(); m._MODEL_META.clear()
    got = m._model_path_for("lineup-mellum2.1-12b-thinking")
    r2 = ok(got == str(f), "an installed model whose list points at a place it is not, found by its own name in the models folder: %s" % got)
    idx = json.loads(ip.read_text())
    r3 = ok(idx.get("lineup-mellum2.1-12b-thinking", {}).get("path") == str(f), "the list is written back, so the next start finds it at once")
    r4 = ok(m._model_path_for("lineup-gone") is None, "a model that is nowhere is still said to be gone")
    sys.exit(0 if (r1 and r2 and r3 and r4) else 1)
elif mode == "quit":
    threading.Thread(target=lambda: time.sleep(3600), daemon=False, name="stuck").start()   # a thread that would hold the app open
    m._quit_797("test"); print("NOT REACHED")
elif mode == "closed":
    threading.Thread(target=lambda: time.sleep(3600), daemon=False, name="stuck").start()
    m._closed_797(); time.sleep(3600)   # the main thread never returns, as a hung window would
