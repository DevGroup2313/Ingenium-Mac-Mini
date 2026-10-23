"""Ingenium 6.2 · R158, Ingenium's eyes: the pack of what the page needs to look at a picture on the device, with no model
that can see and nothing fetched. build_page.py carries the pack (eyes.pack) as one block, checked against eyes.json.

  python3 -I make_eyes.py <node_modules> <mobilenet_v2_1.0_224 folder> [out folder]

<node_modules> holds, from npm: @tensorflow/tfjs 4.22.0, @tensorflow-models/mobilenet 2.1.1 (its ImageNet names),
tesseract.js 5.1.1, tesseract.js-core 5.1.1 and @tesseract.js-data/eng 1.0.0 (4.0.0_best_int). The model folder holds
MobileNet v2 (1.0, 224) as TensorFlow.js publishes it for @tensorflow-models/mobilenet:
https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json and its four weight files.

What it makes:
  - the model's weights in eight bits each (uint8, per tensor, the zero kept exactly on the grid, as tfjs-converter
    quantises): 14.0 MB of float32 become 3.6 MB; tensors under 1,024 values (biases, offsets) stay float32. On the
    test pictures (rig/eyes/) the first answer is the same as at full precision;
  - each part gzipped, except the English text-recognition data, which Tesseract reads gzipped itself;
  - eyes.json: each part's size and SHA-256 before packing, where it came from, and its licence (all Apache-2.0).

The pack: the eight bytes INGEYES1, the header's length (4 bytes, little-endian), the header (JSON, UTF-8), then the
parts, each where the header says."""
import gzip, hashlib, io, json, os, re, sys

import numpy as np

NPM, MODEL = sys.argv[1], sys.argv[2]
OUT = sys.argv[3] if len(sys.argv) > 3 else os.path.dirname(os.path.abspath(__file__))


def version(pkg):
    return json.load(open(os.path.join(NPM, pkg, "package.json")))["version"]


def quantise(folder):
    m = json.load(open(os.path.join(folder, "model.json")))
    man = m["weightsManifest"][0]
    buf = b"".join(open(os.path.join(folder, p), "rb").read() for p in man["paths"])
    off, parts, specs = 0, [], []
    for w in man["weights"]:
        n = int(np.prod(w["shape"])) if w["shape"] else 1
        if w["dtype"] != "float32":
            sys.exit("model: a weight that is not float32: " + w["name"])
        a = np.frombuffer(buf, "<f4", n, off)
        off += 4 * n
        s = {"name": w["name"], "shape": w["shape"], "dtype": "float32"}
        if n >= 1024:
            lo, hi = float(min(a.min(), 0)), float(max(a.max(), 0))
            scale = (hi - lo) / 255.0 or 1.0
            lo = -round(-lo / scale) * scale
            parts.append(np.clip(np.round((a - lo) / scale), 0, 255).astype(np.uint8).tobytes())
            s["quantization"] = {"dtype": "uint8", "min": lo, "scale": scale}
        else:
            parts.append(a.astype("<f4").tobytes())
        specs.append(s)
    if off != len(buf):
        sys.exit("model: its weight files do not match its manifest")
    topo = json.dumps({"modelTopology": m["modelTopology"], "weightSpecs": specs}, separators=(",", ":")).encode()
    return topo, b"".join(parts), len(buf)


def labels():
    src = open(os.path.join(NPM, "@tensorflow-models", "mobilenet", "dist", "imagenet_classes.js"), encoding="utf-8").read()
    names = {int(k): v for k, v in re.findall(r"\n\s*(\d+):\s*'((?:[^'\\]|\\.)*)'", src)}
    if sorted(names) != list(range(1000)):
        sys.exit("labels: the ImageNet names are not the thousand expected")
    return json.dumps([names[i].replace("\\'", "'") for i in range(1000)], ensure_ascii=False, separators=(",", ":")).encode()


topo, weights, float_bytes = quantise(MODEL)
ESS = os.path.join(NPM, "tesseract.js-core")
TRAINED = os.path.join(NPM, "@tesseract.js-data", "eng", "4.0.0_best_int", "eng.traineddata.gz")
APACHE = "Apache-2.0"
parts = [  # name, bytes, gzip here?, from, licence
    ("tf", open(os.path.join(NPM, "@tensorflow", "tfjs", "dist", "tf.min.js"), "rb").read(), True,
     "@tensorflow/tfjs " + version("@tensorflow/tfjs") + " dist/tf.min.js", APACHE),
    ("mnv2.json", topo, True, "MobileNet v2 1.0 224 (TensorFlow.js), its graph and weight list, weights in uint8", APACHE),
    ("mnv2.bin", weights, True, "MobileNet v2 1.0 224 (TensorFlow.js), its weights quantised to uint8 here", APACHE),
    ("labels", labels(), True, "@tensorflow-models/mobilenet " + version("@tensorflow-models/mobilenet") + " ImageNet names", APACHE),
    ("tesseract", open(os.path.join(NPM, "tesseract.js", "dist", "tesseract.min.js"), "rb").read(), True,
     "tesseract.js " + version("tesseract.js") + " dist/tesseract.min.js", APACHE),
    ("worker", open(os.path.join(NPM, "tesseract.js", "dist", "worker.min.js"), "rb").read(), True,
     "tesseract.js " + version("tesseract.js") + " dist/worker.min.js", APACHE),
    ("core.js", open(os.path.join(ESS, "tesseract-core-lstm.js"), "rb").read(), True,
     "tesseract.js-core " + version("tesseract.js-core") + " tesseract-core-lstm.js", APACHE),
    ("core.wasm", open(os.path.join(ESS, "tesseract-core-lstm.wasm"), "rb").read(), True,
     "tesseract.js-core " + version("tesseract.js-core") + " tesseract-core-lstm.wasm", APACHE),
    ("eng", open(TRAINED, "rb").read(), False,
     "@tesseract.js-data/eng " + version("@tesseract.js-data/eng") + " 4.0.0_best_int (tessdata_best, integer)", APACHE),
]
header, body, man = {"v": 1, "parts": {}}, io.BytesIO(), {"made": "make_eyes.py", "float32_weights": float_bytes, "parts": {}}
for name, raw, gz, frm, lic in parts:
    packed = gzip.compress(raw, 9, mtime=0) if gz else raw
    header["parts"][name] = {"o": body.tell(), "n": len(packed), "gz": 1 if gz else 0, "size": len(raw)}
    man["parts"][name] = {"size": len(raw), "sha256": hashlib.sha256(raw).hexdigest(), "packed": len(packed), "from": frm, "licence": lic}
    body.write(packed)
hb = json.dumps(header, separators=(",", ":")).encode()
pack = b"INGEYES1" + len(hb).to_bytes(4, "little") + hb + body.getvalue()
man["pack"] = {"size": len(pack), "sha256": hashlib.sha256(pack).hexdigest()}
open(os.path.join(OUT, "eyes.pack"), "wb").write(pack)
json.dump(man, open(os.path.join(OUT, "eyes.json"), "w"), indent=1)
print("eyes.pack %.2f MB (%.2f MB as base64 in the page); weights %.1f MB -> %.1f MB" % (len(pack) / 1e6, len(pack) * 4 / 3 / 1e6, float_bytes / 1e6, len(weights) / 1e6))
for name in header["parts"]:
    print("  %-10s %9d bytes, %9d packed  %s" % (name, man["parts"][name]["size"], man["parts"][name]["packed"], man["parts"][name]["from"]))
